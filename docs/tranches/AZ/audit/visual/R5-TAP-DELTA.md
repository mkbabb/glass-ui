# AZ.R5-TAP (R5-3) — the collapsed-tap + hover-approach MORPH-RACE click integrity · DELTA

<!-- surface-paths: src/components/custom/dock/GlassDock.vue, src/components/custom/dock/composables/useDockClickIntegrity.ts, src/components/custom/dock/constants.ts, demo/stories/dock/overview.vue -->
<!-- surface-hash: b97ef918612da681a44de171e0daf8ac174284e07fb8aa3538f63b9d73b7d224 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the four surface-paths' bytes
     are byte-identical to capture time (sha256 of the concatenated bytes, "\n"-joined,
     surfaceHash convention). Stamped at the own-surface capture against the live demo
     shell on :5199 (the user's truth surface) with the R5-TAP edits in place. -->

The slides-consumer audit (USER-AUDIT-2026-06-11-R5 §R5-3) reproduced — with REAL
input on the production deck — two manifestations of ONE dock-interaction defect: a
click/tap whose target IDENTITY changed under the (stationary) pointer because the
dock's hover-expand layer swap moved a DIFFERENT control under it. The fix is the
ARCHITECTURAL one the audit named: scope the pass-through to the TAPPED ELEMENT'S
IDENTITY, and give GlassDock an INTERNAL morph-settle window — the consumer never
needs a guard. The slides interim arms (`@touchend.prevent` + a 320ms capture-phase
click guard keyed off the exposed `expanded` ref) RETIRE on the bump; the `expanded`
ref STAYS exposed (a protected binary-consumer surface).

## The two manifestations (both consumer-verified on the deck)

- **(a) TOUCH.** A tap on a COLLAPSED dock expands it AND lets the browser's native
  tap→click compat event flow to the control under the finger (the iOS Now-Playing
  single-tap contract — `useDockState` shape B′). The expand swaps the summary layer
  out SYNCHRONOUSLY, so the compat click lands at the SAME COORDINATES on a DIFFERENT
  element. On the deck: a Home link under a gear tap → navigate-away.
- **(b) FINE POINTER.** An approach-then-click DURING the hover-expand FLIP lands the
  click on the EXPANDED layer's control at the old coordinates. On the deck: the gear
  click ADVANCED THE SLIDE; the gear's own popover never opened (the user read it as
  "Download PowerPoint is broken").

## The root fix — `useDockClickIntegrity` (ONE mechanism, two axes)

A GlassDock-internal composable wired onto the dock root in the CAPTURE phase
(`@pointerdown.capture` + `@click.capture`). At `pointerdown` it records the element
under the pointer (`pressTarget`) + whether the box was morphing then. On the `click`:

- **At rest** (no morph, no settle envelope) → pass through. The steady-state click
  path is byte-untouched.
- **A morph in flight, OR a press begun mid-morph** → DEFER the click (swallow,
  capture-phase). The layout is unstable; the control under the pointer is mid-flight.
  This is the audit's "resolve against the pre-morph target or defer until settle" —
  it catches manifestation (b) even when the pressed/clicked element identity
  "matches" (the approach-hover swapped the layer BEFORE the press).
- **Inside the post-flip settle envelope, morph already settled** → use IDENTITY: a
  click on the SAME control the user pressed passes through (a genuine quick settled
  click); a click whose target identity DIFFERS (the gear-tap → a swapped-in control)
  is swallowed. This catches manifestation (a), the touch compat-click.

The settle window reads the live `[data-morphing]` attribute as the primary signal +
a `MORPH_SETTLE_MS` (320ms, the `--spring-dock` envelope) floor backstop so a
never-settling morph can't trap clicks forever. `markExpandFlip()` opens the window on
every collapsed→expanded flip (the existing `visualExpanded` watch). An always-expanded
dock never morphs, so it never arms the guard — its clicks are byte-identical to before.

## Live verification — the slides recipe equivalent on the demo shell (real input)

