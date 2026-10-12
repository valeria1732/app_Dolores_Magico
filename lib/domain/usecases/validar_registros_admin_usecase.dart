import '../repositories/artesano_repository.dart';
import '../repositories/reporte_repository.dart';

/// Caso de Uso: ValidarRegistrosAdminUseCase (HU05)
/// Permite al administrador municipal validar registros de artesanos y
/// actualizar el estado de atención de los reportes ciudadanos.
class ValidarRegistrosAdminUseCase {
  final ArtesanoRepository artesanoRepository;
  final ReporteRepository reporteRepository;

  const ValidarRegistrosAdminUseCase({
    required this.artesanoRepository,
    required this.reporteRepository,
  });

  Future<void> validarTallerArtesano(String idTaller, bool verificado) async {
    await artesanoRepository.cambiarEstadoVerificacion(idTaller, verificado);
  }

  Future<void> cambiarEstatusIncidencia(
      String idReporte, String nuevoEstatus) async {
    await reporteRepository.actualizarEstatusReporte(idReporte, nuevoEstatus);
  }
}
