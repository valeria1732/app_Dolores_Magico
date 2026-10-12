import 'package:flutter/foundation.dart';
import '../../core/services/location_camera_singleton.dart';
import '../../domain/entities/reporte_urbano.dart';
import '../../domain/usecases/registrar_reporte_usecase.dart';

/// Estados reactivos del ViewModel para el Módulo de Reporte Ciudadano
enum ReporteState {
  inicial,
  capturandoHardware,
  cargandoEnvio,
  confirmadoConFolio,
  error,
}

/// ViewModel: ReporteViewModel — Capa de Presentación (Patrón MVVM 13.1)
/// Corresponde exactamente al Diagrama UML de Clases (Sección 3 de Arquitectura):
/// - `- reportesUseCase: RegistrarReporteUseCase`
/// - `- state: ReporteState`
/// - `+ capturarFotoYUbicacion(): Future<void>`
/// - `+ enviarReporte(descripcion: String, categoria: String): Future<void>`
class ReporteViewModel extends ChangeNotifier {
  final RegistrarReporteUseCase reportesUseCase;
  final LocationCameraSingleton locationCameraService;

  ReporteState _state = ReporteState.inicial;
  ReporteState get state => _state;

  String? _fotoCapturadaPath;
  String? get fotoCapturadaPath => _fotoCapturadaPath;

  double _latActual = 21.15605;
  double get latActual => _latActual;

  double _lngActual = -100.93245;
  double get lngActual => _lngActual;

  String? _ultimoFolioGenerado;
  String? get ultimoFolioGenerado => _ultimoFolioGenerado;

  String? _mensajeError;
  String? get mensajeError => _mensajeError;

  final List<ReporteUrbano> _historialReportes = [];
  List<ReporteUrbano> get historialReportes =>
      List.unmodifiable(_historialReportes);

  ReporteViewModel({
    required this.reportesUseCase,
    required this.locationCameraService,
  });

  /// Invoca la cámara del dispositivo (`ImagePicker`) y el sensor GPS (`Geolocator`)
  Future<void> capturarFotoYUbicacion() async {
    try {
      _state = ReporteState.capturandoHardware;
      _mensajeError = null;
      notifyListeners();

      final coords =
          await locationCameraService.obtenerCoordenadasGpsActuales();
      final fotoPath = await locationCameraService.capturarFotografiaCamara();

      _latActual = coords['lat'] ?? 21.15605;
      _lngActual = coords['lng'] ?? -100.93245;
      _fotoCapturadaPath = fotoPath;
      _state = ReporteState.inicial;
      notifyListeners();
    } catch (e) {
      _state = ReporteState.error;
      _mensajeError = 'Error al acceder a cámara o GPS: $e';
      notifyListeners();
    }
  }

  /// Procesa el evento de envío desde la Vista, actualiza el estado visual a
  /// "Cargando..." e invoca al Caso de Uso `RegistrarReporteUseCase`.
  Future<ReporteUrbano?> enviarReporte(
    String descripcion,
    String categoria, {
    String direccionReferencia = 'Centro Histórico, Dolores Hidalgo C.I.N.',
  }) async {
    try {
      _state = ReporteState.cargandoEnvio;
      _mensajeError = null;
      notifyListeners();

      final nuevoReporte = ReporteUrbano(
        id: 'rep_${DateTime.now().millisecondsSinceEpoch}',
        fotoUrl: _fotoCapturadaPath ?? 'captura_evidencia_default.jpg',
        lat: _latActual,
        lng: _lngActual,
        categoria: categoria,
        folio: '', // El caso de uso genera el folio único FOL-2026-DH-XXXX
        descripcion: descripcion,
        direccionReferencia: direccionReferencia,
        fechaRegistro: DateTime.now(),
      );

      final reporteGuardado = await reportesUseCase.execute(nuevoReporte);

      _ultimoFolioGenerado = reporteGuardado.folio;
      _historialReportes.insert(0, reporteGuardado);
      _state = ReporteState.confirmadoConFolio;
      notifyListeners();
      return reporteGuardado;
    } catch (e) {
      _state = ReporteState.error;
      _mensajeError = e.toString();
      notifyListeners();
      return null;
    }
  }
}
