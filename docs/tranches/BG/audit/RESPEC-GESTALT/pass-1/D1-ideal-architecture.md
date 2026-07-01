# D1 — the IDEAL glass-ui, from first principles (the north-star lens)

**Auditor scope.** Forget the accretion. Designing this library TODAY — Vue 3.5, Tailwind v4,
reka-ui 2, the liquid-glass iOS-26/27 identity, the same consumer constellation (speedtest, slides,
words, the Atlas) — what is its IDEAL shape? Sketch the ideal (module topology, token basis, motion
engine, component taxonomy, verification machine, demo), then DIFF against HEAD (4.2.0 shipped,
`tranche/BG @ 976dc890`): which deltas are architectural transpositions reachable inside the BG/BH
horizon, which are honest next-tranche seeds, and which parts of HEAD are ALREADY ideal and must be
protected from churn. Every number verified on disk 2026-07-01.

---

## VERDICT

**glass-ui at HEAD is a magnificent MATERIAL trapped in an over-articulated SKELETON.** The bones are
world-class and must not be touched: ONE spring table with a generated per-spring clock, the
`--glass-level`/`--glass-depth` geometry axes, the six-layer glass composite, the compositor-only +
PRM-carved motion discipline, the token-home rule, the ≥2-consumer bar as a *principle*. But the
library has accreted a **surface-count, gate-count, and primitive-count that each exceed the design's
own intrinsic complexity by 3–6×**, and the excess is precisely the "over-contrivance / poor
encapsulation / lacking elegance" the user named. The hard numbers on disk: **96 package exports · 79
per-component subpath barrels · 360 proof gates · 41 motion composables · 99 CSS files (22,334 LOC) ·
156 demo pages** — against a design whose *essential* vocabulary is ~4 glass axes, ~6 springs, ~1 FLIP
inversion, ~1 morph weld, and ~25 component families. The ideal glass-ui is not a different library;
it is THIS library with its indirection collapsed to match its ideas. The single most important
finding of this lens: **the ratio 360 gates : ~90 surfaces : ~25 real ideas is the disease itself** —
the gate machine grew to certify a growth it could not eye-check (A-gate-system F1: the ONE paint
oracle reads a frozen BC roster and passes vacuously), so ceremony replaced sight. The BG/BH horizon
can reach ~40% of the ideal by transposition (motion-engine collapse, tint-axis collapse, gate
drain, the dead-spike deletes); the module-surface re-grain and the missing DS families (Chart,
Calendar, Siri-island) are honest multi-tranche seeds — but ALL of it is nameable now, and this
document is what the next three tranches steer by.

---

## PART I — THE IDEAL glass-ui (first-principles sketch)

### I.1 Module topology — FAMILY-grained public surface, build-grained chunks (the two must decouple)

**HEAD:** 96 `exports` entries / 79 `src/subpaths/*.ts` one-line mirror barrels / 93 component dirs
(50 custom + 43 ui). The per-component subpath explosion exists to make each `dist/<name>.js`
tree-shake independently (CLAUDE.md §Subpath-import-discipline). This **conflates two orthogonal
concerns**: the PUBLIC API grain (what a consumer imports) and the BUILD chunk grain (what
tree-shakes). A consumer does not want to memorize 79 subpath names; a bundler does not need 79
*public* names to split 79 chunks.

**IDEAL:** three tiers.
1. **The root barrel** — vueuse-free curated surface (the L.W1 SCC closure, ALREADY IDEAL — protect).
2. **~15–20 FAMILY subpaths** — `/glass`, `/dock`, `/motion`, `/motion-core`, `/forms`, `/overlay`
   (dialog/sheet/popover/drawer/command), `/nav` (tabs/breadcrumb/menubar/pager), `/feedback`
   (toast/notification/alert/progress/seal), `/data` (chart/table/metric), `/viz` (the generative
   suite), `/configurator`, `/color`, `/dark`, `/keyboard`, `/sidebar`, `/deck`. Each family is a
   curated multi-symbol barrel with a documented SCC posture (vueuse/keyframes/value.js bearing →
   off-root, the existing discipline). The 79 per-component barrels collapse to ~18.
3. **Build chunking stays per-file** — Vite `manualChunks`/per-entry emit keeps `dist/dock.js`,
   `dist/aurora.js` independently shakeable WITHOUT a public subpath name. A family import
   (`from "@mkbabb/glass-ui/viz"`) still resolves to the fine-grained chunk graph; the consumer never
   names `aurora.js`, the bundler still splits it.

