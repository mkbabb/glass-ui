# AX.W51 — comfortable-sizing DELTA (paired BEFORE/AFTER)

Base `391d8fb`. The W00 paired-π protocol: the BEFORE pins the HEAD compact controls +
the inconsistent coarse-pointer growth; the AFTER is the one-scalar lockstep. The
SOURCE arm (`proof:ui-scale`, 28/28) + the calc-resolution math below are the
device-free DELTA; the painted screenshot capture (light/dark × desktop/coarse) is the
orchestrator's binding live step (the chrome extension was not connected in the dev
session, so the live capture is deferred to the orchestrator's audit pass per the W00
protocol — NOT claimed here as captured).

## The override-is-live DELTA — ONE token grows the whole library in lockstep

The five witnesses said: at HEAD a `:root { --ui-scale: 1.3 }` override is DEAD (nothing
resizes — every control is a raw `h-9`/`text-sm`/`size-4`). After the wave, that one
token grows height + padding + font + glyph in lockstep. Verified by calc resolution
(rem base 16px):

| magnitude | HEAD (no axis) | AFTER @ `--ui-scale: 1` | AFTER @ `--ui-scale: 1.3` |
|-----------|----------------|--------------------------|----------------------------|
| control height (h-10 register) | 40px (fixed) | 40px (identity) | **52px** (+30%) |
| control height (h-9 register)  | 36px (fixed) | 36px (identity) | **46.8px** |
| control font (`text-sm`)       | 14px (fixed) | 14px (identity) | **18.2px** |
| control glyph (`size-4`)       | 16px (fixed) | 16px (identity) | **20.8px** |

At `--ui-scale: 1` every value is byte-identical to HEAD — the no-reflow discipline (the
desktop default is the identity). At `1.3` height, font, AND glyph all grow ~1.3×
together — the proportion preserved (the "idiomatic, modern, non-contrived" bar: the box
does not grow while the glyph stays `size-4` swimming in it).

## The coarse-pointer-consistency DELTA — ONE touch scale, not three

The witness-5 split: at HEAD the dock grew 1.5× on coarse-pointer but a `<Button>`/
`<Input>` did NOT (the dock had `--dock-scale: 1.5`; the rest of the library had no
axis). After the wave the GLOBAL `@media (pointer: coarse) { :root { --ui-scale: 1.5 } }`
grows buttons + inputs + badges + toggles + the dock in lockstep from ONE place.

| surface | HEAD coarse | AFTER coarse (`--ui-scale: 1.5`) |
|---------|-------------|-----------------------------------|
| Button (h-10)   | 40px (did NOT grow) | **60px** |
| Input (.input-pill) | 40px (did NOT grow) | **60px** |
| Badge font      | 14px (did NOT grow) | **21px** |
| Dock control    | 60px (grew via its own 1.5×) | **60px** (now via the GLOBAL axis — no double-scale) |

The WCAG-2.5.5 44px floor holds via the `max(scaled, --control-floor)` clamp: a small
control (h-7, 28px base → 42px scaled) clamps UP to **44px** on coarse-pointer (the
floor lifts `--control-floor` to `--touch-target`).

## The dock-byte-identical-at-scale-1 canary

`--dock-scale` re-homed `calc(var(--ui-scale) * var(--dock-local-scale, 1))`. At the
desktop identity (`--ui-scale: 1`, `--dock-local-scale: 1`) it resolves to `1 * 1 = 1` —
byte-identical to HEAD's `--dock-scale: 1`. The reconcile is transparent at the identity:
the 150-line dock geometry calc cascade (`dock/density.css`) reads the re-homed scalar
unchanged (`proof:dock-region-model` GREEN, `proof:dock-perfection` GREEN). On coarse the
dock inherits the global 1.5× and `--dock-local-scale` (default 1) adds no extra — the
dock grows WITH the library, no double-scale.

## Preserved axes (orthogonal to size)

- W54 `--glass-level` + W55 `--glass-tint-*` token blocks UNTOUCHED — a control is
  comfortably-sized AND glass AND legible, three orthogonal knobs (`proof:glass-level`
  6/6+8/8 GREEN; `proof:forced-colors-skin` 13/13 GREEN).
- The φ-display ladder (`--type-display-*`/title/heading/subheading) carries NO
  `--ui-scale` factor — a hero is not a touch target, so it does NOT grow on coarse.
