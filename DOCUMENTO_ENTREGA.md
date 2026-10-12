# Documento de Fundamentación Metodológica, Configuración de App Móvil y Bitácora de Seguimiento

**Universidad Tecnológica del Norte de Guanajuato (UTNG)**  
**Materia:** Desarrollo Móvil Integral | **Docente:** José de Jesús Eduardo Barrientos Avalos  
**Grupo:** GIDS6101-E | **Fecha Límite Inamovible del PMV:** 20 de Noviembre de 2026  

---

## 1. Datos Generales del Equipo y Proyecto Móvil

* **Nombre del equipo / proyecto:** **DoloresMágico App** (`app_Dolores_Magico` — Aplicación Móvil en Flutter & Dart)
* **Integrantes y roles asignados dentro de la metodología Scrum:**

| Rol Metodológico | Integrante y Matrícula | Responsabilidad de Gestión y Desarrollo Móvil |
| :--- | :--- | :--- |
| **Product Owner / Líder de Producto** | **Valeria Guadalupe Calvillo Mendoza** (`1223100392`) | Dueña de la visión del producto, priorización del *Product Backlog* y delimitación del alcance del PMV. Líder de Capa de Dominio y Datos en Dart (`RegistrarReporteUseCase`, `ReporteRepositoryImpl`, integración con Firebase Firestore y Cloud Storage). |
| **Scrum Master / Facilitadora de Metodología** | **María del Carmen Vargas Martínez** (`1220100084`) | Asegura el cumplimiento del marco Scrum con enfoque Hackathon, facilita ceremonias, remueve impedimentos y administra el tablero Kanban y la bitácora. Líder de Capa de Presentación en Flutter (`HomeMenuPage`, `MapaTuristicoPage`, `ReporteCiudadanoPage` y ViewModels). |
| **Dev Team / Líderes Técnicos Móviles** | **Valeria Calvillo & María Vargas** | Diseño e implementación de arquitectura **MVVM + Clean Architecture** en **Flutter y Dart**, integración de plugins nativos (`geolocator`, `image_picker`, `url_launcher`, `google_maps_flutter`), control de versiones en GitHub y compilación de APK para Android. |

---

## 2. Justificación de la Metodología (Fundamentación)

> *Seleccionamos **Scrum con enfoque Hackathon** apoyado en un tablero **Kanban en GitHub Projects** por su estructura de ciclos cortos e incrementales (Sprints de 2 semanas), óptima para mitigar riesgos ante la fecha límite del 20 de noviembre. Esta metodología nos permite realizar entregas progresivas de la aplicación móvil en Flutter, detectar errores de integración con sensores del dispositivo (cámara y GPS) y servicios de Firebase mediante Daily Standups, y recibir retroalimentación temprana de artesanos y ciudadanos. Además, desacoplar la app móvil en capas de Clean Architecture y MVVM asegura que el equipo concentre su esfuerzo en las funcionalidades prioritarias del Producto Mínimo Viable (PMV), garantizando un APK estable, probado y funcional en vivo.*  
> **(Extensión: 120 palabras — Cumple estrictamente con el límite máximo de 150 palabras)**

---

## 3. Estrategia del Producto Mínimo Viable (PMV — App Móvil)

### A. Funcionalidad Principal de la App Móvil para el 20 de Noviembre:
1. **Autenticación y Perfiles Diferenciados (`HU01` — `registro_artesano_page.dart`):** Registro e inicio de sesión con **Firebase Authentication** diferenciado para *Turista/Ciudadano*, *Artesano/Comerciante* y *Administrador*, incluyendo aceptación expresa del Aviso de Privacidad (LFPDPPP).
2. **Mapa Interactivo Geolocalizado de Dolores Hidalgo (`HU02` — `mapa_turistico_page.dart`):** Ubicación GPS en tiempo real (`geolocator` y `google_maps_flutter`) con pines interactivos de 3 colores oficiales:
   - 🔵 **Pin Azul:** Talleres artesanales de Talavera y alfarería.
   - 🟡 **Pin Amarillo:** Neverías tradicionales centenarias.
   - 🔴 **Pin Rojo:** Sitios históricos y museos de la Independencia de 1810.
3. **Directorio, Catálogo del Artesano y WhatsApp Directo (`HU04` — `ficha_taller_artesano_page.dart`):** Ficha técnica con fotos de piezas artesanales, historia del taller y botón de contacto directo por **WhatsApp** y llamada telefónica (`url_launcher`) sin intermediarios ni comisiones.
4. **Módulo de Reporte Ciudadano con Cámara, GPS y Folio (`HU03` — `reporte_ciudadano_page.dart`):** Captura de fotografía de la incidencia urbana (*Alumbrado*, *Basura*, *Vialidad*) mediante la cámara del teléfono (`image_picker`), coordenadas GPS automáticas (`geolocator`), almacenamiento en **Firebase Cloud Storage / Cloud Firestore** y generación instantánea de un folio único de seguimiento (`FOL-2026-DH-XXXX`).