This is a **breaking public-surface change** (a NEXT-TRANCHE seed, not BG/BH — it touches every
consumer import), but it is the single largest encapsulation win available and it is nameable now.
The `/api` discovery layer (BH already plans to DROP it per the BH tranche memory) is the right
instinct in the wrong direction: the ideal is not "one flat types barrel," it is "family barrels that
ARE the discovery surface."

### I.2 Token basis — the minimal orthogonal set (2 chromatic pairs + 2 geometry scalars)

**HEAD (A-glass-token F4/F5):** FIVE chromatic glass axes (`--glass-tint-source/-strength`,
`--glass-accent/-strength`, `--glass-fill-tint/-strength`, `--glass-ambient-hue/-strength`,
`--glass-backdrop/-luma`) + two geometry scalars (`--glass-level`, `--glass-depth`). THREE of the
chromatic axes do the *identical* `color-mix(in oklab, plate, hue strength)` op at three nominal
"layers"; ONE (`--glass-ambient-*`) is read everywhere and **written nowhere** — structurally always
0% (A-glass-token F5, verified: `grep --glass-ambient-strength:` → zero declarations). Plus the
per-register re-pasted idioms (tint-floor 12%/15% typed twice, press-squash `scale:1.04 0.94` typed
3×, `--motion-weight:1` typed 4×, warm-zero stop typed 5×).

**IDEAL:** ONE chromatic tint OPERATION — `(hue, strength)` — hitting at most TWO targets:
- **plate** (`--glass-tint`, `--glass-tint-strength`) — the body darken/lift/data-hue, with three
  *named STRENGTH presets* (AA-legibility ≈ 20% · data-hue ≈ variable · ambient ≈ sub-perceptual),
  NOT three token pairs.
- **rim** (`--glass-accent`, `--glass-accent-strength`) — the per-instance chromatic rim + specular
  core.

Plus TWO geometry scalars (`--glass-level` = opacity+blur, `--glass-depth` = diffusion) and ONE
discrete/continuous darken TRIGGER (`--glass-backdrop`/`-luma`, the observer's write — a signal, not
a paint axis). The re-pasted idioms become shared primitives: ONE `--glass-tint-floor`, ONE
`.glass-press-squash`, ONE `.loud`, ONE `--glass-warm-zero`. This is a **4-axis system with 3 presets
and 4 shared idioms** — down from 5 axes + 5 idiom re-pastes. The cast-ink chroma-floor surgery
(`max(c, 0.11)` → maroon) is DELETED: a cel ink is `--foreground` at low alpha (already warm by
identity), no chroma math (A-glass-token F1, P-design-adherence F1). BG.W-GLASS-TINT-UNIFY +
BG.W-GLASS-IDIOM-FACTOR + BG.W-CAST-INK-DEMAROON already spec this — it is BG-reachable.

### I.3 Motion engine — ONE table → ONE FLIP → ONE weld → thin presets

**HEAD (A-motion F1-F5):** the FOUNDATION is ideal (ONE `SPRING_PRESETS` table + `regen-spring-tokens`
+ per-spring `-duration` clock + compositor-only). The LAYER ABOVE is the sprawl: **FOUR dock-morph
engines** (`dockMorphContext`, `useDockOrientationMorph`, `useMorphField`+`useGooMorph`,
`useLiquidMorph`) none sharing code; **THREE near-duplicate FLIP runners** (`useLiquidReveal` 285L,
`useBloomUp` 449L, `useDockCtaReceive` 349L) each hand-rolling the identical
`ElementMorph`+`springTimingFunction`+3-channel-rAF loop; `useLiquidMorph` (462L) with **ZERO real
consumers** (verified: only `demo/stories/manifest.ts` prose references it); the published kf
`flipShared` runner **imported and never used** (verified: `suite.ts:42` import, no call site). That
is ~3,011 LOC across 9 morph/reveal/press files, ~1,100 of it redundant or dead.

