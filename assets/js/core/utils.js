/** Small helpers shared by every page. */
const Utils = {
  // Escape user-provided text before putting it into innerHTML (prevents stored XSS from Firestore data).
  esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },
  param(name) { return new URLSearchParams(location.search).get(name); },
  // Only allow redirects to our own pages (blocks "?next=https://evil.site").
  safeNext(next, fallback) { return next && /^[\w\-./]+\.html$/.test(next) && !next.startsWith('/') && !next.includes('..') ? next : fallback; },
  base() { return document.body.dataset.base || ''; },
  subjectName(id) { return (SUBJECTS.find((s) => s.id === id) || {}).name || id; },
  csvCell(v) { // neutralise spreadsheet formula injection + quote
    let s = String(v ?? '');
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  },
};
