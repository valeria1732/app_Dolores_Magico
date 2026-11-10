import 'package:flutter/material.dart';
import '../constants/app_colors.dart';

/// Tema Visual "Pueblo Mágico Dolores Hidalgo"
/// Implementa Material 3 con tipografía, contrastes, bordes y superficies
/// que reflejan la calidez de la cantera colonial y la elegancia de la Talavera.
class AppTheme {
  AppTheme._();

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.talaveraCobalto,
        primary: AppColors.talaveraCobalto,
        secondary: AppColors.talaveraTerracota,
        tertiary: AppColors.talaveraAmarilloAlfarero,
        surface: AppColors.talaveraBlancoPuro,
        background: AppColors.talaveraBlancoMarfil,
        surfaceTint: Colors.transparent,
      ),
      scaffoldBackgroundColor: AppColors.talaveraBlancoMarfil,

      // Barra superior con azul cobalto y detalles dorados
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.talaveraCobalto,
        foregroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
        titleTextStyle: TextStyle(
          fontFamily: 'serif',
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.white,
          letterSpacing: 0.5,
        ),
      ),

      // Tarjetas con estilo colonial y filete suave
      cardTheme: CardTheme(
        color: Colors.white,
        elevation: 2.5,
        shadowColor: AppColors.talaveraCobalto.withOpacity(0.12),
        margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(
            color: AppColors.talaveraGrisPerla,
            width: 1.2,
          ),
        ),
      ),

      // Botones con azul cobalto y bordes redondeados
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.talaveraCobalto,
          foregroundColor: Colors.white,
          elevation: 2,
          padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 15),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.3,
          ),
        ),
      ),

      // Botones secundarios con terracota artesanal
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.talaveraCobalto,
          side: const BorderSide(color: AppColors.talaveraCobalto, width: 1.5),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 13),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
      ),

      // Barra de navegación inferior con fondo marfil y acento cobalto
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: Colors.white,
        elevation: 4,
        indicatorColor: AppColors.talaveraCobalto.withOpacity(0.12),
        labelTextStyle: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: AppColors.talaveraCobalto,
            );
          }
          return const TextStyle(
            fontSize: 11.5,
            fontWeight: FontWeight.w500,
            color: Color(0xFF64748B),
          );
        }),
        iconTheme: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const IconThemeData(color: AppColors.talaveraCobalto, size: 26);
          }
          return const IconThemeData(color: Color(0xFF64748B), size: 23);
        }),
      ),

      // Campos de texto elegantes con bordes redondeados
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.talaveraGrisPerla, width: 1.2),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: AppColors.talaveraCobalto.withOpacity(0.2), width: 1.2),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.talaveraCobalto, width: 2),
        ),
        labelStyle: TextStyle(color: AppColors.talaveraCobalto.withOpacity(0.8)),
      ),

      // Chips decorativos
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.talaveraGrisPerla,
        selectedColor: AppColors.talaveraCobalto,
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
    );
  }
}
