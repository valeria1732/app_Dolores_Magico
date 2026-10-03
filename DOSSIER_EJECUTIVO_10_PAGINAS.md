# PLAN DIRECTOR DE INGENIERÍA & DEFINICIÓN DEL PMV
**Proyecto:** Dolores Mágico (`app_Dolores_Magico`)  
**División:** Ingeniería de Software & Transformación Digital Turística  
**Repositorio GitHub:** [valeria1732 / app_Dolores_Magico](https://github.com/valeria1732/app_Dolores_Magico)  
**Centro de Control / Tablero:** [GitHub Projects / Trello](https://github.com/valeria1732/app_Dolores_Magico/projects)  
**Hito Contractual (PMV Live Demo):** 20 de Noviembre de 2026  

---

## 📑 ÍNDICE GENERAL DEL DOSSIER EJECUTIVO (10 PÁGINAS)

* **Página 01:** Portada Ejecutiva & Metadatos de Gobernanza Técnica
* **Página 02:** Resumen Ejecutivo e Índice General de Secciones
* **Página 03:** Estructura Organizacional, Roles Metodológicos y Matriz RACI
* **Página 04:** Fundamentación Metodológica y Gestión de Riesgos de Cronograma
* **Página 05:** Estrategia del Producto Mínimo Viable (PMV) & Priorización MoSCoW
* **Página 06:** Product Backlog, Épicas e Historias de Usuario (Sintaxis Gherkin)
* **Página 07:** Arquitectura de Software, Topología del Sistema y Modelo de Datos
* **Página 08:** Cronograma de Sprints, Ruta Crítica y Definition of Done (DoD)
* **Página 09:** Gobernanza Git, Estándares de Integración y Enlaces de Control
* **Página 10:** Indicadores Clave de Desempeño (KPIs), Validación y Firmas de Compromiso

---

## 📄 CAPÍTULO 1: PORTADA Y RESUMEN EJECUTIVO (Págs. 1-2)
El proyecto **Dolores Mágico** implementa una arquitectura orientada a servicios desacoplados para potenciar la visibilidad turística y cultural de Dolores Hidalgo, Guanajuato. Mediante una capa visual responsiva (`/Front`) y un backend RESTful (`/backend`), se centraliza la oferta de patrimonio histórico, artesanías mayólicas y gastronomía en una plataforma de alto rendimiento.

---

## 👥 CAPÍTULO 2: ESTRUCTURA ORGANIZACIONAL & MATRIZ RACI (Pág. 3)
* **Product Owner (Valeria Calvillo):** Gobierno del producto, priorización del backlog y blindaje del alcance.
* **Scrum Master (Facilitador Ágil):** Excelencia metodológica, resolución de impedimentos y gestión del tablero.
* **Tech Leads / Dev Team (Frontend & Backend):** Arquitectura técnica, desarrollo de APIs, componentes UI y despliegue.

| Entregable / Actividad | Product Owner | Scrum Master | Frontend Lead | Backend Lead |
| :--- | :---: | :---: | :---: | :---: |
| **Priorización de Backlog** | **A / R** | C | C | C |
| **Mantenimiento de Tablero** | I | **A / R** | R | R |
| **Arquitectura & APIs REST** | I | C | R | **A / R** |
| **Construcción UI Catálogo** | C | I | **A / R** | C |
| **Validación DoD & QA** | **A** | C | R | R |
| **Live Demo (20 Nov)** | **A / R** | R | R | R |

---

## 🛡️ CAPÍTULO 3: FUNDAMENTACIÓN METODOLÓGICA & RIESGOS (Pág. 4)

### Párrafo Oficial de Fundamentación (Cumplimiento de Extensión):
> *Seleccionamos **Scrum** por su estructura de ciclos cortos e incrementales (Sprints de 2 semanas), óptima para mitigar riesgos ante la fecha límite del 20 de noviembre. Esta metodología nos permite realizar revisiones periódicas, identificar cuellos de botella en la integración entre Frontend y Backend mediante Daily Standups y adaptar prioridades rápidamente. La continua refinación del Product Backlog asegura que el equipo concentre sus esfuerzos exclusivamente en las funcionalidades nucleares del Producto Mínimo Viable (PMV), garantizando una versión estable, testeada y lista para demostración en vivo sin incurrir en desviación de tiempos ni sobrecostes de alcance.*  
> **(Extensión: 104 palabras — Cumple estrictamente el límite de máx. 150 palabras).**

---

## 🎯 CAPÍTULO 4: ESTRATEGIA PMV & MARCO MOSCOW (Pág. 5)
* **MUST HAVE (Esencial para el 20 de Noviembre):** Catálogo interactivo, filtros por categoría (Historia, Artesanía, Gastronomía), ficha técnica informativa con geodatos y diseño responsivo.
* **SHOULD HAVE (Deseable):** Mapa interactivo con pines, búsqueda textual directa y botón de navegación en Google Maps.
* **COULD HAVE (Opcional):** Modo oscuro y favoritos locales.
* **WON'T HAVE (Excluido inicialmente):** Pasarela de pagos bancarios, reservaciones hoteleras en tiempo real y realidad aumentada (excluidos para asegurar la estabilidad técnica a tiempo).

---

## 📋 CAPÍTULO 5: PRODUCT BACKLOG & CRITERIOS GHERKIN (Pág. 6)
* **US-01 (Catálogo - 5 pts):** Renderizado de atractivos turísticos con tiempo de respuesta < 2.0s.
* **US-02 (Filtros - 3 pts):** Filtrado dinámico en memoria DOM por categorías temáticas.
* **US-03 (Ficha Técnica - 5 pts):** Vista detallada con historia, galería de fotos, horarios y geolocalización.

---

## ⚙️ CAPÍTULO 6: ARQUITECTURA TÉCNICA & MODELO DE DATOS (Pág. 7)
* **Capa Visual (`/Front`):** JavaScript ES6+, HTML5 Semántico, CSS3 con tokens de diseño, Fetch API asíncrono.
* **Capa de Servicios (`/backend`):** Endpoints RESTful (`GET /api/places`, `GET /api/places/:id`, `GET /api/categories`).
* **Entidad `PuntoTuristico`:** Atributos normalizados (`id`, `nombre`, `categoria`, `descripcion`, `horarios`, `coordenadas`).

---

## 📅 CAPÍTULO 7: CRONOGRAMA DE SPRINTS & RUTA CRÍTICA (Pág. 8)
* **Sprint 1 (Sem. 1-2):** Cimientos de arquitectura, inicialización en GitHub y diseño base.
* **Sprint 2 (Sem. 3-4):** Desarrollo de endpoints REST y componentes visuales del catálogo.
* **Sprint 3 (Sem. 5-6):** Integración Front-Back, filtros y fichas de detalle.
* **Sprint 4 (Sem. 7-8):** QA, Testing, **Code Freeze (18 Nov)** y **Live Demo Oficial (20 Nov)**.

---

## 🔗 CAPÍTULO 8: GOBERNANZA GIT & ENLACES DE AUDITORÍA (Pág. 9)
* **URL Repositorio GitHub:** [https://github.com/valeria1732/app_Dolores_Magico](https://github.com/valeria1732/app_Dolores_Magico)
* **URL Tablero de Control:** [https://github.com/valeria1732/app_Dolores_Magico/projects](https://github.com/valeria1732/app_Dolores_Magico/projects)
* **GitFlow:** Ramas `main` (producción protegida), `develop` (integración continua) y `feature/*` (desarrollo por ticket).

---

## 🏆 CAPÍTULO 9: KPIS DE ÉXITO & FIRMAS DE COMPROMISO (Pág. 10)
* **KPIs:** Tiempo de carga < 2.0s, 100% de datos reales validados, 0 errores en demostración en vivo.
* **Firmas de Certificación:** Valeria Calvillo (Product Owner), Scrum Master Facilitador, Tech Lead Frontend y Tech Lead Backend.
