# Pipeline de activos y decisión de arquitectura

## Estado implementado

- `tools/assets-manifest.json` agrupa las imágenes por uso: portada, equipo,
  especialidades, tecnología y referencias del portal paciente.
- `tools/download-assets.ps1` descarga de forma recursiva, crea las carpetas de destino,
  calcula SHA-256 y escribe un JSON lateral junto a cada imagen.
- `prototype-v2/assets/asset-catalog.json` es el catálogo consolidado de las siete
  imágenes externas descargadas.
- `prototype-v2/assets/images/reference/dental` contiene las referencias odontológicas
  ya existentes, con su catálogo de etiquetas y `LICENSES.md`.

Ejecutar:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\download-assets.ps1
```

Agregar o quitar recursos se hace primero en el manifiesto. No se deben asociar las
fotografías de Pexels a los doctores ficticios del seed: son únicamente referencias de
dirección de arte.

## ¿HTML/CSS/JS o Astro?

Para el mockup actual, HTML/CSS/JS está bien y es la opción más rápida para validar
layout, navegación, filtros, odontograma simulado, visor de documentos y pagos. No hay
que migrarlo ahora: las cuatro vistas existentes son estáticas, usan datos seed en
memoria y no requieren servidor para una demo.

Astro es una evolución recomendable para la web pública cuando el contenido crezca:

1. `src/layouts/PublicLayout.astro` centraliza navegación, footer, SEO y datos de
   `LocalBusiness`/`Dentist`.
2. `src/pages/` permite rutas para inicio, especialidades, doctores, tecnología,
   preguntas frecuentes, contacto y campañas.
3. `src/content/` puede mantener especialidades, doctores y artículos como contenido
   tipado, sin duplicar HTML.
4. `astro:assets` sirve imágenes responsivas, `width`, `height`, formatos optimizados y
   texto alternativo desde el catálogo local.
5. Los widgets con interacción intensa (odontograma, visor PDF/fotos, calendario,
   filtros) pueden continuar como JavaScript progresivo o convertirse después en islas
   React/Svelte/Preact. No se necesita convertir todo el sitio.

La recomendación concreta es híbrida:

- Mantener `prototype/` como baseline aprobado.
- Construir la nueva maqueta en `prototype-v2/` con HTML/CSS/JS hasta cerrar UX y
  contenido.
- Migrar solo la web pública a Astro cuando haya más de cinco rutas públicas, perfiles
  de doctores y cambios frecuentes de contenido.
- Mantener el portal paciente y la consola privada como aplicación autenticada separada;
  Astro por sí solo no sustituye API, autenticación, base de datos ni almacenamiento de
  documentos.

## Criterio de salida del prototipo

La migración se considera justificada cuando se cumplan simultáneamente: contenido SEO
repetible, al menos seis rutas públicas, catálogo de imágenes versionado, JSON-LD por
clínica/especialidad y necesidad de generar páginas estáticas con buen rendimiento. Hasta
ese punto, el stack actual es correcto y reduce el costo de iteración.

