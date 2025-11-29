import { describe, it, expect } from 'vitest'
import {
  validarCredenciales,
  registrarUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  obtenerTodosUsuarios
} from './usuarios'

describe('usuarios.js', () => {
  describe('validarCredenciales', () => {
    it('debe retornar null cuando las credenciales son incorrectas', () => {
      const resultado = validarCredenciales('noexiste@test.com', 'wrongpass')
      expect(resultado).toBeNull()
    })

    it('debe retornar usuario sin password cuando las credenciales son correctas', () => {
      const resultado = validarCredenciales('admin@saboresdechile.cl', 'admin123')

      expect(resultado).toBeDefined()
      expect(resultado.email).toBe('admin@saboresdechile.cl')
      expect(resultado.rol).toBe('administrador')
      expect(resultado.password).toBeUndefined()
    })

    it('debe retornar null cuando el email es correcto pero password incorrecto', () => {
      const resultado = validarCredenciales('admin@saboresdechile.cl', 'wrongpass')
      expect(resultado).toBeNull()
    })
  })

  describe('registrarUsuario', () => {
    it('debe retornar error cuando el email ya existe', () => {
      const resultado = registrarUsuario({
        nombre: 'Test User',
        email: 'admin@saboresdechile.cl', // Email existente
        password: 'test123'
      })

      expect(resultado.error).toBe('El email ya está registrado')
    })

    it('debe registrar un nuevo usuario con rol cliente por defecto', () => {
      const nuevoUsuario = {
        nombre: 'Nuevo Usuario',
        email: 'nuevo@test.com',
        password: 'pass123',
        telefono: '+56912345678',
        direccion: 'Test 123'
      }

      const resultado = registrarUsuario(nuevoUsuario)

      expect(resultado.error).toBeUndefined()
      expect(resultado.email).toBe('nuevo@test.com')
      expect(resultado.nombre).toBe('Nuevo Usuario')
      expect(resultado.rol).toBe('cliente')
      expect(resultado.password).toBeUndefined() // No debe retornar password
      expect(resultado.id).toBeDefined()
      expect(resultado.fechaRegistro).toBeDefined()
    })
  })

  describe('obtenerUsuarioPorId', () => {
    it('debe retornar null cuando el usuario no existe', () => {
      const resultado = obtenerUsuarioPorId(9999)
      expect(resultado).toBeNull()
    })

    it('debe retornar usuario sin password cuando existe', () => {
      const resultado = obtenerUsuarioPorId(1)

      expect(resultado).toBeDefined()
      expect(resultado.id).toBe(1)
      expect(resultado.email).toBe('admin@saboresdechile.cl')
      expect(resultado.password).toBeUndefined()
    })
  })

  describe('actualizarUsuario', () => {
    it('debe retornar null cuando el usuario no existe', () => {
      const resultado = actualizarUsuario(9999, { nombre: 'Test' })
      expect(resultado).toBeNull()
    })

    it('debe actualizar los datos del usuario', () => {
      const datosActualizados = {
        nombre: 'Admin Actualizado',
        telefono: '+56999999999'
      }

      const resultado = actualizarUsuario(1, datosActualizados)

      expect(resultado).toBeDefined()
      expect(resultado.nombre).toBe('Admin Actualizado')
      expect(resultado.telefono).toBe('+56999999999')
      expect(resultado.email).toBe('admin@saboresdechile.cl') // Mantiene datos originales
      expect(resultado.password).toBeUndefined()
    })
  })

  describe('obtenerTodosUsuarios', () => {
    it('debe retornar todos los usuarios sin passwords', () => {
      const usuarios = obtenerTodosUsuarios()

      expect(usuarios.length).toBeGreaterThan(0)

      usuarios.forEach(usuario => {
        expect(usuario.password).toBeUndefined()
        expect(usuario.id).toBeDefined()
        expect(usuario.email).toBeDefined()
        expect(usuario.nombre).toBeDefined()
      })
    })

    it('debe incluir los usuarios por defecto del sistema', () => {
      const usuarios = obtenerTodosUsuarios()
      const emails = usuarios.map(u => u.email)

      expect(emails).toContain('admin@saboresdechile.cl')
      expect(emails).toContain('maria@email.com')
      expect(emails).toContain('empleado@saboresdechile.cl')
    })
  })
})