### B. Justificación de Características Excluidas por el Momento:
* **Características pospuestas para próximas versiones:** Recorridos virtuales en Realidad Aumentada (AR), pasarela de pagos bancarios integrada con envíos nacionales y sistema de insignias/recompensas o reseñas complejas.
* **Justificación:** Desarrollar modelos 3D para AR o certificaciones financieras de pasarelas de pago introduciría alta complejidad técnica y dependencias externas que comprometerían la estabilidad del aplicativo móvil antes del 20 de noviembre. El botón directo a WhatsApp resuelve el comercio justo de inmediato sin fricción técnica.

---

## 4. Especificación Técnica de la App Móvil en el Repositorio (Flutter & Dart)

En atención a la observación docente, el repositorio aloja la estructura nativa de la **Aplicación Móvil en Flutter y Dart** bajo el patrón **MVVM integrado con Clean Architecture** y los patrones **Repository** y **Singleton**:

* **Configuración Móvil Nativa:**
  - `pubspec.yaml`: Gestión de paquetes móviles (`provider`, `firebase_core`, `firebase_auth`, `cloud_firestore`, `firebase_storage`, `firebase_messaging`, `google_maps_flutter`, `geolocator`, `image_picker`, `hive`, `url_launcher`).
  - `android/app/src/main/AndroidManifest.xml` y `android/app/build.gradle`: Configuración de permisos de cámara (`CAMERA`), ubicación (`ACCESS_FINE_LOCATION`) e intents hacia WhatsApp bajo el principio de mínimo privilegio.
  - `ios/Runner/Info.plist`: Declaración de permisos de privacidad (`NSCameraUsageDescription`, `NSLocationWhenInUseUsageDescription`).
* **Capas de Clean Architecture + MVVM en `lib/`:**
  - **Capa de Presentación (`lib/presentation/`):** Vistas en Flutter (`HomeMenuPage`, `MapaTuristicoPage`, `FichaTallerArtesanoPage`, `ReporteCiudadanoPage`, `RegistroArtesanoPage`, `AdminValidacionPage`) y ViewModels reactivos (`ReporteViewModel`, `MapaTuristicoViewModel`, `AuthViewModel`).
  - **Capa de Dominio (`lib/domain/`):** Entidades (`ReporteUrbano`, `TallerArtesano`, `ProductoArtesanal`, `UsuarioApp`), interfaces de repositorio (`ReporteRepository`, `ArtesanoRepository`) y Casos de Uso (`RegistrarReporteUseCase`, `ExplorarMapaTuristicoUseCase`, `ContactarArtesanoWhatsappUseCase`).
  - **Capa de Datos (`lib/data/`):** Implementación de repositorios (`ReporteRepositoryImpl`, `ArtesanoRepositoryImpl`), modelos DTO y fuentes de datos (`FirestoreRemoteDataSource` y caché offline `HiveLocalDataSource`).

---

## 5. Bitácora de Seguimiento del Proyecto (Sprints, Ceremonias y Control de Cambios)

### 5.1 Seguimiento General de Sprints hacia el 20 de Noviembre
| Sprint | Periodo | Meta del Sprint | Entregables Móviles Verificados | Avance | Estado |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **Sprint 1** | 01 Sep – 18 Sep 2026 | Planeación técnica, prototipo de 3 pantallas y diseño de arquitectura MVVM + Clean Architecture. | Propuesta técnica UTNG, Diagrama UML de clases y Product Backlog inicial. | 100% | ✅ Completado |
| **Sprint 2** | 21 Sep – 12 Oct 2026 | Construcción de la estructura móvil en **Flutter & Dart**, alta de Issues en GitHub y Bitácora de Seguimiento. | Código móvil en `lib/`, `android/`, `ios/`, `pubspec.yaml`, 7 Issues activos, ramas GitFlow y `BITACORA_SEGUIMIENTO.md`. | 100% | ✅ Completado |
| **Sprint 3** | 13 Oct – 02 Nov 2026 | Integración en vivo con Firebase (Auth, Firestore, Storage, FCM) y sensores móviles (Cámara y GPS). | Sincronización en la nube, subida de fotos desde cámara y persistencia offline con Hive. | 65% | 🔄 En Curso |
| **Sprint 4** | 03 Nov – 20 Nov 2026 | Pruebas unitarias, de widgets y de campo con artesanos; *Code Freeze* (18 Nov) y APK final. | Paquete instalable `app-release.apk` y demostración en vivo el **20 de noviembre**. | 0% | 📅 Programado |

