document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burger-btn");
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelectorAll(".main-nav-link, .main-button");
  const sections = document.querySelectorAll(".content-section");

  // Burger Menu Toggle Logic
  if (burgerBtn && navContainer) {
    burgerBtn.addEventListener("click", () => {
      navContainer.classList.toggle("active");
      const icon = burgerBtn.querySelector("ion-icon");

      if (navContainer.classList.contains("active")) {
        icon.setAttribute("name", "close-outline");
      } else {
        icon.setAttribute("name", "menu-outline");
      }
    });
  }

  // Section Switching Logic
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("data-target");
      if (!targetId) return;

      e.preventDefault();

      // Switch screen view
      sections.forEach((section) => {
        if (section.id === targetId) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });

      navLinks.forEach((nav) => nav.classList.remove("current-nav"));
      link.classList.add("current-nav");

      // Close mobile menu on link click
      if (navContainer && navContainer.classList.contains("active")) {
        navContainer.classList.remove("active");
        const icon = burgerBtn.querySelector("ion-icon");
        if (icon) icon.setAttribute("name", "menu-outline");
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});

// Counter Animation Logic
const counters = document.querySelectorAll(".count");

function animateCounter(counter) {
  if (counter.dataset.animated === "true") return;
  counter.dataset.animated = "true";

  const target = Number(counter.dataset.target);
  if (!Number.isFinite(target)) return;

  const duration = 1500;
  const startTime = performance.now();
  const prefix = counter.textContent.trim().startsWith("+") ? "+" : "";

  function updateCount(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * easedProgress);
    counter.textContent = prefix + value;

    if (progress < 1) requestAnimationFrame(updateCount);
    else counter.textContent = prefix + target;
  }

  requestAnimationFrame(updateCount);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach(animateCounter);
}
