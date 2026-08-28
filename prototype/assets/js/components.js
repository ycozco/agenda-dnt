(function () {
  const iconMap = { calendar: '▣', users: '♙', patient: '●', clipboard: '▤', tooth: '♢', wallet: '◈', package: '◇', message: '◌', chart: '▥', settings: '⚙', shield: '◉', file: '▱', image: '▧', camera: '◫', 'file-text': '▤', 'file-check': '✓', search: '⌕', bell: '◔', check: '✓', plus: '+', arrow: '→', clock: '◷', warning: '!' };
  window.icon = name => `<span class="icon" aria-hidden="true">${iconMap[name] || '•'}</span>`;
  window.statusChip = status => {
    const tone = /venc|pendiente|por confirmar|revisi|en espera/i.test(status) ? 'amber' : /cancel|error|mora/i.test(status) ? 'terracotta' : /complet|confirm|final|firmad|public|acept/i.test(status) ? 'green' : '';
    return `<span class="chip ${tone}">${status}</span>`;
  };
  window.avatar = (person, extra = '') => `<span class="avatar ${person.color || extra}">${person.initials || person.name.slice(0, 2)}</span>`;
  window.toast = text => { const el = document.createElement('div'); el.className = 'toast'; el.textContent = text; document.body.appendChild(el); setTimeout(() => el.remove(), 2600); };
  window.patientLink = patient => `<a href="admin.html?view=patient&patient=${patient.id}" class="row"><span class="avatar">${patient.initials}</span><span><strong>${patient.short}</strong><small class="tiny">${patient.record}</small></span></a>`;
  window.svgIcon = name => icon(name);
  window.renderTopbar = (title, subtitle = '') => `<header class="topbar"><div class="topbar-title">${title} <span>${subtitle}</span></div><label class="search">${icon('search')}<input aria-label="Buscar" placeholder="Buscar paciente, historia o cita"></label><div class="row"><span class="chip amber hide-mobile">Mockup · datos ficticios</span><button class="btn btn-secondary btn-small" data-action="notifications">${icon('bell')}<span class="hide-mobile">3 alertas</span></button><span class="avatar teal">AD</span></div></header>`;
})();
