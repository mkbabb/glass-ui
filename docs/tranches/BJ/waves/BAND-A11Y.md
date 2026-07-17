# BJ BAND-A11Y — the component a11y reformation (Family K)

Registry **Family K** — component a11y defects (`docs/tranches/BJ/formation/REGISTRY.md:257-263`, the NEW
round-2 family). Source: `round-2/accessibility-static-src-demo-audit.md` (all six findings), corroborated by
the independent second pass `round-2b-confirm/accessibility.md`. This band discharges the four live a11y
DEFECTS as one born-RED fix wave, and routes the two RULING/handoff items (dock roving-tabindex, hero heading
dedup) as a second wave. The genuinely-strong reduced-motion substrate is carved as a **confirmed KEEP** — a
named, load-bearing non-goal.

**DRAFT for the Fable two-challenge pass.** Every unsettled judgment is an `OPEN` marker, not a guess. This
band writes NO source: it names the fixes and authors the born-RED probes as the acceptance contract; the
source flips land in execution. Two of the four fixes carry a real design subtlety the audit's one-line
proposal misses (§Wave 1 B and C) — flagged inline, not smoothed over.

---

## §Band framing — what this band is and is not

The a11y lens verdict (round-2, re-proved round-2b): the library PRIMITIVES are in good shape — reka focus
traps intact, `DarkModeToggle` binds `aria-pressed` both-states correctly
(`src/components/dark-mode-toggle/DarkModeToggle.vue:30` `"aria-pressed": isDark.value`), constellation
`role=button` is keyboard-operable, and the **reduced-motion substrate is genuinely complete** (see the KEEP
below). The real defects cluster in DEMO landmark/name semantics and a few component state/focus gaps. All six
findings verified on disk at HEAD (paths confirmed `demo/` not `src/demo/`).

The band test substrate mirrors the existing a11y-test idiom exactly — `@vue/test-utils` `mount` in the
`happy-dom` env, `wrapper.get("button").attributes("aria-pressed")`-style RENDERED-attr asserts, tests under
`tests/**` (vitest `include`, `vitest.config.ts:31-34`), `@glass` → `src` alias, demo via relative
`../../demo/...`. Precedent probes to mirror: `tests/components/custom/dock/DockBackgroundToggle.a11y.test.ts`
(the "assert the RENDERED a11y contract, not mount success; Bite: drop the attr → reddens" discipline) and
`tests/components/ui/dialog/dialog-spring.test.ts` (portaled `DialogContent` via `attachTo: document.body` +
`stubs:{teleport:false}`). Per MEMORY `glass_ui_binding_verification`, an aria binding that silently no-ops is
caught ONLY by a rendered-attr assertion — every born-RED probe here reads the rendered DOM, not the source.

Two waves:

| Wave | Name | Motion | Born-RED? |
|------|------|--------|-----------|
| 1 | `BJ.W-A11Y-STATE` | Fix the 4 live defects: nav landmark · aria-pressed both-states · center-spring focus-return · placeholder contrast | Yes — each reds at HEAD (3 vitest DOM asserts + 1 vitest-fs source assert) |
| 2 | `BJ.W-A11Y-RULINGS` | The 2 rulings/handoffs: dock roving-tabindex/toolbar (OPEN ruling) · hero heading dedup (→ Family D) | No — a design ruling + a cross-family reference, not a fix |

### §The reduced-motion substrate — a CONFIRMED KEEP (band-wide non-goal)

Both audit passes independently confirmed the motion/reduced-motion substrate is strong and MUST NOT be
touched by this band or its fix waves:

- `src/styles/utilities/a11y-overrides.css` — the blanket `@media (prefers-reduced-motion: reduce)` rule snaps
  all CSS animation/transition (`:7-33`), and it deliberately OVERRIDES the `data-allow-motion` theme-flip
  carve (`:22-33` — "accessibility is absolute"). Forced-colors focus restore, the 44px touch-hit floor, and
  canvas `aria-hidden` all live here (the file header `:1-5`).
