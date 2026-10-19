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
  // H5-2 · FACT's matrix: where the fact is written against where it is read (R-10, R-2)
  "atk-nopin": { why: "H5-2 plant: no pin. The tile's geometry reads the fact at the group, the pill's label clip, row law and development name at the option, so a write on the option splits them (D′c §2)", witnesses: ["FACT"], family: "atk", cell: /item-none-in-tile|matrix .*option/ },
  "atk-unbounded": { why: "H5-2 plant: F's unbounded pin `:where(.it, .it *) { --selection-tile: inherit !important }`, which outranks a nested group's own reset and declaration (Fc §2.1 N3)", witnesses: ["FACT"], family: "atk", cell: /pill-in-option|tile-in-option/ },
  "atk-nopin-dev": { why: "H5-2 plant on a development flavour: no pin, so the option written none inside a tile is also named a pill that asks for a second row (D′c §2's false name), and the matrix line says so", witnesses: ["FACT"], family: "atk", flavor: "src-dev", cell: /item-none-in-tile.*NAMED/ },
  "atk-mx-dev": { why: "H5-2 CONTROL, must PASS: the clean matrix on a development flavour, where the names gate: no read option is named", witnesses: ["FACT"], family: "atk", flavor: "src-dev", expect: "pass" },
  "atk-optpin": { why: "H5-2 plant: an option-only pin `.it { --selection-tile: inherit !important }` (D′c §4's form): content inside the option still writes its own fact and its rows split (Fs §2.3 «content-writes-none»)", witnesses: ["FACT"], family: "atk", cell: /matrix .*content/ },
  // H5-4 · a mount-time name, counted from navigation (X-5)
  "atk-x5none": { why: "H5-4 plant (development flavour): an option that holds a nested group is never named as holding an interactive descendant", witnesses: ["ATTACK"], family: "atk", flavor: "src-dev", cell: /x5 ·/ },
  "h5-logs-ready": { why: "H5-4 instrument plant (development flavour): console errors counted from ready, not from navigation (TILE_HARNESS_LOGS_FROM=ready, the pass-4 probes' habit): the X-5 name logged at mount is lost", witnesses: ["ATTACK"], family: "atk", flavor: "src-dev", env: { TILE_HARNESS_LOGS_FROM: "ready" }, cell: /x5 ·/ },
  // H6-3 · a SegmentedTabs in an option (R-2, FV-2)
  "atk-st-noreset": { why: "H6-3 plant: the strip resets no fact and the pin's limit stops at groups only (HEAD + floor v4, floor v5's FV5-2 struck): a strip inside a tile option reads the option's tile fact and its tabs stack two rows (Fc5 §3.1)", witnesses: ["FACT"], family: "atk", cell: /strip in a tile option/ },
  "atk-st-noreset-dev": { why: "H6-3 plant on a development flavour: the same, where the second-row names are read too", witnesses: ["FACT"], family: "atk", flavor: "src-dev", cell: /strip in a tile option/ },
  // H6-4 · `none!` at option, reported against FV5-3's sentence (E-3; the cell is info, so the plant reads info-fail)
  "atk-bang-soft": { why: "H6-4 plant: the `none!` write lands without its `!important`, so the pin refuses it and the option reads unchanged: not the split FV5-3 states", witnesses: ["FACT"], family: "atk", expect: "info-fail", cell: /none! light/ },
  "atk-bang-ref": { why: "H6-4 CONTROL, must PASS with the reported cell info-pass: the clean page's `none!` paints the split FV5-3 states", witnesses: ["FACT"], family: "atk", expect: "pass", note: { chromium: /info-pass\s+none! light/, webkit: /info-pass\s+none! light/ } },
  "atk-corner": { why: "H4-1 corner-refusal plant: the tile corner is a plain layered declaration, so a consumer utility, a scoped rule, an unlayered !important and an inline style each re-round the tile", witnesses: ["CORNER"], family: "atk", cell: /preset-migrated (utility|scoped|important|inline) / },
};

