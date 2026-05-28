const SESSION_KEY = 'tk_session';
const TOKEN_KEY = 'tk_session_key';

export const SessionManager = {
  get() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    } catch {
      return null;
    }
  },
  set(data) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    sessionStorage.setItem(TOKEN_KEY, data.token);
  },
  update(data) {
    this.set(data);
  },
  destroy() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }
};
