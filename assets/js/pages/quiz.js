/**
 * Student quiz flow: register -> instructions -> quiz (90s) -> result -> vote -> finish.
 * Results and votes are saved directly and dynamically to Firebase Firestore ("quiz_records").
 * Functions used by inline onclick="" attributes in quiz.html stay global on purpose.
 */
const state = {
  student: { name: '', class: '', subject: '', score: 0 },
  questions: [],
  answers: {},
  index: 0,
  timer: null,
  timeLeft: APP.QUIZ_SECONDS,
  votes: { teacher: null, sir: null },
  quizActive: false,
  saving: false,
};
let registerForm;

const $ = (id) => document.getElementById(id);

function showView(viewId) {
  ['view-landing', 'view-instructions', 'view-quiz', 'view-result', 'view-voting', 'view-finish'].forEach((v) => $(v)?.classList.add('hidden'));
  const target = $(viewId);
  if (target) {
    target.classList.remove('hidden');
    target.querySelectorAll('.glass-card').forEach((c) => { c.classList.remove('enter'); void c.offsetWidth; c.classList.add('enter'); });
  }
  state.quizActive = viewId === 'view-quiz';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- 1. registration ---------- */
function renderSubjectCards() {
  $('subjectGrid').innerHTML = SUBJECTS.map((s) => `
    <div role="button" tabindex="0" data-subject="${s.id}" id="subj-${s.id}" class="mcq-option p-2.5 sm:p-3 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-1.5 sm:gap-2 text-center select-none active:scale-95 transition-all">
      <div class="p-2 sm:p-2.5 rounded-xl bg-blue-100 text-brandBlue text-lg sm:text-xl"><i class="fa-solid ${s.icon}"></i></div>
      <span class="text-[11px] sm:text-xs font-bold leading-tight break-words">${s.name}</span>
    </div>`).join('');
  $('subjectGrid').querySelectorAll('[data-subject]').forEach((el) => {
    el.addEventListener('click', () => selectSubject(el.dataset.subject));
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSubject(el.dataset.subject); } });
  });
}

function selectSubject(id) {
  state.student.subject = id;
  $('inputSubject').value = id;
  document.querySelectorAll('#subjectGrid .mcq-option').forEach((el) => el.classList.remove('selected'));
  $(`subj-${id}`)?.classList.add('selected');
  registerForm.showError($('inputSubject'), ''); // clear "pick a subject" message
}

function onRegistered(v) {
  state.student.name = v.name.replace(/\s+/g, ' ');
  state.student.class = v.class;
  state.student.subject = v.subject;
  $('summaryName').innerText = state.student.name;
  $('summaryClass').innerText = v.class;
  $('summarySubject').innerText = Utils.subjectName(v.subject);
  showView('view-instructions');
}

/* ---------- 2-3. quiz ---------- */
function startQuiz() {
  const classBank = QUESTION_BANK[state.student.class] || QUESTION_BANK['Class 7'];
  const data = classBank[state.student.subject] || classBank.computer;

  const picked = Utils.shuffle([
    ...Utils.shuffle(data.subject).slice(0, APP.QUESTIONS_FROM_SUBJECT),
    ...Utils.shuffle(data.iq).slice(0, APP.QUESTIONS_FROM_IQ),
  ]);
  state.questions = picked.map((q) => {
    const opts = Utils.shuffle(q.options.map((text, originalIdx) => ({ text, originalIdx })));
    return { q: q.q, options: opts.map((o) => o.text), ans: opts.findIndex((o) => o.originalIdx === q.ans) };
  });

  state.answers = {};
  state.index = 0;
  state.timeLeft = APP.QUIZ_SECONDS;
  $('timerText').innerText = '01:30';
  $('timerProgress').style.width = '100%';
  $('quizSubjectBadge').innerText = `${state.student.class} - ${Utils.subjectName(state.student.subject)}`;

  renderQuestion();
  showView('view-quiz');
  startTimer();
}

