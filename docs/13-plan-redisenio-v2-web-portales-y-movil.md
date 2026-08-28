# Plan de rediseño v2: web pública, portal del paciente, consola privada y mockups móviles

## 1. Objetivo

Evolucionar el prototipo actual sin perder su identidad visual: conservar la paleta azul,
verde azulado, terracota y arena, junto con la combinación tipográfica actual, pero
ampliar el uso del espacio, incorporar contenido e imágenes creíbles, modernizar la
captación y separar correctamente la experiencia pública, la experiencia del paciente y
la operación privada de la clínica.

La versión v2 debe poder demostrar cuatro productos relacionados:

1. sitio público de Sillar Dental orientado a confianza, información y captación;
2. reserva y contacto general;
3. portal web y mockups móviles exclusivos para pacientes;
4. consola privada del personal, sin enlace desde el sitio público.

El trabajo se realizará en `prototype-v2/` mientras `prototype/` permanece como línea base
aprobada. Sólo después de validar la v2 se decidirá si reemplaza a la versión actual.

## 2. Hallazgos de la revisión actual

### 2.1 Uso del ancho

La principal limitación está en:

```css
.container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}
```

En pantallas de 1440, 1600 o 1920 píxeles esto concentra demasiado el contenido. El
rediseño utilizará tres niveles:

- `full-bleed`: fondos, hero, galería, promociones y secciones visuales ocupan todo el ancho;
- `content-wide`: hasta 1520 px para navegación, especialidades, equipo y contacto;
- `content-reading`: entre 720 y 880 px sólo para textos clínicos, FAQ y artículos.

Tokens propuestos:

```css
--page-gutter: clamp(18px, 4vw, 72px);
--content-wide: 1520px;
--content-standard: 1280px;
--content-reading: 820px;
```

La consola administrativa mantendrá su estructura de sidebar más contenido, pero sus
tableros usarán rejillas de 12 columnas, paneles redimensionables y vistas de detalle con
panel lateral, evitando grandes vacíos en monitores amplios.

### 2.2 Identidad

La marca actual es sólo una `S` dentro de un cuadrado. La v2 necesita:

- isotipo SVG propio: combinación abstracta de arco dental y sillar;
- wordmark `Sillar Dental`;
- descriptor `Especialidades · Arequipa`;
- variantes horizontal, reducida, monocromática y favicon;
- zona segura, tamaños mínimos y contraste documentados;
- animación mínima opcional del isotipo, desactivada con `prefers-reduced-motion`.

No se utilizará una fotografía de stock como logo ni como parte registrable de la marca.

### 2.3 Separación de superficies

| Superficie | Entrada | Indexación | Acceso |
|---|---|---|---|
| web pública | `www.sillardental.pe` | indexable | abierto |
| reserva | `www.sillardental.pe/reservar` | indexable | abierto |
| portal paciente | `pacientes.sillardental.pe` | `noindex` | OTP/contraseña |
| consola personal | `gestion.sillardental.pe` | `noindex`, sin enlace público | MFA + RBAC |

En el mockup estático, la consola vivirá en `prototype-v2/staff/` y no aparecerá en la
navegación, footer, sitemap ni botones de la web pública.

## 3. Investigación de contenido y referentes

La búsqueda local muestra que una propuesta competitiva en Arequipa no puede limitarse a
cuatro especialidades. Sitios locales presentan ortodoncia, prótesis, endodoncia,
operatoria, periodoncia, cirugía oral, implantes, odontopediatría, radiología, estética,
terceros molares y prevención. Estas referencias sirven para definir cobertura, no para
copiar textos, nombres, fotografías ni promesas comerciales:

- [DENTACARE Arequipa](https://dentacarearequipa.com/)
- [PRIESDENT, odontología digital en Arequipa](https://priesdent.com.pe/)
- [Muelident, especialidades](https://www.muelident.com/especialidades.html)
- [Colegio Odontológico Regional Arequipa](https://copra.org.pe/)

### 3.1 Catálogo público propuesto

Se mostrarán ocho áreas principales y un acceso a “Ver todas”:

1. evaluación, prevención y odontología general;
2. ortodoncia y ortopedia maxilar;
3. implantología;
4. rehabilitación oral y prótesis;
5. endodoncia;
6. periodoncia;
7. odontopediatría;
8. estética dental y diseño de sonrisa.

El catálogo completo añadirá:

- cirugía oral y terceros molares;
- cirugía maxilofacial;
- restauraciones y operatoria;
- radiología y diagnóstico digital;
- urgencias dentales;
- mantenimiento y profilaxis.

Cada página explicará para quién es el servicio, qué señales justifican una evaluación,
cómo se diagnostica, etapas habituales, preguntas frecuentes y CTA. No prometerá
resultados, diagnóstico gratuito, garantías absolutas ni tiempos clínicos universales.

### 3.2 Profesionales e imágenes

La v2 ampliará el seed a ocho profesionales ficticios, claramente marcados como datos de
demostración. Cada ficha tendrá:

- nombre ficticio;
- especialidad principal y áreas de interés;
- resumen profesional;
- idiomas;
- disponibilidad simulada;
- asociaciones con servicios;
- fotografía o avatar;
- campos reservados para COP, RNE, educación y verificación.

Política visual:

- en producción se usarán fotografías propias con autorización escrita;
- en el prototipo se prefieren retratos generados de personas ficticias;
- las fotografías Pexels o Unsplash se pueden usar como ambiente clínico o referencia;
- una persona de stock no será identificada como miembro real del equipo.

Pexels permite uso web y modificación, pero prohíbe implicar que una persona identificable
respalda el producto. Por eso una fotografía de stock no debe combinarse con un nombre,
colegiatura o currículum ficticio como si fuera un profesional real:

- [Licencia oficial de Pexels](https://www.pexels.com/license/)
- [Búsqueda de retratos dentales en Pexels](https://www.pexels.com/search/dentist%20portrait/)
- [Licencia oficial de Unsplash](https://unsplash.com/license)

## 4. Web pública v2

### 4.1 Header y navegación

Header de dos niveles:

1. barra superior compacta con horario, teléfono, WhatsApp y ubicación;
2. navegación principal con nueva marca, especialidades, equipo, tecnología, pacientes,
   contacto y botón de reserva.

En móvil:

- logo reducido;
- reservar como CTA permanente;
- menú tipo drawer;
- botón flotante de contacto con llamada/WhatsApp;
- sin enlaces a la consola administrativa.

### 4.2 Hero

Composición 55/45 que aprovecha el ancho:

- mensaje principal orientado a diagnóstico y coordinación;
- dos CTA: `Reservar evaluación` y `Hablar con recepción`;
- tres señales de confianza verificables;
- imagen humana de consulta o equipo, no una ilustración dental genérica;
- pequeña tarjeta dinámica con próximo horario disponible de demostración.

Copys candidatos:

- `Odontología especializada, explicada con claridad.`
- `Un equipo para cada etapa de tu sonrisa.`
- `Diagnóstico, tratamiento y seguimiento en un solo lugar.`

La versión final debe ser revisada para evitar afirmaciones no demostrables.

### 4.3 Barra móvil de campañas y atributos

La franja actual “Especialistas por etapa / Diagnóstico digital / Agenda coordinada /
Cuotas transparentes” se convertirá en un carrusel continuo tipo marquee:

- contenido duplicado para desplazamiento sin salto;
- tarjetas cortas con icono, titular y microtexto;
- pausa al pasar el cursor o enfocar;
- navegación táctil opcional;
- versión estática cuando el usuario prefiera movimiento reducido;
- administración de campañas desde la consola;
- fechas de vigencia, audiencia y CTA.

Ejemplos de contenido de demostración:

- `Evaluación integral · agenda online`;
- `Diagnóstico digital · imágenes en tu portal`;
- `Ortodoncia · controles coordinados`;
- `Implantes · planificación interdisciplinaria`;
- `Facilidades de pago · consulta condiciones`;
- `Atención infantil · entorno acompañado`.

No se publicarán descuentos o promociones clínicas sin aprobación administrativa y legal.

### 4.4 Secciones

Orden propuesto:

1. header;
2. hero;
3. marquee de atributos/campañas;
4. especialidades destacadas;
5. motivos de consulta frecuentes;
6. proceso de atención;
7. equipo de especialistas;
8. tecnología y diagnóstico;
9. experiencia del paciente y portal;
10. preguntas frecuentes;
11. contacto moderno;
12. footer completo.

### 4.5 Equipo

Rejilla de profesionales en tarjetas horizontales, no tarjetas genéricas de especialidad:

- retrato 4:5;
- nombre;
- especialidad;
- dos áreas clínicas;
- idiomas;
- CTA `Ver perfil` y `Solicitar cita`;
- perfil ampliado con biografía, formación verificada y servicios relacionados.

En el prototipo todas las fichas mostrarán `Perfil ficticio para demostración`. Ese texto se
retirará únicamente al cargar profesionales reales y verificar sus datos.

### 4.6 Contacto moderno

Nueva sección full-width dividida:

- bloque 60%: formulario de contacto general;
- bloque 40%: WhatsApp, llamada, horario, dirección y mapa esquemático;
- selector de motivo: cita, tratamiento, pagos, resultados, sugerencia u otro;
- preferencia y horario de contacto;
- aviso explícito de no enviar emergencias ni datos clínicos sensibles;
- aceptación de privacidad;
- confirmación con número de solicitud;
- FAQ de contacto;
- CTA móvil fija.

Reserva y contacto serán flujos distintos: reserva conserva sus pasos actuales; contacto
general crea una solicitud de atención y no promete una cita.

## 5. SEO, metadatos e imágenes

Google recomienda títulos únicos y descriptivos, meta descriptions breves y específicas,
URLs comprensibles y contenido creado para personas. En salud, la confianza y la autoría
son especialmente importantes:

- [Guía SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Contenido útil y orientado a personas](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Buenas prácticas SEO para imágenes](https://developers.google.com/search/docs/appearance/google-images)

### 5.1 Arquitectura SEO

```text
/
/especialidades/
/especialidades/ortodoncia/
/especialidades/implantes-dentales/
/especialidades/endodoncia/
/especialidades/periodoncia/
/especialidades/odontopediatria/
/especialidades/rehabilitacion-oral/
/especialidades/estetica-dental/
/especialidades/cirugia-oral/
/equipo/
/equipo/{profesional}/
/tecnologia/
/pacientes/
/preguntas-frecuentes/
/contacto/
/reservar/
/articulos/{slug}/
```

### 5.2 Metadatos mínimos

Por página:

- `<title>` único;
- meta description única;
- canonical;
- `robots`;
- Open Graph y Twitter Card;
- `og:image` representativa de alta resolución;
- breadcrumbs;
- favicon y manifest;
- JSON-LD;
- `hreflang` sólo si realmente se publica otro idioma.

Ejemplo inicial para home:

```html
<title>Clínica dental especializada en Arequipa | Sillar Dental</title>
<meta name="description"
      content="Evaluación, diagnóstico digital y atención dental especializada en Yanahuara, Arequipa. Conoce al equipo, tratamientos y opciones de cita.">
```

### 5.3 Datos estructurados

Usar JSON-LD con `Dentist`, subtipo de `LocalBusiness`, incluyendo únicamente datos reales:

- nombre y URL;
- logo e imágenes;
- teléfono;
- dirección postal;
- coordenadas;
- horarios;
- medios de pago;
- especialidades;
- área atendida;
- aceptación de nuevos pacientes;
- perfiles oficiales.

`Dentist` contempla dirección, horarios, teléfono, imágenes, métodos de pago y especialidad:

- [Schema.org Dentist](https://schema.org/Dentist)
- [Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)

No se generarán calificaciones ni reseñas ficticias. FAQ puede existir como contenido
visible, pero no se presupuestará un resultado enriquecido: Google limita actualmente ese
tratamiento para FAQ principalmente a sitios gubernamentales y de salud reconocidos.

### 5.4 Estrategia de imágenes

Inventario inicial:

| Uso | Cantidad | Formato |
|---|---:|---|
| hero | 3 encuadres | AVIF/WebP/JPG |
| equipo | 8 retratos | AVIF/WebP/JPG |
| especialidades | 12 escenas o detalles | AVIF/WebP/JPG |
| instalaciones | 8 | AVIF/WebP/JPG |
| tecnología | 6 | AVIF/WebP/JPG |
| contacto/ubicación | 2 | WebP/SVG |
| portal/documentos ficticios | 8 | JPG/PNG/PDF |

Reglas:

- `<picture>` con `srcset`, `sizes` y fallback `src`;
- ancho y alto declarados para evitar saltos;
- nombres descriptivos;
- `alt` contextual, sin repetir palabras clave;
- lazy loading fuera del primer viewport;
- licencia, autor, URL, fecha y modificaciones en manifiesto;
- imágenes relevantes cerca del texto relacionado;
- no usar imágenes clínicas reales sin consentimiento y anonimización.

Objetivos de experiencia:

- LCP menor de 2.5 s;
- INP menor de 200 ms;
- CLS menor de 0.1.

Estos son los umbrales de buena experiencia publicados por Google:
[Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

## 6. Portal web del paciente v2

El paciente sólo accede a contenido propio y publicado. La home actual se ampliará a una
experiencia de autoservicio:

### 6.1 Navegación

- Inicio;
- Citas;
- Mi tratamiento;
- Documentos y resultados;
- Recetas;
- Pagos y comprobantes;
- Mensajes y anuncios;
- Perfil, privacidad y permisos.

### 6.2 Inicio

- saludo y próxima acción;
- próxima cita con confirmar/reprogramar;
- avance del plan;
- documento nuevo;
- cuota próxima;
- anuncio activo de la clínica;
- acceso rápido a recepción;
- timeline de actividad comprensible.

### 6.3 Documentos interactivos ficticios

Tipos de muestra:

- informe PDF multipágina;
- receta PDF;
- consentimiento firmado;
- radiografía panorámica;
- fotografía intraoral;
- serie antes/durante/después ficticia;
- comprobante de pago.

Interacciones:

- visor PDF con miniaturas, zoom, página y descarga simulada;
- galería con zoom y metadatos;
- comparador de dos fotografías;
- visor radiográfico con brillo, contraste, zoom y restablecer;
- indicador `Publicado por`, fecha, versión y atención asociada;
- estado nuevo/leído;
- reporte de archivo incorrecto;
- no permitir edición ni borrado por el paciente.

### 6.4 Tratamiento

- hallazgos explicados en lenguaje de paciente;
- odontograma sólo lectura;
- plan por fases;
- alternativas y aceptación;
- procedimientos realizados;
- próximos pasos;
- documentos y pagos asociados;
- solicitar aclaración, sin modificar el registro clínico.

### 6.5 Pagos

- saldo reproducible;
- cargos, adelantos, créditos, cuotas y aplicaciones;
- próximo vencimiento;
- pago simulado;
- descarga de comprobante;
- historial de anulaciones o devoluciones;
- botón `Solicitar ayuda con mi cuenta`.

## 7. Consola privada del personal

La consola no forma parte del portal público. Tendrá login separado, MFA simulado,
selector de rol y navegación por permisos.

### 7.1 Módulos

1. tablero;
2. agenda y recursos;
3. recepción;
4. pacientes y apoderados;
5. historia clínica;
6. odontograma y especialidades;
7. planes y presupuestos;
8. documentos, resultados e imágenes;
9. recetas;
10. caja, pagos, cuotas y conciliación;
11. profesionales y horarios;
12. especialidades y servicios;
13. anuncios, campañas y notificaciones;
14. inventario y laboratorio;
15. reportes;
16. auditoría;
17. usuarios, roles y configuración.

### 7.2 Matriz CRUD y restricciones

| Recurso | Crear | Editar | Baja/eliminación lógica | Restricción |
|---|---|---|---|---|
| profesionales | administrador | administrador | desactivar | no borrar historia asociada |
| especialidades/servicios | administrador | administrador | archivar | conservar versiones usadas |
| pacientes | recepción | recepción autorizada | baja lógica/merge | auditar duplicados |
| citas | recepción/profesional | recepción/profesional | cancelar | registrar motivo |
| notas clínicas | profesional | sólo borrador | no borrar firmadas | adenda versionada |
| odontograma | profesional | sólo borrador | no borrar firmado | evento + firma |
| plan/presupuesto | profesional/caja | nueva versión | anular versión | conservar aceptación |
| documentos | autorizado | metadatos/versión | retirar publicación | no destruir archivo auditado |
| recetas | profesional | reemplazar | anular | no editar receta emitida |
| pagos | caja | referencia antes de cierre | reverso/anulación | nunca hard delete |
| anuncios | marketing/admin | sí | archivar | fechas y audiencia |
| inventario | operación | movimientos | ajuste | kardex inmutable |
| usuarios | administrador | administrador | desactivar | sesiones y auditoría |

### 7.3 Gestión de profesionales

Vistas:

- listado con filtros;
- alta/edición;
- perfil público y perfil interno;
- especialidades;
- disponibilidad semanal;
- excepciones y vacaciones;
- recursos habilitados;
- documentos de verificación;
- estado publicado/no publicado;
- previsualización de ficha pública.

### 7.4 Anuncios y app móvil

El administrador podrá:

- crear anuncio;
- elegir audiencia: todos, segmento, paciente o especialidad;
- elegir canal: portal, push, email o WhatsApp;
- programar publicación y vencimiento;
- adjuntar imagen;
- incluir CTA;
- previsualizar móvil;
- pausar, editar, duplicar o archivar;
- consultar enviados, entregados, abiertos y descartados;
- respetar consentimiento y opt-out por canal.

### 7.5 Resultados y documentos

Flujo:

```text
carga → validación de formato → cuarentena → revisión clínica
      → publicación → notificación → lectura del paciente
```

La vista de carga incluirá:

- drag-and-drop;
- PDF, JPG, PNG y DICOM/DICOMweb simulado;
- paciente, encuentro y tipo documental;
- visibilidad;
- etiquetas;
- versión;
- miniatura;
- responsable de revisión;
- publicación inmediata o programada;
- bitácora completa.

### 7.6 Pagos y trazabilidad

- caja abierta/cerrada;
- movimientos por medio de pago;
- Yape/Plin/QR, efectivo, tarjeta y transferencia como modos de demostración;
- aplicación a cargos o cuotas;
- adelantos y crédito a favor;
- fraccionamiento;
- mora;
- reversos;
- conciliación;
- comprobantes;
- exportación;
- auditoría por actor, fecha, IP/dispositivo simulado y razón.

### 7.7 Reportes

- citas, ocupación y cancelaciones;
- producción por especialidad y profesional;
- aceptación de planes;
- cobrado, producido, saldo y mora;
- conciliación por medio de pago;
- documentos pendientes de revisión;
- pacientes sin próxima cita;
- campañas y anuncios;
- inventario y vencimientos;
- calidad de datos y auditoría.

Cada reporte tendrá rango, filtros, comparación, tabla, gráfico, drill-down y exportación
simulada.

### 7.8 Odontograma digital ampliado

- dentición permanente y temporal;
- nomenclatura FDI;
- superficies independientes;
- paleta de hallazgos separada de tratamientos;
- drag-and-drop, toque y teclado;
- zoom y desplazamiento;
- pieza seleccionada con panel lateral;
- historial por pieza;
- inicial firmado;
- evolución por encuentro;
- adendas;
- leyenda;
- impresión;
- accesibilidad sin depender sólo del color;
- integración con plan, procedimiento, imagen y presupuesto.

El PNG o esquema FDI seguirá siendo referencia visual; el dato clínico se conservará como
eventos estructurados y el gráfico productivo será SVG semántico propio.

## 8. Mockups móviles exclusivos del paciente

No se diseñará una consola administrativa móvil en esta fase. Los mockups de 390 × 844 px
derivarán únicamente del portal del paciente:

1. bienvenida/login;
2. verificación OTP;
3. inicio;
4. citas;
5. detalle y reprogramación de cita;
6. tratamiento;
7. odontograma de sólo lectura;
8. documentos;
9. visor PDF;
10. visor de fotografías/radiografía;
11. recetas;
12. cuotas y pago;
13. comprobante;
14. notificaciones/anuncios;
15. contacto con la clínica;
16. perfil y privacidad.

Navegación inferior:

- Inicio;
- Citas;
- Tratamiento;
- Documentos;
- Cuenta.

Los mockups se presentarán como dispositivos aislados y como flujo enlazado. Deben
mantener los mismos datos de María Quispe que la web para demostrar continuidad.

## 9. Seed v2

Entidades nuevas o ampliadas:

```text
practitioners
practitioner_profiles
specialties
services
practitioner_specialties
availability_rules
availability_exceptions
campaigns
announcements
announcement_audiences
notification_deliveries
document_versions
document_publications
clinical_media
media_consents
payment_reversals
receipts
audit_events
content_pages
seo_metadata
image_assets
image_licenses
```

Reglas del seed:

- una identidad ficticia consistente;
- ocho profesionales ficticios;
- doce especialidades/servicios;
- tres anuncios;
- PDF y fotografías ficticias;
- una radiografía pública de demostración;
- trazabilidad de publicación;
- movimientos financieros reconciliables;
- todos los objetos con `organizationId` y `siteId`;
- IA/voz reservadas y desactivadas;
- multisede modelada y no operativa.

## 10. Estructura propuesta

```text
prototype-v2/
├── public/
│   ├── index.html
│   ├── especialidades.html
│   ├── especialidad.html
│   ├── equipo.html
│   ├── profesional.html
│   ├── contacto.html
│   └── reservar.html
├── patient/
│   ├── index.html
│   └── viewers/
├── staff/
│   ├── login.html
│   └── index.html
├── mobile/
│   └── patient-flows.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── documents/
│   └── icons/
├── data/
│   ├── seed-v2.js
│   └── content-v2.js
└── README.md
```

## 11. Componentes

### Públicos

- brand lockup;
- header doble;
- mega menú de especialidades;
- hero amplio;
- marquee accesible;
- service card;
- doctor card;
- doctor profile;
- technology card;
- FAQ accordion;
- contact panel;
- booking stepper;
- footer completo.

### Paciente

- mobile/web shell;
- next-action card;
- appointment card;
- treatment phase;
- read-only tooth status;
- document card;
- PDF viewer;
- image/radiograph viewer;
- installment card;
- announcement card;
- secure-message CTA.

### Staff

- sidebar;
- command/search bar;
- data table;
- filter bar;
- drawer;
- modal;
- CRUD form;
- activity timeline;
- permission guard;
- uploader;
- document review panel;
- ledger;
- report chart;
- audit diff;
- odontogram canvas/palette.

## 12. Fases de ejecución

### Fase 0: preparación

- preservar `prototype/`;
- crear `prototype-v2/`;
- ampliar tokens;
- definir logo SVG;
- definir seed v2;
- preparar manifiesto de activos y licencias.

### Fase 1: sitio público

- layout full-width;
- marca y header;
- hero;
- marquee;
- especialidades;
- equipo;
- tecnología;
- contacto;
- footer;
- metadatos SEO.

### Fase 2: portal del paciente

- shell responsive;
- inicio;
- citas;
- tratamiento;
- documentos;
- visores;
- recetas;
- cuenta;
- mensajes;
- perfil.

### Fase 3: consola privada

- login/MFA simulado;
- separación de rutas;
- CRUD profesionales/servicios;
- anuncios;
- documentos/resultados;
- pagos;
- reportes;
- odontograma;
- permisos y auditoría.

### Fase 4: mockups móviles

- 16 pantallas;
- flujo navegable;
- estados normal, vacío, carga y error;
- revisión táctil y accesible.

### Fase 5: validación

- 360, 390, 768, 1024, 1440 y 1920 px;
- teclado y lector de pantalla básico;
- movimiento reducido;
- contraste;
- referencias y licencias;
- coherencia del seed;
- enlaces;
- sintaxis;
- Lighthouse;
- revisión clínica y legal.

## 13. Criterios de aceptación

### Diseño

- la web aprovecha el ancho sin crear líneas de texto excesivas;
- no se modifica la paleta aprobada salvo ajustes de contraste;
- el logo funciona en 32 px y en header amplio;
- el marquee funciona con mouse, touch, teclado y movimiento reducido;
- web, paciente y staff se reconocen como un mismo producto.

### Contenido

- al menos doce servicios;
- ocho perfiles ficticios claramente etiquetados;
- textos originales;
- sin promesas absolutas;
- autoría/revisión visible en contenido clínico;
- datos locales consistentes.

### Funcional

- reserva y contacto general son independientes;
- admin no está enlazado desde la web pública;
- paciente sólo ve documentos publicados;
- visores ficticios funcionan;
- CRUD demuestra alta, edición, archivo y trazabilidad;
- registros clínicos firmados y pagos no se eliminan físicamente;
- anuncios pueden programarse y previsualizarse;
- odontograma demuestra superficies, eventos y evolución.

### Técnico

- no hay errores JavaScript;
- no hay enlaces locales rotos;
- todas las imágenes tienen dimensiones y `alt`;
- metadatos por página;
- JSON-LD válido;
- rutas privadas con `noindex`;
- objetivos Core Web Vitals documentados;
- no se introducen datos reales de pacientes.

## 14. Decisiones que deben aprobarse antes de implementar

1. conservar definitivamente el nombre `Sillar Dental`;
2. escoger retratos generados o fotografías de stock sólo para el prototipo;
3. confirmar dirección, teléfono, horarios y dominio que serán reales;
4. elegir si el portal paciente usará subdominio o ruta;
5. definir qué promociones pueden publicarse;
6. validar especialidades y credenciales con un cirujano dentista colegiado;
7. confirmar si el prototipo v2 debe reemplazar o convivir con la versión actual.

