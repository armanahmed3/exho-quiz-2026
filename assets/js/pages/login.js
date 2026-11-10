/** Login page: admin credentials -> admin panel, registered student -> quiz. */
(function () {
  const banner = document.getElementById('formBanner');
  const btn = document.getElementById('loginBtn');
  const origBtnContent = btn ? btn.innerHTML : '<i class="fa-solid fa-right-from-bracket"></i><span>Login Now</span>';

  const MESSAGES = {
    login_required: 'Please log in first to access the quiz portal.',
    admin_required: 'Admin access required. Please log in with the admin account.',
  };
  const msg = MESSAGES[Utils.param('msg')];
  if (msg) FormKit.banner(banner, msg, 'error');

  // Brute-force brake: 5 wrong attempts -> 30 second lock (per browser tab).
  const MAX = 5, LOCK_MS = 30000;
  const state = () => JSON.parse(sessionStorage.getItem('login_guard') || '{"n":0,"until":0}');
  const save = (s) => sessionStorage.setItem('login_guard', JSON.stringify(s));

  FormKit.attach(document.getElementById('loginForm'), {
    async onValid({ identifier, password }) {
      const guard = state();
      if (Date.now() < guard.until) {
        FormKit.banner(banner, `Too many attempts. Try again in ${Math.ceil((guard.until - Date.now()) / 1000)}s.`, 'error');
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i><span>Verifying credentials...</span>';
      }
      FormKit.hide(banner);

      try {
        const result = await Auth.login(identifier, password);
        if (!result) {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = origBtnContent;
          }
          guard.n += 1;
          if (guard.n >= MAX) { guard.n = 0; guard.until = Date.now() + LOCK_MS; }
          save(guard);
          FormKit.banner(banner, guard.until > Date.now() ? 'Too many failed attempts. Please wait 30 seconds.' : 'Incorrect username or password!', 'error');
          return;
        }

        save({ n: 0, until: 0 });
        FormKit.banner(banner, 'Login successful! Redirecting...', 'success');
        setTimeout(() => {
          location.href = result.role === 'admin' ? 'admin/dashboard.html' : Utils.safeNext(Utils.param('next'), 'quiz.html');
        }, 500);
      } catch (err) {
        console.error('Login error:', err);
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = origBtnContent;
        }
        FormKit.banner(banner, 'Could not log in. Check your internet connection and try again.', 'error');
      }
    },
  });
})();
