# ☁️ Ficha de Diseño Técnico: Nube y Seguridad
**Universidad Tecnológica del Norte de Guanajuato (UTNG)**  
**Materia:** Desarrollo Móvil Integral | **Docente:** Lic. José de Jesús Eduardo Barrientos Avalos  
**Proyecto:** DoloresMágico App (o DoloresConecta) — Aplicación Móvil en Flutter & Dart  
**Equipo:** GIDS6101-E  
- **Valeria Guadalupe Calvillo Mendoza** (`1223100392`) — *Product Owner & Mobile Backend Lead*  
- **María del Carmen Vargas Martínez** (`1220100084`) — *Scrum Master & Mobile UI/UX Flutter Lead*  
**Fecha de Entrega:** Octubre 2026 | **Meta del PMV:** 20 de Noviembre de 2026

---

## ☁️ Bloque 1: El Componente en la Nube

### Proveedor Elegido:
> **Google Firebase (Google Cloud Platform)**  
> Se integra en la aplicación móvil Flutter mediante el patrón **Singleton** ([`FirebaseSingletonService`](lib/core/services/firebase_singleton_service.dart)), garantizando una sola instancia compartida para optimizar conexiones de red, memoria RAM y consumo de batería en el dispositivo.

### ¿Para qué se usará la nube? (Servicios seleccionados):
* **[ X ] Autenticación (`Firebase Authentication`):**  
  Gestión de inicio de sesión seguro con correo/contraseña y cuentas Google OAuth. Emite tokens criptográficos **JWT** diferenciados por roles de usuario: **Turista/Visitante**, **Ciudadano Dolorense**, **Artesano Productor** y **Administrador Municipal**. Incluye el consentimiento obligatorio del Aviso de Privacidad conforme a la LFPDPPP.
* **[ X ] Base de datos (`Cloud Firestore`):**  
  Base de datos NoSQL documental y reactiva en la nube. Gestiona las colecciones estructuradas `usuarios/`, `talleres/` (con coordenadas GPS de Dolores Hidalgo: `21.15605, -100.93245`), `productos/` (catálogo de piezas de cerámica mayólica y nieves artesanales) y `reportes_urbanos/` (incidencias de alumbrado, baches y basura con folios generados).
* **[ X ] Almacenamiento de archivos (`Firebase Cloud Storage`):**  
  Almacenamiento en la nube de objetos binarios (imágenes) capturados desde la cámara nativa del teléfono móvil. Las fotos de evidencia urbana se someten a un pipeline de compresión client-side en Flutter para no exceder los **`500 KB`**, optimizando la cuota de transferencia y acelerando la subida en redes móviles 3G/4G.
* **[ X ] Funciones de servidor / Backend (`Firebase Cloud Messaging - FCM` & `Cloud Functions`):**  
  Envío de notificaciones push nativas al dispositivo móvil del ciudadano cuando el estado de su reporte cambie de *"Pendiente"* a *"En Proceso"* o *"Atendido"*. Adicionalmente, Cloud Functions se encarga de asignar de forma segura los permisos de administración (*Custom Claims: `role: admin`*) sin exponer lógica sensible en el cliente.

---

## 🔒 Bloque 2: Las 3 Reglas de Seguridad

### 1. En el teléfono del usuario (Seguridad en el dispositivo / Local Data at Rest):
> **Regla Implementada:** **Cero almacenamiento de contraseñas en texto plano y cifrado de hardware.**  
> - Para las credenciales de sesión, se implementa la librería **`flutter_secure_storage`**, la cual se apoya en los módulos criptográficos dedicados del hardware nativo: **Android Keystore** (claves AES/RSA respaldadas por hardware seguro / TEE) e **iOS Keychain**. En el teléfono únicamente se almacena el *Refresh Token* de sesión cifrado, jamás la contraseña del usuario.  
> - Para el almacenamiento en caché local en modo sin conexión (*Offline-First* con **Hive**), las cajas locales se inicializan con cifrado simétrico **AES-256** mediante una clave criptográfica de 32 bytes derivada en el dispositivo (`HiveAesCipher`), impidiendo que un atacante con acceso root o físico al almacenamiento extraiga los reportes o datos guardados.

### 2. En el viaje de los datos (Seguridad en tránsito / Data in Motion):
> **Regla Implementada:** **Cifrado obligatorio TLS 1.3 / HTTPS con Certificate Pinning.**  
> - Todo el tráfico de red entre la aplicación móvil y los endpoints de Firebase y Google Maps viaja exclusivamente bajo conexiones seguras **HTTPS / TLS 1.3** con suites criptográficas modernas que garantizan el secreto perfecto hacia adelante (*Forward Secrecy*).  
> - Se implementa **SSL / Certificate Pinning** en el cliente móvil Flutter para validar la identidad de los certificados de los servidores, mitigando ataques de suplantación o intermediario (*Man-in-the-Middle - MitM*) cuando turistas o ciudadanos se conecten a redes Wi-Fi públicas o abiertas en el Jardín Principal de Dolores Hidalgo.  
> - Todos los payloads de reportes urbanos viajan con sellado de tiempo (*timestamp* del servidor) y coordenadas validadas mediante geocerca (*Geofencing $\le$ 15 km* del centro dolorense).

