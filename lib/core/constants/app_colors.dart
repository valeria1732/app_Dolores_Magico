import 'package:flutter/material.dart';

/// Paleta Oficial "Herencia Dolorense" para DoloresMágico App
/// Inspirada en la Cerámica Mayólica virreinal, la cantera de la Parroquia de Dolores,
/// las nieves tradicionales de garrafa y los colores de la Cuna de la Independencia Nacional.
class AppColors {
  AppColors._();

  // =========================================================================
  // 1. Identidad de Cerámica Mayólica y Talavera Dolorense
  // =========================================================================
  /// Azul Cobalto Profundo: Tono principal de la mayólica y talavera dolorense
  static const Color talaveraCobalto = Color(0xFF0C2440);
  static const Color talaveraCobaltoClaro = Color(0xFF1E4E79);
  static const Color talaveraAzulCielo = Color(0xFF4A90E2);

  /// Blanco Cerámica / Marfil Vidriado: Base limpia y cálida para fondos
  static const Color talaveraBlancoMarfil = Color(0xFFFDFBF7);
  static const Color talaveraBlancoPuro = Color(0xFFFFFFFF);
  static const Color talaveraGrisPerla = Color(0xFFF1EFEA);

  /// Colores tradicionales de óxidos minerales en Talavera
  static const Color talaveraAmarilloAlfarero = Color(0xFFE5A93C); // Amarillo óxido
  static const Color talaveraNaranjaCalido = Color(0xFFDD6B20);    // Naranja artesanal
  static const Color talaveraVerdeOxido = Color(0xFF2E7D32);      // Verde cobre
  static const Color talaveraTerracota = Color(0xFFB84A28);        // Barro cocido

  // =========================================================================
  // 2. Identidad Colonial y Cuna de la Independencia (1810)
  // =========================================================================
  /// Cantera Rosa: El tono de la fachada barroca de la Parroquia de Nuestra Señora de los Dolores
  static const Color canteraRosa = Color(0xFFD48B7B);
  static const Color canteraRosaOscuro = Color(0xFFA6594C);

  /// Carmesí Insurgente: Homenaje al estandarte de 1810 y Don Miguel Hidalgo
  static const Color carmesiIndependencia = Color(0xFF9E1B1B);

  /// Dorado Virreinal / Campana de Dolores
  static const Color doradoVirreinal = Color(0xFFD4AF37);
  static const Color doradoClaro = Color(0xFFF6E08E);

  // =========================================================================
  // 3. Tradición Gastronómica: Nieves de Garrafa de la Plaza Principal
  // =========================================================================
  static const Color garambulloVioleta = Color(0xFF8E1A4D); // Nieve de Garambullo típica
  static const Color mantecadoCrema = Color(0xFFFFF3D6);   // Nieve de Mantecado

  // =========================================================================
  // 4. Código Oficial de Pines Temáticos en el Mapa (Pantalla 2 - HU02)
  // =========================================================================
  /// 🔵 Azul: Talleres Artesanales de Cerámica Mayólica y Talavera
  static const Color pinTalaveraAzul = Color(0xFF0C3875);

  /// 🟡 Amarillo: Neverías Tradicionales de la Plaza Principal
  static const Color pinNievesAmarillo = Color(0xFFE5A93C);

  /// 🔴 Rojo: Sitios Históricos de la Independencia (1810)
  static const Color pinHistoricoRojo = Color(0xFFA81C1C);

  // =========================================================================
  // 5. Semáforo de Estado para Reporte Ciudadano (HU03 & HU05)
  // =========================================================================
  static const Color statusReportado = Color(0xFF1E4E79);
  static const Color statusEnRevision = Color(0xFF7B1FA2);
  static const Color statusEnAtencion = Color(0xFFD97706);
  static const Color statusResuelto = Color(0xFF1B5E20);

  // Alias para mantener compatibilidad con código existente
  static const Color talaveraBlue = talaveraCobalto;
  static const Color talaveraLight = talaveraCobaltoClaro;
  static const Color barroTerracota = talaveraTerracota;
  static const Color canteraCream = talaveraBlancoMarfil;
}
