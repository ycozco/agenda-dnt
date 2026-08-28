# Plan de implementación de vistas v2

Documento operativo para convertir el diseño definido en [el plan de rediseño v2](13-plan-redisenio-v2-web-portales-y-movil.md) en un prototipo navegable, responsive y demostrable.

El prototipo seguirá siendo estático: HTML, CSS y JavaScript vanilla, datos seed ficticios y estado en memoria. Astro queda como migración posterior de la web pública, no como requisito de esta fase.

## 1. Enlaces de referencia y ejecución

### Baseline aprobado

- [Landing actual](../prototype/index.html)
- [Reserva actual](../prototype/reservar.html)
- [Portal paciente actual](../prototype/paciente.html?view=home)
- [Citas del paciente](../prototype/paciente.html?view=appointments)
- [Tratamiento del paciente](../prototype/paciente.html?view=treatment)
- [Documentos del paciente](../prototype/paciente.html?view=documents)
- [Pagos del paciente](../prototype/paciente.html?view=payments)
- [Consola administrativa](../prototype/admin.html?view=dashboard)
- [Historia y odontograma](../prototype/admin.html?view=patient&patient=pat_maria)
- [Caja y pagos](../prototype/admin.html?view=finance)
- [Reportes](../prototype/admin.html?view=reports)
- [Auditoría](../prototype/admin.html?view=audit)

### Documentación de dominio

- [Casos de uso](07-casos-de-uso.md)
- [Modelo de datos](08-modelo-de-datos.md)
- [Diagramas integrales](10-diagramas-integrales.md)
- [Plan de vistas y seed original](11-plan-vistas-html-mockup.md)
- [Plan de rediseño v2](13-plan-redisenio-v2-web-portales-y-movil.md)
- [Pipeline de activos](14-pipeline-activos-y-decision-astro.md)

### Ejecución local

Desde `D:\dental`:

```powershell
python -m http.server 8080
```

Enlaces del baseline:

- `http://localhost:8080/prototype/index.html`
- `http://localhost:8080/prototype/reservar.html`
- `http://localhost:8080/prototype/paciente.html?view=home`
- `http://localhost:8080/prototype/admin.html?view=dashboard`

Enlaces objetivo v2:

- `http://localhost:8080/prototype-v2/public/index.html`
- `http://localhost:8080/prototype-v2/patient/index.html?view=home`
- `http://localhost:8080/prototype-v2/staff/index.html?view=dashboard`
- `http://localhost:8080/prototype-v2/mobile/patient-flows.html#home`

## 2. Alcance del prototipo

### Incluido

- Vistas públicas, portal paciente, consola privada y mockups móviles.
- Responsive para 390, 768, 1024, 1280 y 1440 px.
- Navegación enlazada entre vistas.
- Datos ficticios consistentes de una paciente, ocho profesionales y doce especialidades.
- Interacciones locales: filtros, tabs, modales, drag-and-drop simulado, visores, cambios de estado y confirmaciones.
- Imágenes descargadas con metadatos, licencias y etiquetas.
- Formularios con validación visual y mensajes de éxito/error.
- Estados vacío, cargando, error, sin permisos y acción completada.

### No incluido todavía

- Autenticación real, MFA real o control de sesiones.
- API, base de datos, almacenamiento de documentos o DICOM real.
- Procesamiento real de pagos, comprobantes tributarios o integración Yape/Plin.
- Firma clínica, receta válida o diagnóstico real.
- IA/voz funcional. Sólo se conserva el espacio de datos previsto y permanece desactivado.
- Multisede operativa. Se muestran selectores y campos `organizationId`/`siteId`, pero el seed utiliza una sede activa.

## 3. Arquitectura de carpetas objetivo

