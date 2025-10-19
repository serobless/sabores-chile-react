import { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, registro as registroService, logout as logoutService, obtenerUsuarioActual } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cargar usuario al iniciar
    const usuarioGuardado = obtenerUsuarioActual();
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    setCargando(false);
  }, []);

  const login = (email, password) => {
    const resultado = loginService(email, password);
    
    if (resultado.success) {
      setUsuario(resultado.usuario);
      return { success: true };
    }
    
    return { error: resultado.error };
  };

  const registro = (datosUsuario) => {
    const resultado = registroService(datosUsuario);
    
    if (resultado.success) {
      setUsuario(resultado.usuario);
      return { success: true };
    }
    
    return { error: resultado.error };
  };

  const logout = () => {
    logoutService();
    setUsuario(null);
  };

  const value = {
    usuario,
    login,
    registro,
    logout,
    estaAutenticado: usuario !== null,
    cargando
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};