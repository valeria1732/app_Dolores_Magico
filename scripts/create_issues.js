const { execSync } = require('child_process');

function getGitToken() {
  try {
    const output = execSync('git credential fill', {
      input: 'protocol=https\nhost=github.com\n',
      encoding: 'utf-8'
    });
    for (const line of output.split('\n')) {
      if (line.startsWith('password=')) {
        return line.replace('password=', '').trim();
      }
    }
  } catch (e) {
    console.error('Error al obtener credenciales:', e.message);
  }
  return null;
}

const token = getGitToken();
if (!token) {
  console.error('❌ No se encontró token en Git Credential Manager.');
  process.exit(1);
}

const REPO = 'valeria1732/app_Dolores_Magico';
const BASE_URL = `https://api.github.com/repos/${REPO}`;
const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'DoloresMagico-Terminal-Creator',
  'Content-Type': 'application/json'
};

const LABELS = [
  { name: 'priority: high', color: 'd73a4a', description: 'Prioridad Alta - Indispensable para MVP' },
  { name: 'priority: medium', color: 'fbca04', description: 'Prioridad Media - Sprint 2' },
  { name: 'priority: low', color: '0e8a16', description: 'Prioridad Baja - Sprint 3' },
  { name: 'user-story', color: '1d76db', description: 'Historia de Usuario formal' },
  { name: 'mvp', color: '5319e7', description: 'Producto Mínimo Viable' },
  { name: 'map-gps', color: '0052cc', description: 'Mapa y Geolocalización' },
  { name: 'citizen-report', color: 'e99695', description: 'Módulo de Reportes Urbanos' },
  { name: 'catalog', color: 'bfdadc', description: 'Catálogo y Ficha del Artesano' },
  { name: 'admin', color: 'c2e0c6', description: 'Administración y Validación HU05' },
  { name: 'events', color: 'f9d0c4', description: 'Eventos Culturales y Festividades' },
  { name: 'reviews', color: 'fef2c0', description: 'Reseñas y Calificaciones' }
];

const MILESTONES = [
  { title: 'Sprint 1 - MVP DoloresMágico', description: 'Funcionalidades indispensables del MVP (HU01, HU02, HU03, HU04, HU05).' },
  { title: 'Sprint 2 - Cultura y Difusión', description: 'Agenda cultural y notificaciones de festividades tradicionales.' },
  { title: 'Sprint 3 - Comunidad y Reseñas', description: 'Sistema de calificaciones, reseñas y fidelización turística.' }
];

