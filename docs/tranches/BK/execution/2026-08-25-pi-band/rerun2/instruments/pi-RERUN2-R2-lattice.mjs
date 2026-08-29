/** CELL 1 — final lattice pass: the control's own seat population (buttons + triggers + separators). */
import { chromium } from "playwright";
import fs from "node:fs";
const BASE = "http://localhost:5433";
const BANK = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BK/execution/2026-08-25-pi-band/rerun2";

const L = () => {
  const out = [];
  [...document.querySelectorAll(".glass-dock")].forEach((d, i) => {
    const run = d.querySelector(".dock-run"); if (!run) return;
    const cs = getComputedStyle(run), vert = d.classList.contains("vertical");
    const A = (e) => { const r = e.getBoundingClientRect(); return [+r.x.toFixed(2), +r.y.toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)]; };
    const bb = A(run);
    const ml = parseFloat(cs.marginLeft), mr = parseFloat(cs.marginRight), mt = parseFloat(cs.marginTop), mb = parseFloat(cs.marginBottom);
    // the control's lattice population: real boxes inside the run, in document order
    const seats = [...run.querySelectorAll(".dock-icon-button,.dock-trigger,.dock-separator")]
      .filter((s) => getComputedStyle(s).display !== "contents" && s.getBoundingClientRect().width > 0.5);
    const r0 = seats.length ? seats[0].getBoundingClientRect() : null;
    const off = seats.map((s) => { const r = s.getBoundingClientRect(); return +(vert ? r.y - r0.y : r.x - r0.x).toFixed(2); });
    const btns = [...run.querySelectorAll(".dock-icon-button,.dock-trigger")].filter((s) => getComputedStyle(s).display !== "contents" && s.getBoundingClientRect().width > 0.5);
    const crossContent = vert ? parseFloat(cs.width) : parseFloat(cs.height);
    const crossSeat = btns.length ? +(vert ? btns[0].getBoundingClientRect().width : btns[0].getBoundingClientRect().height).toFixed(2) : null;
    out.push({ i, vert, dockCls: d.className.slice(0, 48), dockRect: A(d), runBorderBox: bb,
      runMarginBox: [+(bb[0] - ml).toFixed(2), +(bb[1] - mt).toFixed(2), +(bb[2] + ml + mr).toFixed(2), +(bb[3] + mt + mb).toFixed(2)],
      pad: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft],
      mar: [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft], boxSizing: cs.boxSizing,
      clientW: run.clientWidth, clientH: run.clientHeight, scrollW: run.scrollWidth, scrollH: run.scrollHeight,
      crossContent, crossSeat, crossOverflow: crossSeat == null ? null : +(crossSeat - crossContent).toFixed(2),
      seatOffsets: off, seatCount: seats.length, buttonCount: btns.length,
      pitch: getComputedStyle(d).getPropertyValue("--dock-pitch").trim(), scrollPos: [run.scrollLeft, run.scrollTop] });
  });
  return out;
};

const OUT = {};
const b = await chromium.launch({ headless: true });
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: theme });
  const page = await ctx.newPage();
  await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  await page.goto(BASE + "/dock/overview", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(1800);
  await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme);
  await page.waitForTimeout(700);
  const lat = await page.evaluate(L);
  OUT[`1440-${theme}`] = lat;
  const s = lat.find((x) => x.vert);
  console.log(`--- 1440-${theme} --- sidebar seatOffsets(${s.seatCount})=${JSON.stringify(s.seatOffsets)} crossSeat=${s.crossSeat} crossContent=${s.crossContent} crossOverflow=${s.crossOverflow} marginBox=${JSON.stringify(s.runMarginBox)} pitch=${s.pitch}`);
  console.log(`    i5 dockRect=${JSON.stringify(lat[5].dockRect)} runMarginBox=${JSON.stringify(lat[5].runMarginBox)} crossContent=${lat[5].crossContent} crossSeat=${lat[5].crossSeat} crossOverflow=${lat[5].crossOverflow}`);
  console.log(`    auto i=1,7,8,9,10 crossOverflow=${JSON.stringify([1,7,8,9,10].map(i=>lat[i].crossOverflow))} runMarginBox=${JSON.stringify([1,7,8,9,10].map(i=>lat[i].runMarginBox))}`);
  await ctx.close();
}
await b.close();
for (const k of Object.keys(OUT)) {
  const prev = JSON.parse(fs.readFileSync(`${BANK}/pi-RERUN2-R2-lattice-paired-overview-${k}.json`, "utf8"));
  prev.HEAD = OUT[k];
  prev.seatPopulation = ".dock-icon-button, .dock-trigger, .dock-separator — real boxes only (display:contents has no principal box)";
  fs.writeFileSync(`${BANK}/pi-RERUN2-R2-lattice-paired-overview-${k}.json`, JSON.stringify(prev, null, 1));
}
console.log("REBANKED lattice");
