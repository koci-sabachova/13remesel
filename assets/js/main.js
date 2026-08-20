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

// Svatba — jednoduchá "slušnostní" zámka heslem (není to skutečná bezpečnost,
// heslo jde vyčíst ze zdrojového kódu — jen brání náhodnému procházení odkazu)
const gate = document.getElementById('gate');
const gateContent = document.getElementById('wedding-content');
if (gate && gateContent) {
  const GATE_PASSWORD = 'cas'; // porovnává se bez diakritiky, projde "čas" i "cas"
  const GATE_KEY = 'svatba-gate-ok';
  const gateForm = document.getElementById('gate-form');
  const gateInput = document.getElementById('gate-password');
  const gateError = document.getElementById('gate-error');

  const stripDiacritics = (str) => str.normalize('NFD').replace(/[̀-ͯ]/g, '');

  const unlock = () => {
    gate.hidden = true;
    gateContent.hidden = false;
  };

  if (sessionStorage.getItem(GATE_KEY) === '1') {
    unlock();
  } else {
    gateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (stripDiacritics(gateInput.value.trim().toLowerCase()) === GATE_PASSWORD) {
        sessionStorage.setItem(GATE_KEY, '1');
        unlock();
      } else {
        gateError.hidden = false;
        gateInput.value = '';
        gateInput.focus();
      }
    });
  }
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

// Svatební galerie + leták — lightbox s navigací šipkami
const galleryItems = document.querySelectorAll('.wedding-gallery__item, .wedding__program-photo-trigger');
const lightbox = document.getElementById('lightbox');
if (galleryItems.length && lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const btnClose = lightbox.querySelector('.lightbox__close');
  const btnPrev = lightbox.querySelector('.lightbox__prev');
  const btnNext = lightbox.querySelector('.lightbox__next');
  const items = Array.from(galleryItems);
  let currentIndex = 0;
  let lastFocused = null;

  const show = (index) => {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img')?.alt || '';
  };

  const open = (index, trigger) => {
    lastFocused = trigger;
    show(index);
    lightbox.hidden = false;
    btnClose.focus();
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    lightboxImg.src = '';
    if (lastFocused) lastFocused.focus();
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => open(index, item));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(currentIndex - 1));
  btnNext.addEventListener('click', () => show(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  const focusable = Array.from(lightbox.querySelectorAll('button'));

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
    else if (e.key === 'Tab') {
      // Focus trap — Tab uvnitř lightboxu nesmí utéct na obsah pod overlayem
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

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
