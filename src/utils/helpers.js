// Type translations
export const TIPOS_TRADUCAO = {
  normal: 'Normal',
  fighting: 'Lutador',
  flying: 'Voador',
  poison: 'Venenoso',
  ground: 'Terrestre',
  rock: 'Pedra',
  bug: 'Inseto',
  ghost: 'Fantasma',
  steel: 'Aço',
  fire: 'Fogo',
  water: 'Água',
  grass: 'Grama',
  electric: 'Elétrico',
  psychic: 'Psíquico',
  ice: 'Gelo',
  dragon: 'Dragão',
  dark: 'Sombrio',
  fairy: 'Fada'
};

// Translate pokemon type
export const translateType = (type) => {
  return TIPOS_TRADUCAO[type.toLowerCase()] || type;
};

export const getIcon = (type) => {
  return `/img/icons/${type}.svg`;
};

export const imgArtwork = (id, shiny = false) => {
  return shiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const formatId = (id) => {
  return String(id).padStart(3, '0');
};

export const getTypeColor = (type) => {
  const colors = {
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC'
  };
  return colors[type.toLowerCase()] || '#777';
};

export const processEvolutionChain = (chain) => {
  const evolutions = [];

  const extractEvolutions = (chainLink) => {
    if (!chainLink) return;

    const urlParts = chainLink.species.url.split('/');
    const id = parseInt(urlParts[urlParts.length - 2]);

    evolutions.push({
      id,
      name: chainLink.species.name,
      img: imgArtwork(id)
    });

    if (chainLink.evolves_to && chainLink.evolves_to.length > 0) {
      chainLink.evolves_to.forEach(evolution => extractEvolutions(evolution));
    }
  };

  extractEvolutions(chain);
  return evolutions;
};

export const getRandomPokemonId = (max = 1025) => {
  return Math.floor(Math.random() * max) + 1;
};

export const normalizeName = (name) => {
  return name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
