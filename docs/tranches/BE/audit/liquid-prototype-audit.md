# BE liquid-dock prototype — deep audit synthesis + gestalt re-architecture plan

> Synthesis of 32 lens audits against the `prototype/liquid-dock` branch (HEAD `198b43cb`),
> the iOS-27 references (V1 Apple Music dock/Dynamic-Island · V2 aurora album-art · Maps
> Places sheet/floating glass controls), and the BE tranche thesis (`docs/tranches/BE/SEED.md`,
> `WAVE-LIST.md`, `EXECUTION-DAG.md`).
>
> **Verified at audit time:** `proof:no-layout-animation` is RED on this branch
> (`MC3-transition-arm — inline-size/block-size @ liquid-morph.css:45`). The prototype CSS is
> demo-private (`demo/demo.css:113-114`, NOT in `src/styles/index.css` → never shipped).
> `useLiquidMorph`/`useLiquidRail` are exported from NO barrel. None of the BE library primitives
> exist on disk (`useBloomUp`/`useDockFission`/`useDockContextSilhouette`/`--glass-fill-tint`/
> `--glass-opacity-clear`/`--glass-opacity-sheet`/`--glass-ambient-hue` all absent).

## The verdict in one line

The prototype is a **valuable design SPIKE** (it proved the one-scalar SpringProgress loop + the
rail projection math are tractable) wearing the costume of an architecture. Its **engine is
throwaway**: it animates layout properties (gate-RED), forks the shipped dock/rail/morph engines,
hardcodes 4 contexts as a `data-mode` CSS switch, lives mis-placed in `src/styles/` as gate-invisible
demo-private CSS, and exports nothing. Every one of the user's 4 reported defects is a **structural
consequence** of these architecture choices, not a tuning miss. The path to production is **building
the ~13 net-new BE library primitives per the wave specs** and harvesting-then-deleting the spike —
NOT grafting the prototype onto GlassDock.

---

## 1. WORKSTREAMS (deduped + clustered)

The 32 lenses collapse into **11 workstreams**. Severity is the max across contributing findings.

| # | Workstream | Severity | Core problem | BE waves |
|---|-----------|----------|-------------|----------|
| **W1** | **Compositor-safe morph transposition** | blocker | The box-grow + V↔H reshape animate `inline-size`/`block-size`/`max-block-size`/`padding`/`grid-template`/`line-clamp` per frame — gate-RED in src, gate-INVISIBLE in demo | W-DOCK-FISSION, W-METABALL-BRIDGE2, W-BLOOM-UP |
| **W2** | **Metaball re-architecture (goo bridge)** | blocker | Island rests as two abutting blobs (zero overlap) → goo waist by construction; goo is always-on (never goo-OR-glass swap); no `--neck-t` stretch-and-snap; SVG filter is demo-inline, mis-region'd, missing `color-interpolation-filters=sRGB` | W-DOCK-FISSION, W-METABALL-BRIDGE2, W-GOO-SPLIT-PERF, W-VIZ-PARITY-METAL |
| **W3** | **Context-silhouette state machine** | blocker | 4 contexts hardcoded as a `mode` ref + `data-mode` CSS switch + v-if blocks; no descriptor map, no surviving-control FLIP, no pill↔tabbar fusion | W-DOCK-CONTEXT-SILHOUETTE, W-DOCK-NOWPLAYING-PILL |
| **W4** | **Rail-as-hairline (box-INVIOLATE)** | blocker | Rail built as a standalone vertical glass CAPSULE (a 2nd dock) — must be a `mode="facets"` render mode on the shipped DockStack, fanning in a real dock's gutter via `.glass-dock-frame`, box-inviolate | W-DOCK-RAIL-REALIZE |
| **W5** | **Glass-material foundation (tokens)** | blocker | `--glass-fill-tint`/`--glass-opacity-clear`/`--glass-opacity-sheet`/`--glass-ambient-hue`/`surface="clear"` all absent; plates hand-roll flat triplets, never compose `.glass-material` (no specular/glint/accent/lens); `--glass-edge-light` mis-used as a color (invalid → rim drops) | W-AMBIENT-TINT, W-TINTED-CHIP, W-CLEAR-VARIANT, W-SHEET-TRANSLUCENT, W-ICONCHIP-GLASS, W-DEEP-CEILING |
| **W6** | **Vertical-orientation styling** | blocker | Every vertical arm is a `display:none` amputation of horizontal-only markup → collapses to a bare album square; expanded panes have ZERO vertical arm | W-DOCK-CONTEXT-SILHOUETTE (orientation axis) |
| **W7** | **Safari floor** | blocker | No `color-interpolation-filters=sRGB` (goo neck reads wrong on WebKit); unbounded filter region (clips neck); zero-sized filter host; `.glass-lens` only behind `@supports(backdrop-filter:url())` (Safari never enters); no webkit π enrolled | W-LENS-SAFARI, W-SAFARI-CAPTURE, W-VIZ-PARITY-METAL |
| **W8** | **Jubilance layer** | major | Zero of the BE delights: no fission ripple, merge-splash, magnetic-tendril, snap-recoil, anticipation, breathing-idle, celebration-burst, haptics | W-DOCK-JUBILANCE, W-CELEBRATE-BURST, W-HAPTIC-COUPLE, W-ANTICIPATE-FOLLOW, W-ALIVE-IDLE |
| **W9** | **No-legacy sweep (dead paths / parallel recipes)** | major | Dead split/union register (~250 lines unreachable), dead `expand()`/`collapse()` FLIP API (never called), `--piece-angle`/`--liquid-morph-origin`/`neckHold` written-but-unread, dead `.liquid-morph-piece`/`reset()`/`itemsBelow`/`--rail-position`, RADIAL_SPLIT/inward/lateral unexercised, two goo filters, magic-number soup, de-shadcn residue | W-DESHADCN-SWEEP, W-DESHADCN-GATE-WIDEN, (prune happens inside W1–W4) |
| **W10** | **Demo-chassis + more demos** | major | 7 tiles re-paste the tile chassis + glass plate + `--ex-spring` bezier (5–10× duplication); each example is a CSS-transition facsimile using NONE of the engine; 2 live Aurora GL contexts on one route | W-GESTALT-ROSTER-BE, (gallery re-hosts on real primitives) |
| **W11** | **A11y + publication + gates** | major | Nested-interactive `role=button` wrapping real buttons; whole bloomed content `aria-hidden`; no focus-ring; rail keyboard-dead + wheel-only (touch-dead); `aria-orientation` on `role=group`; nothing exported/shipped; `proof:liquid-morph` is the unrelated BC gate; demo/ outside the no-layout gate corpus | W-ARIA-ORIENTATION-GUARD, W-GESTALT-ROSTER-BE, W-CUT, (per-wave proof gates) |

