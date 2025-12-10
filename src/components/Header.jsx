import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/?q=${encodeURIComponent(value)}`);
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm-sm">
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}img/pokeball.png`} alt="Pokédex" className="brand-logo" />
            <Link className="navbar-brand fw-bold text-dark" to="/">
              Pokédex
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-2">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                >
                  Pokédex
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
                  to="/?q="
                >
                  Procurar
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/mini-game' ? 'active' : ''}`}
                  to="/mini-game"
                >
                  Mini Game
                </Link>
              </li>

            </ul>

            <div className="d-flex align-items-center gap-2">
              <form className="d-flex" role="search" onSubmit={onSearchSubmit}>
                <input
                  className="form-control search-input"
                  type="search"
                  placeholder="Buscar Pokémon..."
                  aria-label="Buscar Pokémon"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>

              <div className="dropdown">
                <button
                  className="btn dropdown-toggle user-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={`${import.meta.env.BASE_URL}img/pokeball.png`} alt="Menu" className="user-avatar" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/meus-pokemon">Meus Pokémon</Link></li>
                  <li><Link className="dropdown-item" to="/">Pokédex</Link></li>
                  <li><Link className="dropdown-item" to="/mini-game">Mini Game</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
