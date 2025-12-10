import { useState, useEffect } from 'react';
import { fetchPokemon } from '../services/pokeapi';
import { imgArtwork, getRandomPokemonId, normalizeName } from '../utils/helpers';
import './MiniGame.css';

function MiniGame() {
  const [pokemon, setPokemon] = useState(null);
  const [resposta, setResposta] = useState('');
  const [revelado, setRevelado] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [erros, setErros] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    carregarPokemonOculto();
  }, []);

  const carregarPokemonOculto = async () => {
    try {
      const randomId = getRandomPokemonId();
      const data = await fetchPokemon(randomId);
      setPokemon(data);
      setRevelado(false);
      setResposta('');
    } catch (error) {
      console.error('Erro ao carregar pokémon:', error);
    }
  };

  const verificarResposta = () => {
    if (!resposta.trim()) {
      mostrarAlerta('Digite um nome!', 'warning');
      return;
    }

    const respostaNormalizada = normalizeName(resposta);
    const nomeCorreto = normalizeName(pokemon.name);

    if (respostaNormalizada === nomeCorreto) {
      setPontos(pontos + 1);
      mostrarAlerta('Parabéns! Você acertou! 🎉', 'success');
      setRevelado(true);
      setTimeout(() => carregarPokemonOculto(), 2000);
    } else {
      setErros(erros + 1);
      mostrarAlerta('Ops! Tente novamente! ❌', 'danger');
    }
  };

  const revelarPokemon = () => {
    setRevelado(true);
    setErros(erros + 1);
    mostrarAlerta(`Era ${pokemon.name}!`, 'info');
    setTimeout(() => carregarPokemonOculto(), 3000);
  };

  const mostrarAlerta = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verificarResposta();
    }
  };

  if (!pokemon) return <div className="container py-4">Carregando...</div>;

  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-danger">Quem é esse Pokémon?</h2>
        <div>
          <span className="badge bg-success me-2">Pontos: {pontos}</span>
          <span className="badge bg-danger">Erros: {erros}</span>
        </div>
      </div>

      {alert.show && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}

      <main className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg text-center p-4">
            <div className="pokemon-container mb-4">
              <img
                src={imgArtwork(pokemon.id)}
                alt="Pokemon oculto"
                className={`pokemon-image ${revelado ? 'revelado' : 'oculto'}`}
              />
            </div>

            {!revelado ? (
              <div className="input-group mx-auto mt-3">
                <input
                  type="text"
                  className="form-control text-capitalize"
                  placeholder="Digite o nome do Pokémon"
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
                <button className="btn btn-danger" onClick={verificarResposta}>
                  Tentar
                </button>
              </div>
            ) : (
              <div className="mt-3">
                <h3 className="text-capitalize text-success">{pokemon.name}</h3>
                <p className="text-muted">#{String(pokemon.id).padStart(3, '0')}</p>
              </div>
            )}

            <div className="mt-3">
              {!revelado && (
                <button className="btn btn-outline-secondary me-2" onClick={revelarPokemon}>
                  Desistir
                </button>
              )}
              <button className="btn btn-primary" onClick={carregarPokemonOculto}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Próximo
              </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default MiniGame;
