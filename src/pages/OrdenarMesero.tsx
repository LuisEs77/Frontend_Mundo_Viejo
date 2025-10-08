import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Platillo {
  id: number;
  nombre: string;
  cantidad: number;
}

const OrdenarMesero = () => {
  const navigate = useNavigate();
  const [categoriaActual, setCategoriaActual] = useState('Platos Fuertes');
  const [preOrden, setPreOrden] = useState<Platillo[]>([]);

  const handleRegresar = () => {
    navigate('/mesas');
  };

  const handleCerrarCuenta = () => {
    console.log('Cerrando cuenta con pedido:', preOrden);
    navigate('/pagar-cuenta');
  };

  const handlePlatilloClick = (numero: number) => {
    const platilloExistente = preOrden.find(p => p.id === numero);
    if (platilloExistente) {
      setPreOrden(preOrden.map(p =>
        p.id === numero ? { ...p, cantidad: p.cantidad + 1 } : p
      ));
    } else {
      setPreOrden([...preOrden, {
        id: numero,
        nombre: `Platillo ${numero}`,
        cantidad: 1
      }]);
    }
  };

  const handleEliminar = (id: number) => {
    setPreOrden(preOrden.filter(p => p.id !== id));
  };

  const handleIncrementar = (id: number) => {
    setPreOrden(preOrden.map(p => 
      p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    ));
  };

  const handleDecrementar = (id: number) => {
    setPreOrden(preOrden.map(p => 
      p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad - 1) } : p
    )); // Mínimo 1, no eliminar
  };

  const platillos = [2, 3, 4, 6, 7, 8, 10, 11, 12];

  return (
    <div className="min-h-screen bg-gray-600 flex flex-col lg:flex-row">
      {/* Sidebar izquierdo - Navegación más grande */}
      <aside className="w-full lg:w-56 xl:w-64 bg-gris-oscuro flex lg:flex-col p-4 sm:p-6 gap-2 overflow-x-auto lg:overflow-x-visible">
        <button
          onClick={handleRegresar}
          className="w-full px-6 py-3 bg-crema text-gris-oscuro rounded-full text-base font-medium hover:bg-[#e8e8d0] transition-all whitespace-nowrap mb-8"
        >
          Regresar
        </button>
        
        <div className="flex lg:flex-col gap-2 w-full mt-16">
          <button 
            onClick={() => setCategoriaActual('Platos Fuertes')}
            className={`w-full px-4 py-3 rounded-full text-base font-medium transition-all whitespace-nowrap ${
              categoriaActual === 'Platos Fuertes' 
                ? 'bg-terracota text-white' 
                : 'bg-terracota/80 text-white hover:bg-terracota'
            }`}
          >
            Platos Fuertes
          </button>
          
          <button 
            onClick={() => setCategoriaActual('Postres')}
            className="w-full px-4 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all whitespace-nowrap"
          >
            Postres
          </button>
          
          <button 
            onClick={() => setCategoriaActual('Bebidas')}
            className="w-full px-4 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all whitespace-nowrap"
          >
            Bebidas
          </button>
          
          <button 
            onClick={() => setCategoriaActual('Extras')}
            className="w-full px-4 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all whitespace-nowrap"
          >
            Extras
          </button>
          
          <button 
            onClick={() => setCategoriaActual('Complementos')}
            className="w-full px-4 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all whitespace-nowrap"
          >
            Complementos
          </button>
          
          <button className="w-full px-4 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all whitespace-nowrap">
            algo más...
          </button>
        </div>
      </aside>

      {/* Contenido principal - Platillos centrados y más grandes */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 overflow-auto">
        <div className="grid gap-6 lg:gap-8 max-w-5xl w-full" style={{ gridTemplateColumns: `repeat(${Math.min(platillos.length, 3)}, minmax(0, 1fr))` }}>
          {platillos.map((numero) => (
            <button
              key={numero}
              onClick={() => handlePlatilloClick(numero)}
              className="aspect-[3/2] bg-terracota text-white rounded-2xl text-xl sm:text-2xl lg:text-3xl font-semibold hover:bg-[#8d4d3a] hover:scale-105 transition-all shadow-lg flex items-center justify-center"
            >
              Platillo {numero}
            </button>
          ))}
        </div>
      </div>

      {/* Panel derecho - Pedido anticipado */}
      <aside className="w-full lg:w-72 bg-crema p-4 sm:p-5 flex flex-col order-first lg:order-last">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gris-oscuro mb-3 text-center">PRE-ORDEN</h2>
          <div className="flex justify-between text-sm sm:text-base text-gris-oscuro font-semibold px-2">
            <span className="flex-1">Nombre platillo</span>
            <span className="w-20 text-center">Cantidad</span>
          </div>
        </div>

        {/* Lista de items en pre-orden */}
        <div className="flex-1 space-y-2 overflow-auto max-h-40 lg:max-h-none mb-4">
          {preOrden.length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-8">No hay platillos seleccionados</p>
          ) : (
            preOrden.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3">
                <div className="flex-1 bg-terracota text-white px-4 py-2.5 rounded-full text-sm sm:text-base font-medium">
                  {item.nombre}
                </div>
                <div className="w-20 text-center flex flex-col items-center gap-1">
                  <button 
                    onClick={() => handleIncrementar(item.id)}
                    className="text-gris-oscuro text-lg hover:text-terracota transition-colors"
                  >
                    ▲
                  </button>
                  <span className="text-gris-oscuro font-bold text-lg">{item.cantidad}</span>
                  <button 
                    onClick={() => handleDecrementar(item.id)}
                    className="text-gris-oscuro text-lg hover:text-terracota transition-colors"
                  >
                    ▼
                  </button>
                </div>
                <button
                  onClick={() => handleEliminar(item.id)}
                  className="ml-2 px-2 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors shadow"
                  title="Quitar platillo"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Botón Cerrar cuenta */}
        <button
          onClick={handleCerrarCuenta}
          disabled={preOrden.length === 0}
          className={`w-full py-3.5 rounded-full text-base sm:text-lg font-semibold transition-all shadow-lg ${
            preOrden.length === 0 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700 hover:scale-105'
          }`}
        >
          Cerrar cuenta
        </button>
      </aside>
    </div>
  );
};

export default OrdenarMesero;
