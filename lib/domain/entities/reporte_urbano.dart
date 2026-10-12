/// <<Entity>> ReporteUrbano — Capa de Dominio (Clean Architecture)
/// Representa un reporte ciudadano georreferenciado de servicios públicos
/// en Dolores Hidalgo C.I.N. (Diagrama UML - Sección 3 de Arquitectura).
class ReporteUrbano {
  final String id;
  final String fotoUrl;
  final double lat;
  final double lng;
  final String categoria;
  final String folio;
  final String descripcion;
  final String direccionReferencia;
  final String estatus; // 'reportado' | 'en_revision' | 'en_atencion' | 'resuelto'
  final DateTime fechaRegistro;

  const ReporteUrbano({
    required this.id,
    required this.fotoUrl,
    required this.lat,
    required this.lng,
    required this.categoria,
    required this.folio,
    required this.descripcion,
    this.direccionReferencia = 'Centro Histórico, Dolores Hidalgo C.I.N.',
    this.estatus = 'reportado',
    required this.fechaRegistro,
  });

  ReporteUrbano copyWith({
    String? id,
    String? fotoUrl,
    double? lat,
    double? lng,
    String? categoria,
    String? folio,
    String? descripcion,
    String? direccionReferencia,
    String? estatus,
    DateTime? fechaRegistro,
  }) {
    return ReporteUrbano(
      id: id ?? this.id,
      fotoUrl: fotoUrl ?? this.fotoUrl,
      lat: lat ?? this.lat,
      lng: lng ?? this.lng,
      categoria: categoria ?? this.categoria,
      folio: folio ?? this.folio,
      descripcion: descripcion ?? this.descripcion,
      direccionReferencia: direccionReferencia ?? this.direccionReferencia,
      estatus: estatus ?? this.estatus,
      fechaRegistro: fechaRegistro ?? this.fechaRegistro,
    );
  }
}
