# 📓 Bitácora Oficial de Seguimiento del Proyecto — DoloresMágico App (App Móvil Flutter)

**Institución:** Universidad Tecnológica del Norte de Guanajuato (UTNG)  
**Materia:** Desarrollo Móvil Integral  
**Docente:** José de Jesús Eduardo Barrientos Avalos  
**Proyecto:** **DoloresMágico App** *(Aplicación Móvil Multiplataforma en Flutter & Dart)*  
**Grupo:** GIDS6101-E  
**Integrantes y Roles Metodológicos:**  
- **Valeria Guadalupe Calvillo Mendoza** (Matrícula: `1223100392`) — **Product Owner / Líder de Producto & Arquitecta Mobile Backend (Firebase/Clean Architecture)**  
- **María del Carmen Vargas Martínez** (Matrícula: `1220100084`) — **Scrum Master / Facilitadora Metodológica & Líder Mobile UI/UX (Flutter/MVVM)**  

**Fecha Límite Inamovible del PMV:** 20 de Noviembre de 2026  
**Repositorio de Código Móvil (Flutter/Dart):** [https://github.com/valeria1732/app_Dolores_Magico](https://github.com/valeria1732/app_Dolores_Magico)  
**Tablero de Control (GitHub Projects):** [https://github.com/valeria1732/app_Dolores_Magico/projects](https://github.com/valeria1732/app_Dolores_Magico/projects)  
**Listado de Issues (Backlog Activo):** [https://github.com/valeria1732/app_Dolores_Magico/issues](https://github.com/valeria1732/app_Dolores_Magico/issues)  

---

## 1. Resumen de Sprints y Ruta Crítica hacia el 20 de Noviembre

| Sprint | Periodo | Objetivo del Sprint (Sprint Goal) | Entregables Clave de la App Móvil | Avance | Estado |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **Sprint 1** | 01 Sep – 18 Sep 2026 | Planeación técnica, definición del MVP, diseño de 3 pantallas en Figma y arquitectura móvil MVVM + Clean Architecture. | Propuesta técnica inicial, Diagrama UML de clases para Flutter y definición de capas (`presentation`, `domain`, `data`). | **100%** | ✅ Completado |
| **Sprint 2** | 21 Sep – 12 Oct 2026 | Configuración del proyecto móvil en **Flutter & Dart**, implementación de vistas/ViewModels del PMV, seguridad OWASP y bitácora de seguimiento. | Código fuente móvil nativo (`lib/`, `android/`, `ios/`, `pubspec.yaml`), 7 Issues en GitHub, ramas GitFlow y Bitácora de Seguimiento. | **100%** | ✅ Completado |
| **Sprint 3** | 13 Oct – 02 Nov 2026 | Integración completa de servicios en la nube (**Firebase Auth, Firestore, Storage, FCM**) y sensores del teléfono (`geolocator`, `image_picker`). | Persistencia en tiempo real en Firestore, subida de evidencias desde cámara móvil y caché local con Hive (offline-first). | **65%** | 🔄 En Curso |
| **Sprint 4** | 03 Nov – 20 Nov 2026 | Pruebas unitarias, de widgets y de campo con artesanos dolorenses; *Code Freeze* (18 Nov) y generación de APK de producción. | APK firmado (`flutter build apk --release`), pruebas superadas y demostración funcional en vivo el **20 de noviembre**. | **0%** | 📅 Programado |

---

## 2. Bitácora Cronológica de Sesiones, Ceremonias Scrum y Seguimiento

| N.º | Fecha | Ceremonia / Actividad | Participantes | Actividades Realizadas (¿Qué se hizo?) | Acuerdos y Próximos Pasos (¿Qué se hará?) | Impedimentos / Observaciones y Solución Aplicada | Evidencia / Artefacto |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | 02/09/2026 | **Kickoff del Proyecto** | Valeria Calvillo, María Vargas | Definición de metas del curso *Desarrollo Móvil Integral* y selección del stack móvil: **Flutter, Dart y Firebase**. | Redactar el planteamiento del problema turístico y comunitario de Dolores Hidalgo C.I.N. | Ninguno. | `Reporte_Desarrollo_Movil_Integral_Valeria_Maria.pdf` |
| **02** | 04/09/2026 | **Sprint 1 Planning** | Valeria Calvillo (PO), María Vargas (SM) | Delimitación del problema (baja visibilidad digital de talleres de Talavera y demora en reportes urbanos) y definición de los 4 módulos del MVP. | Diseñar el prototipo conceptual de 3 pantallas móviles y establecer el Product Backlog inicial. | Necesidad de acotar alcance: se descartaron AR y pasarela de pagos para asegurar viabilidad al 20 de noviembre. | `Propuesta y Planeación Técnica del Proyecto Integrador.pdf` |
| **03** | 11/09/2026 | **Daily Standup / Revisión UI** | María Vargas (SM/UI), Valeria Calvillo (PO) | Diseño del flujo de navegación móvil: Pantalla 1 (Home Selector), Pantalla 2 (Mapa GPS con pines Azul, Amarillo y Rojo) y Pantalla 3 (Reporte Ciudadano con Folio). | Seleccionar y justificar formalmente la arquitectura de software para Flutter. | Definición visual de pines por categoría resuelta mediante paleta de colores oficial (`AppColors`). | Prototipo conceptual (Secciones 6 y 7) |
| **04** | 14/09/2026 | **Sesión de Arquitectura Móvil** | Valeria Calvillo, María Vargas | Evaluación comparativa de MVC vs. MVVM vs. Clean Architecture. Elección de **MVVM integrada con Clean Architecture** y diseño del Diagrama UML en Visual Paradigm. | Implementar las clases del diagrama UML (`ReporteCiudadanoPage`, `ReporteViewModel`, `RegistrarReporteUseCase`, `ReporteUrbano`, `ReporteRepositoryImpl`). | Complejidad inicial de capas mitigada separando `lib/domain`, `lib/data` y `lib/presentation`. | `arquitetura .pdf` |
| **05** | 23/09/2026 | **Juego de Roles y Planeación (Sprint 2 Planning)** | Valeria Calvillo (PO), María Vargas (SM) | Asunción formal de roles de startup tecnológica. Redacción de la justificación metodológica (<150 palabras), desglose de historias de usuario (`HU01`–`HU05`) y creación del repositorio GitHub. | Dar de alta los tickets/issues en GitHub y configurar las ramas `main`, `develop` y `feature/*`. | Ninguno. | `DOCUMENTO_ENTREGA.md` |
| **06** | 02/10/2026 | **Daily Standup / Seguridad Móvil** | Valeria Calvillo, María Vargas | Incorporación de principios de la LFPDPPP (Aviso de Privacidad, Derechos ARCO) y codificación segura OWASP Mobile Top 10 (Mínimo Privilegio en `AndroidManifest.xml` e `Info.plist`). | Automatizar la carga de los 7 Issues, etiquetas de prioridad y Milestones en GitHub. | Se eliminó cualquier llave hardcodeada usando variables de entorno y `.gitignore`. | `Cuestionario.pdf`, `AndroidManifest.xml`, `Info.plist` |
| **07** | 04/10/2026 | **Configuración de Centro de Control** | María Vargas (SM), Valeria Calvillo (PO) | Ejecución del script de aprovisionamiento para registrar los 7 Issues (`HU01` a `HU05` + Sprints 2 y 3) en GitHub y vincularlos al tablero Kanban. | Validar la arquitectura de nube (BaaS en Firebase) y revisar retroalimentación del docente. | Ninguno. | `ISSUES_PRODUCT_BACKLOG.md`, `scripts/create_issues.js` |
| **08** | 08/10/2026 | **Daily Standup / Cloud & Persistencia** | Valeria Calvillo, María Vargas | Diseño de la integración con nube pública en Firebase (Auth, Cloud Firestore, Cloud Storage) y persistencia local con Hive para zonas sin cobertura. | Integrar los repositorios en Dart (`ReporteRepositoryImpl` y `ArtesanoRepositoryImpl`). | Riesgo de desconexión en zonas rurales de talleres mitigado con patrón *Repository* y caché local Hive. | `custionario 2.pdf`, `lib/data/repositories/` |
| **09** | 12/10/2026 | **Sprint 2 Review & Retrospectiva (Atención a Observaciones Docentes)** | Valeria Calvillo (PO), María Vargas (SM) | **1)** Reestructuración integral del repositorio para sustituir el prototipo web por el proyecto nativo de **App Móvil en Flutter & Dart (`lib/`, `android/`, `ios/`, `test/`, `pubspec.yaml`)**.<br>**2)** Elaboración e integración de la **Bitácora de Seguimiento** para auditoría docente. | Continuar con el Sprint 3: pruebas de cámara y GPS en dispositivo físico Android y sincronización en vivo con Firebase. | **Observación Docente Atendida:** El repositorio mostraba una App Web y faltaba la bitácora de seguimiento. **Solución:** Se migró todo el árbol de código a **Flutter/Dart móvil** y se incorporó esta bitácora detallada en el repositorio y documentos de entrega. | `lib/main.dart`, `pubspec.yaml`, `BITACORA_SEGUIMIENTO.md` |

---

## 3. Bitácora de Trazabilidad Técnica: Historias de Usuario, Código Móvil (Flutter) y Ramas Git

| ID Issue | Historia de Usuario / Requerimiento | Prioridad | Rama de Git Asociada | Componentes Móviles en Flutter (`lib/`) | Responsable | Estado en Tablero |
| :---: | :--- | :---: | :--- | :--- | :--- | :---: |
| **Issue #1** | **HU01:** Autenticación y Registro Diferenciado (Turista, Ciudadano, Artesano) | **Alta (MVP)** | `feature/catalogo-artesano` | `lib/domain/entities/usuario_app.dart`<br>`lib/presentation/viewmodels/auth_viewmodel.dart`<br>`lib/presentation/views/auth/registro_artesano_page.dart` | Valeria Calvillo & María Vargas | ✅ Completado |
| **Issue #2** | **HU02:** Mapa GPS Interactivo con Pines de 3 Colores (Azul, Amarillo y Rojo) | **Alta (MVP)** | `feature/mapa-turistico` | `lib/domain/usecases/explorar_mapa_turistico_usecase.dart`<br>`lib/presentation/viewmodels/mapa_turistico_viewmodel.dart`<br>`lib/presentation/views/mapa/mapa_turistico_page.dart` | María Vargas (UI) & Valeria Calvillo | ✅ Completado |
| **Issue #3** | **HU03:** Módulo de Reporte Ciudadano con Cámara, GPS y Folio (`FOL-2026-DH-XXXX`) | **Alta (MVP)** | `feature/reporte-ciudadano` | `lib/domain/entities/reporte_urbano.dart`<br>`lib/domain/usecases/registrar_reporte_usecase.dart`<br>`lib/data/repositories/reporte_repository_impl.dart`<br>`lib/presentation/viewmodels/reporte_viewmodel.dart`<br>`lib/presentation/views/reportes/reporte_ciudadano_page.dart` | Valeria Calvillo (Data/Domain) & María Vargas (View) | ✅ Completado |
| **Issue #4** | **HU04:** Ficha Técnica, Catálogo del Artesano y Contacto Directo WhatsApp | **Alta (MVP)** | `feature/catalogo-artesano` | `lib/domain/entities/taller_artesano.dart`<br>`lib/domain/usecases/contactar_artesano_whatsapp_usecase.dart`<br>`lib/presentation/views/catalogo/ficha_taller_artesano_page.dart` | María Vargas & Valeria Calvillo | ✅ Completado |
| **Issue #5** | **HU05:** Panel de Administración y Validación Municipal de Reportes y Talleres | **Alta (MVP)** | `develop` | `lib/domain/usecases/validar_registros_admin_usecase.dart`<br>`lib/presentation/views/admin/admin_validacion_page.dart` | Valeria Calvillo | 🔄 En Revisión (PR) |
| **Issue #6** | Agenda de Festividades Culturales y Notificaciones Push (FCM) | **Media** | `develop` | `lib/core/services/firebase_singleton_service.dart` | María Vargas | 📋 Sprint 3 |
| **Issue #7** | Sistema de Calificaciones y Reseñas Comunitarias | **Baja** | `Backlog` | Programado para iteración posterior al PMV | Equipo Dev | 📋 Sprint 4 / Futuro |

---

## 4. Bitácora de Commits Semánticos y Control de Versiones (GitFlow)

Siguiendo la **Sección 16 (Estrategia de Versionamiento)** del documento técnico, el seguimiento de cambios en el repositorio se rige por commits semánticos (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`):

| Fecha | Rama | Tipo / Commit Semántico | Descripción del Cambio Registrado | Autor |
| :--- | :--- | :--- | :--- | :--- |
| 02/10/2026 | `main` | `feat: initial setup` | Inicialización del repositorio público y estructura base del proyecto. | Valeria Calvillo |
| 04/10/2026 | `develop` | `ci: github issues` | Automatización de creación de los 7 Issues del Product Backlog, etiquetas y Milestones. | María Vargas |
| 12/10/2026 | `feature/mapa-turistico` | `feat(mapa): implementar MapaTuristicoPage y ViewModel con pines Azul, Amarillo y Rojo` | Desarrollo de la vista móvil en Flutter y filtrado por categorías geolocalizadas de Dolores Hidalgo. | María Vargas |
| 12/10/2026 | `feature/catalogo-artesano` | `feat(catalogo): agregar FichaTallerArtesanoPage y deep-link directo a WhatsApp (HU04)` | Implementación del catálogo de piezas de Talavera y botón `url_launcher` hacia WhatsApp sin comisiones. | María Vargas |
| 12/10/2026 | `feature/reporte-ciudadano` | `feat(reportes): implementar arquitectura MVVM y Clean Architecture para ReporteCiudadanoPage (HU03)` | Creación de `ReporteUrbano`, `RegistrarReporteUseCase`, `ReporteRepositoryImpl` y `ReporteViewModel` conforme al diagrama UML. | Valeria Calvillo |
| 12/10/2026 | `develop` -> `main` | `docs(bitacora): incorporar Bitácora de Seguimiento y migrar repositorio a App Móvil Flutter` | Atención puntual a las observaciones del docente: bitácora completa de seguimiento y estructura 100% App Móvil en Flutter/Dart. | Valeria Calvillo & María Vargas |