const PRESETS = [["smooth", "0.5 s · ζ 1"], ["snappy", "0.35 s · ζ 0.78"], ["bouncy", "0.5 s · ζ 0.5"], ["gentle", "0.7 s · ζ 0.95"]];
const STATUSES = ["Any status", "Messaged", "Not messaged", "Seen", "Not seen"];
const PALETTES = ["Dusk", "Moss", "Tide", "Clay"];
const STRIP = ["quad-in", "quad-out", "quad-in-out", "back-in", "back-out", "back-in-out"];
export const ATTACK_SCENES = ["preset", "family-d-undeclared", "preset-migrated", "specimen-migrated", "v2-migrated", "c1-migrated", "strip-migrated", "matrix-migrated"];
/** H5-2 · the matrix in fixture markup (attack-route `matrix`): options are role=radio divs, so a group can nest in one. */
function matrixBody(params, fault = "") {
  const w = params.get("w") ?? "", v = params.get("v") ?? "";
  // H6-4 · `none!` writes `none !important` inline; the `atk-bang-soft` plant drops the `!important` (the write the pin refuses)
  const W = (site) => (v && w === site ? ` style="--selection-tile: ${v.endsWith("!") ? `${v.slice(0, -1)}${fault === "atk-bang-soft" ? "" : " !important"}` : v}"` : "");
  const content = (a, b, site = false) => `<span class="mx-c" data-mx-content${site ? ` data-mx-site="content"${W("content")}` : ""}><span class="mx-b">${a}</span><span class="mx-b">${b}</span></span>`;
  const meta = (on) => (on ? '<span class="meta t-meta">0.5 s</span>' : "");
  // H6-3 · a SegmentedTabs-shaped strip (a `.pill-row` holder that is not a group); each tab carries two block rows
  const strip = (which) => `<div class="st" role="tablist" aria-label="Strip ${which}" data-mx-st="${which}">${["All", "Power", "Back", "Elastic"].map((l, k) => `<button type="button" class="st-tab pill-row" role="tab" aria-selected="${k === 0}"><span class="st-b">${l}</span><span class="st-b st-m">two</span></button>`).join("")}</div>`;
  const opt = (id, inner, extra = "") => `<div class="it" role="radio" aria-checked="false" data-mx-item="${id}"${extra}>${inner}</div>`;
  const kind = (k) => {
    const tile = k === "tile", t = tile ? "t" : "p";
    return `<div data-mx-kind="${k}" data-mx-site="ancestor" class="mx-host"${W("ancestor")}>
      <div role="radiogroup" aria-label="Matrix ${k}s" class="g-grid2" data-mx-site="group"${tile ? " data-tile" : ""}${W("group")}>
        ${opt(`${t}a`, content("Smooth", "calm", true) + meta(tile), ` data-mx-site="option"${W("option")}`)}
        <div class="mx-wrap" data-mx-site="wrapper"${W("wrapper")}>${opt(`${t}b`, content("Snappy", "quick") + meta(tile))}</div>
        ${opt(`${t}c`, content("Bouncy", "lively") + `<div role="radiogroup" aria-label="Nested" class="g-row" data-mx-site="nested-group"${!tile ? " data-tile" : ""}${W("nested-group")}>${opt(`${t}n0`, content("Inner", "row") + meta(!tile), ` data-mx-site="nested-option"${W("nested-option")}`)}${opt(`${t}n1`, content("Other", "row") + meta(!tile))}</div>` + meta(tile))}
        ${opt(`${t}d`, content("Gentle", "soft") + strip(t) + meta(tile), ' style="grid-column: 1 / -1"')}
      </div></div>`;
  };
  // the reference strip sits in a role=group wrapper: the fixture registers no fact, so the wrapper's reset gives it the
  // `none` the library's root gives it (`@property`'s initial value)
  return `<div class="mx-both">${kind("tile")}${kind("pill")}<div role="group" aria-label="Reference">${strip("ref")}</div></div>`;
}

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
    case "matrix-migrated": body = matrixBody(params, fault); break;
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
[data-group], [role=radiogroup], [role=group]${fault.startsWith("atk-st-noreset") ? "" : ", .st"} { --selection-tile: none; }
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
/* H5-2 · the pin (floor v4, M-13): the option and its content carry their group's fact, bounded at a nested group */
${fault.startsWith("atk-nopin") ? "" : fault === "atk-unbounded" ? ":where(.it, .it *) { --selection-tile: inherit !important; }"
  : fault === "atk-optpin" ? ".it { --selection-tile: inherit !important; }"
  : `@scope (.it) to ([data-group], [role=radiogroup], [role=group]${fault.startsWith("atk-st-noreset") ? "" : ", .st"}) { :scope, :scope * { --selection-tile: inherit !important; } }`}
