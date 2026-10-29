(function () {
  // Apply configurable links from config.js
  var cfg = window.SITE_CONFIG || {};
  var links = { instagram: cfg.instagramUrl, contact: cfg.contactHref };
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var href = links[a.getAttribute('data-link')];
    if (href) a.setAttribute('href', href);
  });

  // Mobile menu overlay (< 1024px): locks body scroll while open; any link closes it
  var menu = document.querySelector('[data-r="menu"]');
  function setMenu(open) {
    if (!menu) return;
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  document.querySelectorAll('[data-open-menu]').forEach(function (b) {
    b.addEventListener('click', function () { setMenu(true); });
  });
  document.querySelectorAll('[data-close-menu]').forEach(function (b) {
    b.addEventListener('click', function () { setMenu(false); });
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && menu && !menu.hidden) setMenu(false);
  });

  // Carousels (reels + team, mobile only): arrows scroll one card, dim at the edges
  var carousels = { reels: document.getElementById('reels-grid'), team: document.getElementById('team-grid') };
  function updateEdges() {
    Object.keys(carousels).forEach(function (name) {
      var el = carousels[name];
      if (!el) return;
      // scroll-snap rests the first card at the 20px side padding, so "start" is that offset, not 0
      var card = el.firstElementChild;
      var startOffset = card ? card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft : 0;
      var atStart = el.scrollLeft <= startOffset + 2;
      var atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      document.querySelectorAll('[data-carousel="' + name + '"]').forEach(function (b) {
        b.style.opacity = (b.getAttribute('data-dir') === '-1' ? atStart : atEnd) ? 0.35 : 1;
      });
    });
  }
  document.querySelectorAll('[data-carousel]').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = carousels[b.getAttribute('data-carousel')];
      if (!el) return;
      var card = el.firstElementChild;
      var step = card ? card.getBoundingClientRect().width + 12 : el.clientWidth * 0.8;
      el.scrollBy({ left: Number(b.getAttribute('data-dir')) * step, behavior: 'smooth' });
    });
  });
  Object.keys(carousels).forEach(function (name) {
    if (carousels[name]) carousels[name].addEventListener('scroll', updateEdges, { passive: true });
  });
  window.addEventListener('resize', updateEdges);
  setTimeout(updateEdges, 300);

  // Scale the 326x580 Instagram embeds to fill each 9:16 reel card
  var grid = carousels.reels;
  if (!grid) return;
  var current = 0.58;
  function measure() {
    var card = grid.firstElementChild;
    if (!card) return;
    var w = card.getBoundingClientRect().width;
    if (!w) return;
    var s = Math.round((w / 326) * 1000) / 1000;
    if (Math.abs(s - current) > 0.002) {
      current = s;
      grid.style.setProperty('--reel-scale', s);
    }
  }
  measure();
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(grid);
  window.addEventListener('resize', measure);
})();
