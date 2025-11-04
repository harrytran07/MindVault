import { getAuth, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded",()=>{
  const auth=getAuth();
  const list=document.querySelector(".notes-list");
  const addBtn=document.getElementById("addNoteBtn");
  let uid="guest";

  onAuthStateChanged(auth,u=>{uid=u?u.uid:"guest";load();});

  function load(){
    const arr=JSON.parse(localStorage.getItem(`notes_${uid}`))||[];
    render(arr);
  }
  function render(arr){
    list.innerHTML="";
    if(arr.length===0){list.innerHTML="<p>Chưa có ghi chú nào ✨</p>";return;}
    arr.forEach((n,i)=>{
      list.insertAdjacentHTML("beforeend",
        `<div class="note-card">
          <h3>${n.title}</h3><p>${n.content}</p>
          <button class="btn-outline delete-btn" data-i="${i}">Xoá</button>
        </div>`);
    });
  }
  addBtn.onclick=()=>{
    const t=prompt("Tiêu đề:"), c=prompt("Nội dung:");
    if(!t||!c) return;
    const arr=JSON.parse(localStorage.getItem(`notes_${uid}`))||[];
    arr.push({title:t,content:c});
    localStorage.setItem(`notes_${uid}`,JSON.stringify(arr));load();
  };
  list.onclick=e=>{
    if(e.target.classList.contains("delete-btn")){
      const i=e.target.dataset.i;
      const arr=JSON.parse(localStorage.getItem(`notes_${uid}`))||[];
      arr.splice(i,1);
      localStorage.setItem(`notes_${uid}`,JSON.stringify(arr));load();
    }
  };
});
