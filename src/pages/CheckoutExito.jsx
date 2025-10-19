import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePedidos } from '../context/PedidosContext';
import { useCarrito } from '../context/CarritoContext';

const CheckoutExito = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { crearPedido } = usePedidos();
  const { vaciarCarrito } = useCarrito();
  const [pedidoCreado, setPedidoCreado] = useState(null);
  const pedidoYaCreado = useRef(false); // Flag para evitar crear múltiples pedidos

  useEffect(() => {
    // Si ya se creó un pedido, no hacer nada
    if (pedidoYaCreado.current) return;

    // Verificar que tenemos los datos del state
    if (!location.state?.datosCliente || !location.state?.items) {
      navigate('/carrito');
      return;
    }

    const { datosCliente, items, total } = location.state;

    // Marcar que ya se está creando el pedido
    pedidoYaCreado.current = true;

    // Crear el pedido
    const nuevoPedido = crearPedido(items, datosCliente, total);
    setPedidoCreado(nuevoPedido);

    // Limpiar carrito
    vaciarCarrito();
  }, []); // Array vacío para que solo se ejecute una vez

  if (!pedidoCreado) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Procesando pedido...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 product-card">
            <div className="card-body p-5 text-center">
              {/* Icono de éxito animado */}
              <div className="mb-4">
                <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                  <circle cx="60" cy="60" r="55" fill="#28a745" opacity="0.1"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#28a745" strokeWidth="4"/>
                  <path d="M 35 60 L 52 77 L 85 40" fill="none" stroke="#28a745" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Título */}
              <h1 className="text-success mb-3 fw-bold">
                ✅ ¡Pedido Realizado con Éxito!
              </h1>
              <p className="text-muted mb-4 fs-5">
                Gracias por tu compra. Tu pedido ha sido registrado correctamente.
              </p>

              {/* Número de pedido */}
              <div className="alert alert-success mb-4 shadow-sm">
                <h5 className="mb-2">📋 Número de Pedido:</h5>
                <h3 className="fw-bold mb-0 text-success">{pedidoCreado.id}</h3>
                <small className="text-muted d-block mt-2">
                  Guarda este número para hacer seguimiento
                </small>
              </div>

              {/* Información del pedido */}
              <div className="bg-light p-4 rounded mb-4 text-start">
                <h5 className="fw-semibold mb-3 text-center">📦 Detalles del Pedido</h5>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>👤 Nombre:</strong>
                    <p className="mb-0 text-muted">{pedidoCreado.datosCliente.nombre}</p>
                  </div>
                  
                  {pedidoCreado.datosCliente.email && (
                    <div className="col-md-6 mb-3">
                      <strong>📧 Email:</strong>
                      <p className="mb-0 text-muted">{pedidoCreado.datosCliente.email}</p>
                    </div>
                  )}

                  {pedidoCreado.datosCliente.telefono && (
                    <div className="col-md-6 mb-3">
                      <strong>📱 Teléfono:</strong>
                      <p className="mb-0 text-muted">{pedidoCreado.datosCliente.telefono}</p>
                    </div>
                  )}

                  {pedidoCreado.datosCliente.direccion && (
                    <div className="col-md-6 mb-3">
                      <strong>📍 Dirección:</strong>
                      <p className="mb-0 text-muted">{pedidoCreado.datosCliente.direccion}</p>
                    </div>
                  )}

                  <div className="col-12 mb-3">
                    <strong>💳 Método de Pago:</strong>
                    <p className="mb-0 text-muted">
                      {pedidoCreado.metodoPago === 'efectivo' ? '💵 Efectivo' : '💳 Tarjeta'}
                    </p>
                  </div>
                </div>

                <hr className="my-3"/>

                <div className="d-flex justify-content-between align-items-center">
                  <strong className="fs-5">Total Pagado:</strong>
                  <span className="fs-3 fw-bold text-danger">
                    ${pedidoCreado.total.toLocaleString('es-CL')}
                  </span>
                </div>
              </div>

              {/* Productos del pedido */}
              <div className="text-start mb-4">
                <h5 className="fw-semibold mb-3 text-center">🍽️ Productos Pedidos</h5>
                <div className="list-group shadow-sm">
                  {pedidoCreado.productos.map((item, index) => (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <span className="me-3" style={{ fontSize: '2rem' }}>
                          {item.emoji || '🍽️'}
                        </span>
                        <div>
                          <div className="fw-medium">{item.nombre}</div>
                          <small className="text-muted">
                            {item.cantidad} × ${item.precio.toLocaleString('es-CL')}
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

              {/* Estado */}
              <div className="mb-4">
                <span className="badge bg-warning text-dark fs-5 px-4 py-3 shadow-sm">
                  ⏳ Estado: Pendiente de Preparación
                </span>
              </div>

              {/* Información adicional */}
              <div className="alert alert-info shadow-sm">
                <h6 className="fw-bold mb-2">ℹ️ Próximos Pasos:</h6>
                <p className="mb-0 small">
                  • Tu pedido está siendo procesado<br/>
                  • Recibirás actualizaciones del estado<br/>
                  • Puedes hacer seguimiento en "Mis Pedidos"<br/>
                  • Tiempo estimado de preparación: 30-45 minutos
                </p>
              </div>

              {/* Botones de acción */}
              <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
                <Link to="/mis-pedidos" className="btn btn-success btn-lg btn-animated">
                  📦 Ver Mis Pedidos
                </Link>
                <Link to="/menu" className="btn btn-danger btn-lg btn-animated">
                  🍽️ Hacer Otro Pedido
                </Link>
                <Link to="/" className="btn btn-outline-secondary btn-lg">
                  🏠 Ir al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutExito;