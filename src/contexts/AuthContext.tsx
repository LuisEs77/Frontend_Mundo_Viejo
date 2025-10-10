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
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('AuthContext - estado actualizado', { token, user });
  }, [token, user]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        setToken(event.newValue);
      }

      if (event.key === 'user') {
        setUser(event.newValue ? (JSON.parse(event.newValue) as User) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
        console.log('Token guardado en localStorage:', access_token);
        
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

  const effectiveToken = token ?? localStorage.getItem('token');
  const effectiveUser = user ?? (() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  })();

  const isAuthenticated = !!effectiveToken && !!effectiveUser;

  const value: AuthContextType = {
    user: effectiveUser,
    token: effectiveToken,
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
