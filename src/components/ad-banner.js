export function renderAffiliateStrip() {
  const affiliates = loadAffiliates().filter((item) => item.active).slice(0, 3);
  if (!affiliates.length) return '';

  return `
    <section class="affiliate-strip" aria-label="Recursos recomendados">
      <div class="section-heading" style="margin-top:0">
        <div>
          <h2>Recursos para acelerar seu trabalho</h2>
          <p>Links configuraveis no painel admin. Nada e carregado de terceiros ate voce clicar.</p>
        </div>
      </div>
      <div class="tool-grid">
        ${affiliates.map((item) => `
          <a class="tool-card" href="${escapeAttr(item.url)}" target="_blank" rel="noopener sponsored">
            <span>
              <span class="tool-card-top">
                <span class="tool-code" aria-hidden="true">${escapeHTML(item.code || item.name.slice(0, 2).toUpperCase())}</span>
                ${item.badge ? `<span class="badge">${escapeHTML(item.badge)}</span>` : '<span class="badge">Recurso</span>'}
              </span>
              <h3>${escapeHTML(item.name)}</h3>
              <p>${escapeHTML(item.cta)}</p>
            </span>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

function loadAffiliates() {
  const fallback = [
    { id: 'canva', code: 'CV', name: 'Canva Pro', url: 'https://www.canva.com/pro/', cta: 'Crie pecas visuais com mais velocidade.', badge: 'Design', active: true },
    { id: 'hostinger', code: 'HS', name: 'Hostinger', url: 'https://www.hostinger.com.br/', cta: 'Hospedagem para projetos web simples.', badge: 'Hosting', active: true },
    { id: 'adobe', code: 'AD', name: 'Adobe Creative Cloud', url: 'https://www.adobe.com/br/creativecloud.html', cta: 'Edicao profissional de imagem e video.', badge: 'Criacao', active: true }
  ];
  try {
    const raw = localStorage.getItem('tk_affiliates');
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
}

function escapeAttr(value) {
  return escapeHTML(value);
}
