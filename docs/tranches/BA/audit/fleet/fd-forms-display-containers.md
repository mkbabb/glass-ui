# BA fleet · LANE fd-forms-display-containers (frontend-design panes 2/4)

The frontend-design verdict for the **Forms**, **Display**, and **Containers** demo
categories — same bar both modes (R8 standing directive 7). Audited master @ HEAD
(v3.13.0), live-probed :5199 (DARK is the demo default register; light reverts).
Evidence pngs in `fleet/evidence/fd/`. Source root-caused to file:line.

The question per pane: do the controls/atoms/overlays feel **crafted** or **default**?
The headline answer: **the COMPONENTS are crafted; the REGISTER they render in is
default.** Every form control, display atom, and container overlay routes through the
correct glass tier and the right tokens — but two systemic register failures flatten all
three categories into "default-looking" demos, and they are NOT per-component bugs.

---

## The two register failures that flatten all three panes (read first)

### A. The dead-substrate dark register (the dominant defect — corroborates the
`dark-register` lane, scoped to my panes)

Every forms/display/containers page renders as **a flat charcoal card floating on a dead
near-black void** — zero glass atmosphere, no background, the "glass" never reads. Live
captures: `forms-inputs-dark.png`, `forms-checks-dark.png`, `display-badge-dark.png`,
`containers-dialog-dark.png` all show the same flat L10 card on the L6 page. The
`dark-register` lane root-causes the luminance collapse (page L6 / card L10, a 4-point
gap; the 5-rung ladder spans ΔL 0.003). My panes are where it BITES the user: a glass
input pill, a glass dialog, a glass popover — all collapse to opaque dark slabs because
the tier itself collapses. **NOT a forms/display/containers bug; the dark substrate
surfacing on every one of my surfaces.** I defer the token root-cause to the
`dark-register` lane and record the per-pane consequence.

### B. The achromatic dark `--primary` accent (a NEW per-component defect this lane owns)

`--primary: hsl(48 10% 90%)` in dark (`src/styles/tokens/dark-arm.css:59`) — a near-white
**achromatic cream**. Every "filled / active / selected" control state that reads
`--primary` in dark therefore paints a **flat pale-grey slab with zero chroma identity**:

- **Slider** default range fill — `color-mix(in oklab, var(--slider-range-bg, var(--primary)) 88%, transparent)` (`src/components/ui/slider/Slider.vue:200`). Live: `forms-slider-dark.png` — the "Volume" + "Balance" tracks read as bland cream bars; only the spectrum-gradient variant (which OVERRIDES `--slider-range-bg`) sings.
- **Badge** `default` — `bg-primary` (`src/components/ui/badge/index.ts:16`) → pale slab in dark (`display-badge-dark.png`).
- **Switch** checked track, **Checkbox** accent — same `--primary` cream fill.

The contrast is damning: the SAME pages carry gorgeous full-chroma vocabulary right next
to the washed-out accents — the `--section-color-0..12` ramp and `--chart-ping/download/
upload/jitter` chips (`display-card-light.png` shows the chart palette: blue/coral/amber/
purple swatches) sing, the badge `viz-basis` pills (fourier/chebyshev/legendre) sing, the
spectrum slider sings. The brand has a magnificent palette; the **default interactive
accent throws it away in dark** by resolving to achromatic cream. This is the mechanical
seed of the user's recurring "not interesting / flat / undifferentiated slab" reads on
controls. The gestalt direction: the dark accent needs a real chroma anchor (a deliberate
dark-arm `--primary` with saturation, or an accent that resolves to a brand hue in dark),
so a filled control carries identity, not a pale bar — the disco/audacious texture is
being retired (R8-18), so the accent's *color* must do the lifting the texture used to.

---

## PANE 1 — FORMS (11 stories)

**Verdict: crafted token-level engineering, default-looking render.** The controls are
genuinely well-built — `.input-pill` rides `--glass-bg-quiet` + a real 10px blur + a
15%α glass border + a `:focus-visible` accent ring + a full `:user-invalid` validity
vocabulary (`src/styles/glass/surfaces.css:176-256`); the iOS slider knob is clean; the
checkbox/radio/switch atoms are correct and on the legibility allowlist. Nothing is
broken. But every form page is flat-card-on-black (defect A), and the filled states are
achromatic (defect B). They read "default" because the register is default.

