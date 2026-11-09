<?php
declare(strict_types=1);

const ARTICLE_STATUSES = ['draft', 'published', 'archived'];

function article_published_query(?string $categorySlug, ?string $search): array
{
    $where = ["a.status = 'published'"];
    $params = [];

    if ($categorySlug !== null && $categorySlug !== '' && $categorySlug !== 'semua') {
        $where[] = 'c.slug = :category';
        $params[':category'] = $categorySlug;
    }

    if ($search !== null && $search !== '') {
        $where[] = '(a.title LIKE :search OR a.excerpt LIKE :search)';
        $params[':search'] = '%' . $search . '%';
    }

    return [implode(' AND ', $where), $params];
}

function article_list_published(int $page, int $perPage, ?string $categorySlug = null, ?string $search = null): array
{
    [$where, $params] = article_published_query($categorySlug, $search);

    $countStmt = db()->prepare(
        "SELECT COUNT(*) FROM article a LEFT JOIN category c ON c.id = a.category_id WHERE $where"
    );
    $countStmt->execute($params);
    $total = (int) $countStmt->fetchColumn();

    $offset = max(0, ($page - 1) * $perPage);
    $stmt = db()->prepare(
        "SELECT a.id, a.title, a.slug, a.excerpt, a.image, a.published_at, a.created_at,
                c.name AS category_name, c.slug AS category_slug, u.name AS author_name
         FROM article a
         LEFT JOIN category c ON c.id = a.category_id
         LEFT JOIN users u ON u.id = a.author_id
         WHERE $where
         ORDER BY COALESCE(a.published_at, a.created_at) DESC
         LIMIT $perPage OFFSET $offset"
    );
    $stmt->execute($params);

    return ['items' => $stmt->fetchAll(), 'total' => $total];
}

function article_find_published_by_slug(string $slug): ?array
{
    $stmt = db()->prepare(
        "SELECT a.*, c.name AS category_name, c.slug AS category_slug, u.name AS author_name
         FROM article a
         LEFT JOIN category c ON c.id = a.category_id
         LEFT JOIN users u ON u.id = a.author_id
         WHERE a.slug = :slug AND a.status = 'published'
         LIMIT 1"
    );
    $stmt->execute([':slug' => $slug]);
    return $stmt->fetch() ?: null;
}

function article_related(?string $categoryId, string $excludeId, int $limit): array
{
    if ($categoryId === null) {
        return [];
    }

    $stmt = db()->prepare(
        "SELECT a.id, a.title, a.slug, a.image, a.published_at, a.created_at, c.name AS category_name
         FROM article a
         LEFT JOIN category c ON c.id = a.category_id
         WHERE a.status = 'published' AND a.category_id = :category AND a.id <> :exclude
         ORDER BY COALESCE(a.published_at, a.created_at) DESC
         LIMIT $limit"
    );
    $stmt->execute([':category' => $categoryId, ':exclude' => $excludeId]);
    return $stmt->fetchAll();
}

function article_latest_published(int $limit, ?string $excludeId = null): array
{
    $stmt = db()->prepare(
        "SELECT a.id, a.title, a.slug, a.image, a.published_at, a.created_at, c.name AS category_name
         FROM article a
         LEFT JOIN category c ON c.id = a.category_id
         WHERE a.status = 'published' AND a.id <> :exclude
         ORDER BY COALESCE(a.published_at, a.created_at) DESC
         LIMIT $limit"
    );
    $stmt->execute([':exclude' => $excludeId ?? '']);
    return $stmt->fetchAll();
}

function article_increment_views(string $id): void
{
    db()->prepare('UPDATE article SET views = views + 1 WHERE id = :id')->execute([':id' => $id]);
}

function article_admin_list(): array
{
    return db()->query(
        "SELECT a.id, a.title, a.slug, a.status, a.views, a.published_at, a.created_at,
                c.name AS category_name
         FROM article a
         LEFT JOIN category c ON c.id = a.category_id
         ORDER BY a.created_at DESC"
    )->fetchAll();
}