/* H6-3 · the strip (SegmentedTabs' shape): a track of tabs, each a one-row \`.pill-row\` holder (floor v5's FV5-2 reset
   is the \`.st\` in the reset and in the pin's limit above; the atk-st-noreset plant strikes both) */
.st { display: flex; gap: 2px; padding: 3px; border: 1px solid var(--seam); border-radius: 9999px; inline-size: max-content; }
/* a block-flow tab of a fixed size, so its two block rows stack (and are cut) unless the one-row law runs them inline */
.st-tab { appearance: none; font: inherit; color: inherit; border: 0; background: none; padding: 0 10px; block-size: 30px; box-sizing: border-box; line-height: 30px; display: inline-block; white-space: nowrap; border-radius: 9999px; }
.st-tab[aria-selected="true"] { background: var(--fill-on); }
.st-b { display: block; } .st-m { font-size: 11px; }
@container style(--selection-tile: none) { .pill-row * { display: inline !important; } }
/* H5-2 · the floor's readers in the matrix, each at its own element, as floor v3 reads them: the pill's clamp at the
   option (its container is its parent), the label clip at the option's children (their container is the option), the
   one-row law at every descendant (its container is its parent) */
.mx-host { width: 460px; } .mx-wrap { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.mx-c, .mx-b { display: block; } .mx-b + .mx-b { font-size: 12px; }
.mx-both .it { cursor: default; }
@container style(--selection-tile: none) {
  .mx-both .it { max-block-size: var(--rung); overflow: clip; white-space: nowrap; }
  .mx-both .it > :not(svg) { overflow: hidden; text-overflow: ellipsis; padding-block: 0.15em; }
  .mx-both .it *:not(.it) { display: inline !important; }
}
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
// H5-2 / H5-4 · development names in the matrix, in the library's words and at mount: a pill whose own fact is none
// and whose content takes a second row; an option that holds another option (X-5; the atk-x5none plant drops it)
if (DEV) for (const el of document.querySelectorAll(".mx-both .it")) {
  const id = el.dataset.mxItem, box = el.getBoundingClientRect();
  const boxes = []; const rg = document.createRange(); const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) { if (n.parentElement.closest(".it") !== el) continue; rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1) boxes.push(r); }
  boxes.sort((p, q) => p.bottom - q.bottom); let rows = 0, bottom = -Infinity; for (const r of boxes) if ((r.top + r.bottom) / 2 > bottom) { rows++; bottom = r.bottom; }
  if (getComputedStyle(el).getPropertyValue("--selection-tile").trim() === "none" && !el.querySelector(".it") && rows > 1) console.error('[ToggleGroupItem] value="' + id + '" asks for a second row: a pill shows its content on one row.');
  if (el.querySelector(".it") && FAULT !== "atk-x5none") console.error('[ToggleGroupItem] value="' + id + '" holds an interactive descendant. The item is one button: nothing inside it takes focus or a click of its own.');
}
window.__tile = { ready: false, dev: DEV, flavor: FLAVOR, scenes: ${JSON.stringify(ATTACK_SCENES.map((id) => ({ id })))}, scene: ${JSON.stringify(scene)}, exports: [],
  migration: { label: "fixture", attack: true, sites: ["preset", "specimen", "v2", "c1", "strip", "matrix"] },
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
