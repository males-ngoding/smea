<?php
declare(strict_types=1);

require_once ROOT_PATH . '/views/partials/lucide-icons.php';
require_once ROOT_PATH . '/views/partials/berita-url.php';

$featuredArticle = $articles[0] ?? null;
$gridArticles = array_slice($articles, 1);
?>
<div class="min-h-screen bg-gray-50">
  <?php require ROOT_PATH . '/views/partials/berita-navbar.php'; ?>

  <section class="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <?= lucide_icon('newspaper', 'w-4 h-4') ?>
          <span class="text-sm font-medium">Berita &amp; Informasi</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Berita Terkini</h1>
        <p class="text-lg md:text-xl text-blue-100 mb-8">
          Informasi terbaru seputar kegiatan, prestasi, dan perkembangan SMK YP 17 Cilegon
        </p>

        <div class="flex justify-center">
          <form action="/berita" method="get" class="relative w-full max-w-md">
            <input type="hidden" name="kategori" value="<?= e($activeCategory) ?>">
            <div class="relative">
              <?= lucide_icon('search', 'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400') ?>
              <input type="text" name="q" value="<?= e($searchQuery) ?>" placeholder="Cari berita atau artikel..." class="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <?php if ($searchQuery !== ''): ?>
                <a href="<?= e(berita_list_url(['kategori' => $activeCategory])) ?>" class="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label="Hapus pencarian">
                  <?= lucide_icon('x', 'w-4 h-4 text-gray-400') ?>
                </a>
              <?php endif; ?>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Kategori</h2>
      <div class="flex flex-wrap gap-2">
        <?php foreach ($categoryPills as $category): ?>
          <?php $isActive = $activeCategory === $category['slug']; ?>
          <a href="<?= e(berita_list_url(['q' => $searchQuery, 'kategori' => $category['slug']])) ?>" class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 <?= $isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200' ?>"><?= e($category['name']) ?></a>
        <?php endforeach; ?>
      </div>
    </div>

    <?php if (count($articles) === 0): ?>
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Berita</h3>
        <p class="text-gray-500 max-w-md"><?= e($searchQuery !== ''
            ? 'Tidak ada berita yang cocok dengan "' . $searchQuery . '"'
            : 'Tidak ada berita dalam kategori ini') ?></p>
      </div>
    <?php else: ?>
      <div class="space-y-10">
        <?php if ($featuredArticle !== null): ?>
          <?php $article = $featuredArticle; require ROOT_PATH . '/views/partials/berita-card-featured.php'; ?>
        <?php endif; ?>

        <?php if (count($gridArticles) > 0): ?>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php foreach ($gridArticles as $gridItem): ?>
              <?php $article = $gridItem; require ROOT_PATH . '/views/partials/berita-card.php'; ?>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <?php if ($totalPages > 1): ?>
          <div class="pt-8">
            <?php require ROOT_PATH . '/views/partials/berita-pagination.php'; ?>
          </div>
        <?php endif; ?>
      </div>
    <?php endif; ?>
  </main>

  <?php require ROOT_PATH . '/views/partials/berita-footer.php'; ?>
</div>
