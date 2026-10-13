# Evaluación de arquitectura actual

## Arquitectura observada

El despliegue revisado es un sitio estático servido por Nginx. Las páginas cargan JavaScript directamente y `mock-api-v2.js` mantiene el estado en `sessionStorage`. No existe API, base de datos, identidad, almacenamiento clínico ni cola operativa en el proyecto revisado.

La aplicación Staff concentra aproximadamente 4.000 líneas en un único HTML. Hay 69 archivos HTML y se identificaron ocho grupos de páginas duplicadas exactas, con 24 copias redundantes entre ellas.

## Fortalezas

- La separación funcional entre público, paciente, staff y superadmin es fácil de entender.
- La documentación propone dominios clínicos, agenda, documentos, pagos e interoperabilidad de forma razonable.
- El modelo futuro contempla `organization_id`, `site_id`, tiempos UTC, importes en unidades menores y auditoría append-only.
- La propuesta de monolito modular es adecuada para la primera versión operativa.
- El prototipo permite validar flujos y lenguaje visual antes de construir el backend.

## Debilidades estructurales

### Fuente de verdad única inexistente

El navegador es simultáneamente interfaz, base de datos, autorización y motor de negocio. Esto permite modificar datos, borrar historial y producir resultados distintos según la pestaña.

### Dominios mezclados

La API mock contiene tenants, 2FA, pacientes, citas, documentos, pagos, planes, triaje, offline y auditoría en una sola clase. Es difícil aplicar permisos y probar cada regla de forma independiente.

### Estado duplicado

Existen colecciones de citas generales y del día, valores duplicados del paciente y fallbacks con fechas fijas. Cada copia introduce riesgo de divergencia.

### Contratos de entrada débiles

Las funciones reciben objetos sin esquema, tipos, rangos ni campos permitidos. `Object.assign()` puede aceptar datos que no deberían ser editables.

### Frontera pública y privada insuficiente

Docker copia todo el repositorio y Nginx expone carpetas históricas. Los portales privados no están separados por una frontera de despliegue ni protegidos por un gateway.

## Veredicto

La arquitectura de producto está bien encaminada; la arquitectura de ejecución todavía corresponde a un prototipo. La migración recomendada es conservar la interfaz y sustituir progresivamente la API mock por un backend modular, manteniendo el frontend como cliente no confiable.
