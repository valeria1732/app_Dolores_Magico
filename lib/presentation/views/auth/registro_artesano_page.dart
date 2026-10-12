import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../domain/entities/usuario_app.dart';
import '../../viewmodels/auth_viewmodel.dart';

/// Pantalla de Autenticación y Registro Diferenciado del Artesano (HU01)
/// Incluye casilla de consentimiento expreso del Aviso de Privacidad (LFPDPPP).
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
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Autenticación y Perfiles Diferenciados (HU01)',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            'Selecciona tu rol activo en DoloresMágico App o registra tu taller artesanal de Talavera / Nevería:',
          ),
          const SizedBox(height: 14),
          Wrap(
            spacing: 8,
            children: RolUsuario.values.map((rol) {
              return ChoiceChip(
                label: Text(rol.name.toUpperCase()),
                selected: authVm.rolActivo == rol,
                onSelected: (_) => authVm.cambiarRolPerfil(rol),
              );
            }).toList(),
          ),
          const Divider(height: 28),
          CheckboxListTile(
            value: _aceptaAvisoPrivacidad,
            onChanged: (v) =>
                setState(() => _aceptaAvisoPrivacidad = v ?? false),
            title: const Text(
              'He leído y acepto el Aviso de Privacidad (LFPDPPP) y el uso de geolocalización GPS para fines exclusivos de la aplicación.',
              style: TextStyle(fontSize: 12.5),
            ),
          ),
        ],
      ),
    );
  }
}
