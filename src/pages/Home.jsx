import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../data/productos';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const productos = obtenerProductos();
  const productosDestacados = productos.slice(0, 3);
  const [slideActual, setSlideActual] = useState(0);

  // Imágenes del carrusel
  const imagenesCarrusel = [
    {
      src: '/imagenes/norte1.jpg',
      titulo: 'Sabores del Norte',
      subtitulo: 'Descubre la gastronomía del desierto chileno'
    },
    {
      src: '/imagenes/costanera.jpg',
      titulo: 'Santiago, Corazón de Chile',
      subtitulo: 'Comida típica y rápida en la capital'
    },
    {
      src: '/imagenes/valparaiso.jpg',
      titulo: 'Sabores del Puerto',
      subtitulo: 'La esencia marinera de Valparaíso'
    },
    {
      src: '/imagenes/cordillera.jpg',
      titulo: 'De la Cordillera a tu Mesa',
      subtitulo: 'Ingredientes frescos de la montaña'
    },
    {
      src: '/imagenes/rapanui.jpg',
      titulo: 'Rapa Nui',
      subtitulo: 'Sabores únicos de Nuestro País'
    },
    {
      src: '/imagenes/torresdelpaine.jpg',
      titulo: 'Patagonia Chilena',
      subtitulo: 'Los sabores del fin del mundo'
    }
  ];

  // Cambio automático de slide cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % imagenesCarrusel.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [imagenesCarrusel.length]);

  const irASlideSiguiente = () => {
    setSlideActual((prev) => (prev + 1) % imagenesCarrusel.length);
  };

  const irASlideAnterior = () => {
    setSlideActual((prev) => (prev - 1 + imagenesCarrusel.length) % imagenesCarrusel.length);
  };

  const irASlide = (index) => {
    setSlideActual(index);
  };

  return (
    <div>
      {/* Carrusel Hero */}
      <section className="position-relative" style={{ height: '80vh', overflow: 'hidden' }}>
        {imagenesCarrusel.map((imagen, index) => (
          <div
            key={index}
            className={`position-absolute w-100 h-100 transition-opacity ${
              index === slideActual ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transition: 'opacity 1s ease-in-out',
              zIndex: index === slideActual ? 1 : 0
            }}
          >
            {/* Imagen de fondo */}
            <div
              className="w-100 h-100"
              style={{
                backgroundImage: `url(${imagen.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />

            {/* Overlay oscuro */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 }}
            />

            {/* Contenido del slide */}
            <div
              className="position-absolute top-50 start-50 translate-middle text-center text-white"
              style={{ zIndex: 2, width: '90%', maxWidth: '800px' }}
            >
              <h1 className="display-3 fw-bold mb-3" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
                {imagen.titulo}
              </h1>
              <p className="lead fs-4 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                {imagen.subtitulo}
              </p>
              <Link to="/menu" className="btn btn-danger btn-lg px-5 py-3">
                Ver Menú Completo
              </Link>
            </div>
          </div>
        ))}

        {/* Botones de navegación */}
        <button
          className="position-absolute top-50 start-0 translate-middle-y btn btn-dark btn-lg ms-3"
          style={{ zIndex: 10, opacity: 0.7 }}
          onClick={irASlideAnterior}
        >
          ‹
        </button>
        <button
          className="position-absolute top-50 end-0 translate-middle-y btn btn-dark btn-lg me-3"
          style={{ zIndex: 10, opacity: 0.7 }}
          onClick={irASlideSiguiente}
        >
          ›
        </button>

        {/* Indicadores */}
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2"
          style={{ zIndex: 10 }}
        >
          {imagenesCarrusel.map((_, index) => (
            <button
              key={index}
              className={`rounded-circle border-0 ${
                index === slideActual ? 'bg-danger' : 'bg-white'
              }`}
              style={{
                width: '12px',
                height: '12px',
                opacity: index === slideActual ? 1 : 0.5,
                cursor: 'pointer'
              }}
              onClick={() => irASlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Nuestros Destacados</h2>
          <div className="row g-4">
            {productosDestacados.map(producto => (
              <div key={producto.id} className="col-md-4">
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/menu" className="btn btn-outline-danger btn-lg">
              Ver Todos los Productos →
            </Link>
          </div>
        </div>
      </section>

      {/* Sección Info */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="fs-1 mb-3">🚚</div>
              <h4>Entrega Rápida</h4>
              <p className="text-muted">En 30-45 minutos promedio</p>
            </div>
            <div className="col-md-4 mb-4">
              <div className="fs-1 mb-3">🥘</div>
              <h4>Recetas Tradicionales</h4>
              <p className="text-muted">Sabor casero auténtico</p>
            </div>
            <div className="col-md-4 mb-4">
              <div className="fs-1 mb-3">⭐</div>
              <h4>Calidad Garantizada</h4>
              <p className="text-muted">Ingredientes frescos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;