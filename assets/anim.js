// Draw the flow diagrams in when they scroll into view. No-op if the user prefers reduced motion.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var figs = document.querySelectorAll('figure.flow');
  figs.forEach(function (fig) {
    var i = 0;
    fig.querySelectorAll('svg rect, svg text').forEach(function (el) { el.style.setProperty('--i', i++); });
    fig.querySelectorAll('svg path[marker-end]:not([stroke-dasharray])').forEach(function (p) { p.setAttribute('pathLength', '1'); });
    fig.classList.add('anim');
  });
  if (!('IntersectionObserver' in window)) { figs.forEach(function (f) { f.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.35 });
  figs.forEach(function (f) { io.observe(f); });
})();
