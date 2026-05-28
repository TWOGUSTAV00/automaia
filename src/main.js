import './style.css';
import { animate, inView, stagger } from 'motion';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderToolCard } from './components/tool-card.js';
import { renderAffiliateStrip } from './components/ad-banner.js';
import { bindCookieConsent, renderCookieConsent } from './components/cookie-consent.js';
import { trackToolUse, trackPageView } from './admin/analytics.js';
import { TOOLS } from './tools/catalog.js';

const app = document.getElementById('app');
const TOOL_MODULES = {
  'background-remover': () => import('./tools/background-remover.js'),
  'image-converter': () => import('./tools/image-converter.js'),
  'image-compressor': () => import('./tools/image-compressor.js'),
  'bio-generator': () => import('./tools/bio-generator.js'),
  'nickname-generator': () => import('./tools/nickname-generator.js'),
  'password-generator': () => import('./tools/password-generator.js'),
  'qrcode-generator': () => import('./tools/qrcode-generator.js'),
  'char-counter': () => import('./tools/char-counter.js'),
  'json-formatter': () => import('./tools/json-formatter.js'),
  'link-shortener': () => import('./tools/link-shortener.js')
};

function renderShell(content) {
  app.innerHTML = `
    <div class="app-shell">
      ${renderNavbar()}
      <main class="main" id="content" tabindex="-1">${content}</main>
      ${renderFooter()}
      <div class="toast-host" id="toast-host" aria-live="polite"></div>
      ${renderCookieConsent()}
    </div>
  `;
  bindCookieConsent();
}

function renderHome() {
  trackPageView();
  const enabled = getEnabledTools();
  renderShell(`
    <section class="hero">
      <div>
        <span class="eyebrow">Ferramentas locais para trabalho real</span>
        <h1>Utilitarios online, rapidos e sem friccao.</h1>
        <p class="hero-copy">Automaia junta ferramentas de imagem, texto, codigo e seguranca em uma interface direta. A maior parte roda 100% no seu navegador, com arquivos processados localmente sempre que possivel.</p>
        <div class="hero-actions">
          <a class="primary-button" href="./#tools">Abrir ferramentas</a>
          <a class="secondary-button" href="./admin.html" rel="nofollow">Painel admin</a>
        </div>
      </div>
      <aside class="status-panel" aria-label="Resumo das ferramentas">
        <div class="status-grid">
          <div class="status-tile"><span class="status-number">${enabled.length}</span><span class="status-label">ferramentas ativas</span></div>
          <div class="status-tile"><span class="status-number">0</span><span class="status-label">uploads obrigatorios</span></div>
          <div class="status-tile"><span class="status-number">AES</span><span class="status-label">backup criptografado</span></div>
          <div class="status-tile"><span class="status-number">SPA</span><span class="status-label">estatico e rapido</span></div>
        </div>
      </aside>
    </section>

    <section id="tools">
      <div class="section-heading">
        <div>
          <h2>Ferramentas</h2>
          <p>Escolha uma tarefa e resolva no navegador, sem cadastro.</p>
        </div>
        <label class="searchbar">
          <span class="metric-code" aria-hidden="true">/</span>
          <input id="tool-search" type="search" placeholder="Buscar ferramenta" autocomplete="off">
        </label>
      </div>
      <div class="tool-grid" id="tool-grid">
        ${enabled.map(renderToolCard).join('')}
      </div>
    </section>

    ${renderAffiliateStrip()}

    <section class="notice-band" id="privacy" style="margin-top:18px">
      <h2 class="panel-title">Privacidade por desenho</h2>
      <p class="muted">Imagens e textos sao processados localmente quando a ferramenta permite. O painel admin guarda configuracoes no armazenamento do seu navegador e permite exportar backups criptografados com Web Crypto API.</p>
    </section>
  `);
  bindHome();
  runEntranceMotion();
}

async function renderTool(id) {
  const tool = TOOLS.find((item) => item.id === id);
  if (!tool || !getEnabledTools().some((item) => item.id === id)) {
    renderNotFound();
    return;
  }

  trackToolUse(tool.id);
  renderShell(`
    <div class="tool-header">
      <div>
        <a class="ghost-button" href="./#/">Voltar</a>
        <h1 class="tool-title">${tool.title}</h1>
        <p>${tool.description}</p>
      </div>
      <span class="tool-code" aria-hidden="true">${tool.code}</span>
    </div>
    <div class="tool-layout">
      <section class="tool-workspace" id="tool-root" aria-live="polite"></section>
      <aside class="side-panel">
        <h2 class="panel-title">Como funciona</h2>
        <p class="muted">Entrada sanitizada, estados claros e processamento client-side. Para arquivos, tipos de imagem sao validados antes do processamento.</p>
        <div class="tool-tag-row">${tool.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
      </aside>
    </div>
  `);

  const root = document.getElementById('tool-root');
  try {
    const module = await TOOL_MODULES[tool.id]();
    module.render(root, { toast });
  } catch (error) {
    root.innerHTML = `<div class="error-banner">Erro ao carregar ferramenta: ${escapeHTML(error.message)}</div>`;
  }
  runEntranceMotion();
}

function renderNotFound() {
  renderShell(`
    <section class="notice-band">
      <h1 class="page-title">Ferramenta nao encontrada</h1>
      <p class="muted">O link pode estar errado ou a ferramenta foi desativada no painel.</p>
      <a class="primary-button" href="./#/">Voltar para inicio</a>
    </section>
  `);
}

function bindHome() {
  const search = document.getElementById('tool-search');
  const cards = [...document.querySelectorAll('[data-tool-card]')];
  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    cards.forEach((card) => {
      card.hidden = query && !card.dataset.title.includes(query);
    });
  });
}

function getEnabledTools() {
  try {
    const state = JSON.parse(localStorage.getItem('tk_tools_state') || '{}');
    const disabled = new Set(state.disabled || []);
    const order = state.order || TOOLS.map((item) => item.id);
    return order
      .map((id) => TOOLS.find((tool) => tool.id === id))
      .filter(Boolean)
      .filter((tool) => !disabled.has(tool.id));
  } catch {
    return TOOLS;
  }
}

function route() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw || raw === 'tools' || raw === 'privacy') {
    renderHome();
    if (raw) setTimeout(() => document.getElementById(raw)?.scrollIntoView({ block: 'start' }), 0);
    return;
  }
  renderTool(raw);
}

function runEntranceMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = document.querySelectorAll('[data-tool-card], .tool-workspace, .side-panel, .status-panel, .notice-band');
  animate(cards, { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0)'] }, { duration: 0.34, delay: stagger(0.035), easing: 'ease-out' });
  inView('.affiliate-strip', ({ target }) => {
    animate(target, { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] }, { duration: 0.32 });
  });
}

export function toast(message, type = 'info') {
  const host = document.getElementById('toast-host');
  if (!host) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  host.append(el);
  setTimeout(() => el.remove(), 4200);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
}

window.addEventListener('hashchange', route);
route();
