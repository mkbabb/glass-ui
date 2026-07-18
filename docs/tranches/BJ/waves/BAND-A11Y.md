# BJ BAND-A11Y—the accessibility reformation (Family K)

- **Verified model**: this band redo is powered by `claude-fable-5` (read verbatim from the
  system context: "The exact model ID is claude-fable-5"). Unit RU-03-A11Y, 2026-07-18.
- **Union provenance**: the opus-begat draft (2 waves, scoped to the six round-2 findings)
  UNIONED against the RU-03 ANEW derivation from the corrected formation corpus, at HEAD
  `485891a2`. Fresh evidence authoritative; opus rows kept only where ratified on disk. The
  band's audit authority is the **RU-18 union**
  (`formation/refable/REFABLE-RU-18.md`, RT-1..RT-13)—NOT the opus `round-2`/`round-2b`
  artifacts it supersedes—plus the RU-21 routings (N3/N5), the RU-33 routing 1, the
  FABLE-DAG-REDUCTION `invalid`/`errorLive` gate, and the decided GF-DOCK §3 keyboard model
  (ADJUDICATION-1 ruling 4 → GF-DOCK-PASS3 §3, ratified RU-05 D7).
- **Verdict sidecar**: `formation/refable/REFABLE-RU-03-A11Y.md` (per-claim table, boundary
  moment, routings).

Registry Family K (`formation/REGISTRY.md:257-263`). The band discharges every routing that
names it: landmarks, roving focus, aria linkage, contrast floors, live regions—plus the
adopted Slider tap-target restore (RU-33). Five waves, up from the draft's two: RU-18 pass-2's
N6-N9 (above all the **major-grade status-tone contrast failures**) and the RU-21/RU-33/DAG
routings postdate both the draft and PLAN.md's FAMILY K section.

## Band fences

**CONFIRMED KEEP (band-wide non-goal)—the reduced-motion substrate.** Both RU-18 passes: the
PRM system is a two-door design (`src/styles/utilities/a11y-overrides.css:7-33` blanket that
overrides even `data-allow-motion`, + per-component `@media` arms, + the shared
`useReducedMotion`/`useMotionAxis` signal gating the JS/rAF animators; canvas lifecycle owns
the live-PRM freeze). No wave in this band touches `a11y-overrides.css`'s PRM rules, the PRM
signal plumbing, the `data-allow-motion` carve, or the forced-colors focus restore. (The
`touch-hit-area` utility itself is also KEEP—W2-F rewires a consumer onto it, never edits it.)

**Also KEEP (verified working at HEAD, do not churn):** Toaster's added polite live region
(`src/components/toast/Toaster.vue:114`), PagerDots roving tabindex + focus recovery,
DockLayerGroup's roving tablist register (`src/components/dock/DockLayerGroup.vue:100-105,214,231-232`),
DarkModeToggle both-state `aria-pressed` (`DarkModeToggle.vue:30`), dock-search's deliberate
`--on-glass-muted` placeholder register (`src/components/dock/styles/search.css:52-54`,
documented translucent-plate calibration), LabeledField's name/description/error wiring.

**Test substrate** (ratified from the draft): `@vue/test-utils` mounts in happy-dom,
RENDERED-attr asserts (`tests/components/custom/dock/DockBackgroundToggle.a11y.test.ts` is the
discipline exemplar; `tests/components/ui/dialog/dialog-spring.test.ts` the portaled-mount
idiom). Per the binding-verification memory, an aria binding that silently no-ops is caught
only by a rendered-attr assertion. Probes land as ordinary vitest regression tests; the band
contributes exactly ONE candidate to the post-abrogation invariant-gate set (W3's
contrast-floors gate)—the gates-abrogation mandate caps the census, so no other probe here is
a "gate".

## Wave table

