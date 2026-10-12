import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../core/constants/app_colors.dart';
import '../../../domain/entities/taller_artesano.dart';
import '../../viewmodels/mapa_turistico_viewmodel.dart';

/// Ficha Técnica y Catálogo del Artesano (Sección 5, 6 y HU04)
/// Muestra fotografías de productos, historia del taller, coordenadas GPS
/// y botón de contacto directo por WhatsApp / llamada sin intermediarios.
class FichaTallerArtesanoPage extends StatelessWidget {
  final TallerArtesano taller;

  const FichaTallerArtesanoPage({super.key, required this.taller});

  @override
  Widget build(BuildContext context) {
    final mapaVm = context.read<MapaTuristicoViewModel>();

    return Scaffold(
      appBar: AppBar(
        title: Text(taller.nombre),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Encabezado del Taller / Punto Histórico
            Row(
              children: [
                Chip(
                  label: Text(
                    taller.categoria.toUpperCase(),
                    style: const TextStyle(color: Colors.white),
                  ),
                  backgroundColor: AppColors.talaveraBlue,
                ),
                const SizedBox(width: 8),
                if (taller.verificadoPorMunicipio)
                  const Chip(
                    avatar: Icon(Icons.verified, color: Colors.green, size: 18),
                    label: Text('Taller Verificado'),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              'Titular: ${taller.maestroArtesano}',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 4),
            Text('📍 Dirección: ${taller.direccion}'),
            Text('🕒 Horario: ${taller.horario}'),
            Text('🌐 Coordenadas GPS: ${taller.lat}, ${taller.lng}'),
            const Divider(height: 28),

            // Historia del Taller
            const Text(
              'Historia y Tradición Artesanal',
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 6),
            Text(taller.historia),
            const SizedBox(height: 20),

            // Catálogo de Productos (Talavera / Nieves)
            if (taller.catalogo.isNotEmpty) ...[
              const Text(
                'Catálogo de Piezas y Productos (Precio Directo sin Comisiones)',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              ...taller.catalogo.map(
                (prod) => Card(
                  margin: const EdgeInsets.only(bottom: 10),
                  child: ListTile(
                    leading: const Icon(
                      Icons.local_offer,
                      color: AppColors.talaveraBlue,
                    ),
                    title: Text(
                      prod.nombre,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Text('Técnica: ${prod.tecnicaElaboracion}'),
                    trailing: Text(
                      '\$${prod.precioMxn.toStringAsFixed(0)} MXN',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                      ),
                    ),
                  ),
                ),
              ),
            ],
            const SizedBox(height: 20),

            // Botón de Contacto Directo por WhatsApp (HU04)
            if (taller.whatsapp.isNotEmpty)
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF16A34A),
                  ),
                  icon: const Icon(Icons.chat),
                  label: const Text(
                    'Contactar Directamente por WhatsApp (Sin Intermediarios)',
                  ),
                  onPressed: () async {
                    final uri = mapaVm.obtenerEnlaceWhatsapp(taller);
                    await launchUrl(uri, mode: LaunchMode.externalApplication);
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}
