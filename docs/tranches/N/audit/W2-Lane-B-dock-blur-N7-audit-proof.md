# N.W2 Lane B — N7 dock-blur perceptual audit — proof (NO-OP)

## Disposition

NO-OP. The dock substrate's blur radius is already at the compositor floor (`--glass-blur-dock-radius: 0px`, J.W3.C). The user's "top dock blur is a bit much" perception traces to page-composition stacking (aurora / metaballs backdrops admitted through the dock's 32 % `--glass-bg-dock` opacity), not the dock substrate.

DESIGN.md `## Glass Surfaces` carries the audit's NO-OP rationale + source-of-truth comparison table for posterity.

## Spot-verification

Per N invariant 22 (audit-verdict spot-verification gate):

- `grep -n "glass-blur-dock" src/styles/tokens.css` →
  - line 433: `--glass-blur-dock-radius: 0px;`
  - line 444: `--glass-blur-dock: blur(var(--glass-blur-dock-radius));` (no `saturate()` channel)
  - line 425-432: J.W3.C-era comment documenting the radius drop from 1px → 0px ("the aurora-bleed-through chromatic effect that read as 'blur' was carried by the saturate(1.025) chromatic punch + 32% bg opacity, not the radius. Dropping radius + saturate yields a purely opacity-driven dock").
- `grep -n "backdrop-filter\|glass-blur" src/styles/dock.css` →
  - line 26: `--dock-surface-blur: var(--glass-blur-dock, var(--glass-blur-wash));` (fallback chain to wash if dock token missing; but the dock token IS defined, so the fallback never triggers).
  - line 44: `backdrop-filter: var(--dock-surface-blur);` (the only backdrop-filter rule in dock.css).
- `grep -rn "top-dock\|dock-top\|orientation=\"top" src/ demo/` → zero matches. No top-dock-specific recipe exists; the user's "top dock" perception is about a specific page composition (most demo pages place the dock at viewport bottom; the "top dock" is the speedtest hero / aurora chrome top-mounted dock).

## Source-of-truth comparison

| Surface | `backdrop-filter` value | Blur radius |
|---|---|---|
| `.glass-dock` (every orientation) | `blur(0px)` | **0 px** (compositor floor) |
| `.glass-wash` | `blur(1px) saturate(1.05)` | 1 px |
| `.glass-quiet` | `blur(3px)` | 3 px |
| `.glass-resting` (default GlassPanel; canonical translucent + frosted) | `blur(12px) saturate(1.05)` | 12 px |
| `.glass-floating` (popover / tooltip / dropdown) | `blur(16px) saturate(1.4)` | 16 px |
| `.glass-overlay` (modal / dialog / command) | `blur(24px) saturate(1.5)` | 24 px |

The dock is the LIGHTEST surface in the entire ladder. No further reduction is possible without disabling backdrop-filter entirely (which `prefers-reduced-transparency` already maps to via `glass.css:229`).

## Verdict

The user perception is real — but the source is page composition, not the library substrate. Reducing perceived dock blur requires consumer-side intervention:

1. **Lower aurora opacity / backdrop-blur**: the page's backdrop pixels admitted through the dock are what the eye reads as "dock blur." If the page background has its own blur or saturation cascade, the dock inherits that visually.
2. **Increase `--glass-bg-dock` opacity**: pushing it from 32 % → 45 % cuts backdrop bleed; reduces perceived blur (at the cost of less translucent dock). Consumer-overridable at `:root`.
3. **Move the dock from over-aurora to over-flat-bg**: stack the dock above a flat surface (`<Card>` / `<Section>`) instead of directly over `<Aurora>` / `<MetaballCanvas>`.

NONE of these are library-substrate changes; all are page-composition adjustments.

## Canonical pattern citation

Prior precedent for "audit traces user-perception to page composition, not library substrate": Z.W2 ("CSS subpath dedupe" — user reported a perceived deep-import perf issue; audit traced it to consumer's vite config, not library exports). The pattern matches: when the substrate is at the floor + the perception is real, the right fix lives at the consumer.

## Verification

- Dock filter is at compositor floor: PASS.
- No top-dock-specific recipe shadows the canonical token: PASS.
- DESIGN.md documents the NO-OP rationale: PASS.

## Open questions for orchestrator

None.

## Worktree diff verification output

This lane was orchestrator-direct (source-of-truth audit + DESIGN.md doc-only). No agent worktree.
