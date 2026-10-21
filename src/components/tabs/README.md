# SegmentedTabs — the unified spring-slider tab family

`<SegmentedTabs>` is glass-ui's ONE tab/toggle-strip primitive: a single
component with a two-value material axis, an independent semantic axis, and ONE
shared gliding indicator. It subsumed the former `BouncyToggle` / `BouncyTabs` /
`UnderlineTabs` / `ResponsiveTabs` quartet (a clean break, no alias). This README
is the SOURCE OF TRUTH for the material/semantic axes, the indicator mechanism,
the ARIA contract, and the colocation map — so a consumer reaches for the right
shape and does not re-invent the indicator.

All tabs surfaces reach consumers via `@mkbabb/glass-ui/tabs`.

---

## Material and semantics

ONE component, two materials:

- **`pill`** (DEFAULT) — the iOS segmented control: a glass track whose selected
  segment is a glass capsule.
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

ONE indicator engine, ONE indicator NODE. Both materials measure through the same
JS writer, so there is no engine branch and no second element to keep in sync.

A selection answers a click, so the motion shows which tab is now selected and
nothing else. One object moves, the indicator. It glides straight to its new tab and
stops; everything else changes state without moving.

| Channel | Behaviour |
|---|---|
| Indicator position and size | `translate` and `width` (`height` on the vertical axis) on `--spring-dock` over `--tab-indicator-duration` (zero overshoot). Its `scale` is 1 on every frame. |
| Indicator paint | One rest paint in both themes, never transitioned: the capsule rim over the inset recess. |
| Track | Static. Its background never changes. |
| Labels | The leaving label fades to the muted ink and the arriving label to `--foreground` on `--duration-fast` with `--ease-standard` and no delay. |
| Hover (inactive tab) | Colour only: the label moves toward `--foreground` by `--hover-ink-mix` (45%). No scale, no lift. |
| Press | No squish. The indicator starting to move is the acknowledgement. |
| Focus | The house focus ring, instant. |
| Reduced motion | The indicator snaps in one frame; the label colour fade stays. |
| Phone (`:responsive`) | The `<Select>` form, unchanged. |

The writer is `useSelectionIndicator`, the library's ONE traveling-indicator writer,
reached through `useSelectionGroup`. It writes geometry only; nothing in the engine
deforms the indicator.

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
│   ├── segmented.css          # the material grammar, the glide and the rest paint
│   └── drag.css               # the liquid-tab drag affordance + travel occlusion
└── index.ts                   # the package barrel
```

~~`constants.ts` — the elastic-indicator travel-squish magic-number home;
`composables/useTabIndicator.ts` — the gliding + squishing elastic-indicator
engine.~~ [2026-08-08 · BK #32: both struck from the map — NEITHER FILE EXISTS, and
neither did when the map was written. The engine is the library-wide
`useSelectionIndicator`, not a tabs-local leaf. The `styles/` pair was on disk and
absent from the map, so the map understated the dir in both directions.]

The SFC is the carved shell: the responsive-collapse, roving-focus and drag concerns
live in their colocated `composables/` leaves, which the SFC IMPORTS back — it does
not inline them.

The indicator's clock (`--tab-indicator-duration`, the spring register) and the hover
weight (`--hover-ink-mix`) are tokens (`styles/tokens/`, reached through
`styles/tokens.css`); a consumer retunes them by overriding the token, no library
edit. A consumer row that wants the same colour-only hover writes
`color: color-mix(in oklab, var(--muted-foreground), var(--foreground) var(--hover-ink-mix))`.

---

## Composables (do not re-invent)

- `useSelectionGroup` / `useSelectionIndicator`
  (`src/composables/motion/morph/`) — the library's ONE selection engine and its ONE
  traveling-indicator writer, shared with the dock, the toggle row and the pager. The
  indicator is ONE element on `--spring-dock`; do not stack a second indicator, do not
  hand-roll a per-segment highlight, and do not fork the writer per material. ~~`useTabIndicator` — the active-indicator position + the
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
  no anchor-positioning engine survives in the tabs sheets (d); the glide carries no
  deform, press scale, capsule hover, label delay or wake (e). Bite: restore the
  `::before` underline engine, key `aria-pressed` in a sheet, or put a `scale` leg
  back on the indicator transition → RED. The motion itself is sampled per frame in
  a browser by `tests-visual/SegmentedTabs.glide.spec.ts`.
- ~~`proof:tabs-unified` · `proof:no-god-module` · `proof:colocation`~~
  [2026-08-08 · BK #32: struck — no `proof:*` script exists in `package.json` (count
  0), and the gate roster is the 60 named seats. Of the three claims they carried:
  the unified family contract is live in `G-TABS-SEAM` above; the colocation map is
  reconciled to disk by this edit; the ≤500-line bound has NO executable anywhere in
  `tests/` and is stated here as a measurement, not a gate — SFC **419**, leaves 215
  / 172 / 135, sheets 397 / 98.]
