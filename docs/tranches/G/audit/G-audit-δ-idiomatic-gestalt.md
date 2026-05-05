# G — audit δ: idiomatic gestalt + KISS / one-path verification

**Date**: 2026-05-04
**Auditor**: agent G.audit.δ (post-close challenge, read-only)
**Scope**: tranche G additions across `src/components/{ui,custom}/`,
`src/composables/`, `src/styles/`, `src/tokens.ts`, `package.json`.
**Lens**: idiomatic gestalt over byte-aligned recipes; KISS/one-path
verification; legacy/shim hunting; overfitting/duplicate-authority hunting.

The findings below cite exact file paths and lines as the working tree stands;
none of tranche G is committed yet (`git status --porcelain` returns 102
modified/added files, no commits past `b5cb4f5`).

---

## §1  CVA branch idiom audit

Pattern reference (CLAUDE.md, shadcn-vue): each ui/ family ships **one** CVA
exported from `index.ts`, mapped over `variants.{variant,size,...}` on the
existing CVA call. New variants extend the existing variant map; new axes add
`{tone, ...}` siblings to `variants`.

| family / branch                              | shape                      | verdict      | citation                                                                 |
| -------------------------------------------- | -------------------------- | ------------ | ------------------------------------------------------------------------ |
| Button — `cartoon` / `transport` / `rainbow` | extends `variants.variant` | aligned      | `src/components/ui/button/index.ts:36-45`                                |
| Button — `size: icon`                        | extends `variants.size`    | aligned      | `src/components/ui/button/index.ts:52`                                   |
| Tabs — `underline` / `pill`                  | TWO CVAs (List, Trigger)   | divergent    | `src/components/ui/tabs/index.ts:12-50` (consumer must set on both)      |
| SelectTrigger — `cartoon`                    | extends `variants.variant` | aligned      | `src/components/ui/select/index.ts:21-26`                                |
| Input — `cartoon`                            | extends `variants.variant` | aligned      | `src/components/ui/input/index.ts:9-15`                                  |
| NumberField — `cartoon`                      | descendant attr-selector   | divergent    | `src/components/ui/number-field/index.ts:18-19`                          |
| Toast — `inverse`                            | extends `variants.variant` | aligned      | `src/components/ui/toast/index.ts:18-24`                                 |
| Badge — `tone` axis + `variant=color`        | TWO CVAs (var + tone)      | aligned      | `src/components/ui/badge/index.ts:7-50`                                  |
| MetricBadge — `xl` size                      | computed switch + scoped CSS | divergent  | `src/components/custom/metric-badge/MetricBadge.vue:29-90`               |
| ToggleGroupItem — `variant="card"`           | SEPARATE CVA               | divergent    | `src/components/ui/toggle-group/index.ts:12-14`                          |
| Card — `cream` / `paper`                     | extends `variants.variant` | aligned      | `src/components/ui/card/index.ts:18-30`                                  |

### Findings

**§1.1  ToggleGroupItem `card` is a separate CVA (`toggleGroupItemCardVariants`)**.
`src/components/ui/toggle-group/index.ts:12-14` introduces a second top-level
CVA bound only to `variant="card"`; `ToggleGroupItem.vue:9-38` then branches:
`if variant === "card" use cardCVA() else use toggleVariants()`. Every other
component variant landed in tranche G extends the original CVA's variant
record — this is the only divergent shape. Idiomatic fix: collapse `card` into
`toggleVariants.variants.variant`. There is nothing about the recipe (cream
surface + cartoon-sm shadow) that requires a separate CVA.

**§1.2  Button/SelectTrigger/Input cartoon recipes are byte-duplicate**, not
shared. Each independently re-asserts the same five tokens:
`bg-[var(--cream)]` (or `--cream-warm`) + `text-[var(--cream-foreground)]` +
`border-2 border-[var(--border)]` + `rounded-md` +
`shadow-[var(--shadow-cartoon-accent)]` + `hover:-translate-y-px
hover:shadow-[var(--shadow-cartoon-md)] active:translate-y-0
active:shadow-[var(--shadow-cartoon-sm)]`. See:

- `src/components/ui/button/index.ts:36-37`
- `src/components/ui/select/index.ts:25-26`
- `src/components/ui/input/index.ts:14`
- `src/components/ui/number-field/index.ts:19` (descendant variant — same
  recipe pushed through `[&_[data-slot=input]]`)

A single `@utility cartoon-surface { … }` in `utilities.css` (or a shared CVA
fragment) would let each branch composite `'cartoon-surface'` instead of
re-asserting every token. The current shape is a soft KISS violation: four
copies of the same skeuo recipe must drift in lockstep on every token rename.

**§1.3  Tabs requires variant on both List and Trigger**. `tabsListVariants`
and `tabsTriggerVariants` are paired but unlinked. Consumers will pass
`variant="pill"` to `<TabsList>` and again to every `<TabsTrigger>`; if either
forgets, the visual breaks silently. Idiomatic fix: `<Tabs variant="pill">`
provides via `provide('tabs', { variant })`, descendants `inject` and apply
the matching slice of one shared CVA — exactly the pattern
`ToggleGroup`/`ToggleGroupItem` uses (`ToggleGroup.vue:18-21`).

**§1.4  NumberField `cartoon` deviates** by pushing rules into descendants via
`[&_[data-slot=input]]` (`number-field/index.ts:19`). The other cartoon
branches restyle the host element directly. Pick one path; the easiest is to
move the recipe onto `<NumberFieldInput>` itself with a `variant` prop and
drop NumberFieldRoot's CVA.

**§1.5  MetricBadge `xl` is a per-component scoped style block** with one
class (`metric-badge-amount-xl`) plus a `[data-size="xl"]` rule
(`MetricBadge.vue:78-90`). The `sm/md/lg` sizes use existing typography
utilities; `xl` invented a parallel surface. Idiomatic fix: rename to a
typography rung utility (`text-mono-display`?) and drop the scoped style.

---

## §2  Custom-package idiom audit

Pattern reference: `<script setup lang="ts">` + named `Props` interface +
`cn()` from `@utils` + external CSS in `src/styles/<pkg>.css` keyed by the
public class. `defineOptions({ name })` is convention but not strictly
required for SFC names (Vue infers from filename).

| package                  | scoped CSS | defineOptions | central CSS class | verdict     | citation                                                                |
| ------------------------ | ---------- | ------------- | ----------------- | ----------- | ----------------------------------------------------------------------- |
| cream-surface            | no         | no            | yes (cards.css)   | aligned     | `src/components/custom/cream-surface/CreamSurface.vue`                  |
| display-hero             | no         | no            | n/a (utility)     | aligned     | `src/components/custom/display-hero/DisplayHero.vue`                    |
| flourish-divider         | no         | no            | yes (utilities)   | aligned     | `src/components/custom/flourish-divider/FlourishDivider.vue`            |
| icon-stamp               | no         | no            | yes (utilities)   | aligned     | `src/components/custom/icon-stamp/IconStamp.vue`                        |
| math-surface             | yes (16ln) | no            | yes (math.css)    | hybrid      | `MathSurface.vue:69-92`                                                 |
| math-formula             | yes (10ln) | no            | yes (math.css)    | hybrid      | `MathFormula.vue:79-91`                                                 |
| math-glyph               | yes (15ln) | no            | n/a               | inline-only | `MathGlyph.vue:78-92`                                                   |
| bezier-canvas            | yes (54ln) | yes           | n/a               | inline-only | `BezierCurveCanvas.vue:283-336`                                         |
| notification-dot         | no         | yes           | yes (.notification-dot ref) | aligned | `NotificationDot.vue`                                              |
| keyboard-shortcuts-modal | no         | yes           | n/a (uses `.kbd`) | aligned     | `KeyboardShortcutsModal.vue`                                            |
| tier-badge               | no         | yes           | n/a               | aligned     | `TierBadge.vue`                                                         |
| like-button              | no         | yes           | n/a               | aligned     | `LikeButton.vue`                                                        |
| pipeline-flow            | no         | no            | **MISSING**       | **broken**  | `PipelineFlow.vue` references classes with no source-of-truth CSS      |
| live-snippet             | yes (105ln)| no            | n/a               | inline-only | `LiveSnippet.vue:93-197`                                                |
| blob                     | yes        | no            | n/a               | inline-only | `Blob.vue:150-191`                                                      |
| swatch                   | yes        | no            | n/a               | inline-only | `Swatch.vue:55-88`                                                      |
| svg-filters              | no         | no            | n/a               | aligned     | `SvgFilters.vue` (SVG-only)                                             |

### Findings

**§2.1  Inconsistent SFC convention**. Five packages adopt `defineOptions({
name })` (bezier-canvas, notification-dot, keyboard-shortcuts-modal,
tier-badge, like-button); ten do not. Pick one. Vue 3.5 SFCs auto-name from
filename so `defineOptions` is redundant unless the file is consumed by
`<KeepAlive>` or DevTools-debugged — neither is part of the contract.

**§2.2  PipelineFlow is silently broken**. `PipelineFlow.vue:53-77` emits
`pipeline-flow`, `pipeline-flow__item`, `pipeline-flow__node`,
`pipeline-flow__connector`, `pipeline-flow--vertical`,
`pipeline-flow--horizontal`, `pipeline-flow--connector-arrow|line|none`,
`pipeline-flow__label`, `pipeline-flow__detail`. **None of these exist in
`src/styles/`**. `grep -rn "pipeline-flow"` against `src/styles/` returns
nothing. The component compiles, types check, and ships, but renders an
unstyled `<ol>` of unstyled `<li>`s. This is the same silent-failure species
G.W2 was supposed to clear (`code-badge`, `blue-shimmer`, etc.) — and it
landed inside the same tranche.

**§2.3  LiveSnippet ships a 105-line scoped style block**
(`LiveSnippet.vue:93-197`) duplicating cartoon-shadow recipe, button geometry,
and a brand-new `@keyframes pulse-dot` (lines 189-196). Both are already in
canon — the `.glass-btn` family covers the run button shape, and
`animations.css` already ships pulse keyframes. This is C/D-class precept
violation: "no quick fixes, no workarounds". Idiomatic refactor: move the
class to `utilities.css` as `.live-snippet`, drop scoped block, drop
duplicate keyframe.

