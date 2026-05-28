export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="footer-wrap">
        <p>Automaia ${year}. Ferramentas locais, gratis e sem upload obrigatorio.</p>
        <div class="footer-links">
          <a href="./#/privacy">Privacidade</a>
          <a href="./admin.html" rel="nofollow">Admin</a>
        </div>
      </div>
    </footer>
  `;
}