---

## 2. WORKSTREAM DETAIL

### W1 — Compositor-safe morph transposition `[BLOCKER]`

**Problem.** `liquid-morph.css:32-33` lerps `inline-size`/`block-size` off `--liquid-morph-t`;
`:45-47` `transition: inline-size 0.44s, block-size 0.44s` for the V↔H reshape; `:39`
`will-change: inline-size, block-size` (a no-op on layout props that pins a wasted layer). The 4
gallery examples + the gallery host repeat this across `max-block-size`/`padding`/`grid-template-*`/
`-webkit-line-clamp` (a non-animatable property → snap, not morph). The library already cured this
exact disease (W-DOCK-MORPH-FAMILY / W-CARD-COMPOSITE) and the prototype regressed it. The demo
files escape the gate only because `proof:no-layout-animation` walks `src/styles`+`src/components`,
never `demo/`.

**Gestalt approach.** RESERVE the settled footprint with a one-time layout solve
(`inline-size/block-size: var(--…-to)`, never animated), then drive a **compositor
`transform: scaleX()/scaleY()`** over it (`= from/to → 1`), `transform-origin` at the pinned edge,
content read complete behind an `overflow: clip` aperture from frame 0 — the dockMorphContext
reserve-then-scale pattern verbatim. Reveals become `scaleY(0→1) + opacity` origin-top
(W-CARD-COMPOSITE grid-track recipe — text lays out once). `padding→translateY`, `font-size→scale`.
The `will-change` becomes `transform`, toggled only while `[data-morphing]`. **Widen
`proof:no-layout-animation` to scan `demo/stories/**` (or have every demo compose the gated library
engine so there is nothing to scan).**

**Files.** `src/styles/glass/liquid-morph.css`, `scripts/proof-no-layout-animation.mjs`,
all of `demo/stories/dock/examples/*.vue` + `dock-gallery.vue`.

---

### W2 — Metaball re-architecture (the goo bridge) `[BLOCKER]` — user defect #1

**Problem.** At rest the two `8.5rem` island blobs ABUT edge-to-edge at the box center
(`inset-inline-end:50%` / `inset-inline-start:50%`, zero overlap; `17rem = 2×8.5rem` exactly). The
goo `feGaussianBlur(stdDeviation=8)+feColorMatrix(20 -9)` filter can only fuse OVERLAPPING alpha
mass — two tangent stadium caps leave a concave corner notch → the structural **waist/pinch**
(`02-island-not-joined-spacing.png`). The goo filter is **always-on** (never the goo-OR-glass
per-frame swap the BE spec mandates) so the rest pill is permanently a flat tan gel, never crisp
glass. There is no `--neck-t` stretch-and-snap, no `useLiquidFlex` recoil, no neck specular sweep —
the separation is a linear constant-velocity translate. The fills are opaque magic-tan oklch
literals (4 near-duplicates) with no glass tier, no dark arm, no backdrop transmission.

