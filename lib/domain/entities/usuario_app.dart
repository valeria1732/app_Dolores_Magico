/// Perfiles de usuario diferenciados según Sección 3 y 5 del documento técnico:
/// - Turista/Visitante
/// - Ciudadano Dolorense
/// - Artesano/Comerciante
/// - Administrador Municipal (HU05)
enum RolUsuario {
  turista,
  ciudadano,
  artesano,
  administrador,
}

class UsuarioApp {
  final String uid;
  final String nombreCompleto;
  final String correoElectronico;
  final RolUsuario rol;
  final bool avisoPrivacidadAceptado;

  const UsuarioApp({
    required this.uid,
    required this.nombreCompleto,
    required this.correoElectronico,
    required this.rol,
    this.avisoPrivacidadAceptado = true,
  });
}
