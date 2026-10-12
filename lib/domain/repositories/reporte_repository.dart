import '../entities/reporte_urbano.dart';

/// <<Interface>> ReporteRepository — Capa de Dominio (Repository Pattern 13.2)
/// Desacopla la lógica de negocio (Casos de Uso) de Firebase Firestore,
/// Firebase Cloud Storage y el almacenamiento local Hive.
abstract class ReporteRepository {
  /// Persiste la fotografía en Cloud Storage y el registro en Firestore
  Future<ReporteUrbano> guardarReporte(ReporteUrbano r);

  /// Obtiene el listado de reportes ciudadanos registrados
  Future<List<ReporteUrbano>> obtenerReportes();

  /// Actualiza el estatus de atención de una incidencia (HU05 - Administración)
  Future<void> actualizarEstatusReporte(String idReporte, String nuevoEstatus);
}
