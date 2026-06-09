# Hardening challenge — DOCK-variants (red-team)

**Lane:** Challenge the dock VARIANTS to perfection — orientation (H/V), mobile
(`--dock-scale` 1.5), big-dock (alignment, squircle), the all-docks-one-root
unification (W61). **Verdict: WEAK.**

HEAD `89f235a` (past the `89edffc` the wave specs reference). W45 (region-model +
`--dock-scale` + `<DockSeparator>`) landed in `src/`. W61 (dock-unify-root) is
correctly `planned` — but the gap it names is REAL and unclosed, and there are
THREE findings beyond W61's four named witnesses. The variants do NOT yet reach
perfection.

---

## CHALLENGES THAT FOUND A WEAKNESS (falsifiable, source-grounded)

### C1 — FOUR divergent dock vocabularies, not three (W61 undercounts its own headline)

W61 RED witness 1 names THREE divergent docks (`dock.vue` good; `BottomDock.vue`
+ `SidebarDock.vue` divergent). There is a **FOURTH**: `demo/stories/navigation/rail.vue`.
At HEAD it is a `<GlassDock variant="rail">` that:
- uses **raw `bg-foreground/10 text-foreground`** for its active state
  (`rail.vue:56`) — NOT the `--dock-active-bg` token, NOT `is-active`, a THIRD
  active-state vocabulary;
- has NO `#persistent` home-left, NO `<DockSeparator>`.

So the active-selected state is expressed FOUR ways across the dock surfaces:
1. `dock.vue` (showcase) — `DockIconButton` + `--dock-active-*` tokens;
2. `SidebarDock.vue:100,145` — `is-active` class;
3. `rail.vue:56` — raw `bg-foreground/10 text-foreground`;
4. `dock-active-tokens.vue` demo — documents `--dock-active-bg = var(--muted)`,
   which is itself STALE (see C4).

W61 FileBounds explicitly migrate `rail.vue` ("MIGRATE onto the nav-pattern
contract where it diverges"), but the spec's witness-1 census does NOT list
rail.vue's raw active class as a divergence — only its missing `#persistent`/
separator. **Hardening:** W61's `proof:dock-unify` census-arm must also assert
ZERO raw active-state classes (`bg-foreground/N`, hand-rolled `is-active` color
shifts) in the in-bounds docks — the unification is incomplete if the SELECTED
state still paints four ways after the home/separator unify.

### C2 — Vertical/rail docks CANNOT collapse: the entire morph + collapsed-pill + Q1 story is horizontal-only (un-named variant asymmetry)

`GlassDock.vue:191-196`: a vertical dock OR a `variant="rail"` OR `layout="grid"`
dock is force-`alwaysExpanded`. So:
- the single-scalar collapse↔expand morph (W01/W02);
- the collapsed-pill summary geometry (Q1 / W61 witness 2);
- the `.dock-layer--summary` pane;

apply ONLY to horizontal `variant="dock"`. A vertical dock can NEVER collapse to a
pill. SidebarDock's own header comment (`SidebarDock.vue:6-9`) confirms it: "the
shipped GlassDock has NO collapse machinery for a vertical rail." This is a
genuine VARIANT-COVERAGE asymmetry the dock-variants lane should surface: "dock
perfection (morph/layers/collapsed)" is structurally unreachable on the vertical
axis. Neither W45 nor W61 names it. The user's mobile mental model (a dock that
shrinks to a pill) does not exist for the rail the mobile off-canvas Sheet
actually hosts (`BottomDock.vue:120` mounts `SidebarDock` inside a Sheet — a
non-collapsing rail). **Hardening:** add a wave (or a W61 fold) that either (a)
gives the vertical rail a collapse-to-rail-pill morph, or (b) RECORDS the
asymmetry as a deliberate contract in CLAUDE.md so it is a decision, not a silent
hole. Today it is silent.

### C3 — The squircle "and the like" (W56b AMEND, USER-DECIDED R1) is UNEXECUTED, yet W56 is marked live-verified

MASTER-PLAN R1 is **USER-DECIDED: extend the iOS superellipse to dialogs + sheets
+ panels + glass hero cards + where befitting (by default)**. The W56 wave doc WAS
amended to carry four new born-RED witnesses (`AX.W56:171-179`). But at HEAD the
AMEND is RED — the source still shows the OLD policy:
- `theme.css:92-95`: `--corner-shape-card/pill/panel: round`; only `bigdock` +
  `thumb` are `superellipse(...)`.
- `grep corner-shape src/components/ui/dialog/ src/components/ui/sheet/` → NONE.
- The W56 audit JSON records `R_squircle_3_2_and_the_like: "DEFAULT big-dock ONLY
  — the large-radius candidates (dialogs/sheets/panels/Configurator) are
  consumer-opt-in … NOT applied by default (no overfit)"` — which directly
  CONTRADICTS the MASTER-PLAN R1 USER-DECISION (extend by default).

