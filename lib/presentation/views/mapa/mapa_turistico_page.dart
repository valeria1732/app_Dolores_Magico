import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/dolores_constants.dart';
import '../../../domain/entities/taller_artesano.dart';
import '../../viewmodels/mapa_turistico_viewmodel.dart';
import '../catalogo/ficha_taller_artesano_page.dart';

/// Pantalla 2: Interacción Principal (Mapa & Ficha del Taller) — Sección 6 (HU02 y HU04)
/// Mapa interactivo de Dolores Hidalgo con pines diferenciados por color:
/// - 🔵 Azul: Talleres de Talavera
/// - 🟡 Amarillo: Neverías Tradicionales
/// - 🔴 Rojo: Sitios Históricos
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
        // Barra de búsqueda y filtros por color de pin (Azul, Amarillo, Rojo)
        Container(
          color: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          child: Column(
            children: [
              TextField(
                onChanged: mapaVm.actualizarBusqueda,
                decoration: InputDecoration(
                  hintText: 'Buscar taller de Talavera, nevería o museo...',
                  prefixIcon: const Icon(Icons.search),
                  isDense: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildChipFiltro(
                      mapaVm,
                      idCategoria: DoloresConstants.catTodas,
                      etiqueta: 'Todos',
                      colorPin: AppColors.talaveraBlue,
                    ),
                    const SizedBox(width: 8),
                    _buildChipFiltro(
                      mapaVm,
                      idCategoria: DoloresConstants.catTalavera,
                      etiqueta: '🔵 Talavera (Azul)',
                      colorPin: AppColors.pinTalaveraAzul,
                    ),
                    const SizedBox(width: 8),
                    _buildChipFiltro(
                      mapaVm,
                      idCategoria: DoloresConstants.catNieves,
                      etiqueta: '🟡 Nieves (Amarillo)',
                      colorPin: AppColors.pinNievesAmarillo,
                    ),
                    const SizedBox(width: 8),
                    _buildChipFiltro(
                      mapaVm,
                      idCategoria: DoloresConstants.catHistorico,
                      etiqueta: '🔴 Sitios Históricos (Rojo)',
                      colorPin: AppColors.pinHistoricoRojo,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        // Lienzo de Mapa Interactivo GPS y Lista de Pines Geolocalizados
        Expanded(
          child: mapaVm.cargandoMapa
              ? const Center(child: CircularProgressIndicator())
              : ListView.builder(
                  padding: const EdgeInsets.all(12),
                  itemCount: mapaVm.marcadoresVisibles.length,
                  itemBuilder: (context, index) {
                    final TallerArtesano punto =
                        mapaVm.marcadoresVisibles[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 10),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: _obtenerColorPin(punto.pinColor),
                          child: const Icon(
                            Icons.location_on,
                            color: Colors.white,
                          ),
                        ),
                        title: Text(
                          punto.nombre,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(
                          '${punto.maestroArtesano}\n📍 ${punto.direccion} (${punto.lat}, ${punto.lng})',
                        ),
                        isThreeLine: true,
                        trailing: const Icon(Icons.chevron_right),
                        onTap: () {
                          mapaVm.seleccionarPinTaller(punto);
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) =>
                                  FichaTallerArtesanoPage(taller: punto),
                            ),
                          );
                        },
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
      label: Text(etiqueta),
      selected: seleccionado,
      selectedColor: colorPin.withValues(alpha: 0.2),
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
        return AppColors.talaveraBlue;
    }
  }
}
