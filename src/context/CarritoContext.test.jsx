import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CarritoProvider, useCarrito } from './CarritoContext'

describe('CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>

  describe('agregarAlCarrito', () => {
    it('debe agregar un producto nuevo al carrito', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto = {
        id: 1,
        nombre: 'Empanadas de Pino',
        precio: 2500
      }

      act(() => {
        result.current.agregarAlCarrito(producto, 2)
      })

      expect(result.current.carrito).toHaveLength(1)
      expect(result.current.carrito[0]).toEqual({
        ...producto,
        cantidad: 2
      })
    })

    it('debe incrementar la cantidad si el producto ya existe', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto = {
        id: 1,
        nombre: 'Empanadas de Pino',
        precio: 2500
      }

      act(() => {
        result.current.agregarAlCarrito(producto, 2)
        result.current.agregarAlCarrito(producto, 3)
      })

      expect(result.current.carrito).toHaveLength(1)
      expect(result.current.carrito[0].cantidad).toBe(5)
    })

    it('debe agregar cantidad 1 por defecto', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto = {
        id: 1,
        nombre: 'Empanadas de Pino',
        precio: 2500
      }

      act(() => {
        result.current.agregarAlCarrito(producto)
      })

      expect(result.current.carrito[0].cantidad).toBe(1)
    })
  })

  describe('eliminarDelCarrito', () => {
    it('debe eliminar un producto del carrito', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto = {
        id: 1,
        nombre: 'Empanadas de Pino',
        precio: 2500
      }

      act(() => {
        result.current.agregarAlCarrito(producto, 2)
        result.current.eliminarDelCarrito(1)
      })

      expect(result.current.carrito).toHaveLength(0)
    })
  })

  describe('actualizarCantidad', () => {
    it('debe actualizar la cantidad de un producto', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto = {
        id: 1,
        nombre: 'Empanadas de Pino',
        precio: 2500
      }

      act(() => {
        result.current.agregarAlCarrito(producto, 2)
        result.current.actualizarCantidad(1, 5)
      })

      expect(result.current.carrito[0].cantidad).toBe(5)
    })

    it('debe eliminar el producto si la cantidad es 0 o menor', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto = {
        id: 1,
        nombre: 'Empanadas de Pino',
        precio: 2500
      }

      act(() => {
        result.current.agregarAlCarrito(producto, 2)
        result.current.actualizarCantidad(1, 0)
      })

      expect(result.current.carrito).toHaveLength(0)
    })
  })

  describe('vaciarCarrito', () => {
    it('debe vaciar todo el carrito', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto1 = { id: 1, nombre: 'Producto 1', precio: 1000 }
      const producto2 = { id: 2, nombre: 'Producto 2', precio: 2000 }

      act(() => {
        result.current.agregarAlCarrito(producto1, 2)
        result.current.agregarAlCarrito(producto2, 3)
        result.current.vaciarCarrito()
      })

      expect(result.current.carrito).toHaveLength(0)
    })
  })

  describe('obtenerTotal', () => {
    it('debe calcular el total correctamente', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto1 = { id: 1, nombre: 'Producto 1', precio: 1000 }
      const producto2 = { id: 2, nombre: 'Producto 2', precio: 2000 }

      act(() => {
        result.current.agregarAlCarrito(producto1, 2) // 2000
        result.current.agregarAlCarrito(producto2, 3) // 6000
      })

      expect(result.current.obtenerTotal()).toBe(8000)
    })

    it('debe retornar 0 cuando el carrito está vacío', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      expect(result.current.obtenerTotal()).toBe(0)
    })
  })

  describe('obtenerSubtotal', () => {
    it('debe calcular el subtotal sin IVA (total / 1.19)', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto = { id: 1, nombre: 'Producto 1', precio: 1190 }

      act(() => {
        result.current.agregarAlCarrito(producto, 1)
      })

      const subtotal = result.current.obtenerSubtotal()
      expect(subtotal).toBe(1000) // 1190 / 1.19 = 1000
    })
  })

  describe('obtenerIVA', () => {
    it('debe calcular el IVA (total - subtotal)', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto = { id: 1, nombre: 'Producto 1', precio: 1190 }

      act(() => {
        result.current.agregarAlCarrito(producto, 1)
      })

      const iva = result.current.obtenerIVA()
      const total = result.current.obtenerTotal()
      const subtotal = result.current.obtenerSubtotal()

      expect(iva).toBe(total - subtotal)
      expect(iva).toBe(190) // 1190 - 1000 = 190
    })
  })

  describe('obtenerCantidadTotal', () => {
    it('debe sumar la cantidad total de todos los productos', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      const producto1 = { id: 1, nombre: 'Producto 1', precio: 1000 }
      const producto2 = { id: 2, nombre: 'Producto 2', precio: 2000 }

      act(() => {
        result.current.agregarAlCarrito(producto1, 2)
        result.current.agregarAlCarrito(producto2, 3)
      })

      expect(result.current.obtenerCantidadTotal()).toBe(5)
    })

    it('debe retornar 0 cuando el carrito está vacío', () => {
      const { result } = renderHook(() => useCarrito(), { wrapper })

      expect(result.current.obtenerCantidadTotal()).toBe(0)
    })
  })
})