| Wave | Name | Motion | Born-RED? |
|------|------|--------|-----------|
| 1 | `BJ.W-A11Y-STATE` | Demo-shell + component-state live defects: nav landmark · skip link · composition heading outline · aria-pressed tri-state · center-spring focus-return · placeholder unification | Yes—each reds at HEAD (vitest DOM asserts + 1 vitest-fs source assert) |
| 2 | `BJ.W-A11Y-LINKAGE` | Aria linkage + name/target hygiene: tab↔panel linkage (dock layers, pager dots) · decorative-icon hiding · kbd label de-dup · Carousel conditional tab stop · Slider focus-visible nit · Slider 44px coarse-floor restore | Yes—rendered-attr/DOM asserts, each RED at HEAD |
| 3 | `BJ.W-A11Y-CONTRAST` | The computed contrast floors: status-tone re-ink (MAJOR) · dialog close-X open-state seat · muted/secondary caution · the ONE table-driven contrast invariant gate | Yes—the computed-pair gate reds at HEAD by arithmetic |
| 4 | `BJ.W-A11Y-LIVE-REGIONS` | InfiniteScroll loading/exhausted announce + the `invalid`/`errorLive` KEEP ruling (discharges the DAG-reduction gate) | Fix half yes; ruling half no |
| 5 | `BJ.W-A11Y-ROVING-RULINGS` | The DECIDED dock toolbar/roving record + HeaderRibbon adoption + the DockControl boundary-disabled model + the hero-dedup cross-family reference | HeaderRibbon half yes (post-dependency); rulings no |

---

## Wave 1—`BJ.W-A11Y-STATE`

Discharges RU-18 RT-1/RT-5/RT-6(compositions)/RT-2/RT-3/RT-4 (opus C1/C8/C7/C2/C3/C4). All
evidence re-verified at HEAD `485891a2`.

### (A) nav landmark—SidebarDock adopts the BottomDock pattern [RT-1, ratified draft row]

Defect: `demo/shell/AppShell.vue:174` wraps the primary category rail in a nameless
`<aside>` (complementary, wrong landmark); the intended name sits at
`demo/shell/SidebarDock.vue:114` as `aria-label` on `<GlassDock>` (host at `:110`), whose root
is a role-less div (`src/components/dock/GlassDock.vue`—zero `role` in file), where
name-from-author is prohibited on `generic` and browsers drop it. The correct pattern exists
at `demo/shell/BottomDock.vue:88` (`<nav aria-label="Stories in category">`). Fix:
`<aside>`→`<nav aria-label="Category navigation">`, drop the inert `aria-label` from the
GlassDock host. The inner `role="group"` labels (`SidebarDock.vue:120,162`) stay. Born-RED:
rendered-DOM asserts (no `aria-label` on `.glass-dock` root; the region renders as
`nav[aria-label]`)—both RED at HEAD. Probe-harness choice (full-AppShell mount vs region
harness) stays open as drafted; the SidebarDock assert is the clean companion either way.

### (B) aria-pressed tri-state—DockControl toggle discriminant [RT-2 as amended, ratified draft row]

Defect: `src/components/dock/DockControl.vue:96-104` emits `aria-pressed` only when `active`;
off-state toggles announce as plain buttons. The naive both-states stamp would mis-announce
every nav DockControl as an off toggle (`active` defaults `false`, `DockControl.vue:67`)—the
RU-18 C2 AMEND and the draft's guard agree. Fix (**decided—the draft's OPEN-B1 closes as
tri-state**, concurring with RU-18's "explicit toggle discriminant" and PLAN's "tri-state
`active`"): drop the `active: false` default so unset means nav mode; stamp
`aria-pressed: String(active)` only when `active !== undefined`. `data-active`/`glass-capsule`
stay truthy-gated. Born-RED: `active:false`→`aria-pressed="false"` (RED at HEAD); plus the
over-application GUARD—no `active` prop→`aria-pressed` absent (passes at HEAD, fails under the
naive fix). Toggle consumers verified: `demo/stories/dock/overview.tile.vue:15`,
`demo/stories/dock/controls.vue:112,140`. Coordinate the edit with W5-C (same `stateAttrs`).

