# AT.W0b · Lens B5 — SOTA research: dock orientation + the overflow/containment model

**Scope.** The GlassDock orientation system (`horizontal | vertical`, the axis-aware
FLIP keyed off a computed `dim`) and the overflow/containment model — specifically the
3-prop accretion (`overflow` / `wrap` / `containerName`) that AT.W0-L2 finding #6 flagged
(`W0-L2-plan-vs-reality.md:319`) and the AT plan booked into W7 (`AT.md:151,171`). This
lens **builds on** the existing W0/W0b corpus (L1-L6 + A1-A6) — it does NOT re-derive the
blob lift. It augments/hardens the **AT dock-wave** (the W7 overflow-collapse line-item),
fully specs the collapsed-prop model, and grounds the responsive story in current
best-practice (WebSearch, June 2026).

All file:line refs verified against HEAD. SOTA findings are marked **[web]** (cited URL) or
**[knowledge]** (reasoned from my training cutoff Jan 2026, with the web result corroborating
or refining where it ran).

---

## §0 — TL;DR (the headline)

The dock has accreted **three orthogonal-on-paper, tangled-in-practice axes** for one
concept — "what happens when expanded content exceeds the dock's cap":

| Prop | Type | What it actually toggles | Real demo consumers |
|---|---|---|---|
| `overflow` | `"grow" \| "scroll"` (enum, default `grow`) | grow-visible vs scroll-port (axis auto-derived) | 2 (`CategoryRail` rail-scroll-y, `AuroraConfigDock` scroll) |
| `wrap` | `boolean` (default `false`) | flex-wrap to multiple rows + `--radius-2xl` + viewport-clamp + a desktop-MQ reversal | **0** (only CSS rules exist; no SFC passes it) |
| `containerName` | `string` (default unset) | `container-type: inline-size` + `container-name` + **lifts the `overflow:hidden` clip** | 1 (`metric-pill` cluster) |

The accretion is real and worse than L2's one-line entry conveys: **`containerName` is not a
containment prop, it is a hidden 4th overflow value.** Setting it flips the dock's clip from
`hidden` → `visible` (`dock.css:85-87`, `GlassDock.vue:100-107`) — i.e. `containerName` IS
the `overflow: visible-with-CQ-host` mode, conflated with "name a container query subject."
And `wrap` carries FOUR coupled behaviours in one boolean (`dock.css:542-572` + the
`@media(min-width:640px)` reversal at `:1090-1112`) that **partially undo each other across a
viewport breakpoint** — the exact "incoherent model" L2 named.

**The collapse (clean break, no alias — inv no-back-compat):** retire `wrap` (boolean) AND
fold `containerName`'s clip-semantics into a single `overflow` enum, and split the *naming* of
a container query subject out as an honest separate concern. The unified enum:

```ts
overflow?: "grow" | "scroll" | "wrap" | "visible"   // default "grow"
container?: string                                   // pure CQ-subject name, NO clip side-effect
```

with `"visible"` (or the CQ-host case) being what lifts the clip — so `container` becomes a
*pure* container-query-name and stops being a smuggled overflow mode. SOTA pushes one
refinement on top: with **container-query units (`cqi`/`cqb`)** and the **scroll-driven
scroll-shadow** technique now Baseline, several of the dock's JS overflow mechanics (the
`useLayerTransition` pin/measure/re-pin FLIP, the `@media(640px)` wrap reversal) can collapse
into pure CSS keyed off the dock's OWN size — the orientation-hardening payoff.

---

## §1 — The orientation system as it stands (read in full)

### §1.1 The axis abstraction — clean where it's clean

The orientation system's core abstraction is **sound** and is the part of the dock NOT to
disturb. `useLayerTransition` keys every dimension read/write off a single computed `dim`:

```ts
// useLayerTransition.ts:59-62
const dim = computed<"width" | "height">(() =>
    axis?.value === "vertical" ? "height" : "width",
);
const getSize = (el) => el.getBoundingClientRect()[dim.value];
```

