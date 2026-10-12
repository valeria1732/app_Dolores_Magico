import '../entities/taller_artesano.dart';

/// Caso de Uso: ContactarArtesanoWhatsappUseCase (HU04)
/// Construye el enlace profundo (Deep Link) de WhatsApp y llamada telefónica
/// para promover el comercio justo y contacto directo sin intermediarios.
class ContactarArtesanoWhatsappUseCase {
  const ContactarArtesanoWhatsappUseCase();

  Uri construirUriWhatsapp(TallerArtesano taller, {String? piezaInteres}) {
    final String numeroLimpio =
        taller.whatsapp.replaceAll(RegExp(r'[^0-9]'), '');
    final String mensaje = piezaInteres != null
        ? 'Hola ${taller.maestroArtesano}, vi su taller "${taller.nombre}" en DoloresMágico App y me interesa consultar disponibilidad de: $piezaInteres.'
        : 'Hola ${taller.maestroArtesano}, encontré su taller "${taller.nombre}" en DoloresMágico App y me gustaría conocer su catálogo y ubicación.';

    return Uri.parse(
      'https://wa.me/$numeroLimpio?text=${Uri.encodeComponent(mensaje)}',
    );
  }

  Uri construirUriLlamada(TallerArtesano taller) {
    return Uri(scheme: 'tel', path: taller.telefono);
  }
}
