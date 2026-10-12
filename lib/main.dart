import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/constants/dolores_constants.dart';
import 'core/services/firebase_singleton_service.dart';
import 'core/services/location_camera_singleton.dart';
import 'core/theme/app_theme.dart';
import 'data/datasources/firestore_remote_datasource.dart';
import 'data/datasources/hive_local_datasource.dart';
import 'data/repositories/artesano_repository_impl.dart';
import 'data/repositories/auth_repository_impl.dart';
import 'data/repositories/reporte_repository_impl.dart';
import 'domain/usecases/contactar_artesano_whatsapp_usecase.dart';
import 'domain/usecases/explorar_mapa_turistico_usecase.dart';
import 'domain/usecases/registrar_reporte_usecase.dart';
import 'presentation/viewmodels/auth_viewmodel.dart';
import 'presentation/viewmodels/mapa_turistico_viewmodel.dart';
import 'presentation/viewmodels/reporte_viewmodel.dart';
import 'presentation/views/home/home_menu_page.dart';

/// Punto de Entrada Principal de la Aplicación Móvil: DoloresMágico App
/// Materia: Desarrollo Móvil Integral — UTNG
/// Integrantes:
/// - Valeria Guadalupe Calvillo Mendoza (1223100392)
/// - María del Carmen Vargas Martínez (1220100084)
/// Arquitectura: MVVM integrada con Clean Architecture en Flutter & Dart.
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 1. Inicialización de Singletons (Sección 13.3)
  final firebaseSingleton = FirebaseSingletonService();
  await firebaseSingleton.initializeFirebase();
  final locationCameraSingleton = LocationCameraSingleton();

  // 2. Inicialización de la Capa de Datos (DataSources & Repositories - Sección 13.2)
  final hiveLocalDataSource = HiveLocalDataSource();
  final firestoreRemoteDataSource = FirestoreRemoteDataSource(
    firebaseSingleton: firebaseSingleton,
  );

  final artesanoRepository = ArtesanoRepositoryImpl(
    localDataSource: hiveLocalDataSource,
  );
  final reporteRepository = ReporteRepositoryImpl(
    firestoreService: firestoreRemoteDataSource,
    storageService: hiveLocalDataSource,
  );
  final authRepository = AuthRepositoryImpl();

  // 3. Inicialización de la Capa de Dominio (Casos de Uso)
  final explorarMapaUseCase = ExplorarMapaTuristicoUseCase(artesanoRepository);
  const contactarWhatsappUseCase = ContactarArtesanoWhatsappUseCase();
  final registrarReporteUseCase = RegistrarReporteUseCase(reporteRepository);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => AuthViewModel(authRepository: authRepository),
        ),
        ChangeNotifierProvider(
          create: (_) => MapaTuristicoViewModel(
            explorarMapaUseCase: explorarMapaUseCase,
            contactarWhatsappUseCase: contactarWhatsappUseCase,
          ),
        ),
        ChangeNotifierProvider(
          create: (_) => ReporteViewModel(
            reportesUseCase: registrarReporteUseCase,
            locationCameraService: locationCameraSingleton,
          ),
        ),
      ],
      child: const DoloresMagicoMobileApp(),
    ),
  );
}

class DoloresMagicoMobileApp extends StatelessWidget {
  const DoloresMagicoMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: DoloresConstants.appName,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const HomeMenuPage(),
    );
  }
}
