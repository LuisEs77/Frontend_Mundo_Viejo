import axios from 'axios';

// Configuración base de axios
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token de autenticación si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Interfaces para tipado
export interface LoginData {
  usuario: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  password: string;
  rolId: number;
}

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  roles: string[];
}

export interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  estado: string;
  pasillo: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  categoria: {
    id: number;
    nombre: string;
  };
  inventario: {
    stock: number;
  };
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Orden {
  id: number;
  total: number;
  estado: string;
  mesa: Mesa;
  usuario: User;
  fecha: string;
  ordenProductos?: OrdenProducto[];
}

export interface OrdenProducto {
  id: number;
  cantidad: number;
  subtotal: number;
  producto: Producto;
  notas?: string;
}

// Servicios de autenticación
export const authService = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

// Servicios de usuario
export const usuarioService = {
  getProfile: async () => {
    const response = await api.get('/usuario/profile');
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/usuario');
    return response.data;
  },
};

// Servicios de mesa
export const mesaService = {
  getAll: async () => {
    const response = await api.get('/mesa');
    return response.data;
  },

  getByPasillo: async (pasillo: string) => {
    const response = await api.get(`/mesa/pasillo/${pasillo}`);
    return response.data;
  },

  updateEstado: async (id: number, estado: string) => {
    const response = await api.patch(`/mesa/${id}/estado`, { estado });
    return response.data;
  },
};

// Servicios de producto
export const productoService = {
  getAll: async () => {
    const response = await api.get('/producto');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/producto/${id}`);
    return response.data;
  },

  getByCategoria: async (categoriaId: number) => {
    const response = await api.get(`/producto/categoria/${categoriaId}`);
    return response.data;
  },
};

// Servicios de categoria
export const categoriaService = {
  getAll: async () => {
    const response = await api.get('/categoria');
    return response.data;
  },
};

// Servicios de orden
export const ordenService = {
  create: async (ordenData: any) => {
    const response = await api.post('/orden', ordenData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/orden');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/orden/${id}`);
    return response.data;
  },

  updateEstado: async (id: number, estado: string) => {
    const response = await api.patch(`/orden/${id}/estado`, { estado });
    return response.data;
  },

  getByEstado: async (estado: string) => {
    const response = await api.get(`/orden/estado/${estado}`);
    return response.data;
  },

  getByMesa: async (mesaId: number) => {
    const response = await api.get(`/orden/mesa/${mesaId}`);
    return response.data;
  },
};

// Servicios de orden-producto
export const ordenProductoService = {
  addProducto: async (ordenId: number, productoData: any) => {
    const response = await api.post('/orden-producto', {
      ordenId,
      ...productoData,
    });
    return response.data;
  },

  updateCantidad: async (id: number, cantidad: number) => {
    const response = await api.patch(`/orden-producto/${id}`, { cantidad });
    return response.data;
  },

  remove: async (id: number) => {
    const response = await api.delete(`/orden-producto/${id}`);
    return response.data;
  },
};

// Servicios de pago
export const pagoService = {
  procesarPago: async (pagoData: any) => {
    const response = await api.post('/pago', pagoData);
    return response.data;
  },

  getByOrden: async (ordenId: number) => {
    const response = await api.get(`/pago/orden/${ordenId}`);
    return response.data;
  },
};

// Servicios de métodos de pago
export const metodoPagoService = {
  getAll: async () => {
    const response = await api.get('/metodo-pago');
    return response.data;
  },
};

export default api;
