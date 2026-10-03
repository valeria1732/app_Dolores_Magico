import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';

const FALLBACK_MERCHANTS = [
  {
    id: 'm1',
    name: 'Alfarería y Mayólica El Rincón del Artesano',
    owner: 'Mtro. Agustín Tovar',
    category: 'artesania',
    categoryName: 'Cerámica y Mayólica',
    description: 'Taller tradicional de alfarería vidriada y mayólica fina pintada a mano con iconografía del Bajío y técnicas virreinales.',
    address: 'Calle Puebla #42, Centro Histórico',
    lat: 21.1568,
    lng: -100.9332,
    phone: '+524181234501',
    schedule: 'Lun a Dom: 9:00 AM - 7:30 PM',
    isOpen: true,
    rating: 4.9,
    reviewsCount: 48,
    deliveryRadiusKm: 4.5,
    deliveryFee: 15,
    minOrder: 80,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80',
    avatar: '🏺',
    badges: ['Menos de 200m', 'Taller Familiar', 'Hecho a Mano']
  },
  {
    id: 'm2',
    name: 'Nieves Tradicionales La Flor de Dolores',
    owner: 'Doña Esperanza Barajas',
    category: 'gastronomia',
    categoryName: 'Nieves y Dulces Típicos',
    description: 'Las auténticas y afamadas nieves de garambullo, borrachita, mantecado, aguacate y tequila, preparadas en barricas de madera.',
    address: 'Portal Morelos #8, Frente al Jardín Principal',
    lat: 21.1558,
    lng: -100.9322,
    phone: '+524181234502',
    schedule: 'Lun a Dom: 10:00 AM - 9:00 PM',
    isOpen: true,
    rating: 5.0,
    reviewsCount: 112,
    deliveryRadiusKm: 3.0,
    deliveryFee: 10,
    minOrder: 50,
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=700&q=80',
    avatar: '🍧',
    badges: ['A 80m del Centro', 'Receta Centenaria', 'Entrega Inmediata']
  },
  {
    id: 'm3',
    name: 'Abarrotes y Granja Don Toño',
    owner: 'Antonio Morales',
    category: 'abarrotes',
    categoryName: 'Tienda de Barrio y Productos Locales',
    description: 'Tienda de proximidad con quesos frescos de rancho, miel virgen de la sierra, cajeta artesanal y canasta básica.',
    address: 'Calle San Cristóbal #19, Barrio San Cristóbal',
    lat: 21.1585,
    lng: -100.9351,
    phone: '+524181234503',
    schedule: 'Lun a Sáb: 7:30 AM - 9:30 PM',
    isOpen: true,
    rating: 4.8,
    reviewsCount: 35,
    deliveryRadiusKm: 2.5,
    deliveryFee: 10,
    minOrder: 60,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',
    avatar: '🧺',
    badges: ['A 350m', 'Comercio de Barrio', 'Precios Justos']
  },
  {
    id: 'm4',
    name: 'Panadería Tradicional El Horno de Hidalgo',
    owner: 'Familia Granados',
    category: 'gastronomia',
    categoryName: 'Panadería y Dulcería',
    description: 'Horno de mampostería tradicional donde se hornea diariamente pan de pulque, cemitas de trigo criollo y empanadas.',
    address: 'Calle Michoacán #104, Barrio San Juan',
    lat: 21.1573,
    lng: -100.9304,
    phone: '+524181234504',
    schedule: 'Lun a Dom: 6:30 AM - 9:00 PM',
    isOpen: true,
    rating: 4.9,
    reviewsCount: 76,
    deliveryRadiusKm: 3.5,
    deliveryFee: 12,
    minOrder: 40,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
    avatar: '🥖',
    badges: ['A 280m', 'Pan Caliente', 'Horno de Leña']
  },
  {
    id: 'm5',
    name: 'Taller Textil y Bordados Maye',
    owner: 'Mayeli Santillán',
    category: 'artesania',
    categoryName: 'Textil y Bordados Típicos',
    description: 'Prendas de lino bordadas a mano por mujeres artesanas de comunidades de Dolores, caminos de mesa y rebozos.',
    address: 'Calle Coahuila #55, Col. Lindavista',
    lat: 21.1532,
    lng: -100.9368,
    phone: '+524181234505',
    schedule: 'Mar a Sáb: 10:00 AM - 6:30 PM',
    isOpen: true,
    rating: 4.7,
    reviewsCount: 24,
    deliveryRadiusKm: 5.0,
    deliveryFee: 15,
    minOrder: 100,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=700&q=80',
    avatar: '🧵',
    badges: ['A 520m', 'Comercio Justo', 'Manos Indígenas']
  },
  {
    id: 'm6',
    name: 'Huerto y Frutería de Proximidad La Cosecha',
    owner: 'Ernesto Ramírez',
    category: 'alimentos',
    categoryName: 'Frutas, Verduras y Huertos Locales',
    description: 'Frutas y hortalizas cosechadas por pequeños productores de Dolores. Fresas orgánicas, nopales tiernos y hierbas.',
    address: 'Calle Guanajuato #88, San Cristóbal',
    lat: 21.1601,
    lng: -100.9362,
    phone: '+524181234506',
    schedule: 'Lun a Sáb: 7:00 AM - 6:00 PM',
    isOpen: true,
    rating: 4.8,
    reviewsCount: 41,
    deliveryRadiusKm: 4.0,
    deliveryFee: 10,
    minOrder: 50,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=700&q=80',
    avatar: '🥬',
    badges: ['A 650m', 'Directo del Productor', 'Fresco del Día']
  }
];

