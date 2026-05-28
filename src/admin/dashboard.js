import { AdminAuth } from '../security/auth.js';
import { AnalyticsPanel } from './analytics.js';
import { ToolsManagerPanel } from './tools-manager.js';
import { AffiliateManagerPanel } from './affiliate-manager.js';
import { AdSenseManagerPanel } from './adsense-manager.js';
import { AnnouncementPanel } from './announcement-manager.js';
import { ConfigManagerPanel } from './config-manager.js';
import { AuditLogPanel } from './audit-log.js';

const NAV_ITEMS = [
  { id: 'analytics', code: 'AN', label: 'Analytics', panel: AnalyticsPanel },
  { id: 'tools', code: 'TL', label: 'Ferramentas', panel: ToolsManagerPanel },
  { id: 'affiliates', code: 'AF', label: 'Afiliados', panel: AffiliateManagerPanel },
  { id: 'adsense', code: 'AD', label: 'AdSense', panel: AdSenseManagerPanel },
  { id: 'announce', code: 'AV', label: 'Avisos', panel: AnnouncementPanel },
  { id: 'config', code: 'CF', label: 'Configuracoes', panel: ConfigManagerPanel },
  { id: 'audit', code: 'AU', label: 'Auditoria', panel: AuditLogPanel }
];

export function renderAdminDashboard(container) {
  container.innerHTML = `
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <div class="sidebar-logo"><span class="brand-mark">AI</span><span>Automaia Admin</span></div>
        <nav class="sidebar-nav" aria-label="Paineis administrativos">
          ${NAV_ITEMS.map((item) => `
            <button class="sidebar-item" data-panel="${item.id}">
              <span class="sidebar-code">${item.code}</span>
              <span>${item.label}</span>
            </button>
          `).join('')}
        </nav>
        <div class="sidebar-footer">
          <div class="session-info"><span>Sessao ativa</span><span id="session-timer">30:00</span></div>
          <button class="danger-button" id="logout-btn">Sair</button>
        </div>
      </aside>
      <main class="admin-main">
        <header class="admin-topbar">
          <div id="breadcrumb">Dashboard / Analytics</div>
          <span class="badge">Web Crypto + localStorage</span>
        </header>
        <section class="admin-panel" id="admin-panel-content"></section>
      </main>
    </div>
  `;

  async function loadPanel(id) {
    const item = NAV_ITEMS.find((nav) => nav.id === id) || NAV_ITEMS[0];
    document.querySelectorAll('.sidebar-item').forEach((btn) => btn.classList.toggle('active', btn.dataset.panel === item.id));
    document.getElementById('breadcrumb').textContent = `Dashboard / ${item.label}`;
    const panel = document.getElementById('admin-panel-content');
    panel.innerHTML = '';
    await item.panel.render(panel);
  }

  document.querySelectorAll('.sidebar-item').forEach((btn) => {
    btn.addEventListener('click', () => loadPanel(btn.dataset.panel));
  });
  document.getElementById('logout-btn').addEventListener('click', () => AdminAuth.logout());
  startSessionTimer();
  loadPanel('analytics');
}

function startSessionTimer() {
  const el = document.getElementById('session-timer');
  const session = JSON.parse(sessionStorage.getItem('tk_session') || 'null');
  const end = session?.expiresAt || Date.now();
  const interval = setInterval(() => {
    const remaining = Math.max(0, end - Date.now());
    const m = Math.floor(remaining / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    el.textContent = `${m}:${String(s).padStart(2, '0')}`;
    el.style.color = remaining < 5 * 60 * 1000 ? 'var(--danger)' : 'var(--success)';
    if (remaining <= 0) {
      clearInterval(interval);
      AdminAuth.logout();
    }
  }, 1000);
}
