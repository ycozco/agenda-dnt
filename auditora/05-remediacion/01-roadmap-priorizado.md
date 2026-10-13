# Roadmap de remediación

## Fase 0 — Contención inmediata

Objetivo: evitar exposición o uso incorrecto del prototipo.

- Retirar datos con aspecto real y secretos del seed.
- Marcar claramente todas las pantallas como demo.
- Evitar desplegar `/data/`, `/dev_server.js`, `/prototype/` y `/prototipo-stitc/` en un host público.
- Crear una configuración de Nginx de desarrollo y otra de producción.
- Corregir el bloque `<script src>` de Staff.
- Corregir saldos, cuotas, citas y sincronización offline antes de mostrar esos flujos como operativos.

**Criterio de salida:** no hay secretos descargables, no se exponen portales privados por accidente y las pruebas de integridad básicas pasan.

## Fase 1 — Núcleo seguro

Objetivo: crear una primera vertical backend funcional.

- OIDC, MFA y sesiones seguras.
- Usuarios, roles, organizaciones y sedes.
- Pacientes y permisos asistenciales.
- API de citas con validación y transacciones.
- PostgreSQL con RLS o políticas equivalentes.
- Auditoría persistente.

**Criterio de salida:** un usuario no puede leer o modificar recursos fuera de su alcance, incluso cambiando IDs o estado del navegador.

## Fase 2 — Información clínica y documentos

Objetivo: proteger el ciclo de vida clínico.

- Encuentros, odontograma y planes versionados.
- Documentos privados con carga firmada y cuarentena.
- PACS/DICOMweb para estudios correspondientes.
- Recetas con estados y firma definida.
- Exportación ARCO con autorización, trazabilidad y entrega segura.

**Criterio de salida:** cada documento, estudio, receta y plan tiene propietario, versión, permisos y auditoría verificables.

## Fase 3 — Finanzas y operación offline

Objetivo: asegurar operaciones con impacto económico o clínico.

- Ledger de pagos append-only.
- Idempotencia y conciliación.
- Caja, comprobantes y reversas.
- IndexedDB, outbox, reintentos y conflictos.
- Notificaciones mediante colas.

**Criterio de salida:** reintentos, desconexiones y concurrencia no duplican ni pierden operaciones.

## Fase 4 — Consolidación frontend

Objetivo: reducir deuda técnica y mejorar experiencia.

- Aplicaciones por superficie y componentes compartidos.
- Eliminación de HTML duplicado.
- Build reproducible y dependencias fijadas.
- CSP, accesibilidad, responsive y pruebas de regresión.
- Optimización de imágenes, caché y Core Web Vitals.

**Criterio de salida:** cada ruta crítica tiene pruebas de navegador, accesibilidad, rendimiento y error.

## Puerta de producción

No se debe conectar el sistema a datos reales hasta cumplir las fases 0, 1 y las partes aplicables de 2. Las fases 3 y 4 deben completarse antes de declarar caja, offline, firma o auditoría como funcionalidades operativas.
