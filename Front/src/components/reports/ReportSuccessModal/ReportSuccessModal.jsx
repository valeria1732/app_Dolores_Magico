import React, { useState } from 'react';
import './ReportSuccessModal.css';

export default function ReportSuccessModal({ report, onClose, onViewAllReports }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const handleCopyFolio = () => {
    navigator.clipboard.writeText(report.folio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="report-success-overlay" onClick={onClose}>
      <div className="report-success-card" onClick={(e) => e.stopPropagation()}>
        {/* Encabezado Éxito */}
        <div className="success-header">
          <div className="success-icon-badge">✅</div>
          <h2 className="success-title">¡Reporte Registrado con Éxito!</h2>
          <p className="success-subtitle">
            Tu reporte ha sido ingresado al sistema de atención de servicios públicos de Dolores Hidalgo C.I.N.
          </p>
        </div>

        {/* Folio Oficial Generado */}
        <div className="folio-highlight-box">
          <span className="folio-title-tag">FOLIO OFICIAL DE ATENCIÓN</span>
          <div className="folio-code-row">
            <span className="folio-number">{report.folio}</span>
            <button className="btn-copy-folio" onClick={handleCopyFolio}>
              {copied ? '✓ ¡Copiado!' : '📋 Copiar Folio'}
            </button>
          </div>
          <p className="folio-note">
            Guarda este código para dar seguimiento a la reparación de tu incidencia.
          </p>
        </div>

        {/* Resumen del Reporte */}
        <div className="success-report-summary">
          <div className="summary-item">
            <span className="summary-label">Tipo de Desperfecto:</span>
            <span className="summary-value"><strong>{report.problemTypeName}</strong></span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Ubicación Registrada:</span>
            <span className="summary-value">📍 {report.address}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Fecha y Hora de Recepción:</span>
            <span className="summary-value">🗓️ {report.date}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Estatus Inicial:</span>
            <span className="summary-status-pill">🔵 {report.statusLabel}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="success-modal-actions">
          <button className="btn-view-list" onClick={onViewAllReports}>
            📋 Ver Listado y Seguimiento
          </button>
          <button className="btn-close-modal" onClick={onClose}>
            Entendido / Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
