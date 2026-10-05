import React from 'react';
import './HeroHome.css';

export default function HeroHome({ setActiveTab, pointsCount, reportsCount }) {
  return (
    <div className="hero-home">
      {/* Banner Principal con Identidad de Pueblo Mágico */}
      <section className="hero-banner">
        <div className="hero-badge-tag">
          <span>🏛️ PUEBLO MÁGICO DE DOLORES HIDALGO C.I.N.</span>
        </div>
        <h1 className="hero-main-title">
          Talavera, cultura y comunidad:
          <span className="hero-gradient-text"> la Cuna de la Independencia en tus manos</span>
        </h1>
        <p className="hero-lead">
          Conecta directamente con maestros artesanos de Talavera, neverías centenarias y rutas de la gesta heroica de 1810, mientras colaboras activamente en el cuidado y conservación urbana de nuestro municipio.
        </p>

        {/* PANTALLA 1 DEL DOCUMENTO: SELECTOR DIRECTO DE DOS GRANDES MODOS */}
        <div className="mode-selector-grid">
          {/* OPCIÓN 1: EXPLORAR DOLORES MÁGICO */}
          <div className="mode-card mode-explore" onClick={() => setActiveTab('map')}>
            <div className="mode-card-header">
              <div className="mode-icon-circle blue-glow">
                <span>🗺️</span>
              </div>
              <span className="mode-pill-tag">Ruta Turística & Cultural</span>
            </div>
            <h3 className="mode-card-title">Explorar Dolores Mágico</h3>
            <p className="mode-card-desc">
              Mapa interactivo geolocalizado con pines temáticos: talleres de Talavera vidriada, neverías de garambullo y recintos históricos de 1810. Contacto directo por WhatsApp sin comisiones.
            </p>
            <div className="mode-card-footer">
              <span className="mode-action-btn btn-blue">
                <span>Ver Mapa Interactivo</span>
                <span className="arrow-icon">→</span>
              </span>
              <div className="mode-pins-preview">
                <span className="pin-dot blue" title="Azul: Talavera">🔵 Talavera</span>
                <span className="pin-dot yellow" title="Amarillo: Nieves">🟡 Nieves</span>
                <span className="pin-dot red" title="Rojo: Historia">🔴 Historia</span>
              </div>
            </div>
          </div>

          {/* OPCIÓN 2: MI COMUNIDAD (REPORTE URBANO) */}
          <div className="mode-card mode-report" onClick={() => setActiveTab('reports')}>
            <div className="mode-card-header">
              <div className="mode-icon-circle orange-glow">
                <span>📢</span>
              </div>
              <span className="mode-pill-tag tag-orange">Participación Ciudadana</span>
            </div>
            <h3 className="mode-card-title">Mi Comunidad (Reporte Urbano)</h3>
            <p className="mode-card-desc">
              Canal directo municipal para reportar fallas de alumbrado, acumulación de basura o baches con fotografía y ubicación GPS. Recibe un folio oficial de seguimiento inmediato.
            </p>
            <div className="mode-card-footer">
              <span className="mode-action-btn btn-orange">
                <span>Generar Reporte con Foto</span>
                <span className="arrow-icon">→</span>
              </span>
              <div className="mode-stats-tag">
                <span>{reportsCount || 3} Incidencias en atención</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franja de Estadísticas e Impacto Comunitario */}
      <section className="stats-strip">
        <div className="stat-card">
          <div className="stat-icon">🏺</div>
          <div className="stat-info">
            <span className="stat-number">4+</span>
            <span className="stat-label">Talleres de Talavera Registrados</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🍧</div>
          <div className="stat-info">
            <span className="stat-number">3+</span>
            <span className="stat-label">Neverías Tradicionales de Barrica</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <span className="stat-number">5</span>
            <span className="stat-label">Monumentos y Museos Históricos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-number">100%</span>
            <span className="stat-label">Comercio Justo (Cero Comisiones)</span>
          </div>
        </div>
      </section>

      {/* Tres Pilares del Proyecto */}
      <section className="pillars-section">
        <div className="section-header">
          <h2 className="section-title">¿Por qué DoloresMágico App?</h2>
          <p className="section-subtitle">
            Unificamos la promoción del patrimonio cultural y artesanal con el cuidado y preservación de nuestro entorno urbano.
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-item">
            <div className="pillar-icon-box">🏺</div>
            <h4>Visibilidad al Artesano Local</h4>
            <p>
              Llevamos a los turistas más allá del primer cuadro de la ciudad, directo a los barrios alfareros tradicionales donde se cuece la auténtica Talavera y mayólica virreinal.
            </p>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">💬</div>
            <h4>Contacto Directo Sin Intermediarios</h4>
            <p>
              Comunícate con los creadores vía WhatsApp o llamada para cotizar vajillas, piezas personalizadas o consultar disponibilidad de sabores sin comisiones abusivas.
            </p>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">📸</div>
            <h4>Cuidado Comunitario con Evidencia GPS</h4>
            <p>
              Cualquier ciudadano o turista puede reportar desperfectos urbanos adjuntando foto y coordenadas exactas, impulsando la respuesta ágil de servicios públicos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
