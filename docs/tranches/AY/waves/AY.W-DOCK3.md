# AY.W-DOCK3 — Dock-with-slider story + captured drag DELTA; progress-bar clause re-homed to L

**Tranche** AY (glass-ui) · **Batch** 1 (DOCK band; sibling of W-DOCK1/W-DOCK2; CONSUMES the
W-CARDINAL-INFRA ledger gate) · **Repo** glass-ui · **Kind** impl (story author + live drag-DELTA
capture + ledger-gate CONSUME + CLAUDE.md doc-fix + progress-bar re-home to L) · **State** OPEN ·
**HEAD** `at-dock-convergence` (3.9.0 ancestor)

## Goal criterion

The cross-substrate `keepDockOpen` contract has a CANONICAL live home and a captured
visual truth. A reader of CLAUDE.md who follows the Slider section's "the
cross-substrate proof story lives at …" pointer lands on a real, mountable story; a
user dragging a `<Slider>` inside a `<GlassDock>` sees the dock hold open through the
gesture and the thumb-halo intensify; and a fresh auditor can SEE that — on disk, as a
captured drag DELTA — rather than reading a prose claim. The progress-bar-off-the-dock
half (a slides concern with no glass-ui edit-site) leaves this wave and lands in L as a
verify-row, so the glass-ui gate asserts only what glass-ui owns.

## Defect (verified, file:line)

The `keepDockOpen` mechanism is architecturally SOUND at HEAD — this wave is a
VERIFY-and-capture wave, not a re-implementation (the H-past-conversation correction:
the code is done, the DELTA is owed):

- `src/components/ui/slider/Slider.vue:23` declares `keepDockOpen?: boolean`;
  `:30` `withDefaults(..., { keepDockOpen: true })` (the AX.W03 fix for the `?? true`
  absent-boolean trap that disarmed the hold); `:85` `useDockHold(getRootEl, { enabled: () => keepDockOpen.value })`;
  `:142` `isHeld = dock?.held.value === true`; `:152` `:data-held="isHeld || undefined"`.
- `src/components/custom/dock/composables/useDockHold.ts` attaches NATIVE
  `pointerdown`/`touchstart` on the RESOLVED reka `SliderRoot.$el` (immune to the
  reka forwarding-drop) and lights `data-held` on BOTH the dock root and the control.
- `src/styles/dock/morph.css:163-174` `.glass-dock[data-held]` — the held substrate
  tier-shade; `src/components/ui/slider/Slider.vue:270-272` `.glass-slider[data-held] .slider-thumb`
  — the thumb-halo intensification (`box-shadow: 0 0 0 8px var(--surface-tint-15)`).
- `proof:dock-hold-contract` (`package.json:562`; `scripts/proof-dock-hold-contract.mjs`)
  is GREEN — a deterministic `@vue/test-utils` MOUNT bite that dispatches a real
  `pointerdown` and asserts `keepOpen()` fired + `data-held` painted on both roots.

So the contract is wired and statically locked. The DEFECTS this wave fixes:

1. **The CLAUDE.md proof-story pointer DANGLES.** `CLAUDE.md:388` (the "Slider
   keep-dock-open contract" section): *"The cross-substrate proof story lives at
   `demo/stories/compositions/dock-with-slider.vue`."* That file **does not exist on
   the live tree** — `find demo -name "*dock-with-slider*"` returns nothing; the only
   copies are `.claude/worktrees/*/demo/stories/compositions/dock-with-slider.vue`
   (101 orphaned worktree copies). `demo/stories/compositions/` ships
   `auth-shell, configurator, dashboard, drawer-live-behind, empty-states,
   form-validation, gate-pattern, hero, icon-tooltip, instrument-chassis,
   instrument-rail, labeled-field, math-paper, settings` — no dock+slider story.
   (Confirmed by H-slider Finding 5 and H-dock D5.)

   **Reconciliation (NEW — W-DOCK1 execution surfaced this):** `demo/stories/dock/overview.vue:258-304`
   ALREADY ships a "Slider in dock — the keep-dock-open hold" section (`data-testid="dock-slider-hold"`
   at `:270`, two sliders, the hold-through-drag prose), added when W-DOCK1 landed its capture target.
   So a slider-in-dock DEMO exists; what does NOT exist is the DEDICATED `compositions/dock-with-slider.vue`
   the CLAUDE.md pointer names AND a captured drag DELTA. W-DOCK3 authors the dedicated focused
   compositions story (the CLAUDE.md target — a tight 2-cell proof, not the full overview walkthrough)
   and routes the π drag-capture at IT; the overview section stays as the in-walkthrough demo (no
   duplication of intent — the overview cell is the "here's the feature in context" demo, the
   compositions story is the "here's the isolated cross-substrate proof" the CLAUDE.md contract names).

2. **ZERO captured DELTA of a slider dragged inside a live dock** (H-dock D5,
   CHRONIC-4; H-past-conversation #5/#10). The static mount gate proves `keepOpen()`
   FIRES; it does not prove the LIVE/VISUAL register the user complains about
   ("the dock-with-a-slider is broken"). `docs/tranches/AY/audit/visual/` now EXISTS
   (minted by W-CARDINAL-INFRA, populated by W-DOCK1's 12 morph PNGs) but carries NO
   dock+SLIDER DELTA — `W-DOCK3-DELTA.md` + the `W-DOCK3-dock-slider-*` PNGs do not exist.
   This is the cardinal-lesson miss (the single highest-signal chronic, H-past-conversation
   §"cardinal-lesson recurrence"): complete only on a captured live DELTA.

3. **The "progress bar off the dock" half is a PHANTOM glass-ui gate** (H-dock D4;
   H-past-conversation #5). The AY plan row (`AY.md:155`) carried *"progress-bar
   re-homed to L"* but the original W-DOCK3 seed lumped a "progress bar off the dock"
   condition into a glass-ui hard gate. There is NO glass-ui edit-site: `grep -rin
   progress src/components/custom/dock/ src/styles/dock/` returns only morph-progress
   scalar comments (`--dock-morph-t`), zero progress-bar chrome — `GlassDock` bakes no
   progress bar. The slides progress bar was ALREADY de-docked at the slides **H.W2**
   tranche (`slides/src/styles/deck.css:316` "DE-DOCKED PROGRESS BAR axes (H.W2)";
   `slides/src/deck/DeckView.vue:107-112` renders `.deck-progress` as a viewport-pinned
   page element). It belongs in L as a non-regression verify-row, not here.

## Objective

Author the canonical `demo/stories/compositions/dock-with-slider.vue` (greenfield —
NO `J.W5.C`/`AW.W3` meta-history from the worktree copies; no "ported from", no version
labels — per greenfield-no-meta). Capture a live drag DELTA against that story proving
the dock holds open through the gesture and the slider `data-held` thumb-halo fires on
both roots. Fix the CLAUDE.md dangling path. RE-HOME the progress-bar clause to the L
tranche as a verify-row (NOT a glass-ui gate). CONSUME the already-parameterized
`proof:live-verified-ledger --tranche=AY` (W-CARDINAL-INFRA built the engine; W-DOCK3 only
adds its allowlist + PROGRESS rows, NOT a re-extension) so the AY W-DOCK3 row is
UN-MINTABLE as `live-verified` without the captured PNG.

**§F1 carry (NEW — from W-DOCK1):** the collapsible capture cell uses the plain
`data-testid` selector, NOT the GlassDock `containerName` prop (which co-applies
`container-type: inline-size` and FREEZES the collapse↔expand morph — the AT.W7 / 3.4.0
trap; see `W-DOCK1-DELTA.md §F1`). The hold-capture drives a real pointer drag, so the
dock must actually morph + hold; a `containerName`-frozen dock would falsely pass the
rest-state assertions and fail the live drag.

## Edit-sites (exact)

| # | File | Edit |
|---|------|------|
| 1 | `demo/stories/compositions/dock-with-slider.vue` | **NEW.** Author the canonical story: ≥2 `<GlassDock>` cells each enclosing a `<Slider>` — (a) a `fit-content` always-open dock with one standard-variant slider; (b) a collapsible dock (`:collapse-delay="600"`) with a slider where pointer-down + pointer-off-dock holds the dock open (the idle-collapse-under-drag proof). Use `StoryPage`/`StorySection` (the shipped chassis — `import StoryPage from "../StoryPage.vue"`, `import StorySection from "../StorySection.vue"`). Add a `data-testid="dock-slider-hold"` host on the collapsible cell so the π spec targets it deterministically. Import via the demo's RELATIVE-path idiom (the live convention, NOT the published subpath): `import { GlassDock, DockIconButton, DockSeparator } from "../../../src/components/custom/dock"`; `import { Slider } from "../../../src/components/ui/slider"` (mirroring `overview.vue:17` + the sibling `compositions/instrument-rail.vue:4-6`). The collapsible cell uses `data-testid`, NOT `containerName` (the §F1 morph-freeze trap). NO meta-history comments (greenfield-no-meta). |
| 2 | `demo/stories/manifest.ts` | Register the story (the `s("compositions", "dock-with-slider", …)` row) so it gets a navigable `/compositions/dock-with-slider` route AND is re-sourced by `tests-visual/pi-manifest.ts` (the manifest is the single source-of-truth the π lane static-parses — an unregistered story has no route to capture). |
| 3 | `tests-visual/dock-with-slider-live.spec.ts` | **NEW.** The π capture spec. Navigate `/compositions/dock-with-slider`; locate the `data-testid="dock-slider-hold"` dock + its `[data-slot=slider]`; (a) read `data-held` on both the `.glass-dock` and the `.glass-slider` roots at REST (absent); (b) dispatch a real `page.mouse.down()` on the slider thumb, move the pointer OFF the dock, and assert `data-held` is present on BOTH roots mid-gesture; (c) `page.mouse.up()` and assert `data-held` clears on both AND the collapsible dock did NOT idle-collapse during the hold (it stayed `.expanded`); (d) `page.screenshot` the held + released frames into `docs/tranches/AY/audit/visual/W-DOCK3-dock-slider-held-{light,dark}.png` and `…-released-{light,dark}.png`. Mirror the deterministic-drive pattern of `tests-visual/dock-animation-live.spec.ts` (hold a stable element ref across the state flip; real pointer events). |
| 4 | `docs/tranches/AY/audit/visual/W-DOCK3-DELTA.md` | **NEW.** The DELTA doc referencing the captured PNGs by filename + a held-vs-rest `data-held` readback table (rest: absent on both roots; mid-drag: present on both; released: cleared). The format mirrors `docs/tranches/AX/audit/visual/W45-DELTA.md`. |
| 5 | `scripts/proof-live-verified-ledger.mjs` | **CONSUME — no edit (already done by W-CARDINAL-INFRA).** The gate was tranche-parameterized at W-CARDINAL-INFRA (`:58` `TRANCHE = --tranche=<X>` default `AX`; `:59-60` `PROGRESS`/`VISUAL_DIR` resolve `docs/tranches/${TRANCHE}/…`; the `complete`-allowlist + own-surface `^<wave>-` filename match + light/dark depth-lint at `:122-179`). `proof:live-verified-ledger:ay` is already wired (`package.json:683`). W-DOCK3 does NOT re-extend the engine — it CONSUMES `proof:live-verified-ledger --tranche=AY`. The ONLY ledger-adjacent edits W-DOCK3 owns: add `"W-DOCK3"` to `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` + a `W-DOCK3` row to `docs/tranches/AY/PROGRESS.md` referencing `W-DOCK3-DELTA.md`. (Re-extending the already-parameterized engine would be the duplicate-codepath the precept forbids.) |
| 6 | `CLAUDE.md:388` | **FIX.** The "Slider keep-dock-open contract" section's dangling pointer. Replace the dead path with the now-real `demo/stories/compositions/dock-with-slider.vue` (the file authored in edit-site 1 makes the existing wording TRUE — the deletion-proof is `find demo -name "*dock-with-slider*"` returning the live-tree path, not only worktrees). |
| 7 | `docs/tranches/L/…` (slides repo) | **RE-HOME (cross-repo).** Add the progress-bar-off-the-dock condition as an L verify-row (the L.W-ADOPT-adjacent non-regression check): confirm `slides/src/deck/DeckView.vue` renders `.deck-progress` as a viewport-pinned PAGE element (NOT baked into the dock) after L's glass-ui adoption — `slides/src/styles/deck.css:316` already records the H.W2 de-dock. This is a verify-row in L, carrying NO glass-ui edit-site. (Authored into the L plan; tracked here as the routing record.) |

## What this wave does NOT do (scope fences)

- It does NOT touch the morph clock, the entering-child stagger, or the lockstep gate
  (those are W-DOCK1/W-DOCK2 — H-dock D1/D2/D3/D6).
- It does NOT change the slider thumb shape or the two-variant axis (W-SLD1/W-SLD2 —
  H-slider Finding 2).
- It does NOT add a glass-ui progress-bar gate (D4 — no glass-ui edit-site exists).
- It edits NO library `src/` source (`Slider.vue`, `useDockHold.ts`, `morph.css` are
  all correct at HEAD — verified above). The only `src/`-adjacent change is the
  CLAUDE.md doc-fix; everything else is `demo/`, `tests-visual/`, `scripts/`, `docs/`.

## Hard Gate (completion criterion)

**`proof:live-verified-ledger --tranche=AY` (the W-CARDINAL-INFRA-parameterized gate,
CONSUMED — not re-extended) is GREEN with a real on-disk DELTA, the π drag-capture spec
asserts the hold + clears, and the CLAUDE.md path resolves to a live-tree file.** The wave
closes only when ALL FOUR artefact conditions hold:

1. **The captured drag DELTA exists and the gate enforces it.**
   `npm run proof:live-verified-ledger:ay` (the `--tranche=AY` arm) is GREEN: the AY
   `W-DOCK3` PROGRESS row may carry `live-verified` ONLY because
   `docs/tranches/AY/audit/visual/W-DOCK3-DELTA.md` references ≥1 own-surface real on-disk
   PNG (`^W-DOCK3-.*-light\.png` AND `^W-DOCK3-.*-dark\.png` — the W-CARDINAL-INFRA
   filename-match + light/dark depth floor; `isRealPng`: PNG magic). `W-DOCK3` is added to
   `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json`. **Bite:** delete the captured PNG
   (or revert the DELTA doc to prose-only) → the W-DOCK3 row reds the ledger gate; the
   self-test (synthetic `live-verified` row with no DELTA must flag) still passes on every run.

2. **The π spec proves the LIVE hold + clear (the binding behavioural truth).**
   `tests-visual/dock-with-slider-live.spec.ts` passes: mid-`page.mouse.down`-drag
   (pointer moved OFF the dock), `data-held` is PRESENT on BOTH the `.glass-dock` root
   and the `.glass-slider` root, the collapsible dock stayed `.expanded` through the
   hold; on `page.mouse.up`, `data-held` CLEARS on both roots. **Bite:** disarm the
   hold (`:keep-dock-open="false"` on the story slider, or orphan the `useDockHold`
   native listener) → the mid-drag `data-held` assertion fails AND the dock idle-
   collapses mid-hold → spec RED.

3. **The CLAUDE.md pointer resolves.** `find demo -name "*dock-with-slider*"` returns
   `demo/stories/compositions/dock-with-slider.vue` on the LIVE tree (not only
   worktrees), and `CLAUDE.md:388` cites that path. **Bite:** the gate's deletion-proof
   — remove the story file → the CLAUDE.md citation dangles again and the π spec's
   `page.goto('/compositions/dock-with-slider')` 404s → spec RED.

4. **The progress-bar clause carries NO glass-ui gate and IS booked in L.** `grep -rin
   progress src/components/custom/dock/ src/styles/dock/` returns zero progress-bar
   chrome (only `--dock-morph-t` scalar comments — confirming no glass-ui edit-site),
   AND the L tranche plan carries the progress-bar-off-the-dock verify-row. The W-DOCK3
   glass-ui hard gate asserts only conditions 1-3 (what glass-ui owns); the progress-bar
   condition is a recorded routing fact, not a glass-ui assertion.

**Named successor on any miss:** if the live capture cannot run (π workspace
unreachable), the AY W-DOCK3 PROGRESS status stays `live-pending` (DELTA owed) — NEVER
minted `live-verified` from prose (the gate forbids it); the named successor is the next
AY DELTA-capture pass (W-CARDINAL-INFRA coordinates the capture run). The L verify-row's
named owner is the L tranche close (L.W5 / L.W-ADOPT).
