const express = require('express');
const path = require('path');
const os = require('os');
const dbHelper = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '12345670';

/* ==================== API ROUTES ==================== */

// Health & Stats
app.get('/api/health', (req, res) => {
  const stats = dbHelper.getStats();
  res.json({
    status: 'ok',
    database: 'sqlite',
    file: 'database.sqlite',
    ...stats,
  });
});

app.get('/api/stats', (req, res) => {
  res.json(dbHelper.getStats());
});

// Users Collection
app.get('/api/users', (req, res) => {
  try {
    const users = dbHelper.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/check-user', (req, res) => {
  try {
    const { username, email } = req.body;
    const error = dbHelper.checkUserExists(username, email);
    res.json({ error });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const checkError = dbHelper.checkUserExists(username, email);
    if (checkError) {
      return res.status(400).json({ error: checkError });
    }
    const newUser = {
      id: Date.now(),
      firestoreId: String(Date.now()),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      registeredAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
      }),
    };
    dbHelper.createUser(newUser);
    res.status(201).json({ saved: true, user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    const deleted = dbHelper.deleteUser(req.params.id);
    res.json({ success: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { identifier, password } = req.body;
    const cleanId = String(identifier || '').trim().toLowerCase();

    // Check admin
    if (cleanId === ADMIN_USERNAME.toLowerCase() && password === ADMIN_PASSWORD) {
      return res.json({ role: 'admin' });
    }

    // Check student in SQLite
    const user = dbHelper.findUser(cleanId, password);
    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or password!' });
    }

    res.json({ role: 'student', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quiz Records Collection
app.get('/api/quiz-records', (req, res) => {
  try {
    const records = dbHelper.getAllQuizRecords();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/quiz-records', (req, res) => {
  try {
    const { name, class: className, subject, score, votedTeacher, votedSir } = req.body;
    if (!name || !className || !subject) {
      return res.status(400).json({ error: 'Missing required quiz fields.' });
    }
    const record = {
      id: req.body.id || Date.now(),
      name: name.trim(),
      class: className,
      subject,
      score: Number(score) || 0,
      votedTeacher: votedTeacher || 'N/A',
      votedSir: votedSir || 'N/A',
      timestamp: req.body.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    dbHelper.createQuizRecord(record);
    res.status(201).json({ saved: true, id: record.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/quiz-records', (req, res) => {
  try {
    const count = dbHelper.clearQuizRecords();
    res.json({ cleared: true, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback route for SPA / root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Helper to get local network IP
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  console.log('====================================================');
  console.log('  EXHO QUIZ 2026 - SQLite Server Running!');
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Network: http://${localIp}:${PORT}`);
  console.log('  Database: database.sqlite (SQLite)');
  console.log('====================================================');
});

