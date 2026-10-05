import React from 'react';
import './Footer.css';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="dolores-footer">
      <div className="footer-top-stripe"></div>
      <div className="footer-container">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="footer-icon">🏺</span>
            <span className="footer-title">DoloresMágico App</span>
          </div>
          <p className="footer-tagline">
            "Talavera, cultura y comunidad: la Cuna de la Independencia en tus manos."
          </p>
          <p className="footer-description">
            Plataforma municipal que impulsa la economía artesanal conectando visitantes y residentes con talleres de Talavera, neverías tradicionales y rutas históricas, integrando reporte ciudadano de servicios urbanos.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navegación Rápida</h4>
          <ul className="footer-links">
            <li><button onClick={() => setActiveTab('home')}>Inicio / Menú Principal</button></li>
            <li><button onClick={() => setActiveTab('map')}>Mapa Interactivo (3 Pines)</button></li>
            <li><button onClick={() => setActiveTab('catalog')}>Directorio de Artesanos</button></li>
            <li><button onClick={() => setActiveTab('reports')}>Reporte Ciudadano</button></li>
            <li><button onClick={() => setActiveTab('events')}>Festividades Culturales</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Proyecto Integrador UTNG</h4>
          <div className="footer-meta">
            <p><strong>Universidad:</strong> Univ. Tecnológica del Norte de Guanajuato</p>
            <p><strong>Materia:</strong> Desarrollo Móvil Integra</p>
            <p><strong>Docente:</strong> José de Jesús Eduardo Barrientos Avalos</p>
            <p><strong>Equipo:</strong> Valeria Calvillo Mendoza & María del Carmen Vargas Martínez</p>
            <p><strong>Grupo:</strong> GIDS6101-E</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <span>Dolores Hidalgo C.I.N., Guanajuato • Pueblo Mágico de México</span>
          <span className="footer-badge">Desarrollo Multiplataforma • Clean Architecture</span>
        </div>
      </div>
    </footer>
  );
}
