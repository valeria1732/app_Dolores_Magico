# PLAN DIRECTOR DE INGENIERÍA MÓVIL, ARQUITECTURA FLUTTER Y BITÁCORA DE SEGUIMIENTO
**Proyecto:** DoloresMágico App (`app_Dolores_Magico` — Aplicación Móvil en Flutter & Dart)  
**Institución / Materia:** Universidad Tecnológica del Norte de Guanajuato (UTNG) — Desarrollo Móvil Integral  
**Docente:** José de Jesús Eduardo Barrientos Avalos | **Grupo:** GIDS6101-E  
**Integrantes:**  
- **Valeria Guadalupe Calvillo Mendoza** (Matrícula: `1223100392`) — *Product Owner & Mobile Backend / Clean Architecture Lead*  
- **María del Carmen Vargas Martínez** (Matrícula: `1220100084`) — *Scrum Master & Mobile UI/UX Flutter Lead*  
**Repositorio GitHub (App Móvil Flutter):** [valeria1732 / app_Dolores_Magico](https://github.com/valeria1732/app_Dolores_Magico)  
**Bitácora Oficial en GitHub:** [BITACORA_SEGUIMIENTO.md](https://github.com/valeria1732/app_Dolores_Magico/blob/main/BITACORA_SEGUIMIENTO.md)  
**Centro de Control / Tablero:** [GitHub Projects / Issues](https://github.com/valeria1732/app_Dolores_Magico/projects)  
**Hito Contractual (PMV Live Demo):** 20 de Noviembre de 2026  

---

## 📑 ÍNDICE GENERAL DEL DOSSIER EJECUTIVO MÓVIL (10 PÁGINAS)

* **Página 01:** Portada Ejecutiva & Metadatos de Gobernanza de la App Móvil
* **Página 02:** Resumen Ejecutivo Móvil e Índice General de Secciones
* **Página 03:** Estructura Organizacional, Roles Scrum y Matriz RACI
* **Página 04:** Fundamentación Metodológica (<150 palabras) y Gestión de Riesgos
* **Página 05:** Estrategia del Producto Mínimo Viable (PMV Móvil) & Priorización MoSCoW
* **Página 06:** Product Backlog Móvil (`HU01`–`HU05`) e Historias de Usuario
* **Página 07:** Arquitectura de la App Móvil (Flutter, Dart, MVVM + Clean Architecture y Firebase)
* **Página 08:** Bitácora Oficial de Seguimiento (Sprints, Ceremonias Scrum y Control de Cambios)
* **Página 09:** Gobernanza Git, Ramas Móviles (`feature/*`) y Enlaces de Control
* **Página 10:** Estrategia de Pruebas Móviles, KPIs y Firmas de Compromiso

---

## 📄 CAPÍTULO 1: PORTADA Y RESUMEN EJECUTIVO MÓVIL (Págs. 1-2)
**DoloresMágico App** es una aplicación móvil multiplataforma (**Android e iOS**) construida con **Flutter y Dart** bajo la arquitectura **MVVM integrada con Clean Architecture** y respaldada por servicios en la nube de **Firebase** (`Authentication`, `Cloud Firestore`, `Cloud Storage` y `Cloud Messaging`). Su objetivo es impulsar el comercio justo de los talleres de Talavera y neverías tradicionales de Dolores Hidalgo C.I.N., integrando un módulo de reporte ciudadano con cámara (`image_picker`), geolocalización GPS (`geolocator`) y folio de seguimiento.

---

## 👥 CAPÍTULO 2: ESTRUCTURA ORGANIZACIONAL & MATRIZ RACI (Pág. 3)
* **Product Owner (Valeria Guadalupe Calvillo Mendoza - 1223100392):** Gobierno del producto móvil, priorización del backlog y liderazgo de la Capa de Dominio y Datos en Dart/Firebase.
* **Scrum Master (María del Carmen Vargas Martínez - 1220100084):** Facilitación metodológica Scrum, mantenimiento del tablero Kanban y bitácora de seguimiento, y liderazgo de la Capa de Presentación en Flutter.
* **Dev Team Móvil (Valeria Calvillo & María Vargas):** Construcción de vistas Flutter, ViewModels (`Provider`), repositorios (`Firestore` / `Hive`) y compilación de APK.

---

## 🛡️ CAPÍTULO 3: FUNDAMENTACIÓN METODOLÓGICA & RIESGOS (Pág. 4)

### Párrafo Oficial de Fundamentación (120 palabras — Cumple límite máx. 150 palabras):
> *Seleccionamos **Scrum con enfoque Hackathon** apoyado en un tablero **Kanban en GitHub Projects** por su estructura de ciclos cortos e incrementales (Sprints de 2 semanas), óptima para mitigar riesgos ante la fecha límite del 20 de noviembre. Esta metodología nos permite realizar entregas progresivas de la aplicación móvil en Flutter, detectar errores de integración con sensores del dispositivo (cámara y GPS) y servicios de Firebase mediante Daily Standups, y recibir retroalimentación temprana de artesanos y ciudadanos. Además, desacoplar la app móvil en capas de Clean Architecture y MVVM asegura que el equipo concentre su esfuerzo en las funcionalidades prioritarias del Producto Mínimo Viable (PMV), garantizando un APK estable, probado y funcional en vivo.*

---

## 🎯 CAPÍTULO 4: ESTRATEGIA PMV MÓVIL & MARCO MOSCOW (Pág. 5)
* **MUST HAVE (Indispensable para el 20 de Noviembre):**
  1. **Autenticación y Perfiles (`HU01`):** Login/Registro diferenciado (Turista/Ciudadano vs. Artesano) con Firebase Auth.
  2. **Mapa Interactivo de Dolores Hidalgo (`HU02`):** Ubicación GPS con pines de 3 colores: **Azul** (Talavera), **Amarillo** (Nieves) y **Rojo** (Sitios Históricos).
  3. **Directorio y Catálogo del Artesano (`HU04`):** Ficha técnica con historia, fotos y botón de contacto directo por WhatsApp (`url_launcher`).
  4. **Módulo de Reporte Ciudadano (`HU03`):** Captura de foto con cámara (`image_picker`), coordenadas GPS automáticas (`geolocator`) y folio `FOL-2026-DH-XXXX`.
* **WON'T HAVE (Excluido inicialmente):** Realidad Aumentada (AR), pasarela de pagos bancarios integrada y sistema de insignias/recompensas.

---

## ⚙️ CAPÍTULO 6: ARQUITECTURA DE LA APP MÓVIL EN FLUTTER & DART (Pág. 7)
* **Capa de Presentación (`lib/presentation/`):** Vistas en Flutter (`HomeMenuPage`, `MapaTuristicoPage`, `FichaTallerArtesanoPage`, `ReporteCiudadanoPage`) y ViewModels reactivos (`ReporteViewModel`, `MapaTuristicoViewModel`, `AuthViewModel`).
* **Capa de Dominio (`lib/domain/`):** Entidades (`ReporteUrbano`, `TallerArtesano`), contratos (`ReporteRepository`, `ArtesanoRepository`) y Casos de Uso (`RegistrarReporteUseCase`, `ExplorarMapaTuristicoUseCase`, `ContactarArtesanoWhatsappUseCase`).
* **Capa de Datos (`lib/data/`):** Implementación del *Repository Pattern* (`ReporteRepositoryImpl`, `ArtesanoRepositoryImpl`) con **Firebase Cloud Firestore**, **Firebase Cloud Storage** y persistencia local **Hive**.

---

## 📓 CAPÍTULO 7: BITÁCORA OFICIAL DE SEGUIMIENTO DEL PROYECTO (Pág. 8)
* **04/09/2026 (Sprint 1 Planning):** Definición del alcance móvil y diseño de las 3 pantallas conceptuales.
* **14/09/2026 (Arquitectura Móvil):** Selección de MVVM + Clean Architecture en Flutter y modelado del Diagrama UML (`ReporteCiudadanoPage` -> `ReporteViewModel` -> `RegistrarReporteUseCase` -> `ReporteRepositoryImpl`).
* **23/09/2026 (Juego de Roles y Sprint 2 Planning):** Asignación de roles (PO: Valeria Calvillo, SM: María Vargas), historias `HU01`–`HU05` y ramas GitFlow.
* **04/10/2026 (Sincronización de Backlog):** Alta de los 7 Issues oficiales, etiquetas y Milestones en GitHub.
* **12/10/2026 (Sprint 2 Review & Retrospectiva — Atención a Observación Docente):** Reestructuración completa del repositorio con el código fuente nativo de la **App Móvil en Flutter & Dart (`lib/`, `android/`, `ios/`, `pubspec.yaml`, `test/`)** e integración de la **Bitácora de Seguimiento**.
