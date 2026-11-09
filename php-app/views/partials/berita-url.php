<?php
declare(strict_types=1);

function berita_list_url(array $params, string $path = '/berita'): string
{
    $clean = array_filter($params, static fn($value): bool => $value !== null && $value !== '');
    return $path . ($clean ? '?' . http_build_query($clean) : '');
}
