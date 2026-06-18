# BC FEATURE-BAND research — component customizability + golden-defaults audit

> Assignment (component-customizability): audit the CUSTOMIZATION SURFACE of the 42 `ui/` + 42
> `custom/` components against the user's bar — *"ensure ALL of our components are fully
> customizable with reasonable, pragmatic, GOLDEN (like our golden typography) defaults that
> afford design hierarchy."* For each family: does it expose the right knobs (props for
> variant/size/tier/tone; CSS custom-property TOKENS for a consumer `:root` override; SLOTS for
> content) WITH golden defaults that afford HIERARCHY out-of-the-box? Token-first; do NOT over-prop
> (a token beats a prop where a `:root` override suffices).
>
> TRANCHE-DEV ONLY. Every finding grounded (file:line / measured value / cited research).
> Full corpus persisted at `docs/tranches/BC/research/feat/component-customizability.md`.

---

## 0 — The binding bar: "fully customizable with golden defaults that afford hierarchy"

A component meets the bar iff: **Props** = semantic per-instance choices (variant/size/tier/tone),
typed + published on `@mkbabb/glass-ui/api` (`src/api/index.ts:146-158`); **Tokens** = visual
magnitudes (padding/blur/glyph/alpha/hue/duration) as CSS custom properties a consumer retunes from
ONE `:root` override — **a token beats a prop** where a `:root` override suffices (the user's
explicit instruction + the `--focus-ring-shadow` token-first divergence, AW.W26); **Slots** =
content insertion; **Golden defaults afford HIERARCHY** = a bare component reads as a proportioned
√φ/glass/warm-cream design AND the size/tier rungs let a consumer EXPRESS hierarchy (a primary CTA
bigger/glassier than a secondary) out-of-the-box, no per-site hand-tuning.

**This is a NEW band.** Verified: `grep -ril "customiz\|golden default\|fully customizable"
docs/tranches/BC/waves/` → 0 hits. `BC.W-DESHADCN` abrogates the shadcn-NEUTRAL token vocabulary;
CLEANUP-PLAN audits colocation/idioms; NEITHER audits the customization-surface coverage or the
golden-default hierarchy-affordance. This band EXTENDS, does not duplicate.

---

## 1 — The gold-standard exemplars (the bar is set INSIDE the library)

- **Card (`ui/card/Card.vue`) — GOLD.** 7 `tier` rungs (`:35-42`), `surface` glass/cartoon/veil
  (`:61`), `specular` off/subtle/full (`:77`), `pressable`/`shadow`/`grain`/`grid` (`:103-124`);
  the GOLDEN sqrt-φ/φ/φ² padding ladder minted on the root (`:245`: `--card-pad-inline` anchor →
  `--card-pad-block`=`calc(*1.272)`, `--card-pad-footer`=`÷1.618`, `--card-pad-title-gap`=`÷2.618`);
  default `tier:"resting" surface:"glass"` reads as the canonical warm-cream glass plate. The
  template for the whole bar.
- **Button (`ui/button/index.ts`) — GOLD.** 13 variants (`:30-100`) + 6 size rungs (`:101-116`)
  reading the `--control-h-{xs,sm,md,lg}` cohort + `--control-text`/`--ui-glyph` comfort axis
  (`:110-115`) — the control hierarchy-affordance template.
- **GlassDock (`dock/composables/useDockShellProps.ts:28-165`) — GOLD.** 12 axes.
- **Dialog/Popover (`dialog/DialogContent.vue`, `popover/PopoverContent.vue`)** — `surface` axis +
  φ overlay-pad ladder (`--overlay-pad-inline/-block`); Dialog adds spring/showClose/scrimAnimation.
- **SegmentedTabs / Badge / IconChip / ColorSwatch** — strong customization surfaces.

The pattern: small semantic-prop surface + visual magnitudes on tokens (the φ ladders, the
`--control-*`/`--glass-*` cohorts) + golden no-prop defaults. The findings are the DELTA from this.

---

## 2 — The measured distribution (the gap is COVERAGE, not infrastructure)