**IDEAL topology:**
```
SPRING_PRESETS (6 rows) ──► regen ──► --spring-*/-duration tokens        [PROTECT — ideal]
        │
        ├─ useSpring / useSpringPress (the physics leaf)                  [PROTECT]
        │
        ├─ useFlip(source, dest, {direction, channels})  over kf flipShared
        │       └─ reveal (1→0) · receive (0→1) · bloom (1→0 + color)     [ONE runner, 3 presets]
        │
        └─ useMorphField (the weld — scalar drive + field projection)     [the ONE morph spine]
                └─ signatures: collapse · axialNeck · lateralNeck · fission
                        └─ dock V↔H, dock collapse, goo-morph, fission all DRIVE THROUGH it
```
Everything morph-shaped flows through the weld; everything FLIP-shaped flows through `useFlip`;
`useLiquidMorph` is DELETED. The dock V↔H finally inherits arcs/overlapping/follow-through (the
12-laws, currently trapped inside a weld the dock never imports — A-motion F2/F8). Result: ~1,100 LOC
removed, the "ONE engine" claim becomes true instead of aspirational. BG.W-MORPH-ENGINE-ONE +
BG.W-FLIP-ONE + BG.W-SPIKE-DELETE spec this — BG-reachable.

### I.4 Component taxonomy — four honest tiers, the grab-bag drained

**HEAD:** `ui/` (43 shadcn-wrapped primitives) + `custom/` (50 dirs) — a real split in principle, but
`custom/` is a grab-bag mixing COMPOSED components (dock, configurator, timeline), GENERATIVE viz
(aurora, goo-blob, dot-flow, fourier, 7-member suite), and singleton focal surfaces (border-progress,
completion-seal, glass-island-when-it-lands). Two signature DS families are ABSENT
(P-firstprinciples F2): **no data-Chart** (line/bar/area/sparkline — the `--chart-*` tokens have no
consumer; the only thing a real data app *cannot* do), **no Calendar/DatePicker** (the iOS date-wheel
signature). And the user's explicit headline capability — the **Siri glass-island + warm waveform +
Dynamic-Island** — has ZERO visual surface (`waveformValue` math ships via `/motion`; no
`<SiriWaveform>`, no `<GlassIsland>`; P-firstprinciples F1, the single largest genuinely-missing
capability).

