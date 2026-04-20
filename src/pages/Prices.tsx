import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { Sparkles, Info } from 'lucide-react';

export default function Prices() {
  return (
    <div className="pt-32 md:pt-48 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Lista de <span className="gold-text-gradient">Precios</span>
          </motion.h1>
          <p className="text-gray-400 text-sm uppercase tracking-[0.4em] font-medium">Beauty TX by Mariana Bolívar</p>
        </header>

        <div className="bg-neutral-950/80 backdrop-blur-sm border border-gold-900/20 rounded-[2.5rem] overflow-hidden">
          <div className="p-6 md:p-12 space-y-12">
            {Array.from(new Set(SERVICES.map(s => s.category))).map((category) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3 md:gap-4 bg-white/[0.03] p-4 md:p-6 rounded-2xl border border-white/5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold-500 shrink-0" />
                  <h2 className="text-gold-400 font-serif text-base sm:text-lg md:text-2xl uppercase tracking-[0.05em] md:tracking-widest leading-tight">
                    {category}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {SERVICES.filter(s => s.category === category).map((service) => (
                    <div key={service.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-end group gap-1 sm:gap-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-base md:text-lg group-hover:text-gold-300 transition-colors uppercase tracking-tight">{service.name}</span>
                        {service.id === 'piercing' && <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mt-1">Joyería incluida • Material estéril</span>}
                        {service.id === 'lamination' && <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mt-1">Incluye diseño de cejas & depilación</span>}
                      </div>
                      <div className="hidden sm:block flex-grow border-b border-dashed border-gold-900/30 mx-4 mb-2" />
                      <span className="text-gold-400 font-bold font-serif text-lg md:text-xl shrink-0">{service.price}</span>
                    </div>
                  ))}
                  
                  {/* Additional Pricing Items from user request not in constants yet or needing specific mention */}
                  {category === 'Micropigmentación' && (
                    <div className="flex justify-between items-end group">
                      <span className="text-white font-medium text-lg uppercase tracking-tight">Retoque (Touch-up)</span>
                      <div className="flex-grow border-b border-dashed border-gold-900/30 mx-4 mb-2" />
                      <span className="text-gold-400 font-bold font-serif text-xl">$120</span>
                    </div>
                  )}
                  {category === 'Pestañas' && (
                    <div className="flex justify-between items-end group">
                       <span className="text-white font-medium text-lg uppercase tracking-tight">Retoque cada 2–3 semanas</span>
                       <div className="flex-grow border-b border-dashed border-gold-900/30 mx-4 mb-2" />
                       <span className="text-gold-400 font-bold font-serif text-xs md:text-sm italic">Consulte</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gold-500/10 p-8 border-t border-gold-900/20">
             <div className="flex items-start gap-3 text-gold-400">
                <Info size={20} className="mt-1 flex-shrink-0" />
                <p className="text-sm font-light leading-relaxed">
                   * Los precios pueden variar según el tipo de tratamiento específico y las necesidades de cada clienta. 
                   Para servicios "Starting at", el precio final se determinará durante la consulta.
                </p>
             </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <Sparkles className="text-gold-500/40" size={40} />
          <p className="text-white font-serif text-xl text-center italic">
            "La inversión en ti misma es la que más produce beneficios."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
