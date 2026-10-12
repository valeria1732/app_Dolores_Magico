import '../../domain/entities/reporte_urbano.dart';
import '../../domain/repositories/reporte_repository.dart';
import '../datasources/firestore_remote_datasource.dart';
import '../datasources/hive_local_datasource.dart';
import '../models/reporte_urbano_model.dart';

/// Implementación del Patrón Repository: ReporteRepositoryImpl — Capa de Datos
/// Corresponde exactamente al Diagrama UML de Clases (Sección 3 de Arquitectura):
/// - Atributos: `firestoreService`, `storageService`
/// - Método: `+ guardarReporte(r: ReporteUrbano)`
class ReporteRepositoryImpl implements ReporteRepository {
  final FirestoreRemoteDataSource firestoreService;
  final HiveLocalDataSource storageService;

  ReporteRepositoryImpl({
    required this.firestoreService,
    required this.storageService,
  });

  @override
  Future<ReporteUrbano> guardarReporte(ReporteUrbano r) async {
    // 1. Sube la fotografía de evidencia a Firebase Cloud Storage
    final String urlRemota = await firestoreService.subirFotografiaCloudStorage(
      r.fotoUrl,
      r.folio,
    );

    // 2. Construye el modelo DTO para Cloud Firestore y caché local Hive
    final ReporteUrbanoModel modelo = ReporteUrbanoModel(
      id: r.id,
      fotoUrl: urlRemota,
      lat: r.lat,
      lng: r.lng,
      categoria: r.categoria,
      folio: r.folio,
      descripcion: r.descripcion,
      direccionReferencia: r.direccionReferencia,
      estatus: r.estatus,
      fechaRegistro: r.fechaRegistro,
    );

    // 3. Registra en Cloud Firestore y sincroniza en almacenamiento local
    await firestoreService.guardarDocumentoReporteFirestore(modelo);
    storageService.guardarReporteLocal(modelo);

    return modelo;
  }

  @override
  Future<List<ReporteUrbano>> obtenerReportes() async {
    return storageService.obtenerReportesLocales();
  }

  @override
  Future<void> actualizarEstatusReporte(
      String idReporte, String nuevoEstatus) async {
    storageService.actualizarEstatusReporteLocal(idReporte, nuevoEstatus);
  }
}
