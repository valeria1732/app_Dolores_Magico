import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../domain/entities/usuario_app.dart';
import '../../viewmodels/auth_viewmodel.dart';
import '../../widgets/talavera_decorations.dart';

/// Pantalla de Autenticación y Registro Diferenciado (HU01)
/// Diseño temático de "Padrón Oficial de Artesanos y Visitantes de Dolores Hidalgo C.I.N."
class RegistroArtesanoPage extends StatefulWidget {
  const RegistroArtesanoPage({super.key});

  @override
  State<RegistroArtesanoPage> createState() => _RegistroArtesanoPageState();
}

class _RegistroArtesanoPageState extends State<RegistroArtesanoPage> {
  bool _aceptaAvisoPrivacidad = false;

  @override
  Widget build(BuildContext context) {
    final authVm = context.watch<AuthViewModel>();

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 18.0, vertical: 14.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Banner Oficial de Identidad
          TalaveraCard(
            borderColor: AppColors.doradoVirreinal.withOpacity(0.5),
            child: Row(
              children: [
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    color: AppColors.talaveraCobalto,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.badge_outlined,
                    color: AppColors.doradoClaro,
                    size: 28,
                  ),
                ),
                const SizedBox(width: 14),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Padrón Oficial y Acceso por Roles',
                        style: TextStyle(
                          fontFamily: 'serif',
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: AppColors.talaveraCobalto,
                        ),
                      ),
                      SizedBox(height: 3),
                      Text(
                        'Registro con consentimiento informado conforme a la LFPDPPP (2025) y verificación municipal.',
                        style: TextStyle(fontSize: 11.5, color: Colors.black54),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          const Text(
            'Selecciona tu Perfil Activo en Dolores Mágico:',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: AppColors.talaveraCobalto,
            ),
          ),
          const SizedBox(height: 12),

          // Tarjetas de Rol
          ...RolUsuario.values.map((rol) {
            final isSelected = authVm.rolActivo == rol;
            return Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: TalaveraCard(
                borderColor: isSelected ? AppColors.talaveraCobalto : AppColors.talaveraGrisPerla,
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                onTap: () => authVm.cambiarRolPerfil(rol),
                child: Row(
                  children: [
                    Radio<RolUsuario>(
                      value: rol,
                      groupValue: authVm.rolActivo,
                      activeColor: AppColors.talaveraCobalto,
                      onChanged: (val) {
                        if (val != null) authVm.cambiarRolPerfil(val);
                      },
                    ),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _obtenerTituloRol(rol),
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color: isSelected ? AppColors.talaveraCobalto : Colors.black87,
                            ),
                          ),
                          Text(
                            _obtenerDescripcionRol(rol),
                            style: const TextStyle(fontSize: 11, color: Colors.black54),
                          ),
                        ],
                      ),
                    ),
                    Icon(
                      _obtenerIconoRol(rol),
                      color: isSelected ? AppColors.talaveraCobalto : Colors.black38,
                      size: 22,
                    ),
                  ],
                ),
              ),
            );
          }),

          const SizedBox(height: 16),

          // Casilla de consentimiento LFPDPPP 2025
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.talaveraCobalto.withOpacity(0.2)),
            ),
            child: CheckboxListTile(
              contentPadding: EdgeInsets.zero,
              activeColor: AppColors.talaveraCobalto,
              value: _aceptaAvisoPrivacidad,
              onChanged: (v) => setState(() => _aceptaAvisoPrivacidad = v ?? false),
              title: const Text(
                'He leído y acepto el Aviso de Privacidad (LFPDPPP DOF 2025), autorizando el uso de geolocalización GPS y cámara para fines exclusivos de la aplicación móvil Dolores Mágico.',
                style: TextStyle(fontSize: 12, height: 1.35),
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  String _obtenerTituloRol(RolUsuario rol) {
    switch (rol) {
      case RolUsuario.turista:
        return 'Turista / Visitante';
      case RolUsuario.ciudadano:
        return 'Ciudadano Dolorense';
      case RolUsuario.artesano:
        return 'Maestro Artesano / Nevero';
      case RolUsuario.administrador:
        return 'Administrador Municipal';
    }
  }

  String _obtenerDescripcionRol(RolUsuario rol) {
    switch (rol) {
      case RolUsuario.turista:
        return 'Rutas de Talavera, nieves de garrafa y sitios históricos 1810.';
      case RolUsuario.ciudadano:
        return 'Participación comunitaria y reporte de servicios públicos.';
      case RolUsuario.artesano:
        return 'Gestión de catálogo de piezas mayólica y contacto WhatsApp directo.';
      case RolUsuario.administrador:
        return 'Validación municipal de nuevos talleres y seguimiento de folios.';
    }
  }

  IconData _obtenerIconoRol(RolUsuario rol) {
    switch (rol) {
      case RolUsuario.turista:
        return Icons.hiking;
      case RolUsuario.ciudadano:
        return Icons.people;
      case RolUsuario.artesano:
        return Icons.palette;
      case RolUsuario.administrador:
        return Icons.shield;
    }
  }
}
