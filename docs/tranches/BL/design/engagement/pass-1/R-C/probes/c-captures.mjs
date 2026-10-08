#!/usr/bin/env node
// c-captures.mjs · owner-glance captures (REGISTRY §2.5, §3.3 item 5) for the trio and the passive atom, light and
// dark, Chromium and Playwright WebKit, against one build. Mid-motion frames are SEEKED, not raced: every running
// animation on the document is paused and its currentTime set (CSS transitions on the registered scalars and the
// WAAPI carry are Animation objects), so the frame is the one named, at any load.
//   switch     rest · pressed (mouse down 300 ms) · commit pop peak (bump 1) · commit rebound (bump at its trough) · committed
//   accordion  rest · pressed · commit pop peak · open
//   slider     rest · held 450 ms (grow, veil, loupe) · keyboard-focused (engaged) · fling carry at its peak · settled
//   phone      the slider on 390×844, coarse: rest (inset) · touch-held (full column)   [Chromium; WebKit via its touch pipe]
//   separator  rest · inside a pressed host
// Each state is a PNG crop; each engine × theme gets one contact sheet (sheet-<engine>-<theme>.png).
//   node c-captures.mjs --build <dir> --out <dir> [--engine chromium|webkit] [--label rc]
import fs from "node:fs";
import path from "node:path";
import { Engine, serveTarget, openPage, openTouchPage, center, acquireLock, load, parseArgs, browserCensus } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = a.engine === "webkit" ? "webkit" : "chromium";
const label = typeof a.label === "string" ? a.label : "rc";
const out = path.resolve(a.out); fs.mkdirSync(out, { recursive: true });
const waited = await acquireLock();
console.log(`# c-captures · ${label} · ${engine} · lock wait ${waited.toFixed(1)} s · ${browserCensus()} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine); await E.browser();
console.log(`# ${engine} ${E.version}${engine === "webkit" ? " (Playwright WebKit, not Safari; real Safari UNMEASURED (owner's safaridriver checkbox))" : ""}`);

const shots = [];
async function crop(P, sel, name, pad = 28, extraTop = 0) {
  const bx = await P.page.evaluate(([s, pad, extraTop]) => {
    const els = s.split("|").map((x) => document.querySelector(x)).filter(Boolean);
    if (!els.length) return null;
    const rs = els.map((e) => e.getBoundingClientRect());
    const l = Math.min(...rs.map((r) => r.left)) - pad, t = Math.min(...rs.map((r) => r.top)) - pad - extraTop;
    const r = Math.max(...rs.map((r) => r.right)) + pad, b = Math.max(...rs.map((r) => r.bottom)) + pad;
    return { x: Math.max(0, l), y: Math.max(0, t), width: Math.min(innerWidth, r) - Math.max(0, l), height: Math.min(innerHeight, b) - Math.max(0, t) };
  }, [sel, pad, extraTop]);
  const file = `${label}-${engine}-${name}.png`;
  if (!bx) { console.log(`  MISSING   ${name} · ${sel} absent · load ${load()}`); return; }
  await P.page.screenshot({ path: path.join(out, file), clip: bx });
  const scale = await P.page.evaluate((s) => { const e = document.querySelector(s.split("|")[0]); return e ? window.__eff(e).s : null; }, sel);
  shots.push({ name, file, scale });
  console.log(`  CAPTURED  ${name} · ${file} · root scale ${scale?.toFixed(3)} · load ${load()}`);
}
// pause every running animation and seek it to `frac` of its own duration (the transitions on --commit / --engage,
// the carry's WAAPI animation)
const seek = (P, frac, filter) => P.page.evaluate(([frac, filter]) => {
  const out = [];
  for (const an of document.getAnimations()) {
    const name = an.transitionProperty ?? an.animationName ?? (an.effect?.getKeyframes?.()[0] ? Object.keys(an.effect.getKeyframes()[0]).filter((k) => k.startsWith("--")).join("+") : "?");
    if (filter && !String(name).includes(filter)) continue;
    const d = an.effect.getComputedTiming().duration; an.pause(); an.currentTime = d * frac; out.push(`${name}@${(d * frac).toFixed(0)}ms`);
  }
  return out;
}, [frac, filter]);
// WebKit does not restyle dependents of a paused, seeked registered-property transition (the root read 1.000 at the
// seeked pop peak while E-2 read 1.040 live), so in WebKit a mid-motion frame is PINNED instead: the scalar written
// inline at the value the named frame carries, transitions off. Labelled "(pinned)" on the sheet.
const pin = (P, sel, prop, val) => P.page.evaluate(([sel, prop, val]) => { const e = document.querySelector(sel); e.style.transition = "none"; e.style.setProperty(prop, val); }, [sel, prop, val]);
const WK = engine === "webkit";
// the panel row's bump: c = 0.5 at 20.408% of its clock (scheme-spring.css:62, the stop 0.50310), c at its
// overshoot peak 1.04211 at 63.265%: the two seek points of the commit
const BUMP_PEAK = 0.20408, BUMP_TROUGH = 0.63265;

for (const theme of ["light", "dark"]) {
  const run = async (name, fn) => {
    try { await fn(); } catch (e) { console.log(`  FAILED    ${theme} ${name} · ${String(e.message).split("\n")[0].slice(0, 160)} · load ${load()}`); await E.kill(); }
  };
  await run("switch", async () => {
    for (const st of ["rest", "pressed", "pop-peak", "pop-rebound", "committed"]) {
      const P = await openPage(E, T, "switch", { theme });
      try {
        const t = '[role="switch"]';
        if (st === "pressed") { const c = await center(P.page, t); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(300); }
        if (st.startsWith("pop") && WK) { await pin(P, t, "--commit", st === "pop-peak" ? "0.5" : "1.04211"); }
        else if (st.startsWith("pop")) { await P.page.evaluate(() => window.__e.commit()); await P.page.waitForTimeout(16); console.log(`    seek ${await seek(P, st === "pop-peak" ? BUMP_PEAK : BUMP_TROUGH)}`); }
        if (st === "committed") { await P.page.evaluate(() => window.__e.commit()); await P.page.waitForTimeout(900); }
        await crop(P, t, `${theme}-switch-${st}${WK && st.startsWith("pop") ? " (pinned)" : ""}`);
      } finally { await P.close(); }
    }
  });
  await run("accordion", async () => {
    for (const st of ["rest", "pressed", "pop-peak", "open"]) {
      const P = await openPage(E, T, "accordion", { theme });
      try {
        const t = ".disclosure-trigger";
        // PF-1: a pointer over the trigger closes the Playwright WebKit page; the pressed frame is the scalar pinned
        if (st === "pressed" && WK) await pin(P, t, "--engage", "1");
        else if (st === "pressed") { const c = await center(P.page, t); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(300); }
        if (st === "pop-peak" && WK) { await P.page.evaluate(() => window.__e.commit()); await P.page.waitForTimeout(16); await pin(P, t, "--commit", "0.5"); }
        else if (st === "pop-peak") { await P.page.evaluate(() => window.__e.commit()); await P.page.waitForTimeout(16); console.log(`    seek ${await seek(P, BUMP_PEAK, "--commit")}`); }
        if (st === "open") { await P.page.evaluate(() => window.__e.commit()); await P.page.waitForTimeout(900); }
        await crop(P, st === "open" ? ".disclosure-trigger|[data-slot='accordion-content']" : t, `${theme}-accordion-${st}${WK && (st === "pressed" || st === "pop-peak") ? " (pinned)" : ""}`);
      } finally { await P.close(); }
    }
  });
  await run("slider", async () => {
    for (const st of ["rest", "held", "focused", "carry-peak", "settled"]) {
      const P = await openPage(E, T, "slider", { theme });
      try {
        const t = ".glass-slider";
        if (st === "held") { const c = await center(P.page, '[role="slider"]'); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450); }
        if (st === "focused") { await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(engine === "webkit" ? "Alt+Tab" : "Tab"); await P.page.waitForTimeout(450); }
        if (st === "carry-peak" || st === "settled") {
          const c = await center(P.page, '[role="slider"]'); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
          for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
          await P.page.mouse.up();
          if (st === "carry-peak") { await P.page.waitForTimeout(8); console.log(`    seek ${await seek(P, 0.235, "--carry")}`); } else await P.page.waitForTimeout(900);
        }
        await crop(P, st === "held" ? `${t}|.glass-loupe` : t, `${theme}-slider-${st}`, 28, st === "held" ? 8 : 0);
        if (st === "held") await P.page.mouse.up();
      } finally { await P.close(); }
    }
  });
  await run("phone", async () => {
    for (const st of ["rest", "touch-held"]) {
      // Chromium: the touch page (a long-tap hold). WebKit: the raw touch pipe has no screenshot, so the capture uses
      // a Playwright coarse context and a mouse press (sets :active and the hold; the (pointer: coarse) mapping applies)
      const raw = engine === "chromium";
      const P = raw ? await openTouchPage(E, T, "slider", { theme, vp: { width: 390, height: 844 }, q: { phone: "1" } })
        : await openPage(E, T, "slider", { theme, coarse: true, vp: { width: 390, height: 844 }, q: { phone: "1" } });
      try {
        if (!P.modeOk) { console.log(`  MODE NOT APPLIED ${P.modeLine}`); continue; }
        if (st === "rest") { await P.page.waitForTimeout(300); await crop2(P, `${theme}-phone-rest`); }
        else if (raw) { const c = await center(P.page, '[role="slider"]'); await P.hold(c.x, c.y, 450, () => crop2(P, `${theme}-phone-touch-held`)); }
        else { const c = await center(P.page, '[role="slider"]'); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450); await crop2(P, `${theme}-phone-held(coarse ctx, mouse)`); await P.page.mouse.up(); }
      } finally { await P.close(); }
    }
  });
  await run("separator", async () => {
    for (const st of ["rest", "host-pressed"]) {
      const P = await openPage(E, T, "passive", { theme });
      try {
        await P.page.evaluate(() => {
          const sep = document.querySelector('[data-t="sep"]'); const h = document.createElement("div");
          h.setAttribute("data-engage", "press"); h.setAttribute("data-t", "phost"); h.style.cssText = "padding:12px;display:grid;gap:10px;width:320px;cursor:pointer";
          const p1 = document.createElement("span"); p1.textContent = "Above the rule"; const p2 = document.createElement("span"); p2.textContent = "Below the rule";
          h.append(p1, sep, p2); document.querySelector('[data-t="skel"]').before(h);
        });
        if (st === "host-pressed") { const c = await center(P.page, '[data-t="phost"]'); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(400); }
        await crop(P, '[data-t="phost"]', `${theme}-separator-${st}`, 12);
      } finally { await P.close(); }
    }
  });
}
// the phone crop is the whole column (the gutter is the point): full width, the slider's band
async function crop2(P, name) {
  const file = `${label}-${engine}-${name}.png`;
  const r = await P.page.evaluate(() => { const e = document.querySelector(".glass-slider").getBoundingClientRect(); return { y: e.top, h: e.height, w: e.width, l: e.left }; });
  const clip = { x: 0, y: Math.max(0, r.y - 40), width: 390, height: r.h + 80 };
  if (P.page.screenshot) await P.page.screenshot({ path: path.join(out, file), clip });
  else { const png = await P.page.screenshotClip?.(clip); if (png) fs.writeFileSync(path.join(out, file), png); else { console.log(`  UNCAPTURED ${name} · the raw WebKit touch page has no screenshot · box ${r.l.toFixed(1)}..${(r.l + r.w).toFixed(1)} px · load ${load()}`); return; } }
  shots.push({ name, file, scale: r.w / 358 });
  console.log(`  CAPTURED  ${name} · ${file} · box ${r.l.toFixed(1)}..${(r.l + r.w).toFixed(1)} px · load ${load()}`);
}

