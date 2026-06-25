# D-configurator — "Configurator drawer does not work" (root-cause + gestalt SPEC)

**Audit scope:** the gear → Sheet/PresetEditor open path; the event wiring; the Sheet
positioning; the dark-mode-toggle canon; reconcile with the dock-morph-persistent rework.

**Method:** read the real HEAD source (`PresetEditor.vue`, `useConfiguratorOpen.ts`,
`SidebarDock.vue`, `BottomDock.vue`, `AppShell.vue`, `sheet/*`, `dock/shell.css`) AND live-
reproduced on the running 4.2.0 demo (`localhost:5173`) with Playwright DOM probes. Default-
broken skepticism applied — every claim below is HEAD-verified.

---

## HEADLINE

**The configurator WIRING is 100% sound. TWO independent layout/build defects make it
"not work":**

1. **The gear is geometrically un-clickable** — the vertical SidebarDock over-fills its
   `max-block-size`-capped, `contain: layout style paint` box, so the trailing `nav` zone
   (the morph + gear controls) SPILLS ~251px BELOW the contained dock box and falls into
   dead space where `document.elementFromPoint` returns the bare `<aside>`, not the gear.
   The button paints, looks enabled, and is even hover-styled — but a real pointer click
   never reaches it.
2. **Even when opened, the Sheet panel renders entirely BELOW the viewport** — the right-
   side `sheetVariants` relies on the Tailwind utility `inset-y-0` for `top:0; bottom:0`,
   but **Tailwind does NOT generate `inset-y-0`** in this build (every other utility in the
   same `cva()` string — `right-0`, `h-full`, `w-3/4`, `border-l` — DID generate). With no
   `inset-y-0` rule the `position:fixed` panel falls to its static position at the body
   tail (`top: 100%` of viewport) — a full-height panel pinned at the bottom edge, off-fold.

The two paths that BYPASS the gear click — the `,` keyboard shortcut and the
`glass-ui-demo:toggle-configurator` window event — both fire the toggle and mount the Sheet
content correctly (verified live), proving the singleton, the listener, the `v-model:open`,
and the SheetContent are all intact. The drawer is broken at the GEOMETRY layer, not the
logic layer.