const FALLBACK_PRODUCTS = [
  {
    id: 'p1',
    merchantId: 'm1',
    name: "Jarrón de Mayólica Talaverana 'Dolores'",
    price: 280,
    category: 'artesania',
    description: 'Jarrón artesanal de 25 cm vidriado en doble cocción con óxido de cobalto azul y motivos florales.',
    unit: 'pieza',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    badge: 'Más Vendido'
  },
  {
    id: 'p2',
    merchantId: 'm1',
    name: 'Juego de 4 Tazas Mayólica Artesanal',
    price: 190,
    category: 'artesania',
    description: 'Tazas para café o chocolate con barro local y acabados resistentes al lavavajillas.',
    unit: 'juego',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    badge: 'Hecho en Dolores'
  },
  {
    id: 'p4',
    merchantId: 'm2',
    name: 'Litro de Nieve Artesanal de Garambullo',
    price: 120,
    category: 'gastronomia',
    description: 'Elaborada con el fruto del cacto silvestre dolorense. Sabor frutal intenso y exótico, 100% natural.',
    unit: 'litro',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    badge: 'Especialidad Dolorense'
  },
  {
    id: 'p5',
    merchantId: 'm2',
    name: 'Litro de Nieve de Borrachita y Tequila',
    price: 130,
    category: 'gastronomia',
    description: 'Combinación emblemática de tuna cardona con toque de destilado guanajuatense.',
    unit: 'litro',
    image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80',
    badge: 'Sabor Insignia'
  },
  {
    id: 'p7',
    merchantId: 'm3',
    name: 'Queso Ranchero Fresco Artesanal (500g)',
    price: 65,
    category: 'abarrotes',
    description: 'Queso de leche entera de vacas de pastoreo local de las rancherías de Dolores.',
    unit: 'pieza 500g',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
    badge: 'Del Rancho'
  },
  {
    id: 'p8',
    merchantId: 'm3',
    name: 'Miel de Abeja Virgen del Mezquital (750g)',
    price: 95,
    category: 'abarrotes',
    description: 'Miel cruda de flor de mezquite, extraída en frío por apicultores locales.',
    unit: 'frasco 750g',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    badge: '100% Pura'
  },
  {
    id: 'p10',
    merchantId: 'm4',
    name: 'Docena de Pan de Pulque Tradicional',
    price: 72,
    category: 'gastronomia',
    description: 'Receta virreinal fermentada naturalmente con aguamiel de maguey del semidesierto.',
    unit: 'docena (12 pzas)',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    badge: 'Recién Horneado'
  },
  {
    id: 'p12',
    merchantId: 'm5',
    name: "Camino de Mesa Bordado a Mano 'Flora'",
    price: 320,
    category: 'artesania',
    description: 'Pieza textil de 1.80m bordada con hilo de algodón sobre manta cruda.',
    unit: 'pieza',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    badge: 'Pieza Única'
  },
  {
    id: 'p14',
    merchantId: 'm6',
    name: 'Caja de Fresas Orgánicas del Valle (1 kg)',
    price: 48,
    category: 'alimentos',
    description: 'Fresas dulces cortadas por la mañana en huertos familiares cercanos a la presa.',
    unit: 'caja 1 kg',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    badge: 'Cosecha de Hoy'
  }
];

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371;
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