```text
prototype-v2/
├── public/
│   ├── index.html
│   ├── especialidades.html
│   ├── especialidad.html
│   ├── equipo.html
│   ├── profesional.html
│   ├── tecnologia.html
│   ├── contacto.html
│   └── reservar.html
├── patient/
│   ├── login.html
│   ├── index.html
│   └── viewers/
│       ├── pdf.html
│       ├── imagen.html
│       └── radiografia.html
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

Durante la primera iteración se puede conservar una sola entrada con `?view=` por producto. Cuando las pantallas estén validadas se pueden separar en archivos sin cambiar los componentes ni el seed.

## 4. Sistema visual que se debe conservar

### Archivos de estilos de referencia

- [Tokens actuales](../prototype/assets/css/tokens.css)
- [Base actual](../prototype/assets/css/base.css)
- [Estilos públicos actuales](../prototype/assets/css/public.css)
- [Estilos de aplicación actuales](../prototype/assets/css/app.css)

### Tokens

Conservar la identidad sobria y clínica:

| Uso | Token | Valor actual |
|---|---|---|
| Texto principal | `--ink` | `#17262c` |
| Texto secundario | `--ink-soft` | `#526168` |
| Fondo | `--paper` | `#f7f8f6` |
| Superficie | `--surface` | `#ffffff` |
| Azul principal | `--blue` | `#155b68` |
| Azul profundo | `--blue-deep` | `#0c414d` |
| Teal | `--teal` | `#167b78` |
| Terracota | `--terracotta` | `#bd654d` |
| Alerta | `--amber` | `#a9701a` |
| Éxito | `--green` | `#2f7a54` |
| Radio principal | `--radius` | `16px` |

Tipografía:

- Cuerpo: `DM Sans` o fallback sans-serif.
- Encabezados: `Newsreader`/Georgia.
- No introducir una segunda paleta para v2.
- Los estados clínicos no dependerán sólo del color: siempre incluir icono, texto o patrón.

### Layout

- Web pública: contenedor fluido `min(1440px, calc(100% - 64px))` en escritorio.
- Texto largo: limitar sólo la columna de lectura, no toda la sección.
- Portal paciente: shell con navegación lateral en escritorio y navegación inferior en móvil.
- Staff: sidebar fija, barra superior contextual y área de trabajo amplia.
- Cards: usar `--radius`, borde `--line` y sombra pequeña; evitar apilar todo en tarjetas estrechas.

### Responsive

| Breakpoint | Comportamiento |
|---|---|
| 1440 | Layout amplio, hero 55/45, grids de 4 columnas |
| 1280 | Reducción de gaps y sidebar staff de 240 px |
| 1024 | Grids de 2/3 columnas, paneles divididos pasan a stack |
| 768 | Header compacto, tablas con scroll, sidebar colapsable |
| 480/390 | Navegación inferior paciente, CTA fija, formularios de una columna |

### Movimiento y accesibilidad

- Marquee con pausa al hover/foco y `prefers-reduced-motion`.
- Foco visible en botones, tabs, inputs y piezas dentales.
- `aria-label` para iconos y controles.
- Teclado equivalente al drag-and-drop del odontograma.
- Contraste AA para textos y estados.

## 5. Componentes compartidos

Implementar primero estos componentes en `prototype-v2/assets/js/components.js` y sus estilos en `components.css`:

| Componente | Uso | Estados mínimos |
|---|---|---|
| `BrandLockup` | Logo, nombre y sede | desktop, móvil, compacto |
| `PublicHeader` | Header de web pública | normal, drawer abierto, scroll |
| `AppShell` | Portal paciente/staff | desktop, tablet, móvil |
| `Button` | CTA y acciones | primary, secondary, soft, danger, loading, disabled |
| `Chip` | Estados, etiquetas y filtros | success, warning, info, neutral |
| `Toast` | Confirmaciones | success, error, info |
| `Modal` | Confirmación y detalle | abierto, cerrado, foco atrapado |
| `Drawer` | Filtros y detalle móvil | abierto, cerrado |
| `Tabs` | Historia, documentos y tratamiento | activo, disabled |
| `DataTable` | Listados staff | loading, empty, pagination, row actions |
| `FilterBar` | Búsqueda y filtros | texto, select, fecha, limpiar |
| `Timeline` | Evolución y auditoría | evento, adenda, publicación |
| `FileCard` | PDF, foto, radiografía, receta | nuevo, leído, restringido |
| `DocumentViewer` | Visor de archivos | PDF, imagen, radiografía |
| `PaymentSummary` | Saldo, cuotas y adelantos | pendiente, pagado, vencido |
| `StatusBadge` | Estados de cita, archivo y pago | texto + icono |
| `EmptyState` | Sin resultados o permisos | CTA contextual |

