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
