# AU.W8b — Modern-CSS + encapsulation/styling folds

**Type:** IMPL (lands just after the W8 motion+a11y+vocab atomic commit; non-publish-blocking).
**Scope source:** `docs/tranches/AU/AU-AUGMENT.md` §2.4 (modern-CSS adopt/defer), §5.3–5.4
(encapsulation + styling folds), §6.1 (gate fleet). This file is the FULLY-formed, execute-without-
re-deriving spec for W8b. Every item below carries the exact files, the change, the gate, the risk.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks). Gestalt transposition, not
patch. KISS — fold complexity out, do not add abstraction. value.js-FREE dock driver (W8b touches no
runtime JS color path; the `interpolate-size` work is CSS-only). Isomorphic styling — every visual
axis stays a `var(--…)` token; no behavior change from any styling fold.

**Sequencing relative to W8.** W8 lands FIRST (the FLIP single-frame sync at
`useLayerTransition.ts:146→167`, the `--spring-dock` author, the keyframes.js `AnimationGroup`
driver, the reka-ui `Tabs` rail, the a11y contract, the dock README vocabulary). W8b assumes W8 is
green. **The `interpolate-size` + `@starting-style` fold in §1 REPLACES the JS measure/pin dance W8
leaves in place** — do NOT land §1 before W8's FLIP sync is committed, or the two motion fixes
collide in review. Order WITHIN W8b: §1 (the visibility-fork fold, highest-value + highest-risk)
→ §2 (CSS nesting) → §3 (dock.css split) → §4 (non-idiomatic Tailwind) → §5 (defineModel) →
§6 (Readonly guards) → §7 (deprecated -webkit) → §8 (anchor-positioning). §3 and §4 each have a
born-RED gate; author both gates LAST in their item so CI stays green until the fold is complete.

**Two binding gates for this wave (born-RED):** `proof:design-idiom-localization` (§4) +
`proof:dock-css-split` (§3). Both are added to `scripts/gates.mjs` and `package.json` only after
their fold is complete (manifest==ci invariant; AU.W1c-registered, ABSENT from `gates.mjs` until
their wave per §6.1).

---

## §1 — Fold the visibility fork: `interpolate-size` + `@starting-style` + `allow-discrete` on `.dock-layer`

**The headline W8b fold.** `interpolate-size: allow-keywords` + `width: calc-size(auto)` lets
`.dock-layers` transition to an `auto` width natively, eliminating the JS measure/pin/re-pin dance
that is the ROOT of the async gap (`AU-AUGMENT.md` §2.1). `@starting-style` +
`transition-behavior: allow-discrete` on `.dock-layer` folds the three-way visibility fork into one
discrete-animated property so visibility flips in lockstep with opacity. The proven recipe is the
top-layer grammar at `src/styles/animations.css:325-366` (gated on `@supports (overlay: auto)`).

### Files + change

**`src/styles/dock.css:382-386`** — the `.dock-layers` container width transition. Currently:

```css
.dock-layers {
    display: grid;
    min-width: 0;
    transition: width var(--dock-motion-resize);
}
```

Wrap the native path in an `@supports` block; keep the bare `transition: width …` as the fallback
(the FLIP path measures fixed pixels and needs no `interpolate-size`):

```css
.dock-layers {
    display: grid;
    min-width: 0;
    transition: width var(--dock-motion-resize);
}
@supports (interpolate-size: allow-keywords) {
    .dock-layers {
        interpolate-size: allow-keywords;
    }
    /* The active layer carries the intrinsic-width destination; the browser
       interpolates the current computed width → calc-size(auto) natively, so
       the container morph needs no JS pin/measure. */
    .glass-dock.expanded > .dock-layers,
    .dock-layer-group .dock-layer-item-host.is-active {
        width: calc-size(auto, size);
    }
}
```

**`src/styles/dock.css:424-460`** — the layer crossfade + hit-test contract. Currently three rule
blocks (`:424-429` shared transition, `:431-436` inactive, `:438-450` active, `:456-460` leaving)
hand-roll the visibility fork via `visibility 0s linear var(--duration-normal)` (delayed) vs
`visibility 0s` (immediate). Fold into the discrete-animated pattern, gated on
`@supports (transition-behavior: allow-discrete)`. **The base rules `:424-460` STAY AS-IS as the
fallback** (a non-supporting engine keeps the proven hand-rolled fork). Append a supports-gated
override that expresses the same three-state contract as one discrete transition:

```css
/* AU.W8b — modern-CSS fold of the §2.1 visibility fork. allow-discrete makes
   `visibility` flip at the START of the crossfade for the active layer and at
   the END for the leaving layer (the discrete property interpolates as a
   start/end keyframe), so the 3-state hit-test contract holds with ONE
   transition expression instead of the delayed-vs-immediate split. @starting-style
   anchors the first-swap entry so the fade is deterministic (closes the
   no-entry-state root cause, AU-AUGMENT §2.1 third bullet). LOAD-BEARING: the
   active layer must paint at once + leaving must stay hit-testable through the
   fade — do NOT collapse to a single visibility value. */
@supports (transition-behavior: allow-discrete) {
    .dock-layer,
    .dock-layer-item-host {
        transition-property: opacity, visibility;
        transition-duration: var(--dock-motion-resize); /* opacity rides the morph spring */
        transition-behavior: allow-discrete;
    }
    .dock-layer.layer-active,
    .dock-layer-item-host.is-active {
        opacity: 1;
        visibility: visible;
        @starting-style {
            opacity: 0;
            visibility: hidden;
        }
    }
}
```

