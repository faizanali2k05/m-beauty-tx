import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, Scissors, Eye, Heart } from 'lucide-react';
import { SERVICES } from '../constants';
import Testimonials from '../components/Testimonials';

const FEATURED_SERVICES = SERVICES.slice(0, 3);

export default function Home() {
  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/Screenshot%202026-04-18%20233749.png" 
            alt="Beauty Background" 
            className="w-full h-full object-cover transition-opacity duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
             <div className="text-sm md:text-lg font-serif italic text-gold tracking-[0.2em]">
               ¡Hola Hermosa! BIENVENIDA
             </div>
          </motion.div>

          <header className="mb-8 md:mb-12 overflow-hidden">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-gold tracking-[0.05em] md:tracking-[0.1em] uppercase mb-4 leading-tight whitespace-nowrap"
            >
              M Beauty TX
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-4xl text-white font-serif italic mb-6 opacity-90"
            >
              Mariana Bolívar
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
              className="decorative-line mx-auto max-w-[200px] md:max-w-md"
            ></motion.div>
          </header>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 md:mb-12 font-light tracking-wide leading-relaxed px-4"
          >
            Arte • Belleza • Empoderamiento <br />
            <span className="text-sm md:text-lg text-gold-400/80 uppercase tracking-widest mt-2 block">Cejas | Pestañas | Microblading | Piercing | Tendencias</span>
            <span className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.3em] mt-2 block">Dallas, Texas</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link 
              to="/reserva" 
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gold-500 text-black font-bold uppercase tracking-widest rounded-full hover:bg-gold-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(194,136,48,0.3)] text-xs md:text-base"
            >
              Agendar Cita
            </Link>
            <Link 
              to="/servicios" 
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 border border-gold-500/50 text-gold-400 font-bold uppercase tracking-widest rounded-full hover:bg-gold-500/10 transition-all text-xs md:text-base"
            >
              Ver Servicios
            </Link>
          </motion.div>
        </div>

        {/* Floating Icons Decoration */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 text-gold-500/20 hidden lg:block"
        >
          <Sparkles size={80} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 text-gold-500/20 hidden lg:block"
        >
          <Eye size={100} />
        </motion.div>
      </section>

      {/* Featured Services */}
      <section className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20 gap-6">
            <div>
              <h2 className="text-sm uppercase tracking-[0.4em] text-gold-500 font-bold mb-4">Experiencia de Lujo en Dallas</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Servicios & Tendencias</h3>
            </div>
            <Link to="/servicios" className="text-gold-400 uppercase tracking-widest text-sm font-bold flex items-center gap-2 group hover:text-gold-300 transition-colors">
              Explorar todos <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-3xl bg-black border border-white/5 hover:border-gold-500/40 hover:shadow-[0_20px_50px_rgba(194,136,48,0.15)] transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">{service.category}</span>
                  <h4 className="text-2xl font-serif font-bold text-white mb-2">{service.name}</h4>
                  <p className="text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-gold-400 font-bold">{service.price}</span>
                    <Link to="/reserva" className="text-white text-xs uppercase tracking-widest font-bold group/btn flex items-center gap-2">
                      Reservar <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <Testimonials />

      {/* Trust Badges */}
      <section className="py-24 border-y border-gold-900/10 bg-black overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center items-center">
            {[
               { icon: <Star size={28} />, label: "Resultados Perfectos" },
               { icon: <Heart size={28} />, label: "Atención Personalizada" },
               { icon: <Scissors size={28} />, label: "Técnica Profesional" },
               { icon: <Sparkles size={28} />, label: "Elegancia & Arte" }
            ].map((badge, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="flex flex-col items-center gap-4 group"
               >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  >
                     {badge.icon}
                  </motion.div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-gold-400 transition-colors">{badge.label}</span>
               </motion.div>
            ))}
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold text-white mb-8"
            >
              ¿Lista para brillar?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              Descubre tu mejor versión a través del arte de las cejas y pestañas. 
              Mariana Bolívar te espera en Dallas para transformar tu mirada.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to="/reserva" 
                className="inline-flex items-center gap-4 px-12 py-6 bg-gold-500 text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(194,136,48,0.2)]"
              >
                Agenda tu cita hoy <ArrowRight size={20} />
              </Link>
            </motion.div>
         </div>

         {/* Decorative elements */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full" />
      </section>
    </div>
  );
}
