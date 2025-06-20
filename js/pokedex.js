// functions
function criarHeader() {
    fetch('./template/header.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const template = tempDiv.querySelector('#header-template');
            const clone = template.content.cloneNode(true);

            const headerElement = clone.querySelector('header');
            document.body.prepend(clone);

            // Espera o próximo frame para garantir inserção
            requestAnimationFrame(() => {
                document.body.classList.add('loaded'); // libera conteúdo
                document.getElementById('preloader').classList.add('hidden'); // esconde o loading
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o header:', error);
            document.body.classList.add('loaded');
            document.getElementById('preloader').classList.add('hidden');
        });
}

document.addEventListener('DOMContentLoaded', criarHeader);

function getIcon(type) {
    return `./img/icons/${type}.svg`;
}

async function fetchPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    return await res.json();
}

function salvarPokemon(id) {
    let lista = sessionStorage.getItem('pokemonsSalvos');
    let pokemons = lista ? JSON.parse(lista) : [];

    if (!pokemons.includes(id)) {
        pokemons.push(id);
        sessionStorage.setItem('pokemonsSalvos', JSON.stringify(pokemons));
        console.log(`✅ Pokémon #${id} salvo na sessão!`);
    } else {
        console.log(`ℹ️ Pokémon #${id} já está salvo.`);
    }

    console.log('📦 Lista de Pokémons salvos:', pokemons);
}

function limparPokemon() {
    sessionStorage.removeItem('pokemonsSalvos');
    location.reload();
    console.log('Todos os Pokémons salvos foram removidos do sessionStorage.');
}

async function listarPokemonsSalvos() {
    const salvos = sessionStorage.getItem('pokemonsSalvos');
    if (!salvos) {
        console.log('Você ainda não salvou nenhum Pokémon.');
        return;
    }

    const ids = JSON.parse(salvos);
    console.log(`Pokémons salvos: ${ids.join(', ')}`);

    for (const id of ids) {
        try {
            const resposta = await fetchPokemon(id);
            const pokemon = await resposta.json();
            console.log(`#${pokemon.id} - ${pokemon.name}`);
        } catch (erro) {
            console.error(`Erro ao buscar Pokémon com ID ${id}:`, erro);
        }
    }
}
//pokedex
function buscarPokemonCompleto(valor = null) {
    const entrada = document.getElementById('entrada');
    const resultado = document.getElementById('resultado');
    const busca = valor || entrada.value.trim().toLowerCase();

    if (busca === '') {
        resultado.innerHTML = '<div class="alert alert-warning text-center">Digite algo para buscar.</div>';
        return;
    }

    const numero = Number(busca);
    if (!isNaN(numero)) {
        if (numero < 1) {
            // resultado.innerHTML = `<div class="alert alert-warning text-center">Digite um número válido entre 1 e 151.</div>`;
            resultado.innerHTML = `<div class="alert alert-warning text-center">Digite um número válido maior que 1.</div>`;
            return;
        }
    }

    fetchPokemon(busca).then(pokemon => {
        if (!pokemon || pokemon.id > 151) {
            // resultado.innerHTML = `<div class="alert alert-danger text-center">Pokémon não encontrado ou inválido.</div>`;
            // resultado.innerHTML = `<div class="alert alert-danger text-center">Cuidado, depois do 151 não é mais Pokémon.</div>`;
            mostrarAlerta('Cuidado, depois do 151 não é mais Pokémon.', 'danger');
            // return;
        }

        let tipos = pokemon.types.map(t => t.type.name).join(', ');
        let status = pokemon.stats.map(s => `<li class="pokemon-status-item">${s.stat.name.toUpperCase()}: ${s.base_stat}</li>`).join('');
        let habilidades = pokemon.abilities.map(h => h.ability.name).join(', ');

        resultado.innerHTML = /*html */`
            <article class="pokemon-card p-3">
                <div class="card-top-actions d-flex justify-content-end mb-2">
                    <button class="btn btn-salvar-pokemon" onclick="salvarPokemon(${pokemon.id})">Salvar</button>
                </div>
                <header class="text-center mb-3">
                    <div class="pokemon-images mb-2">
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokedex-img">
                        <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name} shiny" class="pokedex-img">
                    </div>
                    <h4 class="pokemon-title mb-1">${pokemon.name}</h4>
                    ${[7, 8, 9].includes(pokemon.id) ? "<h4 class='pokemon-title mb-1'>O Melhor de todos</h4>" : ''}
                    <small class="pokemon-id">#${pokemon.id}</small>
                </header>
                <hr>
                <section class="pokemon-detalhes mb-3">
                    <h6 class="pokemon-section-title">Informações Básicas</h6>
                    <ul class="pokemon-info-list">
                        <li><strong>Tipo:</strong> ${tipos}</li>
                        <li><strong>Altura:</strong> ${(pokemon.height / 10).toFixed(1)}m</li>
                        <li><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)}kg</li>
                    </ul>
                </section>
                <hr>
                <section class="pokemon-habilidades mb-3">
                    <h6 class="pokemon-section-title">Habilidades</h6>
                    <p class="mb-0">${habilidades}</p>
                </section>
                <hr>
                <section class="pokemon-status">
                    <h6 class="pokemon-section-title">Estatísticas</h6>
                    <ul class="pokemon-status-list">${status}</ul>
                </section>
            </article>
        `;
    }).catch(() => {
        resultado.innerHTML = `<div class="alert alert-danger text-center">Erro ao buscar o Pokémon.</div>`;
    });
}
const TOTALPOKEMON = 1025