So the dock-variant squircle is correct (big-dock `shape="card"` gets it), but the
broader USER-DECIDED membership is unbuilt AND the JSON disagrees with the
decision. PROGRESS.md still marks W56 `live-verified (DEVELOPED)`. **Hardening:**
W56b must actually land (`--corner-shape-{dialog,sheet,panel,hero}` →
`superellipse(...)` + the surface CSS), the W56 JSON `R_squircle` clause must be
rewritten to the by-default decision, and PROGRESS must drop the `live-verified`
mark until the amend's four witnesses are GREEN.

### C4 — The dock-active-tokens demo documents a STALE default (`var(--muted)`) post-W45

`demo/stories/foundations/dock-active-tokens.vue:21,39` documents the default as
`--dock-active-bg = var(--muted)`. But W45's DK2 fold re-pointed it: at HEAD
`tokens.css:1125,1152` is `--dock-control-active-bg: var(--surface-tint-12)` and
`--dock-active-bg: var(--dock-control-active-bg)`. The demo's documented default
is wrong by a full re-point. This is the SAME demo W61 then re-points AGAIN (to a
glass register). It will be wrong THREE times unless the demo doc is updated as
part of W61. **Hardening:** W61's CLAUDE.md/demo fold must update this story's
documented default to the glass register (and `proof:dock-unify` should assert the
demo's documented `--dock-active-bg` matches the actual token, closing the
docs-drift class).

---

## CHRONIC DEFERRALS / MISSES (with slip history)

### CH1 — PROGRESS↔JSON status inflation on the dock band (cardinal-lesson recurrence)

