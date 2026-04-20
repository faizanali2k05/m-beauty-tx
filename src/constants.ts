export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  category: 'Cejas' | 'Pestañas' | 'Micropigmentación' | 'Depilación' | 'Piercing';
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: 'microblading',
    name: 'Microblading',
    price: '$350',
    description: 'Técnica de maquillaje permanente pelo a pelo',
    category: 'Micropigmentación',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/Micro.jpeg'
  },
  {
    id: 'lip-micropigmentation',
    name: 'Micropigmentación de Labios',
    price: '$300',
    description: 'Realza el color y la forma de tus labios con un acabado natural y duradero.',
    category: 'Micropigmentación',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-18%20at%204.34.16%20PM.jpeg'
  },
  {
    id: 'henna-eyebrows',
    name: 'Diseño de Cejas & Henna',
    price: '$45',
    description: 'Definición y color temporal para tus cejas, ideal para un look poblado y natural.',
    category: 'Cejas',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/cejashenna-1.jpg'
  },
  {
    id: 'lamination',
    name: 'Laminación de Cejas',
    price: '$80',
    description: 'Tratamiento para dar volumen y alinear el vello de las cejas, logrando un estilo natural.',
    category: 'Cejas',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/laminado-de-cejas-las-pestanas-de-julia.jpg'
  },
  {
    id: 'eyelash-lift',
    name: 'Lifting de Pestañas',
    price: '$80',
    description: 'Eleva y curva tus pestañas naturales desde la raíz para una mirada abierta.',
    category: 'Pestañas',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/liftingformentera-500x500.jpg.webp'
  },
  {
    id: 'classic-lashes',
    name: 'Extensión de Pestañas Clásicas',
    price: '$80',
    description: 'Mirada definida y elegante aplicada una a una sobre tu pestaña natural.',
    category: 'Pestañas',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/classic_480x480.jpg'
  },
  {
    id: 'hybrid-lashes',
    name: 'Extensión de Pestañas Híbridas',
    price: '$80',
    description: 'Combinación perfecta entre técnica clásica y volumen para un efecto más poblado.',
    category: 'Pestañas',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/1080x1080-jess-lashes_9af8fe52-4de8-4ea9-b1f9-7e29175db46d_1024x1024.webp'
  },
  {
    id: 'volume-lashes',
    name: 'Extensión de Pestañas Volumen',
    price: '$100+',
    description: 'Mirada intensa y glamurosa con múltiples extensiones por pestaña natural.',
    category: 'Pestañas',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/1006B3CE-B8D5-4967-85BD-7E230DA70A24.jpeg'
  },
  {
    id: 'body-waxing',
    name: 'Depilación Corporal',
    price: '$30+',
    description: 'Eliminación de vello con cera para una piel suave y tersa por más tiempo.',
    category: 'Depilación',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/estetica-torrevieja-depilacion.webp'
  },
  {
    id: 'piercing',
    name: 'Piercing Corporal',
    price: '$30+',
    description: 'Perforación profesional, segura e higiénica con joyería incluida.',
    category: 'Piercing',
    image: 'https://ayk1falkfcr3ll7h.public.blob.vercel-storage.com/img.webp'
  }
];
