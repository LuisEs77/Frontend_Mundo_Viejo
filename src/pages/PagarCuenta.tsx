import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Consumo {
  platillo: string;
  cantidad: number;
  subtotal: number;
}

const PagarCuenta = () => {
  const navigate = useNavigate();
  const [cuentas, setCuentas] = useState<number[]>([1]);
  const [consumosPorCuenta] = useState<{ [key: number]: Consumo[] }>({
    1: [{ platillo: 'Platillo 2', cantidad: 3, subtotal: 150 }],
    2: [{ platillo: 'Platillo 5', cantidad: 2, subtotal: 100 }],
    3: []
  });
  // Por defecto mostramos la cuenta 1
  const cuentaActiva = 1;

  const handleRegresar = () => {
    navigate('/mesero');
  };

  const handleCuentaClick = (numeroCuenta: number) => {
    console.log(`Cuenta ${numeroCuenta} seleccionada`);
    // Navegar a la vista de platillos con el número de cuenta
    navigate('/ordenar', { state: { numeroCuenta } });
  };

  const handleAgregar = () => {
    const nuevaCuenta = cuentas.length + 1;
    setCuentas([...cuentas, nuevaCuenta]);
  };
  
  const consumosActuales = consumosPorCuenta[cuentaActiva] || [];

  const handleImprimirTicket = () => {
    console.log('Imprimiendo ticket...');
    // Aquí se implementará la lógica de impresión
  };

  const calcularTotal = () => {
    return consumosActuales.reduce((acc, item) => acc + item.subtotal, 0);
  };

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
        
        <div className="flex lg:flex-col gap-2 w-full mt-16 flex-1">
          <div className="flex lg:flex-col gap-2 w-full overflow-y-auto lg:max-h-[60vh]">
            {cuentas.map((numeroCuenta) => (
              <button 
                key={numeroCuenta}
                onClick={() => handleCuentaClick(numeroCuenta)}
                className="w-full px-4 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all whitespace-nowrap"
              >
                Cuenta {numeroCuenta}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleAgregar}
            className="w-full px-4 py-3 bg-terracota text-white rounded-full text-base font-medium hover:bg-[#8d4d3a] transition-all whitespace-nowrap lg:mt-auto"
          >
            Agregar
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="bg-crema rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-2xl shadow-2xl">
          {/* Título */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gris-oscuro mb-2">Total consumido - Cuenta {cuentaActiva}</h1>
          </div>

          {/* Header de tabla */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4 text-center text-gris-oscuro font-medium text-xs sm:text-sm px-2 sm:px-4">
            <div>Nombre:</div>
            <div>Platillo</div>
            <div>Cantidad</div>
            <div>Sub-total</div>
          </div>

          {/* Items consumidos */}
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 overflow-auto max-h-60 sm:max-h-none">
            {consumosActuales.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-8">No hay consumos registrados en esta cuenta</p>
            ) : (
              consumosActuales.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 sm:gap-4 items-center px-2 sm:px-4">
                  <div className="col-span-2 bg-terracota text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full text-center font-medium text-xs sm:text-sm">
                    {item.platillo}
                  </div>
                  <div className="text-center text-gris-oscuro font-semibold text-sm sm:text-base lg:text-lg">
                    {item.cantidad}
                  </div>
                  <div className="text-center text-gris-oscuro font-semibold text-sm sm:text-base lg:text-lg">
                    Q {item.subtotal}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Botón Imprimir ticket */}
          <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12">
            <button
              onClick={handleImprimirTicket}
              disabled={consumosActuales.length === 0}
              className={`px-8 sm:px-12 lg:px-16 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all shadow-lg ${
                consumosActuales.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-400 text-white hover:bg-gray-500'
              }`}
            >
              Imprimir ticket
            </button>
          </div>

          {/* Total (si quisieras mostrarlo) */}
          {consumosActuales.length > 1 && (
            <div className="mt-4 sm:mt-6 text-right text-xl sm:text-2xl font-bold text-gris-oscuro">
              Total: Q {calcularTotal()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagarCuenta;