## 6. Vistas públicas

### 6.1 Inicio

- Ruta objetivo: `prototype-v2/public/index.html`.
- Baseline: [index.html](../prototype/index.html).
- Alcance: landing de clínica especializada en Arequipa.
- Secciones: header doble, hero, marquee, especialidades, motivos de consulta, proceso, equipo, tecnología, portal paciente, FAQ, contacto y footer.
- Componentes: `BrandLockup`, `PublicHeader`, `Hero`, `CampaignMarquee`, `SpecialtyCard`, `DoctorCard`, `ProcessSteps`, `TechnologyCard`, `FaqAccordion`, `ContactPanel`, `PublicFooter`.
- Interacciones: pausa del marquee, scroll a anclas, CTA reserva, CTA contacto y apertura de FAQ.
- Seed: `clinic`, `campaigns`, `specialties`, `practitioners`, `faqItems`.
- Aceptación: utiliza todo el ancho, no enlaza la consola admin y se visualiza correctamente en 390 px.

### 6.2 Especialidades

- Ruta objetivo: `prototype-v2/public/especialidades.html`.
- Componentes: `PageHero`, `FilterBar`, `SpecialtyCard`, `SpecialtyCategoryTabs`, `BookingCta`.
- Contenido: doce especialidades/servicios, duración referencial, etapa de atención, tecnología relacionada y CTA.
- Interacciones: filtrar por etapa, buscar por nombre, abrir detalle y reservar.
- Aceptación: los filtros no pierden el estado al volver desde el detalle.

### 6.3 Detalle de especialidad

- Ruta objetivo: `prototype-v2/public/especialidad.html?slug=ortodoncia`.
- Componentes: `Breadcrumbs`, `SpecialtyHero`, `OutcomeList`, `ProcessSteps`, `RelatedDoctors`, `RelatedServices`, `FaqAccordion`, `BookingCta`.
- Contenido: descripción clara, para quién es, qué incluye, qué no promete, preguntas frecuentes y doctores relacionados.
- Aceptación: cada especialidad tiene título, meta description, imagen etiquetada y CTA contextual.

### 6.4 Equipo

- Ruta objetivo: `prototype-v2/public/equipo.html`.
- Componentes: `DoctorFilter`, `DoctorCard`, `AvailabilityChip`, `PaginationOrLoadMore`.
- Contenido: ocho doctores ficticios, especialidad, áreas clínicas, idiomas, sede y disponibilidad demostrativa.
- Interacciones: filtrar por especialidad/sede, buscar, abrir perfil y solicitar cita.
- Aceptación: toda ficha muestra `Perfil ficticio para demostración`.

### 6.5 Perfil profesional

- Ruta objetivo: `prototype-v2/public/profesional.html?id=pro_ana`.
- Componentes: `DoctorProfileHero`, `CredentialList`, `ServiceList`, `SchedulePreview`, `RelatedSpecialties`, `BookingCta`.
- Contenido: biografía ficticia, formación no verificable marcada como demo, servicios, idiomas y horarios de muestra.
- Aceptación: no presentar credenciales reales ni fotos como identidad real.

### 6.6 Tecnología y diagnóstico

- Ruta objetivo: `prototype-v2/public/tecnologia.html`.
- Componentes: `TechnologyHero`, `TechnologyCard`, `DiagnosticFlow`, `ReferenceGallery`, `TrustNote`.
- Contenido: fotografía intraoral, radiografía panorámica de referencia, diagnóstico digital y portal de resultados.
- Aceptación: toda radiografía se etiqueta como material ficticio/no clínico.

### 6.7 Contacto

- Ruta objetivo: `prototype-v2/public/contacto.html`.
- Componentes: `ContactForm`, `ReasonSelect`, `PreferredChannel`, `ClinicContactCard`, `MapPlaceholder`, `PrivacyNotice`, `RequestConfirmation`.
- Interacciones: validar campos, crear solicitud ficticia, mostrar número de solicitud y limpiar formulario.
- Reglas: separar contacto general de reserva; mostrar aviso de no enviar emergencias ni datos sensibles.

### 6.8 Reserva

