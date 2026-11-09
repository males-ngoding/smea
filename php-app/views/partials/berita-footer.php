<?php
declare(strict_types=1);
?>
<footer class="bg-gray-900 text-white py-12<?= isset($footerSpacing) ? ' mt-16' : '' ?>">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="mb-6 md:mb-0">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-sm">YP17</span>
          </div>
          <div>
            <h3 class="font-bold">SMK YP 17 Cilegon</h3>
            <p class="text-sm text-gray-400">Membangun Generasi Unggul</p>
          </div>
        </div>
      </div>
      <p class="text-gray-400 text-sm">&copy; <?= e(date('Y')) ?> SMK YP 17 Cilegon. All rights reserved.</p>
    </div>
  </div>
</footer>
