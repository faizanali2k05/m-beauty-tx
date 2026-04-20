import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { name: 'Inicio', path: '/' },
  { name: 'Sobre Mí', path: '/sobre-mi' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Precios', path: '/precios' },
  { name: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 bg-black/40 backdrop-blur-md border-b border-white/5 shadow-lg',
        isScrolled ? 'py-2' : 'py-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 md:gap-4 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gold flex items-center justify-center bg-black overflow-hidden group-hover:border-white group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500"
          >
             <img 
               src="https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/9a761951-0cc1-46d3-acf2-86af17f84816_ARTs-01---IMAGEN-DE-PERFIL-.webp" 
               alt="Logo" 
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
             />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-sm md:text-lg font-serif tracking-[0.2em] text-gold uppercase transition-all whitespace-nowrap">M BEAUTY TX</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-[10px] uppercase tracking-[0.3em] hover:text-gold transition-colors relative group font-bold',
                location.pathname === link.path ? 'text-gold' : 'text-gray-400'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/reserva"
            className="bg-gold hover:bg-gold-dark text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            Reservar
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gold p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-gold-900/40 p-8 flex flex-col gap-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'text-lg uppercase tracking-[0.2em] font-medium block text-center py-2 transition-all active:scale-95',
                      location.pathname === link.path ? 'text-gold-400' : 'text-gray-300'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/reserva"
                  className="bg-gold-500 text-black text-center py-4 rounded-xl font-bold uppercase tracking-widest block shadow-[0_0_20px_rgba(194,136,48,0.2)] active:scale-95 transition-transform"
                >
                  Reservar Ahora
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-8 pt-4 border-t border-gold-900/20"
            >
              {[
                { icon: <Instagram size={24} />, href: "https://instagram.com/Mbeautytx" },
                { icon: <Phone size={24} />, href: "tel:7372969691" },
                { icon: <Mail size={24} />, href: "mailto:Maribolivar94@gmail.com" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gold-400 p-2 active:bg-gold-500/10 rounded-full transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
