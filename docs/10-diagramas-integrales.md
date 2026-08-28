# Diagramas integrales de la solución

## 1. Contexto y actores

```mermaid
flowchart LR
  PAC["Paciente / apoderado"]
  REC["Recepción"]
  ODO["Cirujano dentista"]
  ASI["Asistente"]
  CAJ["Caja"]
  ADM["Administrador"]
  LAB["Laboratorio / almacén"]
  AUD["Auditor / privacidad"]

  SYS["Plataforma dental"]

  PAY["Pasarela de pago"]
  MSG["WhatsApp / email / push"]
  DCM["Equipo radiológico / PACS"]
  TAX["Comprobantes electrónicos"]
  CAL["Calendario externo"]

  PAC --> SYS
  REC --> SYS
  ODO --> SYS
  ASI --> SYS
  CAJ --> SYS
  ADM --> SYS
  LAB --> SYS
  AUD --> SYS

  SYS <--> PAY
  SYS <--> MSG
  SYS <--> DCM
  SYS <--> TAX
  SYS <--> CAL
```

## 2. Casos de uso principales

```mermaid
flowchart TB
  PAC["Paciente"]
  REC["Recepción"]
  PRO["Profesional"]
  CAJ["Caja"]
  OPE["Operación"]
  ADM["Administrador"]

  subgraph IDENTIDAD["Paciente e identidad"]
    U1["Registrar / buscar / fusionar"]
    U2["Apoderados y consentimientos"]
    U3["Antecedentes y alertas"]
  end

  subgraph AGENDA["Agenda y recepción"]
    U4["Buscar y reservar slot"]
    U5["Confirmar / reprogramar / cancelar"]
    U6["Lista de espera y check-in"]
  end

  subgraph CLINICA["Atención clínica"]
    U7["Abrir y cerrar encuentro"]
    U8["Odontograma y periodontograma"]
    U9["Diagnóstico y plan"]
    U10["Procedimiento y evolución"]
    U11["Receta, documento e imagen"]
  end

  subgraph FINANZAS["Presupuesto y finanzas"]
    U12["Cotizar y aceptar"]
    U13["Cuotas y adelantos"]
    U14["Cobrar, aplicar y conciliar"]
    U15["Caja, gastos y comisiones"]
  end

  subgraph OPERACION["Operación y crecimiento"]
    U16["Inventario y lotes"]
    U17["Casos de laboratorio"]
    U18["Mensajería, recare y encuestas"]
    U19["Analítica y auditoría"]
  end

  PAC --> U2
  PAC --> U4
  PAC --> U5
  PAC --> U12
  PAC --> U13
  PAC --> U18

  REC --> U1
  REC --> U2
  REC --> U4
  REC --> U5
  REC --> U6

  PRO --> U3
  PRO --> U7
  PRO --> U8
  PRO --> U9
  PRO --> U10
  PRO --> U11
  PRO --> U12

  CAJ --> U13
  CAJ --> U14
  CAJ --> U15

  OPE --> U16
  OPE --> U17

  ADM --> U15
  ADM --> U19
```

## 3. Flujo de atención de extremo a extremo

```mermaid
sequenceDiagram
  actor P as Paciente
  participant A as Agenda
  participant R as Recepción
  participant C as Clínica
  participant D as Documentos
  participant F as Finanzas
  participant N as Notificaciones

  P->>A: Solicita cita
  A->>A: Valida profesional, sillón y horario
  A-->>P: Reserva y solicitud de confirmación
  P->>A: Confirma
  A->>N: Programa recordatorios
  P->>R: Check-in y formularios
  R->>C: Abre encuentro
  C->>C: Anamnesis y odontograma inicial/evolución
  C->>C: Diagnóstico y plan versionado
  C->>F: Solicita presupuesto
  F-->>P: Presenta alternativas y cuotas
  P->>F: Acepta y firma
  C->>C: Registra procedimiento ejecutado
  C->>D: Receta, resultado, fotos o radiología
  D->>N: Publicación autorizada
  F->>F: Crea cargo y aplica pago/adelanto
  C->>A: Solicita próxima cita/recare
  N-->>P: Avisos neutros y acceso autenticado
```

## 4. Arquitectura funcional

