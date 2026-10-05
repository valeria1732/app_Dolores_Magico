/**
 * Datos iniciales para DoloresMágico App
 * Basados en la propuesta técnica para Dolores Hidalgo C.I.N., Guanajuato
 */

export const MUNICIPALITY_CENTER = {
  lat: 21.15605,
  lng: -100.93245,
  name: 'Plaza Principal (Jardín del Grande Hidalgo)',
  zoom: 15
};

export const CATEGORIES = [
  { id: 'todas', name: 'Todos los Puntos', color: '#0d47a1', icon: '🏛️', count: 12 },
  { id: 'talavera', name: 'Talleres de Talavera', color: '#0d47a1', pinColor: 'blue', icon: '🏺', badge: 'Pin Azul' },
  { id: 'nieves', name: 'Neverías Tradicionales', color: '#f59e0b', pinColor: 'yellow', icon: '🍧', badge: 'Pin Amarillo' },
  { id: 'historico', name: 'Sitios Históricos', color: '#b91c1c', pinColor: 'red', icon: '🔔', badge: 'Pin Rojo' }
];

export const INITIAL_POINTS_OF_INTEREST = [
  // --- TALLERES DE TALAVERA (AZUL) ---
  {
    id: 'tal-1',
    name: 'Taller Talavera y Alfarería San Gabriel',
    artisan: 'Mtro. Javier Cortés & Familia',
    category: 'talavera',
    categoryName: 'Taller de Talavera y Mayólica',
    pinColor: 'blue',
    address: 'Calle Michoacán #28, Barrio San Juan',
    lat: 21.1578,
    lng: -100.9308,
    phone: '+524181820491',
    whatsapp: '524181820491',
    schedule: 'Lunes a Sábado 9:00 - 18:30 hrs',
    history: 'Taller fundado hace 38 años. Especializado en el rescate de la mayólica virreinal novohispana con vidriado de estaño y óxidos minerales cocidos a 1,050 °C en hornos tradicionales.',
    rating: 4.9,
    reviewsCount: 54,
    verified: true,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    tags: ['Talavera Certificada', 'Visitas Guiadas', 'Venta Directa'],
    catalog: [
      { id: 'prod-101', name: 'Tibor Colonial Policromado (45cm)', price: 1850, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80', technique: 'Pintado a mano alzada' },
      { id: 'prod-102', name: 'Juego de 6 Platos Trinche Talavera Clásica', price: 980, image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80', technique: 'Esmalte vidriado tradicional' },
      { id: 'prod-103', name: 'Lavamanos Artesanal Barroco', price: 2400, image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80', technique: 'Pieza única para empotrar' }
    ]
  },
  {
    id: 'tal-2',
    name: 'Cerámica y Mayólica El Relicario',
    artisan: 'Mtra. Rosa María Prado',
    category: 'talavera',
    categoryName: 'Taller de Talavera y Cerámica Fina',
    pinColor: 'blue',
    address: 'Calle Puebla #42, Centro Histórico',
    lat: 21.1568,
    lng: -100.9338,
    phone: '+524181821105',
    whatsapp: '524181821105',
    schedule: 'Lunes a Domingo 9:30 - 19:30 hrs',
    history: 'Taller artesanal encabezado por maestras alfareras con más de 25 años de trayectoria decorando azulejos historiados, vajillas personalizadas y macetas de gran formato.',
    rating: 5.0,
    reviewsCount: 78,
    verified: true,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    tags: ['Maestra Artesana', 'Técnica Virreinal', 'Envíos Nacionales'],
    catalog: [
      { id: 'prod-104', name: 'Mural de 12 Azulejos "Cuna de la Independencia"', price: 1600, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', technique: 'Azulejería fina' },
      { id: 'prod-105', name: 'Maceta Cilíndrica Talavera Azul Cobalto', price: 650, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80', technique: 'Pigmentos naturales' }
    ]
  },
  {
    id: 'tal-3',
    name: 'Alfarería Tradicional Los Hermanos Torres',
    artisan: 'Don Pedro Torres',
    category: 'talavera',
    categoryName: 'Alfarería Tradicional y Barro Vidriado',
    pinColor: 'blue',
    address: 'Calle San Cristóbal #19, Barrio San Cristóbal',
    lat: 21.1592,
    lng: -100.9355,
    phone: '+524181234567',
    whatsapp: '524181234567',
    schedule: 'Lunes a Sábado 8:00 - 17:00 hrs',
    history: 'Taller tradicional de alfarería utilitaria en torno de pie y leña de mezquite. Cazuelas, cántaros curados y comales para la gastronomía tradicional guanajuatense.',
    rating: 4.8,
    reviewsCount: 39,
    verified: true,
    image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&w=800&q=80',
    tags: ['Torno de Pie', 'Barro Natural', 'Precios de Taller'],
    catalog: [
      { id: 'prod-106', name: 'Cazuela Arrocera de Barro Curado (5 Litros)', price: 340, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80', technique: 'Barro horneado con leña' },
      { id: 'prod-107', name: 'Jarra de Agua Fresca con 4 Vasos', price: 420, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', technique: 'Alfarería vidriada libre de plomo' }
    ]
  },
  {
    id: 'tal-4',
    name: 'Talavera Imperial Dolorense',
    artisan: 'Familia Morales Santillán',
    category: 'talavera',
    categoryName: 'Taller de Talavera y Azulejería',
    pinColor: 'blue',
    address: 'Calzada de los Héroes #105',
    lat: 21.1542,
    lng: -100.9275,
    phone: '+524181559988',
    whatsapp: '524181559988',
    schedule: 'Lunes a Domingo 9:00 - 19:00 hrs',
    history: 'Especialistas en vajillas de boda, crucifijos y lámparas caladas en mayólica dolorense con acabados finos y motivos florales tradicionales.',
    rating: 4.9,
    reviewsCount: 42,
    verified: true,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    tags: ['Vajillas de Gala', 'Taller Familiar', 'Empaque para Viaje'],
    catalog: [
      { id: 'prod-108', name: 'Lámpara de Mesa Calada con Talavera', price: 1250, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80', technique: 'Barro calado y esmaltado' }
    ]
  },

  // --- NEVERÍAS TRADICIONALES (AMARILLO) ---
  {
    id: 'nie-1',
    name: 'Nieves Tradicionales La Flor de Dolores',
    artisan: 'Doña Esperanza Barajas',
    category: 'nieves',
    categoryName: 'Nevería Tradicional Centenaria',
    pinColor: 'yellow',
    address: 'Portal Morelos #8, Frente al Jardín Principal',
    lat: 21.1558,
    lng: -100.9322,
    phone: '+524181820123',
    whatsapp: '524181820123',
    schedule: 'Lunes a Domingo 10:00 - 21:30 hrs',
    history: 'La nevería más emblemática de Dolores Hidalgo. Elaboración 100% artesanal en barricas de madera de encino con hielo y sal de grano, batiendo a mano cada receta desde 1948.',
    rating: 5.0,
    reviewsCount: 310,
    verified: true,
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80',
    tags: ['Nieve de Garambullo', 'Receta de 1948', 'En Portal Histórico'],
    catalog: [
      { id: 'prod-201', name: 'Nieve de Garambullo del Semidesierto (Litro)', price: 120, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', technique: 'Cactácea local del Bajío' },
      { id: 'prod-202', name: 'Nieve de Borrachita y Tequila con Limón (Litro)', price: 130, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80', technique: 'Tequila de la región y fruto de biznaga' },
      { id: 'prod-203', name: 'Nieve Mantecado Colonial con Frutos Secos (Litro)', price: 120, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80', technique: 'Receta virreinal con nuez y pasas' }
    ]
  },
  {
    id: 'nie-2',
    name: 'Nevería El Pipila de Dolores',
    artisan: 'Don Antonio Morales & Hijos',
    category: 'nieves',
    categoryName: 'Nevería Artesanal del Jardín',
    pinColor: 'yellow',
    address: 'Jardín Principal esq. Calle Hidalgo',
    lat: 21.1563,
    lng: -100.9329,
    phone: '+524181820455',
    whatsapp: '524181820455',
    schedule: 'Lunes a Domingo 10:00 - 21:00 hrs',
    history: 'Famosos por sus sabores exóticos e innovadores: nieve de aguacate fresco, mole poblano, chicharrón, queso con zarzamora y vino tinto de Dolores.',
    rating: 4.8,
    reviewsCount: 145,
    verified: true,
    image: 'https://images.unsplash.com/photo-1560008511-3141f1765c7c?auto=format&fit=crop&w=800&q=80',
    tags: ['Sabores Exóticos', 'Nieve de Aguacate', 'Junto a la Parroquia'],
    catalog: [
      { id: 'prod-204', name: 'Copa de Nieve de Aguacate y Miel (Individual)', price: 45, image: 'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=600&q=80', technique: 'Aguacate criollo seleccionado' },
      { id: 'prod-205', name: 'Nieve de Queso Fresco con Frutos Rojos (Litro)', price: 125, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', technique: 'Queso de rancho local' }
    ]
  },
  {
    id: 'nie-3',
    name: 'Nieves Artesanales Don Cuco',
    artisan: 'Refugio "Cuco" Hernández',
    category: 'nieves',
    categoryName: 'Nevería Típica de Tradición',
    pinColor: 'yellow',
    address: 'Calle Guerrero #15, Barrio del Calvario',
    lat: 21.1549,
    lng: -100.9341,
    phone: '+524181112233',
    whatsapp: '524181112233',
    schedule: 'Lunes a Domingo 11:00 - 20:00 hrs',
    history: 'Neveros de tercera generación. Sus nieves de pétalos de rosa y de zapote blanco son de las favoritas de las familias dolorenses.',
    rating: 4.9,
    reviewsCount: 92,
    verified: true,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    tags: ['Pétalos de Rosa', 'Tradición Familiar', 'Barricas de Roble'],
    catalog: [
      { id: 'prod-206', name: 'Nieve de Pétalos de Rosa de Castilla (Litro)', price: 130, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', technique: 'Infusión floral pura' }
    ]
  },

  // --- SITIOS HISTÓRICOS Y MUSEOS (ROJO) ---
  {
    id: 'his-1',
    name: 'Parroquia de Nuestra Señora de los Dolores',
    artisan: 'Monumento Histórico Nacional (INAH)',
    category: 'historico',
    categoryName: 'Cuna de la Independencia de México',
    pinColor: 'red',
    address: 'Frente al Jardín de los Héroes, Centro Histórico',
    lat: 21.1564,
    lng: -100.9324,
    phone: '+524181820038',
    whatsapp: '',
    schedule: 'Abierto diario 7:00 - 20:00 hrs (Entrada Libre)',
    history: 'Monumento histórico cumbre de la patria. Frente a su pórtico barroco churrigueresco del siglo XVIII, en la madrugada del 16 de septiembre de 1810, el cura Don Miguel Hidalgo y Costilla convocó al pueblo haciendo repicar la campana histórica para iniciar la lucha por la Independencia.',
    rating: 5.0,
    reviewsCount: 820,
    verified: true,
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80',
    tags: ['Grito de Independencia', 'Barroco Churrigueresco', 'Sitio Histórico'],
    catalog: []
  },
  {
    id: 'his-2',
    name: 'Museo Casa de Don Miguel Hidalgo y Costilla',
    artisan: 'Secretaría de Cultura / INAH',
    category: 'historico',
    categoryName: 'Museo Histórico Casona Cural',
    pinColor: 'red',
    address: 'Calle Morelos #1, esq. Hidalgo',
    lat: 21.1552,
    lng: -100.9318,
    phone: '+524181820271',
    whatsapp: '',
    schedule: 'Martes a Domingo 9:00 - 17:00 hrs',
    history: 'Hermosa casona del siglo XVIII habitada por Don Miguel Hidalgo. Conserva mobiliario de la época, estandartes insurgentes, libros de teología, biblioteca original y el patio donde se organizaban las tertulias libertarias.',
    rating: 4.9,
    reviewsCount: 450,
    verified: true,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
    tags: ['Casona de Hidalgo', 'Patrimonio Cultural', 'Recorridos Escolares'],
    catalog: []
  },
  {
    id: 'his-3',
    name: 'Museo de la Independencia Nacional (Antigua Cárcel)',
    artisan: 'Instituto Estatal de la Cultura',
    category: 'historico',
    categoryName: 'Museo de Sitio y Memoria Insurgente',
    pinColor: 'red',
    address: 'Calle Zacatecas #6, Centro',
    lat: 21.1571,
    lng: -100.9334,
    phone: '+524181820121',
    whatsapp: '',
    schedule: 'Martes a Domingo 9:30 - 17:30 hrs',
    history: 'Edificio que albergó la cárcel real en 1810, de donde el cura Miguel Hidalgo liberó a los presos novohispanos la noche del 15 de septiembre para sumarlos a las fuerzas del movimiento insurgente.',
    rating: 4.8,
    reviewsCount: 380,
    verified: true,
    image: 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?auto=format&fit=crop&w=800&q=80',
    tags: ['Antigua Cárcel 1810', 'Salas Interactivas', 'Historia Insurgente'],
    catalog: []
  },
  {
    id: 'his-4',
    name: 'Museo Bicentenario y Casa de Visitas',
    artisan: 'Patrimonio Municipal de Dolores Hidalgo',
    category: 'historico',
    categoryName: 'Casona Señorial Virreinal',
    pinColor: 'red',
    address: 'Plaza Principal Poniente',
    lat: 21.1559,
    lng: -100.9331,
    phone: '+524181820400',
    whatsapp: '',
    schedule: 'Lunes a Domingo 10:00 - 18:00 hrs',
    history: 'Suntuosa mansión barroca novohispana construida en 1786. Ha hospedado a presidentes y jefes de estado durante las ceremonias patrias del 15 de septiembre.',
    rating: 4.9,
    reviewsCount: 210,
    verified: true,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    tags: ['Casa Señorial', 'Arquitectura Virreinal', 'Mirador'],
    catalog: []
  },
  {
    id: 'his-5',
    name: 'Mausoleo de José Alfredo Jiménez',
    artisan: 'Panteón Municipal Virgen de los Dolores',
    category: 'historico',
    categoryName: 'Monumento Cultural y Sepulcro del Rey',
    pinColor: 'red',
    address: 'Calzada de los Héroes s/n',
    lat: 21.1525,
    lng: -100.9238,
    phone: '+524181820010',
    whatsapp: '',
    schedule: 'Abierto todos los días 8:00 - 18:00 hrs',
    history: 'Monumento fúnebre erigido al compositor y cantautor más grande de la música vernácula mexicana, en forma de sarape monumental y sombrero de charro cubierto de azulejos policromados de mayólica dolorense.',
    rating: 4.9,
    reviewsCount: 620,
    verified: true,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    tags: ['José Alfredo Jiménez', 'Sarape Monumental', 'Talavera Dolorense'],
    catalog: []
  }
];

export const PROBLEM_TYPES = [
  { id: 'alumbrado', label: 'Alumbrado Público', icon: '💡', description: 'Luminaria apagada, parpadeo o poste dañado' },
  { id: 'basura', label: 'Acumulación de Basura', icon: '🗑️', description: 'Contenedores desbordados o basura en vía pública' },
  { id: 'vialidad', label: 'Vialidad y Baches', icon: '🚧', description: 'Baches en asfalto/empedrado tradicional, banqueta rota' },
  { id: 'parques', label: 'Parques y Jardines', icon: '🌳', description: 'Mobiliario urbano roto, áreas verdes sin podar' },
  { id: 'agua', label: 'Fugas de Agua / Drenaje', icon: '🚰', description: 'Fuga de agua potable, alcantarilla tapada o rota' }
];

export const INITIAL_CITIZEN_REPORTS = [
  {
    id: 'rep-1',
    folio: 'FOL-2026-DH-1042',
    problemType: 'alumbrado',
    problemTypeName: 'Alumbrado Público',
    address: 'Calle Puebla esquina con Hidalgo, Centro',
    lat: 21.1567,
    lng: -100.9333,
    description: 'Luminaria colonial estilo farol apagada desde hace 3 noches cerca de los talleres de Talavera, oscureciendo el paso de turistas.',
    status: 'en_atencion',
    statusLabel: 'En Atención',
    statusColor: '#d97706',
    date: '2026-10-02 19:40',
    citizenName: 'Leticia Morales',
    photoUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rep-2',
    folio: 'FOL-2026-DH-1043',
    problemType: 'vialidad',
    problemTypeName: 'Vialidad y Baches',
    address: 'Calle Michoacán frente al #30, Barrio San Juan',
    lat: 21.1576,
    lng: -100.9312,
    description: 'Hundimiento y desprendimiento de piedras del empedrado colonial tradicional que dificulta el tránsito vehicular y peatonal.',
    status: 'reportado',
    statusLabel: 'Reportado',
    statusColor: '#2563eb',
    date: '2026-10-03 11:15',
    citizenName: 'Pedro Valenzuela',
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rep-3',
    folio: 'FOL-2026-DH-1039',
    problemType: 'basura',
    problemTypeName: 'Acumulación de Basura',
    address: 'Portal Morelos esquina Jardín de los Héroes',
    lat: 21.1557,
    lng: -100.9320,
    description: 'Contenedor de residuos turísticos lleno tras la afluencia del fin de semana cerca de la zona de neverías.',
    status: 'resuelto',
    statusLabel: 'Resuelto',
    statusColor: '#16a34a',
    date: '2026-09-29 16:30',
    citizenName: 'Elena Barrientos',
    photoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80'
  }
];

export const CULTURAL_EVENTS = [
  {
    id: 'ev-1',
    title: 'Fiestas Patrias de Dolores Hidalgo 2026',
    date: '10 al 20 de Septiembre de 2026',
    location: 'Plaza Principal y Atrio Parroquial',
    description: 'La máxima fiesta cívica de México en el sitio exacto donde se proclamó la Independencia. Conciertos en el Teatro del Pueblo, espectáculo piromusical y ceremonia solemne del Grito.',
    badge: 'Evento Magno',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ev-2',
    title: 'Festival Nacional de la Nieve Tradicional',
    date: '28 al 31 de Mayo de 2026',
    location: 'Jardín del Grande Hidalgo',
    description: 'Encuentro culinario con más de 80 neveros artesanales presentando más de 50 sabores exóticos de nieve en barricas de roble y madera.',
    badge: 'Gastronomía Típica',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ev-3',
    title: 'Ruta de la Talavera y Alfarería Dolorense',
    date: 'Todo el año (Especial fines de semana)',
    location: 'Barrio San Juan, San Cristóbal y Centro',
    description: 'Circuito vivencial donde los visitantes ingresan directamente a los hornos y tornos de los artesanos para modelar su propia pieza de barro vidriado.',
    badge: 'Ruta Vivencial',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
  }
];
