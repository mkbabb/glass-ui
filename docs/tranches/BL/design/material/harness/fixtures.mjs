#!/usr/bin/env node
// fixtures.mjs · hand-made minimal fixtures that honour the specimen DOM contract (specimens.mjs), so every
// witness can be shown PASS on a page built to satisfy it and FAIL on a planted violation (selftest.mjs).
// A fixture is plain HTML with no library code. It lays out the same ids on the same grid as the specimen app.
//
//   node fixtures.mjs <profile> [--out <dir>] [--fields <capdir>] [--alphas <json>]
//
// Profiles:
//   green  the M battery's green page: opaque plates, each a distinct near-paper tint (light) or a lifted tone
//          (dark), static ink that clears every ratio. Also the battery W-D's fixture solver must keep green.
//   A      D3-A: the card pole at a per-spec α (--alphas, as calibrated by selftest.mjs against W-A's bound).
//   B      D3-B: a flat field whose painted colour the page knows, so the dock publishes the luma it painted
//          (no readback), the same frame the ceiling steps.
//   C      D3-C: opaque card-pole plates; every muted ink is a relative-colour solve against the plate colour
//          (achromatic, target 5.0:1), so a consumer retune of --card or --background moves the ink.
//   E      D3-E: a thin card-pole frost (α 0.20); every glyph carries a 6 px card stroke (3 px outside the outline) under its fill, every
//          indicator an ink band inside a card band.
//   F      D3-F: the field layer carves a well under each registered surface rect (the pole at 82% over the field).
//
// Violation hooks read by the page at run time (selftest.mjs injects them with capture.mjs --inject):
//   --fx-readback: 1          the page runs a 2D-canvas getImageData every frame (M-5's violation)
//   --fx-publish-delay: <n>   B publishes n frames after the field changes (W-B's violation)
//   --fx-well-spill: <px>     F's wells extend past each rect (W-F's violation)
// The aurora grounds are real field pixels: the frozen aurora (PRM, one frame) captured by the HEAD run's empty
// scene in Chromium, per theme and ceiling (--fields <capdir>). Profile B paints a flat field instead.
import fs from "node:fs";
import path from "node:path";
import { OUT, cli } from "./lib.mjs";

// OKLab → sRGB hex (fixture authoring only; no witness reads this).
function oklabHex(L, a, b) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  return "#" + lin.map((c) => { c = Math.max(0, Math.min(1, c)); const e = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055; return Math.round(e * 255).toString(16).padStart(2, "0"); }).join("");
}
const polar = (L, C, hdeg) => oklabHex(L, C * Math.cos((hdeg * Math.PI) / 180), C * Math.sin((hdeg * Math.PI) / 180));

const SPECS = ["wash", "quiet", "resting", "card", "floating", "overlay", "dialog-rung", "opaque"];
const BAND = { wash: "content", quiet: "content", resting: "content", card: "content", floating: "chrome", overlay: "chrome", "dialog-rung": "chrome", opaque: "escape", dock: "chrome", popover: "chrome", dialog: "chrome" };
const ALL = [...SPECS, "dock", "popover", "dialog"];

// The shared theme: page, card, inks. Light ink clears ≥ 5.4:1 on the lightest plate; dark likewise.
const THEME = {
  light: { page: "#fbfaf8", card: "#fdf5ec", fg: "#1f1a16", muted: "#6b6259", edge: "#6b6259", ring: "#1f1a16" },
  dark: { page: "#0b0a09", card: "#352a22", fg: "#f0ebe5", muted: "#b5ada3", edge: "#b5ada3", ring: "#f0ebe5" },
};

