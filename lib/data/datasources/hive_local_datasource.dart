import '../models/reporte_urbano_model.dart';
import '../models/taller_artesano_model.dart';

/// Fuente de Datos Local: HiveLocalDataSource — Persistencia Offline (Sección 13.2 y 14)
/// Permite que la aplicación móvil mantenga disponibles los talleres y reportes
/// incluso cuando el usuario o turista tenga conexión limitada en comunidades rurales.
class HiveLocalDataSource {
  final List<TallerArtesanoModel> _cacheTalleres =
      List.from(TallerArtesanoModel.obtenerSemillaDoloresHidalgo());

  final List<ReporteUrbanoModel> _cacheReportes = [
    ReporteUrbanoModel(
      id: 'rep-1',
      folio: 'FOL-2026-DH-1042',
      categoria: 'alumbrado',
      descripcion:
          'Luminaria colonial estilo farol apagada en Calle Puebla cerca de talleres de Talavera.',
      direccionReferencia: 'Calle Puebla esq. Hidalgo, Centro Histórico',
      lat: 21.1567,
      lng: -100.9333,
      fotoUrl: 'assets/images/reporte_alumbrado.jpg',
      estatus: 'en_atencion',
      fechaRegistro: DateTime(2026, 10, 2, 19, 40),
    ),
    ReporteUrbanoModel(
      id: 'rep-2',
      folio: 'FOL-2026-DH-1043',
      categoria: 'vialidad',
      descripcion:
          'Desprendimiento de empedrado tradicional frente a taller artesanal en Barrio San Juan.',
      direccionReferencia: 'Calle Michoacán #30, Barrio San Juan',
      lat: 21.1576,
      lng: -100.9312,
      fotoUrl: 'assets/images/reporte_bache.jpg',
      estatus: 'reportado',
      fechaRegistro: DateTime(2026, 10, 5, 11, 15),
    ),
  ];

  List<TallerArtesanoModel> obtenerTalleresLocales() =>
      List.unmodifiable(_cacheTalleres);

  void agregarTallerLocal(TallerArtesanoModel taller) {
    _cacheTalleres.insert(0, taller);
  }

  void actualizarVerificacionTaller(String idTaller, bool verificado) {
    final index = _cacheTalleres.indexWhere((t) => t.id == idTaller);
    if (index != -1) {
      final actual = _cacheTalleres[index];
      _cacheTalleres[index] = TallerArtesanoModel(
        id: actual.id,
        nombre: actual.nombre,
        maestroArtesano: actual.maestroArtesano,
        categoria: actual.categoria,
        pinColor: actual.pinColor,
        direccion: actual.direccion,
        lat: actual.lat,
        lng: actual.lng,
        telefono: actual.telefono,
        whatsapp: actual.whatsapp,
        horario: actual.horario,
        historia: actual.historia,
        verificadoPorMunicipio: verificado,
        catalogo: actual.catalogo,
      );
    }
  }

  List<ReporteUrbanoModel> obtenerReportesLocales() =>
      List.unmodifiable(_cacheReportes);

  void guardarReporteLocal(ReporteUrbanoModel reporte) {
    _cacheReportes.insert(0, reporte);
  }

  void actualizarEstatusReporteLocal(String idReporte, String nuevoEstatus) {
    final index = _cacheReportes.indexWhere((r) => r.id == idReporte);
    if (index != -1) {
      final actual = _cacheReportes[index];
      _cacheReportes[index] = ReporteUrbanoModel(
        id: actual.id,
        fotoUrl: actual.fotoUrl,
        lat: actual.lat,
        lng: actual.lng,
        categoria: actual.categoria,
        folio: actual.folio,
        descripcion: actual.descripcion,
        direccionReferencia: actual.direccionReferencia,
        estatus: nuevoEstatus,
        fechaRegistro: actual.fechaRegistro,
      );
    }
  }
}
