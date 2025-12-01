import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { obtenerCantidadTotal } = useCarrito();
  const { usuario, estaAutenticado, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
          🇨🇱 Sabores de Chile
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">Menú</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>

            {/* Nuevo enlace: Mis Pedidos */}
            {estaAutenticado && (
              <li className="nav-item">
                <Link to="/mis-pedidos" className="nav-link">
                  📦 Mis Pedidos
                </Link>
              </li>
            )}

            {/* Mostrar Panel Admin si es administrador */}
            {estaAutenticado && usuario?.rol === 'administrador' && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin">
                  🔧 Admin
                </Link>
              </li>
            )}

            {/* Mostrar Panel Empleado si es empleado */}
            {estaAutenticado && usuario?.rol === 'empleado' && (
              <li className="nav-item">
                <Link className="nav-link text-info fw-bold" to="/empleado">
                  📋 Panel
                </Link>
              </li>
            )}

            {/* Mostrar Panel Mesero si es mesero */}
            {estaAutenticado && usuario?.rol === 'mesero' && (
              <li className="nav-item">
                <Link className="nav-link text-primary fw-bold" to="/mesero">
                  🛎️ Panel Mesero
                </Link>
              </li>
            )}

            <li className="nav-item ms-3">
              <Link 
                className="btn btn-danger position-relative" 
                to="/carrito"
              >
                🛒 Carrito
                {obtenerCantidadTotal() > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    {obtenerCantidadTotal()}
                  </span>
                )}
              </Link>
            </li>

            {/* Mostrar Login/Registro o Usuario logueado */}
            {!estaAutenticado ? (
              <>
                <li className="nav-item ms-2">
                  <Link className="btn btn-outline-danger" to="/login">
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="btn btn-danger" to="/registro">
                    Registrarse
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown ms-3">
                <button
                  className="btn btn-outline-danger dropdown-toggle"
                  type="button"
                  id="dropdownUsuario"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👤 {usuario.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUsuario">
                  <li>
                    <span className="dropdown-item-text">
                      <small className="text-muted">
                        {usuario.rol === 'administrador' && '🔧 Administrador'}
                        {usuario.rol === 'empleado' && '📋 Empleado'}
                        {usuario.rol === 'mesero' && '🛎️ Mesero'}
                        {usuario.rol === 'cliente' && '👤 Cliente'}
                      </small>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" to="/perfil">
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/mis-pedidos">
                      Mis Pedidos
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
