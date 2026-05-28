import { CryptoEngine } from '../security/crypto.js';
import { AuditLog } from './audit-log.js';

const KEY = 'tk_config';

export const ConfigManagerPanel = {
  render(container) {
    const config = load();
    container.innerHTML = `
      <div class="panel-header">
        <div>
          <h1 class="panel-title">Configuracoes</h1>
          <p class="panel-subtitle">Backup criptografado com AES-GCM usando senha escolhida na exportacao.</p>
        </div>
      </div>
      <form class="admin-panel-card form-grid" id="config-form">
        <div class="field"><label>Nome do site</label><input id="cfg-name" value="${config.siteName || 'Automaia'}"></div>
        <div class="field"><label>Google Analytics ID</label><input id="cfg-ga" value="${config.ga || ''}" placeholder="G-XXXXXXXX"></div>
        <div class="field full"><label>Mensagem institucional</label><textarea id="cfg-message">${config.message || ''}</textarea></div>
        <div class="button-row full"><button class="primary-button">Salvar</button></div>
        <div class="success-banner full" id="cfg-ok" hidden>Configuracao salva.</div>
      </form>
      <section class="admin-panel-card" style="margin-top:14px">
        <h2 class="panel-title">Backup criptografado</h2>
        <div class="form-grid" style="margin-top:12px">
          <div class="field"><label>Senha do backup</label><input id="backup-pwd" type="password"></div>
          <div class="field"><label>Arquivo .tkconfig</label><input id="backup-file" type="file" accept=".tkconfig"></div>
          <div class="button-row full">
            <button class="secondary-button" id="export-config" type="button">Exportar</button>
            <button class="secondary-button" id="import-config" type="button">Importar</button>
            <button class="danger-button" id="reset-all" type="button">Reset total</button>
          </div>
        </div>
      </section>
    `;
    bind(container);
  }
};

function bind(container) {
  document.getElementById('config-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    save({
      siteName: document.getElementById('cfg-name').value.trim(),
      ga: document.getElementById('cfg-ga').value.trim(),
      message: document.getElementById('cfg-message').value.trim()
    });
    await AuditLog.write('CONFIG_SAVE', 'Configuracao geral salva');
    document.getElementById('cfg-ok').hidden = false;
  });

  document.getElementById('export-config').addEventListener('click', async () => {
    const password = document.getElementById('backup-pwd').value;
    if (!password) return alert('Digite uma senha para o backup.');
    const allData = {};
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('tk_')) allData[key] = localStorage.getItem(key);
    }
    const encrypted = await CryptoEngine.encrypt(JSON.stringify({ version: 1, createdAt: new Date().toISOString(), allData }), password);
    const blob = new Blob([encrypted], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `automaia-backup-${Date.now()}.tkconfig`;
    a.click();
    URL.revokeObjectURL(url);
    await AuditLog.write('EXPORT', 'Backup criptografado exportado');
  });

  document.getElementById('import-config').addEventListener('click', async () => {
    const password = document.getElementById('backup-pwd').value;
    const file = document.getElementById('backup-file').files[0];
    if (!password || !file) return alert('Selecione arquivo e senha.');
    try {
      const decrypted = await CryptoEngine.decrypt(await file.text(), password);
      const data = JSON.parse(decrypted);
      Object.entries(data.allData || {}).forEach(([key, value]) => localStorage.setItem(key, value));
      await AuditLog.write('IMPORT', 'Backup criptografado importado');
      alert('Backup importado.');
      window.location.reload();
    } catch {
      alert('Senha incorreta ou arquivo invalido.');
    }
  });

  document.getElementById('reset-all').addEventListener('click', () => {
    if (prompt('Digite RESET para apagar tudo neste navegador.') === 'RESET') {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = './admin.html';
    }
  });
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
