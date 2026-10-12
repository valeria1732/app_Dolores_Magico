import 'producto_artesanal.dart';

/// <<Entity>> TallerArtesano — Capa de Dominio (Clean Architecture)
/// Representa un punto de interés en el Mapa Interactivo de Dolores Hidalgo:
/// - Pin Azul ('talavera'): Talleres de Talavera y alfarería
/// - Pin Amarillo ('nieves'): Neverías tradicionales
/// - Pin Rojo ('historico'): Sitios históricos de la Independencia
class TallerArtesano {
  final String id;
  final String nombre;
  final String maestroArtesano;
  final String categoria; // 'talavera' | 'nieves' | 'historico'
  final String pinColor;  // 'blue' | 'yellow' | 'red'
  final String direccion;
  final double lat;
  final double lng;
  final String telefono;
  final String whatsapp;
  final String horario;
  final String historia;
  final bool verificadoPorMunicipio;
  final List<ProductoArtesanal> catalogo;

  const TallerArtesano({
    required this.id,
    required this.nombre,
    required this.maestroArtesano,
    required this.categoria,
    required this.pinColor,
    required this.direccion,
    required this.lat,
    required this.lng,
    required this.telefono,
    required this.whatsapp,
    required this.horario,
    required this.historia,
    this.verificadoPorMunicipio = true,
    this.catalogo = const [],
  });
}
