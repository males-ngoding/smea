<?php
declare(strict_types=1);

const ROOT_PATH = __DIR__ . '/..';

require ROOT_PATH . '/config/database.php';
require ROOT_PATH . '/helpers/auth.php';
require ROOT_PATH . '/helpers/view.php';
require ROOT_PATH . '/helpers/articles.php';

ini_set('display_errors', '0');
error_reporting(E_ALL);
