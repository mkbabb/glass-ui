# AY.W-DOCK2 — Dock REAL entering-child lockstep gate + stagger reconcile + ONE spring/FLIP engine + rail one-clock

**Tranche** AY (glass-ui) · **Batch** 1 (DOCK band; runs AFTER W-DOCK1's captured-ABSENT VERDICT —
consumes G5) · **State** OPEN · **Repo** glass-ui · **Type** behavioral-gate re-author (entering-child
onset) + π-route fix + spring/FLIP fold + stagger KEEP-AND-DOCUMENT + rail
one-clock/single-indicator/persistence + the two captured §F morph-break reconciles · **HEAD**
`at-dock-convergence` (3.9.0 ancestor)

This wave discharges the IMPL half of the dock-lockstep chronic (PROMPT-CORPUS #5 / AUDIT-LEDGER #5,
CHRONIC across keyframes.js → AX → AY: *"the shell shrinks first, the items lag a few ms"*). The
hardening verdict (`H-dock §HEADLINE`, `H-motion-cohesion §F9`) is the binding indictment: the
shipped "lockstep" gate `proof:dock-animation-live` is **TAUTOLOGICAL** — it asserts the root
box-width onset co-occurs with the `--dock-morph-t` scalar onset, but the box width IS
`calc(… * var(--dock-morph-t))` by construction (`src/styles/dock/layers.css:55-61`), so the assert
can never red and can NEVER witness a box-leads-CONTENT desync. The thing the user perceives — the
ENTERING `.dock-layer--full` child opacity — is SAMPLED but never asserted (only the LEAVING
`.dock-layer--summary` is sampled, and even that is an explicit "best-effort … NOTE", NOT a
violation; `proof-dock-animation-live.mjs:131-139,401-409`). A wave whose hard gate cannot fail on
its own headline defect is under-specced.

This wave makes the gate REAL, folds the two duplicated motion authorities the hardening lane
found, DECIDES the stagger reconciliation W-DOCK1 measured, and lands (or formally books) the rail
one-clock/single-indicator/persistence. It does NOT rebuild solved architecture (the single-scalar
substrate is correct; that would be the gestalt failure the lane exists to catch) — it gates the
substrate's ACTUAL load-bearing claim and removes the drift the duplication invites.

---

## Goal criterion

The dock lockstep stops being a TAUTOLOGY-gated prose claim and becomes a behaviorally-FALSIFIABLE
truth. A fresh auditor can: (a) read a gate that asserts the LAST ENTERING child's opacity onset
against the box-width onset (NOT the box vs its own scalar, and NOT the LEAVING child) and REDs the
instant that onset trails past the DECIDED budget — confirmed born-RED on a synthetic lag fixture
and GREEN at HEAD, on the CORRECT `/dock/overview` route via the `data-testid="dock-capture"`
selector; (b) find ONE `DOCK_SPRING` authority that both the CSS token AND every JS driver resolve
from, gated DIRECTLY (not by the vestigial copy); (c) find ONE FLIP engine, not two drifted
near-duplicates; (d) read the recorded KEEP-AND-DOCUMENT decision on the entering-child stagger (the
verdict-ABSENT branch: the cascade is deliberate choreography, the budget is its ceiling, with the
stated `--dock-stagger-*` rationale + the 0.4-vs-0.55 reconciliation); (e) see the rail indicator
travel on the SAME `--dock-morph-t` clock, render ONE indicator (not two), and either persist on
collapse or carry a booked successor; (f) read the reconciliation of the two captured §F morph
breaks (the `container-type` footgun + the `#persistent` first-mount FLIP).

## Completion criterion

The hard-gate set (§4) verifies, each on a CAPTURED artefact: **HG1** — `proof:dock-animation-live`
(+ its π twin) asserts the LAST entering `.dock-layer--full` child opacity onset trails the
box-width onset by ≤ the decided budget, born-RED on a synthetic-lag fixture and GREEN at HEAD; the
tautological box-vs-scalar check is DEMOTED to a structural pre-check (not the lockstep witness).
**HG2** — the stagger KEEP-AND-DOCUMENT decision (forced by W-DOCK1's captured-ABSENT verdict) is
recorded in `W-DOCK2-DELTA.md` with the `--dock-stagger-*` rationale + the 0.4-vs-0.55 reconciliation
+ the `LOCKSTEP_BUDGET_MS` ceiling derivation. **HG3** — ONE
`DOCK_SPRING` authority exists; `proof:spring-tokens-synced` reads the CANONICAL copy (not the
vestigial one) and REDs on a retune of the real driver — proven by a born-RED diff. **HG4** — ONE
FLIP engine: `useLayerTransition.ts` either folds onto the orchestrator primitive (deletion proof)
or is formally booked with a stated drift-guard. **HG5** — the rail indicator travels on
`--dock-morph-t` (one clock), renders exactly ONE `<TabsIndicator>` (single-indicator), and
collapse-persistence is LANDED or BOOKED — verified by `proof:dock-rail-cohesion` (born-RED on the
double-indicator + the second-clock token). **HG6** — `proof:live-verified-ledger --tranche=AY`
GREENs on the `W-DOCK2` row (own-surface light+dark frame-series DELTA present). The gates run IN CI.
**HG7** — the two captured §F morph breaks are reconciled (§F1 `container-type` trap documented-or-gated;
§F2 `#persistent` first-mount FLIP fixed-or-booked). The π-twin route is FIXED (`pi-manifest.ts:78` →
`resolveScene("dock","overview")`), so the gate runs against the real collapsible dock.

---

## §1 — The verified defects (file:line, source-grounded)

**D1 — the lockstep gate is a TAUTOLOGY; the entering-child onset is never asserted.**
`proof-dock-animation-live.mjs:385-399` (and its π twin `tests-visual/dock-animation-live.spec.ts:181-190`)
assert ONE binding lockstep condition: the root box-width onset and the `--dock-morph-t` scalar
onset co-occur within ≤1 frame (the `onsetDelta > ONSET_TOLERANCE_MS` violation at `:395-398`). But
`src/styles/dock/layers.css:55-61` makes the box width a pure `calc()` read of that scalar
(`--dock-morph-size: calc(--dock-morph-from + (--dock-morph-to − --dock-morph-from) *
var(--dock-morph-t))`; `inline-size: var(--dock-morph-size)`). Asserting "the box onsets within
1 frame of the scalar that DEFINES the box" is a tautology: it can never red, and it can never
witness a box-leads-CONTENT desync (it only proves the box can't lead its own driver, which is
structurally impossible). The CHILD content — the property the user reports lagging — is sampled at
`proof-dock-animation-live.mjs:133` but it is the LEAVING `.dock-layer--summary` pane, and even
that is recorded as a "best-effort … NOTE" at `:401-409` with the comment *"the load-bearing asserts
are the two rising-frame counts + the single-clock onset above."* It is a fact, not a violation. The
ENTERING `.dock-layer--full` children — the deliberately staggered controls the user watches fade
in — are never sampled and never asserted. **W-DOCK1's captured DELTA confirms this directly:** it
MEASURED `box↔scalar onset Δ = 0.0 ms` on all 12 captures (the tautology is true-by-construction
on the device) while the entering child trails by 36.7–96.2 ms — the number the tautological gate
is blind to. The gate must witness THAT number, not re-prove the box rides its own scalar.

**D2 — the entering-child stagger lags the box BY DESIGN, up to the full window; never reconciled
against "lockstep".** `src/styles/dock/layers.css:235-250` (the reveal ramp) + `:252-282` (the
per-child onset ladder): entering children reveal via
`opacity = clamp(0, (--dock-expand-t − --dock-stagger-onset) / --dock-stagger-window, 1)`,
`--dock-stagger-onset = --dock-stagger-step × (childIndex − 1)` capped at the 6th child
(`nth-child(n + 6)` holds at `step × 5`, `:280-282`). The shipped defaults
(`src/styles/dock/shell.css:51,53`): `--dock-stagger-window-size: 0.4`, `--dock-stagger-step: 0.08`.
(Note: `layers.css:235` declares the FALLBACK `var(--dock-stagger-window-size, 0.55)`; the SHIPPED
value is `shell.css:51`'s `0.4` — the budget derivation in move 2 must use the shipped `0.4`, not the
`0.55` fallback the W-DOCK1-DELTA prose quoted; this 0.4-vs-0.55 reconciliation is part of HG2.) So
child 1 reaches full opacity at `expand-t ≈ 0.4`; child 6+ at `0.08×5 + 0.4 = 0.8`. The box reaches
expanded size at `t≈1.0` (the spring), but the LAST controls are still ramping from `t=0.4→0.8`.
This IS "the shell expands, items lag." It is intentional macOS-dock cascade, but the user reads it
AS the lag complaint (`H-dock §D1`). **W-DOCK1's captured verdict is ABSENT** (the 36.7–96.2 ms trail
MATCHES the deliberate stagger window; it is not an extra desync on top). So the decision is FORCED
to the **KEEP-AND-DOCUMENT** branch (move 2b) — NO behavioral re-tune — but the gate must still
witness the ceiling: a regression PAST the deliberate stagger (a re-added per-child second clock, a
mis-tuned window) must RED. AY DECIDES the budget number; it does not silently keep an unbounded lag.

