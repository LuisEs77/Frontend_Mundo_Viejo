import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import VistaMesero from './pages/VistaMesero';
import CajeroView from './pages/CajeroView';
import CuadreCajaView from './pages/CuadreCajaView';
import VistaMesas from './pages/VistaMesas';
import SeleccionPasillos from './pages/SeleccionPasillos';
import LlevarMesero from './pages/LlevarMesero';
import OrdenarMesero from './pages/OrdenarMesero';
import PagarCuenta from './pages/PagarCuenta';
import OrdenesRecibidas from './pages/OrdenesRecibidas';
import OrdenesIniciadas from './pages/OrdenesIniciadas';
import OrdenesFinalizadas from './pages/OrdenesFinalizadas';

function App() {
  console.log('App component loaded');
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
  <Route path="/mesero" element={<VistaMesero />} />
  <Route path="/cajero" element={<CajeroView />} />
  <Route path="/cuadre-caja" element={<CuadreCajaView />} />
        <Route path="/pasillos" element={<SeleccionPasillos />} />
        <Route path="/mesas/:pasillo?" element={<VistaMesas />} />
  <Route path="/llevar" element={<LlevarMesero />} />
  <Route path="/llevar-cajero" element={<LlevarMesero esCajero={true} />} />
        <Route path="/ordenar" element={<OrdenarMesero />} />
  <Route path="/pagar-cuenta" element={<PagarCuenta />} />
  <Route path="/pagar-cuenta-cajero" element={<PagarCuenta esCajero={true} />} />
        <Route path="/ordenes-recibidas" element={<OrdenesRecibidas />} />
        <Route path="/ordenes-iniciadas" element={<OrdenesIniciadas />} />
        <Route path="/ordenes-finalizadas" element={<OrdenesFinalizadas />} />
      </Routes>
    </Router>
  );
}

export default App