function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.timeLeft--;
    const m = Math.floor(state.timeLeft / 60), s = state.timeLeft % 60;
    $('timerText').innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    $('timerProgress').style.width = `${(state.timeLeft / APP.QUIZ_SECONDS) * 100}%`;
    if (state.timeLeft <= 0) submitQuiz();
  }, 1000);
}

function renderQuestion() {
  const q = state.questions[state.index];
  const urdu = state.student.subject === 'islamiat';
  $('questionCounter').innerText = `Question ${state.index + 1} of ${state.questions.length}`;
  const qText = $('quizQuestionText');
  qText.innerText = q.q;
  qText.classList.toggle('urdu-font', urdu);
  qText.classList.toggle('text-right', urdu);

  $('quizOptionsContainer').innerHTML = q.options.map((opt, i) => `
    <div onclick="selectAnswer(${i})" class="mcq-option p-3 sm:p-4 rounded-xl cursor-pointer flex items-center justify-between active:scale-[0.99] transition-all min-h-[48px] ${state.answers[state.index] === i ? 'selected' : ''}">
      <span class="text-xs sm:text-sm md:text-base font-semibold break-words leading-relaxed ${urdu ? 'urdu-font text-base sm:text-lg' : ''}">${Utils.esc(opt)}</span>
    </div>`).join('');

  const last = state.index === state.questions.length - 1;
  $('btnNext').classList.toggle('hidden', last);
  $('btnSubmit').classList.toggle('hidden', !last);
  hideQuizWarning();
}

function selectAnswer(i) { 
  state.answers[state.index] = i; 
  renderQuestion(); 
}

function nextQuestion() { 
  if (state.answers[state.index] === undefined) {
    showQuizWarning("Please select an option before moving to the next question.");
    return;
  }
  if (state.index < state.questions.length - 1) { 
    state.index++; 
    renderQuestion(); 
  } 
}

function prevQuestion() { 
  if (state.index > 0) { 
    state.index--; 
    renderQuestion(); 
  } 
}

function submitQuiz() {
  if (!state.quizActive) return; // guard: timer + button can both fire
  if (state.answers[state.index] === undefined) {
    showQuizWarning("Please select an option before submitting the quiz.");
    return;
  }
  clearInterval(state.timer);
  let score = 0;
  state.questions.forEach((q, i) => { if (state.answers[i] === q.ans) score++; });
  state.student.score = score;
  $('resScore').innerText = score;
  const fb = $('resFeedback');
  const strong = score >= APP.HIGH_SCORE;
  fb.innerText = strong ? 'Strong Performance! 🌟' : 'Need Improvement! 💪';
  fb.className = `text-xs font-bold pt-1 ${strong ? 'text-emerald-600' : 'text-rose-600'}`;
  showView('view-result');
}

function showQuizWarning(msg) {
  let warnBox = $('quizOptionWarning');
  if (!warnBox) {
    warnBox = document.createElement('div');
    warnBox.id = 'quizOptionWarning';
    warnBox.className = 'p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-700 text-sm font-bold text-center mt-3 animate-bounce flex items-center justify-center gap-2';
    const container = $('quizOptionsContainer');
    if (container && container.parentNode) {
      container.parentNode.insertBefore(warnBox, container.nextSibling);
    }
  }
  warnBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-500"></i> ${msg}`;
  warnBox.classList.remove('hidden');
}

function hideQuizWarning() {
  const warnBox = $('quizOptionWarning');
  if (warnBox) {
    warnBox.classList.add('hidden');
  }
}

