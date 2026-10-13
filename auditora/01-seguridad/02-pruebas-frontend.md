# Pruebas de seguridad y comportamiento del frontend

## Pruebas ejecutadas

| Prueba | Resultado | Evidencia |
|---|---|---|
| Abrir raíz del sitio | HTTP 302 hacia `/public/index.html` | Nginx responde correctamente en local |
| Abrir portales privados directamente | HTTP 200 | Patient, Staff y Superadmin no tienen guardas reales |
| Descargar seed | HTTP 200 | `/data/seed-v2.js` entrega datos al navegador |
| Introducir código `000000` en 2FA | Aceptado por la API mock | `verify2FACode()` |
| Seleccionar rol en login Staff | La URL lleva `role`, pero la API usa estado separado | El rol no queda garantizado |
| Abrir modal 2FA Staff | Error JavaScript | `window.openSecurityModal is not a function` |
| Probar reservas | El flujo avanza por fecha y confirmación | La persistencia depende de la API mock |
| Introducir markup en nombre de reserva | El input conserva el markup literal | La confirmación usa interpolación HTML insegura |
| Revisar viewport 390 px | Overflow en la portada pública | El contenido excede el ancho visible |
| Revisar viewport 1440 px | Overflow en navegación de la portada | La zona de acciones supera el viewport |
| Rutas públicas y privadas | Cargan, con advertencias de Tailwind CDN en varias vistas | Falta compilación de producción |

## Pruebas recomendadas antes de una puesta en producción

### Autorización e IDOR

- Cambiar IDs de paciente, documento, imagen, cita y tenant en las solicitudes.
- Repetir una solicitud con el rol de recepción, profesional, paciente y superadmin.
- Intentar acceder a un paciente de otra sede y de otra organización.
- Confirmar que un 404 no devuelve el primer registro existente.

### Inyección en el DOM

- Probar nombres, notas, diagnósticos, razones ARCO, tenants y nombres de archivo con texto que contenga etiquetas y atributos.
- Revisar todos los sinks `innerHTML`, `insertAdjacentHTML`, `outerHTML` y handlers inline.
- Activar CSP en modo `Report-Only` y resolver cada violación.

### Archivos clínicos

- Probar SVG, HTML, PDF malformado, archivos con extensión doble, MIME incorrecto y archivos grandes.
- Confirmar cuarentena, antivirus, límites, nombre generado por servidor y URL temporal.
- Confirmar que el visor no pueda ejecutar contenido activo del archivo.

### Sesiones y navegador

- Verificar expiración, cierre remoto, rotación de sesión y cambio de contraseña.
- Revisar que no se guarden tokens, secretos ni PHI en `localStorage`, `sessionStorage`, URL, consola o logs.
- Validar `Cache-Control`, CSP, HSTS, cookies `HttpOnly`, `Secure` y `SameSite`.

### Integridad de operaciones

- Repetir solicitudes de creación de citas, pagos, recetas, exportaciones ARCO y carga de documentos.
- Interrumpir la red a mitad de una operación y reintentarla.
- Enviar dos reservas simultáneas al mismo sillón y horario.
- Confirmar que cada mutación tenga una clave de idempotencia y resultado único.

## Criterio de aprobación

El frontend puede aprobarse para demostración cuando no exponga secretos, la información sea sintética y las operaciones simuladas estén rotuladas como demo. Para producción clínica debe pasar las pruebas con backend, sesiones y datos reales de prueba controlados.
