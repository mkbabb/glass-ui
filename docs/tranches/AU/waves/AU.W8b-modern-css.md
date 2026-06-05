# AU.W8b - Modern-CSS + encapsulation/styling folds

## 2. State

**Name**: W8b - Modern-CSS + encapsulation/styling folds
**Opens after**: AU.W8 (the motion+a11y+vocab atomic commit lands FIRST; W8b is non-publish-blocking)
**Agents**: 8 parallel — the eight units below are file-disjoint (see §4a) so they parallelize across sibling worktrees; only AU.W8b.1 (visibility-fork) must REPLACE the JS measure/pin dance W8 leaves in place, so it cannot land before W8's FLIP sync is committed
**Hard gate**: two NEW born-RED gates green (`proof:design-idiom-localization` + `proof:dock-css-split`); the existing dock/components/strict-template gate matrix + `typecheck` + `build` stay green with no regression; manual browser verify recorded in `PROGRESS.md`
**Status**: planned

**Type:** IMPL (lands just after the W8 motion+a11y+vocab atomic commit; non-publish-blocking).
**Scope source:** `docs/tranches/AU/AU-AUGMENT.md` §2.4 (modern-CSS adopt/defer), §5.3–5.4 (encapsulation + styling folds), §6.1 (gate fleet); Baseline-grounded against `docs/tranches/AU/audit/AUGMENT/modern-web-guidance-crosswalk.md` §3. This file is the FULLY-formed, execute-without-re-deriving spec for W8b.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks). Gestalt transposition, not patch. KISS — fold complexity out, do not add abstraction. value.js-FREE dock driver (W8b touches no runtime JS color path; the `interpolate-size` work is CSS-only). Isomorphic styling — every visual axis stays a `var(--…)` token; no behavior change from any styling fold.

## 2a. Goal criterion

This wave succeeds if the dock's container-morph + layer-crossfade motion is expressed through Baseline-gated native CSS (with the proven FLIP/hand-rolled fork retained as the unconditional fallback), the dock CSS monolith is split control-family-out, the highest-signal Tailwind anti-pattern wraps are localized to `@theme` utilities, and the Vue 3.5 `defineModel`/`Readonly<>` modernizations land — all with ZERO behavior change on non-supporting engines and zero public-API change. The reader's test: a supporting engine settles container width + child opacity in lockstep natively; a non-supporting engine renders byte-identically to HEAD.

## 3. Scope

1. Fold the dock visibility fork into native `interpolate-size`/`@starting-style`/`transition-behavior: allow-discrete` arms, `@supports`-gated, keeping the FLIP + hand-rolled 3-state fork as the fallback.
2. Apply native CSS nesting to the dock control-family selector clusters (readability only; specificity-preserving).
3. Split `dock.css` → `dock.css` (shell/density/layer-contract) + `dock-controls.css` (the five-control family); add the born-RED `proof:dock-css-split` gate.
4. Lift the 12 non-idiomatic Tailwind arbitrary-value wrap sites to generated `@theme` utilities / `@utility` recipes; add the born-RED `proof:design-idiom-localization` gate.
5. Convert 8 manual `defineProps`+`defineEmits("update:…")` sites to `defineModel`.
6. Harden the dock layer-context type surface with `Readonly<Ref<…>>` + `readonly()` at the provide site.
7. Re-ground the deprecated `-webkit-*` cleanup against HEAD (three re-groundings; record, do not strip load-bearing feature-tests).
8. Add the `@supports (anchor-name: --x)`-gated native anchor-positioning recipe for dock popovers (floating-ui fallback unconditional), OR formally BOOK if the single-active-popover / reka-positioner-yield invariant fails.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **File-bounds expansion invalidates a unit.** AU.W8b.1's `@supports (interpolate-size…)` width rule is observed to DOUBLE-ANIMATE with the View-Transitions `::view-transition-group(.gl-dock-layer)` morph on an engine supporting both (the §1 isomorphism risk). The fix (a `data-vt-active` guard the composable sets) crosses out of `src/styles/` into `useLayerTransition.ts` — a DOCS-bounds-breaking expansion. Halt and triumvirate.
- **AU.W8b.8 single-active-popover invariant does not hold**, or reka-ui's positioner cannot be yielded per-content (the anchor() + floating-ui inline transform double-position). This is not local-edit-recoverable; the redress is to BOOK §8 (floating-ui ships unchanged) rather than force the fold.
- **A born-RED gate (AU.W8b.3 / AU.W8b.4) cannot be authored manifest==ci** without false-RED-ing the legitimate shared-contract group (`dock.css:36-50`) or the runtime-themed `--active-tab-color` allowlist. A gate that reddens correct code is a plan defect, not a local fix.
- **Any diagnostic loop reaches its third iteration** on the §1 lockstep-settle manual browser verify (the VT/`interpolate-size` interaction) — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access |
|---|---|
| `src/styles/dock.css` | modify-carve |
| `src/styles/dock-controls.css` | create |
| `src/styles/index.css` | modify |
| `src/styles/utilities.css` | modify |
| `src/styles/theme.css` | modify |
| `src/styles/tokens.css` | modify |
| `src/components/ui/card/CardDescription.vue` | modify |
| `src/components/ui/card/Card.vue` | modify |
| `src/components/ui/card/__tests__/Card.test.ts` | modify |
| `src/components/ui/combobox/ComboboxList.vue` | modify |
| `src/components/ui/carousel/CarouselDots.vue` | modify |
| `src/components/ui/accordion/AccordionContent.vue` | modify |
| `src/components/ui/accordion/AccordionTrigger.vue` | modify |
| `src/components/ui/collapsible/CollapsibleContent.vue` | modify |
| `src/components/custom/stacked-icons/StackedIconGroup.vue` | modify |
| `src/components/ui/toggle/index.ts` | modify |
| `src/components/ui/select/SelectTrigger.vue` | modify |
| `src/components/ui/tabs/TabsTrigger.vue` | modify |
| `src/components/ui/multi-select/MultiSelect.vue` | modify |
| `src/components/custom/tabs/BouncyTabs.vue` | modify |
| `src/components/custom/tabs/UnderlineTabs.vue` | modify |
| `src/components/custom/tabs/BouncyToggle.vue` | modify |
| `src/components/custom/responsive-tabs/ResponsiveTabs.vue` | modify |
| `src/components/custom/hover-popover/HoverPopover.vue` | modify |
| `src/components/ui/data-table/DataTable.vue` | modify |
| `src/components/custom/configurator/ConfiguratorLayer.vue` | modify |
| `src/components/custom/dock/composables/dockLayerContext.ts` | modify |
| `src/components/custom/dock/composables/dockContext.ts` | modify (audit; likely no-op) |
| `src/components/custom/dock/DockLayerGroup.vue` | modify |
| `src/components/custom/dock/DockSelectTrigger.vue` | modify |
| `src/components/custom/dock/DockDropdownTrigger.vue` | modify |
| `scripts/proof-dock-controls-split.mjs` | create |
| `scripts/proof-design-idiom-localization.mjs` | create |
| `scripts/gates.mjs` | modify |
| `package.json` | modify (scripts only) |
| `CLAUDE.md` | modify (Structure block — `dock-controls.css` line) |
| `docs/tranches/AU/PROGRESS.md` | modify |
| component `__tests__/*` + `.test-d.ts` fixtures for converted SFCs | create|modify |

