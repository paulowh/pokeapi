<?php
require_once __DIR__ . '/../function.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= isset($tittle) && !empty($tittle) ? $tittle : 'Pokemon' ?></title>

    <!-- Manifesto PWA -->
    <link rel="manifest" href="./manifest.json">

    <!-- Ícones Apple -->
    <link rel="apple-touch-icon" href="./img/icon-192.png">

    <!-- Meta Tags para iPhone -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Detonado Pokémon">
    <meta name="theme-color" content="#345952">

    <link rel="shortcut icon" href="./img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="./css/bootstrap.min.css">

    <link rel="stylesheet" href="./css/style.css">

    <script src="./js/jquery-3.7.1.min.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/pokedex.js"></script>
</head>
<script>
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        if (confirm('Deseja adicionar este site à tela inicial?')) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou adicionar à tela inicial');
                } else {
                    console.log('Usuário recusou adicionar à tela inicial');
                }
                deferredPrompt = null;
            });
        }
    });

    function isIos() {
        return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    }

    function isInStandaloneMode() {
        return ('standalone' in window.navigator) && (window.navigator.standalone);
    }

    if (isIos() && !isInStandaloneMode()) {
        alert('Para adicionar este site à sua tela inicial, toque no botão de compartilhar e depois em "Adicionar à Tela de Início".');
    }
</script>

<body class="bg-light" onload="<?= isset($onLoad) && !empty($onLoad) ? $onLoad : '' ?>">
    <!-- <body class="bg-light" onload="carregarPokemonOculto()"> -->

    <header class="navbar navbar-light bg-white border-bottom shadow-sm">
        <nav class="container d-flex justify-content-between align-items-center">
            <a class="navbar-brand fw-bold d-flex align-items-center" href="./">
                <img src="./img/pokeapi_256.png" alt="Logo" width="40" class="me-2" />
                PokéApp
            </a>
            <button class="btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu"
                aria-controls="offcanvasMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <ul class="navbar-nav d-none d-lg-flex flex-row gap-3 mb-0">
                <li class="nav-item"><a class="nav-link text-dark fw-semibold" href="./">Pokédex</a></li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-semibold" href="./listar-pokemon">Listar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-semibold" href="./mini-game">Mini Game</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-semibold" href="./detonado">Detonado</a>
                </li>

            </ul>
            <div class="d-none d-lg-block">
                <a href="./meus-pokemon" class="btn btn-dark">Meus Pokémon</a>
            </div>
        </nav>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasMenuLabel">PokéApp</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Fechar"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav gap-2">
                    <li class="nav-item"><a class="nav-link text-dark fw-semibold" href="./">Pokédex</a></li>
                    <li class="nav-item">
                        <a class="nav-link text-dark fw-semibold" href="./listar-pokemon">Listar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark fw-semibold" href="./meus-pokemon">Listar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark fw-semibold" href="./meus-pokemon">Meus Pokémon</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark fw-semibold" href="./detonado">Detonado</a>
                    </li>
                    <li class="nav-item mt-3">
                        <a href="./mini-game" class="btn btn-dark w-100">Mini Game</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <div id="alert-container"></div>