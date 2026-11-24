#!/usr/bin/env node
// scenarios.mjs: writes the probe scenarios into tools/scenarios/<target>-<fine|coarse>.json.
//
// One series per cell, with a mark at the start of each route, so one context walks:
// open, theme hover in and out, the idle close, theme press (the scheme toggles) and
// back, Escape, press outside, scroll. Fine cells drive a mouse; coarse cells tap (no
// hover on touch).
//
// Selectors are named in the page before recording (STAMP below): the dock under study
// gets data-df="dock" (the target's `dock` selectors first, else the first collapsible
// .glass-dock), the theme seat data-df="theme" (the target's `theme` selectors first,
// else a control whose name, title or class says dark/light/theme, inside the dock first),
// a 2 px pointer-events:none marker #df-rest stands on an inert point of the page outside
// every dock (the "outside" press and the pointer's rest), and the element a wheel there
// scrolls gets data-df-scroller.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "scenarios");
mkdirSync(OUT, { recursive: true });

export const CELLS = [
    { tag: "1440-fine-light", w: 1440, h: 900, pointer: "fine", scheme: "light" },
    { tag: "1440-fine-dark", w: 1440, h: 900, pointer: "fine", scheme: "dark" },
    { tag: "390-coarse-light", w: 390, h: 844, pointer: "coarse", scheme: "light" },
    { tag: "390-coarse-dark", w: 390, h: 844, pointer: "coarse", scheme: "dark" },
];

export const TARGETS = {
    repro: { about: "fourier's top dock reproduced seat for seat (tools/mounts/fourier-dock.vue)", component: "fourier-dock", dock: ["[data-testid=fourier-dock]"], theme: ["[data-testid=theme-seat]"] },
    hand: { about: "glass's own GlassDock in its documented states, the animation harness's audit page (?c=dock, harness app/mounts/dock.vue) built from the tree: dock-h-closed (pill, starts collapsed, a persistent Home seat; no theme seat)", component: "dock", dock: ["[data-testid=dock-h-closed]"], theme: [] },
    fourier: { about: "fourier.babb.dev/w (Visualize), the top dock", url: "https://fourier.babb.dev/w", dock: ["header .glass-dock"], theme: [".sun-moon-toggle"] },
    color: { about: "color.babb.dev, the site dock", url: "https://color.babb.dev/", dock: [], theme: [] },
    keyframes: { about: "keyframes.babb.dev, the chrome dock", url: "https://keyframes.babb.dev/", dock: [], theme: [] },
    daraksha: { about: "daraksha.babb.dev, the site dock and its theme dock", url: "https://daraksha.babb.dev/", dock: [".site-dock .dock.glass-dock", ".site-dock .glass-dock"], theme: [".theme-control"] },
    glass: { about: "glass.babb.dev/dock/chrome (the demo as deployed, master 22c4ea97, dock source = v11.1.0's): the shell's collapsible docks (the sidebar at 1440, which holds the theme seat; the bottom dock at 390)", url: "https://glass.babb.dev/dock/chrome", dock: ["[data-testid=sidebar-dock-collapsible]", "[data-testid=bottom-dock-collapsible]"], theme: [".dark-mode-toggle-button"] },
};

const STAMP = (t) => `(() => {
  const want = ${JSON.stringify(t.dock || [])}, wantTheme = ${JSON.stringify(t.theme || [])};
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  let dock = null;
  for (const s of want) { dock = [...document.querySelectorAll(s)].find(vis) || dock; if (dock) break; }
  const docks = [...document.querySelectorAll('.glass-dock')].filter(vis);
  if (!dock) dock = docks.find((d) => d.classList.contains('collapsed')) || docks.find((d) => !d.classList.contains('always-expanded')) || docks[0] || null;
  if (${!!t.centre} && dock) { dock.scrollIntoView({ block: 'center' }); }
  if (dock) dock.setAttribute('data-df', 'dock');
  const nm = (e) => (e.getAttribute('aria-label') || '') + ' ' + (e.getAttribute('title') || '') + ' ' + (typeof e.className === 'string' ? e.className : '');
  const isTheme = (e) => /dark|light mode|theme|scheme|sun-moon/i.test(nm(e));
  let theme = null;
  for (const s of wantTheme) { theme = document.querySelector(s); if (theme) break; }
  if (!theme && dock) theme = [...dock.querySelectorAll('button, a, [role=button], [data-glass-dock-seat]')].find(isTheme) || null;
  if (!theme) theme = [...document.querySelectorAll('.glass-dock button, .glass-dock [role=button]')].find(isTheme) || null;
  if (theme) theme.setAttribute('data-df', 'theme');
  // the rest point: inert, outside every dock and popper, away from the dock
  const db = dock ? dock.getBoundingClientRect() : { left: 0, right: 0, top: 0, bottom: 0 };
  const bad = (e) => !e || e.closest('a, button, input, select, textarea, label, summary, [role=button], [role=link], [role=slider], [role=tab], [contenteditable], .glass-dock, [data-reka-popper-content-wrapper], [role=dialog], iframe');
  const W = innerWidth, H = innerHeight; let pick = null, canvasPick = null;
  const ys = [0.62, 0.55, 0.7, 0.48, 0.78, 0.4, 0.85, 0.33, 0.9];
  const xs = [0.5, 0.42, 0.58, 0.3, 0.7, 0.2, 0.8, 0.1, 0.9];
  outer: for (const fy of ys) for (const fx of xs) {
    const x = Math.round(W * fx), y = Math.round(H * fy);
    if (x > db.left - 60 && x < db.right + 60 && y > db.top - 60 && y < db.bottom + 60) continue;
    const e = document.elementFromPoint(x, y);
    if (bad(e)) continue;
    if (e.tagName === 'CANVAS' || e.closest('svg')) { canvasPick ||= [x, y, e.tagName]; continue; }
    pick = [x, y, e.tagName + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '')]; break outer;
  }
  pick ||= canvasPick || [Math.round(W / 2), Math.round(H * 0.62), 'fallback'];
  let m = document.getElementById('df-rest');
  if (!m) { m = document.createElement('div'); m.id = 'df-rest'; document.documentElement.appendChild(m); }
  m.style.cssText = 'position:fixed;width:2px;height:2px;left:' + (pick[0] - 1) + 'px;top:' + (pick[1] - 1) + 'px;pointer-events:none;opacity:0;z-index:2147483647';
  m.setAttribute('data-at', pick.join(' '));
  let sc = document.elementFromPoint(pick[0], pick[1]);
  while (sc && sc !== document.documentElement) { const cs = getComputedStyle(sc); if (/(auto|scroll)/.test(cs.overflowY) && sc.scrollHeight > sc.clientHeight + 4) break; sc = sc.parentElement; }
  (sc && sc !== document.documentElement ? sc : document.scrollingElement).setAttribute('data-df-scroller', '');
  window.__df = { dock: dock && (dock.getAttribute('aria-label') || dock.className), theme: theme && nm(theme), rest: pick };
})()`;

const D = "[data-df=dock]";
const TH = "[data-df=theme]";
const SUM = `${D} .dock-layer--summary`;
const REST = { sel: "#df-rest" };

function track(t) {
    return [
        { as: "dock", sel: D, attrs: ["class", "data-morphing", "aria-label"], props: ["--dock-t", "--dock-morph-t"], styles: ["width"], colors: [] },
        { as: "plate", sel: `${D} .dock-plate`, props: ["--dock-t"], styles: ["width"], colors: [] },
        { as: "summary", sel: SUM, chain: true, colors: [] },
        { as: "run", sel: `${D} .dock-layer--full`, chain: true, styles: ["width"], colors: [] },
        { as: "seat", sel: `${D} [data-glass-dock-seat]`, all: true, styles: ["width"], colors: [] },
        { as: "theme", sel: TH, attrs: ["aria-pressed", "title", "aria-label", "data-state"], styles: ["width"], colors: [] },
        { as: "icon", sel: `${TH} svg`, styles: ["width"], colors: [] },
        { as: "tip", sel: "[role=tooltip]", all: true, attrs: ["data-side", "data-state"], colors: [] },
        { as: "popper", sel: "[data-reka-popper-content-wrapper]", all: true, colors: [] },
        { as: "html", sel: "html", attrs: ["class", "data-theme"], colors: [] },
        { as: "rest", sel: "#df-rest", attrs: ["data-at"], colors: [] },
    ];
}

const settle = (quietMs = 450, maxMs = 4000, afterChange = true) => ({ do: "settle", quietMs, maxMs, afterChange });
// a guarded eval: a missing element must not throw the run
const evalIf = (sel, js) => ({ do: "eval", js: `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (e) { ${js} } })()` });

