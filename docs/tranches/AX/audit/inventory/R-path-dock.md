# R-path-dock — the gestalt PATH FORWARD for the dock + interaction polish

**Lane** R-path-dock (path-forward synthesis) · **HEAD** `77c08c5` (3.8.0 + conv-1 W44-W52 +
conv-2 W53-W59 + W45 dock band DEVELOPED + pass-3 ledger) · **Mode** read-only PLANNING (no code
edits) · **Date** 2026-06-08

Scope: synthesize the gestalt PATH FORWARD for the DOCK + interaction band — what is DONE in dev,
what remains (W06 carve/honesty/showcase, the W18 dock category, the pass-3 dock-unify-root + Q1/Q3
follows), the Apple-liquid idiom (squish, one-clock layer transitions), and the binding sequencing.
This is the SUCCESSOR to `inventory/W-dock.md` (written at the stale `c72d2ac` base where W45 read
NOT-STARTED). The state has MOVED: W45 LANDED (commit `56db9e0` + live-verified `88a2ec5`). This
lane re-baselines on that truth.

---

## 0. Headline — the dock band is now DEVELOPED, not NOT-STARTED

`W-dock.md` (stale `c72d2ac`) called the dock band "convergence-COMPLETE on PAPER but
execution-NOT-STARTED — the dispositions exist, the code does not." That is **OBSOLETE**. Since
that inventory, the W45 dock band LANDED in one commit (`56db9e0`) and was live-verified via
Playwright MCP (`88a2ec5`). Re-verified at HEAD `77c08c5`:

- `src/components/custom/dock/DockSeparator.vue` EXISTS; exported from the `/dock` barrel (`index.ts:16`).
- `--dock-scale` appears 49× in `dock.css`; `#persistent` 5× in `GlassDock.vue`.
- **DK1 LANDED** — `.glass-dock[data-morphing] .dock-layer--summary { --dock-expand-t: var(--dock-morph-t) }`
  (`dock.css:737-738`) — the summary glyph now reveals on the INCOMING scalar (0→1), no fade-out delay.
- **DK7 LANDED** — `.glass-dock[data-morphing] .is-leaving { opacity: calc(1 - var(--dock-morph-t)) }`
  (`dock.css:1011-1012`) — the leaving pane fades on the SAME spring scalar; the second CSS clock is deleted.
- **DK2 LANDED** — `--dock-control-hover-bg` / `--dock-control-active-bg` minted (`tokens.css:1124-1125`),
  all four controls routed (`dock-controls.css:98,268,284,447,495`); the opaque `--muted` picker fill is gone.
- **DK4 LANDED** — `.glass-dock.layout-grid .dock-layer--full { place-items: center }` (`dock.css:1177`).
- **DK5 LANDED** — `<DockSeparator>` axis-aware primitive + barrel export.
- **DK8 LANDED** — axis-aware indicator (`translateY` for column rail `dock.css:1518`, `translateX`
  override `:1537`) + `--dock-layer-rail-bg` token (20 hits in dock.css).

So the **W01 cardinal-lesson re-open the convergence-2 audits prescribed (DK1 direction + DK7 clock)
was ABSORBED INTO W45**, not run as a separate W01 re-open. The audits routed DK7→W01 (W45 FileBounds
excluded the morph transition); the implementer landed it under W45 anyway. **That FileBounds-vs-actual
divergence is now moot — the fix shipped; the routing debate is closed.** The net is: the DK clock/state
work is DEVELOPED. The remaining dock body of work is W06 (carve + honesty + showcase), the W18 dock
category, the pass-3 extensions, and — the binding item — the **live-truth re-audit** (DEVELOPED ≠
live-GREEN; the cardinal lesson).

---

## 1. Status matrix — DONE / PARTIAL / NOT-STARTED / AT-RISK (re-verified at HEAD `77c08c5`)

