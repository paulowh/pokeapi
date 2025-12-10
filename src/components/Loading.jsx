import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="mt-3 text-muted">Carregando pokémons...</p>
    </div>
  );
}

export default Loading;
