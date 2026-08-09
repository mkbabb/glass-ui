# SegmentedTabs — the unified spring-slider tab family

`<SegmentedTabs>` is glass-ui's ONE tab/toggle-strip primitive: a single
component with a two-value material axis, an independent semantic axis, and ONE
shared elastic indicator. It subsumed the former `BouncyToggle` / `BouncyTabs` /
`UnderlineTabs` / `ResponsiveTabs` quartet (a clean break, no alias). This README
is the SOURCE OF TRUTH for the material/semantic axes, the indicator mechanism,
the ARIA contract, and the colocation map — so a consumer reaches for the right
shape and does not re-invent the indicator.

All tabs surfaces reach consumers via `@mkbabb/glass-ui/tabs`.

---

## Material and semantics

ONE component, two materials:

- **`pill`** (DEFAULT) — the iOS segmented control, and the EYEGLASS: a glass-plated
  strip whose active segment is a body with area. On a hop it spans origin and
  destination, leans 2:1 into its travel, swells across, inverts from a pressed well
  to a lit dome, and clamps at the bar's inner edge. The eyeglass is not a third
  material — it is what `pill` IS.
- **`underline`** — panel-navigation tabs with an underline indicator: the same
  measured node, drawn as its edge instead of filled.

`semantics="toggle"` exposes `role="group"` + `aria-pressed` buttons;
`semantics="tabs"` exposes `role="tablist"` / `role="tab"` + `aria-selected`.
When omitted, compatibility defaults preserve the historical pairing: pill is
toggle semantics and underline is tab semantics. Material remains independent,
so `variant="pill" semantics="tabs"` is the glass-pill panel-navigation form.

`activation="automatic"` (default) selects as roving focus moves.
`activation="manual"` moves focus independently and selects only on Enter,
Space, or click. The active indicator always follows selection, never focus.

`:responsive` (`true` or
`{ breakpoint, desktopOptions, ariaLabel, triggerClass }`) collapses the strip to
a `<Select>` below the breakpoint.

### ARIA semantics (load-bearing)

The role is keyed to `semantics`, not the look:

- `tabs` is **panel navigation** — `role="tablist"` / `role="tab"` +
  `aria-selected`. Exactly one tab active; each reveals a distinct panel.
- `toggle` is the **ToggleGroup-shaped surface** — `role="group"` +
  `aria-pressed`. No panel swap; the toggles flip state on a shared view.

Reach for `semantics="tabs"` for mutually-exclusive PANEL navigation and
`semantics="toggle"` for a single-select control that mutates one surface.

---

## The indicator mechanism

ONE indicator engine, ONE indicator NODE, ONE deform law. Both materials measure
through the same JS writer, so there is no engine branch and no second element to
keep in sync.

The active indicator GLIDES on `--spring-dock` (the coordinated-travel register)
and DEFORMS on travel, on a policy the SFC STATES rather than infers — the
`deform` parameter, `"plate"` for the pill and `"mark"` for the hairline:

- **`plate`** — the eyeglass. `--eyeglass-span` / `--eyeglass-swell` /
  `--eyeglass-origin`, armed by the SURFACE declaring `--eyeglass-span-max` in its
  own cascade (`styles/segmented.css`, pill only, ceiling `1.6`). A surface that
  declares nothing keeps the plain length law: nothing switches on behind a
  consumer's back. Every figure lives in
  `composables/motion/morph/eyeglass.ts`, which states where each was measured.
- **`mark`** — `--stretch` only, capped by `--tab-indicator-max-stretch` (default
  `1.11`). A hairline lengthens along its travel; it has no area to inflate and no
  cross axis to swell.

The writer is `useSelectionIndicator` — the library's ONE traveling-indicator
writer, reached through `useSelectionGroup`. It is `prefers-reduced-motion`-gated
(no deform under reduce), and the deform + the glide read ONE clock,
`--tab-indicator-duration`.

~~The squish is owned by the `useTabIndicator` composable (`composables/`) … the
SFC's scoped CSS pairs it reciprocally.~~ [2026-08-08 · BK #32: struck. There is no
`useTabIndicator` on disk and there was none when this paragraph was written; the
volume-preserving `scale: var(--stretch) calc(1 / var(--stretch))` pairing and its
companion `--tab-blob` area-inflation channel are both DELETED with the composed-area
fence that existed only to keep two multiplying scalars from arguing.]

State is `[data-active]`, presence-gated, on both semantics. `[aria-pressed]` and
`[aria-selected]` are two spellings of one fact, and a paint rule that picks one is
dead on the other — which is how the drag bootstrap came to key `aria-pressed` and
leave the liquid tab dead on every `role="tablist"` strip. The ARIA attributes
themselves are untouched: they are the accessibility contract, not the paint hook.

