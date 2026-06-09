# W-dock — Dock band inventory (AX tranche step-back)

**Lane** W-dock · **HEAD** c72d2ac (3.8.0 + convergence-1 W44-W52 + convergence-2 W53-W59) ·
**Mode** read-only inventory (planning, NO code edits) · **Date** 2026-06-08

Scope: the DOCK waves — W01-W04 (marked complete), W06 (planned), W45 (planned, net-new), and the
DK1-DK10 convergence-2 defect set + the convergence-1 D9/D11/D13/D14/D15 roots. Every claim below is
re-verified at source against HEAD, not taken on the audit's word (the W00 ritual).

---

## 0. The headline — the dock band is the LEAST-converged band in the tranche

The dock was the AX "dock-first" headline (PROGRESS line 3: "the dock-first, visual-truth tranche").
W01-W04 shipped in 3.8.0 and are marked `complete`. But the post-3.8.0 live audit (the user's two
defect passes) flagged **TEN distinct dock defects (DK1-DK10)** the headless gates missed — the exact
cardinal-lesson failure the tranche was built to close. NONE of the dock convergence work is landed in
source: W45 is unauthored (no `DockSeparator.vue`, no `proof:dock-region-model`, no audit json), W06 is
planned, and the W01/W02 re-opens the convergence audits prescribe have NOT been applied (W01 still reads
`complete` in PROGRESS, not `live-pending`). The dock band is **convergence-COMPLETE on PAPER** (every DK
is source-audited + routed to an owning wave in CONVERGENCE-PLAN-2) but **execution-NOT-STARTED** — the
dispositions exist, the code does not.

---

## 1. Status matrix — DONE / PARTIAL / NOT-STARTED / AT-RISK

### Waves

| Wave | Title | PROGRESS says | TRUTH at HEAD | Verdict |
|---|---|---|---|---|
| W01 | single-scalar dock morph | complete | morph engine landed (audit json + W01-redress.md + W01-DELTA.md exist; `proof:dock-animation-live` GREEN, 26 frames peak 1.046) — BUT carries TWO un-applied cardinal-lesson re-opens (DK1 summary-stagger DIRECTION + DK7 leaving-pane crossfade CLOCK) | **AT-RISK** — `complete` is a headless-green mark over two live-broken arms; should be `live-pending` |
| W02 | one morph-orchestrator per dock | complete | `W02-orchestrator-fold.json` exists; the ONE `SpringProgress` + `registerGroup` seam is real and SOTA. The orchestrator is sound; the DK7 lag is NOT W02's vocabulary seam | **DONE** (the orchestrator itself; the lag is W01's crossfade clock) |
| W03 | keepDockOpen host-native hold | complete | `W03-dock-hold-live.json` exists; not flagged in any DK | **DONE** |
| W04 | dock overflow wrap | complete | `W04-dock-overflow-wrap.json` exists; the `min(max-content)` invalid-CSS bug was root-caused + fixed + live-verified (rowCount=2 at 448px) | **DONE** |
| W06 | dock storybook honest rail + css split | planned | doc exists (533 lines, 4 RED witnesses all still RED); `dock.css` is **1425 lines** at HEAD (was 1227 at W06 baseline, 1418 at the convergence audit — still drifting up, carve more urgent); no W06 audit json | **NOT-STARTED** — owns DK6-showcase, DK9-rail-honesty, DK10-section |
| W45 | dock region-model + DockSeparator + mobile --dock-scale | planned | doc exists (566 lines, 5 RED witnesses ALL re-verified RED at HEAD); NO `DockSeparator.vue`, NO `proof:dock-region-model.mjs`, NO `package.json` registration, NO `W45-dock-region-model.json` | **NOT-STARTED** — owns DK2/DK3-pageflow/DK4/DK5/DK8 |

### The DK defect set (convergence-2, the live user flags)

