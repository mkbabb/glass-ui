# SegmentedTabs — the unified spring-slider tab family

`<SegmentedTabs>` is glass-ui's ONE tab/toggle-strip primitive: a single
component with a three-value `variant` axis and ONE shared elastic indicator. It
subsumed the former `BouncyToggle` / `BouncyTabs` / `UnderlineTabs` /
`ResponsiveTabs` quartet (a clean break, no alias). This README is the SOURCE OF
TRUTH for the variant axis, the indicator mechanism, the ARIA-role-per-variant
contract, and the colocation map — so a consumer reaches for the right variant
and does not re-invent the indicator.

All tabs surfaces reach consumers via `@mkbabb/glass-ui/tabs`.

---

## The variant axis

ONE component, a three-value `variant` axis:

- **`segmented`** (DEFAULT) — the iOS segmented control: a glass-plated strip
  with the active segment lifted by a gliding indicator plate.
- **`pill`** — a rounded-pill strip register.
- **`underline`** — panel-navigation tabs with an underline indicator.

`:multi-select` (segmented / pill only) drives N simultaneously-pressed segments
off the same engine — the ToggleGroup-shaped surface. `:responsive` (`true` or
`{ breakpoint, desktopOptions, ariaLabel, triggerClass }`) collapses the strip to
a `<Select>` below the breakpoint.

### ARIA-role-per-variant (load-bearing)

The role is keyed to the SEMANTIC, not the look:

- `underline` is **panel navigation** — `role="tablist"` / `role="tab"` +
  `aria-selected`. Exactly one tab active; each reveals a distinct panel.
- `segmented` / `pill` are the **ToggleGroup-shaped surface** — `role="group"` +
  `aria-pressed`. No panel swap; the toggles flip state on a shared view.

Reach for `underline` for mutually-exclusive PANEL navigation; reach for
`segmented` / `pill` (or `:multi-select`) for independent-or-single-select
TOGGLES that mutate one surface. (See `CLAUDE.md` §Tabs vs ToggleGroup.)

---

## The indicator mechanism

The active indicator GLIDES on `--spring-snappy` (the confirmed iOS segmented
register) AND SQUISHES on travel: a volume-preserving stretch along its travel
axis (`scale: var(--stretch) calc(1 / var(--stretch))` — the X/Y reciprocal
pairing), capped LOW by `--tab-indicator-max-stretch` (default `1.11`, ≈ +11% —
BD.W-TABS-LIQUID re-tuned it DOWN once the `--tab-blob` area-inflation channel took
over the 5-beat "grow"/overshoot; the FENCE is the COMPOSED bbox area `blob × stretch`
≤ ~1.14, not the bare per-axis scalar), released back to fit on the same snappy
clock (the Material-3 elastic / Apple Liquid-Glass "grow then shrink" register).

The squish is owned by the `useTabIndicator` composable (`composables/`): it
writes a transient `--stretch` scalar to the indicator's own custom property; the
SFC's scoped CSS pairs it reciprocally. The squish is INDEPENDENT of the position
path — the elastic warp lands on all three variants. It is
`prefers-reduced-motion`-gated (no deform under reduce).

---

## Colocation map

The feature-dir convention (see `docs/precepts/design-idioms.md` §7 + the
`CLAUDE.md` §Structure colocation convention):

```
src/components/custom/tabs/
├── SegmentedTabs.vue          # the single component shell (variant axis + responsive collapse)
├── constants.ts               # the elastic-indicator travel-squish magic-number home
├── composables/
│   ├── useTabIndicator.ts     # the gliding + squishing elastic-indicator engine
│   ├── useTabResponsive.ts    # the below-breakpoint collapse-to-<Select> resolver
│   ├── useTabRovingFocus.ts   # the WAI-ARIA roving-tabindex keyboard machine
│   └── useTabDragMorph.ts     # the pull/drag-to-morph liquid-tab gesture (useDragMorph)
└── index.ts                   # the package barrel
```

The SFC is the carved shell (BG.W-COLOCATE / WS4 ratchet-drain #13): the
responsive-collapse and roving-focus concerns were carved out of the component
into their colocated `composables/` leaves, which the SFC IMPORTS back — it does
not inline them (`proof:colocation` §B2.4b verifies each leaf exists, exports its
symbol, and is composed by the SFC).

The indicator's visual axes (`--tab-indicator-max-stretch`, the spring register)
are tokens (`tokens.css`); a consumer retunes the squish cap by overriding the
token, no library edit.

---

## Composables (do not re-invent)

- `useTabIndicator` — the active-indicator position + the volume-preserving
  squish. The indicator is ONE element on `--spring-snappy`; do not stack a
  second indicator or hand-roll a per-segment highlight.
- `useTabResponsive` — the below-breakpoint collapse to a `<Select>` (the
  `:responsive` axis). Do not re-fork the breakpoint/collapse logic in the SFC.
- `useTabRovingFocus` — the WAI-ARIA tablist/toolbar roving-tabindex machine
  (exactly one `tabindex="0"`, axis-derived arrows, Home/End, disabled-skip). Do
  not hand-roll a second keyboard handler.
- `useTabDragMorph` — the `:draggable` pull/drag-to-morph liquid-tab gesture,
  composing the shared `useDragMorph` primitive. Do not fork a second drag engine.

---

## Gates (the falsifiable contract)

- `proof:tabs-unified` — the unified family contract: ONE component, the
  three-value variant axis, the ARIA-role-per-variant, and the single elastic
  indicator. Bite: re-introduce a `Bouncy*` alias or a second indicator → RED.
- `proof:no-god-module` — `SegmentedTabs.vue` is under the 500-line bound (the
  BG.W-COLOCATE carve landed: the responsive + roving-focus concerns moved to
  colocated leaves); the SFC + each composable stay under the bound.
- `proof:colocation` — the feature-dir convention (composables under
  `composables/`, a `constants.ts` home, the README present) + the §B2.4b
  leaf-verify clause (each carved leaf exists, exports its symbol, and is
  composed by the SFC; the colocation map above stays reconciled to disk).
