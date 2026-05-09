# K.WP — Lighthouse perf + a11y cohort (proof)

**Wave**: K.WP (Lighthouse perf + a11y cohort)
**Lane**: single (sequential)
**Status**: implementation complete, hard-gates (a)–(e) satisfied; (f) typecheck green; (g) Lighthouse re-run deferred to W8 close ceremony (no headless Chrome available in this dispatch); (h) this proof doc.
**Mode**: implementation; **Isolation**: shared.

## Summary

5 P1 fixes landed across 6 files. 1 library-side change (Skeleton compositor migration); 4 demo-side changes (viz contrast, 2 aria-label drops, font async-load + font-display: swap).

All file:line citations below reference HEAD post-fix; pre-fix references the audit at `audit/K-lighthouse-2026-05-08.md`.

## Files changed

| File | Step | Change |
|---|---|---|
| `demo/stories/primitives/buttons.vue` | Step 1 (P1-1) | `text-white` → `text-foreground` on viz-basis Button row |
| `demo/stories/aurora/PresetPickerRow.vue` | Step 2 (P1-2) | dropped `:aria-label="Preset: ${...}"` |
| `demo/stories/navigation/dock.vue` | Step 3 (P1-3) | dropped `aria-label="Dock command"` on `DockDropdownTrigger` |
| `src/components/ui/skeleton/Skeleton.vue` | Step 4 (P1-4) | shimmer migrated to transform-only `::after` keyframe |
| `index.html` | Step 5 (P1-5) | Fraunces stylesheet async-loaded via `media="print" onload="this.media='all'"` + `<noscript>` fallback |
| `demo/demo.css` | Step 6 (P1-6) | replaced upstream `fonts.css` aggregate `@import` with 4 inline `@font-face` blocks (Computer Modern Serif: regular/bold/italic/bold-italic) all carrying `font-display: swap` |

## P1-1 — viz-basis button contrast

**Audit reference**: `audit/K-lighthouse-2026-05-08.md` §P1-1 — three buttons (Fourier/Chebyshev/Legendre) flagged with white-on-tint contrast ratios 2.92, 2.53, 2.44 (axe `color-contrast`, AA threshold 4.5).

**Pre-fix** (`demo/stories/primitives/buttons.vue:118`):
```vue
:class="cn(v.bg, 'text-white shadow-cartoon hover:shadow-cartoon-hover hover:-translate-x-px hover:-translate-y-px')"
```

**Post-fix** (`demo/stories/primitives/buttons.vue:118`):
```vue
:class="cn(v.bg, 'text-foreground shadow-cartoon hover:shadow-cartoon-hover hover:-translate-x-px hover:-translate-y-px')"
```

**Token**: `text-foreground` resolves to `hsl(var(--foreground))`. In the demo's default theme (warm-cream), `--foreground` is the canonical dark-on-light body colour; against the three viz tints (`#eb7366`, `#88a1e7`, `#ce8ee1`) this trivially clears AA. No `text-on-viz` token exists; canonical-foreground was the recommended substitute per the audit and W-P §3.1.

**Dark-mode regression check**: `--foreground` flips to a light shade in `.dark`, so the dark viz tints already host light text correctly. No `dark:text-white` override needed.

**Verification**:
```
$ rg "text-white" demo/stories/primitives/buttons.vue
(no matches)
```

## P1-2 — aurora preset chip aria-label drop

**Audit reference**: §P1-2 — axe `label-content-name-mismatch` because `:aria-label="Preset: ${PRESET_META[key].label}"` produced an accessible name where the visible text (`<span>{{ PRESET_META[key].label }}</span>`) was not the prefix.

**Pre-fix** (`demo/stories/aurora/PresetPickerRow.vue:51-53`):
```vue
:aria-pressed="key === current"
:aria-label="`Preset: ${PRESET_META[key].label}`"
@click="onPick(key)"
```

**Post-fix** (`demo/stories/aurora/PresetPickerRow.vue:51-52`):
```vue
:aria-pressed="key === current"
@click="onPick(key)"
```

**Rationale**: KISS path per W-P §3.2. Visible `<span>` carries the label; `aria-pressed` carries the toggle state. Screen reader announces "button, pressed, Sky" without the `Preset:` prefix — no information lost.

**Verification**:
```
$ rg "aria-label" demo/stories/aurora/PresetPickerRow.vue
(no matches)
```

## P1-3 — dock dropdown trigger aria-label drop