**Gestalt approach.** The rest state is **ONE pill, not two touching blobs**. At `t<ε` paint ONE
`.glass-floating` glass plate (real backdrop-filter + `--glass-edge-light` rim + specular core),
goo filter OFF; the split CARVES it — the two halves only diverge past a sub-perceptual `--split-t`
threshold, the goo engaging ONLY during the active neck band (the BE.W-GOO-SPLIT-PERF goo-OR-glass
floor). The bridge is the BE.W-METABALL-BRIDGE2 per-seam `--neck-t`: a single rounded-rect bridge
whose block-axis `clip-path: inset()` THINS to a filament on `--neck-t`, drops opacity past
`--neck-break`(~0.7), and the island `--stretch` RECOILS (ζ<1 overshoot). Register the islands as
`useDockFission` PIECES (they inherit `--stretch`/squish for free — kill the bespoke translate-only
fork). Promote the demo-inline `<filter>` to ONE library mount (`fission-bridge.css` generalizing
the shipped `morph-bridge.css` clip-path neck math), tokenize stdDeviation/threshold. Replace the 4
tan literals with ONE `--goo-gel` token derived off `--glass-specular-core`/`--card`.

**Files.** `src/styles/glass/liquid-morph.css`, `src/styles/dock/morph-bridge.css` (the closer-to-correct
deterministic neck math to generalize), `demo/stories/dock/liquid-playground.vue` (the inline `<filter>`),
`src/composables/motion/useLiquidFlex.ts`.

---

### W3 — Context-silhouette state machine `[BLOCKER]`

**Problem.** The 4 "modes" (`expand`/`island`/`player` + rest) are a `mode` ref + `data-mode` CSS
switch + `v-if`/`v-show` blocks. Switching a mode UNMOUNTS one block and MOUNTS another — controls
TELEPORT, never GLIDE. There is no `DockSilhouetteDescriptor[]` map, no `SilhouetteSlot` from/to
model, no surviving-control FLIP, and the headline iOS-27 betters-move — the now-playing pill DOCKS
DOWN and MERGES INTO the tab-bar as ONE continuous plate (`--silhouette-fuse-t`) — is entirely
absent. The spring register is chosen by a mode-ternary in the SFC (N-code-path disease).

**Gestalt approach.** Mint `useDockContextSilhouette` reading a declarative
`DockSilhouetteDescriptor[]` (`bar | bar+pill | split | search`), each with `slots[]` (named
positions keyed by `controlId`). On `setSilhouette(to)`: diff `from.slots`/`to.slots` by controlId —
present-in-both → FLIP old-rect→new-rect via the SHIPPED `ElementMorph + springTimingFunction`
(the `useDockCtaReceive`/`useLiquidReveal` substrate, NO fork, ONE `DOCK_SPRING`); from-only →
DETACH (drives `useDockFission`); to-only → BLOOM in (inverse FLIP). Each descriptor carries its
own spring preset + neckHold (data, not an SFC ternary). Slot geometry is **orientation-derived**
(the `dim`-idiom) so vertical falls out for free (→ W6). The fusion is a `bar+pill` descriptor whose
pill to-rect is the bar's top crown + a `--silhouette-fuse-t` clip-meld. The demo tab-strip survives
ONLY as an affordance calling `setSilhouette(id)`.

**Files.** new `src/components/custom/dock/composables/useDockContextSilhouette.ts`,
`src/styles/glass/liquid-morph.css` (the `data-mode` switch retires), `liquid-playground.vue`,
new `scripts/proof-dock-context.mjs` (born-RED, C1–C5).

---

### W4 — Rail-as-hairline (box-INVIOLATE) `[BLOCKER]` — user defect #4

**Problem.** `liquid-rail.css:132-148` mints `.liquid-rail-dock` — a standalone `4.5rem×15.5rem`
glass CAPSULE with its OWN backdrop-filter, `overflow:hidden`, `cursor:ns-resize`, that the carousel
scrolls INSIDE. This is a SECOND dock (the exact inversion of the spec) — a THIRD parallel rail
engine beside the shipped `DockStack`/`stack-rail.css` and the retired `DockRail`. `useLiquidRail`
(407L) re-forks the spring loop, carousel virtualization, ringOffset modulo, PRM snap, and a
`[data-settling]` CSS-bezier transition (a 2nd motion clock + a raw `--ease-out-expo` literal). Zero
per-facet `--glass-accent`. The capsule forces a double-glass workaround (chips drop their own
backdrop-filter). `overflow:hidden` + a static mask feather paper over a self-inflicted clip. The
edge-anchor CSS is dead (always overridden to `--centred`). `proof:dock-stack-rail` S1 only name-matches
the retired `DockRail`, so the fork sails past. Stale CLAUDE.md DockRail/`proof:rail3`/
`--dock-rail-seam-offset` prose still documents the retired machinery as live.

