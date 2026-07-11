# D-GLASS · PASS-1 — Surface-taxonomy simplification + the binding geometry grammar

Synthesized 2026-07-11 from three independent family returns (GLASS-A two-axis collapse ·
GLASS-B material classes · GLASS-C geometry grammar). Verified against the working tree at
synthesis time (key claims spot-checked in-source; per-claim verification notes inline).

## §0 · Problem restated

Two coupled defect clusters, one design problem:

1. **Surface sprawl.** ~18 named glass registers; duplicated systems under multiple names
   (panes vs cards); `GlassPanel` likely superseded by the Card system; 10 `--glass-bg-*`
   token rungs where 5 + a scoped α override would do; dead classes (`.floating-panel`,
   `.glass-hero`, the `.glass-card` alias); a `surfaceClass(...).replace(/^glass-\w+\s*/,'')`
   DRY wart copy-pasted across SFCs (verified: `Card.vue:412`, `SheetContent.vue:92`, + the
   sibling Content SFCs). Plus: "the blur could be muted ever so slightly" on buttons.
2. **Geometry lawlessness.** Capsule radii on multi-row surfaces (the vertical tab track
   ballooning — verified: `segmented-tabs.css:46` binds `--bouncy-slider-radius:
   var(--radius-tab)` = `--radius-pill` = 9999px on a 92×132 column); nested radii unrelated
   (no concentric law); the configurator sheet's section geometry ad-hoc; metal rims via
   `border-image` squaring corners on rounded cards (verified: `utilities/metal.css:122`);
   the hard cartoon offset-stamp shadow poking off pill CTAs (the "corner slab").

**The key reframe (GLASS-A's finding, verified):** the (tier × decoration) axis grammar
ALREADY EXISTS — `Surface = glass|veil|opaque|clear` + `surfaceClass()` +
`[data-surface]` (`src/components/ui/_shared/useSurfaceAxis.ts`, `_shared/axes.ts`,
`src/styles/glass/surface-axis.css`) — and is threaded through ~12–20 components. The work
is NOT a new axis system; it is finishing the collapse the grammar already promised
(component/class/token layer) and binding the geometry laws the radius ladder never had.

## §1 · Family verdicts

| Family | Verdict | Why (one line each) |
|---|---|---|
| **GLASS-A** two-axis collapse | **ADVANCE** (lead) | Completes the existing grammar; hard-measured prune inventory (GlassPanel=1 consumer, floating-panel=0, dialog/sheet rungs = re-declared dupes of floating/overlay); the `<Surface>` split + `decorationClass()` kills the verified `.replace()` wart; deletes the Chromium-only SVG-filter fork. Confidence 82, risks named with concrete probes. |
| **GLASS-C** geometry grammar | **ADVANCE** (orthogonal peer) | Four decidable laws, each grounded in a live DOM measurement and each composing a PROVEN in-repo mechanism (`segmented-tabs.css:47` concentric calc; `border-progress.css:61-65` mask-composite band; `rim.css` inset-ring). Not competing with A — it binds ON A's output. Confidence 80. |
| **GLASS-B** material classes | **BANK** (named re-trigger) + immediate hybrid extraction | Its own honest verdict concedes pure-B fails consumer-KISS: ~9 portaled surfaces force a prop back anyway (an untyped `contentClass` is strictly worse than the typed enum), and the tier-override cascade is unreliable (`cn()` cannot dedup non-Tailwind `@layer components` classes — bundle source order wins, not the consumer). **Re-trigger:** IF pass-2 probe P2 shows (a) a `cn()` surface-conflict bucket makes the class override reliable AND (b) the sibling grep shows consumers rarely set the surface axis (<10% of usages), re-open classes-as-public-API. Three of its mechanisms are independently developed and are ADOPTED NOW into the hybrid (§2). |

Premature-convergence check: A and C are both genuinely advanced and non-overlapping
(taxonomy vs geometry); B's competitive core (classes replace props) is dominated on the
evidence B itself produced, but its verified findings are load-bearing and folded in — a
BANK, not a RETIRE, because the cascade-probe result could genuinely revive it.

## §2 · The leading composition (the hybrid)

**A is the chassis; B contributes three mechanisms; C binds the geometry on A's primitive.**

From **GLASS-B → into A** (each independently verified by B in-source):

1. **The emission mandate.** Every public surface/decoration class ships as an
   `@layer components` LITERAL in `dist/glass-ui.css` — never `@utility` (JIT-gated).
   Verified live: `veil-surface` is `@utility` at `cards.css:445` — a consumer-authored
   class that the consumer's Tailwind never scans silently paints NOTHING (the
   BA.W-EMISSION failure class; masking-adjacent, forbidden). Convert `veil-surface` (and
   any other `@utility` decoration) to a literal rule. The tier ladder is already
   `@layer components` (safe); re-verify on a fresh build.