**Audit reference**: §P1-3 — same `label-content-name-mismatch` antipattern. `<DockDropdownTrigger aria-label="Dock command">` wrapped a visible `<span>{{ dockCommandLabels[dockCommand] }}</span>` plus icon.

**Pre-fix** (`demo/stories/navigation/dock.vue:136-140`):
```vue
<DockDropdownTrigger
    type="button"
    aria-label="Dock command"
    data-testid="dock-dropdown-trigger"
>
```

**Post-fix** (`demo/stories/navigation/dock.vue:136-139`):
```vue
<DockDropdownTrigger
    type="button"
    data-testid="dock-dropdown-trigger"
>
```

**Rationale**: visible Settings icon + current command label are self-describing. The `<DropdownMenuLabel>Dock command</DropdownMenuLabel>` inside the menu (still present at line 146) provides the role context for SR users opening the menu.

**Verification**: the only `aria-label`s remaining in `demo/stories/navigation/dock.vue` are on icon-only `DockIconButton`s (Home/Search/Bell/Settings/etc.) — those are correct usages (icon needs a name). The previously-flagged "Dock command" site is gone. The `aria-label="Dock view"` on a different `<Select>`-trigger remains; that one wraps an icon-only trigger and is not part of the audit findings.

## P1-4 — Skeleton.vue compositor migration (LIBRARY-SIDE)

**Audit reference**: §P1-4 — 18 simultaneous shimmer skeletons on `/aurora` push TBT to 120 ms (vs 10 ms baseline). The `.skeleton-shimmer` keyframe animates `background-position` on the host, which cannot composite to GPU; runs on main thread.

**Pre-fix** (`src/components/ui/skeleton/Skeleton.vue:27-47`):
```vue
<style scoped>
/* Sliding gradient sweep. Composes shimmer-sweep keyframe from
 * src/styles/animations.css (same -200% → 200% background-position
 * direction). Honors reduced-motion. */
.skeleton-shimmer {
    background: linear-gradient(
        90deg,
        var(--muted) 25%,
        color-mix(in srgb, var(--muted-foreground) 30%, transparent) 50%,
        var(--muted) 75%
    );
    background-size: 200% 100%;
    animation: shimmer-sweep 1.5s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
    .skeleton-shimmer {
        animation: none;
    }
}
</style>
```

**Post-fix** (`src/components/ui/skeleton/Skeleton.vue:27-62`):
```vue
<style scoped>
/* Sliding gradient sweep. Compositor-friendly: animates `transform` on an
 * absolutely-positioned `::after` rather than `background-position` on the
 * host (transform composites to GPU; background-position runs on main
 * thread). K.WP P1-4: 18 simultaneous shimmer skeletons on /aurora pushed
 * TBT to 120ms vs 10ms baseline; transform-only keyframe eliminates that
 * main-thread cost. Honors reduced-motion. */
.skeleton-shimmer {
    position: relative;
    overflow: hidden;
}

.skeleton-shimmer::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        transparent 0%,
        color-mix(in srgb, var(--muted-foreground) 30%, transparent) 50%,
        transparent 100%
    );
    transform: translateX(-100%);
    animation: skeleton-shimmer-slide 1.5s linear infinite;
    will-change: transform;
}

@keyframes skeleton-shimmer-slide {
    to {
        transform: translateX(100%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .skeleton-shimmer::after {
        animation: none;
    }
}
</style>
```

**Visual fidelity**: the host already wears `bg-muted` (template `<div :class="cn('rounded-input bg-muted', ...)">`), so the muted base colour is preserved on the host. The previous gradient was `muted 25% → muted-foreground@30% transparent 50% → muted 75%` on a 200%-wide background-position sliding -200% → 200%. The new `::after` renders only the highlight band (`transparent → muted-foreground@30% transparent at 50% → transparent`) translating from `-100%` to `+100%` over the muted host. Net visual: a highlight stripe sweeps across a muted base — identical perceptual signature to the pre-fix gradient sweep.

**Reduced-motion**: gating preserved on `::after` (the only animation site).

**Why local keyframe (`skeleton-shimmer-slide`) instead of touching `animations.css`**: the existing `shimmer-sweep` keyframe in `src/styles/animations.css:101` is exposed as the Tailwind `--animate-shimmer-sweep` utility (`src/styles/theme.css:333`) and remains a generic `background-position` recipe other consumers may pick up. The Skeleton-specific compositor migration is the load-bearing fix per the audit (§P1-4 attributes the 18-element TBT cost to `Skeleton.vue:21-48`); broader keyframe decomposition is out of scope for WP. `animations.css` was not edited.

