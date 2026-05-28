import QRCode from 'qrcode';
import { copyText, downloadBlob, Sanitizer, toolFrame } from './_shared.js';

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Gerador de QR Code', 'Gere QR Codes para links, textos e codigos copia e cola.', `
    <div class="form-grid">
      <div class="field full"><label for="qr-input">Conteudo</label><textarea id="qr-input" placeholder="https://example.com"></textarea></div>
      <div class="field"><label for="qr-size">Tamanho</label><input id="qr-size" type="number" min="160" max="1024" value="320"></div>
      <div class="field"><label for="qr-margin">Margem</label><input id="qr-margin" type="number" min="0" max="8" value="2"></div>
    </div>
    <div class="button-row">
      <button class="primary-button" id="make-qr">Gerar QR</button>
      <button class="secondary-button" id="copy-qr-text">Copiar texto</button>
      <button class="secondary-button" id="download-qr">Baixar PNG</button>
    </div>
    <div class="preview-box qr-preview" id="qr-preview" style="margin-top:16px"></div>
  `);
  const preview = document.getElementById('qr-preview');
  document.getElementById('make-qr').addEventListener('click', () => make(preview, toast));
  document.getElementById('copy-qr-text').addEventListener('click', () => copyText(document.getElementById('qr-input').value, toast));
  document.getElementById('download-qr').addEventListener('click', async () => {
    const img = preview.querySelector('img');
    if (!img) return toast?.('Gere um QR Code primeiro.', 'error');
    const blob = await (await fetch(img.src)).blob();
    downloadBlob(blob, 'qrcode.png');
  });
}

async function make(preview, toast) {
  try {
    const text = Sanitizer.text(document.getElementById('qr-input').value, 3000);
    if (!text) throw new Error('Digite o conteudo do QR Code.');
    const width = Number(document.getElementById('qr-size').value || 320);
    const margin = Number(document.getElementById('qr-margin').value || 2);
    const url = await QRCode.toDataURL(text, { width, margin, errorCorrectionLevel: 'M', color: { dark: '#10151a', light: '#ffffff' } });
    preview.innerHTML = `<img src="${url}" alt="QR Code gerado">`;
    toast?.('QR Code gerado.', 'success');
  } catch (error) {
    preview.innerHTML = `<div class="error-banner">${error.message}</div>`;
  }
}
