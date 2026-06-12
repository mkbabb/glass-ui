# BA fleet · LANE glass-variant-census (R8-12 — THE BINDING component × variant matrix)

Audited master @ HEAD (v3.13.0), live-probed :5199 (light + dark). The R8-12 mandate:
"ALL of our components should be glassy by default and be consistent in their variants…
They should have glass, veil, etc variants." This is the exhaustive matrix.

## Method

- (a) DEFAULT SURFACE read from each component's base class / CVA base / SFC root.
- (b) VARIANT AXIS read from the CVA `variant` set / `surface` prop / `tier` prop.
- (c) GAP scored against the target: glassy-by-default + a CONSISTENT {glass, veil, opaque}
  decoration axis.
- The sanctioned legibility allowlist (`scripts/proof-glass-cohesion.mjs:83`):
  `avatar · label · separator · skeleton · table · data-table · badge · checkbox · radio-group`.
  Anything else opaque off-allowlist is flagged.

## Live π readback (dark mode, the binding proof of the toned-clobber defect)

Constructed `glass-floating` elements, read computed style under `.dark` on :5199:

| element | resolved `background` | translucent? |
|---|---|---|
| `glass-floating` (default Toast/Notification base) | `oklab(0.385 … / 0.84)` + `backdrop blur(16px)` | YES — glass reads |
| `glass-floating` + `bg-success` arm | `oklch(0.805 0.186 151.6)` — **no alpha** | NO — fully OPAQUE |
| `glass-floating` + `bg-destructive` arm | `rgb(235, 71, 71)` — **no alpha** | NO — fully OPAQUE |

The glass base is intact; the SEMANTIC-TONE variant arm overwrites `background` with a fully
opaque saturated plate. The backdrop-filter still applies but blurs nothing visible behind a
100%-opaque plate. This is the mechanical root of R8-12 ("toasters not glassy") and R8-13
("green deploy Notification not glassy at all").

---

## THE MATRIX — ui/ band (41 packages)

Legend: ✅ = glass-by-default & axis-consistent · ⚠️ = glass base CLOBBERED by a variant arm ·
🟥 = opaque off-allowlist · 🟢 = sanctioned-allowlist opaque (correct).

