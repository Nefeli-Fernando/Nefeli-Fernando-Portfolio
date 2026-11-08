
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


const card = document.getElementById("photo-card");
if (card) {
const photos = card.querySelectorAll("img");
const dots = card.querySelectorAll(".dots span");
 
const SHOW_TIME = 3500; // milliseconds each photo stays (3.5 seconds)
 
let current = 0;
let timer = null;
 
function showPhoto(index) {
    photos[current].classList.remove("active");
    dots[current].classList.remove("active");
 
    current = index;
 
    photos[current].classList.add("active");
    dots[current].classList.add("active");
}
 
function nextPhoto() {
    // the % makes it loop: after the last photo it goes back to the first
    showPhoto((current + 1) % photos.length);
}
 
function start() {
    stop();                                  // never run two timers at once
    timer = setInterval(nextPhoto, SHOW_TIME);
}
 
function stop() {
    clearInterval(timer);
}
 
// pause when the mouse is on the card, continue when it leaves
card.addEventListener("mouseenter", stop);
card.addEventListener("mouseleave", start);
 
// don't waste time while the tab is hidden
document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
});
 
// people who turned off animations just see the first photo
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && photos.length > 1) {
    start();
}
}

