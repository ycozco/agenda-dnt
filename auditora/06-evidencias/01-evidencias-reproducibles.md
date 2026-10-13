# Evidencias reproducibles

## Entorno

- Workspace: `D:\\dental`
- Aplicación: `D:\\dental\\prototype-v2`
- URL: `http://localhost:8085/`
- Servidor observado: Nginx en Docker
- Fecha de revisión: 2026-09-16

## Evidencia HTTP

Las siguientes rutas respondieron HTTP 200 en el entorno local:

```text
/patient/index.html
/staff/index.html
/superadmin/index.html
/data/seed-v2.js
/assets/js/mock-api-v2.js
/dev_server.js
```

Las respuestas no incluyeron `Content-Security-Policy`. Nginx sí entregó `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection` y `Referrer-Policy`.

## Prueba de API mock en memoria

Resultados observados:

```json
{
  "twoFactorAccepts000000": true,
  "unknownPatientGetsDocuments": 7,
  "unknownDateGetsAppointments": 6,
  "duplicateIdsAccepted": 2,
  "zeroPaidPlan": { "cost": 100, "paid": 0, "balance": 0 },
  "fullyPaidStillGeneratesCharges": 100,
  "repeatedScheduleAddsPayments": 6,
  "emptyTriageFabricatesMeasurements": true,
  "offlineReportedSynced": 1,
  "offlineQueueRemaining": 0
}
```

La prueba se ejecutó con una copia de la API y del seed en memoria, por lo que no modificó los archivos ni el estado persistente del navegador.

## Evidencia de frontend

- El botón de 2FA de Staff produjo `TypeError: window.openSecurityModal is not a function`.
- El bloque de controladores se encuentra después de `<script src="../components/prototype-switcher.js">`; el contenido inline de ese elemento no se ejecuta como el autor espera.
- La portada pública presentó overflow horizontal en viewport de 390 px y 1440 px.
- Se observaron advertencias de Tailwind CDN en varias vistas privadas.
- Los formularios públicos y de contacto tienen controles cuyo `label` no queda asociado semánticamente al campo.

## Archivos principales revisados

- [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js)
- [seed-v2.js](../../prototype-v2/data/seed-v2.js)
- [staff/index.html](../../prototype-v2/staff/index.html)
- [patient/index.html](../../prototype-v2/patient/index.html)
- [public/reservar.html](../../prototype-v2/public/reservar.html)
- [components.js](../../prototype-v2/assets/js/components.js)
- [dev_server.js](../../prototype-v2/dev_server.js)
- [nginx.conf](../../nginx.conf)
- [docker-compose.yml](../../docker-compose.yml)
- [docs/04-arquitectura-seguridad.md](../../docs/04-arquitectura-seguridad.md)
- [docs/08-modelo-de-datos.md](../../docs/08-modelo-de-datos.md)

## Limitaciones

La revisión se realizó contra el entorno local y el código disponible. No incluye prueba de penetración de un backend inexistente, revisión de infraestructura cloud, escaneo autenticado, análisis de dependencias desde un lockfile ni validación legal formal de protección de datos.