- Ruta objetivo: `prototype-v2/public/reservar.html`.
- Baseline: [reservar.html](../prototype/reservar.html).
- Componentes: `BookingStepper`, `SpecialtyChoice`, `DoctorChoice`, `DateTimeGrid`, `PatientForm`, `BookingSummary`, `BookingConfirmation`.
- Interacciones: cuatro pasos, volver sin perder selección, estados de horario ocupado y confirmación.
- Aceptación: no crea una cita real; sólo actualiza el estado seed y muestra confirmación.

## 7. Portal paciente

### Shell y acceso

- Ruta: `prototype-v2/patient/login.html`.
- Componentes: `BrandLockup`, `LoginCard`, `OtpStep`, `PrivacyNotice`, `SupportCta`.
- Estado demo: acceso como `María Quispe`; indicar que es una cuenta ficticia.

### Inicio paciente

- Ruta: `prototype-v2/patient/index.html?view=home`.
- Baseline: [paciente.html?view=home](../prototype/paciente.html?view=home).
- Componentes: `NextActionCard`, `AppointmentCard`, `TreatmentProgress`, `NewDocumentCard`, `InstallmentCard`, `AnnouncementCard`, `ActivityTimeline`.
- Interacciones: confirmar/reprogramar cita, abrir documento, ver cuota, ir a contacto.

### Citas

- Ruta: `prototype-v2/patient/index.html?view=appointments`.
- Componentes: `AppointmentList`, `AppointmentDetailDrawer`, `ReschedulePicker`, `CheckInCard`, `BookingCta`.
- Estados: confirmada, pendiente, completada, cancelada y reprogramación simulada.

### Tratamiento

- Ruta: `prototype-v2/patient/index.html?view=treatment`.
- Baseline: [tratamiento actual](../prototype/paciente.html?view=treatment).
- Componentes: `TreatmentPhaseStepper`, `FindingCard`, `ReadOnlyOdontogram`, `ProcedureList`, `ClarificationCta`, `TreatmentDocumentLinks`.
- Regla: el paciente puede solicitar aclaración, pero nunca modificar el registro clínico.

### Documentos y resultados

- Ruta: `prototype-v2/patient/index.html?view=documents`.
- Baseline: [documentos actuales](../prototype/paciente.html?view=documents).
- Componentes: `DocumentFilter`, `FileCard`, `DocumentStatus`, `DocumentViewerLauncher`, `ReportIssueModal`.
- Tipos: informe PDF, receta, consentimiento, radiografía, fotografía intraoral, serie comparativa y comprobante.
- Interacciones: marcar leído, abrir visor, zoom, descargar simulación y reportar archivo incorrecto.

### Visor PDF

- Ruta: `prototype-v2/patient/viewers/pdf.html?id=doc_informe_01`.
- Componentes: `PdfToolbar`, `PdfThumbnailRail`, `PdfPageMock`, `DocumentMeta`, `DownloadButton`.
- Interacciones: cambiar página, zoom, restablecer, descargar simulación.

### Visor de imagen y radiografía

- Ruta: `prototype-v2/patient/viewers/radiografia.html?id=media_pan_01`.
- Componentes: `ImageToolbar`, `ZoomCanvas`, `BrightnessControl`, `ContrastControl`, `ComparisonSlider`, `ImageMeta`.
- Interacciones: zoom, brillo, contraste, restablecer, comparar antes/después.
- **Técnica de implementación**: Utilizar CSS Custom Variables (`--zoom`, `--brightness`, `--contrast`) manipuladas mediante JS vanilla sobre el contenedor (`filter: brightness(var(--brightness)) contrast(var(--contrast))` y `transform: scale(var(--zoom))`), garantizando 0 dependencias externas.

### Recetas

- Ruta: `prototype-v2/patient/index.html?view=prescriptions`.
- Componentes: `PrescriptionCard`, `MedicationList`, `PrescriptionViewer`, `ValidityBadge`.
- Regla: mostrar como receta ficticia de demostración; no permitir editar ni emitir.

### Pagos

