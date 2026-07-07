// BizFloat Africa — shared site behavior

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navInner = document.querySelector('.nav-inner');
  if (toggle && navInner) {
    toggle.addEventListener('click', () => {
      navInner.classList.toggle('open');
    });
  }

  // Highlight active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.main-nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Animate health score dial(s) on the page
  document.querySelectorAll('.dial-circle').forEach((circle) => {
    const pct = parseFloat(circle.dataset.score || '0');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
      const offset = circumference - (pct / 100) * circumference;
      circle.style.transition = 'stroke-dashoffset 1.1s ease';
      circle.style.strokeDashoffset = offset;
    });
  });

  // Status toggle demo on the features/home page (switch Healthy/Moderate/High Risk)
  const demoButtons = document.querySelectorAll('[data-status-demo]');
  demoButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.statusDemo;
      const card = btn.closest('.status-demo');
      if (!card) return;
      card.querySelectorAll('[data-status-demo]').forEach((b) => {
        b.classList.remove('is-active', 'btn-primary');
        b.classList.add('btn-ghost');
      });
      btn.classList.remove('btn-ghost');
      btn.classList.add('is-active', 'btn-primary');

      const pill = card.querySelector('.status-pill');
      const dial = card.querySelector('.dial-circle');
      const scoreText = card.querySelector('.dial-score');

      const map = {
        healthy: { label: 'Healthy', cls: 'healthy', score: 82, color: '#2E9E5B' },
        moderate: { label: 'Moderate', cls: 'moderate', score: 54, color: '#E8A93A' },
        risk: { label: 'High Risk', cls: 'risk', score: 27, color: '#E2572B' },
      };
      const s = map[target];
      if (!s) return;

      pill.className = 'status-pill ' + s.cls;
      pill.textContent = s.label;
      if (dial) {
        dial.dataset.score = s.score;
        dial.style.stroke = s.color;
        const radius = dial.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (s.score / 100) * circumference;
        dial.style.transition = 'stroke-dashoffset 0.8s ease, stroke 0.4s ease';
        dial.style.strokeDashoffset = offset;
      }
      if (scoreText) scoreText.textContent = s.score;
    });
  });
});
