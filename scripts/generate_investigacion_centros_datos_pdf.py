# -*- coding: utf-8 -*-
"""
Generador del Dossier Académico y Técnico:
Infraestructura y Evolución de los Centros de Datos, Modelos de Nube y Seguridad Móvil.
Produce entregables en PDF y DOCX con formato editorial universitario UTNG.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

PRIMARY = colors.HexColor("#0D233A")    # Azul Marino UTNG / Talavera
SECONDARY = colors.HexColor("#00796B")  # Verde Teal Seguridad
DARK = colors.HexColor("#1A202C")       # Texto base
BG_LIGHT = colors.HexColor("#F8FAFC")   # Gris claro
BORDER = colors.HexColor("#CBD5E1")     # Borde gris
HEADER_BG = colors.HexColor("#1E293B")  # Encabezado tabla oscuro

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Encabezado superior en páginas posteriores a la 1
        if self._pageNumber > 1:
            self.drawString(36, 756, "UTNG — Desarrollo Móvil Integral | Centros de Datos, Nube y Seguridad")
            self.drawRightString(576, 756, "DoloresMágico App (Flutter & Dart)")
            self.setStrokeColor(BORDER)
            self.setLineWidth(0.5)
            self.line(36, 750, 576, 750)

        # Pie de página en todas las páginas
        page_str = f"Página {self._pageNumber} de {page_count}"
        self.drawRightString(576, 25, page_str)
        self.drawString(36, 25, "Docente: Lic. José de Jesús Eduardo Barrientos Avalos | Equipo GIDS6101-E")
        self.setStrokeColor(BORDER)
        self.setLineWidth(0.5)
        self.line(36, 35, 576, 35)
        self.restoreState()


def build_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=45,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=PRIMARY,
        alignment=1
    )
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=SECONDARY,
        alignment=1
    )
    meta_style = ParagraphStyle(
        'DocMeta',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=DARK,
        alignment=1
    )
    h1_style = ParagraphStyle(
        'Heading1Custom',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=PRIMARY,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )
    h2_style = ParagraphStyle(
        'Heading2Custom',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=SECONDARY,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )
    body_style = ParagraphStyle(
        'BodyCustom',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=DARK,
        spaceAfter=4
    )
    body_bold = ParagraphStyle(
        'BodyBoldCustom',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=DARK
    )
    table_cell = ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=DARK
    )
    table_header = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=colors.white
    )

    story = []

    # Portada / Encabezado Principal
    story.append(Paragraph("UNIVERSIDAD TECNOLÓGICA DEL NORTE DE GUANAJUATO", title_style))
    story.append(Paragraph("DESARROLLO MÓVIL INTEGRAL — DOSSIER ACADÉMICO Y TÉCNICO", subtitle_style))
    story.append(Paragraph("<b>Proyecto:</b> DoloresMágico App (o DoloresConecta) — Flutter & Dart | <b>Grupo:</b> GIDS6101-E<br/>"
                           "<b>Integrantes:</b> Valeria Guadalupe Calvillo Mendoza (1223100392) y María del Carmen Vargas Martínez (1220100084)<br/>"
                           "<b>Docente:</b> Lic. José de Jesús Eduardo Barrientos Avalos | <b>Fecha:</b> Octubre 2026", meta_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=8))

    # Título temático
    story.append(Paragraph("<b>INFRAESTRUCTURA Y EVOLUCIÓN DE LOS CENTROS DE DATOS, MODELOS DE NUBE Y SEGURIDAD MÓVIL</b>", h1_style))
    story.append(Paragraph("Investigación exhaustiva de los 15 cuestionamientos técnicos y su correlación con la arquitectura de la aplicación móvil.", body_style))
    story.append(Spacer(1, 4))

    # SECCIÓN 1: Centros de Datos (P1 - P3)
    story.append(Paragraph("1. Infraestructura y Evolución de los Centros de Datos", h1_style))

    # P1
    story.append(Paragraph("<b>Pregunta 1: ¿Qué es un centro de datos y por qué es fundamental comprender este concepto antes de definir la computación en la nube?</b>", h2_style))
    story.append(Paragraph(
        "Un <b>centro de datos</b> (<i>Data Center</i>) es una instalación física especializada y de alta ingeniería concebida para concentrar, albergar, interconectar y garantizar la operación continua ininterrumpida de los equipos de tecnologías de la información (TI) y telecomunicaciones. Sus componentes físicos esenciales abarcan bastidores o <i>racks</i> estandarizados (EIA-310 de 19 pulgadas y OCP de 21 pulgadas), matrices masivas de almacenamiento de estado sólido (NVMe/SSD), conmutadores de red en topología <i>Spine-Leaf</i>, sistemas de energía ininterrumpida (UPS de doble conversión con topologías redundantes <i>N+1</i> o <i>2N</i>), motogeneradores diésel de emergencia, sistemas de enfriamiento de precisión (CRAC/CRAH con confinamiento de pasillos fríos/calientes y refrigeración líquida directa al procesador) y blindaje físico perimetral con detección de incendios por aspiración (VESDA) y gases limpios (Novec 1230 o FM-200).<br/><br/>"
        "<b>Fundamento indispensable previo a la nube:</b> Es un grave error conceptual asumir que la 'nube' es un concepto abstracto o 'inmaterial'. Físicamente, <b>la nube es el centro de datos altamente industrializado de otra entidad al que se accede de manera remota mediante la red</b>. Comprender la base física del centro de datos es indispensable para entender los límites de latencia física, consumo energético, refrigeración y disponibilidad. Sin este fundamento, resulta imposible comprender nociones avanzadas como <i>Regiones</i>, <i>Zonas de Disponibilidad (AZs)</i>, acuerdos de nivel de servicio (SLA) y la clasificación de niveles Tier del Uptime Institute (Tier I a Tier IV con hasta 99.995% de disponibilidad).",
        body_style
    ))

    # P2
    story.append(Paragraph("<b>Pregunta 2: ¿Cómo ha sido la evolución histórica de los centros de datos desde la década de 1940 hasta los diseños modernos de la actualidad?</b>", h2_style))
    story.append(Paragraph(
        "• <b>1940 - 1950 (Inicios Electrónicos):</b> Máquinas colosales como el ENIAC (1946) y el UNIVAC I (1951). Ocupaban salas completas de cientos de metros cuadrados para albergar una sola computadora, requiriendo cientos de kilovatios para alimentar miles de tubos de vacío con ventilación industrial ruidosa y propensa a fallas térmicas constantes.<br/>"
        "• <b>1960 - 1970 (Era de los Mainframes):</b> Consolidación con el IBM System/360 (1964). Nace la 'sala blanca' corporativa con piso técnico elevado (<i>raised floor</i>) para canalizar cableados gruesos y aire frío presurizado. Los usuarios interactuaban mediante terminales 'tontas' centralizadas.<br/>"
        "• <b>1980 (Microcomputadoras y Servidores x86 Distribuidos):</b> Descentralización cliente-servidor. Proliferación caótica de servidores en armarios departamentales (<i>server closets</i>) sin control térmico ni redundancia eléctrica.<br/>"
        "• <b>1990 (Internet y Centros de Colocación):</b> Auge de las empresas 'punto com' y nacimiento de los centros de colocación (IDC - <i>Internet Data Centers</i>), racks estandarizados de 19 pulgadas y la norma ANSI/TIA-942.<br/>"
        "• <b>2000 (Revolución de la Virtualización):</b> Hipervisores (VMware, Xen, KVM) permitieron ejecutar decenas de máquinas virtuales por servidor físico, elevando la densidad térmica a más de 12 kW por rack e impulsando el confinamiento de pasillos fríos y calientes.<br/>"
        "• <b>2010 a la Actualidad (Hiperescala y Cero Carbono):</b> Los <i>Hyperscalers</i> (Google Cloud, AWS, Azure) operan complejos modulares de cientos de miles de servidores, refrigeración líquida por inmersión bifásica, redes definidas por software (SDN), aceleradores de IA (GPUs/TPUs) y eficiencias de uso de energía (PUE) cercanas a 1.08.",
        body_style
    ))

    # P3
    story.append(Paragraph("<b>Pregunta 3: Principales diferencias, ventajas y desventajas entre un centro de datos local, uno de colocación y uno en la nube</b>", h2_style))
    
    t_comp_data = [
        [
            Paragraph("<b>Criterio</b>", table_header),
            Paragraph("<b>Centro Local (On-Premise)</b>", table_header),
            Paragraph("<b>Colocación (Colocation)</b>", table_header),
            Paragraph("<b>Nube (Cloud Computing)</b>", table_header)
        ],
        [
            Paragraph("<b>Modelo Financiero</b>", table_cell),
            Paragraph("CAPEX intensivo (servidores, obra civil, UPS, generadores).", table_cell),
            Paragraph("Híbrido: CAPEX en servidores propios + OPEX en renta de espacio.", table_cell),
            Paragraph("OPEX puro: Cero inversión inicial. Pago por uso estricto.", table_cell)
        ],
        [
            Paragraph("<b>Control Físico</b>", table_cell),
            Paragraph("Total: Custodia física absoluta de discos y cables en sede propia.", table_cell),
            Paragraph("Compartido: Acceso a jaula/rack propio en instalaciones externas.", table_cell),
            Paragraph("Nulo: Infraestructura abstracta gestionada por el proveedor.", table_cell)
        ],
        [
            Paragraph("<b>Escalabilidad</b>", table_cell),
            Paragraph("Lenta: Semanas/meses para compra y montaje de hardware.", table_cell),
            Paragraph("Media: Días/semanas para trasladar nuevos equipos al rack.", table_cell),
            Paragraph("Instantánea: Elasticidad automática en segundos vía API.", table_cell)
        ],
        [
            Paragraph("<b>Ventajas</b>", table_cell),
            Paragraph("Soberanía y control total; sin dependencia de internet externo.", table_cell),
            Paragraph("Ahorro en obra civil e infraestructura eléctrica de alta gama.", table_cell),
            Paragraph("Despliegue global en minutos, alta disponibilidad, elástico.", table_cell)
        ],
        [
            Paragraph("<b>Desventajas</b>", table_cell),
            Paragraph("Costos de mantenimiento y obsolescencia muy elevados.", table_cell),
            Paragraph("Requiere personal para desplazarse a realizar mantenimiento.", table_cell),
            Paragraph("Costos recurrentes acumulativos y riesgo de vendor lock-in.", table_cell)
        ]
    ]
    t_comp = Table(t_comp_data, colWidths=[70, 150, 150, 170])
    t_comp.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_BG),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_comp)
    story.append(Spacer(1, 6))

    # SECCIÓN 2: Conceptos y Modelos de la Nube (P4 - P6)
    story.append(Paragraph("2. Conceptos y Modelos de la Nube", h1_style))

    # P4
    story.append(Paragraph("<b>Pregunta 4: A partir de la analogía con la electricidad, ¿cómo se define la computación en la nube y qué significa el esquema de 'pago por uso'?</b>", h2_style))
    story.append(Paragraph(
        "<b>La Analogía de Nicholas Carr (The Big Switch):</b> En la Revolución Industrial, las fábricas construían sus propias calderas de vapor y dinamos generadoras. Cuando Nikola Tesla y Thomas Edison articularon la red eléctrica centralizada, las empresas desmontaron sus plantas generadoras y simplemente enchufaron sus máquinas a la pared, pagando únicamente por los kilovatios-hora consumidos.<br/><br/>"
        "<b>Definición formal (NIST SP 800-145):</b> La computación en la nube es un modelo que permite el acceso omnipresente, cómodo y bajo demanda a través de la red a un catálogo compartido de recursos computacionales configurables (redes, servidores, almacenamiento, aplicaciones y servicios) que pueden aprovisionarse y liberarse con mínimo esfuerzo administrativo.<br/><br/>"
        "<b>Esquema de 'Pago por Uso' (Pay-As-You-Go):</b> Los recursos se miden con precisión de segundos o gigabytes transferidos. Si nuestra aplicación móvil en Firebase realiza 5,000 lecturas en Firestore y almacena 1 GB de fotos de reportes, únicamente se facturan esas unidades métricas exactas. Cuando el tráfico cesa durante la noche, las funciones se apagan (*Scale-to-Zero*) y el costo cae a cero, eliminando el desperdicio financiero de mantener servidores ociosos.",
        body_style
    ))

    # P5
    story.append(Paragraph("<b>Pregunta 5: ¿En qué consisten los cuatro modelos de implementación de la nube y bajo qué criterios los eligen las empresas?</b>", h2_style))
    story.append(Paragraph(
        "• <b>Nube Pública (Multi-tenant):</b> Infraestructura operada por un proveedor (Google Cloud, AWS, Azure) compartida lógicamente entre múltiples clientes mediante aislamiento criptográfico. <i>Criterio:</i> Ideal para aplicaciones móviles masivas, startups y plataformas globales con tráfico elástico y requerimiento de rápida salida al mercado.<br/>"
        "• <b>Nube Privada (Single-tenant):</b> Infraestructura de uso exclusivo para una sola entidad, ubicada en sus instalaciones o alojada. <i>Criterio:</i> Entidades financieras o gubernamentales que exigen soberanía de datos, estricto secreto bancario o control de auditoría física total.<br/>"
        "• <b>Nube de Comunidad:</b> Infraestructura compartida por varias organizaciones con misiones y requerimientos normativos comunes (ej. red de investigación universitaria o consorcios de salud). <i>Criterio:</i> Distribución de costos operativos bajo un marco de gobernanza gremial homogéneo.<br/>"
        "• <b>Nube Híbrida:</b> Integración orquestada de dos o más nubes (privada y pública) mediante túneles seguros VPN IPsec, enlaces directos o Kubernetes. <i>Criterio:</i> Modernización progresiva donde el core de datos confidenciales permanece protegido en la sede y los canales de atención móvil se alojan en la nube pública.",
        body_style
    ))

    # P6
    story.append(Paragraph("<b>Pregunta 6: Diferenciación entre Infraestructura (IaaS), Plataforma (PaaS) y Software como Servicio (SaaS)</b>", h2_style))
    story.append(Paragraph(
        "La diferencia fundamental reside en el <b>Modelo de Responsabilidad Compartida</b>:<br/>"
        "• <b>IaaS (Infraestructura como Servicio):</b> El proveedor gestiona el hardware físico, la climatización y la virtualización. El cliente instala y mantiene el sistema operativo, parches de seguridad, middleware, runtime, datos y aplicaciones (ej. AWS EC2, Google Compute Engine).<br/>"
        "• <b>PaaS (Plataforma como Servicio):</b> El proveedor administra el hardware, la virtualización, el sistema operativo y el entorno de ejecución. El cliente se concentra exclusivamente en el código de su aplicación y los datos. <b>Google Firebase en DoloresMágico App</b> es el modelo PaaS adoptado: provee autenticación, base de datos NoSQL reactiva y almacenamiento de objetos sin requerir mantenimiento de servidores Linux subyacentes.<br/>"
        "• <b>SaaS (Software como Servicio):</b> El proveedor gestiona el 100% de la pila técnica. El usuario final solo interactúa con la aplicación configurada (ej. Google Workspace, Microsoft 365).",
        body_style
    ))
    story.append(Spacer(1, 6))

    # SECCIÓN 3: Beneficios, Seguridad y Mitigación de Riesgos (P7 - P9)
    story.append(Paragraph("3. Beneficios, Seguridad y Mitigación de Riesgos", h1_style))

    # P7
    story.append(Paragraph("<b>Pregunta 7: ¿De qué manera la elasticidad permite optimizar recursos frente a picos variables de demanda?</b>", h2_style))
    story.append(Paragraph(
        "La <b>elasticidad</b> es la capacidad de expandir <i>y contraer</i> dinámicamente recursos computacionales en tiempo real de forma automática (Auto-scaling). A diferencia de la escalabilidad (que mide la capacidad teórica de crecimiento), la elasticidad se ajusta minuto a minuto a la curva de demanda real. Resuelve los dos grandes problemas tradicionales:<br/>"
        "1. <b>Sobredimensionamiento (Over-provisioning):</b> Comprar hardware costoso para soportar el día de mayor tráfico del año (ej. Fiestas Patrias de Dolores Hidalgo), el cual pasa el 90% del tiempo inactivo consumiendo energía.<br/>"
        "2. <b>Subdimensionamiento (Under-provisioning):</b> Comprar hardware insuficiente que colapsa ante un pico imprevisto de usuarios.<br/>"
        "Con auto-escalado horizontal, cuando la demanda sube, la nube añade instancias en segundos; al descender el tráfico, las destruye automáticamente, optimizando los costos al mínimo.",
        body_style
    ))

    # P8
    story.append(Paragraph("<b>Pregunta 8: Argumentos y estándares internacionales que respaldan la seguridad en la nube frente a la física</b>", h2_style))
    story.append(Paragraph(
        "La creencia de que un servidor físico local es más seguro por estar 'a la vista' es refutada por la industria de ciberseguridad. Los proveedores de hiperescala invierten miles de millones de dólares anuales en seguridad y cuentan con miles de ingenieros dedicados a mitigar vulnerabilidades día cero y ataques DDoS masivos.<br/>"
        "<b>Estándares Internacionales que la respaldan:</b><br/>"
        "• <b>ISO/IEC 27001, 27017 y 27018:</b> Gestión integral de seguridad y protección de datos personales identificables (PII) en la nube.<br/>"
        "• <b>SOC 2 y SOC 3 Tipo II (AICPA):</b> Auditorías externas de controles de confidencialidad, integridad y disponibilidad.<br/>"
        "• <b>PCI-DSS Nivel 1:</b> Acreditación para procesamiento seguro de pagos con tarjeta.<br/>"
        "• <b>Computación Confidencial:</b> Cifrado en memoria RAM mediante enclaves de hardware seguro (AMD SEV / Intel SGX), garantizando que ni el propio personal del proveedor de nube pueda leer los datos en procesamiento.<br/>"
        "• <b>Cifrado Integral:</b> Cifrado en reposo obligatorio con <b>AES-256</b> y en tránsito con <b>TLS 1.3</b>.",
        body_style
    ))

    # P9
    story.append(Paragraph("<b>Pregunta 9: Riesgos ambientales/técnicos y arquitecturas complejas de mitigación de pérdida de información</b>", h2_style))
    story.append(Paragraph(
        "• <b>Riesgos Reales:</b> Terremotos, inundaciones, incendios forestales, fallas de la red eléctrica comercial, cortes de fibra óptica y ataques cibernéticos.<br/>"
        "• <b>Arquitectura de Zonas de Disponibilidad (AZs):</b> Una región de nube integra un mínimo de 3 centros de datos separados físicamente por decenas de kilómetros, con fuentes de energía eléctrica y enlaces de red totalmente independientes, enlazados por fibra oscura con latencias &lt;2 ms. Si una catástrofe destruye la AZ-1, las AZ-2 y AZ-3 absorben la carga de inmediato sin pérdida de datos.<br/>"
        "• <b>Métricas RTO y RPO:</b> Con replicación síncrona en bases de datos multi-región, el <i>Recovery Point Objective (RPO)</i> es de cero segundos (cero pérdida de datos) y el <i>Recovery Time Objective (RTO)</i> se reduce a pocos segundos mediante balanceadores Anycast globales.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # SECCIÓN 4: Aplicación en Educación y Clasificación (P10 - P15)
    story.append(Paragraph("4. Aplicación en el Sector Educativo y Clasificación Estratégica", h1_style))

    # P10
    story.append(Paragraph("<b>Pregunta 10: Beneficios de la nube en la práctica docente, investigación y evaluación masiva (Casos UNAM / UNAB)</b>", h2_style))
    story.append(Paragraph(
        "• <b>Docencia y Aulas Virtuales:</b> Permite operar plataformas de aprendizaje (Moodle, Blackboard, Canvas) elásticas para más de 300,000 estudiantes simultáneos durante el inicio de semestre sin caídas de servicio.<br/>"
        "• <b>Investigación de Alto Rendimiento (HPC):</b> Grupos científicos aprovisionan clusters de cómputo con cientos de GPUs para procesamiento genómico o simulaciones de física teórica bajo demanda, apagándolos al terminar sin gastar millones en supercomputadoras físicas fijas.<br/>"
        "• <b>Evaluaciones Masivas Síncronas:</b> Durante exámenes de admisión masivos a la misma hora, la arquitectura serverless en la nube escala automáticamente para registrar miles de respuestas concurrentes con sellado de tiempo criptográfico inalterable.",
        body_style
    ))

    # P11
    story.append(Paragraph("<b>Pregunta 11: ¿Qué es físicamente la nube y qué factores determinan su clasificación?</b>", h2_style))
    story.append(Paragraph(
        "Físicamente, la nube consiste en complejos industriales de hormigón armado con miles de servidores rackeados, memorias ECC, discos NVMe, enlaces de fibra transoceánicos, generadores marinos de diésel y refrigeración por agua helada.<br/>"
        "<b>Factores Determinantes de Clasificación:</b> 1) Titularidad jurídica de la infraestructura; 2) Modelo de tenencia (Multi-tenant vs Single-tenant); 3) Ubicación física de los servidores (On-premise vs campus externo); 4) Conectividad y perímetro de red (Internet público vs VPN/MPLS dedicada).",
        body_style
    ))

    # P12
    story.append(Paragraph("<b>Pregunta 12: Principales beneficios económicos y operativos de la nube pública para Startups</b>", h2_style))
    story.append(Paragraph(
        "• <b>Económicos:</b> Reducción de la inversión inicial en hardware a <b>\$0 (conversión de CAPEX a OPEX)</b>; bajo costo de falla que permite experimentar y apagar servidores si una idea no funciona; y extensión del capital de inversión (<i>runway</i>) para destinarlo a desarrollo y marketing.<br/>"
        "• <b>Operativos:</b> Velocidad vertiginosa de salida al mercado (<i>Time-to-Market</i> en minutos); disponibilidad de infraestructura global instantánea; y acceso a APIs de vanguardia (IA, visión por computadora, mapas) sin requerir equipos especializados en cableado o clima.",
        body_style
    ))

    # P13
    story.append(Paragraph("<b>Pregunta 13: ¿Por qué instituciones como bancos u hospitales optan por invertir en una nube privada a pesar de su alto costo?</b>", h2_style))
    story.append(Paragraph(
        "1) <b>Soberanía Legal y Secreto Bancario:</b> Disposiciones de la CNBV y Basilea prohíben compartir discos físicos con terceros no auditados o alojar datos financieros fuera de territorio nacional.<br/>"
        "2) <b>Protección Rigurosa de Salud:</b> Cumplimiento de la NOM-004-SSA3-2012, HIPAA y la <b>LFPDPPP reformada el 20 de marzo de 2025 en el DOF</b> para expedientes clínicos que exigen consentimiento explícito y auditoría física.<br/>"
        "3) <b>Custodia y Peritaje Forense:</b> Capacidad de secuestrar físicamente unidades de almacenamiento ante incidentes judiciales.<br/>"
        "4) <b>Latencia Determinista:</b> Transacciones de alta frecuencia o cirugías en tiempo real no toleran fluctuaciones de red pública.",
        body_style
    ))

    # P14
    story.append(Paragraph("<b>Pregunta 14: ¿Cómo combina la nube híbrida 'lo mejor de ambos mundos'? Ejemplo práctico en DoloresMágico App</b>", h2_style))
    story.append(Paragraph(
        "La nube híbrida brinda la máxima confidencialidad, soberanía y control de la nube privada en el núcleo, complementada con la elasticidad ilimitada y alcance masivo de la nube pública en la interacción con usuarios.<br/>"
        "<b>Ejemplo Práctico en DoloresMágico App / Municipio de Dolores Hidalgo:</b><br/>"
        "• <i>Nube Privada On-Premise Municipal:</i> Custodia el padrón fiscal reservado de artesanos de Talavera, contratos notariales y cuentas bancarias de Tesorería bajo la LFPDPPP 2025.<br/>"
        "• <i>Nube Pública (Firebase / Google Cloud):</i> Aloja el catálogo de piezas artesanales, la app móvil en Flutter para turistas y el módulo de recepción masiva de fotos de baches y luminarias geolocalizadas.<br/>"
        "• <i>Interconexión Cifrada:</i> Cuando un reporte es aprobado en la nube pública, se comunica a la nube privada municipal mediante un túnel seguro VPN IPsec con TLS 1.3 para despachar a la cuadrilla de obras públicas sin exponer los servidores internos.",
        body_style
    ))

    # P15
    story.append(Paragraph("<b>Pregunta 15: Criterios específicos bajo los cuales una organización decide su modelo de nube</b>", h2_style))
    story.append(Paragraph(
        "1. <b>Sensibilidad del Dato:</b> Si son públicos, comerciales o datos personales sensibles regulados.<br/>"
        "2. <b>Marco Regulatorio Territorial:</b> Exigencias de leyes locales (LFPDPPP 2025 en México, RGPD en la UE).<br/>"
        "3. <b>Análisis de TCO a 3 y 5 años:</b> Comparar inversión inicial y mantenimiento contra gasto operativo variable.<br/>"
        "4. <b>Perfil de Demanda:</b> Tráfico lineal y constante (nube privada/colocación) vs tráfico elástico y volátil (nube pública).<br/>"
        "5. <b>Requisitos de Latencia y Red:</b> Procesos en tiempo real milimétrico (on-premise/edge) vs servicios móviles (nube pública).<br/>"
        "6. <b>Madurez y Capacidad del Equipo Interno:</b> Equipos ágiles y reducidos (como startups o equipos académicos) maximizan su productividad en modelos PaaS/SaaS en la nube pública al no requerir administradores de sistemas dedicados.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # SECCIÓN 5: Implementación Práctica en Código Móvil
    story.append(Paragraph("5. Implementación Práctica de Seguridad en DoloresMágico App", h1_style))
    story.append(Paragraph(
        "En consonancia con la presentación de <b>Seguridad Móvil (LFPDPPP 2025, OWASP Mobile Top 10 2024 y MASVS v2)</b>, el equipo implementó en el proyecto los siguientes módulos nativos:<br/>"
        "• <code>PrivacyAndConsentService.dart</code>: Gestión de consentimiento granular para GPS y Cámara, aviso de privacidad conforme a la LFPDPPP reformada el 20 de marzo de 2025 en el DOF, y ejercicio de Derechos ARCO.<br/>"
        "• <code>CryptoVaultService.dart</code>: Cifrado en reposo simétrico con AES-256 autenticado (NIST FIPS 197) y resguardo de tokens en hardware seguro (Android Keystore / iOS Keychain), mitigando OWASP M1 y M9.<br/>"
        "• <code>SecureNetworkService.dart</code>: Implementación de Certificate Pinning y protocolo estricto TLS 1.3 (RFC 8446), prohibiendo tráfico HTTP en texto plano (OWASP M5) vía <code>network_security_config.xml</code>.<br/>"
        "• <code>InputSanitizerService.dart</code>: Mitigación de inyecciones XSS y SQL/NoSQL (OWASP M4) y validación de Deep Links.<br/>"
        "• <code>FirebaseSingletonService.dart</code>: Centralización de servicios en la nube bajo el patrón Singleton para optimizar memoria y energía.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # SECCIÓN 6: Referencias APA 7
    story.append(Paragraph("6. Referencias Bibliográficas (Normas APA 7.ª Edición)", h1_style))
    refs = [
        "Android Developers. (s. f.). <i>Android Keystore system</i>. Google Developers. https://developer.android.com/privacy-and-security/keystore",
        "Apple Inc. (s. f.). <i>Apple platform security: Keychains and hardware security modules</i>. Apple Support. https://support.apple.com/guide/security/welcome/web",
        "Barker, E. (2020). <i>Recommendation for key management: Part 1 – General</i> (NIST Special Publication 800-57 Part 1 Rev. 5). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-57pt1r5",
        "Cámara de Diputados del H. Congreso de la Unión. (2025, 20 de marzo). <i>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</i>. Diario Oficial de la Federación.",
        "Carr, N. (2008). <i>The Big Switch: Rewiring the world, from Edison to Google</i>. W. W. Norton & Company.",
        "Cavoukian, A. (2011). <i>Privacy by design: The 7 foundational principles</i>. Information and Privacy Commissioner of Ontario.",
        "Mell, P., & Grance, T. (2011). <i>The NIST definition of cloud computing</i> (NIST Special Publication 800-145). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-145",
        "National Institute of Standards and Technology. (2001). <i>Advanced Encryption Standard (AES)</i> (FIPS PUB 197). https://doi.org/10.6028/NIST.FIPS.197",
        "Nir, Y., & Langley, A. (2018). <i>ChaCha20 and Poly1305 for IETF protocols</i> (RFC 8439). Internet Engineering Task Force. https://doi.org/10.17487/RFC8439",
        "Ogata, M., Franklin, J., Voas, J., Sritapan, V., & Quirolgico, S. (2019). <i>Vetting the security of mobile applications</i> (NIST Special Publication 800-163 Rev. 1). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-163r1",
        "OWASP Foundation. (2023). <i>OWASP Mobile Application Security Verification Standard (MASVS) v2</i>. https://mas.owasp.org/MASVS/",
        "OWASP Foundation. (2024). <i>OWASP Mobile Top 10 2024</i>. https://owasp.org/www-project-mobile-top-10/",
        "Parlamento Europeo y Consejo de la Unión Europea. (2016). <i>Reglamento (UE) 2016/679 relativo a la protección de las personas físicas (RGPD)</i>. Diario Oficial de la Unión Europea, L 119. https://eur-lex.europa.eu/eli/reg/2016/679/oj",
        "Rescorla, E. (2018). <i>The Transport Layer Security (TLS) protocol version 1.3</i> (RFC 8446). Internet Engineering Task Force. https://doi.org/10.17487/RFC8446",
        "Uptime Institute. (2022). <i>Tier standard: Topology - A reliable infrastructure benchmark</i>. Uptime Institute Professional Services."
    ]
    for r in refs:
        story.append(Paragraph(r, ParagraphStyle('RefStyle', fontName='Helvetica', fontSize=6.8, leading=9.2, textColor=DARK, leftIndent=15, firstLineIndent=-15, spaceAfter=2)))

    doc.build(story, canvasmaker=NumberedCanvas)


def build_docx(output_path):
    doc = Document()
    for s in doc.sections:
        s.top_margin = Inches(0.6)
        s.bottom_margin = Inches(0.6)
        s.left_margin = Inches(0.6)
        s.right_margin = Inches(0.6)

    title_p = doc.add_paragraph()
    r1 = title_p.add_run("UNIVERSIDAD TECNOLÓGICA DEL NORTE DE GUANAJUATO (UTNG)\n")
    r1.bold = True
    r1.font.size = Pt(13)
    r1.font.color.rgb = RGBColor(13, 35, 58)

    r2 = title_p.add_run("DOSSIER: INFRAESTRUCTURA DE CENTROS DE DATOS, MODELOS DE NUBE Y SEGURIDAD MÓVIL\n")
    r2.bold = True
    r2.font.size = Pt(12)
    r2.font.color.rgb = RGBColor(0, 121, 107)

    r3 = title_p.add_run(
        "Materia: Desarrollo Móvil Integral | Docente: Lic. José de Jesús Eduardo Barrientos Avalos\n"
        "Proyecto: DoloresMágico App (o DoloresConecta) — Flutter & Dart | Grupo: GIDS6101-E\n"
        "Integrantes: Valeria Guadalupe Calvillo Mendoza (1223100392) y María del Carmen Vargas Martínez (1220100084)\n"
        "Fecha: Octubre 2026 | Formato de Citas: APA 7.ª Edición"
    )
    r3.font.size = Pt(9)
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    doc.add_heading("1. Infraestructura y Evolución de los Centros de Datos", level=1)
    
    doc.add_heading("Pregunta 1: Definición de Centro de Datos y su Comprensión Previa a la Nube", level=2)
    doc.add_paragraph(
        "Un centro de datos (Data Center) es una instalación física especializada y de alta ingeniería concebida para concentrar, albergar, interconectar y garantizar la operación ininterrumpida de los equipos de tecnologías de la información (TI) y telecomunicaciones. Sus subsistemas esenciales abarcan bastidores o racks estandarizados (EIA-310 de 19 pulgadas y OCP de 21 pulgadas), matrices de almacenamiento de estado sólido (NVMe/SSD), conmutadores de red en topología Spine-Leaf, sistemas de energía ininterrumpida (UPS de doble conversión en topologías N+1 o 2N), motogeneradores diésel de emergencia, climatización de precisión (CRAC/CRAH con confinamiento de pasillos fríos/calientes y refrigeración líquida), extinción de incendios por aspiración y gases limpios (Novec 1230 o FM-200) y seguridad física biométrica perimetral.\n\n"
        "Fundamento indispensable previo a la nube: La nube no es una entidad abstracta ni inmaterial; físicamente, la nube es el centro de datos altamente industrializado de otra entidad al que se accede remotamente mediante internet. Comprender la base física del centro de datos es indispensable para entender los límites de latencia física, consumo energético, refrigeración y disponibilidad (Tier I a Tier IV del Uptime Institute), así como nociones clave como Regiones y Zonas de Disponibilidad (AZs)."
    )

    doc.add_heading("Pregunta 2: Evolución Histórica de los Centros de Datos (1940 a la Actualidad)", level=2)
    doc.add_paragraph(
        "• 1940 - 1950 (Inicios Electrónicos): Máquinas colosales como el ENIAC (1946) y UNIVAC I (1951), ocupando salas completas con tubos de vacío y ventilación ruidosa propensa a fallas térmicas.\n"
        "• 1960 - 1970 (Era de los Mainframes): IBM System/360 (1964) introduce la 'sala blanca' con piso técnico elevado (raised floor) para cableado grueso y aire frío presurizado, operando terminales tontas.\n"
        "• 1980 (Microcomputadoras y Servidores x86): Descentralización en arquitecturas cliente-servidor con proliferación caótica de racks en armarios departamentales (server closets).\n"
        "• 1990 (Internet y Centros de Colocación): Auge de las punto com, nacimiento de los centros de colocación (IDC), racks de 19 pulgadas y la norma ANSI/TIA-942.\n"
        "• 2000 (Revolución de la Virtualización): Hipervisores (VMware, Xen, KVM) elevaron la densidad térmica a más de 12 kW por rack, impulsando el confinamiento de pasillos fríos y calientes.\n"
        "• 2010 a la Actualidad (Hiperescala y Cero Carbono): Hyperscalers (Google Cloud, AWS, Azure) con cientos de miles de servidores, refrigeración líquida por inmersión bifásica, redes definidas por software (SDN), aceleradores de IA y eficiencias PUE cercanas a 1.08."
    )

    doc.add_heading("Pregunta 3: Comparativa entre Centro de Datos Local, Colocación y Nube", level=2)
    doc.add_paragraph(
        "• Centro de Datos Local (On-Premise): Máximo control físico y soberanía, pero requiere inversión intensiva en CAPEX (obra civil, UPS, generadores) y costoso mantenimiento interno con escalabilidad rígida de semanas o meses.\n"
        "• Centro de Datos de Colocación (Colocation): Modelo híbrido donde se rentan el espacio, la energía y la refrigeración de alta redundancia, pero los servidores propios se colocan en el rack bajo custodia compartida.\n"
        "• Centro de Datos en la Nube (Cloud): Modelo OPEX puro sin inversión inicial en hardware físico. Aprovisionamiento bajo demanda con elasticidad en segundos y alcance global, asumiendo el proveedor todo el mantenimiento físico."
    )

    doc.add_heading("2. Conceptos y Modelos de la Nube", level=1)
    doc.add_heading("Pregunta 4: Analogía de la Electricidad y Esquema de Pago por Uso", level=2)
    doc.add_paragraph(
        "Analogía de Nicholas Carr (The Big Switch): Al igual que las fábricas del siglo XIX dejaron de operar sus propios generadores de vapor para conectarse a la red eléctrica centralizada pagando por kWh, las organizaciones modernas dejan de comprar centros de datos para conectarse a la nube como un servicio público (utility computing).\n\n"
        "Definición NIST SP 800-145: Modelo que permite el acceso omnipresente, cómodo y bajo demanda a un catálogo compartido de recursos computacionales configurables con mínimo esfuerzo de gestión.\n\n"
        "Pago por Uso (Pay-As-You-Go): Medición precisa en segundos, IOPS o gigabytes consumidos. Si la app en Firebase realiza 5,000 lecturas y almacena 1 GB de fotos de baches, solo se factura ese consumo exacto. Durante la noche, el auto-apagado (Scale-to-Zero) reduce los costos a cero."
    )

    doc.add_heading("Pregunta 5: Cuatro Modelos de Implementación de la Nube", level=2)
    doc.add_paragraph(
        "• Nube Pública: Infraestructura multi-tenant accesible por internet. Criterio: Startups, aplicaciones de consumo masivo y servicios elásticos globales.\n"
        "• Nube Privada: Infraestructura single-tenant exclusiva para una organización. Criterio: Cumplimiento regulatorio estricto, secreto bancario y soberanía territorial.\n"
        "• Nube de Comunidad: Infraestructura compartida por entidades afines. Criterio: Sector salud, bancario o universitario para distribuir costos con gobernanza unificada.\n"
        "• Nube Híbrida: Combinación de nube privada y pública enlazadas de forma segura. Criterio: Modernización gradual manteniendo datos confidenciales en sede y apps móviles en la nube."
    )

    doc.add_heading("Pregunta 6: Diferenciación entre IaaS, PaaS y SaaS", level=2)
    doc.add_paragraph(
        "• IaaS: El proveedor gestiona hardware, red y virtualización; el cliente administra el sistema operativo, parches, middleware, runtime y aplicaciones (ej. AWS EC2, Azure VMs).\n"
        "• PaaS: El proveedor administra hardware, SO y runtime; el cliente solo administra el código de su app y los datos. Es el modelo de Google Firebase en DoloresMágico App.\n"
        "• SaaS: El proveedor gestiona el 100% de la pila técnica; el usuario final consume el software vía web o móvil (ej. Google Workspace, Microsoft 365)."
    )

    doc.add_heading("3. Beneficios, Seguridad y Mitigación de Riesgos", level=1)
    doc.add_heading("Pregunta 7: Elasticidad de la Nube y Optimización ante Picos de Demanda", level=2)
    doc.add_paragraph(
        "La elasticidad permite crecer y decrecer dinámicamente en tiempo real (Auto-scaling). Elimina el sobredimensionamiento (comprar hardware costoso para picos que pasa el 90% del tiempo inactivo) y el subdimensionamiento (colapso del sistema por saturación en eventos de alto tráfico). El sistema ajusta instancias en segundos según la carga real."
    )

    doc.add_heading("Pregunta 8: Ciberseguridad en la Nube y Estándares Internacionales", level=2)
    doc.add_paragraph(
        "Los proveedores de hiperescala invierten miles de millones de dólares anuales en seguridad con equipos dedicados 24/7 a mitigar vulnerabilidades día cero y ataques DDoS masivos. Cuentan con certificaciones internacionales ISO/IEC 27001, 27017, 27018, SOC 2 Tipo II, PCI-DSS Nivel 1 y enclaves de computación confidencial en hardware (AMD SEV/Intel SGX), con cifrado universal obligatorio en reposo (AES-256) y en tránsito (TLS 1.3)."
    )

    doc.add_heading("Pregunta 9: Riesgos Ambientales/Técnicos y Mitigación de Pérdida de Datos", level=2)
    doc.add_paragraph(
        "Se mitigan mediante Zonas de Disponibilidad (AZs): al menos 3 centros de datos separados físicamente por decenas de kilómetros con subestaciones eléctricas y enlaces de telecomunicaciones independientes, interconectados por fibra oscura con latencias <2 ms. La replicación multi-región garantiza un Recovery Point Objective (RPO) de cero segundos y failover automático en segundos (RTO)."
    )

    doc.add_heading("4. Sector Educativo y Clasificación Estratégica", level=1)
    doc.add_heading("Pregunta 10: Casos Educativos (UNAM / Universidad Andrés Bello)", level=2)
    doc.add_paragraph(
        "Plataformas LMS elásticas para cientos de miles de alumnos concurrentes; supercómputo bajo demanda (HPC) para investigación genómica y simulaciones científicas sin comprar supercomputadoras físicas; y evaluación masiva síncrona en exámenes de admisión con autoscaling ininterrumpido."
    )

    doc.add_heading("Pregunta 11: Realidad Física de la Nube y Factores de Clasificación", level=2)
    doc.add_paragraph(
        "Físicamente son edificios blindados con miles de servidores rackeados, unidades NVMe, switches ópticos y generadores industriales. Se clasifica por: 1) Propiedad del hardware; 2) Modelo de inquilinato (Multi vs Single-tenant); 3) Ubicación física (On-premise vs externo); y 4) Perímetro de conectividad (Internet público vs VPN dedicada)."
    )

    doc.add_heading("Pregunta 12: Beneficios Económicos y Operativos para Startups", level=2)
    doc.add_paragraph(
        "Económicos: Reducción de CAPEX a $0 USD; bajo costo de falla para experimentar rápido; y preservación del capital de inversión (runway). Operativos: Velocidad de salida al mercado (Time-to-Market en minutos); escalabilidad global instantánea; y acceso a tecnologías punteras de IA y bases de datos elásticas."
    )

    doc.add_heading("Pregunta 13: Inversión en Nube Privada en Banca y Hospitales", level=2)
    doc.add_paragraph(
        "Soberanía legal obligatoria impuesta por CNBV/Basilea; protección estricta de expedientes clínicos electrónicos bajo NOM-004-SSA3-2012, HIPAA y la LFPDPPP reformada el 20 de marzo de 2025 en el DOF; necesidad de peritaje y custodia forense física; y latencias deterministas en procesos de misión crítica."
    )

    doc.add_heading("Pregunta 14: La Nube Híbrida y Ejemplo Práctico en DoloresMágico App", level=2)
    doc.add_paragraph(
        "Combina el control y cumplimiento de la nube privada con la elasticidad y alcance masivo de la nube pública. En DoloresMágico App: la Nube Privada Municipal almacena el padrón fiscal reservado de artesanos y cuentas bancarias de Tesorería bajo la LFPDPPP 2025; la Nube Pública (Firebase/GCP) aloja el mapa interactivo y reportes ciudadanos; comunicándose de forma segura mediante túneles VPN IPsec con mTLS y TLS 1.3."
    )

    doc.add_heading("Pregunta 15: Criterios Específicos para Elección del Modelo de Nube", level=2)
    doc.add_paragraph(
        "1) Criticidad del dato (público vs sensible); 2) Marco legal aplicable (LFPDPPP 2025, RGPD); 3) Análisis de Costo Total de Propiedad (TCO a 3-5 años); 4) Perfil de demanda (constante vs elástico); 5) Requisitos de latencia; y 6) Madurez técnica del equipo interno."
    )

    doc.add_heading("5. Implementación de Seguridad Móvil en DoloresMágico App", level=1)
    doc.add_paragraph(
        "En cumplimiento con la presentación de Seguridad Móvil (LFPDPPP reformada DOF 2025, OWASP Mobile Top 10 2024 y MASVS v2):\n"
        "• PrivacyAndConsentService.dart: Consentimiento granular para GPS y Cámara, aviso de privacidad conforme a LFPDPPP 2025 y gestión de Derechos ARCO.\n"
        "• CryptoVaultService.dart: Cifrado en reposo simétrico con AES-256 (NIST FIPS 197) y resguardo de tokens en hardware seguro (Android Keystore / iOS Keychain), mitigando OWASP M1 y M9.\n"
        "• SecureNetworkService.dart: Certificate Pinning y protocolo obligatorio TLS 1.3 (RFC 8446) con prohibición estricta de tráfico HTTP en network_security_config.xml (OWASP M5).\n"
        "• InputSanitizerService.dart: Saneamiento y neutralización de ataques XSS y SQL/NoSQL (OWASP M4) y validación de Deep Links.\n"
        "• FirebaseSingletonService.dart: Orquestación bajo el patrón Singleton para optimizar recursos."
    )

    doc.add_heading("6. Referencias Bibliográficas (APA 7.ª Edición)", level=1)
    refs = [
        "Android Developers. (s. f.). Android Keystore system. Google Developers. https://developer.android.com/privacy-and-security/keystore",
        "Apple Inc. (s. f.). Apple platform security: Keychains and hardware security modules. Apple Support. https://support.apple.com/guide/security/welcome/web",
        "Barker, E. (2020). Recommendation for key management: Part 1 – General (NIST Special Publication 800-57 Part 1 Rev. 5). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-57pt1r5",
        "Cámara de Diputados del H. Congreso de la Unión. (2025, 20 de marzo). Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Diario Oficial de la Federación.",
        "Carr, N. (2008). The Big Switch: Rewiring the world, from Edison to Google. W. W. Norton & Company.",
        "Cavoukian, A. (2011). Privacy by design: The 7 foundational principles. Information and Privacy Commissioner of Ontario.",
        "Mell, P., & Grance, T. (2011). The NIST definition of cloud computing (NIST Special Publication 800-145). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-145",
        "National Institute of Standards and Technology. (2001). Advanced Encryption Standard (AES) (FIPS PUB 197). https://doi.org/10.6028/NIST.FIPS.197",
        "Nir, Y., & Langley, A. (2018). ChaCha20 and Poly1305 for IETF protocols (RFC 8439). Internet Engineering Task Force. https://doi.org/10.17487/RFC8439",
        "Ogata, M., Franklin, J., Voas, J., Sritapan, V., & Quirolgico, S. (2019). Vetting the security of mobile applications (NIST Special Publication 800-163 Rev. 1). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-163r1",
        "OWASP Foundation. (2023). OWASP Mobile Application Security Verification Standard (MASVS) v2. https://mas.owasp.org/MASVS/",
        "OWASP Foundation. (2024). OWASP Mobile Top 10 2024. https://owasp.org/www-project-mobile-top-10/",
        "Parlamento Europeo y Consejo de la Unión Europea. (2016). Reglamento (UE) 2016/679 relativo a la protección de las personas físicas (RGPD). Diario Oficial de la Unión Europea, L 119. https://eur-lex.europa.eu/eli/reg/2016/679/oj",
        "Rescorla, E. (2018). The Transport Layer Security (TLS) protocol version 1.3 (RFC 8446). Internet Engineering Task Force. https://doi.org/10.17487/RFC8446",
        "Uptime Institute. (2022). Tier standard: Topology - A reliable infrastructure benchmark. Uptime Institute Professional Services."
    ]
    for r in refs:
        p = doc.add_paragraph(r)
        p.paragraph_format.left_indent = Inches(0.25)
        p.paragraph_format.first_line_indent = Inches(-0.25)

    doc.save(output_path)


if __name__ == "__main__":
    base_repo = r"c:\Users\maria\Desktop\barrientos\app_Dolores_Magico"
    base_root = r"c:\Users\maria\Desktop\barrientos"

    pdf_paths = [
        os.path.join(base_repo, "Investigacion_Centros_de_Datos_y_Nube.pdf"),
        os.path.join(base_root, "Investigacion_Centros_de_Datos_y_Nube.pdf"),
    ]
    for p in pdf_paths:
        try:
            build_pdf(p)
            print("PDF generado:", p)
        except PermissionError:
            alt_p = p.replace(".pdf", "_v2.pdf")
            build_pdf(alt_p)
            print("PDF generado en alternativa:", alt_p)

    docx_paths = [
        os.path.join(base_repo, "Investigacion_Centros_de_Datos_y_Nube.docx"),
        os.path.join(base_root, "Investigacion_Centros_de_Datos_y_Nube.docx"),
    ]
    for dp in docx_paths:
        try:
            build_docx(dp)
            print("DOCX generado:", dp)
        except PermissionError:
            alt_dp = dp.replace(".docx", "_v2.docx")
            build_docx(alt_dp)
            print("DOCX generado en alternativa:", alt_dp)
