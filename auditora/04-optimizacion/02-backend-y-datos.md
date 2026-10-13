# Optimización backend, datos y operaciones

## Objetivo

Mover la autoridad de datos desde el navegador hacia un backend modular y mantener el frontend como una capa de presentación. La optimización debe mejorar consistencia, trazabilidad y capacidad de crecimiento antes de perseguir microservicios.

## Diseño recomendado

### Base transaccional

PostgreSQL debe ser la fuente de verdad para usuarios, organizaciones, sedes, pacientes, citas, encuentros, tratamientos, documentos, pagos y auditoría. Las consultas deben filtrar siempre por organización y, cuando corresponda, sede y paciente.

### Índices y restricciones

Crear índices compuestos para `organization_id`, `site_id`, `patient_id`, fecha y estado. Añadir restricciones para identificadores de paciente y una exclusión de solapamientos de agenda por recurso y rango temporal.

### Operaciones idempotentes

Crear una tabla o mecanismo de idempotencia para reservas, pagos, exportaciones ARCO, cargas y sincronización offline. Un reintento debe devolver el mismo resultado, no crear un segundo efecto.

### Finanzas

Guardar importes como enteros en céntimos y moneda ISO. El saldo debe derivarse de movimientos confirmados. Los pagos confirmados y comprobantes deben ser append-only; una corrección debe registrarse como reversa o nota relacionada.

### Documentos e imágenes

Guardar metadatos y hash en PostgreSQL y el archivo en almacenamiento privado. Utilizar colas para antivirus, miniaturas, OCR y derivados. No generar ni verificar hashes con `Math.random()`.

### Auditoría

Registrar actor autenticado, organización, sede, paciente, recurso, acción, resultado, timestamp UTC, request ID y motivo. La lectura, descarga, impresión, exportación y modificación clínica deben quedar auditadas.

### Cache y rendimiento

Usar cache únicamente para catálogos y proyecciones no sensibles. Invalidar por evento. No cachear historias clínicas ni respuestas privadas en CDN.

### Observabilidad

Agregar logs estructurados sin PHI, métricas de latencia/error, trazas con request ID, alertas de rate limit, errores de cola y fallos de autorización. Probar restauración de copias, no solo su creación.

## Migración del mock

1. Convertir `SEED_V2` en fixtures exclusivamente sintéticos.
2. Definir DTOs y validación de entrada.
3. Crear repositorios por dominio.
4. Exponer endpoints protegidos.
5. Migrar una vertical completa: identidad → pacientes → agenda.
6. Migrar documentos, tratamientos y pagos.
7. Reemplazar la cola local por outbox/worker.
8. Retirar gradualmente mutaciones directas de `mock-api-v2.js`.