// contact sheets, one per theme: every crop labelled, on the theme's own page colour
for (const theme of ["light", "dark"]) {
  const mine = shots.filter((s) => s.name.startsWith(theme));
  if (!mine.length) continue;
  const b = await E.browser(); const ctx = await b.newContext({ viewport: { width: 1400, height: 800 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  const cells = mine.map((s) => `<figure><img src="data:image/png;base64,${fs.readFileSync(path.join(out, s.file)).toString("base64")}"><figcaption>${s.name.replace(`${theme}-`, "")}${s.scale ? ` · ×${s.scale.toFixed(3)}` : ""}</figcaption></figure>`).join("");
  await p.setContent(`<!doctype html><style>body{margin:0;padding:16px;font:12px system-ui;background:${theme === "dark" ? "#141210" : "#f6f3ef"};color:${theme === "dark" ? "#e8e2da" : "#2a241e"}}h1{font-size:14px;margin:0 0 12px}main{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}figure{margin:0;padding:6px;border:1px solid ${theme === "dark" ? "#3a342e" : "#d8d0c6"};border-radius:8px}img{display:block}figcaption{padding-top:4px}</style><h1>D5-C prototype (${label}) · ${engine}${engine === "webkit" ? " (Playwright WebKit, not Safari)" : ""} · ${theme}</h1><main>${cells}</main>`);
  const file = `sheet-${label}-${engine}-${theme}.png`;
  await p.screenshot({ path: path.join(out, file), fullPage: true });
  console.log(`  SHEET     ${file} · ${mine.length} crops`);
  await ctx.close();
}
await E.close(); T.close();
console.log(`# done · ${shots.length} captures · load ${load()} at end`);