| Item | Status | Truth at HEAD |
|---|---|---|
| **W01** single-scalar morph | **DONE** (DEVELOPED) | morph engine SOTA (one spring, FLIP, velocity-continuity `dockMorphContext.ts:205-241`). DK1+DK7 (its prescribed re-open) landed under W45 instead. PROGRESS still `complete` — defensible now the live-broken arms are fixed, but PROGRESS line 17 was never reconciled (GAP-1). |
| **W02** orchestrator | **DONE** | ONE `SpringProgress` + `registerGroup` seam; sound. The lag was never W02's vocabulary seam. |
| **W03** keepDockOpen hold | **DONE** | `W03-dock-hold-live.json`; not flagged in any DK/Q. |
| **W04** overflow/wrap | **DONE** | the `min(max-content)` invalid-CSS bug root-caused + fixed + live-verified (rowCount=2 @448px). |
| **W45** region-model + DockSeparator + `--dock-scale` + DK-band folds | **PARTIAL → DEV-COMPLETE, live-pending TUNE** | code LANDED + MCP-spot-verified. Audit JSON status: "DEV-COMPLETE (headless self-gated; live π-lane visual-truth + timing TUNE owned by the orchestrator)". The headline visual checks (DK1 collapse-icon delay, DK7 layer lag, the 1.5× mobile lockstep, the persistent-slot-in-both-states) are MCP-spot-checked, not a full paired-π BEFORE/AFTER DELTA at ≥2 viewports × light/dark. **The magnitude TUNE is owed.** Pass-3 Q1 (collapsed pill mis-sized) + Q3 (hover not noticeable) are the live-truth contradictions that prove the TUNE is not yet GREEN. |
| **W06** storybook honest-rail + dock.css carve + showcase | **NOT-STARTED** | NO `src/styles/dock/` partials dir; `dock.css` is **1639 lines** at HEAD (was 1227 W06 baseline → still drifting up post-W45); `demo/stories/foundations/dock-active-tokens.vue` debris story STILL PRESENT; no W06 audit json; the `variant="rail"` type-narrow (DK9) un-done; the morph/animation/layer SHOWCASE (DK6/D14) + vertical-vs-rail contrast section (DK9/DK10) un-authored. |
| **W18** dock IA category (DK10) | **NOT-STARTED** | manifest has 1 `dock`-ish row hit; no first-class `dock` category (overview/layers/variants/rail). |
| **DK3** page-flow / `position="inline"` semantics | **PARTIAL + RATIFY** | the `#persistent` region restructure landed, but the in-flow `margin:0 auto` reflow vs non-reflowing-overlay default is the un-resolved RATIFY (W45 open question). |
| **DK6** layers FIRST-CLASS + animated | **PARTIAL** | the CLOCK fix (DK7) makes the swap read as one continuous spring = structurally first-class. The "SHOWCASED" demo remit is a W06/W18 gap (NOT-STARTED). Dead `directionTypes` hint still computed-and-ignored (deferred NOTE). |
| **DK9** vertical-dock vs `variant="rail"` differentiation | **NOT-STARTED + RATIFY** | `variant="rail"` still force-vertical + always-expanded thin skin; Option A (honest variant) vs Option B (retire) unratified. → W06. |
| **Pass-3 Q1** collapsed pill mis-sized | **NOT-STARTED (tune)** | `--dock-collapsed-summary-min-size` token exists (`dock.css:719`) but the user flags the collapsed pill size is wrong in the demo — a magnitude TUNE owed against W45's live π. |
| **Pass-3 Q3 / DK2** hover not noticeable (only on click) | **AT-RISK (live-truth contradiction)** | the mechanism LANDED (`--dock-control-hover-bg` + `scale:var(--scale-hover-dock)` on `:hover`), but the user reads it as invisible until ACTIVE. DK2 shipped DEVELOPED yet the live read is still wrong → the magnitude/contrast of the hover state is too subtle. Couples with the W52 button-hover ask (also "not noticeable on hover"). |
| **Pass-3 dock-unify-root (DK)** | **NOT-STARTED (net-new extension)** | "ALL docks leverage the SAME root component: home-LEFT, navs, dividing lines." Extends W45's persistent region into a canonical nav PATTERN every dock adopts (the keyframes dock is the named model). |

---

## 2. DEFERRED items that MUST FOLD INTO this tranche

