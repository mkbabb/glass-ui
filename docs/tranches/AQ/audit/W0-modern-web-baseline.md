# AQ.W0 — modern-web baseline audit (the platform-native substrate)

The development-phase audit for tranche AQ. The same 6-agent workflow that produced muster's J.W0 (a
real Lighthouse run + Google's `modern-web-guidance` corpus) analyzed glass-ui as the **design-system
substrate** muster and every other consumer build on. 49 findings surfaced; this doc carries the
glass-ui slice. AQ ships the platform-native primitives; **muster tranche J** is the consumer that
adopts them (see muster `docs/tranches/J/`).

## The thesis in one line

glass-ui's substrate is mature and token-first, but it predates the `light-dark()` / `color-scheme` /
anchor-positioning / View-Transitions / scroll-driven-animation / `:has()` / customizable-`<select>`
era — and it **hand-rolls in JS (reka-ui + keyframes.js) a large set of behaviors the browser platform
now owns natively**. Replacing the hand-rolled paths with the platform primitives cuts code, moves work
off the main thread (the consumer INP lever), and fixes a live consumer correctness bug — without
losing the glassmorphic look.

## Browser-support policy (shared with muster J — confirm or override)

Baseline Widely Available → native, no fallback. Baseline Newly Available → feature-detected fallback
≤ 20 LOC, no new deps. Baseline Limited (`interestfor`, customizable `<select>`, `moveBefore`,
container *style* queries) → progressive-enhancement-only behind feature detection; reka-ui/JS stays the
default path. No runtime-dependency polyfills. AQ is a library: every Newly/Limited adoption keeps the
current path as the documented fallback so consumers on any target degrade gracefully.

## Wave matrix — glass-ui AQ (grounded findings → sequenced waves)

Findings de-duplicated across the modern-css, ui-primitives, forms-inputs, and bundle-loading lanes.
Overlaps merged (e.g. `:user-invalid` serves modern-css + forms + accessible-error; `accent-color`
serves modern-css + forms). Each row: finding (file:line) → guide → lever → gate.

### AQ.W2 — Color & theming modernization (the CSS color cluster)
| Finding | Guide | Lever | Gate |
|---|---|---|---|
| Zero `color-scheme` in `src/styles/` (grep 0); dark is 100% class-based, so native UI (scrollbars, spinbuttons, date pickers, focus) stays OS-light in dark theme | css §5, `color-scheme` feature | `color-scheme: light dark` on `:root` (`tokens.css`) + `color-scheme: dark` in `.dark` | VR snapshot of native `<input type=number>` + scrollbar in `.dark` |
| 142-line `.dark` mirror re-declares ~40 paired tokens (`tokens.css:1144-1286`) | `light-dark` + component-specific-light-dark-theme | Rewrite color tokens as `light-dark(…)` (kept UNregistered, per the inheritance gotcha); `@supports` + retained `.dark` hook as the fallback; non-color tokens stay | token-proof: every token resolves identically in `.dark` before/after; VR light+dark grid |
| **Live consumer bug**: tokens are full `hsl()` not channels, so consumer `hsl(var(--border) / α)` is malformed + never paints (muster `styles.css:211`, 40+ sites) | css §8 `color-mix()` | Migrate alpha derivatives to `color-mix(in srgb, var(--token) Nα%, transparent)` (the house `--surface-tint-*` pattern); add a `--border-soft` rung; reconcile the CLAUDE.md channel-convention doc | grep proof: 0 `hsl(var(--` in consumers; VR shows muster hairlines paint |
| Zero `accent-color` (grep 0) — native controls render OS-default | `accent-color`, brand-consistent-forms | `accent-color: var(--primary)` on `:root` (+ dark-contrast shade) | VR of native checkbox/`<progress>` in light+dark; contrast assertion |
| Focus rings = `box-shadow` + `outline: none`, no forced-colors fallback (`utilities.css:81`, `glass.css:143`); 0 `forced-colors` brackets | css §4/§5 | `@media (forced-colors: active)` → `outline: 2px solid Highlight` on `:focus-visible`; companion `border`/`outline` for structural box-shadow hairlines | forced-colors-emulated VR shows visible focus on Button + dock-icon-button |

### AQ.W3 — Modern selectors & transforms (the CSS structure cluster)
| Finding | Guide | Lever | Gate |
|---|---|---|---|
| Zero `:has()` (grep 0); parent-from-child state via JS class toggles / `:deep()` | style-parent-with-has, child-state-based-styling | `Card:has(:focus-within)` elevation, `GlassDock:has([data-state=open])`, `LabeledField:has(:user-invalid)` — scoped (never `body`); `@supports not selector(:has(*))` class fallback | VR on focus-within elevation; drops the JS class toggle |
| Multi-property `transform: scale()` on hover/active with no identity base (`glass.css:136/140` + ~13 in `utilities.css`, 8 in `dock.css`) → hover mints a new stacking context (z-index/anchor hazard on `--z-dock`) | individual-transform-properties | Convert to `scale:`/`translate:` longhands + add `scale:1; translate:0` identity base | VR dock+button hover/press; popover still stacks above dock on hover |
| Zero `text-wrap` (grep 0); `text-hero` uses `white-space: nowrap` (`typography.css:180`) | css §7, prevent-text-wrapping | `text-wrap: balance` on display/heading utilities; `pretty` on prose; `nowrap` on the hero (per-element, never `*`) | VR on a wrapping headline + long-prose at narrow width |
| `.scrollbar-thin` is one inline-color utility (`utilities.css:76`), no tokens, no `@supports not` webkit fallback | `scrollbar-color` feature | `--scrollbar-thumb`/`-track` tokens (auto-dark via W2) + `scrollbar-width: thin` + `@supports not` `::-webkit-scrollbar` block; apply to dock-overflow regions | VR dark scroll region, thumb ≥ 3:1 vs track |

