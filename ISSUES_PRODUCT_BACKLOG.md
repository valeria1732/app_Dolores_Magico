# 📋 Product Backlog e Issues Oficiales — DoloresMágico App (App Móvil Flutter & Dart)
**Universidad Tecnológica del Norte de Guanajuato (UTNG)**  
**Materia:** Desarrollo Móvil Integral | **Profesor:** José de Jesús Eduardo Barrientos Avalos  
**Equipo:** Valeria Guadalupe Calvillo Mendoza (`1223100392`) & María del Carmen Vargas Martínez (`1220100084`) | **Grupo:** GIDS6101-E  

---

## 📌 Detalle de Issues del Product Backlog (Prioridad, Criterios y Tareas en Flutter)

### 🟢 Issue #1: [ALTA] HU01 — Autenticación y Registro Diferenciado de Artesanos y Ciudadanos
- **Prioridad:** `Alta (MVP)`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `authentication`, `mvp`
- **Milestone:** `Sprint 1 - MVP DoloresMágico`
- **Rama Git:** `feature/catalogo-artesano`

#### Descripción:
> **Como** artesano de Talavera de Dolores Hidalgo o habitante/turista,  
> **Quiero** registrar mi taller o seleccionar mi perfil diferenciado en la aplicación móvil,  
> **Para** que los visitantes conozcan mi negocio y llegar directamente a él.

#### Criterios de Aceptación:
- [x] Selector interactivo de perfil en Flutter (`ChoiceChip`): *Turista*, *Ciudadano*, *Artesano* y *Administrador*.
- [x] Casilla obligatoria de consentimiento expreso del Aviso de Privacidad (LFPDPPP).
- [x] Gestión reactiva de estado mediante `AuthViewModel` (`Provider`) y `AuthRepositoryImpl` (`FirebaseAuth`).

#### Tareas Técnicas (App Móvil Flutter):
1. Crear entidad `lib/domain/entities/usuario_app.dart` y contrato `lib/domain/repositories/auth_repository.dart`.
2. Implementar `lib/presentation/viewmodels/auth_viewmodel.dart` y vista `lib/presentation/views/auth/registro_artesano_page.dart`.

---

### 🟢 Issue #2: [ALTA] HU02 — Mapa GPS Geolocalizado con Pines Diferenciados por Color
- **Prioridad:** `Alta (MVP)`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `map-gps`, `mvp`
- **Milestone:** `Sprint 1 - MVP DoloresMágico`
- **Rama Git:** `feature/mapa-turistico`

#### Descripción:
> **Como** visitante o turista,  
> **Quiero** consultar un mapa interactivo en mi teléfono que pueda filtrar por categorías con pines de colores,  
> **Para** planificar una ruta de recorrido por talleres de Talavera, neverías tradicionales y sitios históricos.

#### Criterios de Aceptación:
- [x] Coordenadas GPS centradas en la Plaza Principal de Dolores Hidalgo (`21.15605, -100.93245`).
- [x] Pines interactivos codificados por color según la Sección 6 del documento técnico:
  - 🔵 **Azul (`AppColors.pinTalaveraAzul`):** Talleres de Talavera y alfarería.
  - 🟡 **Amarillo (`AppColors.pinNievesAmarillo`):** Neverías tradicionales.
  - 🔴 **Rojo (`AppColors.pinHistoricoRojo`):** Sitios Históricos de la Independencia.
- [x] Al seleccionar un pin, navega a `FichaTallerArtesanoPage` con el catálogo y localización.

#### Tareas Técnicas (App Móvil Flutter):
1. Desarrollar caso de uso `lib/domain/usecases/explorar_mapa_turistico_usecase.dart`.
2. Implementar `lib/presentation/viewmodels/mapa_turistico_viewmodel.dart` y vista `lib/presentation/views/mapa/mapa_turistico_page.dart`.

---

### 🟢 Issue #3: [ALTA] HU03 — Módulo de Reporte Ciudadano con Captura de Foto, GPS y Folio
- **Prioridad:** `Alta (MVP)`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `citizen-report`, `gps`, `mvp`
- **Milestone:** `Sprint 1 - MVP DoloresMágico`
- **Rama Git:** `feature/reporte-ciudadano`

#### Descripción:
> **Como** ciudadano de Dolores Hidalgo,  
> **Quiero** enviar una fotografía tomada con la cámara del teléfono acompañada de la ubicación GPS de un servicio público con problema,  
> **Para** solicitar su atención y recibir un folio único de seguimiento.

#### Criterios de Aceptación:
- [x] Implementación exacta del Diagrama de Clases UML:
  - Vista `ReporteCiudadanoPage` (`displayForm()`, `capturePhoto()`, `showConfirmationFolio(folio)`).
  - ViewModel `ReporteViewModel` (`capturarFotoYUbicacion()`, `enviarReporte(descripcion, categoria)`).
  - Dominio `RegistrarReporteUseCase` y entidad `ReporteUrbano`.
  - Datos `ReporteRepositoryImpl` conectado a `FirestoreRemoteDataSource` (Cloud Firestore + Cloud Storage) y `HiveLocalDataSource`.
- [x] Generación automática de folio con formato `FOL-2026-DH-XXXX`.

---

### 🟢 Issue #4: [ALTA] HU04 — Ficha Técnica, Catálogo del Artesano y Contacto Directo WhatsApp
- **Prioridad:** `Alta (MVP)`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `catalog`, `mvp`
- **Milestone:** `Sprint 1 - MVP DoloresMágico`
- **Rama Git:** `feature/catalogo-artesano`

#### Descripción:
> **Como** usuario de la app móvil,  
> **Quiero** comunicarme directamente con un artesano mediante WhatsApp desde su ficha técnica,  
> **Para** consultar precios, productos, disponibilidad o realizar pedidos sin intermediarios.

#### Tareas Técnicas (App Móvil Flutter):
1. Implementar `lib/domain/usecases/contactar_artesano_whatsapp_usecase.dart` usando `url_launcher`.
2. Construir vista `lib/presentation/views/catalogo/ficha_taller_artesano_page.dart`.

---

### 🟢 Issue #5: [ALTA] HU05 — Administración y Validación Municipal
- **Prioridad:** `Alta (MVP)`
- **Rama Git:** `develop`
- **Archivos Flutter:** `lib/domain/usecases/validar_registros_admin_usecase.dart` y `lib/presentation/views/admin/admin_validacion_page.dart`.

---

### 🟡 Issue #6: [MEDIA] Sistema de Notificaciones Push sobre Festividades (FCM)
- **Prioridad:** `Media (Sprint 3)`
- **Archivos Flutter:** `lib/core/services/firebase_singleton_service.dart` (`firebase_messaging`).

---

### 🔵 Issue #7: [BAJA] Sistema de Calificaciones y Reseñas para Talleres
- **Prioridad:** `Baja (Sprint 4 / Próximas Versiones)`