The screenshot's "droplet+sparkle over a red bleed" is NOT a mis-rendered gear: the gear
renders the correct `lucide-settings-2` glyph. It is the morph (`ArrowLeftRight`) + gear
(`Settings2`) icon pair sitting in the spilled dead zone, washed by the `.cartoon-cast`
maroon offset-shadow (defect #3) and the dock-control specular gleam — the "sparkle over red."

---

## FINDINGS (HEAD-verified, with file:line + live evidence)

### F1 — The event/v-model wiring is correct and complete

- `demo/configurator/useConfiguratorOpen.ts:14` — `const open = ref(false)` is a module-
  level singleton; `useConfiguratorOpen()` returns that shared ref + a `toggle()`.
- `PresetEditor.vue:44` binds `const { open, toggle } = useConfiguratorOpen()`; the Sheet at
  `:159` is `<Sheet v-model:open="open">`; `onMounted` (`:52`) registers the
  `glass-ui-demo:toggle-configurator` listener → `toggle()` (`:48`).
- `SidebarDock.vue:204` reads the SAME singleton for `:aria-expanded="configOpen"` (`:474`);
  the gear `@click="openConfigurator"` (`:476`) dispatches the window event (`:207`).
- `AppShell.vue:322-329` registers the `,` shortcut dispatching the SAME event; `<PresetEditor/>`
  is mounted ONCE at the shell root (`:727`), so the portal is route-independent.

**Live proof the wiring works (Playwright):**
- Firing `,` (KeyboardEvent on body): `aria-expanded` flips `false→true`, the
  `[role="dialog"].glass-floating` Sheet content MOUNTS. ✅
- Dispatching `click` DIRECTLY on the gear element (bypassing hit-test): `aria-expanded` →
  `true`, the "glass-ui demo Configurator" title + footer mount. ✅
- The Sheet stays stably open (`data-state="open"` constant over 1200ms — no auto-close
  / focus-trap dismiss bug). ✅

**Conclusion:** nothing in the open logic is broken. The wiring is a clean single-source
singleton — keep it.

### F2 — ROOT CAUSE A: the gear is in un-hittable spilled dead space

Live geometry at 1200×806 viewport (`localhost:5173/foundations/intro`):

| element | box (y → bottom) | note |
|---|---|---|
| `.demo-sidebar-dock` (GlassDock) | 16 → **661** (h 645, capped `max-block-size:480px` at 600h vp) | `contain: content` |
| `.dock-section-zone--nav` (morph+gear) | **663 → 747** | rendered BELOW the dock box |
| `.demo-sidebar-gear` (the gear) | 707 → 747 | center (46,727) |
| `document.elementFromPoint(46,727)` | → `<aside class="demo-sidebar-rail">` | **NOT the gear** |

- `src/styles/dock/shell.css:113` — `.glass-dock { contain: layout style paint }`.
- `src/styles/dock/shell.css:291` — `.glass-dock.vertical { max-block-size: var(--dock-max-block-size) }`.
- `src/styles/dock/shell.css:207` — at rest `always-expanded` is `overflow: visible`, so
  over-cap content SPILLS (the shell.css F6 comment names this exact failure: "the
  `overflow: visible` above let over-cap content SPILL").
- `src/styles/dock/shell.css:222-236` — the cap+internal-scroll port is GATED behind the
  `dock-scroll-y` opt-in (`overflow="scroll"`, BA.W-DOCK-GEOMETRY DC-1). **SidebarDock never
  passes `overflow="scroll"`** (`SidebarDock.vue:246` — only `orientation="vertical"
  always-expanded`), so the cap clamps the box but nothing scrolls; the content spills.

The dock's content is 650px tall (`.dock-layers` child, y:97→747) inside a box clamped to
480px. The ℱ home + 7 category icons + the facet-rail chips + the morph + the gear simply do
not fit, and the `contain` makes the spilled tail un-hittable. **Result: the morph AND the
gear are both dead to pointer input** (Playwright `browser_click` on the gear times out:
"`<aside …demo-sidebar-rail>` intercepts pointer events").

This is a regression introduced/worsened by the dock rework: the `<DockSection>` `nav` zone
(BA.W-DOCK-SECTIONS) + the in-situ morph control (BA.W-DOCK-MORPH-INSITU, `SidebarDock.vue:451`)
ADD controls to an already-over-capped column, and the morph button's presence pushes the
gear further into the dead zone.

### F3 — ROOT CAUSE B: the Sheet panel is positioned off-screen (`inset-y-0` not generated)

Live computed style of the opened SheetContent:
- `position: fixed`, `inset: "806px 0px -806px 752px"` → `top: 806px` (= 100% viewport
  height), `bottom: -806px`, `height: 806px`. The panel's full height sits at and below the
  viewport bottom edge — invisible.
- The element's classList CONTAINS `inset-y-0 right-0 h-full` (from `sheetVariants.right`,
  `src/components/ui/sheet/index.ts:34`), inline style is only `pointer-events:auto`,
  transform is identity, `--tw-enter-translate-y: 0`.
- **CSSOM scan: NO rule sets `top`/`inset` on the element, AND the `inset-y-0` selector does
  NOT exist in ANY stylesheet** (`insetY0RuleExists: false`). Probing each utility:
  `right-0`✅ `h-full`✅ `w-3/4`✅ `fixed`✅ `z-modal`✅ `sm:max-w-md`✅ `border-l`✅ —
  only `inset-y-0` is **missing** (`false`).
- Injecting `top:0; bottom:0` (what `inset-y-0` would emit) snaps the panel `y:600→0`,
  filling the viewport — proving the missing utility is the SOLE cause.

So `inset-y-0` — the ONLY top/bottom positioning utility on the right-side Sheet — is dropped
by Tailwind's content scan (TW v4.3.1). Every sibling utility in the same `cva()` string
generated; `inset-y-0` (the two-axis `inset-block: 0` form) uniquely did not. Whatever the
JIT-extractor reason, the architectural defect is the same fragility class CLAUDE.md's
**BA.W-EMISSION** ("the self-emission class is CLOSED at the root … STRUCTURAL arbitrary
utilities NEVER silently die") was written to kill: **the Sheet's load-bearing positioning
geometry must not depend on a content-scan-reachable utility string in a `.ts` `cva()`
literal.** The same drop would silently break Dialog-adjacent surfaces and any consumer.

### F4 — The dark-mode-toggle canon is already correct (keep)

- `PresetEditor.vue:97-99` documents the `darkModel` shadow was removed; `:198` renders the
  canonical `<DarkModeToggle size="control">` (`controls/DarkModeToggle.vue`) bound to the
  live `useGlobalDark` — there is NO config-store dark shadow to desync. This satisfies the
  prompt's "dark mode toggle is the canonical useGlobalDark." No wave needed here.

### F5 — The ℱ persistent brand section (defect #8) sits ABOVE the spilled controls

- `SidebarDock.vue:269-313` renders the ℱ wordmark home control + an anchor `<DockSeparator>`
  in `#persistent`. The BG directive (#8) is REMOVE the persistent ℱ brand section atop both
  docks. Removing it reclaims ~59px of the over-capped column (the `dock-persistent` child is
  y:26→85, h:59) — directly relieving the F2 spill. This audit folds the removal into the
  dock IA fix because the two are the same height-budget problem.

### F6 — The morph control is a MODAL demo, not an in-dock morph (defect #13 overlap)

- `SidebarDock.vue:451` + `BottomDock.vue:433` add a morph `DockIconButton` that dispatches
  `glass-ui-demo:toggle-dock-morph` → `AppShell.vue` opens a full `role="dialog"` MODAL
  stage (`AppShell.vue:497-720`) with TWO synthetic docks + a View-Transition crossfade
  default. The BG directive (#13) is: remove the crossfade/VT variant, make the morph a
  BUTTON IN THE DOCK that morphs the real V dock ↔ H dock IN PLACE — not a modal. This is
  D-dock-morph-persistent's territory; this audit only notes that the morph button is the
  control SHARING the dead `nav` zone with the gear, so the two fixes must land together.

---

## ROOT CAUSES (gestalt, first-principles)

- **RC-A (the dead gear): an over-stuffed, capped, `contain`-clipped vertical dock with its
  PRIMARY utility controls placed at the END of a spilling column.** The dock band's box-
  inviolate + cap-and-spill model is correct for a tight icon pill, but the demo crammed
  home + 7 categories + facet chips + morph + gear into one viewport-capped column with no
  scroll and no overflow story for the utility tail. The utility controls (gear, morph) are
  always-needed chrome and must never live below the fold of a spilling column.
- **RC-B (the off-screen panel): the Sheet's structural positioning is load-bearing on a
  content-scan-reachable Tailwind utility (`inset-y-0`) that the JIT silently dropped.** Geometry
  that decides whether a modal is on-screen is not a "decoration" that may degrade — it is
  structural and must be emitted unconditionally (BA.W-EMISSION's exact thesis, here unmet
  for the Sheet/Dialog overlay band).

---

## PROPOSED WAVES

### BG.W-SHEET-INSET-ROOT — Sheet/Dialog positioning is structural, never content-scan-reachable
- **Intent:** the overlay band (Sheet/Dialog/Drawer/Popover content) positions itself from
  the library's OWN shipped CSS, never from a Tailwind utility string the consumer's content
  scan must reach. Close the `inset-y-0`-dropped-off-screen class at the root.
- **Approach (idiomatic, gestalt):** move the side-keyed inset+size geometry off the
  `sheetVariants` cva utility string and into a shipped `@layer components` recipe keyed off
  `[data-slot]` + `data-side` (the same `[data-slot]`/`data-side` mechanism `reveal.css`
  already uses for the directional bloom). `sheetVariants` keeps only the decoration class
  hook; the `inset-block: 0; inset-inline-end: 0; block-size: 100%` for `side="right"` (and
  the four-side siblings) ship as real CSS rules in `src/styles/` so they cannot be purged.
  This is the W-EMISSION "structural arbitrary utilities pre-compiled into shipped CSS" rule
  applied to the overlay-positioning band — NOT a per-consumer `@source` patch.
- **Files:** `src/components/ui/sheet/index.ts` (drop the inset/size utilities from the cva,
  keep `data-side`), `src/styles/` new `sheet.css` (or extend `glass/reveal.css`'s data-side
  block) with the four-side `[data-slot="sheet"]…` inset rules, `SheetContent.vue` (bind
  `:data-side`). Mirror the same audit for `DialogContent` centering.
- **π / acceptance:** open the configurator Sheet via the gear AND `,`; the panel's computed
  `top`/`inset-block-start` resolves to `0` and it fills the right edge top-to-bottom in BOTH
  modes, both Chrome and Safari, with `inset-y-0` DELETED from the codebase. A gate (extend
  `proof:emission`) asserts no overlay-band component's on-screen positioning lives in a
  content-scan-reachable utility string.
- **Folds chronic:** the BA.W-EMISSION "structural-only precompile" doctrine, extended to the
  overlay positioning band (the gap it did not cover).

### BG.W-DOCK-UTILITY-REACH — the dock's utility controls are ALWAYS reachable (no spill, no clip)
- **Intent:** the gear (and any always-needed dock utility) is reachable by a real pointer
  click on EVERY viewport — never spilled below a `contain`-clipped, over-capped column.
- **Approach (idiomatic, gestalt, first-principles IA):** this is a dock-IA redesign, NOT a
  band-aid. The vertical SidebarDock's utility tail must not depend on fitting an unbounded
  category list under a viewport cap. Reconcile with the BG dock directives:
  - **Remove the persistent ℱ brand section** (defect #8) — reclaims the `#persistent` height
    and deletes the wordmark home control entirely (clean break, no alias).
  - **Reframe the morph as an in-dock button** (defect #13 / D-dock-morph-persistent) — the
    morph control stays in the dock but drives the in-place V↔H morph; the modal stage in
    AppShell is deleted. Coordinate landing with D-dock-morph-persistent.
  - **Give the over-cap column an honest overflow story:** the category run is the scrollable
    middle; the utility zone (gear + morph) is a PINNED footer that never scrolls out
    (a `position: sticky`/flex-pinned trailing group inside the dock, or the utility controls
    promoted out of the capped scroll region). The `nav` zone must paint inside the `contain`
    box so `elementFromPoint` resolves it. Verify the `contain: content` + cap + scroll
    interaction does not re-clip the pinned footer.
- **Files:** `demo/layout/SidebarDock.vue` (remove ℱ `#persistent`; restructure the
  `<DockSection>` so the `nav` utility zone is a pinned, always-in-box footer), `demo/layout/
  BottomDock.vue` (mirror the morph reframe), `src/styles/dock/shell.css` /
  `demo/layout/dock-nav.css` (the column = scrollable categories + pinned utility footer
  contract; ensure the utility footer is inside the `contain` box), reconcile with
  `src/styles/dock/overflow.css` `dock-scroll-y` opt-in.
- **π / acceptance:** `document.elementFromPoint(gearCenter)` returns the gear (or its child)
  on the desktop rail AND the mobile Sheet host, every category count, both modes; a real
  Playwright `browser_click` on the gear opens the configurator without timeout. The dock box
  never spills un-hittable controls (assert: every interactive dock control's center hit-tests
  to itself).
- **Folds chronic:** the over-cap-spill class the shell.css F6 comment names; the dock-IA
  height-budget chronic the morph + section reworks aggravated; BG defects #8 + #13 (shared).

### BG.W-CONFIG-OPEN-VERIFY (small, rides the above) — lock the working wiring + the dark canon
- **Intent:** keep the proven-sound singleton/event/v-model wiring + the canonical
  `<DarkModeToggle>`/`useGlobalDark` and pin them so the dock-IA rework can't regress them.
- **Approach:** no behavior change — a thin e2e/π that opens the configurator via BOTH the
  gear click AND the `,` shortcut, asserts the Sheet content mounts ON-screen, the dark toggle
  flips the global mode, and `aria-expanded` stays honest. (The wiring is already a clean
  single-source singleton — this just fences it.)
- **Files:** `tests-visual/` new spec (configurator open via gear + shortcut, panel on-screen,
  dark toggle canonical), no src change.
- **π / acceptance:** the spec is GREEN after BG.W-SHEET-INSET-ROOT + BG.W-DOCK-UTILITY-REACH
  land; born-RED on HEAD (gear un-clickable + panel off-screen).

---

## RECONCILE NOTES

- **The wiring is NOT the bug — do not "fix" it.** Any wave that rewrites the singleton or the
  event path is wasted motion; the two real fixes are the Sheet positioning (build/structural)
  and the dock utility reach (IA/layout).
- **BG.W-DOCK-UTILITY-REACH is co-dependent with D-dock-morph-persistent** (the morph control
  + the `nav` zone are the same dock surface). Land them in one dock-IA pass.
- **The red bleed around the gear** (`.cartoon-cast` maroon offset-shadow, `boxShadow:
  oklab(0.18 …)` -3px 3px) is defect #3's territory (a separate audit) — noted here only
  because it is WHY the working gear "looks broken" in the screenshot.
