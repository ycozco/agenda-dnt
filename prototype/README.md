# Prototipo navegable · Sillar Dental Especialidades

Mockup estático de la propuesta de sistema dental para una clínica especializada de Arequipa. Está construido sin backend: `seed.js` contiene un único conjunto de datos ficticios y `mock-api.js` expone una pequeña capa de lectura/escritura local para que las interacciones se sientan reales sin persistir información clínica.

## Vistas incluidas

| Entrada | Qué demuestra |
| --- | --- |
| `index.html` | Landing de la clínica, especialidades, tecnología, confianza y CTA de reserva. |
| `reservar.html` | Flujo público de reserva en cuatro pasos: especialidad, profesional, fecha/hora y datos del paciente. |
| `paciente.html?view=home` | Portal de María Quispe: próxima cita, plan activo, documentos y saldo. |
| `paciente.html?view=appointments` | Citas, check-in simulado y solicitud de nueva cita. |
| `paciente.html?view=treatment` | Plan por fases, avance y odontograma resumido. |
| `paciente.html?view=documents` | Informes, fotos, consentimientos y radiografías con vista previa. |
| `paciente.html?view=payments` | Adelanto, cuotas, saldo y pago simulado. |
| `admin.html?view=dashboard` | Tablero operativo con agenda del día, alertas, producción y tareas. |
| `admin.html?view=agenda` | Agenda por profesional/sillón con estados y check-in. |
| `admin.html?view=reception` | Cola de recepción: confirmar, registrar llegada y cobrar. |
| `admin.html?view=patients` | Búsqueda de pacientes y acceso a la historia. |
| `admin.html?view=patient&patient=pat_maria` | Historia clínica completa: resumen, evolución, odontograma drag-and-drop, periodoncia, ortodoncia, plan, documentos, recetas y cuenta. |
| `admin.html?view=finance` | Caja, pagos, fraccionamiento, cuotas, adelantos y conciliación. |
| `admin.html?view=operations` | Inventario, laboratorio, compras y comisiones. |
| `admin.html?view=communications` | Recordatorios, campañas y plantillas de WhatsApp/email. |
| `admin.html?view=reports` | Indicadores de producción, conversión y cobranza. |
| `admin.html?view=audit` | Bitácora de auditoría y controles de privacidad. |
| `admin.html?view=settings` | Parámetros, roles, catálogos, sede y configuración preparada para multisede. |

La consola usa una sola entrada con `?view=` para mantener el mockup fácil de recorrer. En la aplicación real, cada vista corresponde a una ruta protegida del frontend y a permisos/API propios.

## Activos visuales

`assets/images/dental-reference/` contiene referencias descargadas y documentadas en `LICENSES.md`: arcos dentales, esquema FDI, anatomía dental y radiografía panorámica. Se usan como material de referencia/previsualización; el odontograma funcional debe migrar a SVG semántico propio con nomenclatura FDI y catálogo versionado del Colegio Odontológico del Perú.

## Ejecutar

Desde esta carpeta, servir el repositorio con cualquier servidor HTTP estático (por ejemplo `python -m http.server 8080`) y abrir:

```text
http://localhost:8080/prototype/index.html
```

Las interacciones son deliberadamente simuladas: reservar, check-in, publicar un documento, marcar una tarea y registrar un pago actualizan el estado en memoria y muestran una confirmación visual. No se deben introducir datos reales de pacientes.

## Próximo paso técnico

Conservar el contrato de `seed.js` como fixture de pruebas y reemplazar `mock-api.js` por API autenticada multi-tenant. La base de datos propuesta en `docs/05-modelo-de-datos.md` y `docs/06-casos-de-uso.md` mantiene `organization_id`/`site_id`, auditoría, almacenamiento de archivos, versionado del odontograma y los campos de IA/voz desactivados por defecto.
