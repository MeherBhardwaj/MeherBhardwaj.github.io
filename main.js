// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const setActive = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
  });
};
document.addEventListener('scroll', setActive, { passive: true });
setActive();

// Reveal on scroll
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

// Cite buttons — copy a plain-text citation to clipboard
document.querySelectorAll('.cite-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const card = btn.closest('.pub-card');
    const citation = `${card.dataset.authors}. "${card.dataset.title}." ${card.dataset.venue}.`;
    try {
      await navigator.clipboard.writeText(citation);
    } catch (err) {
      // Clipboard API unavailable; fail silently
    }
    const toast = btn.nextElementSibling;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1600);
  });
});
