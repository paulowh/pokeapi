const pokedex = document.getElementById('pokedex');

async function fetchPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  return await res.json();
}

function getIcon(type) {
  return `./img/icons/${type}.svg`;
}

async function loadPokemon() {
  for (let i = 1; i <= 151; i++) {
    const pokemon = await fetchPokemon(i);
    const name = pokemon.name;
    const id = pokemon.id;

    let typeNames = [];
    let typeHTML = "";

    for (let j = 0; j < pokemon.types.length; j++) {
      const typeName = pokemon.types[j].type.name;
      typeNames.push(typeName);

      const iconType = getIcon(typeName);

      typeHTML += /*html*/`
        <div class="d-flex align-items-center mx-1">
          <img src="${iconType}" alt="${typeName}" title="${typeName}" class="me-1 type-icon ${typeName}">
          <small class="text-capitalize">${typeName}</small>
        </div>
      `;


    }

    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-2 mb-4';

    col.innerHTML = /*html*/`
      <figure class="card pokemon-card text-center h-100">
        <img src="${pokemon.sprites.front_default}" alt="${name}" class="pokemon-img p-3">
        <figcaption class="card-body">
          <h6 class="card-title mb-1 pokemon-title">${name} #${id}</h6>
          <div class="d-flex justify-content-center flex-wrap">
            ${typeHTML}
          </div>
        </figcaption>
      </figure>
      `;

    pokedex.appendChild(col);
  }


}

loadPokemon();
