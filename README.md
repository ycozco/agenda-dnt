# Propuesta de sistema de gestión dental

Este repositorio reúne la investigación y la propuesta inicial para una plataforma dental peruana compuesta por:

- una aplicación web responsive para clínica, recepción y profesionales;
- una aplicación móvil para pacientes;
- un odontograma digital táctil, auditable y conforme a la normativa peruana;
- agenda, alertas, historia clínica, recetas, resultados, imágenes y documentos;
- presupuestos, pagos, adelantos, fraccionamiento y cuotas.

## Documentos

1. [Visión y alcance](docs/01-vision-y-alcance.md)
2. [Investigación de tecnologías y sistemas referentes](docs/02-tecnologias-y-referentes.md)
3. [Odontograma digital peruano](docs/03-odontograma-digital-peru.md)
4. [Arquitectura, seguridad e interoperabilidad](docs/04-arquitectura-seguridad.md)
5. [Módulos, modelo funcional y hoja de ruta](docs/05-modulos-y-roadmap.md)
6. [Brechas frente a Dentalpin y software comercial](docs/06-brechas-y-evolucion.md)
7. [Catálogo de casos de uso](docs/07-casos-de-uso.md)
8. [Modelo de datos escalable](docs/08-modelo-de-datos.md)
9. [Alcance funcional nivelado](docs/09-alcance-funcional-nivelado.md)
10. [Diagramas integrales de la solución](docs/10-diagramas-integrales.md)
11. [Plan de vistas HTML y datos seed para el mockup](docs/11-plan-vistas-html-mockup.md)
12. [Revisión final y activos visuales](docs/12-revision-final-y-activos-visuales.md)
13. [Plan de rediseño v2: web, portales y mockups móviles](docs/13-plan-redisenio-v2-web-portales-y-movil.md)
14. [Pipeline de activos y decisión Astro](docs/14-pipeline-activos-y-decision-astro.md)
15. [Plan operativo de implementación de vistas v2](docs/15-plan-implementacion-vistas-v2.md)
16. [Auditoría de estilo y dirección visual](docs/16-auditoria-github-y-direccion-visual.md)
17. [Auditoría de estado de vistas v2](docs/17-auditoria-estado-vistas-v2.md)

## Mockup navegable

La propuesta ya incluye un prototipo estático en [`prototype/`](prototype/README.md):

- [Landing de Sillar Dental](prototype/index.html)
- [Flujo de reserva](prototype/reservar.html)
- [Portal del paciente](prototype/paciente.html?view=home)
- [Consola clínica](prototype/admin.html?view=dashboard)

El prototipo usa un único seed ficticio, datos en memoria y activos visuales documentados;
no procesa datos reales, pagos ni archivos clínicos.

La ampliación de activos se organiza en [`tools/`](tools/README.md) y se descarga hacia
[`prototype-v2/assets/`](prototype-v2/assets/). Cada imagen externa queda acompañada por
fuente, licencia, texto alternativo, etiquetas y hash SHA-256.

## Conclusión inicial

La recomendación es construir un núcleo propio y modular, tomando patrones de sistemas
open source, pero sin adoptar todavía un repositorio completo. La razón principal es que
el odontograma peruano, la trazabilidad clínica, la protección de datos y los flujos de
pagos locales requieren decisiones de dominio que no están resueltas por los proyectos
encontrados.

La primera prueba de concepto debe validar simultáneamente:

1. odontograma SVG táctil con nomenclatura FDI;
2. registro inicial inalterable y evolución separada;
3. agenda multi-sillón con prevención de conflictos;
4. carga segura de PDF, fotografías y estudios radiográficos;
5. presupuesto financiable y aplicación contable de pagos.

> Estado: propuesta preliminar. Las reglas clínicas y legales deben validarse con un
> cirujano dentista colegiado y asesoría legal peruana antes de pasar a producción.
