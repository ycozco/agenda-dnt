# Catálogo de casos de uso

## Método

Los casos se organizan por capacidad de negocio. Cada uno debe convertirse después en:

1. historia de usuario;
2. reglas y permisos;
3. contrato API;
4. transacción o saga;
5. eventos de dominio;
6. pruebas de aceptación;
7. entradas de auditoría.

No se debe diseñar una tabla directamente desde una pantalla.

## Actores

| Código | Actor |
|---|---|
| ACT-01 | paciente |
| ACT-02 | apoderado |
| ACT-03 | recepción |
| ACT-04 | cirujano dentista |
| ACT-05 | asistente clínico |
| ACT-06 | caja |
| ACT-07 | administrador de clínica |
| ACT-08 | responsable de almacén/laboratorio |
| ACT-09 | plataforma de pagos |
| ACT-10 | canal de notificación |
| ACT-11 | equipo/proveedor de imágenes |
| ACT-12 | auditor o responsable de privacidad |

## Paciente e identidad

| ID | Caso de uso | Actor principal | Resultado |
|---|---|---|---|
| UC-PAC-01 | registrar paciente | recepción | identidad clínica única en la organización |
| UC-PAC-02 | detectar posible duplicado | sistema/recepción | coincidencia revisada, sin fusión automática |
| UC-PAC-03 | actualizar datos de contacto | paciente/recepción | datos versionados y auditados |
| UC-PAC-04 | registrar apoderado/dependiente | recepción | relación con alcance y vigencia |
| UC-PAC-05 | fusionar duplicados | administrador autorizado | identidad canónica y referencias redirigidas |
| UC-PAC-06 | registrar preferencias/consentimientos | paciente | evidencia, versión, canal y finalidad |
| UC-PAC-07 | exportar expediente | privacidad | paquete autorizado y auditado |

## Agenda

| ID | Caso de uso | Actor principal | Resultado |
|---|---|---|---|
| UC-AGE-01 | configurar horarios y recursos | administrador | disponibilidad efectiva |
| UC-AGE-02 | buscar slots | paciente/recepción | alternativas válidas |
| UC-AGE-03 | reservar cita | paciente/recepción | recursos bloqueados atómicamente |
| UC-AGE-04 | confirmar cita | paciente/recepción | transición registrada |
| UC-AGE-05 | reprogramar por drag-and-drop | recepción | nueva reserva validada e historial |
| UC-AGE-06 | cancelar cita | paciente/recepción | motivo, política y slot liberado |
| UC-AGE-07 | registrar llegada/check-in | recepción/paciente | cola clínica actualizada |
| UC-AGE-08 | registrar inasistencia | recepción | recare y reglas financieras disparadas |
| UC-AGE-09 | gestionar lista de espera | recepción/sistema | vacante ofrecida con expiración |
| UC-AGE-10 | bloquear agenda | profesional/admin | recurso no reservable |

## Atención clínica

| ID | Caso de uso | Actor principal | Resultado |
|---|---|---|---|
| UC-CLI-01 | abrir encuentro desde cita | profesional | episodio clínico relacionado |
| UC-CLI-02 | actualizar anamnesis y alertas | profesional | versión firmable |
| UC-CLI-03 | crear odontograma inicial | profesional | snapshot firmado e inalterable |
| UC-CLI-04 | registrar hallazgo táctil | profesional | evento clínico validado |
| UC-CLI-05 | corregir hallazgo por adenda | profesional | evento correctivo enlazado |
| UC-CLI-06 | registrar diagnóstico | profesional | diagnóstico codificado y texto clínico |
| UC-CLI-07 | crear versión del plan | profesional | propuesta separada de hallazgos |
| UC-CLI-08 | aceptar/rechazar alternativa | paciente | decisión y evidencia |
| UC-CLI-09 | ejecutar procedimiento | profesional | acto, piezas, superficies y autor |
| UC-CLI-10 | cerrar encuentro | profesional | nota firmada y controles completados |
| UC-CLI-11 | registrar periodontograma | profesional | mediciones por sitio y sesión |
| UC-CLI-12 | gestionar seguimiento ortodóntico | especialista | episodio y controles longitudinales |

## Receta, resultado e imágenes

| ID | Caso de uso | Actor principal | Resultado |
|---|---|---|---|
| UC-DOC-01 | crear borrador de receta | profesional | orden no publicable |
| UC-DOC-02 | firmar y emitir receta | profesional | versión inmutable y publicable |
| UC-DOC-03 | anular/reemplazar receta | profesional | cadena de reemplazo auditada |
| UC-DOC-04 | cargar PDF/foto | personal autorizado | objeto en cuarentena |
| UC-DOC-05 | validar y clasificar archivo | profesional/sistema | documento clínico disponible |
| UC-DOC-06 | importar estudio DICOM | equipo/profesional | estudio, series e instancias indexadas |
| UC-DOC-07 | emitir informe de resultado | profesional | versión final |
| UC-DOC-08 | publicar al paciente | profesional | acceso controlado y notificación neutra |
| UC-DOC-09 | corregir informe | profesional | nueva versión, anterior preservada |

