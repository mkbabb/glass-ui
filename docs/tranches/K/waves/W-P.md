# K.WP — Lighthouse perf + a11y cohort

**Opens after**: W1 close.
**Agents**: 1 (sequential demo-side fixes).
**Hard gate**: 5 P1 + 1 P2 Lighthouse findings absorbed; Lighthouse re-run at W8 close confirms each fix.
**Status**: CLOSED `8ec320b` (viz contrast + 2 label-name drops + Skeleton compositor + Fonts async + font-display: swap). Status-line bumped at L.W5 Lane A (K R3).

## Purpose

The 2026-05-08 Lighthouse audit (`audit/K-lighthouse-2026-05-08.md`) ran on Vite dev mode (no production demo build exists at HEAD; deferred to L). Despite dev-mode-only perf scores, **a11y / best-practices / console-error / non-composited-animations findings are valid in dev** and treated as load-bearing.

Findings absorbed by WP:

| ID | Severity | Issue | File | Wave |
|---|---|---|---|---|
| P0-1 | P0 | `<Configurator>` reactive recursion on `/motion/metaballs` | `src/components/custom/configurator/useConfiguratorState.ts:85-87` + `demo/stories/motion/metaballs.vue:107-134` | **W7** (per K invariant 16) |
| P1-1 | P1 | viz-basis button contrast 2.44–2.92 vs AA 4.5 | `demo/stories/primitives/buttons.vue:97-105` | WP |
| P1-2 | P1 | label-content-name-mismatch on aurora preset chips | `demo/stories/aurora/PresetPickerRow.vue:52` | WP |
| P1-3 | P1 | label-content-name-mismatch on dock dropdown trigger | `demo/stories/navigation/dock.vue:138` | WP |
| P1-4 | P1 | 18 non-composited shimmer animations on aurora (TBT 120ms vs 10ms) | `src/components/ui/skeleton/Skeleton.vue:21-48` | WP |
| P1-5 | P1 | render-blocking Google Fonts CSS (no async-load shim) | `index.html:21-24` | WP |
| P1-6 | P1 | Computer Modern fonts lack `font-display: swap` | `demo/demo.css` (locate `@font-face` for `cmunrm.woff` / `cmunbx.woff`) | WP |
| P2-1 | P2 | missing `<meta name="description">` | `index.html:7-8` | **W4** (doc cohort) |
| P2-2 | P2 | `robots.txt` parse failures | n/a | **defer to L** (deploy concern) |
| P2-3 | P2 | `uses-passive-event-listeners` flagged in `@vue/runtime-dom` | n/a | **defer to L** (Vue upstream) |
| P2-4 | P2 | `uses-long-cache-ttl` | n/a | **defer to L** (prod hosting) |

