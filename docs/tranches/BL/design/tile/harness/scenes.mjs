// scenes.mjs · the scene app, written into a scratch build root and bundled against ANY worktree's `src` (or its
// built dist, H-9) through the `@glass` alias. Nothing here is library code. It transcribes the consumer tile
// sites and the single-line references, and stamps the DOM contract the witnesses read.
//
// THE DOM CONTRACT (fixtures.mjs honours the same one):
//   [data-scene="<id>"]   the scene root (one per page), with data-arm="library|verbatim|migrated|stripped"
//   [data-group]          the selection group
//   [data-item]           a selectable item (the element that owns the corner, the state and the focus)
//   [data-ink]            consumer content inside an item (hidden when the witness reads the plate alone)
//   [data-line-slot]      where a witness appends one more line of content
//   [data-sentinel]       focusable buttons before and after the group ("before", "after")
//   [data-selection-body] a route's selection body inside the group, if it has one (T-6 reads its travel)
//   [data-th-on]          a harness-only selected hook for a site that exposes its selection to nobody (F1)
//   window.__tile = { ready, dev, flavor, scenes, exports, migration, select(i|null), selected(), reorder() }
// URL: ?scene=<id> &mode=dark &shape=stadium|rungHalf|field (owner-glance only) &sel=<i>|none
//
// ARMS (H-7, Q-12 (c)). Every consumer site renders in three arms and two twins:
//   <site>                   the library arm: the consumer's markup, layout and unconditional content
//                            typography, with every consumer rule that paints the item dropped (radius, outline,
//                            background, border, shadow, and every state-keyed rule). The library's default.
//   <site>-verbatim          the unmigrated arm: the consumer's HEAD composition with all of its paint,
//                            transcribed below and never edited by a route.
//   <site>-migrated          the migrated arm: a route's migration (build.mjs --route <dir>, its migrated.mjs),
//                            reviewed by the route's critic. Absent at HEAD (the null migration IS the library arm).
//   <arm>-stripped           T-7's twin of an arm: the same markup with the arm's consumer CSS off and the class
//                            attributes of every [data-item] and [data-group] removed, so any difference in the
//                            item's computed paint between an arm and its twin is consumer paint.
// Consumer revisions transcribed (read-only): keyframes.js 574642be (K1 SpringPhysicsFacet.vue:72-89 markup,
// :197-215 scoped cell paint; K2 demo/components/EasingCatalogue/EasingCatalogue.vue:36-110 markup, :304-460
// paint, hosted by scenes/easing/EasingTarget.vue:11-60; design-idioms.css:242-264), value.js working tree of
// 2026-09-24 (V1 EasingSpecimenStrip.vue:86-227; V2 demo/workbenches/mix/MixSourceSelector.vue:293-345,
// 374-379), fourier-analysis a6d317d4 (F1 web/src/components/morph/HarmonicLevelGrid.vue:32-70, 214-364), chicago
// src/TempApp.vue:316-330 and src/style.css:106-109 (mtime 2026-09-23; the directory is not a git repository).
// K2 omits the catalogue's family-filter SegmentedTabs and the gallery header: they are not tiles, and a filter
// tab stop between the sentinels would be read as the set's. Its drawer takes a 340 px block size (the scene
// host's stand-in for the stage's flex height).

/**
 * The scene registry: which witness each scene gates (gates) or reports as information (info). `holder` is the
 * T-1 class (Q-1 (a)): `tile` (a multi-line selectable holder, bound to the card rung), `control` (a control whose
 * label wraps, bound to rung/2) or `pill` (one-line, T-2). `arms: true` marks a consumer site (H-7); `armGates`
 * lists the witnesses an arm other than the library arm gates.
 */
