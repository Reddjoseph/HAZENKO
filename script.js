window.addEventListener("load", () => {
// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
navLinks.classList.toggle("active");
});

// NAV LINK CLICK HANDLER
document.querySelectorAll(".nav-links a").forEach(link => {
link.addEventListener("click", (e) => {
const targetId = link.getAttribute("href").substring(1);
const targetElement = document.getElementById(targetId);

  if (targetElement) {
    e.preventDefault();

    if (targetId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      const topOffset = targetElement.offsetTop - document.querySelector(".navbar").offsetHeight;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
    setTimeout(highlightNav, 400);
  }
});

});

// HIGHLIGHTER FOR NAV
function highlightNav() {
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-links a");

let current = "";
const scrollY = window.scrollY + window.innerHeight / 2;

sections.forEach(sec => {
  const top = sec.offsetTop;
  const height = sec.offsetHeight;

  if (scrollY >= top && scrollY < top + height) {
    current = sec.getAttribute("id");
  }
});

// Ensure last section is highlighted at bottom
if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
  const lastSection = sections[sections.length - 1];
  current = lastSection.getAttribute("id");
}

navLinks.forEach(a => {
  a.classList.remove("active");
  if (a.getAttribute("href") === `#${current}`) {
    a.classList.add("active");
  }
});

}

document.addEventListener("scroll", highlightNav);
highlightNav();

// FAQ
document.querySelectorAll(".faq-item").forEach(item => {
const question = item.querySelector(".faq-question");
const answer = item.querySelector(".faq-answer");

question.addEventListener("click", () => {
  const isOpen = item.classList.contains("active");
  if (isOpen) {
    item.classList.remove("active");
    answer.style.maxHeight = "0px";
  } else {
    item.classList.add("active");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
});

});

// Hero Sparks Generation
const sparksContainer = document.querySelector('.hero-sparks');
const sparksCount = 30;

for (let i = 0; i < sparksCount; i++) {
const spark = document.createElement('div');
spark.classList.add('hero-spark');
spark.style.left = Math.random() * 100 + '%';
spark.style.top = Math.random() * 100 + '%';
spark.style.width = 2 + Math.random() * 3 + 'px';
spark.style.height = 2 + Math.random() * 3 + 'px';
spark.style.animationDuration = 3 + Math.random() * 2 + 's';
spark.style.animationDelay = Math.random() * 5 + 's';
sparksContainer.appendChild(spark);
}

// Interactive hero sparks (cursor trail)
const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', e => {
const spark = document.createElement('div');
spark.className = 'spark';

const dx = (Math.random() - 0.5) * 60;
const dy = (Math.random() - 0.5) * 60;

spark.style.left = `${e.clientX}px`;
spark.style.top = `${e.clientY}px`;
spark.style.setProperty('--dx', `${dx}px`);
spark.style.setProperty('--dy', `${dy}px`);

document.body.appendChild(spark);

setTimeout(() => {
  spark.remove();
}, 1000);

});

// ==============================
//  TWINKLING STARS
// ==============================
const starContainer = document.querySelector(".stars-container");
const STAR_COUNT = 120;

function createTwinklingStars() {
  if (!starContainer) return;

  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement("div");
    s.classList.add("star");
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.width = 1 + Math.random() * 2 + "px";
    s.style.height = s.style.width;
    s.style.animationDelay = Math.random() * 4 + "s";
    s.style.opacity = 0.2 + Math.random() * 0.8;
    starContainer.appendChild(s);
  }
}

createTwinklingStars();


// ============================== //
//        SHOOTING STARS          // 
// ============================== //
const shootingContainer = document.querySelector('.shooting-stars-container');

function createShootingStar(isFast = false) {
  if (!shootingContainer) return;

  // Start position
  const startX = window.innerWidth + 50;
  const startY = Math.random() * window.innerHeight * 0.3; 

  // End position with randomness
  const endX = -100 + (Math.random() * 200 - 100);
  const endY = window.innerHeight + 100 + (Math.random() * 100 - 50);
  const dx = endX - startX;
  const dy = endY - startY;

  const angle = Math.atan2(dy, dx); 

  // Sizes
  const trailLength = isFast ? 200 : 120;
  const trailHeight = isFast ? 3 : 2;
  const duration = isFast ? 1500 + Math.random() * 500 : 6000 + Math.random() * 4000;

  // Container for rotation
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = `${startX}px`;
  container.style.top = `${startY}px`;
  container.style.width = '0px';
  container.style.height = '0px';
  container.style.transform = `rotate(${angle}rad)`;
  container.style.transformOrigin = '0 0';
  container.style.pointerEvents = 'none';

  // Trail 
  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.position = 'absolute';
  trail.style.left = '0px';
  trail.style.top = `${-trailHeight / 2}px`;
  trail.style.width = `${trailLength}px`;
  trail.style.height = `${trailHeight}px`;
  trail.style.background = 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))';
  trail.style.filter = isFast ? 'blur(4px)' : 'blur(2px)';
  trail.style.transformOrigin = '0 50%';
  trail.style.zIndex = 1;

  container.appendChild(trail);
  shootingContainer.appendChild(container);

  // Animate container along dx, dy
  container.animate([
    { transform: `translate(0,0) rotate(${angle}rad)`, opacity: 1 },
    { transform: `translate(${dx}px, ${dy}px) rotate(${angle}rad)`, opacity: 0 }
  ], { duration, easing: 'linear', fill: 'forwards' });

  setTimeout(() => container.remove(), duration + 50);
}

// Recursive spawning
function randomShootingStars() {
  const delay = 1000 + Math.random() * 3000;
  setTimeout(() => {
    const isFast = Math.random() < 0.2;
    createShootingStar(isFast);
    randomShootingStars();
  }, delay);
}

randomShootingStars();

// ============================== //
//        Constellations          //
// ============================== //
const container = document.querySelector('.constellations-container');
const numConstellations = 12;
const constellations = [];

for (let i = 0; i < numConstellations; i++) {
  const constellation = document.createElement('div');
  constellation.className = 'constellation';
  container.appendChild(constellation);

  const xOffset = Math.random() * window.innerWidth;
  const yOffset = Math.random() * window.innerHeight;

  constellation.dataset.baseY = yOffset;
  const driftX = (Math.random() - 0.5) * 5;
  const driftY = (Math.random() - 0.5) * 5;
  const rotateSpeed = (Math.random() - 0.5) * 0.01;

  constellation.style.left = xOffset + 'px';
  constellation.style.top = yOffset + 'px';

  const numStars = 2 + Math.floor(Math.random() * 4);
  const stars = [];

  for (let j = 0; j < numStars; j++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = (Math.random() * 50 - 25) + 'px';
    star.style.top = (Math.random() * 50 - 25) + 'px';
    constellation.appendChild(star);
    stars.push(star);
  }

  // Connect stars
  for (let j = 0; j < stars.length; j++) {
    for (let k = j + 1; k < stars.length; k++) {
      const line = document.createElement('div');
      line.className = 'line';
      constellation.appendChild(line);

      const updateLine = () => {
        const rect1 = stars[j].getBoundingClientRect();
        const rect2 = stars[k].getBoundingClientRect();
        const parentRect = constellation.getBoundingClientRect();
        const x1 = rect1.left - parentRect.left + rect1.width / 2;
        const y1 = rect1.top - parentRect.top + rect1.height / 2;
        const x2 = rect2.left - parentRect.left + rect2.width / 2;
        const y2 = rect2.top - parentRect.top + rect2.height / 2;
        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        line.style.width = length + 'px';
        line.style.left = x1 + 'px';
        line.style.top = y1 + 'px';
        line.style.transform = `rotate(${angle}deg)`;
      };
      updateLine();
      window.addEventListener('resize', updateLine);
    }
  }

  constellations.push({ element: constellation, driftX, driftY, rotateSpeed });
}

// Animate constellations with scroll parallax
function animateConstellations() {
  const scrollY = window.scrollY;
  constellations.forEach(c => {
    let posX = c.driftX * 0.002 * scrollY;
    let posY = c.driftY * 0.002 * scrollY - scrollY * 0.2; 
    let angle = c.rotateSpeed * scrollY;
    c.element.style.transform = `rotate(${angle}rad)`;
  });
}

window.addEventListener('scroll', animateConstellations);
animateConstellations();

// ============================== //
//        Cyber Particles         //
// ============================== //
const heroParticlesContainer = document.getElementById('heroParticles');

// ============================= //
// ADD PLASMA GLOW               //
// ============================= //
const plasmaGlow = document.createElement('div');
plasmaGlow.classList.add('hero-plasma-glow');
heroParticlesContainer.appendChild(plasmaGlow);

// ============================= //
// MAIN FLAME PARTICLES          //
// ============================= //
const particleCount = 80;
for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('hero-particle');

  const startX = Math.random() * 100; 
  const startY = 100 + Math.random() * 50;
  const width = 1 + Math.random() * 3;
  const height = 8 + Math.random() * 25;

  particle.style.left = startX + '%';
  particle.style.top = startY + '%';
  particle.style.width = width + 'px';
  particle.style.height = height + 'px';

  const riseDuration = 3 + Math.random() * 5;
  const delay = Math.random() * 5;
  const drift = (Math.random() - 0.5) * 60;

  const animName = `flameRise${i}`;
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes ${animName} {
      0% { transform: translate(0, 0) scaleX(1); opacity: 0; }
      10% { opacity: 0.7; }
      50% { transform: translate(${drift/2}px, -60vh) scaleX(${1 + (Math.random() - 0.5)*0.6}); opacity: 0.6; }
      100% { transform: translate(${drift}px, -120vh) scaleX(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  particle.style.animation = `${animName} ${riseDuration}s linear ${delay}s infinite`;
  heroParticlesContainer.appendChild(particle);
}

// ============================= //
// CYBERPUNK EMBER SPARKS        //
// ============================= //
const sparkCount = 100;
for (let i = 0; i < sparkCount; i++) {
  const spark = document.createElement('div');
  spark.classList.add('hero-spark');

  const startX = Math.random() * 100;
  const startY = 90 + Math.random() * 30;
  const size = 1 + Math.random() * 2;
  const duration = 2 + Math.random() * 2;
  const drift = (Math.random() - 0.5) * 40;

  spark.style.left = startX + '%';
  spark.style.top = startY + '%';
  spark.style.width = size + 'px';
  spark.style.height = size + 'px';

  const animName = `sparkRise${i}`;
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes ${animName} {
      0% { transform: translate(0,0); opacity:0; }
      20% { opacity:0.8; }
      80% { transform: translate(${drift}px, -80vh) scale(${0.2 + Math.random()*0.8}); opacity:0.4; }
      100% { transform: translate(${drift}px, -120vh) scale(0); opacity:0; }
    }
  `;
  document.head.appendChild(style);

  spark.style.animation = `${animName} ${duration}s linear ${Math.random()*5}s infinite`;
  heroParticlesContainer.appendChild(spark);
}

// ================================= //
// Hero Typewriter Effect (Working)  //
// ================================= //
const phrases = [
  "Fox Intelligence",
  "Tiger Strength",
  "Dragon Innovation"
];

const typeElement = document.getElementById("typewriter");

let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function type() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typeElement.textContent = current.slice(0, letterIndex + 1);
    letterIndex++;
    if (letterIndex === current.length) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typeElement.textContent = current.slice(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 50 : 100);
}

type();

});