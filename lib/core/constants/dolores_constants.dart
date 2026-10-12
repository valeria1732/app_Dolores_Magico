/// Constantes geográficas y de negocio para el Municipio de Dolores Hidalgo C.I.N., Gto.
class DoloresConstants {
  DoloresConstants._();

  static const String appName = 'DoloresMágico App';
  static const String appSlogan =
      'Talavera, cultura y comunidad: la Cuna de la Independencia en tus manos.';

  // Coordenadas centrales: Jardín del Grande Hidalgo (Plaza Principal)
  static const double centerLatitude = 21.15605;
  static const double centerLongitude = -100.93245;
  static const double defaultZoom = 15.2;

  // Prefijo oficial para Folios de Reporte Ciudadano (HU03)
  static const String folioPrefix = 'FOL-2026-DH-';

  // Categorías del Mapa Interactivo (HU02)
  static const String catTodas = 'todas';
  static const String catTalavera = 'talavera';   // Pin Azul
  static const String catNieves = 'nieves';       // Pin Amarillo
  static const String catHistorico = 'historico'; // Pin Rojo

  // Tipos de incidencia urbana (Pantalla 3 - Reporte Ciudadano)
  static const List<Map<String, String>> tiposIncidencia = [
    {
      'id': 'alumbrado',
      'label': 'Alumbrado Público',
      'desc': 'Luminaria colonial apagada, parpadeo o poste dañado',
    },
    {
      'id': 'basura',
      'label': 'Acumulación de Basura',
      'desc': 'Contenedores desbordados en zonas turísticas o colonias',
    },
    {
      'id': 'vialidad',
      'label': 'Vialidad y Baches',
      'desc': 'Baches en empedrado tradicional o pavimento dañado',
    },
  ];
}
