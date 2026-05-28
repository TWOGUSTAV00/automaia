import { Sanitizer } from '../security/sanitizer.js';

const KEY = 'tk_affiliates';
const DEFAULTS = [
  { id: 'canva', code: 'CV', name: 'Canva Pro', url: 'https://www.canva.com/pro/', cta: 'Crie pecas visuais com mais velocidade.', badge: 'Design', active: true },
  { id: 'hostinger', code: 'HS', name: 'Hostinger', url: 'https://www.hostinger.com.br/', cta: 'Hospedagem para projetos web simples.', badge: 'Hosting', active: true },
  { id: 'adobe', code: 'AD', name: 'Adobe Creative Cloud', url: 'https://www.adobe.com/br/creativecloud.html', cta: 'Edicao profissional de imagem e video.', badge: 'Criacao', active: true }
];

export const AffiliateManagerPanel = {
  render(container) {
    const list = load();
    container.innerHTML = `
      <div class="panel-header">
        <div>
          <h1 class="panel-title">Afiliados</h1>
          <p class="panel-subtitle">Links editaveis. Use somente URLs de marcas que voce realmente recomenda.</p>
        </div>
        <button class="primary-button" id="add-affiliate">Adicionar</button>
      </div>
      <div class="admin-panel-card" id="affiliate-list">
        ${list.map(renderRow).join('')}
      </div>
    `;
    bind(container, list);
  }
};

function renderRow(item) {
  return `
    <div class="form-grid" data-aff="${item.id}" style="border-bottom:1px solid var(--border); padding:14px 0">
      <div class="field"><label>Nome</label><input data-field="name" value="${escapeAttr(item.name)}"></div>
      <div class="field"><label>Codigo</label><input data-field="code" value="${escapeAttr(item.code || '')}"></div>
      <div class="field full"><label>URL</label><input data-field="url" value="${escapeAttr(item.url)}"></div>
      <div class="field"><label>CTA</label><input data-field="cta" value="${escapeAttr(item.cta)}"></div>
      <div class="field"><label>Badge</label><input data-field="badge" value="${escapeAttr(item.badge || '')}"></div>
      <label class="checkbox-row"><input type="checkbox" data-field="active" ${item.active ? 'checked' : ''}> Ativo</label>
      <button class="danger-button" data-delete="${item.id}">Remover</button>
    </div>
  `;
}

function bind(container, list) {
  container.addEventListener('input', () => saveFromDom(container, list));
  container.addEventListener('change', () => saveFromDom(container, list));
  container.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      save(list.filter((item) => item.id !== btn.dataset.delete));
      AffiliateManagerPanel.render(container);
    });
  });
  document.getElementById('add-affiliate')?.addEventListener('click', () => {
    list.push({ id: `aff-${Date.now()}`, code: 'AF', name: 'Novo recurso', url: 'https://example.com', cta: 'Editar chamada', badge: '', active: true });
    save(list);
    AffiliateManagerPanel.render(container);
  });
}

function saveFromDom(container) {
  const next = [...container.querySelectorAll('[data-aff]')].map((row) => {
    const data = { id: row.dataset.aff };
    row.querySelectorAll('[data-field]').forEach((input) => {
      data[input.dataset.field] = input.type === 'checkbox' ? input.checked : input.value;
    });
    try {
      data.url = Sanitizer.validateURL(data.url);
    } catch {}
    return data;
  });
  save(next);
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null') || DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

function escapeAttr(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
}
