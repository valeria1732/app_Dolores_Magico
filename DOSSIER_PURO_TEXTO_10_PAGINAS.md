# PLAN DIRECTOR DE INGENIERÍA DE SOFTWARE Y FUNDAMENTACIÓN METODOLÓGICA DEL PROYECTO DOLORES MÁGICO

**Actividad Académica:** Juego de Roles, Fundamentación Metodológica y Planeación  
**Proyecto:** Dolores Mágico (Identificador de Repositorio: `app_Dolores_Magico`)  
**Product Owner / Dirección de Proyecto:** Valeria Guadalupe Calvillo Mendoza  
**Scrum Master / Facilitadora y Líder Técnica:** María del Carmen  
**Equipo de Desarrollo:** Valeria Guadalupe Calvillo Mendoza y María del Carmen  
**Marco Metodológico de Ejecución:** Scrum Ágil (Ciclos Bisemanales)  
**Hito Inamovible de Demostración Funcional:** 20 de Noviembre de 2026  
**Repositorio Oficial de Código Fuente:** https://github.com/valeria1732/app_Dolores_Magico  
**Tablero Ágil de Seguimiento y Control:** https://github.com/valeria1732/app_Dolores_Magico/projects  

---

## ÍNDICE CAPITULAR (10 PÁGINAS DE TEXTO PURO)

* **Página 1:** Portada Oficial Institucional y Datos de las Integrantes
* **Página 2:** Capítulo I: Contexto Estratégico y Alcance Global del Software
* **Página 3:** Capítulo II: Estructura Organizacional y Roles Metodológicos
* **Página 4:** Capítulo III: Fundamentación Metodológica y Gestión de Riesgos
* **Página 5:** Capítulo IV: Estrategia del Producto Mínimo Viable (PMV)
* **Página 6:** Capítulo V: Product Backlog e Historias de Usuario
* **Página 7:** Capítulo VI: Arquitectura de Software y Modelo de Datos
* **Página 8:** Capítulo VII: Planificación Temporal y Ruta Crítica de Sprints
* **Página 9:** Capítulo VIII: Gobernanza de Repositorio y Enlaces de Control
* **Página 10:** Capítulo IX: Métricas de Calidad y Declaración de Compromiso

---

## PÁGINA 1: PORTADA OFICIAL
* **Institución / Asignatura:** Ingeniería de Software & Metodologías Ágiles  
* **Actividad Didáctica:** Juego de Roles y Planeación de Proyectos  
* **Título del Proyecto:** Dolores Mágico (`app_Dolores_Magico`)  
* **Product Owner:** Valeria Guadalupe Calvillo Mendoza  
* **Scrum Master / Facilitadora & Líder Técnica:** María del Carmen  
* **Fecha Límite PMV:** 20 de Noviembre de 2026  
* **Ubicación:** Dolores Hidalgo C.I.N., Guanajuato • Septiembre de 2026  

---

## PÁGINA 2: CAPÍTULO I — CONTEXTO ESTRATÉGICO Y ALCANCE GLOBAL
El municipio de Dolores Hidalgo Cuna de la Independencia Nacional, en el estado de Guanajuato, posee un patrimonio cultural, histórico, artesanal y gastronómico de relevancia internacional. No obstante, el acceso a la información turística especializada suele encontrarse fragmentado o desactualizado. La plataforma Dolores Mágico nace con el propósito de centralizar, estructurar y disponibilizar la oferta de valor del destino en un entorno digital interactivo y de alto rendimiento.

La iniciativa se concibe como una solución integral desacoplada, compuesta por un módulo visual cliente (Frontend) alojado en el directorio raíz correspondiente y un servicio de procesamiento y entrega de datos (Backend RESTful). Esta arquitectura asegura que los visitantes puedan consultar en tiempo real los principales atractivos históricos, las rutas de talleres tradicionales de cerámica mayólica, los locales emblemáticos de nieves exóticas y la oferta gastronómica regional.

---

