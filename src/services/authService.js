// src/services/authService.js

import { validarCredenciales, registrarUsuario } from '../data/usuarios';

// Simulación simple de JWT (en producción usarías jsonwebtoken real)
const generarToken = (usuario) => {
  const payload = {
    id: usuario.id,
    email: usuario.email,
    rol: usuario.rol,
    nombre: usuario.nombre
  };
  
  // En producción: jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
  // Por ahora simulamos con base64
  return btoa(JSON.stringify(payload));
};

const decodificarToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    return null;
  }
};

export const login = (email, password) => {
  const usuario = validarCredenciales(email, password);
  
  if (!usuario) {
    return { error: "Credenciales incorrectas" };
  }
  
  const token = generarToken(usuario);
  
  // Guardar en localStorage
  localStorage.setItem('authToken', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  
  return {
    usuario,
    token,
    success: true
  };
};

export const registro = (datosUsuario) => {
  const resultado = registrarUsuario(datosUsuario);
  
  if (resultado.error) {
    return resultado;
  }
  
  const token = generarToken(resultado);
  
  localStorage.setItem('authToken', token);
  localStorage.setItem('usuario', JSON.stringify(resultado));
  
  return {
    usuario: resultado,
    token,
    success: true
  };
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('usuario');
};

export const obtenerUsuarioActual = () => {
  const usuarioStr = localStorage.getItem('usuario');
  return usuarioStr ? JSON.parse(usuarioStr) : null;
};

export const estaAutenticado = () => {
  const token = localStorage.getItem('authToken');
  return token !== null;
};

export const verificarRol = (rolesPermitidos) => {
  const usuario = obtenerUsuarioActual();
  if (!usuario) return false;
  return rolesPermitidos.includes(usuario.rol);
};