# Visión y alcance

## Objetivo

Crear una plataforma clínica dental centrada en el flujo real de una consulta: captar o
registrar al paciente, agendar, atender, documentar hallazgos, proponer y ejecutar
tratamientos, emitir recetas y resultados, cobrar y mantener informado al paciente.

No se plantea únicamente una agenda con una ficha de paciente. El producto debe ser una
historia clínica dental longitudinal, con trazabilidad y acceso diferenciado.

## Usuarios

| Rol | Necesidades principales |
|---|---|
| Administrador de clínica | sedes, profesionales, permisos, catálogos, precios, auditoría |
| Recepción | pacientes, agenda, confirmaciones, caja y cobranza |
| Cirujano dentista | anamnesis, odontograma, diagnóstico, plan, evolución, recetas, adjuntos |
| Asistente | preparación de cita, carga autorizada de documentos y apoyo clínico |
| Caja/contabilidad | presupuestos, cuotas, pagos, comprobantes, cierres y saldos |
| Paciente o apoderado | citas, alertas, indicaciones, recetas, resultados y pagos |

## Canales

### Web responsive

Aplicación de trabajo para escritorio y tablet, usable también desde móvil. Las vistas
densas —agenda, odontograma y caja— deben priorizar tablet o escritorio, pero conservar
operaciones esenciales en pantallas pequeñas.

### Aplicación móvil del paciente

Debe permitir:

- registro y recuperación segura de cuenta;
- gestión de perfiles dependientes, por ejemplo hijos;
- solicitud, confirmación, reprogramación y cancelación de citas;
- notificaciones y recordatorios;
- consulta de recetas, indicaciones y resultados autorizados;
- descarga controlada de documentos;
- visualización de presupuestos, cuotas, pagos y saldos;
- consentimiento y aceptación de documentos cuando legalmente corresponda;
- canal de contacto, sin presentarlo como atención de emergencia.

## Principios del producto

1. **Registro clínico antes que dibujo:** el odontograma es una vista de datos clínicos.
2. **Separación de hechos y propuestas:** hallazgos, plan y procedimientos ejecutados son
   registros distintos.
3. **Trazabilidad:** toda acción clínica o financiera relevante conserva autor, momento,
   motivo y versión.
4. **Mínimo privilegio:** cada rol ve sólo la información necesaria.
5. **Interoperabilidad progresiva:** el modelo interno debe poder mapearse a FHIR y las
   imágenes diagnósticas a DICOM/DICOMweb.
6. **Accesibilidad táctil:** no depender exclusivamente de precisión de mouse, color o
   arrastre.
7. **Datos portables:** exportación clínica y financiera en formatos abiertos y PDF.

## Límites iniciales

Fuera del primer producto quedan la interpretación automática de radiografías, la
prescripción autónoma por IA, la contabilidad empresarial completa y la interoperabilidad
directa con RENHICE/SIHCE sin convenio o especificación oficial. Pueden estudiarse como
integraciones posteriores.

## Criterios de éxito del MVP

- cero doble-reserva de profesional, sillón o ambiente;
- cada registro clínico puede atribuirse a una persona y momento;
- el odontograma funciona con mouse, tacto y teclado;
- un archivo clínico nunca se expone mediante una URL pública permanente;
- el saldo del paciente se explica por cargos, pagos, adelantos y aplicaciones;
- el paciente sólo recibe contenido que un profesional haya marcado como publicable.
