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
  const base = import.meta.env.BASE_URL || '/';
  return `${base}img/icons/${type}.svg`;
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

const TYPE_WEAKNESSES = {
  normal: ['fighting'],
  fighting: ['flying', 'psychic', 'fairy'],
  flying: ['rock', 'electric', 'ice'],
  poison: ['ground', 'psychic'],
  ground: ['water', 'grass', 'ice'],
  rock: ['fighting', 'ground', 'steel', 'water', 'grass'],
  bug: ['flying', 'rock', 'fire'],
  ghost: ['ghost', 'dark'],
  steel: ['fighting', 'ground', 'fire'],
  fire: ['ground', 'rock', 'water'],
  water: ['grass', 'electric'],
  grass: ['flying', 'poison', 'bug', 'fire', 'ice'],
  electric: ['ground'],
  psychic: ['bug', 'ghost', 'dark'],
  ice: ['fighting', 'rock', 'steel', 'fire'],
  dragon: ['ice', 'dragon', 'fairy'],
  dark: ['fighting', 'bug', 'fairy'],
  fairy: ['poison', 'steel']
};

const TYPE_RESISTANCES = {
  normal: [],
  fighting: ['rock', 'bug', 'dark'],
  flying: ['fighting', 'bug', 'grass'],
  poison: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
  ground: ['poison', 'rock'],
  rock: ['normal', 'flying', 'poison', 'fire'],
  bug: ['fighting', 'ground', 'grass'],
  ghost: ['poison', 'bug'],
  steel: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
  fire: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
  water: ['steel', 'fire', 'water', 'ice'],
  grass: ['ground', 'water', 'grass', 'electric'],
  electric: ['flying', 'steel', 'electric'],
  psychic: ['fighting', 'psychic'],
  ice: ['ice'],
  dragon: ['fire', 'water', 'grass', 'electric'],
  dark: ['ghost', 'dark'],
  fairy: ['fighting', 'bug', 'dark']
};

const TYPE_IMMUNITIES = {
  normal: ['ghost'],
  fighting: [],
  flying: ['ground'],
  poison: [],
  ground: ['electric'],
  rock: [],
  bug: [],
  ghost: ['normal', 'fighting'],
  steel: ['poison'],
  fire: [],
  water: [],
  grass: [],
  electric: [],
  psychic: [],
  ice: [],
  dragon: [],
  dark: ['psychic'],
  fairy: ['dragon']
};

export const getWeaknesses = (types) => {
  if (!types || types.length === 0) return [];

  const damageMultipliers = {};

  Object.keys(TYPE_WEAKNESSES).forEach(type => {
    damageMultipliers[type] = 1;
  });

  types.forEach(typeObj => {
    const typeName = typeObj.type.name;

    TYPE_WEAKNESSES[typeName]?.forEach(weakType => {
      damageMultipliers[weakType] = (damageMultipliers[weakType] || 1) * 2;
    });

    TYPE_RESISTANCES[typeName]?.forEach(resistType => {
      damageMultipliers[resistType] = (damageMultipliers[resistType] || 1) * 0.5;
    });

    TYPE_IMMUNITIES[typeName]?.forEach(immuneType => {
      damageMultipliers[immuneType] = 0;
    });
  });

  const weaknesses = Object.entries(damageMultipliers)
    .filter(([type, multiplier]) => multiplier > 1)
    .map(([type, multiplier]) => ({ type, multiplier }))
    .sort((a, b) => b.multiplier - a.multiplier);

  return weaknesses;
};
