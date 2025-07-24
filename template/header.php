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
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-title" content="Detonado Pokémon">
    <meta name="theme-color" content="#345952">

    <link rel="shortcut icon" href="./img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <!-- Altere a ordem dos scripts -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./js/pokedex.js"></script>
</head>

<body class="bg-light" onload="<?= isset($onLoad) && !empty($onLoad) ? $onLoad : '' ?>">
    <!-- <body class="bg-light" onload="carregarPokemonOculto()"> -->

    <header class="py-3 mb-3 border-bottom bg-white shadow-sm">
        <!-- Header para Desktop -->
        <div class="container d-none d-md-block">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="./" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none me-lg-4">
                    <img src="./img/pokeapi_256.png" alt="Logo" width="40" class="me-2">
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="./" class="nav-link px-2 link-dark fw-semibold">Pokédex</a></li>
                    <li><a href="./search-pokemon" class="nav-link px-2 link-dark fw-semibold">Procurar</a></li>
                    <li><a href="./mini-game" class="nav-link px-2 link-dark fw-semibold">Mini Game</a></li>
                    <li><a href="./detonado" class="nav-link px-2 link-dark fw-semibold">Detonado</a></li>
                </ul>

                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control" placeholder="Buscar Pokémon..." aria-label="Search">
                </form>

                <div class="dropdown text-end">
                    <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="./img/pokeball.png" alt="Menu" width="32" height="32" class="rounded-circle">
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end text-small shadow">
                        <li><a class="dropdown-item" href="./meus-pokemon">Meus Pokémon</a></li>
                        <li><a class="dropdown-item" href="./">Pokédex</a></li>
                        <li><a class="dropdown-item" href="./search-pokemon">Pesquisar</a></li>
                        <li><a class="dropdown-item" href="./mini-game">Mini Game</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="./detonado">Detonado</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Header para Mobile -->
        <div class="container-fluid d-md-none">
            <div class="d-grid gap-3 align-items-center">
                <div class="d-flex align-items-center">
                    <form class="w-100 me-3" role="search">
                        <input type="search" class="form-control" placeholder="Buscar Pokémon..." aria-label="Search">
                    </form>

                    <div class="flex-shrink-0 dropdown">
                        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="./img/pokeball.png" alt="Menu" width="32" height="32" class="rounded-circle">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end text-small shadow">
                            <li><a class="dropdown-item" href="./meus-pokemon">Meus Pokémon</a></li>
                            <li><a class="dropdown-item" href="./">Pokédex</a></li>
                            <li><a class="dropdown-item" href="./search-pokemon">Pesquisar</a></li>
                            <li><a class="dropdown-item" href="./mini-game">Mini Game</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="./detonado">Detonado</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Alert Container -->
    <div id="alert-container"></div>