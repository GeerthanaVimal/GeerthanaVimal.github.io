/* =========================================================
   CONNECTED BOOK NAVIGATION
   index.html is the main controller.
   Home/About/Research/Projects/Skills/Contact stay as
   separate HTML files, so each can be edited independently.
   ========================================================= */
const pages = Array.from(document.querySelectorAll('.book-page'));
const navLinks = Array.from(document.querySelectorAll('.navbar a'));
const pageNames = ['HOME','ABOUT','RESEARCH','PROJECTS','SKILLS','CONTACT'];
const counter = document.getElementById('pageCounter');
let currentPage = 0;
let busy = false;

function resetFrameScroll(index) {
  const frame = pages[index]?.querySelector('iframe');
  try { frame?.contentWindow?.scrollTo(0,0); } catch(e) {}
  try { frame?.contentDocument?.querySelector('.page-inner')?.scrollTo(0,0); } catch(e) {}
}

function updateUI() {
  navLinks.forEach((link,i)=>link.classList.toggle('active', i===currentPage));
  counter.textContent = pageNames[currentPage];
}

function goToPage(target) {
  target = Number(target);
  if (!Number.isInteger(target) || target<0 || target>=pages.length || target===currentPage || busy) return;
  busy = true;
  if (target > currentPage) {
    for (let i=currentPage; i<target; i++) pages[i].classList.add('flipped');
  } else {
    for (let i=target; i<currentPage; i++) pages[i].classList.remove('flipped');
  }
  currentPage=target;
  resetFrameScroll(currentPage);
  updateUI();
  setTimeout(()=>busy=false, 1150);
}

function nextPage(){ if(currentPage<pages.length-1) goToPage(currentPage+1); }
function previousPage(){ if(currentPage>0) goToPage(currentPage-1); }

navLinks.forEach((link,i)=>link.addEventListener('click',e=>{e.preventDefault();goToPage(i);}));
document.getElementById('logo').addEventListener('click',e=>{e.preventDefault();goToPage(0);});
document.getElementById('nextBtn').addEventListener('click',nextPage);
document.getElementById('prevBtn').addEventListener('click',previousPage);

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight') nextPage();
  if(e.key==='ArrowLeft') previousPage();
});

let touchX=0,touchY=0;
document.addEventListener('touchstart',e=>{
  touchX=e.changedTouches[0].screenX; touchY=e.changedTouches[0].screenY;
},{passive:true});
document.addEventListener('touchend',e=>{
  const dx=touchX-e.changedTouches[0].screenX;
  const dy=touchY-e.changedTouches[0].screenY;
  if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)) dx>0?nextPage():previousPage();
},{passive:true});

// Allow content-page buttons such as Contact Me / Back Home to control the parent book.
window.addEventListener('message',e=>{
  if(e.data && e.data.type==='book-page') goToPage(e.data.page);
});

pages.forEach((p,i)=>{p.style.zIndex=pages.length-i;});
updateUI();