### AQ.W4 — Form primitive modernization (the forms cluster)
| Finding | Guide | Lever | Gate |
|---|---|---|---|
| Zero `:user-invalid`/`:user-valid` in `src/styles/` — the library ships **no validation visual vocabulary**; consumers hand-roll `touched` refs (muster `VoterRow.vue:47-63`) | validate-input-after-interaction, required-field-feedback, user-pseudos | `.input-pill:user-invalid`/`:user-valid` rungs (existing `--destructive`/`--success`); `:has()` group highlight; ship the ≤8-LOC `useUserInvalidAria` `aria-invalid` bridge + `@supports not` fallback | Playwright: invalid border applies post-blur, NOT on mount; clears on valid; axe aria-invalid synced |
| `Input.vue:22` bare, no documented `autocomplete`/`inputmode`/`enterkeyhint`/`type` contract; `NumberFieldInput.vue:18` no `inputmode="decimal"` | forms §3, autofill-*, html §7 | Document + default the attr-passthrough; `inputmode="decimal"` default on NumberFieldInput | attr lands on rendered `<input>`; NumberField default asserted |
| `Textarea.vue:23` fixed `min-h-20`, no `field-sizing` | form-fields-automatically-fit-contents | `autosize` prop → `field-sizing: content` + `min/max-block-size` (vertical only); fixed-size is the no-op fallback | multi-line type: no scrollbar to max, then scrollbar |
| `LabeledField`/`Label` have no `required` indicator or error slot; the long-running axe `label` lineage (F→AN) | required-field-feedback | `required` prop → asterisk; `error` slot → `aria-errormessage` + the W4 `:user-invalid` reveal | axe: aria-invalid post-blur only; asterisk renders |
| `select/` is a 10-file reka-ui JS rebuild (the "rebuilt in JS" anti-pattern) | branded-select-styling, customizable-select | NEW `<GlassNativeSelect>` on `<select appearance: base-select>` + `::picker(select)` for low-option cases; reka-ui Select stays the rich/async default | keyboard select updates value + form-submits; `CSS.supports`-gated VR; axe clean |
| `.input-pill:focus` uses bare `:focus` not `:focus-visible` (`glass.css:213`) | css §4 | `:focus-visible` (consistency with `.focus-ring`) | no focus ring on mouse-click; ring on keyboard |

### AQ.W5 — Motion → platform (the compositor cluster)
| Finding | Guide | Lever | Gate |
|---|---|---|---|
| `useScrollProgress.ts:35-68` (88 LOC rAF scroll+resize+RO, per-frame `getBoundingClientRect`) + `useStaggerReveal.ts:21-78` (78 LOC IO+setTimeout) | scroll-progress-indicator, scroll-entry-exit, scrollytelling | CSS `animation-timeline: scroll()/view()` recipes behind `@supports ((animation-timeline: view()) and (animation-range: entry))`; composables become the JS fallback (sole writer in fallback mode); reduced-motion disables | supporting engine attaches 0 scroll listeners (listener-count assertion) |
| `DialogContent.vue:81-107` JS per-frame inline `transform`/`opacity` (useSpringMount); `animations.css` has no top-layer grammar | animate-to-from-top-layer | `@starting-style` + `transition-behavior: allow-discrete` + `overlay` block so `[popover]`/`dialog[open]` animate in pure CSS; `::backdrop` blur; reduced-motion carve | native-dialog story animates entry/exit with no per-frame JS; `@supports (overlay:auto)` |
| `useVerdictMoment` reveal / dock layer-swap / re-rank are hand-coordinated spring+stagger (the consumer side) | same-document/group-element-transitions | Provide the View-Transitions motion substrate (a `useViewTransition` helper + `view-transition-class`/`-name` recipes) muster J.W5 + AQ.W6 consume | helper wraps a DOM swap in `startViewTransition` with instant fallback |

