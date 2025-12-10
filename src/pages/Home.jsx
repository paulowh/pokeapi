import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPokemonByGeneration } from '../services/pokeapi';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import './Home.css';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geracao, setGeracao] = useState(parseInt(searchParams.get('g')) || 1);

  useEffect(() => {
    loadPokemon(geracao);
  }, [geracao]);

  const loadPokemon = async (gen) => {
    setLoading(true);
    try {
      const data = await fetchPokemonByGeneration(gen);
      setPokemons(data);
    } catch (error) {
      console.error('Erro ao carregar pokémons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerationClick = (gen) => {
    setGeracao(gen);
    setSearchParams({ g: gen });
  };

  return (
    <section className="container py-4">
      <h1 className="text-center text-danger mb-4">Pokédex</h1>

      <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
          <button
            key={gen}
            className={`btn ${geracao === gen ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => handleGenerationClick(gen)}
          >
            Geração {gen}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <main className="row gy-4">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </main>
      )}
    </section>
  );
}

export default Home;
