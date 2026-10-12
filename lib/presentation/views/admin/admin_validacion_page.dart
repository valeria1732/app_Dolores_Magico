import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../viewmodels/mapa_turistico_viewmodel.dart';
import '../../viewmodels/reporte_viewmodel.dart';

/// Panel de Administración y Validación Municipal (HU05)
/// Permite validar registros de artesanos y dar seguimiento a folios ciudadanos.
class AdminValidacionPage extends StatelessWidget {
  const AdminValidacionPage({super.key});

  @override
  Widget build(BuildContext context) {
    final mapaVm = context.watch<MapaTuristicoViewModel>();
    final reporteVm = context.watch<ReporteViewModel>();

    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        const Text(
          'Panel de Validación Municipal (HU05)',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        Text(
          'Talleres y Sitios Registrados: ${mapaVm.marcadoresVisibles.length}',
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: 8),
        Text(
          'Reportes Ciudadanos generados en sesión: ${reporteVm.historialReportes.length}',
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ],
    );
  }
}
