# Expediente de auditoría del proyecto dental

Fecha de emisión: 16 de septiembre de 2026  
Alcance: `D:\\dental\\prototype-v2`, Docker/Nginx local en `http://localhost:8085/`

Este expediente reúne la revisión de seguridad, integridad de datos, arquitectura y optimización realizada sobre el prototipo clínico Dental v2.

## Estructura

- [Resumen ejecutivo](00-resumen-ejecutivo.md)
- [Seguridad](01-seguridad/01-evaluacion-seguridad.md)
- [Pruebas de frontend](01-seguridad/02-pruebas-frontend.md)
- [Integridad de datos](02-integridad/01-evaluacion-integridad.md)
- [Arquitectura actual](03-arquitectura/01-evaluacion-arquitectura.md)
- [Arquitectura objetivo](03-arquitectura/02-arquitectura-objetivo.md)
- [Optimización frontend y rendimiento](04-optimizacion/01-frontend-y-rendimiento.md)
- [Optimización backend y datos](04-optimizacion/02-backend-y-datos.md)
- [Roadmap de remediación](05-remediacion/01-roadmap-priorizado.md)
- [Evidencias reproducibles](06-evidencias/01-evidencias-reproducibles.md)

## Criterio de interpretación

El código revisado es un prototipo estático con una API simulada en el navegador. Los controles de autenticación, autorización, firma, auditoría, almacenamiento y sincronización que aparecen en la interfaz no deben considerarse controles de producción hasta que sean implementados y verificados en un backend.

La revisión identifica riesgos y pruebas reproducibles. No constituye una certificación de cumplimiento ni una prueba de penetración externa.
