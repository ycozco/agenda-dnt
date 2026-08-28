# Mockups y vistas — Sillar Dental

> Especificación funcional, visual y de contenido del prototipo HTML.
>
> **Versión documentada:** 26 de julio de 2026  
> **Prototipo servido desde:** `D:\dental\prototype-v2`  
> **URL base:** `http://localhost:8085`  
> **Tecnología actual:** HTML, CSS y JavaScript vanilla con datos seed ficticios.

## 1. Objetivo del documento

Este documento define qué debe verse, qué texto debe mostrarse, qué hace cada botón y qué estados debe simular cada página del prototipo. Sirve como:

- inventario verificable de las vistas existentes;
- guion de presentación para cliente y equipo clínico;
- especificación para terminar los mockups pendientes;
- contrato previo a la implementación de backend, base de datos y aplicaciones productivas;
- referencia para una futura migración de la web pública a Astro.

El documento distingue:

- **Implementado:** existe, es navegable y tiene contenido funcional simulado.
- **Parcial:** existe, pero le faltan interacciones, estados o terminación visual.
- **Especificado:** está definido aquí, pero todavía no está construido.
- **Proyectado:** debe quedar considerado en arquitectura y datos, pero no será funcional en esta fase.

## 2. Reglas generales del prototipo

### 2.1 Datos y responsabilidad clínica

- Todos los nombres, documentos, citas, historias, pagos y credenciales son ficticios.
- Ningún documento emitido por el prototipo tiene validez clínica, legal o tributaria.
- Las fotos de profesionales son referencias visuales, no identidades reales.
- La nomenclatura y simbología definitiva del odontograma debe validarse con un cirujano dentista colegiado y con los lineamientos aplicables del Colegio Odontológico del Perú.
- IA y voz permanecen proyectadas en arquitectura y modelo de datos, pero desactivadas en interfaz.
- Multisede debe estar prevista mediante `organizationId` y `siteId`; el prototipo trabaja sólo con Yanahuara.

### 2.2 Convenciones visuales

- Identidad: azul mineral, azul profundo, blanco sillar y verde de acción.
- Logo: diente contenido dentro de un arco inspirado en el sillar arequipeño.
- CTA principal: verde; se reserva para acciones que avanzan el flujo.
- CTA secundario: blanco o transparente con borde.
- Estados clínicos y financieros: siempre deben combinar texto, forma e indicador; nunca depender sólo del color.
- Fotografías: iluminación clínica, personas en contexto de atención y recortes amplios.
- Radios: moderados; el arco del hero es el gesto visual principal.
- Ancho de contenido: aprovechar el viewport; limitar sólo columnas de lectura.

### 2.3 Comportamiento responsive

| Ancho | Comportamiento |
|---|---|
| 1440 px o más | Hero dividido, navegación completa y grids de 4 columnas. |
| 1024–1439 px | Menores espacios, grids de 2 columnas y paneles conservan jerarquía. |
| 768–1023 px | Hero y portal digital pasan a una columna; navegación pública colapsable. |
| 390–767 px | CTA visible, selector de prototipo 2 × 2, formularios de una columna y controles táctiles. |
| 320–389 px | Sin desplazamiento horizontal; texto y botones deben conservar legibilidad. |

### 2.4 Componentes compartidos

| Componente | Descripción | Estados |
|---|---|---|
| `BrandLockup` | Isotipo, nombre Sillar Dental y descriptor. | completo, compacto, invertido |
| `PublicHeader` | Logo, navegación pública, portal y reserva. | normal, sticky, menú móvil abierto |
| `PrototypeSwitcher` | Accesos a paciente, administración y móvil. | escritorio 4 columnas, móvil 2 × 2 |
| `Button` | Acción o navegación. | primary, secondary, soft, danger, disabled, loading |
| `Chip` | Estado o categoría. | success, warning, neutral, info |
| `Card` | Superficie de contenido. | normal, hover, seleccionada, restringida |
| `Toast` | Confirmación local. | success, error, info |
| `Modal` | Confirmación, formulario o detalle. | cerrado, abierto, error |
| `FileCard` | PDF, receta, imagen o radiografía. | nuevo, leído, restringido |
| `ViewerToolbar` | Zoom, filtros, descarga y restablecimiento. | activo, disabled |
| `DataTable` | Listados operativos. | loading, empty, error, con datos |
| `StatusBadge` | Estado clínico, cita, documento o pago. | texto + indicador visual |

## 3. Mapa completo de rutas

### 3.1 Web pública

| Vista | Ruta | Estado |
|---|---|---|
| Landing principal | `/public/index.html?v=7` | Implementado |
| Especialidades | `/public/especialidades.html` | Implementado |
| Detalle de especialidad | `/public/especialidad.html?slug=ortodoncia` | Implementado |
| Equipo profesional | `/public/equipo.html` | Implementado |
| Perfil profesional | `/public/profesional.html?id=pro_ana` | Implementado |
| Tecnología | `/public/tecnologia.html` | Implementado, estilo anterior |
| Contacto | `/public/contacto.html` | Implementado, estilo anterior |
| Reserva | `/public/reservar.html` | Implementado |