**D3 — TWO live `DOCK_SPRING` copies; the sync gate reads the WRONG (vestigial) one.**
`DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 }` is hard-typed TWICE:
`src/components/custom/dock/composables/dockMorphContext.ts:39` (the orchestrator that drives EVERY
`<GlassDock>` morph — the REAL shipped one) and
`src/components/custom/dock/composables/useLayerTransition.ts:36` (the standalone `<DockLayerGroup>`
fallback engine). `proof-spring-tokens-synced.mjs:27-30,62-64` reads `DOCK_SPRING` ONLY out of
`useLayerTransition.ts` (`const LAYER_TS = …/useLayerTransition.ts`; `detectBand()` matches the const
in `layerSrc`). A dev retuning the ACTUAL shipped morph at `dockMorphContext.ts:39` to a bouncier ζ
changes the real overshoot while the gate stays GREEN reading the OTHER, increasingly-vestigial copy
(`H-dock §D2`). The dead-witness class: the morph's real spring constant is gated by proxy, never
directly.

**D4 — `useLayerTransition` (263) and `dockMorphContext` (408) are TWO near-identical FLIP engines
that have DRIFTED.** Both implement the same measured-once FLIP-pin-rAF-`max-content`-measure-arm
dance (`useLayerTransition.ts:170-245` vs `dockMorphContext.ts:268-341`; the `max-content`
force-measure comment block is near-verbatim at both). They have already diverged load-bearingly:
the orchestrator re-bases SIBLING targets' `from` to current painted px before resetting the shared
scalar (`dockMorphContext.ts:296-303`); the standalone has NO sibling logic. So a standalone
`<DockLayerGroup>` and a nested one have DIFFERENT mid-flight retarget behaviour from the same
author intent (`H-dock §D3`). DRY/KISS violation + drift hazard. `useLayerTransition` is consumed
ONLY by `DockLayerGroup.vue:101` (the `else` branch, when `useOptionalDockMorphContext()` returns
`null` — the standalone-outside-a-dock path) and re-exported on `/dock`
(`src/components/custom/dock/index.ts:33`).

**D5 — the rail indicator is on a SECOND clock + DOUBLE-renders + VANISHES on collapse.**
- **Second clock:** `src/styles/dock/layer-group.css:199-202` — `.dock-layer-tab-indicator`
  transitions `width/height/transform` on `var(--dock-motion-resize)` (a fixed linear() curve),
  while the pane morphs on the live `--dock-morph-t` spring. DK7 (`layers.css:118-130`) killed
  exactly this second-clock pattern for the leaving-pane opacity but left it alive on the rail
  (`H-dock §D7` L2).
- **Double-indicator:** `src/components/ui/tabs/TabsList.vue:17-19` defaults `indicator: true` and
  renders `<TabsIndicator v-if="indicator" />` at `:38`. `DockLayerGroup.vue:202` mounts
  `<TabsList class="dock-layer-rail">` WITHOUT `:indicator="false"`, then ALSO renders an explicit
  `<TabsIndicator class="dock-layer-tab-indicator" />` at `:224`. So the rail paints TWO indicators —
  the base shadcn `bg-[var(--glass-bg-quiet)]` default plate AND the dock's `--primary 15%` plate
  (`H-dock §D7` L1).
- **Vanishes on collapse:** the switcher rail lives inside the `:inert`/clipped `--full` pane, so it
  disappears on collapse with no persistent way to switch layers (`H-dock §D7` L3).

