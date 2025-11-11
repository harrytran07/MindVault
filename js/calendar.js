// Import module xác thực (Authentication) từ Firebase
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Đợi toàn bộ nội dung HTML tải xong mới chạy script
document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth();             // Lấy đối tượng xác thực Firebase
  const user = auth.currentUser;      // Người dùng hiện tại (nếu có)
  const uid = user ? user.uid : "guest"; // Nếu chưa đăng nhập thì dùng tên "guest"

  // Trỏ tới phần tử bao ngoài lịch trong HTML
  const cont = document.querySelector(".calendar-container");

  // Lấy ngày hiện tại
  const now = new Date();
  const y = now.getFullYear();        // Năm hiện tại
  const m = now.getMonth();           // Tháng hiện tại (0 = Tháng 1)

  // Tính toán số ngày trong tháng và thứ bắt đầu của ngày 1
  const first = new Date(y, m, 1).getDay();      // Ngày 1 rơi vào thứ mấy
  const days = new Date(y, m + 1, 0).getDate();  // Tổng số ngày trong tháng

  // Lấy dữ liệu sự kiện đã lưu (nếu có) từ localStorage
  const ev = JSON.parse(localStorage.getItem(`events_${uid}`)) || {};

  // Xóa nội dung cũ (nếu có) trước khi render lịch
  cont.innerHTML = "";

  // Tạo ô trống cho các ngày trước khi tháng bắt đầu (để đúng vị trí thứ)
  for (let i = 0; i < first; i++) cont.appendChild(document.createElement("div"));

  // Tạo từng ô ngày trong tháng
  for (let d = 1; d <= days; d++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";

    // Khóa dữ liệu cho từng ngày (ví dụ: "2025-11-11")
    const key = `${y}-${m + 1}-${d}`;

    // Hiển thị số ngày và sự kiện (nếu có)
    cell.innerHTML = `<strong>${d}</strong>${ev[key] ? `<br><small>${ev[key]}</small>` : ""}`;

    // Nếu ngày đó có sự kiện -> tô màu nổi bật
    if (ev[key]) {
      cell.style.background = "var(--primary)";
      cell.style.color = "#fff";
    }

    // Khi người dùng click vào 1 ngày -> thêm / sửa sự kiện
    cell.onclick = () => {
      const val = prompt(`Sự kiện ngày ${d}/${m + 1}/${y}:`, ev[key] || "");
      if (val !== null) {
        ev[key] = val; // Lưu lại sự kiện mới
        localStorage.setItem(`events_${uid}`, JSON.stringify(ev)); // Ghi vào localStorage
        location.reload(); // Tải lại trang để cập nhật giao diện
      }
    };

    // Thêm ô ngày vào lịch
    cont.appendChild(cell);
  }
});