### 3.2 Portal paciente

| Vista | Ruta | Estado |
|---|---|---|
| Acceso | `/patient/login.html?v=3` | Implementado |
| Inicio | `/patient/index.html?view=home` | Implementado |
| Citas | `/patient/index.html?view=appointments` | Implementado básico |
| Tratamiento | `/patient/index.html?view=treatment` | Implementado |
| Documentos | `/patient/index.html?view=documents` | Implementado |
| Recetas | `/patient/index.html?view=prescriptions` | Implementado básico |
| Pagos | `/patient/index.html?view=payments` | Implementado |
| Visor PDF | `/patient/viewers/pdf.html?id=doc_inf_01` | Implementado |
| Visor radiográfico | `/patient/viewers/radiografia.html?id=doc_rad_01` | Implementado |

### 3.3 Consola staff

| Vista | Ruta | Estado |
|---|---|---|
| Acceso staff | `/staff/login.html` | Implementado |
| Dashboard | `/staff/index.html?view=dashboard` | Implementado básico |
| Agenda | `/staff/index.html?view=agenda` | Placeholder |
| Recepción | `/staff/index.html?view=reception` | Placeholder |
| Pacientes | `/staff/index.html?view=patients` | Placeholder |
| Historia y odontograma | `/staff/index.html?view=patient&patient=pat_maria` | Implementado básico |
| Caja | `/staff/index.html?view=finance` | Placeholder |
| Auditoría | `/staff/index.html?view=audit` | Implementado |
| Documentos clínicos | `/staff/index.html?view=documents` | Especificado |
| Doctores | `/staff/index.html?view=practitioners` | Especificado |
| Especialidades | `/staff/index.html?view=specialties` | Especificado |
| Comunicaciones | `/staff/index.html?view=communications` | Especificado |
| Reportes | `/staff/index.html?view=reports` | Especificado |
| Configuración | `/staff/index.html?view=settings` | Especificado |

### 3.4 Móvil

| Vista | Ruta | Estado |
|---|---|---|
| Inicio paciente | `/mobile/patient-flows.html#home` | Implementado |
| Citas | `/mobile/patient-flows.html#appointments` | Implementado básico |
| Tratamiento | `/mobile/patient-flows.html#treatment` | Implementado básico |
| Documentos | `/mobile/patient-flows.html#documents` | Implementado |
| Pagos | `/mobile/patient-flows.html#payments` | Implementado básico |
| Carga de resultados | `/mobile/control.html` | Implementado |
| Recetas móvil | `#prescriptions` | Especificado |
| Anuncios móvil | `#announcements` | Especificado |
| Perfil y privacidad | `#profile` | Especificado |

## 4. Web pública

## 4.1 Landing principal

**Ruta:** `/public/index.html?v=7`  
**Objetivo:** convertir una búsqueda de clínica dental en una evaluación reservada y explicar que la atención continúa digitalmente.

### Cabecera

Elementos:

- Logo Sillar Dental.
- Navegación: `Inicio`, `Especialidades`, `Equipo médico`, `Tecnología`, `Contacto`.
- Enlace `Portal Paciente` → `/patient/login.html?v=3`.
- Botón `Reservar evaluación` → `/public/reservar.html`.
- Botón de menú móvil con etiqueta accesible `Abrir menú`.

### Selector visible del prototipo

| Texto | Descripción | Destino |
|---|---|---|
| `Portal paciente` | Citas, recetas y resultados. | `/patient/login.html?v=3` |
| `Administración` | Operación clínica completa. | `/staff/login.html` |
| `Vista móvil` | Experiencia del paciente. | `/mobile/patient-flows.html#home` |
| `Carga móvil` | Resultados y evidencias. | `/mobile/control.html` |

### Hero

Textos:

- Indicador: `Atención especializada en Yanahuara`.
- H1: `Odontología que puedes ver, entender y decidir.`
- Descripción: `Unimos diagnóstico digital, especialistas coordinados y seguimiento continuo para que cada decisión sobre tu sonrisa sea clara desde el inicio.`
- Principios:
  - `Diagnóstico documentado`.
  - `Plan antes de tratar`.
  - `Seguimiento en tu portal`.

Botones:

- `Reservar evaluación` → reserva.
- `Conocer especialidades` → catálogo.
- `Ver horarios disponibles` → reserva.

Tarjeta sobre la fotografía:

- `Primera evaluación`.
- `45 minutos para entender tu caso.`
- `Incluye: Registro fotográfico + diagnóstico inicial`.
- Estado: `Agenda disponible esta semana`.

### Franja de confianza

- `8 especialidades — coordinadas en un solo plan`.
- `Diagnóstico digital — fotografías e imágenes explicadas`.
- `Portal del paciente — citas, resultados, recetas y pagos`.
- `Conoce al equipo — perfiles profesionales y experiencia`.

