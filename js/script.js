// Footer year
document.querySelectorAll(".year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Particle background (skipped for people who prefer reduced motion)
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function initParticles() {
  if (reduceMotion || typeof tsParticles === "undefined" || typeof loadSlim === "undefined") return;

  await loadSlim(tsParticles);

  await tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    background: { color: "#0a0004" },
    fpsLimit: 60,
    detectRetina: true,

    particles: {
      number: { value: 80, density: { enable: true, area: 900 } },
      color: { value: "#ff2a2a" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.25, max: 0.6 } },
      size: { value: { min: 1, max: 2.5 } },
      links: {
        enable: true,
        distance: 140,
        color: "#ff2a2a",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
    },

    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
      },
    },

    responsive: [
      {
        maxWidth: 600,
        options: {
          particles: {
            number: { value: 35 },
            move: { speed: 1.6 },
          },
        },
      },
    ],
  });
}

window.addEventListener("DOMContentLoaded", initParticles);
