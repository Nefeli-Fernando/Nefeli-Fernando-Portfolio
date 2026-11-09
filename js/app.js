
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

const profileFlip = document.getElementById('profile-flip');

if (profileFlip) {
    const profileVideo = profileFlip.querySelector('video');

    if (profileVideo) {
        let flipTimeout;

        function startProfileFlip() {
            clearTimeout(flipTimeout);
            flipTimeout = setTimeout(() => {
                profileFlip.classList.add('is-flipped');
                profileVideo.play().catch(() => {});
            }, 1000);
        }

        function resetProfileFlip() {
            clearTimeout(flipTimeout);
            profileFlip.classList.remove('is-flipped');
            profileVideo.pause();

            if (profileVideo.readyState > 0) {
                profileVideo.currentTime = 0;
            }
        }

        profileFlip.addEventListener('pointerenter', startProfileFlip);
        profileFlip.addEventListener('pointerleave', resetProfileFlip);
        profileFlip.addEventListener('focus', startProfileFlip);
        profileFlip.addEventListener('blur', resetProfileFlip);
    }
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

//MAQRUEEEEEEE SCROLL
function initMarquee(marquee) {
    const group = marquee.querySelector(".marquee-group");
    const baseSpeed = parseFloat(marquee.dataset.speed) || 60;          // pixels per second
    const direction = marquee.dataset.direction === "right" ? -1 : 1;   // 1 = moves left, -1 = moves right
    const originalItems = Array.from(group.children);
 
    // put everything inside a moving "track"
    const track = document.createElement("div");
    track.className = "marquee-track";
    marquee.appendChild(track);
    track.appendChild(group);
 
    let groupWidth = 0;
 
    // Repeat the words until one group is wider than the screen, then add a clone, so there's never a gap
    function fill() {
        track.querySelectorAll(".marquee-group.clone").forEach(function (c) { c.remove(); });
        group.innerHTML = "";
        originalItems.forEach(function (item) { group.appendChild(item); });
 
        const setWidth = group.getBoundingClientRect().width;
        const repeats = Math.ceil(marquee.clientWidth / setWidth);
        for (let i = 1; i < repeats; i++) {
            originalItems.forEach(function (item) { group.appendChild(item.cloneNode(true)); });
        }
 
        groupWidth = group.getBoundingClientRect().width;
 
        const clone = group.cloneNode(true);
        clone.classList.add("clone");
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    }
 
    let position = 0;          // how far we've travelled
    let speed = baseSpeed;     // current speed (changes smoothly)
    let targetSpeed = baseSpeed;
    let lastTime = performance.now();
 
    // hover: ease down to 0. Leave: ease back up to normal.
    marquee.addEventListener("mouseenter", function () { targetSpeed = 0; });
    marquee.addEventListener("mouseleave", function () { targetSpeed = baseSpeed; });
 
    function frame(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.1);   // seconds since last frame
        lastTime = now;
 
        // ease: close 6% of the gap to the target every 1/60 second
        const ease = 1 - Math.pow(1 - 0.06, dt * 60);
        speed += (targetSpeed - speed) * ease;
 
        position += direction * speed * dt;
 
        // wrap around so it loops forever
        position = ((position % groupWidth) + groupWidth) % groupWidth;
        track.style.transform = "translateX(" + -position + "px)";
 
        requestAnimationFrame(frame);
    }
 
    // wait for the font so the widths are measured correctly
    document.fonts.ready.then(function () {
        fill();
 
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
 
        requestAnimationFrame(function (now) {
            lastTime = now;
            frame(now);
        });
    });
 
    window.addEventListener("resize", fill);
}
 
document.querySelectorAll(".marquee").forEach(initMarquee);