**Comment flag (a11y-006, AU-AUGMENT §6).** Prepend the existing `:424` contract comment with an
`AU.W8b-visibility-fork` marker so the three-state semantics are not accidentally collapsed in a
later refactor. The marker is the bite-anchor the a11y reviewer greps for.

### Gate

- `proof:dock-opacity-lockstep` (`scripts/proof-dock-opacity-lockstep.mjs`, W8-demoted to
  "syntactic") MUST still pass — the static same-token assertion is unaffected (opacity still rides
  `--dock-motion-resize` in both the fallback and the `@supports` arm).
- `proof:dock-motion-parity` (`scripts/proof-dock-motion-parity.mjs`, `gates.mjs:43`) MUST still see
  BOTH engines on `--dock-resize-spring` (the `@supports` arm does not change the timing token).
- **Manual browser verify (non-CI, recorded in PROGRESS):** Chrome 131+/Safari 18.4+/Firefox 141+ —
  collapse+expand the dock; confirm the container width and child opacity settle in lockstep and the
  FLIP `nextTick`+`rAF` width pin from `useLayerTransition.ts:150-170` does NOT double-fire on a
  VT-supporting engine (the §1 caveat).

### Risk

- **Double-animate with the View-Transitions path (AU-AUGMENT §2.4 caveat + §6 isomorphism risk).**
  On an engine that supports BOTH VT and `interpolate-size`, the `::view-transition-group(.gl-dock-layer)`
  morph (`view-transition.css:47-62`) AND the `.dock-layers` CSS width transition can run in parallel
  → visible double-morph. **Mitigation:** the `interpolate-size` width destination only applies to
  `.glass-dock.expanded > .dock-layers` / `.is-active`; on the VT path `useLayerTransition.ts:121-133`
  mutates state inside `startViewTransition` and the VT pseudo owns the painted morph. Verify in the
  manual browser pass that the painted `.dock-layers` width does not visibly diverge from the VT
  snapshot. If it does, gate the `@supports (interpolate-size…)` width rule OFF when a VT is in flight
  (a `:where(.glass-dock:not([data-vt-active])) ` guard driven by a `data-vt-active` attr the composable
  sets — DEFER this only if divergence is observed).
- **`calc-size()` Baseline.** `calc-size(auto, size)` is Chrome 131+/Edge 131+/Safari 18.4+/Firefox
  141+ (Baseline 2024). The `@supports (interpolate-size: allow-keywords)` guard is the correct
  feature-test (a non-supporting engine keeps the FLIP fixed-pixel path verbatim).
- **The visibility fork is LOAD-BEARING (a11y-006, F4, F9).** The `@supports` arm MUST preserve:
  active paints immediately, leaving stays hit-testable through the fade, inactive leaves both paint
  and hit-test trees. The `allow-discrete` + `@starting-style` expression above does this BY
  CONSTRUCTION (discrete `visibility` flips at animation start/end); the fallback `:424-460` is
  untouched. Test both the supports arm and the fallback preserve the contract.

---

## §2 — CSS nesting (dock.css refactor, P2)

**Readability only; zero behavior change** (AU-AUGMENT §2.4 row "CSS nesting"). Pairs with the
dock.css split (§3) — apply nesting AS the controls family moves so the diff is one pass, not two.

### Files + change

**`src/styles/dock.css`** (and `dock-controls.css` after §3) — collapse the repeated
`.dock-icon-button` / `.dock-tab-button` / `.dock-select-trigger` selector prefixes into nested
blocks where the parent+state rules are adjacent. Example, the icon-button cluster
(`dock.css:730-815`):

```css
/* BEFORE — flat repetition */
.dock-icon-button { … }
.dock-icon-button:hover:not(:disabled) { … }
.dock-icon-button:active:not(:disabled) { … }
.dock-icon-button:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) { … }

/* AFTER — native nesting (Baseline 2023) */
.dock-icon-button {
    /* base */
    &:hover:not(:disabled) { … }
    &:active:not(:disabled) { … }
    &:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) { … }
}
```

**Constraints:**
- Do NOT nest the shared `:focus-visible` / `:disabled` comma-group (`dock.css:36-50`) into any one
  control — it is deliberately a cross-control group at full specificity (the comment at `:29-35`
  forbids `:where()` flattening; nesting it under one selector would change which control it covers).
- Keep the density `[data-density]` blocks (`:91-148`) flat — they set token cohorts, not nested
  states; nesting buys nothing and obscures the ordinal ladder.
- Do NOT change any selector's resulting specificity. Native nesting with `&` preserves it; verify
  by diffing the compiled output (`npm run build` → grep the emitted dock CSS for the same
  selector list).

### Gate

No new gate. Covered transitively: `proof:components-css` (`gates.mjs:36`) + `proof:phantom-classes`
(`gates.mjs:41`) must stay green (no class renamed, no utility dropped). The §3 split gate
(`proof:dock-css-split`) and the build must pass.

