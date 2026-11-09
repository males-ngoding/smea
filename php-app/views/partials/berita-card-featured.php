<?php
declare(strict_types=1);

require_once ROOT_PATH . '/views/partials/lucide-icons.php';

$cardImage = !empty($article['image']) ? $article['image'] : '/assets/img/placeholder-news.jpg';
$cardDate = format_date_id($article['published_at'] ?? $article['created_at'] ?? null);
?>
<a href="<?= e('/berita/' . $article['slug']) ?>" class="group block bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
  <div class="grid md:grid-cols-2">
    <div class="relative h-64 md:h-full min-h-[300px] overflow-hidden">
      <img src="<?= e($cardImage) ?>" alt="<?= e($article['title']) ?>" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
    <div class="p-8 md:p-10 flex flex-col justify-center">
      <div class="flex items-center flex-wrap gap-2 text-sm text-gray-600 mb-4">
        <div class="flex items-center space-x-1">
          <?= lucide_icon('calendar', 'w-4 h-4') ?>
          <span><?= e($cardDate) ?></span>
        </div>
        <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"><?= e($article['category_name'] ?? '') ?></span>
        <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
        <div class="flex items-center space-x-1 text-gray-500">
          <?= lucide_icon('eye', 'w-4 h-4') ?>
          <span><?= e(number_format((int) ($article['views'] ?? 0), 0, ',', '.')) ?></span>
        </div>
      </div>
      <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2"><?= e($article['title']) ?></h3>
      <p class="text-gray-600 leading-relaxed mb-6 line-clamp-3"><?= e($article['excerpt'] ?? '') ?></p>
      <div class="inline-flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
        <span>Baca Selengkapnya</span>
        <?= lucide_icon('arrow-right', 'w-4 h-4 group-hover:translate-x-1 transition-transform') ?>
      </div>
    </div>
  </div>
</a>
