import React, { useState } from 'react';
import './ReportsList.css';

export default function ReportsList({ reports, onNewReportClick }) {
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchFolio, setSearchFolio] = useState('');

  const filteredReports = reports.filter((rep) => {
    const matchesStatus = filterStatus === 'todos' || rep.status === filterStatus;
    const matchesSearch =
      rep.folio.toLowerCase().includes(searchFolio.toLowerCase()) ||
      rep.address.toLowerCase().includes(searchFolio.toLowerCase()) ||
      rep.description.toLowerCase().includes(searchFolio.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'resuelto':
        return 'status-resolved';
      case 'en_atencion':
        return 'status-in-progress';
      case 'en_revision':
        return 'status-review';
      default:
        return 'status-reported';
    }
  };

  return (
    <div className="reports-list-container">
      {/* Encabezado */}
      <div className="reports-list-header">
        <div>
          <span className="reports-badge">TRANSPARENCIA MUNICIPAL</span>
          <h2 className="reports-title">Seguimiento Ciudadano de Reportes Urbanos</h2>
          <p className="reports-subtitle">
            Monitorea el progreso de atención y solución de las incidencias reportadas en Dolores Hidalgo.
          </p>
        </div>
        <button className="btn-new-report-header" onClick={onNewReportClick}>
          ➕ Registrar Nueva Incidencia
        </button>
      </div>

      {/* Barra de Filtros y Búsqueda por Folio */}
      <div className="reports-filters-bar">
        <div className="folio-search-input">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por folio (ej: FOL-2026-DH-1042) o dirección..."
            value={searchFolio}
            onChange={(e) => setSearchFolio(e.target.value)}
          />
          {searchFolio && (
            <button className="clear-btn" onClick={() => setSearchFolio('')}>×</button>
          )}
        </div>

        <div className="status-filter-pills">
          <button
            className={`status-pill ${filterStatus === 'todos' ? 'active' : ''}`}
            onClick={() => setFilterStatus('todos')}
          >
            Todos ({reports.length})
          </button>
          <button
            className={`status-pill ${filterStatus === 'reportado' ? 'active' : ''}`}
            onClick={() => setFilterStatus('reportado')}
          >
            🔵 Reportados
          </button>
          <button
            className={`status-pill ${filterStatus === 'en_atencion' ? 'active' : ''}`}
            onClick={() => setFilterStatus('en_atencion')}
          >
            🟠 En Atención
          </button>
          <button
            className={`status-pill ${filterStatus === 'resuelto' ? 'active' : ''}`}
            onClick={() => setFilterStatus('resuelto')}
          >
            🟢 Resueltos
          </button>
        </div>
      </div>

      {/* Grid de Reportes */}
      {filteredReports.length === 0 ? (
        <div className="empty-reports-state">
          <span className="empty-icon">📭</span>
          <h3>No se encontraron incidencias</h3>
          <p>Verifica el número de folio o cambia el filtro de búsqueda.</p>
        </div>
      ) : (
        <div className="reports-cards-grid">
          {filteredReports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-card-media">
                <img src={report.photoUrl} alt="Foto de evidencia" />
                <span className={`report-status-tag ${getStatusBadgeClass(report.status)}`}>
                  {report.statusLabel || report.status}
                </span>
                <span className="report-category-pill">
                  {report.problemTypeName}
                </span>
              </div>

              <div className="report-card-body">
                <div className="report-card-meta">
                  <span className="report-folio-code">{report.folio}</span>
                  <span className="report-date-text">{report.date}</span>
                </div>

                <p className="report-card-address">
                  📍 {report.address}
                </p>

                <p className="report-card-description">
                  {report.description}
                </p>

                <div className="report-card-footer">
                  <span className="citizen-author">
                    Por: {report.citizenName || 'Ciudadano'}
                  </span>
                  <div className="gps-badge">
                    GPS: {report.lat}, {report.lng}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
