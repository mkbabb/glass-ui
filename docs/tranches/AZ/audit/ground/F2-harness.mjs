// F2-verify-defects — adversarial reproduction of 5 R3 defects on :5199
// READ-ONLY: writes only PNG/JSON captures under ground/ prefixed F2-
import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";

const GROUND = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const BASE = "http://localhost:5199";

const park = `() => { Object.defineProperty(document, "hidden", {value:true, configurable:true}); document.dispatchEvent(new Event("visibilitychange")); }`;

const which = process.argv[2] || "all";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on("pageerror", e => console.log("PAGEERROR:", e.message));

async function goto(path) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
}

// ---------- R3-1 dock-layers switcher rail ----------
async function dockLayers() {
  await goto("/dock/layers");
  await page.evaluate(park);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${GROUND}/F2-r3-1-dock-layers-full.png` });

  // Locate the switcher rail element & its tabs; measure geometry + computed bg + icon presence
  const railInfo = await page.evaluate(() => {
    const rails = Array.from(document.querySelectorAll(".dock-layer-rail, [class*='layer-rail'], [class*='switcher']"));
    const out = [];
    for (const r of rails) {
      const cs = getComputedStyle(r);
      const rect = r.getBoundingClientRect();
      const tabs = Array.from(r.querySelectorAll("button, [role='tab'], .dock-layer-tab, [class*='tab']"));
      const tabInfo = tabs.map(t => {
        const svg = t.querySelector("svg");
        const tcs = getComputedStyle(t);
        return {
          tag: t.tagName, cls: t.className?.toString?.().slice(0,80),
          hasSvg: !!svg,
          svgSize: svg ? `${svg.getBoundingClientRect().width.toFixed(0)}x${svg.getBoundingClientRect().height.toFixed(0)}` : null,
          text: (t.textContent||"").trim().slice(0,20),
          bg: tcs.backgroundColor, color: tcs.color,
        };
      });
      out.push({
        cls: r.className?.toString?.(),
        rect: { x: rect.x.toFixed(0), y: rect.y.toFixed(0), w: rect.width.toFixed(0), h: rect.height.toFixed(0) },
        bg: cs.backgroundColor, backdropFilter: cs.backdropFilter, borderRadius: cs.borderRadius,
        tabCount: tabs.length, tabs: tabInfo,
      });
    }
    return out;
  });
  console.log("R3-1 RAIL:", JSON.stringify(railInfo, null, 2));

  // Zoom on the rail region if found
  if (railInfo.length && railInfo[0].rect.w > 0) {
    const r = railInfo[0].rect;
    const x = Math.max(0, +r.x - 10), y = Math.max(0, +r.y - 10);
    await page.screenshot({
      path: `${GROUND}/F2-r3-1-switcher-rail-zoom.png`,
      clip: { x, y, width: Math.min(220, +r.w + 40), height: Math.min(400, +r.h + 40) },
    });
  }
  return railInfo;
}

// ---------- R3-3 morph hover flicker (dock overview) ----------
async function morphFlicker() {
  await goto("/dock/overview");
  // Find a collapsible dock pill / its hover target near an edge
  const dockBox = await page.evaluate(() => {
    const d = document.querySelector(".glass-dock");
    if (!d) return null;
    const r = d.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  console.log("R3-3 dockBox:", JSON.stringify(dockBox));
  if (!dockBox) return { found: false };

  // Instrument: sample --dock-morph-t over a hover-at-edge sequence; watch for non-monotone oscillation
  const samples = await page.evaluate(async (db) => {
    const d = document.querySelector(".glass-dock");
    const readT = () => {
      const v = getComputedStyle(d).getPropertyValue("--dock-morph-t").trim();
      return v === "" ? null : parseFloat(v);
    };
    const widthOf = () => d.getBoundingClientRect().width;
    const series = [];
    // Hover near the right edge of the dock repeatedly (the "edge case" the user named)
    const edgeX = db.x + db.w - 2;
    const midY = db.y + db.h / 2;
    const outX = db.x + db.w + 80;
    const fire = (type, x, y) => d.dispatchEvent(new PointerEvent(type, { clientX: x, clientY: y, bubbles: true, pointerType: "mouse" }));
    for (let cycle = 0; cycle < 6; cycle++) {
      fire("pointerenter", edgeX, midY); fire("pointermove", edgeX, midY);
      // sample frames
      for (let i = 0; i < 8; i++) { await new Promise(r => requestAnimationFrame(r)); series.push({ phase: "in", cycle, t: readT(), w: widthOf() }); }
      fire("pointermove", outX, midY); fire("pointerleave", outX, midY);
      for (let i = 0; i < 8; i++) { await new Promise(r => requestAnimationFrame(r)); series.push({ phase: "out", cycle, t: readT(), w: widthOf() }); }
    }
    return series;
  }, dockBox);

  // Analyze oscillation: count direction reversals in width within a single phase block
  let reversals = 0, prevDelta = 0, jitterEvents = 0;
  for (let i = 1; i < samples.length; i++) {
    const d = samples[i].w - samples[i-1].w;
    if (Math.abs(d) > 0.5 && Math.sign(d) !== 0) {
      if (prevDelta !== 0 && Math.sign(d) !== Math.sign(prevDelta)) reversals++;
      prevDelta = Math.sign(d);
    }
  }
  // Detect rapid in/out width thrash WITHIN an 'in' block (flicker = width not settling)
  const widths = samples.map(s => +s.w);
  const wmin = Math.min(...widths), wmax = Math.max(...widths);
  const analysis = { reversals, wmin: wmin.toFixed(1), wmax: wmax.toFixed(1), span: (wmax-wmin).toFixed(1), nSamples: samples.length };
  console.log("R3-3 ANALYSIS:", JSON.stringify(analysis));

  const fs = await import("node:fs/promises");
  await fs.writeFile(`${GROUND}/F2-r3-3-morph-trace.json`, JSON.stringify({ dockBox, analysis, samples }, null, 2));

  // Static capture hovered at edge
  await page.mouse.move(dockBox.x + dockBox.w - 2, dockBox.y + dockBox.h / 2);
  await page.waitForTimeout(120);
  await page.screenshot({ path: `${GROUND}/F2-r3-3-edge-hover.png` });
  return { found: true, analysis };
}

// ---------- R3-9 blob pixelation ----------
async function blobPixel() {
  await goto("/substrates/blob");
  await page.waitForTimeout(1200); // let metaball render a few frames
  // Find the blob canvas(es), read backing-store vs CSS size => DPR ratio
  const canvasInfo = await page.evaluate(() => {
    const cs = Array.from(document.querySelectorAll("canvas"));
    return cs.map(c => {
      const r = c.getBoundingClientRect();
      const style = getComputedStyle(c);
      return {
        cssW: r.width.toFixed(0), cssH: r.height.toFixed(0),
        bufW: c.width, bufH: c.height,
        ratioW: (c.width / Math.max(1,r.width)).toFixed(3),
        ratioH: (c.height / Math.max(1,r.height)).toFixed(3),
        imageRendering: style.imageRendering,
        cls: c.className?.toString?.().slice(0,60),
        dpr: window.devicePixelRatio,
      };
    });
  });
  console.log("R3-9 CANVASES:", JSON.stringify(canvasInfo, null, 2));
  await page.screenshot({ path: `${GROUND}/F2-r3-9-blob-full.png` });

  // Zoom on the top blob region (top 40% of first canvas)
  if (canvasInfo.length) {
    const r = await page.evaluate(() => {
      const c = document.querySelector("canvas"); const rr = c.getBoundingClientRect();
      return { x: rr.x, y: rr.y, w: rr.width, h: rr.height };
    });
    await page.screenshot({
      path: `${GROUND}/F2-r3-9-blob-top-zoom.png`,
      clip: { x: Math.max(0,r.x), y: Math.max(0,r.y), width: Math.min(600,r.w), height: Math.min(300,r.h) },
    });
  }
  return canvasInfo;
}

// ---------- R3-15 fourier-F centering (the rail/home f logo) ----------
async function fourierF() {
  // The R3-15 item is about "the fourier F" — a rail home-icon. Check both the substrate page
  // and the dock rail home control. First the dock rail home f-logo region.
  await goto("/dock/rail");
  await page.evaluate(park);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${GROUND}/F2-r3-15-rail-full.png` });

  // Search for an 'f' / foundations / home logo control and compare glyph bbox center vs its hover/shadow box center
  const fInfo = await page.evaluate(() => {
    // candidate home/brand/foundations controls
    const cands = Array.from(document.querySelectorAll("a,button,[role='button'],[class*='home'],[class*='brand'],[class*='logo'],[class*='persistent']"));
    const results = [];
    for (const el of cands) {
      const txt = (el.textContent||"").trim();
      const svg = el.querySelector("svg");
      // a fourier-F glyph likely a text 'f' or svg path; pick controls that are square-ish and small (logo)
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.width > 120) continue;
      // measure inner glyph bbox: svg if present, else first text node span
      let glyph = svg || el.querySelector("span,i,em") || el;
      const gr = glyph.getBoundingClientRect();
      const cxBox = r.x + r.width/2, cyBox = r.y + r.height/2;
      const cxG = gr.x + gr.width/2, cyG = gr.y + gr.height/2;
      results.push({
        cls: el.className?.toString?.().slice(0,70), text: txt.slice(0,12), hasSvg: !!svg,
        box: { x: r.x.toFixed(1), y: r.y.toFixed(1), w: r.width.toFixed(1), h: r.height.toFixed(1) },
        glyph: { x: gr.x.toFixed(1), y: gr.y.toFixed(1), w: gr.width.toFixed(1), h: gr.height.toFixed(1) },
        offsetX: (cxG - cxBox).toFixed(2), offsetY: (cyG - cyBox).toFixed(2),
      });
    }
    return results;
  });
  console.log("R3-15 RAIL F-CANDIDATES:", JSON.stringify(fInfo, null, 2));

  // Also the foundations sidebar entry (the 'f' key logo per R3-12) — capture sidebar
  await goto("/foundations/intro");
  await page.waitForTimeout(400);
  const sideF = await page.evaluate(() => {
    // sidebar nav items
    const items = Array.from(document.querySelectorAll("nav a, aside a, [class*='sidebar'] a, [class*='nav'] a"));
    return items.slice(0,30).map(a => {
      const svg = a.querySelector("svg");
      const r = a.getBoundingClientRect();
      let glyph = svg;
      let off = null;
      if (svg) {
        const gr = svg.getBoundingClientRect();
        off = { ox: ((gr.x+gr.width/2)-(r.x+r.width/2)).toFixed(2), oy: ((gr.y+gr.height/2)-(r.y+r.height/2)).toFixed(2) };
      }
      return { text: (a.textContent||"").trim().slice(0,16), hasSvg: !!svg, off };
    }).filter(x => x.text || x.hasSvg);
  });
  console.log("R3-15/12 SIDEBAR:", JSON.stringify(sideF, null, 2));
  await page.screenshot({ path: `${GROUND}/F2-r3-15-foundations-sidebar.png`, clip: { x: 0, y: 0, width: 320, height: 900 } });
  return { fInfo, sideF };
}