Customization-axis props per `ui/` component (`grep`, 2026-06-18): **21 of 42 dirs have ZERO**
size/variant/tier/surface/density/tone axis (the bolded need one): accordion, checkbox, collapsible,
combobox, context-menu, data-table, **dropdown-menu**, focus-scope, hover-card, **input**, label,
multi-select, notification, **number-field**, radio-group, separator, **switch**, table, tags-input,
**tooltip**. The √φ type ladder is FULLY built (`typography/scale.css:120-145`: caption→audacious,
all φ-derived) but ~31 `ui/` files hardcode bare `text-sm` instead of reading `--type-*`/
`--control-text` (`input/Input.vue:81`, `tooltip/TooltipContent.vue:27`, `dialog/DialogDescription.vue:20`,
`toast/ToastTitle.vue:21`, …). The infrastructure exists; the components don't consume it uniformly.

---

## 3 — Per-family verdicts (grounded)

- **Input (`input/Input.vue:81`) — GAP.** No size/tier axis (Button has `--control-h-*`; Input has
  one fixed height); `text-sm` hardcoded not `--control-text`. Well IS token-first
  (`--control-surface-bg`/`--input-on-glass`). Missing: the size rung that affords input hierarchy.
- **Switch (`switch/Switch.vue:36-42`) — GAP.** `h-6 w-11` hardcoded, NO size axis; thumb
  `bg-background ring-0` (de-shadcn's); checked `bg-primary` (golden but un-retunable).
- **NumberFieldInput (`number-field/NumberFieldInput.vue:37`) / Textarea (`textarea/Textarea.vue:73`)
  — PARTIAL.** Read `--control-h-md` / `autosize` (good) but pin to one size, `text-sm` hardcoded.
- **The overlay consistency GAP.** dialog/popover/sheet/drawer/toast have the `surface` axis + the φ
  `--overlay-pad-*` ladder; **dropdown-menu/select/tooltip/context-menu/command/hover-card do NOT**
  (`dropdown-menu/DropdownMenuContent.vue`: raw `min-w-32 max-h-[60vh]`, no surface; `select/SelectContent.vue:60-69`:
  raw `min-w-32`+`p-1`; `tooltip/TooltipContent.vue:27`: raw `px-3 py-1.5 text-sm`). Threading the
  EXISTING register fixes it — zero new register.
- **SearchBar (`custom/search/SearchBar.vue`) — MAJOR GAP.** Bare: only modelValue/placeholder/icon/
  tag, NO size/surface/tier; icon hardcoded `w-3.5 h-3.5 text-muted-foreground` (`:5`).
- **FuzzySearch (`custom/search/FuzzySearch.vue`) — MAJOR GAP.** Hardcoded `h-3.5 w-3.5`/`!h-6 !w-6`/
  `!max-w-[36rem] !top-[12vh]`/`text-[0.6rem]` everywhere; `bg-muted/50` selected (`:137,:163` —
  shadcn-neutral, not `.glass-menu-row`); the `!important`-fighting-CVA cluster (`:111`) = a missing
  `variant="bare"` rung; `DialogContent surface="opaque"` (`:147`) — the search modal is opaque, not
  glass. **The central surface for the user's "DOCK as native dynamic-search-bar" ask — needs a
  first-principles customization surface. Highest-value finding.**
- **StoryHero (`demo/stories/StoryHero.vue`) — STARVED hierarchy.** Hero `<h1>` hardcoded
  `text-display-3` (~68px) / `-4` (86px); the mega/hero/audacious tiers (177/287/352px) STARVED
  (`awwwards-herostudios.md:103-123` proposes the `heroScale` prop — the ladder-exists-component-
  starves-it pattern). Owned by `BC.W-HERO-AUDACIOUS`; this band generalizes the principle.
- **SegmentedTabs — STRONG, one gap.** variant/orientation/responsive/draggable + option
  descriptors golden; missing a `size`/density axis + `tier` for the track.
- **Toggle (`toggle/index.ts`) — PARTIAL.** Good variant/size surface; default paint carries
  shadcn-neutral `hover:bg-muted`/`outline: border-input` (de-shadcn's, not this band's).
- **IconChip / ColorSwatch / Badge — GOLD/GOOD.** Rich axes (IconChip types.ts:22-85;
  ColorSwatch size+showHex; Badge 7 variants + 3 comfort-axis size rungs).

---

## 4 — The six recurring golden-default gap classes (all fixable by THREADING existing registers)

1. **No shared control `size` axis on the input register** (Input/Switch/Textarea/Tooltip) though
   the `--control-h-*`/`--control-text` cohort exists (`tokens/sizing.css:64-86`) + Button/Badge/
   NumberField read it. Fix: thread `size?: "sm"|"default"|"lg"` reading the existing cohort.
2. **Overlay golden defaults non-uniform** — thread the EXISTING `surface` axis
   (`_shared/useSurfaceAxis.ts:36`) + the φ `--overlay-pad-*` ladder onto dropdown/select/tooltip/
   context-menu/command/hover-card.
3. **~31 hardcoded `text-sm` off the √φ ladder** — route description/title/tooltip/input type onto
   `--type-*`/`--control-text` tokens; add size axis where a rung is wanted.
4. **Hardcoded glyph/button px literals in compound components** — token-back SearchBar/FuzzySearch
   sizes (`--search-icon-size`, `--search-result-text`) + the Select chevron `opacity-50`.
5. **The audacious type ladder starved by hardcoded rungs** — expose the type rung as a tunable
   axis (`heroScale`) with a golden per-variant default (coordinates with BC.W-HERO-AUDACIOUS).
6. **`!important`-fighting-CVA = a missing variant rung** (FuzzySearch `:111`) — add the variant,
   delete the `!important` escape (CLEANUP-PLAN A6 recorded with no owner; this band names the fix).

---

## 5 — The binding "fully customizable with golden defaults" BAR (the gate shape)

`proof:customizability-census` (the de-shadcn / `proof:dock-normalize` W5-closure precedent): a
per-component census (`docs/tranches/BC/audit/W-CUSTOMIZABILITY-census.md`) EXACTLY-ONE-LIST per
published component {gold | gap+named-missing-axis | token-only-correct}; anti-smuggle floor. Teeth:
**C1** no hardcoded control type/height off the `--control-*` cohort (born-RED on Input/Switch/
Textarea); **C2** overlay golden uniformity — every floating overlay threads `surface` + φ
`--overlay-pad-*` (born-RED on dropdown/select/tooltip/context-menu/command/hover-card); **C3** no
fork-forced px literal in a compound component (born-RED on SearchBar/FuzzySearch); **C4** audacious-
type-not-starved (coordinates with BC.W-HERO-AUDACIOUS). + π readback `tests-visual/
customizability.spec.ts` (both modes): bare = golden default; a size/tier/surface override visibly
retunes; a `:root` token override cascades into the magnitude.

**DON'T-over-prop fences (binding):** a TOKEN beats a prop where a `:root` override suffices
(magnitudes → tokens; semantic per-instance choices → props). No contrivance (a size axis ONLY where
control-size hierarchy is real — input register yes, Separator no). DRY: thread the EXISTING register
(`--control-*` cohort, `surface` axis, φ overlay-pad ladder, √φ type ladder — all ≥2 consumers),
introduce ZERO new register (the de-shadcn KISS discipline).

---

## 6 — Coordination (no duplication)

`BC.W-DESHADCN` = shadcn-NEUTRAL token abrogation (disjoint: "is the default paint ours?" vs this
band's "can a consumer express hierarchy via the right knobs?"). `BC.W-HERO-AUDACIOUS` = StoryHero
heroScale (this band reinforces + generalizes to C4). `BC.W-DROPDOWN-FIX` = dropdown behavioral fix
(this band adds its missing surface/φ-pad axis — coordinate). `BC.W-PAGE-HIERARCHY` = demo
dogfooding (component-side here). CLEANUP-PLAN A6 = FuzzySearch !important (this band names the fix).