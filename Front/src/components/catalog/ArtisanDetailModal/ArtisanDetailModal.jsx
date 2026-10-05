import React from 'react';
import './ArtisanDetailModal.css';

export default function ArtisanDetailModal({ artisan, onClose, onNavigateToMap }) {
  if (!artisan) return null;

  const catalog = artisan.catalog || [];

  return (
    <div className="artisan-modal-overlay" onClick={onClose}>
      <div className="artisan-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Encabezado con Imagen */}
        <div className="modal-banner-image">
          <img src={artisan.image} alt={artisan.name} />
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar ventana">
            ×
          </button>
          <div className="modal-banner-overlay">
            <span className={`modal-category-chip cat-${artisan.category}`}>
              {artisan.categoryName}
            </span>
            <h2 className="modal-artisan-title">{artisan.name}</h2>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="modal-content-scroll">
          {/* Ficha Resumen */}
          <div className="modal-meta-grid">
            <div className="meta-box">
              <span className="meta-label">Maestro / Titular</span>
              <span className="meta-val">{artisan.artisan}</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Dirección Local</span>
              <span className="meta-val">📍 {artisan.address}</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Horario de Atención</span>
              <span className="meta-val">⏰ {artisan.schedule || '9:00 - 18:00 hrs'}</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Valoración Comunitaria</span>
              <span className="meta-val">⭐ {artisan.rating} / 5.0 ({artisan.reviewsCount} reseñas)</span>
            </div>
          </div>

          {/* Historia y Técnicas */}
          <div className="modal-section">
            <h4 className="section-heading">Historia del Taller y Tradición</h4>
            <p className="modal-history-text">{artisan.history}</p>
          </div>

          {/* Catálogo de Productos y Muestrario */}
          {catalog.length > 0 && (
            <div className="modal-section">
              <h4 className="section-heading">
                Catálogo de Piezas y Especialidades ({catalog.length})
              </h4>
              <div className="catalog-items-grid">
                {catalog.map((item) => (
                  <div key={item.id} className="catalog-item-card">
                    <div className="item-image-wrapper">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h5 className="item-name">{item.name}</h5>
                      {item.technique && (
                        <span className="item-technique">🎨 {item.technique}</span>
                      )}
                      <div className="item-price-tag">
                        ${item.price} <span className="currency">MXN</span>
                      </div>
                      {artisan.whatsapp && (
                        <a
                          href={`https://wa.me/${artisan.whatsapp}?text=${encodeURIComponent(`Hola, me interesa encargar la pieza "${item.name}" ($${item.price} MXN) vista en DoloresMágico App.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-order-item"
                        >
                          💬 Cotizar Pieza
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Barra de Contacto Directo (HU04: Sin intermediarios) */}
          <div className="modal-direct-contact-bar">
            <div className="contact-info-text">
              <strong>Trato 100% Directo con el Productor:</strong>
              <p>Comunícate directamente para pedidos especiales, recorridos o envíos a todo México.</p>
            </div>
            <div className="contact-buttons-group">
              {artisan.whatsapp && (
                <a
                  href={`https://wa.me/${artisan.whatsapp}?text=${encodeURIComponent(`Hola, me comunico a través de DoloresMágico App para consultar sobre sus artesanías.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-modal-wa"
                >
                  <span>💬 WhatsApp Directo</span>
                </a>
              )}
              {artisan.phone && (
                <a href={`tel:${artisan.phone}`} className="btn-modal-call">
                  <span>📞 Llamar al Taller</span>
                </a>
              )}
              <button
                className="btn-modal-map"
                onClick={() => {
                  onClose();
                  if (onNavigateToMap) onNavigateToMap(artisan);
                }}
              >
                <span>🗺️ Ver en Mapa</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
