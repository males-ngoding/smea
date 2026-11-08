ALTER TABLE "article" DROP CONSTRAINT "article_author_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "article" ALTER COLUMN "author_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;