### (C) center-spring focus-return—guard-widen + anchor un-gate [RT-3 + draft's mechanism find, ratified]

Defect: `closingInert` covers both spring paths
(`src/components/dialog/DialogContent.vue:370-371`), but the focus-return watch guards
`!sideSpringLive` only (`:399`), so a centered `springPreset` dialog
(`demo/stories/containers/dialog.vue:326`) parks focus on `<body>` for the whole exit spring.
**The draft's load-bearing addition, verified at HEAD:** widening the guard alone is
insufficient—`resolveSideContentEl()` (`:392-395`) resolves via `sideAnchorEl`, rendered only
for side sheets (`:465` `<span v-if="!isCenter" ref="sideAnchorEl" hidden />`); the center
path returns `null` and the widened guard still cannot test containment. Fix: widen the
`:399` guard to `sideSpringLive || centerSpringActive` AND un-gate the anchor (drop
`!isCenter`, or resolve from a direct content ref); rename `sideAnchorEl`/
`resolveSideContentEl` to path-neutral names. Born-RED: portaled mount, open→logical close,
assert `document.activeElement` is the trigger (RED at HEAD; the `{flush:"sync"}` watch makes
it same-tick observable). Bite: guard-only revert proves the anchor un-gate load-bearing.
π: the real inert-bounce→restore choreography owes one browser capture (LIVE-DEFER register).

### (D) placeholder contrast—every page-opaque register onto one ≥4.5:1 token [RT-4, ratified draft census]

The draft's four-register census (broader than RU-18's two) verified at HEAD:

| # | selector | site | color | verdict |
|---|----------|------|-------|---------|
| 1 | `.input-pill::placeholder` | `src/styles/glass/control-surfaces.css:66-68` | `var(--surface-tint-35)` (35% alpha of foreground) | FAIL—RU-18 computed solid floor 2.19 light / 2.74 dark |
| 2 | `.field-control::placeholder` | `src/components/_shared/field-control.css:58-61` | `var(--muted-foreground)` × `opacity:0.68` | FAIL—2.78 light / 3.78 dark |
| 3 | `.input-bar-field::placeholder` | `src/styles/utilities/components.css:63-65` | 50% `color-mix` of muted | FAIL—same mechanism |
| 4 | `.tags-input__input::placeholder` | `src/components/tags-input/styles.css:38-40` | `var(--surface-tint-35)` | FAIL |
| — | `.command__input::placeholder` | `src/components/command/styles.css:54-56` | `var(--muted-foreground)` full | PASS—the exemplar (`--muted-foreground` = `--neutral-5`, `color-radius.css:85`, documented 5.21:1 `:85`) |
| — | dock-search | `src/components/dock/styles/search.css:52-54` | `--on-glass-muted` | KEEP—documented translucent-plate register |

Fix: all four onto bare `var(--muted-foreground)`—no alpha, no opacity. Clean-break follow-on
(**decided—OPEN-D1 closes as DELETE**, no-backwards-compat edict): after the repoint,
`--surface-tint-35` has zero real consumers (`color-radius.css:163`, `dark-arm.css:329`,
`src/styles/theme/bridges.css:153` are definition/arm/bridge)—delete all three; any sibling
consumer updates via its own tranche addendum (the consumer-updates ruling). Born-RED:
vitest-fs source gate over the four partials (RED at HEAD); the allowlist shape is ratified
(`--on-glass-muted` translucent-plate exemption—**OPEN-D2 closed**). This scan folds into
W3's single contrast invariant gate at band close (one gate, two tables). π: browser
before/after contrast capture per family, both engines, both modes (the oklab paint-arm
lesson applies).

### (E) skip-to-content link [RT-5—FABLE union addition; the draft's routing-away is struck]

