import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const TOTAL_POKEMON = 1025;

export const GERACOES = {
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

// Fetch single pokemon
export const fetchPokemon = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pokemon:', error);
    throw error;
  }
};

// Fetch pokemon species
export const fetchPokemonSpecies = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar espécie:', error);
    throw error;
  }
};

// Fetch evolution chain
export const fetchEvolutionChain = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cadeia evolutiva:', error);
    throw error;
  }
};

// Fetch pokemon list by generation
export const fetchPokemonByGeneration = async (generation) => {
  const { inicio, fim } = GERACOES[generation];
  const promises = [];

  for (let i = inicio; i <= fim; i++) {
    promises.push(fetchPokemon(i));
  }

  try {
    return await Promise.all(promises);
  } catch (error) {
    console.error('Erro ao buscar pokémons da geração:', error);
    throw error;
  }
};

// Search pokemon by name or id
export const searchPokemon = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${query.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pokemon:', error);
    return null;
  }
};
