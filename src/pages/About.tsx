import { motion } from 'motion/react';
import { Instagram, Star, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 md:pt-48 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-gold-900/40 shadow-2xl">
              <img 
                src="https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/629631518_17910521418315857_556735176458422363_n.jpg" 
                alt="Mariana Bolívar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Gold Frame */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-gold-500/20 rounded-3xl -z-10" />
            
            <div className="absolute -bottom-6 md:-left-6 left-0 right-0 md:right-auto bg-gold-950/80 backdrop-blur-xl border border-gold-500/30 p-6 md:p-8 rounded-2xl md:max-w-xs mx-4 md:mx-0">
              <div className="flex items-center gap-2 text-gold-400 mb-2">
                 <Award size={20} />
                 <span className="text-xs font-bold uppercase tracking-widest">Desde 2015</span>
              </div>
              <p className="text-white text-sm font-medium italic">
                "Embellecer y empoderar a través del arte de las cejas y las pestañas."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-sm uppercase tracking-[0.5em] text-gold-500 font-bold mb-6">Hola Hermosa</h1>
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight italic">
               ¡BIENVENIDA! <br />
               <span className="gold-text-gradient not-italic">Soy Mariana Bolívar</span>
            </h2>

            <div className="space-y-6 text-gray-300 text-lg font-light leading-relaxed mb-10">
              <p>
                Soy venezolana y emigré a Estados Unidos con sueños en el corazón. 
                Mi camino comenzó en 2015, en Valencia, Venezuela, con un curso de cejas y pestañas.
              </p>
              <p>
                Años después, entendí que no era solo un aprendizaje, sino mi propósito: 
                embellecer y empoderar a otras mujeres a través del arte de las <span className="text-white font-medium">cejas, pestañas, microblading y piercing</span>.
              </p>
              <p>
                Dallas, Texas me regaló la oportunidad de crecer y aprender de grandes profesionales. 
                Como CEO de <span className="text-gold-400 font-bold">@Mbeautytx</span>, mi misión en Dallas es para todas las hermosas que quieran cuidar y mejorar la apariencia de sus cejas y pestañas con las últimas tendencias.
              </p>
              <p className="text-white font-medium italic">
                Hoy sigo creando miradas con pasión, técnica y amor por lo que hago. ✨
              </p>
            </div>

            <div className="flex flex-wrap gap-6 items-center">
               <div className="flex items-center gap-2">
                  <div className="flex text-gold-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">+1000 Clientes Felices</span>
               </div>
               
               <a 
                 href="https://instagram.com/Mbeautytx" 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex items-center gap-3 px-6 py-3 border border-gold-500/30 rounded-full text-gold-400 hover:bg-gold-500 hover:text-black transition-all group"
               >
                 <Instagram size={20} />
                 <span className="text-xs font-bold uppercase tracking-widest">Sigueme en Instagram</span>
                 <Award size={16} className="group-hover:rotate-12 transition-transform" />
               </a>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <section className="mt-24 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 md:p-10 rounded-3xl bg-neutral-950 border border-white/5">
                <h3 className="text-gold-400 font-serif text-2xl mb-4">Pasión</h3>
                <p className="text-gray-400 font-light">
                   Cada trazo y cada detalle es realizado con una dedicación absoluta al arte de la belleza.
                </p>
            </div>
            <div className="p-10 rounded-3xl bg-neutral-950 border border-gold-500/20 shadow-[0_0_30px_rgba(194,136,48,0.05)]">
                <h3 className="text-gold-400 font-serif text-2xl mb-4">Técnica</h3>
                <p className="text-gray-400 font-light">
                   Formación continua y uso de las últimas tendencias para garantizar resultados profesionales y seguros.
                </p>
            </div>
            <div className="p-10 rounded-3xl bg-neutral-950 border border-white/5">
                <h3 className="text-gold-400 font-serif text-2xl mb-4">Amor</h3>
                <p className="text-gray-400 font-light">
                   Mi mayor satisfacción es ver la sonrisa y la confianza recuperada en el rostro de mis clientas.
                </p>
            </div>
        </section>
      </div>
    </div>
  );
}
