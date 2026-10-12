import '../../domain/entities/producto_artesanal.dart';
import '../../domain/entities/taller_artesano.dart';

/// Modelo de Datos (DTO): TallerArtesanoModel — Capa de Datos
/// Incluye el catálogo verificado de talleres de Talavera (Pin Azul),
/// neverías tradicionales (Pin Amarillo) y sitios históricos (Pin Rojo)
/// de Dolores Hidalgo C.I.N., Guanajuato.
class TallerArtesanoModel extends TallerArtesano {
  const TallerArtesanoModel({
    required super.id,
    required super.nombre,
    required super.maestroArtesano,
    required super.categoria,
    required super.pinColor,
    required super.direccion,
    required super.lat,
    required super.lng,
    required super.telefono,
    required super.whatsapp,
    required super.horario,
    required super.historia,
    super.verificadoPorMunicipio,
    super.catalogo,
  });

  static List<TallerArtesanoModel> obtenerSemillaDoloresHidalgo() {
    return const [
      // 🔵 PINES AZULES: TALLERES DE TALAVERA Y ALFARERÍA
      TallerArtesanoModel(
        id: 'tal-1',
        nombre: 'Taller Talavera y Alfarería San Gabriel',
        maestroArtesano: 'Mtro. Javier Cortés y Familia',
        categoria: 'talavera',
        pinColor: 'blue',
        direccion: 'Calle Michoacán #28, Barrio San Juan, Dolores Hidalgo',
        lat: 21.1578,
        lng: -100.9308,
        telefono: '+524181820491',
        whatsapp: '524181820491',
        horario: 'Lunes a Sábado 09:00 - 18:30 hrs',
        historia:
            'Taller fundado hace 38 años especializado en mayólica virreinal novohispana con vidriado de estaño y óxidos minerales cocidos a 1,050 °C.',
        verificadoPorMunicipio: true,
        catalogo: [
          ProductoArtesanal(
            id: 'prod-101',
            nombre: 'Tibor Colonial Policromado (45 cm)',
            precioMxn: 1850.0,
            tecnicaElaboracion: 'Pintado a mano alzada con pluma natural',
            imagenUrl: 'assets/images/tibor_talavera.jpg',
          ),
          ProductoArtesanal(
            id: 'prod-102',
            nombre: 'Vajilla de 6 Platos Trinche Talavera Azul Cobalto',
            precioMxn: 980.0,
            tecnicaElaboracion: 'Esmalte vidriado libre de plomo',
            imagenUrl: 'assets/images/platos_talavera.jpg',
          ),
        ],
      ),
      TallerArtesanoModel(
        id: 'tal-2',
        nombre: 'Cerámica y Mayólica El Relicario',
        maestroArtesano: 'Mtra. Rosa María Prado',
        categoria: 'talavera',
        pinColor: 'blue',
        direccion: 'Calle Puebla #42, Centro Histórico, Dolores Hidalgo',
        lat: 21.1568,
        lng: -100.9338,
        telefono: '+524181821105',
        whatsapp: '524181821105',
        horario: 'Lunes a Domingo 09:30 - 19:30 hrs',
        historia:
            'Taller encabezado por maestras alfareras con más de 25 años decorando azulejos historiados, lavamanos barrocos y macetas de gran formato.',
        verificadoPorMunicipio: true,
        catalogo: [
          ProductoArtesanal(
            id: 'prod-104',
            nombre: 'Mural de 12 Azulejos "Cuna de la Independencia"',
            precioMxn: 1600.0,
            tecnicaElaboracion: 'Azulejería fina policromada',
            imagenUrl: 'assets/images/mural_azulejos.jpg',
          ),
        ],
      ),
      // 🟡 PINES AMARILLOS: NEVERÍAS TRADICIONALES
      TallerArtesanoModel(
        id: 'nie-1',
        nombre: 'Nieves Tradicionales La Flor de Dolores',
        maestroArtesano: 'Doña Esperanza Barajas',
        categoria: 'nieves',
        pinColor: 'yellow',
        direccion: 'Portal Morelos #8, Jardín del Grande Hidalgo',
        lat: 21.1558,
        lng: -100.9322,
        telefono: '+524181820123',
        whatsapp: '524181820123',
        horario: 'Lunes a Domingo 10:00 - 21:30 hrs',
        historia:
            'Nevería emblemática desde 1948. Elaboración artesanal en barricas de madera de encino con hielo y sal de grano.',
        verificadoPorMunicipio: true,
        catalogo: [
          ProductoArtesanal(
            id: 'prod-201',
            nombre: 'Nieve de Garambullo del Semidesierto (Litro)',
            precioMxn: 120.0,
            tecnicaElaboracion: 'Fruto de cactácea local batido en barrica',
            imagenUrl: 'assets/images/nieve_garambullo.jpg',
          ),
          ProductoArtesanal(
            id: 'prod-202',
            nombre: 'Nieve de Mantecado Colonial y Frutos Secos (Litro)',
            precioMxn: 125.0,
            tecnicaElaboracion: 'Receta tradicional con canela, nuez y pasas',
            imagenUrl: 'assets/images/nieve_mantecado.jpg',
          ),
        ],
      ),
      // 🔴 PINES ROJOS: SITIOS HISTÓRICOS DE LA INDEPENDENCIA
      TallerArtesanoModel(
        id: 'his-1',
        nombre: 'Parroquia de Nuestra Señora de los Dolores',
        maestroArtesano: 'Monumento Histórico Nacional (INAH)',
        categoria: 'historico',
        pinColor: 'red',
        direccion: 'Plaza Principal s/n, Centro Histórico, Dolores Hidalgo',
        lat: 21.1564,
        lng: -100.9324,
        telefono: '+524181820038',
        whatsapp: '',
        horario: 'Lunes a Domingo 07:00 - 20:00 hrs',
        historia:
            'Recinto histórico donde la madrugada del 16 de septiembre de 1810 el cura Don Miguel Hidalgo y Costilla convocó al pueblo a iniciar la Independencia de México.',
        verificadoPorMunicipio: true,
        catalogo: [],
      ),
      TallerArtesanoModel(
        id: 'his-2',
        nombre: 'Museo Casa de Don Miguel Hidalgo y Costilla',
        maestroArtesano: 'Secretaría de Cultura / INAH',
        categoria: 'historico',
        pinColor: 'red',
        direccion: 'Calle Morelos #1 esq. Hidalgo, Centro Histórico',
        lat: 21.1552,
        lng: -100.9318,
        telefono: '+524181820271',
        whatsapp: '',
        horario: 'Martes a Domingo 09:00 - 17:00 hrs',
        historia:
            'Casona del siglo XVIII habitada por Don Miguel Hidalgo; resguarda mobiliario original, biblioteca y estandartes insurgentes.',
        verificadoPorMunicipio: true,
        catalogo: [],
      ),
    ];
  }
}
