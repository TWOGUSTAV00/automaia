import { TOOLS } from '../tools/catalog.js';

const KEY = 'tk_tools_state';

export const ToolsManagerPanel = {
  render(container) {
    const state = loadState();
    container.innerHTML = `
      <div class="panel-header">
        <div>
          <h1 class="panel-title">Ferramentas</h1>
          <p class="panel-subtitle">Ative, desative e organize a vitrine publica.</p>
        </div>
        <button class="secondary-button" id="reset-tools">Restaurar padrao</button>
      </div>
      <div class="admin-panel-card table-wrap">
        <table>
          <thead><tr><th>Ativa</th><th>Codigo</th><th>Ferramenta</th><th>Categoria</th></tr></thead>
          <tbody>
            ${TOOLS.map((tool) => `
              <tr>
                <td><input type="checkbox" data-tool="${tool.id}" ${state.disabled.includes(tool.id) ? '' : 'checked'}></td>
                <td><span class="metric-code">${tool.code}</span></td>
                <td><strong>${tool.title}</strong><br><span class="muted">${tool.description}</span></td>
                <td>${tool.category}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    container.querySelectorAll('[data-tool]').forEach((input) => {
      input.addEventListener('change', () => {
        const next = loadState();
        next.disabled = TOOLS.filter((tool) => !container.querySelector(`[data-tool="${tool.id}"]`).checked).map((tool) => tool.id);
        saveState(next);
      });
    });
    document.getElementById('reset-tools')?.addEventListener('click', () => {
      localStorage.removeItem(KEY);
      this.render(container);
    });
  }
};

function loadState() {
  try {
    return { disabled: [], order: TOOLS.map((tool) => tool.id), ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return { disabled: [], order: TOOLS.map((tool) => tool.id) };
  }
}

function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
