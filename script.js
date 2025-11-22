window.addEventListener("load", () => {
  // MOBILE MENU
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // FALLING LEAVES OPTIMIZED
  const leavesContainer = document.querySelector(".leaves-container");
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  function createLeaf() {
    const leaf = document.createElement("span");
    leaf.className = "leaf";

    // Size
    const size = 8 + Math.random() * 12;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size * 2}px`;

    // Position & movement
    let x = Math.random() * screenWidth;
    let y = -size * 2;
    let speedY = 0;
    const gravity = 0.02 + Math.random() * 0.05;
    const swayAmp = 10 + Math.random() * 30;
    const swayFreq = 0.01 + Math.random() * 0.03;
    let angle = Math.random() * 360;
    const angularSpeed = 0.02 + Math.random() * 0.05;

    leavesContainer.appendChild(leaf);

    function animate() {
      speedY += gravity;
      y += speedY;

      x += Math.sin(y * swayFreq) * swayAmp * 0.02;
      angle += angularSpeed;

      leaf.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

      if (y < screenHeight + size * 2) {
        requestAnimationFrame(animate);
      } else {
        leaf.remove();
      }
    }

    requestAnimationFrame(animate);
  }

  setInterval(createLeaf, 250);

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


});
