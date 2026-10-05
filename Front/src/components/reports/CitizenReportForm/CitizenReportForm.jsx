import React, { useState } from 'react';
import './CitizenReportForm.css';
import { PROBLEM_TYPES } from '../../../data/doloresData';
import { reportService } from '../../../services/reportService';

export default function CitizenReportForm({ onReportSubmitted, onViewReports }) {
  const [problemType, setProblemType] = useState('alumbrado');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('Calle Guanajuato esq. Michoacán, Dolores Hidalgo');
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [gpsCoords, setGpsCoords] = useState({ lat: 21.1565, lng: -100.9328 });
  const [photoPreview, setPhotoPreview] = useState(
    'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=600&q=80'
  );
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simular o capturar GPS real del dispositivo
  const handleGetLocation = () => {
    setIsGettingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsCoords({
            lat: Number(position.coords.latitude.toFixed(5)),
            lng: Number(position.coords.longitude.toFixed(5))
          });
          setAddress(`Ubicación GPS precisa (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`);
          setIsGettingLocation(false);
        },
        () => {
          // Fallback a coordenadas de Dolores Hidalgo
          setGpsCoords({ lat: 21.1561, lng: -100.9325 });
          setAddress('Plaza Principal Dolores Hidalgo C.I.N.');
          setIsGettingLocation(false);
        }
      );
    } else {
      setTimeout(() => setIsGettingLocation(false), 500);
    }
  };

  // Manejo de carga de foto
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Por favor agrega una breve descripción de la incidencia.');
      return;
    }

    setIsSubmitting(true);
    const selectedProblem = PROBLEM_TYPES.find((p) => p.id === problemType);

    const reportData = {
      problemType,
      problemTypeName: selectedProblem ? selectedProblem.label : 'Incidencia Urbana',
      address,
      lat: gpsCoords.lat,
      lng: gpsCoords.lng,
      description,
      citizenName: citizenName || 'Ciudadano Dolorense',
      citizenPhone,
      photoUrl: photoPreview
    };

    try {
      const created = await reportService.submitReport(reportData);
      setIsSubmitting(false);
      if (onReportSubmitted) {
        onReportSubmitted(created);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="citizen-report-container">
      {/* Encabezado */}
      <div className="report-header-banner">
        <span className="report-badge">📢 SERVICIOS URBANOS Y PARTICIPACIÓN</span>
        <h2 className="report-title">Reporte Ciudadano de Incidencias Urbanas</h2>
        <p className="report-subtitle">
          Ayuda a mantener en óptimas condiciones la imagen de nuestro Pueblo Mágico. Envía evidencia fotográfica y ubicación GPS para que la dependencia municipal correspondiente atienda el desperfecto.
        </p>
      </div>

      <div className="report-layout-grid">
        {/* Formulario Principal (Pantalla 3 del documento) */}
        <form className="report-form-card" onSubmit={handleSubmit}>
          {/* PASO 1: TIPO DE PROBLEMA */}
          <div className="form-section">
            <label className="form-label">
              <span className="step-num">1</span>
              Selecciona el tipo de problema urbano:
            </label>
            <div className="problem-types-selector">
              {PROBLEM_TYPES.map((type) => (
                <button
                  type="button"
                  key={type.id}
                  className={`problem-btn ${problemType === type.id ? 'active' : ''}`}
                  onClick={() => setProblemType(type.id)}
                >
                  <span className="problem-icon">{type.icon}</span>
                  <div className="problem-info">
                    <span className="problem-label">{type.label}</span>
                    <span className="problem-desc">{type.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* PASO 2: EVIDENCIA FOTOGRÁFICA */}
          <div className="form-section">
            <label className="form-label">
              <span className="step-num">2</span>
              Fotografía de la incidencia (Cámara / Galería):
            </label>
            <div className="photo-upload-zone">
              {photoPreview ? (
                <div className="preview-wrap">
                  <img src={photoPreview} alt="Evidencia de la falla" />
                  <label className="change-photo-btn">
                    📷 Cambiar Fotografía
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                  </label>
                </div>
              ) : (
                <label className="upload-prompt">
                  <span className="upload-icon">📸</span>
                  <span>Toca para tomar foto o adjuntar de galería</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                </label>
              )}
            </div>
          </div>

          {/* PASO 3: UBICACIÓN GPS */}
          <div className="form-section">
            <label className="form-label">
              <span className="step-num">3</span>
              Ubicación GPS en Dolores Hidalgo:
            </label>
            <div className="location-picker-row">
              <input
                type="text"
                className="form-input address-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle, número, barrio o colonia..."
                required
              />
              <button
                type="button"
                className="btn-gps-trigger"
                onClick={handleGetLocation}
                disabled={isGettingLocation}
              >
                {isGettingLocation ? 'Obteniendo GPS...' : '📍 GPS Automático'}
              </button>
            </div>
            <div className="gps-coordinates-badge">
              <span>Coordenadas: Lat {gpsCoords.lat}, Lng {gpsCoords.lng}</span>
            </div>
          </div>

          {/* PASO 4: DESCRIPCIÓN DETALLADA */}
          <div className="form-section">
            <label className="form-label">
              <span className="step-num">4</span>
              Descripción del desperfecto o problema:
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Explica qué sucede (ej: luminaria fundida desde hace 3 noches cerca del taller de alfarería)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* DATOS OPCIONALES DE CONTACTO */}
          <div className="form-section optional-section">
            <label className="form-label optional-label">
              Datos de contacto para notificaciones (Opcional):
            </label>
            <div className="two-cols-input">
              <input
                type="text"
                className="form-input"
                placeholder="Tu nombre (opcional)"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
              />
              <input
                type="tel"
                className="form-input"
                placeholder="Teléfono / WhatsApp (opcional)"
                value={citizenPhone}
                onChange={(e) => setCitizenPhone(e.target.value)}
              />
            </div>
          </div>

          {/* BOTÓN DE ENVÍO */}
          <div className="form-submit-actions">
            <button
              type="submit"
              className="btn-submit-report"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Generando Folio...' : '🚀 Enviar Reporte y Generar Folio Oficial'}
            </button>
          </div>
        </form>

        {/* Panel Lateral: Información y Seguimiento */}
        <aside className="report-sidebar-guide">
          <div className="guide-card">
            <h3>¿Cómo funciona el proceso?</h3>
            <ol className="guide-steps">
              <li>
                <strong>Envío con Fotografía:</strong> Registras el desperfecto urbano con foto y ubicación exacta.
              </li>
              <li>
                <strong>Generación de Folio:</strong> El sistema emite un código identificador único (ej: <code>FOL-2026-DH-XXXX</code>).
              </li>
              <li>
                <strong>Canalización Municipal:</strong> La incidencia es turnada a Alumbrado, Limpia o Obras Públicas.
              </li>
              <li>
                <strong>Seguimiento en Tiempo Real:</strong> Consulta el avance y resolución usando tu número de folio.
              </li>
            </ol>
          </div>

          <div className="quick-tracking-card">
            <h4>¿Ya cuentas con un folio?</h4>
            <p>Consulta el estatus actual de tu reporte en la lista pública de incidencias.</p>
            <button
              className="btn-track-reports"
              onClick={onViewReports}
            >
              📋 Ver Lista y Estatus de Reportes
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
