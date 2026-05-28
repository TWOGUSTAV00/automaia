import imageCompression from 'browser-image-compression';
import { downloadBlob, humanBytes, Sanitizer, toolFrame } from './_shared.js';

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Compressor de Imagem', 'Otimize imagens para web com controle de qualidade e largura maxima.', `
    <div class="drop-zone">
      <div>
        <label for="compress-file">Selecione uma imagem</label>
        <input id="compress-file" type="file" accept="image/png,image/jpeg,image/webp">
      </div>
    </div>
    <div class="form-grid" style="margin-top:16px">
      <div class="field"><label for="compress-size">Tamanho maximo (MB)</label><input id="compress-size" type="number" min="0.1" max="10" step="0.1" value="1"></div>
      <div class="field"><label for="compress-width">Largura maxima</label><input id="compress-width" type="number" min="320" max="4000" value="1600"></div>
    </div>
    <div class="button-row"><button class="primary-button" id="compress-btn">Comprimir</button></div>
    <div class="image-preview" id="compress-preview"></div>
  `);
  document.getElementById('compress-btn').addEventListener('click', () => compress(toast));
}

async function compress(toast) {
  const file = document.getElementById('compress-file').files[0];
  const preview = document.getElementById('compress-preview');
  try {
    await Sanitizer.validateImageMagicBytes(file);
    const compressed = await imageCompression(file, {
      maxSizeMB: Number(document.getElementById('compress-size').value || 1),
      maxWidthOrHeight: Number(document.getElementById('compress-width').value || 1600),
      useWebWorker: true
    });
    const saved = Math.max(0, 100 - (compressed.size / file.size) * 100).toFixed(1);
    preview.innerHTML = `
      <div><h3>Original</h3><p class="muted">${humanBytes(file.size)}</p><img src="${URL.createObjectURL(file)}" alt="Original"></div>
      <div><h3>Comprimida</h3><p class="muted">${humanBytes(compressed.size)} - ${saved}% menor</p><img src="${URL.createObjectURL(compressed)}" alt="Comprimida"><div class="button-row"><button class="secondary-button" id="download-compressed">Baixar</button></div></div>
    `;
    document.getElementById('download-compressed').addEventListener('click', () => downloadBlob(compressed, `comprimida-${file.name}`));
    toast?.('Imagem comprimida.', 'success');
  } catch (error) {
    preview.innerHTML = `<div class="error-banner">${error.message}</div>`;
  }
}
