import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';
import { CATEGORIES, MUNICIPALITY_CENTER } from '../../../data/doloresData';

export default function InteractiveMap({ points, onSelectPoint, selectedPoint }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [activeCategory, setActiveCategory] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPinDetail, setSelectedPinDetail] = useState(null);

  // Filtrado de puntos
  const filteredPoints = points.filter((pt) => {
    const matchesCategory = activeCategory === 'todas' || pt.category === activeCategory;
    const matchesSearch =
      pt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pt.artisan && pt.artisan.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pt.address && pt.address.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Inicializar Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [MUNICIPALITY_CENTER.lat, MUNICIPALITY_CENTER.lng],
        zoom: MUNICIPALITY_CENTER.zoom,
        zoomControl: true,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Dolores Hidalgo Pueblo Mágico'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Limpieza controlada
    };
  }, []);

  // Actualizar marcadores interactivos (Pines de colores según documento)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Limpiar marcadores previos
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Pines de colores según documento:
    // Azul: Talavera | Amarillo: Nieves | Rojo: Sitios Históricos
    filteredPoints.forEach((point) => {
      let pinColorHex = '#0d47a1'; // Azul por defecto
      let pinIconSymbol = '🏺';

      if (point.category === 'nieves') {
        pinColorHex = '#f59e0b'; // Amarillo
        pinIconSymbol = '🍧';
      } else if (point.category === 'historico') {
        pinColorHex = '#b91c1c'; // Rojo
        pinIconSymbol = '🔔';
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="custom-pin-bubble" style="background-color: ${pinColorHex}; border-color: ${pinColorHex};">
            <span class="pin-symbol">${pinIconSymbol}</span>
          </div>
          <div class="pin-pulse" style="border-color: ${pinColorHex};"></div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -36]
      });

      const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedPinDetail(point);
        if (onSelectPoint) onSelectPoint(point);
      });

      markersRef.current.push(marker);
    });
  }, [filteredPoints, onSelectPoint]);

  // Si se selecciona un punto externamente, centrar el mapa
  useEffect(() => {
    if (selectedPoint && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedPoint.lat, selectedPoint.lng], 16, {
        duration: 1.2
      });
      setSelectedPinDetail(selectedPoint);
    }
  }, [selectedPoint]);

  const handleCenterMunicipality = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([MUNICIPALITY_CENTER.lat, MUNICIPALITY_CENTER.lng], 15);
    }
  };

  return (
    <div className="interactive-map-view">
      {/* Barra de Filtros y Búsqueda */}
      <div className="map-toolbar">
        <div className="map-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar talleres de Talavera, neverías, museos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>

        {/* Categorías con Leyenda de Pines (Documento: Azul, Amarillo, Rojo) */}
        <div className="map-category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill ${activeCategory === cat.id ? 'active' : ''} ${cat.pinColor || ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.name}</span>
              {cat.badge && <span className="cat-badge-text">({cat.badge})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor del Mapa y Panel Flotante */}
      <div className="map-canvas-container">
        <div id="dolores-leaflet-map" ref={mapContainerRef} className="leaflet-map-element" />

        {/* Botón de Recentrado */}
        <button
          className="map-recenter-btn"
          onClick={handleCenterMunicipality}
          title="Centrar en Jardín Principal"
        >
          📍 Centrar en Dolores Hidalgo
        </button>

        {/* Leyenda Oficial en la Esquina */}
        <div className="map-official-legend">
          <div className="legend-title">Código de Pines Oficial</div>
          <div className="legend-item">
            <span className="legend-dot blue-dot"></span>
            <span><strong>Azul:</strong> Talleres de Talavera</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot yellow-dot"></span>
            <span><strong>Amarillo:</strong> Neverías Tradicionales</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot red-dot"></span>
            <span><strong>Rojo:</strong> Sitios Históricos y Museos</span>
          </div>
        </div>

        {/* Ficha Flotante del Punto Seleccionado (Pantalla 2 del documento) */}
        {selectedPinDetail && (
          <div className="map-floating-card">
            <button
              className="floating-card-close"
              onClick={() => setSelectedPinDetail(null)}
              aria-label="Cerrar ficha"
            >
              ×
            </button>

            <div className="floating-card-img-wrap">
              <img src={selectedPinDetail.image} alt={selectedPinDetail.name} />
              <span className={`floating-card-category-badge cat-${selectedPinDetail.category}`}>
                {selectedPinDetail.categoryName}
              </span>
            </div>

            <div className="floating-card-body">
              <h4 className="floating-card-title">{selectedPinDetail.name}</h4>
              <p className="floating-card-artisan">
                <strong>Responsable / Artesano:</strong> {selectedPinDetail.artisan}
              </p>
              <p className="floating-card-address">
                📍 {selectedPinDetail.address}
              </p>
              <p className="floating-card-desc">
                {selectedPinDetail.history}
              </p>

              {/* Botón directo de WhatsApp / Ficha Completa */}
              <div className="floating-card-actions">
                {selectedPinDetail.whatsapp && (
                  <a
                    href={`https://wa.me/${selectedPinDetail.whatsapp}?text=${encodeURIComponent(`Hola, vi su taller en DoloresMágico App y me gustaría información de sus artesanías/productos.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp-direct"
                  >
                    <span>💬 WhatsApp Directo</span>
                  </a>
                )}
                {onSelectPoint && (
                  <button
                    className="btn-view-catalog"
                    onClick={() => onSelectPoint(selectedPinDetail)}
                  >
                    Ver Catálogo ({selectedPinDetail.catalog ? selectedPinDetail.catalog.length : 0})
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
