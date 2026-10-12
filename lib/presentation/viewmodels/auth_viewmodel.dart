import 'package:flutter/foundation.dart';
import '../../domain/entities/usuario_app.dart';
import '../../domain/repositories/auth_repository.dart';

/// ViewModel: AuthViewModel — Capa de Presentación (MVVM)
/// Administra el estado de autenticación y el perfil diferenciado del usuario
/// (Turista/Visitante, Ciudadano Dolorense, Artesano/Comerciante o Administrador).
class AuthViewModel extends ChangeNotifier {
  final AuthRepository authRepository;

  UsuarioApp _usuarioActual = const UsuarioApp(
    uid: 'usr_demo_utng',
    nombreCompleto: 'Visitante Dolores Hidalgo',
    correoElectronico: 'turista@doloresmagico.mx',
    rol: RolUsuario.turista,
    avisoPrivacidadAceptado: true,
  );

  UsuarioApp get usuarioActual => _usuarioActual;
  RolUsuario get rolActivo => _usuarioActual.rol;

  AuthViewModel({required this.authRepository});

  void cambiarRolPerfil(RolUsuario nuevoRol, {String? nombrePersonalizado}) {
    _usuarioActual = UsuarioApp(
      uid: _usuarioActual.uid,
      nombreCompleto: nombrePersonalizado ?? _usuarioActual.nombreCompleto,
      correoElectronico: _usuarioActual.correoElectronico,
      rol: nuevoRol,
      avisoPrivacidadAceptado: true,
    );
    notifyListeners();
  }

  Future<void> iniciarSesion({
    required String correo,
    required String password,
    required RolUsuario rol,
  }) async {
    _usuarioActual = await authRepository.iniciarSesionConRol(
      correo: correo,
      password: password,
      rol: rol,
    );
    notifyListeners();
  }
}
