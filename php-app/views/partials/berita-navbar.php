<?php
declare(strict_types=1);

require_once ROOT_PATH . '/views/partials/lucide-icons.php';

$beritaNavItems = [
    ['href' => '/', 'label' => 'Beranda'],
    ['href' => '/berita', 'label' => 'Berita'],
    ['href' => '/#jurusan', 'label' => 'Jurusan'],
    ['href' => '/#kontak', 'label' => 'Kontak'],
];
?>
<nav class="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <a href="/" class="flex items-center space-x-3 group">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
          <span class="text-white font-bold text-sm">YP17</span>
        </div>
        <div class="hidden sm:block">
          <h1 class="font-bold text-gray-900 text-lg leading-tight">SMK YP 17</h1>
          <p class="text-xs text-gray-500">Cilegon</p>
        </div>
      </a>

      <div class="hidden md:flex items-center space-x-1">
        <?php foreach ($beritaNavItems as $item): ?>
          <a href="<?= e($item['href']) ?>" class="<?= $item['href'] === '/berita' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' ?> px-4 py-2 rounded-lg text-sm font-medium transition-colors"><?= e($item['label']) ?></a>
        <?php endforeach; ?>
      </div>

      <div class="hidden md:block">
        <a href="/" class="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <?= lucide_icon('chevron-left', 'w-4 h-4') ?>
          <span>Kembali</span>
        </a>
      </div>

      <button type="button" onclick="beritaToggleMenu()" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
        <?= lucide_icon('x', 'w-6 h-6 text-gray-700 hidden', 'berita-menu-close') ?>
        <?= lucide_icon('menu', 'w-6 h-6 text-gray-700', 'berita-menu-open') ?>
      </button>
    </div>
  </div>

  <div id="berita-mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100">
    <div class="px-4 py-4 space-y-2">
      <?php foreach ($beritaNavItems as $item): ?>
        <a href="<?= e($item['href']) ?>" class="<?= $item['href'] === '/berita' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' ?> block px-4 py-3 rounded-lg text-sm font-medium transition-colors"><?= e($item['label']) ?></a>
      <?php endforeach; ?>
      <a href="/" class="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium mt-4">
        <?= lucide_icon('chevron-left', 'w-4 h-4') ?>
        <span>Kembali ke Beranda</span>
      </a>
    </div>
  </div>
</nav>
<script>
function beritaToggleMenu() {
  document.getElementById('berita-mobile-menu').classList.toggle('hidden');
  document.getElementById('berita-menu-open').classList.toggle('hidden');
  document.getElementById('berita-menu-close').classList.toggle('hidden');
}
</script>
