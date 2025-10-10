import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { ReactNode } from 'react';
import type { User } from '../services/api';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading, token } = useAuth();

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - loading:', loading);
  console.log('ProtectedRoute - requiredRole:', requiredRole);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  const storedToken = token ?? localStorage.getItem('token');
  const storedUserRaw = localStorage.getItem('user');
  const fallbackUser = storedUserRaw ? (JSON.parse(storedUserRaw) as User) : null;
  const effectiveUser = user ?? fallbackUser;

  // Si existe token pero todavía no se ha restaurado el usuario, continuar mostrando loading
  if (storedToken && !user) {
    console.log('ProtectedRoute - esperando restaurar usuario desde almacenamiento');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  // Redireccionar al login si no está autenticado
  if (!isAuthenticated && !storedToken) {
    console.log('Usuario no autenticado, redirigiendo al login');
    return <Navigate to="/" replace />;
  }

  // VERIFICACIÓN ESTRICTA DE ROLES - SEGURIDAD MÁXIMA
  const userRoles = effectiveUser?.roles || [];
  console.log('ProtectedRoute - userRoles:', userRoles);
  
  // Si se requiere un rol específico, verificar que lo tenga
  if (requiredRole) {
    const hasRequiredRole = userRoles.includes(requiredRole.toLowerCase());
    console.log('ProtectedRoute - hasRequiredRole:', hasRequiredRole);
    console.log('ProtectedRoute - requiredRole.toLowerCase():', requiredRole.toLowerCase());
    
    if (!hasRequiredRole) {
      console.log('Acceso denegado, redirigiendo a vista autorizada');
      // Acceso DENEGADO - Redirigir SOLO a su vista autorizada
      if (userRoles.includes('cajero') || userRoles.includes('admin')) {
        return <Navigate to="/cajero" replace />;
      } else if (userRoles.includes('mesero')) {
        return <Navigate to="/mesero" replace />;
      } else {
        // Rol no válido - volver al login
        return <Navigate to="/" replace />;
      }
    }
  } else {
    // Si no se especifica rol requerido, solo permitir roles válidos
    const hasValidRole = userRoles.includes('cajero') || 
                        userRoles.includes('admin') || 
                        userRoles.includes('mesero');
    
    if (!hasValidRole) {
      // Sin rol válido - volver al login
      return <Navigate to="/" replace />;
    }
  }

  console.log('ProtectedRoute - Acceso permitido, renderizando children');
  return <>{children}</>;
};

export default ProtectedRoute;
