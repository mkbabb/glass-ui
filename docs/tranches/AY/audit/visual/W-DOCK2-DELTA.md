# AY.W-DOCK2 — REAL entering-child lockstep gate + ONE DOCK_SPRING + rail cohesion · DELTA

This wave discharges the IMPL half of the dock-lockstep chronic (PROMPT-CORPUS #5 /
AUDIT-LEDGER #5). W-DOCK1's capture VERDICT was **lag captured-ABSENT** (`box↔scalar
onset Δ = 0 ms` on all 12 captures; the 36.7–96.2 ms trailing-child trail IS the
deliberate macOS-dock reveal stagger, not a clock desync). So W-DOCK2 makes the
TAUTOLOGICAL gate REAL, DOCUMENTS the stagger (the FORCED keep branch), folds the
motion authorities, lands/books the rail, and reconciles the two §F morph breaks.

**Landed on `at-dock-convergence` (3.9.0 ancestor).** Device-free gates GREEN; the
own-surface live frame-series DELTA (HG6) is now CAPTURED (RG1/RG2 discharged — see
§"Live frame-series DELTA" below; this row flips `live-pending` → `live-verified`).

---

## HG1 — the REAL entering-child lockstep gate (born-RED on lag, GREEN at HEAD)

The tautological box-vs-scalar onset check (`proof-dock-animation-live.mjs`, the prior
`onsetDelta > ONSET_TOLERANCE_MS` violation) is **DEMOTED to a non-binding structural
fact** — the box rides the scalar BY CONSTRUCTION (`layers.css:53-61` makes
`inline-size = calc(from + (to−from) × var(--dock-morph-t))`), so asserting it can
never witness a box-leads-CONTENT desync. The NEW binding witness samples the **LAST
ENTERING `.dock-layer--full > *` child** opacity on the box-width timeline and asserts
`lastEnteringChildOnsetMs − boxWidthOnsetMs ≤ LOCKSTEP_BUDGET_MS`. A D1 blind-spot
guard REDs if the entering child was never sampled (the never-witnessed defect must
not recur).

**Route + selector FIXED (D7).** The source arm `DOCK_ROUTE` is now `/dock/overview`
(was `/navigation/dock` — a NON-DOCK route; the `navigation` category has no `dock`
story); the probe targets `.glass-dock[data-testid="dock-capture"]` (the plain testid,
NOT `data-container-name` which freezes the morph per §F1). The π twin's
`pi-manifest.ts:78` `get dock()` is fixed `resolveScene("navigation","dock")` →
`resolveScene("dock","overview")`.

**Born-RED witness (device-free, `proof:dock-lockstep-bornred`).** The pure
`detectAnimation` detector fed a synthetic-lag timeline (the entering child onset
pushed past the budget — the exact regression a re-added per-child
`transition: opacity 300ms ease 200ms` SECOND clock produces, reproduced in a real
browser by `tests-visual/fixtures/dock-entering-child-lag.html`):

```
proof:dock-lockstep-bornred — SYNTHETIC-LAG arm (expect RED)
  box onset             : 16.7ms
  entering child onset  : 716.7ms
  child → box onset Δ   : 700ms
  lockstep budget       : 536.7ms
  width/scalar onset Δ  : 0ms (structural sanity — non-binding)
  violations:
    x the last entering child opacity onset (716.7ms) trails the box-width onset (16.7ms)
      by 700ms (> the 536.7ms deliberate-stagger budget) — a regression PAST the macOS-dock
      reveal stagger (a re-added per-child SECOND clock or a mis-tuned window)
  BORN-RED CONFIRMED: the re-authored gate REDs on the entering-child lag (HG1).
```

**GREEN witness (HEAD-faithful timeline — the captured 36.7–96.2 ms trail):**

```
proof:dock-lockstep-bornred — HEAD arm (expect GREEN)
  box onset             : 16.7ms
  entering child onset  : 83.3ms
  child → box onset Δ   : 66.7ms       ← inside the W-DOCK1 captured 36.7–96.2 ms range
  lockstep budget       : 536.7ms
  width/scalar onset Δ  : 0ms (structural sanity — non-binding)
  PASS: HEAD entering-child onset within budget (GREEN).
```

**LIVE born-RED witness (real browser, no dev server — the gate run against the
synthetic fixture via `GLASS_UI_DOCK_FIXTURE_URL=file://…/dock-entering-child-lag.html`):**

```
proof:dock-animation-live — the dock single-scalar BEHAVIORAL motion gate
  --dock-morph-t rising frames : 122 (>= 5)  peak 1.014
  root box width rising frames : 116 (>= 5)  Δ 429.73px
  width / scalar onset delta   : 0ms (structural sanity — non-binding)
  entering-child → box onset Δ : 700.9ms (<= 536.7ms budget — the LOCKSTEP witness)
  VIOLATIONS:
    x the last entering child opacity onset (708ms) trails the box-width onset (7.1ms)
      by 700.9ms (> the 536.7ms deliberate-stagger budget) — a regression PAST the
      macOS-dock reveal stagger (a re-added per-child SECOND clock or a mis-tuned window)
  status: FAIL   (exit 1)
```

The box morphs over 122 real-spring frames, the entering child is sampled (27 moving
frames), and the lockstep violation FIRES — the gate is now FALSIFIABLE on the
entering-child desync the box-vs-scalar tautology was blind to. The live π arm
(`dock-animation-live.spec.ts`) samples the SAME entering child on the real device +
asserts the SAME budget against the live `/dock/overview` dock; the source arm runs the
device-free token-peak secondary + structure pre-checks + grace-SKIPs the live arm on a
no-π runner.

---

## HG2 — the stagger KEEP-AND-DOCUMENT decision (the FORCED keep branch)

W-DOCK1's verdict is **captured-ABSENT** (`box↔scalar Δ = 0 ms`; the trailing-child
trail MATCHES the deliberate stagger window). There is **no clock desync to tighten
away**, and a tighten would churn solved choreography (the precept-violating gestalt
failure the lane exists to catch). So the branch is FORCED to **KEEP-AND-DOCUMENT** —
NO behavioral re-tune. The TIGHTEN branch is formally excluded.