2. **The inline-ladder-duplicate census.** `.floating-panel` (`floating-panel.css`),
   `.hover-popover` (`hover-popover.css`), and the `instrument-chassis` bezel FILL
   re-declare ladder tokens inline instead of composing the tier class — these are the
   literal "panes vs cards" duplicates the user named. Fold each onto composing the ladder
   (or delete where 0-consumer — floating-panel verified 0 refs in src/ + demo/).
3. **The classes-are-truth framing.** The tier/decoration classes are the documented,
   shipped, public source of truth; the typed `surface`/`tier` props survive as
   **typed couriers** that resolve to those same classes (mandatory for the ~9 reka-portaled
   overlays where a consumer `class` cannot cross the portal; kept on the rest for
   autocomplete/typo-safety). No component-private surface recipe exists anywhere.

From **GLASS-C → onto A**: the `<Surface>` primitive (and Card/Dialog/Sheet roots) publish
the concentric relay tokens (`--radius-ctx`, `--radius-inset`); the capsule/chip/atom fence
in A's taxonomy IS Law 2's capsule-vs-card boundary; the rim grammar (Law 3) replaces
`metal.css`'s border-image; Law 4 gates the cartoon-cast off pill silhouettes.

## §3 · The simplified taxonomy (mechanism)

### 3a. The two canonical axes (keep — sound substrate)

- **TIER** (prominence): the 5-rung ladder `{wash 0.30 · quiet 0.50 · resting 0.65 ·
  floating 0.80 · overlay 0.95}`, ONE recipe in `tokens/glass.css` (`color-mix(in srgb,
  var(--card) …, transparent)` threaded through `--glass-level` + the `--glass-tint-*`
  oklab seam). Keep verbatim.
- **DECORATION** (material register): `{glass (default) · veil · opaque · clear}` — the
  4-member `Surface` union — PLUS two boolean-sugar props `deep` / `defined` that set the
  EXISTING registered scalars `--glass-depth` / `--glass-definition` (never new enum
  members, never new tiers).

### 3b. The one-primitive API

- Extract **`<Surface tier decoration deep? defined? shadow? grain? specular? motion?>`**
  out of `Card.vue` — the bare (tier × decoration) plate. `<Card>` = `<Surface>` + the
  header/content/footer section vocabulary + the golden-φ padding ladder.
- **`<GlassPanel>` dies onto `<Surface>` exactly** (it is a section-less Card): delete
  `src/components/custom/glass-panel/` (dir verified extant: GlassPanel.vue + README +
  index.ts), the `./glass-panel` subpath, `GlassPanelProps` from `/api`, and
  `proof:glass-panel-tiers` — GATED on the Open-Gap-1 consumer probe.
- **`decorationClass(surface)`** joins `useSurfaceAxis.ts`: returns ONLY the decoration
  class (no tier prefix) — kills the `.replace(/^glass-\w+\s*/,'')` wart at every site
  (verified ≥2 live sites; sweep all `surfaceClass` importers, ~12 SFCs).
- **Reka-portaled overlays** (Dialog/Sheet/Popover/HoverCard/DropdownMenu/ContextMenu/
  Command/Drawer/Tooltip) keep the typed `surface` prop as the courier, resolving through
  `decorationClass()` — B's portal finding makes this non-optional.

### 3c. The dedup (clean breaks, no aliases)

| Current | Becomes |
|---|---|
| `<Card tier="opaque">` | `<Card surface="opaque">` (opaque leaves CardTier — one door) |
| `<Card tier="deep">` | `<Card deep>` (boolean sugar → `--glass-depth:1`) |
| `<GlassPanel tier=X>` / `surface=Y` | `<Surface tier=X surface=Y>`; SFC deleted |
| `GlassPanel renderTier="svg-filter"` | RETIRED — the `@supports`-gated `.glass-lens` path is the ONE refraction door (the SVG backend is a Chromium-only `backdrop-filter: url()` fork; deleting it is a Safari-honesty win). Gated on Open Gap 1. |
| `--glass-bg-dialog` / `--glass-bg-sheet` (+ their α constants) | Collapse onto floating/overlay + a per-scope `--glass-opacity-floating` override IF the α band demands it (Open Gap 2). Verified: `DialogContent.vue` already re-declares `--glass-bg-floating: var(--glass-bg-dialog)` — the rung is a named duplicate. NOTE: `proof:dialog-glass` DG1 pins the current form; the gate re-points with the collapse. |
| `.glass-card` alias | Fold onto `.glass-resting` (verified: pure co-selector in `ladder.css:201,322,420`) |
| `.floating-panel` + `.floating-panel-item` | DELETE (0 consumers verified); move the still-live `.dropdown-menu-content` font/padding rules to `menu.css` first |
| `.glass-hero` | Verify consumers (lives in `glass/squircle.css:52`); delete if 0, else fold onto tier+`deep` |
| `ShowcaseFrame tier="field"` | A bare framed `<div>` — a "field" is the ABSENCE of a plate, not a tier |
| `ShowcaseFrame tier="resting|quiet"` | demo `<Surface surface="opaque" shadow>` |
| `.hover-popover`, `instrument-chassis` bezel FILL | compose the ladder class/tokens instead of re-declaring them inline |

Net: `--glass-bg-*` rungs 10 → 8 (dock/chassis/clear stay — distinct physics); surface
SFCs 3 → 1 (+Card composing it); dead classes deleted.

### 3d. The fences (the collapse is WRONG here — distinct physics)

1. `.glass-dock` (footprint-invariant α, morph machinery, box-inviolate frame) — composes
   the tier recipe, is not a plate.
2. `.instrument-chassis` bezel/groove/phase signature (its FILL composes a tier; the
   engraving is chassis-only).
3. The **capsule/chip/atom** register (`glass-capsule.css` + consumers) — small interactive
   lozenges; NOT bounded content plates. This fence IS Law 2.
4. `feedback-tone.css` — a tone TINT riding ON a tier; a decoration modifier, not a Surface
   member.
5. `.glass-drawer` — snap physics + viewport-height fill; threads `surface`, keep.
6. The EFFECT axis (`.glass-reveal` / `.glass-lens` / `.glass-refract` / `.glass-material`
   / `.glass-liquid-fill` / specular) — composes ONTO a tier, never a tier.
7. `cartoon` stays a Card-LOCAL superset decoration (Memphis sticker), never a 4-member
   `Surface` union member; `proof:surface-axis` W1 must permit the superset without reading
   it as a fork.
8. Paper (`.paper-*`) — a distinct non-glass identity; untouched.

## §4 · The binding geometry grammar (four laws)

All four compose PROVEN in-repo mechanisms; all are style-time only (zero per-frame cost,
`proof:no-layout-animation` untouched). Machine-lock target: a born-RED
`proof:geometry-grammar` gate (concentric-gap-uniform · no-stadium-on-multi-row ·
no-border-image-on-rounded · no-hard-stamp-on-pill, each with a self-test bite).

### Law 1 · Concentric radius — `inner = max(r_floor, outer − inset)`

