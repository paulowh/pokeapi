<?php
/**
 * Pokédx Web App - Core Configuration
 * Arquivo central com configurações e funções utilitárias
 */

// Configurações de erro (desenvolvimento)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Constantes da aplicação
define('APP_NAME', 'Pokédx Web App');
define('APP_VERSION', '2.0.0');
define('BASE_PATH', '/pokeapi');

// Carregar dependências
require_once __DIR__ . '/../vendor/autoload.php';

// Configurar Twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false, // Em produção: __DIR__ . '/../cache'
    'debug' => true   // Em produção: false
]);

$twig->addExtension(new \Twig\Extension\DebugExtension());

// Adicionar funções PHP ao Twig
$twig->addFunction(new \Twig\TwigFunction('asset', 'asset'));
$twig->addFunction(new \Twig\TwigFunction('url', 'url'));

// === FUNÇÕES UTILITÁRIAS ===

/**
 * Renderiza um template Twig
 */
function render(string $template, array $data = []): string
{
    global $twig;
    
    if (!str_ends_with($template, '.twig')) {
        $template .= '.twig';
    }
    
    return $twig->render($template, $data);
}

/**
 * Gera URL relativa à aplicação
 */
function url(string $path = ''): string
{
    return BASE_PATH . '/' . ltrim($path, '/');
}

/**
 * Gera URL para assets (CSS, JS, IMG)
 */
function asset(string $path): string
{
    return url('public/' . ltrim($path, '/'));
}

/**
 * Sanitiza dados de entrada
 */
function sanitize(string $data): string
{
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Retorna dados JSON de forma segura
 */
function jsonResponse(array $data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Verifica se a requisição é AJAX
 */
function isAjax(): bool
{
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
}

/**
 * Redireciona para uma URL
 */
function redirect(string $url): void
{
    header('Location: ' . $url);
    exit;
}
