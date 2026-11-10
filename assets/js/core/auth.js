/**
 * Authentication + account storage.
 * Synchronized with Firebase Firestore ("users" collection) with localStorage backup.
 *  - Student accounts sync with Firebase Firestore ("users") and cache to localStorage ("registered_users").
 *  - A student session is localStorage "logged_in_user".
 *  - An admin session is sessionStorage "admin_session" (ends when the tab closes).
 */
const Auth = {
  _read(storage, key, fallback) {
    try { const v = JSON.parse(storage.getItem(key)); return v ?? fallback; }
    catch (e) { return fallback; }
  },

  getUsers() { return this._read(localStorage, APP.KEYS.USERS, []); },
  saveUsers(users) { localStorage.setItem(APP.KEYS.USERS, JSON.stringify(users)); },

  /**
   * Syncs registered users from Firebase Firestore into local cache.
   */
  async syncUsers() {
    if (window.FirebaseService) {
      try {
        const remote = await FirebaseService.fetchUsers();
        if (remote && Array.isArray(remote)) {
          const local = this.getUsers();
          const map = new Map();
          local.forEach((u) => map.set(u.username.toLowerCase(), u));
          remote.forEach((u) => {
            const key = u.username.toLowerCase();
            map.set(key, { ...map.get(key), ...u });
          });
          const merged = Array.from(map.values());
          this.saveUsers(merged);
          return merged;
        }
      } catch (e) {
        console.warn('Sync users warning:', e);
      }
    }
    return this.getUsers();
  },

  /**
   * Registers a new user dynamically in Firebase Firestore and local cache.
   * Returns '' on success or an error string.
   */
  async addUser({ firstName, lastName, username, email, password }) {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    // 1. Fast local check first
    const localUsers = this.getUsers();
    if (localUsers.some((u) => u.username.toLowerCase() === cleanUsername.toLowerCase())) {
      return 'Username already taken. Please choose another.';
    }
    if (localUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return 'An account with this email already exists.';
    }

    const newUser = {
      id: Date.now(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: cleanUsername,
      email: cleanEmail,
      password,
      registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
    };

    // 2. Always save locally immediately so registration is guaranteed
    localUsers.push(newUser);
    this.saveUsers(localUsers);

    // 3. Save to Firebase Firestore (non-blocking / fast timeout)
    if (window.FirebaseService) {
      try {
        const fbResult = await FirebaseService.saveUser(newUser);
        if (fbResult && fbResult.id) {
          newUser.firestoreId = fbResult.id;
          this.saveUsers(this.getUsers().map(u => u.id === newUser.id ? newUser : u));
        }
      } catch (e) {
        console.warn('Firebase saveUser caught:', e);
      }
    }

    return '';
  },

  /**
   * Deletes user from Firebase Firestore and local cache.
   */
  async deleteUser(id) {
    if (window.FirebaseService) {
      try { await FirebaseService.deleteUser(id); } catch (e) {}
    }
    const filtered = this.getUsers().filter((u) => String(u.id) !== String(id) && String(u.firestoreId) !== String(id));
    this.saveUsers(filtered);
  },

  /**
   * Authenticates user against local storage and Firebase Firestore.
   * -> { role: 'admin' } | { role: 'student', user } | null
   */
  async login(identifier, password) {
    const id = identifier.trim().toLowerCase();

    // 1. Check Admin (instant)
    if (id === APP.ADMIN_USERNAME.toLowerCase() && password === APP.ADMIN_PASSWORD) {
      sessionStorage.setItem(APP.KEYS.ADMIN, '1');
      return { role: 'admin' };
    }

    // 2. Check Local Cache (instant)
    let users = this.getUsers();
    let user = users.find((u) => (u.username.toLowerCase() === id || u.email.toLowerCase() === id) && u.password === password);

    // 3. If not found locally, try Firebase Firestore lookup
    if (!user && window.FirebaseService) {
      try {
        const remote = await FirebaseService.fetchUsers();
        if (remote && Array.isArray(remote)) {
          this.saveUsers(remote);
          user = remote.find((u) => (u.username.toLowerCase() === id || u.email.toLowerCase() === id) && u.password === password);
        }
      } catch (e) {
        console.warn('Firebase login lookup warning:', e);
      }
    }

    if (!user) return null;
    localStorage.setItem(APP.KEYS.STUDENT, JSON.stringify(user));
    return { role: 'student', user };
  },

  logout() {
    localStorage.removeItem(APP.KEYS.STUDENT);
    sessionStorage.removeItem(APP.KEYS.ADMIN);
  },

  currentStudent() { return this._read(localStorage, APP.KEYS.STUDENT, null); },
  isAdmin() { return sessionStorage.getItem(APP.KEYS.ADMIN) === '1'; },

  // ---- page guards ----
  requireStudent() {
    if (this.currentStudent() || this.isAdmin()) return true;
    const page = location.pathname.split('/').pop();
    location.replace(`login.html?msg=login_required&next=${encodeURIComponent(page)}`);
    return false;
  },
  requireAdmin() {
    if (this.isAdmin()) return true;
    location.replace('../login.html?msg=admin_required');
    return false;
  },
};
