// ─── Custom Cursor ───
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
  setTimeout(() => {
    trail.style.left = mx - 18 + 'px';
    trail.style.top = my - 18 + 'px';
  }, 80);
});
document.addEventListener('mousedown', () => cursor.style.transform = 'scale(2)');
document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1)');

// ─── Page Navigation ───
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const map = {
    'home': 'page-home',
    'satire': 'page-satire',
    'horror': 'page-horror',
    'ophumanity': 'page-ophumanity',
    'contact': 'page-contact',
    'explore-page': 'page-home'
  };
  const target = map[id] || id;
  const el = document.getElementById(target);
  if (el) {
    el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'explore-page') setTimeout(() => scrollToSection('explore'), 400);
  }
  triggerReveal();
}

function showArticle(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-article-' + id);
  if (el) { el.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Scroll Reveal ───
function triggerReveal() {
  setTimeout(() => {
    const reveals = document.querySelectorAll('.page.active .reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    reveals.forEach(r => io.observe(r));
  }, 50);
}

// Initial reveal
window.addEventListener('load', triggerReveal);
window.addEventListener('scroll', () => {
  document.querySelectorAll('.page.active .reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) el.classList.add('visible');
  });
});