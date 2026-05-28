export function renderCookieConsent() {
  if (localStorage.getItem('tk_cookie_ok') === '1') return '';
  return `
    <aside class="cookie-consent" role="dialog" aria-live="polite" aria-label="Aviso de privacidade">
      <p>Usamos armazenamento local para preferencias, analytics privados e configuracoes do painel. Sem rastreamento externo por padrao.</p>
      <button class="primary-button" id="cookie-accept">Entendi</button>
    </aside>
  `;
}

export function bindCookieConsent() {
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('tk_cookie_ok', '1');
    document.querySelector('.cookie-consent')?.remove();
  });
}