Defect (C8, found by both RU-18 ANEW passes): no skip link anywhere in the shell (grep at
HEAD: zero); a keyboard user tabs the whole persistent SidebarDock on first load. The
route-settle focus-to-main mitigation (`AppShell.vue:60-61`) does not cover first load. RU-18
RT-5 routes the fix INTO this band—the draft's "assign an owner" deferral is overruled. Fix: a
visually-hidden skip link, first tabbable in `AppShell`, targeting the existing
`<main tabindex="-1">` (`AppShell.vue:185-187`). Born-RED: DOM assert (first focusable is the
skip link; activating it moves focus to `main`)—RED at HEAD.

### (F) composition heading outline [RT-6 composition half—FABLE union addition]

Defect (C7): skipped heading levels—`demo/stories/compositions/empty-states.vue:134` h3 with
no h2 in file; `demo/stories/compositions/auth-shell.vue:87` h1 → `:120` h3 with no h2 element
(the `:200` "h2" comment mention is stale prose). Fix: local level corrections (h3→h2 or an
intermediate h2), no chassis change. Born-RED: DOM outline assert per page. The CHASSIS-level
hero h1/h2 duplication is NOT this row—see W5-D (family D owns the seam). CONTINGENCY
(APOTHEOSIS D-14): both named pages are `compositions/` members ASK-§D1 may prune whole — this
row sequences after the §D1 ruling (or marks its targets conditional); the outline-assert class
survives on whatever pages remain.

---

## Wave 2—`BJ.W-A11Y-LINKAGE`

Aria linkage + name/target hygiene. All FABLE union additions (absent from the draft), each
verified RED at HEAD.

### (A) tab↔panel linkage [RT-7; RU-18 N1/N2]

`DockLayerGroup` renders `role="tab"` buttons with no `aria-controls`, and `DockLayer` faces
carry no `role="tabpanel"`/`id`/`aria-labelledby` (`DockLayerGroup.vue:214-236`,
`DockLayer.vue:69` is the only aria in file). `PagerDots` `pattern="tabs"` dots are `role="tab"`
with no `aria-controls` (`src/components/pager-dots/PagerDots.vue:370-374`; the `group`
register is exempt). Model: SegmentedTabs' `option.controls` (in-house precedent, cured at
`d5eba7bb` per RU-21 R4). Fix: `aria-controls` on tabs; `role="tabpanel"` + `id` +
`aria-labelledby` on faces; PagerDots gains a slide-id contract (prop or provide) for its
tabs pattern only. Born-RED: rendered-attr asserts on both components.

### (B) decorative-icon hiding [RT-8; N3]

`src/components/combobox/ComboboxInput.vue:33` `<SearchIcon>` lacks `aria-hidden` while
`src/components/command/CommandInput.vue:25` marks the identical icon hidden. Fix the site +
one decorative-icon sweep across src (sweep-class, nit). Born-RED: rendered-attr assert.
CONTINGENCY (APOTHEOSIS D-14): `BAND-REDUCTION` W3 DELETES the 9-SFC combobox family outright
(the combobox→command fold, clean break) — if the fold lands first, the site-fix and its born-RED
die with the delete and the fix retargets to nothing (command is already correct at
`CommandInput.vue:25`); the decorative-icon sweep-class arm is unaffected either way.

### (C) kbd combo label de-dup [RT-9; N4]

`demo/shell/AppShell.vue:239`—every `<kbd>` part carries the FULL combo as `aria-label`,
double-announcing multi-key combos. Fix: label the combo once (on the `<dt>` or a group
element), parts unlabeled. Born-RED: DOM assert (no per-part full-combo labels).

### (D) Carousel conditional tab stop [RU-21 N5]

`src/components/carousel/Carousel.vue:89` stamps `tabindex="0"` unconditionally while
`role`/`aria-roledescription` are correctly conditional on `accessibleName` (`:86-87`)—an
unnamed focusable generic when `ariaLabel` is absent. Fix: condition the tab stop on the
named-region arm. Born-RED: mount without `ariaLabel`, assert no `tabindex`.

### (E) Slider focus-ribbon register [RU-18 N5, nit]

