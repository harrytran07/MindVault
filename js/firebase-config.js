import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDU06DJ2JGn0O1zD4iF1dt92X2eQpd5mCc",
  authDomain: "mindvault-2a030.firebaseapp.com",
  projectId: "mindvault-2a030",
  storageBucket: "mindvault-2a030.firebasestorage.app",
  messagingSenderId: "937512855179",
  appId: "1:937512855179:web:2f4a595251c718bf3e568e"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);


// Khởi tạo dịch vụ Auth để dùng trong login.js / signup.js
export default app;