P0-1 is absorbed by W7 (per K invariant 16 + W7 hard gate revision). P2-1 (meta-description) absorbs into W4 (`index.html` is already in W4's bounds for the bundle-budget restoration). WP owns the remaining 5 P1s.

## Scope

### Step 1 — P1-1: viz-basis button contrast (demo only)

`demo/stories/primitives/buttons.vue:97-105` renders the viz-basis swatches with `text-white` on `bg-viz-{fourier,chebyshev,legendre}`. Light-mode tints are too pale to host white text at AA (ratios 2.44–2.92).

**Fix**: swap `text-white` → `text-foreground` (or `text-on-viz` if a token exists) at line 101. Cartoon-card pattern in glass-ui already uses dark-on-light at `cartoon-*` surfaces. Verify visual fidelity is preserved (the viz hues are intended for chart fills; dark text on a pale-tint background reads as intentional).

If `text-foreground` causes worse visual fidelity, alternative: add a one-off `text-viz-fg` token to demo `tokens.css`-equivalent (or inline a value in the demo style block) — but prefer canonical token consumption.

### Step 2 — P1-2: aurora preset chip label-content-name-mismatch

`demo/stories/aurora/PresetPickerRow.vue:52` sets `:aria-label="Preset: ${PRESET_META[key].label}"` while the visible text is just `<name>`. Axe-core flags this because the visible `<span>` text is not the first word of the accessible name.

**Fix**: drop the `aria-label` and rely on the visible text + `aria-pressed` for state semantics. Screen readers already announce "button, pressed, Sky" without the prefix. OR change the format to `aria-label="${PRESET_META[key].label} preset"` so the visible text is the prefix.

Recommended: drop the aria-label (KISS).

### Step 3 — P1-3: dock dropdown trigger label-content-name-mismatch

`demo/stories/navigation/dock.vue:138` — same antipattern. `<DockDropdownTrigger aria-label="Dock command">` contains visible text `<span>{{ dockCommandLabels[dockCommand] }}</span>`.

**Fix**: drop the `aria-label="Dock command"` (the visible icon + label is self-describing) OR move the label to a `<DropdownMenuLabel>` inside the menu.

Recommended: drop the aria-label.

### Step 4 — P1-4: skeleton-shimmer compositor migration

`src/components/ui/skeleton/Skeleton.vue:21-48` ships a `.skeleton-shimmer` keyframe animating `background-position`. This **cannot composite** to GPU; runs on main thread. On `/aurora`, 18 simultaneous shimmer skeletons during preset-thumbnail bake push TBT to 120 ms (vs 10 ms baseline).

**Fix**: migrate to a transform-only keyframe. Wrap the gradient in an absolutely-positioned `::after` and animate `transform: translateX(...)`:

```css
.skeleton-shimmer { position: relative; overflow: hidden; }
.skeleton-shimmer::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(...);
    transform: translateX(-100%);
    animation: shimmer-slide 1.4s linear infinite;
}
@keyframes shimmer-slide { to { transform: translateX(100%); } }
```

Verify: visual fidelity preserved (the shimmer should look identical); reduced-motion already gated.

**Note**: this is the only library-side fix in WP; the rest are demo-side.

### Step 5 — P1-5: Google Fonts CSS async-load

`index.html:21-24` is a synchronous `<link rel="stylesheet">` for Fraunces. Render-blocking on the critical path.

**Fix** (the W2.W2 commit `08ffbde` already preconnected — last mile is stylesheet async-load):

```html
<link
    href="https://fonts.googleapis.com/css2?family=Fraunces:..."
    rel="stylesheet"
    media="print"
    onload="this.media='all'"
/>
<noscript><link rel="stylesheet" href="..." /></noscript>
```

OR use `<link rel="preload" as="style" onload="this.rel='stylesheet'">` (modern equivalent).

Estimated savings: ~100–300 ms FCP in prod; dev-mode dominant cost is JS waterfall.

### Step 6 — P1-6: Computer Modern `font-display: swap`

Locate `@font-face` block for Computer Modern in `demo/demo.css`. Add `font-display: swap;` to the descriptor:

```
@font-face {
    font-family: "Computer Modern";
    src: url("…cmunrm.woff");
    font-weight: 400;
    font-display: swap; /* ← add this */
}
```

Same for `cmunbx.woff` (bold variant).

Investigation: `grep -n "cmunrm\|computer-modern\|@font-face" demo/demo.css` to find the declaration sites.

### Step 7 — Verification

After all 5 fixes land, re-run Lighthouse on the affected routes (`/aurora`, `/primitives/buttons`, `/navigation/dock`):

```bash
npx --yes lighthouse@12 http://localhost:5173/aurora \
  --output=json --output=html \
  --output-path=/tmp/lighthouse-WP-aurora-postfix \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet
```

Verify:
- `/primitives/buttons` a11y → 100
- `/aurora` `non-composited-animations` no longer flags 18 elements
- `/aurora` `label-content-name-mismatch` no longer flags
- `/navigation/dock` `label-content-name-mismatch` no longer flags
- `font-display` audit → 1.0 (was 0.5)

Capture post-fix Lighthouse outputs at `docs/tranches/K/audit/lighthouse-2026-05-08-postWP/`.

## File bounds

- `demo/stories/primitives/buttons.vue` (Step 1)
- `demo/stories/aurora/PresetPickerRow.vue` (Step 2)
- `demo/stories/navigation/dock.vue` (Step 3)
- `src/components/ui/skeleton/Skeleton.vue` (Step 4 — only library-side change)
- `index.html` (Step 5; coordinate with W4 if W4 also touches index.html)
- `demo/demo.css` (Step 6)

**MUST NOT TOUCH**:
- W0 territory (precepts)
- W1 territory (hover-popover hoverOpenDelay decision)
- W3 territory (vocab.γ second pass)
- W4 territory (docs + tooling — except `index.html` which is shared; coordinate by comment if both lanes need to touch)
- W5 territory (mobile-viewport)
- W6 territory (audacious primary-CTA)
- W7 territory (Slider-in-Dock + Configurator P0)
- WV territory (V-tranche post-hoc write-up)

## Hard gate

(a) viz-basis buttons render with AA-compliant contrast at HEAD (axe re-run shows 0 contrast failures on `/primitives/buttons`).
(b) aurora preset chips + dock dropdown trigger no longer flag `label-content-name-mismatch`.
(c) `Skeleton.vue` shimmer keyframe is transform-only (compositor-friendly); `grep "background-position" src/components/ui/skeleton/` shows no animation source.
(d) `index.html` Google Fonts stylesheet async-loaded (`media="print" onload="..."` OR `rel="preload" as="style"`); verify FCP unaffected in dev (the prod-only saving doesn't regress dev).
(e) Computer Modern `@font-face` block in `demo/demo.css` declares `font-display: swap;`.
(f) `npm run typecheck` + `npm run build` + `npm run test` green.
(g) Lighthouse re-run shows post-fix scores: `/primitives/buttons` a11y → 100; aurora `non-composited-animations` element count → 0 (or much smaller); dock + aurora `label-content-name-mismatch` cleared; `font-display` audit → 1.0.
(h) Proof doc `audit/WP-perf-a11y-cohort-proof.md`:
   - Each finding with pre-fix Lighthouse measurement + post-fix Lighthouse measurement (cite the JSON-extracted values).
   - File-line citations.
   - Visual smoke-test for Skeleton.vue migration (no visual regression).
(i) orchestrator commits WP close: `fix(tranche-k/wp): Lighthouse perf + a11y cohort — viz contrast + label-name + skeleton compositor + font async`.

## Required artifacts

- proof doc `audit/WP-perf-a11y-cohort-proof.md`
- post-fix Lighthouse outputs at `audit/lighthouse-2026-05-08-postWP/` (HTML + JSON for the 3 affected routes)
- updated `docs/tranches/K/PROGRESS.md`
- WP close commit hash
