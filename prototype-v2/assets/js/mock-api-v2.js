import { SEED_V2 } from '../../data/seed-v2.js';

const STORAGE_KEY = 'sillar_dental_prototype_v2_state';

/**
 * Mock API v2 con soporte para persistencia local en sessionStorage.
 * Mantiene la reactividad y trazabilidad en memoria durante las navegaciones multi-archivo HTML.
 */
class MockApiV2 {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("No se pudo leer sessionStorage, usando SEED_V2 en memoria:", e);
    }
    return JSON.parse(JSON.stringify(SEED_V2));
  }

  saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("No se pudo guardar en sessionStorage:", e);
    }
  }

  getSeed() {
    return JSON.parse(JSON.stringify(this.state));
  }

  getPatient() {
    return this.state.patient;
  }

  getPatients() {
    return this.state.patients || [];
  }

  getPractitioners() {
    if (!this.state.practitioners || this.state.practitioners.length === 0) {
      this.state.practitioners = JSON.parse(JSON.stringify(SEED_V2.practitioners || []));
      this.saveState();
    }
    return this.state.practitioners;
  }

  getPractitionerById(id) {
    return this.getPractitioners().find(p => p.id === id) || null;
  }

  addPractitioner(data) {
    const practitioners = this.getPractitioners();
    const cleanId = "pro_" + (data.name ? data.name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15) : "doc") + "_" + Math.floor(Math.random() * 900 + 100);
    const chairNames = {
      chair_1: "Sillón 1 (Ortodoncia)",
      chair_2: "Sillón 2 (Cirugía/Implantes)",
      chair_3: "Sillón 3 (Pediatría/Integral)"
    };
    const cId = data.chairId || "chair_1";
    const newPro = {
      id: cleanId,
      name: data.name || "Nuevo Profesional",
      specialty: data.specialty || "Odontología General",
      cmp: data.cmp ? (data.cmp.toUpperCase().startsWith('COP') ? data.cmp.toUpperCase() : 'COP ' + data.cmp) : "COP Pendiente",
      rne: data.rne ? (data.rne.toUpperCase().startsWith('RNE') ? data.rne.toUpperCase() : 'RNE ' + data.rne) : null,
      chairId: cId,
      chairName: data.chairName || chairNames[cId] || "Sillón 1 (Ortodoncia)",
      rating: data.rating || 5.0,
      bio: data.bio || "Cirujano Dentista colegiado en el Colegio Odontológico del Perú.",
      photo: data.photo || "../assets/images/public/team/profesional-dental-referencia-37458046.jpg",
      createdAt: new Date().toISOString()
    };
    practitioners.push(newPro);
    this.state.practitioners = practitioners;
    this.logAuditEvent("ALTA_PROFESIONAL", "Alta de profesional colegiado: " + newPro.name + " (" + newPro.cmp + ") asignado a " + newPro.chairName);
    this.saveState();
    return newPro;
  }

  updatePractitioner(id, patch) {
    const practitioners = this.getPractitioners();
    const idx = practitioners.findIndex(p => p.id === id);
    if (idx !== -1) {
      Object.assign(practitioners[idx], patch);
      this.state.practitioners = practitioners;
      this.logAuditEvent("MODIF_PROFESIONAL", "Modificación de expediente profesional: " + practitioners[idx].name);
      this.saveState();
      return practitioners[idx];
    }
    return null;
  }

  deletePractitioner(id) {
    const practitioners = this.getPractitioners();
    const target = practitioners.find(p => p.id === id);
    if (target) {
      this.state.practitioners = practitioners.filter(p => p.id !== id);
      this.logAuditEvent("BAJA_PROFESIONAL", "Baja/desactivación de profesional: " + target.name + " (" + target.cmp + ")");
      this.saveState();
      return true;
    }
    return false;
  }

  getDocuments() {
    return this.state.documents || [];
  }

  getPayments() {
    return this.state.payments || [];
  }

  getOdontogram() {
    return this.state.odontogram;
  }

  // =========================================================================
  // GESTIÓN DE CITAS MULTI-SILLÓN & CALENDARIOS
  // =========================================================================
  getAllAppointments() {
    if (!this.state.appointments || this.state.appointments.length === 0) {
      this.state.appointments = (this.state.appointmentsToday && this.state.appointmentsToday.length > 0)
        ? [...this.state.appointmentsToday]
        : (SEED_V2.appointments || SEED_V2.appointmentsToday || []);
      this.saveState();
    }
    return this.state.appointments;
  }

  getAppointmentsByDate(dateStr) {
    const all = this.getAllAppointments();
    const filtered = all.filter(a => a.date === dateStr);
    if (filtered.length > 0) {
      return filtered;
    }
    // Si la fecha seleccionada no coincide con las del seed, buscar citas disponibles
    const fallback = all.filter(a => a.date === "2026-09-08");
    if (fallback.length > 0) {
      return fallback;
    }
    return all.slice(0, 6);
  }

  getAppointmentsToday() {
    if (this.state.appointmentsToday && this.state.appointmentsToday.length > 0) {
      return this.state.appointmentsToday;
    }
    const all = this.getAllAppointments();
    const filtered = all.filter(a => a.date === "2026-09-08");
    return filtered.length > 0 ? filtered : all.slice(0, 6);
  }

  createAppointment(aptData) {
    const all = this.getAllAppointments();
    const newApt = {
      id: "apt_" + Math.floor(Math.random() * 90000 + 10000),
      status: "SCHEDULED",
      createdAt: new Date().toISOString(),
      ...aptData
    };
    all.push(newApt);
    this.state.appointments = all;
    this.logAuditEvent("CREAR_CITA", "Cita agendada para " + newApt.patientName + " (" + newApt.time + ")");
    this.saveState();
    return newApt;
  }

  updateAppointment(appointmentId, patch) {
    if (this.state.patient && this.state.patient.nextAppointment && this.state.patient.nextAppointment.id === appointmentId) {
      Object.assign(this.state.patient.nextAppointment, patch);
    }
    const all = this.getAllAppointments();
    const appt = all.find(a => a.id === appointmentId);
    if (appt) {
      Object.assign(appt, patch);
    }
    this.logAuditEvent("ACTUALIZAR_CITA", "Cita " + appointmentId + " actualizada: " + (patch.status || 'modificada'));
    this.saveState();
    return this.getPatient();
  }

  updateAppointmentStatus(appointmentId, status) {
    const all = this.getAllAppointments();
    const appt = all.find(a => a.id === appointmentId);
    if (appt) {
      appt.status = status;
      if (status === "CONFIRMED") {
        appt.confirmedAt = new Date().toISOString();
      }
      this.logAuditEvent("ESTADO_CITA", "Cita " + appointmentId + " (" + appt.patientName + ") cambió a " + status);
      this.saveState();
    }
    if (this.state.appointmentsToday) {
      const todayAppt = this.state.appointmentsToday.find(a => a.id === appointmentId);
      if (todayAppt) todayAppt.status = status;
    }
    return this.getAppointmentsToday();
  }

  confirmAppointmentWhatsApp(appointmentId) {
    const res = this.updateAppointmentStatus(appointmentId, "CONFIRMED");
    this.logAuditEvent("CONFIRMACION_WHATSAPP", "Recordatorio y confirmación remitido vía WhatsApp para cita " + appointmentId);
    return res;
  }

  // =========================================================================
  // CONTROL DE ROLES RBAC
  // =========================================================================
  getActiveRole() {
    try {
      return sessionStorage.getItem("sd_active_role") || "ADMIN";
    } catch(e) {
      return "ADMIN";
    }
  }

  setActiveRole(role) {
    try {
      sessionStorage.setItem("sd_active_role", role);
    } catch(e) {}
    this.logAuditEvent("CAMBIO_ROL", "Sesión cambiada a perfil: " + role);
    return role;
  }

  getRoleProfile(role) {
    const roles = {
      ADMIN: {
        id: "ADMIN",
        title: "Administrador General",
        subtitle: "Director Clínico & Gerencia",
        avatar: "👑",
        badge: "Acceso Total",
        permissions: ["AGENDA_ALL", "ODONTOGRAM_WRITE", "FINANCE_ALL", "INVENTORY_WRITE", "AUDIT_VIEW", "USERS_MANAGE"]
      },
      DENTIST: {
        id: "DENTIST",
        title: "Dra. Ana Flores Vanesa",
        subtitle: "Ortodoncia COP 18240 · Sillón 1",
        avatar: "🦷",
        badge: "Doctor / Sillón 1",
        permissions: ["AGENDA_CHAIR_1", "ODONTOGRAM_WRITE", "CLINICAL_NOTES", "PATIENT_VIEW"]
      },
      RECEPTION: {
        id: "RECEPTION",
        title: "Recepción Yanahuara",
        subtitle: "Caja Chica & Triaje",
        avatar: "📋",
        badge: "Recepción & Citas",
        permissions: ["AGENDA_ALL", "APPOINTMENT_MANAGE", "WHATSAPP_CONFIRM", "CHECKIN_WAITING", "CASH_REGISTER_QUICK"]
      }
    };
    return roles[role] || roles.ADMIN;
  }

  // =========================================================================
  // CAJA & TRANSACCIONES
  // =========================================================================
  getCashRegister() {
    return this.state.cashRegister || { transactions: [], currentCash: 0, openingBalance: 0, totalIncomeToday: 0, totalExpenseToday: 0 };
  }

  addCashTransaction(tx) {
    if (!this.state.cashRegister) {
      this.state.cashRegister = { transactions: [], currentCash: 0, openingBalance: 0, totalIncomeToday: 0, totalExpenseToday: 0 };
    }
    this.state.cashRegister.transactions.unshift(tx);
    if (tx.type === "INCOME") {
      this.state.cashRegister.currentCash += tx.amount;
      this.state.cashRegister.totalIncomeToday += tx.amount;
    } else {
      this.state.cashRegister.currentCash += tx.amount;
      this.state.cashRegister.totalExpenseToday += Math.abs(tx.amount);
    }
    this.logAuditEvent("TRANSACCION_CAJA", tx.concept + " - S/ " + tx.amount + " (" + tx.method + ")");
    this.saveState();
    return this.state.cashRegister;
  }

  updatePayment(paymentId, patch) {
    const pay = (this.state.payments || []).find(p => p.id === paymentId);
    if (pay) {
      Object.assign(pay, patch);
      this.logAuditEvent("ACTUALIZAR_PAGO", "Pago " + paymentId + " cambiado a estado " + patch.status);
      this.saveState();
    }
    return this.getPayments();
  }

  // =========================================================================
  // ODONTOGRAMA & FICHA CLÍNICA
  // =========================================================================
  addOdontogramFinding(finding) {
    if (!this.state.odontogram) {
      this.state.odontogram = { teeth: [] };
    }
    this.state.odontogram.teeth.push(finding);
    this.logAuditEvent("ODONTOGRAMA_HALLAZGO", "Pieza " + finding.number + ": " + (finding.finding || finding.treatmentProposed));
    this.saveState();
    return this.getOdontogram();
  }

  // =========================================================================
  // INVENTARIO
  // =========================================================================
  getInventory() {
    return this.state.inventory || [];
  }

  updateInventoryStock(itemId, quantity) {
    const item = (this.state.inventory || []).find(i => i.id === itemId);
    if (item) {
      item.stock = quantity;
      item.status = item.stock <= item.minStock ? (item.stock === 0 ? "OUT_OF_STOCK" : "CRITICAL") : "OPTIMAL";
      this.logAuditEvent("AJUSTE_INVENTARIO", "Stock de " + item.name + " ajustado a " + quantity + " " + item.unit);
      this.saveState();
    }
    return this.getInventory();
  }


  // =========================================================================
  // PERIODONTOGRAMA DIGITAL (6 SITIOS POR DIENTE - NTS 188 / AAP 2018)
  // =========================================================================
  getPeriodontalExam(patientId = "pat_maria") {
    if (!this.state.periodontalExam) {
      this.state.periodontalExam = JSON.parse(JSON.stringify(this.getSeed().periodontalExam || {}));
    }
    return this.state.periodontalExam;
  }

  updatePeriodontalSite(toothFdi, archSide, siteIndex, field, value) {
    const exam = this.getPeriodontalExam();
    if (!exam.teeth[toothFdi]) {
      exam.teeth[toothFdi] = {
        tooth: toothFdi,
        mobility: 0,
        furcation: 0,
        vestibular: { pd: [2,2,2], gm: [0,0,0], cal: [2,2,2], bop: [false,false,false], sup: [false,false,false], plaque: [false,false,false] },
        lingual: { pd: [2,2,2], gm: [0,0,0], cal: [2,2,2], bop: [false,false,false], sup: [false,false,false], plaque: [false,false,false] }
      };
    }
    const tooth = exam.teeth[toothFdi];
    const section = archSide === 'vestibular' ? tooth.vestibular : tooth.lingual;
    
    if (field === 'mobility') {
      tooth.mobility = parseInt(value) || 0;
    } else if (field === 'furcation') {
      tooth.furcation = parseInt(value) || 0;
    } else if (field === 'pd') {
      section.pd[siteIndex] = Math.max(0, Math.min(15, parseInt(value) || 0));
      section.cal[siteIndex] = section.pd[siteIndex] + section.gm[siteIndex];
    } else if (field === 'gm') {
      section.gm[siteIndex] = Math.max(-10, Math.min(15, parseInt(value) || 0));
      section.cal[siteIndex] = section.pd[siteIndex] + section.gm[siteIndex];
    } else if (field === 'bop') {
      section.bop[siteIndex] = !!value;
    } else if (field === 'sup') {
      section.sup[siteIndex] = !!value;
    } else if (field === 'plaque') {
      section.plaque[siteIndex] = !!value;
    }

    // Recalcular métricas de resumen
    this.recalculatePerioMetrics(exam);
    this.saveState();
    return exam;
  }

  recalculatePerioMetrics(exam) {
    let totalSites = 0;
    let bopSites = 0;
    let plaqueSites = 0;
    let deepPockets = 0;
    let severePockets = 0;

    Object.values(exam.teeth).forEach(tooth => {
      ['vestibular', 'lingual'].forEach(side => {
        const sec = tooth[side];
        if (!sec) return;
        for (let i = 0; i < 3; i++) {
          if (sec.pd[i] > 0) {
            totalSites++;
            if (sec.bop[i]) bopSites++;
            if (sec.plaque[i]) plaqueSites++;
            if (sec.pd[i] >= 4) deepPockets++;
            if (sec.pd[i] >= 6) severePockets++;
          }
        }
      });
    });

    exam.summary.bopPercent = totalSites > 0 ? Number(((bopSites / totalSites) * 100).toFixed(1)) : 0;
    exam.summary.plaquePercent = totalSites > 0 ? Number(((plaqueSites / totalSites) * 100).toFixed(1)) : 0;
    exam.summary.deepPocketsCount = deepPockets;
    exam.summary.severePocketsCount = severePockets;

    // Estadificación AAP 2018
    if (severePockets >= 4) {
      exam.summary.aapStage = "Estadio III (Periodontitis Severa)";
    } else if (deepPockets >= 4) {
      exam.summary.aapStage = "Estadio II (Periodontitis Moderada)";
    } else if (deepPockets >= 1) {
      exam.summary.aapStage = "Estadio I (Periodontitis Leve)";
    } else {
      exam.summary.aapStage = "Salud Gingival / Gingivitis";
    }
  }

  // =========================================================================
  // PLAN DE TRATAMIENTO & ODONTOGRAMA DE EVOLUCIÓN (NTS 188-MINSA)
  // =========================================================================
  getTreatmentPlan(patientId = "pat_maria") {
    if (!this.state.treatmentPlan) {
      this.state.treatmentPlan = JSON.parse(JSON.stringify(this.getSeed().treatmentPlan || {}));
    }
    return this.state.treatmentPlan;
  }

  getOdontogramEvolution(patientId = "pat_maria") {
    if (!this.state.odontogramEvolution) {
      this.state.odontogramEvolution = JSON.parse(JSON.stringify(this.getSeed().odontogramEvolution || {}));
    }
    return this.state.odontogramEvolution;
  }

  // Ejecutar procedimiento en la cita actual y evolucionar pieza dental
  executeToothProcedure(patientId = "pat_maria", toothNum = 21, procedureName = "Restauración Resina Estética Nanoparticulada") {
    const evo = this.getOdontogramEvolution(patientId);
    let toothRecord = evo.evolutionTeeth.find(t => t.number === toothNum);
    
    if (toothRecord) {
      toothRecord.status = "RESTORED";
      toothRecord.treatment = procedureName;
      toothRecord.executedDate = new Date().toISOString().split('T')[0];
      toothRecord.stage = "EVOLUCION_REALIZADA";
      toothRecord.doctor = "Dra. Ana Flores Vanesa (COP 18240)";
    } else {
      toothRecord = {
        number: toothNum,
        status: "RESTORED",
        surface: "Mesial",
        treatment: procedureName,
        executedDate: new Date().toISOString().split('T')[0],
        stage: "EVOLUCION_REALIZADA",
        doctor: "Dra. Ana Flores Vanesa (COP 18240)"
      };
      evo.evolutionTeeth.push(toothRecord);
    }

    // Actualizar estado en plan de tratamiento
    const plan = this.getTreatmentPlan(patientId);
    plan.phases.forEach(phase => {
      phase.items.forEach(item => {
        if (item.tooth === toothNum) {
          item.status = "COMPLETED";
          item.executedDate = new Date().toISOString().split('T')[0];
        }
      });
    });

    this.logAuditEvent("PROCEDIMIENTO_EVOLUCION", "Procedimiento ejecutado en Pieza #" + toothNum + ": " + procedureName + " (COP 18240)");
    this.saveState();
    return { evolution: evo, plan: plan };
  }


  // =========================================================================
  // IMAGENOLOGÍA & RADIOLOGÍA CLÍNICA (PACS / DICOM)
  // =========================================================================
  getImagingStudies(patientId = "pat_maria") {
    if (!this.state.imagingStudies) {
      this.state.imagingStudies = JSON.parse(JSON.stringify(this.getSeed().imagingStudies || []));
    }
    return this.state.imagingStudies;
  }

  getImagingStudyById(studyId) {
    return this.getImagingStudies().find(s => s.id === studyId) || this.getImagingStudies()[0];
  }

  addStudyMeasurement(studyId, measurement) {
    const study = this.getImagingStudyById(studyId);
    if (study) {
      if (!study.annotations) study.annotations = [];
      study.annotations.push(measurement);
      this.logAuditEvent("MEDICION_RADIOLOGICA", "Medición en " + study.title + ": " + measurement.label + " (" + measurement.valueMm + " mm)");
      this.saveState();
    }
    return study;
  }

  publishStudyReport(studyId) {
    const study = this.getImagingStudyById(studyId);
    if (study) {
      study.status = "VALIDATED_PUBLISHED";
      study.publishedAt = new Date().toLocaleString("es-PE");
      this.logAuditEvent("PUBLICACION_ESTUDIO_PACS", "Informe radiológico " + study.id + " (" + study.title + ") publicado al Portal del Paciente");
      this.saveState();
    }
    return study;
  }


  // =========================================================================
  // EXPEDIENTE DOCUMENTAL & PROCESADOR DE PDFS CLÍNICOS
  // =========================================================================
  getDocuments(patientId = "pat_maria") {
    if (!this.state.documents || !this.state.documents.find(d => d.id === 'doc_receta_fisica_scan')) {
      const defaultDocs = SEED_V2.documents || [];
      if (!this.state.documents) {
        this.state.documents = JSON.parse(JSON.stringify(defaultDocs));
      } else {
        defaultDocs.forEach(sd => {
          if (!this.state.documents.find(d => d.id === sd.id)) {
            this.state.documents.push(JSON.parse(JSON.stringify(sd)));
          }
        });
      }
      this.saveState();
    }
    return this.state.documents;
  }

  getDocumentById(docId) {
    return this.getDocuments().find(d => d.id === docId) || this.getDocuments()[0];
  }

  uploadDocument(docData) {
    if (!this.state.documents) {
      this.state.documents = [];
    }
    const newDoc = {
      id: "doc_" + Date.now(),
      title: docData.title || "Documento Clínico Carga Local",
      category: docData.category || "INFORME_PDF",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      author: docData.author || "Usuario Demo (Sesión Activa)",
      authorCmp: "COP 18240",
      entity: "Sillar Dental Especialidades",
      pages: docData.pages || 1,
      size: docData.size || "1.2 MB",
      sha256: docData.sha256 || "a8f5c2d" + Math.random().toString(16).substring(2, 10) + "7890abcdef1234567890",
      status: docData.status || "VALIDATED_PUBLISHED",
      hasRadiograph: !!docData.hasRadiograph,
      hasScannedPhysical: !!docData.hasScannedPhysical,
      scannedBy: docData.scannedBy || null,
      qrRefCode: docData.qrRefCode || null,
      studyId: docData.studyId || null,
      summary: docData.summary || "Documento clínico ingresado y validado en el expediente digital.",
      notes: docData.notes || "Carga asistida por el Centro de Gestión Documental."
    };

    this.state.documents.unshift(newDoc);
    this.logAuditEvent("CARGA_DOCUMENTO_PDF", "Documento ingresado al expediente: " + newDoc.title + " (Hash: " + newDoc.sha256.substring(0, 12) + "...)");
    this.saveState();
    return newDoc;
  }

  uploadScannedPrescription(data = {}) {
    return this.uploadDocument({
      title: data.title || "Receta Médica Sellada y Firmada en Físico (Digitalización Móvil)",
      category: "RECETA_FISICA_SCAN",
      status: "PHYSICAL_SIGNED_DIGITIZED",
      author: data.author || "Dra. Ana Flores Vanesa",
      size: data.size || "1.3 MB",
      pages: 1,
      hasScannedPhysical: true,
      scannedBy: data.scannedBy || "Dra. Ana Flores (Cámara Móvil Consultorio)",
      qrRefCode: data.qrRefCode || ("QR-SCAN-RX-" + Date.now().toString().slice(-6)),
      summary: data.summary || "Receta física con sello de colegiatura COP 18240 y firma manuscrita de la profesional, fotografiada y digitalizada desde smartphone conforme a NTS N.º 139-MINSA.",
      notes: "Soporte físico custodiado en Archivo Pasivo Clínico Yanahuara. Hash criptográfico generado y verificado."
    });
  }



  // =========================================================================
  // GESTIÓN INTEGRAL DE PLANES DE TRATAMIENTO & PRESUPUESTOS DINÁMICOS
  // =========================================================================
  getProcedureCatalog() {
    return [
      { code: "PR-01", name: "Profilaxis Ultrasónica & Detartraje Supra/Subgingival", category: "Periodoncia", fee: 150, defaultDoctor: "Dr. Jorge Benavides" },
      { code: "PR-02", name: "Raspado y Alisado Radicular (RAR) por Cuadrante", category: "Periodoncia", fee: 150, defaultDoctor: "Dr. Jorge Benavides" },
      { code: "OP-01", name: "Restauración Resina Fotocurable Estética Nanoparticulada", category: "Operatoria", fee: 180, defaultDoctor: "Dra. Ana Flores" },
      { code: "OP-02", name: "Incrustación Estética Inlay/Onlay en Disilicato E-Max", category: "Rehabilitación", fee: 550, defaultDoctor: "Dr. Diego Torres" },
      { code: "EN-01", name: "Endodoncia Multirradicular + Obturación Termoplástica", category: "Endodoncia", fee: 450, defaultDoctor: "Dra. Lucía Paredes" },
      { code: "OR-01", name: "Tratamiento Integral con Alineadores Invisibles 3D (Set 12)", category: "Ortodoncia", fee: 2100, defaultDoctor: "Dra. Ana Flores" },
      { code: "OR-02", name: "Brackets Metálicos Prescripción Roth 0.022 (Caso Completo)", category: "Ortodoncia", fee: 1600, defaultDoctor: "Dra. Ana Flores" },
      { code: "CX-01", name: "Exodoncia Compleja de Tercera Molar Incluida", category: "Cirugía", fee: 350, defaultDoctor: "Dr. Carlos Mendoza" },
      { code: "IM-01", name: "Colocación de Implante de Titanio Neodent Helix GM", category: "Implantología", fee: 1500, defaultDoctor: "Dr. Carlos Mendoza" },
      { code: "RH-01", name: "Corona sobre Implante en Zirconio Monolítico CAD/CAM", category: "Rehabilitación", fee: 850, defaultDoctor: "Dr. Diego Torres" },
      { code: "CL-01", name: "Blanqueamiento Dental LED Clínico en Consultorio", category: "Estética", fee: 380, defaultDoctor: "Dra. Ana Flores" }
    ];
  }

  addTreatmentPlanItem(patientId, phaseId, item) {
    const plan = this.getTreatmentPlan(patientId);
    const phase = plan.phases.find(p => p.id === phaseId);
    if (phase) {
      const newItem = {
        id: "tx_" + Date.now().toString(36),
        tooth: item.tooth || "General",
        procedure: item.procedure,
        fee: parseFloat(item.fee) || 0,
        discountPercent: parseFloat(item.discountPercent) || 0,
        epsCoveragePercent: parseFloat(item.epsCoveragePercent) || 0,
        netFee: item.netFee || parseFloat(item.fee) || 0,
        status: "PENDING",
        executedDate: null,
        doctor: item.doctor || "Dra. Ana Flores (COP 18240)"
      };
      phase.items.push(newItem);
      this.recalculatePlanTotals(plan);
      this.logAuditEvent("PLAN_ITEM_AGREGADO", "Procedimiento agregado a " + phase.name + ": " + newItem.procedure + " (S/ " + newItem.fee + ")");
      this.saveState();
      return newItem;
    }
    return null;
  }

  removeTreatmentPlanItem(patientId, phaseId, itemId) {
    const plan = this.getTreatmentPlan(patientId);
    const phase = plan.phases.find(p => p.id === phaseId);
    if (phase) {
      const idx = phase.items.findIndex(it => it.id === itemId);
      if (idx !== -1) {
        const removed = phase.items.splice(idx, 1)[0];
        this.recalculatePlanTotals(plan);
        this.logAuditEvent("PLAN_ITEM_ELIMINADO", "Procedimiento eliminado: " + removed.procedure);
        this.saveState();
        return true;
      }
    }
    return false;
  }

  recalculatePlanTotals(plan) {
    let grossTotal = 0;
    let netTotal = 0;
    let totalDiscount = 0;
    let totalEps = 0;

    plan.phases.forEach(ph => {
      ph.items.forEach(it => {
        const fee = it.fee || 0;
        grossTotal += fee;
        const discountAmt = fee * ((it.discountPercent || 0) / 100);
        const epsAmt = fee * ((it.epsCoveragePercent || 0) / 100);
        const net = Math.max(0, fee - discountAmt - epsAmt);
        it.netFee = net;
        totalDiscount += discountAmt;
        totalEps += epsAmt;
        netTotal += net;
      });
    });

    plan.grossTotal = grossTotal;
    plan.totalDiscount = totalDiscount;
    plan.totalEpsCoverage = totalEps;
    plan.totalCost = netTotal;
    // Ajustar saldo pendiente restando pagos ya realizados
    const paidAmount = plan.paidAmount || (3850 - 1400); // 2450 por defecto
    plan.balanceDue = Math.max(0, netTotal - paidAmount);
  }

  acceptTreatmentPlan(patientId, acceptanceData = {}) {
    const plan = this.getTreatmentPlan(patientId);
    plan.status = "ACCEPTED";
    plan.acceptedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    plan.acceptanceRecord = {
      patientName: acceptanceData.patientName || "María Quispe Condori",
      documentNumber: acceptanceData.documentNumber || "45892104",
      signatureHash: acceptanceData.signatureHash || ("SIG-" + Math.random().toString(36).substring(2, 10).toUpperCase()),
      signatureDataUrl: acceptanceData.signatureDataUrl || null,
      financingModality: acceptanceData.financingModality || "CUOTAS_3",
      treatingDoctor: "Dra. Ana Flores Vanesa (COP 18240)",
      acceptedTerms: true,
      timestamp: new Date().toISOString()
    };
    this.logAuditEvent("PLAN_TRATAMIENTO_ACEPTADO", "Plan '" + plan.planName + "' ACEPTADO formalmente por paciente (Firma: " + plan.acceptanceRecord.signatureHash + ")");
    this.saveState();
    return plan;
  }

  generatePaymentScheduleFromPlan(patientId, modality = "CUOTAS_3") {
    const plan = this.getTreatmentPlan(patientId);
    const balance = plan.balanceDue > 0 ? plan.balanceDue : plan.totalCost;
    let installments = [];

    if (modality === "CONTADO") {
      const discounted = balance * 0.90; // 10% pronto pago
      installments.push({
        id: "pay_gen_" + Date.now() + "_1",
        concept: "Pago Único al Contado — Descuento 10% Pronto Pago (" + plan.planName + ")",
        amount: parseFloat(discounted.toFixed(2)),
        dueDate: new Date().toISOString().slice(0, 10),
        status: "PENDING",
        paidDate: null,
        receiptNumber: null,
        method: "Efectivo / Yape / Tarjeta"
      });
    } else if (modality === "CUOTAS_3") {
      const cuota1 = parseFloat((balance * 0.40).toFixed(2));
      const cuota2 = parseFloat((balance * 0.30).toFixed(2));
      const cuota3 = parseFloat((balance - cuota1 - cuota2).toFixed(2));
      const d = new Date();
      installments = [
        {
          id: "pay_gen_" + Date.now() + "_1",
          concept: "Cuota 01/03 (40% Inicial) — " + plan.planName,
          amount: cuota1,
          dueDate: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 2).toISOString().slice(0, 10),
          status: "PENDING",
          paidDate: null,
          method: "POS Niubiz"
        },
        {
          id: "pay_gen_" + Date.now() + "_2",
          concept: "Cuota 02/03 (30% Avance) — " + plan.planName,
          amount: cuota2,
          dueDate: new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()).toISOString().slice(0, 10),
          status: "PENDING",
          paidDate: null,
          method: "Transferencia / Yape"
        },
        {
          id: "pay_gen_" + Date.now() + "_3",
          concept: "Cuota 03/03 (30% Final) — " + plan.planName,
          amount: cuota3,
          dueDate: new Date(d.getFullYear(), d.getMonth() + 2, d.getDate()).toISOString().slice(0, 10),
          status: "PENDING",
          paidDate: null,
          method: "POS Niubiz"
        }
      ];
    } else if (modality === "CUOTAS_6") {
      const monthly = parseFloat((balance / 6).toFixed(2));
      const d = new Date();
      for (let i = 1; i <= 6; i++) {
        const amt = (i === 6) ? parseFloat((balance - monthly * 5).toFixed(2)) : monthly;
        installments.push({
          id: "pay_gen_" + Date.now() + "_" + i,
          concept: "Cuota 0" + i + "/06 (Financiamiento Dental) — " + plan.planName,
          amount: amt,
          dueDate: new Date(d.getFullYear(), d.getMonth() + (i - 1), d.getDate() + 5).toISOString().slice(0, 10),
          status: i === 1 ? "PENDING" : "SCHEDULED",
          paidDate: null,
          method: "Débito Automático / POS"
        });
      }
    }

    if (!this.state.payments) {
      this.state.payments = JSON.parse(JSON.stringify(this.getSeed().payments || []));
    }
    installments.forEach(inst => {
      this.state.payments.push(inst);
    });

    this.logAuditEvent("CRONOGRAMA_PAGOS_CREADO", "Cronograma de " + installments.length + " cuotas generado desde Plan de Tratamiento (" + modality + ")");
    this.saveState();
    return installments;
  }

  // =========================================================================
  // SALA DE ESPERA, TRIAJE & CONTROL DE FLUJO EN RECEPCIÓN
  // =========================================================================
  getWaitlist() {
    if (!this.state.waitlist) {
      this.state.waitlist = JSON.parse(JSON.stringify(this.getSeed().waitlist || []));
    }
    return this.state.waitlist;
  }

  checkInPatient(aptId, triageData = {}) {
    const all = this.getAllAppointments();
    const appt = all.find(a => a.id === aptId);
    if (appt) {
      appt.status = "IN_WAITING_ROOM";
      appt.checkedInAt = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
      appt.checkedInTimestamp = Date.now();
      appt.triage = {
        bloodPressure: triageData.bloodPressure || "120/80 mmHg",
        heartRate: triageData.heartRate || 72,
        spO2: triageData.spO2 || 98,
        temperature: triageData.temperature || 36.5,
        alerts: triageData.alerts || [],
        notes: triageData.notes || "Paciente ingresó a sala de espera sin síntomas agudos."
      };
      this.logAuditEvent("CHECKIN_PACIENTE", "Check-in registrado: " + appt.patientName + " en Sala de Espera (PA: " + appt.triage.bloodPressure + ")");
      this.saveState();
    }
    return appt;
  }

  callPatientToChair(aptId, chairId = "chair_1") {
    const all = this.getAllAppointments();
    const appt = all.find(a => a.id === aptId);
    if (appt) {
      const chairs = {
        chair_1: "Sillón 1 (Ortodoncia)",
        chair_2: "Sillón 2 (Cirugía/Rehab)",
        chair_3: "Sillón 3 (Pediatría/Integral)"
      };
      appt.status = "IN_CHAIR";
      appt.chairId = chairId;
      appt.chair = chairs[chairId] || chairs.chair_1;
      appt.calledInAt = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
      appt.calledInTimestamp = Date.now();
      this.logAuditEvent("LLAMADO_SILLON", appt.patientName + " trasladado a " + appt.chair);
      this.saveState();
    }
    return appt;
  }

  completeAppointmentSession(aptId, notes = "") {
    const all = this.getAllAppointments();
    const appt = all.find(a => a.id === aptId);
    if (appt) {
      appt.status = "COMPLETED";
      appt.completedAt = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
      appt.clinicalNotes = notes || "Atención clínica finalizada conforme al plan.";
      this.logAuditEvent("CITA_CONCLUIDA", "Atención finalizada para " + appt.patientName + " (" + appt.chair + ")");
      this.saveState();
    }
    return appt;
  }

  markNoShow(aptId, reason = "Paciente no se presentó a su turno") {
    const all = this.getAllAppointments();
    const appt = all.find(a => a.id === aptId);
    if (appt) {
      appt.status = "NO_SHOW";
      appt.noShowReason = reason;
      this.logAuditEvent("INASISTENCIA_NO_SHOW", "Inasistencia registrada para cita " + aptId + " (" + appt.patientName + ")");
      this.saveState();
    }
    return appt;
  }

  assignWaitlistToAppointment(waitlistId, targetSlot = {}) {
    const waitlist = this.getWaitlist();
    const idx = waitlist.findIndex(w => w.id === waitlistId);
    if (idx !== -1) {
      const wPatient = waitlist[idx];
      const newApt = this.createAppointment({
        patientName: wPatient.patientName,
        patientPhone: wPatient.phone,
        specialty: wPatient.preferredSpecialty,
        reason: "Relleno de cancelación desde Lista de Espera (" + wPatient.notes + ")",
        time: targetSlot.time || "11:15 AM",
        startTime: targetSlot.startTime || "11:15",
        duration: "45 min",
        durationMinutes: 45,
        date: "2026-09-08",
        chairId: targetSlot.chairId || "chair_1",
        chair: targetSlot.chair || "Sillón 1 (Ortodoncia)",
        practitioner: "Dra. Ana Flores (Ortodoncia)",
        status: "CONFIRMED"
      });
      // Remover de lista de espera
      waitlist.splice(idx, 1);
      this.logAuditEvent("RELLENO_CANCELACION", wPatient.patientName + " asignado desde Lista de Espera a turno " + newApt.time);
      this.saveState();
      return newApt;
    }
    return null;
  }

  // =========================================================================
  // AUDITORÍA
  // =========================================================================
  logAuditEvent(action, detail) {
    if (!this.state.auditEvents) {
      this.state.auditEvents = [];
    }
    const event = {
      id: "aud_" + Date.now(),
      timestamp: new Date().toLocaleString("es-PE"),
      actor: "Usuario Demo (Sesión Activa)",
      action,
      detail
    };
    this.state.auditEvents.unshift(event);
    this.saveState();
    return event;
  }

  resetState() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch(e) {}
    this.state = JSON.parse(JSON.stringify(SEED_V2));
    return this.state;
  }
}

export const mockApi = new MockApiV2();
