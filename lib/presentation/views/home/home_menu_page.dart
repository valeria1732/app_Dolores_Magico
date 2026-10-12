import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/dolores_constants.dart';
import '../../viewmodels/auth_viewmodel.dart';
import '../admin/admin_validacion_page.dart';
import '../auth/registro_artesano_page.dart';
import '../mapa/mapa_turistico_page.dart';
import '../reportes/reporte_ciudadano_page.dart';

/// Pantalla 1: Home / Menú Principal — Diseño Conceptual (Sección 6 y 7)
/// Ofrece el selector directo entre:
/// 1. "Explorar Dolores Mágico (Ruta Artesanal/Gastronómica)"
/// 2. "Mi Comunidad (Reporte Urbano)"
class HomeMenuPage extends StatefulWidget {
  const HomeMenuPage({super.key});

  @override
  State<HomeMenuPage> createState() => _HomeMenuPageState();
}

class _HomeMenuPageState extends State<HomeMenuPage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final authVm = context.watch<AuthViewModel>();

    final List<Widget> paginas = [
      _buildDashboardPrincipal(context, authVm),
      const MapaTuristicoPage(),
      const ReporteCiudadanoPage(),
      const RegistroArtesanoPage(),
      const AdminValidacionPage(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          DoloresConstants.appName,
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12.0),
            child: Chip(
              backgroundColor: Colors.white,
              label: Text(
                'Rol: ${authVm.rolActivo.name.toUpperCase()}',
                style: const TextStyle(
                  color: AppColors.talaveraBlue,
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
      body: paginas[_selectedIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (int index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Inicio',
          ),
          NavigationDestination(
            icon: Icon(Icons.map_outlined),
            selectedIcon: Icon(Icons.map),
            label: 'Explorar Mapa',
          ),
          NavigationDestination(
            icon: Icon(Icons.camera_alt_outlined),
            selectedIcon: Icon(Icons.camera_alt),
            label: 'Reportar',
          ),
          NavigationDestination(
            icon: Icon(Icons.storefront_outlined),
            selectedIcon: Icon(Icons.storefront),
            label: 'Artesanos',
          ),
          NavigationDestination(
            icon: Icon(Icons.verified_user_outlined),
            selectedIcon: Icon(Icons.verified_user),
            label: 'Validación',
          ),
        ],
      ),
    );
  }

  Widget _buildDashboardPrincipal(
      BuildContext context, AuthViewModel authVm) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Banner de Identidad Cultural de Dolores Hidalgo
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [AppColors.talaveraBlue, AppColors.talaveraLight],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Cuna de la Independencia Nacional',
                  style: TextStyle(
                    color: Colors.amberAccent,
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                  ),
                ),
                SizedBox(height: 6),
                Text(
                  DoloresConstants.appName,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 6),
                Text(
                  DoloresConstants.appSlogan,
                  style: TextStyle(color: Colors.white70, fontSize: 13.5),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Selecciona un Módulo Principal (PMV):',
            style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 14),

          // OPCIÓN PRINCIPAL 1: EXPLORAR DOLORES MÁGICO (RUTA ARTESANAL/GASTRONÓMICA)
          Card(
            elevation: 3,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
            child: InkWell(
              borderRadius: BorderRadius.circular(14),
              onTap: () => setState(() => _selectedIndex = 1),
              child: const Padding(
                padding: EdgeInsets.all(18.0),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: AppColors.pinTalaveraAzul,
                      child: Icon(Icons.explore, color: Colors.white, size: 30),
                    ),
                    SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Explorar Dolores Mágico',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Ruta Artesanal y Gastronómica: Mapa GPS con pines Azules (Talavera), Amarillos (Nieves) y Rojos (Sitios Históricos).',
                            style: TextStyle(
                              fontSize: 12.5,
                              color: Colors.black54,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Icon(Icons.arrow_forward_ios, size: 16),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 14),

          // OPCIÓN PRINCIPAL 2: MI COMUNIDAD (REPORTE URBANO)
          Card(
            elevation: 3,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
            child: InkWell(
              borderRadius: BorderRadius.circular(14),
              onTap: () => setState(() => _selectedIndex = 2),
              child: const Padding(
                padding: EdgeInsets.all(18.0),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: AppColors.barroTerracota,
                      child: Icon(
                        Icons.add_a_photo,
                        color: Colors.white,
                        size: 28,
                      ),
                    ),
                    SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Mi Comunidad (Reporte Urbano)',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Reporta fallas de alumbrado, basura o vialidad con fotografía de cámara, GPS automático y folio de seguimiento.',
                            style: TextStyle(
                              fontSize: 12.5,
                              color: Colors.black54,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Icon(Icons.arrow_forward_ios, size: 16),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
