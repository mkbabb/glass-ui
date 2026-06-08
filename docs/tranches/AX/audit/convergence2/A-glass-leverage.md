# A-glass-leverage — Glass-first-class component-surface inventory (default glass vs opaque, the level/opaque variant axis)

**Lane** AUDIT · **Severity** major · **Defect** G1 (USER-DEFECTS-pass2 §G: "Glass should be FIRST-CLASS … Why is the DEFAULT not glass?") · **HEAD** 5cf2980 (3.8.0+W52) · **Cross-ref** W52 (liquid-glass substrate), R-glass-default.md (the SOTA companion), W36 (forced-colors opaque skin)

---

## TL;DR — what the inventory PROVES at source

The user's premise ("the default isn't glass") is **already false for the navigation + overlay bands and deliberately-correct-false for the content band** — and the source confirms it 1:1. The real, audited gaps are three, all small and token-first:

1. **The functional/overlay band is ALREADY glass-by-default at source** — popover, dropdown, select-content, dialog, sheet, tooltip, hover-card, context-menu, command, combobox-list, toast, drawer, the dock, configurator-panel ALL hardcode `glass-floating`/`glass-overlay`/`glass-drawer` with NO opaque toggle. The default IS glass where Apple-SOTA says it must be (R-glass-default §1). The gap is **discoverability/canon**, not behaviour.
2. **The CONTENT band is opaque by DESIGN, not by omission** — `Card` composes `glass-${tier}` (resting default) but cards-in-content lean to the lighter rungs; alert/table/badge/switch/separator/skeleton/toggle use flat `bg-card`/`bg-muted`/`bg-background`. This is the `no-glass-on-glass` discipline (glass.css:1-28) and is **SOTA-correct** — content stays opaque (R-glass-default §1). Do NOT regress it.
3. **The CONTROL band is the genuine asymmetry the user feels** — `buttonVariants.default` is OPAQUE (`bg-primary`) and only `glass`/`glass-wash` are glassy (button/index.ts:26,61); `Input`/`Textarea` (`.input-pill`) ARE glassy (glass.css:520-533, `--glass-bg-quiet` + `--glass-blur-wash`) but `NumberField`/`TagsInput`/`SelectTrigger`-non-dock fall to `bg-background`/`bg-transparent`. The CONTROL surface is INCONSISTENT — some atoms glass, some opaque, no governing axis.

The fix is NOT "glass everywhere" (it would re-break the legibility W52 just fixed and violate no-glass-on-glass). It is: **mint a `--glass-level` single-knob + a first-class `opaque` tier/surface variant** (Apple `.identity`, R-glass-default §2/§3), **document the two-layer law as canon**, and **resolve the control-band glass asymmetry** (buttons + form atoms) under one decision.

---

## The inventory — every ui/ + custom/ surface, its DEFAULT, its variant axis

### Band A — NAVIGATION/OVERLAY (glass-by-default, source-confirmed) — KEEP

