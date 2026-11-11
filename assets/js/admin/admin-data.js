/**
 * Data + aggregation helpers for admin pages.
 * All data is loaded directly and dynamically from Firebase Firestore.
 * Supports real-time dynamic sync so admin charts and tables update automatically.
 */
const AdminData = {
  _currentRecords: [],
  _currentUsers: [],

  async load() {
    let records = [], users = [], error = null;
    try {
      if (!window.FirebaseService) throw new Error('FirebaseService is not initialized.');
      const [fetchedRecords, fetchedUsers] = await Promise.all([
        FirebaseService.fetchQuizRecords(),
        FirebaseService.fetchUsers(),
      ]);
      records = Array.isArray(fetchedRecords) ? fetchedRecords : [];
      users = Array.isArray(fetchedUsers) ? fetchedUsers : [];
      this._currentRecords = records;
      this._currentUsers = users;
    } catch (e) {
      error = e;
      console.error('Error fetching data from Firebase:', e);
    }
    return { records, users, error };
  },

  /**
   * Mounts admin page: loads initial live data, attaches real-time Firestore listeners,
   * and wires up refresh buttons.
   */
  async mount(render, errorEl) {
    const handleData = (records, users, error) => {
      if (errorEl) {
        if (error) {
          const isPerm = String(error.message || '').toLowerCase().includes('permission') ||
                         String(error.code || '').toLowerCase().includes('permission');
          const msg = isPerm
            ? 'Firestore Permission Denied. Please ensure your Firestore Security Rules allow read/write.'
            : 'Could not connect to Firebase database. Please check your internet connection and Firestore rules.';
          FormKit.banner(errorEl, msg, 'error');
        } else {
          FormKit.hide(errorEl);
        }
      }
      render({ records, users, error });
    };

    const run = async () => {
      const data = await this.load();
      handleData(data.records, data.users, data.error);
    };

    // 1. Initial live fetch
    await run();

    // 2. Real-time dynamic Firestore subscriptions (instant sync on submission or user change)
    if (window.FirebaseService) {
      FirebaseService.subscribeQuizRecords((records) => {
        this._currentRecords = records;
        handleData(this._currentRecords, this._currentUsers, null);
      }, (err) => console.warn('Real-time quiz subscription warning:', err));

      FirebaseService.subscribeUsers((users) => {
        this._currentUsers = users;
        handleData(this._currentRecords, this._currentUsers, null);
      }, (err) => console.warn('Real-time users subscription warning:', err));
    }

    // 3. Manual refresh buttons
    document.querySelectorAll('[data-refresh]').forEach((b) => b.addEventListener('click', run));
  },

  stats(records, users) {
    const total = records.length;
    const avg = total ? (records.reduce((a, r) => a + (Number(r.score) || 0), 0) / total).toFixed(1) : '0';
    const high = records.filter((r) => Number(r.score) >= APP.HIGH_SCORE).length;
    return { users: users.length, total, avg, high, other: total - high };
  },

  voteCounts(records, key, list) {
    const counts = Object.fromEntries(list.map((n) => [n, 0]));
    records.forEach((r) => {
      if (r[key] && counts[r[key]] !== undefined) counts[r[key]]++;
    });
    return counts;
  },

  ranked(records, key, list) {
    const counts = this.voteCounts(records, key, list);
    return list.slice().sort((a, b) => counts[b] - counts[a]).map((name) => ({
      name,
      count: counts[name],
      pct: Math.round((counts[name] / (records.length || 1)) * 100),
    }));
  },

  leaderboard: (records) =>
    records.slice().sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0) || (a.id < b.id ? -1 : 1)),

  statusBadge(score) {
    return Number(score) >= APP.HIGH_SCORE
      ? '<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-bold whitespace-nowrap"><i class="fa-solid fa-circle-check mr-1"></i>Strong (≥8)</span>'
      : '<span class="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold whitespace-nowrap"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Needs Improvement (&lt;8)</span>';
  },

  /** One <tr> of the student table. Every Firestore value is escaped. */
  studentRow(r, rank) {
    const color = Number(r.score) >= APP.HIGH_SCORE ? 'text-emerald-600' : 'text-rose-600';
    return `<tr>
      <td class="font-mono text-xs font-bold text-slate-500">#${rank}</td>
      <td class="font-bold text-slate-800 whitespace-nowrap">${Utils.esc(r.name)}</td>
      <td><span class="px-2 py-0.5 rounded bg-blue-100 text-brandBlue text-xs font-semibold whitespace-nowrap">${Utils.esc(r.class)}</span></td>
      <td class="text-brandBlue font-medium capitalize whitespace-nowrap">${Utils.esc(r.subject)}</td>
      <td class="text-base font-extrabold ${color} whitespace-nowrap">${Utils.esc(r.score)} / 10</td>
      <td class="font-medium whitespace-nowrap">${Utils.esc(r.votedTeacher || 'N/A')}</td>
      <td class="text-brandBlue font-medium whitespace-nowrap">${Utils.esc(r.votedSir || 'N/A')}</td>
      <td class="whitespace-nowrap">${this.statusBadge(r.score)}</td></tr>`;
  },

  statCard(id, label, color, icon) {
    return `<div class="glass-card p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-3 min-w-0">
      <div class="min-w-0"><p class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold truncate">${label}</p>
      <h3 id="${id}" class="text-2xl sm:text-3xl font-display font-extrabold text-${color}-600 mt-1 truncate"><span class="animate-pulse text-xl text-slate-400">...</span></h3></div>
      <div class="p-2.5 sm:p-3 rounded-xl bg-${color}-50 text-${color}-600 text-xl sm:text-2xl shrink-0"><i class="fa-solid ${icon}"></i></div></div>`;
  },

  barsHtml(items, barClass) {
    return items.map((i) => `
      <div class="space-y-1">
        <div class="flex justify-between items-center text-xs font-bold text-slate-700 gap-2">
          <span class="truncate pr-1">${Utils.esc(i.name)}</span>
          <span class="text-brandBlue font-mono shrink-0 text-[11px] sm:text-xs">${i.count} Votes (${i.pct}%)</span></div>
        <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden border border-slate-300"><div class="${barClass} h-full transition-all duration-500" style="width:${i.pct}%"></div></div>
      </div>`).join('');
  },
};
