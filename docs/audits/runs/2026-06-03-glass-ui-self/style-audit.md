# Style audit — glass-ui self (merged) — 2026-06-03

Bidirectional design-token + utility-coverage audit of glass-ui (the library
auditing itself) across six disjoint read-only slices. Per-agent reports:
`a-ui.md` · `b-custom.md` · `c-styles.md` · `d-demo.md` · `e-composables.md` ·
`f-fourier.md` (the fourier consumer, for drift + convergence-blocking gaps).
Tranche-dev only — every row is a proposed addition or a fold candidate, nothing
implemented.

**Tally: ~77 drift rows · 21 GLASS-UI GAPS (deduped → ~7 distinct) · ~12 UNION
candidates (deduped → ~6).** glass-ui is strongly token-disciplined on the hard
axes — across all slices: zero `transition: all`, zero hand-rolled cubic-bezier
strings, zero raw hex/rgba in components (save `useGlassRenderer`), zero reka
`:deep()`, zero z-literals. The drift is concentrated in (a) intermediate
mute-tint reinvention, (b) the radius-token incoherence, (c) the demo oracle
bypassing primitives the library ships.

## Drift by axis (highest-leverage, deduped across slices)

- **Token alignment.** `useGlassRenderer.ts` bakes raw `rgba(255,255,255,…)` /
  `rgba(0,0,0,…)` for border/highlight/shadow where the `--glass-border-*` /
  `--glass-highlight` / `--shadow-md` color-mix tokens exist — and the light-mode
  whites do not dark-unwind (e-composables, axis 1+7). ToastClose raw `text-red-*`,
  Notification `hover:bg-white/10`, DialogScrollContent arbitrary `box-shadow`,
  3× hardcoded `duration-200` (a-ui).
- **Radius-token incoherence (the headline — c-styles).** Radius primitives are
  DOUBLE-MINTED across `tokens.css:290-297` + `theme.css:212-219`;
  `--radius-xs === --radius-sm` (both 4px, `xs` orphaned); `--radius-md` orphan;
  the DESIGN.md radius table is stale (10px vs the documented 8px); `radii.vue`
  labels `xs` as "2px" while the token is 4px. The corners render correctly (the
  semantic `--radius-{panel,card,...}` chain resolves), but the primitive scale
  contradicts itself across three sources of truth.
- **Mute-tint reinvention.** 17+ slash-opacity text tints
  (`text-muted-foreground/{40,60,70,80,85}`) reinvent intermediate mute rungs the
  `--neutral-*` ladder does not expose (b-custom, axis 1+6).
- **Press-scale literals.** 12 bespoke `transform: scale()` literals (fourier) +
  custom-component press transforms that should read `--scale-hover`/`--scale-press`
  (`tokens.css:980-990`) (b-custom U2, f).
- **Demo oracle self-contradiction.** ~140 coalesced sites where stories bypass
  `StorySection` / the semantic typography ladder / the status tokens the library
  itself ships — 70 raw `<section>` wrappers, mono-label reinvention (d-demo). The
  oracle drifting from the canon is the highest-signal finding (the canon
  contradicts itself).

## GLASS-UI GAPS (legitimate library additions; ≥2 consumers each)

1. **`OverlayCloseButton` primitive** (`_shared/`) — DialogContent,
   DialogScrollContent, SheetContent, ToastClose hand-roll 4 divergent focus-ring
   absolute dismiss affordances (a-ui).
2. **`--muted-foreground-faint` rung + `text-faint`/`text-secondary` utility** —
   17+ sites hand-tint intermediate mute (b-custom).
3. **Inset engraved-hairline token** — `inset 0 -0.5px 0 0 rgb(0 0 0 / 0.06)`
   hand-rolled at `dock.css:271` + `instrument-chassis.css:56` (c-styles).
4. **`alertVariants` intent CVA** — success/warning/info branches that the
   `--success`/`--warning`/`--info` tokens already encode; `alert.vue` hand-rolls
   the dark-flip ladders (d-demo).
5. **Shared `prefers-reduced-motion` primitive** — the
   `matchMedia("(prefers-reduced-motion: reduce)")` string is hand-rolled at 7
   sites despite `useRAFLoop` owning the listener machinery (e-composables).
6. **`useTokenColor` `format: "hex"` mode** — fourier's `cssVarToHex` + reactive
   `VIZ_COLORS` + an `App.vue` MutationObserver all reinvent `useTokenColor` plus
   the hsl→hex canvas conversion it lacks (f-fourier — a convergence-blocking gap
   the consumer needs).
7. **Single radius source-of-truth** — collapse the double-minted primitive scale
   + the `xs`/`sm` rungs to one authority (c-styles).

## UNION candidates (same pattern, both forms — propose canonical)

- Active tab-chip vocabulary (BouncyToggle vs Tabs) (b-custom U1, d-demo).
- `.tap-squish` / `.icon-swap` press-scale + icon-swap transition (b-custom U2, f).
- Mono-label dedup: `.text-admin-label` ≈ `.section-label` (d-demo).
- `StorySection` adoption over 70 raw `<section>` wrappers (d-demo).
- Rebase `useGlassRenderer` onto the `--glass-*` token cascade via `useTokenColor`
  (e-composables).

## Disposition (tranche-dev)

None are AS release-blockers (those are R1-R6, `W0b-path-forward.md`). The radius
incoherence (gap 7) folds into AS.W2b's token-hygiene alongside R3 (it is the same
radius/spacing token surface). The other gaps (1-6) + the unions are AS-GU
SUCCESSOR candidates — each clears ≥2 consumers, so they are real additions, not
overfit; they seed the next round. The fourier convergence gaps (f) name-forward to
fourier's own arm once the library exposes the gap (esp. `useTokenColor` hex).
