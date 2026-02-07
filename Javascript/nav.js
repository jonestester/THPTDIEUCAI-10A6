window.addEventListener('load', () => {

  const inner = document.querySelector('.nav-inner');
  const indicator = inner?.querySelector('.nav-indicator');
  if (!inner || !indicator) return;

  const links = [...inner.querySelectorAll('a[data-key]')];

  function moveTo(el) {
    const span = el.querySelector('span');
    if (!span) return;

    const r = span.getBoundingClientRect();
    const p = inner.getBoundingClientRect();

    indicator.style.width = r.width + 'px';
    indicator.style.left  = (r.left - p.left) + 'px';
  }

  /* ===== phân tích path ===== */
  const parts = location.pathname.split('/').filter(Boolean);

  let key;

  if (parts.length >= 2) {
    // có folder → dùng folder làm key (menu cha)
    key = parts[parts.length - 2];
  } else {
    // không có folder → dùng tên file
    key = (parts[0] || "gioithieu.html").replace('.html','');
  }

  const active =
    links.find(a => a.dataset.key === key)
    || links[0];

  requestAnimationFrame(() => moveTo(active));

  links.forEach(a => {
    a.addEventListener('mouseenter', () => moveTo(a));
  });

  inner.addEventListener('mouseleave', () => moveTo(active));

});

