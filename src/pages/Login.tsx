import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  // SEGURIDAD: Limpiar cualquier sesión existente al entrar al login
  useEffect(() => {
    logout(); // Esto limpia localStorage y estado
  }, [logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(usuario, contraseña);
      
      // Obtener los datos del usuario después del login exitoso
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      console.log('Datos del usuario después del login:', userData);
      console.log('Roles del usuario:', userData.roles);
      
      // Redireccionar según el rol - SOLO CAJERO Y MESERO
      if (userData.roles && (userData.roles.includes('cajero') || userData.roles.includes('admin'))) {
        console.log('Redirigiendo a cajero');
        navigate('/cajero');
      } else if (userData.roles && userData.roles.includes('mesero')) {
        console.log('Redirigiendo a mesero');
        navigate('/mesero');
      } else {
        // Rol no válido - cerrar sesión
        console.log('Rol no válido encontrado:', userData.roles);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError('Rol de usuario no válido. Contacte al administrador.');
      }
      
    } catch (err: any) {
      console.error('Error de login:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Error al iniciar sesión. Verifique sus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg flex flex-col items-center gap-8 sm:gap-10">
        {/* Logo y título */}
        <div className="flex flex-col items-center gap-3">
          <img 
            src="/logo-mundo-viejo.svg" 
            alt="Mundo Viejo" 
            className="w-64 sm:w-80 h-auto"
          />
          <p className="text-xs sm:text-sm tracking-[0.3em] text-gris-oscuro font-light">
            • RESTAURANTE •
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 sm:gap-6">
          {/* Mostrar error si existe */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="usuario" className="text-center text-sm sm:text-base text-black">
              Ingrese su usuario:
            </label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-crema rounded-xl text-sm sm:text-base outline-none focus:ring-2 focus:ring-verde-oscuro transition-all"
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contraseña" className="text-center text-sm sm:text-base text-black">
              Ingrese su contraseña:
            </label>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-crema rounded-xl text-sm sm:text-base outline-none focus:ring-2 focus:ring-verde-oscuro transition-all"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 sm:mt-5 mx-auto px-10 sm:px-12 py-3 sm:py-4 bg-verde-oscuro text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#3d5035] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
