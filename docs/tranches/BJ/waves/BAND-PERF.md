# BJ BAND-PERF — demo/story load performance (Family E)

Registry **Family E** — demo/story performance, A17 (`docs/tranches/BJ/formation/REGISTRY.md:108-120`).
Sources: `round-1/story-demo-load-performance--static-analysis---no-browser-.md` (all five mechanisms,
each with file:line) confirmed on disk by
`round-2b-confirm/adversarial-on-disk-verification-of-the-8-remaining-round-1.md:49-55`
(73 modulepreloads / 285 chunks / 3.3M dist-demo). Ledger rows: **F01** (preview cards + all story pages
"partially load, then stutter"), **F02** ("most of the cards are blank white"), **F06** (dock-page
transitions "broken, slow, and flash the screen"), **F46** ("slow to load"), **A17** (perf as a first-class
lens) — `FEEDBACK-LEDGER.md:13,14,18,58,84`.

**DRAFT for the Fable two-challenge pass.** Every unsettled judgment is an `OPEN` marker, not a guess.
This band writes NO source: the fix flips (the async boundaries, the field-governance heuristic, the
above-fold exemption, the route-pending affordance) are named as build obligations discharged by the
EXECUTION waves. This spec authors the **static born-RED detectors** now and specifies the **live-trace
RED baseline as a Round-3 browser obligation** with an exact capture recipe — it does NOT claim any
LCP/long-task/rAF metric RED without a trace on disk.

## §Band framing — static now, trace at R3

The census verdict is high-confidence on **mechanism** and owes **live-trace confirmation** of the
user-visible symptom (`REGISTRY.md:109` "mechanisms identified statically with high confidence; live-trace
confirmation owed"). This band therefore splits its gates cleanly:

- **Static, born-RED NOW** (verified probes over the source tree + the built `dist-demo/`): the async-boundary
  asserts, the modulepreload-count / eager-KB ceilings, the above-fold content-visibility exemption assert,
  the per-instance filter-duplication count, the route-pending-affordance-absent assert. Each reds at HEAD
  today; each has a verified probe below.
- **Live-trace, PENDING-R3** (a Chrome-DevTools performance trace captured when the browser seat frees per
  `REGISTRY.md:206-208`): LCP / long-tasks at boot, the continuous-rAF composite on content routes, the
  transition flash+duration on a cold dock nav, and the `contain-intrinsic-size` vs measured-height layout
  shift. These are written with the exact capture recipe (§Band R3 recipe) and are **NOT** born-RED — they
  are the RED baseline the Round-3 lens captures per MEMORY `live_verify_capture` (a captured DELTA artefact,
  not a commit-message claim).

Four waves:

| Wave | Name | Motion | Static born-RED at HEAD | Live-trace |
|------|------|--------|--------------------------|------------|
| 1 | `BJ.W-BOOT-DIET` | Async PresetEditor/Aurora/docks + split `shellAuroraConfig` off the barrel | Yes — 4 static imports; 73 modulepreloads / ~770KB eager JS | LCP/long-task delta PENDING-R3 |
| 2 | `BJ.W-SHELL-FIELD-GOVERN` | Idle/visibility gate (or static wash) for the always-on shell field | Yes — `fixed inset-0`, only `tab-hidden` pauses; no idle governance | continuous-rAF trace PENDING-R3 |
| 3 | `BJ.W-DEFERRED-PAINT` | Intrinsic-size truth (handoff) + shared filter def + live-trace deferred-paint gate (above-fold cv EDIT + static gate CEDED to STORY W5) | Yes — 13 per-instance filter hosts | intrinsic-size-vs-height + deferred-paint PENDING-R3 |
| 4 | `BJ.W-ROUTE-PENDING` | Pending affordance (liquid-weight) instead of the frozen atomic swap | Yes — no Suspense/aria-busy/skeleton in the swap | transition-flash trace PENDING-R3 |

**Gate substrate (band-wide decision, `OPEN-P0`).** Per the sibling `BAND-GATES` `OPEN-1` ruling, the tree has
**no** `scripts/gates.mjs` / `scripts/proof-*.mjs`; the single CI enforcement is `npm test` = `vitest run`.
The static detectors below are authored as **vitest tests that read the source tree AND the built `dist-demo/`
via `fs` + grep**, landing in `tests/gates/` under the existing `npm test` step with **zero new CI wiring**.
The one exception is the modulepreload/eager-KB ceiling, which must read a **built** `dist-demo/` — it needs a
`vite build --config <demo>` to exist in CI before the assert runs. **`OPEN-P0` is RULED (adjudication ruling
9): build `dist-demo/` in the test job** (a demo-build step), NOT read a committed build-manifest snapshot — a
committed snapshot goes stale silently and greens over a regressed build. The live-trace obligations are NOT
vitest — they are the Round-3 Chrome-DevTools recipe.

---

## Wave 1 — `BJ.W-BOOT-DIET` — the eager boot-graph diet

### §Mandate

Discharges `perf:eager-boot-graph-bloat` (`REGISTRY.md:111-112`; round-1 finding 1). The user-visible defect
(F01/F46): the always-mounted `AppShell` drags the WebGL Aurora, the full configurator (PresetEditor + its
reka dropdown/select/tooltip/floating subtree), Dialog, and both docks into the **eager** boot graph, and
`app.mount()` is gated behind all of it plus the first route chunk — so `#app` is blank white until ~1.1MB
resolves.

### §Design — the RED baseline (verified on disk) and the four cuts

**RED baseline, measured on the committed `dist-demo/` build (2026-07-16):**
- `dist-demo/index.html` = **73 `modulepreload` links + 1 entry `<script type=module>` = 74 eager JS files**,
  summing **789,398 bytes ≈ 770 KB uncompressed** (measured: sum of every `.js` referenced in `index.html`).
- Render-blocking CSS: `dist-demo/assets/index-C8_UmRWR.css` = **317 KB** (the other three eager CSS files are
  <1KB). Total eager boot graph ≈ **770 KB JS + 317 KB CSS ≈ 1.09 MB** (matches round-1's "~1.1MB").
- `dist-demo/assets/` holds **285 JS chunks / 3.3M** total (round-2b confirmed) — most are lazy route chunks
  and are FINE to be numerous; the gate targets the **eager** subset, not 285.
- Top eager chunks (measured): `aurora-hero 277KB` (the Aurora component + WGSL/GLSL shaders),
  `index 103KB`, `class-names 86KB`, `DropdownMenuTrigger 40KB`, `SelectItem 30KB`, `floating 25KB`
  (the three reka chunks = the configurator's floating stack ≈ 95KB), `routeTransition 25KB`, `value 24KB`
  (the value.js color core).

**The four static imports that create the eager drag (verified at HEAD):**
- `demo/shell/AppShell.vue:11` `import { Aurora } from "@glass/components/aurora"` — top-level, eager. Pulls
  `aurora-hero 277KB`. The barrel re-exports the component: `src/components/aurora/index.ts:1`
  `export { default as Aurora } from "./Aurora.vue"`.
- `demo/shell/AppShell.vue:26` `import { PresetEditor } from "./configurator"` — top-level, eager. Pulls the
  reka `DropdownMenuTrigger/SelectItem/floating` ≈ 95KB. **The configurator is a hidden right-side Sheet
  opened ONLY by the SidebarDock gear or the `,` shortcut** (`AppShell.vue:125-128` registers the
  `glass-ui-demo:toggle-configurator` shortcut; `AppShell.vue:222` `<PresetEditor />` mounts it at the shell
  root) — it is never visible at first paint, yet fully eager. The purest cut.
- `demo/shell/AppShell.vue:27-28` `import SidebarDock from "./SidebarDock.vue"` + `import BottomDock from
  "./BottomDock.vue"` — top-level, eager (the always-visible nav chrome).
- `demo/chassis/hero/aurora-hero.ts:15` `import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora"` +
  `:16` `import { cssToOklch } from "@glass/composables/color"`. `shellAuroraConfig` (`aurora-hero.ts:274`)
  needs only the plain-object default + a color fn, but imports them **through the aurora barrel**, which
  statically re-exports `Aurora.vue`. So even after the Aurora *component* is made async, the config path
  re-drags the barrel (and `value 24KB`) into the eager graph unless the config imports from a leaf.

**The cuts:**
1. **PresetEditor/configurator async** (`defineAsyncComponent(() => import("./configurator"))`) — the reka
   dropdown/select/tooltip/floating stack leaves the boot graph; the Sheet lazy-loads on first gear/`,` open.
   The cleanest, lowest-risk win (~95KB + the ConfiguratorLayer CSS).
2. **Aurora component async** — `aurora-hero 277KB` leaves the eager graph. The shell field is already
   deferred *at runtime* past first paint (`useAurora.ts:288` `scheduleAfterFirstPaint`), but the 277KB
   **chunk** is still eager; making the component async pulls the chunk out too. (`OPEN-P1`: async Aurora
   means the shell field paints its GL layer a tick later; the CSS-gradient placeholder
   (`paletteToCssGradient`, `aurora-hero.ts:23-25` comment) covers the gap — confirm the placeholder is not
   itself in the async chunk, else the wash flashes empty.)
3. **Split `shellAuroraConfig` off the aurora barrel** — repoint `aurora-hero.ts:15` from
   `@glass/components/aurora` to the leaf `@glass/components/aurora/constants/presets` (where
   `DEFAULT_AURORA_CONFIG` is actually defined, `presets.ts:391`), so the config factory no longer statically
   re-imports `Aurora.vue`. Requires the leaf to be an exposed subpath (`OPEN-P2`: is
   `aurora/constants/presets` a public export, or does this need a new leaf export in the aurora barrel's
   subpath map? A parsimony-preferred alternative is a tiny `aurora/config` type-only + constant subpath).
4. **Docks (`OPEN-P3`, the weakest cut):** SidebarDock/BottomDock are always-visible chrome, so making them
   async trades eager KB for a flash-of-missing-nav at first paint. Draft leans **keep the docks eager**
   (their bytes are small next to Aurora+configurator, and async nav chrome degrades the first frame) and take
   the two headline cuts (1+2) plus the barrel split (3). Fable rules whether the docks are worth deferring.

### §Work (EXECUTION-wave obligations, not authored here)

- `demo/shell/AppShell.vue` — `PresetEditor` (and Aurora, per `OPEN-P1`) → `defineAsyncComponent`.
- `demo/chassis/hero/aurora-hero.ts:15` — repoint the `DEFAULT_AURORA_CONFIG` import to the leaf.
- `tests/gates/boot-graph.test.ts` (this band authors the detector, born-RED):
  - **source arm:** assert `AppShell.vue` does NOT top-level-`import` PresetEditor/Aurora (they must be
    `defineAsyncComponent`); assert `aurora-hero.ts` does NOT import from the `@glass/components/aurora` barrel.
  - **build arm:** assert `dist-demo/index.html` has **≤ a modulepreload ceiling** and the summed eager JS is
    **≤ an eager-KB ceiling** (`OPEN-P4`: set the ceilings post-diet — e.g. ≤ 45 modulepreloads / ≤ 450KB — so
    the gate reds at the HEAD 73/770 and greens only after the cuts land; the exact ceiling is Fable's call).

### §Acceptance — born-RED (static)

- **async-boundary arm RED at HEAD:** `grep -n 'defineAsyncComponent' demo/shell/AppShell.vue` = **0**;
  the four imports at `AppShell.vue:11,26,27,28` are all top-level static (verified). GREEN when
  PresetEditor (+ Aurora) become async.
- **barrel-split arm RED at HEAD:** `aurora-hero.ts:15` imports `DEFAULT_AURORA_CONFIG` from
  `@glass/components/aurora` (the barrel that re-exports `Aurora.vue`) — verified. GREEN when repointed to
  the leaf.
- **build-ceiling arm RED at HEAD:** `grep -c modulepreload dist-demo/index.html` = **73**; eager JS sum
  ≈ **770 KB** — both over any post-diet ceiling. GREEN when the async cuts shrink the eager set.
- Each arm ships a self-test bite (a planted top-level `import { Aurora }` reds the source arm; a planted
  oversized manifest reds the build arm) so the gate proves it can fail.

### §π/DELTA + live-trace (PENDING-R3)

The boot diet has **no** intended pixel change — the shell renders identically, only sooner. The RED-baseline
proof of the *symptom* (F01/F46 slow-load/stutter) is a **PENDING-R3** Chrome-DevTools trace: capture LCP and
the total long-tasks blocking-time on a cold load of `/` and `/foundations`, before vs after the diet, per the
§Band R3 recipe. Do NOT claim an LCP number RED without the trace on disk.

### §KISS / parsimony

Three surgical edits (two `defineAsyncComponent` wraps + one import repoint), net near-zero LOC, no new
abstraction. Gestalt not patchwork: the eager graph shrinks because the hidden/deferred surfaces leave it, not
because chunks are hand-split. No masking fallback — the placeholder wash is the *primary* first-paint, not a
fallback that hides a dead Aurora (MEMORY `no_masking_fallback`).

### §Non-goals

- NOT the shell-field runtime governance (Wave 2 owns the always-on loop).
- NOT hand-authoring manualChunks / vite splitConfig — the diet is import-boundary work, not bundler tuning.
- NOT touching the route chunks themselves (Blob 94KB, StoryHero 63KB are correctly lazy already,
  `router.ts` route `component: () => import()`).

---

## Wave 2 — `BJ.W-SHELL-FIELD-GOVERN` — govern the always-on shell field

### §Mandate

Discharges `perf:persistent-webgl-shell-loop` (`REGISTRY.md:113`; round-1 finding 3). The mechanism: `AppShell`
mounts a `fixed inset-0` `<Aurora>` on every non-focal route, and because a full-viewport canvas is **always**
intersecting the viewport, its `useIntersectionPause` guard's pause branch is unreachable while the tab is
visible — a continuous WebGL rAF composite runs behind every content page (foundations/forms/display/data/
feedback/containers), sustaining GPU/CPU load that compounds per-page live vizzes and reads as the F01 stutter.

### §Design — the pause-guard-unreachable fact (verified) and the governance

**The pause-guard-unreachable fact (verified at HEAD):**
- `demo/shell/AppShell.vue:147-156` mounts `<Aurora v-if="shellFieldActive" :config="shellAuroraConfig"
  ... class="shell-aurora fixed inset-0 -z-10">` (`v-if` at :147, `fixed inset-0` class at :151) on every
  route whose `meta.suppressesShellField` is falsy (`demo/router.ts:115-117` `shellFieldActive` computed).
- `src/components/aurora/composables/useAurora.ts:270-277` arms the deferred GL path via
  `useIntersectionPause` with `{ pauseWhenHidden: false }`, whose ONLY pause reason is `pause("off-screen-io")`.
- `src/composables/motion/core/useIntersectionPause.ts:61` `const isIntersecting = ref(true)` — defaults
  intersecting until the observer reports. A `fixed inset-0` canvas reports intersecting on the first tick and
  **stays** so, so `pause("off-screen-io")` never fires while the tab is visible. The only surviving pause is
  the runtime's lifted `tab-hidden` listener (document-visibility) — i.e. the loop pauses ONLY when the whole
  tab is hidden, never when the field is behind opaque content on a dense route. The `shellAuroraConfig`
  computed (`AppShell.vue:92`) re-derives the config per navigation (route hue), so the loop persists across
  every content-route swap.

**The governance (the field earns its cost only where it is seen):**
- Gate the shell field behind a **visibility/idle heuristic** (pause when the field is fully occluded by opaque
  page content, or after an idle interval on a content route), OR substitute a **cheaper static wash** on the
  dense content categories that already declare grid/paper defaults (forms/data/display) so the live GL field
  runs only on the hero/substrate bands where it is the actual subject.
- `OPEN-P5` (the design fork Fable must settle): (a) an **occlusion/idle pause** keeps the live field
  everywhere but stops the rAF when it is not contributing pixels — most faithful, but "is it occluded?" is a
  real heuristic (a translucent page still composites the field); vs (b) a **static wash on dense categories**
  — dead-simple and cheap, but drops the ambient live field on those routes (a deliberate design downgrade the
  user may or may not accept). Draft leans (b) for forms/data/display (they already read as paper/grid) and
  keeping the live field on foundations/substrate — but this is a design ruling, not a perf mechanic.
- `OPEN-P6`: does the `fixed inset-0` field even need to be live *between* hero moments at all, or should
  `shellFieldActive` be narrowed at the router level (more routes set `suppressesShellField`) so the field is
  a hero-band affordance, not a global backdrop? This overlaps Family D's transition-choreography and Family G's
  substrate work — coordinate before widening the suppress set.

### §Work (EXECUTION-wave obligations)

- `demo/shell/AppShell.vue` / `src/components/aurora/composables/useAurora.ts` — add the visibility/idle pause
  arm (per `OPEN-P5`), OR narrow `shellFieldActive` + swap a static wash on dense categories.
- `tests/gates/shell-field-governance.test.ts` (this band authors the detector, born-RED, source-level):
  assert the shell field mount is governed by MORE than the `tab-hidden`/`v-if=shellFieldActive` pair — i.e.
  either an idle/occlusion pause hook is wired, or the dense-category routes resolve a static wash. The precise
  assertion shape depends on `OPEN-P5`'s resolution (`OPEN-P7`).

### §Acceptance

- **Static born-RED at HEAD (structural):** the shell Aurora at `AppShell.vue:147-156` has NO
  idle/occlusion pause governance beyond `tab-hidden` + `v-if=shellFieldActive` — verified: `useAurora.ts`'s
  only intersection pause reason is `off-screen-io`, unreachable for `fixed inset-0`
  (`useIntersectionPause.ts:61` default-true). The detector reds at HEAD; GREEN when governance lands.
- **Live-trace RED baseline (PENDING-R3):** capture a Chrome-DevTools trace on a content route (`/forms` or
  `/data`) and confirm a **continuous rAF composite / non-zero GPU-raster during idle** with the shell field
  mounted (per §Band R3 recipe — read the trace's frame/rAF track for sustained activity with no user input).
  This is the RED baseline; do NOT assert a frame-rate/GPU number without the trace.

### §π/DELTA

If governance downgrades dense routes to a static wash (`OPEN-P5`b), that IS a visible change — capture a
before/after paired screenshot on `/forms` + `/data` (the field-live vs static-wash read) so the design
downgrade is an explicit, reviewed DELTA, not a silent removal. If governance is pure occlusion/idle pause
(`OPEN-P5`a), there is no intended pixel change (the field looks identical, only idles when unseen) and the
proof is the R3 trace delta (sustained rAF → paused).

### §KISS / parsimony

Prefer the fewest-lines governance that is honest: an idle/occlusion pause is a small hook on the existing
`useIntersectionPause`; a static wash is a CSS class swap on dense categories. No new WebGL machinery. The
field is not "fixed" with a fallback — it is either live-and-governed or static-by-design, never a dead loop
masked as motion.

### §Non-goals

- NOT re-architecting `useAurora`'s deferred-arm scheduler (it correctly defers *arming* past first paint;
  the defect is the *never-pausing* while visible, not the arm timing).
- NOT the aurora preset/medium reduction (Family G, F08).
- NOT the per-page live-viz budget (each story owns its own field; this wave governs the SHELL field only).

---

## Wave 3 — `BJ.W-DEFERRED-PAINT` — above-fold exemption, intrinsic-size truth, shared filter def

### §Mandate

Discharges `perf:content-visibility-deferred-paint` (`REGISTRY.md:112`; round-1 finding 2, F02's "most of the
cards are blank white") + `perf:svg-turbulence-paint-cost` (`REGISTRY.md:114`; round-1 finding 4). The
mechanism: every landing preview card sets `content-visibility:auto` with `contain-intrinsic-size:auto 19rem`,
so below-fold cards are unrendered blank 19rem boxes until scrolled near; while the ~1.1MB boot saturates the
main thread the *above-fold* cards paint late too — the reported "foundations cards render blank white". The
primary cure is Wave 1 (cut the boot-thread saturation so deferred paints land promptly); this wave removes the
remaining structural sharp edges.

### §Design — three targeted edits

**(A) Above-fold content-visibility exemption — CEDED to `BAND-STORY` W5 (FINDING-2).**
`demo/chassis/landing/SectionPreviewCard.vue:63-65` applies `content-visibility: auto; contain: content;
contain-intrinsic-size: auto 19rem;` unconditionally to every card (`SectionLanding.vue:35-38` renders one
`<SectionPreviewCard v-for>`; `/foundations` renders 13; no `IntersectionObserver` drives them — `grep -rn
IntersectionObserver demo/` = **0** verified). **`BAND-STORY` W5 (`BJ.W-PREVIEW-CARD`) rewrites this file
wholesale** (masonry + live miniatures) and therefore owns the above-fold EDIT and its STATIC source gate —
one owning wave per file (`BAND-STORY.md:24-25`). PERF W3 does NOT author a static above-fold gate here (it
would double-own the file and double-gate the exemption). PERF's remaining contribution to the above-fold cure
is the **live-trace deferred-paint gate** (below — the "perf trace gate" `BAND-STORY` W5 already delegates to
family E) and the **intrinsic-size number handed to `BAND-STORY`** to apply AFTER the masonry rewrite settles
the true card height. `OPEN-P8` (the exact above-fold N / grid-cols keying) moves with the edit to `BAND-STORY`
W5.

**(B) Intrinsic-size truth (PENDING-R3 measure).** `contain-intrinsic-size: auto 19rem` is the placeholder
height that reserves layout before a below-fold card paints; if 19rem ≠ the real rendered card height, each
card **shifts** when it paints (CLS). The `auto` keyword means the browser remembers the *last* rendered size,
so the mismatch bites only on the FIRST paint of each card — but that first-paint shift is exactly the "stutter"
read. Whether 19rem matches reality is **not statically knowable** — it needs a browser measurement of the
rendered `SectionPreviewCard` height at each breakpoint. PENDING-R3: measure the real card height on
`/foundations` (§Band R3 recipe, `getBoundingClientRect().height`) and retune the 19rem to truth (or make it
per-breakpoint). Do NOT assert a shift RED without the measured height. **Handoff (FINDING-2):** the retuned
number is MEASURED here and HANDED to `BAND-STORY` W5 to apply on its rewritten card — PERF supplies the
measured truth, W5 applies it after the masonry height settles (PERF does not edit `:65` directly, since W5
rewrites the file).

**(C) Shared feTurbulence filter def (verified — but weaker than round-1 framed).** `foundations/colors`
renders 13 animated `WatercolorDot` swatches (`colors.vue:47` `rainbow = Array.from({length:13})`, `:91-99`
`v-for="i in rainbow" <WatercolorDot animate>` — verified 13). Each dot mounts its OWN namespaced
`<filter>` hosting `feTurbulence numOctaves="5"` + `feDisplacementMap` (`WatercolorDot.vue:164-166` +
`:14` "mounts its own namespaced `<filter>` so there is zero consumer plumbing") — so the page carries **13
duplicate turbulence filter defs**. **Honest nuance (`OPEN-P9`, a real KISS ruling):** the component doc at
`WatercolorDot.vue:22-24` states the SVG filter "rasterizes ONCE + caches ... and NEVER re-rasterizes per
frame" — so the cost is **13 one-time mount raster ops + 13 duplicate filter-def DOM subtrees**, NOT 13
per-frame live turbulence. Round-1's "13 live feTurbulence" framing overstates the steady-state cost. The
shared-filter-def optimization (one hoisted `<filter>` referenced by all 13 dots) removes DOM duplication and
12 redundant mount-time rasterizations — a genuine but **minor** win. Fable rules whether it is worth the
plumbing (a shared def means a consumer-visible filter id, breaking the "zero consumer plumbing" property the
component was designed around) or whether this arm is dropped as not-worth-the-complexity. Draft leans: keep it
minor/optional, gate only the DUPLICATION count, do NOT touch the once-and-cache raster path.

### §Work (EXECUTION-wave obligations)

- `demo/chassis/landing/SectionPreviewCard.vue` above-fold exemption EDIT → **CEDED to `BAND-STORY` W5**
  (it rewrites the file); PERF hands over the intrinsic-size TRUTH, not the edit.
- `demo/chassis/landing/SectionPreviewCard.vue:65` — the R3-measured `contain-intrinsic-size` number is
  MEASURED here and HANDED to `BAND-STORY` W5 to apply on its rewritten card (PERF does not edit `:65`).
- `src/components/watercolor-dot/WatercolorDot.vue` + `demo/stories/foundations/colors.vue` — the shared filter
  def (per `OPEN-P9`, if kept).
- `tests/gates/deferred-paint.test.ts` (this band authors the detectors):
  - **~~above-fold arm~~ — CEDED:** the STATIC above-fold source gate lands in `BAND-STORY` W5 (G-PRV-3),
    not here (one gate asserts the exemption, on the wave that owns the file).
  - **live-trace deferred-paint gate (PENDING-R3):** the "perf trace gate" family E owns — capture the
    first-paint / deferred-paint trace on `/foundations` proving the above-fold cards paint (not blank) once
    the boot thread is freed. This is PERF's above-fold contribution.
  - **filter-duplication arm (optional per `OPEN-P9`):** assert the animated-dot page does not mount N>1
    identical `feTurbulence` filter defs (born-RED: 13 on `/foundations/colors`).

### §Acceptance — born-RED (static) + PENDING-R3

- **above-fold static arm — CEDED to `BAND-STORY` W5 (G-PRV-3):** the static source gate that asserts the
  above-fold exemption on `SectionPreviewCard.vue:63` lands on the wave that rewrites the file, not here.
  PERF's above-fold proof is the live-trace deferred-paint gate (PENDING-R3, below).
- **filter-duplication arm RED at HEAD:** 13 per-instance `feTurbulence` filter hosts on `/foundations/colors`
  (verified). GREEN when a shared def lands (if `OPEN-P9` keeps this arm).
- **intrinsic-size truth (PENDING-R3):** the measured `SectionPreviewCard` height vs the 19rem placeholder — a
  layout-shift check on `/foundations`, captured per §Band R3 recipe. NOT born-RED (needs the measurement).

### §π/DELTA + live-trace (PENDING-R3)

The above-fold exemption's first-paint screenshot π (F02 "blank white cards") rides `BAND-STORY` W5 with the
EDIT. PERF W3's live-trace obligation is the **deferred-paint trace** on `/foundations` (the first row paints,
not blank, once Wave 1 frees the boot thread) plus the **CLS/layout-shift trace delta** for the intrinsic-size
truth (§Band R3 recipe). No intended change to the below-fold deferral (it is correct browser behavior once
the boot thread is freed by Wave 1).

### §KISS / parsimony

The above-fold exemption is one conditional class binding; the intrinsic-size fix is one number retuned to
truth; the shared filter def is optional and gated behind its own KISS ruling. No IntersectionObserver is
added — the native `content-visibility` is kept, only its above-fold sharp edge is filed off. Gestalt: the real
cure is Wave 1; this wave removes the two structural flashes Wave 1 alone leaves.

### §Non-goals

- NOT replacing `content-visibility` with a JS IntersectionObserver reveal system (that would ADD boot cost —
  the native primitive is correct once the thread is free).
- NOT the preview-card redesign (masonry + LIVE miniatures) NOR the above-fold `content-visibility` EXEMPTION
  EDIT + its static source gate — both are `BAND-STORY` W5's (`BJ.W-PREVIEW-CARD`), which rewrites the file
  (FINDING-2). PERF W3 owns only the boot-diet cure (Wave 1), the live-trace deferred-paint gate, and the
  intrinsic-size number handed to W5.
- NOT the WatercolorDot once-and-cache raster path — only the def duplication.

---

## Wave 4 — `BJ.W-ROUTE-PENDING` — a liquid-weight pending affordance for cold navigations

### §Mandate

Discharges `perf:blocking-nav-no-feedback` (`REGISTRY.md:115-116`; round-1 finding 5) and owns the perf half of
**F06** ("transitions between the dock pages are broken, slow, and flash the screen",
`FEEDBACK-LEDGER.md:18`). The mechanism: `router.beforeResolve` awaits the target route's lazy chunk before the
navigation commits, and the shell's atomic keyed `<component>` swap renders no skeleton/aria-busy — so a cold
route click leaves the old page frozen with zero loading feedback until the chunk downloads+parses, which reads
as unresponsiveness (and, combined with the full unmount/remount + shell-field re-upload, as the "flash").

### §Design — the blocking-nav fact (verified) and the liquid-weight affordance

**The blocking-nav fact (verified at HEAD):**
- `demo/router.ts:122-130` `router.beforeResolve(async (to) => { ... await Promise.all(comps.map((c) =>
  c().catch(() => undefined))); return true; })` — the navigation does not commit until every matched lazy
  chunk resolves.
- `demo/shell/AppShell.vue:201-203` `<RouterView v-slot="{ Component }"> <component :is="Component"
  :key="route.path" /> </RouterView>` — the `:key="route.path"` forces a full unmount+remount (atomic swap),
  no `<Suspense>`, no fallback.
- The code comments state the defect in the first person: `AppShell.vue:59` "has no skeleton `aria-busy`, so
  the live region is the only route-change signal" and `:192` "atomic keyed swap has no skeleton `aria-busy`".
  `grep -n 'Suspense\|aria-busy\|skeleton' demo/shell/AppShell.vue` = only these comment lines + the live
  region; **no pending UI** (verified). `main.ts:73` `router.isReady().then(() => app.mount("#app"))` shows the
  same blocking pattern at boot.

**The affordance (liquid-weight, per MEMORY `liquid_weight_universal` + `breath_of_life`):**
- Add a lightweight **route-pending affordance** that shows *motion* during the `beforeResolve` await instead
  of a frozen frame: a top progress bar (nprogress-idiom) and/or a Suspense/keyed fallback that carries the
  liquid-glass inertia the edict mandates — the transition itself must have weight/bounce, not a hard cut. The
  chunk-load latency is unchanged; the *feedback* is the fix.
- `OPEN-P10` (the design fork, coordinate with Family D transition-choreography + Family G dock greenfield):
  (a) a **route-progress bar** (cheapest, universal, reads on every cold nav) vs (b) a **`<Suspense>` fallback
  with an origin-anchored goo-morph** (the iOS-27 `goo-morph nav` law, `IOS27-CODEX` — richer, on-brand, but
  heavier and couples to the swap architecture) vs (c) both. Draft leans a progress bar as the always-on floor
  PLUS the goo-morph as the between-page transition (owned jointly with Family D so it is not double-built).
  The "flash" half of F06 is partly the atomic unmount/remount + per-nav shell-field re-upload — narrowing
  when the shell field re-uploads (Wave 2 `OPEN-P6`) reduces the flash independent of the pending UI.
- **Liquid-weight applies to the transition, not just the spinner** (`liquid_weight_universal`): the
  pager/page swap must carry inertia; a hard `:key` cut is the anti-pattern the edict names. This wave's
  affordance and Family D's choreography are the same motion — flag the seam so it lands once.

### §Work (EXECUTION-wave obligations)

- `demo/router.ts` / `demo/shell/AppShell.vue` — the pending affordance (progress bar and/or Suspense
  fallback + weighted transition, per `OPEN-P10`), wired to the `beforeResolve` pending window.
- `tests/gates/route-pending.test.ts` (this band authors the detector, born-RED, source-level): assert the
  shell renders a pending affordance during navigation — i.e. a `Suspense` fallback OR an `aria-busy`/progress
  element bound to a router-pending state exists in the swap path. Born-RED: none today.

### §Acceptance — born-RED (static) + PENDING-R3

- **Static born-RED at HEAD:** no route-pending affordance in the swap — `grep 'Suspense\|aria-busy\|
  nprogress\|route.*pending' demo/shell/AppShell.vue demo/router.ts` finds only the two comment lines
  documenting its ABSENCE (`AppShell.vue:59,192`) and the live region; the `RouterView` at `:201-203` has a
  bare keyed `<component>`. GREEN when the affordance is wired.
- **Live-trace RED baseline (PENDING-R3):** capture a cold navigation to `/dock/rail` (F06's named route) — a
  Chrome-DevTools trace of the click→commit interval showing the frozen old frame + the swap flash, plus the
  transition duration for the heavier chunks (Blob 94KB / StoryHero 63KB / aurora 59KB routes). This is the RED
  baseline that proves F06's "slow, flash" symptom; do NOT assert a duration/flash RED without the trace.

### §π/DELTA + liquid-weight

**This wave's proof IS a motion DELTA.** Capture the cold `/dock/rail` navigation before (frozen frame → hard
swap) and after (pending motion → weighted transition) as a paired trace + screenshot sequence, per MEMORY
`live_verify_capture`. The transition must demonstrably carry inertia/weight (`liquid_weight_universal`), not a
hard cut — the DELTA artefact is the evidence, verified live, not a commit-message claim.

### §KISS / parsimony

A progress bar is a handful of lines on the router's pending state; the Suspense fallback reuses the existing
swap. No new state machine — the `beforeResolve` await window already exists; this wave only renders it. The
weighted transition is shared with Family D (built once). No masking fallback: the affordance shows real
pending state, it does not fake progress the router isn't making.

### §Non-goals

- NOT eliminating the `beforeResolve` chunk await (it is correct — it prevents an empty `<RouterView>` flash;
  the fix is feedback DURING it, not removing it — see the `main.ts:73` boot comment rationale).
- NOT the dock greenfield (Family G, F47/F27 occlusion + interior scroll) — this wave owns the transition
  FEEDBACK; the dock's own re-architecture is Family G.
- NOT the goo-morph nav choreography as a standalone build here — coordinate with Family D so the weighted
  transition lands once (flag the seam, do not double-build).

---

## §Band-level obligations & OPEN roll-up

**Coordination handoffs (authored as detectors/specs here → discharged by EXECUTION + sibling waves):**
- W1 boot-diet leaf import (`OPEN-P2`) → the aurora barrel subpath map may need a `constants/presets` or
  `config` leaf export (Family H colocation / the aurora barrel owner).
- W2 shell-field narrowing (`OPEN-P6`) → the `suppressesShellField` route-meta set overlaps Family D
  transition-choreography + Family G substrate.
- W3 above-fold exemption EDIT + static gate + first-paint π → CEDED to `BAND-STORY` W5 (`BJ.W-PREVIEW-CARD`,
  which rewrites the file, FINDING-2); PERF keeps the boot-diet cure (W1), the live-trace deferred-paint gate,
  and the intrinsic-size number handed to W5.
- W4 weighted transition / goo-morph nav → Family D transition-choreography + Family G dock greenfield
  (built once, not double-built).

**The live-trace obligations are Round-3, not now.** Every LCP / long-task / rAF / transition-flash / CLS
metric in this band is written **PENDING-R3** with the recipe below. No metric is claimed RED without a
captured trace on disk (MEMORY `live_verify_capture`; the cardinal-lesson inflation the recap lens warns of).

### §Band R3 recipe — the RED-baseline capture (Chrome-DevTools MCP, one browser seat)

Serialize on the single browser seat (MEMORY `browser_seat_singleton`). Build + serve the demo, then per
target route:

1. `npm run build` the demo → serve `dist-demo/` on a local port (throttle to a mid-tier profile: 4× CPU
   slowdown + Fast-3G to surface the boot-thread saturation the census predicts).
2. `performance_start_trace(reload=true, autoStop=true)` → navigate to the cold target (`/`, `/foundations`,
   `/forms`, `/dock/rail`) → `performance_stop_trace`.
3. Read the RED baseline: `performance_analyze_insight` for **LCP** (W1: `/`, `/foundations`) and the
   **long-tasks / total-blocking-time** during boot; inspect the **frame/rAF track** for a sustained composite
   with no input (W2: `/forms`, `/data`); measure `SectionPreviewCard` `getBoundingClientRect().height` via
   `evaluate_script` for the **intrinsic-size truth** (W3, `/foundations`); trace the **click→commit interval +
   swap flash + duration** on the cold `/dock/rail` nav (W4).
4. Bank each as a captured DELTA artefact (trace JSON + screenshot) under the wave's evidence root — the
   before (HEAD) baseline now, the after once the fix lands. The trace IS the proof; the commit message is not.

**OPEN markers for the Fable two-challenge pass:**
- `OPEN-P0` — **RULED (ruling 9):** build `dist-demo/` in the test job (a demo-build step); do NOT read a
  committed build-manifest snapshot (it goes stale silently and greens over a regressed build). [band-wide]
- `OPEN-P1` — async Aurora placeholder: confirm the CSS-gradient wash placeholder is not itself in the async
  chunk (else the field flashes empty on first paint). [W1]
- `OPEN-P2` — the `shellAuroraConfig` leaf import target: existing `aurora/constants/presets` subpath vs a new
  `aurora/config` leaf export. [W1]
- `OPEN-P3` — defer the docks or keep them eager (draft: keep — small bytes, async nav chrome flashes). [W1]
- `OPEN-P4` — the modulepreload-count + eager-KB ceilings (draft: ≤45 / ≤450KB, reds at HEAD 73/770). [W1]
- `OPEN-P5` — shell-field governance form: occlusion/idle pause (faithful) vs static wash on dense categories
  (cheap, a design downgrade). [W2, substantive]
- `OPEN-P6` — narrow `shellFieldActive` at the router so the field is a hero-band affordance not a global
  backdrop (overlaps Family D/G). [W2]
- `OPEN-P7` — the shell-field detector's exact assertion shape (depends on P5). [W2]
- `OPEN-P8` — the above-fold exemption count N (first grid row; responsive by breakpoint cols). [W3]
- `OPEN-P9` — the shared feTurbulence filter def: kept-minor (one hoisted def) vs dropped (the once-and-cache
  raster makes it low-value, and a shared id breaks the component's zero-plumbing property). [W3, KISS ruling]
- `OPEN-P10` — route-pending form: progress bar (floor) vs `<Suspense>` goo-morph (on-brand, Family D seam) vs
  both. [W4]

**In-scope born-RED-at-HEAD count:** 4 static detectors reddable NOW (boot-graph async+ceiling, shell-field
governance-absent, above-fold-cv-exemption + filter-duplication, route-pending-absent), each with a verified
probe and a self-test bite. 5 live-trace metrics deferred to the Round-3 browser lens with the exact capture
recipe above — the honest split the census's "live-trace confirmation owed" verdict demands.
