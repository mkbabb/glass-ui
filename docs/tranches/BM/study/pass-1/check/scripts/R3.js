
(() => {
  const ua = navigator.userAgent;
  const safari = (ua.match(/Version\/([\d.]+)/) || [])[1];
  const ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
  document.getElementById("env").textContent =
    (safari ? "Safari " + safari : "Browser: " + (ua.match(/(Chrome|Firefox)\/[\d.]+/) || ["unknown"])[0]) +
    (ios ? " · iOS " + ios[1] + "." + ios[2] + (ios[3] ? "." + ios[3] : "") : "");
  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.5v9h5.5v-6h3v6H19v-9h2.5z"/></svg>';
  const grounds = [["White", "white"], ["Black", "black"], ["Grey", "grey"], ["Photo", "photo"], ["Colour field", "field"]];
  document.getElementById("bands").innerHTML = grounds.map(([name, cls]) =>
    `<h2>${name}</h2><div class="band ${cls}"><div class="plates">` +
    ["A", "B", "C", "D"].map((k) => `<div class="plate ${k}">${icon}Home</div>`).join("") +
    `</div></div>`).join("");
  const root = document.documentElement;
  document.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => {
    const m = b.dataset.mode;
    if (m === "system") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", m);
    document.querySelectorAll(".seg button").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
  }));
})();
