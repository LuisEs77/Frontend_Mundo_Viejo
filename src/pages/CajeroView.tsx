import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CajeroView = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleCerrarSesion = () => {
    logout();
    navigate('/');
  };

  const handleLlevar = () => {
    navigate('/llevar-cajero');
  };

  const handlePagarMesa = () => {
    navigate('/pagar-cuenta-cajero');
  };

  const handleCuadreCaja = () => {
    navigate('/cuadre-caja');
  };

  return (
    <div className="min-h-screen bg-gris-oscuro flex flex-col">
      {/* Botón cerrar sesión - arriba izquierda */}
      <div className="p-6">
        <button
          onClick={handleCerrarSesion}
          className="px-8 py-3 bg-crema text-gris-oscuro rounded-lg text-base font-normal hover:bg-[#e8e8d0] transition-all"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Contenido principal - centrado */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 lg:gap-12 items-center justify-center w-full max-w-sm sm:max-w-5xl">
          {/* Botón LLEVAR */}
          <button
            onClick={handleLlevar}
            className="w-full sm:w-56 lg:w-64 h-28 sm:h-32 lg:h-36 bg-terracota text-white rounded-2xl text-lg sm:text-xl lg:text-2xl font-bold tracking-wide uppercase shadow-xl hover:bg-[#8d4d3a] hover:scale-105 transition-all flex items-center justify-center"
          >
            LLEVAR
          </button>

          {/* Botón PAGAR MESA */}
          <button
            onClick={handlePagarMesa}
            className="w-full sm:w-56 lg:w-64 h-28 sm:h-32 lg:h-36 bg-green-500 text-white rounded-2xl text-lg sm:text-xl lg:text-2xl font-bold tracking-wide uppercase shadow-xl hover:bg-green-600 hover:scale-105 transition-all flex items-center justify-center"
          >
            PAGAR MESA
          </button>

          {/* Botón CUADRE DE CAJA */}
          <button
            onClick={handleCuadreCaja}
            className="w-full sm:w-56 lg:w-64 h-28 sm:h-32 lg:h-36 bg-red-500 text-white rounded-2xl text-lg sm:text-xl lg:text-2xl font-bold tracking-wide uppercase shadow-xl hover:bg-red-600 hover:scale-105 transition-all flex items-center justify-center"
          >
            CUADRE DE CAJA
          </button>
        </div>
      </div>
    </div>
  );
};

export default CajeroView;
