/* =============================================
   GymForge - Sidebar Renderer (sidebar.js)
   ============================================= */

function GF_renderSidebar(activePage) {
  const user = GF.getUser();
  if (!user) return;

  const initials = user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const links = [
    { id: 'dashboard', href: 'dashboard.html', icon: '📊', label: 'Dashboard' },
    { id: 'machines',  href: 'machines.html',  icon: '🏋️', label: 'Browse Machines' },
    { id: 'search',    href: 'search.html',    icon: '🔍', label: 'Search Machines' },
    { id: 'services',  href: 'services.html',  icon: '📅', label: 'Book Service' },
    { id: 'repair',    href: 'repair.html',    icon: '🔧', label: 'Repair Request' },
    { id: 'profile',   href: 'profile.html',   icon: '👤', label: 'My Profile' },
  ];

  let navHtml = '';
  links.forEach(l => {
    navHtml += `<li><a href="${l.href}" class="${activePage === l.id ? 'active' : ''}">
      <span class="nav-icon">${l.icon}</span>${l.label}
    </a></li>`;
  });

  const html = `
    <div class="sidebar-user">
      <div class="sidebar-avatar">${initials}</div>
      <div>
        <div class="sidebar-user-name">${user.fullName}</div>
        <div class="sidebar-user-role">${user.gymName || 'GymForge Member'}</div>
      </div>
    </div>
    <div class="sidebar-section-label">Main Menu</div>
    <ul class="sidebar-nav">${navHtml}</ul>
    <div class="sidebar-section-label mt-3">Account</div>
    <ul class="sidebar-nav">
      <li><a href="#" id="sidebar-logout"><span class="nav-icon">🚪</span>Logout</a></li>
    </ul>`;

  document.getElementById('gf-sidebar').innerHTML = html;

  document.getElementById('sidebar-logout')?.addEventListener('click', e => {
    e.preventDefault();
    GF.logout();
  });
}
