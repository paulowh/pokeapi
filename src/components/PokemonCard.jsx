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
        <Link to={`/pokemon/${pokemon.id}`} className="text-decoration-none">
          <div className="card pokemon-card h-100 shadow-sm">
            <div className="card-body text-center position-relative">
              <button
                className={`btn btn-sm position-absolute top-0 end-0 m-2 ${salvo ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleSalvar}
                title={salvo ? 'Remover dos salvos' : 'Salvar pokémon'}
              >
                <i className={`bi ${salvo ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
              </button>

              <span className="badge bg-secondary mb-2">#{formatId(pokemon.id)}</span>

              <img
                src={imgArtwork(pokemon.id)}
                alt={pokemon.name}
                className="pokemon-img img-fluid mb-3"
                loading="lazy"
              />

              <h5 className="card-title text-capitalize">{pokemon.name}</h5>

              <div className="d-flex gap-2 justify-content-center flex-wrap">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="badge type-badge"
                    style={{ backgroundColor: getTypeColor(type.type.name) }}
                  >
                    <img
                      src={getIcon(type.type.name)}
                      alt={type.type.name}
                      className="type-icon me-1"
                    />
                    {translateType(type.type.name)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
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
