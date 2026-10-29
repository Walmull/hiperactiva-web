(function () {
  // Apply configurable links from config.js
  var cfg = window.SITE_CONFIG || {};
  var links = { instagram: cfg.instagramUrl, contact: cfg.contactHref };
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var href = links[a.getAttribute('data-link')];
    if (href) a.setAttribute('href', href);
  });

  // Scale the 326x580 Instagram embeds to fill each 9:16 reel card
  var grid = document.getElementById('reels-grid');
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
