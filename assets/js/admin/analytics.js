/** Admin > Analytics & Charts: the four original charts (bigger) + class / distribution / subject charts. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  AdminData.mount(({ records, users }) => {
    const s = AdminData.stats(records, users);
    $('centerTopStudents').innerText = s.high;
    $('centerTotalAttempts').innerText = s.total;

    const t5 = AdminData.ranked(records, 'votedTeacher', TEACHERS_LIST).slice(0, 5);
    const s5 = AdminData.ranked(records, 'votedSir', SIRS_LIST).slice(0, 5);
    Charts.bar('top5TeachersChart', t5.map((x) => x.name), t5.map((x) => x.count), Charts.PALETTE);
    Charts.bar('top5SirsChart', s5.map((x) => x.name), s5.map((x) => x.count), Charts.PALETTE_ALT);
    Charts.doughnut('topStudentsCircleChart', ['Top Students (≥8)', 'Other (<8)'], [s.high, s.other], ['#10B981', '#E2E8F0']);

    const perClass = APP.CLASSES.map((c) => records.filter((r) => r.class === c).length);
    Charts.doughnut('classChart', APP.CLASSES, s.total ? perClass : [0, 0, 0, 0].map((_, i) => (i === 0 ? 1 : 0)), ['#1E3A8A', '#2563EB', '#0284C7', '#38BDF8']);

    const dist = Array.from({ length: 11 }, (_, n) => records.filter((r) => r.score === n).length);
    Charts.bar('distChart', dist.map((_, n) => String(n)), dist, dist.map((_, n) => (n >= APP.HIGH_SCORE ? '#10B981' : '#60A5FA')));

    const subj = SUBJECTS.map((sub) => {
      const rs = records.filter((r) => r.subject === sub.id);
      return { name: sub.name, avg: rs.length ? +(rs.reduce((a, r) => a + r.score, 0) / rs.length).toFixed(1) : 0 };
    });
    Charts.bar('subjectChart', subj.map((x) => x.name), subj.map((x) => x.avg), '#2563EB', true);
  }, $('dataError'));
});
