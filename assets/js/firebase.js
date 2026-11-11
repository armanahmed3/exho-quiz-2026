/**
 * Firebase / Firestore service - the ONLY file that talks to Firebase.
 *
 * Connected dynamically to Firebase Firestore ("quiz_records" and "users" collections).
 * All data is read and written directly to the cloud database with zero local storage dependence.
 * Supports real-time dynamic snapshot listeners for live multi-device syncing.
 *
 * Exposes: window.FirebaseService
 *   .ready                      Promise resolving with { db, fs, app }
 *   .saveQuizRecord(record)     -> saves doc to Firestore collection "quiz_records"
 *   .fetchQuizRecords()         -> [{ id, ...data }] directly from Firestore
 *   .subscribeQuizRecords(fn)   -> real-time onSnapshot listener
 *   .clearQuizRecords()         -> deletes all docs in "quiz_records" from Firestore
 *   .saveUser(userData)         -> saves doc to Firestore collection "users"
 *   .fetchUsers()               -> [{ firestoreId, ...data }] directly from Firestore
 *   .subscribeUsers(fn)         -> real-time onSnapshot listener
 *   .deleteUser(id)             -> deletes doc in "users" from Firestore
 *   .findUser(identifier, pass) -> authenticates against Firestore users
 *   .checkUserExists(user, eml) -> checks uniqueness directly in Firestore
 *   .flushPending()             -> one-time migration of any legacy local pending records to Firestore
 */
