# Odontograma digital peruano

## Base normativa

La referencia vigente identificada es la **NTS N.º 188-MINSA/DGIESP-2022**, aprobada
mediante [Resolución Ministerial N.º 559-2022-MINSA](https://www.gob.pe/institucion/minsa/normas-legales/3304261-559-2022-minsa).
La norma estandariza el gráfico, nomenclatura y registro de características, anomalías,
patologías y procedimientos con fines clínicos, legales, forenses, estadísticos, de
investigación y docencia.

También debe considerarse el Código de Ética y Deontología del Colegio Odontológico del
Perú. La validación final debe hacerse contra la edición normativa vigente y sus anexos,
no contra láminas informales encontradas en internet.

## Reglas que condicionan el software

1. El odontograma forma parte de la ficha estomatológica y la historia clínica.
2. Usa el sistema de dos dígitos de la Federación Dental Internacional (FDI).
3. Debe existir un registro inicial individual por paciente.
4. El registro inicial representa lo observado y no debe confundirse con el plan.
5. La evolución de tratamientos se registra separadamente.
6. Los hallazgos deben respetar ubicación, forma y proporción.
7. Una corrección no debe borrar silenciosamente el registro anterior.

Por lo anterior, el sistema tendrá tres capas:

| Capa | Contenido | Mutabilidad |
|---|---|---|
| Odontograma inicial | hallazgos observados al examen | se firma/cierra; correcciones por adenda |
| Plan de tratamiento | propuesta, prioridad, alternativas, presupuesto | versionable y sujeto a aceptación |
| Evolución/procedimientos | actos ejecutados, pieza/superficie, profesional y fecha | append-only, con rectificación trazable |

## Diseño visual

### Dentición y numeración

- dentición permanente: cuadrantes FDI 1, 2, 3 y 4;
- dentición temporal: cuadrantes FDI 5, 6, 7 y 8;
- cada pieza posee regiones/superficies direccionables;
- vista adulta, pediátrica y mixta según el paciente;
- arco superior e inferior claramente diferenciados.

### Símbolos e iconos

No se deben “inventar” equivalencias gráficas ni asumir que un ícono publicado por el
Colegio Odontológico puede copiarse. Se creará un **catálogo clínico versionado** a partir
de los anexos de la NTS, con validación profesional y revisión de derechos de uso.

Cada entrada del catálogo tendrá:

```text
codigo_interno
nombre_normativo
tipo: hallazgo | condicion | procedimiento
aplica_a: pieza | superficie | raiz | zona | arcada
geometria: punto | linea | relleno | contorno | simbolo
color_normativo
parametros_requeridos
fuente_normativa + version + pagina
activo_desde / activo_hasta
```

La geometría normativa debe generarse como SVG propio. Los iconos decorativos pueden
usar una librería permisiva, pero nunca reemplazan el símbolo clínico oficial.

## Interacción táctil y drag-and-drop

### Flujo recomendado

1. seleccionar o arrastrar una condición/tratamiento desde una paleta;
2. soltar sobre pieza o superficie;
3. mostrar una previsualización, no guardar inmediatamente;
4. abrir un panel de confirmación con pieza FDI, superficie, estado, notas y fecha;
5. validar reglas de compatibilidad;
6. confirmar y registrar un evento auditado;
7. actualizar la proyección visual.

El arrastre no será obligatorio. También habrá:

- tocar pieza y luego elegir acción;
- selección múltiple explícita;
- navegación por teclado;
- buscador de acciones;
- deshacer sólo antes de confirmar;
- corrección mediante adenda después de firmar.

### Requisitos de ergonomía

- objetivos táctiles de al menos 44 × 44 px lógicos;
- tolerancia de caída y zoom sin perder el objetivo;
- respuesta háptica opcional en móvil/tablet;
- confirmación reforzada para extracción, ausencia u otras acciones amplias;
- no usar sólo rojo/azul: añadir patrón, borde, texto y leyenda;
- bloquear gestos de scroll sólo durante un arrastre reconocido;
- soporte de lápiz digital sin depender de dibujo libre;
- modo guantes/tablet con controles ampliados.

## Modelo de eventos

```json
{
  "eventId": "uuid",
  "patientId": "uuid",
  "chartVersionId": "uuid",
  "kind": "finding|plan|procedure|correction",
  "conceptCode": "catalog-code",
  "toothFdi": "16",
  "surfaces": ["O", "M"],
  "geometry": {},
  "status": "observed|proposed|completed|corrected",
  "occurredAt": "date-time",
  "recordedAt": "date-time",
  "authorId": "uuid",
  "encounterId": "uuid",
  "reason": null,
  "supersedesEventId": null
}
```

La imagen visible se deriva de estos eventos. Para impresión se genera un PDF con hash,
versión del catálogo, leyenda, profesional y sello temporal.

## Limitaciones y controles clínicos

- Un PNG no es el dato fuente y no basta como historia clínica.
- El odontograma no reemplaza diagnóstico, notas, consentimiento ni evidencia adjunta.
- No toda condición cabe en una sola superficie; el modelo debe admitir raíz, arcada y
  regiones libres controladas.
- Los tratamientos sugeridos nunca se registran como ejecutados por arrastrarlos.
- En una fase futura, una IA podría proponer una marca, pero sólo el profesional podría
  confirmarla. IA y voz permanecen desactivadas en el producto y en el mockup inicial.
- No se debe permitir que un paciente edite información clínica.
- La operación offline clínica no se habilitará hasta resolver firma, sincronización,
  conflictos, cifrado y borrado remoto.

## Prototipo mínimo

1. SVG de dentición permanente y temporal con IDs FDI.
2. Cinco superficies por pieza posterior y regiones apropiadas para anteriores.
3. Paleta pequeña validada por un odontólogo.
4. mouse, tacto, teclado y lector de pantalla.
5. historial de eventos y vista “antes/después”.
6. exportación PDF con leyenda.
7. prueba en tablet Android, iPad y navegador de escritorio.

## Validación requerida

Antes de ampliar el catálogo, un comité de al menos dos cirujanos dentistas debe revisar
símbolo, color, alcance anatómico, terminología y reglas de cada entrada contra la NTS.
Debe conservarse una matriz de trazabilidad norma → catálogo → prueba visual.
