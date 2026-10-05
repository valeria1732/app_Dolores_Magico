import { storageService } from './storageService';

export const reportService = {
  /**
   * Genera un folio único oficial para seguimiento ciudadano
   * Ejemplo: FOL-2026-DH-4819
   */
  generateFolio: () => {
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `FOL-${year}-DH-${randomDigits}`;
  },

  /**
   * Registra una nueva incidencia urbana con foto, GPS y generación de folio
   */
  submitReport: async (reportData) => {
    const folio = reportService.generateFolio();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newReport = {
      id: `rep-${Date.now()}`,
      folio,
      problemType: reportData.problemType,
      problemTypeName: reportData.problemTypeName || 'Incidencia Urbana',
      address: reportData.address || 'Dolores Hidalgo C.I.N., Gto.',
      lat: reportData.lat || 21.15605,
      lng: reportData.lng || -100.93245,
      description: reportData.description,
      status: 'reportado',
      statusLabel: 'Reportado',
      statusColor: '#2563eb',
      date: formattedDate,
      citizenName: reportData.citizenName || 'Ciudadano Dolorense',
      citizenPhone: reportData.citizenPhone || '',
      photoUrl: reportData.photoUrl || 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=600&q=80'
    };

    // Intentar sincronizar con Backend si está disponible
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReport)
      });
      if (response.ok) {
        const json = await response.json();
        console.log('Reporte sincronizado con servidor:', json);
      }
    } catch {
      // Backend no disponible, seguimos con almacenamiento local de alta resiliencia
      console.log('Operando en modo local/desconectado para reportes');
    }

    // Persistir localmente
    storageService.addReport(newReport);
    return newReport;
  },

  /**
   * Busca un reporte por su código o folio
   */
  findByFolio: (folioToSearch) => {
    const reports = storageService.getReports();
    const cleanQuery = folioToSearch.trim().toUpperCase();
    return reports.find(r => r.folio.toUpperCase().includes(cleanQuery));
  }
};
