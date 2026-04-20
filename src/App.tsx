import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Prices from './pages/Prices';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre-mi" element={<About />} />
          <Route path="servicios" element={<Services />} />
          <Route path="precios" element={<Prices />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="reserva" element={<Booking />} />
        </Route>
      </Routes>
    </Router>
  );
}
