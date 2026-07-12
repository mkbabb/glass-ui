# BI.W-COMMAND-JITTER — the command-palette jitter fix (R5a + R5b, paired)

Band B7 (motion register). Design: D-MOTION PASS-1 §2.5 R5 (two confirmed source defects) + PASS-4B proto (G6
CLOSED — the cause proven on disk with the load-bearing ORDERING insight) + SUFFUSION-MAP R4.

## §Mandate

Discharges: **UF-G8** ("/containers/command—seems to jitter back and forth?"). SUFFUSION-MAP R4 (`menu.css:58`
wrong clock; `menu.css:67` keyboard-lift restart). D-MOTION G6.

## §Design

Decided (PASS-1 R5 + PASS-4B G6 — the cause is the `menu.css` keyboard-lift, NOT scrollbar-gutter on macOS; a
12→0 wobble A/B proved it). **TWO source defects, fixed as a PAIR — the ordering is LOAD-BEARING:**

- **R5a — the clock.** `menu.css:58` `transition: translate var(--duration-fast) var(--spring-smooth)` is the
  P4 violation — the `--spring-smooth` CURVE on the generic 0.2 s clock (the re-timed dead tail). FIX: pair it
  with its own settle clock `var(--spring-smooth-duration)` (now tempo-scaled via W-TEMPO).
- **R5b — the keyboard-lift restart.** `menu.css:67-72` — the `translate: 0 var(--menu-row-lift)` hover-lift
  fires on `[data-highlighted]`, which reka sets for **keyboard** highlight too, so EVERY arrow/keystroke
  restarts a lift transition → the jitter. FIX: scope the `translate` lift to `:hover` ONLY; the keyboard
  `[data-highlighted]` keeps the bg tint + color, NO translate.
- **THE ORDERING FENCE (PASS-4B, load-bearing):** R5a ALONE regresses G6 — the clock swap LENGTHENS the lift
  (0.2 s → 0.35 s), making the per-keystroke restart worse. **R5a MUST NOT ship without R5b.** They land as
  ONE atomic pair.
- **`scrollbar-gutter: stable`** on the Command inner scroller — the classic-scrollbar-platform reflow guard
  (macOS overlay scrollbars measure 0, so this is a no-op there but load-bearing on Windows/Linux).

## §Work

- `src/styles/menu.css:58` — `var(--duration-fast)` → `var(--spring-smooth-duration)` (R5a).
- `src/styles/menu.css:67-72` — scope the `translate` lift to `:hover:not([data-disabled])`; the
  `[data-highlighted]`/`:focus` arms keep bg + color, drop `translate` (R5b).
- The Command inner scroll port — `scrollbar-gutter: stable`.

## §Acceptance

Gate: **`proof:animation-coherence`** menu-jitter clause (extend in place) — (1) `menu.css` translate lift is
`:hover`-scoped, NOT on the bare `[data-highlighted]`; (2) the menu-row translate clock is a
`--spring-*-duration` token, NOT `--duration-fast`.
- **BORN-RED at HEAD**: `menu.css:58` pairs `--spring-smooth` with `--duration-fast`; `:72` lifts on
  `[data-highlighted]`.
- Self-test bite (the paired-fix ordering): a synthetic R5a-only tree (clock swapped, lift still on
  `[data-highlighted]`) reds the jitter-regression check — the pair cannot silently split.

## §π/DELTA

**Command-palette TYPING frame-series before/after** — 0 wobble on arrow/keystroke (measured 12→0); the
`:hover` lift still reads on pointer. Chrome + Safari, both modes. DELTA: `W-COMMAND-JITTER-DELTA.md`.

## §Obligations

- G6 residual capture: if the typing frame-series STILL jitters after R5a+R5b (reka `scrollIntoView` per
  keystroke), the further fix is scroll-anchoring / `block:'nearest'` — pass-3 proved the cause is the lift,
  not scroll; re-verify on device before adding scroll work.

## §Dispositions

- **R5 command jitter: CLOSED** (R5a clock + R5b lift-decouple, paired). The scrollbar-gutter-on-macOS
  hypothesis: REFUTED (recorded — the cause was the keyboard-lift restart).
