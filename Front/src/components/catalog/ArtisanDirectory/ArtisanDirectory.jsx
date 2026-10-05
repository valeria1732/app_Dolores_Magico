import React, { useState } from 'react';
import './ArtisanDirectory.css';

export default function ArtisanDirectory({ points, onSelectPoint, onNavigateToMap }) {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar solo talleres y neverías (o incluir sitios si se busca)
  const directoryList = points.filter((p) => {
    const isCommercial = p.category === 'talavera' || p.category === 'nieves';
    const matchesFilter =
      activeFilter === 'todos'
        ? isCommercial
        : p.category === activeFilter;

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.artisan && p.artisan.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="artisan-directory-view">
      <div className="directory-header">
        <span className="directory-badge">🏺 ECONOMÍA LOCAL Y COMERCIO JUSTO</span>
        <h2 className="directory-title">Directorio de Talleres y Neverías Tradicionales</h2>
        <p className="directory-subtitle">
          Compra directamente a las familias de maestros artesanos y neveros de Dolores Hidalgo. Cero comisiones de intermediarios y trato 100% directo por WhatsApp o llamada.
        </p>

        {/* Filtros de Categoría */}
        <div className="directory-controls">
          <div className="directory-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por taller, maestro artesano o producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="directory-filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'todos' ? 'active' : ''}`}
              onClick={() => setActiveFilter('todos')}
            >
              Todos los Productores ({points.filter(p => p.category === 'talavera' || p.category === 'nieves').length})
            </button>
            <button
              className={`filter-tab talavera ${activeFilter === 'talavera' ? 'active' : ''}`}
              onClick={() => setActiveFilter('talavera')}
            >
              🏺 Talleres de Talavera
            </button>
            <button
              className={`filter-tab nieves ${activeFilter === 'nieves' ? 'active' : ''}`}
              onClick={() => setActiveFilter('nieves')}
            >
              🍧 Neverías Artesanales
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Tarjetas de Artesanos */}
      <div className="artisan-grid">
        {directoryList.map((artisan) => (
          <div key={artisan.id} className="artisan-card">
            <div className="artisan-card-media">
              <img src={artisan.image} alt={artisan.name} loading="lazy" />
              <span className={`artisan-tag-badge tag-${artisan.category}`}>
                {artisan.categoryName}
              </span>
              <span className="artisan-rating-pill">
                ⭐ {artisan.rating} ({artisan.reviewsCount})
              </span>
            </div>

            <div className="artisan-card-content">
              <h3 className="artisan-name">{artisan.name}</h3>
              <p className="artisan-author">
                <strong>Maestro(a):</strong> {artisan.artisan}
              </p>
              <p className="artisan-address">
                📍 {artisan.address}
              </p>
              <p className="artisan-snippet">
                {artisan.history}
              </p>

              {/* Tags de características */}
              {artisan.tags && (
                <div className="artisan-tags">
                  {artisan.tags.map((tag, idx) => (
                    <span key={idx} className="artisan-tag-item">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Botones de acción directa */}
              <div className="artisan-card-actions">
                <button
                  className="btn-details"
                  onClick={() => onSelectPoint(artisan)}
                >
                  Ver Ficha y Catálogo ({artisan.catalog ? artisan.catalog.length : 0})
                </button>

                {artisan.whatsapp && (
                  <a
                    href={`https://wa.me/${artisan.whatsapp}?text=${encodeURIComponent(`Hola ${artisan.artisan}, vi su taller en DoloresMágico App y me interesa consultar sus piezas artesanales.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp-quick"
                    title="Contactar directamente por WhatsApp"
                  >
                    💬 WhatsApp
                  </a>
                )}

                <button
                  className="btn-locate-map"
                  onClick={() => onNavigateToMap(artisan)}
                  title="Ubicar en el mapa de Dolores Hidalgo"
                >
                  🗺️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
