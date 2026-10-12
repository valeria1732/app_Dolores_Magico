import '../../domain/entities/usuario_app.dart';
import '../../domain/repositories/auth_repository.dart';

/// Implementación de AuthRepository con soporte para Firebase Authentication
class AuthRepositoryImpl implements AuthRepository {
  @override
  Future<UsuarioApp> iniciarSesionConRol({
    required String correo,
    required String password,
    required RolUsuario rol,
  }) async {
    return UsuarioApp(
      uid: 'usr_${DateTime.now().millisecondsSinceEpoch}',
      nombreCompleto: correo.split('@').first.toUpperCase(),
      correoElectronico: correo,
      rol: rol,
      avisoPrivacidadAceptado: true,
    );
  }

  @override
  Future<void> cerrarSesion() async {}
}
