<?php

include_once __DIR__ . '/function.php';

// Lê o corpo da requisição como JSON
$input = json_decode(file_get_contents('php://input'), true);

if (
    !isset($input['template']) || 
    !is_string($input['template']) || 
    empty($input['template'])
) {
    http_response_code(400);
    exit('Template inválido');
}

$template = $input['template'];
$data = isset($input['data']) && is_array($input['data']) ? $input['data'] : [];

echo render($template, $data);
