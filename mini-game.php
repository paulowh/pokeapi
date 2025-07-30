<?php
$tittle = 'Consulta de Pokemon';
$onLoad = 'carregarPokemonOculto()';

include_once __DIR__ . '/src/templates/header.php';
?>
<section class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-danger">Quem é esse Pokémon?</h2>
    </div>

    <main class="row justify-content-center">
        <div class="col-md-6">
            <div id="alert-container"></div>

            <div class="card shadow text-center p-4">
                <div id="container-pokemon" class="mb-4"></div>

                <div id="input-group" class="input-group mx-auto mt-3">
                    <input type="text" id="resposta" class="form-control text-capitalize" placeholder="Digite o nome do Pokémon"
                        aria-label="Nome do Pokémon">
                    <button class="btn btn-secondary" type="button" onclick="verificarResposta()">Tentar</button>
                </div>

            </div>
        </div>
    </main>
</section>

</body>

</html>