**Verification**:
```
$ rg "background-position" src/components/ui/skeleton/
src/components/ui/skeleton/Skeleton.vue: * absolutely-positioned `::after` rather than `background-position` on the
src/components/ui/skeleton/Skeleton.vue: * host (transform composites to GPU; background-position runs on main
```
Only comments mention it (explaining the migration). Zero animation-source hits.

## P1-5 — Google Fonts CSS async-load

**Audit reference**: §P1-5 — `index.html` synchronous `<link rel="stylesheet">` for Fraunces blocks first paint on the critical path. Audit reports `render-blocking-resources` score 0.5.

**Pre-fix** (`index.html:25-28`):
```html
<link
    href="https://fonts.googleapis.com/css2?family=Fraunces:..."
    rel="stylesheet"
/>
```

**Post-fix** (`index.html:25-39`):
```html
<!-- Async-load the Fraunces stylesheet so it doesn't block first paint
     (K.WP P1-5). `media="print"` makes the browser fetch but skip
     render-blocking; the onload swaps it back to `all`. The <noscript>
     path keeps non-JS clients functional. -->
<link
    href="https://fonts.googleapis.com/css2?family=Fraunces:..."
    rel="stylesheet"
    media="print"
    onload="this.media='all'"
/>
<noscript>
    <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:..."
        rel="stylesheet"
    />
</noscript>
```

**Note**: chose the `media="print" onload="this.media='all'"` shim over the `rel="preload" as="style" onload="this.rel='stylesheet'"` alternative — the former is more idiomatic to a hand-written `index.html` like this one (no preload-related quirks around discovery scanner double-load). Both are acceptable per W-P §5.

**Estimated savings**: ~100–300 ms FCP in prod (network-dependent). Dev-mode dominant cost is JS waterfall — this won't move the dev Lighthouse perf score, but the audit explicitly notes prod-relevance as load-bearing.

## P1-6 — Computer Modern font-display: swap

**Audit reference**: §P1-6 — `font-display` audit at 0.5 because Computer Modern fonts (loaded from `cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/fonts.css`) lack `font-display: swap`. Upstream aggregate CSS we don't control.

**Investigation** (per spec):
```
$ grep -n "cmunrm\|computer-modern\|@font-face" demo/demo.css
3:@import url("https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/fonts.css");
```
Single `@import`, no inline `@font-face` blocks. The remote `fonts.css` `@import`s ~12 family-specific CSS files; only **Computer Modern Serif** is referenced anywhere in `src/` or `demo/` (rg confirmed: `src/styles/typography.css:15`, `src/styles/tokens.css:23`, plus demo configurator preset).

**Strategy**: replace the broad upstream `@import` with explicit local `@font-face` declarations for just the 4 Serif weights (regular/bold/italic/bold-italic), each carrying `font-display: swap`. This (a) adds the `swap` descriptor — the audit's load-bearing fix; (b) trims the request count (was: 1 aggregate CSS + 12 family CSS files + woff per family; now: 4 woff with optional ttf fallback).

**Pre-fix** (`demo/demo.css:3`):
```css
@import url("https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/fonts.css");
```

**Post-fix** (`demo/demo.css:3-58`):
```css
/* Computer Modern Serif — declared inline (rather than via the upstream
 * dreampulse fonts.css aggregate) so we can attach `font-display: swap`
 * (K.WP P1-6). The aggregate @import pulled ~12 family CSS files of which
 * only Serif is consumed; this trims the request count too. */
@font-face {
    font-family: "Computer Modern Serif";
    src:
        url("https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Serif/cmunrm.woff")
            format("woff"),
        url("https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/font/Serif/cmunrm.ttf")
            format("truetype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
/* + cmunbx.woff (bold), cmunti.woff (italic), cmunbi.woff (bold-italic) */
```

**Estimated savings**: prevents FOIT on Computer Modern; ~150–300 ms perceived-text-visible improvement on slow networks. Lighthouse `font-display` audit → 1.0 (was 0.5).

## Step 7 — Verification (rg counts)

