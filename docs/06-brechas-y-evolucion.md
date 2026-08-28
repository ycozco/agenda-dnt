# Brechas frente a Dentalpin y software comercial

Investigación actualizada el 23 de julio de 2026. Las funcionalidades comerciales se
basan en información pública de los proveedores; deben confirmarse mediante demos.

## Respuesta ejecutiva

La propuesta inicial cubre correctamente el núcleo clínico y normativo, pero todavía se
queda atrás en cinco capacidades que el mercado vende como una experiencia integrada:

1. adquisición, autoservicio y fidelización de pacientes;
2. especialidades dentales más allá del odontograma general;
3. operación integral de clínica: laboratorio, inventario y remuneración profesional;
4. automatización financiera y de cobranza;
5. analítica operacional y automatización asistida por IA.

No todas deben entrar al MVP. La evolución correcta es construir primero una base que
admita esos dominios sin añadir columnas y excepciones a una única “ficha paciente”.

## Comparación

| Capacidad | Propuesta actual | Dentalpin | Dentalink / mercado LATAM | CareStack / Dentrix Ascend / Curve | Brecha |
|---|---|---|---|---|---|
| Agenda por profesional y recurso | diseñada | incluida | incluida, con reserva online y automatizaciones | optimización, formularios, elegibilidad y engagement | media |
| Historia y odontograma | sólida y adaptada a NTS 188 | incluida | odontograma, periodontograma, ortodoncia, estética | chart, perio, implantes, imágenes y voz | alta en especialidades |
| Plan y presupuesto | diseñado | incluido | firma, seguimiento, morosidad y financiación | aceptación, e-sign y estimación financiera | media |
| Pagos y cuotas | modelo contable propuesto | facturación básica | caja, cuotas, gastos y comisiones | autopago, conciliación, estados y collections | media-alta |
| Imágenes | S3 + DICOM/Orthanc diseñados | rayos X/imágenes | carga y algunas funciones de IA | captura integrada, calidad y análisis de RX | alta |
| Recetas | diseñada con trazabilidad | no destacada como ventaja | receta electrónica y firma | eRx e historial farmacológico | media |
| Portal/app paciente | app propuesta | módulo opcional | agenda, firma, comunicación | formularios, check-in, pagos, mensajes | alta hasta implementarla |
| WhatsApp/omnicanal | previsto | anunciado/opcional | fuerte en LATAM y Perú | SMS, email, telefonía y portal | alta para el mercado local |
| Inventario/laboratorio | fuera del núcleo inicial | no central | incluidos en Dentalink | casos de laboratorio y procurement | alta |
| Comisiones/proveedores | no detallado | reportes por profesional | cálculo de pago a odontólogos | provider payroll/tagging | alta |
| Multi-sede | previsto | opcional | incluido por planes | núcleo empresarial/DSO | media |
| Analítica | reportes definidos | reportes | reportes gráficos y seguimiento | KPIs, rentabilidad y optimización en tiempo real | alta |
| IA/voz | pospuesta | agente operativo con confirmación | resúmenes, auditoría e imágenes | voz, imagen, llamadas y productividad | alta, pero no MVP |
| Interoperabilidad | FHIR/DICOM prevista | REST/OpenAPI | poco visible públicamente | integraciones amplias, orientadas a EE. UU. | oportunidad diferenciadora |
| Cumplimiento peruano | prioridad explícita | no específico | algunos proveedores lo declaran | cumplimiento estadounidense | ventaja potencial |

## Qué ofrece hoy la competencia

### Dentalpin

Es el referente open source funcional más cercano: calendario, paciente, odontograma,
historia, plan, presupuestos, facturación e imágenes. Declara API OpenAPI, módulos,
autoservicio y una dirección hacia agentes que ejecutan acciones con confirmación humana.

Nuestra propuesta puede superarlo en adecuación peruana, odontograma legalmente
trazable, DICOM, contabilidad de cuotas y portabilidad; se queda atrás hasta construir
una experiencia real, instalable y probada, no sólo documentos de arquitectura.

### Dentalink

Añade periodontograma, ortodoncia, estética facial, consentimiento/firma, inventario,
laboratorio, gastos, comisiones, marketing, morosidad, telemedicina, encuestas y
multi-centro. Es el competidor regional más útil para definir amplitud funcional.

### SIT-DENTAL y oferta peruana

El estándar local ya comunica agenda multi-doctor, recordatorios WhatsApp/SMS/email,
confirmación, lista de espera, Google Calendar, odontograma FDI, caja, imágenes y acceso
móvil. Por tanto, “odontograma + agenda + pagos” no constituye diferenciación.

### CareStack, Dentrix Ascend y Curve

Muestran el nivel de madurez superior:

- imágenes dentro del chart y apoyo de IA;
- periodoncia por voz y notas dictadas;
- formularios, portal, check-in y mensajería bidireccional;
- planes con débito automático y pagos online;
- laboratorio, implantes, procurement e inventario;
- tableros de reunión diaria y KPIs de aceptación, recare y rentabilidad;
- operación multi-sede y seguridad verificable.

Parte de sus seguros y claims no es trasladable directamente a Perú, pero su diseño de
flujo y control operativo sí es relevante.

## Evolución propuesta

### Nivel 1 — Sistema clínico confiable

Agenda, paciente, historia, odontograma NTS 188, plan, procedimientos, archivos, receta,
presupuesto, pagos y auditoría. Es el MVP comercializable.

### Nivel 2 — Sistema operativo de clínica

Periodontograma, ortodoncia, consentimientos, laboratorio, inventario, gastos, comisiones,
cierre de caja y app del paciente. El modelo conserva alcance por sede, pero la operación
multisede no se activa.

### Nivel 3 — Motor de crecimiento

Reserva online, lista de espera automática, WhatsApp bidireccional, campañas por cohortes,
recare, recuperación de pacientes, seguimiento de presupuestos, NPS y referidos.

### Nivel 4 — Plataforma interoperable

FHIR/DICOMweb, integraciones autorizadas, portabilidad completa y automatización basada
en reglas deterministas.

IA, dictado, voz, interpretación automática de imágenes y agentes quedan únicamente
proyectados en datos y contratos. No forman parte de los niveles funcionales iniciales.

## Diferenciadores defendibles

- odontograma peruano con trazabilidad normativa y UX táctil;
- funcionamiento excelente en tablet y conectividad variable;
- cuotas, adelantos y cobranza adaptados al comportamiento local;
- WhatsApp oficial integrado al flujo, con privacidad;
- portabilidad de datos y API documentada;
- DICOM real, no sólo carga de imágenes;
- historial clínico append-only y seguridad demostrable;
- arquitectura preparada para multisede sin presentar esa operación como implementada.

## Fuentes

- [Dentalpin](https://www.dentalpin.com/en/)
- [Dentalink, funcionalidades](https://www.softwaredentalink.com/es/)
- [Dentalink Perú](https://contenido.softwaredentalink.com/conoce-dentalink-peru)
- [SIT-DENTAL Perú](https://sit-dental.com/)
- [CareStack, funcionalidades](https://carestack.com/dental-software/features)
- [Dentrix Ascend](https://www.dentrixascend.com/)
- [Curve Dental](https://www.curvedental.com/feature-overview)
