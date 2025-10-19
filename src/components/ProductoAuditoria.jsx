const ProductoAuditoria = ({ producto, mostrarCompleto = false }) => {
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return 'N/A';
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calcularTiempoTranscurrido = (fechaISO) => {
    if (!fechaISO) return '';
    const ahora = new Date();
    const fecha = new Date(fechaISO);
    const diff = ahora - fecha;
    
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    
    if (dias > 0) return `hace ${dias} día${dias > 1 ? 's' : ''}`;
    if (horas > 0) return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
    if (minutos > 0) return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    return 'recién';
  };

  if (!mostrarCompleto) {
    // Versión compacta para tarjetas de productos
    return (
      <div className="text-muted small mt-2 border-top pt-2">
        <div className="d-flex justify-content-between align-items-center">
          <span>
            👤 <strong>{producto.autor || 'N/A'}</strong>
          </span>
          <span className="badge bg-secondary">
            {calcularTiempoTranscurrido(producto.fechaActualizacion)}
          </span>
        </div>
      </div>
    );
  }

  // Versión completa para detalles o admin
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header bg-light">
        <h6 className="mb-0">📊 Información de Auditoría</h6>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <small className="text-muted d-block">Creado por:</small>
            <strong>👤 {producto.autor || 'N/A'}</strong>
          </div>

          <div className="col-md-6">
            <small className="text-muted d-block">Fecha de creación:</small>
            <strong>📅 {formatearFecha(producto.fechaCreacion)}</strong>
          </div>

          <div className="col-md-6">
            <small className="text-muted d-block">Última modificación por:</small>
            <strong>✏️ {producto.ultimoEditor || producto.autor || 'N/A'}</strong>
          </div>

          <div className="col-md-6">
            <small className="text-muted d-block">Última actualización:</small>
            <div>
              <strong>🕐 {formatearFecha(producto.fechaActualizacion)}</strong>
              <span className="badge bg-info ms-2">
                {calcularTiempoTranscurrido(producto.fechaActualizacion)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Alerta si fue modificado recientemente */}
        {calcularTiempoTranscurrido(producto.fechaActualizacion).includes('minuto') && (
          <div className="alert alert-warning mt-3 mb-0">
            <small>⚠️ Este producto fue modificado recientemente</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoAuditoria;