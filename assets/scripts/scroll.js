

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = [...document.querySelectorAll('.reveal')];

  if (reduceMotion) {
    revealElements.forEach((element) => element.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

        entering.forEach((entry, index) => {
          entry.target.style.setProperty('--reveal-delay', `${Math.min(index * 90, 270)}ms`);
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  const orchard = document.querySelector('.orchard-scroll');
  const orchardSteps = orchard ? [...orchard.querySelectorAll('.orchard-step')] : [];

  if (orchard && orchardSteps.length && !reduceMotion) {
    let scheduled = false;

    const updateOrchard = () => {
      const rect = orchard.getBoundingClientRect();
      const travel = Math.max(1, orchard.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));

      orchardSteps.forEach((step, index) => {
        const revealAt = (index + 1) / (orchardSteps.length + 1);
        step.classList.toggle('is-visible', progress >= revealAt);
      });
      scheduled = false;
    };

    const scheduleOrchardUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(updateOrchard);
    };

    window.addEventListener('scroll', scheduleOrchardUpdate, { passive: true });
    window.addEventListener('resize', scheduleOrchardUpdate);
    updateOrchard();
  } else {
    orchardSteps.forEach((step) => step.classList.add('is-visible'));
  }
})();

// Copyright RZU Informatique