## Presupuesto, pagos y caja

| ID | Caso de uso | Actor principal | Resultado |
|---|---|---|---|
| UC-FIN-01 | cotizar una versión del plan | profesional/caja | presupuesto reproducible |
| UC-FIN-02 | aceptar presupuesto | paciente | aceptación y condiciones congeladas |
| UC-FIN-03 | crear plan de cuotas | caja | calendario y reglas |
| UC-FIN-04 | registrar adelanto | caja | crédito del paciente |
| UC-FIN-05 | registrar pago | caja/pasarela | movimiento idempotente |
| UC-FIN-06 | aplicar pago a cargos/cuotas | caja/sistema | saldo explicable |
| UC-FIN-07 | dividir pago por medios | caja | tender múltiple conciliable |
| UC-FIN-08 | devolver o revertir | supervisor | movimiento compensatorio |
| UC-FIN-09 | abrir/cerrar caja | caja | sesión y diferencias auditadas |
| UC-FIN-10 | conciliar pasarela/banco | caja | discrepancias identificadas |
| UC-FIN-11 | calcular comisión profesional | sistema/admin | liquidación reproducible |
| UC-FIN-12 | gestionar mora | sistema/caja | tareas y comunicaciones permitidas |

## Operación

| ID | Caso de uso | Actor principal | Resultado |
|---|---|---|---|
| UC-OPE-01 | solicitar trabajo de laboratorio | profesional | caso, proveedor y fechas |
| UC-OPE-02 | recibir/entregar trabajo | laboratorio | estado y trazabilidad |
| UC-OPE-03 | registrar compra/ingreso de stock | almacén | lote y costo |
| UC-OPE-04 | consumir insumo por procedimiento | asistente/sistema | movimiento y trazabilidad |
| UC-OPE-05 | transferir stock entre sedes | almacén | doble movimiento relacionado |
| UC-OPE-06 | controlar lote/caducidad | sistema | alerta y bloqueo configurable |

## Comunicación y crecimiento

| ID | Caso de uso | Actor principal | Resultado |
|---|---|---|---|
| UC-COM-01 | enviar recordatorio | sistema | entrega registrada |
| UC-COM-02 | procesar respuesta WhatsApp | paciente/sistema | cita o tarea actualizada |
| UC-COM-03 | solicitar recare | sistema/recepción | campaña clínica autorizada |
| UC-COM-04 | seguir presupuesto pendiente | sistema/recepción | tarea sin revelar datos sensibles |
| UC-COM-05 | medir satisfacción/NPS | paciente | respuesta separada del registro clínico |
| UC-COM-06 | revocar un canal | paciente | supresión inmediata para esa finalidad |

## Caso crítico detallado: registrar odontograma inicial

**Precondiciones**

- paciente identificado;
- encuentro abierto;
- profesional autenticado, habilitado y con relación asistencial;
- no existe odontograma inicial firmado para esa dentición/episodio.

**Flujo**

1. El profesional elige dentición y abre la plantilla FDI vigente.
2. Registra hallazgos mediante toque, teclado o arrastre.
3. El sistema valida pieza, superficie, concepto y compatibilidad.
4. Cada cambio genera un evento de borrador.
5. El profesional revisa leyenda, notas y alertas.
6. Confirma firma/cierre.
7. El sistema crea versión, snapshot imprimible, hash y auditoría.

**Alternos**

- si la conexión cae antes de firmar, se recupera el borrador autorizado;
- si existe conflicto de versión, no se sobrescribe y se solicita reconciliación;
- si se detecta un error después de firmar, se crea una adenda.

**Postcondiciones**

- la versión firmada no se modifica;
- el plan de tratamiento continúa vacío hasta una acción independiente;
- toda vista futura puede reconstruir el estado desde eventos.

## Caso crítico detallado: registrar un pago

**Precondiciones**

- caja abierta o pago originado por pasarela;
- moneda, medio, importe e identidad del pagador válidos;
- clave de idempotencia presente.

**Flujo**

1. Se registra el intento/recepción del pago.
2. El proveedor confirma o caja valida el efectivo.
3. Se crea el movimiento contable.
4. Se aplica según instrucciones a cargos/cuotas; el exceso queda como adelanto.
5. Se emite recibo o se solicita comprobante tributario.
6. Se actualizan proyecciones y se registra auditoría.

**Reglas**

- nunca actualizar un campo `saldo` sin movimientos;
- nunca borrar un pago confirmado;
- una devolución o corrección usa movimientos compensatorios;
- un webhook repetido produce el mismo resultado.

## Casos transversales obligatorios

Cada módulo debe contemplar autorización, concurrencia, auditoría, exportación, corrección,
notificación, idempotencia, retención, privacidad y recuperación ante fallas.

