import 'package:flutter/material.dart';

/// Paleta oficial de DoloresMágico App basada en el Diseño Conceptual (Sección 6)
/// Pines del Mapa: Azul (Talavera), Amarillo (Nieves), Rojo (Sitios Históricos)
class AppColors {
  AppColors._();

  // Colores institucionales e identidad Talavera Dolorense
  static const Color talaveraBlue = Color(0xFF0D47A1);
  static const Color talaveraLight = Color(0xFF1976D2);
  static const Color barroTerracota = Color(0xFFB45309);
  static const Color canteraCream = Color(0xFFF8FAFC);

  // Código Oficial de Pines Interactivos (Pantalla 2 - Sección 6)
  static const Color pinTalaveraAzul = Color(0xFF0D47A1);   // Azul: Talleres de Talavera
  static const Color pinNievesAmarillo = Color(0xFFF59E0B); // Amarillo: Neverías Tradicionales
  static const Color pinHistoricoRojo = Color(0xFFB91C1C);  // Rojo: Sitios Históricos 1810

  // Estados de Reporte Ciudadano (Pantalla 3 / HU03 & HU05)
  static const Color statusReportado = Color(0xFF2563EB);
  static const Color statusEnRevision = Color(0xFF7C3AED);
  static const Color statusEnAtencion = Color(0xFFD97706);
  static const Color statusResuelto = Color(0xFF16A34A);
}
