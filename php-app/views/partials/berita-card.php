<?php
declare(strict_types=1);

require_once ROOT_PATH . '/views/partials/lucide-icons.php';

$cardImage = !empty($article['image']) ? $article['image'] : '/assets/img/placeholder-news.jpg';
$cardDate = format_date_id($article['published_at'] ?? $article['created_at'] ?? null);
?>
<a href="<?= e('/berita/' . $article['slug']) ?>" class="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
  <div class="relative h-48 overflow-hidden">
    <img src="<?= e($cardImage) ?>" alt="<?= e($article['title']) ?>" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    <span class="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold"><?= e($article['category_name'] ?? '') ?></span>
  </div>
  <div class="p-6">
    <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
      <div class="flex items-center space-x-1">
        <?= lucide_icon('calendar', 'w-4 h-4') ?>
        <span><?= e($cardDate) ?></span>
      </div>
      <div class="flex items-center space-x-1">
        <?= lucide_icon('eye', 'w-4 h-4') ?>
        <span><?= e(number_format((int) ($article['views'] ?? 0), 0, ',', '.')) ?></span>
      </div>
    </div>
    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2"><?= e($article['title']) ?></h3>
    <p class="text-gray-600 text-sm mb-4 line-clamp-3"><?= e($article['excerpt'] ?? '') ?></p>
    <div class="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
      <span>Selengkapnya</span>
      <?= lucide_icon('arrow-right', 'w-4 h-4 group-hover:translate-x-1 transition-transform') ?>
    </div>
  </div>
</a>
