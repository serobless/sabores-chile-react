import { describe, it, expect } from 'vitest'
import {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
} from './productos'

describe('productos.js', () => {
  describe('obtenerProductos', () => {
    it('debe retornar un array de productos', () => {
      const productos = obtenerProductos()

      expect(Array.isArray(productos)).toBe(true)
      expect(productos.length).toBeGreaterThan(0)
    })

    it('cada producto debe tener las propiedades requeridas', () => {
      const productos = obtenerProductos()
      const primerProducto = productos[0]

      expect(primerProducto).toHaveProperty('id')
      expect(primerProducto).toHaveProperty('nombre')
      expect(primerProducto).toHaveProperty('precio')
      expect(primerProducto).toHaveProperty('categoria')
      expect(primerProducto).toHaveProperty('stock')
    })
  })

  describe('obtenerProductoPorId', () => {
    it('debe retornar null cuando el producto no existe', () => {
      const resultado = obtenerProductoPorId(99999)
      expect(resultado).toBeUndefined()
    })

    it('debe retornar el producto cuando existe', () => {
      const resultado = obtenerProductoPorId(1)

      expect(resultado).toBeDefined()
      expect(resultado.id).toBe(1)
      expect(resultado.nombre).toBe('Empanadas de Pino')
      expect(resultado.categoria).toBe('tipica')
    })
  })

  describe('obtenerProductosPorCategoria', () => {
    it('debe retornar solo productos de la categoría especificada', () => {
      const productos = obtenerProductosPorCategoria('tipica')

      expect(productos.length).toBeGreaterThan(0)
      productos.forEach(producto => {
        expect(producto.categoria).toBe('tipica')
      })
    })

    it('debe retornar array vacío para categoría inexistente', () => {
      const productos = obtenerProductosPorCategoria('categoria_inexistente')
      expect(productos).toEqual([])
    })

    it('debe filtrar correctamente productos de bebidas', () => {
      const bebidas = obtenerProductosPorCategoria('bebidas')

      expect(bebidas.length).toBeGreaterThan(0)
      bebidas.forEach(producto => {
        expect(producto.categoria).toBe('bebidas')
      })
    })
  })

  describe('agregarProducto', () => {
    it('debe agregar un nuevo producto con campos de auditoría', () => {
      const productosIniciales = obtenerProductos()
      const cantidadInicial = productosIniciales.length

      const nuevoProducto = {
        nombre: 'Producto Test',
        descripcion: 'Descripción test',
        precio: 5000,
        categoria: 'tipica',
        stock: 10
      }

      const resultado = agregarProducto(nuevoProducto, 'test_user')

      expect(resultado.id).toBeDefined()
      expect(resultado.nombre).toBe('Producto Test')
      expect(resultado.precio).toBe(5000)
      expect(resultado.autor).toBe('test_user')
      expect(resultado.fechaCreacion).toBeDefined()
      expect(resultado.fechaActualizacion).toBeDefined()
      expect(resultado.ultimoEditor).toBe('test_user')

      const productosFinales = obtenerProductos()
      expect(productosFinales.length).toBe(cantidadInicial + 1)
    })

    it('debe usar admin como autor por defecto si no se especifica', () => {
      const nuevoProducto = {
        nombre: 'Producto Test 2',
        precio: 3000,
        categoria: 'rapida'
      }

      const resultado = agregarProducto(nuevoProducto)

      expect(resultado.autor).toBe('admin')
      expect(resultado.ultimoEditor).toBe('admin')
    })
  })

  describe('actualizarProducto', () => {
    it('debe retornar null cuando el producto no existe', () => {
      const resultado = actualizarProducto(99999, { nombre: 'Test' })
      expect(resultado).toBeNull()
    })

    it('debe actualizar los datos del producto manteniendo campos de auditoría originales', () => {
      const productoOriginal = obtenerProductoPorId(1)
      const datosActualizados = {
        precio: 3000,
        stock: 100
      }

      const resultado = actualizarProducto(1, datosActualizados, 'editor_test')

      expect(resultado.precio).toBe(3000)
      expect(resultado.stock).toBe(100)
      expect(resultado.autor).toBe(productoOriginal.autor) // No debe cambiar
      expect(resultado.fechaCreacion).toBe(productoOriginal.fechaCreacion) // No debe cambiar
      expect(resultado.ultimoEditor).toBe('editor_test')
      expect(resultado.fechaActualizacion).not.toBe(productoOriginal.fechaActualizacion)
    })
  })

  describe('eliminarProducto', () => {
    it('debe retornar null cuando el producto no existe', () => {
      const resultado = eliminarProducto(99999)
      expect(resultado).toBeNull()
    })

    it('debe eliminar el producto y retornar el producto eliminado', () => {
      const productosIniciales = obtenerProductos()
      const cantidadInicial = productosIniciales.length
      const idAEliminar = productosIniciales[productosIniciales.length - 1].id

      const productoEliminado = eliminarProducto(idAEliminar)

      expect(productoEliminado).toBeDefined()
      expect(productoEliminado.id).toBe(idAEliminar)

      const productosFinales = obtenerProductos()
      expect(productosFinales.length).toBe(cantidadInicial - 1)
      expect(obtenerProductoPorId(idAEliminar)).toBeUndefined()
    })
  })
})
