/** Admin > Dashboard: key numbers, 4 compact charts, latest submissions. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  $('statGrid').innerHTML =
    AdminData.statCard('statTotalUsers', 'Total Registered Users', 'blue', 'fa-users') +
    AdminData.statCard('statTotalVotes', 'Total Submissions', 'emerald', 'fa-check-to-slot') +
    AdminData.statCard('statAvgScore', 'Average Score', 'sky', 'fa-star') +
    AdminData.statCard('statTopStudents', 'Top Students (8+)', 'amber', 'fa-award');

  const latestBody = $('latestBody');
  if (latestBody) {
    latestBody.innerHTML = '<tr><td colspan="7" class="text-center py-6 text-slate-400 font-medium"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading live submissions from Firebase...</td></tr>';
  }

  AdminData.mount(({ records, users }) => {
    const s = AdminData.stats(records, users);
    $('statTotalUsers').innerText = s.users;
    $('statTotalVotes').innerText = s.total;
    $('statAvgScore').innerText = `${s.avg}/10`;
    $('statTopStudents').innerText = s.high;
    $('centerTopStudents').innerText = s.high;
    $('centerTotalAttempts').innerText = s.total;

    const t5 = AdminData.ranked(records, 'votedTeacher', TEACHERS_LIST).slice(0, 5);
    const s5 = AdminData.ranked(records, 'votedSir', SIRS_LIST).slice(0, 5);
    Charts.bar('top5TeachersChart', t5.map((x) => x.name), t5.map((x) => x.count), Charts.PALETTE);
    Charts.bar('top5SirsChart', s5.map((x) => x.name), s5.map((x) => x.count), Charts.PALETTE_ALT);
    Charts.doughnut('topStudentsCircleChart', ['Top Students (≥8)', 'Other (<8)'], [s.high, s.other], ['#10B981', '#E2E8F0']);
    Charts.doughnut('totalAttemptsCircleChart', ['Total Attempts', 'Remaining'], [s.total, s.total === 0 ? 1 : 0], ['#0284C7', '#F1F5F9']);

    const latest = records.slice().sort((a, b) => ((b.id || 0) > (a.id || 0) ? 1 : -1)).slice(0, 5);
    $('latestBody').innerHTML = latest.length
      ? latest.map((r) => `<tr><td class="font-bold text-slate-800 whitespace-nowrap">${Utils.esc(r.name)}</td><td class="whitespace-nowrap">${Utils.esc(r.class)}</td><td class="capitalize whitespace-nowrap">${Utils.esc(r.subject)}</td>
          <td class="font-extrabold whitespace-nowrap ${Number(r.score) >= APP.HIGH_SCORE ? 'text-emerald-600' : 'text-rose-600'}">${Utils.esc(r.score)} / 10</td>
          <td class="whitespace-nowrap">${Utils.esc(r.votedTeacher || 'N/A')}</td><td class="whitespace-nowrap">${Utils.esc(r.votedSir || 'N/A')}</td><td class="text-xs text-slate-500 whitespace-nowrap">${Utils.esc(r.timestamp || '')}</td></tr>`).join('')
      : '<tr><td colspan="7" class="text-center text-slate-500">No student quiz logs recorded in Firebase yet.</td></tr>';
  }, $('dataError'));
});
