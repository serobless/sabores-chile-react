import { usePedidos } from '../context/PedidosContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MisPedidos = () => {
  const { pedidos, cancelarPedido } = usePedidos();
  const { usuario } = useAuth();

  // Mostrar todos los pedidos (sin filtrar por email por ahora)
  const pedidosUsuario = pedidos;

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const obtenerEstiloEstado = (estado) => {
    const estilos = {
      pendiente: 'bg-warning text-dark',
      en_proceso: 'bg-info text-white',
      completado: 'bg-success text-white',
      cancelado: 'bg-danger text-white'
    };
    return estilos[estado] || 'bg-secondary text-white';
  };

  const obtenerTextoEstado = (estado) => {
    const textos = {
      pendiente: '⏳ Pendiente',
      en_proceso: '🍳 En Proceso',
      completado: '✅ Completado',
      cancelado: '❌ Cancelado'
    };
    return textos[estado] || estado;
  };

  if (pedidosUsuario.length === 0) {
    return (
      <div className="container py-5">
        <h1 className="text-center mb-5 fw-bold">Mis Pedidos</h1>
        
        <div className="empty-state text-center py-5">
          <div className="mb-4">
            <svg width="150" height="150" viewBox="0 0 150 150" className="mx-auto">
              <circle cx="75" cy="75" r="60" fill="none" stroke="#dc3545" strokeWidth="3" strokeDasharray="5,5"/>
              <text x="75" y="85" fontSize="50" textAnchor="middle" fill="#dc3545">📦</text>
            </svg>
          </div>
          <h3 className="text-muted mb-3">No tienes pedidos aún</h3>
          <p className="text-muted mb-4">
            ¡Haz tu primer pedido y disfruta de la comida chilena más deliciosa!
          </p>
          <Link to="/menu" className="btn btn-danger btn-lg btn-animated">
            🍽️ Ver Menú
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold">Mis Pedidos</h1>
        <span className="badge bg-danger fs-6">
          {pedidosUsuario.length} {pedidosUsuario.length === 1 ? 'pedido' : 'pedidos'}
        </span>
      </div>

      <div className="row g-4">
        {pedidosUsuario.map((pedido) => (
          <div key={pedido.id} className="col-12">
            <div className="card shadow-sm product-card">
              <div className="card-body">
                {/* Header del pedido */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="card-title fw-bold mb-1">
                      Pedido #{pedido.id}
                    </h5>
                    <small className="text-muted">
                      📅 {formatearFecha(pedido.fecha)}
                    </small>
                  </div>
                  <span className={`badge ${obtenerEstiloEstado(pedido.estado)} px-3 py-2`}>
                    {obtenerTextoEstado(pedido.estado)}
                  </span>
                </div>

                {/* Lista de productos */}
                <div className="mb-3">
                  <h6 className="fw-semibold mb-2">Productos:</h6>
                  <div className="list-group list-group-flush">
                    {pedido.productos.map((item, index) => (
                      <div 
                        key={index} 
                        className="list-group-item d-flex justify-content-between align-items-center px-0"
                      >
                        <div className="d-flex align-items-center">
                          <span className="me-2" style={{ fontSize: '1.5rem' }}>
                            {item.emoji || '🍽️'}
                          </span>
                          <div>
                            <div className="fw-medium">{item.nombre}</div>
                            <small className="text-muted">
                              Cantidad: {item.cantidad} × ${item.precio.toLocaleString('es-CL')}
                            </small>
                          </div>
                        </div>
                        <span className="fw-bold text-danger">
                          ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información de entrega */}
                <div className="mb-3 p-3 bg-light rounded">
                  <h6 className="fw-semibold mb-2">📍 Información de Entrega:</h6>
                  <p className="mb-1">
                    <strong>Nombre:</strong> {pedido.datosCliente.nombre}
                  </p>
                  {pedido.datosCliente.telefono && (
                    <p className="mb-1">
                      <strong>Teléfono:</strong> {pedido.datosCliente.telefono}
                    </p>
                  )}
                  {pedido.datosCliente.direccion && (
                    <p className="mb-1">
                      <strong>Dirección:</strong> {pedido.datosCliente.direccion}
                    </p>
                  )}
                  <p className="mb-0">
                    <strong>Método de Pago:</strong> {pedido.metodoPago === 'efectivo' ? '💵 Efectivo' : '💳 Tarjeta'}
                  </p>
                </div>

                {/* Total y acciones */}
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <div>
                    <span className="text-muted me-2">Total:</span>
                    <span className="fs-4 fw-bold text-danger">
                      ${pedido.total.toLocaleString('es-CL')}
                    </span>
                  </div>
                  <div>
                    {pedido.estado === 'pendiente' && (
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => cancelarPedido(pedido.id)}
                      >
                        ❌ Cancelar Pedido
                      </button>
                    )}
                    {pedido.estado === 'completado' && (
                      <button className="btn btn-outline-success btn-sm" disabled>
                        ✅ Pedido Completado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para volver al menú */}
      <div className="text-center mt-5">
        <Link to="/menu" className="btn btn-danger btn-lg btn-animated">
          ➕ Hacer Otro Pedido
        </Link>
      </div>
    </div>
  );
};

export default MisPedidos;