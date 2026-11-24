
(() => {
  const ua = navigator.userAgent;
  const safari = (ua.match(/Version\/([\d.]+)/) || [])[1];
  const ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
  document.getElementById("env").textContent =
    (safari ? "Safari " + safari : "Browser: " + (ua.match(/(Chrome|Firefox)\/[\d.]+/) || ["unknown"])[0]) +
    (ios ? " · iOS " + ios[1] + "." + ios[2] + (ios[3] ? "." + ios[3] : "") : "");

  const SPRINGS = { A: [0.22, 1.0], B: [0.42, 0.9], C: [0.4, 0.71], D: [0.341, 0.758] };
  const pos = (t, resp, z) => {
    const w0 = 2 * Math.PI / resp;
    if (z >= 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const wd = w0 * Math.sqrt(1 - z * z), e = Math.exp(-z * w0 * t);
    return 1 - e * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t));
  };
  const stage = document.getElementById("stage"), menu = document.getElementById("menu");
  let slow = false, open = null, raf = 0, closeTimer = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  const close = () => {
    if (!open) return;
    open.setAttribute("aria-expanded", "false"); open = null;
    cancelAnimationFrame(raf);
    menu.classList.add("leaving");
    closeTimer = setTimeout(() => { menu.hidden = true; menu.classList.remove("leaving", "content"); }, 120);
  };
  const openFrom = (seat) => {
    clearTimeout(closeTimer); cancelAnimationFrame(raf);
    menu.classList.remove("leaving", "content"); menu.hidden = false;
    open = seat; seat.setAttribute("aria-expanded", "true");
    const sr = stage.getBoundingClientRect(), br = seat.getBoundingClientRect();
    const W = Math.min(250, sr.width - 16), Hh = 5 * 44 + 16;
    const x0 = br.left - sr.left, y0 = br.top - sr.top;
    const x1 = Math.max(8, Math.min(x0, sr.width - W - 8)), y1 = y0 + 44 + 8;
    menu.style.setProperty("--w", W + "px");
    const [resp0, z] = SPRINGS[seat.dataset.k], resp = resp0 * (slow ? 4 : 1);
    const t0 = performance.now();
    const step = (now) => {
      const tau = (now - t0) / 1000, p = pos(tau, resp, z);
      menu.style.left = lerp(x0, x1, p) + "px"; menu.style.top = lerp(y0, y1, p) + "px";
      menu.style.width = Math.max(0, lerp(44, W, p)) + "px"; menu.style.height = Math.max(0, lerp(44, Hh, p)) + "px";
      menu.style.borderRadius = lerp(22, 26, Math.min(1, p)) + "px";
      if (p > 0.6) menu.classList.add("content");
      if (tau < resp * 2.2) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  document.querySelectorAll(".seat").forEach((s) => s.addEventListener("click", (e) => {
    e.stopPropagation();
    if (open === s) close(); else { if (open) open.setAttribute("aria-expanded", "false"); openFrom(s); }
  }));
  stage.addEventListener("click", (e) => { if (!menu.contains(e.target)) close(); });
  menu.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.getElementById("slow").addEventListener("click", (e) => {
    slow = e.currentTarget.getAttribute("aria-pressed") !== "true";
    e.currentTarget.setAttribute("aria-pressed", String(slow));
  });
})();
