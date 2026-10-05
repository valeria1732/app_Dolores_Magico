import React, { useState, useEffect } from 'react';
import './styles/variables.css';
import './App.css';

// Componentes Modulares por Capas y Carpetas
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import NotificationToast from './components/common/NotificationToast/NotificationToast';

import HeroHome from './components/home/HeroHome/HeroHome';
import InteractiveMap from './components/map/InteractiveMap/InteractiveMap';
import ArtisanDirectory from './components/catalog/ArtisanDirectory/ArtisanDirectory';
import ArtisanDetailModal from './components/catalog/ArtisanDetailModal/ArtisanDetailModal';
import CitizenReportForm from './components/reports/CitizenReportForm/CitizenReportForm';
import ReportSuccessModal from './components/reports/ReportSuccessModal/ReportSuccessModal';
import ReportsList from './components/reports/ReportsList/ReportsList';
import CulturalEvents from './components/events/CulturalEvents/CulturalEvents';
import AdminValidationPanel from './components/admin/AdminValidationPanel/AdminValidationPanel';
import AuthModal from './components/auth/AuthModal/AuthModal';

// Servicios de Datos y Persistencia (Clean Architecture)
import { storageService } from './services/storageService';

export default function App() {
  // Navegación principal: 'home' | 'map' | 'catalog' | 'reports' | 'events' | 'admin'
  const [activeTab, setActiveTab] = useState('home');

  // Subvista dentro del módulo de reportes: 'form' | 'list'
  const [reportSubView, setReportSubView] = useState('form');

  // Datos de puntos de interés (Talavera, Nieves, Sitios Históricos)
  const [points, setPoints] = useState(() => storageService.getPoints());

  // Reportes ciudadanos registrados
  const [reports, setReports] = useState(() => storageService.getReports());

  // Rol activo del usuario: 'turista' | 'ciudadano' | 'artesano' | 'admin'
  const [userRole, setUserRole] = useState(() => storageService.getUserRole());

  // Punto seleccionado para modal de detalle
  const [selectedPointForModal, setSelectedPointForModal] = useState(null);

  // Punto seleccionado para enfocar en mapa
  const [pointToFocusOnMap, setPointToFocusOnMap] = useState(null);

  // Modales
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [newlyCreatedReport, setNewlyCreatedReport] = useState(null);

  // Notificaciones Toast
  const [toast, setToast] = useState(null);

  const showToast = (toastData) => {
    setToast(toastData);
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Navegar al mapa y centrar en un punto específico
  const handleNavigateToMapPoint = (point) => {
    setPointToFocusOnMap(point);
    setActiveTab('map');
  };

  // Manejar reporte enviado con éxito
  const handleReportSubmitted = (createdReport) => {
    const updatedReports = storageService.getReports();
    setReports(updatedReports);
    setNewlyCreatedReport(createdReport);
    showToast({
      type: 'success',
      message: `¡Reporte enviado! Folio generado: ${createdReport.folio}`
    });
  };

  // Manejar registro de un nuevo artesano (HU01)
  const handleRegisterArtisan = (newArtisanPoint) => {
    const updated = storageService.addPoint(newArtisanPoint);
    setPoints(updated);
    showToast({
      type: 'success',
      message: `¡Taller "${newArtisanPoint.name}" registrado! Pendiente de validación municipal.`
    });
  };

  return (
    <div className="dolores-app-shell">
      {/* 1. Barra de Navegación Global */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* 2. Contenido Principal Dinámico */}
      <main className="dolores-main-content">
        {/* PANTALLA 1: HOME / MENÚ PRINCIPAL (Selector directo entre Explorar y Reportar) */}
        {activeTab === 'home' && (
          <HeroHome
            setActiveTab={setActiveTab}
            pointsCount={points.length}
            reportsCount={reports.length}
          />
        )}

        {/* PANTALLA 2: INTERACCIÓN PRINCIPAL (MAPA & PINES DIFERENCIADOS POR COLOR) */}
        {activeTab === 'map' && (
          <div className="view-wrapper">
            <InteractiveMap
              points={points}
              selectedPoint={pointToFocusOnMap}
              onSelectPoint={(point) => setSelectedPointForModal(point)}
            />
          </div>
        )}

        {/* DIRECTORIO Y CATÁLOGO DE ARTESANOS (HU04: Contacto directo WhatsApp) */}
        {activeTab === 'catalog' && (
          <div className="view-wrapper">
            <ArtisanDirectory
              points={points}
              onSelectPoint={(point) => setSelectedPointForModal(point)}
              onNavigateToMap={handleNavigateToMapPoint}
            />
          </div>
        )}

        {/* PANTALLA 3: MÓDULO DE REPORTE CIUDADANO (Foto, GPS y Folio) */}
        {activeTab === 'reports' && (
          <div className="view-wrapper">
            {reportSubView === 'form' ? (
              <CitizenReportForm
                onReportSubmitted={handleReportSubmitted}
                onViewReports={() => setReportSubView('list')}
              />
            ) : (
              <ReportsList
                reports={reports}
                onNewReportClick={() => setReportSubView('form')}
              />
            )}
          </div>
        )}

        {/* AGENDA DE FESTIVIDADES Y EVENTOS CULTURALES */}
        {activeTab === 'events' && (
          <div className="view-wrapper">
            <CulturalEvents onExploreRoute={() => setActiveTab('map')} />
          </div>
        )}

        {/* PANEL DE VALIDACIÓN Y ADMINISTRACIÓN (HU05) */}
        {activeTab === 'admin' && (
          <div className="view-wrapper">
            <AdminValidationPanel
              points={points}
              setPoints={setPoints}
              reports={reports}
              setReports={setReports}
              onToast={showToast}
            />
          </div>
        )}
      </main>

      {/* 3. Modales y Overlays */}
      {/* Modal de Ficha Técnica del Artesano con Catálogo y WhatsApp */}
      {selectedPointForModal && (
        <ArtisanDetailModal
          artisan={selectedPointForModal}
          onClose={() => setSelectedPointForModal(null)}
          onNavigateToMap={handleNavigateToMapPoint}
        />
      )}

      {/* Modal de Confirmación de Reporte Ciudadano con Folio */}
      {newlyCreatedReport && (
        <ReportSuccessModal
          report={newlyCreatedReport}
          onClose={() => setNewlyCreatedReport(null)}
          onViewAllReports={() => {
            setNewlyCreatedReport(null);
            setReportSubView('list');
          }}
        />
      )}

      {/* Modal de Roles y Registro de Artesanos (HU01) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentRole={userRole}
        onRoleChanged={(newRole) => {
          setUserRole(newRole);
          showToast({
            type: 'info',
            message: `Perfil cambiado a: ${newRole.toUpperCase()}`
          });
        }}
        onRegisterArtisan={handleRegisterArtisan}
      />

      {/* Notificaciones flotantes */}
      <NotificationToast toast={toast} onClose={() => setToast(null)} />

      {/* 4. Pie de Página Oficial UTNG & Dolores Hidalgo */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
