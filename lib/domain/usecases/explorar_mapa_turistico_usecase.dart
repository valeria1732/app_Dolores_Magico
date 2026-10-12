import '../../core/constants/dolores_constants.dart';
import '../entities/taller_artesano.dart';
import '../repositories/artesano_repository.dart';

/// Caso de Uso: ExplorarMapaTuristicoUseCase (HU02)
/// Filtra los puntos de interés geolocalizados en Dolores Hidalgo:
/// - Azul ('talavera'): Talleres de Talavera
/// - Amarillo ('nieves'): Neverías Tradicionales
/// - Rojo ('historico'): Sitios Históricos de la Independencia
class ExplorarMapaTuristicoUseCase {
  final ArtesanoRepository repository;

  const ExplorarMapaTuristicoUseCase(this.repository);

  Future<List<TallerArtesano>> execute({
    String categoria = DoloresConstants.catTodas,
    String consultaBusqueda = '',
  }) async {
    final List<TallerArtesano> puntos =
        categoria == DoloresConstants.catTodas
            ? await repository.obtenerPuntosDeInteres()
            : await repository.filtrarPorCategoria(categoria);

    if (consultaBusqueda.trim().isEmpty) {
      return puntos;
    }

    final String q = consultaBusqueda.toLowerCase().trim();
    return puntos.where((t) {
      return t.nombre.toLowerCase().contains(q) ||
          t.maestroArtesano.toLowerCase().contains(q) ||
          t.direccion.toLowerCase().contains(q);
    }).toList();
  }
}
