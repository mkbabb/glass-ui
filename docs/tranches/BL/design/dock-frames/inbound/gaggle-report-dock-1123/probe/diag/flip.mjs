// theme flip: per frame, the computed ink of the dock's words and the plate's paint, with their contrast
const { chromium, webkit } = await import(process.env.PW_MODULE);
const eng = process.argv[2] ?? "chromium";
const browser = await (eng === "webkit" ? webkit : chromium).launch();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function lin(c) { c = Math.max(0, Math.min(1, c)); return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }
function parse(s) {
  let m;
  if ((m = /^rgba?\(([^)]+)\)/.exec(s))) { const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { L: 0.2126 * lin(p[0] / 255) + 0.7152 * lin(p[1] / 255) + 0.0722 * lin(p[2] / 255), a: p[3] ?? 1 }; }
  if ((m = /^color\(srgb ([^)]+)\)/.exec(s))) { const p = m[1].split(/[ /]+/).filter(Boolean).map(Number); return { L: 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]), a: p[3] ?? 1 }; }
  const ok = (l, a, b, al) => { const l_ = l + 0.3963377774 * a + 0.2158037573 * b, m_ = l - 0.1055613458 * a - 0.0638541728 * b, s_ = l - 0.0894841775 * a - 1.291485548 * b; const L3 = l_ ** 3, M3 = m_ ** 3, S3 = s_ ** 3; const r = 4.0767416621 * L3 - 3.3077115913 * M3 + 0.2309699292 * S3, g = -1.2684380046 * L3 + 2.6097574011 * M3 - 0.3413193965 * S3, bb = -0.0041960863 * L3 - 0.7034186147 * M3 + 1.707614701 * S3; return { L: 0.2126 * Math.max(0, r) + 0.7152 * Math.max(0, g) + 0.0722 * Math.max(0, bb), a: al }; };
  if ((m = /^oklch\(([^)]+)\)/.exec(s))) { const p = m[1].split(/[ /]+/).filter(Boolean).map(parseFloat); const h = (p[2] || 0) * Math.PI / 180; return ok(p[0], p[1] * Math.cos(h), p[1] * Math.sin(h), p[3] ?? 1); }
  if ((m = /^oklab\(([^)]+)\)/.exec(s))) { const p = m[1].split(/[ /]+/).filter(Boolean).map(parseFloat); return ok(p[0], p[1], p[2], p[3] ?? 1); }
  return null;
}
const cr = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: process.argv[3] ?? "light" });
  try {
    const page = await ctx.newPage();
    await page.goto("http://127.0.0.1:5437/team/nov23/", { waitUntil: "load" });
    await sleep(3000);
    const info = await page.evaluate(() => {
      const d = document.querySelector(".r-dock-seat .glass-dock");
      const plate = d.querySelector(".dock-plate");
      const word = d.querySelector('[data-seat="section"]:not([aria-current]) .r-seat--section');
      const seat = word.closest('[data-seat="section"]');
      const pick = (el, ps) => Object.fromEntries(ps.map((p) => [p, getComputedStyle(el)[p]]));
      return { word: pick(word, ["color", "transition"]), seat: pick(seat, ["color", "transition"]), plate: pick(plate, ["backgroundColor", "backgroundImage", "transition", "opacity"]), plateBefore: getComputedStyle(plate, "::before").backgroundColor, dock: pick(d, ["backgroundColor", "transition"]), lampText: pick(d.querySelector(".kit-lamp-seat"), ["color", "transition"]), bodyTransition: getComputedStyle(document.body).transition, htmlColorScheme: getComputedStyle(document.documentElement).colorScheme };
    });
    console.log(JSON.stringify(info, null, 1));
    await page.evaluate(() => {
      const d = document.querySelector(".r-dock-seat .glass-dock");
      const plate = d.querySelector(".dock-plate");
      const word = d.querySelector('[data-seat="section"]:not([aria-current]) .r-seat--section');
      const lamp = d.querySelector(".kit-lamp-seat");
      window.__flip = [];
      const t0 = performance.now();
      const loop = () => { window.__flip.push({ t: +(performance.now() - t0).toFixed(1), dark: document.documentElement.classList.contains("dark"), word: getComputedStyle(word).color, lamp: getComputedStyle(lamp).color, plate: getComputedStyle(plate).backgroundColor, plateB: getComputedStyle(plate, "::before").backgroundColor }); if (performance.now() - t0 < 1500) requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    });
    await sleep(200);
    await page.locator('.r-dock-seat [data-seat="theme"] .dark-mode-toggle-button').click();
    await sleep(1500);
    const fr = await page.evaluate(() => window.__flip);
    let prev = "";
    for (const f of fr) {
      const k = f.word + f.plate + f.dark;
      if (k === prev) continue; prev = k;
      const w = parse(f.word), p = parse(f.plate);
      console.log(f.t, f.dark ? "dark " : "light", "word", f.word, "| plate", f.plate, "| ::before", f.plateB, w && p ? "| contrast(word, plate if opaque) " + cr(w.L, p.L).toFixed(2) + " plate alpha " + p.a : "");
    }
  } finally { await ctx.close(); }
} finally { await browser.close(); }