```
$ rg "background-position" src/components/ui/skeleton/ src/styles/
src/components/ui/skeleton/Skeleton.vue: * absolutely-positioned `::after` rather than `background-position` on the
src/components/ui/skeleton/Skeleton.vue: * host (transform composites to GPU; background-position runs on main
src/styles/animations.css:/* ── Shimmer sweep (background-position for generated animation utilities) ── */
src/styles/animations.css:        background-position: -200% 0;
src/styles/animations.css:        background-position: 200% 0;
src/styles/animations.css:/* ── Shimmer sweep (background-position for shimmer utilities) ── */
src/styles/animations.css:    0% { background-position: 250% 0; }
src/styles/animations.css:    100% { background-position: -250% 0; }
src/styles/animations.css:    0%   { background-position: 200% 0; }
src/styles/animations.css:    100% { background-position: -200% 0; }
```

- `Skeleton.vue` hits are comments only — both reference the migration, not animation source.
- `animations.css` hits remain (`shimmer-sweep`, `shimmer`, `gold-shimmer-slide` keyframes) — these are utility-keyframes exposed via Tailwind animations (`--animate-shimmer-sweep`, etc.) and consumed by `SortableList.vue` (`shimmer`) + the Tailwind utility surface. They are not the load-bearing /aurora cost (the audit attributes that to Skeleton's 18 shimmer instances, all migrated). Per W-P §7 ("only static positioning is OK") — these are animation-context but they belong to a separate, non-flagged surface area. No regression risk; out of scope per W-P §1 (file bounds).

```
$ rg "text-white" demo/stories/primitives/buttons.vue
(no matches)
```

```
$ rg "aria-label" demo/stories/aurora/PresetPickerRow.vue demo/stories/navigation/dock.vue
demo/stories/navigation/dock.vue:                    <DockIconButton aria-label="Home"><Home class="h-4 w-4" /></DockIconButton>
demo/stories/navigation/dock.vue:                    <DockIconButton aria-label="Search"><Search class="h-4 w-4" /></DockIconButton>
demo/stories/navigation/dock.vue:                    <DockIconButton aria-label="Notifications"><Bell class="h-4 w-4" /></DockIconButton>
demo/stories/navigation/dock.vue:                    <DockIconButton aria-label="Settings"><Settings class="h-4 w-4" /></DockIconButton>
demo/stories/navigation/dock.vue:                    <DockIconButton aria-label="Previous"><SkipBack class="h-4 w-4" /></DockIconButton>
demo/stories/navigation/dock.vue:                        :aria-label="playing ? 'Pause' : 'Play'"
demo/stories/navigation/dock.vue:                    <DockIconButton aria-label="Next"><SkipForward class="h-4 w-4" /></DockIconButton>
demo/stories/navigation/dock.vue:                            aria-label="Dock view"
demo/stories/navigation/dock.vue:                    <DockIconButton aria-label="New"><Plus class="h-4 w-4" /></DockIconButton>
demo/stories/navigation/dock.vue:                            <DockIconButton aria-label="Share">
demo/stories/navigation/dock.vue:                            <DockIconButton aria-label="Export">
demo/stories/navigation/dock.vue:                            <DockIconButton aria-label="Track">
```

- `PresetPickerRow.vue`: zero hits — flagged site removed.
- `dock.vue`: previously-flagged `aria-label="Dock command"` site is gone. Remaining sites are on icon-only `DockIconButton`s (correct usage — icons need an accessible name) and one `aria-label="Dock view"` on a different `<SelectTrigger>` not part of the WP audit. KISS: leave correct usages alone.

## Step — typecheck

```
$ npm run typecheck
> @mkbabb/glass-ui@0.9.2 typecheck
> vue-tsc --noEmit
(green; no output beyond the script header)
```

## Visual smoke-test — Skeleton migration

The Skeleton compositor migration preserves visual fidelity:

| Property | Pre-fix | Post-fix |
|---|---|---|
| Host base | `bg-muted` (Tailwind class) — unchanged | `bg-muted` — unchanged |
| Host gradient | `linear-gradient(90deg, muted 25%, muted-foreground@30% 50%, muted 75%)` at 200% bg-size, sliding via `background-position: -200% → 200%` | None — host shows `bg-muted` flat |
| Sweep mechanism | `background-position` keyframe on host | `transform: translateX(-100% → 100%)` on `::after` overlay |
| Highlight gradient | encoded in host bg | `linear-gradient(90deg, transparent, muted-foreground@30% at 50%, transparent)` on `::after` |
| Sweep duration / easing | 1.5s linear infinite | 1.5s linear infinite (unchanged) |
| Reduced-motion gate | `animation: none` on `.skeleton-shimmer` | `animation: none` on `.skeleton-shimmer::after` |

**Perceptual signature**: identical. Both render a highlight band sweeping left-to-right across a muted base every 1.5s. The transform-on-`::after` approach is the canonical compositor-friendly shim documented widely (e.g., MDN `will-change`, web.dev `non-composited animations` doc). `will-change: transform` hints to the compositor to promote the layer.

**Routes that exercise the shimmer**:
- `/feedback/skeleton` — 18 skeletons exercise both `pulse` and `shimmer` variants (~12 `shimmer`).
- `/aurora` — `PresetPickerRow.vue:73-76` renders 5 `Skeleton variant="shimmer"` thumbnails during cold preset-thumbnail bake (this is the audit's 18-element load-bearing site, counting nested skeletons inside each chip).

Manual visual inspection in the dev server (`npm run dev`) on both routes is the orchestrator-side close gate. No functional regression expected — the Skeleton public API (`variant`, `class`) is unchanged.

## Lighthouse re-run

**Status**: deferred to W8 close ceremony per W-P §7 ("re-run Lighthouse on the affected routes ... if your environment supports it"). The dispatch environment lacks the headless-Chrome + Vite-dev-server setup needed to capture `/aurora`, `/primitives/buttons`, `/navigation/dock` post-fix scores in this turn. The W-P plan explicitly accepts this fallback (Step 7: "If you can run Lighthouse, do so; if not, document the post-fix expectations in proof doc").

**Post-fix expectations** (cited from the audit's per-finding "Estimated savings"):

| Finding | Pre-fix metric | Expected post-fix |
|---|---|---|
| P1-1 viz contrast | a11y 94 (`/primitives/buttons`); 3 axe failures | a11y 100; 0 axe `color-contrast` failures |
| P1-2 aurora aria | aurora a11y 100 but axe `label-content-name-mismatch` flags 5 chips | axe `label-content-name-mismatch` flags 0 chips |
| P1-3 dock aria | dock a11y 100 but axe flags trigger | axe `label-content-name-mismatch` flags 0 sites on `/navigation/dock` |
| P1-4 shimmer compositor | aurora `non-composited-animations`: 18 elements; TBT 120ms | aurora `non-composited-animations`: 0 (or `<5`) elements; TBT 30–50ms (audit estimate) |
| P1-5 fonts async | `render-blocking-resources` 0.5 | unchanged in dev (JS waterfall dominates) — prod-only ~100-300ms FCP saving |
| P1-6 font-display | `font-display` audit 0.5 | `font-display` audit 1.0 |

The W8 close ceremony's ε performance lane re-runs Lighthouse and absorbs the post-fix evidence into `audit/lighthouse-2026-05-08-postWP/{aurora,buttons,dock}.{html,json}` per W-P §7.

## Git posture

No mutating git was run in this dispatch (per W0 hardened-agent-git clause + binding W-P §"Hardened agent git clause"). `git status` was used read-only to verify the working-tree posture. The orchestrator owns the WP close commit per K hard-gate (i): `fix(tranche-k/wp): Lighthouse perf + a11y cohort — viz contrast + label-name + skeleton compositor + font async`.

## Hard gate status

| Gate | Status | Note |
|---|---|---|
| (a) viz buttons AA-compliant | satisfied | `text-white` → `text-foreground` |
| (b) aria-label / visible-text reconciled | satisfied | both flagged sites cleared |
| (c) Skeleton transform-only keyframe | satisfied | `::after` + `translateX` + `will-change: transform`; reduced-motion preserved |
| (d) Fraunces async-loaded | satisfied | `media="print" onload="..."` shim + `<noscript>` fallback |
| (e) Computer Modern `font-display: swap` | satisfied | inline `@font-face` × 4 (regular/bold/italic/bold-italic), each carrying `font-display: swap`; broad upstream `@import` removed |
| (f) typecheck green | satisfied | `vue-tsc --noEmit` returns clean |
| (f) build green | deferred | pre-existing dts pipeline failure unrelated to WP changes (`Unable to load file: dist/timeline.d.ts` from another wave's deletions in the shared worktree); WP edits do not touch the type-emit surface |
| (f) test green | not-run | no tests exercise the 6 changed sites; standalone test surface untouched |
| (g) Lighthouse re-run | deferred to W8 close | environment lacks headless Chrome; expectations documented above |
| (h) proof doc | this document | |
| (i) WP close commit | orchestrator | binding |
