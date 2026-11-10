import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/dolores_constants.dart';
import '../../viewmodels/reporte_viewmodel.dart';
import '../../widgets/talavera_decorations.dart';

/// Pantalla 3: ReporteCiudadanoPage — Capa de Presentación (Vista/UI)
/// Implementa los métodos especificados en el Diagrama UML de Clases:
/// - `+ displayForm()`
/// - `+ capturePhoto()`
/// - `+ showConfirmationFolio(folio: String)`
/// Rediseñado con la temática cultural de preservación del patrimonio de Dolores Hidalgo.
class ReporteCiudadanoPage extends StatefulWidget {
  const ReporteCiudadanoPage({super.key});

  @override
  State<ReporteCiudadanoPage> createState() => _ReporteCiudadanoPageState();
}

class _ReporteCiudadanoPageState extends State<ReporteCiudadanoPage> {
  final TextEditingController _descripcionController = TextEditingController();
  final TextEditingController _direccionController = TextEditingController(
    text: 'Calle Puebla esq. Hidalgo, Centro Histórico',
  );
  String _categoriaSeleccionada = 'alumbrado';

  @override
  void dispose() {
    _descripcionController.dispose();
    _direccionController.dispose();
    super.dispose();
  }

  /// Método UML: `+ capturePhoto()`
  Future<void> capturePhoto() async {
    await context.read<ReporteViewModel>().capturarFotoYUbicacion();
  }

