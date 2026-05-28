import { CryptoEngine } from './crypto.js';
import { SessionManager } from './session.js';
import { AuditLog } from '../admin/audit-log.js';

const ADMIN_HASH_KEY = 'tk_admin_credential';
const SESSION_DURATION = 30 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

export const AdminAuth = {
  hasAccount() {
    return Boolean(localStorage.getItem(ADMIN_HASH_KEY));
  },

  async createAdminAccount(password) {
    if (password.length < 12) throw new Error('A senha precisa ter no minimo 12 caracteres.');
    const strength = this.checkPasswordStrength(password);
    if (strength.score < 4) throw new Error(`Senha fraca: ${strength.label}.`);
    const hash = await CryptoEngine.hashPassword(password);
    localStorage.setItem(ADMIN_HASH_KEY, hash);
    await AuditLog.write('SETUP', 'Conta admin criada');
    return true;
  },

  async login(password) {
    const lockout = this.checkLockout();
    if (lockout.locked) throw new Error(`Conta bloqueada. Tente novamente em ${lockout.remaining} min.`);

    const storedHash = localStorage.getItem(ADMIN_HASH_KEY);
    if (!storedHash) throw new Error('Conta admin nao configurada.');

    const valid = await CryptoEngine.verifyPassword(password, storedHash);
    if (!valid) {
      this.recordFailedAttempt();
      const attempts = this.getFailedAttempts();
      const remaining = MAX_LOGIN_ATTEMPTS - attempts;
      await AuditLog.write('LOGIN_FAIL', `Tentativa ${attempts}/${MAX_LOGIN_ATTEMPTS}`);
      if (remaining <= 0) {
        this.lockAccount();
        throw new Error('Conta bloqueada por 15 minutos.');
      }
      throw new Error(`Senha incorreta. ${remaining} tentativas restantes.`);
    }

    this.clearFailedAttempts();
    const sessionData = {
      token: CryptoEngine.randomHex(32),
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION,
      uaHash: await CryptoEngine.digest(navigator.userAgent)
    };
    SessionManager.set(sessionData);
    sessionStorage.setItem('tk_session_seal', await CryptoEngine.encrypt(JSON.stringify(sessionData), password));
    await AuditLog.write('LOGIN_OK', 'Login admin concluido');
    return sessionData.token;
  },

  async isAuthenticated() {
    const session = SessionManager.get();
    if (!session || !session.token || session.token !== SessionManager.getToken()) return false;
    if (Date.now() > session.expiresAt) {
      await this.logout(false);
      return false;
    }
    session.expiresAt = Date.now() + SESSION_DURATION;
    SessionManager.update(session);
    return true;
  },

  async logout(redirect = true) {
    await AuditLog.write('LOGOUT', 'Sessao finalizada');
    SessionManager.destroy();
    sessionStorage.removeItem('tk_session_seal');
    if (redirect) window.location.href = './admin.html';
  },

  checkPasswordStrength(pwd) {
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      symbols: /[^A-Za-z0-9]/.test(pwd),
      noCommon: !['123456', 'password', 'admin', 'toolkit', 'automaia'].some((c) => pwd.toLowerCase().includes(c))
    };
    const score = Object.values(checks).filter(Boolean).length;
    const labels = ['Muito fraca', 'Muito fraca', 'Fraca', 'Razoavel', 'Boa', 'Forte', 'Excelente'];
    return { score, label: labels[score] || labels.at(-1), checks };
  },

  checkLockout() {
    const lockUntil = Number(localStorage.getItem('tk_lock_until') || '0');
    if (Date.now() < lockUntil) return { locked: true, remaining: Math.ceil((lockUntil - Date.now()) / 60000) };
    return { locked: false };
  },
  lockAccount() {
    localStorage.setItem('tk_lock_until', String(Date.now() + LOCKOUT_DURATION));
  },
  recordFailedAttempt() {
    localStorage.setItem('tk_failed_attempts', String(this.getFailedAttempts() + 1));
    localStorage.setItem('tk_last_attempt', String(Date.now()));
  },
  getFailedAttempts() {
    return Number(localStorage.getItem('tk_failed_attempts') || '0');
  },
  clearFailedAttempts() {
    localStorage.removeItem('tk_failed_attempts');
    localStorage.removeItem('tk_last_attempt');
    localStorage.removeItem('tk_lock_until');
  }
};
