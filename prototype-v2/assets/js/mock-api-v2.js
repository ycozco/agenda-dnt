import { SEED_V2 } from './seed-data.js';

const STORAGE_KEY = 'sillar_dental_prototype_v2_state';

/**
 * Mock API v2 con soporte para persistencia local en sessionStorage.
 * Mantiene la reactividad y trazabilidad en memoria durante las navegaciones multi-archivo HTML.
 */
class MockApiV2 {
  constructor() {
    this.state = this.loadState();
    if (typeof window !== 'undefined') {
      window.mockApi = this;
    }
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


  // =========================================================================
  // GESTIÓN DE TENANTS / CLÍNICAS (SUPER ADMIN SAAS)
  // =========================================================================

  // =========================================================================
  // SEGURIDAD AVANZADA, 2FA, SESIONES Y PRIVACIDAD LPDP
  // =========================================================================
  getSecurityConfig() {
    if (!this.state.security) {
      this.state.security = JSON.parse(JSON.stringify(SEED_V2.security || {}));
      this.saveState();
    }
    return this.state.security;
  }

  getActiveSessions() {
    return this.getSecurityConfig().activeSessions || [];
  }

  revokeSession(sessionId) {
    const sec = this.getSecurityConfig();
    const target = (sec.activeSessions || []).find(s => s.id === sessionId);
    if (target) {
      sec.activeSessions = sec.activeSessions.filter(s => s.id !== sessionId);
      this.logAuditEvent("REVOCACION_SESION", "Sesión remota cerrada en: " + target.device + " (IP: " + target.ip + ")");
      this.saveState();
      return true;
    }
    return false;
  }

  revokeAllOtherSessions() {
    const sec = this.getSecurityConfig();
    sec.activeSessions = (sec.activeSessions || []).filter(s => s.isCurrent);
    this.logAuditEvent("REVOCACION_TODAS_SESIONES", "Todas las sesiones remotas fueron cerradas preventivamente.");
    this.saveState();
    return sec.activeSessions;
  }

  // ALGORITMO TOTP ESTÁNDAR (RFC 6238 / RFC 4226)
  _sha1(bytes) {
    let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;
    const len = bytes.length;
    const bitLen = len * 8;
    const padded = new Uint8Array(((len + 8 >> 6) + 1) << 6);
    padded.set(bytes);
    padded[len] = 0x80;
    const view = new DataView(padded.buffer);
    view.setUint32(padded.length - 4, bitLen, false);
    const w = new Uint32Array(80);
    for (let i = 0; i < padded.length; i += 64) {
      for (let j = 0; j < 16; j++) w[j] = view.getUint32(i + j * 4, false);
      for (let j = 16; j < 80; j++) {
        const v = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
        w[j] = (v << 1) | (v >>> 31);
      }
      let a = h0, b = h1, c = h2, d = h3, e = h4;
      for (let j = 0; j < 80; j++) {
        let f, k;
        if (j < 20) { f = (b & c) | ((~b) & d); k = 0x5A827999; }
        else if (j < 40) { f = b ^ c ^ d; k = 0x6ED9EBA1; }
        else if (j < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8F1BBCDC; }
        else { f = b ^ c ^ d; k = 0xCA62C1D6; }
        const temp = (((a << 5) | (a >>> 27)) + f + e + k + w[j]) | 0;
        e = d; d = c; c = (b << 30) | (b >>> 2); b = a; a = temp;
      }
      h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
    }
    const res = new Uint8Array(20);
    const rv = new DataView(res.buffer);
    rv.setUint32(0, h0, false);
    rv.setUint32(4, h1, false);
    rv.setUint32(8, h2, false);
    rv.setUint32(12, h3, false);
    rv.setUint32(16, h4, false);
    return res;
  }

  _hmacSha1(keyBytes, msgBytes) {
    let k = keyBytes;
    if (k.length > 64) k = this._sha1(k);
    if (k.length < 64) {
      const paddedK = new Uint8Array(64);
      paddedK.set(k);
      k = paddedK;
    }
    const ipad = new Uint8Array(64 + msgBytes.length);
    const opad = new Uint8Array(64 + 20);
    for (let i = 0; i < 64; i++) {
      ipad[i] = k[i] ^ 0x36;
      opad[i] = k[i] ^ 0x5c;
    }
    ipad.set(msgBytes, 64);
    const innerHash = this._sha1(ipad);
    opad.set(innerHash, 64);
    return this._sha1(opad);
  }

  _computeTotp(secretStr, timeSec) {
    const counter = Math.floor(timeSec / 30);
    const msg = new Uint8Array(8);
    let c = counter;
    for (let i = 7; i >= 0; i--) {
      msg[i] = c & 0xff;
      c = Math.floor(c / 256);
    }
    const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : { encode: s => Uint8Array.from(Buffer.from(s)) };
    const keyBytes = encoder.encode(secretStr);
    const hash = this._hmacSha1(keyBytes, msg);
    const offset = hash[19] & 0x0f;
    const binCode = ((hash[offset] & 0x7f) << 24) |
                    ((hash[offset + 1] & 0xff) << 16) |
                    ((hash[offset + 2] & 0xff) << 8) |
                    (hash[offset + 3] & 0xff);
    const otp = binCode % 1000000;
    return otp.toString().padStart(6, '0');
  }

  getCurrent2FACode() {
    const sec = this.getSecurityConfig();
    const secret = (sec.twoFactorConfig && sec.twoFactorConfig.secret) || "DEMO_SYNTHETIC_MOCK_KEY_NOT_A_REAL_SECRET";
    const nowSec = Math.floor(Date.now() / 1000);
    return this._computeTotp(secret, nowSec);
  }

  verify2FACode(code) {
    const cleanCode = (code || '').trim();
    if (!cleanCode) {
      return { success: false, message: "Ingrese el código de verificación." };
    }

    // Rechazo explícito de códigos triviales (SEC-003)
    const trivialCodes = ["000000", "111111", "123456", "999999", "654321"];
    if (trivialCodes.includes(cleanCode)) {
      this.logAuditEvent("FALLO_2FA", "Intento con código trivial rechazado por seguridad: " + cleanCode);
      return { success: false, message: "Código inseguro o inválido. Ingrese el token dinámico de su autenticador." };
    }

    const sec = this.getSecurityConfig();
    const backupCodes = (sec.twoFactorConfig && sec.twoFactorConfig.backupCodes) || [];
    // Verificación contra códigos de respaldo de emergencia
    if (backupCodes.includes(cleanCode)) {
      // Consumir el código de respaldo
      sec.twoFactorConfig.backupCodes = backupCodes.filter(c => c !== cleanCode);
      this.saveState();
      this.logAuditEvent("VERIFICACION_2FA_BACKUP", "Acceso concedido mediante código de respaldo de un solo uso.");
      return { success: true, message: "Código de respaldo válido. Ha sido consumido." };
    }

    // Verificación TOTP RFC 6238 determinista (ventana actual, -30s y +30s)
    const secret = (sec.twoFactorConfig && sec.twoFactorConfig.secret) || "DEMO_SYNTHETIC_MOCK_KEY_NOT_A_REAL_SECRET";
    const nowSec = Math.floor(Date.now() / 1000);
    const validCurrent = this._computeTotp(secret, nowSec);
    const validPast = this._computeTotp(secret, nowSec - 30);
    const validFuture = this._computeTotp(secret, nowSec + 30);

    if (cleanCode === validCurrent || cleanCode === validPast || cleanCode === validFuture) {
      this.logAuditEvent("VERIFICACION_2FA", "Doble factor de autenticación TOTP verificado exitosamente (Token: " + cleanCode + ")");
      return { success: true, message: "Código 2FA TOTP verificado con éxito" };
    }

    // Cualquier código no coincidente (incluyendo códigos no triviales como 246802) es RECHAZADO
    this.logAuditEvent("FALLO_2FA", "Intento 2FA con código no coincidente: " + cleanCode);
    return { success: false, message: "Código 2FA incorrecto o expirado. Verifique su aplicación autenticadora." };
  }

  toggle2FA(enabled) {
    const sec = this.getSecurityConfig();
    if (sec.twoFactorConfig) {
      sec.twoFactorConfig.enabled = enabled;
      this.logAuditEvent("CONFIG_2FA", enabled ? "2FA activado para la cuenta médica" : "2FA desactivado");
      this.saveState();
      return sec.twoFactorConfig;
    }
    return null;
  }

  getSecurityIncidents() {
    return this.getSecurityConfig().securityIncidents || [];
  }

  // PRIVACIDAD & DERECHOS ARCO (LEY 29733)
  getPatientPrivacy() {
    if (!this.state.patientPrivacy) {
      this.state.patientPrivacy = JSON.parse(JSON.stringify(SEED_V2.patientPrivacy || {}));
      this.saveState();
    }
    return this.state.patientPrivacy;
  }

  updateConsent(key, value) {
    const priv = this.getPatientPrivacy();
    priv[key] = value;
    this.logAuditEvent("ACTUALIZACION_CONSENTIMIENTO", "Paciente modificó consentimiento LPDP: " + key + " = " + value);
    this.saveState();
    return priv;
  }

  requestArcoExport(type, reason) {
    const priv = this.getPatientPrivacy();
    const reqId = "ARCO-2026-" + Math.floor(Math.random() * 9000 + 1000);
    const sha = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    
    const newReq = {
      id: reqId,
      type: type || "ACCESO",
      requestDate: new Date().toISOString().split('T')[0],
      status: "COMPLETED",
      detail: reason || "Exportación certificada de Historia Clínica conforme a NTS 139-MINSA con marca de agua forense.",
      sha256: sha
    };
    if (!priv.arcoRequests) priv.arcoRequests = [];
    priv.arcoRequests.unshift(newReq);

    this.logAuditEvent("SOLICITUD_ARCO", "Solicitud ARCO registrada (" + type + "): " + reqId + " Hash: " + sha.slice(0, 12));
    this.saveState();
    return newReq;
  }

  // OPTIMIZACIÓN & STORAGE PIPELINE (S3 / MINIO)
  optimizeStorage(tenantId) {
    const tenant = this.getTenantById(tenantId || this.state.activeTenantId);
    if (tenant && tenant.storage) {
      const prevMb = tenant.storage.usedMb;
      const optimizedMb = Math.round(prevMb * 0.38); // Ahorro de 62%
      tenant.storage.usedMb = optimizedMb;
      tenant.storage.compressionRatio = "62% WebP Lossless / Tiling";
      tenant.storage.lastOptimization = new Date().toLocaleString('es-PE');

      this.logAuditEvent("OPTIMIZACION_STORAGE_S3", "Compresión WebP/AVIF ejecutada en S3 para: " + tenant.name + " (" + (prevMb - optimizedMb) + " MB liberados)");
      this.saveState();
      return tenant.storage;
    }
    return null;
  }

  // RESILIENCIA OFFLINE EN CONSULTORIO
  getOfflineQueue() {
    try {
      const q = sessionStorage.getItem('sillar_offline_queue');
      return q ? JSON.parse(q) : [];
    } catch(e) {
      return [];
    }
  }

  enqueueOfflineMutation(type, payload) {
    const q = this.getOfflineQueue();
    q.push({
      id: "offline_" + Date.now(),
      type: type,
      payload: payload,
      createdAt: new Date().toISOString()
    });
    sessionStorage.setItem('sillar_offline_queue', JSON.stringify(q));
    return q;
  }

  syncOfflineQueue() {
    const q = this.getOfflineQueue();
    if (q.length === 0) return 0;
    
    let appliedCount = 0;
    const remainingQueue = [];
    if (!this.state.offlineSyncLog) {
      this.state.offlineSyncLog = [];
    }

    q.forEach(item => {
      try {
        let confirmed = false;
        if (item.type === "REGISTRO_HALLAZGO_DIENTE" && item.payload) {
          const od = this.getOdontogram();
          if (od && Array.isArray(od.teeth)) {
            const tooth = od.teeth.find(t => t.number === item.payload.tooth);
            if (tooth) {
              tooth.note = (tooth.note ? tooth.note + " | " : "") + item.payload.note;
            } else {
              od.teeth.push({ number: item.payload.tooth, status: "CARIES_DRAFT", surface: "Oclusal", note: item.payload.note });
            }
            confirmed = true;
          }
        } else if (item.type === "CREAR_CITA" && item.payload) {
          this.createAppointment(item.payload);
          confirmed = true;
        } else {
          confirmed = true;
        }

        if (confirmed) {
          appliedCount++;
          // Registrar confirmación auditada en el log outbox
          this.state.offlineSyncLog.unshift({
            mutationId: item.id,
            type: item.type,
            status: "CONFIRMED_COMMITTED",
            syncedAt: new Date().toISOString(),
            payload: item.payload
          });
          this.logAuditEvent("SYNC_OFFLINE_CONFIRMADO", "Mutación " + item.id + " (" + item.type + ") confirmada y persistida en backend.");
        } else {
          remainingQueue.push(item);
        }
      } catch(e) {
        console.error("Fallo de sincronización para mutación " + item.id + ":", e);
        item.status = "FAILED_RETRY_PENDING";
        item.lastError = e.message;
        remainingQueue.push(item);
      }
    });

    this.saveState();
    // Se conservan exclusivamente las mutaciones pendientes de confirmación o con error
    sessionStorage.setItem('sillar_offline_queue', JSON.stringify(remainingQueue));
    return appliedCount;
  }

  getTenants() {
    if (!this.state.tenants || this.state.tenants.length === 0) {
      this.state.tenants = JSON.parse(JSON.stringify(SEED_V2.tenants || []));
      this.saveState();
    }
    return this.state.tenants;
  }

  getTenantById(id) {
    return this.getTenants().find(t => t.id === id) || null;
  }

  getActiveTenant() {
    const activeId = this.state.activeTenantId || "tenant_sillar_yanahuara";
    return this.getTenantById(activeId) || this.getTenants()[0];
  }

  setActiveTenant(tenantId) {
    const tenant = this.getTenantById(tenantId);
    if (tenant) {
      this.state.activeTenantId = tenantId;
      this.logAuditEvent("CAMBIO_TENANT_ACTIVO", "Super Admin conmutó contexto a clínica: " + tenant.name + " (" + tenant.id + ")");
      this.saveState();
      return tenant;
    }
    return null;
  }

  getSaaSMetrics() {
    const tenants = this.getTenants();
    const active = tenants.filter(t => t.status === "ACTIVE");
    const trials = tenants.filter(t => t.status === "TRIAL");
    const suspended = tenants.filter(t => t.status === "SUSPENDED");
    
    const mrr = active.reduce((acc, t) => acc + (t.monthlyFee || 0), 0);
    const totalChairs = tenants.reduce((acc, t) => acc + (t.chairsUsed || 0), 0);
    const totalPatients = tenants.reduce((acc, t) => acc + (t.patientsCount || 0), 0);
    const totalPractitioners = tenants.reduce((acc, t) => acc + (t.practitionersCount || 0), 0);

    return {
      totalTenants: tenants.length,
      activeCount: active.length,
      trialCount: trials.length,
      suspendedCount: suspended.length,
      mrr: mrr,
      currency: "PEN",
      totalChairs: totalChairs,
      totalPatients: totalPatients,
      totalPractitioners: totalPractitioners
    };
  }

  createTenant(data) {
    const tenants = this.getTenants();
    const cleanSlug = (data.slug || data.name || "clinica").toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 16);
    const tenantId = "tenant_" + cleanSlug + "_" + Math.floor(Math.random() * 900 + 100);
    
    const plansFees = {
      STARTER: 149,
      PRO: 389,
      ENTERPRISE: 799
    };
    const plan = data.plan || "PRO";

    const newTenant = {
      id: tenantId,
      name: data.name || "Nueva Clínica Odontológica",
      legalName: data.legalName || data.name || "Razón Social S.A.C.",
      slug: cleanSlug,
      subdomain: cleanSlug + ".sillardental.pe",
      customDomain: data.customDomain || null,
      sslStatus: data.customDomain ? "PROVISIONING" : "ACTIVE_VALID",
      ruc: data.ruc || "20" + Math.floor(Math.random() * 899999999 + 100000000),
      plan: plan,
      status: data.status || "ACTIVE",
      chairsLimit: parseInt(data.chairsLimit || (plan === 'STARTER' ? 1 : plan === 'PRO' ? 4 : 15), 10),
      chairsUsed: 1,
      practitionersCount: 1,
      patientsCount: 0,
      monthlyFee: plansFees[plan] || 389,
      currency: "PEN",
      billingCycle: "MONTHLY",
      nextBillingDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      adminName: data.adminName || "Director Odontológico",
      adminEmail: data.adminEmail || ("contacto@" + cleanSlug + ".pe"),
      adminPhone: data.adminPhone || "+51 900 000 000",
      city: data.city || "Arequipa",
      address: data.address || "Sede Central",
      modules: {
        pacs3d: data.modules ? !!data.modules.pacs3d : true,
        digitalSignature: data.modules ? !!data.modules.digitalSignature : true,
        sunatElectronicBilling: data.modules ? !!data.modules.sunatElectronicBilling : true,
        whatsappReminders: data.modules ? !!data.modules.whatsappReminders : true,
        multiChair: plan !== 'STARTER',
        inventory: data.modules ? !!data.modules.inventory : true
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    tenants.push(newTenant);
    this.state.tenants = tenants;
    this.logAuditEvent("ALTA_TENANT_SAAS", "Super Admin registró nueva clínica: " + newTenant.name + " (" + newTenant.subdomain + ") Plan: " + newTenant.plan);
    this.saveState();
    return newTenant;
  }

  updateTenant(id, patch) {
    const tenants = this.getTenants();
    const idx = tenants.findIndex(t => t.id === id);
    if (idx !== -1) {
      if (patch.plan && patch.plan !== tenants[idx].plan) {
        const plansFees = { STARTER: 149, PRO: 389, ENTERPRISE: 799 };
        patch.monthlyFee = plansFees[patch.plan] || tenants[idx].monthlyFee;
      }
      Object.assign(tenants[idx], patch);
      this.state.tenants = tenants;
      this.logAuditEvent("ACTUALIZAR_TENANT_SAAS", "Super Admin modificó datos de clínica: " + tenants[idx].name + " (Estado: " + tenants[idx].status + ")");
      this.saveState();
      return tenants[idx];
    }
    return null;
  }

  toggleTenantStatus(id) {
    const tenant = this.getTenantById(id);
    if (tenant) {
      const nextStatus = tenant.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
      const res = this.updateTenant(id, {
        status: nextStatus,
        suspendedReason: nextStatus === "SUSPENDED" ? "Suspensión administrativa preventiva o corte por facturación." : null
      });
      return res;
    }
    return null;
  }

  deleteTenant(id) {
    const tenants = this.getTenants();
    const target = tenants.find(t => t.id === id);
    if (target) {
      this.state.tenants = tenants.filter(t => t.id !== id);
      this.logAuditEvent("BAJA_TENANT_SAAS", "Super Admin eliminó el tenant/clínica: " + target.name + " (" + target.subdomain + ")");
      this.saveState();
      return true;
    }
    return false;
  }

  getPayments(patientId = null) {
    if (!this.state.payments) {
      this.state.payments = JSON.parse(JSON.stringify(SEED_V2.payments || []));
      this.saveState();
    }
    if (patientId) {
      return this.state.payments.filter(p => p.patientId === patientId);
    }
    return this.state.payments;
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
    // Estricto aislamiento por fecha (INT-005): Si no hay citas, devuelve array vacío
    return all.filter(a => a.date === dateStr);
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
    if (!aptData || !aptData.date) {
      throw new Error("Datos de cita incompletos.");
    }

    // Control estricto de solapamiento de horario por duración de intervalo (INT-004)
    if (aptData.chairId && aptData.time) {
      const parseTimeToMinutes = (t) => {
        if (!t) return 0;
        const match = t.match(/(\d{1,2}):(\d{2})(?:\s*([AP]M))?/i);
        if (!match) return 0;
        let h = parseInt(match[1], 10);
        const m = parseInt(match[2], 10);
        const mer = match[3] ? match[3].toUpperCase() : null;
        if (mer === 'PM' && h < 12) h += 12;
        if (mer === 'AM' && h === 12) h = 0;
        return h * 60 + m;
      };

      const newStart = parseTimeToMinutes(aptData.startTime || aptData.time);
      const newDuration = parseInt(aptData.durationMinutes || aptData.duration, 10) || 30;
      const newEnd = newStart + newDuration;

      const conflict = all.find(a => {
        if (a.date !== aptData.date || a.chairId !== aptData.chairId || a.status === "CANCELLED") return false;
        const exStart = parseTimeToMinutes(a.startTime || a.time);
        const exDuration = parseInt(a.durationMinutes || a.duration, 10) || 30;
        const exEnd = exStart + exDuration;
        // Dos intervalos se solapan si startA < endB && endA > startB
        return exStart < newEnd && exEnd > newStart;
      });

      if (conflict) {
        throw new Error("Conflicto de sillón: Ya existe una cita en " + (aptData.chair || aptData.chairId) + " (" + conflict.time + ", " + conflict.patientName + ") que se solapa con el intervalo solicitado (" + aptData.time + " por " + newDuration + " min).");
      }
    }

    const newApt = {
      id: "apt_" + Math.floor(Math.random() * 90000 + 10000),
      organizationId: aptData.organizationId || "tenant_sillar_yanahuara",
      siteId: aptData.siteId || "site_yanahuara_01",
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
    if (!patientId) return null;
    if (!this.state.treatmentPlans) {
      this.state.treatmentPlans = {};
      if (this.state.treatmentPlan) {
        this.state.treatmentPlans["pat_maria"] = this.state.treatmentPlan;
      }
    }
    if (!this.state.treatmentPlans[patientId]) {
      if (patientId === "pat_maria") {
        this.state.treatmentPlans["pat_maria"] = JSON.parse(JSON.stringify(SEED_V2.treatmentPlan || {
          id: "plan_maria_orto",
          organizationId: "tenant_sillar_yanahuara",
          siteId: "site_yanahuara_01",
          patientId: "pat_maria",
          planName: "Plan Integral Ortodoncia & Alineadores Invisibles",
          status: "ACCEPTED",
          grossTotal: 3850,
          totalDiscount: 350,
          totalEpsCoverage: 0,
          totalCost: 3500,
          paidAmount: 2100,
          balanceDue: 1400,
          phases: [
            {
              id: "ph_01",
              name: "Fase 1: Higiene & Profilaxis",
              status: "COMPLETED",
              items: [{ id: "tx_01", tooth: "General", procedure: "Profilaxis Ultrasónica", fee: 150, netFee: 150, status: "EXECUTED" }]
            },
            {
              id: "ph_02",
              name: "Fase 2: Alineación 3D",
              status: "IN_PROGRESS",
              items: [{ id: "tx_02", tooth: "Arcada Sup/Inf", procedure: "Set Alineadores 3D", fee: 2100, netFee: 2100, status: "IN_PROGRESS" }]
            }
          ]
        }));
      } else if (patientId === "pat_carlos") {
        this.state.treatmentPlans["pat_carlos"] = {
          id: "plan_carlos_implante",
          organizationId: "tenant_sillar_yanahuara",
          siteId: "site_yanahuara_01",
          patientId: "pat_carlos",
          planName: "Plan Quirúrgico & Rehabilitación sobre Implantes (Pieza #46)",
          status: "ACCEPTED",
          grossTotal: 2850,
          totalDiscount: 0,
          totalEpsCoverage: 0,
          totalCost: 2850,
          paidAmount: 1500,
          balanceDue: 1350,
          phases: [
            {
              id: "ph_c_01",
              name: "Fase 1: Implantología & Cirugía Guiada",
              status: "IN_PROGRESS",
              items: [
                { id: "tx_c01", tooth: 46, procedure: "Colocación de Implante Neodent Helix GM", fee: 1500, netFee: 1500, status: "EXECUTED" },
                { id: "tx_c02", tooth: 46, procedure: "Corona sobre Implante en Zirconio Monolítico", fee: 850, netFee: 850, status: "PENDING" },
                { id: "tx_c03", tooth: "General", procedure: "Tomografía Cone Beam 3D Mandibular", fee: 500, netFee: 500, status: "EXECUTED" }
              ]
            }
          ]
        };
      } else {
        // Aislamiento estricto (SEC-005): Paciente inexistente no recibe el plan de María
        return null;
      }
      this.saveState();
    }
    return this.state.treatmentPlans[patientId];
  }

  getOdontogramEvolution(patientId = "pat_maria") {
    if (!patientId) return { patientId: null, evolutionTeeth: [] };
    if (!this.state.odontogramEvolutions) {
      this.state.odontogramEvolutions = {};
      if (this.state.odontogramEvolution) {
        this.state.odontogramEvolutions["pat_maria"] = this.state.odontogramEvolution;
      }
    }
    if (!this.state.odontogramEvolutions[patientId]) {
      if (patientId === "pat_maria") {
        this.state.odontogramEvolutions["pat_maria"] = JSON.parse(JSON.stringify(SEED_V2.odontogramEvolution || {
          patientId: "pat_maria",
          organizationId: "tenant_sillar_yanahuara",
          siteId: "site_yanahuara_01",
          evolutionTeeth: [
            {
              number: 21,
              status: "RESTORED",
              treatment: "Restauración Resina Nanoparticulada",
              executedDate: "2026-09-08",
              stage: "EVOLUCION_REALIZADA",
              doctor: "Dra. Ana Flores Vanesa (COP 18240)"
            }
          ]
        }));
      } else if (patientId === "pat_carlos") {
        this.state.odontogramEvolutions["pat_carlos"] = {
          patientId: "pat_carlos",
          organizationId: "tenant_sillar_yanahuara",
          siteId: "site_yanahuara_01",
          evolutionTeeth: [
            {
              number: 46,
              status: "IMPLANT_PLACED",
              treatment: "Implante Neodent Helix GM 3.75x10mm",
              executedDate: "2026-09-08",
              stage: "FASE_QUIRURGICA_CONCLUIDA",
              doctor: "Dr. Carlos Mendoza Ramos (COP 15420)"
            }
          ]
        };
      } else {
        // Aislamiento estricto: evolución vacía para pacientes sin registro
        return { patientId: patientId, evolutionTeeth: [] };
      }
      this.saveState();
    }
    return this.state.odontogramEvolutions[patientId];
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
      this.state.imagingStudies = JSON.parse(JSON.stringify(SEED_V2.imagingStudies || []));
      this.saveState();
    }
    if (!patientId) return [];
    // Aislamiento estricto por paciente (SEC-005)
    return this.state.imagingStudies.filter(s => s.patientId === patientId);
  }

  getImagingStudyById(studyId) {
    if (!this.state.imagingStudies) {
      this.state.imagingStudies = JSON.parse(JSON.stringify(SEED_V2.imagingStudies || []));
      this.saveState();
    }
    // Nunca devolver fallback del primer paciente si no existe (SEC-005)
    return this.state.imagingStudies.find(s => s.id === studyId) || null;
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
    if (!this.state.documents) {
      this.state.documents = JSON.parse(JSON.stringify(SEED_V2.documents || []));
      this.saveState();
    }
    if (!patientId) return [];
    // Aislamiento estricto: devuelve exclusivamente los documentos de este paciente
    return this.state.documents.filter(d => d.patientId === patientId);
  }

  getDocumentById(docId) {
    if (!this.state.documents) {
      this.state.documents = JSON.parse(JSON.stringify(SEED_V2.documents || []));
      this.saveState();
    }
    // Si no se encuentra el documento, devuelve null (sin fallback cruzado)
    return this.state.documents.find(d => d.id === docId) || null;
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

    if (plan.phases && plan.phases.length > 0) {
      plan.phases.forEach(ph => {
        (ph.items || []).forEach(it => {
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
    } else {
      netTotal = typeof plan.totalCost === 'number' ? plan.totalCost : 0;
    }

    // Ajustar saldo pendiente diferenciando explícitamente 0 de undefined (INT-001)
    const paidAmount = typeof plan.paidAmount === 'number' ? plan.paidAmount : (plan.paidAmount != null ? Number(plan.paidAmount) : 0);
    plan.paidAmount = paidAmount;
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
    if (!plan) return [];

    // Si el saldo es 0 o negativo, NO se generan cobros (INT-002)
    const balance = typeof plan.balanceDue === 'number' ? plan.balanceDue : 0;
    if (balance <= 0) {
      this.logAuditEvent("CRONOGRAMA_RECHAZADO", "Plan no tiene saldo pendiente por financiar (Saldo: S/ 0.00)");
      return [];
    }

    // Idempotencia estricta (INT-003): Si ya se generó un cronograma para este plan y paciente, devolverlo
    if (!this.state.payments) {
      this.state.payments = JSON.parse(JSON.stringify(SEED_V2.payments || []));
    }
    const existingForPlan = this.state.payments.filter(p => p.planId === plan.id && p.patientId === patientId);
    if (existingForPlan.length > 0) {
      // Retorna única y exclusivamente las cuotas de este plan (sin mezclar con recibos históricos)
      return existingForPlan;
    }

    let installments = [];

    if (modality === "CONTADO") {
      const discounted = balance * 0.90; // 10% pronto pago
      installments.push({
        id: "pay_gen_" + Date.now() + "_1",
        patientId: patientId,
        organizationId: plan.organizationId || "tenant_sillar_yanahuara",
        siteId: plan.siteId || "site_yanahuara_01",
        planId: plan.id,
        installmentIndex: 1,
        totalInstallments: 1,
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
          patientId: patientId,
          organizationId: plan.organizationId || "tenant_sillar_yanahuara",
          siteId: plan.siteId || "site_yanahuara_01",
          planId: plan.id,
          installmentIndex: 1,
          totalInstallments: 3,
          concept: "Cuota 01/03 (40% Inicial) — " + plan.planName,
          amount: cuota1,
          dueDate: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 2).toISOString().slice(0, 10),
          status: "PENDING",
          paidDate: null,
          method: "POS Niubiz"
        },
        {
          id: "pay_gen_" + Date.now() + "_2",
          patientId: patientId,
          organizationId: plan.organizationId || "tenant_sillar_yanahuara",
          siteId: plan.siteId || "site_yanahuara_01",
          planId: plan.id,
          installmentIndex: 2,
          totalInstallments: 3,
          concept: "Cuota 02/03 (30% Avance) — " + plan.planName,
          amount: cuota2,
          dueDate: new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()).toISOString().slice(0, 10),
          status: "PENDING",
          paidDate: null,
          method: "Transferencia / Yape"
        },
        {
          id: "pay_gen_" + Date.now() + "_3",
          patientId: patientId,
          organizationId: plan.organizationId || "tenant_sillar_yanahuara",
          siteId: plan.siteId || "site_yanahuara_01",
          planId: plan.id,
          installmentIndex: 3,
          totalInstallments: 3,
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
          patientId: patientId,
          organizationId: plan.organizationId || "tenant_sillar_yanahuara",
          siteId: plan.siteId || "site_yanahuara_01",
          planId: plan.id,
          installmentIndex: i,
          totalInstallments: 6,
          concept: "Cuota 0" + i + "/06 (Financiamiento Dental) — " + plan.planName,
          amount: amt,
          dueDate: new Date(d.getFullYear(), d.getMonth() + (i - 1), d.getDate() + 5).toISOString().slice(0, 10),
          status: i === 1 ? "PENDING" : "SCHEDULED",
          paidDate: null,
          method: "Débito Automático / POS"
        });
      }
    }

    plan.scheduleModality = modality;
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
        bloodPressure: triageData.bloodPressure || null,
        heartRate: typeof triageData.heartRate === 'number' ? triageData.heartRate : null,
        spO2: typeof triageData.spO2 === 'number' ? triageData.spO2 : null,
        temperature: typeof triageData.temperature === 'number' ? triageData.temperature : null,
        alerts: Array.isArray(triageData.alerts) ? triageData.alerts : [],
        notes: triageData.notes || "Paciente ingresó a sala de espera."
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
