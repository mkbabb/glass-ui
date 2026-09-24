// fixtures.mjs · the minimal fixture: one hand-made page (no library, no build) that honours the scene DOM
// contract (scenes.mjs) and satisfies every witness, plus one planted violation per witness. It proves each
// witness can PASS and can FAIL; it says nothing about the library.
//
//   --fixture                   the compliant page (tiles on the field rung, a rung/2 control corner, a
//                               perimeter edge for selection, a whole ring, grid arrows, a commit motion)
//   --fixture --family e        options are one line and a guard refuses a second line (W-E's arm; the other
//                               families need multi-line tiles, so E cannot share the default page)
//   --fixture --fault <id>      the same page with one planted violation (FAULTS below)
import { SCENES } from "./scenes.mjs";

/** One planted violation per witness, each the defect class that witness exists to catch. */
export const FAULTS = {
  t1: "tiles wear the stadium (border-radius 9999px), so the corner grows with every line",
  t2: "one-line pills get a 12 px corner instead of h/2",
  t3: "selection is a faint fill only (no perimeter edge): < 3:1 and no second carrier",
  t4: "the specimen scroll port leaves 2 px of padding against the 4 px ring reach",
  t5: "ArrowUp and ArrowDown are dead (the tablist model), so grid arrows do not move",
  t6: "the commit is a repaint: only scale transitions, colour snaps",
  t7: "the verbatim scenes carry the consumer's dashed outline on the tile",
  t8: "a WebKit-only rule turns the tiles back into stadiums (Chromium stays green)",
  wa: "the control-role holders keep the stadium, so a wrapped holder balloons",
  wb: "no choice-card slot and no ChoiceGroup/ChoiceCard export",
  wc: "the card board is a listbox of options, each its own tab stop, with no group stamp",
  wd: "the declared cell lays out as a row",
  we: "the one-line guard is absent (with --family e)",
};

