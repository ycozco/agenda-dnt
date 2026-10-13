# Evaluación de seguridad

## Alcance

Se revisaron el servidor local, la configuración Docker/Nginx, los portales HTML, la API simulada, el seed, las rutas directas, el almacenamiento del navegador, los scripts dinámicos y las cabeceras HTTP.

## Hallazgos

### SEC-001 — Portales privados accesibles sin autenticación

**Severidad:** P0  
**Estado:** abierto

Las rutas `/patient/index.html`, `/staff/index.html` y `/superadmin/index.html` responden con HTTP 200 sin una sesión validada. La selección de rol ocurre en la interfaz y se guarda en `sessionStorage`.

**Impacto:** el frontend no puede impedir lectura o modificación de información. En una aplicación clínica, el control debe existir en cada solicitud del backend.

**Corrección:** incorporar OIDC o proveedor de identidad, sesiones seguras, expiración, revocación y autorización server-side por organización, sede, paciente y recurso.

### SEC-002 — Datos sensibles y configuración de seguridad publicados

**Severidad:** P0  
**Estado:** abierto

`/data/seed-v2.js` está servido como JavaScript público. El archivo incluye datos de pacientes demo con aspecto real y una configuración de 2FA con secreto embebido.

**Referencia:** [seed-v2.js](../../prototype-v2/data/seed-v2.js:8).

**Corrección:** separar fixtures de desarrollo de los recursos públicos, eliminar secretos del repositorio, usar identificadores sintéticos y bloquear `/data/` en el servidor público.

### SEC-003 — 2FA simulado y aceptable con cualquier código

**Severidad:** P0  
**Estado:** abierto

`verify2FACode()` solo comprueba que el valor tenga seis dígitos. No valida un secreto TOTP, ventana temporal, contador de intentos, bloqueo, replay ni dispositivo.

**Referencia:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:152).

**Corrección:** validar el segundo factor en backend, aplicar rate limiting, registrar intentos, invalidar códigos usados y exigir recuperación segura.

### SEC-004 — Control de rol y tenant confiado al cliente

**Severidad:** P0  
**Estado:** abierto

El rol activo y el tenant se almacenan y modifican desde el navegador. `setActiveTenant()` cambia el contexto local sin autorización del servidor.

**Referencias:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:278), [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:518).

**Corrección:** derivar el usuario, tenant y permisos desde la sesión del backend. El cliente solo puede solicitar una operación; el servidor debe decidir si la permite.

### SEC-005 — Aislamiento de paciente insuficiente

**Severidad:** P0  
**Estado:** abierto

Los métodos de documentos e imágenes no aplican un filtro efectivo por paciente y algunos accesos inválidos devuelven el primer registro. La reserva pública usa siempre `pat_maria` como paciente.

**Referencias:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:779), [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:816), [reservar.html](../../prototype-v2/public/reservar.html:976).

**Corrección:** usar consultas parametrizadas con `organization_id`, `site_id` y `patient_id`, devolver 404/403 cuando el recurso no corresponde y nunca usar un registro de fallback clínico.

### SEC-006 — Posible XSS por HTML dinámico

**Severidad:** P1  
**Estado:** abierto

La interfaz inserta mediante `innerHTML` valores procedentes de formularios, nombres de archivo, tenants, documentos, citas y mensajes. El nombre de archivo es controlable por el usuario y el toast interpola directamente el mensaje.

**Referencias:** [components.js](../../prototype-v2/assets/js/components.js:152), [reservar.html](../../prototype-v2/public/reservar.html:1005), [control.html](../../prototype-v2/mobile/control.html:114), [superadmin/index.html](../../prototype-v2/superadmin/index.html:887).

**Corrección:** usar `textContent` para texto, construir nodos DOM, validar URLs con allowlist, sanitizar solo cuando sea imprescindible y aplicar CSP con reporte.

### SEC-007 — Servidor de desarrollo con validación de ruta insuficiente

**Severidad:** P1  
**Estado:** abierto

`dev_server.js` obtiene la ruta desde la URL y la concatena con `path.join()` sin comprobar que la ruta resultante esté dentro del directorio permitido. También publica CORS `*` y el mensaje interno de error.

**Referencia:** [dev_server.js](../../prototype-v2/dev_server.js:26).

**Corrección:** resolver con `path.resolve()`, comprobar el prefijo del root, rechazar rutas codificadas peligrosas, restringir CORS y no publicar errores internos.

### SEC-008 — Cabeceras defensivas incompletas

**Severidad:** P1  
**Estado:** abierto

Nginx define `nosniff`, `SAMEORIGIN` y `Referrer-Policy`, pero no una CSP. Tampoco hay HSTS para producción, `Permissions-Policy` ni una política explícita de `frame-ancestors`.

**Referencia:** [nginx.conf](../../nginx.conf:29).

**Corrección:** añadir CSP progresiva, HSTS solo con HTTPS operativo, `Permissions-Policy`, `Cross-Origin-Opener-Policy` y una política de frames acorde al producto.

### SEC-009 — Cargas y documentos sin pipeline de confianza

**Severidad:** P1  
**Estado:** abierto

La interfaz genera documentos y hashes locales sin validación real de MIME, tamaño, antivirus, cuarentena, almacenamiento privado o URLs firmadas.

**Corrección:** implementar carga autorizada por URL firmada, verificación de contenido, cuarentena, antivirus, extracción controlada de metadatos y entrega temporal autorizada.

## Conclusión de seguridad

La exposición actual no debe corregirse solo con JavaScript ocultando menús. El modelo requiere un backend que sea la autoridad para identidad, permisos, tenant, paciente, documentos, pagos y auditoría.