**IDEAL taxonomy:**
1. **Primitives** (`ui/`) — reka-wrapped four-state atoms. Add `<Calendar>`, `<Kbd>`, `<Breadcrumb>`,
   `<AspectRatio>` (the standard-DS tail, decide-don't-overfit against the ≥2 bar).
2. **Composed** — dock family, configurator, forms, overlays, feedback. Add `<DatePicker>`.
3. **Generative viz** — the 7-member procedural suite (ALREADY IDEAL as a family — protect; it earns
   its keep as the material showcase).
4. **Data** — `<GlassChart>` (SVG-path, native-first, no charting dep), `<MetricStack>`, `<Table>`.
5. **Focal / new-capability** — `<GlassIsland>` + `<SiriWaveform>` (the descend/morph/retract surface
   composing the SHIPPED `useLiquidReveal` FLIP + `--glass-deep` + a NEW `--glass-blur-engage-t`
   backdrop-engage ramp + the warm `--siri-*` gradient family), deftly bridged to the dock context so
   the Dynamic-Island *is* the island docked at the top.

The Chart + Siri-island are the two capabilities that most change what the library *is* — Chart makes
it a general application DS instead of a glass showcase; the island answers the user's explicit BG
ask. Both are BG headline waves (BG.W-CHART-FAMILY, BG.W-SIRI-ISLAND already specced in
P-firstprinciples). Calendar is a MEDIUM BG/BH item; the DS tail (Kbd/Breadcrumb/Stepper/Tree) is a
decide-don't-overfit census — mostly next-tranche.

### I.5 Verification machine — FEWER, LOAD-BEARING, live-render-gated (the 360→~60 drain)

**HEAD (A-gate-system, the most important structural finding in the whole corpus):** 360 proof gates,
~340 of them device-free SOURCE scans, and the ONE gate designed to bridge source→paint
(`proof:ba-gestalt`) is **vacuous** — it reads a frozen BC roster (F1: consts still point
`docs/tranches/BC/...`, the specced `BD.W-GESTALT-ROSTER-GROW` never ran), its freshness whitelist is
author-self-certified and narrow (F2: `paper.css`/`AppShell.vue`/`SectionLanding.vue` watched by
NOTHING), its probe boxes are tiny warm-cream-vs-grey tests that cannot see a red cast / metallic
field / frozen route / dead preview (F3/RC3), and the only live-pixel layer (~79 `tests-visual` specs)
is `local`-only and severed from the shipping tag (F5/RC2). **360 gates certified a green battery over
a visibly-broken 4.2.0.** The gate:idea ratio (360 gates : ~25 real ideas ≈ 14:1) IS the
over-contrivance — the machine grew to police a growth it stopped eye-checking.

**IDEAL verification machine — two thin layers:**
- **~12–15 INVARIANT source gates** (not per-feature): `no-dual-path`, `no-layout-animation`,
  `token-home` (every feature-token has one declaring home + ≥2 readers), `consumer-bar` (every
  src/ artefact has ≥2 real call-sites or is exported/private-demo), `spring-tokens-synced`,
  `subpath-enumeration`, `peer-conformance`, `glass-cohesion`, `colocation`, `claude-structure-sync`,
  `disposition-live`, the deferred-ledger. These are the load-bearing structural floors — each
  catches a CLASS, not an instance. The per-feature gates (`proof:icon-chip`, `proof:metal-shimmer`,
  `proof:dock-cockpit`, ~300 of them) collapse: a feature's *correctness* is proven by its π at
  authoring; its *survival* is proven by the invariant gates, not a bespoke source scan that re-reads
  its own tokens.
- **~1 LIVE-RENDER gate per surface FAMILY**, release-gated, running against a served demo BEFORE the
  tag: `route-navigates` (DOM: old-page-gone + single-child `<main>`), `field-aurora` (full-page
  region reads warm-aurora hue, chroma ≤ ceiling), `previews-render` (live content-bearing pixels),
  and the per-family gestalt roster with a **DERIVED** (not author-declared) surface-path set + a
  widened structural pixel vocabulary (hue-band, chroma-ceiling, edge-cast, top-bar, corner-clip).
  This is the layer that makes "pixels actually painted" a precondition of the tag — the RC2/RC4 cure.

360 → ~60 gates (15 invariant + ~10 live-render + the ~35 genuinely-load-bearing family gates that
prove a real distinguishing bite). The drain is not "test less" — it is "stop proving the same token
reads itself 300 times, start proving the page renders once." A-gate-system's six proposed waves
(GATE-ROUTING-LIVE, GATE-FIELD-AURORA, GATE-PREVIEWS-RENDER, GATE-UNIFORM-BLUR, GESTALT-ROSTER-REPOINT,
SHIP-DISCIPLINE-LIVE-PRECONDITION) build the live layer; a NEW **BG.W-GATE-DRAIN** is owed for the
source-gate collapse (see fold candidates).

### I.6 Demo — the demo IS the spec: live components, one shared field, no clones

**HEAD (P-firstprinciples F5, P-design-adherence F9):** 156 pages reading as "a museum of cloned Apple
apps" (dock-hub hardcoding "Costco Wholesale," a barber, `{label:"Maps"}`), category landings shipping
FROZEN aurora stills + tiny icons instead of live previews (`SectionLanding.vue:51` explicitly
"FROZEN STILL, NOT a live GL"), and the routing layer FROZEN by four overlapping motion systems
(A-motion F1, P-design-adherence F4 — the linchpin).

**IDEAL demo:** the storybook IS the design spec — every category card mounts a LIVE cheap-DOM real
primitive (a real `<Button>`, `<Slider>`, glass `<Card>` — costs nothing on the GL budget), the page
field is ONE shared offscreen-paused `<Aurora>` per route (the `<DockStage>` pattern generalized,
reconciling §L7's one-GL-per-route fence with the user's aurora-everywhere directive), the route
transition is ONE idiomatic spring-clocked Vue `<Transition>` (the `.scroll-build` mount-animation
moved OFF the transitioned root), and the cloned-Apple gallery is replaced by the real library
primitives it was faking. The demo proves *the vocabulary*, not *that we copied iOS*.

---

## PART II — THE DIFF: HEAD vs IDEAL, bucketed by horizon

### II.A — ACHIEVABLE inside BG/BH as architectural transpositions (fold candidates)

| Ideal delta | HEAD gap | Transposition | Wave |
|---|---|---|---|
| ONE FLIP runner | 3 dup runners + dead `flipShared` import | `useFlip` over kf `flipShared`; reveal/receive/bloom = directions | BG.W-FLIP-ONE (specced) |
| ONE morph weld | 4 dock-morph engines; `useLiquidMorph` dead | re-point dock V↔H onto `useMorphField`; DELETE `useLiquidMorph` (462L, 0 consumers) | BG.W-MORPH-ENGINE-ONE + BG.W-SPIKE-DELETE (specced) |
| 4-axis glass tint | 5 axes, 1 inert, idioms re-pasted | collapse to plate+rim pairs; factor floor/squash/loud/zero | BG.W-GLASS-TINT-UNIFY + BG.W-GLASS-IDIOM-FACTOR (specced) |
| cast ink = `--foreground` | `max(c,0.11)` → maroon | delete chroma-floor surgery | BG.W-CAST-INK-DEMAROON (specced) |
| ONE route transition | 4 overlapping motion systems, frozen | `.scroll-build` off transitioned root; delete 2 no-op VT watchers + bloom hack | BG.W-ROUTE-TRANSITION-ONE (specced) |
| aurora-everywhere | CSS `.paper-field` metallic wash | ONE shared offscreen-paused `<Aurora>` per route | BG.W-AURORA-EVERYWHERE / W-FIELD-TO-AURORA (specced) |
| live previews | frozen stills + icons | cheap-DOM live primitives | BG.W-LIVE-PREVIEWS (specced) |
| gate drain | 360 gates, ~300 per-feature source scans | collapse per-feature gates to ~15 invariants + ~10 live-render | **BG.W-GATE-DRAIN (NEW — owed)** |
| dead-spike delete | `useLiquidMorph`, `liquid-morph.css` (850L demo-only), dead jubilance/silhouette | delete + wire-or-retire | BG.W-SPIKE-DELETE + BG.W-JUBILANCE-DECIDE (specced) |
| Siri island | absent (math only) | new `/glass-island` family over shipped FLIP + deep-glass + new engage-ramp | BG.W-SIRI-ISLAND (specced, headline) |
| Chart family | absent | thin SVG-path `<GlassChart>`, no dep | BG.W-CHART-FAMILY (specced) |

The ~40%-of-ideal reachable in BG/BH is dominated by DELETION and COLLAPSE (motion sprawl, tint axes,
gate ceremony, dead spikes) plus the TWO headline additions (island, chart). These are transpositions,
not patches — each removes a mechanism rather than adding a workaround.

### II.B — NEXT-TRANCHE SEEDS (honest — the "long horizon multi-tranche refinement")

1. **Module-surface re-grain (79 subpaths → ~18 family barrels).** A breaking public API change
   touching every consumer import; decouple public grain from build chunk grain (I.1). This is the
   biggest encapsulation win and it is a WHOLE TRANCHE (a `BH/BI`-scale reshape + a MIGRATION.md +
   the constellation consume-and-delete cadence). Name it a successor seed now; do NOT attempt it
   piecemeal in BG.
2. **The DS-completeness tail** — Calendar/DatePicker (MEDIUM, possibly late-BG), then Kbd /
   Breadcrumb / Stepper / TreeView / Menubar / Resizable / ScrollArea / FileUpload / Rating — a
   decide-don't-overfit census where MOST defer to a consumer-triggered mint (P-firstprinciples F2/
   BG.W-DS-COMPLETE, sequenced LOW). The census belongs in BG; the builds are next-tranche.
