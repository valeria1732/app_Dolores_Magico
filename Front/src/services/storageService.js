import { INITIAL_POINTS_OF_INTEREST, INITIAL_CITIZEN_REPORTS } from '../data/doloresData';

const STORAGE_KEYS = {
  POINTS: 'dolores_points_v1',
  REPORTS: 'dolores_citizen_reports_v1',
  USER_ROLE: 'dolores_user_role_v1',
  USER_PROFILE: 'dolores_user_profile_v1'
};

export const storageService = {
  // Puntos de interés y artesanos
  getPoints: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.POINTS);
      return data ? JSON.parse(data) : INITIAL_POINTS_OF_INTEREST;
    } catch {
      return INITIAL_POINTS_OF_INTEREST;
    }
  },

  savePoints: (points) => {
    try {
      localStorage.setItem(STORAGE_KEYS.POINTS, JSON.stringify(points));
    } catch (e) {
      console.error('Error guardando puntos en storage:', e);
    }
  },

  addPoint: (point) => {
    const points = storageService.getPoints();
    const updated = [point, ...points];
    storageService.savePoints(updated);
    return updated;
  },

  // Reportes ciudadanos
  getReports: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return data ? JSON.parse(data) : INITIAL_CITIZEN_REPORTS;
    } catch {
      return INITIAL_CITIZEN_REPORTS;
    }
  },

  saveReports: (reports) => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error('Error guardando reportes en storage:', e);
    }
  },

  addReport: (report) => {
    const reports = storageService.getReports();
    const updated = [report, ...reports];
    storageService.saveReports(updated);
    return updated;
  },

  updateReportStatus: (reportId, newStatus, statusLabel, statusColor) => {
    const reports = storageService.getReports();
    const updated = reports.map(r => {
      if (r.id === reportId || r.folio === reportId) {
        return { ...r, status: newStatus, statusLabel, statusColor };
      }
      return r;
    });
    storageService.saveReports(updated);
    return updated;
  },

  // Perfil y rol de usuario
  getUserRole: () => {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE) || 'turista';
  },

  setUserRole: (role) => {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  },

  getUserProfile: () => {
    try {
      const profile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : {
        name: 'Visitante Dolorense',
        email: 'turista@doloresmagico.gob.mx',
        role: 'turista'
      };
    } catch {
      return {
        name: 'Visitante Dolorense',
        email: 'turista@doloresmagico.gob.mx',
        role: 'turista'
      };
    }
  },

  setUserProfile: (profile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }
};