function fineSteps() {
    const s = [];
    s.push({ do: "mark", name: "open-hover" }, { do: "hover", sel: SUM, ms: 160 }, settle());
    s.push({ do: "mark", name: "theme-hover-in" });
    s.push({ do: "hoverIf", sel: TH, ms: 200 }, settle(450, 2500, false), { do: "wait", ms: 900 });
    s.push({ do: "mark", name: "theme-hover-out" }, { do: "move", to: REST, ms: 160 }, settle(450, 2500, false));
    s.push({ do: "waitChange", maxMs: 6500 }, { do: "mark", name: "close-idle" }, settle());
    s.push({ do: "mark", name: "open-hover-2" }, { do: "hover", sel: SUM, ms: 160 }, settle());
    s.push({ do: "mark", name: "theme-press" }, { do: "clickIf", sel: TH }, settle(500, 4000, false), { do: "wait", ms: 400 });
    s.push({ do: "mark", name: "theme-press-back" }, { do: "clickIf", sel: TH }, settle(500, 4000, false), { do: "wait", ms: 300 });
    // Escape belongs to the full layer: focus a seat there (the theme seat holds it after its press).
    s.push(evalIf(`${D} .dock-layer--full`, `if (!e.contains(document.activeElement)) e.querySelector('[data-glass-dock-seat], button')?.focus();`));
    s.push({ do: "move", to: REST }, { do: "mark", name: "close-escape" }, { do: "key", key: "Escape" }, settle(450, 3000, false));
    s.push({ do: "waitChange", maxMs: 4500 }, settle(450, 4000, false));
    s.push({ do: "mark", name: "open-press" }, { do: "click", sel: SUM }, settle());
    s.push({ do: "mark", name: "close-outside" }, { do: "click", to: REST }, settle(450, 4000, false));
    s.push({ do: "mark", name: "open-hover-3" }, { do: "hover", sel: SUM, ms: 160 }, settle());
    s.push({ do: "move", to: REST }, { do: "mark", name: "close-scroll" }, { do: "scroll", dy: 600 }, settle(450, 2500, false));
    s.push({ do: "mark", name: "scroll-back" }, { do: "scroll", dy: -600 }, settle(450, 2500, false));
    s.push({ do: "waitChange", maxMs: 4500 }, settle(450, 4000, false));
    return s;
}

function coarseSteps() {
    const s = [];
    s.push({ do: "mark", name: "open-tap" }, { do: "click", sel: SUM }, settle());
    s.push({ do: "mark", name: "theme-press" }, { do: "clickIf", sel: TH }, settle(500, 4000, false), { do: "wait", ms: 400 });
    s.push({ do: "mark", name: "theme-press-back" }, { do: "clickIf", sel: TH }, settle(500, 4000, false), { do: "wait", ms: 300 });
    s.push(evalIf(`${D} .dock-layer--full`, `if (!e.contains(document.activeElement)) e.querySelector('[data-glass-dock-seat], button')?.focus();`));
    s.push({ do: "mark", name: "close-escape" }, { do: "key", key: "Escape" }, settle(450, 3000, false));
    s.push({ do: "mark", name: "open-tap-2" }, { do: "click", sel: SUM }, settle());
    s.push({ do: "mark", name: "close-outside" }, { do: "click", to: REST }, settle(450, 4000, false));
    s.push({ do: "mark", name: "open-tap-3" }, { do: "click", sel: SUM }, settle());
    s.push({ do: "mark", name: "close-scroll" }, evalIf("[data-df-scroller]", "e.scrollBy(0, 600);"), settle(450, 2500, false));
    s.push({ do: "mark", name: "scroll-back" }, evalIf("[data-df-scroller]", "e.scrollBy(0, -600);"), settle(450, 2500, false));
    return s;
}

export function scenarioFor(name, t, pointer) {
    return {
        name: `${name}-${pointer}`,
        about: t.about,
        ...(t.url ? { url: t.url } : {}),
        cells: CELLS.filter((c) => c.pointer === pointer),
        ready: ".glass-dock >> visible=true",
        warmMs: t.url && /^https?:/.test(t.url) ? 2500 : 1200,
        track: track(t),
        cropAs: ["dock", "plate"],
        cropPad: 24,
        before: [{ do: "eval", js: STAMP(t) }, { do: "wait", ms: 400 }, { do: "move", to: REST }, { do: "wait", ms: 300 }],
        steps: pointer === "fine" ? fineSteps() : coarseSteps(),
    };
}

for (const [name, t] of Object.entries(TARGETS)) {
    for (const p of ["fine", "coarse"]) writeFileSync(join(OUT, `${name}-${p}.json`), JSON.stringify(scenarioFor(name, t, p), null, 1));
}
console.log("wrote", Object.keys(TARGETS).length * 2, "scenarios to", OUT);
