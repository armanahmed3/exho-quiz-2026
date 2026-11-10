/**
 * Firebase / Firestore service - the ONLY file that talks to Firebase.
 *
 * Same project, same SDK version, collections ("quiz_records", "users") and the
 * same document shape as the original index.html, so all existing data keeps
 * working. It is a classic script (not an ES module) on purpose: it loads the
 * SDK with dynamic import(), so the site still works when opened straight
 * from disk as well as from a web server.
 *
 * Exposes:  window.FirebaseService
 *   .ready                    Promise resolving once Firebase is initialised
 *   .saveQuizRecord(record)   -> addDoc(quiz_records)
 *   .fetchQuizRecords()       -> [{ id, ...data }]   (throws on failure)
 *   .clearQuizRecords()       -> deletes every doc in quiz_records
 *   .flushPending()           -> re-sends records that failed while offline
 *   .saveUser(userData)       -> addDoc(users)
 *   .fetchUsers()             -> [{ firestoreId, ...data }]
 *   .deleteUser(id)           -> deletes doc in users
 */
(function () {
  const SDK = 'https://www.gstatic.com/firebasejs/13.2.0/';
  const COLLECTION = 'quiz_records';
  const USERS_COLLECTION = 'users';

  const firebaseConfig = {
    apiKey: 'AIzaSyAxxh42rAgH-3R3jd_0I6-83uh0wvtFdXI',
    authDomain: 'exhibitionquiz2026.firebaseapp.com',
    projectId: 'exhibitionquiz2026',
    storageBucket: 'exhibitionquiz2026.firebasestorage.app',
    messagingSenderId: '236244214437',
    appId: '1:236244214437:web:9ddff766c668efa1da234c',
    measurementId: 'G-66GYHXMSE6',
  };

  function timeout(ms = 2500) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase timeout')), ms));
  }

  const ready = (async () => {
    try {
      const [appMod, analyticsMod, fs] = await Promise.race([
        Promise.all([
          import(SDK + 'firebase-app.js'),
          import(SDK + 'firebase-analytics.js'),
          import(SDK + 'firebase-firestore.js'),
        ]),
        timeout(4000)
      ]);
      const app = appMod.initializeApp(firebaseConfig);
      try { analyticsMod.getAnalytics(app); } catch (e) { console.warn('Analytics unavailable:', e.message); }
      return { db: fs.getFirestore(app), fs };
    } catch (e) {
      console.warn('Firebase init warning:', e.message);
      throw e;
    }
  })();

  const readPending = () => {
    try { return JSON.parse(localStorage.getItem(APP.KEYS.PENDING)) || []; } catch (e) { return []; }
  };
  const writePending = (list) => localStorage.setItem(APP.KEYS.PENDING, JSON.stringify(list));

  async function addRecord(record) {
    const { db, fs } = await Promise.race([ready, timeout(2500)]);
    return Promise.race([
      fs.addDoc(fs.collection(db, COLLECTION), record),
      timeout(2500)
    ]);
  }

  async function saveQuizRecord(record) {
    try {
      await addRecord(record);
      return { saved: true };
    } catch (e) {
      console.error('Error saving record:', e);
      writePending([...readPending(), record]); // never lose a student's result
      return { saved: false, error: e };
    }
  }

  async function flushPending() {
    const pending = readPending();
    if (!pending.length) return 0;
    const stillPending = [];
    for (const rec of pending) {
      try { await addRecord(rec); } catch (e) { stillPending.push(rec); }
    }
    writePending(stillPending);
    return pending.length - stillPending.length;
  }

  async function fetchQuizRecords() {
    const { db, fs } = await Promise.race([ready, timeout(3000)]);
    const snap = await Promise.race([
      fs.getDocs(fs.collection(db, COLLECTION)),
      timeout(3000)
    ]);
    const records = [];
    snap.forEach((d) => records.push({ id: d.id, ...d.data() }));
    return records;
  }

  async function clearQuizRecords() {
    const { db, fs } = await Promise.race([ready, timeout(3000)]);
    const snap = await Promise.race([
      fs.getDocs(fs.collection(db, COLLECTION)),
      timeout(3000)
    ]);
    for (const d of snap.docs) await fs.deleteDoc(fs.doc(db, COLLECTION, d.id));
    return snap.size;
  }

  /* ---------- User Accounts (Firebase Firestore) ---------- */
  async function saveUser(user) {
    try {
      const { db, fs } = await Promise.race([ready, timeout(2500)]);
      const ref = await Promise.race([
        fs.addDoc(fs.collection(db, USERS_COLLECTION), user),
        timeout(2500)
      ]);
      return { saved: true, id: ref.id };
    } catch (e) {
      console.warn('Firebase saveUser fallback to local:', e.message);
      return { saved: false, error: e };
    }
  }

  async function fetchUsers() {
    try {
      const { db, fs } = await Promise.race([ready, timeout(2500)]);
      const snap = await Promise.race([
        fs.getDocs(fs.collection(db, USERS_COLLECTION)),
        timeout(2500)
      ]);
      const users = [];
      snap.forEach((d) => users.push({ firestoreId: d.id, ...d.data() }));
      return users;
    } catch (e) {
      console.warn('Firebase fetchUsers fallback to local:', e.message);
      return null;
    }
  }

  async function deleteUser(id) {
    try {
      const { db, fs } = await Promise.race([ready, timeout(2500)]);
      const snap = await Promise.race([
        fs.getDocs(fs.collection(db, USERS_COLLECTION)),
        timeout(2500)
      ]);
      for (const d of snap.docs) {
        const data = d.data();
        if (d.id === String(id) || String(data.id) === String(id)) {
          await fs.deleteDoc(fs.doc(db, USERS_COLLECTION, d.id));
        }
      }
      return true;
    } catch (e) {
      console.warn('Firebase deleteUser error:', e.message);
      return false;
    }
  }

  window.FirebaseService = {
    info: { projectId: firebaseConfig.projectId, collection: COLLECTION, usersCollection: USERS_COLLECTION },
    ready,
    saveQuizRecord,
    fetchQuizRecords,
    clearQuizRecords,
    flushPending,
    pendingCount: () => readPending().length,
    saveUser,
    fetchUsers,
    deleteUser,
  };
})();