Same-radius nesting bulges; Apple ships this as `ConcentricRectangle` (iOS 26); the house
already does it locally (`segmented-tabs.css:47` — verified). Mechanism: a plain INHERITED
custom-prop relay — a container publishes `--radius-ctx` (its own resolved radius) +
`--radius-inset` (its inner pad); a nested CARD-class surface sets `border-radius:
max(var(--radius-floor, 4px), calc(var(--radius-ctx) - var(--radius-inset)))`. The child
writes the real `border-radius` from the inherited ctx (no self-referential var cycle). A
child that is itself a context re-publishes — the **2-level relay is the contract**
(covers 4 of 5 audited sites); depth-N auto-recursion needs `inherit()` (Chrome-only,
non-Baseline) and is BOOKED, never a masking fallback.
**Law-1×Law-2 coupling (load-bearing):** derivation applies to CARD-class surfaces ONLY —
scoped to a `[data-radius="card"]`/card-family selector; a capsule member (dock control,
chip) reads `--radius-pill`/`--radius-control` UNCONDITIONALLY (pill-in-pill is the
exemption, verified live on dock controls).
New tokens (`theme/radius.css`): `--radius-ctx`, `--radius-inset`, `--radius-floor`.

### Law 2 · Capsule-vs-card

A stadium radius (`--radius-pill`/`--radius-tab`/`--radius-control`) is legal ONLY on a
single-control-row interactive strip. Violation predicate (machine-checkable): a
stadium-radius element whose shorter axis exceeds ~1.25× `--control-floor` (~56px) OR that
stacks ≥2 child rows must read a BOUNDED radius. Live violation verified:
`segmented-tabs.css:46` — the vertical track (92×132, computed br 10003px → 46px caps) =
the ballooning. Fix: mint **`--radius-strip`** (bounded multi-item-strip rung, ≈12px)
between `--radius-control` and `--radius-card`; the vertical track reads it, the shipped
concentric calc (`:47`) then derives the indicator arc for free. The super-rounded
configurator/section class dies under the same law: a multi-row section wears a card
radius, never a capsule. The configurator sheet keeps the container-root clip reference
(sheet br 12px + `overflow: hidden`, sections derive concentric — replacing arbitrary
`pl-*` indent literals; see Open Gap 10).

### Law 3 · Border/rim grammar

Decorative rims paint as an INSET RING (solid: `box-shadow: inset 0 0 0 <w>` — the shipped
`--glass-material-rim`, `glass/rim.css`) or a MASKED BAND (gradient/swept:
`mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
mask-composite: exclude` + the `-webkit-mask-composite: xor` companion — the shipped
`border-progress.css:61-65` recipe) — NEVER `border-image` on a rounded surface.
Live violation verified: `.metal-{gold,silver,bronze}-border` at `metal.css:122`
(`border-image: linear-gradient(...)`) squares corners on `rounded-card` hosts including
`<Card variant="selection">`. Fix: re-express via the mask-composite band — the swept
gradient + `border: var(--metal-border-width) solid transparent` + the band mask; the
`metal-shimmer-sweep` background-position keyframe rides unchanged; PRM-static gate
inherited. `.metal-rainbow-rim` is already correct (composes the `--glass-accent` inset
seam) — untouched. **Mandatory `@supports (mask-composite: exclude)` gate** with the
solid-inset-ring fall (metal-base-color rim) — without it a gap engine paints the gradient
as a FULL BOX fill (a real break); with it the rim still reads, only the sweep is lost
(honest degrade, primary present).

### Law 4 · Offset-stamp shadow (the button corner slab)

Corrects the charter's hypothesis: it is a SHADOW-GRAMMAR mismatch, not a layer-radius
mismatch. The `.cartoon-cast` inert child (`cards.css:351+`, verified) carries the 3-plane
hard 0-blur offset stamp (`--shadow-cartoon-md`) with `border-radius: inherit` = 9999px on
pill CTAs — on a stadium the hard directional stamp pokes out only along the bottom-left
arc = the lopsided crescent. LAW (couples to Law 2): the offset-stamp family
(`--shadow-cartoon-*`) requires a CARD silhouette; a CAPSULE/PILL takes a soft
radius-following drop (`--shadow-md/-lg`) or its glass rim + under-shadow. Fix: gate the
cast mount on card-radius surfaces; the hero pill's "punch" re-lands on press-squish +
specular + a soft directional drop (A/B proof owed — Open Gap 8; the BD.W-CARTOON-PUNCH
weight must survive).

