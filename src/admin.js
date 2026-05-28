import './style.css';
import { AdminAuth } from './security/auth.js';
import { renderAdminDashboard } from './admin/dashboard.js';
import { renderAdminLogin, renderFirstSetup } from './admin/login.js';

async function initAdmin() {
  const app = document.getElementById('admin-app');
  if (!AdminAuth.hasAccount()) {
    renderFirstSetup(app);
    return;
  }

  if (!(await AdminAuth.isAuthenticated())) {
    renderAdminLogin(app);
    return;
  }

  renderAdminDashboard(app);
}

initAdmin();