- Ruta: `prototype-v2/patient/index.html?view=payments`.
- Baseline: [pagos actuales](../prototype/paciente.html?view=payments).
- Componentes: `BalanceSummary`, `ChargeTable`, `InstallmentCard`, `PaymentMethodSelector`, `ReceiptCard`, `PaymentHelpCta`.
- Estados: saldo pendiente, cuota vencida, adelanto, crédito a favor, pagado, reverso simulado.

### Mensajes, anuncios y perfil

- Rutas: `?view=messages`, `?view=profile`.
- Componentes: `AnnouncementCard`, `MessageThread`, `NotificationPreferences`, `ProfileForm`, `PrivacyPermissions`.
- Interacciones: marcar leído, abrir anuncio, cambiar preferencia local y solicitar ayuda.

## 8. Consola privada administrativa

Entrada: `prototype-v2/staff/login.html` y `prototype-v2/staff/index.html?view=dashboard`. No debe existir enlace desde la navegación pública.

### Shell staff

- Componentes: `StaffSidebar`, `StaffTopbar`, `CommandSearch`, `SiteSelector`, `RoleSwitcher`, `PermissionGuard`, `Breadcrumbs`.
- Roles demo: administrador, recepción, profesional, caja y marketing.
- Estados: permiso concedido, permiso restringido, sede activa y sesión simulada.

### Vistas operativas

| Vista | Ruta objetivo | Componentes principales | Acción demostrable |
|---|---|---|---|
| Dashboard | `?view=dashboard` | `KpiGrid`, `AgendaPreview`, `AlertList`, `TaskList`, `ProductionChart` | abrir tarea y filtrar período |
| Agenda | `?view=agenda` | `CalendarGrid`, `ResourceLane`, `AppointmentDrawer`, `ConflictBanner` | mover cita y mostrar conflicto |
| Recepción | `?view=reception` | `QueueTable`, `CheckInAction`, `QuickCharge`, `PatientSearch` | registrar llegada y cobrar demo |
| Pacientes | `?view=patients` | `PatientTable`, `FilterBar`, `PatientDrawer`, `MergeWarning` | buscar y abrir historia |
| Historia clínica | `?view=patient&patient=pat_maria` | `PatientBanner`, `ClinicalTabs`, `Timeline`, `OdontogramEditor` | cambiar pestaña y guardar borrador |
| Planes | `?view=plans` | `PlanTable`, `PhaseEditor`, `BudgetSummary`, `AcceptanceStatus` | crear nueva versión de plan |
| Documentos | `?view=documents` | `Uploader`, `ReviewQueue`, `PublicationPanel`, `VersionTimeline` | cargar, revisar y publicar |
| Recetas | `?view=prescriptions` | `PrescriptionEditor`, `MedicationTable`, `IssueStatus` | guardar borrador y anular demo |
| Caja | `?view=finance` | `CashSession`, `LedgerTable`, `PaymentForm`, `InstallmentPlan`, `ReconciliationPanel` | registrar pago y reverso |
| Profesionales | `?view=practitioners` | `PractitionerTable`, `PractitionerForm`, `ScheduleEditor`, `PublicPreview` | crear, editar y desactivar demo |
| Especialidades | `?view=specialties` | `SpecialtyTable`, `ServiceForm`, `VersionBadge` | archivar servicio |
| Campañas | `?view=communications` | `CampaignTable`, `CampaignForm`, `AudienceSelector`, `MobilePreview` | publicar y pausar anuncio |
| Inventario | `?view=operations` | `StockTable`, `MovementDrawer`, `ExpiryAlert` | registrar ajuste de stock |
| Reportes | `?view=reports` | `ReportFilter`, `KpiGrid`, `ChartCard`, `ExportButton`, `DrilldownDrawer` | cambiar rango y exportar demo |
| Auditoría | `?view=audit` | `AuditTable`, `AuditDiff`, `ActorFilter`, `EventDetail` | abrir diferencia de evento |
| Configuración | `?view=settings` | `RoleMatrix`, `CatalogSettings`, `SiteSettings`, `FeatureFlags` | activar/desactivar flag demo |

### Reglas CRUD del mockup

- Crear: abre formulario modal o página lateral.
- Editar: actualiza el seed en memoria y registra toast.
- Eliminar: siempre es desactivar, archivar, anular o retirar publicación.
- Firmado: notas, odontogramas y pagos cerrados no se editan; se muestra adenda/reverso.
- Cada acción muestra actor, fecha y motivo ficticios en la línea de auditoría.

