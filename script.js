(() => {
  'use strict';
  // Fixed birthday: never rolls over to another year. Same instant in every time zone.
  const birthdayAt = Date.parse('2026-09-21T00:00:00-05:00');
  const parts = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let revealed = false;
  let confettiTimeout;
  function celebrate() {
    if (reducedMotion.matches) return;
    const holder = document.getElementById('confetti');
    clearTimeout(confettiTimeout);
    holder.replaceChildren();
    const batch = document.createDocumentFragment();
    for (let i = 0; i < 56; i++) {
      const piece = document.createElement('i');
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.animationDelay = `${Math.random() * 1.2}s`;
      piece.style.background = ['#dcb77c', '#eee5d4', '#72a5ad'][i % 3];
      batch.appendChild(piece);
    }
    holder.appendChild(batch);
    confettiTimeout = setTimeout(() => holder.replaceChildren(), 5400);
  }
  function tick() {
    const remaining = Math.max(0, Math.ceil((birthdayAt - Date.now()) / 1000));
    if (remaining === 0) {
      if (!revealed) {
        revealed = true;
        document.getElementById('waiting').hidden = true;
        document.getElementById('birthday').hidden = false;
        document.getElementById('headline').innerHTML = 'Hoy la historia<br>es tuya, <em>Briggitte.</em>';
        document.getElementById('intro').textContent = 'La espera terminó. Que empiece un año lleno de cosas bonitas.';
        document.getElementById('announcement').textContent = '¡Ya es tu día! Tu carta está abierta. ♡';
        document.body.classList.add('celebrating');
        document.title = '¡Feliz cumpleaños, Briggitte!';
        celebrate();
      }
      return true;
    }
    const values = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
    values.forEach((value, i) => { parts[i].textContent = String(value).padStart(2, '0'); });
    return false;
  }
  let timer;
  if (!tick()) timer = setInterval(() => { if (tick()) clearInterval(timer); }, 250);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && tick()) clearInterval(timer); });
  window.addEventListener('pageshow', () => { if (tick()) clearInterval(timer); });
  document.getElementById('celebrate').addEventListener('click', () => {
    document.getElementById('announcement').textContent = 'Que ese deseo encuentre la manera de cumplirse. ♡';
    celebrate();
  });
})();
