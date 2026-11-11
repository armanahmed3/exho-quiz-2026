const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new DatabaseSync(dbPath);

// Enable WAL mode
db.exec('PRAGMA journal_mode = WAL;');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    firestoreId TEXT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL COLLATE NOCASE,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password TEXT NOT NULL,
    registeredAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS quiz_records (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    class TEXT NOT NULL,
    subject TEXT NOT NULL,
    score INTEGER NOT NULL,
    votedTeacher TEXT,
    votedSir TEXT,
    timestamp TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = {
  db,

  // Users
  getAllUsers() {
    return db.prepare('SELECT * FROM users ORDER BY id DESC').all();
  },

  getUserById(id) {
    return db.prepare('SELECT * FROM users WHERE id = ? OR firestoreId = ?').get(Number(id) || 0, String(id));
  },

  checkUserExists(username, email) {
    const u = db.prepare('SELECT id FROM users WHERE LOWER(username) = LOWER(?)').get(username);
    if (u) return 'Username is already taken in the database. Please choose another.';
    const e = db.prepare('SELECT id FROM users WHERE LOWER(email) = LOWER(?)').get(email);
    if (e) return 'An account with this email is already registered in the database.';
    return '';
  },

  createUser({ id, firestoreId, firstName, lastName, username, email, password, registeredAt }) {
    const stmt = db.prepare(`
      INSERT INTO users (id, firestoreId, firstName, lastName, username, email, password, registeredAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const recordId = id || Date.now();
    stmt.run(recordId, firestoreId || String(recordId), firstName, lastName, username, email, password, registeredAt);
    return { id: recordId, firestoreId: String(recordId) };
  },

  deleteUser(id) {
    const res = db.prepare('DELETE FROM users WHERE id = ? OR firestoreId = ?').run(Number(id) || 0, String(id));
    return res.changes > 0;
  },

  findUser(identifier, password) {
    return db.prepare(`
      SELECT * FROM users
      WHERE (LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?))
        AND password = ?
    `).get(identifier, identifier, password);
  },

  // Quiz records
  getAllQuizRecords() {
    return db.prepare('SELECT * FROM quiz_records ORDER BY id DESC').all();
  },

  createQuizRecord({ id, name, class: className, subject, score, votedTeacher, votedSir, timestamp }) {
    const stmt = db.prepare(`
      INSERT INTO quiz_records (id, name, class, subject, score, votedTeacher, votedSir, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const recordId = id || Date.now();
    stmt.run(recordId, name, className, subject, score, votedTeacher || 'N/A', votedSir || 'N/A', timestamp);
    return { id: recordId };
  },

  clearQuizRecords() {
    const res = db.prepare('DELETE FROM quiz_records').run();
    return res.changes;
  },

  getStats() {
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const totalRecords = db.prepare('SELECT COUNT(*) as count FROM quiz_records').get().count;
    const avgRow = db.prepare('SELECT AVG(score) as avg FROM quiz_records').get();
    const avgScore = avgRow && avgRow.avg ? Number(avgRow.avg.toFixed(1)) : 0;
    const topStudents = db.prepare('SELECT COUNT(*) as count FROM quiz_records WHERE score >= 8').get().count;
    return {
      totalUsers,
      totalRecords,
      avgScore,
      topStudents,
    };
  },
};