const ISSUES = [
  {
    title: '[ALTA] HU01 - Autenticación y Registro Diferenciado de Artesanos y Ciudadanos',
    milestoneName: 'Sprint 1 - MVP DoloresMágico',
    labels: ['priority: high', 'user-story', 'mvp'],
    body: `## 👤 Historia de Usuario
**Como** artesano de Talavera o habitante/turista de Dolores Hidalgo,  
**Quiero** registrarme e iniciar sesión con un rol diferenciado (Turista, Ciudadano, Artesano, Administrador),  
**Para** acceder a las funciones correspondientes (gestionar mi taller artesanal o explorar rutas y reportar incidencias).

## 🎯 Prioridad
**Alta (MVP)** — Indispensable para el funcionamiento del sistema.

## ✅ Criterios de Aceptación
- [ ] Selector interactivo de perfil en la barra de navegación: *Turista / Visitante*, *Ciudadano Dolorense*, *Artesano / Nevero Local* y *Administrador Municipal*.
- [ ] Formulario de registro para el artesano que incluye: nombre del taller, maestro artesano titular, giro (Talavera / Nevería), dirección local, WhatsApp comercial e historia del taller.
- [ ] Indicador en el Navbar que refleja el rol actualmente activo con badges de color.
- [ ] Persistencia de sesión y rol activo en almacenamiento local / base de datos.

## 🛠️ Tareas Técnicas
1. Desarrollar componente modal \`AuthModal\` con pestañas de selector de perfil y registro de taller.
2. Integrar capa de servicio \`storageService\` para persistir roles y perfil de usuario.
3. Conectar indicador y disparador de perfil en el componente \`Navbar\`.`
  },
  {
    title: '[ALTA] HU02 - Mapa GPS Geolocalizado con Pines Temáticos Diferenciados por Color',
    milestoneName: 'Sprint 1 - MVP DoloresMágico',
    labels: ['priority: high', 'user-story', 'map-gps', 'mvp'],
    body: `## 👤 Historia de Usuario
**Como** visitante o turista,  
**Quiero** consultar un mapa interactivo geolocalizado con pines diferenciados por colores específicos,  
**Para** planificar mi ruta turística por talleres de Talavera, neverías tradicionales y recintos históricos de la Independencia.

## 🎯 Prioridad
**Alta (MVP)** — Funcionalidad principal del sistema turístico.

## ✅ Criterios de Aceptación
- [ ] Carga del mapa interactivo centrado en la Plaza Principal de Dolores Hidalgo C.I.N. (21.1561, -100.9325).
- [ ] Pines interactivos estilizados según el documento oficial de diseño de la UTNG:
  * 🔵 **Pines Azules:** Talleres de Talavera y mayólica virreinal novohispana.
  * 🟡 **Pines Amarillos:** Neverías tradicionales centenarias de barrica de encino.
  * 🔴 **Pines Rojos:** Sitios Históricos y museos de 1810 (Parroquia de Dolores, Casa de Hidalgo, Antigua Cárcel, Casa de Visitas, Mausoleo de José Alfredo Jiménez).
- [ ] Leyenda oficial en pantalla explicando la codificación de pines.
- [ ] Al presionar un pin: despliegue de ficha técnica flotante con nombre, responsable, dirección, reseña y botón directo a WhatsApp.
- [ ] Barra de búsqueda predictiva y botones de filtro por categoría.
- [ ] Botón de recentrado automático a Dolores Hidalgo.

## 🛠️ Tareas Técnicas
1. Desarrollar componente \`InteractiveMap\` utilizando Leaflet / OpenStreetMap.
2. Crear estilos CSS específicos para marcadores SVG/HTML con efecto de pulso y pin triangular.
3. Conectar catálogo con pines dinámicos y eventos de selección.`
  },
  {
    title: '[ALTA] HU03 - Módulo de Reporte Ciudadano con Captura de Foto, GPS y Folio de Seguimiento',
    milestoneName: 'Sprint 1 - MVP DoloresMágico',
    labels: ['priority: high', 'user-story', 'citizen-report', 'mvp'],
    body: `## 👤 Historia de Usuario
**Como** ciudadano de Dolores Hidalgo,  
**Quiero** enviar una fotografía acompañada de la ubicación GPS de un servicio o espacio público con fallas,  
**Para** solicitar su reparación oportuna a la dependencia municipal correspondiente y recibir un folio de seguimiento.

## 🎯 Prioridad
**Alta (MVP)** — Eje central de participación y cuidado de la imagen del Pueblo Mágico.

## ✅ Criterios de Aceptación
- [ ] Selector interactivo de tipos de problema urbano:
  * 💡 *Alumbrado Público* (luminarias apagadas, faroles coloniales dañados).
  * 🗑️ *Acumulación de Basura* (contenedores desbordados en zonas turísticas).
  * 🚧 *Vialidad y Baches* (baches en empedrado colonial tradicional o asfalto).
  * 🌳 *Parques y Jardines* (mobiliario urbano, áreas verdes).
  * 🚰 *Fugas de Agua / Drenaje*.
- [ ] Captura / carga de evidencia fotográfica con vista previa inmediata.
- [ ] Detección automática de coordenadas GPS del dispositivo mediante Geolocation API.
- [ ] Generación automática e instantánea de un código/folio único oficial (formato \`FOL-2026-DH-XXXX\`).
- [ ] Modal de confirmación con opción para copiar el folio al portapapeles.
- [ ] Pantalla pública de seguimiento donde se pueden consultar todas las incidencias y su estatus (*Reportado*, *En Revisión*, *En Atención*, *Resuelto*).

## 🛠️ Tareas Técnicas
1. Crear componente \`CitizenReportForm\` con soporte de carga de foto y GPS.
2. Desarrollar componente \`ReportSuccessModal\` con código de folio y botón de copiado.
3. Crear componente \`ReportsList\` para consulta ciudadana pública con buscador de folio.
4. Conectar servicio \`reportService\` y endpoint \`POST /api/reports\`.`
  },
  {
    title: '[ALTA] HU04 - Ficha Técnica, Catálogo del Artesano y Contacto Directo por WhatsApp',
    milestoneName: 'Sprint 1 - MVP DoloresMágico',
    labels: ['priority: high', 'user-story', 'catalog', 'mvp'],
    body: `## 👤 Historia de Usuario
**Como** usuario y comprador,  
**Quiero** comunicarme directamente con un maestro artesano mediante WhatsApp o llamada telefónica desde la aplicación,  
**Para** consultar precios, historia, disponibilidad o realizar pedidos sin intermediarios ni comisiones.

## 🎯 Prioridad
**Alta (MVP)** — Pilar económico de inclusión y comercio justo.

## ✅ Criterios de Aceptación
- [ ] Directorio completo de artesanos y neveros con filtros por categoría y barra de búsqueda.
- [ ] Ficha técnica detallada por taller con:
  * Fotografía representativa del taller y del maestro artesano.
  * Historia y técnicas empleadas (horno de leña, mayólica vidriada, torno de pie, etc.).
  * Galería / Catálogo de productos con fotografía, técnica y precio sugerido en MXN.
- [ ] Botón de enlace directo a la API de WhatsApp (\`https://wa.me/...\`) con mensaje preconfigurado indicando la pieza o taller de interés.
- [ ] Botón de llamada telefónica directa (\`tel:...\`).
- [ ] Botón para localizar el taller directamente en el mapa interactivo.

## 🛠️ Tareas Técnicas
1. Crear componentes \`ArtisanDirectory\`, \`ArtisanCard\` y \`ArtisanDetailModal\`.
2. Modelar datos reales de talleres dolorenses en \`doloresData.js\`.
3. Configurar deep-links de WhatsApp con codificación URI (\`encodeURIComponent\`).`
  },
  {
    title: '[ALTA] HU05 - Panel de Administración y Validación Municipal de Reportes y Talleres',
    milestoneName: 'Sprint 1 - MVP DoloresMágico',
    labels: ['priority: high', 'user-story', 'admin', 'mvp'],
    body: `## 👤 Historia de Usuario
**Como** administrador municipal de Dolores Hidalgo,  
**Quiero** validar los registros de nuevos artesanos y consultar los reportes urbanos realizados por los ciudadanos,  
**Para** garantizar que la información publicada sea confiable y facilitar el seguimiento de las incidencias.

## 🎯 Prioridad
**Alta (MVP)** — Requisito de gobernanza y confiabilidad de datos.

## ✅ Criterios de Aceptación
- [ ] Pestaña y panel exclusivo de administración accesible con rol *Administrador*.
- [ ] Tabla de gestión de incidencias con capacidad de cambiar el estatus en tiempo real (*Reportado* ➔ *En Revisión* ➔ *En Atención* ➔ *Resuelto*).
- [ ] Tabla de artesanos para aprobar o revocar la insignia de *Validación Oficial*.
- [ ] Notificaciones toast confirmando los cambios realizados por el administrador.

## 🛠️ Tareas Técnicas
1. Crear componente \`AdminValidationPanel\` con pestañas de Reportes y Artesanos.
2. Implementar funciones \`updateReportStatus\` y \`toggleVerifyArtisan\` en \`storageService\`.
3. Conectar endpoint \`PATCH /api/reports/:id/status\`.`
  },
  {
    title: '[MEDIA] Agenda de Festividades Culturales y Tradiciones de Dolores Hidalgo',
    milestoneName: 'Sprint 2 - Cultura y Difusión',
    labels: ['priority: medium', 'events'],
    body: `## 👤 Historia de Usuario
**Como** visitante o residente,  
**Quiero** consultar la agenda de eventos culturales y festividades tradicionales de Dolores Hidalgo,  
**Para** programar mi visita durante las Fiestas Patrias, Festival de la Nieve o Fiestas de Talavera.

## 🎯 Prioridad
**Media** — Programado para Sprint 2.

## ✅ Criterios de Aceptación
- [ ] Vista dedicada a eventos culturales con fechas, ubicación y descripción detallada.
- [ ] Tarjetas informativas para las *Fiestas Patrias de Dolores Hidalgo*, *Festival Nacional de la Nieve Tradicional* y *Ruta de la Talavera*.
- [ ] Botón de acceso rápido para ubicar puntos de interés relacionados con el evento en el mapa.

## 🛠️ Tareas Técnicas
1. Crear componente \`CulturalEvents\` con diseño responsive.
2. Estructurar array de eventos en \`doloresData.js\`.`
  },
  {
    title: '[BAJA] Sistema de Reseñas y Calificaciones Comunitarias de Talleres y Neverías',
    milestoneName: 'Sprint 3 - Comunidad y Reseñas',
    labels: ['priority: low', 'reviews'],
    body: `## 👤 Historia de Usuario
**Como** turista o visitante,  
**Quiero** calificar con estrellas y dejar un comentario sobre la atención del taller artesanal o nevería,  
**Para** orientar a futuros visitantes y reconocer el trabajo de los artesanos destacados.

## 🎯 Prioridad
**Baja** — Programado para Sprint 3.

## ✅ Criterios de Aceptación
- [ ] Visualización de puntuación promedio (1 a 5 estrellas) y número de opiniones en cada ficha.
- [ ] Modal para que los visitantes registrados puedan enviar su reseña y calificación.

## 🛠️ Tareas Técnicas
1. Diseñar componente de calificación con estrellas interactivas.
2. Guardar comentarios y recalcular promedio de valoración.`
  }
];