## §5 · The button blur mute

One-token, family-agnostic, honest: override the `--glass-blur-*-radius` PRIMITIVE on the
button cohort (`.btn-glass` scope) — the composite `--glass-blur-*` reads it through
`--glass-level` + saturate (the recorded CLAUDE.md override idiom; never the composed
token). A hair's delta (~1px off the resting rung), measured; the `defined` register
already carries the over-flat-page shape-legibility so a muted-blur button never reads as
a gray blob. Free micro-win: smaller blur kernel = cheaper rasterization on every button.
Exact delta + cohort scope is Open Gap 9.

## §6 · Open-gap register (pass-2 convergence blockers)

1. **GlassPanel/`useGlassRenderer` SVG-filter liveness.** Run the invariant-11 probe:
   `npm view @mkbabb/glass-ui` + READ-ONLY sibling grep (`~/Programming/*` — foreign-tree
   fence, zero writes) for `@mkbabb/glass-ui/glass-panel` / `useGlassRenderer` /
   `renderTier`. A live sibling consumer forces a `.glass-lens` migration row + by-name
   ask, not a silent delete. GATES the §3c retire.
2. **Dialog/Sheet α-band.** getComputedStyle the composited plate α on live Dialog/Sheet vs
   raw floating/overlay, both modes; within ~2% ΔL → clean collapse; else keep the scoped
   `--glass-opacity-floating` override (still prune the named rungs). Re-point
   `proof:dialog-glass` DG1 in the same change.
3. **Refactor-not-repaint proof.** The `<Surface>` split + `decorationClass()` re-point must
   paint BYTE-IDENTICAL at default expressions — π diff (Card/Dialog/Sheet/GlassPanel-slot/
   ShowcaseFrame; both modes; Chrome + Safari) + the full gate suite (`proof:surface-axis`,
   `proof:glass-cohesion`, `proof:glass-identity`) green. No convergence without this.
