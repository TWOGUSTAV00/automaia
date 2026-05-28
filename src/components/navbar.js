export function renderNavbar() {
  return `
    <header class="site-header">
      <div class="nav-wrap">
        <a class="brand" href="./#/" aria-label="Automaia inicio">
          <span class="brand-mark">AI</span>
          <span class="brand-name">Automaia</span>
        </a>
        <nav class="nav-actions" aria-label="Navegacao principal">
          <a class="nav-link" href="./#tools">Ferramentas</a>
          <a class="nav-link" href="./#privacy">Privacidade</a>
          <a class="secondary-button" href="./admin.html" rel="nofollow">Admin</a>
        </nav>
      </div>
    </header>
  `;
}