### Acompañamiento digital

H2: `Tu historia no vuelve a empezar en cada visita.`

Texto:

`Cada fotografía, diagnóstico, receta y pago queda conectado a tu recorrido clínico. Tú ves lo importante; el equipo conserva el contexto completo.`

Beneficios:

1. `Resultados organizados`: PDF, fotografías clínicas y radiografías.
2. `Plan y cuenta transparentes`: tratamientos, avances, cuotas y comprobantes.
3. `Recordatorios útiles`: citas, indicaciones y recetas.

Botones:

- `Explorar portal paciente` → acceso paciente.
- `Ver experiencia móvil` → mockup móvil.
- `Ver documento` → documentos del paciente.

La vista previa del portal muestra:

- próxima cita `Martes 28 · 10:30`;
- motivo `Evaluación de ortodoncia`;
- estado `Confirmada`;
- plan activo `Ortodoncia`, `2 de 4 etapas`;
- nuevo resultado `Informe radiográfico`;
- documento `Plan de tratamiento`.

### Especialidades

H2: `Un recorrido clínico, no una lista de tarjetas.`

La landing presenta 6 especialidades y enlaza al catálogo de 8.

| Especialidad | Tecnología | Duración | Etapas |
|---|---|---:|---:|
| Ortodoncia y ortopedia dentofacial | Escáner intraoral 3D | 18–24 meses | 4 |
| Implantología y cirugía guiada | CBCT panorámico | 3–6 meses | 3 |
| Endodoncia microscópica | Localizador apical digital | 1–2 sesiones | 2 |
| Estética dental y carillas | Mockup digital 3D | 2–3 sesiones | 3 |
| Rehabilitación oral completa | CAD/CAM dental | Variable | 4 |
| Periodoncia y salud de encías | Sonda periodontal digital | Continuo | 3 |

CTA: `Explorar las 8 especialidades`.

### Equipo

H2: `Especialistas con contexto compartido.`

Se muestran 4 perfiles en portada y CTA `Ver toda la plana médica`.

### Preguntas frecuentes

1. **¿Cómo reservo una cita en Sillar Dental?**  
   Reserva en línea en 4 pasos o comunicación por WhatsApp institucional.
2. **¿Aceptan seguros de salud o convenios?**  
   Convenios con EPS y comprobantes para reembolso, sujeto a validación comercial.
3. **¿Cuál es el protocolo para mi primera consulta?**  
   Anamnesis, fotografía intraoral y diagnóstico radiológico inicial.
4. **¿Cómo accedo a resultados y radiografías?**  
   Mediante portal web y móvil.

CTA: `Escribir a recepción`.

### Criterios de aceptación

- Los 4 accesos del prototipo aparecen antes del hero.
- Reserva es visible sin hacer scroll en escritorio y móvil.
- No existe desplazamiento horizontal en 390 px.
- La fotografía crítica tiene dimensiones y texto alternativo.
- FAQ es navegable con teclado mediante `details/summary`.

## 4.2 Especialidades

**Ruta:** `/public/especialidades.html`

### Textos

- Eyebrow: `Catálogo clínico · 02`.
- H1: `Especialidades organizadas por el momento de tu tratamiento.`
- Descripción: `Explora el recorrido, la tecnología de apoyo y el equipo relacionado antes de reservar una evaluación.`

### Catálogo completo

Incluye las 6 especialidades anteriores más:

- `Odontopediatría especializada` — Cámara intraoral infantil — control periódico — 2 etapas.
- `Cirugía maxilofacial y terceras molares` — Piezosurgery ultrasónico — 1 sesión + control — 2 etapas.

### Acciones por registro

- `Ver detalle` → `especialidad.html?slug={id}`.
- `Reservar` → `reservar.html?specialty={id}`.

### Pendiente de ampliación

- filtro por etapa clínica;
- búsqueda por nombre;
- filtro por tecnología;
- conservar filtros en URL;
- estado sin resultados.

## 4.3 Detalle de especialidad

**Ruta patrón:** `/public/especialidad.html?slug={slug}`

### Contenido dinámico

- Volver a especialidades.
- Nombre, descripción, duración y número de etapas.
- H3 `¿En qué consiste el tratamiento?`
- Texto: planificación en evaluación inicial, propuesta, ejecución y mantenimiento.

Etapas visuales:

1. Escaneo 3D — toma digital de modelos.
2. Diagnóstico — planificación por especialista.
3. Tratamiento — ejecución clínica controlada.
4. Controles — seguimiento semestral.

Bloque tecnológico:

- `Tecnología involucrada en {especialidad}`.
- Equipamiento vinculado desde el catálogo.

CTA:

- `Reservar cita para esta área`.
- `Hacer una consulta previa`.

### Estados requeridos

- slug válido;
- slug inexistente con mensaje y enlace al catálogo;
- carga;
- especialidad sin profesional disponible.

## 4.4 Equipo profesional

**Ruta:** `/public/equipo.html`

