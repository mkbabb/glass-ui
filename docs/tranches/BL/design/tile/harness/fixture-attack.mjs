// fixture-attack.mjs · H4-1 · the attack fixture (`--fixture --family atk`): a hand-made page, no library, that renders
// the shared attack compositions (attack-route/migrated.mjs) in the fixture's own markup and satisfies every cell of
// fact-split.mjs, attack.mjs and corner-refusal.mjs, plus the plants that must fail them. It proves each cell can PASS
// and can FAIL; it says nothing about the library.
//
// The clean page is the floor-v3 shape REGISTRY §P3-4 M-11 asks for: one fact, `--selection-tile`, reset to `none` on
// every group and written to `flush` by a declaration (`[data-tile]`) or by a FILLED anatomy slot on a direct item
// (`:has(> .it > .meta:not(:empty))`); the tile's corner, column, pad and leading read the fact through
// `@container not style(--selection-tile: none)`; the corner is a layered `!important` (D′'s refusal); the engine owns
// role and tabindex; a development build names a pill that stacks a second row and nothing else.
export const ATTACK_FAULTS = {
  "atk-split": { why: "H4-1 fact-split plant: the tile geometry is a descendant selector on the declaration (`[data-tile] .it`), not a reader of the fact: a pill group nested in a tile group wears the tile corner, and a fact written without the declaration keeps the stadium", witnesses: ["FACT"], family: "atk", cell: /pill-in-tile|fact-plated|fact-flush/ },
  "atk-nest": { why: "H4-1 nesting-reach plant: the anatomy is matched through a descendant `:has()`, so a pill group holding a tile group turns into tiles", witnesses: ["FACT"], family: "atk", cell: /tile-in-pill/ },
  "atk-empty": { why: "H4-1 empty-anatomy plant: an anatomy slot that renders nothing still declares the tile (`:has(> .it > .meta)`, no `:not(:empty)`)", witnesses: ["ATTACK"], family: "atk", cell: /empty ·/ },
  "atk-attrs": { why: "H4-1 consumer-attributes plant: the consumer's role=option and tabindex=0 stand over the engine's", witnesses: ["ATTACK"], family: "atk", cell: /attrs ·/ },
  "atk-sup": { why: "H4-1 superscript plant (development flavour): the namer counts a <sup> as a second row and names a one-row pill", witnesses: ["ATTACK"], family: "atk", flavor: "src-dev", cell: /sup ·/ },
  "atk-sup-dev": { why: "CONTROL, must PASS: the clean page on a development flavour, where the `sup` cell gates: 0 names on one-row pills", witnesses: ["ATTACK"], family: "atk", flavor: "src-dev", expect: "pass" },
  "atk-corner": { why: "H4-1 corner-refusal plant: the tile corner is a plain layered declaration, so a consumer utility, a scoped rule, an unlayered !important and an inline style each re-round the tile", witnesses: ["CORNER"], family: "atk", cell: /preset-migrated (utility|scoped|important|inline) / },
};

const PRESETS = [["smooth", "0.5 s · ζ 1"], ["snappy", "0.35 s · ζ 0.78"], ["bouncy", "0.5 s · ζ 0.5"], ["gentle", "0.7 s · ζ 0.95"]];
const STATUSES = ["Any status", "Messaged", "Not messaged", "Seen", "Not seen"];
const PALETTES = ["Dusk", "Moss", "Tide", "Clay"];
const STRIP = ["quad-in", "quad-out", "quad-in-out", "back-in", "back-out", "back-in-out"];
export const ATTACK_SCENES = ["preset", "family-d-undeclared", "preset-migrated", "specimen-migrated", "v2-migrated", "c1-migrated", "strip-migrated"];

