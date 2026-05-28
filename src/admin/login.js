import { AdminAuth } from '../security/auth.js';

export function renderAdminLogin(container) {
  container.innerHTML = `
    <div class="admin-login-wrapper">
      <section class="admin-login-card glass-card" aria-label="Login administrativo">
        <a class="brand" href="./#/">
          <span class="brand-mark">AI</span>
          <span class="brand-name">Automaia Admin</span>
        </a>
        <div style="margin-top:22px">
          <h1 class="panel-title">Area restrita</h1>
          <p class="muted">Sessao local de 30 minutos, bloqueio apos 5 tentativas e backup criptografado por Web Crypto.</p>
        </div>
        <form id="login-form" class="form-grid" style="margin-top:18px">
          <div class="field full">
            <label for="admin-password">Senha de administrador</label>
            <input id="admin-password" type="password" autocomplete="current-password" required autofocus>
          </div>
          <div class="button-row">
            <button class="primary-button" id="login-btn" type="submit">Entrar</button>
            <button class="secondary-button" id="toggle-password" type="button">Mostrar</button>
          </div>
          <div id="login-error" class="error-banner full" hidden></div>
        </form>
      </section>
    </div>
  `;

  const input = document.getElementById('admin-password');
  const error = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');

  document.getElementById('toggle-password').addEventListener('click', (event) => {
    input.type = input.type === 'password' ? 'text' : 'password';
    event.currentTarget.textContent = input.type === 'password' ? 'Mostrar' : 'Ocultar';
  });

  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    error.hidden = true;
    btn.disabled = true;
    btn.textContent = 'Verificando...';
    try {
      await AdminAuth.login(input.value);
      window.location.reload();
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      input.value = '';
      input.focus();
    } finally {
      btn.disabled = false;
      btn.textContent = 'Entrar';
    }
  });
}

export function renderFirstSetup(container) {
  container.innerHTML = `
    <div class="admin-login-wrapper">
      <section class="admin-login-card glass-card" aria-label="Configuracao inicial">
        <a class="brand" href="./#/">
          <span class="brand-mark">AI</span>
          <span class="brand-name">Automaia Admin</span>
        </a>
        <div style="margin-top:22px">
          <h1 class="panel-title">Configuracao inicial</h1>
          <p class="muted">Crie uma senha forte. Ela nao pode ser recuperada depois.</p>
        </div>
        <form id="setup-form" class="form-grid" style="margin-top:18px">
          <div class="field full">
            <label for="setup-pwd">Nova senha</label>
            <input id="setup-pwd" type="password" autocomplete="new-password" required>
            <div class="strength-meter" aria-hidden="true"><div class="strength-bar" id="strength-bar"></div></div>
            <span class="help" id="strength-label">Minimo 12 caracteres com letras, numero e simbolo.</span>
          </div>
          <div class="field full">
            <label for="setup-confirm">Confirmar senha</label>
            <input id="setup-confirm" type="password" autocomplete="new-password" required>
          </div>
          <div class="button-row">
            <button class="primary-button" id="setup-btn" type="submit" disabled>Criar admin</button>
          </div>
          <div class="warning-banner full">Guarde a senha em um gerenciador. Este projeto nao possui backend para recuperacao.</div>
          <div id="setup-error" class="error-banner full" hidden></div>
        </form>
      </section>
    </div>
  `;

  const pwd = document.getElementById('setup-pwd');
  const confirm = document.getElementById('setup-confirm');
  const btn = document.getElementById('setup-btn');
  const bar = document.getElementById('strength-bar');
  const label = document.getElementById('strength-label');
  const error = document.getElementById('setup-error');

  function updateStrength() {
    const result = AdminAuth.checkPasswordStrength(pwd.value);
    const pct = Math.min(100, Math.round((result.score / 6) * 100));
    bar.style.width = `${pct}%`;
    bar.style.background = result.score >= 5 ? 'var(--success)' : result.score >= 4 ? 'var(--warning)' : 'var(--danger)';
    label.textContent = `Forca: ${result.label}`;
    btn.disabled = result.score < 4 || pwd.value !== confirm.value;
  }

  pwd.addEventListener('input', updateStrength);
  confirm.addEventListener('input', updateStrength);

  document.getElementById('setup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    error.hidden = true;
    if (pwd.value !== confirm.value) {
      error.textContent = 'As senhas nao conferem.';
      error.hidden = false;
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Criando...';
    try {
      await AdminAuth.createAdminAccount(pwd.value);
      await AdminAuth.login(pwd.value);
      window.location.reload();
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Criar admin';
    }
  });
}
