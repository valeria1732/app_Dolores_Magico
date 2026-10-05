const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'database.json');

// Middleware
app.use(cors());
app.use(express.json());

// Servir la carpeta Front estáticamente para permitir navegación directa
const FRONT_PATH = path.join(__dirname, '..', 'Front');
if (fs.existsSync(FRONT_PATH)) {
  app.use(express.static(FRONT_PATH));
}

// Helpers para base de datos JSON
function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error leyendo base de datos:', err);
    return { merchants: [], products: [], orders: [], reports: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error escribiendo base de datos:', err);
    return false;
  }
}

// Cálculo de distancia geodésica (Haversine formula en kilómetros)
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Formatear distancia amigable (e.g., '140 m' o '1.4 km') y tiempo a pie
function formatDistanceInfo(distKm) {
  const meters = Math.round(distKm * 1000);
  const walkingMin = Math.max(1, Math.round((meters / 1000) * 12)); // 5 km/h aprox = 12 min/km
  let text = '';
  if (meters < 1000) {
    text = `${meters} m`;
  } else {
    text = `${distKm.toFixed(1)} km`;
  }
  return {
    meters,
    km: Number(distKm.toFixed(2)),
    text,
    walkingMin,
    walkingText: `${walkingMin} min a pie`
  };
}

// ==========================================
// RUTAS DE COMERCIOS (MERCHANTS)
// ==========================================

// GET /api/merchants - Listado con geolocalización y "Menos alejados primero"
app.get('/api/merchants', (req, res) => {
  const db = readDB();
  const { lat, lng, maxDistanceKm, category, search, sortBy } = req.query;

  // Centro por defecto: Jardín Principal de Dolores Hidalgo
  const userLat = lat ? parseFloat(lat) : 21.15605;
  const userLng = lng ? parseFloat(lng) : -100.93245;

  let results = db.merchants.map((m) => {
    const distKm = calculateDistanceKm(userLat, userLng, m.lat, m.lng);
    const distInfo = formatDistanceInfo(distKm);
    const merchantProducts = db.products.filter((p) => p.merchantId === m.id);
    return {
      ...m,
      distance: distInfo,
      productCount: merchantProducts.length
    };
  });

  // Filtro por categoría
  if (category && category !== 'todas') {
    results = results.filter((m) => m.category.toLowerCase() === category.toLowerCase());
  }

  // Filtro por búsqueda
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.address.toLowerCase().includes(q) ||
        m.categoryName.toLowerCase().includes(q)
    );
  }

  // Filtro por distancia máxima (radio de cercanía)
  if (maxDistanceKm) {
    const maxDist = parseFloat(maxDistanceKm);
    results = results.filter((m) => m.distance.km <= maxDist);
  }

  // Ordenamiento: Por defecto "menos alejados primero" (cercanía hiperlocal)
  if (sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // default: distancia ascendente (los comercios menos alejados primero)
    results.sort((a, b) => a.distance.meters - b.distance.meters);
  }

  res.json({
    total: results.length,
    userLocation: { lat: userLat, lng: userLng },
    merchants: results
  });
});

// GET /api/merchants/:id - Detalle de un comercio con sus productos
app.get('/api/merchants/:id', (req, res) => {
  const db = readDB();
  const merchant = db.merchants.find((m) => m.id === req.params.id);
  if (!merchant) {
    return res.status(404).json({ error: 'Comercio no encontrado' });
  }

  const { lat, lng } = req.query;
  const userLat = lat ? parseFloat(lat) : 21.15605;
  const userLng = lng ? parseFloat(lng) : -100.93245;
  const distKm = calculateDistanceKm(userLat, userLng, merchant.lat, merchant.lng);

  const products = db.products.filter((p) => p.merchantId === merchant.id);

  res.json({
    ...merchant,
    distance: formatDistanceInfo(distKm),
    products
  });
});