Per-page lifting moves:
- **inputs / textarea / number-field / select / combobox / multi-select** (`forms-inputs-dark.png`): the pills are correct glass — they just need (1) a real backdrop behind them to transmit (defect A) and (2) nothing pane-local. Top move: give the forms category a default atmospheric background so the glass pill reads as glass.
- **slider** (`forms-slider-dark.png`): the default track fill is the achromatic-`--primary` bland bar (defect B). Top move: anchor the default range fill on a brand chroma in dark (the spectrum variant proves the track is beautiful when it carries color). The thumb + geometry are already great.
- **checks** (`forms-checks-dark.png`): the switch ON-track and checked-box accent read pale (defect B). The atoms are otherwise crisp. Top move: chroma on the checked/on accent in dark.
- **toggle / toggle-chip**: the `default` Toggle variant is `bg-transparent`/`bg-accent`-on-press (not glass) while the `card` variant is glass — an inconsistent default. Top move: make the toggle's default register glass-first like the rest of the family.

The forms pane needs **no component rework** — it needs the dark-register lift (A) + the
accent-chroma fix (B) + an atmospheric backdrop. Then the already-crafted controls read
crafted.

## PANE 2 — DISPLAY (11 stories: buttons, card, badge, separator, section, metric family,
status-dot, pulse, stacked-icons, dark-mode-toggle)

**Verdict: the strongest pane on craft, undermined by dark-invisibility of its quiet
atoms.** `<Card>` is THE reference component — `wash/quiet/resting/floating/overlay/opaque`
tier ladder × `glass/cartoon/veil` surface decoration × specular register
(`src/components/ui/card/Card.vue`); the card story even stages a busy substrate so the
veil plate reads. Badges are colorful and crafted (the viz-basis + leading-dot rows are a
highlight). The metric family is glass-first (`MetricCell` defaults `glass-wash`). Section
is correctly pure-typography.

But the QUIET atoms vanish in dark:
- **separator / surface-tints** (`display-separator-dark.png`, which cycled onto `/foundations/surface-tints`): the **9-rung `--surface-tint-*` swatch scale is entirely invisible** — every rung is a warm-ink-over-transparent mix that, over near-black, paints near-black. The "LIGHTEST → STRONGEST TINT" labels promise a gradient that does not exist in dark. This same `--surface-tint-*` family feeds chip backplates and (formerly) input borders, so its dark-invisibility is a structural display-atom failure, not just a swatch-page cosmetic.
- **badge** (`display-badge-dark.png`): `default`/`secondary` are flat grey pills (defect B), `outline` is `text-foreground`-only (`badge/index.ts:31`) — **near-invisible** with no plate on the dark card. The colorful variants (viz-basis, leading-dot, semantic-tone) are the bright spot and the model the quiet variants should learn from.
- **buttons** (`display/buttons.vue`): carries the `btn-audacious` disco-grain/sparkle family the user is RETIRING globally (R8-18) — the showcase row is the lane's most prominent disco offender; defer the retire mechanics to the disco-hover lane but flag that the buttons display page is its shop window.

Per-page top moves: (1) make `--surface-tint-*` have a real dark arm so the hairline/chip
accents read; (2) give badge `outline` + the quiet variants a glass plate or a chroma so
they're visible on dark; (3) the card story is the model — promote its "stage the surface
over a real backdrop" pattern to every display page.

## PANE 3 — CONTAINERS / OVERLAYS (13 stories: dialog, sheet, drawer, popover,
dropdown/context-menu, hover-card, tooltip, accordion, collapsible, hover-popover,
expandable-container, command)

**Verdict: every overlay is glass-first AT THE COMPONENT — the layering/atmosphere is the
gap.** Dialog (`glass-floating`, `glass`/`opaque` variant), Sheet (`glass-floating`,
`index.ts:22`), Popover (`glass-floating`, `PopoverContent.vue:45`), Dropdown/Context/
Hover-card/Tooltip/Command all compose `glass-floating`. The base material is correct.
Two design failures keep them from feeling "glassy, layered, atmospheric":

1. **The floating tier collapses to an opaque dark slab in dark** (`glass-floating` =
   `--card`@0.88 over near-black). A modal/sheet/popover over arbitrary dark app content
   reads as a flat dark box with a faint shadow — no transmission, no layering depth. The
   `containers-dialog-dark.png` capture shows the dialog page's own confirm-card already
   reading as a flat dark slab. This is defect A in the band where glassiness matters
   MOST (an overlay is the canonical "see the blurred content behind" moment, and there's
   nothing behind it but black).
