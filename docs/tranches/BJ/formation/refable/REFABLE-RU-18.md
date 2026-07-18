# REFABLE RU-18—the accessibility audit union (redo, two-pass merge)

- **Unit**: RU-18—static accessibility audit of src/ + demo (roles, names, focus order,
  keyboard reach, ARIA contracts on the reka-wrapped components, contrast-bearing token
  pairs, PRM coverage), re-run anew and unioned against the two opus artifacts.
- **Verified model**: this seat is powered by `claude-fable-5` (read verbatim from the
  system context: "The exact model ID is claude-fable-5"). Both passes of this union are
  Fable-run; the prior artifacts (`round-2/accessibility-static-src-demo-audit.md`,
  `round-2b-confirm/accessibility.md`) are opus-authored per the REFABLE demarcation.
- **Two passes, one union**: pass-1 ran at HEAD `2df6a5a5` (committed complete at
  `615e8683`); pass-2 (this redo) ran independently at HEAD `16e72a49` with the opus
  artifacts AND the pass-1 sidecar unread until its own boundary moment, then
  cross-verified every pass-1 row before merging. This file supersedes the pass-1
  sidecar by strict addition—no pass-1 verdict is dropped.
- **Pass-2 protocol trace**: (1) ANEW—roles/names/focus/keyboard read across the 68
  component families; a mechanical reka-binding validator (every prop/emit bound on a
  reka component in src, diffed against the installed reka-ui **2.10.1 runtime**
  `props`/`emits` arrays—**123 tag usages, zero mismatches**); computed WCAG ratios for
  the contrast-bearing token pairs in BOTH arms; PRM census; demo landmark/focus scan.
  (2) Boundary moment recorded in-session—ANEW findings fixed before the first artifact
  Read. (3) Scrutiny assume-incorrect—every opus claim re-verified on disk; pass-1's
  N1/N3/N4/N5 re-verified on disk before adoption (all held).

## ANEW baseline (the independent picture at HEAD, both passes agreeing)

- **Reka contracts clean—now machine-checked.** Pass-1 swept the named no-op trap class
  (`:pressed`, `v-model:search-term`, `tag=`): zero hits. Pass-2 mechanized it: every
  prop/emit bound on a reka component in src validated against the installed 2.10.1
  runtime definitions—123 usages, **no silent no-op bindings at HEAD**. The
  memory-class trap is clear.
- **PRM is a two-door system**—the a11y-overrides.css blanket (which overrides even
  `data-allow-motion`) + per-component `@media` arms + the shared
  `useReducedMotion`/`useMotionAxis` signal gating the JS/rAF animators; canvas
  lifecycle owns the live-PRM freeze. LIVE-DEFER only the live-flip paint proof.
- **Names and focus are engineered, not incidental**—LabeledField wiring, Toaster's
  added live region, DialogContent's closing-`inert` + side-sheet handoff, DockLayer
  `inert` fencing, PagerDots roving tabindex with focus recovery, Constellation's
  keyboard-operable `role="button"` (`useConstellation.ts:244-263`), the demo's
  route-settle focus-to-main + polite announce. Dock keyboard parity holds: focusin
  expands instantly (`useDockState.ts:287`).
- **Token-comment contrast claims verify by computation** (5.21/7.88 light,
  7.64/10.29 dark—all accurate). The gap is what the comments do NOT cover—see N6.

## Per-claim verdict table

R2 = round-2 artifact · 2B = round-2b artifact. The landmark major appears in both; one
claim, ratified once. 10 distinct opus claims.

