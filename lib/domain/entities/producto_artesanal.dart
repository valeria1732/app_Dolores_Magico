/// <<Entity>> ProductoArtesanal — Capa de Dominio
/// Representa una pieza de Talavera, alfarería o nieve tradicional del catálogo.
class ProductoArtesanal {
  final String id;
  final String nombre;
  final double precioMxn;
  final String tecnicaElaboracion;
  final String imagenUrl;

  const ProductoArtesanal({
    required this.id,
    required this.nombre,
    required this.precioMxn,
    required this.tecnicaElaboracion,
    required this.imagenUrl,
  });
}
