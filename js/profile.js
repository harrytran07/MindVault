// Import các hàm cần thiết từ Firebase Authentication
// Import required Firebase Authentication functions
import { getAuth, updateProfile, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Đợi toàn bộ nội dung trang HTML tải xong trước khi chạy code
// Wait until the DOM is fully loaded before running code
document.addEventListener("DOMContentLoaded", () => {

  const auth = getAuth(); // Lấy đối tượng xác thực Firebase (Firebase Auth instance)
  const nameEl = document.getElementById("profileName");  // Thẻ hiển thị tên người dùng
  const mailEl = document.getElementById("profileEmail"); // Thẻ hiển thị email người dùng
  const updateBtn = document.querySelector(".btn-outline"); // Nút "Cập nhật tên"

  // ----------- THEO DÕI TRẠNG THÁI ĐĂNG NHẬP -----------
  // Listen to user authentication state changes
  onAuthStateChanged(auth, u => {
    // Nếu người dùng đã đăng nhập, hiển thị tên và email
    // If user is logged in, show name and email
    nameEl.textContent = u?.displayName || "Người dùng";
    mailEl.textContent = u?.email || "Chưa đăng nhập";
  });

  // ----------- SỰ KIỆN: CẬP NHẬT TÊN NGƯỜI DÙNG -----------
  // Event: Update user display name
  updateBtn.onclick = async () => {
    const u = auth.currentUser; // Lấy người dùng hiện tại (current Firebase user)
    if (!u) return alert("Bạn chưa đăng nhập!"); // Nếu chưa đăng nhập thì báo lỗi

    const newName = prompt("Nhập tên mới:"); // Hộp thoại nhập tên mới
    if (!newName) return; // Nếu bỏ trống thì thoát ra

    try {
      // Gọi hàm updateProfile để cập nhật tên hiển thị của người dùng
      // Use updateProfile() to update the user's display name in Firebase
      await updateProfile(u, { displayName: newName });

      // Cập nhật lại tên trên giao diện
      // Update displayed name in the profile section
      nameEl.textContent = newName;

      alert("Đã cập nhật tên!"); // Thông báo thành công
    } catch (e) {
      // Nếu có lỗi (ví dụ mất kết nối hoặc token hết hạn)
      // If an error occurs (e.g., network or permission issues)
      alert("Lỗi: " + e.message);
    }
  };
});