function buscarPokemonAleatorio() {
    const numero = Math.floor(Math.random() * TOTALPOKEMON) + 1;
    buscarPokemonCompleto(numero);
}

//mini-game
async function carregarPokemonOculto() {
    const id = Math.floor(Math.random() * TOTALPOKEMON) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    pokemonAtual = data.name.toLowerCase();

    const container = document.getElementById('container-pokemon');
    container.innerHTML = `
        <img src="${data.sprites.other['official-artwork'].front_default}" alt="Quem é esse Pokémon?" id="pokemon-imagem" class="oculto">
    `;

    document.getElementById('resposta').value = '';
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

function mostrarAlerta(mensagem, tipo = 'info') {
    const container = document.getElementById('alert-container');
    const alerta = document.createElement('div');

    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    `;

    container.appendChild(alerta);

    setTimeout(() => {
        alerta.classList.remove('show');
        alerta.classList.add('hide');
        setTimeout(() => alerta.remove(), 300); // Espera a transição do fade
    }, 2000);
}

//meus-pokemon
async function carregarMeusPokemon() {
    const container = document.getElementById('lista-pokemons');
    const salvos = sessionStorage.getItem('pokemonsSalvos');

    if (!salvos) {
        container.innerHTML = '<div class="alert alert-warning text-center">Você ainda não salvou nenhum Pokémon.</div>';
        return;
    }

    const ids = JSON.parse(salvos);
    if (ids.length === 0) {
        container.innerHTML = '<div class="alert alert-info text-center">Nenhum Pokémon salvo ainda.</div>';
        return;
    }

    container.innerHTML = '';

    for (const id of ids) {
        try {
            const pokemon = await fetchPokemon(id);

            let typeHTML = pokemon.types.map(t => {
                const typeName = t.type.name;
                const iconType = getIcon(typeName);
                return /*html */`
                    <div class="d-flex align-items-center mx-1">
                        <img src="${iconType}" alt="${typeName}" title="${typeName}" class="me-1 type-icon ${typeName}">
                        <small class="text-capitalize">${typeName}</small>
                    </div>
                    `;
            }).join('');

            const habilidades = pokemon.abilities.map(a => a.ability.name).join(', ');

            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3';
            col.innerHTML = /*html */`
                <div class="card text-center shadow-sm h-100">
                <img src="${pokemon.sprites.front_default}" class="card-img-top p-3" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                    <div class="d-flex justify-content-center flex-wrap mb-2">${typeHTML}</div>
                    <p class="card-text"><strong>Habilidades:</strong> ${habilidades}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">ID: #${pokemon.id}</small>
                </div>
                </div>
            `;
            container.appendChild(col);
        } catch (erro) {
            console.error(`Erro ao buscar Pokémon com ID ${id}:`, erro);
        }
    }
}

//listar pokemon
const pokedex = document.getElementById('pokedex');
async function loadPokemon() {
    for (let i = 1; i <= TOTALPOKEMON; i++) {
        const pokemon = await fetchPokemon(i);
        const name = pokemon.name;
        const id = pokemon.id;

        const typeHTML = pokemon.types.map(t => {
            const typeName = t.type.name;
            const iconType = getIcon(typeName);
            return `
        <div class="d-flex align-items-center mx-1">
          <img src="${iconType}" alt="${typeName}" title="${typeName}" class="me-1 type-icon ${typeName}">
          <small class="text-capitalize">${typeName}</small>
        </div>
      `;
        }).join('');

        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-2 mb-4';
        col.innerHTML = `
      <figure class="card pokemon-card text-center h-100">
        <img src="${pokemon.sprites.front_default}" alt="${name}" class="pokemon-img p-3">
        <figcaption class="card-body">
          <h6 class="card-title mb-1 pokemon-title">${name} #${id}</h6>
          <div class="d-flex justify-content-center flex-wrap">${typeHTML}</div>
        </figcaption>
      </figure>
    `;

        pokedex.appendChild(col);
    }
}
