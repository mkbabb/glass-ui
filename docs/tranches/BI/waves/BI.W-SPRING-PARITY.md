# BI.W-SPRING-PARITY — the M1 spring time-base parity fix (the prerequisite)

Band B7 (motion register). **THE PREREQUISITE WAVE** — sequenced BEFORE every register mint, tempo axis,
and spring retune in this band and in D-DOCK/D-PAGER. Design: FAM-18 round-3 re-verify (ROUND-3-DIGEST
§M1) + D-MOTION PASS-4B proto (G4 LANDED-and-green, `PASS-4B-RAW.md`).

## §Mandate

Discharges: **FAM-18 / M1** (the spring time-base parity break), **FR-1** (the formation-readiness gap —
the load-bearing prerequisite carried a wave-SHAPED disposition but NO named wave / band-table home),
**FAM-18-RV / -RV-a / -RV-b / -RV-c** (the round-3 sub-findings). SUFFUSION-MAP R2 / M1. The FR-1 mandate is
literal: "Formation MUST mint a named prerequisite wave anchored born-RED to the round-3 M1 re-verification,
sequenced BEFORE D-MOTION-G4 / D-DOCK-G8 / D-PAGER spring math."

## §Design

Decided (round-3 CONFIRMED + root-caused; the fix is LANDED-and-green in a worktree, `git diff` = exactly
`scripts/regen-spring-tokens.mjs` + `src/styles/tokens/scheme-spring.css`):

- **The exact wrong term.** The emitted `--spring-*` `linear()` curve is normalized by kf `springLinearStops`
  over `maxDuration = 4×response` (the default sample horizon), while the paired `--spring-*-duration` token
  is the analytic 2%-band settle `-ln(0.02)/(ζ·ωₙ)` — two DIFFERENT horizons ~4.8× apart. Replaying the
  4×-response-normalized curve over the short settle clock compresses the whole trajectory: every CSS enter
  paints a ~50 ms pop + a 300 ms dead-flat tail (the plausible root of "animations feel off").
- **The fix (ONE horizon).** Pass `maxDuration` into `springLinearStops` in `generateBlock()`. Per
  FAM-18-RV-c, derive BOTH the duration token AND the linear() `maxDuration` from the TRUE numeric 2%-settle
  (tick `SpringProgress` until sustained `|1−x|<0.02`), NOT the underdamped-approximation formula — this
  eliminates gentle's endpoint discontinuity (penult stop 0.895→0.978, snap 10.5%→2.23%) and holds exact
  CSS==JS parity for all six presets. Re-run `regen-spring-tokens.mjs` → `scheme-spring.css` rewrites.
- **glass-ui-LOCAL — NO kf ask (FAM-18-RV-a REFUTES the registry framing).** kf's `springLinearStops` already
  accepts + honors `maxDuration`; glass-ui owns the entire fix in `regen-spring-tokens.mjs`. The
  AUDIT-REGISTRY:308 "carries a kf coordination ask" sub-claim is refuted (recorded).
- **Measured:** HEAD max|CSS_t90−JS_t90| = **428.59 ms** (ratios 3.83–6.40×) → FIXED **0.36 ms** (all six
  1.00×). This is a bug fix, NOT a calibration — the (response, ζ) TABLE is right; only the emission horizon
  was wrong. **No preset retune ships in this wave** (dock/detent retunes are user-judgment-gated downstream).

## §Work

- `scripts/regen-spring-tokens.mjs:54-64` — `generateBlock()` passes `maxDuration = <true numeric 2%-settle>`
  into `springLinearStops`; `springSettleDurationSeconds` (`:88-94`) derives from the numeric settle (both the
  token and the curve horizon read ONE source).
- `src/styles/tokens/scheme-spring.css:101-127` — regenerated `--spring-*` `linear()` stops + `--spring-*-
  duration` block (DO-NOT-hand-edit generated output).
- `scripts/proof-spring-tokens-synced.mjs` — add the tempo-parity clause (§Acceptance).

## §Acceptance

Gate: **`proof:spring-tokens-synced`** EXTENDED IN PLACE (no fork) with a **tempo-parity clause**
(`detectTempoParity()`): derive CSS_t90 (p90 of the emitted `linear()` × its `--spring-*-duration` clock) and
JS_t90 (integrate the `SPRING_PRESETS` spring), assert they agree within a small band per preset.
- **BORN-RED at HEAD** (6/6 presets flag; the shipped tokens paint the ~5× compression) → GREEN at the fix
  (0/6). The 3 pre-existing gates (`spring-tokens-synced` value arm, `animation-coherence`, `spring-ease`) are
  tempo-BLIND (FAM-18-RV-b) — they stay GREEN and prove nothing about tempo; this clause is the only guard.
- Self-test bite: a synthetic regen that DROPS `maxDuration` re-reds the clause (a future regen cannot
  silently un-fix parity).

## §π/DELTA

**Rebuilt-demo LIVE π of the FIXED tokens** on `:5199`/`:5200` — the deterministic `linear()` strings were
COMPUTED post-fix but never PAINTED. Capture: snappy t90 44 ms→~200 ms on its own 400 ms clock (10–16% →
50–61% of clock); the faithful +3.2% snappy overshoot still reads; gentle's endpoint no longer snaps. Chrome
AND Safari, both modes. DELTA: `W-SPRING-PARITY-DELTA.md`.

## §Obligations

- No cross-repo ask (kf-ask REFUTED — FAM-18-RV-a).
- This wave GATES the band: `proof:spring-tokens-synced` must be GREEN before W-REGISTER-TABLE / W-TEMPO land
  and before any D-DOCK G8 / D-PAGER spring retune (the "no spring retune before M1" law, SUFFUSION-MAP §4.1).

## §Dispositions

- **FAM-18 / M1: CONFIRMED + FIXED** (terminal). FR-1 discharged (the prerequisite wave now named + born-RED).
- FAM-18-RV-a: the AUDIT-REGISTRY kf-coordination-ask claim REFUTED (recorded, no ask filed).
- FAM-18-RV-b: `proof:spring-tokens-synced` tempo-blindness CLOSED (the clause, not a new gate).
- FAM-18-RV-c: gentle endpoint snap CLOSED (numeric-settle horizon).