## 9. Odontograma dentro de la vista clínica

- Componentes: `OdontogramToolbar`, `ToothGrid`, `Tooth`, `SurfacePalette`, `FindingPalette`, `TreatmentPalette`, `ToothDetailDrawer`, `OdontogramLegend`, `HistoryTimeline`.
- Modos: permanente, temporal, sólo lectura, edición de borrador.
- Interacciones: seleccionar, tocar, arrastrar tratamiento a pieza, zoom, desplazamiento, teclado y deshacer local.
- Datos: FDI, arco, pieza, superficie, hallazgo, tratamiento, estado, autor y encuentro.
- No utilizar PNG como dato clínico. El PNG/SVG de referencia queda sólo como apoyo visual.
- Validar iconos, colores y nomenclatura con odontólogo colegiado antes de producción.

## 10. Mockups móviles del paciente

Archivo objetivo: `prototype-v2/mobile/patient-flows.html`, ancho base 390 × 844 px.

| Ancla | Vista | Componentes |
|---|---|---|
| `#welcome` | bienvenida/login | `MobileBrand`, `LoginCard`, `OtpStep` |
| `#home` | inicio | `MobileHeader`, `NextActionCard`, `BottomNav` |
| `#appointments` | citas | `AppointmentCard`, `RescheduleSheet` |
| `#treatment` | tratamiento | `TreatmentPhaseStepper`, `ReadOnlyOdontogram` |
| `#documents` | documentos | `FileCard`, `DocumentFilter` |
| `#pdf` | visor PDF | `PdfPageMock`, `PdfToolbar` |
| `#media` | foto/radiografía | `ZoomCanvas`, `ImageToolbar` |
| `#prescriptions` | recetas | `PrescriptionCard` |
| `#payments` | cuotas/pago | `BalanceSummary`, `PaymentMethodSelector` |
| `#receipt` | comprobante | `ReceiptCard`, `DownloadButton` |
| `#announcements` | anuncios | `AnnouncementCard`, `MessageThread` |
| `#contact` | contacto | `ContactForm`, `SupportCta` |
| `#profile` | perfil/privacidad | `ProfileForm`, `PermissionList` |

La navegación inferior sólo tendrá Inicio, Citas, Tratamiento, Documentos y Cuenta. Las vistas de administración no se duplican en móvil en esta fase.

**Reuso de Componentes en Móvil**: Las tarjetas e indicadores de esta vista importarán los mismos módulos renderizadores de `components.js` para asegurar que un cambio en la interfaz web se refleje sin duplicación de código en la vista móvil.

## 11. Seed y contratos de interacción

Crear:

- `prototype-v2/data/seed-v2.js`
- `prototype-v2/data/content-v2.js`
- `prototype-v2/assets/js/mock-api-v2.js`

El seed debe contener como mínimo:

- una clínica y una sede de Arequipa;
- una paciente ficticia `pat_maria`;
- ocho profesionales ficticios;
- doce especialidades/servicios;
- citas en distintos estados;
- un plan con fases, procedimientos y presupuesto;
- hallazgos FDI y tratamientos de odontograma;
- informes PDF ficticios, fotografías y radiografía;
- recetas ficticias;
- pagos, adelantos, cuotas, saldo, reverso y comprobante;
- tres anuncios con audiencia y fechas;
- eventos de auditoría;
- metadatos SEO e imagen/licencia.

Contrato local recomendado:

```js
const api = {
  getViewState(view),
  updateAppointment(id, patch),
  updatePatientDocument(id, patch),
  updatePayment(id, patch),
  updateOdontogramDraft(patientId, event),
  createAnnouncement(input),
  updatePractitioner(id, patch),
  logAuditEvent(event)
};
```

**Arquitectura de Módulos y Persistencia**:
- Toda la arquitectura JS se cargará con **ES Modules (`<script type="module">`)** para permitir importaciones modulares de `components.js`, `seed-v2.js` y `mock-api-v2.js`.
- `mock-api-v2.js` sincronizará automáticamente el estado en `sessionStorage` para garantizar la persistencia de las mutaciones locales al navegar entre distintas páginas HTML independientes (como al abrir los visores de `patient/viewers/`).

