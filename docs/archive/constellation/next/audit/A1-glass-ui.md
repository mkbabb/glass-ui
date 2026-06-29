# A1 — glass-ui slice (constellation `next` audit)

The glass-ui audit for the post-AQ constellation pass. Covers: (1) AQ as-built vs plan; (2) the
last ~10 tranches' trajectory + the AR ownership question; (3) modern-web leverage gaps AQ did
NOT take; (4) the diagnosed live GlassDock view-transition-name bug; (5) the deferred ledger
(standalone-DockIconButton floor, GlassNativeSelect, the AS-GU design bundle, CI #177); and a
sketch of tranche **AR**.

Read-only audit. No `src/` edits, no git mutations. Writes only this file.

---

## 1. AQ as-built vs AQ plan

AQ ("the platform-native substrate") was a 9-wave tranche (W0 audit + W1 design + W2–W8 impl). It
swapped glass-ui's hand-rolled JS substrate for browser primitives, each token-first, each
Newly/Limited feature feature-detected with the current path kept as the documented fallback. It
folded into the published `3.0.0` (GATE 1) + `3.1.0` (GATE 2). HEAD is `83806b3`, version `3.1.0`.

### What landed cleanly (the value)

- **W2 color substrate — the headline correctness win.** `color-scheme: light dark` on `:root` +
  `dark` in `.dark`; the 142-line `.dark` mirror collapsed via `light-dark()` (kept unregistered
  per the resolve-late inheritance gotcha, which the W1.1 design correctly proved only bites
  registered `<color>` properties — glass-ui's 3 `@property`s are non-color); alpha derivatives on
  `color-mix(in srgb, …)`; `accent-color: var(--primary)`; forced-colors `:focus-visible`. The
  `color-mix` migration is the canonical fix for the **64 bug-class consumer `hsl(var(--token))`
  sites** (12 `/α` malformed + ~52 double-wraps that expand to `hsl(hsl(...))` and never paint).
  This is a real, measured, cross-repo correctness fix — the strongest single deliverable in AQ.
- **W3 selectors/transforms** — `:has()` parent-state (scoped, never `body`); individual-transform
  longhands (`scale:`/`translate:`) + a `scale:1; translate:0` identity base closing the
  stacking-context hazard; `text-wrap: balance`/`pretty`; tokenized scrollbars; plus the absorbed
  gaps `.deferred-section` (content-visibility), `useYieldToMain` (`scheduler.yield`), and the
  `(pointer: coarse)` 44px dock floor.
- **W4 form vocabulary** — `:user-invalid`/`:user-valid` rungs + the `useUserInvalidAria`
  `aria-invalid` blur-bridge (with `@supports not` fallback); attr-passthrough; `field-sizing:
  content` autosize; `required` asterisk + error slot; Sheet a11y fix.
- **W5/W6 motion→platform** — scroll-driven CSS (`@supports`-gated, composables demoted to the
  sole-writer fallback); `@starting-style` + `transition-behavior: allow-discrete` + `overlay`
  top-layer grammar; `useViewTransition` substrate; anchor-positioned tab underline (JS offset-FLIP
  + per-strip ResizeObserver retired, `border-bottom` fallback); the dock VT swap; `moveBeforeSafe`.
- **W7 bundle guardrail** — heavy-leaf carve + barrel-vs-subpath delta; `+/number-field` +
  `+/switch` flat subpaths; value.js-laziness via the keyframes.js `^2.2.0` dynamic re-export.

The cross-repo fan-out **legitimately cleared the ≥2-consumer bar** for every public AQ primitive
(`useViewTransition`, `useUserInvalidAria`, `.deferred-section`, `useYieldToMain`, the 2 subpaths)
via real adoption across muster + fourier + speedtest — not demo-only. The overfitting audit came
back clean; no demo-gated primitive leaked to a public barrel.

### What's thin

- **The W7 container-style-query density was PLANNED but NOT shipped.** The W0 audit row and the
  W1.3 design both name `@container style(--density: …)` as a progressive enhancement over the
  kept `[data-density]` attribute selectors, with `clamp(min, Ncqi, max)` for component-internal
  type. The FINAL silently drops it — density stays 100% on attribute selectors (grep: **0**
  `@container style()` in `src/styles/`; the only `container-type` is `instrument-rail.css`, a
  *size* query). The W7 close folded its energy into the subpath-completeness deliverable instead.
  This is the single clearest AQ under-delivery and the seed of an AR wave (see §3).
- **The native-`<select>` (`GlassNativeSelect`) was correctly NOT built** — muster didn't adopt the
  customizable-`<select>` path, so per the substrate-without-consumer bar it stays unbuilt. This is
  correct discipline, but it leaves `appearance: base-select` / `::picker(select)` entirely
  un-piloted in glass-ui (not even a demo-gated `GlassDialogNative` analogue). The demo-gated
  pilots that DID land — `GlassDialogNative`, `HoverPopover :native` (`interestfor`) — set the
  precedent that a Limited feature CAN ship as a demo-gated pilot; the select did not even get that.
- **Scroll-driven / View-Transitions stayed SAME-document only.** `useViewTransition` wraps
  `document.startViewTransition` for in-page DOM swaps; no `@view-transition { navigation: auto }`
  cross-document substrate, no Speculation-Rules coupling. Demo `content-visibility` is a utility
  (`.deferred-section`), not wired into the demo storybook's heavy stories.

### What's overfit

Nothing flagrant — the overfitting audit was clean and honestly run. The one borderline call:
`supportsCssTimeline` and `supportsMoveBefore` are internal `@supports`/feature-detect guards kept
on `/utils`; they clear the bar as exported-and-consumed (≥2 src sites each), but they are the kind
of single-purpose detection helper that, if they proliferate (one per platform feature), would
warrant a single `src/utils/platformSupport.ts` registry rather than a helper per feature. Worth a
consolidation note for AR, not a violation today.

---

## 2. Trajectory (last ~10 tranches) + what AR should own

| Tranche | Theme | Standing contribution |
|---|---|---|
| **J** | v1.0 substrate invariants | visual-load-bearing-ness binary; ≥2-consumer gate (inv 10) |
| **K** | bundle/subpath discipline | per-subpath split; `profile:budget`; `W4-subpath-sizes.md` |
| **L** | vueuse-FREE root barrel | SCC-trap closure; 41 flat subpaths; `/api` discovery layer; inv 8 |
| **M–Q** | API surface + a11y maturation | `/api` canon; typed dock context (O.W2); axe lineage (F→AN) |
| **V** | demo chassis (post-hoc) | `<StorySection>`/`<ShowcaseFrame>`/`useStoryDemo` demo-private |
| **AM** | (a11y/forms) | axe redress arm |
| **AN** | native graduation | Drawer `mode="live-behind"`; StatusDot/SortableHandle/NumberField role contracts |
| **AO** | internal-first consolidation | absorbed speedtest-AQ R0G consumer requests |
| **AP** | post-AO repair + false-witness | R0G-6 floor; R0G-7 `/motion-core`; refuted the cascade-dedup premise by measurement |
| **AQ** | platform-native substrate | color-mix bug fix; `:has()`; scroll-driven; VT; anchor underline; the modern-web headline |

**The arc:** v1.0 closure (J–L) → surface/a11y maturation (M–AN) → consumer consolidation (AO–AP)
→ platform-native substrate (AQ). Two motifs recur and bind AR:

1. **The binding-verification class** (MEMORY: `feedback_glass_ui_binding_verification`). Stale
   reka-ui bindings, the keyframes `Animation` static-import break (constellation close §4), and
   **the GlassDock VT-name collision diagnosed below** all share one signature: vue-tsc + units
   pass, runtime/e2e breaks. AQ shipped a swath of new platform-binding surface (VT names, anchor
   names, `view-transition-class`) with NO uniqueness/collision gate. This is the AR headline.
2. **Substrate-without-consumer is binary** (inv 8/10). AP refuted a premise by measurement and
   honestly declined; the discipline holds. AR must hold the same bar against the AS-GU design
   bundle (§5) — gate every design-request artefact at ≥2 consumers or demo-or-not-shipped.

**What AR (n+1) should own:** the binding-verification gate elevated to the substrate (a
VT-name/anchor-name uniqueness proof), the diagnosed GlassDock bug fix + republish, the
modern-web *leverage* AQ left on the table (container style queries, scroll-state queries,
cross-document VT, `@scope`, custom-state), and a **gated** evaluation of the AS-GU design wave.

---

## 3. Modern-web leverage gaps (against `/tmp/modern-web-guidance-src/guides`)

AQ took the *correctness* and *LOC-cut* levers. It left the following *elegance/architecture*
levers on the table — each is a documented guide with a real glass-ui site.

### G1 — Container STYLE queries (`@container style()`) — the AQ no-show

- **Guides:** `design-token-reactivity`, `usage-aware-component-variations`. `container-style-queries`.
- **Gap:** density is 100% `[data-density="compact|comfortable|spacious|audacious"]` attribute
  selectors across `dock.css` (and the buttonVariants/control sizing they cascade). The guide's
  whole point: a higher-order token like density should be a *queryable custom property*
  (`@container style(--density: compact)`), not a selector convention — so a descendant reacts to
  an ancestor's `--density` value set anywhere up the tree, no markup contract. AQ.W1.3 designed
  this exact move (`:where()` flat specificity layered over the kept attribute fallback) and W7
  dropped it. **Baseline:** container style queries are Newly→Limited — so this is progressive-
  enhancement-over-the-kept-attribute-path, exactly the policy. **Site:** `dock.css:84-158`.

### G2 — Scroll-state container queries (`@container scroll-state(snapped)`) — carousel re-expression

- **Guides:** `carousel-snap-highlights`, `scroll-snap-state-sync`, `scroll-snap-realtime-feedback`
  (`container-scroll-state-queries`, `scroll-snap-events`).
- **Gap:** `GlassCarousel` + the `ui/carousel` family run on **embla** (a JS scroll-snap engine +
  IntersectionObserver) for snap detection + active-slide highlight. The platform now ships
  `scroll-snap-type` + the `scrollsnapchange`/`scrollsnapchanging` events + `@container
  scroll-state(snapped)` to highlight the active slide and sync a pager **with zero JS observers**.
  This is a candidate to re-express the carousel's *highlight + pager-sync* layer natively (embla
  stays the drag-physics fallback) — a real LOC + main-thread win. **Sites:** `useCarousel.ts`,
  `GlassCarousel.vue`, `GlassCarouselPager.vue`.

### G3 — Cross-document View Transitions + Speculation Rules

- **Guides:** `cross-document-transitions`, `consistent-cross-document-transitions`,
  `faster-spa-view-transitions`, `improve-next-page-load-performance`.
- **Gap:** `useViewTransition` is same-document only. The platform supports `@view-transition {
  navigation: auto }` for MPA route morphs, paired with `<link rel="expect" blocking="render">` to
  stabilize the destination before the morph, and Speculation Rules (`<script
  type="speculationrules">`) to prefetch/prerender. The AS-GU bundle's "View-Transitions route
  re-founding" (speedtest §8 verdict) and fourier's route-morph arm both want a **cross-document VT
  recipe substrate** glass-ui could own (a `view-transition.css` `@view-transition` opt-in block +
  a documented `rel=expect` pattern). ≥2-consumer (fourier route-morph + speedtest verdict) — clears
  the gate. **Baseline:** same-origin cross-document VT is Newly (Chromium); needs the reduced-motion
  carve the guide mandates.

### G4 — `scheduler.postTask` priority depth (beyond `scheduler.yield`)

- **Guides:** `schedule-tasks-by-priority`, `break-up-long-tasks`, `sequence-distributed-events`,
  `efficient-background-processing`.
- **Gap:** `useYieldToMain` wraps `scheduler.yield()` only — a binary yield. The guides describe a
  *priority* model (`scheduler.postTask({priority: 'user-blocking'|'user-visible'|'background'})`
  + `TaskController` for re-prioritization/abort) that glass-ui's re-rank/stagger/aurora-build
  consumers (muster re-rank, speedtest maplibre/hex-build) actually want — yield is the floor,
  postTask is the ceiling. A `usePrioritizedTask`/`postTaskSafe` sibling on `/motion-core` would be
  the natural extension. **Baseline:** `scheduler.postTask` is Newly (broad). Gate on the existing
  ≥2 yield consumers re-typing against the priority surface.

### G5 — CSS `@scope` + `:state()`/custom-state — the `:deep()`/data-attr retirement

- **Guides:** `child-state-based-styling`, `style-parent-with-has` (`:has`/`:not`), the custom-state
  pattern in `usage-aware-component-variations`.
- **Gap:** glass-ui uses **zero `@scope`** and **zero `:state()`/`ElementInternals.states`**.
  Component scoping is Vue `<style scoped>` + `:deep()`; component runtime state is encoded as data
  attributes (`data-state`, `data-held`, `data-density`, `data-vaul-*`). `@scope` (donut scoping)
  is the idiomatic way to bound the `:has()` parent-state rules AQ added (so a `Card:has(:focus-
  within)` cannot leak past a nested card boundary), and custom-state (`:state(held)`) is the
  standards-track replacement for the `data-held` reflection. **Baseline:** `@scope` is Newly;
  custom-state is Newly. Both progressive over the kept data-attr/`:deep()` path. Lower priority —
  these are *hygiene* re-expressions, not new capability; gate carefully against the overfitting bar.

### G6 — CSS `@function` (registered-property era DRY)

- **Guide:** `reduce-style-repetition` (`function`). **Gap:** glass-ui has rich gradient/glass-tier
  recipes hand-repeated across `glass.css`/`cards.css`/`disco-glyph.css`. `@function --glass-tier(...)
  returns <image>` would DRY the 5-rung ladder. **Baseline:** CSS `@function` is Limited (Chromium-
  only). Progressive-only, low priority, but a clean candidate once Baseline lifts. **Caveat:** AP
  proved gzipped CSS is compression-saturated — `@function` is an *authoring* DRY win, NOT a payload
  win; frame it that way or it repeats AP's refuted-premise trap.

### G7 — Customizable `<select>` graduation (the named-forward)

- **Guides:** `branded-select-styling`, `animated-select-picker`, `custom-select-picker-layouts`.
- **Gap:** `appearance: base-select` + `::picker(select)` + `<selectedcontent>` + `option::checkmark`
  let a branded select keep native focus/keyboard/top-layer/form-integration that the 10-file reka-ui
  rebuild hand-rolls. AQ gated `GlassNativeSelect` on a consumer and correctly didn't ship it. AR
  should at minimum land it **demo-gated** (the `GlassDialogNative` precedent) so the recipe exists
  and graduates to default when customizable-`<select>` reaches Baseline Widely. **Baseline:** Limited
  (Chromium 130+). Progressive/demo-gated only.

### G8 — `interestfor` graduation + `interest-triggered-action-previews`

- **Guides:** `interest-triggered-tooltips`, `interest-triggered-action-previews`. **Gap:** AQ landed
  the `HoverPopover :native` `interestfor` opt-in demo-gated. The *action-previews* variant
  (`interest`/`loseinterest` events previewing a button's effect before commit) is un-piloted and is
  a natural fit for the Configurator/dock's destructive actions. **Baseline:** Limited (experimental).
  Demo-gated only; watch for graduation.

**Component re-expression map (which families benefit most):**
`carousel` → G2 (scroll-state queries). `dock`/dock-density → G1 (style queries) + G5 (custom-state
for `data-held`). `configurator` → G8 (action previews) + G1. `aurora` → AS-GU `deriveAurora`/OKLab
(§5), `prefers-reduced-transparency`. `command`/`data-table` → cross-document VT (G3) for
drill-in/route morphs. `select`/combobox → G7.

---

## 4. KNOWN LIVE BUG — GlassDock view-transition-name collision (diagnosed; AR-owned)

**Confirmed at HEAD.** `src/components/custom/dock/GlassDock.vue`:

- Line **9**: `let dockInstanceId = 0;` — a **module-level** counter.
- Line **112**: `const dockId = \`glass-dock-${++dockInstanceId}\`;` — pre-incremented per instance.
- Line **183**: `"view-transition-name": dockId.replace(/[^a-zA-Z0-9_-]/g, "-")` — minted from `dockId`
  on a VT-supporting engine (AQ.W6 §Design 7 dock VT swap).
- Line **173 comment** falsely asserts the name is "page-unique via `dockId`."

**The defect:** a module-level `let` counter restarts at `1` per **module-graph copy**. A `GlassDock`
reached via a **lazy chunk** gets its own copy of the counter → mints `glass-dock-1` again → collides
with the eagerly-loaded dock's `glass-dock-1`. Two live elements with the same `view-transition-name`
is illegal: the browser **rejects the transition and logs a console error**. This is the
**binding-verification class** — `vue-tsc --noEmit` passes, `vitest` (542/542) passes, because there
is **no test covering VT-name minting** (grep-confirmed: 0 hits for `view-transition-name`/`dockId`/
`glass-dock-` in any `__tests__/`). Only fourier's "no console errors" e2e catches it.

**The fix is already idiomatic and present in the same directory.** `DockLayerGroup.vue` (line 69)
uses Vue's **`useId()`** — app-scoped, collision-free across module-graph copies — for its
`gl-dock-stack-${vtId}` name. The fix is to delete the `dockInstanceId` counter (lines 9 + 112) and
mint `dockId` from `useId()`, exactly mirroring DockLayerGroup. `useId()` is already the established
pattern in **5** custom components (disco-glyph, hover-popover, labeled-field, configurator,
DockLayerGroup). No new dependency, no new concept.

**Why a working regression test is non-trivial (and load-bearing):** happy-dom does not implement
`document.startViewTransition`, and unit tests mount components in isolation — neither reproduces the
*module-graph-copy* collision. A *working* gate needs one of:
1. a **unit test** that mounts ≥2 `GlassDock` instances in one tree (stubbing `startViewTransition` as
   present) and asserts the minted `view-transition-name`s are **pairwise distinct** — this catches a
   counter-reset *within* a graph copy but NOT the cross-chunk case;
2. the real catcher: an **e2e/console-error gate** (the fourier-class) OR a **build-time substrate
   proof** — a `proof:vt-names` script that greps `src/` for `view-transition-name` mints and asserts
   each derives from `useId()` (or a documented app-unique source), never a module-level counter. This
   is the gate that **belongs in the substrate**: it makes the entire binding-verification class
   *structurally* impossible for VT names, the way `proof:resolution`/`proof:theme` do for their
   classes. AR should ship BOTH the unit assertion (cheap, fast) and the static proof (the real gate).

**AR deliverable:** fix GlassDock via `useId()`; add the unit pairwise-distinct assertion + a
`proof:vt-names` static gate to CI; correct the stale line-173 comment; **republish `3.1.1`** (patch —
a pure bug fix, fallback-preserving); re-bump consumers; verify fourier CI greens. The general lesson:
**a VT-name (and anchor-name) uniqueness gate belongs in the substrate** — AQ minted a class of
binding surface (`view-transition-name`, `anchor-name`) with no collision guard.

---

## 5. Deferred + chronically-deferred ledger

| Item | Origin | State | Disposition for AR |
|---|---|---|---|
| **Standalone Settings-gear `DockIconButton` coarse floor** | AQ.W8 / AP.W3 R0G-6 / constellation §6 | Open. The `(pointer: coarse)` 44px floor is scoped `.glass-dock[data-density]` (`dock.css:1080`); a `DockIconButton` rendered OUTSIDE a dock gets no floor + no `data-size=icon`. Measured 40×40 on the real edge (speedtest). | **Now ≥2-consumerable** (speedtest standalone + likely a 2nd as docks proliferate). Fold into AR: lift the floor to `DockIconButton`/`Button size="icon"` itself, dock context as an *additive* density, not the *gating* selector. Small, clean. |
| **`GlassNativeSelect`** (customizable-`<select>`) | AQ.W4 design | NOT BUILT — muster didn't adopt; correct per substrate bar. | AR: land **demo-gated** (G7) so the `appearance: base-select`/`::picker(select)` recipe exists + graduates. Do NOT public-surface until ≥2 real consumers. |
| **AS-GU consumer-request design bundle** | speedtest AS §3 / constellation CLOSE §6 | Deferred to "a future glass-ui design wave." 6 clusters (below). | AR owns the **evaluation** wave: each cluster ≥2-consumer-gated or demo-or-not-shipped. |
| **npm-publish CI breakage (#177)** | constellation CLOSE §1 note / §6 | `release.yml` pins `node-version: 20` against `engines: >=22`; `npm ci` (registry) can't replicate the symlinked `@mkbabb` monorepo dev setup → tag-triggered release CI fails; all `2.2.0`/`3.0.0`/`3.1.0` publishes were done **locally**. | AR (or a hygiene wave): bump CI node 20→22; resolve the registry-vs-symlink divergence (publish step should `npm ci` against the registry, not the local symlink — the monorepo symlink is a *dev* concern, not a *publish* concern). Republish path for `3.1.1` depends on this. |
| Demo-gated pilots (`GlassDialogNative`, `HoverPopover :native`) | AQ.W6 | Demo-gated; graduate at Baseline Widely. | Named-forward; watch. |
| inline-edit primitive / dock panel-host / LabeledSlider readout / shadcn parity | AP watched-conditions ledger | Sub-2-consumer or divergent. | Carry the watched conditions; promote only on a converging 2nd consumer. |

### The AS-GU bundle (speedtest AS §3 — the 6 clusters)

From `speedtest/docs/tranches/AS/AS.md` §3 + constellation CLOSE §6. Each is glass-ui-substrate but a
*design/feature* request (not strictly modern-web). The ≥2-consumer gate is the discipline:

1. **`deriveAurora(palette, intent)` + OKLab-LUT aurora** (AS-6) — generalize Aurora so "pastel +
   whispy + organic" is *derivable* from a palette + intent (pastelness/whispiness/oiliness/flow/
   presence → ~35 knobs), via an OKLab palette-LUT interp + simplex noise + blue-noise dither +
   ridged-warp filaments + `prefers-reduced-transparency` honor. Carries value.js sub-edges (VAL-1
   OKLab-LUT bake, VAL-6 `findCusp` memoize). **Highest leverage; the user's literal "fully
   generalized" mandate.** Consumers: speedtest (P0) + ≥1 (the demo aurora chrome). Gate: 2 ✓ if the
   demo counts as a real consumer of the *derived* path (it does — it's the canonical demo).
2. **`--spring-crisp` token** (AS-7) — `springLinearStops({response:0.30, damping:≈0.80})` for ~1.5%
   overshoot (NOT 0.92 = dead-flat — the AS §8-H5 correction). Also fixes glass-ui's stale
   `tokens.css:124-127` comment (`--spring-snappy` is ζ=0.65 not 0.85). Pairs with KF-3 (springs
   compile to CSS `linear()` — the compositor path, zero main-thread frames). **Token ships now;
   cheap; ≥2** (pane-slide + ≥4 easter-eggs).
3. **whisper-heading typography rung** — a quieter heading tier below the current ladder.
4. **GlassDock dark `--glass-opacity-dock` rung** (AS-5) + **`always-expanded` overflow-clip scoping**
   (AS-4) — dock dark-mode legibility + an overflow bug. The overflow scoping is a correctness fix
   (ships regardless of the ≥2 gate, like AP's DockLayerGroup fix).
5. **AnimatedDigit / MetricBadge / ContinuousTimeline polish** — surgical.
6. **`<CompletionSeal>` / `<GoldHeadline>` / `<CheckDraw>`** (AS-12) + celebration-easing promotion —
   a completion-choreography primitive family. **Speculative until ≥2** — likely demo-or-not-shipped
   for most; the `.gold-shimmer`/`gold-shimmer-slide` keyframe substrate already exists, so the *token/
   keyframe* layer can ship while the *component* stays demo-gated.

**The strongest cross-cut:** the AS §8 verdict found `document.startViewTransition` + directional
`types` + `:active-view-transition-type()` is the *correct* replacement for speedtest's CLS-spiking
`mode="out-in"` pane choreography — i.e. the AS-GU motion work is **the same `useViewTransition`
substrate AQ already shipped**, extended with VT *types* and directional `types`. AR should extend
`useViewTransition`/`view-transition.css` with the **types/directional** vocabulary (a small additive
surface) rather than treat AS-GU motion as net-new — it folds into G3.

---

## 6. n+1 tranche sketch — AR

### Binding question

> Can glass-ui (a) close the binding-verification class for platform-binding surface — a
> **`view-transition-name`/`anchor-name` uniqueness gate** in the substrate, fixing the diagnosed
> GlassDock `useId()` collision with a working regression test and a `3.1.1` republish that greens
> fourier CI; (b) take the modern-web *leverage* AQ left on the table — **container style queries**
> for density, **scroll-state container queries** for the carousel, **cross-document View Transitions
> + types** for route morphs, and **`scheduler.postTask` priority** — each token-first, each
> Newly/Limited progressive over the kept path; and (c) evaluate the **AS-GU design bundle**
> (`deriveAurora`/OKLab aurora, `--spring-crisp`, whisper-heading, dock dark-rung, CompletionSeal) at
> the **≥2-consumer-or-demo-or-not-shipped** bar — all gates green, no public-surface leak?

### Wave outline

| Wave | Disposition | Contents | Gate |
|---|---|---|---|
| **AR.W0** | DEV — audit | Re-run the 6-lane modern-web baseline against HEAD (post-AQ); confirm the leverage gaps G1–G8 still stand; classify each Baseline (Widely/Newly/Limited); name the AS-GU ≥2-consumer roster. | Audit doc; each gap a `file:line` + guide + Baseline + consumer count. |
| **AR.W1** | DEV — design | Design slices: (1.1) the VT/anchor-name uniqueness substrate (`proof:vt-names` shape + the unit assertion); (1.2) container style queries + scroll-state queries (the carousel + density re-expression, `:where()` flat-specificity over the kept fallback); (1.3) cross-document VT + types + `scheduler.postTask`; (1.4) the AS-GU disposition map. **DEV/IMPL boundary here.** | Designs verify; AS-GU roster pinned; couplings to consumers named. |
| **AR.W2** | IMPL — **the bug-fix wave (lands FIRST, ships as `3.1.1`)** | GlassDock `useId()` fix; the unit pairwise-distinct assertion; the `proof:vt-names` static gate added to CI; line-173 comment corrected; **CI #177 repair** (node 20→22, registry-not-symlink publish) so the republish CI can green; re-bump consumers; verify fourier CI. | `proof:vt-names` PASS; unit assertion green; fourier "no console errors" e2e green; `3.1.1` published via fixed CI. |
| **AR.W3** | IMPL — container queries | `@container style(--density: …)` density layered over kept `[data-density]` (`:where()` flat specificity); `@container scroll-state(snapped)` carousel-highlight + pager-sync + `scrollsnapchange` (embla → drag-physics fallback). | VR nested density + active-slide highlight; listener-count drop on carousel; `@supports`/fallback proven; `profile:budget` no regression. |
| **AR.W4** | IMPL — cross-document VT + scheduling | `@view-transition { navigation: auto }` substrate + `view-transition.css` types/directional vocab + `rel=expect` doc pattern (extends `useViewTransition`, folds AS-GU motion); `usePrioritizedTask`/`postTaskSafe` on `/motion-core` (extends `useYieldToMain`). | reduced-motion carve; same-document path unbroken; ≥2 consumers (fourier route-morph + speedtest verdict) for the cross-document recipe; postTask ≥2 (the yield consumers re-type). |
| **AR.W5** | IMPL — AS-GU design wave (≥2-gated) | `--spring-crisp` token (ζ≈0.80) + stale-comment fix + KF-3 `linear()` compile coordination; `deriveAurora`/OKLab-LUT (value.js VAL-1/6 sub-edges); whisper-heading rung; dock dark `--glass-opacity-dock` rung + `always-expanded` overflow fix (correctness, ungated); CompletionSeal token/keyframe layer ships, component **demo-gated** until ≥2. Optional: `GlassNativeSelect` demo-gated (G7); `interestfor` action-previews demo-gated (G8); `@scope`/custom-state hygiene (G5) only if it clears overfitting. | Each artefact ≥2 consumers OR demo OR not-shipped; `proof:theme` byte-clean; overfitting audit clean. |
| **AR.W6** | IMPL — close | Overfitting audit; full gate matrix (`typecheck`/`build`/`test`/`proof:*`/`profile:budget --enforce`); AR.FINAL; the `3.2.0` minor fold (W3–W5 additive) atop the `3.1.1` patch. | All gates green; FINAL authored; consumers re-bump. |

**Sequencing rationale:** W2 (the bug + CI) ships **first and standalone as `3.1.1`** — it's a
correctness patch the constellation is already waiting on (fourier console-error), and it unblocks
the CI #177 path every later republish needs. W3–W5 are additive `3.2.0` leverage + design work. The
binding-verification gate (`proof:vt-names`) is the AR headline and the standing-invariant
contribution: it makes the GlassDock-class collision *structurally impossible*, the way AQ's color
substrate made the `hsl(var())` paint-failure impossible.

**Inherited invariants bind unchanged:** token-first; no-backwards-compat-alias (a platform swap
RETIRES or keeps-as-sole-fallback, never both live); vueuse/keyframes-FREE root barrel; Newly/Limited
→ ≤20-LOC feature-detected fallback, current path default; substrate-without-consumer binary
(the AS-GU bundle is gated, not assumed). bbnf tranche format (`docs/tranches/AR/` + hard gates +
FINAL.md).
