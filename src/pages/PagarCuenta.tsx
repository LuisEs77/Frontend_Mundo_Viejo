import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Consumo {
  platillo: string;
  cantidad: number;
  subtotal: number;
}

const PagarCuenta = () => {
  const navigate = useNavigate();
  const [consumos] = useState<Consumo[]>([
    { platillo: 'Platillo 2', cantidad: 3, subtotal: 150 }
  ]);

  const handleRegresar = () => {
    navigate(-1);
  };

  const handleCuenta1 = () => {
    console.log('Cuenta 1 seleccionada');
  };

  const handleCuenta2 = () => {
    console.log('Cuenta 2 seleccionada');
  };

  const handleAgregar = () => {
    console.log('Agregar item');
  };

  const handleImprimirTicket = () => {
    console.log('Imprimiendo ticket...');
    // Aquí se implementará la lógica de impresión
  };

  const calcularTotal = () => {
    return consumos.reduce((acc, item) => acc + item.subtotal, 0);
  };

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
          onClick={handleCuenta1}
          className="px-3 py-3 bg-terracota text-white rounded-full text-sm font-normal hover:bg-[#8d4d3a] transition-all"
        >
          Cuenta1
        </button>
        
        <button 
          onClick={handleCuenta2}
          className="px-3 py-3 bg-terracota text-white rounded-full text-sm font-normal hover:bg-[#8d4d3a] transition-all"
        >
          Cuenta2
        </button>
        
        <button 
          onClick={handleAgregar}
          className="px-3 py-3 bg-terracota text-white rounded-full text-sm font-normal hover:bg-[#8d4d3a] transition-all mt-auto"
        >
          Agregar
        </button>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-crema rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gris-oscuro mb-2">Total consumido</h1>
          </div>

          {/* Header de tabla */}
          <div className="grid grid-cols-4 gap-4 mb-4 text-center text-gris-oscuro font-medium text-sm px-4">
            <div>Nombre:</div>
            <div>Platillo</div>
            <div>Cantidad</div>
            <div>Sub-total</div>
          </div>

          {/* Items consumidos */}
          <div className="space-y-3 mb-8">
            {consumos.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center px-4">
                <div className="col-span-2 bg-terracota text-white px-6 py-3 rounded-full text-center font-medium">
                  {item.platillo}
                </div>
                <div className="text-center text-gris-oscuro font-semibold text-lg">
                  {item.cantidad}
                </div>
                <div className="text-center text-gris-oscuro font-semibold text-lg">
                  Q {item.subtotal}
                </div>
              </div>
            ))}
          </div>

          {/* Botón Imprimir ticket */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleImprimirTicket}
              className="px-16 py-4 bg-gray-400 text-white rounded-full text-lg font-medium hover:bg-gray-500 transition-all shadow-lg"
            >
              Imprimir ticket
            </button>
          </div>

          {/* Total (si quisieras mostrarlo) */}
          {consumos.length > 1 && (
            <div className="mt-6 text-right text-2xl font-bold text-gris-oscuro">
              Total: Q {calcularTotal()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagarCuenta;