3. **The DYNAMIC glass terms** — moving/adaptive shadow, live-animatable refraction (the
   `feDisplacementMap scale` inline-SVG-mount transposition, CSSWG #542), hue-BLEED transmission (the
   chroma term on the observer), chromatic-aberration RGB-split rim (P-firstprinciples F3,
   BG.W-GLASS-DYNAMICS). The hue-bleed + one dynamic term are BG-reachable; the full set (chromatic
   aberration, live refraction mount) is a fidelity frontier spanning BG→next.
4. **The generalized liquid-ENTRANCE** (`v-liquid-enter` every surface opts into, ~0.88 vol-preserving
   squish, Safari-verified) — partly BG (the calibration), fully next (the universal generalization,
   P-firstprinciples F4/BG.W-LIQUID-ENTRANCE-GENERAL).
5. **A genuine Safari-parity CADENCE** (not a hand-assertion) as a standing gate under every new glass/
   goo/island surface — BG mints the gate (BG.W-SAFARI-PARITY-GATE, specced), the cadence matures
   across tranches.

### II.C — ALREADY IDEAL at HEAD (PROTECT from churn — do NOT let a BG wave touch these)

- **The spring foundation.** ONE `SPRING_PRESETS` table + `regen-spring-tokens.mjs` + the analytic
  per-spring `-duration` clock + the SPATIAL/EFFECTS split. A-motion F-header confirms it "genuinely
  good and correct." The only owed edit is draining the 3 hyper-specific `timeline-*` rows to a
  per-component allowlist (BG.W-SPRING-REGISTER-TIDY) — a tidy, NOT a rework.
