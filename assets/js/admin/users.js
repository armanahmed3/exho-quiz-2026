/** Admin > Registered Users: list, delete, and add accounts in Firebase Firestore. */
document.addEventListener('DOMContentLoaded', async () => {
  const $ = (id) => document.getElementById(id);
  const banner = $('formBanner');

  const render = () => {
    const users = Auth.getUsers();
    $('userCountBadge').innerText = `${users.length} User${users.length === 1 ? '' : 's'}`;
    $('registeredUsersTableBody').innerHTML = users.length
      ? users.slice().reverse().map((u, i) => `<tr>
          <td class="font-mono text-xs text-slate-500 whitespace-nowrap">${users.length - i}</td>
          <td class="font-bold text-slate-800 whitespace-nowrap">${Utils.esc(u.firstName)} ${Utils.esc(u.lastName)}</td>
          <td class="text-brandBlue font-medium whitespace-nowrap">@${Utils.esc(u.username)}</td>
          <td class="font-mono text-xs whitespace-nowrap">${Utils.esc(u.email)}</td>
          <td class="text-xs text-slate-500 whitespace-nowrap">${Utils.esc(u.registeredAt || 'N/A')}</td>
          <td class="whitespace-nowrap"><button type="button" data-del="${Utils.esc(u.firestoreId || u.id)}" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-semibold" title="Delete account" aria-label="Delete account"><i class="fa-solid fa-trash-can"></i></button></td></tr>`).join('')
      : '<tr><td colspan="6" class="text-center text-slate-500">No registered accounts found yet.</td></tr>';
  };

  const syncAndRender = async () => {
    await Auth.syncUsers();
    render();
  };

  $('registeredUsersTableBody').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-del]');
    if (!btn) return;
    const targetId = btn.dataset.del;
    const user = Auth.getUsers().find((u) => String(u.firestoreId) === targetId || String(u.id) === targetId);
    if (user && confirm(`Delete the account @${user.username}? This will remove it from Firebase.`)) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      await Auth.deleteUser(targetId);
      await syncAndRender();
    }
  });

  const form = FormKit.attach($('addUserForm'), {
    async onValid(v) {
      const submitBtn = $('addUserForm').querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Creating...';
      }
      const error = await Auth.addUser({
        firstName: v.firstName,
        lastName: v.lastName,
        username: v.username,
        email: v.email,
        password: v.password,
      });
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account';
      }
      if (error) {
        FormKit.banner(banner, error, 'error');
        return;
      }
      FormKit.banner(banner, `Account @${v.username} created in Firebase.`, 'success');
      form.reset();
      await syncAndRender();
    },
  });

  document.querySelectorAll('[data-refresh]').forEach((b) => b.addEventListener('click', syncAndRender));
  await syncAndRender();
});
