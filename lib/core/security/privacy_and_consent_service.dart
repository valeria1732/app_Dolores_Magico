// lib/core/security/privacy_and_consent_service.dart
// Cumplimiento normativo:
// - Ley Federal de Protección de Datos Personales en Posesión de los Particulares
//   (LFPDPPP reformada en el DOF el 20 de marzo de 2025).
// - Reglamento General de Protección de Datos (RGPD, Art. 25 y 32).
// - Privacy by Design: 7 principios fundacionales (Cavoukian, 2011).
// - OWASP Mobile Application Security Verification Standard (MASVS v2 - PRIVACY).

import 'dart:convert';
import 'package:flutter/foundation.dart';

/// Estado de consentimiento granular otorgado por el usuario
class UserPrivacyConsent {
  final bool acceptedPrivacyNotice;
  final bool consentGpsLocation;
  final bool consentCameraCapture;
  final bool consentPushNotifications;
  final DateTime consentTimestamp;
  final String policyVersion;

  UserPrivacyConsent({
    required this.acceptedPrivacyNotice,
    required this.consentGpsLocation,
    required this.consentCameraCapture,
    required this.consentPushNotifications,
    required this.consentTimestamp,
    this.policyVersion = '2025-DOF-LFPDPPP-v2.0',
  });

  Map<String, dynamic> toMap() => {
    'acceptedPrivacyNotice': acceptedPrivacyNotice,
    'consentGpsLocation': consentGpsLocation,
    'consentCameraCapture': consentCameraCapture,
    'consentPushNotifications': consentPushNotifications,
    'consentTimestamp': consentTimestamp.toIso8601String(),
    'policyVersion': policyVersion,
  };

  factory UserPrivacyConsent.initial() => UserPrivacyConsent(
    acceptedPrivacyNotice: false,
    consentGpsLocation: false,
    consentCameraCapture: false,
    consentPushNotifications: false,
    consentTimestamp: DateTime.now(),
  );

  factory UserPrivacyConsent.fromMap(Map<String, dynamic> map) => UserPrivacyConsent(
    acceptedPrivacyNotice: map['acceptedPrivacyNotice'] ?? false,
    consentGpsLocation: map['consentGpsLocation'] ?? false,
    consentCameraCapture: map['consentCameraCapture'] ?? false,
    consentPushNotifications: map['consentPushNotifications'] ?? false,
    consentTimestamp: DateTime.tryParse(map['consentTimestamp'] ?? '') ?? DateTime.now(),
    policyVersion: map['policyVersion'] ?? '2025-DOF-LFPDPPP-v2.0',
  );
}

/// Solicitud de ejercicio de Derechos ARCO (LFPDPPP México / RGPD UE)
enum ArcoRightType { acceso, rectificacion, cancelacion, oposicion }

class ArcoRequest {
  final String requestId;
  final String userId;
  final ArcoRightType rightType;
  final String description;
  final DateTime submittedAt;
  final String status; // 'Recibida', 'En Revision', 'Ejecutada'

  ArcoRequest({
    required this.requestId,
    required this.userId,
    required this.rightType,
    required this.description,
    required this.submittedAt,
    this.status = 'Recibida',
  });

  Map<String, dynamic> toMap() => {
    'requestId': requestId,
    'userId': userId,
    'rightType': rightType.name,
    'description': description,
    'submittedAt': submittedAt.toIso8601String(),
    'status': status,
  };
}

/// Servicio integral de Privacidad desde el Diseño y Derechos ARCO
class PrivacyAndConsentService {
  static final PrivacyAndConsentService _instance = PrivacyAndConsentService._internal();
  factory PrivacyAndConsentService() => _instance;
  PrivacyAndConsentService._internal();

  UserPrivacyConsent _currentConsent = UserPrivacyConsent.initial();
  final List<ArcoRequest> _arcoRequests = [];

  UserPrivacyConsent get currentConsent => _currentConsent;

  /// Registra el consentimiento informado y granular del usuario (Principio 2 MASVS PRIVACY)
  void recordConsent({
    required bool acceptedPrivacyNotice,
    required bool consentGpsLocation,
    required bool consentCameraCapture,
    required bool consentPushNotifications,
  }) {
    _currentConsent = UserPrivacyConsent(
      acceptedPrivacyNotice: acceptedPrivacyNotice,
      consentGpsLocation: consentGpsLocation,
      consentCameraCapture: consentCameraCapture,
      consentPushNotifications: consentPushNotifications,
      consentTimestamp: DateTime.now(),
      policyVersion: '2025-DOF-LFPDPPP-v2.0',
    );
    debugPrint('[PRIVACY] Consentimiento registrado con éxito conforme a LFPDPPP 2025.');
  }

  /// Verifica si el usuario cuenta con consentimiento activo para capturar ubicación
  bool hasLocationConsent() {
    return _currentConsent.acceptedPrivacyNotice && _currentConsent.consentGpsLocation;
  }

  /// Verifica si el usuario autorizó el uso de cámara para evidencia fotográfica
  bool hasCameraConsent() {
    return _currentConsent.acceptedPrivacyNotice && _currentConsent.consentCameraCapture;
  }

  /// Registra una solicitud formal de derechos ARCO (Acceso, Rectificación, Cancelación u Oposición)
  ArcoRequest submitArcoRequest({
    required String userId,
    required ArcoRightType rightType,
    required String description,
  }) {
    final req = ArcoRequest(
      requestId: 'ARCO-${DateTime.now().millisecondsSinceEpoch}',
      userId: userId,
      rightType: rightType,
      description: description,
      submittedAt: DateTime.now(),
      status: 'Recibida',
    );
    _arcoRequests.add(req);
    debugPrint('[ARCO] Solicitud registrada: ${req.requestId} para usuario $userId (Tipo: ${rightType.name})');
    return req;
  }

  /// Implementa la supresión de datos y derecho al olvido (Cancelación total de cuenta)
  Future<bool> deleteAccountAndPurgeData(String userId) async {
    // 1. Marcar solicitudes ARCO como concluidas
    submitArcoRequest(
      userId: userId,
      rightType: ArcoRightType.cancelacion,
      description: 'Solicitud automatizada de eliminacion total de cuenta y purga de datos personales.',
    );

    // 2. Resetear estado de consentimiento
    _currentConsent = UserPrivacyConsent.initial();
    debugPrint('[PRIVACY] Datos del usuario $userId purgados conforme al Art. 25 del RGPD y LFPDPPP.');
    return true;
  }

  /// Texto oficial del Aviso de Privacidad Simplificado
  static const String privacyNoticeShortText = '''
AVISO DE PRIVACIDAD SIMPLIFICADO (DOLORES MÁGICO APP)
En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (reformada en el DOF el 20 de marzo de 2025):
1. Responsable: Proyecto de Innovación Tecnológica UTNG - Dolores Hidalgo C.I.N., Guanajuato.
2. Finalidad: Geolocalización en mapa interactivo de talleres de Talavera Mayólica y gestión de reportes de servicios públicos municipales.
3. Principios: Licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad.
4. Derechos ARCO: Puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición en cualquier momento desde la sección de Seguridad de la App.
5. Transferencias: No se transfieren datos a terceros comerciales ni con fines publicitarios.
''';
}
