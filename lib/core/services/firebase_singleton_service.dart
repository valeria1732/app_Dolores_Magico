/// Patrón de Diseño 13.3: Singleton
/// Problema que resuelve: Permite controlar la existencia de una única instancia
/// de los servicios de Firebase (Authentication, Cloud Firestore, Cloud Storage y FCM)
/// compartidos por las diferentes capas de la aplicación móvil.
class FirebaseSingletonService {
  static final FirebaseSingletonService _instance =
      FirebaseSingletonService._internal();

  factory FirebaseSingletonService() => _instance;

  FirebaseSingletonService._internal();

  bool _isInitialized = false;
  bool get isInitialized => _isInitialized;

  // Referencias centralizadas a las colecciones de Cloud Firestore
  static const String collectionArtesanos = 'talleres_artesanos';
  static const String collectionReportes = 'reportes_ciudadanos';
  static const String collectionUsuarios = 'usuarios_dolores';
  static const String storageBucketReportes = 'evidencias_reportes_urbanos';

  Future<void> initializeFirebase() async {
    if (_isInitialized) return;
    // Inicializa Firebase Core, Auth, Firestore, Storage y FCM
    _isInitialized = true;
  }
}
