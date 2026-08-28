# Revisión final y activos visuales

## Resultado

La propuesta es consistente después de corregir dos ambigüedades:

1. multisede ya no aparece como funcionalidad de una fase operativa; queda preparada en
   datos, permisos y contratos, con una única sede visible;
2. IA/voz ya no aparece como evolución funcional comprometida; queda sólo como extensión
   de datos desactivada.

El alcance activo se mantiene al nivel objetivo:

- agenda y recepción;
- pacientes y apoderados;
- historia, odontograma, periodoncia y ortodoncia;
- plan, procedimientos y consentimientos;
- documentos, recetas, fotografías y DICOM;
- presupuestos, pagos, cuotas, caja y conciliación;
- inventario, laboratorio y comisiones;
- portal/app, WhatsApp, recare y analítica;
- interoperabilidad preparada.

## Trazabilidad del mockup

| Decisión de propuesta | Evidencia en mockup |
|---|---|
| una sola sede operativa | contexto fijo `Sillar Dental · Yanahuara`, sin selector |
| multisede preparada | `organizationId` y `siteId` presentes en seed y modelo |
| IA/voz no funcional | no existen controles, endpoints simulados ni resultados IA |
| hallazgo separado del plan | paletas, estados y vistas independientes |
| ejecución separada del plan | procedimiento creado desde ítem, sin mutar su tipo |
| odontograma inicial inalterable | borrador → revisión → firma → adenda |
| archivos privados | estados cuarentena/revisión/publicado y visibilidad |
| saldo reproducible | cargos + pagos + aplicaciones + crédito + cuotas |
| paciente sólo ve lo publicado | filtro único desde el mismo seed |
| roles reales | recepción, profesional, caja y administrador cambian acciones |

## Revisión de datos seed

La historia principal es coherente:

- María tiene una cita confirmada;
- la evaluación origina hallazgo en pieza 16;
- el hallazgo sustenta un plan, pero no se convierte en tratamiento automáticamente;
- el plan v2 incluye restauración y evaluación implantológica;
- la aceptación parcial origina presupuesto y cargos;
- el adelanto de S/ 300 se aplica contablemente;
- quedan tres cuotas de S/ 1,160, totalizando S/ 3,480;
- adelanto más cuotas reconcilian con el importe aceptado de S/ 3,780;
- panorama e informe están publicados;
- fotografía intraoral permanece sólo para clínica.

## Hallazgo pendiente en agenda

En el prototipo, la cita de María usa sillón 1 a las 10:30. La demostración de
reprogramación hacia las 11:00 debe validar duración y buffers además del recurso. El
conflicto descrito con sillón 2 sólo es válido si la acción cambia también el recurso o
si el tipo de cita requiere dicho sillón. Al implementar el seed se fijará:

- duración de evaluación: 60 minutos;
- recurso actual: sillón 1;
- alternativa intentada: 11:00 en sillón 2;
- sillón 2 ocupado de 11:00 a 12:00;
- sugerencia válida: 11:30 en sillón 1 o 12:00 en sillón 2.

## Activos visuales incorporados

Ubicación:

`prototype/assets/images/dental-reference/`

Contenido:

- arcos dentales PNG y SVG de dominio público;
- esquema FDI PNG CC0;
- anatomía dental PNG CC BY-SA 4.0;
- radiografía panorámica JPG de dominio público;
- manifiesto de licencias y atribución.

## Clasificación de uso

### Puede usarse directamente en el mockup

- radiografía panorámica como archivo de muestra;
- anatomía dental en contenido educativo, con atribución;
- esquema FDI en documentación interna;
- arcos dentales como referencia o placeholder.

### Debe producirse específicamente

- hero de la landing;
- fotografías ficticias de especialidades y equipo;
- logo y marca Sillar Dental;
- miniaturas de documentos clínicos;
- fotografía intraoral ficticia;
- set SVG del odontograma;
- símbolos de hallazgos y tratamientos;
- ilustraciones de estados vacío/error;
- mapa esquemático de Yanahuara.

### No debe convertirse en dato clínico

Ningún PNG descargado será la fuente del odontograma. El estado clínico se almacena como
eventos y se representa con SVG semántico.

## Requisitos para el set SVG de dientes

El set propio debe incluir:

- 32 piezas permanentes;
- 20 piezas temporales;
- vista anatómica suficiente para reconocimiento;
- superficies separadas;
- IDs estables (`tooth-16`, `tooth-16-O`, etc.);
- estados de hover, foco, selección y deshabilitado;
- hit areas táctiles mayores que la geometría visible;
- compatibilidad con mouse, teclado y touch;
- impresión monocromática legible;
- licencia y autoría registradas.

## Control de licencias

Cada recurso futuro debe registrar:

```text
archivo
tipo
autor
URL fuente
licencia
fecha de descarga
modificaciones
uso previsto
atribución requerida
aprobado_por
```

Un archivo sin estos datos permanece fuera del prototipo.

## Estado para iniciar el mockup

La documentación y el seed están suficientemente definidos para empezar. El orden
recomendado es:

1. tokens y shell;
2. `seed.js`;
3. landing;
4. agenda/recepción;
5. paciente y encuentro;
6. odontograma SVG provisional;
7. plan y cuenta;
8. portal del paciente;
9. módulos avanzados;
10. revisión de coherencia y accesibilidad.

El SVG provisional puede utilizar formas propias simplificadas, pero no debe presentarse
como validado por la NTS 188 hasta completar la revisión clínica.
