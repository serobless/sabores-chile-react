import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from '../data/productos';
import ModalProducto from '../components/ModalProducto';
import Toast from '../components/Toast';

const Admin = () => {
  const { usuario } = useAuth();
  const [vistaActiva, setVistaActiva] = useState('dashboard');
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [productoEliminar, setProductoEliminar] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    setProductos(obtenerProductos());
  };

  // Estadísticas
  const stats = {
    totalProductos: productos.length,
    productosActivos: productos.filter(p => p.stock > 0).length,
    productosBajoStock: productos.filter(p => p.stock < 10).length,
    totalVentas: 150,
    ventasHoy: 12
  };

  const handleNuevoProducto = () => {
    setProductoEditar(null);
    setShowModal(true);
  };

  const handleEditarProducto = (producto) => {
    setProductoEditar(producto);
    setShowModal(true);
  };

  const handleGuardarProducto = (productoData) => {
    if (productoEditar) {
      // Editar producto existente
      const actualizado = actualizarProducto(productoEditar.id, productoData);
      if (actualizado) {
        setToastMessage(`✅ Producto "${productoData.nombre}" actualizado correctamente`);
        setShowToast(true);
        cargarProductos();
      }
    } else {
      // Crear nuevo producto
      const nuevo = agregarProducto(productoData);
      if (nuevo) {
        setToastMessage(`✅ Producto "${productoData.nombre}" creado correctamente`);
        setShowToast(true);
        cargarProductos();
      }
    }
    setShowModal(false);
    setProductoEditar(null);
  };

  const handleEliminarProducto = (producto) => {
    setProductoEliminar(producto);
  };

  const confirmarEliminar = () => {
    if (productoEliminar) {
      const eliminado = eliminarProducto(productoEliminar.id);
      if (eliminado) {
        setToastMessage(`✅ Producto "${productoEliminar.nombre}" eliminado correctamente`);
        setShowToast(true);
        cargarProductos();
      }
      setProductoEliminar(null);
    }
  };

  const cancelarEliminar = () => {
    setProductoEliminar(null);
  };

  return (
    <>
      {showToast && (
        <Toast 
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      <ModalProducto
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setProductoEditar(null);
        }}
        onSave={handleGuardarProducto}
        productoEditar={productoEditar}
      />

      {/* Modal de Confirmación de Eliminación */}
      {productoEliminar && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">⚠️ Confirmar Eliminación</h5>
                <button type="button" className="btn-close btn-close-white" onClick={cancelarEliminar}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar el producto?</p>
                <div className="alert alert-warning">
                  <strong>{productoEliminar.emoji} {productoEliminar.nombre}</strong>
                  <p className="mb-0 small">{productoEliminar.descripcion}</p>
                </div>
                <p className="text-danger small mb-0">Esta acción no se puede deshacer.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelarEliminar}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmarEliminar}>
                  Sí, Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100 p-3">
            <h5 className="mb-4">🔧 Panel Admin</h5>
            <p className="small text-muted mb-4">{usuario?.nombre}</p>

            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <button
                  className={`btn w-100 text-start ${vistaActiva === 'dashboard' ? 'btn-danger' : 'btn-outline-light'}`}
                  onClick={() => setVistaActiva('dashboard')}
                >
                  📊 Dashboard
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className={`btn w-100 text-start ${vistaActiva === 'productos' ? 'btn-danger' : 'btn-outline-light'}`}
                  onClick={() => setVistaActiva('productos')}
                >
                  🍽️ Productos
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className={`btn w-100 text-start ${vistaActiva === 'ordenes' ? 'btn-danger' : 'btn-outline-light'}`}
                  onClick={() => setVistaActiva('ordenes')}
                >
                  📦 Órdenes
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className={`btn w-100 text-start ${vistaActiva === 'usuarios' ? 'btn-danger' : 'btn-outline-light'}`}
                  onClick={() => setVistaActiva('usuarios')}
                >
                  👥 Usuarios
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className={`btn w-100 text-start ${vistaActiva === 'reportes' ? 'btn-danger' : 'btn-outline-light'}`}
                  onClick={() => setVistaActiva('reportes')}
                >
                  📈 Reportes
                </button>
              </li>
            </ul>

            <hr className="my-4 bg-light" />

            <Link to="/" className="btn btn-outline-light w-100">
              ← Volver al Sitio
            </Link>
          </div>

          {/* Contenido Principal */}
          <div className="col-md-9 col-lg-10 p-4">
            {/* Dashboard */}
            {vistaActiva === 'dashboard' && (
              <>
                <h2 className="mb-4">📊 Dashboard</h2>
                
                <div className="row g-4 mb-4">
                  <div className="col-md-3">
                    <div className="card bg-primary text-white">
                      <div className="card-body">
                        <h6 className="card-title">Total Productos</h6>
                        <h2 className="mb-0">{stats.totalProductos}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card bg-success text-white">
                      <div className="card-body">
                        <h6 className="card-title">Con Stock</h6>
                        <h2 className="mb-0">{stats.productosActivos}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card bg-warning text-white">
                      <div className="card-body">
                        <h6 className="card-title">Bajo Stock</h6>
                        <h2 className="mb-0">{stats.productosBajoStock}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card bg-info text-white">
                      <div className="card-body">
                        <h6 className="card-title">Ventas Hoy</h6>
                        <h2 className="mb-0">{stats.ventasHoy}</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Actividad Reciente</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">✅ Producto "Empanadas de Pino" actualizado</li>
                      <li className="list-group-item">📦 Nueva orden #1234 recibida</li>
                      <li className="list-group-item">👤 Nuevo usuario registrado: Maria</li>
                      <li className="list-group-item">⚠️ Stock bajo en "Cazuela de Vacuno"</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Productos */}
            {vistaActiva === 'productos' && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>🍽️ Gestión de Productos</h2>
                  <button className="btn btn-danger" onClick={handleNuevoProducto}>
                    ➕ Nuevo Producto
                  </button>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map(producto => (
                            <tr key={producto.id}>
                              <td>{producto.id}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="me-2" style={{ fontSize: '2rem' }}>
                                    {producto.emoji}
                                  </span>
                                  <div>
                                    <div className="fw-bold">{producto.nombre}</div>
                                    <small className="text-muted">{producto.autor}</small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="badge bg-info">
                                  {producto.categoria}
                                </span>
                              </td>
                              <td className="fw-bold">
                                ${producto.precio.toLocaleString('es-CL')}
                              </td>
                              <td>
                                <span className={`badge ${producto.stock < 10 ? 'bg-warning' : 'bg-success'}`}>
                                  {producto.stock}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-primary me-1"
                                  onClick={() => handleEditarProducto(producto)}
                                  title="Editar"
                                >
                                  ✏️
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleEliminarProducto(producto)}
                                  title="Eliminar"
                                >
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Órdenes */}
            {vistaActiva === 'ordenes' && (
              <>
                <h2 className="mb-4">📦 Gestión de Órdenes</h2>
                <div className="alert alert-info">
                  Funcionalidad de órdenes en desarrollo...
                </div>
              </>
            )}

            {/* Usuarios */}
            {vistaActiva === 'usuarios' && (
              <>
                <h2 className="mb-4">👥 Gestión de Usuarios</h2>
                <div className="alert alert-info">
                  Funcionalidad de usuarios en desarrollo...
                </div>
              </>
            )}

            {/* Reportes */}
            {vistaActiva === 'reportes' && (
              <>
                <h2 className="mb-4">📈 Reportes</h2>
                <div className="alert alert-info">
                  Funcionalidad de reportes en desarrollo...
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;