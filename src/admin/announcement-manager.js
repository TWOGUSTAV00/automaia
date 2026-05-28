const KEY = 'tk_announcement';

export const AnnouncementPanel = {
  render(container) {
    const data = load();
    container.innerHTML = `
      <div class="panel-header">
        <div>
          <h1 class="panel-title">Avisos</h1>
          <p class="panel-subtitle">Banner local para campanhas, manutencao ou comunicados.</p>
        </div>
      </div>
      <form class="admin-panel-card form-grid" id="announce-form">
        <label class="checkbox-row full"><input id="ann-active" type="checkbox" ${data.active ? 'checked' : ''}> Aviso ativo</label>
        <div class="field full"><label>Texto</label><textarea id="ann-text">${data.text || ''}</textarea></div>
        <div class="field"><label>Tipo</label><select id="ann-type"><option value="info">Info</option><option value="warning">Alerta</option><option value="success">Sucesso</option></select></div>
        <div class="button-row full"><button class="primary-button">Salvar aviso</button></div>
        <div class="success-banner full" id="ann-ok" hidden>Aviso salvo.</div>
      </form>
    `;
    document.getElementById('ann-type').value = data.type || 'info';
    document.getElementById('announce-form').addEventListener('submit', (event) => {
      event.preventDefault();
      save({
        active: document.getElementById('ann-active').checked,
        text: document.getElementById('ann-text').value.trim(),
        type: document.getElementById('ann-type').value
      });
      document.getElementById('ann-ok').hidden = false;
    });
  }
};

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
