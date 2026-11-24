
(() => {
  const ua = navigator.userAgent;
  const safari = (ua.match(/Version\/([\d.]+)/) || [])[1];
  const ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
  document.getElementById("env").textContent =
    (safari ? "Safari " + safari : "Browser: " + (ua.match(/(Chrome|Firefox)\/[\d.]+/) || ["unknown"])[0]) +
    (ios ? " · iOS " + ios[1] + "." + ios[2] + (ios[3] ? "." + ios[3] : "") : "");

  // The dock row of glass-ui's spring table, released with a flick.
  const ROW = { response: 0.3, zeta: 0.88 };
  const FLICK = 6; // starting velocity, in travels per second
  const x = (t, resp, z, v0) => {
    const w0 = 2 * Math.PI / resp;
    if (z < 1) {
      const wd = w0 * Math.sqrt(1 - z * z), e = Math.exp(-z * w0 * t);
      return 1 - e * (Math.cos(wd * t) + ((z * w0 - v0) / wd) * Math.sin(wd * t));
    }
    return 1 - Math.exp(-w0 * t) * (1 + (w0 - v0) * t);
  };
  // horizon: the last moment the dot is more than 0.3 % of its travel from rest (under a pixel)
  const settle = (resp, z, v0) => {
    let last = 0;
    for (let t = 0.0005; t < 5; t += 0.0005) if (Math.abs(1 - x(t, resp, z, v0)) >= 0.003) last = t;
    return last;
  };
  const params = (k) => {
    const resp = ROW.response * k, v0 = FLICK / k, T = settle(resp, ROW.zeta, v0);
    return { resp, v0, T, f: (p) => x(p * T, resp, ROW.zeta, v0) };
  };

  // D: one cubic-bezier, its first control point carrying the flick, the rest fitted (max error)
  const fitBezier = (f, slope) => {
    const err = (a, b, c) => {
      let m = 0;
      for (let i = 1; i < 120; i++) {
        const u = i / 120, iu = 1 - u;
        const bx = 3 * iu * iu * u * a + 3 * iu * u * u * b + u * u * u;
        const by = 3 * iu * iu * u * a * slope + 3 * iu * u * u * c + u * u * u;
        m = Math.max(m, Math.abs(by - f(bx)));
      }
      return m;
    };
    let best = [1, 0.2, 0.5, 1];
    for (let a = 0.05; a <= 0.6; a += 0.025)
      for (let b = 0.2; b <= 0.98; b += 0.02)
        for (let c = 0.85; c <= 1.15; c += 0.01) {
          const e = err(a, b, c);
          if (e < best[0]) best = [e, a, b, c];
        }
    return best;
  };
  const cache = {};
  const curves = (k) => {
    if (cache[k]) return cache[k];
    const p = params(k);
    const stops = Array.from({ length: 49 }, (_, i) => (i === 48 ? 1 : p.f(i / 48)).toFixed(5));
    const [e, a, b, c] = fitBezier(p.f, p.v0 * p.T);
    const y1 = Math.min(a * p.v0 * p.T, 3);
    return (cache[k] = {
      ...p,
      linear: "linear(" + stops.join(", ") + ")",
      bezier: `cubic-bezier(${a.toFixed(3)}, ${y1.toFixed(3)}, ${b.toFixed(3)}, ${c.toFixed(3)})`,
      fitErr: e,
    });
  };
  const c1 = curves(1);
  document.getElementById("fit").textContent =
    `D’s single curve stays within ${(c1.fitErr * 100).toFixed(1)} % of the spring’s travel; ` +
    `the motion lasts ${(c1.T * 1000).toFixed(0)} ms (×4 when slowed).`;

  const pucks = ["pa", "pb", "pc", "pd"].map((id) => document.getElementById(id));
  const span = () => pucks[0].parentElement.clientWidth - 44;
  let atEnd = false, slow = false;
  const stat = document.getElementById("stat");

  const go = () => {
    const k = slow ? 4 : 1, C = curves(k), D = span();
    const from = atEnd ? D : 0, to = atEnd ? 0 : D;
    atEnd = !atEnd;
    const tf = (v) => `translateX(${v}px)`;
    // A: script writes the transform every frame
    const t0 = performance.now(); let frames = 0;
    const tick = (now) => {
      frames++;
      const p = Math.min(1, (now - t0) / (C.T * 1000));
      pucks[0].style.transform = tf(from + (to - from) * (p < 1 ? C.f(p) : 1));
      if (p < 1) requestAnimationFrame(tick);
      else stat.textContent = `Script frames per second: ${Math.round(frames / ((now - t0) / 1000))}`;
    };
    requestAnimationFrame(tick);
    // B, C, D: handed to the browser
    const opts = { duration: C.T * 1000, fill: "forwards" };
    pucks[1].getAnimations().forEach((a) => a.cancel());
    pucks[1].animate([{ transform: tf(from) }, { transform: tf(to) }], { ...opts, easing: C.linear });
    pucks[2].getAnimations().forEach((a) => a.cancel());
    pucks[2].animate(Array.from({ length: 17 }, (_, i) => ({
      offset: i / 16, easing: "linear",
      transform: tf(from + (to - from) * (i === 16 ? 1 : C.f(i / 16))),
    })), { ...opts, easing: "linear" });
    pucks[3].getAnimations().forEach((a) => a.cancel());
    pucks[3].animate([{ transform: tf(from) }, { transform: tf(to) }], { ...opts, easing: C.bezier });
    const btn = document.getElementById("go");
    btn.disabled = true;
    setTimeout(() => { btn.disabled = false; }, C.T * 1000 + 120);
  };
  document.getElementById("go").addEventListener("click", go);

  let busy = 0;
  document.getElementById("busy").addEventListener("click", (e) => {
    const on = e.currentTarget.getAttribute("aria-pressed") !== "true";
    e.currentTarget.setAttribute("aria-pressed", String(on));
    clearInterval(busy);
    if (on) busy = setInterval(() => { const end = performance.now() + 45; while (performance.now() < end) {} }, 60);
  });
  document.getElementById("slow").addEventListener("click", (e) => {
    slow = e.currentTarget.getAttribute("aria-pressed") !== "true";
    e.currentTarget.setAttribute("aria-pressed", String(slow));
  });
})();