- **The `--glass-level` / `--glass-depth` geometry composition.** ONE knob threading opacity+blur, the
  opaque escape + a11y brackets riding the same level path (AX.W54). Do not re-plumb.
- **The six-layer glass composite + the `.glass-capsule` body unification** (A-glass-token F6 calls it
  a genuine positive: ~17 component consumers, `.glass-atom`/`.glass-chip` COMPOSE it, distinct-not-
  fork). The BODY is unified; only the DECORATIONS need factoring (II.A).
- **The compositor-only + PRM-carved motion discipline** (`proof:no-layout-animation` extended in
  place; P-design-adherence F11 confirms the motion VOCABULARY is right — the failures are
  layer-placement + token-calibration, not vocabulary).
- **The generative viz suite** as a family (7 members over ONE `createCanvasLifecycle` leaf + the
  WebGPU/WebGL2/Canvas2D three-backend picker). The substrate unification is real and elegant.
- **The token-home rule + the ≥2-consumer bar as PRINCIPLES.** They are the right laws; the failure is
  that the enforcement (gates) grew to 360 ceremonial instances. Keep the laws, drain the gates.

---

## PART III — FINDINGS (ranked by severity, this lens's own)

### D1-F1 (CRITICAL) — the gate:idea ratio IS the over-contrivance the user named
360 proof gates : ~90 public surfaces : ~25 essential ideas. ~340 are device-free source scans, many
re-proving a feature's own tokens (`proof:icon-chip`, `proof:metal-shimmer`, `proof:dock-cockpit`,
`proof:card-tier-alpha`, ...). The ONE paint oracle is vacuous (A-gate-system F1, verified: consts
point at `docs/tranches/BC/`, `bd-gestalt-roster.md` absent, the specced grow never ran). **The machine
grew to certify a growth it stopped eye-checking** — ceremony replacing sight is the mechanical form of
"lacking elegance." Fix: the II.A/I.5 gate drain (360→~60), live-render-gated tag.

### D1-F2 (CRITICAL) — the motion layer above the ideal foundation is ~1,100 redundant/dead LOC
Verified: `useLiquidMorph.ts` (462L) has ZERO real consumers (only `manifest.ts` prose); the FLIP trio
(`useLiquidReveal` 285 + `useBloomUp` 449 + `useDockCtaReceive` 349) hand-rolls the identical rAF loop
3×; the kf `flipShared` that would unify them is imported (`suite.ts:42`) and never called; FOUR
dock-morph engines share no code (A-motion F1-F3). The foundation is ideal; the layer above is the
sprawl. Fix: I.3 collapse (BG.W-FLIP-ONE + BG.W-MORPH-ENGINE-ONE + BG.W-SPIKE-DELETE).

### D1-F3 (MAJOR) — the public surface (79 subpaths) conflates API grain with build-chunk grain
79 one-line mirror barrels + 96 exports for a library whose ideal public grain is ~18 family barrels
(I.1). The consumer memorizes 79 names to get chunk-splitting a bundler already does per-file. This is
the "poor encapsulation / 76-entry subpath sprawl" critique made structural. Fix: the next-tranche
re-grain (II.B.1) — nameable now, breaking, not BG-piecemeal.

### D1-F4 (MAJOR) — the token basis carries a phantom axis + re-pasted idioms
5 chromatic glass axes where the design has 2 targets; `--glass-ambient-*` read everywhere written
nowhere (A-glass-token F5, verified inert); the tint-floor/press-squash/loud/warm-zero idioms typed
2–5× each (A-glass-token F6). "One operation, five names" is axis proliferation — the "lacking
elegance" critique at the token layer. Fix: I.2 collapse (BG.W-GLASS-TINT-UNIFY + W-GLASS-IDIOM-FACTOR).

### D1-F5 (MAJOR) — two signature DS families + the user's headline capability are absent
No data-Chart (the `--chart-*` tokens have no consumer; the only thing a real data app cannot do,
P-firstprinciples F2), no Calendar/DatePicker (the iOS date-wheel signature), and ZERO visual surface
for the Siri glass-island + waveform the user named the BG headline (P-firstprinciples F1 — math ships,
components do not). The library is a glass-material showcase that is component-incomplete as a general
DS. Fix: BG.W-CHART-FAMILY + BG.W-SIRI-ISLAND (headline) + BG.W-DATE-CALENDAR.

