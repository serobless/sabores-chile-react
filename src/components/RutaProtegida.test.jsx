import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RutaProtegida from './RutaProtegida'
import * as AuthContext from '../context/AuthContext'

// Mock del hook useAuth
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn()
}))

// Wrapper para proporcionar el router context
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('RutaProtegida', () => {
  it('debe mostrar spinner cuando está cargando', () => {
    AuthContext.useAuth.mockReturnValue({
      usuario: null,
      estaAutenticado: false,
      cargando: true
    })

    render(
      <RouterWrapper>
        <RutaProtegida>
          <div>Contenido protegido</div>
        </RutaProtegida>
      </RouterWrapper>
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument()
    expect(screen.queryByText(/Contenido protegido/i)).not.toBeInTheDocument()
  })

  it('debe redirigir a /login cuando no está autenticado', () => {
    AuthContext.useAuth.mockReturnValue({
      usuario: null,
      estaAutenticado: false,
      cargando: false
    })

    render(
      <RouterWrapper>
        <RutaProtegida>
          <div>Contenido protegido</div>
        </RutaProtegida>
      </RouterWrapper>
    )

    // Navigate no renderiza nada, por lo que el contenido protegido no debe aparecer
    expect(screen.queryByText(/Contenido protegido/i)).not.toBeInTheDocument()
  })

  it('debe renderizar children cuando el usuario está autenticado', () => {
    AuthContext.useAuth.mockReturnValue({
      usuario: { id: 1, nombre: 'Test User', rol: 'cliente' },
      estaAutenticado: true,
      cargando: false
    })

    render(
      <RouterWrapper>
        <RutaProtegida>
          <div>Contenido protegido</div>
        </RutaProtegida>
      </RouterWrapper>
    )

    expect(screen.getByText(/Contenido protegido/i)).toBeInTheDocument()
  })

  it('debe renderizar children cuando el usuario tiene el rol permitido', () => {
    AuthContext.useAuth.mockReturnValue({
      usuario: { id: 1, nombre: 'Admin User', rol: 'administrador' },
      estaAutenticado: true,
      cargando: false
    })

    render(
      <RouterWrapper>
        <RutaProtegida rolesPermitidos={['administrador', 'empleado']}>
          <div>Panel de administración</div>
        </RutaProtegida>
      </RouterWrapper>
    )

    expect(screen.getByText(/Panel de administración/i)).toBeInTheDocument()
  })

  it('debe mostrar mensaje de acceso denegado cuando el usuario no tiene el rol permitido', () => {
    AuthContext.useAuth.mockReturnValue({
      usuario: { id: 1, nombre: 'Cliente', rol: 'cliente' },
      estaAutenticado: true,
      cargando: false
    })

    render(
      <RouterWrapper>
        <RutaProtegida rolesPermitidos={['administrador']}>
          <div>Panel de administración</div>
        </RutaProtegida>
      </RouterWrapper>
    )

    expect(screen.getByText(/Acceso Denegado/i)).toBeInTheDocument()
    expect(screen.getByText(/No tienes permisos para acceder a esta página/i)).toBeInTheDocument()
    expect(screen.queryByText(/Panel de administración/i)).not.toBeInTheDocument()
  })
})