H1: `Equipo Profesional`.

Texto: `Conoce a los 8 cirujanos dentistas colegiados y especialistas a cargo de la atención en Sillar Dental Yanahuara.`

| Profesional ficticio | Especialidad | Registro demo |
|---|---|---|
| Dra. Ana Flores Vanesa | Ortodoncia y ortopedia | COP 18240 |
| Dr. Carlos Mendoza Ramos | Implantología y cirugía | COP 15420 |
| Dra. Lucía Paredes Soto | Endodoncia microscópica | COP 21090 |
| Dr. Diego Torres Vizcarra | Rehabilitación oral y CAD/CAM | COP 19530 |
| Dra. Sofía Gutiérrez Medina | Odontopediatría | COP 22100 |
| Dr. Jorge Benavides Zúñiga | Periodoncia y cirugía plástica | COP 16890 |
| Dra. Elena Alarcón Cruz | Estética dental y DSD | COP 20450 |
| Dr. Roberto Salas Delgado | Radiología maxilofacial | COP 14980 |

Botón por perfil: `Ver ficha clínica`.

Todo registro debe mostrar `Perfil ficticio para demostración`.

## 4.5 Perfil profesional

**Ruta patrón:** `/public/profesional.html?id={id}`

Contenido:

- `← Volver al equipo médico`.
- fotografía;
- nombre;
- especialidad;
- COP demostrativo;
- biografía;
- disponibilidad en Yanahuara.

Botones:

- `Solicitar cita con {nombre}` → reserva con `doctor={id}`.
- `Consulta previa` → contacto.

Estados:

- perfil válido;
- ID inexistente;
- perfil inactivo;
- sin horarios disponibles.

## 4.6 Tecnología

**Ruta:** `/public/tecnologia.html`

Textos:

- H1: `Tecnología Dental de Vanguardia`.
- Descripción: CBCT, escaneo intraoral 3D y radiografía panorámica digital.
- H2: `Tomografía Computarizada Cone Beam (CBCT)`.
- Explicación: reconstrucción tridimensional de maxilar, mandíbula y estructuras nerviosas.
- H2: `Portal de Resultados en Tiempo Real`.
- Explicación: acceso a radiografías, informes PDF y consentimientos desde cualquier dispositivo.

Botón:

- `Ingresar al Portal Paciente (María Quispe)`.

Pendiente:

- alinear visualmente con landing v3;
- galería de fotografía intraoral;
- comparación entre examen, resultado e informe;
- avisos de que el material es ficticio.

## 4.7 Contacto

**Ruta:** `/public/contacto.html`

H1: `Estamos para atenderte`.

Texto: `Envíanos tu consulta previa o visita nuestra sede clínica en Yanahuara, Arequipa.`

Información:

- Sede Principal Yanahuara.
- Av. Ejército 712, Yanahuara.
- teléfono y WhatsApp institucional;
- horario de lunes a sábado.

Aviso:

`Para casos de dolor agudo o traumatismo dental, comunícate directamente vía WhatsApp institucional para atención prioritaria en sede.`

Formulario:

- nombre completo;
- correo o teléfono;
- motivo:
  - consulta general o presupuesto;
  - ortodoncia / alineadores;
  - implantes;
  - estética / carillas;
  - odontopediatría;
- mensaje.

Botón: `Enviar Mensaje de Consulta`.

Resultado: toast con código ficticio `REQ-####`.

Pendiente:

- separar contacto general, orientación y urgencia;
- consentimiento de privacidad;
- validación inline;
- canal preferido;
- pantalla de confirmación persistente.

## 4.8 Reserva en 4 pasos

**Ruta:** `/public/reservar.html`

H1: `Reserva tu cita médica dental`.

### Paso 1 — Especialidad

- Lista de 8 especialidades.
- Muestra nombre y tecnología.
- Cada opción tiene estado seleccionado.
- Botón `Continuar al Paso 2`.

### Paso 2 — Profesional

- Lista de 8 profesionales ficticios.
- Foto, nombre, especialidad y COP demo.
- Botones `Volver` y `Continuar a Fecha & Hora`.

### Paso 3 — Fecha y hora

- Campo `Fecha de Atención`.
- Horarios:
  - 08:30;
  - 09:15;
  - 10:00;
  - 11:30;
  - 15:00;
  - 16:30;
  - 17:15.
- Botones `Volver` y `Revisar & Confirmar`.

### Paso 4 — Confirmación

Resumen:

- sede;
- especialidad;
- profesional;
- fecha y hora.

Campos:

- nombre completo;
- DNI;
- teléfono / WhatsApp.

Botones:

- `Confirmar Reserva de Cita`.
- `Modificar selección`.

Éxito:

- H2 `¡Reserva Confirmada con Éxito!`
- `Ver cita en Portal Paciente`.
- `Volver al Inicio`.

La reserva actualiza el seed de sesión; no crea una cita real.

## 5. Portal paciente

## 5.1 Acceso

**Ruta:** `/patient/login.html?v=3`

