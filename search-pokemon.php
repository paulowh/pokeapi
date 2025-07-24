<?php
$tittle = 'Consulta de Pokemon';

include_once __DIR__ . '/template/header.php';

// Captura o parâmetro de pesquisa da URL
$termoPesquisa = isset($_GET['q']) ? htmlspecialchars($_GET['q']) : '';
?>

<section class="container py-4">
    <h2 class="text-center text-primary mb-4">Buscar Pokémon</h2>
    
    <main class="row justify-content-center mb-4">
        <div class="col-md-6 d-flex gap-2">
            <div class="autocomplete-container flex-grow-1">
                <input type="text" id="entrada" class="form-control" placeholder="Digite nome ou número" value="<?= $termoPesquisa ?>" autocomplete="off" oninput="buscarSugestoes(this)" onkeydown="navegarSugestoes(event)" onblur="ocultarSugestoes()">
                <div id="sugestoes-entrada" class="autocomplete-suggestions"></div>
            </div>
            <button class="btn btn-danger" onclick="buscarPokemonCompleto()">Buscar</button>
            <button class="btn btn-secondary" onclick="buscarPokemonAleatorio()">Aleatório</button>
        </div>
    </main>

    <main class="row justify-content-center">
        <div class="col-md-6 pokedex" id="resultado"></div>
    </main>
</section>

<?php if (!empty($termoPesquisa)): ?>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Executa a pesquisa automaticamente quando há um termo na URL
    buscarPokemonCompleto('<?= addslashes($termoPesquisa) ?>');
});
</script>
<?php endif; ?>

</body>
</html>