async function main() {
  console.log(`=======================================================`);
  console.log(`🚀 Creando configuración e Issues en GitHub para ${REPO}...`);
  console.log(`=======================================================`);

  // 1. Crear Labels
  console.log('\n📌 1. Verificando etiquetas (labels)...');
  for (const label of LABELS) {
    try {
      const res = await fetch(`${BASE_URL}/labels`, {
        method: 'POST',
        headers,
        body: JSON.stringify(label)
      });
      if (res.status === 201) {
        console.log(`  ✅ Etiqueta creada: "${label.name}"`);
      } else if (res.status === 422) {
        // Ya existe, actualizar color/desc
        const escaped = encodeURIComponent(label.name);
        await fetch(`${BASE_URL}/labels/${escaped}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(label)
        });
        console.log(`  ℹ️  Etiqueta actualizada: "${label.name}"`);
      } else {
        const text = await res.text();
        console.log(`  ⚠️  Etiqueta "${label.name}": status ${res.status}`);
      }
    } catch (e) {
      console.error(`  ❌ Error en etiqueta "${label.name}":`, e.message);
    }
  }

  // 2. Crear Milestones
  console.log('\n📌 2. Verificando hitos (milestones)...');
  const milestoneMap = {};
  // Obtener existentes primero
  try {
    const listRes = await fetch(`${BASE_URL}/milestones?state=all`, { headers });
    if (listRes.ok) {
      const existingMs = await listRes.json();
      for (const m of existingMs) {
        milestoneMap[m.title] = m.number;
      }
    }
  } catch (e) {}

  for (const ms of MILESTONES) {
    if (milestoneMap[ms.title]) {
      console.log(`  ℹ️  Milestone existente: "${ms.title}" (#${milestoneMap[ms.title]})`);
      continue;
    }
    try {
      const res = await fetch(`${BASE_URL}/milestones`, {
        method: 'POST',
        headers,
        body: JSON.stringify(ms)
      });
      if (res.ok) {
        const data = await res.json();
        milestoneMap[ms.title] = data.number;
        console.log(`  ✅ Milestone creado: "${ms.title}" (#${data.number})`);
      }
    } catch (e) {
      console.error(`  ❌ Error en milestone "${ms.title}":`, e.message);
    }
  }

  // 3. Crear los 7 Issues
  console.log('\n📌 3. Creando los 7 Issues oficiales...');
  let createdCount = 0;
  for (const issue of ISSUES) {
    const payload = {
      title: issue.title,
      body: issue.body,
      labels: issue.labels
    };
    if (issue.milestoneName && milestoneMap[issue.milestoneName]) {
      payload.milestone = milestoneMap[issue.milestoneName];
    }

    try {
      const res = await fetch(`${BASE_URL}/issues`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        createdCount++;
        console.log(`  ✅ Issue #${data.number} creado: "${data.title}"`);
        console.log(`     🔗 URL: ${data.html_url}`);
      } else {
        const text = await res.text();
        console.error(`  ❌ Error creando issue "${issue.title}": HTTP ${res.status} - ${text}`);
      }
    } catch (e) {
      console.error(`  ❌ Error de red creando issue "${issue.title}":`, e.message);
    }
  }

  console.log('\n=======================================================');
  console.log(`🎉 Finalizado con éxito: ${createdCount} de ${ISSUES.length} issues creados en GitHub.`);
  console.log(`🌐 Puedes verlos en: https://github.com/${REPO}/issues`);
  console.log(`=======================================================`);
}

main().catch(console.error);