**§2.4  LiveSnippet imports `--accent-red`** at line 171
(`color: var(--accent-red);`). `--accent-red` is on tokens.css's "kept per
G.W0 challenge §B.1" list (line 206) but binding invariant 2 in `G.md`
explicitly says "orphan tokens (`--accent-pink`, `--shadow` alias) get
removed". The token survives the audit only by post-hoc reclassification —
LiveSnippet now anchors that survival. Cleaner: use `var(--destructive)` (the
canonical destructive token).

**§2.5  Blob.vue starts with a stray `/* … */` block comment outside any tag**
(`Blob.vue:1`). Vue's SFC parser tolerates leading whitespace and HTML
comments; a bare CSS-style block comment lands as text content before the
first block, which Vue may emit as a Fragment text node. Compare to
`SvgFilters.vue:1` which uses the correct `<!-- … -->` form. Either remove or
convert to `<!-- … -->`.

**§2.6  Three components ship inline-only styles** (`bezier-canvas` 54 lines,
`live-snippet` 105 lines, `blob` 41 lines). Per `instrument-chassis` /
`metric-badge` precedent, central styles live in `src/styles/<pkg>.css`. The
inline-only choice for `bezier-canvas` is defensible (component-local
visual primitives only — handles, leaders, curve), but `live-snippet`'s 105
lines are core surface chrome that other consumers will want to override
through tokens. Inline scoped styles defeat that.

---

## §3  Composable idiom audit

| composable                                      | accepts MaybeRefOrGetter | tryOnScopeDispose | uses @vueuse | has consumer in src/ | verdict       |
| ----------------------------------------------- | ------------------------ | ----------------- | ------------ | -------------------- | ------------- |
| useRAFLoop (uppercase, per-instance)            | n/a (cb not ref)         | onScopeDispose    | no           | yes                  | aligned       |
| useRafLoop (lowercase, shared coalescer)        | n/a                      | tryOnScopeDispose | yes          | **no**               | **dead code** |
| useBlob                                         | yes                      | yes               | yes          | yes (Blob.vue)       | aligned       |
| useBlobMood                                     | yes                      | implicit          | yes          | yes                  | aligned       |
| useBlobPointer                                  | n/a                      | onScopeDispose    | yes          | yes                  | hybrid (own rAF) |
| useBlobSatellites                               | n/a (Refs)               | implicit          | no           | yes                  | aligned       |
| useMetaballRenderer                             | n/a (Refs)               | dispose contract  | no           | yes                  | partial       |
| useWatercolorBlob                               | n/a (options obj)        | implicit          | yes          | yes (Swatch.vue)     | aligned       |
| useCollapse                                     | n/a (options obj)        | n/a (no listeners)| no           | **no**               | **dead code** |
| useContrastSafeAccent                           | yes                      | n/a               | no           | **no**               | **dead code** |
| useMonacoTheme                                  | n/a                      | implicit (watch)  | no           | **no**               | **dead code** |

### Findings

**§3.1  `useRAFLoop` vs `useRafLoop` — case-sensitivity hack**. The
filename-clash workaround at `useRAFLoop.ts:286-287` confesses both
implementations live in one module because macOS's case-insensitive FS would
collide if they were separate files. Two distinct hooks (per-instance
visibility-gated loop vs shared frame coalescer) ship from one file under
two casings differing by a single bit. `useRafLoop` (lowercase) is a shared
rAF driver intended for "high-cardinality animated primitives like the Blob
multi-instance budget" — but `useBlob.ts:135` uses `useRAFLoop` (uppercase,
per-instance) instead. **The shared coalescer has zero call sites in src/,
demo/, or tests/.** It is dead code. Idiomatic fix: delete `useRafLoop` and
its types; if Blob multi-instance budgeting needs frame-sharing, fold it
into `useRAFLoop` as an option (`shared: true`) or a pool inside the renderer.

**§3.2  Three rAF mechanisms in the blob package**:

1. `useRAFLoop` — visibility/PRM-gated, per-instance. `useBlob.ts:135` and
   `useWatercolorBlob.ts:88` consume it.
2. `useRafLoop` — shared coalescer. Zero consumers.
3. `useBlobPointer.ts:93-135` rolls **its own** rAF loop directly via
   `requestAnimationFrame`/`cancelAnimationFrame`, with hand-rolled
   start/stop machinery. Not gated by PRM, not visibility-paused, no
   `useRAFLoop` reuse.

So a `<Blob>` instance currently runs **two simultaneous rAF subscriptions**:
the renderer driver via `useRAFLoop`, and the pointer integrator inside
`useBlobPointer`. `useRAFLoop` already has the integrator's gating and
disposal contract; `useBlobPointer` should reuse it.

**§3.3  Blob renderer cleanup contract — incomplete**.
`useMetaballRenderer.ts:300-314` disposes:
- WebGL program / shaders / VAO ✓ (`destroyProgram`)
- `webglcontextlost`/`webglcontextrestored` listeners ✓
- Canvas2D fallback handle (when present) ✓

Missing:
- **No ResizeObserver attached anywhere in `useMetaballRenderer.ts`**
  (`grep` confirms 0 matches in `composables/blob/`). The `<Blob>` component
  hard-codes canvas width/height to a CSS dimension that never updates after
  mount. If the `:size` prop changes, `canvas.width` / `canvas.height` go
  stale; the renderer stretches.
