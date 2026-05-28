import { downloadBlob, humanBytes, Sanitizer, toolFrame } from './_shared.js';

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Removedor de Fundo', 'Remove o fundo usando @imgly/background-removal no navegador. O primeiro uso pode baixar o modelo.', `
    <div class="drop-zone">
      <div>
        <label for="bg-file">Selecione uma imagem</label>
        <input id="bg-file" type="file" accept="image/png,image/jpeg,image/webp">
        <p class="help">Recomendado: imagens ate 8MB para melhor desempenho.</p>
      </div>
    </div>
    <div class="button-row"><button class="primary-button" id="remove-bg-btn">Remover fundo</button></div>
    <div class="image-preview" id="bg-preview"></div>
  `);
  document.getElementById('remove-bg-btn').addEventListener('click', () => remove(toast));
}

async function remove(toast) {
  const file = document.getElementById('bg-file').files[0];
  const preview = document.getElementById('bg-preview');
  try {
    await Sanitizer.validateImageMagicBytes(file);
    if (file.size > 8 * 1024 * 1024) toast?.('Imagem grande: o processamento pode demorar.', 'info');
    preview.innerHTML = `<div class="warning-banner">Carregando modelo e processando... mantenha esta aba aberta.</div>`;
    const { removeBackground } = await import('@imgly/background-removal');
    const blob = await removeBackground(file, {
      progress: () => {}
    });
    preview.innerHTML = `
      <div><h3>Original</h3><p class="muted">${humanBytes(file.size)}</p><img src="${URL.createObjectURL(file)}" alt="Original"></div>
      <div><h3>Sem fundo</h3><p class="muted">${humanBytes(blob.size)}</p><img src="${URL.createObjectURL(blob)}" alt="Imagem sem fundo"><div class="button-row"><button class="secondary-button" id="download-bg">Baixar PNG</button></div></div>
    `;
    document.getElementById('download-bg').addEventListener('click', () => downloadBlob(blob, 'sem-fundo.png'));
    toast?.('Fundo removido.', 'success');
  } catch (error) {
    preview.innerHTML = `<div class="error-banner">Nao foi possivel remover o fundo: ${error.message}</div>`;
  }
}
