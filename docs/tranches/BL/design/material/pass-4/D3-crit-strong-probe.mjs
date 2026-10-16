#!/usr/bin/env node
// D3-crit-strong-probe.mjs · the critic's attack on R-1's rationale ("an ink lighter than the muted clears every plate
// the muted clears"). On the surfaces that REPLACE the muted ink with `--on-glass-muted-strong` (ladder.css:
// `.feedback-tone, .glass-capsule, .glass-capsule-track`), the muted ink is not what clears them, so the claim says
// nothing there. This probe opens demo stories in a theme, finds every visible text run whose computed colour is the
// `-strong` ink and that sits inside one of those three hosts, and reads WCAG contrast of the ink against the run's
// own background: the median of the run's box captured with the run's text made transparent.
//   node D3-crit-strong-probe.mjs <demo-dist> --label x [--theme dark] [--engine chromium] [--routes a,b]
// Read-only on a page: no getContext() on any canvas. Browser closed in finally.
import path from "node:path";
import fs from "node:fs";
import { playwright, serve, cli, list, PNG, cr, hex, CHROMIUM_ARGS, VIEW, oklchLin } from "../harness/lib.mjs";
// computed colour → 8-bit sRGB: Chromium returns oklch() for an oklch token (the live-π paint-arm trap)
const enc = (c) => 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.max(0, c) ** (1 / 2.4) - 0.055);
const toRgb = (s) => { const n = s.match(/-?[\d.]+/g).map(Number); return /^oklch/.test(s) ? oklchLin(n[0], n[1], n[2]).map((c) => Math.round(Math.min(255, Math.max(0, enc(Math.min(1, c)))))) : n.slice(0, 3); };

const a = cli({ label: { type: "string" }, theme: { type: "string" }, engine: { type: "string" }, routes: { type: "string" }, out: { type: "string" } });
const dist = path.resolve(a._[0]), theme = a.theme || "dark", engine = a.engine || "chromium";
const routes = list(a.routes, ["/containers/configurator", "/substrates/aurora", "/feedback/toast", "/data-display/chip", "/navigation/tabs", "/inputs/toggle-group"]);
const pw = await playwright(), srv = await serve(dist);
const browser = await pw[engine].launch(engine === "chromium" ? { args: CHROMIUM_ARGS } : {});
const rows = [];
try {
  for (const r of routes) {
    const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    try {
      await page.goto(`${srv.url}?capture=${r}&mode=${theme}`, { waitUntil: "load", timeout: 120000 });
      await page.waitForTimeout(2500);
      const strong = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--on-glass-muted-strong").trim());
      // tag every candidate run (a leaf-ish element with own text, inside a host, painting the -strong ink)
      const runs = await page.evaluate(() => {
        const probe = document.createElement("span"); probe.style.color = "var(--on-glass-muted-strong)"; document.body.appendChild(probe);
        const out = []; let n = 0;
        const hosts = document.querySelectorAll(".feedback-tone, .glass-capsule, .glass-capsule-track");
        for (const h of hosts) {
          probe.remove(); h.appendChild(probe); const ink = getComputedStyle(probe).color; probe.remove();
          for (const el of h.querySelectorAll("*")) {
            const own = [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim());
            if (!own) continue;
            const cs = getComputedStyle(el), b = el.getBoundingClientRect();
            if (cs.color !== ink || b.width < 4 || b.height < 4 || cs.visibility === "hidden" || +cs.opacity === 0) continue;
            if (b.bottom < 0 || b.top > innerHeight || b.right < 0 || b.left > innerWidth) continue;
            el.setAttribute("data-crit-run", String(n));
            out.push({ i: n++, ink, host: h.className.toString().slice(0, 80), text: el.textContent.trim().slice(0, 40), box: [b.left, b.top, b.width, b.height].map(Math.round) });
          }
        }
        return out;
      });
      for (const run of runs) {
        const el = page.locator(`[data-crit-run="${run.i}"]`);
        const clip = { x: Math.max(0, run.box[0]), y: Math.max(0, run.box[1]), width: Math.min(run.box[2], VIEW.width - Math.max(0, run.box[0])), height: Math.min(run.box[3], VIEW.height - Math.max(0, run.box[1])) };
        if (clip.width < 2 || clip.height < 2) continue;
        await el.evaluate((e) => { e.dataset.critColor = e.style.color; e.style.setProperty("color", "transparent", "important"); });
        const png = PNG.sync.read(await page.screenshot({ clip }));
        await el.evaluate((e) => { e.style.color = e.dataset.critColor; });
        const px = []; for (let k = 0; k < png.data.length; k += 4) px.push([png.data[k], png.data[k + 1], png.data[k + 2]]);
        const Ls = px.map((p) => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2]); const idx = Ls.map((v, i) => i).sort((x, y) => Ls[x] - Ls[y]);
        const med = px[idx[Math.floor(idx.length / 2)]], hi = px[idx[Math.floor(idx.length * 0.95)]];
        const ink = toRgb(run.ink);
        rows.push({ route: r, ...run, bg: hex(med), cr: +cr(ink, med).toFixed(2), crHi: +cr(ink, hi).toFixed(2), inkHex: hex(ink), strong });
      }
    } catch (e) { rows.push({ route: r, error: String(e).slice(0, 160) }); }
    finally { await ctx.close(); }
  }
} finally { await browser.close(); srv.close(); }
for (const x of rows) console.log(x.error ? `${x.route} ERROR ${x.error}` : `${x.route} | ${x.host} | "${x.text}" | ink ${x.inkHex} | bg med ${x.bg} | CR ${x.cr} (p95-bright ${x.crHi})${x.cr < 4.5 ? " ✗" : ""}`);
const ok = rows.filter((x) => !x.error), red = ok.filter((x) => x.cr < 4.5);
console.log(`STRONG-PROBE ${a.label} ${engine} ${theme}: ${ok.length} runs, ${red.length} under 4.5, min ${ok.length ? Math.min(...ok.map((x) => x.cr)).toFixed(2) : "—"}`);
if (a.out) fs.writeFileSync(a.out, JSON.stringify(rows, null, 1));
