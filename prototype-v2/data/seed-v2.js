/**
 * Seed Dataset de demostración v2 para Sillar Dental Especialidades.
 * Incluye clínica, directorio de pacientes, 8 profesionales colegiados COP,
 * agenda multi-sillón, odontograma FDI de 52 piezas, documentos, caja e inventario.
 */
export const SEED_V2 = {
  activeTenantId: "tenant_sillar_yanahuara",
  tenants: [
    {
      id: "tenant_sillar_yanahuara",
      name: "Sillar Dental Especialidades",
      legalName: "Sillar Odontología Integral S.A.C.",
      slug: "yanahuara",
      subdomain: "yanahuara.sillardental.pe",
      customDomain: "www.sillardental.pe",
      sslStatus: "ACTIVE_VALID",
      ruc: "20601234567",
      plan: "PRO",
      status: "ACTIVE",
      chairsLimit: 3,
      chairsUsed: 3,
      practitionersCount: 8,
      patientsCount: 420,
      monthlyFee: 389,
      currency: "PEN",
      billingCycle: "MONTHLY",
      nextBillingDate: "2026-10-01",
      adminName: "Dra. Ana Flores Vanesa",
      adminEmail: "direccion@sillardental.pe",
      adminPhone: "+51 954 123 456",
      city: "Arequipa",
      address: "Av. Ejército 712, Yanahuara",
      modules: {
        pacs3d: true,
        digitalSignature: true,
        sunatElectronicBilling: true,
        whatsappReminders: true,
        multiChair: true,
        inventory: true
      },
      createdAt: "2026-01-15"
    },
    {
      id: "tenant_alinea_cayma",
      name: "Alínea Studio Ortodoncia 3D",
      legalName: "Alínea Aligners Perú E.I.R.L.",
      slug: "alinea",
      subdomain: "alinea.sillardental.pe",
      customDomain: "www.alineastudio.pe",
      sslStatus: "ACTIVE_VALID",
      ruc: "20608912345",
      plan: "PRO",
      status: "ACTIVE",
      chairsLimit: 4,
      chairsUsed: 2,
      practitionersCount: 3,
      patientsCount: 185,
      monthlyFee: 389,
      currency: "PEN",
      billingCycle: "MONTHLY",
      nextBillingDate: "2026-10-05",
      adminName: "Dr. Diego Torres Vizcarra",
      adminEmail: "diego@alineastudio.pe",
      adminPhone: "+51 954 998 877",
      city: "Arequipa",
      address: "Av. Cayma 405, Cayma",
      modules: {
        pacs3d: true,
        digitalSignature: true,
        sunatElectronicBilling: true,
        whatsappReminders: true,
        multiChair: true,
        inventory: false
      },
      createdAt: "2026-03-10"
    },
    {
      id: "tenant_san_marcos_lima",
      name: "Centro Odontológico San Marcos",
      legalName: "Clínicas Dentales San Marcos S.A.",
      slug: "sanmarcos",
      subdomain: "sanmarcos.sillardental.pe",
      customDomain: "www.dentalsanmarcos.pe",
      sslStatus: "ACTIVE_VALID",
      ruc: "20554433221",
      plan: "ENTERPRISE",
      status: "ACTIVE",
      chairsLimit: 12,
      chairsUsed: 8,
      practitionersCount: 14,
      patientsCount: 1250,
      monthlyFee: 799,
      currency: "PEN",
      billingCycle: "MONTHLY",
      nextBillingDate: "2026-10-15",
      adminName: "Dr. Carlos Mendoza Ramos",
      adminEmail: "gerencia@dentalsanmarcos.pe",
      adminPhone: "+51 987 654 321",
      city: "Lima",
      address: "Av. Larco 880, Miraflores",
      modules: {
        pacs3d: true,
        digitalSignature: true,
        sunatElectronicBilling: true,
        whatsappReminders: true,
        multiChair: true,
        inventory: true
      },
      createdAt: "2025-11-20"
    },
    {
      id: "tenant_dentalsmile_cusco",
      name: "Dental Smile Cusco",
      legalName: "Inversiones Odontológicas del Sur S.R.L.",
      slug: "dentalsmile",
      subdomain: "cusco.sillardental.pe",
      customDomain: null,
      sslStatus: "ACTIVE_VALID",
      ruc: "20489911223",
      plan: "STARTER",
      status: "TRIAL",
      trialDaysRemaining: 9,
      chairsLimit: 1,
      chairsUsed: 1,
      practitionersCount: 1,
      patientsCount: 45,
      monthlyFee: 149,
      currency: "PEN",
      billingCycle: "MONTHLY",
      nextBillingDate: "2026-09-25",
      adminName: "Dra. Sofía Gutiérrez Medina",
      adminEmail: "sofia@dentalsmilecusco.com",
      adminPhone: "+51 984 332 211",
      city: "Cusco",
      address: "Av. El Sol 412, Wanchaq",
      modules: {
        pacs3d: false,
        digitalSignature: false,
        sunatElectronicBilling: false,
        whatsappReminders: true,
        multiChair: false,
        inventory: false
      },
      createdAt: "2026-09-07"
    },
    {
      id: "tenant_oralcare_trujillo",
      name: "OralCare Odontología Especializada",
      legalName: "OralCare Norte S.A.C.",
      slug: "oralcare",
      subdomain: "oralcare.sillardental.pe",
      customDomain: "www.oralcare.pe",
      sslStatus: "EXPIRED_WARNING",
      ruc: "20445566778",
      plan: "PRO",
      status: "SUSPENDED",
      suspendedReason: "Cuota de suscripción vencida hace 18 días.",
      chairsLimit: 3,
      chairsUsed: 3,
      practitionersCount: 4,
      patientsCount: 310,
      monthlyFee: 389,
      currency: "PEN",
      billingCycle: "MONTHLY",
      nextBillingDate: "2026-08-28",
      adminName: "Dr. Jorge Benavides Zúñiga",
      adminEmail: "jorge@oralcare.pe",
      adminPhone: "+51 944 123 789",
      city: "Trujillo",
      address: "Jr. Pizarro 315, Centro",
      modules: {
        pacs3d: true,
        digitalSignature: true,
        sunatElectronicBilling: true,
        whatsappReminders: false,
        multiChair: true,
        inventory: true
      },
      createdAt: "2026-02-14"
    }
  ],
  organization: {
    id: "org_sillar",
    name: "Sillar Dental Especialidades",
    taxId: "RUC 20601234567",
    city: "Arequipa",
    site: {
      id: "site_yanahuara",
      name: "Sede Principal Yanahuara",
      address: "Av. Ejército 712, Yanahuara, Arequipa",
      phone: "(054) 283-910",
      whatsapp: "+51 954 123 456",
      hours: "Lun - Sáb: 8:00 AM - 8:00 PM"
    }
  },
  patients: [
    {
      id: "pat_maria",
      name: "María Quispe Condori",
      documentType: "DNI",
      documentNumber: "45892104",
      birthDate: "1991-04-14",
      phone: "+51 954 892 104",
      email: "maria.quispe.demo@sillardental.pe",
      bloodType: "O+",
      allergies: ["Penicilina"],
      status: "ACTIVE",
      totalSpent: 2100.00,
      balanceDue: 1400.00
    },
    {
      id: "pat_carlos",
      name: "Carlos Ramos Delgado",
      documentType: "DNI",
      documentNumber: "29481023",
      birthDate: "1985-11-20",
      phone: "+51 954 332 190",
      email: "carlos.ramos@demo.pe",
      bloodType: "A+",
      allergies: ["Ninguna"],
      status: "IN_CHAIR",
      totalSpent: 4500.00,
      balanceDue: 0.00
    },
    {
      id: "pat_ana",
      name: "Ana Beltrán Valdivia",
      documentType: "DNI",
      documentNumber: "72109845",
      birthDate: "2018-06-12",
      phone: "+51 954 771 204",
      email: "apoderado.beltran@demo.pe",
      bloodType: "O+",
      allergies: ["Látex"],
      status: "WAITING",
      totalSpent: 350.00,
      balanceDue: 150.00
    }
  ],
  patient: {
    id: "pat_maria",
    name: "María Quispe Condori",
    documentType: "DNI",
    documentNumber: "45892104",
    birthDate: "1991-04-14",
    phone: "+51 954 892 104",
    email: "maria.quispe.demo@sillardental.pe",
    bloodType: "O+",
    allergies: ["Penicilina"],
    nextAppointment: {
      id: "apt_101",
      date: "2026-07-28",
      time: "10:30 AM",
      practitionerName: "Dra. Ana Flores (Ortodoncia)",
      reason: "Control mensual de ortodoncia e instalación de arcos",
      site: "Yanahuara · Sillón 2",
      status: "CONFIRMED"
    },
    activeTreatment: {
      id: "plan_orto_01",
      name: "Plan Integral Ortodoncia & Rehabilitación",
      phase: "Fase 2 de 4: Alineación y Nivelación",
      progressPercent: 45,
      totalCost: 3500.00,
      balanceDue: 1400.00
    }
  },
    appointments: [
  {
    "id": "apt_090",
    "date": "2026-09-07",
    "startTime": "09:00",
    "time": "09:00 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_maria",
    "patientName": "María Quispe Condori",
    "patientPhone": "+51 954 892 104",
    "practitionerId": "pro_ana",
    "practitioner": "Dra. Ana Flores Vanesa",
    "chairId": "chair_1",
    "chair": "Sillón 1 (Ortodoncia)",
    "specialty": "Ortodoncia & Alineadores",
    "reason": "Cambio de alineador placa 04 y ajuste de ataches",
    "status": "COMPLETED",
    "notes": "Evolución favorable, movimiento de incisivos dentro de lo proyectado."
  },
  {
    "id": "apt_091",
    "date": "2026-09-07",
    "startTime": "11:00",
    "time": "11:00 AM",
    "durationMinutes": 60,
    "duration": "60 min",
    "patientId": "pat_carlos",
    "patientName": "Carlos Ramos Delgado",
    "patientPhone": "+51 954 332 190",
    "practitionerId": "pro_carlos",
    "practitioner": "Dr. Carlos Mendoza Ramos",
    "chairId": "chair_3",
    "chair": "Sillón 3 (Cirugía)",
    "specialty": "Implantología & Cirugía",
    "reason": "Evaluación tomográfica 3D para implante pieza 4.6",
    "status": "COMPLETED",
    "notes": "Hueso remanente adecuado para implante de 4.0 x 11.5 mm."
  },
  {
    "id": "apt_101",
    "date": "2026-09-08",
    "startTime": "08:30",
    "time": "08:30 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_maria",
    "patientName": "María Quispe Condori",
    "patientPhone": "+51 954 892 104",
    "practitionerId": "pro_ana",
    "practitioner": "Dra. Ana Flores Vanesa",
    "chairId": "chair_1",
    "chair": "Sillón 1 (Ortodoncia)",
    "specialty": "Ortodoncia",
    "reason": "Control mensual de ortodoncia e instalación de arcos",
    "status": "CONFIRMED",
    "notes": "Confirmado por WhatsApp institucional ayer 18:30."
  },
  {
    "id": "apt_102",
    "date": "2026-09-08",
    "startTime": "09:30",
    "time": "09:30 AM",
    "durationMinutes": 60,
    "duration": "60 min",
    "patientId": "pat_carlos",
    "patientName": "Carlos Ramos Delgado",
    "patientPhone": "+51 954 332 190",
    "practitionerId": "pro_carlos",
    "practitioner": "Dr. Carlos Mendoza Ramos",
    "chairId": "chair_2",
    "chair": "Sillón 2 (Cirugía/Rehab)",
    "specialty": "Implantología",
    "reason": "Fase quirúrgica 1: Colocación de implante pieza 4.6",
    "status": "IN_CHAIR",
    "notes": "Paciente en sillón con anestesia local administrada."
  },
  {
    "id": "apt_103",
    "date": "2026-09-08",
    "startTime": "10:00",
    "time": "10:00 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_ana",
    "patientName": "Ana Beltrán Valdivia",
    "patientPhone": "+51 954 771 204",
    "practitionerId": "pro_sofia",
    "practitioner": "Dra. Sofía Gutiérrez Medina",
    "chairId": "chair_3",
    "chair": "Sillón 3 (Pediatría/Integral)",
    "specialty": "Odontopediatría",
    "reason": "Aplicación de flúor barniz y sellantes en primeras molares",
    "status": "IN_WAITING_ROOM",
    "notes": "Paciente en sala de espera acompañada de su madre."
  },
  {
    "id": "apt_104",
    "date": "2026-09-08",
    "startTime": "11:15",
    "time": "11:15 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_jorge",
    "patientName": "Jorge Medina Paz",
    "patientPhone": "+51 954 621 883",
    "practitionerId": "pro_ana",
    "practitioner": "Dra. Ana Flores Vanesa",
    "chairId": "chair_1",
    "chair": "Sillón 1 (Ortodoncia)",
    "specialty": "Ortodoncia & Alineadores",
    "reason": "Escaneo intraoral iTero 5D para alineadores invisibles",
    "status": "SCHEDULED",
    "notes": "Pendiente confirmación final de asistencia."
  },
  {
    "id": "apt_105",
    "date": "2026-09-08",
    "startTime": "03:00",
    "time": "03:00 PM",
    "durationMinutes": 60,
    "duration": "60 min",
    "patientId": "pat_elena",
    "patientName": "Elena Cáceres Zúñiga",
    "patientPhone": "+51 954 990 125",
    "practitionerId": "pro_diego",
    "practitioner": "Dr. Diego Torres Vizcarra",
    "chairId": "chair_2",
    "chair": "Sillón 2 (Cirugía/Rehab)",
    "specialty": "Rehabilitación Oral",
    "reason": "Prueba de estructura en zirconio monolítico CAD/CAM",
    "status": "CONFIRMED",
    "notes": "Laboratorio envió corona lista para ajuste oclusal."
  },
  {
    "id": "apt_106",
    "date": "2026-09-08",
    "startTime": "04:30",
    "time": "04:30 PM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_lucas",
    "patientName": "Lucas Farfán Benítez",
    "patientPhone": "+51 954 238 911",
    "practitionerId": "pro_lucia",
    "practitioner": "Dra. Lucía Paredes Soto",
    "chairId": "chair_3",
    "chair": "Sillón 3 (Pediatría/Integral)",
    "specialty": "Endodoncia",
    "reason": "Urgencia por dolor agudo en pieza 2.4",
    "status": "SCHEDULED",
    "notes": "Agendado por WhatsApp a las 11:00 AM."
  },
  {
    "id": "apt_107",
    "date": "2026-09-09",
    "startTime": "09:00",
    "time": "09:00 AM",
    "durationMinutes": 60,
    "duration": "60 min",
    "patientId": "pat_maria",
    "patientName": "María Quispe Condori",
    "patientPhone": "+51 954 892 104",
    "practitionerId": "pro_ana",
    "practitioner": "Dra. Ana Flores Vanesa",
    "chairId": "chair_1",
    "chair": "Sillón 1 (Ortodoncia)",
    "specialty": "Ortodoncia",
    "reason": "Entrega de alineadores set 05-08 y educación de higiene",
    "status": "CONFIRMED",
    "notes": "Set de placas termoformadas listo en clínica."
  },
  {
    "id": "apt_108",
    "date": "2026-09-09",
    "startTime": "10:30",
    "time": "10:30 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_rodrigo",
    "patientName": "Rodrigo Morales Pinto",
    "patientPhone": "+51 954 411 762",
    "practitionerId": "pro_jorge",
    "practitioner": "Dr. Jorge Benavides Zúñiga",
    "chairId": "chair_2",
    "chair": "Sillón 2 (Cirugía/Rehab)",
    "specialty": "Periodoncia",
    "reason": "Mantenimiento periodontal por cuadrantes con ultrasonido",
    "status": "SCHEDULED",
    "notes": "Requiere anestesia tópica reforzada."
  },
  {
    "id": "apt_109",
    "date": "2026-09-11",
    "startTime": "11:00",
    "time": "11:00 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_carlos",
    "patientName": "Carlos Ramos Delgado",
    "patientPhone": "+51 954 332 190",
    "practitionerId": "pro_carlos",
    "practitioner": "Dr. Carlos Mendoza Ramos",
    "chairId": "chair_3",
    "chair": "Sillón 3 (Pediatría/Integral)",
    "specialty": "Implantología",
    "reason": "Control post-operatorio y retiro de puntos de sutura",
    "status": "SCHEDULED",
    "notes": "7 días post-quirúrgico."
  }
],
  appointmentsToday: [
  {
    "id": "apt_101",
    "date": "2026-09-08",
    "startTime": "08:30",
    "time": "08:30 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_maria",
    "patientName": "María Quispe Condori",
    "patientPhone": "+51 954 892 104",
    "practitionerId": "pro_ana",
    "practitioner": "Dra. Ana Flores Vanesa",
    "chairId": "chair_1",
    "chair": "Sillón 1 (Ortodoncia)",
    "specialty": "Ortodoncia",
    "reason": "Control mensual de ortodoncia e instalación de arcos",
    "status": "CONFIRMED",
    "notes": "Confirmado por WhatsApp institucional ayer 18:30."
  },
  {
    "id": "apt_102",
    "date": "2026-09-08",
    "startTime": "09:30",
    "time": "09:30 AM",
    "durationMinutes": 60,
    "duration": "60 min",
    "patientId": "pat_carlos",
    "patientName": "Carlos Ramos Delgado",
    "patientPhone": "+51 954 332 190",
    "practitionerId": "pro_carlos",
    "practitioner": "Dr. Carlos Mendoza Ramos",
    "chairId": "chair_2",
    "chair": "Sillón 2 (Cirugía/Rehab)",
    "specialty": "Implantología",
    "reason": "Fase quirúrgica 1: Colocación de implante pieza 4.6",
    "status": "IN_CHAIR",
    "notes": "Paciente en sillón con anestesia local administrada."
  },
  {
    "id": "apt_103",
    "date": "2026-09-08",
    "startTime": "10:00",
    "time": "10:00 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_ana",
    "patientName": "Ana Beltrán Valdivia",
    "patientPhone": "+51 954 771 204",
    "practitionerId": "pro_sofia",
    "practitioner": "Dra. Sofía Gutiérrez Medina",
    "chairId": "chair_3",
    "chair": "Sillón 3 (Pediatría/Integral)",
    "specialty": "Odontopediatría",
    "reason": "Aplicación de flúor barniz y sellantes en primeras molares",
    "status": "IN_WAITING_ROOM",
    "notes": "Paciente en sala de espera acompañada de su madre."
  },
  {
    "id": "apt_104",
    "date": "2026-09-08",
    "startTime": "11:15",
    "time": "11:15 AM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_jorge",
    "patientName": "Jorge Medina Paz",
    "patientPhone": "+51 954 621 883",
    "practitionerId": "pro_ana",
    "practitioner": "Dra. Ana Flores Vanesa",
    "chairId": "chair_1",
    "chair": "Sillón 1 (Ortodoncia)",
    "specialty": "Ortodoncia & Alineadores",
    "reason": "Escaneo intraoral iTero 5D para alineadores invisibles",
    "status": "SCHEDULED",
    "notes": "Pendiente confirmación final de asistencia."
  },
  {
    "id": "apt_105",
    "date": "2026-09-08",
    "startTime": "03:00",
    "time": "03:00 PM",
    "durationMinutes": 60,
    "duration": "60 min",
    "patientId": "pat_elena",
    "patientName": "Elena Cáceres Zúñiga",
    "patientPhone": "+51 954 990 125",
    "practitionerId": "pro_diego",
    "practitioner": "Dr. Diego Torres Vizcarra",
    "chairId": "chair_2",
    "chair": "Sillón 2 (Cirugía/Rehab)",
    "specialty": "Rehabilitación Oral",
    "reason": "Prueba de estructura en zirconio monolítico CAD/CAM",
    "status": "CONFIRMED",
    "notes": "Laboratorio envió corona lista para ajuste oclusal."
  },
  {
    "id": "apt_106",
    "date": "2026-09-08",
    "startTime": "04:30",
    "time": "04:30 PM",
    "durationMinutes": 45,
    "duration": "45 min",
    "patientId": "pat_lucas",
    "patientName": "Lucas Farfán Benítez",
    "patientPhone": "+51 954 238 911",
    "practitionerId": "pro_lucia",
    "practitioner": "Dra. Lucía Paredes Soto",
    "chairId": "chair_3",
    "chair": "Sillón 3 (Pediatría/Integral)",
    "specialty": "Endodoncia",
    "reason": "Urgencia por dolor agudo en pieza 2.4",
    "status": "SCHEDULED",
    "notes": "Agendado por WhatsApp a las 11:00 AM."
  }
],
  practitioners: [
    { id: "pro_ana", name: "Dra. Ana Flores Vanesa", specialty: "Ortodoncia & Ortopedia", cmp: "COP 18240", rating: 4.9, bio: "Especialista en ortodoncia estética y alineadores invisibles con 10 años de práctica clínica.", photo: "../assets/images/public/team/profesional-dental-referencia-37458046.jpg" },
    { id: "pro_carlos", name: "Dr. Carlos Mendoza Ramos", specialty: "Implantología & Cirugía", cmp: "COP 15420", rating: 4.8, bio: "Cirujano maxilofacial experto en implantes guiados por computador y regeneración ósea.", photo: "../assets/images/public/team/equipo-dental-clinica-37458124.jpg" },
    { id: "pro_lucia", name: "Dra. Lucía Paredes Soto", specialty: "Endodoncia Microscópica", cmp: "COP 21090", rating: 4.9, bio: "Máster en micro-endodoncia y preservación del órgano dentino-pulpar.", photo: "../assets/images/public/team/profesional-dental-referencia-37458046.jpg" },
    { id: "pro_diego", name: "Dr. Diego Torres Vizcarra", specialty: "Rehabilitación Oral & CAD/CAM", cmp: "COP 19530", rating: 4.7, bio: "Especialista en coronas de circonio, carillas estéticas y reconstrucción oclusal.", photo: "../assets/images/public/team/equipo-dental-clinica-37458124.jpg" },
    { id: "pro_sofia", name: "Dra. Sofía Gutiérrez Medina", specialty: "Odontopediatría", cmp: "COP 22100", rating: 5.0, bio: "Enfocada en prevención dental infantil y adaptación con manejo del comportamiento.", photo: "../assets/images/public/team/profesional-dental-referencia-37458046.jpg" },
    { id: "pro_jorge", name: "Dr. Jorge Benavides Zúñiga", specialty: "Periodoncia & Cirugía Plástica", cmp: "COP 16890", rating: 4.8, bio: "Especialista en tratamiento de encías, injertos periodontales y sonrisas gingivales.", photo: "../assets/images/public/team/equipo-dental-clinica-37458124.jpg" },
    { id: "pro_elena", name: "Dra. Elena Alarcón Cruz", specialty: "Estética Dental & DSD", cmp: "COP 20450", rating: 4.9, bio: "Experta en diseño digital de sonrisa y aclaramiento clínico sin dolor.", photo: "../assets/images/public/team/profesional-dental-referencia-37458046.jpg" },
    { id: "pro_roberto", name: "Dr. Roberto Salas Delgado", specialty: "Radiología Maxilofacial", cmp: "COP 14980", rating: 4.9, bio: "Especialista en diagnóstico por imágenes 3D y tomografía computarizada CBCT.", photo: "../assets/images/public/team/equipo-dental-clinica-37458124.jpg" }
  ],
  odontogram: {
    patientId: "pat_maria",
    lastUpdated: "2026-07-20",
    signedBy: "Dra. Ana Flores (COP 18240)",
    teeth: [
      { number: 18, status: "ABSENT", surface: "Total", note: "Tercera molar no erupcionada" },
      { number: 16, status: "RESTORED", surface: "Oclusal", treatment: "Resina compuesta realizada en 2025" },
      { number: 21, status: "CARIES_DRAFT", surface: "Mesial", finding: "Caries incipiente esmalte", treatmentProposed: "Carilla / Resina" },
      { number: 36, status: "ENDODONTIC", surface: "Conducto", treatment: "Tratamiento de conducto completado" },
      { number: 46, status: "IMPLANT_PLANNED", surface: "Raíz/Corona", finding: "Ausencia dental previa", treatmentProposed: "Implante de titanio + corona" }
    ]
  },
  documents: [
  {
    "id": "doc_rad_pan",
    "title": "Informe Radiológico Panorámico OPG (Centro CERAD)",
    "category": "RADIOLOGIA_PDF",
    "date": "2026-07-10",
    "time": "09:30 AM",
    "author": "Dr. Roberto Salas Delgado",
    "authorCmp": "COP 14980 · RNE 0812",
    "entity": "CERAD Arequipa — Diagnóstico Maxilofacial 3D",
    "pages": 2,
    "size": "3.2 MB",
    "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "status": "VALIDATED_PUBLISHED",
    "hasRadiograph": true,
    "studyId": "rad_01",
    "radiographUrl": "../assets/images/reference/dental/panoramic-xray-public-domain.jpg",
    "summary": "Informe radiográfico panorámico de ambas arcadas dentarias con imagen radiológica de alta resolución incrustada. Diagnóstico de caries en pieza 21 y evaluación de lecho alveolar para implante en pieza 46.",
    "notes": "Documento emitido por centro externo CERAD en formato PDF. Permite extracción directa a la mesa de trabajo PACS."
  },
  {
    "id": "doc_odonto_nts",
    "title": "Ficha Odontoestomatológica Oficial NTS 188-MINSA",
    "category": "ODONTOGRAMA_PDF",
    "date": "2026-07-20",
    "time": "10:45 AM",
    "author": "Dra. Ana Flores Vanesa",
    "authorCmp": "COP 18240",
    "entity": "Sillar Dental Especialidades (Sede Yanahuara)",
    "pages": 1,
    "size": "840 KB",
    "sha256": "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    "status": "INMUTABLE_SIGNED",
    "hasRadiograph": false,
    "summary": "Registro gráfico normativo de 52 piezas dentales en notación FDI con tabla de hallazgos codificada bajo la Norma Técnica de Salud NTS N.º 188-MINSA/DGIESP-2022.",
    "notes": "Documento legal inalterable apto para auditorías de SUSALUD y aseguradoras EPS."
  },
  {
    "id": "doc_consent_imp",
    "title": "Consentimiento Informado para Implante Dental & Cirugía (#46)",
    "category": "CONSENTIMIENTO_PDF",
    "date": "2026-07-25",
    "time": "03:00 PM",
    "author": "Dr. Carlos Mendoza Ramos",
    "authorCmp": "COP 15420 · Cirugía Oral & Maxilofacial",
    "entity": "Sillar Dental Especialidades",
    "pages": 3,
    "size": "1.1 MB",
    "sha256": "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
    "status": "SIGNED_PATIENT",
    "hasRadiograph": false,
    "summary": "Consentimiento legal informado conforme a la Ley General de Salud N.º 26842. Detalla beneficios, riesgos, alternativas y cuidados postoperatorios para la colocación de implante osteointegrado en lecho #46.",
    "notes": "Firmado digitalmente con evidencia biométrica por la paciente María Quispe Condori."
  },
  {
    "id": "doc_receta_01",
    "title": "Receta Médica Electrónica — Terapia Antibiótica & Analgésica",
    "category": "RECETA_PDF",
    "date": "2026-09-08",
    "time": "11:30 AM",
    "author": "Dra. Ana Flores Vanesa",
    "authorCmp": "COP 18240",
    "entity": "Sillar Dental Especialidades",
    "pages": 1,
    "size": "320 KB",
    "sha256": "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
    "status": "ACTIVE",
    "hasRadiograph": false,
    "summary": "Prescripción de Amoxicilina 500mg (1 tableta cada 8 horas x 6 días) e Ibuprofeno 400mg (1 tableta cada 8 horas condicional al dolor), con código QR de verificación para farmacia.",
    "notes": "Código QR trazable: QR-REC-2026-0908-45892104."
  },
  {
    "id": "doc_receta_fisica_scan",
    "title": "Receta Médica Sellada y Firmada en Físico (Digitalización Móvil)",
    "category": "RECETA_FISICA_SCAN",
    "date": "2026-09-08",
    "time": "11:45 AM",
    "author": "Dra. Ana Flores Vanesa",
    "authorCmp": "COP 18240",
    "entity": "Sillar Dental Especialidades",
    "pages": 1,
    "size": "1.4 MB",
    "sha256": "c83b90a8849b2ef3223ea4b9762db10f9942a42095f9c15d482023a8868df419",
    "status": "PHYSICAL_SIGNED_DIGITIZED",
    "hasRadiograph": false,
    "hasScannedPhysical": true,
    "scannedBy": "Dra. Ana Flores (Cámara Móvil Consultorio 1)",
    "qrRefCode": "QR-SCAN-RX-45892104-01",
    "summary": "Receta física original con sello y firma manuscrita de la odontóloga, impresa desde el sistema, firmada con bolígrafo y fotografiada/digitalizada desde el teléfono celular del consultorio conforme a NTS N.º 139-MINSA.",
    "notes": "Soporte físico original archivado en carpeta física Yanahuara. Registro de digitalización verificado con sello criptográfico."
  },
  {
    "id": "doc_perio_exam",
    "title": "Ficha de Sondaje Periodontal (6 Sitios - AAP/EFP 2018)",
    "category": "PERIODONCIA_PDF",
    "date": "2026-09-08",
    "time": "12:15 PM",
    "author": "Dr. Jorge Benavides Zúñiga",
    "authorCmp": "COP 16890 · Periodoncia",
    "entity": "Sillar Dental Especialidades",
    "pages": 2,
    "size": "920 KB",
    "sha256": "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
    "status": "VALIDATED",
    "hasRadiograph": false,
    "summary": "Ficha clínica con matriz milimétrica en 6 sitios por pieza dental, profundidad de bolsa (PS), margen gingival (MG), cálculo de CAL e índice de sangrado al sondaje (BOP: 18.5%).",
    "notes": "Diagnóstico: Periodontitis Estadio II, Grado B."
  },
  {
    "id": "doc_presupuesto",
    "title": "Presupuesto & Acuerdo Económico de Tratamiento Multietapa",
    "category": "PRESUPUESTO_PDF",
    "date": "2026-07-20",
    "time": "11:00 AM",
    "author": "Administración / Dra. Ana Flores",
    "authorCmp": "COP 18240",
    "entity": "Sillar Dental Especialidades",
    "pages": 2,
    "size": "540 KB",
    "sha256": "8a72b22e1b8b8d0032e3a6c5332f170c406856012759e9ec47e70ec4a87c0827",
    "status": "ACCEPTED",
    "hasRadiograph": false,
    "summary": "Acuerdo de tratamiento de 4 fases (Periodontal, Restauradora, Ortodóntica e Implante) por un monto total de S/ 3,850.00 con cronograma de pagos fraccionado en 6 cuotas.",
    "notes": "Aceptado y firmado por María Quispe Condori."
  }
],
  payments: [
    { id: "pay_01", concept: "Cuota 01/06 — Ortodoncia e Instalación", amount: 600.00, dueDate: "2026-06-15", status: "PAID", paidDate: "2026-06-14", receiptNumber: "B001-000452", method: "Yape" },
    { id: "pay_02", concept: "Cuota 02/06 — Control Mensual Ortodoncia", amount: 350.00, dueDate: "2026-07-15", status: "PAID", paidDate: "2026-07-12", receiptNumber: "B001-000510", method: "POS Niubiz" },
    { id: "pay_03", concept: "Cuota 03/06 — Control Mensual Ortodoncia", amount: 350.00, dueDate: "2026-08-15", status: "PENDING", paidDate: null, receiptNumber: null, method: null }
  ],
  cashRegister: {
    openingBalance: 500.00,
    totalIncomeToday: 1850.00,
    totalExpenseToday: 120.00,
    currentCash: 2230.00,
    transactions: [
      { id: "tx_01", time: "09:30 AM", concept: "Cobro Boleta B001-000510", patient: "María Quispe Condori", amount: 350.00, method: "POS Niubiz", type: "INCOME" },
      { id: "tx_02", time: "10:45 AM", concept: "Adelanto Implante Fase 1", patient: "Carlos Ramos Delgado", amount: 1500.00, method: "Transferencia BCP", type: "INCOME" },
      { id: "tx_03", time: "12:15 PM", concept: "Compra Insumos Urgentes (Farmacia)", patient: "-", amount: -120.00, method: "Efectivo", type: "EXPENSE" }
    ]
  },
  inventory: [
    { id: "inv_01", code: "RES-3M-A2", name: "Resina Filtek Z350 XT A2 (3M)", category: "Restauración", stock: 18, minStock: 5, unit: "Jeringa 4g", status: "OPTIMAL" },
    { id: "inv_02", code: "LID-20-EPI", name: "Lidocaína 2% con Epinefrina (Zeyco)", category: "Anestesia", stock: 4, minStock: 10, unit: "Caja x 50 cárpules", status: "LOW_STOCK" },
    { id: "inv_03", code: "BRK-ROTH-22", name: "Kit Brackets Metálicos Roth 0.022", category: "Ortodoncia", stock: 12, minStock: 6, unit: "Kit caso completo", status: "OPTIMAL" },
    { id: "inv_04", code: "IMP-NEO-375", name: "Implante Neodent Helix GM 3.75x10", category: "Implantología", stock: 2, minStock: 4, unit: "Unidad estéril", status: "CRITICAL" },
    { id: "inv_05", code: "GUA-NIT-M", name: "Guantes de Nitrilo Azul Talla M", category: "Bioseguridad", stock: 25, minStock: 8, unit: "Caja x 100", status: "OPTIMAL" }
  ],
  auditEvents: [
    { id: "aud_01", timestamp: "2026-07-20 14:30", actor: "Dra. Ana Flores", action: "FIRMA_ODONTOGRAMA", detail: "Firma digital de estado clínico en borrador para María Quispe" },
    { id: "aud_02", timestamp: "2026-07-12 11:15", actor: "Recepción (Laura V.)", action: "REGISTRO_PAGO", detail: "Cobro B001-000510 por S/ 350.00 vía POS Niubiz" },
    { id: "aud_03", timestamp: "2026-07-10 09:00", actor: "Dr. Roberto Salas", action: "CARGA_RADIOGRAFIA", detail: "Subida de CBCT Panorámica Digital (doc_rad_01)" }
  ]
,
  periodontalExam: {
  "patientId": "pat_maria",
  "examDate": "2026-09-08",
  "practitioner": "Dr. Jorge Benavides Zúñiga (COP 16890)",
  "specialty": "Periodoncia & Cirugía Plástica Gingival",
  "summary": {
    "bopPercent": 18.5,
    "plaquePercent": 24.2,
    "deepPocketsCount": 6,
    "severePocketsCount": 2,
    "aapStage": "Estadio II (Periodontitis Moderada)",
    "aapGrade": "Grado B (Tasa de progresión moderada)",
    "riskClassification": "Riesgo Periodontal Moderado (PRA)",
    "notes": "Pérdida de soporte en piezas 16, 26 y 36 con bolsas periodontales activas de hasta 6 mm. Se indica fase 1 de RAR (Raspado y Alisado Radicular) por cuadrantes bajo anestesia local."
  },
  "teeth": {
    "11": {
      "tooth": 11,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          3
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          3
        ],
        "bop": [
          false,
          false,
          true
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          true
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          3
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          3
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "12": {
      "tooth": 12,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "13": {
      "tooth": 13,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "14": {
      "tooth": 14,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "15": {
      "tooth": 15,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "16": {
      "tooth": 16,
      "mobility": 1,
      "furcation": 1,
      "vestibular": {
        "pd": [
          5,
          3,
          4
        ],
        "gm": [
          1,
          1,
          0
        ],
        "cal": [
          6,
          4,
          4
        ],
        "bop": [
          true,
          false,
          true
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          true,
          false,
          true
        ]
      },
      "lingual": {
        "pd": [
          6,
          4,
          4
        ],
        "gm": [
          2,
          1,
          1
        ],
        "cal": [
          8,
          5,
          5
        ],
        "bop": [
          true,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "17": {
      "tooth": 17,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "18": {
      "tooth": 18,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          0,
          0,
          0
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          0,
          0,
          0
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          0,
          0,
          0
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          0,
          0,
          0
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "21": {
      "tooth": 21,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          3
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          3
        ],
        "bop": [
          false,
          false,
          true
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          true
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          3
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          3
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "22": {
      "tooth": 22,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "23": {
      "tooth": 23,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "24": {
      "tooth": 24,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "25": {
      "tooth": 25,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "26": {
      "tooth": 26,
      "mobility": 0,
      "furcation": 1,
      "vestibular": {
        "pd": [
          4,
          3,
          5
        ],
        "gm": [
          1,
          0,
          1
        ],
        "cal": [
          5,
          3,
          6
        ],
        "bop": [
          true,
          false,
          true
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          4,
          3,
          5
        ],
        "gm": [
          1,
          0,
          1
        ],
        "cal": [
          5,
          3,
          6
        ],
        "bop": [
          false,
          false,
          true
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          true,
          false,
          true
        ]
      }
    },
    "27": {
      "tooth": 27,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "28": {
      "tooth": 28,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "31": {
      "tooth": 31,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          3,
          3,
          3
        ],
        "gm": [
          1,
          1,
          1
        ],
        "cal": [
          4,
          4,
          4
        ],
        "bop": [
          true,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          true,
          true,
          false
        ]
      },
      "lingual": {
        "pd": [
          3,
          2,
          3
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          3,
          2,
          3
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "32": {
      "tooth": 32,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "33": {
      "tooth": 33,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "34": {
      "tooth": 34,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "35": {
      "tooth": 35,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "36": {
      "tooth": 36,
      "mobility": 1,
      "furcation": 2,
      "vestibular": {
        "pd": [
          6,
          4,
          5
        ],
        "gm": [
          2,
          1,
          1
        ],
        "cal": [
          8,
          5,
          6
        ],
        "bop": [
          true,
          true,
          true
        ],
        "sup": [
          true,
          false,
          false
        ],
        "plaque": [
          true,
          true,
          true
        ]
      },
      "lingual": {
        "pd": [
          5,
          3,
          4
        ],
        "gm": [
          1,
          0,
          1
        ],
        "cal": [
          6,
          3,
          5
        ],
        "bop": [
          true,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "37": {
      "tooth": 37,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "38": {
      "tooth": 38,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "41": {
      "tooth": 41,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          3,
          3,
          3
        ],
        "gm": [
          1,
          1,
          1
        ],
        "cal": [
          4,
          4,
          4
        ],
        "bop": [
          true,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          true,
          true,
          false
        ]
      },
      "lingual": {
        "pd": [
          3,
          2,
          3
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          3,
          2,
          3
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "42": {
      "tooth": 42,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "43": {
      "tooth": 43,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "44": {
      "tooth": 44,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "45": {
      "tooth": 45,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "46": {
      "tooth": 46,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          0,
          0,
          0
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          0,
          0,
          0
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          0,
          0,
          0
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          0,
          0,
          0
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "47": {
      "tooth": 47,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          2,
          2,
          2
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          2,
          2,
          2
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    },
    "48": {
      "tooth": 48,
      "mobility": 0,
      "furcation": 0,
      "vestibular": {
        "pd": [
          0,
          0,
          0
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          0,
          0,
          0
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      },
      "lingual": {
        "pd": [
          0,
          0,
          0
        ],
        "gm": [
          0,
          0,
          0
        ],
        "cal": [
          0,
          0,
          0
        ],
        "bop": [
          false,
          false,
          false
        ],
        "sup": [
          false,
          false,
          false
        ],
        "plaque": [
          false,
          false,
          false
        ]
      }
    }
  }
},
  treatmentPlan: {
  "patientId": "pat_maria",
  "planName": "Plan Integral Ortodoncia & Rehabilitación NTS-188",
  "version": 2,
  "status": "IN_PROGRESS",
  "totalCost": 3850,
  "balanceDue": 1400,
  "phases": [
    {
      "id": "phase_1",
      "name": "Fase 1: Terapia Básica Periodontal & Higiene",
      "status": "COMPLETED",
      "items": [
        {
          "id": "tx_p1_01",
          "tooth": "Boca completa",
          "procedure": "Profilaxis Ultrasónica & Detartraje",
          "fee": 150,
          "status": "COMPLETED",
          "executedDate": "2026-07-10",
          "doctor": "Dr. Jorge Benavides (COP 16890)"
        },
        {
          "id": "tx_p1_02",
          "tooth": "Cuadrante 1 y 3",
          "procedure": "Raspado y Alisado Radicular (RAR)",
          "fee": 300,
          "status": "COMPLETED",
          "executedDate": "2026-07-15",
          "doctor": "Dr. Jorge Benavides (COP 16890)"
        }
      ]
    },
    {
      "id": "phase_2",
      "name": "Fase 2: Operatoria & Endodoncia Restauradora",
      "status": "IN_PROGRESS",
      "items": [
        {
          "id": "tx_p2_01",
          "tooth": 16,
          "procedure": "Restauración Resina Fotocurable Estética (Cara Oclusal)",
          "fee": 180,
          "status": "COMPLETED",
          "executedDate": "2025-11-20",
          "doctor": "Dra. Ana Flores (COP 18240)"
        },
        {
          "id": "tx_p2_02",
          "tooth": 36,
          "procedure": "Endodoncia Multirradicular + Sellado Termoplástico",
          "fee": 450,
          "status": "COMPLETED",
          "executedDate": "2026-06-05",
          "doctor": "Dra. Lucía Paredes (COP 21090)"
        },
        {
          "id": "tx_p2_03",
          "tooth": 21,
          "procedure": "Restauración Estética con Resina Directa Nanoparticulada",
          "fee": 220,
          "status": "PENDING",
          "executedDate": null,
          "doctor": "Dra. Ana Flores (COP 18240)",
          "actionKey": "EXECUTE_RESIN_21"
        }
      ]
    },
    {
      "id": "phase_3",
      "name": "Fase 3: Ortodoncia Activa & Alineación",
      "status": "IN_PROGRESS",
      "items": [
        {
          "id": "tx_p3_01",
          "tooth": "Ambas Arcadas",
          "procedure": "Tratamiento con Alineadores Invisibles (Set 1-12)",
          "fee": 2100,
          "status": "IN_PROGRESS",
          "executedDate": "2026-07-28",
          "doctor": "Dra. Ana Flores (COP 18240)"
        }
      ]
    },
    {
      "id": "phase_4",
      "name": "Fase 4: Implantología & Rehabilitación Final",
      "status": "SCHEDULED",
      "items": [
        {
          "id": "tx_p4_01",
          "tooth": 46,
          "procedure": "Colocación de Implante de Titanio Neodent Helix GM",
          "fee": 1500,
          "status": "PENDING",
          "executedDate": null,
          "doctor": "Dr. Carlos Mendoza (COP 15420)"
        }
      ]
    }
  ]
},
  odontogramEvolution: {
  "patientId": "pat_maria",
  "lastUpdated": "2026-09-08",
  "activePhase": "Fase 2 de 4",
  "evolutionTeeth": [
    {
      "number": 18,
      "status": "ABSENT",
      "surface": "Total",
      "note": "Ausente confirmado",
      "stage": "INICIAL"
    },
    {
      "number": 16,
      "status": "RESTORED",
      "surface": "Oclusal",
      "treatment": "Restauración Resina Oclusal",
      "executedDate": "2025-11-20",
      "stage": "EVOLUCION"
    },
    {
      "number": 21,
      "status": "CARIES_DRAFT",
      "surface": "Mesial",
      "finding": "Caries incipiente mesial",
      "treatmentProposed": "Resina compuesta",
      "stage": "PENDIENTE"
    },
    {
      "number": 36,
      "status": "ENDODONTIC",
      "surface": "Conducto",
      "treatment": "Endodoncia multirradicular completada",
      "executedDate": "2026-06-05",
      "stage": "EVOLUCION"
    },
    {
      "number": 46,
      "status": "IMPLANT_PLANNED",
      "surface": "Raíz",
      "finding": "Planificado para Fase 4",
      "treatmentProposed": "Implante Titanio",
      "stage": "PLANIFICADO"
    }
  ]
}
,
  imagingStudies: [
  {
    "id": "rad_01",
    "patientId": "pat_maria",
    "title": "Ortopantomografía Panorámica Digital (OPG)",
    "modality": "DX (Digital Radiography)",
    "category": "PANORAMICA",
    "studyDate": "2026-07-10",
    "time": "09:30 AM",
    "equipment": "Carestream CS 8100 3D Extraoral",
    "stationName": "Sede Yanahuara · Quirófano Radiológico",
    "radiologist": "Dr. Roberto Salas Delgado",
    "radiologistCmp": "COP 14980 · RNE 0812",
    "requestedBy": "Dra. Ana Flores Vanesa (COP 18240)",
    "technicalParams": {
      "kvp": 73,
      "ma": 10,
      "exposureTimeSec": 12.5,
      "dapDose": "88 mGy·cm²",
      "pixelSpacingMm": 0.05,
      "imageResolution": "2400 x 1200 px"
    },
    "imageUrl": "../assets/images/reference/dental/panoramic-xray-public-domain.jpg",
    "status": "VALIDATED_PUBLISHED",
    "findingsSummary": "Arcadas dentarias completas en adulto con ausencia quirúrgica de terceras molares 18 y 48. Restauración oclusal radiopaca en pieza 16. Área radiolúcida proximal en cara mesial de pieza 21 compatible con caries en esmalte/dentina sin compromiso del conducto pulpar. Pieza 36 con obturación endodóntica densa hasta tercio apical. Pieza 46 con reborde alveolar cicatrizado y altura ósea residual de 11.4 mm respecto al canal mandibular.",
    "annotations": [
      {
        "id": "ann_01",
        "type": "MEASUREMENT",
        "label": "Altura Ósea Pieza 46 al Canal",
        "valueMm": 11.4,
        "x1": 72,
        "y1": 65,
        "x2": 72,
        "y2": 78
      },
      {
        "id": "ann_02",
        "type": "MARKER",
        "label": "Caries Mesial #21",
        "x": 52,
        "y": 38
      }
    ]
  },
  {
    "id": "rad_02",
    "patientId": "pat_maria",
    "title": "Radiografía Periapical Digital — Pieza #21 (Incisivo Central)",
    "modality": "IO (Intraoral Radiography)",
    "category": "PERIAPICAL",
    "studyDate": "2026-07-15",
    "time": "10:15 AM",
    "equipment": "Sensor Digital Intraoral Carestream RVG 6200",
    "stationName": "Sillón 1 (Ortodoncia)",
    "radiologist": "Dr. Roberto Salas Delgado",
    "radiologistCmp": "COP 14980 · RNE 0812",
    "requestedBy": "Dra. Ana Flores Vanesa (COP 18240)",
    "technicalParams": {
      "kvp": 65,
      "ma": 7,
      "exposureTimeSec": 0.18,
      "dapDose": "14 mGy·cm²",
      "pixelSpacingMm": 0.019,
      "imageResolution": "1600 x 1200 px"
    },
    "imageUrl": "../assets/images/reference/dental/panoramic-xray-public-domain.jpg",
    "status": "VALIDATED_PUBLISHED",
    "findingsSummary": "Pieza 21: Corona íntegra excepto lesión radiolúcida mesial circunscrita a esmalte y tercio externo de dentina. Cámara pulpar amplia, conducto radicular único permeable. Ápice radicular completamente formado con lámina dura intacta, sin ensanchamiento del ligamento periodontal ni radiolucidez periapical.",
    "annotations": [
      {
        "id": "ann_03",
        "type": "MEASUREMENT",
        "label": "Conductometría Estimada",
        "valueMm": 21.8,
        "x1": 50,
        "y1": 20,
        "x2": 50,
        "y2": 80
      }
    ]
  },
  {
    "id": "rad_03",
    "patientId": "pat_maria",
    "title": "Radiografía Periapical Digital — Pieza #36 (Control Endodoncia)",
    "modality": "IO (Intraoral Radiography)",
    "category": "PERIAPICAL",
    "studyDate": "2026-06-05",
    "time": "11:40 AM",
    "equipment": "Sensor Digital Intraoral Carestream RVG 6200",
    "stationName": "Sillón 2 (Cirugía & Endo)",
    "radiologist": "Dr. Roberto Salas Delgado",
    "radiologistCmp": "COP 14980",
    "requestedBy": "Dra. Lucía Paredes Soto (COP 21090)",
    "technicalParams": {
      "kvp": 65,
      "ma": 7,
      "exposureTimeSec": 0.2,
      "dapDose": "16 mGy·cm²",
      "pixelSpacingMm": 0.019,
      "imageResolution": "1600 x 1200 px"
    },
    "imageUrl": "../assets/images/reference/dental/panoramic-xray-public-domain.jpg",
    "status": "VALIDATED_PUBLISHED",
    "findingsSummary": "Pieza 36: Control post-tratamiento de conductos. Material obturador radiopaco homogéneo y bien condensado en conductos mesiovestibular, mesiolingual y distal, a 0.8 mm del ápice anatómico. Espacio periodontal apical en fase de remodelación normal.",
    "annotations": [
      {
        "id": "ann_04",
        "type": "MEASUREMENT",
        "label": "Distancia al Ápice Distal",
        "valueMm": 0.8,
        "x1": 52,
        "y1": 72,
        "x2": 52,
        "y2": 76
      }
    ]
  },
  {
    "id": "rad_04",
    "patientId": "pat_maria",
    "title": "Tomografía Computarizada Cone Beam 3D (CBCT Mandibular)",
    "modality": "CT (Cone Beam Computed Tomography)",
    "category": "CBCT_3D",
    "studyDate": "2026-07-10",
    "time": "09:45 AM",
    "equipment": "Carestream CS 8100 3D (FOV 8x9 cm)",
    "stationName": "Sede Yanahuara · Unidad Tomográfica 3D",
    "radiologist": "Dr. Roberto Salas Delgado",
    "radiologistCmp": "COP 14980 · RNE 0812",
    "requestedBy": "Dr. Carlos Mendoza Ramos (COP 15420 - Cirugía)",
    "technicalParams": {
      "kvp": 84,
      "ma": 5,
      "exposureTimeSec": 15,
      "dapDose": "320 mGy·cm²",
      "pixelSpacingMm": 0.075,
      "voxelSize": "75 µm",
      "imageResolution": "1920 x 1080 px"
    },
    "imageUrl": "../assets/images/public/technology/evaluacion-dental-digital-5622234.jpg",
    "status": "VALIDATED_PUBLISHED",
    "findingsSummary": "Cortes tomográficos parasagitales en zona edéntula #46. Ancho de cresta ósea vestibular-lingual: 6.8 mm. Altura disponible desde cresta hasta techo del conducto dentario inferior: 11.6 mm. Densidad ósea tipo II según Misch (apta para implante cónico autorroscante de 3.75 x 10 mm con estabilidad primaria prevista > 35 N.cm).",
    "annotations": [
      {
        "id": "ann_05",
        "type": "MEASUREMENT",
        "label": "Ancho de Cresta Ósea",
        "valueMm": 6.8,
        "x1": 40,
        "y1": 50,
        "x2": 60,
        "y2": 50
      },
      {
        "id": "ann_06",
        "type": "MEASUREMENT",
        "label": "Distancia al Techo del Canal Mandibular",
        "valueMm": 11.6,
        "x1": 50,
        "y1": 45,
        "x2": 50,
        "y2": 78
      }
    ]
  }
]
,
  waitlist: [
  {
    "id": "wait_01",
    "patientName": "Gonzalo Vargas Llosa",
    "phone": "+51 954 112 334",
    "preferredSpecialty": "Periodoncia",
    "preferredTime": "Tardes (A partir de 3:00 PM)",
    "urgency": "MODERATE",
    "notes": "Paciente con disponibilidad inmediata si se cancela un turno de periodoncia o limpieza.",
    "registeredAt": "2026-09-07 10:00"
  },
  {
    "id": "wait_02",
    "patientName": "Valeria Cornejo Bedregal",
    "phone": "+51 954 667 889",
    "preferredSpecialty": "Ortodoncia",
    "preferredTime": "Cualquier horario mañana",
    "urgency": "LOW",
    "notes": "Desea adelantar control de brackets programado para la próxima semana.",
    "registeredAt": "2026-09-08 08:30"
  },
  {
    "id": "wait_03",
    "patientName": "Mateo Bustamante Polar",
    "phone": "+51 954 998 221",
    "preferredSpecialty": "Cirugía / Implantes",
    "preferredTime": "Mañanas",
    "urgency": "HIGH",
    "notes": "Urgencia por molestia en tercer molar inferior.",
    "registeredAt": "2026-09-08 09:15"
  }
]
};