- **KEPT UNCHANGED** (`shell.css:51,53`): `--dock-stagger-window-size: 0.4`,
  `--dock-stagger-step: 0.08`. No source edit.
- **The `--dock-stagger-*` rationale** — the intentional iOS/macOS-dock cascade: each
  control reveals `step` later than the one before (`onset = step × (childIndex−1)`,
  capped at child 6 = `step × 5`), so the row fills outer→in ON the physical morph,
  symmetric in both directions, an interrupted morph carrying the cascade with it.
  `opacity = clamp(0, (--dock-expand-t − onset) / window, 1)` rides the SAME
  `--dock-morph-t` scalar — one clock, a deliberate phase-shift.

- **The 0.4-vs-0.55 reconciliation (the binding number fix).** The W-DOCK1-DELTA prose
  quoted the `layers.css:235` FALLBACK `var(--dock-stagger-window-size, 0.55)`. The
  SHIPPED value is `shell.css:51`'s **`0.4`** (the AX.W45 DK1/DK7 narrowing 0.55 → 0.4
  — the prior 0.55 landed the last child at `0.40 + 0.55 = 0.95` of the morph, the
  "shrunken icon doesn't appear for a while" tail; 0.4 lands it at `0.40 + 0.40 = 0.80`,
  the front-loaded register). The budget derivation uses the SHIPPED `0.4`.

- **`LOCKSTEP_BUDGET_MS` derivation (the ceiling, NOT the lag).**
  ```
  last-child onset (expand-t)  = step × 5            = 0.40
  last-child FULL opacity at   = onset + window      = 0.40 + 0.40 = 0.80 of the morph
  morph duration               ≈ 650 ms              (the --spring-dock ring)
  ceiling = 0.80 × 650 + 1 frame ≈ 537 ms
  ```
  The captured 96.2 ms max comfortably clears 537 ms — the budget is a TRUE CEILING
  that REDs a regression PAST the deliberate stagger (a per-child second clock, a
  mis-tuned window), NOT the lag itself. No silent unbounded lag: the budget is a
  STATED NUMBER the gate enforces (`LOCKSTEP_BUDGET_MS` in
  `proof-dock-animation-live.mjs` + the π twin).

