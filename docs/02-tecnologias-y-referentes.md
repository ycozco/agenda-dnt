# Investigación de tecnologías y sistemas referentes

Investigación realizada el 23 de julio de 2026. La actividad, seguridad y licencia deben
revalidarse antes de incorporar cualquier dependencia.

## Sistemas de referencia

| Proyecto | Aporte | Tecnología/licencia observada | Decisión preliminar |
|---|---|---|---|
| [Dentalpin](https://www.dentalpin.com/es/) | agenda, pacientes, odontograma, historia, presupuestos, facturación e imágenes; API OpenAPI y módulos | FastAPI/Pydantic; BSL 1.1 con anuncio de transición futura a Apache 2.0 | mejor referencia funcional; no copiar código sin revisión legal de la versión/licencia |
| [Apexo](https://apexo.app/) | enfoque offline-first, sincronización, calendario, pacientes, estadísticas y clientes web/móviles | TypeScript/Flutter en repositorios relacionados; GPLv3 | útil para estudiar UX y sincronización; GPL obliga a analizar compatibilidad con el producto |
| [OpenEMR](https://github.com/openemr/openemr) | EHR maduro, agenda, facturación, internacionalización, API y FHIR | PHP/JS; GNU GPL | referente de seguridad, permisos e interoperabilidad; adaptación dental/peruana sería costosa |
| [react-odontogram](https://github.com/mj-nico23/react-odontogram) | control visual pequeño para estudiar superficies y selección dental | React; licencia no confirmada en la investigación | sólo prototipo/referencia hasta verificar licencia, accesibilidad y mantenimiento |
| [Open Dentist](https://github.com/clawnify/open-dentist) | agenda multi-sala, chart dental, planes, notas y pagos | React/TypeScript/SQLite | candidato joven para revisión técnica, no base aprobada |
| [QDento](https://github.com/thefinalcutbg/QDento) | gestión dental de escritorio | C++/Qt6 | referente funcional, menor encaje con web y app móvil |
| [DentalClinicSystem](https://github.com/ShreyaDhananjay/DentalClinicSystem) | flujo simple de solicitud, aceptación y cancelación de citas | PHP; MIT | ejemplos de agenda, no base clínica suficiente |

### Hallazgo importante sobre licencias

“Open source” no significa automáticamente que el código pueda incorporarse a un producto
cerrado o SaaS sin obligaciones. Antes de reutilizar:

1. confirmar licencia en el commit exacto;
2. identificar licencias de recursos gráficos y tipografías;
3. revisar obligaciones de modificación, distribución y atribución;
4. mantener un inventario SBOM;
5. evitar copiar iconos del Colegio Odontológico o de terceros sin autorización expresa.

## Stack recomendado

### Frontend web clínico

- **Next.js + React + TypeScript** para aplicación responsive y renderizado web.
- **TanStack Query** para caché y sincronización de estado servidor.
- **React Hook Form + Zod** para formularios clínicos y validación compartida.
- **FullCalendar** o componente equivalente para la agenda, después de revisar qué vistas
  y licencia requiere el negocio.
- **SVG nativo + Pointer Events** para el odontograma.
- **dnd-kit** para interacción de arrastre accesible; el comando por toque/clic debe ser
  siempre una alternativa.
- **Playwright, Vitest y axe-core** para pruebas funcionales y de accesibilidad.

SVG se recomienda sobre un PNG interactivo: permite identificar pieza y superficie,
escalar sin perder nitidez, aplicar estados semánticos, imprimir y soportar teclado.
Los PNG se reservan para exportaciones o vistas previas, no como fuente clínica.

### Aplicación móvil del paciente

- **React Native con Expo y TypeScript**.
- comparte contratos, validadores, terminología y cliente API con la web;
- notificaciones push con una capa propia que permita FCM/APNs;
- almacenamiento local cifrado sólo para tokens y datos mínimos;
- biometría como comodidad, no como único mecanismo de autenticación.

No se recomienda que la app del paciente replique toda la aplicación clínica. El personal
puede usar la web responsive; una app clínica offline sería una fase independiente por
el riesgo de conflictos y datos sensibles en dispositivos.

### Backend y datos

- **NestJS/TypeScript**, API REST documentada con OpenAPI;
- **PostgreSQL** con transacciones, restricciones y búsquedas;
- **Redis** para colas, locks breves, rate limiting y trabajos;
- **S3 compatible** (servicio cloud o MinIO) para objetos clínicos cifrados;
- **Orthanc** como PACS/DICOM y puerta DICOMweb cuando se reciban estudios DICOM reales;
- **ClamAV** o servicio equivalente para escaneo de archivos;
- **Keycloak** o proveedor OIDC administrado, según complejidad operativa;
- **OpenTelemetry** para trazas técnicas sin registrar información clínica sensible;
- contenedores Docker y CI/CD con análisis de dependencias, SAST y pruebas.

## Tecnologías de citas

La agenda debe modelar recursos, no sólo “doctor + hora”:

- profesional;
- sillón/consultorio;
- sede;
- equipamiento opcional;
- tipo y duración de atención;
- tiempos de limpieza o preparación;
- bloqueos, vacaciones y sobrecupos autorizados.

Las reservas se protegen en base de datos mediante restricciones/rangos y transacciones.
El drag-and-drop sólo propone un cambio; el servidor vuelve a validar disponibilidad.

Estados sugeridos: solicitada, pendiente de confirmación, confirmada, en espera, en
atención, completada, cancelada, inasistencia y reprogramada. Cada transición conserva
historial y puede disparar avisos.

## Matriz construir vs. adaptar

| Alternativa | Ventaja | Riesgo | Recomendación |
|---|---|---|---|
| Fork de Dentalpin | mayor cercanía funcional | BSL, localización española y proyecto reciente | hacer auditoría/licencia y PoC antes de decidir |
| Fork de Apexo | offline y multiplataforma | GPLv3, arquitectura/sincronización a validar | estudiar componentes y flujos |
| Personalizar OpenEMR | madurez EHR/FHIR | deuda de personalización y UX dental | útil si interoperabilidad EHR domina el alcance |
| Núcleo propio con librerías | control normativo y UX peruana | mayor inversión inicial | opción recomendada, reutilizando infraestructura madura |

## Pruebas técnicas antes de elegir base

1. levantar Dentalpin, Apexo y Open Dentist con datos ficticios;
2. revisar esquema, migraciones, RBAC, auditoría y manejo de archivos;
3. ejecutar análisis de dependencias y secretos;
4. medir esfuerzo para implementar NTS 188, no sólo traducir etiquetas;
5. verificar exportación y eliminación/anonimización controlada;
6. producir un informe de licencia por proyecto y dependencia.

## Fuentes

- [NTS 188 aprobada por RM 559-2022-MINSA](https://www.gob.pe/institucion/minsa/normas-legales/3304261-559-2022-minsa)
- [Repositorio MINSA: Norma Técnica para el uso del odontograma](https://repositorio.minsa.gob.pe/handle/MINSA/81634)
- [FHIR DocumentReference](https://hl7.org/fhir/R5/documentreference.html)
- [FHIR MedicationRequest](https://hl7.org/fhir/R5/medicationrequest.html)
- [Apexo, funcionalidades y GPLv3](https://apexo.app/)
- [Dentalpin, funcionalidades, API y licencia declarada](https://www.dentalpin.com/en/)
- [OpenEMR](https://github.com/openemr/openemr)
