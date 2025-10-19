import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CheckoutError = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  useEffect(() => {
    // Si no hay datos, redirigir al carrito
    if (!formData) {
      navigate('/carrito');
    }
  }, [formData, navigate]);

  if (!formData) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-danger">
            <div className="card-body text-center p-5">
              {/* Icono de error */}
              <div className="mb-4">
                <div 
                  className="rounded-circle bg-danger d-inline-flex align-items-center justify-content-center"
                  style={{ width: '100px', height: '100px' }}
                >
                  <span style={{ fontSize: '3rem' }}>✗</span>
                </div>
              </div>

              <h2 className="text-danger mb-3">No se pudo realizar el pago</h2>
              <p className="lead mb-4">
                Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
              </p>

              {/* Posibles causas */}
              <div className="card bg-light mb-4">
                <div className="card-body text-start">
                  <h5 className="card-title text-center mb-3">Posibles causas:</h5>
                  <ul className="mb-0">
                    <li>Fondos insuficientes en la cuenta</li>
                    <li>Datos de la tarjeta incorrectos</li>
                    <li>Problemas de conexión con el banco</li>
                    <li>Tarjeta bloqueada o expirada</li>
                  </ul>
                </div>
              </div>

              {/* Información del intento */}
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h5 className="card-title">Información del Intento</h5>
                  <div className="row text-start mt-3">
                    <div className="col-6 mb-2">
                      <strong>Cliente:</strong>
                    </div>
                    <div className="col-6 mb-2">
                      {formData.nombre} {formData.apellido}
                    </div>

                    <div className="col-6 mb-2">
                      <strong>Email:</strong>
                    </div>
                    <div className="col-6 mb-2">
                      {formData.email}
                    </div>

                    <div className="col-6 mb-2">
                      <strong>Método de Pago:</strong>
                    </div>
                    <div className="col-6 mb-2">
                      {formData.metodoPago === 'tarjeta' && '💳 Tarjeta'}
                      {formData.metodoPago === 'efectivo' && '💵 Efectivo'}
                      {formData.metodoPago === 'transferencia' && '🏦 Transferencia'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alertas */}
              <div className="alert alert-warning">
                <strong>⚠️ No se realizó ningún cargo</strong>
                <p className="mb-0 mt-2">
                  Tu tarjeta no ha sido cobrada. Puedes intentar nuevamente sin preocupaciones.
                </p>
              </div>

              <div className="alert alert-info">
                <strong>💡 Sugerencias:</strong>
                <ul className="mb-0 mt-2 text-start">
                  <li>Verifica que tus datos sean correctos</li>
                  <li>Intenta con otro método de pago</li>
                  <li>Contacta a tu banco si el problema persiste</li>
                </ul>
              </div>

              {/* Botones */}
              <div className="d-grid gap-2 mt-4">
                <button 
                  className="btn btn-danger btn-lg"
                  onClick={() => navigate('/checkout', { state: { formData } })}
                >
                  🔄 Volver a Intentar
                </button>
                <Link to="/carrito" className="btn btn-outline-secondary">
                  Volver al Carrito
                </Link>
                <Link to="/" className="btn btn-outline-secondary">
                  Volver al inicio
                </Link>
              </div>

              {/* Contacto */}
              <div className="mt-4 pt-4 border-top">
                <p className="text-muted mb-2">¿Necesitas ayuda?</p>
                <p className="mb-0">
                  <strong>📞 +56 2 2345 6789</strong> | 
                  <strong> ✉️ ayuda@saboresdechile.cl</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutError;