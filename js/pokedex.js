// ==== Constantes ====
const TOTALPOKEMON = 1025;
const GERACOES = {
    1: { inicio: 1, fim: 151 },
    2: { inicio: 152, fim: 251 },
    3: { inicio: 252, fim: 386 },
    4: { inicio: 387, fim: 493 },
    5: { inicio: 494, fim: 649 },
    6: { inicio: 650, fim: 721 },
    7: { inicio: 722, fim: 809 },
    8: { inicio: 810, fim: 905 },
    9: { inicio: 906, fim: 1025 }
};

let currentLoadId = 0;
let currentRequest = null;
let pokemonAtual = '';

// ==== Funções utilitárias ====
const getIcon = type => `./img/icons/${type}.svg`;
const imgArtwork = (id, shiny = false) => shiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const fetchPokemon = id => {
    if (currentRequest) currentRequest.abort();
    currentRequest = new AbortController();

    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        method: 'GET',
        signal: currentRequest.signal
    });
};

function mostrarAlerta(mensagem, tipo = 'info') {
    const alerta = $(
        `<div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        </div>`
    );
    $('#alert-container').append(alerta);
    setTimeout(() => {
        alerta.removeClass('show').addClass('hide');
        setTimeout(() => alerta.remove(), 300);
    }, 2000);
}

// ==== Funções principais ====
function salvarPokemon(id) {
    const lista = sessionStorage.getItem('pokemonsSalvos');
    const pokemons = lista ? JSON.parse(lista) : [];

    if (!pokemons.includes(id)) {
        pokemons.push(id);
        sessionStorage.setItem('pokemonsSalvos', JSON.stringify(pokemons));
        mostrarAlerta(`Pokémon #${id} salvo.`, 'success');
    } else {
        mostrarAlerta(`Pokémon #${id} já está salvo.`, 'info');
    }
    console.log('Lista de Pokémons salvos:', pokemons);
}

function limparPokemon() {
    sessionStorage.removeItem('pokemonsSalvos');
    location.reload();
}

function buscarPokemonCompleto(valor = null) {
    const busca = (valor || $('#entrada').val().trim().toLowerCase());

    if (!busca) {
        $('#resultado').html('<div class="alert alert-warning text-center">Digite algo para buscar.</div>');
        return;
    }

    const numero = Number(busca);
    if (!isNaN(numero) && numero < 1) {
        $('#resultado').html('<div class="alert alert-warning text-center">Digite um número válido maior que 1.</div>');
        return;
    }

    fetchPokemon(busca)
        .done(pokemon => {
            if (!pokemon) {
                $('#resultado').html('<div class="alert alert-danger text-center">Pokémon não encontrado ou inválido.</div>');
                return;
            }

            // Prepara os dados para enviar ao PHP + Twig
            const data = {
                id: pokemon.id,
                nome: pokemon.name,
                tipos: pokemon.types.map(t => t.type.name),
                habilidades: pokemon.abilities.map(h => h.ability.name),
                stats: pokemon.stats.map(s => ({
                    nome: s.stat.name,
                    valor: s.base_stat
                })),
                altura: (pokemon.height / 10).toFixed(1),
                peso: (pokemon.weight / 10).toFixed(1),
                shiny: [7, 8, 9].includes(pokemon.id),
            };

            $.ajax({
                url: './render',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    template: '/pokemon-card',
                    data: data
                }),
                success: function (html) {
                    $('#resultado').html(html);
                },
                error: function () {
                    $('#resultado').html('<div class="alert alert-danger text-center">Erro ao carregar os dados do Pokémon.</div>');
                }
            });
        })
        .fail(() => {
            $('#resultado').html('<div class="alert alert-danger text-center">Erro ao buscar o Pokémon.</div>');
        });
}

function buscarPokemonAleatorio() {
    const numero = Math.floor(Math.random() * TOTALPOKEMON) + 1;
    buscarPokemonCompleto(numero);
}