and `setDim`/`clearDim` (`:97-103`) write `el.style[dim]`. The FLIP (capture → pin → swap →
measure → re-pin → animate, `:135-185`) is fully axis-parametric. `useDockState` is
axis-agnostic (it's a pure state machine — collapsed/hover/pinned + ref-counted holds, no
geometry). This is the **right** shape: one composable, one `dim`, no hardcoded `width`.

`GlassDock.vue` threads orientation correctly:
- `orientation` is *derived*, not raw: `rail` / `instrument-strip` variants force `"vertical"`
  (`GlassDock.vue:113-117`) — a good single source of truth.
- The outer collapsed↔expanded FLIP is hardcoded `"horizontal"` (`:189`) **by design** —
  vertical rails render a single slot (`v-else` at `:372`), no layer pair to crossfade. The
  comment at `:177-185` documents why. Correct.
- `dockContext` provides `orientation` down-stack (`:172`) so `DockLayerGroup` inherits it
  (`DockLayerGroup.vue:54`). Correct.

**B5 verdict on the axis core:** do NOT touch the `dim`-parametric FLIP or the state machine.
The accretion is entirely in the **overflow/containment layer that sits on top**, and that is
where AT's collapse lands.

### §1.2 Where orientation leaks into the overflow model (the coupling)

Orientation is correctly abstracted in JS but the CSS overflow rules re-branch on it
**ad hoc**, producing a matrix that is hard to reason about:

- `.glass-dock.vertical` sets `overflow-x/y: visible` + `max-block-size` cap (`dock.css:199-211`).
- `.glass-dock.expanded:not(.dock-wrap) > .dock-layers` sets `overflow-x: visible`
  (`:391-393`) — horizontal grow.
- `.glass-dock.vertical.always-expanded` re-asserts `visible` on both axes (`:487-490`) — a
  patch because a prior `auto` pair "re-introduced the scroll affordance A2 §B6 rejected"
  (the comment at `:484-486` is itself archaeology of a regression).
- `overflow="scroll"` then re-overrides: `.dock-scroll-x` clips `.dock-layers` back to
  `hidden` and scrolls `.dock-layer--full` (`:506-519`); `.dock-scroll-y` scrolls the vertical
  root (`:530-536`).

So the effective overflow at any moment is a **product of {orientation} × {grow|scroll} ×
{wrap} × {always-expanded} × {containerName} × {640px MQ}** resolved by CSS specificity +
source-order. That product space is the L2 "no coherent model" finding made concrete. The
collapse must give orientation ONE clean seam into a SINGLE overflow enum.

---

## §2 — The 3-prop accretion, dissected (the L2 finding, hardened)

### §2.1 `wrap` — one boolean, four behaviours, self-undoing across a breakpoint

`wrap` (`GlassDock.vue:18,92`, class `dock-wrap` at `:323`) is the worst offender. Its CSS
(`dock.css:542-572`):

1. `white-space: normal` + `flex-wrap: wrap` on `.dock-layer--full` — the actual wrap.
2. `border-radius: var(--radius-2xl)` — a **shape change** smuggled into an overflow prop.
3. `max-width: var(--dock-wrap-max-width)` = `calc(100vw - gutter)` — a **viewport clamp**.
4. `.dock-separator { display: none }` — hides separators.
5. `.dock-wrap.collapsed` re-pills + `white-space: nowrap` + `max-width: none` (`:568-572`).

Then `@media (min-width: 640px)` (`:1090-1112`) **reverses 1-4**: `flex-wrap: nowrap`,
`white-space: nowrap`, `border-radius: --radius-pill`, `max-width: none`,
`.dock-separator { display: block }`. So `wrap` means "wrap on mobile, don't wrap on desktop,
and change my radius + clamp + separators as a side-effect" — **five behaviours keyed off a
hard 640px viewport breakpoint**, which is precisely the media-query coupling that container
queries exist to kill (`§5`). And critically: **zero demo SFCs pass `wrap`** (verified —
`grep ':wrap\|wrap='` across `demo/` returns nothing on a `<GlassDock>`). It is
substrate-without-consumer (L invariant 8 / inv "binary substrate"): the only thing keeping
`dock-wrap` alive is its own CSS. **Clean-break delete is the correct call and it costs zero
consumer migration.**

