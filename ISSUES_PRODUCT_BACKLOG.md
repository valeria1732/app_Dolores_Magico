# 📋 Product Backlog e Issues Oficiales — DoloresMágico App
**Universidad Tecnológica del Norte de Guanajuato (UTNG)**  
**Materia:** Desarrollo Móvil Integra | **Profesor:** José de Jesús Eduardo Barrientos Avalos  
**Equipo:** Valeria Guadalupe Calvillo Mendoza & María del Carmen Vargas Martínez | **Grupo:** GIDS6101-E  

---

## 🎯 Guía Paso a Paso: ¿Cómo Crear los Issues en GitHub?

Tienes **dos opciones** muy sencillas para dar de alta los issues en tu repositorio de GitHub:

### Opción A: Desde la Interfaz Web de GitHub (Recomendada)
1. Entra a tu repositorio: [https://github.com/valeria1732/app_Dolores_Magico](https://github.com/valeria1732/app_Dolores_Magico)
2. Haz clic en la pestaña **Issues** (arriba a la izquierda, junto a *Code*).
3. Haz clic en el botón verde **"New issue"**.
4. Copia y pega el **Título**, la **Descripción**, los **Criterios de Aceptación** y las **Tareas** de cada uno de los 7 issues detallados abajo.
5. En el panel lateral derecho:
   - **Assignees:** Asígnate a ti o a tu compañera de equipo.
   - **Labels:** Agrega las etiquetas de prioridad (`priority: high`, `priority: medium` o `priority: low`) y tipo (`feature`, `user-story`).
   - **Projects:** Agrégalo al tablero Kanban de **GitHub Projects** del equipo.
6. Haz clic en **"Submit new issue"**.

---

### Opción B: Automático con GitHub CLI (`gh`)
Si tienes instalado GitHub CLI en tu terminal, puedes crearlos automáticamente ejecutando:

```bash
# Issue 1: Registro y Autenticación Diferenciada
gh issue create --title "[ALTA] HU01 - Autenticación y Registro Diferenciado de Artesanos y Ciudadanos" --body-file - << 'EOF'
## Descripción / Historia de Usuario
**Como** artesano de Talavera o ciudadano/turista de Dolores Hidalgo,
**Quiero** registrarme e iniciar sesión con un rol diferenciado,
**Para** acceder a las funciones correspondientes (gestionar mi taller o explorar y reportar).

## Prioridad
Alta (MVP)

## Criterios de Aceptación
- [ ] Selector visual de rol: Turista, Ciudadano Dolorense, Artesano Local y Administrador.
- [ ] Formulario de registro de artesano con nombre del taller, maestro responsable, técnica artesanal, dirección y WhatsApp directo.
- [ ] Persistencia de sesión y rol activo en almacenamiento local/base de datos.
EOF

# Issue 2: Mapa GPS Geolocalizado
gh issue create --title "[ALTA] HU02 - Mapa GPS Geolocalizado con Pines Temáticos Diferenciados" --body-file - << 'EOF'
## Descripción / Historia de Usuario
**Como** visitante o turista,
**Quiero** consultar un mapa interactivo geolocalizado con pines diferenciados por color,
**Para** planificar mi ruta turística por los talleres de Talavera, neverías y monumentos históricos.

## Prioridad
Alta (MVP)

## Criterios de Aceptación
- [ ] Implementación de mapa interactivo con centro en Dolores Hidalgo C.I.N. (21.1561, -100.9325).
- [ ] Código oficial de pines por color:
  * 🔵 **Azul:** Talleres de Talavera y alfarería.
  * 🟡 **Amarillo:** Neverías tradicionales en barrica.
  * 🔴 **Rojo:** Sitios Históricos y museos de 1810.
- [ ] Al presionar un pin interactivo, se despliega una ficha flotante con información, catálogo y botón de WhatsApp directo.
- [ ] Filtro rápido por categorías y buscador en tiempo real.
EOF
```

---

## 📌 Detalle de Issues del Product Backlog (Prioridad y Descripción)

A continuación tienes la ficha técnica completa de cada Issue lista para copiar y pegar en GitHub:

---

### 🟢 Issue #1: [ALTA] HU01 — Autenticación y Registro Diferenciado de Artesanos y Ciudadanos
- **Prioridad:** `Alta (MVP)`
- **Tipo:** `User Story` | `Feature`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `authentication`, `mvp`
- **Milestone:** `Sprint 1 - MVP`

#### Descripción:
> **Como** artesano de Talavera de Dolores Hidalgo o habitante/turista,  
> **Quiero** registrar mi taller o seleccionar mi perfil diferenciado,  
> **Para** que los visitantes conozcan mi taller o para participar en la comunidad dolorense.

#### Criterios de Aceptación:
- [ ] Selector interactivo de perfil: *Turista / Visitante*, *Ciudadano Dolorense*, *Artesano / Nevero Local* y *Administrador Municipal*.
- [ ] Formulario de registro para el artesano que incluye: nombre del taller, maestro artesano titular, giro (Talavera / Nevería), dirección local, WhatsApp comercial e historia del taller.
- [ ] Indicador en el Navbar que refleja el rol actualmente activo.
- [ ] Persistencia del perfil seleccionado en `localStorage` / backend.

#### Tareas Técnicas:
1. Crear componente `AuthModal` con selector de roles y formulario de taller.
2. Integrar capa de servicio `storageService` para persistir roles y perfil.
3. Actualizar `Navbar` con badge dinámico del rol del usuario.

---

### 🟢 Issue #2: [ALTA] HU02 — Mapa GPS Geolocalizado con Pines Diferenciados por Color
- **Prioridad:** `Alta (MVP)`
- **Tipo:** `User Story` | `Feature`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `map-gps`, `leaflet`, `mvp`
- **Milestone:** `Sprint 1 - MVP`

#### Descripción:
> **Como** visitante o turista,  
> **Quiero** consultar un mapa interactivo geolocalizado con pines diferenciados por colores específicos,  
> **Para** identificar con facilidad talleres de Talavera, neverías tradicionales y sitios históricos de la Independencia.

#### Criterios de Aceptación:
- [ ] Carga del mapa interactivo centrado en la Plaza Principal / Jardín del Grande Hidalgo (21.1561, -100.9325).
- [ ] Pines interactivos estilizados según el documento oficial de diseño:
  - 🔵 **Pines Azules:** Talleres de Talavera y mayólica virreinal.
  - 🟡 **Pines Amarillos:** Neverías tradicionales de barrica.
  - 🔴 **Pines Rojos:** Sitios Históricos y museos de la Independencia.
- [ ] Leyenda oficial en pantalla explicando la codificación de pines.
- [ ] Al hacer clic en un pin, apertura de la ficha técnica flotante con foto, nombre, maestro titular, dirección y botón de WhatsApp directo.
- [ ] Barra de búsqueda predictiva y botones de filtro por categoría.
- [ ] Botón de recentrado automático a Dolores Hidalgo.

#### Tareas Técnicas:
1. Desarrollar componente `InteractiveMap` utilizando Leaflet / OpenStreetMap.
2. Crear estilos CSS específicos para marcadores SVG/HTML con efecto de pulso.
3. Conectar catálogo con pines dinámicos y eventos de selección.

---

### 🟢 Issue #3: [ALTA] HU03 — Módulo de Reporte Ciudadano con Captura de Foto, GPS y Folio
- **Prioridad:** `Alta (MVP)`
- **Tipo:** `User Story` | `Feature`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `citizen-report`, `gps`, `mvp`
- **Milestone:** `Sprint 1 - MVP`

#### Descripción:
> **Como** ciudadano de Dolores Hidalgo,  
> **Quiero** enviar una fotografía acompañada de la ubicación GPS de un servicio o espacio público con fallas,  
> **Para** solicitar su reparación oportuna y recibir un folio de atención para darle seguimiento.

#### Criterios de Aceptación:
- [ ] Selector interactivo de tipos de problema urbano:
  - 💡 *Alumbrado Público* (faroles apagados, postes dañados).
  - 🗑️ *Acumulación de Basura* (contenedores llenos en zonas turísticas o colonias).
  - 🚧 *Vialidad y Baches* (baches en empedrado colonial o pavimento).
  - 🌳 *Parques y Jardines* (mobiliario urbano, áreas verdes).
  - 🚰 *Fugas de Agua y Drenaje*.
- [ ] Captura / carga de evidencia fotográfica con vista previa inmediata.
- [ ] Obtención de ubicación GPS automática del dispositivo mediante Geolocation API.
- [ ] Generación automática e instantánea de un código/folio único oficial (formato `FOL-2026-DH-XXXX`).
- [ ] Modal de confirmación con opción para copiar el folio al portapapeles.
- [ ] Pantalla pública de seguimiento donde se pueden consultar todas las incidencias y su estatus (*Reportado*, *En revisión*, *En atención*, *Resuelto*).

#### Tareas Técnicas:
1. Crear componente `CitizenReportForm` con soporte de carga de foto y GPS.
2. Desarrollar componente `ReportSuccessModal` con código de folio y botón de copiado.
3. Crear componente `ReportsList` para consulta ciudadana pública con buscador de folio.
4. Conectar servicio `reportService` y endpoint `POST /api/reports`.

---

### 🟢 Issue #4: [ALTA] HU04 — Ficha Técnica, Catálogo del Artesano y Contacto Directo WhatsApp
- **Prioridad:** `Alta (MVP)`
- **Tipo:** `User Story` | `Feature`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `catalog`, `whatsapp`, `fair-trade`
- **Milestone:** `Sprint 1 - MVP`

#### Descripción:
> **Como** usuario y comprador,  
> **Quiero** comunicarme directamente con un maestro artesano mediante WhatsApp o llamada telefónica desde la app,  
> **Para** consultar precios, historia, disponibilidad o realizar pedidos sin intermediarios ni comisiones.

#### Criterios de Aceptación:
- [ ] Directorio completo de artesanos y neveros con filtros por categoría y barra de búsqueda.
- [ ] Ficha técnica detallada por taller con:
  - Fotografía representativa del taller y del maestro artesano.
  - Historia del taller y técnicas empleadas (horno de leña, mayólica vidriada, torno de pie, etc.).
  - Galería/Catálogo de productos con fotografía, técnica y precio sugerido en MXN.
- [ ] Botón de enlace directo a la API de WhatsApp (`https://wa.me/...`) con mensaje preconfigurado indicando la pieza o taller de interés.
- [ ] Botón de llamada telefónica directa (`tel:...`).
- [ ] Botón para localizar el taller directamente en el mapa interactivo.

#### Tareas Técnicas:
1. Crear componentes `ArtisanDirectory`, `ArtisanCard` y `ArtisanDetailModal`.
2. Modelar datos reales de talleres dolorenses en `doloresData.js`.
3. Configurar deep-links de WhatsApp con codificación URI (`encodeURIComponent`).

---

### 🟢 Issue #5: [ALTA] HU05 — Panel de Administración y Validación Municipal
- **Prioridad:** `Alta (MVP)`
- **Tipo:** `User Story` | `Feature`
- **Etiquetas (Labels):** `priority: high`, `user-story`, `admin`, `validation`
- **Milestone:** `Sprint 1 - MVP`

#### Descripción:
> **Como** administrador municipal de Dolores Hidalgo,  
> **Quiero** validar los registros de nuevos artesanos y gestionar los reportes urbanos de los ciudadanos,  
> **Para** garantizar que la información sea verídica y actualizar el estado de resolución de las incidencias.

#### Criterios de Aceptación:
- [ ] Pestaña y panel exclusivo de administración accesible con rol *Administrador*.
- [ ] Tabla de gestión de incidencias con capacidad de cambiar el estatus en tiempo real (*Reportado* ➔ *En Revisión* ➔ *En Atención* ➔ *Resuelto*).
- [ ] Tabla de artesanos para aprobar o revocar la insignia de *Validación Oficial*.
- [ ] Notificaciones toast confirmando los cambios realizados por el administrador.

#### Tareas Técnicas:
1. Crear componente `AdminValidationPanel` con pestañas de Reportes y Artesanos.
2. Implementar funciones `updateReportStatus` y `toggleVerifyArtisan` en `storageService`.
3. Conectar endpoint `PATCH /api/reports/:id/status`.

---

### 🟡 Issue #6: [MEDIA] Agenda y Notificaciones de Festividades Culturales
- **Prioridad:** `Media`
- **Tipo:** `Feature` | `Enhancement`
- **Etiquetas (Labels):** `priority: medium`, `events`, `culture`, `tourism`
- **Milestone:** `Sprint 2`

#### Descripción:
> **Como** visitante o residente,  
> **Quiero** consultar la agenda de eventos culturales y festividades tradicionales de Dolores Hidalgo,  
> **Para** programar mi visita durante las Fiestas Patrias, Festival de la Nieve o Fiestas de Talavera.

#### Criterios de Aceptación:
- [ ] Vista dedicada a eventos culturales con fechas, ubicación y descripción detallada.
- [ ] Tarjetas informativas para las *Fiestas Patrias de Dolores Hidalgo*, *Festival Nacional de la Nieve Tradicional* y *Ruta de la Talavera*.
- [ ] Botón de acceso rápido para ubicar puntos de interés relacionados con el evento.

#### Tareas Técnicas:
1. Crear componente `CulturalEvents`.
2. Estructurar array de eventos en `doloresData.js`.

---

### 🔵 Issue #7: [BAJA] Sistema de Reseñas y Calificaciones Comunitarias
- **Prioridad:** `Baja`
- **Tipo:** `Feature` | `Enhancement`
- **Etiquetas (Labels):** `priority: low`, `reviews`, `ratings`
- **Milestone:** `Sprint 3`

#### Descripción:
> **Como** turista,  
> **Quiero** calificar con estrellas y dejar un comentario sobre la atención del taller artesanal o nevería,  
> **Para** orientar a futuros visitantes y reconocer el trabajo de los artesanos destacados.

#### Criterios de Aceptación:
- [ ] Visualización de puntuación promedio (1 a 5 estrellas) y número de opiniones en cada ficha.
- [ ] Modal para que los visitantes registrados puedan enviar su reseña y calificación.

---

## 📊 Matriz de Prioridades y Sprints del Proyecto

| Issue | Funcionalidad | Prioridad | Sprint | Estado en Código |
|---|---|---|---|---|
| **#1** | Autenticación y Registro Diferenciado (HU01) | **ALTA** | Sprint 1 (MVP) | ✅ Implementado |
| **#2** | Mapa GPS Geolocalizado con 3 Pines (HU02) | **ALTA** | Sprint 1 (MVP) | ✅ Implementado |
| **#3** | Reporte Ciudadano con Foto, GPS y Folio (HU03) | **ALTA** | Sprint 1 (MVP) | ✅ Implementado |
| **#4** | Ficha del Artesano y WhatsApp Directo (HU04) | **ALTA** | Sprint 1 (MVP) | ✅ Implementado |
| **#5** | Panel de Administración y Validación (HU05) | **ALTA** | Sprint 1 (MVP) | ✅ Implementado |
| **#6** | Agenda Cultural y Festividades Patrias | **MEDIA** | Sprint 2 | ✅ Implementado |
| **#7** | Calificaciones y Reseñas Comunitarias | **BAJA** | Sprint 3 | 📋 En Backlog |

---

## 🚀 Organización en GitHub Projects (Tablero Kanban)
Según la Sección 9 del documento de la materia (*Metodología Scrum con enfoque Hackathon*), se recomienda organizar el tablero con 4 columnas:
1. **Product Backlog:** Todos los issues pendientes de planificar.
2. **Sprint Backlog / En Proceso:** Los issues activos durante las dos semanas del sprint actual.
3. **En Revisión / QA:** Funcionalidades listas para validación de interfaz o pruebas.
4. **Completado (Done):** Funcionalidades terminadas que cumplen todos los criterios de aceptación.