**Gestalt approach.** DELETE `useLiquidRail.ts` + `liquid-rail.css` + `.liquid-rail-dock` wholesale.
Add `mode: "stack" | "facets"` to the shipped `DockStack.vue` (default `"stack"` = byte-identical).
The `"facets"` mode renders facet-chips as a flex strip in the SAME `#rail` slot / `.glass-dock-frame`
non-clipping gutter (box-INVIOLATE, deltaW=deltaH=0), each chip writing `--glass-accent: <hue>` (the
shipped per-instance rim axis), the active facet on `--dock-control-active-bg`, overflow through the
existing `<FadingScroll>` port, the click writing the consumer-owned `v-model` (no shadow). Wire the
fission→facet hand-off via a `()=>facetRect` to-getter on the same `ElementMorph` substrate (the
detached piece flies onto a facet, absorbs its accent hue). Harvest ONLY the φ-tier/ring projection
math as a pure helper DockStack imports. EXTEND `proof:dock-stack-rail` S1 → `proof:dock-rail-realize`
to red ANY rail engine outside DockStack (structural assert, not name-match). Land the mandatory
CLAUDE.md doc-reconcile.

**Files.** delete `src/components/custom/dock/composables/useLiquidRail.ts` + `src/styles/dock/liquid-rail.css`;
`src/components/custom/dock/DockStack.vue`, `src/styles/dock/stack-rail.css`,
`scripts/proof-dock-stack-rail.mjs`, `CLAUDE.md`, `src/components/custom/dock/GlassDock.vue` (structure comment).

---

### W5 — Glass-material foundation (the tokens everything depends on) `[BLOCKER]`

**Problem.** The dock NEVER composes `.glass-material` — 13 hand-rolled `var(--glass-bg-floating)` +
hardcoded `blur(13px) saturate(1.35)` plates, so the hallmark surface has ZERO of the iOS-27
material register (no moving specular, no conic edge-glint, no `--glass-accent` core, no lens) and
diverges from the dark-arm saturate/brightness companion (flat in dark). `--glass-edge-light` is a
COMPLETE box-shadow token but is consumed as a COLOR in 7 places (`inset … var(--glass-edge-light)`
→ invalid → the WHOLE box-shadow drops → no rim, no drop-shadow, worst in dark where the rim is the
silhouette device). The 4 foundational tokens the dock waves consume — `--glass-fill-tint`
(plate-bg tint, distinct from rim accent), `--glass-ambient-hue` (sampled off album art),
`--glass-opacity-sheet`, `--glass-opacity-clear` + `surface="clear"` — are ALL absent. The deep tier
(`--glass-deep`/`--glass-depth`, the surface CLAUDE.md names as its intended consumer) is unused.

**Gestalt approach.** This is the **Tier-0 foundation** — cheap, high-leverage, unblocks everything.
Land in dependency order: (a) `--glass-ambient-hue` as a free-rider OKLCh histogram on the existing
`useGlassBackdropLuminance` 32×32 `getImageData` loop (W-AMBIENT-TINT); (b) `--glass-fill-tint`/
`-strength` plate-tint axis in oklab, distinct from rim `--glass-accent` (W-TINTED-CHIP); (c)
`--glass-opacity-sheet` mirroring `--glass-bg-dialog` (W-SHEET-TRANSLUCENT) + `surface="clear"` 4th
surface-axis member with its MANDATORY legibility scrim + `--glass-opacity-clear` (W-CLEAR-VARIANT).
Then re-point every liquid plate to compose `.glass-material` (+ `.glass-deep`/`.glass-lens` on the
hero dock) — one class, the tier token chooses opacity, the material group supplies
rim+specular+glint+accent. Fix `--glass-edge-light` misuse: read it as a WHOLE shadow layer, never
nested. Extend `proof:glass-cohesion` to red a `var(--glass-bg-floating)` background not accompanied
by `.glass-material` composition.

**Files.** `src/components/ui/_shared/useSurfaceAxis.ts`, `src/composables/glass/useGlassBackdropLuminance.ts`,
`src/styles/tokens/glass.css`, `src/styles/glass/material.css`, `src/styles/glass/liquid-morph.css`,
`src/styles/dock/liquid-rail.css`.

---

### W6 — Vertical-orientation styling `[BLOCKER]` — user defect #2