### §2.2 `containerName` — a smuggled overflow mode, mis-named

`containerName` (`GlassDock.vue:71-83`) is documented as "establish a container-query subject."
But its implementation (`GlassDock.vue:100-107`):

```ts
const containerStyle = computed(() => {
    if (!props.containerName) return undefined;
    return { "container-type": "inline-size", "container-name": props.containerName,
             overflow: "visible" };           // ← the clip lift, bundled in
});
```

paired with `dock.css:85-87`:

```css
.glass-dock:not([data-container-name]) { overflow: hidden; }
```

means **the act of naming a container is also the act of removing the dock's clip.** Two
unrelated concerns — "I want `@container` rules off this element's width" and "I want my
expanded content to escape the padding-box clip" — are fused into one prop. A consumer who
wants a named container but ALSO wants clipping cannot express it; a consumer who wants
`overflow: visible` but no container query must invent a fake container name. This is the
accretion's subtlest defect and L2's one-liner misses it: **`containerName` is the de-facto
`overflow: "visible"` value.** The single real consumer (`metric-pill.vue:80-86`) wants both
(CQ host + clip lift), which is why the conflation has survived — but that's coincidence, not
design.

### §2.3 `overflow` — the only honest axis, but incomplete

`overflow` (`"grow" | "scroll"`, `GlassDock.vue:56-70`) is the one well-shaped prop: an enum,
axis auto-derived from orientation (`:124-127`), tested (`GlassDock.scroll-overflow.test.ts`).
It is the natural **home** for the collapse — `wrap` and the `visible`-clip-lift are just
missing members of THIS enum. The gestalt: **everything "what happens at the cap" belongs in
`overflow`; `containerName` should shrink to a pure CQ-name with no behaviour.**

### §2.4 The migration footprint is tiny (the clean break is cheap)

Verified across the whole repo's demo surface:
- `wrap` / `:wrap` on a `<GlassDock>`: **0 call-sites.**
- `overflow="scroll"`: **2** (`CategoryRail.vue:31` rail, `AuroraConfigDock.vue:60`).
- `containerName` / `container-name`: **1** (`metric-pill.vue:86`).

So a clean break touches **at most 1 line** in the glass-ui demo (the `containerName`→`container`
rename, IF we rename) and **0 lines** for the `wrap` retirement. Cross-repo (bbnf-lang
playground, speedtest) is name-forward (inv-16) — AT records the rename in `MIGRATION.md`, does
not reach into consumers. This decisively de-risks the W7 line-item.

---

## §3 — SOTA: how a responsive toolbar/dock SHOULD do overflow (2026)

### §3.1 Container queries are the responsive substrate, not media queries **[web]**

