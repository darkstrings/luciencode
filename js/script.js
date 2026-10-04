document.getElementById("contact-btn").onmouseover = function () {
  this.classList.add("glitch");
};
document.getElementById("github-btn").onmouseover = function () {
  this.classList.add("glitch");
};

document.getElementById("contact-btn").onmouseout = function () {
  this.classList.remove("glitch");
};
document.getElementById("github-btn").onmouseout = function () {
  this.classList.remove("glitch");
};
(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      background: {
        color: "#0a0004",
      },

      particles: {
        number: { value: 90 },
        color: { value: "#ff2a2a" },
        shape: { type: "circle" },

        opacity: {
          value: 0.6,
        },

        size: {
          value: 2,
          random: true,
        },

        links: {
          enable: true,
          distance: 140,
          color: "#ff2a2a",
          opacity: 0.35,
          width: 1,
        },

        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: false,
          straight: false,
          outModes: "bounce",
        },
      },

      interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: "attract",
          },
          onclick: {
            enable: false,
          },
        },

        modes: {
          attract: {
            distance: 260,
            duration: 0.6,
            factor: 3.5,
          },
          move: {
            speed: 0.9,
          },
          links: {
            opacity: 0.5,
          },
        },
      },

      detectRetina: true,

      // ⭐ MOBILE OVERRIDES
      responsive: [
        {
          maxWidth: 600,
          options: {
            particles: {
              number: { value: 40 }, // fewer particles
              size: { value: 3 }, // slightly bigger
              move: { speed: 2.2 }, // faster movement
            },
            interactivity: {
              modes: {
                attract: {
                  distance: 180, // smaller attract radius
                  duration: 0.4,
                },
              },
            },
          },
        },
      ],
    },
  });
})();
