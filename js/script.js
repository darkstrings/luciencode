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

// ---------------------------------------------------------
// Hero strings: six guitar strings you can pluck by sweeping
// the pointer across them. Tap/click strums all six.
// ---------------------------------------------------------
function initStrings() {
  const canvas = document.querySelector(".strings__canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // low E (thick) at the bottom, high e (thin) at the top, like looking down at the neck
  const GAUGES = [1, 1.25, 1.6, 2.1, 2.7, 3.3]; // px, high e -> low E
  const FREQS = [9.5, 8.6, 7.7, 6.9, 6.1, 5.4]; // visual wobble speed (Hz), not real pitch
  const DECAY = 1.5; // per second
  const HARMONICS = 7;
  const SEGMENTS = 140;

  let w = 0, h = 0, dpr = 1;
  let strings = [];
  let rafId = null;

  function layout() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const pad = h * 0.16;
    const gap = (h - pad * 2) / (GAUGES.length - 1);
    strings = GAUGES.map((g, i) => ({
      y: pad + gap * i,
      gauge: g,
      freq: FREQS[i],
      plucks: (strings[i] && strings[i].plucks) || [],
    }));
    draw(performance.now());
  }

  // shape of a string pulled at position p (0..1) and let go: a triangle,
  // which we build from its first few harmonics so it rings naturally
  function displacement(s, x, now) {
    let y = 0;
    for (const pl of s.plucks) {
      const t = (now - pl.t0) / 1000;
      const env = pl.amp * Math.exp(-DECAY * t);
      const p = pl.p;
      for (let n = 1; n <= HARMONICS; n++) {
        const c = (2 / (n * n * Math.PI * Math.PI * p * (1 - p))) * Math.sin(n * Math.PI * p);
        y += env * c * Math.sin(n * Math.PI * x) * Math.cos(2 * Math.PI * s.freq * n * t);
      }
    }
    return y;
  }

  function energy(s, now) {
    let e = 0;
    for (const pl of s.plucks) e += pl.amp * Math.exp(-DECAY * ((now - pl.t0) / 1000));
    return e;
  }

  // fret wires spaced like a real neck (each fret is 2^(1/12) closer than the last),
  // with the nut on the left and position dots at 3, 5, 7, 9 and 12
  function drawNeck() {
    const top = strings[0].y - 6;
    const bottom = strings[strings.length - 1].y + 6;
    const scale = w * 1.55; // only the first ~17 frets fit across the screen
    ctx.lineWidth = 1;
    for (let n = 0; n <= 24; n++) {
      const x = scale * (1 - Math.pow(2, -n / 12));
      if (x > w) break;
      ctx.strokeStyle = n === 0 ? "rgba(243, 230, 232, 0.28)" : "rgba(255, 42, 42, 0.13)";
      ctx.lineWidth = n === 0 ? 3 : 1;
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.stroke();
      if ([3, 5, 7, 9, 12, 15].includes(n)) {
        const prev = scale * (1 - Math.pow(2, -(n - 1) / 12));
        const cx = (x + prev) / 2;
        const mid = (top + bottom) / 2;
        const gap = strings[1].y - strings[0].y;
        ctx.fillStyle = "rgba(255, 42, 42, 0.16)";
        const dots = n === 12 ? [mid - gap * 1.5, mid + gap * 1.5] : [mid];
        for (const cy of dots) {
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(2.5, gap * 0.16), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  function draw(now) {
    ctx.clearRect(0, 0, w, h);
    drawNeck();
    for (const s of strings) {
      s.plucks = s.plucks.filter((pl) => pl.amp * Math.exp(-DECAY * ((now - pl.t0) / 1000)) > 0.15);
      const e = Math.min(energy(s, now) / 10, 1);

      ctx.beginPath();
      for (let i = 0; i <= SEGMENTS; i++) {
        const x = i / SEGMENTS;
        const y = s.y + (s.plucks.length ? displacement(s, x, now) : 0);
        i ? ctx.lineTo(x * w, y) : ctx.moveTo(x * w, y);
      }
      ctx.lineWidth = s.gauge;
      ctx.strokeStyle = `rgba(255, ${Math.round(42 + e * 60)}, ${Math.round(42 + e * 50)}, ${0.42 + e * 0.58})`;
      ctx.shadowColor = "rgba(255, 42, 42, 0.9)";
      ctx.shadowBlur = 4 + e * 18;
      ctx.stroke();

      // wound strings (the three thickest) get a faint highlight line on top
      if (s.gauge > 2) {
        ctx.shadowBlur = 0;
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = `rgba(255, 190, 190, ${0.12 + e * 0.3})`;
        ctx.stroke();
      }
    }
    ctx.shadowBlur = 0;
  }

  function loop(now) {
    draw(now);
    rafId = strings.some((s) => s.plucks.length) ? requestAnimationFrame(loop) : null;
  }

  function pluck(index, xFrac, amp, delay = 0) {
    const s = strings[index];
    if (!s) return;
    const p = Math.min(Math.max(xFrac, 0.06), 0.94);
    s.plucks.push({ p, amp, t0: performance.now() + delay });
    if (s.plucks.length > 4) s.plucks.shift();
    if (!rafId) rafId = requestAnimationFrame(loop);
  }

  function strum(xFrac = 0.72, downward = true, amp = 11) {
    const order = strings.map((_, i) => i);
    // a downstroke hits low E first; low E sits at the bottom of the canvas
    if (downward) order.reverse();
    order.forEach((idx, k) => pluck(idx, xFrac, amp, k * 28));
  }

  layout();
  new ResizeObserver(layout).observe(canvas);

  if (reduceMotion) return; // static strings only

  // sweep detection: when the pointer crosses a string's resting line, pluck it there
  let last = null;
  window.addEventListener(
    "pointermove",
    (ev) => {
      const r = canvas.getBoundingClientRect();
      const x = ev.clientX - r.left;
      const y = ev.clientY - r.top;
      if (last && x >= 0 && x <= r.width) {
        const dy = y - last.y;
        const speed = Math.min(Math.abs(dy) + Math.abs(x - last.x) * 0.3, 40);
        strings.forEach((s, i) => {
          if ((last.y - s.y) * (y - s.y) < 0) {
            pluck(i, x / r.width, Math.sign(dy || 1) * Math.max(4, speed * 0.45));
          }
        });
      }
      last = { x, y };
    },
    { passive: true }
  );

  canvas.addEventListener("pointerdown", (ev) => {
    const r = canvas.getBoundingClientRect();
    strum((ev.clientX - r.left) / r.width);
  });

  // one strum when the page first opens
  setTimeout(() => strum(0.72, true, 9), 650);
}

window.addEventListener("DOMContentLoaded", initStrings);