`src/components/slider/Slider.vue:416` rides `:focus-within`, so pointer interaction paints
the keyboard ring; the spectrum thumb uses `:focus-visible` correctly (`:583`). Fix: move the
standard-variant ribbon to a `:focus-visible`-scoped register (`:has()` on target engines is
fine—no legacy ladder). Source assert.

### (F) Slider 44px coarse-floor restore [RU-33 routing 1—adopted; WCAG 2.5.5 regression]

At HEAD the thumb carries no `touch-hit-area` (`Slider.vue:234`
`class="slider-thumb glass-specular-track"`) while the comment layers still describe the 44px
halo (`Slider.vue:376,391-396`; `a11y-overrides.css:162`). Fix: re-apply `touch-hit-area` on
the thumb (the utility at `a11y-overrides.css:135` is KEEP and already carries the
pointer-events-none integrity discipline), or an equivalent root-level floor;
Chrome+Safari coarse-pointer emulation check. The comment/CHANGELOG truth-ups stay with
BAND-DOC-TRUTH (RU-33 routes 2-4)—this band ships only the floor. Born-RED: rendered-class
assert on the thumb (RED at HEAD).

---

## Wave 3—`BJ.W-A11Y-CONTRAST`

The band's major. All FABLE union additions (RU-18 pass-2 N6/N7/N8; absent from the draft and
from PLAN's FAMILY K).

### (A) status-tone re-ink [RT-11; N6—MAJOR]

Computed from authored values (opaque paints—decided statically, not a LIVE-DEFER):
`.button:not([data-tone="neutral"])` paints `background: var(--button-tone); color:
var(--button-tone-ink)` (`src/components/button/styles.css:95-100`), so the pairs fail on
solid fills: light success 2.21, light info 3.49 (white ink on tones at
`src/styles/tokens/color-radius.css:283-293`); dark success 1.58, dark info 2.36, dark
destructive 3.07 (`src/styles/tokens/dark-arm.css:104-111,157-168`). Warning passes both arms
(8.19/9.47)—the in-repo precedent: dark ink on a luminous plate. Values re-verified unchanged
at HEAD; ratios carried from RU-18 pass-2's computation. Fix: dark success/info take dark ink
(the warning precedent); light success/info flip ink or deepen tone; dark destructive deepen
or re-ink past 4.5; sweep every tone/ink consumer (button tones first, then badge/alert/toast
recipes). Keep the LOCKSTEP comments truthful (`dark-arm.css` cites light-dark.css pairings).
π: one before/after DELTA capture (visible change; live-verify-capture memory).
SEQUENCING (APOTHEOSIS D-09): the alert/badge/toast recipe half of this sweep lands
with-or-after `BAND-FEEDBACK-MOTION` W4 (`BJ.W-ALERT-IDIOM` redesigns Alert's material wholesale
with the tint identity OPEN — OPEN-FM-2: status-tinted vs neutral glass + status ink); the
button-tone half may lead. The W3-C gate's alert rows are DATA-DRIVEN on OPEN-FM-2's outcome so
the freshly minted contrast gate never reds on W4's lawful landing and never forces a silent
gate-table rewrite.

### (B) dialog close-X open-state seat [RT-12; N7]

`src/components/dialog/DialogContent.vue:490`: `data-[state=open]:bg-accent
data-[state=open]:text-muted-foreground` + rest `opacity-70`—muted-on-accent is 3.66 opaque,
2.34 effective at 0.70, under the 3.0 non-text floor, and the open state is persistent. Fix:
drop the opacity compounding or re-ink the seat past 3.0. Check N8 in the same pass:
`--muted-foreground` on `--secondary` computes 4.39 light (marginal)—token-level caution, no
other src pairing found; document, do not churn.

### (C) the ONE contrast invariant gate

Table-driven computed-pair floor: parse the authored token values, compute WCAG ratios for
the declared pairs (tone/ink table + the W1-D placeholder-register table), assert floors
(4.5 text / 3.0 non-text). RED at HEAD by arithmetic; GREEN at wave close; enters the ~40-60
invariant set as ONE gate (gates-abrogation budget). Composited-over-glass ratios stay in the
band's LIVE-DEFER register (oklab paint-arm discipline, per-band live-π).

