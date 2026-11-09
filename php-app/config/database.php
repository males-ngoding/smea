<?php
declare(strict_types=1);

// Edit these values for your cPanel database, or set the DB_* environment variables.
const DB_HOST = 'localhost';
const DB_NAME = 'your_cpanel_db';
const DB_USER = 'your_cpanel_user';
const DB_PASS = 'your_db_password';
const DB_CHARSET = 'utf8mb4';

function db(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = getenv('DB_HOST') ?: DB_HOST;
    $name = getenv('DB_NAME') ?: DB_NAME;
    $user = getenv('DB_USER') ?: DB_USER;
    $pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : DB_PASS;

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $host, $name, DB_CHARSET);

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}
