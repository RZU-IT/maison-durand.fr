
function initNavbar() {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero-section');
  const burgerBtn  = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!header || !burgerBtn || !mobileMenu) return;

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
  };

  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  if (hero) {
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      const hidden = hero.getBoundingClientRect().bottom > 24;
      header.classList.toggle('is-hero-hidden', hidden);
      if (hidden) closeMenu();
    };

    const scheduleVisibility = () => {
      if (!frame) frame = requestAnimationFrame(updateVisibility);
    };

    window.addEventListener('scroll', scheduleVisibility, { passive: true });
    window.addEventListener('resize', scheduleVisibility);
    updateVisibility();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('[data-include]')) {
    document.addEventListener('includes:ready', initNavbar, { once: true });
    return;
  }

  initNavbar();
});

// Copyright RZU Informatique
