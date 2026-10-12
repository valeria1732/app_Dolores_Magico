import '../entities/usuario_app.dart';

/// <<Interface>> AuthRepository — Capa de Dominio
/// Define el contrato de autenticación diferenciada con Firebase Authentication.
abstract class AuthRepository {
  Future<UsuarioApp> iniciarSesionConRol({
    required String correo,
    required String password,
    required RolUsuario rol,
  });

  Future<void> cerrarSesion();
}