### Risk

- **Specificity drift.** Native `&`-nesting preserves specificity, but a careless nest of a
  `.parent .child` descendant under `&` changes it. Diff the compiled CSS selector list before/after.
- **PostCSS/Lightning CSS support.** The repo builds Tailwind v4 (Lightning CSS) which supports native
  nesting; no `postcss-nesting` plugin needed. Confirm the build emits flattened nesting (it does for
  v4) — if a target engine in the support matrix lacks native nesting, Lightning CSS down-compiles it
  at build time, so the shipped `dist` CSS is already flat. No runtime nesting reaches consumers.

---

## §3 — Split `dock.css` → `dock.css` + `dock-controls.css`

**The monolith fold** (AU-AUGMENT §5.4). `dock.css` is 1200 lines; the control family (five control
types) spans `:730-1126` (51 rule occurrences). Carve the control family into `dock-controls.css`;
`dock.css` keeps the shell, density tiers, layer/crossfade contract, and layout.

### Files + change

**New file `src/styles/dock-controls.css`** — move these rule blocks verbatim from `dock.css`:
- `.dock-icon-button` family — `dock.css:730-815` (base, `--compact`, hover, active, focus, active-paint).
- `.dark-mode-toggle-button` family — `dock.css:824-881` (base, svg, hover/focus, sizes, dock-size carve).
- `.dock-tab-button` family — `dock.css:883-1040` (base, hover, active, focus, active-paint,
  `[data-tier="primary"]` audacious halo `::before` `:999-1023`, `[data-tier="secondary"]` `:1025-1040`).
- `.dock-select-trigger` / `.dock-dropdown-trigger` family — `dock.css:1042-1126` (base, hover, active,
  focus, focus-visible, active-paint, `__chevron`, open-state chevron flip).

Wrap the moved rules in the same `@layer components { … }` block dock.css uses (so cascade layering
is identical). **The touch-target floor `@media (pointer: coarse)` at `dock.css:1180-1199`** styles
`.dock-icon-button` — it MOVES with the controls into `dock-controls.css` (it is a control-family
rule, and the gate in this section asserts no `.dock-icon-button` rule survives in `dock.css`).

**STAYS in `dock.css`:**
- The motion-token `:where()` group `:9-27` — it defines `--dock-motion-*` for the WHOLE family
  (controls inherit it from a `.glass-dock` ancestor); it is shell-level, not a control rule.
- The shared `:focus-visible` + `:disabled` comma-groups `:36-50` — they are the cross-control
  contract at the import ROOT (AU-AUGMENT §5.4 "keeping the shared contract at the import root"). They
  reference the control selectors but are a shared CONTRACT, not a per-control rule; `proof:dock-css-split`
  must allow these (see gate below — the assertion targets per-control BASE rules, not the shared group).
- Shell (`:52-89`), density (`:91-163`), grain (`:165-180`), layer/crossfade contract (`:382-479`),
  layout, the overflow `@media`, the touch floor for the dock width-math `:1180-1184`.

**`src/styles/index.css:100`** — insert the new import directly after `dock.css`:

```css
@import "./dock.css";
@import "./dock-controls.css";   /* AU.W8b — control family carved from dock.css */
```

Update the cascade-order comment block at `index.css:56` to name `dock-controls.css` as rung 6b.

**`package.json` exports / the `/styles` bundle** — no new subpath. `dock-controls.css` ships inside
the unified `/styles` bundle via the `index.css` `@import` (same as every other rung); confirm the
build inlines it (`npm run build` → grep `dist` CSS for `.dock-icon-button`).

**`CLAUDE.md` Structure block** — add the `dock-controls.css` line under `styles/` (the dock.css line
notes the split). DOCS-edit, not src; lands with this wave.

### Gate — `proof:dock-css-split` (NEW, born-RED)

**Author `scripts/proof-dock-controls-split.mjs`** following the house template
(`scripts/proof-dock-opacity-lockstep.mjs` — comment-strip first, a pure exported detector, a
byte-stable JSON artefact via `scripts/gate-output.mjs`, `process.exit(1)` on violation). Assertions:

1. `src/styles/dock-controls.css` EXISTS and is `@import`ed by `src/styles/index.css`.
2. Comment-strip `dock.css`; assert NO per-control BASE rule survives — grep for a top-level
   `.dock-icon-button {`, `.dock-tab-button {`, `.dock-select-trigger {`, `.dock-dropdown-trigger {`,
   `.dark-mode-toggle-button {` selector-block. **Exempt** the shared comma-groups (a line matching
   `:focus-visible,` or `:disabled,` that also names another control) and the motion `:where(…)`
   group — the assertion is per-control BASE-rule presence, not any mention of the class name.
3. Comment-strip `dock-controls.css`; assert each of the five control families HAS its base rule
   present (the move landed, not deleted).

**Register** in `package.json` scripts (`"proof:dock-css-split": "node scripts/proof-dock-controls-split.mjs"`)
and `scripts/gates.mjs` manifest (tags `["local","ci","release"]`) — ONLY after the move is complete
(manifest==ci; do not register a born-RED gate against an un-split file).

**Bite-check:** move one `.dock-icon-button {` rule back into `dock.css` → gate RED.