const PRESETS = [["smooth", "0.5 s · ζ 1"], ["snappy", "0.35 s · ζ 0.78"], ["bouncy", "0.5 s · ζ 0.5"], ["gentle", "0.7 s · ζ 0.95"]];
const CURVES = ["linear", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-cubic", "ease-out-cubic", "ease-in-back", "ease-out-back"];
const STRIP = ["quad-in", "quad-out", "quad-in-out", "back-in", "back-out", "back-in-out"];

export function fixturePage(params, fault = "", family = "") {
  const scene = params.get("scene") ?? "__index";
  const base = scene.replace(/-verbatim$/, "");
  const verbatim = scene.endsWith("-verbatim");
  const selQ = params.get("sel");
  const oneLine = family === "e";
  const exportsList = fault === "wb" ? ["SelectionGroup", "SelectionItem"] : ["ChoiceGroup", "ChoiceCard", "SelectionGroup", "SelectionItem"];

  const tile = (ink, meta, extra = "") => oneLine
    ? `<button type="button" class="it" role="radio" data-item ${extra}><span data-ink data-line-slot>${ink}</span></button>`
    : `<button type="button" class="it tile" role="radio" data-item ${fault === "wb" ? "" : 'data-slot="choice-card"'} ${extra}><span data-ink class="t-name">${ink}</span><span data-ink data-line-slot class="t-meta">${meta}</span></button>`;
  const pill = (v, extra = "") => `<button type="button" class="it" role="radio" data-item ${extra}><span data-ink data-line-slot>${v}</span></button>`;
  const group = (label, cls, body) => `<div role="radiogroup" aria-label="${label}" data-group class="${cls}">${body}</div>`;
  const spark = `<svg class="spark" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1 C .4 1 .6 0 1 0"/></svg>`;

  let body;
  switch (base) {
    case "preset": body = group("Spring presets", "g-grid2" + (verbatim ? " verbatim" : ""), PRESETS.map(([n, m]) => tile(n, m)).join("")); break;
    case "specimen": body = `<div class="port">${group("Easing curve specimens", "g-auto" + (verbatim ? " verbatim" : ""),
      CURVES.map((c) => oneLine ? tile(c) : `<button type="button" class="it tile" role="radio" data-item ${fault === "wb" ? "" : 'data-slot="choice-card"'}><span data-ink class="t-stage">${spark}</span><span data-ink data-line-slot class="t-meta">${c}</span></button>`).join(""))}</div>`; break;
    case "strip": body = group("Easing curve specimens", "g-row" + (verbatim ? " verbatim" : ""), STRIP.map((s) => oneLine ? tile(s) : `<button type="button" class="it tile" role="radio" data-item ${fault === "wb" ? "" : 'data-slot="choice-card"'}><span data-ink class="t-stage t-glyph">${spark}</span><span data-ink data-line-slot class="t-meta">${s.split("-").slice(1).join("-")}</span></button>`).join("")); break;
    case "single": body = group("Filter curves by family", "g-row", ["All", "Power", "Back", "Elastic"].map((v) => pill(v)).join("")); break;
    case "vertical": body = group("Channel", "g-col", ["L", "C", "H", "A"].map((v) => pill(v)).join("")); break;
    case "tabs": body = group("Family", "g-row", ["All", "Power", "Back", "Elastic"].map((v) => pill(v)).join("")); break;
    case "card": body = fault === "wc"
      ? `<div role="listbox" aria-label="Plan" data-group class="g-grid2">${["starter", "team", "studio", "scale"].map((v) => `<div class="it tile" role="option" tabindex="0" data-item data-listbox><span data-ink class="t-name">${v}</span><span data-ink data-line-slot class="t-meta">For a ${v} workload.</span></div>`).join("")}</div>`
      : group("Plan", "g-grid2", ["starter", "team", "studio", "scale"].map((v) => `<button type="button" class="it tile" role="radio" data-item data-selection-item><span data-ink class="t-name">${v}</span><span data-ink data-line-slot class="t-meta">For a ${v} workload.</span></button>`).join("")); break;
    case "chipcell": body = group("Cells", "g-row", ["one", "two", "three", "four"].map((v) => tile(v, `0.${v.length} s`)).join("")); break;
    case "wrap": body = group("Wrap", "g-row wrap", ["ToggleGroupItem", "Chip pill", "Button"].map((h, i) => `<button type="button" class="it holder" role="radio" data-item data-holder="${h}"><span data-ink data-line-slot>${["Linear", "Tag", "Continue"][i]}</span></button>`).join("")); break;
    case "family-d": body = group("Spring presets", "g-grid2 cell", PRESETS.map(([n, m]) => `<button type="button" class="it tile" role="radio" data-item><span data-ink class="t-name">${n}</span><span data-ink data-line-slot class="t-meta">${m}</span></button>`).join("")); break;
    default: body = `<p>${SCENES.map((s) => s.id).join(" · ")}</p>`;
  }

  const css = `
:root { color-scheme: light; --bg: #ffffff; --fg: #1c1917; --seam: #d6d3d1; --edge-on: #1c1917; --fill-on: #ecebea; --hover: #f0efee; --ring: #1d4ed8;
  --control-rung: 40px; --radius-control: calc(var(--control-rung) / 2); --radius-field: 16px; --radius-pill: 9999px; --type-leading-body: 1.5; }
:root.dark { color-scheme: dark; --bg: #141210; --fg: #f5f5f4; --seam: #3a3633; --edge-on: #f5f5f4; --fill-on: #26221f; --hover: #221f1c; --ring: #93c5fd; }
html, body { margin: 0; } body { background: var(--bg); color: var(--fg); font: 14px/20px system-ui, sans-serif; }
main { padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
section { width: 460px; }
.g-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.g-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; }
.g-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-start; }
.g-col { display: flex; flex-direction: column; gap: 8px; width: 64px; }
.port { overflow: auto; max-block-size: 260px; padding: ${fault === "t4" ? 2 : 6}px; }
.it { appearance: none; font: inherit; color: inherit; box-sizing: border-box; min-block-size: var(--control-rung); padding: 8px 14px; margin: 0;
  border: 2px solid var(--seam); background: var(--bg); border-radius: var(--radius-pill); display: inline-flex; align-items: center; justify-content: center; gap: 2px; line-height: 20px; cursor: pointer;
  transition: ${fault === "t6" ? "scale 120ms cubic-bezier(.3, 1.4, .5, 1)" : "scale 120ms cubic-bezier(.3, 1.4, .5, 1), background-color 260ms cubic-bezier(.3, 1.3, .5, 1), border-color 260ms ease"}; }
.g-col .it { width: 100%; }
.it:not(.tile):not(.holder) { white-space: nowrap; }
${fault === "t2" ? ".it:not(.tile):not(.holder) { border-radius: 12px; }" : ""}
@media (hover: hover) { .it:hover { scale: 1.015; background: var(--hover); } }
.it:active { scale: 0.97; }
.it[aria-checked="true"] { ${fault === "t3" ? "background: #f7f7f6;" : "border-color: var(--edge-on); background: var(--fill-on);"} }
:root.dark .it[aria-checked="true"] { ${fault === "t3" ? "background: #181614;" : ""} }
.it:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
.tile { border-radius: ${fault === "t1" ? "9999px" : "var(--radius-field)"}; flex-direction: column; align-items: flex-start; justify-content: flex-start; padding: 8px 12px; line-height: calc(var(--type-leading-body) * 1em); text-align: start; }
.webkit-only .tile { ${fault === "t8" ? "border-radius: 9999px;" : ""} }
.cell .tile { flex-direction: ${fault === "wd" ? "row" : "column"}; }
.holder { border-radius: ${fault === "wa" ? "9999px" : "var(--radius-control)"}; max-inline-size: 110px; white-space: normal; }
.g-row .tile { min-inline-size: 64px; }
.g-row.wrap .it { min-inline-size: 0; }
.t-meta { font-size: 12px; opacity: 0.8; }
.t-stage { display: block; width: 100%; height: 36px; }
.t-glyph { width: 28px; height: 22px; }
.spark { width: 100%; height: 100%; overflow: visible; } .spark path { fill: none; stroke: currentColor; stroke-width: 1.25; vector-effect: non-scaling-stroke; }
.verbatim .it { ${fault === "t7" ? "outline: 1px dashed transparent; outline-offset: -1px;" : ""} }
.sentinel { font: 12px system-ui; padding: 2px 6px; }
@media (forced-colors: active) { .it[aria-checked="true"] { border-color: Highlight; } }
`;

  const js = `
const q = new URLSearchParams(location.search);
const FAULT = ${JSON.stringify(fault)}, ONE_LINE = ${oneLine};
if (/AppleWebKit/.test(navigator.userAgent) && !/Chrome|Chromium/.test(navigator.userAgent)) document.documentElement.classList.add("webkit-only");
const g = document.querySelector("[data-group]");
const items = g ? [...g.querySelectorAll("[data-item]")] : [];
const on = (el) => el.getAttribute("aria-checked") === "true" || el.getAttribute("aria-selected") === "true";
function select(i) {
  items.forEach((el, k) => {
    if (el.hasAttribute("data-listbox")) el.setAttribute("aria-selected", String(k === i));
    else el.setAttribute("aria-checked", String(k === i));
  });
  roving();
}
function roving() {
  if (FAULT === "wc" && ${JSON.stringify(base)} === "card") return; // every option keeps tabindex 0
  const s = items.findIndex(on);
  items.forEach((el, k) => { el.tabIndex = (s < 0 ? k === 0 : k === s) ? 0 : -1; });
}
function neighbour(i, key) {
  const n = items.length, r = items.map((e) => e.getBoundingClientRect());
  if (key === "ArrowRight") return (i + 1) % n;
  if (key === "ArrowLeft") return (i - 1 + n) % n;
  if (FAULT === "t5") return -1;
  const down = key === "ArrowDown";
  const cx = r[i].x + r[i].width / 2;
  const col = items.map((_, k) => k).filter((k) => k !== i && Math.abs(r[k].x + r[k].width / 2 - cx) < r[i].width / 2 && (down ? r[k].y > r[i].y : r[k].y < r[i].y));
  col.sort((a, b) => down ? r[a].y - r[b].y : r[b].y - r[a].y);
  if (col.length) return col[0];
  return down ? (i + 1) % n : (i - 1 + n) % n; // a row: the cross arrows step linearly (APG radio group)
}
items.forEach((el, i) => {
  el.addEventListener("click", () => { select(i); el.focus(); });
  el.addEventListener("keydown", (e) => {
    if (FAULT === "wc" && el.hasAttribute("data-listbox")) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(i); } return; }
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); select(i); return; }
    if (!/^Arrow/.test(e.key)) return;
    const j = neighbour(i, e.key);
    if (j < 0) return;
    e.preventDefault(); select(j); items[j].focus();
  });
});
const vals = items.length;
select(q.get("sel") === "none" ? -1 : Math.min(q.get("sel") ? Number(q.get("sel")) : 1, vals - 1));
if (ONE_LINE && FAULT !== "we") {
  const ro = new ResizeObserver((es) => { for (const e of es) if (e.borderBoxSize[0].blockSize > 40.5) console.error("[fixture] an option holds more than one line; move the detail out of the option"); });
  items.forEach((el) => ro.observe(el));
}
window.__tile = { ready: false, dev: true, scenes: ${JSON.stringify(SCENES)}, scene: ${JSON.stringify(scene)}, exports: ${JSON.stringify(exportsList)},
  async select(i) { select(i === null ? -1 : i); }, selected: () => items.findIndex(on) };
requestAnimationFrame(() => requestAnimationFrame(() => { window.__tile.ready = true; }));
`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>D4 tile fixture</title>
<script>if (new URLSearchParams(location.search).get("mode") === "dark") document.documentElement.classList.add("dark");</script>
<style>${css}</style></head><body><main>
<button class="sentinel" data-sentinel="before" type="button">before</button>
<section data-scene="${scene}">${body}</section>
<button class="sentinel" data-sentinel="after" type="button">after</button>
</main><script>${js}</script></body></html>`;
}
