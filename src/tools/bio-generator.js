import { copyText, Sanitizer, toolFrame } from './_shared.js';

const TEMPLATES = {
  professional: ({ name, role, audience, tone }) => `${name} | ${role}\nAjudo ${audience} com solucoes ${tone}, praticas e bem executadas.\nProjetos, ideias e contato por aqui.`,
  creator: ({ name, role, audience, tone }) => `${name} cria ${role.toLowerCase()} para ${audience}.\nConteudo ${tone}, direto ao ponto e feito para sair do rascunho.\nNovidades toda semana.`,
  brand: ({ name, role, audience, tone }) => `${name}: ${role} para ${audience}.\nFerramentas, processos e experiencias ${tone} para quem quer fazer melhor com menos atrito.`
};

export function render(container, { toast } = {}) {
  container.innerHTML = toolFrame('Gerador de Bio', 'Bios curtas para redes sociais, marcas e portfolios.', `
    <div class="form-grid">
      <div class="field"><label for="bio-name">Nome ou marca</label><input id="bio-name" placeholder="Automaia"></div>
      <div class="field"><label for="bio-role">O que voce faz</label><input id="bio-role" placeholder="ferramentas online"></div>
      <div class="field"><label for="bio-audience">Publico</label><input id="bio-audience" placeholder="criadores e pequenos negocios"></div>
      <div class="field"><label for="bio-tone">Tom</label><select id="bio-tone"><option>claras</option><option>premium</option><option>rapidas</option><option>minimalistas</option></select></div>
      <div class="field"><label for="bio-template">Modelo</label><select id="bio-template"><option value="professional">Profissional</option><option value="creator">Criador</option><option value="brand">Marca</option></select></div>
    </div>
    <div class="button-row">
      <button class="primary-button" id="make-bio">Gerar bio</button>
      <button class="secondary-button" id="copy-bio">Copiar</button>
    </div>
    <pre class="code-output" id="bio-output" style="margin-top:16px"></pre>
  `);
  const output = document.getElementById('bio-output');
  document.getElementById('make-bio').addEventListener('click', () => make(output));
  document.getElementById('copy-bio').addEventListener('click', () => copyText(output.textContent, toast));
  make(output);
}

function make(output) {
  const data = {
    name: Sanitizer.text(document.getElementById('bio-name').value || 'Automaia', 80),
    role: Sanitizer.text(document.getElementById('bio-role').value || 'ferramentas online', 100),
    audience: Sanitizer.text(document.getElementById('bio-audience').value || 'criadores e equipes', 100),
    tone: Sanitizer.text(document.getElementById('bio-tone').value, 40)
  };
  output.textContent = TEMPLATES[document.getElementById('bio-template').value](data);
}