A deterministic capture dock (`data-testid="dock-tap-capture"`, a demo-private test
affordance on `/dock/overview`) mirrors the deck nav-pattern: a collapsed Settings-gear
SUMMARY whose post-expand box-center hosts a DIFFERENT control (Play). Captures
(1100×720 @2×, both modes): `R5-TAP-collapsed-{light,dark}.png` (the 50×54 gear circle),
`R5-TAP-expanded-{light,dark}.png` (the 242×54 five-control row centered on Play).

The π readback (`R5-TAP-readback.json`), driven with Playwright touch emulation (CDP
`Input.dispatchTouchEvent`) + the real fine-pointer cursor:

| case | input | result |
|---|---|---|
| (a) touch gear-tap | CDP tap on the collapsed gear center | `activations: []`, `fullLayerLeak: []` — **clean** |
| (b) fine-pointer race | approach-click while `[data-morphing]` armed AND a full control under the point (`snapAtClick.under: "Skip back"`, `m: true`) | `activations: []`, `fullLayerLeak: []` — **clean** |
| settled click | a click on Play after the morph settles | `settledClickReached: ["Play"]` — **reaches the control** |

The BORN-RED contrast (the guard disabled on the same surface, the proven leak banked
at `ground/R5-tap-race-baseline.json`): the touch tap activated `Skip back`, and the
race click activated `Skip back` — the user tapped/clicked the gear, a media control
fired. That is the deck's navigate-away / advance-the-slide defect, reproduced and then
eliminated.

## Gate

`proof:dock-tap-integrity` (`scripts/proof-dock-tap-integrity.mjs`) — THREE witnesses +
a born-RED self-test:

- **W1 (source)** — `useDockClickIntegrity.ts` carries BOTH the identity scope (a
  `pressTarget` captured on pointerdown, compared on click) AND the morph-settle window
  (`[data-morphing]` / `MORPH_SETTLE_MS`); the handlers are WIRED onto the GlassDock root
  in the capture phase (the anti-decoy bite — a guard that never sees the click is dead).
- **W2 (born-RED reconstruction)** — `git show HEAD:` proves the pre-fix tree had NO
  composable, NO capture handlers, NO `MORPH_SETTLE_MS` constant (the gate is born-RED on
  the tree it was minted against; the stale-base trap is checked, not assumed).
- **W3 (live replay)** — the demo-shell reproduction above: (a) no leak, (b) no leak, and
  the settled click DOES reach the control (the guard is not over-broad).
- **baseline self-test** — replays `ground/R5-tap-race-baseline.json` (the proven leak on
  the guard-disabled tree) through the PURE W3 detector and asserts the leak is FLAGGED
  every run.

Verified: with the guard removed the gate FAILS on W1-wired + W3(a) + W3(b) (the live
leak); with it in place, GREEN. typecheck green; adjacent `proof:dock-{no-scale-pop,
unify,perfection,taxonomy,region-model,hold-contract}` + `proof:dock-a11y-contract` all
green (no regression).

## Files

| file | change |
|---|---|
| `src/components/custom/dock/composables/useDockClickIntegrity.ts` | NEW — the internal click-integrity guard (identity scope + morph-settle window; capture-phase handlers + `markExpandFlip`) |
| `src/components/custom/dock/GlassDock.vue` | instantiate the guard; wire `@pointerdown.capture`/`@click.capture` on the root; call `markExpandFlip()` on the collapsed→expanded flip |
| `src/components/custom/dock/constants.ts` | mint `MORPH_SETTLE_MS` (320ms — the settle envelope floor) |
| `demo/stories/dock/overview.vue` | NEW deterministic `dock-tap-capture` section (a demo-private R5-3 test affordance — collapsed gear-summary over a different-control-at-center expanded row) |
| `scripts/proof-dock-tap-integrity.mjs` | NEW — the gate (W1 source + W2 born-RED git-show + W3 live replay + baseline self-test) |
| `docs/tranches/AZ/audit/ground/R5-tap-race-baseline.json` | NEW — the born-RED baseline (the proven leak on the guard-disabled tree) |
