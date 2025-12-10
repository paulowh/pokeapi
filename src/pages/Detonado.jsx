import './Detonado.css';

function Detonado() {
  return (
    <div className="container py-4">
      <h2 className="text-danger mb-4">Detonado Pokémon</h2>

      <div className="card shadow-lg">
        <div className="card-body">
          <h4 className="card-title">Guia Completo</h4>
          <p className="text-muted mb-4">
            Acesse nosso guia completo em PDF com todas as informações sobre Pokémons,
            estratégias, evoluções e muito mais!
          </p>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="info-card p-4 text-center">
                <i className="bi bi-book-fill display-4 text-danger mb-3"></i>
                <h5>Guia Digital</h5>
                <p className="text-muted">Download do PDF completo</p>
                <a
                  href="/img/pdf/detonado.pdf"
                  className="btn btn-danger"
                  download
                >
                  <i className="bi bi-download me-2"></i>
                  Baixar PDF
                </a>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="info-card p-4 text-center">
                <i className="bi bi-collection-fill display-4 text-primary mb-3"></i>
                <h5>Pokédex Completa</h5>
                <p className="text-muted">Consulte todos os Pokémons</p>
                <a href="/" className="btn btn-primary">
                  <i className="bi bi-grid-3x3 me-2"></i>
                  Ver Pokédex
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5>Conteúdo do Guia:</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-check-circle-fill text-success me-2"></i>Lista completa de Pokémons</li>
              <li><i className="bi bi-check-circle-fill text-success me-2"></i>Tipos e fraquezas</li>
              <li><i className="bi bi-check-circle-fill text-success me-2"></i>Cadeias evolutivas</li>
              <li><i className="bi bi-check-circle-fill text-success me-2"></i>Estatísticas detalhadas</li>
              <li><i className="bi bi-check-circle-fill text-success me-2"></i>Dicas e estratégias</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detonado;
