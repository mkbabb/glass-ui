// fixtures.mjs · the minimal fixture: one hand-made page (no library, no build) that honours the scene DOM
// contract (scenes.mjs) and satisfies every witness, plus planted violations. It proves each witness can PASS
// and can FAIL; it says nothing about the library.
//
//   --fixture                   the compliant page: tiles on the field rung at every rung (fine, coarse, the
//                               comfort axis), control holders on rung/2, the selected carrier a 2 px perimeter
//                               layer on ::before (alpha-clamped, lightness-floored, per-item tone) plus a fill, a
//                               whole library ring, one tab stop, geometric grid arrows with a linear step,
//                               keys from an editable descendant left alone, a live roving order, a spring pop on
//                               every commit (pointer, key, programmatic) and none on Tab entry, a structural
//                               one-line guard, and consumer arms (verbatim paint, a clean migration, twins)
//   --fixture --family e        options are one line and a guard refuses a second line (W-E's arm)
//   --fixture --fault <id>      the same page with one planted violation (FAULTS below)
//   --fixture --flavor <f>      the build flavour it emulates (dist by default): its DEV-only code runs only
//                               under src-dev, as a library build strips import.meta.env.DEV branches (H-9)
//   --fixture --family atk      H4-1: the shared attack compositions in fixture markup (fixture-attack.mjs)
//   --fixture --family h46      H4-6: the clean page plus a selection mark over pale media and a quieter commit pop
import { SCENES, SITES } from "./scenes.mjs";
import { ATTACK_FAULTS, attackFixturePage } from "./fixture-attack.mjs";

/**
 * The planted violations. Each names the witnesses it plants against, whether the witness must FAIL (the
 * default) or must still PASS (a control that proves the check reads the right thing), and for a FAIL the cell
 * that must be among the failing lines (`cell`, a regex over the printed line).
 */