```mermaid
flowchart TB
  WEB["Web clínica responsive"]
  APP["App / portal del paciente"]

  API["API/BFF + autorización"]

  subgraph CORE["Monolito modular transaccional"]
    IAM["Identidad y permisos"]
    PAT["Pacientes"]
    SCH["Agenda"]
    CLN["Historia clínica"]
    ODO["Odontograma / especialidades"]
    DOC["Documentos / recetas"]
    FIN["Finanzas / caja"]
    OPS["Inventario / laboratorio"]
    COM["Comunicaciones"]
    REP["Reportes"]
  end

  PG[("PostgreSQL")]
  OBJ["Objetos clínicos S3"]
  PACS["Orthanc / DICOMweb"]
  REDIS["Redis / jobs"]
  OUT["Outbox / integraciones"]
  AUD["Auditoría append-only"]

  FUT["IA/voz: contratos y tablas desactivados"]
  SITE["Multisede: modelo preparado, UI desactivada"]

  WEB --> API
  APP --> API
  API --> CORE
  CORE --> PG
  DOC --> OBJ
  DOC --> PACS
  COM --> REDIS
  CORE --> OUT
  CORE --> AUD
  FUT -. "sin ejecución" .-> CORE
  SITE -. "una sede activa" .-> CORE
```

## 5. Modelo entidad-relación conceptual

```mermaid
erDiagram
  ORGANIZATION ||--o{ SITE : contiene
  ORGANIZATION ||--o{ USER : autoriza
  PERSON ||--o| USER : accede_como
  PERSON ||--o| PATIENT : es
  PERSON ||--o| PRACTITIONER : ejerce_como
  PRACTITIONER ||--o{ PRACTITIONER_SITE : pertenece
  SITE ||--o{ PRACTITIONER_SITE : asigna

  PATIENT ||--o{ PATIENT_IDENTIFIER : identifica
  PATIENT ||--o{ PATIENT_RELATIONSHIP : vincula
  PATIENT ||--o{ PATIENT_CONSENT : otorga

  SITE ||--o{ SCHEDULE_RESOURCE : posee
  APPOINTMENT ||--o{ APPOINTMENT_RESOURCE_BOOKING : reserva
  SCHEDULE_RESOURCE ||--o{ APPOINTMENT_RESOURCE_BOOKING : ocupa
  PATIENT ||--o{ APPOINTMENT : agenda
  APPOINTMENT ||--o| ENCOUNTER : origina

  PATIENT ||--o{ ENCOUNTER : recibe
  PRACTITIONER ||--o{ ENCOUNTER : atiende
  ENCOUNTER ||--o{ CLINICAL_NOTE_VERSION : documenta
  ENCOUNTER ||--o{ ODONTOGRAM_SESSION : contiene
  ODONTOGRAM_SESSION ||--o{ ODONTOGRAM_EVENT : registra
  DENTAL_CONCEPT ||--o{ ODONTOGRAM_EVENT : clasifica

  PATIENT ||--o{ CARE_PLAN : posee
  CARE_PLAN ||--o{ CARE_PLAN_VERSION : versiona
  CARE_PLAN_VERSION ||--o{ CARE_PLAN_ITEM : propone
  CARE_PLAN_ITEM ||--o{ PERFORMED_PROCEDURE : origina
  ENCOUNTER ||--o{ PERFORMED_PROCEDURE : ejecuta

  PATIENT ||--o{ DOCUMENT_RECORD : posee
  DOCUMENT_RECORD ||--o{ DOCUMENT_VERSION : versiona
  DOCUMENT_VERSION }o--|| BINARY_OBJECT : almacena
  PATIENT ||--o{ MEDICATION_REQUEST : recibe
  PATIENT ||--o{ IMAGING_STUDY : posee
  IMAGING_STUDY ||--o{ DIAGNOSTIC_REPORT : informa

  CARE_PLAN_VERSION ||--o{ ESTIMATE_VERSION : cotiza
  ESTIMATE_VERSION ||--o{ ESTIMATE_LINE : detalla
  PATIENT ||--o{ CHARGE : adeuda
  PATIENT ||--o{ PAYMENT : paga
  PAYMENT ||--o{ PAYMENT_TENDER : divide
  PAYMENT ||--o{ PAYMENT_ALLOCATION : aplica
  CHARGE ||--o{ PAYMENT_ALLOCATION : recibe
  PAYMENT_PLAN ||--o{ INSTALLMENT : programa

  SITE ||--o{ STOCK_LOCATION : posee
  INVENTORY_ITEM ||--o{ STOCK_LOT : agrupa
  STOCK_LOT ||--o{ STOCK_MOVEMENT : mueve
  PATIENT ||--o{ LAB_CASE : requiere
  LAB_CASE ||--o{ LAB_CASE_EVENT : evoluciona
```

## 6. Relaciones clínicas del odontograma

