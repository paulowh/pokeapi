<?php
$tittle = 'Consulta de Pokemon';
$onLoad = 'loadPokemon()';

include_once __DIR__ . '/template/header.php';
?>
<section class="container py-4">
    <h1 class="text-center text-danger mb-4">Pokédex - Os verdadeiros 151 Pokémon</h1>
    <div class="d-flex flex-wrap gap-2 mb-3 justify-content-center btn-group" id="botoes-geracao">
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(1)">Geração 1</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(2)">Geração 2</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(3)">Geração 3</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(4)">Geração 4</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(5)">Geração 5</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(6)">Geração 6</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(7)">Geração 7</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(8)">Geração 8</button>
        <button class="btn btn-outline-primary" type="button" onclick="loadPokemon(9)">Geração 9</button>
    </div>
    <main class="row" id="pokedex"></main>
</section>

</body>

</html>