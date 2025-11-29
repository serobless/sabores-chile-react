import { describe, it, expect, beforeEach, vi } from 'vitest'
import { login, registro, logout, obtenerUsuarioActual, estaAutenticado, verificarRol } from './authService'
import * as usuarios from '../data/usuarios'

// Mock de las funciones de usuarios
vi.mock('../data/usuarios', () => ({
  validarCredenciales: vi.fn(),
  registrarUsuario: vi.fn()
}))

describe('authService', () => {
  beforeEach(() => {
    // Limpiar localStorage usando la API real de happy-dom
    window.localStorage.clear()
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('debe retornar error cuando las credenciales son incorrectas', () => {
      usuarios.validarCredenciales.mockReturnValue(null)

      const resultado = login('test@test.com', 'wrongpass')

      expect(resultado).toEqual({ error: "Credenciales incorrectas" })
      // Verificar que no se guardó nada en localStorage
      expect(localStorage.getItem('authToken')).toBeNull()
      expect(localStorage.getItem('usuario')).toBeNull()
    })

    it('debe retornar usuario y token cuando las credenciales son correctas', () => {
      const usuarioMock = {
        id: 1,
        email: 'test@test.com',
        nombre: 'Test User',
        rol: 'cliente'
      }
      usuarios.validarCredenciales.mockReturnValue(usuarioMock)

      const resultado = login('test@test.com', 'correctpass')

      expect(resultado.success).toBe(true)
      expect(resultado.usuario).toEqual(usuarioMock)
      expect(resultado.token).toBeDefined()
      // Verificar que se guardó en localStorage
      expect(localStorage.getItem('authToken')).toBeTruthy()
      expect(localStorage.getItem('usuario')).toBeTruthy()
    })
  })

  describe('registro', () => {
    it('debe retornar error cuando el registro falla', () => {
      const errorMock = { error: 'El email ya está registrado' }
      usuarios.registrarUsuario.mockReturnValue(errorMock)

      const resultado = registro({ email: 'test@test.com', password: 'pass123' })

      expect(resultado).toEqual(errorMock)
      // Verificar que no se guardó nada en localStorage
      expect(localStorage.getItem('authToken')).toBeNull()
    })

    it('debe registrar usuario exitosamente y guardar en localStorage', () => {
      const nuevoUsuario = {
        id: 2,
        email: 'nuevo@test.com',
        nombre: 'Nuevo Usuario',
        rol: 'cliente'
      }
      usuarios.registrarUsuario.mockReturnValue(nuevoUsuario)

      const resultado = registro({ email: 'nuevo@test.com', password: 'pass123' })

      expect(resultado.success).toBe(true)
      expect(resultado.usuario).toEqual(nuevoUsuario)
      expect(resultado.token).toBeDefined()
      // Verificar que se guardó en localStorage
      expect(localStorage.getItem('authToken')).toBeTruthy()
    })
  })

  describe('logout', () => {
    it('debe eliminar token y usuario del localStorage', () => {
      localStorage.setItem('authToken', 'fake-token')
      localStorage.setItem('usuario', '{"id":1}')

      logout()

      expect(localStorage.getItem('authToken')).toBeNull()
      expect(localStorage.getItem('usuario')).toBeNull()
    })
  })

  describe('obtenerUsuarioActual', () => {
    it('debe retornar null cuando no hay usuario en localStorage', () => {
      const resultado = obtenerUsuarioActual()
      expect(resultado).toBeNull()
    })

    it('debe retornar el usuario almacenado en localStorage', () => {
      const usuario = { id: 1, email: 'test@test.com', nombre: 'Test' }
      localStorage.setItem('usuario', JSON.stringify(usuario))

      const resultado = obtenerUsuarioActual()

      expect(resultado).toEqual(usuario)
    })
  })

  describe('estaAutenticado', () => {
    it('debe retornar false cuando no hay token', () => {
      const resultado = estaAutenticado()
      expect(resultado).toBe(false)
    })

    it('debe retornar true cuando hay token', () => {
      localStorage.setItem('authToken', 'fake-token')

      const resultado = estaAutenticado()

      expect(resultado).toBe(true)
    })
  })

  describe('verificarRol', () => {
    it('debe retornar false cuando no hay usuario autenticado', () => {
      const resultado = verificarRol(['administrador'])
      expect(resultado).toBe(false)
    })

    it('debe retornar true cuando el usuario tiene el rol permitido', () => {
      const usuario = { id: 1, rol: 'administrador' }
      localStorage.setItem('usuario', JSON.stringify(usuario))

      const resultado = verificarRol(['administrador', 'empleado'])

      expect(resultado).toBe(true)
    })

    it('debe retornar false cuando el usuario no tiene el rol permitido', () => {
      const usuario = { id: 1, rol: 'cliente' }
      localStorage.setItem('usuario', JSON.stringify(usuario))

      const resultado = verificarRol(['administrador'])

      expect(resultado).toBe(false)
    })
  })
})
