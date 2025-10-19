import { createContext, useContext, useState } from 'react';

const PedidosContext = createContext();

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos debe usarse dentro de PedidosProvider');
  }
  return context;
};

export const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  // Crear un nuevo pedido
  const crearPedido = (carritoItems, datosCliente, total) => {
    const nuevoPedido = {
      id: `ORD-${Date.now()}`,
      fecha: new Date().toISOString(),
      estado: 'pendiente', // pendiente, en_proceso, completado, cancelado
      productos: carritoItems.map(item => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        emoji: item.emoji
      })),
      datosCliente: {
        nombre: datosCliente.nombre || 'Invitado',
        email: datosCliente.email || '',
        telefono: datosCliente.telefono || '',
        direccion: datosCliente.direccion || ''
      },
      total: total,
      metodoPago: datosCliente.metodoPago || 'efectivo'
    };

    setPedidos(prev => [nuevoPedido, ...prev]);
    return nuevoPedido;
  };

  // Obtener pedidos del usuario actual
  const obtenerPedidosUsuario = (email) => {
    if (!email) return pedidos;
    return pedidos.filter(p => p.datosCliente.email === email);
  };

  // Actualizar estado del pedido
  const actualizarEstadoPedido = (pedidoId, nuevoEstado) => {
    setPedidos(prev => 
      prev.map(p => 
        p.id === pedidoId 
          ? { ...p, estado: nuevoEstado, fechaActualizacion: new Date().toISOString() }
          : p
      )
    );
  };

  // Cancelar pedido
  const cancelarPedido = (pedidoId) => {
    actualizarEstadoPedido(pedidoId, 'cancelado');
  };

  // Obtener pedido por ID
  const obtenerPedidoPorId = (pedidoId) => {
    return pedidos.find(p => p.id === pedidoId);
  };

  const value = {
    pedidos,
    crearPedido,
    obtenerPedidosUsuario,
    actualizarEstadoPedido,
    cancelarPedido,
    obtenerPedidoPorId
  };

  return (
    <PedidosContext.Provider value={value}>
      {children}
    </PedidosContext.Provider>
  );
};