### Mensaje de marca

- H1: `Tu tratamiento, explicado y siempre disponible.`
- Texto: `Consulta citas, resultados, recetas y pagos desde un espacio pensado para acompañarte entre cada visita.`

### Credenciales demo

- Paciente: María Quispe Condori.
- DNI: `45892104`.
- Código: `984123`.

Campos:

- Número de DNI.
- Código de verificación.

Botones:

- `Usar datos demo`.
- `Ingresar al portal`.
- `¿Necesitas ayuda para ingresar?`.
- `Volver a la web pública`.

Estados:

- credenciales válidas → `/patient/index.html?view=home`;
- credenciales inválidas → mensaje inline;
- verificando → botón disabled y texto `Verificando acceso…`.

Nota visible: la autenticación SMS/WhatsApp es una simulación.

## 5.2 Shell paciente

Navegación:

1. Inicio.
2. Mis citas.
3. Tratamiento.
4. Documentos.
5. Recetas.
6. Pagos y cuotas.

Perfil visible:

- María Quispe.
- DNI 45892104.
- iniciales MQ.

Acción permanente: `Cerrar Sesión`.

## 5.3 Inicio paciente

H1: `Bienvenida, María`.

Texto: `Resumen de tu historia médica y próximas atenciones en Sillar Dental Yanahuara.`

Tarjeta de cita:

- fecha `2026-07-28`;
- hora `10:30 AM`;
- motivo: control mensual de ortodoncia;
- profesional: Dra. Ana Flores;
- botones:
  - `Confirmar asistencia` → toast;
  - `Ver detalle / Reprogramar` → citas.

Tratamiento:

- `Plan Integral Ortodoncia & Rehabilitación`.
- `Fase 2 de 4: Alineación y Nivelación`.
- progreso `45%`.

Accesos:

- `Ver Radiografía Panorámica`.
- `Informe de Diagnóstico PDF`.
- `Estado de Cuotas (S/ 1400)`.

## 5.4 Mis citas

H1: `Mis Citas Dentales`.

Texto: `Historial y próximas reservas en la sede Yanahuara.`

Muestra:

- estado `Cita Confirmada`;
- fecha, hora, profesional y motivo;
- botón `Solicitar Nueva Cita`.

Pendiente:

- historial;
- cancelar;
- reprogramar;
- detalle de sede y sillón;
- estados pendiente, completada y cancelada.

## 5.5 Tratamiento y odontograma

H1: `Plan de Tratamiento & Odontograma`.

Texto: `Visualización de tu evolución clínica autorizada por tu cirujano dentista.`

Fases:

- Fase 1: Higiene y diagnóstico — completada.
- Fase 2: Ortodoncia activa — en curso.
- Fase 3: Contención y retención — pendiente.

Odontograma de sólo lectura:

| Pieza FDI | Estado |
|---:|---|
| 18 | Ausente / tercera molar no erupcionada |
| 16 | Restaurada con resina |
| 21 | Caries en borrador; resina o carilla propuesta |
| 36 | Endodoncia completada |
| 46 | Implante planificado |

No existe edición desde paciente.

## 5.6 Documentos

H1: `Mis Documentos & Radiografías`.

Documentos seed:

| Documento | Tipo | Acción |
|---|---|---|
| Informe de Diagnóstico & Plan Clínico | PDF | Abrir Visor PDF |
| Radiografía Panorámica Digital (CBCT) | Radiografía | Abrir Visor CBCT/Radiografía |
| Receta Médica Demo | Receta | Abrir visor |

Pendiente:

- filtros;
- marcar leído;
- reportar documento incorrecto;
- fotografías clínicas;
- permisos de descarga;
- historial de versiones.

## 5.7 Recetas

H1: `Mis Recetas Médicas`.

Contenido:

- estado `Receta Demo Válida`;
- título `Receta Post-Control Ortodóncico`;
- emisor Dra. Ana Flores;
- fecha 15-07-2026;
- botón `Ver Receta PDF`.

Debe conservar avisos de simulación y no permitir edición.

## 5.8 Pagos

H1: `Pagos & Estado de Cuenta`.

Saldo: `S/ 1,400.00`.

| Cuota | Monto | Estado | Comprobante |
|---|---:|---|---|
| Cuota 01/06 | S/ 600 | Pagada | B001-000452 |
| Cuota 02/06 | S/ 350 | Pagada | B001-000510 |
| Cuota 03/06 | S/ 350 | Pendiente | Sin comprobante |

Pendiente:

- selector de método;
- pago único o fraccionado;
- adelantos;
- crédito a favor;
- detalle de comprobante;
- ayuda de caja;
- pago real deshabilitado.

## 5.9 Visor PDF

Botones:

- `← Volver a Documentos`.
- `Zoom -`.
- indicador de zoom.
- `Zoom +`.
- `Descargar Simulación`.

Contenido ficticio:

- Resumen de anamnesis y diagnóstico.
- Plan de tratamiento propuesto.