// The green profile's plates: light tints on a 0.013 circle around paper (adjacent chord 0.0153), dark tones stepping L.
function greenPlates() {
  const angle = { wash: 0, quiet: 72, resting: 144, floating: 216, overlay: 288, card: 36, "dialog-rung": 108, opaque: 180, dock: 252, popover: 324, dialog: 0 };
  const Ld = { wash: 0.22, quiet: 0.235, resting: 0.25, floating: 0.265, overlay: 0.28, card: 0.242, "dialog-rung": 0.272, opaque: 0.3, dock: 0.257, popover: 0.227, dialog: 0.29 };
  const light = {}, dark = {};
  for (const id of ALL) {
    const r = id === "dialog" ? 0.008 : 0.013, t = (angle[id] * Math.PI) / 180;
    light[id] = oklabHex(0.983, r * Math.cos(t), 0.003 + r * Math.sin(t));
    dark[id] = polar(Ld[id], 0.012, 70);
  }
  return { light, dark };
}

export function fixtureProfile(profile, o = {}) {
  const T = THEME, alphas = o.alphas || {};
  const vars = (m) => Object.entries(m).map(([k, v]) => `--${k}: ${v};`).join(" ");
  let css = `:root { ${vars(T.light)} } html.dark { ${vars(T.dark)} }\n`;
  const plate = (id, rule) => `[data-spec="${id}"], [data-halo-host="${id}"] { ${rule} }\n`;
  if (profile === "green" || profile === "B") {
    const g = greenPlates();
    for (const id of ALL) css += `html:not(.dark) ${plate(id, `background: ${g.light[id]};`)}html.dark ${plate(id, `background: ${g.dark[id]};`)}`;
  } else if (profile === "A") {
    for (const theme of ["light", "dark"]) for (const id of ALL) {
      const a = alphas[theme]?.[id] ?? (id === "opaque" ? 1 : 0.9);
      css += `html${theme === "dark" ? ".dark" : ":not(.dark)"} ${plate(id, `background: color-mix(in srgb, var(--card) ${(a * 100).toFixed(1)}%, transparent);`)}`;
    }
    css += `.fx-well { background: var(--card); }\n`;
  } else if (profile === "C") {
    // A per-level plate between card and page; the muted ink solves 5.0:1 against it (OKLab l³ = Y for achromatic).
    const k = { wash: 100, quiet: 94, resting: 88, card: 82, floating: 76, overlay: 70, "dialog-rung": 64, opaque: 100, dock: 91, popover: 73, dialog: 67 };
    for (const id of ALL) css += plate(id, `--plate: color-mix(in oklab, var(--card) ${k[id]}%, var(--background)); background: var(--plate);`);
    css += `:root { --background: var(--page); }
[data-spec] { --muted-solved: oklch(from var(--plate) calc(pow(max(0, (pow(l, 3) + 0.05) / 5 - 0.05), 1 / 3)) 0 0); }
html.dark [data-spec] { --muted-solved: oklch(from var(--plate) calc(pow(min(1, 5 * (pow(l, 3) + 0.05) - 0.05), 1 / 3)) 0 0); }
[data-spec] .fx-muted, [data-spec] .fx-muted *, [data-spec] .fx-well::placeholder { color: var(--muted-solved); }
body { background: var(--background); }\n`;
  } else if (profile === "E") {
    for (const id of ALL) css += plate(id, id === "opaque" ? "background: var(--card);" : "background: color-mix(in srgb, var(--card) 20%, transparent);");
    css += `[data-spec] [data-ink] { -webkit-text-stroke: 6px var(--card); paint-order: stroke fill; }
.fx-well { background: var(--card); box-shadow: 0 0 0 2px var(--card); }
.fx-well:focus-visible, .fx-close:focus-visible { box-shadow: 0 0 0 7px var(--card); }\n`;
  } else if (profile === "F") {
    for (const id of ALL) css += plate(id, id === "opaque" ? "background: var(--card);" : "background: color-mix(in srgb, var(--card) 20%, transparent);");
    css += `.fx-wellfield { position: absolute; background: color-mix(in srgb, var(--wellpole) 82%, transparent); }
:root { --wellpole: #fbf6ef; } html.dark { --wellpole: #1a1512; }\n`;
  } else throw new Error(`unknown profile ${profile} (green, A, B, C, E, F)`);
  return css;
}

const BASE_CSS = `html, body { margin: 0; min-height: 100vh; }
body { background: var(--page); color: var(--fg); font-family: system-ui, sans-serif; font-size: 15px; line-height: 20px; }
#field { position: fixed; inset: 0; z-index: -2; background-size: 100% 100%; }
#wells { position: fixed; inset: 0; z-index: -1; pointer-events: none; }
html[data-ground="black"] #field { background: #000; }
html[data-ground="white"] #field { background: #fff; }
html[data-ground="checker"] #field { background: repeating-conic-gradient(#000 0 25%, #fff 0 50%) 0 0 / 16px 16px; }
html[data-ground="stripes"] #field { background: repeating-linear-gradient(90deg, #7c3aed 0 24px, #facc15 24px 48px); }
.fx-page { position: relative; width: 1280px; height: 900px; }
.fx-bare { position: absolute; left: 24px; top: 844px; width: 280px; height: 36px; }
.fx-plate { position: absolute; width: 280px; height: 188px; box-sizing: border-box; padding: 14px 16px; border-radius: 20px; }
.fx-plate p, .fx-pop p, .fx-dialog p { margin: 0 0 6px; }
.fx-fg { font-weight: 600; color: var(--fg); }
.fx-muted { color: var(--muted); }
.fx-wells { display: flex; gap: 12px; margin-top: 10px; }
.fx-well { flex: 1 1 0; min-width: 0; font: inherit; color: var(--fg); background: transparent; border: 2px solid var(--edge); border-radius: 10px; padding: 6px 10px; outline: none; }
.fx-well::placeholder { color: var(--muted); opacity: 1; }
.fx-well:focus-visible, .fx-close:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
.fx-sample { position: absolute; left: 16px; right: 16px; bottom: 10px; height: 44px; }
.fx-dock { position: absolute; left: 24px; top: 470px; display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 28px; }
.fx-tab { padding: 6px 12px; font-weight: 600; color: var(--fg); }
.fx-docksample { display: inline-block; width: 140px; height: 40px; }
.fx-pop { position: absolute; left: 936px; top: 512px; width: 248px; padding: 14px 16px; box-sizing: border-box; border-radius: 16px; }
.fx-popsample { height: 48px; margin-top: 8px; }
.fx-dialog { position: absolute; left: 400px; top: 270px; width: 480px; height: 360px; box-sizing: border-box; padding: 24px; border-radius: 24px; display: flex; flex-direction: column; gap: 10px; }
.fx-dialog h2 { margin: 0; font-size: 18px; line-height: 24px; font-weight: 600; color: var(--fg); }
.fx-close { position: absolute; right: 16px; top: 16px; font: inherit; background: transparent; color: var(--fg); border: 0; padding: 4px 8px; border-radius: 8px; }
.fx-dialogsample { height: 48px; }
.fx-host { position: absolute; left: 120px; width: 300px; height: 120px; box-sizing: border-box; border-radius: 20px; }
.fx-capsule { position: absolute; left: 2px; top: 40px; padding: 8px 18px; font: inherit; border: 0; border-radius: 999px; background: var(--card); color: var(--fg); box-shadow: 0 6px 26px rgb(0 0 0 / 0.35); }
/* A black shadow over the #0b0a09 page moves the pixels under 2/255, so M-7 would read "no shadow"; dark gets a light halo. */
html.dark .fx-capsule { box-shadow: 0 6px 26px rgb(255 255 255 / 0.3); }
`;

const PAGE_JS = `(() => {
const q = new URLSearchParams(location.search);
const ground = q.get("ground") || "paper", scene = q.get("scene") || "ladder", theme = q.get("theme") || "light", nodock = q.get("nodock") === "1";
const PROFILE = document.documentElement.dataset.profile;
document.documentElement.dataset.ground = ground;
const field = document.getElementById("field");
const FLAT = { light: [228, 106, 60], dark: [228, 106, 60] }, PAGE = { light: [251, 250, 248], dark: [11, 10, 9] };
let ceiling = ground === "aurora50" ? 0.5 : 1;
const isField = ground === "aurora" || ground === "aurora50";
const paintField = () => {
  if (!isField) return;
  if (PROFILE === "B") { field.style.background = "rgb(" + FLAT[theme].join(" ") + ")"; field.style.opacity = String(ceiling); }
  else field.style.backgroundImage = "url(field-" + theme + "-" + (ceiling === 1 ? "aurora" : "aurora50") + ".png)";
};
paintField();
const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const publishedY = () => { const c = FLAT[theme].map((v, i) => ceiling * v + (1 - ceiling) * PAGE[theme][i]); return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]); };
const publish = () => { const d = document.querySelector('[data-spec="dock"]'); if (!d || PROFILE !== "B" || !isField) return;
  d.setAttribute("data-backdrop-sample-state", "published"); d.style.setProperty("--glass-backdrop-luma", publishedY().toFixed(4)); };
window.__harness = { setCeiling(v) {
  ceiling = v; paintField();
  const delay = parseInt(cssVar("--fx-publish-delay") || "0", 10) || 0;
  if (!delay) return publish();
  let n = 0; const tick = () => (++n >= delay ? publish() : requestAnimationFrame(tick)); requestAnimationFrame(tick);
} };
const h = (tag, attrs = {}, kids = []) => { const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) if (k === "text") e.textContent = v; else if (k === "style") e.style.cssText = v; else e.setAttribute(k, v);
  for (const k of kids) e.append(k); return e; };
const BAND = ${JSON.stringify(BAND)};
const root = document.getElementById("root");
const wells = () => h("div", { class: "fx-wells" }, [
  h("input", { class: "fx-well", value: "Lot 42", "aria-label": "Lot", "data-ink": "well-fg", "data-edge": "well", "data-ring": "well" }),
  h("input", { class: "fx-well", placeholder: "Search lots", "aria-label": "Search", "data-ink": "well-muted" })]);
if (scene === "ladder") {
  ${JSON.stringify(SPECS)}.forEach((id, i) => root.append(h("section", { class: "fx-plate", "data-spec": id, "data-band": BAND[id],
    style: "left:" + (24 + (i % 4) * 304) + "px;top:" + (24 + Math.floor(i / 4) * 212) + "px" }, [
    h("p", { class: "fx-fg" }, [h("span", { "data-ink": "fg", text: id + " Aa foreground" })]),
    h("p", { class: "fx-muted" }, [h("span", { "data-ink": "muted", text: "Muted caption ink" })]),
    wells(), h("div", { class: "fx-sample", "data-sample": "" })])));
  if (!nodock) root.append(h("div", { class: "fx-dock", "data-spec": "dock", "data-band": "chrome" }, [
    h("span", { class: "fx-tab", text: "Photos" }), h("span", { class: "fx-tab" }, [h("span", { "data-ink": "fg", text: "Lots" })]),
    h("span", { class: "fx-muted" }, [h("span", { "data-ink": "muted", text: "12 lots" })]), h("span", { class: "fx-docksample", "data-sample": "" })]));
  root.append(h("div", { class: "fx-pop", "data-spec": "popover", "data-band": "chrome" }, [
    h("p", { class: "fx-fg" }, [h("span", { "data-ink": "fg", text: "Popover Aa foreground" })]),
    h("p", { class: "fx-muted" }, [h("span", { "data-ink": "muted", text: "Muted caption ink" })]), h("div", { class: "fx-popsample", "data-sample": "" })]));
} else if (scene === "dialog") {
  root.append(h("div", { class: "fx-dialog", "data-spec": "dialog", "data-band": "chrome", role: "dialog" }, [
    h("h2", {}, [h("span", { "data-ink": "fg", text: "Dialog Aa title" })]),
    h("p", { class: "fx-fg", style: "font-weight:400" }, [h("span", { "data-ink": "fg-description", text: "The description reads foreground ink." })]),
    h("p", { class: "fx-muted" }, [h("span", { "data-ink": "muted", text: "Muted caption ink" })]),
    h("input", { class: "fx-well", value: "Lot 42", "aria-label": "Lot", "data-ink": "well-fg", "data-edge": "well", "data-ring": "well", style: "flex:none" }),
    h("div", { class: "fx-dialogsample", "data-sample": "" }), h("button", { class: "fx-close", "data-ring": "close", text: "Close" })]));
} else if (scene === "halo") {
  ["wash", "quiet", "resting", "card"].forEach((id, i) => root.append(h("section", { class: "fx-host", "data-halo-host": id, style: "top:" + (40 + i * 150) + "px" },
    [h("button", { class: "fx-capsule", "data-halo-capsule": "", text: "Pause" })])));
  root.append(h("div", { class: "fx-host", "data-halo-ref": "", style: "top:640px" }, [h("button", { class: "fx-capsule", "data-halo-capsule": "", text: "Pause" })]));
}
// F: the field layer carves a well under every registered surface (the dock and popover included).
if (PROFILE === "F" && isField && scene !== "empty") requestAnimationFrame(() => {
  const layer = document.getElementById("wells"), sp = "var(--fx-well-spill, 0px)";
  for (const s of document.querySelectorAll("[data-spec]")) { const r = s.getBoundingClientRect();
    layer.append(h("div", { class: "fx-wellfield", style: "left:calc(" + r.left + "px - " + sp + ");top:calc(" + r.top + "px - " + sp + ");width:calc(" + r.width + "px + 2 * " + sp + ");height:calc(" + r.height + "px + 2 * " + sp + ")" })); }
});
publish();
// The M-5 violation: a synchronous readback every frame when the page is told to.
const cv = document.createElement("canvas"); cv.width = cv.height = 8; const cx = cv.getContext("2d");
const loop = () => { if (cssVar("--fx-readback") === "1") { cx.fillRect(0, 0, 8, 8); cx.getImageData(0, 0, 8, 8); } requestAnimationFrame(loop); };
requestAnimationFrame(loop);
})();`;

