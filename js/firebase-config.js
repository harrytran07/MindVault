// =============================================
// 🔥 Import các hàm cần thiết từ SDK Firebase
// =============================================
// initializeApp: dùng để khởi tạo ứng dụng Firebase
// getAuth: dùng để khởi tạo và truy cập dịch vụ Authentication
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";





const firebaseConfig = {
  apiKey: "AIzaSyDU06DJ2JGn0O1zD4iF1dt92X2eQpd5mCc",
  authDomain: "mindvault-2a030.firebaseapp.com",
  projectId: "mindvault-2a030",
  storageBucket: "mindvault-2a030.firebasestorage.app",
  messagingSenderId: "937512855179",
  appId: "1:937512855179:web:2f4a595251c718bf3e568e"
};

// =============================================
// 🚀 Khởi tạo Firebase App
// Đây là bước đầu tiên để kết nối website với dự án Firebase
// =============================================
const app = initializeApp(firebaseConfig);

// =============================================
// 🔑 Khởi tạo dịch vụ Authentication
// Dùng để đăng ký, đăng nhập, đăng xuất người dùng
// =============================================
const auth = getAuth(app);

// =============================================
// 📤 Export ra ngoài để các file khác (login.js, signup.js, v.v.)
// có thể import và sử dụng lại Firebase App và Auth
// =============================================
export { app, auth };