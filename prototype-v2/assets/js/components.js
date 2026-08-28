/**
 * Generadores de componentes reutilizables UI para Sillar Dental v2.
 * Exporta funciones de renderizado HTML puro y helpers de interacción.
 */

export function renderBrandLockup(compact = false) {
  return `
    <a href="../public/index.html" class="brand-lockup" aria-label="Sillar Dental Especialidades">
      <img class="brand-logo-image" src="../assets/brand/sillar-dental-mark.svg" width="44" height="44" alt="">
      <div class="brand-text">
        <span class="brand-name">Sillar Dental</span>
        ${!compact ? `<span class="brand-sub">Odontología Especializada</span>` : ''}
      </div>
    </a>
  `;
}

export function renderPublicHeader(activeNav = "inicio") {
  return `
    <header class="public-header" id="header">
      <div class="container public-header-inner">
        ${renderBrandLockup()}
        <nav class="public-nav" id="publicNav" aria-label="Navegación principal">
          <a href="index.html" class="public-nav-link ${activeNav === 'inicio' ? 'active' : ''}">Inicio</a>
          <a href="especialidades.html" class="public-nav-link ${activeNav === 'especialidades' ? 'active' : ''}">Especialidades</a>
          <a href="equipo.html" class="public-nav-link ${activeNav === 'equipo' ? 'active' : ''}">Equipo médico</a>
          <a href="tecnologia.html" class="public-nav-link ${activeNav === 'tecnologia' ? 'active' : ''}">Tecnología</a>
          <a href="contacto.html" class="public-nav-link ${activeNav === 'contacto' ? 'active' : ''}">Contacto</a>
        </nav>
        <div class="public-header-actions">
          <a href="../patient/login.html?v=3" class="header-portal-link">Portal Paciente</a>
          <a href="reservar.html" class="btn btn-primary btn-small">Reservar evaluación</a>
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Abrir menú">☰</button>
        </div>
      </div>
    </header>
  `;
}

export function renderPublicFooter() {
  return `
    <footer style="background: var(--ink); color: white; padding: 60px 0 30px; margin-top: 80px;">
      <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 40px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
            <img src="../assets/brand/sillar-dental-mark.svg" width="40" height="40" alt="">
            <span style="font-family: var(--display); font-size: 1.3rem; font-weight: 600;">Sillar Dental</span>
          </div>
          <p style="color: var(--ink-faint); font-size: 0.88rem; line-height: 1.6;">Atención odontológica integral de alta precisión en Arequipa. Diagnóstico digital y tratamientos multidisciplinarios.</p>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 16px; font-size: 0.95rem;">Sede Arequipa</h4>
          <p style="color: var(--ink-faint); font-size: 0.88rem; margin-bottom: 8px;">📍 Av. Ejército 712, Yanahuara</p>
          <p style="color: var(--ink-faint); font-size: 0.88rem; margin-bottom: 8px;">📞 (054) 283-910 / +51 954 123 456</p>
          <p style="color: var(--ink-faint); font-size: 0.88rem;">🕒 Lun - Sáb: 8:00 AM - 8:00 PM</p>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 16px; font-size: 0.95rem;">Accesos Rápidos</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; font-size: 0.88rem; color: var(--ink-faint);">
            <li><a href="especialidades.html">Nuestras Especialidades</a></li>
            <li><a href="equipo.html">Plana Docente & Médica</a></li>
            <li><a href="reservar.html">Reserva tu Cita</a></li>
            <li><a href="../patient/login.html?v=3">Portal de Paciente (María Quispe)</a></li>
            <li><a href="../staff/login.html">Consola administrativa</a></li>
            <li><a href="../mobile/patient-flows.html#home">Aplicación móvil paciente</a></li>
            <li><a href="../mobile/control.html">Control móvil / carga de resultados</a></li>
          </ul>
        </div>
      </div>
      <div class="container" style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 0.78rem; color: var(--ink-faint);">
        <div>© 2026 Sillar Dental Especialidades · Arequipa, Perú. Prototipo v2 Demostrativo.</div>
        <div>Fotos e identidades son referencias ficticias.</div>
      </div>
    </footer>
  `;
}

export function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

export function setupHeaderInteractions() {
  const toggleBtn = document.getElementById("mobileNavToggle");
  const nav = document.getElementById("publicNav");
  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
}

// El sistema visual usa marcadores SVG/textuales consistentes; limpia iconos emoji
// que hayan quedado en datos demo o copy antiguo sin modificar el contenido clínico.
export function sanitizeDecorativeIcons(root = document) {
  root.querySelectorAll("body *").forEach((element) => {
    if (element.children.length === 0 && element.textContent) {
      element.textContent = element.textContent
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
        .replace(/^\s*[·•]\s*/u, "")
        .replace(/\s{2,}/g, " ")
        .trim();
    }
  });
}

if (typeof document !== "undefined") {
  window.setTimeout(() => sanitizeDecorativeIcons(), 80);
}
