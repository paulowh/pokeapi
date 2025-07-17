<?php
require_once __DIR__ . '/../function.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= isset($tittle) && !empty($tittle) ? $tittle : 'Pokemon' ?></title>

    <link rel="shortcut icon" href="./img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/style.css">

    <script src="./js/jquery-3.7.1.min.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/pokedex.js"></script>
</head>

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
                    <li class="nav-item mt-3">
                        <a href="./meus-pokemon" class="btn btn-dark w-100">Meus Pokémon</a>
                    </li>
                    <li class="nav-item mt-3">
                        <a href="./mini-game" class="btn btn-dark w-100">Mini Game</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <div id="alert-container"></div>