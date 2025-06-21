<?php

require_once __DIR__ . '/vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/template');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
    'debug' => true
]);

$twig->addExtension(new \Twig\Extension\DebugExtension());

function render(string $template, array $data = []): string {
    global $twig;

    if (!str_ends_with($template, '.twig')) {
        $template .= '.twig';
    }

    return $twig->render($template, $data);
}
