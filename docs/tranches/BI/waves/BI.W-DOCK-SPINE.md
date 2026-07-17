# BI.W-DOCK-SPINE — the three-z-layer clip-path plate morph (the load-bearing bet)

Band B3 (dock greenfield). Design: D-DOCK PASS-1 §0/§1/§2.1/§2.2 (the SPINE = DOCK-A × codebase-truth),
PASS-4B ruling 2 (transform-free centering), DOCK-LADDER §2/§7-C7 (the measured morph). THE band-headline
wave — W-DOCK-CONTROLS / W-DOCK-CROSSFADE / W-DOCK-OVERFLOW / W-DOCK-ESCAPE all land ON the spine it mints.

## §Mandate

Discharges: **UF-C1** ("The entire dock suite … re-invented from ios27 first principles … Greenfield it. …
too many duplicated systems … infinite … superfluous code" — the band umbrella), **UF-C5** ("Dock morphing
does not work at all"), **UF-C6** ("hovering over a button at the end of a dock … should not clip … afford
enough room from first principles. No workarounds or sizing hacks"), **UF-C7** ("Dock hover items clip
improperly"), **UF-C4** ("/dock/overview animations are sluggish and not smooth" — the machinery-restyle
half; the DOCK_SPRING ring is W-DOCK-SPRING-UNIFY's G8, the DockStage 9.6MP aurora fill-rate is FAM-5
perf-band W-STAGE-FIELD-VIEWPORT-CLAMP). Registry: **FAM-3** the dock disease (hover-clip root =
`.glass-dock` `contain: layout style paint`; morph; sluggish-machinery).

## §Design

The unanimous root cause (PASS-1 §0): `.glass-dock` is simultaneously the glass surface, the morph clip
aperture (`overflow: clip` + `contain: layout style paint`, `shell.css:151`), AND the interactive item
container — every named clip/morph defect is a downstream compensation for that triple identity. The spine
decouples into THREE z-layers so the defects become **unrepresentable, not patched** (PASS-1 §2.1):

- **L0 — THE PLATE (the lens).** One element (`position:absolute; inset:0` or `::before`) owning
  `backdrop-filter` + the `--glass-tint-*` legibility seam + rim + specular (the shipped ladder verbatim —
  `adaptive-legibility.css`, `--glass-bg-dock`, byte-untouched). Its visible extent morphs via
  `clip-path: inset(var(--t-top) var(--t-end) var(--t-bot) var(--t-start) round var(--r))` — paint-only,
  compositor-composited, true rounded corners every frame, **ZERO endpoint measurement** (self-describing
  over the reserved box). G1 CLOSED on real Metal (PASS-3 spine proof): WebKit clips the backdrop SAMPLE
  to the animating clip-path region, no leak/double-blur. The `dockMorphMeasure` convex-blend `inline-size`
  model is the allowlisted FALLBACK iff clip-path ever fails (one-element layout/frame, never silent).
