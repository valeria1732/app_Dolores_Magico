import 'dart:math';
import '../../core/constants/dolores_constants.dart';
import '../entities/reporte_urbano.dart';
import '../repositories/reporte_repository.dart';

/// Caso de Uso: RegistrarReporteUseCase — Capa de Dominio (Diagrama UML Pág. 5)
/// Responsabilidades:
/// 1. Validar que la evidencia fotográfica y coordenadas GPS sean válidas.
/// 2. Generar el folio único de confirmación oficial (FOL-2026-DH-XXXX).
/// 3. Invocar la interfaz `ReporteRepository` para persistir el reporte.
class RegistrarReporteUseCase {
  final ReporteRepository repository;

  const RegistrarReporteUseCase(this.repository);

  Future<ReporteUrbano> execute(ReporteUrbano reporte) async {
    if (reporte.descripcion.trim().isEmpty) {
      throw ArgumentError('La descripción de la incidencia urbana es obligatoria.');
    }
    if (reporte.fotoUrl.trim().isEmpty) {
      throw ArgumentError('Debe capturar una fotografía de evidencia con la cámara.');
    }
    if (reporte.lat == 0.0 || reporte.lng == 0.0) {
      throw ArgumentError('Las coordenadas GPS del reporte no son válidas.');
    }

    // Generación de folio único de seguimiento ciudadano (HU03)
    final String folioGenerado = reporte.folio.isNotEmpty
        ? reporte.folio
        : _generarFolioUnico();

    final ReporteUrbano reporteConFolio = reporte.copyWith(
      folio: folioGenerado,
      estatus: 'reportado',
    );

    return await repository.guardarReporte(reporteConFolio);
  }

  String _generarFolioUnico() {
    final int consecutivo = 1000 + Random().nextInt(8999);
    return '${DoloresConstants.folioPrefix}$consecutivo';
  }
}
