/**
 * Authentication + student session management.
 * Connected directly & dynamically to Firebase Firestore ("users" collection).
 * No user accounts are stored in localStorage; all accounts are read and managed in the cloud database.
 */
const Auth = {
  _read(storage, key, fallback) {
    try {
      const v = JSON.parse(storage.getItem(key));
      return v ?? fallback;
    } catch (e) {
      return fallback;
    }
  },

  /**
   * Fetches all registered users dynamically from Firebase Firestore.
   */
  async getUsers() {
    if (!window.FirebaseService) return [];
    try {
      return await FirebaseService.fetchUsers();
    } catch (e) {
      console.error('Auth.getUsers error:', e);
      return [];
    }
  },

  /**
   * Registers a new user directly in Firebase Firestore.
   * Returns '' on success or an error string.
   */
  async addUser({ firstName, lastName, username, email, password }) {
    if (!window.FirebaseService) {
      return 'Firebase database is not connected. Please check your internet connection.';
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check if user already exists in Firestore database
    try {
      const existsError = await FirebaseService.checkUserExists(cleanUsername, cleanEmail);
      if (existsError) return existsError;
    } catch (e) {
      return 'Could not verify username/email with Firebase. Check your internet connection and try again.';
    }

    const newUser = {
      id: Date.now(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: cleanUsername,
      email: cleanEmail,
      password,
      registeredAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
      }),
    };

    // 2. Save directly to Firebase Firestore
    const res = await FirebaseService.saveUser(newUser);
    if (!res.saved) {
      return 'Failed to save account to Firebase database: ' + (res.error ? res.error.message : 'Unknown error');
    }

    return '';
  },

  /**
   * Deletes user directly from Firebase Firestore.
   */
  async deleteUser(id) {
    if (!window.FirebaseService) return false;
    return await FirebaseService.deleteUser(id);
  },

  /**
   * Authenticates user directly against Firebase Firestore database.
   * -> { role: 'admin' } | { role: 'student', user } | null
   */
  async login(identifier, password) {
    const id = identifier.trim().toLowerCase();

    // 1. Check Admin Credentials (instant session check)
    if (id === APP.ADMIN_USERNAME.toLowerCase() && password === APP.ADMIN_PASSWORD) {
      sessionStorage.setItem(APP.KEYS.ADMIN, '1');
      return { role: 'admin' };
    }

    // 2. Check Student Credentials directly in Firebase Firestore
    if (!window.FirebaseService) {
      throw new Error('Firebase Service is not available.');
    }

    const user = await FirebaseService.findUser(id, password);
    if (!user) return null;

    // Save active student session
    const sessionData = JSON.stringify(user);
    sessionStorage.setItem(APP.KEYS.STUDENT, sessionData);
    localStorage.setItem(APP.KEYS.STUDENT, sessionData);

    return { role: 'student', user };
  },

  logout() {
    localStorage.removeItem(APP.KEYS.STUDENT);
    sessionStorage.removeItem(APP.KEYS.STUDENT);
    sessionStorage.removeItem(APP.KEYS.ADMIN);
  },

  currentStudent() {
    return (
      this._read(sessionStorage, APP.KEYS.STUDENT, null) ||
      this._read(localStorage, APP.KEYS.STUDENT, null)
    );
  },

  isAdmin() {
    return sessionStorage.getItem(APP.KEYS.ADMIN) === '1';
  },

  // ---- Page guards ----
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
