// src/data/ordenes.js

let ordenesData = [];

export const crearOrden = (ordenData) => {
  const nuevaOrden = {
    id: ordenesData.length + 1,
    numeroOrden: `ORD-${Date.now()}`,
    ...ordenData,
    estado: 'pendiente',
    fechaCreacion: new Date().toISOString()
  };
  
  ordenesData.push(nuevaOrden);
  return nuevaOrden;
};

export const obtenerOrdenes = () => {
  return ordenesData;
};

export const obtenerOrdenPorId = (id) => {
  return ordenesData.find(o => o.id === id);
};

export const obtenerOrdenesPorUsuario = (usuarioId) => {
  return ordenesData.filter(o => o.usuarioId === usuarioId);
};

export const actualizarEstadoOrden = (id, nuevoEstado) => {
  const orden = ordenesData.find(o => o.id === id);
  if (orden) {
    orden.estado = nuevoEstado;
    orden.fechaActualizacion = new Date().toISOString();
    return orden;
  }
  return null;
};