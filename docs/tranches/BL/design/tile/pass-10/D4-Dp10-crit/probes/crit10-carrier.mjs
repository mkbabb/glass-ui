#!/usr/bin/env node
// D4 pass 10 · CRITIC probe for re-read (a) (REGISTRY §P9-6): with the weight step gone, what carries a selected PILL
// apart from colour? Q-10 (b) gives a pill no 3:1 carrier of its own, and the library's records (pass 9) said a pill
// carried its state "on ink and weight". This probe reads, on painted pixels, the same pill at rest (nothing selected)
// and selected (a real click, pointer parked, focus blurred so no ring is in the frame), per scene × mode × pointer:
//   fill      the pill's fill (the luminance median of its box, inset 2 px), rest → selected, and their contrast
//   ink       the pill's glyph ink (the mean of the 3 % of its pixels farthest in luminance from its fill), rest →
//             selected, their contrast with each other, and each against its own fill (legibility)
//   c3        T-3's pixel read (lib.mjs `compare`): the area that changes by ≥ 3:1 between rest and selected, CSS px²
//   glyph     the count of glyph pixels (luminance distance from the fill above half the ink's), selected / rest: the
//             weight's own signal (1.00 when the weight does not move)
//   chroma    the oklab chroma of the selected fill and ink: what a colour-blind or greyscale reader loses
// Every cell is INFO: the gestalt row (G) is ruled on frames by the critic, and Q-10 (b) sets no pill bar. Run it on
// D′ v9 and on the planted `weight-step` library, so the weight's share of the carrier is a number.
//   node crit10-carrier.mjs --build <route build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2, shot, compare, lum, contrast, oklab, hex } from "../../../harness/lib.mjs";

const SCENES = ["single", "pill-icon", "pill-badge", "pillwrap-migrated"];
const PICK = 1; // the pill read: the second, so its neighbours on both sides are rest pills
function stats(s, r) {
  const { png, clip, dsf } = s, px = [];
  const x0 = Math.round((r.x + 2 - clip.x) * dsf), y0 = Math.round((r.y + 2 - clip.y) * dsf), x1 = Math.round((r.x + r.w - 2 - clip.x) * dsf), y1 = Math.round((r.y + r.h - 2 - clip.y) * dsf);
  for (let y = Math.max(0, y0); y < Math.min(png.height, y1); y++) for (let x = Math.max(0, x0); x < Math.min(png.width, x1); x++) { const i = (y * png.width + x) * 4; px.push([png.data[i], png.data[i + 1], png.data[i + 2]]); }
  const L = px.map(lum), order = L.map((v, i) => i).sort((a, b) => L[a] - L[b]);
  const fill = px[order[Math.floor(order.length / 2)]], lf = lum(fill);
  const far = L.map((v, i) => [Math.abs(v - lf), i]).sort((a, b) => b[0] - a[0]);
  const top = far.slice(0, Math.max(1, Math.floor(far.length * 0.03)));
  const ink = [0, 1, 2].map((c) => top.reduce((s, [, i]) => s + px[i][c], 0) / top.length);
  const half = Math.abs(lum(ink) - lf) / 2;
  const glyph = L.filter((v) => Math.abs(v - lf) > half).length;
  return { fill, ink, glyph };
}
const chroma = (c) => { const [, a, b] = oklab(c); return Math.hypot(a, b); };
const settle = async (page) => { await page.waitForTimeout(150); for (let t = 0; t < 80; t++) { if (!(await page.evaluate(() => document.getAnimations().some((a) => a.playState === "running")))) break; await page.waitForTimeout(50); } await page.waitForTimeout(100); };

await cli("CRIT10-CARRIER", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const scene of SCENES) for (const mode of ["light", "dark", "prt"]) for (const coarse of [false, true]) {
    const P = await openPage(target, engine, scene, { mode, coarse, query: { sel: "none" } });
    let line = "", err = null;
    try {
      const { page } = P;
      await page.mouse.move(2, 2); await page.evaluate(() => window.__tile?.select?.(null)); await settle(page);
      const loc = page.locator("[data-scene] [data-item]");
      await loc.nth(PICK).scrollIntoViewIfNeeded(); await settle(page);
      const b0 = await loc.nth(PICK).boundingBox(), r = { x: b0.x, y: b0.y, w: b0.width, h: b0.height };
      const clip = { x: Math.floor(r.x), y: Math.floor(r.y), width: Math.ceil(r.w), height: Math.ceil(r.h) };
      const A = await shot(page, clip);
      await loc.nth(PICK).click(); await page.mouse.move(2, 2); await page.evaluate(() => document.activeElement?.blur?.()); await settle(page);
      const b1 = await loc.nth(PICK).boundingBox();
      const on = await loc.nth(PICK).evaluate((el) => el.dataset.state === "on" || el.getAttribute("aria-checked") === "true");
      const B = await shot(page, clip);
      const sa = stats(A, r), sb = stats(B, r);
      const cmp = compare(A, B), d2 = A.dsf * A.dsf;
      const fw = await loc.nth(PICK).evaluate((el) => getComputedStyle(el).fontWeight);
      line = `${scene} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} ${coarse ? "coarse" : "fine"} · pill ${PICK} ${f2(r.w)}×${f2(r.h)} → ${f2(b1.width)}×${f2(b1.height)}${on ? "" : " NOT ON (vacuous)"} · weight ${fw} · fill ${hex(sa.fill)} → ${hex(sb.fill)} (${f2(contrast(sa.fill, sb.fill))}:1) · ink ${hex(sa.ink)} → ${hex(sb.ink)} (${f2(contrast(sa.ink, sb.ink))}:1 to each other; on own fill ${f2(contrast(sa.ink, sa.fill))}:1 → ${f2(contrast(sb.ink, sb.fill))}:1) · c3 ${f2(cmp.c3 / d2)} px² of ${f2(r.w * r.h)} · glyph selected/rest ${f2(sb.glyph / Math.max(1, sa.glyph))} · chroma fill ${chroma(sb.fill).toFixed(3)} ink ${chroma(sb.ink).toFixed(3)}`;
    } catch (e) { err = String(e.message ?? e).slice(0, 200); } finally { await P.close(); }
    cells.push({ gating: false, pass: !err, line: err ? `${scene} ${mode} ${coarse ? "coarse" : "fine"} · probe error: ${err}` : line });
  }
  return { id: "CRIT10-CARRIER", title: "re-read (a) in numbers: what carries a selected pill without the weight step (pass-10 critic probe, info only)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
