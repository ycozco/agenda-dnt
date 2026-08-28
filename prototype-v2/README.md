# Prototype v2

Esta carpeta es la ampliación del mockup aprobado en `prototype/`. Se inicia con el
catálogo de imágenes y la separación de responsabilidades para no mezclar la web pública,
el portal paciente y la consola privada.

```text
prototype-v2/
├── assets/       imágenes descargadas, referencias odontológicas y catálogos
├── content/      especialidades, doctores, SEO y campañas ficticias
├── components/   componentes HTML reutilizables del mockup
├── pages/        vistas públicas, paciente y administración
├── scripts/      estado seed, filtros y simulaciones de interacción
├── styles/       tokens, layout responsive y componentes visuales
└── mobile/       vistas móviles desprendidas del portal paciente
```

Durante la etapa de validación, estas carpetas pueden implementarse con HTML, CSS y JS
vanilla. Si el contenido público crece, la estructura se puede mover a Astro conservando
`assets/`, `content/` y los estilos.

