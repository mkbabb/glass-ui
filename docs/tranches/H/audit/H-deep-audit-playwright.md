# H — Deep Visual Audit (Playwright + Chrome MCP)

**Date**: 2026-05-05.
**Lane**: post-H-close visual audit (sixth lane alongside α/β/γ/δ/ε/ζ).
**Method**: Playwright MCP against `localhost:5173` dev server; viewport 1440×900; computed-style probes via `browser_evaluate`; full-page screenshots saved under `.playwright-mcp/`.

The five read-only audit lanes (α/β/γ/δ/ε/ζ) walk source + docs. They cannot catch runtime bugs that surface only when CSS + JS + Vue scoped style + tailwind-merge interact. This lane closes that gap.

## Coverage

| Page | URL | Console errors | Notes |
|---|---|---|---|
| foundations/intro | `/foundations/intro` | 0 | Hero composition renders; rainbow gradient surface clean |
| primitives/blob | `/primitives/blob` | 0 | WebGL canvas 320×320; inlined SVG defs (W1 absorb of svg-filters → blob.vue) functional; gold blob visible |
| primitives/slider-glass-track | `/primitives/slider-glass-track` | 0 | Variant + dock-keep-open composition (W3+W4) render |
| foundations/flourishes | `/foundations/flourishes` | 0 | **Shimmer matrix BROKEN — see §Critical findings** |
| foundations/typography | `/foundations/typography` | 0 | Per-rung Fraunces axes (W1.E inline) correctly applied: display-3 `WONK 1, SOFT 50, wdth 105`; display-5 `100/1/110`; display-mega `100/1/112`; display-ultra `100/1/125` |
| containers/paper-card | `/containers/paper-card` | 0 | Paper-tier inlining (W1.E) correct: paper-1 bg `rgb(251,250,249)`; paper-2 `rgb(248,248,246)`; paper-3 `rgb(244,243,241)`; paper-4 `rgb(236,236,233)`; distinct shadows per tier |
| compositions/audacious-hero | `/compositions/audacious-hero` | 0 | G's flagship bold-maximalist hero clean |

## Critical finding — shimmer matrix runtime regression (P0)

`demo/stories/foundations/flourishes.vue` iterates a `SHIMMERS` array binding `:class="cn(s.cls, 'text-display-3')"` where `s.cls` is one of `text-shimmer-gold`, `text-shimmer-blue`, `text-shimmer-vivid`, `text-shimmer-pastel`.

Computed-style probe at HEAD:

```js
// XPath: //*[contains(text(), 'Boreal' | 'Carnival' | 'Daydream' | 'Aurum')]
// All four samples — actual rendered classList:
[
  { word: "Aurum",    classList: ["text-display-3"], color: "rgb(28,25,23)", bgImage: "none" },
  { word: "Boreal",   classList: ["text-display-3"], color: "rgb(28,25,23)", bgImage: "none" },
  { word: "Carnival", classList: ["text-display-3"], color: "rgb(28,25,23)", bgImage: "none" },
  { word: "Daydream", classList: ["text-display-3"], color: "rgb(28,25,23)", bgImage: "none" },
]
```

The shimmer class is **stripped from the rendered DOM**. Each `<p>` ends up with only `text-display-3`. The shimmer rules in `<style scoped>` (W1 absorb addition) match nothing.

### Root cause

`cn()` is `clsx + tailwind-merge` per `src/utils/cn.ts`. `tailwind-merge` treats `text-*` as a conflict group (text size / text color / text alignment all share the prefix). When `cn("text-shimmer-pastel", "text-display-3")` runs, tailwind-merge classifies both as `text-*` utilities and **keeps only the last one** — `text-display-3` survives, `text-shimmer-pastel` is dropped.

**Standalone usage works**: `<p class="text-shimmer-vivid mt-2 mb-4">Colour as commitment.</p>` (line 68) does NOT route through `cn()`, so the class survives and the gradient + animation render correctly. The probe confirmed: `{ classList: ["text-shimmer-vivid", "mt-2", "mb-4"], color: "rgba(0,0,0,0)", bgImage: "linear-gradient(...)" }`.

### Why no audit caught it

- W1.E retired the global utility classes; W1 absorb added them as `<style scoped>` in flourishes.vue. The CSS rules are correct.
- W4 design-fidelity rerun is screenshot-driven; gradient-clipped text on dark substrate was visually plausible-looking even when broken (samples appear as dark display text either way).
- W6 β / γ / δ are read-only on source; they do not run the dev server or compute styles.
- The bug only manifests at runtime through the cn() + tailwind-merge conflict heuristic.

### Fix path (tranche I scope)

Three viable options:

1. **Bypass `cn()` for shimmer classes**: change `:class="cn(s.cls, 'text-display-3')"` to `:class="[s.cls, 'text-display-3']"` (Vue native array binding; no tailwind-merge conflict resolution).
2. **Re-globalize the shimmer utilities** as a non-`text-*` prefix (e.g., `.shimmer-text-blue`) so tailwind-merge doesn't conflict-resolve them.
3. **Configure tailwind-merge** with a custom class group so the shimmer utilities don't conflict with text-display rungs. Most idiomatic but requires a `tailwind-merge` extend config.

Recommended: option 1 (KISS; one-line fix in the consumer story). Tranche I W2 absorbs.

## Other observations

- **Dev server boot**: 586 ms (excellent). No Vite warnings.
- **Per-page console**: 2 messages each, 0 errors, 0 warnings. The 2 messages appear consistent (likely vite-hmr connection logs).
- **WebGL2 + Blob**: canvas dimensions match expected (320×320 at hero size 20rem × 16 dpi); no `webglcontextlost` events; blob renders the `idle` mood gold body cleanly.
- **Paper-tier cascade**: each `.paper-N` rule applies distinct background + border + shadow per W1.E inlined literals. The `paper-3` row uses `--shadow-elevated` (single 0 8px 24px) instead of the cartoon-shadow stack; intentional per W1's mid-tier elevation design.
- **Per-rung Fraunces axes**: literal `font-variation-settings` per rung verified post-W1 inline retire. WONK and SOFT axes drive the display-3..ultra ladder visibly.

## Recommendations for tranche I

1. **W1**: Fix the shimmer matrix in `flourishes.vue` (option 1 above).
2. **Add Playwright + Chrome MCP visual audit as canonical lane to the close ceremony.** Per α audit: "the 4-agent audit (read-only doc + grep) misses runtime-visual bugs." This audit demonstrates the gap. Update `docs/precepts/instructions/tranche/SPEC.md` close criteria to include a "deep visual audit lane" alongside the 4 read-only lanes for tranches that ship visual changes.
3. **Per-story computed-style fingerprint**: a future tranche could land a Playwright-based visual-regression suite (per-story DOM snapshot + computed-style fingerprint of representative elements). Less brittle than pixel-diff; catches CSS + tailwind-merge interactions like this one.

## Authority

Read-only Playwright validation. No source modified. No commits. Dev server (`npm run dev`) ran in background; killed at end of audit.