### Risk

- **Cascade order.** The control rules MUST stay in `@layer components` and import AFTER `dock.css`
  so any control rule that relied on source order within the layer keeps it. Lightning CSS merges
  `@layer components` across files by import order — `dock-controls.css` after `dock.css` preserves it.
- **The shared contract group is NOT moved.** `dock.css:36-50` stays; the gate's exemption (assertion
  2) must correctly distinguish the shared comma-group from a per-control base rule, or it false-RED on
  the legitimate shared contract. Test the exemption with the real `dock.css:36-42` text.
- **No behavior change.** This is a file move; the compiled `dist` CSS must be byte-identical modulo
  rule ordering within the layer. Verify with a build + diff.

---

## §4 — Non-idiomatic Tailwind lift (the 12 sites)

**Mechanical, zero behavior change** (AU-AUGMENT §5.4). `text-[var(--…)]` / `shadow-[var(--…)]` /
compound `transition-[…]` / fixed-px arbitrary-value classes bypass the `@theme` utility layer; lift
them to generated utilities. The canonical cascade is `tokens.css → theme.css → utilities.css →
scoped CSS` — every token a wrap references already has a `@theme` bridge.

### Files + change (grounded against HEAD)

| # | site | current (anti-pattern) | fix |
|---|---|---|---|
| 1 | `src/components/ui/card/CardDescription.vue:11` | `text-[var(--muted-foreground-strong)]` | `text-muted-foreground-strong`. **PRE-REQ:** the bridge is MISSING — `--muted-foreground-strong` exists as a base token (`tokens.css:360`) but `theme.css` only bridges `--color-muted-foreground` (`:73`), NOT `…-strong`. ADD `--color-muted-foreground-strong: var(--muted-foreground-strong);` to the `@theme` block in `src/styles/theme.css` (alongside `:73`), THEN the `text-muted-foreground-strong` utility generates and the lift is valid. |
| 2 | `src/components/ui/tabs/TabsTrigger.vue:22` | `data-[state=active]:text-[var(--active-tab-color,var(--foreground))]` | keep as-is IF no `@theme` token exists for the dynamic `--active-tab-color` fallback; else lift. **Verify**: `--active-tab-color` is a consumer-set runtime var with a `--foreground` fallback — this is a legitimate runtime-themed binding, NOT a static token. **KEEP** (the gate must allowlist a comma-fallback arbitrary value; see gate note). |
| 3 | `src/components/ui/tabs/TabsTrigger.vue:22` | `transition-[background-color,color,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]` | `@utility` recipe (a named `transition-control` utility in `utilities.css`) OR `transition-colors duration-fast ease-standard` if the property list matches a generated utility. |
| 4 | `src/components/ui/card/Card.vue:73` | `shadow-[var(--shadow-card)]` | `shadow-card` (theme.css shadow bridge). **Note:** `Card.test.ts:70,118` asserts the literal `shadow-[var(--shadow-card)]` string — UPDATE the test to assert `shadow-card`. |
| 5 | `src/components/ui/combobox/ComboboxList.vue:24` | fixed `w-[200px]` | `w-popover` sizing token (add `--width-popover: 200px` to `tokens.css` + `theme.css` bridge IF absent) OR the nearest existing sizing utility. |
| 6 | `src/components/ui/carousel/CarouselDots.vue:62` | `transition-[background-color,transform,width,height,box-shadow] duration-[var(--duration-fast)]` | `@utility` recipe (named transition utility) |
| 7 | `src/components/ui/accordion/AccordionContent.vue:18` | `transition-[height,opacity]` | `@utility` recipe (named `transition-collapse`) OR keep IF property-pair has no generated equivalent — these animate alongside `animate-accordion-*` keyframes; **verify** the lift does not change the data-state animation. |
| 8 | `src/components/ui/accordion/AccordionTrigger.vue:26` | `transition-[color,text-decoration-color,background-color]` | `@utility` recipe or `transition-colors` |
| 9 | `src/components/ui/collapsible/CollapsibleContent.vue:8` | `transition-[height,opacity]` | same as #7 (shared `transition-collapse` utility) |
| 10 | `src/components/custom/stacked-icons/StackedIconGroup.vue:16,37` | `transition-[transform,box-shadow,opacity] … ease-[var(--spring-snappy)]` | `@utility` recipe binding `--spring-snappy` |
| 11 | `src/components/ui/toggle/index.ts:33` (CVA string) | `transition-[…] hover:bg-[var(--glass-bg-quiet)] data-[state=on]:shadow-[var(--glass-shadow-quiet)]` | lift the glass-tier wraps to generated utilities (`bg-glass-quiet`, `shadow-glass-quiet` if bridged) + a `@utility` transition recipe |
| 12 | `src/components/ui/select/SelectTrigger.vue:36` | `transition-[background-color,border-color,box-shadow,color]` | `@utility` recipe or `transition-colors` |

