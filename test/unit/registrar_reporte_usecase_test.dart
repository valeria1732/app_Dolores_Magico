import 'package:flutter_test/flutter_test.dart';
import 'package:dolores_magico_app/core/services/firebase_singleton_service.dart';
import 'package:dolores_magico_app/data/datasources/firestore_remote_datasource.dart';
import 'package:dolores_magico_app/data/datasources/hive_local_datasource.dart';
import 'package:dolores_magico_app/data/repositories/reporte_repository_impl.dart';
import 'package:dolores_magico_app/domain/entities/reporte_urbano.dart';
import 'package:dolores_magico_app/domain/usecases/registrar_reporte_usecase.dart';

/// Estrategia Inicial de Pruebas — Sección 17 del Documento Técnico
/// Pruebas unitarias sobre validación de formularios, coordenadas GPS
/// y generación de folios de confirmación (`FOL-2026-DH-XXXX`).
void main() {
  late RegistrarReporteUseCase useCase;

  setUp(() {
    final firebaseSingleton = FirebaseSingletonService();
    final remoteDs = FirestoreRemoteDataSource(
      firebaseSingleton: firebaseSingleton,
    );
    final localDs = HiveLocalDataSource();
    final repo = ReporteRepositoryImpl(
      firestoreService: remoteDs,
      storageService: localDs,
    );
    useCase = RegistrarReporteUseCase(repo);
  });

  group('Pruebas Unitarias — RegistrarReporteUseCase (HU03)', () {
    test('Genera un folio único oficial FOL-2026-DH-XXXX al registrar reporte',
        () async {
      final reporteEntrada = ReporteUrbano(
        id: 'rep_test_01',
        fotoUrl: 'storage://evidencia_alumbrado.jpg',
        lat: 21.1567,
        lng: -100.9333,
        categoria: 'alumbrado',
        folio: '',
        descripcion: 'Luminaria apagada frente a taller de Talavera.',
        fechaRegistro: DateTime(2026, 10, 12),
      );

      final resultado = await useCase.execute(reporteEntrada);

      expect(resultado.folio.startsWith('FOL-2026-DH-'), isTrue);
      expect(resultado.estatus, equals('reportado'));
    });

    test('Lanza ArgumentError cuando la descripción está vacía', () async {
      final reporteInvalido = ReporteUrbano(
        id: 'rep_test_02',
        fotoUrl: 'storage://evidencia.jpg',
        lat: 21.1567,
        lng: -100.9333,
        categoria: 'vialidad',
        folio: '',
        descripcion: '   ',
        fechaRegistro: DateTime(2026, 10, 12),
      );

      expect(
        () => useCase.execute(reporteInvalido),
        throwsA(isA<ArgumentError>()),
      );
    });
  });
}
