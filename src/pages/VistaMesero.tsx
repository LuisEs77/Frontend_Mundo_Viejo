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
    console.log('Navegando a selección de pasillos');
    navigate('/pasillos');
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
      <div className="flex-1 flex items-center justify-center px-10">
        <div className="flex flex-col gap-12 items-center w-full max-w-xs">
          {/* Botón LLEVAR */}
          <button
            onClick={handleLlevar}
            className="w-full py-16 bg-terracota text-white rounded-2xl text-3xl font-bold tracking-wide uppercase shadow-xl hover:bg-[#8d4d3a] hover:scale-105 transition-all"
          >
            LLEVAR
          </button>

          {/* Botón MESAS */}
          <button
            onClick={handleMesas}
            className="w-full py-16 bg-verde-oscuro text-white rounded-2xl text-3xl font-bold tracking-wide uppercase shadow-xl hover:bg-[#3d5035] hover:scale-105 transition-all"
          >
            MESAS
          </button>
        </div>
      </div>
    </div>
  );
};

export default VistaMesero;
