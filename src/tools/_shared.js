import { Sanitizer } from '../security/sanitizer.js';

export { Sanitizer };

export function toolFrame(title, description, body) {
  return `
    <div>
      <h2 class="panel-title">${title}</h2>
      <p class="muted">${description}</p>
      <div style="margin-top:16px">${body}</div>
    </div>
  `;
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = Sanitizer.sanitizeFilename(filename);
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(text, filename, type = 'text/plain') {
  downloadBlob(new Blob([text], { type }), filename);
}

export async function copyText(text, toast) {
  await navigator.clipboard.writeText(text);
  toast?.('Copiado para a area de transferencia.', 'success');
}

export function setOutput(el, text) {
  el.textContent = text;
}

export function humanBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
}

export function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Nao foi possivel gerar o arquivo.'))), type, quality);
  });
}
