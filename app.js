/* ================================
   SCROLL PROGRESS
================================ */
const progressBar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ================================
   INTRO SCREEN
================================ */
function enterSite() {
  const intro = document.getElementById('intro');
  intro.classList.add('leaving');
  setTimeout(() => {
    intro.style.display = 'none';
    document.body.style.overflow = '';
  }, 950);
  // Trigger hero elements
  setTimeout(() => {
    document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-name, .hero-hearts')
      .forEach(el => el.classList.add('vis'));
  }, 200);
}

// Prevent body scroll while intro is up
document.body.style.overflow = 'hidden';

// Floating petals in intro
(function spawnIntroPetals() {
  const container = document.querySelector('.intro-petals');
  if (!container) return;
  const emojis = ['🌸', '🌷', '🤍', '✨'];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    el.className = 'intro-petal';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (8 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 8) + 's';
    el.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
    container.appendChild(el);
  }
})();

/* ================================
   INTERSECTION OBSERVER
================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Observe all animated elements
const toObserve = [
  '.hero-eyebrow', '.hero-title', '.hero-name', '.hero-hearts',
  '.counter-label-top', '.c-card',
  '.photo-card',
  '.letter-card', '.letter-p', '.letter-photo', '.letter-sig',
  '.interactive-title', '.interactive-sub', '#heart-field',
];
toObserve.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => observer.observe(el));
});

/* ================================
   LIVE COUNTER
================================ */
const startDate = new Date('2025-11-04T20:04:00');

function formatNum(n) {
  return n.toLocaleString('pt-BR');
}

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;
  const totalSec  = Math.floor(diff / 1000);
  const totalMin  = Math.floor(totalSec / 60);
  const totalHrs  = Math.floor(totalMin / 60);
  const totalDays = Math.floor(totalHrs / 24);

  let months = (now.getFullYear() - startDate.getFullYear()) * 12
             + (now.getMonth() - startDate.getMonth());
  if (now.getDate() < startDate.getDate()) months--;

  const secEl = document.getElementById('c-sec');
  const prevVal = secEl.dataset.val || '0';
  const newVal  = String(totalSec);

  if (prevVal !== newVal) {
    secEl.classList.remove('tick');
    void secEl.offsetWidth; // reflow
    secEl.classList.add('tick');
    setTimeout(() => secEl.classList.remove('tick'), 200);
    secEl.dataset.val = newVal;
  }

  document.getElementById('c-months').textContent = months;
  document.getElementById('c-days').textContent   = formatNum(totalDays);
  document.getElementById('c-hrs').textContent    = formatNum(totalHrs);
  document.getElementById('c-min').textContent    = formatNum(totalMin);
  secEl.textContent = formatNum(totalSec);
}

updateCounter();
setInterval(updateCounter, 1000);

/* ================================
   LIGHTBOX
================================ */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lb-img');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.id === 'lb-close') closeLightbox();
});

// Expose to HTML
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;

/* ================================
   INTERACTIVE: HEART FIELD
================================ */
const heartField = document.getElementById('heart-field');
const fieldHint  = document.querySelector('.field-hint');
const wishCount  = document.getElementById('wish-count');
let wishTotal = 0;

const heartEmojis = ['🤍','🌸','💕','✨','🌷','💗','🫧','🕊️'];

function spawnHeart(x, y) {
  const h = document.createElement('div');
  h.className = 'floating-heart';
  h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  const rot = (Math.random() - 0.5) * 40 + 'deg';
  h.style.setProperty('--rot', rot);
  h.style.left = x + 'px';
  h.style.top  = y + 'px';
  h.style.fontSize = (1 + Math.random() * 0.8) + 'rem';
  heartField.appendChild(h);
  setTimeout(() => h.remove(), 2100);

  wishTotal++;
  wishCount.textContent = wishTotal;
  if (wishTotal === 1) fieldHint.classList.add('hidden');
}

function getFieldPos(e) {
  const rect = heartField.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

heartField.addEventListener('click', e => {
  const pos = getFieldPos(e);
  for (let i = 0; i < 3; i++) {
    setTimeout(() => spawnHeart(
      pos.x + (Math.random() - 0.5) * 40,
      pos.y + (Math.random() - 0.5) * 30
    ), i * 80);
  }
});

heartField.addEventListener('touchstart', e => {
  e.preventDefault();
  const pos = getFieldPos(e);
  for (let i = 0; i < 3; i++) {
    setTimeout(() => spawnHeart(
      pos.x + (Math.random() - 0.5) * 40,
      pos.y + (Math.random() - 0.5) * 30
    ), i * 80);
  }
}, { passive: false });

/* ================================
   MUSIC PLAYER
================================ */
const audio     = document.getElementById('audio');
const playerBtn = document.getElementById('player-btn');
const waveBars  = document.getElementById('wave-bars');
let isPlaying   = false;

function toggleMusic() {
  if (!isPlaying) {
    audio.play().catch(() => {
      // No audio source — show friendly alert
      showMusicNote();
    });
    waveBars.classList.remove('stopped');
    playerBtn.textContent = '⏸';
    isPlaying = true;
  } else {
    audio.pause();
    waveBars.classList.add('stopped');
    playerBtn.textContent = '▶';
    isPlaying = false;
  }
}
window.toggleMusic = toggleMusic;

function showMusicNote() {
  const note = document.createElement('div');
  note.textContent = '♪ adicione musica.mp3 na mesma pasta';
  note.style.cssText = `
    position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
    background:rgba(92,35,54,0.9);color:#fff;padding:10px 20px;
    border-radius:20px;font-size:0.75rem;z-index:800;
    animation:fadeNote 3s ease forwards;white-space:nowrap;
  `;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3100);
}

// Add fadeNote keyframe
const s = document.createElement('style');
s.textContent = `@keyframes fadeNote {
  0%{opacity:0;transform:translateX(-50%) translateY(10px)}
  15%{opacity:1;transform:translateX(-50%) translateY(0)}
  80%{opacity:1}
  100%{opacity:0}
}`;
document.head.appendChild(s);

// Auto-attempt play on first user interaction anywhere
document.addEventListener('touchstart', function autoPlay() {
  if (!isPlaying && audio.src) {
    audio.play().then(() => {
      waveBars.classList.remove('stopped');
      playerBtn.textContent = '⏸';
      isPlaying = true;
    }).catch(() => {});
  }
  document.removeEventListener('touchstart', autoPlay);
}, { once: true });
