/**
 * CELL 1 — π-RERUN2-R2, corrections pass.
 *  · margin box = border box EXPANDED by margins (left = bb.x - marginLeft), the control's arithmetic
 *  · crossOverflow = crossSeat - crossContent, the control's definition (i=0 ctl +8, i=1 ctl -16)
 *  · seatOffsets over the run's own children, the control's 14-row lattice
 *  · ARM 9 re-run on a run that ACTUALLY scrolls (the sidebar's scrollMax is 0)
 *  · the ring scan reported inside the ring band as well as raw
 * Screenshot + getComputedStyle only. getContext() NEVER called.
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs";

const BASE = "http://localhost:5433";
const BANK = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BK/execution/2026-08-25-pi-band/rerun2";
const ROUTE = "/dock/overview";

const LATTICE = () => {
  const out = [];
  [...document.querySelectorAll(".glass-dock")].forEach((d, i) => {
    const run = d.querySelector(".dock-run");
    if (!run) return;
    const cs = getComputedStyle(run);
    const vert = d.classList.contains("vertical");
    const A = (e) => { const r = e.getBoundingClientRect(); return [+r.x.toFixed(2), +r.y.toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)]; };
    const bb = A(run);
    const ml = parseFloat(cs.marginLeft), mr = parseFloat(cs.marginRight), mt = parseFloat(cs.marginTop), mb = parseFloat(cs.marginBottom);
    // the margin box is the border box EXPANDED by its margins
    const marginBox = [+(bb[0] - ml).toFixed(2), +(bb[1] - mt).toFixed(2), +(bb[2] + ml + mr).toFixed(2), +(bb[3] + mt + mb).toFixed(2)];
    const kids = [...run.children];
    const seatOffsets = kids.map((s) => +(vert ? s.offsetTop - kids[0].offsetTop : s.offsetLeft - kids[0].offsetLeft).toFixed(2));
    const boxKids = kids.filter((s) => getComputedStyle(s).display !== "contents" && s.getBoundingClientRect().width > 0.5);
    const crossContent = vert ? parseFloat(cs.width) : parseFloat(cs.height);
    const crossSeat = boxKids.length ? +(vert ? boxKids[0].getBoundingClientRect().width : boxKids[0].getBoundingClientRect().height).toFixed(2) : null;
    out.push({
      i, vert, dockCls: d.className.slice(0, 48), dockRect: A(d),
      runBorderBox: bb, runMarginBox: marginBox,
      pad: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft],
      mar: [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft],
      boxSizing: cs.boxSizing,
      clientW: run.clientWidth, clientH: run.clientHeight, scrollW: run.scrollWidth, scrollH: run.scrollHeight,
      crossContent, crossSeat,
      crossOverflow: crossSeat == null ? null : +(crossSeat - crossContent).toFixed(2),
      crossOverflowScrollDef: vert ? run.scrollWidth - run.clientWidth : run.scrollHeight - run.clientHeight,
      seatOffsets, seatCount: kids.length,
      pitch: getComputedStyle(d).getPropertyValue("--dock-pitch").trim(),
      scrollPos: [run.scrollLeft, run.scrollTop],
      scrollMaxCross: vert ? run.scrollWidth - run.clientWidth : run.scrollHeight - run.clientHeight,
      scrollMaxAlong: vert ? run.scrollHeight - run.clientHeight : run.scrollWidth - run.clientWidth,
    });
  });
  return out;
};

const OUT = {};
const browser = await chromium.launch({ headless: true });

for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: theme });
  const page = await ctx.newPage();
  await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  await page.goto(BASE + ROUTE, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(1800);
  await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme);
  await page.waitForTimeout(700);
  const dpr = await page.evaluate(() => window.devicePixelRatio);
  const tag = `1440-${theme}`;

  const lattice = await page.evaluate(LATTICE);
  fs.writeFileSync(`${BANK}/pi-RERUN2-R2-lattice-paired-overview-${tag}.json`,
    JSON.stringify({ url: ROUTE, theme, vw: 1440, dpr,
      marginBoxRule: "margin box = border box expanded by margins: left = borderLeft - marginLeft",
      crossOverflowRule: "crossSeat - crossContent (the control's definition: i=0 ctl +8, i=1 ctl -16)",
      HEAD: lattice }, null, 1));

  /* ARM 9 — the scroll timeline, on a run that ACTUALLY scrolls */
  const timeline = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const cands = [...document.querySelectorAll(".dock-run")].map((run) => {
      const dock = run.closest(".glass-dock"); const vert = dock.classList.contains("vertical");
      const along = vert ? run.scrollHeight - run.clientHeight : run.scrollWidth - run.clientWidth;
      return { run, dock, vert, along };
    }).filter((c) => c.along > 8).sort((a, b) => b.along - a.along);
    if (!cands.length) return { error: "no scrollable run on this route" };
    const results = [];
    for (const c of cands.slice(0, 3)) {
      const { run, dock, vert } = c;
      dock.scrollIntoView({ block: "center", behavior: "instant" }); await wait(650);
      const plate = dock.querySelector(".dock-plate");
      const read = (label) => {
        const cs = getComputedStyle(plate);
        return { label,
          pos: +(vert ? run.scrollTop : run.scrollLeft).toFixed(2),
          max: +(vert ? run.scrollHeight - run.clientHeight : run.scrollWidth - run.clientWidth).toFixed(2),
          animationName: cs.animationName, animationTimeline: cs.animationTimeline,
          animationRange: cs.animationRange, pitch: getComputedStyle(dock).getPropertyValue("--dock-pitch").trim(),
          corners: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius] };
      };
      const set = (v) => { if (vert) run.scrollTop = v; else run.scrollLeft = v; };
      set(0); await wait(650); const rest = read("rest");
      set(c.along / 2); await wait(650); const mid = read("mid-scroll");
      set(c.along + 500); await wait(650); const end = read("flush-at-end");
      set(0); await wait(650); const back = read("back-at-rest");
      const key = (s) => s.corners.join("|");
      results.push({ dockCls: dock.className.slice(0, 52), vert, scrollRange: c.along,
        rest, mid, end, back,
        distinctStates: new Set([key(rest), key(mid), key(end)]).size,
        restEqualsBack: key(rest) === key(back),
        timelineActive: key(rest) !== key(mid) || key(mid) !== key(end),
        wiring: rest.animationTimeline.includes("--dock-run") && rest.animationName.includes("gl-dock-cap") });
    }
    return { candidates: cands.length, results };
  });

  /* ARM 6 — ring, reported inside the ring band too */
  const ring = {};
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600);
  await page.mouse.move(1420, 890);
  let fi = null;
  for (let k = 0; k < 60; k++) {
    await page.keyboard.press("Tab");
    fi = await page.evaluate(() => {
      const a = document.activeElement; if (!a) return null;
      const run = a.closest?.(".dock-run"), dock = a.closest?.(".glass-dock");
      if (!run || !dock?.classList.contains("vertical")) return { ok: false };
      const r = a.getBoundingClientRect(), cs = getComputedStyle(a), rr = run.getBoundingClientRect();
      return { ok: true, seatRect: [+r.x.toFixed(2), +r.y.toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)],
        runRect: [+rr.x.toFixed(2), +rr.y.toFixed(2), +rr.width.toFixed(2), +rr.height.toFixed(2)],
        runClientW: run.clientWidth,
        outlineWidth: parseFloat(cs.outlineWidth), outlineOffset: parseFloat(cs.outlineOffset),
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor} off:${cs.outlineOffset}` };
    });
    if (fi?.ok) break;
  }
  if (fi?.ok) {
    await page.waitForTimeout(600);
    const A = PNG.sync.read(await page.screenshot());
    await page.evaluate(() => document.activeElement?.blur?.()); await page.waitForTimeout(600);
    const B = PNG.sync.read(await page.screenshot());
    const [sx, sy, sw, sh] = fi.seatRect;
    const y = Math.round((sy + sh / 2) * dpr);
    const hits = [];
    for (let x = Math.max(0, Math.round((sx - 16) * dpr)); x < Math.min(A.width, Math.round((sx + sw + 40) * dpr)); x++) {
      const i = (y * A.width + x) << 2;
      const d = Math.max(Math.abs(A.data[i] - B.data[i]), Math.abs(A.data[i + 1] - B.data[i + 1]), Math.abs(A.data[i + 2] - B.data[i + 2]));
      if (d > 8) hits.push(+(x / dpr).toFixed(2));
    }
    // the ring band: seat edge + offset .. + offset + width, on each side
    const off = fi.outlineOffset, ow = fi.outlineWidth;
    const Lband = [sx - off - ow, sx - off], Rband = [sx + sw + off, sx + sw + off + ow];
    const inL = hits.filter((h) => h >= Lband[0] - 0.6 && h <= Lband[1] + 0.6);
    const inR = hits.filter((h) => h >= Rband[0] - 0.6 && h <= Rband[1] + 0.6);
    Object.assign(ring, { seatRect: fi.seatRect, runRect: fi.runRect, runClientW: fi.runClientW, outline: fi.outline,
      scanlineCssY: +(sy + sh / 2).toFixed(2),
      ringBandLeft: Lband.map((v) => +v.toFixed(2)), ringBandRight: Rband.map((v) => +v.toFixed(2)),
      inkInLeftBand: inL, inkInRightBand: inR,
      leftArcPainted: inL.length > 0, rightArcPainted: inR.length > 0, bothArcs: inL.length > 0 && inR.length > 0,
      allInkCssX: hits, inkBeyondRing: hits.filter((h) => h > Rband[1] + 0.6) });
  } else ring.note = "no vertical-run seat reachable by Tab";

  OUT[tag] = { url: ROUTE, viewport: "1440x900", dpr, theme,
    sidebarRun: lattice.find((l) => l.vert), i5: lattice[5],
    autoCrossRuns: [1, 7, 8, 9, 10].map((i) => lattice[i]), timeline, ring };
  const s = OUT[tag].sidebarRun;
  console.log(`--- ${tag} --- marginBox=${JSON.stringify(s.runMarginBox)} crossOverflow=${s.crossOverflow} seatOffsets=${JSON.stringify(s.seatOffsets)} | ring both=${ring.bothArcs} L=${JSON.stringify(ring.inkInLeftBand)} R=${JSON.stringify(ring.inkInRightBand)} beyond=${ring.inkBeyondRing?.length} | tl=${JSON.stringify((timeline.results || []).map((r) => ({ v: r.vert, act: r.timelineActive, d: r.distinctStates, wire: r.wiring, rb: r.restEqualsBack })))}`);
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${BANK}/pi-RERUN2-R2-SUMMARY-corrected.json`, JSON.stringify(OUT, null, 1));
console.log("WROTE corrected summary");