```mermaid
flowchart LR
  CAT["Versión de catálogo normativo"]
  CON["Concepto dental"]
  RULE["Regla: ámbito, geometría, color"]
  SES["Sesión de odontograma"]
  EVT["Evento clínico"]
  SUR["Pieza FDI y superficies"]
  SNAP["Snapshot firmado"]
  PLAN["Ítem de plan"]
  PROC["Procedimiento ejecutado"]
  AMD["Adenda/corrección"]

  CAT --> CON
  CON --> RULE
  SES --> EVT
  CON --> EVT
  EVT --> SUR
  SES --> SNAP
  EVT --> SNAP
  EVT -. "puede sustentar" .-> PLAN
  PLAN -. "puede originar" .-> PROC
  PROC -. "actualiza evolución" .-> SES
  EVT --> AMD

  NOTE["Hallazgo ≠ plan ≠ ejecución"]
  NOTE --- EVT
  NOTE --- PLAN
  NOTE --- PROC
```

## 7. Relaciones financieras

```mermaid
flowchart LR
  CP["Versión del plan clínico"] --> EST["Presupuesto versionado"]
  EST --> ACC["Aceptación"]
  ACC --> CHG["Cargos"]
  ACC --> PPL["Plan de pagos"]
  PPL --> INS["Cuotas"]

  PAY["Pago recibido"] --> TND["Medios de pago"]
  PAY --> ALL["Aplicaciones"]
  ALL --> CHG
  ALL --> INS
  PAY --> CRE["Crédito / adelanto no aplicado"]

  CHG --> LED["Ledger"]
  PAY --> LED
  CRE --> LED
  REF["Devolución / reversión"] --> LED
  EXP["Gastos"] --> LED

  LED --> BAL["Saldos reproducibles"]
  LED --> REC["Conciliación"]
  LED --> REP["Reportes"]
```

## 8. Estados principales

```mermaid
stateDiagram-v2
  state "Cita" as Appointment {
    [*] --> Solicitada
    Solicitada --> Confirmada
    Solicitada --> Cancelada
    Confirmada --> EnEspera: check-in
    Confirmada --> Reprogramada
    Confirmada --> Inasistencia
    EnEspera --> EnAtencion
    EnAtencion --> Completada
    Reprogramada --> Confirmada: nueva reserva
  }

  state "Documento clínico" as Document {
    [*] --> Cuarentena
    Cuarentena --> Borrador: archivo válido
    Cuarentena --> Rechazado
    Borrador --> EnRevision
    EnRevision --> Final
    Final --> Publicado
    Final --> Corregido: nueva versión
    Publicado --> Corregido: nueva versión
  }

  state "Presupuesto" as Estimate {
    [*] --> BorradorP
    BorradorP --> Emitido
    Emitido --> Aceptado
    Emitido --> RechazadoP
    Emitido --> Vencido
    Aceptado --> Reemplazado: nueva versión
  }
```

## 9. IA/voz y multisede como extensiones apagadas

```mermaid
flowchart TB
  ACTIVE["Núcleo funcional activo"]

  subgraph AI["Extensión IA/voz — no funcional"]
    A1["Definición de caso permitido"]
    A2["Consentimiento de procesamiento"]
    A3["Trabajo y referencias de entrada"]
    A4["Artefacto propuesto"]
    A5["Revisión humana"]
  end

  subgraph MS["Extensión multisede — no funcional"]
    M1["Sedes adicionales"]
    M2["Permisos y recursos por sede"]
    M3["Transferencias y numeraciones"]
    M4["Consolidación y reportes"]
  end

  FLAG1["Feature flag permanentemente OFF"]
  FLAG2["Única sede creada"]

  ACTIVE -. "contratos reservados" .-> AI
  ACTIVE -. "organization_id + site_id" .-> MS
  FLAG1 --> AI
  FLAG2 --> MS
```

## 10. Trazabilidad desde requerimiento hasta datos

```mermaid
flowchart LR
  REQ["Objetivo y regla de negocio"]
  UC["Caso de uso"]
  INV["Invariantes y permisos"]
  AGG["Agregado / transacción"]
  API["Contrato API"]
  DB["Tablas, constraints e índices"]
  EVT["Eventos/outbox"]
  AUD["Auditoría"]
  TEST["Pruebas de aceptación y seguridad"]

  REQ --> UC
  UC --> INV
  INV --> AGG
  AGG --> API
  AGG --> DB
  AGG --> EVT
  API --> AUD
  DB --> AUD
  EVT --> AUD
  UC --> TEST
  INV --> TEST
  API --> TEST
  DB --> TEST
```

