const KEY = 'tk_adsense';

export const AdSenseManagerPanel = {
  render(container) {
    const config = load();
    container.innerHTML = `
      <div class="panel-header">
        <div>
          <h1 class="panel-title">AdSense</h1>
          <p class="panel-subtitle">IDs salvos localmente. O codigo publico so carrega anuncios quando voce configurar.</p>
        </div>
      </div>
      <form class="admin-panel-card form-grid" id="adsense-form">
        <div class="field"><label>Publisher ID</label><input id="ads-pub" placeholder="ca-pub-..." value="${config.publisher || ''}"></div>
        <div class="field"><label>Slot topo</label><input id="ads-top" placeholder="1234567890" value="${config.top || ''}"></div>
        <div class="field"><label>Slot lateral</label><input id="ads-side" placeholder="1234567890" value="${config.side || ''}"></div>
        <div class="field"><label>Slot rodape</label><input id="ads-bottom" placeholder="1234567890" value="${config.bottom || ''}"></div>
        <div class="button-row full"><button class="primary-button">Salvar AdSense</button></div>
        <div class="success-banner full" id="ads-ok" hidden>Configuracao salva.</div>
      </form>
    `;
    document.getElementById('adsense-form').addEventListener('submit', (event) => {
      event.preventDefault();
      save({
        publisher: document.getElementById('ads-pub').value.trim(),
        top: document.getElementById('ads-top').value.trim(),
        side: document.getElementById('ads-side').value.trim(),
        bottom: document.getElementById('ads-bottom').value.trim()
      });
      document.getElementById('ads-ok').hidden = false;
    });
  }
};

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
