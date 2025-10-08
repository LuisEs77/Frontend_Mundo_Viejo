import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Mesa {
  id: number;
  numero: number;
  estado: 'disponible' | 'ocupado' | 'seleccionada' | 'deshabilitado';
}

const VistaMesas = () => {
  const navigate = useNavigate();
  
  // Estado inicial de las mesas (puedes modificarlo según tu necesidad)
  const [mesas, setMesas] = useState<Mesa[]>([
    { id: 1, numero: 1, estado: 'disponible' },
    { id: 2, numero: 2, estado: 'disponible' },
    { id: 3, numero: 3, estado: 'ocupado' },
    { id: 4, numero: 4, estado: 'disponible' },
    { id: 5, numero: 5, estado: 'ocupado' },
    { id: 6, numero: 6, estado: 'ocupado' },
    { id: 7, numero: 7, estado: 'disponible' },
    { id: 8, numero: 8, estado: 'deshabilitado' },
  ]);

  const [filtro, setFiltro] = useState<'disponible' | 'ocupado' | 'seleccionada' | 'todos'>('disponible');

  const handleRegresar = () => {
    navigate('/pasillos');
  };

  const handleMesaClick = (mesaId: number) => {
    const mesa = mesas.find(m => m.id === mesaId);
    if (mesa && mesa.estado !== 'deshabilitado') {
      console.log(`Mesa ${mesa.numero} clickeada - Estado: ${mesa.estado}`);
      navigate('/ordenar');
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return 'bg-verde-disponible hover:bg-[#6a9757]';
      case 'ocupado':
        return 'bg-naranja-ocupado hover:bg-[#e6441a]';
      case 'seleccionada':
        return 'bg-verde-oscuro hover:bg-[#3d5035]';
      case 'deshabilitado':
        return 'bg-gris-deshabilitado cursor-not-allowed opacity-60';
      default:
        return 'bg-gray-400';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return 'Disponible';
      case 'ocupado':
        return 'Ocupado';
      case 'seleccionada':
        return 'Seleccionada';
      case 'deshabilitado':
        return 'Deshabilitado';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar izquierdo */}
      <aside className="w-48 bg-gris-oscuro flex flex-col p-4 gap-3">
        <button
          onClick={handleRegresar}
          className="px-4 py-2.5 bg-terracota text-white rounded-lg text-sm font-medium hover:bg-[#8d4d3a] transition-all"
        >
          Regresar
        </button>
        
        <button className="px-4 py-2.5 bg-terracota text-white rounded-lg text-sm font-medium hover:bg-[#8d4d3a] transition-all">
          Pasillo 1
        </button>
        
        <button className="px-4 py-2.5 bg-terracota text-white rounded-lg text-sm font-medium hover:bg-[#8d4d3a] transition-all">
          Pasillo 2
        </button>
        
        <button className="px-4 py-2.5 bg-terracota text-white rounded-lg text-sm font-medium hover:bg-[#8d4d3a] transition-all">
          Pasillo 3
        </button>
        
        <button className="px-4 py-2.5 bg-terracota text-white rounded-lg text-sm font-medium hover:bg-[#8d4d3a] transition-all">
          Salón
        </button>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white px-6 py-4 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gris-oscuro">Mesas 1</h1>
            
            {/* Filtros */}
            <div className="flex gap-3">
              <button
                onClick={() => setFiltro('disponible')}
                className="px-5 py-2 bg-verde-disponible text-white rounded-md text-sm font-medium hover:bg-[#6a9757] transition-all"
              >
                Disponible
              </button>
              <button
                onClick={() => setFiltro('ocupado')}
                className="px-5 py-2 bg-naranja-ocupado text-white rounded-md text-sm font-medium hover:bg-[#e6441a] transition-all"
              >
                Ocupado
              </button>
              <button
                onClick={() => setFiltro('seleccionada')}
                className="px-5 py-2 bg-gris-deshabilitado text-white rounded-md text-sm font-medium hover:bg-[#888888] transition-all"
              >
                Seleccionada
              </button>
            </div>
          </div>
        </header>

        {/* Grid de Mesas */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="grid grid-cols-4 gap-5 max-w-4xl">
            {mesas.map((mesa) => (
              <button
                key={mesa.id}
                onClick={() => handleMesaClick(mesa.id)}
                disabled={mesa.estado === 'deshabilitado'}
                className={`
                  aspect-square rounded-2xl 
                  flex flex-col items-center justify-center 
                  text-white text-xl font-bold
                  shadow-md transition-all duration-200
                  ${getEstadoColor(mesa.estado)}
                  ${mesa.estado !== 'deshabilitado' ? 'hover:scale-105 hover:shadow-lg' : ''}
                `}
              >
                <div className="text-2xl">Mesa {mesa.numero}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaMesas;
