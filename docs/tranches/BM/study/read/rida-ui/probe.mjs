// BM study probe: reads rida.dev's post-contents menu and glass tab bar in a
// headless browser. Usage (always through the guard):
//   ~/.claude/guard/guarded --timeout 10 -- node probe.mjs chromium <outDir>
//   ~/.claude/guard/guarded --exclusive webkit --timeout 10 -- node probe.mjs webkit <outDir>
// One browser per run, one context per cell, everything closed in finally.
// Neither engine is an iPhone: these readings are engine readings only.
import { chromium, webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [engineName = "chromium", outDir = "."] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const URL = "https://rida.dev/blog/bypassing-ios-safari-60-fps-limit";
const ALLOWED = /^https:\/\/(rida\.dev|media\.rida\.dev)\//;
const BLOCKED_PATH = /telemetry|\/collect/;
const framesDir = join(outDir, "frames");
mkdirSync(framesDir, { recursive: true });
const readings = { engine: engineName, url: URL, at: new Date().toISOString(), cells: {} };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const iphone = devices["iPhone 15 Pro"];
const contextOptions = (extra = {}) => ({
  userAgent: iphone.userAgent,
  viewport: iphone.viewport,
  deviceScaleFactor: 3,
  isMobile: engineName === "chromium" ? true : undefined,
  hasTouch: true,
  colorScheme: "light",
  ...extra,
});

const openPage = async (browser, extra) => {
  const context = await browser.newContext(contextOptions(extra));
  await context.route("**/*", (route) => {
    const u = route.request().url();
    if (!ALLOWED.test(u) || BLOCKED_PATH.test(u)) return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 300)));
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(`console.${m.type()}: ${m.text().slice(0, 300)}`));
  page.on("worker", (w) => {
    errors.push(`worker: ${w.url().split("/").pop()}`);
    w.on("console", (m) => errors.push(`worker console.${m.type()}: ${m.text().slice(0, 300)}`));
  });
  await page.goto(URL, { waitUntil: "load", timeout: 45000 });
  const live = await page
    .waitForSelector(".post-contents[data-live]", { state: "attached", timeout: 20000 })
    .then(() => true, () => false);
  if (!live) {
    const why = await page.evaluate(() => {
      const r = document.querySelector(".post-contents");
      return { hidden: r?.hidden, attrs: r ? [...r.attributes].map((a) => a.name) : null, children: r ? [...r.children].map((c) => c.className) : null, disclaimer: document.documentElement.dataset.disclaimer ?? null, marks: performance.getEntriesByType("mark").map((m) => m.name) };
    });
    throw new Error(`post-contents never went live: ${JSON.stringify(why)} | ${errors.join(" | ")}`);
  }
  await sleep(1200);
  return { context, page, errors };
};

const menuClip = async (page) => {
  const vw = page.viewportSize().width;
  return { x: Math.max(0, vw - 290), y: 0, width: Math.min(290, vw), height: 560 };
};

const shot = async (page, name, clip) => {
  const path = join(framesDir, `${engineName}-${name}.png`);
  await page.screenshot({ path, clip, animations: "allow" });
  return path;
};

const only = process.env.RIDA_ONLY ? process.env.RIDA_ONLY.split(",") : null;
const cell = async (browser, name, extra, body) => {
  if (only && !only.includes(name)) return;
  const t0 = Date.now();
  let opened = null;
  try {
    opened = await openPage(browser, extra);
    readings.cells[name] = { ok: true, ...(await body(opened.page)), pageErrors: opened.errors };
  } catch (e) {
    readings.cells[name] = { ok: false, error: String(e).slice(0, 600), pageErrors: opened?.errors ?? [] };
  } finally {
    if (opened) await opened.context.close().catch(() => {});
    readings.cells[name].ms = Date.now() - t0;
  }
};

