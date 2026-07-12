# BI.W-SPECIMEN-FRAME — the SpecimenFrame host + the full-width-trigger kill + the sub-type fold

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **UF-F8** "Why do we have elements that are so outrageously sized." — the popover "Dimensions" full-width anchored trigger (ss-14).
- **CBA-1** [P1] (`ROUND-2-DIGEST`): the full-width triggers are CHASSIS-INHERITED, not markup — StorySection body is `flex flex-col` (align-items:stretch), so a LONE direct-child trigger balloons to the column width (live-measured **1357px** on containers/popover, dropdown-menu, hover-popover). A markup grep can NEVER catch this — measure rendered width.
- **CBA-7** [P2]: the round-1 clean w-full census is a structural false-negative class; any affordance gate MUST measure RENDERED width in a real browser, never grep markup.
- **G4 Arm B** (`story/PASS-1.md` §6): the w-full specimen-vs-composition split — enumerate, classify, named allowlist (pass-4: 4 w-full Buttons, all in the 2-file allowlist, 0 offenders).
- **G9**: the sub-type taxonomy — DemoInteraction / DemoComposition / DemoStage / DemoSpecimen each 1-consumer (all `compositions/chassis.vue`) → FOLD (the ≥2-consumer bar applied to the chassis itself; `PASS-4B-RAW` D-STORY G9 CLOSED).
- **FAM-14** (w-full contradiction arm): the clean markup census vs ss-14/15 — RECONCILED here (rendered-truth gate).

## Design

The structural fix `story/PASS-1.md` §4.1 mandates: ONE specimen host that NEVER stretches lone interactive children. `SpecimenFrame` is a REAL scoped component (pass-3: 1286→122px both engines) — the fold of `ShowcaseFrame` + `DemoSpecimen` (absorbs DemoSpecimen's label/heading/blurb header + the glass-tier axis), gaining the `size` cap (`sm|md|prose|fluid`, default `md` — `fluid` must be DECLARED, so an outrageous full-width specimen is un-expressible by default). It CORRECTS the prototype's `:slotted` approach which silently failed the real reka as-child case; the align-self carve is depth-BOUNDED (the pass-3 critic's nested-flex-button over-reach fenced).

The specimen host plate maps onto the SHARED surface axis — the veil register is `surface="veil"`'s borderless legibility plate; read it, never fork a demo-local veil recipe (UF-F6's demarcation is W-AFFORDANCE's; the plate is consumed here).

The w-full ban is a RENDERED-WIDTH π (CBA-7 law), not a class grep: an interactive trigger that is a DIRECT specimen child of SpecimenFrame/PermutationGrid may not resolve to article width. The `auth-shell`/`gate-pattern` compositions are named-allowlisted (4 legit w-full Buttons, 2-file allowlist). Do NOT default StorySection body to `items-start` (would shrink legit full-width surfaces: accordion headers, list-cards) — wrap the lone trigger instead (the shipped `flex flex-wrap gap-3` idiom dialog/sheet/drawer already use).

`DemoMatrix` is RENAMED to `PermutationGrid` (kept — the `permute` cartesian grid the schema drives); `DemoSpecimen` folds into SpecimenFrame; `DemoInteraction`/`DemoComposition`/`DemoStage` (1-consumer each) fold into SpecimenFrame slots — clean break, no alias.

## Work

- NEW `demo/chassis/showcase/SpecimenFrame.vue` (rename/fold `ShowcaseFrame.vue` + `demo/chassis/DemoSpecimen.vue`) — the label/heading/blurb header + glass-tier axis + the `size` cap (`fluid` explicit), the bounded align-self carve (never clobbers a nested-flex button).
- `demo/chassis/DemoMatrix.vue` → `demo/chassis/PermutationGrid.vue` (rename; the schema's `permute` driver).
- DELETE `demo/chassis/{DemoInteraction,DemoComposition,DemoStage}.vue` — fold their 1 call site (`compositions/chassis.vue`) onto SpecimenFrame slots (clean break).
- The 3 offending pages wrap the lone trigger in `<div class="flex flex-wrap gap-3">`: `demo/stories/containers/popover.vue` ("Dimensions"), `dropdown-menu.vue` ("Open menu"), `hover-popover.vue` ("Save document").
- Sweep ALL story bodies for a bare interactive element as a direct flex-col child (rendered-width probe, not grep).

## Acceptance

Gate: **`proof:story-kit`** (NEW composite, born-RED) — GREEN at close (BORN-RED at HEAD: 3 triggers at 1357px; SpecimenFrame not a component; DemoSpecimen un-folded).

Clauses:
- A1 the kit-adoption tree-global: every enrolled route composes StoryPage AND labeled sections are StorySection (128/150 at HEAD; the residual migrates in W-AFFORDANCE).
- A3 the w-full ban — a live π rendered-width arm: no compact-intent trigger (`button`/`[role=button]`/select-trigger, text length < N) renders at width==parent AND >~400px, off the named `auth-shell`/`gate-pattern` allowlist (CBA-1/CBA-7 — RENDERED width, never a markup grep).
- SF1 `SpecimenFrame` exists as a real scoped component (the ShowcaseFrame+DemoSpecimen fold); `DemoSpecimen`/`DemoInteraction`/`DemoComposition`/`DemoStage` DEFINITION-ABSENT (G9 fold, clean break); `DemoMatrix` renamed to `PermutationGrid`.
- SF2 the 3 offending triggers (popover/dropdown-menu/hover-popover) resolve < article width.
- Self-test bites: a planted lone full-width trigger reds A3; a planted allowlisted composition greens; a re-added `DemoSpecimen.vue` reds SF1.

## π/DELTA

- **The 3 offending triggers no longer balloon** — rendered-width readback: containers/{popover,dropdown-menu,hover-popover} triggers < article width (from 1357px), Chrome + real-Safari, both modes.
- **SpecimenFrame fold parity** — the folded specimen host renders byte-visually-identical to the ShowcaseFrame+DemoSpecimen it replaces on a representative page (`display/card`), both modes.

## Obligations

- **G8 migration blast-radius** (carried with W-AFFORDANCE): the DemoSpecimen/DemoInteraction/DemoComposition fold + StorySection swap shift DOM structure — a 3-page probe (one forms, one data, one display) with tests-visual re-run + axe + fresh dual-engine (Chrome+Safari) capture BEFORE the ~35-45-SFC rollout. Can move π specs, gestalt captures, reveal timing, heading hierarchy.
- **STABLE-Safari** (SAF-1): the SpecimenFrame carve + trigger-wrap paint on real Safari.app.

## Dispositions

- Terminalizes **CBA-1** / **CBA-7** / **G4 Arm B** / **G9**; reconciles the **FAM-14** w-full contradiction (rendered-truth gate, not markup grep). The DemoMatrix→PermutationGrid rename is a clean break (no alias).
