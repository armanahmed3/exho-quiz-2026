/**
 * Admin panel shell: sidebar + top bar + footer around the page's own content.
 * Each admin page only provides:   <div id="page-content" data-title="..." data-subtitle="..."> ... </div>
 * and <body data-base="../../" data-admin-page="dashboard">. Add a page => add one entry to NAV below.
 */
const AdminLayout = {
  NAV: [
    { key: 'dashboard', label: 'Dashboard', icon: 'fa-gauge-high', href: 'dashboard.html' },
    { key: 'analytics', label: 'Analytics & Charts', icon: 'fa-chart-pie', href: 'analytics.html' },
    { key: 'votes', label: 'Voting Results', icon: 'fa-check-to-slot', href: 'votes.html' },
    { key: 'leaderboard', label: 'Student Leaderboard', icon: 'fa-trophy', href: 'leaderboard.html' },
    { key: 'users', label: 'Registered Users', icon: 'fa-users', href: 'users.html' },
    { key: 'settings', label: 'Data & Settings', icon: 'fa-gear', href: 'settings.html' },
  ],

  init() {
    const b = Utils.base(), current = document.body.dataset.adminPage;
    const content = document.getElementById('page-content');
    const title = content.dataset.title || 'Admin', subtitle = content.dataset.subtitle || '';

    const links = this.NAV.map((n) =>
      `<a href="${n.href}" class="side-link ${n.key === current ? 'side-link-active' : ''}" ${n.key === current ? 'aria-current="page"' : ''}><i class="fa-solid ${n.icon}"></i><span>${n.label}</span></a>`).join('');

    const shell = document.createElement('div');
    shell.className = 'min-h-screen flex flex-col';
    shell.innerHTML = `
      <aside id="adminSidebar" class="admin-sidebar fixed inset-y-0 left-0 z-50 -translate-x-full lg:translate-x-0 transition-transform duration-300 flex flex-col p-4 w-64 max-w-[85vw] shadow-2xl" aria-label="Admin navigation">
        <div class="flex items-center justify-between px-2 py-3 mb-4 border-b border-white/10">
          <a href="${b}index.html" class="flex items-center gap-3">
            <img src="${b}assets/img/logo.png" alt="" class="h-9 w-9 object-contain">
            <div><p class="font-display font-bold text-white text-sm leading-tight">Admin Panel</p><p class="text-[10px] text-blue-200">${APP.EVENT}</p></div>
          </a>
          <button type="button" id="adminSidebarClose" class="lg:hidden text-white/70 hover:text-white p-1.5 text-xl" aria-label="Close sidebar"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <nav class="space-y-1 flex-1 overflow-y-auto pr-1">${links}</nav>
        <div class="pt-4 mt-4 border-t border-white/10 space-y-1">
          <a href="${b}index.html" class="side-link"><i class="fa-solid fa-house"></i><span>View Website</span></a>
          <a href="${b}pages/quiz.html" class="side-link"><i class="fa-solid fa-circle-play"></i><span>Open Quiz Portal</span></a>
          <button type="button" id="adminLogout" class="side-link w-full text-left text-rose-300 hover:text-rose-100"><i class="fa-solid fa-right-from-bracket"></i><span>Log out</span></button>
        </div>
      </aside>
      <div id="adminOverlay" class="fixed inset-0 bg-black/50 z-40 hidden lg:hidden backdrop-blur-sm transition-opacity"></div>

      <div class="lg:ml-64 flex flex-col min-h-screen min-w-0">
        <header class="glass-nav sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
          <div class="flex items-center gap-2 sm:gap-3 min-w-0">
            <button type="button" id="adminMenuBtn" class="lg:hidden text-white text-xl sm:text-2xl p-1 rounded-lg hover:bg-white/10 shrink-0" aria-label="Open sidebar"><i class="fa-solid fa-bars"></i></button>
            <div class="min-w-0">
              <h1 class="font-display text-base sm:text-lg md:text-xl font-bold text-white truncate">${Utils.esc(title)}</h1>
              <p class="text-[10px] sm:text-[11px] text-blue-200 truncate">${Utils.esc(subtitle)}</p>
            </div>
          </div>
          <div class="ml-auto flex items-center gap-2 shrink-0">
            <button type="button" data-refresh class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/30 transition"><i class="fa-solid fa-rotate"></i> Refresh</button>
            <button type="button" data-refresh class="sm:hidden inline-flex items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/30 transition" title="Refresh" aria-label="Refresh"><i class="fa-solid fa-rotate"></i></button>
            <span class="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-sky-500/90 text-white text-[11px] sm:text-xs font-bold whitespace-nowrap"><i class="fa-solid fa-user-shield mr-1"></i>Admin</span>
          </div>
        </header>
        <main id="adminMain" class="flex-1 p-3 sm:p-5 md:p-8 w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 min-w-0"></main>
        <footer class="bg-brandBlue text-blue-200 text-[11px] sm:text-xs py-4 px-4 sm:px-6 border-t-4 border-sky-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <span>${APP.NAME} &copy; 2026 | Exhibition Admin Control Panel</span>
          <span class="flex flex-wrap justify-center gap-3 sm:gap-4"><a href="${b}index.html" class="footer-link">Home</a><a href="${b}pages/quiz.html" class="footer-link">Quiz Portal</a><a href="settings.html" class="footer-link">Settings</a></span>
        </footer>
      </div>`;

    document.body.prepend(shell);
    shell.querySelector('#adminMain').appendChild(content);

    const sidebar = shell.querySelector('#adminSidebar'), overlay = shell.querySelector('#adminOverlay');
    const toggle = (open) => {
      sidebar.classList.toggle('-translate-x-full', !open);
      overlay.classList.toggle('hidden', !open);
    };

    shell.querySelector('#adminMenuBtn').addEventListener('click', () => toggle(true));
    const closeBtn = shell.querySelector('#adminSidebarClose');
    if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
    overlay.addEventListener('click', () => toggle(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });

    // Auto-close sidebar on mobile when any link is clicked
    sidebar.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) toggle(false);
      });
    });

    shell.querySelector('#adminLogout').addEventListener('click', () => { Auth.logout(); location.href = b + 'pages/login.html'; });
  },
};
document.addEventListener('DOMContentLoaded', () => AdminLayout.init());
