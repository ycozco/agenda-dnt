# Auditoría de estado de vistas v2

## Versión que se está sirviendo

La captura corresponde a:

```text
http://localhost:8085/public/index.html
```

Por el contenido, el título `Prototipo v2` y las rutas relativas, el servidor está sirviendo la carpeta:

```text
D:\dental\prototype-v2
```

No corresponde al baseline `D:\dental\prototype`.

## Estado actual

| Superficie | Entrada | Estado |
|---|---|---|
| Web pública | `public/index.html` | Implementada y rediseñada full-width |
| Especialidades | `public/especialidades.html` | Implementada con índice editorial, sin tarjetas repetitivas |
| Detalle de especialidad | `public/especialidad.html?slug=ortodoncia` | Implementada |
| Equipo médico | `public/equipo.html` | Implementada; falta terminar revisión visual de perfiles |
| Perfil profesional | `public/profesional.html?id=pro_ana` | Implementada |
| Tecnología | `public/tecnologia.html` | Implementada |
| Contacto | `public/contacto.html` | Implementada |
| Reserva | `public/reservar.html` | Implementada |
| Portal paciente | `patient/login.html` + `patient/index.html` | Implementado para home, citas, tratamiento, documentos, recetas y pagos |
| Visor PDF | `patient/viewers/pdf.html` | Implementado como visor ficticio |
| Visor radiografía | `patient/viewers/radiografia.html` | Implementado como visor ficticio |
| App móvil paciente | `mobile/patient-flows.html` | Implementada como flujo hash |
| Control móvil/carga | `mobile/control.html` | Implementado en esta revisión; drag-and-drop y cola local |
| Login staff | `staff/login.html` | Implementado |
| Staff dashboard | `staff/index.html?view=dashboard` | Implementado |
| Staff odontograma | `staff/index.html?view=patient&patient=pat_maria` | Implementado como edición demo |
| Staff auditoría | `staff/index.html?view=audit` | Implementado |
| Staff agenda, documentos, caja, doctores, reportes, campañas | `staff/index.html?view=...` | Enlazados, pero todavía muestran placeholder progresivo |

## Accesos agregados a la landing

La portada ahora incluye el bloque `Elige dónde continuar` con enlaces directos a:

- `../staff/login.html` — consola administrativa.
- `../patient/login.html` — portal del paciente.
- `../mobile/patient-flows.html#home` — aplicación móvil del paciente.
- `../mobile/control.html` — control móvil para cargar resultados ficticios.

El footer también contiene los cuatro accesos.

## Correcciones aplicadas

- Se amplió el contenedor público a 1520 px.
- Se añadieron las clases `.grid-2`, `.grid-3` y `.grid-4`, que faltaban en el CSS v2.
- Se reemplazó la hero centrada por una composición 60/40 con fotografía humana.
- Se eliminaron las tarjetas coloreadas de especialidades en la landing.
- Se convirtió especialidades en índice numerado con tecnología, duración, etapas y CTA.
- Se eliminó la lista FAQ estrecha y centrada; ahora usa una composición de dos columnas.
- Se reemplazaron tarjetas de equipo por fichas editoriales con regla superior.
- Se cambió el sistema visual hacia fondo mineral, carbón, basalto y acento volcánico.
- Se redujeron radios, sombras y gradientes.
- Se corrigió `Periodoncia y Salud de Encías` y la duración `Variable`.
- Se agregó `mobile/control.html` con carga local de PDF/JPG/PNG/DICOM simulado y envío a revisión.

## Pendientes reales después de esta revisión

1. Implementar vistas staff que todavía caen en `Vista Staff en Desarrollo Progresivo`.
2. Revisar visualmente `equipo.html`, `profesional.html`, `contacto.html` y `tecnologia.html` con la nueva dirección editorial.
3. Crear un visor separado para fotografía intraoral si se desea diferenciarlo de radiografía.
4. Añadir estados staff de carga, revisión, publicación y rechazo de documentos.
5. Completar filtros, tablas, CRUD y reportes de la consola.
6. Reemplazar emojis de interfaz por un conjunto SVG accesible y coherente.
7. Validar la composición final en móvil real, tablet y escritorio amplio.

