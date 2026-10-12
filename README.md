# 📱 DoloresMágico App (o DoloresConecta) — Aplicación Móvil en Flutter & Dart
> *"Talavera, cultura y comunidad: la Cuna de la Independencia en tus manos."*

Proyecto Integrador para la materia **Desarrollo Móvil Integral** — **Universidad Tecnológica del Norte de Guanajuato (UTNG)**.

- **Docente:** José de Jesús Eduardo Barrientos Avalos  
- **Integrantes del Equipo:**  
  - **Valeria Guadalupe Calvillo Mendoza** (Matrícula: `1223100392`) — *Product Owner & Mobile Backend / Clean Architecture Lead*  
  - **María del Carmen Vargas Martínez** (Matrícula: `1220100084`) — *Scrum Master & Mobile UI/UX Flutter Lead*  
- **Grupo:** GIDS6101-E  
- **Fecha Límite del PMV:** 20 de Noviembre de 2026  

---

## 📓 Bitácora Oficial de Seguimiento del Proyecto
Para consultar el registro cronológico de **Sprints, Ceremonias Scrum (Sprint Planning, Daily Standups, Sprint Review y Retrospectiva), Trazabilidad de Historias de Usuario, Ramas Git y Atención a Observaciones Docentes**, revisa el documento:
👉 **[BITACORA_SEGUIMIENTO.md](./BITACORA_SEGUIMIENTO.md)**

---

## 📱 Descripción de la Aplicación Móvil
**DoloresMágico App** es una aplicación móvil multiplataforma (**Android / iOS**) desarrollada con **Flutter y Dart** que impulsa la economía local conectando a turistas y residentes con los talleres artesanales de Talavera, neverías tradicionales y rutas históricas de Dolores Hidalgo C.I.N., integrando a su vez un módulo de participación ciudadana para el reporte de servicios públicos urbanos con captura de fotografía desde la cámara del dispositivo, coordenadas GPS automáticas y generación de folio de seguimiento en **Firebase**.

---

## 🏛️ Arquitectura de la App Móvil (MVVM + Clean Architecture en Flutter)

Conforme a las **Secciones 12, 13 y 14** de la propuesta técnica y al **Diagrama de Clases UML**, el código fuente móvil está organizado bajo el patrón **MVVM (Model-View-ViewModel)** integrado con los principios de **Clean Architecture** y **Repository / Singleton Patterns**:

```text
app_Dolores_Magico/
├── pubspec.yaml                                       # Dependencias Flutter: provider, firebase_*, google_maps_flutter, geolocator, image_picker, hive, url_launcher
├── analysis_options.yaml                              # Reglas de calidad y linting para Dart/Flutter
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

## 🎨 Diseño Conceptual de las 3 Pantallas Móviles (Sección 6)
1. **Pantalla 1 — Home / Menú Principal (`home_menu_page.dart`):** Selector directo entre *"Explorar Dolores Mágico (Ruta Artesanal/Gastronómica)"* y *"Mi Comunidad (Reporte Urbano)"*, acompañado de `NavigationBar` inferior nativa.
2. **Pantalla 2 — Mapa Interactivo y Ficha del Taller (`mapa_turistico_page.dart` y `ficha_taller_artesano_page.dart`):** Mapa GPS centrado en Dolores Hidalgo (`21.15605, -100.93245`) con pines interactivos por color:
   - 🔵 **Pines Azules:** Talleres de Talavera y alfarería tradicional.
   - 🟡 **Pines Amarillos:** Neverías tradicionales centenarias.
   - 🔴 **Pines Rojos:** Sitios Históricos y museos de la Independencia de 1810.
3. **Pantalla 3 — Formulario de Reporte Ciudadano y Confirmación (`reporte_ciudadano_page.dart`):** Captura de fotografía de la incidencia con cámara (`ImagePicker`), coordenadas GPS automáticas (`Geolocator`), selección de tipo de problema (*Alumbrado*, *Basura*, *Vialidad*) y diálogo final con el folio oficial (`FOL-2026-DH-XXXX`).

---

## 🛠️ Ejecución de la App Móvil en Entorno de Desarrollo (VS Code / Android Studio)

```bash
# 1. Descargar paquetes y dependencias de Flutter / Dart
flutter pub get

# 2. Ejecutar pruebas unitarias de la Capa de Dominio (Sección 17)
flutter test

# 3. Ejecutar la aplicación móvil en emulador o dispositivo físico Android / iOS
flutter run

# 4. Generar paquete instalable APK de producción para demostración en vivo
flutter build apk --release
```

---

## 🌿 Estrategia de Versionamiento en Git y GitHub (Sección 16)
- `main`: Versión estable y lista para su despliegue (APK Release).
- `develop`: Rama principal de integración de las funcionalidades desarrolladas y probadas.
- `feature/mapa-turistico`: Desarrollo de las funcionalidades relacionadas con el mapa turístico GPS (`HU02`).
- `feature/reporte-ciudadano`: Desarrollo del módulo de reportes ciudadanos con cámara, GPS y folio (`HU03`).
- `feature/catalogo-artesano`: Desarrollo del catálogo, perfiles de artesanos y contacto directo por WhatsApp (`HU04` y `HU01`).