### AQ.W6 — Anchor positioning & top-layer (the platform-UI cluster)
| Finding | Guide | Lever | Gate |
|---|---|---|---|
| `UnderlineTabs.vue:27-52` + `BouncyToggle.vue:93-199` JS offset-FLIP + `ResizeObserver` per tab strip (forced reflow on every selection — INP) | anchor-positioning-tab-underline | `::before` indicator anchored via `anchor-name`/`anchor()` + `transition: inset`; delete the RO + nextTick watchers; keep `aria-selected`/`aria-current`; `border-bottom` fallback | grep: 0 `offset*` reads, no RO; VR underline animates; non-supporting engine falls to static underline |
| `DialogContent`/Sheet/Popover/DropdownMenu = reka-ui JS open-state; no `closedby`/`commandfor` | declarative-dialog-popover-control, light-dismiss | Pilot a native-`<dialog>` glass variant: `closedby="any"` light-dismiss + `commandfor`/`command` declarative open for the simple confirm/settings case; reka-ui stays for compound focus-trap cases | native-dialog opens via `commandfor`, light-dismisses, no JS handler |
| `HoverPopover.vue` (191 LOC HoverCard wrapper) + `IconTooltip.vue` (TooltipProvider) for a hover label | interest-triggered-tooltips, position-aware-tooltips | `interestfor` + `popover="hint"` + anchor positioning (opt-in, feature-detected; reka-ui default until interest-invokers reach Baseline); glass `.hover-popover-panel` look unchanged | tooltip opens on hover/focus/long-press, native ARIA, arrow flips at edge |
| `useLayerTransition.ts:89-148` (165 LOC pin/measure/re-pin FLIP + setTimeout safety) + `GlassDock.vue` width FLIP | same-document-transitions, resilient-context-menus | `startViewTransition` around the layer/size swap (browser-interpolated, kills the measure dance); anchor-position the dock's portaled triggers; JS FLIP kept as feature-detected fallback | layer swap animates with 0 `getBoundingClientRect` in the active path; axis tests green |
| No `moveBefore`/`commandfor` anywhere; responsive re-parent (ResponsiveTabs swap, dock teleport) risks closing an open top-layer element | declarative-button-actions, move-dom-element-without-losing-state | `commandfor`/`command` on simple triggers; `moveBefore()` (+ `insertBefore` fallback) on re-parent paths | `commandfor` trigger opens with native `aria-expanded`; re-parent keeps popover open+focused |

### AQ.W7 — Bundle & container-query (the consumer-payload guardrail)
| Finding | Guide | Lever | Gate |
|---|---|---|---|
| The root barrel `src/index.ts` re-exports ~37 ui packages; a consumer reaching any heavy family through it drags the leaf eager (the 155.8 KB-gz muster chunk) | identify-heavy-scripts, JS Code-Splitting | LoAF-instrument the muster boot to name the heaviest leaves; verify the 76-entry dist split is leaf-clean (no shared-leaf re-anchor); regenerate `K/W4-subpath-sizes.md` with a barrel-vs-subpath delta so consumers choose right | `profile:bundle`; heaviest 5 leaves named; no glass-ui script > 100 ms LoAF on muster boot |
| value.js (74 KB gz) has a static edge via keyframes.js@2.1.1 (muster `vite.config.ts:52-58`) | conditional-async-dependencies | Coordinate the keyframes.js dynamic re-export so `useSpring` consumers don't pull value.js static; then the muster `value` named-chunk workaround retires | value.js: 0 static importers in the consumer manifest |
| Density is `[data-density]` attribute selectors (the documented FALLBACK form) (`dock.css:84-153`); component-internal type uses no `cqi` | design-token-reactivity, fluid-scaling, size-aware-styling | Layer `@container style(--density: …)` AS progressive enhancement over the kept attribute selectors (`:where()` flat specificity); `clamp(min, Ncqi, max)` for component-internal type | VR nested density + a metric cell resized narrow/wide; `profile:budget` no regression |

## Cross-repo coordination (AQ → J)

AQ is the substrate; muster J is the first adopter. The couplings: AQ.W4 (`:user-invalid`/required-field
+ the `aria-invalid` bridge) → J.W6 + J.W7; AQ.W5 (View-Transitions motion substrate + scroll-driven
recipes) → J.W5; AQ.W6 (anchor-positioned underline, native dialog, dock VT) → muster's RankedVerdict +
dialogs + CommandDock; AQ.W7 (heavy-leaf carve + the barrel-vs-subpath delta) → J.W4's subpath sweep
(it sets the gz ceiling J measures against). AQ.W2's `color-mix` migration is also the canonical fix for
the **live muster `hsl(var(--border) / α)` bug** (40+ sites that never paint). Each AQ wave keeps the
current path as the documented fallback, so the publish never breaks a consumer mid-adoption.

## What this audit does NOT change at HEAD

Dev-phase only. No `src/` or `src/styles/` moves until the W1 designs verify + the user authorizes the
impl phase. AQ also inherits glass-ui's standing invariants: token-first (every visual axis stays a
custom property), no-backwards-compat-alias (a platform swap RETIRES the hand-rolled path or keeps it as
the sole fallback — never both live), and the overfitting bar (every new primitive ships with ≥ 2
consumers or a demo, or is not shipped — the native-`<select>` + `interestfor` waves are gated on a real
consumer, muster, adopting them in J).
