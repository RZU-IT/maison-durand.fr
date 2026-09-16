

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
  const compactViewport = window.matchMedia('(max-width: 700px)').matches;

  if (orchard && orchardSteps.length && compactViewport && !reduceMotion) {
    let touchStartY = null;
    const setForwardSnap = (enabled) => document.documentElement.classList.toggle('orchard-forward-snap', enabled);

    window.addEventListener('touchstart', (event) => {
      touchStartY = event.touches[0] ? event.touches[0].clientY : null;
    }, { passive: true });
    window.addEventListener('touchmove', (event) => {
      if (touchStartY === null || !event.touches[0]) return;
      const delta = touchStartY - event.touches[0].clientY;
      if (Math.abs(delta) > 6) setForwardSnap(delta > 0);
    }, { passive: true });
    window.addEventListener('touchend', () => { touchStartY = null; }, { passive: true });
    window.addEventListener('wheel', (event) => setForwardSnap(event.deltaY > 0), { passive: true });
    window.addEventListener('keydown', (event) => {
      if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) setForwardSnap(false);
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(event.key)) setForwardSnap(true);
    });

    const snapPoints = [0, ...orchardSteps.map((step, index) => (index + 1) / (orchardSteps.length + 1)), 1];
    const snapStops = snapPoints.map((progress) => {
      const stop = document.createElement('span');
      stop.className = 'mobile-scroll-stop';
      stop.setAttribute('aria-hidden', 'true');
      stop.dataset.progress = String(progress);
      orchard.append(stop);
      return stop;
    });

    const positionSnapStops = () => {
      const travel = Math.max(1, orchard.offsetHeight - window.innerHeight);
      snapStops.forEach((stop) => {
        stop.style.top = `${Number(stop.dataset.progress) * travel}px`;
      });
    };

    positionSnapStops();
    window.addEventListener('resize', positionSnapStops);
    window.addEventListener('orientationchange', positionSnapStops);
  }

  if (orchard && orchardSteps.length && !reduceMotion) {
    let scheduled = false;

    const updateOrchard = () => {
      const rect = orchard.getBoundingClientRect();
      const travel = Math.max(1, orchard.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      if (compactViewport && rect.bottom <= window.innerHeight * 0.2) {
        document.documentElement.classList.remove('orchard-forward-snap');
      }

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
