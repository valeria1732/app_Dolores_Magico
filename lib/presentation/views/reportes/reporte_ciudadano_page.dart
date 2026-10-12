import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/dolores_constants.dart';
import '../../viewmodels/reporte_viewmodel.dart';

/// Pantalla 3: ReporteCiudadanoPage — Capa de Presentación (Vista/UI)
/// Implementa exactamente los métodos especificados en el Diagrama UML de Clases
/// (Sección 3 de Arquitectura):
/// - `+ displayForm()`
/// - `+ capturePhoto()`
/// - `+ showConfirmationFolio(folio: String)`
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
  /// Invoca al `ReporteViewModel.capturarFotoYUbicacion()` para activar la cámara
  /// y obtener las coordenadas GPS del teléfono.
  Future<void> capturePhoto() async {
    await context.read<ReporteViewModel>().capturarFotoYUbicacion();
  }

  /// Método UML: `+ showConfirmationFolio(folio: String)`
  /// Despliega la pantalla/diálogo de confirmación con el código/folio único generado.
  void showConfirmationFolio(String folio) {
    showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Row(
          children: [
            Icon(Icons.check_circle, color: AppColors.statusResuelto),
            SizedBox(width: 8),
            Expanded(child: Text('Reporte Ciudadano Registrado')),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Tu reporte ha sido almacenado en Firebase Firestore y Cloud Storage. Guarda tu folio oficial para seguimiento:',
            ),
            const SizedBox(height: 12),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.canteraCream,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.talaveraBlue),
              ),
              child: Text(
                folio,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppColors.talaveraBlue,
                ),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Aceptar'),
          ),
        ],
      ),
    );
  }

  /// Método UML: `+ displayForm()`
  /// Construye el formulario de Reporte Ciudadano con selector de incidencia,
  /// captura de fotografía, ubicación GPS automática y botón de envío.
  Widget displayForm(ReporteViewModel vm) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Módulo de Reporte Ciudadano (HU03)',
            style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 6),
          const Text(
            'Captura una fotografía de la incidencia urbana; la app adjuntará automáticamente tu ubicación GPS y generará un folio de seguimiento.',
            style: TextStyle(color: Colors.black54),
          ),
          const SizedBox(height: 16),

          // 1. Selección del tipo de problema (alumbrado, basura, vialidad)
          DropdownButtonFormField<String>(
            initialValue: _categoriaSeleccionada,
            decoration: const InputDecoration(
              labelText: 'Tipo de Incidencia Urbana',
              border: OutlineInputBorder(),
            ),
            items: DoloresConstants.tiposIncidencia
                .map(
                  (tipo) => DropdownMenuItem<String>(
                    value: tipo['id'],
                    child: Text(tipo['label']!),
                  ),
                )
                .toList(),
            onChanged: (val) {
              if (val != null) {
                setState(() => _categoriaSeleccionada = val);
              }
            },
          ),
          const SizedBox(height: 14),

          // 2. Botón para Captura de Fotografía con Cámara y Ubicación GPS
          OutlinedButton.icon(
            icon: const Icon(Icons.camera_alt),
            label: Text(
              vm.fotoCapturadaPath == null
                  ? 'Capturar Foto con Cámara y Obtener GPS'
                  : 'Fotografía y GPS Capturados (${vm.latActual}, ${vm.lngActual})',
            ),
            onPressed: capturePhoto,
          ),
          const SizedBox(height: 14),

          // 3. Dirección o punto de referencia
          TextField(
            controller: _direccionController,
            decoration: const InputDecoration(
              labelText: 'Calle / Referencia en Dolores Hidalgo',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 14),

          // 4. Descripción detallada del desperfecto urbano
          TextField(
            controller: _descripcionController,
            maxLines: 3,
            decoration: const InputDecoration(
              labelText: 'Descripción del problema urbano',
              hintText:
                  'Ej. Luminaria apagada frente a taller de Talavera o bache en calle...',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 18),

          if (vm.mensajeError != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Text(
                vm.mensajeError!,
                style: const TextStyle(color: Colors.red),
              ),
            ),

          // 5. Botón de Envío que invoca al ViewModel
          ElevatedButton.icon(
            icon: vm.state == ReporteState.cargandoEnvio
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : const Icon(Icons.send),
            label: Text(
              vm.state == ReporteState.cargandoEnvio
                  ? 'Cargando y enviando a Firebase...'
                  : 'Enviar Reporte y Generar Folio',
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
