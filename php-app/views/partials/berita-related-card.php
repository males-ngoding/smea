<?php
declare(strict_types=1);

$cardImage = !empty($item['image']) ? $item['image'] : '/assets/img/placeholder-news.jpg';
$cardDate = format_date_id($item['published_at'] ?? $item['created_at'] ?? null);
?>
<a href="<?= e('/berita/' . $item['slug']) ?>" class="group flex gap-4 bg-white rounded-xl p-4 hover:shadow-md transition-all border border-gray-100">
  <div class="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
    <img src="<?= e($cardImage) ?>" alt="<?= e($item['title']) ?>" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform">
  </div>
  <div class="flex flex-col justify-center min-w-0">
    <span class="text-xs text-blue-600 font-medium mb-1"><?= e($item['category_name'] ?? '') ?></span>
    <h4 class="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors"><?= e($item['title']) ?></h4>
    <span class="text-xs text-gray-500 mt-1"><?= e($cardDate) ?></span>
  </div>
</a>
