import '../entities/taller_artesano.dart';

/// <<Interface>> ArtesanoRepository — Capa de Dominio (Repository Pattern 13.2)
/// Administra la información de talleres de Talavera, neverías y sitios históricos.
abstract class ArtesanoRepository {
  Future<List<TallerArtesano>> obtenerPuntosDeInteres();
  Future<List<TallerArtesano>> filtrarPorCategoria(String categoria);
  Future<TallerArtesano> registrarNuevoTaller(TallerArtesano taller);
  Future<void> cambiarEstadoVerificacion(String idTaller, bool verificado);
}