Container size queries (`@container`) and container-query units (`cqi`/`cqb`) are
**Baseline / production-ready in all major browsers since 2023** — "you are fully safe to use
them in production right now with zero fallbacks or polyfills"
([UsuallyCorrect, *CQ in 2026*](https://usuallycorrect.com/blog/css-container-queries-2026);
[CSS-Tricks, *Container query units*](https://css-tricks.com/container-query-units-cqi-and-cqb/)).
The canonical use is exactly the dock's case: "any component that needs to adapt its own layout
— cards, navigation bars, widgets — gets a container query," responding to the **component's**
inline size, not the viewport
([JonIMMS, *CQ Complete Guide 2025*](https://jonimms.com/modern-css-container-queries-complete-guide/)).

This directly indicts `dock-wrap`'s `@media (min-width: 640px)` reversal (`dock.css:1090`): a
dock wraps based on **how wide the dock is**, never how wide the *screen* is. A 300px dock in a
1440px viewport should wrap; the 640px MQ gets that wrong in both directions. The fix is to key
the wrap/clamp off `cqi` (1% of the dock's own inline size) or a `@container` rule on the
dock's own named subject — which the dock *already establishes* when `containerName` is set.

LogRocket's 2026 retrospective adds the honest caveat ([LogRocket, *CQ in 2026: not a silver
bullet*](https://blog.logrocket.com/container-queries-2026/)): a CQ container **cannot also be
sized by its own queried dimension on that axis** (the element establishing `container-type:
inline-size` can't have its inline size depend on a CQ result, or you get a layout-loop). For
the dock this is fine — the dock is sized by content/cap, and queries its inline size to switch
*descendant* layout — but it is the reason the dock must be the CQ subject and **never** a
descendant whose intrinsic width the dock reads (the cornerstone the `containerName` doc already
states at `GlassDock.vue:79-81`). SOTA confirms that instinct.

### §3.2 The "priority-plus / more-menu" overflow pattern **[web]**

The dominant SOTA pattern for a toolbar that runs out of room is **priority-plus** (a.k.a.
"more" / overflow menu): high-priority items stay visible, the rest collapse into a `…` popup
([Syncfusion EJ2 Toolbar responsive-mode](https://ej2.syncfusion.com/documentation/toolbar/responsive-mode);
[jayfreestone/priority-plus](https://github.com/jayfreestone/priority-plus), "a modern
implementation … uses ResizeObserver"). Two implementation families:

1. **JS/ResizeObserver-measured** (priority-plus, Syncfusion): measure each item, move
   over-budget ones into the popup. Accurate but "relying on ResizeObserver can introduce
   layout shifts" and re-layout churn
   ([Call Center Studio, *Beyond Media Queries*](https://medium.com/call-center-studio/beyond-media-queries-building-container-aware-dynamic-overflow-systems-with-resizeobserver-e270353e1501)).
2. **Pure-CSS container-query-driven**: at `@container (max-width: N)` swap labels→icons or
   hide a tier — zero JS, zero layout-shift, but coarse (you choose breakpoints, not per-item).

**B5 read for the dock:** the dock is NOT a priority-plus navigation bar (its items are a small
fixed set of dock controls, not an arbitrary menu), so glass-ui should **not** ship a JS
priority-plus measurer — that would be overfit substrate (one speculative consumer). What the
dock SHOULD adopt from this pattern is the **CSS-CQ tier-swap** as the *recommended consumer
recipe* for `overflow: "wrap"`/responsive docks: the dock names its container; the consumer
writes `@container <name> (max-width: …) { swap full-label → abbreviation }`. This is exactly
what `metric-pill.vue:118-125` already documents as the intended use — SOTA validates it as THE
pattern, and it means the dock's job is just "be a clean CQ subject + offer a wrap mode," not
"measure and reflow." The `MetricPill` abbreviation API (full `label` + `abbreviation`) is
already the priority-plus label-swap primitive.

### §3.3 Scroll docks: scroll-snap + edge-fade, and "is-scrollable" in pure CSS **[web]**

For `overflow: "scroll"` the SOTA stack is:
- `scroll-snap-type` + `scroll-padding` for detented item scrolling
  ([MDN scroll-snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap)),
  with `scroll-padding` reserving room for a fixed leading control (the rail's brand wordmark at
  `CategoryRail.vue:36`) ([MDN scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding)).
- `scrollbar-width: none` (already used, `dock.css:513,532`) + `overscroll-behavior: contain`
  (already used, `:518,535`) — the dock already does the momentum-trap correctly.
- **Edge-fade only when actually scrollable**, via **scroll-driven animations** (`@property`
  fade lengths animated on a `scroll()` timeline + a `mask: linear-gradient` that feathers the
  scrolled edges). The fade appears at an edge only when content remains past it — purely in CSS
  ([CSS-Tricks, *Modern Scroll Shadows*](https://css-tricks.com/modern-scroll-shadows-using-scroll-driven-animations/)).
  Caveat: `animation-timeline: scroll()` "gracefully degrades in unsupported browsers by simply
  not applying the fade" — Safari support has been the lagging edge (the article notes "still
  waiting for Safari"; as of mid-2026 Safari ships scroll-driven animations behind progress, so
  treat it as **`@supports`-gated enhancement**, not a hard dependency).

This is significant: the dock's scroll mode currently has **no edge-fade** (the `dock.css`
comments at `:194-198`, `:386-390` explicitly reject the old JS mask-fade because "content never
clips or scrolls, so a feather has nothing to feather"). But that reasoning applied to *grow*
mode; in *scroll* mode a feather DOES have something to feather, and scroll-driven CSS gives it
for free with `@supports` graceful-degradation. **AT can add a pure-CSS scroll-edge fade to the
scroll mode without any JS** — a strict improvement, dependency-free, that the old "JS mask-fade"
rejection never considered because scroll-driven timelines weren't Baseline then.

### §3.4 Intrinsic-size transitions: `interpolate-size` / `calc-size()` — NOT YET **[web]**

The dock's `useLayerTransition` does a manual pin→measure→re-pin→animate FLIP precisely because
CSS cannot (historically) transition `width: auto` ↔ a pixel value (`useLayerTransition.ts`
docstring `:38-48`). SOTA has a native answer: `interpolate-size: allow-keywords` (set once at
`:root`) and `calc-size(auto, …)` let you transition to/from `auto`/`fit-content`/`max-content`
([MDN interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interpolate-size);
[Chrome, *Animate to height:auto*](https://developer.chrome.com/docs/css-ui/animate-to-height-auto)).
**BUT** as of 2025 it is **Chromium-only (Chrome/Edge 129+), no Firefox, no Safari** — only
~2/3 of users. Its progressive-enhancement story is "unsupported browsers just snap, no
breakage," which is fine for a *new* effect but **NOT** acceptable as the dock's *primary* size
animation (Firefox/Safari users would lose the dock's signature smooth width morph entirely).

**B5 verdict:** `interpolate-size` is **not yet** the FLIP-killer. The dock already has the
RIGHT modern substrate for this — the **View-Transitions fork** in `useLayerTransition`
(`:115-133`, AQ.W6): on a VT-capable engine the browser owns the size morph + crossfade with
zero `getBoundingClientRect`, and the JS FLIP is the feature-detected fallback. That is the
correct, cross-browser-safe architecture and it's already shipped. AT should **note**
`interpolate-size` as the named-forward future simplification (when it reaches Baseline, the JS
FLIP fallback can be replaced by a `:root { interpolate-size: allow-keywords }` + `calc-size`
fallback, deleting the pin/measure dance entirely) — but it is **NOT** an AT action item. Record
it; don't bake it.

---

## §4 — The collapsed-prop model (the AT deliverable)

### §4.1 The design (clean break)

```ts
// GlassDock props — the overflow/containment surface, post-collapse
defineProps<{
    orientation?: "horizontal" | "vertical";   // unchanged — the axis seam (sound)

    /**
     * What happens when expanded content exceeds the dock's axis cap
     * (--dock-max-inline-size horizontally, --dock-max-block-size vertically).
     * The ONE overflow concern; supersedes the old `overflow`+`wrap` pair AND
     * the clip-lift side-effect of `containerName`.
     *   "grow"    — content grows then overflows VISIBLY past the cap (default;
     *               the historical behaviour; nothing clips or scrolls).
     *   "scroll"  — the dock is the scroll port on its layout axis (axis derived
     *               from orientation). + optional @supports scroll-driven edge-fade.
     *   "wrap"    — content wraps to multiple rows/cols; clamp via the cap; radius
     *               relaxes to --radius-dock-wrap. Keyed off the dock's OWN size
     *               (cqi), NOT a viewport MQ.
     *   "clip"    — hard clip at the cap (overflow: hidden), no scroll affordance.
     */
    overflow?: "grow" | "scroll" | "wrap" | "clip";   // default "grow"

    /**
     * Name a container-query subject on the dock root (container-type:
     * inline-size; container-name: <value>). PURE naming — no overflow/clip
     * side-effect. Consumers query `@container <value> (...)` off the dock's
     * own inline size to swap descendant layout (label→abbreviation, etc.).
     */
    container?: string;
}>()
```

Key moves:
1. **`wrap` (boolean) → `overflow: "wrap"`** — folds the wrap mode into the one enum where it
   belongs. The four smuggled side-effects (radius / clamp / separators / MQ-reversal) are
   **dropped or re-homed**: radius becomes a `--radius-dock-wrap` token (token-first), the
   viewport clamp becomes a `cqi`/cap clamp (`§5`), the separator-hiding stays (it's a sensible
   wrap-mode default), and the **`@media(640px)` reversal is DELETED** (it was the bug — wrap is
   now keyed off the dock's own size, so there's nothing to "reverse on desktop").
2. **`containerName` → `container`** (rename) + **strip the clip side-effect.** `container` now
   ONLY sets `container-type`/`container-name`. The clip-lift that consumers actually wanted
   moves to `overflow: "grow"`'s existing visible behaviour, or — if a consumer wants a named
   container AND a clip — `container="x"` + `overflow="clip"` now composes cleanly (impossible
   today). The single real consumer (`metric-pill`) migrates `container-name="…"` →
   `container="…"` and gets `overflow="grow"`'s visible default automatically (it's already
   `fit-content` + `always-expanded`, which is grow-visible).
3. **`overflow: "clip"`** is the honest fourth member (hard clip) — completes the enum so the
   `:not([data-container-name]) { overflow: hidden }` default (`dock.css:85`) becomes an
   explicit `overflow="clip"` rather than a CSS-only implicit default no prop names.

### §4.2 The CSS class surface (one class per enum value)

Replace the tangled `.dock-wrap` / `[data-container-name]` / `.dock-scroll-*` web with a single
attribute-or-class map driven by the enum:

```
overflow="grow"   → (default; no class)               overflow-x/y: visible past cap
overflow="scroll" → .dock-overflow-scroll             scroll port on the derived axis
                                                       + @supports(animation-timeline:scroll())
                                                         scroll-driven edge mask-fade
overflow="wrap"   → .dock-overflow-wrap                flex-wrap, cqi-keyed clamp, --radius-dock-wrap
overflow="clip"   → .dock-overflow-clip                overflow: hidden (the old implicit default)
container="x"     → style: container-type:inline-size  PURE — no overflow rule
                           container-name:x
```

The axis derivation stays in the SFC computed (`scrollClass` at `GlassDock.vue:124-127`
generalizes to an `overflowClass` computed). Orientation gets ONE clean seam into the enum (the
`dim`-aware FLIP is untouched; the scroll axis derives from `orientation` exactly as today).

### §4.3 What this kills (the net simplification)

- DELETE: `wrap` prop + `dock-wrap` (all of `dock.css:542-572`) + the `@media(640px)` wrap
  reversal (`:1090-1112`) + `--dock-wrap-max-width`/`--dock-wrap-*` token family.
- DELETE: `[data-container-name]` clip-lift coupling (`dock.css:85-87`) + the bundled
  `overflow:visible` in `containerStyle` (`GlassDock.vue:106`).
- RENAME: `containerName` → `container`, `data-container-name` → `data-container` (or drop the
  attr entirely — the clip rule that read it is gone, so the structural marker has no remaining
  job; `container` becomes a pure inline style).
- The `.glass-dock.vertical.always-expanded` visible-patch (`dock.css:487-490`) and the
  `:not(.dock-wrap)` qualifiers scattered through the grow/scroll rules (`:391,506`) all
  simplify once `dock-wrap` is gone.

Net: ~5 props of conceptual surface → 2 (`overflow` enum + `container` name), ~60 lines of
self-undoing CSS deleted, the 640px viewport coupling eliminated, and a genuinely impossible
composition (named container + hard clip) becomes expressible.

---

## §5 — Orientation-hardening + the responsive (container-query-driven) story

Three SOTA-grounded hardenings, all dependency-free, all `@supports`/Baseline-safe:

### §5.1 Wrap keyed off the dock's own size, not the viewport **[web, §3.1]**
`overflow="wrap"` clamps via the existing axis cap (`--dock-max-inline-size`) and, where a
finer wrap threshold is wanted, via `cqi` on the dock's own container (the dock names itself
when `container` is set). The `@media (min-width: 640px)` reversal is **deleted** — it was a
viewport-coupling bug a container query fixes structurally. Hard gate: a unit/visual asserting
no `@media (min-width:` rule remains in the wrap path.

### §5.2 Scroll-mode edge-fade via scroll-driven animation **[web, §3.3]**
Add a pure-CSS scroll-edge mask to `overflow="scroll"`, `@supports (animation-timeline: scroll())`
gated (graceful no-op on Safari where it lags). Feathers only the edge with content past it; zero
JS; the `@property --dock-fade-{start,end}` + `mask: linear-gradient` recipe. This is **net-new
polish the grow-mode-era "nothing to feather" rejection (`dock.css:194-198`) never reconsidered
for scroll mode.** Optional within W7 (it's enhancement, not collapse) — flag it as a stretch.

### §5.3 The responsive recipe is consumer-CSS off the named container **[web, §3.2]**
The dock does NOT ship a JS priority-plus measurer (would be overfit — one speculative
consumer). Instead, `container` makes the dock a clean CQ subject and the **documented recipe**
(already half-written at `metric-pill.vue:118-125`) is: consumer writes
`@container <name> (max-width: N) { … label→abbreviation … }`. SOTA confirms this is THE 2026
pattern for component-responsive toolbars. The dock's contribution is the clean subject + the
`overflow="wrap"` mode; the tier-swap is the consumer's `@container` rule. This keeps the dock's
substrate minimal and pushes policy to the consumer (token-first / component-over-CSS, J
invariants).

### §5.4 Named-forward (do NOT bake): `interpolate-size` **[web, §3.4]**
When `interpolate-size`/`calc-size()` reach Baseline (Chromium-only as of 2025), the
`useLayerTransition` JS FLIP fallback can be replaced by `:root { interpolate-size:
allow-keywords }` + a `calc-size(auto,…)` transition, deleting the pin/measure/re-pin dance. The
VT fork already covers VT-capable engines; `interpolate-size` would cover the FLIP-fallback path.
**Record as a future simplification; not an AT action** (cross-browser support insufficient).

---

## §6 — Hard gates for the augmented dock-wave

The W7 line-item "GlassDock overflow-collapse (retire `wrap`)" (`AT.md:151,171`) is
under-specified for what's actually a 4-mechanism collapse. Proposed hardened gates:

| # | Gate | Pass condition |
|---|---|---|
| G1 | One enum, no boolean | `rg "wrap[?:]" GlassDock.vue` = 0; `overflow` is the sole overflow prop; `"grow"\|"scroll"\|"wrap"\|"clip"` all map to one class each |
| G2 | `container` is pure | `containerStyle` sets ONLY `container-type`/`container-name`; `rg "overflow.*visible" GlassDock.vue` (in containerStyle) = 0 |
| G3 | Impossible-now composition works | a unit: `container="x"` + `overflow="clip"` → root has BOTH `container-name:x` AND `overflow:hidden` (today: impossible) |
| G4 | No viewport coupling in wrap | `rg "@media \(min-width" dock.css` returns 0 hits inside any `.dock-overflow-wrap` / wrap path |
| G5 | Clean break, no alias | no `wrap` / `containerName` prop alias; `MIGRATION.md` carries the `wrap`→`overflow="wrap"` + `containerName`→`container` rename rows |
| G6 | Migration footprint discharged | the 1 demo `containerName` site renamed; the 2 `overflow="scroll"` sites unaffected; `wrap` deletion touches 0 SFCs (verified §2.4) |
| G7 | Axis core untouched | `useLayerTransition` `dim` parametrization + `useDockState` unchanged (the collapse is overflow-layer only); existing FLIP/VT tests green |
| G8 | (stretch) scroll edge-fade | `@supports (animation-timeline: scroll())` scroll-mode mask present; no-op when unsupported; no JS added |

G1-G7 are binding; G8 is a stretch enhancement.

---

## §7 — Where this lands in AT (the proposal)

The existing AT plan books the overflow-collapse into **W7** ("Slipped ships + contract",
`AT.md:151`) bundled with Fraunces/control-size-vocab/π-precept. B5's finding is that the
collapse is **bigger than a one-line slipped ship** — it's a 4-mechanism clean break with its
own gate fleet (§6) — but it remains **file-disjoint** from the blob waves (it touches only
`GlassDock.vue` + `dock.css` + dock tests) and from the W6 correctness fold. Two options:

- **Option A (minimal, recommended):** keep it in W7 but **promote it to a named design-slice**
  with the §4 collapsed-prop model + §6 gate fleet as its binding spec (not a one-liner). This
  honors the plan's wave count and keeps blast-radius coherent.
- **Option B:** split a dedicated **W7a "dock overflow-model collapse"** sub-wave if W7's bundle
  is too heavy to gate atomically. Only if the control-size-vocab + Fraunces work crowds it.

Either way the **W1 design slice** should gain a `design/AT.W1-dock-overflow.md` section (or
this file is cited as its source) carrying the §4 model + §6 gates, so the DEV/IMPL boundary
(W1) has the collapse fully specified before any src lands — same discipline the blob slices got.

**Augmented-AT proposals (concrete):**
1. **W1 +slice:** adopt §4's collapsed-prop model (`overflow: "grow"|"scroll"|"wrap"|"clip"` +
   pure `container`) as the binding spec; cite this file. Gate: every prop/class file:line-mapped.
2. **W7 (promote line-item):** execute the clean-break collapse per §4 with the §6 G1-G7 gate
   fleet; `MIGRATION.md` rename rows; the `@media(640px)` wrap reversal deleted.
3. **W7 (stretch, G8):** add the `@supports`-gated scroll-driven edge-fade to `overflow="scroll"`
   — net-new polish, dependency-free.
4. **Named-forward (record, don't bake):** `interpolate-size` as the future FLIP-fallback
   replacement (§5.4); revisit at Baseline.

No overfitting (the wrap delete REMOVES a zero-consumer substrate; the enum members each have a
real consumer or are the honest completion of the set). No legacy (clean break, no alias). The
axis abstraction — the genuinely good part of the orientation system — is preserved untouched.

---

## §Sources

- [CSS Container Queries: Complete Frontend Guide 2025 — jonimms.com](https://jonimms.com/modern-css-container-queries-complete-guide/)
- [CSS Container Queries in 2026: Stop Writing Media Queries — UsuallyCorrect](https://usuallycorrect.com/blog/css-container-queries-2026)
- [Container queries in 2026: Powerful, but not a silver bullet — LogRocket](https://blog.logrocket.com/container-queries-2026/)
- [Container query units: cqi and cqb — CSS-Tricks](https://css-tricks.com/container-query-units-cqi-and-cqb/)
- [Beyond Media Queries: Container-Aware Dynamic Overflow with ResizeObserver — Call Center Studio / Medium](https://medium.com/call-center-studio/beyond-media-queries-building-container-aware-dynamic-overflow-systems-with-resizeobserver-e270353e1501)
- [Responsive mode in EJ2 Toolbar (priority/overflow popup) — Syncfusion](https://ej2.syncfusion.com/documentation/toolbar/responsive-mode)
- [jayfreestone/priority-plus — GitHub](https://github.com/jayfreestone/priority-plus)
- [Modern Scroll Shadows Using Scroll-Driven Animations — CSS-Tricks](https://css-tricks.com/modern-scroll-shadows-using-scroll-driven-animations/)
- [CSS scroll snap — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap)
- [scroll-padding — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding)
- [scrollbar-gutter — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter)
- [interpolate-size — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interpolate-size)
- [Animate to height: auto — Chrome for Developers](https://developer.chrome.com/docs/css-ui/animate-to-height-auto)
- [calc-size() and interpolate-size — 12 Days of Web](https://12daysofweb.dev/2024/calc-size-and-interpolate-size/)

(All [web] findings corroborated via WebSearch/WebFetch, June 2026. Browser-support specifics —
container queries Baseline since 2023; scroll-driven `animation-timeline` lagging in Safari;
`interpolate-size` Chromium-only — are as of the cited sources' 2025-2026 dates.)
