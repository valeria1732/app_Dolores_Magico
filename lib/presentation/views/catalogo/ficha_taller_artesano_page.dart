import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../core/constants/app_colors.dart';
import '../../../domain/entities/taller_artesano.dart';
import '../../viewmodels/mapa_turistico_viewmodel.dart';
import '../../widgets/talavera_decorations.dart';

/// Ficha Técnica y Catálogo del Taller Artesano (HU04)
/// Diseño temático que resalta la artesanía y el comercio justo sin intermediarios
/// para los maestros alfareros y neveros de Dolores Hidalgo C.I.N.
class FichaTallerArtesanoPage extends StatelessWidget {
  final TallerArtesano taller;

  const FichaTallerArtesanoPage({super.key, required this.taller});

  @override
  Widget build(BuildContext context) {
    final mapaVm = context.read<MapaTuristicoViewModel>();

    return Scaffold(
      appBar: AppBar(
        title: Text(
          taller.nombre,
          style: const TextStyle(
            fontFamily: 'serif',
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
          ),
        ),
      ),
      body: Column(
        children: [
          const TalaveraCenefa(height: 20),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 14.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // =================================================================
                  // 1. Tarjeta Principal de Identidad del Taller
                  // =================================================================
                  TalaveraCard(
                    borderColor: AppColors.talaveraCobalto.withOpacity(0.35),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: AppColors.talaveraCobalto,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                taller.categoria.toUpperCase(),
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 0.6,
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            if (taller.verificadoPorMunicipio)
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.green.withOpacity(0.12),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: Colors.green.withOpacity(0.4)),
                                ),
                                child: const Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(Icons.verified, color: Colors.green, size: 14),
                                    SizedBox(width: 4),
                                    Text(
                                      'Certificado Municipal',
                                      style: TextStyle(
                                        fontSize: 10.5,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.green,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          taller.nombre,
                          style: const TextStyle(
                            fontFamily: 'serif',
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: AppColors.talaveraCobalto,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            const Icon(Icons.person, size: 16, color: AppColors.talaveraTerracota),
                            const SizedBox(width: 6),
                            Text(
                              'Maestro Artesano: ${taller.maestroArtesano}',
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                                color: AppColors.talaveraTerracota,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            const Icon(Icons.place, size: 16, color: AppColors.talaveraCobalto),
                            const SizedBox(width: 6),
                            Expanded(
                              child: Text(
                                taller.direccion,
                                style: const TextStyle(fontSize: 12.5, color: Colors.black87),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            const Icon(Icons.access_time, size: 16, color: Colors.black45),
                            const SizedBox(width: 6),
                            Text(
                              'Horario: ${taller.horario}',
                              style: const TextStyle(fontSize: 12, color: Colors.black54),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            const Icon(Icons.gps_fixed, size: 16, color: AppColors.pinTalaveraAzul),
                            const SizedBox(width: 6),
                            Text(
                              'GPS: ${taller.lat}, ${taller.lng}',
                              style: const TextStyle(fontSize: 11, color: Colors.black45),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 18),

                  // =================================================================
                  // 2. Historia y Tradición Centenaria
                  // =================================================================
                  TalaveraCard(
                    borderColor: AppColors.canteraRosa.withOpacity(0.5),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(Icons.auto_stories, color: AppColors.canteraRosaOscuro, size: 20),
                            SizedBox(width: 8),
                            Text(
                              'Historia y Tradición Dolorense',
                              style: TextStyle(
                                fontFamily: 'serif',
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: AppColors.talaveraCobalto,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          taller.historia,
                          style: const TextStyle(
                            fontSize: 13,
                            height: 1.45,
                            color: Colors.black87,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 18),

                  // =================================================================
                  // 3. Catálogo de Piezas de Mayólica / Productos
                  // =================================================================
                  if (taller.catalogo.isNotEmpty) ...[
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
                        const Expanded(
                          child: Text(
                            'Catálogo de Piezas (Precio Directo de Taller)',
                            style: TextStyle(
                              fontSize: 15.5,
                              fontWeight: FontWeight.bold,
                              color: AppColors.talaveraCobalto,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ...taller.catalogo.map(
                      (prod) => Padding(
                        padding: const EdgeInsets.only(bottom: 8.0),
                        child: TalaveraCard(
                          borderColor: AppColors.doradoVirreinal.withOpacity(0.35),
                          padding: const EdgeInsets.all(12),
                          child: Row(
                            children: [
                              Container(
                                width: 44,
                                height: 44,
                                decoration: BoxDecoration(
                                  color: AppColors.talaveraCobalto.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(color: AppColors.talaveraCobalto.withOpacity(0.2)),
                                ),
                                child: const Icon(
                                  Icons.palette_outlined,
                                  color: AppColors.talaveraCobalto,
                                  size: 22,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      prod.nombre,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 14,
                                        color: AppColors.talaveraCobalto,
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      'Técnica: ${prod.tecnicaElaboracion}',
                                      style: const TextStyle(fontSize: 11.5, color: Colors.black54),
                                    ),
                                  ],
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                decoration: BoxDecoration(
                                  color: AppColors.talaveraTerracota.withOpacity(0.12),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: AppColors.talaveraTerracota.withOpacity(0.4)),
                                ),
                                child: Text(
                                  '\$${prod.precioMxn.toStringAsFixed(0)} MXN',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 13,
                                    color: AppColors.talaveraTerracota,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],

                  const SizedBox(height: 24),

                  // =================================================================
                  // 4. Botón de Contacto Directo por WhatsApp (HU04)
                  // =================================================================
                  if (taller.whatsapp.isNotEmpty)
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF1E7E34), // Verde esmeralda WhatsApp
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          elevation: 3,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                            side: const BorderSide(color: AppColors.doradoVirreinal, width: 1.5),
                          ),
                        ),
                        icon: const Icon(Icons.chat_bubble_outline, size: 22),
                        label: const Text(
                          'Contactar por WhatsApp (Sin Comisiones)',
                          style: TextStyle(
                            fontSize: 14.5,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.3,
                          ),
                        ),
                        onPressed: () async {
                          final uri = mapaVm.obtenerEnlaceWhatsapp(taller);
                          await launchUrl(uri, mode: LaunchMode.externalApplication);
                        },
                      ),
                    ),
                  const SizedBox(height: 10),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
