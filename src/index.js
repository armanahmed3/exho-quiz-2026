// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxxh42rAgH-3R3jd_0I6-83uh0wvtFdXI",
  authDomain: "exhibitionquiz2026.firebaseapp.com",
  projectId: "exhibitionquiz2026",
  storageBucket: "exhibitionquiz2026.firebasestorage.app",
  messagingSenderId: "236244214437",
  appId: "1:236244214437:web:9ddff766c668efa1da234c",
  measurementId: "G-66GYHXMSE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);