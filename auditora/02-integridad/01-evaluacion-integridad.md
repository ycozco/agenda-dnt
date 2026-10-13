# Evaluación de integridad de datos y reglas de negocio

## Dictamen

La API mock no garantiza consistencia. La causa es estructural: mantiene todo el estado en `sessionStorage`, acepta objetos del cliente sin un esquema de entrada y no usa transacciones, restricciones, versionado ni operaciones idempotentes.

## Hallazgos reproducidos

### INT-001 — Saldo de tratamiento incorrecto

En `recalculatePlanTotals()`, un plan con `paidAmount = 0` cae en un valor por defecto mediante `||`. Un plan de S/100 con cero pagos terminó con saldo S/0.

**Referencia:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:972).

**Corrección:** diferenciar `null` de cero, calcular el saldo desde movimientos financieros confirmados y guardar importes en unidades menores.

### INT-002 — Cobros generados aunque no exista saldo

`generatePaymentScheduleFromPlan()` utiliza `balance > 0 ? balance : totalCost`. Si el saldo es cero, vuelve a tomar el costo total y genera cuotas nuevas.

**Referencia:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:997).

**Corrección:** rechazar generación cuando el saldo sea cero y asociar cada cronograma a una versión del plan.

### INT-003 — Duplicación de cuotas

La misma generación de cronograma se puede repetir y añade nuevos pagos sin comprobar si ya existe un cronograma equivalente.

**Corrección:** usar una clave idempotente por plan, modalidad y versión; imponer unicidad en base de datos.

### INT-004 — Citas duplicadas y sin control de concurrencia

`createAppointment()` genera un ID aleatorio y añade la cita sin validar paciente, tenant, sillón, profesional, duración ni solapamiento.

**Referencia:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:462).

**Corrección:** validar en backend y aplicar una restricción de exclusión por recurso y rango temporal dentro de una transacción.

### INT-005 — Fechas solicitadas reemplazadas por datos de fallback

Cuando una fecha no tiene citas, `getAppointmentsByDate()` devuelve citas del 8 de septiembre de 2026 o las primeras seis disponibles. Esto muestra disponibilidad ajena a la fecha solicitada.

**Referencia:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:439).

**Corrección:** devolver una lista vacía y consultar disponibilidad real por sede, sillón, profesional y zona horaria.

### INT-006 — Mediciones clínicas inventadas por valores predeterminados

`checkInPatient()` registra presión, frecuencia, saturación y temperatura aunque el usuario no haya enviado esos valores.

**Referencia:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:1085).

**Corrección:** almacenar `null` cuando una medición no se tomó y diferenciar “no medido” de un valor clínico.

### INT-007 — Pérdida de operaciones offline

`syncOfflineQueue()` registra un mensaje local y elimina la cola sin enviar las mutaciones a un servidor ni recibir confirmación.

**Referencia:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:254).

**Corrección:** usar IndexedDB, outbox durable, clave de idempotencia, reintentos, confirmación por operación y resolución de conflictos.

### INT-008 — Auditoría no confiable

Los eventos de auditoría se crean en el navegador, usan un actor fijo y se pueden borrar junto con `sessionStorage`.

**Referencia:** [mock-api-v2.js](../../prototype-v2/assets/js/mock-api-v2.js:1183).

**Corrección:** registrar la auditoría en backend, con actor autenticado, timestamp UTC, contexto de organización/sede, evento append-only y controles de retención.

### INT-009 — Firma y hash simulados

Los hashes y firmas se generan con `Math.random()`. Una cadena aleatoria no demuestra integridad, autoría ni validez legal.

**Corrección:** usar hash criptográfico del objeto en backend y proveedor oficial de firma cuando corresponda. Una imagen de firma no equivale a una firma digital.

## Invariantes que debe imponer el backend

- Una cita no puede ocupar el mismo sillón y rango horario que otra.
- Una cita pertenece a exactamente una organización y sede.
- Un documento solo puede consultarse si el actor tiene relación autorizada con el paciente.
- Un pago confirmado no se edita; se revierte mediante un movimiento compensatorio.
- Una receta emitida se anula o reemplaza, no se modifica silenciosamente.
- Un plan aceptado conserva su versión y sus términos.
- Una mutación repetida con la misma clave produce un único efecto.
- Toda operación clínica relevante genera auditoría persistente.
