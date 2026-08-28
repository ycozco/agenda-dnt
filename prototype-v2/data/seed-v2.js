/**
 * Seed Dataset de demostración v2 para Sillar Dental Especialidades.
 * Incluye clínica, directorio de pacientes, 8 profesionales colegiados COP,
 * agenda multi-sillón, odontograma FDI de 52 piezas, documentos, caja e inventario.
 */
export const SEED_V2 = {
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
  appointmentsToday: [
    { id: "apt_101", time: "09:00 AM", patientName: "María Quispe Condori", practitioner: "Dra. Ana Flores", chair: "Sillón 1 (Ortodoncia)", specialty: "Ortodoncia", status: "CONFIRMED", duration: "45 min" },
    { id: "apt_102", time: "10:00 AM", patientName: "Carlos Ramos Delgado", practitioner: "Dr. Carlos Mendoza", chair: "Sillón 3 (Cirugía)", specialty: "Implantología", status: "IN_CHAIR", duration: "60 min" },
    { id: "apt_103", time: "11:15 AM", patientName: "Ana Beltrán Valdivia", practitioner: "Dra. Sofía Gutiérrez", chair: "Sillón 2 (Pediatría)", specialty: "Odontopediatría", status: "IN_WAITING_ROOM", duration: "30 min" },
    { id: "apt_104", time: "02:30 PM", patientName: "Jorge Medina Paz", practitioner: "Dra. Lucía Paredes", chair: "Sillón 1 (Endodoncia)", specialty: "Endodoncia", status: "SCHEDULED", duration: "60 min" },
    { id: "apt_105", time: "04:00 PM", patientName: "Elena Cáceres Zuñiga", practitioner: "Dr. Diego Torres", chair: "Sillón 2 (Rehabilitación)", specialty: "Rehabilitación Oral", status: "SCHEDULED", duration: "45 min" }
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
    { id: "doc_inf_01", title: "Informe de Diagnóstico & Plan Clínico", type: "PDF", date: "2026-07-15", author: "Dra. Ana Flores", size: "1.4 MB", previewUrl: "../assets/documents/informe_diagnostico.pdf" },
    { id: "doc_rad_01", title: "Radiografía Panorámica Digital (CBCT)", type: "RADIOGRAFIA", date: "2026-07-10", author: "Dr. Roberto Salas", size: "4.8 MB", previewUrl: "../assets/images/public/technology/evaluacion-dental-digital-5622234.jpg" },
    { id: "doc_rec_01", title: "Receta Médica Demo — Analgésico / Antiinflamatorio", type: "RECETA", date: "2026-07-15", author: "Dra. Ana Flores", size: "420 KB", previewUrl: "../assets/documents/receta_demo.pdf" }
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
};

