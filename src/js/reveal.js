export function initRevealAnimation() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => observer.observe(el));
}