// POST /api/merchants - Registrar un nuevo comercio local
app.post('/api/merchants', (req, res) => {
  const db = readDB();
  const {
    name,
    owner,
    category,
    categoryName,
    description,
    address,
    lat,
    lng,
    phone,
    schedule,
    deliveryRadiusKm,
    deliveryFee,
    minOrder,
    image,
    avatar
  } = req.body;

  if (!name || !address || !category) {
    return res.status(400).json({ error: 'Nombre, dirección y categoría son obligatorios' });
  }

  const newMerchant = {
    id: 'm' + (Date.now()),
    name,
    owner: owner || 'Comerciante Local',
    category,
    categoryName: categoryName || 'Comercio de Proximidad',
    description: description || 'Negocio local de Dolores Hidalgo',
    address,
    lat: lat ? parseFloat(lat) : 21.15605 + (Math.random() - 0.5) * 0.01,
    lng: lng ? parseFloat(lng) : -100.93245 + (Math.random() - 0.5) * 0.01,
    phone: phone || '+524180000000',
    schedule: schedule || 'Lun a Sáb: 8:00 AM - 8:00 PM',
    isOpen: true,
    rating: 5.0,
    reviewsCount: 1,
    deliveryRadiusKm: deliveryRadiusKm ? parseFloat(deliveryRadiusKm) : 3.0,
    deliveryFee: deliveryFee !== undefined ? parseFloat(deliveryFee) : 10,
    minOrder: minOrder !== undefined ? parseFloat(minOrder) : 50,
    image: image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',
    avatar: avatar || '🏪',
    badges: ['Nuevo Comercio', 'De Proximidad', 'Dolores Hidalgo']
  };

  db.merchants.push(newMerchant);
  writeDB(db);

  res.status(201).json({
    message: 'Comercio registrado exitosamente',
    merchant: newMerchant
  });
});

// ==========================================
// RUTAS DE PRODUCTOS
// ==========================================

// GET /api/products - Explorador de productos con cercanía del comercio
app.get('/api/products', (req, res) => {
  const db = readDB();
  const { merchantId, category, search, maxPrice, lat, lng } = req.query;

  const userLat = lat ? parseFloat(lat) : 21.15605;
  const userLng = lng ? parseFloat(lng) : -100.93245;

  let results = db.products.map((p) => {
    const merchant = db.merchants.find((m) => m.id === p.merchantId);
    let distInfo = null;
    if (merchant) {
      const distKm = calculateDistanceKm(userLat, userLng, merchant.lat, merchant.lng);
      distInfo = formatDistanceInfo(distKm);
    }
    return {
      ...p,
      merchantName: merchant ? merchant.name : 'Comercio Local',
      merchantAddress: merchant ? merchant.address : '',
      merchantDistance: distInfo
    };
  });

  if (merchantId) {
    results = results.filter((p) => p.merchantId === merchantId);
  }

  if (category && category !== 'todas') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.merchantName && p.merchantName.toLowerCase().includes(q))
    );
  }

  if (maxPrice) {
    results = results.filter((p) => p.price <= parseFloat(maxPrice));
  }

  // Ordenar por cercanía del comercio de origen
  results.sort((a, b) => {
    const distA = a.merchantDistance ? a.merchantDistance.meters : 99999;
    const distB = b.merchantDistance ? b.merchantDistance.meters : 99999;
    return distA - distB;
  });

  res.json({
    total: results.length,
    products: results
  });
});

// POST /api/products - Agregar producto a un comercio
app.post('/api/products', (req, res) => {
  const db = readDB();
  const { merchantId, name, price, category, description, unit, image, badge, stockCount } = req.body;

  if (!merchantId || !name || price === undefined) {
    return res.status(400).json({ error: 'merchantId, nombre y precio son obligatorios' });
  }

  const merchant = db.merchants.find((m) => m.id === merchantId);
  if (!merchant) {
    return res.status(404).json({ error: 'Comercio no existe' });
  }

  const newProduct = {
    id: 'p' + (Date.now()),
    merchantId,
    name,
    price: parseFloat(price),
    category: category || merchant.category,
    description: description || 'Producto de alta calidad elaborado en Dolores Hidalgo.',
    inStock: true,
    stockCount: stockCount ? parseInt(stockCount, 10) : 10,
    unit: unit || 'pieza',
    image: image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    badge: badge || 'Local'
  };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json({
    message: 'Producto publicado con éxito',
    product: newProduct
  });
});

// PUT /api/products/:id - Actualizar producto
app.put('/api/products/:id', (req, res) => {
  const db = readDB();
  const index = db.products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  db.products[index] = {
    ...db.products[index],
    ...req.body
  };
  writeDB(db);

  res.json({
    message: 'Producto actualizado',
    product: db.products[index]
  });
});

