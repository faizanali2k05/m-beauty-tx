import { motion } from 'motion/react';
import { Phone, Mail, Instagram, MapPin, Send, MessageCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    setFormState('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        const error = await response.json();
        console.error('Error:', error);
        setFormState('error');
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch (error) {
      console.error('Connection error:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <div className="pt-32 md:pt-48 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-sm uppercase tracking-[0.5em] text-gold-500 font-bold mb-4">M Beauty TX Dallas</h1>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8">Mariana <span className="italic gold-text-gradient">Bolívar</span></h2>
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold -mt-4">Dallas • Cejas • Pestañas • Microblading • Piercing</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-12">
               <div>
                  <h3 className="text-gold-400 uppercase tracking-widest text-sm font-bold mb-6">Información de Contacto</h3>
                  <div className="space-y-6">
                     <a href="tel:7372969691" className="flex items-center gap-6 group">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-950 border border-white/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
                           <Phone size={24} />
                        </div>
                        <div>
                           <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Teléfono</p>
                           <p className="text-white text-xl font-medium tracking-tight">737-296-9691</p>
                        </div>
                     </a>
                     
                     <a href="mailto:Maribolivar94@gmail.com" className="flex items-center gap-6 group">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-950 border border-white/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
                           <Mail size={24} />
                        </div>
                        <div>
                           <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Email</p>
                           <p className="text-white text-xl font-medium tracking-tight">Maribolivar94@gmail.com</p>
                        </div>
                     </a>

                     <div className="flex items-center gap-6 group">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-950 border border-white/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Ubicación</p>
                           <p className="text-white text-xl font-medium tracking-tight">Dallas, Texas</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-gold-400 uppercase tracking-widest text-sm font-bold mb-6">Redes Sociales</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <a 
                       href="https://instagram.com/Mbeautytx" 
                       target="_blank" 
                       rel="noreferrer" 
                       className="flex items-center justify-center gap-3 px-8 py-4 bg-neutral-950 border border-white/10 rounded-2xl text-white hover:bg-gold-500 hover:text-black transition-all group w-full sm:w-auto"
                     >
                        <Instagram size={24} />
                        <span className="font-bold uppercase tracking-widest text-sm">Instagram</span>
                     </a>
                     <a 
                       href="https://wa.me/7372969691" 
                       target="_blank" 
                       rel="noreferrer" 
                       className="flex items-center justify-center gap-3 px-8 py-4 bg-neutral-950 border border-white/10 rounded-2xl text-white hover:bg-green-600 hover:text-white transition-all group lg:hidden w-full sm:w-auto"
                     >
                        <MessageCircle size={24} />
                        <span className="font-bold uppercase tracking-widest text-sm">WhatsApp</span>
                     </a>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-neutral-950 border border-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            <h3 className="text-2xl font-serif font-bold text-white mb-2 italic">Envíanos un mensaje</h3>
            <p className="text-gray-400 mb-8 font-light">Cuéntanos qué servicios te interesan y te responderemos lo antes posible.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold ml-1">Nombre</label>
                     <input 
                       type="text" 
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       required
                       placeholder="Tu nombre completo"
                       className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:border-gold-500 outline-none transition-all"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold ml-1">Teléfono</label>
                     <input 
                       type="tel" 
                       name="phone"
                       value={formData.phone}
                       onChange={handleChange}
                       placeholder="Tu número telefónico"
                       className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:border-gold-500 outline-none transition-all"
                     />
                  </div>
               </div>
               
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:border-gold-500 outline-none transition-all"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold ml-1">Mensaje</label>
                  <textarea 
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="¿Cómo podemos ayudarte?"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:border-gold-500 outline-none resize-none transition-all"
                  />
               </div>

               <button 
                 type="submit"
                 disabled={formState !== 'idle'}
                 className="w-full bg-gold-500 text-black py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
               >
                  {formState === 'idle' && <><Send size={18} /> Enviar Mensaje</>}
                  {formState === 'sending' && "Enviando..."}
                  {formState === 'success' && "¡Mensaje Enviado!"}
                  {formState === 'error' && "Error al enviar"}
               </button>
            </form>

            {formState === 'success' && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
               >
                  <div className="w-20 h-20 rounded-full bg-gold-500 text-black flex items-center justify-center mb-6">
                     <Send size={40} />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-white mb-4 italic">¡Gracias por escribirnos!</h4>
                  <p className="text-gray-400 max-w-xs mx-auto mb-8 font-light">Mariana Bolívar se pondrá en contacto contigo pronto.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-gold-400 uppercase tracking-widest text-xs font-bold border-b border-gold-400"
                  >
                     Enviar otro mensaje
                  </button>
               </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