**D6 — the `--dock-press-spring` ROOT default is OFF-DOCTRINE, shadowed by a per-surface re-point.**
`src/styles/tokens.css:1771`: `--dock-press-spring: var(--duration-fast) var(--spring-bouncy)` — but
the §6 easing doctrine (`tokens.css:172-174`) is explicit: transform press → `--spring-smooth` or
`--spring-snappy`, NEVER bouncy. `src/styles/dock-controls.css:43` then RE-POINTS it to
`--spring-smooth` for the four named controls — the exact per-surface fork the doctrine claims to
have killed (`H-motion-cohesion §F1`). Any consumer of `--dock-press-spring` that is NOT one of the
four named controls inherits the bouncy value. This is the dock's slice of the motion-cohesion
finding; it folds HERE (root token → `--spring-smooth`; the dock-controls re-point becomes a dead
byte-identical redeclaration and is DELETED). The broader §6 enforcement (cards.css, Aurora.vue,
MetricRow, Toast, the gate scope-widen) is **W-MOTION's** scope; this wave owns ONLY the
`--dock-press-spring` dock token (no overlap — coordinate per §5).

**D7 — the π twin's dock route resolves to the WRONG page (the same blind-spot that hid the
entering-child morph).** `tests-visual/pi-manifest.ts:78` resolves `PI_TARGETS.dock` to
`resolveScene("navigation", "dock")` — but `manifest.ts:204-211` proves the `navigation` category
has NO `dock` story (tabs / deck-progress / header-ribbon / carousel only). The real collapsible dock
is `("dock", "overview")` (`manifest.ts:219`). So `dock-animation-live.spec.ts:81`'s
`page.goto(PI_TARGETS.dock.path)` lands on a catch-all/non-morphing route — the EXACT reason no
entering-child morph was ever sampled (the source-arm gate's `:65` `/navigation/dock` hardcode is the
twin of this). W-DOCK2 must FIX `pi-manifest.ts:78` to `resolveScene("dock", "overview")` — NOT merely
"confirm it resolves," which the original spec wording wrongly assumed.

**D8 — the W-DOCK1 capture surfaced TWO morph BREAKS routed HERE (NOT items-lag, but adjacent to the
morph machinery W-DOCK2 owns).** Recorded in `W-DOCK1-DELTA.md §F1/§F2`:
- **§F1 — the `container-type: inline-size` trap on `containerName`.** `GlassDock.vue:184-189` makes
  the `containerName` prop co-apply `container-type: inline-size`, which CLAMPS a collapsible dock to
  its contained intrinsic size and FREEZES the morph (`--dock-morph-t` stuck at 0). The capture had to
  use a plain `data-testid="dock-capture"` instead. W-DOCK2 reconciles whether `containerName` on a
  COLLAPSIBLE dock is a footgun to GATE (red the combination) or DOCUMENT (a banner that the prop is
  always-expanded-only). This is the AT.W7 / 3.4.0 dock-collapse-vs-container-type interaction
  re-surfacing on the prop.
- **§F2 — the `#persistent`-slot dock first-mount FLIP mis-seat.** The overview's FIRST collapsible
  dock (the `#persistent`-slot nav-pattern dock at `overview.vue:89`) mounts in a degenerate
  `expanded`+collapsed-width state on a fresh, never-interacted session (10 px → 18 px, scalar 0)
  while the non-`#persistent` collapsible docks morph cleanly — an intermittent first-mount FLIP
  measurement break. W-DOCK2 owns a first-mount FLIP-measurement audit (it touches the FLIP engines
  in move 4 — this finding lives in the same code).

These together: the headline gate is blind AND aimed at the wrong route, the real spring is gated by
a vestigial proxy, two FLIP engines drift, the rail runs a second clock + paints two indicators, the
dock press token is off-doctrine, and two captured morph breaks need reconciling.

---

## §2 — Objective

Make the lockstep gate REAL, fold the two motion authorities, DOCUMENT the stagger (the
verdict-ABSENT branch), land/book the rail, and reconcile the two §F morph breaks. Seven moves:

1. **Re-author `proof:dock-animation-live` to assert the ENTERING-child onset + FIX the route (D1, D7).**
   Replace the tautological box-vs-scalar binding assert with the REAL lockstep witness: sample the
   LAST entering `.dock-layer--full > *` child's opacity (the largest-onset child — the
   `nth-child(n+6)` cap rung) on the SAME rAF timeline as the box width, and ASSERT
   `lastEnteringChildOnsetMs − boxWidthOnsetMs ≤ LOCKSTEP_BUDGET_MS`. The box-vs-scalar onset check
   (`:385-398`) is DEMOTED to a structural pre-check (kept as a cheap sanity that the scalar drives
   the box, but NOT the binding lockstep witness — drop the `violations.push`, correct the `:385-388`
   comment to say so). The `onsetTimeMs` / `risingFrames` pure helpers
   (`proof-dock-animation-live.mjs:259-297`) are reused, not re-rolled. **Fix BOTH route halves:**
   (a) the source arm `DOCK_ROUTE` (`:65`) + the re-mount `clickLink` (`:202-205`) → `/dock/overview`,
   and the probe selects `.glass-dock[data-testid="dock-capture"]` (the plain testid — NOT
   `data-container-name`, which co-applies `container-type: inline-size` and FREEZES the morph, the
   §F1 trap); (b) the π twin's `tests-visual/pi-manifest.ts:78` is WRONG —
   `resolveScene("navigation", "dock")` resolves to a non-dock page (`manifest.ts:204-211` has no
   `navigation/dock` story); FIX it to `resolveScene("dock", "overview")` so
   `dock-animation-live.spec.ts:81`'s `page.goto(PI_TARGETS.dock.path)` reaches the real collapsible
   dock. Do NOT merely "confirm" the route — it is broken. The π twin gets the SAME entering-child
   assertion + the same testid selector.

