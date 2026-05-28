import { copyText, Sanitizer, toolFrame } from './_shared.js';

const limit = Sanitizer.createRateLimiter(4, 60000);

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Encurtador de Links', 'Valida a URL e usa a API gratuita do is.gd.', `
    <div class="field">
      <label for="short-url">URL longa</label>
      <input id="short-url" type="url" placeholder="https://example.com/pagina">
      <span class="help">Limite local: 4 chamadas por minuto.</span>
    </div>
    <div class="button-row">
      <button class="primary-button" id="shorten-btn">Encurtar</button>
      <button class="secondary-button" id="copy-short">Copiar</button>
    </div>
    <pre class="code-output" id="short-output" style="margin-top:16px"></pre>
  `);
  const output = document.getElementById('short-output');
  document.getElementById('shorten-btn').addEventListener('click', () => shorten(output, toast));
  document.getElementById('copy-short').addEventListener('click', () => copyText(output.textContent.trim(), toast));
}

async function shorten(output, toast) {
  try {
    limit();
    const safeUrl = Sanitizer.validateURL(document.getElementById('short-url').value);
    output.textContent = 'Encurtando...';
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(safeUrl)}`);
    const data = await response.json();
    if (!response.ok || data.errorcode) throw new Error(data.errormessage || 'Falha ao encurtar link.');
    output.textContent = data.shorturl;
    toast?.('Link encurtado.', 'success');
  } catch (error) {
    output.textContent = `Erro: ${error.message}`;
    toast?.(error.message, 'error');
  }
}