function formatDistance(distKm) {
  const meters = Math.round(distKm * 1000);
  const walkingMin = Math.max(1, Math.round((meters / 1000) * 12));
  return {
    meters,
    km: Number(distKm.toFixed(2)),
    text: meters < 1000 ? `${meters} m` : `${distKm.toFixed(1)} km`,
    walkingText: `${walkingMin} min a pie`
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState('catalogTab');
  const [userLocation, setUserLocation] = useState({
    lat: 21.15605,
    lng: -100.93245,
    name: 'Jardín Principal (Centro)'
  });
  const [maxDistanceKm, setMaxDistanceKm] = useState(2.5);
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState('merchants');

  const [merchants, setMerchants] = useState(FALLBACK_MERCHANTS);
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1001',
      merchantId: 'm2',
      merchantName: 'Nieves Tradicionales La Flor de Dolores',
      customerName: 'María Fernanda Ruiz',
      customerPhone: '+524185551234',
      deliveryType: 'delivery',
      address: 'Calle Guerrero #14, Centro',
      distanceMeters: 210,
      items: [{ name: 'Litro de Nieve Artesanal de Garambullo', price: 120, quantity: 1 }],
      total: 130,
      status: 'en_preparacion'
    }
  ]);

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dolores_cart_react') || '[]');
    } catch {
      return [];
    }
  });

  const [deliveryType, setDeliveryType] = useState('pickup');
  const [selectedMerchantDetail, setSelectedMerchantDetail] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [isNewMerchantOpen, setIsNewMerchantOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [portalMerchantId, setPortalMerchantId] = useState('m1');

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mapMarkersRef = useRef([]);
  const circleRef = useRef(null);

  // Guardar carrito
  useEffect(() => {
    localStorage.setItem('dolores_cart_react', JSON.stringify(cart));
  }, [cart]);

  // Fetch datos desde backend API con fallback
  useEffect(() => {
    fetchMerchants();
    fetchProducts();
    fetchOrders();
  }, [userLocation]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const fetchMerchants = async () => {
    try {
      const res = await fetch(`/api/merchants?lat=${userLocation.lat}&lng=${userLocation.lng}&sortBy=${sortBy}`);
      if (res.ok) {
        const data = await res.json();
        if (data.merchants && data.merchants.length) {
          setMerchants(data.merchants);
        }
      }
    } catch (e) {
      console.warn('Backend no disponible, usando catálogo local:', e);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products?lat=${userLocation.lat}&lng=${userLocation.lng}`);
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length) {
          setProducts(data.products);
        }
      }
    } catch (e) {
      console.warn('Backend productos fallback:', e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.orders) setOrders(data.orders);
      }
    } catch (e) {
      console.warn('Backend orders fallback:', e);
    }
  };

  // Calcular distancias dinámicamente sobre los comercios
  const enrichedMerchants = merchants.map((m) => {
    const distKm = calculateDistanceKm(userLocation.lat, userLocation.lng, m.lat, m.lng);
    const distInfo = formatDistance(distKm);
    const mProducts = products.filter((p) => p.merchantId === m.id);
    return {
      ...m,
      distance: distInfo,
      productCount: mProducts.length
    };
  });

  // Filtrado y ordenamiento de comercios
  let filteredMerchants = enrichedMerchants.filter((m) => {
    if (selectedCategory !== 'todas' && m.category !== selectedCategory) return false;
    if (m.distance.km > maxDistanceKm) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.categoryName.toLowerCase().includes(q) ||
        m.address.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (sortBy === 'distance') {
    filteredMerchants.sort((a, b) => a.distance.meters - b.distance.meters);
  } else if (sortBy === 'rating') {
    filteredMerchants.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'name') {
    filteredMerchants.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Filtrado de productos standalone
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'todas' && p.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  // Manejo del mapa con Leaflet
  useEffect(() => {
    if (activeTab === 'mapTab' && mapContainerRef.current) {
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current).setView([userLocation.lat, userLocation.lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap &bull; Dolores Cercano'
        }).addTo(map);
        mapInstanceRef.current = map;
      } else {
        mapInstanceRef.current.invalidateSize();
        mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 15);
      }

      // Limpiar capas previas
      mapMarkersRef.current.forEach((m) => mapInstanceRef.current.removeLayer(m));
      mapMarkersRef.current = [];
      if (circleRef.current) mapInstanceRef.current.removeLayer(circleRef.current);

      // Pin de usuario
      const userIcon = L.divIcon({
        className: 'user-pin-marker',
        html: `<div style="background: #3B82F6; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const userPin = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`<strong>📍 Tu Ubicación</strong><br>${userLocation.name}`);
      mapMarkersRef.current.push(userPin);

      // Círculo de radio de proximidad
      circleRef.current = L.circle([userLocation.lat, userLocation.lng], {
        color: '#C25930',
        fillColor: '#C25930',
        fillOpacity: 0.08,
        radius: maxDistanceKm * 1000
      }).addTo(mapInstanceRef.current);

      // Marcadores de comercios
      filteredMerchants.forEach((m) => {
        const pinIcon = L.divIcon({
          className: 'shop-pin-marker',
          html: `<div class="custom-leaflet-pin"><span>${m.avatar || '🏪'}</span></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -32]
        });

        const shopMarker = L.marker([m.lat, m.lng], { icon: pinIcon }).addTo(mapInstanceRef.current);
        const popupContent = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 190px;">
            <div style="font-size: 0.72rem; color: #C25930; font-weight: 700; text-transform: uppercase;">${m.categoryName}</div>
            <strong style="font-size: 0.95rem; color: #1A365D; display: block; margin: 2px 0;">${m.name}</strong>
            <p style="font-size: 0.78rem; color: #57534E; margin: 4px 0;">📍 ${m.address}</p>
            <div style="background: #FDF2ED; color: #C25930; font-weight: 700; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; margin: 6px 0;">
              A solo ${m.distance.text} (${m.distance.walkingText})
            </div>
          </div>
        `;
        shopMarker.bindPopup(popupContent);
        mapMarkersRef.current.push(shopMarker);
      });
    }
  }, [activeTab, userLocation, maxDistanceKm, filteredMerchants]);

  // Carrito helpers
  const addToCart = (product) => {
    const merchant = merchants.find((m) => m.id === product.merchantId);
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.productId === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [
        ...prev,
        {
          productId: product.id,
          merchantId: product.merchantId,
          merchantName: merchant ? merchant.name : 'Comercio Local',
          merchantPhone: merchant ? merchant.phone : '+524180000000',
          merchantDeliveryFee: merchant ? merchant.deliveryFee : 10,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }
      ];
    });
    showToast(`🛒 "${product.name}" agregado a tu canasta`);
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const deliveryFee = cart.length > 0 && deliveryType === 'delivery' ? cart[0].merchantDeliveryFee || 10 : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  // Checkout submit
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const customerName = form.customerName.value.trim();
    const customerPhone = form.customerPhone.value.trim();
    const address = form.address ? form.address.value.trim() : 'Recoge en tienda';
    const note = form.note ? form.note.value.trim() : '';

    if (!customerName || !customerPhone) return;

    const merchantId = cart[0].merchantId;
    const merchant = merchants.find((m) => m.id === merchantId) || { name: cart[0].merchantName, phone: '+524181234501' };

    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      merchantId,
      merchantName: merchant.name,
      customerName,
      customerPhone,
      deliveryType,
      address: deliveryType === 'pickup' ? 'Recoge en tienda: ' + merchant.address : address,
      distanceMeters: 200,
      items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
      total: cartTotal,
      status: 'en_preparacion',
      createdAt: new Date().toISOString()
    };

    // Intentar POST a backend
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch {
      // Ignorar si el backend no responde
    }

    setOrders((prev) => [newOrder, ...prev]);

    // Mensaje de WhatsApp
    const itemLines = cart.map((i) => `• ${i.quantity}x ${i.name} ($${i.price * i.quantity})`).join('\n');
    const waText = encodeURIComponent(
      `¡Hola ${merchant.name}! Acabo de hacer el pedido *#${orderId}* en Dolores Cercano:\n\n${itemLines}\n\n*Total:* $${cartTotal} MXN\n*Modalidad:* ${deliveryType === 'pickup' ? 'Paso a recoger' : 'Entrega local'}\n*Cliente:* ${customerName} (${customerPhone})`
    );
    const whatsappUrl = `https://wa.me/${merchant.phone.replace(/[^0-9]/g, '')}?text=${waText}`;

    setCart([]);
    setIsCheckoutOpen(false);
    setOrderSuccess({ order: newOrder, whatsappUrl });
    showToast(`🎉 ¡Pedido #${orderId} registrado!`);
  };

  // Agregar producto desde portal
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newProd = {
      id: 'p' + Date.now(),
      merchantId: form.merchantId.value,
      name: form.name.value,
      price: parseFloat(form.price.value),
      category: form.category.value,
      unit: form.unit.value || 'pieza',
      description: form.description.value,
      badge: form.badge.value || 'Local',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
    };

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      });
    } catch {}

    setProducts((prev) => [newProd, ...prev]);
    setIsNewProductOpen(false);
    showToast(`✨ Producto "${newProd.name}" publicado`);
  };

  // Agregar comercio desde portal
  const handleCreateMerchant = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newM = {
      id: 'm' + Date.now(),
      name: form.name.value,
      owner: form.owner.value,
      category: form.category.value,
      categoryName: form.category.value === 'artesania' ? 'Cerámica y Mayólica' : 'Comercio de Barrio',
      phone: form.phone.value,
      address: form.address.value,
      description: form.description.value,
      schedule: form.schedule.value || 'Lun a Sáb: 9:00 AM - 7:00 PM',
      deliveryRadiusKm: 3.5,
      deliveryFee: 12,
      minOrder: 50,
      rating: 5.0,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',
      avatar: '🏪',
      badges: ['Nuevo Comercio', 'De Proximidad'],
      lat: 21.15605 + (Math.random() - 0.5) * 0.008,
      lng: -100.93245 + (Math.random() - 0.5) * 0.008
    };

    try {
      await fetch('/api/merchants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newM)
      });
    } catch {}

    setMerchants((prev) => [newM, ...prev]);
    setPortalMerchantId(newM.id);
    setIsNewMerchantOpen(false);
    showToast(`🎉 ¡Comercio "${newM.name}" registrado!`);
  };

  const closestDistanceText = filteredMerchants[0]?.distance?.text || '~120 m';

  return (
    <div className="app-wrapper">
      {/* Barra de anuncio superior */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <span>✨ <strong>Apoyo al Comercio Dolorense:</strong> Cero comisiones abusivas para tenderos y artesanos.</span>
          <div className="announcement-stats">
            <span className="pulse-dot"></span>
            <span>{merchants.length} Comercios &bull; Menos alejados primero</span>
          </div>
        </div>
      </div>

      {/* Encabezado */}
      <header className="main-header">
        <div className="container header-container">
          <div className="brand" onClick={() => setActiveTab('catalogTab')}>
            <div className="brand-symbol">
              <span className="brand-icon">🏺</span>
              <span className="brand-badge">PROXIMIDAD</span>
            </div>
            <div className="brand-text">
              <h1>Dolores <span>Cercano</span></h1>
              <p className="tagline">Mercado Hiperlocal &bull; Dolores Hidalgo, Gto.</p>
            </div>
          </div>

          {/* Selector de Ubicación */}
          <div className="location-chip" onClick={() => setIsLocationModalOpen(true)} title="Cambiar tu ubicación en Dolores Hidalgo">
            <div className="location-icon-wrapper">
              <span className="location-pulse"></span>
              <span className="loc-icon">📍</span>
            </div>
            <div className="location-info">
              <span className="loc-label">Tu ubicación de compra:</span>
              <strong>{userLocation.name}</strong>
            </div>
            <span className="loc-caret">▼</span>
          </div>

          {/* Pestañas de Navegación y Carrito */}
          <div className="header-actions">
            <nav className="nav-tabs">
              <button
                className={`nav-tab ${activeTab === 'catalogTab' ? 'active' : ''}`}
                onClick={() => setActiveTab('catalogTab')}
              >
                <span>🛍️</span> Explorar Comercios
              </button>
              <button
                className={`nav-tab ${activeTab === 'mapTab' ? 'active' : ''}`}
                onClick={() => setActiveTab('mapTab')}
              >
                <span>🗺️</span> Mapa de Proximidad
              </button>
              <button
                className={`nav-tab highlight-tab ${activeTab === 'merchantPortalTab' ? 'active' : ''}`}
                onClick={() => setActiveTab('merchantPortalTab')}
              >
                <span>🏪</span> Soy Comerciante / Vender
              </button>
            </nav>

            <button className="cart-trigger-btn" onClick={() => setIsCartOpen(true)}>
              <span>🛒</span>
              <span>Canasta</span>
              <span className="cart-count-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Radar de Proximidad */}
      <section className="hero-radar-section">
        <div className="container hero-radar-grid">
          <div className="hero-text-col">
            <div className="hero-pill">
              <span className="radar-ping"></span>
              <span>Algoritmo de Cercanía Activo &bull; Menos alejados primero</span>
            </div>
            <h2 className="hero-title">
              Compra directo a los comercios <span className="text-gradient">más cercanos a ti</span>
            </h2>
            <p className="hero-description">
              Conecta con los artesanos de mayólica, productores de nieves típicas, panaderías de leña y tienditas de barrio de Dolores Hidalgo. Ahorra tiempo, camina menos y apoya la economía de tu comunidad.
            </p>

            {/* Slider de Radio de Proximidad */}
            <div className="radar-controller-card">
              <div className="radar-header">
                <label>
                  <span>📡</span> <strong>Radio de proximidad:</strong>
                </label>
                <span className="range-display">
                  {maxDistanceKm < 1 ? `Hasta ${Math.round(maxDistanceKm * 1000)} m` : `Hasta ${maxDistanceKm.toFixed(1)} km`}
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="5.0"
                step="0.2"
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(parseFloat(e.target.value))}
                className="custom-slider"
              />
              <div className="slider-marks">
                <span>300 m (A la vuelta)</span>
                <span>1 km</span>
                <span>2.5 km</span>
                <span>5 km (Todo Dolores)</span>
              </div>
            </div>
          </div>

          <div className="hero-metrics-col">
            <div className="proximity-stat-card primary-stat">
              <div className="stat-number">{closestDistanceText}</div>
              <div className="stat-title">Comercio más cercano a tu punto</div>
              <div className="stat-desc">A solo 2 minutos caminando sin vehículo</div>
            </div>
            <div className="stat-pair-grid">
              <div className="proximity-stat-card">
                <div className="stat-number">{filteredMerchants.length}</div>
                <div className="stat-title">Comercios en tu radio</div>
                <div className="stat-badge">Verificados</div>
              </div>
              <div className="proximity-stat-card">
                <div className="stat-number">{products.length}+</div>
                <div className="stat-title">Productos Locales</div>
                <div className="stat-badge">Hechos en Dolores</div>
              </div>
            </div>
            <div className="delivery-modes-card">
              <div className="delivery-mode-pill">
                <span className="mode-icon">🚶‍♂️</span>
                <div>
                  <strong>Recogida Rápida (Click & Collect)</strong>
                  <small>Listo en 10 min &bull; $0 costo de envío</small>
                </div>
              </div>
              <div className="delivery-mode-pill">
                <span className="mode-icon">🛵</span>
                <div>
                  <strong>Entrega Hiperlocal de Barrio</strong>
                  <small>Bicicleta o moto vecinal &bull; Tarifa justa</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL POR PESTAÑA */}
      <main className="tab-content">
        <div className="container">

          {/* TAB 1: CATÁLOGO */}
          {activeTab === 'catalogTab' && (
            <div>
              {/* Barra de Filtros */}
              <div className="filter-toolbar">
                <div className="search-input-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar artesano, nieve de garambullo, pan de pulque, abarrotes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button className="clear-search-btn" onClick={() => setSearchQuery('')}>&times;</button>
                  )}
                </div>

                <div className="sort-select-box">
                  <label>Ordenar por:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="distance">📍 Los menos alejados (Más cercanos primero)</option>
                    <option value="rating">⭐ Mejor calificados</option>
                    <option value="name">🔤 Nombre A-Z</option>
                  </select>
                </div>
              </div>

              {/* Categorías */}
              <div className="category-chips-bar">
                {[
                  { id: 'todas', label: 'Todos los Comercios', icon: '✨' },
                  { id: 'artesania', label: 'Cerámica & Mayólica', icon: '🏺' },
                  { id: 'gastronomia', label: 'Nieves & Dulces', icon: '🍧' },
                  { id: 'abarrotes', label: 'Tiendas de Barrio', icon: '🧺' },
                  { id: 'alimentos', label: 'Huertos & Frescos', icon: '🥬' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>

              {/* Título de Sección y Selector de Vista */}
              <div className="section-header-bar">
                <div>
                  <h3 className="section-heading">
                    {viewMode === 'merchants' ? `Comercios Locales (${filteredMerchants.length})` : `Productos (${filteredProducts.length})`}
                  </h3>
                  <p className="section-subheading">
                    Mostrando los menos alejados dentro de {maxDistanceKm} km desde {userLocation.name}
                  </p>
                </div>
                <div className="view-toggle-btns">
                  <button
                    className={`view-btn ${viewMode === 'merchants' ? 'active' : ''}`}
                    onClick={() => setViewMode('merchants')}
                  >
                    🏪 Ver por Comercios
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'products' ? 'active' : ''}`}
                    onClick={() => setViewMode('products')}
                  >
                    📦 Ver Productos
                  </button>
                </div>
              </div>

              {/* Vista Comercios */}
              {viewMode === 'merchants' && (
                <div className="merchants-grid">
                  {filteredMerchants.map((m) => {
                    const isSuperClose = m.distance.meters <= 300;
                    return (
                      <article key={m.id} className="merchant-card">
                        <div className="merchant-card-image-box">
                          <img src={m.image} alt={m.name} loading="lazy" />
                          <div className={`card-distance-badge ${isSuperClose ? 'super-close' : ''}`}>
                            <span>{isSuperClose ? '🟢' : '📍'}</span>
                            <span>{m.distance.text} &bull; {m.distance.walkingText}</span>
                          </div>
                          <div className="card-rating-badge">
                            <span>⭐</span> {m.rating} ({m.reviewsCount})
                          </div>
                        </div>

                        <div className="merchant-card-body">
                          <div className="merchant-header-row">
                            <div className="merchant-avatar">{m.avatar || '🏪'}</div>
                            <div className="merchant-title-col">
                              <span className="merchant-category-tag">{m.categoryName}</span>
                              <h4>{m.name}</h4>
                            </div>
                          </div>

                          <p className="merchant-desc">{m.description}</p>

                          <div className="merchant-meta-list">
                            <div className="merchant-meta-item">
                              <span>📍</span> <span>{m.address}</span>
                            </div>
                            <div className="merchant-meta-item">
                              <span>🕒</span> <span>{m.schedule}</span>
                            </div>
                            <div className="merchant-meta-item">
                              <span>🛵</span> <span>Envío local: ${m.deliveryFee} MXN &bull; Min. ${m.minOrder} MXN</span>
                            </div>
                          </div>

                          <div className="merchant-badges-row">
                            {m.badges?.map((b, i) => (
                              <span key={i} className="pill-badge">{b}</span>
                            ))}
                          </div>

                          <div className="merchant-card-footer">
                            <button
                              className="btn-view-shop"
                              onClick={() => setSelectedMerchantDetail(m)}
                            >
                              Ver Catálogo & Comprar ({m.productCount}) ➔
                            </button>
                            <button
                              className="btn-locate-map"
                              title="Ver en el mapa"
                              onClick={() => {
                                setActiveTab('mapTab');
                              }}
                            >
                              🗺️
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Vista Productos */}
              {viewMode === 'products' && (
                <div className="products-grid">
                  {filteredProducts.map((p) => {
                    const shop = merchants.find((m) => m.id === p.merchantId);
                    return (
                      <article key={p.id} className="product-card">
                        <div className="product-img-box">
                          <img src={p.image} alt={p.name} />
                          {p.badge && <span className="product-badge-tag">{p.badge}</span>}
                        </div>
                        <div className="product-card-body">
                          <div className="product-source-shop">
                            <span>🏪</span> {shop ? shop.name : 'Comercio Local'}
                          </div>
                          <h4 className="product-name">{p.name}</h4>
                          <p className="product-desc">{p.description}</p>
                          <div className="product-card-bottom">
                            <div className="product-price">
                              ${p.price} <small>MXN / {p.unit || 'pza'}</small>
                            </div>
                            <button className="btn-add-cart" onClick={() => addToCart(p)}>
                              <span>🛒</span> Agregar
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MAPA DE PROXIMIDAD */}
          {activeTab === 'mapTab' && (
            <div className="map-view-layout">
              <div className="map-sidebar">
                <div className="sidebar-header">
                  <h3>📍 Comercios en el Radar</h3>
                  <p>Selecciona un comercio para ver detalles y ruta rápida a pie.</p>
                </div>
                <div className="map-merchants-list">
                  {filteredMerchants.map((m) => (
                    <div
                      key={m.id}
                      className="map-list-item"
                      onClick={() => {
                        setSelectedMerchantDetail(m);
                        if (mapInstanceRef.current) {
                          mapInstanceRef.current.flyTo([m.lat, m.lng], 17);
                        }
                      }}
                    >
                      <div className="map-list-avatar">{m.avatar || '🏪'}</div>
                      <div className="map-list-info">
                        <strong>{m.name}</strong>
                        <small>{m.categoryName}</small>
                      </div>
                      <div className="map-list-dist">{m.distance.text}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="map-container-wrapper">
                <div ref={mapContainerRef} className="leaflet-map-element" style={{ width: '100%', height: '100%' }}></div>
                <div className="map-floating-legend">
                  <div className="legend-item"><span className="legend-dot user-dot"></span> Tu ubicación</div>
                  <div className="legend-item"><span className="legend-dot shop-dot"></span> Comercio menos alejado</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PORTAL DEL COMERCIANTE / VENDER */}
          {activeTab === 'merchantPortalTab' && (
            <div>
              <div className="merchant-portal-hero">
                <div className="portal-badge">PANEL DEL VENDEDOR LOCAL</div>
                <h2>Haz crecer tu negocio en Dolores Hidalgo sin comisiones</h2>
                <p>Publica tus artesanías, alimentos o abarrotes. Recibe pedidos directos a tu teléfono y coordina entregas de proximidad.</p>
                <div className="portal-actions-row">
                  <button className="btn btn-primary" onClick={() => setIsNewProductOpen(true)}>
                    ➕ Publicar Nuevo Producto
                  </button>
                  <button className="btn btn-secondary" onClick={() => setIsNewMerchantOpen(true)}>
                    🏪 Registrar Nuevo Negocio Local
                  </button>
                </div>
              </div>

              {/* Selector de Comercio en Administrador */}
              <div className="portal-merchant-selector-card">
                <label><strong>Administrando negocio:</strong></label>
                <select
                  value={portalMerchantId}
                  onChange={(e) => setPortalMerchantId(e.target.value)}
                  className="portal-select"
                >
                  {merchants.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.categoryName})</option>
                  ))}
                </select>
                <div className="portal-merchant-status">🟢 Abierto y listo para vender</div>
              </div>

              {/* Tablero de Pedidos e Inventario */}
              <div className="portal-dashboard-grid">
                {/* Columna Pedidos */}
                <div className="portal-card">
                  <div className="portal-card-header">
                    <div className="header-with-badge">
                      <h3>📦 Pedidos de Proximidad Recibidos</h3>
                      <span className="count-pill">{orders.filter((o) => o.merchantId === portalMerchantId).length}</span>
                    </div>
                    <button className="btn-refresh" onClick={() => { fetchOrders(); showToast('🔄 Pedidos actualizados'); }}>🔄</button>
                  </div>
                  <p className="card-caption">Gestiona el estado de entrega para que los clientes sepan cuándo recoger o esperar su pedido.</p>

                  <div className="orders-list-container">
                    {orders
                      .filter((o) => o.merchantId === portalMerchantId)
                      .map((o) => (
                        <div key={o.id} className="order-admin-card">
                          <div className="order-admin-header">
                            <span className="order-admin-id">#{o.id}</span>
                            <span className={`order-status-badge status-${o.status}`}>
                              {o.status === 'en_preparacion' ? 'En Preparación ⏳' : o.status === 'listo' ? 'Listo ✅' : 'Entregado 📦'}
                            </span>
                          </div>
                          <div className="order-client-info">
                            <strong>👤 {o.customerName}</strong> ({o.customerPhone})<br />
                            📍 {o.address} &bull; <small style={{ color: 'var(--primary)' }}>~{o.distanceMeters || 200}m de tu local</small>
                          </div>
                          <div className="order-items-snippet">
                            {o.items?.map((i) => `${i.quantity || 1}x ${i.name}`).join(', ')}
                          </div>
                          <div className="order-actions-bar">
                            <span className="order-total-price">${o.total} MXN</span>
                            <select
                              className="order-status-select"
                              value={o.status}
                              onChange={(e) => {
                                const newStatus = e.target.value;
                                setOrders((prev) =>
                                  prev.map((item) => (item.id === o.id ? { ...item, status: newStatus } : item))
                                );
                                showToast(`Estado de orden #${o.id} actualizado`);
                              }}
                            >
                              <option value="en_preparacion">En Preparación</option>
                              <option value="listo">Listo para Entrega</option>
                              <option value="entregado">Entregado</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    {orders.filter((o) => o.merchantId === portalMerchantId).length === 0 && (
                      <p style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                        No hay pedidos pendientes para este negocio.
                      </p>
                    )}
                  </div>
                </div>

                {/* Columna Inventario */}
                <div className="portal-card">
                  <div className="portal-card-header">
                    <div className="header-with-badge">
                      <h3>🏷️ Inventario Activo</h3>
                      <span className="count-pill">{products.filter((p) => p.merchantId === portalMerchantId).length}</span>
                    </div>
                    <button className="btn-small-add" onClick={() => setIsNewProductOpen(true)}>+ Añadir</button>
                  </div>
                  <p className="card-caption">Controla tus precios, unidades disponibles y productos destacados.</p>

                  <div className="portal-products-list">
                    {products
                      .filter((p) => p.merchantId === portalMerchantId)
                      .map((p) => (
                        <div key={p.id} className="portal-product-item">
                          <div className="portal-product-info">
                            <img src={p.image} alt={p.name} className="portal-product-thumb" />
                            <div className="portal-product-text">
                              <strong>{p.name}</strong>
                              <small>{p.category} &bull; {p.unit || 'pza'}</small>
                            </div>
                          </div>
                          <div className="portal-product-actions">
                            <span className="portal-product-price">${p.price}</span>
                            <button
                              className="btn-delete-prod"
                              onClick={() => {
                                setProducts((prev) => prev.filter((item) => item.id !== p.id));
                                showToast('🗑️ Producto eliminado');
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Métricas de Impacto */}
              <div className="portal-stats-row">
                <div className="metric-box">
                  <span className="metric-icon">💰</span>
                  <div className="metric-data">
                    <strong>$450 MXN</strong>
                    <small>Ventas totales registradas</small>
                  </div>
                </div>
                <div className="metric-box">
                  <span className="metric-icon">🚶</span>
                  <div className="metric-data">
                    <strong>210 metros</strong>
                    <small>Distancia promedio de tus clientes</small>
                  </div>
                </div>
                <div className="metric-box">
                  <span className="metric-icon">🌱</span>
                  <div className="metric-data">
                    <strong>4.2 kg CO₂</strong>
                    <small>Emisiones evitadas por compra hiperlocal</small>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODAL: DETALLE DEL COMERCIO Y PRODUCTOS */}
      {selectedMerchantDetail && (
        <div className="sheet-modal-overlay">
          <div className="sheet-modal">
            <div className="sheet-header">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <span style={{ fontSize: '2.2rem', background: 'var(--surface)', padding: '8px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  {selectedMerchantDetail.avatar || '🏪'}
                </span>
                <div>
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                    {selectedMerchantDetail.categoryName}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--secondary)' }}>
                    {selectedMerchantDetail.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    📍 {selectedMerchantDetail.address} &bull; <strong style={{ color: 'var(--primary)' }}>A {selectedMerchantDetail.distance?.text} ({selectedMerchantDetail.distance?.walkingText})</strong>
                  </p>
                </div>
              </div>
              <button className="sheet-close" onClick={() => setSelectedMerchantDetail(null)}>&times;</button>
            </div>

            <div className="sheet-body">
              <h4 style={{ marginBottom: '14px', color: 'var(--secondary)' }}>Productos Disponibles en este Comercio</h4>
              <div className="sheet-products-grid">
                {products
                  .filter((p) => p.merchantId === selectedMerchantDetail.id)
                  .map((p) => (
                    <div key={p.id} className="product-card" style={{ boxShadow: 'none' }}>
                      <div className="product-img-box" style={{ height: '120px' }}>
                        <img src={p.image} alt={p.name} />
                      </div>
                      <div className="product-card-body" style={{ padding: '12px' }}>
                        <h5 style={{ fontSize: '0.95rem', color: 'var(--secondary)' }}>{p.name}</h5>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{p.description}</p>
                        <div className="product-card-bottom">
                          <span style={{ fontWeight: 800, color: 'var(--primary)' }}>${p.price} MXN</span>
                          <button
                            className="btn-add-cart"
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                            onClick={() => addToCart(p)}
                          >
                            + Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER: CANASTA / CARRITO DE COMPRAS */}
      {isCartOpen && (
        <div className="drawer-overlay">
          <aside className="cart-drawer">
            <div className="drawer-header">
              <div className="drawer-title">
                <span className="drawer-icon">🛒</span>
                <div>
                  <h3>Tu Canasta Local</h3>
                  <small>Comercio dolorense directo</small>
                </div>
              </div>
              <button className="drawer-close" onClick={() => setIsCartOpen(false)}>&times;</button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="empty-cart-state">
                  <span className="empty-icon">🧺</span>
                  <h4>Tu canasta está vacía</h4>
                  <p>Explora los productos de los comercios menos alejados y apoya a tu comunidad.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.productId} className="cart-item-row">
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-unit-price">${item.price} MXN c/u</div>
                    </div>
                    <div className="cart-qty-controls">
                      <button className="btn-qty" onClick={() => updateCartQty(item.productId, -1)}>-</button>
                      <span className="qty-number">{item.quantity}</span>
                      <button className="btn-qty" onClick={() => updateCartQty(item.productId, 1)}>+</button>
                    </div>
                    <div className="cart-item-subtotal">${item.price * item.quantity}</div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="delivery-options-box">
                  <span className="options-title">Modalidad de Entrega:</span>
                  <div className="delivery-radios">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="pickup"
                        checked={deliveryType === 'pickup'}
                        onChange={() => setDeliveryType('pickup')}
                      />
                      <span>🚶‍♂️ Recoger en tienda (Sin costo)</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="delivery"
                        checked={deliveryType === 'delivery'}
                        onChange={() => setDeliveryType('delivery')}
                      />
                      <span>🛵 Entrega hiperlocal (+${cart[0]?.merchantDeliveryFee || 10} MXN)</span>
                    </label>
                  </div>
                </div>

                <div className="cost-summary">
                  <div className="cost-line">
                    <span>Subtotal:</span>
                    <strong>${cartSubtotal} MXN</strong>
                  </div>
                  <div className="cost-line">
                    <span>Envío:</span>
                    <strong>${deliveryFee} MXN</strong>
                  </div>
                  <div className="cost-line total-line">
                    <span>Total:</span>
                    <strong>${cartTotal} MXN</strong>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-checkout"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  Proceder al Pedido ➔
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* MODAL: CHECKOUT */}
      {isCheckoutOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-head">
              <h3>🛍️ Confirmar Pedido de Cercanía</h3>
              <button className="modal-close" onClick={() => setIsCheckoutOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <div className="form-group">
                <label>Tu Nombre Completo *</label>
                <input name="customerName" type="text" placeholder="Ej. Valeria Calvillo" required />
              </div>
              <div className="form-group">
                <label>Número de WhatsApp / Teléfono *</label>
                <input name="customerPhone" type="tel" placeholder="Ej. 418 123 4567" required />
              </div>
              {deliveryType === 'delivery' && (
                <div className="form-group">
                  <label>Dirección en Dolores Hidalgo *</label>
                  <input name="address" type="text" placeholder="Ej. Calle Guerrero #12, Centro" required />
                </div>
              )}
              <div className="form-group">
                <label>Notas o especificaciones para el artesano/tendero</label>
                <textarea name="note" rows="2" placeholder="Ej. Empaque para regalo, etc."></textarea>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn btn-secondary" onClick={() => setIsCheckoutOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Confirmar Pedido & Chat 💬</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ÉXITO DE ORDEN Y ENLACE WHATSAPP */}
      {orderSuccess && (
        <div className="modal-overlay">
          <div className="modal-card success-card">
            <div className="success-animation-icon">🎉</div>
            <h3>¡Pedido Realizado con Éxito!</h3>
            <span className="order-number-tag">#{orderSuccess.order.id}</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Tu orden está lista para enviarse al comercio de Dolores Hidalgo. Puedes abrir la conversación directa por WhatsApp:
            </p>
            <a href={orderSuccess.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp">
              <span>💬</span> Abrir Chat en WhatsApp con el Negocio
            </a>
            <button
              className="btn btn-secondary"
              style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
              onClick={() => setOrderSuccess(null)}
            >
              Listo, volver a la tienda
            </button>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRAR PRODUCTO */}
      {isNewProductOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-head">
              <h3>➕ Publicar Producto en tu Comercio</h3>
              <button className="modal-close" onClick={() => setIsNewProductOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreateProduct} className="standard-form">
              <div className="form-group">
                <label>Comercio *</label>
                <select name="merchantId" defaultValue={portalMerchantId}>
                  {merchants.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group flex-2">
                  <label>Nombre del Producto *</label>
                  <input name="name" type="text" placeholder="Ej. Vajilla Mayólica 16 piezas" required />
                </div>
                <div className="form-group flex-1">
                  <label>Precio ($ MXN) *</label>
                  <input name="price" type="number" placeholder="150" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Categoría</label>
                  <select name="category">
                    <option value="artesania">Cerámica & Mayólica</option>
                    <option value="gastronomia">Gastronomía & Nieves</option>
                    <option value="abarrotes">Abarrotes & Barrio</option>
                    <option value="alimentos">Huerto & Frescos</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>Unidad</label>
                  <input name="unit" type="text" defaultValue="pieza" />
                </div>
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea name="description" rows="2" placeholder="Detalles de elaboración..."></textarea>
              </div>
              <div className="form-group">
                <label>Etiqueta Especial</label>
                <input name="badge" type="text" placeholder="Ej. Más Vendido, Hecho a Mano" />
              </div>
              <div className="modal-actions-row">
                <button type="button" className="btn btn-secondary" onClick={() => setIsNewProductOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Producto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRAR COMERCIO */}
      {isNewMerchantOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-head">
              <h3>🏪 Registrar Comercio Local</h3>
              <button className="modal-close" onClick={() => setIsNewMerchantOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreateMerchant} className="standard-form">
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Nombre del Negocio *</label>
                  <input name="name" type="text" placeholder="Ej. Alfarería San Martín" required />
                </div>
                <div className="form-group flex-1">
                  <label>Propietario / Artesano *</label>
                  <input name="owner" type="text" placeholder="Ej. Juan Pérez" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Categoría *</label>
                  <select name="category">
                    <option value="artesania">Cerámica & Mayólica</option>
                    <option value="gastronomia">Nieves & Gastronomía</option>
                    <option value="abarrotes">Tienda de Barrio</option>
                    <option value="alimentos">Huertos & Frescos</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>WhatsApp *</label>
                  <input name="phone" type="tel" placeholder="+52 418 000 0000" required />
                </div>
              </div>
              <div className="form-group">
                <label>Dirección en Dolores Hidalgo *</label>
                <input name="address" type="text" placeholder="Ej. Calle Coahuila #30, Col. Lindavista" required />
              </div>
              <div className="form-group">
                <label>Descripción *</label>
                <textarea name="description" rows="2" placeholder="Describe brevemente tus productos..." required></textarea>
              </div>
              <div className="modal-actions-row">
                <button type="button" className="btn btn-secondary" onClick={() => setIsNewMerchantOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Registrar Comercio</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SELECTOR DE UBICACIÓN */}
      {isLocationModalOpen && (
        <div className="location-modal-overlay">
          <div className="location-modal">
            <div className="modal-head">
              <h3>📍 Ubicación en Dolores Hidalgo</h3>
              <button className="modal-close" onClick={() => setIsLocationModalOpen(false)}>&times;</button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Calculamos las distancias en tiempo real para mostrarte los comercios menos alejados.
            </p>
            <button
              className="btn-gps"
              onClick={() => {
                if (navigator.geolocation) {
                  showToast('🛰️ Obteniendo GPS...');
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      setUserLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        name: 'Mi Ubicación Real (GPS)'
                      });
                      setIsLocationModalOpen(false);
                      showToast('✅ Ubicación actualizada por GPS');
                    },
                    () => {
                      showToast('⚠️ No se pudo obtener GPS');
                    }
                  );
                }
              }}
            >
              <span>🎯</span> Detectar mi GPS en tiempo real
            </button>

            <div className="divider-text"><span>O elige una zona</span></div>

            <div className="preset-locations-grid">
              {[
                { name: 'Jardín Principal (Centro)', lat: 21.15605, lng: -100.93245, sub: 'Centro Histórico / Parroquia' },
                { name: 'Barrio San Cristóbal', lat: 21.1585, lng: -100.9351, sub: 'Calzada de los Héroes' },
                { name: 'Colonia Lindavista', lat: 21.1532, lng: -100.9368, sub: 'Zona de Talleres Alfareros' },
                { name: 'Calle Michoacán', lat: 21.1573, lng: -100.9304, sub: 'Panaderías Tradicionales' }
              ].map((loc, idx) => (
                <button
                  key={idx}
                  className={`preset-loc-btn ${userLocation.name === loc.name ? 'active' : ''}`}
                  onClick={() => {
                    setUserLocation(loc);
                    setIsLocationModalOpen(false);
                    showToast(`📍 Ubicación cambiada a: ${loc.name}`);
                  }}
                >
                  <strong>{loc.name}</strong>
                  <small>{loc.sub}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOAST DE NOTIFICACIÓN */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">{toastMessage}</div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="container footer-content">
          <div className="footer-col brand-col">
            <div className="brand-footer">
              <span>🏺</span>
              <strong>Dolores Cercano</strong>
            </div>
            <p>Plataforma de comercio de proximidad para potenciar la visibilidad de artesanos, neveros y tienditas de barrio en Dolores Hidalgo, Guanajuato.</p>
          </div>
          <div className="footer-col">
            <h4>Navegación</h4>
            <ul>
              <li><a href="#catalogo" onClick={() => setActiveTab('catalogTab')}>Catálogo de Cercanía</a></li>
              <li><a href="#mapa" onClick={() => setActiveTab('mapTab')}>Mapa Interactivo</a></li>
              <li><a href="#portal" onClick={() => setActiveTab('merchantPortalTab')}>Panel del Negocio Local</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Impacto Sostenible</h4>
            <p>Comprando en comercios menos alejados eliminas intermediarios, dinamizas las colonias locales y reduces la huella de carbono.</p>
            <span className="footer-signature">Dolores Mágico PMV &copy; 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
