<?php
$tittle = 'Consulta de Pokemon';
$onLoad = 'carregarMeusPokemon()';

include_once __DIR__ . '/src/templates/header.php';
?>

<main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-danger">Meus Pokémon Salvos</h2>
        <button class="btn btn-outline-danger" onclick="limparPokemon()">Limpar Tudo</button>
    </div>
    <div id="lista-pokemons" class="row gy-4"></div>
</main>

</body>

</html>