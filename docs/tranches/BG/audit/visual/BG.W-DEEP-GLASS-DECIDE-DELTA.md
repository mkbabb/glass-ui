# BG.W-DEEP-GLASS-DECIDE — DELTA (non-authoring paint judge)

**Wave:** F2.3 `BG.W-DEEP-GLASS-DECIDE` (end the 5-tranche deep-glass chronic with a number)
**Class:** `P (cond)` — CONDITIONAL paint (owed ONLY IF the terminal decision is `landed-20px`).
**Judge:** non-authoring paint judge (did NOT build the wave).
**Build commit under test:** `95d47e84` · branch `tranche/BG`.
**Date:** 2026-07-02.

## Verdict: PASS — conditional paint is MOOT (the tier RETIRED at 16px)

The wave's SOLE job was to END the `blur(20px)/saturate 1.8` "booked" chronic (BB→BC→BD→BE→BF→BG)
with a TERMINAL number: either `landed-20px` or `retired-at-16px-cost-<N>`, never `booked`. The
terminal decision recorded on disk is:

```
src/styles/tokens/glass-deep.css:4
  DEEP-GLASS-DECIDED: retired-at-16px-cost-0B-profile-budget-per-frame-blind
src/styles/tokens/glass-deep.css:57
  --glass-blur-deep-radius: 16px;
```

Because the decision is **`retired-at-16px`** (NOT `landed-20px`), **no `blur(20px)` deep-glass
hero/dock surface was ever created**, so there is no new pixel to capture. Per the wave's own class
contract — "owed ONLY IF the terminal decision is `landed-20px` (if `retired-at-16px-cost-N`, the
paint is moot)" — the dual-engine hero/dock deep-glass capture is not owed. The Fable/DesignSync
surface is likewise prefixed **"IF landed"**, so no Fable arm is owed.

The two conditional capture routes ([hero glass pages — deep-glass IF landed-20px], [/dock deep-glass
CTA IF landed-20px]) do NOT exist as 20px surfaces; the shipped deep tier is the EXISTING 16px
identity (unchanged pixel, already warm-cream-verified in prior tranches). This wave shipped a
DECISION, not a repaint — zero new paint.

## Device-free gate — `proof:glass` · deep-glass-decided (GREEN)

The paint being moot, the binding truth for this wave is the terminal-lock gate, which is GREEN:

```
$ node scripts/proof-glass.mjs   → EXIT 0
proof:glass — the F2 Glass family gate — arm: deep-glass-decided (BG.W-DEEP-GLASS-DECIDE)
  D1 verdict        : "retired-at-16px-cost-0B-profile-budget-per-frame-blind" (markers=1, terminal=✓)
  D2 no re-book     : ✓ (zero book-tokens)
  D3 verdict==value : --glass-blur-deep-radius = 16px  ✓
  self-test bites   : all teeth ✓
  status: PASS   artefact: .cache/gates/BG-glass.json
```

Artefact `.cache/gates/BG-glass.json`:
```json
{ "status": "pass", "gate": "proof:glass",
  "facts": { "deepGlassDecided": {
      "markerCount": 1,
      "verdict": "retired-at-16px-cost-0B-profile-budget-per-frame-blind",
      "terminal": true, "bookTokens": [], "radiusPx": 16 },
    "selfTestOk": true },
  "violations": [] }
```

- **D1** — exactly ONE `DEEP-GLASS-DECIDED:` marker; the verdict is terminal (`retired-at-16px-cost-…`,
  not `booked`/malformed). The 5-tranche ride TERMINATES.
- **D2** — zero surviving `book`/`booked` re-book tokens in `glass-deep.css`; the chronic cannot re-book a 6th time.
- **D3** — verdict/value AGREE: a `retired-at-16px` verdict ships `--glass-blur-deep-radius: 16px` (not 20px).
- **self-test** — the born-RED bites (booked-state, verdict/value-mismatch, marker-removed) all still have teeth.

## The recorded number (why RETIRE, not LAND)

The source directive was "RUN `profile:budget` at 20px/1.8 → land-or-retire." The recorded finding
(`glass-deep.css` header, lines 6–31):

- `profile:budget` is BYTE-measuring: the 16→20px change is a 2-char CSS literal that gzip-compresses
  IDENTICALLY (`dist/glass-ui.css` gzip ≈10.04 kB, unmoved) → a 20px bump "clears" the budget at
  **delta-0 bytes**. That clearance is **per-frame-blind** — it proves nothing about the deep blur's
  real per-frame `backdrop-filter` cost, so landing 20px on a 0B "pass" would be a green-over-broken
  close. Hence the verdict token `cost-0B-profile-budget-per-frame-blind`.
- The genuine per-frame fence (`backdrop-filter: blur()` cost is super-linear past ~16px over LIVE
  animated backdrops — the dock over aurora, the hero CTA) is not cleared by any committed harness at 20px.
- The whole design trajectory dials blur DOWN (W-GLASS-CAL cut every calm rung ~15–20% on the user's
  "a hair too much" call); 20px pushes BACK toward rejected diffusion. So **16px IS the decided ceiling —
  IDENTITY, not debt** (saturate already at the Apple 1.8 ceiling; deep blur 16 > calm floating 13).

## Captures

**None owed** (conditional on `landed-20px`; the decision is `retired-at-16px`). No `blur(20px)` deep-glass
route exists to capture on either engine. No PNGs are written for this DELTA — the mootness is the correct
disposition, and writing synthetic captures of a non-existent 20px surface would be a fabricated artefact.

## Fences

- Operated ONLY under `/Users/mkbabb/Programming/glass-ui`; touched no `/tmp`, no sibling under `~/Programming`.
- `node scripts/verify-siblings-intact.mjs --quiet` exits 0 (before AND after).
- No demo:dist server was started (paint moot → no capture pipeline needed); nothing to tear down.
- Edited ONLY `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` (the cursor flip) + this DELTA under
  `docs/tranches/BG/audit/visual/`.
