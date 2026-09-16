// =========================================================================
// SILLAR DENTAL - PLANES DE TRATAMIENTO POR FASES & PRESUPUESTOS DINÁMICOS
// =========================================================================

export function renderTreatmentPlans(main, mockApi, showToast, patientId = "pat_maria") {
  const plan = mockApi.getTreatmentPlan(patientId);
  const catalog = mockApi.getProcedureCatalog();
  const seed = mockApi.getSeed();
  const patient = (seed.patients || []).find(p => p.id === patientId) || seed.patient || {
    name: "María Quispe Condori",
    documentNumber: "45892104",
    phone: "+51 954 892 104"
  };

  // Recalcular totales para asegurar consistencia
  mockApi.recalculatePlanTotals(plan);

  // Estado local para modalidad de financiamiento seleccionada
  let selectedModality = plan.acceptanceRecord ? plan.acceptanceRecord.financingModality : "CUOTAS_3";

  // Calcular montos según modalidad
  const balance = plan.balanceDue > 0 ? plan.balanceDue : plan.totalCost;
  const contadoTotal = balance * 0.90;
  const contadoAhorro = balance * 0.10;
  const cuota3Inicial = balance * 0.40;
  const cuota3Mensual = balance * 0.30;
  const cuota6Mensual = balance / 6;

  main.innerHTML = `
    <div class="staff-container tx-container">
      <!-- CABECERA PRINCIPAL Y METADATOS DEL PLAN -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <h1 style="margin: 0; font-size: 1.85rem; font-weight: 800; color: #0F172A;">Planes de Tratamiento & Presupuestos</h1>
            <span class="chip ${plan.status === 'ACCEPTED' ? 'chip-success' : 'chip-warning'}" style="font-size: 0.75rem; padding: 3px 10px;">
              ${plan.status === 'ACCEPTED' ? '✓ Aceptado & Firmado' : '⏳ En Negociación / Borrador'}
            </span>
          </div>
          <p class="muted" style="margin: 4px 0 0; color: #64748B; font-weight: 500;">
            Paciente: <strong style="color: #0F172A;">${patient.name}</strong> (DNI: ${patient.documentNumber}) · NTS 188-MINSA · Arancel Odontológico Oficial
          </p>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;" class="tx-actions-bar">
          <button class="btn btn-secondary" id="txBtnPrint" style="font-size: 0.8rem; padding: 8px 14px;">
            🖨️ Imprimir Presupuesto A4
          </button>
          <a href="?view=finance" class="btn btn-secondary" style="font-size: 0.8rem; padding: 8px 14px; text-decoration: none;">
            💳 Ver Caja & Cobros
          </a>
          <button class="btn btn-primary" id="txBtnAcceptTrigger" style="font-size: 0.8rem; padding: 8px 14px; ${plan.status === 'ACCEPTED' ? 'display:none;' : ''}">
            ✍️ Registrar Firma & Aceptación
          </button>
        </div>
      </div>

      <!-- TARJETA RESUMEN ECONÓMICO Y ESTADO DE LIQUIDACIÓN -->
      <div class="tx-plan-summary-card">
        <div class="tx-plan-info">
          <div class="tx-plan-title">
            <span>📋 ${plan.planName}</span>
            <span class="badge badge-info" style="font-size: 0.75rem; font-weight: 600;">v${plan.version}.0</span>
          </div>
          <div class="tx-plan-meta">
            <span>👨‍⚕️ Responsable: <strong>Dra. Ana Flores (COP 18240)</strong></span>
            <span>📅 Fecha de Apertura: <strong>2026-07-08</strong></span>
            <span>🦷 4 Fases Clínicas Multidisciplinarias</span>
          </div>
        </div>

        <div class="tx-plan-totals-box">
          <div class="tx-total-item">
            <span class="tx-total-lbl">Presupuesto Bruto</span>
            <span class="tx-total-val" style="font-size: 1.25rem; color: #64748B; text-decoration: ${plan.totalDiscount > 0 || plan.totalEpsCoverage > 0 ? 'line-through' : 'none'};">
              S/ ${(plan.grossTotal || plan.totalCost).toFixed(2)}
            </span>
          </div>
          ${(plan.totalDiscount > 0 || plan.totalEpsCoverage > 0) ? `
            <div class="tx-total-item">
              <span class="tx-total-lbl" style="color: #0E7060;">Dctos / EPS</span>
              <span class="tx-total-val" style="font-size: 1.25rem; color: #0E7060;">
                -S/ ${((plan.totalDiscount || 0) + (plan.totalEpsCoverage || 0)).toFixed(2)}
              </span>
            </div>
          ` : ''}
          <div class="tx-total-item">
            <span class="tx-total-lbl">Total Neto Plan</span>
            <span class="tx-total-val action">S/ ${plan.totalCost.toFixed(2)}</span>
          </div>
          <div class="tx-total-item" style="border-left: 2px solid #E2E8F0; padding-left: 16px;">
            <span class="tx-total-lbl">Saldo Pendiente</span>
            <span class="tx-total-val due">S/ ${plan.balanceDue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <!-- DESGLOSE DE FASES CLÍNICAS Y PROCEDIMIENTOS -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <h2 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin: 0;">Fases del Plan de Tratamiento</h2>
          <span style="font-size: 0.8rem; color: #64748B;">Haga clic en "+ Procedimiento" para agregar prestaciones aranceladas</span>
        </div>

        ${plan.phases.map(ph => {
          const phaseSubtotal = ph.items.reduce((acc, it) => acc + (it.netFee !== undefined ? it.netFee : it.fee), 0);
          return `
            <div class="tx-phase-card">
              <div class="tx-phase-header">
                <div class="tx-phase-title-wrap">
                  <span class="chip ${ph.status === 'COMPLETED' ? 'chip-success' : ph.status === 'IN_PROGRESS' ? 'chip-warning' : 'chip-neutral'}" style="font-size: 0.72rem;">
                    ${ph.status === 'COMPLETED' ? '✓ Completada' : ph.status === 'IN_PROGRESS' ? '⏳ En Ejecución' : 'Programada'}
                  </span>
                  <h3 class="tx-phase-title">${ph.name}</h3>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                  <span class="tx-phase-subtotal">Subtotal: S/ ${phaseSubtotal.toFixed(2)}</span>
                  <button class="btn btn-secondary btn-small btn-add-proc" data-phase-id="${ph.id}" data-phase-name="${ph.name}">
                    ➕ Procedimiento
                  </button>
                </div>
              </div>
              <div class="tx-phase-body table-responsive">
                <table class="tx-table">
                  <thead>
                    <tr>
                      <th style="width: 110px;">Pieza / Zona</th>
                      <th>Procedimiento Terapéutico</th>
                      <th style="width: 110px;">Arancel</th>
                      <th style="width: 100px;">Dcto / EPS</th>
                      <th style="width: 110px;">Neto Paciente</th>
                      <th>Especialista</th>
                      <th style="width: 100px;">Estado</th>
                      <th style="width: 60px; text-align: center;">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ph.items.length === 0 ? `
                      <tr>
                        <td colspan="8" style="text-align: center; color: #94A3B8; padding: 20px;">No hay procedimientos registrados en esta fase.</td>
                      </tr>
                    ` : ph.items.map(it => {
                      const net = it.netFee !== undefined ? it.netFee : it.fee;
                      const hasDiscount = (it.discountPercent > 0 || it.epsCoveragePercent > 0);
                      return `
                        <tr>
                          <td>
                            <span class="tx-tooth-badge">${typeof it.tooth === 'number' ? 'Pieza #' + it.tooth : it.tooth}</span>
                          </td>
                          <td style="font-weight: 600; color: #0F172A;">
                            ${it.procedure}
                            ${it.executedDate ? `<span class="tiny muted" style="display:block;">Ejecutado: ${it.executedDate}</span>` : ''}
                          </td>
                          <td style="font-family: var(--mono, monospace); color: ${hasDiscount ? '#94A3B8; text-decoration: line-through;' : '#0F172A;'}">
                            S/ ${it.fee.toFixed(2)}
                          </td>
                          <td>
                            ${hasDiscount ? `
                              <span class="chip chip-success" style="font-size: 0.7rem; padding: 2px 6px;">
                                ${it.discountPercent ? it.discountPercent + '% Dcto' : ''} ${it.epsCoveragePercent ? it.epsCoveragePercent + '% EPS' : ''}
                              </span>
                            ` : `<span class="tiny muted">—</span>`}
                          </td>
                          <td>
                            <strong style="font-family: var(--mono, monospace); color: #0E7060; font-size: 0.92rem;">
                              S/ ${net.toFixed(2)}
                            </strong>
                          </td>
                          <td style="font-size: 0.8rem; color: #475569;">${it.doctor || 'Dra. Flores'}</td>
                          <td>
                            <span class="chip ${it.status === 'COMPLETED' ? 'chip-success' : it.status === 'IN_PROGRESS' ? 'chip-warning' : 'chip-neutral'}" style="font-size: 0.7rem; padding: 2px 6px;">
                              ${it.status === 'COMPLETED' ? '✓ Listo' : it.status === 'IN_PROGRESS' ? 'En Curso' : 'Pendiente'}
                            </span>
                          </td>
                          <td style="text-align: center;">
                            ${it.status !== 'COMPLETED' ? `
                              <button class="btn-delete-item" data-phase-id="${ph.id}" data-item-id="${it.id}" title="Eliminar procedimiento del plan" style="background:none; border:none; color:#EF4444; cursor:pointer; font-size:1rem;">
                                🗑️
                              </button>
                            ` : `<span title="Procedimiento completado" style="opacity:0.4;">🔒</span>`}
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- SIMULADOR INTERACTIVO DE FINANCIAMIENTO & CUOTAS -->
      <div class="tx-finance-section">
        <div class="tx-finance-header">
          <div>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🧮</span>
              <span>Simulador de Financiamiento & Modalidades de Pago</span>
            </h2>
            <p style="margin: 4px 0 0; font-size: 0.82rem; color: #64748B;">
              Seleccione la alternativa que mejor se adapte al presupuesto del paciente para generar el cronograma en Caja.
            </p>
          </div>
          <button class="btn btn-primary btn-small" id="txBtnGenSchedule">
            ⚡ Generar Cronograma de Cobro en Caja
          </button>
        </div>

        <div class="tx-finance-grid">
          <!-- MODALIDAD 1: PAGO AL CONTADO -->
          <div class="tx-finance-card ${selectedModality === 'CONTADO' ? 'active' : ''}" data-modality="CONTADO">
            <div class="tx-finance-title">
              <span>💵 Pago al Contado</span>
              <span class="chip chip-success" style="font-size: 0.68rem;">10% Dcto Pronto Pago</span>
            </div>
            <div class="tx-finance-monthly">S/ ${contadoTotal.toFixed(2)}</div>
            <div class="tx-finance-detail">
              Abono único al iniciar el plan. Ahorro inmediato de <strong>S/ ${contadoAhorro.toFixed(2)}</strong> aplicable en efectivo, Yape o transferencia directa.
            </div>
          </div>

          <!-- MODALIDAD 2: 3 CUOTAS SIN INTERESES -->
          <div class="tx-finance-card ${selectedModality === 'CUOTAS_3' ? 'active' : ''}" data-modality="CUOTAS_3">
            <div class="tx-finance-title">
              <span>💳 3 Cuotas sin Intereses</span>
              <span class="chip chip-info" style="font-size: 0.68rem;">Más Elegida</span>
            </div>
            <div class="tx-finance-monthly">S/ ${cuota3Inicial.toFixed(2)} <span style="font-size: 0.8rem; font-weight: 500; color: #64748B;">inicial</span></div>
            <div class="tx-finance-detail">
              40% de inicial (S/ ${cuota3Inicial.toFixed(2)}) + 2 cuotas de S/ ${cuota3Mensual.toFixed(2)} a 30 y 60 días sin recargos con cualquier tarjeta.
            </div>
          </div>

          <!-- MODALIDAD 3: PLAN POR AVANCE DE FASE -->
          <div class="tx-finance-card ${selectedModality === 'CUOTAS_FASE' ? 'active' : ''}" data-modality="CUOTAS_FASE">
            <div class="tx-finance-title">
              <span>🎯 Pago por Fases Clínicas</span>
              <span class="chip chip-neutral" style="font-size: 0.68rem;">Flexible</span>
            </div>
            <div class="tx-finance-monthly">4 Pagos <span style="font-size: 0.8rem; font-weight: 500; color: #64748B;">escalonados</span></div>
            <div class="tx-finance-detail">
              Se liquida el arancel de cada fase conforme el odontólogo autoriza el inicio de la siguiente etapa terapéutica.
            </div>
          </div>

          <!-- MODALIDAD 4: FINANCIAMIENTO EXTENDIDO 6 CUOTAS -->
          <div class="tx-finance-card ${selectedModality === 'CUOTAS_6' ? 'active' : ''}" data-modality="CUOTAS_6">
            <div class="tx-finance-title">
              <span>🏦 6 Cuotas Mensuales</span>
              <span class="chip chip-warning" style="font-size: 0.68rem;">Financiamiento</span>
            </div>
            <div class="tx-finance-monthly">S/ ${cuota6Mensual.toFixed(2)} <span style="font-size: 0.8rem; font-weight: 500; color: #64748B;">/ mes</span></div>
            <div class="tx-finance-detail">
              6 cuotas fijas mensuales con cargo automático a tarjeta o boletas programadas en recepción.
            </div>
          </div>
        </div>
      </div>

      <!-- CONSENTIMIENTO INFORMADO & FIRMA DIGITAL -->
      <div class="tx-signature-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h2 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>✒️</span>
              <span>Aceptación del Presupuesto & Firma Digital</span>
            </h2>
            <p style="margin: 4px 0 0; font-size: 0.8rem; color: #64748B;">
              Conforme a la Ley General de Salud N.º 26842 y la NTS N.º 139-MINSA sobre expedientes y consentimientos informados.
            </p>
          </div>
          ${plan.status === 'ACCEPTED' ? `
            <span class="chip chip-success" style="font-size: 0.78rem; padding: 4px 12px;">
              ✓ Documento Firmado & Foliado
            </span>
          ` : `
            <span class="chip chip-warning" style="font-size: 0.78rem; padding: 4px 12px;">
              ⚠️ Pendiente de Firma Paciente
            </span>
          `}
        </div>

        ${plan.status === 'ACCEPTED' && plan.acceptanceRecord ? `
          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="font-weight: 700; color: #166534; font-size: 0.95rem;">
                ✓ Presupuesto y Plan de Tratamiento Aceptado Legalmente
              </div>
              <div style="font-size: 0.8rem; color: #15803D; margin-top: 4px;">
                Firmante: <strong>${plan.acceptanceRecord.patientName}</strong> (DNI: ${plan.acceptanceRecord.documentNumber}) · Fecha: ${plan.acceptedAt}
              </div>
              <div style="font-family: var(--mono, monospace); font-size: 0.75rem; color: #166534; margin-top: 4px;">
                Evidencia Digital SHA-256: <code>${plan.acceptanceRecord.signatureHash}</code>
              </div>
            </div>
            <div style="text-align: center; background: white; padding: 10px 18px; border-radius: 8px; border: 1px solid #DCFCE7;">
              <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 1.8rem; color: #1E293B; line-height: 1;">
                ${plan.acceptanceRecord.patientName.split(' ')[0]} Quispe
              </div>
              <div style="border-top: 1px solid #0F172A; font-size: 0.7rem; color: #64748B; margin-top: 4px;">Firma Registrada</div>
            </div>
          </div>
        ` : `
          <div style="font-size: 0.82rem; color: #475569; line-height: 1.5; background: #F8FAFC; padding: 14px 16px; border-radius: 8px; border: 1px solid #E2E8F0; margin-bottom: 14px;">
            "Yo, <strong>${patient.name}</strong>, identificado con DNI <strong>${patient.documentNumber}</strong>, declaro haber sido informado(a) detalladamente de las fases clínicas, riesgos, alternativas, costos y modalidades de pago del plan odontológico. Doy mi conformidad y autorización para el inicio de las intervenciones."
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px;">
            <label style="font-size: 0.78rem; font-weight: 700; color: #334155;">Dibuje la firma del paciente en el recuadro:</label>
            <div class="tx-signature-box" id="txSigContainer">
              <canvas id="txSigCanvas" class="tx-canvas" width="600" height="160"></canvas>
              <div class="tx-signature-guide"></div>
              <div class="tx-signature-placeholder" id="txSigPlaceholder">Haga clic o use la pantalla táctil para firmar aquí</div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
              <button class="btn btn-secondary btn-small" id="txBtnClearSig">
                🧹 Limpiar Firma
              </button>
              <button class="btn btn-primary" id="txBtnConfirmSig">
                ✍️ Validar & Guardar Aceptación Legal
              </button>
            </div>
          </div>
        `}
      </div>
    </div>

    <!-- MODAL: AÑADIR PROCEDIMIENTO AL PLAN -->
    <div id="txModalAddProc" class="wr-modal-overlay" style="display: none;">
      <div class="wr-modal-card" style="max-width: 580px;">
        <div class="wr-modal-header" style="background: #0E7060;">
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: white;">Añadir Procedimiento Arancelado</h3>
            <span id="txModalPhaseName" style="font-size: 0.8rem; opacity: 0.9; color: white;">Fase de Tratamiento</span>
          </div>
          <button id="txBtnCloseAddModal" style="background: none; border: none; color: white; font-size: 1.25rem; cursor: pointer;">&times;</button>
        </div>
        <div class="wr-modal-body">
          <div class="wr-input-group">
            <label class="wr-input-label">Seleccionar Procedimiento del Catálogo Clínico</label>
            <select id="txSelCatalog" class="wr-input-field">
              <option value="">-- Seleccione una prestación --</option>
              ${catalog.map(c => `
                <option value="${c.code}" data-fee="${c.fee}" data-name="${c.name}" data-doctor="${c.defaultDoctor}">
                  [${c.code}] ${c.name} — S/ ${c.fee.toFixed(2)}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="wr-triage-grid">
            <div class="wr-input-group">
              <label class="wr-input-label">Pieza Dental / Zona de Aplicación</label>
              <select id="txSelTooth" class="wr-input-field">
                <option value="Boca Completa">Boca Completa</option>
                <option value="Arcada Superior">Arcada Superior</option>
                <option value="Arcada Inferior">Arcada Inferior</option>
                <option value="Cuadrante 1 y 3">Cuadrante 1 y 3</option>
                <option value="Cuadrante 2 y 4">Cuadrante 2 y 4</option>
                <optgroup label="Incisivos y Caninos Superiores">
                  <option value="11">Pieza 11 (Incisivo Central Sup Der)</option>
                  <option value="12">Pieza 12 (Incisivo Lateral Sup Der)</option>
                  <option value="13">Pieza 13 (Canino Sup Der)</option>
                  <option value="21" selected>Pieza 21 (Incisivo Central Sup Izq)</option>
                  <option value="22">Pieza 22 (Incisivo Lateral Sup Izq)</option>
                  <option value="23">Pieza 23 (Canino Sup Izq)</option>
                </optgroup>
                <optgroup label="Premolares y Molares Superiores">
                  <option value="14">Pieza 14</option>
                  <option value="15">Pieza 15</option>
                  <option value="16">Pieza 16 (Primera Molar Sup Der)</option>
                  <option value="17">Pieza 17</option>
                  <option value="24">Pieza 24</option>
                  <option value="25">Pieza 25</option>
                  <option value="26">Pieza 26 (Primera Molar Sup Izq)</option>
                  <option value="27">Pieza 27</option>
                </optgroup>
                <optgroup label="Piezas Inferiores">
                  <option value="36">Pieza 36 (Primera Molar Inf Izq)</option>
                  <option value="46">Pieza 46 (Primera Molar Inf Der)</option>
                  <option value="31">Pieza 31</option>
                  <option value="41">Pieza 41</option>
                  <option value="38">Pieza 38 (Tercera Molar)</option>
                  <option value="48">Pieza 48 (Tercera Molar)</option>
                </optgroup>
              </select>
            </div>

            <div class="wr-input-group">
              <label class="wr-input-label">Honorario Base (S/)</label>
              <input type="number" id="txInputFee" class="wr-input-field" placeholder="180.00" />
            </div>
          </div>

          <div class="wr-triage-grid">
            <div class="wr-input-group">
              <label class="wr-input-label">Descuento Comercial (%)</label>
              <select id="txSelDiscount" class="wr-input-field">
                <option value="0" selected>0% (Sin descuento)</option>
                <option value="5">5% (Cortesía)</option>
                <option value="10">10% (Campaña / Familiar)</option>
                <option value="15">15% (Convenio institucional)</option>
                <option value="20">20% (Promoción especial)</option>
              </select>
            </div>

            <div class="wr-input-group">
              <label class="wr-input-label">Cobertura Seguro EPS (%)</label>
              <select id="txSelEps" class="wr-input-field">
                <option value="0" selected>0% (Particular)</option>
                <option value="20">20% (Copago EPS Rímac)</option>
                <option value="50">50% (Pacífico Seguros)</option>
                <option value="70">70% (La Positiva EPS)</option>
                <option value="80">80% (Sanitas Cobertura Max)</option>
              </select>
            </div>
          </div>

          <div class="wr-input-group">
            <label class="wr-input-label">Especialista Odontólogo Asignado</label>
            <select id="txSelDoctor" class="wr-input-field">
              <option value="Dra. Ana Flores (COP 18240)">Dra. Ana Flores Vanesa (COP 18240 - Ortodoncia)</option>
              <option value="Dr. Carlos Mendoza (COP 15420)">Dr. Carlos Mendoza Ramos (COP 15420 - Cirugía/Implantes)</option>
              <option value="Dr. Diego Torres (COP 17300)">Dr. Diego Torres Vizcarra (COP 17300 - Rehabilitación)</option>
              <option value="Dra. Lucía Paredes (COP 21090)">Dra. Lucía Paredes Soto (COP 21090 - Endodoncia)</option>
              <option value="Dr. Jorge Benavides (COP 16890)">Dr. Jorge Benavides (COP 16890 - Periodoncia)</option>
            </select>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; color: #64748B;">Total Neto Calculado:</span>
            <strong id="txModalCalculatedNet" style="font-size: 1.15rem; color: #0E7060;">S/ 0.00</strong>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 6px;">
            <button class="btn btn-secondary" id="txBtnCancelAdd">Cancelar</button>
            <button class="btn btn-primary" id="txBtnSaveProc">
              💾 Añadir a la Fase
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // =========================================================================
  // INTERACCIONES & CONTROLADORES DE EVENTOS
  // =========================================================================
  let targetPhaseId = null;

  // 1. Imprimir Presupuesto
  document.getElementById("txBtnPrint")?.addEventListener("click", () => {
    window.print();
  });

  // 2. Selección de Modalidad de Financiamiento
  document.querySelectorAll(".tx-finance-card").forEach(card => {
    card.addEventListener("click", (e) => {
      const modality = e.currentTarget.getAttribute("data-modality");
      selectedModality = modality;
      document.querySelectorAll(".tx-finance-card").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      showToast(`Modalidad ${modality.replace('_', ' ')} seleccionada`, "info");
    });
  });

  // 3. Generar Cronograma en Caja
  document.getElementById("txBtnGenSchedule")?.addEventListener("click", () => {
    const installments = mockApi.generatePaymentScheduleFromPlan(patientId, selectedModality);
    showToast(`Cronograma de ${installments.length} cuotas generado exitosamente.`, "success");
    // Recargar vista para reflejar los cambios
    renderTreatmentPlans(main, mockApi, showToast, patientId);
  });

  // 4. Modal Añadir Procedimiento
  document.querySelectorAll(".btn-add-proc").forEach(btn => {
    btn.addEventListener("click", (e) => {
      targetPhaseId = e.currentTarget.getAttribute("data-phase-id");
      const phaseName = e.currentTarget.getAttribute("data-phase-name");
      document.getElementById("txModalPhaseName").textContent = phaseName;
      document.getElementById("txModalAddProc").style.display = "flex";
      updateModalCalculatedNet();
    });
  });

  const closeModal = () => {
    document.getElementById("txModalAddProc").style.display = "none";
    targetPhaseId = null;
  };
  document.getElementById("txBtnCloseAddModal")?.addEventListener("click", closeModal);
  document.getElementById("txBtnCancelAdd")?.addEventListener("click", closeModal);

  // Cambio en selección de catálogo
  const selCatalog = document.getElementById("txSelCatalog");
  const inputFee = document.getElementById("txInputFee");
  const selDiscount = document.getElementById("txSelDiscount");
  const selEps = document.getElementById("txSelEps");
  const modalNet = document.getElementById("txModalCalculatedNet");

  function updateModalCalculatedNet() {
    const fee = parseFloat(inputFee.value) || 0;
    const disc = parseFloat(selDiscount.value) || 0;
    const eps = parseFloat(selEps.value) || 0;
    const net = Math.max(0, fee - (fee * (disc / 100)) - (fee * (eps / 100)));
    if (modalNet) modalNet.textContent = "S/ " + net.toFixed(2);
    return net;
  }

  selCatalog?.addEventListener("change", (e) => {
    const opt = e.target.selectedOptions[0];
    if (opt && opt.value) {
      inputFee.value = opt.getAttribute("data-fee") || 0;
      const doc = opt.getAttribute("data-doctor");
      if (doc) {
        const docSel = document.getElementById("txSelDoctor");
        for (let i = 0; i < docSel.options.length; i++) {
          if (docSel.options[i].text.includes(doc)) {
            docSel.selectedIndex = i;
            break;
          }
        }
      }
      updateModalCalculatedNet();
    }
  });

  inputFee?.addEventListener("input", updateModalCalculatedNet);
  selDiscount?.addEventListener("change", updateModalCalculatedNet);
  selEps?.addEventListener("change", updateModalCalculatedNet);

  // Guardar procedimiento
  document.getElementById("txBtnSaveProc")?.addEventListener("click", () => {
    if (!targetPhaseId) return;
    const opt = selCatalog.selectedOptions[0];
    const procName = opt && opt.value ? opt.getAttribute("data-name") : "Procedimiento Clínico Personalizado";
    const fee = parseFloat(inputFee.value) || 0;
    if (fee <= 0) {
      alert("Por favor ingrese un honorario válido.");
      return;
    }

    const toothVal = document.getElementById("txSelTooth").value;
    const toothParsed = isNaN(parseInt(toothVal, 10)) ? toothVal : parseInt(toothVal, 10);
    const disc = parseFloat(selDiscount.value) || 0;
    const eps = parseFloat(selEps.value) || 0;
    const net = updateModalCalculatedNet();

    mockApi.addTreatmentPlanItem(patientId, targetPhaseId, {
      tooth: toothParsed,
      procedure: procName,
      fee: fee,
      discountPercent: disc,
      epsCoveragePercent: eps,
      netFee: net,
      doctor: document.getElementById("txSelDoctor").value
    });

    closeModal();
    showToast("Procedimiento agregado al plan.", "success");
    renderTreatmentPlans(main, mockApi, showToast, patientId);
  });

  // 5. Eliminar Procedimiento
  document.querySelectorAll(".btn-delete-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const phId = e.currentTarget.getAttribute("data-phase-id");
      const itId = e.currentTarget.getAttribute("data-item-id");
      if (confirm("¿Está seguro de eliminar este procedimiento del plan de tratamiento?")) {
        mockApi.removeTreatmentPlanItem(patientId, phId, itId);
        showToast("Procedimiento eliminado.", "warning");
        renderTreatmentPlans(main, mockApi, showToast, patientId);
      }
    });
  });

  // 6. Canvas de Firma Digital
  const canvas = document.getElementById("txSigCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let hasDrawn = false;
    const placeholder = document.getElementById("txSigPlaceholder");

    ctx.strokeStyle = "#0F172A";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const startDraw = (e) => {
      isDrawing = true;
      hasDrawn = true;
      if (placeholder) placeholder.style.display = "none";
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDraw);

    // Limpiar firma
    document.getElementById("txBtnClearSig")?.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawn = false;
      if (placeholder) placeholder.style.display = "block";
    });

    // Confirmar firma
    document.getElementById("txBtnConfirmSig")?.addEventListener("click", () => {
      if (!hasDrawn) {
        alert("Por favor trace la firma del paciente en el recuadro antes de confirmar.");
        return;
      }
      const dataUrl = canvas.toDataURL("image/png");
      mockApi.acceptTreatmentPlan(patientId, {
        patientName: patient.name,
        documentNumber: patient.documentNumber,
        signatureDataUrl: dataUrl,
        financingModality: selectedModality
      });
      showToast("Plan de tratamiento aceptado legalmente con firma.", "success");
      renderTreatmentPlans(main, mockApi, showToast, patientId);
    });
  }

  // Scroll to signature when clicking top button
  document.getElementById("txBtnAcceptTrigger")?.addEventListener("click", () => {
    const sigSec = document.querySelector(".tx-signature-section");
    if (sigSec) {
      sigSec.scrollIntoView({ behavior: "smooth" });
    }
  });
}