### 3. En la base de datos (Control de acceso e integridad / Data Access Control):
> **Regla Implementada:** **Reglas de Seguridad declarativas en Cloud Firestore basadas en identidad (`request.auth.uid`) y Principio de Mínimo Privilegio.**  
> - Se bloquea cualquier lectura o escritura no autenticada para colecciones protegidas.  
> - **Aislamiento estricto de perfiles:** Cada usuario únicamente tiene permiso de lectura y edición sobre su propio documento:  
>   `match /usuarios/{userId} { allow read, write: if request.auth != null && request.auth.uid == userId; }`  
> - **Protección de talleres y reportes:** Los artesanos solo pueden editar o borrar productos pertenecientes a su propio identificador de taller (`request.auth.uid == resource.data.artesanoId`).  
> - **Separación de privilegios de Administrador:** Únicamente los usuarios con *Custom Claim* verificado de administrador (`request.auth.token.role == 'admin'`) tienen autorización para cambiar el estatus de un reporte ciudadano a *"Atendido"* o validar y publicar un nuevo taller en el catálogo público.

---

## 🛡️ Bloque 3: Protección del Código (Buenas Prácticas)

### Pregunta Técnica: ¿Cómo van a ocultar las llaves de acceso o credenciales (API Keys) para que no se suban por error a su repositorio público de GitHub?
Para evitar cualquier fuga de credenciales en el repositorio público ([`valeria1732/app_Dolores_Magico`](https://github.com/valeria1732/app_Dolores_Magico)), el equipo aplica una **estrategia de tres capas de defensa**:

1. **Gestión con Variables de Entorno (`.env`) y Exclusión en `.gitignore`:**  
   Se utiliza el paquete **`flutter_dotenv`** para inyectar las variables de configuración en tiempo de compilación. El archivo físico `.env` está expresamente declarado dentro del archivo [`.gitignore`](.gitignore). En el repositorio público únicamente se proporciona una plantilla de referencia denominada `.env.example` con variables simuladas y vacías para guiar el entorno local de los desarrolladores.
2. **Protección de Archivos Nativos de Configuración:**  
   Los archivos nativos de integración de Firebase (`android/app/google-services.json` y `ios/Runner/GoogleService-Info.plist`) están catalogados en `.gitignore` para no ser rastreados por Git. Para compilaciones automáticas en integración continua, las credenciales se inyectan a través de **GitHub Secrets**.
3. **Restricción Criptográfica de API Keys en Google Cloud Console:**  
   En la consola de **Google Cloud Platform**, cada API Key de Firebase y Google Maps Mobile SDK está blindada mediante dos restricciones obligatorias:
   - **Restricción de aplicación:** Se limita exclusivamente a aplicaciones Android con el nombre de paquete oficial (`mx.edu.utng.dolores_magico_app`) y la huella digital criptográfica **SHA-1** del certificado de firma (*Keystore*) del equipo, así como el *Bundle Identifier* para iOS.  
   - **Restricción de API:** La llave solo tiene permiso para invocar las APIs indispensables (Maps SDK for Android, Firebase Authentication, Cloud Firestore).  
   *Resultado:* Incluso si un atacante lograra extraer la llave pública del código binario descompilado del APK, las peticiones que se hagan desde cualquier otra aplicación, servidor o navegador web son rechazadas inmediatamente por los servidores de Google con un error `403 Forbidden`.

---

## 📱 Pregunta de Cierre: Tecnología y Lenguaje de Desarrollo
* **Tecnología y Lenguaje:** **Flutter (versión SDK 3.24+) con lenguaje Dart (versión 3.5+)**.  
* **Plataformas de Despliegue:** Compilación nativa **AOT (Ahead-of-Time)** para **Android (API Level 23 a 34)** e **iOS (iOS 13.0+)**.  
* **Patrón de Arquitectura:** **MVVM (Model-View-ViewModel) + Clean Architecture**, organizado en tres capas estrictamente desacopladas:  
  1. **Domain:** Entidades de negocio puras (`ReporteUrbano`, `TallerArtesano`, `UsuarioApp`) y Casos de Uso.  
  2. **Data:** Modelos JSON, fuentes de datos remotas (`FirestoreRemoteDataSource`), caché local offline (`HiveLocalDataSource`) e implementaciones de repositorio.  
  3. **Presentation:** Vistas móviles interactivas en Flutter con Material 3 y ViewModels reactivos mediante **`Provider`**.
* **Sensores de Hardware Integrados:** GPS en vivo (**`geolocator`**) y Cámara nativa (**`image_picker`**) implementados bajo el patrón **Singleton** ([`location_camera_singleton.dart`](lib/core/services/location_camera_singleton.dart)).
