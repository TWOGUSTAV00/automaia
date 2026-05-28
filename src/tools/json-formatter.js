import { copyText, downloadText, Sanitizer, toolFrame } from './_shared.js';

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Formatador JSON', 'Valide, formate, compacte e baixe JSON.', `
    <div class="field">
      <label for="json-input">JSON</label>
      <textarea id="json-input" spellcheck="false" placeholder='{"status":"ok"}'></textarea>
    </div>
    <div class="button-row">
      <button class="primary-button" id="format-json">Formatar</button>
      <button class="secondary-button" id="minify-json">Compactar</button>
      <button class="secondary-button" id="copy-json">Copiar resultado</button>
      <button class="secondary-button" id="download-json">Baixar</button>
    </div>
    <pre class="code-output" id="json-output" style="margin-top:16px"></pre>
  `);
  const output = document.getElementById('json-output');
  document.getElementById('format-json').addEventListener('click', () => transform(output, 2, toast));
  document.getElementById('minify-json').addEventListener('click', () => transform(output, 0, toast));
  document.getElementById('copy-json').addEventListener('click', () => copyText(output.textContent, toast));
  document.getElementById('download-json').addEventListener('click', () => downloadText(output.textContent, 'formatado.json', 'application/json'));
}

function transform(output, spaces, toast) {
  try {
    const clean = Sanitizer.sanitizeJSON(document.getElementById('json-input').value);
    output.textContent = JSON.stringify(JSON.parse(clean), null, spaces);
    toast?.('JSON valido.', 'success');
  } catch (error) {
    output.textContent = `Erro: ${error.message}`;
    toast?.('JSON invalido.', 'error');
  }
}
