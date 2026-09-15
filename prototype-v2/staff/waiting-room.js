// =========================================================================
// SILLAR DENTAL - SALA DE ESPERA, TRIAJE & CONTROL DE FLUJO EN RECEPCIÓN
// =========================================================================

export function renderWaitingRoom(main, mockApi, showToast) {
  const allAppts = mockApi.getAllAppointments();
  const todayStr = "2026-09-08";
  
  // Filtrar citas del día
  const todayAppts = allAppts.filter(a => a.date === todayStr);
  const waitlist = mockApi.getWaitlist();

  // Categorización de columnas
  const scheduled = todayAppts.filter(a => a.status === "SCHEDULED" || a.status === "CONFIRMED");
  const inWaiting = todayAppts.filter(a => a.status === "IN_WAITING_ROOM");
  const inChair = todayAppts.filter(a => a.status === "IN_CHAIR");
  const completed = todayAppts.filter(a => a.status === "COMPLETED");

  // Helper para cálculo de tiempo transcurrido
  function getWaitMinutes(appt) {
    if (appt.checkedInTimestamp) {
      return Math.max(1, Math.round((Date.now() - appt.checkedInTimestamp) / 60000));
    }
    if (appt.id === "apt_103") return 17; // Alerta crítica (> 15)
    if (appt.id === "apt_104") return 11; // Alerta moderada (10-15)
    return 6; // Normal (< 10)
  }

  function getWaitPillHtml(mins) {
    if (mins > 15) {
      return `<span class="wr-wait-pill alert" title="Demora crítica superior a 15 minutos">⚠️ ${mins} min (Demora Crítica)</span>`;
    } else if (mins >= 10) {
      return `<span class="wr-wait-pill warn" title="Tiempo de espera en moderación">⏱️ ${mins} min (Moderado)</span>`;
    } else {
      return `<span class="wr-wait-pill ok" title="Tiempo dentro del rango normal">✅ ${mins} min (A tiempo)</span>`;
    }
  }

  main.innerHTML = `
    <div class="staff-container wr-container">
      <!-- CABECERA -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <h1 style="margin: 0; font-size: 1.85rem; font-weight: 800; color: #0F172A;">Control de Sala de Espera & Triaje</h1>
            <span class="chip chip-success" style="font-size: 0.75rem; padding: 3px 10px;">En Vivo · Sede Yanahuara</span>
          </div>
          <p class="muted" style="margin: 4px 0 0; color: #64748B; font-weight: 500;">
            Recepción, triaje de signos vitales, control de tiempos de espera y asignación a sillones clínicos.
          </p>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-secondary" id="wrBtnAddWaitlist" style="font-size: 0.8rem; padding: 8px 14px;">
            ➕ Registrar en Lista de Espera
          </button>
          <button class="btn btn-primary" id="wrBtnRefresh" style="font-size: 0.8rem; padding: 8px 14px;">
            🔄 Actualizar Tiempos
          </button>
        </div>
      </div>

      <!-- TARJETAS DE ESTADÍSTICAS OPERATIVAS -->
      <div class="wr-header-stats">
        <div class="wr-stat-card">
          <div class="wr-stat-icon waiting">⏳</div>
          <div>
            <div class="wr-stat-val">${inWaiting.length}</div>
            <div class="wr-stat-lbl">En Sala de Espera</div>
          </div>
        </div>
        <div class="wr-stat-card">
          <div class="wr-stat-icon chair">🩺</div>
          <div>
            <div class="wr-stat-val">${inChair.length}</div>
            <div class="wr-stat-lbl">En Sillón Dental</div>
          </div>
        </div>
        <div class="wr-stat-card">
          <div class="wr-stat-icon completed">✅</div>
          <div>
            <div class="wr-stat-val">${completed.length}</div>
            <div class="wr-stat-lbl">Atenciones Concluidas</div>
          </div>
        </div>
        <div class="wr-stat-card">
          <div class="wr-stat-icon waitlist">📋</div>
          <div>
            <div class="wr-stat-val">${waitlist.length}</div>
            <div class="wr-stat-lbl">Pacientes en Espera Activa</div>
          </div>
        </div>
      </div>

      <!-- TABLERO KANBAN DE FLUJO DE ATENCIÓN -->
      <div class="wr-flow-board">
        <!-- COLUMNA 1: PROGRAMADAS / POR LLEGAR -->
        <div class="wr-column wr-col-scheduled">
          <div class="wr-column-header">
            <div class="wr-col-title">
              <span>📅</span>
              <span>Programadas (${scheduled.length})</span>
            </div>
            <span class="wr-badge-count">${scheduled.length}</span>
          </div>
          <div class="wr-cards-container" id="wrColScheduled">
            ${scheduled.length === 0 ? '<div style="font-size:0.8rem;color:#94A3B8;text-align:center;padding:24px 0;">No hay citas pendientes para hoy</div>' : ''}
            ${scheduled.map(a => `
              <div class="wr-card" data-id="${a.id}">
                <div class="wr-card-header">
                  <span class="wr-card-patient">${a.patientName}</span>
                  <span class="wr-card-time">${a.time}</span>
                </div>
                <div class="wr-card-specialty">🔬 ${a.specialty || 'Odontología General'}</div>
                <div class="wr-card-doctor">👨‍⚕️ ${a.practitioner || 'Dra. Ana Flores'}</div>
                <div style="font-size: 0.72rem; color: #64748B;">Motivo: ${a.reason || 'Consulta'}</div>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.72rem; color: #16A34A; margin-top: 4px;">
                  <span>💬 Confirmado WhatsApp</span>
                  <span style="color:#64748B;">${a.chair || 'Sillón asignado'}</span>
                </div>
                <div class="wr-card-actions">
                  <button class="wr-btn-action checkin btn-checkin" data-id="${a.id}" data-patient="${a.patientName}">
                    ⚡ Check-in & Triaje
                  </button>
                  <button class="wr-btn-action danger btn-noshow" data-id="${a.id}" data-patient="${a.patientName}" title="Marcar inasistencia o cancelación">
                    ❌ Cancelar
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- COLUMNA 2: EN SALA DE ESPERA -->
        <div class="wr-column wr-col-waiting">
          <div class="wr-column-header">
            <div class="wr-col-title">
              <span>🛋️</span>
              <span>En Sala (${inWaiting.length})</span>
            </div>
            <span class="wr-badge-count">${inWaiting.length}</span>
          </div>
          <div class="wr-cards-container" id="wrColWaiting">
            ${inWaiting.length === 0 ? '<div style="font-size:0.8rem;color:#94A3B8;text-align:center;padding:24px 0;">Sala de espera vacía</div>' : ''}
            ${inWaiting.map(a => {
              const mins = getWaitMinutes(a);
              const triage = a.triage || { bloodPressure: "120/80 mmHg", heartRate: 72, spO2: 98, temperature: 36.6 };
              return `
                <div class="wr-card" data-id="${a.id}" style="border-left: 4px solid ${mins > 15 ? '#DC2626' : (mins >= 10 ? '#D97706' : '#10B981')};">
                  <div class="wr-card-header">
                    <span class="wr-card-patient">${a.patientName}</span>
                    <span class="wr-card-time">Ingreso: ${a.checkedInAt || a.time}</span>
                  </div>
                  <div>${getWaitPillHtml(mins)}</div>
                  <div class="wr-card-specialty">🔬 ${a.specialty || 'Tratamiento'}</div>
                  <div class="wr-card-doctor">👨‍⚕️ ${a.practitioner || 'Dra. Ana Flores'}</div>
                  <div class="wr-card-triage">
                    <div><strong>PA:</strong> ${triage.bloodPressure || '120/80'}</div>
                    <div><strong>FC:</strong> ${triage.heartRate || 72} lpm</div>
                    <div><strong>SpO2:</strong> ${triage.spO2 || 98}%</div>
                    <div><strong>T°:</strong> ${triage.temperature || 36.5}°C</div>
                  </div>
                  <div class="wr-card-actions">
                    <div style="display: flex; gap: 4px; width: 100%;">
                      <button class="wr-btn-action call btn-call-chair" data-id="${a.id}" data-chair="chair_1" title="Llamar a Sillón 1 (Ortodoncia)">
                        🔔 Sillón 1
                      </button>
                      <button class="wr-btn-action call btn-call-chair" data-id="${a.id}" data-chair="chair_2" title="Llamar a Sillón 2 (Cirugía/Rehab)">
                        🔔 Sillón 2
                      </button>
                      <button class="wr-btn-action call btn-call-chair" data-id="${a.id}" data-chair="chair_3" title="Llamar a Sillón 3 (Pediatría)">
                        🔔 Sillón 3
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- COLUMNA 3: EN SILLÓN CLÍNICO -->
        <div class="wr-column wr-col-chair">
          <div class="wr-column-header">
            <div class="wr-col-title">
              <span>💺</span>
              <span>En Sillón (${inChair.length})</span>
            </div>
            <span class="wr-badge-count">${inChair.length}</span>
          </div>
          <div class="wr-cards-container" id="wrColChair">
            ${inChair.length === 0 ? '<div style="font-size:0.8rem;color:#94A3B8;text-align:center;padding:24px 0;">No hay pacientes en sillón actualmente</div>' : ''}
            ${inChair.map(a => `
              <div class="wr-card" data-id="${a.id}" style="border-left: 4px solid #0D9488;">
                <div class="wr-card-header">
                  <span class="wr-card-patient">${a.patientName}</span>
                  <span class="wr-card-chair-tag">${a.chair || 'Sillón Activo'}</span>
                </div>
                <div class="wr-card-specialty">🔬 ${a.specialty || 'Tratamiento Integral'}</div>
                <div class="wr-card-doctor">👨‍⚕️ ${a.practitioner || 'Dr. Especialista'}</div>
                <div style="font-size: 0.75rem; color: #475569; background: #F8FAFC; padding: 6px 8px; border-radius: 6px; border: 1px solid #E2E8F0;">
                  📝 ${a.reason || 'Procedimiento en curso'}
                </div>
                <div class="wr-card-actions">
                  <a href="?view=patient&patient=${a.patientId || 'pat_maria'}&tab=evolution" class="wr-btn-action secondary" style="text-decoration:none;">
                    🦷 Odontograma
                  </a>
                  <button class="wr-btn-action finish btn-finish-session" data-id="${a.id}" data-patient="${a.patientName}">
                    ✅ Concluir
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- COLUMNA 4: CONCLUIDAS DEL DÍA -->
        <div class="wr-column wr-col-completed">
          <div class="wr-column-header">
            <div class="wr-col-title">
              <span>✔️</span>
              <span>Concluidas (${completed.length})</span>
            </div>
            <span class="wr-badge-count">${completed.length}</span>
          </div>
          <div class="wr-cards-container" id="wrColCompleted">
            ${completed.length === 0 ? '<div style="font-size:0.8rem;color:#94A3B8;text-align:center;padding:24px 0;">Aún no hay atenciones concluidas hoy</div>' : ''}
            ${completed.map(a => `
              <div class="wr-card" data-id="${a.id}" style="opacity: 0.9;">
                <div class="wr-card-header">
                  <span class="wr-card-patient">${a.patientName}</span>
                  <span class="wr-card-time" style="background:#ECFDF5;color:#065F46;">Finalizado ${a.completedAt || 'Hoy'}</span>
                </div>
                <div class="wr-card-specialty">🔬 ${a.specialty || 'Tratamiento'}</div>
                <div class="wr-card-doctor">👨‍⚕️ Atendido por: ${a.practitioner || 'Dra. Flores'}</div>
                <div style="font-size: 0.72rem; color: #64748B;">Notas: ${a.clinicalNotes || a.notes || 'Procedimiento concluido sin incidencias.'}</div>
                <div class="wr-card-actions">
                  <a href="?view=finance" class="wr-btn-action secondary" style="text-decoration:none;">
                    💳 Ir a Caja
                  </a>
                  <a href="?view=documents" class="wr-btn-action secondary" style="text-decoration:none;">
                    📄 Receta / Ficha
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECCIÓN: LISTA DE ESPERA ACTIVA & RELLENO DE CANCELACIONES -->
      <div class="wr-waitlist-section">
        <div class="wr-waitlist-header">
          <div>
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 8px;">
              <span>📋</span>
              <span>Lista de Espera Activa & Relleno Inteligente de Cancelaciones</span>
            </h3>
            <p style="margin: 4px 0 0; font-size: 0.8rem; color: #64748B;">
              Pacientes con disponibilidad prioritaria para cubrir huecos de agenda o cancelaciones de último minuto.
            </p>
          </div>
          <span class="badge badge-info" style="font-size: 0.75rem;">${waitlist.length} en espera activa</span>
        </div>

        <div class="wr-waitlist-grid">
          ${waitlist.length === 0 ? '<div style="font-size:0.85rem;color:#94A3B8;">No hay pacientes registrados en lista de espera.</div>' : ''}
          ${waitlist.map(w => `
            <div class="wr-waitlist-item">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <strong style="font-size: 0.88rem; color: #0F172A;">${w.patientName}</strong>
                <span class="wr-urgency-badge ${w.urgency}">${w.urgency === 'HIGH' ? 'Urgencia Alta' : (w.urgency === 'MODERATE' ? 'Moderada' : 'Normal')}</span>
              </div>
              <div style="font-size: 0.78rem; color: #0E7060; font-weight: 600;">Especialidad: ${w.preferredSpecialty}</div>
              <div style="font-size: 0.75rem; color: #475569;">📞 Tel: ${w.phone} · ⏰ Disp: ${w.preferredTime}</div>
              <div style="font-size: 0.72rem; color: #64748B; font-style: italic;">"${w.notes}"</div>
              <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.7rem; color: #94A3B8;">Reg: ${w.registeredAt}</span>
                <button class="wr-btn-action checkin btn-assign-waitlist" data-id="${w.id}" data-patient="${w.patientName}" style="font-size: 0.72rem; padding: 4px 10px;">
                  ⚡ Asignar a Cupo de Hoy
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- MODAL DE TRIAJE RÁPIDO -->
    <div id="wrModalTriage" class="wr-modal-overlay" style="display: none;">
      <div class="wr-modal-card">
        <div class="wr-modal-header">
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: white;">Triaje de Ingreso a Sala de Espera</h3>
            <span id="wrTriagePatientName" style="font-size: 0.8rem; opacity: 0.9; color: white;">Paciente</span>
          </div>
          <button id="wrBtnCloseTriage" style="background: none; border: none; color: white; font-size: 1.25rem; cursor: pointer;">&times;</button>
        </div>
        <div class="wr-modal-body">
          <div class="wr-triage-grid">
            <div class="wr-input-group">
              <label class="wr-input-label">Presión Arterial (PA)</label>
              <input type="text" id="triagePA" class="wr-input-field" value="120/80 mmHg" placeholder="120/80 mmHg" />
            </div>
            <div class="wr-input-group">
              <label class="wr-input-label">Frecuencia Cardíaca (FC)</label>
              <input type="number" id="triageFC" class="wr-input-field" value="74" placeholder="72 lpm" />
            </div>
            <div class="wr-input-group">
              <label class="wr-input-label">Saturación SpO2 (%)</label>
              <input type="number" id="triageSpO2" class="wr-input-field" value="98" placeholder="98 %" />
            </div>
            <div class="wr-input-group">
              <label class="wr-input-label">Temperatura (°C)</label>
              <input type="number" step="0.1" id="triageTemp" class="wr-input-field" value="36.6" placeholder="36.5 °C" />
            </div>
          </div>

          <div class="wr-input-group">
            <label class="wr-input-label">Alertas Clínicas y Antecedentes Inmediatos</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem; color: #334155; margin-top: 4px;">
              <label style="display: flex; align-items: center; gap: 6px;">
                <input type="checkbox" id="chkAlergiaPenicilina" /> Alergia a Penicilina
              </label>
              <label style="display: flex; align-items: center; gap: 6px;">
                <input type="checkbox" id="chkAlergiaLatex" /> Alergia a Látex
              </label>
              <label style="display: flex; align-items: center; gap: 6px;">
                <input type="checkbox" id="chkHipertension" /> Hipertensión Arterial
              </label>
              <label style="display: flex; align-items: center; gap: 6px;">
                <input type="checkbox" id="chkDiabetes" /> Diabetes Tipo 2
              </label>
            </div>
          </div>

          <div class="wr-input-group">
            <label class="wr-input-label">Observaciones de Recepción</label>
            <textarea id="triageNotes" class="wr-input-field" rows="2" placeholder="Paciente asintomático agudo, acude puntual..."></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px;">
            <button class="btn btn-secondary" id="wrBtnCancelTriage" style="font-size: 0.82rem;">Cancelar</button>
            <button class="btn btn-primary" id="wrBtnConfirmTriage" style="font-size: 0.82rem;">
              ✅ Confirmar Ingreso a Sala
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE AGREGAR A LISTA DE ESPERA -->
    <div id="wrModalAddWaitlist" class="wr-modal-overlay" style="display: none;">
      <div class="wr-modal-card">
        <div class="wr-modal-header" style="background: #0284C7;">
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: white;">Registrar Paciente en Lista de Espera</h3>
            <span style="font-size: 0.8rem; opacity: 0.9; color: white;">Overbooking & Relleno de Cancelaciones</span>
          </div>
          <button id="wrBtnCloseWaitlistModal" style="background: none; border: none; color: white; font-size: 1.25rem; cursor: pointer;">&times;</button>
        </div>
        <div class="wr-modal-body">
          <div class="wr-input-group">
            <label class="wr-input-label">Nombre del Paciente</label>
            <input type="text" id="wlName" class="wr-input-field" placeholder="Ej. Roberto Huamán Cornejo" />
          </div>
          <div class="wr-input-group">
            <label class="wr-input-label">Teléfono / WhatsApp</label>
            <input type="text" id="wlPhone" class="wr-input-field" placeholder="+51 954 123 456" />
          </div>
          <div class="wr-triage-grid">
            <div class="wr-input-group">
              <label class="wr-input-label">Especialidad Requerida</label>
              <select id="wlSpecialty" class="wr-input-field">
                <option value="Ortodoncia">Ortodoncia</option>
                <option value="Periodoncia">Periodoncia</option>
                <option value="Implantología">Implantología</option>
                <option value="Endodoncia">Endodoncia</option>
                <option value="Odontopediatría">Odontopediatría</option>
                <option value="Rehabilitación Oral">Rehabilitación Oral</option>
              </select>
            </div>
            <div class="wr-input-group">
              <label class="wr-input-label">Nivel de Urgencia</label>
              <select id="wlUrgency" class="wr-input-field">
                <option value="LOW">Normal (Control preventivo)</option>
                <option value="MODERATE" selected>Moderada (Dolor leve o urgencia estética)</option>
                <option value="HIGH">Alta (Dolor agudo / molestia)</option>
              </select>
            </div>
          </div>
          <div class="wr-input-group">
            <label class="wr-input-label">Horario Preferente</label>
            <input type="text" id="wlTime" class="wr-input-field" placeholder="Ej. Cualquier horario tarde a partir de las 3:00 PM" />
          </div>
          <div class="wr-input-group">
            <label class="wr-input-label">Notas Adicionales</label>
            <textarea id="wlNotes" class="wr-input-field" rows="2" placeholder="Disponibilidad inmediata si le avisan con 30 min de anticipación..."></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px;">
            <button class="btn btn-secondary" id="wrBtnCancelWaitlistModal" style="font-size: 0.82rem;">Cancelar</button>
            <button class="btn btn-primary" id="wrBtnSaveWaitlist" style="font-size: 0.82rem; background: #0284C7;">
              💾 Guardar en Lista de Espera
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // EVENT HANDLERS & INTERACTIONS
  let currentTriageApptId = null;

  // Actualizar
  document.getElementById("wrBtnRefresh")?.addEventListener("click", () => {
    renderWaitingRoom(main, mockApi, showToast);
    showToast("Tiempos de espera actualizados", "info");
  });

  // Check-in & Triage button clicks
  document.querySelectorAll(".btn-checkin").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      const name = e.currentTarget.getAttribute("data-patient");
      currentTriageApptId = id;
      document.getElementById("wrTriagePatientName").textContent = name + " (Cita #" + id + ")";
      document.getElementById("wrModalTriage").style.display = "flex";
    });
  });

  // Cerrar Modal Triaje
  const closeTriage = () => {
    document.getElementById("wrModalTriage").style.display = "none";
    currentTriageApptId = null;
  };
  document.getElementById("wrBtnCloseTriage")?.addEventListener("click", closeTriage);
  document.getElementById("wrBtnCancelTriage")?.addEventListener("click", closeTriage);

  // Confirmar Triaje
  document.getElementById("wrBtnConfirmTriage")?.addEventListener("click", () => {
    if (!currentTriageApptId) return;
    const triageData = {
      bloodPressure: document.getElementById("triagePA").value || "120/80 mmHg",
      heartRate: parseInt(document.getElementById("triageFC").value, 10) || 72,
      spO2: parseInt(document.getElementById("triageSpO2").value, 10) || 98,
      temperature: parseFloat(document.getElementById("triageTemp").value) || 36.5,
      alerts: [],
      notes: document.getElementById("triageNotes").value || "Paciente ingresó a sala de espera."
    };
    if (document.getElementById("chkAlergiaPenicilina")?.checked) triageData.alerts.push("Alergia Penicilina");
    if (document.getElementById("chkAlergiaLatex")?.checked) triageData.alerts.push("Alergia Látex");
    if (document.getElementById("chkHipertension")?.checked) triageData.alerts.push("Hipertensión");
    if (document.getElementById("chkDiabetes")?.checked) triageData.alerts.push("Diabetes");

    mockApi.checkInPatient(currentTriageApptId, triageData);
    closeTriage();
    showToast("Check-in completado. Paciente en Sala de Espera.", "success");
    renderWaitingRoom(main, mockApi, showToast);
  });

  // Llamar a Sillón
  document.querySelectorAll(".btn-call-chair").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      const chairId = e.currentTarget.getAttribute("data-chair");
      mockApi.callPatientToChair(id, chairId);
      showToast("Paciente llamado a " + chairId.replace('_', ' ').toUpperCase(), "success");
      renderWaitingRoom(main, mockApi, showToast);
    });
  });

  // Concluir Atención
  document.querySelectorAll(".btn-finish-session").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      const name = e.currentTarget.getAttribute("data-patient");
      const notes = prompt(`Ingrese nota clínica de conclusión para ${name}:`, "Atención concluida con éxito conforme al protocolo.");
      if (notes !== null) {
        mockApi.completeAppointmentSession(id, notes);
        showToast("Atención concluida exitosamente.", "success");
        renderWaitingRoom(main, mockApi, showToast);
      }
    });
  });

  // Inasistencia / Cancelar
  document.querySelectorAll(".btn-noshow").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      const name = e.currentTarget.getAttribute("data-patient");
      if (confirm(`¿Marcar inasistencia / cancelación para ${name}? Esto liberará el turno para pacientes de la lista de espera.`)) {
        mockApi.markNoShow(id, "Cancelación de último minuto informada por recepción");
        showToast("Turno cancelado y liberado.", "warning");
        renderWaitingRoom(main, mockApi, showToast);
      }
    });
  });

  // Modal Lista de Espera abrir / cerrar
  const openWaitlistModal = () => {
    document.getElementById("wrModalAddWaitlist").style.display = "flex";
  };
  const closeWaitlistModal = () => {
    document.getElementById("wrModalAddWaitlist").style.display = "none";
  };
  document.getElementById("wrBtnAddWaitlist")?.addEventListener("click", openWaitlistModal);
  document.getElementById("wrBtnCloseWaitlistModal")?.addEventListener("click", closeWaitlistModal);
  document.getElementById("wrBtnCancelWaitlistModal")?.addEventListener("click", closeWaitlistModal);

  // Guardar en Lista de Espera
  document.getElementById("wrBtnSaveWaitlist")?.addEventListener("click", () => {
    const name = document.getElementById("wlName").value.trim();
    const phone = document.getElementById("wlPhone").value.trim();
    if (!name || !phone) {
      alert("Por favor ingrese al menos el nombre y teléfono del paciente.");
      return;
    }
    const waitlist = mockApi.getWaitlist();
    const newEntry = {
      id: "wait_" + Date.now().toString(36),
      patientName: name,
      phone: phone,
      preferredSpecialty: document.getElementById("wlSpecialty").value,
      urgency: document.getElementById("wlUrgency").value,
      preferredTime: document.getElementById("wlTime").value || "Cualquier horario disponible hoy",
      notes: document.getElementById("wlNotes").value || "Registrado en recepción",
      registeredAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    waitlist.push(newEntry);
    mockApi.saveState();
    mockApi.logAuditEvent("LISTA_ESPERA_ALTA", "Paciente " + name + " agregado a Lista de Espera (" + newEntry.preferredSpecialty + ")");
    closeWaitlistModal();
    showToast("Paciente agregado a Lista de Espera.", "success");
    renderWaitingRoom(main, mockApi, showToast);
  });

  // Asignar Lista de Espera a Cupo Inmediato
  document.querySelectorAll(".btn-assign-waitlist").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const waitId = e.currentTarget.getAttribute("data-id");
      const name = e.currentTarget.getAttribute("data-patient");
      if (confirm(`¿Asignar un cupo inmediato de hoy para ${name} y moverlo a la agenda activa?`)) {
        const newApt = mockApi.assignWaitlistToAppointment(waitId, {
          time: "11:30 AM",
          startTime: "11:30",
          chairId: "chair_1",
          chair: "Sillón 1 (Ortodoncia)"
        });
        if (newApt) {
          showToast(`Paciente ${name} asignado al turno de las 11:30 AM.`, "success");
          renderWaitingRoom(main, mockApi, showToast);
        }
      }
    });
  });
}
