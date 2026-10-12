# PLAN DIRECTOR DE INGENIERÍA MÓVIL, FUNDAMENTACIÓN METODOLÓGICA Y BITÁCORA DE SEGUIMIENTO — DOLORESMÁGICO APP

**Institución:** Universidad Tecnológica del Norte de Guanajuato (UTNG)  
**Materia:** Desarrollo Móvil Integral | **Docente:** José de Jesús Eduardo Barrientos Avalos  
**Proyecto:** **DoloresMágico App** (`app_Dolores_Magico` — Aplicación Móvil en Flutter & Dart)  
**Product Owner / Líder de Producto:** Valeria Guadalupe Calvillo Mendoza (`1223100392`)  
**Scrum Master / Facilitadora y Líder UI Flutter:** María del Carmen Vargas Martínez (`1220100084`)  
**Grupo:** GIDS6101-E  
**Marco Metodológico de Ejecución:** Scrum con Enfoque Hackathon + Tablero Kanban en GitHub Projects  
**Hito Inamovible de Demostración Funcional:** 20 de Noviembre de 2026  
**Repositorio Oficial de Código Móvil (Flutter/Dart):** https://github.com/valeria1732/app_Dolores_Magico  
**Bitácora Oficial de Seguimiento:** https://github.com/valeria1732/app_Dolores_Magico/blob/main/BITACORA_SEGUIMIENTO.md  
**Tablero Ágil de Seguimiento y Control:** https://github.com/valeria1732/app_Dolores_Magico/projects  

---

## ÍNDICE CAPITULAR (10 PÁGINAS)

* **Página 1:** Portada Oficial Institucional y Datos del Equipo
* **Página 2:** Capítulo I: Planteamiento del Problema y Contexto Móvil en Dolores Hidalgo
* **Página 3:** Capítulo II: Estructura Organizacional y Roles Metodológicos (Scrum)
* **Página 4:** Capítulo III: Fundamentación Metodológica (<150 palabras) y Gestión de Riesgos
* **Página 5:** Capítulo IV: Estrategia del Producto Mínimo Viable (PMV Móvil)
* **Página 6:** Capítulo V: Product Backlog Móvil e Historias de Usuario (`HU01` a `HU05`)
* **Página 7:** Capítulo VI: Arquitectura de la App Móvil (Flutter, Dart, MVVM + Clean Architecture y Firebase)
* **Página 8:** Capítulo VII: Bitácora Oficial de Seguimiento (Sprints, Ceremonias Scrum y Control de Cambios)
* **Página 9:** Capítulo VIII: Estrategia de Versionamiento GitFlow, Pruebas Móviles y Enlaces de Control
* **Página 10:** Capítulo IX: Métricas de Calidad Móvil y Declaración de Compromiso

---

## CAPÍTULO III — FUNDAMENTACIÓN METODOLÓGICA (120 PALABRAS)
> *Seleccionamos **Scrum con enfoque Hackathon** apoyado en un tablero **Kanban en GitHub Projects** por su estructura de ciclos cortos e incrementales (Sprints de 2 semanas), óptima para mitigar riesgos ante la fecha límite del 20 de noviembre. Esta metodología nos permite realizar entregas progresivas de la aplicación móvil en Flutter, detectar errores de integración con sensores del dispositivo (cámara y GPS) y servicios de Firebase mediante Daily Standups, y recibir retroalimentación temprana de artesanos y ciudadanos. Además, desacoplar la app móvil en capas de Clean Architecture y MVVM asegura que el equipo concentre su esfuerzo en las funcionalidades prioritarias del Producto Mínimo Viable (PMV), garantizando un APK estable, probado y funcional en vivo.*

---

## CAPÍTULO VI — ARQUITECTURA DE LA APP MÓVIL (FLUTTER, DART, MVVM + CLEAN ARCHITECTURE)
Para el desarrollo de **DoloresMágico App** se implementa el framework multiplataforma **Flutter** con lenguaje **Dart**, estructurado bajo el patrón **MVVM (Model-View-ViewModel)** integrado con **Clean Architecture** y los patrones de diseño **Repository** y **Singleton**:
1. **Capa de Presentación (`lib/presentation/`):** Contiene las 3 pantallas móviles principales (`HomeMenuPage`, `MapaTuristicoPage` con pines Azul/Amarillo/Rojo y `ReporteCiudadanoPage` con método `capturePhoto()` y `showConfirmationFolio()`) y los ViewModels reactivos (`ReporteViewModel`, `MapaTuristicoViewModel`, `AuthViewModel`).
2. **Capa de Dominio (`lib/domain/`):** Contiene las entidades de negocio puras (`ReporteUrbano`, `TallerArtesano`, `ProductoArtesanal`, `UsuarioApp`), interfaces de repositorio y casos de uso (`RegistrarReporteUseCase`, `ExplorarMapaTuristicoUseCase`, `ContactarArtesanoWhatsappUseCase`).
3. **Capa de Datos (`lib/data/`):** Implementa `ReporteRepositoryImpl` y `ArtesanoRepositoryImpl` conectando con **Firebase Authentication**, **Cloud Firestore**, **Firebase Cloud Storage** y almacenamiento local offline con **Hive**.

---

## CAPÍTULO VII — BITÁCORA OFICIAL DE SEGUIMIENTO DEL PROYECTO
* **04/09/2026 — Sprint 1 Planning:** Delimitación del problema económico/turístico y urbano en Dolores Hidalgo C.I.N. y definición de las 4 funcionalidades del MVP móvil.
* **14/09/2026 — Sesión de Arquitectura Móvil:** Selección de MVVM + Clean Architecture para Flutter y elaboración del Diagrama de Clases UML.
* **23/09/2026 — Juego de Roles y Sprint 2 Planning:** Asignación de roles (PO: Valeria Calvillo, SM: María Vargas), redacción de historias `HU01`–`HU05` y ramas en GitHub.
* **02/10/2026 — Daily Standup Seguridad Móvil:** Configuración de permisos mínimos (`CAMERA`, `ACCESS_FINE_LOCATION`) en `AndroidManifest.xml` e `Info.plist` y Aviso de Privacidad LFPDPPP.
* **04/10/2026 — Sincronización de Tablero:** Alta automatizada de los 7 Issues, etiquetas y Milestones en GitHub Projects.
* **12/10/2026 — Sprint 2 Review & Retrospectiva (Atención a Retroalimentación Docente):** Reestructuración del repositorio sustituyendo el prototipo web por el código nativo de la **App Móvil en Flutter & Dart (`lib/`, `android/`, `ios/`, `pubspec.yaml`, `test/`)** e incorporación formal de la **Bitácora de Seguimiento**.
