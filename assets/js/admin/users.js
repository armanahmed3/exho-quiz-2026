/**
 * Admin > Registered Users: list, delete, and add accounts directly in Firebase Firestore.
 * Everything is live and synced with the cloud database in real-time.
 */
document.addEventListener('DOMContentLoaded', async () => {
  const $ = (id) => document.getElementById(id);
  const banner = $('formBanner');
  let currentUsersList = [];

  const tableBody = $('registeredUsersTableBody');
  if (tableBody) {
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-6 text-slate-400 font-medium"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading live registered accounts from Firebase...</td></tr>';
  }

  const render = (users) => {
    currentUsersList = users || [];
    $('userCountBadge').innerText = `${currentUsersList.length} User${currentUsersList.length === 1 ? '' : 's'}`;
    $('registeredUsersTableBody').innerHTML = currentUsersList.length
      ? currentUsersList.slice().reverse().map((u, i) => `<tr>
          <td class="font-mono text-xs text-slate-500 whitespace-nowrap">${currentUsersList.length - i}</td>
          <td class="font-bold text-slate-800 whitespace-nowrap">${Utils.esc(u.firstName)} ${Utils.esc(u.lastName)}</td>
          <td class="text-brandBlue font-medium whitespace-nowrap">@${Utils.esc(u.username)}</td>
          <td class="font-mono text-xs whitespace-nowrap">${Utils.esc(u.email)}</td>
          <td class="text-xs text-slate-500 whitespace-nowrap">${Utils.esc(u.registeredAt || 'N/A')}</td>
          <td class="whitespace-nowrap"><button type="button" data-del="${Utils.esc(u.firestoreId || u.id)}" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-semibold" title="Delete account from Firebase" aria-label="Delete account"><i class="fa-solid fa-trash-can"></i></button></td></tr>`).join('')
      : '<tr><td colspan="6" class="text-center text-slate-500">No registered student accounts in Firebase yet.</td></tr>';
  };

  const syncAndRender = async () => {
    try {
      const users = await FirebaseService.fetchUsers();
      render(users);
    } catch (e) {
      console.error('Error fetching users:', e);
    }
  };

  // Real-time dynamic Firestore subscription
  if (window.FirebaseService) {
    FirebaseService.subscribeUsers((users) => {
      render(users);
    });
  }

  $('registeredUsersTableBody').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-del]');
    if (!btn) return;
    const targetId = btn.dataset.del;
    const user = currentUsersList.find((u) => String(u.firestoreId) === targetId || String(u.id) === targetId);
    const uName = user ? user.username : 'this user';
    if (confirm(`Delete the account @${uName} permanently from Firebase Firestore?`)) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      btn.disabled = true;
      await Auth.deleteUser(targetId);
      await syncAndRender();
    }
  });

  const form = FormKit.attach($('addUserForm'), {
    async onValid(v) {
      const submitBtn = $('addUserForm').querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Creating in Firebase...';
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
      FormKit.banner(banner, `Account @${v.username} created dynamically in Firebase Firestore.`, 'success');
      form.reset();
      await syncAndRender();
    },
  });

  document.querySelectorAll('[data-refresh]').forEach((b) => b.addEventListener('click', syncAndRender));
  await syncAndRender();
});
