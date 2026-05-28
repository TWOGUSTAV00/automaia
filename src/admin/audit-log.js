import { CryptoEngine } from '../security/crypto.js';

const LOG_KEY = 'tk_audit_log';
const DEVICE_KEY = 'tk_device_audit_key';
const MAX_ENTRIES = 500;

export const AuditLog = {
  async write(event, detail = '') {
    const log = await this.readRaw();
    log.unshift({
      ts: new Date().toISOString(),
      event,
      detail,
      ua: navigator.userAgent.slice(0, 100)
    });
    if (log.length > MAX_ENTRIES) log.splice(MAX_ENTRIES);
    localStorage.setItem(LOG_KEY, await CryptoEngine.encrypt(JSON.stringify(log), getDeviceSecret()));
  },

  async readRaw() {
    const encrypted = localStorage.getItem(LOG_KEY);
    if (!encrypted) return [];
    try {
      return JSON.parse(await CryptoEngine.decrypt(encrypted, getDeviceSecret()));
    } catch {
      return [];
    }
  }
};

export const AuditLogPanel = {
  async render(container) {
    const log = await AuditLog.readRaw();
    container.innerHTML = `
      <div class="panel-header">
        <div>
          <h1 class="panel-title">Auditoria</h1>
          <p class="panel-subtitle">Log criptografado localmente neste navegador. ${log.length} entradas.</p>
        </div>
        <button class="danger-button" id="clear-log">Limpar log</button>
      </div>
      <div class="admin-panel-card table-wrap">
        <table>
          <thead><tr><th>Data</th><th>Evento</th><th>Detalhe</th></tr></thead>
          <tbody>
            ${log.map((entry) => `
              <tr>
                <td>${new Date(entry.ts).toLocaleString('pt-BR')}</td>
                <td><span class="badge">${entry.event}</span></td>
                <td>${escapeHTML(entry.detail)}</td>
              </tr>
            `).join('') || '<tr><td colspan="3" class="muted">Sem registros.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
    document.getElementById('clear-log')?.addEventListener('click', () => {
      localStorage.removeItem(LOG_KEY);
      this.render(container);
    });
  }
};

function getDeviceSecret() {
  let secret = localStorage.getItem(DEVICE_KEY);
  if (!secret) {
    secret = CryptoEngine.randomHex(32);
    localStorage.setItem(DEVICE_KEY, secret);
  }
  return secret;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
}
