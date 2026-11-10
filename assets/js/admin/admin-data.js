/** Data + aggregation helpers for the admin pages. All Firebase access goes through FirebaseService. */
const AdminData = {
  async load() {
    let records = [], error = null;
    try { records = await FirebaseService.fetchQuizRecords(); }
    catch (e) { error = e; console.error('Error fetching records from Firebase:', e); }
    return { records, users: Auth.getUsers(), error };
  },

  /** Wires every [data-refresh] button + calls render(data) once now. */
  async mount(render, errorEl) {
    const run = async () => {
      const data = await this.load();
      if (errorEl) {
        if (data.error) FormKit.banner(errorEl, 'Could not load quiz records from Firebase. Check your internet connection and Firestore rules, then press Refresh.', 'error');
        else FormKit.hide(errorEl);
      }
      render(data);
    };
    document.querySelectorAll('[data-refresh]').forEach((b) => b.addEventListener('click', run));
    await run();
  },

  stats(records, users) {
    const total = records.length;
    const avg = total ? (records.reduce((a, r) => a + (Number(r.score) || 0), 0) / total).toFixed(1) : '0';
    const high = records.filter((r) => r.score >= APP.HIGH_SCORE).length;
    return { users: users.length, total, avg, high, other: total - high };
  },

  voteCounts(records, key, list) {
    const counts = Object.fromEntries(list.map((n) => [n, 0]));
    records.forEach((r) => { if (r[key] && counts[r[key]] !== undefined) counts[r[key]]++; });
    return counts;
  },

  ranked(records, key, list) {
    const counts = this.voteCounts(records, key, list);
    return list.slice().sort((a, b) => counts[b] - counts[a]).map((name) => ({
      name, count: counts[name], pct: Math.round((counts[name] / (records.length || 1)) * 100),
    }));
  },

  leaderboard: (records) => records.slice().sort((a, b) => b.score - a.score || (a.id < b.id ? -1 : 1)),

  statusBadge(score) {
    return score >= APP.HIGH_SCORE
      ? '<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-bold whitespace-nowrap"><i class="fa-solid fa-circle-check mr-1"></i>Strong (≥8)</span>'
      : '<span class="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold whitespace-nowrap"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Needs Improvement (&lt;8)</span>';
  },

  /** One <tr> of the student table. Every Firestore value is escaped. */
  studentRow(r, rank) {
    const color = r.score >= APP.HIGH_SCORE ? 'text-emerald-600' : 'text-rose-600';
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
      <h3 id="${id}" class="text-2xl sm:text-3xl font-display font-extrabold text-${color}-600 mt-1 truncate">0</h3></div>
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
