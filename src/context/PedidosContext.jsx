import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Asegúrate de tener uuid instalado: npm install uuid
const PedidosContext = createContext();

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos debe usarse dentro de PedidosProvider');
  }
  return context;
};

export const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(() => {
    const pedidosGuardados = localStorage.getItem('pedidos');
    return pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  // Crear un nuevo pedido
  const crearPedido = (productos, datosCliente, total) => {
    const nuevoPedido = {
      id: uuidv4(),
      fecha: new Date().toISOString(),
      productos: [...productos],
      datosCliente,
      total,
      // Estado inicial depende de si es un pedido de mesa o no
      estado: datosCliente.numeroMesa ? 'pendiente_aprobacion' : 'pendiente_preparacion',
      metodoPago: datosCliente.metodoPago
    };
    setPedidos(prevPedidos => [...prevPedidos, nuevoPedido]);
    return nuevoPedido;
  };

  const aprobarPedido = (pedidoId) => {
    setPedidos(pedidos.map(p => 
      p.id === pedidoId ? { ...p, estado: 'en_preparacion' } : p
    ));
  };

  const entregarPedido = (pedidoId) => {
    setPedidos(pedidos.map(p => 
      p.id === pedidoId ? { ...p, estado: 'entregado' } : p
    ));
  };

  const despacharPedido = (pedidoId) => {
    setPedidos(pedidos.map(p =>
      p.id === pedidoId ? { ...p, estado: 'en_camino' } : p
    ));
  };

  // Cancelar pedido
  const cancelarPedido = (pedidoId) => {
    setPedidos(pedidos.map(p => p.id === pedidoId ? { ...p, estado: 'cancelado' } : p));
  };

  const value = {
    pedidos,
    crearPedido,
    cancelarPedido,
    aprobarPedido,
    entregarPedido,
    despacharPedido,
  };

  return (
    <PedidosContext.Provider value={value}>
      {children}
    </PedidosContext.Provider>
  );
};