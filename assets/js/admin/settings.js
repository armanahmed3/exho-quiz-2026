/** Admin > Data & Settings: Firebase health check, cloud data sync, guarded data reset. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const banner = $('formBanner');

  if (window.FirebaseService) {
    $('fbProject').innerText = FirebaseService.info.projectId;
    $('fbCollection').innerText = `${FirebaseService.info.collection} & ${FirebaseService.info.usersCollection}`;
  }

  const setStatus = (text, cls) => {
    const el = $('fbStatus');
    if (el) {
      el.innerText = text;
      el.className = `font-bold ${cls}`;
    }
  };

  const showPending = () => {
    const el = $('fbPending');
    if (el) el.innerText = FirebaseService.pendingCount();
  };
  showPending();

  async function test() {
    setStatus('Connecting to Firebase...', 'text-slate-500');
    try {
      const [records, users] = await Promise.all([
        FirebaseService.fetchQuizRecords(),
        FirebaseService.fetchUsers(),
      ]);
      const countEl = $('fbCount');
      if (countEl) countEl.innerText = `${records.length} Submissions, ${users.length} Users`;
      setStatus('Connected (Live Cloud)', 'text-emerald-600');
    } catch (e) {
      console.error('Firebase test error:', e);
      const countEl = $('fbCount');
      if (countEl) countEl.innerText = '-';
      setStatus('Connection failed: ' + (e.message || 'Check Firestore rules'), 'text-rose-600');
    }
  }

  $('btnTest').addEventListener('click', test);
  document.querySelectorAll('[data-refresh]').forEach((b) => b.addEventListener('click', test));

  $('btnSync').addEventListener('click', async () => {
    const btn = $('btnSync');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Syncing...';
    const n = await FirebaseService.flushPending();
    showPending();
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Sync pending records';
    FormKit.banner(
      banner,
      n
        ? `${n} legacy pending record(s) uploaded to Firebase Cloud.`
        : 'All records are already live on Firebase Firestore (0 pending).',
      'success'
    );
    await test();
  });

  const form = FormKit.attach($('resetForm'), {
    async onValid() {
      if (!confirm('Warning: Permanently delete ALL student quiz records from Firebase Firestore?')) return;
      const btn = $('btnReset');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Resetting...';
      try {
        const n = await FirebaseService.clearQuizRecords();
        FormKit.banner(banner, `Done - ${n} record(s) deleted from Firebase Cloud.`, 'success');
        form.reset();
      } catch (e) {
        console.error('Error clearing data:', e);
        FormKit.banner(banner, 'Could not clear data: ' + (e.message || 'Check Firestore rules'), 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-trash-can"></i> Reset Quiz Data';
        await test();
      }
    },
  });

  test();
});