| DK | User flag | Owner (per CONVERGENCE-PLAN-2) | Source state at HEAD | Status |
|---|---|---|---|---|
| DK1 | collapsed icon doesn't appear for a while (added delay) | **W01 re-open** | summary-pane child stagger reads `--dock-expand-t` (1→0 on collapse) → incoming summary icon fades OUT 1.0→0.0 then snaps back at settle. NO `--dock-stagger-reveal` token exists (grep = 0) | **NOT-STARTED (RED)** |
| DK2 | hover/select state for icons + dropdowns not right | **W45 augment** (folds 1/2/4) + W09/W52 carve (fold 3, glass-material membership) | select/dropdown hover==active both `background: var(--muted)` (opaque, dock-controls.css:420,464 — byte-identical hover≡open); pickers NOT in `.glass-material` group (only `.dock-icon-button` is, glass.css:62); no `--dock-control-{hover,active}-bg` token pair | **NOT-STARTED (RED)** |
| DK3 | collapsible dock modifies page flow; icon missing | **W45 augment** (page-flow + position semantics) + needs-user-decision | `position:"inline"` default = `margin:0 auto` in-flow block, auto-margins swing per morph frame; "icon missing" is the SAME DK1 opacity-0 bug, not an absent slot | **NOT-STARTED (RED)** + RATIFY |
| DK4 | big-dock icons not aligned | **W45 augment** (net-new source defect) | `.layout-grid .dock-layer--full` has NO `place-items`/`justify-items` (grep = 0) → 40px button left-hugs its 72px tile (~16px off-center). `--dock-tile-min: 4.5rem` flat literal (dock.css:109), NOT density-scaled (comment overclaims) | **NOT-STARTED (RED)** |
| DK5 | separators when befitting | **W45** (RED witness 5, fully owned) + grid/wrap extension | `.dock-separator` is an axis-blind raw class (1px vertical hairline), no `<DockSeparator>` export, 7 demo sites hand-place the class; grid dock has no separator story | **NOT-STARTED (RED)** |
| DK6 | layers/switching should be FIRST-CLASS + animated; internal-item refinement | **W01 (clock fix)** unifies the swap onto one spring; **W06+W18 demo augment** (showcase) | once DK7's clock fix lands the swap IS first-class (one spring); the "should be SHOWCASED" remit is a W06/W18 demo gap. Dead `directionTypes` hint (DockLayerGroup.vue:94-98) computed + ignored | **NOT-STARTED** (rides DK7 fix + W06 showcase) |
| DK7 | layers far too laggy/delayed | **W01 re-open** (the SAME re-open as DK1) | leaving-pane opacity on a FIXED `opacity var(--dock-motion-resize)` CSS transition (dock.css:815) + `visibility 0s linear var(--duration-normal)` (line 816) — a SECOND/THIRD clock decoupled from the live spring ODE → ghost lingers past settle | **NOT-STARTED (RED)** |
| DK8 | rail bg's not right + mis-aligned | **W45 augment** | `.dock-layer-tab-indicator` translates inline-axis ONLY (`translateX` + `top:0`, dock.css:1299) but the DEFAULT rail is a vertical COLUMN → indicator pins at top tab, never reaches active tab below. NO `--dock-layer-rail-bg` token (grep = 0) — bare bordered gutter | **NOT-STARTED (RED)** |
| DK9 | differentiate vertical dock vs variant="rail" | **W06 augment** (Option A vs B = needs-user-decision) | `variant="rail"` force-derives `orientation=vertical` + `alwaysExpanded` (GlassDock.vue:172,191) = a thin ~6-rule surface skin over a vertical dock; carries a whole inapplicable collapse prop surface; `navigation/rail.vue` hand-rolls a WORSE active affordance | **NOT-STARTED** + RATIFY (Option A honest-variant vs B retire) |
| DK10 | dedicated VERTICAL dock SECTION | **W06+W18** (demo IA) | no dedicated dock category; dock demos scatter across `navigation/`+`foundations/`+`compositions/` (W06 RED witness 1) | **NOT-STARTED** |

### Convergence-1 dock roots (the same defects, earlier framing)

D9 (red underline → W40, demo-private), D11 (specular corner-glow → W09), D13 (persistent controls +
proportion + dividers → W45), D14 (dock showcase section → W06+W18), D15 (mobile ~1.5× → W45). These
are the convergence-1 ancestors of DK5/DK6/DK10 (D13/D14) and DK4 (D15 glyph-scale composes). All
re-confirmed unaddressed at source.

---

## 2. DEFERRED items that MUST FOLD INTO this tranche

These are dispositioned-but-unexecuted; they are NOT optional follow-ups — they are the dock band's
remaining body of work, all routed and ready to author:

1. **The W01 cardinal-lesson re-open (DK1 + DK7) — the soundness item.** W01 is marked `complete` on
   headless-green while it owns TWO live-broken arms. Per A-dock-collapse-timing + A-dock-layers-anim,
   W01 must de-mark `complete` → `live-pending` and gain TWO arms:
   - **Arm A (DK1, outer summary-stagger DIRECTION):** the incoming summary pane's children must fade IN
     (track `--dock-morph-t`), not OUT (`--dock-expand-t`). ~4-line CSS authority correction in the
     dock.css stagger block — give the incoming pane `--dock-stagger-reveal: var(--dock-morph-t)`.
   - **Arm B (DK7, inner leaving-pane crossfade CLOCK):** replace the fixed `opacity var(--dock-motion-resize)`
     CSS transition + `.is-leaving { opacity:0 }` with `opacity: calc(1 - var(--dock-morph-t))` gated on
     `[data-morphing]`, and flip visibility on the driver's spring-SETTLE callback (useLayerTransition.ts:163-167
     / dockMorphContext settleTarget), NOT the hardcoded `visibility 0s linear` 0.3s. This EXTENDS W01's
     "one clock" thesis from size to opacity — the ONE axis the W01 redress missed.
   - A new gate clause must assert the INCOMING pane's children fade IN (the current `proof:dock-animation-live`
     only asserts co-temporality — an inverted-but-co-temporal ramp passes it; that is why DK1 shipped green).

2. **W45 in full (net-new, 6 folds).** Author the wave: three-region `[persistent][divider][morph-region]`
   model + H/V proportion parity + `--dock-scale` coarse multiplier + glyph ownership + `<DockSeparator>`
   primitive + barrel export + 7 demo-site migrations + `proof:dock-region-model` (device-free + fail-closed
   π live arm) + the audit json. W45 ALSO absorbs four convergence-2 augments NOT yet written into its doc:
   - **DK2 folds 1/2/4** (mint `--dock-control-{hover,active}-bg`, route all four controls, kill opaque
     `--muted` picker fill, make hover≠open). This is a SIXTH fold A-dock-hover-select prescribes for W45;
     W45's doc does not yet mention it.
   - **DK3-pageflow** (the in-flow `margin:0 auto` reflow + the misnamed `position="inline"`) — a W45 open
     question, RATIFY (in-flow centered default vs non-reflowing overlay default).
   - **DK4** (grid `place-items: center` + `--dock-tile-min` into the density cascade) — a NET-NEW source
     defect no wave currently covers; it is a PRECONDITION for W45's `--dock-scale` to compose with the grid
     (a flat 72px tile around a 1.5×-scaled glyph is a NEW misalignment). W45's doc does not yet mention
     `.layout-grid` (its FileBounds touch :221-326 + the region layout, NOT :991-1021).
   - **DK8** (mint `--dock-layer-rail-bg` + the `--dock-layer-rail-{hover,active}` ladder + the axis-aware
     `.dock-layer-tab-indicator` + thread `axis` into the `<Tabs :orientation>`). W45's doc's "rail" is the
     persistent-controls strip — a DIFFERENT surface from the layer-switcher rail; this is a genuine scope ADD.

3. **W45 fold-3 carve to W09/W52** (the one-line `.glass-material` membership for `.dock-select-trigger`/
   `.dock-dropdown-trigger` so they inherit the bounded edge-gleam `::before`). RATIFY: static hover gleam
   vs adding `useSpecularTracking` to the picker SFCs (KISS = static).

4. **W06 in full** (the carve + honest-rail + showcase): F0 delete the token-ladder debris story, F1 one
   dock home (retire the scatter), F2 type-narrow `variant="rail"` (DK9), F4 carve `dock.css` (1425 lines)
   into `src/styles/dock/{shell,layers,layer-group,overflow}.css` partials. PLUS the convergence augments:
   the dedicated morph/animation/layer SHOWCASE section (DK6 + D14) + the explicit vertical-vs-rail contrast
   section (DK9 + DK10). W06 MUST land AFTER W45's restructure (carve the SETTLED model).

5. **The W18 dock CATEGORY** (DK10) — first-class `dock` category in the storybook IA, framing the W06
   showcase rows. Out of the dock band's CSS/SFC surface but the home for the section.

---

## 3. GAPS — unaddressed prompts / plan divergences

- **GAP-1 (the PROGRESS table lies about W01).** PROGRESS line 17 reads `W01 | complete`, but
  CONVERGENCE-PLAN-2 + two convergence-2 audits prescribe W01 → `live-pending` with the DK1+DK7 arms.
  The table was never updated. This is the exact cardinal-lesson drift the tranche polices, now present
  IN the tranche's own status table. Fix: re-mark W01 `live-pending`, list the two arms.

