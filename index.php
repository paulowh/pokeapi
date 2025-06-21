<?php
$tittle = 'Consulta de Pokemon';

include_once __DIR__ . '/template/header.php';
?>

<section class="container py-4">
    <h2 class="text-center text-primary mb-4">Buscar Pokémon</h2>
    
    <main class="row justify-content-center mb-4">
        <div class="col-md-6 d-flex gap-2">
            <input type="text" id="entrada" class="form-control" placeholder="Digite nome ou número">
            <button class="btn btn-danger" onclick="buscarPokemonCompleto()">Buscar</button>
            <button class="btn btn-secondary" onclick="buscarPokemonAleatorio()">Aleatório</button>
        </div>
    </main>

    <main class="row justify-content-center">
        <div class="col-md-6 pokedex" id="resultado"></div>
    </main>
</section>