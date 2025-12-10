import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { salvarPokemon, removerPokemon, isPokemonSalvo } from '../services/storage';
import { translateType, getIcon, imgArtwork, formatId, getTypeColor } from '../utils/helpers';
import './PokemonCard.css';

function PokemonCard({ pokemon }) {
  const [salvo, setSalvo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setSalvo(isPokemonSalvo(pokemon.id));
  }, [pokemon.id]);

  const handleSalvar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (salvo) {
      removerPokemon(pokemon.id);
      setSalvo(false);
      mostrarAlerta('Pokémon removido dos salvos!');
    } else {
      salvarPokemon(pokemon.id);
      setSalvo(true);
      mostrarAlerta('Pokémon salvo com sucesso!');
    }
  };

  const mostrarAlerta = (msg) => {
    setAlertMessage(msg);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <>
      <div className="col-md-4 col-lg-3">
        <div className="pokemon-card">
          <button
            className={`bookmark-btn ${salvo ? 'active' : ''}`}
            onClick={handleSalvar}
            title={salvo ? 'Remover dos salvos' : 'Salvar pokémon'}
          >
            <i className={`bi ${salvo ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
          </button>

          <Link to={`/pokemon/${pokemon.id}`} className="card-link">
            <div className="pokemon-id">ID: #{formatId(pokemon.id)}</div>

            <div className="pokemon-image-container">
              <img
                src={imgArtwork(pokemon.id)}
                alt={pokemon.name}
                className="pokemon-img"
                loading="lazy"
              />
            </div>

            <h5 className="pokemon-name">{pokemon.name}</h5>

            <div className="pokemon-types">
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className="type-badge"
                >
                  <img
                    src={getIcon(type.type.name)}
                    alt={type.type.name}
                    className="type-icon"
                  />
                  {translateType(type.type.name)}
                </span>
              ))}
            </div>
          </Link>
        </div>
      </div>

      {showAlert && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 9999 }}>
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {alertMessage}
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonCard;
