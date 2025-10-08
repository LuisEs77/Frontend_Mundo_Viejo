import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { usuario, contraseña });
    navigate('/mesero');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-5">
      <div className="w-full max-w-lg flex flex-col items-center gap-10">
        {/* Logo y título */}
        <div className="flex flex-col items-center gap-3">
          <img 
            src="/logo-mundo-viejo.svg" 
            alt="Mundo Viejo" 
            className="w-80 h-auto"
          />
          <p className="text-sm tracking-[0.3em] text-gris-oscuro font-light">
            • RESTAURANTE •
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="usuario" className="text-center text-base text-black">
              Ingrese su usuario:
            </label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-5 py-4 bg-crema rounded-xl text-base outline-none focus:ring-2 focus:ring-verde-oscuro transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contraseña" className="text-center text-base text-black">
              Ingrese su contraseña:
            </label>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full px-5 py-4 bg-crema rounded-xl text-base outline-none focus:ring-2 focus:ring-verde-oscuro transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-5 mx-auto px-12 py-4 bg-verde-oscuro text-white rounded-full text-lg font-medium hover:bg-[#3d5035] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