- The `useBlob` facade's rAF loop never dispose-cancels when `canvasRef`
  becomes null pre-unmount; `useRAFLoop` is registered without a parent
  ref, so it lives until scope dispose.

The W3 proof's recovery-note claim "ResizeObserver torn down on dispose"
referred to a contract the implementation **does not satisfy**.

**§3.4  Three composables exported with zero consumers**. `useCollapse`,
`useContrastSafeAccent`, `useMonacoTheme` — each shipped under a new public
barrel (`composables/color/`, `composables/monaco/`), each unused in src/,
demo/, or tests/. Per binding invariant 3 (≥2 call-site bar), and per
`feedback_overfitting_audit`, each must either gain consumers in W4
storybook composition or **delete**. The current state is the textbook
overfitting violation.

**§3.5  `useCollapse.ts` is structurally trivial**: 70 lines whose entire
output is `{ maxHeight: collapsed ? "0" : "100%", opacity: ... }`. This is
a `:style` binding consumers can write inline in five characters; promoting
it to a public composable was unwarranted. Even if the dock benefits from
extraction, the dock owns it via `useDockTransition` already (`composables/`
in dock/) — `useCollapse` is the orphaned twin.

---

## §4  Token gestalt audit

### Light/dark mirror completeness

| token family                    | light defined | dark mirrored | citation                                                  |
| ------------------------------- | :-----------: | :-----------: | --------------------------------------------------------- |
| cream-{warm,cool,edge,foreground} | ✓           | ✓             | tokens.css:154-158 / 591-596                              |
| paper-bg-{1..4}                 | ✓             | ✓             | tokens.css:469-472 / 605-608                              |
| paper-border-{1..4}             | ✓             | ✓             | tokens.css:477-480 / 609-612                              |
| paper-shadow-{1..4}             | ✓             | **partial**   | shadow-cartoon-{sm,md,lg} reuse mirrors; paper-shadow-3/4 reuse `--shadow-elevated` / `--shadow-modal` which DO get dark mirrors at 640-644 |
| shimmer-blue-{dark,mid,light}   | ✓             | ✓             | tokens.css:490-492 / 615-617                              |
| blob-{cast-shadow-*,grain,…}    | ✓             | partial       | tokens.css:494-503 / 619-622 — **blob-grain-opacity, chromatic-aberration, cast-shadow-y/blur NOT mirrored**, only border-mix + cast-shadow-mix |
| --shadow-cartoon-accent         | ✓             | ✓             | tokens.css:253-254 / 599-602                              |
| --space-phi-{1..4}              | ✓             | n/a (structural) | tokens.css:483-486                                     |
| section-color-{0..12}           | ✓             | ✓             | tokens.css:188-200 / 574-586                              |
| viz-{fourier,chebyshev,…}       | ✓             | ✓             | tokens.css:211-215 / 624-628                              |
| tier-{featured,saved}, like     | ✓             | ✓             | tokens.css:221-227 / 630-636                              |

### Findings

**§4.1  Blob primitives — partial dark mirror**.
`tokens.css:619-622` mirrors `--blob-border-mix`,
`--blob-border-mix-contrast`, `--blob-cast-shadow-mix` only.
`--blob-grain-opacity`, `--blob-chromatic-aberration`,
`--blob-cast-shadow-y`, `--blob-cast-shadow-blur` are not redeclared, so
their light values cascade into dark — usually fine for unitless values but
the spec's intent (W1) was a complete mirror. Either redeclare them or
explicitly comment "kept identical across schemes" with rationale.

**§4.2  `--accent-pink` / `--accent-red` retained against G.md invariant 2**.
`tokens.css:202-206` keeps both with comment `Per G.W0 challenge §B.1: …
canonical (live consumer call sites in fourier-analysis); only
--section-heading is retired (truly orphan)`. **G.md binding invariant 2**
(line 41) reads:

> No backwards-compatibility shims. Token renames and surface-tier additions
> are clean breaks; orphan tokens (`--accent-pink`, `--shadow` alias) get
> removed.

The W0 challenge does not have authority to override the binding invariant.
`--accent-pink` survival here violates the contract.

**§4.3  `--shadow` alias retained**. `tokens.css:182` (light) and
implicitly via dark — same invariant-2 violation. The `--shadow-color` token
is canonical; `--shadow` should fold into `--shadow-color` or delete.

**§4.4  `--cartoon-shadow*` aliases retained**. `tokens.css:240-244`:
`--cartoon-shadow`, `--cartoon-shadow-hover`, `--soft-shadow`,
`--elevated-shadow`, `--modal-shadow` — and 291-293 `--cartoon-shadow-{sm,md,
lg}`. Each aliases its `--shadow-cartoon-*` sibling. This is the
two-naming-conventions tax (`shadow-cartoon-X` and `cartoon-shadow-X` both
exist). One must die; per the rest of glass-ui's discipline, the
`--shadow-*` form wins and `--cartoon-shadow-*` deletes.

**§4.5  `--easing-accent` is doing six jobs**. tokens.css:218 sets it as the
"motion accent (used by easing indicators)"; in practice it is consumed by
NotificationDot (`color: --easing-accent`), Blob (`--blob-color` fallback),
formula-block (`border-left: 4px solid var(--easing-accent)`), bezier-canvas
(`stroke: --easing-accent`). One token, six unrelated semantic jobs. Either
rename to a substrate-neutral name (`--accent-vivid`?) or split per use.

