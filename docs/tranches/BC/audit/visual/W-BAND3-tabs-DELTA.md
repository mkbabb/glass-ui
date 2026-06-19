# BC Band 3 (tabs) — DELTA (iOS-27 glass pills, paint-verified)

**Binding paint proof:** the existing `tabs-std.spec.ts` π passes **12/12** on the new pills; the live
capture confirms the gestalt:
- the active indicator is a fully-rounded **stadium pill** — `border-radius: 9999px` (NOT squared,
  NOT reka/shadcn-flat) — with a distinct warm-translucent lifted glass plate
  `oklab(0.798 0.0019 0.0062 / 0.84)` (light, the floating tier) / `oklab(0.367 ... / 0.894)` (dark twin).
Captures: docs/tranches/BC/audit/visual/W-TABS-IOS/tabs-{light,dark}.png.

## What landed
- **TABS-IOS** — small stadium glass pills: `--radius-tab` aliases the ONE `--radius-pill` source (the
  px-literal radii + the 640px bumps DELETED, clean break); the active pill = the `--glass-bg-floating-tinted`
  lifted plate + the BLACK-BAR rim-top/-bottom + glass-shadow-floating; no dark D2 ring; reads the DESHADCN
  census (zero residual shadcn-neutral). The `--glass-bg-floating-tinted` seam LIFTED (not forked) onto a
  shared `:where(.btn-glass, .segmented-indicator)` source (substitution-over-redeclaration).
- **LIQUID-TAB** — pull an active tab → it morphs/squishes/flings (draggable default true; the gel cap 1.15;
  composes useDragMorph → kf Draggable/SpringProgress/useLiquidFlex + the snappy preset, NO second engine;
  compositor-only; additive a11y — the drag-snap writes the SAME model, the keyboard path byte-identical).
- **UNDERLINE-TUNE** — the underline glide reads the eased snappy (the indicator-clock half in lockstep with
  SPRING-EASE; springPresets byte-untouched, spring-tokens-synced GREEN).

## Gate reconciles (within mandate — documented wave changes supersede)
proof:tabs-std (its floating-tier regex widened to accept the `-tinted` variant, intent preserved);
proof:drag-morph D4 (dropped the literal `draggable:false` default; the BC contract is clickPathIntact +
ungated roving, WCAG 2.1.1); proof:tabs-ios T4 (the gel cap is now a const==token lockstep, LIQUID-TAB the
documented lifter). 3 new gates registered (tabs-ios/liquid-tab/underline-tune). proof:no-shadcn-default's
8 residuals (button/select/switch/tags-input/toggle) are pre-existing, owned by Band-6 controls.