Do NOT touch: `src/composables/glass/useLayerTransition.ts` (W8 owns it; the FLIP single-frame sync at `:146→167` / `:150-170` is W8's deliverable — only READ it; the §1 fold REPLACES the dance it leaves, it does not edit the composable) · `src/styles/view-transition.css` (`:47-62` the VT layer morph; W8/VT-owned) · `src/styles/glass.css` (the `:326` `-webkit-backdrop-filter` feature-test is KEEP, no edit) · `src/styles/animations.css` (`:325-366` the top-layer grammar is the recipe source, read-only) · any runtime JS color path.

## 4a. Disjointness

No two agent units share a `modify` or `modify-carve` path:

- **AU.W8b.1** (visibility-fork) and **AU.W8b.2** (nesting) and **AU.W8b.3** (split) all touch `dock.css`. They are NOT parallel-disjoint and MUST serialize in one writer/worktree: order §1 → §3 (the split MOVES the control rules §2 nests) → §2 applied AS the controls move (one diff pass, per the original sequencing note). Treat AU.W8b.1+2+3 as a single serial dock-CSS lane (the "dock-css" worktree below).
- **AU.W8b.4** owns `theme.css` / `tokens.css` / `utilities.css` + the 12 SFC/CVA sites + `Card.test.ts`. None of those files is touched by the dock-CSS lane (the dock-CSS lane stays in `dock.css`/`dock-controls.css`/`index.css`). Disjoint.
- **AU.W8b.5** owns the 8 `defineModel` SFCs + their `__tests__`; **AU.W8b.6** owns `dockLayerContext.ts`/`dockContext.ts`/`DockLayerGroup.vue` + a `.test-d.ts`. `TabsTrigger.vue` appears in BOTH the §4 lift (#2/#3) and is a tabs SFC — but §4 edits ITS CLASS STRING and §5 does not convert it, so no collision; `BouncyTabs`/`UnderlineTabs`/`BouncyToggle` are §5-only. Disjoint.
- **AU.W8b.7** owns `utilities.css` scrollbar lines — CAUTION: `utilities.css` is ALSO touched by AU.W8b.4 (the `@utility` recipe authoring). Fold AU.W8b.7's `utilities.css` work INTO the AU.W8b.4 writer/worktree, OR sequence them; do NOT run §4 and §7 in parallel against `utilities.css`. (Most of §7 is re-grounding/record-only — see the unit; the sole live edit is verifying `.scrollbar-hidden` already carries `scrollbar-width: none` at HEAD.)
- **AU.W8b.8** owns `dock-controls.css` (the anchor `@supports` block) + `DockSelectTrigger.vue`/`DockDropdownTrigger.vue`. `dock-controls.css` is CREATED by the dock-CSS lane (AU.W8b.3) — §8 MUST land AFTER the split exists; fold AU.W8b.8's `dock-controls.css` append into the dock-CSS lane's worktree (serial after §3) or sequence. The two trigger SFCs are §8-exclusive.
- `scripts/gates.mjs` + `package.json` are touched by AU.W8b.3 and AU.W8b.4 (gate registration). These two registrations are append-only to disjoint regions (different script entries / manifest rows); the orchestrator integrates both at close in one commit to avoid an index race, OR the two writers register in their own worktree and the orchestrator resolves the trivial append-merge.

Net: three parallel lanes — **(A) dock-CSS** (§1+§2+§3+§8, serial within), **(B) design-idiom** (§4+§7, serial within), **(C) framework** (§5+§6, parallel within). `gates.mjs`/`package.json` registration is orchestrator-integrated.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — dock-CSS (AU.W8b.1, .2, .3, .8) | `/Users/mkbabb/Programming/glass-ui-w8b-a` | serial within; owns `dock.css`, `dock-controls.css`, `index.css`, the two dock trigger SFCs |
| Lane B — design-idiom (AU.W8b.4, .7) | `/Users/mkbabb/Programming/glass-ui-w8b-b` | serial within; owns `theme.css`, `tokens.css`, `utilities.css`, the 12 lift sites, `Card.test.ts` |
| Lane C — framework (AU.W8b.5, .6) | `/Users/mkbabb/Programming/glass-ui-w8b-c` | parallel within; owns the 8 `defineModel` SFCs + their tests, `dockLayerContext.ts`, `DockLayerGroup.vue` |

No `CARGO_TARGET_DIR` (Node/Vite repo, not Rust). Each lane runs `npm run typecheck`/`npm run build`/its gates against its own worktree checkout. The orchestrator runs `git worktree list` + `git worktree add` for the three siblings before dispatch, and owns the `gates.mjs`/`package.json` registration merge + the `index.css`/`CLAUDE.md`/`PROGRESS.md` integration at close. All three lanes branch from the same clean main with W8 already committed.

## 5. Agent Units

### AU.W8b.1 Visibility-fork native fold

- Goal: the dock's container-morph + layer-crossfade settles in lockstep via native `interpolate-size`/`@starting-style`/`allow-discrete` on a supporting engine, with the proven FLIP fixed-pixel path + hand-rolled 3-state fork untouched as the unconditional fallback.
- Mechanism:
  - **`src/styles/dock.css:382-386`** — keep the bare `.dock-layers { display:grid; min-width:0; transition: width var(--dock-motion-resize); }` as the fallback; APPEND an `@supports (interpolate-size: allow-keywords)` block that sets `interpolate-size: allow-keywords` on `.dock-layers` and `width: calc-size(auto, size)` on `.glass-dock.expanded > .dock-layers, .dock-layer-group .dock-layer-item-host.is-active` (the active layer carries the intrinsic-width destination; the browser interpolates current computed width → `calc-size(auto)` natively, so the container morph needs no JS pin/measure).
  - **`src/styles/dock.css:424-460`** — the three base rule blocks (shared transition `:424-429`, inactive `:431-436`, active `:438-450` per its `transition: opacity …, visibility 0s`, leaving `:456-460`) STAY AS-IS as the fallback. APPEND an `@supports (transition-behavior: allow-discrete)` override on `.dock-layer, .dock-layer-item-host` expressing the same 3-state contract as ONE discrete transition: `transition-property: opacity, visibility; transition-duration: var(--dock-motion-resize); transition-behavior: allow-discrete;` + the active rule sets `opacity:1; visibility:visible` with a `@starting-style { opacity:0; visibility:hidden; }` entry anchor. **`allow-discrete` goes on a SEPARATE `transition-behavior` declaration, NEVER in the `transition` shorthand** (mwg crosswalk §2.1 / `animate-element-entry-exit` corpus rule — older browsers drop the whole shorthand declaration if `allow-discrete` appears inside it).
  - Prepend the `:424` contract comment with an `AU.W8b-visibility-fork` marker (the a11y-006 bite-anchor a later refactor greps for so the 3-state semantics are not collapsed).
  - **Baseline (mwg §3.5 + §3.6):** `@starting-style` + `transition-behavior: allow-discrete` are **Baseline Newly available since 2024-08-06** — Baseline-safe behind `@supports`. `interpolate-size: allow-keywords` + `calc-size()` are **NOT Baseline — limited availability, Chrome/Edge 129 only (no Firefox/Safari)**. The `@supports (interpolate-size: allow-keywords)` gate is therefore **MANDATORY CORRECTNESS, not optional polish** — the fold is safe BECAUSE of the gate, not because the feature is Baseline. (Correct the prior loose "calc-size() … Baseline 2024" claim — it is wrong; cite mwg crosswalk §3.5.)
- Files: `src/styles/dock.css` (modify-carve, the two regions above + the comment marker).
- Sub-gate: `proof:dock-opacity-lockstep` (syntactic, opacity rides `--dock-motion-resize` in BOTH the fallback and the `@supports` arm) stays green; `proof:dock-motion-parity` still sees both engines on `--dock-resize-spring` (the `@supports` arm does not change the timing token); the `AU.W8b-visibility-fork` marker is present; manual browser verify (Chrome 131+/Safari 18.4+/Firefox 141+) recorded in `PROGRESS.md` confirms container width + child opacity settle in lockstep and the FLIP width pin does NOT double-fire on a VT-supporting engine (the §1 caveat — if the painted `.dock-layers` width visibly diverges from the VT snapshot, triumvirate per §3a to add the `data-vt-active` guard).

### AU.W8b.2 Dock control-family CSS nesting

- Goal: the repeated `.dock-icon-button` / `.dock-tab-button` / `.dock-select-trigger` parent+state selector clusters read as native-nested blocks with identical compiled specificity and zero behavior change.
- Mechanism:
  - Collapse adjacent parent+state rules into `&`-nested blocks where the cluster is contiguous — e.g. the icon-button cluster (`dock.css:730-815` / now in `dock-controls.css` post-§3): `.dock-icon-button { /* base */ &:hover:not(:disabled){…} &:active:not(:disabled){…} &:is(.is-active,.active,[aria-expanded="true"],[aria-pressed="true"]){…} }`. Native nesting is **Baseline Widely available (2023)** (mwg crosswalk §2.2); Lightning CSS down-compiles so the shipped `dist` CSS is flat.
  - Do NOT nest the shared `:focus-visible` / `:disabled` comma-group (`dock.css:36-50`) under any one control — it is a deliberate cross-control group at full specificity (the `:29-35` comment forbids `:where()` flattening; nesting under one selector changes coverage).
  - Keep the density `[data-density]` blocks (`:91-148`) flat — token cohorts, not nested states (mwg §2.2 confirms `[data-density]` attribute cascade as the corpus-recommended fallback over non-Baseline container style queries).
  - Do NOT change any selector's resulting specificity. Apply AS the controls move in §3 (one diff pass).
- Files: `src/styles/dock-controls.css` (the carved control rules, nested in place — co-owned with §3 in Lane A).
- Sub-gate: no new gate; `npm run build` emits flattened nesting; diff the compiled `dist` CSS selector list before/after to prove specificity is unchanged; `proof:components-css` + `proof:phantom-classes` stay green (no class renamed/dropped).

### AU.W8b.3 dock-controls.css carve

- Goal: `dock.css` keeps shell/density/layer-contract/layout; the five-control family lives in a new `dock-controls.css`, imported after `dock.css` in the same `@layer components`, with a born-RED gate proving the carve.
- Mechanism:
  - **Create `src/styles/dock-controls.css`** — move VERBATIM from `dock.css`, wrapped in the same `@layer components { … }`: the `.dock-icon-button` family (`:730-815` base/`--compact`/hover/active/focus/active-paint), the `.dark-mode-toggle-button` family (`:824-881`), the `.dock-tab-button` family (`:883-1040` incl. `[data-tier="primary"]` audacious halo `::before` `:999-1023` + `[data-tier="secondary"]` `:1025-1040`), the `.dock-select-trigger`/`.dock-dropdown-trigger` family (`:1042-1126` base/hover/active/focus/focus-visible/active-paint/`__chevron`/open-state flip), and the touch-target `@media (pointer: coarse)` floor at `:1180-1199` that styles `.dock-icon-button`.
  - **STAYS in `dock.css`:** the motion-token `:where()` group `:9-27` (shell-level `--dock-motion-*` for the whole family); the shared `:focus-visible` + `:disabled` comma-groups `:36-50` (the cross-control CONTRACT at the import root — references control selectors but is shared, not per-control); shell `:52-89`, density `:91-163`, grain `:165-180`, layer/crossfade contract `:382-479`, layout, the overflow `@media`, the dock-width-math touch floor `:1180-1184`.
  - **`src/styles/index.css:100`** — insert `@import "./dock-controls.css";` directly after `@import "./dock.css";`; update the cascade-order comment block at `:56` to name `dock-controls.css` as rung 6b.
  - No new subpath — `dock-controls.css` ships inside `/styles` via the `index.css` `@import` (confirm `npm run build` inlines `.dock-icon-button` into the `dist` CSS).
  - **`CLAUDE.md` Structure block** — add the `dock-controls.css` line under `styles/`.
- Files: `src/styles/dock-controls.css` (create), `src/styles/dock.css` (modify-carve), `src/styles/index.css` (modify), `CLAUDE.md` (modify), `scripts/proof-dock-controls-split.mjs` (create), `scripts/gates.mjs` + `package.json` (register, orchestrator-merged).
- Sub-gate: `proof:dock-css-split` (NEW, born-RED) green + bite-verified. Author `scripts/proof-dock-controls-split.mjs` on the house template (`scripts/proof-dock-opacity-lockstep.mjs` — comment-strip first, a pure exported detector, a byte-stable JSON artefact via `scripts/gate-output.mjs`, `process.exit(1)` on violation). Assertions: (1) `dock-controls.css` EXISTS and is `@import`ed by `index.css`; (2) comment-strip `dock.css` → NO per-control BASE rule survives (no top-level `.dock-icon-button {` / `.dock-tab-button {` / `.dock-select-trigger {` / `.dock-dropdown-trigger {` / `.dark-mode-toggle-button {` block), EXEMPTING the shared comma-groups (a `:focus-visible,`/`:disabled,` line that also names another control) and the motion `:where(…)` group; (3) comment-strip `dock-controls.css` → each of the five families HAS its base rule. Register in `package.json` (`"proof:dock-css-split": "node scripts/proof-dock-controls-split.mjs"`) + `gates.mjs` (tags `["local","ci","release"]`) ONLY after the move completes (manifest==ci). Bite-check: move one `.dock-icon-button {` back into `dock.css` → RED. Compiled `dist` CSS must be byte-identical modulo within-layer rule order (build + diff).

### AU.W8b.4 Design-idiom localization (12 sites)

- Goal: the 12 non-idiomatic Tailwind arbitrary-value wraps are lifted to generated `@theme` utilities / shared `@utility` recipes (or correctly KEPT + allowlisted for runtime-themed bindings), enforced by a born-RED gate scoped to the two highest-signal wrap forms.
- Mechanism (grounded against HEAD; ≥2-consumer `@utility` rule per the overfitting precept):

  | # | site | fix |
  |---|---|---|
  | 1 | `card/CardDescription.vue:11` `text-[var(--muted-foreground-strong)]` | **PRE-REQ:** ADD `--color-muted-foreground-strong: var(--muted-foreground-strong);` to the `@theme` block in `theme.css` (the bridge is MISSING — base token exists `tokens.css:360`, only `--color-muted-foreground` is bridged `theme.css:73`), THEN lift to `text-muted-foreground-strong`. |
  | 2 | `tabs/TabsTrigger.vue:22` `data-[state=active]:text-[var(--active-tab-color,var(--foreground))]` | **KEEP + allowlist** — `--active-tab-color` is a consumer-set runtime var with a `--foreground` fallback (a legitimate runtime-themed binding, NOT a static `@theme` token). |
  | 3 | `tabs/TabsTrigger.vue:22` `transition-[background-color,color,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]` | shared `@utility transition-control` (full property list) — shared with #11/#12. |
  | 4 | `card/Card.vue:73` `shadow-[var(--shadow-card)]` | `shadow-card`. **`Card.test.ts:70,118` asserts the literal string — UPDATE to `shadow-card` in the SAME commit.** |
  | 5 | `combobox/ComboboxList.vue:24` `w-[200px]` | `w-popover` (add `--width-popover: 200px` to `tokens.css` + `theme.css` bridge IF absent) OR nearest existing sizing utility. |
  | 6 | `carousel/CarouselDots.vue:62` `transition-[background-color,transform,width,height,box-shadow] duration-[var(--duration-fast)]` | `@utility` recipe (its own property list; keep arbitrary if single-site). |
  | 7 | `accordion/AccordionContent.vue:18` `transition-[height,opacity]` | shared `@utility transition-collapse` — shared with #9; VERIFY the lift does not change the `animate-accordion-*` data-state animation. |
  | 8 | `accordion/AccordionTrigger.vue:26` `transition-[color,text-decoration-color,background-color]` | `@utility` recipe or `transition-colors`. |
  | 9 | `collapsible/CollapsibleContent.vue:8` `transition-[height,opacity]` | shared `@utility transition-collapse` (with #7). |
  | 10 | `custom/stacked-icons/StackedIconGroup.vue:16,37` `transition-[transform,box-shadow,opacity] … ease-[var(--spring-snappy)]` | `@utility` recipe binding `--spring-snappy`. |
  | 11 | `toggle/index.ts:33` (CVA) `hover:bg-[var(--glass-bg-quiet)] data-[state=on]:shadow-[var(--glass-shadow-quiet)]` | lift glass-tier wraps to `bg-glass-quiet`/`shadow-glass-quiet` (if bridged) + `transition-control`. |
  | 12 | `select/SelectTrigger.vue:36` `transition-[background-color,border-color,box-shadow,color]` | shared `@utility transition-control` (with #3) or `transition-colors`. |

  - Author shared `@utility` recipes ONCE in `utilities.css` (`@layer components`): `transition-control` (`transition-property: background-color, color, box-shadow, border-color; transition-duration: var(--duration-fast); transition-timing-function: var(--ease-standard);`) and `transition-collapse` (`transition-property: height, opacity`). Mint a `@utility` only where ≥2 sites share the property list (#3/#11/#12 colors; #7/#9 collapse); single-site compound `transition-[…]` is acceptable and the gate does NOT flag it.
  - **LOAD-BEARING `@property` boundary (mwg §3.4):** registered custom properties (`@property`) are **Baseline Newly available since 2024-07-09**. If any design-idiom utility types an INTERPOLATED custom prop, register only per-element animation TARGETS — **NEVER register a design-token color prop (e.g. `--muted-foreground-strong`, `--glass-bg-quiet`, a `--*-color`) as `@property … syntax: "<color>"`**: registration snapshots the resolved color and breaks `light-dark()` re-resolution under a descendant `color-scheme` (mwg crosswalk §3.4 / `component-specific-light-dark-theme`). Keep design-token colors UNregistered. The `--spring-*`/`--ease-*` `linear()` tokens are easing FUNCTIONS (not interpolated values) and need no registration.
- Files: `src/styles/theme.css`, `src/styles/tokens.css`, `src/styles/utilities.css`, the 11 lift SFC/CVA sites above, `src/components/ui/card/__tests__/Card.test.ts`, `scripts/proof-design-idiom-localization.mjs` (create), `scripts/gates.mjs` + `package.json` (register).
- Sub-gate: `proof:design-idiom-localization` (NEW, born-RED) green + bite-verified. Author `scripts/proof-design-idiom-localization.mjs` (house template) — grep every `.vue` template class list + `index.ts` CVA string under `src/components/` for `text-[var(` and `shadow-[var(` (these two highest-signal wrap forms ONLY, per AU-AUGMENT §6.1 — NOT every arbitrary value, so compound `transition-[…]` is unflagged). Must be 0. Encode an explicit `{file, line, var}` allowlist array with a one-line rationale each for legitimate runtime-themed comma-fallback bindings (only #2 `--active-tab-color` at HEAD); a NEW unjustified wrap still reddens. Register `["local","ci"]` after the lifts land. Bite-check: re-inject `text-[var(--muted-foreground-strong)]` into `CardDescription.vue` → RED. `typecheck` + the unit suites stay green (grep for any OTHER test asserting a lifted class string before landing).

### AU.W8b.5 defineModel conversions (8 sites)

- Goal: 8 manual `defineProps`+`defineEmits("update:…")`+watch/emit sites use Vue 3.5 `defineModel` with an identical public prop+event surface and a `v-model` round-trip test per converted SFC.
- Mechanism (mwg §2.2 — framework-level, no Baseline gate; isomorphic per AU-AUGMENT §5.3):

  | # | site | fold |
  |---|---|---|
  | 1 | `ui/multi-select/MultiSelect.vue:37,46,80,85` | `const model = defineModel<string[]>({ default: () => [] })`; replace emits with `model.value = …`. **Match the existing `withDefaults` default exactly** so an uncontrolled mount is identical. |
  | 2 | `custom/tabs/BouncyTabs.vue:24-29,41` | `const model = defineModel<string>()`; bind `v-model` on the inner Tabs. |
  | 3 | `custom/tabs/UnderlineTabs.vue:16-29` | `const model = defineModel<string>()`. |
  | 4 | `custom/tabs/BouncyToggle.vue:57-58,224-226` | `const model = defineModel<string \| string[]>()`. |
  | 5 | `custom/responsive-tabs/ResponsiveTabs.vue:82-84` | `const model = defineModel<string>()`; bind BOTH child controls to `model`. |
  | 6 | `custom/hover-popover/HoverPopover.vue:40-66,145-166` | `const open = defineModel<boolean>("open")`; DELETE the ~10-line dual-watch reconciliation `:156-166`. **Confirm the `keepDockOpen` token acquisition still fires on the `defineModel` setter path — the dock-keep contract must not regress.** |
  | 7 | `ui/data-table/DataTable.vue:62-65` | `const page = defineModel<number>("page")` for the page model ONLY; **KEEP `update:sort` as a plain emit — it carries `{key,direction}`, is an EVENT not a two-way model. Verify against a consumer which is actually `v-model`-bound before converting.** |
  | 8 | `custom/configurator/ConfiguratorLayer.vue:69-91` | `const open = defineModel<boolean>("open")` (controlled mode). |

  - Per the MEMORY binding-verification note (stale reka-ui bindings silently no-op; vue-tsc passes): each converted SFC that forwards to a reka-ui primitive MUST keep the inner `v-model` wired; ADD a `v-model` round-trip unit test where one is missing, asserting the model updates on inner change.
- Files: the 8 SFCs above + their `__tests__/` round-trip tests.
- Sub-gate: no new gate. `proof:strict-templates` (`checkUnknownProps:true` — a renamed/dropped prop is RED) + `npm run typecheck` (`defineModel` generates the prop+emit; the binding surface is type-verified) + each converted SFC's `v-model` round-trip test green.

### AU.W8b.6 Readonly context guards

- Goal: the dock layer-context exposes its layer-id refs as `Readonly<Ref<…>>` (read at the type AND provided as `readonly()` at runtime) so a `<DockLayer>` child can never write the group-orchestrated state; a negative `@ts-expect-error` test proves the write fails to compile.
- Mechanism (type-only, zero-runtime; AU-AUGMENT §5.3):
  - **`dock/composables/dockLayerContext.ts:20-25`** — change `currentLayerId: Ref<string>` → `Readonly<Ref<string>>` and `leavingLayerId: Ref<string | null>` → `Readonly<Ref<string | null>>` on `DockLayerGroupContext`.
  - **`DockLayerGroup.vue` provide site** — wrap the provided refs with `readonly(…)` from `vue` (the group keeps its OWN mutable refs internally and provides the readonly view; if it currently mutates the same ref it provides, split into private-mutable + provided-readonly). `useLayerTransition` returns `currentLayer`/`leavingLayer` refs (`:201`) the group wires INTO the context — confirm the composable's own refs stay WRITABLE (it owns the transition state); only the context projection is `readonly()`.
  - **`dock/composables/dockContext.ts:27-36`** — AUDIT only: `keepOpen`/`release` are functions (safe), `held` is a `ComputedRef` (already read-only). The AU-AUGMENT §5.3 note is about NOT leaking the internal `keepOpenCount` mutable ref — verify the `provideDockContext` call site in `GlassDock.vue` leaks no mutable ref; if it does, drop it. If nothing leaks, record the no-op confirmation in `PROGRESS.md`, do NOT invent a change.
- Files: `src/components/custom/dock/composables/dockLayerContext.ts`, `src/components/custom/dock/DockLayerGroup.vue`, `src/components/custom/dock/composables/dockContext.ts` (audit), a `.test-d.ts`/type-only fixture.
- Sub-gate: no new gate. `npm run typecheck` makes a `<DockLayer>` write to `currentLayerId.value` a RED type error; ADD a `// @ts-expect-error` negative-assertion test proving the write fails to compile (the bite-check); the `dockContext.ts` no-leak audit recorded in `PROGRESS.md`.

### AU.W8b.7 Deprecated -webkit re-grounding

- Goal: the deprecated `-webkit-*` cleanup is re-grounded against HEAD — the load-bearing feature-tests are KEPT and recorded, with no stale-line-number strip.
- Mechanism (the AU-AUGMENT §5.4 line citations are STALE; all three sites re-grounded against HEAD):
  - **`glass.css:326` `-webkit-backdrop-filter`** — appears INSIDE `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))`. This is a CORRECT defensive feature-query (tests for absence of BOTH the standard and prefixed property to gate the no-blur fallback), NOT a deprecated raw paint property. **KEEP** — removing the `-webkit-` arm would mis-gate Safari ≤15 (prefixed-only). Record the re-grounding.
  - **`utilities.css:111-137` scrollbar family** — ALREADY guarded under `@supports not (scrollbar-color: auto)` (`:125`) with `scrollbar-color` as the primary path (`:116-123`). `scrollbar-color` is **Baseline Newly available since 2025-12-12** (mwg crosswalk §3.3 / `dark-mode` corpus) — only ~6 months Baseline (reached Safari 26.2, Dec 2025). Because it is **Newly, NOT Widely**, any "Widely Available" Baseline target MUST keep the `@supports not(...)`-guarded `::-webkit-scrollbar` — the corpus DIRECTLY ratifies KEEP and corrects the AU-AUGMENT strip impulse. **KEEP.** Additional corpus note: do NOT animate/transition `scrollbar-color` (a WebKit flicker bug); on macOS pair with `scrollbar-width`. The "one real fold" — `scrollbar-width: none` on `.scrollbar-hidden` — is **ALREADY PRESENT at HEAD (`utilities.css:109`)**; verify it is there and record (no edit needed; the prior spec assumed it was missing).
  - **Raw `rgb(255 255 255)` → `--highlight-overlay`** — the HEAD grep finds ZERO raw `rgb(255 255 255)`/`rgb(255,255,255)` in `src/styles/`. No-op; the AU-AUGMENT site is stale (already token-ized). Record.
  - **`utilities.css:334` `-webkit-background-clip: text`** — load-bearing (rainbow-text / clip-to-text recipe). **KEEP** (AU-AUGMENT explicitly says keep).
- Files: `src/styles/utilities.css` (verify-only; no live edit expected), `docs/tranches/AU/PROGRESS.md` (record the four re-groundings). Co-owned with Lane B (`utilities.css`) — sequence after AU.W8b.4's `@utility` authoring.
- Sub-gate: no new gate. `proof:components-css` + `npm run build` stay green. The four re-groundings (glass.css:326 KEEP, scrollbar already-guarded + `scrollbar-width:none` already-present, no raw rgb, background-clip KEEP) recorded in `PROGRESS.md` with the `scrollbar-color` Baseline date (2025-12-12) cited so the FINAL does not re-flag the strip.

### AU.W8b.8 Dock-popover anchor-positioning

- Goal: a supporting engine tethers the dock's portaled popover content via native `anchor()` (`@supports`-gated), with reka-ui's floating-ui path as the unconditional fallback — OR §8 is formally BOOKed if the single-active-popover / reka-positioner-yield invariant fails.
- Mechanism (AU-AUGMENT §2.4 "anchor positioning ADOPT"; mwg crosswalk §2.1 — anchor positioning is **NOT Baseline, no major browser natively**, so floating-ui stays primary and `anchor()` is the `@supports`-gated enhancement; proven recipe at `UnderlineTabs.vue:55-90`):
  - **`dock-controls.css` (post-§3)** — add `@supports (anchor-name: --x)`: `.dock-select-trigger, .dock-dropdown-trigger { anchor-name: var(--dock-popover-anchor, --gl-dock-popover); }` and `[data-glass-dock-portal][data-dock-anchored] { position-anchor: var(--dock-popover-anchor, --gl-dock-popover); inset-block-start: anchor(bottom); inset-inline-start: anchor(left); position-try-fallbacks: flip-block; }`. `data-glass-dock-portal` ALREADY exists at HEAD (set on `SelectContent.vue:43`/`DropdownMenuContent.vue:35`/`PopoverContent.vue` when a dock context is present — `isTeleportedTarget.ts:14`); `data-dock-anchored` is a NEW opt-in attr to ADD on the content components.
  - **Scope guard — VERIFY the single-active-popover invariant before landing.** The fold is correct only when each dock has ONE active popover at a time (the dock-keep contract enforces this). If a dock can open two popovers simultaneously, `anchor-name` must be per-trigger-unique. If the invariant does not hold → BOOK §8 (floating-ui ships unchanged).
  - **Double-position risk (binding).** A supporting engine must NOT run BOTH floating-ui's inline transform AND native `anchor()`. reka-ui sets inline `transform`/`translate` on the content; the native `inset` composes with it → drift. The `[data-dock-anchored]` opt-in is set ONLY where the consumer wants native anchoring AND disables reka-ui's positioner. If reka-ui's positioner cannot be yielded per-content → §8 becomes a BOOK item per §3a; floating-ui ships unchanged.
- Files: `src/styles/dock-controls.css` (append the `@supports` block — Lane A, serial after §3), `src/components/custom/dock/DockSelectTrigger.vue`, `src/components/custom/dock/DockDropdownTrigger.vue` (add `data-dock-anchored`).
- Sub-gate: no new gate. The `@supports` fallback to reka-ui's floating-ui path is the unconditional behavior. `proof:components-css` (no class drop) green; manual browser verify in `PROGRESS.md` (a supporting engine tethers natively, a non-supporting engine keeps floating-ui, NO double-position; common bottom-anchored Select/Dropdown placements match floating-ui). If parity/yield fails, BOOK and record.

## 6. Hard Gate

W8b closes when every condition below is evidence-backed:

1. **AU.W8b.1** — `dock.css` carries the `@supports (transition-behavior: allow-discrete)` arm + `@starting-style` (`allow-discrete` on a SEPARATE `transition-behavior` declaration) and the `@supports (interpolate-size: allow-keywords)` arm with `width: calc-size(auto, size)`; the FLIP fixed-pixel + hand-rolled 3-state fallback is byte-unchanged; the `AU.W8b-visibility-fork` comment marker is present; manual browser verify (Chrome 131+/Safari 18.4+/Firefox 141+) confirms lockstep settle + no VT double-animate, recorded in `PROGRESS.md`.
2. **AU.W8b.2** — dock control rules use native `&`-nesting; the compiled `dist` CSS selector specificity is unchanged (before/after selector-list diff).
3. **AU.W8b.3** — `proof:dock-css-split` (`node scripts/proof-dock-controls-split.mjs`) GREEN + bite-verified (move a `.dock-icon-button {` rule back into `dock.css` → RED); `dock-controls.css` exists, `@import`ed after `dock.css` in `@layer components`; `dist` CSS byte-identical modulo within-layer order; `CLAUDE.md` Structure block names it. Registered in `package.json` + `gates.mjs` (`["local","ci","release"]`) only after the move (manifest==ci; `verifyCi()` passes).
4. **AU.W8b.4** — `proof:design-idiom-localization` (`node scripts/proof-design-idiom-localization.mjs`) GREEN + bite-verified (re-inject `text-[var(--muted-foreground-strong)]` → RED); all 12 sites lifted or allowlisted (only #2 `--active-tab-color` allowlisted); `theme.css` carries the `--color-muted-foreground-strong` bridge; `Card.test.ts:70,118` assert `shadow-card`; no design-token color is `@property`-registered as `<color>`. Registered `["local","ci"]` after the lifts.
5. **AU.W8b.5** — 8 `defineModel` conversions land; each converted SFC has a `v-model` round-trip unit test (added where missing); `update:sort` on DataTable stays a plain emit; `HoverPopover` `keepDockOpen` does not regress; `npm run typecheck` + `proof:strict-templates` GREEN.
6. **AU.W8b.6** — `dockLayerContext.ts` refs are `Readonly<Ref<…>>` with `readonly()` at the provide site; a `// @ts-expect-error` negative write test compiles-fails; the `dockContext.ts` no-leak audit recorded in `PROGRESS.md`; `npm run typecheck` GREEN.
7. **AU.W8b.7** — the four re-groundings recorded in `PROGRESS.md` (glass.css:326 KEEP feature-test; scrollbar already `@supports not(scrollbar-color)`-guarded + `scrollbar-width: none` already present at `utilities.css:109`; no raw `rgb(255 255 255)`; `-webkit-background-clip: text` KEEP) with the `scrollbar-color` Baseline date (2025-12-12) cited; `proof:components-css` GREEN.
8. **AU.W8b.8** — the `@supports (anchor-name: --x)` recipe landed in `dock-controls.css` with `data-dock-anchored` opt-in + floating-ui unconditional fallback AND the single-active-popover + reka-positioner-yield invariants verified (manual browser, no double-position), OR §8 formally BOOKed with rationale in `PROGRESS.md`; `proof:components-css` GREEN.
9. **No regression.** The existing gate matrix stays GREEN through W8b: `proof:dock-opacity-lockstep`, `proof:dock-motion-parity`, `proof:components-css`, `proof:phantom-classes`, `proof:strict-templates`, `proof:vueuse-free-root`, `npm run typecheck`, `npm run build`, the component unit suites. `PROGRESS.md` records the wave with a green run id; no `src` edit regresses an existing gate.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:design-idiom-localization` | `scripts/proof-design-idiom-localization.mjs` | `["local","ci"]` | re-inject `text-[var(--muted-foreground-strong)]` → RED |
| `proof:dock-css-split` | `scripts/proof-dock-controls-split.mjs` | `["local","ci","release"]` | move a `.dock-icon-button {` rule back into `dock.css` → RED |

Both follow the house gate template (`scripts/proof-dock-opacity-lockstep.mjs`): comment-strip first (false-witness discipline), a pure exported detector, a byte-stable JSON artefact via `scripts/gate-output.mjs` (`gateArtifactPath`/`writeGateArtifact`/`snapshotStamp`), a human summary, `process.exit(1)` on any violation. Register in `package.json` scripts + `gates.mjs` manifest ONLY after their fold is complete (`verifyCi()` enforces manifest==ci; do not register a born-RED gate against an un-folded file).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after AU.W8b.5 and AU.W8b.6 land, and at close.
- `npm run build` — after each CSS lane batch (AU.W8b.1/.3 carve + AU.W8b.4 utility authoring) to confirm Lightning CSS emits flat nesting + inlines `dock-controls.css`, and at close.
- The two NEW gates (`proof:dock-css-split`, `proof:design-idiom-localization`) + the no-regression existing-gate matrix run after their fold completes and at close.
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`) at close.
- The component unit suites (`__tests__/`) run after AU.W8b.4 (the `Card.test.ts` assertion update) and AU.W8b.5 (the `v-model` round-trip tests).

No formatter is intentionally skipped; the gate fleet is the binding evidence for the CSS/template folds.

## 8. Verification Artefacts

- `proof:dock-css-split` JSON artefact (byte-stable, via `scripts/gate-output.mjs`) — the gate output path under the repo gate-artefact dir.
- `proof:design-idiom-localization` JSON artefact — same.
- Compiled `dist` CSS selector-list diff (before/after §2 nesting + §3 carve) proving specificity + byte-identity modulo within-layer order — recorded/linked in `PROGRESS.md`.
- Manual browser-verify notes (AU.W8b.1 lockstep + no-VT-double-animate; AU.W8b.8 native-tether + no-double-position) — `docs/tranches/AU/PROGRESS.md`.
- The `dockContext.ts` no-leak audit + the four §7 re-groundings + (if applicable) the §8 BOOK rationale — `docs/tranches/AU/PROGRESS.md`.
- The green CI run id for the wave — `PROGRESS.md`.
- The integration commit hashes (per §9).

## 9. Commit Plan

- **Lane A (dock-CSS) implementation commits** — `style(tranche-AU): W8b — visibility-fork native fold (@supports interpolate-size/@starting-style/allow-discrete)`; `refactor(tranche-AU): W8b — carve dock-controls.css from dock.css + native nesting`; `feat(tranche-AU): W8b — dock-popover anchor-positioning (@supports-gated, floating-ui fallback)`. (Body required for the carve — names the moved control families + the cascade-order change.)
- **Lane B (design-idiom) implementation commits** — `style(tranche-AU): W8b — lift 12 non-idiomatic Tailwind wraps to @theme utilities + @utility recipes`; `docs(tranche-AU): W8b — record -webkit re-groundings`. (Body required for the lift — enumerates the sites + the `Card.test.ts` assertion update.)
- **Lane C (framework) implementation commits** — `refactor(tranche-AU): W8b — defineModel ×8 + v-model round-trip tests`; `refactor(tranche-AU): W8b — Readonly<> dock layer-context guards + @ts-expect-error fixture`.
- **Orchestrator gate-registration commit** — `chore(tranche-AU): W8b — register proof:dock-css-split + proof:design-idiom-localization (born-RED, manifest==ci)`. (Body required — gate change; names the manifest rows + tags.)
- **Orchestrator integration + docs commit** — `docs(tranche-AU): W8b close — PROGRESS green run id + CLAUDE.md dock-controls.css line + browser-verify + re-groundings`. (Body required — status/close.)

## 10. Dependencies

- **Depends on**: AU.W8 (the dock-motion FLIP single-frame sync at `useLayerTransition.ts:146→167`, the `--spring-dock` author, the keyframes.js `AnimationGroup` driver, the reka-ui `Tabs` rail, the a11y contract, the dock README vocabulary) — W8 lands FIRST and must be green; AU.W8b.1 REPLACES the JS measure/pin dance W8 leaves in place and must NOT land before W8's FLIP sync is committed (the two motion fixes would collide in review). The `modern-web-guidance-crosswalk.md` §3 Baseline decision-changes (folded throughout).
- **Blocks**: nothing publish-blocking (W8b is non-publish-blocking IMPL); the AU tranche FINAL/close depends on W8b's gate matrix being green.

## 11. Archaeology

Not a re-attempt of a prior failed wave. Three HEAD-grounding corrections fold into the units (NOT prior-failure archaeology — they correct STALE AU-AUGMENT line citations / loose Baseline claims):

1. **§1 Baseline claim corrected.** The prior draft's risk note called `calc-size(auto, size)` "Baseline 2024"; per `modern-web-guidance-crosswalk.md` §3.5, `interpolate-size`/`calc-size()` are **limited availability (Chrome/Edge 129 only), NOT Baseline** — the `@supports` gate is mandatory correctness. `@starting-style`/`transition-behavior` ARE Baseline (Newly 2024-08-06).
2. **§7 scrollbar fold already-present.** The prior draft directed ADDING `scrollbar-width: none` to `.scrollbar-hidden`; at HEAD it is already present (`utilities.css:109`). The §7 work is verify-and-record, not edit. `scrollbar-color` is Newly-Baseline 2025-12-12 (mwg §3.3) → the guarded `::-webkit-scrollbar` is KEPT, not stripped.
3. **§7 `-webkit-backdrop-filter` / raw-rgb sites stale.** The AU-AUGMENT §5.4 line citations are stale; the HEAD audit found `glass.css:326` is a load-bearing feature-test predicate (KEEP) and zero raw `rgb(255 255 255)` in `src/styles/` (already token-ized). Record the re-groundings so the FINAL does not re-flag them.