**§4.6  Per-rung Fraunces axis tokens (7 tokens)**. typography.css:46-52.
Idiomatic gestalt would be one parameterized recipe:

```css
@utility text-display-{N} {
  font-variation-settings: "WONK" 1, "SOFT" var(--display-soft, 0), "wdth" var(--display-wdth, 100);
}
```

…with each rung overriding `--display-soft` / `--display-wdth` once. Seven
discrete tokens (`--font-display-{1,2,3,4,5,mega,ultra}-variation-settings`)
that all encode `"WONK" 1` and that DisplayHero stretches with a `Record<size,
literal-string>` table (`DisplayHero.vue:53-57`) is the symptom of missing
parameterization. Twelve assertions where two would do.

---

## §5  Utility duplication / redundancy

### §5.1  `paper-grain-overlay` SVG turbulence — **4 copies**

The same `data:image/svg+xml,…feTurbulence baseFrequency='0.65'…
stitchTiles='stitch'…feColorMatrix saturate=0…feBlend multiply…rect…/svg`
URL appears verbatim in **four** locations:

1. `src/styles/paper.css:17` — `.paper-underpaint`
2. `src/styles/paper.css:39` — `.paper-grain-overlay::after`
3. `src/styles/paper.css:101` — `.paper-card::after`
4. `src/styles/cards.css:40` — `.cream-surface::after`

The `mix-blend-mode: soft-light` dark-mode flip is repeated in lockstep:

1. `paper.css:24-27` (paper-underpaint)
2. `paper.css:47-50` (paper-grain-overlay)
3. `paper.css:108-111` (paper-card::after)
4. `cards.css:47-50` (cream-surface::after)

Same with `prefers-reduced-transparency: reduce` opacity-zero fallback —
`paper.css:130-134` lists three; `cards.css:60-64` re-declares for
cream-surface alone.

Idiomatic gestalt fix: hoist the SVG URL into a CSS variable
`--paper-grain-image` in tokens.css §12 (already 99% there — only the
embedded `<filter>` needs to migrate), then have every consumer composite
`background-image: var(--paper-grain-image)`. The dark-mode flip and the
reduced-transparency guard live with the variable, and `.paper-card`,
`.cream-surface`, `.paper-underpaint`, `.paper-grain-overlay` all collapse
to `composes: paper-grain-overlay` (or class-list inclusion).

**This is the single highest-priority refactor before close.** Four
turbulent-SVG duplications mean every recipe tweak (frequency, blend mode,
opacity, dark flip) must land in four places. The next consumer will land a
fifth.

### §5.2  Duplicate keyframes

- `pulse-dot` declared inside `LiveSnippet.vue:189-196` scoped style.
  `animations.css` already ships `floating-panel-in`, `tooltip-in`,
  `fade-in`, `scale-in`, `slide-up`, `dock-in`, `shimmer-sweep`, `shimmer`,
  `shake`, `gold-shimmer-slide`, `sparkle-sweep`, `rainbow-drift`,
  `idle-bob`, `confetti-fall` — fourteen global keyframes; one more for
  pulse-dot would fit the pattern.
- `NotificationDot` uses `motion-safe:animate-ping` (Tailwind) with
  references to a "lightweight ping-style outer ring" in the docstring —
  there is no project-side `ping` keyframe; tailwind-css ships one. Fine,
  but the comment at `NotificationDot.vue:13-14` claims "we ship a
  lightweight ping-style outer ring instead, gated by `prefers-reduced-
  motion: reduce`" — the gate is `motion-safe:animate-ping`, which is
  Tailwind's gate, not glass-ui's `prefers-reduced-motion` block in
  `utilities.css:558-569`. Divergent gate authority.

### §5.3  Two cartoon-shadow utility families

`utilities.css:505-530` (`.shadow-cartoon-sm`, `-md`, `-lg`) ship the
multi-layer offset shadow + 2px border + transform. `tokens.css:282-290`
declares `--shadow-cartoon-sm/md/lg` token recipes that the CVA branches
consume directly via `shadow-[var(--shadow-cartoon-md)]`. Two separate
recipes for the same shape — one as a class, one as a token. The Button
cartoon variant uses the token, the cartoon-card class uses the utility.
Pick one. The token form is the right authority for skeuo composition.

### §5.4  Four shimmer recipes that share a base

`utilities.css:127-161` — `.text-shimmer-gold`, `-blue`, `-vivid`, `-pastel`.
Each is structurally identical: 250% gradient + `background-clip: text` +
`color: transparent` + same `gold-shimmer-slide` animation. Only the
gradient stops change. Idiomatic fix: one `.text-shimmer` base + a
`--shimmer-stops` custom property each variant supplies.

---

## §6  Cleanup contract verification — Blob renderer

Per W3-component-proof.md the Blob renderer's cleanup contract claims:

| claim                                                | actual                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| dispose() deletes WebGL program/buffers/textures     | ✓ `useMetaballRenderer.ts:128-140` (program, shaders, VAO)               |
| ResizeObserver torn down on dispose                  | ✗ **no ResizeObserver attached anywhere** in `composables/blob/`         |
| WebGL context lost / restored events handled         | ✓ `useMetaballRenderer.ts:266-298`                                       |
| Single rAF subscription (not per-instance)           | ✗ **two rAF subs per `<Blob>`**: useBlob's useRAFLoop + useBlobPointer's hand-rolled loop |
| Canvas2D fallback path disposes                      | ✓ `useMetaballRenderer.ts:187-192`                                       |

