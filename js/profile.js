import { getAuth, updateProfile, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded",()=>{
  const auth=getAuth();
  const nameEl=document.getElementById("profileName");
  const mailEl=document.getElementById("profileEmail");
  const updateBtn=document.querySelector(".btn-outline");

  onAuthStateChanged(auth,u=>{
    nameEl.textContent=u?.displayName||"Người dùng";
    mailEl.textContent=u?.email||"Chưa đăng nhập";
  });

  updateBtn.onclick=async()=>{
    const u=auth.currentUser;
    if(!u)return alert("Bạn chưa đăng nhập!");
    const newName=prompt("Nhập tên mới:");
    if(!newName)return;
    try{
      await updateProfile(u,{displayName:newName});
      nameEl.textContent=newName;
      alert("Đã cập nhật tên!");
    }catch(e){alert("Lỗi: "+e.message);}
  };
});
