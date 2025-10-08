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
    <div className="min-h-screen bg-gris-oscuro flex flex-col p-6">
      {/* Header con título */}
      <div className="mb-6">
        <h1 className="text-white text-xl font-normal">Mesas 0</h1>
      </div>

      {/* Botón Regresar */}
      <div className="mb-8">
        <button
          onClick={handleRegresar}
          className="px-8 py-3 bg-crema text-gris-oscuro rounded-full text-base font-normal hover:bg-[#e8e8d0] transition-all"
        >
          Regresar
        </button>
      </div>

      {/* Grid de Pasillos - 2x2 con el botón 3 y 4 centrados */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8 max-w-2xl w-full">
          {/* Pasillo 1 - Arriba Izquierda */}
          <button
            onClick={() => handlePasilloClick(1)}
            className="aspect-[4/5] bg-terracota text-white rounded-3xl text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-xl flex items-center justify-center"
          >
            Pasillo 1
          </button>

          {/* Pasillo 2 - Arriba Derecha */}
          <button
            onClick={() => handlePasilloClick(2)}
            className="aspect-[4/5] bg-terracota text-white rounded-3xl text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-xl flex items-center justify-center"
          >
            Pasillo 2
          </button>

          {/* Pasillo 3 - Centro (spanning to create offset) */}
          <div className="col-span-2 grid grid-cols-2 gap-8">
            <button
              onClick={() => handlePasilloClick(3)}
              className="aspect-[3/4] bg-terracota text-white rounded-3xl text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-xl flex items-center justify-center"
            >
              Pasillo 3
            </button>

            {/* Pasillo 4 */}
            <button
              onClick={() => handlePasilloClick(4)}
              className="aspect-[3/4] bg-terracota text-white rounded-3xl text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-xl flex items-center justify-center"
            >
              Pasillo 4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeleccionPasillos;
