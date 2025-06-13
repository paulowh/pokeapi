const pokedex = document.getElementById('pokedex');

// Busca os dados de um Pokémon pelo ID
async function fetchPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    return await res.json();
}

// Carrega os 151 primeiros Pokémon
async function loadPokemon() {
    for (let i = 1; i <= 151; i++) {
        const pokemon = await fetchPokemon(i);
        const name = pokemon.name;

        // Pega os tipos do Pokémon (sem usar map)
        let type = "";
        for (let j = 0; j < pokemon.types.length; j++) {
            const typeName = pokemon.types[j].type.name;
            type += typeName;

            // Adiciona vírgula entre os tipos, exceto no último
            if (j < pokemon.types.length - 1) {
                type += ", ";
            }
        }

        // Cria a coluna do card
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-2 mb-4';

        // Conteúdo do card
        col.innerHTML = `
          <figure class="card pokemon-card h-100 text-center">
            <img src="${pokemon.sprites.front_default}" alt="${name}" class="pokemon-img p-3">
            <figcaption class="card-body">
              <h6 class="card-title mb-1 pokemon-title">${name}</h6>
              <p class="card-text text-muted"><small>${type}</small></p>
            </figcaption>
          </figure>
        `;

        // Adiciona o card na tela
        pokedex.appendChild(col);
    }
}

loadPokemon();