### D1-F6 (MAJOR) — the demo reverses user intent to satisfy a budget, and the routing that hosts it is frozen
Frozen-still previews + CSS metallic field chosen to honor the one-GL budget, but the budget-preserving
choice FAILED the user's stated acceptance bar (aurora-everywhere, live previews, P-design-adherence
F2/F9); the route transition is jammed by 4 overlapping motion systems (A-motion F1, the linchpin).
The demo — which IS the design spec — does not read as one designed system. Fix: BG.W-ROUTE-
TRANSITION-ONE + BG.W-AURORA-EVERYWHERE + BG.W-LIVE-PREVIEWS.

### D1-F7 (MINOR) — "honest future" dead mechanisms ship in critical CSS
`--cartoon-cast-dx/dy` (dead transition legs, no DOM bridge writer), `--glass-depth` lerp (2 static
consumers, no host animates it), `--glass-saturate-deep-ceiling` / `--glass-spine-*` (0 readers),
`liquid-morph.css` (850L in `src/styles/glass/`, `@import`ed by demo ONLY — A-glass-token F7/F8). "No
legacy" means a mechanism with no driver does not exist. Fix: BG.W-GLASS-IDIOM-FACTOR (delete tokens) +
BG.W-LIQUID-MORPH-REHOME.

---

## PART IV — FOLD CANDIDATES (the AMENDED-GESTALT-PLAN inputs)

The sibling P/A/D lenses already spec the individual fix waves; this NORTH-STAR lens folds three
GESTALT-LEVEL waves the siblings do NOT own — the ones that make the AMENDED plan a *simplification*,
not another accretion — plus one plan-doc edit and one honest defer.

### FC-1 (NEW WAVE) — **BG.W-GATE-DRAIN**: collapse 360 gates → ~15 invariants + ~10 live-render
- **Kind:** new-wave (Band-0, sequenced AFTER the live-render gates land so the drain has a backstop).
- **Gestalt approach.** The per-feature source gate is the ceremony. Transposition: (a) the ~15
  INVARIANT gates (no-dual-path, no-layout-animation, token-home, consumer-bar, glass-cohesion,
  colocation, structure-sync, spring-synced, subpath-enum, peer-conformance, disposition-live,
  deferred-ledger, + the ~3 live-render family gates) become the STANDING battery; (b) every
  per-feature `proof:<feature>` gate is AUDITED — if its distinguishing bite is subsumed by an
  invariant (a token re-reading itself → token-home; a fork check → no-dual-path), it RETIRES; if it
  proves a genuine feature invariant with a real self-test bite, it stays. Target: 360 → ~60. The
  gate's *correctness* proof moves to the feature's π (authored once); its *survival* proof is the
  invariants. This is the mechanical cure for D1-F1 (the ratio) and the user's "360 ceremony gates"
  over-contrivance. **Fable arm:** none (mechanical). **Bar:** the retired gates' bites are
  demonstrably subsumed (a census table: gate → subsuming-invariant OR kept-with-rationale); the
  `--run full` battery stays green over real code with ~60 gates; born-RED against a synthetic feature
  whose invariant-only coverage would have missed a planted regression (proving the invariants are
  load-bearing).

### FC-2 (MERGE-WAVES) — fold the 6 motion-collapse + 4 glass-collapse waves into TWO gestalt spines
- **Kind:** merge-waves.
- **Gestalt approach.** The sibling audits spec BG.W-FLIP-ONE, W-MORPH-ENGINE-ONE, W-SPIKE-DELETE,
  W-PRESS-MOUNT-RECONCILE, W-VH-MORPH-IN-DOCK, W-SPRING-REGISTER-TIDY (motion) and W-GLASS-TINT-UNIFY,
  W-GLASS-IDIOM-FACTOR, W-CAST-INK-DEMAROON, W-LIQUID-MORPH-REHOME (glass) as ~10 waves. They are TWO
  refactors: **W-MOTION-SPINE** (ONE table → ONE FLIP → ONE weld → thin presets; deletes the dead
  spike; drains the timeline springs; re-homes the dock V↔H onto the weld in-place — the whole I.3
  topology in one coherent landing) and **W-GLASS-BASIS** (2 chromatic pairs + 2 geometry scalars + 4
  factored idioms + the demaroon'd cast + the re-homed `liquid-morph.css` — the whole I.2 topology in
  one landing). Merging is the point: these are not 10 independent patches, they are 2 architectural
  transpositions, and shipping them as 2 waves (each with ONE coherent π) is more elegant and less
  granularity-diseased than 10 rows. **Fable arm:** W-GLASS-BASIS needs a Fable design pass on the
  demaroon'd cast + collapsed-tint gestalt (DesignSync the glass-band surfaces); W-MOTION-SPINE is
  mechanical (the visual output is byte-identical-or-better by construction). **Bar:** each merged wave
  has ONE π proving the collapse painted identically-or-better; `useLiquidMorph` DEFINITION-ABSENT;
  ≤2 chromatic tint pairs exist; ONE FLIP rAF loop in `src/`.