The recurring class the MASTER-PLAN itself flags ("PROGRESS↔JSON status
inflation"; the "2 cardinal-lesson re-opens" of W05/W09). It recurs on the dock
variants:
- **W45**: PROGRESS.md marks it `live-verified (DEVELOPED)`. Its own JSON
  (`W45-dock-region-model.json`) says `status: "DEV-COMPLETE (headless
  self-gated; live π-lane visual-truth + timing TUNE owned by the orchestrator
  …)"` and carries a `liveArmOwed` block (DK1 collapse-icon timing, the 1.5×
  mobile-scale live pass). Live arms are `SKIP (befitting-silent device-absence,
  exit 0)`. So "live-verified" is asserted over a self-gated headless JSON whose
  own author DEFERS the live truth to the orchestrator.
- **W56**: PROGRESS marks `live-verified (DEVELOPED)`. JSON status is
  `dev-complete-headless-green-live-pending`, `liveVerdict: pending-re-probe`.
Slip history: this is the EXACT W05/W09 pattern the convergence round re-opened
(PROGRESS `complete` over a JSON that records `live-pending`). It has now recurred
on W45 + W56 — a 2nd and 3rd instance of the same class within AX.

### CH2 — Zero captured visual DELTA artefacts despite the cardinal lesson + the MASTER-PLAN's explicit screenshot mandate

MASTER-PLAN:52: "No audit/visual/ captures — institute the screenshot discipline
for every live DELTA." At HEAD `docs/tranches/AX/audit/visual/` contains ONLY
`CAPTURE-PROTOCOL.md` — ZERO PNG/JPG anywhere under `docs/tranches/AX`
(`find … -name "*.png"` → empty). Every dock wave marked `live-verified` (W45,
W52, W56, W57, W59) lacks a captured before/after image. The "live-verified" mark
is, by the lane's own cardinal lesson, NOT earned without a captured DELTA. Slip
history: flagged at W00 (the audit/visual discipline), re-flagged in the
MASTER-PLAN as still-missing, still missing at HEAD. Chronic, unaddressed across
the whole dock band.

### CH3 — The two-scale problem (`--dock-scale` shipped without its master `--ui-scale`)

W45 shipped `--dock-scale` (mobile 1.5×). W51 (`--ui-scale`, the master comfort
scalar the dock scale is supposed to be a SPECIALIZATION of) is `planned (spec
authored)`. W51's own state confesses: "Sequencing INVERTED at HEAD … W45 already
shipped `--dock-scale` … so W51 is a RETRO-RECONCILE … or there are two parallel
scale systems — the exact 'three scales' the umbrella exists to kill." So the dock
variant carries an orphan scale axis with no master, and the reconcile is deferred
to a later batch (Batch 6). Until W51 lands, the dock-scale mobile story is a
parallel system, not a specialization — the chronic "N divergent scales" the
umbrella was minted to prevent.

---

## GLASS-COHESION (the dock-variant slice, under MAXIMAL glass-first)

The dock SELECTED/active control is the canonical glass-cohesion MISS on the dock
variants. W61 witness 3 + `tokens.css:1125`: `--dock-control-active-bg:
var(--surface-tint-12)` — a flat foreground-over-transparent overlay, NOT a
glass-translucent tier reading the dock substrate (the keyframes-dock "selected
reads as glass" model the user names at pass-3:13). MAXIMAL glass-first demands the
selected tile read as a glass tier ABOVE the bar; today it stamps an opaque-ish
plate. W54 confirms the intent and DEFERS the dock execution to W61 (planned). So
on the dock variant axis: the SUBSTRATE conforms (glass-bg dock), the HOVER fill
conforms (`--card`-over-transparent), but the ACTIVE/SELECTED step DIVERGES (flat
`--surface-tint-12`) — the ONE-model gap is the active register. Compounding it,
the demo docks paint the active state four ways (C1), so even after the token
re-point the COMPOSED docks won't read as one glass model until rail.vue +
SidebarDock are migrated off their raw/`is-active` active classes.

---

## DOCK-PERFECTION — gap to a PERFECTED dock

A perfected dock = ONE GlassDock root for EVERY dock, home-left `#persistent` + nav
+ `<DockSeparator>` dividers, a glass-first selected control, a tight properly-
sized collapsed pill on BOTH axes, `--dock-scale` mobile coherence reconciled onto
ONE master scale, big-dock alignment + squircle, and a captured live DELTA proving
it. At HEAD:
- ONE-root nav-pattern: NOT met — 4 divergent dock vocabularies; no contract
  recorded in CLAUDE.md; no `proof:dock-unify` gate (W61 planned).
- glass-first selected control: NOT met — `--surface-tint-12` flat tint (W61).
- collapsed pill (Q1): NOT met — `min-width`-only, falls to full `--dock-layer-
  height`, no symmetric `min-block-size`, the floor tokens
  (`--dock-collapsed-summary-min-size`, `--dock-collapsed-padding`) are
  referenced-but-UNDEFINED at `dock.css:719,526` (W61 mints them).
- vertical/rail collapse: NOT met — structurally impossible (C2); the asymmetry is
  silent.
- squircle "and the like": NOT met — W56b amend RED (C3).
- `--dock-scale`/`--ui-scale` reconcile: NOT met — deferred to W51/Batch 6 (CH3).
- big-dock alignment (DK4 `place-items: center`): MET (`dock.css:1177`).
- captured live DELTA: NOT met — zero PNGs (CH2).

Net: 1 of 8 perfection criteria met. The dock variants are mid-convergence, marked
live-verified ahead of the truth.

---

## HARDENING ACTIONS (planning only)

1. **Amend W61 witness-1 census** to also flag rail.vue's raw `bg-foreground/10`
   active class + add an " active-state vocabulary" assertion to `proof:dock-unify`
   (ZERO raw active classes / hand-rolled `is-active` color shifts in the in-bounds
   docks) — so the unification covers the SELECTED state, not just home/separator.
2. **Add a vertical-rail-collapse fold (or a CLAUDE.md contract)** resolving C2:
   either ship a collapse-to-rail-pill morph for the vertical/rail variant, or
   RECORD the H-collapses/V-always-expanded asymmetry as a deliberate, documented
   contract so it is a decision, not a silent hole. Prototype: collapse the mobile
   off-canvas SidebarDock and eyeball whether a non-collapsing rail reads right at
   375px.
3. **Land W56b (the USER-DECIDED R1 squircle extension)** —
   `--corner-shape-{dialog,sheet,panel,hero}: superellipse(...)` + the surface CSS
   + rewrite the W56 JSON `R_squircle` clause from "consumer-opt-in" to "by
   default"; drop W56's PROGRESS `live-verified` mark until the four amend
   witnesses are GREEN.
4. **Fix the dock-active-tokens demo stale default** (`var(--muted)` →
   the glass register) as a W61 demo fold; add a `proof:dock-unify` assertion that
   the demo's documented default matches the live token (close the docs-drift
   class).
5. **Reconcile PROGRESS↔JSON for the dock band** (CH1) — demote W45 + W56 from
   `live-verified` to `live-pending` to match their own JSONs; institute the
   `proof:live-verified-ledger` close gate the MASTER-PLAN Batch 0 names so a
   PROGRESS `live-verified` cannot outrun its JSON.
6. **Capture the owed dock DELTAs** (CH2) — run the chrome-devtools-mcp before/
   after for W45 (persistent slot + 1.5× mobile + axis-aware separator), W61
   (collapsed pill + glass selected + unified docks), W56b (squircle surfaces) at
   ≥2 viewports × light/dark and DEPOSIT the PNGs in `audit/visual/` per the
   CAPTURE-PROTOCOL. No dock wave marks `live-verified` without one.
7. **Sequence W51 before/with the dock-band close** (CH3) so `--dock-scale`
   re-homes onto `--ui-scale` and the dock variant carries a specialization, not a
   parallel scale.
