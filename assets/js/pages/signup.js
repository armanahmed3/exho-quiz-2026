/** Sign-up page: validate, enforce unique username/email, store account in Firebase + local, go to login. */
(function () {
  const banner = document.getElementById('formBanner');
  const btn = document.getElementById('signupBtn');
  const origBtnContent = btn ? btn.innerHTML : '<i class="fa-solid fa-user-check"></i><span>Create Account</span>';

  const form = FormKit.attach(document.getElementById('signupForm'), {
    async onValid(v) {
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i><span>Registering with Firebase...</span>';
      }
      FormKit.hide(banner);

      try {
        const error = await Auth.addUser({
          firstName: v.firstName,
          lastName: v.lastName,
          username: v.username,
          email: v.email,
          password: v.password,
        });

        if (error) {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = origBtnContent;
          }
          FormKit.banner(banner, error, 'error');
          return;
        }

        FormKit.banner(banner, 'Account registered successfully! Redirecting to login...', 'success');
        form.reset();
        setTimeout(() => { location.href = 'login.html'; }, 1200);
      } catch (err) {
        console.error('Sign up error:', err);
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = origBtnContent;
        }
        FormKit.banner(banner, 'An unexpected error occurred. Please try again.', 'error');
      }
    },
  });
})();