function carregarPokemonOculto() {
    const id = Math.floor(Math.random() * TOTALPOKEMON) + 1;
    fetchPokemon(id).then(data => {
        pokemonAtual = data.name.toLowerCase();
        $('#container-pokemon').html(`<img src="${imgArtwork(data.id)}" alt="Quem é esse Pokémon?" id="pokemon-imagem" class="oculto">`);
        $('#resposta').val('');
    });
}

function verificarResposta() {
    const resposta = $('#resposta').val().trim().toLowerCase();
    const imagem = $('#pokemon-imagem');

    if (resposta === pokemonAtual) {
        imagem.removeClass('oculto');
        mostrarAlerta('Acertou! miserável', 'success');
    } else {
        mostrarAlerta('Errouuu !!!', 'danger');
    }
}

async function carregarMeusPokemon() {
    const container = $('#lista-pokemons');
    const salvos = sessionStorage.getItem('pokemonsSalvos');

    if (!salvos || JSON.parse(salvos).length === 0) {
        container.html('<div class="alert alert-info text-center">Nenhum Pokémon salvo ainda.</div>');
        return;
    }

    container.empty();
    const ids = JSON.parse(salvos);

    for (const id of ids) {
        try {
            const pokemon = await fetchPokemon(id);
            const typeHTML = pokemon.types.map(t => `
                <div class="d-flex align-items-center mx-1">
                    <img src="${getIcon(t.type.name)}" alt="${t.type.name}" title="${t.type.name}" class="me-1 type-icon ${t.type.name}">
                    <small class="text-capitalize">${t.type.name}</small>
                </div>`).join('');

            const habilidades = pokemon.abilities.map(a => a.ability.name).join(', ');

            const col = $('<div>').addClass('col-6 col-md-4 col-lg-3').html(`
                <div class="card text-center shadow-sm h-100">
                    <img src="${imgArtwork(pokemon.id)}" class="card-img-top p-3" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                        <div class="d-flex justify-content-center flex-wrap mb-2">${typeHTML}</div>
                        <p class="card-text"><strong>Habilidades:</strong> ${habilidades}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">ID: #${pokemon.id}</small>
                    </div>
                </div>`);
            container.append(col);
        } catch (erro) {
            console.error(`Erro ao buscar Pokémon com ID ${id}:`, erro);
        }
    }
}

function loadPokemon(gen = 1) {
    if (currentRequest) currentRequest.abort();
    currentRequest = new AbortController();
    const signal = currentRequest.signal;
    const myLoadId = ++currentLoadId;

    const $pokedex = $('#pokedex');
    $pokedex.empty();

    (async () => {
        for (let i = GERACOES[gen].inicio; i <= GERACOES[gen].fim; i++) {
            if (myLoadId !== currentLoadId) return;

            try {
                const pokemon = await fetchPokemon(i);
                const typeHTML = pokemon.types.map(t => `
                    <div class="d-flex align-items-center mx-1">
                        <img src="${getIcon(t.type.name)}" alt="${t.type.name}" title="${t.type.name}" class="me-1 type-icon ${t.type.name}">
                        <small class="text-capitalize">${t.type.name}</small>
                    </div>`).join('');

                const col = $('<div>').addClass('col-6 col-md-4 col-lg-3 col-xl-2 mb-4').html(`
                    <figure class="card pokemon-card text-center h-100">
                        <img src="${imgArtwork(pokemon.id)}" alt="${pokemon.name}" class="pokemon-img p-3">
                        <figcaption class="card-body">
                            <h6 class="card-title mb-1 pokemon-title">${pokemon.name} #${pokemon.id}</h6>
                            <div class="d-flex justify-content-center flex-wrap">${typeHTML}</div>
                        </figcaption>
                        <div class="card-top-actions d-flex justify-content-end mb-2 p-1">
                            <button class="btn btn-secondary btn-sm" onclick="salvarPokemon(${pokemon.id})">Salvar</button>
                        </div>
                    </figure>`);

                $pokedex.append(col);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error(`Erro ao carregar Pokémon ID ${i}:`, error);
                }
            }
        }
    })();
}

$(() => {
    // Iniciar ao carregar
});
