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
    return this.state.practitioners || [];
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
