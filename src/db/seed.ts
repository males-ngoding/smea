import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { categories } from "./schema";
import "dotenv/config";

// Pastikan DATABASE_URL ada
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set in environment variables");
  console.log("💡 Make sure you have .env.local file with DATABASE_URL");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const defaultCategories = [
  {
    name: "Pengumuman",
    slug: "pengumuman",
    description: "Pengumuman resmi sekolah",
  },
  {
    name: "Kegiatan",
    slug: "kegiatan",
    description: "Kegiatan dan acara sekolah",
  },
  {
    name: "Prestasi",
    slug: "prestasi",
    description: "Prestasi siswa dan sekolah",
  },
  { name: "Akademik", slug: "akademik", description: "Informasi akademik" },
  {
    name: "Ekstrakurikuler",
    slug: "ekstrakurikuler",
    description: "Kegiatan ekstrakurikuler",
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding categories...");

    for (const category of defaultCategories) {
      await db.insert(categories).values(category).onConflictDoNothing();
      console.log(`  ✅ Added: ${category.name}`);
    }

    console.log("✨ Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
