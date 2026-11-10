import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

/// Dibujador personalizado (CustomPainter) de Cenefa de Talavera Mayólica
/// Genera patrones geométricos y florales tradicionales de los azulejos de Dolores Hidalgo,
/// 100% nativo en código vectorial sin necesidad de imágenes externas.
class TalaveraPatternPainter extends CustomPainter {
  final Color primaryColor;
  final Color secondaryColor;
  final Color accentColor;
  final Color baseColor;

  const TalaveraPatternPainter({
    this.primaryColor = AppColors.talaveraCobalto,
    this.secondaryColor = AppColors.talaveraTerracota,
    this.accentColor = AppColors.talaveraAmarilloAlfarero,
    this.baseColor = AppColors.talaveraBlancoMarfil,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // Fondo cerámico
    final bgPaint = Paint()..color = baseColor;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final tileSize = size.height;
    final int tileCount = (size.width / tileSize).ceil() + 1;

    for (int i = 0; i < tileCount; i++) {
      final double startX = i * tileSize;
      final center = Offset(startX + tileSize / 2, size.height / 2);
      final radius = tileSize * 0.42;

      // 1. Marco exterior cuadrado del azulejo
      final borderPaint = Paint()
        ..color = primaryColor.withOpacity(0.35)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.0;
      canvas.drawRect(Rect.fromLTWH(startX, 0, tileSize, size.height), borderPaint);

      // 2. Rombo central mayólica (Cobalto)
      final romboPath = Path()
        ..moveTo(center.dx, center.dy - radius)
        ..lineTo(center.dx + radius, center.dy)
        ..lineTo(center.dx, center.dy + radius)
        ..lineTo(center.dx - radius, center.dy)
        ..close();

      final romboPaint = Paint()
        ..color = primaryColor.withOpacity(0.15)
        ..style = PaintingStyle.fill;
      canvas.drawPath(romboPath, romboPaint);

      final romboStroke = Paint()
        ..color = primaryColor
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.6;
      canvas.drawPath(romboPath, romboStroke);

      // 3. Pétalos florales de Talavera (8 direcciones)
      final petalPaint = Paint()
        ..color = primaryColor
        ..style = PaintingStyle.fill;

      for (int a = 0; a < 8; a++) {
        final double angle = (a * 45) * math.pi / 180;
        final double dist = radius * 0.58;
        final petalCenter = Offset(
          center.dx + math.cos(angle) * dist,
          center.dy + math.sin(angle) * dist,
        );

        final pColor = (a % 2 == 0) ? primaryColor : secondaryColor;
        canvas.drawCircle(petalCenter, radius * 0.16, Paint()..color = pColor);
      }

      // 4. Centro solar en amarillo óxido de Talavera
      canvas.drawCircle(
        center,
        radius * 0.28,
        Paint()..color = accentColor,
      );
      canvas.drawCircle(
        center,
        radius * 0.14,
        Paint()..color = primaryColor,
      );

      // 5. Esquinas con acento terracota
      final cornerPaint = Paint()..color = secondaryColor.withOpacity(0.7);
      final double cornerDist = tileSize * 0.12;
      canvas.drawCircle(Offset(startX + cornerDist, cornerDist), 2.5, cornerPaint);
      canvas.drawCircle(Offset(startX + tileSize - cornerDist, cornerDist), 2.5, cornerPaint);
      canvas.drawCircle(Offset(startX + cornerDist, size.height - cornerDist), 2.5, cornerPaint);
      canvas.drawCircle(Offset(startX + tileSize - cornerDist, size.height - cornerDist), 2.5, cornerPaint);
    }

    // Línea divisoria inferior en dorado virreinal
    final goldLinePaint = Paint()
      ..color = AppColors.doradoVirreinal
      ..strokeWidth = 2.5;
    canvas.drawLine(Offset(0, size.height - 1.2), Offset(size.width, size.height - 1.2), goldLinePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Barra o Cenefa decorativa de Talavera Mayólica
class TalaveraCenefa extends StatelessWidget {
  final double height;

  const TalaveraCenefa({super.key, this.height = 36.0});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      width: double.infinity,
      child: const CustomPaint(
        painter: TalaveraPatternPainter(),
      ),
    );
  }
}

/// Distintivo oficial "Pueblo Mágico • Dolores Hidalgo C.I.N."
class PuebloMagicoBadge extends StatelessWidget {
  final bool inverted;

  const PuebloMagicoBadge({super.key, this.inverted = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: inverted
            ? AppColors.talaveraCobalto
            : AppColors.doradoVirreinal.withOpacity(0.15),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppColors.doradoVirreinal,
          width: 1.2,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.stars_rounded,
            color: inverted ? AppColors.doradoVirreinal : AppColors.talaveraCobalto,
            size: 14,
          ),
          const SizedBox(width: 5),
          Text(
            'PUEBLO MÁGICO • GUANAJUATO',
            style: TextStyle(
              fontSize: 10.5,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.8,
              color: inverted ? Colors.white : AppColors.talaveraCobalto,
            ),
          ),
        ],
      ),
    );
  }
}

/// Tarjeta estilizada con marco de Cerámica Mayólica
class TalaveraCard extends StatelessWidget {
  final Widget child;
  final VoidCallback? onTap;
  final Color? borderColor;
  final EdgeInsetsGeometry padding;

  const TalaveraCard({
    super.key,
    required this.child,
    this.onTap,
    this.borderColor,
    this.padding = const EdgeInsets.all(16.0),
  });

  @override
  Widget build(BuildContext context) {
    final effectiveBorder = borderColor ?? AppColors.talaveraCobalto.withOpacity(0.25);

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: effectiveBorder, width: 1.4),
        boxShadow: [
          BoxShadow(
            color: AppColors.talaveraCobalto.withOpacity(0.06),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(15),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            child: Padding(
              padding: padding,
              child: child,
            ),
          ),
        ),
      ),
    );
  }
}
