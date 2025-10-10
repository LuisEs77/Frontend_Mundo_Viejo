import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/mesero" 
            element={
              <ProtectedRoute requiredRole="mesero">
                <VistaMesero />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cajero" 
            element={
              <ProtectedRoute requiredRole="cajero">
                <CajeroView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cuadre-caja" 
            element={
              <ProtectedRoute requiredRole="cajero">
                <CuadreCajaView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pasillos" 
            element={
              <ProtectedRoute>
                <SeleccionPasillos />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mesas" 
            element={
              <ProtectedRoute>
                <VistaMesas />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mesas/:pasillo?" 
            element={
              <ProtectedRoute>
                <VistaMesas />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/llevar" 
            element={
              <ProtectedRoute>
                <LlevarMesero />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/llevar-cajero" 
            element={
              <ProtectedRoute requiredRole="cajero">
                <LlevarMesero esCajero={true} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ordenar" 
            element={
              <ProtectedRoute>
                <OrdenarMesero />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pagar-cuenta" 
            element={
              <ProtectedRoute>
                <PagarCuenta />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pagar-cuenta-cajero" 
            element={
              <ProtectedRoute requiredRole="cajero">
                <PagarCuenta esCajero={true} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ordenes-recibidas" 
            element={
              <ProtectedRoute>
                <OrdenesRecibidas />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ordenes-iniciadas" 
            element={
              <ProtectedRoute>
                <OrdenesIniciadas />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ordenes-finalizadas" 
            element={
              <ProtectedRoute>
                <OrdenesFinalizadas />
              </ProtectedRoute>
            } 
          />
          {/* Ruta catch-all - cualquier ruta no reconocida va al login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
