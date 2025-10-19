import { useState } from 'react';
import { obtenerProductos, obtenerProductosPorCategoria } from '../data/productos';
import ProductCard from '../components/ProductCard';

const Menu = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  
  const productos = categoriaActiva === 'todos' 
    ? obtenerProductos() 
    : obtenerProductosPorCategoria(categoriaActiva);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">Nuestro Menú</h1>
      
      {/* Tabs de Categorías */}
      <div className="d-flex justify-content-center mb-5 flex-wrap gap-2">
        <button 
          className={`btn category-tab ${categoriaActiva === 'todos' ? 'btn-danger active' : 'btn-outline-danger'}`}
          onClick={() => setCategoriaActiva('todos')}
        >
          Todos
        </button>
        <button 
          className={`btn category-tab ${categoriaActiva === 'tipica' ? 'btn-danger active' : 'btn-outline-danger'}`}
          onClick={() => setCategoriaActiva('tipica')}
        >
          Comida Típica
        </button>
        <button 
          className={`btn category-tab ${categoriaActiva === 'rapida' ? 'btn-danger active' : 'btn-outline-danger'}`}
          onClick={() => setCategoriaActiva('rapida')}
        >
          Comida Rápida
        </button>
        <button 
          className={`btn category-tab ${categoriaActiva === 'bebidas' ? 'btn-danger active' : 'btn-outline-danger'}`}
          onClick={() => setCategoriaActiva('bebidas')}
        >
          Bebidas
        </button>
        <button 
          className={`btn category-tab ${categoriaActiva === 'postres' ? 'btn-danger active' : 'btn-outline-danger'}`}
          onClick={() => setCategoriaActiva('postres')}
        >
          🍰 Postres
        </button>
      </div>

      {/* Grid de Productos */}
      <div className="row g-4">
        {productos.map(producto => (
          <div key={producto.id} className="col-md-6 col-lg-4">
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>

      {productos.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No hay productos en esta categoría</p>
        </div>
      )}
    </div>
  );
};

export default Menu;