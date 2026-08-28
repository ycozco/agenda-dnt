# Alcance funcional nivelado

## Decisión de producto

La solución debe llegar al nivel funcional de los referentes comerciales en operación
clínica, administración y relación con el paciente. Sólo quedan proyectadas, no activas:

1. IA y voz;
2. operación multisede.

Multisede estará incorporada en el modelo de datos y autorización. IA/voz contará con
tablas, contratos y controles de gobernanza. Ninguna tendrá interfaces o procesos
operativos disponibles inicialmente.

## Matriz de alcance

| Dominio | Funcional en producto objetivo | Diseñado, no funcional |
|---|---|---|
| Organización | configuración de clínica y una sede | varias sedes y consolidación |
| Pacientes | expediente, duplicados, apoderados, consentimientos | identidad interorganizacional |
| Agenda | multi-profesional, sillones, equipos, reserva online, espera | agenda consolidada multisede |
| Clínica general | historia, odontograma, diagnóstico, plan, evolución | sugerencias clínicas por IA |
| Especialidades | periodoncia, ortodoncia, implantes y laboratorio | análisis automático |
| Documentos | fotos, PDF, resultados, firmas, versiones | resumen generado por IA |
| Radiología | carga, visor e integración DICOM/DICOMweb | detección radiográfica por IA |
| Recetas | borrador, emisión, firma, anulación y publicación | dictado o prescripción asistida |
| Finanzas | presupuestos, cuotas, pagos, caja, gastos y conciliación | predicción de cobranza por IA |
| Operación | inventario, lotes, laboratorios y comisiones | compras entre múltiples sedes |
| Paciente | portal/app, citas, formularios, resultados y pagos | asistente conversacional IA |
| Comunicación | WhatsApp oficial, email, push, campañas y recare | agente autónomo y voz |
| Analítica | KPIs clínicos, financieros, agenda y fidelización | análisis predictivo |

## Módulos funcionales requeridos

### 1. Configuración y seguridad

- organización y sede inicial;
- profesionales, especialidades, horarios y recursos;
- usuarios, roles, permisos y sustituciones temporales;
- catálogos clínicos, servicios, precios, impuestos y medios de pago;
- políticas de contraseña, MFA, sesiones y dispositivos;
- auditoría de acceso, modificación, impresión y descarga.

### 2. Gestión de pacientes

- persona, paciente e identificadores;
- búsqueda tolerante y detección de duplicados;
- contactos verificados y preferencias;
- apoderados, dependientes y vigencias;
- antecedentes, alergias, medicación y alertas;
- consentimientos por finalidad y versión;
- importación, exportación y fusión controlada.

### 3. Agenda y recepción

- agenda por profesional, sillón, ambiente y equipo;
- tipos de cita, duración y buffers;
- reserva interna y autoservicio;
- confirmación, reprogramación, cancelación e inasistencia;
- lista de espera y oferta de vacante;
- check-in, sala de espera y estado de atención;
- formularios previos y tareas de recepción;
- Google Calendar sólo como integración secundaria, nunca fuente autoritativa.

### 4. Historia clínica

- encuentro vinculado o no a cita;
- anamnesis versionada;
- notas con plantillas y firma;
- odontograma inicial inalterable;
- evolución odontológica;
- diagnóstico, plan, alternativas y aceptación;
- procedimientos realizados;
- consentimientos vinculados a versión del plan;
- cierre, adenda y exportación clínica.

### 5. Especialidades

- periodontograma por sitio y sesión;
- caso ortodóntico, controles, aparatos y fotografías;
- seguimiento de implantes;
- estética facial como extensión separada del odontograma;
- órdenes y casos de laboratorio;
- plantillas específicas configurables.

### 6. Documentos, imágenes y recetas

- carga segura de PDF, foto y otros formatos permitidos;
- cuarentena, antivirus, hash y versionado;
- visor de imágenes y comparación longitudinal;
- DICOM/Orthanc para estudios reales;
- informe diagnóstico y publicación selectiva;
- receta firmada, reemplazo/anulación e historial;
- URLs temporales y descarga auditada.

### 7. Plan, presupuesto y aceptación

- plan clínico versionado;
- alternativas y prioridades;
- presupuesto congelado por versión;
- descuentos autorizados;
- aceptación total, parcial o rechazo;
- firma/evidencia;
- seguimiento de tratamientos no agendados;
- presentación comprensible para paciente.

### 8. Finanzas

- cargos, créditos, adelantos y devoluciones;
- pago único, parcial, cuotas y fraccionamiento;
- medios combinados;
- pago online y webhooks idempotentes;
- caja, apertura, cierre y diferencias;
- gastos y categorías;
- conciliación de banco/pasarela;
- morosidad y compromisos de pago;
- comprobantes mediante integración local;
- libro de movimientos y saldo reproducible.

### 9. Inventario, laboratorio y comisiones

- productos e insumos;
- lotes, caducidad y ubicación;
- compras, consumos, ajustes y devoluciones;
- mínimos y alertas;
- asociación opcional de insumo a procedimiento;
- caso de laboratorio, proveedor, costo, estado y entrega;
- reglas versionadas de comisión;
- liquidación, aprobación y pago al profesional.

### 10. Experiencia y fidelización

- aplicación/portal del paciente;
- formularios y check-in;
- reserva, confirmación y pagos;
- acceso a documentos publicados;
- mensajería bidireccional;
- recordatorios y cuidados posteriores;
- recare y recuperación de inactivos;
- seguimiento de presupuestos;
- encuestas, NPS y solicitudes de reseña;
- preferencias por finalidad y canal.

### 11. Analítica

- ocupación por agenda y recurso;
- puntualidad, cancelación e inasistencia;
- conversión de presupuesto y aceptación;
- procedimientos propuestos/realizados;
- producción, cobros y cuentas por cobrar;
- inventario y consumo;
- desempeño de laboratorio;
- recare, retención y cohortes;
- comisiones y rentabilidad operativa;
- calidad de datos y tareas pendientes.

## Capacidades proyectadas

### IA y voz

El esquema admite trabajos, artefactos, revisiones y consentimiento, pero:

- no hay botones, endpoints públicos ni workers activos;
- no se contrata ni configura proveedor;
- no se almacenan grabaciones;
- no se genera ni modifica contenido clínico;
- no se incluye en métricas de aceptación del MVP.

### Multisede

Toda entidad dependiente de localización incluye sede y claves de alcance, pero:

- se crea una única sede;
- no existe selector de sede;
- no hay transferencias, consolidación o numeración intersede;
- no hay sincronización de configuraciones;
- las pruebas verifican que agregar la segunda sede no requiera rediseñar tablas.

## Definición de “al nivel”

Una funcionalidad no está completa por existir una pantalla. Debe incluir:

- permisos;
- validaciones e invariantes;
- concurrencia e idempotencia;
- historial y corrección;
- notificaciones aplicables;
- auditoría;
- reportes;
- exportación;
- pruebas;
- recuperación ante errores;
- comportamiento móvil y accesible.

## Priorización de entrega

El alcance objetivo es amplio, pero se entrega en verticales utilizables:

1. configuración, paciente, seguridad y agenda;
2. atención clínica y odontograma;
3. documentos, imágenes, recetas y portal;
4. plan, presupuesto, caja, pagos y cuotas;
5. especialidades, laboratorio, inventario y comisiones;
6. comunicación, recare y analítica;
7. interoperabilidad;
8. sólo después: multisede e IA/voz mediante aprobación independiente.

