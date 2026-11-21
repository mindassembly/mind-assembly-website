(() => {
 const cards = [...document.querySelectorAll('[data-article-card]')];
 if (!cards.length) return;
 const search = document.querySelector('#catalog-query');
 const clear = document.querySelector('#catalog-clear');
 const count = document.querySelector('#result-count');
 const empty = document.querySelector('#catalog-empty');
 const filters = [...document.querySelectorAll('[data-subject-filter]')];
 const tabs = [...document.querySelectorAll('[data-section-filter]')];
 let subject = 'All subjects';
 let section = 'all';
 function update() {
  const query = (search?.value || '').trim().toLocaleLowerCase();
  let visible = 0;
  for (const card of cards) {
   const subjectMatch = subject === 'All subjects' || card.dataset.category === subject;
   const sectionMatch = section === 'all' || card.dataset.section === section;
   const queryMatch = !query || (card.dataset.search || '').toLocaleLowerCase().includes(query);
   const show = subjectMatch && sectionMatch && queryMatch;
   card.hidden = !show;
   if (show) visible++;
  }
  if (count) count.textContent = `${visible} ${visible===1?'reading':'readings'} shown`;
  if (empty) empty.hidden = visible !== 0;
  if (clear) clear.hidden = !query;
  filters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.subjectFilter === subject)));
  tabs.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sectionFilter === section)));
 }
 filters.forEach(b=>b.addEventListener('click',()=>{subject=b.dataset.subjectFilter; update();}));
 tabs.forEach(b=>b.addEventListener('click',()=>{section=b.dataset.sectionFilter; update();}));
 search?.addEventListener('input',update);
 clear?.addEventListener('click',()=>{search.value='';search.focus();update();});
 document.querySelectorAll('[data-mode-jump]').forEach(a=>a.addEventListener('click',()=>{section=a.dataset.modeJump;update();}));
 update();
})();
