const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-danger">Contacto</h5>
            <p>📍 Av. Providencia 1234, Santiago</p>
            <p>📞 +56 2 2345 6789</p>
            <p>✉️ info@saboresdechile.cl</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="text-danger">Horarios</h5>
            <p>Lunes a Viernes: 11:00 - 23:00</p>
            <p>Sábados: 12:00 - 24:00</p>
            <p>Domingos: 12:00 - 22:00</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="text-danger">Síguenos</h5>
            <p>Facebook | Instagram | Twitter</p>
          </div>
        </div>
        <div className="text-center pt-3 border-top border-secondary">
          <p>&copy; 2025 Sabores de Chile. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;