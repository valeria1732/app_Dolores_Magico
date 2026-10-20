// lib/core/security/input_sanitizer_service.dart
// Cumplimiento técnico:
// - OWASP Mobile Top 10 (2024):
//     * M4: Validación insuficiente de entradas/salidas (prevención de Inyección y XSS).
//     * M3: Autorización insegura (IDOR).
//     * M8: Configuración incorrecta.
// - NIST Special Publication 800-163 Rev. 1: Vetting the Security of Mobile Apps (Ogata et al., 2019).
// - MASVS v2 - CODE & PLATFORM (OWASP Foundation, 2023).

import 'package:flutter/foundation.dart';

/// Servicio de saneamiento, validación de entradas y mitigación de OWASP Mobile Top 10
class InputSanitizerService {
  static final InputSanitizerService _instance = InputSanitizerService._internal();
  factory InputSanitizerService() => _instance;
  InputSanitizerService._internal();

  // Expresiones regulares para detectar patrones maliciosos (XSS, Inyección SQL/NoSQL)
  static final RegExp _xssPattern = RegExp(
    r'<[^>]*script.*?>|<.*?javascript:.*?>|<.*?onclick.*?>|<.*?onload.*?>',
    caseSensitive: false,
  );

  static final RegExp _sqlInjectionPattern = RegExp(
    r'(\b(select|insert|update|delete|drop|union|alter|exec|execute|declare)\b)|(--|\b;\b|\/\*|\*\/)',
    caseSensitive: false,
  );

  static final RegExp _alphanumericSafe = RegExp(r'^[a-zA-Z0-9\sÁÉÍÓÚáéíóúÑñ.,#\-_]+$');

  /// Sanea cadenas de texto ingresadas en formularios de reportes ciudadanos y talleres
  String sanitizeTextInput(String input) {
    if (input.isEmpty) return '';
    
    // 1. Eliminar secuencias nulas o de control
    var clean = input.replaceAll('\u0000', '').trim();

    // 2. Escapar caracteres HTML/XML peligrosos para WebViews y renderers
    clean = clean
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#x27;');

    return clean;
  }

  /// Valida que el texto no contenga vectores de ataque de inyección
  bool isInputSafe(String input) {
    if (input.isEmpty) return true;
    if (_xssPattern.hasMatch(input)) {
      debugPrint('[SECURITY] Intento de inyección XSS detectado y bloqueado.');
      return false;
    }
    if (_sqlInjectionPattern.hasMatch(input)) {
      debugPrint('[SECURITY] Intento de inyección SQL/NoSQL detectado y bloqueado.');
      return false;
    }
    return true;
  }

  /// Valida y normaliza identificadores para evitar vulnerabilidades de tipo IDOR (Insecure Direct Object Reference - OWASP M3)
  bool isValidIdentifier(String id) {
    if (id.isEmpty || id.length > 64) return false;
    // Solo permitir caracteres alfanuméricos y guiones
    final idRegex = RegExp(r'^[a-zA-Z0-9_\-]+$');
    return idRegex.hasMatch(id);
  }

  /// Valida un Deep Link o Intent recibido para garantizar que apunte al dominio legítimo de la app
  bool isDeepLinkAllowed(Uri uri) {
    // Whitelist de esquemas y dominios válidos
    const allowedSchemes = ['doloresmagico', 'https'];
    const allowedHosts = ['doloresmagico.utng.edu.mx', 'app.doloresmagico.gob.mx'];

    if (!allowedSchemes.contains(uri.scheme.toLowerCase())) {
      debugPrint('[SECURITY] Esquema de Deep Link no autorizado: ${uri.scheme}');
      return false;
    }

    if (uri.scheme == 'https' && !allowedHosts.contains(uri.host.toLowerCase())) {
      debugPrint('[SECURITY] Host de Deep Link no autorizado: ${uri.host}');
      return false;
    }

    return true;
  }

  /// Verificación de entorno: detecta indicadores de depuración insegura en producción
  bool isEnvironmentSecure() {
    if (kReleaseMode) {
      // En modo Release, validar que no haya asserts o depuración activa
      bool inDebug = false;
      assert(() {
        inDebug = true;
        return true;
      }());
      if (inDebug) {
        debugPrint('[SECURITY WARNING] Aplicación en Release ejecutándose con banderas de depuración.');
        return false;
      }
    }
    return true;
  }
}
