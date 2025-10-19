import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ModalProducto = ({ show, onClose, onSave, productoEditar = null }) => {
  const { usuario } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: 'tipica',
    emoji: '🍽️',
    stock: '',
    unidadVenta: 'unidad',
    tiempoPreparacion: '',
    ingredientes: '',
    informacionEnvio: '',
    empresaEnvio: 'Sabores Express',
    personalizable: false,
    fechaVencimiento: null
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoEditar) {
      setFormData({
        ...productoEditar,
        ingredientes: productoEditar.ingredientes.join(', ')
      });
    } else {
      // Reset form
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: 'tipica',
        emoji: '🍽️',
        stock: '',
        unidadVenta: 'unidad',
        tiempoPreparacion: '',
        ingredientes: '',
        informacionEnvio: '',
        empresaEnvio: 'Sabores Express',
        personalizable: false,
        fechaVencimiento: null
      });
      setErrores({});
    }
  }, [productoEditar, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es requerido';
    if (!formData.descripcion.trim()) nuevosErrores.descripcion = 'La descripción es requerida';
    if (!formData.precio || formData.precio <= 0) nuevosErrores.precio = 'El precio debe ser mayor a 0';
    if (!formData.stock || formData.stock < 0) nuevosErrores.stock = 'El stock no puede ser negativo';
    if (!formData.tiempoPreparacion.trim()) nuevosErrores.tiempoPreparacion = 'El tiempo de preparación es requerido';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const productoGuardar = {
      ...formData,
      precio: parseInt(formData.precio),
      stock: parseInt(formData.stock),
      ingredientes: formData.ingredientes.split(',').map(i => i.trim()),
      autor: productoEditar ? productoEditar.autor : usuario.email.split('@')[0],
      fechaCreacion: productoEditar ? productoEditar.fechaCreacion : new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
      ultimoEditor: usuario.email.split('@')[0],
      imagen: "/sabores-chile-react/imagenes/placeholder.jpg" // Placeholder por ahora
    };

    onSave(productoGuardar);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {productoEditar ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Nombre */}
                <div className="col-md-8 mb-3">
                  <label className="form-label">Nombre del Producto *</label>
                  <input
                    type="text"
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Empanadas de Pino"
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>

                {/* Emoji */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Emoji</label>
                  <input
                    type="text"
                    className="form-control text-center"
                    style={{ fontSize: '2rem' }}
                    name="emoji"
                    value={formData.emoji}
                    onChange={handleChange}
                    maxLength="2"
                  />
                </div>

                {/* Descripción */}
                <div className="col-12 mb-3">
                  <label className="form-label">Descripción *</label>
                  <textarea
                    className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe el producto..."
                  ></textarea>
                  {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
                </div>

                {/* Precio */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Precio (CLP) *</label>
                  <input
                    type="number"
                    className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    placeholder="2500"
                  />
                  {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                </div>

                {/* Stock */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Stock *</label>
                  <input
                    type="number"
                    className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="50"
                  />
                  {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
                </div>

                {/* Categoría */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Categoría *</label>
                  <select
                    className="form-select"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                  >
                    <option value="tipica">Comida Típica</option>
                    <option value="rapida">Comida Rápida</option>
                    <option value="bebidas">Bebidas</option>
                  </select>
                </div>

                {/* Unidad de Venta */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Unidad de Venta</label>
                  <input
                    type="text"
                    className="form-control"
                    name="unidadVenta"
                    value={formData.unidadVenta}
                    onChange={handleChange}
                    placeholder="unidad, porción, vaso, kg"
                  />
                </div>

                {/* Tiempo de Preparación */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tiempo de Preparación *</label>
                  <input
                    type="text"
                    className={`form-control ${errores.tiempoPreparacion ? 'is-invalid' : ''}`}
                    name="tiempoPreparacion"
                    value={formData.tiempoPreparacion}
                    onChange={handleChange}
                    placeholder="20 minutos"
                  />
                  {errores.tiempoPreparacion && <div className="invalid-feedback">{errores.tiempoPreparacion}</div>}
                </div>

                {/* Ingredientes */}
                <div className="col-12 mb-3">
                  <label className="form-label">Ingredientes (separados por coma)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ingredientes"
                    value={formData.ingredientes}
                    onChange={handleChange}
                    placeholder="masa, carne, cebolla, huevo"
                  />
                </div>

                {/* Información de Envío */}
                <div className="col-md-8 mb-3">
                  <label className="form-label">Información de Envío</label>
                  <input
                    type="text"
                    className="form-control"
                    name="informacionEnvio"
                    value={formData.informacionEnvio}
                    onChange={handleChange}
                    placeholder="Entrega en 30-45 minutos"
                  />
                </div>

                {/* Empresa de Envío */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Empresa Envío</label>
                  <select
                    className="form-select"
                    name="empresaEnvio"
                    value={formData.empresaEnvio}
                    onChange={handleChange}
                  >
                    <option value="Sabores Express">Sabores Express</option>
                    <option value="Rappi">Rappi</option>
                    <option value="Uber Eats">Uber Eats</option>
                    <option value="Pedidos Ya">Pedidos Ya</option>
                    <option value="Cornershop">Cornershop</option>
                  </select>
                </div>

                {/* Personalizable */}
                <div className="col-12 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="personalizable"
                      checked={formData.personalizable}
                      onChange={handleChange}
                      id="personalizable"
                    />
                    <label className="form-check-label" htmlFor="personalizable">
                      ¿Es personalizable?
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={handleSubmit}>
              {productoEditar ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProducto;