export function installRevealDirective(app) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    app.directive('reveal', {
      mounted(el) {
        el.classList.add('reveal', 'reveal-visible');
      },
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -70px 0px' },
  );

  app.directive('reveal', {
    mounted(el, binding) {
      el.classList.add('reveal');
      if (binding.value) {
        el.style.transitionDelay = binding.value;
      }
      observer.observe(el);
    },
    unmounted(el) {
      observer.unobserve(el);
    },
  });
}
