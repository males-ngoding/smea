<?php
declare(strict_types=1);

require_once ROOT_PATH . '/views/partials/lucide-icons.php';

$heroImage = !empty($article['image']) ? $article['image'] : '/assets/img/placeholder-news.jpg';
$articleDate = format_date_id($article['published_at'] ?? $article['created_at'] ?? null);
$authorName = (string) ($article['author_name'] ?? '');
$authorInitial = mb_substr($authorName, 0, 1);
$footerSpacing = true;
?>
<div class="min-h-screen bg-gray-50">
  <?php require ROOT_PATH . '/views/partials/berita-navbar.php'; ?>

  <div class="relative h-[50vh] md:h-[60vh]">
    <img src="<?= e($heroImage) ?>" alt="<?= e($article['title']) ?>" class="absolute inset-0 w-full h-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

    <div class="absolute top-4 left-4 md:top-8 md:left-8 z-10">
      <nav class="flex items-center space-x-2 text-white/80 text-sm">
        <a href="/" class="hover:text-white transition-colors">Beranda</a>
        <?= lucide_icon('chevron-right', 'w-4 h-4') ?>
        <a href="/berita" class="hover:text-white transition-colors">Berita</a>
        <?= lucide_icon('chevron-right', 'w-4 h-4') ?>
        <span class="text-white truncate max-w-[150px] md:max-w-none"><?= e($article['title']) ?></span>
      </nav>
    </div>
  </div>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid lg:grid-cols-3 gap-8 -mt-40 relative z-10">
      <div class="lg:col-span-2">
        <article class="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div class="p-6 md:p-10">
            <div class="flex flex-wrap items-center gap-3 mb-6">
              <span class="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"><?= e($article['category_name'] ?? '') ?></span>
              <div class="flex items-center space-x-1 text-gray-500 text-sm">
                <?= lucide_icon('calendar', 'w-4 h-4') ?>
                <span><?= e($articleDate) ?></span>
              </div>
              <div class="flex items-center space-x-1 text-gray-500 text-sm">
                <?= lucide_icon('eye', 'w-4 h-4') ?>
                <span><?= e(number_format($views, 0, ',', '.')) ?> views</span>
              </div>
              <div class="flex items-center space-x-1 text-gray-500 text-sm">
                <?= lucide_icon('clock', 'w-4 h-4') ?>
                <span><?= e((string) $readingTime) ?> menit baca</span>
              </div>
            </div>

            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"><?= e($article['title']) ?></h1>

            <div class="flex items-center space-x-3 pb-6 border-b border-gray-200 mb-8">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-lg"><?= e($authorInitial) ?></span>
              </div>
              <div>
                <p class="font-semibold text-gray-900"><?= e($authorName) ?></p>
                <p class="text-sm text-gray-500">Penulis</p>
              </div>
            </div>

            <div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900"><?= $article['content'] ?></div>

            <div class="mt-10 pt-8 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <a href="/berita" class="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                  <?= lucide_icon('arrow-left', 'w-4 h-4') ?>
                  <span>Kembali ke Daftar Berita</span>
                </a>
                <div class="flex items-center space-x-2" data-title="<?= e($article['title']) ?>">
                  <span class="text-sm text-gray-500 mr-2">Bagikan:</span>
                  <button type="button" onclick="beritaShare('facebook', this.parentNode.dataset.title)" class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" aria-label="Share on Facebook">
                    <?= lucide_icon('facebook', 'w-4 h-4') ?>
                  </button>
                  <button type="button" onclick="beritaShare('twitter', this.parentNode.dataset.title)" class="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors" aria-label="Share on Twitter">
                    <?= lucide_icon('twitter', 'w-4 h-4') ?>
                  </button>
                  <button type="button" onclick="beritaShare('copy', this.parentNode.dataset.title)" class="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" aria-label="Copy link">
                    <?= lucide_icon('share-2', 'w-4 h-4') ?>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <?php if (count($related) > 0): ?>
          <div class="lg:hidden mt-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Berita Terkait</h3>
            <div class="space-y-4">
              <?php foreach ($related as $item): ?>
                <?php require ROOT_PATH . '/views/partials/berita-related-card.php'; ?>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>
      </div>

      <aside class="hidden lg:block space-y-8">
        <?php if (count($related) > 0): ?>
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">Berita Terkait</h3>
            <div class="space-y-4">
              <?php foreach ($related as $item): ?>
                <?php require ROOT_PATH . '/views/partials/berita-related-card.php'; ?>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>

        <?php if (count($latest) > 0): ?>
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">Berita Terbaru</h3>
            <div class="space-y-4">
              <?php foreach ($latest as $item): ?>
                <?php require ROOT_PATH . '/views/partials/berita-related-card.php'; ?>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>

        <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
          <h3 class="text-lg font-bold mb-4">Tautan Cepat</h3>
          <div class="space-y-3">
            <a href="/" class="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition-colors">
              <?= lucide_icon('chevron-right', 'w-4 h-4') ?>
              <span>Beranda</span>
            </a>
            <a href="/#jurusan" class="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition-colors">
              <?= lucide_icon('chevron-right', 'w-4 h-4') ?>
              <span>Jurusan</span>
            </a>
            <a href="/#kontak" class="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition-colors">
              <?= lucide_icon('chevron-right', 'w-4 h-4') ?>
              <span>Kontak</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  </main>

  <?php require ROOT_PATH . '/views/partials/berita-footer.php'; ?>
</div>
<script>
function beritaShare(kind, title) {
  var url = window.location.href;
  if (kind === 'facebook') {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank');
  } else if (kind === 'twitter') {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url), '_blank');
  } else {
    navigator.clipboard.writeText(url).then(function () {
      alert('Link berhasil disalin!');
    }, function () {
      console.error('Failed to copy link');
    });
  }
}
</script>
