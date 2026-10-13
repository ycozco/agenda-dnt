# Optimización frontend y rendimiento

## Hallazgos

### Duplicación de páginas

Hay 69 HTML en `prototype-v2`. Se detectaron ocho grupos de contenido exacto duplicado y 24 copias redundantes. Las variantes dark/light deben convertirse en una misma página con tokens y `data-theme`.

### Staff monolítico

`staff/index.html` concentra navegación, plantillas, eventos, formularios y reglas de negocio. Esto aumenta el tiempo de revisión y hace que un error de una sección afecte todo el portal.

**Recomendación:** dividir por módulos cargables: agenda, pacientes, consulta, imágenes, documentos, caja, seguridad y configuración.

### Imágenes pesadas

Las imágenes públicas más grandes superan 1 MB y una llega aproximadamente a 2,6 MB. Conviene generar variantes responsive, usar `srcset`, `sizes`, `loading="lazy"` para contenido fuera de pantalla y reservar dimensiones para evitar saltos de layout.

### Caché demasiado conservadora

Nginx aplica `no-cache, no-store` globalmente. Para recursos públicos versionados debe usarse caché de larga duración; para datos privados deben mantenerse políticas de no almacenamiento y cabeceras apropiadas.

### Dependencias CDN

Varias páginas cargan Tailwind desde CDN y algunas usan librerías externas sin un proceso de compilación versionado. Esto agrega dependencia de red, dificulta CSP y hace menos reproducible el despliegue.

**Recomendación:** instalar dependencias, fijar versiones, compilar CSS/JS y generar un artefacto de producción mínimo.

### Accesibilidad y experiencia

Se observaron formularios sin asociación completa entre `label` e `input`, controles implementados como `div` con `onclick`, enlaces nuevos sin `noopener`, ausencia de skip link y varios estilos `outline: none` sin foco visible equivalente.

También se detectó overflow horizontal en la portada pública en anchos de 390 px y 1440 px. `overflow-x: hidden` puede ocultar el síntoma sin resolver la causa.

## Arquitectura frontend propuesta

```text
apps/
  public-site/
  patient-portal/
  staff-console/
  superadmin-console/

packages/
  ui/
  design-tokens/
  api-client/
  forms/
  security-boundary/
```

Cada aplicación debe tener rutas, estados de carga/error/vacío, límites de error y componentes propios. Las reglas clínicas y financieras deben salir del frontend.

## Métricas que deben añadirse

- LCP, INP y CLS por aplicación.
- Peso JavaScript/CSS por ruta.
- tiempo de interacción de agenda y odontograma.
- tasa de errores JavaScript por ruta.
- porcentaje de imágenes servidas como derivados.
- tamaño del HTML inicial y cantidad de requests.
- cobertura de navegación con teclado y lectores de pantalla.