  /// Método UML: `+ showConfirmationFolio(folio: String)`
  void showConfirmationFolio(String folio) {
    showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: AppColors.doradoVirreinal, width: 1.6),
        ),
        title: const Row(
          children: [
            Icon(Icons.verified, color: AppColors.statusResuelto, size: 28),
            SizedBox(width: 10),
            Expanded(
              child: Text(
                'Folio Oficial Generado',
                style: TextStyle(
                  fontFamily: 'serif',
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  color: AppColors.talaveraCobalto,
                ),
              ),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Tu reporte ciudadano ha sido transmitido de forma segura a Firebase y al sistema municipal de Dolores Hidalgo. Guarda tu folio único para seguimiento:',
              style: TextStyle(fontSize: 13, height: 1.4),
            ),
            const SizedBox(height: 14),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 12),
              decoration: BoxDecoration(
                color: AppColors.talaveraCobalto,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.doradoVirreinal, width: 1.4),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.talaveraCobalto.withOpacity(0.2),
                    blurRadius: 8,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Text(
                folio,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 19,
                  letterSpacing: 1.2,
                  fontWeight: FontWeight.bold,
                  color: AppColors.doradoClaro,
                ),
              ),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.talaveraCobalto,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Entendido', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  /// Método UML: `+ displayForm()`
  Widget displayForm(ReporteViewModel vm) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 18.0, vertical: 14.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Banner temático de Cuidado del Patrimonio
          TalaveraCard(
            borderColor: AppColors.talaveraTerracota.withOpacity(0.4),
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: AppColors.talaveraTerracota.withOpacity(0.12),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.location_city,
                    color: AppColors.talaveraTerracota,
                    size: 26,
                  ),
                ),
                const SizedBox(width: 14),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Por un Dolores Limpio y Mágico',
                        style: TextStyle(
                          fontFamily: 'serif',
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: AppColors.talaveraCobalto,
                        ),
                      ),
                      SizedBox(height: 3),
                      Text(
                        'Reporta baches en empedrado, fallas en luminarias coloniales o basura en zonas turísticas.',
                        style: TextStyle(fontSize: 11.5, color: Colors.black54),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          // 1. Selector de Incidencia
          const Text(
            '1. Tipo de Incidencia Patrimonial / Urbana:',
            style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: AppColors.talaveraCobalto),
          ),
          const SizedBox(height: 8),
          DropdownButtonFormField<String>(
            initialValue: _categoriaSeleccionada,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            items: DoloresConstants.tiposIncidencia
                .map(
                  (tipo) => DropdownMenuItem<String>(
                    value: tipo['id'],
                    child: Text(
                      tipo['label']!,
                      style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w600),
                    ),
                  ),
                )
                .toList(),
            onChanged: (val) {
              if (val != null) {
                setState(() => _categoriaSeleccionada = val);
              }
            },
          ),

          const SizedBox(height: 16),

          // 2. Captura Fotográfica con Marco de Cerámica
          const Text(
            '2. Evidencia Fotográfica y GPS Automático:',
            style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: AppColors.talaveraCobalto),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                color: vm.fotoCapturadaPath == null
                    ? AppColors.talaveraCobalto.withOpacity(0.3)
                    : Colors.green,
                width: 1.4,
              ),
            ),
            child: Column(
              children: [
                Icon(
                  vm.fotoCapturadaPath == null
                      ? Icons.add_a_photo_outlined
                      : Icons.check_circle_outline,
                  color: vm.fotoCapturadaPath == null
                      ? AppColors.talaveraCobalto
                      : Colors.green,
                  size: 38,
                ),
                const SizedBox(height: 8),
                Text(
                  vm.fotoCapturadaPath == null
                      ? 'Toma la foto del problema en Dolores Hidalgo'
                      : '¡Foto capturada y comprimida < 500 KB!',
                  style: TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w600,
                    color: vm.fotoCapturadaPath == null
                        ? Colors.black87
                        : Colors.green.shade800,
                  ),
                ),
                if (vm.latActual != 0.0) ...[
                  const SizedBox(height: 4),
                  Text(
                    '📍 GPS: ${vm.latActual.toStringAsFixed(5)}, ${vm.lngActual.toStringAsFixed(5)}',
                    style: const TextStyle(fontSize: 11, color: Colors.black54),
                  ),
                ],
                const SizedBox(height: 10),
                OutlinedButton.icon(
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.talaveraCobalto,
                    side: const BorderSide(color: AppColors.talaveraCobalto, width: 1.2),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  icon: const Icon(Icons.camera_alt, size: 18),
                  label: Text(
                    vm.fotoCapturadaPath == null ? 'Activar Cámara' : 'Volver a Capturar',
                  ),
                  onPressed: capturePhoto,
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // 3. Dirección o punto de referencia
          const Text(
            '3. Dirección o Referencia en Dolores Hidalgo:',
            style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: AppColors.talaveraCobalto),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _direccionController,
            decoration: InputDecoration(
              hintText: 'Ej. Calle Puebla frente a Casa de Hidalgo...',
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),

          const SizedBox(height: 16),

          // 4. Descripción detallada
          const Text(
            '4. Descripción del desperfecto:',
            style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: AppColors.talaveraCobalto),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _descripcionController,
            maxLines: 3,
            decoration: InputDecoration(
              hintText: 'Describe el problema para que la cuadrilla municipal lo ubique fácilmente...',
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),

          const SizedBox(height: 20),

          if (vm.mensajeError != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.red.shade200),
                ),
                child: Text(
                  vm.mensajeError!,
                  style: TextStyle(color: Colors.red.shade800, fontSize: 12.5),
                ),
              ),
            ),

          // 5. Botón de Envío
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.talaveraCobalto,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 16),
              elevation: 3,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
                side: const BorderSide(color: AppColors.doradoVirreinal, width: 1.2),
              ),
            ),
            icon: vm.state == ReporteState.cargandoEnvio
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : const Icon(Icons.send_rounded),
            label: Text(
              vm.state == ReporteState.cargandoEnvio
                  ? 'Registrando en la Nube...'
                  : 'Enviar Reporte y Generar Folio',
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
            ),
            onPressed: vm.state == ReporteState.cargandoEnvio
                ? null
                : () async {
                    if (vm.fotoCapturadaPath == null) {
                      await capturePhoto();
                    }
                    final resultado = await vm.enviarReporte(
                      _descripcionController.text,
                      _categoriaSeleccionada,
                      direccionReferencia: _direccionController.text,
                    );
                    if (resultado != null && mounted) {
                      _descripcionController.clear();
                      showConfirmationFolio(resultado.folio);
                    }
                  },
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final reporteVm = context.watch<ReporteViewModel>();
    return displayForm(reporteVm);
  }
}