export function attackFixturePage(params, fault = "", flavor = "dist") {
  const scene = params.get("scene") ?? "__index";
  const arm = /-migrated$/.test(scene) ? "migrated" : "library";
  const tile = (n, m, extra = "") => `<button type="button" class="it" data-item ${extra}><span data-ink class="t-name">${n}</span><span data-ink data-line-slot class="t-meta meta">${m}</span></button>`;
  const pill = (v, extra = "") => `<button type="button" class="it" data-item ${extra}><span data-ink data-line-slot>${v}</span></button>`;
  const nested = (cls, label) => `<div role="radiogroup" aria-label="${label}" class="g-row ${cls}"><button type="button" class="it" role="radio" aria-checked="true" data-atk-item><span data-ink>Nested A</span></button><button type="button" class="it" role="radio" aria-checked="false" data-atk-item><span data-ink>Nested B</span></button></div>`;
  const consumer = (n) => `class="it atk-consumer" style="--atk-style: 7" data-consumer="yes" aria-label="preset ${n}" role="option" tabindex="0" onclick="this.dataset.clicks = String(Number(this.dataset.clicks || 0) + 1)"`;
  let body;
  switch (scene) {
    case "preset": body = `<div role="radiogroup" aria-label="Spring presets" data-group class="g-grid2">${PRESETS.map(([n, m]) => tile(n, m)).join("")}</div>`; break;
    case "family-d-undeclared": body = `<div role="radiogroup" aria-label="Spring presets" data-group class="g-row">${PRESETS.map(([n]) => pill(n)).join("")}</div>`; break;
    case "preset-migrated": body = `<div role="radiogroup" aria-label="Spring presets" data-group data-tile class="g-grid2">${PRESETS.map(([n, m]) => `<button type="button" ${consumer(n)} data-item><span data-ink class="t-name">${n}</span><span data-ink data-line-slot class="t-meta meta">${m}</span></button>`).join("")}</div>`; break;
    case "specimen-migrated": body = `<div class="atk-split"><div role="radiogroup" aria-label="Tiles" data-group data-tile class="g-grid2 atk-tile">${PRESETS.slice(0, 2).map(([n, m]) => tile(n, m)).join("")}<div class="atk-nest">${nested("atk-pill-in", "Nested pills")}</div></div>${nested("atk-pill-beside", "Pills beside")}</div>`; break;
    case "v2-migrated": body = `<div role="group" aria-label="Mix sources" data-group class="g-row atk-outer">${PALETTES.map((p, i) => pill(p, `aria-pressed="${i === 1}"`)).join("")}<div class="atk-nest"><div role="radiogroup" aria-label="Inner" data-tile class="atk-tile-in"><button type="button" class="it" role="radio" aria-checked="true" data-atk-item><span data-ink>Inner</span><span data-ink class="t-meta meta">tile</span></button></div></div></div>`; break;
    case "c1-migrated": body = `<div role="radiogroup" aria-label="Status" data-group class="g-col">${STATUSES.map((l) => `<button type="button" class="it" data-item><span class="media"></span><span data-ink data-line-slot>${l}</span><span class="meta"></span></button>`).join("")}</div>`; break;
    case "strip-migrated": body = `<div role="radiogroup" aria-label="Area unit" data-group class="g-row">${STRIP.map((s) => pill(`m<sup>2</sup> ${s}`)).join("")}</div>`; break;
    default: body = `<p>${ATTACK_SCENES.join(" · ")}</p>`;
  }
  // the fact's writers: a declaration, or a FILLED anatomy slot on a direct item
  const anatomy = fault === "atk-empty" ? ":is([data-group], [role=radiogroup], [role=group]):has(> .it > :is(.media, .meta))"
    : fault === "atk-nest" ? ":is([data-group], [role=radiogroup], [role=group]):has(.it > :is(.media, .meta):not(:empty))"
    : ":is([data-group], [role=radiogroup], [role=group]):has(> .it > :is(.media, .meta):not(:empty))";
  const imp = fault === "atk-corner" ? "" : " !important";
  const geometry = `border-radius: 16px${imp}; flex-direction: column; align-items: flex-start; justify-content: flex-start; padding: 8px 12px; line-height: 1.5; white-space: normal;`;
  const css = `
@layer base, utilities;
@layer base {
:root { color-scheme: light; --bg: #ffffff; --fg: #1c1917; --seam: #d6d3d1; --edge-on: #1c1917; --fill-on: #ecebea; --rung: 40px; }
:root.dark { color-scheme: dark; --bg: #141210; --fg: #f5f5f4; --seam: #3a3633; --edge-on: #f5f5f4; --fill-on: #26221f; }
html, body { margin: 0; } body { background: var(--bg); color: var(--fg); font: 14px/20px system-ui, sans-serif; }
main { padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
section { width: 460px; }
.g-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.g-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-start; }
.g-col { display: flex; flex-direction: column; gap: 6px; width: 220px; }
.atk-split { display: flex; flex-direction: column; gap: 12px; } .atk-nest { grid-column: 1 / -1; }
/* the fact: reset on every group, written by a declaration or by a filled anatomy slot */
[data-group], [role=radiogroup], [role=group] { --selection-tile: none; }
[data-tile] { --selection-tile: flush; }
${anatomy} { --selection-tile: flush; }
.it { position: relative; appearance: none; font: inherit; color: inherit; box-sizing: border-box; min-block-size: var(--rung); padding: 8px 14px; margin: 0;
  border: 2px solid var(--seam); background: var(--bg); border-radius: 9999px; display: inline-flex; align-items: center; justify-content: center; gap: 4px; line-height: 20px; white-space: nowrap; cursor: pointer; }
.it[aria-checked="true"], .it[aria-pressed="true"] { background: var(--fill-on); border-color: var(--edge-on); }
.it:focus-visible { outline: 2px solid #1d4ed8; outline-offset: 2px; }
.g-col .it { width: 100%; justify-content: flex-start; }
.media:empty, .meta:empty { display: none; }
.t-meta { font-size: 12px; opacity: 0.8; }
.it sup { line-height: 0; }
/* a pill holds one row */
@container style(--selection-tile: none) { .it [data-ink] br { display: none; } .it [data-ink], .it [data-ink] :not(sup) { display: inline; } }
/* the tile reads the fact (the one spelling) */
${fault === "atk-split" ? `[data-tile] .it { ${geometry} }` : `@container not style(--selection-tile: none) { .it { ${geometry} } }`}
}
.sentinel { font: 12px system-ui; padding: 2px 6px; }
`;
  const js = `
const FAULT = ${JSON.stringify(fault)}, FLAVOR = ${JSON.stringify(flavor)}, DEV = FLAVOR === "src-dev";
const q = new URLSearchParams(location.search);
const g = document.querySelector("[data-group]");
const live = () => (g ? [...g.querySelectorAll("[data-item]")] : []);
const RADIO = g && g.getAttribute("role") === "radiogroup";
const on = (el) => el.getAttribute("aria-checked") === "true" || el.getAttribute("aria-pressed") === "true";
let current = null;
function roving() { if (!RADIO || FAULT === "atk-attrs") return; const L = live(), s = L.findIndex(on); L.forEach((el, k) => { el.tabIndex = (s < 0 ? k === 0 : k === s) ? 0 : -1; }); }
function select(i) { const L = live(); current = i >= 0 ? L[i] : null; if (RADIO) L.forEach((el, k) => el.setAttribute("aria-checked", String(k === i))); roving(); }
// the engine owns role and tabindex (the atk-attrs plant leaves the consumer's standing)
if (RADIO && FAULT !== "atk-attrs") live().forEach((el) => el.setAttribute("role", "radio"));
if (g) g.addEventListener("click", (e) => { const el = e.target.closest("[data-item]"); if (!el || !RADIO) return; select(live().indexOf(el)); el.focus(); });
const selQ = q.get("sel");
if (RADIO) select(selQ === "none" ? -1 : Math.min(selQ ? Number(selQ) : 1, live().length - 1));
// development only: name a pill that stacks a second row (the atk-sup plant also names a superscript)
if (DEV) for (const el of document.querySelectorAll(".it")) {
  if (getComputedStyle(el).getPropertyValue("--selection-tile").trim() !== "none") continue;
  const h = el.getBoundingClientRect().height, rung = parseFloat(getComputedStyle(el).minBlockSize);
  if (h > rung + 0.5 || (FAULT === "atk-sup" && el.querySelector("sup"))) console.error("[fixture] a pill asks for a second row");
}
window.__tile = { ready: false, dev: DEV, flavor: FLAVOR, scenes: ${JSON.stringify(ATTACK_SCENES.map((id) => ({ id })))}, scene: ${JSON.stringify(scene)}, exports: [],
  migration: { label: "fixture", attack: true, sites: ["preset", "specimen", "v2", "c1", "strip"] },
  async select(i) { if (RADIO) select(i === null ? -1 : i); }, selected: () => (current ? live().indexOf(current) : -1), async reorder() {} };
requestAnimationFrame(() => requestAnimationFrame(() => { window.__tile.ready = true; }));
`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>D4 tile attack fixture</title>
<script>if (new URLSearchParams(location.search).get("mode") === "dark") document.documentElement.classList.add("dark");</script>
<style>${css}</style></head><body><main>
<button class="sentinel" data-sentinel="before" type="button">before</button>
<section data-scene="${scene}" data-arm="${arm}">${body}</section>
<button class="sentinel" data-sentinel="after" type="button">after</button>
</main><script>${js}</script></body></html>`;
}
