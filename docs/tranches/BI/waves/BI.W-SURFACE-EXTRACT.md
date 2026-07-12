# BI.W-SURFACE-EXTRACT — the `<Surface>` primitive + the decorationClass fan-out

Band B2 (glass taxonomy). Design: D-GLASS GLASS-A (PASS-1 §2/§3, PASS-4B glass proto CLOSED).
Chassis wave — W-CLEAR-FOLD, W-GLASS-TOKEN-PRUNE, W-GLASS-DEDUP, W-BLUR-MUTE all land ON it.

## §Mandate

Discharges: UF-B1 ("too many glass substrates … a grand simplification — which are important? which are
duplicative? which are used?"), UF-B5 (duplicated systems by multiple names — panes vs cards),
UF-B6 (DRY/KISS across the workspace), UF-J3 ("Do these cards properly match up with their variants —
what of the veil card?"). Registry: FAM-9 (the `.replace()` DRY wart), the FAM-10 mechanism-distinctness
law applied to the surface layer, XR-3 (the taxonomy stays library surface).

The grammar ALREADY EXISTS (`Surface = glass|veil|opaque|clear` + `surfaceClass()` + `[data-surface]`,
`_shared/useSurfaceAxis.ts` · `_shared/axes.ts` (BH.W-AXIS-GRAMMAR) · `glass/surface-axis.css`); this
wave FINISHES the collapse the grammar promised. It is a REFACTOR, not a repaint.

## §Design

Decided mechanism (PASS-1 §3b, PASS-4B glass proto — `decorationClass()` landed + fanned byte-identically
to 7 sites, build+routes clean):

- **Extract `<Surface tier decoration deep? defined? shadow? grain? specular? motion?>`** out of `Card.vue`
  — the bare (tier × decoration) plate. `<Card>` = `<Surface>` + header/content/footer + the golden-φ
  padding ladder. NO component-private surface recipe survives anywhere.
- **`decorationClass(surface)`** joins `useSurfaceAxis.ts`: returns ONLY the decoration class (no tier
  prefix). It KILLS the `surfaceClass(x).replace(/^glass-\w+\s*/,'')` DRY wart at every live site. Byte-
  identity is the contract (proto proved 15/15 member×tier ≡ wart over the whole input space).
- **Reka-portaled overlays keep the typed `surface` prop as a courier** (GLASS-B portal finding: a
  consumer `class` cannot cross the reka portal — the typed courier resolving through `decorationClass()`
  is non-optional for Dialog/Sheet/Popover/HoverCard/DropdownMenu/ContextMenu/Command/Drawer/Tooltip).

Rulings honored: no new axis (BH.W-AXIS-GRAMMAR is the ONE grammar home); `cartoon` stays a Card-LOCAL
superset, never a `Surface` member (fence 7); `clear` retirement is W-CLEAR-FOLD's, not this wave's.

## §Work

- `src/components/ui/_shared/useSurfaceAxis.ts` — add `export function decorationClass(surface: Surface): string`
  returning only the veil/opaque/clear decoration class (`""` for `glass`). Single source; the `.replace()`
  regex is DEFINITION-ABSENT after the fan-out.
- Fan `decorationClass(...)` onto the 6 live wart sites (clean break, delete the `.replace()`):
  `card/Card.vue:412` · `sheet/SheetContent.vue:92` · `popover/PopoverContent.vue:45` ·
  `command/Command.vue:31` · `drawer/DrawerContent.vue:68` · `expandable-container/ExpandableContainer.vue:146`.
  (`glass-panel/GlassPanel.vue:71` is the 7th — it dies with the SFC in W-GLASS-DEDUP, not here.)
- Extract `src/components/ui/surface/Surface.vue` (+ `index.ts` + `/surface` subpath + `SurfaceProps` on
  `/api`); re-point `Card.vue` to compose it. `CardTier` collapses: `opaque`/`deep` leave the tier union
  (`<Card surface="opaque">` / `<Card deep>` — clean break, no `tier="opaque"` alias; MIGRATION row).
- Demo route `demo/stories/foundations/surface-taxonomy.vue` — the full tier×decoration matrix on ONE
  primitive (discharges UF-J3: every card variant + the veil card render correctly on the matrix).
- `/api`: publish `Surface`/`SurfaceTier`/`SurfaceProps`/`decorationClass`; drop `CardTier` opaque/deep rungs.

## §Acceptance

Gate: **`proof:surface-axis`** extended in place (no new key) + `proof:glass-cohesion` re-point.
- W7 **decorationClass-single-source** (BORN-RED at HEAD — the `.replace(/^glass-\w+\s*/,'')` wart is live
  at 6 sites): exactly ONE `decorationClass` definition in `useSurfaceAxis.ts`; ZERO `.replace(/^glass-`
  occurrences in `src/` → GREEN after the fan-out.
- W8 **no-component-private-surface-recipe**: no SFC composes a bare `--glass-bg-*`/`--glass-level` recipe
  off the resolver (the `<Surface>`/`decorationClass` seam is the only door).
- Self-test bites: a synthetic re-added `.replace()` wart REDs W7; a synthetic private tier recipe REDs W8.
- Regression: `proof:surface-axis` W1 (second-axis prohibition, `cartoon` superset permitted),
  `proof:glass-cohesion`, `proof:glass-identity` all GREEN.

## §π/DELTA

**Refactor-not-repaint byte-diff** (Open-Gap-3, the binding claim): π diff at default expressions —
Card / Dialog / Sheet / Popover / Command / ExpandableContainer + the taxonomy-matrix route — BOTH modes,
Chrome + Safari; pixel-identical to the pre-extract ground (0 delta). DELTA:
`docs/tranches/BI/audit/visual/W-SURFACE-EXTRACT-DELTA.md`. Rides W-REFLECT (`proof:ba-gestalt` glass-band).

## §Obligations

- Stable-Safari.app/WKWebView device run for the byte-diff (Playwright-WebKit per SAF-1 for the paint
  question; the visible-Metal confirm is owed at reflect).
- Re-baseline against the live BH.W-AXIS-GRAMMAR tree at execution (the axes.ts SURFACES tuple + the
  BE-shipped `clear` member are HEAD facts the PASS-1 spec predates — land the split ON the grammar).

## §Dispositions

None terminalized here (the chassis wave). `clear`, the glass-panel prune, the token rungs, and the blur
mute are terminalized by the four dependent waves below.
