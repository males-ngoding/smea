// Script untuk mengupdate artikel yang belum punya category
// Run dengan: tsx src/db/fix-article-categories.ts

import { db } from "@/drizzle";
import { articles, categories } from "@/db/schema";
import { eq, isNull } from "drizzle-orm";

async function fixArticleCategories() {
  try {
    console.log("🔍 Mencari artikel tanpa category...");

    // 1. Ambil semua categories
    const allCategories = await db.select().from(categories);
    
    if (allCategories.length === 0) {
      console.log("❌ Tidak ada category di database!");
      console.log("   Buat category terlebih dahulu:");
      console.log("   - Prestasi");
      console.log("   - Kegiatan");
      console.log("   - Pengumuman");
      console.log("   - Berita Umum");
      return;
    }

    console.log(`✅ Ditemukan ${allCategories.length} categories:`);
    allCategories.forEach((cat) => {
      console.log(`   - ${cat.name} (${cat.slug})`);
    });

    // 2. Ambil artikel tanpa category
    const articlesWithoutCategory = await db
      .select()
      .from(articles)
      .where(isNull(articles.categoryId));

    console.log(
      `\n🔍 Ditemukan ${articlesWithoutCategory.length} artikel tanpa category`
    );

    if (articlesWithoutCategory.length === 0) {
      console.log("✅ Semua artikel sudah punya category!");
      return;
    }

    // 3. Cari atau buat default category "Berita Umum"
    let defaultCategory = allCategories.find(
      (cat) => cat.slug === "berita-umum" || cat.slug === "umum"
    );

    if (!defaultCategory) {
      console.log('\n📝 Membuat category default "Berita Umum"...');
      const [newCategory] = await db
        .insert(categories)
        .values({
          name: "Berita Umum",
          slug: "berita-umum",
          description: "Kategori untuk berita umum",
        })
        .returning();
      defaultCategory = newCategory;
      console.log("✅ Category 'Berita Umum' berhasil dibuat!");
    }

    // 4. Update artikel tanpa category
    console.log(
      `\n🔄 Mengupdate ${articlesWithoutCategory.length} artikel...`
    );

    for (const article of articlesWithoutCategory) {
      await db
        .update(articles)
        .set({ categoryId: defaultCategory.id })
        .where(eq(articles.id, article.id));

      console.log(`   ✅ Updated: ${article.title}`);
    }

    console.log("\n✅ Selesai! Semua artikel sudah punya category.");
    
    // 5. Verifikasi
    const remainingWithoutCategory = await db
      .select()
      .from(articles)
      .where(isNull(articles.categoryId));

    console.log(
      `\n📊 Verifikasi: ${remainingWithoutCategory.length} artikel masih tanpa category`
    );
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Run the script
fixArticleCategories()
  .then(() => {
    console.log("\n✅ Script selesai dijalankan!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Script gagal:", error);
    process.exit(1);
  });
