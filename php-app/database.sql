-- ============================================================
-- SMKS YP 17 Cilegon - MySQL schema, seed data, admin account
-- Target: MySQL 5.7+ / MariaDB 10.3+ (cPanel default)
--
-- How to use:
--   1. In cPanel, create a MySQL database and a user, and grant the
--      user ALL privileges on that database.
--   2. Open phpMyAdmin, select the database, and import this file
--      (or paste it into the SQL tab).
--   3. Change the default admin password after the first login.
--
-- Re-running this file is safe: tables use IF NOT EXISTS and seed rows
-- use INSERT IGNORE, so existing data is not dropped.
-- ============================================================

SET NAMES utf8mb4;

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
-- Seed data: initial admin account
-- Email:    admin@smkyp17.sch.id
-- Password: admin12345   (CHANGE THIS after first login)
-- The hash is a bcrypt hash created the same way as PHP password_hash().
-- To create a different password, run this in a terminal and replace the hash:
--     php -r "echo password_hash('YourStrongPassword', PASSWORD_BCRYPT), PHP_EOL;"
-- ------------------------------------------------------------
INSERT IGNORE INTO users (id, name, email, password_hash, role) VALUES
    ('7c1d2e3f-4a5b-4c6d-8e7f-9a0b1c2d3e4f', 'Administrator', 'admin@smkyp17.sch.id',
     '$2y$10$OwKHuuam9QebB5xcPtdumeilBrEcesa3y0e4142jMiczdvzIGDA8.', 'admin');