---

## Wave 4—`BJ.W-A11Y-LIVE-REGIONS`

### (A) InfiniteScroll announce [RT-13; N9]

`src/components/infinite-scroll/InfiniteScroll.vue` surfaces no loading/exhausted announce—
the sentinel is `aria-hidden` (`:43`) and state flips are silent to AT. Model:
`src/components/sortable-list/SortableList.vue:66` (sr-only polite region). Fix: a polite
live region announcing loading/exhausted transitions. Born-RED: rendered-DOM assert.

### (B) the `invalid`/`errorLive` ruling [discharges the FABLE-DAG-REDUCTION gate]

DAG-REDUCTION (Labeled* row) retires the duplicated validation/layout props and gates
`invalid`/`errorLive` on this band. **RULING: KEEP—both are load-bearing a11y contract**, not
prop duplication: `invalid` gates the error region + `aria-describedby` linkage + `data-invalid`
(`src/components/labeled-field/LabeledField.vue:25,28,38,59-60`), `errorLive` sets the error
region's `aria-live` politeness (`:68`, default polite `:10`). BAND-REDUCTION's dedup may
re-home the plumbing but may not drop either surface or the wired behavior. Acceptance: the
existing LabeledField error wiring stays rendered-attr-asserted through the dedup.

---

## Wave 5—`BJ.W-A11Y-ROVING-RULINGS`

### (A) the dock keyboard model—DECIDED, recorded [RT-10; supersedes the draft's OPEN-E1]