- Every JS/canvas animator (aurora, blob, fourier, constellation, typewriter, and springs via
  `createCanvasLifecycle`/`useReducedMotion`/`useMotionAxis`) gates on the shared reactive PRM signal.

**Non-goal (explicit):** no wave in this band modifies `a11y-overrides.css`, the PRM signal plumbing, the
`data-allow-motion` carve, the forced-colors focus restore, or the touch-hit-area utility. This KEEP is
recorded so a downstream "a11y sweep" impulse does not churn a working substrate (the parsimony edict: touch
only what is broken).

---

## Wave 1 — `BJ.W-A11Y-STATE` — the four live-defect fixes

### §Mandate

Discharges the four DEFECT findings of `round-2/accessibility-static-src-demo-audit.md` (findings 1-4;
`REGISTRY.md:257-262`): the missing navigation landmark, the one-directional toggle attribute, the
center-spring focus orphaning, and the sub-4.5:1 placeholder registers. Findings 5-6 (roving-tabindex note,
heading-dup note) are Wave 2. Each fix ships with a born-RED probe verified to fail at HEAD.

---

### (A) `nav-landmark` — SidebarDock adopts the BottomDock pattern

**Defect (verified at HEAD).** The desktop primary category rail exposes NO named navigation landmark:
- `demo/shell/AppShell.vue:174` wraps the rail in `<aside class="demo-sidebar-rail"
  data-shell-region="category-navigation">` — a top-level `<aside>` maps to the **complementary** landmark
  (wrong role for primary nav) and carries no `aria-label`.
- The intended name is set at `demo/shell/SidebarDock.vue:114` as `aria-label="Category navigation"` on
  `<GlassDock>`, but `GlassDock` renders a **role-less** `<div class="glass-dock" v-bind="$attrs">`
  (`src/components/dock/GlassDock.vue:286-289`; grep confirms zero `role` in the file), so `$attrs` deposits
  the name on a `role=generic` element where ARIA-in-HTML prohibits name-from-author and Chromium/Firefox drop
  it. Net: the primary IA surfaces as an unnamed complementary region on ~100 routes.
- The correct pattern already exists on the sibling: `demo/shell/BottomDock.vue:88` uses
  `<nav class="demo-bottom-dock" aria-label="Stories in category">`. This is DIVERGENCE, not ignorance.

**Fix (gestalt — mirror BottomDock).** Change `AppShell.vue:174` `<aside …>` → `<nav aria-label="Category
navigation">` (the landmark + name land on a role-bearing element), and **drop** the inert
`aria-label="Category navigation"` from the `GlassDock` at `SidebarDock.vue:114` (a role-less div cannot carry
it). No new attribute machinery; one element rename + one dead-attr deletion. The `role="group"
aria-label="Categories"` inner grouping (`SidebarDock.vue:120`) is untouched — it groups the category buttons
WITHIN the nav landmark and is correct.

**Born-RED probe** (`tests/demo/shell/sidebar-nav-landmark.test.ts`, vitest DOM):
- Assert `SidebarDock`'s rendered `.glass-dock` root has NO `aria-label` attribute. **RED at HEAD**:
  `SidebarDock.vue:114` stamps it. GREEN after the drop. (Component-level mount; the cleanest isolated bite —
  SidebarDock needs the configurator/router context, stub per the `tests/demo/landing.test.ts` idiom.)
- Assert the category-navigation region renders as `nav[aria-label="Category navigation"]` (query the landmark
  element). **RED at HEAD**: the region is `<aside>` with no label. GREEN after the AppShell rename.
- Bite: re-add the GlassDock `aria-label`, or revert the aside → the probe reddens.

`OPEN-A1`: the AppShell-landmark assert may require a full AppShell mount (router + substrate providers), which
is heavy in happy-dom. Draft: mount AppShell with a stubbed router/aurora (or assert the landmark on the
smallest region harness that includes `AppShell.vue:174`). The **SidebarDock aria-label-drop assert is the
guaranteed-clean companion** and reds independently — if the full-AppShell landmark assert proves brittle,
Fable may keep the region-element assert as a lighter structural check. This is a probe-harness choice, not a
scope question.

