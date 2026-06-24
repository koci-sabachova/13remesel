// Mobile menu toggle
const toggle = document.querySelector('.site-header__toggle');
const nav = document.getElementById('primary-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
}

// Dynamic year in footer
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Sticky header — fixed po zascrollování, schová se při scrollu dolů, vrátí se při scrollu nahoru
const header = document.querySelector('.site-header');
if (header) {
  const threshold = 120;
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > threshold) {
      header.classList.add('is-floating');
      if (y > lastY + 4) {
        header.classList.add('is-hidden');
      } else if (y < lastY - 4) {
        header.classList.remove('is-hidden');
      }
    } else {
      header.classList.remove('is-floating', 'is-hidden');
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
}

// "Paywall" rozbalování popisů řemesel
document.querySelectorAll('.craft__more-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.craft__more');
    if (!wrap) return;
    const collapsed = wrap.getAttribute('data-collapsed') === 'true';
    wrap.setAttribute('data-collapsed', String(!collapsed));
    btn.setAttribute('aria-expanded', String(collapsed));
  });
});

// Anti-spam-bot e-mail: rekonstrukce mailto: za běhu z data-u + data-d
document.querySelectorAll('.js-mail').forEach((el) => {
  const u = el.dataset.u;
  const d = el.dataset.d;
  if (!u || !d) return;
  const email = u + '@' + d;
  el.setAttribute('href', 'mailto:' + email);
  if (el.dataset.text !== 'keep') {
    el.textContent = email;
  }
});
