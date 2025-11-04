import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded",()=>{
  const auth=getAuth();
  const user=auth.currentUser;
  const uid=user?user.uid:"guest";

  const cont=document.querySelector(".calendar-container");
  const now=new Date(), y=now.getFullYear(), m=now.getMonth();
  const first=new Date(y,m,1).getDay();
  const days=new Date(y,m+1,0).getDate();
  const ev=JSON.parse(localStorage.getItem(`events_${uid}`))||{};

  cont.innerHTML="";
  for(let i=0;i<first;i++) cont.appendChild(document.createElement("div"));
  for(let d=1;d<=days;d++){
    const cell=document.createElement("div");
    cell.className="calendar-day";
    const key=`${y}-${m+1}-${d}`;
    cell.innerHTML=`<strong>${d}</strong>${ev[key]?`<br><small>${ev[key]}</small>`:""}`;
    if(ev[key]){cell.style.background="var(--primary)";cell.style.color="#fff";}
    cell.onclick=()=>{
      const val=prompt(`Sự kiện ngày ${d}/${m+1}/${y}:`,ev[key]||"");
      if(val!==null){ev[key]=val;localStorage.setItem(`events_${uid}`,JSON.stringify(ev));location.reload();}
    };
    cont.appendChild(cell);
  }
});
