# Lane L—10-1 A-3-CLASS layering, 10-5 `text-caption` italic retired

**Seat** implement · **model** `claude-opus-5-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a4668a47-faa/agent-ac9efe9107cb94d37.jsonl`,
the `"model"` field, 4/4 turns; the file was found by grepping the workflows tree for the phrase
`LANE L · rows 10-1 (A-3-CLASS layering)`, unique to this lane's prompt; matched against
`claude-opus-5*`) · **date** 2026-09-22 · **base** `master` @ `695d4925` · **ruling of record**
`docs/tranches/BK/execution/2026-09-22-register-wave/RULINGS.md` §1 10-1, 10-5, §3 lane L, with
the O-20 LEDGER §A-3-CLASS (+ its 2026-09-18 O-26 R-1 scope note) and O-26 LEDGER R-1/R-12 as
grounds.

What the `&&` gated, per seat (read back from each seat's own transcript):
- **Seat 1** (`agent-ac9efe9107cb94d37.jsonl`): `echo claude-opus-5-5 | grep -q '^claude-opus-5' && echo OK;`
  at the head of the step-0 command. The `&&` gated `echo OK` only; the rest of that command and
  every later command were joined by `;` or run separately, so they ran ungated.
- **Seat 2** (`agent-ac8684453263e61e5.jsonl`): no `&&`-gated command. The id was asserted by
  reading the transcript; nothing was gated on it.
- **Cure seat 1** (`agent-afc764e1024c250ec.jsonl`, `claude-opus-5-5`, the `"model"` field, 2/2
  turns at first read; found by grepping for this seat's own prompt phrase `YOU ARE THE CURE SEAT
  (Opus). Apply EVERY cureList item in …/L-adjudication-1.json`): `echo claude-opus-5-5 | grep -q
  '^claude-opus-5' && echo MODEL-OK && python3 …` gated the first read of the adjudication. Later
  writes ran after the id was established and were not individually gated.

## Step-0 baseline

`git status --short` at first byte: empty (clean tree at `695d4925`; other lanes not yet landed).


## 10-1 · A-3-CLASS

> RULINGS §1 10-1: "Every top-level style rule reachable from both CSS export roots … sits inside
> `@layer components` — `.css` files AND SFC `<style scoped>` blocks … the datum is 'every
> unlayered top-level rule', never a number."

### (1) MEASURE—the walker is the gate's own code

The instrument is `unlayeredRules` + `sfcStyleBlocks` in `tests/gates/orphan-css-partial.test.ts`,
run over the host gate's own reach union: `importClosure(declaredCssRoots(package.json))` ∪
`rescuedReferences(…)` (the `<style src=` / `import ".css"` channel, reach-gated) for the `.css`
half, plus every inline `<style>` block of every `.vue` in `publicJsReach()` (they ship in
`dist/glass-ui.css`, which `./styles` folds in and `./styles.css` imports last). `./styles.css`
→ `dist/component-styles.css` is `@import`s of three reachable partials (`track-well.css`,
`glass/value-marks.css`, `glass/track-flow.css`) plus `glass-ui.css` (measured on the dist
built at HEAD), so both export roots are inside this union.

The walker is a brace/quote/paren-aware scanner, not a regex over depth 0: a style rule counts
at its outermost position (its nested rules ride with it); `@media`/`@supports`/`@container`/
`@scope`/`@starting-style` pass the enclosing layer state through (a group does not layer what
it holds—this is why the O-20 depth-0 census undercounted: rules inside a top-level `@media`
are unlayered top-level rules); an `@layer` block layers its body; `@utility`/`@theme`/
`@property`/`@font-face`/`@keyframes` are allowlisted (seat 1 also listed `@custom-variant`/
`@variant`; cure round 1 struck both per the adjudicator's LcA-3: the ruling never names them,
and a block `@variant` emits unlayered rules); any OTHER block at-rule is reported, so a new
wrapper cannot hide a rule.

Raw set at `695d4925` (no allowlist beyond the at-rules): **547** rules. Allowlisted out:
the token roots—**34** rules whose selector list is `:root` or `.dark` and whose every
declaration is a custom property, `color-scheme` or `accent-color` (the content test is cure
round 1's, LcA-2; all 34 pass it, so the count stands) (32 `:root` across
`tokens/*`, `typography/scale.css`, `glass/a11y-fallback.css` ×3, `paper.css` ×2,
`scroll-chrome.css`, `scroll-choreography.css`, `configurator/styles.css`,
`dock/styles/density.css`; 2 `.dark`—`tokens/dark-arm.css`, `tokens/property-regs-specular.css`;
the `:root` in `tokens/scheme-motion.css` carries `color-scheme`/`accent-color` beside its tokens)—and
the named exception `src/components/slider/styles.css` (**47**). The `.dark` half of the
allowlist is this lane's reading of "token `:root`": `.dark` sits on the same element, so
layering it alone would invert the pair (an unlayered `:root` token beats a layered `.dark`
one); likewise a token override inside `@media` must stay beside its unlayered base. Lane T's
three files (`color-radius.css`, `light-dark.css`, `dark-arm.css`—the ramp copy) carry ONLY
token-root rules, so nothing in them is in the set and Lane T's fence is not crossed.

**The measured set: 466 unlayered top-level style rules in 48 files** (32 `.css`, 16 `.vue`;
SFC selectors are listed as authored—scoped blocks ship them with a `[data-v-…]` suffix). The
O-20 figures (351, 354, 471, 604) are all superseded; this one is not carried either—the set
below is the datum.

#### THE MANIFEST (for Lane R → MIGRATION §10.0.0), by file and selector

- `src/components/_shared/disclosure/disclosure.css` (4): `.disclosure-content` · `.disclosure-icon` · `.disclosure-item` · `.disclosure-trigger:focus-visible`
- `src/components/_shared/menu/menu.css` (1): `.glass-menu-row`
- `src/components/aurora/Aurora.vue` (10): `.aurora-root` · `.aurora-root > .aurora-placeholder, .aurora-root > .aurora-canvas-layer` · `.aurora-root > .aurora-placeholder` · `.aurora-placeholder` · `.aurora-canvas-layer` · `.aurora-canvas-layer--armed` · `.aurora-canvas-layer` · `.aurora-root` · `.aurora-root > .aurora-canvas-layer` · `.aurora-placeholder`
- `src/components/avatar/styles.css` (11): `.avatar` · `.avatar[data-size="md"]` · `.avatar[data-size="lg"]` · `.avatar__identity, .avatar__image, .avatar__fallback` · `.avatar__identity` · `.avatar__image, .avatar__fallback` · `.avatar__image` · `.avatar__fallback` · `.avatar[data-size="md"] .avatar__fallback` · `.avatar[data-size="lg"] .avatar__fallback` · `.avatar__status`
- `src/components/blob/Blob.vue` (7): `.goo-blob-wrapper` · `.goo-blob-wrapper:hover` · `.goo-blob-canvas` · `.goo-blob-hit` · `.goo-blob-hit:focus-visible` · `.goo-blob-hit:disabled` · `.goo-blob-wrapper`
- `src/components/command/styles.css` (16): `.command` · `.command-dialog__content` · `.command__input-wrapper` · `.command__input-icon` · `.command-dialog__content .command__input-icon, .command-dialog__content .command__item > svg` · `.command__input` · `.command-dialog__content .command__input` · `.command__input::placeholder` · `.command__input:disabled` · `.command__list` · `.command__group` · `.command__group-label` · `.command__item[data-disabled]` · `.command__empty` · `.command__separator` · `.command__shortcut`
- `src/components/configurator/ConfiguratorLayer.vue` (2): `.configurator-layer-region` · `.configurator-layer-region`
- `src/components/configurator/ConfiguratorRow.vue` (6): `.configurator-row[data-size="sm"]` · `.configurator-row[data-size="md"]` · `.configurator-row[data-size="lg"]` · `.configurator-row` · `.configurator-row` · `.configurator-row`
- `src/components/configurator/styles.css` (42): `.configurator-shell` · `.configurator > .configurator-presets, .configurator > .configurator-aside` · `.configurator-section-label` · `.configurator-presets` · `.configurator-presets .configurator-gallery-track, .configurator-presets [role="group"]` · `.configurator-layer` · `.configurator-layer:has(+ .configurator-layer)` · `.configurator-layer + .configurator-layer` · `.configurator-layer-trigger` · `.configurator-layer-body` · `[data-slot="configurator-reset"]:hover` · `.configurator-layer-trigger:hover` · `.configurator-layer-body[data-dividers] > * + *` · `.configurator-aside, .configurator-presets, .configurator-footer` · `[data-slot="configurator"] > [data-gallery-dock]` · `[data-slot="configurator"] > .configurator-stage` · `[data-slot="configurator"] > .configurator-aside` · `[data-slot="configurator"]` · `[data-slot="configurator"][data-gallery="aside"] > [data-gallery-dock]` · `[data-slot="configurator"][data-gallery="aside"] > .configurator-stage` · `[data-slot="configurator"][data-gallery="aside"] > .configurator-aside` · `[data-slot="configurator"][data-gallery="top"] > [data-gallery-dock]` · `[data-slot="configurator"][data-gallery="top"] > .configurator-stage` · `[data-slot="configurator"][data-gallery="top"] > .configurator-aside` · `[data-slot="configurator"] > .configurator-aside` · `[data-slot="configurator"][data-aside-side="left"] > .configurator-aside` · `[data-slot="configurator"] > [data-gallery-dock]` · `[data-slot="configurator"][data-gallery="aside"] > [data-gallery-dock]` · `[data-slot="configurator"][data-gallery="top"] > [data-gallery-dock]` · `.configurator-preset-tile` · `[data-slot="configurator"][data-gallery="top"] .configurator-preset-tile` · `.configurator-preset-well` · `.configurator-preset-well.is-loading` · `.configurator-preset-well.is-loading` · `.configurator-preset-tile.is-active` · `.configurator-preset-chip` · `.configurator-preset-chip.is-active` · `[data-slot="configurator"][data-aside-side="left"] > .configurator-stage` · `[data-slot="configurator"][data-aside-side="left"] > .configurator-aside` · `[data-slot="configurator"][data-aside-side="left"][data-gallery="aside"] > [data-gallery-dock]` · `.configurator-expand-host[data-state="expanded"] > [data-part="panel"]` · `.configurator-expand-host[data-state="expanded"] .configurator-shell`
- `src/components/constellation/Constellation.vue` (4): `.constellation` · `.constellation[role="button"]:focus-visible` · `:where(.constellation)` · `.constellation-canvas`
- `src/components/dark-mode-toggle/dark-mode-toggle.css` (1): `.dark-mode-toggle-button, .dark-mode-toggle-button .toggle-sun, .dark-mode-toggle-button .toggle-circle`
- `src/components/data-table/styles.css` (19): `.data-table` · `.data-table-cards` · `.data-table-card, .data-table-state` · `.data-table-state` · `.data-table-card-skeleton-title` · `.data-table-cell-skeleton` · `.data-table-action-skeleton` · `.data-table-card-header` · `.data-table-card-title, .data-table-card-value` · `.data-table-card-title` · `.data-table-card-fields` · `.data-table-card-label, .data-table-header-row` · `.data-table-actions, .data-table-actions-cell` · `.data-table-sort` · `.data-table [data-align="center"]` · `.data-table [data-align="right"]` · `.data-table-row-interactive` · `.data-table-row-interactive:hover, .data-table-row-interactive[data-state="selected"]` · `.data-table-card.data-table-row-interactive[data-state="selected"]`
- `src/components/deck/styles/capture.css` (10): `@page` · `html, body` · `html, body, #app` · `.deck-stage` · `.deck-strip` · `.deck-ground` · `.deck-slide` · `.deck-slide::before, .deck-slide::after` · `.deck-slide:not(:last-child)` · `.deck-stage .sr-only`
- `src/components/dialog/styles.css` (15): `:where([data-slot="dialog-content"])` · `:where([data-slot="dialog-header"])` · `:where([data-slot="dialog-content"]:has([data-slot="dialog-close"])) :where([data-slot="dialog-header"])` · `:where([data-slot="dialog-title"])` · `:where([data-slot="dialog-description"])` · `:where([data-slot="dialog-footer"])` · `:where([data-slot="dialog-close"])` · `:where([data-slot="dialog-close"])::before` · `:where([data-slot="dialog-close"]):hover::before` · `:where([data-slot="dialog-close"]):active::before` · `:where([data-slot="dialog-close"]):focus-visible` · `:where([data-slot="dialog-content"][data-rebuff])` · `:where([data-slot="dialog-content"][data-rebuff="a"])` · `:where([data-slot="dialog-content"][data-rebuff="b"])` · `:where([data-slot="dialog-content"][data-rebuff])`
- `src/components/expandable-container/styles.css` (14): `.expandable-container` · `.expandable-container[data-state="expanded"]` · `.expandable-container[data-state="expanded"] > [data-part="panel"]` · `.expandable-container__chrome` · `.expandable-container__chrome[hidden]` · `.expandable-container [data-part="trigger"]` · `.expandable-container [data-part="trigger"][data-position="left"]` · `.expandable-container [data-part="trigger"][data-position="right"]` · `.expandable-container [data-part="trigger"]:hover` · `.expandable-container [data-part="trigger"]:focus-visible` · `.expandable-container[data-state="expanded"] [data-part="panel"]` · `.expandable-container__icon` · `.expandable-container [data-part="trigger"]` · `.expandable-container[data-state="expanded"] > [data-part="panel"]`
- `src/components/fourier-field/FourierField.vue` (3): `.fourier-field` · `.fourier-field--interactive` · `.fourier-field-canvas`
- `src/components/handmark/HandMark.vue` (10): `.hm` · `.hm del` · `.hm mark` · `.hm-mark` · `.hm[data-shape="highlight"] .hm-mark` · `.hm-mark--settling` · `.hm-ink` · `.hm-mark` · `.hm-mark--settling` · `.hm-ink`
- `src/components/label/Label.vue` (3): `.label` · `.label[data-disabled]` · `.label-requirement`
- `src/components/labeled-field/LabeledField.vue` (8): `.labeled-field, .labeled-field-copy, .labeled-field-control` · `.labeled-field` · `.labeled-field-copy, .labeled-field-control` · `.labeled-field-description, .labeled-field-error` · `.labeled-field-description` · `.labeled-field-error` · `.labeled-field[data-layout="horizontal"]` · `.labeled-field[data-layout="horizontal"]`
- `src/components/pager-dots/PagerDots.vue` (20): `.pager-dots` · `.pager-bed-layer` · `.pager-dots[data-orientation="vertical"] .pager-bed-layer` · `.goo-dot` · `.pager-dots[data-orientation="vertical"] .goo-dot` · `.goo-dot[data-flip]` · `.goo-dot::before` · `.goo-dot[data-edge]::before` · `.pager-worm-layer` · `.goo-body, .goo-neck` · `.pager-dots[data-orientation="vertical"] .goo-body, .pager-dots[data-orientation="vertical"] .goo-neck` · `.goo-body` · `.pager-dots[data-orientation="vertical"] .goo-body` · `.goo-neck` · `.pager-dot` · `.goo-dot[data-hover]::before` · `.goo-dot[data-press]::before` · `.pager-dots` · `.goo-body, .goo-neck` · `.goo-dot`
- `src/components/progress/Progress.vue` (15): `.progress-rail` · `.progress-rail[data-size="sm"]` · `.progress-rail[data-size="md"]` · `.progress-rail[data-size="lg"]` · `.progress-rail[data-size="md"]` · `.progress-rail[data-size="lg"]` · `.progress-rail[data-orientation="vertical"]` · `.progress-rail[data-status="error"]` · `.progress-value-fill` · `.progress-rail:dir(rtl) .progress-value-fill` · `.progress-rail[data-orientation="vertical"] .progress-value-fill` · `.progress-liquid-fill` · `.progress-rail[data-state="complete"] .progress-value-fill` · `.progress-value-fill` · `.progress-rail[data-state="complete"] .progress-value-fill`
- `src/components/scroll-progress-rim/styles.css` (9): `.scroll-progress-rim` · `.scroll-progress-rim__track` · `.scroll-progress-rim[data-orientation="horizontal"] .scroll-progress-rim__track` · `.scroll-progress-rim[data-orientation="vertical"] .scroll-progress-rim__track` · `.scroll-progress-rim__fill` · `.scroll-progress-rim[data-orientation="horizontal"] .scroll-progress-rim__fill` · `.scroll-progress-rim[data-orientation="horizontal"]:dir(rtl) .scroll-progress-rim__fill` · `.scroll-progress-rim[data-orientation="vertical"] .scroll-progress-rim__fill` · `.scroll-progress-rim__fill`
- `src/components/separator/Separator.vue` (10): `.separator, .separator-segment` · `.separator[data-orientation="horizontal"]` · `.separator[data-orientation="vertical"]` · `.separator-labelled` · `.separator-labelled[data-orientation="horizontal"]` · `.separator-labelled[data-orientation="vertical"]` · `.separator-segment` · `[data-orientation="horizontal"] > .separator-segment` · `[data-orientation="vertical"] > .separator-segment` · `.separator-label`
- `src/components/sheet/styles.css` (46): `:where([data-slot="sheet-content"])` · `:where([data-slot="sheet-content"][data-detents])` · `:where([data-slot="sheet-content"][data-modal="false"])` · `:where( [data-slot="sheet-content"][data-detents] > [data-slot="sheet-detent-handle"], [data-slot="sheet-content"][data-detents] [data-slot="dialog-header"] )` · `:where([data-slot="sheet-content"][data-dragging])` · `:where([data-slot="sheet-content"] > [data-slot="sheet-content-region"])` · `:where([data-slot="sheet-content"][data-scroll] > [data-slot="sheet-content-region"])` · `:where( [data-slot="sheet-content"][data-side="left"]:not([data-detents]) > [data-slot="sheet-content-region"], [data-slot="sheet-content"][data-side="right"]:not([data-detents]) > [data-slot="sheet-content-region"] )` · `:where( [data-slot="sheet-content"][data-side="left"] > [data-slot="sheet-content-region"] > :only-child, [data-slot="sheet-content"][data-side="right"] > [data-slot="sheet-content-region"] > :only-child )` · `:where([data-slot="sheet-content"][data-detents] > [data-slot="sheet-content-region"])` · `:where( [data-slot="sheet-content"][data-detents] > [data-slot="sheet-content-region"] > :not([data-slot="dialog-header"]):not([data-slot="dialog-footer"]) )` · `:where( [data-slot="sheet-content"][data-detents] > [data-slot="sheet-content-region"] > [data-slot="dialog-header"] )` · `:where( [data-slot="sheet-content"][data-detents] > [data-slot="sheet-content-region"] > [data-slot="dialog-footer"] )` · `:where([data-slot="sheet-content"]:not([data-detents]):has([data-slot="dialog-close"])) :where([data-slot="dialog-header"])` · `:where([data-slot="sheet-content"][data-detents] > [data-slot="sheet-detent-handle"])` · `:where([data-slot="sheet-detent-handle"] > [data-slot="sheet-detent-grip"])` · `:where([data-slot="sheet-detent-handle"]:hover > [data-slot="sheet-detent-grip"])` · `:where([data-slot="sheet-detent-handle"]:focus-visible)` · `:where( [data-slot="sheet-detent-handle"]:focus-visible > [data-slot="sheet-detent-grip"], [data-slot="sheet-content"][data-dragging] [data-slot="sheet-detent-grip"] )` · `:where( [data-slot="sheet-detent-handle"]:focus-visible > [data-slot="sheet-detent-grip"] )` · `:where([data-slot="sheet-detent-grip"])` · `:where([data-slot="sheet-content"])` · `:where([data-slot="sheet-content"][data-surface="glass"])` · `:where([data-slot="glass-graded-halo"])` · `:where([data-slot="glass-graded-halo"][data-modal="false"])` · `:where([data-slot="glass-graded-halo"][data-side="top"])` · `:where([data-slot="glass-graded-halo"][data-side="bottom"])` · `:where([data-slot="glass-graded-halo"][data-side="left"])` · `:where([data-slot="glass-graded-halo"][data-side="right"])` · `:where([data-slot="glass-graded-halo"][data-detents][data-side="bottom"])` · `:where([data-slot="glass-graded-halo"][data-detents][data-side="top"])` · `:where([data-slot="glass-graded-halo"][data-detents][data-side="left"])` · `:where([data-slot="glass-graded-halo"][data-detents][data-side="right"])` · `:where([data-slot="glass-graded-halo"])` · `:where([data-slot="sheet-content"][data-side="top"])` · `:where([data-slot="sheet-content"][data-side="bottom"])` · `:where([data-slot="sheet-content"][data-side="left"])` · `:where([data-slot="sheet-content"][data-side="right"])` · `:where([data-slot="sheet-content"][data-side="left"]), :where([data-slot="sheet-content"][data-side="right"])` · `:where( [data-slot="sheet-content"][data-detents][data-side="bottom"], [data-slot="sheet-content"][data-detents][data-side="top"] )` · `:where( [data-slot="sheet-content"][data-detents][data-side="left"], [data-slot="sheet-content"][data-detents][data-side="right"] )` · `:where([data-slot="sheet-content"])` · `:where([data-slot="sheet-content"][data-side="top"])` · `:where([data-slot="sheet-content"][data-side="bottom"])` · `:where([data-slot="sheet-content"][data-side="left"])` · `:where([data-slot="sheet-content"][data-side="right"])`
- `src/components/skeleton/Skeleton.vue` (3): `.skeleton` · `.skeleton` · `.skeleton`
- `src/components/status-dot/StatusDot.vue` (32): `.status-dot` · `.status-dot[data-size="md"]` · `.status-dot[data-size="lg"]` · `.feedback-mark` · `.feedback-mark::before, .feedback-mark::after` · `.feedback-mark::before` · `.feedback-mark::after` · `.feedback-mark[data-state="unknown"]` · `.feedback-mark[data-state="idle"]` · `.feedback-mark[data-state="idle"]::before` · `.feedback-mark[data-state="idle"]::after` · `.feedback-mark[data-state="success"]` · `.feedback-mark[data-state="success"]::before` · `.feedback-mark[data-state="success"]::after` · `.feedback-mark[data-state="warning"]` · `.feedback-mark[data-state="warning"]::before` · `.feedback-mark[data-state="warning"]::after` · `.feedback-mark[data-state="error"]` · `.feedback-mark[data-state="error"]::before` · `.feedback-mark[data-state="error"]::after` · `.feedback-mark[data-state="online"]` · `.feedback-mark[data-state="online"]::before` · `.feedback-mark[data-state="online"]::after` · `.feedback-mark[data-state="active"]` · `.feedback-mark[data-state="active"]::before` · `.feedback-mark[data-state="active"]::after` · `.feedback-mark[data-state="active"][data-motion]::after` · `.feedback-mark[data-state="active"][data-motion]::after` · `.feedback-mark` · `.feedback-mark::before` · `.feedback-mark[data-state="unknown"]::after` · `.feedback-mark[data-state="active"]::after, .feedback-mark[data-state="online"]::after`
- `src/components/tabs/styles/drag.css` (4): `.glass-drag-grabbable` · `.glass-drag-lift` · `.segmented-tabs:has(.segmented-indicator.glass-drag-grabbable) .segmented-tab[data-active]` · `.segmented-indicator.glass-drag-lift`
- `src/components/tabs/styles/segmented.css` (23): `.segmented-tabs` · `.segmented-tabs--vertical` · `.segmented-tabs--vertical .segmented-indicator` · `.segmented-tabs` · `.segmented-indicator` · `.segmented-tabs--vertical .segmented-indicator` · `.segmented-tabs--underline .segmented-indicator` · `.segmented-tabs--underline.segmented-tabs--vertical .segmented-indicator` · `.segmented-tabs:not(.segmented-tabs--underline)` · `.segmented-tabs:not(.segmented-tabs--underline) .segmented-indicator` · `.segmented-tabs[data-eyeglass-wake]:not(.segmented-tabs--underline)` · `.segmented-tabs[data-eyeglass-wake]:not(.segmented-tabs--underline) .segmented-indicator` · `.segmented-indicator[data-eyeglass-clamped]` · `.segmented-indicator--js` · `.segmented-tab` · `.segmented-tab` · `.segmented-tab[data-active]` · `.segmented-tab.is-disabled` · `.segmented-tabs--underline` · `.segmented-tabs--underline.segmented-tabs--vertical` · `.segmented-tabs--underline .segmented-tab` · `.segmented-tabs--underline.segmented-tabs--vertical .segmented-tab` · `.segmented-tabs--underline .segmented-tab:hover`
- `src/components/timeline/Timeline.vue` (28): `.tl` · `.tl__track, .tl__marks` · `.tl__track` · `.tl__marks` · `.tl__mark-seat` · `.tl__mark-seat > *` · `.tl__span` · `.tl__fill` · `.tl__track[data-advancing] .tl__fill` · `.tl__cap` · `.tl .track-flow` · `.tl__mark` · `.tl__marks` · `.tl__mark` · `.tl__mark:focus-visible` · `.tl__disc` · `.tl__mark[data-crossing] .tl__disc` · `.tl__mark[data-state="active"] .tl__disc` · `.tl__mark[data-state="completed"] .tl__disc` · `.tl__mark[aria-current="step"] .tl__disc` · `.tl__check` · `.tl__check path` · `.tl__mark:hover .tl__disc` · `.tl__mark[data-state="completed"]:hover .tl__disc` · `.tl__detail` · `.tl__check path` · `.tl__detail` · `.tl__mark:hover .tl__disc`
- `src/components/typewriter/TypewriterText.vue` (7): `.tw-root` · `.tw-reserve` · `.tw-visual` · `.tw-tail` · `.tw-cursor` · `.tw-cursor--blink` · `.tw-cursor--blink`
- `src/styles/accessibility.css` (4): `:is( [aria-current]:not([aria-current="false"]), [aria-selected="true"], [aria-pressed="true"], [aria-checked="true"], [data-state="checked"], [data-state="on"] )` · `:is([aria-invalid="true"], :user-invalid)` · `:is( [aria-current]:not([aria-current="false"]), [aria-selected="true"], [aria-pressed="true"], [aria-checked="true"], [data-state="checked"], [data-state="on"] )` · `:is([aria-invalid="true"], :user-invalid)`
- `src/styles/animations.css` (5): `.glass-top-layer[popover], dialog.glass-top-layer` · `.glass-top-layer[popover]:popover-open, dialog.glass-top-layer[open]` · `dialog.glass-top-layer::backdrop` · `dialog.glass-top-layer[open]::backdrop` · `.glass-top-layer[popover], dialog.glass-top-layer`
- `src/styles/glass-specular-track.css` (2): `.glass-wash::before, .glass-quiet::before, .glass-resting::before, .glass-floating::before, .glass-overlay::before, .glass-card::before, .dock-icon-button::before, .dock-tab-button::before, .dock-select-trigger::before, .dock-dropdown-trigger::before, .glass-specular-track::before` · `.glass-wash::before, .glass-quiet::before, .glass-resting::before, .glass-floating::before, .glass-overlay::before, .glass-card::before, .dock-icon-button::before, .dock-tab-button::before, .dock-select-trigger::before, .dock-dropdown-trigger::before, .glass-specular-track::before`
- `src/styles/glass/a11y-fallback.css` (3): `.glass-wash, .glass-quiet, .glass-resting, .glass-floating, .glass-overlay, .glass-card` · `.glass-floating, .glass-overlay` · `.glass-wash::before, .glass-quiet::before, .glass-resting::before, .glass-floating::before, .glass-overlay::before, .glass-card::before`
- `src/styles/glass/dissolve.css` (1): `.glass-corner-affordance::after`
- `src/styles/glass/focus-veil.css` (1): `.glass-focus-veil`
- `src/styles/glass/reveal.css` (2): `.glass-reveal` · `.glass-reveal[data-state="closed"]`
- `src/styles/paper.css` (5): `:where(.dark) .paper-underpaint, .dark .paper-underpaint` · `:where(.dark) .paper-grain-overlay::after, .dark .paper-grain-overlay::after` · `.paper-underpaint, .paper-grain-overlay::after` · `.paper-underpaint` · `.paper-underpaint, .paper-grain-overlay::after`
- `src/styles/scroll-choreography.css` (5): `.scroll-cascade > *` · `.scroll-cascade.scroll-cascade--inline > *` · `.scroll-cascade.scroll-cascade--columns > *` · `.scroll-cascade.scroll-cascade--columns > *:nth-child(even)` · `.smooth-scroll`
- `src/styles/scroll-chrome.css` (3): `.scroll-chrome` · `.scroll-chrome` · `.scroll-chrome--native`
- `src/styles/scroll-driven.css` (4): `.scroll-progress` · `.scroll-progress` · `[data-scroll-reveal] > *` · `[data-scroll-reveal].scroll-reveal--inline > *`
- `src/styles/tokens/dark-arm-glass.css` (1): `.dark .glass-deep`
- `src/styles/tokens/scheme-motion.css` (4): `.liquid-stage` · `:where([data-reorder], [data-autoplay])` · `:where(.liquid-stage)` · `.motion-calm`
- `src/styles/typography/semantic.css` (1): `body`
- `src/styles/utilities/a11y-overrides.css` (4): `*, *::before, *::after` · `html.no-transition, html.no-transition *:not([data-allow-motion]), html.no-transition *:not([data-allow-motion])::before, html.no-transition *:not([data-allow-motion])::after` · `.focus-ring:focus-visible, .interactive-item:focus-visible, .dock-icon-button:focus-visible, .dock-tab-button:focus-visible, .dock-select-trigger:focus-visible, .dock-dropdown-trigger:focus-visible, .menu__trigger:focus-visible, .dark-mode-toggle-button:focus-visible, .field-control:focus-visible, .input-pill:focus, .input-pill:focus-visible` · `.hairline-accent, .glass-dock`
- `src/styles/utilities/responsive.css` (1): `[data-control-target]`
- `src/styles/view-transition.css` (36): `::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)` · `::view-transition-group(.gl-list-item)` · `::view-transition-old(root), ::view-transition-new(root)` · `html:active-view-transition-type(route, zoom, lateral, collapse)::view-transition-old(root), html:active-view-transition-type(route, zoom, lateral, collapse)::view-transition-new(root)` · `html:active-view-transition-type(route, zoom, lateral, collapse)::view-transition-old(root)` · `html:active-view-transition-type(route, zoom, lateral, collapse)::view-transition-new(root)` · `html:active-view-transition-type(route)::view-transition-old(root), html:active-view-transition-type(route)::view-transition-new(root)` · `html:active-view-transition-type(zoom, lateral)::view-transition-old(root), html:active-view-transition-type(zoom, lateral)::view-transition-new(root)` · `html:active-view-transition-type(collapse)::view-transition-old(root), html:active-view-transition-type(collapse)::view-transition-new(root)` · `html:active-view-transition-type(zoom)::view-transition-old(root)` · `html:active-view-transition-type(collapse)::view-transition-new(root)` · `html:active-view-transition-type(lateral)::view-transition-old(root)` · `html:active-view-transition-type(lateral)::view-transition-new(root)` · `::view-transition-group(gl-route-window)` · `html:active-view-transition-type(zoom)::view-transition-group(gl-route-window)` · `html:active-view-transition-type(lateral)::view-transition-group(gl-route-window)` · `html:active-view-transition-type(collapse)::view-transition-group(gl-route-window)` · `html:active-view-transition-type(zoom, lateral)::view-transition-old(gl-route-window), html:active-view-transition-type(zoom, lateral)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(zoom)::view-transition-old(gl-route-window), html:active-view-transition-type(zoom)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(lateral)::view-transition-old(gl-route-window), html:active-view-transition-type(lateral)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(zoom)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(lateral)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(zoom)::view-transition-old(gl-route-window)` · `html:active-view-transition-type(lateral)::view-transition-old(gl-route-window)` · `html:active-view-transition-type(collapse)::view-transition-old(gl-route-window)` · `html:active-view-transition-type(collapse)::view-transition-new(gl-route-window)` · `html:active-view-transition-type(zoom, lateral)::view-transition-old(gl-route-window):only-child` · `html:active-view-transition-type(zoom, lateral)::view-transition-new(gl-route-window):only-child` · `html:active-view-transition-type(collapse)::view-transition-old(gl-route-window):only-child` · `html:active-view-transition-type(collapse)::view-transition-new(gl-route-window):only-child` · `::view-transition-group(.gl-route-chrome), ::view-transition-old(.gl-route-chrome), ::view-transition-new(.gl-route-chrome)` · `html:active-view-transition-type(zoom, lateral, collapse)::view-transition-old(gl-route-label)` · `html:active-view-transition-type(zoom, lateral, collapse)::view-transition-new(gl-route-label)` · `::view-transition-new(.gl-list-item):only-child` · `::view-transition-old(.gl-list-item):only-child` · `::view-transition`
- `src/styles/viz-reveal.css` (1): `canvas[data-substrate-reveal]`

### FR-COB-8 / FR-COB-12—measured at `695d4925`

Found by name in `../value.js/docs/tranches/V/megatranche/registry/adjudicated/fr-CanvasOverlayButton.md`
(read-only): FR-COB-8 = "glass-ui ships its pre-compiled utilities UNLAYERED (components.css,
0 `@layer`, imported unconditionally at index.css ~:201), so every utility there structurally
outranks glass-ui's own `@layer components` accessibility resets"—the CLASS; FR-COB-12 = its
instance, "the shipped unlayered `active:scale-(--scale-press-btn)` rule … defeats the
`@layer components` reset (base.css:273-279)".

- **FR-COB-8—the utility-corpus mechanism is DEAD at HEAD.** `dist/styles/components.css`
  (built at HEAD) still carries 0 `@layer`, but the fold imports it
  `@import "./components.css" layer(components);` (`vite.utility-emit.ts:295-300`, VALUEJS-R D8-1,
  2026-07-03), so the corpus ranks inside `components` on the `./styles` path. What was LIVE of the class
  at HEAD is the set above: the a11y resets themselves were unlayered (`utilities/a11y-overrides.css`
  4, `accessibility.css` 4, `glass/a11y-fallback.css` 3—the PRM `*` duration reset, the
  forced-colors focus/silhouette rungs, the WHC plate edges) and 455 other unlayered rules beat
  every layered rule at any specificity. After 10-1 all of them rank in `components`.
- **FR-COB-12—the instance is DEAD at HEAD.** `scale-press-btn` occurs 0× in `src/`,
  `dist/styles/components.css` and `dist/glass-ui.css`; the only press-scale utility shipped is
  `.scale-\(--scale-press\)` with no `:active` arm. The PRM guard
  (`.tap-squish:not([data-press-armed]):active { scale: 1 }`, `utilities/base.css:334-341`) is
  layered and no unlayered `:active` scale rule outranks it except the slider lane's (the named
  exception, which carries its own three PRM `@media` arms, `slider/styles.css:213,328,495`).
  One observation, not a cascade defect and not this lane's to cure:
  `:where([data-slot="dialog-close"]):active::before { scale: var(--scale-press) }`
  (`dialog/styles.css:135-138`) has no PRM arm, so under PRM its squish is instantaneous (the
  `*::before` duration reset collapses the motion, not the scale). Recorded for the adjudicator.

### (2) THE GATE—an arm on `G-CSS-REACH-UNION`, born-RED

**Seat.** `tests/gates/orphan-css-partial.test.ts` is the executable of the roster row
`gate.css-reach.source-approx-no-orphan` (C20) and of the seat whose §B.5 charter reads "Every
`src/**/*.css` is reachable by `@import` closure or by SFC `<style src>`" (`G-CSS-REACH-UNION`,
WAVES.md:286; J-4 already seated `G-NO-DEAD-SELECTOR` on it as an arm). The A-3-CLASS
predicate is a property of every member of exactly that union, so it is an arm of that seat:
**seats +0**, nothing minted, `SEAT-BINDING.json` and `gate-register.mjs` untouched (the new
`it` carries no roster title; the bound registration `no src/ CSS partial is orphaned` is
unchanged). No other seat's charter names the reach union.

**The arm** (`tests/gates/orphan-css-partial.test.ts`, new `it` "every top-level style rule the
reach union ships sits inside an @layer"): `expect(unlayered.join("\n")).toBe("")`, where
`unlayered` is the walker over the union minus the allowlist—at-rules
`@utility`/`@theme`/`@property`/`@font-face`/`@keyframes` (cure round 1 struck `@custom-variant`/
`@variant`), the token roots `:root`/`.dark` (`SCHEME_ROOT` plus, from cure round 1, the content
test `isTokenRoot`: every declaration a custom property or one of the two named scheme
properties), and ONE named exception with grounds in the test
(`LAYER_EXCEPTIONS`: `src/components/slider/styles.css`, "unlayered on purpose",
`slider/styles.css:6-10`, O-20 §A-3-CLASS).

- RED on the old bytes: `Tests 1 failed | 7 passed (8)`—the diff prints the 466 rows of the
  manifest above, by file and selector (`scratchpad/regwave/L-gate-RED.log`).

## 10-5 · `text-caption` italic retired

> RULINGS §1 10-5: "`text-caption` … drops `font-style: italic` … `text-math`, `text-math-body` and
> `fourier-f` KEEP italic … a consumer who wants the old caption paint adds `italic` beside
> `text-caption`."

- **Edit.** `src/styles/typography/semantic.css` `@utility text-caption`—the one line
  `font-style: italic;` deleted (was `:228`); `font-family`, `font-size`, `line-height`,
  `font-weight: 400` untouched. `src/styles/typography/utilities.css` untouched (`text-math` :14-17,
  `text-math-body` :19-24, `fourier-f` :89-92 keep `font-style: italic`).
- **Witness.** `tests/styles/typography.test.ts` (the standing typography suite; no test read the
  utility's declarations before), new describe "italic is notation — the caption is upright, the
  math keeps its slant": `utilityBody(semantic, "text-caption")` keeps its size/leading/weight and
  `not.toMatch(/font-style/)`; `text-math`/`text-math-body`/`fourier-f` each
  `toMatch(/font-style:\s*italic/)`.
  - RED (old bytes): `Tests 1 failed | 5 passed (6)`—`expected '\n    font-family: var(--font-text);\…' not to match /font-style/` (`L-caption-RED.log`).
  - GREEN: `Tests 6 passed (6)` (`L-caption-GREEN.log`).
- **Rider.** `tests/components/chip.contract.test.ts:161-166` said "`text-caption` is italic, so
  it cannot stand in for a meta pill"—struck and bracketed (the `sm` rung still cannot stand in,
  on its pad and fluid size); assertions unchanged.
- **Residue / facts for Lane R.** In-house callers of `text-caption`: `src/` 1
  (`chip/chipVariants.ts:9`, the `sm` rung—paints upright now), plus the `--text-caption` bridge
  (`theme/bridges.css:31`, size only); `demo/` 36 lines in 17 story files. `cn()` buckets
  `text-caption` as `font-size` and `italic` as `font-style` (`_shared/class-names.ts:83-91`), so the
  MIGRATION recipe `class="text-caption italic"` survives `cn` merging. Measured on the demo build
  (paint probe below): the only paint delta 10-5 makes is `font-style: italic → normal` on
  `text-caption` elements and the descendants that inherit it.

## The paint probe—what the wrap moves, measured before any byte was committed

The gate proves every rule is layered; it cannot prove the layering is paint-neutral where it
should be. So the lane measured it. Two scratch copies of the tree (`src/ demo/ scripts/`,
the vite configs, `index.html`, `package.json`, `node_modules` symlinked; no `.claude/`), identical
except that `tree-before` has this lane's 48 `src/` files restored from `git show HEAD:<path>`—so
any other lane's in-flight bytes are in BOTH and cancel. Each built with
`vite build --config demo/vite.demo-dist.config.ts --outDir <scratch>`, served from a scratch static
server, crawled with headless Chromium (playwright 1.61.1, 1280×900): every route (`/`, 11
category landings, 94 stories), five modes via CDP `Emulation.setEmulatedMedia`—`light`, `dark`
(`.dark` + the storage key), `prm` (`prefers-reduced-motion: reduce`), `forced`
(`forced-colors: active`), `a11y` (`prefers-contrast: more` + `prefers-reduced-transparency:
reduce`). Per element and per `::before`/`::after`, 94 computed properties. BEFORE is loaded twice;
a property that differs between the two BEFORE loads is noise and is dropped, so a reported
delta is BEFORE-stable and AFTER-different. Script: `scratchpad/regwave/L-paint-diff.mjs`.

**Scope, stated so no reader over-reads a green (LcB-2).** Rounds 1-3 probed five modes at ONE
viewport, 1280×900: no `pointer: coarse`, no `print`, no narrow width. Round 4 (cure round 1,
`L-paint-diff4.mjs`) adds a sixth mode, `coarse` (`pointer: coarse` via CDP
`Emulation.setEmulatedMedia` features), which reaches the four coarse-media sites challenger B
listed (`glass/dissolve.css` G-COARSE-TARGET, `Timeline.vue:559`, `PagerDots.vue:588`,
`utilities/responsive.css:4` `[data-control-target]`), and keys each element by tag and child index instead of
its class list (the cure removes template classes, so a class-keyed path would read the cured
elements as new nodes). Still unprobed, and said so: `print` (the fifth site,
`deck/styles/capture.css:114` `@media print`, 10 rules incl. `@page` and 27 `!important`; and
`paper.css`'s print arms), widths below 1280 (the configurator's stacked
arm under 64rem of shell width is reached only where the demo's shell is narrow), `hover` state,
and any pseudo-element whose `content` is `none`.

The demo is the harshest consumer there is: its Tailwind build scans this package, so the
library's own template utilities land in the consumer's `@layer utilities`, which outranks
`components` at any specificity. That is also what every Tailwind consumer gets, because
`dist/styles/index.css` ends with `@source "../*.js"`.

## (3) THE CURE—as applied

- **Mechanism.** `scratchpad/regwave/L-wrap.py`, the gate's walker in Python: per file (per inline
  `<style>` block for an SFC), each maximal run of top-level items that need wrapping becomes one
  `@layer components { … }` in place, contents re-indented four spaces; a run breaks at any item
  that stays top-level (`@import`, an `@layer` statement or block, an allowlisted at-rule, a token
  root); a group at-rule whose children are ALL unlayered style rules is wrapped whole, a MIXED
  group (a token `:root` beside a paint rule under one `@media`) is recursed into so only its paint
  rules are wrapped; leading comments stay outside, interior comments move in. Source order is
  unchanged everywhere, so every rule keeps its position relative to every other rule; only its
  layer changes. Idempotent (a second pass over the wrapped tree changes 0 files). `@page` in
  `deck/styles/capture.css` (under `@media print`) is not on the allowlist, so it is wrapped with
  its siblings.
- **`menu.css`** (the ruling's named move): the `@media (prefers-reduced-motion: reduce)
  { .glass-menu-row { … } }` block moved INSIDE the first `@layer components` block, as its last
  member (was top-level at `:82-96`). Paint-equivalent: under PRM the `(0,3,0)` hover rule now
  outranks the `(0,1,0)` PRM row on `transition`, but the lift token the PRM row zeroes still
  applies and the universal PRM fallback zeroes every transition duration.
- **`./styles.css`.** `scripts/gen-component-styles.mjs` (the generator that writes
  `dist/component-styles.css`, the `./styles.css` target) prepends the `@layer` statement it reads
  from `src/styles/index.css`—`@layer theme, base, components, utilities;`, mirrored, not
  restated—before its four `@import`s; it throws if index.css declares none. Built:
  `dist/component-styles.css` line 1 is that statement.
  Witness: `tests/styles/typed-track-seam.test.ts`, new `it` "the generated manifest declares the
  layer order `./styles` declares, before any import" (dist-gated like its neighbour).
  - RED (dist built before the change): `Tests 1 failed | 30 skipped (31)`—`expected false to be true` (`L-manifest-RED.log`).
  - GREEN (after `npm run build` under the lock): `Tests 31 passed (31)` (`L-manifest-GREEN.log`).
- **Prose made false by the wrap, bracketed in place** (dated, struck, never deleted):
  `styles/track-well.css:32-37`, `styles/utilities/a11y-overrides.css:32-40`,
  `styles/glass/dissolve.css:250-265`, `styles/glass/reveal.css:268-273`,
  `components/command/styles.css:127-132`, `components/tabs/styles/drag.css:4`,
  `styles/index.css:246`, `components/avatar/styles.css:12-16`, `styles/transitions.css:8-11`;
cure round 1 adds `styles/glass/dissolve.css:231-236`, `components/configurator/styles.css`
(:10-18, :95-96, :119-121, :206-210, :263-265, :275-276, :358-359), `styles/paper.css:226-230`,
`components/configurator/Configurator.vue` (:224-228, :246-247, :315-318),
`components/configurator/ConfiguratorLayer.vue:90-91`, `components/configurator/ConfiguratorRow.vue:125-127`,
`components/timeline/Timeline.vue:529-533`, `tests/styles/spring-authority.test.ts:236-237`.
  Not bracketed, still true: `glass/grasp.css:51` (it speaks of a CONSUMER's scoped block, still
  unlayered), `sheet` import note (`:where()` "lets a consumer sizing utility still win"—false
  at HEAD, true now), the historical "used to" notes in `overlay-plate.css`, `offsets.css`,
  `menu.css:117`. NOT touched (`.vue`, layer-wrapping only): `Timeline.vue:529-530` ("Unlayered
  scoped") and `Skeleton.vue:56-60`—the first is false after the wrap and was left for the
  adjudicator, who authorized the bracket (LcA-5); cure round 1 applied it.

## (4) The consumer line

`<DialogContent class="rounded-dialog max-w-sm">`—scratch render on the two demo builds
(`scratchpad/regwave/L-dialog-line.mjs`: a `div[data-slot="dialog-content"].rounded-dialog.max-w-sm`
appended on `/foundations/radii`, where the demo's Tailwind emits `rounded-dialog`):

| build | `border-top-left-radius` | `max-width` | `--radius-dialog` |
| --- | --- | --- | --- |
| before (HEAD bytes) | **24px** (`:where([data-slot="dialog-content"])` → `--radius-3xl`, unlayered) | 384px | 16px |
| after (10-1) | **16px** (the consumer's `rounded-dialog` wins) | 384px | 16px |

### Round 1—the full wrap (all 466), 530 route×mode jobs, 0 load errors

Root deltas (a delta whose ancestors carry no delta; the hashed scoped-keyframe renames
`hm-settle-<hash>` and the inherited `font-style` of 10-5 set aside), sorted into five kinds:

**β—the library's OWN template utility now beats the library's OWN component rule.** At HEAD
the unlayered rule won and the utility was dead on arrival; layered, the utility (in the
consumer's `@layer utilities`) wins at any specificity. Regressions, every one:

| element | property: HEAD → wrapped | the rule | the utility that wins (template) |
| --- | --- | --- | --- |
| `.aurora-root` (every route—the shell field) | `display: grid → block`, `grid-template-columns → none`; the placeholder/canvas layers lose their shared cell | `Aurora.vue` scoped `.aurora-root` | `block`—`Aurora.vue:207` |
| `section.configurator` | `grid-template-columns 670px 400px → 541px 529px` (aurora), `→ 342/727` (blob), `→ 386/684` (fourier)—every slider, LabeledField and canvas aspect in the aside re-flows | `configurator/styles.css` | `grid-cols-1`—`Configurator.vue:225` |
| `.configurator-presets` | `padding-block 10px → 8px` | `configurator/styles.css` | `py-2`—`Configurator.vue:349` |
| `.configurator-aside` | `border-top-width 0 → 1px` | `configurator/styles.css` | `border-t`—`Configurator.vue:411` |
| `.configurator-layer` | `border-bottom-width 0 → 1px` | `configurator/styles.css` | `border`—`ConfiguratorLayer.vue:102` |
| ~~`.configurator-gallery-track`, the presets column~~ | ~~`gap 8px → 12px`~~ | | Re-attributed in cure round 1 (LcA-1(a)): the `gap-3` that wins sits on DEMO elements (`demo/stories/substrates/aurora/PresetPickerRow.vue:45,49`, `demo/stories/containers/configurator.vue:197`); `EasingPicker.vue:415` carries no `role="group"`. This row is α. The library's own `gap-2` (`Configurator.vue:364`) equals the token (8px): a duplicate source, removed. |
| `section.configurator` (`[data-slot="configurator"]`) | `grid-template-rows` (not in the probe's property list; found by reading, LcA-1(b)): the wide arm's `auto minmax(0, 1fr)` would lose | `configurator/styles.css:289` (`@container (inline-size >= 64rem)`) | `grid-rows-[auto_minmax(var(--configurator-stage-min,18rem),auto)_minmax(0,1fr)]`—`Configurator.vue:243` (emitted in both demo dists) |
| `label.label` in ConfiguratorRow | `font-size 14.19px → 16px`, `line-height 19.86 → 22.4px` | `Label.vue` scoped `.label` | `text-small`—`ConfiguratorRow.vue:133` (on `<Label>`) |
| `th.table-head` in DataTable | `text-align right → left` (numeric columns) | `data-table/styles.css` `.data-table [data-align="right"]` | `text-left`—`src/components/table/TableHead.vue:14` |

**γ—a library rule that overrides a library `@utility` now loses to it.** `paper.css`'s five
unlayered rules exist to override the `@utility paper-underpaint` / `paper-grain-overlay` registers
(its own comment, `paper.css:201-204`: "a components-layer rule cannot override a utilities-layer
one"). Wrapped: the dark arm dies (`mix-blend-mode screen → multiply` on every paper surface in
`dark`, 25+ elements) and the PRT arm dies (`opacity 0 → 0.21` under reduced transparency). A
census of every `@utility` name in `src/` (52) against every selector in the set finds exactly
these five rules and no other.

**α—a consumer's rule now beats the library's (the 10.0.0 intent, working).** All demo-authored
(plus the presets-column `gap 8px → 12px`, moved here from β in cure round 1):
`<Constellation class="absolute inset-0">` and `<Blob class="absolute inset-0">`
(`position relative → absolute`), `<CommandList class="max-h-80">` (`max-height 384 → 320px`),
`.section-preview-card` (demo) border colour under `forced-colors` (`CanvasText → LinkText`: the
demo's unlayered rule now beats the library's layered WHC edge; still a system colour), and under
PRM `animation-duration 0s → 0.01ms` on the landing tiles (the demo's unlayered
`animation: none !important` in `SectionPreviewCard.vue` now ranks BELOW the library's layered
`!important` PRM fallback—CSS Cascade L5 inverts important layers; `animation-name` stays
`none`, so nothing animates either way).

**ε—a library defect cured by the wrap.** `/data/sortable-list`: a disabled handle now shows
`cursor: not-allowed` (`sortable-list/styles.css` `.sortable-handle:disabled`, (0,2,0)) where the
unlayered `.glass-drag-grabbable { cursor: grab }` (drag.css, (0,1,0)) used to beat it.
`.glass-resting.ghost-slot` under `forced-colors`: `border-style solid → dashed` (the
`@utility ghost-slot` now beats the WHC edge's `solid`; the colour stays `CanvasText`)—recorded
as benign, not cured.

**Noise that survived the double-BEFORE filter:** `max-width` on `max-w-prose` / `ch`-sized
elements (`story-hero-title`, `story-header-blurb`, `card-description`) moving with no font-size
delta—font-load timing, it moves on unrelated routes in both directions; sub-pixel
`music-staff__line` opacity.

## THE STOP—rows that cannot be honoured on the bytes as found

The ruling says wrap; for β and γ the wrap is honoured only at the cost of a regression whose cure
lies OUTSIDE this lane's fence (β: a template edit in a `.vue` or `.ts`—this lane may only
layer-wrap inside a `.vue`; γ: moving an override INTO its `@utility` block, which is a
different cure from the one ruled). Per the lane law these are STOPPED, not improvised: the seven
files below are restored to their HEAD bytes (`git show HEAD:<path> >`), so they stay UNLAYERED
exactly as found, and the gate arm stays RED on precisely them.

**CURED in cure round 1** (the driver's 15:50 ruling in RULINGS 10-1's bracket delegated the per-site
list to the adjudicator; `L-adjudication-1.json` cureList 1-9 is that list, applied as below). Each
site removes the template utility that fought a sheet rule once both were layered, or folds the
override into the `@utility` it overrides; then the file is wrapped. Current paint is the intended
paint, so the witness is the round-4 probe (six modes, 636 jobs): the figure column is its result.

| site | the ruled edit | grounds | round-4 figure |
| --- | --- | --- | --- |
| `aurora/Aurora.vue` (10 rules) | `:207` `block` dropped from the `.aurora-root` class list; wrapped | the scoped `.aurora-root { display: grid }` (`:250-255` at HEAD) is the one source; `block` was dead at HEAD | no `.aurora-root` delta in any mode |
| `configurator/Configurator.vue` | `:225` `grid grid-cols-1` → `grid`; the `grid-rows-[…]` line (`:243` at HEAD) deleted; `:349` `py-2`, `:364` `gap-2`, `:411` `border-t` dropped (`:455` footer `border-t` untouched) | each fought a sheet declaration that is now its one source | no `section.configurator` delta; presets/aside/stage heights move ±4px on two routes, all from the demo's own `gap-3` (α) |
| `configurator/styles.css` (42 rules) | new base `[data-slot="configurator"] { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(var(--configurator-stage-min, 18rem), auto) minmax(0, 1fr) }` before the mobile placement rules (the `<section data-slot="configurator">` carries the `:225` class list, verified at `Configurator.vue:337-341`); `.configurator-aside { border-block-start-width: 1px }` beside the divider-colour rule; `.configurator-layer` gains `border-width: 1px` first; wrapped | the `@container (inline-size >= 64rem)` arm overrides the base; the wide arm zeroes the stacked seam; the `:has(+ …)` join keeps zeroing the bottom | as above |
| `configurator/ConfiguratorLayer.vue` (2) | `:102` `'configurator-layer border'` → `'configurator-layer'`; wrapped | width source is the sheet's `.configurator-layer` | no `.configurator-layer` delta |
| `configurator/ConfiguratorRow.vue` (6) | `:133` `<Label class="truncate">` (was `truncate text-small font-medium text-foreground`; `:141` span untouched); wrapped | `Label.vue`'s scoped `.label` sets `--control-label`, 500 and `--foreground`; `text-small` contradicted it, the other two duplicated it | no `label.label` delta |
| `label/Label.vue` (3) | wrapped | the O-26 R-1 `.label` half, now layered | as above |
| `table/TableHead.vue` + `data-table/styles.css` (19) | `src/components/table/TableHead.vue:14` gains `data-[align=center]:text-center data-[align=right]:text-right` after `text-left`; a one-line comment above `data-table/styles.css`'s `[data-align="center"]` rule; wrapped; no `DataTable.vue` edit | the `th`'s `text-align` has one source, its class list, read off the `data-align` DataTable already sets (`:365`); a generic Table `th` stays left | no `th.table-head` delta |
| `styles/paper.css` (5) | the `.dark` arms and the PRT/PRM/print arms folded INTO `@utility paper-underpaint` (`:where(.dark) &`, three nested `@media`) and `@utility paper-grain-overlay` (`:where(.dark) &::after`, `@media … { &::after … }` as siblings of `&::after`); the two top-level `.dark` arms and the three top-level `@media` blocks deleted; the `.dark .x` twin not carried; no wrap needed (the arm reads 0 rows for the file) | the overrides now sit in `utilities` beside what they override | dark `mix-blend-mode: screen` on every paper surface in both builds (no delta); PRT opacity 0 in both (no a11y delta). **One PRM row: STOP**, see Cure round 1 item 12 |

All 466 rules in 48 files are layered; the slider is the one exception.

## Seat 2—the respawn (the first seat was stopped after round 3, before its tail)

**model** `claude-opus-5-5`, asserted from this seat's own transcript
(`…/wf_a4668a47-faa/agent-ac8684453263e61e5.jsonl`, the `"model"` field, found by the same unique
phrase and by this seat's own first command text; a third transcript with the same prompt,
`agent-a7637e9422e13798c.jsonl`, carries no model turn and ends `[Request interrupted by user]`).
HEAD moved to `9025efe2` under the lane (lanes X, C, T committed); the 49 dirty paths are all this
lane's. Nothing the first seat wrote was reverted or re-applied.

### Round 3—the final tree (379 layered, the seven STOP files at HEAD bytes), 530 jobs, 0 load errors

`L-deltas3.jsonl`, rooted with `L-roots2.py`. β and γ are gone (no `.aurora-root`, configurator,
`.label`, `th.table-head` or paper row). What is left:

- **α** (unchanged from round 1): `<Constellation class="absolute inset-0">`,
  `<Blob class="absolute inset-0">`, `<CommandList class="max-h-80">`, the demo's
  `.section-preview-card` under `forced` (`CanvasText → LinkText`), the PRM
  `animation-duration 0s → 0.01ms` on the landing tiles (`animation-name` stays `none`).
- **ε** (unchanged): the disabled sortable handle's `cursor: not-allowed`; `ghost-slot`'s dashed
  edge under `forced`. New in the same kind: `.card.cartoon-surface` under `forced`—`border-width
  1px → 2px` (the cartoon bezel now beats the layered WHC edge's width; colour stays
  the system colour). Benign.
- **PRM rest on `.glass-reveal`** (`/motion/curve-gallery`, one element): `scale none → 1`
  (identity) and `translate none → 0px -1px`—the open row `(0,2,0)` and `.shadow-cartoon-sm`'s
  static stamp lift (`utilities/components.css:112-114`, same `components` layer, later) now outrank
  the carve's `(0,1,0)` `none`s. No motion returns (the carve still sets `transition-property`, the
  universal PRM fallback zeroes the clocks); at rest the surface paints as it does without PRM.
  The seat-1 bracket at `glass/reveal.css:270-277` said "so no paint moves"—amended in place
  (this lane's uncommitted text) to name the two rest rows.
- `menu.css` PRM move: `transition-property` on `.glass-menu-row` under PRM, as recorded in (3).
- Noise: `ch`-sized `max-width` and dock width on `/feedback/skeleton` (a11y), the typewriter
  caret blink phase, the count-up button width, sub-pixel `music-staff` circle scale.

### (2, closed) THE GATE after the cure—RED on exactly the STOP set

`tests/gates/orphan-css-partial.test.ts` "every top-level style rule the reach union ships sits
inside an @layer": `Tests 1 failed | 7 passed (8)` in its file; the diff lists **87** rows, every
one in the seven STOP files (`Aurora.vue` 10, `configurator/styles.css` 42, `ConfiguratorRow.vue`
6, `ConfiguratorLayer.vue` 2, `Label.vue` 3, `data-table/styles.css` 19, `paper.css` 5) and none
elsewhere (`scratchpad/regwave/L-seat2-targeted.log`). The arm turns GREEN when the adjudicator's
cure for the STOP rows lands; nothing in the allowlist was widened to make it pass.
**It did (cure round 1):** `Tests 9 passed (9)` in its file on the whole reach union, the slider
the only exception (`scratchpad/regwave/L-cure1-gate-GREEN.log`); the allowlist was NARROWED
(`@custom-variant`/`@variant` struck, token roots content-defined), not widened.

Targeted run (4 files): `Test Files 1 failed | 3 passed (4)`, `Tests 1 failed | 57 passed (58)`—the
one red is the arm above; `typography.test.ts` (10-5), `typed-track-seam.test.ts` (the
`./styles.css` layer statement) and `chip.contract.test.ts` GREEN.

### Gate receipt

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Unchanged (the same line lanes T and X banked at their bases). Nothing minted.

### Files touched (for the driver's pathspec commit)

`scripts/gen-component-styles.mjs`
`src/components/_shared/disclosure/disclosure.css` `src/components/_shared/menu/menu.css`
`src/components/avatar/styles.css` `src/components/blob/Blob.vue`
`src/components/command/styles.css` `src/components/constellation/Constellation.vue`
`src/components/dark-mode-toggle/dark-mode-toggle.css` `src/components/deck/styles/capture.css`
`src/components/dialog/styles.css` `src/components/expandable-container/styles.css`
`src/components/fourier-field/FourierField.vue` `src/components/handmark/HandMark.vue`
`src/components/labeled-field/LabeledField.vue` `src/components/pager-dots/PagerDots.vue`
`src/components/progress/Progress.vue` `src/components/scroll-progress-rim/styles.css`
`src/components/separator/Separator.vue` `src/components/sheet/styles.css`
`src/components/skeleton/Skeleton.vue` `src/components/status-dot/StatusDot.vue`
`src/components/tabs/styles/drag.css` `src/components/tabs/styles/segmented.css`
`src/components/timeline/Timeline.vue` `src/components/typewriter/TypewriterText.vue`
`src/styles/accessibility.css` `src/styles/animations.css` `src/styles/glass-specular-track.css`
`src/styles/glass/a11y-fallback.css` `src/styles/glass/dissolve.css`
`src/styles/glass/focus-veil.css` `src/styles/glass/reveal.css` `src/styles/index.css`
`src/styles/scroll-choreography.css` `src/styles/scroll-chrome.css`
`src/styles/scroll-driven.css` `src/styles/tokens/dark-arm-glass.css`
`src/styles/tokens/scheme-motion.css` `src/styles/track-well.css` `src/styles/transitions.css`
`src/styles/typography/semantic.css` `src/styles/utilities/a11y-overrides.css`
`src/styles/utilities/responsive.css` `src/styles/view-transition.css` `src/styles/viz-reveal.css`
`tests/components/chip.contract.test.ts` `tests/gates/orphan-css-partial.test.ts`
`tests/styles/typed-track-seam.test.ts` `tests/styles/typography.test.ts`
`tests/styles/mark-register.test.ts` `tests/styles/route-motion.test.ts`
`docs/tranches/BK/execution/2026-09-22-register-wave/L/RECORD.md`

Cure round 1 adds ten: `src/components/aurora/Aurora.vue`
`src/components/configurator/Configurator.vue` `src/components/configurator/ConfiguratorLayer.vue`
`src/components/configurator/ConfiguratorRow.vue` `src/components/configurator/styles.css`
`src/components/data-table/styles.css` `src/components/label/Label.vue`
`src/components/table/TableHead.vue` `src/styles/paper.css` `tests/styles/spring-authority.test.ts`

(51 source/test paths + this RECORD before cure round 1; 61 + this RECORD after it. None of Lane T's token files. `dist/` was last built by seat 1
under the lock; seat 2's only `src/` bytes after it are comments (`glass/reveal.css`, `avatar/styles.css`). An owner-side
`vite build --watch` has been running in this repo since 14:54 and rewrites `dist/` on its own—not
this lane's, not touched.)

### The battery

First full run (seat 2, before the two witness repairs below): `Test Files 4 failed | 229 passed
(233)`, `Tests 9 failed | 2248 passed | 10 expected fail (2267)` (`scratchpad/regwave/L-seat2-vitest.log`).
Two of the four files were this lane's wrap breaking a CSS-source witness's parser, repaired in
place (both in the lane's `tests/**` fence):

- **`tests/styles/route-motion.test.ts`** (6 reds, `rides an UNMATCHED window…` among them: "zoom:
  the root pair does not state one clock"). The rule walker skipped every rule whose parent is an
  at-rule, so once `view-transition.css` sat in `@layer components` it read zero rules. Now it
  skips an at-rule parent unless that parent is `@layer` (`:60-68`). Measured: the walker selects
  the same 35 selectors, in order, from the wrapped bytes as the old walker did from HEAD's
  (`L-vt-head.css`). GREEN `Tests 17 passed (17)` (`L-seat2-route-GREEN.log`).
- **`tests/styles/mark-register.test.ts`** "layers the avatar's shape seam only" (BK #87 W-MARKS:
  "expected [ …(2) ] to have a length of 1 but got 2"). **RULINGS wins over the earlier row:** #87
  layered only the shape seam so the type ladder would outrank an unlayered page rule; 10-1 rules
  that outranking is the A-3-CLASS defect and layers the whole sheet. The row becomes "layers the
  whole avatar sheet, the shape seam last" (`:204-223`, dated bracket on the committed detector
  comment): nothing outside `@layer components` (comments stripped), and the last block still
  declares `border-radius` only. RED on HEAD bytes (the same logic over `git show HEAD:…`: 1 block,
  rules outside it) → GREEN on the wrapped bytes, `Tests 9 passed (9)` (`L-seat2-avatar-RED.log`,
  `L-seat2-avatar-GREEN.log`). The avatar sheet's own "the ONLY layered rules" heading bracketed.
  Round 3 shows no avatar delta on any route, so the #87 two-sizes page no longer paints apart.

Final run: **`Test Files 2 failed | 231 passed (233)`, `Tests 2 failed | 2255 passed | 10 expected
fail (2267)`** (`scratchpad/regwave/L-seat2-vitest2.log`). The two reds:

- `orphan-css-partial.test.ts`—this lane's arm, RED on the 87 STOP rules by design (above).
- `boot-graph.test.ts` "the dist-demo it measures is NEWER than every source"—`dist-demo/` was
  built 2026-09-18, before this wave; every lane's `src/` byte is newer. A stale local artefact,
  not a defect; `npm run demo:dist:build` greens it. Not rebuilt by this lane.

Gate receipt after the repairs: the same line, `seats:60 … drift:0 rosterSha256:282d05cf
violations:0`—unchanged.

## Cure round 1

**Seat** cure (Opus) · **model** `claude-opus-5-5` (asserted from this seat's own transcript,
`…/wf_a4668a47-faa/agent-afc764e1024c250ec.jsonl`, the `"model"` field; see the header) ·
**datum** `master` @ `5bbb2de8` · **ruling of record** RULINGS §1 10-1 (with the 15:50 driver
bracket, which delegates the per-site list), 10-5, §3 lane L; the adjudication is
`scratchpad/regwave/L-adjudication-1.json` (`claude-fable-5-1`, verdict CURE-ROUND: 17 rulings,
two AMEND, the rest ACCEPT, none REJECTED; 15 cureList items). Where the O-20 LEDGER's
§A-3-CLASS says "token `:root`" by selector and the adjudicator's LcA-2 reads it by content, the
later ruling wins; the RULINGS bracket below records it. Per-item status:
`scratchpad/regwave/L-cure-1.json`.

**1 · Aurora.vue.** "drop `block` … `.aurora-root { display: grid }` is the source" →
`src/components/aurora/Aurora.vue:207` `class="aurora-root h-full w-full overflow-hidden"`.
Witness: round-4 probe, no `.aurora-root` row in any of six modes. Residue: none.

**2 · Configurator.vue.** "`:225` → `grid`; delete the `grid-rows-[…]` line; drop `py-2`, `gap-2`,
`border-t`; bracket the class-list comments" → `Configurator.vue:229` `"grid"`, the rows line gone
(`:244-248`), `:356` `configurator-presets shrink-0 px-3`, `:371` `configurator-gallery-track flex
scrollbar-hidden`, `:418` `configurator-aside flex min-h-0 min-w-0 flex-col`; `:462` footer
`border-t` untouched. Brackets `:224-228`, `:246-247`, and one the cure did not name, `:315-318`
("The stacked `border-t` stays on the element"): false after the same edit, bracketed on LcA-5's
authority (b). Witness: probe, no `section.configurator` row.

**3 · configurator/styles.css.** "(a) base rule before the mobile placement; (b)
`.configurator-aside { border-block-start-width: 1px }`; (c) `.configurator-layer` `border-width:
1px` first; (d) four brackets" → (a) `:280-289` inside the wrapped layer (the element is the
`<section data-slot="configurator">` at `Configurator.vue:337-341`, so the selector is as ruled),
(b) `:243-247`, (c) `:130`, (d) `:10-18`, `:95-96`, `:119-121`, `:263-265`, `:275-276`. The HEAD
line numbers the cure cites had drifted (the anchors were found by text). Two more comments the wrap
falsified, bracketed on the same authority: `:206-210` ("This file is unlayered … win the channel
by layer") and `:358-359` (the stacked seam "by its own `border-t`"). Witness: probe.

**4 · ConfiguratorLayer.vue:102** → `'configurator-layer'`; the template comment `:90-91` ("The
`border` (all-side) width is Tailwind") bracketed. **5 · ConfiguratorRow.vue:133** → `class="truncate"`;
`:141` untouched; the comment `:125-127` ("the body size (text-small / 500)") bracketed. Witness:
probe, no `.configurator-layer` or `label.label` row.

**6 · TableHead.vue.** → `src/components/table/TableHead.vue:14` `'table-head text-left
data-[align=center]:text-center data-[align=right]:text-right align-middle …'`; the one-line
comment sits on its own line above `data-table/styles.css`'s `[data-align="center"]` rule (`:96`
at HEAD). No `DataTable.vue` edit. Witness: probe, no `th.table-head` row.

**7 · paper.css fold.** → `@utility paper-underpaint` `:100-140` (`:where(.dark) &`, PRT, PRM
verbatim, print), `@utility paper-grain-overlay` `:142-180` (`:where(.dark) &::after`, `@media
… { &::after … }` as siblings), the two `.dark` arms and the A11y header's three `@media` blocks
deleted, bracket `:226-230` (the cure's `:166-170`; the anchor is the `.paper-grid` PRT comment).
Emission, `dist/styles/paper.css` after the build: `…mix-blend-mode: multiply;:where(.dark)
&{mix-blend-mode: screen;}@media (prefers-reduced-transparency: reduce){opacity: 0;}@media
(prefers-reduced-motion: reduce){animation: none !important;}@media print{display: none;}}` and
`:where(.dark) &::after{…}@media (prefers-reduced-transparency: reduce){&::after{opacity:
0;}}@media print{&::after{display: none;}}` (Tailwind folds them at the consumer's build).

**8 · The wrap.** `python3 scratchpad/regwave/L-wrap.py` over the six files: `wrapped` printed for
each; `paper.css` needed none and the arm reads 0 rows for it (it is in the union via
`styles/index.css:206`). `Timeline.vue:529-533` bracketed: the block is in `@layer components`,
so `.tl .track-flow` plus the scoped attribute wins by specificity over the register's bare
`.track-flow` (`glass/track-flow.css:34`, also in `components`).

**9 · The gate.** (a) `ALLOWED_AT_RULE = /^@(?:utility|theme|property|font-face|keyframes)\b/`;
(b) the docblock names the ruling's allowlist and says a `@variant` block is reported (the
dictated sentence, joined to the existing "any unknown block at-rule is reported" clause rather
than repeating it); (c) `SCHEME_ROOT` kept for the prelude, plus `declarationsOf` (split on `;` at
paren depth 0, quotes respected, nested blocks stripped) and `isTokenRoot` (every declaration
`--*`, `color-scheme` or `accent-color`), with the ruled comment; a nested block's prelude stays in
the text and fails the test, so a `:root { @media … { … } }` reports rather than hides; (d) the
bite `it` "self-test bite — a non-token `:root` rule and a block `@variant` each print a row", plus
a negation that the token pair with the two named properties stays admitted; (e) `L-wrap.py:7`
aligned.
- RED (bite written first, old walker): `AssertionError: expected [] to deeply equal [ ':root' ]`,
  `Tests 1 failed | 8 skipped (9)` (`scratchpad/regwave/L-cure1-bite-RED.log`).
- GREEN (after a-c): `Tests 9 passed (9)` in the file, the A-3 arm included, on the whole union
  (`scratchpad/regwave/L-cure1-gate-GREEN.log`).

**10 · Witness and prose edits.** `tests/styles/typed-track-seam.test.ts:184`
`expect(declared).toBeDefined()` (`:185` keeps the mirror invariant; a relaxation, so no RED leg,
GREEN in the battery); `tests/styles/spring-authority.test.ts:236-237` bracket
(`view-transition.css:42-43`, verified: `animation-duration` `:42`, `animation-timing-function`
`:43`); `styles/glass/dissolve.css:231-236` bracket (inside `@layer components` like the PRM carve;
a consumer layer ordered after `components` can now re-order the floor); `avatar/styles.css:17`
bracket ends at "now wins.".

**11 · Build.** Under `scratchpad/build.lock`; `npm run build` exit 0
(`scratchpad/regwave/L-cure1-build.log`); `dist/component-styles.css:1` is `@layer theme, base,
components, utilities;`.

**12 · Paint probe round 4.** Pair: `tree-before` = the working tree with all 53 of this lane's
`src/` paths restored from `HEAD` (the 48, the four template files, `Label.vue`,
`data-table/styles.css`, `paper.css`… every `src/` path in `git diff --name-only HEAD`), `tree-after`
= the working tree; both `vite build --config demo/vite.demo-dist.config.ts` (exit 0).
`L-paint-diff4.mjs` (six modes, `coarse` added; elements keyed by tag and child index), 636
route×mode jobs, 0 load errors, 0 missing nodes, 0 new nodes (`L-deltas4.jsonl` light/dark/prm,
`L-deltas4b.jsonl` forced, `L-deltas4c.jsonl` a11y/coarse; the first process was stopped once its
prm leg was complete and the other two ran the rest; `L-roots4.py` → `L-roots4.txt`).
- **β and γ: gone.** No `.aurora-root`, `section.configurator`, `.configurator-layer`,
  `label.label` or `th.table-head` row in any mode; paper surfaces keep `mix-blend-mode: screen` in
  dark and `opacity: 0` under PRT in both builds.
- **α, as round 3:** `<Constellation class="absolute inset-0">` and `<Blob class="absolute
  inset-0">` (`relative → absolute`), `<CommandList class="max-h-80">` (`384 → 320px`), the demo's
  `.section-preview-card` under `forced` (`rgb(0, 0, 0) → rgb(0, 0, 159)`, `CanvasText →
  LinkText`), PRM `animation-duration 0s → 1e-05s` on the landing tiles; plus the presets gap
  (`gap 8px → 12px` on the demo's `div.flex.flex-col.gap-3` and gallery tracks), which moves
  `.configurator-presets` +4px and the aside/stage −4px on `/containers/configurator` and
  `/substrates/aurora` (no padding or border row on either).
- **ε, as round 3:** sortable handle `cursor: grab → not-allowed`; `ghost-slot`
  `border-top-style solid → dashed` (forced); `.card.cartoon-surface` `border-*-width 1px → 2px`
  (forced); `.glass-reveal` PRM rest `scale none → 1`, `translate none → 0px -1px`;
  `.glass-menu-row` PRM `transition-property` gains `translate, scale`.
- **Noise:** `1ch`/`1lh`-sized paddings (`.badge-atom`, `mark.css:136-139`) and `max-w-prose`
  widths on font-load timing; the count-up button width; the blob canvas under `coarse`
  (`opacity 0 → 1`, `filter brightness(1) saturate(1) → none` on `/substrates/blob` and
  `/compositions/empty-states`): the entrance bloom caught at its first frame in the BEFORE pair.
  A timed re-sample of both routes, both builds (`L-cure1-blobcoarse.mjs` →
  `L-cure1-blobcoarse.log`) shows the same curve in both, settled at 2500 ms.
- **STOP, one row:** `div.paper-underpaint` on `/foundations/paper-glass`, `prm`:
  `animation-duration 0s → 1e-05s` (`animation-name` `none` in both, so nothing animates). The
  mechanism is LcA-4's: the folded `animation: none !important` now sits in `utilities`, the
  universal PRM fallback `*, *::before, *::after { animation-duration: 0.01ms !important }` in
  `components`, and important declarations rank earlier layers first. The cure list expects no
  paper delta in any mode, so the row is named and left for the adjudicator; nothing further was
  edited for it.
- **DialogContent line** (`L-dialog-line.mjs` on the round-4 pair → `L-dialog-line.log`):
  `before {"radius":"24px","maxWidth":"384px","radiusDialogToken":"16px"}`, `after
  {"radius":"16px","maxWidth":"384px","radiusDialogToken":"16px"}`.

**The moved `!important` set (LcA-4).** `L-cure1-important.py`: on `HEAD` bytes, every
`!important` inside a top-level rule the wrap layers (`L-wrap.py`'s own walk, comments stripped):
`deck/styles/capture.css` 27 (of 40 in the file), `accessibility.css` 12 (12),
`utilities/a11y-overrides.css` 4 (4), `blob/Blob.vue` 2 (2), `handmark/HandMark.vue` 1 (1),
`view-transition.css` 1 (1): **47 in 6 files into `components`**, plus `paper.css` 1 into
`utilities` by the fold (`L-cure1-important.txt`). `glass/dissolve.css` (4) and `transitions.css`
(7) moved none: theirs were already layered at HEAD. The adjudicator's `grep -c` figures (41, 8)
count lines, comments included.

**13 · Battery.** `timeout 900 npx vitest run`: `Test Files 1 failed | 232 passed (233)`, `Tests 1
failed | 2257 passed | 10 expected fail (2268)` (`scratchpad/regwave/L-cure1-vitest.log`). The one
red is outside this fence: `tests/gates/boot-graph.test.ts` "the dist-demo it measures is NEWER
than every source", `dist-demo/` built 2026-09-18 (as in seat 2's run). Gate receipt, `node
scripts/gate-register.mjs`: `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11
bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0`, unchanged
(`scratchpad/regwave/L-cure1-receipt.log`).

**14 · This RECORD.** The STOP table is the CURED table; the β table corrected (presets gap → α,
the `grid-rows-[…]` row added, `TableHead.vue` full path); the allowlist text updated in (1) and
(2); the bracket list extended; the probe scope stated; the `&&` sentence per seat in the header;
em dashes tightened in the lane's own prose (quotations of RULINGS, LEDGER and source text keep
their spacing).

**Residue.** `tests/styles/contrast-computed.test.ts:510` cites `LabeledField.vue:113`, now the
selector line of the rule whose declaration is `:114`; the test is Lane T's file this wave, not
edited. `src/composables/motion/reveal/useStagger.ts:110` cites `transitions.css:144`, now `:146`; outside the
fence, for the driver. The paper PRM row above. Print media and sub-1280 widths unprobed.

**RULINGS brackets for the driver** (verbatim from the adjudication):
- §1 10-1: `[2026-09-22 · ADJUDICATOR (L, round 1): 'token :root' is content-defined (every declaration a custom property); `color-scheme` and `accent-color` are admitted on the `:root`/`.dark` pair as named exceptions with grounds — the scheme switch must share the token pair's rank and its `.dark` half sits inside Lane T's token block. `@variant`/`@custom-variant` are NOT on the allowlist (never named; statement form only in src).]`
- §3 lane L: `[2026-09-22 · ADJUDICATOR (L, round 1): inside a `.vue` the fence admits (a) the per-site template-utility removals the 15:50 ruling dictates (Aurora.vue, Configurator.vue, ConfiguratorLayer.vue, ConfiguratorRow.vue, table/TableHead.vue) and (b) a dated bracket on a comment the wrap falsifies (Timeline.vue:529-530); nothing else.]`

## FOR LANE R

**MIGRATION §10.0.0—the A-3-CLASS row.** Every top-level style rule the package ships (both
`./styles` and `./styles.css`) now sits in `@layer components`, so any consumer rule, unlayered or
in `@layer utilities`, beats it at any specificity. `./styles.css` now opens with
`@layer theme, base, components, utilities;` (mirrored from `styles/index.css`), so a consumer
importing only that path gets the same order.

**The manifest.** "THE MANIFEST" above (by file and selector) is the measured set: **466 rules in
48 files at `695d4925`, ALL layered at 10.0.0.** (The seven files seat 2 stopped were cured in
cure round 1; `paper.css`'s five rules were folded into its two `@utility` blocks, so they rank in
`utilities` beside what they override, not in `components`.)

**What stays unlayered on purpose (the exceptions):**
- token roots—rules whose selector list is `:root` and/or `.dark` AND whose every declaration is
  a custom property; `color-scheme` and `accent-color` are admitted on that pair as named
  exceptions (the scheme switch must share the token pair's rank; layering one half inverts it,
  and the `.dark` half sits in `tokens/dark-arm.css`'s token block). 34 such rules at `695d4925`;
- the at-rules `@utility`, `@theme`, `@property`, `@font-face`, `@keyframes` (a `@variant` block is
  reported, not admitted);
- ONE named exception, `src/components/slider/styles.css` (47 rules; grounds
  `slider/styles.css:6-10`, O-20 §A-3-CLASS).

**`!important` (Cascade L5 inverts important declarations across layers).** Every `!important`
the wrap moved into `@layer components` now beats a consumer's `!important` in `@layer utilities`
or unlayered CSS. Moved (measured on `HEAD` bytes, `L-cure1-important.txt`): 47 in 6 files—
`deck/styles/capture.css` 27, `accessibility.css` 12, `utilities/a11y-overrides.css` 4,
`blob/Blob.vue` 2, `handmark/HandMark.vue` 1, `view-transition.css` 1; plus `paper.css` 1 into
`utilities`. MIGRATION-ready sentence: "A consumer `!important` no longer overrides a library
`!important`; to win, declare it in a layer ordered before `components`, or without
`!important`." Measured on the demo: an `animation: none !important` element's PRM
`animation-duration` moves `0s → 0.01ms` (`animation-name` stays `none`, nothing animates); the
same mechanism moves the library's own `.paper-underpaint` under PRM (the STOP row in cure round
1, item 12).

**What a consumer sees move** (demo, round 4, six modes at 1280×900: light, dark, prm, forced,
a11y = `prefers-contrast: more` + `prefers-reduced-transparency: reduce`, coarse = `pointer:
coarse`; print and narrower widths NOT probed—`deck/styles/capture.css:114` `@media print`, 10
rules incl. `@page` and 27 `!important`, is the largest unprobed set):
- their own classes win where they used to lose—`class="absolute inset-0"` on
  `<Constellation>`/`<Blob>`, `max-h-80` on `<CommandList>` (`384 → 320px`), `gap-3` on content
  slotted into `<Configurator>`'s presets (`8 → 12px`), their `forced-colors` edges on library
  surfaces;
- `<DialogContent class="rounded-dialog max-w-sm">`: `border-top-left-radius` **24px → 16px**
  (the consumer's `rounded-dialog` now beats `:where([data-slot="dialog-content"])`'s
  `--radius-3xl`); `max-width` 384px both sides (`L-dialog-line.log`);
- a disabled `SortableList` handle shows `cursor: not-allowed` (was `grab`);
- four library-side rows, measured in rounds 3 and 4 alike:
  - `.glass-resting.ghost-slot` under `forced-colors`: `border-top-style solid → dashed` (the
    `@utility ghost-slot` now beats the WHC edge's `solid`; colour stays `CanvasText`);
  - `.card.cartoon-surface` under `forced-colors`: `border-*-width 1px → 2px` (the cartoon bezel
    beats the WHC edge's width; colour stays the system colour);
  - `.glass-reveal` at PRM rest: `scale none → 1`, `translate none → 0px -1px` (no motion returns;
    at rest it paints as it does without PRM);
  - `.glass-menu-row` under PRM: `transition-property` gains `translate, scale` (the universal PRM
    fallback still zeroes every duration).
- `glass/dissolve.css`'s coarse-pointer hit expansion (G-COARSE-TARGET) was unlayered on purpose
  ("an a11y floor answers to the medium, not to a cascade layer a consumer can re-order"); it is
  in `@layer components` now, so a consumer layer ordered after `components` can re-order that
  floor. Round 4's coarse leg shows no row on `.glass-corner-affordance`.

**CHANGELOG only (library-internal, paint-neutral):** the template utilities cure round 1 removed
because they fought a sheet rule once both were layered—`Aurora.vue` `block`;
`Configurator.vue` `grid-cols-1`, the `grid-rows-[…]` template, `py-2` on the presets, `gap-2` on
the gallery track, `border-t` on the aside; `ConfiguratorLayer.vue` `border`;
`ConfiguratorRow.vue` `text-small font-medium text-foreground` on its `<Label>`; and
`TableHead.vue`'s `th` now reads `data-align` (`data-[align=center]:text-center
data-[align=right]:text-right`). Each declaration's source is now the sheet; round 4 shows no
delta on any of these elements.

**FR-COB-8 / FR-COB-12** (value.js `fr-CanvasOverlayButton.md`, read-only): both DEAD at HEAD—
the utility corpus already imports `layer(components)` (`vite.utility-emit.ts:295-300`), and
`scale-press-btn` occurs 0× in `src/` and `dist/`. The live remainder of the class was the
unlayered set itself, including the a11y resets (`utilities/a11y-overrides.css` 4,
`accessibility.css` 4, `glass/a11y-fallback.css` 3), all layered now. One observation for the
adjudicator: `:where([data-slot="dialog-close"]):active::before { scale: var(--scale-press) }`
(`dialog/styles.css`) has no PRM arm.

**10-5—the `text-caption` row.** `@utility text-caption` drops `font-style: italic`
(`typography/semantic.css`); `text-math`, `text-math-body`, `fourier-f` keep it. Recipe: add
`italic` beside `text-caption` (`cn()` buckets them apart, so the pair survives merging). In-house
callers: `src/` 1 (`chip/chipVariants.ts:9`, the `sm` rung, now upright); `demo/` 36 lines in 17
stories. **README.md § Usage, the synthesis paragraph (`:68-77`), two edits:** "Four utilities"
becomes three (`text-math`, `text-math-body`, `fourier-f`), and the upright-`text-caption`
workaround ("reach for `text-mono-caption`, or `color: var(--muted-foreground)` on
`text-caption`, where the distinction has to survive that policy") is struck, since the slant it
protects is retired. DESIGN.md carries no such paragraph (0 hits for "synthesis"); it drops from
the row.

**The two RULINGS brackets for the driver** are quoted at the end of Cure round 1.