## PÁGINA 3: CAPÍTULO II — ESTRUCTURA ORGANIZACIONAL Y ROLES METODOLÓGICOS
* **Product Owner / Líder de Producto: Valeria Guadalupe Calvillo Mendoza** — Máxima responsable del valor de negocio de la plataforma, priorización del Product Backlog, interlocución con usuarios/evaluadores y delimitación del alcance estricto del PMV.
* **Scrum Master / Facilitadora y Líder Técnica: María del Carmen** — Responsable del aseguramiento metodológico del marco Scrum, facilitación de ceremonias ágiles, remoción de impedimentos técnicos y actualización del tablero de seguimiento en tiempo real.
* **Equipo de Desarrollo (Dev Team):** Valeria Guadalupe Calvillo Mendoza y María del Carmen asumen colaborativamente el diseño de arquitectura, desarrollo Frontend (`/Front`) y Backend (`/backend`), pruebas y control de versiones en GitHub.

---

## PÁGINA 4: CAPÍTULO III — FUNDAMENTACIÓN METODOLÓGICA Y GESTIÓN DE RIESGOS

**Párrafo Oficial de Fundamentación Metodológica (104 palabras):**
> *Seleccionamos **Scrum** por su estructura de ciclos cortos e incrementales (Sprints de 2 semanas), óptima para mitigar riesgos ante la fecha límite del 20 de noviembre. Esta metodología nos permite realizar revisiones periódicas, identificar cuellos de botella en la integración entre Frontend y Backend mediante Daily Standups y adaptar prioridades rápidamente. La continua refinación del Product Backlog asegura que el equipo concentre sus esfuerzos exclusivamente en las funcionalidades nucleares del Producto Mínimo Viable (PMV), garantizando una versión estable, testeada y lista para demostración en vivo sin incurrir en desviación de tiempos ni sobrecostes de alcance.*

**Gestión de Riesgos:** El riesgo de desviación de alcance (Scope Creep) se neutraliza con el veto del Product Owner sobre requerimientos no esenciales. El riesgo de desacople Front-Back se mitiga definiendo contratos OpenAPI y mock data desde el Sprint 1. El riesgo de fallos en vivo se controla mediante un Code Freeze 48 horas antes de la entrega del 20 de noviembre.

---

## PÁGINA 5: CAPÍTULO IV — ESTRATEGIA DEL PRODUCTO MÍNIMO VIABLE (PMV)
Para el 20 de noviembre, el equipo presentará en funcionamiento activo el núcleo interactivo de exploración turística de Dolores Hidalgo: catálogo visual de atractivos clasificados por rubros (historia, artesanías mayólicas, nieves tradicionales y gastronomía), sistema ágil de filtrado temático y fichas descriptivas con datos históricos, horarios, imágenes y geolocalización directa.

**Justificación de Exclusiones:** Se excluyeron conscientemente del PMV las pasarelas de pago y transacciones bancarias, los sistemas de reservación hotelera en tiempo real y los módulos de realidad virtual / 360°. Estos módulos demandan integraciones externas complejas y certificaciones que comprometerían el tiempo de entrega sin aportar al núcleo informativo primario.

---

## PÁGINA 6: CAPÍTULO V — PRODUCT BACKLOG E HISTORIAS DE USUARIO
* **Historia US-01 (Catálogo General - 5 pts):** Como turista que visita Dolores Hidalgo, deseo consultar una lista estructurada de atractivos con fotos y nombres, para decidir qué sitios conocer durante mi estadía. *Criterio Gherkin:* Dado que el usuario accede a la pantalla principal, cuando el sistema realiza la petición al backend, entonces se renderizan las tarjetas con tiempo de carga inferior a 2.0 segundos.
* **Historia US-02 (Filtrado por Categorías - 3 pts):** Como visitante con intereses específicos, deseo filtrar el catálogo por temáticas (Historia, Artesanías, Gastronomía), para visualizar rápidamente solo los lugares de mi preferencia. *Criterio Gherkin:* Dado que el catálogo está desplegado, cuando el usuario presiona "Gastronomía", entonces se muestran exclusivamente las opciones gastronómicas sin recargar la página.
* **Historia US-03 (Ficha Detallada - 5 pts):** Como usuario interesado en un lugar concreto, deseo acceder a su ficha detallada con historia, horarios y ubicación, para planificar mi visita. *Criterio Gherkin:* Dado que el usuario hace clic sobre una tarjeta, cuando se abre la vista de detalle, entonces se despliegan la reseña cultural, horarios y enlace de navegación.