export function writeFixture(profile, o = {}) {
  const dir = path.resolve(o.out || path.join(OUT, "fixtures", profile));
  fs.mkdirSync(dir, { recursive: true });
  const html = `<!doctype html><html lang="en" data-profile="${profile}"><head><meta charset="utf-8"><meta name="viewport" content="width=1280, initial-scale=1">
<title>D3 fixture ${profile}</title>
<script>if (new URLSearchParams(location.search).get("theme") === "dark") document.documentElement.classList.add("dark");</script>
<style>${BASE_CSS}${fixtureProfile(profile, o)}</style></head>
<body><div id="field"></div><div id="wells"></div><div class="fx-bare" data-bare></div><main id="root" class="fx-page"></main>
<script>${PAGE_JS}</script></body></html>
`;
  fs.writeFileSync(path.join(dir, "index.html"), html);
  if (o.fields) for (const theme of ["light", "dark"]) for (const g of ["aurora", "aurora50"]) {
    const src = path.join(o.fields, "png", `chromium-${theme}-${g}-empty-base-full.png`);
    if (!fs.existsSync(src)) throw new Error(`no field capture ${src} (run the HEAD capture first)`);
    fs.copyFileSync(src, path.join(dir, `field-${theme}-${g}.png`));
  }
  fs.writeFileSync(path.join(dir, "build.json"), JSON.stringify({ label: `fixture-${profile}`, fixture: profile, alphas: o.alphas || null, fields: o.fields || null }, null, 1));
  return dir;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ out: { type: "string" }, fields: { type: "string" }, alphas: { type: "string" } });
  if (!a._[0]) { console.error("usage: node fixtures.mjs <green|A|B|C|E|F> [--out dir] [--fields <HEAD capdir>] [--alphas json]"); process.exit(2); }
  const dir = writeFixture(a._[0], { out: a.out, fields: a.fields, alphas: a.alphas ? JSON.parse(fs.readFileSync(a.alphas, "utf8")) : undefined });
  console.log(`fixture ${a._[0]} → ${dir}`);
}
