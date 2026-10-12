import '../../domain/entities/reporte_urbano.dart';

/// Modelo de Datos (DTO): ReporteUrbanoModel — Capa de Datos
/// Extiende la entidad de dominio `ReporteUrbano` y provee serialización
/// hacia/desde Firebase Cloud Firestore y almacenamiento local Hive.
class ReporteUrbanoModel extends ReporteUrbano {
  const ReporteUrbanoModel({
    required super.id,
    required super.fotoUrl,
    required super.lat,
    required super.lng,
    required super.categoria,
    required super.folio,
    required super.descripcion,
    super.direccionReferencia,
    super.estatus,
    required super.fechaRegistro,
  });

  factory ReporteUrbanoModel.fromFirestoreMap(
      Map<String, dynamic> map, String documentId) {
    return ReporteUrbanoModel(
      id: documentId,
      fotoUrl: map['fotoUrl'] as String? ?? '',
      lat: (map['lat'] as num?)?.toDouble() ?? 21.15605,
      lng: (map['lng'] as num?)?.toDouble() ?? -100.93245,
      categoria: map['categoria'] as String? ?? 'alumbrado',
      folio: map['folio'] as String? ?? '',
      descripcion: map['descripcion'] as String? ?? '',
      direccionReferencia:
          map['direccionReferencia'] as String? ?? 'Centro Histórico',
      estatus: map['estatus'] as String? ?? 'reportado',
      fechaRegistro: DateTime.tryParse(map['fechaRegistro'] as String? ?? '') ??
          DateTime.now(),
    );
  }

  Map<String, dynamic> toFirestoreMap() {
    return {
      'id': id,
      'fotoUrl': fotoUrl,
      'lat': lat,
      'lng': lng,
      'categoria': categoria,
      'folio': folio,
      'descripcion': descripcion,
      'direccionReferencia': direccionReferencia,
      'estatus': estatus,
      'fechaRegistro': fechaRegistro.toIso8601String(),
    };
  }
}