// ---------- R3-7 glass readability: dock over light backdrop ----------
async function glassReadability() {
  // Light mode + a bright/light page; measure dock control text contrast over its plate
  await goto("/dock/overview");
  // ensure light mode (remove .dark)
  await page.evaluate(() => { document.documentElement.classList.remove("dark"); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${GROUND}/F2-r3-7-dock-light-full.png` });

  // Probe: for dock control labels/glyphs, measure computed color vs the plate behind.
  // Use a synthetic contrast readback: sample the rendered text pixel luminance vs surface.
  const probe = await page.evaluate(() => {
    function lum(rgb) {
      const m = rgb.match(/[\d.]+/g).map(Number);
      const [r,g,b] = m.map(v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); });
      return 0.2126*r + 0.7152*g + 0.0722*b;
    }
    function ratio(a,b){ const la=lum(a)+0.05, lb=lum(b)+0.05; return (Math.max(la,lb)/Math.min(la,lb)); }
    const dock = document.querySelector(".glass-dock");
    if (!dock) return { found: false };
    const cs = getComputedStyle(dock);
    // Read --glass-backdrop bucket + tint vars at the dock element
    const vars = {
      glassBackdrop: cs.getPropertyValue("--glass-backdrop").trim() || "(unset)",
      tintStrength: cs.getPropertyValue("--glass-tint-strength").trim() || "(unset)",
      tintSource: cs.getPropertyValue("--glass-tint-source").trim() || "(unset)",
      tintAa: cs.getPropertyValue("--glass-tint-strength-aa").trim() || "(unset)",
      glassLevel: cs.getPropertyValue("--glass-level").trim() || "(unset)",
    };
    // sample a control's text color
    const ctrl = dock.querySelector("button, .dock-icon-button, .dock-tab-button");
    const ctrlColor = ctrl ? getComputedStyle(ctrl).color : null;
    const dockBg = cs.backgroundColor;
    return { found: true, vars, ctrlColor, dockBg, dockBgRatioToText: ctrl ? ratio(ctrlColor, dockBg).toFixed(2) : null };
  });
  console.log("R3-7 DOCK-LIGHT PROBE:", JSON.stringify(probe, null, 2));

  // Now force a VERY LIGHT backdrop behind the dock and re-probe (the real defect case).
  // Inject a white panel behind, then check whether the @container bucket auto-fires (it won't — declarative only).
  const lightCase = await page.evaluate(() => {
    function lum(rgb){ const m=rgb.match(/[\d.]+/g).map(Number); const [r,g,b]=m.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; }
    function ratio(a,b){ const la=lum(a)+0.05, lb=lum(b)+0.05; return Math.max(la,lb)/Math.min(la,lb); }
    const dock = document.querySelector(".glass-dock");
    // paint a synthetic white sheet behind everything
    let sheet = document.getElementById("__f2_white__");
    if (!sheet) { sheet = document.createElement("div"); sheet.id="__f2_white__"; sheet.style.cssText="position:fixed;inset:0;background:#ffffff;z-index:0;"; document.body.prepend(sheet); }
    const cs = getComputedStyle(dock);
    const ctrl = dock.querySelector("button, .dock-icon-button, .dock-tab-button");
    const text = ctrl ? getComputedStyle(ctrl).color : cs.color;
    // effective contrast of warm-ink text vs WHITE backdrop bleeding through translucent glass
    const tintStrength = cs.getPropertyValue("--glass-tint-strength").trim();
    return {
      tintStrengthAtElement: tintStrength || "(unset)",
      backdropBucket: cs.getPropertyValue("--glass-backdrop").trim() || "(unset)",
      textColor: text,
      contrastTextVsWhite: ratio(text, "rgb(255,255,255)").toFixed(2),
    };
  });
  console.log("R3-7 LIGHT-CASE (white behind):", JSON.stringify(lightCase, null, 2));
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${GROUND}/F2-r3-7-dock-over-white.png` });
  return { probe, lightCase };
}

const out = {};
try {
  if (which==="all"||which==="1") out.r3_1 = await dockLayers();
  if (which==="all"||which==="3") out.r3_3 = await morphFlicker();
  if (which==="all"||which==="9") out.r3_9 = await blobPixel();
  if (which==="all"||which==="15") out.r3_15 = await fourierF();
  if (which==="all"||which==="7") out.r3_7 = await glassReadability();
} catch (e) {
  console.log("HARNESS ERROR:", e.message, e.stack);
}
await browser.close();
console.log("DONE");
