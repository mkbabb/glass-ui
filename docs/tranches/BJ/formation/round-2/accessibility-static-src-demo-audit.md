# Round 2 — accessibility (static src/ + demo audit)

## Summary

Static a11y audit of src/ + demo. The motion/reduced-motion substrate is genuinely strong: a blanket `prefers-reduced-motion` rule in a11y-overrides.css snaps all CSS animation/transition (including the data-allow-motion carve), and every JS/canvas animator (aurora, blob, fourier, constellation, typewriter, springs via createCanvasLifecycle/useReducedMotion/useMotionAxis) gates on the shared reactive PRM signal; forced-colors focus restore, touch-hit-area 44px floor, and canvas aria-hidden are all handled. reka contracts are intact (no stale :pressed/v-model:search-term/tag= bindings; DarkModeToggle uses correct aria-pressed both-states; constellation role=button IS keyboard-operable via useConstellation keydown). The real defects cluster in DEMO landmark/name semantics and a few component-level state/focus gaps: (1) MAJOR — the primary category rail (SidebarDock) has no navigation landmark and its aria-label is dropped onto a role-less GlassDock div, while its sibling BottomDock correctly uses `<nav>`; (2-3) MINOR — DockControl exposes aria-pressed only when on, and center-spring centered dialogs orphan focus on body during close (only side-sheets/drawer got the return-focus watch); (4) MINOR — two divergent low-contrast placeholder registers; plus notes on absent dock roving-tabindex/toolbar-role and the hero-page h1/h2 title duplication. No source files were modified.

## Findings (6)

### [major] aria-name-on-role-less-element / missing-navigation-landmark

**Claim:** The desktop primary category rail (SidebarDock) exposes NO navigation landmark and its accessible name is silently dropped: the `aria-label` is placed on `<GlassDock>`, which renders a role-less `<div class="glass-dock">`, so the name has no effect (generic elements do not compute a name from author); and AppShell wraps it in an `<aside>` (complementary), not a nav landmark. Screen-reader users cannot landmark-jump to the primary navigation on any of the ~100 routes.

**Evidence:** demo/shell/SidebarDock.vue:110-116 sets `<GlassDock orientation="vertical" ... aria-label="Category navigation">` (comment 103-104 states this IS the "primary navigation surface"). GlassDock renders a bare div with no role: src/components/dock/GlassDock.vue:286-289 `<div ref="dockEl" v-bind="$attrs" class="glass-dock" ...>` (grep confirms zero `role` attribute anywhere in the file). aria-label on a role=generic div is ignored per ARIA-in-HTML. AppShell.vue:174-176 nests it in `<aside class="demo-sidebar-rail" ...>`. Contrast the sibling BottomDock.vue:88 which does it correctly: `<nav class="demo-bottom-dock" aria-label="Stories in category">` wrapping its GlassDock — proving the correct pattern exists and SidebarDock diverges from it.

**Proposed:** build — wrap SidebarDock's GlassDock in `<nav aria-label="Category navigation">` (mirroring BottomDock), or change AppShell's `<aside>` to `<nav>`; drop the inert aria-label from the presentational GlassDock div.

### [minor] one-directional-toggle-state-attribute

**Claim:** DockControl emits `aria-pressed` ONLY in the active/on state; the off state carries no `aria-pressed` at all, so a toggle dock control is announced as a plain button when unpressed rather than as a toggle button that is currently off (WCAG 4.1.2 state exposure gap).

**Evidence:** src/components/dock/DockControl.vue stateAttrs computed: `...(props.active ? { "aria-pressed": "true", "data-active": "" } : {})` — when `active` is false the spread contributes no `aria-pressed`. The `active` prop is documented (DockControl.vue prop doc) as "Selected/toggled state. Stamps `aria-pressed`". A toggle must expose `aria-pressed="false"` when off; present-only-when-true means AT cannot perceive the control is a toggle nor its off state.

**Proposed:** fix — bind `aria-pressed` to the boolean whenever the control is used as a toggle (`"aria-pressed": props.active ? "true" : "false"`), keeping `data-active` as the CSS-only hook.

### [minor] inert-while-mounted-focus-orphaning

**Claim:** A centered dialog with a `springPreset` orphans keyboard focus on `<body>` during its close animation: on logical close the content is marked `inert` while still mounted (spring exit), which bounces focus to body, but the early focus-return-to-trigger watch only covers side sheets — reka restores focus only at final unmount, so focus parks on body for the entire exit spring. Side sheets and the Drawer both have the guard; the center-spring path is the gap.