export const SCENES = [
  { id: "preset", site: "K1 keyframes.js SpringPhysicsFacet preset tiles", holder: "tile", arms: true, armGates: { verbatim: ["T-3"] }, deselect: true, reorder: true, gates: ["T-1", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "W-B", "W-E"] },
  { id: "specimen", site: "K2 keyframes.js EasingCatalogue specimen tiles in FadingScroll, in family sections", holder: "tile", arms: true, gates: ["T-1", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "W-B", "W-E"] },
  { id: "strip", site: "V1 value.js EasingSpecimenStrip, selectable Chip icon circles", holder: "tile", arms: true, gates: ["T-3", "T-5", "T-7", "W-B", "W-E"], info: ["T-1", "T-6"] },
  { id: "f1", site: "F1 fourier-analysis HarmonicLevelGrid, a thumbnail strip of glass Buttons (one-of-N, no ARIA state)", holder: "tile", arms: true, gates: ["T-1", "T-3", "T-4", "T-5", "T-6", "T-7"] },
  { id: "v2", site: "V2 value.js MixSourceSelector, N-of-M palette thumbnails on native buttons", holder: "tile", arms: true, multi: true, gates: ["T-1", "T-3", "T-5", "T-7"] },
  { id: "c1", site: "C1 chicago status filter, radios with a check mark", holder: "row", arms: true, gates: ["T-3", "T-4", "T-5", "T-7"] },
  // H-3 · the selected carrier under what erases a border (T-3). H3-11: each state also renders on a route's
  // migrated preset markup (`<id>-migrated`, `migratedArm: "preset"`), so the battery reads the route's carrier
  // under the state, not only the library's probe markup
  { id: "preset-invalid", site: "K1 tiles in an invalid group with a selection (ToggleGroup invalid)", holder: "tile", migratedArm: "preset", gates: ["T-3"] },
  { id: "preset-sibling", site: "K1 tiles carrying a sibling state at equal specificity (F1's is-bound: a full-ink border)", holder: "tile", migratedArm: "preset", gates: ["T-3"] },
  { id: "preset-tone-translucent", site: "K1 tiles with --selection-tone: rgb(120 80 200 / 0.35)", holder: "tile", migratedArm: "preset", gates: ["T-3"] },
  { id: "preset-tone-unresolvable", site: "K1 tiles with --selection-tone set to an undefined custom property", holder: "tile", migratedArm: "preset", gates: ["T-3"] },
  // H-10 · structure
  { id: "preset-contents", site: "K1 tiles behind a display: contents wrapper inside the group", holder: "tile", migratedArm: "preset", gates: ["T-1", "T-3", "T-5"] },
  { id: "preset-input", site: "K1 tiles, the first holding an <input> (an interactive descendant)", holder: "tile", descendant: true, gates: ["T-5"] },
  // H3-12 · a consumer role and tabindex written on every ToggleGroupItem (B first critique CX-4)
  { id: "preset-consumer-aria", site: "K1 tiles whose consumer writes role=\"option\" and tabindex=\"0\" on every ToggleGroupItem", holder: "tile", gates: ["T-5"] },
  // single-line references
  { id: "single", site: "single-line ToggleGroup sm (the keyframes.js family filter)", holder: "pill", gates: ["T-2", "T-5"], info: ["T-3", "T-6"] },
  { id: "vertical", site: "single-line vertical ToggleGroup, four items (the ConsoleRail analogue)", holder: "pill", gates: ["T-2", "T-5"] },
  { id: "tabs", site: "SegmentedTabs semantics=radio, four single-line options (H3-10: the floor's value)", holder: "pill", gates: ["T-2", "T-5"] },
  // H3-10 · the retired spelling (semantics="toggle"), its own cell: under the Q-5 policy it is refused, never a silent fall-through
  { id: "tabs-retired", site: "SegmentedTabs semantics=toggle (a retired value)", holder: "pill", retired: "semantics=\"toggle\"", gates: ["T-5"] },
  { id: "pill-icon", site: "ToggleGroup pills of an icon plus a label (D4-F question 1: stays a pill)", holder: "pill", gates: ["T-2"] },
  { id: "pill-badge", site: "ToggleGroup pills of a label plus a Badge (D4-F question 1: stays a pill)", holder: "pill", gates: ["T-2"] },
  { id: "card", site: "Card's selectable arm, wired as demo/stories/display/card.vue", holder: "tile", gates: ["T-1", "T-3", "T-4", "T-5", "T-6", "W-C"] },
  { id: "chipcell", site: "selectable Chip shape=cell, two lines", holder: "tile", gates: ["T-1", "T-3", "T-5", "T-6"] },
  { id: "wrap", site: "the control-role holders whose content can wrap: ToggleGroupItem, pill Chip, Button", holder: "control", gates: ["T-1", "W-A"] },
  { id: "family-d", site: "the preset tiles as <ToggleGroup shape=\"cell\"> with no item utilities", holder: "tile", gates: ["W-D"] },
  { id: "family-d-undeclared", site: "the same markup with the declaration removed (H-2's pair)", holder: "pill", pairOf: "family-d", gates: ["W-D", "T-2"] },
];
export const SITES = SCENES.filter((s) => s.arms).map((s) => s.id);

