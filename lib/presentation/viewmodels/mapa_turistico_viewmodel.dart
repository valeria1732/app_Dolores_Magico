import 'package:flutter/foundation.dart';
import '../../core/constants/dolores_constants.dart';
import '../../domain/entities/taller_artesano.dart';
import '../../domain/usecases/contactar_artesano_whatsapp_usecase.dart';
import '../../domain/usecases/explorar_mapa_turistico_usecase.dart';

/// ViewModel: MapaTuristicoViewModel — Capa de Presentación (MVVM 13.1)
/// Administra los marcadores geolocalizados del mapa interactivo de Dolores Hidalgo,
/// el filtrado por color de pin (Azul: Talavera, Amarillo: Nieves, Rojo: Sitios Históricos)
/// y el taller actualmente seleccionado en el BottomSheet móvil.
class MapaTuristicoViewModel extends ChangeNotifier {
  final ExplorarMapaTuristicoUseCase explorarMapaUseCase;
  final ContactarArtesanoWhatsappUseCase contactarWhatsappUseCase;

  String _categoriaSeleccionada = DoloresConstants.catTodas;
  String get categoriaSeleccionada => _categoriaSeleccionada;

  String _busqueda = '';
  String get busqueda => _busqueda;

  List<TallerArtesano> _marcadoresVisibles = [];
  List<TallerArtesano> get marcadoresVisibles =>
      List.unmodifiable(_marcadoresVisibles);

  TallerArtesano? _tallerSeleccionado;
  TallerArtesano? get tallerSeleccionado => _tallerSeleccionado;

  bool _cargandoMapa = false;
  bool get cargandoMapa => _cargandoMapa;

  MapaTuristicoViewModel({
    required this.explorarMapaUseCase,
    required this.contactarWhatsappUseCase,
  });

  Future<void> inicializarMapa() async {
    _cargandoMapa = true;
    notifyListeners();

    _marcadoresVisibles = await explorarMapaUseCase.execute(
      categoria: _categoriaSeleccionada,
      consultaBusqueda: _busqueda,
    );

    _cargandoMapa = false;
    notifyListeners();
  }

  Future<void> filtrarPorCategoriaPin(String nuevaCategoria) async {
    _categoriaSeleccionada = nuevaCategoria;
    await inicializarMapa();
  }

  Future<void> actualizarBusqueda(String texto) async {
    _busqueda = texto;
    await inicializarMapa();
  }

  void seleccionarPinTaller(TallerArtesano? taller) {
    _tallerSeleccionado = taller;
    notifyListeners();
  }

  Uri obtenerEnlaceWhatsapp(TallerArtesano taller, {String? pieza}) {
    return contactarWhatsappUseCase.construirUriWhatsapp(
      taller,
      piezaInteres: pieza,
    );
  }
}