- **D6 folded in the same batch** — `--dock-press-spring` ROOT token
  (`tokens.css:1781`) `--spring-bouncy` → `--spring-smooth` (the §6 transform-press
  doctrine register; a press must settle, never overshoot); the now-dead byte-identical
  per-surface re-point at `dock-controls.css:43` is DELETED. `proof:animation-coherence`
  GREEN (0 register-assignment forks) verifies the outcome (W-MOTION's verify-not-edit).

---

## HG3 — ONE `DOCK_SPRING` authority, gated DIRECTLY (the dead-witness fix)

The canonical authority is `dockMorphContext.ts:39` (the orchestrator that drives EVERY
shipped `<GlassDock>` morph). `proof-spring-tokens-synced.mjs` re-pointed `LAYER_TS` →
`DOCK_MORPH_CONTEXT_TS` (the `constMatch` read + the comment-match targets), so the gate
now reads the spring that ACTUALLY drives every dock — NOT the vestigial
`useLayerTransition.ts` copy.

**Born-RED diff** — hand-edit `dockMorphContext.ts:39` to `dampingFraction: 0.45`:

```
=== gate with ζ=0.45 (expect RED) ===
  dock spring (const/preset): (0.32, 0.45) / (0.32, 0.7)
  derived overshoot         : 0.2053
  VIOLATIONS:
    ✗ DOCK_SPRING (0.32, 0.45) and the dock PRESETS row (0.32, 0.7) carry DIFFERENT (response, ζ)
    ✗ DOCK_SPRING ζ 0.45 is outside the iOS-control band [0.70, 0.80]
    ✗ the derived overshoot …=0.2053 is outside [0.04, 0.10] (the iOS-control register)
  status: FAIL
=== reverted (expect GREEN) ===
  derived overshoot : 0.046   status: PASS
```

BEFORE this wave the SAME edit to `dockMorphContext.ts:39` left the gate GREEN (it read
the OTHER, vestigial copy — the dead-witness). The DELTA is the before-GREEN/after-RED
contrast: the morph's real spring constant is now gated DIRECTLY.

---

## HG4 — ONE FLIP engine (formally BOOKED to W-GOD1 with a drift-guard)

The orchestrator (`dockMorphContext.ts`) is the FLIP superset (it carries the
sibling-rebase the standalone lacks). The clean fold (delete `useLayerTransition.ts`,
route the standalone group through a self-rooted orchestrator) does NOT land cleanly
inside this disjoint wave: it breaks the `/dock` `useLayerTransition` public re-export
(an external consumer — value.js, "routes to AX.W34"), re-homes the
`morphRoot().closest()` fallback + `directionTypes` hint, and collides with the W-GOD1
GlassDock.vue carve that touches the same FLIP code. So the fold is **BOOKED to
AY.W-GOD1** (the carve is cleaner over ONE engine; W-GOD1 absorbs the fold).

The book is EXPLICIT — `useLayerTransition.ts` carries a `BOOKED: AY.W-GOD1` marker —
and a **drift-guard** is landed: `proof:dock-orchestrator-single` EXTENDED with
`detectFlipDriftGuard`. It asserts both engines carry IDENTICAL load-bearing
FLIP-pin-measure-arm markers (the pin `--dock-morph-from/to` + `data-morphing`, the
deferred `max-content` measure, the `respectReducedMotion` re-base) AND the `BOOKED:`
marker is present. Born-RED proven: stripping a FLIP marker from either engine OR
removing the BOOKED marker REDs the drift-guard; at HEAD it is GREEN (5/5 markers in
both, BOOKED present). So a divergence in the shared dance cannot ship silently while
the two copies coexist.

---

## HG5 — rail one-clock + single-indicator + persistence

`proof:dock-rail-cohesion` (NEW, device-free SOURCE arm) GREEN; the π twin
`dock-rail-cohesion.spec.ts` asserts exactly ONE `[data-slot="tabs-indicator"]` under
`.dock-layer-rail`.

```
proof:dock-rail-cohesion — the DockLayerGroup rail one-clock + single-indicator + persistence
  single-indicator (:indicator="false"): true
  one-clock (NO --dock-motion-resize)   : true
  persistence landed / booked           : false / true
  status: PASS
```

- **single-indicator (LANDED):** `DockLayerGroup.vue:202` `<TabsList class="dock-layer-rail">`
  now carries `:indicator="false"` — kills the phantom default `<TabsIndicator>`
  (`TabsList.vue:38` `v-if="indicator"`), so ONLY the explicit `.dock-layer-tab-indicator`
  paints. Born-RED on HEAD (the attr was absent → two indicators painted).
- **one-clock (LANDED):** `layer-group.css:199-202` rail indicator transition re-pointed
  OFF the DK7-killed fixed-linear `--dock-motion-resize` SECOND clock onto the
  `--spring-snappy` register. **DECISION:** a rail tab switch is a DISCRETE selection
  (the user picks a pane), NOT the box collapse↔expand morph — so it does NOT fold onto
  `--dock-morph-t`; it uses the iOS segmented register (the SAME curve `SegmentedTabs`'
  indicator rides). Binding outcome: NO `--dock-motion-resize` survives on the rail.
  Born-RED on HEAD.
- **persistence (BOOKED: AY.W-GOD1):** the switcher rail sits in the dock's clipped
  `--full` pane, so it vanishes on collapse. Rendering it OUTSIDE the clip needs a
  `GlassDock` chrome slot the band does not yet have (and a vertical rail dock has no
  collapse machinery) — both GlassDock-structural, belonging with the W-GOD1 carve.
  Formally BOOKED (the marker + successor in `DockLayerGroup.vue`); the gate's
  persistence clause RED on a silent keep (no marker).

---

## HG6 — the live-verified DELTA + CI inclusion

- **CI inclusion (LANDED).** `gates.mjs` GATES manifest: `proof:dock-animation-live`
  tags `local` → `local, ci` (its device-free token-peak + structure arms run on the
  clean CI runner; the live arm grace-SKIPs with exit 0 on a no-π runner — the
  cardinal-lesson architecture), and the NEW `proof:dock-rail-cohesion` `local, ci`.
  `npm run gates:emit-ci` re-emitted `.github/workflows/ci.yml`; `proof:gen-ci-fresh`
  GREEN (byte-identical). Both appear at ci.yml:188-191.
- **The own-surface frame-series DELTA is CAPTURED** (RG1/RG2 discharged) — see
  §"Live frame-series DELTA" below: own-surface `W-DOCK2-` light AND dark PNGs at
  desktop (1440×900) + mobile (390×844). The PROGRESS row flips `live-pending` →
  `live-verified`.

---

## HG7 — the two §F morph breaks reconciled

- **§F1 — the `container-type` trap (DOCUMENTED).** `containerName` co-applies
  `container-type: inline-size`, which clamps a collapsible dock and FREEZES the morph
  (`--dock-morph-t` stuck at 0). DECISION: **DOCUMENT, not gate** — gating would mean
  inferring "collapsible" at runtime (the discriminated-union default is
  `startCollapsed: true`, so the inference is not free), and the prop is correct on
  `always-expanded` / non-dock surfaces. Landed: the `GlassDock.vue` `containerStyle`
  comment ("`containerName` is ALWAYS-EXPANDED-ONLY") + the CLAUDE.md dock-section note.
  A collapsible dock that needs deterministic targeting uses a plain `data-testid`.
- **§F2 — the `#persistent` first-mount FLIP mis-seat (BOOKED: AY.W-GOD1).** AUDIT: a
  `#persistent`-slot collapsible dock can first-hover-measure collapsed→collapsed on a
  fresh, never-interacted session (the shared persistent slot lays out across both panes,
  so the `max-content` measure can read the still-collapsed clip before the slot
  re-settles into the target pane — a first-mount measurement-timing edge,
  intermittent). The FIX (seat `--dock-morph-from/to` before first paint, or double-rAF
  the first measure on a `#persistent` dock) is a GlassDock/orchestrator first-mount-seat
  change that rides the W-GOD1 FLIP fold + carve (same measure code). BOOKED there with
  the reproduction (the `dockMorphContext.ts` `onSwap` rAF comment). The lockstep gate is
  unaffected — it captures on the deterministic `data-testid="dock-capture"` slider dock
  (not a `#persistent` dock).

---

## Files changed

| file | change |
|---|---|
| `scripts/proof-dock-animation-live.mjs` | route → `/dock/overview` + `data-testid=dock-capture`; sample the LAST entering `.dock-layer--full > *` child; DEMOTE box-vs-scalar to non-binding fact; ADD the binding `lastChildVsBox ≤ LOCKSTEP_BUDGET_MS` assert + the D1 sampled-guard; fixture-URL override |
| `scripts/proof-dock-lockstep-bornred.mjs` | NEW — the device-free born-RED witness (pure detector over synthetic lag/HEAD timelines) |
| `tests-visual/fixtures/dock-entering-child-lag.html` | NEW — the synthetic per-child second-clock lag fixture |
| `tests-visual/pi-manifest.ts:78` | `get dock()` → `resolveScene("dock","overview")` (D7) |
| `tests-visual/dock-animation-live.spec.ts` | the π twin — entering-child sample + binding assert; box-vs-scalar demoted; testid selector |
| `scripts/proof-spring-tokens-synced.mjs` | read DOCK_SPRING from the CANONICAL `dockMorphContext.ts` (D3 dead-witness fix) |
| `scripts/proof-dock-orchestrator-single.mjs` | ADD `detectFlipDriftGuard` (HG4 drift-guard) |
| `src/components/custom/dock/composables/useLayerTransition.ts` | `BOOKED: AY.W-GOD1` marker + canonical-spring note |
| `src/components/custom/dock/composables/dockMorphContext.ts` | §F2 first-mount audit comment (BOOKED) |
| `src/components/custom/dock/DockLayerGroup.vue` | `:indicator="false"` (single-indicator) + rail-persistence BOOK marker |
| `src/styles/dock/layer-group.css` | rail indicator transition off `--dock-motion-resize` → `--spring-snappy` (one-clock) |
| `src/styles/tokens.css` | `--dock-press-spring` → `--spring-smooth` (D6) |
| `src/styles/dock-controls.css` | DELETE the dead `--dock-press-spring` re-point (D6) |
| `src/components/custom/dock/GlassDock.vue` | §F1 `containerName` always-expanded-only comment |
| `scripts/proof-dock-rail-cohesion.mjs` | NEW — the rail cohesion gate |
| `tests-visual/dock-rail-cohesion.spec.ts` | NEW — the π twin (one-indicator DOM truth) |
| `package.json` | + `proof:dock-rail-cohesion`, `proof:dock-lockstep-bornred` |
| `scripts/gates.mjs` + `.github/workflows/ci.yml` | CI inclusion (both gates) + byte-relock |
| `CLAUDE.md` | the `containerName` always-expanded-only dock note (§F1) |

## Live frame-series DELTA (CAPTURED — RG1/RG2 discharged)

The own-surface light+dark frame-series on the REAL `/dock/overview` collapsible dock
(`data-testid="dock-capture"`, the plain testid — NOT `data-container-name`, which
freezes the morph per §F1), captured at desktop (1440×900) and mobile (390×844, the
audited 390-width class), driving the EXPAND morph (collapse-first → re-enter so the
ramp is real). The entering-child opacity onset tracks the shell-width onset frame-by-
frame, the lockstep the re-authored gate ASSERTS.

**RG1 — own-surface light+dark keyframe stills (8 PNGs, all on disk):**

| png | what it shows |
|---|---|
| `W-DOCK2-lockstep-midmorph-desktop-light.png` | the expanded dock — volume icon + two sliders + separator + settings glyph, the entering controls riding the shell at reveal (light, 1440-wide) |
| `W-DOCK2-lockstep-midmorph-desktop-dark.png` | same surface, dark token cascade |
| `W-DOCK2-lockstep-midmorph-mobile-light.png` | the entering controls on the 390-width mobile dock (light) |
| `W-DOCK2-lockstep-midmorph-mobile-dark.png` | same, dark |
| `W-DOCK2-collapse-midmorph-desktop-light.png` | the collapse direction — the summary glyph in the tight collapsed pill (the §7 D9/D10 collapse target, light) |
| `W-DOCK2-collapse-midmorph-desktop-dark.png` | same, dark |
| `W-DOCK2-collapse-midmorph-mobile-light.png` | the mobile collapsed pill (light) |
| `W-DOCK2-collapse-midmorph-mobile-dark.png` | same, dark |

**The captured onset table (the entering-child → box-width onset Δ, the LOCKSTEP
number the W-DOCK1 instrument first measured, here re-captured on the expand ramp):**

| viewport × theme | box onset (ms) | entering-child onset (ms) | child → box Δ (ms) | peak --dock-morph-t |
|---|---:|---:|---:|---:|
| desktop · light | 47.7 | 51.9 | **4.2** | 1.045 |
| desktop · dark  | 14.5 | 34.3 | **19.8** | 1.045 |
| mobile · light  | 13.7 | 22.4 | **8.7** | 1.046 |
| mobile · dark   | 9.4  | 18.2 | **8.8** | 1.046 |

Every Δ (4.2–19.8 ms) sits INSIDE the W-DOCK1 captured 36.7–96.2 ms deliberate-stagger
range AND far under the 537 ms `LOCKSTEP_BUDGET_MS` ceiling — the entering child fades
in tracking the shell, the lockstep the user asked for. The peak `--dock-morph-t` 1.045
is the deliberate ±4.5% overshoot ring (the classy expand polish).

**RG2 — persisted GREEN run of `proof:dock-animation-live` on the REAL dock (NOT the
synthetic timeline / not the `--head` fixture arm):**

```
proof:dock-animation-live — the dock single-scalar BEHAVIORAL motion gate
  --dock-morph-t rising frames : 12 (>= 5)  peak 1.045
  root box width rising frames : 12 (>= 5)  Δ 69.73px
  width / scalar onset delta   : 20.2ms (structural sanity — non-binding)
  entering-child → box onset Δ : 20.2ms (<= 536.7ms budget — the LOCKSTEP witness)
  leaving child moving frames  : 0   entering moving frames: 5
  retarget max frame jump      : 0px
  --spring-dock token peak     : 1.04501 (<= 1.051)
  status: PASS   artefact: .cache/gates/AX-dock-animation-live.json
```

The gate exercised GREEN against the live collapsible dock (`.cache/gates/AX-dock-animation-live.json`
status `pass`, exit 0). The `waitForSelector(".glass-dock.collapsed")` outer wait + the
probe's collapse-first step were reconciled to the demo's fresh-mount-EXPANDED reality:
the capture dock idle-collapses only after a hover ends (the `:collapse-delay="600"`
contract), so the probe now drives a LEAVE + waits the collapse delay to reach the
collapsed baseline before sampling the expand morph — the same collapse-first idiom the
W-DOCK1 capture harness uses. This is the RG2 "no persisted GREEN run against the real
dock" debt discharged: the GREEN side no longer rests on the synthetic `--head` timeline.

Capture harness: `scripts/wf-ay-capture-dock2.mjs` (own-surface stills + the onset
series, modeled on the W-DOCK1 `proof-dock-items-lag-capture.mjs`).
