const https = require('https');
const dbHelper = require('./db');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function seed() {
  console.log('Seeding SQLite database...');
  const API_KEY = 'AIzaSyAxxh42rAgH-3R3jd_0I6-83uh0wvtFdXI';
  const BASE_URL = 'https://firestore.googleapis.com/v1/projects/exhibitionquiz2026/databases/(default)/documents';

  // 1. Fetch Users
  try {
    const usersData = await fetchJson(`${BASE_URL}/users?key=${API_KEY}`);
    if (usersData && usersData.documents) {
      console.log(`Found ${usersData.documents.length} users in Firestore. Importing to SQLite...`);
      for (const doc of usersData.documents) {
        const f = doc.fields || {};
        const firestoreId = doc.name.split('/').pop();
        const username = f.username?.stringValue || '';
        const email = f.email?.stringValue || '';
        if (username) {
          const exists = dbHelper.checkUserExists(username, email);
          if (!exists) {
            dbHelper.createUser({
              id: Number(f.id?.integerValue) || Date.now(),
              firestoreId,
              firstName: f.firstName?.stringValue || 'User',
              lastName: f.lastName?.stringValue || '',
              username,
              email: email || `${username}@gmail.com`,
              password: f.password?.stringValue || '12345678',
              registeredAt: f.registeredAt?.stringValue || new Date().toLocaleDateString(),
            });
            console.log(`+ Imported user: @${username}`);
          }
        }
      }
    }
  } catch (err) {
    console.warn('Could not fetch Firestore users (offline or timeout):', err.message);
  }

  // 2. Fetch Quiz Records
  try {
    const recordsData = await fetchJson(`${BASE_URL}/quiz_records?key=${API_KEY}`);
    if (recordsData && recordsData.documents) {
      console.log(`Found ${recordsData.documents.length} quiz records in Firestore. Importing to SQLite...`);
      for (const doc of recordsData.documents) {
        const f = doc.fields || {};
        const id = Number(f.id?.integerValue) || Date.now();
        const existing = dbHelper.db.prepare('SELECT id FROM quiz_records WHERE id = ?').get(id);
        if (!existing) {
          dbHelper.createQuizRecord({
            id,
            name: f.name?.stringValue || 'Student',
            class: f.class?.stringValue || 'Class 8',
            subject: f.subject?.stringValue || 'computer',
            score: Number(f.score?.integerValue) || 0,
            votedTeacher: f.votedTeacher?.stringValue || 'N/A',
            votedSir: f.votedSir?.stringValue || 'N/A',
            timestamp: f.timestamp?.stringValue || '12:00 PM',
          });
        }
      }
    }
  } catch (err) {
    console.warn('Could not fetch Firestore quiz records:', err.message);
  }

  // Fallback defaults if empty
  const users = dbHelper.getAllUsers();
  if (users.length === 0) {
    console.log('Adding default test accounts...');
    dbHelper.createUser({
      id: Date.now(),
      firestoreId: 'default1',
      firstName: 'Arman',
      lastName: 'Ahmed',
      username: 'flexfitfury',
      email: 'flexfitfury9@gmail.com',
      password: 'admin123',
      registeredAt: 'Nov 11, 2026',
    });
  }

  const stats = dbHelper.getStats();
  console.log('SQLite Database Stats:', stats);
  console.log('Seeding completed successfully!');
}

seed();
