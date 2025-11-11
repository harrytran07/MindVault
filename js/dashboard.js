// Import module xác thực từ Firebase
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth(); // Lấy đối tượng xác thực

  // ----------- Hiển thị ngày hôm nay -----------
  const todayEl = document.getElementById("today");
  const d = new Date();

  // Mảng tên thứ trong tiếng Việt
  const dayNames = [
    "Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"
  ];

  // Gán nội dung cho phần tử hiển thị ngày
  todayEl.textContent = `${dayNames[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  // ----------- Hiển thị tên người dùng -----------
  // Theo dõi trạng thái đăng nhập Firebase (tự cập nhật khi user login/logout)
  onAuthStateChanged(auth, user => {
    document.getElementById("userName").textContent =
      user ? user.displayName || user.email : "Khách"; // Nếu chưa đăng nhập -> "Khách"
  });

  // ----------- Hiển thị thống kê nhanh -----------
  // Dữ liệu mẫu: có thể thay bằng dữ liệu thật từ Firestore trong tương lai
  const stats = { tasks: 2, notes: 4, reminders: 1 };

  // Lấy 3 thẻ <p> trong các card để gán nội dung
  const ps = document.querySelectorAll(".card p");
  if (ps.length >= 3) {
    ps[0].textContent = `${stats.tasks} nhiệm vụ`;
    ps[1].textContent = `${stats.notes} ghi chú`;
    ps[2].textContent = `${stats.reminders} nhắc việc`;
  }
});