---

### (B) `aria-pressed-both-states` — DockControl toggle state, WITHOUT over-application

**Defect (verified at HEAD).** `src/components/dock/DockControl.vue:96-106` `stateAttrs` emits `aria-pressed`
ONLY in the active state: `...(props.active ? { "aria-pressed": "true", "data-active": "" } : {})` (`:97`) —
when `active` is false the spread contributes no `aria-pressed`, so a toggled-off dock control announces as a
plain button, not a toggle-that-is-off (WCAG 4.1.2 state-exposure gap). The prop doc (`:47-50`) documents
`active` as "Selected/toggled state. Stamps `aria-pressed`". Used as a real toggle at
`demo/stories/dock/overview.tile.vue:15` (`active`) and `demo/stories/dock/controls.vue:112` (`:active="true"`).
The correct both-state exemplar to match is `DarkModeToggle.vue:30` (`"aria-pressed": isDark.value`).

**The subtlety the audit's proposal misses (load-bearing).** The audit proposes `"aria-pressed": props.active
? "true" : "false"`. Applied naively this **over-applies**: `active` defaults to `false`
(`DockControl.vue:67`), so EVERY DockControl — including the pure NAV controls that use `aria-current` not
toggle semantics (SidebarDock category chips `SidebarDock.vue:124-131`, BottomDock story tabs
`BottomDock.vue:185-195`, the prev/next arrows `BottomDock.vue:161-210`) — would gain `aria-pressed="false"`
and be mis-announced as an unpressed toggle button. That is a regression, not a fix. A nav-link is not a
toggle.

**Fix (gestalt — a tri-state `active`, no new prop).** Drop the `active: false` default (`:67`) so the prop is
`active?: boolean` = `undefined` when unset. Then `stateAttrs` emits `aria-pressed` both-states ONLY when the
consumer opted in: `"aria-pressed": String(props.active)` when `props.active !== undefined`, and NOTHING when
`undefined` (nav/plain-button mode). Keep `data-active` (the CSS hook) and `{ "glass-capsule": props.active }`
(`:86`) on `active === true` — `undefined`/`false` are both falsy for those, unchanged. Fewest lines: one
default removed, one ternary widened; toggle controls gain the off-state, nav controls stay clean.

**Born-RED probe** (`tests/components/custom/dock/DockControl.a11y.test.ts`, vitest DOM — mirror
`DockBackgroundToggle.a11y.test.ts`):
- `mount(DockControl, { props:{ active:false } })` → assert `attributes("aria-pressed") === "false"`.
  **RED at HEAD**: `active:false` emits no `aria-pressed`. GREEN after fix.
- `mount(DockControl, { props:{ active:true } })` → `aria-pressed === "true"` (regression guard; passes at HEAD).
- **The over-application GUARD:** `mount(DockControl)` with NO `active` prop → assert `aria-pressed` is
  **absent**. Passes at HEAD; would FAIL under the naive `? "true":"false"` fix, PASSES under the tri-state
  fix. This probe encodes the subtlety so the wrong fix cannot land green.
- Bite: revert to the one-directional spread → the `active:false` assert reddens.

`OPEN-B1` (minor, form): the tri-state-`active` approach (drafted) vs a distinct explicit `toggle?: boolean`
prop that switches DockControl between nav-button and toggle modes. Draft leans tri-state `active` (no new
surface; the prop is already documented as "toggled state"). Fable rules the form. Either way the guard probe
above is the invariant.

---

### (C) `center-spring-focus-return` — extend the watch AND un-gate the anchor

**Defect (verified at HEAD).** A centered dialog with a `springPreset` orphans keyboard focus on `<body>`
through its close animation. On logical close the content is marked `inert` while still mounted for the exit
spring — `src/components/dialog/DialogContent.vue:370-374` applies `closingInert` for BOTH `sideSpringLive`
AND `centerSpringActive` — which bounces focus to body; but the early focus-return watch only covers side
sheets: `DialogContent.vue:396-405`, guard at `:399` `if (!sideSpringLive.value || open !== false) return`, so
it never runs for `centerSpringActive` (`:100`). reka restores focus only at final unmount, so focus parks on
body for the entire exit spring. `DrawerContent.vue:98-106` has the equivalent watch for its case; the
center-spring path is the lone gap. Reachable in the shipped demo: `demo/stories/containers/dialog.vue:326`
`<DialogContent :spring-preset="dialogSpring" class="sm:max-w-sm">` is centered (no placement) with a
springPreset.

**The subtlety the audit's proposal misses (load-bearing).** The audit proposes extending the guard to
`(sideSpringLive || centerSpringActive)`. That alone is INSUFFICIENT: the watch resolves the content element
via `resolveSideContentEl()` (`:392-395`) which reads `sideAnchorEl`, and the anchor span is rendered ONLY for
side sheets — `DialogContent.vue:465` `<span v-if="!isCenter" ref="sideAnchorEl" hidden />`. For a center
dialog `isCenter` is true → the anchor never mounts → `resolveSideContentEl()` returns `null` → the extended
guard still can't find the content to test containment. The fix MUST ALSO make the content element resolvable
on the center path.

**Fix (gestalt — one guard + one un-gate).** (1) Widen the `:399` guard to
`if (!(sideSpringLive.value || centerSpringActive.value) || open !== false) return`. (2) Drop the `!isCenter`
condition on the anchor at `:465` so it always renders (it is a `hidden` zero-cost marker), OR resolve the
content element from a direct ref on the `[data-slot="dialog-content"]` node — either makes
`resolveSideContentEl()` non-null for center. Rename `sideAnchorEl`/`resolveSideContentEl` → `anchorEl`/
`resolveContentEl` to reflect they now cover both paths (cosmetic, matches DrawerContent's `resolveContentEl`
naming). Net: the center-spring dialog returns focus to its trigger at logical close, matching the
side-sheet/drawer contract.

**Born-RED probe** (`tests/components/ui/dialog/dialog-focus-return.test.ts`, vitest DOM — mirror
`dialog-spring.test.ts` mount: `attachTo: document.body`, `stubs:{teleport:false}`):
- Mount a `Dialog` with a `DialogTrigger` button and a `DialogContent :spring-preset="smooth"` (center path,
  no placement). Open it, move `document.activeElement` into the content, then set the root `open` → `false`
  (logical close; inert-but-mounted exit window). Assert `document.activeElement` is the TRIGGER, not `body`.
  **RED at HEAD**: the watch early-returns for center → focus is not pulled back → trigger is not focused.
  GREEN after the guard-widen + anchor un-gate. (The watch is `{ flush:"sync" }` `:404`, so its effect is
  observable within the same tick as the `open` change.)
- Bite: revert either the guard or the anchor un-gate → the probe reddens (guard-only revert proves the anchor
  un-gate is load-bearing).

`OPEN-C1` (probe-fidelity): happy-dom does not run reka's real `inert`-bounce-to-body, so the probe asserts the
watch's OBSERVABLE effect (`triggerElement.focus()` was invoked → `activeElement === trigger` after logical
close) rather than simulating the browser inert bounce. Draft: the sync-watch effect assert is the honest
device-free contract; the full inert-bounce → restore choreography is additionally owed as the π/DELTA below.
Fable confirms the device-free assert is the born-RED vehicle.

---

### (D) `placeholder-contrast` — unify every page-opaque placeholder on one ≥4.5:1 token

**Defect (verified at HEAD).** Multiple divergent input-placeholder registers fall below the 4.5:1 text floor
by two different mechanisms, and the divergence itself makes placeholder contrast inconsistent across input
families. Full census on disk (the audit named the first two; the same mechanism at the next two is verified
here — same defect, cited file:line, folded per the gestalt/KISS edict):

| # | selector | site | color | verdict |
|---|----------|------|-------|---------|
| 1 | `.input-pill::placeholder` | `src/styles/glass/control-surfaces.css:66-68` | `var(--surface-tint-35)` = `color-mix(in srgb, var(--foreground) 35%, transparent)` (`color-radius.css:163`) | FAIL — 35% alpha of near-black over a light surface |
| 2 | `.field-control::placeholder` | `src/components/_shared/field-control.css:58-61` | `var(--muted-foreground)` × `opacity:0.68` | FAIL — compounds an already-muted token below its own headroom |
| 3 | `.input-bar-field::placeholder` | `src/styles/utilities/components.css:63` | `color-mix(in srgb, var(--muted-foreground) 50%, transparent)` | FAIL — 50% alpha of the muted token |
| 4 | `.tags-input__input::placeholder` | `src/components/tags-input/styles.css:38-39` | `var(--surface-tint-35)` | FAIL — same alpha mechanism as #1 |
| — | `.command__input::placeholder` | `src/components/command/styles.css:54` | `var(--muted-foreground)` (full opacity) | **PASS — the proof exemplar** |
| — | dock-search placeholders | `src/components/dock/styles/search.css:52-54` | `var(--on-glass-muted)` | **KEEP** — deliberate translucent-plate register (documented `:52-53`: "NOT `--muted-foreground`, which collapses on a translucent darkened plate") |

The proof that `--muted-foreground` at full opacity clears the floor: `--muted-foreground` = `--neutral-5`
(`color-radius.css:85`) = `hsl(30 22% 40%)`, documented at `color-radius.css:45` as "WCAG AA: 5.21:1 vs page /
4.90:1 vs muted". `.command__input` already uses exactly this and is the correct register.

**Fix (gestalt — one token, no alpha, no opacity).** Set placeholders #1-#4 to `color: var(--muted-foreground)`
at full opacity (the `.command__input` register): remove `opacity:0.68` from `.field-control`, remove the 50%
`color-mix` from `.input-bar-field`, repoint `.input-pill` + `.tags-input__input` off `--surface-tint-35`. One
placeholder register across every page-opaque input family. The dock-search `--on-glass-muted` is a distinct,
DOCUMENTED context (translucent plate) and stays — a named non-goal (see below). The fields carry persistent
labels via LabeledField, so this is contrast-QUALITY, not name-loss.

**Clean-break follow-on.** After #1/#4 are repointed, `--surface-tint-35` has ZERO real consumers — grep
confirms its only remaining references are its own definition (`color-radius.css:163`), dark arm
(`src/styles/tokens/dark-arm.css:329`), and the `--color-surface-tint-35` bridge (`bridges.css:153`). Per the
no-backwards-compat edict, it is a clean-break delete candidate (token + dark-arm + bridge). `OPEN-D1`: delete
`--surface-tint-35` outright (drafted, parsimony) vs retain it as a public tint utility exposed via the bridge.
Fable rules — if retained, it must gain a real non-placeholder consumer or the delete stands.

**Born-RED probe** (`tests/styles/placeholder-contrast.test.ts`, vitest-**fs** source assert). Contrast is
NOT device-free-computable: happy-dom `getComputedStyle` resolves neither `var()`/`color-mix()` nor
`::placeholder` compositing (and vitest component mounts do not apply the stylesheet), so a DOM computed-contrast
assert is not viable here — this is the one fix of the four whose born-RED vehicle is a source scan, not a DOM
assert. The gate reads the four CSS partials and asserts every page-opaque `::placeholder` declaration resolves
to `color: var(--muted-foreground)` with no `opacity < 1` on the rule and no sub-100% `color-mix`/`--surface-
tint-*`. **RED at HEAD**: #1/#4 use `--surface-tint-35`, #2 carries `opacity:0.68`, #3 the 50% mix. GREEN when
all four are on the bare token. The dock-search `--on-glass-muted` selector is on the gate's documented
allowlist (translucent-plate exception). Bite: plant an `opacity:0.5` on a placeholder rule → reddens.

`OPEN-D2` (allowlist): the gate exempts `--on-glass-muted` (translucent plate). Any future on-glass placeholder
joins the allowlist; the gate must not force `--muted-foreground` onto a translucent surface (where it
collapses). Fable ratifies the allowlist shape.

### §π/DELTA (Wave 1)

The placeholder fix (D) is the band's paint obligation. The born-RED gate proves the SOURCE is on one token;
the ACTUAL ≥4.5:1 is a browser contrast probe. **π obligation:** on Chrome-current + Safari-current, light and
dark modes, capture the computed placeholder contrast ratio for each input family (input-pill, field-control,
input-bar-field, tags-input, command) against its rendered input surface — every page-opaque family ≥4.5:1
after the fix; dock-search checked against its plate under its own register. The evidence is a captured
before/after DELTA (the failing HEAD ratios → the ≥4.5:1 post-fix ratios) per MEMORY `live_verify_capture` — a
captured artefact, not a commit-message claim. The center-spring focus fix (C) additionally owes a browser
capture of the real inert-bounce → focus-restore choreography (device-free asserts the watch effect; the
browser proves the full close-spring keeps focus on the trigger). Fixes A and B are name/state semantics with
no pixel change — no π (the rendered-attr asserts are the whole contract).

### §KISS / parsimony (Wave 1)

Every fix is the fewest-lines gestalt, not a patch: (A) one element rename + one dead-attr delete (adopt an
existing pattern, don't invent); (B) one default removed + one ternary widened (tri-state, no new prop); (C)
one guard widened + one `v-if` dropped (reuse the drawer contract); (D) five registers collapse to one token +
a dead token deleted. No new abstraction, no fallback ladder, no legacy alias. The reduced-motion substrate is
untouched (the KEEP).

### §Non-goals (Wave 1)

- NOT the reduced-motion substrate (the band-wide KEEP).
- NOT the dock-search `--on-glass-muted` placeholder (documented translucent-plate register).
- NOT the dock roving-tabindex / toolbar role, NOT the heading dedup (Wave 2).
- NOT the round-2b-only findings (skip-to-content link, DockControl native+aria-disabled double-stamp) — see
  §Adjacent below; they are outside this band's six round-2 findings and are routed, not drafted, here.

---

## Wave 2 — `BJ.W-A11Y-RULINGS` — the two rulings & the cross-family handoff

### §Mandate

Discharges findings 5-6 of `round-2/accessibility-static-src-demo-audit.md` (both `[note]`,
`REGISTRY.md:263`): the absent dock roving-tabindex/toolbar-role (a ruling — no hard WCAG failure) and the hero
h1/h2 heading duplication (SHARED with Family D — reference, don't duplicate). Neither is born-RED here: (5)
needs a design ruling before any probe can be authored; (6) is fixed by Family D's story-reformation band.

---

### (E) `dock-roving-tabindex-toolbar-role` — OPEN, needs a design ruling

**Finding (verified at HEAD).** The dock implements no roving tabindex, no arrow-key navigation, and carries no
`toolbar`/`tablist` widget role — it is a role-less div of individually-tabbable buttons:
- `src/components/dock/GlassDock.vue` has no keyboard handling and no `role` (grep: zero `role`, zero arrow/
  roving logic; expansion is hover/focus-driven only). Each `DockControl` renders a `<button>`, so all are in
  tab order individually.
- For the two primary-nav docks this makes every control a separate tab stop (sidebar: ~8 categories + gear;
  bottom dock: ~10+ story tabs + 6 arrow controls).
- The story-tab strip presents nav-links as visual tabs WITHOUT tab/tablist semantics:
  `demo/shell/BottomDock.vue:185-195` renders the category-page tabs as `DockControl`s with `aria-current="page"`
  but no `role="tab"`/`role="tablist"`. `SidebarDock.vue:120` and `BottomDock.vue:153,221` use `role="group"`.
- **Comment-vs-reality mismatch:** `SidebarDock.vue:104,117` comments describe a "roving category tablist … one
  tab stop", but the DOM is a `role="group"` of individually-tabbable buttons — no roving tabindex, no
  ArrowUp/Down handler anywhere in the dock. (round-2b `nav-keyboard-model-mismatch` independently flagged this.)

Operable per WCAG 2.1.1 — **no hard failure either way** — but not the ARIA toolbar/tablist authoring pattern
the charter's roving-tabindex expectation names.

**The ruling (`OPEN-E1`, substantive — needs a design decision, NOT a fix here).**
- **Ruling A — implement the pattern:** add a shared roving-tabindex + arrow-key composable and
  `role="toolbar"` (or `role="tablist"` for the story-tab strip). This is a NEW dock composable and a real
  keyboard-model change. If taken, it belongs with **Family G's dock GREENFIELD** (`REGISTRY.md:141-153`,
  visual family 6 — the dock is already being re-architected there for overflow/affordance); a future wave
  authors the roving-tabindex behavior tests born-RED. Do not fork a second dock keyboard model in this band.
- **Ruling B — ratify the nav-link stance:** accept "each control is its own tab stop" as the deliberate
  nav-link semantics (WCAG-acceptable) and CORRECT the misleading "roving tablist" comments
  (`SidebarDock.vue:104,117`). If taken, the comment truth-up folds into **Family J's doc-truth sweep**
  (`REGISTRY.md:178-186`), and the born-RED becomes a comment-accuracy assert, not a keyboard change.

Draft takes no side: this is a genuine toolbar-vs-nav-links design question the a11y lens cannot settle alone.
Fable/design rules A or B; the ruling determines the owning family (G or J). Either way this band authors NO
dock keyboard change — it records the ruling and the handoff.

**Adjacent (`OPEN-E2`, same DockControl surface).** round-2b `redundant-native-disabled-state`
(`round-2b-confirm/accessibility.md:34-39`): `DockControl.vue:98-104` stamps BOTH native `disabled` and
`aria-disabled="true"`; native disabled dominates (removes focusability), so a boundary nav arrow
(`BottomDock` prev/next `:disabled="!hasPrev"`) cannot be focused to surface its tooltip. This is the same
"is DockControl a toggle/nav or a boundary control" ruling as (E) and (B) — Fable should settle the DockControl
semantic model ONCE across B/E/E2. It is a round-2b finding (outside this band's six round-2 findings), so it
is FLAGGED here for the same ruling, not drafted as a fix.

---

### (F) `hero-heading-dedup` — SHARED with Family D (reference, do NOT duplicate)

**Finding (verified at HEAD).** Substrate studio (hero) pages render the same page title at two heading
levels: `demo/chassis/hero/StoryHero.vue:162-168`/`:186-192` render `<h1>{{ heroDisplayTitle }}</h1>`
(= `story.title`) for hero routes; VizStudio wraps content in `<StorySection :heading>` which
`demo/chassis/section/StorySection.vue:32` renders as `<h2 class="text-subheading">{{ heading }}</h2>`;
`demo/stories/substrates/aurora.vue:122` passes `heading="Aurora"` while the route is `hero:true`
(`demo/stories/manifest.ts:353,390`), so "Aurora" appears as both `h1` and `h2` — same for blob, fourier-field.
A redundant, confusing heading tree for screen-reader heading navigation.

**Owner — Family D, NOT this band.** This is registry member `story:hero-variant-heading-duplication`
(`REGISTRY.md:94`), owned by **Family D — the story reformation** band (`REGISTRY.md:87-106`), and logged
structurally at `round-1/story-page-structure-census.md:41-47`. The a11y lens CORROBORATES it (heading-tree
framing); it does not re-own it. The fix — suppress the StoryHero title when VizStudio owns the section heading,
OR drop the redundant StorySection heading on hero-variant studios (so each page exposes exactly one `h1` +
non-duplicated outline) — lands in Family D's hero-hierarchy wave, verified in-browser (both must still render).

**Handoff.** Family D's story-reformation band file is not yet drafted (only `BAND-COLOCATION`,
`BAND-DOC-TRUTH`, `BAND-GATES` exist). This wave records the a11y corroboration and the pointer
(`REGISTRY.md:94` + census `:41-47`) so the Family D drafter picks it up. **No fix, no probe, no source change
here** — a pure cross-family reference, so the outline fix is authored once.

### §π/DELTA (Wave 2)

None from this band: (E) is a ruling (its π, if Ruling A, belongs to the future Family G roving-tabindex wave);
(F)'s heading-tree/in-browser verification belongs to Family D. This band produces a ruling and a reference,
not a paint.

### §KISS / parsimony (Wave 2)

The parsimony move is to NOT act: (E) records a ruling + handoff rather than forking a second dock keyboard
model; (F) references Family D rather than duplicating the heading fix. Deciding the DockControl semantic model
ONCE (B/E/E2 together) is the gestalt, not three per-symptom patches.

### §Non-goals (Wave 2)

- NOT implementing dock roving-tabindex/toolbar here (Ruling A → Family G if taken).
- NOT re-owning the heading dedup (Family D).
- NOT the reduced-motion substrate (the band-wide KEEP).

---

## §Adjacent — round-2b findings outside this band's six (routed, not drafted)

The confirmation pass `round-2b-confirm/accessibility.md` surfaced two findings NOT among the six round-2
findings this band is scoped to. Recorded here so they are not lost, but NOT drafted as fixes (staying inside
scope, no invented work):
- `bypass-blocks-no-skip-link` (`:26-31`) — no skip-to-content link; a keyboard-only user tabs the whole
  persistent SidebarDock before reaching `<main tabindex="-1">` (`AppShell.vue:185`). A demo-shell a11y gap;
  routes to whoever owns the AppShell shell pass (Family D story/shell or a follow-on). `OPEN` for the lead to
  assign.
- `redundant-native-disabled-state` (`:34-39`) — folded into `OPEN-E2` above (same DockControl ruling).

---

## §Band-level obligations & OPEN roll-up

**Coordination handoffs:**
- (E) dock roving-tabindex → Family G dock greenfield (if Ruling A) OR Family J comment truth-up (if Ruling B).
- (E2) DockControl native+aria-disabled → the same DockControl-semantic-model ruling as (B)/(E).
- (F) hero heading dedup → Family D story-reformation band (`REGISTRY.md:94`).
- (D) `--surface-tint-35` clean-break delete → confirm no cross-repo consumer before the token drop.

**OPEN markers for the Fable two-challenge pass:**
1. `OPEN-A1` — AppShell-landmark probe harness: full-AppShell mount (router/substrate stubs) vs region-element
   structural assert; the SidebarDock aria-label-drop assert is the guaranteed-clean companion. [W1-A]
2. `OPEN-B1` — DockControl toggle form: tri-state `active` (drafted) vs explicit `toggle?` prop. [W1-B]
3. `OPEN-C1` — center-spring focus probe fidelity: device-free sync-watch-effect assert (drafted) + browser
   inert-bounce π. [W1-C]
4. `OPEN-D1` — `--surface-tint-35` after repoint: delete outright (drafted) vs retain as public tint utility. [W1-D]
5. `OPEN-D2` — placeholder-contrast gate allowlist (the `--on-glass-muted` translucent-plate exception). [W1-D]
6. `OPEN-E1` — **the dock keyboard-model ruling** (Ruling A: toolbar/roving-tabindex → Family G; Ruling B:
   nav-link stance + comment truth-up → Family J). Substantive; determines owning family. [W2-E]
7. `OPEN-E2` — DockControl native+aria-disabled double-stamp; settle the DockControl semantic model once
   across B/E/E2. [W2-E]
8. `OPEN` (lead) — the round-2b skip-to-content link: assign an owner (shell pass). [Adjacent]

**In-scope count:** 4 born-RED fixes (W1: 3 vitest DOM asserts + 1 vitest-fs source assert, each verified RED
at HEAD) + 1 substantive dock ruling + 1 cross-family reference (W2). The confirmed reduced-motion KEEP is the
band's explicit non-goal. This band closes the round-2 a11y family: the four live defects flip GREEN, the two
rulings route to their owning families, and the working motion substrate is protected.
