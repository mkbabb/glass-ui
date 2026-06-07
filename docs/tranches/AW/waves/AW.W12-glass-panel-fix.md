# AW.W12 - GlassPanel tier-honoring + demo backdrop

## State

**Name**: W12 - GlassPanel tier-honoring + demo backdrop
**Opens after**: AW tranche open (independent of the dock/aurora/blob bands; no shared file bounds with W7-W11)
**Agents**: 1 serial
**Hard gate**: the five `glass-panel--svg` rungs resolve five distinct `--glass-bg-{variant}` backgrounds in the svg-filter tier (computed-style probe over a mounted matrix); the glass-panel + card stories render over a shipped high-frequency backdrop (Aurora or PaperBackdrop) so the rung steps read.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if the five-rung glass ladder reads as five distinct surfaces in EVERY renderer tier — including the svg-filter tier that Chromium detects by default — and the glass-panel + card demos stage that ladder over a high-frequency backdrop so translucency and tier-alpha differentiation are perceptible. Both flagged reports ("glass-panels suck", "card toggles broken") are one root cause: glass does not read on flat cream, compounded by the svg-filter branch collapsing all five variants to the single `wash` rung.

## 3. Scope

1. `GlassPanel.vue:60-72` — the `svg-filter` branch returns `glass-panel glass-panel--svg` for ALL variants regardless of `props.variant`; the `fallback` branch returns `glass-panel glass-panel--fallback` likewise. Make both branches carry the variant so the scoped CSS can paint per-rung: emit `glass-panel glass-panel--svg ${VARIANT_CLASS[variant]}` (and the fallback analogue), or thread the variant via a `data-variant` attribute the scoped CSS reads.
2. `GlassPanel.vue:104-115` scoped CSS — replace the single hardcoded `background: var(--glass-bg-wash)` on `.glass-panel--svg` (and the single `--glass-bg-floating` on `.glass-panel--fallback`) with a per-variant rule set reading `var(--glass-bg-{wash,quiet,resting,floating,overlay})` keyed off the variant class or `data-variant`. The svg displacement filter overlays whichever rung the variant selects; it no longer forces the lightest rung onto every panel.
3. `demo/stories/substrates/glass-panel.vue` — stage the five-rung matrix over a shipped high-frequency backdrop. Consume the existing `Aurora` (`@mkbabb/glass-ui/aurora`) or `PaperBackdrop` (`@mkbabb/glass-ui/paper-backdrop`) substrate behind the panel grid; do NOT author a new backdrop. The glass now reads against busy color.
4. `demo/stories/primitives/card.vue` — stage the Card tier matrix and the shadow-toggle controls over the same shipped backdrop, so the tier-alpha steps (0.30→0.95) and the shadow-on/shadow-off differential become perceptible. The toggles already function (verified DOM); this closes the perception gap, not a logic bug.

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- the fix to the svg-filter variant collapse requires touching `useGlassRenderer.ts` tier detection or `createGlassFilter` (the filter-construction seam) — file bounds expand beyond `GlassPanel.vue` + `tokens.css` + the two stories;
- the per-variant svg background still reads as one flat rung after the CSS change (the displacement filter is masking the tint differential) — a non-local-recoverable visual gate failure implicating the filter pipeline, not the background tokens;
- a third diagnostic iteration on the computed-style probe fails to surface five distinct backgrounds.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/glass-panel/GlassPanel.vue` | modify |
| `demo/stories/substrates/glass-panel.vue` | modify |
| `demo/stories/primitives/card.vue` | modify |

Do NOT touch: `src/composables/glass/useGlassRenderer.ts`, `src/styles/tokens.css`, any other `src/styles/*.css`, the `Card` component source (`src/components/ui/card/`) — the toggle logic is correct; only its demo staging changes.

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W12 shares no `modify` path with W13 (W13 owns `glass.css` + `utilities.css` + `Slider.vue` + `button/index.ts`; W12 owns `GlassPanel.vue` + two stories), W14 (data-table only), or W15 (colocation/naming).

## 5. Agent Units

### AW.W12.a GlassPanel tier-honoring + demo backdrop

- Goal: every renderer tier honors `variant` per-rung, and the glass-panel + card demos stage the ladder over a shipped high-frequency backdrop so the rungs read.
- Mechanism: thread `props.variant` into the svg-filter and fallback class branches (`GlassPanel.vue:60-72`); expand the scoped CSS (`:104-115`) to a per-variant `--glass-bg-{variant}` rule set; consume `Aurora`/`PaperBackdrop` behind the two story grids.
- Files: `src/components/custom/glass-panel/GlassPanel.vue`, `demo/stories/substrates/glass-panel.vue`, `demo/stories/primitives/card.vue`.
- Sub-gate: a Vitest/Playwright computed-style probe mounts the five-variant matrix forcing `tier="svg-filter"` and asserts five distinct `background` values; `vue-tsc --noEmit` green; the two stories import the substrate from its published subpath (no inline backdrop).

## 6. Hard Gate

1. **Per-rung svg-filter background.** A mounted matrix of the five `GlassPanelVariant`s with `tier="svg-filter"` resolves five DISTINCT computed `background` values (one per `--glass-bg-{variant}` rung), proven by a Vitest DOM probe or a Playwright `getComputedStyle` capture saved to the artefacts path. Pre-fix the same probe yields five identical `--glass-bg-wash` values; the diff is the proof.
2. **Per-rung fallback background.** The same matrix forced to `tier="fallback"` resolves per-variant backgrounds (no longer the single `--glass-bg-floating`).
3. **Demos stage a shipped backdrop.** `demo/stories/substrates/glass-panel.vue` and `demo/stories/primitives/card.vue` each import a substrate from `@mkbabb/glass-ui/aurora` or `@mkbabb/glass-ui/paper-backdrop`; neither story declares a hand-rolled gradient/backdrop element. `grep` confirms the subpath import; `grep` confirms no new `<div class="...backdrop...">` literal.
4. **Build + types green.** `npm run build` and `npm run typecheck` pass.

## 7. Format And Lint Cadence

- `npm run typecheck` after the `GlassPanel.vue` class-branch change and again before close.
- `npm run build` before close (confirms the `/styles` bundle still emits and the token carve did not break the cascade).
- `git diff --check` for whitespace.
- No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W12-glass-panel-tiers.md` — the per-tier computed-background probe output (five distinct values per tier), pre/post.
- Playwright screenshots of the glass-panel five-rung matrix and the card tier matrix over the staged backdrop, at 1440×900, saved under `docs/tranches/AW/audit/screens/`.
- The integration commit hash.

## 9. Commit Plan

- `fix(glass-panel): honor variant per-rung in svg-filter + fallback tiers` — the `GlassPanel.vue` class-branch + scoped-CSS change; body cites the svg-filter collapse and the per-rung resolution.
- `chore(demo): stage glass-panel + card stories over a shipped backdrop` — the two story edits; body names the consumed substrate subpath.
- `docs(AW): W12 close — per-tier background probe + screens` — the artefact + status commit.

## 10. Dependencies

- **Depends on**: AW tranche open. No dependency on the dock/aurora/blob bands.
- **Blocks**: nothing downstream in AW. The card-tier re-verification (Card toggles read) is internal to this wave.

## 11. Archaeology

The metric-cell/stack and instrument-chassis orphan prunes (AV.W10, RECAP :18-20) are NOT in scope here. The svg-filter variant collapse was introduced when the CSS rendering branch was the only tier carrying `VARIANT_CLASS` (GlassPanel.vue header comment, v0.8.6 ladder retirement); the svg/fallback branches were never extended to the five-rung ladder. The guardrail is the per-tier computed-background probe (gate 1-2), which would have caught the collapse at introduction.
