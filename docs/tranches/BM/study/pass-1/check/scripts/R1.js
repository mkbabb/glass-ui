
(() => {
  const ua = navigator.userAgent;
  const safari = (ua.match(/Version\/([\d.]+)/) || [])[1];
  const ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
  const shapeOK = window.CSS && CSS.supports && CSS.supports("clip-path", "shape(from 0px 0px, line to 10px 10px, close)");
  document.getElementById("env").textContent =
    (safari ? "Safari " + safari : "Browser: " + (ua.match(/(Chrome|Firefox)\/[\d.]+/) || ["unknown"])[0]) +
    (ios ? " · iOS " + ios[1] + "." + ios[2] + (ios[3] ? "." + ios[3] : "") : "") +
    " · drawn-shape clip " + (shapeOK ? "supported" : "not supported");

  // C: a rounded rectangle written as shape(), stepped by script so the fold moves
  // even where the browser cannot tween shape() itself.
  const plate = document.getElementById("plate-c");
  const W = 120, H = 120;
  const rect = (inset) => {
    const r = 28, L = inset, T = inset, R = W - inset, B = H - inset;
    return `shape(from ${L + r}px ${T}px, hline to ${R - r}px, arc to ${R}px ${T + r}px of ${r}px cw, ` +
      `vline to ${B - r}px, arc to ${R - r}px ${B}px of ${r}px cw, hline to ${L + r}px, ` +
      `arc to ${L}px ${B - r}px of ${r}px cw, vline to ${T + r}px, arc to ${L + r}px ${T}px of ${r}px cw, close)`;
  };
  if (shapeOK) plate.style.clipPath = rect(0);
  else {
    const n = document.createElement("div");
    n.className = "unsupported"; n.textContent = "drawn-shape clip not supported here";
    document.getElementById("stage-c").appendChild(n);
  }
  // the same curve as the CSS transitions on A, B and D: cubic-bezier(0.3, 0.7, 0.2, 1) over 0.5 s
  const bez = (p1x, p1y, p2x, p2y) => (x) => {
    let lo = 0, hi = 1, u = x;
    for (let i = 0; i < 24; i++) {
      u = (lo + hi) / 2;
      const bx = 3 * (1 - u) * (1 - u) * u * p1x + 3 * (1 - u) * u * u * p2x + u * u * u;
      if (bx < x) lo = u; else hi = u;
    }
    return 3 * (1 - u) * (1 - u) * u * p1y + 3 * (1 - u) * u * u * p2y + u * u * u;
  };
  const ease = bez(0.3, 0.7, 0.2, 1);
  let from = 0, to = 0, t0 = 0, raf = 0, cur = 0;
  const step = (now) => {
    const p = Math.min(1, (now - t0) / 500);
    cur = from + (to - from) * ease(p);
    plate.style.clipPath = rect(cur);
    if (p < 1) raf = requestAnimationFrame(step);
  };
  const btn = document.getElementById("fold");
  btn.addEventListener("click", () => {
    const folded = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", String(folded));
    btn.textContent = folded ? "Open" : "Fold";
    document.getElementById("grid").classList.toggle("folded", folded);
    if (shapeOK) { cancelAnimationFrame(raf); from = cur; to = folded ? 32 : 0; t0 = performance.now(); raf = requestAnimationFrame(step); }
  });
})();
