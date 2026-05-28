import { Sanitizer, toolFrame } from './_shared.js';

export function render(container) {
  container.innerHTML = toolFrame('Contador de Caracteres', 'Analise tamanho, palavras, linhas e leitura estimada.', `
    <div class="field">
      <label for="counter-input">Texto</label>
      <textarea id="counter-input" placeholder="Cole seu texto aqui"></textarea>
    </div>
    <div class="kpi-grid" style="margin-top:16px" id="counter-stats"></div>
  `);
  const input = document.getElementById('counter-input');
  input.addEventListener('input', update);
  update();
}

function update() {
  const text = Sanitizer.text(document.getElementById('counter-input').value, 200000);
  const words = text ? text.trim().split(/\s+/).filter(Boolean) : [];
  const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
  const stats = [
    ['CH', text.length, 'Caracteres'],
    ['WD', words.length, 'Palavras'],
    ['LN', lines, 'Linhas'],
    ['RD', `${Math.max(1, Math.ceil(words.length / 220))} min`, 'Leitura']
  ];
  document.getElementById('counter-stats').innerHTML = stats.map(([code, value, label]) => `
    <div class="admin-panel-card"><span class="metric-code">${code}</span><div class="status-number">${value}</div><div class="status-label">${label}</div></div>
  `).join('');
}
