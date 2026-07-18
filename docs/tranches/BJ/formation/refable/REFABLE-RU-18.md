# REFABLE RU-18—the accessibility audit union (redo)

- **Unit**: RU-18—static accessibility audit of src/ + demo (roles, names, focus order,
  keyboard reach, ARIA contracts on the reka-wrapped components, contrast-bearing token
  pairs, PRM coverage), re-run anew and unioned against the two opus artifacts.
- **Verified model**: this seat is powered by `claude-fable-5` (read verbatim from the
  system context: "The exact model ID is claude-fable-5"). Prior artifacts
  (`round-2/accessibility-static-src-demo-audit.md`, `round-2b-confirm/accessibility.md`):
  opus-authored per the REFABLE demarcation.
- **HEAD at audit**: `2df6a5a5` (2026-07-18).
- **Step-1 ANEW**: fresh static audit executed against src/ + demo at HEAD with both opus
  artifacts unread—reka binding sweep (the stale-binding trap class), component-by-component
  ARIA contract reads (dock, dialog, drawer, slider, toggle-group, pager-dots, tabs,
  timeline, search, easing, constellation, blob, toast, labeled-field), the a11y utility
  layer (a11y-overrides.css, focus-ring, touch-hit-area), the token contrast registers
  (light-dark.css, on-glass-fg.css), and the demo shell (AppShell, SidebarDock, BottomDock,
  story layer sample).
- **Step-2 boundary moment**: 2026-07-18, this session—the ANEW pass closed (findings fixed
  in-session) BEFORE either opus artifact was opened; both then read assume-incorrect and
  every claim re-verified against the files at HEAD.
- **Step-3 UNION**: this sidecar. Verdicts per claim; ROUTING proposed only—no source file
  touched.

## ANEW baseline (the independent picture at HEAD)

The static substrate is genuinely strong, and the ANEW pass confirms it from primary
sources:

- **Reka contracts clean.** Zero instances of the named no-op trap class (`:pressed`,
  `v-model:search-term`, `tag=`); `useForwardPropsEmits` discipline throughout; the two
  known reka forwarding traps are handled explicitly (DrawerContent's Teleport attr-drop
  workaround; Slider's native-listener workaround for the Slot/forwardRef event drop).
- **PRM is a two-door system.** The a11y-overrides.css blanket (which overrides even
  `data-allow-motion`—"accessibility is absolute") + per-component `@media` arms + the
  shared `useReducedMotion`/`useMotionAxis` signal gating every JS/rAF animator. PagerDots,
  Slider, Dialog, Drawer all degrade to honest stills.
- **Forced-colors survival.** Focus rings and box-shadow-only silhouettes get real
  `outline`/`border` restorations under `forced-colors: active`.
- **Names and focus are engineered, not incidental.** Slider's DEV nameless-thumb warning;
  TagsInputItemDelete's computed remove label; the LabeledField family's
  labelledby/describedby/errormessage wiring; Toaster's added viewport live region;
  DialogContent's closing-`inert` + side-sheet focus handoff; DockLayer's `inert` +
  `aria-hidden` fencing of inactive faces; PagerDots' roving tabindex with
  focus-recovery across window recomputes; Constellation's keyboard-operable
  `role="button"`; the demo's route-settle focus-to-main + polite route announcement.
- **The contrast registers document their own derivations** (on-glass-fg.css ships computed
  ratios per rung). Exact ratios over live glass composites are paint questions—LIVE-DEFER.

## Per-claim verdict table

R2 = round-2/accessibility-static-src-demo-audit.md · 2B = round-2b-confirm/accessibility.md.
The landmark major appears in both; it is one claim, ratified once.

| # | Opus claim | Verdict | Class | Detail |
|---|---|---|---|---|
| C1 | [major] R2-1 ≡ 2B-1—primary category rail: `aria-label` lands on GlassDock's role-less div (name prohibited on `generic`), AppShell wraps it in a nameless `<aside>` (complementary), no navigation landmark; BottomDock's `<nav>` proves the correct pattern | RATIFIED | RATIFIED | verified at HEAD: SidebarDock.vue:114 stamps the label on `<GlassDock>`; GlassDock.vue renders a bare div (zero `role` in file); AppShell.vue:174 `<aside class="demo-sidebar-rail">`; BottomDock.vue:88 `<nav aria-label="Stories in category">`. The sharpest finding in either artifact—the ANEW pass saw the aside but missed the generic-name-drop mechanism |
| C2 | [minor] R2-2—DockControl emits `aria-pressed` only when `active`; the off state reads as a plain button | RATIFIED+AMEND | RATIFIED | verified: `stateAttrs` spreads `aria-pressed` only under `props.active` (DockControl.vue:96-106); independently found in the ANEW pass. AMEND—the proposed fix (`aria-pressed: active ? "true" : "false"` unconditionally) is itself defective: Vue casts the absent boolean to `false`, so every plain nav DockControl would announce as an off toggle. The cure is API-level (an explicit toggle discriminant, or role-from-group via `useSelectionGroup`, which already stamps both states correctly) |
| C3 | [minor] R2-3—center-spring dialog orphans focus on `<body>` during the close spring: `closingInert` covers `centerSpringActive` but the focus-return watch guards on `sideSpringLive` only | RATIFIED | RATIFIED | verified: DialogContent.vue `closingInert` includes both arms; the watch returns on `!sideSpringLive.value`; the path is live in the demo (dialog.vue:326 centered + `:spring-preset`). Exact bounce timing under reka's FocusScope is a runtime question—mechanism confirmed statically, timing LIVE-DEFER |
| C4 | [minor] R2-4—two divergent placeholder registers under the 4.5:1 floor: `.input-pill::placeholder` at `--surface-tint-35` (35%-alpha foreground) and `.field-control::placeholder` at `--muted-foreground` × `opacity: 0.68` | RATIFIED | RATIFIED | verified on disk (control-surfaces.css:66-68, field-control.css:58-60). Static math: ~2.1:1 and ~2.5-2.9:1 light-mode over near-white—both under. Exact composited ratios over glass are LIVE-DEFER; the divergence (two mechanisms, one concern) stands regardless |
| C5 | [note] R2-5—GlassDock: no roving tabindex, no arrow keys, no toolbar/tablist role; every control an individual tab stop | RATIFIED | RATIFIED | verified: zero `role`, zero nav keydown in GlassDock.vue. Correctly scoped—the DockLayerGroup layer-switcher rail DOES carry the full roving tablist via `useSelectionGroup`; the gap is the main control row only. WCAG-operable; pattern decision routed |
| C6 | [note] R2-6—hero studio pages render the same title as h1 (StoryHero) and h2 (StorySection), a duplicated heading outline | RATIFIED | RATIFIED | verified: StoryHero.vue:162/186 h1; StorySection.vue:32 h2; aurora.vue:122 `heading="Aurora"` on a `hero: true` manifest entry (manifest.ts:434) |
| C7 | [minor] 2B-2—h1→h3 skipped heading levels on empty-states (h3 titles, no StorySection h2) and auth-shell (own h1 at :87 → h3 at :120) | RATIFIED | RATIFIED | verified: empty-states.vue:134 `<h3>` with no StorySection import; auth-shell.vue:87/:120 with `:hero-title="false"`. Best-practice class, correctly framed as minor |
| C8 | [minor] 2B-3—no skip-to-content link; keyboard-only users traverse the persistent SidebarDock (and BottomDock) before content on first load | RATIFIED | RATIFIED | independently found in the ANEW pass; grep confirms no skip affordance. The route-settle focus-to-main mitigation is real but does not cover initial load—the artifact notes this correctly |
| C9 | [note] 2B-4—DockControl stamps native `disabled` + `aria-disabled` together on the button arm; native disabled removes focusability, defeating the documented "PRESENT but disabled" boundary-control intent | RATIFIED+AMEND | RATIFIED | verified (DockControl.vue:98-105). AMEND—"the aria-disabled is dead" holds only on the `as="button"` arm; for non-button hosts `aria-disabled` is the sole and load-bearing state (native `disabled` is gated on the button check), so the fix must preserve that arm |
| C10 | [note] 2B-5—SidebarDock comments name a "roving category tablist" while the DOM is a `role="group"` of individually-tabbable buttons; comment-vs-reality mismatch | RATIFIED | RATIFIED | verified: the "roving tablist" comment survives at SidebarDock.vue (the chip comment above the Categories group); markup is `role="group"` + separate DockControl buttons, no arrow handler |

## FABLE-NEW (found in the ANEW pass, absent from both opus artifacts)

| # | Finding | Severity | Detail |
|---|---|---|---|
| N1 | DockLayerGroup tablist without panel linkage—the rail is `role="tablist"`/`role="tab"` (useSelectionGroup) but tabs carry no `aria-controls` and the DockLayer faces carry no `role="tabpanel"`/`aria-labelledby`/`id` (DockLayer.vue:64-71 fences inactive faces with `inert`+`aria-hidden`, correctly, but the active face is semantically unmarked) | minor | SegmentedTabs already implements the complete APG linkage via `option.controls` (SegmentedTabs.vue:49-51, :401, :446)—the model exists in-house; DockLayerGroup diverges from it |
| N2 | PagerDots `pattern="tabs"`—same class: `role="tab"` dots without `aria-controls` to the slides they reveal (PagerDots.vue:370-373); the APG carousel-tabs pattern asks for the tab→slide linkage | minor | the `pattern="group"`/`aria-current` register is exempt (no tab semantics); only the tabs arm carries the gap |
| N3 | ComboboxInput's `<SearchIcon>` lacks `aria-hidden` (ComboboxInput.vue:33) while the sibling CommandInput marks the identical decorative icon `aria-hidden="true"` (CommandInput.vue:25)—lucide icons ship no default hiding | nit | one decorative-icon idiom, two behaviors; sweep-class fix |
| N4 | AppShell shortcuts dialog—every `<kbd>` part of a multi-key combo carries the FULL combo as its `aria-label` (AppShell.vue:239), so a two-part combo announces the whole combo twice | nit | label the `<dt>` once (or drop the per-part labels; the visible text already reads) |
| N5 | Slider's standard-variant focus ring rides `:focus-within` on the root (Slider.vue:416), so pointer interaction paints the keyboard focus ring too—`:has(:focus-visible)` would scope it to keyboard; the spectrum thumb already uses `:focus-visible` correctly (:583) | nit | consistency-of-register question, not a WCAG failure |

## Counts

**OPUS-WRONG 0 · FABLE-NEW 5 (N1-N5) · RATIFIED 10 (C1-C10, of which C2 and C9 carry
proposal-level amendments).** Both opus artifacts were accurate on this unit—every claim
re-verified true at HEAD, with two proposed fixes amended (C2's unconditional both-states
stamp would mislabel every plain DockControl; C9's "dead aria-disabled" holds only on the
button arm). The union's net addition is the tab↔panel linkage class (N1/N2) and three
polish nits, plus the independent ANEW confirmation that the reka/PRM/forced-colors/name
substrate is sound.

## ROUTING (PROPOSE only—nothing outside this ledger touched) → BAND-A11Y

| # | Site | What changes |
|---|---|---|
| RT-1 | demo/shell/AppShell.vue:174 + demo/shell/SidebarDock.vue:114 | the landmark cure (C1): `<aside>` → `<nav aria-label="Category navigation">` (or `role="navigation"`+label on the aside); drop the inert aria-label from the GlassDock host |
| RT-2 | src/components/dock/DockControl.vue | the toggle-state API cure (C2, as amended): an explicit toggle discriminant so `aria-pressed` stamps both states ONLY on declared toggles; plain controls stay stateless; `useSelectionGroup` composition unchanged |
| RT-3 | src/components/dialog/DialogContent.vue | extend the focus-return watch to `sideSpringLive \|\| centerSpringActive` (C3), matching the Drawer contract |
| RT-4 | src/styles/glass/control-surfaces.css + src/components/_shared/field-control.css | unify the two placeholder registers onto one token proven ≥4.5:1 (C4); drop the 0.68 opacity compound and the 35%-alpha color; LIVE-VERIFY the composited ratio over glass before closing |
| RT-5 | demo/shell/AppShell.vue | visually-hidden skip-to-content link targeting the existing `<main tabindex="-1">` (C8) |
| RT-6 | demo/chassis (StoryHero/StorySection seam) + stories/compositions/{empty-states,auth-shell}.vue | heading-outline repairs: suppress the duplicated hero h2 (C6); promote the h1→h3 skips to h2 or wrap in StorySection (C7) |
| RT-7 | src/components/dock/{DockLayerGroup,DockLayer}.vue + src/components/pager-dots/PagerDots.vue | the tab↔panel linkage class (N1/N2): `aria-controls` on tabs, `role="tabpanel"`+`aria-labelledby`+`id` on faces/slides—SegmentedTabs' `option.controls` is the in-house model |
| RT-8 | src/components/combobox/ComboboxInput.vue (+ a decorative-icon grep sweep) | `aria-hidden="true"` on the SearchIcon (N3), matching CommandInput |
| RT-9 | demo/shell/AppShell.vue:239 | de-duplicate the per-`<kbd>` combo labels (N4) |
| RT-10 | src/components/dock/GlassDock.vue + demo/shell/SidebarDock.vue comments | one decision, three notes (C5/C9/C10): either implement the roving toolbar/tablist model the comments promise (and pick the focusable `aria-disabled` boundary-control model), or truth-up the comments to the group-of-buttons reality and drop the button-arm double-disabled |

## LIVE-DEFER register (what only paint can settle)

- Composited contrast ratios: the placeholder registers (RT-4), the on-glass-fg rungs, and
  `--muted-foreground` over live glass plates—the oklab paint-arm class; run per band.
- Focus-ring visibility over busy glass/aurora substrates in real paint.
- The center-spring focus-bounce timing under reka's FocusScope (C3)—the watch asymmetry is
  static fact; the felt severity is runtime.
- Forced-colors rendering of the restored outlines/borders (a11y-overrides.css) on a real
  Windows HC session.