| Component | File:line | Default surface | Variant axis | Note |
|---|---|---|---|---|
| PopoverContent | popover/PopoverContent.vue:45 | `glass-floating` | none | hardcoded glass, no opaque escape |
| DropdownMenuContent | dropdown-menu/DropdownMenuContent.vue:37 | `glass-floating` | none | |
| DropdownMenuSubContent | dropdown-menu/DropdownMenuSubContent.vue | `glass-floating` | none | |
| SelectContent | select/SelectContent.vue:50 | `glass-floating` | none | |
| DialogContent | dialog/DialogContent.vue:84-85 | `glass-floating` | `native`→`bg-background` | the ONLY overlay with an opaque branch (native `<dialog>` path) |
| Sheet (sheetVariants) | sheet/index.ts:22 | `glass-floating` | side only | |
| TooltipContent | tooltip/TooltipContent.vue:27 | `glass-floating` | none | |
| HoverCardContent | hover-card/HoverCardContent.vue:33 | `glass-floating` | none | |
| ContextMenuContent / SubContent | context-menu/*.vue | `glass-floating` (per grep) | none | |
| Command | command/Command.vue:30 | `glass-floating` | none | comment ratifies retiring flat `bg-popover` |
| ComboboxList | combobox/ComboboxList.vue | `glass-floating` | none | |
| Toast | toast/Toast.vue:55 | `glass-floating` | none | |
| Notification | notification/Notification.vue | `glass-wash` | none | |
| DrawerContent | drawer/DrawerContent.vue:35 | `glass-drawer` | mode (modal/live-behind) | own `--drawer-*` glass family |
| GlassDock (shell) | custom/dock/GlassDock.vue | own `--glass-*-dock` family | density | shell is OUT of `.glass-material` BY DESIGN (glass.css:46-50) |
| DockIconButton | custom/dock/DockIconButton.vue | `.dock-icon-button`∈`.glass-material` | tier | the dock CONTROL catch-light |
| Configurator panel | custom/configurator/Configurator.vue | `glass-floating` (+`bg-card` inner) | none | inner rows flat (no-glass-on-glass, correct) |
| HoverPopover | custom/hover-popover/HoverPopover.vue | glass | none | |
| GlassDialogNative | custom/dialog-native/GlassDialogNative.vue | glass | none | |
| GlassPanel | custom/glass-panel/GlassPanel.vue | all 5 rungs + `glass-panel` | tier prop | the explicit tier-tunable surface (W20 retire-candidate, separate) |

**Verdict:** the functional+overlay band is **already glass-first-class**. The asymmetry is only that NONE of these expose an `opaque` escape for the data-table-over-aurora legibility case (R-glass-default §3).

### Band B — CONTENT (opaque-by-design — KEEP, do NOT regress)

| Component | File | Default surface | Why opaque is correct |
|---|---|---|---|
| Card | card/Card.vue:136 | `glass-${tier}`, tier=`resting` (0.65α glass) | the protagonist plate IS glass; tier ladder = the level axis embryo |
| Card surface=cartoon | Card.vue:144 | `cartoon-surface` (opaque sticker) | decoration register, orthogonal |
| Alert | alert/Alert.vue | `bg-card` | content callout — flat by no-glass-on-glass |
| Table / DataTable | table/*.vue | `bg-muted` (header) | dense data — flat |
| Badge | badge/index.ts | `bg-primary`/`bg-secondary` | solid chip |
| Switch / Progress | switch, progress | `bg-primary`/`bg-background` | filled track |
| Separator / Skeleton | separator, skeleton | `bg-background`/`bg-muted` | flat |
| Toggle | toggle/index.ts | `bg-muted`/`bg-transparent` (+ a `glass-quiet`/`glass-card` variant exists) | mixed — has a glass variant already |
| MetricCell | custom/metric-cell | `glass-wash` (lightest glass) | speedtest tile — the W52 victim, NOW clean |
| paper-backdrop / instrument-chassis | custom | paper/chassis (own substrate) | not glass band |

**Verdict:** opaque content is the `no-glass-on-glass` discipline, SOTA-correct. The naive "make it glass" would break it. NEEDS-USER-DECISION on what "content should be glass" means (see below).

### Band C — CONTROLS (the genuine ASYMMETRY — the audited gap)

| Control | File:line | Default surface | Glassy? |
|---|---|---|---|
| Button `default` | button/index.ts:26-27 | `bg-primary` | **OPAQUE** |
| Button `outline`/`secondary` | button/index.ts:43-45 | `bg-background`/`bg-secondary` | **OPAQUE** |
| Button `glass`/`glass-wash` | button/index.ts:61-64 | `glass-wash btn-glass` | glass (opt-in) |
| Button `primary/gold-audacious` | button/index.ts:33-36 | `btn-audacious bg-primary` | opaque + specular sweep |
| Input / Textarea | glass.css:520-533 (`.input-pill`) | `--glass-bg-quiet` + `--glass-blur-wash` | **GLASS** |
| NumberField | number-field/*.vue | `bg-background` + `input-pill` | mixed |
| TagsInput | tags-input/*.vue | `bg-background`/`bg-transparent` | **OPAQUE** |
| SelectTrigger | select/SelectTrigger.vue:28-29 | dock→`bg-transparent`, else `glass-wash` | context-glass |
| ComboboxInput | combobox | `bg-transparent` (inside glass list) | flat (correct) |

**Verdict:** the CONTROL band is incoherent — `Input` is glass, `Button` default is opaque, `NumberField`/`TagsInput` opaque, `SelectTrigger` glass-only-outside-dock. This is the surface the user feels as "why isn't it glass." It is the one band where a governing variant axis is genuinely missing.

---

## Root cause (the gestalt)

There is no **glass-LEVEL axis** and no **first-class `opaque` escape**. The pieces exist but are not unified:

- The `--glass-opacity-{wash..overlay}` ladder (tokens.css:658-662, 0.30→0.95) IS the level axis — but there is no single `--glass-level` multiplier that retunes the whole ladder from one override (R-glass-default §2). A consumer who wants "more glass everywhere" or "less" has to override five tokens.
- The opaque path EXISTS but only as an a11y fallback: `@media (prefers-reduced-transparency: reduce)` maps every `--glass-opacity-*` → `1` + every `--glass-blur-*` → `none` (glass.css:732-748); `@media (prefers-contrast: more)` lifts them toward 1 (glass.css:751-758); W36 ships the forced-colors opaque skin. There is NO `tier="opaque"` / `surface="opaque"` / `.glass-opaque` a CONSUMER can pick for a design reason (a dense table over a busy aurora). Apple's `.identity` (conditional opaque) is a deliberate design choice; glass-ui only has it as an a11y reflex.
- The control band (Button default opaque vs Input glassy) was never reconciled under one decision — it grew per-component.

---

## Fix direction (GESTALT, token-first, no glass-everywhere)

**(1) Mint `--glass-level`** — ONE `@property`-registered scalar (default 1) in tokens.css §8 that the `--glass-opacity-*` ladder + the `--glass-blur-*` radii read through (`color-mix(card calc(var(--glass-opacity-resting) * var(--glass-level) * 100%) …)` clamped). One override retunes the whole system's glassiness. Reuses the EXIST­ING `color-mix(card N%, transparent)` machinery — no new recipe.

**(2) Mint a first-class `opaque` escape** — `CardTier`/`CardSurface` gains `opaque` (and a `.glass-opaque` class), routing through the SAME `--glass-opacity → 1` + `--glass-blur → none` path the reduced-transparency bracket already uses (glass.css:732-748). One opaque path, not a duplicate recipe. Apple `.identity` made deliberate. Overfitting bar cleared: content-Card + form-over-aurora + the a11y path that already needs it = ≥2 consumers.

**(3) Resolve the control-band asymmetry under ONE decision** — either promote `glass` to the Button DEFAULT (clean break per "no backwards compat"), keeping `solid`/`opaque` as the explicit escape; OR ratify that controls stay opaque-default + glass-opt-in. Reconcile `NumberField`/`TagsInput` onto `.input-pill`'s glass (Input already is) so the form-atom band is coherent. This is the user-felt core of G1.

**(4) Document the two-layer law as CANON** — append to CLAUDE.md (W52 already edits it for the gold/easing arms): "glass is the DEFAULT of the navigation+overlay bands; the content band stays opaque BY DESIGN (no-glass-on-glass); the level axis is `--glass-level` + the `opaque` escape." Closes the discoverability gap that makes G1 read as "the default isn't glass" when it already is.

---

## DEDUP verdict — net-new G-band wave (glass-first-class), AUGMENT W52's docs arm

- **W52** owns the material LOOK (gleam/blend/saturate/`--glass-specular-size`/easing/gold). It is the substrate G1 rides but does NOT own surface-DEFAULT-selection, the `--glass-level` knob, the `opaque` variant, or the control-band reconcile. → **AUGMENT W52's CLAUDE.md arm** with the two-layer-law canon (it already edits CLAUDE.md), but the variant/level/control work is NET-NEW.
- **W36** owns the forced-colors opaque skin — the `opaque` variant's a11y half. **Coordinate, don't duplicate**: the `opaque` variant reuses the same `--glass-opacity→1`/`--glass-blur→none` machinery (glass.css:732-748 + W36), it does not re-author it.
- **G2** (adaptive backdrop-luminance darkening) is a SEPARATE lane — do NOT fold here (R-glass-default §4).
- No existing wave mints `--glass-level`, the `opaque` tier/surface variant, or reconciles the control band → **NET-NEW G-band wave** (small: tokens.css + Card.vue + button/index.ts + form-atom CVAs + glass.css + the canon doc). This matches R-glass-default's "NET-NEW glass-first-class wave" recommendation and the pass-2 ledger G1 routing ("NET-NEW glass-first-class").

**needs-user-decision (RATIFY hinge):** the user's framing implies content should be glass too. SOTA + glass-ui's own `no-glass-on-glass` say NO. Surface this: confirm "glass-first-class" = *the navigation/overlay band's documented glass default + the `--glass-level` knob + an `opaque` escape + the control-band reconcile*, NOT glass on content surfaces. Recorded default if un-ratified: do NOT put glass on the content layer; ship the level-knob + opaque-variant + control reconcile + canon doc. The control-band decision (Button default glass vs opaque) is ALSO the user's call.
