import { getAuth, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth();

  const todayEl = document.getElementById("today");
  const d = new Date();
  const day = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"][d.getDay()];
  todayEl.textContent = `${day}, ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

  onAuthStateChanged(auth, user => {
    document.getElementById("userName").textContent =
      user ? user.displayName || user.email : "Khách";
  });

  const stats = {tasks:2, notes:4, reminders:1};
  const ps = document.querySelectorAll(".card p");
  if(ps.length>=3){
    ps[0].textContent=`${stats.tasks} nhiệm vụ`;
    ps[1].textContent=`${stats.notes} ghi chú`;
    ps[2].textContent=`${stats.reminders} nhắc việc`;
  }
});
