/**
 * Generadores de componentes UI universales para Alínea Studio & Sillar Dental Ecosystem
 */

export function renderBrandLockup(compact = false) {
  return `
    <a href="index.html" class="nav-brand" aria-label="Alínea Studio">
      <div class="nav-brand-badge">🦷</div>
      <div class="nav-brand-text">
        <span class="nav-brand-title">Alínea Studio</span>
        ${!compact ? `<span class="nav-brand-sub">Corrección Dental & Especialidades</span>` : ''}
      </div>
    </a>
  `;
}

export function renderPublicHeader(activeNav = "inicio") {
  const currentTheme = (typeof localStorage !== 'undefined' && localStorage.getItem('sd-theme')) || 'light';
  return `
    <!-- Top Bar de Sede Yanahuara -->
    <div class="top-clinic-bar">
      <div class="container top-clinic-inner">
        <div class="top-clinic-info">
          <span>📍 <strong>Sede Yanahuara:</strong> Av. Ejército 712 · Abierto hoy hasta 8:00 PM</span>
        </div>
        <div class="top-clinic-actions">
          <span>📞 (054) 283-910</span>
          <a href="saas.html" class="top-saas-link">💼 Software SaaS Clínicas →</a>
        </div>
      </div>
    </div>

    <!-- Navegación Principal Responsiva -->
    <header class="main-header" id="mainHeader">
      <div class="container main-header-inner">
        ${renderBrandLockup()}

        <nav class="main-nav" id="mainNav" aria-label="Navegación principal">
          <a href="index.html" class="nav-item ${activeNav === 'inicio' ? 'active' : ''}">Inicio</a>
          <a href="index.html#alineadores" class="nav-item">Alineadores 3D</a>
          <a href="especialidades.html" class="nav-item ${activeNav === 'especialidades' ? 'active' : ''}">Tratamientos</a>
          <a href="equipo.html" class="nav-item ${activeNav === 'equipo' ? 'active' : ''}">Especialistas COP</a>
          <a href="tecnologia.html" class="nav-item ${activeNav === 'tecnologia' ? 'active' : ''}">Tecnología 3D</a>
          <a href="contacto.html" class="nav-item ${activeNav === 'contacto' ? 'active' : ''}">Sede Yanahuara</a>
        </nav>

        <div class="main-header-cta">
          <button id="themeToggleGlobalBtn" class="theme-toggle-pill" aria-label="Cambiar Tema">
            🌓 <span class="theme-label">${currentTheme === 'dark' ? 'Oscuro' : 'Claro'}</span>
          </button>
          <a href="/patient/index.html" class="portal-patient-link">Portal Paciente ↗</a>
          <a href="reservar.html" class="btn btn-primary btn-small header-book-btn">Agendar Evaluación 3D</a>
          <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Abrir Menú Móvil">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>

      <!-- Menú Móvil Desplegable -->
      <div class="mobile-drawer" id="mobileDrawer">
        <a href="index.html" class="mobile-drawer-link">🏠 Inicio</a>
        <a href="index.html#alineadores" class="mobile-drawer-link">✨ Alineadores Invisibles</a>
        <a href="especialidades.html" class="mobile-drawer-link">🩺 Catálogo de Tratamientos</a>
        <a href="equipo.html" class="mobile-drawer-link">👨‍⚕️ Especialistas Colegiados COP</a>
        <a href="tecnologia.html" class="mobile-drawer-link">🔬 Tecnología 3D & Tomografía</a>
        <a href="contacto.html" class="mobile-drawer-link">📍 Sede Yanahuara & Mapa</a>
        <a href="/patient/index.html" class="mobile-drawer-link" style="color: var(--action); font-weight: 700;">👤 Portal Paciente</a>
        <a href="saas.html" class="mobile-drawer-link" style="color: #0284c7; font-weight: 700;">💼 Software SaaS para Clínicas</a>
        <div style="padding: 16px;">
          <a href="reservar.html" class="btn btn-primary" style="width: 100%; text-align: center; justify-content: center; border-radius: 999px;">
            Agendar Evaluación 3D
          </a>
        </div>
      </div>
    </header>
  `;
}

