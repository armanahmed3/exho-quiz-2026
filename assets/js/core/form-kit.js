/**
 * Tiny form helper: inline error messages, live validation, show/hide password.
 *
 *   <form data-form novalidate>
 *     <input name="email" data-rule="email" ...>
 *   </form>
 *
 *   const form = FormKit.attach(formEl, { onValid: (values) => {...} });
 *
 * data-rule names map to functions on Validators. `confirm` receives all values.
 */
const FormKit = {
  attach(form, { onValid, extraCheck } = {}) {
    const fields = [...form.querySelectorAll('[data-rule]')];
    const values = () => Object.fromEntries(fields.map((f) => [f.name, f.type === 'password' ? f.value : f.value.trim()]));

    const showError = (field, msg) => {
      let el = form.querySelector(`[data-error-for="${field.name}"]`);
      if (!el) {
        el = document.createElement('p');
        el.dataset.errorFor = field.name;
        el.setAttribute('role', 'alert');
        el.className = 'field-error';
        (field.closest('[data-field]') || field.parentElement).appendChild(el);
      }
      el.textContent = msg;
      el.classList.toggle('hidden', !msg);
      field.classList.toggle('input-invalid', !!msg);
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };

    const check = (field) => {
      const msg = Validators[field.dataset.rule](field.type === 'password' ? field.value : field.value.trim(), values());
      showError(field, msg);
      return !msg;
    };

    fields.forEach((f) => {
      f.addEventListener('blur', () => { if (f.value) check(f); });
      f.addEventListener('input', () => { if (f.classList.contains('input-invalid')) check(f); });
    });

    // password visibility toggles: <button type="button" data-toggle-password="fieldName">
    form.querySelectorAll('[data-toggle-password]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = form.querySelector(`[name="${btn.dataset.togglePassword}"]`);
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.innerHTML = `<i class="fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = fields.map(check); // run all so every error shows
      if (results.includes(false)) { fields[results.indexOf(false)].focus(); return; }
      if (extraCheck && extraCheck(values()) === false) return;
      onValid(values());
    });

    return { values, showError, fields, reset() { form.reset(); fields.forEach((f) => showError(f, '')); } };
  },

  banner(el, message, type = 'error') { // type: error | success
    if (!el) return;
    el.className = `banner banner-${type}`;
    el.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check'} mr-1"></i><span></span>`;
    el.lastChild.textContent = message;
  },
  hide(el) { if (el) el.className = 'hidden'; },
};
