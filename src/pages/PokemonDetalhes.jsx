import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPokemon, fetchPokemonSpecies, fetchEvolutionChain } from '../services/pokeapi';
import { translateType, getIcon, imgArtwork, formatId, getTypeColor, processEvolutionChain } from '../utils/helpers';
import { salvarPokemon, removerPokemon, isPokemonSalvo } from '../services/storage';
import Loading from '../components/Loading';
import './PokemonDetalhes.css';

function PokemonDetalhes() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    loadPokemonData();
    setSalvo(isPokemonSalvo(parseInt(id)));
  }, [id]);

  const loadPokemonData = async () => {
    setLoading(true);
    try {
      const pokemonData = await fetchPokemon(id);
      setPokemon(pokemonData);

      const speciesData = await fetchPokemonSpecies(id);
      setSpecies(speciesData);

      if (speciesData.evolution_chain) {
        const evolutionData = await fetchEvolutionChain(speciesData.evolution_chain.url);
        const evolutionList = processEvolutionChain(evolutionData.chain);
        // Enriquecer evoluções com tipos
        const evolutionsWithTypes = await Promise.all(
          evolutionList.map(async (evo) => {
            try {
              const evoData = await fetchPokemon(evo.id);
              return { ...evo, types: evoData.types || [] };
            } catch (err) {
              console.error('Erro ao carregar tipos da evolução', err);
              return { ...evo, types: [] };
            }
          })
        );
        setEvolutions(evolutionsWithTypes);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSalvar = () => {
    if (salvo) {
      removerPokemon(parseInt(id));
      setSalvo(false);
    } else {
      salvarPokemon(parseInt(id));
      setSalvo(true);
    }
  };

  const getDescricao = () => {
    if (!species || !species.flavor_text_entries) return '';
    const entry = species.flavor_text_entries.find(e => e.language.name === 'en');
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : '';
  };

  if (loading) return <Loading />;
  if (!pokemon) return <div className="container py-4"><h2>Pokémon não encontrado</h2></div>;

  // Mapear nomes de stats para português
  const statsLabels = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defesa',
    'special-attack': 'Ataque Especial',
    'special-defense': 'Defesa Especial',
    speed: 'Velocidade'
  };

  // Obter fraquezas (tipos que causam dano super efetivo)
  const getWeaknesses = () => {
    if (!pokemon.types) return [];
    // Para simplificar, vamos retornar um array vazio
    // Em uma implementação real, você buscaria dos dados de tipo da PokeAPI
    return [];
  };

  return (
    <div className="pokemon-detail-container">
      <div className="pokemon-detail-header">
        <Link to={`/pokemon/${String(parseInt(id) - 1)}`} className="nav-link prev">
          <i className="bi bi-chevron-left"></i> Nº {String(parseInt(id) - 1).padStart(4, '0')} Pokémon Anterior
        </Link>
        <button className="btn btn-primary save-btn" onClick={handleSalvar}>
          <i className={`bi ${salvo ? 'bi-bookmark-fill' : 'bi-bookmark'} me-2`}></i>
          {salvo ? 'Salvo' : 'Voltar à Pokédex'}
        </button>
        <Link to={`/pokemon/${String(parseInt(id) + 1)}`} className="nav-link next">
          Próximo Pokémon Nº {String(parseInt(id) + 1).padStart(4, '0')} <i className="bi bi-chevron-right"></i>
        </Link>
      </div>

      <div className="pokemon-detail-content">
        {/* Primeira linha do grid */}
        <div className="grid-row-first">
          {/* Coluna esquerda - Pokémon e dados */}
          <div className="detail-left">
            <div className="pokemon-card-grid">
              <h2 className="pokemon-name text-capitalize">{pokemon.name}</h2>
              <p className="pokemon-number">Nº {formatId(pokemon.id)}</p>

              <img
                src={imgArtwork(pokemon.id)}
                alt={pokemon.name}
                className="pokemon-image"
              />

              <p className="pokemon-description">{getDescricao()}</p>

              <div className="info-grid">
                <div className="info-box">
                  <span className="label">Altura</span>
                  <span className="value">{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="info-box">
                  <span className="label">Peso</span>
                  <span className="value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
                <div className="info-box">
                  <span className="label">Sexo</span>
                  <span className="value">♂ ♀</span>
                </div>
                <div className="info-box">
                  <span className="label">Categoria</span>
                  <span className="value text-capitalize">{species?.genera?.find(g => g.language.name === 'en')?.genus || 'Pokémon'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita - Tipo, Fraqueza, Estatísticas */}
          <div className="detail-right">
            {/* Tipo */}
            <div className="detail-card">
              <h3 className="card-title">Tipo</h3>
              <div className="types-container">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="type-badge"
                    style={{ backgroundColor: getTypeColor(type.type.name) }}
                  >
                    <img src={getIcon(type.type.name)} alt={type.type.name} className="type-icon" />
                    <span className="type-name">{translateType(type.type.name)}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Fraquezas */}
            <div className="detail-card">
              <h3 className="card-title">Fraquezas</h3>
              <div className="weaknesses-container">
                <span className="weakness-badge" style={{ backgroundColor: getTypeColor('fire') }}>
                  <img src={getIcon('fire')} alt="fire" className="type-icon" />
                  <span className="type-name">Fogo</span>
                </span>
                <span className="weakness-badge" style={{ backgroundColor: getTypeColor('ice') }}>
                  <img src={getIcon('ice')} alt="ice" className="type-icon" />
                  <span className="type-name">Gelo</span>
                </span>
                <span className="weakness-badge" style={{ backgroundColor: getTypeColor('flying') }}>
                  <img src={getIcon('flying')} alt="flying" className="type-icon" />
                  <span className="type-name">Voador</span>
                </span>
                <span className="weakness-badge" style={{ backgroundColor: getTypeColor('psychic') }}>
                  <img src={getIcon('psychic')} alt="psychic" className="type-icon" />
                  <span className="type-name">Psíquico</span>
                </span>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="detail-card">
              <h3 className="card-title">Estatísticas</h3>
              <div className="stats-container">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="stat-row">
                    <span className="stat-label">{statsLabels[stat.stat.name] || stat.stat.name}</span>
                    <span className="stat-value">{stat.base_stat}</span>
                    <div className="stat-bar">
                      <div
                        className="stat-fill"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Segunda linha do grid - Habilidades e Evoluções (100% width) */}
        <div className="grid-row-second">
          {/* Habilidades */}
          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <div className="detail-card abilities-card">
              <h3 className="card-title">Habilidades</h3>
              <div className="abilities-list">
                {pokemon.abilities.map((ability, index) => (
                  <div key={index} className="ability-item text-capitalize">
                    <strong>{ability.ability.name}</strong>
                    {ability.is_hidden && <span className="badge bg-warning ms-2">Oculta</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evoluções */}
          {evolutions.length > 0 && (
            <div className="detail-card evolutions-card">
              <h3 className="card-title">Evoluções</h3>
              <div className="evolution-container">
                {evolutions.map((evo, index) => (
                  <React.Fragment key={evo.id}>
                    {index > 0 && <span className="evolution-arrow">→</span>}
                    <Link to={`/pokemon/${evo.id}`} className="evolution-link">
                      <div className="evolution-item">
                        <img src={evo.img} alt={evo.name} className="evolution-img" />
                        <p className="text-capitalize mb-1">{evo.name}</p>
                        <small className="text-muted">Nº {formatId(evo.id)}</small>
                        {evo.types && evo.types.length > 0 && (
                          <div className="evolution-types">
                            {evo.types.map((typeObj, i) => (
                              <span
                                key={i}
                                className="type-badge evolution-type"
                                style={{ backgroundColor: getTypeColor(typeObj.type.name) }}
                              >
                                <img src={getIcon(typeObj.type.name)} alt={typeObj.type.name} className="type-icon" />
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetalhes;
