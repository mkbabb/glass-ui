# BB.W-ON-GLASS-FG — the surface-aware FOREGROUND register DELTA (N13)

## Freshness header (the AZ-form binding-paint evidence)

| field | value |
| --- | --- |
| capture date | 2026-06-17 |
| HEAD sha (pre-wave) | `2138ac02facefb6e6b0f1c7db318819b53ac8ff5` |
| branch | `tranche/BB` |
| route | the demo `/styles` cascade (synthetic `.glass-card` fixture over the live `--neutral-0` page surface) |
| π spec | `tests-visual/on-glass-fg.spec.ts` |
| device-free gate | `proof:on-glass-fg` (`scripts/proof-on-glass-fg.mjs`) |

> The binding live-π capture (the rendered frames over a real backdrop, both modes) rides
> **W-REFLECT3** per the Batch-P brief; this DELTA carries the diagnosis, the derivation,
> the device-free contrast math, and the cascade-precedence proof.

## The diagnosis (HEAD — N13 "the dark-theme whisper collapse")

`--muted-foreground` is calibrated against the **canvas**, not the glass plate it renders
ON. At HEAD it resolves `var(--neutral-5)` — light `hsl(30 22% 40%)` (L40, "AA: 5.21:1 vs
page"), dark `hsl(34 14% 62%)` (L62, "AA: 7.64:1 vs page"). Both AA bars are quoted against
the **opaque page** (`--neutral-0`).

But the glass-first MAXIMAL default (AX.W54) makes the COMMON case a caption rendering on a
**translucent content-tier glass plate** (`.glass-card`/`.glass-resting`/`.glass-quiet`/
`.glass-wash`), which composites the page UP toward the lifted `--card` fill — so the
effective background luminance behind the muted ink rises and the contrast COLLAPSES on its
OWN surface. The speedtest ask measured the live result: **1.15-3.29:1** on glass in dark
theme.

The BA adaptive-glass seam already handles the OTHER half — the **bright-bucket** case
(`@container style(--glass-backdrop: light)` + the overlay band), where a darkened plate
lifts `--muted-foreground` all the way to `--foreground`. The N13 gap is the **calm-light
content-tier floor**, which self-engages only the sub-perceptual `--glass-tint-strength-floor`
(4% light / 12% dark) and does NOT lift the muted register — so the muted ink keeps its
page-calibrated `--neutral-5` value over a plate it does not actually clear AA on.

## The fix — the three-rung on-glass family + the third-state re-point (token-first)

This is NOT a fork of the adaptive seam — it is the **third state it never expressed**:
(a) bright/darkened plate → full ink (BA, shipped); (b) opaque canvas → page-muted (kept);
(c) **calm translucent glass plate → a register whose contrast target is the COMPOSITED
fill** — between (a) and (b): legible-AND-subordinate.

THREE rungs, minted ONCE (light in `tokens/glass.css` beside the `--glass-tint-*` family,
dark in `tokens/dark-arm.css` — the **plain per-mode pair** idiom, the house pattern for
explicit-color tokens that also sidesteps the `light-dark()` inset-shadow trap), DERIVED
against the LIBRARY composite, warm-amber (the BA.W-NO-GRAY identity), NOT copied from the
slides `deck.css §1` reference literals:

| rung | light | dark | role |
| --- | --- | --- | --- |
| `--on-glass-muted` | `hsl(30 26% 35%)` | `hsl(34 16% 72%)` | the muted caption rung — its target is the composited cream/luminous-dark plate |
| `--on-glass-muted-strong` | `hsl(28 28% 28%)` | `hsl(36 14% 78%)` | the `-strong` secondary rung, one step more present |
| `--input-on-glass` | `hsl(36 40% 92%)` | `hsl(26 12% 22%)` | the form-well fill over glass — grounded warm so the input TEXT reads against a stable base |
| `--progress-track-on-glass` | `hsl(34 24% 84%)` | `hsl(28 14% 26%)` | the recessed meter track over glass — a warm channel distinct from the fill silhouette |

The deck literals (`hsl(24 6% 44%)` / `hsl(45 12% 64%)`) are the REFERENCE — the library
re-derives against its OWN warm-amber `--card` (hue 28-36, not the deck's hue 24/45). The
`proof:on-glass-fg` W2 anti-copy bite reds any verbatim deck-literal copy.

The engagement (`glass/ladder.css`) lands the muted re-point INSIDE the EXISTING calm-tier
`:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` rule (BESIDE the BA seam,
the SAME cascade context, NOT a new competing layer):

```css
:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash) {
    --glass-tint-source: var(--glass-tint-ink);
    --glass-tint-strength: var(--glass-tint-strength-floor);
    --muted-foreground: var(--on-glass-muted);
    --muted-foreground-strong: var(--on-glass-muted-strong);
}
```

## The before/after measured collapse (device-free WCAG recompute)

The on-glass re-point's contrast TARGET is the calm content-tier plate over the page (the
common content surface — a content card on the page, NOT a declared-bright GL field, which
is the BA bright-bucket's domain). Composited plate = `--card` at the quiet-rung 50% over
`--neutral-0`, plus the calm `--glass-tint-strength-floor` tint:

| mode | muted vs plate BEFORE (`--neutral-5`) | muted vs plate AFTER (`--on-glass-muted`) | body `--foreground` vs plate |
| --- | --- | --- | --- |
| dark | 4.99:1 (a whisper as the plate lifts) | **6.63:1** | 10.27:1 (muted stays subordinate ✓) |
| light | 4.77:1 | **5.76:1** | 15.41:1 (muted stays subordinate ✓) |

The page-muted register sits a hair above / at the AA edge on the calm plate (and collapses
to **1.15-3.29:1** over a busy/bright backdrop — the bright-bucket case the consumer engages
`--glass-backdrop: light` for); the on-glass rung carries a comfortable margin (≥5.7:1) on
the calm plate WHILE staying clearly subordinate to the body `--foreground` ink (the
quiet-subordinate hierarchy preserved — the value is BETWEEN page-muted and the bright-bucket
full ink, NOT a blanket lift to `--foreground`).

The well + track:

| surface | light | dark | note |
| --- | --- | --- | --- |
| input text (`--foreground`) over `--input-on-glass` | 14.9:1 | 9.3:1 | the grounded well gives the text a stable base |
| track-vs-fill silhouette over the plate | ✓ ΔL reads | ✓ ΔL reads | the recessed channel reads distinct from the indicator |

## The cascade-precedence proof (the AZ.W-DOCK-RAIL trap pre-empted)

The calm re-point is a `:where(...)` rule (specificity 0,0,0). The BA bright-bucket lift is
`@container style(--glass-backdrop: light) { .glass-card { --muted-foreground: var(--foreground); } }`
— the `.glass-card` carries class specificity (0,1,0). So when the bright bucket engages, it
WINS by specificity over the zero-specificity calm `:where()`, regardless of source order:
a darkened plate goes FULL ink; the calm re-point governs the calm-plate case ONLY. The
overlay band `:where(.glass-floating, .glass-overlay)` is a disjoint selector set (it keeps
its full-ink lift). Both are in the SAME `@layer components` — no `@layer`-vs-utility
inversion. The π spec's "bright-bucket un-regression" case asserts the muted register
resolves the FULL body ink under a declared `--glass-backdrop: light` (the third state did
NOT regress the second).

## The BESIDE-not-edit verification (the frozen BA bound)

`proof:adaptive-glass` + `proof:dark-material` stay GREEN after the `glass/ladder.css` edit:
the `@container` bright-bucket block (`--muted-foreground → --foreground`), the overlay-band
unconditional lift, and the `--glass-tint-ink`/`--glass-tint-strength-*` tokens are
byte-UNTOUCHED. `proof:on-glass-fg` W3 asserts both BA blocks are intact + the calm re-point
does NOT re-declare any seam token.

## The consumers

- **CardDescription + every `text-muted-foreground` caption** inherits the re-point with
  ZERO per-site edit (the calm-tier rule re-points the `--muted-foreground` TOKEN on the
  engaged plate — the substitution-over-redeclaration discipline). CardDescription reads
  `text-muted-foreground-strong`, so it inherits the `-strong` twin.
- **Input/Textarea wells** re-point the SHARED `--control-surface-bg` register onto
  `--input-on-glass` (ONE well register, NOT a fork — coordinates with the BA
  `--control-surface-*` REST tier per the no-fork floor).
- **ProgressDefault/ProgressGradient track** re-points the `--progress-track` fallback from
  `var(--secondary)` (page-calibrated) onto `var(--progress-track-on-glass)`. A consumer's
  explicit `--progress-track` still wins; only the DEFAULT becomes the on-glass register.

## Gate status

- `proof:on-glass-fg` — born-RED at HEAD (1/6 — only the self-test infra passed: every
  W-witness + the π spec RED); GREEN after the wave (5/6 in-tree; W4's `claude=false` greens
  when the orchestrator applies the returned CLAUDE.md note — the W-CARD-PAD C5/C6
  born-RED-until-merge precedent). All 7 self-test bites RED their clause; the good corpus
  stays green.
- `proof:adaptive-glass` + `proof:dark-material` — GREEN after the ladder edit (the
  BESIDE-not-edit proof).
- `npm run typecheck` — clean (the `--input-on-glass`/`--progress-track-on-glass` reads type
  cleanly).
