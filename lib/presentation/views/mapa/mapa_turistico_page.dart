import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/dolores_constants.dart';
import '../../../domain/entities/taller_artesano.dart';
import '../../viewmodels/mapa_turistico_viewmodel.dart';
import '../../widgets/talavera_decorations.dart';
import '../catalogo/ficha_taller_artesano_page.dart';

/// Pantalla 2: Mapa Turístico y Rutas de Dolores Hidalgo (HU02 y HU04)
/// Visualización con pines temáticos oficiales:
/// - 🔵 Azul Cobalto: Talleres de Cerámica Mayólica y Talavera
/// - 🟡 Amarillo Alfarero: Neverías Tradicionales de la Plaza Principal
/// - 🔴 Rojo Carmesí: Sitios Históricos de la Independencia (1810)
class MapaTuristicoPage extends StatefulWidget {
  const MapaTuristicoPage({super.key});

  @override
  State<MapaTuristicoPage> createState() => _MapaTuristicoPageState();
}

class _MapaTuristicoPageState extends State<MapaTuristicoPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<MapaTuristicoViewModel>().inicializarMapa();
    });
  }

  @override
  Widget build(BuildContext context) {
    final mapaVm = context.watch<MapaTuristicoViewModel>();

    return Column(
      children: [
        // ===================================================================
        // Barra Superior: Búsqueda y Filtros con Diseño Colonial
        // ===================================================================
        Container(
          color: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                onChanged: mapaVm.actualizarBusqueda,
                decoration: InputDecoration(
                  hintText: 'Buscar taller de Talavera, nevería tradicional...',
                  hintStyle: const TextStyle(fontSize: 13, color: Colors.black45),
                  prefixIcon: const Icon(Icons.search, color: AppColors.talaveraCobalto),
                  filled: true,
                  fillColor: AppColors.talaveraBlancoMarfil,
                  isDense: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: BorderSide(color: AppColors.talaveraCobalto.withOpacity(0.2)),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildChipFiltro(
                      mapaVm,
                      idCategoria: DoloresConstants.catTodas,
                      etiqueta: '🗺️ Todos',
                      colorPin: AppColors.talaveraCobalto,
                    ),
                    const SizedBox(width: 8),
                    _buildChipFiltro(
                      mapaVm,
                      idCategoria: DoloresConstants.catTalavera,
                      etiqueta: '🏺 Talavera (Azul)',
                      colorPin: AppColors.pinTalaveraAzul,
                    ),
                    const SizedBox(width: 8),
                    _buildChipFiltro(
                      mapaVm,
                      idCategoria: DoloresConstants.catNieves,
                      etiqueta: '🍨 Nieves (Amarillo)',
                      colorPin: AppColors.pinNievesAmarillo,
                    ),
                    const SizedBox(width: 8),
                    _buildChipFiltro(
                      mapaVm,
                      idCategoria: DoloresConstants.catHistorico,
                      etiqueta: '🔔 Historia 1810 (Rojo)',
                      colorPin: AppColors.pinHistoricoRojo,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        // Línea divisoria en dorado
        Container(height: 2, color: AppColors.doradoVirreinal.withOpacity(0.5)),

        // ===================================================================
        // Lista de Puntos y Talleres de Dolores Hidalgo
        // ===================================================================
        Expanded(
          child: mapaVm.cargandoMapa
              ? const Center(
                  child: CircularProgressIndicator(color: AppColors.talaveraCobalto),
                )
              : ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  itemCount: mapaVm.marcadoresVisibles.length,
                  itemBuilder: (context, index) {
                    final TallerArtesano punto = mapaVm.marcadoresVisibles[index];
                    final Color pinColor = _obtenerColorPin(punto.pinColor);

                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12.0),
                      child: TalaveraCard(
                        borderColor: pinColor.withOpacity(0.35),
                        onTap: () {
                          mapaVm.seleccionarPinTaller(punto);
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) => FichaTallerArtesanoPage(taller: punto),
                            ),
                          );
                        },
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Avatar temático según categoría
                            Container(
                              width: 50,
                              height: 50,
                              decoration: BoxDecoration(
                                color: pinColor,
                                borderRadius: BorderRadius.circular(14),
                                boxShadow: [
                                  BoxShadow(
                                    color: pinColor.withOpacity(0.35),
                                    blurRadius: 6,
                                    offset: const Offset(0, 3),
                                  ),
                                ],
                              ),
                              child: Icon(
                                _obtenerIconoCategoria(punto.pinColor),
                                color: Colors.white,
                                size: 26,
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Expanded(
                                        child: Text(
                                          punto.nombre,
                                          style: const TextStyle(
                                            fontSize: 15,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.talaveraCobalto,
                                          ),
                                        ),
                                      ),
                                      if (punto.verificadoPorMunicipio)
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: Colors.green.withOpacity(0.12),
                                            borderRadius: BorderRadius.circular(6),
                                            border: Border.all(color: Colors.green.withOpacity(0.4)),
                                          ),
                                          child: const Row(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              Icon(Icons.verified, size: 11, color: Colors.green),
                                              SizedBox(width: 3),
                                              Text(
                                                'OFICIAL',
                                                style: TextStyle(
                                                  fontSize: 9,
                                                  fontWeight: FontWeight.bold,
                                                  color: Colors.green,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                    ],
                                  ),
                                  const SizedBox(height: 3),
                                  Text(
                                    'Maestro: ${punto.maestroArtesano}',
                                    style: const TextStyle(
                                      fontSize: 12.5,
                                      fontWeight: FontWeight.w600,
                                      color: AppColors.talaveraTerracota,
                                    ),
                                  ),
                                  const SizedBox(height: 3),
                                  Text(
                                    '📍 ${punto.direccion}',
                                    style: const TextStyle(fontSize: 11.5, color: Colors.black54),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '🕒 ${punto.horario}',
                                    style: const TextStyle(fontSize: 11, color: Colors.black45),
                                  ),
                                ],
                              ),
                            ),
                            const Icon(
                              Icons.arrow_forward_ios,
                              size: 15,
                              color: AppColors.talaveraCobalto,
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildChipFiltro(
    MapaTuristicoViewModel vm, {
    required String idCategoria,
    required String etiqueta,
    required Color colorPin,
  }) {
    final bool seleccionado = vm.categoriaSeleccionada == idCategoria;
    return ChoiceChip(
      label: Text(
        etiqueta,
        style: TextStyle(
          fontSize: 12,
          fontWeight: seleccionado ? FontWeight.bold : FontWeight.w500,
          color: seleccionado ? Colors.white : AppColors.talaveraCobalto,
        ),
      ),
      selected: seleccionado,
      selectedColor: colorPin,
      backgroundColor: AppColors.talaveraBlancoMarfil,
      side: BorderSide(
        color: seleccionado ? colorPin : AppColors.talaveraCobalto.withOpacity(0.2),
        width: 1.2,
      ),
      onSelected: (_) => vm.filtrarPorCategoriaPin(idCategoria),
    );
  }

  Color _obtenerColorPin(String pinColor) {
    switch (pinColor) {
      case 'blue':
        return AppColors.pinTalaveraAzul;
      case 'yellow':
        return AppColors.pinNievesAmarillo;
      case 'red':
        return AppColors.pinHistoricoRojo;
      default:
        return AppColors.talaveraCobalto;
    }
  }

  IconData _obtenerIconoCategoria(String pinColor) {
    switch (pinColor) {
      case 'blue':
        return Icons.palette; // Talavera y Alfarería
      case 'yellow':
        return Icons.icecream; // Nieves de Garrafa
      case 'red':
        return Icons.account_balance; // Sitios Históricos 1810
      default:
        return Icons.place;
    }
  }
}
