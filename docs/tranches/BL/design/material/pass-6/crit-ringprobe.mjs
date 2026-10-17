#!/usr/bin/env node
// crit-ringprobe.mjs · D3 pass 6, the critic: row 6 (M-3), the real Dialog's Close ring under H6's headless shell.
// M-3 reads the ring as the mean of the outline's `ow` pixel rows starting at round(rect.top) - offset - ow, against
// the row just inside and just outside (lib.mjs edgeContrast). This probe asks whether 2.66 is the ring's paint or the
// sampling: it opens the specimen dialog cell (light, paper and white), focuses Close with keyboard modality exactly as
// capture.mjs does, and prints (1) the fractional rect, outline width, offset and computed outline colour, (2) the
// per-row pixel profile of the centre column from 4 rows above the band to 4 below, (3) the contrast of the SOLID
// computed ring colour composited over the plate pixel next to it, and (4) the M-3 band reading at the rounded top
// and at the best-aligned integer top. Headless shell, no launch arguments; one browser per run, one context per cell,
// every page, context, server and browser closed in a finally. No canvas is touched.
//   node crit-ringprobe.mjs <specimen-dist> --label <name> [--engines chromium] [--out <json>]
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { cli, list, serve, playwright, VIEW, PNG, cr, hex, f } from "../harness/lib.mjs";

const a = cli({ label: { type: "string" }, engines: { type: "string" }, out: { type: "string" }, grounds: { type: "string" } });
const dist = path.resolve(a._[0] || ""), label = a.label || "build";
const load = () => os.loadavg().map((x) => x.toFixed(1)).join(" ");
const doc = { label, dist, when: new Date().toISOString(), load: load(), rows: [] };
const parse = (s) => { const m = String(s).match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { rgb: v.slice(0, 3), a: v.length > 3 ? v[3] : 1 }; };
const pw = await playwright();
for (const engine of list(a.engines, ["chromium"])) {
  const browser = await pw[engine].launch({ headless: true });
  const srv = await serve(dist);
  try {
    for (const theme of ["light", "dark"]) for (const ground of list(a.grounds, ["paper", "white"])) {
      const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
      const rec = { engine, theme, ground };
      try {
        const page = await ctx.newPage();
        await page.goto(`${srv.url}index.html?scene=dialog&ground=${ground}&theme=${theme}`, { waitUntil: "load", timeout: 120000 });
        await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2500);
        await page.mouse.move(VIEW.width - 1, VIEW.height - 1);
        await page.keyboard.press("Shift"); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
        const ok = await page.evaluate(() => { const el = document.querySelector('[data-slot="dialog-close"]'); if (!el) return false; el.focus({ preventScroll: true }); return true; });
        if (!ok) throw new Error("no dialog-close");
        await page.waitForTimeout(450);
        const g = await page.evaluate(() => { const el = document.activeElement, cs = getComputedStyle(el), r = el.getBoundingClientRect();
          let t = el, tf = []; while (t && t !== document.documentElement) { const s = getComputedStyle(t).transform; if (s && s !== "none") tf.push(s); t = t.parentElement; }
          return { top: r.top, left: r.left, width: r.width, height: r.height, ow: parseFloat(cs.outlineWidth), off: parseFloat(cs.outlineOffset), style: cs.outlineStyle,
            color: cs.outlineColor, fv: el.matches(":focus-visible"), transforms: tf }; });
        Object.assign(rec, g);
        const T = Math.round(g.top), ow = Math.round(g.ow), off = Math.round(g.off), top = T - off - ow;
        const cx = Math.round(g.left + g.width / 2);
        const clip = { x: cx - 2, y: top - 6, width: 5, height: ow + 12 };
        const png = PNG.sync.read(await page.screenshot({ type: "png", clip }));
        const px = (y) => { const i = (y * png.width + 2) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
        rec.profile = []; for (let y = 0; y < png.height; y++) rec.profile.push({ y: clip.y + y, hex: hex(px(y)) });
        const at = (yy) => px(yy - clip.y);
        const bandRead = (t0) => { const b = [0, 1, 2].map((k) => [...Array(ow).keys()].reduce((s, j) => s + at(t0 + j)[k], 0) / ow);
          return Math.min(cr(b, at(t0 + ow)), cr(b, at(t0 - 1))); };
        rec.m3AtRounded = bandRead(top);
        rec.m3Best = Math.max(...[-1, 0, 1].map((d) => bandRead(top + d)));
        const ring = parse(g.color), plate = at(top - 2);
        if (ring) { const comp = ring.rgb.map((c, k) => c * ring.a + plate[k] * (1 - ring.a)); rec.solid = { ring: g.color, plate: hex(plate), composite: hex(comp), cr: cr(comp, plate) }; }
      } catch (e) { rec.error = String(e).split("\n")[0].slice(0, 200); }
      finally { await ctx.close(); }
      doc.rows.push(rec);
      console.log(`RING ${engine} ${theme} ${ground} ${label}: top ${f(rec.top, 3)} ow ${rec.ow} off ${rec.off} fv ${rec.fv} transforms ${rec.transforms?.length ?? "—"} · colour ${rec.color} · solid composite ${rec.solid?.composite} over ${rec.solid?.plate} cr ${f(rec.solid?.cr)} · M-3 band at round(top) ${f(rec.m3AtRounded)} · best of ±1 ${f(rec.m3Best)} · profile ${(rec.profile || []).map((p) => p.hex).join(" ")}${rec.error ? " · ERROR " + rec.error : ""}`);
    }
  } finally { srv.close(); await browser.close(); }
}
doc.loadEnd = load();
if (a.out) fs.writeFileSync(path.resolve(a.out), JSON.stringify(doc, null, 1));
console.log(`RINGPROBE ${label} · load ${doc.load} → ${doc.loadEnd}`);
