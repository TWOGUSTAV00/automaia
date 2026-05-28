const KEY = 'tk_analytics';

export const AnalyticsPanel = {
  render(container) {
    const stats = loadStats();
    container.innerHTML = `
      <div class="panel-header">
        <div>
          <h1 class="panel-title">Analytics local</h1>
          <p class="panel-subtitle">Dados privados neste navegador. Sem pixel externo por padrao.</p>
        </div>
        <button class="secondary-button" id="reset-analytics">Limpar</button>
      </div>
      <div class="kpi-grid">
        ${metric('PV', stats.pageViews, 'Pageviews locais')}
        ${metric('US', stats.totalToolUses, 'Usos de ferramentas')}
        ${metric('MB', `${stats.mobilePercent}%`, 'Acessos mobile')}
        ${metric('TL', Object.keys(stats.tools).length, 'Ferramentas usadas')}
      </div>
      <section class="admin-panel-card" style="margin-top:14px">
        <h2 class="panel-title">Ferramentas mais usadas</h2>
        <div id="tool-usage-chart">${renderBars(stats.tools)}</div>
      </section>
    `;
    document.getElementById('reset-analytics')?.addEventListener('click', () => {
      localStorage.removeItem(KEY);
      this.render(container);
    });
  }
};

export function trackPageView() {
  const raw = read();
  raw.pageViews = (raw.pageViews || 0) + 1;
  raw.mobilePercent = window.innerWidth < 768 ? 100 : raw.mobilePercent || 0;
  save(raw);
}

export function trackToolUse(toolId) {
  const raw = read();
  raw.tools = raw.tools || {};
  raw.tools[toolId] = (raw.tools[toolId] || 0) + 1;
  save(raw);
}

function loadStats() {
  const data = read();
  const tools = data.tools || {};
  return {
    pageViews: data.pageViews || 0,
    totalToolUses: Object.values(tools).reduce((sum, value) => sum + value, 0),
    mobilePercent: data.mobilePercent || 0,
    tools
  };
}

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function metric(code, value, label) {
  return `
    <div class="admin-panel-card">
      <span class="metric-code">${code}</span>
      <div class="status-number">${value}</div>
      <div class="status-label">${label}</div>
    </div>
  `;
}

function renderBars(tools) {
  const entries = Object.entries(tools).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return '<p class="muted">Ainda nao ha uso registrado.</p>';
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  return entries.map(([tool, count]) => `
    <div class="bar-row">
      <span>${tool}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(count / max) * 100}%"></div></div>
      <span>${count}</span>
    </div>
  `).join('');
}
