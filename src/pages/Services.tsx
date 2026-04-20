import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Wand2, Scissors, Eye, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

export default function Services() {
  const categories = Array.from(new Set(SERVICES.map(s => s.category)));

  return (
    <div className="pt-32 md:pt-48 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-serif font-bold text-white mb-8"
          >
            Servicios de <span className="gold-text-gradient">Alta Gama</span>
          </motion.h1>
          <p className="text-gray-400 text-lg font-light tracking-wide italic">
             Cejas, Pestañas, Microblading y Piercing en Dallas, Texas. <br />
             Expertos en Micropigmentación y las últimas tendencias de belleza por Mariana Bolívar.
          </p>
        </header>

        <div className="space-y-32">
          {categories.map((category, catIndex) => (
            <motion.section 
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                <motion.h2 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-4xl font-serif font-bold text-white md:whitespace-nowrap"
                >
                  {category}
                </motion.h2>
                <div className="h-px bg-gold-900/30 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {SERVICES.filter(s => s.category === category).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <div className="flex flex-col lg:flex-row gap-8 bg-neutral-950/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-white/5 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(194,136,48,0.1)]">
                      <div className="lg:w-1/3 aspect-square rounded-3xl overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="lg:w-2/3 flex flex-col justify-center">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                           <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-gold transition-colors uppercase tracking-tight leading-tight">{service.name}</h3>
                           <span className="text-gold font-bold font-serif text-lg md:text-xl shrink-0">{service.price}</span>
                        </div>
                        <p className="text-gray-400 font-light mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        <Link 
                          to="/reserva" 
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold group/btn mt-auto"
                        >
                          Reservar <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-24 md:mt-40 p-8 md:p-20 rounded-3xl md:rounded-[3rem] bg-gradient-to-r from-gold-950/40 to-black border border-gold-500/20 text-center relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-2xl md:text-5xl font-serif font-bold text-white mb-6 italic leading-snug">Tu combinación perfecta</h3>
              <p className="text-gold-400 text-sm md:text-xl font-bold mb-10 tracking-[0.2em] uppercase">Sombreado de cejas + pigmentacion de labios $500</p>
              <Link 
                to="/reserva" 
                className="inline-block px-12 py-5 bg-gold-500 text-black font-bold uppercase tracking-widest rounded-full hover:bg-gold-400 transition-all shadow-[0_0_50px_rgba(194,136,48,0.2)]"
              >
                Aprovechar Promo
              </Link>
           </div>
           <Sparkles className="absolute top-10 right-10 text-gold-500/10" size={120} />
           <Eye className="absolute bottom-10 left-10 text-gold-500/10" size={150} />
        </div>
      </div>
    </div>
  );
}
