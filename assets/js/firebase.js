/**
 * Unified Database Service (SQLite Backend + Cloud Firestore Engine).
 *
 * Automatically detects the backend:
 * 1. Primary: High-performance SQLite database backend via Express server (/api/...).
 *    - Permanent disk storage in "database.sqlite"
 *    - 100% offline-ready, zero internet required for exhibitions
 *    - Real-time periodic dynamic sync across all devices on the network
 * 2. Fallback: Firebase Firestore Cloud SDK if running purely static.
 *
 * Exposes: window.FirebaseService / window.DataService
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

  // Determine API base URL
  function getApiBase() {
    const origin = window.location.origin;
    if (origin && origin.startsWith('http')) {
      return origin;
    }
    return 'http://localhost:3000';
  }

  // Detect whether SQLite Express server is available
  let useSQLite = null;
  async function checkSQLiteServer() {
    if (useSQLite !== null) return useSQLite;
    
    // On production hosting like Vercel (*.vercel.app), use Cloud database for universal cross-device sync
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocalhost) {
      useSQLite = false;
      return false;
    }

    try {
      const res = await fetch(`${getApiBase()}/api/health`, { method: 'GET', cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.database === 'sqlite') {
          useSQLite = true;
          return true;
        }
      }
    } catch (e) {
      // Server not reachable
    }
    useSQLite = false;
    return false;
  }

  // Firestore fallback initialization
  const firestoreReady = (async () => {
    try {
      const [appMod, fs] = await Promise.all([
        import(SDK + 'firebase-app.js'),
        import(SDK + 'firebase-firestore.js'),
      ]);
      const app = appMod.initializeApp(firebaseConfig);
      const db = fs.initializeFirestore
        ? fs.initializeFirestore(app, { experimentalAutoDetectLongPolling: true })
        : fs.getFirestore(app);
      return { db, fs, app };
    } catch (e) {
      console.warn('Firestore fallback init error:', e.message);
      return null;
    }
  })();

  const ready = (async () => {
    const hasSQLite = await checkSQLiteServer();
    if (hasSQLite) {
      console.log('✓ Connected to SQLite database server (database.sqlite)');
      return { mode: 'sqlite' };
    }
    console.log('✓ Running with Firebase Firestore database');
    return { mode: 'firestore', ...(await firestoreReady) };
  })();

  /* ---------- Quiz Records API ---------- */

  async function saveQuizRecord(record) {
    if (await checkSQLiteServer()) {
      try {
        const res = await fetch(`${getApiBase()}/api/quiz-records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        const data = await res.json();
        if (res.ok) return { saved: true, id: data.id };
        throw new Error(data.error || 'Server error');
      } catch (e) {
        console.error('SQLite saveQuizRecord error:', e);
        return { saved: false, error: e };
      }
    }

    // Firestore fallback
    try {
      const fb = await firestoreReady;
      if (!fb) throw new Error('Database service unavailable');
      const docRef = await fb.fs.addDoc(fb.fs.collection(fb.db, COLLECTION), record);
      return { saved: true, id: docRef.id };
    } catch (e) {
      console.error('Firebase saveQuizRecord error:', e);
      return { saved: false, error: e };
    }
  }

  async function fetchQuizRecords() {
    if (await checkSQLiteServer()) {
      const res = await fetch(`${getApiBase()}/api/quiz-records`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Could not fetch quiz records from SQLite server');
      return await res.json();
    }

    // Firestore fallback
    const fb = await firestoreReady;
    if (!fb) return [];
    const snap = await fb.fs.getDocs(fb.fs.collection(fb.db, COLLECTION));
    const records = [];
    snap.forEach((d) => records.push({ firestoreDocId: d.id, ...d.data() }));
    return records;
  }

  function subscribeQuizRecords(callback, onError) {
    let active = true;
    checkSQLiteServer().then((isSQLite) => {
      if (isSQLite) {
        // Polling loop for SQLite to enable real-time live sync across devices
        const poll = async () => {
          if (!active) return;
          try {
            const records = await fetchQuizRecords();
            callback(records);
          } catch (e) {
            if (onError) onError(e);
          }
          if (active) setTimeout(poll, 3000);
        };
        poll();
      } else {
        // Firestore onSnapshot listener
        firestoreReady.then((fb) => {
          if (!fb) return;
          fb.fs.onSnapshot(
            fb.fs.collection(fb.db, COLLECTION),
            (snap) => {
              const records = [];
              snap.forEach((d) => records.push({ firestoreDocId: d.id, ...d.data() }));
              callback(records);
            },
            onError
          );
        });
      }
    });
    return () => { active = false; };
  }

  async function clearQuizRecords() {
    if (await checkSQLiteServer()) {
      const res = await fetch(`${getApiBase()}/api/quiz-records`, { method: 'DELETE' });
      const data = await res.json();
      return data.count || 0;
    }

    const fb = await firestoreReady;
    if (!fb) return 0;
    const snap = await fb.fs.getDocs(fb.fs.collection(fb.db, COLLECTION));
    const deletes = [];
    snap.forEach((d) => deletes.push(fb.fs.deleteDoc(fb.fs.doc(fb.db, COLLECTION, d.id))));
    await Promise.all(deletes);
    return snap.size;
  }

  /* ---------- User Accounts API ---------- */

  async function saveUser(user) {
    if (await checkSQLiteServer()) {
      try {
        const res = await fetch(`${getApiBase()}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        if (res.ok) return { saved: true, id: data.user.id };
        return { saved: false, error: new Error(data.error || 'Server error') };
      } catch (e) {
        return { saved: false, error: e };
      }
    }

    try {
      const fb = await firestoreReady;
      if (!fb) throw new Error('Database service unavailable');
      const ref = await fb.fs.addDoc(fb.fs.collection(fb.db, USERS_COLLECTION), user);
      return { saved: true, id: ref.id };
    } catch (e) {
      return { saved: false, error: e };
    }
  }

  async function fetchUsers() {
    if (await checkSQLiteServer()) {
      const res = await fetch(`${getApiBase()}/api/users`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Could not fetch users from SQLite server');
      return await res.json();
    }

    const fb = await firestoreReady;
    if (!fb) return [];
    const snap = await fb.fs.getDocs(fb.fs.collection(fb.db, USERS_COLLECTION));
    const users = [];
    snap.forEach((d) => users.push({ firestoreId: d.id, ...d.data() }));
    return users;
  }

  function subscribeUsers(callback, onError) {
    let active = true;
    checkSQLiteServer().then((isSQLite) => {
      if (isSQLite) {
        const poll = async () => {
          if (!active) return;
          try {
            const users = await fetchUsers();
            callback(users);
          } catch (e) {
            if (onError) onError(e);
          }
          if (active) setTimeout(poll, 3000);
        };
        poll();
      } else {
        firestoreReady.then((fb) => {
          if (!fb) return;
          fb.fs.onSnapshot(
            fb.fs.collection(fb.db, USERS_COLLECTION),
            (snap) => {
              const users = [];
              snap.forEach((d) => users.push({ firestoreId: d.id, ...d.data() }));
              callback(users);
            },
            onError
          );
        });
      }
    });
    return () => { active = false; };
  }

  async function deleteUser(id) {
    if (await checkSQLiteServer()) {
      try {
        const res = await fetch(`${getApiBase()}/api/users/${encodeURIComponent(id)}`, { method: 'DELETE' });
        const data = await res.json();
        return Boolean(data.success);
      } catch (e) {
        return false;
      }
    }

    try {
      const fb = await firestoreReady;
      if (!fb) return false;
      const targetStr = String(id);
      const snap = await fb.fs.getDocs(fb.fs.collection(fb.db, USERS_COLLECTION));
      let deleted = false;
      for (const d of snap.docs) {
        const data = d.data();
        if (d.id === targetStr || String(data.id) === targetStr) {
          await fb.fs.deleteDoc(fb.fs.doc(fb.db, USERS_COLLECTION, d.id));
          deleted = true;
        }
      }
      return deleted;
    } catch (e) {
      return false;
    }
  }

  async function checkUserExists(username, email) {
    if (await checkSQLiteServer()) {
      try {
        const res = await fetch(`${getApiBase()}/api/check-user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email }),
        });
        const data = await res.json();
        return data.error || '';
      } catch (e) {
        throw e;
      }
    }

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
      throw e;
    }
  }

  async function findUser(identifier, password) {
    if (await checkSQLiteServer()) {
      try {
        const res = await fetch(`${getApiBase()}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password }),
        });
        if (res.status === 401) return null;
        const data = await res.json();
        if (data.role === 'student' && data.user) return data.user;
        return null;
      } catch (e) {
        throw e;
      }
    }

    try {
      const users = await fetchUsers();
      const idLower = String(identifier || '').trim().toLowerCase();
      return users.find(
        (u) =>
          (String(u.username || '').trim().toLowerCase() === idLower ||
           String(u.email || '').trim().toLowerCase() === idLower) &&
          u.password === password
      ) || null;
    } catch (e) {
      throw e;
    }
  }

  async function flushPending() {
    try {
      const raw = localStorage.getItem('pending_quiz_records');
      if (!raw) return 0;
      const pending = JSON.parse(raw);
      if (!Array.isArray(pending) || !pending.length) {
        localStorage.removeItem('pending_quiz_records');
        return 0;
      }
      let count = 0;
      for (const rec of pending) {
        const res = await saveQuizRecord(rec);
        if (res.saved) count++;
      }
      localStorage.removeItem('pending_quiz_records');
      return count;
    } catch (e) {
      return 0;
    }
  }

  const service = {
    info: {
      get mode() { return useSQLite ? 'SQLite Database (database.sqlite)' : 'Cloud Firestore'; },
      get projectId() { return useSQLite ? 'database.sqlite' : firebaseConfig.projectId; },
      collection: COLLECTION,
      usersCollection: USERS_COLLECTION,
    },
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
    checkSQLiteServer,
  };

  window.FirebaseService = service;
  window.DataService = service;
})();
