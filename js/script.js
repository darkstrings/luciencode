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
  // 1. Register all slim bundle features on the engine
  await loadSlim(tsParticles);

  // 2. Create the animation
  await tsParticles.load({
    id: "tsparticles", // HTML container ID
    options: {
  background: {
    color: "#0a0004" // deep dark red/black
  },

  particles: {
    number: { value: 90 },
    color: { value: "#ff2a2a" }, // neon red
    shape: { type: "circle" },

    opacity: {
      value: 0.6
    },

    size: {
      value: 2,
      random: true
    },

    links: {
      enable: true,
      distance: 140,
      color: "#ff2a2a",
      opacity: 0.35,
      width: 1
    },

    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      random: false,
      straight: false,
      outModes: "bounce"
    }
  },

  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "attract"   // the magnet effect
      },
      onclick: {
        enable: false
      }
    },

    modes: {
      attract: {
  distance: 260,
  duration: 0.6,
  factor: 3.5
},
move: {
  speed: 0.9
},
links: {
  opacity: 0.5
}
    }
  },

  detectRetina: true
}
  });
})();
