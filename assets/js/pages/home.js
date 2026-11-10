/** Landing page: scroll-reveal animations. */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('show', entry.isIntersecting));
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
});
