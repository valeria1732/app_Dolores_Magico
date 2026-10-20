// test/unit/security_services_test.dart
// Pruebas unitarias de los componentes de Seguridad y Privacidad en la Nube
// Normas: LFPDPPP (reformada DOF 2025), OWASP Mobile Top 10 (2024), MASVS v2.

import 'package:flutter_test/flutter_test.dart';
import 'package:dolores_magico_app/core/security/privacy_and_consent_service.dart';
import 'package:dolores_magico_app/core/security/crypto_vault_service.dart';
import 'package:dolores_magico_app/core/security/input_sanitizer_service.dart';
import 'package:dolores_magico_app/core/security/secure_network_service.dart';

void main() {
  group('1. Pruebas de Privacidad y Derechos ARCO (LFPDPPP 2025)', () {
    late PrivacyAndConsentService privacyService;

    setUp(() {
      privacyService = PrivacyAndConsentService();
    });

    test('Registra consentimiento informado y granular para GPS y Cámara', () {
      privacyService.recordConsent(
        acceptedPrivacyNotice: true,
        consentGpsLocation: true,
        consentCameraCapture: true,
        consentPushNotifications: false,
      );

      expect(privacyService.hasLocationConsent(), isTrue);
      expect(privacyService.hasCameraConsent(), isTrue);
      expect(privacyService.currentConsent.policyVersion, equals('2025-DOF-LFPDPPP-v2.0'));
    });

    test('Genera solicitud formal de Derechos ARCO (Acceso, Cancelación)', () {
      final arcoReq = privacyService.submitArcoRequest(
        userId: 'user_dolores_123',
        rightType: ArcoRightType.cancelacion,
        description: 'Deseo eliminar mi cuenta y mis datos personales de la app.',
      );

      expect(arcoReq.requestId.startsWith('ARCO-'), isTrue);
      expect(arcoReq.rightType, equals(ArcoRightType.cancelacion));
      expect(arcoReq.status, equals('Recibida'));
    });

    test('Purga de datos y derecho al olvido restablece el estado de consentimiento', () async {
      final success = await privacyService.deleteAccountAndPurgeData('user_dolores_123');
      expect(success, isTrue);
      expect(privacyService.hasLocationConsent(), isFalse);
    });
  });

  group('2. Pruebas de Criptografía y Almacén Seguro (NIST FIPS 197 / OWASP M9, M10)', () {
    late CryptoVaultService cryptoVault;

    setUp(() {
      cryptoVault = CryptoVaultService();
    });

    test('Cifra y descifra datos en reposo con integridad autenticada', () {
      const secretMessage = 'Coordenadas del Taller: 21.1561, -100.9318';
      const masterKey = 'SuperClaveDoloresMagico2026!#';

      final envelope = cryptoVault.encryptVaultData(secretMessage, masterKey);
      expect(envelope['ciphertext'], isNotEmpty);
      expect(envelope['mac'], isNotEmpty);

      final decrypted = cryptoVault.decryptVaultData(envelope, masterKey);
      expect(decrypted, equals(secretMessage));
    });

    test('Falla de integridad si el paquete cifrado es alterado (Fail-safe)', () {
      const secretMessage = 'Folio Confidencial: FOL-2026-DH-9999';
      const masterKey = 'ClaveMaestraSegura2026';

      final envelope = cryptoVault.encryptVaultData(secretMessage, masterKey);
      // Manipular el MAC para simular alteración maliciosa
      final tamperedEnvelope = Map<String, String>.from(envelope);
      tamperedEnvelope['mac'] = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAA';

      expect(
        () => cryptoVault.decryptVaultData(tamperedEnvelope, masterKey),
        throwsA(isA<SecurityException>()),
      );
    });

    test('Almacenamiento y recuperación de token seguro en Keystore', () async {
      await cryptoVault.storeSecureToken('jwt_refresh_token', 'token_seguro_xyz_12345');
      final retrieved = await cryptoVault.readSecureToken('jwt_refresh_token');
      expect(retrieved, equals('token_seguro_xyz_12345'));

      await cryptoVault.clearSecureTokens();
      final afterClear = await cryptoVault.readSecureToken('jwt_refresh_token');
      expect(afterClear, isNull);
    });
  });

  group('3. Pruebas de Saneamiento y Mitigación de Vulnerabilidades (OWASP M4, M3)', () {
    late InputSanitizerService sanitizer;

    setUp(() {
      sanitizer = InputSanitizerService();
    });

    test('Neutraliza caracteres de inyección HTML/XSS en formularios', () {
      const dangerousInput = '<script>alert("hacked")</script>Reporte de bache';
      final clean = sanitizer.sanitizeTextInput(dangerousInput);

      expect(clean.contains('<script>'), isFalse);
      expect(clean.contains('&lt;script&gt;'), isTrue);
      expect(sanitizer.isInputSafe(dangerousInput), isFalse);
    });

    test('Detecta y bloquea comandos de inyección SQL en búsquedas', () {
      const sqlInjection = "1' OR '1'='1; DROP TABLE talleres; --";
      expect(sanitizer.isInputSafe(sqlInjection), isFalse);
    });

    test('Valida identificadores seguros para mitigar IDOR', () {
      expect(sanitizer.isValidIdentifier('rep_2026_01'), isTrue);
      expect(sanitizer.isValidIdentifier('../../../etc/passwd'), isFalse);
      expect(sanitizer.isValidIdentifier('id<script>'), isFalse);
    });

    test('Valida Deep Links autorizados únicamente para dominios institucionales', () {
      final validUri = Uri.parse('https://doloresmagico.utng.edu.mx/taller/mayolica');
      final maliciousUri = Uri.parse('https://sitio-atacante-falso.com/phishing');

      expect(sanitizer.isDeepLinkAllowed(validUri), isTrue);
      expect(sanitizer.isDeepLinkAllowed(maliciousUri), isFalse);
    });
  });

  group('4. Pruebas de Red Segura y Certificate Pinning (RFC 8446 / OWASP M5)', () {
    late SecureNetworkService networkService;

    setUp(() {
      networkService = SecureNetworkService();
    });

    test('Rechaza estrictamente conexiones HTTP no seguras en texto plano', () {
      expect(networkService.isUrlSecure('http://api.insegura.com/datos'), isFalse);
      expect(networkService.isUrlSecure('https://firestore.googleapis.com'), isTrue);
    });

    test('Valida huella digital de certificados anclados (Certificate Pinning)', () {
      const validHost = 'firestore.googleapis.com';
      const validPin = 'G1b2C3d4E5f6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2';
      const fakePin = '9999999999999999999999999999999999999999999999999999999999999999';

      expect(networkService.verifyCertificatePin(validHost, validPin), isTrue);
      expect(networkService.verifyCertificatePin(validHost, fakePin), isFalse);
    });
  });
}
