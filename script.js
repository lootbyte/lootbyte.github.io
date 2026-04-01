const greetButton = document.getElementById("greetButton");
const message = document.getElementById("message");
const year = document.getElementById("year");
const navLinks = document.querySelectorAll(".nav-links a, .brand");
const revealItems = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menuToggle");
const navLinksContainer = document.getElementById("navLinks");

if (greetButton && message) {
  greetButton.addEventListener("click", () => {
    message.textContent =
      "Aspiring cybersecurity professional with hands-on learning across TryHackMe, Coursera, Cisco, Linux, networking, Wireshark, Nmap, and Python fundamentals.";
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const section = document.querySelector(targetId);

    if (!section) {
      return;
    }

    event.preventDefault();
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    if (navLinksContainer && menuToggle && window.innerWidth <= 640) {
      navLinksContainer.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("revealed");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("revealed");
  });
}
