(function () {
  const grid = document.querySelector('.products-grid');
  const button = document.getElementById('productsMore');
  const mobileQuery = window.matchMedia('(max-width: 920px)');

  if (!grid || !button || grid.children.length <= 3) return;

  const label = button.querySelector('span');
  let collapseTimer;

  function setExpanded(expanded) {
    window.clearTimeout(collapseTimer);

    if (expanded) {
      grid.classList.remove('is-collapsing');
      grid.classList.add('is-expanded');
      button.setAttribute('aria-expanded', 'true');
      label.textContent = 'Voir moins de produits';
      return;
    }

    if (!grid.classList.contains('is-expanded')) return;

    grid.classList.add('is-collapsing');
    button.setAttribute('aria-expanded', 'false');
    label.textContent = 'Voir plus de produits';
    collapseTimer = window.setTimeout(() => {
      grid.classList.remove('is-expanded', 'is-collapsing');
    }, 300);
  }

  function updateLayout() {
    const mobile = mobileQuery.matches;
    button.hidden = !mobile;
    grid.classList.toggle('products-collapsible', mobile);

    if (!mobile) {
      window.clearTimeout(collapseTimer);
      grid.classList.remove('is-expanded', 'is-collapsing');
      button.setAttribute('aria-expanded', 'false');
      label.textContent = 'Voir plus de produits';
    }
  }

  button.addEventListener('click', () => {
    setExpanded(button.getAttribute('aria-expanded') !== 'true');
  });

  mobileQuery.addEventListener('change', updateLayout);
  updateLayout();
})();

// Copyright RZU Informatique
