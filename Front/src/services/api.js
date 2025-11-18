import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===============================
// SERVICIOS DE JUEGOS
// ===============================

export const obtenerJuegos = async (filtros = {}) => {
  try {
    const response = await api.get('/juegos', { params: filtros });
    return response.data;
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    throw error;
  }
};

export const obtenerJuegoPorId = async (id) => {
  try {
    const response = await api.get(`/juegos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener juego:', error);
    throw error;
  }
};

export const crearJuego = async (datosJuego) => {
  try {
    const response = await api.post('/juegos', datosJuego);
    return response.data;
  } catch (error) {
    console.error('Error al crear juego:', error);
    throw error;
  }
};

export const actualizarJuego = async (id, datosJuego) => {
  try {
    const response = await api.put(`/juegos/${id}`, datosJuego);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    throw error;
  }
};

export const eliminarJuego = async (id) => {
  try {
    const response = await api.delete(`/juegos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    throw error;
  }
};

export const obtenerEstadisticas = async () => {
  try {
    const response = await api.get('/juegos/estadisticas/generales');
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};

// ===============================
// SERVICIOS DE RESEÑAS
// ===============================

export const obtenerResenas = async (filtros = {}) => {
  try {
    const response = await api.get('/resenas', { params: filtros });
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error;
  }
};

export const obtenerResenaPorId = async (id) => {
  try {
    const response = await api.get(`/resenas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseña:', error);
    throw error;
  }
};

export const crearResena = async (datosResena) => {
  try {
    const response = await api.post('/resenas', datosResena);
    return response.data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};

export const actualizarResena = async (id, datosResena) => {
  try {
    const response = await api.put(`/resenas/${id}`, datosResena);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    throw error;
  }
};

export const eliminarResena = async (id) => {
  try {
    const response = await api.delete(`/resenas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error;
  }
};

export default api;
