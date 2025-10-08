import { useNavigate } from 'react-router-dom';

const SeleccionPasillos = () => {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/mesero');
  };

  const handlePasilloClick = (pasillo: number) => {
    console.log(`Pasillo ${pasillo} seleccionado`);
    navigate(`/mesas/${pasillo}`);
  };

  return (
    <div className="min-h-screen bg-gris-oscuro flex flex-col p-4 sm:p-6">
      {/* Botón Regresar más grande */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={handleRegresar}
          className="px-8 sm:px-12 py-3 sm:py-4 bg-crema text-gris-oscuro rounded-full text-base sm:text-lg lg:text-xl font-medium hover:bg-[#e8e8d0] transition-all shadow-lg"
        >
          Regresar
        </button>
      </div>

      {/* Grid de Pasillos - Layout 3 columnas */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-4 py-4 min-h-[400px]">
        <div className="flex gap-4 sm:gap-6 lg:gap-8 h-[500px] sm:h-[550px] lg:h-[600px] items-stretch">
          {/* Pasillo 1 - Izquierda (vertical alto) */}
          <button
            onClick={() => handlePasilloClick(1)}
            className="w-36 sm:w-44 lg:w-56 h-full bg-terracota text-white rounded-2xl sm:rounded-3xl text-xl sm:text-2xl lg:text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-xl flex items-center justify-center"
          >
            Pasillo 1
          </button>

          {/* Columna central - Pasillo 3 arriba y Pasillo 4 abajo */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 h-full">
            {/* Pasillo 3 - Ocupa 60% de la altura */}
            <button
              onClick={() => handlePasilloClick(3)}
              className="w-40 sm:w-48 lg:w-60 flex-[6] min-h-0 bg-terracota text-white rounded-2xl sm:rounded-3xl text-xl sm:text-2xl lg:text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-xl flex items-center justify-center"
            >
              Pasillo 3
            </button>

            {/* Pasillo 4 - Ocupa 40% de la altura restante */}
            <button
              onClick={() => handlePasilloClick(4)}
              className="w-40 sm:w-48 lg:w-60 flex-[4] min-h-0 bg-terracota text-white rounded-2xl sm:rounded-3xl text-xl sm:text-2xl lg:text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-xl flex items-center justify-center"
            >
              Pasillo 4
            </button>
          </div>

          {/* Pasillo 2 - Derecha (vertical alto) */}
          <button
            onClick={() => handlePasilloClick(2)}
            className="w-36 sm:w-44 lg:w-56 h-full bg-terracota text-white rounded-2xl sm:rounded-3xl text-xl sm:text-2xl lg:text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-xl flex items-center justify-center"
          >
            Pasillo 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeleccionPasillos;
