# H-touch-scale — adversarial hardening: touch-target + type-scale system (AY.W-SCALE1/W-SCALE2)

**Verdict: GAPS-FOUND** (the plan is built on a STALE premise + is UNDER-SPECCED — no edit-sites, no real coverage map, the hard gate is grep-able and the "axe target-size" gate has no harness).

## TL;DR for the orchestrator

The AY plan (`AY.md:71-72`) and the ledger (`AUDIT-LEDGER.md:23`, row 4 "DEFERRED — only dock
coarse-pointer floor; **no library-wide touch/type-scale system**") are FACTUALLY WRONG at HEAD.
A library-wide system ALREADY SHIPPED at AX.W51 D18: the `--ui-scale` master comfort scalar, the
`--control-h-*`/`--control-text`/`--ui-glyph` cohorts, the global `@media (pointer: coarse)`
amplification, the WCAG-44px `--control-floor` clamp, AND a `proof:ui-scale` gate
(`package.json:658`). Button/Toggle/Tabs/Badge/Alert/Avatar/Toast/Select/Combobox/Command/
NumberField/Input/Textarea ALL consume it.

W-SCALE1/2 as written would RE-LAND work already done. The REAL, un-done work is a narrow
residue: (1) the form-control atoms OFF the axis with NO coarse touch floor (Switch 24px,
Checkbox/Radio 16px, TagsInput, MultiSelect, Slider thumb); (2) a genuinely RESPONSIVE type scale
on the CONTROL/body ladder (today only the φ-DISPLAY ladder is `clamp(…vw…)`; the
body/control rungs are fixed rem — the desktop half of the user's "mobile AND desktop" ask is
UNMET); (3) the "axe target-size" hard gate has NO harness (no axe-core in `tests-visual/`).

The wave must be RE-SCOPED from "build the system" to "close the residue + the desktop-fluid
half", with concrete edit-sites and a real (not grep) gate.

---

## Finding 1 — the plan's premise is STALE; the system already exists (the headline)

`AY.md:71` W-SCALE1 scope: *"A library-wide touch-target + type-scale system: a `--touch-target`
floor (≥44px coarse) + a responsive type scale, idiomatic Tailwind, applied across interactive
atoms (not just dock)."* `AUDIT-LEDGER.md:23` row 4 STATUS=DEFERRED, note "only dock
coarse-pointer floor (`--dock-scale`); no library-wide touch/type-scale system".

This is false. At HEAD:

- `tokens.css:1172` `--ui-scale: 1` — the master comfort scalar, registered as a typed
  `@property <number>` `inherits:true` (`tokens.css:2245`).
- `tokens.css:1184-1188` `--control-floor` + `--control-h-{xs,sm,md,lg}` = `max(calc(<base> *
  var(--ui-scale)), var(--control-floor))` — the WCAG-44px clamp seam IS the design.
- `tokens.css:1197-1205` `--control-text` / `--control-text-sm` / `--ui-glyph` / `--ui-glyph-sm`
  — the comfort-scaled font + glyph cohort.
- `tokens.css:1785-1788` the GLOBAL `@media (pointer: coarse) { :root { --ui-scale:
  var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem) } }` block — the
  whole library grows ~1.5× on touch from ONE place, and the 44px floor clamps in.
- `tokens.css:1291` `--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1))` — the
  dock is RECONCILED as a SPECIALIZATION of the master, not a parallel 1.5× (D18 reconcile).
- CONSUMERS already on the axis: `button/index.ts:27,89-94`, `toggle/index.ts:34,46-48`,
  `badge/index.ts:12,39-41`, `alert/index.ts:11`, `avatar/index.ts:16`, `toast/ToastAction.vue:26`,
  `tabs/TabsList.vue:34`, `select/SelectTrigger.vue:36`, `combobox/ComboboxInput.vue:34`,
  `command/CommandInput.vue:28`, `number-field/NumberFieldInput.vue:37`, `.input-pill`
  (`glass.css:636,653,654`) → Input + Textarea.
- A gate EXISTS: `package.json:658` `proof:ui-scale` → `scripts/proof-ui-scale.mjs` (asserts the
  master scalar minted, the cohorts derive through it, no buried comfort-literal in the four CVA
  bases, `--dock-scale` reconciled, the global coarse block, the 44px clamp, the φ-ladder
  untouched). It even self-documents the π live-readback arm (the `--ui-scale: 1.3` lockstep test).

**Disposition:** W-SCALE1's "mint the system" objective is ALREADY MET. The wave must be
re-grounded to the RESIDUE (Findings 2-4). Carrying it as "DEFERRED — no system" is the
chronic-miss inflation the cardinal lesson warns against (claiming undone what shipped, the
inverse of claiming done what didn't).

## Finding 2 — the form-control atoms are OFF the axis AND have NO coarse touch floor (the real W-SCALE2 work)

The global coarse touch floor (`utilities.css:1163-1170`) targets ONLY THREE selectors:
`[data-size="icon"]`, `.expandable-container__trigger`, `.segmented-tabs__trigger`. Every other
small interactive atom is uncovered. At `@media (pointer: coarse)` these paint BELOW 44px and trip
axe `target-size` (WCAG 2.5.5):

| atom | site | painted touch size | on `--ui-scale` axis? |
|---|---|---|---|
| Switch root | `switch/Switch.vue:30` | `h-6 w-11` = **24×44px** (24px high) | NO (raw `h-6`) |
| Switch thumb | `switch/Switch.vue:35` | `h-5 w-5` = 20px | NO |
| Checkbox | `checkbox/Checkbox.vue:25` | `h-4 w-4` = **16px** | NO |
| RadioGroupItem | `radio-group/RadioGroupItem.vue:29` | `h-4 w-4` = **16px** | NO |
| TagsInput item/delete | `tags-input/TagsInputItem.vue:19`, `TagsInputItemDelete.vue:21` | `h-6` / `w-4 h-4` = **24/16px**, `text-sm` literal | NO |
| MultiSelect remove-X | `multi-select/MultiSelect.vue:152,155` | `h-3 w-3` / `h-2 w-2` = **8-12px**, `text-xs` literal | NO |
| Slider thumb | `slider/Slider.vue` (`--slider-thumb-size, 1rem`) | **16px** default thumb | NO (own token, no coarse lift) |

NONE of these is on the legitimate-stays-small allowlist (Switch/Checkbox/Radio are PRIMARY input
controls, not decoration). Checkbox/Radio at 16px and the MultiSelect remove-X at 8-12px are gross
target-size failures on touch. The W-SCALE2 row (`AY.md:72`) names "buttons, inputs, selects,
tabs, dock controls" as the apply-set — but buttons/inputs/selects/tabs/dock are ALREADY on the
axis (Finding 1). The actual un-done atoms (Switch/Checkbox/Radio/TagsInput/MultiSelect/Slider) are
NOT in the W-SCALE2 scope line. The wave audits the wrong set.

**Root-cause fix (idiomatic, not per-atom min-h patches):** the hit-target is decoupled from the
visual size. A 16px checkbox SHOULD stay 16px visually — the FIX is a coarse-pointer hit-area
expansion (a `::before` pseudo-element inset to ≥44px, the pattern already used by
`timeline/SegmentedTimeline.vue:212` + `ContinuousMarkers.vue:309` for the boundary dots) rather
than ballooning the visual control. So the missing piece is a SHARED `@utility touch-hit-area`
(coarse-gated `::before` overlay keyed off `--touch-target`) that Switch/Checkbox/Radio/Slider-thumb
compose — DRY, one source, ≥2 consumers, the existing timeline pattern generalized. The
`text-sm`/`text-xs` raw literals on TagsInput/MultiSelect should re-point to `--control-text` /
`--control-text-sm` so they ride the comfort axis (they paint redundant/off-axis today).

## Finding 3 — the CONTROL/body type scale is NOT responsive (the desktop half of the ask is UNMET)

The user's ask (`PROMPT-CORPUS.md:33-34`, item 4): *"Touch-target + font-size general increase on
mobile AND desktop, idiomatic + modern + non-contrived."* The control-font axis grows on
COARSE-pointer (the `1.5×` lift) — the mobile half. But the DESKTOP half ("font-size general
increase on desktop") is interpreted only as the `--ui-scale: 1` identity (no growth) PLUS the
opt-in consumer override. There is no FLUID/RESPONSIVE growth of the control/body type on desktop.

Evidence: `typography.css:108-119` the φ-DISPLAY ladder IS responsive — `--type-display-1` =
`clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)` etc. But the BODY/CONTROL rungs
(`typography.css:99-107`: `--type-admin-label` … `--type-title`) are FIXED rem. `--control-text`
= `calc(var(--type-small) * var(--ui-scale))` = `calc(0.875rem * 1)` on desktop = a flat 14px at
every desktop viewport. A 14px control font on a 27" display is the "font too small" the user
flagged (the AX.W51 RED 3 the source comments cite) — and the system gives the consumer a knob but
ships the SAME tight default. "Modern + non-contrived" SOTA (developer.chrome.com modern-web-guidance,
the fluid-type idiom) is a `clamp()` on the BODY register too, so the desktop default itself grows
gently with viewport without a media-query staircase.

The plan's W-SCALE1 says "a responsive type scale" but does NOT say which ladder, and the φ-display
ladder is ALREADY responsive — so the wave could grep-pass ("a clamp exists") while the
control/body ask stays unmet. UNDER-SPECCED: the wave must name the BODY/CONTROL ladder as the
target of the fluid scale and the EXCLUSION (the comment at `tokens.css:1157-1161` deliberately
EXCLUDES the φ-display ladder from `--ui-scale`; the fluid-body decision must reconcile with that
exclusion — does the body ladder get a `clamp()` base, and does `--ui-scale` then multiply the
clamp? that interaction is unspecified and is a correctness trap: `calc(clamp(...) * var(--ui-scale))`
double-applies the viewport term under coarse).

## Finding 4 — the "axe target-size" hard gate has NO harness (the gate is a phantom)

`AY.md:72` W-SCALE2 hard gate: *"axe target-size pass; capture mobile+desktop."* There is NO
axe-core anywhere in the repo: `grep -rn "axe\|@axe-core\|injectAxe" tests-visual/ tests/` returns
nothing. The `tests-visual/` Playwright harness (the π lane, 24 specs) has NO target-size spec and
no axe injection. So the hard gate as written cannot be evaluated by an artefact — it violates the
`TRANCHE-AND-WAVE-SPEC.md:38-42` rule ("a hard gate is valid only when verified by an artefact …
Grep-only and 'API exists' checks are insufficient for runtime features").

Two sub-problems:
- axe-core's `target-size` rule needs a LIVE rendered page at a coarse-pointer emulation
  (`hasTouch: true` + the `pointer: coarse` media). The existing `tests-visual/playwright.config.ts`
  must add a coarse/touch project, and a new `tests-visual/touch-target.spec.ts` must mount the
  control gallery, emulate coarse, inject axe, and assert ZERO `target-size` violations +
  getComputedStyle readback that each atom's hit-rect ≥ 44px.
- The DESKTOP half (Finding 3) needs a paired π readback: the control/body font at a wide viewport
  is measurably larger than the fixed-rem baseline (the fluid clamp actually grew), captured as a
  DELTA artefact per the cardinal lesson.

`proof:ui-scale` (`proof-ui-scale.mjs`) proves the calc STRUCTURE only (it says so itself in its
header) — it is NOT the target-size runtime gate. The wave needs a SECOND, runtime gate.

## Finding 5 — no `--touch-target` is applied to the picker rows (Select/Dropdown/Context-menu items)

The picker FAMILY rides `--dropdown-input-height`/`--dropdown-text` for the TRIGGER + filter input
(`tokens.css:1233-1235`), but the menu-ITEM rows (`SelectItem`, `DropdownMenuItem`,
`ContextMenuItem`, `CommandItem`) have no coarse touch floor — they are `py-1.5`-class rows that on
coarse pointer can fall under 44px tap height. These are high-frequency touch targets (a dropdown
on mobile). Not in the W-SCALE2 apply-set, not floored. (Lower-severity than Finding 2 since the
rows are wider than tall, but the vertical tap height is the axe metric.)

## Finding 6 — `--touch-target` vs `--dock-touch-target` vs `--control-floor` is a three-token tangle to reconcile

`tokens.css:1394` `--dock-touch-target: 2.75rem` and `tokens.css:1403` `--touch-target: 2.75rem`
are numerically identical and the comment (`tokens.css:1399-1403`) keeps them "distinct so the dock
floor and the general floor can be retuned independently" — fine. But `--control-floor`
(`tokens.css:1184`) is the THIRD floor seam, and the coarse block lifts `--control-floor` →
`--touch-target` (`tokens.css:1788`). The Switch/Checkbox/Radio fix (Finding 2) must thread the
SAME `--touch-target` token (not a fourth literal `44px`), or the tangle grows. The wave must state
the ONE token the new hit-area utility reads (`--touch-target`) and NOT mint a new one.

---

## Convergence criteria (the acceptance bar — what "perfected" means for this lane)

1. The plan + ledger row 4 are CORRECTED to "system shipped at AX.W51 D18; AY closes the residue"
   (no more "no system" inflation).
2. Every interactive atom — incl. Switch, Checkbox, RadioGroupItem, Slider thumb, TagsInput item +
   delete, MultiSelect remove-X, and the picker menu rows — has a touch hit-rect ≥ `--touch-target`
   (44px) under `@media (pointer: coarse)`, via a SHARED coarse-gated hit-area utility (the timeline
   `::before` pattern generalized), NOT per-atom `min-h-[44px]` patches and NOT by ballooning the
   visual control.
3. The BODY/CONTROL type ladder grows on DESKTOP — a fluid `clamp()` base on the control/body rungs
   that reconciles with the φ-display exclusion AND with `--ui-scale` (no double-vw under coarse),
   so a wide desktop viewport paints a measurably-larger control font than the fixed-rem baseline.
4. A REAL runtime gate: `tests-visual/touch-target.spec.ts` injects axe-core at coarse/touch
   emulation and asserts ZERO `target-size` violations + a getComputedStyle hit-rect readback ≥
   44px for the gallery, PLUS a desktop-wide font-grew DELTA capture. `proof:ui-scale` stays as the
   structure arm; the new gate is the runtime arm.
5. The TagsInput/MultiSelect raw `text-sm`/`text-xs` literals re-point to `--control-text` /
   `--control-text-sm` (on the axis), and no new fourth touch-floor token is minted.

## Fold-into routing

- W-SCALE1 (re-scoped): correct the premise + land the fluid BODY/CONTROL clamp (Findings 1, 3, 6).
- W-SCALE2 (re-scoped): the residue atoms' hit-area utility + the axe target-size runtime gate
  (Findings 2, 4, 5).
- The ledger correction (row 4 → "system shipped; residue open") is a W-CLOSE1 honesty-pass input.
