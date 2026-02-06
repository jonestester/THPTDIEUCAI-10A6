window.addEventListener('load', () => {

  const inner = document.querySelector('.nav-inner');
  const indicator = inner?.querySelector('.nav-indicator');
  if (!inner || !indicator) return;

  const links = [...inner.querySelectorAll('a[data-key]')];

  function moveTo(el){
    const span = el.querySelector('span');
    const r = span.getBoundingClientRect();
    const p = inner.getBoundingClientRect();

    indicator.style.width = r.width + 'px';
    indicator.style.left  = (r.left - p.left) + 'px';
  }

  const parts = location.pathname.split('/').filter(Boolean);

  // nếu là page con lấy folder
  // nếu là page cha  lấy filename
  const key = parts.length > 1
    ? parts[0]
    : parts[0]?.replace('.html','');

  const active =
    links.find(a => a.dataset.key === key)
    || links[0];

  requestAnimationFrame(()=> moveTo(active));

  links.forEach(a=>{
    a.addEventListener('mouseenter', ()=> moveTo(a));
  });

  inner.addEventListener('mouseleave', ()=> moveTo(active));

});
