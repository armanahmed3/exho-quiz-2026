/**
 * Validation rules used by EVERY form (signup, admin "add account", quiz
 * registration, login, filters). Each rule returns '' when valid or an
 * error message. Keep the limits here so UI hints and checks never drift apart.
 */
const Validators = {
  LIMITS: { personName: [2, 30], studentName: [2, 40], username: [6, 20], emailMax: 60, passwordMin: 8, passwordMax: 64 },

  required: (v) => (String(v ?? '').trim() ? '' : 'This field is required.'),

  personName(v) { // first / last name
    v = String(v ?? '').trim();
    if (!v) return 'This field is required.';
    if (v.length < 2 || v.length > 30) return 'Must be 2 to 30 characters.';
    if (!/^[\p{L}][\p{L}\p{M}'’ .-]*$/u.test(v)) return 'Use letters only (spaces, . - \' allowed).';
    return '';
  },

  studentName(v) {
    v = String(v ?? '').trim();
    if (!v) return 'Please enter the student name.';
    if (v.length < 2 || v.length > 40) return 'Name must be 2 to 40 characters.';
    if (!/^[\p{L}][\p{L}\p{M}'’ .-]*$/u.test(v)) return 'Name can contain letters and spaces only.';
    return '';
  },

  username(v) {
    v = String(v ?? '').trim();
    if (!v) return 'Username is required.';
    if (!/^[a-zA-Z0-9]+$/.test(v)) return 'Letters and numbers only (no spaces or special characters).';
    if (v.length < 6 || v.length > 20) return 'Username must be 6 to 20 characters.';
    return '';
  },

  email(v) {
    v = String(v ?? '').trim();
    if (!v) return 'Email is required.';
    if (v.length > 60) return 'Email is too long (max 60 characters).';
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(v)) return 'Email must be a valid @gmail.com address.';
    return '';
  },

  password(v) { // strength rules apply to NEW passwords only (login never uses this)
    v = String(v ?? '');
    if (!v) return 'Password is required.';
    if (v.length < 8) return 'Password must be at least 8 characters.';
    if (v.length > 64) return 'Password must be at most 64 characters.';
    if (/\s/.test(v)) return 'Password cannot contain spaces.';
    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Use at least one letter and one number.';
    return '';
  },

  confirm: (v, all) => (v === all.password ? '' : 'Passwords do not match.'),

  className: (v) => (APP.CLASSES.includes(v) ? '' : 'Please choose a class.'),
  subjectId: (v) => (SUBJECTS.some((s) => s.id === v) ? '' : 'Please pick a subject.'),
  loginId: (v) => { v = String(v ?? '').trim(); return !v ? 'Enter your username or email.' : v.length > 60 ? 'Too long.' : ''; },
  loginPassword: (v) => (!v ? 'Enter your password.' : v.length > 64 ? 'Too long.' : ''),
  resetPhrase: (v) => (v === 'RESET' ? '' : 'Type RESET (capital letters) to confirm.'),
  searchText: (v) => (String(v ?? '').length > 40 ? 'Search is limited to 40 characters.' : ''),

  /** Last line of defence before a record is written to Firestore. */
  quizRecord(r) {
    const ok = r && !this.studentName(r.name) && APP.CLASSES.includes(r.class) && SUBJECTS.some((s) => s.id === r.subject) &&
      Number.isInteger(r.score) && r.score >= 0 && r.score <= APP.QUESTIONS_FROM_SUBJECT + APP.QUESTIONS_FROM_IQ &&
      TEACHERS_LIST.includes(r.votedTeacher) && SIRS_LIST.includes(r.votedSir);
    return !!ok;
  },
};