1. **The W45 live-truth TUNE (the binding close).** W45 is DEV-COMPLETE + MCP-spot-verified, NOT
   live-GREEN. The owed work: the paired-π BEFORE/AFTER + DELTA at ≥2 viewports (desktop + 375×667)
   × light/dark, and the magnitude tunes the live audit surfaces — concretely **Q1 (collapsed pill
   size)** and **Q3/DK2 (hover noticeable on HOVER, not just active)**. This is not new capability;
   it is the cardinal-lesson close W45's own JSON defers to the orchestrator.

2. **W06 in full — the carve + honesty + showcase (NOT-STARTED).** Now the urgent next dock wave:
   - F0 DELETE `demo/stories/foundations/dock-active-tokens.vue` (the byte-for-byte token-ladder debris, still shipping).
   - F1 ONE dock home (retire the `navigation/`+`foundations/`+`compositions/` scatter); fold `compositions/dock-with-slider` in as a "Slider in dock" section.
   - F2 type-narrow `variant="rail"` (DK9 — RATIFY Option A vs B) + hoist the polished SidebarDock nav chrome into `dock-controls.css`.
   - F4 carve `dock.css` (1639 lines) into `src/styles/dock/{shell,layers,layer-group,overflow}.css` partials — VERBATIM, deleting retired-arm tombstones, AS the SETTLED W45 model (carve-last is load-bearing: a pre-W45 carve would shelve a model W45 rewrote).
   - The D14/DK6/DK10 content augment: a dedicated morph/animation/layer SHOWCASE section + a vertical-vs-rail contrast section, on the shipped `StorySection`/`ShowcaseFrame` chassis (NO new chassis primitive).
   - **GAP carried from `A-dock-section.md`:** the W06 wave SPEC predates the D14 content scope and its RATIFY-#1 still RECOMMENDS flat `navigation/` siblings — DIRECTLY CONTRADICTING the W18 first-class `dock` category. The W06 doc MUST be amended (flip RATIFY-#1 toward category-member rows; add the morph-showcase + `dock/variants` axis-tour bullets) BEFORE dispatch, or W18 opens, finds the `dock/variants` content absent, and its §3a auto-trigger HALTs.

3. **The W18 dock CATEGORY (DK10).** First-class `dock` category (overview/layers/variants/rail),
   sibling to Foundations/Substrates; single-writer of the manifest dock rows (W06 writes the SFC
   bodies into the W18-placed stubs). Out of the dock CSS/SFC surface but the home for the showcase.

4. **The pass-3 dock-unify-root extension (net-new W45 follow).** "All docks same root component:
   home-LEFT, navs, dividing lines" + Q1 collapsed-pill sizing. This GENERALIZES W45's `#persistent`
   three-region model into a canonical nav PATTERN — the home button pinned LEFT in `#persistent`,
   the nav controls in the morph-region, `<DockSeparator>` dividers between groups — that every demo
   dock (and the keyframes dock, the named model) adopts. It is the demand-side validation of W45's
   persistent region: the user wants ONE dock root, not bespoke per-dock nav re-derivations.

5. **The DK6 directional-layer-motion deferred NOTE.** The dead `directionTypes`
   (`layer-back`/`layer-forward`) hint is computed but ignored (`useLayerTransition.ts:50-54`).
   Re-activating it for a directional crossfade `translate` is a W01/W02 driver enhancement. The
   audits judge the CLOCK fix sufficient for "first-class"; confirm with the user whether a
   directional slide flourish is wanted before escalating past the (landed) clock fix.

---

## 3. GAPS — unaddressed prompts / plan divergences

- **GAP-1 (PROGRESS table never reconciled to the landed reality).** PROGRESS line 17 still reads
  `W01 | complete` (defensible — its live-broken arms are now fixed under W45). But line 63 reads
  `W45 | live-verified (DEVELOPED) — region-model + DK1/2/4/5/7/8` while the W45 audit JSON says
  "DEV-COMPLETE … live π-lane visual-truth + timing TUNE owned by the orchestrator." PROGRESS
  over-claims "live-verified"; the JSON is honest ("the headline live checks are owed"). Pass-3 Q1+Q3
  prove the JSON is right and PROGRESS optimistic. **Re-mark W45 → `live-pending` (TUNE owed), not
  live-verified, until the paired-π DELTA + Q1/Q3 close.**