**Where a fix needs a new `@utility`:** author it ONCE in `src/styles/utilities.css` (`@layer
components` / `@utility` block) — e.g. a `transition-control` utility (`transition-property:
background-color, color, box-shadow, border-color; transition-duration: var(--duration-fast);
transition-timing-function: var(--ease-standard);`) and a `transition-collapse` utility
(`transition-property: height, opacity`). Reuse across the sites that share a property list (≥2
consumers per the overfitting precept — #3,#11,#12 share the colors set; #7,#9 share the collapse
set). Do NOT mint a single-site utility; if only one site needs a property list, the arbitrary value
is acceptable and the gate allowlists compound `transition-[…]` ONLY when it is NOT a `var(--…)` wrap
(the gate targets `text-[var(` / `shadow-[var(` specifically — see below).

### Gate — `proof:design-idiom-localization` (NEW, born-RED)

**Author `scripts/proof-design-idiom-localization.mjs`** (house template). Grep every `.vue` SFC under
`src/components/` (template class lists AND `index.ts` CVA strings) for the anti-pattern wraps:
`text-[var(` and `shadow-[var(`. **Must be 0.** Per AU-AUGMENT §6.1 the gate is scoped to these two
wrap forms (the highest-signal discipline leaks) — NOT every arbitrary value.

