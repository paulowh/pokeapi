import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPokemon } from '../services/pokeapi';
import { getPokemonsSalvos, limparPokemon } from '../services/storage';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import './MeusPokemon.css';

function MeusPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedPokemons();
  }, []);

  const loadSavedPokemons = async () => {
    setLoading(true);
    try {
      const savedIds = getPokemonsSalvos();
      const promises = savedIds.map(id => fetchPokemon(id));
      const pokemonsData = await Promise.all(promises);
      setPokemons(pokemonsData);
    } catch (error) {
      console.error('Erro ao carregar pokémons salvos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLimpar = () => {
    if (window.confirm('Deseja realmente remover todos os pokémons salvos?')) {
      limparPokemon();
      setPokemons([]);
    }
  };

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-danger">Meus Pokémon Salvos</h2>
        {pokemons.length > 0 && (
          <button className="btn btn-outline-danger" onClick={handleLimpar}>
            <i className="bi bi-trash me-2"></i>
            Limpar Tudo
          </button>
        )}
      </div>

      {loading ? (
        <Loading />
      ) : pokemons.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-bookmark display-1 text-muted"></i>
          <h3 className="mt-3 text-muted">Nenhum pokémon salvo</h3>
          <p className="text-muted">Comece a salvar seus pokémons favoritos!</p>
          <Link to="/" className="btn btn-danger mt-3">
            Ir para Pokédex
          </Link>
        </div>
      ) : (
        <div className="row gy-4">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
}

export default MeusPokemon;