**Problem.** Every vertical arm is a `display:none` amputation: `[data-orientation=vertical]` hides
the now-playing text+play (→ bare album square, `03-vertical-dock-unstyled.png`) and the search
hint+mic (→ orphan icon). The expanded panes (`.liquid-dock-pane`/`.liquid-dock-player-pane`) have
ZERO vertical arm — they inherit the horizontal card layout. The vertical box math transposes
horizontal count-math (`block-size: --pill-w`) onto the column axis.

**Gestalt approach.** Vertical is a CONTENT-REFLOW, not a content-DELETE. This is **subsumed by W3**:
when slot geometry is orientation-derived (the `dim`-idiom — `width|height` from one orientation
value, never hardcoded), every silhouette has a column layout BY CONSTRUCTION. A vertical
now-playing stacks album→ScrollingText title→transport; a vertical sheet grows down the column. The
reserved-footprint scale morph (W1) makes the vertical pill just the card box at scale<1 on the
cross axis — the column extent falls out of the reserved footprint, never a count×slot guess. Reserve
the column block-size from the actual stacked content (DockLayerGroup self-reserve precedent).

**Files.** `src/styles/glass/liquid-morph.css` (retires into the descriptor engine),
`useDockContextSilhouette.ts` (orientation axis).

---

### W7 — Safari floor `[BLOCKER]`

**Problem.** Both goo `<filter>`s omit `color-interpolation-filters="sRGB"` (the house idiom already
proven at `useGlassRenderer.ts:188`, `handmark/texture.ts:46`, `WatercolorDot.vue:149`) — WebKit
thresholds the alpha in linearRGB so the neck reads wrong (a key contributor to the waist). The
filters declare NO filter region → the default `-10%/120%` objectBoundingBox CLIPS the goo neck and
the flying split pieces exactly where they travel. The host SVG is `width=0 height=0` (the
zero-sized-filter-host WebKit no-op class). `.glass-lens` refraction lives ONLY behind
`@supports(backdrop-filter:url())` — a query WebKit NEVER enters (bug 245510), so the reference
engine paints flat frosted plastic with zero bending; AND the dock never opts into `.glass-lens` on
ANY engine. No webkit Playwright π is enrolled — every Safari risk is invisible to CI.

**Gestalt approach.** Add `color-interpolation-filters="sRGB"` to both filters + re-tune the
threshold ONCE in sRGB. Declare a generous explicit filter region (`x=-50% width=200% …`) or apply
the goo to a STATIC non-transformed container bounding the split extent. Use a non-zero
visually-hidden host mounted ONCE at app root. Build BE.W-LENS-SAFARI: the regular-`filter:url()`
displacement clone over a z-below backdrop-clone sibling, gated `@supports (filter: url(#x)) and (not
(backdrop-filter: url(#x)))` (the WebKit stacking fence — clone NEVER co-located with a plate's own
backdrop-filter), and opt the hero dock into `.glass-lens`. Enroll a real webkit π
(BE.W-SAFARI-CAPTURE / BE.W-VIZ-PARITY-METAL): decode the island-rest seam (one fused capsule, no
trough), the split-snap neck, the lens rim. NO source-green close without the WebKit pixel readback.

**Files.** `demo/stories/dock/liquid-playground.vue` (`<filter>`), `demo/stories/dock/morph-showcase.vue`,
`src/styles/glass-refract.css`, `tests-visual/playwright.config.ts`, new `tests-visual/liquid-*.spec.ts`.

---

### W8 — Jubilance layer `[MAJOR]`

**Problem.** Zero of the BE.W-DOCK-JUBILANCE delights ship: no fission ripple, no merge-splash
gold-coalesce, no magnetic-tendril, no goo-neck specular sweep, no snap-recoil, no anticipation
pre-dip, no breathing-pill idle, no `useCelebrationBurst`, no `useHaptic`. The split is a damped
control-spring glide to a dead stop (no metaball SNAP). The only idle life is the eq keyframe (a
generic `ease-in-out` on a magic clock). Haptics — the fundamentally tactile iOS cue — is entirely
absent.

**Gestalt approach.** Sequence AFTER the fission/silhouette/bloom engines (delights site AT those
moments). Build standalone primitives early-in-band: `useHaptic` (tiny, feature-detected
`navigator.vibrate`, wired to snap/detent/completion) and `useCelebrationBurst` (one-shot earned
glass-petal bloom, PRM-static) — cheap, reusable, ≥2-consumer-barred. The dock-sited delights
compose into the fission orchestrator's EXISTING rAF (one-loop; `usePointerVelocityField` for the
tendril `--seam-tension`): ripple = a `::before` radial ring on `scale(--split-t)` + `plus-lighter`
over `--glass-specular-core`; merge-splash = a one-shot `--color-gold` flash on the EARNED-gold
register (reading `--metal-glow-*`); neck specular-sweep = an angle-keyed conic masked to the neck
band off `--piece-angle`. Snap-recoil = drive fission on the `bouncy` register (ζ 0.55) so the
islands overshoot-and-settle. Breathing-idle = sub-perceptual `scale(1↔1.012)` on the rest pill
under `no-preference`. ALL compositor-only, PRM-carved, disco-fenced (§6 calm register).

