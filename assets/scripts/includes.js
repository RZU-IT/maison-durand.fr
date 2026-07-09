

(async function () {
  const slots = document.querySelectorAll('[data-include]');

  await Promise.all(Array.from(slots).map(async (el) => {
    const path = el.dataset.include;
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      el.outerHTML = html;
    } catch (err) {
      console.warn(`[includes.js] Impossible de charger "${path}":`, err.message);
      el.remove();
    }
  }));

  document.dispatchEvent(new Event('includes:ready'));
})();

// rzu-informatique