| # | Opus claim | Verdict | Detail |
|---|---|---|---|
| C1 | [major] R2-1 ≡ 2B-1—primary category rail: `aria-label` lands on GlassDock's role-less div (name prohibited on `generic`), AppShell wraps it in a nameless `<aside>` (complementary), no navigation landmark; BottomDock's `<nav>` proves the correct pattern | **RATIFIED** | verified at HEAD by both passes: `SidebarDock.vue:114`, `GlassDock.vue:286-289` (zero `role` in file), `AppShell.vue:174`, `BottomDock.vue:88`. The sharpest opus finding—both Fable ANEW passes missed the generic-name-drop mechanism independently; credit where due |
| C2 | [minor] R2-2—DockControl emits `aria-pressed` only when `active`; the off state reads as a plain button | **RATIFIED + AMEND** | verified (`stateAttrs`); found independently by both Fable ANEW passes. AMEND holds: the proposed unconditional both-states stamp would announce every plain nav DockControl as an off toggle—the cure is an explicit toggle discriminant or role-from-group via `useSelectionGroup` (which already stamps both states) |
| C3 | [minor] R2-3—center-spring dialog orphans focus on `<body>` during the close spring | **RATIFIED** | `closingInert` covers `sideSpringLive \|\| centerSpringActive`; the focus-return watch guards `!sideSpringLive` only (`DialogContent.vue:395-405`); reachable at `demo/stories/containers/dialog.vue:326`. Transient (reka restores at final unmount)—minor is the right grade; felt severity LIVE-DEFER |
| C4 | [minor] R2-4—two divergent placeholder registers under the 4.5:1 floor | **RATIFIED + quantified** | both rules at HEAD (`control-surfaces.css:66-68`, `field-control.css:58-61`). Pass-2 computed the solid-composite floors: `.input-pill` **2.19** light / 2.74 dark; `.field-control` **2.78** light / 3.78 dark—all failing before glass even enters. Composited-over-glass exact ratios LIVE-DEFER; the failure is already decided on the opaque floor |
| C5 | [note] R2-5—"the dock implements no roving tabindex, no arrow-key navigation, no toolbar/tablist role; every control an individual tab stop" | **RATIFIED as scoped, categorical sentence corrected** | the evidence scopes to `GlassDock.vue` (true: zero role, zero nav keydown) + the demo strips (true: separate tab stops). But the categorical sentence is false of the dock FAMILY: `DockLayerGroup.vue:221,235` carries the full roving tablist/radiogroup register via `useSelectionGroup` (axis arrows + Home/End + role-per-mode). Pass-2 initially scored this OPUS-WRONG on the strict read; the merge adjudication is RATIFIED-as-scoped with the correction on the record—the operative demo-side content is accurate |
| C6 | [note] R2-6—hero studio pages render the same title as h1 (StoryHero) and h2 (StorySection) | **RATIFIED** | `StoryHero.vue:162/186` h1 + `VizStudio.vue:73` → `StorySection.vue:32` h2; aurora `hero:true` + `heading="Aurora"` confirmed |
| C7 | [minor] 2B-2—h1→h3 skipped heading levels (empty-states, auth-shell) | **RATIFIED** | `empty-states.vue:134` h3, no h2 in file; `auth-shell.vue:87` h1 → `:120` h3, no h2 element (the `:200` "h2" comment mention is stale prose—itself drift evidence) |
| C8 | [minor] 2B-3—no skip-to-content link | **RATIFIED** | found independently by both Fable ANEW passes; the route-settle focus-to-main mitigation is real but does not cover first load—the artifact says so correctly |
| C9 | [note] 2B-4—DockControl stamps native `disabled` + `aria-disabled` together; boundary nav controls unfocusable vs the documented "PRESENT but disabled" intent | **RATIFIED + AMEND** | verified; `BottomDock` `:disabled="!hasPrev"` boundary case confirmed. AMEND holds: "the aria-disabled is dead" is true only on the `as="button"` arm—on non-button hosts it is the sole load-bearing state; the fix must preserve that arm |
| C10 | [note] 2B-5—SidebarDock comments name a "roving category tablist" while the DOM is a `role="group"` of separate tab stops | **RATIFIED, evidence corrected** | the comment mismatch is real (`SidebarDock.vue:71,117`). Its evidence line "there is no ArrowUp/Down handler anywhere in the dock (grep across dock composables returns only the press-spring keydown)" is **false at HEAD**—the same DockLayerGroup fact as C5. The claim survives; the evidence generalization does not |

