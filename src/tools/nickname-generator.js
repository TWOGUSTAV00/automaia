import { copyText, Sanitizer, toolFrame } from './_shared.js';

const PREFIX = ['neo', 'auto', 'pixel', 'nova', 'byte', 'astro', 'flux', 'craft', 'prime', 'urban'];
const CORE = ['maia', 'forge', 'pilot', 'lab', 'shift', 'vault', 'spark', 'node', 'works', 'studio'];
const SUFFIX = ['hq', 'io', 'br', 'app', 'one', 'now', 'pro', 'grid', 'zone', 'club'];

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Gerador de Nickname', 'Nomes curtos para perfil, marca ou produto.', `
    <div class="form-grid">
      <div class="field"><label for="nick-seed">Palavra base</label><input id="nick-seed" placeholder="ex: automacao"></div>
      <div class="field"><label for="nick-count">Quantidade</label><input id="nick-count" type="number" min="4" max="40" value="12"></div>
    </div>
    <div class="button-row">
      <button class="primary-button" id="make-nicks">Gerar nomes</button>
      <button class="secondary-button" id="copy-nicks">Copiar</button>
    </div>
    <pre class="code-output" id="nick-output" style="margin-top:16px"></pre>
  `);
  const output = document.getElementById('nick-output');
  document.getElementById('make-nicks').addEventListener('click', () => make(output));
  document.getElementById('copy-nicks').addEventListener('click', () => copyText(output.textContent, toast));
  make(output);
}

function make(output) {
  const seed = Sanitizer.text(document.getElementById('nick-seed').value || 'maia', 40).toLowerCase().replace(/[^a-z0-9]/g, '');
  const count = Math.min(40, Math.max(4, Number(document.getElementById('nick-count').value || 12)));
  const names = new Set();
  while (names.size < count) {
    const pattern = randomInt(4);
    const name = pattern === 0
      ? `${pick(PREFIX)}${seed}`
      : pattern === 1
        ? `${seed}${pick(SUFFIX)}`
        : pattern === 2
          ? `${pick(PREFIX)}${pick(CORE)}`
          : `${seed}${randomInt(99) + 1}`;
    names.add(name);
  }
  output.textContent = [...names].join('\n');
}

function pick(list) {
  return list[randomInt(list.length)];
}

function randomInt(max) {
  return crypto.getRandomValues(new Uint32Array(1))[0] % max;
}