// DELETE /api/products/:id - Eliminar producto
app.delete('/api/products/:id', (req, res) => {
  const db = readDB();
  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== req.params.id);

  if (db.products.length === initialLength) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  writeDB(db);
  res.json({ message: 'Producto eliminado correctamente' });
});

// ==========================================
// RUTAS DE PEDIDOS (ORDERS)
// ==========================================

// POST /api/orders - Crear nuevo pedido de proximidad
app.post('/api/orders', (req, res) => {
  const db = readDB();
  const {
    merchantId,
    customerName,
    customerPhone,
    deliveryType, // 'delivery' o 'pickup'
    address,
    items,
    note,
    userLat,
    userLng
  } = req.body;

  if (!merchantId || !items || !items.length || !customerName) {
    return res.status(400).json({ error: 'Faltan campos requeridos para procesar la orden' });
  }

  const merchant = db.merchants.find((m) => m.id === merchantId);
  if (!merchant) {
    return res.status(404).json({ error: 'Comercio no encontrado' });
  }

  let subtotal = 0;
  items.forEach((item) => {
    subtotal += item.price * (item.quantity || 1);
  });

  const deliveryFee = deliveryType === 'pickup' ? 0 : merchant.deliveryFee;
  const total = subtotal + deliveryFee;

  let distanceMeters = 200;
  if (userLat && userLng) {
    const distKm = calculateDistanceKm(userLat, userLng, merchant.lat, merchant.lng);
    distanceMeters = Math.round(distKm * 1000);
  }

  const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

  const newOrder = {
    id: orderId,
    merchantId: merchant.id,
    merchantName: merchant.name,
    customerName,
    customerPhone: customerPhone || 'Sin teléfono',
    deliveryType: deliveryType || 'delivery',
    address: deliveryType === 'pickup' ? 'Recoge en mostrador: ' + merchant.address : (address || 'Dirección de proximidad'),
    distanceMeters,
    items,
    subtotal,
    deliveryFee,
    total,
    status: 'en_preparacion',
    createdAt: new Date().toISOString(),
    note: note || ''
  };

  db.orders.unshift(newOrder);
  writeDB(db);

  // Generar texto para WhatsApp directo al comerciante
  const itemLines = items.map((i) => `• ${i.quantity}x ${i.name} ($${i.price * i.quantity})`).join('%0A');
  const tipoEntregaText = deliveryType === 'pickup' ? 'Paso a recoger' : `Entrega local a domicilio (${address})`;
  const waMessage = `¡Hola ${encodeURIComponent(merchant.name)}! Acabo de hacer el pedido *#${orderId}* en Dolores Mágico:%0A%0A${itemLines}%0A%0A*Total:* $${total} MXN%0A*Modalidad:* ${encodeURIComponent(tipoEntregaText)}%0A*Cliente:* ${encodeURIComponent(customerName)} (${encodeURIComponent(customerPhone)})%0A*Notas:* ${encodeURIComponent(note || 'Ninguna')}`;
  const whatsappUrl = `https://wa.me/${merchant.phone.replace(/[^0-9]/g, '')}?text=${waMessage}`;

  res.status(201).json({
    message: 'Pedido realizado con éxito',
    order: newOrder,
    whatsappUrl
  });
});

// GET /api/orders - Listar pedidos (con filtro por comercio)
app.get('/api/orders', (req, res) => {
  const db = readDB();
  const { merchantId, status } = req.query;

  let orders = db.orders;
  if (merchantId) {
    orders = orders.filter((o) => o.merchantId === merchantId);
  }
  if (status) {
    orders = orders.filter((o) => o.status === status);
  }

  res.json({
    total: orders.length,
    orders
  });
});

// PATCH /api/orders/:id/status - Actualizar estado de pedido
app.patch('/api/orders/:id/status', (req, res) => {
  const db = readDB();
  const { status } = req.body;
  const validStatuses = ['recibido', 'en_preparacion', 'listo', 'entregado', 'cancelado'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }

  const order = db.orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  writeDB(db);

  res.json({
    message: 'Estado del pedido actualizado',
    order
  });
});

