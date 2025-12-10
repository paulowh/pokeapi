export const salvarPokemon = (id) => {
  const salvos = getPokemonsSalvos();
  if (!salvos.includes(id)) {
    salvos.push(id);
    localStorage.setItem('pokemonsSalvos', JSON.stringify(salvos));
    return true;
  }
  return false;
};

export const removerPokemon = (id) => {
  const salvos = getPokemonsSalvos();
  const novaSalvos = salvos.filter(pokemonId => pokemonId !== id);
  localStorage.setItem('pokemonsSalvos', JSON.stringify(novaSalvos));
};

export const getPokemonsSalvos = () => {
  const salvos = localStorage.getItem('pokemonsSalvos');
  return salvos ? JSON.parse(salvos) : [];
};

export const isPokemonSalvo = (id) => {
  const salvos = getPokemonsSalvos();
  return salvos.includes(id);
};

export const limparPokemon = () => {
  localStorage.removeItem('pokemonsSalvos');
};
