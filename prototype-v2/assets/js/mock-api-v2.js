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

  getPractitioners() {
    return this.state.practitioners;
  }

  getDocuments() {
    return this.state.documents;
  }

  getPayments() {
    return this.state.payments;
  }

  getOdontogram() {
    return this.state.odontogram;
  }

  updateAppointment(appointmentId, patch) {
    if (this.state.patient.nextAppointment.id === appointmentId) {
      Object.assign(this.state.patient.nextAppointment, patch);
      this.logAuditEvent("ACTUALIZAR_CITA", `Cita ${appointmentId} actualizada: ${patch.status || 'modificada'}`);
      this.saveState();
    }
    return this.getPatient();
  }

  updatePayment(paymentId, patch) {
    const pay = this.state.payments.find(p => p.id === paymentId);
    if (pay) {
      Object.assign(pay, patch);
      this.logAuditEvent("ACTUALIZAR_PAGO", `Pago ${paymentId} cambiado a estado ${patch.status}`);
      this.saveState();
    }
    return this.getPayments();
  }

  addOdontogramFinding(finding) {
    this.state.odontogram.teeth.push(finding);
    this.logAuditEvent("ODONTOGRAMA_HALLAZGO", `Pieza ${finding.number}: ${finding.finding || finding.treatmentProposed}`);
    this.saveState();
    return this.getOdontogram();
  }

  logAuditEvent(action, detail) {
    const event = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleString("es-PE"),
      actor: "Usuario Demo (Sesión Activa)",
      action,
      detail
    };
    this.state.auditEvents.unshift(event);
    this.saveState();
    return event;
  }

  getPatients() {
    return this.state.patients || [];
  }

  getAppointmentsToday() {
    return this.state.appointmentsToday || [];
  }

  getCashRegister() {
    return this.state.cashRegister || { transactions: [] };
  }

  getInventory() {
    return this.state.inventory || [];
  }

  updateAppointmentStatus(appointmentId, status) {
    const appt = (this.state.appointmentsToday || []).find(a => a.id === appointmentId);
    if (appt) {
      appt.status = status;
      this.logAuditEvent("ESTADO_CITA", `Cita ${appointmentId} (${appt.patientName}) cambió a ${status}`);
      this.saveState();
    }
    return this.getAppointmentsToday();
  }

  addCashTransaction(tx) {
    if (!this.state.cashRegister) {
      this.state.cashRegister = { transactions: [], currentCash: 0 };
    }
    this.state.cashRegister.transactions.unshift(tx);
    if (tx.type === "INCOME") {
      this.state.cashRegister.currentCash += tx.amount;
      this.state.cashRegister.totalIncomeToday += tx.amount;
    } else {
      this.state.cashRegister.currentCash += tx.amount;
      this.state.cashRegister.totalExpenseToday += Math.abs(tx.amount);
    }
    this.logAuditEvent("TRANSACCION_CAJA", `${tx.concept} - S/ ${tx.amount} (${tx.method})`);
    this.saveState();
    return this.state.cashRegister;
  }

  updateInventoryStock(itemId, quantity) {
    const item = (this.state.inventory || []).find(i => i.id === itemId);
    if (item) {
      item.stock = quantity;
      item.status = item.stock <= item.minStock ? (item.stock === 0 ? "OUT_OF_STOCK" : "CRITICAL") : "OPTIMAL";
      this.logAuditEvent("AJUSTE_INVENTARIO", `Stock de ${item.name} ajustado a ${quantity} ${item.unit}`);
      this.saveState();
    }
    return this.getInventory();
  }

  resetState() {
    sessionStorage.removeItem(STORAGE_KEY);
    this.state = JSON.parse(JSON.stringify(SEED_V2));
    return this.state;
  }
}

export const mockApi = new MockApiV2();