const PRESETS = [
  { name: "smooth", response: 0.5, damping: 1, blurb: "critically damped" },
  { name: "snappy", response: 0.35, damping: 0.78, blurb: "quick, a touch of overshoot" },
  { name: "bouncy", response: 0.5, damping: 0.5, blurb: "visible overshoot" },
  { name: "gentle", response: 0.7, damping: 0.95, blurb: "slow and soft" },
];
// Eight of the 28 specimen curves, portrait paths sampled from the easing functions (value vs time, y up), in the
// catalogue's family sections.
const CURVE_GROUPS = (() => {
  const fns = {
    linear: (t) => t,
    "ease-in-quad": (t) => t * t,
    "ease-out-quad": (t) => 1 - (1 - t) ** 2,
    "ease-in-out-quad": (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
    "ease-in-cubic": (t) => t ** 3,
    "ease-out-cubic": (t) => 1 - (1 - t) ** 3,
    "ease-in-back": (t) => 2.70158 * t ** 3 - 1.70158 * t * t,
    "ease-out-back": (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2,
  };
  const item = (name) => ({ name, description: `the ${name} curve`,
    path: Array.from({ length: 33 }, (_, i) => { const t = i / 32; return `${i ? "L" : "M"}${t.toFixed(4)} ${(1 - fns[name](t)).toFixed(4)}`; }).join(" ") });
  return [
    { family: "Power", items: ["linear", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-cubic", "ease-out-cubic"].map(item) },
    { family: "Back", items: ["ease-in-back", "ease-out-back"].map(item) },
  ];
})();
const STRIP = [
  { family: "quad", tiles: [["in", "M0 1 Q .6 1 1 0"], ["out", "M0 1 Q .4 0 1 0"], ["in-out", "M0 1 C .5 1 .5 0 1 0"]] },
  { family: "back", tiles: [["in", "M0 1 C .3 1.3 .7 .9 1 0"], ["out", "M0 1 C .3 .1 .7 -.3 1 0"], ["in-out", "M0 1 C .6 1.4 .4 -.4 1 0"]] },
];
// F1: harmonic levels, a rose of n petals per level; the low and high endpoints are bound (is-bound)
const LEVELS = [1, 2, 3, 5, 8, 13].map((n, i, a) => ({
  id: `n${n}`, n, bound: i === 0 || i === a.length - 1,
  path: Array.from({ length: 97 }, (_, k) => { const th = (k / 96) * 2 * Math.PI, r = 62 + 26 * Math.cos(n * th); return `${k ? "L" : "M"}${(100 + r * Math.cos(th)).toFixed(1)} ${(100 + r * Math.sin(th)).toFixed(1)}`; }).join(" ") + "Z",
}));
const PALETTES = [
  { slug: "dusk", name: "Dusk", colors: ["#1e1b4b", "#6d28d9", "#db2777", "#f59e0b"] },
  { slug: "moss", name: "Moss", colors: ["#14532d", "#4d7c0f", "#a3e635", "#ecfccb"] },
  { slug: "tide", name: "Tide", colors: ["#0c4a6e", "#0284c7", "#67e8f9", "#f0f9ff"] },
  { slug: "clay", name: "Clay", colors: ["#431407", "#c2410c", "#fdba74", "#fff7ed"] },
];
const STATUSES = [
  { value: "any", label: "Any status" }, { value: "messaged", label: "Messaged", count: 12 },
  { value: "unmessaged", label: "Not messaged", count: 30 }, { value: "seen", label: "Seen", count: 7 }, { value: "unseen", label: "Not seen", count: 35 },
];

// ── the groups, per site and arm ──────────────────────────────────────────────
function presetGroup({ verbatim = false, invalid = false, sibling = false, tone = null, contents = false, input = false, consumerAria = false } = {}) {
  const gcls = "preset-grid grid w-auto max-w-none grid-cols-2 gap-2" + (verbatim ? " rounded-none bg-transparent p-0 shadow-none backdrop-filter-none" : "");
  const icls = "preset-cell w-full min-w-0 flex-col items-start gap-0.5" + (verbatim ? " bg-background" : "") + " px-3 py-2 font-medium leading-normal" + (sibling ? " is-bound" : "");
  const item = `<ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" :title="p.blurb" data-item${consumerAria ? ' role="option" tabindex="0"' : ""} class="${icls}">
          <span data-ink class="text-small text-foreground capitalize">{{ p.name }}</span>
          <span data-ink data-line-slot class="text-mono-caption text-muted-foreground tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span>${input ? `
          <input v-if="p.name === orderedPresets[0].name" data-ink data-descendant class="tx-input" aria-label="Preset note" value="note" />` : ""}
        </ToggleGroupItem>`;
  return `<ToggleGroup type="single" data-group aria-label="Spring presets" class="${gcls}"${invalid ? " invalid" : ""}${tone ? ` style="--selection-tone: ${tone}"` : ""} v-model="model">
        ${contents ? `<div class="tx-contents">${item}</div>` : item}
      </ToggleGroup>`;
}
const presetHost = (g) => `<Card tier="quiet" class="cartoon-surface w-full overflow-visible"><CardContent class="panel-content flex flex-col gap-3 px-4 py-3">
      ${g}
    </CardContent></Card>`;

const specimenGroup = () => `<ToggleGroup type="single" size="sm" data-group aria-label="Easing curve specimens" class="specimen-grid-group" v-model="model">
        <section v-for="g in CURVE_GROUPS" :key="g.family" class="catalogue-section">
          <h3 class="catalogue-family text-subheading">{{ g.family }}</h3>
          <div class="specimen-grid">
            <ToggleGroupItem v-for="c in g.items" :key="c.name" :value="c.name" :aria-describedby="'desc-' + c.name" data-item data-surface="opaque" class="specimen-tile flex-col gap-1.5 px-2 py-2.5">
              <span data-ink class="tile-stage" aria-hidden="true"><span class="tile-plot"><svg class="tile-sparkline" viewBox="0 0 1 1" preserveAspectRatio="none"><path :d="c.path" vector-effect="non-scaling-stroke" /></svg><span class="curve-carriage tile-carriage" style="--curve-rest: translate(0%, 100%)"><span class="curve-ball tile-ball"></span></span></span></span>
              <span data-ink data-line-slot class="tile-name text-mono-caption" data-register="code">{{ c.name }}</span>
              <span :id="'desc-' + c.name" class="sr-only" aria-hidden="true">{{ c.description }}</span>
            </ToggleGroupItem>
          </div>
        </section>
      </ToggleGroup>`;
const specimenHost = (g) => `<Card :shadow="false" class="easing-target easing-gallery flex w-full flex-col gap-4 overflow-hidden px-4 py-4">
      <div class="easing-catalogue" data-easing-catalogue data-density="stage">
        <FadingScroll axis="y" class="specimen-drawer min-h-0 w-full flex-1">
      ${g}
        </FadingScroll>
      </div>
    </Card>`;

const stripGroup = ({ verbatim = false } = {}) => `<div class="strip-row" role="group" aria-label="Easing curve specimens" data-group>
          <div v-for="fam in STRIP" :key="fam.family" class="strip-family">
            <span class="family-eyebrow" aria-hidden="true">{{ fam.family }}</span>
            <div class="family-tiles">
              <Chip v-for="t in fam.tiles" :key="fam.family + t[0]" mode="selectable" shape="icon" class="vj-tile" data-item
                :model-value="model === fam.family + '-' + t[0]" :aria-label="fam.family + '-' + t[0]"
                @update:model-value="(on: boolean) => { if (on) model = fam.family + '-' + t[0]; }">
                <svg data-ink class="tile-glyph" viewBox="0 0 1 1" aria-hidden="true"><path :d="t[1]" vector-effect="non-scaling-stroke" /></svg>
                <span data-ink data-line-slot class="tile-label">{{ t[0] }}</span>
              </Chip>
            </div>
          </div>
        </div>`;
const stripHost = (g) => `<FadingScroll axis="x" class="specimen-strip">
        ${g}
      </FadingScroll>`;

const f1Group = () => `<div class="grid f1-grid" data-group>
        <Button v-for="lv in LEVELS" :key="lv.id" emphasis="secondary" data-item class="grid-cell"
          :class="{ active: model === lv.id, 'is-bound': lv.bound }" :data-th-on="model === lv.id ? 'true' : 'false'" @click="model = lv.id">
          <svg data-ink viewBox="0 0 200 200" class="grid-svg"><path :d="lv.path" fill="none" stroke="var(--accent-red)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span data-ink data-line-slot class="grid-label" :class="{ 'grid-label-active': model === lv.id }">n={{ lv.n }}</span>
        </Button>
      </div>`;
const f1Host = (g) => `<Card class="levels-card w-full">${g}</Card>`;

const v2Group = ({ verbatim = false } = {}) => `<div class="tx-v2 flex flex-col gap-2" data-group>
        <button v-for="p in PALETTES" :key="p.slug" type="button" data-item :aria-pressed="isMulti(p.slug)"
          :aria-label="(isMulti(p.slug) ? 'Deselect' : 'Select') + ' palette ' + p.name"
          :class="${verbatim
    ? "['cursor-pointer transition-all rounded-card w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40', isMulti(p.slug) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'mix-palette--rest']"
    : "'cursor-pointer transition-all w-full text-left'"}" @click="toggleMulti(p.slug)">
          <span data-ink class="block rounded-card border border-border/30 overflow-hidden bg-well">
            <span class="tx-v2-strip"><span v-for="c in p.colors" :key="c" :style="{ background: c }"></span></span>
            <span class="px-3 py-2 flex items-center justify-between gap-2 min-w-0">
              <span class="mix-palette-name text-small font-display font-semibold truncate">{{ p.name }}</span>
              <span data-line-slot class="fira-code text-micro text-muted-foreground shrink-0">{{ p.colors.length }}</span>
            </span>
          </span>
        </button>
      </div>`;

const c1Group = ({ verbatim = false } = {}) => `<div class="flex min-w-48 flex-col" role="radiogroup" aria-label="Status" data-group>
        <button v-for="o in STATUSES" :key="o.value" type="button" role="radio" :aria-checked="model === o.value" data-item
          class="status-option text-small focus-ring flex items-center gap-2${verbatim ? " rounded-md" : ""} px-2 py-1.5 text-left" @click="model = o.value">
          <svg class="size-4 shrink-0" :class="${verbatim ? "model === o.value ? 'opacity-100' : 'opacity-0'" : "'opacity-0'"}" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span data-ink data-line-slot class="flex-1">{{ o.label }}</span>
          <span v-if="o.count !== undefined" data-ink class="text-muted-foreground num">{{ o.count }}</span>
        </button>
      </div>`;
const c1Host = (g) => `<Card size="sm" class="tx-c1 w-auto p-1">${g}</Card>`;

/** The consumer sites: host markup and the group per arm (the verbatim group adds the consumer's paint classes). */
const SITE_BUILD = {
  preset: { host: presetHost, bare: () => presetGroup(), verbatim: () => presetGroup({ verbatim: true }) },
  specimen: { host: specimenHost, bare: specimenGroup, verbatim: specimenGroup },
  strip: { host: stripHost, bare: () => stripGroup(), verbatim: () => stripGroup({ verbatim: true }) },
  f1: { host: f1Host, bare: f1Group, verbatim: f1Group },
  v2: { host: (g) => g, bare: () => v2Group(), verbatim: () => v2Group({ verbatim: true }) },
  c1: { host: c1Host, bare: () => c1Group(), verbatim: () => c1Group({ verbatim: true }) },
};

/**
 * T-7's twin: remove the class attributes (static and bound) of every tag that carries data-item or data-group.
 * A tag scanner that respects quoted attribute values (Vue handlers contain `=>`).
 */
export function stripItemClasses(tpl) {
  let out = "", i = 0;
  while (i < tpl.length) {
    const lt = tpl.indexOf("<", i);
    if (lt < 0) { out += tpl.slice(i); break; }
    out += tpl.slice(i, lt);
    let j = lt + 1, q = null;
    for (; j < tpl.length; j++) { const ch = tpl[j]; if (q) { if (ch === q) q = null; } else if (ch === '"' || ch === "'") q = ch; else if (ch === ">") break; }
    let tag = tpl.slice(lt, j + 1);
    if (/\sdata-(item|group)(?=[\s>=/])/.test(tag)) tag = tag.replace(/\s:?class="[^"]*"/g, "");
    out += tag; i = j + 1;
  }
  return out;
}

/** Every tag of a template, with its offsets: [{ start, end, text }] (quoted attribute values respected). */
function tags(tpl) {
  const out = [];
  for (let i = tpl.indexOf("<"); i >= 0; i = tpl.indexOf("<", i + 1)) {
    let j = i + 1, q = null;
    for (; j < tpl.length; j++) { const ch = tpl[j]; if (q) { if (ch === q) q = null; } else if (ch === '"' || ch === "'") q = ch; else if (ch === ">") break; }
    out.push({ start: i, end: j + 1, text: tpl.slice(i, j + 1) });
    i = j;
  }
  return out;
}
const isTag = (re) => (t) => re.test(t.text);
const ITEM = /\sdata-item(?=[\s>=/])/, GROUP = /\sdata-group(?=[\s>=/])/;
/**
 * H3-11 · the H-3 states written onto a route's migrated preset markup, the way they are written onto the library
 * arm: `invalid` and a tone on the group, the sibling class on every item, a `display: contents` wrapper around the
 * item. A transform that finds no group or item throws, so a migration the states cannot reach fails loud.
 */
export function stateOnMigrated(tpl, { invalid = false, sibling = false, tone = null, contents = false } = {}) {
  const T = tags(tpl);
  const g = T.find(isTag(GROUP)), it = T.find(isTag(ITEM));
  if (!g || !it) throw new Error("stateOnMigrated: the migrated preset markup has no [data-group] or no [data-item] tag");
  const edits = [];
  const close = (t) => t.text.endsWith("/>") ? t.end - 2 : t.end - 1;
  if (invalid || tone) edits.push([close(g), `${invalid ? " invalid" : ""}${tone ? ` style="--selection-tone: ${tone}"` : ""}`]);
  if (sibling) for (const t of T.filter(isTag(ITEM))) {
    const m = t.text.match(/\sclass="([^"]*)"/);
    if (m) edits.push([t.start + m.index + m[0].length - 1, " is-bound"]);
    else edits.push([close(t), ' class="is-bound"']);
  }
  if (contents) {
    // move the item's v-for and :key onto a display: contents wrapper and close it after the item's own end tag
    const name = it.text.match(/^<([\w-]+)/)[1];
    let depth = 0, endAt = -1;
    for (const t of T.filter((x) => x.start >= it.start)) {
      if (new RegExp(`^<${name}[\\s>/]`).test(t.text) && !t.text.endsWith("/>")) depth++;
      else if (t.text.startsWith(`</${name}`)) { depth--; if (!depth) { endAt = t.end; break; } }
    }
    if (endAt < 0) throw new Error(`stateOnMigrated: no closing </${name}> for the migrated item`);
    const loop = [...it.text.matchAll(/\s(v-for|:key)="[^"]*"/g)].map((m) => m[0]);
    const open = loop.reduce((acc, a) => acc.replace(a, ""), it.text);
    return tpl.slice(0, it.start) + `<div class="tx-contents"${loop.join("")}>` + open + tpl.slice(it.end, endAt) + "</div>" + tpl.slice(endAt);
  }
  let out = tpl;
  for (const [at, text] of edits.sort((a, b) => b[0] - a[0])) out = out.slice(0, at) + text + out.slice(at);
  return out;
}
const STATE_OPTS = {
  "preset-invalid": { invalid: true }, "preset-sibling": { sibling: true },
  "preset-tone-translucent": { tone: "rgb(120 80 200 / 0.35)" }, "preset-tone-unresolvable": { tone: "var(--th-undefined-tone)" },
  "preset-contents": { contents: true },
};

export function sceneApp(wt, nm, { familyModules = {}, migration = null, flavor = "src" } = {}) {
  const famImports = Object.entries(familyModules)
    .map(([k, dir]) => `import * as fam_${k} from "@glass/components/${dir}";`).join("\n");
  const famExports = Object.keys(familyModules).map((k) => `...Object.keys(fam_${k})`).join(", ");
  const mig = migration?.sites ?? {};

  // every rendered scene: [id, arm, inner template]
  const sections = [];
  for (const [site, b] of Object.entries(SITE_BUILD)) {
    sections.push([site, "library", b.host(b.bare())]);
    sections.push([`${site}-verbatim`, "verbatim", b.host(b.verbatim())]);
    sections.push([`${site}-verbatim-stripped`, "stripped", b.host(stripItemClasses(b.verbatim()))]);
    if (mig[site]) {
      sections.push([`${site}-migrated`, "migrated", b.host(mig[site].group)]);
      sections.push([`${site}-migrated-stripped`, "stripped", b.host(stripItemClasses(mig[site].group))]);
    }
  }
  sections.push(["preset-invalid", "library", presetHost(presetGroup({ invalid: true }))]);
  sections.push(["preset-sibling", "library", presetHost(presetGroup({ sibling: true }))]);
  sections.push(["preset-tone-translucent", "library", presetHost(presetGroup({ tone: "rgb(120 80 200 / 0.35)" }))]);
  sections.push(["preset-tone-unresolvable", "library", presetHost(presetGroup({ tone: "var(--th-undefined-tone)" }))]);
  sections.push(["preset-contents", "library", presetHost(presetGroup({ contents: true }))]);
  // H3-11: the same states on the route's migrated preset markup (the route's CSS reaches them through tx-preset)
  if (mig.preset) for (const [id, o] of Object.entries(STATE_OPTS)) {
    sections.push([`${id}-migrated`, "migrated", presetHost(stateOnMigrated(mig.preset.group, o)), "tx-preset"]);
  }
  sections.push(["preset-consumer-aria", "library", presetHost(presetGroup({ consumerAria: true }))]);
  sections.push(["preset-input", "library", presetHost(presetGroup({ input: true }))]);
  sections.push(["single", "library", `<ToggleGroup type="single" size="sm" data-group aria-label="Filter curves by family" v-model="model">
        <ToggleGroupItem v-for="v in values.single" :key="v" :value="v" data-item><span data-ink data-line-slot>{{ v }}</span></ToggleGroupItem>
      </ToggleGroup>`]);
  sections.push(["vertical", "library", `<ToggleGroup type="single" orientation="vertical" data-group aria-label="Channel" v-model="model" class="w-16">
        <ToggleGroupItem v-for="v in values.vertical" :key="v" :value="v" data-item><span data-ink data-line-slot>{{ v }}</span></ToggleGroupItem>
      </ToggleGroup>`]);
  sections.push(["tabs", "library", `<SegmentedTabs data-group v-model="model" :options="tabsOptions" semantics="radio" aria-label="Family" />`]);
  sections.push(["tabs-retired", "library", `<SegmentedTabs data-group v-model="model" :options="tabsOptions" semantics="toggle" aria-label="Family" />`]);
  sections.push(["pill-icon", "library", `<ToggleGroup type="single" data-group aria-label="View" v-model="model">
        <ToggleGroupItem v-for="v in values['pill-icon']" :key="v" :value="v" data-item><svg data-ink viewBox="0 0 24 24" class="size-4" aria-hidden="true"><path d="M4 12h16M12 4v16" fill="none" stroke="currentColor" stroke-width="2" /></svg><span data-ink data-line-slot>{{ v }}</span></ToggleGroupItem>
      </ToggleGroup>`]);
  sections.push(["pill-badge", "library", `<ToggleGroup type="single" data-group aria-label="Inbox" v-model="model">
        <ToggleGroupItem v-for="v in values['pill-badge']" :key="v" :value="v" data-item><span data-ink data-line-slot>{{ v }}</span><Badge data-ink variant="secondary" size="sm">{{ v.length }}</Badge></ToggleGroupItem>
      </ToggleGroup>`]);
  sections.push(["card", "library", `<div class="tx-card-board" role="listbox" aria-label="Plan" data-group>
        <Card v-for="v in values.card" :key="v" size="sm" data-item :selected="model === v"
          @click="model = v" @keydown.enter.prevent="model = v" @keydown.space.prevent="model = v">
          <CardHeader><CardTitle data-ink>{{ v }}</CardTitle><CardDescription data-ink data-line-slot>For a {{ v }} workload.</CardDescription></CardHeader>
        </Card>
      </div>`]);
  sections.push(["chipcell", "library", `<div role="group" aria-label="Cells" class="tx-chiprow" data-group>
        <Chip v-for="v in values.chipcell" :key="v" mode="selectable" shape="cell" data-item class="tx-cell"
          :model-value="model === v" @update:model-value="(on: boolean) => { if (on) model = v; }">
          <span data-ink class="tx-cell-ink"><span>{{ v }}</span><span data-line-slot class="tx-cell-meta">0.{{ v.length }} s</span></span>
        </Chip>
      </div>`]);
  sections.push(["wrap", "library", `<div class="tx-wrap">
        <ToggleGroup type="single" data-group aria-label="Wrap" v-model="model">
          <ToggleGroupItem value="a" data-item data-holder="ToggleGroupItem"><span data-ink data-line-slot>Linear</span></ToggleGroupItem>
        </ToggleGroup>
        <Chip mode="selectable" shape="pill" data-item data-holder="Chip pill" :model-value="false"><span data-ink data-line-slot>Tag</span></Chip>
        <Button data-item data-holder="Button"><span data-ink data-line-slot>Continue</span></Button>
      </div>`]);
  const familyD = (declared) => `<ToggleGroup type="single"${declared ? ' shape="cell"' : ""} data-group aria-label="Spring presets" v-model="model">
        <ToggleGroupItem v-for="p in PRESETS" :key="p.name" :value="p.name" data-item>
          <span data-ink class="text-small text-foreground capitalize">{{ p.name }}</span>
          <span data-ink data-line-slot class="text-mono-caption text-muted-foreground">{{ p.response }} s · ζ {{ p.damping }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`;
  sections.push(["family-d", "library", familyD(true)]);
  sections.push(["family-d-undeclared", "library", familyD(false)]);

  const sectionHtml = sections.map(([id, arm, inner, extra = ""]) =>
    `    <section v-else-if="scene === '${id}'" data-scene="${id}" data-arm="${arm}" class="tx-host tx-${id.replace(/-(verbatim|migrated)(-stripped)?$/, "")}${extra ? " " + extra : ""}">
      ${inner}
    </section>`).join("\n");

  const indexHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>D4 tile scenes</title>
<script>const q=new URLSearchParams(location.search); if(q.get('mode')==='dark'){document.documentElement.classList.add('dark');}</script>
</head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>
`;
  const mainTs = `import "./tile.css";
import { createApp } from "vue";
import App from "./App.vue";
${famImports}
const app = createApp(App);
app.config.errorHandler = (err, _i, info) => { console.error("[tile] app error", info, err); };
(window as any).__tileExports = [${famExports}];
app.mount("#app");
`;

  const appVue = `<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@glass/components/card";
import { Chip } from "@glass/components/chip";
import { Button } from "@glass/components/button";
import { Badge } from "@glass/components/badge";
import { FadingScroll } from "@glass/components/fading-scroll";
import { SegmentedTabs } from "@glass/components/tabs";
${Object.keys(familyModules).map((k) => `import * as ${k} from "@glass/components/${familyModules[k]}";`).join("\n")}

const SCENES = ${JSON.stringify(SCENES)};
const PRESETS = ${JSON.stringify(PRESETS)};
const CURVE_GROUPS = ${JSON.stringify(CURVE_GROUPS)};
const STRIP = ${JSON.stringify(STRIP)};
const LEVELS = ${JSON.stringify(LEVELS)};
const PALETTES = ${JSON.stringify(PALETTES)};
const STATUSES = ${JSON.stringify(STATUSES)};
const MIGRATION = ${JSON.stringify(migration ? { label: migration.label, sites: Object.keys(mig) } : null)};
const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "__index";
const shape = q.get("shape") ?? "stadium";
const base = scene.replace(/-(verbatim|migrated)(-stripped)?$/, "").replace(/^preset-.*$/, "preset").replace(/^family-d-undeclared$/, "family-d").replace(/^tabs-retired$/, "tabs");

// Every scene's values, in item order; the model holds one of them (or NONE); V2 holds a set.
const NONE = "__none__";
const values: Record<string, string[]> = {
  preset: PRESETS.map((p) => p.name),
  specimen: CURVE_GROUPS.flatMap((g) => g.items.map((c) => c.name)),
  strip: STRIP.flatMap((f) => f.tiles.map((t) => f.family + "-" + t[0])),
  f1: LEVELS.map((l) => l.id),
  v2: PALETTES.map((p) => p.slug),
  c1: STATUSES.map((s) => s.value),
  single: ["All", "Power", "Back", "Elastic"],
  vertical: ["L", "C", "H", "A"],
  tabs: ["All", "Power", "Back", "Elastic"],
  "pill-icon": ["Grid", "List", "Board"],
  "pill-badge": ["Inbox", "Sent", "Drafts"],
  card: ["starter", "team", "studio", "scale"],
  chipcell: ["one", "two", "three", "four"],
  wrap: ["a", "b"],
  "family-d": PRESETS.map((p) => p.name),
};
const MULTI = base === "v2";
const order = ref<string[]>(PRESETS.map((p) => p.name));
const orderedPresets = computed(() => order.value.map((n) => PRESETS.find((p) => p.name === n)!));
const valsNow = () => (base === "preset" ? order.value : values[base] ?? []);
const selQ = q.get("sel");
const first = selQ === "none" ? NONE : valsNow()[selQ ? Number(selQ) : 1] ?? NONE;
const model = ref<string>(MULTI ? NONE : first);
const multi = ref<string[]>(MULTI && first !== NONE ? [first] : []);
const isMulti = (s: string) => multi.value.includes(s);
const toggleMulti = (s: string) => { multi.value = isMulti(s) ? multi.value.filter((x) => x !== s) : [...multi.value, s]; };
const tabsOptions = values.tabs.map((v) => ({ label: v, value: v }));

(window as any).__tile = {
  ready: false,
  dev: import.meta.env.DEV,
  flavor: ${JSON.stringify(flavor)},
  scenes: SCENES,
  scene,
  migration: MIGRATION,
  exports: (window as any).__tileExports ?? [],
  async select(i: number | null) {
    const v = valsNow();
    if (MULTI) multi.value = i === null ? [] : isMulti(v[i]) ? multi.value : [...multi.value, v[i]];
    else model.value = i === null ? NONE : v[i];
    await nextTick();
  },
  selected: () => (MULTI ? multi.value : model.value),
  async reorder() { order.value = [...order.value].reverse(); await nextTick(); },
};

onMounted(async () => {
  await nextTick();
  requestAnimationFrame(() => requestAnimationFrame(() => { (window as any).__tile.ready = true; }));
});
</script>

<template>
  <main class="tx-page" :data-shape-candidate="shape">
    <button class="tx-sentinel" data-sentinel="before" type="button">before</button>
    <section v-if="scene === '__index'" data-scene="__index"><p>{{ SCENES.map((s) => s.id).join(" · ") }}</p></section>
${sectionHtml}
    <section v-else data-scene="__missing"><p>no scene {{ scene }}</p></section>
    <button class="tx-sentinel" data-sentinel="after" type="button">after</button>
  </main>
</template>
`;

  const header = flavor.startsWith("dist")
    ? `@import "${nm}/tailwindcss/index.css" source("./");
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/dist/styles/index.css";`
    : `@import "${nm}/tailwindcss/index.css" source("./");
@source "${wt}/src/components/**/*.vue";
@source "${wt}/src/components/_shared/**/*.ts";
@source "${wt}/src/components/**/index.ts";
@source "${wt}/src/components/**/*Variants.ts";
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/src/styles/index.css";`;

  const migrationCss = Object.entries(mig).map(([site, m]) => m.css ? `/* migration ${migration.label} · ${site} */\n[data-arm="migrated"].tx-${site} { ${m.css} }` : "").join("\n");

  const css = `${header}

html, body { margin: 0; }
body { background: var(--background); color: var(--foreground); font-family: system-ui, sans-serif; }
.tx-page { padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
.tx-sentinel { font: 12px system-ui; padding: 2px 6px; }
.tx-host { width: 460px; }
.tx-card-board { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tx-chiprow { display: flex; gap: 8px; flex-wrap: wrap; }
.tx-cell-ink { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.3; }
.tx-cell-meta { font-size: 11px; opacity: 0.8; }
.tx-wrap { display: flex; gap: 12px; align-items: flex-start; }
.tx-wrap [data-item] { max-inline-size: 110px; white-space: normal; }
.tx-contents { display: contents; }
.tx-input { inline-size: 5rem; font: inherit; font-size: 12px; }

/* ── consumer tokens (keyframes.js demo/styles/style.css:167,215; fourier-analysis; value.js) ── */
:root { --accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305)); --color-progress: var(--accent-kf);
  --accent-red: light-dark(oklch(0.58 0.2 25), oklch(0.72 0.16 25)); }

/* ── K1 · library arm: layout and type only (the utilities in the markup). Unmigrated paint: SpringPhysicsFacet.vue:197-215 ── */
[data-arm="verbatim"] .preset-cell { border-radius: var(--radius-field); outline: 1px dashed transparent; outline-offset: -1px; border-color: transparent; transition: outline-color var(--duration-fast) ease, background-color var(--duration-fast) ease; }
[data-arm="verbatim"] .preset-cell:hover { background: color-mix(in srgb, var(--color-progress) 6%, var(--background)); outline-color: color-mix(in srgb, var(--color-progress) 35%, transparent); }
[data-arm="verbatim"] .preset-cell[data-state="on"] { background: color-mix(in srgb, var(--color-progress) 8%, var(--background)); outline-color: color-mix(in srgb, var(--color-progress) 65%, transparent); border-color: transparent; box-shadow: none; }
/* H-3 · X-1: a sibling state at equal specificity, F1's bound endpoint (HarmonicLevelGrid.vue:327-329) without its :not(.active) */
.preset-cell.is-bound { border-color: var(--foreground); }
/* H3-11: the same sibling state on the migrated preset markup, at the same specificity (0,2,0) */
:where(.tx-preset-sibling) [data-item].is-bound { border-color: var(--foreground); }

/* ── K2 · EasingCatalogue.vue:304-438 layout and type, design-idioms.css:250-264 (the ball on the curve) ── */
.easing-catalogue { --ball-tone: var(--color-progress); display: flex; flex-direction: column; gap: 0.75rem; min-height: 0; min-width: 0; }
.specimen-drawer { max-block-size: 340px; }
.specimen-grid-group { display: flex; flex-direction: column; flex-wrap: nowrap; align-items: stretch; gap: 1.25rem; inline-size: 100%; padding: 2px 2px 1rem; }
.catalogue-section { display: flex; flex-direction: column; gap: 0.5rem; }
.catalogue-family { color: var(--foreground); text-transform: none; }
.specimen-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(var(--tile-min, 9.5rem), 1fr)); gap: 0.5rem; }
.specimen-tile { content-visibility: auto; contain-intrinsic-size: auto 104px; align-items: stretch; height: auto; }
.tile-stage { position: relative; display: block; width: 100%; height: 3.25rem; }
.tile-plot { position: absolute; inset: 18% 7px; }
.tile-sparkline { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.tile-sparkline path { fill: none; stroke: color-mix(in srgb, var(--foreground) 22%, transparent); stroke-width: 1.25; stroke-linecap: round; stroke-linejoin: round; }
.tile-carriage { will-change: transform; }
.tile-ball { --ball-size: 14px; --ball-glow: 28%; }
.tile-name { text-transform: none; text-align: center; letter-spacing: 0; white-space: normal; overflow-wrap: anywhere; text-wrap: balance; line-height: 1.35; padding-bottom: 0.125rem; color: var(--muted-foreground); }
.curve-carriage { position: absolute; inset: 0; transform: var(--curve-rest, none); pointer-events: none; }
.curve-ball { position: absolute; left: 0; top: 0; width: var(--ball-size, 36px); height: var(--ball-size, 36px); transform: translate(-50%, -50%); border-radius: var(--radius-pill); background: var(--ball-tone, var(--color-progress)); box-shadow: 0 2px 10px color-mix(in srgb, var(--ball-tone, var(--color-progress)) var(--ball-glow, 35%), transparent); }
/* K2 unmigrated paint: EasingCatalogue.vue:340-353 (group reset), :375-376 (radius), :436-459 (hover ink, selection by outline + ink) */
[data-arm="verbatim"] .specimen-grid-group { border-radius: 0; background: none; -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none; }
[data-arm="verbatim"] .specimen-tile { border-radius: var(--radius-field); }
[data-arm="verbatim"] .specimen-tile:hover .tile-name { color: var(--foreground); }
[data-arm="verbatim"] .specimen-tile[data-state="on"], [data-arm="verbatim"] .specimen-tile[data-state="on"]:hover:not(:disabled) { background-color: transparent; outline: 1.5px solid var(--foreground); outline-offset: -1.5px; }
[data-arm="verbatim"] .specimen-tile[data-state="on"] .tile-sparkline path { stroke: var(--foreground); stroke-width: 1.5; }
[data-arm="verbatim"] .specimen-tile[data-state="on"] .tile-name { color: var(--foreground); font-weight: 600; }
@media (forced-colors: active) { [data-arm="verbatim"] .specimen-tile[data-state="on"] { outline-color: Highlight; } }

/* ── V1 · EasingSpecimenStrip.vue:125-227 layout and type (the item class renamed vj-tile: K2 owns .specimen-tile on this page) ── */
.strip-row { display: inline-flex; align-items: stretch; gap: 0.875rem; width: max-content; padding: 2px; }
.strip-family { display: flex; flex-direction: column; gap: 0.2rem; }
.strip-family + .strip-family { border-left: 1px solid var(--card-edge); padding-left: 0.875rem; }
.family-eyebrow { font-family: var(--font-mono); font-size: 0.5625rem; line-height: 1; letter-spacing: 0.08em; color: var(--muted-foreground); opacity: 0.75; }
.family-tiles { display: flex; align-items: flex-start; gap: 0.25rem; }
.vj-tile { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.125rem; inline-size: 2.75rem; block-size: 2.75rem; padding: 0.25rem; }
.tile-glyph { inline-size: 1.375rem; block-size: 1.375rem; overflow: visible; }
.tile-glyph path { fill: none; stroke: color-mix(in oklab, var(--foreground) 65%, transparent); stroke-width: 1.25; stroke-linecap: round; stroke-linejoin: round; }
.tile-label { font-family: var(--font-mono); font-size: 0.5625rem; line-height: 1.2; text-transform: none; color: var(--muted-foreground); white-space: nowrap; }
[data-arm="verbatim"] .vj-tile[data-state="on"] .tile-glyph path { stroke: var(--motion-accent, var(--foreground)); stroke-width: 1.75; }
[data-arm="verbatim"] .vj-tile[data-state="on"] .tile-label { color: var(--motion-accent, var(--foreground)); font-weight: 600; }
[data-arm="verbatim"] .vj-tile:hover .tile-label { color: var(--foreground); }

/* ── F1 · HarmonicLevelGrid.vue:214-364: the strip and the cell column are layout; the rest is paint ── */
.f1-grid { display: flex; gap: 0.5rem; overflow-x: auto; overflow-y: hidden; padding-top: 0.375rem; padding-bottom: 0.375rem; scrollbar-width: thin; }
.levels-card { padding: var(--space-family, 1rem); }
.grid-cell { flex-direction: column; flex-shrink: 0; }
.grid-svg { width: 48px; height: 48px; overflow: visible; }
.grid-label { font-family: var(--font-mono); font-size: var(--type-caption); line-height: var(--type-leading-caption); color: var(--muted-foreground); transition: color 0.15s; }
@layer glass-overrides {
  [data-arm="verbatim"] .grid-cell { border: 1.5px solid color-mix(in srgb, var(--foreground) 50%, transparent); background: var(--card); }
  @media (hover: hover) { [data-arm="verbatim"] .grid-cell:hover { border-color: color-mix(in srgb, var(--accent-red) 50%, transparent); transform: scale(1.04); } }
  [data-arm="verbatim"] .grid-cell:active { transform: scale(0.96); }
  [data-arm="verbatim"] .grid-cell.is-bound:not(.active) { border-color: var(--foreground); }
  [data-arm="verbatim"] .grid-cell.active { border-color: var(--accent-red); box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-red) 15%, transparent); }
}
[data-arm="verbatim"] .grid-label-active { color: var(--accent-red); font-weight: 600; }

/* ── V2 · MixSourceSelector.vue: the thumbnail strip (PaletteColorStrip) is content; the rest-name ink is state paint ── */
.tx-v2-strip { display: flex; block-size: 2rem; }
.tx-v2-strip > span { flex: 1; }
[data-arm="verbatim"] .mix-palette--rest .mix-palette-name { color: var(--muted-foreground); }
[data-arm="verbatim"] .mix-palette--rest:hover .mix-palette-name { color: var(--foreground); }

/* ── C1 · chicago src/style.css:106-109 ── */
.tx-c1 { padding: 0.25rem; }
[data-arm="verbatim"] .status-option:hover, [data-arm="verbatim"] .status-option[aria-checked="true"] { background: var(--muted); }

/* owner-glance shape candidates (glance.mjs only; never read by a witness) */
[data-shape-candidate="rungHalf"] .toggle-group__item { border-radius: calc(var(--toggle-group-item-size) / 2) !important; }
[data-shape-candidate="field"] .toggle-group__item { border-radius: var(--radius-field) !important; }

/* ── route migration CSS (build.mjs --route; scoped to the migrated arm) ── */
${migrationCss}
`;
  return { "index.html": indexHtml, "main.ts": mainTs, "App.vue": appVue, "tile.css": css };
}
