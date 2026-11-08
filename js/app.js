
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.glass-navbar');
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(15, 23, 42, 0.45)';
    nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.background = 'rgba(255, 255, 255, 0.08)';
    nav.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.2)';
  }
});

const readMoreButton = document.querySelector('.read-more');
const aboutContent = document.querySelector('.about-content');

if (readMoreButton && aboutContent) {
  readMoreButton.addEventListener('click', () => {
    const isExpanded = readMoreButton.getAttribute('aria-expanded') !== 'true';
    aboutContent.classList.toggle('is-expanded', isExpanded);
    readMoreButton.setAttribute('aria-expanded', String(isExpanded));
    readMoreButton.textContent = isExpanded ? 'Read Less' : 'Read More';
  });
}


