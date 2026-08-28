# Auditoría de estilo y dirección visual

## 1. Resultado de la búsqueda

Se revisaron skills y repositorios de diseño frontend en GitHub para evitar que el rediseño se limite a cambiar colores:

- [Anthropic · frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md): exige una dirección estética explícita, contenido real del dominio y una decisión visual memorable.
- [Joshua David Thomas · frontend-design-principles](https://github.com/joshuadavidthomas/agent-skills/blob/main/frontend-design-principles/SKILL.md): separa marketing de aplicaciones y obliga a definir dominio, mundo cromático, firma visual y defaults que se deben rechazar.
- [Marketing Design](https://github.com/joshuadavidthomas/agent-skills/blob/main/frontend-design-principles/marketing.md): recomienda dirección editorial, tipografía con voz, composición asimétrica y evitar el patrón hero + tarjetas + CTA sin una idea propia.
- [Application Design](https://github.com/joshuadavidthomas/agent-skills/blob/main/frontend-design-principles/app.md): propone precisión y contención para dashboards, un solo color de acción y reservar el color para comunicar estado.
- [Vercel · web-design-guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md): sirve para auditar accesibilidad, estados, navegación y consistencia después de implementar.
- [Shadcn Space](https://github.com/shadcnspace/shadcnspace): referencia de bloques y componentes con código editable, accesible y reutilizable; se usará como inspiración de patrones, no como identidad visual.

## 2. Diagnóstico del prototipo actual

El baseline funciona, pero visualmente se percibe genérico por estas decisiones:

1. La hero usa gradientes suaves, una composición simétrica y un esquema dental como protagonista; parece una demo de producto, no una clínica de Arequipa.
2. `DM Sans + Newsreader`, botones pill, radios grandes y tarjetas repetidas producen una estética SaaS intercambiable.
3. Azul, teal, terracota, ámbar y verde aparecen a la vez en marketing; los estados pierden jerarquía.
4. Las tarjetas de especialidades cambian de color, pero no cuentan una historia clínica ni diferencian etapas.
5. El header, la hero y la franja de confianza utilizan el mismo peso visual; no hay una tesis clara de marca.
6. La consola y el portal paciente heredan demasiada lógica de tarjeta de la landing, cuando deberían funcionar como instrumentos de trabajo.
7. La imagen de referencia de arcadas funciona para validar el odontograma, pero no debe ser el recurso principal de una portada pública.

## 3. Dirección aprobada para la siguiente iteración

### Nombre de la dirección

**Sillar editorial clínico**: una clínica especializada que combina la materialidad del sillar de Arequipa con la precisión de una ficha clínica bien explicada.

### Sensación buscada

Calma, criterio, proximidad y precisión. Debe sentirse como una clínica que documenta bien y explica mejor; no como una startup de salud genérica.

### Mundo del producto

Cantera, luz blanca, sombra de patio, ficha clínica, radiografía, instrumental, papel de consentimiento, trayecto del tratamiento y conversación con el especialista.

### Firma visual

Cada pantalla pública tendrá una **ficha lateral de contexto**: etapa del tratamiento, especialidad, sede o próxima acción. En lugar de llenar la interfaz con tarjetas, se usará una columna editorial con numeración, una regla vertical y una acción concreta.

Ejemplos:

- Inicio: `01 / Entender` junto al diagnóstico.
- Especialidad: `02 / Planificar` junto a alternativas y duración.
- Paciente: `03 / Acompañar` junto a próxima cita y documentos.
- Admin: `04 / Registrar` junto al evento, actor y estado.

## 4. Sistema visual v2

### Paleta propuesta

Retirar el teal y el terracota como colores de marca simultáneos. La marca tendrá un fondo mineral, una tinta oscura y un solo acento volcánico.

| Token v2 | Valor sugerido | Uso |
|---|---:|---|
| `--sillar` | `#F4F0E8` | fondo editorial principal |
| `--cal` | `#FBFAF6` | superficies y formularios |
| `--carbon` | `#202322` | titulares y navegación |
| `--grafito` | `#59605D` | texto secundario |
| `--basalto` | `#2E4650` | enlaces y acción principal |
| `--volcan` | `#A4533F` | acento de marca y llamados puntuales |
| `--musgo` | `#6F7A5A` | apoyo editorial, no estado clínico |
| `--linea` | `#D9D5CB` | reglas y división |
| `--success` | `#4F765B` | éxito solamente |
| `--warning` | `#A4712A` | advertencia solamente |
| `--danger` | `#A0443D` | error o reverso solamente |

Regla: en la web pública la mayoría de elementos debe ser `--sillar`, `--cal`, `--carbon` y `--basalto`. `--volcan` aparece en pequeños momentos de marca. En la aplicación, los colores semánticos se reservan para estados.

### Tipografía

- Display público: `Fraunces` o `Newsreader`, usada sólo en títulos y citas.
- Texto público: `Source Sans 3` o `Manrope`, con pesos 400/500/600.
- Portal y admin: `Source Sans 3`/`IBM Plex Sans` para lectura y tablas.
- Metadatos: `IBM Plex Mono` en fechas, IDs, versiones y eventos de auditoría.
- No usar una fuente display en botones, tablas o formularios.

### Forma y profundidad

- Reducir `border-radius: 999px` a botones y tags únicamente.
- Cards grandes: radio 8–12 px; paneles clínicos importantes pueden usar 16 px.
- Sustituir sombras suaves omnipresentes por reglas, contraste de fondo y una sombra sólo en overlays.
- Evitar glassmorphism y gradientes decorativos.
- Usar bordes, numeración, subrayados y fotografía para generar ritmo.

### Espaciado y composición

- Publicidad: grid editorial de 12 columnas, con una columna lateral de contexto.
- Hero: 60/40 asimétrica; fotografía humana a sangre, título grande y ficha superpuesta sólo una vez.
- Especialidades: lista numerada horizontal o vertical, no cuatro tarjetas de colores.
- Equipo: retratos alineados en una tira editorial con ficha expandible.
- Contacto: formulario y datos de clínica en dos columnas con regla vertical, no dos cards flotantes.
- Admin: listas densas y panel de detalle; no dashboard de tarjetas iguales.

## 5. Aplicación por superficie

### Web pública

Conservar:

- la paleta sobria;
- los CTAs de reserva y contacto;
- la navegación por especialidad;
- las imágenes etiquetadas del catálogo.

Retirar o transformar:

- hero con esquema dental como imagen principal;
- trust strip con cuatro íconos genéricos;
- grid de tarjetas de colores;
- fondos radiales y tarjetas translúcidas;
- exceso de bordes redondeados.

Componentes nuevos:

- `EditorialHeader`;
- `BrandLockup` con monograma geométrico sillar;
- `HeroEditorial`;
- `ContextRail`;
- `CampaignTicker` pausible;
- `SpecialtyIndex` numerado;
- `DoctorStrip`;
- `ClinicalProcess`;
- `ContactSplit`;
- `PublicFooter` con datos de sede.

### Portal paciente

Dirección: **cuaderno de seguimiento**.

- Fondo cal y navegación discreta.
- Una acción principal por pantalla.
- Timeline vertical para citas, documentos y eventos.
- Documentos como archivo con fecha, tipo y estado; no como galería de cards iguales.
- El odontograma de sólo lectura se presenta como una lámina clínica con leyenda.
- Pagos como estado de cuenta lineal, con resumen arriba y movimientos debajo.

Componentes nuevos:

- `PatientNotebookShell`;
- `NextAction`;
- `ClinicalTimeline`;
- `DocumentArchive`;
- `ReadingStatus`;
- `TreatmentFolio`;
- `BalanceStatement`;
- `SecureMessageCta`.

### Consola administrativa

Dirección: **instrumento de precisión**.

- Base casi monocromática.
- Sidebar y topbar con reglas finas, no paneles de color.
- Un único color de acción: `--basalto`.
- Verde, ámbar y rojo sólo para estados reales.
- Tablas y listas con densidad configurable.
- Panel split list-detail para pacientes, documentos y caja.
- Monoespaciada para auditoría, versiones, importes y timestamps.

Componentes nuevos:

- `PrecisionShell`;
- `CommandBar`;
- `ResourceTable`;
- `DetailPane`;
- `ClinicalEventRow`;
- `AuditDiff`;
- `LedgerTable`;
- `OdontogramWorkbench`.

## 6. Recursos visuales

### Uso recomendado del catálogo actual

- Hero: `prototype-v2/assets/images/public/hero/consulta-dental-paciente-5355900.jpg`.
- Plan y conversación: `prototype-v2/assets/images/public/hero/consulta-plan-dental-6627354.jpg`.
- Equipo: `prototype-v2/assets/images/public/team/equipo-dental-clinica-37458124.jpg`.
- Tecnología: `prototype-v2/assets/images/public/technology/evaluacion-dental-digital-5622234.jpg`.
- Especialidades: imágenes de servicios sólo como apoyo, nunca como caso clínico.
- Arcadas, FDI, anatomía y radiografía: únicamente en odontograma, educación y visor ficticio.

### Regla de fotografía

La portada debe mostrar una interacción humana o una atmósfera de clínica; el diagrama dental se reserva para explicar el producto. Ninguna foto de Pexels representa a un profesional real de Sillar Dental.

## 7. Plan de implementación del restyle

### Paso 1 — Crear una hoja de dirección

- [ ] Añadir `prototype-v2/assets/css/tokens-v2.css` con la paleta mineral.
- [ ] Añadir `prototype-v2/assets/css/base-v2.css` con escala tipográfica y layout editorial.
- [ ] Añadir `prototype-v2/assets/css/public-v2.css` para la landing.
- [ ] Añadir `prototype-v2/assets/css/app-v2.css` para paciente y staff.
- [ ] Mantener intactos `prototype/assets/css/*` como baseline.

### Paso 2 — Rediseñar una sola página primero

Implementar únicamente `prototype-v2/public/index.html` como prueba de dirección.

Orden de bloques:

1. Header de dos líneas, sobrio y sin glassmorphism.
2. Hero 60/40 con foto humana y `ContextRail`.
3. Ticker de una línea con pausa.
4. Índice numerado de especialidades.
5. Proceso clínico con tres etapas y regla vertical.
6. Tira editorial de doctores.
7. Contacto split.
8. Footer con sede y aviso de demo.

### Paso 3 — Validación visual

- [ ] Comparar captura de baseline y v2.
- [ ] Verificar que la dirección se reconoce sin leer el nombre de la clínica.
- [ ] Revisar que el primer plano sea la persona y la explicación, no una decoración.
- [ ] Probar 390, 768, 1024 y 1440 px.
- [ ] Auditar contraste, foco, alt text y reduced motion.

### Paso 4 — Propagar sólo lo que funcione

- [ ] Llevar tokens a portal paciente.
- [ ] Llevar estructura de precisión a staff.
- [ ] Reemplazar tarjetas repetidas por componentes con propósito.
- [ ] Mantener componentes que solucionen una interacción concreta.

## 8. Decisiones que no se deben repetir

- No copiar una plantilla de clínica dental sin traducirla al contexto de Arequipa.
- No usar gradientes para llenar espacio.
- No asignar un color distinto a cada especialidad sólo para hacer un grid vistoso.
- No usar una foto de stock como identidad de un doctor ficticio.
- No convertir el portal paciente en un dashboard de KPIs.
- No convertir la consola en una landing con métricas decorativas.
- No introducir shadcn, Tailwind o Astro sólo para cambiar la estética; primero se valida la dirección en CSS vanilla.

## 9. Decisión de herramientas

Por ahora:

- HTML, CSS y JavaScript vanilla para el restyle.
- Componentes propios copiados desde el patrón de código actual.
- Referencia de accesibilidad y composición de las skills de GitHub.
- Shadcn Space sólo como catálogo de patrones si más adelante se migra a React/Astro.

La migración de framework se considera después de validar la dirección visual y la arquitectura de datos. El problema actual es de criterio visual y jerarquía, no de tecnología.

