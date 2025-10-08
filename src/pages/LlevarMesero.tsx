import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Platillo {
  id: number;
  nombre: string;
  cantidad: number;
}

const LlevarMesero = () => {
  const navigate = useNavigate();
  const [categoriaActual, setCategoriaActual] = useState('Platos Fuertes');
  const [preOrden, setPreOrden] = useState<Platillo[]>([
    { id: 2, nombre: 'Platillo 2', cantidad: 3 }
  ]);

  const handleRegresar = () => {
    navigate('/mesero');
  };

  const handleConfirmar = () => {
    console.log('Pre-orden confirmada:', preOrden);
    // Aquí se enviaría al backend
  };

  const handlePlatilloClick = (numero: number) => {
    console.log(`Platillo ${numero} seleccionado`);
    // Aquí se agregaría a la pre-orden
  };

  const platillos = [2, 3, 4, 6, 7, 8, 10, 11, 12];

  return (
    <div className="min-h-screen bg-gray-600 flex">
      {/* Sidebar izquierdo */}
      <aside className="w-32 bg-gris-oscuro flex flex-col p-3 gap-3">
        <button
          onClick={handleRegresar}
          className="px-4 py-3 bg-crema text-gris-oscuro rounded-full text-sm font-normal hover:bg-[#e8e8d0] transition-all"
        >
          Regresar
        </button>
        
        <button 
          onClick={() => setCategoriaActual('Platos Fuertes')}
          className={`px-3 py-3 rounded-full text-sm font-normal transition-all ${
            categoriaActual === 'Platos Fuertes' 
              ? 'bg-terracota text-white' 
              : 'bg-terracota/80 text-white hover:bg-terracota'
          }`}
        >
          Platos Fuertes
        </button>
        
        <button 
          onClick={() => setCategoriaActual('Postres')}
          className="px-3 py-3 bg-terracota text-white rounded-full text-sm font-normal hover:bg-[#8d4d3a] transition-all"
        >
          Postres
        </button>
        
        <button 
          onClick={() => setCategoriaActual('Bebidas')}
          className="px-3 py-3 bg-terracota text-white rounded-full text-sm font-normal hover:bg-[#8d4d3a] transition-all"
        >
          Bebidas
        </button>
        
        <button 
          onClick={() => setCategoriaActual('Extras')}
          className="px-3 py-3 bg-terracota text-white rounded-full text-sm font-normal hover:bg-[#8d4d3a] transition-all"
        >
          Extras
        </button>
        
        <button 
          onClick={() => setCategoriaActual('Complementos')}
          className="px-3 py-3 bg-terracota text-white rounded-full text-sm font-normal hover:bg-[#8d4d3a] transition-all"
        >
          Complementos
        </button>
        
        <button className="px-3 py-3 bg-terracota text-white rounded-full text-xs font-normal hover:bg-[#8d4d3a] transition-all mt-2">
          algo más...
        </button>
      </aside>

      {/* Contenido principal - Platillos */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-4 max-w-3xl">
          {platillos.map((numero) => (
            <button
              key={numero}
              onClick={() => handlePlatilloClick(numero)}
              className="aspect-[3/2] bg-terracota text-white rounded-2xl text-xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-lg flex items-center justify-center"
            >
              Platillo {numero}
            </button>
          ))}
        </div>
      </div>

      {/* Panel derecho - Pre-Orden */}
      <aside className="w-64 bg-crema p-4 flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gris-oscuro mb-1">Pre-Orden</h2>
          <div className="flex gap-6 text-sm text-gris-oscuro font-medium">
            <span>Nombre:</span>
            <span>Cantidad</span>
          </div>
        </div>

        {/* Lista de items en pre-orden */}
        <div className="flex-1 space-y-2">
          {preOrden.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex-1 bg-terracota text-white px-4 py-2 rounded-full text-sm">
                {item.nombre}
              </div>
              <div className="w-12 text-center">
                <div className="flex flex-col items-center">
                  <button className="text-gris-oscuro text-xs">▲</button>
                  <span className="text-gris-oscuro font-semibold">{item.cantidad}</span>
                  <button className="text-gris-oscuro text-xs">▼</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Confirmar */}
        <button
          onClick={handleConfirmar}
          className="w-full mt-4 py-3 bg-gray-500 text-white rounded-full text-base font-medium hover:bg-gray-600 transition-all"
        >
          Confirmar
        </button>
      </aside>
    </div>
  );
};

export default LlevarMesero;
