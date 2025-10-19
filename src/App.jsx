import { Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';
import { PedidosProvider } from './context/PedidosContext';

import Header from './components/Header';
import Footer from './components/Footer';
import RutaProtegida from './components/RutaProtegida';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import CheckoutExito from './pages/CheckoutExito';
import CheckoutError from './pages/CheckoutError';
import MisPedidos from './pages/MisPedidos';

import './styles/animations.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <PedidosProvider>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            
            <main className="flex-grow-1">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />

                {/* Rutas protegidas */}
                <Route 
                  path="/carrito" 
                  element={
                    <RutaProtegida>
                      <Carrito />
                    </RutaProtegida>
                  } 
                />

                <Route 
                  path="/mis-pedidos" 
                  element={
                    <RutaProtegida>
                      <MisPedidos />
                    </RutaProtegida>
                  } 
                />

                <Route 
                  path="/checkout" 
                  element={
                    <RutaProtegida>
                      <Checkout />
                    </RutaProtegida>
                  } 
                />

                <Route 
                  path="/checkout/exito" 
                  element={
                    <RutaProtegida>
                      <CheckoutExito />
                    </RutaProtegida>
                  } 
                />

                <Route 
                  path="/checkout/error" 
                  element={
                    <RutaProtegida>
                      <CheckoutError />
                    </RutaProtegida>
                  } 
                />

                {/* Ruta solo para administradores */}
                <Route 
                  path="/admin" 
                  element={
                    <RutaProtegida rolesPermitidos={['administrador']}>
                      <Admin />
                    </RutaProtegida>
                  } 
                />
              </Routes> 
            </main>
            
            <Footer />
          </div>
        </PedidosProvider>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;