- **GAP-2 (`W-dock.md` is stale — superseded by THIS file).** The prior dock inventory was written at
  `c72d2ac` and reports W45 NOT-STARTED, no `DockSeparator.vue`, no `--dock-scale`. All FALSE at HEAD
  (W45 landed in `56db9e0`). Anyone planning the dock band off `W-dock.md` will re-author shipped work.
  This file is the current source of truth.

- **GAP-3 (the DK7-routing debate is CLOSED, not open).** `W-dock.md` GAP-3 flagged "DK7 → W01, not
  W45" as a live planning conflict (W45 FileBounds excluded the morph transition). The implementer
  landed DK1+DK7 under W45 (`56db9e0`) regardless. The fix shipped; the FileBounds-vs-actual divergence
  is now a recorded historical note, not an open conflict. Do NOT re-litigate it.

- **GAP-4 (W06 spec drift — the D14 content scope is un-amended; contradicts W18).** Per
  `A-dock-section.md` §3: the W06 wave doc was authored BEFORE the convergence-2 pass and carries ZERO
  mention of D14, while its RATIFY-#1 still recommends flat `navigation/` siblings — a LIVE
  contradiction with W18's first-class `dock` category that W18 hard-depends on. **Amend the W06 spec
  BEFORE dispatch.** This is a planning gap, not just an execution gap.

