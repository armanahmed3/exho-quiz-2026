/**
 * App-wide constants. Everything that used to be hard-coded inside the
 * giant index.html script lives here so every page shares one source.
 */
const APP = {
  NAME: 'The Times School Network',
  EVENT: "EXHO QUIZ 2026",
  QUIZ_SECONDS: 90,
  QUESTIONS_FROM_SUBJECT: 7,
  QUESTIONS_FROM_IQ: 3,
  HIGH_SCORE: 8, // score >= 8 counts as "Strong / Top student"
  CLASSES: ['Class 7', 'Class 8', 'Class 9', 'Class 10'],

  // Storage keys (names are unchanged from the original project so existing
  // accounts saved in the browser keep working).
  KEYS: {
    USERS: 'registered_users', // localStorage  - all accounts
    STUDENT: 'logged_in_user', // localStorage  - current student session
    ADMIN: 'admin_session', //    sessionStorage - current admin session
    PENDING: 'pending_quiz_records', // localStorage - records not yet synced to Firebase
  },

  // NOTE: client-side credentials are visible to anyone who opens DevTools.
  // Fine for an exhibition demo; for real use move admin login to Firebase Auth.
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: '12345670',
};

const SUBJECTS = [
  { id: 'english', name: 'English', icon: 'fa-language' },
  { id: 'computer', name: 'Computer', icon: 'fa-laptop-code' },
  { id: 'biology', name: 'Biology', icon: 'fa-dna' },
  { id: 'history', name: 'History', icon: 'fa-landmark' },
  { id: 'geography', name: 'Geography', icon: 'fa-earth-americas' },
  { id: 'physics', name: 'Physics', icon: 'fa-atom' },
  { id: 'chemistry', name: 'Chemistry', icon: 'fa-vial' },
  { id: 'science', name: 'Science', icon: 'fa-flask' },
  { id: 'maths', name: 'Maths', icon: 'fa-calculator' },
  { id: 'islamiat', name: 'Islamiat', icon: 'fa-kaaba' },
];

const TEACHERS_LIST = ['Miss Farida', 'Miss Atiya', 'Miss Aashi', 'Miss Nadia', 'Miss Shafaq', 'Miss Afsheen', 'Miss Shamia', 'Miss Ramsha', 'Miss Anum', 'Miss Salma', 'Miss Mushfiqa', 'Miss Uzma', 'Miss Nousheen', 'Miss Samra' , 'Miss Arshia' , 'Miss Asfia' , 'Miss Samia' , ' Miss Rizwana' , 'Miss Quratalain' , 'Miss Hira'];
const SIRS_LIST = ['Sir Moiz', 'Sir Mohsin', 'Sir Hassan', 'Sir Shahzad', 'Sir Shahmeer'];
