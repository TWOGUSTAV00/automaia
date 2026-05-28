export const Sanitizer = {
  stripHTML(input = '') {
    const div = document.createElement('div');
    div.textContent = String(input);
    return div.innerHTML;
  },

  text(input = '', max = 50000) {
    const clean = String(input).replace(/\u0000/g, '').trim();
    if (clean.length > max) throw new Error(`Texto muito grande. Limite: ${max} caracteres.`);
    return clean;
  },

  validateURL(url) {
    try {
      const parsed = new URL(String(url).trim());
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Protocolo bloqueado.');
      return parsed.href;
    } catch {
      throw new Error('URL invalida. Use um link com http ou https.');
    }
  },

  sanitizeJSON(input) {
    const clean = String(input).trim().replace(/^\uFEFF/, '');
    if (clean.length > 500000) throw new Error('JSON muito grande. Limite: 500KB.');
    return clean;
  },

  sanitizeFilename(name = 'download') {
    return String(name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 128) || 'download';
  },

  async validateImageMagicBytes(file) {
    if (!file || !file.size) throw new Error('Selecione uma imagem valida.');
    if (file.size > 25 * 1024 * 1024) throw new Error('Imagem muito grande. Limite: 25MB.');
    const arr = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const header = Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
    const ascii = String.fromCharCode(...arr);

    if (header.startsWith('ffd8ff')) return 'image/jpeg';
    if (header.startsWith('89504e47')) return 'image/png';
    if (header.startsWith('47494638')) return 'image/gif';
    if (header.startsWith('52494646') && ascii.includes('WEBP')) return 'image/webp';
    throw new Error('Arquivo nao reconhecido como imagem PNG, JPG, GIF ou WebP.');
  },

  createRateLimiter(maxCalls, windowMs) {
    const calls = [];
    return () => {
      const now = Date.now();
      while (calls.length && now - calls[0] > windowMs) calls.shift();
      if (calls.length >= maxCalls) throw new Error(`Muitas chamadas. Aguarde ${Math.ceil(windowMs / 1000)}s.`);
      calls.push(now);
    };
  }
};