2. **DOCUMENT the stagger on W-DOCK1's verdict (D2) — the KEEP branch is FORCED.** W-DOCK1's captured
   verdict is **lag captured-ABSENT** (`W-DOCK1-DELTA.md` VERDICT: `box↔scalar Δ = 0 ms`, the
   36.7–96.2 ms trailing-child trail MATCHES the deliberate stagger window). So the decision is FORCED
   to **keep + document** — there is no clock desync to tighten away, and a tighten would churn solved
   choreography (the precept-violating gestalt failure the lane exists to catch). Therefore:
   - KEEP `shell.css:51,53` values UNCHANGED (`--dock-stagger-window-size: 0.4`, `--dock-stagger-step: 0.08`).
   - SET `LOCKSTEP_BUDGET_MS` to the analytically-derived deliberate last-child ceiling
     `(window + step×5) × morph-duration` PLUS a frame epsilon. **Reconcile the window number first:**
     the SHIPPED window is `0.4` (`shell.css:51`), NOT the `0.55` `layers.css:235` fallback the
     W-DOCK1-DELTA prose quoted — use `0.4`. With the ~650 ms morph that yields a ceiling
     ≈ `(0.4 + 0.08×5) × 650 ≈ 520 ms` (or derive from the morph duration the gate measures); the
     captured 96.2 ms max comfortably clears it, and the budget is a true ceiling that REDs a
     regression PAST the deliberate stagger (a re-added per-child second clock, a mis-tuned window).
   - RECORD the `--dock-stagger-*` rationale + the budget derivation in `W-DOCK2-DELTA.md` (HG2),
     including the 0.4-vs-0.55 reconciliation.
   The budget is a STATED NUMBER the gate enforces; no silent unbounded lag. The off-doctrine
   `--dock-press-spring` root token is fixed in the same edit batch (D6): `tokens.css:1771` →
   `var(--spring-smooth)`; `dock-controls.css:43` re-point DELETED (now dead byte-identical).

3. **Fold to ONE `DOCK_SPRING` authority, gated directly (D3).** Establish a SINGLE source of the
   `(response, ζ)` pair. Since the FLIP-engine fold (move 4) removes the standalone copy entirely,
   the canonical authority is the orchestrator's `dockMorphContext.ts:39` const. Re-point
   `proof-spring-tokens-synced.mjs:27-30` (the `LAYER_TS` path) + `:62-64` (`detectBand`'s
   `constMatch` read) to resolve `DOCK_SPRING` from the CANONICAL file (the orchestrator, post-fold),
   so the gate reads the spring that ACTUALLY drives every shipped dock. If move 4 books rather than
   folds, hoist the const to a single shared module both engines import, and point the gate at THAT
   module — never two live copies with the gate on the less-load-bearing one.

4. **Fold to ONE FLIP engine (D4).** The orchestrator (`dockMorphContext.ts`) is the superset (it
   carries the sibling-rebase logic the standalone lacks). The standalone `<DockLayerGroup>` path
   (`DockLayerGroup.vue:100-118` `else` branch) is the only `useLayerTransition` consumer + the
   `/dock` re-export (`index.ts:33`). FOLD it: make the standalone group also drive through a
   single-target orchestrator (a `<DockLayerGroup>` outside a dock provides its OWN
   `useDockMorphOrchestrator` rooted at its container, registering one target) so there is ONE FLIP
   primitive. Delete `useLayerTransition.ts` (deletion proof) + its re-export + its type re-exports
   (`composables/index.ts:4-5`, `index.ts:33`). If the fold cannot land cleanly inside this wave's
   bounds (the standalone path's `morphRoot(el).closest(".glass-dock")` fallback + the
   `directionTypes` standalone hint need re-homing), BOOK it to a named successor (W-GOD1 dock-carve)
   with a stated drift-guard gate (`proof:dock-orchestrator-single`, the existing
   `proof:dock-orchestrator-single.mjs`, EXTENDED to assert exactly one `FLIP-pin-measure-arm`
   implementation in the dock band) — but the BOOK must be explicit, not a silent keep.

5. **Rail one-clock + single-indicator + persistence (D5).** Three edits:
   - **single-indicator:** pass `:indicator="false"` on the `<TabsList class="dock-layer-rail">`
     mount (`DockLayerGroup.vue:202`), so ONLY the explicit `.dock-layer-tab-indicator` at `:224`
     paints (TabsList.vue:38 `v-if="indicator"` then renders nothing). Deletion of the phantom default
     indicator is observable in the rendered DOM (one `[data-slot="tabs-indicator"]`, not two).
   - **one clock:** re-point the rail indicator transition (`layer-group.css:199-202`) OFF
     `--dock-motion-resize` onto the `--dock-morph-t` scalar — drive the indicator
     `transform`/`width`/`height` as a `calc()` function of the live scalar (or, where reka owns the
     `--reka-tabs-indicator-position` write, gate the rail indicator's settle on `[data-morphing]`
     and use the spring-register transition `--spring-snappy` for the rail's OWN tab-to-tab travel —
     a tab switch is a discrete selection, not the box morph). The DECISION (fold onto `--dock-morph-t`
     vs use the spring-snappy register for the discrete rail selection) is recorded in
     `W-DOCK2-DELTA.md`; the binding outcome is NO `--dock-motion-resize` (the DK7-killed fixed-linear
     second clock) survives on the rail.
   - **persistence:** LAND a persistent rail (the switcher rail rendered OUTSIDE the clipped `--full`
     pane so it survives collapse) OR BOOK it as a named successor with a stated rationale (a vertical
     rail dock has no collapse machinery per `SidebarDock.vue:4-6`; the persistent-switcher pattern
     may need a `GlassDock` slot the band does not yet have). The BOOK must name the successor + the
     gate that will witness it.

6. **Wire the gates into CI + capture the DELTA (cardinal lesson).** Add `proof:dock-animation-live`
   + the new `proof:dock-rail-cohesion` to `.github/workflows/ci.yml` (the live arm runs in the π
   workspace job; the structure/token arms run on every runner). Capture the W-DOCK2 frame-series
   DELTA (the entering-child onset NOW within budget) into `docs/tranches/AY/audit/visual/`,
   own-surface light+dark, and flip `proof:live-verified-ledger --tranche=AY` GREEN on `W-DOCK2`.

7. **Reconcile the two captured §F morph breaks (D8).**
   - **§F1 — the `container-type` trap.** DECIDE: GATE the footgun (a `proof:dock-rail-cohesion`-adjacent
     or `proof:dock-region-model` clause that REDs if a COLLAPSIBLE `<GlassDock>` — one without
     `always-expanded` — also carries `containerName`/`container-type: inline-size`) OR DOCUMENT it
     (a `GlassDock.vue:184-189` comment + CLAUDE.md note that `containerName` is always-expanded-only,
     because `container-type: inline-size` clamps the morph). The chosen path + rationale land in
     `W-DOCK2-DELTA.md`; the binding outcome is the footgun is no longer silent.
   - **§F2 — the `#persistent`-slot first-mount FLIP mis-seat.** AUDIT the first-mount FLIP-measurement
     path on a `#persistent`-slot collapsible dock (`overview.vue:89`): determine why the FLIP measures
     `collapsed→collapsed` on a fresh, never-interacted mount and either FIX the first-mount measure
     (the morph engine seats the `--dock-morph-from/to` px before first paint) or BOOK it with a stated
     reproduction + named successor. The FLIP-engine fold (move 4) touches the same code, so this audit
     rides that edit; the decision lands in `W-DOCK2-DELTA.md`.

