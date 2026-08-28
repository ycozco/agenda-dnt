(function () {
  const clone = value => JSON.parse(JSON.stringify(value));
  window.DentalMock = {
    get data() { return window.DENTAL_SEED; },
    patient(id) { return this.data.patients.find(p => p.id === id) || this.data.patients[0]; },
    practitioner(id) { return this.data.practitioners.find(p => p.id === id) || this.data.practitioners[0]; },
    appointmentsFor(patientId) { return this.data.appointments.filter(a => a.patientId === patientId); },
    documentsFor(patientId) { return this.data.documents.filter(d => d.patientId === patientId); },
    paymentsFor(patientId) { return this.data.payments.filter(p => p.patientId === patientId); },
    installmentsFor(patientId) { return this.data.installments.filter(i => i.patientId === patientId); },
    findPatients(query) { const q = (query || '').toLowerCase().trim(); return !q ? this.data.patients : this.data.patients.filter(p => [p.name, p.record, p.phone].some(v => v.toLowerCase().includes(q))); },
    money(amount) { return `S/ ${Number(amount).toLocaleString('es-PE', { minimumFractionDigits: 2 })}`; },
    addActivity(text) { this.lastActivity = { text, at: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }) }; },
    snapshot() { return clone(this.data); }
  };
})();