/* ---------- 4-5. voting ---------- */
function renderVotingGrids() {
  $('teachersGrid').innerHTML = TEACHERS_LIST.map((name, i) => `
    <div onclick="selectVote('teacher', ${i})" id="card-t-${i}" class="teacher-card mcq-option p-2.5 sm:p-3 rounded-xl cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 active:scale-95 transition-all select-none min-h-[44px]" title="${name}">
      <span class="text-[11px] sm:text-xs font-bold truncate text-center sm:text-left">${name}</span></div>`).join('');
  $('sirsGrid').innerHTML = SIRS_LIST.map((name, i) => `
    <div onclick="selectVote('sir', ${i})" id="card-s-${i}" class="sir-card mcq-option p-2.5 sm:p-3.5 rounded-xl cursor-pointer flex items-center justify-center sm:justify-start gap-2 sm:gap-3 active:scale-95 transition-all select-none min-h-[44px]" title="${name}">
      <span class="text-[11px] sm:text-xs font-bold truncate text-center sm:text-left">${name}</span></div>`).join('');
}

function goToTeacherVoting() {
  state.votes = { teacher: null, sir: null };
  document.querySelectorAll('.teacher-card, .sir-card').forEach((el) => el.classList.remove('selected'));
  $('votingError').classList.add('hidden');
  $('saveError').classList.add('hidden');
  showView('view-voting');
}

function selectVote(category, i) {
  const isTeacher = category === 'teacher';
  state.votes[category] = (isTeacher ? TEACHERS_LIST : SIRS_LIST)[i]; // value always comes from our own lists
  document.querySelectorAll(isTeacher ? '.teacher-card' : '.sir-card').forEach((el) => el.classList.remove('selected'));
  $(`card-${isTeacher ? 't' : 's'}-${i}`).classList.add('selected');
}

async function submitTeacherVote() {
  if (state.saving) return; // blocks double-clicks => no duplicate Firebase documents
  if (!state.votes.teacher || !state.votes.sir) { $('votingError').classList.remove('hidden'); return; }
  $('votingError').classList.add('hidden');
  $('saveError').classList.add('hidden');

  const record = { // same fields as the original project => existing Firestore data stays compatible
    id: Date.now(),
    name: state.student.name,
    class: state.student.class,
    subject: state.student.subject,
    score: state.student.score,
    votedTeacher: state.votes.teacher,
    votedSir: state.votes.sir,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  if (!Validators.quizRecord(record)) {
    FormKit.banner($('saveError'), 'Something is wrong with the submission. Please restart the quiz.', 'error');
    return;
  }

  state.saving = true;
  const btn = $('btnCastVote');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Submitting to Firebase...';

  const result = await FirebaseService.saveQuizRecord(record);

  state.saving = false;
  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-thumbs-up"></i><span>Submit Both Votes & Finish</span>';

  const note = $('syncNote');
  if (result.saved) {
    note.className = 'hidden';
  } else {
    FormKit.banner(note, 'Database note: Could not save to Firebase. ' + (result.error ? result.error.message : 'Please check connection.'), 'error');
  }
  showView('view-finish');
}

function resetApp() {
  state.student = { name: '', class: '', subject: '', score: 0 };
  registerForm.reset();
  $('inputSubject').value = '';
  document.querySelectorAll('#subjectGrid .mcq-option').forEach((el) => el.classList.remove('selected'));

  if (typeof Auth !== 'undefined') {
    const student = Auth.currentStudent();
    if (student) {
      const fullName = `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.username;
      if (fullName && $('inputName')) $('inputName').value = fullName;
    }
  }

  showView('view-landing');
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderSubjectCards();
  renderVotingGrids();
  registerForm = FormKit.attach($('registerForm'), { onValid: onRegistered });

  if (typeof Auth !== 'undefined') {
    const student = Auth.currentStudent();
    if (student) {
      const fullName = `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.username;
      if (fullName && $('inputName')) {
        $('inputName').value = fullName;
      }
    }
  }

  if (window.FirebaseService) {
    FirebaseService.flushPending().catch(() => {});
  }
  window.addEventListener('beforeunload', (e) => { if (state.quizActive) { e.preventDefault(); e.returnValue = ''; } });
});