Descarga muestra toast; no descarga historia real.

## 5.10 Visor radiográfico

Controles:

- Zoom.
- Brillo.
- Contraste.
- `Restablecer Ajustes`.
- `← Volver a Documentos`.

Panel de metadatos:

- paciente demo;
- fecha;
- tipo de estudio;
- profesional.

Los filtros modifican variables CSS; no alteran el archivo fuente.

## 6. Consola administrativa

## 6.1 Acceso staff

Roles seleccionables:

- Administrador General.
- Profesional Dental — Dra. Ana Flores.
- Recepción / Admisión.
- Caja & Facturación.

Campos:

- rol demostrativo;
- código de acceso prellenado.

Botón: `Ingresar a la Consola`.

Resultado: abre dashboard con parámetro `role`.

## 6.2 Shell staff

Navegación actualmente visible:

1. Dashboard.
2. Agenda del día.
3. Recepción y cola.
4. Pacientes e historia.
5. Odontograma FDI.
6. Caja y cobranza.
7. Auditoría.

Botón: `Salir`.

La versión completa deberá añadir Documentos, Recetas, Profesionales, Especialidades, Comunicaciones, Reportes y Configuración.

## 6.3 Dashboard

H1: `Dashboard Operativo`.

Texto: `Indicadores del día en Sede Principal Yanahuara.`

KPIs:

- Citas hoy: `12 atenciones`, 8 confirmadas y 4 por llegar.
- Producción estimada: `S/ 4,850.00`.
- Caja sede: `S/ 1,250.00`.
- Pacientes nuevos: `3 registros`.
- Estado: `Sede Yanahuara Operativa`.

Pendiente:

- agenda próxima;
- tareas clínicas;
- alertas documentales;
- filtro de fecha;
- selector de sede deshabilitado;
- gráficos y drilldown.

## 6.4 Agenda — vista completa requerida

**Estado actual:** placeholder.

Debe incluir:

- selector día / semana;
- profesionales por columna;
- sillón o recurso;
- tarjetas de cita con hora, paciente, motivo y estado;
- filtros por profesional, especialidad y estado;
- búsqueda de paciente;
- botón `Nueva cita`;
- botón `Lista de espera`;
- panel lateral de detalle.

Acciones:

- confirmar;
- registrar llegada;
- reprogramar;
- cancelar con motivo;
- marcar no-show;
- abrir historia;
- cobrar.

Estados:

- conflicto de horario;
- horario bloqueado;
- profesional ausente;
- cita pendiente de confirmación;
- espera y atención iniciada.

## 6.5 Recepción y cola — vista completa requerida

**Estado actual:** placeholder.

Componentes:

- buscador DNI / nombre / teléfono;
- cola del día;
- check-in;
- ficha rápida;
- alertas de deuda y alergias;
- consentimiento pendiente;
- botón `Registrar llegada`;
- botón `Crear paciente`;
- botón `Cobro rápido`;
- botón `Enviar aviso`.

## 6.6 Pacientes e historia — vista completa requerida

**Estado actual:** placeholder.

Tabla:

- paciente;
- documento;
- teléfono;
- última visita;
- próxima cita;
- tratamiento activo;
- saldo;
- estado.

Botones:

- `Nuevo paciente`.
- `Abrir historia`.
- `Editar datos`.
- `Fusionar duplicado` con confirmación.
- `Desactivar`.

Nunca se elimina físicamente una historia.

## 6.7 Historia y odontograma

H1: `Historia Clínica & Odontograma FDI`.

Paciente: María Quispe Condori.

Contenido actual:

- piezas 11–26;
- piezas con hallazgos resaltadas;
- listado de hallazgos;
- estado `Borrador`;
- selección de pieza mediante clic;
- prompt para registrar hallazgo;
- tratamiento propuesto por defecto `Resina compuesta`;
- botón `Guardar Borrador Clínico`.

Limitaciones actuales:

- sólo muestra 16 piezas;
- usa un símbolo genérico de diente;
- no hay superficies;
- no existe drag-and-drop;
- no hay dentición temporal;
- no existe firma, adenda ni comparación histórica visual.

### Odontograma completo requerido

Debe mostrar:

- 32 piezas permanentes y 20 temporales;
- número FDI;
- superficies vestibular, lingual/palatina, mesial, distal y oclusal/incisal;
- hallazgos;
- tratamientos existentes;
- tratamientos propuestos;
- estado borrador, firmado o anulado;
- paleta conforme a validación clínica;
- selección táctil;
- drag-and-drop;
- alternativa por teclado;
- deshacer local;
- historial y autor.

Botones:

- `Nuevo hallazgo`.
- `Tratamiento sugerido`.
- `Guardar borrador`.
- `Firmar registro`.
- `Crear adenda`.
- `Comparar fecha`.
- `Imprimir`.

## 6.8 Documentos clínicos — vista completa requerida

**Estado actual:** no implementado en staff.

Flujo:

