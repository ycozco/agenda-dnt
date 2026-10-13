/* ==========================================================================
   SILLAR DENTAL PROTOTYPE V2 - THEME ENGINE & ROUTE UTILITIES
   (Widget flotante trasladado a /selector.html)
   ========================================================================== */

(function () {
  const savedTheme = localStorage.getItem('sd-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  window.setSillarTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sd-theme', theme);
  };

  function mountDemoBanner() {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountDemoBanner);
  } else {
    mountDemoBanner();
  }
})();
