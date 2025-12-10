import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-controller me-2"></i>
            Pokédex
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                >
                  <i className="bi bi-house-door me-1"></i>
                  Pokédex
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/meus-pokemon' ? 'active' : ''}`}
                  to="/meus-pokemon"
                >
                  <i className="bi bi-bookmark-heart me-1"></i>
                  Meus Pokémon
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/mini-game' ? 'active' : ''}`}
                  to="/mini-game"
                >
                  <i className="bi bi-controller me-1"></i>
                  Mini Game
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/detonado' ? 'active' : ''}`}
                  to="/detonado"
                >
                  <i className="bi bi-book me-1"></i>
                  Detonado
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
