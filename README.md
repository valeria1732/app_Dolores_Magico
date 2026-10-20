# 📱 DoloresMágico App (o DoloresConecta) — Aplicación Móvil en Flutter & Dart
> *"Talavera, cultura y comunidad: la Cuna de la Independencia en tus manos."*

Proyecto Integrador para la materia **Desarrollo Móvil Integral** — **Universidad Tecnológica del Norte de Guanajuato (UTNG)**.

- **Docente:** José de Jesús Eduardo Barrientos Avalos  
- **Integrantes del Equipo:**  
  - **Valeria Guadalupe Calvillo Mendoza** (Matrícula: `1223100392`) — *Product Owner & Mobile Backend / Clean Architecture Lead*  
  - **María del Carmen Vargas Martínez** (Matrícula: `1220100084`) — *Scrum Master & Mobile UI/UX Flutter Lead*  
- **Grupo:** GIDS6101-E  
- **Metodología:** Scrum con enfoque Hackathon + Tablero Kanban en GitHub Projects  
- **Fecha Límite Inamovible del PMV:** 20 de Noviembre de 2026  

---

## 🚀 Explicación Detallada del Sprint 1 — Cimientos Móviles y Núcleo del PMV (Flutter & Dart)

> 📌 **Accesos Rápidos de Auditoría del Sprint 1, Nube y Seguridad:**  
> - 📋 [**Ver Tablero Kanban de Seguimiento (`projects/1`)**](https://github.com/users/valeria1732/projects/1) | [**Issues del Proyecto**](https://github.com/valeria1732/app_Dolores_Magico/issues)  
> - 🔒 [**Ficha de Diseño: Nube y Seguridad (`FICHA_NUBE_Y_SEGURIDAD.md`)**](./FICHA_NUBE_Y_SEGURIDAD.md) | [**PDF 1 Página**](./Ficha_de_Diseno_Nube_y_Seguridad_Dolores_Magico.pdf) | [**DOCX**](./Ficha_de_Diseno_Nube_y_Seguridad_Dolores_Magico.docx)  
> - 🏛️ [**Dossier: Centros de Datos y Nube (15 Preguntas con APA 7)**](./INVESTIGACION_CENTROS_DE_DATOS_Y_NUBE.md) | [**PDF Completo**](./Investigacion_Centros_de_Datos_y_Nube.pdf) | [**DOCX**](./Investigacion_Centros_de_Datos_y_Nube.docx)  
> - 📄 [**Ver Documento Exclusivo del Sprint 1 (`SPRINT_1.md`)**](./SPRINT_1.md)  
> - 📓 [**Ver Bitácora Completa de Seguimiento (`BITACORA_SEGUIMIENTO.md`)**](./BITACORA_SEGUIMIENTO.md)  
> - 📥 [**Descargar Entregable en PDF (`Bitacora_y_App_Movil_Dolores_Magico.pdf`)**](./Bitacora_y_App_Movil_Dolores_Magico.pdf) | [**Descargar Word (`.docx`)**](./Bitacora_y_App_Movil_Dolores_Magico.docx)

Este apartado describe de forma transparente qué se planeó, qué se construyó y cómo se organizó el **Sprint 1** dentro de este repositorio para que cualquier visitante o evaluador pueda auditar el avance de la **Aplicación Móvil**.

### 🎯 1. Objetivo del Sprint 1 (*Sprint Goal*)
Establecer la arquitectura móvil nativa en **Flutter y Dart** bajo el patrón **MVVM (Model-View-ViewModel) integrado con Clean Architecture**, configurar los permisos de hardware en **Android (`AndroidManifest.xml`)** e **iOS (`Info.plist`)** bajo el principio de mínimo privilegio, y desarrollar las **3 pantallas móviles principales** junto con las **5 Historias de Usuario de Prioridad Alta (`HU01` a `HU05`)** que integran el **Producto Mínimo Viable (PMV)**.

### 👥 2. Roles Activos y Responsabilidades durante el Sprint 1
| Integrante | Rol Scrum | Trabajo Ejecutado en el Sprint 1 (App Móvil) |
| :--- | :--- | :--- |
| **Valeria Guadalupe Calvillo Mendoza** (`1223100392`) | **Product Owner & Mobile Backend Lead** | Definición y priorización del *Product Backlog*, recorte de alcance para proteger la entrega del 20 de noviembre, e implementación en **Dart** de la **Capa de Dominio** (`ReporteUrbano`, `TallerArtesano`, `RegistrarReporteUseCase`) y la **Capa de Datos** (`ReporteRepositoryImpl`, `ArtesanoRepositoryImpl`, integración con **Firebase Firestore / Cloud Storage** y caché local **Hive**). |
| **María del Carmen Vargas Martínez** (`1220100084`) | **Scrum Master & Mobile UI/UX Flutter Lead** | Facilitación de ceremonias Scrum (*Sprint Planning*, *Daily Standups*, *Sprint Review* y *Retrospectiva*), administración del tablero Kanban en GitHub Projects y de la bitácora, y desarrollo en **Flutter** de la **Capa de Presentación** (`HomeMenuPage`, `MapaTuristicoPage`, `FichaTallerArtesanoPage`, `ReporteCiudadanoPage` y ViewModels reactivos con `Provider`). |

### 📋 3. Alcance Funcional Construido en el Sprint 1 (Historias de Usuario del PMV)

Durante el **Sprint 1** se desglosó y codificó el núcleo operativo de la aplicación móvil en 5 historias prioritarias:

1. **🔐 `HU01` — Autenticación y Registro Diferenciado (`Issue #1` | Prioridad: Alta):**
   - **Explicación:** Permite al usuario ingresar a la aplicación móvil eligiendo su rol activo (*Turista/Visitante*, *Ciudadano Dolorense*, *Artesano/Comerciante* o *Administrador*) y registrar talleres artesanales con fotografías, datos comerciales y ubicación GPS, incluyendo la aceptación expresa del **Aviso de Privacidad (LFPDPPP)**.
   - **Código Móvil en el Repositorio:** [`lib/domain/entities/usuario_app.dart`](./lib/domain/entities/usuario_app.dart), [`lib/presentation/viewmodels/auth_viewmodel.dart`](./lib/presentation/viewmodels/auth_viewmodel.dart) y [`lib/presentation/views/auth/registro_artesano_page.dart`](./lib/presentation/views/auth/registro_artesano_page.dart).

2. **🗺️ `HU02` — Exploración Turística en Mapa Interactivo GPS con 3 Pines de Colores (`Issue #2` | Prioridad: Alta):**
   - **Explicación:** Implementa la **Pantalla 2** de la app móvil centrada en Dolores Hidalgo C.I.N. (`21.15605, -100.93245`) utilizando `google_maps_flutter` y `geolocator`. Permite buscar y filtrar puntos de interés mediante el código oficial de pines por color:
     - 🔵 **Pines Azules (`AppColors.pinTalaveraAzul`):** Talleres artesanales de Talavera y mayólica virreinal.
     - 🟡 **Pines Amarillos (`AppColors.pinNievesAmarillo`):** Neverías tradicionales centenarias.
     - 🔴 **Pines Rojos (`AppColors.pinHistoricoRojo`):** Sitios históricos y museos de la Independencia de 1810.
   - **Código Móvil en el Repositorio:** [`lib/domain/usecases/explorar_mapa_turistico_usecase.dart`](./lib/domain/usecases/explorar_mapa_turistico_usecase.dart), [`lib/presentation/viewmodels/mapa_turistico_viewmodel.dart`](./lib/presentation/viewmodels/mapa_turistico_viewmodel.dart) y [`lib/presentation/views/mapa/mapa_turistico_page.dart`](./lib/presentation/views/mapa/mapa_turistico_page.dart).

3. **📸 `HU03` — Módulo de Reporte Ciudadano con Cámara, GPS Automático y Folio (`Issue #3` | Prioridad: Alta):**
   - **Explicación:** Implementa la **Pantalla 3** de la app móvil siguiendo de manera exacta el **Diagrama de Clases UML** del proyecto. Permite al ciudadano seleccionar el tipo de desperfecto urbano (*Alumbrado Público*, *Acumulación de Basura* o *Vialidad y Baches*), capturar una fotografía de evidencia con la cámara del celular (`image_picker`), obtener automáticamente las coordenadas GPS (`geolocator`), almacenar la información en **Firebase Cloud Storage / Cloud Firestore** y mostrar un diálogo de confirmación con el folio único generado (`FOL-2026-DH-XXXX`).
   - **Código Móvil en el Repositorio:** [`lib/presentation/views/reportes/reporte_ciudadano_page.dart`](./lib/presentation/views/reportes/reporte_ciudadano_page.dart) *(métodos `displayForm()`, `capturePhoto()`, `showConfirmationFolio()`)*, [`lib/presentation/viewmodels/reporte_viewmodel.dart`](./lib/presentation/viewmodels/reporte_viewmodel.dart), [`lib/domain/usecases/registrar_reporte_usecase.dart`](./lib/domain/usecases/registrar_reporte_usecase.dart), [`lib/domain/entities/reporte_urbano.dart`](./lib/domain/entities/reporte_urbano.dart) y [`lib/data/repositories/reporte_repository_impl.dart`](./lib/data/repositories/reporte_repository_impl.dart).

4. **🏺 `HU04` — Ficha Técnica, Catálogo del Artesano y Contacto Directo por WhatsApp (`Issue #4` | Prioridad: Alta):**
   - **Explicación:** Al tocar un pin o taller en la aplicación móvil, se abre la ficha técnica con la historia del maestro artesano, su catálogo de piezas con precios en MXN y un botón que ejecuta un *deep-link* (`url_launcher`) hacia **WhatsApp** (`https://wa.me/...`) o llamada telefónica para compra directa sin intermediarios ni comisiones.
   - **Código Móvil en el Repositorio:** [`lib/domain/usecases/contactar_artesano_whatsapp_usecase.dart`](./lib/domain/usecases/contactar_artesano_whatsapp_usecase.dart) y [`lib/presentation/views/catalogo/ficha_taller_artesano_page.dart`](./lib/presentation/views/catalogo/ficha_taller_artesano_page.dart).

5. **🛡️ `HU05` — Panel de Administración y Validación Municipal (`Issue #5` | Prioridad: Alta):**
   - **Explicación:** Permite al perfil de administrador municipal verificar la autenticidad de los talleres artesanales registrados y actualizar el estatus de atención de los reportes urbanos.
   - **Código Móvil en el Repositorio:** [`lib/domain/usecases/validar_registros_admin_usecase.dart`](./lib/domain/usecases/validar_registros_admin_usecase.dart) y [`lib/presentation/views/admin/admin_validacion_page.dart`](./lib/presentation/views/admin/admin_validacion_page.dart).

---

## 📓 Bitácora de Seguimiento del Proyecto (Resumen Directo en Repositorio)

> 📄 **Consulta la bitácora completa aquí:** 👉 **[BITACORA_SEGUIMIENTO.md](./BITACORA_SEGUIMIENTO.md)**

### Cronograma de Sprints hacia el 20 de Noviembre de 2026
| Sprint | Periodo | Meta Principal (*Sprint Goal*) | Entregables Móviles en el Repositorio | Avance | Estado |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **Sprint 1** | 01 Sep – 18 Sep 2026 | Planeación técnica, prototipo conceptual de 3 pantallas, Diagrama UML y cimientos de arquitectura móvil MVVM + Clean Architecture. | Propuesta técnica UTNG, Diagrama de Clases UML y definición de capas (`domain`, `data`, `presentation`). | **100%** | ✅ Completado |
| **Sprint 2** | 21 Sep – 12 Oct 2026 | Codificación en **Flutter & Dart** de las historias `HU01` a `HU05`, alta de Issues en GitHub, ramas GitFlow y Bitácora de Seguimiento. | Código móvil nativo (`lib/`, `android/`, `ios/`, `pubspec.yaml`, `test/`), 7 Issues activos y `BITACORA_SEGUIMIENTO.md`. | **100%** | ✅ Completado |
| **Sprint 3** | 13 Oct – 02 Nov 2026 | Integración en vivo con servicios cloud de **Firebase** y pruebas en dispositivo físico de cámara (`image_picker`) y GPS (`geolocator`). | Sincronización en tiempo real con Cloud Firestore / Storage y persistencia offline en Hive. | **65%** | 🔄 En Curso |
| **Sprint 4** | 03 Nov – 20 Nov 2026 | Pruebas de campo con artesanos de Talavera, *Code Freeze* (18 Nov), generación de APK firmado y Demo en Vivo del PMV (20 Nov). | Paquete instalable `app-release.apk` y presentación funcional en vivo el **20 de noviembre**. | **0%** | 📅 Programado |

### Registro de Sesiones, Ceremonias Scrum y Atención a Observaciones
| Fecha | Ceremonia Scrum | Participantes | Actividades Realizadas | Observaciones / Solución Aplicada |
| :--- | :--- | :--- | :--- | :--- |
| **04/09/2026** | **Sprint 1 Planning** | Valeria C. (PO), María V. (SM) | Definición del problema en Dolores Hidalgo y selección de las 4 funcionalidades indispensables del MVP móvil. | Se descartaron Realidad Aumentada (AR) y pasarela de pagos para mitigar riesgo de tiempo. |
| **14/09/2026** | **Sesión de Arquitectura** | Valeria C., María V. | Elección de **MVVM + Clean Architecture** para Flutter y diseño del Diagrama UML (`ReporteCiudadanoPage`). | Desacoplamiento en 3 capas (`domain`, `data`, `presentation`) para trabajo paralelo. |
| **23/09/2026** | **Juego de Roles / Sprint 2 Planning** | Valeria C. (PO), María V. (SM) | Asignación formal de roles Scrum, redacción de historias `HU01`–`HU05` y configuración de ramas GitFlow. | Creación de ramas `main`, `develop`, `feature/mapa-turistico`, `feature/reporte-ciudadano` y `feature/catalogo-artesano`. |
| **04/10/2026** | **Daily Standup & Tablero** | María V. (SM), Valeria C. (PO) | Alta de los 7 Issues oficiales en GitHub con criterios de aceptación, etiquetas de prioridad y Milestones. | Configuración de permisos mínimos (`CAMERA`, `ACCESS_FINE_LOCATION`) en Android e iOS. |
| **12/10/2026** | **Sprint 2 Review & Retrospectiva** | Valeria C. (PO), María V. (SM) | **Atención a retroalimentación docente:** Migración del repositorio al código nativo de la **App Móvil en Flutter & Dart** e incorporación de la **Bitácora de Seguimiento** y la explicación detallada del **Sprint 1**. | **Observación Docente Atendida:** Se eliminó el código web previo y se dejó 100% la estructura de la **App Móvil en Flutter (`lib/`, `pubspec.yaml`, `android/`, `ios/`)** con su bitácora visible. |

---

## 🏛️ Estructura Completa del Código de la App Móvil (`lib/`, `android/`, `ios/`)

```text
app_Dolores_Magico/
├── pubspec.yaml                                       # Dependencias Flutter: provider, firebase_*, google_maps_flutter, geolocator, image_picker, hive, url_launcher
├── analysis_options.yaml                              # Reglas de calidad y linting para Dart/Flutter
├── BITACORA_SEGUIMIENTO.md                            # Bitácora oficial detallada de Sprints, Ceremonias Scrum y Commits
├── android/                                           # Configuración nativa Android (SDK 23-34)
│   └── app/
│       ├── build.gradle                               # Configuración Gradle, namespace mx.edu.utng.dolores_magico_app y ProGuard/R8
│       └── src/main/AndroidManifest.xml               # Permisos GPS, Cámara, Internet y queries WhatsApp bajo Mínimo Privilegio
├── ios/                                               # Configuración nativa iOS
│   └── Runner/Info.plist                              # Descripciones de permisos de Cámara y Ubicación (Privacy by Design)
├── lib/                                               # CÓDIGO FUENTE DE LA APLICACIÓN MÓVIL (DART / FLUTTER)
│   ├── main.dart                                      # Punto de entrada móvil, inyección de dependencias y MultiProvider (MVVM)
│   ├── core/
│   │   ├── constants/
│   │   │   ├── app_colors.dart                        # Paleta Talavera y colores oficiales de pines (Azul, Amarillo, Rojo)
│   │   │   └── dolores_constants.dart                 # Coordenadas GPS de Dolores Hidalgo (21.15605, -100.93245) y tipos de reporte
│   │   ├── services/
│   │   │   ├── firebase_singleton_service.dart        # Patrón Singleton (13.3): Instancia única de Auth, Firestore, Storage y FCM
│   │   │   └── location_camera_singleton.dart         # Patrón Singleton (13.3): Instancia única de Geolocator e ImagePicker
│   │   ├── security/                                  # Seguridad Móvil (LFPDPPP 2025, OWASP Top 10 & MASVS v2)
│   │   │   ├── privacy_and_consent_service.dart       # Consentimiento granular, Aviso LFPDPPP y Derechos ARCO
│   │   │   ├── crypto_vault_service.dart              # Cifrado en reposo AES-256-GCM y Keystore/Keychain
│   │   │   ├── secure_network_service.dart            # TLS 1.3 estricto y Certificate Pinning
│   │   │   └── input_sanitizer_service.dart           # Saneamiento de entradas (XSS/SQLi) y Deep Links
│   │   └── theme/
│   │       └── app_theme.dart                         # Tema visual Material 3 para Android e iOS
│   ├── domain/                                        # 1. CAPA DE DOMINIO (Entidades, Contratos de Repositorio y Casos de Uso)
│   │   ├── entities/
│   │   │   ├── reporte_urbano.dart                    # <<Entity>> ReporteUrbano (id, fotoUrl, lat, lng, categoria, folio, estatus)
│   │   │   ├── taller_artesano.dart                   # <<Entity>> TallerArtesano (id, nombre, maestro, pinColor, lat, lng, whatsapp, catalogo)
│   │   │   ├── producto_artesanal.dart                # <<Entity>> ProductoArtesanal
│   │   │   └── usuario_app.dart                       # <<Entity>> UsuarioApp (Turista, Ciudadano, Artesano, Administrador)
│   │   ├── repositories/
│   │   │   ├── reporte_repository.dart                # <<Interface>> ReporteRepository (+ guardarReporte(r: ReporteUrbano))
│   │   │   ├── artesano_repository.dart               # <<Interface>> ArtesanoRepository
│   │   │   └── auth_repository.dart                   # <<Interface>> AuthRepository
│   │   └── usecases/
│   │       ├── registrar_reporte_usecase.dart         # RegistrarReporteUseCase (+ execute(reporte) -> valida GPS y genera Folio FOL-2026-DH-XXXX)
│   │       ├── explorar_mapa_turistico_usecase.dart   # Filtrado de talleres y sitios por categoría y color de pin (HU02)
│   │       ├── contactar_artesano_whatsapp_usecase.dart # Deep-link directo a WhatsApp sin intermediarios ni comisiones (HU04)
│   │       └── validar_registros_admin_usecase.dart   # Validación municipal de talleres e incidencias (HU05)
│   ├── data/                                          # 2. CAPA DE DATOS (Implementación del Repository Pattern y Fuentes de Datos)
│   │   ├── models/
│   │   │   ├── reporte_urbano_model.dart              # DTO con serialización para Cloud Firestore y Hive
│   │   │   └── taller_artesano_model.dart             # DTO con catálogo verificado de Dolores Hidalgo
│   │   ├── datasources/
│   │   │   ├── firestore_remote_datasource.dart       # Comunicación con Firebase Cloud Firestore y Cloud Storage
│   │   │   └── hive_local_datasource.dart             # Persistencia local Hive para modo sin conexión (Offline-first)
│   │   └── repositories/
│   │       ├── reporte_repository_impl.dart           # ReporteRepositoryImpl (- firestoreService, - storageService, + guardarReporte(r))
│   │       ├── artesano_repository_impl.dart          # ArtesanoRepositoryImpl
│   │       └── auth_repository_impl.dart              # AuthRepositoryImpl
│   └── presentation/                                  # 3. CAPA DE PRESENTACIÓN (Patrón MVVM: Vistas Flutter + ViewModels)
│       ├── viewmodels/
│       │   ├── reporte_viewmodel.dart                 # ReporteViewModel (- reportesUseCase, - state, + capturarFotoYUbicacion(), + enviarReporte())
│       │   ├── mapa_turistico_viewmodel.dart          # MapaTuristicoViewModel (gestión reactiva de marcadores y filtros)
│       │   └── auth_viewmodel.dart                    # AuthViewModel (gestión de sesión y rol activo)
│       └── views/
│           ├── home/
│           │   └── home_menu_page.dart                # Pantalla 1: Home / Menú Principal ("Explorar Dolores Mágico" vs "Mi Comunidad")
│           ├── mapa/
│           │   └── mapa_turistico_page.dart           # Pantalla 2: Mapa Interactivo GPS con pines Azul, Amarillo y Rojo (HU02)
│           ├── catalogo/
│           │   └── ficha_taller_artesano_page.dart    # Ficha Técnica del Artesano, catálogo y botón WhatsApp directo (HU04)
│           ├── reportes/
│           │   └── reporte_ciudadano_page.dart        # Pantalla 3: ReporteCiudadanoPage (+ displayForm(), + capturePhoto(), + showConfirmationFolio()) (HU03)
│           ├── auth/
│           │   └── registro_artesano_page.dart        # Registro e inicio de sesión diferenciado con Aviso de Privacidad (HU01)
│           └── admin/
│               └── admin_validacion_page.dart         # Panel de administración y validación municipal (HU05)
└── test/                                              # Estrategia Inicial de Pruebas (Sección 17)
    └── unit/
        └── registrar_reporte_usecase_test.dart        # Pruebas unitarias de validación y generación de folio único
```

---

## 🛠️ Comandos de Ejecución de la App Móvil (Flutter CLI)

```bash
# 1. Instalar paquetes de Flutter / Dart definidos en pubspec.yaml
flutter pub get

# 2. Ejecutar pruebas unitarias de la Capa de Dominio (generación de folio y validaciones)
flutter test

# 3. Ejecutar la aplicación móvil en emulador o dispositivo físico Android / iOS
flutter run

# 4. Compilar paquete APK de producción para demostración en vivo
flutter build apk --release
```
