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