// ==========================================
// RUTAS DE REPORTES CIUDADANOS (INCIDENCIAS URBANAS)
// ==========================================

// GET /api/reports - Listado de incidencias ciudadanas
app.get('/api/reports', (req, res) => {
  const db = readDB();
  const { status, problemType } = req.query;

  let reports = db.reports || [];
  if (status) {
    reports = reports.filter((r) => r.status === status);
  }
  if (problemType) {
    reports = reports.filter((r) => r.problemType === problemType);
  }

  res.json({
    total: reports.length,
    reports
  });
});

// POST /api/reports - Crear reporte ciudadano y generar folio de seguimiento
app.post('/api/reports', (req, res) => {
  const db = readDB();
  if (!db.reports) db.reports = [];

  const {
    problemType,
    problemTypeName,
    address,
    lat,
    lng,
    description,
    citizenName,
    citizenPhone,
    photoUrl,
    folio
  } = req.body;

  const year = new Date().getFullYear();
  const randomFolio = folio || `FOL-${year}-DH-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newReport = {
    id: `rep-${Date.now()}`,
    folio: randomFolio,
    problemType: problemType || 'alumbrado',
    problemTypeName: problemTypeName || 'Incidencia Urbana',
    address: address || 'Dolores Hidalgo C.I.N., Gto.',
    lat: lat || 21.15605,
    lng: lng || -100.93245,
    description: description || 'Sin descripción',
    status: 'reportado',
    statusLabel: 'Reportado',
    statusColor: '#2563eb',
    date: formattedDate,
    citizenName: citizenName || 'Ciudadano Dolorense',
    citizenPhone: citizenPhone || '',
    photoUrl: photoUrl || 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=600&q=80'
  };

  db.reports.unshift(newReport);
  writeDB(db);

  res.status(201).json({
    message: 'Reporte ciudadano registrado exitosamente',
    report: newReport
  });
});

// PATCH /api/reports/:id/status - Actualizar estatus del reporte
app.patch('/api/reports/:id/status', (req, res) => {
  const db = readDB();
  if (!db.reports) db.reports = [];

  const { status, statusLabel, statusColor } = req.body;
  const report = db.reports.find((r) => r.id === req.params.id || r.folio === req.params.id);

  if (!report) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }

  report.status = status;
  if (statusLabel) report.statusLabel = statusLabel;
  if (statusColor) report.statusColor = statusColor;
  report.updatedAt = new Date().toISOString();
  writeDB(db);

  res.json({
    message: 'Estatus del reporte actualizado correctamente',
    report
  });
});

// ==========================================
// ESTADÍSTICAS & CATEGORÍAS
// ==========================================

// GET /api/stats - Métricas de proximidad y derrama económica
app.get('/api/stats', (req, res) => {
  const db = readDB();
  const totalVolume = db.orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const avgDistance = db.orders.length
    ? Math.round(db.orders.reduce((acc, o) => acc + (o.distanceMeters || 300), 0) / db.orders.length)
    : 280;

  res.json({
    totalMerchants: db.merchants.length,
    totalProducts: db.products.length,
    totalOrders: db.orders.length,
    totalEconomicImpactMxn: totalVolume,
    averageProximityMeters: avgDistance,
    carbonOffsetKg: (db.orders.length * 1.8).toFixed(1) // Estimación de ahorro de emisiones por comprar hiperlocal
  });
});

// GET /api/categories - Categorías disponibles
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'todas', name: 'Todos los Comercios', icon: '📍', badge: 'Menos alejados' },
    { id: 'artesania', name: 'Cerámica y Mayólica', icon: '🏺', badge: 'Técnica Virreinal' },
    { id: 'gastronomia', name: 'Nieves y Gastronomía', icon: '🍧', badge: 'Sabores Típicos' },
    { id: 'abarrotes', name: 'Tiendas de Barrio', icon: '🧺', badge: 'Canasta Básica' },
    { id: 'alimentos', name: 'Huertos y Frescos', icon: '🥬', badge: 'Directo del Productor' }
  ];
  res.json(categories);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Dolores Mágico API - Comercio de Proximidad`);
  console.log(`📡 Servidor activo en http://localhost:${PORT}`);
  console.log(`🛒 Frontend accesible en http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