**Evidence:** src/components/dialog/DialogContent.vue:370-374 `closingInert` applies inert for BOTH `sideSpringLive` and `centerSpringActive` when closed; but the focus-handoff watch at DialogContent.vue:396-405 guards on `if (!sideSpringLive.value || open !== false) return` — it never runs for `centerSpringActive`. DrawerContent.vue:98-104 has the equivalent watch for its case. The path is reachable in the shipped demo: demo/stories/containers/dialog.vue:326 `<DialogContent :spring-preset="dialogSpring" class="sm:max-w-sm">` is centered (no placement) with a springPreset.

**Proposed:** fix — extend the focus-return watch condition to `(sideSpringLive || centerSpringActive)` so a center-spring dialog returns focus to its trigger at logical close, matching the side-sheet/drawer contract.

### [minor] compounded-alpha-and-muted-placeholder-contrast

**Claim:** Two divergent input-placeholder registers both risk falling below the 4.5:1 text-contrast floor, one by alpha, one by compounding an already-muted token with opacity. The two mechanisms also make placeholder contrast inconsistent across input families.

**Evidence:** src/styles/glass/control-surfaces.css:66-68 `.input-pill::placeholder { color: var(--surface-tint-35); }`; `--surface-tint-35` resolves to `color-mix(in srgb, var(--foreground) 35%, transparent)` (src/styles/tokens/color-radius.css:163) — 35%-alpha of near-black `--foreground` (hsl(24 10% 10%)) over a light input surface computes well under 4.5:1. Separately src/components/_shared/field-control.css:58-61 `.field-control::placeholder { color: var(--muted-foreground); opacity: 0.68; }` multiplies the already-reduced `--muted-foreground` (=`--neutral-5`, color-radius.css:85) by 0.68, compounding the reduction below the muted token's own headroom.

**Proposed:** fix — set both placeholder registers to a single token proven ≥4.5:1 (e.g. `--muted-foreground` at full opacity), remove the compounding `opacity:0.68`, and drop the 35%-alpha `--surface-tint-35` placeholder color; note the fields do carry persistent labels via LabeledField, so this is contrast-quality not name-loss.

### [note] absent-roving-tabindex-and-widget-role

**Claim:** The dock implements no roving tabindex, no arrow-key navigation, and carries no toolbar/tablist widget role — it is a role-less div of individually-tabbable buttons. For the two primary-nav docks this makes every control a separate tab stop (sidebar: ~8 categories + gear; bottom dock: ~10+ story tabs + 6 arrow controls), and the story-tab strip presents nav-links as visual tabs without the tab/tablist semantics.

**Evidence:** src/components/dock/GlassDock.vue has no keyboard handling and no role (grep: zero `role`, zero `keydown`/roving-tabindex logic; expansion is hover/focus-driven via onFocusIn/onFocusOut only). Each DockControl renders a `<button>` (DockControl.vue Primitive `as:"button"`), so all are in tab order individually. demo BottomDock.vue:184-196 renders the category-page tab strip as DockControls with `aria-current="page"` but no `role="tab"`/`role="tablist"`; SidebarDock.vue:120 and BottomDock.vue:153/221 use `role="group"` (no roving-tabindex implication). Operable per WCAG 2.1.1, but not the ARIA toolbar/tablist authoring pattern the charter's roving-tabindex expectation names.

**Proposed:** consider — if the docks are to read as toolbars, add a roving-tabindex + arrow-key composable and a `role="toolbar"`; otherwise document the deliberate "each control is its own tab stop" nav-link stance. No hard failure either way.

### [note] redundant-heading-level-duplication

**Claim:** Substrate studio (hero) pages render the same page title at two heading levels — an `<h1>` from StoryHero and an identical `<h2>` from the inner StorySection — producing a redundant, confusing heading tree for screen-reader heading navigation. (A11y framing corroborating the round-1 story-page-structure census's `hero-variant-heading-duplication`.)

**Evidence:** StoryHero.vue:162-168 / :186-192 render `<h1>{{ heroDisplayTitle }}</h1>` (= story.title) for hero routes; VizStudio wraps content in `<StorySection :heading>` which StorySection.vue:32 renders as `<h2 class="text-subheading">{{ heading }}</h2>`; aurora.vue:122 passes `heading="Aurora"` while the route is hero:true (manifest.ts:435-437), so "Aurora" appears as both h1 and h2 (same for blob, fourier-field). Logged structurally at docs/tranches/BJ/formation/round-1/story-page-structure-census.md:41-47.

**Proposed:** build — suppress the StoryHero title when VizStudio owns the section heading, or drop the redundant StorySection heading on hero-variant studios, so each page exposes exactly one h1 and a non-duplicated heading outline.