Summary-level opus assertions also verified: DarkModeToggle both-state `aria-pressed`,
Constellation keyboard operability, forced-colors focus restores, canvas `aria-hidden`,
PRM substrate—accurate.

## FABLE-NEW (absent from both opus artifacts)

N1-N5 from pass-1 (each re-verified on disk by pass-2); N6-N9 from pass-2.

| # | Finding | Severity | Detail |
|---|---|---|---|
| N1 | DockLayerGroup tablist without panel linkage—`role="tab"` rail with no `aria-controls`, DockLayer faces with no `role="tabpanel"`/`aria-labelledby`/`id` | minor | re-verified: zero linkage attrs in `DockLayerGroup.vue`/`DockLayer.vue`; SegmentedTabs' `option.controls` is the in-house model |
| N2 | PagerDots `pattern="tabs"`—`role="tab"` dots with no `aria-controls` to the slides (`PagerDots.vue:370-373`); the `group` register is exempt | minor | found independently by BOTH Fable passes—the strongest convergence signal in the unit |
| N3 | ComboboxInput's `<SearchIcon>` lacks `aria-hidden` (`ComboboxInput.vue:33`) while CommandInput marks the identical icon hidden (`CommandInput.vue:25`) | nit | re-verified at HEAD; sweep-class |
| N4 | AppShell shortcuts dialog—every `<kbd>` part carries the FULL combo as `aria-label` (`AppShell.vue:239`), double-announcing multi-key combos | nit | re-verified at HEAD |
| N5 | Slider standard-variant focus ribbon rides `:focus-within` (`Slider.vue:416`) so pointer interaction paints the keyboard ring; the spectrum thumb uses `:focus-visible` correctly (`:583`) | nit | re-verified at HEAD |
| **N6** | **Status-tone token pairs fail AA on solid fills** (computed from the authored values; opaque paints—`.button:not([data-tone="neutral"])` sets `background: var(--button-tone); color: var(--button-tone-ink)` (`button/styles.css:95-100`), so this is decided statically, NOT a LIVE-DEFER): light `--success-foreground`/`--success` **2.21**; dark success **1.58**; light `--info-foreground`/`--info` **3.49**; dark info **2.36**; dark `--destructive-foreground`/`--destructive` **3.07** (light destructive 4.70 passes). Warning passes both arms (8.19/9.47)—the dark arm gave warning a dark ink but left success/info near-white ink on tones brightened to L≈0.71-0.81. Sources: `color-radius.css:283-293`, `dark-arm.css:104-111,157-168` | **major** | the edict's "contrast-bearing token pairs" head-on; missed by both opus passes (which audited only placeholders) and by pass-1 (which deferred all token contrast to paint). Every solid consumer of the tone/ink pairs inherits the failure—button tones first, badge/alert/toast tone recipes to be swept in the fix wave |
| N7 | Dialog close X in the open state: `data-[state=open]:bg-accent data-[state=open]:text-muted-foreground` + rest `opacity-70` (`DialogContent.vue:490`)—muted-on-accent is 3.66 opaque, **2.34 effective at opacity-70**, under the 3.0 non-text floor for the glyph | minor | the open-state pairing is persistent while the dialog is open, not a transient hover |
| N8 | `--muted-foreground` on `--secondary` computes **4.39** light (and 3.66 on `--accent`)—marginal/failing wherever a consumer pairs them; no direct src pairing found beyond N7's site | note | token-level caution for the re-ink wave |
| N9 | InfiniteScroll surfaces no loading/exhausted announce—the sentinel is `aria-hidden` and state flips are silent to AT | note | the sortable list's polite live region is the in-house model |

## Counts

**OPUS-WRONG 0 · FABLE-NEW 9 (N1-N9) · RATIFIED 10 (C1-C10).**
No opus claim is overturned; four carry corrections on the record (C2 and C9
proposal-level amendments; C5's categorical sentence and C10's evidence line both
falsified by the DockLayerGroup roving register). The redo's net addition over pass-1 is
N6-N9—above all **N6, the status-tone pair failures**, the unit's only major-grade gap
that every prior pass (two opus, one Fable) missed. Method note: N6 existed to be found
by exactly the discipline the edict named—compute the token pairs, do not defer
opaque-paint math to the browser.