---

## Colocation map

The feature-dir convention (see `docs/precepts/design-idioms.md` §7):

```
src/components/tabs/
├── SegmentedTabs.vue          # the single component shell (variant axis + responsive collapse)
├── composables/
│   ├── useTabResponsive.ts    # the below-breakpoint collapse-to-<Select> resolver
│   ├── useTabRovingFocus.ts   # the WAI-ARIA roving-tabindex keyboard machine
│   └── useTabDragMorph.ts     # the pull/drag-to-morph liquid-tab gesture (useDragMorph)
├── styles/
│   ├── segmented.css          # the material grammar + the eyeglass arming/paint
│   └── drag.css               # the liquid-tab drag affordance + travel occlusion
└── index.ts                   # the package barrel
```

~~`constants.ts` — the elastic-indicator travel-squish magic-number home;
`composables/useTabIndicator.ts` — the gliding + squishing elastic-indicator
engine.~~ [2026-08-08 · BK #32: both struck from the map — NEITHER FILE EXISTS, and
neither did when the map was written. The travel figures live in
`composables/motion/spring/`-adjacent registers and in
`composables/motion/morph/eyeglass.ts`; the engine is the library-wide
`useSelectionIndicator`, not a tabs-local leaf. The `styles/` pair was on disk and
absent from the map, so the map understated the dir in both directions.]

The SFC is the carved shell: the responsive-collapse, roving-focus and drag concerns
live in their colocated `composables/` leaves, which the SFC IMPORTS back — it does
not inline them.

The indicator's visual axes (`--tab-indicator-max-stretch`, `--tab-indicator-duration`,
the spring register) are tokens (`styles/tokens/scale-paper.css`, reached through
`styles/tokens.css`); a consumer retunes the deform cap by overriding the token, no
library edit. `--eyeglass-span-max` is not a token — it is the ARMING declaration, and
it belongs to the surface that wants the organ.

---

## Composables (do not re-invent)

- `useSelectionGroup` / `useSelectionIndicator`
  (`src/composables/motion/morph/`) — the library's ONE selection engine and its ONE
  traveling-indicator writer, shared with the dock, the toggle row and the pager. The
  indicator is ONE element on `--spring-dock`; do not stack a second indicator, do not
  hand-roll a per-segment highlight, and do not fork the writer per material — pass
  `deform`. ~~`useTabIndicator` — the active-indicator position + the
  volume-preserving squish.~~ [2026-08-08 · BK #32: struck, phantom — see the
  colocation map.]
- `useTabResponsive` — the below-breakpoint collapse to a `<Select>` (the
  `:responsive` axis). Do not re-fork the breakpoint/collapse logic in the SFC.
- `useTabRovingFocus` — the WAI-ARIA tablist/toolbar roving-tabindex machine
  (exactly one `tabindex="0"`, axis-derived arrows, Home/End, disabled-skip). Do
  not hand-roll a second keyboard handler.
- `useTabDragMorph` — the `:draggable` pull/drag-to-morph liquid-tab gesture,
  composing the shared `useDragMorph` primitive. Do not fork a second drag engine.

---

## Gates (the falsifiable contract)

- **`G-TABS-SEAM`** — the family's own seat, executable at
  `tests/gates/tabs-seam.test.ts`. Five arms, each convicting a defect rather than
  describing what shipped: `[data-active]` is the state on all four
  material×semantic combinations (a) and no styles partial may key an ARIA
  attribute as a state selector again (b); exactly ONE `.segmented-indicator` node
  per mount, with the responsive collapse carved because zero is correct there (c);
  no anchor-positioning engine survives in the tabs sheets (d); the eyeglass is
  armed once, its declared ceiling IS the measured one, and the 2:1 lead, the
  clamp, the swell and the cascade delay are all DERIVED from `eyeglass.ts` rather
  than remembered (e). Bite: restore the `::before` underline engine, key
  `aria-pressed` in a sheet, or drift `--eyeglass-span-max` from
  `EYEGLASS_SPAN_MAX` → RED.
- ~~`proof:tabs-unified` · `proof:no-god-module` · `proof:colocation`~~
  [2026-08-08 · BK #32: struck — no `proof:*` script exists in `package.json` (count
  0), and the gate roster is the 60 named seats. Of the three claims they carried:
  the unified family contract is live in `G-TABS-SEAM` above; the colocation map is
  reconciled to disk by this edit; the ≤500-line bound has NO executable anywhere in
  `tests/` and is stated here as a measurement, not a gate — SFC **419**, leaves 215
  / 172 / 135, sheets 397 / 98.]
