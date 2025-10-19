const Contacto = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">Contacto</h1>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title mb-4">Información de Contacto</h4>
              
              <div className="mb-3">
                <strong>📍 Dirección:</strong>
                <p className="mb-0">Av. Providencia 1234, Santiago</p>
              </div>
              
              <div className="mb-3">
                <strong>📞 Teléfono:</strong>
                <p className="mb-0">+56 2 2345 6789</p>
              </div>
              
              <div className="mb-3">
                <strong>✉️ Email:</strong>
                <p className="mb-0">info@saboresdechile.cl</p>
              </div>
              
              <div className="mb-3">
                <strong>⏰ Horarios:</strong>
                <p className="mb-0">Lunes a Viernes: 11:00 - 23:00</p>
                <p className="mb-0">Sábados: 12:00 - 24:00</p>
                <p className="mb-0">Domingos: 12:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title mb-4">Envíanos un Mensaje</h4>
              
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" required />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" required />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Mensaje</label>
                  <textarea className="form-control" rows="4" required></textarea>
                </div>
                
                <button type="submit" className="btn btn-danger w-100">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;