## ROUTING (PROPOSE only—nothing outside this ledger touched) → BAND-A11Y

RT-1..RT-10 carried from pass-1 unchanged; RT-11..RT-13 are the redo's additions.

| # | Site | What changes |
|---|---|---|
| RT-1 | demo/shell/AppShell.vue:174 + demo/shell/SidebarDock.vue:114 | the landmark cure (C1): `<aside>` → `<nav aria-label="Category navigation">` (or `role="navigation"`+label on the aside); drop the inert aria-label from the GlassDock host |
| RT-2 | src/components/dock/DockControl.vue | the toggle-state API cure (C2, as amended): an explicit toggle discriminant so `aria-pressed` stamps both states ONLY on declared toggles; `useSelectionGroup` composition unchanged |
| RT-3 | src/components/dialog/DialogContent.vue | extend the focus-return watch to `sideSpringLive \|\| centerSpringActive` (C3) |
| RT-4 | src/styles/glass/control-surfaces.css + src/components/_shared/field-control.css | unify the two placeholder registers onto one token proven ≥4.5:1 (C4); drop the 0.68 compound and the 35%-alpha color; LIVE-VERIFY over glass before closing |
| RT-5 | demo/shell/AppShell.vue | visually-hidden skip-to-content link targeting the existing `<main tabindex="-1">` (C8) |
| RT-6 | demo/chassis (StoryHero/StorySection seam) + stories/compositions/{empty-states,auth-shell}.vue | heading-outline repairs (C6/C7) |
| RT-7 | src/components/dock/{DockLayerGroup,DockLayer}.vue + src/components/pager-dots/PagerDots.vue | the tab↔panel linkage class (N1/N2): `aria-controls` on tabs, `role="tabpanel"`+`aria-labelledby`+`id` on faces/slides—SegmentedTabs' `option.controls` is the model |
| RT-8 | src/components/combobox/ComboboxInput.vue (+ a decorative-icon grep sweep) | `aria-hidden="true"` on the SearchIcon (N3) |
| RT-9 | demo/shell/AppShell.vue:239 | de-duplicate the per-`<kbd>` combo labels (N4) |
| RT-10 | src/components/dock/GlassDock.vue + demo/shell/SidebarDock.vue comments | one decision, three notes (C5/C9/C10): implement the roving toolbar model the comments promise (and pick the focusable `aria-disabled` boundary-control model), or truth-up the comments and drop the button-arm double-disabled |
| **RT-11** | src/styles/tokens/color-radius.css:283-293 + src/styles/tokens/dark-arm.css:157-168 (+ every `--*-foreground` tone consumer: button tones, badge, alert, toast) | **the status-tone re-ink (N6, major)**: dark success/info take dark ink (the in-repo warning precedent); light success/info flip ink or deepen tone; dark destructive deepen or re-ink past 4.5. Add the computed-pair floor as ONE table-driven invariant gate (fits the ~40-60 post-abrogation gate budget) |
| RT-12 | src/components/dialog/DialogContent.vue:490 | the close-X open-state seat (N7): drop the opacity compounding or re-ink the accent seat past the 3.0 non-text floor; check N8's muted/secondary pairing in the same pass |
| RT-13 | src/components/infinite-scroll/InfiniteScroll.vue | a polite loading/exhausted live region (N9), mirroring the sortable-list register |

## LIVE-DEFER register (what only paint can settle)

- Composited contrast over live glass: the placeholder registers (RT-4), the
  on-glass-fg rungs, `--muted-foreground` over live plates—the oklab paint-arm class;
  run per band. NOT deferred: the N6 status-tone pairs (opaque paints, decided above).
- Focus-ring visibility over busy glass/aurora substrates in real paint.
- The center-spring focus-bounce felt timing under reka's FocusScope (C3).
- Forced-colors rendering of the restored outlines/borders on a real HC session.
- The WebGPU substrate freeze under a live PRM flip.
