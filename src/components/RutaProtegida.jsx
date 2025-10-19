import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ children, rolesPermitidos = [] }) => {
  const { usuario, estaAutenticado, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" />;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.rol)) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>⛔ Acceso Denegado</h4>
          <p>No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default RutaProtegida;