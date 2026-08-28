/* ==========================================================================
   SILLAR DENTAL PROTOTYPE V2 - GLOBAL SWITCHER & THEME ENGINE
   ========================================================================== */

(function () {
  // Initialize Theme from localStorage or default
  const savedTheme = localStorage.getItem('sd-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Inject Styles for Switcher
  const switcherStyle = document.createElement('style');
  switcherStyle.textContent = `
    .sd-global-switcher {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      font-family: 'Manrope', -apple-system, sans-serif;
    }
    .sd-switcher-toggle {
      background: #002046;
      color: #46fcb4;
      border: 1px solid rgba(70, 252, 180, 0.3);
      padding: 0.6rem 1rem;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
    }
    .sd-switcher-toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
      background: #00336e;
    }
    .sd-switcher-panel {
      display: none;
      background: rgba(5, 20, 36, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(212, 228, 250, 0.15);
      border-radius: 16px;
      padding: 1rem;
      width: 310px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
      color: #d4e4fa;
    }
    .sd-switcher-panel.active {
      display: block;
    }
    .sd-switcher-title {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #38bdf8;
      margin-bottom: 0.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sd-switcher-grid {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .sd-switcher-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      color: #f0f4fc;
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 600;
      transition: all 0.2s;
    }
    .sd-switcher-item:hover {
      background: rgba(70, 252, 180, 0.12);
      border-color: #46fcb4;
      color: #46fcb4;
    }
    .sd-theme-btn {
      width: 100%;
      margin-top: 0.75rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .sd-theme-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  `;
  document.head.appendChild(switcherStyle);

  // Render Floating Switcher DOM
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'sd-global-switcher';

    const pathPrefix = getPathPrefix();

    container.innerHTML = `
      <div class="sd-switcher-panel" id="sdSwitcherPanel">
        <div class="sd-switcher-title">
          <span>Navegador de Vistas Stitch</span>
          <span style="color:#46fcb4;">v2.0</span>
        </div>
        <div class="sd-switcher-grid">
          <a href="${pathPrefix}public/index.html" class="sd-switcher-item">
            <span>🌐 Web Pública</span>
            <small style="color:#94a3b8">Landing Premium</small>
          </a>
          <a href="${pathPrefix}patient/index.html" class="sd-switcher-item">
            <span>👤 Portal Paciente</span>
            <small style="color:#94a3b8">Citas & Ficha</small>
          </a>
          <a href="${pathPrefix}staff/citas.html" class="sd-switcher-item">
            <span>📅 Recepción & Citas</span>
            <small style="color:#94a3b8">Agenda Semanal</small>
          </a>
          <a href="${pathPrefix}staff/consulta.html" class="sd-switcher-item">
            <span>🩺 Consulta & Odontograma</span>
            <small style="color:#46fcb4">52 Piezas COP</small>
          </a>
          <a href="${pathPrefix}staff/admin.html" class="sd-switcher-item">
            <span>⚙️ Centro de Administración</span>
            <small style="color:#94a3b8">Dashboard KPI</small>
          </a>
          <a href="${pathPrefix}staff/inventario.html" class="sd-switcher-item">
            <span>📦 Gestión de Inventario</span>
            <small style="color:#94a3b8">Stock Médico</small>
          </a>
          <a href="${pathPrefix}staff/usuarios.html" class="sd-switcher-item">
            <span>👥 Gestión de Usuarios</span>
            <small style="color:#94a3b8">Personal & Roles</small>
          </a>
          <a href="/prototipo-stitc/index.html" class="sd-switcher-item" style="border-color:rgba(56,189,248,0.4)">
            <span style="color:#38bdf8">🔍 Visor 45 Diseños Stitch</span>
            <small style="color:#38bdf8">Especificación</small>
          </a>
        </div>
        <button class="sd-theme-btn" id="sdThemeToggleBtn">
          🌓 Tema: <span id="sdThemeLabel">${savedTheme === 'dark' ? 'Oscuro' : 'Claro'}</span>
        </button>
      </div>
      <button class="sd-switcher-toggle" id="sdSwitcherToggleBtn">
        ✨ Simular Vistas Stitch
      </button>
    `;

    document.body.appendChild(container);

    const toggleBtn = document.getElementById('sdSwitcherToggleBtn');
    const panel = document.getElementById('sdSwitcherPanel');
    const themeBtn = document.getElementById('sdThemeToggleBtn');
    const themeLabel = document.getElementById('sdThemeLabel');

    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('active');
    });

    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sd-theme', next);
      themeLabel.textContent = next === 'dark' ? 'Oscuro' : 'Claro';
    });
  });

  function getPathPrefix() {
    const loc = window.location.pathname;
    if (loc.includes('/public/') || loc.includes('/patient/') || loc.includes('/staff/') || loc.includes('/mobile/')) {
      return '../';
    }
    return './';
  }
})();
