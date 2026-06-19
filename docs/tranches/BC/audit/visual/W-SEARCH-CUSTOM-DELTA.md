# BC.W-SEARCH-CUSTOM — DELTA (the search surface de-shadcn'd + glassified onto the house registers)

The SearchBar/FuzzySearch first-principles CUSTOMIZATION + glassify: the size/surface/variant axes
threaded onto both SFCs, the `!important`-fighting-CVA escape DELETED onto a real `variant` CVA rung,
the fork-forced px literals token-backed onto the `--search-*` cohort indirection rungs, the result
rows re-pointed off `bg-muted/50` onto `.glass-menu-row`, and the expand modal re-based off
`surface="opaque"` onto the glassy floating plate. Flips `proof:customizability-census` C3 GREEN;
mints `proof:search-custom`. Resolves the dangling `BC.W-DOCK-SEARCH §132` / `BC.W-FUZZY-HARDEN §20`
owner-reference (this wave is the named FuzzySearch SFC-glassify owner). The fuzzy MATCHER is
BYTE-UNTOUCHED (BC.W-FUZZY-HARDEN's fence — only `fuzzyMatch` is READ for the highlight spans).

## The gestalt (what a reader sees)
The search surface is no longer the repo's heaviest `!important` cluster + an opaque shadcn modal. A
bare `<SearchBar>` reads as a proportioned warm-cream glass search pill; a `size="lg"` reads taller for
a hero field, `size="sm"` quieter — control-size hierarchy from ONE prop, all on the `--control-h-*`
cohort. The `<FuzzySearch>` expand modal reads GLASSY — the warm-cream `glass-floating` plate with the
liquid-reveal bloom, NOT the opaque slab — and the result rows ride the `.glass-menu-row` glass-quiet
hover-lift (the same glassy menu-row the dropdown/select families read), NOT the shadcn-neutral
`bg-muted/50`. The matched-char highlight stays the `::highlight(glass-search-mark)` Custom Highlight
paint (untouched). A human reads: "the search bar is warm glass with a clean size/surface hierarchy,
and the expand modal is glassy with glassy result rows — nothing reads as the shadcn-neutral search
box."

## The five moves (source-half, this wave)
- **M1 — the shared control-size axis.** `size?: ControlSize` on BOTH SFCs, threaded via the SHARED
  `controlSizeClass(size)` (`ui/_shared/useControlSize.ts`). The `.input-bar` recipe
  (`utilities/components.css`) gains the `var(--control-pill-h, var(--control-h-sm))` /
  `var(--control-pill-text, var(--control-text))` indirection wrapper (the SAME seam `.input-pill`
  reads) — so the default rung resolves the HEAD `2.25rem` height + `--type-small`-equivalent font
  BYTE-near-identically, and `lg` re-points to `--control-h-lg`. ONE substitution rung, no recipe fork.
- **M2 — the `surface?: Surface` axis + the GLASS modal.** `surface?: Surface` (default `glass`) on
  both SFCs; the `:data-surface` binding reaches the `.input-bar` recipe via `glass/surface-axis.css`.
  The FuzzySearch expand modal `<DialogContent surface="opaque">` → `<DialogContent :surface="surface">`
  (default glass) — the modal becomes the warm-cream floating plate with the liquid-reveal bloom (the
  AX.W54 glass-first canon; the user's "glassy dynamic search" ask, the (c) fix).
- **M3 — the `variant` CVA rung DELETES the `!important` escape (the HOLD-4 fold).** `searchVariants.ts`
  mints `searchFieldVariants` (`inline | bare | floating`); the `bare`/`floating` rung emits
  `border-none bg-transparent p-0 rounded-none` AS THE VARIANT (no `!`), winning on its own layer-order
  specificity over the `.input-bar` recipe. `FuzzySearch.vue:111`'s `'!border-none !bg-transparent !p-0
  !rounded-none'` cluster is DELETED; the `<Button size="icon">` `!h-6 !w-6`/`!h-7 !w-7` escapes
  re-point onto `size-(--search-button-size)` (no `!`). The CLEANUP-PLAN A6/HOLD-4 "with no owner" is
  resolved — this wave is the owner.
- **M4 — token-backed icon/button/result magnitudes.** New `--search-icon-size` (→ `--ui-glyph-sm`),
  `--search-button-size` (→ `--control-h-xs`), `--search-result-text` (→ `--control-text`),
  `--search-result-text-secondary` (→ `--control-text-sm`) in `tokens/sizing.css` — indirection rungs
  DEFAULTING to the cohort (byte-identical at the default). The `w-3.5 h-3.5` / `text-[0.6rem]` /
  `text-[0.65rem]` / bare `text-sm`/`text-base` literals re-point onto `size-(--search-icon-size)` /
  `text-(length:--search-result-text)` reads (the C3 close + §4 class 4).
- **M5 — the `.glass-menu-row` result register + the φ overlay-pad modal.** The result rows
  (`:137,:163`) re-point off `'is-selected bg-muted/50'` onto `.glass-menu-row` + a `data-highlighted`
  bind on the selected row (the glass-quiet tint materializes on hover/selected; the BA.W-MENU-GLASS
  register, the de-shadcn `custom/search` paint the (b) fix). The modal sections read the φ
  `--overlay-pad-inline/-block` ladder (1rem inline anchor, ×1.272 √φ block); the `!max-w-[36rem]`
  escape re-points to the `--search-modal-width` knob (cn dedups `max-w-*` → the token wins with no
  `!`); the outer content pad is zeroed by retuning the `--overlay-pad-*` TOKEN the DialogContent recipe
  reads (the substitution path, NOT an `!p-0` utility fight). The modal keeps DialogContent's golden
  centered position (the clean spotlight read — no `!top-`/`!translate-` cascade fight).

## Fences held (must NOT regress)
- **The fuzzy MATCHER is BYTE-UNTOUCHED** — `useFuzzySearch`/`fuzzySearchIndex`/`scoreEntry`/`searchIndex`
  not imported for an edit; only `fuzzyMatch` is READ for the `fuzzySpans` highlight (the
  BC.W-FUZZY-HARDEN byte-fence; SC5 cross-checks it).
- **No double-ownership.** This wave owns the `custom/search/*` SFC PAINT only; `BC.W-DOCK-SEARCH`
  owns the dock morph (CONSUMES the glassified `variant="floating"` surface, not re-authored);
  `BC.W-OVERLAY-UNIFORM` owns the `ui/Dialog surface` axis (CONSUMED via the bound `:surface`, not
  re-authored — the `--search-modal-width` knob is `custom/`-scoped, distinct from the generic `ui/`
  pad). reka behavior is INVIOLATE (the PAINT layer only).
- **DRY — ZERO new register.** The size axis reads the `--control-*` cohort, the surface axis imports
  the shared `Surface` resolver, the result rows read `.glass-menu-row`, the modal pad reads
  `--overlay-pad-*`; the `--search-*` tokens are INDIRECTION rungs aliasing onto the cohort (NOT a
  parallel `--search-h-*` ladder). SC5 reds a parallel register.
- **The bare default is byte-near-identical.** `size="default"` + `surface="glass"` + `variant="inline"`
  resolve the HEAD `.input-bar`/glass-floating read; the icon/button/result tokens default to the cohort
  the literals encoded. The ONE prop-surface change: the FuzzySearch `variant="sidebar"` → `inline`
  rename (the MIGRATION row; `floating` carries over). The deliberate paint changes (modal opaque→glass,
  result `bg-muted`→glass-menu-row) are visual upgrades, no public-prop break.

## Gates (source half — born-RED → GREEN, validated here)
- **`proof:search-custom`** (NEW, mints `scripts/proof-search-custom.mjs`) — born-RED at HEAD
  (24 violations: SC1×12 + SC2×1 + SC3×5 + SC4×4 + SC5×2, every clause reds against the HEAD SFCs)
  → GREEN. All 5 self-test bites have teeth (a planted `!border-none`/`!h-6`, a `w-3.5 h-3.5`/`text-[0.6rem]`
  literal, a `bg-muted/50` row + `surface="opaque"` modal, a `--search-h-sm` parallel ladder, a
  `useFuzzySearch` scorer import each red; the cured form is exempt).
- **`proof:customizability-census` C3** born-RED at HEAD (the two compounds carry the
  `w-3.5 h-3.5` + `!h-N/!w-N` + `text-[0.6rem]` + 14-`!important` cluster) → GREEN (the disease-root
  witness drops from 2/5 to 1/5 C-asserts RED — only C4→HERO-AUDACIOUS remains, its own wave).
- **`proof:surface-axis` / `proof:menu-glass` / `proof:glass-cohesion`** stay GREEN (no regression —
  the shared `Surface`/`.glass-menu-row` registers are CONSUMED, not re-authored).
- **`proof:no-shadcn-default`** — this wave REMOVES the `custom/search` `bg-muted/50` residual (zero of
  its remaining flagged residuals are in `custom/search`; the 8 flagged are pre-existing `ui/` reskins
  owned by other de-shadcn band waves — not this wave's regression).
- **`vue-tsc --noEmit`** clean (0 errors); the library build emits `dist/search.js` + the flattened
  search `.d.ts` (the `SearchVariant`/`SearchVariants` discovery surface).

## Pending — the ORCHESTRATOR's live PAINT (per the cardinal split)
The LIVE glassified-search PAINT is the orchestrator's binding π — **pending-orchestrator-capture**:
- The live `:5199/data/search` gate set as applicable: the glassy `<SearchBar>` pill + the glassy
  `<FuzzySearch>` expand modal + the `.glass-menu-row` result rows.
- The CAPTURED-PAINT frame (both modes + WebKit) over `/data/search`: a `size="sm"` / `size="default"` /
  `size="lg"` `<SearchBar>` row reading a clear control-size hierarchy (all warm-cream glass pills); the
  `<FuzzySearch>` expand modal OPEN over the storybook reading GLASSY (the warm-cream `glass-floating`
  plate, NOT the opaque slab) with the result rows reading the `.glass-menu-row` glass-quiet hover-lift
  (NOT the `bg-muted/50` slab) and the matched-char highlight visibly emphasized.
- `tests-visual/search-custom.spec.ts` (auto-enrolled in `--run pi`) records the binding π readback:
  the bare pill α < 0.95 (translucent glass, not a slab); `size="lg"` measurably taller than `size="sm"`
  on the `--control-h-*` cohort; a `:root { --search-icon-size }` override cascades into the glyph; the
  modal `DialogContent` composited bg α < 0.92 (the glass plate); the `.glass-menu-row` selected-row tint
  resolves non-transparent; the modal section pad resolves the φ cadence (block ≈ inline × 1.272). On
  capture, the `proof:ba-gestalt` search-surface roster row flips on the fresh warm-cream pixel read.

## Freshness
- Captured-paint status: **PENDING-ORCHESTRATOR-CAPTURE** (this wave delivers the SOURCE half + the
  born-RED→GREEN gate + the π spec; the live warm-cream pixel frame is the orchestrator's binding π,
  never a commit claim — the live-verify cardinal split).
- Source half validated 2026-06-19 on `tranche/BC`: `proof:search-custom` GREEN (24-violation born-RED
  → 0), `proof:customizability-census` C3 GREEN, `proof:surface-axis`/`proof:menu-glass` GREEN,
  `vue-tsc` clean, `npm run build` emits `dist/search.js`.
