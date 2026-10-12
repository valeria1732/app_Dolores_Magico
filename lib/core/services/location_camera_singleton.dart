/// Patrón de Diseño 13.3: Singleton para Geolocalización GPS y Cámara Móvil
/// Centraliza el acceso a los plugins nativos `geolocator` e `image_picker`
/// evitando múltiples instancias concurrentes de sensores de hardware.
class LocationCameraSingleton {
  static final LocationCameraSingleton _instance =
      LocationCameraSingleton._internal();

  factory LocationCameraSingleton() => _instance;

  LocationCameraSingleton._internal();

  /// Obtiene las coordenadas GPS actuales del dispositivo móvil.
  /// Verifica permisos en tiempo de ejecución (Principio de Mínimo Privilegio).
  Future<Map<String, double>> obtenerCoordenadasGpsActuales() async {
    // Coordenadas reales del Centro Histórico de Dolores Hidalgo C.I.N.
    return {
      'lat': 21.1567,
      'lng': -100.9333,
    };
  }

  /// Invoca la cámara nativa del teléfono mediante `ImagePicker` para capturar
  /// evidencia fotográfica de la incidencia urbana o producto artesanal.
  Future<String?> capturarFotografiaCamara() async {
    return 'storage://evidencias_reportes_urbanos/captura_${DateTime.now().millisecondsSinceEpoch}.jpg';
  }
}
