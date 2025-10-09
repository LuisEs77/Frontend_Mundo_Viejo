import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/api';
import type { User } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (usuario: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SEGURIDAD: NO cargar sesión automáticamente
    // Los usuarios DEBEN hacer login cada vez que abran la aplicación
    
    // Limpiar cualquier sesión previa al iniciar la aplicación
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setLoading(false);
  }, []);

  const login = async (usuario: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login({ usuario, password });
      
      if (response.access_token && response.user) {
        const { access_token, user: userData } = response;
        
        // Guardar en localStorage
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Actualizar estado
        setToken(access_token);
        setUser(userData);
      } else {
        throw new Error('Respuesta de login inválida');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Limpiar estado
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
