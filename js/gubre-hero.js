(() => {
  const hero = document.querySelector('.gubre-hero');
  if (!hero) return;

  const slides = [...hero.querySelectorAll('.gubre-slide')];
  const dots = [...hero.querySelectorAll('.gubre-hero__dot')];
  const prev = hero.querySelector('.gubre-hero__arrow--prev');
  const next = hero.querySelector('.gubre-hero__arrow--next');
  const currentLabel = hero.querySelector('.gubre-hero__current');

  if (slides.length < 2) return;

  const intervalMs = 7000;
  let current = 0;
  let timer = null;
  let paused = false;

  const twoDigits = (number) => String(number + 1).padStart(2, '0');

  function restartProgressAnimation(dot) {
    dot.classList.remove('is-active');
    void dot.offsetWidth;
    dot.classList.add('is-active');
  }

  function show(index, restartTimer = true) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      if (active) {
        dot.setAttribute('aria-current', 'true');
        restartProgressAnimation(dot);
      } else {
        dot.removeAttribute('aria-current');
      }
    });

    if (currentLabel) currentLabel.textContent = twoDigits(current);

    if (restartTimer) startTimer();
  }

  function startTimer() {
    window.clearInterval(timer);
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = window.setInterval(() => show(current + 1, false), intervalMs);
  }

  function setPaused(value) {
    paused = value;
    hero.classList.toggle('is-paused', paused);
    if (paused) {
      window.clearInterval(timer);
    } else {
      startTimer();
    }
  }

  prev?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      show(Number(dot.dataset.go));
    });
  });

  hero.addEventListener('mouseenter', () => setPaused(true));
  hero.addEventListener('mouseleave', () => setPaused(false));
  hero.addEventListener('focusin', () => setPaused(true));
  hero.addEventListener('focusout', (event) => {
    if (!hero.contains(event.relatedTarget)) setPaused(false);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearInterval(timer);
    } else {
      startTimer();
    }
  });

  show(0);
})();
