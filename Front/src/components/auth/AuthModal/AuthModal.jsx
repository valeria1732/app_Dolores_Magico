import React, { useState } from 'react';
import './AuthModal.css';
import { storageService } from '../../../services/storageService';

export default function AuthModal({ isOpen, onClose, currentRole, onRoleChanged, onRegisterArtisan }) {
  const [activeTab, setActiveTab] = useState('selectRole'); // selectRole | registerArtisan
  const [selectedRole, setSelectedRole] = useState(currentRole || 'turista');

  // Formulario de registro de artesano (HU01)
  const [artisanForm, setArtisanForm] = useState({
    name: '',
    artisan: '',
    category: 'talavera',
    address: '',
    phone: '',
    whatsapp: '',
    history: '',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    lat: 21.1575,
    lng: -100.9315
  });

  if (!isOpen) return null;

  const handleApplyRole = (role) => {
    storageService.setUserRole(role);
    onRoleChanged(role);
    onClose();
  };

  const handleArtisanSubmit = (e) => {
    e.preventDefault();
    if (!artisanForm.name || !artisanForm.artisan || !artisanForm.phone) {
      alert('Por favor completa los campos principales del taller.');
      return;
    }

    const newPoint = {
      id: `tal-${Date.now()}`,
      name: artisanForm.name,
      artisan: artisanForm.artisan,
      category: artisanForm.category,
      categoryName: artisanForm.category === 'talavera' ? 'Taller de Talavera' : 'Nevería Artesanal',
      pinColor: artisanForm.category === 'talavera' ? 'blue' : 'yellow',
      address: artisanForm.address || 'Dolores Hidalgo C.I.N.',
      lat: Number(artisanForm.lat),
      lng: Number(artisanForm.lng),
      phone: artisanForm.phone,
      whatsapp: artisanForm.whatsapp || artisanForm.phone.replace(/[^0-9]/g, ''),
      schedule: 'Lunes a Sábado 9:00 - 18:30 hrs',
      history: artisanForm.history || 'Taller artesanal familiar dedicado al arte tradicional dolorense.',
      rating: 5.0,
      reviewsCount: 1,
      verified: false, // Pendiente de validación por HU05
      image: artisanForm.image,
      tags: ['Taller Local', 'Nuevo Registro', 'Venta Directa'],
      catalog: []
    };

    if (onRegisterArtisan) {
      onRegisterArtisan(newPoint);
    }

    // Cambiar a rol artesano
    handleApplyRole('artesano');
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose} aria-label="Cerrar modal">×</button>

        <div className="auth-modal-header">
          <span className="auth-badge-icon">👥</span>
          <h2 className="auth-title">Acceso y Perfil de Usuario</h2>
          <p className="auth-subtitle">
            Selecciona tu perfil o regístrate como artesano local de Dolores Hidalgo C.I.N.
          </p>

          <div className="auth-mode-switch">
            <button
              className={`mode-btn ${activeTab === 'selectRole' ? 'active' : ''}`}
              onClick={() => setActiveTab('selectRole')}
            >
              Cambiar Perfil Activo
            </button>
            <button
              className={`mode-btn ${activeTab === 'registerArtisan' ? 'active' : ''}`}
              onClick={() => setActiveTab('registerArtisan')}
            >
              Registrar Taller Artesanal (HU01)
            </button>
          </div>
        </div>

        {/* TAB 1: SELECCIONAR ROL */}
        {activeTab === 'selectRole' && (
          <div className="roles-selector-container">
            <div
              className={`role-option-card ${selectedRole === 'turista' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('turista')}
            >
              <div className="role-option-icon">🧭</div>
              <div className="role-option-info">
                <h4>Turista / Visitante</h4>
                <p>Explora la ruta de Talavera, neverías y monumentos históricos con compras sin intermediarios.</p>
              </div>
              <span className="role-check">{selectedRole === 'turista' ? '✓' : ''}</span>
            </div>

            <div
              className={`role-option-card ${selectedRole === 'ciudadano' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('ciudadano')}
            >
              <div className="role-option-icon">🏘️</div>
              <div className="role-option-info">
                <h4>Ciudadano Dolorense</h4>
                <p>Reporta incidencias urbanas con foto y ubicación GPS, y sigue el estatus con folio oficial.</p>
              </div>
              <span className="role-check">{selectedRole === 'ciudadano' ? '✓' : ''}</span>
            </div>

            <div
              className={`role-option-card ${selectedRole === 'artesano' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('artesano')}
            >
              <div className="role-option-icon">🏺</div>
              <div className="role-option-info">
                <h4>Artesano / Nevero Local</h4>
                <p>Muestra tu taller en el mapa interactivo y conecta con turistas directamente vía WhatsApp.</p>
              </div>
              <span className="role-check">{selectedRole === 'artesano' ? '✓' : ''}</span>
            </div>

            <div
              className={`role-option-card ${selectedRole === 'admin' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('admin')}
            >
              <div className="role-option-icon">🏛️</div>
              <div className="role-option-info">
                <h4>Administrador Municipal</h4>
                <p>Valida talleres de artesanos y gestiona el estatus de los reportes ciudadanos recibidos.</p>
              </div>
              <span className="role-check">{selectedRole === 'admin' ? '✓' : ''}</span>
            </div>

            <button
              className="btn-apply-role"
              onClick={() => handleApplyRole(selectedRole)}
            >
              Continuar con este Perfil
            </button>
          </div>
        )}

        {/* TAB 2: REGISTRO DE ARTESANO (HU01) */}
        {activeTab === 'registerArtisan' && (
          <form className="artisan-register-form" onSubmit={handleArtisanSubmit}>
            <div className="form-group">
              <label>Nombre del Taller o Establecimiento:</label>
              <input
                type="text"
                placeholder="Ej: Talavera y Mayólica San José"
                value={artisanForm.name}
                onChange={(e) => setArtisanForm({ ...artisanForm, name: e.target.value })}
                required
              />
            </div>

            <div className="two-cols-group">
              <div className="form-group">
                <label>Maestro(a) Artesano(a):</label>
                <input
                  type="text"
                  placeholder="Ej: Don Pedro Ramos"
                  value={artisanForm.artisan}
                  onChange={(e) => setArtisanForm({ ...artisanForm, artisan: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Giro Artesanal:</label>
                <select
                  value={artisanForm.category}
                  onChange={(e) => setArtisanForm({ ...artisanForm, category: e.target.value })}
                >
                  <option value="talavera">Taller de Talavera / Cerámica</option>
                  <option value="nieves">Nevería Tradicional</option>
                </select>
              </div>
            </div>

            <div className="two-cols-group">
              <div className="form-group">
                <label>Dirección en Dolores Hidalgo:</label>
                <input
                  type="text"
                  placeholder="Calle, número, colonia..."
                  value={artisanForm.address}
                  onChange={(e) => setArtisanForm({ ...artisanForm, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>WhatsApp Directo (10 dígitos):</label>
                <input
                  type="tel"
                  placeholder="Ej: 4181234567"
                  value={artisanForm.phone}
                  onChange={(e) => setArtisanForm({ ...artisanForm, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Historia del Taller y Técnicas empleadas:</label>
              <textarea
                rows={2}
                placeholder="Cuéntanos sobre tu tradición, horno de leña, técnicas novohispanas, años de trayectoria..."
                value={artisanForm.history}
                onChange={(e) => setArtisanForm({ ...artisanForm, history: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-apply-role">
              🏺 Enviar Solicitud de Registro de Taller
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
