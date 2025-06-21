<?php
require_once __DIR__ . '/../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../template');
$twig = new \Twig\Environment($loader, [
    'cache' => false, 
]);
