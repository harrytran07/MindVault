// =======================
// 🔹 Import Firebase SDK từ file config
// =======================
import { auth, db } from "./firebase-config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// =======================
// 🔹 Lấy phần tử HTML
// =======================
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const message = document.getElementById("message");

// =======================
// 🔹 Hàm kiểm tra độ mạnh của mật khẩu
// =======================
function isValidPassword(password) {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;

  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (char >= "A" && char <= "Z") hasUpper = true;
    else if (char >= "a" && char <= "z") hasLower = true;
    else if (char >= "0" && char <= "9") hasNumber = true;
  }

  return hasUpper && hasLower && hasNumber;
}

// =======================
// 🔹 Xử lý đăng ký
// =======================
registerBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Kiểm tra email
  if (!email.includes("@")) {
    message.textContent = "Email không hợp lệ!";
    message.style.color = "crimson";
    return;
  }

  // Kiểm tra mật khẩu
  if (!isValidPassword(password)) {
    message.textContent = "Mật khẩu phải có chữ hoa, chữ thường và số!";
    message.style.color = "crimson";
    return;
  }

  try {
    // ✅ Tạo tài khoản
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔹 Gửi email xác thực
    await sendEmailVerification(user);

    // 🔹 Lưu thông tin user vào Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
      verified: false
    });

    message.style.color = "green";
    message.textContent = "Đăng ký thành công 🎉! Kiểm tra email để xác thực tài khoản.";
    console.log("Người dùng mới:", user.email);

  } catch (error) {
    message.style.color = "red";
    message.textContent = "Lỗi: " + error.message;
  }
});
