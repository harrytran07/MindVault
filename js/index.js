// ===========================
// 🧠 MindVault - Trang chủ
// ===========================
import { getAuth, onAuthStateChanged, signOut } 
  from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const auth = getAuth();
const navLinks = document.getElementById("nav-links");

// 🔍 Lắng nghe trạng thái người dùng
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ Nếu đã đăng nhập
    renderLoggedInMenu();
  } else {
    // ❌ Nếu chưa đăng nhập
    renderGuestMenu();
  }
});

// ---------------------------
// 🔹 Hàm hiển thị menu cho khách
// ---------------------------
function renderGuestMenu() {
  navLinks.innerHTML = `
    <a href="login.html" class="btn">Đăng nhập</a>
    <a href="signup.html" class="btn btn-outline">Đăng ký</a>
  `;
}

// ---------------------------
// 🔹 Hàm hiển thị menu sau đăng nhập
// ---------------------------
function renderLoggedInMenu() {
  navLinks.innerHTML = `
    <a href="dashboard.html" class="btn">Dashboard</a>
    <a href="notes.html" class="btn">Notes</a>
    <a href="calendar.html" class="btn">Calendar</a>
    <a href="profile.html" class="btn">Profile</a>
    <a href="#" id="logout-btn" class="btn btn-outline">Đăng xuất</a>
  `;

  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.reload();
  });
}
