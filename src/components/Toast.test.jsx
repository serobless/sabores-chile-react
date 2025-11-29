import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Toast from './Toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('debe renderizar el mensaje correctamente', () => {
    const onClose = vi.fn()
    render(<Toast message="Producto agregado" onClose={onClose} />)

    expect(screen.getByText(/Producto agregado/i)).toBeInTheDocument()
  })

  it('debe aplicar clase bg-success por defecto', () => {
    const onClose = vi.fn()
    const { container } = render(<Toast message="Test" onClose={onClose} />)

    const toastElement = container.querySelector('.toast')
    expect(toastElement).toHaveClass('bg-success')
  })

  it('debe aplicar clase bg-danger cuando type es error', () => {
    const onClose = vi.fn()
    const { container } = render(<Toast message="Test" onClose={onClose} type="error" />)

    const toastElement = container.querySelector('.toast')
    expect(toastElement).toHaveClass('bg-danger')
  })

  it('debe llamar a onClose cuando se hace clic en el botón de cerrar', () => {
    const onClose = vi.fn()
    render(<Toast message="Test" onClose={onClose} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('debe llamar a onClose automáticamente después de 3 segundos', () => {
    const onClose = vi.fn()
    render(<Toast message="Test" onClose={onClose} />)

    expect(onClose).not.toHaveBeenCalled()

    vi.advanceTimersByTime(3000)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
