// src/data/usuarios.js

let usuariosData = [
  {
    id: 1,
    nombre: "Admin Principal",
    email: "admin@saboresdechile.cl",
    password: "admin123", // En producción esto estaría hasheado
    rol: "administrador",
    telefono: "+56912345678",
    direccion: "Av. Providencia 1234, Santiago",
    fechaRegistro: "2024-01-01T10:00:00Z"
  },
  {
    id: 2,
    nombre: "María González",
    email: "maria@email.com",
    password: "cliente123",
    rol: "cliente",
    telefono: "+56987654321",
    direccion: "Los Leones 456, Santiago",
    fechaRegistro: "2024-02-15T14:30:00Z"
  },
  {
    id: 3,
    nombre: "Pedro Empleado",
    email: "empleado@saboresdechile.cl",
    password: "empleado123",
    rol: "empleado",
    telefono: "+56911223344",
    direccion: "Av. Apoquindo 789, Las Condes",
    fechaRegistro: "2024-01-10T09:00:00Z"
  }
];

// ========== FUNCIONES DE AUTENTICACIÓN ==========

export const validarCredenciales = (email, password) => {
  const usuario = usuariosData.find(
    u => u.email === email && u.password === password
  );
  
  if (usuario) {
    // No retornar la contraseña
    const { password, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }
  
  return null;
};

export const registrarUsuario = (datosUsuario) => {
  // Verificar si el email ya existe
  const emailExiste = usuariosData.some(u => u.email === datosUsuario.email);
  
  if (emailExiste) {
    return { error: "El email ya está registrado" };
  }
  
  const nuevoUsuario = {
    id: usuariosData.length + 1,
    ...datosUsuario,
    rol: "cliente", // Los nuevos usuarios son clientes por defecto
    fechaRegistro: new Date().toISOString()
  };
  
  usuariosData.push(nuevoUsuario);
  
  const { password, ...usuarioSinPassword } = nuevoUsuario;
  return usuarioSinPassword;
};

export const obtenerUsuarioPorId = (id) => {
  const usuario = usuariosData.find(u => u.id === id);
  if (usuario) {
    const { password, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }
  return null;
};

export const actualizarUsuario = (id, datosActualizados) => {
  const index = usuariosData.findIndex(u => u.id === id);
  
  if (index !== -1) {
    usuariosData[index] = {
      ...usuariosData[index],
      ...datosActualizados
    };
    
    const { password, ...usuarioSinPassword } = usuariosData[index];
    return usuarioSinPassword;
  }
  
  return null;
};

export const obtenerTodosUsuarios = () => {
  return usuariosData.map(({ password, ...usuario }) => usuario);
};