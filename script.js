/* init AOS */
AOS.init({ duration: 900, once: true });

/* menu toggle */
const menuIcon = document.querySelector("#menu-icon");
const nav = document.querySelector("nav");
if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    nav.classList.toggle("Active");
    menuIcon.classList.toggle("fa-times");
  });
}

/* close menu on link click */
const links = document.querySelectorAll("nav a");
links.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("Active");
    menuIcon.classList.remove("fa-times");
  });
});

/* loader hide */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* progress bar */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const bar = document.getElementById("progress-bar");
  if (bar) bar.style.width = progress + "%";
});

// ===== Particles dynamic color =====
function loadParticles(theme = "dark") {
  const colorValue = theme === "light" ? "#555555" : "#b74b4b";
  if (window.pJSDom && window.pJSDom.length > 0) {
    // destroy old instance
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }

  particlesJS("particles-js", {
    particles: {
      number: { value: 40 },
      color: { value: colorValue },
      shape: { type: "circle" },
      opacity: { value: 0.06 },
      size: { value: 3 },
      move: { enable: true, speed: 0.9 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "repulse" } }
    }
  });
}

// detect theme for first load
const initialTheme =
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
loadParticles(initialTheme);

// listen for theme changes
const observer = new MutationObserver(() => {
  const themeNow =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  loadParticles(themeNow);
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });


/* skills animation on scroll (repeats every time visible) */
(function() {
  const skillSection = document.querySelector('.skills-section');
  if (!skillSection) return;

  const lines = document.querySelectorAll('.line');

  function animateSkills() {
    const rect = skillSection.getBoundingClientRect();
    const inView = rect.top <= window.innerHeight - 100 && rect.bottom >= 100;

    lines.forEach((line, index) => {
      if (inView) {
        const pct = line.getAttribute('data-percent') || '0%';
        setTimeout(() => {
          line.style.setProperty('--target-width', pct);
          line.classList.add('animate');
        }, index * 120);
      } else {
        line.classList.remove('animate');
        line.style.setProperty('--target-width', '0%');
      }
    });
  }

  window.addEventListener('scroll', animateSkills);
  window.addEventListener('resize', animateSkills);
  window.addEventListener('load', animateSkills);
  animateSkills();
})();


/* Professional theme module
   - supports: saved preference, system preference, accessible toggle
   - applies html[data-theme="light"] attribute
*/
(function() {
  const TOGGLE_IDS = ['mode-toggle', 'theme-toggle', 'modeToggle', 'themeToggle'];
  const toggleBtn = TOGGLE_IDS.map(id => document.getElementById(id)).find(Boolean);

  if (!toggleBtn) return;

  const ICON_MOON = 'fa-moon';
  const ICON_SUN = 'fa-sun';
  const STORAGE_KEY = 'site-theme'; // values: 'light' or 'dark'

  // detect initial: saved -> system -> dark
  const saved = localStorage.getItem(STORAGE_KEY);
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved ? saved : (systemPrefersLight ? 'light' : 'dark');

  // apply theme
  function applyTheme(name, save = false) {
    const doc = document.documentElement;
    if (name === 'light') {
      doc.setAttribute('data-theme', 'light');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.setAttribute('title', 'Switch to dark mode');
      swapIcon(ICON_SUN);
    } else {
      doc.removeAttribute('data-theme');
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.setAttribute('title', 'Switch to light mode');
      swapIcon(ICON_MOON);
    }
    if (save) localStorage.setItem(STORAGE_KEY, name);
  }

  function swapIcon(iconClass) {
    const i = toggleBtn.querySelector('i');
    if (!i) return;
    i.classList.remove(ICON_MOON, ICON_SUN);
    i.classList.add(iconClass);
  }

  // toggle handler
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next, true);
  });

  // keyboard accessible (Enter / Space)
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleBtn.click();
    }
  });

  // initialize
  applyTheme(initial, false);

  // react to system changes if user has not saved preference
  if (!saved && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    mq.addEventListener && mq.addEventListener('change', (ev) => {
      const newTheme = ev.matches ? 'light' : 'dark';
      // only apply system change if user didn't save
      if (!localStorage.getItem(STORAGE_KEY)) applyTheme(newTheme, false);
    });
  }
})();
// ===== Active Link on Scroll =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("Active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("Active");
    }
  });
});