**Files.** new `useCelebrationBurst.ts`/`useHaptic.ts` on `/motion`,
`useDockFission.ts` (the sited delights), `src/styles/glass/liquid-morph.css`.

---

### W9 — No-legacy sweep `[MAJOR]`

**Problem.** Dead paths everywhere (the no-legacy creed forbids all of them):
- The entire `[data-mode=split|union]` register (~250 CSS lines + `split()`/`union()`/`registerPiece`/
  `resolveDirection`/`DIRECTED_SPLIT`/`RADIAL_SPLIT` + 2 v-show-dead sliders) is **unreachable** — the
  playground only offers `expand`/`island`/`player`.
- `expand()`/`collapse()` + the `useLiquidReveal` composition are **never called** (the live "expand"
  is the CSS box-grow) — and they call a composable lazily inside an event handler (onScopeDispose
  no-op leak).
- `--piece-angle`/`--liquid-morph-origin`/`neckHold` are **written-but-unread** (the "goo neck" the
  prose promises is a fiction; the only merge is the feGaussianBlur on a flex row).
- Dead `.liquid-morph-piece` class, `reset()`, `itemsBelow` knob, `@property --rail-position`,
  `RADIAL_SPLIT`/`inward`/`lateral` branches.
- The V↔H reorient is a setTimeout(460ms)-racing-a-440ms-CSS-transition opacity-blink workaround.
- Magic-number soup (~40 literals: island 8.5/2.4/17rem with a hidden 2× relationship, 5 hand-tuned
  cross-fade clamps, 0.44/0.34/0.5s clocks off the `--spring-*-duration` register, 4 near-dup tans).
- De-shadcn residue (the BE.W-DESHADCN-SWEEP exact-6 + 2 raw `bg-card` in the playground).

**Gestalt approach.** Most of this DELETES inside W1–W4 (the split register dies when fission lands;
the expand FLIP dies when BLOOM-UP owns the bloom; the rail forks die when DockStack owns facets; the
reorient blink dies when V↔H is a compositor transform occluded by `startViewTransition`/goo-merge).
Tokenize the load-bearing relationships (one `--liquid-dock-unit` anchor → island/box/gap/radii all
derived; the radius ladder + `--radius-concentric`; the `--card-pad-*` golden ladder; the
`--spring-*-duration` clocks). Run the de-shadcn gate-widen + sweep as a late hygiene band.

**Files.** `src/composables/motion/useLiquidMorph.ts`, `src/styles/glass/liquid-morph.css`,
`src/styles/dock/liquid-rail.css`, `demo/stories/dock/liquid-playground.vue`, the de-shadcn residue files.

---

### W10 — Demo-chassis + more demos `[MAJOR]`

**Problem.** The 7 gallery tiles re-paste the tile chassis (bg/stage/caption/label/hint), the glass
plate triplet, and the `--ex-spring`/`--ex-ease` bezier 5–10× each. Each example uses NONE of the
engine — bespoke CSS-transition facsimiles (the bezier is a 2nd motion authority off the shipped
`--spring-*` register; overshoot `y>1` mis-applied to EFFECTS legs). The "Dynamic Island · Call"
tile does NOT split (it grows downward — the opposite of the reference). 2 live Aurora GL contexts
on one route (the "one GL per route" comment is false). No BE gestalt-roster row → forever unaudited.

**Gestalt approach.** Factor ONE `<DockExampleTile>` demo chassis (bg slot + caption props +
`--ex-spring`→`--spring-snappy` tokens ONCE + the PRM block ONCE). Re-host EVERY example on the real
library primitives (the demo is a CONSUMER, never a re-fork): TabBar→`<SegmentedTabs>`/`<DockTabBar>`,
VolumeHUD→`<GlassControl>`, Spotlight→the search silhouette, AppSwitcher→`useDockContextSilhouette`,
Call→an actual fission. Each then DEMONSTRATES the vocabulary by composing the gated engine. Hoist
ONE shared `<Aurora>` (the `<DockStage>` pattern) for the route. Add BE gestalt-roster rows.

**Files.** new `demo/stories/dock/DockExampleTile.vue`, `dock-gallery.vue`, `examples/*.vue`,
`demo/stories/dock/DockStage.vue`, `docs/tranches/BE/audit/reflect/be-gestalt-roster.md`.

