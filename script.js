// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('stuck', window.scrollY > 30);
});

// ===== HAMBURGER =====
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(0, 7.5px)' : '';
  spans[1].style.transform = open ? 'rotate(-45deg) translate(0, -7.5px)' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => s.style.transform = '');
  });
});

// ===== TYPEWRITER =====
const phrases = [
  'Full Stack Developer',
  'UI / UX Designer',
  'Videographer',
  'Brand Creator',
  'Photographer',
  'Creative Coder'
];
let pi = 0, ci = 0, del = false;
const tw = document.getElementById('typewriter');
if (tw) {
  (function type() {
    const cur = phrases[pi];
    tw.textContent = del ? cur.slice(0, ci--) : cur.slice(0, ci++);
    let d = del ? 50 : 95;
    if (!del && ci === cur.length + 1) { d = 1800; del = true; }
    else if (del && ci === -1) { del = false; ci = 0; pi = (pi + 1) % phrases.length; d = 350; }
    setTimeout(type, d);
  })();
}

// ===== SCROLL REVEAL =====
const ro = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = (e.target.dataset.index || 0) * 90;
      setTimeout(() => {
        e.target.classList.add('on');
        // animate skill bars inside
        e.target.querySelectorAll('.bar-fill').forEach(b => {
          b.style.width = b.dataset.w + '%';
        });
      }, delay);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ===== PHOTO FALLBACK =====
function imgFallback(imgId, fallbackId) {
  const img = document.getElementById(imgId);
  const fb  = document.getElementById(fallbackId);
  if (!img) return;
  const fail = () => { img.style.display = 'none'; fb.style.display = 'flex'; };
  img.addEventListener('error', fail);
  if (!img.complete || img.naturalWidth === 0) fail();
}
imgFallback('heroPhoto', 'photoFallback');
imgFallback('aboutPhoto', 'aboutFallback');

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const s = document.getElementById('formSuccess');
    s.classList.add('show');
    this.reset();
    setTimeout(() => s.classList.remove('show'), 4000);
  });
}

// ===== DARK / LIGHT MODE =====
const toggle    = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let dark = localStorage.getItem('theme') === 'dark';

function applyTheme() {
  document.body.classList.toggle('dark', dark);
  themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
}
applyTheme();

toggle.addEventListener('click', () => {
  dark = !dark;
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  applyTheme();
});
