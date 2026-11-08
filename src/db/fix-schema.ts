import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function fixSchema() {
  try {
    console.log("🔧 Fixing article schema...");

    // Drop existing foreign key constraint if exists
    await sql`
      ALTER TABLE "article" 
      DROP CONSTRAINT IF EXISTS "article_author_id_user_id_fk"
    `;
    console.log("  ✅ Dropped old constraint");

    // Make author_id nullable
    await sql`
      ALTER TABLE "article" 
      ALTER COLUMN "author_id" DROP NOT NULL
    `;
    console.log("  ✅ Made author_id nullable");

    // Add new foreign key constraint with ON DELETE SET NULL
    await sql`
      ALTER TABLE "article" 
      ADD CONSTRAINT "article_author_id_user_id_fk" 
      FOREIGN KEY ("author_id") 
      REFERENCES "user"("id") 
      ON DELETE SET NULL
    `;
    console.log("  ✅ Added new constraint");

    console.log("✨ Schema fixed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing schema:", error);
    process.exit(1);
  }
}

fixSchema();
