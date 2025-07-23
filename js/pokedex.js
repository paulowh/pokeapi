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
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json());
};

function mostrarAlerta(mensagem, tipo = 'info') {
    const alertContainer = document.getElementById('alert-container');
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    `;

    alertContainer.appendChild(alerta);
    setTimeout(() => {
        alerta.classList.remove('show');
        alerta.classList.add('hide');
        setTimeout(() => alerta.remove(), 300);
    }, 2000);
}

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
}

function limparPokemon() {
    sessionStorage.removeItem('pokemonsSalvos');
    location.reload();
}

function buscarPokemonCompleto(valor = null) {
    const entrada = valor || document.getElementById('entrada').value.trim().toLowerCase();
    const resultado = document.getElementById('resultado');

    if (!entrada) {
        resultado.innerHTML = '<div class="alert alert-warning text-center">Digite algo para buscar.</div>';
        return;
    }

    const numero = Number(entrada);
    if (!isNaN(numero) && numero < 1) {
        resultado.innerHTML = '<div class="alert alert-warning text-center">Digite um número válido maior que 1.</div>';
        return;
    }

    fetchPokemon(entrada)
        .then(pokemon => {
            if (!pokemon) {
                resultado.innerHTML = '<div class="alert alert-danger text-center">Pokémon não encontrado ou inválido.</div>';
                return;
            }

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

            fetch('./render', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    template: '/pokemon-ficha',
                    data: data
                })
            })
                .then(response => response.text())
                .then(html => {
                    resultado.innerHTML = html;
                })
                .catch(() => {
                    resultado.innerHTML = '<div class="alert alert-danger text-center">Erro ao carregar os dados do Pokémon.</div>';
                });
        })
        .catch(() => {
            resultado.innerHTML = '<div class="alert alert-danger text-center">Erro ao buscar o Pokémon.</div>';
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
        document.getElementById('container-pokemon').innerHTML =
            `<img src="${imgArtwork(data.id)}" alt="Quem é esse Pokémon?" id="pokemon-imagem" class="oculto">`;
        document.getElementById('resposta').value = '';
    });
}

function verificarResposta() {
    const resposta = document.getElementById('resposta').value.trim().toLowerCase();
    const imagem = document.getElementById('pokemon-imagem');

    if (resposta === pokemonAtual) {
        imagem.classList.remove('oculto');
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
            const types = pokemon.types.map(t => ({
                nome: t.type.name,
                icon: getIcon(t.type.name)
            }));
            const habilidades = pokemon.abilities.map(a => a.ability.name).join(', ');

            $.ajax({
                url: './render',
                method: 'POST',
                dataType: 'html',
                contentType: 'application/json',
                data: JSON.stringify({
                    template: 'pokemon-card',
                    data: {
                        id: pokemon.id,
                        nome: pokemon.name,
                        img: imgArtwork(pokemon.id),
                        types: types,
                        habilidades: habilidades
                    }
                }),
                success: function (html) {
                    container.append(html);
                },
                error: function () {
                    console.error(`Erro ao renderizar Pokémon salvo ID ${id}`);
                }
            });

        } catch (erro) {
            console.error(`Erro ao buscar Pokémon com ID ${id}:`, erro);
        }
    }
}

let currentRequests = [];
let isLoading = false;
let currentGen = 1;
let currentIndex = 0;
const POKEMON_PER_PAGE = 20;

async function loadPokemon(gen = 1) {
    if (gen !== null) {
        currentGen = gen;
        currentIndex = GERACOES[gen].inicio;
        const pokedex = document.getElementById('pokedex');
        pokedex.innerHTML = '';
    }

    if (isLoading) return;
    isLoading = true;

    const myLoadId = ++currentLoadId;
    const pokedex = document.getElementById('pokedex');
    const endIndex = Math.min(currentIndex + POKEMON_PER_PAGE, GERACOES[currentGen].fim);

    try {
        for (let i = currentIndex; i <= endIndex; i++) {
            if (myLoadId !== currentLoadId) return;

            const pokemon = await fetchPokemon(i);
            const types = pokemon.types.map(t => ({
                nome: t.type.name,
                icon: getIcon(t.type.name)
            }));

            const response = await fetch('./render', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    template: 'pokemon-card',
                    data: {
                        id: pokemon.id,
                        nome: pokemon.name,
                        types: types,
                        img: imgArtwork(pokemon.id)
                    }
                })
            });

            if (myLoadId === currentLoadId) {
                const html = await response.text();
                const div = document.createElement('div');
                div.innerHTML = html;
                pokedex.appendChild(div.firstChild);
            }
        }

        currentIndex = endIndex + 1;
        
        // Verifica se chegou ao fim da geração atual
        if (currentIndex > GERACOES[currentGen].fim) {
            document.removeEventListener('scroll', scrollHandler);
        }

    } catch (error) {
        console.error(`Erro ao renderizar Pokémon:`, error);
    } finally {
        isLoading = false;
    }
}

// Função para verificar o scroll
function scrollHandler() {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 500) {
        loadPokemon();
    }
}

// Adicionar o event listener para o scroll
document.addEventListener('scroll', scrollHandler);

// Modificar o HTML para adicionar um indicador de carregamento
$(() => {
    // Iniciar ao carregar
});
