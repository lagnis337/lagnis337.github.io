// Draw the flow diagrams and card covers in when they scroll into view.
// No-op if the user prefers reduced motion.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = [];
  document.querySelectorAll('figure.flow').forEach(function (fig) {
    var i = 0;
    fig.querySelectorAll('svg rect, svg text').forEach(function (el) { el.style.setProperty('--i', i++); });
    fig.querySelectorAll('svg path[marker-end]:not([stroke-dasharray])').forEach(function (p) { p.setAttribute('pathLength', '1'); });
    fig.classList.add('anim');
    targets.push(fig);
  });
  document.querySelectorAll('.card .cover').forEach(function (cover) {
    var i = 0;
    cover.querySelectorAll('svg > *').forEach(function (el) { el.style.setProperty('--i', i++); });
    cover.classList.add('anim');
    targets.push(cover);
  });
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) { targets.forEach(function (t) { t.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.25 });
  targets.forEach(function (t) { io.observe(t); });
})();
