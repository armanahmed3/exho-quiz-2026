/** Admin > Voting Results: ranked teacher + sir vote bars. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  AdminData.mount(({ records }) => {
    const teachers = AdminData.ranked(records, 'votedTeacher', TEACHERS_LIST);
    const sirs = AdminData.ranked(records, 'votedSir', SIRS_LIST);
    const lead = (list) => (list[0] && list[0].count > 0 ? `${Utils.esc(list[0].name)} (${list[0].count})` : '-');
    const card = (label, value, icon, color) => `<div class="glass-card p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-3 min-w-0">
      <div class="min-w-0"><p class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold truncate">${label}</p><h3 class="text-base sm:text-xl font-display font-extrabold text-${color}-600 mt-1 truncate">${value}</h3></div>
      <div class="p-2.5 sm:p-3 rounded-xl bg-${color}-50 text-${color}-600 text-xl sm:text-2xl shrink-0"><i class="fa-solid ${icon}"></i></div></div>`;
    $('voteStats').innerHTML =
      card('Students who voted', records.length, 'fa-users', 'blue') +
      card('Leading teacher', lead(teachers), 'fa-chalkboard-user', 'emerald') +
      card('Leading sir', lead(sirs), 'fa-user-tie', 'sky');
    $('adminTeacherBars').innerHTML = AdminData.barsHtml(teachers, 'bg-brandBlue');
    $('adminSirBars').innerHTML = AdminData.barsHtml(sirs, 'bg-brandBlueLight');
  }, $('dataError'));
});
