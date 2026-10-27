import subprocess
import urllib.request
import urllib.error
import json

proc = subprocess.run(['git', 'credential', 'fill'], input='protocol=https\nhost=github.com\n\n', text=True, capture_output=True)
creds = dict(line.split('=', 1) for line in proc.stdout.splitlines() if '=' in line)
token = creds.get('password', '')

headers = {
    'Authorization': f'Bearer {token}',
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'DoloresMagico-Script',
    'Content-Type': 'application/json'
}

def post_comment(issue_number, comment_body):
    comment_url = f'https://api.github.com/repos/valeria1732/app_Dolores_Magico/issues/{issue_number}/comments'
    req_comm = urllib.request.Request(comment_url, data=json.dumps({'body': comment_body}).encode(), headers=headers)
    try:
        with urllib.request.urlopen(req_comm) as resp:
            print(f"[OK] Comentario agregado a Issue #{issue_number}")
    except urllib.error.HTTPError as e:
        print(f"[ERR] Error comentando #{issue_number}:", e.code, e.read().decode())

def close_issue(issue_number, comment_body):
    post_comment(issue_number, comment_body)
    issue_url = f'https://api.github.com/repos/valeria1732/app_Dolores_Magico/issues/{issue_number}'
    patch_data = {'state': 'closed', 'state_reason': 'completed'}
    req_patch = urllib.request.Request(issue_url, data=json.dumps(patch_data).encode(), headers=headers, method='PATCH')
    try:
        with urllib.request.urlopen(req_patch) as resp:
            res = json.loads(resp.read().decode())
            print(f"[CLOSED] Issue #{issue_number} cerrado formalmente. Estado: {res.get('state')}")
    except urllib.error.HTTPError as e:
        print(f"[ERR] Error cerrando #{issue_number}:", e.code, e.read().decode())

# 1. Cerrar Issue #2 (HU01)
c_hu01 = (
    "### ✅ Historia de Usuario Completada — HU01: Autenticación y Registro Diferenciado\n\n"
    "Se ha concluido la codificación y pruebas del módulo de autenticación móvil y registro diferenciado:\n"
    "- **Vista Móvil:** `lib/presentation/views/auth/registro_artesano_page.dart` (Formulario Flutter con consentimiento informado LFPDPPP 2025).\n"
    "- **Entidad de Dominio:** `lib/domain/entities/usuario_app.dart` (Roles diferenciados: Turista, Ciudadano, Artesano y Administrador).\n"
    "- **Repositorio:** `lib/data/repositories/auth_repository_impl.dart` (Integración con Firebase Auth y tokens JWT).\n"
    "- **Seguridad:** Gestión de tokens en hardware seguro (Android Keystore / iOS Keychain) vía `CryptoVaultService`.\n\n"
    "**Criterios de Aceptación:** Cumplidos al 100%. Código integrado en ramas `develop` y `main`."
)
close_issue(2, c_hu01)

# 2. Cerrar Issue #4 (HU03)
c_hu03 = (
    "### ✅ Historia de Usuario Completada — HU03: Reporte Ciudadano con Cámara, GPS y Folio Único\n\n"
    "Se ha concluido la implementación móvil de reporte urbano:\n"
    "- **Vista Móvil:** `lib/presentation/views/reportes/reporte_ciudadano_page.dart` (Captura de foto con cámara nativa, compresión <500 KB y selector de categorías).\n"
    "- **Caso de Uso:** `lib/domain/usecases/registrar_reporte_usecase.dart` (Validación de geocerca GPS en Dolores Hidalgo <= 15 km y generación de folio único `FOL-2026-DH-XXXX`).\n"
    "- **Persistencia Offline:** `lib/data/datasources/hive_local_datasource.dart` (Caché local con cifrado AES-256).\n"
    "- **Pruebas Unitarias:** `test/unit/registrar_reporte_usecase_test.dart`.\n\n"
    "**Criterios de Aceptación:** Cumplidos al 100%. Código integrado en ramas `develop` y `main`."
)
close_issue(4, c_hu03)

# 3. Cerrar Issue #5 (HU04)
c_hu04 = (
    "### ✅ Historia de Usuario Completada — HU04: Ficha Técnica del Taller y Contacto WhatsApp\n\n"
    "Se ha concluido la implementación de la ficha técnica y contacto directo:\n"
    "- **Vista Móvil:** `lib/presentation/views/catalogo/ficha_taller_artesano_page.dart` (Galería de piezas de Talavera Mayólica, biografía del maestro alfarero y horarios).\n"
    "- **Caso de Uso:** `lib/domain/usecases/contactar_artesano_whatsapp_usecase.dart` (Lanzamiento nativo de WhatsApp vía enlace profundo `url_launcher` con mensaje prellenado para encargos directos).\n\n"
    "**Criterios de Aceptación:** Cumplidos al 100%. Código integrado en ramas `develop` y `main`."
)
close_issue(5, c_hu04)

# 4. Actualizar comentarios en Issue #7 (Festividades - Backlog)
c_fest = (
    "### 📋 Seguimiento Scrum — Estado: En Reserva (Product Backlog)\n\n"
    "Conforme a la sesión de planeación y recorte de alcance del **Sprint 1 y 2**, esta funcionalidad no forma parte del núcleo crítico del **Producto Mínimo Viable (PMV)** para la entrega inamovible del **20 de noviembre**.\n\n"
    "Se mantiene en la columna **Reserva / Backlog** para desarrollo en fases posteriores (Sprint 3/4) tras la validación de los módulos de Talavera Mayólica y Reporte Ciudadano."
)
post_comment(7, c_fest)

# 5. Actualizar comentarios en Issue #8 (Reseñas - Descartado de PMV)
c_res = (
    "### 📋 Seguimiento Scrum — Estado: Descartado del PMV (Backlog Futuro)\n\n"
    "Conforme a la fundamentación metodológica para mitigar riesgos de entrega al 20 de noviembre, el sistema de reseñas y comentarios se clasificó como *Nice-to-Have* y queda fuera del alcance de esta versión.\n\n"
    "Se mantiene registrado en el tablero para futuras versiones (v2.0)."
)
post_comment(8, c_res)
