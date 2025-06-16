const pokedex = document.getElementById('pokedex');

async function fetchPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    return await res.json();
}

async function loadPokemon() {
    for (let i = 1; i <= 151; i++) {
        const pokemon = await fetchPokemon(i);
        const name = pokemon.name;
        const id = pokemon.id;

        let type = "";
        for (let j = 0; j < pokemon.types.length; j++) {
            const typeName = pokemon.types[j].type.name;
            type += typeName;

            if (j < pokemon.types.length - 1) {
                type += ", ";
            }
        }

        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-2 mb-4';

        col.innerHTML = `
          <figure class="card pokemon-card h-100 text-center">
            <img src="${pokemon.sprites.front_default}" alt="${name}" class="pokemon-img p-3">
            <figcaption class="card-body">
              <h6 class="card-title mb-1 pokemon-title">${name} #${id}</h6>
              <p class="card-text text-muted"><small>${type}</small></p>
            </figcaption>
          </figure>
        `;

        pokedex.appendChild(col);
    }
}

loadPokemon();
