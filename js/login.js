// =======================
// 🔹 Import Firebase SDK từ file config
// =======================
import { auth, db } from "./firebase-config";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// =======================
// 🔹 Lấy phần tử HTML
// =======================
const loginEmailEl = document.getElementById("login-email");
const loginPassEl  = document.getElementById("login-password");
const loginBtn     = document.getElementById("btn-login");
const googleBtn    = document.getElementById("btn-google");
const loginStatus  = document.getElementById("login-status");

// =======================
// 🔹 Hàm hiển thị trạng thái
// =======================
function showLoginStatus(msg, isError = false) {
  loginStatus.innerText = msg;
  loginStatus.style.color = isError ? "crimson" : "green";
}

// =======================
// 🔹 Đăng nhập bằng email + password
// =======================
loginBtn.addEventListener("click", async () => {
  const email = loginEmailEl.value.trim();
  const password = loginPassEl.value;

  if (!email.includes("@")) {
    showLoginStatus('Email phải có ký tự "@"', true);
    return;
  }

  try {
    showLoginStatus("Đang đăng nhập...");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔹 Kiểm tra xác thực email
    if (!user.emailVerified) {
      showLoginStatus("Vui lòng xác thực email trước khi đăng nhập.", true);
      await signOut(auth);
      return;
    }

    // ✅ Đăng nhập thành công
    localStorage.setItem("user-email", user.email);
    showLoginStatus("Đăng nhập thành công!", false);

    // 🔹 Lưu log đăng nhập
    await setDoc(doc(db, "userLogins", user.uid), {
      lastLogin: new Date().toISOString(),
      email: user.email
    });

    // Chuyển hướng
    setTimeout(() => window.location.href = "index.html", 800);

  } catch (err) {
    showLoginStatus(err.message || "Lỗi đăng nhập", true);
  }
});

// =======================
// 🔹 Đăng nhập bằng Google
// =======================
googleBtn.addEventListener("click", async () => {
  try {
    showLoginStatus("Đang mở đăng nhập Google...");
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("user-email", user.email);
    showLoginStatus("Đăng nhập bằng Google thành công!", false);

    window.location.href = "index.html";
  } catch (err) {
    showLoginStatus(err.message || "Lỗi đăng nhập Google", true);
  }
});
