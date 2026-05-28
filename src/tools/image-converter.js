import { canvasToBlob, downloadBlob, humanBytes, Sanitizer, toolFrame } from './_shared.js';

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Conversor de Imagem', 'Converta imagens para PNG, JPEG ou WebP usando canvas.', `
    <div class="drop-zone">
      <div>
        <label for="convert-file">Selecione uma imagem</label>
        <input id="convert-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif">
      </div>
    </div>
    <div class="form-grid" style="margin-top:16px">
      <div class="field"><label for="convert-format">Formato</label><select id="convert-format"><option value="image/webp">WebP</option><option value="image/png">PNG</option><option value="image/jpeg">JPEG</option></select></div>
      <div class="field"><label for="convert-quality">Qualidade: <span id="quality-label">0.86</span></label><input id="convert-quality" type="range" min="0.35" max="1" step="0.01" value="0.86"></div>
    </div>
    <div class="button-row"><button class="primary-button" id="convert-btn">Converter</button></div>
    <div class="image-preview" id="convert-preview"></div>
  `);
  document.getElementById('convert-quality').addEventListener('input', (e) => { document.getElementById('quality-label').textContent = e.target.value; });
  document.getElementById('convert-btn').addEventListener('click', () => convert(toast));
}

async function convert(toast) {
  const file = document.getElementById('convert-file').files[0];
  const preview = document.getElementById('convert-preview');
  try {
    await Sanitizer.validateImageMagicBytes(file);
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    const type = document.getElementById('convert-format').value;
    const quality = Number(document.getElementById('convert-quality').value);
    const blob = await canvasToBlob(canvas, type, quality);
    const ext = type.split('/')[1].replace('jpeg', 'jpg');
    const url = URL.createObjectURL(blob);
    preview.innerHTML = `
      <div><h3>Original</h3><p class="muted">${humanBytes(file.size)}</p><img src="${URL.createObjectURL(file)}" alt="Original"></div>
      <div><h3>Convertida</h3><p class="muted">${humanBytes(blob.size)}</p><img src="${url}" alt="Convertida"><div class="button-row"><button class="secondary-button" id="download-converted">Baixar</button></div></div>
    `;
    document.getElementById('download-converted').addEventListener('click', () => downloadBlob(blob, `imagem-convertida.${ext}`));
    toast?.('Imagem convertida.', 'success');
  } catch (error) {
    preview.innerHTML = `<div class="error-banner">${error.message}</div>`;
  }
}
