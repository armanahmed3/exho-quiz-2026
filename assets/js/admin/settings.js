/** Admin > Data & Settings: Firebase health check, offline-queue sync, guarded data reset. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const banner = $('formBanner');
  $('fbProject').innerText = FirebaseService.info.projectId;
  $('fbCollection').innerText = FirebaseService.info.collection;

  const setStatus = (text, cls) => { $('fbStatus').innerText = text; $('fbStatus').className = `font-bold ${cls}`; };
  const showPending = () => { $('fbPending').innerText = FirebaseService.pendingCount(); };
  showPending();

  async function test() {
    setStatus('Checking...', 'text-slate-500');
    try {
      const records = await FirebaseService.fetchQuizRecords();
      $('fbCount').innerText = records.length;
      setStatus('Connected', 'text-emerald-600');
    } catch (e) {
      console.error(e);
      $('fbCount').innerText = '-';
      setStatus('Connection failed', 'text-rose-600');
    }
  }

  $('btnTest').addEventListener('click', test);
  document.querySelectorAll('[data-refresh]').forEach((b) => b.addEventListener('click', test));

  $('btnSync').addEventListener('click', async () => {
    const n = await FirebaseService.flushPending();
    showPending();
    FormKit.banner(banner, n ? `${n} pending record(s) uploaded to Firebase.` : 'Nothing was uploaded (no pending records, or still offline).', n ? 'success' : 'info');
    test();
  });

  const form = FormKit.attach($('resetForm'), {
    async onValid() {
      if (!confirm('Last check: delete ALL student quiz records from Firebase?')) return;
      const btn = $('btnReset');
      btn.disabled = true;
      try {
        const n = await FirebaseService.clearQuizRecords();
        FormKit.banner(banner, `Done - ${n} record(s) deleted from Firebase.`, 'success');
        form.reset();
      } catch (e) {
        console.error('Error clearing data:', e);
        FormKit.banner(banner, 'Could not clear data. Check your connection and Firestore rules.', 'error');
      } finally { btn.disabled = false; test(); }
    },
  });

  test();
});