(function () {
  const SDK = 'https://www.gstatic.com/firebasejs/11.0.1/';
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

  const ready = (async () => {
    try {
      const [appMod, fs] = await Promise.all([
        import(SDK + 'firebase-app.js'),
        import(SDK + 'firebase-firestore.js'),
      ]);
      const app = appMod.initializeApp(firebaseConfig);
      try {
        const analyticsMod = await import(SDK + 'firebase-analytics.js');
        analyticsMod.getAnalytics(app);
      } catch (e) {
        // Analytics is optional in local or offline contexts
      }
      const db = fs.initializeFirestore
        ? fs.initializeFirestore(app, { experimentalAutoDetectLongPolling: true })
        : fs.getFirestore(app);
      return { db, fs, app };
    } catch (e) {
      console.error('Firebase initialization error:', e);
      throw e;
    }
  })();

  /* ---------- Quiz Records (Firestore collection "quiz_records") ---------- */

  async function saveQuizRecord(record) {
    try {
      const { db, fs } = await ready;
      const docRef = await fs.addDoc(fs.collection(db, COLLECTION), record);
      return { saved: true, id: docRef.id };
    } catch (e) {
      console.error('Firebase saveQuizRecord error:', e);
      return { saved: false, error: e };
    }
  }

  async function fetchQuizRecords() {
    const { db, fs } = await ready;
    const snap = await fs.getDocs(fs.collection(db, COLLECTION));
    const records = [];
    snap.forEach((d) => {
      records.push({ firestoreDocId: d.id, ...d.data() });
    });
    return records;
  }

  function subscribeQuizRecords(callback, onError) {
    let unsubscribe = () => {};
    ready.then(({ db, fs }) => {
      unsubscribe = fs.onSnapshot(
        fs.collection(db, COLLECTION),
        (snap) => {
          const records = [];
          snap.forEach((d) => records.push({ firestoreDocId: d.id, ...d.data() }));
          callback(records);
        },
        (err) => {
          console.error('Quiz records snapshot error:', err);
          if (onError) onError(err);
        }
      );
    }).catch((err) => {
      console.error('Quiz records subscription failed:', err);
      if (onError) onError(err);
    });
    return () => unsubscribe();
  }

  async function clearQuizRecords() {
    const { db, fs } = await ready;
    const snap = await fs.getDocs(fs.collection(db, COLLECTION));
    const deletes = [];
    snap.forEach((d) => {
      deletes.push(fs.deleteDoc(fs.doc(db, COLLECTION, d.id)));
    });
    await Promise.all(deletes);
    return snap.size;
  }

  /* ---------- User Accounts (Firestore collection "users") ---------- */

  async function saveUser(user) {
    try {
      const { db, fs } = await ready;
      const ref = await fs.addDoc(fs.collection(db, USERS_COLLECTION), user);
      return { saved: true, id: ref.id };
    } catch (e) {
      console.error('Firebase saveUser error:', e);
      return { saved: false, error: e };
    }
  }

  async function fetchUsers() {
    const { db, fs } = await ready;
    const snap = await fs.getDocs(fs.collection(db, USERS_COLLECTION));
    const users = [];
    snap.forEach((d) => {
      users.push({ firestoreId: d.id, ...d.data() });
    });
    return users;
  }

  function subscribeUsers(callback, onError) {
    let unsubscribe = () => {};
    ready.then(({ db, fs }) => {
      unsubscribe = fs.onSnapshot(
        fs.collection(db, USERS_COLLECTION),
        (snap) => {
          const users = [];
          snap.forEach((d) => users.push({ firestoreId: d.id, ...d.data() }));
          callback(users);
        },
        (err) => {
          console.error('Users snapshot error:', err);
          if (onError) onError(err);
        }
      );
    }).catch((err) => {
      console.error('Users subscription failed:', err);
      if (onError) onError(err);
    });
    return () => unsubscribe();
  }

  async function deleteUser(id) {
    try {
      const { db, fs } = await ready;
      const targetStr = String(id);
      const snap = await fs.getDocs(fs.collection(db, USERS_COLLECTION));
      let deleted = false;
      for (const d of snap.docs) {
        const data = d.data();
        if (d.id === targetStr || String(data.id) === targetStr || String(data.firestoreId) === targetStr) {
          await fs.deleteDoc(fs.doc(db, USERS_COLLECTION, d.id));
          deleted = true;
        }
      }
      return deleted;
    } catch (e) {
      console.error('Firebase deleteUser error:', e);
      return false;
    }
  }

  async function checkUserExists(username, email) {
    try {
      const users = await fetchUsers();
      const uLower = String(username || '').trim().toLowerCase();
      const eLower = String(email || '').trim().toLowerCase();
      const takenUser = users.some((u) => String(u.username || '').trim().toLowerCase() === uLower);
      if (takenUser) return 'Username is already taken in the database. Please choose another.';
      const takenEmail = users.some((u) => String(u.email || '').trim().toLowerCase() === eLower);
      if (takenEmail) return 'An account with this email is already registered in the database.';
      return '';
    } catch (e) {
      console.error('Error checking user existence in Firestore:', e);
      throw e;
    }
  }

  async function findUser(identifier, password) {
    try {
      const users = await fetchUsers();
      const idLower = String(identifier || '').trim().toLowerCase();
      const user = users.find(
        (u) =>
          (String(u.username || '').trim().toLowerCase() === idLower ||
           String(u.email || '').trim().toLowerCase() === idLower) &&
          u.password === password
      );
      return user || null;
    } catch (e) {
      console.error('Error finding user in Firestore:', e);
      throw e;
    }
  }

  /* One-time migration: flush any old pending records from localStorage to Firebase and purge */
  async function flushPending() {
    try {
      const pendingRaw = localStorage.getItem('pending_quiz_records');
      if (!pendingRaw) return 0;
      const pending = JSON.parse(pendingRaw);
      if (!Array.isArray(pending) || !pending.length) {
        localStorage.removeItem('pending_quiz_records');
        return 0;
      }
      let uploaded = 0;
      for (const rec of pending) {
        const res = await saveQuizRecord(rec);
        if (res.saved) uploaded++;
      }
      localStorage.removeItem('pending_quiz_records');
      return uploaded;
    } catch (e) {
      return 0;
    }
  }

  window.FirebaseService = {
    info: { projectId: firebaseConfig.projectId, collection: COLLECTION, usersCollection: USERS_COLLECTION },
    ready,
    saveQuizRecord,
    fetchQuizRecords,
    subscribeQuizRecords,
    clearQuizRecords,
    flushPending,
    pendingCount: () => {
      try {
        const p = JSON.parse(localStorage.getItem('pending_quiz_records') || '[]');
        return Array.isArray(p) ? p.length : 0;
      } catch (e) { return 0; }
    },
    saveUser,
    fetchUsers,
    subscribeUsers,
    deleteUser,
    checkUserExists,
    findUser,
  };
})();