The proof artefact's claim does not match the source. Either the contract
needs to be restated, or:
- **add** ResizeObserver attachment+teardown in `useMetaballRenderer`, OR
  re-declare resize handling out of contract (the canvas size is
  prop-driven, ResizeObserver is unnecessary if the prop is the source of
  truth — but then the contract should say so).
- **collapse** `useBlobPointer`'s rAF onto `useRAFLoop` (or onto the parent
  facade's rAF) so disposal goes through one channel.

---

## §7  Recovery work — byte-identity check

The orchestrator-claimed recovery (W3-proof "Recovery note") covered W1+W2
edits to `tokens.css`, `typography.css`, `theme.css`, `tokens.ts`,
`cards.css`, `paper.css`, `utilities.css`, and `index.css` cascade. Spot
checks against the W1/W2 specs:

| recovered artefact                          | byte-aligned?  | drift                                                                                                  |
| ------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| cream namespace (cream/cream-warm/cool/…)   | ✓              | tokens.css:154-158 + dark mirror 591-596                                                               |
| paper-bg-{1..4} + paper-border + shadow     | ✓              | tokens.css:467-480 + 604-612                                                                           |
| shadow-cartoon-accent recipe                | ✓              | tokens.css:251-254                                                                                     |
| --space-phi-{1..4}                          | ✓              | tokens.css:483-486                                                                                     |
| icon-{2xl,3xl,mega}                         | ✓              | tokens.css:432-434                                                                                     |
| display-{mega,ultra} rungs                  | ✓              | typography.css:39-40                                                                                   |
| per-rung Fraunces axis tokens               | ✓              | typography.css:46-52                                                                                   |
| tracking-tightest                           | ✓              | typography.css:64                                                                                      |
| type-formula                                | ✓              | typography.css:43                                                                                      |
| @theme cream + φ-spacing + size-icon-*      | ✓              | theme.css:67-72, 215-219, 221-229                                                                      |
| 49 utility classes (shimmer, rainbow, etc.) | ✓              | utilities.css                                                                                          |
| cream-surface + paper-1..4 + paper-card     | ✓              | cards.css:23-71, paper.css:56-124                                                                      |
| math.css cascade entry                      | ✓              | index.css:28                                                                                           |
| package.json `./styles/prism-theme`         | ✓              | package.json:109 — points to `./src/styles/prism-theme.css`, **canonical path** matching `./styles` form |
| five tokens.ts runtime helpers              | ✓              | tokens.ts (chartNeutrals, vizColorsHex, spectrumColor, NAMED_EASING_BEZIER, goldenShimmer)             |
| orphan-comment cleanup                      | **partial**    | 5 `Per G.W*` comments remain in tokens.css + theme.css + tokens.ts                                     |

### Findings

**§7.1  Five orphan recovery comments remain**: tokens.css:153, 202, 247,
467; theme.css:67, 215, 221; tokens.ts:40. None are tranche-bounded
markers — they cite waves and challenges that, post-tranche, are noise.
Strip them.

**§7.2  package.json `./styles/prism-theme` path is canonical**, not a
shim. It mirrors `"./styles": "./src/styles/index.css"` (line 108) — both
public stylesheet exports point at `src/styles/` to avoid a build step for
CSS, which is the canonical pattern in this repo. No problem here.

**§7.3  No orphan `@source` directives** in `index.css`. Recovery preserved
exactly one `@source "../components"` line.

---

## §8  Wβ3 single-quote-escape "fix" audit

The orchestrator claimed three `font-variation-settings: '"WONK" 1, "SOFT"
100'` were rewritten to `'\'WONK\' 1, \'SOFT\' 100'` (escaped single
quotes). Audit of current state:

| site                                                     | quote form                                  | spec-compliant CSS? |
| -------------------------------------------------------- | ------------------------------------------- | :-----------------: |
| `DisplayHero.vue:54-56` (stretch)                        | single-outer + double-inner: `'"WONK" 1…'`  | ✓                   |
| `DisplayHero.vue:61` (style-binding key)                 | same (uses `stretchSettings[size]`)         | ✓                   |
| `Blob.vue:180-182` (`.blob-label` font-variation-settings) | bare double-quoted axis tags inside scoped CSS | ✓                |
| `MathGlyph.vue:86-88`                                    | bare double-quoted in scoped CSS            | ✓                   |

**Conclusion**: the current source is canonical. Single-quoted JS string
literals containing double-quoted axis tags is the right shape for inline
`:style` bindings; bare double-quoted axis tags inside CSS files is the
right shape for static rules. **No backslash-escaped single quotes appear
in the live source** — `grep '\\\\'` returns nothing in display-hero or
math-formula. Either the orchestrator's note describes a fix that was made
and then re-corrected, or the original problem was hypothetical. Either way:
not a shim, the quote form is correct.

---

## §9  Slot-class props vs alternatives

W3 lane 5 added three slot-class props:

### `HoverCardContent.contentClass`

