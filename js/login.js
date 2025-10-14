const loginEmailEl = document.getElementById('login-email');
const loginPassEl  = document.getElementById('login-password');
const loginBtn     = document.getElementById('btn-login');
const googleBtn    = document.getElementById('btn-google');
const loginStatus  = document.getElementById('login-status');

function showLoginStatus(msg, isError = false) {
  loginStatus.innerText = msg;
  loginStatus.style.color = isError ? 'crimson' : 'green';
}

loginBtn.addEventListener('click', async () => {
  const email = loginEmailEl.value.trim();
  const password = loginPassEl.value;

  // Kiểm tra email
  if (!email.includes('@')) {
    showLoginStatus('Email phải có ký tự "@"', true);
    return;
  }
   try {
    showLoginStatus('Đang đăng nhập...');
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    localStorage.setItem('user-email', user.email);
    showLoginStatus('Đăng nhập thành công!', false);
    setTimeout(()=> window.location.href = 'index.html', 700);
  } catch (err) {
    showLoginStatus(err.message || 'Lỗi đăng nhập', true);
  }
});

googleBtn.addEventListener('click', async () => {
  try {
    showLoginStatus('Mở Google...');
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    localStorage.setItem('user-email', user.email);
    window.location.href = 'index.html';
  } catch (err) {
    showLoginStatus(err.message || 'Lỗi Google login', true);
  }
});