---

### W11 — A11y + publication + gates `[MAJOR]`

**Problem.** The dock root is `role="button" tabindex=0` wrapping real `<button>` children
(nested-interactive — invalid DOM, keyboard-dead controls with placeholder "control N" labels). The
ENTIRE bloomed content (Places/player/island/search) is `aria-hidden` → a screen reader hears an
empty husk. No `.focus-ring` on any control (and the goo `filter:url()` + `clip-path` swallow the UA
ring). The rail is keyboard-dead + wheel-only (touch-dead on iOS). No
`prefers-reduced-transparency`/`prefers-contrast` arm (the plates bypass `--glass-level`). The
playground's `<SegmentedTabs>` ships `aria-orientation` on `role=group` (the BE.W-ARIA-ORIENTATION-GUARD
defect). NOTHING is exported/shipped. `proof:liquid-morph` is the unrelated BC dock gate; the new
1987 lines are ungated. The gallery tiles are consumers of nothing.

**Gestalt approach.** De-shadcn the SEMANTICS: the dock is a presentational `<div>` (the GlassDock
contract); controls are real `<button>`s with the roving-tabindex contract (W-DRAG-MORPH, reused);
the morph trigger is a single named control with `aria-expanded`. `aria-hidden` is STATE-driven
(`:inert` off the morph state, the GlassDock precedent) — only truly decorative layers (goo filter,
blob layer, eq bars) stay hidden; the bloomed sheet is a labelled `role=dialog`/`region` with an
`aria-live` open announcement + real focusable controls. Compose `.focus-ring` (box-shadow survives
`overflow:hidden`, placed on the un-filtered layer). Route plates through `--glass-level` (the
`prefers-reduced-transparency→0` brackets reach for free). Drive the rail off `pointermove`/drag
(touch-capable) + roving-tabindex. Land BE.W-ARIA-ORIENTATION-GUARD (the PagerDots emit-iff-on-role
idiom). Every BE wave ships a born-RED→GREEN proof gate; publish each primitive on its subpath. Widen
`proof:no-layout-animation` to demo/.

**Files.** `liquid-playground.vue`, `src/components/custom/tabs/SegmentedTabs.vue`,
`src/styles/glass/liquid-morph.css`, `src/styles/dock/liquid-rail.css`, all `examples/*.vue`,
`scripts/gates.mjs`, `package.json`.

---

## 3. PRIORITIZED ORDER

The user's 4 reported defects are blockers and lead. Foundation precedes the surfaces that consume it
(the EXECUTION-DAG dependency order).

### Tier 0 — Foundation (parallelizable, unblocks everything)
1. **W5 material tokens** — `--glass-ambient-hue` → `--glass-fill-tint` → `surface="clear"`/
   `--glass-opacity-clear`/`--glass-opacity-sheet`. Cheap, high-leverage, gate-RED→GREEN.
2. **W1 compositor transposition** (core dock box) — flip `proof:no-layout-animation` GREEN; this is
   the precondition the fission spec asserts "stays GREEN by construction" AND the root of user
   defect #3 (the orphan magnifier is a moving-box-anchor race).

### Tier 1 — The engines (the centerpiece)
3. **W2 metaball re-architecture** `[user defect #1]` + **W7 Safari floor** (the goo's sRGB/region/host
   fixes land WITH the goo rebuild — they are the same `<filter>`).
4. **W3 context-silhouette state machine** + **W6 vertical** (W6 falls out of W3's orientation-derived
   slots) `[user defect #2]`.
5. **`useBloomUp`** (W1's shared-element FLIP applied to source≠dest) — fixes user defect #3 (orphan
   magnifier) at the root: the search pill and the sheet field are ONE FLIPping element.

### Tier 2 — The surfaces
6. **W4 rail-as-hairline** `[user defect #4]` — delete the capsule, build DockStack `mode="facets"` +
   the fission→facet hand-off.
7. **`<DockNowPlaying>`** (ScrollingText + live transport + surface=clear + album-hue tint).

### Tier 3 — Polish + hygiene
8. **W8 jubilance** (ripple/splash/tendril/recoil/idle + useHaptic/useCelebrationBurst).
9. **W10 demo-chassis + re-host gallery** on the real primitives.
10. **W11 a11y + publication + gates** (de-nest, state-driven aria, focus-ring, roving rail, ARIA-orientation,
    export, per-wave gates) + **W9 no-legacy sweep** (most deletes already happened in 1–7; finish the
    de-shadcn band + tokenize the magic numbers).

### Tier 4 — Close
11. **W-GESTALT-ROSTER-BE** (the +9 dock-split/pill/rail/bloom/icon-chip-glass rows, born-RED early so
    each wave re-earns its verdict on fresh captures) → **BE.W-CUT** (the siblings-AND-submodule-absent
    `--run full` close-battery).