1. Archivo recibido.
2. Clasificación.
3. Revisión clínica.
4. Publicación al paciente.
5. Lectura del paciente.
6. Nueva versión o retiro.

Campos:

- paciente;
- encuentro;
- tipo;
- título;
- archivo;
- nota interna;
- visibilidad;
- autor;
- fecha;
- versión.

Botones:

- `Subir archivos`.
- `Guardar borrador`.
- `Enviar a revisión`.
- `Aprobar`.
- `Rechazar con motivo`.
- `Publicar al paciente`.
- `Retirar publicación`.
- `Ver auditoría`.

## 6.9 Caja y cobranza — vista completa requerida

**Estado actual:** placeholder.

Debe incluir:

- sesión de caja;
- paciente;
- plan;
- cargos;
- saldo;
- cuotas;
- adelantos;
- crédito a favor;
- forma de pago;
- referencia;
- comprobante;
- conciliación.

Formas de pago simuladas:

- efectivo;
- tarjeta;
- transferencia;
- Yape;
- Plin;
- pago mixto.

Botones:

- `Registrar pago`.
- `Crear fraccionamiento`.
- `Registrar adelanto`.
- `Emitir comprobante demo`.
- `Reversar con motivo`.
- `Cerrar caja`.

No se elimina un pago: se registra reverso.

## 6.10 Profesionales — vista completa requerida

CRUD lógico:

- crear;
- editar;
- publicar perfil;
- despublicar;
- desactivar.

Campos:

- nombre;
- documento profesional;
- especialidad;
- biografía;
- fotografía;
- idiomas;
- servicios;
- horarios;
- sede;
- estado público.

Botones:

- `Nuevo profesional`.
- `Editar`.
- `Vista previa pública`.
- `Publicar`.
- `Desactivar`.

## 6.11 Comunicaciones y anuncios — vista completa requerida

Campos:

- título;
- mensaje;
- imagen;
- audiencia;
- canal;
- vigencia;
- CTA;
- prioridad.

Audiencias:

- todos los pacientes;
- tratamiento específico;
- sede;
- morosidad;
- próxima cita;
- segmento manual.

Botones:

- `Nuevo anuncio`.
- `Guardar borrador`.
- `Vista previa móvil`.
- `Publicar`.
- `Pausar`.
- `Finalizar`.

## 6.12 Reportes — vista completa requerida

Filtros:

- fechas;
- sede;
- profesional;
- especialidad;
- forma de pago;
- estado de cita.

Indicadores:

- citas;
- no-show;
- producción;
- recaudación;
- saldos;
- nuevos pacientes;
- tratamientos activos;
- documentos pendientes.

Botones:

- `Aplicar filtros`.
- `Restablecer`.
- `Exportar demo`.
- `Ver detalle`.

## 6.13 Auditoría

H1: `Bitácora de Auditoría Clínica & Operativa`.

Columnas:

- fecha y hora;
- actor;
- acción;
- detalle.

Eventos seed:

- firma de odontograma;
- registro de pago.

Todo cambio realizado por la mock API agrega un evento en `sessionStorage`.

Pendiente:

- filtro por actor y módulo;
- detalle antes/después;
- IP/dispositivo proyectado;
- exportación;
- política de retención.

## 7. Aplicación móvil del paciente

**Archivo:** `/mobile/patient-flows.html`

Navegación inferior:

- Inicio.
- Citas.
- Tratamiento.
- Documentos.
- Pagos.

### Inicio

- saludo `Hola, María`;
- próxima cita;
- profesional;
- progreso del tratamiento;
- acceso a las demás vistas.

### Citas

- H2 `Mis Citas`;
- cita confirmada;
- fecha y motivo.

Pendiente: confirmar, reprogramar y agregar al calendario.

### Tratamiento

- H2 `Tratamiento & FDI`;
- resumen del odontograma;
- `Piezas con hallazgos registrados: 5`.

Pendiente: vista dental táctil de sólo lectura y fases.

### Documentos

- H2 `Documentos`;
- lista de archivos;
- botón `Abrir Visor`.

### Pagos

- H2 `Pagos & Cuotas`;
- saldo pendiente;
- resumen.

Pendiente: detalle de cuotas, comprobantes y solicitud de ayuda.

## 8. Control móvil para carga de resultados

**Ruta:** `/mobile/control.html`

H1: `Sube el resultado desde el lugar de atención.`

Texto:

`Control móvil para que el equipo registre una imagen, informe o radiografía y la envíe a revisión antes de publicarla en el portal del paciente.`

Área de carga:

- selección o drag-and-drop;
- PDF, JPG, PNG o DICOM simulado;
- máximo 25 MB.

Campos:

- tipo:
  - informe clínico;
  - radiografía;
  - fotografía intraoral;
  - receta;
- visibilidad:
  - revisión clínica;
  - publicar después de revisar;
  - uso interno;
- nota para revisión.

Botones:

- `Cancelar`.
- `Enviar a revisión`, inicialmente deshabilitado.
- `Abrir consola`.

Resultado:

