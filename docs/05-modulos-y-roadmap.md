# Módulos, modelo funcional y hoja de ruta

## Agenda y alertas

Funciones:

- agenda diaria, semanal, por profesional, sede y sillón;
- disponibilidad, bloqueos y horarios recurrentes;
- duración por tipo de cita y buffers;
- lista de espera y relleno de cancelaciones;
- estados y trazabilidad de reprogramaciones;
- recordatorios configurables y confirmación del paciente;
- reglas de cancelación e inasistencia;
- alertas internas de retraso, paciente llegado y saldo, sin exponer datos innecesarios.

Regla central: una cita queda confirmada sólo después de que el servidor valida y reserva
atómicamente todos sus recursos.

## Historia y atención

- filiación, contactos, apoderado y contactos de emergencia;
- antecedentes, alergias, medicación y alertas clínicas;
- anamnesis y examen;
- odontograma inicial;
- diagnósticos y notas clínicas;
- plan de tratamiento versionado;
- consentimientos asociados a versión del plan;
- evolución por encuentro;
- procedimientos, profesional y piezas/superficies;
- recetas, indicaciones y próxima cita;
- documentos, resultados, fotos y radiología.

Las plantillas ayudan a capturar información, pero el profesional conserva la
responsabilidad de revisar y firmar.

## Resultados y documentos

Cada elemento incluye:

- tipo y categoría clínica;
- paciente y encuentro;
- autor/cargador y profesional que valida;
- fecha clínica y fecha de carga;
- estado: borrador, en revisión, final, corregido/anulado;
- visibilidad: sólo clínica, compartible, publicado al paciente;
- hash, tamaño, MIME, versión y objeto original;
- relaciones con pieza FDI, procedimiento o estudio;
- nota de interpretación sin modificar el archivo fuente.

Una corrección genera nueva versión y conserva la anterior. La publicación al paciente
es una acción explícita y auditada.

## Plan, presupuesto y pagos

### Separación contable

- **Plan clínico:** qué se propone y por qué.
- **Presupuesto:** precio, descuento, vigencia y versión.
- **Cargo:** obligación creada por procedimiento o acuerdo.
- **Plan de pagos:** calendario acordado.
- **Pago:** dinero efectivamente recibido.
- **Aplicación:** cómo un pago se distribuye entre cargos/cuotas.
- **Adelanto:** crédito no aplicado o parcialmente aplicado.
- **Devolución/ajuste:** movimiento compensatorio, nunca borrado.

### Modalidades

- pago único;
- adelanto más saldo;
- cuotas iguales;
- cuotas personalizadas por importe/fecha;
- fraccionamiento por etapa del tratamiento;
- pago parcial de una o varias cuotas;
- pago combinado con varios medios;
- reprogramación mediante nueva versión del acuerdo.

### Medios

Efectivo, tarjeta, transferencia, billetera/QR y otros configurables. La integración local
con pasarelas y comprobantes electrónicos debe evaluarse con el modelo tributario de la
clínica. El sistema no almacenará PAN completo ni CVV; usará tokenización del proveedor.

### Reglas

- importes en unidades menores (céntimos), no `float`;
- moneda explícita;
- libro de movimientos append-only;
- idempotencia en webhooks y registro de conciliación;
- no marcar como pagado por una captura de pantalla;
- descuentos y anulaciones con permiso y motivo;
- cierre de caja y diferencias auditadas;
- recibo/comprobante vinculado, sin confundirlo con historia clínica.

## Aplicación del paciente

### Inicio

- próxima cita y botón confirmar/reprogramar;
- tareas pendientes;
- nuevos documentos/resultados;
- saldo y próxima cuota;
- indicaciones recientes.

### Privacidad familiar

Un apoderado no debe convertirse en propietario indistinto de todos los datos. La
relación debe tener alcance, vigencia y sustento, y contemplar cambios de mayoría de edad,
revocación y acceso a dependientes.

## Reportes

- ocupación y utilización por sillón/profesional;
- confirmación, cancelación e inasistencia;
- tratamientos propuestos, aceptados, iniciados y completados;
- cuentas por cobrar y antigüedad de saldos;
- caja por medio de pago y conciliación;
- producción por sede/profesional;
- documentos pendientes de revisión/publicación;
- accesos y eventos de seguridad.