export function renderPublicFooter() {
  return `
    <footer class="universal-footer">
      <div class="container footer-grid">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
            <div style="width: 38px; height: 38px; background: var(--action); color: white; border-radius: 10px; display: grid; place-items: center; font-size: 1.2rem;">🦷</div>
            <span style="font-family: var(--display); font-size: 1.25rem; font-weight: 800; color: white;">Alínea Studio</span>
          </div>
          <p style="color: #94a3b8; font-size: 0.88rem; line-height: 1.6; max-width: 320px;">
            Centro odontológico boutique de corrección dental y estética en Yanahuara, Arequipa. Conforme a la norma NTS N.° 188-MINSA.
          </p>
          <div style="color: #64748b; font-size: 0.8rem; margin-top: 10px;">
            RUC: 20601234567 · Alínea Dental E.I.R.L.
          </div>
        </div>

        <div>
          <h4 style="color: white; margin: 0 0 14px; font-size: 0.95rem;">Corrección Dental</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; font-size: 0.86rem; color: #94a3b8;">
            <li><a href="index.html#alineadores">Alineadores Invisibles</a></li>
            <li><a href="especialidades.html">Brackets de Zafiro</a></li>
            <li><a href="especialidades.html">Brackets Autoligados</a></li>
            <li><a href="especialidades.html">Implantes Dentales 3D</a></li>
            <li><a href="especialidades.html">Diseño Digital de Sonrisa</a></li>
          </ul>
        </div>

        <div>
          <h4 style="color: white; margin: 0 0 14px; font-size: 0.95rem;">Accesos Directos</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; font-size: 0.86rem; color: #94a3b8;">
            <li><a href="/patient/index.html" style="color: #10B981; font-weight: 700;">Portal Paciente (María Q.)</a></li>
            <li><a href="saas.html" style="color: #38bdf8; font-weight: 700;">Software SaaS para Clínicas</a></li>
            <li><a href="reservar.html">Agendar Cita en Línea</a></li>
            <li><a href="/selector.html">Hub de Vistas (Selector)</a></li>
          </ul>
        </div>

        <div>
          <h4 style="color: white; margin: 0 0 14px; font-size: 0.95rem;">Sede Yanahuara</h4>
          <div style="font-size: 0.86rem; color: #94a3b8; display: grid; gap: 6px;">
            <div>📍 Av. Ejército 712, Yanahuara, Arequipa</div>
            <div>📞 (054) 283-910</div>
            <div>💬 +51 954 123 456</div>
            <div>🕒 Lun - Sáb: 8:00 AM a 8:00 PM</div>
          </div>
        </div>
      </div>

      <div class="container footer-bottom">
        <div>© 2026 Alínea Studio Dental. Todos los derechos reservados.</div>
        <div style="display: flex; gap: 16px;">
          <span>Boletas Electrónicas Serie B001</span>
          <span>NTS N.° 188-MINSA</span>
          <span>Ley N.° 29733 (LPDP)</span>
        </div>
      </div>
    </footer>
  `;
}

export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  // Construcción segura del DOM con textContent para mitigar XSS (SEC-006)
  const iconSpan = document.createElement("span");
  iconSpan.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  const msgSpan = document.createElement("span");
  msgSpan.textContent = message; // Safe text node assignment

  toast.appendChild(iconSpan);
  toast.appendChild(document.createTextNode(" "));
  toast.appendChild(msgSpan);

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

export function setupHeaderInteractions() {
  // Mobile drawer toggle
  const menuBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileDrawer");
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      drawer.classList.toggle("active");
      menuBtn.classList.toggle("open");
    });
  }

  // Theme toggle button
  const themeBtn = document.getElementById("themeToggleGlobalBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "light";
      const next = cur === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("sd-theme", next);
      const label = themeBtn.querySelector(".theme-label");
      if (label) label.textContent = next === "dark" ? "Oscuro" : "Claro";
    });
  }
}

/**
 * Monta un banner no intrusivo pero visible que marca claramente el entorno de demostración
 * Requisito Fase 0 del Roadmap de remediación
 */
export function mountDemoBanner() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sillar-demo-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'sillar-demo-banner';
  banner.style.cssText = 'background: #FEF3C7; color: #92400E; border-bottom: 1px solid #FCD34D; font-size: 0.72rem; font-weight: 700; text-align: center; padding: 4px 12px; position: sticky; top: 0; z-index: 999999; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: system-ui, -apple-system, sans-serif; letter-spacing: 0.02em;';
  banner.innerHTML = '<span>🧪 AMBIENTE DEMOSTRACIÓN · PROTOTIPO CLÍNICO SILLAR DENTAL OS · DATOS SINTÉTICOS SIN VALIDEZ MÉDICA REAL</span>';
  if (document.body) {
    document.body.prepend(banner);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.prepend(banner));
  }
}

// Auto-montar banner si se ejecuta en navegador
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountDemoBanner);
  } else {
    mountDemoBanner();
  }
}
