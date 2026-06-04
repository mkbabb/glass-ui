# AT.W0b · Lens B4 — SOTA research: dock interaction + accessibility

**Scope.** The GlassDock interaction + a11y contract: the presentational-root
aria contract (AM forms-a11y gap 3), keyboard navigation across icons/tabs/layers,
focus management, pointer/hover/touch, the Slider keep-dock-open bidirectional
contract, `prefers-reduced-motion`, and coarse-pointer targets. Built ON the prior
W0 6-lens audit and the W0b A-lens cohort (A1-A6 are blob/WebGL/color; **B4 is the
first interaction+a11y lens** — it does not overlap them). Augments/hardens the AT
plan, which today touches the dock ONLY at W6 (the "booked-not-built dock
binding-verification guard") and W7 (the `overflow`/`wrap` 3-prop collapse). **This
lens finds the dock has a real, gated-nowhere a11y debt that AT should fold as a
dedicated dock-wave — distinct from the W7 prop-collapse, which is cosmetic.**

Method: every claim is file:line-grounded against HEAD (3.2.0) + cited to the
WAI-ARIA APG / MDN / WCAG. SOTA pulled live via WebSearch/WebFetch on 2026-06-04
(sources listed §9). Where a finding is from knowledge not web, it is marked **[K]**.

---

## §0 — TL;DR (the five findings, ranked)

| # | Finding | Severity | Where | AT fold |
|---|---|---|---|---|
| **B4-1** | **DockLayerGroup switcher rail is a TABLIST wired as a toggle group** — `aria-pressed` toggle semantics on `<button>`s for mutually-exclusive PANEL navigation; **no roving tabindex, no arrow keys, no `role=tablist/tab/tabpanel`, no `aria-controls`**. APG-wrong on both the role and the keyboard model. | **MAJOR** | `DockLayerGroup.vue:101-119`, `DockLayer.vue:46-52` | **new dock-wave** |
| **B4-2** | **`.dock-layer-tab` has NO `:focus-visible` ring** — a keyboard user on the rail gets zero focus indicator (WCAG 2.4.7 fail). The shared focus contract (`dock.css:32-37`) lists the 4 control classes but **omits `.dock-layer-tab`**. | **MAJOR** | `dock.css:32-37`, 636-662 (no `:focus` rule) | dock-wave |
| **B4-3** | **The whole dock-control family loses its focus ring under forced-colors** — the rings are `box-shadow` (`dock.css:36`), which forced-colors strips; the restoration allowlist (`utilities.css:1032-1040`) covers `.focus-ring`/`.glass-btn`/`.interactive-item`/`.input-pill` but **NONE of the dock controls**. | MAJOR | `utilities.css:1032-1050` | dock-wave |
| **B4-4** | **No roving-tabindex / arrow-key navigation anywhere in the dock** — icons, tabs, triggers are all separate Tab-stops; a dock of N icons is N Tab-stops (APG toolbar wants 1). reka-ui **ships a `Toolbar*` primitive** (roving tabindex built-in) that the dock uses NONE of. | MEDIUM | dock SFCs (hand-rolled `<button>`); `reka-ui` exports `ToolbarRoot/Button/Link/Separator/ToggleGroup/ToggleItem` | dock-wave |
| **B4-5** | **The presentational-root aria contract is doc-only, gated nowhere, and ships no exemplar** — AM forms-a11y wrote the prose; there is no test guarding "no `aria-expanded` on root" and no canonical trigger child demonstrating where it belongs. The W6 "dock binding-verification guard" is the natural home. | MEDIUM | `GlassDock.vue:315-341` (no role/aria); CLAUDE.md §GlassDock aria contract | W6 guard + dock-wave |

**Refuted worries (verified clean — do NOT spend AT budget here):**
- **PRM is correct.** CSS transitions: the global `transition-property` allowlist
  (`utilities.css:997-1008`) strips `width` (the dock FLIP) and keeps `opacity` —
  the dock crossfade degrades to a snap, correct. VT path: `view-transition.css:27-33`
  zeroes `::view-transition-*` animation under PRM, and the `.gl-dock-layer` group
  recipe is covered. Both the JS-FLIP and the VT fork degrade correctly. (§5)
- **Coarse-pointer floor is correct (44px) for the four primary controls** — the
  `[data-density]` specificity fix (AP.W3 R0G-6, `dock.css:1134-1138`) + the
  standalone button-level floor (`dock.css:1149-1152`) land the WCAG 2.5.5 target.
  **One residual:** the rail tab `.dock-layer-tab` (28px default) is only floored
  *inside* a `.glass-dock` via `--dock-control-size`; a standalone `<DockLayerGroup>`
  rail falls below 44px. (§6)

---

## §1 — The SOTA baseline (what the dock SHOULD be)

Three APG patterns bound the dock. The dock is a **composite of all three** and
must not conflate them:

### 1.1 Disclosure (the collapse/expand affordance)

The collapsed↔expanded dock is a **disclosure**: a button that shows/hides a
content section. Per [APG Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/):
the control has `role=button`, carries `aria-expanded` (`true` when content visible),
and Enter/Space toggle it. Crucially APG notes disclosure is "a simpler design
pattern with minimal ARIA roles that mainly uses `aria-expanded` and `aria-controls`."

→ This is exactly what AM forms-a11y gap 3 already names: `aria-expanded` belongs on
the **trigger child** (the interactive control), NOT the presentational root `<div>`.
The SOTA confirms AM's contract — but SOTA also says the trigger should carry
`aria-controls` pointing at the revealed region (the dock body), which the AM contract
omits and no glass-ui exemplar demonstrates. **(→ B4-5)**

### 1.2 Toolbar (the row of dock controls)

A horizontal row of independent icon-buttons that "mutate one surface" is an
[APG Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/): `role=toolbar`,
**one Tab-stop for the whole toolbar**, arrow keys move focus among controls via
**roving tabindex** (the focused control is `tabindex=0`, all others `tabindex=-1`).
MDN: roving tabindex "allows multiple focusable elements to be represented by a
single `tabindex=0` element in the tab order…enabling keyboard users to quickly tab
through a page without stopping on every item."
([MDN toolbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role))

→ The dock today gives **every** `<DockIconButton>` / `<DockTabButton>` its own
Tab-stop. A 6-icon dock is 6 Tab-stops a keyboard user must traverse. **(→ B4-4)**

### 1.3 Tabs (the DockLayerGroup switcher rail)

The `<DockLayerGroup>` is **mutually-exclusive PANEL navigation** — each rail button
reveals a distinct `<DockLayer>` pane, exactly one active. This is the canonical
[APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) case — and glass-ui's own
CLAUDE.md §"Tabs vs ToggleGroup" *literally defines this distinction*: "Reach for
`<Tabs>` for mutually-exclusive PANEL navigation — `role=tablist`, each tab reveals a
distinct content panel… Reach for `<ToggleGroup>` for independent-or-single-select
TOGGLES that mutate one surface — `role=group`, no panel swap." **The rail violates
glass-ui's own rule:** it is panel navigation built with toggle semantics. **(→ B4-1)**

APG Tabs contract (fetched in full):

| Element | Required |
|---|---|
| tablist container | `role=tablist`, `aria-label`/`aria-labelledby`, `aria-orientation=vertical` for the rail |
| each tab | `role=tab`, `aria-selected` (`true` on active, `false` on rest), `aria-controls`→panel id, roving `tabindex` (`0` active / `-1` rest) |
| each panel | `role=tabpanel`, `aria-labelledby`→tab id, `tabindex=0` if no focusable content |
| keyboard | Left/Right (horizontal) or **Up/Down (vertical)** move + wrap; Home/End optional; **automatic activation recommended** (activate on focus, content preloaded — which the dock's preloaded `<DockLayer>`s satisfy) |
| **NOT** | `aria-pressed` — that is for toggle buttons only |

The fetched APG is explicit: "For tabs specifically, you should use `aria-selected`,
not `aria-pressed`… `aria-pressed` is for toggle buttons, not tabs."

---

## §2 — Finding B4-1 (MAJOR): the switcher rail is a mis-roled tablist

**Current code** (`DockLayerGroup.vue:96-120`):

```vue
<nav v-if="showRail && layers.length > 1" class="dock-layer-rail" :class="railPosition">
  <button
    v-for="layer in layers" :key="layer.id"
    type="button" class="dock-layer-tab"
    :class="{ 'is-active': activeLayer === layer.id }"
    :title="layer.label"
    :aria-label="layer.label ?? layer.id"
    :aria-pressed="activeLayer === layer.id"   <!-- ← WRONG: toggle semantics -->
    @click="activeLayer = layer.id"            <!-- ← click only, no keyboard model -->
  >…</button>
</nav>
```

The panes (`DockLayer.vue:46-52`):

```vue
<div class="dock-layer-item-host"
  :class="{ 'is-active': isActive, 'is-leaving': isLeaving }"
  :inert="isActive ? undefined : true">   <!-- ← inert (good) but no role=tabpanel, no aria-labelledby -->
  <slot />
</div>
```

**Gaps vs APG Tabs:**
1. `aria-pressed` → must be `aria-selected` (announces "tab, selected" not "button, pressed").
2. `<nav>` wrapper → must be `role=tablist` with `aria-orientation` keyed to the
   group axis (the rail is `flex-direction: column` for vertical, `dock.css:611-624`)
   and an `aria-label` (it has none; a screen-reader user hears an unlabelled tablist).
3. Each button → `role=tab` + `aria-controls`→the pane's id + roving `tabindex`.
4. Each `<DockLayer>` host → `role=tabpanel` + `aria-labelledby`→the tab's id +
   `tabindex=0` (the pane has no guaranteed focusable child).
5. **No keyboard navigation at all** — only `@click`. Arrow keys do nothing; a
   keyboard user can Tab to each rail button (every button is a Tab-stop, the
   anti-pattern) and Space/Enter it, but cannot arrow between layers, and the active
   layer does not follow focus.

**The `inert` on inactive panes is already correct** (`DockLayer.vue:50`,
`GlassDock.vue:359,366`) — only the active layer is interactive. That is the hard
half; the wiring above is the cheap half left undone.

**SOTA note [K]:** automatic activation (activate-on-focus) is APG-recommended when
panels are preloaded. The dock preloads all `<DockLayer>`s (they mount and register;
`DockLayer.vue:29-35`) and crossfades between them, so automatic activation is the
right model — it also matches the existing click-to-activate UX with zero added
latency.

---

## §3 — Finding B4-2 (MAJOR): the rail tab has no focus-visible ring

The shared four-state focus contract (`dock.css:32-37`):

```css
.dock-icon-button:focus-visible,
.dock-tab-button:focus-visible,
.dock-select-trigger:focus-visible,
.dock-dropdown-trigger:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
}
```

`.dock-layer-tab` is **absent** from this group, and `grep -n "dock-layer-tab.*focus"
src/styles/dock.css` returns **nothing** (verified). The rail tab rules
(`dock.css:636-662`) define `:hover` and `.is-active` but **no `:focus-visible`**.
A keyboard user tabbing onto the switcher rail sees **no focus indicator** — a direct
**WCAG 2.4.7 Focus Visible (AA)** failure. This is the kind of regression the W7
binding-verification lesson ("no silent-no-op") is meant to catch, but no a11y gate
exists to catch it (§7).

**Fix shape:** add `.dock-layer-tab:focus-visible { box-shadow: var(--focus-ring-shadow); }`
to the shared group (and the roving-tabindex rewrite in B4-1 makes the rail a single
Tab-stop so the ring lands on the active tab only).

---

## §4 — Finding B4-3 (MAJOR): dock controls lose focus under forced-colors

glass-ui already learned this lesson elsewhere (`utilities.css:1018-1031`): Windows
High Contrast / `forced-colors` **strips `box-shadow`**, so any `box-shadow`-based
focus ring vanishes. The restoration block (`utilities.css:1032-1040`) re-adds a real
`outline: 2px solid Highlight` — but only for:

```css
.focus-ring:focus-visible, .glass-btn:focus-visible,
.interactive-item:focus-visible, .input-pill:focus, .input-pill:focus-visible
```

**None of `.dock-icon-button` / `.dock-tab-button` / `.dock-select-trigger` /
`.dock-dropdown-trigger` / `.dock-layer-tab` are in this list.** Their focus rings are
`box-shadow: var(--focus-ring-shadow)` (`dock.css:36`), so under forced-colors **every
dock control's keyboard focus is invisible** — a WCAG 2.4.7 failure that only manifests
in HCM (the hardest mode to catch without a forced-colors test). The `.glass-dock`
silhouette IS restored (a border, `utilities.css:1046`), but that is the box edge, not
the per-control focus ring.

**Fix shape:** extend the forced-colors `:focus-visible` outline restoration to the
dock-control family (one comma-group addition). Token-driven; fine-mode byte-identical.

---

## §5 — prefers-reduced-motion (REFUTED — verified correct, both paths)

The dock has TWO motion paths and BOTH degrade correctly:

1. **JS FLIP (default engine).** The width crossfade animates `width`
   (`dock.css:380-384`, `.dock-layers { transition: width … }`). The global PRM gate
   (`utilities.css:997-1008`) is a `transition-property` **allowlist** override:
   `transition-property: opacity, color, background-color, border-color, box-shadow
   !important` — `width` is excluded, so the spatial morph is stripped; `opacity`
   survives at a 0.1s snap. **Correct** (matches the SOTA: "swap movement for opacity"
   — [W3C C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39),
   [WCAG 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)).
   The `dock.css:370-373` comment documents this exact mechanism, and it checks out.

2. **View-Transitions fork (supporting engines).** `GlassDock.vue:205-214` +
   `DockLayerGroup.vue:67-77` set `view-transition-name` + `view-transition-class:
   gl-dock-layer`. The VT pseudo-tree is NOT a CSS transition, so the allowlist above
   does not reach it — BUT `view-transition.css:27-33` zeroes `::view-transition-group/
   old/new(*)` animation under PRM, and the `.gl-dock-layer` group recipe
   (`view-transition.css:53-56`) inherits it. The state still mutates instantly; only
   motion is removed. **Correct** (the canonical PRM-VT degrade).

**No action needed on PRM** — and importantly, the AT dock-wave must NOT regress this:
if B4-1 adds a tablist roving-focus that scrolls the active tab into view, the
scroll-into-view should respect PRM (`scrollIntoView({ behavior: matchMedia(prefers-
reduced-motion).matches ? "auto" : "smooth" })`) **[K]**. Add this to the wave gate.

---

## §6 — Coarse-pointer targets (mostly correct; one rail residual)

The 44px WCAG 2.5.5 floor is handled well for the four primary controls:
- In-dock: `dock.css:1134-1138` — `.glass-dock[data-density]` lifts
  `--dock-control-size` to `--dock-touch-target` (2.75rem/44px). The `[data-density]`
  specificity (0,2,0) beats the density setter (AP.W3 R0G-6) — verified.
- Standalone: `dock.css:1149-1152` — a bare `.dock-icon-button:not(--compact)` floors
  `min-block/inline-size` to 44px regardless of ancestry.
- General surface: `utilities.css:1060-1061` floors `[data-size="icon"]` etc.

**Residual (MINOR → fold into the dock-wave):** `.dock-layer-tab` sizes from
`var(--dock-layer-tab-size, var(--dock-control-size, 1.75rem))` (`dock.css:640-641`).
Inside a `.glass-dock`, the coarse `--dock-control-size` floor reaches it (44px). But a
`<DockLayerGroup>` rendered **standalone** (it is explicitly allowed outside a
`<GlassDock>` — `dockLayerContext.ts:11-12` "a `<DockLayerGroup>` doesn't have to live
inside a `<GlassDock>`") falls back to **1.75rem (28px)** with no coarse floor — below
the 44px target. The B4-1 rewrite (which gives the rail `role=tablist`) is the natural
place to add a standalone coarse floor mirroring the icon-button rule.

**SOTA [K]:** WCAG 2.5.5 Enhanced is 44px; 2.5.8 (WCAG 2.2 AA) relaxes to 24px with
spacing exceptions. glass-ui targets the stricter 44px already — keep it; no relaxation.

---

## §7 — The gate gap (the structural problem behind B4-1..B4-3)

**There is no a11y test infrastructure in the repo.** Verified:
- No `axe-core` / `jest-axe` / `vitest-axe` dependency (`package.json` has none).
- No Playwright config (no `playwright.config.*`).
- A11y is enforced ONLY by structural mount-tests (`GlassDock.scroll-overflow.test.ts`
  asserts class hooks; `timeline/__tests__/aria-valuenow.test.ts` asserts one attr).
- The AM forms-a11y aria contract (gap 3) is **prose in CLAUDE.md, gated nowhere** —
  there is no test asserting "the dock root carries no `aria-expanded`/role," and no
  exemplar trigger child showing where it belongs.

This is why B4-1/B4-2/B4-3 went unnoticed: nothing checks them. The AT plan already
books a **"dock binding-verification guard"** at W6 (per AT.md §Folded ledger: "the
W7-booked, never-built test") — that guard's natural scope is exactly the dock aria
contract. **Augment it from a single binding-check into a dock a11y contract test.**

**SOTA on the gate choice [K + web]:** a `vitest` + `happy-dom` structural a11y test
is the right tier for this repo (it already runs `@vue/test-utils` mount tests; no new
runner). The roving-tabindex + `role`/`aria-*` assertions are pure DOM-structural —
testable without a real layout engine. A full `axe` run wants a real browser
(jsdom/happy-dom give false greens on layout-dependent rules), so the binding contract
should be **structural assertions in vitest**, not an axe gate — consistent with the
repo's no-Playwright posture. (If AT ever admits a Playwright wave, an axe smoke over
the dock story is the stretch; not binding now — mirrors DEC-AT-4's "vitest binding,
Playwright optional stretch" posture for the blob shader.)

---

## §8 — The Slider keep-dock-open contract (verified sound; one a11y note)

The bidirectional contract (`Slider.vue:56-88`, CLAUDE.md §"Slider keep-dock-open"):
on `pointerdown` the slider calls `dock?.keepOpen()` (acquire), and a window-scoped
`pointerup`/`pointercancel` calls `release()`. It also reflects `dock.held` via
`data-held` for thumb-halo intensification (`Slider.vue:149`). The design is sound:
- Uses the **optional** dock context (`useOptionalDockContext()`, `Slider.vue:56`) — a
  slider outside a dock no-ops cleanly. Correct.
- Ref-counted holds with a grace period on release (`useDockState.ts:251-263`) prevent
  premature collapse. Correct.

**The contract is deliberately POINTER-ONLY** (CLAUDE.md: "keyboard- and discrete-button
interactions on `<NumberField>` are not eligible because they have no continuous-
interaction window"). This is defensible BUT has an a11y edge **[K]**: a **keyboard**
user adjusting a Slider inside an auto-collapsing dock gets NO keep-open — the dock can
collapse mid-arrow-key-adjust after `collapseDelay` (2000ms). Today `onFocusIn`/
`onFocusOut` (`useDockState.ts:211-229`) keep the dock open *while focus is inside*, so
a focused slider keeps the dock open via the focus path — **the keyboard case is
already covered by the focus machinery, not the keepOpen token.** Verified: this is
fine; the pointer-only token is additive over the focus-keep, not the sole keep
mechanism. **No action** — but the dock-wave a11y test should ADD a regression assertion
that a focused descendant keeps the dock open (guards the focus-keep path B4-1's
roving-tabindex rewrite could perturb).

---

## §9 — Sources (SOTA, fetched 2026-06-04)

- [Tabs Pattern | WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) — tablist/tab/tabpanel roles, `aria-selected` (NOT `aria-pressed`), `aria-controls`/`aria-labelledby`, roving tabindex, vertical Up/Down, automatic vs manual activation, `aria-orientation`.
- [Toolbar Pattern | WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) — `role=toolbar`, one Tab-stop, arrow-key roving focus.
- [ARIA: toolbar role | MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role) — roving tabindex mechanics + scroll-into-view benefit.
- [Disclosure (Show/Hide) Pattern | WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) — `role=button` + `aria-expanded` + `aria-controls`; Enter/Space toggle.
- [Developing a Keyboard Interface | WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) — managing focus within composites (roving tabindex spec).
- [Understanding SC 2.3.3: Animation from Interactions | W3C](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) + [C39 prefers-reduced-motion technique](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) — disable/replace non-essential motion; opacity is non-spatial-safe.
- [prefers-reduced-motion | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — defensive vs progressive patterns.

Plus glass-ui internal corpus: `DockLayerGroup.vue`, `DockLayer.vue`, `GlassDock.vue`,
`dock.css`, `useDockState.ts`, `dockContext.ts`, `Slider.vue`, `utilities.css`,
`view-transition.css`, the dock `__tests__/`, `docs/tranches/AM/audit/W0-forms-a11y.md`
(gap 3 — the aria-contract origin), CLAUDE.md §"GlassDock aria contract" / §"Tabs vs
ToggleGroup" / §"Slider keep-dock-open contract"; `reka-ui` `dist/index.d.ts` (the
`Toolbar*` primitive family the dock does not use).

---

## §10 — AUGMENTED-AT proposal: a dedicated dock a11y+interaction wave

The AT plan touches the dock at W6 (binding guard, booked-not-built) and W7
(`overflow`/`wrap` prop-collapse — cosmetic). **Neither addresses the a11y debt above.**
Proposal: promote the dock work into a coherent design-slice + a dedicated wave, and
broaden the W6 guard into the binding a11y contract test. This is **not** scope-creep —
it clears the no-overfitting bar (the rail is real consumer surface: speedtest
SurveyResultDock + the muster/fourier dock chrome named across the dock docs; ≥2
distinct consumer contexts), it is a clean break (no back-compat alias — the rail's
`aria-pressed` becomes `aria-selected`/`role=tab`, a strict improvement), and it is a
gestalt redesign (adopt the APG composite model + optionally the reka-ui `Toolbar`
primitive rather than patch one attr).

### Design slice (add to AT.W1) — `design/AT.W1b-dock-a11y.md`

The hardened dock interaction+a11y contract, file:line-grounded:

1. **DockLayerGroup → APG Tabs.** `role=tablist` + `aria-orientation` + `aria-label`
   on `<nav>`; `role=tab` + `aria-selected` + `aria-controls` + roving `tabindex` per
   rail button; `role=tabpanel` + `aria-labelledby` + `tabindex=0` per `<DockLayer>`
   host; Up/Down (vertical) / Left/Right (horizontal) + Home/End arrow nav with
   automatic activation; PRM-aware scroll-into-view. **Decision point for W1:** adopt
   reka-ui `TabsRoot/List/Trigger/Content` (free roving tabindex + arrow model, matches
   the rest of glass-ui's reka-ui composition idiom) vs hand-roll. Recommend reka-ui —
   the dock already composes reka-ui (`DockSelectTrigger`/`DockDropdownTrigger`); a
   hand-rolled roving model is exactly the "fourth copy of boilerplate" the AT WebGL
   transposition rejects. **(B4-1)**
2. **Dock-control row → optional toolbar semantics.** Evaluate reka-ui `ToolbarRoot`
   for the icon-button row (one Tab-stop, arrow roving). Gate on consumer reality: if
   the live docks are mostly single-action triggers (Select/Dropdown that open their
   own popups), full toolbar roving may be overfit — **W1 must verify ≥2 docks have a
   multi-icon row** before committing the toolbar role. If thin, ship the tablist
   (B4-1) only and BOOK the toolbar. **(B4-4)**
3. **Focus-ring completeness.** Add `.dock-layer-tab:focus-visible` to the shared
   contract (`dock.css:32-37`); add the whole dock-control family to the forced-colors
   outline restoration (`utilities.css:1032-1040`). **(B4-2, B4-3)**
4. **The trigger exemplar.** Ship a canonical disclosure trigger (a `<DockIconButton>`
   bound to the dock's exposed `expanded` via `defineExpose` + `aria-expanded` +
   `aria-controls`→the dock body id) in the dock demo story, so the AM contract has a
   reference implementation, not just prose. **(B4-5)**
5. **Standalone rail coarse floor** (`dock.css` — mirror the `:not(--compact)` rule for
   `.dock-layer-tab`). **(§6 residual)**

### Wave (insert as **AT.W6.5 — Dock a11y + interaction hardening**, IMPL)

File-disjoint from the blob waves (W2-W5); composes with the W6 fold (shares the
binding-guard scope). Sequence after W6, before/with W7 (W7's `overflow`-collapse
touches `GlassDock.vue` props — land W6.5's `GlassDock.vue` template+aria edits and
W7's prop-collapse in one coherent dock pass to avoid a double-touch).

**Hard gate (binding — extends the W6 "dock binding-verification guard"):**
a `vitest` + `@vue/test-utils` dock a11y contract test (`DockLayerGroup.a11y.test.ts` +
`GlassDock.a11y.test.ts`) asserting, fail-closed:
- the rail emits `role=tablist`/`role=tab`/`aria-selected` (NOT `aria-pressed`) +
  `aria-controls` matching each pane's `role=tabpanel` id;
- exactly ONE rail tab is `tabindex=0`, the rest `tabindex=-1` (roving invariant);
- ArrowDown/ArrowUp (vertical) moves focus + activates the next/prev layer with wrap;
- the active `<DockLayer>` is `role=tabpanel` + `aria-labelledby`→its tab;
- `.dock-layer-tab` and every dock control resolves a non-empty `:focus-visible`
  box-shadow (structural — the rule exists; a snapshot of the selector group);
- the dock ROOT carries NO `role` and NO `aria-expanded` (the AM presentational-root
  contract, finally gated);
- a focused dock descendant keeps the dock open (the focus-keep regression guard, §8).

**Stretch (non-binding, BOOK):** an axe smoke over the dock demo story IF AT admits a
Playwright wave (it does not today — mirrors DEC-AT-4).

### Net AT delta
- AT.W1 gains one design file (`AT.W1b-dock-a11y.md`).
- A new IMPL wave **AT.W6.5** (or fold into W7's dock pass) carries the fix + the gate.
- W6's "dock binding-verification guard" is RE-SCOPED from a vague binding-check into
  the concrete dock a11y contract test above (the booked-not-built test finally lands
  with a real, SOTA-grounded spec).
- inv-16 clean (glass-ui-internal; the speedtest/muster/fourier dock consumers are
  name-forward, unchanged). No legacy (the `aria-pressed`→`aria-selected` swap is a
  clean break, no alias). No overfitting (≥2 dock consumer contexts; the toolbar role
  is itself gated on a ≥2 check at W1).
