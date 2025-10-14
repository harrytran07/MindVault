const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const message = document.getElementById("message");

function isValidPassword(password) {
 for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (char >= "A" && char <= "Z") hasUpper = true;
    else if (char >= "a" && char <= "z") hasLower = true;
    else if (char >= "0" && char <= "9") hasNumber = true;
  }

  return hasUpper && hasLower && hasNumber;
}

// Bắt sự kiện click nút đăng ký
registerBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Kiểm tra email
  if (!email.includes("@")) {
    message.textContent = "Email không hợp lệ!";
    return;
  }

  // Kiểm tra password
  if (!isValidPassword(password)) {
    message.textContent =
      "Mật khẩu phải có chữ hoa, chữ thường và số!";
    return;
  }

  // Firebase đăng ký
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      message.style.color = "green";
      message.textContent = "Đăng ký thành công! 🎉";
      console.log("Người dùng:", user.email);
    })
    .catch((error) => {
      message.style.color = "red";
      message.textContent = "Lỗi: " + error.message;
    });
});