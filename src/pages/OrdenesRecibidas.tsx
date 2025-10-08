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
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-300">
        <h1 className="text-2xl font-normal text-gris-oscuro">visualizacion de ordenes</h1>
        <p className="text-sm text-gray-400 mt-1">Ordenes Recibidas</p>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        {/* Grid de órdenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {ordenes.map((orden, index) => (
            <div key={index} className="bg-crema rounded-lg shadow-lg overflow-hidden">
              {/* Header de la orden */}
              <div className={`px-4 py-2 flex justify-between items-center text-white text-sm ${
                orden.tipo === 'llevar' ? 'bg-cyan-400' : 'bg-gris-oscuro'
              }`}>
                <span className="font-medium">{orden.mesa}</span>
                <span className="font-medium">{orden.timestamp}</span>
              </div>

              {/* Contenido de la orden */}
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-sm text-gris-oscuro font-medium">Orden #{orden.id}</p>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {orden.items.map((item, idx) => (
                    <div key={idx} className="bg-verde-disponible text-white px-4 py-3 rounded-lg flex justify-between items-center">
                      <span className="text-sm font-medium flex-1">{item.nombre}</span>
                      <span className="text-lg font-bold ml-2">{item.cantidad}</span>
                    </div>
                  ))}
                </div>

                {/* Botón Iniciar */}
                <button
                  onClick={() => handleIniciar(orden.id)}
                  className="w-full py-2 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all"
                >
                  Inicar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botones inferiores */}
        <div className="flex gap-4 justify-between max-w-2xl">
          <div className="flex gap-4">
            <button
              onClick={handleMesas}
              className="px-8 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all"
            >
              Mesas
            </button>
            
            <button
              onClick={handleRegresarOrden}
              className="px-8 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all"
            >
              Regresar orden
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleOrdenesIniciadas}
              className="px-8 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all"
            >
              Ordenes Iniciadas
            </button>
            
            <button
              onClick={handleOrdenesFinalizadas}
              className="px-8 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all"
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
