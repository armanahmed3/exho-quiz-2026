/** Admin > Leaderboard: ranked table with filters + CSV export. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  let ranked = [], shown = [];

  const render = () => {
    const q = $('fSearch').value.trim().toLowerCase(), cls = $('fClass').value, sub = $('fSubject').value, st = $('fStatus').value;
    shown = ranked.filter(({ r }) =>
      (!q || String(r.name).toLowerCase().includes(q)) && (!cls || r.class === cls) && (!sub || r.subject === sub) &&
      (!st || (st === 'strong' ? r.score >= APP.HIGH_SCORE : r.score < APP.HIGH_SCORE)));
    $('resultCount').innerText = `${shown.length} result${shown.length === 1 ? '' : 's'}`;
    $('adminResultsTableBody').innerHTML = shown.length
      ? shown.map(({ r, rank }) => AdminData.studentRow(r, rank)).join('')
      : `<tr><td colspan="8" class="text-center text-slate-500">${ranked.length ? 'No students match these filters.' : 'No student quiz logs recorded yet.'}</td></tr>`;
  };

  ['fSearch', 'fClass', 'fSubject', 'fStatus'].forEach((id) => $(id).addEventListener('input', render));
  $('filterForm').addEventListener('submit', (e) => e.preventDefault());

  $('exportCsv').addEventListener('click', () => {
    const head = ['Rank', 'Student', 'Class', 'Subject', 'Marks', 'Voted Teacher', 'Voted Sir', 'Time'];
    const rows = shown.map(({ r, rank }) => [rank, r.name, r.class, r.subject, r.score, r.votedTeacher, r.votedSir, r.timestamp]);
    const csv = [head, ...rows].map((row) => row.map(Utils.csvCell).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'exhibition-quiz-leaderboard.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  AdminData.mount(({ records }) => {
    ranked = AdminData.leaderboard(records).map((r, i) => ({ r, rank: i + 1 })); // rank is global, filters don't change it
    render();
  }, $('dataError'));
});
