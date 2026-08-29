/**
 * CELL 1 — π-RERUN2-R2 (corrected instrument).
 * Screenshot + getComputedStyle only. getContext() NEVER called. dpr-scale before cropping.
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs";

const BASE = "http://localhost:5433";
const BANK = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BK/execution/2026-08-25-pi-band/rerun2";
const ROUTE = "/dock/overview";

const CENSUS = () => {
  const clipperOf = (el) => {
    let p = el.parentElement;
    while (p && p !== document.documentElement) {
      const cs = getComputedStyle(p);
      if (cs.overflowX !== "visible" || cs.overflowY !== "visible") return p;
      p = p.parentElement;
    }
    return null;
  };
  const rows = [], skipped = [];
  const reserveSeen = new Set();
  for (const run of document.querySelectorAll(".dock-run")) {
    const dock = run.closest(".glass-dock");
    const vertical = !!dock?.classList.contains("vertical");
    const rcs = getComputedStyle(run);
    const reserve = parseFloat(vertical ? rcs.paddingLeft : rcs.paddingTop) || 0;
    reserveSeen.add(reserve);
    const clipper = clipperOf(run.firstElementChild || run);
    if (!clipper) continue;
    const cr = clipper.getBoundingClientRect();
    const cbox = {
      left: cr.left + clipper.clientLeft, top: cr.top + clipper.clientTop,
      right: cr.left + clipper.clientLeft + clipper.clientWidth,
      bottom: cr.top + clipper.clientTop + clipper.clientHeight,
    };
    const ccs = getComputedStyle(clipper);
    // REAL SEATS ONLY: an element with a principal box. `display:contents` has none, so its
    // getBoundingClientRect() is the union of its descendants and measures nothing real.
    const cand = [...run.querySelectorAll(".dock-icon-button,.dock-trigger,button,[role='button'],.dock-separator")];
    for (const seat of cand) {
      const scs = getComputedStyle(seat);
      const s = seat.getBoundingClientRect();
      if (scs.display === "contents") { skipped.push({ why: "display:contents", cls: seat.className.slice(0, 40) }); continue; }
      if (s.width < 0.5 || s.height < 0.5) { skipped.push({ why: "zero-area", cls: seat.className.slice(0, 40) }); continue; }
      if (scs.visibility === "hidden" || scs.display === "none") { skipped.push({ why: "not-rendered", cls: seat.className.slice(0, 40) }); continue; }
      const ring = { left: s.left - reserve, top: s.top - reserve, right: s.right + reserve, bottom: s.bottom + reserve };
      const cut = {
        left: Math.max(0, cbox.left - ring.left), right: Math.max(0, ring.right - cbox.right),
        top: Math.max(0, cbox.top - ring.top), bottom: Math.max(0, ring.bottom - cbox.bottom),
      };
      const axisOf = vertical
        ? { left: "cross", right: "cross", top: "scroll", bottom: "scroll" }
        : { left: "scroll", right: "scroll", top: "cross", bottom: "cross" };
      const edges = [], ax = {};
      let crossCut = 0, scrollCut = 0;
      for (const k of ["left", "right", "top", "bottom"]) {
        if (cut[k] > 0.5) { edges.push(`${k}:${+cut[k].toFixed(2)}`); ax[k] = axisOf[k]; if (axisOf[k] === "cross") crossCut = 1; else scrollCut = 1; }
      }
      const isSeparator = seat.classList.contains("dock-separator");
      rows.push({
        cls: seat.className.slice(0, 44), isSeparator, vertical, reserve,
        dockCls: (dock?.className || "").slice(0, 44),
        clipperCls: clipper.className.slice(0, 60), clipperOverflow: `${ccs.overflowX}/${ccs.overflowY}`,
        seatRect: [+s.x.toFixed(2), +s.y.toFixed(2), +s.width.toFixed(2), +s.height.toFixed(2)],
        clipperClientBox: [+cbox.left.toFixed(2), +cbox.top.toFixed(2), +(cbox.right - cbox.left).toFixed(2), +(cbox.bottom - cbox.top).toFixed(2)],
        clippedEdges: edges, axisOf: ax, crossCut, scrollCut,
        atScrollStart: vertical ? clipper.scrollTop <= 0.5 : clipper.scrollLeft <= 0.5,
        atScrollEnd: vertical ? clipper.scrollTop >= clipper.scrollHeight - clipper.clientHeight - 0.5
          : clipper.scrollLeft >= clipper.scrollWidth - clipper.clientWidth - 0.5,
        scrollable: vertical ? clipper.scrollHeight > clipper.clientHeight + 0.5 : clipper.scrollWidth > clipper.clientWidth + 0.5,
      });
    }
  }
  const F = (p) => rows.filter(p).length;
  const focusable = rows.filter((r) => !r.isSeparator);
  return {
    url: location.pathname, htmlClass: document.documentElement.className, vw: innerWidth,
    total: rows.length, totalFocusable: focusable.length, separators: rows.length - focusable.length,
    clippedCount: F((r) => r.clippedEdges.length),
    crossOnly: F((r) => r.crossCut && !r.scrollCut), scrollOnly: F((r) => !r.crossCut && r.scrollCut),
    both: F((r) => r.crossCut && r.scrollCut),
    anyCrossClipped: F((r) => r.crossCut), anyScrollClipped: F((r) => r.scrollCut),
    anyCrossClipped_focusableOnly: focusable.filter((r) => r.crossCut).length,
    anyScrollClipped_focusableOnly: focusable.filter((r) => r.scrollCut).length,
    reserveSeen: [...reserveSeen],
    scrollAxisAtExtremity: F((r) => r.scrollCut && (r.atScrollStart || r.atScrollEnd)),
    scrollAxisNotAtExtremity: F((r) => r.scrollCut && !(r.atScrollStart || r.atScrollEnd)),
    scrollAxisOnUnscrollableRun: F((r) => r.scrollCut && !r.scrollable),
    skippedCount: skipped.length, skipped: skipped.slice(0, 20),
    crossRows: rows.filter((r) => r.crossCut),
    rows: rows.slice(0, 30),
  };
};

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
    const seats = [...run.querySelectorAll(".dock-icon-button,.dock-trigger")].filter((s) => getComputedStyle(s).display !== "contents");
    out.push({
      i, vert, dockCls: d.className.slice(0, 48), dockRect: A(d),
      runBorderBox: bb,
      runMarginBox: [+(bb[0] + ml).toFixed(2), +(bb[1] + mt).toFixed(2), +(bb[2] + ml + mr).toFixed(2), +(bb[3] + mt + mb).toFixed(2)],
      pad: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft],
      mar: [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft],
      boxSizing: cs.boxSizing,
      clientW: run.clientWidth, clientH: run.clientHeight, scrollW: run.scrollWidth, scrollH: run.scrollHeight,
      crossContent: vert ? parseFloat(cs.width) : parseFloat(cs.height),
      crossSeat: seats.length ? +(vert ? seats[0].getBoundingClientRect().width : seats[0].getBoundingClientRect().height).toFixed(2) : null,
      crossOverflow: vert ? run.scrollWidth - run.clientWidth : run.scrollHeight - run.clientHeight,
      seatOffsets: seats.map((s) => +(vert ? s.getBoundingClientRect().y - seats[0].getBoundingClientRect().y : s.getBoundingClientRect().x - seats[0].getBoundingClientRect().x).toFixed(2)),
      pitch: getComputedStyle(d).getPropertyValue("--dock-pitch").trim(),
      scrollPos: [run.scrollLeft, run.scrollTop],
    });
  });
  return out;
};

function cropPNG(png, r, dpr) {
  const x0 = Math.max(0, Math.round(r.x * dpr)), y0 = Math.max(0, Math.round(r.y * dpr));
  const x1 = Math.min(png.width, Math.round((r.x + r.w) * dpr)), y1 = Math.min(png.height, Math.round((r.y + r.h) * dpr));
  const w = Math.max(0, x1 - x0), h = Math.max(0, y1 - y0);
  const out = new PNG({ width: w || 1, height: h || 1 });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const s = ((y + y0) * png.width + (x + x0)) << 2, d = (y * w + x) << 2;
    out.data[d] = png.data[s]; out.data[d + 1] = png.data[s + 1]; out.data[d + 2] = png.data[s + 2]; out.data[d + 3] = png.data[s + 3];
  }
  return { png: out, w, h };
}

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

  const census = await page.evaluate(CENSUS);
  const lattice = await page.evaluate(LATTICE);
  fs.writeFileSync(`${BANK}/pi-RERUN2-R2-MATERIAL-ringclip-census-overview-${tag}-cured2.json`, JSON.stringify(census, null, 1));
  fs.writeFileSync(`${BANK}/pi-RERUN2-R2-lattice-paired-overview-${tag}.json`, JSON.stringify({ url: ROUTE, theme, vw: 1440, HEAD: lattice }, null, 1));
  fs.writeFileSync(`${BANK}/pi-RERUN2-R2-PAGE-overview-${tag}.png`, await page.screenshot());

  /* ARM 6 — the focus ring, driven by a REAL Tab */
  const ring = {};
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.mouse.move(1420, 890);
  let focusInfo = null;
  for (let k = 0; k < 60; k++) {
    await page.keyboard.press("Tab");
    focusInfo = await page.evaluate(() => {
      const a = document.activeElement; if (!a) return null;
      const run = a.closest?.(".dock-run"), dock = a.closest?.(".glass-dock");
      if (!run || !dock?.classList.contains("vertical")) return { inVerticalRun: false };
      const r = a.getBoundingClientRect(), cs = getComputedStyle(a);
      const rr = run.getBoundingClientRect();
      return { inVerticalRun: true, cls: (a.className || "").toString().slice(0, 44),
        seatRect: [+r.x.toFixed(2), +r.y.toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)],
        runRect: [+rr.x.toFixed(2), +rr.y.toFixed(2), +rr.width.toFixed(2), +rr.height.toFixed(2)],
        runClientW: run.clientWidth,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor} off:${cs.outlineOffset}` };
    });
    if (focusInfo?.inVerticalRun) break;
  }
  if (focusInfo?.inVerticalRun) {
    await page.waitForTimeout(600);
    const A = PNG.sync.read(await page.screenshot());
    await page.evaluate(() => document.activeElement?.blur?.());
    await page.waitForTimeout(600);
    const B = PNG.sync.read(await page.screenshot());
    const [sx, sy, sw, sh] = focusInfo.seatRect;
    const y = Math.round((sy + sh / 2) * dpr);
    const hits = [];
    for (let x = Math.max(0, Math.round((sx - 14) * dpr)); x < Math.min(A.width, Math.round((sx + sw + 14) * dpr)); x++) {
      const i = (y * A.width + x) << 2;
      const d = Math.max(Math.abs(A.data[i] - B.data[i]), Math.abs(A.data[i + 1] - B.data[i + 1]), Math.abs(A.data[i + 2] - B.data[i + 2]));
      if (d > 8) hits.push(+(x / dpr).toFixed(2));
    }
    const mid = sx + sw / 2;
    const L = hits.filter((h) => h < mid), R = hits.filter((h) => h >= mid);
    Object.assign(ring, {
      seatRect: focusInfo.seatRect, runRect: focusInfo.runRect, runClientW: focusInfo.runClientW,
      outline: focusInfo.outline, cls: focusInfo.cls, scanlineCssY: +(sy + sh / 2).toFixed(2),
      inkCssX: hits, leftArcPx: L.length, rightArcPx: R.length,
      leftArcRange: L.length ? [L[0], L[L.length - 1]] : null,
      rightArcRange: R.length ? [R[0], R[R.length - 1]] : null,
      bothArcs: L.length > 0 && R.length > 0,
    });
    fs.writeFileSync(`${BANK}/pi-RERUN2-R2-ringcrop-focused-sidebar-seat-${tag}-CURED2.png`,
      PNG.sync.write(cropPNG(A, { x: sx - 14, y: sy - 14, w: sw + 28, h: sh + 28 }, dpr).png));
  } else ring.note = "no vertical-run seat reachable by Tab";

  /* ARM 5 — the SYNTHETIC seat-fill clip-edge probe, on a REAL 40px seat */
  await page.evaluate(() => document.activeElement?.blur?.());
  const seatBox = await page.evaluate(() => {
    const run = document.querySelector(".glass-dock.vertical .dock-run");
    const seat = [...run.querySelectorAll(".dock-icon-button")].filter((s) => getComputedStyle(s).display !== "contents")[1];
    seat.setAttribute("data-pi-seatfill", "");
    const r = seat.getBoundingClientRect(), rr = run.getBoundingClientRect();
    return { seatRect: [+r.x.toFixed(2), +r.y.toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)],
      runRect: [+rr.x.toFixed(2), +rr.y.toFixed(2), +rr.width.toFixed(2), +rr.height.toFixed(2)],
      runClient: [run.clientWidth, run.clientHeight], cls: seat.className.slice(0, 44) };
  });
  await page.addStyleTag({ content: `[data-pi-seatfill]{background:#ff00ff !important;border-radius:0 !important;box-shadow:none !important;outline:none !important;}[data-pi-seatfill] *{opacity:0 !important;}` });
  await page.waitForTimeout(600);
  const F = PNG.sync.read(await page.screenshot());
  const [fx, fy, fw, fh] = seatBox.seatRect;
  const yy = Math.round((fy + fh / 2) * dpr);
  const fh_hits = [];
  for (let x = Math.max(0, Math.round((fx - 18) * dpr)); x < Math.min(F.width, Math.round((fx + fw + 18) * dpr)); x++) {
    const i = (yy * F.width + x) << 2;
    if (F.data[i] > 180 && F.data[i + 1] < 90 && F.data[i + 2] > 180) fh_hits.push(+(x / dpr).toFixed(2));
  }
  const seatfill = {
    seatCls: seatBox.cls, layoutBoxCssX: [fx, +(fx + fw).toFixed(2)],
    paintReachCssX: fh_hits.length ? [fh_hits[0], fh_hits[fh_hits.length - 1]] : null,
    paintedPxOnScanline: fh_hits.length, expectedPxOnScanline: Math.round(fw * dpr),
    cutLeftPx: fh_hits.length ? +(fh_hits[0] - fx).toFixed(2) : null,
    cutRightPx: fh_hits.length ? +((fx + fw) - fh_hits[fh_hits.length - 1] - 1 / dpr).toFixed(2) : null,
    scanlineCssY: +(fy + fh / 2).toFixed(2), runRect: seatBox.runRect, runClient: seatBox.runClient,
  };
  fs.writeFileSync(`${BANK}/pi-RERUN2-R2-SYNTHETIC-seatfill-clipedge-${tag}.png`,
    PNG.sync.write(cropPNG(F, { x: fx - 18, y: fy - 10, w: fw + 36, h: fh + 20 }, dpr).png));
  await page.evaluate(() => {
    document.querySelector("[data-pi-seatfill]")?.removeAttribute("data-pi-seatfill");
    [...document.querySelectorAll("style")].filter((s) => s.textContent.includes("data-pi-seatfill")).forEach((s) => s.remove());
  });
  await page.waitForTimeout(400);

  /* ARM 9 — the scroll timeline still runs (cut caps = plate corner radii) */
  const timeline = await page.evaluate(async () => {
    const run = document.querySelector(".glass-dock.vertical .dock-run");
    const plate = run.closest(".glass-dock").querySelector(".dock-plate");
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const read = (label) => {
      const cs = getComputedStyle(plate);
      return { label, scrollTop: +run.scrollTop.toFixed(2),
        scrollMax: +(run.scrollHeight - run.clientHeight).toFixed(2),
        animationName: cs.animationName, animationTimeline: cs.animationTimeline,
        corners: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius] };
    };
    const rest = read("rest");
    run.scrollTop = (run.scrollHeight - run.clientHeight) / 2; await wait(650);
    const mid = read("mid-scroll");
    run.scrollTop = run.scrollHeight; await wait(650);
    const end = read("flush-at-end");
    run.scrollTop = 0; await wait(650);
    const back = read("back-at-rest");
    const key = (s) => s.corners.join("|");
    return { rest, mid, end, back,
      distinctStates: new Set([key(rest), key(mid), key(end)]).size,
      restEqualsBack: key(rest) === key(back),
      timelineActive: key(rest) !== key(mid) || key(mid) !== key(end) };
  });

  OUT[tag] = { url: ROUTE, viewport: "1440x900", dpr, theme, htmlClass: census.htmlClass,
    census: (({ crossRows, rows, skipped, ...k }) => k)(census),
    crossRows: census.crossRows,
    sidebarRun: lattice.find((l) => l.vert), i5: lattice[5],
    autoCrossRuns: [1, 7, 8, 9, 10].map((i) => lattice[i]), allRuns: lattice,
    ring, seatfill, timeline };
  console.log(`--- ${tag} --- total=${census.total}(focusable ${census.totalFocusable}) cross=${census.anyCrossClipped} scroll=${census.anyScrollClipped} scrollAtExtremity=${census.scrollAxisAtExtremity} | ring.both=${ring.bothArcs} L=${JSON.stringify(ring.leftArcRange)} R=${JSON.stringify(ring.rightArcRange)} | seatfill ${JSON.stringify(seatfill.paintReachCssX)} vs ${JSON.stringify(seatfill.layoutBoxCssX)} | tl distinct=${timeline.distinctStates} active=${timeline.timelineActive}`);
  await ctx.close();
}

/* ── THE MORPH rAF BOX TRACE — driven by a REAL pointer ────────────────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(BASE + ROUTE, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1800);

  const box = await page.evaluate(() => {
    const t = [...document.querySelectorAll(".glass-dock")].find((d) => d.classList.contains("collapsed") && !d.classList.contains("always-expanded"));
    if (!t) return null;
    t.setAttribute("data-pi-morph", "");
    t.scrollIntoView({ block: "center", behavior: "instant" });
    return true;
  });
  await page.waitForTimeout(800);
  const rect = await page.evaluate(() => {
    const t = document.querySelector("[data-pi-morph]"); const r = t.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, cls: t.className };
  });

  await page.evaluate(() => {
    const t = document.querySelector("[data-pi-morph]");
    const run = t.querySelector(".dock-run"), layerFull = t.querySelector(".dock-layer--full");
    const A = (e) => { const r = e.getBoundingClientRect(); return [+r.x.toFixed(3), +r.y.toFixed(3), +r.width.toFixed(3), +r.height.toFixed(3)]; };
    window.__piFrames = []; window.__piStop = false;
    const loop = () => {
      if (window.__piStop) return;
      const cs = getComputedStyle(run);
      window.__piFrames.push({ t: +performance.now().toFixed(2),
        morphing: t.hasAttribute("data-morphing"),
        expanded: t.classList.contains("expanded"), collapsed: t.classList.contains("collapsed"),
        dockRect: A(t), runBorderBox: A(run), layerFullBox: layerFull ? A(layerFull) : null,
        boxSizing: cs.boxSizing, padL: cs.paddingLeft, padT: cs.paddingTop,
        marL: cs.marginLeft, marT: cs.marginTop,
        layerFullWidth: layerFull ? getComputedStyle(layerFull).width : null });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  await page.mouse.move(rect.x, rect.y, { steps: 10 });   // REAL pointer in
  await page.waitForTimeout(1500);
  await page.mouse.move(20, 20, { steps: 10 });            // REAL pointer out
  await page.waitForTimeout(1500);

  const trace = await page.evaluate(() => {
    window.__piStop = true;
    const f = window.__piFrames;
    const w = f.map((x) => x.runBorderBox[2]), h = f.map((x) => x.runBorderBox[3]);
    const jumps = [];
    for (let i = 1; i < f.length; i++) {
      const dw = Math.abs(w[i] - w[i - 1]), dh = Math.abs(h[i] - h[i - 1]);
      if (dw > 2 || dh > 2) jumps.push({ i, t: f[i].t, dW: +dw.toFixed(3), dH: +dh.toFixed(3),
        fromW: w[i - 1], toW: w[i], fromH: h[i - 1], toH: h[i],
        morphing: f[i].morphing, wasMorphing: f[i - 1].morphing,
        expanded: f[i].expanded, collapsed: f[i].collapsed });
    }
    return { frameCount: f.length, morphingFrames: f.filter((x) => x.morphing).length,
      sawMorphing: f.some((x) => x.morphing),
      widthRange: [Math.min(...w), Math.max(...w)], heightRange: [Math.min(...h), Math.max(...h)],
      uniqueWidths: [...new Set(w)].sort((a, b) => a - b).slice(0, 40),
      maxFrameToFrameJumpW: +Math.max(...w.map((_, i) => i ? Math.abs(w[i] - w[i - 1]) : 0)).toFixed(3),
      maxFrameToFrameJumpH: +Math.max(...h.map((_, i) => i ? Math.abs(h[i] - h[i - 1]) : 0)).toFixed(3),
      jumps: jumps.slice(0, 40), jumpCount: jumps.length,
      boxSizingSeen: [...new Set(f.map((x) => x.boxSizing))],
      padLSeen: [...new Set(f.map((x) => x.padL))], padTSeen: [...new Set(f.map((x) => x.padT))],
      layerFullWidthSeen: [...new Set(f.map((x) => x.layerFullWidth))].slice(0, 20),
      frames: f.filter((_, i) => i % 3 === 0).slice(0, 300) };
  });
  trace.dockCls = rect.cls;
  fs.writeFileSync(`${BANK}/pi-RERUN2-R2-MORPH-raf-boxtrace-1440-light.json`, JSON.stringify(trace, null, 1));
  OUT.morph = (({ frames, ...k }) => k)(trace);
  console.log("--- MORPH ---", JSON.stringify(OUT.morph).slice(0, 900));
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${BANK}/pi-RERUN2-R2-SUMMARY.json`, JSON.stringify(OUT, null, 1));
console.log("WROTE cell1 summary");