4. **The class-override cascade decision (B's bank trigger).** Does a consumer
   `class="glass-floating"` on a resting-default component reliably win? `cn()` has no
   surface bucket (verified worldview; B's probe). Outcome decides: (a) classes stay
   internal truth + typed couriers only, or (b) cn() gains a surface-conflict bucket and
   classes go public-API. Also run the sibling usage grep (how often is `surface=` set?).
5. **Depth-N concentricity coverage.** Enumerate every ≥3-level nest at HEAD
   (dialog>card>tile is the candidate); confirm the 2-level relay reproduces a uniform
   inner-arc gap (≤1px deviation) at each audited site; `inherit()` stays BOOKED.
6. **The capsule-exemption selector.** Exact scoping (`[data-radius="card"]` vs
   class-family) such that dock pill-in-pill + `.glass-chip` read pill UNCONDITIONALLY
   through the law; verify no de-pilling regression.
7. **Masked-rim degrade.** Prove the `@supports` fall renders a RIM (not a filled box) on a
   gap engine; prove Safari 26 takes the masked path; sweep keyframe + PRM gate intact.
8. **Hero-weight A/B.** Pill CTA without `.cartoon-cast` (soft drop + squish + specular) vs
   current — the punch must survive in both modes or Law 4 needs a pill-specific weight
   recipe.
9. **The blur-mute calibration.** Which cohort (`.btn-glass` only vs all interactive
   controls), the exact `-radius` delta, measured over flat page AND busy backdrop, both
   modes — with the `defined` register interplay recorded.
10. **Configurator sheet geometry.** The design decision: sheet radius (12px container-root
    clip is the shipped reference) + sections deriving via Law 1, replacing the arbitrary
    indent literals — needs a concrete before/after on the live configurator + the demo
    PresetEditor gear.
11. **Emission verification.** Fresh `npm run build`: tier ladder ships literal in
    `dist/glass-ui.css`; `veil-surface` (+ any other `@utility` decoration) converted to
    `@layer components` literal; bare-consumer paint test (no `@source`) green.
12. **In-flight coordination.** The family returns cite BH.W-AXIS-GRAMMAR
    (`_shared/axes.ts`, the 4-member glass·veil·opaque·clear union) as in-flight at their
    HEAD — pass-2 must re-baseline against the actual tree at execution and land the
    Surface split ON that grammar, not beside it. Also: `.glass-hero` consumer count
    (squircle.css hosts the rule; demo refs unverified).

## §7 · Pass-2 prototype slate

| # | Prototype | Family | Risk it proves |
|---|---|---|---|
| P1 | **The Surface collapse** — extract `<Surface>` from Card; add `decorationClass()`; re-point every `surfaceClass`-importing SFC (~12, incl. the 2 verified `.replace()` warts); delete GlassPanel dir/subpath/gate (gap-1-gated); collapse CardTier (opaque/deep out); prune dialog/sheet rungs (gap-2-informed); delete floating-panel/.glass-card alias; demo route `/foundations/surface-taxonomy` rendering the full tier×decoration matrix on ONE primitive. **Proof:** π byte-diff at defaults (both modes, Chrome+Safari) + gate suite green + rung count 10→8. | A (+B mechanisms) | The collapse is a refactor, not a repaint; the grammar covers every current expression. |
| P2 | **The cascade/portal/emission probe harness** — (a) `<Card>` default + consumer tier class, computed-style readback: does the override win?; (b) `Dialog` typed-courier vs `contentClass` across the portal, veil painting over a busy backdrop; (c) bare-consumer (no `@source`) `veil-surface` paint test pre/post `@utility`→literal conversion; (d) sibling `surface=` usage grep. | B (banked) | The bank trigger: classes-public viability. Result is a yes/no with numbers. |
| P3 | **The geometry-law harness** — self-contained page (Chrome+Safari, both modes): (1) concentric relay on 3 nests (configurator-section-in-rounded-sheet · toggle-tile-in-card · dialog>card) with arc-gap readback + the dock pill-exemption held; (2) vertical tab track on `--radius-strip` vs the live balloon, indicator glide/squish frame-series (no clip, transform-origin intact); (3) `.metal-gold-border` masked-band vs border-image side-by-side, sweep running, `@supports` fall rendered; (4) pill CTA soft-drop vs cartoon-cast A/B. Each panel emits a getComputedStyle readback — the born-RED π seed for `proof:geometry-grammar`. | C | All four laws compose shipped mechanisms without new defects; the hero weight survives Law 4. |
| P4 | **The blur-mute calibration** — the `-radius` primitive delta on the button cohort, measured live on `/display/buttons` over field + flat hosts, both modes, Chrome+Safari, with/without `defined`. | cross-family | "A hair" is a number, honestly derived at the primitive, not the composite. |

P1 and P3 are independent and parallelizable; P2 informs P1's public-API surface but does
not block it (the typed-courier form is correct under EITHER P2 outcome); P4 is a
half-day rider.

## §8 · Design-quality bar (binding on every prototype)

- **Warm identity**: no new hues; tints stay on the `--glass-tint-*` oklab seam and the
  in-srgb `--surface-tint-*` fence; the `--card` warm-cream base untouched.
- **Compositor-only**: every animated channel stays transform/opacity/filter/registered
  `--*`; radius/shadow/mask changes are static style-time (`proof:no-layout-animation`
  green by construction).
- **PRM**: the metal sweep + any entrance stay inside the existing no-preference brackets;
  laws add zero motion.
- **Safari-honest**: mask-composite with the `-webkit-` companion; the SVG-filter fork
  DELETED (a Safari-honesty win); `@supports` gates degrade to a present-and-correct
  simpler read — never a masking fallback, never a hidden dead primary.
- **Clean breaks, no aliases**: `tier="opaque"`→`surface="opaque"`, GlassPanel→Surface,
  `.glass-card`→`.glass-resting`, border-image→masked band — each a MIGRATION row, zero
  back-compat shims.
- **KISS/DRY**: one tier recipe, one decoration seam, one rim mechanism per shape class,
  one radius law; the resolver declared once; presets-in-consumers throughout.
- **Machine-locked**: the collapse re-points the existing gate suite; the geometry grammar
  lands with its own born-RED gate + π readbacks; every retire carries the invariant-11
  registry/consumer probe.
