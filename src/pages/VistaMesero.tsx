import { useNavigate } from 'react-router-dom';

const VistaMesero = () => {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    console.log('Cerrando sesión...');
    navigate('/');
  };

  const handleLlevar = () => {
    console.log('Opción LLEVAR seleccionada');
    navigate('/llevar');
  };

  const handleMesas = () => {
    console.log('Navegando directamente a mesas');
    navigate('/mesas');
  };

  return (
    <div className="min-h-screen bg-gris-oscuro flex flex-col">
      {/* Botón cerrar sesión - arriba izquierda */}
      <div className="p-4 sm:p-6">
        <button
          onClick={handleCerrarSesion}
          className="px-6 sm:px-8 py-2 sm:py-3 bg-crema text-gris-oscuro rounded-lg text-sm sm:text-base font-normal hover:bg-[#e8e8d0] transition-all"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Contenido principal - centrado */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 items-center w-full max-w-xs sm:max-w-md lg:max-w-lg">
          {/* Botón LLEVAR */}
          <button
            onClick={handleLlevar}
            className="w-full py-12 sm:py-14 lg:py-16 bg-terracota text-white rounded-2xl text-2xl sm:text-3xl font-bold tracking-wide uppercase shadow-xl hover:bg-[#8d4d3a] hover:scale-105 transition-all"
          >
            LLEVAR
          </button>

          {/* Botón MESAS */}
          <button
            onClick={handleMesas}
            className="w-full py-12 sm:py-14 lg:py-16 bg-verde-oscuro text-white rounded-2xl text-2xl sm:text-3xl font-bold tracking-wide uppercase shadow-xl hover:bg-[#3d5035] hover:scale-105 transition-all"
          >
            MESAS
          </button>
        </div>
      </div>
    </div>
  );
};

export default VistaMesero;
