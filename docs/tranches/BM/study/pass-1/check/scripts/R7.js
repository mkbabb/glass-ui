
(() => {
  const ua = navigator.userAgent;
  const safari = (ua.match(/Version\/([\d.]+)/) || [])[1];
  const ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
  document.getElementById("env").textContent =
    (safari ? "Safari " + safari : "Browser: " + (ua.match(/(Chrome|Firefox)\/[\d.]+/) || ["unknown"])[0]) +
    (ios ? " · iOS " + ios[1] + "." + ios[2] + (ios[3] ? "." + ios[3] : "") : "");
  // glass-ui's present spring (response 0.22 s, damping 1), sampled as a linear() curve over 0.2 s
  const resp = 0.22, w0 = 2 * Math.PI / resp, T = 0.2;
  const stops = Array.from({ length: 33 }, (_, i) => {
    if (i === 32) return "1";
    const t = (i / 32) * T;
    return (1 - Math.exp(-w0 * t) * (1 + w0 * t)).toFixed(4);
  });
  const root = document.documentElement.style;
  root.setProperty("--spring", "linear(" + stops.join(", ") + ")");
  root.setProperty("--exit", "cubic-bezier(0.3, 0.2, 0.7, 0.8)");
  const grid = document.getElementById("grid"), show = document.getElementById("show");
  show.addEventListener("click", () => {
    const on = !grid.classList.contains("shown");
    grid.classList.toggle("shown", on);
    show.textContent = on ? "Hide" : "Show";
  });
  document.getElementById("slow").addEventListener("click", (e) => {
    const slow = e.currentTarget.getAttribute("aria-pressed") !== "true";
    e.currentTarget.setAttribute("aria-pressed", String(slow));
    root.setProperty("--in", slow ? "800ms" : "200ms");
    root.setProperty("--out", slow ? "480ms" : "120ms");
  });
})();
