# 🚀 SPRINT 1 — Cimientos Móviles y Núcleo del PMV (`App Dolores Mágico`)

> **Repositorio Oficial:** [valeria1732/app_Dolores_Magico](https://github.com/valeria1732/app_Dolores_Magico)  
> **Periodo del Sprint 1:** 12 de octubre – 25 de octubre  
> **Estado del Sprint:** 🟢 **EN CURSO / ARQUITECTURA MÓVIL Y BITÁCORA ACTIVAS**  
> **Meta Inamovible del PMV:** **20 de noviembre**

---

## 🎯 1. ¿Qué es y qué resuelve el Sprint 1? (Explicación para Visitantes y Evaluadores)

Cualquier persona que ingrese a este repositorio encontrará en el **Sprint 1** la materialización técnica de la **App Móvil Nativa Híbrida (`Flutter & Dart`)** para el Pueblo Mágico de **Dolores Hidalgo C.I.N., Guanajuato**. 

Durante esta primera iteración ágil (**Scrum + XP + Kanban**), el equipo transformó la planeación conceptual en una arquitectura móvil funcional bajo el patrón **MVVM (Model-View-ViewModel) + Clean Architecture**, conectada a **Firebase (`Singleton`)** y sensores nativos del teléfono (**GPS `geolocator` y Cámara `image_picker`**), descartando cualquier enfoque de página web tradicional para cumplir estrictamente con la naturaleza móvil del proyecto.

### 🏆 Objetivo del Sprint (*Sprint Goal*)
Construir los cimientos móviles nativos en **Flutter & Dart** (`lib/`), configurar los permisos de hardware en Android ([`AndroidManifest.xml`](android/app/src/main/AndroidManifest.xml)) e iOS ([`Info.plist`](ios/Runner/Info.plist)), implementar las entidades de dominio, repositorios, casos de uso y las **6 pantallas móviles interactivas** que dan soporte a las **5 Historias de Usuario (`HU01` a `HU05`)** del Producto Mínimo Viable (PMV), manteniendo trazabilidad total mediante la [**Bitácora de Seguimiento**](BITACORA_SEGUIMIENTO.md).

---

## 👥 2. Roles Activos y Responsabilidades en el Sprint 1

| Matrícula | Integrante | Rol en el Sprint 1 | Responsabilidades Ejecutadas en este Sprint |
| :--- | :--- | :--- | :--- |
| **`1223100392`** | **Valeria Guadalupe Calvillo Mendoza** | **Product Owner (PO) & Co-Lead Mobile Dev (UI/UX & Features)** | • Definición y priorización de criterios de aceptación para `HU01`–`HU05`.<br>• Diseño del sistema visual móvil *Herencia Mexicana* ([`app_colors.dart`](lib/core/theme/app_colors.dart) y [`app_theme.dart`](lib/core/theme/app_theme.dart)).<br>• Programación de vistas en Flutter: Mapa Turístico ([`mapa_turistico_page.dart`](lib/presentation/views/mapa/mapa_turistico_page.dart)), Ficha del Artesano + enlace profundo a WhatsApp ([`ficha_taller_artesano_page.dart`](lib/presentation/views/catalogo/ficha_taller_artesano_page.dart)) y Registro de Artesanos ([`registro_artesano_page.dart`](lib/presentation/views/auth/registro_artesano_page.dart)). |
| **`1220100084`** | **María del Carmen Vargas Martínez** | **Scrum Master (SM) & Co-Lead Mobile Architect (MVVM, Firebase & Sensores)** | • Facilitación de ceremonias Scrum, control de límites WIP en el tablero Kanban y auditoría de la [Bitácora de Seguimiento](BITACORA_SEGUIMIENTO.md).<br>• Implementación de los patrones **Singleton** para Firebase ([`firebase_singleton_service.dart`](lib/core/services/firebase_singleton_service.dart)) y Hardware GPS/Cámara ([`location_camera_singleton.dart`](lib/core/services/location_camera_singleton.dart)).<br>• Programación del Reporte Urbano con compresión `<500 KB` y caché *Offline-First* en Hive ([`reporte_ciudadano_page.dart`](lib/presentation/views/reportes/reporte_ciudadano_page.dart)), Panel Admin ([`admin_validacion_page.dart`](lib/presentation/views/admin/admin_validacion_page.dart)) y pruebas unitarias ([`registrar_reporte_usecase_test.dart`](test/unit/registrar_reporte_usecase_test.dart)). |

---

## 📦 3. Alcance Técnico Entregado en el Sprint 1 (Historias de Usuario del PMV)

En este Sprint 1 se estructuraron y codificaron en el repositorio los módulos móviles que resuelven las **5 Historias de Usuario críticas** del PMV:

1. **🗺️ `HU01` — Mapa Turístico Geolocalizado con Filtros (`8 pts` | Alta):**
   - **Qué hace:** Muestra en un mapa interactivo móvil (`google_maps_flutter`) los talleres de cerámica mayólica, nieve artesanal y monumentos históricos dentro del polígono de Dolores Hidalgo (`Lat: 21.1561, Lng: -100.9318`), permitiendo filtrar por categoría y consultar su distancia en vivo mediante el sensor GPS del dispositivo.
   - **Código móvil en el repo:** [`mapa_turistico_page.dart`](lib/presentation/views/mapa/mapa_turistico_page.dart) | [`mapa_turistico_viewmodel.dart`](lib/presentation/viewmodels/mapa_turistico_viewmodel.dart) | [`explorar_mapa_turistico_usecase.dart`](lib/domain/usecases/explorar_mapa_turistico_usecase.dart).
2. **🏺 `HU02` — Catálogo de Talleres y Ficha del Artesano con Contacto Directo (`5 pts` | Alta):**
   - **Qué hace:** Despliega la historia del maestro artesano, galería de piezas con precios informativos, horarios de atención y un botón flotante (**CTA**) que invoca de forma nativa la aplicación **WhatsApp** (`url_launcher` hacia `https://wa.me/52...`) con un mensaje prellenado para concretar encargos sin comisiones ni pasarelas bancarias complejas.
   - **Código móvil en el repo:** [`ficha_taller_artesano_page.dart`](lib/presentation/views/catalogo/ficha_taller_artesano_page.dart) | [`contactar_artesano_whatsapp_usecase.dart`](lib/domain/usecases/contactar_artesano_whatsapp_usecase.dart).
3. **📸 `HU03` — Reporte Ciudadano Urbano con Cámara Nativa, GPS y Modo Offline (`8 pts` | Crítica):**
   - **Qué hace:** Permite a ciudadanos y turistas fotografiar incidencias urbanas (baches, luminarias, basura o fugas), comprimir la imagen a `< 500 KB`, validar mediante *Geofencing* que la coordenada GPS pertenezca a Dolores Hidalgo (radio `<= 15 km`) y almacenar el reporte con folio único (`DOL-YYYYMMDD-XXXX`). Si no hay señal celular, lo guarda localmente en **Hive (`Offline-First`)** para sincronizarlo al recuperar conexión.
   - **Código móvil en el repo:** [`reporte_ciudadano_page.dart`](lib/presentation/views/reportes/reporte_ciudadano_page.dart) | [`reporte_ciudadano_viewmodel.dart`](lib/presentation/viewmodels/reporte_ciudadano_viewmodel.dart) | [`registrar_reporte_usecase.dart`](lib/domain/usecases/registrar_reporte_usecase.dart) | [`hive_local_datasource.dart`](lib/data/datasources/hive_local_datasource.dart).
4. **🔐 `HU04` — Registro y Autenticación Móvil por Roles (`5 pts` | Media):**
   - **Qué hace:** Gestiona el acceso diferenciado para **Turista/Ciudadano**, **Artesano Productor** y **Administrador Municipal**, incluyendo el formulario móvil para que nuevos talleres soliciten su alta verificada en la plataforma.
   - **Código móvil en el repo:** [`registro_artesano_page.dart`](lib/presentation/views/auth/registro_artesano_page.dart) | [`auth_repository_impl.dart`](lib/data/repositories/auth_repository_impl.dart).
5. **🛡️ `HU05` — Panel Móvil de Validación y Moderación Administrativa (`5 pts` | Media):**
   - **Qué hace:** Interfaz exclusiva para el rol Administrador que permite aprobar o rechazar solicitudes de nuevos talleres artesanales y actualizar el estado de atención de los reportes ciudadanos (`Pendiente` → `En Proceso` → `Atendido`).
   - **Código móvil en el repo:** [`admin_validacion_page.dart`](lib/presentation/views/admin/admin_validacion_page.dart) | [`validar_registros_admin_usecase.dart`](lib/domain/usecases/validar_registros_admin_usecase.dart).

---

## 📊 4. Resumen de Progreso y Bitácora del Sprint 1

El seguimiento diario de actividades, ramas Gitflow (`main`, `develop`, `feature/mapa-turistico`, `feature/reporte-ciudadano`, `feature/catalogo-artesano`), métricas de velocidad (**31 Story Points totales del PMV**) y control de riesgos técnicos se actualiza de forma continua en la [**Bitácora de Seguimiento (`BITACORA_SEGUIMIENTO.md`)**](BITACORA_SEGUIMIENTO.md):

| ID Registro | Fecha | Fase / Actividad en Sprint 1 | Responsable | Estado | Evidencia en Repositorio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`BIT-01`** | `12/Oct` | **Sprint Planning 1:** Definición del alcance móvil, tablero de roles y recorte de *Nice-to-Have*. | Valeria (PO) & María (SM) | ✅ Completado | [`README.md`](README.md) |
| **`BIT-02`** | `14/Oct` | **Setup Flutter & Clean Architecture:** Creación del proyecto móvil, `pubspec.yaml`, permisos Android/iOS y capa `core/`. | María (SM / Arq. Móvil) | ✅ Completado | [`pubspec.yaml`](pubspec.yaml), [`lib/main.dart`](lib/main.dart) |
| **`BIT-03`** | `16/Oct` | **Patrones Singleton (Firebase + GPS/Cámara):** Instancias únicas y validación de geocerca en Dolores Hidalgo (`<= 15 km`). | María (SM) & Valeria (PO) | ✅ Completado | [`firebase_singleton_service.dart`](lib/core/services/firebase_singleton_service.dart), [`location_camera_singleton.dart`](lib/core/services/location_camera_singleton.dart) |
| **`BIT-04`** | `19/Oct` | **Capa Domain & Data + Offline-First (Hive):** Entidades, casos de uso, modelos JSON y cola local sin internet. | María (SM / Arq. Móvil) | ✅ Completado | [`lib/domain/`](lib/domain/), [`lib/data/`](lib/data/) |
| **`BIT-05`** | `22/Oct` | **Vistas Móviles (`Presentation`) y Pruebas Unitarias TDD:** 6 pantallas Material 3, ViewModels y test unitario de `HU03`. | Valeria (PO) & María (SM) | ✅ Completado | [`lib/presentation/`](lib/presentation/), [`test/unit/`](test/unit/) |
| **`BIT-06`** | `25/Oct` | **Sprint Review 1 & Bitácora Auditada:** Integración de ramas `feature/*` en `develop`/`main` y entrega de bitácora. | Valeria (PO) & María (SM) | 🟢 En Curso | [`BITACORA_SEGUIMIENTO.md`](BITACORA_SEGUIMIENTO.md) |
