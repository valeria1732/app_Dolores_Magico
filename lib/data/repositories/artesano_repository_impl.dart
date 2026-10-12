import '../../domain/entities/taller_artesano.dart';
import '../../domain/repositories/artesano_repository.dart';
import '../datasources/hive_local_datasource.dart';
import '../models/taller_artesano_model.dart';

/// Implementación del Patrón Repository (13.2): ArtesanoRepositoryImpl
/// Desacopla la lógica de negocio de las fuentes de datos (Cloud Firestore y Hive).
class ArtesanoRepositoryImpl implements ArtesanoRepository {
  final HiveLocalDataSource localDataSource;

  ArtesanoRepositoryImpl({required this.localDataSource});

  @override
  Future<List<TallerArtesano>> obtenerPuntosDeInteres() async {
    return localDataSource.obtenerTalleresLocales();
  }

  @override
  Future<List<TallerArtesano>> filtrarPorCategoria(String categoria) async {
    final todos = localDataSource.obtenerTalleresLocales();
    return todos.where((t) => t.categoria == categoria).toList();
  }

  @override
  Future<TallerArtesano> registrarNuevoTaller(TallerArtesano taller) async {
    final modelo = TallerArtesanoModel(
      id: taller.id,
      nombre: taller.nombre,
      maestroArtesano: taller.maestroArtesano,
      categoria: taller.categoria,
      pinColor: taller.pinColor,
      direccion: taller.direccion,
      lat: taller.lat,
      lng: taller.lng,
      telefono: taller.telefono,
      whatsapp: taller.whatsapp,
      horario: taller.horario,
      historia: taller.historia,
      verificadoPorMunicipio: false,
      catalogo: taller.catalogo,
    );
    localDataSource.agregarTallerLocal(modelo);
    return modelo;
  }

  @override
  Future<void> cambiarEstadoVerificacion(
      String idTaller, bool verificado) async {
    localDataSource.actualizarVerificacionTaller(idTaller, verificado);
  }
}
