import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { carrito, obtenerTotal, vaciarCarrito } = useCarrito();

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [calle, setCalle] = useState('');
  const [region, setRegion] = useState('Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState('');
  const [indicaciones, setIndicaciones] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [errors, setErrors] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Validar formulario
  const validarFormulario = () => {
    const newErrors = {};

    if (!nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    if (!telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (telefono.replace(/\D/g, '').length < 8) {
      newErrors.telefono = 'El teléfono debe tener al menos 8 dígitos';
    }
    if (!calle.trim()) newErrors.calle = 'La calle es requerida';
    if (!comuna.trim()) newErrors.comuna = 'La comuna es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrorMessage(false);

    // Validar que hay items en el carrito
    if (carrito.length === 0) {
      navigate('/menu');
      return;
    }

    // Validar formulario
    if (!validarFormulario()) {
      setShowErrorMessage(true);
      // Scroll al inicio para ver el mensaje de error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Preparar dirección completa
    const direccionCompleta = `${calle}, ${comuna}, ${region}`;

    // Navegar a página de éxito con todos los datos
    navigate('/checkout/exito', {
      state: {
        datosCliente: {
          nombre: `${nombre} ${apellido}`,
          email,
          telefono,
          direccion: direccionCompleta,
          indicaciones,
          metodoPago
        },
        items: carrito,
        total: obtenerTotal()
      }
    });
  };

  // Si el carrito está vacío
  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center empty-state">
          <div className="mb-4">
            <svg width="150" height="150" viewBox="0 0 150 150" className="mx-auto">
              <circle cx="75" cy="75" r="60" fill="none" stroke="#dc3545" strokeWidth="3" strokeDasharray="5,5"/>
              <text x="75" y="90" fontSize="50" textAnchor="middle" fill="#dc3545">🛒</text>
            </svg>
          </div>
          <h2 className="mb-4">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">
            Agrega productos antes de proceder al checkout
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
      <h1 className="text-center mb-4 fw-bold">Carrito de compra</h1>
      <p className="text-center text-muted mb-4">
        Completa la siguiente información
      </p>

      {/* Mensaje de error general */}
      {showErrorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>⚠️ Error en el formulario</strong>
          <p className="mb-0 mt-2">Por favor completa todos los campos requeridos correctamente</p>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowErrorMessage(false)}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="row g-4">
        {/* FORMULARIO */}
        <div className="col-lg-7">
          <form onSubmit={handleSubmit}>
            {/* Información del cliente */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-4">Información del cliente</h5>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Nombre <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: Pedro"
                      autoComplete="given-name"
                    />
                    {errors.nombre && (
                      <div className="invalid-feedback">{errors.nombre}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Apellido <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      placeholder="Ej: García"
                      autoComplete="family-name"
                    />
                    {errors.apellido && (
                      <div className="invalid-feedback">{errors.apellido}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Correo <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Teléfono <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      autoComplete="tel"
                    />
                    {errors.telefono && (
                      <div className="invalid-feedback">{errors.telefono}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección de entrega */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  📍 Dirección de entrega de los productos
                </h5>
                <p className="text-muted small mb-4">
                  Ingresa dirección de forma detallada
                </p>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Calle <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.calle ? 'is-invalid' : ''}`}
                      value={calle}
                      onChange={(e) => setCalle(e.target.value)}
                      placeholder="Ej: Los cristalemos, Edificio Norte, Depto 603"
                      autoComplete="street-address"
                    />
                    {errors.calle && (
                      <div className="invalid-feedback">{errors.calle}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Región <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    >
                      <option>Región Metropolitana de Santiago</option>
                      <option>Región de Valparaíso</option>
                      <option>Región del Biobío</option>
                      <option>Región de la Araucanía</option>
                      <option>Región de Los Lagos</option>
                      <option>Otra región</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Comuna <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.comuna ? 'is-invalid' : ''}`}
                      value={comuna}
                      onChange={(e) => setComuna(e.target.value)}
                      placeholder="Ej: Cerrillos"
                      autoComplete="address-level2"
                    />
                    {errors.comuna && (
                      <div className="invalid-feedback">{errors.comuna}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Indicaciones para la entrega (opcional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={indicaciones}
                      onChange={(e) => setIndicaciones(e.target.value)}
                      placeholder="Ej: Entre calles, color del edificio, número de timbre, no tiene timbre, portero dejó pasar directamente."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Método de pago */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-4">💳 Método de Pago</h5>
                
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    id="efectivo"
                    value="efectivo"
                    checked={metodoPago === 'efectivo'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="efectivo">
                    💵 Efectivo (Pago contra entrega)
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    id="tarjeta"
                    value="tarjeta"
                    checked={metodoPago === 'tarjeta'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="tarjeta">
                    💳 Tarjeta de crédito/débito
                  </label>
                </div>
              </div>
            </div>

            {/* Botón de pagar */}
            <button 
              type="submit" 
              className="btn btn-danger btn-lg w-100 btn-animated mb-3"
            >
              💰 Pagar ahora ${obtenerTotal().toLocaleString('es-CL')}
            </button>

            <Link to="/carrito" className="btn btn-outline-secondary w-100">
              ← Volver al Carrito
            </Link>
          </form>
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div className="col-lg-5">
          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="card-title fw-bold mb-4">📋 Resumen del Pedido</h5>

              {/* Lista de productos */}
              <div className="mb-3">
                {carrito.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                    <div className="d-flex align-items-center">
                      <span className="me-2" style={{ fontSize: '1.5rem' }}>
                        {item.emoji}
                      </span>
                      <div>
                        <div className="fw-medium">{item.nombre}</div>
                        <small className="text-muted">
                          Cantidad: {item.cantidad}
                        </small>
                      </div>
                    </div>
                    <span className="fw-bold text-danger">
                      ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Subtotal:</span>
                  <span className="fw-semibold">
                    ${obtenerTotal().toLocaleString('es-CL')}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Envío:</span>
                  <span className="text-success fw-semibold">Gratis</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold">Total a pagar:</span>
                  <span className="fs-4 fw-bold text-danger">
                    ${obtenerTotal().toLocaleString('es-CL')}
                  </span>
                </div>
              </div>

              {/* Información adicional */}
              <div className="alert alert-info mt-4 mb-0">
                <small>
                  <strong>ℹ️ Información:</strong><br/>
                  • Entrega en 30-45 minutos<br/>
                  • Envío gratis en toda la región<br/>
                  • Pago seguro y protegido
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;