Todas las operaciones devuelven una copia del estado y muestran un resultado visual. No escribir datos reales en disco.

## 12. Orden de implementación

### Fase 0 — Preparación

- [ ] Crear carpetas `public`, `patient`, `staff`, `mobile` y `data`.
- [ ] Copiar tokens y crear `components.css`.
- [ ] Crear `components.js` (ES Modules) con shell, botones, cards, modal, drawer y toast.
- [ ] Crear `seed-v2.js` y `mock-api-v2.js` con soporte para `sessionStorage`.
- [ ] Verificar rutas actuales y no romper `prototype/`.

### Fase 1 — Web pública

- [ ] Construir `PublicHeader`, `Hero` y layout full-width.
- [ ] Implementar marquee accesible.
- [ ] Implementar especialidades, equipo y perfiles.
- [ ] Implementar tecnología y contacto.
- [ ] Migrar reserva al nuevo shell.
- [ ] Integrar imágenes desde `assets/asset-catalog.json`.

### Fase 2 — Portal paciente

- [ ] Crear login demo y shell paciente.
- [ ] Migrar home, citas, tratamiento, documentos y pagos.
- [ ] Añadir recetas, mensajes y perfil.
- [ ] Crear visores PDF, imagen y radiografía con filtros CSS dinámicos.
- [ ] Añadir estados de lectura, error y ayuda.

### Fase 3 — Consola staff

- [ ] Crear login, sidebar, topbar y permisos.
- [ ] Migrar las vistas del admin actual.
- [ ] Añadir CRUD lógico de doctores, especialidades y anuncios.
- [ ] Completar documentos, recetas, caja y reportes.
- [ ] Construir odontograma ampliado.
- [ ] Mostrar auditoría para cada mutación.

### Fase 4 — Móvil

- [ ] Crear frame 390 × 844.
- [ ] Implementar navegación inferior.
- [ ] Enlazar los 13 estados móviles con el mismo seed paciente reusando `components.js`.
- [ ] Verificar visores, pagos y formularios táctiles.

### Fase 5 — Validación y Happy Paths

- [ ] Recorrer Happy Path Público: `index.html` → `especialidad.html` → `reservar.html`.
- [ ] Recorrer Happy Path Paciente: `login.html` → `home` → `viewers/radiografia.html` → `payments`.
- [ ] Recorrer Happy Path Staff: `login.html` → `dashboard` → `patient` (Odontograma) → `finance`.
- [ ] Probar 390, 768, 1024 y 1440 px.
- [ ] Probar teclado y foco.
- [ ] Probar estados sin datos, error y permiso denegado.
- [ ] Confirmar que no aparece admin en la web pública.
- [ ] Confirmar que ningún recurso se presenta como paciente o doctor real.
- [ ] Revisar alt text, licencias y ausencia de datos sensibles.

## 13. Criterios de aceptación del prototipo

### Navegación

- Cada CTA de la landing llega a una vista existente o a un estado de confirmación.
- El paciente puede completar un flujo desde login demo hasta documento, tratamiento y pago.
- El personal puede recorrer dashboard, historia, odontograma, documentos, caja y reportes.
- Los mockups móviles comparten el mismo seed y reflejan los cambios locales del portal.

### Visual

- El contenido público usa el ancho disponible sin quedar encerrado en una tarjeta central.
- La paleta y tipografía coinciden con `tokens.css`.
- Las imágenes conservan recorte, alt, fuente y etiqueta de referencia.
- El diseño no depende únicamente del color para comunicar estados.

### Interacción

- Formularios muestran validación y confirmación.
- Visores tienen zoom/restablecer y no permiten editar documentos.
- Odontograma distingue sólo lectura, borrador y firmado.
- Pagos muestran trazabilidad simulada y nunca eliminan movimientos.
- CRUD administra estados locales y registra auditoría ficticia.

### Técnica

- No hay dependencias de backend ni librerías JS externas.
- No se rompen las rutas de `prototype/` (v1).
- La consola queda separada de la navegación pública.
- La migración a Astro puede hacerse después conservando `assets`, `content`, tokens y componentes.
