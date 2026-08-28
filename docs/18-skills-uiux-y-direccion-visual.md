# Skills visuales instaladas y dirección UI v2

Fecha: 2026-07-25  
Prototipo servido: `D:\dental\prototype-v2`  
URL de revisión: `http://localhost:8085/public/index.html`

## Skills instaladas

| Skill | Ruta | Uso en el prototipo |
|---|---|---|
| UI/UX Pro Max | `D:\dental\.codex\skills\ui-ux-pro-max` | Generación del sistema visual y diales de densidad/movimiento |
| frontend-design | `D:\dental\.agents\skills\frontend-design` | Evitar estética genérica, jerarquía, composición y dirección de marca |
| frontend-ui-engineering | `D:\dental\.agents\skills\frontend-ui-engineering` | Responsive, accesibilidad, estados y disciplina de componentes |
| web-design-guidelines | `D:\dental\.agents\skills\web-design-guidelines` | Revisión de foco, formularios, imágenes, navegación y anti-patrones |

El resultado persistido por UI/UX Pro Max está en `D:\dental\design-system\sillar-dental\MASTER.md`, con overrides para `dashboard` y `patient-portal`.

## Dirección visual aprobada

- **Concepto:** software clínico mineral de Arequipa: azul mineral, superficies blancas, fondo celeste muy claro y verde para acciones positivas.
- **Paleta:** primaria `#0284C7`, azul profundo `#0C4A6E`, secundario `#0891B2`, CTA `#15803D`, fondo `#F0F9FC`, borde `#C7DBE3`.
- **Tipografía:** Fira Sans para lectura e interfaz; Fira Code únicamente para metadatos, numeración y estados operativos.
- **Forma:** radios de 8–12 px, bordes finos, sombras bajas y explícitas; no se usan gradientes decorativos ni tarjetas flotantes repetitivas.
- **Composición pública:** hero 60/40 a ancho amplio, riel de accesos directos, especialidades por etapa y equipo editorial.
- **Composición staff:** sidebar azul, navegación numerada, KPIs densos y tablas preparadas para trazabilidad.
- **Composición paciente:** expediente legible, navegación numerada y accesos a documentos/visores.
- **Móvil:** cinco destinos máximos en navegación inferior, objetivos táctiles y safe-area.

## Cambios aplicados

- `assets/css/tokens.css`, `base.css` y `components.css`: tokens, tipografía, foco visible, ritmo 4/8, contraste y estados.
- `assets/css/public-v2.css`: landing a ancho amplio, acceso de cuatro superficies y catálogo editorial sin tarjetas genéricas.
- `assets/css/staff-v2.css`: consola administrativa densa, navegación por números, sidebar y odontograma sin iconos emoji.
- `assets/css/patient-v2.css`: portal paciente con lectura por expediente y navegación accesible.
- `assets/js/components.js`: toasts con `aria-live` y limpieza de iconos heredados para que el mockup use marcadores consistentes.
- `mobile/control.html`: carga demo de PDF, imagen y DICOM con metadatos y cola de revisión.
- `public/index.html`: enlace “Saltar al contenido”, hero con texto alternativo y accesos a admin, paciente y móviles.

## Revisión realizada

- Landing: 4 accesos directos, hero visible y especialidades no genéricas.
- Staff: dashboard renderiza KPIs y 7 destinos operativos; no quedan emojis visibles.
- Paciente: inicio renderiza cita, progreso y accesos documentales; navegación limpia.
- Móvil paciente: 5 destinos, navegación hash y 0 emojis visibles tras render.
- Control móvil: dropzone, selects, textarea y botón de revisión disponibles.
- `node --check` correcto para `components.js`, `mock-api-v2.js`, `content-v2.js` y `seed-v2.js`.

## Pendiente funcional

Las vistas `agenda`, `reception`, `patients` y `finance` de staff aún muestran una pantalla de “desarrollo progresivo”; el siguiente incremento debe convertirlas en tablas y formularios conectados al mismo seed/API mock antes de pasar a backend.
