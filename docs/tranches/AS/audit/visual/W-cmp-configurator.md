# W-cmp-configurator — CONFIGURATOR + ROUNDED-CORNERS + P9 feature-correctness

Slice: the rounded-corner chronic, closed two ways — at the *library* (Configurator.vue root clip + the no-per-section-radius policy in ConfiguratorLayer.vue) and at the *consumer* (P9's `emitComponentUtilities` shipping the component-utility rules into the dist `/styles` cascade so a bare consumer with no `@source` glob still paints `rounded-panel`).

Captures read: `configurator-{light,dark}.png`, `aurora-configurator-{light,dark}.png` (+ 2× upscaled element crops), `aurora-{light,dark}.png`, `foundations-radii-light.png`. Source cross-referenced: `Configurator.vue`, `ConfiguratorLayer.vue`, `vite.style-assets.ts`, `dist/styles/components.css`, `dist/styles/index.css`, `package.json`.

## Verdict: CLOSED — for glass-ui AND for consumers via P9.

---

## (1) Demo configurator geometry — PASS

`configurator-{light,dark}.png` (`/primitives/configurator`) and the `aurora-configurator-{light,dark}.png` element captures (`/aurora` `.configurator`) both render:

- **Rounded OUTER corners** on all four corners of the floating glass panel. Unambiguous on the 2× upscaled crops — top-L/R and bottom-L/R all carry panel radius. NOT squared.
- **Clean inner sections** — the aside's tab/section rows are flush with straight `border-b` hairline dividers. NO hooked dividers, NO per-section radius deforming the hairline.
- **Single clean vertical divider** between the stage column and the aside column (the `lg:border-l` hairline on the aside's left edge), with the rounded outer clip cropping it correctly at top/bottom.

This matches the source policy exactly:
- `Configurator.vue:130` — root is `configurator glass-floating rounded-panel border border-border/60 overflow-hidden`. Radius is owned at the container root; the `overflow-hidden` clip means the stacked `ConfiguratorLayer` sections inherit a rounded outer clip (comment block `Configurator.vue:121-129`).
- `ConfiguratorLayer.vue:98-100` — explicit no-per-section-radius policy: `configurator-layer border-b border-border/40 last:border-b-0`; the inline comment states "rounding is owned at the container root clip … flush sections keep straight border-b dividers — a per-section radius only deforms the hairline on a transparent border-only element."

Dark variant: same geometry, dark chrome, aurora stage still paints a non-empty blue gradient. Both light and dark confirmed.

## (2) P9 `components.css` emission — PASS (no preflight leak)

`dist/styles/components.css` (57 KB, built 17:38 — fresher than the P9 source at 15:00/15:04). The emitted-rule grep matrix:

| utility | emitted rule |
|---|---|
| `rounded-panel` | `.rounded-panel{border-radius:var(--radius-panel)}` |
| `rounded-pill` | `.rounded-pill{border-radius:var(--radius-pill)}` |
| `rounded-card` | `.rounded-card{border-radius:var(--radius-card)}` |
| `text-muted-foreground` | grouped selector `.text-muted-foreground,.text-muted-foreground\/40{color:var(--color-muted-foreground)}` |
| `h-full` | `.h-full{height:100%}` |

`--radius-panel` resolves through the same cascade: `theme.css:223` + `tokens.css:301` both define `--radius-panel: var(--radius-xl)`.

**No preflight reset leaked — every signature is 0:**
- `@layer base` → 0
- universal `*,::before`/`*,::after` reset → 0
- bare `::placeholder` reset → 0 (the one `::placeholder` hit is the legitimate `.placeholder\:text-muted-foreground::placeholder` UTILITY, not the reset — the `@supports` `onlyTw` filter at `vite.style-assets.ts:155-166` rejected the preflight `::placeholder` exactly as documented)
- `:root,:host` `@theme` var block → 0
- `-webkit-text-size-adjust` (preflight signature) → 0

The `--tw-*` var machinery IS kept (56 `@property --tw-*` + the `@supports` initializers), which the border/duration/translate utilities reference — correct per the `kept`-set logic at `vite.style-assets.ts:146-166`.

## (3) AN.W2-inverted probe — PASS (bare consumer gets rounded-panel)

The full bare-consumer cascade path is intact:
1. `package.json:228` — `"./styles": "./dist/styles/index.css"`
2. `dist/styles/index.css:123` — `@import "./components.css";` (pulled AFTER the AN.W1 SFC fold `@import "../glass-ui.css";` at line 119, BEFORE the trailing `@source "../components";` at line 125 — so consumer overrides still win, and the `@import` sits inside the leading import block)
3. `components.css` carries `.rounded-panel{border-radius:var(--radius-panel)}`
4. `--radius-panel → --radius-xl` resolves in the same cascade (theme.css/tokens.css)

A consumer importing ONLY `@mkbabb/glass-ui/styles` with NO `@source "../node_modules/@mkbabb/glass-ui/dist"` glob now paints `rounded-panel` (and the whole component vocabulary). The AN.W2 documented `@source` workaround — fragile, silent-fail — is superseded; P9 makes it free. This is the consumer-side half of the chronic close.

## (4) P1 asideSide + token band — PASS

`Configurator.vue` source carries the full P1 surface:
- `asideSide?: "left" | "right"` prop, default `"right"` (`Configurator.vue:32,85,102`). Visual flip via grid-column placement + border-side swap only — DOM/tab order stays stage→aside (no a11y regression); comment block `:156-173`.
- `asideWidth?: string | [min, max]` projecting `--configurator-aside-{min,max}` inline custom props (`:94,145-154`).
- Default band `minmax(0,1fr) minmax(var(--configurator-aside-min,280px),var(--configurator-aside-max,360px))` (`:136`) — the 280/360 defaults live as `var()` fallbacks (no separate token decl needed).

All P1 utilities are emitted in `components.css` for the bare consumer:
- grid placement: `.lg\:col-start-1{grid-column-start:1}`, `.lg\:col-start-2{grid-column-start:2}`, `.lg\:row-start-1{grid-row-start:1}`
- border-side swap: `.lg\:border-l{…}`, `.lg\:border-r{…}`
- dual-pane grid: the `lg:grid-cols-[minmax(0,1fr)_minmax(var(--configurator-aside-min,280px),var(--configurator-aside-max,360px))]` arbitrary value is emitted (resolves to `grid-template-columns:minmax(0,1fr) minmax(var(--configurator-aside-min,280px),var(--configurator-aside-max,360px))`).

Captures render the default `asideSide="right"` correctly (aside on the right, stage on the left) in both `/primitives/configurator` and `/aurora`. The `asideSide="left"` flip is not separately captured in this set (no left-variant route in as-verify), but the prop logic + emitted utilities are present and the right-default renders cleanly.

## Foundations radii corroboration

`foundations-radii-light.png` (`/foundations/radii`) shows the full canon — `xs(2px)→sm(4px)→md(6px)→lg(var)→xl(12px)→2xl(16px)→pill(9999px)` with progressively rounder corners, and the semantic aliases (card/panel/dialog/input/button/badge/dock). The `panel` swatch renders a clearly rounded-xl corner, confirming the `--radius-panel → --radius-xl → 12px` chain paints in the live demo.

## Notes / gaps (non-blocking)

- No gate reads `dist/styles/components.css` directly. `proof:theme` (`scripts/proof-theme-style.mjs`) proves token resolution (`rounded-card → border-radius: var(--radius-card)`) but builds from SOURCE via `@source inline(probeClasses)` — it does NOT exercise the bare-dist-cascade P9 path. The P9 emission is verified here against the shipped artifact; a future `proof:components-css` (assert components.css present + rounded-panel rule + zero `@layer base`) would lock it. Named-forward candidate, not an AS-W blocker.
- `/primitives/configurator-mobile` (G1 density) and the `asideSide="left"` flip have no capture in this as-verify set; the manifest lists them as priority routes. P1/P9 correctness is established from the right-default + aurora captures + emitted utilities, so this is a capture-coverage gap, not a correctness concern.