- texto `Enviado a revisión`;
- toast con cantidad de archivos;
- los archivos no salen del navegador.

## 9. Datos seed únicos del prototipo

### Paciente

- María Quispe Condori.
- DNI 45892104.
- O+.
- Alergia: penicilina.
- Plan integral de ortodoncia.
- Progreso 45%.
- Costo total S/ 3,500.
- Saldo S/ 1,400.

### Organización

- Sillar Dental Especialidades.
- Sede Principal Yanahuara.
- Av. Ejército 712.
- Horario lunes a sábado, 8:00–20:00.

### Persistencia

- `sessionStorage`.
- Clave: `sillar_dental_prototype_v2_state`.
- No escribe información real en disco.
- `resetState()` restaura el seed inicial.

## 10. Botones globales y contrato de comportamiento

| Tipo | Uso | Resultado |
|---|---|---|
| Primary | Avanzar, reservar, guardar o publicar. | Debe producir navegación o confirmación visible. |
| Secondary | Volver, consultar o modificar. | No debe ejecutar acciones destructivas. |
| Soft | Accesos rápidos. | Abre una vista relacionada. |
| Danger | Anular, retirar o desactivar. | Requiere confirmación y motivo. |
| Disabled | Acción todavía no disponible. | Debe explicar qué requisito falta. |
| Loading | Operación en proceso. | Texto con `…`, disabled y resultado posterior. |

Reglas:

- Todo icono sin texto debe tener `aria-label`.
- Todo botón debe ser alcanzable por teclado.
- Los enlaces navegan; los botones ejecutan acciones.
- Ninguna eliminación clínica o financiera es física.
- Toasts deben usar `aria-live`.
- Los formularios deben enfocar el primer error.
- En móvil, cada objetivo táctil debe medir al menos 44 × 44 px.

## 11. Estados obligatorios por vista

Cada módulo que pase de mockup a implementación debe contemplar:

1. cargando;
2. con datos;
3. vacío;
4. error;
5. sin permiso;
6. acción confirmada;
7. conexión interrumpida;
8. registro archivado o inactivo;
9. conflicto de edición;
10. sesión vencida.

## 12. Flujos de demostración

### Flujo público

1. Abrir landing.
2. Revisar especialidad.
3. Abrir ficha profesional.
4. Reservar evaluación.
5. Ver confirmación.

### Flujo paciente

1. Acceder con DNI `45892104` y código `984123`.
2. Confirmar cita.
3. Revisar tratamiento.
4. Abrir radiografía.
5. Abrir informe PDF.
6. Revisar cuotas.

### Flujo staff actual

1. Elegir rol.
2. Abrir dashboard.
3. Abrir odontograma de María.
4. Registrar hallazgo demo.
5. Guardar borrador.
6. Revisar auditoría.

### Flujo carga móvil

1. Seleccionar archivo.
2. Elegir tipo y visibilidad.
3. Agregar nota.
4. Enviar a revisión.
5. Confirmar estado local.

## 13. Prioridad de implementación pendiente

### Prioridad 1 — completar demostración administrativa

- Agenda.
- Recepción y cola.
- Pacientes.
- Documentos y publicación.
- Caja, cuotas y adelantos.
- Profesionales.
- Reportes.

### Prioridad 2 — odontograma

- 32/20 piezas;
- superficies;
- paletas validadas;
- táctil;
- drag-and-drop;
- teclado;
- firma, adenda e historial.

### Prioridad 3 — ampliar paciente y móvil

- reprogramación de citas;
- anuncios;
- perfil y privacidad;
- fotografías intraorales;
- detalle de comprobantes;
- estados vacíos y de error.

### Prioridad 4 — consistencia visual

- aplicar identidad landing v3 a Tecnología, Contacto, Reserva, Equipo y Perfil;
- reemplazar emojis restantes por SVG;
- unificar formularios;
- revisar tablets y escritorio amplio.

## 14. Fuera de alcance funcional

- IA clínica o diagnóstico automático.
- Dictado o control por voz.
- pagos reales;
- emisión tributaria real;
- receta válida;
- firma digital certificada;
- DICOM real;
- interoperabilidad con seguros;
- multisede operativa;
- almacenamiento de documentos;
- notificaciones SMS, WhatsApp o push reales.

Estas capacidades pueden aparecer como `Próximamente` o como campos previstos, pero no deben simular una operación real ni prometer disponibilidad.

## 15. Criterio final de aceptación

El prototipo estará completo cuando:

- todas las rutas de la matriz existan;
- ningún enlace termine en placeholder;
- los flujos público, paciente, staff y móvil puedan demostrarse de principio a fin;
- el odontograma sea utilizable con ratón, tacto y teclado;
- documentos, recetas y pagos tengan trazabilidad simulada;
- cada vista tenga estados loading, vacío, error y sin permiso;
- la interfaz funcione en 390, 768, 1024 y 1440 px;
- no existan datos personales o clínicos reales;
- el cliente pueda comprender cada botón sin explicación externa.