### FC-3 (AMEND-WAVE) — BG.W-SIRI-ISLAND + BG.W-CHART-FAMILY carry the family-barrel POSTURE, not a 78th subpath
- **Kind:** amend-wave.
- **Gestalt approach.** The two new families are the moment to STOP the subpath explosion instead of
  feeding it. Amend both waves so the island lands on a `/focal` (or the existing off-root focal
  posture) family barrel and the chart on a `/data` family barrel — NOT `/glass-island` +
  `/glass-chart` as two more per-component subpaths (which would take 79→81 and deepen D1-F3). This is
  the first down-payment on the II.B.1 re-grain: new families demonstrate the family-barrel grain the
  re-grain will generalize. **Fable arm:** both are heavily visual (island descend/glow/waveform,
  chart glass-tier) → Fable design arms + DesignSync review surfaces per the standing directive.
  **Bar:** the island + chart ship under FAMILY barrels; the subpath count does not grow by 2
  singleton entries; the `/api` discovery drop (BH) is coordinated so the families ARE the discovery
  surface.

### FC-4 (PLAN-DOC-EDIT) — record the module-surface re-grain as an explicit SUCCESSOR-TRANCHE SEED
- **Kind:** plan-doc-edit.
- **Gestalt approach.** The 79→18 re-grain (II.B.1) is the largest encapsulation win and it is NOT
  BG/BH-safe (breaking, every-consumer). The AMENDED-GESTALT-PLAN must NAME it as a successor seed
  with an honest trigger (the BH `/api`-drop + export-reshape is the first move; the full family
  re-grain is the tranche AFTER) — so it is neither silently dropped nor half-attempted piecemeal in
  BG. Add a "Successor-Tranche Seeds" section to AMENDED-GESTALT-PLAN.md: (1) module re-grain, (2)
  DS-completeness builds, (3) full dynamic-glass terms, (4) universal liquid-entrance, (5) Safari
  cadence maturation. **Bar:** the seed is recorded with its trigger + first-move + why-not-BG.

### FC-5 (DEFER-HONEST) — the DYNAMIC glass terms split BG-reachable vs frontier
- **Kind:** defer-honest.
- **Gestalt approach.** P-firstprinciples F3 + BG.W-GLASS-DYNAMICS bundle four dynamic terms. Two are
  BG-reachable (the hue-BLEED chroma term on the observer — feeds the EXISTING `--glass-accent` axis,
  a real build; the moving/adaptive shadow — the `--shadow-cast-dx/dy` prose made real, compositor-
  only). Two are frontier (live-animatable refraction needs the inline-SVG `feDisplacementMap scale`
  mount transposition, CSSWG #542; chromatic-aberration RGB-split rim needs 3 SVG passes under the
  perf budget). Honestly split: BG builds the hue-bleed + moving-shadow (the visible dynamic terms the
  user reads); the refraction-mount + aberration are DEFER-with-trigger (record the transposition, not
  a re-prose). This prevents BG.W-GLASS-DYNAMICS from being another "documented + booked" prose wave —
  it builds the reachable half and honestly defers the frontier half. **Bar:** the two built terms
  have live π (the cast travels opposite the gesture; the dock over a purple card resolves a purple-
  shifted rim); the two deferred terms carry a NAMED transposition + trigger in the deferred ledger.

---

## No-churn attestation (what this lens forbids touching)

The BG/BH waves must NOT re-plumb: the `SPRING_PRESETS` table + generator, the `--glass-level`/`-depth`
geometry axes, the `.glass-capsule` body unification, the `createCanvasLifecycle` three-backend
substrate, the compositor-only/PRM discipline, or the token-home/≥2-consumer LAWS (only their 360-gate
enforcement drains). These are the ideal already realized; churning them is the exact "missing obvious
issues / lacking elegance" failure inverted. The north star is: **delete and collapse toward the ideas
the design already has, add the two families the user asked for, and make the demo render — do not add
a single mechanism a simpler transposition of an existing one can serve.**
