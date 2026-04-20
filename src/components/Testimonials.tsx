import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sophia R.',
    quote: '¡M Beauty TX transformó mi look! La atención al detalle es inigualable. Me siento como una persona nueva cada vez que salgo.',
    rating: 5,
    role: 'Cliente Fiel'
  },
  {
    id: 2,
    name: 'Isabella M.',
    quote: 'Resultados profesionales, limpios e increíbles. Las mejores extensiones de pestañas en Texas. Definitivamente vale cada centavo.',
    rating: 5,
    role: 'Cliente VIP'
  },
  {
    id: 3,
    name: 'Olivia G.',
    quote: 'La experiencia fue puro lujo de principio a fin. ¡Recomiendo mucho a Mariana por su experiencia y amabilidad!',
    rating: 5,
    role: 'Entusiasta de Belleza'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    setIsAutoPlaying(false);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gold-900/10 hidden lg:block" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gold-900/10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.5em] text-gold-500 font-bold mb-4 block"
          >
            Experiencias Reales
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-gold"
          >
            Voces de Belleza
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-zinc-900/30 backdrop-blur-sm border border-gold-900/20 p-8 md:p-16 rounded-3xl text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              
              <div className="relative inline-block mb-8">
                <Quote className="text-gold-900/30 w-12 h-12 absolute -top-6 -left-8" />
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-serif italic leading-relaxed">
                  "{TESTIMONIALS[activeIndex].quote}"
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-gold font-bold tracking-widest text-sm uppercase">
                  {TESTIMONIALS[activeIndex].name}
                </h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">
                  {TESTIMONIALS[activeIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gold-900/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all group"
            >
              <ChevronLeft className="group-hover:scale-110 transition-transform" />
            </motion.button>
            
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    setIsAutoPlaying(false);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeIndex === i ? "bg-gold w-8" : "bg-gold-900/30"
                  )}
                />
              ))}
            </div>

            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full border border-gold-900/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all group"
            >
              <ChevronRight className="group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
