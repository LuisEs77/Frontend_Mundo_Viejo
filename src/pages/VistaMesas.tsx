import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Mesa {
  id: number;
  numero: number;
  estado: 'disponible' | 'ocupado' | 'seleccionada' | 'deshabilitado';
}

const VistaMesas = () => {
  const navigate = useNavigate();
  const { pasillo } = useParams<{ pasillo: string }>();
  const pasilloActual = pasillo || '1';
  
  // Todas las mesas empiezan como disponibles
  const [mesas, setMesas] = useState<Mesa[]>([
    { id: 1, numero: 1, estado: 'disponible' },
    { id: 2, numero: 2, estado: 'disponible' },
    { id: 3, numero: 3, estado: 'disponible' },
    { id: 4, numero: 4, estado: 'disponible' },
    { id: 5, numero: 5, estado: 'disponible' },
    { id: 6, numero: 6, estado: 'disponible' },
    { id: 7, numero: 7, estado: 'disponible' },
    { id: 8, numero: 8, estado: 'disponible' },
  ]);

  const handleRegresar = () => {
    navigate('/pasillos');
  };

  const handleMesaClick = (mesaId: number) => {
    setMesas(prevMesas => 
      prevMesas.map(mesa => {
        if (mesa.id === mesaId) {
          // Ciclo de estados: disponible -> seleccionada -> ocupado -> disponible
          let nuevoEstado: 'disponible' | 'ocupado' | 'seleccionada' | 'deshabilitado';
          if (mesa.estado === 'disponible') {
            nuevoEstado = 'seleccionada';
            // Navegar a ordenar cuando se selecciona una mesa disponible
            setTimeout(() => navigate('/ordenar'), 100);
          } else if (mesa.estado === 'seleccionada') {
            nuevoEstado = 'ocupado';
          } else {
            nuevoEstado = 'disponible';
          }
          console.log(`Mesa ${mesa.numero}: ${mesa.estado} -> ${nuevoEstado}`);
          return { ...mesa, estado: nuevoEstado };
        }
        return mesa;
      })
    );
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return 'bg-[#6B8E5F] hover:bg-[#5a7850]'; // Verde más opaco
      case 'ocupado':
        return 'bg-[#D94F3D] hover:bg-[#b8422f]'; // Rojo/naranja más opaco
      case 'seleccionada':
        return 'bg-[#3d5035] hover:bg-[#2d3d28]'; // Verde oscuro más opaco
      case 'deshabilitado':
        return 'bg-[#7a7a7a] cursor-not-allowed opacity-60'; // Gris más opaco
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#7a7a7a] flex">
      {/* Sidebar izquierdo - Doble de ancho */}
      <aside className="w-56 sm:w-64 bg-[#2d2d2d] flex flex-col p-5 items-center pt-6">
        <button
          onClick={handleRegresar}
          className="w-full px-6 py-3 bg-crema text-gris-oscuro rounded-lg text-base font-medium hover:bg-[#e8e8d0] transition-all shadow-md mb-8"
        >
          Regresar
        </button>
        
        {/* Navegación entre pasillos */}
        <div className="flex flex-col gap-3 w-full mt-16">
          <button 
            onClick={() => navigate('/mesas/1')}
            className={`w-full px-6 py-3 rounded-lg text-base font-medium transition-all shadow-md ${
              pasilloActual === '1' 
                ? 'bg-verde-oscuro text-white' 
                : 'bg-terracota text-white hover:bg-[#8d4d3a]'
            }`}
          >
            Pasillo 1
          </button>
          
          <button 
            onClick={() => navigate('/mesas/2')}
            className={`w-full px-6 py-3 rounded-lg text-base font-medium transition-all shadow-md ${
              pasilloActual === '2' 
                ? 'bg-verde-oscuro text-white' 
                : 'bg-terracota text-white hover:bg-[#8d4d3a]'
            }`}
          >
            Pasillo 2
          </button>
          
          <button 
            onClick={() => navigate('/mesas/3')}
            className={`w-full px-6 py-3 rounded-lg text-base font-medium transition-all shadow-md ${
              pasilloActual === '3' 
                ? 'bg-verde-oscuro text-white' 
                : 'bg-terracota text-white hover:bg-[#8d4d3a]'
            }`}
          >
            Pasillo 3
          </button>
          
          <button 
            onClick={() => navigate('/mesas/4')}
            className={`w-full px-6 py-3 rounded-lg text-base font-medium transition-all shadow-md ${
              pasilloActual === '4' 
                ? 'bg-verde-oscuro text-white' 
                : 'bg-terracota text-white hover:bg-[#8d4d3a]'
            }`}
          >
            Salón
          </button>
        </div>
      </aside>

      {/* Contenido principal - Grid de mesas más grandes */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-4 gap-8 w-full max-w-6xl">
          {mesas.map((mesa) => (
            <button
              key={mesa.id}
              onClick={() => handleMesaClick(mesa.id)}
              disabled={mesa.estado === 'deshabilitado'}
              className={`
                aspect-[5/4] rounded-2xl 
                flex flex-col items-center justify-center 
                text-white text-3xl font-bold
                shadow-xl transition-all duration-200
                ${getEstadoColor(mesa.estado)}
                ${mesa.estado !== 'deshabilitado' ? 'hover:scale-105 hover:shadow-2xl' : ''}
              `}
            >
              <div className="text-3xl">Mesa {mesa.numero}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VistaMesas;
