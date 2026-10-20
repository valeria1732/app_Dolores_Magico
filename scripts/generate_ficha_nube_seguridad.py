# -*- coding: utf-8 -*-
"""
Generador de la Ficha de Diseño (Nube y Seguridad) - DoloresMágico App
Genera un documento profesional de una sola página en PDF y Word (.docx).
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

PRIMARY = colors.HexColor("#0D233A")    # Azul Marino UTNG / Talavera
ACCENT = colors.HexColor("#00796B")     # Verde Teal / Seguridad
DARK = colors.HexColor("#1A202C")       # Texto oscuro
BG_LIGHT = colors.HexColor("#F7FAFC")   # Fondo gris suave
BORDER = colors.HexColor("#CBD5E1")     # Borde sutil
GREEN_OK = colors.HexColor("#166534")   # Verde confirmación

def build_pdf(output_path):
    # Márgenes compactos de 0.4 pulgadas (28.8 pt) para que quepa exactamente en 1 sola página
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=28.8,
        rightMargin=28.8,
        topMargin=26.0,
        bottomMargin=24.0
    )

    styles = getSampleStyleSheet()

    # Estilos compactos de alta densidad tipográfica
    title_style = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        textColor=PRIMARY,
        alignment=1
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=DARK,
        alignment=1
    )
    section_heading = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10.5,
        textColor=PRIMARY
    )
    body_bold = ParagraphStyle(
        'BodyBold',
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=8.5,
        textColor=DARK
    )
    body_text = ParagraphStyle(
        'BodyTextCustom',
        fontName='Helvetica',
        fontSize=6.8,
        leading=8.3,
        textColor=DARK
    )
    code_text = ParagraphStyle(
        'CodeText',
        fontName='Courier',
        fontSize=6.2,
        leading=7.5,
        textColor=DARK
    )

    story = []

    # Encabezado institucional
    header_data = [
        [
            Paragraph("<b>UNIVERSIDAD TECNOLÓGICA DEL NORTE DE GUANAJUATO (UTNG)</b><br/>"
                      "<b>Desarrollo Móvil Integral | Docente:</b> Lic. José de Jesús Eduardo Barrientos Avalos<br/>"
                      "<b>Proyecto:</b> DoloresMágico App (o DoloresConecta) — Flutter & Dart (MVVM + Clean Arch)", subtitle_style),
            Paragraph("<b>FICHA DE DISEÑO</b><br/><font color='#00796B'><b>NUBE Y SEGURIDAD</b></font><br/>"
                      "<b>Equipo:</b> GIDS6101-E (1223100392 / 1220100084)", title_style)
        ]
    ]
    t_header = Table(header_data, colWidths=[360, 194])
    t_header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EEF2F6")),
        ('BOX', (0, 0), (-1, -1), 1, PRIMARY),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_header)
    story.append(Spacer(1, 4))

    # Datos Generales del Equipo
    team_data = [
        [
            Paragraph("<b>Integrantes y Roles:</b>", body_bold),
            Paragraph("<b>1. Valeria Guadalupe Calvillo Mendoza</b> (Matrícula: 1223100392) — <i>Product Owner & Mobile Backend Lead</i><br/>"
                      "<b>2. María del Carmen Vargas Martínez</b> (Matrícula: 1220100084) — <i>Scrum Master & Mobile UI/UX Flutter Lead</i>", body_text),
            Paragraph("<b>Tecnología Base:</b><br/><b>Flutter 3.24+ / Dart</b><br/>Android & iOS Nativos", body_text)
        ]
    ]
    t_team = Table(team_data, colWidths=[95, 345, 114])
    t_team.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_team)
    story.append(Spacer(1, 4))

    # BLOQUE 1: El Componente en la Nube
    story.append(Paragraph("☁️ <b>BLOQUE 1: EL COMPONENTE EN LA NUBE</b>", section_heading))
    story.append(Spacer(1, 2))

    b1_data = [
        [
            Paragraph("<b>Proveedor Elegido:</b>", body_bold),
            Paragraph("<b>Google Firebase (Google Cloud Platform)</b> — Servicios móviles BaaS integrados mediante el patrón Singleton (<code>FirebaseSingletonService</code>) con alta disponibilidad y escalabilidad automática.", body_text)
        ],
        [
            Paragraph("<b>¿Para qué se usará la nube?</b><br/><i>(Servicios Activos)</i>", body_bold),
            Paragraph(
                "<b>[ X ] Autenticación:</b> <i>Firebase Authentication</i> con JWT y sesiones OAuth (correo/contraseña y cuentas Google) para roles diferenciados: Turista, Ciudadano, Artesano Productor y Administrador Municipal.<br/>"
                "<b>[ X ] Base de datos:</b> <i>Cloud Firestore</i> (NoSQL reactivo multi-región) para colecciones <code>talleres</code>, <code>productos</code>, <code>reportes_urbanos</code> (con geolocalización) y <code>usuarios</code>.<br/>"
                "<b>[ X ] Almacenamiento de archivos:</b> <i>Firebase Cloud Storage</i> con compresión nativa &lt;500 KB para fotos de evidencia urbana (baches, luminarias) y catálogos de cerámica mayólica.<br/>"
                "<b>[ X ] Funciones de servidor / Backend:</b> <i>Firebase Cloud Messaging (FCM)</i> para notificaciones push de estado de reportes, y <i>Cloud Functions</i> para asignación segura de Custom Claims (<code>admin</code>).",
                body_text
            )
        ]
    ]
    t_b1 = Table(b1_data, colWidths=[120, 434])
    t_b1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_b1)
    story.append(Spacer(1, 4))

    # BLOQUE 2: Las 3 Reglas de Seguridad
    story.append(Paragraph("🔒 <b>BLOQUE 2: LAS 3 REGLAS DE SEGURIDAD (DISPOSITIVO, VIAJE Y BASE DE DATOS)</b>", section_heading))
    story.append(Spacer(1, 2))

    b2_data = [
        [
            Paragraph("<b>1. En el teléfono<br/>del usuario:</b><br/><i>(Almacenamiento Local Seguro)</i>", body_bold),
            Paragraph("<b>Cero contraseñas en texto plano:</b> Se utiliza la librería <code>flutter_secure_storage</code> que delega en el hardware criptográfico nativo: <b>Android Keystore</b> (cifrado con claves RSA/AES respaldadas por hardware) e <b>iOS Keychain</b>. Solo se almacena el <i>Refresh Token</i> cifrado. Para la persistencia de datos en modo offline (Hive), se genera una clave criptográfica de 256 bits derivada localmente para abrir cajas cifradas (<code>Hive.openBox(..., encryptionCipher: HiveAesCipher(key))</code>).", body_text)
        ],
        [
            Paragraph("<b>2. En el viaje<br/>de los datos:</b><br/><i>(Seguridad en Tránsito)</i>", body_bold),
            Paragraph("<b>Cifrado estricto TLS 1.3 / HTTPS End-to-End:</b> Todas las conexiones entre la app móvil y Firebase operan obligatoriamente bajo canales cifrados TLS 1.3. Se implementa <b>Certificate / Public Key Pinning</b> en las llamadas REST/gRPC del cliente Flutter para neutralizar ataques de interceptación <i>Man-in-the-Middle (MitM)</i> en redes Wi-Fi públicas turísticas de Dolores Hidalgo. Los payloads de reportes urbanos van firmados con timestamp y coordenadas GPS validadas por geocerca municipal (&le; 15 km).", body_text)
        ],
        [
            Paragraph("<b>3. En la base de datos:</b><br/><i>(Reglas de Acceso Firestore)</i>", body_bold),
            Paragraph("<b>Reglas de Seguridad Firestore declarativas basadas en tokens (RBAC):</b><br/>"
                      "• <b>Principio de Mínimo Privilegio:</b> Ningún usuario anónimo puede leer o escribir datos sensibles.<br/>"
                      "• <b>Aislamiento de Perfiles:</b> <code>match /usuarios/{userId} { allow write: if request.auth.uid == userId; }</code> (un usuario no puede modificar el perfil de otro).<br/>"
                      "• <b>Reportes y Talleres:</b> Los artesanos solo editan su propio taller (<code>request.auth.uid == resource.data.artesanoId</code>). Solo administradores autenticados con Custom Claims (<code>request.auth.token.role == 'admin'</code>) pueden cambiar el estado municipal a 'Atendido' o aprobar registros.", body_text)
        ]
    ]
    t_b2 = Table(b2_data, colWidths=[120, 434])
    t_b2.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_b2)
    story.append(Spacer(1, 4))

    # BLOQUE 3: Protección del Código (Buenas Prácticas)
    story.append(Paragraph("🛡️ <b>BLOQUE 3: PROTECCIÓN DEL CÓDIGO Y GESTIÓN DE CREDENCIALES (API KEYS)</b>", section_heading))
    story.append(Spacer(1, 2))

    b3_data = [
        [
            Paragraph("<b>Ocultamiento de Llaves en Repositorio Público:</b>", body_bold),
            Paragraph(
                "<b>1. Archivos <code>.env</code> y Exclusión en <code>.gitignore</code>:</b> Se utiliza el paquete <code>flutter_dotenv</code> para cargar las credenciales en tiempo de compilación. El archivo real <code>.env</code> está explícitamente ignorado en el control de versiones Git, subiendo al repositorio público únicamente una plantilla pública <code>.env.example</code> con variables vacías para guiar la configuración de desarrollo.<br/>"
                "<b>2. Protección de Archivos de Configuración Nativa:</b> Los archivos <code>google-services.json</code> (Android) y <code>GoogleService-Info.plist</code> (iOS) están protegidos y filtrados en <code>.gitignore</code>, empleando secretos de repositorio en <b>GitHub Secrets</b> para los flujos de integración continua (CI/CD).<br/>"
                "<b>3. Restricción de Llaves en Google Cloud Console:</b> En la consola de Google Cloud, todas las API Keys asociadas a Firebase y Google Maps cuentan con restricciones de aplicación estrictas vinculadas a la huella digital criptográfica <b>SHA-1 del keystore</b> y al identificador de paquete oficial (<code>mx.edu.utng.dolores_magico_app</code>). De esta manera, aunque una llave de cliente llegara a extraerse de un binario descompilado, los servidores de Google rechazan cualquier petición que no provenga de la app legítima firmada.",
                body_text
            )
        ]
    ]
    t_b3 = Table(b3_data, colWidths=[120, 434])
    t_b3.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_b3)
    story.append(Spacer(1, 4))

    # PIE DE PÁGINA: Declaración Tecnológica y Enlaces de Auditoría
    footer_data = [
        [
            Paragraph("<b>Tecnología y Lenguaje de Desarrollo:</b><br/>"
                      "• <b>Framework:</b> Flutter SDK 3.24+ (Dart 3.5+) con compilación AOT multiplataforma (Android SDK 23-34 / iOS 13+).<br/>"
                      "• <b>Patrón de Arquitectura:</b> MVVM + Clean Architecture desacoplada (Capas <code>domain</code>, <code>data</code> y <code>presentation</code>).<br/>"
                      "• <b>Gestión de Estado y Sensores:</b> Provider reactivo, Geolocator (GPS) y Cámara nativa con geocerca de Dolores Hidalgo.", body_text),
            Paragraph("<b>Control de Calidad y Enlaces Públicos Activos:</b><br/>"
                      "• <b>Repo GitHub:</b> <font color='#00796B'><u>github.com/valeria1732/app_Dolores_Magico</u></font><br/>"
                      "• <b>Tablero Kanban:</b> <font color='#00796B'><u>github.com/users/valeria1732/projects/1</u></font><br/>"
                      "• <b>Docente Invitado:</b> José de Jesús Eduardo Barrientos (<code>lalobarri</code>)<br/>"
                      "• <b>Fecha de Auditoría:</b> Octubre 2026 | <b>Estado:</b> Aprobado para Fase de Servidor", body_text)
        ]
    ]
    t_footer = Table(footer_data, colWidths=[277, 277])
    t_footer.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F1F5F9")),
        ('BOX', (0, 0), (-1, -1), 1, PRIMARY),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_footer)

    doc.build(story)


def build_docx(output_path):
    doc = Document()

    # Márgenes compactos de 0.5 pulgadas
    for section in doc.sections:
        section.top_margin = Inches(0.5)
        section.bottom_margin = Inches(0.5)
        section.left_margin = Inches(0.5)
        section.right_margin = Inches(0.5)

    # Encabezado
    title = doc.add_paragraph()
    r = title.add_run("UNIVERSIDAD TECNOLÓGICA DEL NORTE DE GUANAJUATO (UTNG)\n")
    r.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = RGBColor(13, 35, 58)

    r_sub = title.add_run("FICHA DE DISEÑO TÉCNICO: NUBE Y SEGURIDAD | APLICACIÓN MÓVIL\n")
    r_sub.bold = True
    r_sub.font.size = Pt(13)
    r_sub.font.color.rgb = RGBColor(0, 121, 107)

    r_desc = title.add_run(
        "Materia: Desarrollo Móvil Integral | Docente: Lic. José de Jesús Eduardo Barrientos Avalos\n"
        "Proyecto: DoloresMágico App (o DoloresConecta) | Grupo: GIDS6101-E\n"
        "Integrantes: Valeria Guadalupe Calvillo Mendoza (1223100392) y María del Carmen Vargas Martínez (1220100084)"
    )
    r_desc.font.size = Pt(9)
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Bloque 1
    h1 = doc.add_heading("☁️ Bloque 1: El Componente en la Nube", level=2)
    p1 = doc.add_paragraph()
    p1.add_run("• Proveedor elegido: ").bold = True
    p1.add_run("Google Firebase (Google Cloud Platform) — Implementado bajo el patrón Singleton en la aplicación móvil.\n")
    p1.add_run("• ¿Para qué se usará la nube? (Servicios seleccionados):\n").bold = True
    p1.add_run("   [ X ] Autenticación: ").bold = True
    p1.add_run("Firebase Authentication (inicio de sesión con correo/contraseña y cuentas Google con tokens JWT para roles Turista, Ciudadano, Artesano y Administrador).\n")
    p1.add_run("   [ X ] Base de datos: ").bold = True
    p1.add_run("Cloud Firestore (base de datos NoSQL reactiva para talleres, piezas de cerámica mayólica, catálogo de productos y reportes urbanos geolocalizados).\n")
    p1.add_run("   [ X ] Almacenamiento de archivos: ").bold = True
    p1.add_run("Firebase Cloud Storage (almacenamiento de fotografías comprimidas <500 KB para reportes ciudadanos de baches/luminarias y catálogos de talleres artesanales).\n")
    p1.add_run("   [ X ] Funciones de servidor / Backend: ").bold = True
    p1.add_run("Firebase Cloud Messaging (FCM) para notificaciones push de estatus de reportes y Cloud Functions para asignación segura de Custom Claims de administración.")

    # Bloque 2
    h2 = doc.add_heading("🔒 Bloque 2: Las 3 Reglas de Seguridad", level=2)
    p2 = doc.add_paragraph()
    p2.add_run("1. En el teléfono del usuario (Seguridad en el dispositivo):\n").bold = True
    p2.add_run("   No se almacenan contraseñas en texto plano ni información confidencial sin cifrar. Se utiliza flutter_secure_storage que aprovecha el hardware seguro del teléfono: Android Keystore e iOS Keychain, guardando únicamente el Refresh Token de sesión de Firebase. Adicionalmente, el almacenamiento en caché offline (Hive) utiliza cajas cifradas con el algoritmo AES-256 mediante HiveAesCipher con clave local de 32 bytes.\n\n")
    p2.add_run("2. En el viaje de los datos (Seguridad en tránsito):\n").bold = True
    p2.add_run("   Todas las comunicaciones cliente-servidor se ejecutan obligatoriamente sobre HTTPS bajo protocolo criptográfico TLS 1.3 con cifrado de extremo a extremo (End-to-End). En la aplicación Flutter se implementa SSL / Certificate Pinning para validar los certificados del backend de Firebase y Google APIs, impidiendo ataques de intermediario (Man-in-the-Middle) en redes Wi-Fi públicas turísticas. Los envíos de reportes viajan con firma de tiempo y validación de geocerca (<= 15 km).\n\n")
    p2.add_run("3. En la base de datos (Control de acceso y reglas NoSQL):\n").bold = True
    p2.add_run("   Se configuran Reglas de Seguridad estrictas en Cloud Firestore (Firestore Security Rules) basadas en el UID del usuario autenticado (request.auth.uid). Cada usuario ciudadano solo puede visualizar y consultar sus propios reportes; los artesanos solo pueden modificar la información de su propio taller (request.auth.uid == tallerId); y únicamente los usuarios validados con Custom Claim de rol 'admin' (request.auth.token.role == 'admin') tienen autorización para cambiar el estatus de un reporte a 'Atendido' o dar de alta formal a un taller. Ningún usuario no autenticado tiene permiso de escritura.")

    # Bloque 3
    h3 = doc.add_heading("🛡️ Bloque 3: Protección del Código (Buenas Prácticas)", level=2)
    p3 = doc.add_paragraph()
    p3.add_run("Pregunta Técnica: ¿Cómo van a ocultar las llaves de acceso o credenciales (API Keys) para que no se suban por error a su repositorio público?\n").bold = True
    p3.add_run("1. Variables de Entorno y Archivo .env Oculto: ").bold = True
    p3.add_run("Las credenciales de conexión y URLs de servicios se gestionan mediante el paquete flutter_dotenv, leyendo las claves desde un archivo local .env en tiempo de compilación. Este archivo está explícitamente añadido al archivo .gitignore del repositorio de GitHub, garantizando que nunca sea indexado ni publicado. En el repositorio solo se comparte una plantilla de muestra denominada .env.example con nombres de variables sin valores sensibles.\n")
    p3.add_run("2. Filtrado de Archivos de Configuración de Plataforma: ").bold = True
    p3.add_run("Los archivos nativos google-services.json (Android) y GoogleService-Info.plist (iOS) se encuentran también declarados dentro del .gitignore para prevenir filtraciones involuntarias.\n")
    p3.add_run("3. Restricciones de Dominio y Huella Digital Criptográfica (SHA-1): ").bold = True
    p3.add_run("En la consola de Google Cloud, cada API Key de Firebase y Google Maps está estrictamente restringida por el identificador de paquete (mx.edu.utng.dolores_magico_app) y por la huella digital criptográfica SHA-1 del certificado de firma del APK/AAB del equipo. Si un tercero copia las llaves públicas del código compilado, las APIs de Google rechazan cualquier petición procedente de un paquete o firma que no sea la aplicación móvil autorizada.")

    # Pregunta de Cierre
    h4 = doc.add_heading("📱 Tecnología y Lenguaje de Desarrollo", level=2)
    p4 = doc.add_paragraph()
    p4.add_run("• Framework y Lenguaje: ").bold = True
    p4.add_run("Flutter (versión 3.24+) con lenguaje Dart (versión 3.5+), compilado de manera nativa (AOT) para Android (SDK 23 a 34) e iOS (iOS 13+).\n")
    p4.add_run("• Patrón de Arquitectura: ").bold = True
    p4.add_run("MVVM (Model-View-ViewModel) + Clean Architecture desacoplada en capas Domain (entidades y casos de uso), Data (repositorios y fuentes de datos remotas/locales) y Presentation (vistas Flutter y ViewModels reactivos con Provider).\n")
    p4.add_run("• Hardware Integrado: ").bold = True
    p4.add_run("Sensores GPS (Geolocator) y Cámara del dispositivo (ImagePicker) integrados mediante el patrón de diseño Singleton.")

    doc.save(output_path)


if __name__ == "__main__":
    base_repo = r"c:\Users\maria\Desktop\barrientos\app_Dolores_Magico"
    base_root = r"c:\Users\maria\Desktop\barrientos"

    pdf_paths = [
        os.path.join(base_repo, "Ficha_de_Diseno_Nube_y_Seguridad_Dolores_Magico.pdf"),
        os.path.join(base_root, "Ficha_de_Diseno_Nube_y_Seguridad_Dolores_Magico.pdf"),
    ]
    for p in pdf_paths:
        try:
            build_pdf(p)
            print("PDF generado con éxito:", p)
        except PermissionError:
            alt_p = p.replace(".pdf", "_v2.pdf")
            build_pdf(alt_p)
            print("PDF generado en alternativa:", alt_p)

    docx_paths = [
        os.path.join(base_repo, "Ficha_de_Diseno_Nube_y_Seguridad_Dolores_Magico.docx"),
        os.path.join(base_root, "Ficha_de_Diseno_Nube_y_Seguridad_Dolores_Magico.docx"),
    ]
    for dp in docx_paths:
        try:
            build_docx(dp)
            print("DOCX generado con éxito:", dp)
        except PermissionError:
            alt_dp = dp.replace(".docx", "_v2.docx")
            build_docx(alt_dp)
            print("DOCX generado en alternativa:", alt_dp)
