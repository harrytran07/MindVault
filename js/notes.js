// Import module xác thực người dùng (Authentication) từ Firebase
// Import Firebase Authentication module
import { getAuth, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Đợi toàn bộ nội dung HTML tải xong mới thực thi script
// Wait for the DOM to fully load before running code
document.addEventListener("DOMContentLoaded", () => {

  const auth = getAuth();                      // Lấy đối tượng xác thực Firebase (Firebase Auth instance)
  const list = document.querySelector(".notes-list"); // Vùng hiển thị danh sách ghi chú (notes list container)
  const addBtn = document.getElementById("addNoteBtn"); // Nút thêm ghi chú mới (Add Note button)
  let uid = "guest";                           // Mặc định khi chưa đăng nhập (default user id)

  // Khi trạng thái đăng nhập thay đổi -> cập nhật UID và tải ghi chú
  // When user authentication state changes -> update UID and load notes
  onAuthStateChanged(auth, u => {
    uid = u ? u.uid : "guest";
    load(); // Gọi hàm load() để hiển thị danh sách ghi chú
  });

  // ----------- HÀM LOAD: Lấy dữ liệu từ Local Storage -----------
  // Load user's notes from localStorage
  function load() {
    const arr = JSON.parse(localStorage.getItem(`notes_${uid}`)) || [];
    render(arr); // Gọi hàm render() để hiển thị ra giao diện
  }

  // ----------- HÀM RENDER: Hiển thị danh sách ghi chú -----------
  // Render the note list on screen
  function render(arr) {
    list.innerHTML = ""; // Xóa nội dung cũ

    // Nếu không có ghi chú nào, hiển thị dòng thông báo
    // If no notes exist, show a message
    if (arr.length === 0) {
      list.innerHTML = "<p>Chưa có ghi chú nào ✨</p>";
      return;
    }

    // Duyệt qua từng ghi chú và tạo phần tử HTML tương ứng
    // Loop through notes and create HTML cards
    arr.forEach((n, i) => {
      list.insertAdjacentHTML("beforeend",
        `<div class="note-card">
          <h3>${n.title}</h3>
          <p>${n.content}</p>
          <button class="btn-outline delete-btn" data-i="${i}">Xoá</button>
        </div>`
      );
    });
  }

  // ----------- SỰ KIỆN: Thêm ghi chú mới -----------
  // Event: Add new note
  addBtn.onclick = () => {
    const t = prompt("Tiêu đề:");   // Nhập tiêu đề ghi chú
    const c = prompt("Nội dung:");  // Nhập nội dung ghi chú
    if (!t || !c) return;           // Nếu để trống thì không thêm

    const arr = JSON.parse(localStorage.getItem(`notes_${uid}`)) || [];
    arr.push({ title: t, content: c }); // Thêm ghi chú mới vào mảng
    localStorage.setItem(`notes_${uid}`, JSON.stringify(arr)); // Lưu lại vào localStorage
    load(); // Gọi lại load() để cập nhật giao diện
  };

  // ----------- SỰ KIỆN: Xóa ghi chú -----------
  // Event: Delete note
  list.onclick = e => {
    if (e.target.classList.contains("delete-btn")) {
      const i = e.target.dataset.i; // Lấy chỉ số (index) của ghi chú cần xóa
      const arr = JSON.parse(localStorage.getItem(`notes_${uid}`)) || [];
      arr.splice(i, 1); // Xóa phần tử khỏi mảng
      localStorage.setItem(`notes_${uid}`, JSON.stringify(arr)); // Lưu lại dữ liệu mới
      load(); // Cập nhật lại danh sách ghi chú
    }
  };
});
