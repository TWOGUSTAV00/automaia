export const CSP = {
  publicPolicy: [
    "default-src 'self'",
    "script-src 'self' https://cdn.tailwindcss.com https://pagead2.googlesyndication.com https://www.googletagmanager.com 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://is.gd https://pagead2.googlesyndication.com",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'"
  ].join('; '),

  explain() {
    return 'CSP configurada nos headers Cloudflare e meta tag do admin.';
  }
};
