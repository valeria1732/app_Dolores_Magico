import React from 'react';
import './Navbar.css';

export default function Navbar({ activeTab, setActiveTab, userRole, openAuthModal }) {
  const getRoleBadge = (role) => {
    switch (role) {
      case 'artesano':
        return { label: 'Artesano / Taller', color: 'badge-artisan', icon: '🏺' };
      case 'ciudadano':
        return { label: 'Ciudadano Dolorense', color: 'badge-citizen', icon: '🏘️' };
      case 'admin':
        return { label: 'Administrador Gob.', color: 'badge-admin', icon: '🏛️' };
      default:
        return { label: 'Turista / Visitante', color: 'badge-tourist', icon: '🧭' };
    }
  };

  const roleInfo = getRoleBadge(userRole);

  return (
    <header className="dolores-navbar">
      <div className="navbar-container">
        {/* Logo & Marca Dolores Hidalgo */}
        <div className="navbar-brand" onClick={() => setActiveTab('home')}>
          <div className="brand-logo-emblem">
            <span className="emblem-talavera">🏺</span>
          </div>
          <div className="brand-text">
            <div className="brand-title">
              Dolores<span className="brand-highlight">Mágico</span>
            </div>
            <div className="brand-subtitle">Cuna de la Independencia Nacional</div>
          </div>
        </div>

        {/* Menú de Navegación Principal */}
        <nav className="navbar-menu">
          <button
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="nav-icon">🏛️</span>
            <span>Inicio</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <span className="nav-icon">🗺️</span>
            <span>Explorar Mapa</span>
            <span className="nav-badge-pill">Ruta</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <span className="nav-icon">🏺</span>
            <span>Artesanos y Nieves</span>
          </button>

          <button
            className={`nav-item report-cta ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <span className="nav-icon">📢</span>
            <span>Reporte Urbano</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <span className="nav-icon">📅</span>
            <span>Festividades</span>
          </button>

          {userRole === 'admin' && (
            <button
              className={`nav-item admin-tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <span className="nav-icon">⚙️</span>
              <span>Validación</span>
            </button>
          )}
        </nav>

        {/* Acceso / Perfil / Selector de Rol */}
        <div className="navbar-actions">
          <button className={`role-pill ${roleInfo.color}`} onClick={openAuthModal} title="Cambiar rol o perfil">
            <span className="role-icon">{roleInfo.icon}</span>
            <span className="role-text">{roleInfo.label}</span>
            <span className="role-change-arrow">▾</span>
          </button>
        </div>
      </div>
    </header>
  );
}
