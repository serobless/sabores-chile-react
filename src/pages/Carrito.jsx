import { useCarrito } from '../context/CarritoContext';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const { 
    carrito, 
    eliminarDelCarrito, 
    actualizarCantidad, 
    vaciarCarrito, 
    obtenerTotal,
    obtenerSubtotal,
    obtenerIVA
  } = useCarrito();

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="mb-4" style={{ fontSize: '5rem' }}>🛒</div>
          <h2 className="mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">¡Agrega algunos productos deliciosos!</p>
          <Link to="/menu" className="btn btn-danger btn-lg">
            Ver Menú
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">🛒 Carrito de Compras</h1>
      
      <div className="row">
        {/* Lista de productos */}
        <div className="col-lg-8">
          {carrito.map(item => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2 text-center">
                    <span style={{ fontSize: '3rem' }}>{item.emoji}</span>
                  </div>
                  
                  <div className="col-md-4">
                    <h5 className="mb-1">{item.nombre}</h5>
                    <p className="text-muted small mb-0">{item.descripcion}</p>
                  </div>
                  
                  <div className="col-md-2">
                    <p className="fw-bold mb-0 text-danger">
                      ${item.precio.toLocaleString('es-CL')}
                    </p>
                  </div>
                  
                  <div className="col-md-2">
                    <div className="btn-group" role="group">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      >
                        -
                      </button>
                      <button className="btn btn-outline-secondary btn-sm" disabled>
                        {item.cantidad}
                      </button>
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-md-2 text-end">
                    <p className="fw-bold mb-2">
                      ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                    </p>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            className="btn btn-outline-danger" 
            onClick={vaciarCarrito}
          >
            Vaciar Carrito
          </button>
        </div>
        
        {/* Resumen del pedido */}
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h4 className="card-title mb-4">Resumen del Pedido</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal (Neto):</span>
                <span>${obtenerSubtotal().toLocaleString('es-CL')}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>IVA (19%):</span>
                <span>${obtenerIVA().toLocaleString('es-CL')}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong className="text-danger fs-4">
                  ${obtenerTotal().toLocaleString('es-CL')}
                </strong>
              </div>
              
              <Link 
                to="/checkout" 
                className="btn btn-danger w-100 btn-lg mb-2"
              >
                Proceder al Pago
              </Link>
              
              <Link 
                to="/menu" 
                className="btn btn-outline-secondary w-100"
              >
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;