This honors gestalt (the single-scalar substrate is KEPT — the gate and the duplication are fixed,
not the architecture), no-workaround (reuse the existing pure helpers + the existing
`proof:dock-orchestrator-single`; no parallel re-roll), root-not-consumer (gate the library dock on
the library demo), the ≥2-consumer bar (the folded FLIP primitive serves both the nested AND
standalone group; `useLayerTransition` had exactly one consumer + a re-export — a clean fold target),
and the cardinal DELTA (a captured frame-series, born-RED gate, not a commit-message claim).

---

## §3 — Files + exact edit-sites

| file | edit |
|---|---|
| `scripts/proof-dock-animation-live.mjs` | (1) the in-page probe (`sampleExpand`, `:131-139`): ALSO sample the LAST entering `.dock-layer--full > *` child (`dock.querySelector(".dock-layer--full")` → its last child, the §F-faithful surface) opacity on the same timeline, returning `enteringChildOpacities` + `enteringChildOnset` (reuse the `proof-dock-items-lag-capture.mjs:99-101` last-child resolver pattern). (2) `detectAnimation` (`:385-398`): DEMOTE the box-vs-scalar onset block to a non-binding structural pre-check (keep the `facts.onsetDeltaMs`, drop the `violations.push` at `:395-398`, correct the `:385-388` comment to "structural sanity — the box rides the scalar by construction, NOT the lockstep witness"), and ADD the binding assert `lastEnteringChildOnsetMs − boxWidthOnsetMs ≤ LOCKSTEP_BUDGET_MS` (a new module const, the W-DOCK2 KEEP-branch ceiling). RED if the entering child was not sampled (empty/frozen) — the D1 blind-spot must not recur. (3) `DOCK_ROUTE` (`:65`) → `/dock/overview`; the re-mount `clickLink` (`:202,204`) → `/dock/overview`; the probe selects `.glass-dock[data-testid="dock-capture"]` (W-DOCK1's deterministic target — the plain testid, NOT `data-container-name` which freezes the morph per §F1). |
| `tests-visual/pi-manifest.ts:78` | **FIX (D7).** `get dock()` currently returns `resolveScene("navigation", "dock")` — a non-dock route (`manifest.ts:204-211` has NO `navigation/dock` story). Change to `resolveScene("dock", "overview")` so `PI_TARGETS.dock.path` resolves to `/dock/overview` (the real collapsible dock). This is the π-twin half of the route fix; do NOT merely "confirm." |
| `tests-visual/dock-animation-live.spec.ts` | the π twin: at `:81` `page.goto(PI_TARGETS.dock.path)` now lands on `/dock/overview` (via the pi-manifest fix); select `.glass-dock[data-testid="dock-capture"]`; sample the same LAST entering `.dock-layer--full > *` child opacity (`:121-131`, beside the existing `.dock-layer--summary` LEAVING sample), add the binding `expect(childOnset − boxOnset).toBeLessThanOrEqual(LOCKSTEP_BUDGET_MS)` assert beside the existing onset block (`:184-190`); DEMOTE the box-vs-scalar assert to a structural pre-check. |
| NEW `tests-visual/fixtures/dock-entering-child-lag.html` (or an in-spec injected fixture) | the SYNTHETIC LAG fixture for the born-RED witness: a `.glass-dock` whose entering `.dock-layer--full` children carry an ADDED per-child `transition: opacity 300ms ease 200ms` (a SECOND clock + a 200ms delay) on top of the scalar ramp — the exact regression class (a re-added per-child CSS transition). The re-authored gate must RED on this fixture (the entering child onset trails the box past budget) and GREEN on the real `/dock/overview` dock. The fixture is the deletion/born-RED proof for HG1. |
| `src/styles/dock/shell.css:51,53` | the stagger DECISION (D2 / move 2): **KEEP** the shipped `--dock-stagger-window-size: 0.4` + `--dock-stagger-step: 0.08` UNCHANGED (W-DOCK1's verdict is captured-ABSENT — no clock desync to tighten away). The rationale + the `LOCKSTEP_BUDGET_MS` ceiling derivation (using the shipped `0.4`, not the `0.55` fallback) land in `W-DOCK2-DELTA.md`. No source edit here unless the audit finds a regression. |
| `src/styles/tokens.css:1771` | `--dock-press-spring: var(--duration-fast) var(--spring-smooth)` (was `--spring-bouncy`) — the §6 doctrine register (D6). Reconcile the `:1764-1771` comment to name the doctrine register + the §6 cross-ref. |
| `src/styles/dock-controls.css:43` | DELETE the now-dead byte-identical `--dock-press-spring: … var(--spring-smooth)` re-point (the root token IS the doctrine register now — the per-surface fork is removed). |
| `src/components/custom/dock/composables/dockMorphContext.ts:39` | the CANONICAL `DOCK_SPRING` authority (post-fold the ONLY copy). No value change; this is the single source. |
| `src/components/custom/dock/composables/useLayerTransition.ts` | DELETE (fold onto the orchestrator — move 4), OR if booked: hoist `DOCK_SPRING` (`:36`) to a shared module both engines import + add the drift-guard. The clean-fold target is deletion. |
| `src/components/custom/dock/composables/index.ts:4-5` | drop the `useLayerTransition` + type re-exports on fold. |
| `src/components/custom/dock/index.ts:33` | drop the `/dock` `useLayerTransition` re-export on fold (clean break — no alias; the standalone path now routes through the orchestrator). |
| `src/components/custom/dock/DockLayerGroup.vue:100-118` | the `else` (standalone) branch: route through a self-rooted `useDockMorphOrchestrator` (one target) instead of `useLayerTransition`, so there is ONE FLIP primitive at both nesting levels. |
| `scripts/proof-spring-tokens-synced.mjs:27-30,62-65` | re-point `LAYER_TS` (`:27-30`) + `detectBand`'s `constMatch` read (`:62-65`) to the CANONICAL `DOCK_SPRING` file (`dockMorphContext.ts` post-fold, or the shared module if booked) — the gate now reads the spring that drives every shipped dock, not the vestigial copy. The `:32-33` comment ("Mirrors DOCK_SPRING in useLayerTransition.ts") + the `:132,156` `useLayerTransition.ts` label refs are corrected to name the canonical file. |
| `src/components/custom/dock/DockLayerGroup.vue:202` | add `:indicator="false"` on `<TabsList class="dock-layer-rail">` — kill the phantom default indicator (D5 single-indicator). |
| `src/styles/dock/layer-group.css:199-202` | re-point the `.dock-layer-tab-indicator` transition OFF `--dock-motion-resize` onto the `--dock-morph-t` scalar (one clock) OR the `--spring-snappy` register for the discrete rail selection (decision recorded in the DELTA); the binding outcome is NO surviving `--dock-motion-resize` on the rail. |
| `src/components/custom/dock/DockLayerGroup.vue` (rail block `:196-226`) / `src/styles/dock/layer-group.css` | rail persistence: render the switcher rail OUTSIDE the clipped `--full` pane (LAND) or add the BOOK marker comment + the named successor. |
| NEW `scripts/proof-dock-rail-cohesion.mjs` | the rail gate: (a) parse `DockLayerGroup.vue` — assert `<TabsList class="dock-layer-rail">` carries `:indicator="false"` (single-indicator, born-RED on HEAD where it is absent); (b) parse `layer-group.css` — assert `.dock-layer-tab-indicator` carries NO `--dock-motion-resize` (one clock, born-RED on HEAD); (c) the persistence clause — assert the rail markup is outside the `--full` clip (LAND) or a `BOOKED:` marker + a successor wave-id is present (formal book). A π twin (`tests-visual/dock-rail-cohesion.spec.ts`) asserts the rendered DOM carries exactly ONE `[data-slot="tabs-indicator"]` under `.dock-layer-rail`. |
| `package.json` (beside `:556`) | ADD `"proof:dock-rail-cohesion": "node scripts/proof-dock-rail-cohesion.mjs"` (lands at ~`:559`). |
| `src/components/custom/dock/GlassDock.vue:184-189` / `CLAUDE.md` (or a `proof:dock-region-model`/`proof:dock-rail-cohesion` clause) | **§F1 reconcile (D8).** The `containerName` prop co-applies `container-type: inline-size`, which FREEZES a collapsible dock's morph. DECIDE: document (a `GlassDock.vue:184-189` comment + a CLAUDE.md dock-section note that `containerName` is always-expanded-only) OR gate (a clause that REDs a collapsible `<GlassDock>` carrying `containerName`). The decision + rationale land in `W-DOCK2-DELTA.md`. |
| `src/components/custom/dock/dockMorphContext.ts` (first-mount FLIP seat) / `DockLayerGroup.vue` | **§F2 audit (D8).** Audit why a `#persistent`-slot collapsible dock (`overview.vue:89`) first-mounts in a degenerate `expanded`+collapsed-width state (FLIP measures `collapsed→collapsed`). FIX the first-mount measure (seat `--dock-morph-from/to` before first paint) or BOOK with a reproduction + named successor. Rides the move-4 FLIP-engine edit. Recorded in `W-DOCK2-DELTA.md`. |
| `.github/workflows/ci.yml` (beside `:52-61` dock gates + the π job) | ADD `proof:dock-animation-live` + `proof:dock-rail-cohesion` (CI inclusion is the `H-motion-cohesion §F5`/§convergence-3 requirement — the live gate must run IN CI, not be excluded). Run `npm run proof:gen-ci-fresh` to re-byte-lock the manifest. |
| NEW `docs/tranches/AY/audit/visual/W-DOCK2-DELTA.md` | the impl write-up: the stagger DECISION (tighten vs keep) against W-DOCK1's captured number, the chosen `--dock-stagger-*` values + rationale, the `LOCKSTEP_BUDGET_MS` derivation, the born-RED/GREEN gate stdout for HG1 (synthetic-lag fixture RED, HEAD GREEN), the spring-authority born-RED diff (HG3), the FLIP-engine deletion proof or book (HG4), the rail cohesion before/after (HG5), and the own-surface light+dark frame-series keyframe strips (HG6). |
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` | append `"W-DOCK2"`. |
| `docs/tranches/AY/PROGRESS.md` | add the `W-DOCK2` row referencing `W-DOCK2-DELTA.md`. |

NOT in scope (named successors): the broader §6 motion-cohesion enforcement (cards.css hover,
Aurora.vue 600ms, MetricRow, Toast register, the `proof:animation-coherence` scope-widen + CI
inclusion + the speedtest `--ease-apple-spring` re-point, the `--scale-hover-btn` value/comment
drift) → **AY.W-MOTION** (this wave touches ONLY the `--dock-press-spring` dock token — no overlap);
the `GlassDock.vue` 608-line DO-NOT-SPLIT-banner reconciliation → **AY.W-GOD1** (coordination per §5);
the dock+slider live DELTA + the missing `dock-with-slider.vue` story → **AY.W-DOCK3**.

---

## §4 — HARD GATE (evidence-backed)

The hard gate is a SET of born-RED-proven behavioral + structural conditions, each backed by an
artefact (a gate exit code on a synthetic-lag fixture, a born-RED diff, a deletion proof, a captured
frame-series DELTA) — never a grep / "API exists" / tautology check. The umbrella ledger clause is
named `proof:live-verified-ledger`.

**HG1 — the REAL entering-child lockstep gate REDs on synthetic lag, GREENs at HEAD.**
`proof:dock-animation-live` (and its π twin) sample the LAST entering `.dock-layer--full > *` child
opacity on the box-width timeline and assert
`lastEnteringChildOnsetMs − boxWidthOnsetMs ≤ LOCKSTEP_BUDGET_MS`. The born-RED witness: run the gate
against `tests-visual/fixtures/dock-entering-child-lag.html` (the synthetic fixture with a re-added
per-child `transition: opacity 300ms ease 200ms` second clock) → exit **1** with the violation
`the last entering child opacity onset (Xms) trails the box-width onset (Yms) by Zms (> budget)`.
The GREEN witness: run against the real `/dock/overview` dock → exit **0** (the entering child onset
is within budget). The tautological box-vs-scalar onset check is DEMOTED to a non-binding structural
pre-check (its comment corrected to "the box rides the scalar by construction — structural sanity,
NOT the lockstep witness"). Captured: the born-RED + GREEN stdout + exit codes in `W-DOCK2-DELTA.md`.

**HG2 — the stagger KEEP-AND-DOCUMENT decision is recorded against W-DOCK1's ABSENT verdict.**
W-DOCK1's verdict is captured-ABSENT (`box↔scalar Δ = 0 ms`; the 36.7–96.2 ms trail IS the deliberate
stagger), so the branch is FORCED to KEEP-AND-DOCUMENT: `shell.css:51,53` values stay UNCHANGED
(`window 0.4`, `step 0.08`); `LOCKSTEP_BUDGET_MS` is set to the analytically-derived deliberate
last-child ceiling `(0.4 + 0.08×5) × morph-duration + frame-ε` (using the SHIPPED `0.4`, NOT the
`0.55` `layers.css:235` fallback the W-DOCK1-DELTA prose quoted — the reconciliation is recorded); the
`--dock-stagger-*` rationale (the intentional macOS-dock cascade) is recorded. The TIGHTEN branch is
formally excluded (no clock desync exists to tighten away; a tighten would churn solved choreography).
Captured: the decision paragraph + the 0.4-vs-0.55 reconciliation + the budget derivation in
`W-DOCK2-DELTA.md`; the gate's `LOCKSTEP_BUDGET_MS` const matches the recorded ceiling.

**HG3 — ONE `DOCK_SPRING` authority, gated DIRECTLY.** `proof:spring-tokens-synced` reads
`DOCK_SPRING` from the CANONICAL file (`dockMorphContext.ts` post-fold, or the shared module). The
born-RED witness: hand-edit `dockMorphContext.ts:39` to `dampingFraction: 0.45` (a bouncier register)
→ `npm run proof:spring-tokens-synced` exits **1** (`DOCK_SPRING ζ 0.45 is outside the iOS-control
band [0.70,0.80]` + the const/preset mismatch) — proving the gate now reads the spring that ACTUALLY
drives every shipped dock. Revert → GREEN. Captured: the born-RED diff + the two gate stdouts in
`W-DOCK2-DELTA.md`. (Before this wave, the SAME edit to `dockMorphContext.ts:39` leaves the gate
GREEN — the dead-witness; the DELTA shows the before-GREEN/after-RED contrast.)

**HG4 — ONE FLIP engine (deletion proof OR formal book).** Either: `useLayerTransition.ts` is
DELETED + its re-exports removed (`git show --stat` shows the deletion; `grep -rn useLayerTransition
src/` returns only comments/README, zero live imports) and `proof:dock-orchestrator-single` GREENs
asserting one FLIP primitive drives both nesting levels; OR it is BOOKED with a `proof:dock-orchestrator-single`
extension asserting the two engines carry IDENTICAL pin-measure-arm logic (a drift-guard that REDs
if they diverge) + a named successor (W-GOD1). Captured: the deletion `git show --stat` OR the
extended-gate stdout + the book marker in `W-DOCK2-DELTA.md`.

**HG5 — rail one-clock + single-indicator + persistence.** `proof:dock-rail-cohesion` GREENs:
(a) born-RED on HEAD for the missing `:indicator="false"` (the double-indicator) → after the edit,
the π twin asserts exactly ONE `[data-slot="tabs-indicator"]` under `.dock-layer-rail`; (b) born-RED
on HEAD for the `--dock-motion-resize` on `.dock-layer-tab-indicator` (the second clock) → after the
edit, NO `--dock-motion-resize` survives on the rail indicator; (c) persistence LANDED (rail outside
the `--full` clip) or BOOKED (`BOOKED:` marker + successor wave-id present). Captured: the born-RED
+ GREEN `proof:dock-rail-cohesion` stdout + the one-indicator DOM assertion in `W-DOCK2-DELTA.md`.

**HG6 — the live-verified DELTA + CI inclusion.** `proof:live-verified-ledger --tranche=AY` flips
born-RED → GREEN on the `W-DOCK2` row (own-surface `^W-DOCK2-.*-light\.png` AND `^W-DOCK2-.*-dark\.png`
present at ≥2 viewports, filename-matched, per W-CARDINAL-INFRA's deepened binding); `W-DOCK2` is on
`VISUAL-ALLOWLIST.json` + has a `PROGRESS.md` row. AND `proof:dock-animation-live` +
`proof:dock-rail-cohesion` appear in `.github/workflows/ci.yml` (verified by
`proof:gen-ci-fresh` re-lock + grep of the manifest). Captured: the before/after ledger-gate exit
codes + the CI manifest diff in `W-DOCK2-DELTA.md`.

**HG7 — the two §F morph breaks are RECONCILED (D8).** §F1 (`container-type` trap): the chosen path
is recorded — either a `GlassDock.vue:184-189`+CLAUDE.md doc note (verified by grep of the comment)
OR a gate clause that REDs a collapsible `<GlassDock>` carrying `containerName` (born-RED on a
synthetic collapsible+containerName fixture). §F2 (`#persistent` first-mount FLIP): either FIXED
(a captured before/after of the `#persistent`-slot dock first-mount morph — collapsed→expanded width
+ scalar→1.04 on a fresh session, the §F2 break GONE) OR BOOKED (`BOOKED:` marker + reproduction +
named successor). Captured: the §F1 decision + the §F2 before/after-or-book in `W-DOCK2-DELTA.md`.

**The single binding condition:** the re-authored `proof:dock-animation-live` REDs on the
synthetic-lag fixture and GREENs at HEAD on the entering-child onset (HG1); the stagger
KEEP-AND-DOCUMENT decision + the 0.4-vs-0.55 budget reconciliation are recorded (HG2);
`proof:spring-tokens-synced` REDs on a retune of the REAL `dockMorphContext.ts` driver — the born-RED
dead-witness fix (HG3); `useLayerTransition` is deleted or formally booked with a drift-guard (HG4);
`proof:dock-rail-cohesion` GREENs on single-indicator + one-clock + persistence-landed-or-booked
(HG5); `proof:live-verified-ledger --tranche=AY` GREENs on `W-DOCK2` with the gates IN CI (HG6); and
the two §F morph breaks are reconciled (HG7). The lockstep is now FALSIFIABLE (it asserts the
ENTERING-child onset, not the tautological box-vs-its-own-scalar), the motion authorities are ONE
each, the rail is cohesive, and the route is correct — all on captured artefacts, never a tautology.

---

## §5 — Named successors / coordination

- **AY.W-DOCK1** (precedes) — this wave CONSUMES W-DOCK1's captured-ABSENT verdict
  (W-DOCK1 §4 G5) to set `LOCKSTEP_BUDGET_MS` (the KEEP-branch ceiling) + the FORCED keep-and-document
  decision, and reuses its `data-testid="dock-capture"` deterministic selector (the plain testid — NOT
  `data-container-name`, which freezes the morph per §F1) + `/dock/overview` route. It also CARRIES
  W-DOCK1's two NEW §F surface findings (§F1 container-type-trap; §F2 first-mount FLIP). Sequence
  W-DOCK2 strictly AFTER W-DOCK1's DELTA lands.
- **AY.W-MOTION** (sibling — TWO real coordination surfaces, NOT fully disjoint).
  W-MOTION owns the broader §6 motion-cohesion enforcement (cards.css hover legs `H-motion-cohesion §F2`,
  Aurora.vue 600ms `§F3`, MetricRow/Toast `§F3-F4`, the `proof:animation-coherence` scope-widen + CI +
  speedtest re-point `§F5-F6`, the `--scale-hover-btn` drift `§F7`).
  - **`--dock-press-spring` token (disjoint, verify-not-edit):** this wave OWNS the dock token
    (`tokens.css:1771` + `dock-controls.css:43`); W-MOTION does NOT edit those two sites — its
    `proof:animation-coherence` register-assignment widen ASSERTS the token is `--spring-smooth` once
    this wave lands it (a verify-not-edit relationship; coordinate so W-MOTION's widen does NOT claim
    the dock token).
  - **`dock/layer-group.css` (W-DOCK2 WRITES, W-MOTION SCANS):** W-DOCK2 re-points the rail indicator
    transition (`:199-202`) OFF `--dock-motion-resize`; W-MOTION's widened `proof:animation-coherence`
    SCANS `dock/layer-group.css` (W-MOTION §3 file set, line ~231). W-MOTION's scan must run against the
    POST-W-DOCK2 state — sequence W-DOCK2 BEFORE W-MOTION's scope-widen close, OR W-MOTION's gate would
    red on the pre-W-DOCK2 `--dock-motion-resize` second clock. This is a SCAN-vs-WRITE sequencing edge,
    not a write collision.
  - **`.github/workflows/ci.yml` (BOTH WRITE — the gates-manifest class):** W-DOCK2 adds
    `proof:dock-animation-live` + `proof:dock-rail-cohesion`; W-MOTION adds `proof:animation-coherence`;
    BOTH run `proof:gen-ci-fresh` to re-byte-lock the manifest. This is a genuine concurrent-write on
    the same file (the W-GLASS↔W-MOTION gates.mjs overlap class). The orchestrator MUST serialize the
    two ci.yml edits + run `proof:gen-ci-fresh` ONCE after both land (a parallel run would produce
    conflicting byte-locks). Flagged for the integration step.
- **AY.W-GOD1** (coordination — same `GlassDock.vue` / `dockMorphContext.ts` files) — `GlassDock.vue`
  is 608 lines but its `:2-6` banner claims "421-line … DO-NOT-SPLIT" (`H-dock §D8`); W-GOD1 carves
  it. This wave EDITS `DockLayerGroup.vue` + `dockMorphContext.ts` (the FLIP fold) but does NOT edit
  `GlassDock.vue` source. SEQUENCING: W-DOCK2's FLIP fold (move 4) should land BEFORE W-GOD1's carve
  (the carve is cleaner over ONE engine than two); if W-DOCK2 BOOKS the fold (HG4 book path), W-GOD1
  absorbs the fold INTO the carve. The DO-NOT-SPLIT banner reconciliation belongs to W-GOD1 (it
  carves or it doesn't); this wave records the coordination but does not touch the banner.
- **AY.W-DOCK3** (sibling) — the dock+slider live DELTA + the missing
  `demo/stories/compositions/dock-with-slider.vue` (`H-dock §D5`); the progress-bar-off-dock clause
  RE-HOMED to the L tranche as a verify-row (`H-dock §D4` — `GlassDock` bakes no progress bar; it is
  already de-docked in slides H.W2).
- **AY.W-CARDINAL-INFRA** — this wave CONSUMES the parameterized `proof:live-verified-ledger`
  (`--tranche=AY`) + the `AY/audit/visual/` home + the `VISUAL-ALLOWLIST.json` sidecar.

## §6 — Cross-references

- `docs/tranches/AY/audit/hardening/H-dock.md` (§HEADLINE the tautology; §D1 stagger-by-design;
  §D2 two DOCK_SPRING copies; §D3 two FLIP engines; §D7 rail second-clock/double-indicator/vanish;
  §D8 the 608-line banner; §CONVERGENCE 1+2+3+6).
- `docs/tranches/AY/audit/hardening/H-motion-cohesion.md` (§F1 `--dock-press-spring` off-doctrine;
  §F5 the gate excluded from CI; §F9 the gate samples a LEAVING child).
- `docs/tranches/AY/waves/AY.W-DOCK1.md` (§4 G5 the captured-ABSENT verdict + the `data-testid="dock-capture"`
  selector this wave consumes + the §F1/§F2 findings routed here).
- `docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md` (the 12-capture onset table + §F1/§F2).
- `scripts/proof-dock-animation-live.mjs` (`:65` wrong route; `:133` LEAVING-child sample;
  `:259-297` reused pure helpers; `:385-398` the tautology this wave demotes).
- `tests-visual/pi-manifest.ts:78` (the WRONG `resolveScene("navigation","dock")` route this wave fixes)
  + `tests-visual/dock-animation-live.spec.ts` (`:81` goto, `:121-131`/`:181-190` the π-twin sample + assert).
- `src/styles/dock/layers.css:235-250,252-282` + `src/styles/dock/shell.css:51,53` (the deliberate
  entering-child stagger budget this wave KEEPS-AND-DOCUMENTS).
- `src/components/custom/dock/composables/dockMorphContext.ts:39,268-341` (the canonical spring +
  orchestrator FLIP) vs `useLayerTransition.ts:36,170-245` (the vestigial copy + standalone FLIP).
- `scripts/proof-spring-tokens-synced.mjs:27-30,62-65` (the gate re-pointed at the canonical spring).
- `src/styles/dock/layer-group.css:187-202` (the rail second-clock `--dock-motion-resize`) +
  `DockLayerGroup.vue:202,224` (the double-indicator mount) + `src/components/ui/tabs/TabsList.vue:17-19,38`
  (the default `indicator: true`).
- `src/styles/tokens.css:1771` + `src/styles/dock-controls.css:43` (the `--dock-press-spring`
  off-doctrine root + the shadow re-point).
