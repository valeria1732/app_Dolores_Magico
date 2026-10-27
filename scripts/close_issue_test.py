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

def close_issue(issue_number, comment_body):
    # 1. Post comment
    comment_url = f'https://api.github.com/repos/valeria1732/app_Dolores_Magico/issues/{issue_number}/comments'
    req_comm = urllib.request.Request(comment_url, data=json.dumps({'body': comment_body}).encode(), headers=headers)
    try:
        with urllib.request.urlopen(req_comm) as resp:
            print(f"Comentario agregado con exito a Issue #{issue_number}")
    except urllib.error.HTTPError as e:
        print(f"Error agregando comentario a #{issue_number}:", e.code, e.read().decode())

    # 2. Patch issue to closed
    issue_url = f'https://api.github.com/repos/valeria1732/app_Dolores_Magico/issues/{issue_number}'
    patch_data = {
        'state': 'closed',
        'state_reason': 'completed'
    }
    req_patch = urllib.request.Request(issue_url, data=json.dumps(patch_data).encode(), headers=headers, method='PATCH')
    try:
        with urllib.request.urlopen(req_patch) as resp:
            res = json.loads(resp.read().decode())
            print(f"Issue #{issue_number} cerrado con exito. Estado actual: {res.get('state')}")
    except urllib.error.HTTPError as e:
        print(f"Error cerrando #{issue_number}:", e.code, e.read().decode())

# Test closing issue #10
test_comment = (
    "### ✅ Issue Cerrado — Implementación Completa de Seguridad y Nube\n\n"
    "Se ha concluido la implementación de las directivas de seguridad móvil conforme a **LFPDPPP (reformada DOF 20 de marzo de 2025)**, **OWASP Mobile Top 10 (2024)** y **MASVS v2**:\n"
    "- `lib/core/security/privacy_and_consent_service.dart` (Consentimiento granular y Derechos ARCO)\n"
    "- `lib/core/security/crypto_vault_service.dart` (Cifrado simétrico AES-256-GCM y Keystore/Keychain)\n"
    "- `lib/core/security/secure_network_service.dart` y `network_security_config.xml` (TLS 1.3 y Certificate Pinning)\n"
    "- `lib/core/security/input_sanitizer_service.dart` (Saneamiento contra inyecciones XSS y SQL/NoSQL)\n"
    "- `test/unit/security_services_test.dart` (Batería de pruebas unitarias)\n"
    "- Dossier académico de 15 preguntas: `INVESTIGACION_CENTROS_DE_DATOS_Y_NUBE.md` y `Investigacion_Centros_de_Datos_y_Nube.pdf`.\n\n"
    "**Estado:** Concluido y fusionado en ramas `develop` y `main`."
)

close_issue(10, test_comment)
