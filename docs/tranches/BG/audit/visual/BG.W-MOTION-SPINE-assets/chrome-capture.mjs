// BG.W-MOTION-SPINE — NON-AUTHORING Chrome leg (CDP -> real Chrome.app / Metal GPU).
// Boots ?capture over BUILT :5200, polls data-capture-ready, GL_RENDERER + engine-badge
// provenance, STATIC baseline screenshot, then DRIVES the interactive morphs and captures
// a FRAME-SERIES + computed-morph probe per route:
//   /motion/reveal      — v-reveal stagger + useLiquidReveal bloom-from-source (FLIP 1->0)
//   /motion/springs      — the spring "motion card set" + playground translateX drive
//   /dock/cta-receive    — useDockCtaReceive external-CTA-into-dock (FORWARD 0->1) + seat
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-MOTION-SPINE-assets";
const MODES = ["light", "dark"];
const PORT = 9477;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const udd = mkdtempSync(join(tmpdir(), "chrome-cdp-motionspine-"));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${udd}`,
  "--no-first-run", "--no-default-browser-check",
  "--window-size=1600,1000",
  "http://localhost:5200/",
], { stdio: "ignore" });

let browser = null;
for (let i = 0; i < 40; i++) {
  try { browser = await chromium.connectOverCDP(`http://localhost:${PORT}`); break; }
  catch { await wait(500); }
}
if (!browser) { console.error("CDP connect FAILED"); process.exit(2); }

const results = [];

async function boot(route, mode) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode });
  const page = await ctx.newPage();
  const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
  await page.goto(url, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
  await page.waitForTimeout(700);
  return { ctx, page };
}

const provenance = (page) => page.evaluate(() => {
  const badge = document.getElementById("gl-capture-engine-badge");
  const c = document.createElement("canvas");
  let glR = "no-webgl";
  try {
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (gl) { const d = gl.getExtension("WEBGL_debug_renderer_info"); glR = d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : "no-debug-ext"; gl.getExtension("WEBGL_lose_context")?.loseContext(); }
  } catch (e) { glR = "err:" + e.message; }
  return {
    engineFromUA: (/HeadlessChrome|Chrome|Chromium/.test(navigator.userAgent) ? "CHROME" : "?"),
    badgeAttr: badge ? badge.getAttribute("data-capture-badge") : null,
    badgeText: badge ? (badge.innerText || "").replace(/\s+/g, " ").trim().slice(0, 160) : null,
    glRenderer: glR,
    dpr: window.devicePixelRatio,
  };
});

const structProbe = (page) => page.evaluate(() => {
  const main = document.querySelector("main");
  const canvases = Array.from(document.querySelectorAll("canvas"));
  let glCount = 0;
  for (const c of canvases) { try { if (c.getContext("webgl2") || c.getContext("webgl")) glCount++; } catch {} }
  return {
    mainChildren: main ? main.children.length : -1,
    canvasCount: canvases.length,
    glContextCount: glCount,
    animationTimeline: CSS.supports("animation-timeline: scroll()"),
    runningAnims: document.getAnimations().filter(a => a.playState === "running").length,
    bodyTextLen: (document.body.innerText || "").replace(/\s+/g, " ").trim().length,
  };
});

// ── /motion/reveal — drive the bloom + inspect the surface morph inline styles ──
async function driveReveal(page, slug) {
  // v-reveal stagger: click Replay, sample running animations mid-cascade.
  await page.evaluate(() => { const b=[...document.querySelectorAll("button")].find(x=>/Replay/i.test(x.textContent||"")); b&&b.click(); });
  await page.waitForTimeout(120);
  const staggerAnims = await page.evaluate(() => document.getAnimations().filter(a=>a.playState==="running").map(a=>({name:a.animationName||a.constructor.name})).length);
  await page.screenshot({ path: `${OUT}/${slug}-reveal-stagger.png` });
  await page.waitForTimeout(700); // let stagger settle

  // useLiquidReveal bloom: click the primary-audacious trigger.
  await page.evaluate(() => { const b=[...document.querySelectorAll("button")].find(x=>/Bloom from here/i.test(x.textContent||"")); b&&b.click(); });
  // The surface mounts this frame; reveal() fires on the next rAF -> ~1400ms morph.
  const frames = [];
  const stamps = [140, 340, 620, 1500];
  let prev = 0;
  for (const at of stamps) {
    await page.waitForTimeout(at - prev); prev = at;
    const s = await page.evaluate(() => {
      const el = [...document.querySelectorAll(".glass-reveal")].pop();
      if (!el) return { present: false };
      const cs = getComputedStyle(el);
      return {
        present: true,
        transform: cs.transform,
        transformOrigin: cs.transformOrigin,
        opacity: cs.opacity,
        filter: cs.filter,
        transitionProperty: el.style.transitionProperty,
      };
    });
    frames.push({ at, ...s });
    await page.screenshot({ path: `${OUT}/${slug}-bloom-${at}ms.png` });
  }
  return { staggerAnims, bloomFrames: frames };
}

