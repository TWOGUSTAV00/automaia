import { copyText, toolFrame } from './_shared.js';

const SETS = {
  upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  lower: 'abcdefghijkmnopqrstuvwxyz',
  numbers: '23456789',
  symbols: '!@#$%&*_-+=?'
};

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Gerador de Senhas', 'Crie senhas fortes com crypto.getRandomValues.', `
    <div class="form-grid">
      <div class="field">
        <label for="pwd-length">Tamanho: <span id="length-value">20</span></label>
        <input id="pwd-length" type="range" min="12" max="64" value="20">
      </div>
      <div class="field">
        <label for="pwd-count">Quantidade</label>
        <input id="pwd-count" type="number" min="1" max="12" value="4">
      </div>
      <div class="field full checkbox-row">
        <label><input id="set-upper" type="checkbox" checked> Maiusculas</label>
        <label><input id="set-lower" type="checkbox" checked> Minusculas</label>
        <label><input id="set-numbers" type="checkbox" checked> Numeros</label>
        <label><input id="set-symbols" type="checkbox" checked> Simbolos</label>
      </div>
    </div>
    <div class="button-row">
      <button class="primary-button" id="generate-pwd">Gerar senhas</button>
      <button class="secondary-button" id="copy-pwd">Copiar tudo</button>
    </div>
    <pre class="code-output" id="pwd-output" style="margin-top:16px"></pre>
  `);

  const length = document.getElementById('pwd-length');
  const lengthValue = document.getElementById('length-value');
  const output = document.getElementById('pwd-output');
  length.addEventListener('input', () => { lengthValue.textContent = length.value; });
  document.getElementById('generate-pwd').addEventListener('click', () => generate(output, toast));
  document.getElementById('copy-pwd').addEventListener('click', () => copyText(output.textContent, toast));
  generate(output, toast);
}

function generate(output, toast) {
  const length = Number(document.getElementById('pwd-length').value);
  const count = Math.min(12, Math.max(1, Number(document.getElementById('pwd-count').value || 1)));
  const pool = [
    document.getElementById('set-upper').checked ? SETS.upper : '',
    document.getElementById('set-lower').checked ? SETS.lower : '',
    document.getElementById('set-numbers').checked ? SETS.numbers : '',
    document.getElementById('set-symbols').checked ? SETS.symbols : ''
  ].join('');
  if (!pool) {
    toast?.('Selecione ao menos um conjunto de caracteres.', 'error');
    return;
  }
  const rows = Array.from({ length: count }, () => secureString(pool, length));
  output.textContent = rows.join('\n');
}

function secureString(pool, length) {
  const random = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(random, (value) => pool[value % pool.length]).join('');
}
