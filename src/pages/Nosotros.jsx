const Nosotros = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold text-center">Sobre Nosotros</h1>
      
      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <h3 className="text-danger mb-3">Nuestra Historia</h3>
          <p className="text-muted">
            Sabores de Chile nació del amor por la comida tradicional chilena y el deseo 
            de compartir estos sabores auténticos con todos. Desde 2020, hemos estado 
            preparando los mejores platos típicos y comida rápida con ese toque casero 
            que nos caracteriza.
          </p>
          <p className="text-muted">
            Cada receta es preparada con ingredientes frescos y el cariño de la 
            cocina chilena tradicional.
          </p>
        </div>
        
        <div className="col-md-6 mb-4">
          <h3 className="text-danger mb-3">Nuestra Misión</h3>
          <p className="text-muted">
            Llevar los sabores auténticos de Chile a tu mesa, manteniendo la calidad 
            y el sabor casero que nos caracteriza. Trabajamos con proveedores locales 
            y nos aseguramos de que cada plato sea una experiencia memorable.
          </p>
        </div>
      </div>
      
      <div className="bg-light p-5 rounded">
        <h3 className="text-center mb-4 text-danger">Nuestros Valores</h3>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="fs-1 mb-3">🥘</div>
            <h5>Calidad</h5>
            <p className="text-muted">Ingredientes frescos y de primera</p>
          </div>
          <div className="col-md-4 mb-3">
            <div className="fs-1 mb-3">❤️</div>
            <h5>Pasión</h5>
            <p className="text-muted">Amor por la cocina chilena</p>
          </div>
          <div className="col-md-4 mb-3">
            <div className="fs-1 mb-3">🚚</div>
            <h5>Servicio</h5>
            <p className="text-muted">Entrega rápida y confiable</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;