// ── /motion/springs — verify the card set + drive the numeric-transition card ──
async function driveSprings(page, slug) {
  const cardSet = await page.evaluate(() => {
    const cards = document.querySelectorAll(".glass-card, [class*='glass-']");
    // the animated demo card carries --demo-x; the playground card is driven by rAF translateX
    const demoCard = [...document.querySelectorAll("*")].find(el => getComputedStyle(el).getPropertyValue("--demo-x"));
    return { glassCardCount: cards.length, hasDemoCard: !!demoCard };
  });
  // Drive the demo play (the useNumericTransition orchestrator) — click a Play button.
  await page.evaluate(() => { const b=[...document.querySelectorAll("button")].find(x=>/^\s*Play/i.test(x.textContent||"")); b&&b.click(); });
  const frames = [];
  const stamps = [120, 400, 900, 1300];
  let prev = 0;
  for (const at of stamps) {
    await page.waitForTimeout(at - prev); prev = at;
    const s = await page.evaluate(() => {
      const el = [...document.querySelectorAll("*")].find(e => e.style && e.style.getPropertyValue("--demo-x"));
      const dx = el ? el.style.getPropertyValue("--demo-x") : null;
      return { demoX: dx, running: document.getAnimations().filter(a=>a.playState==="running").length };
    });
    frames.push({ at, ...s });
  }
  await page.screenshot({ path: `${OUT}/${slug}-cards.png` });
  return { cardSet, springFrames: frames };
}

// ── /dock/cta-receive — verify seat + drive the CTA-into-dock morph ──
async function driveCta(page, slug) {
  const seat0 = await page.evaluate(() => {
    const tgt = document.querySelector(".cta-receive-target");
    const cta = document.querySelector(".cta-receive-vehicle");
    return {
      seatPending: tgt ? tgt.hasAttribute("data-cta-pending") : null,
      ctaPresent: !!cta,
      dockPresent: !!document.querySelector(".glass-dock"),
    };
  });
  await page.screenshot({ path: `${OUT}/${slug}-cta-rest.png` });
  // Click "Add to dock" — the CTA flies + reshapes ONTO the target dock control.
  await page.evaluate(() => { const b=[...document.querySelectorAll("button")].find(x=>/Add to dock/i.test(x.textContent||"")); b&&b.click(); });
  const frames = [];
  const stamps = [130, 350, 650, 1500];
  let prev = 0;
  for (const at of stamps) {
    await page.waitForTimeout(at - prev); prev = at;
    const s = await page.evaluate(() => {
      const cta = document.querySelector(".cta-receive-vehicle");
      const tgt = document.querySelector(".cta-receive-target");
      const csC = cta ? getComputedStyle(cta) : null;
      return {
        ctaPresent: !!cta,
        ctaTransform: csC ? csC.transform : null,
        ctaOpacity: csC ? csC.opacity : null,
        ctaFilter: csC ? csC.filter : null,
        targetLit: tgt ? tgt.classList.contains("cta-receive-target--lit") : null,
        received: !document.querySelector(".cta-receive-vehicle"),
      };
    });
    frames.push({ at, ...s });
    await page.screenshot({ path: `${OUT}/${slug}-cta-${at}ms.png` });
  }
  // aurora recessive check — sample a few background pixels for oversaturation/conic
  return { seat0, ctaFrames: frames };
}

const ROUTES = [
  { route: "/motion/reveal", drive: driveReveal, tag: "reveal" },
  { route: "/motion/springs", drive: driveSprings, tag: "springs" },
  { route: "/dock/cta-receive", drive: driveCta, tag: "cta-receive" },
];

for (const { route, drive, tag } of ROUTES) {
  for (const mode of MODES) {
    const slug = `${tag}-chrome-${mode}`;
    let rec = { route, mode, engine: "CHROME", slug };
    try {
      const { ctx, page } = await boot(route, mode);
      rec.provenance = await provenance(page);
      rec.struct = await structProbe(page);
      await page.screenshot({ path: `${OUT}/${slug}-baseline.png` });
      rec.drive = await drive(page, slug);
      await ctx.close();
    } catch (e) { rec.error = String(e).slice(0, 300); }
    results.push(rec);
    console.log(`[chrome] ${route} ${mode} — ${rec.error ? "ERR " + rec.error : "ok"}`);
  }
}

writeFileSync(`${OUT}/chrome-probe.json`, JSON.stringify(results, null, 2));
await browser.close();
proc.kill("SIGTERM");
console.log("DONE chrome");