- **GAP-2 (W45's doc predates four of its own augments).** W45's wave doc (566 lines) covers the D13+D15
  region-model/scale/separator scope but was authored BEFORE the convergence-2 pass. It does NOT yet
  contain: the DK2 dock-control state-grammar fold, the DK4 grid-centering + tile-min-density fold, the
  DK8 layer-switcher-rail-bg + indicator-axis fold, or the DK3 page-flow open question. CONVERGENCE-PLAN-2
  §AUGMENTS routes all four to W45, but the doc must be REVISED to absorb them (with their own born-RED
  witnesses) before dispatch — otherwise an implementer working from the doc ships W45 missing half the
  user's live dock flags. **The W45 doc is a planning gap, not just an execution gap.**

- **GAP-3 (the DK7 routing was WRONG in the SOTA research; the audit corrected it).** R-dock-layer-anim
  §3.1 routes the DK7 opacity-clock fix to "AUGMENT W45." A-dock-layers-anim proves that is WRONG — W45's
  own FileBounds (line 276) EXCLUDE the morph transition as W01's. The clock fix is W01 territory. Any plan
  that follows the research's W45 routing instead of the audit's W01 correction will collide W45 against
  W01's FileBounds. Record the correction prominently: **DK7 → W01, not W45.**

- **GAP-4 (two RATIFY/needs-user-decision items unresolved).**
  - DK3: collapsible dock default — stay in-flow centered (status quo) vs pivot to a non-reflowing overlay
    default (the iOS float-above-content idiom the user's "should NOT modify page flow" implies). W45 open
    question, recorded default = co-morph proportionally / keep in-flow, surface to user.
  - DK9: rail differentiation — Option A (honest distinct `variant="rail"` with its own nav chrome) vs
    Option B (retire the variant, vertical-dock + recipe). The audit + the user's framing lean Option A;
    W06 currently ASSUMES A without a ratify gate. Surface it.

- **GAP-5 (DK6 directional layer motion deferred-NOTE).** The dead `directionTypes` (layer-back/forward)
  hint is computed but ignored (useLayerTransition.ts:50-54). Re-activating it for a directional crossfade
  `translate` is a W01/W02 driver enhancement — recorded as a deferred NOTE, secondary to the DK7 clock fix.
  Risk: if DK6's "first-class" is read as REQUIRING directional motion, it escalates past the clock fix.
  The audits judge the clock fix sufficient for "first-class"; confirm with the user if directional slide
  is wanted.

- **GAP-6 (the W45→W06 sequencing is load-bearing and tight).** The band order is W01 → W02 → W45 → W04
  → W06. W45 and W06 both mutate `dock.css`/`GlassDock.vue`/`dock-controls.css`; the band's "cannot run
  concurrently" contract applies. W45 MUST land before W06's carve (or W06 shelves a model W45 rips out).
  With W04 already complete, the live order is W01-reopen → W45 → W06. Any parallel dispatch of W45+W06
  is a file-collision.

- **GAP-7 (no W06 audit json + the line count keeps drifting).** `dock.css` was 1227 (W06 baseline) →
  1418 (convergence audit) → **1425** (HEAD). Every dock wave that lands before W06 grows it; W45 adds the
  region-model + scale cascade + separator rules ON TOP. W06's carve sizing must account for W45's net
  additions BEFORE the carve (W45 doc already flags this as a W06 freshness note).

---

## 4. The gestalt PATH FORWARD (planning, not code)

The dock band is one coherent restructure read at three altitudes — the SAME finding the convergence
audits reached. The path is NOT ten patches; it is THREE gestalt moves + the demo showcase, in band order.

**Move 1 — finish W01's "one clock" thesis (the re-open).** W01 unified the SIZE morph onto one spring
but left OPACITY on parallel CSS timers in TWO places: the outer summary-stagger DIRECTION (DK1 — the
incoming pane fades the wrong way) and the inner leaving-pane crossfade CLOCK (DK7 — a fixed CSS timer
that drifts past the spring settle). Both are "the opacity axis W01's conversion missed." The fix is the
SAME idiom W01 already speaks for size: `calc()` off `--dock-morph-t`, visibility on the driver-settle
callback, NEVER a parallel fixed-duration `transition`. This collapses the collapse-icon-appears-blank
(DK1/DK3-icon) AND the layer-swap-ghost-lag (DK7) AND makes the layer swap first-class (DK6 — one
continuous spring) in one authority correction. De-mark W01 `complete` → `live-pending`; the gate gains
the "incoming pane fades IN" assertion (the missing clause that let DK1 ship green).

**Move 2 — author W45 as the dock STRUCTURAL + STATE capability wave (revised to absorb the 4 augments).**
The three-region `[persistent][divider][morph-region]` model + H/V proportion parity + the ONE
`--dock-scale` coarse multiplier (subsuming both 44px floors via a `max(…,44px)` clamp) + library glyph
ownership + `<DockSeparator>`. REVISE the doc to fold in: the DK2 ONE-glass-aware-four-state dock-control
contract (`--dock-control-{hover,active}-bg`, kill opaque `--muted`, hover≠open), the DK4 grid
`place-items: center` + `--dock-tile-min` density-routing (a PRECONDITION for the scale to compose with
the grid), the DK8 layer-switcher-rail-bg token + axis-aware indicator. This is token-first throughout
(every magnitude a `--dock-*`/`--surface-tint-*` rung), component-over-class (the separator is a primitive,
the spacer stays a class), and clean-break (the floors retire INTO the scale, no two-path). The fold-3
`.glass-material` picker membership carves one line to W09/W52. RATIFY the DK3 page-flow default + the
`<DockSeparator>` CSS home before impl.

**Move 3 — W06 carve + honesty + showcase (lands AFTER W45 settles).** Carve the SETTLED `dock.css`
(1425 → partials), type-narrow `variant="rail"` (DK9, RATIFY Option A vs B), and author the dedicated
dock SHOWCASE section (DK6/D14 morph+animation+layers tour) + the explicit vertical-dock-vs-rail contrast
section (DK9/DK10). W18 places these rows in a first-class `dock` IA category. This is where the dock
band becomes VISIBLE — the axis-tour is the live-audit surface the π-lane reads for W01-reopen + W45.

**Closing discipline (the cardinal lesson):** every dock move closes ONLY on a LIVE real-device audit via
chrome-devtools-mcp at ≥2 viewports (desktop + 375×667 mobile) × light/dark — never a headless gate.
The dock band IS the case study for why: ten user-flagged defects shipped under W01-W04 `complete` because
"complete" collapsed to headless-green over a live-broken dock. The W00 fail-closed π arm + the paired-π
BEFORE/AFTER DELTA is the binding close for each.

**Recommended dispatch order (W04 already done):** W01-reopen (DK1+DK7, the soundness item, smallest +
highest-leverage — fixes 4 DK flags) → W45-revised (DK2/DK3/DK4/DK5/DK8 + the structural capability) →
W06+W18 (DK6-showcase/DK9-honesty/DK10-section). Strictly sequential on the shared dock files.

---

## 5. Evidence index (re-verified at HEAD c72d2ac)

- `src/styles/dock.css` — 1425 lines (the carve target, still growing). DK1 driver `:407`
  (`--dock-expand-t: calc(1 - var(--dock-morph-t))`); DK7 leaving-pane fixed clock `:815-816`
  (`opacity var(--dock-motion-resize)` + `visibility 0s linear`); DK4 grid no `place-items` (`:1006-1008`),
  `--dock-tile-min: 4.5rem` flat `:109`; DK8 indicator inline-axis-only `:1299`.
- `src/styles/dock-controls.css` — 501 lines. DK2 select/dropdown `background: var(--muted)` opaque
  hover==active `:420,:464`.
- `src/styles/glass.css` — `.glass-material` group lists `.dock-icon-button` IN (`:62`), pickers OUT.
- `src/components/custom/dock/GlassDock.vue` — DK9 `variant="rail"` force-vertical+always-expanded
  `:172,:191`; binary full|summary, no `#persistent` region.
- `src/components/custom/dock/index.ts` — NO `DockSeparator` export (W45 RED witness 5 still RED).
- ABSENT: `src/components/custom/dock/DockSeparator.vue`, `scripts/proof-dock-region-model.mjs`,
  `docs/tranches/AX/audit/W45-dock-region-model.json` (W45 NOT-STARTED).
- `package.json` — `proof:dock-region-model` NOT registered (the dock proof set ends at the W01-W04 +
  vocabulary/css-split gates).
- PROGRESS.md `:17` — `W01 | complete` (the un-applied re-open — GAP-1).
- Wave docs: `AX.W45-dock-region-model-mobile-scale.md` (566 lines, planned, doc predates 4 augments —
  GAP-2); `AX.W06-dock-storybook-honest-rail-css-split.md` (533 lines, planned, no audit json).
- Convergence-2 audits (all `5cf2980`, source-true): A-dock-collapse-timing (DK1→W01, DK3→W45),
  A-dock-layers-anim (DK7→W01, DK6→W06/W18), A-dock-hover-select (DK2→W45+W09/W52), A-dock-rail
  (DK8→W45, DK9→W06), A-dock-bigicon-sep (DK4→W45, DK5→W45). CONVERGENCE-PLAN-2 §AUGMENTS + the dedup tables.
- Convergence-1: A-waves-dock.md (D13+D15 = ONE net-new wave = W45), D13.md, D15.md.
