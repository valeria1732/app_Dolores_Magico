import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../viewmodels/mapa_turistico_viewmodel.dart';
import '../../viewmodels/reporte_viewmodel.dart';
import '../../widgets/talavera_decorations.dart';

/// Panel de Validación y Moderación Municipal (HU05)
/// Diseño temático de "Gobierno Municipal y Preservación del Patrimonio - Dolores Hidalgo C.I.N."
class AdminValidacionPage extends StatelessWidget {
  const AdminValidacionPage({super.key});

  @override
  Widget build(BuildContext context) {
    final mapaVm = context.watch<MapaTuristicoViewModel>();
    final reporteVm = context.watch<ReporteViewModel>();

    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 18.0, vertical: 14.0),
      children: [
        // Banner Institucional Municipal
        TalaveraCard(
          borderColor: AppColors.carmesiIndependencia.withOpacity(0.4),
          child: Row(
            children: [
              Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: AppColors.carmesiIndependencia,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(
                  Icons.admin_panel_settings,
                  color: Colors.white,
                  size: 28,
                ),
              ),
              const SizedBox(width: 14),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Panel de Moderación Municipal',
                      style: TextStyle(
                        fontFamily: 'serif',
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppColors.talaveraCobalto,
                      ),
                    ),
                    SizedBox(height: 3),
                    Text(
                      'Supervisión y control de calidad de talleres de Talavera y folios ciudadanos de Dolores Hidalgo.',
                      style: TextStyle(fontSize: 11.5, color: Colors.black54),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 18),

        const Text(
          'Métricas Operativas del PMV:',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: AppColors.talaveraCobalto,
          ),
        ),
        const SizedBox(height: 12),

        // Tarjetas de Métricas
        Row(
          children: [
            Expanded(
              child: _buildMetricCard(
                titulo: 'Talleres y Sitios',
                conteo: '${mapaVm.marcadoresVisibles.length}',
                icono: Icons.storefront,
                color: AppColors.pinTalaveraAzul,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildMetricCard(
                titulo: 'Reportes Activos',
                conteo: '${reporteVm.historialReportes.length}',
                icono: Icons.report_problem_outlined,
                color: AppColors.talaveraTerracota,
              ),
            ),
          ],
        ),

        const SizedBox(height: 12),

        _buildMetricCard(
          titulo: 'Estado de Conexión en la Nube (Firebase)',
          conteo: 'Protegido con TLS 1.3 & AES-256',
          icono: Icons.cloud_done_outlined,
          color: AppColors.statusResuelto,
          isFullWidth: true,
        ),

        const SizedBox(height: 20),

        const Text(
          'Acciones de Supervisión Municipal:',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: AppColors.talaveraCobalto,
          ),
        ),
        const SizedBox(height: 10),

        TalaveraCard(
          padding: const EdgeInsets.all(14),
          child: Column(
            children: [
              ListTile(
                contentPadding: EdgeInsets.zero,
                leading: const CircleAvatar(
                  backgroundColor: AppColors.pinTalaveraAzul,
                  child: Icon(Icons.verified, color: Colors.white, size: 20),
                ),
                title: const Text(
                  'Validación de Talleres de Mayólica',
                  style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold),
                ),
                subtitle: const Text(
                  'Otorga el distintivo oficial "Hecho en Dolores Hidalgo, Gto." a nuevos artesanos.',
                  style: TextStyle(fontSize: 11.5),
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {},
              ),
              const Divider(height: 16),
              ListTile(
                contentPadding: EdgeInsets.zero,
                leading: const CircleAvatar(
                  backgroundColor: AppColors.talaveraTerracota,
                  child: Icon(Icons.assignment_turned_in, color: Colors.white, size: 20),
                ),
                title: const Text(
                  'Gestión y Despacho de Folios',
                  style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold),
                ),
                subtitle: const Text(
                  'Actualiza folios de "Pendiente" a "Atendido" notificando a los ciudadanos por FCM.',
                  style: TextStyle(fontSize: 11.5),
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {},
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMetricCard({
    required String titulo,
    required String conteo,
    required IconData icono,
    required Color color,
    bool isFullWidth = false,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.35), width: 1.4),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.08),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: isFullWidth ? CrossAxisAlignment.start : CrossAxisAlignment.center,
        children: [
          Icon(icono, color: color, size: 28),
          const SizedBox(height: 8),
          Text(
            conteo,
            style: TextStyle(
              fontSize: isFullWidth ? 15 : 22,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            titulo,
            textAlign: isFullWidth ? TextAlign.start : TextAlign.center,
            style: const TextStyle(fontSize: 11.5, color: Colors.black54),
          ),
        ],
      ),
    );
  }
}
