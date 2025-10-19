import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import Toast from './Toast';
import ProductoAuditoria from './ProductoAuditoria';

const ProductCard = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [cantidadAgregada, setCantidadAgregada] = useState(0); // Nueva variable para guardar la cantidad
  const [imagenError, setImagenError] = useState(false);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    setCantidadAgregada(cantidad); // Guardar la cantidad ANTES de resetear
    setShowToast(true);
    setCantidad(1); // Ahora sí resetear
  };

  const incrementar = () => {
    if (cantidad < 10) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleImagenError = () => {
    setImagenError(true);
  };

  // Determinar si el stock es bajo
  const stockBajo = producto.stock < 20;

  return (
    <>
      {showToast && (
        <Toast 
          message={`${cantidadAgregada}x ${producto.nombre} agregado al carrito`}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <div className="card h-100 shadow-sm product-card">
        {/* Imagen o Emoji de fallback */}
        <div 
          className="product-card-img-container card-img-top d-flex align-items-center justify-content-center overflow-hidden" 
          style={{ 
            height: '250px',
            background: imagenError ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa'
          }}
        >
          {!imagenError ? (
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              onError={handleImagenError}
              className="product-card-img"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
          ) : (
            <span className="product-card-emoji" style={{ fontSize: '4rem' }}>
              {producto.emoji}
            </span>
          )}
        </div>
        
        <div className="card-body">
          <h5 className="card-title fw-bold">{producto.nombre}</h5>
          <p className="card-text text-muted small">{producto.descripcion}</p>
          
          
          <div className="mb-2">
            <span className="badge bg-info text-dark me-2 badge-animated">
              {producto.unidadVenta}
            </span>
            <span className="badge bg-warning text-dark badge-animated">
              {producto.tiempoPreparacion}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fs-4 fw-bold text-danger precio-destacado">
              ${producto.precio.toLocaleString('es-CL')}
            </span>
            <span className={`badge ${stockBajo ? 'stock-badge-low' : 'bg-success'}`}>
              Stock: {producto.stock}
            </span>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="btn-group" role="group">
              <button 
                className="btn btn-outline-danger btn-sm counter-btn" 
                onClick={decrementar}
                disabled={cantidad <= 1}
              >
                -
              </button>
              <button className="btn btn-outline-secondary btn-sm" disabled>
                {cantidad}
              </button>
              <button 
                className="btn btn-outline-danger btn-sm counter-btn" 
                onClick={incrementar}
                disabled={cantidad >= 10}
              >
                +
              </button>
            </div>
          </div>

          <button 
            className="btn btn-danger w-100 btn-animated btn-add-cart" 
            onClick={handleAgregar}
            disabled={producto.stock === 0}
          >
            {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;