ADJUDICATION-1 ruling 4 routed the decision into the dock greenfield; GF-DOCK-PASS3 §3
decided it and RU-05 D7 ratified: **`role="toolbar"` + roving tabindex; items stay
`RouterLink`/`aria-current="page"` (never `role="tab"`); axis-only arrows, no wrap, Home/End
to true extremes; focus⟂occlusion (a focused item is never left under the tray edge);
keyboard travel is deterministic preset motion with zero seeded velocity.** Implementation
and π-KEYBOARD are OWNED by GF-DOCK W3 (which also mints the `toolbar` value in
`useSelectionGroup`'s role menu)—this band does not fork a second dock keyboard model (the
draft's Family-G lean, ratified). The SidebarDock "roving category tablist" comments
(`SidebarDock.vue:71,117`) truth-up rides family J (PLAN W2, ratified RU-05 R2). Evidence
correction carried onto the record: the draft's "no ArrowUp/Down handler anywhere in the
dock" is FALSE at HEAD—`DockLayerGroup` carries the full roving register via
`useSelectionGroup` (`DockLayerGroup.vue:100-105,214,231-232`; the same falsification RU-18
logged against C5/C10). The accurate sentence: GlassDock's strip and the demo shell docks
have no roving; the layer rail does.

### (B) HeaderRibbon adopts the decided model [RU-21 N3—one decision, both surfaces]

`src/components/header-ribbon/HeaderRibbon.vue:24` stamps `role="toolbar"` with no roving
tabindex or arrow-key contract—every item an individual tab stop, the APG toolbar pattern
unmet. Fix: adopt `useSelectionGroup`'s roving register with the `toolbar` role value.
**Dependency: after GF-DOCK W3 lands the `toolbar` role-menu value.** Born-RED (post-
dependency): rendered roving asserts (one tab stop, arrows move focus).

### (C) the DockControl boundary-disabled model [C9/OPEN-E2—decided direction]

`DockControl.vue:98-104` stamps native `disabled` + `aria-disabled` together on the button
arm; boundary nav arrows (`BottomDock.vue:165,206`) become unfocusable, defeating the
documented "PRESENT but disabled" intent (`DockControl.vue:54-56`). Per RU-18 C9 AMEND the
non-button arm's `aria-disabled` is its sole load-bearing state and must be preserved.
Decided direction: boundary nav controls stay focusable—`aria-disabled` without the native
stamp on the button arm, WITH explicit click/activation suppression (aria-disabled does not
block events). One edit seat with W1-B (same `stateAttrs`). Born-RED: disabled control is
focusable, announces disabled, does not activate.

### (D) hero heading dedup—cross-family reference [ratified draft row]

StoryHero renders the page h1 (`demo/chassis/hero/StoryHero.vue:162,186`) while VizStudio's
StorySection renders the same title as h2 (`demo/stories/substrates/_frame/VizStudio.vue:73` →
`demo/chassis/section/StorySection.vue:32`; e.g. `demo/stories/substrates/aurora.vue:122`).
The chassis seam fix is OWNED by family D (BAND-STORY; `REGISTRY.md:94`)—this band registers
the acceptance criterion only: exactly one h1 per page, no duplicated outline entry. No fix,
no probe here.

## Band-level obligations

- **π/DELTA register**: W1-C inert-bounce browser capture; W1-D per-family placeholder
  contrast before/after (both engines, both modes); W3-A re-ink DELTA capture;
  composited-over-glass ratios per the LIVE-DEFER register (oklab paint-arm). Captures are
  artifacts, not commit-message claims.
- **Gate posture**: ONE invariant gate (W3-C, absorbing the W1-D source scan). Everything
  else is ordinary vitest regression.
- **Cross-band routings**: chassis heading seam → BAND-STORY; comment/CHANGELOG truth-ups
  (SidebarDock tablist comments, `touch-hit-area` header, Slider CHANGELOG correction,
  `useSelectionIndicator` comment) → BAND-DOC-TRUTH; dock keyboard implementation → GF-DOCK
  W3; Labeled* prop dedup (under the W4-B KEEP ruling) → BAND-REDUCTION;
  `--surface-tint-35` sibling-consumer note → the Q060-style outbound; the DialogContent edit
  order (W1-C/W3-B → MATERIAL W3(b) → FM W7(b)) recorded in all three participating bands
  (APOTHEOSIS MECH-05/D-02).
- **Sequencing**: W1/W2/W3/W4 independent of each other EXCEPT the stamped cross-band seams
  (APOTHEOSIS): **DialogContent** — W1-C + W3-B land BEFORE `BAND-MATERIAL` W3(b)'s scene-staging
  extraction, which lands before `BAND-FEEDBACK-MOTION` W7(b); the extraction rebases over the
  landed renames (MECH-05/D-02). **Alert** — W3-A's alert/badge/toast recipe arm lands
  with-or-after `BAND-FEEDBACK-MOTION` W4 (D-09). **Slider.vue** — REDUCTION W1 cut → MATERIAL
  W4 track repoint → W2-E/W2-F (D-17). **PagerDots** — W2-A's aria linkage lands after
  `BAND-FEEDBACK-MOTION` W6's refinement (D-17). Then as before: W5-B after GF-DOCK W3; W5-C with
  W1-B in one `stateAttrs` edit seat; W1-D's token delete after the four repoints land.

---

## APOTHEOSIS amendments (RU-04 third judge, 2026-07-18)

Applied per `../formation/refable/REFABLE-RU-04-JUDGE.md`; the capstone is `APOTHEOSIS.md`.

- **MECH-05/D-02:** the "W1-W4 independent" claim corrected — the DialogContent seam stamped
  (W1-C/W3-B → MATERIAL W3(b) → FM W7(b)) in the sequencing bullet and the cross-band routings.
- **D-09:** W3-A gains the alert/badge/toast sequencing after FM W4 + the OPEN-FM-2-data-driven
  clause on the W3-C gate table.
- **D-14:** W2-B and W1-F gain contingency notes against REDUCTION W3's combobox delete and the
  ASK-§D1 compositions prune — no wasted fixes, no born-RED against deleted files.
- **D-17:** the Slider.vue and PagerDots hotspot edit orders stamped in the sequencing bullet.
