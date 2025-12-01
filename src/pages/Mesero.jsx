import { usePedidos } from '../context/PedidosContext';
import { useAuth } from '../context/AuthContext';

const obtenerEstiloEstado = (estado) => {
  const estilos = {
    pendiente_aprobacion: 'bg-info text-dark',
    en_preparacion: 'bg-primary text-white',
  };
  return estilos[estado] || 'bg-secondary text-white';
};

const obtenerTextoEstado = (estado) => {
  const textos = {
    pendiente_aprobacion: 'Pendiente Aprobación',
    en_preparacion: 'En Preparación',
  };
  return textos[estado] || estado;
};

const Mesero = () => {
  const { pedidos, aprobarPedido, entregarPedido, cancelarPedido } = usePedidos();
  const { usuario } = useAuth();

  // Unificamos todos los pedidos activos para el mesero en una sola lista
  const pedidosActivos = pedidos.filter(
    p => (p.estado === 'pendiente_aprobacion' || p.estado === 'en_preparacion') && p.datosCliente.numeroMesa
  );

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  };

  const PedidoCard = ({ pedido }) => (
    <div className="card shadow-sm mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-bold">
          Mesa: {pedido.datosCliente.numeroMesa} - Pedido #{pedido.id.substring(0, 8)}
        </h6>
        <small className="text-muted">{formatearFecha(pedido.fecha)}</small>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <span className={`badge ${obtenerEstiloEstado(pedido.estado)}`}>{obtenerTextoEstado(pedido.estado)}</span>
        </div>
        <ul className="list-group list-group-flush">
          {pedido.productos.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0">
              <span>{item.cantidad}x {item.nombre}</span>
              <span className="fw-bold">${(item.cantidad * item.precio).toLocaleString('es-CL')}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => cancelarPedido(pedido.id)}
        >
          Cancelar
        </button>
        
        {/* --- BOTÓN INTELIGENTE --- */}
        {pedido.estado === 'pendiente_aprobacion' && (
          <button
            className="btn btn-success"
            onClick={() => aprobarPedido(pedido.id)}
          >
            Aprobar Pedido →
          </button>
        )}
        {pedido.estado === 'en_preparacion' && (
          <button
            className="btn btn-primary fw-bold"
            onClick={() => entregarPedido(pedido.id)}
          >
            Entregado ✓
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="text-center">
        <h1 className="mb-2 fw-bold">🛎️ Panel del Mesero</h1>
        <p className="text-muted mb-5">Hola, {usuario.nombre}. Aquí están los pedidos activos de las mesas.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h3 className="mb-4">Pedidos Activos</h3>
          {pedidosActivos.length > 0 ? (
            pedidosActivos.map(pedido => (
              <PedidoCard key={pedido.id} pedido={pedido} />
            ))
          ) : (
            <div className="alert alert-success text-center p-4">
              <h4 className="alert-heading">¡Todo al día!</h4>
              <p className="mb-0">No hay pedidos activos en las mesas por el momento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mesero;
