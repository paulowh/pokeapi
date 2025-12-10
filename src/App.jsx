import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PokemonDetalhes from './pages/PokemonDetalhes';
import MeusPokemon from './pages/MeusPokemon';
import MiniGame from './pages/MiniGame';
import Detonado from './pages/Detonado';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetalhes />} />
          <Route path="/meus-pokemon" element={<MeusPokemon />} />
          <Route path="/mini-game" element={<MiniGame />} />
          <Route path="/detonado" element={<Detonado />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
