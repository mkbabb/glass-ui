# C.W0.B — Live Findings (Phase 2 Post-Mortem)

Confirmed via Playwright + four parallel static audits during plan-mode pre-work for tranche C. Each defect cites a runtime artefact path or a getComputedStyle eval result.

## §1. Tooltip without TooltipProvider — settings AND navigation/rail render blank

**Symptom (live console)** at `/compositions/settings` and `/navigation/rail`:
```
Error: Injection `Symbol(TooltipProviderContext)` not found.
Component must be used within `TooltipProvider`
at injectContext (reka-ui.js:281)
at setup (reka-ui.js:37855)
```

**Live measurement**: `<main>.children.length === 0` on both routes — the entire story unmounts when the first `<Tooltip>` instantiates.

**Two distinct contributors**:
1. `src/components/custom/icon-tooltip/IconTooltip.vue` wraps `<Tooltip>` (reka-ui) without a `<TooltipProvider>`. Every `Labeled*` field in `src/components/custom/labeled-field/` uses `IconTooltip`. `demo/stories/compositions/settings.vue` passes a `tooltip` prop 14 times (lines 92, 98, 134, 143, 152, 159, 167, 175, 183, 189, 219, 225, 231, 261). First invocation throws synchronously.
2. `demo/stories/navigation/rail.vue:48-68` renders bare `<Tooltip>` from `@/components/ui/tooltip` with no provider. Same crash.

**Fix scope**: C.W1.A (IconTooltip self-hosts) + C.W1.B (StoryPage hosts for bare-Tooltip story content). Both ship — library standalone-correctness and demo-content-correctness are different promises.

## §2. font-mono-code is undefined Tailwind utility — silently no-ops in 55 sites

**Used in**: `dashboard.vue:122,159,212`, `LabeledSelect.vue:11,15`, `confirm-dialog/ConfirmDialog.vue`, `timeline/GlassTimeline.vue`, dozens more (full count via `rg 'font-mono-code' src/ demo/ | wc -l`).

**Cause**: Tailwind v4 generates utilities from `@theme` tokens or `@utility` blocks. There is no `--font-mono-code` token and no `@utility font-mono-code` declaration. Calling `class="font-mono-code"` silently produces an empty CSS rule; the element falls through to the body cascade (`var(--font-serif)` per `demo/demo.css`).

**Live verification** (post-fix gate at C.W1.C): `getComputedStyle(document.querySelector('.font-mono-code')).fontFamily` should include "Fira Code"; today it returns the body serif.

**Fix scope**: C.W1.C — `@utility font-mono-code { font-family: var(--font-mono); font-feature-settings: "calt", "liga"; }` in `src/styles/typography.css`.

## §3. text-2xs is undefined utility

**Used in**: `LabeledSelect.vue:25` description hint.

**Cause**: same as §2 — no `@utility text-2xs` declaration. Silent fallthrough to body's `text-base`.

**Fix scope**: C.W1.C — `@utility text-2xs { font-size: 0.625rem; line-height: 1; }`.

## §4. theme.css radius @theme tokens self-reference circularly

**Location**: `src/styles/theme.css:191-197`:
```css
--radius-card:   var(--radius-card);    /* circular */
--radius-panel:  var(--radius-panel);   /* circular */
--radius-dialog: var(--radius-dialog);
--radius-input:  var(--radius-input);
--radius-button: var(--radius-button);
--radius-badge:  var(--radius-badge);
--radius-dock:   var(--radius-dock);
```

**Cause**: each `@theme` mapping points back at itself. Tailwind silently produces `var(--radius-card)` → `var(--radius-card)`; runtime resolution works *only* because `tokens.css` defines `--radius-card` first via cascade order. The `@theme` block doesn't propagate them as Tailwind utility values reliably; `rounded-card` resolution is brittle.

**Fix scope**: C.W1.D — point each `@theme` mapping at the primitive scale from `tokens.css` (e.g., `--radius-card: var(--radius-2xl)`).

## §5. Dashboard 4-col metric grid pinches at 1440×900 — measured

**Three-col layout** `lg:grid-cols-[16rem_1fr_18rem]` leaves ~750px to the middle column at 1440×900. Inside, `xl:grid-cols-4` gives **124px per metric card** while content needs **162–219px**.

**Live measurements** at viewport 1440×900 on `/compositions/dashboard`:

