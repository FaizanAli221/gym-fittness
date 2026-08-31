/* =============================================
   GymForge - Main JavaScript (main.js)
   Session management now uses Express sessions
   (cookies) instead of localStorage/sessionStorage
   ============================================= */

const GF = {

  toast(msg, type = 'success', duration = 3000) {
    const el = document.getElementById('gf-toast');
    if (!el) return;
    el.textContent = msg;
    el.className = type;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, duration);
  },

  getUser()        { return window._gfUser || null; },
  setUser(user)    { window._gfUser = user; },
  clearUser()      { window._gfUser = null; },

  async loadUser() {
    try {
      const res = await API.me();
      if (res.success) { GF.setUser(res.user); return res.user; }
    } catch (e) {}
    GF.clearUser();
    return null;
  },

  async logout() {
    await API.logout();
    GF.clearUser();
    window.location.href = '/';
  },

  requireLogin() {
    if (!GF.getUser()) { window.location.href = '/pages/login.html'; return false; }
    return true;
  },

  redirectIfLoggedIn() {
    if (GF.getUser()) window.location.href = '/pages/dashboard.html';
  },

  validate: {
    required(val) { return val.trim().length > 0; },
    email(val)    { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()); },
    phone(val)    { return /^\+?[\d\s\-()]{7,15}$/.test(val.trim()); },
    minLen(val,n) { return val.trim().length >= n; },
    match(a,b)    { return a === b; },
  },

  showError(inputEl, msg) {
    if (!inputEl) return;
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');
    const e = inputEl.parentElement.querySelector('.gf-error');
    if (e) { e.textContent = msg; e.classList.add('show'); }
  },
  clearError(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    const e = inputEl.parentElement.querySelector('.gf-error');
    if (e) e.classList.remove('show');
  },
  clearAll(form) {
    form.querySelectorAll('.gf-input').forEach(el => el.classList.remove('is-invalid','is-valid'));
    form.querySelectorAll('.gf-error').forEach(el => el.classList.remove('show'));
  },

  renderNavbar(activePage = '') {
    const user = GF.getUser();
    const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const base   = isHome ? 'pages/' : '';

    const pub = `
      <li class="nav-item"><a class="nav-link ${activePage==='home'?'active':''}" href="/"><i class="fa-solid fa-home"></i> <span>Home</span></a></li>
      <li class="nav-item"><a class="nav-link ${activePage==='machines'?'active':''}" href="${base}machines.html"><i class="fa-solid fa-dumbbell"></i> <span>Machines</span></a></li>
      <li class="nav-item"><a class="nav-link ${activePage==='services'?'active':''}" href="${base}services.html"><i class="fa-solid fa-wrench"></i> <span>Services</span></a></li>`;

    const auth = user
      ? `<li class="nav-item"><a class="nav-link ${activePage==='dashboard'?'active':''}" href="${base}dashboard.html"><i class="fa-solid fa-chart-line"></i> <span>Dashboard</span></a></li>
         <li class="nav-item"><a class="nav-link" href="#" id="nav-logout"><i class="fa-solid fa-sign-out-alt"></i> <span>Logout</span></a></li>`
      : `<li class="nav-item"><a class="nav-link ${activePage==='login'?'active':''}" href="${base}login.html"><i class="fa-solid fa-sign-in-alt"></i> <span>Login</span></a></li>
         <li class="nav-item"><a class="btn-primary-gf ms-2" href="${base}register.html"><i class="fa-solid fa-user-plus"></i> <span>Register</span></a></li>`;

    document.getElementById('gf-navbar').innerHTML = `
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" href="/"><i class="fa-solid fa-dumbbell"></i> GYM<span>FORGE</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto align-items-center gap-2">${pub}${auth}</ul>
        </div>
      </div>
    </nav>`;

    document.getElementById('nav-logout')?.addEventListener('click', e => { e.preventDefault(); GF.logout(); });
  },

  renderFooter() {
    const el = document.getElementById('gf-footer');
    if (!el) return;
    el.innerHTML = `
    <footer class="gf-footer">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-4 mb-2 mb-md-0">
            <div class="footer-brand">GYMFORGE</div>
            <div class="mt-1 text-muted-gf" style="font-size:0.78rem;letter-spacing:1px;">EQUIPMENT &amp; SERVICES</div>
          </div>
          <div class="col-md-4 text-center mb-2 mb-md-0">
            <small style="color:#555;">© 2025 GymForge. All rights reserved.</small>
          </div>
          <div class="col-md-4 text-md-end">
            <a href="/pages/machines.html" class="me-3" style="color:#555;font-size:0.85rem;">Machines</a>
            <a href="/pages/services.html" class="me-3" style="color:#555;font-size:0.85rem;">Services</a>
            <a href="/pages/login.html" style="color:#555;font-size:0.85rem;">Login</a>
          </div>
        </div>
      </div>
    </footer>`;
  },

  injectToast() {
    if (!document.getElementById('gf-toast')) {
      const el = document.createElement('div'); el.id = 'gf-toast'; document.body.appendChild(el);
    }
  },

  formatCurrency(n) { return 'OMR ' + Number(n).toFixed(2); },
  formatDate(d)     { if (!d) return '—'; return new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); },
};

document.addEventListener('DOMContentLoaded', () => { GF.injectToast(); });
