-- ============================================================
-- SMKS YP 17 Cilegon - MySQL schema and seed data
-- Target: MySQL 5.7+ / MariaDB 10.3+ (cPanel default)
--
-- How to use:
--   1. In cPanel, create a MySQL database and a user, and grant the
--      user ALL privileges on that database.
--   2. Open phpMyAdmin, select the database, and import this file
--      (or paste it into the SQL tab).
--   3. Create the admin account (see the bottom of this file).
--
-- This script is safe to re-run: it uses CREATE TABLE IF NOT EXISTS
-- and INSERT IGNORE, so existing data is not dropped.
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+07:00';

-- ------------------------------------------------------------
-- Users (admin accounts)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id            CHAR(36)     NOT NULL,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(190) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role          ENUM('admin', 'editor') NOT NULL DEFAULT 'admin',
    created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Categories
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS category (
    id          CHAR(36)     NOT NULL,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(100) NOT NULL,
    description TEXT         NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY category_slug_unique (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Articles (berita)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS article (
    id           CHAR(36)     NOT NULL,
    title        VARCHAR(255) NOT NULL,
    slug         VARCHAR(255) NOT NULL,
    excerpt      TEXT         NULL,
    content      LONGTEXT     NOT NULL,
    image        VARCHAR(500) NULL,
    status       ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    author_id    CHAR(36)     NULL,
    category_id  CHAR(36)     NULL,
    views        INT UNSIGNED NOT NULL DEFAULT 0,
    published_at DATETIME     NULL,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY article_slug_unique (slug),
    KEY article_status_published_idx (status, published_at),
    KEY article_category_idx (category_id),
    KEY article_author_idx (author_id),
    CONSTRAINT article_author_fk FOREIGN KEY (author_id)
        REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT article_category_fk FOREIGN KEY (category_id)
        REFERENCES category (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Seed data: default categories
-- ------------------------------------------------------------
INSERT IGNORE INTO category (id, name, slug, description) VALUES
    ('0b6f1c2e-6a1d-4f7e-9a51-1f3c2d8e0001', 'Pengumuman',      'pengumuman',      'Pengumuman resmi sekolah'),
    ('0b6f1c2e-6a1d-4f7e-9a51-1f3c2d8e0002', 'Kegiatan',        'kegiatan',        'Kegiatan dan acara sekolah'),
    ('0b6f1c2e-6a1d-4f7e-9a51-1f3c2d8e0003', 'Prestasi',        'prestasi',        'Prestasi siswa dan sekolah'),
    ('0b6f1c2e-6a1d-4f7e-9a51-1f3c2d8e0004', 'Akademik',        'akademik',        'Informasi akademik'),
    ('0b6f1c2e-6a1d-4f7e-9a51-1f3c2d8e0005', 'Ekstrakurikuler', 'ekstrakurikuler', 'Kegiatan ekstrakurikuler');

-- ------------------------------------------------------------
-- Admin account
-- The password must be hashed with PHP's password_hash() (bcrypt).
-- Do NOT store a plain-text password here. Use the CLI script
-- create_admin.php (in the php-app folder) to create the first admin:
--
--     php create_admin.php "Administrator" admin@smkyp17.sch.id "YourStrongPassword"
--
-- Alternatively, generate a hash with PHP and insert it manually:
--
--     php -r "echo password_hash('YourStrongPassword', PASSWORD_BCRYPT), PHP_EOL;"
--
-- and then run (replace the placeholder hash):
--
--     INSERT INTO users (id, name, email, password_hash, role)
--     VALUES (UUID(), 'Administrator', 'admin@smkyp17.sch.id',
--             '<PASTE_BCRYPT_HASH_HERE>', 'admin');
-- ------------------------------------------------------------
