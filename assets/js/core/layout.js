/**
 * Shared site navbar + footer for every public page (landing, login, signup, quiz).
 * Pages just add:   <div id="site-navbar"></div> ... <div id="site-footer"></div>
 * and <body data-base="../" data-page="quiz">  (data-base = path back to the project root)
 * To change a link, change it HERE once.
 */
const Layout = {
  links() {
    const b = Utils.base();
    return {
      home: b + 'index.html', quiz: b + 'pages/quiz.html', login: b + 'pages/login.html',
      signup: b + 'pages/signup.html', admin: b + 'pages/admin/dashboard.html',
    };
  },

  navbar() {
    const b = Utils.base(), L = this.links(), page = document.body.dataset.page || '';
    const student = Auth.currentStudent(), admin = Auth.isAdmin();
    const item = (href, label, key, extra = '') =>
      `<a href="${href}" class="nav-link ${page === key ? 'nav-link-active' : ''} ${extra}">${label}</a>`;

    const authArea = admin
      ? `<a href="${L.admin}" class="btn-sky"><i class="fa-solid fa-gauge-high"></i><span>Admin Panel</span></a>
         <button type="button" data-logout class="btn-danger-sm shrink-0" title="Log out" aria-label="Log out"><i class="fa-solid fa-right-from-bracket"></i></button>`
      : student
        ? `<a href="${L.quiz}" class="btn-sky max-w-[200px] sm:max-w-none"><i class="fa-solid fa-house-laptop shrink-0"></i><span class="truncate">Portal (${Utils.esc(student.firstName || 'User')})</span></a>
           <button type="button" data-logout class="btn-danger-sm shrink-0" title="Log out" aria-label="Log out"><i class="fa-solid fa-right-from-bracket"></i></button>`
        : `<a href="${L.login}" class="nav-link ${page === 'login' ? 'nav-link-active' : ''}">Login</a>
           <a href="${L.signup}" class="btn-sky"><i class="fa-solid fa-user-plus"></i><span>Sign Up</span></a>`;

    return `
    <header class="glass-nav fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-2 sm:py-2.5">
      <div class="flex items-center justify-between gap-2 sm:gap-3 max-w-7xl mx-auto">
        <a href="${L.home}" class="flex items-center gap-2 sm:gap-3 shrink-0 group" aria-label="The Times School Network - EXHO QUIZ 2026">
          <img src="${b}assets/img/logo.png" alt="The Times School Logo" class="h-9 sm:h-11 md:h-12 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200">
          <div class="flex flex-col justify-center leading-none">
            <div class="flex items-center gap-1.5">
              <span class="font-display font-black text-sm sm:text-base md:text-lg lg:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-100 to-white drop-shadow whitespace-nowrap">EXHO QUIZ</span>
              <span class="px-1.5 py-0.5 rounded bg-amber-400 text-brandBlue font-display font-black text-[9px] sm:text-[10px] md:text-xs tracking-wider shadow-sm uppercase">2026</span>
            </div>
            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-sky-200/90 tracking-widest uppercase mt-0.5 whitespace-nowrap truncate max-w-[140px] sm:max-w-none">The Times School</span>
          </div>
        </a>
        <nav class="hidden xl:flex items-center gap-1.5 2xl:gap-2" aria-label="Main">
          ${item(L.home, 'Home', 'home')}
          ${item(L.home + '#features', 'Features', 'f')}
          ${item(L.home + '#how-it-works', 'How It Works', 'h')}
          ${item(L.home + '#team', 'Developers', 't')}
          ${item(L.home + '#about', 'Architecture', 'a')}
          ${item(L.home + '#faq', 'FAQ', 'q')}
          ${item(L.quiz, 'Quiz Portal', 'quiz')}
        </nav>
        <div class="hidden xl:flex items-center gap-2" id="navAuthArea">${authArea}</div>
        <button type="button" id="navToggle" class="xl:hidden text-white text-2xl p-1.5 rounded-lg hover:bg-white/10 transition" aria-label="Open menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
      </div>
      <div id="navMobile" class="hidden xl:hidden pt-3 mt-3 border-t border-white/20 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto pr-1">
        ${item(L.home, 'Home', 'home', 'block text-center sm:text-left')}
        ${item(L.home + '#features', 'Features', 'f', 'block text-center sm:text-left')}
        ${item(L.home + '#how-it-works', 'How It Works', 'h', 'block text-center sm:text-left')}
        ${item(L.home + '#team', 'Developers', 't', 'block text-center sm:text-left')}
        ${item(L.home + '#about', 'Architecture', 'a', 'block text-center sm:text-left')}
        ${item(L.home + '#faq', 'FAQ', 'q', 'block text-center sm:text-left')}
        ${item(L.quiz, 'Quiz Portal', 'quiz', 'block text-center sm:text-left font-bold bg-sky-500/20')}
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-3 border-t border-white/10">${authArea}</div>
      </div>
    </header>`;
  },

  footer() {
    const b = Utils.base(), L = this.links();
    return `
    <footer class="bg-brandBlue text-white pt-10 pb-6 border-t-4 border-sky-400 relative z-10">
      <div class="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-left">
        
        <!-- Updated Footer Column with Image Logo -->
        <div class="space-y-3 sm:col-span-2 md:col-span-1">
          <div class="flex items-center gap-3">
            <img src="${b}assets/img/logo.png" alt="The Times School Logo" class="h-10 w-auto object-contain">
            <h3 class="font-display font-bold text-lg">${APP.NAME}</h3>
          </div>
          <p class="text-xs text-blue-200 leading-relaxed">Empowering students with knowledge, technology, and excellence. Shaping the future leaders of tomorrow through innovation and interactive learning.</p>
        </div>

        <div class="space-y-3">
          <h4 class="font-display font-bold text-sm text-sky-300 uppercase tracking-wider">Quick Links</h4>
          <ul class="space-y-2 text-xs text-blue-200">
            <li><a href="${L.home}" class="footer-link"><i class="fa-solid fa-chevron-right mr-1 text-[10px]"></i> Home</a></li>
            <li><a href="${L.quiz}" class="footer-link"><i class="fa-solid fa-chevron-right mr-1 text-[10px]"></i> Quiz Portal</a></li>
            <li><a href="${L.login}" class="footer-link"><i class="fa-solid fa-chevron-right mr-1 text-[10px]"></i> Login</a></li>
            <li><a href="${L.signup}" class="footer-link"><i class="fa-solid fa-chevron-right mr-1 text-[10px]"></i> Create Account</a></li>
          </ul>
        </div>

        <div class="space-y-3">
          <h4 class="font-display font-bold text-sm text-sky-300 uppercase tracking-wider">Project Credits</h4>
          <p class="text-xs text-blue-200 leading-relaxed">
            <strong class="text-white">Developed By:</strong> Hasnain, Arham, Naqi, &amp; Muqbil<br>
            <strong class="text-white">Supervised By:</strong> Sir Moiz<br>
            <span class="block mt-1 text-sky-200 text-[11px]">Computer Science Exhibition Project 2026</span>
          </p>
        </div>
      </div>
      <div class="text-center text-xs text-blue-300 border-t border-blue-800/80 pt-4 px-4">${APP.NAME} &copy; 2026 | All Rights Reserved. Designed for Annual Computer Exhibition.</div>
    </footer>`;
  },
  
  init() {
    const nav = document.getElementById('site-navbar'), foot = document.getElementById('site-footer');
    if (nav) nav.innerHTML = this.navbar();
    if (foot) foot.innerHTML = this.footer();

    const toggle = document.getElementById('navToggle'), menu = document.getElementById('navMobile');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
      });

      // Auto-close menu when clicking any link inside mobile navigation
      menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          menu.classList.add('hidden');
          toggle.setAttribute('aria-expanded', 'false');
          const icon = toggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        });
      });
    }

    document.querySelectorAll('[data-logout]').forEach((b) => b.addEventListener('click', () => {
      Auth.logout();
      location.href = this.links().home;
    }));
  },
};
document.addEventListener('DOMContentLoaded', () => Layout.init());