> **Independent cheap wins that can land any time (no blocking deps):** the BE.W-ARIA-ORIENTATION-GUARD
> one-SFC fix, the CLAUDE.md DockRail doc-reconcile, the de-shadcn exact-6 sweep, `useHaptic`/
> `useCelebrationBurst` as standalone leaves.

---

## 4. ITERATION WORKFLOWS (fan-outs of build agents)

Each workflow is a convergent build loop: a fix-agent-per-wave fan-out, an orchestrator-owned live-π
capture cadence (chrome-devtools-MCP over the `:5199` demo), born-RED→GREEN gates, and a diverse-lens
challenge→harden pass before 2-consecutive-clean (the BC discipline). The prototype spike is harvested
then DELETED in a clean cut — never shipped beside the primitives (the W-PRUNE-CONSOLIDATE no-dual-path floor).

**WF-1 — Foundation (Tier 0).** Fan-out: [W5-ambient] [W5-fill-tint] [W5-clear/sheet] [W1-core-box]
[gate-widen-demo]. Each agent: build the token/transposition, born-RED gate → GREEN, no live-π yet
(device-free). Convergence: `proof:no-layout-animation` GREEN on the rebuilt core box + the material
tokens resolve. **← RECOMMENDED FIRST WORKFLOW.**

**WF-2 — Engines (Tier 1).** Fan-out: [W2-fission+bridge] [W7-goo-safari] (paired — same `<filter>`)
[W3-silhouette+W6-vertical] [useBloomUp]. Orchestrator captures live-π per agent over `:5199`
(the island-rest single-pill seam, the split-snap neck, the silhouette FLIP, the bloom). The webkit
π enrolls here (no source-green close).

**WF-3 — Surfaces (Tier 2).** Fan-out: [W4-rail-facets+hand-off] [DockNowPlaying]. Live-π: the
box-inviolate rail in a real dock gutter (deltaW=deltaH=0), the per-facet accent hues, the now-playing
pill tinting to album hue + ScrollingText scrolling.

**WF-4 — Polish + hygiene (Tier 3).** Fan-out: [W8-jubilance] [W10-demo-chassis+re-host]
[W11-a11y+publish] [W9-no-legacy-sweep+de-shadcn]. Live-π: the ripple/splash/recoil/idle delights,
the re-hosted gallery, the axe-clean a11y tree.

**WF-5 — Close (Tier 4).** Single orchestrated pass: roster grow (born-RED) → each wave re-earns its
`proof:ba-gestalt` verdict on fresh both-mode captures → the prototype DELETE cut → BE.W-CUT siblings-
AND-submodule-absent `--run full` close-battery.

---

## 5. FINDINGS DEDUP TABLE (32 lenses → 11 workstreams)

| Lens | Top finding | → WS |
|------|------------|------|
| island-split, goo-metaball, spacing-proportions, completeness | island rests as 2 abutting blobs → goo waist | W2 |
| morph-mechanism, performance, css-liquid-morph, gallery-* (×6), idiomatic-vue | inline/block-size/max-block-size layout-animation | W1 |
| context-silhouette, be-plan-coverage, no-legacy | hardcoded `data-mode` switch, no descriptor FLIP | W3 |
| rail-architecture, rail-rearchitect, real-glassdock, vertical-orientation | rail = standalone vertical glass capsule | W4 |
| glass-material, dark-mode, completeness | no `.glass-material`; `--glass-edge-light` mis-used; tokens absent | W5 |
| vertical-orientation, css-liquid-morph, mobile-responsive | vertical = `display:none` amputation | W6 |
| safari, glass-material, goo-metaball | no sRGB filter / region / host; lens Chromium-only | W7 |
| animation-jubilance, completeness, be-plan-coverage | zero jubilance delights / no haptics | W8 |
| no-legacy-sweep, engine-useLiquidMorph, css-liquid-morph | dead split/union, dead expand(), dead vars | W9 |
| gallery-architecture, idiomatic-vue, performance | 7 tiles re-paste chassis; CSS-transition facsimiles | W10 |
| accessibility, engine-useLiquidMorph, real-glassdock, be-plan-coverage | nested-interactive, aria-hidden husk, unexported, ungated | W11 |
| expand-sheet, nowplaying-player, morph-mechanism | orphan magnifier = moving-box anchor race | W1+useBloomUp |

---

*Generated from the 32-lens synthesis against `prototype/liquid-dock@198b43cb`, the BE wave specs,
and the iOS-27 references. The architectural creed (no workarounds, no legacy, compositor-safe,
Safari-first, both modes) binds every workstream.*
