# BA tranche — PROGRESS

The dark-register-rebuilt tranche: 24 waves over 8 batches (4 floor, 1 dark-material,
4 S1-redress, 2 dock, 5 glass-grammar, 1 promotion, 5 demo-staging, 2 close), grounded
in the user's round-8 post-close audit (`audit/USER-AUDIT-2026-06-11-R8.md`, 19 reads +
7 standing directives) and the 32-lane deep audit (`audit/fleet/*.md`, all lanes
harvested + committed). Base **master @ v3.13.0** (the AZ close cut, published with
provenance). **NO implementation has begun — this tranche is in the AUTHORING phase;
the wave specs are the deliverable until the user greenlights (BA invariant 2).**

The cardinal-lesson forcing function is inherited (`proof:live-verified-ledger` reads
this PROGRESS home; content-hash freshness; operative-verdict reads). NEW at BA: the
GESTALT BAR (invariant 4) — a visual wave's completion criterion includes a holistic
whole-page both-modes verdict via `proof:ba-gestalt` (W-GESTALT-GATE mints it born-RED
against the R8 captures). Per-mechanism π greens alone close nothing visual.

**Binding done-definition + run order: [`EXECUTION-DAG.md`](./EXECUTION-DAG.md).** The
DAG is the source of truth for the wave SET, the 8-batch order, the five user-domain
hinges (H1 dark-material direction, H2 gold-CTA post-disco, H3 rail disposition, H4
version, H5 publish/deploy creds), and the declared write-bound coordination seams.
"Done" is the DAG's close criteria GREEN with falsifying gates, NOT a row count.

## Status legend (inherited from AZ; `(DEVELOPED)` stays RETIRED)

- `planned` / `planned (spec authored)` — no code landed; the latter marks a wave with
  a tranche-format doc under `waves/` (Status: SPEC).
- `in-progress` — code landing.
- `dev-complete` — device-free gates GREEN; no live DELTA owed (non-visual waves only).
- `live-verified` — the own-surface DELTA captured (.png + π) at a fresh content-hash,
  AND (new at BA) the gestalt verdict recorded for the owning roster surface.
- `complete` — goal + completion criteria both hold.
- `complete_with_misses` — gates passed with named-successor misses recorded.

## The wave table

| batch | wave | status | notes |
|---|---|---|---|
| 0 | W-SHELL-HOLD | planned (spec authored) | the railContext route-push guard — lands first; every live pass depends on it |
| 0 | W-GESTALT-GATE | planned (spec authored) | proof:ba-gestalt born-RED vs the R8 captures + the :5175/:5173 gate-default hygiene |
| 0 | W-HYGIENE | planned (spec authored) | MIGRATION re-anchor · CLAUDE.md custom/ sync · colocation derive · precepts submodule · AX/AY debt retirements |
| 0 | W-CARVE2 | planned (spec authored) | typography.css + constellationField/Constellation carve-or-justified-keep |
| 1 | W-DARK-MATERIAL | planned (spec authored) | THE prerequisite — the dark elevation ladder + transmissive glass + tint-seam dark arm + chromatic --primary + surface-tint dark arm + the contrast-color() inversion fix [H1] |
| 2 | W-CONFIG-CHASSIS | planned (spec authored) | the ConfiguratorRow width contract (S1) + occlusion/dividers/swatch + gear recompose + DarkModeToggle + preview alpha |
| 2 | W-GOO-REDRESS | planned (spec authored) | satellite smin reach + the pointer wake seam |
| 2 | W-DOCK-GEOMETRY | planned (spec authored) | the control-plate clipping cluster + overflow-engage-on-real-overflow |
| 2 | W-FADING-SCROLL | planned (spec authored) | the library FadingScroll primitive (h+v, scroll-state-driven) + static-utility retirement |
| 3 | W-DOCK-SECTIONS | planned (spec authored) | the 4th-rail-attempt RE-CONCEPTION: tripartite sections + divider-seam rail seat + fan-out/retract [H3] |
| 3 | W-DOCK-MORPH-INSITU | planned (spec authored) | V↔H morph + layering demos in the shell docks |
| 4 | W-SURFACE-AXIS | planned (spec authored) | the shared {glass·veil·opaque} surface axis across the container band |
| 4 | W-FEEDBACK-TONE | planned (spec authored) | tone-on-glass: ONE recipe for Toast/Notification/Alert + cohesion-gate teeth |
| 4 | W-MENU-GLASS | planned (spec authored) | the R5-10 fold: .glass-menu-row + .glass-menu-section on menuItemVariants |
| 4 | W-GLASS-CAL | planned (spec authored) | the blur dial-back (six primitives) + the disco retirement + hover smoothing [H2] |
| 4 | W-PROGRESS-GRADIENT | planned (spec authored) | the sectioned Progress single-gradient rebuild + the glass meter register |
| 5 | W-ICON-CHIP | planned (spec authored) | the IconChip pop primitive (duotone/bloom/reveal axes) |
| 6 | W-STAGE | planned (spec authored) | the per-category background map + glassiness-over-aurora stagings + token-tour contrast chassis |
| 6 | W-DEMO-AFFORDANCES | planned (spec authored) | the play register + trigger convention + the curve-picker chip rack + padding rhythm |
| 6 | W-FOURIER-STUDIO | planned (spec authored) | the foreground fourier studio: partial-sum N axis + orthogonal registers + trace-a-shape + the clock |
| 6 | W-SUFFUSE2 | planned (spec authored) | category color identity + display-ladder grading + the motion violet |
| 6 | W-ANIMATE | planned (spec authored) | page-enter orchestration + scroll-progress + countup + hero entrance |
| 7 | W-REFLECT2 | planned (spec authored) | the gestalt reflection — triumvirate-looped until operative-PASS |
| 7 | W-CLOSE | planned (spec authored) | battery · MIGRATION · version [H4] · publish [H5] · disposition re-stamps · FINAL · the slides book |

## Events

- 2026-06-11 — R8 banked (`audit/USER-AUDIT-2026-06-11-R8.md`, commit 30342ed7); the 18
  user captures copied off volatile paths to `audit/ground/`.
- 2026-06-11/12 — the 32-lane fleet dispatched (opus fanout, `scripts/wf-ba-fleet.js`,
  run wf_e9b530bb-0b4), staged through rate-limit + session-wall recoveries; 31 lanes
  harvested + committed (e217c3d1, 9a57e3c2), the curve-picker resume landed lane 32/32
  (1f4ec4c1). Headline systemic finds: the ConfiguratorRow width contract (S1, kills 32
  sliders), the contrast-color() selection inversion (systemic), the dark 4-L-point
  page↔card gap, the railContext route auto-push (S1), the W-RAIL3 midline workaround.
- 2026-06-12 — the BA tranche AUTHORED: BA.md + EXECUTION-DAG.md + this PROGRESS + the
  24 wave specs under `waves/` (opus fanout, run wf_aabe690a-133; every agent cross-
  checked its bounds against the DAG — the flagged seams are folded into
  `EXECUTION-DAG.md §9`). Presented for the user's greenlight; NO implementation.
