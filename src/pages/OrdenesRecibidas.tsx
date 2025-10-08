import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Orden {
  id: string;
  mesa: string;
  tipo: 'mesa' | 'llevar';
  items: {
    nombre: string;
    cantidad: number;
  }[];
  timestamp: string;
}

const OrdenesRecibidas = () => {
  const navigate = useNavigate();
  
  const [ordenes] = useState<Orden[]>([
    {
      id: '55642',
      mesa: 'Mesa 6',
      tipo: 'mesa',
      items: [
        { nombre: 'Churrasco mixto', cantidad: 3 },
        { nombre: 'Churrasco mixto sin cebolla', cantidad: 1 }
      ],
      timestamp: '08:01:25'
    },
    {
      id: '55642',
      mesa: 'Mesa 6',
      tipo: 'mesa',
      items: [
        { nombre: 'Churrasco mixto', cantidad: 3 },
        { nombre: 'Churrasco mixto sin cebolla', cantidad: 1 }
      ],
      timestamp: '08:01:25'
    },
    {
      id: '55642',
      mesa: 'Para llevar',
      tipo: 'llevar',
      items: [
        { nombre: 'Churrasco mixto', cantidad: 3 },
        { nombre: 'Churrasco mixto sin cebolla', cantidad: 1 }
      ],
      timestamp: '08:01:25'
    }
  ]);

  const handleIniciar = (ordenId: string) => {
    console.log('Iniciar orden:', ordenId);
    // Aquí se implementará la lógica para mover a "Ordenes Iniciadas"
  };

  const handleMesas = () => {
    navigate('/pasillos');
  };

  const handleRegresarOrden = () => {
    navigate('/mesero');
  };

  const handleOrdenesIniciadas = () => {
    navigate('/ordenes-iniciadas');
  };

  const handleOrdenesFinalizadas = () => {
    navigate('/ordenes-finalizadas');
  };

  return (
    <div className="min-h-screen bg-[#5a5a5a] flex flex-col">
      {/* Contenido principal */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        {/* Grid de órdenes - tarjetas más grandes y centradas */}
        <div className="flex justify-center items-start mb-6 flex-1 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full px-4">
            {ordenes.map((orden, index) => (
              <div key={index} className="bg-crema rounded-xl shadow-xl overflow-hidden flex flex-col w-full max-w-[360px] mx-auto">
                {/* Header de la orden */}
                <div className={`px-5 py-4 flex justify-between items-center text-white text-base sm:text-lg ${
                  orden.tipo === 'llevar' ? 'bg-cyan-400' : 'bg-gris-oscuro'
                }`}>
                  <span className="font-semibold">{orden.mesa}</span>
                  <span className="font-semibold">{orden.timestamp}</span>
                </div>

                {/* Contenido de la orden */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-4 text-center">
                    <p className="text-base sm:text-lg text-gris-oscuro font-semibold">Orden #{orden.id}</p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-5 flex-1">
                    {orden.items.map((item, idx) => (
                      <div key={idx} className="bg-verde-disponible text-white px-5 py-4 rounded-xl flex justify-between items-center">
                        <span className="text-sm sm:text-base font-medium flex-1 text-center">{item.nombre}</span>
                        <span className="text-2xl font-bold ml-3">{item.cantidad}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botón Iniciar */}
                  <button
                    onClick={() => handleIniciar(orden.id)}
                    className="w-full py-4 bg-terracota text-white rounded-full text-lg font-semibold hover:bg-[#8d4d3a] transition-all shadow-lg"
                  >
                    Inicar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones inferiores - alineados con el margen de las tarjetas */}
        <div className="flex justify-between items-center mt-auto pt-6 max-w-6xl w-full mx-auto px-4">
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleMesas}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-terracota text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#8d4d3a] transition-all shadow-lg"
            >
              Mesas
            </button>
            
            <button
              onClick={handleRegresarOrden}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-terracota text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#8d4d3a] transition-all shadow-lg"
            >
              Regresar orden
            </button>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleOrdenesIniciadas}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-terracota text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#8d4d3a] transition-all shadow-lg"
            >
              Ordenes Iniciadas
            </button>
            
            <button
              onClick={handleOrdenesFinalizadas}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-terracota text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#8d4d3a] transition-all shadow-lg"
            >
              Ordenes Finalizadas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdenesRecibidas;