export const FAULTS = {
  t1: { why: "tiles wear the stadium (border-radius 9999px), so the corner grows with every line", witnesses: ["T-1"], cell: /preset/ },
  "t1-self": { why: "tiles take a role the tile itself declares (rung/2 = 20 px): the per-element role names its own corner", witnesses: ["T-1"], cell: /root --radius-field/ },
  "t1-coarse": { why: "under a coarse pointer the tiles take rung/2 (30 px): the lozenge the owner rejected", witnesses: ["T-1"], cell: /coarse/ },
  "t1-scale": { why: "the tile corner rides --ui-scale (16 px × 1.25 = 20 px)", witnesses: ["T-1"], cell: /--ui-scale 1\.25/ },
  "t1-late": { why: "the control corner is stamped 300 ms after the content changes (painted frames show the stadium)", witnesses: ["T-1", "W-A"], cell: /wrap/ },
  "t1-ro": { why: "CONTROL, must PASS: the control corner is stamped by a ResizeObserver before paint; a synchronous read sees the stadium, the framed read the stamp", witnesses: ["T-1", "W-A"], expect: "pass" },
  t2: { why: "one-line pills get a 12 px corner instead of h/2", witnesses: ["T-2"], cell: /single/ },
  "t2-skip": { why: "a one-line pill wraps to two lines and leaves its rung", witnesses: ["T-2"], cell: /left its rung/ },
  t3: { why: "selection is a faint fill only (no perimeter edge): < 3:1 and no second carrier", witnesses: ["T-3"], cell: /preset/ },
  "t3-border": { why: "the carrier is the tile's own border-color, which the invalid grammar, a sibling state and the consumer's border erase", witnesses: ["T-3"], cell: /preset-invalid|preset-sibling|preset-verbatim/ },
  "t3-alpha": { why: "the carrier takes the tone as given: a translucent tone paints a translucent edge", witnesses: ["T-3"], cell: /preset-tone-translucent/ },
  "t3-unres": { why: "the carrier falls back to transparent when the tone does not resolve (no signal)", witnesses: ["T-3"], cell: /preset-tone-unresolvable/ },
  t4: { why: "the specimen scroll port leaves 2 px of padding against the 4 px ring reach", witnesses: ["T-4"], cell: /specimen/ },
  "t4-auto": { why: "no ring rule: the focused tile paints the UA's outline: auto", witnesses: ["T-4"], cell: /UA's focus outline/ },
  t5: { why: "ArrowUp and ArrowDown are dead (the tablist model), so grid arrows do not move", witnesses: ["T-5", "W-B"], cell: /ArrowDown|ArrowUp/ },
  "t5-cross": { why: "no linear step: the cross axis of a one-line row or column is dead", witnesses: ["T-5"], cell: /linear step/ },
  "t5-stop": { why: "the scroll port is its own tab stop in front of the set", witnesses: ["T-5"], cell: /tab stops/ },
  "t5-reorder": { why: "the roving order is captured at mount and goes stale after a keyed reorder", witnesses: ["T-5"], cell: /keyed reorder/ },
  "t5-input": { why: "keys typed in an editable descendant move the group's selection", witnesses: ["T-5"], cell: /interactive descendant/ },
  "t5-deselect": { why: "a single group whose model matches no value checks the first item (a false choice)", witnesses: ["T-5"], cell: /no selection/ },
  "t5-multi": { why: "N-of-M: Space on a focused tile does not toggle it", witnesses: ["T-5"], cell: /v2 .*Space/ },
  "t6-fade": { why: "the commit is a 120 ms linear fade of the selected layer: no pop, no travel", witnesses: ["T-6"], cell: /commit bar/ },
  "t6-tabpop": { why: "the pop also fires when Tab enters the checked tile", witnesses: ["T-6"], cell: /Tab entry/ },
  "t6-prog": { why: "the pop fires from pointer and key handlers only: a programmatic model change commits with none", witnesses: ["T-6"], cell: /programmatic/ },
  "t6-body": { why: "CONTROL, must PASS: no pop; a selection body springs to the committed tile (travel with an overshoot) on every commit, pointer, key and programmatic, and stays put on Tab entry", witnesses: ["T-6"], expect: "pass" },
  "t6-rest": { why: "CONTROL, must PASS: the selected tile rests scaled (1.05) and its pop overshoots and bounces around that settle; a resting scale is neither a pop on Tab entry nor a pop amplitude", witnesses: ["T-6"], expect: "pass" },
  "t6-still": { why: "hover keeps its light channel but does not scale, and a press does not squish (the per-frame hover-scale and press reads must fail on smooth frames, not be re-read away)", witnesses: ["T-6"], cell: /hover scale|press ·/ },
  "t6-glide": { why: "no pop; the selection body glides to the committed tile on a linear path and lands without overshoot (travel with no weight)", witnesses: ["T-6"], cell: /commit bar/ },
  t7: { why: "the migrated arm keeps the consumer's dashed outline on the tile", witnesses: ["T-7"], cell: /migrated/ },
  // H3 (pass 3)
  "t2-stack": { why: "H3-3: no one-row law: a <br>, a block child or an appended row stacks two rows inside a pill, and nothing names it", witnesses: ["T-2"], cell: /one-row law .*STACKED/ },
  "t2-cut": { why: "H3-3: each pill label is a 1lh block that clips (max-block-size 20px, overflow hidden): a second row is cut, unnamed", witnesses: ["T-2"], cell: /one-row law .*CUT/ },
  "t2-named": { why: "CONTROL, must PASS: no one-row law, but an observer names every stacked pill (a console error), late content included", witnesses: ["T-2"], expect: "pass" },
  "t2-mountonly": { why: "H3-6: the stacked pill is named only at mount; a row added after mount is never named", witnesses: ["T-2"], cell: /one-row law .*STACKED/ },
  // H4 (pass 4)
  "t2-selfblock": { why: "H4-2: the one-row law is a zero-specificity rule in a layer below the utilities (floor v2's `:where()` form): a label child that sets its own display: block, by inline style or by a utility class, stacks a second row, unnamed; the UA block div and the <br> stay on the row", witnesses: ["T-2"], cell: /one-row law · a span inside the label that sets its own display: block .*STACKED/ },
  "t3-migstate": { why: "H3-11: the migrated arm carries selection on the tile's own border (the erasable carrier); the library arm keeps the perimeter", witnesses: ["T-3"], cell: /preset-(invalid|sibling)-migrated/ },
  "t3-cv": { why: "H3-7: the perimeter straddles the border box, so paint containment (content-visibility: auto) cuts it", witnesses: ["T-3"], cell: /paint containment/ },
  "t4-forced": { why: "H3-8: in forced colours the specimen port pads 1 px, so the ring is cut on one side", witnesses: ["T-4"], cell: /forced/ },
  "t5-consumer": { why: "H3-12: a consumer role=option and tabindex=0 on every item override the engine: no radio, N tab stops", witnesses: ["T-5"], cell: /preset-consumer-aria/ },
  "t5-retired": { why: "H3-10: semantics=\"toggle\" falls through to the default with no signal", witnesses: ["T-5"], cell: /retired value/ },
  "t6-faint": { why: "H3-5: hover lifts the plate by a 1 % ink step: under the perceptual bar", witnesses: ["T-6"], cell: /hover light/ },
  "t6-rung": { why: "CONTROL, must PASS: hover lifts the plate by a 5 % ink step in oklab (the floor's rung, which sat on H2's 10-level threshold)", witnesses: ["T-6"], expect: "pass" },
  "t6-prt": { why: "H3-5: under reduced transparency the hover mixes by --glass-level, which PRT pins to 0: hover moves nothing", witnesses: ["T-6"], cell: /PRT hover light/ },
  "t6-calm": { why: "H3-9: a calm observer ancestor ([data-reorder]) suppresses the commit pop on a programmatic commit", witnesses: ["T-6"], cell: /calm observer/ },
  stall: { why: "H3-1 plant: the server never answers preset-contents' page (a navigation that never loads, the AppSSO stall's symptom): the witness stops loud (exit 2), names the scene, re-opens on a new browser process, and reads the unified log (AppSSO answered: not the AppSSO stall)", witnesses: ["T-3"], expect: "error", cell: /preset-contents \(light\) stalled twice, the second time on a new browser process, REPRODUCED.*first stall: (AppSSO answered|no AppSSO in this engine)/ },
  navcap: { why: "H3-1 CONTROL, must PASS: TILE_HARNESS_NAV_CAP=5 retires the Playwright WebKit browser every 5 navigations and every cell still reads", witnesses: ["T-3"], expect: "pass", env: { TILE_HARNESS_NAV_CAP: "5" }, note: { webkit: /retired and relaunched \d+×/ } },
  "canon-a": { why: "H3-4 plant A: the tile corner re-spelled in a second sheet (`:is(<tile>)`, 12 px): two rules decide the tile", witnesses: ["CANON"], cell: /canon tile corner/ },
  "canon-s": { why: "H3-4 plant S: a size arm on the tile (`[data-size=\"sm\"]`) on --radius-panel, which a one-md-item fixture never reaches", witnesses: ["CANON"], cell: /canon tile corner/ },
  "canon-h": { why: "H3-4 plant H: a structural re-spelling (`.toggle-group__item:has(> * + *)`, 12 px), which a childless fixture never reaches", witnesses: ["CANON"], cell: /canon pill winner/ },
  // H5-1 (pass 5): CANON evaluates container conditions and ranks corners by layer before specificity
  "canon-layer": { why: "H5-1 plant `layer` (D′c §5.2): an unlayered `.toggle-group { --selection-tile: none }` after the layer resets the fact on every group: no tile anywhere", witnesses: ["CANON"], cell: /canon tile (corner|winner)/ },
  "canon-foreign": { why: "H5-1 plant `foreign` (D′c §5.2): `.pill-row.control-surface { border-radius: 12px }` in the library's layer, a pill corner from a selector that does not name toggle-group", witnesses: ["CANON"], cell: /canon pill winner/ },
  "canon-unlayered": { why: "H5-1 plant: `:where(.toggle-group__item) { border-radius: 12px }` unlayered: zero specificity, but an unlayered normal declaration outranks every layer (a specificity-first ranker passes it)", witnesses: ["CANON"], cell: /canon pill winner/ },
  "canon-cq": { why: "H5-1 plant: a 12 px pill corner inside `@container style(--selection-tile: none)` in the library's layer: only the container condition scopes it to pills", witnesses: ["CANON"], cell: /canon pill winner/ },
  "canon-lowlayer": { why: "H5-1 CONTROL, must PASS: a (0,3,0) 12 px corner in `@layer base`, below the library's layer, loses to the (0,1,0) stadium (a specificity-first ranker fails it)", witnesses: ["CANON"], expect: "pass" },
  "canon-cqoff": { why: "H5-1 CONTROL, must PASS: the `cq` rule under `style(--selection-tile: plated)`, which no twin's container holds, reaches nothing (a container-blind reader fails it)", witnesses: ["CANON"], expect: "pass" },
  // H4-6 (reported, not gating; family h46)
  "h46-kick": { why: "H4-6 plant: the commit pop peaks at 1.035, so a 300 px tile pushes 5.25 px into a 4 px neighbour gap", witnesses: ["REPORT"], family: "h46", cell: /kick ·/ },
  "h46-mark": { why: "H4-6 plant: in dark the selection mark is near-white over the pale swatch (Fc §2.4's washed-out check)", witnesses: ["REPORT"], family: "h46", cell: /mark .*dark/ },
  "h46-nameink": { why: "H5-5 plant: the migrated K2 name pins its own ink (consumer paint, D′'s pass-4 `.tile-name { color }` class), so the selected name is not its item's ink", witnesses: ["REPORT"], family: "h46", cell: /name-ink ·/ },
  "h46-attack": { why: "H5-6 plant: REPORT handed an attack build (the F spec's pass-4 misdirection): it must stop loud, exit 2, and name the route build to pass", witnesses: ["REPORT"], family: "h46", expect: "error", cell: /REPORT reads a route build/ },
  ...ATTACK_FAULTS,
  "t8-migrated": { why: "H3-2: a WebKit-only rule turns the MIGRATED tiles back into stadiums (the library arm and Chromium stay green)", witnesses: ["T-8"], cell: /Playwright WebKit T-1 .*-migrated/ },

  t8: { why: "a WebKit-only rule turns the tiles back into stadiums (Chromium stays green)", witnesses: ["T-8"], cell: /Playwright WebKit T-1/ },
  wa: { why: "the control-role holders keep the stadium, so a wrapped holder balloons", witnesses: ["W-A"], cell: /wrap/ },
  wb: { why: "no choice-card slot and no ChoiceGroup/ChoiceCard export", witnesses: ["W-B"], cell: /exports|slots/ },
  wc: { why: "the card board is a listbox of options, each its own tab stop, with no group stamp", witnesses: ["W-C"], cell: /card/ },
  "wc-stamp": { why: "the group stamp is present but its values are stale: aria-checked never follows the selection", witnesses: ["W-C"], cell: /stamp/ },
  wd: { why: "the declared cell lays out as a row", witnesses: ["W-D"], cell: /family-d #/ },
  wd2: { why: "the declaration is ignored: every item is a cell, the undeclared pair included", witnesses: ["W-D"], cell: /family-d-undeclared/ },
  we: { why: "the one-line guard is absent", witnesses: ["W-E"], family: "e", cell: /refusal/ },
  "we-devonly": { why: "the one-line guard is DEV-only, so what a consumer installs refuses nothing", witnesses: ["W-E"], family: "e", cell: /refusal/ },
  "we-lh1": { why: "an option stacks two lines at line-height 1 inside its rung (the midpoint row test must count 2)", witnesses: ["W-E"], family: "e", cell: /not one line/ },
};

const PRESETS = [["smooth", "0.5 s · ζ 1"], ["snappy", "0.35 s · ζ 0.78"], ["bouncy", "0.5 s · ζ 0.5"], ["gentle", "0.7 s · ζ 0.95"]];
const CURVES = ["linear", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-cubic", "ease-out-cubic", "ease-in-back", "ease-out-back"];
const STRIP = ["quad-in", "quad-out", "quad-in-out", "back-in", "back-out", "back-in-out"];
const LEVELS = [1, 2, 3, 5, 8, 13];
const PALETTES = ["Dusk", "Moss", "Tide", "Clay"];
const STATUSES = [["Any status", ""], ["Messaged", "12"], ["Not messaged", "30"], ["Seen", "7"], ["Not seen", "35"]];

export function fixturePage(params, fault = "", family = "", flavor = "dist") {
  if (family === "atk") return attackFixturePage(params, fault, flavor);
  const scene = params.get("scene") ?? "__index";
  const h46 = family === "h46";
  if (fault === "stall" && scene === "preset-contents") return null; // H3-1 plant: lib.serve holds a null page
  const armMatch = scene.match(/-(verbatim|migrated)(-stripped)?$/);
  const arm = armMatch ? (armMatch[2] ? "stripped" : armMatch[1]) : "library";
  const site = scene.replace(/-(verbatim|migrated)(-stripped)?$/, "");
  const base = site.startsWith("preset-") ? "preset" : site === "family-d-undeclared" ? "family-d" : site;
  const oneLine = family === "e";
  const exportsList = fault === "wb" ? ["SelectionGroup", "SelectionItem"] : ["ChoiceGroup", "ChoiceCard", "SelectionGroup", "SelectionItem"];
  const slot = fault === "wb" ? "" : 'data-slot="choice-card"';
  const cc = arm === "verbatim" || arm === "migrated" ? " c-cell" : ""; // the consumer's paint class; twins drop it

  const tile = (name, meta, { extra = "", input = false, sibling = false, cls = "", consumer = false } = {}) => oneLine
    ? `<button type="button" class="it${cc}" role="radio" data-item ${extra}>${fault === "we-lh1" && name === "smooth" ? `<span data-ink class="t-lh1">a<br>b</span>` : `<span data-ink data-line-slot>${name}</span>`}</button>`
    : `<button type="button" class="it tile${cls}${sibling ? " is-bound" : ""}${cc}" ${consumer ? 'role="option" tabindex="0"' : 'role="radio"'} data-item ${slot} ${extra}><span data-ink class="t-name">${name}</span><span data-ink data-line-slot class="t-meta">${meta}</span>${input ? '<input data-ink data-descendant class="t-input" aria-label="note" value="note">' : ""}</button>`;
  const pill = (v, extra = "", inner = null) => `<button type="button" class="it" role="radio" data-item ${extra}>${inner ?? `<span data-ink data-line-slot>${v}</span>`}</button>`;
  const group = (label, cls, body, attrs = "") => `<div role="radiogroup" aria-label="${label}" data-group class="${cls}" ${attrs}>${body}</div>`;
  const spark = `<svg class="spark" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="M0 1 C .4 1 .6 0 1 0"/></svg>`;
  const staged = (name, meta, stageCls) => oneLine ? tile(name) : `<button type="button" class="it tile${cc}" role="radio" data-item ${slot}><span data-ink class="t-stage ${stageCls}">${spark}</span><span data-ink data-line-slot class="t-meta">${meta}</span></button>`;
  const presetTiles = (o = {}) => PRESETS.map(([n, m], i) => tile(n, m, { ...o, input: o.input && i === 0 })).join("");

  let body;
  switch (site) {
    case "preset": body = group("Spring presets", "g-grid2", presetTiles()); break;
    case "preset-invalid": body = group("Spring presets", "g-grid2", presetTiles(), 'data-invalid aria-invalid="true"'); break;
    case "preset-sibling": body = group("Spring presets", "g-grid2", presetTiles({ sibling: true })); break;
    case "preset-tone-translucent": body = group("Spring presets", "g-grid2", presetTiles(), 'style="--selection-tone: rgb(120 80 200 / 0.35)"'); break;
    case "preset-tone-unresolvable": body = group("Spring presets", "g-grid2", presetTiles(), 'style="--selection-tone: var(--th-undefined-tone)"'); break;
    case "preset-contents": body = group("Spring presets", "g-grid2", `<div style="display: contents">${presetTiles()}</div>`); break;
    case "preset-input": body = group("Spring presets", "g-grid2", presetTiles({ input: true })); break;
    case "preset-consumer-aria": body = group("Spring presets", "g-grid2", presetTiles({ consumer: true })); break;
    case "specimen": body = `<div class="port" ${fault === "t5-stop" ? 'tabindex="0"' : ""}>${group("Easing curve specimens", "g-auto", CURVES.map((c) => staged(c, c, "")).join(""))}</div>`; break;
    case "strip": body = group("Easing curve specimens", "g-row", STRIP.map((s) => staged(s, s.split("-").slice(1).join("-"), "t-glyph")).join("")); break;
    case "f1": body = `<div class="port-x">${group("Harmonic level", "g-row g-nowrap", LEVELS.map((n) => staged(`n${n}`, `n=${n}`, "t-thumb")).join(""))}</div>`; break;
    case "v2": body = `<div role="group" aria-label="Palettes" data-group class="g-col-wide">${PALETTES.map((p, i) => `<button type="button" class="it tile${cc}" data-item aria-pressed="${i === 1}"><span data-ink class="t-strip"><i></i><i></i><i></i><i></i></span><span data-ink data-line-slot class="t-meta">${p} · 4</span></button>`).join("")}</div>`; break;
    case "c1": body = group("Status", "g-col-wide", STATUSES.map(([l, n]) => `<button type="button" class="it row${cc}" role="radio" data-item><svg class="mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span data-ink data-line-slot class="t-grow">${l}</span>${n ? `<span data-ink class="t-meta">${n}</span>` : ""}</button>`).join("")); break;
    case "single": body = group("Filter curves by family", "g-row", ["All", "Power", "Back", "Elastic"].map((v, i) => pill(v, fault === "t2-skip" && i === 0 ? 'style="max-inline-size: 52px; white-space: normal"' : "", fault === "t2-skip" && i === 0 ? `<span data-ink data-line-slot>All power</span>` : null)).join("")); break;
    case "vertical": body = group("Channel", "g-col", ["L", "C", "H", "A"].map((v) => pill(v)).join("")); break;
    case "tabs": case "tabs-retired": body = group("Family", "g-row", ["All", "Power", "Back", "Elastic"].map((v) => pill(v)).join("")); break;
    case "pill-icon": body = group("View", "g-row", ["Grid", "List", "Board"].map((v) => pill(v, "", `<svg data-ink class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M12 4v16"/></svg><span data-ink data-line-slot>${v}</span>`)).join("")); break;
    case "pill-badge": body = group("Inbox", "g-row", ["Inbox", "Sent", "Drafts"].map((v) => pill(v, "", `<span data-ink data-line-slot>${v}</span><span data-ink class="badge">${v.length}</span>`)).join("")); break;
    case "card": body = fault === "wc"
      ? `<div role="listbox" aria-label="Plan" data-group class="g-grid2">${["starter", "team", "studio", "scale"].map((v) => `<div class="it tile" role="option" tabindex="0" data-item data-listbox><span data-ink class="t-name">${v}</span><span data-ink data-line-slot class="t-meta">For a ${v} workload.</span></div>`).join("")}</div>`
      : group("Plan", "g-grid2", ["starter", "team", "studio", "scale"].map((v) => `<button type="button" class="it tile" role="radio" data-item data-selection-item><span data-ink class="t-name">${v}</span><span data-ink data-line-slot class="t-meta">For a ${v} workload.</span></button>`).join("")); break;
    case "chipcell": body = group("Cells", "g-row", ["one", "two", "three", "four"].map((v) => tile(v, `0.${v.length} s`)).join("")); break;
    case "wrap": body = group("Wrap", "g-row wrap", ["ToggleGroupItem", "Chip pill", "Button"].map((h, i) => `<button type="button" class="it holder" role="radio" data-item data-holder="${h}"><span data-ink data-line-slot>${["Linear", "Tag", "Continue"][i]}</span></button>`).join("")); break;
    case "family-d": body = group("Spring presets", "g-grid2 cell", PRESETS.map(([n, m]) => `<button type="button" class="it tile" role="radio" data-item><span data-ink class="t-name">${n}</span><span data-ink data-line-slot class="t-meta">${m}</span></button>`).join("")); break;
    case "family-d-undeclared": body = group("Spring presets", "g-grid2", PRESETS.map(([n, m]) => `<button type="button" class="it${fault === "wd2" ? " tile" : ""}" role="radio" data-item><span data-ink class="t-name">${n}</span><span data-ink data-line-slot class="t-meta">${m}</span></button>`).join("")); break;
    default: body = `<p>${SCENES.map((s) => s.id).join(" · ")}</p>`;
  }

  const late = fault === "t1-late" || fault === "t1-ro";
  const css = `
@layer base, utilities;
:root { color-scheme: light; --bg: #ffffff; --fg: #1c1917; --seam: #d6d3d1; --edge-on: #1c1917; --fill-on: #ecebea; --hover: #f0efee; --ring: #1d4ed8;
  --ui-scale: 1; --control-rung: calc(40px * var(--ui-scale)); --radius-control: calc(var(--control-rung) / 2); --radius-field: 16px; --radius-pill: 9999px; --type-leading-body: 1.5;
  ${fault === "t3-unres" ? "--selection-tone: var(--edge-on);" : ""} }
@media (pointer: coarse) { :root { --ui-scale: 1.5; } }
@media (prefers-reduced-transparency: reduce) { :root { --glass-level: 0; } }
:root.dark { color-scheme: dark; --bg: #141210; --fg: #f5f5f4; --seam: #3a3633; --edge-on: #f5f5f4; --fill-on: #26221f; --hover: #221f1c; --ring: #93c5fd; }
html, body { margin: 0; } body { background: var(--bg); color: var(--fg); font: 14px/20px system-ui, sans-serif; }
main { padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
section { width: 460px; }
.g-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.g-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; }
.g-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-start; }
.g-nowrap { flex-wrap: nowrap; }
.g-col { display: flex; flex-direction: column; gap: 8px; width: 64px; }
.g-col-wide { display: flex; flex-direction: column; gap: 6px; }
.port { overflow: auto; max-block-size: 260px; padding: ${fault === "t4" ? 2 : 6}px; }
.port-x { overflow-x: auto; overflow-y: hidden; padding: 6px; }
${fault === "t4-forced" ? "@media (forced-colors: active) { .port { padding: 1px; } }" : ""}
.it { position: relative; appearance: none; font: inherit; color: inherit; box-sizing: border-box; min-block-size: var(--control-rung); padding: 8px 14px; margin: 0;
  border: 2px solid var(--seam); background: var(--bg); border-radius: var(--radius-pill); display: inline-flex; align-items: center; justify-content: center; gap: 4px; line-height: 20px; cursor: pointer;
  transition: scale 120ms cubic-bezier(.3, 1.4, .5, 1), background-color 260ms cubic-bezier(.3, 1.3, .5, 1), border-color 260ms ease;
  --tone: var(--selection-tone${fault === "t3-unres" ? "" : ", var(--edge-on)"});
  --tone-edge: ${fault === "t3-alpha" ? "var(--tone)" : "oklch(from var(--tone) min(l, 0.42) c h / 1)"}; }
:root.dark .it { --tone-edge: ${fault === "t3-alpha" ? "var(--tone)" : "oklch(from var(--tone) max(l, 0.8) c h / 1)"}; }
.g-col .it { width: 100%; }
.it:not(.tile):not(.holder):not(.row) { white-space: nowrap; }
/* H3-3 · the pill's one-row law: a break, a block child or an appended row inside a pill lays out in its one row */
${oneLine /* not on the W-E family: its guard refuses a second line */ || fault === "t2-stack" || fault === "t2-named" || fault === "t2-mountonly" ? "" : fault === "t2-cut"
  ? ".it:not(.tile):not(.holder):not(.row) [data-ink] { display: block; max-block-size: 20px; overflow: hidden; }"
  : fault === "t2-selfblock" /* H4-2 plant: floor v2's form, a zero-specificity law under the utilities layer */
  ? "@layer base { :where(.it:not(.tile):not(.holder):not(.row)) :where([data-ink] br) { display: none; } :where(.it:not(.tile):not(.holder):not(.row)) :where([data-ink], [data-ink] *) { display: inline; } }"
  : /* H4-2: the law holds against a child that sets its own display (inline style, a utility) */ ".it:not(.tile):not(.holder):not(.row) [data-ink] br { display: none !important; } .it:not(.tile):not(.holder):not(.row) [data-ink], .it:not(.tile):not(.holder):not(.row) [data-ink] :not(br) { display: inline !important; }"}
${fault === "t2" ? ".it:not(.tile):not(.holder):not(.row) { border-radius: 12px; }" : ""}
@media (hover: hover) { .it:hover { ${fault === "t6-still" ? "" : "scale: 1.015; "}background: ${fault === "t6-faint" ? "color-mix(in srgb, var(--fg) 1%, var(--bg))" : fault === "t6-rung" ? "color-mix(in oklab, var(--fg) 5%, var(--bg))" : fault === "t6-prt" ? "color-mix(in srgb, var(--hover) calc(var(--glass-level, 1) * 100%), var(--bg))" : "var(--hover)"}; } }
${fault === "t6-still" ? "" : ".it:active { scale: 0.97; }"}
.it[aria-checked="true"], .it[aria-pressed="true"] { background: ${fault === "t3" ? "#f7f7f6" : "var(--fill-on)"}; }
:root.dark .it[aria-checked="true"], :root.dark .it[aria-pressed="true"] { ${fault === "t3" ? "background: #181614;" : ""} }
/* the selected carrier: a 2 px perimeter layer the content, the tile's own border and consumer paint cannot reach */
.it::before { content: ""; position: absolute; inset: 0; border: 2px solid ${fault === "t3-unres" ? "var(--tone-edge, transparent)" : "var(--tone-edge)"}; border-radius: inherit; pointer-events: none; opacity: 0;
  ${fault === "t6-fade" ? "transition: opacity 120ms linear;" : ""} }
${fault === "t3" || fault === "t3-border" ? "" : '.it[aria-checked="true"]::before, .it[aria-pressed="true"]::before { opacity: 1; }'}
${fault === "t3-migstate" ? ':where([data-arm="migrated"]) .it[aria-checked="true"]::before { opacity: 0; } :where([data-arm="migrated"]) .it[aria-checked="true"] { border-color: var(--edge-on); }' : ""}
${fault === "t3-cv" ? ".it::before { inset: -2px; }" : ""}
${fault === "t3-border" ? '.it[aria-checked="true"], .it[aria-pressed="true"] { border-color: var(--edge-on); }' : ""}
${fault === "t4-auto" ? "" : ".it:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }"}
.tile { border-radius: ${fault === "t1" ? "9999px" : fault === "t1-self" ? "var(--radius-control)" : fault === "t1-scale" ? "calc(16px * var(--ui-scale))" : "var(--radius-field)"}; flex-direction: column; align-items: flex-start; justify-content: flex-start; padding: 8px 12px; line-height: calc(var(--type-leading-body) * 1em); text-align: start; }
${fault === "t1-coarse" ? "@media (pointer: coarse) { .tile { border-radius: calc(var(--control-rung) / 2); } }" : ""}
.webkit-only .tile { ${fault === "t8" ? "border-radius: 9999px;" : ""} }
${fault === "t8-migrated" ? '.webkit-only [data-arm="migrated"] .tile { border-radius: 9999px; }' : ""}
.cell .tile { flex-direction: ${fault === "wd" ? "row" : "column"}; }
.holder { border-radius: ${fault === "wa" || late ? "9999px" : "var(--radius-control)"}; max-inline-size: 110px; white-space: normal; }
${late ? '.holder[data-extent="block"] { border-radius: var(--radius-control); }' : ""}
.row { width: 100%; justify-content: flex-start; border-radius: 8px; }
.row .mark { width: 16px; height: 16px; flex: none; opacity: 0; } .row .mark path { fill: none; stroke: currentColor; stroke-width: 2; }
.row[aria-checked="true"] .mark { opacity: 1; }
.t-grow { flex: 1; }
.g-row .tile { min-inline-size: 64px; }
.g-row.wrap .it { min-inline-size: var(--control-rung); }
.t-meta { font-size: 12px; opacity: 0.8; }
.t-stage { display: block; width: 100%; height: 36px; }
.t-glyph { width: 28px; height: 22px; }
.t-thumb { width: 48px; height: 48px; }
.t-strip { display: flex; width: 100%; height: 24px; } .t-strip i { flex: 1; background: #6d28d9; } .t-strip i:nth-child(2n) { background: #db2777; }
.t-lh1 { display: block; font-size: 9px; line-height: 1; }
.t-input { inline-size: 5rem; font: inherit; font-size: 12px; }
.icon { width: 16px; height: 16px; } .icon path { fill: none; stroke: currentColor; stroke-width: 2; }
.badge { font-size: 11px; line-height: 16px; padding: 0 6px; border-radius: 8px; background: var(--seam); }
.spark { width: 100%; height: 100%; overflow: visible; } .spark path { fill: none; stroke: currentColor; stroke-width: 1.25; vector-effect: non-scaling-stroke; }
/* the invalid grammar and a sibling state: both write the tile's own border (T-3's erasers) */
[data-invalid] .it { border-color: #db2424; }
.it.is-bound { border-color: var(--fg); }
/* consumer arms: the unmigrated composition's paint (its own corner, a transparent border, a dashed outline) */
[data-arm="verbatim"] .c-cell { border-radius: 12px; outline: 1px dashed transparent; outline-offset: -1px; border-color: transparent; }
[data-arm="verbatim"] .c-cell[aria-checked="true"] { outline-color: rgb(120 80 200 / 0.65); }
${fault === "t7" ? '[data-arm="migrated"] .c-cell { outline: 1px dashed transparent; outline-offset: -1px; }' : ""}
/* the commit: a spring pop on the committed tile (overshoot, bounce, settle) */
@keyframes pop { 0% { scale: 1; } 45% { scale: 1.035; } 70% { scale: 0.99; } 85% { scale: 1.003; } 100% { scale: 1; } }
.it.pop { animation: pop 420ms linear; }
${h46 && fault !== "h46-kick" ? "@keyframes pop { 0% { scale: 1; } 45% { scale: 1.02; } 70% { scale: 0.994; } 85% { scale: 1.002; } 100% { scale: 1; } }" : ""}
${h46 ? `.t-strip i, .t-strip i:nth-child(2n) { background: #ecfccb; }
.it[aria-pressed="true"]::after { content: ""; position: absolute; top: 12px; right: 18px; width: 16px; height: 16px; border-radius: 50%; background: #1c1917; pointer-events: none; }
${fault === "h46-mark" ? ':root.dark .it[aria-pressed="true"]::after { background: #f5f5f4; }' : ""}
${fault === "h46-nameink" ? '[data-arm="migrated"] .t-meta { color: rgb(120, 113, 108); }' : ""}` : ""}
${fault === "t6-calm" ? "[data-reorder] .it.pop { animation: none; }" : ""}
${fault === "t6-rest" ? '.it[aria-checked="true"], .it[aria-pressed="true"] { scale: 1.05; } @keyframes pop-rest { 0% { scale: 1; } 45% { scale: 1.085; } 70% { scale: 1.04; } 85% { scale: 1.053; } 100% { scale: 1.05; } } .it.pop { animation-name: pop-rest; }' : ""}
.sentinel { font: 12px system-ui; padding: 2px 6px; }
/* the t6-body / t6-glide plants: a selection body, out of flow, under the pointer's reach */
.has-body { position: relative; }
.sbody { position: absolute; left: 0; top: 0; box-sizing: border-box; border: 2px solid var(--edge-on); border-radius: var(--radius-field); pointer-events: none; }
@media (forced-colors: active) { .it[aria-checked="true"]::before, .it[aria-pressed="true"]::before { border-color: Highlight; } }
`;

  const js = `
const q = new URLSearchParams(location.search);
const FAULT = ${JSON.stringify(fault)}, ONE_LINE = ${oneLine}, FLAVOR = ${JSON.stringify(flavor)}, BASE = ${JSON.stringify(base)}, SITE = ${JSON.stringify(site)};
const DEV = FLAVOR === "src-dev"; // a library build strips import.meta.env.DEV branches
if (/AppleWebKit/.test(navigator.userAgent) && !/Chrome|Chromium/.test(navigator.userAgent)) document.documentElement.classList.add("webkit-only");
const g = document.querySelector("[data-group]");
const live = () => (g ? [...g.querySelectorAll("[data-item]")] : []);
const stale = live(); // the t5-reorder plant's snapshot
const list = () => (FAULT === "t5-reorder" ? stale : live());
const MULTI = SITE === "v2";
let ready = false;
const on = (el) => el.getAttribute("aria-checked") === "true" || el.getAttribute("aria-selected") === "true" || el.getAttribute("aria-pressed") === "true";
const BODY = (FAULT === "t6-body" || FAULT === "t6-glide") && g && !MULTI ? document.createElement("div") : null;
if (BODY) { BODY.setAttribute("data-selection-body", ""); BODY.className = "sbody"; g.classList.add("has-body"); g.prepend(BODY); }
/** Place the body on tile el; with animate, travel there from where it was: a spring with an overshoot (t6-body) or a linear glide (t6-glide). */
function place(el, animate) {
  if (!BODY) return;
  if (!el) { BODY.style.display = "none"; return; }
  const from = BODY.style.display === "none" ? null : { x: BODY.offsetLeft, y: BODY.offsetTop };
  Object.assign(BODY.style, { display: "", left: el.offsetLeft + "px", top: el.offsetTop + "px", width: el.offsetWidth + "px", height: el.offsetHeight + "px" });
  if (!animate || !from) return;
  const dx = from.x - el.offsetLeft, dy = from.y - el.offsetTop;
  if (!dx && !dy) return;
  BODY.animate(FAULT === "t6-glide"
    ? [{ translate: dx + "px " + dy + "px" }, { translate: "0px 0px" }]
    : [{ translate: dx + "px " + dy + "px" }, { translate: (-0.08 * dx) + "px " + (-0.08 * dy) + "px", offset: 0.6 }, { translate: (0.02 * dx) + "px " + (0.02 * dy) + "px", offset: 0.82 }, { translate: "0px 0px" }],
    { duration: FAULT === "t6-glide" ? 240 : 460, easing: FAULT === "t6-glide" ? "linear" : "ease-out" });
}
function pop(el) { if (!ready || FAULT === "t6-fade" || BODY) return; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
document.addEventListener("animationend", (e) => e.target.classList && e.target.classList.remove("pop"));
let current = null; // the model: the element the selection holds (never read back from the stamp)
function select(i, user = true) {
  const L = list(), prev = L.findIndex(on);
  current = i >= 0 ? L[i] : null;
  L.forEach((el, k) => {
    if (el.hasAttribute("data-listbox")) el.setAttribute("aria-selected", String(k === i));
    else if (FAULT === "wc-stamp" && SITE === "card") el.setAttribute("aria-checked", "false");
    else el.setAttribute("aria-checked", String(k === i));
  });
  roving();
  if (i !== prev || !ready) place(i >= 0 ? L[i] : null, ready);
  if (i >= 0 && i !== prev && (user || FAULT !== "t6-prog")) pop(L[i]);
}
function toggle(i) { const el = list()[i]; const v = el.getAttribute("aria-pressed") !== "true"; el.setAttribute("aria-pressed", String(v)); if (v) pop(el); }
function roving() {
  if (MULTI || (FAULT === "wc" && SITE === "card") || (FAULT === "t5-consumer" && SITE === "preset-consumer-aria")) return;
  const L = live(), s = L.findIndex(on);
  L.forEach((el, k) => { el.tabIndex = (s < 0 ? k === 0 : k === s) ? 0 : -1; });
}
function neighbour(i, key) {
  const L = list(), n = L.length, r = L.map((e) => e.getBoundingClientRect());
  const horiz = key === "ArrowRight" || key === "ArrowLeft", fwd = key === "ArrowRight" || key === "ArrowDown";
  const cx = r[i].x + r[i].width / 2, cy = r[i].y + r[i].height / 2;
  let best = -1, bd = Infinity;
  L.forEach((_, k) => {
    if (k === i) return;
    const x = r[k].x + r[k].width / 2, y = r[k].y + r[k].height / 2;
    if (horiz) { if (Math.abs(y - cy) >= r[i].height / 2 || (fwd ? x <= cx : x >= cx)) return; const d = Math.abs(x - cx); if (d < bd) { bd = d; best = k; } }
    else { if (FAULT === "t5" || Math.abs(y - cy) < r[i].height / 2 || (fwd ? y <= cy : y >= cy)) return; const d = Math.abs(y - cy) * 1000 + Math.abs(x - cx); if (d < bd) { bd = d; best = k; } }
  });
  if (best >= 0) return best;
  if ((FAULT === "t5" && !horiz) || FAULT === "t5-cross") return -1;
  return fwd ? (i + 1) % n : (i - 1 + n) % n; // where no item lies that way: a linear step (Q-4 b)
}
if (g) {
  g.addEventListener("click", (e) => {
    const el = e.target.closest("[data-item]");
    if (!el || e.target.closest("[data-descendant]")) return;
    const i = list().indexOf(el);
    if (MULTI) { if (FAULT === "t5-multi" && e.detail === 0) return; toggle(i); return; }
    select(i); el.focus();
  });
  g.addEventListener("keydown", (e) => {
    const el = e.target.closest("[data-item]");
    if (!el || MULTI) return;
    if (e.target !== el && FAULT !== "t5-input") return; // an editable descendant keeps its own keys (Q-5 b)
    const i = list().indexOf(el);
    if (FAULT === "wc" && el.hasAttribute("data-listbox")) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(i); } return; }
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); select(i); return; }
    if (!/^Arrow/.test(e.key)) return;
    const j = neighbour(i, e.key);
    if (j < 0) return;
    e.preventDefault(); select(j); list()[j].focus();
  });
  g.addEventListener("focusin", (e) => { const el = e.target.closest("[data-item]"); if (FAULT === "t6-tabpop" && el && on(el)) pop(el); });
}
// H3-12: the engine owns role and tabindex; a consumer's role=option / tabindex=0 is overwritten (the t5-consumer plant keeps them)
if (SITE === "preset-consumer-aria" && FAULT !== "t5-consumer") live().forEach((el) => el.setAttribute("role", "radio"));
// H3-10: a retired value is refused, named (the t5-retired plant falls through silently)
if (SITE === "tabs-retired" && FAULT !== "t5-retired") console.error('[fixture] SegmentedTabs: semantics="toggle" is retired; use "radio"');
// H3-3 / H3-6: the t2-named control names every stacked pill whenever it stacks; t2-mountonly names it at mount only
const PILL = (el) => !el.classList.contains("tile") && !el.classList.contains("holder") && !el.classList.contains("row");
const stacked = (el) => el.getBoundingClientRect().height > parseFloat(getComputedStyle(el).minBlockSize) + 0.5;
if (FAULT === "t2-named") { const ro = new ResizeObserver((es) => { for (const e of es) if (stacked(e.target)) console.error("[fixture] a pill holds more than one row"); }); live().filter(PILL).forEach((el) => ro.observe(el)); }
if (FAULT === "t2-mountonly") requestAnimationFrame(() => { for (const el of live().filter(PILL)) if (stacked(el)) console.error("[fixture] a pill holds more than one row"); });
const selQ = q.get("sel");
if (MULTI) roving();
else select(selQ === "none" ? (FAULT === "t5-deselect" ? 0 : -1) : Math.min(selQ ? Number(selQ) : 1, live().length - 1), false);
// the one-line guard (W-E): structural in every flavour; the we-devonly plant makes it DEV-only
const guardOn = ONE_LINE && FAULT !== "we" && (FAULT !== "we-devonly" || DEV);
if (guardOn) {
  const ro = new ResizeObserver((es) => { for (const e of es) if (e.borderBoxSize[0].blockSize > 40.5) console.error("[fixture] an option holds more than one line; move the detail out of the option"); });
  live().forEach((el) => ro.observe(el));
}
// the control-corner stamp (the t1-ro / t1-late plants): a ResizeObserver writes data-extent, now or 300 ms later
if (${JSON.stringify(late)}) {
  const ro = new ResizeObserver((es) => { for (const e of es) {
    const el = e.target, rung = parseFloat(getComputedStyle(el).minBlockSize);
    const v = e.borderBoxSize[0].blockSize > rung + 0.5 ? "block" : "line";
    if (FAULT === "t1-late") { el.removeAttribute("data-extent"); setTimeout(() => { el.dataset.extent = v; }, 300); } else el.dataset.extent = v;
  } });
  document.querySelectorAll(".holder").forEach((el) => ro.observe(el));
}
window.__tile = { ready: false, dev: DEV, flavor: FLAVOR, scenes: ${JSON.stringify(SCENES)}, scene: ${JSON.stringify(scene)}, exports: ${JSON.stringify(exportsList)},
  migration: { label: ${fault === "h46-attack" ? '"H4-attack", attack: true' : '"fixture"'}, sites: ${JSON.stringify(SITES)} },
  async select(i) { if (MULTI) { if (i !== null && list()[i].getAttribute("aria-pressed") !== "true") toggle(i); } else select(i === null ? -1 : i, false); },
  selected: () => (MULTI ? live().filter(on).map((el) => live().indexOf(el)) : current ? live().indexOf(current) : -1),
  async reorder() { const L = live(); L.reverse().forEach((el) => el.parentElement.appendChild(el)); roving(); } };
requestAnimationFrame(() => requestAnimationFrame(() => { ready = true; window.__tile.ready = true; }));
`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>D4 tile fixture</title>
<script>if (new URLSearchParams(location.search).get("mode") === "dark") document.documentElement.classList.add("dark");</script>
<style>${css}</style></head><body><main>
<button class="sentinel" data-sentinel="before" type="button">before</button>
<section data-scene="${scene}" data-arm="${arm}">${body}</section>
<button class="sentinel" data-sentinel="after" type="button">after</button>
</main><script>${js}</script></body></html>`;
}
