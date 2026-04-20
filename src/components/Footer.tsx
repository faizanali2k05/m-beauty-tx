import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-gold-900/20 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center bg-black overflow-hidden group-hover:border-white transition-all">
                  <img 
                    src="https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/9a761951-0cc1-46d3-acf2-86af17f84816_ARTs-01---IMAGEN-DE-PERFIL-.webp" 
                    alt="Logo" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-widest gold-text-gradient font-serif whitespace-nowrap">M BEAUTY TX</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-gold-300/80">Mariana Bolívar</span>
                </div>
              </Link>
              <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                Especialista en arte de cejas, pestañas y piercing en Dallas, Texas. 
                Embelleciendo y empoderando a través de la técnica y el amor por el arte.
              </p>
              <div className="flex gap-4">
                 <a 
                   href="https://instagram.com/Mbeautytx" 
                   target="_blank" 
                   rel="noreferrer" 
                   className="w-10 h-10 rounded-full border border-gold-900/40 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
                 >
                   <Instagram size={20} />
                 </a>
              </div>
          </div>

          <div>
            <h4 className="text-gold-400 font-serif text-lg mb-6 uppercase tracking-widest">Navegación</h4>
            <ul className="flex flex-col gap-4 text-gray-400">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">Inicio</Link></li>
              <li><Link to="/sobre-mi" className="hover:text-gold-400 transition-colors">Sobre Mí</Link></li>
              <li><Link to="/servicios" className="hover:text-gold-400 transition-colors">Servicios</Link></li>
              <li><Link to="/precios" className="hover:text-gold-400 transition-colors">Precios</Link></li>
              <li><Link to="/contacto" className="hover:text-gold-400 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-serif text-lg mb-6 uppercase tracking-widest">Contacto</h4>
            <ul className="flex flex-col gap-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold-500" />
                <a href="tel:7372969691" className="hover:text-gold-400 transition-colors">737-296-9691</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-500" />
                <a href="mailto:Maribolivar94@gmail.com" className="hover:text-gold-400 transition-colors">Maribolivar94@gmail.com</a>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gold-500" />
                  <span>Dallas, Texas</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gold-900/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-widest text-center md:text-left">
            <p className="max-w-[280px] md:max-w-none">&copy; {new Date().getFullYear()} M Beauty TX. Todos los derechos reservados.</p>
            <p>Diseño Elegante por Mazhar Design Agency</p>
        </div>
      </div>
    </footer>
  );
}