2. **No atmosphere behind the scrim.** The modal scrim dims an already-dead page, so
   opening a dialog goes from flat-black-page to flat-black-page-with-a-darker-box. There
   is no rich backdrop for the glass to refract. (The A5-1 scrim itself is correctly the
   house `color-mix(in srgb, --background N%, transparent)` per CLAUDE.md — the scrim is
   fine; the page behind it is the void.)

Inconsistencies / genuine misses owned here:
- **ExpandableContainer fullscreen is a SOLID opaque wall** — `fixed inset-0 … bg-background` (`src/components/custom/expandable-container/ExpandableContainer.vue:18`), off-allowlist. The trigger is glassy (`bg-card/70` + wash blur) but the expanded plate is a flat background-color wall — the one overlay that abandons glass entirely.
- **Surface-variant axis is inconsistent across the band.** `<Card>` has `glass·cartoon·veil`; `<Dialog>` has `glass·opaque`; `<Sheet>`/`<Drawer>`/`<Popover>`/menus have NO surface axis. The library minted `--glass-level` as ONE knob but never minted a SHARED `surface` decoration vocabulary, so "give me a veil sheet / opaque popover" is impossible. (This overlaps the `glass-variant-census` lane's structural finding 2; I corroborate from the design-feel side — the band reads inconsistent because its surface grammar is inconsistent.)
- **Sheet close-button** uses `data-[state=open]:bg-secondary` (`SheetContent.vue:119`) — an opaque secondary fill, a small off-glass note.

Per-page top moves: (1) the dark-floating-tier lift (defect A) is the single highest-
leverage move for the whole band — give `glass-floating` a luminous-dark transmissive arm
so an open overlay reads as glass-over-content; (2) put a real atmospheric backdrop behind
the overlay demos so the blur has something to refract (this is the moment the user most
wants to SEE glassiness); (3) un-wall the ExpandableContainer fullscreen onto a glass tier;
(4) mint the shared `surface` axis so the band speaks one grammar.

---

## The lane's three lifting moves (ranked, gestalt — no implementation)

1. **Lift the dark register out of the void (shared with `dark-register` lane).** Widen
   the page↔plate luminance gap and make the dark glass transmissive, so the already-
   correct forms pills / display atoms / container overlays read as glass instead of
   collapsing to charcoal slabs. This single fix raises the perceived craft of all three
   panes at once. Token-family edit at the cascade root, never per-component.

2. **Give the dark interactive accent a chroma identity (this lane owns it).** Re-anchor
   the dark `--primary` (or the filled-state accent it feeds) off achromatic cream onto a
   real brand hue, so a filled slider / checked switch / default badge carries color
   identity in dark — the palette the brand already owns (section-color ramp, chart/viz
   palette) is right there; the accent just has to USE it. Critical now that the
   disco/audacious texture is retiring (R8-18) — color must carry the interest texture
   used to fake.

3. **Default every page to an atmospheric backdrop (shared with `dark-register` / page-
   backgrounds lanes).** ZERO forms/display/containers stories declare a background
   (verified: the 22 manifest `background:` rows all fall in other categories); they fall
   through to the dead page. Promote the StoryHero substrate from opt-in to a per-category
   default so the glass has something to transmit — this is the other half of fix 1 for
   the container overlays especially (the blurred-content-behind moment).

## Evidence (beside this report, `fleet/evidence/fd/`)

- `forms-inputs-dark.png` — glass input pills as flat dark slabs on the dead page.
- `forms-checks-dark.png` — checkbox/radio/switch; pale achromatic on-state.
- `forms-slider-dark.png` — the achromatic default fill vs the singing spectrum gradient.
- `display-badge-dark.png` — colorful viz/dot variants vs flat default/secondary/invisible-outline.
- `display-separator-dark.png` (cycled → surface-tints) — the 9-rung tint scale INVISIBLE in dark.
- `display-card-light.png` (cycled → chart-chassis) — the full-chroma chart palette the accents should be using.
- `containers-dialog-dark.png` — the dialog page card as a flat dark slab; the confirm-card off-glass.
- (live route-cycling on :5199 from an external `]`-key driver forced goto+immediate-capture; multi-step open-overlay captures were not reliably obtainable — overlay glassiness is source-root-caused + corroborated by the existing `glass-variant-census` / `dark-register` / `toast-glass` fleet captures.)