`HoverCardContent.vue:18, 42` — concatenates with `props.class`:
`cn(base, props.class, props.contentClass)`.

The `class` and `contentClass` are concatenated in the same render pass.
Consumer can already pass `class`. **`contentClass` is structurally
redundant**: it's a second `class` slot for the same element. Idiomatic
fix: delete it; consumers use `class`.

### `DialogContent.closeIconClass`

`DialogContent.vue:24, 61` — applied to the `<X>` lucide icon inside
`DialogClose`. Replaces consumer `:has(> .lucide-x)` selectors. This one is
**legitimate**: the close-icon is a different element from the host, and
without the prop the consumer must reach into `:deep()`. Aligned with the
synthesis gap-42 motivation.

### `DockLayerGroup.keepOpenWhile`

`DockLayerGroup.vue:38-41, 86-101` — accepts `Ref<boolean> | (() => boolean)
| boolean`, watches `keepOpenResolved`, calls `dockKeepOpen()`/`release()`
on flip. Non-trivial behavioral binding (not a class slot). The existing
`keepOpen`/`release` injection is preserved as the underlying contract;
`keepOpenWhile` is sugar over the watcher pattern. **Aligned**.

### Findings

**§9.1  `HoverCardContent.contentClass` is redundant**. Two paths to one
outcome (host `class` and slot `contentClass` both flow into the same `cn()`
call on the same element). Delete `contentClass`; consumer keeps `class`.

**§9.2  `DialogContent.closeIconClass` and `DockLayerGroup.keepOpenWhile`
are correct**.

---

## §10  Two-paths-where-one-suffices

### §10.1  Card variant="cream" AND `<CreamSurface>`

Both apply `.cream-surface` to a `<div>`. Card additionally accepts `flush`
(no-op for cream — comment at `Card.vue:35-44` confirms), CreamSurface
adds `tone="warm"|"cool"` via `data-tone` and `padded` (additive
`p-phi-3`). Ergonomic difference is near-zero. Either:
- delete `<CreamSurface>` and let `<Card variant="cream" :data-tone="warm">`
  carry the tone via a `tone` prop on Card, OR
- delete `Card variant="cream"` and let consumers reach for `<CreamSurface>`.

The latter is gestalt-correct (cream is an identity, not a card variant) —
but Card already has `variant="paper"` which is the same shape. So **either
both go (cream + paper into named primitives) or neither does** (both into
Card variants). The current state is `paper` lives in two places too.

### §10.2  Card variant="paper" AND `.paper-card` AND `.paper-{1..4}`

Three paths to the paper substrate:
1. `<Card variant="paper">` resolves to `.paper-card` (cards/index.ts:30).
2. `.paper-card` direct utility (`paper.css:85-106`) — cream + grain +
   shadow.
3. `.paper-{1..4}` tier classes (`paper.css:57-83`) — same shape minus the
   grain overlay.

There is no `<PaperCard>` component, and no `<PaperSurface>` — but there
**is** a `<CreamSurface>`. Asymmetric. Either land `<PaperSurface>` (with
`tier="1|2|3|4"`) or delete `<CreamSurface>` for symmetry; either way drop
`Card variant="paper"` because the recipe is identical to `.paper-card`.

### §10.3  Three rAF mechanisms (already covered §3.2)

`useRAFLoop` + `useRafLoop` (dead code) + `useBlobPointer`'s hand-rolled
loop. Three paths; one (the shared coalescer) unused; one (the pointer's
own loop) duplicates what `useRAFLoop` provides.

### §10.4  Two cartoon-shadow systems (covered §5.3)

`.shadow-cartoon-{sm,md,lg}` utility classes vs `--shadow-cartoon-{sm,md,
lg}` token recipes. Two consumption paths; pick the token form.

### §10.5  Two pulse animations

`.notification-dot` uses Tailwind's `animate-ping`; `.live-snippet .pulse`
uses an SFC-scoped `@keyframes pulse-dot`. Either centralize a `pulse-dot`
keyframe or use Tailwind's `animate-pulse` (already available). Two paths
to "rhythmic opacity oscillation".

### §10.6  Two paper-tone authorities

cream-warm vs paper-bg-1: cream-warm = `hsl(40 18% 96%)` (tokens.css:155),
paper-bg-1 = `var(--cream)` = `var(--neutral-0)` = `hsl(48 12% 98%)`. So
cream-warm and paper-bg-1 are different colors despite both being "warm
paper". Cross-checking dark: cream-warm dark = `hsl(28 6% 8%)`, paper-bg-1
dark = `var(--cream)` = `var(--neutral-0)` = `hsl(24 8% 6%)`. Two warm-paper
identities at slightly different hues that consumers will mix uncritically.
Decide: is `cream-warm` and `paper-bg-1` the same identity (collapse) or
different ones (rename so the difference is legible)?

### §10.7  TabsList + TabsTrigger variant duplication (covered §1.3)

### §10.8  `.icon-stamp` utility AND `<IconStamp frame="stamp">`

`utilities.css:243-255` defines `.icon-stamp`; `<IconStamp>` thinly wraps
the utility (`IconStamp.vue:62-66`). Two paths; one is the wrapper. This
one is **fine** — the wrapper carries `accent` mapping logic the utility
can't express alone. But the API surface should be one of (component, raw
utility) per consumer site, not freely mixed.

