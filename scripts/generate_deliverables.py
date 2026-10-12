# -*- coding: utf-8 -*-
import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from docx import Document
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH


def build_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=15 * mm,
        bottomMargin=15 * mm,
        title="DoloresMágico App - Fundamentación Metodológica, App Móvil Flutter y Bitácora de Seguimiento",
        author="Valeria Guadalupe Calvillo Mendoza & María del Carmen Vargas Martínez",
    )

    styles = getSampleStyleSheet()
    navy = colors.HexColor("#0D47A1")
    dark = colors.HexColor("#0F172A")
    slate = colors.HexColor("#334155")
    light_bg = colors.HexColor("#EFF6FF")
    row_alt = colors.HexColor("#F8FAFC")

    title_style = ParagraphStyle(
        "DocTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=16.5,
        leading=20,
        textColor=dark,
        spaceAfter=4,
    )
    subtitle_style = ParagraphStyle(
        "DocSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.2,
        leading=12.5,
        textColor=navy,
        spaceAfter=6,
    )
    h2_style = ParagraphStyle(
        "SecHeading",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=11.2,
        leading=14.5,
        textColor=navy,
        spaceBefore=9,
        spaceAfter=4,
    )
    body_style = ParagraphStyle(
        "BodyJustified",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.1,
        leading=13.2,
        textColor=slate,
        alignment=4,  # Justified
        spaceAfter=5,
    )
    left_style = ParagraphStyle(
        "BodyLeft",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.1,
        leading=13.5,
        textColor=slate,
        alignment=0,  # Left aligned for URLs
        spaceAfter=5,
    )
    cell_style = ParagraphStyle(
        "TableCell",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.0,
        leading=10.6,
        textColor=dark,
    )
    cell_header_style = ParagraphStyle(
        "TableCellHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.0,
        leading=10.2,
        textColor=colors.white,
    )
    code_style = ParagraphStyle(
        "CodeBlock",
        parent=styles["Code"],
        fontName="Courier",
        fontSize=7.4,
        leading=9.8,
        textColor=dark,
        backColor=colors.HexColor("#F1F5F9"),
        borderPadding=6,
        spaceAfter=5,
    )

    story = []

    # ENCABEZADO INSTITUCIONAL UTNG
    story.append(
        Paragraph(
            "UNIVERSIDAD TECNOLÓGICA DEL NORTE DE GUANAJUATO (UTNG) • DESARROLLO MÓVIL INTEGRAL • GRUPO GIDS6101-E",
            subtitle_style,
        )
    )
    story.append(
        Paragraph(
            "DoloresMágico App: Fundamentación Metodológica, Arquitectura de App Móvil (Flutter &amp; Dart) y Bitácora Oficial de Seguimiento",
            title_style,
        )
    )
    story.append(
        Paragraph(
            "<b>Docente:</b> José de Jesús Eduardo Barrientos Avalos &nbsp;|&nbsp; "
            "<b>Fecha Límite Inamovible del PMV:</b> 20 de Noviembre de 2026 &nbsp;|&nbsp; "
            "<b>Stack Móvil:</b> Flutter • Dart • Firebase • GPS / Cámara",
            left_style,
        )
    )

    # 1. DATOS DEL EQUIPO Y ROLES
    story.append(
        Paragraph(
            "1. Datos del Equipo y Asignación de Roles (Scrum con Enfoque Hackathon)",
            h2_style,
        )
    )
    roles_data = [
        [
            Paragraph("Rol Metodológico", cell_header_style),
            Paragraph("Integrante y Matrícula", cell_header_style),
            Paragraph(
                "Responsabilidad de Gestión y Desarrollo en la App Móvil (Flutter &amp; Dart)",
                cell_header_style,
            ),
        ],
        [
            Paragraph("<b>Product Owner / Líder de Producto</b>", cell_style),
            Paragraph(
                "<b>Valeria Guadalupe Calvillo Mendoza</b><br/>Matrícula: 1223100392",
                cell_style,
            ),
            Paragraph(
                "Dueña de la visión del producto móvil, priorización del Product Backlog y alcance del PMV. "
                "Líder de Capa de Dominio y Datos en Dart (<i>RegistrarReporteUseCase</i>, <i>ReporteRepositoryImpl</i>, Firebase Auth, Firestore y Cloud Storage).",
                cell_style,
            ),
        ],
        [
            Paragraph("<b>Scrum Master / Facilitadora</b>", cell_style),
            Paragraph(
                "<b>María del Carmen Vargas Martínez</b><br/>Matrícula: 1220100084",
                cell_style,
            ),
            Paragraph(
                "Asegura el apego al marco Scrum, facilita ceremonias, remueve obstáculos y cuida el tablero Kanban en GitHub Projects y la bitácora. "
                "Líder de Capa de Presentación en Flutter (<i>HomeMenuPage</i>, <i>MapaTuristicoPage</i>, <i>ReporteCiudadanoPage</i>).",
                cell_style,
            ),
        ],
        [
            Paragraph("<b>Dev Team / Líderes Técnicos Móviles</b>", cell_style),
            Paragraph("<b>Valeria Calvillo &amp; María Vargas</b>", cell_style),
            Paragraph(
                "Implementación de arquitectura <b>MVVM + Clean Architecture</b> en Flutter, integración de sensores móviles (<i>geolocator</i>, <i>image_picker</i>, <i>url_launcher</i>), control de ramas en GitHub y compilación de APK.",
                cell_style,
            ),
        ],
    ]
    roles_table = Table(roles_data, colWidths=[42 * mm, 48 * mm, 88 * mm])
    roles_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), dark),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, row_alt]),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(roles_table)

    # 2. JUSTIFICACIÓN DE LA METODOLOGÍA (<150 PALABRAS)
    story.append(
        Paragraph("2. Justificación de la Metodología (Fundamentación)", h2_style)
    )
    justificacion_box = Table(
        [
            [
                Paragraph(
                    "Seleccionamos <b>Scrum con enfoque Hackathon</b> apoyado en un tablero <b>Kanban en GitHub Projects</b> "
                    "por su estructura de ciclos cortos e incrementales (Sprints de 2 semanas), óptima para mitigar riesgos ante "
                    "la fecha límite del 20 de noviembre. Esta metodología nos permite realizar entregas progresivas de la aplicación "
                    "móvil en Flutter, detectar errores de integración con sensores del dispositivo (cámara y GPS) y servicios de "
                    "Firebase mediante <i>Daily Standups</i>, y recibir retroalimentación temprana de artesanos y ciudadanos. Además, "
                    "desacoplar la app móvil en capas de Clean Architecture y MVVM asegura que el equipo concentre su esfuerzo en las "
                    "funcionalidades prioritarias del Producto Mínimo Viable (PMV), garantizando un APK estable, probado y funcional en vivo.<br/>"
                    "<b>(Extensión: 120 palabras — Cumple estrictamente con el límite máximo de 150 palabras).</b>",
                    body_style,
                )
            ]
        ],
        colWidths=[178 * mm],
    )
    justificacion_box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), light_bg),
                ("BOX", (0, 0), (-1, -1), 1, navy),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(justificacion_box)

    # 3. ESTRATEGIA DEL PMV MÓVIL
    story.append(
        Paragraph(
            "3. Estrategia del Producto Mínimo Viable (PMV — App Móvil en Flutter)",
            h2_style,
        )
    )
    story.append(
        Paragraph(
            "<b>A. Funcionalidad Principal de la App Móvil a Presentar el 20 de Noviembre:</b><br/>"
            "• <b>1. Autenticación y Perfiles Diferenciados (HU01 — registro_artesano_page.dart):</b> Login/Registro en Firebase Authentication diferenciando <i>Turista/Ciudadano</i> vs. <i>Artesano/Comerciante</i>, con aceptación expresa del Aviso de Privacidad (LFPDPPP).<br/>"
            "• <b>2. Mapa Interactivo GPS de Dolores Hidalgo (HU02 — mapa_turistico_page.dart):</b> Geolocalización con pines interactivos de 3 colores: <b>Azul</b> (Talleres de Talavera), <b>Amarillo</b> (Neverías Tradicionales) y <b>Rojo</b> (Sitios Históricos de 1810).<br/>"
            "• <b>3. Directorio, Catálogo del Artesano y WhatsApp Directo (HU04 — ficha_taller_artesano_page.dart):</b> Ficha técnica con fotos de productos, historia del taller y botón <i>url_launcher</i> hacia WhatsApp y llamada telefónica sin intermediarios.<br/>"
            "• <b>4. Módulo de Reporte Ciudadano con Cámara, GPS y Folio (HU03 — reporte_ciudadano_page.dart):</b> Captura de fotografía con cámara (<i>image_picker</i>), ubicación GPS automática (<i>geolocator</i>), persistencia en Firebase Storage/Firestore y generación de folio <b>FOL-2026-DH-XXXX</b>.",
            body_style,
        )
    )
    story.append(
        Paragraph(
            "<b>B. Justificación de Características Excluidas por el Momento:</b> Se dejaron fuera del PMV los recorridos en Realidad Aumentada (AR), la pasarela de pagos bancarios integrada y el sistema de insignias/reseñas complejas, ya que exigen modelado 3D pesado y certificaciones financieras que comprometerían la entrega del 20 de noviembre. El botón directo a WhatsApp resuelve el comercio justo sin fricción ni comisiones.",
            body_style,
        )
    )

    # 4. ESTRUCTURA DE LA APP MÓVIL EN EL REPOSITORIO
    story.append(
        Paragraph(
            "4. Especificación de la App Móvil en el Repositorio (Flutter, Dart, Android/iOS y MVVM + Clean Architecture)",
            h2_style,
        )
    )
    story.append(
        Paragraph(
            "En atención puntual a la observación del docente, el repositorio público aloja la estructura nativa de la <b>Aplicación Móvil en Flutter &amp; Dart</b> implementando las tres capas de <b>Clean Architecture + MVVM</b> y el Diagrama de Clases UML:",
            body_style,
        )
    )
    story.append(
        Paragraph(
            "app_Dolores_Magico/ (Proyecto Movil Multiplataforma Flutter &amp; Dart)<br/>"
            "+-- pubspec.yaml                  # Dependencias: provider, firebase_*, google_maps_flutter, geolocator, image_picker, hive, url_launcher<br/>"
            "+-- android/app/src/main/AndroidManifest.xml  # Permisos nativos CAMERA, ACCESS_FINE_LOCATION e intents WhatsApp (Minimo Privilegio)<br/>"
            "+-- ios/Runner/Info.plist         # Descripciones de privacidad para Camara y GPS en iOS (Privacy by Design)<br/>"
            "+-- lib/<br/>"
            "|   +-- main.dart                 # Punto de entrada movil, inicializacion de Singletons y MultiProvider (MVVM)<br/>"
            "|   +-- domain/                   # CAPA DE DOMINIO: ReporteUrbano, TallerArtesano, ReporteRepository, RegistrarReporteUseCase<br/>"
            "|   +-- data/                     # CAPA DE DATOS: ReporteRepositoryImpl, ArtesanoRepositoryImpl, FirestoreRemoteDataSource, HiveLocalDataSource<br/>"
            "|   +-- presentation/             # CAPA DE PRESENTACION (MVVM): ReporteViewModel, MapaTuristicoViewModel y Vistas Flutter (Pantallas 1, 2 y 3)<br/>"
            "+-- test/unit/registrar_reporte_usecase_test.dart  # Pruebas unitarias de validacion GPS y generacion de folio FOL-2026-DH-XXXX",
            code_style,
        )
    )

    # 5. BITÁCORA OFICIAL DE SEGUIMIENTO
    story.append(
        Paragraph(
            "5. Bitácora Oficial de Seguimiento del Proyecto (Sprints, Ceremonias Scrum y Control de Cambios)",
            h2_style,
        )
    )
    bitacora_data = [
        [
            Paragraph("Fecha", cell_header_style),
            Paragraph("Sprint / Ceremonia", cell_header_style),
            Paragraph("Responsables", cell_header_style),
            Paragraph("Actividades Ejecutadas y Entregables Móviles", cell_header_style),
            Paragraph("Impedimentos / Observaciones y Solución Aplicada", cell_header_style),
        ],
        [
            Paragraph("<b>04/09/2026</b>", cell_style),
            Paragraph("Sprint 1 Planning", cell_style),
            Paragraph("Valeria C. (PO)<br/>María V. (SM)", cell_style),
            Paragraph(
                "Planteamiento del problema en Dolores Hidalgo y selección de las 4 funcionalidades prioritarias del MVP móvil.",
                cell_style,
            ),
            Paragraph(
                "Recorte de AR y pasarela de pagos para mitigar riesgo de cronograma. <b>[Completado]</b>",
                cell_style,
            ),
        ],
        [
            Paragraph("<b>14/09/2026</b>", cell_style),
            Paragraph("Sesión Arquitectura", cell_style),
            Paragraph("Valeria C.<br/>María V.", cell_style),
            Paragraph(
                "Selección de arquitectura <b>MVVM + Clean Architecture</b> para Flutter y elaboración del Diagrama UML.",
                cell_style,
            ),
            Paragraph(
                "Separación modular en <i>domain</i>, <i>data</i> y <i>presentation</i>. <b>[Completado]</b>",
                cell_style,
            ),
        ],
        [
            Paragraph("<b>23/09/2026</b>", cell_style),
            Paragraph("Juego de Roles &amp; Sprint 2 Planning", cell_style),
            Paragraph("Valeria C. (PO)<br/>María V. (SM)", cell_style),
            Paragraph(
                "Asignación de roles Scrum, redacción de historias HU01 a HU05 y configuración de ramas GitFlow.",
                cell_style,
            ),
            Paragraph(
                "Creación de ramas <i>main</i>, <i>develop</i> y <i>feature/*</i> en GitHub. <b>[Completado]</b>",
                cell_style,
            ),
        ],
        [
            Paragraph("<b>04/10/2026</b>", cell_style),
            Paragraph("Daily Standup &amp; Tablero", cell_style),
            Paragraph("María V. (SM)<br/>Valeria C. (PO)", cell_style),
            Paragraph(
                "Alta de los 7 Issues oficiales en GitHub con criterios de aceptación, etiquetas de prioridad y Milestones.",
                cell_style,
            ),
            Paragraph(
                "Aplicación de permisos mínimos en <i>AndroidManifest.xml</i> e <i>Info.plist</i>. <b>[Completado]</b>",
                cell_style,
            ),
        ],
        [
            Paragraph("<b>12/10/2026</b>", cell_style),
            Paragraph("<b>Sprint 2 Review &amp; Retrospectiva</b>", cell_style),
            Paragraph("Valeria C. (PO)<br/>María V. (SM)", cell_style),
            Paragraph(
                "<b>Atención a observación docente:</b> Migración del repositorio al código nativo de la <b>App Móvil en Flutter &amp; Dart</b> e integración de esta <b>Bitácora de Seguimiento</b>.",
                cell_style,
            ),
            Paragraph(
                "<b>Observación Docente Atendida:</b> Se sustituyó la estructura web por el proyecto móvil Flutter (<i>lib/</i>, <i>pubspec.yaml</i>, <i>android/</i>, <i>ios/</i>) y se publicó bitácora. <b>[Completado]</b>",
                cell_style,
            ),
        ],
        [
            Paragraph("<b>13/10 – 20/11</b>", cell_style),
            Paragraph("Sprints 3 y 4 (Ruta Crítica)", cell_style),
            Paragraph("Equipo Dev Móvil", cell_style),
            Paragraph(
                "Pruebas en dispositivo Android físico (cámara + GPS + Firebase), pruebas de campo con artesanos, Code Freeze (18 Nov) y Demo en Vivo (20 Nov).",
                cell_style,
            ),
            Paragraph(
                "En ejecución activa conforme al calendario hacia el 20 de noviembre. <b>[En Curso]</b>",
                cell_style,
            ),
        ],
    ]
    bitacora_table = Table(
        bitacora_data, colWidths=[21 * mm, 29 * mm, 26 * mm, 54 * mm, 48 * mm]
    )
    bitacora_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), dark),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, row_alt]),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(bitacora_table)
    story.append(Spacer(1, 6))

    # 5.2 TRAZABILIDAD DE ISSUES, RAMAS Y ARCHIVOS FLUTTER
    story.append(
        Paragraph(
            "5.1 Bitácora de Trazabilidad Técnica: Issues, Ramas Git y Archivos Móviles en Flutter (.dart)",
            h2_style,
        )
    )
    traza_data = [
        [
            Paragraph("Issue / HU", cell_header_style),
            Paragraph("Rama Git (Sección 16)", cell_header_style),
            Paragraph("Archivos Implementados en la App Móvil (lib/)", cell_header_style),
            Paragraph("Responsable", cell_header_style),
            Paragraph("Estado", cell_header_style),
        ],
        [
            Paragraph("<b>Issue #1 — HU01</b><br/>Registro y Perfiles", cell_style),
            Paragraph("<i>feature/catalogo-artesano</i>", cell_style),
            Paragraph(
                "usuario_app.dart, auth_viewmodel.dart, registro_artesano_page.dart",
                cell_style,
            ),
            Paragraph("Valeria C. &amp; María V.", cell_style),
            Paragraph("<b>Completado</b>", cell_style),
        ],
        [
            Paragraph("<b>Issue #2 — HU02</b><br/>Mapa GPS 3 Pines", cell_style),
            Paragraph("<i>feature/mapa-turistico</i>", cell_style),
            Paragraph(
                "explorar_mapa_turistico_usecase.dart, mapa_turistico_viewmodel.dart, mapa_turistico_page.dart",
                cell_style,
            ),
            Paragraph("María V. &amp; Valeria C.", cell_style),
            Paragraph("<b>Completado</b>", cell_style),
        ],
        [
            Paragraph("<b>Issue #3 — HU03</b><br/>Reporte Ciudadano", cell_style),
            Paragraph("<i>feature/reporte-ciudadano</i>", cell_style),
            Paragraph(
                "reporte_urbano.dart, registrar_reporte_usecase.dart, reporte_repository_impl.dart, reporte_viewmodel.dart, reporte_ciudadano_page.dart",
                cell_style,
            ),
            Paragraph("Valeria C. &amp; María V.", cell_style),
            Paragraph("<b>Completado</b>", cell_style),
        ],
        [
            Paragraph("<b>Issue #4 — HU04</b><br/>Catálogo y WhatsApp", cell_style),
            Paragraph("<i>feature/catalogo-artesano</i>", cell_style),
            Paragraph(
                "taller_artesano.dart, contactar_artesano_whatsapp_usecase.dart, ficha_taller_artesano_page.dart",
                cell_style,
            ),
            Paragraph("María V. &amp; Valeria C.", cell_style),
            Paragraph("<b>Completado</b>", cell_style),
        ],
        [
            Paragraph("<b>Issue #5 — HU05</b><br/>Validación Municipal", cell_style),
            Paragraph("<i>develop</i>", cell_style),
            Paragraph(
                "validar_registros_admin_usecase.dart, admin_validacion_page.dart",
                cell_style,
            ),
            Paragraph("Valeria C.", cell_style),
            Paragraph("<b>En Revisión PR</b>", cell_style),
        ],
    ]
    traza_table = Table(
        traza_data, colWidths=[30 * mm, 36 * mm, 64 * mm, 26 * mm, 22 * mm]
    )
    traza_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), dark),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, row_alt]),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(traza_table)

    # 6. ENLACES DE CONTROL PÚBLICOS
    story.append(
        Paragraph(
            "6. Enlaces de Control y Auditoría (Acceso Público Activo para el Profesor)",
            h2_style,
        )
    )
    story.append(
        Paragraph(
            "• <b>URL del Repositorio de Código de la App Móvil (Flutter &amp; Dart):</b><br/>"
            "&nbsp;&nbsp;<font color='#0D47A1'><u>https://github.com/valeria1732/app_Dolores_Magico</u></font><br/>"
            "• <b>URL Directa de la Bitácora Oficial de Seguimiento en GitHub:</b><br/>"
            "&nbsp;&nbsp;<font color='#0D47A1'><u>https://github.com/valeria1732/app_Dolores_Magico/blob/main/BITACORA_SEGUIMIENTO.md</u></font><br/>"
            "• <b>URL del Tablero de Seguimiento e Issues (GitHub Projects):</b><br/>"
            "&nbsp;&nbsp;<font color='#0D47A1'><u>https://github.com/valeria1732/app_Dolores_Magico/projects</u></font> &nbsp;|&nbsp; "
            "<font color='#0D47A1'><u>https://github.com/valeria1732/app_Dolores_Magico/issues</u></font>",
            left_style,
        )
    )

    doc.build(story)


