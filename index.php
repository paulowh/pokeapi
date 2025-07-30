<?php
$t?>
<section class="container py-4">
    <h1 class="text-center text-danger mb-4">Pokédx</h1>
    
    <!-- Botão para Filtros Avançados -->
    <div class="d-flex justify-content-center mb-3">
        <a href="./filtros-avancados" class="btn btn-outline-primary btn-lg">
            <i class="bi bi-funnel"></i> Filtros Avançados
        </a>
    </div>
    
    <!-- <div class="d-flex flex-wrap gap-2 mb-3 justify-content-center btn-group" id="botoes-geracao">e = 'Consulta de Pokemon';


$gen = isset($_GET['g']) ? htmlspecialchars($_GET['g']) : 1;

$onLoad = 'loadPokemon(' . $gen. ')';

include_once __DIR__ . '/src/templates/header.php';
?>
<section class="container py-4">
    <h1 class="text-center text-danger mb-4">Pokédex</h1>
    <!-- <div class="d-flex flex-wrap gap-2 mb-3 justify-content-center btn-group" id="botoes-geracao">
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(1)">Geração 1</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(2)">Geração 2</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(3)">Geração 3</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(4)">Geração 4</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(5)">Geração 5</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(6)">Geração 6</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(7)">Geração 7</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(8)">Geração 8</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(9)">Geração 9</button>
    </div> -->
    <div class="d-flex flex-wrap gap-2 mb-3 justify-content-center btn-group" id="botoes-geracao">
        <a href="./?g=1" class="btn btn-outline-primary" type="button" >Geração 1</a>
        <a href="./?g=2" class="btn btn-outline-primary" type="button" >Geração 2</a>
        <a href="./?g=3" class="btn btn-outline-primary" type="button" >Geração 3</a>
        <a href="./?g=4" class="btn btn-outline-primary" type="button" >Geração 4</a>
        <a href="./?g=5" class="btn btn-outline-primary" type="button" >Geração 5</a>
        <a href="./?g=6" class="btn btn-outline-primary" type="button" >Geração 6</a>
        <a href="./?g=7" class="btn btn-outline-primary" type="button" >Geração 7</a>
        <a href="./?g=8" class="btn btn-outline-primary" type="button" >Geração 8</a>
        <a href="./?g=9" class="btn btn-outline-primary" type="button" >Geração 9</a>
    </div>

    <main class="row gy-4 position-relative" id="pokedex">
        <!-- ...existing code... -->
    </main>
    <div id="loading-indicator" class="text-center mt-4 d-none">
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Carregando...</span>
        </div>
    </div>
</section>

<script>
    // Adicionar o event listener para o scroll
    document.addEventListener('scroll', scrollHandler);
</script>
</body>

</html>