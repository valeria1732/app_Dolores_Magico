import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/dolores_constants.dart';
import '../../viewmodels/auth_viewmodel.dart';
import '../../widgets/talavera_decorations.dart';
import '../admin/admin_validacion_page.dart';
import '../auth/registro_artesano_page.dart';
import '../mapa/mapa_turistico_page.dart';
import '../reportes/reporte_ciudadano_page.dart';

/// Pantalla Principal (Home): DoloresMágico App
/// Diseño temático inspirado en la Cerámica Mayólica, la cantera de la Parroquia de Dolores
/// y las tradiciones insurgentes y gastronómicas de Dolores Hidalgo C.I.N., Guanajuato.
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
      _buildDashboardDolores(context, authVm),
      const MapaTuristicoPage(),
      const ReporteCiudadanoPage(),
      const RegistroArtesanoPage(),
      const AdminValidacionPage(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                color: AppColors.doradoVirreinal.withOpacity(0.2),
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.doradoVirreinal, width: 1.2),
              ),
              child: const Icon(
                Icons.notifications_active, // Campana de Dolores
                color: AppColors.doradoVirreinal,
                size: 18,
              ),
            ),
            const SizedBox(width: 9),
            const Text(
              'Dolores Mágico',
              style: TextStyle(
                fontFamily: 'serif',
                fontWeight: FontWeight.bold,
                letterSpacing: 0.8,
              ),
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12.0),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.talaveraBlancoMarfil,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.doradoVirreinal, width: 1.2),
              ),
              child: Row(
                children: [
                  const Icon(
                    Icons.account_circle,
                    size: 15,
                    color: AppColors.talaveraCobalto,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    authVm.rolActivo.name.toUpperCase(),
                    style: const TextStyle(
                      color: AppColors.talaveraCobalto,
                      fontSize: 10.5,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Cenefa decorativa estilo Azulejo de Talavera bajo la AppBar
          const TalaveraCenefa(height: 24),
          Expanded(child: paginas[_selectedIndex]),
        ],
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: AppColors.talaveraCobalto.withOpacity(0.08),
              blurRadius: 10,
              offset: const Offset(0, -3),
            ),
          ],
        ),
        child: NavigationBar(
          selectedIndex: _selectedIndex,
          onDestinationSelected: (int index) {
            setState(() {
              _selectedIndex = index;
            });
          },
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.temple_buddhist_outlined),
              selectedIcon: Icon(Icons.temple_buddhist, color: AppColors.talaveraCobalto),
              label: 'Patrimonio',
            ),
            NavigationDestination(
              icon: Icon(Icons.map_outlined),
              selectedIcon: Icon(Icons.map, color: AppColors.talaveraCobalto),
              label: 'Mapa Turístico',
            ),
            NavigationDestination(
              icon: Icon(Icons.camera_alt_outlined),
              selectedIcon: Icon(Icons.camera_alt, color: AppColors.talaveraTerracota),
              label: 'Reporte Urbano',
            ),
            NavigationDestination(
              icon: Icon(Icons.storefront_outlined),
              selectedIcon: Icon(Icons.storefront, color: AppColors.talaveraAmarilloAlfarero),
              label: 'Artesanos',
            ),
            NavigationDestination(
              icon: Icon(Icons.verified_user_outlined),
              selectedIcon: Icon(Icons.verified_user, color: AppColors.carmesiIndependencia),
              label: 'Validación',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDashboardDolores(BuildContext context, AuthViewModel authVm) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 18.0, vertical: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // =================================================================
          // 1. Banner Principal de Identidad Cultural (Talavera + 1810)
          // =================================================================
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [
                  AppColors.talaveraCobalto,
                  Color(0xFF07192C),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: AppColors.doradoVirreinal,
                width: 1.5,
              ),
              boxShadow: [
                BoxShadow(
                  color: AppColors.talaveraCobalto.withOpacity(0.35),
                  blurRadius: 12,
                  offset: const Offset(0, 5),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const PuebloMagicoBadge(inverted: true),
                const SizedBox(height: 10),
                const Text(
                  'Dolores Hidalgo C.I.N.',
                  style: TextStyle(
                    fontFamily: 'serif',
                    color: Colors.white,
                    fontSize: 23,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.6,
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Cuna de la Independencia Nacional • Capital de la Talavera Mayólica',
                  style: TextStyle(
                    color: AppColors.doradoClaro,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  DoloresConstants.appSlogan,
                  style: const TextStyle(
                    color: Colors.white70,
                    fontSize: 12.5,
                    fontStyle: FontStyle.italic,
                  ),
                ),
                const SizedBox(height: 14),
                // Franja de insignias culturales
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: [
                    _buildPillTag('🏺 Talavera Mayólica', AppColors.talaveraAzulCielo),
                    _buildPillTag('🍨 Nieves de Garrafa', AppColors.talaveraAmarilloAlfarero),
                    _buildPillTag('🔔 Ruta Insurgente 1810', AppColors.canteraRosa),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 22),

          // =================================================================
          // 2. Título de Secciones Turísticas y Cívicas
          // =================================================================
          Row(
            children: [
              Container(
                width: 4,
                height: 18,
                decoration: BoxDecoration(
                  color: AppColors.talaveraCobalto,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'Rutas Temáticas y Participación (PMV)',
                style: TextStyle(
                  fontSize: 16.5,
                  fontWeight: FontWeight.bold,
                  color: AppColors.talaveraCobalto,
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),

          // =================================================================
          // RUTA 1: EXPLORACIÓN EN MAPA CON PINES TEMÁTICOS (HU02)
          // =================================================================
          TalaveraCard(
            borderColor: AppColors.pinTalaveraAzul.withOpacity(0.4),
            onTap: () => setState(() => _selectedIndex = 1),
            child: Row(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: AppColors.pinTalaveraAzul,
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.pinTalaveraAzul.withOpacity(0.3),
                        blurRadius: 6,
                        offset: const Offset(0, 3),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.explore,
                    color: Colors.white,
                    size: 30,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Expanded(
                            child: Text(
                              'Mapa Turístico Interactivo',
                              style: TextStyle(
                                fontSize: 15.5,
                                fontWeight: FontWeight.bold,
                                color: AppColors.talaveraCobalto,
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppColors.pinTalaveraAzul.withOpacity(0.12),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: const Text(
                              'GPS EN VIVO',
                              style: TextStyle(
                                fontSize: 9.5,
                                fontWeight: FontWeight.bold,
                                color: AppColors.pinTalaveraAzul,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Explora Dolores Hidalgo mediante el código oficial de pines por color:',
                        style: TextStyle(fontSize: 11.5, color: Colors.black87),
                      ),
                      const SizedBox(height: 6),
                      Row(
                        children: [
                          _buildColorPinLegend(AppColors.pinTalaveraAzul, 'Talavera'),
                          const SizedBox(width: 10),
                          _buildColorPinLegend(AppColors.pinNievesAmarillo, 'Nieves'),
                          const SizedBox(width: 10),
                          _buildColorPinLegend(AppColors.pinHistoricoRojo, 'Sitios 1810'),
                        ],
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, size: 15, color: AppColors.talaveraCobalto),
              ],
            ),
          ),

          const SizedBox(height: 14),

          // =================================================================
          // RUTA 2: CATÁLOGO ARTESANAL Y CONTACTO DIRECTO (HU04)
          // =================================================================
          TalaveraCard(
            borderColor: AppColors.talaveraAmarilloAlfarero.withOpacity(0.5),
            onTap: () => setState(() => _selectedIndex = 3),
            child: Row(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: AppColors.talaveraAmarilloAlfarero,
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.talaveraAmarilloAlfarero.withOpacity(0.3),
                        blurRadius: 6,
                        offset: const Offset(0, 3),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.palette_outlined, // Alfarería y diseño
                    color: Colors.white,
                    size: 30,
                  ),
                ),
                const SizedBox(width: 14),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Talleres de Mayólica y Alfarería',
                        style: TextStyle(
                          fontSize: 15.5,
                          fontWeight: FontWeight.bold,
                          color: AppColors.talaveraCobalto,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Conoce a los maestros artesanos, galerías de vajillas, jarrones y azulejos con enlace directo por WhatsApp sin intermediarios.',
                        style: TextStyle(fontSize: 12, color: Colors.black54),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, size: 15, color: AppColors.talaveraCobalto),
              ],
            ),
          ),

          const SizedBox(height: 14),

          // =================================================================
          // RUTA 3: REPORTE CIUDADANO "DOLORES LIMPIO Y MÁGICO" (HU03)
          // =================================================================
          TalaveraCard(
            borderColor: AppColors.talaveraTerracota.withOpacity(0.5),
            onTap: () => setState(() => _selectedIndex = 2),
            child: Row(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: AppColors.talaveraTerracota,
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.talaveraTerracota.withOpacity(0.3),
                        blurRadius: 6,
                        offset: const Offset(0, 3),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.add_a_photo_outlined,
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
                        'Por un Dolores Mágico y Limpio',
                        style: TextStyle(
                          fontSize: 15.5,
                          fontWeight: FontWeight.bold,
                          color: AppColors.talaveraCobalto,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Reporta incidencias en empedrado colonial, luminarias o basura con cámara nativa, GPS y generación de folio oficial.',
                        style: TextStyle(fontSize: 12, color: Colors.black54),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, size: 15, color: AppColors.talaveraCobalto),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // =================================================================
          // Sello de Tradición de Dolores Hidalgo
          // =================================================================
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: AppColors.canteraRosa.withOpacity(0.12),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.canteraRosa.withOpacity(0.4)),
            ),
            child: const Row(
              children: [
                Icon(
                  Icons.verified_outlined,
                  color: AppColors.canteraRosaOscuro,
                  size: 22,
                ),
                SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'Proyecto Integral UTNG: Conectando la tradición centenaria de Dolores Hidalgo con el desarrollo móvil de vanguardia.',
                    style: TextStyle(
                      fontSize: 11.5,
                      color: AppColors.canteraRosaOscuro,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPillTag(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.5), width: 1),
      ),
      child: Text(
        text,
        style: TextStyle(
          color: color,
          fontSize: 10.5,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildColorPinLegend(Color color, String label) {
    return Row(
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 10.5,
            fontWeight: FontWeight.w600,
            color: color,
          ),
        ),
      ],
    );
  }
}