- **L1 — THE CONTROLS.** A normal-flow flex run OVER the plate, **`overflow: visible` on BOTH axes ALWAYS**.
  Hover/press plates are compositor transforms that overhang the plate edge freely — no ancestor clips them,
  so UF-C6/C7 are structurally impossible ("afford enough room from first principles" IS this layer). Each
  cell reserves the full ≥44px hit box; the painted plate insets/overhangs independently (**hit box ≠ paint
  box** — this retires the `--dock-control-safe-inset` sizing hack the user rejected; the face-token fold is
  W-DOCK-CONTROLS').
- **L2 — TRANSIENT SURFACES.** Top-layer popovers (W-DOCK-ESCAPE) — nothing left to escape FROM.

**One engine, one scalar (PASS-1 §2.2).** `useDockSpring` writes ONE registered `@property --dock-t <number>`
(initial 0) **scoped to the PLATE element, not inherited across the control subtree** — the codebase-truth
cure for the A′-4 ~13fps restyle storm (a per-frame write recomputes the plate clip + content crossfade
only, not the 10-selector `:where()` subtree). Clip insets, item translate/fade, summary crossfade are all
`calc()` off `--dock-t`. (The scalar-zoo deletion + spring reconcile is W-DOCK-SPRING-UNIFY; the crossfade
slot is W-DOCK-CROSSFADE — the spine mints the ONE plate scalar they consume.)

**Reserved-footprint contract (G3 CLOSED, PASS-1 §2.1).** A collapse-morphing dock reserves its expanded
footprint (one layout solve) → OUT OF FLOW (`position:fixed|absolute` floating pill); transparent reserved
margins are `pointer-events:none` (click/wheel pass through to page), `pointer-events:auto` on plate+items.
An IN-FLOW dock (SidebarDock) is `alwaysExpanded` by contract (already de-facto true at HEAD).

**Transform-free centering (PASS-4B ruling 2 — the SAF-1 landmine fence).** The greenfield dock centers
`inset-inline:0; margin-inline:auto; width:max-content` — NEVER a `translateX(-50%)`. Load-bearing: the
top-layer escape (W-DOCK-ESCAPE) mis-resolves native `anchor()` through any transformed ancestor chain;
a transform-free dock keeps that door open and keeps the reserved-footprint geometry honest.

**Hover on a stationary state-sized hit frame (G7 CLOSED).** Enter/leave listeners live on a frame that
never moves under the cursor (sized to the collapsed pill at rest, the expanded footprint while open) — the
~120L hysteresis apparatus in `useDockState.ts` (`isMorphingEdgeSweep`/`EDGE_BAND_PX`/leave-recheck) DELETES
(that deletion is W-DOCK-RETIRES'). The frame is state-sized NOT footprint-sized (the empty-gutter-hover
trap). A minimal ~60ms intent dwell on enter is KEPT (a sweep-past should not expand — UX intent, not
moving-edge compensation).

**G12 reveal spill.** If mid-morph content visibly spills past the narrowing plate, the clip lands on a
CONTENT WRAPPER only (`clip-path: inset()` on a non-interactive text/glyph wrapper) — never on L1. Decided
in the crossfade compound (W-DOCK-CROSSFADE); the spine's frame-series is its evidence.

## §Work

- Mint `src/styles/dock/dock.css` (the greenfield two-layer box + morph — replaces the shell/morph/shape
  clip-era partials): L0 plate rule (`clip-path: inset(… round var(--r))` off `--dock-t`, backdrop ladder
  composed), L1 `.dock-controls { overflow: visible }` both axes, the reserved-footprint out-of-flow pill +
  `pointer-events` gating, transform-free centering (`inset-inline:0; margin-inline:auto; width:max-content`).
- `src/styles/dock/shell.css:151` — DELETE `contain: layout style paint` + the `overflow: clip` morph
  aperture (the triple-identity root). `overflow-clip-margin` band-aids (`overflow.css:55-60`,
  `shell.css:294`) DEFINITION-ABSENT (retire coordinated in W-DOCK-RETIRES).
- `src/styles/dock.css` — register `@property --dock-t <number>` (initial 0, scoped to the plate; the
  `--dock-morph-t`/zoo retire in W-DOCK-SPRING-UNIFY).
- `GlassDock.vue` — collapse the L0/L1/L2 render into the three-layer skeleton; the plate is L0, the control
  run is L1, transient surfaces teleport (L2). The `.glass-dock-frame` `display:contents` escape retires
  (W-DOCK-RETIRES — nothing to escape).
- `composables/useDockState.ts` — the stationary state-sized hit frame + the ~60ms intent dwell KEPT; the
  ~120L hysteresis block marked for deletion in W-DOCK-RETIRES (the state machine stays, the moving-edge
  compensation goes).
- `demo/stories/dock/overview.vue` — rebuild on the spine (the reference SPINE demo; ONE live aurora
  context per route — the fill-rate clamp itself is FAM-5).

## §Acceptance

Gate: **`proof:dock-spine`** (NEW, born-RED at HEAD — `contain:layout style paint` live at `shell.css:151`,
the morph rides the `dockMorphMeasure` ResizeObserver dance, hover plates clip).
- S1 **clip-by-construction** (BORN-RED): `.glass-dock`/`.dock-controls` composes ZERO `contain: … paint`
  and ZERO `overflow: clip`/`overflow-clip-margin` on the interactive layer; L1 resolves `overflow: visible`
  both axes → GREEN when the triple identity splits.
- S2 **one-plate-scalar**: exactly ONE `@property --dock-t`; the per-frame write reaches the plate element
  only (the control `:where()` subtree carries no `--dock-t` read) — the A′-4 restyle-scope assert.
- S3 **transform-free-centering** (BORN-RED): the dock root centers `margin-inline:auto`/`inset-inline`; ZERO
  `translate*(-50%)` on the dock root or any centering ancestor (the SAF-1 fence).
- S4 **reserved-footprint-passthrough**: the transparent margin is `pointer-events:none`, plate+items
  `pointer-events:auto`.
- Self-test bites: a synthetic re-added `contain:paint` on the item layer REDs S1; a synthetic
  `translateX(-50%)` centering REDs S3; a synthetic second `--dock-t` writer REDs S2.

**Activation-at-rest oracle (paint-lane, native — minted 2026-07-17 from the keyframes G-1/G-2 record;
NOT a `proof:dock-spine` gate assert).** S1–S4 are the static clip/scalar/centering/`pointer-events`-value
gate; **S4 asserts the reserved-margin `pointer-events` geometry (`none` on the transparent margin, `auto`
on plate+items) but NOT that a live tap actuates.** Keyframes G-1 is correct-on-record that no existing
oracle covers first-tap ACTUATION at rest — not S1–S4, not the §π "hit-frame no-oscillation" (which measures
enter/leave FLICKER), not the `dis:dock-chronic` hover-plate reachability probe. This arm closes that gap and
COMPOSES on S4 (it presumes S4's pointer-events geometry and adds the live actuation on top — no parallel
duplication). It rides the Q002/Q003-class native/paint lane (a live-instrument readback, NOT a minted gate
or CI script — the no-minted-gates ruling stands). Desktop viewport **1280×800**, dock at its DEFAULT rest
state as rendered (do NOT presume collapsed — G-1's cited toggle is the EXPANDED dock's
`[aria-label="Close controls"]` at rest; the arm binds to whatever state the dock actually rests in, and
exercises the toggle in BOTH directions where both are reachable), both schemes, on real GPU (Chrome +
visible-Metal Safari via W-DOCK-DEVICE):
- (a) **hit-test-resolves-to-toggle**: query the resting dock's toggle control rect
  (`el.getBoundingClientRect()`) and compute its center `(cx, cy)`; `document.elementFromPoint(cx, cy)` MUST
  resolve to the toggle control or a descendant of it — the reserved margin, the page grid, or any overlay
  MUST NOT intercept. (G-1's failing signature is `elementFromPoint(935,28)` returning `MAIN.grid` over the
  dock's REPORTED box — the expanded dock's Close-controls center; this arm asserts the negation.)
- (b) **one-tap-actuates (direction-agnostic)**: dispatch exactly ONE `pointerdown`+`pointerup` pair at
  `(cx, cy)` and assert the toggle ACTUATES on the FIRST tap — the dock's expansion state visibly changes in
  the direction that toggle owns (expanded→collapsed for Close-controls; collapsed→expanded for the expand
  affordance) — no second-tap requirement, no dock-body-then-toggle two-step (the chronic double-click
  activation facet). Where both rest directions are reachable in the story, exercise BOTH.
- Provenance: minted 2026-07-17 from keyframes' G-1/G-2 V-formation batch. Keyframes' **RG-1/RG-2**
  consume-time live re-verify (against the PUBLISHED 7.0.0 artifact) is the external check on this arm —
  landing it in-tree BEFORE the 7.0.0 tag is the coherent sequencing. The MOBILE facet (390×844, touch
  semantics) lands on **W-DOCK-CROSSFADE §Acceptance** (its owning surface — the summary↔full layer-swap the
  G-2 mechanism rides), cross-referenced there.

## §π/DELTA

- **The morph frame-series (the spine's crux + G12).** Capture the collapse↔expand morph frame-by-frame:
  (a) CDP Layout track FLAT through the morph (Chrome); (b) a hover plate OVERHANGING the plate edge
  UN-CLIPPED (the UF-C6/C7 defect killed by construction); (c) the backdrop SAMPLE clips to the plate region
  (no leak/double-blur) on **real Metal Safari**; (d) content complete at every frame (G12 — no spill, or the
  content-wrapper clip holds). Chrome + Safari, both modes.
- **PRM single-paint**: the spring seats synchronously, zero motion frames, no collapsed-sliver.
- **Hit-frame no-oscillation**: rapid hover-hammering at the collapse edge → zero enter/leave flicker with
  hysteresis deleted.
- DELTA: `docs/tranches/BI/audit/visual/W-DOCK-SPINE-DELTA.md`. Rides W-DOCK-DEVICE (visible-Metal) +
  the `proof:ba-gestalt` dock verdict.

## §Obligations

- **Visible-Safari.app Metal** confirmation of the clip-path plate morph at 60fps (the offscreen WKWebView
  rAF=0 harness cannot answer temporal frames — genuine Playwright-WebKit proves the mechanism, visible-Metal
  confirms) → carried by W-DOCK-DEVICE.
- The COMPOUND integration ({clip-path plate} × {crossfade} × {peak-reserve} × real density/coarse/
  adaptive-legibility cascade) is built + verified in W-DOCK-CROSSFADE (this wave mints the plate; the
  compound is proven where the crossfade lands).

## §Dispositions

- **dis:dock-chronic (the flagship disease — 3rd consecutive tranche re-opening)** → TERMINALIZED here: the
  greenfield spine IS the BUILD that ends the re-opening (clipping structurally absent, morph measurement-free,
  the triple identity split). The closing evidence is the Safari-engine gestalt verdict (W-DOCK-DEVICE), not
  a Chromium-only per-mechanism green. Decided-terminal, never re-booked.

## §Inbound acceptance constraints (the 2026-07-12 marking pass — value.js U-F4, A-class)

**U-F4 — the desktop-PRM dock-collapse** (u-formation §2a; the sharpest a11y break their formation
found; JOINS our U-F2/W-adopt constraint list): under `prefers-reduced-motion: reduce` the
expanded/always-expanded dock at HEAD resolves `--dock-expand-t = 0` (the frozen morph clock —
`src/styles/dock/morph.css:70-73`) → a 44px pill with 19/20 controls unreachable, desktop viewport.
The GREENFIELD SPINE must satisfy: **under PRM the reduced-motion cure is SNAP-TO-END-STATE, never
freeze-at-start** — the expanded dock resolves its EXPANDED geometry statically (e.g. the PRM arm
pins the drive scalar to its end state for `.expanded`/`.always-expanded`). WCAG 2.4.3/2.4.7/1.4.13
class. **Oracle**: under emulated PRM the expanded dock renders full-width with every control
reachable, desktop viewport, both schemes — verified on REAL GPU (their formation logged 2 headless
false-reds on this exact surface; a headless assertion alone is distrusted). The demo is EXONERATED
(producer-only root).
