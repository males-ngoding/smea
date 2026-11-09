<?php
declare(strict_types=1);

require_once ROOT_PATH . '/views/partials/lucide-icons.php';
require_once ROOT_PATH . '/views/partials/berita-url.php';

$pageLink = static fn(int $page): string => berita_list_url([
    'q' => $searchQuery,
    'kategori' => $activeCategory,
    'halaman' => $page,
]);
$prevClass = 'flex items-center justify-center w-10 h-10 rounded-lg transition-all';
$enabledNav = 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200';
$disabledNav = 'bg-gray-100 text-gray-400 cursor-not-allowed';
$hasPrev = $currentPage > 1;
$hasNext = $currentPage < $totalPages;
?>
<nav class="flex items-center justify-center space-x-2" aria-label="Pagination">
  <?php if ($hasPrev): ?>
    <a href="<?= e($pageLink($currentPage - 1)) ?>" class="<?= $prevClass . ' ' . $enabledNav ?>" aria-label="Previous page">
      <?= lucide_icon('chevron-left', 'w-5 h-5') ?>
    </a>
  <?php else: ?>
    <span class="<?= $prevClass . ' ' . $disabledNav ?>" aria-label="Previous page">
      <?= lucide_icon('chevron-left', 'w-5 h-5') ?>
    </span>
  <?php endif; ?>

  <div class="flex items-center space-x-1">
    <?php foreach ($pageNumbers as $pageItem): ?>
      <?php if ($pageItem === '...'): ?>
        <span class="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
      <?php else: ?>
        <?php $isActive = $pageItem === $currentPage; ?>
        <a href="<?= e($pageLink((int) $pageItem)) ?>" class="w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all <?= $isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200' ?>"<?= $isActive ? ' aria-current="page"' : '' ?>><?= e((string) $pageItem) ?></a>
      <?php endif; ?>
    <?php endforeach; ?>
  </div>

  <?php if ($hasNext): ?>
    <a href="<?= e($pageLink($currentPage + 1)) ?>" class="<?= $prevClass . ' ' . $enabledNav ?>" aria-label="Next page">
      <?= lucide_icon('chevron-right', 'w-5 h-5') ?>
    </a>
  <?php else: ?>
    <span class="<?= $prevClass . ' ' . $disabledNav ?>" aria-label="Next page">
      <?= lucide_icon('chevron-right', 'w-5 h-5') ?>
    </span>
  <?php endif; ?>
</nav>