const browser = await engine.launch({ headless: true });
try {
  await cell(browser, "static", {}, async (page) => {
    const facts = await page.evaluate(() => {
      const q = (s) => document.querySelector(s);
      const cs = (el, p) => (el ? getComputedStyle(el)[p] : null);
      const row = q(".post-contents-row");
      const button = q(".post-contents-button");
      const panel = q(".post-contents-panel");
      const glass = q(".post-contents-glass");
      const controllers = [...document.querySelectorAll(".demo-nav-controller")];
      return {
        gestureEvent: "GestureEvent" in window,
        offscreenCanvas: typeof OffscreenCanvas,
        transferControlToOffscreen: "transferControlToOffscreen" in HTMLCanvasElement.prototype,
        viewportApplied: document.documentElement.dataset.viewport ?? null,
        viewportMeta: document.querySelector('meta[name="viewport"]')?.content ?? null,
        unit: getComputedStyle(document.documentElement).getPropertyValue("--unit").trim(),
        rowColor: cs(row, "color"),
        rowText: row?.textContent?.trim().slice(0, 40) ?? null,
        button: button && {
          ariaLabel: button.getAttribute("aria-label"),
          ariaExpanded: button.getAttribute("aria-expanded"),
          ariaControls: button.getAttribute("aria-controls"),
          background: cs(button, "backgroundColor"),
          rect: button.getBoundingClientRect().toJSON(),
        },
        panel: panel && { inert: panel.inert, visibility: cs(panel, "visibility") },
        glass: glass && {
          tag: glass.tagName,
          ariaHidden: glass.getAttribute("aria-hidden"),
          width: glass.width,
          height: glass.height,
          rect: glass.getBoundingClientRect().toJSON(),
        },
        root: { live: q(".post-contents")?.dataset.live ?? null, backdropFilter: cs(q(".post-contents"), "backdropFilter") },
        controllers: controllers.slice(0, 5).map((c) => ({
          ariaLabel: c.getAttribute("aria-label"),
          role: c.getAttribute("role"),
          tabIndex: c.tabIndex,
          overflow: cs(c, "overflowX"),
          snap: cs(c, "scrollSnapType"),
          scrollWidth: c.scrollWidth,
          clientWidth: c.clientWidth,
          scrollLeft: c.scrollLeft,
        })),
        controllerCount: controllers.length,
        stages: [...document.querySelectorAll(".demo-nav-stage")].map((s) => ({
          title: s.parentElement?.querySelector(".demo-title")?.textContent ?? null,
          canvases: s.querySelectorAll("canvas").length,
          static: s.hasAttribute("data-static"),
        })),
      };
    });
    const menuAria = await page.locator(".post-contents").ariaSnapshot().catch((e) => String(e));
    const shadersFigure = page.locator("figure.demo", { has: page.locator(".demo-title", { hasText: "Shaders" }) });
    await shadersFigure.scrollIntoViewIfNeeded();
    await sleep(1500);
    const tabAria = await shadersFigure.ariaSnapshot().catch((e) => String(e));
    const closed = await shot(page, "menu-closed", await menuClip(page));
    return { facts, menuAria, tabAria, frames: [closed] };
  });

  await cell(browser, "menu-motion", {}, async (page) => {
    const clip = await menuClip(page);
    const box = await page.locator(".post-contents-button").boundingBox();
    const t0 = Date.now();
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    const early = await shot(page, "menu-open-early", clip);
    const earlyMs = Date.now() - t0;
    await sleep(900);
    const open = await shot(page, "menu-open-settled", clip);
    const state = await page.evaluate(() => ({
      expanded: document.querySelector(".post-contents-button")?.getAttribute("aria-expanded"),
      panelInert: document.querySelector(".post-contents-panel")?.inert,
      active: document.activeElement?.className ?? null,
      activeText: document.activeElement?.textContent?.trim().slice(0, 40) ?? null,
    }));
    await page.keyboard.press("Escape");
    await sleep(700);
    const afterEscape = await page.evaluate(() => ({
      expanded: document.querySelector(".post-contents-button")?.getAttribute("aria-expanded"),
      panelInert: document.querySelector(".post-contents-panel")?.inert,
      active: document.activeElement?.className ?? null,
    }));
    return { earlyMs, state, afterEscape, frames: [early, open] };
  });

  await cell(browser, "menu-reduced-motion", { reducedMotion: "reduce" }, async (page) => {
    const clip = await menuClip(page);
    const box = await page.locator(".post-contents-button").boundingBox();
    const t0 = Date.now();
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    const early = await shot(page, "menu-open-early-reduced", clip);
    return { earlyMs: Date.now() - t0, frames: [early] };
  });

  await cell(browser, "keyboard", { hasTouch: false, isMobile: false }, async (page) => {
    await page.focus(".post-contents-button");
    await page.keyboard.press("Enter");
    await sleep(700);
    const opened = await page.evaluate(() => ({
      expanded: document.querySelector(".post-contents-button")?.getAttribute("aria-expanded"),
      active: document.activeElement?.className ?? null,
      activeText: document.activeElement?.textContent?.trim().slice(0, 40) ?? null,
    }));
    await page.keyboard.press("ArrowDown");
    await sleep(100);
    const afterArrow = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40) ?? null);
    await page.keyboard.press("Tab");
    await sleep(100);
    const afterTab = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40) ?? null);
    await page.keyboard.press("Escape");
    await sleep(600);
    const closed = await page.evaluate(() => ({
      expanded: document.querySelector(".post-contents-button")?.getAttribute("aria-expanded"),
      active: document.activeElement?.className ?? null,
    }));
    // The tab bar demo: can a keyboard reach a controller?
    const shadersFigure = page.locator("figure.demo", { has: page.locator(".demo-title", { hasText: "Shaders" }) });
    await shadersFigure.scrollIntoViewIfNeeded();
    await sleep(800);
    const reach = await page.evaluate(() => {
      const c = document.querySelectorAll("figure.demo .demo-nav-controller");
      return { focusable: [...c].filter((e) => e.tabIndex >= 0).length, total: c.length };
    });
    return { opened, afterArrow, afterTab, closed, reach };
  });

  if (engineName === "chromium") {
    await cell(browser, "tabbar-drag", {}, async (page) => {
      const figure = page.locator("figure.demo", { has: page.locator(".demo-title", { hasText: "Shaders" }) });
      await figure.scrollIntoViewIfNeeded();
      await sleep(2000);
      const stage = figure.locator(".demo-nav-stage");
      const sbox = await stage.boundingBox();
      const ctrls = figure.locator(".demo-nav-controller");
      const n = await ctrls.count();
      const boxes = [];
      for (let i = 0; i < n; i += 1) boxes.push(await ctrls.nth(i).boundingBox());
      const clip = { x: sbox.x, y: sbox.y, width: sbox.width, height: sbox.height };
      const cdp = await page.context().newCDPSession(page);
      const touch = (type, x, y) =>
        cdp.send("Input.dispatchTouchEvent", {
          type,
          touchPoints: type === "touchEnd" ? [] : [{ x, y, radiusX: 4, radiusY: 4, force: 1, id: 1 }],
        });
      const frames = [];
      frames.push(await shot(page, "tabbar-rest", clip));
      const home = boxes[0];
      const start = { x: home.x + home.width / 2, y: home.y + home.height / 2 };
      await touch("touchStart", start.x, start.y);
      await sleep(450);
      frames.push(await shot(page, "tabbar-pressed", clip));
      const tabStep = boxes[1] ? boxes[1].x - boxes[0].x : 80;
      const steps = 24;
      for (let i = 1; i <= steps; i += 1) {
        await touch("touchMove", start.x + (tabStep * 1.4 * i) / steps, start.y);
        await sleep(12);
      }
      await sleep(120);
      frames.push(await shot(page, "tabbar-dragging", clip));
      const farX = Math.min(sbox.x + sbox.width - 2, start.x + tabStep * 4.2);
      for (let i = 1; i <= steps; i += 1) {
        const x = start.x + tabStep * 1.4 + ((farX - start.x - tabStep * 1.4) * i) / steps;
        await touch("touchMove", x, start.y + (36 * i) / steps);
        await sleep(12);
      }
      await sleep(200);
      frames.push(await shot(page, "tabbar-stretched", clip));
      await touch("touchEnd", 0, 0);
      await sleep(900);
      frames.push(await shot(page, "tabbar-settled", clip));
      await cdp.detach().catch(() => {});
      return { controllers: boxes.map((b) => b && { x: Math.round(b.x), w: Math.round(b.width) }), stage: sbox, tabStep, farX, frames };
    });
  }
} finally {
  await browser.close().catch(() => {});
  writeFileSync(join(outDir, `readings-${engineName}.json`), JSON.stringify(readings, null, 2));
}
console.log(JSON.stringify(readings, null, 2));