function article_find(string $id): ?array
{
    $stmt = db()->prepare('SELECT * FROM article WHERE id = :id LIMIT 1');
    $stmt->execute([':id' => $id]);
    return $stmt->fetch() ?: null;
}

function article_slug_exists(string $slug, ?string $ignoreId = null): bool
{
    $stmt = db()->prepare('SELECT id FROM article WHERE slug = :slug AND id <> :ignore LIMIT 1');
    $stmt->execute([':slug' => $slug, ':ignore' => $ignoreId ?? '']);
    return (bool) $stmt->fetchColumn();
}

function article_save(array $data, ?string $id, string $authorId): string
{
    $fields = [
        'title' => $data['title'],
        'slug' => $data['slug'],
        'excerpt' => $data['excerpt'],
        'content' => $data['content'],
        'image' => $data['image'],
        'status' => $data['status'],
        'category_id' => $data['category_id'],
        'published_at' => $data['status'] === 'published' ? ($data['published_at'] ?? date('Y-m-d H:i:s')) : null,
    ];

    if ($id === null) {
        $newId = uuid_v4();
        $fields['id'] = $newId;
        $fields['author_id'] = $authorId;
        $columns = implode(', ', array_keys($fields));
        $placeholders = implode(', ', array_map(fn($k) => ':' . $k, array_keys($fields)));
        $stmt = db()->prepare("INSERT INTO article ($columns) VALUES ($placeholders)");
        $stmt->execute(array_combine(array_map(fn($k) => ':' . $k, array_keys($fields)), array_values($fields)));
        return $newId;
    }

    $assignments = implode(', ', array_map(fn($k) => "$k = :$k", array_keys($fields)));
    $fields['id'] = $id;
    $stmt = db()->prepare("UPDATE article SET $assignments WHERE id = :id");
    $stmt->execute(array_combine(array_map(fn($k) => ':' . $k, array_keys($fields)), array_values($fields)));
    return $id;
}

function article_delete(string $id): void
{
    db()->prepare('DELETE FROM article WHERE id = :id')->execute([':id' => $id]);
}

function categories_all(): array
{
    return db()->query('SELECT id, name, slug, description FROM category ORDER BY name ASC')->fetchAll();
}

function categories_with_counts(): array
{
    return db()->query(
        "SELECT c.id, c.name, c.slug, c.description, COUNT(a.id) AS article_count
         FROM category c
         LEFT JOIN article a ON a.category_id = c.id
         GROUP BY c.id, c.name, c.slug, c.description
         ORDER BY c.name ASC"
    )->fetchAll();
}

function category_find(string $id): ?array
{
    $stmt = db()->prepare('SELECT id, name, slug, description FROM category WHERE id = :id LIMIT 1');
    $stmt->execute([':id' => $id]);
    return $stmt->fetch() ?: null;
}

function category_slug_exists(string $slug, ?string $ignoreId = null): bool
{
    $stmt = db()->prepare('SELECT id FROM category WHERE slug = :slug AND id <> :ignore LIMIT 1');
    $stmt->execute([':slug' => $slug, ':ignore' => $ignoreId ?? '']);
    return (bool) $stmt->fetchColumn();
}

function category_save(string $name, string $slug, ?string $description, ?string $id): void
{
    if ($id === null) {
        $stmt = db()->prepare('INSERT INTO category (id, name, slug, description) VALUES (:id, :name, :slug, :description)');
        $stmt->execute([':id' => uuid_v4(), ':name' => $name, ':slug' => $slug, ':description' => $description]);
        return;
    }

    $stmt = db()->prepare('UPDATE category SET name = :name, slug = :slug, description = :description WHERE id = :id');
    $stmt->execute([':id' => $id, ':name' => $name, ':slug' => $slug, ':description' => $description]);
}

function category_delete(string $id): void
{
    db()->prepare('DELETE FROM category WHERE id = :id')->execute([':id' => $id]);
}