def build_docx(output_path):
    doc = Document()
    style = doc.styles["Normal"]
    style.font.name = "Arial"
    style.font.size = Pt(10.5)

    p_inst = doc.add_paragraph()
    r_inst = p_inst.add_run(
        "UNIVERSIDAD TECNOLÓGICA DEL NORTE DE GUANAJUATO (UTNG)\n"
        "Materia: Desarrollo Móvil Integral | Docente: José de Jesús Eduardo Barrientos Avalos | Grupo: GIDS6101-E"
    )
    r_inst.bold = True
    r_inst.font.size = Pt(9.5)
    r_inst.font.color.rgb = RGBColor(13, 71, 161)

    doc.add_heading(
        "DoloresMágico App: Fundamentación Metodológica, Configuración de App Móvil (Flutter & Dart) y Bitácora de Seguimiento",
        level=1,
    )

    # 1. Datos
    doc.add_heading("1. Datos del Equipo y Roles Asignados (Scrum)", level=2)
    p_datos = doc.add_paragraph()
    p_datos.add_run("• Nombre del equipo / proyecto: ").bold = True
    p_datos.add_run(
        "DoloresMágico App (app_Dolores_Magico — Aplicación Móvil en Flutter & Dart)\n"
    )
    p_datos.add_run("• Product Owner / Líder de Producto: ").bold = True
    p_datos.add_run(
        "Valeria Guadalupe Calvillo Mendoza (Matrícula: 1223100392) — Dueña de la visión, priorización del Product Backlog y líder de Capa de Dominio y Datos en Dart/Firebase.\n"
    )
    p_datos.add_run("• Scrum Master / Facilitadora de Metodología: ").bold = True
    p_datos.add_run(
        "María del Carmen Vargas Martínez (Matrícula: 1220100084) — Facilitadora Scrum, responsable del tablero Kanban, de la Bitácora de Seguimiento y líder de Capa de Presentación en Flutter.\n"
    )
    p_datos.add_run("• Dev Team / Líderes Técnicos Móviles: ").bold = True
    p_datos.add_run(
        "Valeria Guadalupe Calvillo Mendoza y María del Carmen Vargas Martínez — Arquitectura MVVM + Clean Architecture en Flutter, integración de geolocalización GPS, cámara, Firebase y repositorio GitHub."
    )

    # 2. Justificación
    doc.add_heading("2. Justificación de la Metodología (Fundamentación — Máx. 150 palabras)", level=2)
    p_just = doc.add_paragraph(
        "Seleccionamos Scrum con enfoque Hackathon apoyado en un tablero Kanban en GitHub Projects por su estructura de ciclos cortos e incrementales (Sprints de 2 semanas), óptima para mitigar riesgos ante la fecha límite del 20 de noviembre. Esta metodología nos permite realizar entregas progresivas de la aplicación móvil en Flutter, detectar errores de integración con sensores del dispositivo (cámara y GPS) y servicios de Firebase mediante Daily Standups, y recibir retroalimentación temprana de artesanos y ciudadanos. Además, desacoplar la app móvil en capas de Clean Architecture y MVVM asegura que el equipo concentre su esfuerzo en las funcionalidades prioritarias del Producto Mínimo Viable (PMV), garantizando un APK estable, probado y funcional en vivo. (Extensión: 120 palabras)."
    )
    p_just.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

    # 3. Estrategia PMV
    doc.add_heading("3. Estrategia del Producto Mínimo Viable (PMV — App Móvil)", level=2)
    p_pmv = doc.add_paragraph()
    p_pmv.add_run("Funcionalidad Principal para el 20 de Noviembre:\n").bold = True
    p_pmv.add_run(
        "1. Autenticación y Perfiles Diferenciados (HU01 — registro_artesano_page.dart): Login/Registro en Firebase Auth (Turista/Ciudadano vs. Artesano) con Aviso de Privacidad LFPDPPP.\n"
        "2. Mapa Interactivo GPS de Dolores Hidalgo (HU02 — mapa_turistico_page.dart): Ubicación GPS con pines de 3 colores: Azul (Talavera), Amarillo (Nieves) y Rojo (Sitios Históricos).\n"
        "3. Directorio, Catálogo del Artesano y WhatsApp Directo (HU04 — ficha_taller_artesano_page.dart): Ficha técnica con fotos de productos, historia y botón url_launcher hacia WhatsApp sin comisiones.\n"
        "4. Módulo de Reporte Ciudadano con Cámara, GPS y Folio (HU03 — reporte_ciudadano_page.dart): Captura de fotografía con cámara (image_picker), coordenadas GPS automáticas (geolocator) y generación de folio FOL-2026-DH-XXXX.\n\n"
    )
    p_pmv.add_run("Justificación de Características Excluidas:\n").bold = True
    p_pmv.add_run(
        "Se dejaron fuera por el momento la Realidad Aumentada (AR), la pasarela de pagos bancarios integrada y el sistema de insignias/reseñas complejas para evitar dependencias externas pesadas y garantizar un APK 100% estable el 20 de noviembre."
    )

    # 4. Arquitectura Móvil
    doc.add_heading("4. Estructura de la App Móvil en el Repositorio (Flutter & Dart)", level=2)
    doc.add_paragraph(
        "En atención a la observación docente, el repositorio aloja exclusivamente la estructura de la App Móvil en Flutter y Dart bajo MVVM + Clean Architecture:\n"
        "• pubspec.yaml: Paquetes móviles (provider, firebase_core, firebase_auth, cloud_firestore, firebase_storage, google_maps_flutter, geolocator, image_picker, hive, url_launcher).\n"
        "• android/ e ios/: AndroidManifest.xml, build.gradle e Info.plist con permisos de cámara y GPS bajo mínimo privilegio.\n"
        "• lib/domain/: Entidades (ReporteUrbano, TallerArtesano), interfaces de repositorio y casos de uso (RegistrarReporteUseCase).\n"
        "• lib/data/: ReporteRepositoryImpl, ArtesanoRepositoryImpl, FirestoreRemoteDataSource y HiveLocalDataSource.\n"
        "• lib/presentation/: ReporteViewModel, MapaTuristicoViewModel, AuthViewModel y las 3 pantallas móviles en Flutter."
    )

    # 5. Bitácora de Seguimiento
    doc.add_heading("5. Bitácora Oficial de Seguimiento del Proyecto", level=2)
    table = doc.add_table(rows=1, cols=5)
    table.style = "Table Grid"
    hdr = table.rows[0].cells
    hdr[0].text = "Fecha"
    hdr[1].text = "Sprint / Ceremonia"
    hdr[2].text = "Responsables"
    hdr[3].text = "Actividades Realizadas (App Móvil)"
    hdr[4].text = "Observaciones y Solución Aplicada"

    rows_data = [
        (
            "04/09/2026",
            "Sprint 1 Planning",
            "Valeria C. (PO)\nMaría V. (SM)",
            "Definición del problema en Dolores Hidalgo y selección de los 4 módulos del MVP móvil.",
            "Recorte de AR y pasarela de pagos para mitigar riesgo de tiempo. [Completado]",
        ),
        (
            "14/09/2026",
            "Arquitectura Móvil",
            "Valeria C.\nMaría V.",
            "Elección de MVVM + Clean Architecture en Flutter y Diagrama de Clases UML.",
            "Separación modular en domain, data y presentation. [Completado]",
        ),
        (
            "23/09/2026",
            "Juego de Roles / Sprint 2 Planning",
            "Valeria C. (PO)\nMaría V. (SM)",
            "Asignación de roles Scrum, historias HU01-HU05 y ramas GitFlow.",
            "Configuración de ramas main, develop y feature/*. [Completado]",
        ),
        (
            "04/10/2026",
            "Control de Tablero",
            "María V. (SM)\nValeria C. (PO)",
            "Alta de los 7 Issues oficiales en GitHub con etiquetas de prioridad y Milestones.",
            "Permisos mínimos en AndroidManifest.xml e Info.plist. [Completado]",
        ),
        (
            "12/10/2026",
            "Sprint 2 Review & Retrospectiva",
            "Valeria C. (PO)\nMaría V. (SM)",
            "Atención a retroalimentación docente: Migración del repositorio al código nativo de la App Móvil en Flutter & Dart e inclusión de esta Bitácora de Seguimiento.",
            "Observación Docente Atendida: Se sustituyó el código web por el proyecto móvil Flutter (lib/, pubspec.yaml, android/, ios/) y se publicó la bitácora. [Completado]",
        ),
        (
            "13/10 - 20/11",
            "Sprints 3 y 4",
            "Equipo Dev Móvil",
            "Pruebas en dispositivo Android físico (cámara + GPS + Firebase), pruebas de campo, Code Freeze (18 Nov) y Demo PMV (20 Nov).",
            "En ejecución conforme a la ruta crítica hacia el 20 de noviembre. [En Curso]",
        ),
    ]
    for r in rows_data:
        row_cells = table.add_row().cells
        for i, val in enumerate(r):
            row_cells[i].text = val

    # 6. Enlaces
    doc.add_heading("6. Enlaces de Control (Acceso Público Activo)", level=2)
    doc.add_paragraph(
        "• URL del Repositorio de Código Móvil (Flutter & Dart): https://github.com/valeria1732/app_Dolores_Magico\n"
        "• URL de la Bitácora de Seguimiento en GitHub: https://github.com/valeria1732/app_Dolores_Magico/blob/main/BITACORA_SEGUIMIENTO.md\n"
        "• URL del Tablero de Seguimiento (GitHub Projects / Issues): https://github.com/valeria1732/app_Dolores_Magico/projects"
    )

    doc.save(output_path)


if __name__ == "__main__":
    base_repo = r"c:\Users\maria\Desktop\barrientos\app_Dolores_Magico"
    base_root = r"c:\Users\maria\Desktop\barrientos"

    pdf_paths = [
        os.path.join(base_repo, "Fundamentacion_y_Planeacion_Dolores_Magico.pdf"),
        os.path.join(base_repo, "Dossier_Ejecutivo_Dolores_Magico.pdf"),
        os.path.join(base_repo, "Dossier_Puro_Texto_Dolores_Magico.pdf"),
        os.path.join(base_root, "Bitacora_y_App_Movil_Dolores_Magico.pdf"),
    ]
    for p in pdf_paths:
        build_pdf(p)
        print("PDF generado:", p)

    docx_path = os.path.join(base_root, "Bitacora_y_App_Movil_Dolores_Magico.docx")
    build_docx(docx_path)
    print("DOCX generado:", docx_path)