**Allowlist (false-positive guard, open question #4 in the design-idiom review):** a legitimate
runtime-themed binding with a comma-fallback (e.g. `text-[var(--active-tab-color,var(--foreground))]`
at TabsTrigger.vue:22, where `--active-tab-color` is consumer-set, not a static `@theme` token) is
ALLOWED. Encode the allowlist as an explicit array of `{file, line, var}` exemptions in the gate
script with a one-line rationale each, so a NEW unjustified wrap still reddens. Keep the allowlist
minimal (target: only the runtime-themed bindings that have no static `@theme` equivalent).

**Register** in `package.json` (`"proof:design-idiom-localization": "node scripts/proof-design-idiom-localization.mjs"`)
+ `gates.mjs` (tags `["local","ci"]`) after the 12 sites are lifted. **Bite-check:** re-inject
`text-[var(--muted-foreground-strong)]` into CardDescription.vue → RED.

### Risk

- **Test coupling (#4).** `Card.test.ts:70,118` asserts the literal `shadow-[var(--shadow-card)]`
  class string. The fix must update those assertions to `shadow-card` in the SAME commit, or the unit
  suite goes RED. Grep for any other test asserting a lifted class string before landing.
- **Property-list equivalence (#3,#6,#7,#9,#10,#12).** A `@theme`-generated `transition-colors` does
  NOT cover `box-shadow`/`border-color`/`width`/`height`; lifting a compound `transition-[…]` to the
  wrong generated utility silently drops a transitioned property. Either author an exact `@utility`
  recipe with the full property list OR keep the arbitrary value (the gate does not flag compound
  `transition-[…]` — only `text-[var(` / `shadow-[var(`). Prefer the `@utility` only where ≥2 sites
  share the list (overfitting precept); otherwise keep the arbitrary `transition-[…]`.
- **Runtime-themed bindings (#2,#11).** `--active-tab-color` and the `data-[state=on]:` glass wraps
  may be runtime/state-driven; verify each is a STATIC token (liftable) vs a runtime/consumer var
  (KEEP + allowlist). Lifting a runtime var to a static utility breaks the consumer theming hook.

---

## §5 — `defineModel` (8 sites)

**Modern Vue 3.5 pattern, isomorphic** (AU-AUGMENT §5.3). Replace the manual `defineProps` +
`defineEmits("update:…")` + watch/emit dance with `defineModel`. No public API change (the prop +
`update:` event surface is identical; `defineModel` generates them).

### Files + change

| # | site | current shape | fold |
|---|---|---|---|
| 1 | `src/components/ui/multi-select/MultiSelect.vue:37,46,80,85` | `(e:'update:modelValue', value:string[])` emit + manual prop | `const model = defineModel<string[]>({ default: () => [] })`; replace emits with `model.value = …` |
| 2 | `src/components/custom/tabs/BouncyTabs.vue:24-29,41` | `defineEmits<{ "update:modelValue":[string] }>` + `onUpdate` | `const model = defineModel<string>()`; bind `v-model` on inner Tabs |
| 3 | `src/components/custom/tabs/UnderlineTabs.vue:16-29` | manual emit | `const model = defineModel<string>()` |
| 4 | `src/components/custom/tabs/BouncyToggle.vue:57-58,224-226` | `update:modelValue:[string\|string[]]` | `const model = defineModel<string \| string[]>()` |
| 5 | `src/components/custom/responsive-tabs/ResponsiveTabs.vue:82-84` | manual `update:modelValue` threaded across two controls | `const model = defineModel<string>()`; bind both child controls to `model` |
| 6 | `src/components/custom/hover-popover/HoverPopover.vue:40-66,145-166` | `update:open` + dual-watch (folds ~10 lines) | `const open = defineModel<boolean>("open")`; delete the dual-watch reconciliation |
| 7 | `src/components/ui/data-table/DataTable.vue:62-65` | `update:page` + `update:sort` emits | `const page = defineModel<number>("page")` for the page model; KEEP `update:sort` as a plain emit (it is an event, not a two-way model — only `page` is `v-model`-shaped). **Verify** which of the two is actually `v-model`-bound by a consumer before converting. |
| 8 | `src/components/custom/configurator/ConfiguratorLayer.vue:69-91` | `update:open` controlled mode | `const open = defineModel<boolean>("open")` |

### Gate

No new gate. Covered by:
- `proof:strict-templates` (`gates.mjs:48`, `checkUnknownProps:true`) — a renamed/dropped prop is a
  RED typecheck.
- `npm run typecheck` (`vue-tsc --noEmit`) — `defineModel` generates the prop+emit; the consumer
  binding surface is verified by the type system.
- The component unit suites (`__tests__/`) — each converted SFC's `v-model` round-trip test must stay
  green. **Add a `v-model` round-trip test where one is missing** (per the MEMORY binding-verification
  note: stale reka-ui bindings silently no-op and only e2e/units catch them).

### Risk

- **Silent no-op bindings (MEMORY: glass-ui binding verification).** `defineModel` on a child that
  forwards to a reka-ui primitive must keep the inner `v-model` wired — a dropped inner binding
  silently no-ops (vue-tsc passes). Each converted SFC needs a round-trip unit test asserting the
  model updates on inner change.
- **`#7 DataTable` — `update:sort` is an EVENT, not a model.** Only `page` is `v-model`-shaped. Do NOT
  convert `update:sort` to `defineModel` (it carries `{key,direction}` and is not a two-way binding).
  Convert ONLY the genuinely `v-model`-bound emit; verify against a consumer.
- **`#6 HoverPopover` dual-watch deletion.** The fold removes ~10 lines of manual open-state
  reconciliation (`:156-166`); confirm the `keepDockOpen` token acquisition (tied to the open state)
  still fires on `defineModel`'s setter path — the dock-keep contract must not regress.
- **Default-value semantics.** `defineModel<string[]>({ default: () => [] })` for MultiSelect — match
  the existing `withDefaults` default exactly so an uncontrolled mount behaves identically.

---

## §6 — `Readonly<>` context guards (type-only, zero-runtime)

**Type-only hardening** (AU-AUGMENT §5.3). The dock contexts expose mutable refs that descendants
should not write. Wrap the leaked mutable members so the consumer surface is read-only — zero runtime
change (`readonly()` on the provided refs + `Readonly<>` on the type).

### Files + change

**`src/components/custom/dock/composables/dockLayerContext.ts:20-25`** — the `DockLayerGroupContext`
interface exposes `currentLayerId: Ref<string>` and `leavingLayerId: Ref<string | null>` as mutable
refs. A `<DockLayer>` child should READ these (for crossfade state) but never WRITE them (only the
group orchestrates). Change:

```ts
export interface DockLayerGroupContext {
    register(desc: DockLayerDescriptor): void;
    unregister(id: string): void;
    currentLayerId: Readonly<Ref<string>>;
    leavingLayerId: Readonly<Ref<string | null>>;
}
```

And at the PROVIDE site (in `DockLayerGroup.vue`, where `provideDockLayerGroupContext({…})` is
called), wrap the provided refs with `readonly(…)` from `vue` so the runtime surface matches the type
(the group keeps its own mutable refs internally; it provides the readonly view).

**`src/components/custom/dock/composables/dockContext.ts:27-36`** — `DockContext` exposes `keepOpen`
/ `release` (functions — already safe, no ref leak) and `held: ComputedRef<boolean>` (already
read-only — `ComputedRef` is not writable). **No change needed for the type here** (the AU-AUGMENT
§5.3 note about "keepOpen/release" is about NOT exposing the internal `keepOpenCount` mutable ref —
verify `DockContext` does not leak it; at HEAD it exposes only the `keepOpen()`/`release()` functions
+ the `held` computed, which is already the correct read-only shape). **Action:** audit the
`provideDockContext` call site in `GlassDock.vue`; if any mutable `keepOpenCount` ref leaks into the
provided object, drop it (the functions are the only write surface). If nothing leaks, this is a
no-op confirmation — record it in PROGRESS, do not invent a change.

### Gate

No new gate. Covered by `npm run typecheck` — a `<DockLayer>` that writes `currentLayerId.value` is
now a RED type error. **Add a `// @ts-expect-error` negative-assertion test** (a `.test-d.ts` or a
type-only fixture) proving a write to `currentLayerId.value` fails to compile — the bite-check for the
readonly guard.

### Risk

- **Internal write paths.** `DockLayerGroup.vue` MUST still mutate its OWN refs (it owns the state);
  only the PROVIDED view is readonly. Keep a private mutable ref + provide `readonly(ref)`. If the
  group currently mutates the same ref it provides, split into private-mutable + provided-readonly.
- **`useLayerTransition` consumption.** `useLayerTransition` returns `currentLayer`/`leavingLayer`
  refs (`useLayerTransition.ts:201`) that `DockLayerGroup` wires INTO the context. Confirm the
  composable's own refs stay writable (it owns the transition state); only the context-provided
  projection is `readonly()`.

---

## §7 — Deprecated `-webkit-*` cleanup

**Hygiene** (AU-AUGMENT §5.4 "Deprecated"). **NOTE — the AU-AUGMENT line citations are STALE; verify
against HEAD before touching.** The audit at HEAD found:

### Files + change (re-grounded against HEAD)

- **`src/styles/glass.css:326`** — `-webkit-backdrop-filter` appears INSIDE an
  `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` feature-test.
  This is a CORRECT defensive feature-query (it tests for the absence of BOTH the standard and the
  prefixed property to gate the no-blur fallback) — **NOT a deprecated raw property to remove.**
  **Action:** KEEP. The AU-AUGMENT "remove `-webkit-backdrop-filter` (glass.css:326)" directive is
  based on a stale read; record the re-grounding in PROGRESS (do NOT remove a load-bearing
  feature-test predicate — removing the `-webkit-` arm would mis-gate Safari ≤ 15 which only ships the
  prefixed form).
- **`src/styles/utilities.css:111-137`** — the `::-webkit-scrollbar` family is ALREADY guarded under
  `@supports not (scrollbar-color: auto)` (`:125`) with `scrollbar-color` as the primary path
  (`:116-123`). **Action:** KEEP — the AU-AUGMENT "guard `-webkit-scrollbar` under `@supports not(...)`"
  directive is ALREADY SATISFIED at HEAD. Verify the `.scrollbar-hidden::-webkit-scrollbar` at `:111`
  (a separate utility from the guarded `.scrollbar-thin`) — `scrollbar-hidden` hides the bar entirely;
  it has no `scrollbar-width: none` standard companion. **Add** `scrollbar-width: none` to
  `.scrollbar-hidden` as the standard primary + keep `::-webkit-scrollbar { display: none }` as the
  fallback (the one genuine fold in this item).
- **Raw `rgb(255 255 255)` → `--highlight-overlay`** — the audit grep at HEAD found ZERO raw
  `rgb(255 255 255)` / `rgb(255,255,255)` in `src/styles/`. **Action:** no-op; the AU-AUGMENT site is
  stale (already token-ized). Record the re-grounding.
- **`-webkit-background-clip: text` (`utilities.css:334`)** — load-bearing (the rainbow-text /
  clip-to-text recipe). **KEEP** (AU-AUGMENT explicitly says keep).

### Gate

No new gate. `proof:components-css` + the build must stay green. Record the three re-groundings
(glass.css:326 KEEP, utilities.css scrollbar already-guarded, no raw rgb) in `PROGRESS.md` so the
FINAL does not re-flag them.

### Risk

- **Removing a load-bearing feature-test arm.** The `-webkit-backdrop-filter` at glass.css:326 is a
  PREDICATE, not a paint property — removing it breaks the no-blur fallback gate on prefix-only
  engines. Do NOT remove. This is the primary risk of executing the AU-AUGMENT directive literally
  against stale line numbers.
- **`scrollbar-hidden` standard companion.** Adding `scrollbar-width: none` is additive (no
  regression); verify it does not double-apply with an existing rule.

---

## §8 — Anchor-positioning for dock popovers (`@supports`-gated)

**Native `anchor()` replaces floating-ui CSS overrides for the dock's portaled popover content**
(AU-AUGMENT §2.4 "anchor positioning (dock popovers) ADOPT (W8, P1)"). The proven SOTA pattern ships
at `src/components/custom/tabs/UnderlineTabs.vue:55-90` (anchor-name on the active element +
`position-anchor` + `anchor()` on the indicator + `@supports not (position-anchor: --x)` fallback).
**Marked W8-P1 in AU-AUGMENT §2.4 but listed under the W8b prompt scope** — land the CSS-substrate
half here (the SFCs already compose reka-ui primitives; W8b adds the `@supports`-gated anchor recipe
as a CSS enhancement, with the reka-ui floating-ui path as the unconditional fallback).

### Files + change

The dock popover triggers wrap reka-ui primitives:
- `src/components/custom/dock/DockSelectTrigger.vue` — wraps reka-ui `SelectTrigger`; content is
  portaled `SelectContent`.
- `src/components/custom/dock/DockDropdownTrigger.vue` — wraps reka-ui `DropdownMenuTrigger`; content
  is portaled `DropdownMenuContent`.

reka-ui owns the JS-computed positioning (floating-ui: side/align/collision). The anchor fold adds a
CSS-native tether so a supporting engine positions the popover via `anchor()` instead of the
floating-ui inline transform.

**`src/styles/dock-controls.css`** (post-§3) — add an `@supports (anchor-name: --x)` block:

```css
/* AU.W8b — native anchor-positioning for dock popover content. The trigger
   mints an anchor-name; the portaled content tethers to it via position-anchor
   + anchor(), so a supporting engine positions natively (no floating-ui inline
   transform). reka-ui's floating-ui path is the unconditional fallback for
   non-supporting engines. @supports-gated; mirrors UnderlineTabs.vue:55-90. */
@supports (anchor-name: --x) {
    .dock-select-trigger,
    .dock-dropdown-trigger {
        anchor-name: var(--dock-popover-anchor, --gl-dock-popover);
    }
    /* The portaled content opts in via a data attr. `data-glass-dock-portal`
       ALREADY exists at HEAD (set to "" on SelectContent.vue:43 /
       DropdownMenuContent.vue:35 / PopoverContent.vue when a dock context is
       present — see isTeleportedTarget.ts:14). `data-dock-anchored` is a NEW
       opt-in attr to ADD on the content components (gated on the consumer
       wanting native anchoring + reka-ui's positioner yielded — see risk). */
    [data-glass-dock-portal][data-dock-anchored] {
        position-anchor: var(--dock-popover-anchor, --gl-dock-popover);
        inset-block-start: anchor(bottom);
        inset-inline-start: anchor(left);
        position-try-fallbacks: flip-block;
    }
}
```

**Scope guard.** Because multiple triggers can mint the same `anchor-name`, the fold is correct ONLY
when each dock has ONE active popover at a time (the dock-keep contract enforces this). If a dock can
open two popovers simultaneously, the `anchor-name` must be per-trigger-unique (a `--dock-popover-anchor`
override per trigger). **Verify the single-active-popover invariant before landing**; if it does not
hold, defer §8 to a BOOK item (the floating-ui fallback is correct and ships regardless).

### Gate

No new gate. The `@supports` fallback to reka-ui's floating-ui path is the unconditional behavior;
the anchor recipe is a progressive enhancement. Covered by `proof:components-css` (no class drop) +
the manual browser verify (a supporting engine tethers natively; a non-supporting engine keeps
floating-ui — no double-position).

### Risk

- **Collision-avoidance parity (review open question).** reka-ui's floating-ui does
  side-flip + collision avoidance; native `anchor()` needs `position-try-fallbacks` /
  `position-try` to match. The `flip-block` fallback covers the common case; complex collision
  (shift + flip + size) may not map cleanly. If parity is incomplete, the `@supports` block is still
  safe (it only enhances supporting engines) but may position differently than floating-ui — verify
  the common dock-popover placements (bottom-anchored Select/Dropdown) match before landing.
- **Double-position.** A supporting engine must NOT run BOTH floating-ui's inline transform AND the
  native `anchor()`. reka-ui sets an inline `transform`/`translate` on the content; the native
  `inset` from `anchor()` composes with it → drift. **Mitigation:** the `[data-dock-anchored]` opt-in
  attr is set ONLY where the consumer wants native anchoring AND disables reka-ui's positioner (via
  reka-ui's `disable-update-on-layout-shift` / a `reference`-less mode) — or DEFER §8 if reka-ui's
  positioner cannot be disabled per-content. This is the binding risk; if reka-ui cannot yield the
  position, §8 becomes a BOOK item and the floating-ui path ships unchanged.

---

## §9 — Gate registration summary

Two NEW born-RED gates land in W8b; both register in `package.json` scripts + `scripts/gates.mjs`
manifest ONLY after their fold is complete (manifest==ci invariant; `verifyCi()` enforces it):

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:design-idiom-localization` | `scripts/proof-design-idiom-localization.mjs` | `["local","ci"]` | re-inject `text-[var(--muted-foreground-strong)]` → RED |
| `proof:dock-css-split` | `scripts/proof-dock-controls-split.mjs` | `["local","ci","release"]` | move a `.dock-icon-button {` rule back into `dock.css` → RED |

Both follow the house gate template (`scripts/proof-dock-opacity-lockstep.mjs`): comment-strip first
(false-witness discipline), a pure exported detector, a byte-stable JSON artefact via
`scripts/gate-output.mjs` (`gateArtifactPath` / `writeGateArtifact` / `snapshotStamp`), a human
summary, `process.exit(1)` on any violation.

Existing gates that MUST stay green through W8b (no regression): `proof:dock-opacity-lockstep`,
`proof:dock-motion-parity`, `proof:components-css`, `proof:phantom-classes`, `proof:strict-templates`,
`proof:vueuse-free-root`, `npm run typecheck`, `npm run build`, the component unit suites.

---

## §10 — Acceptance (wave close)

W8b is DONE when:

1. §1 — `.dock-layer` carries the `@supports (transition-behavior: allow-discrete)` arm +
   `@starting-style`; `.dock-layers` carries the `@supports (interpolate-size: allow-keywords)` arm;
   the FLIP fallback is untouched; manual browser verify confirms lockstep settle + no VT
   double-animate. The `AU.W8b-visibility-fork` comment marker is present.
2. §2 — dock control rules use native nesting; compiled CSS selector specificity is unchanged.
3. §3 — `dock-controls.css` exists, imported after `dock.css`; `proof:dock-css-split` is green +
   bite-verified; `CLAUDE.md` Structure block names it.
4. §4 — all 12 (minus the allowlisted runtime-themed) sites lifted; `proof:design-idiom-localization`
   is green + bite-verified; `Card.test.ts` assertions updated.
5. §5 — 8 `defineModel` conversions land; each has a `v-model` round-trip unit test; `typecheck` green.
6. §6 — `dockLayerContext.ts` refs are `Readonly<Ref<…>>` with `readonly()` at the provide site; a
   negative `@ts-expect-error` write test exists; the `dockContext.ts` no-leak audit is recorded.
7. §7 — the three re-groundings (glass.css:326 KEEP, scrollbar already-guarded + `scrollbar-width:none`
   added to `.scrollbar-hidden`, no raw rgb) recorded in PROGRESS.
8. §8 — anchor recipe landed in `dock-controls.css` `@supports`-gated with floating-ui fallback, OR
   formally BOOKed if the single-active-popover invariant / reka-ui positioner-yield does not hold.
9. The full gate matrix is green; `PROGRESS.md` records the wave with a green run id; no `src` edit
   regresses an existing gate.