---

## §11  Recommendations — concrete refactors before close

Ordered by impact / KISS-violation severity.

### P0  — must land

1. **Hoist paper-grain SVG into one CSS variable + one `@utility`**
   (covered §5.1). Replace four duplicated `data:image/svg+xml,…` blobs
   plus four `mix-blend-mode: soft-light` dark flips plus three
   `prefers-reduced-transparency` opacity-zero rules with one definition.
   This is the largest gestalt failure in the tranche.

2. **Delete dead composables and dead rAF coalescer**:
   - `useRafLoop` (lowercase) — zero call sites, file co-habits with
     `useRAFLoop` via case-insensitive FS hack.
   - `useCollapse` — zero call sites; structurally trivial.
   - `useContrastSafeAccent` — zero call sites.
   - `useMonacoTheme` — zero call sites.
   Also delete the corresponding barrels (`composables/color/index.ts`,
   `composables/monaco/index.ts`) and src/index.ts re-exports if both
   barrels become empty.

3. **Honor G.md invariant 2**: delete `--accent-pink`, `--accent-red`,
   `--shadow` alias, `--cartoon-shadow*` aliases (`tokens.css:182, 205-206,
   240-244, 291-293`). Either retire them per the invariant, or amend the
   invariant document with a rationale; do not leave the source contradicting
   the binding contract.

4. **Fix PipelineFlow silent-failure**: ship `pipeline-flow.css` with the
   classes the component emits, OR delete the BEM class names and let the
   inline Tailwind utilities (already on `pipeline-flow__node`) carry the
   visual. The story renders unstyled.

5. **Repair Blob.vue:1**: convert leading `/* … */` block comment to
   `<!-- … -->` HTML comment. Match `SvgFilters.vue:1` shape.

### P1  — should land

6. **Collapse `ToggleGroupItem`'s separate CVA** (`toggleGroupItemCardVariants`)
   into `toggleVariants.variants.variant.card`. Match the shape of every
   other variant-add this tranche.

7. **Promote cartoon-surface recipe to `@utility`** (or a CVA fragment) so
   Button / SelectTrigger / Input / NumberField cartoon variants all
   composite one source of truth instead of re-asserting six tokens each.

8. **Resolve cream/paper duplicate-authority** (§10.1, §10.2):
   - decide whether `<CreamSurface>` and Card variant="cream" both ship,
   - decide whether `Card variant="paper"`, `<PaperSurface>` (TBD), and
     `.paper-card` form a coherent triplet or collapse.
   - reconcile cream-warm vs paper-bg-1 hues.

9. **Fix LiveSnippet.vue**: move the 105-line scoped block to
   `src/styles/live-snippet.css`, drop the duplicate `@keyframes pulse-dot`,
   stop reading `--accent-red`.

10. **Unify rAF in blob package**: refactor `useBlobPointer` to consume
    `useRAFLoop` instead of hand-rolling its own. One rAF mechanism per
    `<Blob>` instance.

11. **Delete `HoverCardContent.contentClass`** — redundant with `class`
    (§9.1).

### P2  — nice to land

12. **Add ResizeObserver to `useMetaballRenderer`** (or document its
    absence as intentional given prop-driven canvas sizing). Either way,
    the W3 proof's claim must match the source.

13. **Standardize `defineOptions({ name })` use**: pick "always present"
    or "never present" in custom packages and apply uniformly across the
    14 G additions.

14. **Strip 8 `Per G.W*` recovery comments** in tokens.css/theme.css/tokens.ts.

15. **Parameterize per-rung Fraunces axes** (§4.6) — replace 7 discrete
    `--font-display-N-variation-settings` tokens with one parameterized
    recipe + per-rung overrides on `--display-soft` / `--display-wdth`.

16. **Reduce the four shimmer recipes** in utilities.css:127-161 to one
    base + `--shimmer-stops` (§5.4).

17. **Rename `--easing-accent`** (§4.5) — currently doing six unrelated
    semantic jobs (motion accent, blob fallback, formula rule, bezier
    stroke, notification dot, etc.).

---

## §12  Summary

Tranche G recovered its lost W1+W2 edits cleanly and shipped the
component/composable layer without breaking typecheck or build, but the
recovery did not reset the gestalt: the substrate now contains four
duplications of the paper-grain SVG, a dead shared-rAF coalescer that the
spec specifically invoked, three composables with zero consumers exported
under fresh public barrels, one silently-broken component
(`<PipelineFlow>`), one component with a 105-line scoped style block
including a duplicate keyframe (`<LiveSnippet>`), and four orphan tokens
preserved against an explicit binding invariant.

The skeuo (cartoon-surface) recipe is duplicated four times across CVAs;
the per-rung Fraunces axis pattern is duplicated seven times across
tokens; the cream/paper duplicate-authority spans tokens, classes,
components, and Card variants without a clear single owner.

KISS / one-path is violated in at least eight places enumerated in §10.
Idiomatic Vue 3.5 / Tailwind v4 patterns exist for all of them.

Concrete next step: **land §11 P0 (1–5) before declaring close.** The paper-
grain dedup + dead-code removal + invariant-2 reconciliation + PipelineFlow
silent-failure repair are each one-day refactors that bring the tranche
back into alignment with G's stated commitments.