Los reportes clínicos y financieros tendrán permisos separados.

## Roadmap

### Fase 0 — Descubrimiento y cumplimiento (3–4 semanas)

- entrevistas y mapeo del flujo de dos clínicas;
- validación de NTS 188 y catálogo inicial;
- revisión legal de historia, privacidad, receta, consentimiento y retención;
- auditoría técnica/licencias de Dentalpin, Apexo, OpenEMR y Open Dentist;
- prototipo navegable y modelo de amenazas.

**Salida:** alcance firmado, matriz normativa y decisión construir/fork.

### Fase 1 — Fundaciones y agenda (6–8 semanas)

- identidad, roles, sedes, profesionales y pacientes;
- agenda de recursos y restricciones;
- confirmaciones y notificaciones;
- auditoría y observabilidad;
- CI/CD, backups y ambientes.

**Salida:** piloto de recepción con datos ficticios y pruebas de conflicto.

### Fase 2 — Clínica y odontograma (8–12 semanas)

- encuentro, anamnesis y alertas;
- odontograma inicial, plan y evolución separados;
- catálogo normativo versionado;
- notas, procedimientos y exportación PDF;
- pruebas táctiles y de accesibilidad.

**Salida:** piloto supervisado en tablet y escritorio.

### Fase 3 — Documentos, recetas y paciente (8–10 semanas)

- carga segura, revisión y publicación;
- fotos, PDF y base DICOM/Orthanc;
- recetas y firma/validación conforme al alcance legal;
- app móvil del paciente, notificaciones y dependientes.

### Fase 4 — Presupuesto, caja y cuotas (6–8 semanas)

- plan/precio, cargos, pagos, adelantos y cuotas;
- conciliación, caja y reportes;
- integración con pasarela/comprobantes seleccionada.

### Fase 5 — Operación integral y crecimiento

- periodontograma y seguimiento de especialidades;
- laboratorio, inventario, gastos y comisiones;
- reserva online, lista de espera y WhatsApp bidireccional;
- cobranza, recare, satisfacción y analítica operacional;
- conciliación y automatización de tareas.

### Fase 6 — Interoperabilidad y escalamiento

- perfiles FHIR de intercambio;
- DICOMweb completo;
- disponibilidad alta y recuperación ante desastre;
- integraciones autorizadas con ecosistema peruano.

### Capacidades proyectadas, no activas

- **Multisede:** el modelo, permisos, índices y contratos incluyen `site_id`, pero la
  primera versión operará una única sede por organización. No tendrá transferencias,
  agenda consolidada ni reportes comparativos entre sedes.
- **IA y voz:** se reservan contratos, consentimientos, trazas y referencias a artefactos,
  pero no se habilitarán transcripción, diagnóstico, agentes, análisis de imágenes ni
  generación de notas hasta una fase posterior aprobada.

## Equipo mínimo sugerido

- product owner con acceso diario a usuarios;
- referente clínico odontológico;
- UX/UI con experiencia táctil y accesibilidad;
- 2 desarrolladores full-stack;
- 1 desarrollador móvil;
- QA automatización/manual;
- DevSecOps parcial;
- asesor legal/privacidad por hitos.

## Riesgos principales

| Riesgo | Mitigación |
|---|---|
| interpretar mal símbolos normativos | catálogo trazable y validación clínica doble |
| confundir plan con hallazgo o ejecución | entidades, permisos y vistas separadas |
| fuga de fotografías/radiografías | almacenamiento privado, URLs breves, auditoría |
| doble reserva | restricción transaccional en servidor |
| saldo inexplicable | libro contable y aplicación explícita de pagos |
| deuda por fork open source | auditoría de licencia, seguridad y mantenibilidad |
| notificaciones con datos sensibles | mensajes neutros y contenido tras autenticación |
| alcance excesivo | entregas por fases y criterios de salida |

## Próximas decisiones

1. tipo de clínica: una sede, cadena o SaaS multiempresa;
2. facturación electrónica y pasarela objetivo en Perú;
3. si el personal necesita operación clínica offline;
4. alcance exacto de recetas y firma digital;
5. equipamiento radiológico y formatos reales disponibles;
6. comité clínico que aprobará símbolos y flujos;
7. resultados de la prueba comparativa de bases open source.