- **GAP-5 (two RATIFY items still unresolved).**
  - **DK3** — collapsible dock default: stay in-flow centered (status quo, `margin:0 auto` reflows
    per morph frame) vs pivot to a non-reflowing overlay default (the iOS float-above-content idiom
    the user's "should NOT modify page flow" implies). W45 recorded default = in-flow/co-morph; surface.
  - **DK9** — rail differentiation: Option A (honest distinct `variant="rail"` with its own nav chrome)
    vs Option B (retire the variant → `orientation="vertical" always-expanded` + recipe). The audits +
    the user's framing lean A; W06 ASSUMES A without a ratify gate. Surface it.

- **GAP-6 (the W45→W06 sequencing is load-bearing and tight).** Band order **W01 → W02 → W45 → W04 →
  W06**. W01/W02/W04/W45 are landed; the live order is now **W45-TUNE → W06+W18**. W06 carves the
  SETTLED `dock.css` (1639 lines) into partials — it MUST land AFTER any W45 TUNE re-touches dock.css,
  or W06 carves a mid-tune model. No parallel W45-tune + W06 dispatch (shared `dock.css`/`GlassDock.vue`).

- **GAP-7 (Q1/Q3 are TUNE, not capability — but they are still RED on the live product).** The
  mechanisms for both landed (collapsed-summary-min-size token; hover-bg + hover-scale). The user still
  reads them as WRONG. This is precisely the cardinal-lesson trap: a DEVELOPED mechanism over a
  live-wrong magnitude. The fix is the live π TUNE, NOT a re-architecture — but it is NOT done.

- **GAP-8 (the pass-3 dock-unify-root has no wave doc yet).** The "all docks same root, home-left,
  navs, dividers" extension (pass-3 DK + Q1) is a NET-NEW W45-follow named in the pass-3 ledger
  (`USER-DEFECTS-…-pass3.md:51`) but has no wave spec. It needs authoring (likely a W45b or a W06 fold,
  since it is the demo-side adoption of W45's persistent region + the nav pattern).

---

## 4. The Apple-liquid idiom — what is DONE vs what the dock still owes

Per `R-apple-liquid.md` + `R-dock-layer-anim.md` (SOTA, primary-source confirmed):

- **Spring curves — DONE, SOTA-clean.** `--spring-dock` (0.32, ζ 0.7, ~+4.6%) sits squarely between
  Apple's `.snappy` (bounce 0.15) and the macOS dock-magnify spring — the correct structural-morph
  register. The `--spring-*` cohort (smooth/snappy/bouncy/dock) maps to Apple's three shipped presets +
  the dock register. **The spring CURVES are NOT a defect** — W05 is SOTA-clean. No retune owed.
- **Velocity-continuity on retarget — DONE.** `dockMorphContext.ts:205-241` re-seats the live
  `SpringProgress` from `spring.velocity` on a mid-flight retarget; `useLayerTransition.ts` carries
  `inheritedVelocity`. The SIZE morph is the WWDC24 interruptible-spring idiom, correctly implemented.
- **One-clock layer crossfade (the squish/liquid "every axis on one spring") — DONE under W45.** The
  DK7 fix drives the leaving-pane opacity off `calc(1 - --dock-morph-t)`, collapsing the second CSS
  clock onto the spring. The layer swap now reads as ONE continuous liquid body (the iOS zoom
  shared-element idiom) — the dominant DK7/DK6 remediation.
- **The press-squish / volume-preserving squash atom — owed at the COMPONENT level, not the dock
  driver.** Apple's `.glassEffect(.interactive())` couples light + squish on one clock; the
  volume-preserving `scale: var(--squash) calc(1/var(--stretch))`, `maxStretch ~1.06-1.10` atom is a
  W05/W06 derivation (the SegmentedTabs indicator already lands the squish per W53). For the DOCK, the
  icon press-spring rides `--dock-press-spring` (correct). The dock magnify-FOLLOW (DK2 hover-scale)
  SOTA NOTE: a hover-magnify should ride a near-critical register (0% overshoot, `--spring-smooth`),
  NOT the dock register — a magnify that overshoots reads as jelly. **If the Q3 hover TUNE touches the
  hover-scale, pin it to a near-critical curve, not `--spring-dock`.**
- **The synchronous/cached source measurement (R-dock-layer-anim §3.4) — DEFERRED driver NOTE.** The
  rAF-deferred target-pane measurement adds a single dead pin-frame; caching the per-pane intrinsic
  extent keyed on its id (invalidate on ResizeObserver) removes it. Optional, secondary — the
  opacity-clock fix was the dominant lag. A W01/W02 driver micro-tune, not a band blocker.

**Net Apple-liquid verdict:** the dock's MOTION (springs, velocity-continuity, one-clock crossfade) is
SOTA + landed. What remains Apple-idiom-wise is the **hover LEGIBILITY** (Q3 — the catch-light/scale
must read on hover, the iOS "reacts to movement" cue) and the **showcase** (DK6 — make the first-class
layer animation VISIBLE, a W06/W18 demo deliverable). Neither is a motion-physics gap.

---

## 5. The gestalt PATH FORWARD (planning, NOT code)

The dock band is one coherent restructure read at three altitudes. Two of the three gestalt moves
LANDED (the W01 one-clock thesis was finished for opacity under W45; the W45 structural+state capability
shipped). The remaining path is the live-truth TUNE + the showcase, in band order.

**Move 1 (LANDED) — the one-clock thesis, finished.** W01 unified the SIZE morph; W45 finished it for
OPACITY in both places the W01 redress missed — the outer summary-stagger DIRECTION (DK1) and the inner
leaving-pane crossfade CLOCK (DK7). Both now `calc()` off `--dock-morph-t`. The collapse-icon-blank and
the layer-swap-ghost are gone in source; the swap is structurally first-class (one continuous spring).

**Move 2 (LANDED, TUNE owed) — W45 the dock STRUCTURAL + STATE capability wave.** Three-region
`[persistent][divider][morph-region]` + H/V proportion parity + the ONE `--dock-scale` coarse multiplier
(subsuming both 44px floors via `max(…,44px)`) + library glyph ownership + `<DockSeparator>` + the DK2
glass-aware four-state contract + DK4 grid centering + DK8 axis-aware rail. Token-first throughout,
component-over-class, clean-break. **What's owed: the live-truth TUNE** — the paired-π DELTA at ≥2
viewports × light/dark, and the magnitude corrections the live audit surfaces: **Q1 (collapsed pill
size)** and **Q3/DK2 (hover must read on HOVER, not just active)**. Plus the un-ratified DK3 page-flow
default. Re-mark W45 `live-pending` until these close.

**Move 3 (NOT-STARTED) — W06 carve + honesty + showcase, then W18 category.** Carve the SETTLED
`dock.css` (1639 → partials), DELETE the token-ladder debris story, type-narrow `variant="rail"` (DK9 —
RATIFY A vs B), hoist the SidebarDock nav chrome, and author the dedicated dock SHOWCASE (DK6/D14
morph+animation+layers tour) + the vertical-dock-vs-rail contrast section (DK9/DK10) on the shipped
StorySection chassis. W18 places these in a first-class `dock` IA category. **Amend the W06 spec FIRST**
(GAP-4 — fold in the D14 content scope; flip RATIFY-#1 toward category rows) or it collides with W18.
This is where the dock band becomes VISIBLE — the axis-tour is the live-audit surface.

**Move 4 (NOT-STARTED) — the pass-3 dock-unify-root extension.** Author the "all docks same root,
home-LEFT, navs, dividers" nav PATTERN (the demo-side adoption of W45's `#persistent` region; the
keyframes dock is the named model) + the Q1 collapsed-pill sizing. Likely a W45b / W06 fold — it is the
demand-side validation of the persistent region, unifying every demo dock onto ONE root rather than
bespoke per-dock nav re-derivations.

**Closing discipline (the cardinal lesson — the dock band IS the case study).** Ten user-flagged DK
defects + three pass-3 Q defects shipped under W01-W04 `complete` and W45 `live-verified (DEVELOPED)`
because "complete"/"verified" collapsed to headless-green/MCP-spot-check over a live-wrong magnitude.
Every remaining dock move closes ONLY on a LIVE real-device audit via chrome-devtools-mcp at ≥2
viewports (desktop + 375×667) × light/dark, captured as the paired-π BEFORE/AFTER DELTA — never a
headless gate, never an MCP spot-check standing in for the full DELTA.

**Recommended dispatch order (W01/W02/W03/W04/W45-code landed):**
**W45-TUNE (Q1 + Q3/DK2 + the DK3 ratify + the paired-π DELTA → live-GREEN)** →
**W06+W18 (the carve + honest-rail DK9 + the DK6/DK10 showcase + the dock IA category)** →
**dock-unify-root (the pass-3 nav-pattern extension + Q1 sizing finalize).**
Strictly sequential on the shared dock files (`dock.css`/`GlassDock.vue`/`dock-controls.css`).

---

## 6. Evidence index (re-verified at HEAD `77c08c5`)

- LANDED: `src/components/custom/dock/DockSeparator.vue`; `index.ts:16` export; `dock.css` `--dock-scale`
  (49×), `#persistent` in `GlassDock.vue` (5×), DK1 `:737-738` (`--dock-expand-t: var(--dock-morph-t)`
  on `.dock-layer--summary`), DK7 `:1011-1012` (`opacity: calc(1 - var(--dock-morph-t))` on `.is-leaving`),
  DK4 `:1177` (`place-items: center`), DK8 `:1518/:1537` (axis-aware indicator), `--dock-layer-rail-bg`;
  `dock-controls.css:98,268,284,447,495` (DK2 family tokens); `tokens.css:1124-1125`
  (`--dock-control-hover-bg`/`-active-bg`).
- Commits: `56db9e0` (W45 three-region + DK-band folds DK1/2/4/5/7/8), `88a2ec5` (W45 DEVELOPED +
  MCP-live-verified spot check).
- W45 audit JSON: `docs/tranches/AX/audit/W45-dock-region-model.json` status "DEV-COMPLETE (headless
  self-gated; live π-lane visual-truth + timing TUNE owned by the orchestrator)".
- NOT-STARTED: no `src/styles/dock/` partials dir (W06 carve); `dock.css` 1639 lines (carve target,
  still drifting up); `demo/stories/foundations/dock-active-tokens.vue` debris story present; no W06
  audit json; no first-class `dock` IA category in `manifest.ts`.
- Pass-3 live flags: `USER-DEFECTS-2026-06-08-pass3.md` Q1 (collapsed pill mis-sized :26), Q3 (hover
  not noticeable on hover :28), DK/dock-unify-root (:18, :51).
- SOTA: `R-apple-liquid.md` (spring presets, press-squish, the morph-as-one-liquid-body idiom),
  `R-dock-layer-anim.md` (DK7 root cause + the one-clock recipe + the magnify-follow near-critical NOTE).
- SUPERSEDED: `inventory/W-dock.md` (stale `c72d2ac` base — reports W45 NOT-STARTED; OBSOLETE, this
  file replaces it for the path-forward synthesis).
