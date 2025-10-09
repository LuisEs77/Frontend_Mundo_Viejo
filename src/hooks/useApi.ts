import { useState, useEffect } from 'react';
import { mesaService, productoService, categoriaService, ordenService } from '../services/api';
import type { Mesa, Producto, Categoria, Orden } from '../services/api';

// Hook para obtener mesas
export const useMesas = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMesas = async () => {
    try {
      setLoading(true);
      const data = await mesaService.getAll();
      setMesas(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las mesas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  const updateMesaEstado = async (id: number, estado: string) => {
    try {
      await mesaService.updateEstado(id, estado);
      await fetchMesas(); // Recargar mesas
    } catch (err: any) {
      throw new Error(err.message || 'Error al actualizar el estado de la mesa');
    }
  };

  return {
    mesas,
    loading,
    error,
    refetch: fetchMesas,
    updateMesaEstado,
  };
};

// Hook para obtener mesas por pasillo
export const useMesasByPasillo = (pasillo: string) => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMesas = async () => {
    if (!pasillo) return;
    
    try {
      setLoading(true);
      const data = await mesaService.getByPasillo(pasillo);
      setMesas(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las mesas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMesas();
  }, [pasillo]);

  return {
    mesas,
    loading,
    error,
    refetch: fetchMesas,
  };
};

// Hook para obtener productos
export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await productoService.getAll();
      setProductos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    refetch: fetchProductos,
  };
};

// Hook para obtener productos por categoría
export const useProductosByCategoria = (categoriaId?: number) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    if (!categoriaId) return;
    
    try {
      setLoading(true);
      const data = await productoService.getByCategoria(categoriaId);
      setProductos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [categoriaId]);

  return {
    productos,
    loading,
    error,
    refetch: fetchProductos,
  };
};

// Hook para obtener categorías
export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriaService.getAll();
      setCategorias(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    refetch: fetchCategorias,
  };
};

// Hook para obtener órdenes
export const useOrdenes = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrdenes = async () => {
    try {
      setLoading(true);
      const data = await ordenService.getAll();
      setOrdenes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las órdenes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const updateOrdenEstado = async (id: number, estado: string) => {
    try {
      await ordenService.updateEstado(id, estado);
      await fetchOrdenes(); // Recargar órdenes
    } catch (err: any) {
      throw new Error(err.message || 'Error al actualizar el estado de la orden');
    }
  };

  return {
    ordenes,
    loading,
    error,
    refetch: fetchOrdenes,
    updateOrdenEstado,
  };
};

// Hook para obtener órdenes por estado
export const useOrdenesByEstado = (estado: string) => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrdenes = async () => {
    try {
      setLoading(true);
      const data = await ordenService.getByEstado(estado);
      setOrdenes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las órdenes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, [estado]);

  return {
    ordenes,
    loading,
    error,
    refetch: fetchOrdenes,
  };
};
