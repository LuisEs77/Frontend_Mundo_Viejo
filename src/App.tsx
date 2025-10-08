import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import VistaMesero from './pages/VistaMesero';
import VistaMesas from './pages/VistaMesas';
import SeleccionPasillos from './pages/SeleccionPasillos';
import LlevarMesero from './pages/LlevarMesero';
import OrdenarMesero from './pages/OrdenarMesero';
import PagarCuenta from './pages/PagarCuenta';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mesero" element={<VistaMesero />} />
        <Route path="/pasillos" element={<SeleccionPasillos />} />
        <Route path="/mesas/:pasillo?" element={<VistaMesas />} />
        <Route path="/llevar" element={<LlevarMesero />} />
        <Route path="/ordenar" element={<OrdenarMesero />} />
        <Route path="/pagar-cuenta" element={<PagarCuenta />} />
      </Routes>
    </Router>
  );
}

export default App
