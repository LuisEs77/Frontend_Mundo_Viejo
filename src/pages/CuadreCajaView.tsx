import { useNavigate } from 'react-router-dom';

const CuadreCajaView = () => {
  const navigate = useNavigate();

  const ventas = [
    { label: "Llevar", value: 200.50, color: "bg-terracota" },
    { label: "Mesas", value: 200.50, color: "bg-terracota" },
    { label: "Total", value: 401.00, color: "bg-[#7FB069]" },
  ];

  const paymentBreakdown = [
    { type: "Tarjeta", amount: 350.75, color: "bg-[#A15C49]" },
    { type: "Efectivo", amount: 450.25, color: "bg-[#D9A679]" },
  ];

  const handleCierreTurno = () => {
    const confirmCierre = window.confirm("¿Está seguro de realizar el cierre de turno?");
    if (confirmCierre) {
      alert("Cierre de turno realizado con éxito.");
    } else {
      alert("Cierre de turno cancelado.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gris-oscuro">
      <div className="flex flex-1">
        {/* Barra lateral */}
        <div className="w-56 bg-gris-oscuro flex flex-col items-center pt-12 justify-between" style={{ minHeight: '100vh' }}>
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-crema text-gris-oscuro rounded-xl text-lg font-normal hover:bg-[#e8e8d0] transition-all"
            >
              Regresar
            </button>
          </div>
          <div className="w-full flex flex-col items-center pb-8">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-crema text-gris-oscuro rounded-xl text-lg font-normal hover:bg-[#e8e8d0] transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        {/* Panel principal */}
        <div className="flex-1 bg-[#6c6c6c] flex flex-col items-center justify-center p-8">
          {/* Payment Breakdown Section */}
          <div className="w-full max-w-xl flex flex-col gap-4 mb-10">
            <h3 className="text-2xl font-medium text-crema text-center">Desglose de Pagos</h3>
            {paymentBreakdown.map((payment) => (
              <div key={payment.type} className={`flex items-center justify-between px-6 py-3 rounded-lg shadow ${payment.color} text-white`}>
                <span className="text-lg font-semibold">{payment.type}</span>
                <span className="text-lg font-bold">Q. {payment.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <h2 className="text-4xl font-light text-crema mb-10 text-center">Total de Venta actual</h2>
          <div className="w-full max-w-xl flex flex-col gap-7 mb-14">
            {ventas.map((item) => (
              <div key={item.label} className="flex items-center gap-6">
                <div className="flex-1 flex items-center bg-crema rounded-full px-6 py-2 text-xl font-semibold shadow">
                  <span className="mr-auto">Q.</span>
                  <span>{item.value.toFixed(2)}</span>
                </div>
                <div
                  className={`w-28 h-11 text-lg rounded-lg flex items-center justify-center ${item.color} text-white cursor-default`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleCierreTurno}
            className="w-80 h-14 text-xl font-roboto bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all"
          >
            Cierre de turno
          </button>
        </div>
      </div>
      {/* Botón cerrar sesión abajo */}
      <div className="w-full flex justify-center pb-8 mt-auto">
        <button
          onClick={() => navigate('/')}
          className="px-10 py-3 bg-crema text-gris-oscuro rounded-full text-lg font-medium hover:bg-[#e8e8d0] transition-all shadow-lg"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default CuadreCajaView;