| KPI | clientWidth (px) | scrollWidth (px) | overflow |
|---|---|---|---|
| Active projects | 124 | 162 | 38 |
| Requests/min | 124 | 170 | 46 |
| P95 latency | 124 | **219** | 95 |
| Error rate | 124 | 178 | 54 |

**Symptom**: labels "ACTIVE PROJECTS", "REQUEST / MIN", "P95 LATENCY", "ERROR RATE" wrap mid-word; the `+6 wk` Badge collides with the `text-display` value.

**Fix scope**: C.W2.B — `grid-cols-2 2xl:grid-cols-4`; `min-w-0` on each Card; terse labels ("Active", "Reqs/min", "p95", "Error rate"); `tracking-wider` → `tracking-wide`.

## §6. StoryPager visually wrong — full-width with no surface

**Live measurement**: `pager 1358×?, BouncyToggle 864×864 with overflow-x:auto` — horizontal scroll already works, but the pager spans the full main column (1358px) regardless of story count. Sparse categories leave 800px of empty pill; dense categories (Primitives: 16 stories) are wide but uncontained.

**Required behaviour (per user)**: a centred GlassDock pill clamped to a reasonable max-width with internal horizontal scroll when stories overflow.

**Fix scope**: C.W2.A — replace `<BouncyTabs>` with `<GlassDock orientation="horizontal" always-expanded fit-content>`; add `@utility dock-tab-btn`; `max-width: min(80vw, 56rem)`; `overflow-x-auto scrollbar-hidden` on the dock surface.

## §7. Aurora playground has 14 uncommitted modified files (broader than initially measured)

**git status -s during C.W0**: 11 file renames (`demo/stories/compositions/aurora/` → `demo/stories/aurora/`), 8 src/ aurora content edits, 5 demo/ infrastructure mods (StoryPage, StoryPager, CategoryRail, router, manifest, useStoryNavigation), 2 untracked (AuroraStage.vue, configSource.ts), 1 unrelated (ExpandableContainer).

**Action**: review + commit (or revert). User work; don't trample. Resolved in C.W3.D.

## §8. Dark-mode + reduced-motion sweep never ran

No `demo/.qa/screenshots/` directory. Phase 2's planned sweep was deferred. Resolved in C.W4.A.

## §9. Consumer build smoke never ran

No record of `npm run build` runs in `../fourier-analysis/web`, `../words/frontend`, `../bbnf-lang/playground`. Resolved in C.W4.A.

---

## Smaller observations (folded into the relevant waves)

### math-paper floating "S"
`demo/stories/compositions/math-paper.vue:37-40` puts a `.fourier-f` span inside flowing prose. The utility (`typography.css:242-251`) sets `1.35em` + `display: inline-block` + `weight 700`. Combined with the wrapping span's `style="font-size: 1.15em"`, the glyph compounds to ~1.55em and wraps to its own visual line, leaving "S" floating mid-paragraph and "ₙ" stranded. Fix: drop `.fourier-f` from inline prose contexts (it's intended for hero glyphs); pick one source of size truth or render `Sₙ` as a tight `<i>` block. Resolved in C.W3.A.

### Aurora preset row clips on right edge
`demo/stories/compositions/aurora-playground.vue` (now `demo/stories/aurora.vue` post-rename) preset row scrolls horizontally with no affordance. Fix: edge fade-mask via `mask-image: linear-gradient(...)`. Resolved in C.W3.B.

### StoryPager edge-to-edge at 16 stories
At `/primitives/buttons` the BouncyTabs strip uses 1326/1358 of main-column width — no gutter. Solved by C.W2.A (clamping into a `max-w-[min(80vw,56rem)]` GlassDock).

### Configurator preset binding is awkward
`Configurator.vue:150`: `@update:model-value="(v) => { if (v) presetModel = v as string; }"` should call `cfg.setPreset(...)` directly. Currently the setter on `presetModel` (a computed) does the right thing eventually, but the chain is awkward. Resolved in C.W3.C.

### Rail max-height — robustness gap
8 categories + brand fits 414px in 900px viewport — passes today. But not robust to small viewports or future category growth. Inner pill should `overflow-y-auto scrollbar-hidden max-h-[calc(100vh-2rem)]`. Resolved in C.W2.C.

### Favicon 404
Only console noise on otherwise-clean routes. Fix: `<link rel="icon" href="data:,">` in `index.html`. Resolved in C.W3.D.

---

## Summary

Six concrete defects (§1–§6) + three architectural smells (§7–§9) + five smaller observations. Every defect maps to exactly one C sub-phase. No silent deferrals — anything that doesn't land in C lands in D explicitly.