### 5.2 Bitácora Cronológica de Sesiones y Ceremonias Scrum
| Fecha | Ceremonia / Actividad | Responsables | Actividades Realizadas y Acuerdos | Impedimentos / Observaciones y Solución | Evidencia en Repo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **04/09/2026** | **Sprint 1 Planning** | Valeria C. (PO), María V. (SM) | Definición del problema en Dolores Hidalgo y selección de las 4 funcionalidades prioritarias del MVP móvil. | Se recortaron AR y pasarela de pagos para mitigar riesgo de tiempo. | Propuesta Técnica (Secciones 1–5) |
| **14/09/2026** | **Diseño de Arquitectura Móvil** | Valeria C., María V. | Elección de **MVVM + Clean Architecture** para Flutter y creación del Diagrama UML del módulo de Reporte Ciudadano. | Separación en 3 capas (`presentation`, `domain`, `data`) para trabajo paralelo sin conflictos. | `arquitetura .pdf` y `lib/` |
| **23/09/2026** | **Juego de Roles y Sprint 2 Planning** | Valeria C. (PO), María V. (SM) | Asignación de roles de startup, redacción de historias de usuario (`HU01`–`HU05`) y configuración de ramas GitFlow. | Ninguno. | `DOCUMENTO_ENTREGA.md` |
| **02/10/2026** | **Daily Standup — Seguridad Móvil** | Valeria C., María V. | Aplicación de LFPDPPP (Aviso de Privacidad) y OWASP Mobile Top 10 (Mínimo Privilegio en `AndroidManifest.xml` e `Info.plist`). | Se aseguraron permisos estrictos de cámara y GPS solo en uso. | `android/` e `ios/` |
| **04/10/2026** | **Sincronización de Tablero** | María V. (SM) | Creación automatizada de los 7 Issues (`HU01` a `HU05` + Sprints 2 y 3), etiquetas y Milestones en GitHub. | Ninguno. | `ISSUES_PRODUCT_BACKLOG.md` |
| **12/10/2026** | **Sprint 2 Review & Retrospectiva** | Valeria C. (PO), María V. (SM) | **Atención a retroalimentación docente:** Reestructuración del repositorio con el código nativo de la **App Móvil en Flutter & Dart** e incorporación de la **Bitácora de Seguimiento**. | **Observación Docente:** El repo mostraba una App Web y faltaba bitácora.<br>**Solución:** Se migró el repositorio a estructura móvil **Flutter/Dart (`lib/`, `pubspec.yaml`, `android/`, `ios/`)** y se integró la bitácora oficial. | `BITACORA_SEGUIMIENTO.md`, `lib/main.dart` |

### 5.3 Trazabilidad de Issues, Ramas Git y Archivos Móviles (Flutter)
| Issue | Historia de Usuario | Rama Git | Archivos de la App Móvil (`lib/`) | Responsable | Estado |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **#1** | **HU01:** Registro y Perfiles | `feature/catalogo-artesano` | `usuario_app.dart`, `auth_viewmodel.dart`, `registro_artesano_page.dart` | Valeria C. & María V. | ✅ Completado |
| **#2** | **HU02:** Mapa GPS 3 Pines | `feature/mapa-turistico` | `explorar_mapa_turistico_usecase.dart`, `mapa_turistico_viewmodel.dart`, `mapa_turistico_page.dart` | María V. & Valeria C. | ✅ Completado |
| **#3** | **HU03:** Reporte Ciudadano | `feature/reporte-ciudadano` | `reporte_urbano.dart`, `registrar_reporte_usecase.dart`, `reporte_repository_impl.dart`, `reporte_viewmodel.dart`, `reporte_ciudadano_page.dart` | Valeria C. & María V. | ✅ Completado |
| **#4** | **HU04:** Catálogo y WhatsApp | `feature/catalogo-artesano` | `taller_artesano.dart`, `contactar_artesano_whatsapp_usecase.dart`, `ficha_taller_artesano_page.dart` | María V. & Valeria C. | ✅ Completado |
| **#5** | **HU05:** Validación Admin | `develop` | `validar_registros_admin_usecase.dart`, `admin_validacion_page.dart` | Valeria C. | 🔄 En Revisión |

---

## 6. Enlaces de Control (Acceso Público Activo)

* **URL del Repositorio de Código Móvil (Flutter & Dart):**  
  [https://github.com/valeria1732/app_Dolores_Magico](https://github.com/valeria1732/app_Dolores_Magico)
* **URL de la Bitácora Oficial de Seguimiento en GitHub:**  
  [https://github.com/valeria1732/app_Dolores_Magico/blob/main/BITACORA_SEGUIMIENTO.md](https://github.com/valeria1732/app_Dolores_Magico/blob/main/BITACORA_SEGUIMIENTO.md)
* **URL del Tablero de Seguimiento (GitHub Projects / Issues):**  
  [https://github.com/valeria1732/app_Dolores_Magico/projects](https://github.com/valeria1732/app_Dolores_Magico/projects) | [https://github.com/valeria1732/app_Dolores_Magico/issues](https://github.com/valeria1732/app_Dolores_Magico/issues)
