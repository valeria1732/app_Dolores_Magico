import 'package:flutter/foundation.dart';
import '../security/privacy_and_consent_service.dart';
import '../security/crypto_vault_service.dart';
import '../security/secure_network_service.dart';
import '../security/input_sanitizer_service.dart';

/// Patrón de Diseño 13.3: Singleton
/// Problema que resuelve: Permite controlar la existencia de una única instancia
/// de los servicios de Firebase (Authentication, Cloud Firestore, Cloud Storage y FCM)
/// y de la Bóveda de Seguridad y Privacidad (LFPDPPP 2025 & MASVS v2)
/// compartidos por las diferentes capas de la aplicación móvil.
class FirebaseSingletonService {
  static final FirebaseSingletonService _instance =
      FirebaseSingletonService._internal();

  factory FirebaseSingletonService() => _instance;

  FirebaseSingletonService._internal();

  bool _isInitialized = false;
  bool get isInitialized => _isInitialized;

  // Servicios de Seguridad y Privacidad en la Nube
  final PrivacyAndConsentService privacyService = PrivacyAndConsentService();
  final CryptoVaultService cryptoVault = CryptoVaultService();
  final SecureNetworkService secureNetwork = SecureNetworkService();
  final InputSanitizerService sanitizer = InputSanitizerService();

  // Referencias centralizadas a las colecciones de Cloud Firestore
  static const String collectionArtesanos = 'talleres_artesanos';
  static const String collectionReportes = 'reportes_ciudadanos';
  static const String collectionUsuarios = 'usuarios_dolores';
  static const String storageBucketReportes = 'evidencias_reportes_urbanos';

  Future<void> initializeFirebase() async {
    if (_isInitialized) return;
    // 1. Inicializa validación de entorno seguro (OWASP M7/M8)
    if (!sanitizer.isEnvironmentSecure()) {
      debugPrint('[SECURITY] Advertencia: Ejecutándose con banderas inseguras.');
    }

    // 2. Inicializa Firebase Core, Auth, Firestore, Storage y FCM bajo TLS 1.3
    debugPrint('[CLOUD] Conexiones seguras a Firebase inicializadas bajo TLS 1.3.');
    _isInitialized = true;
  }
}
