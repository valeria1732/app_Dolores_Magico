import React, { useState } from 'react';
import './AdminValidationPanel.css';
import { storageService } from '../../../services/storageService';

export default function AdminValidationPanel({ points, setPoints, reports, setReports, onToast }) {
  const [activeAdminTab, setActiveAdminTab] = useState('reportsTab');

  // Cambiar estatus de un reporte ciudadano
  const handleUpdateStatus = (reportId, newStatus) => {
    let label = 'Reportado';
    let color = '#2563eb';

    if (newStatus === 'en_atencion') {
      label = 'En Atención';
      color = '#d97706';
    } else if (newStatus === 'resuelto') {
      label = 'Resuelto';
      color = '#16a34a';
    } else if (newStatus === 'en_revision') {
      label = 'En Revisión';
      color = '#7c3aed';
    }

    const updated = storageService.updateReportStatus(reportId, newStatus, label, color);
    setReports(updated);
    if (onToast) {
      onToast({
        type: 'success',
        message: `Reporte actualizado a: ${label}`
      });
    }
  };

  // Validar o alternar verificación de un artesano
  const handleToggleVerifyArtisan = (artisanId) => {
    const updated = points.map((p) => {
      if (p.id === artisanId) {
        const nextVerified = !p.verified;
        return { ...p, verified: nextVerified };
      }
      return p;
    });

    storageService.savePoints(updated);
    setPoints(updated);
    if (onToast) {
      onToast({
        type: 'success',
        message: `Estado de verificación del taller actualizado correctamente.`
      });
    }
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <span className="admin-badge">HU05 • GESTIÓN Y SUPERVISIÓN MUNICIPAL</span>
        <h2 className="admin-title">Panel de Administración y Validación</h2>
        <p className="admin-subtitle">
          Supervisión de registros de artesanos locales y canalización de reportes de servicios urbanos.
        </p>

        {/* Pestañas de administración */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeAdminTab === 'reportsTab' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('reportsTab')}
          >
            📢 Gestión de Reportes Urbanos ({reports.length})
          </button>
          <button
            className={`admin-tab-btn ${activeAdminTab === 'artisansTab' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('artisansTab')}
          >
            🏺 Validación de Artesanos y Talleres ({points.filter(p => p.category === 'talavera' || p.category === 'nieves').length})
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: GESTIÓN DE REPORTES */}
      {activeAdminTab === 'reportsTab' && (
        <div className="admin-section-content">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Folio Oficial</th>
                  <th>Tipo y Foto</th>
                  <th>Ubicación</th>
                  <th>Reportado Por</th>
                  <th>Estado Actual</th>
                  <th>Cambiar Estado</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <code className="folio-chip">{r.folio}</code>
                      <span className="report-time-mini">{r.date}</span>
                    </td>
                    <td>
                      <div className="problem-cell">
                        <img src={r.photoUrl} alt="Evidencia" className="thumb-mini" />
                        <div>
                          <strong>{r.problemTypeName}</strong>
                          <p className="desc-preview">{r.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="location-cell">
                      <span>📍 {r.address}</span>
                      <small>GPS: {r.lat}, {r.lng}</small>
                    </td>
                    <td>
                      <span>{r.citizenName || 'Ciudadano'}</span>
                      {r.citizenPhone && <small>{r.citizenPhone}</small>}
                    </td>
                    <td>
                      <span className="current-status-tag" style={{ backgroundColor: r.statusColor || '#2563eb' }}>
                        {r.statusLabel || r.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={r.status}
                        onChange={(e) => handleUpdateStatus(r.id, e.target.value)}
                      >
                        <option value="reportado">Reportado</option>
                        <option value="en_revision">En Revisión</option>
                        <option value="en_atencion">En Atención</option>
                        <option value="resuelto">Resuelto</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: VALIDACIÓN DE ARTESANOS */}
      {activeAdminTab === 'artisansTab' && (
        <div className="admin-section-content">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Taller / Negocio</th>
                  <th>Titular / Maestro</th>
                  <th>Categoría</th>
                  <th>Contacto Directo</th>
                  <th>Estatus de Validación</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {points
                  .filter((p) => p.category === 'talavera' || p.category === 'nieves')
                  .map((art) => (
                    <tr key={art.id}>
                      <td>
                        <div className="problem-cell">
                          <img src={art.image} alt={art.name} className="thumb-mini" />
                          <div>
                            <strong>{art.name}</strong>
                            <small>{art.address}</small>
                          </div>
                        </div>
                      </td>
                      <td>{art.artisan}</td>
                      <td>
                        <span className="artisan-cat-pill">
                          {art.categoryName}
                        </span>
                      </td>
                      <td>
                        <span>{art.phone}</span>
                        {art.whatsapp && <small>WA: {art.whatsapp}</small>}
                      </td>
                      <td>
                        {art.verified ? (
                          <span className="verified-badge-yes">✅ Validado Oficial</span>
                        ) : (
                          <span className="verified-badge-no">⏳ En Revisión</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`btn-verify-toggle ${art.verified ? 'btn-unverify' : 'btn-verify'}`}
                          onClick={() => handleToggleVerifyArtisan(art.id)}
                        >
                          {art.verified ? 'Revocar Validación' : 'Aprobar Taller'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
