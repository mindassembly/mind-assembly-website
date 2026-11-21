(() => {
 const button=document.querySelector('[data-menu-toggle]');
 const nav=document.querySelector('[data-site-nav]');
 if (!button || !nav) return;
 button.addEventListener('click',()=>{
  const open=nav.dataset.open==='true';
  nav.dataset.open=String(!open);
  button.setAttribute('aria-expanded',String(!open));
 });
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.dataset.open='false';button.setAttribute('aria-expanded','false');
 }));
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){nav.dataset.open='false';button.setAttribute('aria-expanded','false');}
 });
})();