| Component | (a) default surface | (b) variant axis | (c) gap |
|---|---|---|---|
| **Button** | `glass-wash` + `btn-glass` (real blur) — `default` IS glass | `default`(glass)·`glass`·`glass-wash`·`solid`(opaque escape)·`destructive`·`outline`·`secondary`·`accent`·`ghost`·`ai`·`link`·`primary-audacious`·`gold-audacious` | ⚠️ default glass ✅, BUT `destructive`/`secondary`/`accent`/`ai`/`solid` are flat opaque fills with NO glass tone-variant. No `veil`. The 13-variant set is the richest in the lib but is NOT a clean {glass,veil,opaque}×{tone} grid — it's an ad-hoc list. `primary/gold-audacious` carry the R8-18 disco-grain (`btn-audacious`) to be RETIRED. |
| **Card** | `glass-resting` (tier prop) | `tier`: wash·quiet·resting·floating·overlay·opaque + `surface`: **glass·cartoon·veil** | ✅ THE REFERENCE — the ONLY component with a real {glass,veil} + opaque(tier) axis. R8-11 wants the demos staged over aurora; the component itself is correct. |
| **Dialog** (Content) | `glass-floating` | `variant`: `glass`·`opaque` | ⚠️ glass ✅ but axis is binary (no `veil`); fine for a modal. self-engages bright-bucket. |
| **Sheet** (Content) | `glass-floating` (sheetVariants base) | `side` only — NO surface variant | ⚠️ glass ✅ but exposes NO glass/opaque/veil axis (Dialog has one, Sheet doesn't — INCONSISTENT sibling). |
| **Drawer** (Content) | `glass-drawer` (own glass recipe, drawer.css) | `mode`: modal·live-behind (behavior, not surface) | ⚠️ glass ✅ but no surface variant axis; `glass-drawer` is a parallel recipe not on the 5-rung ladder. |
| **Popover** (Content) | `glass-floating` | none | ✅ glass by default; no axis (acceptable for a popover, but inconsistent w/ Card). |
| **DropdownMenu** (Content) | `glass-floating` | none | ✅ glass by default. |
| **ContextMenu** (Content) | `glass-floating` | none | ✅ glass by default. |
| **HoverCard** (Content) | `glass-floating` | none | ✅ glass by default. |
| **Tooltip** (Content) | `glass-floating` | none | ✅ glass by default. |
| **Select** (Content) | `glass-floating`; trigger `glass-wash`/`ghost` | trigger: `default`(glass)·`ghost` | ✅ content+trigger glass. |
| **Combobox** (List) | `glass-floating` | none | ✅ glass by default. |
| **Command** | `glass-floating` | none | ✅ glass by default (the flat `bg-popover` was retired). |
| **MultiSelect** | content rides `PopoverContent` = `glass-floating` | none | ✅ glass by default (inherits Popover). |
| **Toast** | `glass-floating` base | `variant`: default·success·warning·info·destructive | 🟥 **DEFECT (R8-12).** Toned arms add `bg-success`/`bg-warning`/`bg-info`/`bg-destructive` — fully OPAQUE plates clobbering the glass. Only `default` reads glass. Toast.vue:57-61. |
| **Notification** | `glass-floating` base | type: success·error·warning·info (object map) | 🟥 **DEFECT (R8-13).** `notificationClasses` adds `bg-success/90`·`bg-destructive/90`·`bg-warning/90`·`bg-info/90` over the glass — opaque toned slabs. Notification.vue:57-62. |
| **Alert** | `bg-(--glass-bg-wash)` + blur (glass-wash inline) | `variant`: default·destructive·success·warning·info | ✅ THE CORRECT MODEL — every tone keeps the glass-wash plate and rides the TONE on border/glyph/desc, never an opaque fill. The pattern Toast/Notification should adopt. |
| **Badge** | opaque `bg-primary`/tone plates | `variant`: default·secondary·destructive·outline·success·warning·info | 🟢 SANCTIONED (loud-pill register on allowlist). No change owed. |
| **Progress** | `bg-[var(--progress-track,--secondary)]` rail + `--progress-fill` indicator | `variant`: default·gradient | 🟥 not glass (token-tinted opaque rail). Off-allowlist but a thin meter rail — glass would be sub-perceptual. The R8-14 "sectioned" defect is a SEPARATE demo-side issue (hard per-segment cells), not this matrix. Candidate: a glass-rail register. |
| **Tabs (ui)** / **SegmentedTabs (custom)** | indicator `bg-(--glass-bg-quiet)` + blur (`surface` prop gates the plate) | underline·segmented·pill; `surface` bool on indicator | ✅ glass indicator by default; dock-rail opts the plate off (`surface=false`). |
| **Accordion** | transparent (border-b only) | none | ✅ structural — no plate, correctly flat. |
| **Switch** | `glass-wash` + specular track | checked: `bg-primary` | ✅ glass unchecked (ARM A, 24×44 earns glass). |
| **Checkbox** | opaque `color-mix(primary, glass-floating)` | indeterminate state | 🟢 SANCTIONED (16px atom on allowlist). |
| **RadioGroup** | opaque | state | 🟢 SANCTIONED (allowlist). |
| **Input / Textarea / NumberField / TagsInput** | `.input-pill` (glass quiet + 10px blur) | invalid state | ✅ glass-first (AX.W54). |
| **Toggle** | CVA: default·outline·**card**(glass-card) | `variant`: default·outline·card | ⚠️ `card` variant is glass; `default` is `bg-transparent`/`bg-accent`-on-press (not glass). |
| **ToggleGroup** | inherits Toggle | — | ⚠️ as Toggle. |
| **Avatar / Label / Separator / Skeleton / Table / DataTable** | opaque/transparent | — | 🟢 SANCTIONED (allowlist). |
| **MetricPill / Slider / NumberField subparts / Carousel** | (slider track glass; carousel structural) | — | ✅/structural. |

## THE MATRIX — custom/ band (selected, surface-bearing)

| Component | (a) default surface | (b) variant axis | (c) gap |
|---|---|---|---|
| **GlassPanel** | `glass-resting` (tier prop, full 5-rung) | tier: wash·quiet·resting·floating·overlay | ✅ glass-first; tier axis but NO `surface`(veil/cartoon) axis like Card. |
| **GlassDock** | `.glass-dock` (glass-bg-dock tier + adaptive luma) | orientation only | ✅ glass-first (self-engage + sampled-luminance). |
| **MetricCell** | `glass-wash` | register: dashboard·compact·bare | ✅ glass-first. |
| **MetricStack/Row, MetricBadge, StatusDot, Pulse, Timeline, ScrollingText, LabeledField, IconTooltip** | structural / inherit host | — | ✅ no own opaque plate (transparent — paint on the host glass). |
| **ExpandableContainer** | trigger `bg-card/70` + blur (glass-ish); EXPANDED overlay `bg-background` | none | 🟥 the FULLSCREEN expanded state is `fixed inset-0 bg-background` — opaque off-allowlist (ExpandableContainer.vue:20). The trigger is glassy; the expanded plate is a solid wall. |
| **Configurator / ConfiguratorLayer / ConfiguratorRow** | composes Card/glass tiers | density | ✅ glass via Card. (R8-4 occlusion is a layout/divider defect, separate lane.) |
| **InstrumentChassis** | own bezel recipe (glass-spine tier) | phase | ✅ glass material. |
| **PaperBackdrop / Aurora / GooBlob / Constellation / FourierField / WatercolorDot** | substrate backgrounds (not surfaces) | — | N/A (procedural substrate, not a glass plate). |
| **ToggleChip** | inherits toggle recipe | — | ⚠️ as Toggle. |
| **HeaderRibbon / glass-panel** | glass tiers | — | ✅. |

---

## THE THREE STRUCTURAL FINDINGS

1. **Tone-variant clobber (the R8-12/13 headline).** Toast + Notification compose a glass base
   then OVERWRITE it with opaque `bg-{success,destructive,warning,info}` plates. The cohesion
   gate (`proof:glass-cohesion`) is DEFINITION-LEVEL — it verifies the BASE routes through a
   glass tier but does NOT detect a variant ARM clobbering it. Alert is the correct model:
   tone on border/glyph/desc, glass plate preserved. The gestalt remedy: tone rides ON the
   glass (a `color-mix(tone N%, transparent)` tint + toned border/glyph), never a solid fill;
   extend the cohesion gate to scan variant arms, not just the base.

2. **No consistent {glass, veil, opaque} variant axis (the R8-12 "consistent in their
   variants").** Only `<Card>` exposes a true `surface: glass·cartoon·veil` axis. `veil` exists
   in EXACTLY ONE place (Card.vue). Dialog has `glass·opaque`; Sheet/Drawer/Popover/etc. have
   NO surface axis at all. The library has the MATERIAL (the 5-rung ladder + `.glass-opaque` +
   `veil-surface` utility) but has NOT minted a SHARED surface-variant vocabulary the way it
   minted `--glass-level`. The gestalt: a single `surface` decoration axis (glass default ·
   veil · opaque) factored to a shared mixin/prop, adopted uniformly across the content +
   floating + feedback bands — so `<Toast surface="veil">`, `<Sheet surface="opaque">` etc. all
   speak one grammar.

3. **Two off-allowlist opaque plates** (not tone-clobber, structural):
   `ExpandableContainer` fullscreen `bg-background` and `Progress` rail. The Progress rail is
   defensibly thin; the ExpandableContainer fullscreen wall is a genuine miss.
