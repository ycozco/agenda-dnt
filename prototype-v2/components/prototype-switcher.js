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
})();
