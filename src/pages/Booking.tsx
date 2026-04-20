import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo, useEffect } from 'react';
import { SERVICES } from '../constants';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Loader2,
  Sparkles,
  MapPin,
  Smartphone
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format, addDays, getYear, getMonth, getDate, getDaysInMonth } from 'date-fns';

type Step = 'service' | 'dateTime' | 'details' | 'summary';

export default function Booking() {
  const [step, setStep] = useState<Step>('service');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Custom Date Selection State
  const initialDate = addDays(new Date(), 1);
  const [tempDate, setTempDate] = useState({
    day: getDate(initialDate),
    month: getMonth(initialDate),
    year: getYear(initialDate)
  });

  const [bookingData, setBookingData] = useState({
    date: initialDate,
    time: '',
    name: '',
    phone: '',
    notes: ''
  });

  // Update real date when temp selection changes
  useEffect(() => {
    const newDate = new Date(tempDate.year, tempDate.month, tempDate.day);
    setBookingData(prev => ({ ...prev, date: newDate }));
  }, [tempDate]);

  const selectedService = useMemo(() => 
    SERVICES.find(s => s.id === selectedServiceId), 
    [selectedServiceId]
  );

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', 
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const handleBook = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingData.name,
          phone: bookingData.phone,
          date: format(bookingData.date, 'PPPP'),
          time: bookingData.time,
          serviceName: selectedService?.name,
          servicePrice: selectedService?.price,
          notes: bookingData.notes
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const result = await response.json();
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentYear = getYear(new Date());
  const years = [currentYear, currentYear + 1];

  const daysInMonth = useMemo(() => {
    return getDaysInMonth(new Date(tempDate.year, tempDate.month));
  }, [tempDate.month, tempDate.year]);

  if (isSuccess) {
    return (
      <div className="pt-48 pb-20 px-6 min-h-[80vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8 bg-neutral-900 p-12 rounded-[3rem] border border-gold-500/20 shadow-2xl"
        >
          <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.3)]">
            <CheckCircle2 size={48} className="text-black" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-bold text-white italic">¡Reserva Exitosa!</h2>
            <p className="text-gray-400">
              Gracias, <span className="text-gold-400 font-bold">{bookingData.name}</span>. 
              Hemos recibido tu solicitud para <span className="text-white font-medium">{selectedService?.name}</span>.
              Mariana Bolívar se pondrá en contacto contigo pronto vía WhatsApp o llamada para confirmar los detalles finales.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-5 bg-gold-500 text-black font-bold uppercase tracking-widest rounded-full hover:bg-gold-400 active:scale-95 transition-all shadow-lg"
          >
            Volver al Inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-48 pb-32 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Info & Stepper */}
        <div className="lg:col-span-4 space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 text-center lg:text-left"
          >
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-500 text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles size={14} /> Tu transformación comienza aquí
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white italic leading-tight">
              Vive la <span className="text-gold-500 block lg:inline-block hover:scale-105 transition-transform cursor-default">Experiencia</span> M Beauty
            </h1>
            <p className="text-gray-400 font-light leading-relaxed">
              Reserva tu cita personalizada en nuestro exclusivo estudio en Dallas. 
              Estamos comprometidos con resaltar tu belleza natural.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { id: 'service', label: 'Elige tu Servicio', step: '01' },
              { id: 'dateTime', label: 'Fecha y Hora', step: '02' },
              { id: 'details', label: 'Tus Datos', step: '03' },
              { id: 'summary', label: 'Confirmación', step: '04' }
            ].map((s, idx) => (
              <div 
                key={s.id} 
                className="flex items-center gap-6 group"
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center font-bold font-serif text-lg transition-all duration-500 border",
                  step === s.id 
                    ? "bg-gold-500 border-gold-500 text-black shadow-lg" 
                    : (idx < ['service', 'dateTime', 'details', 'summary'].indexOf(step) ? "bg-gold-500/20 border-gold-500/40 text-gold-500" : "bg-neutral-900 border-white/5 text-gray-600")
                )}>
                  {s.step}
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "text-[10px] uppercase tracking-[0.2em] font-bold transition-colors",
                    step === s.id ? "text-gold-400" : "text-gray-600"
                  )}>Paso {s.step}</span>
                  <span className={cn(
                    "font-serif text-lg transition-colors",
                    step === s.id ? "text-white italic" : "text-gray-500"
                  )}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-12 border-t border-white/5 space-y-6"
          >
             <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default group">
                <MapPin size={20} className="text-gold-500 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-light">Dallas, Texas - United States</span>
             </div>
             <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default group">
                <Smartphone size={20} className="text-gold-500 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-light">+1 737-296-9691</span>
             </div>
          </motion.div>
        </div>

        {/* Right: Interaction Area */}
        <div className="lg:col-span-8">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-950/50 backdrop-blur-xl border border-white/5 rounded-3xl md:rounded-[3rem] p-4 sm:p-6 md:p-16 relative overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {step === 'service' && (
                <motion.div 
                  key="step-service"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="space-y-10 flex-grow relative z-10"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/5 pb-6 sm:pb-8 mb-8 gap-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white italic">Selecciona un Tratamiento</h2>
                    <span className="text-gray-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5 shrink-0">{SERVICES.length} Opciones disponibles</span>
                  </div>
                  
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {SERVICES.map((s) => (
                      <motion.button
                        key={s.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          show: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedServiceId(s.id)}
                        className={cn(
                          "flex items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-3xl border transition-all duration-500 group relative overflow-hidden text-left",
                          selectedServiceId === s.id 
                            ? "bg-gold-500 border-gold-500 shadow-lg" 
                            : "bg-white/[0.03] border-white/5 hover:border-gold-500/50 hover:bg-white/[0.05]"
                        )}
                      >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden transition-all shrink-0 border border-white/10">
                          <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className={cn(
                            "text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold mb-0.5 sm:mb-1 transition-colors truncate",
                            selectedServiceId === s.id ? "text-black/60" : "text-gold-500"
                          )}>{s.category}</p>
                          <h4 className={cn(
                            "text-base sm:text-lg font-serif font-bold transition-colors leading-tight line-clamp-2",
                            selectedServiceId === s.id ? "text-black italic" : "text-white"
                          )}>{s.name}</h4>
                        </div>
                        <div className={cn(
                          "font-bold font-serif text-base sm:text-lg shrink-0",
                          selectedServiceId === s.id ? "text-black" : "text-gold-400"
                        )}>{s.price}</div>
                      </motion.button>
                    ))}
                  </motion.div>

                  <div className="flex justify-end pt-12">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!selectedServiceId}
                      onClick={() => setStep('dateTime')}
                      className="group relative px-12 py-5 overflow-hidden rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:opacity-20"
                    >
                      <div className="absolute inset-0 bg-gold-500 hover:bg-gold-400 transition-colors" />
                      <span className="relative z-10 text-black font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                        Siguiente <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'dateTime' && (
                <motion.div 
                  key="step-datetime"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-10 flex-grow relative z-10"
                >
                  <div className="flex justify-between items-end border-b border-white/5 pb-8 mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white italic">Fecha y Horario</h2>
                    <div className="text-right">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-gold-500 mb-1">Servicio elegido</p>
                       <p className="text-white font-serif">{selectedService?.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-10">
                       <div className="space-y-6">
                          <label className="inline-flex items-center gap-2 text-gold-500 text-xs font-bold uppercase tracking-widest border-b border-gold-500/20 pb-2 w-full">
                             <CalendarIcon size={14} /> Selecciona el Día
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                             {/* Year Select */}
                             <div className="space-y-2">
                                <span className="text-[9px] uppercase tracking-widest text-gray-500 block px-1">Año</span>
                                <select 
                                  value={tempDate.year}
                                  onChange={(e) => setTempDate({...tempDate, year: parseInt(e.target.value)})}
                                  className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 px-4 text-white hover:border-gold-500/40 transition-all outline-none appearance-none cursor-pointer"
                                >
                                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                             </div>
                             {/* Month Select */}
                             <div className="space-y-2">
                                <span className="text-[9px] uppercase tracking-widest text-gray-500 block px-1">Mes</span>
                                <select 
                                  value={tempDate.month}
                                  onChange={(e) => setTempDate({...tempDate, month: parseInt(e.target.value)})}
                                  className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 px-4 text-white hover:border-gold-500/40 transition-all outline-none appearance-none cursor-pointer"
                                >
                                  {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
                                </select>
                             </div>
                             {/* Day Select */}
                             <div className="space-y-2">
                                <span className="text-[9px] uppercase tracking-widest text-gray-500 block px-1">Día</span>
                                <select 
                                  value={tempDate.day}
                                  onChange={(e) => setTempDate({...tempDate, day: parseInt(e.target.value)})}
                                  className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 px-4 text-white hover:border-gold-500/40 transition-all outline-none appearance-none cursor-pointer"
                                >
                                  {Array.from({length: daysInMonth}, (_, i) => i + 1).map(d => (
                                    <option key={d} value={d}>{d}</option>
                                  ))}
                                </select>
                             </div>
                          </div>
                          <p className="text-gray-500 text-[11px] italic text-center md:text-left px-1">
                             * Por favor considera que las citas se deben agendar con al menos 24 horas de anticipación.
                          </p>
                       </div>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="space-y-6">
                          <h4 className="inline-flex items-center gap-2 text-gold-500 text-xs font-bold uppercase tracking-widest border-b border-gold-500/20 pb-2 w-full">
                             <Clock size={14} /> Turnos disponibles
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-2 sm:gap-3">
                            {timeSlots.map(time => (
                              <motion.button
                                key={time}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setBookingData({...bookingData, time})}
                                className={cn(
                                  "py-4 rounded-2xl text-xs font-bold tracking-widest transition-all border",
                                  bookingData.time === time 
                                    ? "bg-gold-500 border-gold-500 text-black shadow-lg" 
                                    : "bg-white/[0.02] border-white/10 text-gray-500 hover:border-gold-500/40 hover:text-white"
                                )}
                              >
                                {time}
                              </motion.button>
                            ))}
                          </div>
                          <AnimatePresence>
                            {bookingData.time && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-gold-500/5 border border-gold-500/10 p-6 rounded-3xl text-center"
                              >
                                <p className="text-sm text-gold-500 italic mb-1">Has seleccionado:</p>
                                <p className="text-white font-serif text-lg tracking-wider">
                                   {format(bookingData.date, 'EEEE d de MMMM, yyyy', {  })}
                                </p>
                                <p className="text-gold-400 font-bold mt-2">A las {bookingData.time}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 mt-auto">
                    <button
                      onClick={() => setStep('service')}
                      className="w-full md:w-auto px-8 py-4 border border-white/10 text-gray-400 font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-all text-[10px] flex items-center justify-center gap-2"
                    >
                      <ChevronLeft size={16} /> Volver
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!bookingData.time}
                      onClick={() => setStep('details')}
                      className="w-full md:w-auto px-12 py-5 bg-gold-500 text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold-400 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:opacity-20 flex items-center justify-center gap-3 group"
                    >
                      Continuar <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'details' && (
                <motion.div 
                  key="step-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10 flex-grow relative z-10"
                >
                  <div className="flex justify-between items-end border-b border-white/5 pb-8 mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white italic">Información de Contacto</h2>
                    <div className="text-right">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-gold-500 mb-1">Cita para el</p>
                       <p className="text-white font-serif tracking-widest uppercase text-xs">
                          {format(bookingData.date, 'dd/MM/yyyy')} @ {bookingData.time}
                       </p>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto w-full space-y-10 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                       >
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 flex items-center gap-2 px-1">
                             <User size={12} /> Nombre Completo
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="Nombre y Apellido"
                            className="w-full bg-neutral-900/50 border border-white/10 p-5 rounded-3xl text-white focus:border-gold-500 focus:bg-neutral-800 transition-all outline-none"
                            value={bookingData.name}
                            onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                          />
                       </motion.div>
                       <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                       >
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 flex items-center gap-2 px-1">
                             <Phone size={12} /> WhatsApp / Teléfono
                          </label>
                          <input 
                            type="tel" 
                            required
                            placeholder="(000) 000-0000"
                            className="w-full bg-neutral-900/50 border border-white/10 p-5 rounded-3xl text-white focus:border-gold-500 focus:bg-neutral-800 transition-all outline-none"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                          />
                       </motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-4"
                    >
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 flex items-center gap-2 px-1">
                           ¿Alguna consulta o detalle especial?
                        </label>
                        <textarea 
                          placeholder="Cuéntanos más para brindarte la mejor atención..."
                          rows={4}
                          className="w-full bg-neutral-900/50 border border-white/10 p-6 rounded-[2rem] text-white focus:border-gold-500 focus:bg-neutral-800 transition-all outline-none resize-none"
                          value={bookingData.notes}
                          onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                        />
                    </motion.div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 mt-auto">
                    <button
                      onClick={() => setStep('dateTime')}
                      className="w-full md:w-auto px-8 py-4 border border-white/10 text-gray-400 font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-all text-[10px] flex items-center justify-center gap-2"
                    >
                      <ChevronLeft size={16} /> Volver
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!bookingData.name || !bookingData.phone}
                      onClick={() => setStep('summary')}
                      className="w-full md:w-auto px-12 py-5 bg-gold-500 text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold-400 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:opacity-20 flex items-center justify-center gap-3 group"
                    >
                      Revisar <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'summary' && (
                <motion.div 
                  key="step-summary"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-10 flex-grow py-8 relative z-10"
                >
                  <div className="text-center space-y-4 mb-12">
                     <motion.h2 
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      className="text-3xl md:text-5xl font-serif font-bold text-white italic"
                     >
                      Confirmar Reserva
                     </motion.h2>
                     <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Resumen final para tu experiencia de lujo</p>
                  </div>

                  <div className="max-w-md mx-auto relative group">
                    <div className="relative bg-neutral-900 border border-gold-500/20 rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 overflow-hidden shadow-2xl">
                       <div className="absolute top-0 right-0 p-8 text-gold-500/5">
                          <CheckCircle2 size={120} />
                       </div>
                       
                       <div className="space-y-10 relative z-10">
                          <div className="space-y-2">
                             <span className="text-[10px] uppercase tracking-widest font-bold text-gold-500/60">Servicio solicitado</span>
                             <h4 className="text-3xl font-serif font-bold text-white italic">{selectedService?.name}</h4>
                             <motion.p 
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-gold-400 font-bold flex items-center gap-2"
                             >
                                <Sparkles size={16} /> Inversión: {selectedService?.price}
                             </motion.p>
                          </div>

                          <div className="grid grid-cols-1 gap-6 py-8 border-y border-white/5 font-sans">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                                   <CalendarIcon size={20} />
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[9px] uppercase tracking-widest text-gray-500">Fecha</span>
                                   <span className="text-white font-medium text-sm tracking-widest uppercase">{format(bookingData.date, 'EEEE d MMMM')}</span>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                                   <Clock size={20} />
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[9px] uppercase tracking-widest text-gray-500">Horario</span>
                                   <span className="text-white font-medium text-sm tracking-widest">{bookingData.time}</span>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                                   <User size={20} />
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[9px] uppercase tracking-widest text-gray-500">Cliente</span>
                                   <span className="text-white font-medium text-sm tracking-widest uppercase">{bookingData.name}</span>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                                   <Phone size={20} />
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[9px] uppercase tracking-widest text-gray-500">WhatsApp</span>
                                   <span className="text-white font-medium text-sm tracking-widest">{bookingData.phone}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-12 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep('details')}
                      disabled={isSubmitting}
                      className="px-10 py-5 border border-white/10 text-gray-400 font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-all text-xs"
                    >
                      Corregir Datos
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBook}
                      disabled={isSubmitting}
                      className="px-20 py-5 bg-gold-500 text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold-400 transition-all flex items-center justify-center gap-3 min-w-[300px]"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="animate-spin" size={20} /> Agendando...</>
                      ) : (
                        <>Finalizar Reserva <Sparkles size={18} /></>
                      )}
                    </motion.button>
                  </div>

                  <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest mt-8 flex items-center justify-center gap-2">
                     <MapPin size={10} /> Dallas, Texas Studio • Mariana Bolívar
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
