# N.W1 Lane A — GlassPanel translucent + frosted canonical verify — proof

## Disposition

VERIFY-ONLY at HEAD. No tier introduced; `<GlassPanel default="resting">` ALREADY composes the canonical translucent + frosted recipe (65 % background opacity + 12 px backdrop-blur + 1.05 saturation + 12 % foreground border + grain overlay). Per N invariant 22 (audit-verdict spot-verification gate) + V2 (NO workarounds) + KISS + wire-before-retire: no new tier ships at N.W1.

DESIGN.md updated to canonicalise the translucent + frosted definition under the existing `resting` rung. Library API unchanged; consumer behavior unchanged.

## File changes summary

| File | Change |
|---|---|
| `DESIGN.md` (line 216 in five-tier table) | Resting tier's "Use" column extended: "Cards, the canonical plate; **`<GlassPanel>` default** (canonical translucent + frosted)". |
| `DESIGN.md` (between Tokens-per-tier and Convenience-shorthands sections) | New sub-section "Canonical translucent + frosted (N.W1 Lane A — `<GlassPanel>` default)" documenting the 65 / 12px / 1.05 / 12 % / grain composition explicitly + verification path. |

## Spot-verification (per N invariant 22)

The audit's claim that `"resting"` IS the canonical translucent + frosted default verified:

- `src/components/custom/glass-panel/GlassPanel.vue` defines `variant?: GlassPanelVariant` with default `"resting"` (`VARIANT_CLASS.resting → "glass-resting"`).
- `src/styles/glass.css` defines `.glass-resting` against the `--glass-bg-resting` / `--glass-blur-resting` / `--glass-border-resting` / `--glass-shadow-resting` token bundle. Resolved value chain:
    - `--glass-bg-resting`: 65 % light, 72 % dark (per DESIGN.md table line 216).
    - `--glass-blur-resting`: `blur(12px) saturate(1.05)`.
    - `--glass-border-resting`: 12 % foreground.
    - `--glass-shadow-resting`: per-tier shadow.
- Grain overlay surfaces via the `::after` pseudo-element on the `.glass-resting` recipe (paper-grain-overlay composition).

No discrepancy surfaced; canonical translucent + frosted IS the resting rung. The N9 directive ("Glass panels by default should be translucent and frosted") is satisfied at HEAD without code edits.

## Canonical pattern citation

Prior precedent for "verify a tier-as-canonical rather than introduce a new tier": V.W3 active-state vocabulary canon (V.W3 d2247c8) — the Section landmark + tab vocab were canonicalised over the existing typography ladder rather than introducing new utilities. The pattern matches: when the user-facing semantic ALREADY maps to an existing tier, the right move is to canonicalise the mapping in DESIGN.md, not invent a parallel tier.

## Verification

Runtime visual probe is asynchronous (Playwright-MCP currently disconnected; consumer-side build is the canonical verification path). Library-side static verification: source-of-truth audit + DESIGN.md correspondence — both green.

## Open questions for orchestrator

None.

## Worktree diff verification output

This lane was orchestrator-direct (DESIGN.md doc-only edit). No agent worktree.