---

## PÁGINA 7: CAPÍTULO VI — ARQUITECTURA DE SOFTWARE Y MODELO DE DATOS
La arquitectura de Dolores Mágico se basa en el principio de separación de responsabilidades y desacoplamiento de capas. El Frontend está construido con tecnologías web estándares de alto desempeño (HTML5 semántico, JavaScript moderno y hojas de estilo CSS3 con tokens de diseño), consumiendo asíncronamente los servicios del Backend a través de la API Fetch.

El Backend implementa un servicio RESTful ligero y eficiente, encargado de exponer los endpoints de consulta de información estructurada en formato JSON (`GET /api/places`, `GET /api/places/:id` y `GET /api/categories`). La entidad central corresponde al Punto Turístico, estructurada con identificador único, denominación oficial, categoría temática, descripción histórica, galería de imágenes, horarios de atención y coordenadas geográficas de latitud y longitud.

---

## PÁGINA 8: CAPÍTULO VII — PLANIFICACIÓN TEMPORAL Y RUTA CRÍTICA
* **Sprint 1 (Cimientos y Setup Base):** Repositorio en GitHub con estructura Frontend y Backend, especificación del modelo de datos y diseño base.
* **Sprint 2 (Backend y Componentes Core):** Endpoints RESTful de lectura, componentes de tarjetas en el cliente y carga de los primeros 15 atractivos turísticos representativos.
* **Sprint 3 (Integración, Filtros y Fichas):** Conexión asíncrona Front-Back, filtrado reactivo por categorías y vista detallada con geolocalización.
* **Sprint 4 (QA, Testing, Code Freeze y Demo Final):** Pruebas móviles, depuración de código, Code Freeze el 18 de noviembre y presentación en vivo del PMV el 20 de noviembre.
* **Definition of Done (DoD):** Cero errores en consola, Pull Request aprobado por líderes técnicos, validación de criterios Gherkin por el Product Owner y despliegue funcional en vivo.

---

## PÁGINA 9: CAPÍTULO VIII — GOBERNANZA DE REPOSITORIO Y ENLACES DE CONTROL
* **Repositorio Oficial de Código Fuente (GitHub):** https://github.com/valeria1732/app_Dolores_Magico
* **Tablero Ágil de Seguimiento y Control (GitHub Projects / Trello):** https://github.com/valeria1732/app_Dolores_Magico/projects

**Estrategia GitFlow:** La rama `main` actúa como rama de producción protegida (cero commits directos); la rama `develop` funciona como rama de integración continua; y las ramas `feature/*` se crean para cada historia de usuario específica, integrándose mediante Pull Requests obligatorios revisados por pares.

---

## PÁGINA 10: CAPÍTULO IX — MÉTRICAS DE CALIDAD Y DECLARACIÓN DE COMPROMISO
* **KPIs de Calidad:** Tiempo de respuesta y carga inicial inferior a 2.0 segundos; 100% de datos reales verificados de Dolores Hidalgo (cero contenido ficticio); y tasa de cero fallos críticos durante la navegación en vivo frente al comité evaluador el 20 de noviembre de 2026.
* **Firmas de Compromiso:**
  * **Valeria Guadalupe Calvillo Mendoza** — Product Owner / Dirección de Proyecto
  * **María del Carmen** — Scrum Master / Facilitación Metodológica y Liderazgo Técnico
