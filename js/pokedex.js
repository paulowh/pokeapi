// Função principal usada tanto pelo botão quanto pelo enter
function buscarPokemonCompleto(valor = null) {
    const entrada = document.getElementById('entrada');
    const resultado = document.getElementById('resultado');

    const busca = valor || entrada.value.trim().toLowerCase();

    if (busca === '') {
        resultado.innerHTML = '<div class="alert alert-warning text-center">Digite algo para buscar.</div>';
        return;
    }

    if (!isNaN(busca)) { // se é número
        const numero = Number(busca);
        if (numero > 151) {
            resultado.innerHTML = `<div class="alert alert-warning text-center" role="alert">
                Atenção: Esse sistema é de respeito, então só trabalhamos com Pokémon da primeira geração.
            </div>`;
            return;
        }
        if (numero < 1) {
            resultado.innerHTML = `<div class="alert alert-warning text-center" role="alert">
                Por favor, digite um número válido entre 1 e 151.
            </div>`;
            return;
        }
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${busca}`)
        .then(resposta => resposta.ok ? resposta.json() : null)
        .then(pokemon => {
            if (!pokemon) {
                resultado.innerHTML = `
                    <div class="alert alert-danger text-center">
                        Pokémon não encontrado.
                    </div>`;
                return;
            }

            if (pokemon.id > 151) {
                resultado.innerHTML = `
                    <div class="alert alert-warning text-center">
                        Ta achando que sou besta? 
                        Só Pokémon da primeira geração.
                    </div>
                `;
                return;
            }

            let tipos = '';
            for (let i = 0; i < pokemon.types.length; i++) {
                tipos += pokemon.types[i].type.name;
                if (i < pokemon.types.length - 1) {
                    tipos += ', ';
                }
            }


            let status = '';
            for (let i = 0; i < pokemon.stats.length; i++) {
                const nome = pokemon.stats[i].stat.name;
                status += `<li class="pokemon-status-item">${nome.toUpperCase()}: ${pokemon.stats[i].base_stat}</li>`;
            }

            let habilidades = '';
            for (let i = 0; i < pokemon.abilities.length; i++) {
                habilidades += pokemon.abilities[i].ability.name;
                if (i < pokemon.abilities.length - 1) {
                    habilidades += ', ';
                }
            }

            resultado.innerHTML = `
                <article class="pokemon-card p-3">
                    <div class="card-top-actions d-flex justify-content-end mb-2">
                        <button class="btn btn-salvar-pokemon" onclick="salvarPokemon(${pokemon.id})"">Salvar</button>
                    </div>
                    <header class="text-center mb-3">
                        <div class="pokemon-images mb-2">
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokedex-img">
                        <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name} shiny" class="pokedex-img">
                        </div>
                        <h4 class="pokemon-title mb-1">${pokemon.name}</h4>
                        ${pokemon.id == 7 ? "<h4 class='pokemon-title mb-1'>O Melhor de todos</h4>" : ''}
                        <small class="pokemon-id">#${pokemon.id}</small>
                        
                    </header>
                    
                    <hr>

                    <section class="pokemon-detalhes mb-3">
                        <h6 class="pokemon-section-title">Informações Básicas</h6>
                        <ul class="pokemon-info-list">
                        <li><strong>Tipo:</strong> ${tipos}</li>
                        <li><strong>Altura:</strong> ${(pokemon.height / 10).toFixed(1)} m</li>
                        <li><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</li>
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
                        <ul class="pokemon-status-list">
                        ${status}
                        </ul>
                    </section>
                </article>
                `;

        })
        .catch(() => {
            resultado.innerHTML = `
                < div class="alert alert-danger text-center" >
                    Erro ao buscar o Pokémon.
            </div > `;
        });

}

// Função para gerar número aleatório de 1 a 151
function buscarPokemonAleatorio() {
    const numero = Math.floor(Math.random() * 151) + 1;
    buscarPokemonCompleto(numero);
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

    // Exibe a lista completa no console
    console.log('📦 Lista de Pokémons salvos:', pokemons);
}

async function pokemon() {
    const salvos = sessionStorage.getItem('pokemonsSalvos');
    if (!salvos) {
        console.log('Você ainda não salvou nenhum Pokémon.');
        return;
    }

    const ids = JSON.parse(salvos);
    console.log(`Pokémons salvos: ${ids.join(', ')}`);

    for (const id of ids) {
        try {
            const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemon = await resposta.json();
            console.log(`#${pokemon.id} - ${pokemon.name}`);
        } catch (erro) {
            console.error(`Erro ao buscar Pokémon com ID ${id}:`, erro);
        }
    }
}

function limparPokemon() {
  sessionStorage.removeItem('pokemonsSalvos');
  console.log('Todos os Pokémons salvos foram removidos do sessionStorage.');
}