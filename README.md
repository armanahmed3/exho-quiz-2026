# The Times School - Exhibition Quiz 2026

Class-wise 90-second quizzes + teacher/sir appreciation voting, with an Admin Panel.
Results are stored in **Firebase Firestore** (project `exhibitionquiz2026`, collection `quiz_records`).

## Directory

```
school-quiz/
├── index.html                  Landing page            (was intro.html)
├── README.md
│
├── pages/
│   ├── login.html              Student + admin login   (was the modal in index/intro)
│   ├── signup.html             Create account          (was signup.html)
│   ├── quiz.html               Student quiz portal     (was index.html)
│   └── admin/                  ADMIN PANEL (sidebar layout, login required)
│       ├── dashboard.html        key numbers, 4 charts, latest submissions
│       ├── analytics.html        large charts: teachers, sirs, top students, classes, scores, subjects
│       ├── votes.html            ranked teacher / sir voting bars
│       ├── leaderboard.html      ranked student table + filters + CSV export
│       ├── users.html            registered accounts + "Add account" form
│       └── settings.html         Firebase status, offline-queue sync, "Reset quiz data" form
│
└── assets/
    ├── css/app.css             all shared styles
    ├── img/logo.png            school emblem (the one the pages use)
    ├── img/unused/             two extra images that no page referenced - delete if not needed
    └── js/
        ├── firebase.js         ONLY file that talks to Firebase (config + save/fetch/clear)
        ├── config/
        │   ├── tailwind.config.js   theme colours / fonts
        │   └── constants.js         classes, subjects, teachers, sirs, storage keys, admin login
        ├── data/questions.js   question bank (4 classes x 10 subjects)
        ├── core/               shared by every page
        │   ├── utils.js          helpers (HTML-escape, shuffle, safe redirects)
        │   ├── validators.js     ALL form rules in one place
        │   ├── form-kit.js       inline error messages / password show-hide
        │   ├── auth.js           accounts, login, logout, page guards
        │   └── layout.js         shared NAVBAR + FOOTER for public pages
        ├── pages/              home.js, login.js, signup.js, quiz.js
        └── admin/              admin-layout.js (SIDEBAR), admin-data.js, charts.js + one .js per admin page
```

Page ↔ script pairing is by name: `pages/quiz.html` uses `assets/js/pages/quiz.js`,
`pages/admin/users.html` uses `assets/js/admin/users.js`, and so on.

## Run it

Open `index.html` (double-click works) or serve the folder, e.g. `python -m http.server` / VS Code Live Server.
You need internet: Tailwind, Chart.js, Font Awesome and Firebase load from CDNs.

Admin login: `admin` / `admin123` (change in `assets/js/config/constants.js`).

## How the pieces connect

| Want to change...                    | Edit                                  |
|--------------------------------------|---------------------------------------|
| A navbar or footer link              | `assets/js/core/layout.js`            |
| A sidebar item / add an admin page   | `NAV` list in `assets/js/admin/admin-layout.js` |
| Any form rule (length, pattern)      | `assets/js/core/validators.js`        |
| Teachers, sirs, subjects, timer      | `assets/js/config/constants.js`       |
| Questions                            | `assets/js/data/questions.js`         |
| Firebase project / collection        | `assets/js/firebase.js` (top of file) |

New admin page: copy an existing `pages/admin/*.html`, change `data-admin-page`, `data-title`, the content and the script name, then add one line to `NAV`.

## Firebase (unchanged behaviour)

* Same config, same SDK (v13.2.0 from gstatic), same collection `quiz_records`, same document fields:
  `id, name, class, subject, score, votedTeacher, votedSir, timestamp` - old data still loads.
* Only `firebase.js` imports Firebase. Pages call `FirebaseService.saveQuizRecord / fetchQuizRecords / clearQuizRecords`.
* If a save fails (no internet) the result is kept in the browser and uploaded automatically later
  (Admin > Data & Settings > "Sync pending records" does it by hand).

## Form restrictions

| Field                | Rule |
|----------------------|------|
| First / last name    | 2-30 chars, letters (spaces . - ' allowed) |
| Student name (quiz)  | 2-40 chars, letters and spaces |
| Username             | 6-20 chars, letters + numbers only, unique |
| Email                | valid `@gmail.com`, max 60, unique |
| Password (new)       | 8-64 chars, at least 1 letter + 1 number, no spaces |
| Class / subject      | must be one of the listed options |
| Votes                | one teacher + one sir, chosen from the fixed lists |
| Login                | 5 wrong attempts => 30 s lock |
| Reset quiz data      | must type `RESET`, then confirm |

## Known limits (worth fixing before real-world use)

1. **Admin password is in the page source.** Anyone can read `admin123` in DevTools. Move admin login to Firebase Authentication.
2. **Student accounts + passwords live in each browser's localStorage** (plain text), not in Firebase. The admin "Registered Users" list only shows accounts made on that same browser.
3. **Firestore rules decide who can read/delete results.** Because admin login is client-side, the database must currently allow public read/delete for the Admin Panel to work. Tighten the rules once admin uses Firebase Auth.
