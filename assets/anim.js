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

// Floating back-to-top button (runs regardless of motion preference).
(function () {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'totop';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
  btn.addEventListener('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  document.body.appendChild(btn);
  var toggle = function (show) { btn.classList.toggle('in', show); };
  var top = document.querySelector('h1');
  if (top && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { toggle(!e[0].isIntersecting); }, { threshold: 0 }).observe(top);
  }
  window.addEventListener('scroll', function () { toggle(window.scrollY > 500); }, { passive: true });
})();
