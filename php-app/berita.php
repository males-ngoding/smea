<?php
declare(strict_types=1);

require __DIR__ . '/helpers/bootstrap.php';

const BERITA_PAGE_SIZE = 9;

function berita_page_numbers(int $current, int $total): array
{
    if ($total <= 7) {
        return range(1, $total);
    }

    $pages = [1];
    if ($current > 3) {
        $pages[] = '...';
    }
    for ($i = max(2, $current - 1); $i <= min($total - 1, $current + 1); $i++) {
        $pages[] = $i;
    }
    if ($current < $total - 2) {
        $pages[] = '...';
    }
    $pages[] = $total;

    return $pages;
}

$searchQuery = is_string($_GET['q'] ?? null) ? mb_substr(trim($_GET['q']), 0, 100) : '';
$activeCategory = is_string($_GET['kategori'] ?? null) && $_GET['kategori'] !== '' ? $_GET['kategori'] : 'semua';
$currentPage = (int) filter_var($_GET['halaman'] ?? 1, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'default' => 1]]);

$result = article_list_published($currentPage, BERITA_PAGE_SIZE, $activeCategory, $searchQuery);
$articles = $result['items'];
$totalItems = $result['total'];
$totalPages = max(1, (int) ceil($totalItems / BERITA_PAGE_SIZE));
$pageNumbers = berita_page_numbers($currentPage, $totalPages);

$categoryPills = array_merge(
    [['id' => 'semua', 'name' => 'Semua', 'slug' => 'semua']],
    categories_all()
);

$pageTitle = 'Berita - SMKS YP 17 Cilegon';

require ROOT_PATH . '/views/templates/header.php';
render('pages/berita-list', [
    'articles' => $articles,
    'categoryPills' => $categoryPills,
    'activeCategory' => $activeCategory,
    'searchQuery' => $searchQuery,
    'currentPage' => $currentPage,
    'totalPages' => $totalPages,
    'pageNumbers' => $pageNumbers,
]);
require ROOT_PATH . '/views/templates/footer.php';
