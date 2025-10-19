import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const resultado = login(email, password);

    if (resultado.success) {
      navigate('/');
    } else {
      setError(resultado.error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">🇨🇱 Iniciar Sesión</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <button type="submit" className="btn btn-danger w-100 mb-3">
                  Iniciar Sesión
                </button>
              </form>

              <div className="text-center">
                <p className="mb-0">
                  ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                </p>
              </div>

              <hr className="my-4" />

              <div className="alert alert-info small">
                <strong>Usuarios de prueba:</strong><br />
                <strong>Admin:</strong> admin@saboresdechile.cl / admin123<br />
                <strong>Cliente:</strong> maria@email.com / cliente123<br />
                <strong>Empleado:</strong> empleado@saboresdechile.cl / empleado123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;