## BE.W-SHEET-TRANSLUCENT — the see-through frosted sheet/drawer crown (the iOS-27 translucent bottom sheet)

- **Band:** 2 — Liquid Glass material, Safari-first · **Severity:** critical · **Status:** SPEC (tranche-dev; NOT executed) · **Deps:** none inbound; the `--glass-opacity-sheet` rung is read by Drawer + Sheet (the two enrolled surfaces); the now-playing pill's bottom-sheet expand (BE.W-DOCK-NOWPLAYING-PILL) lands over a translucent sheet by construction but does not block this wave. **Sequence:** independent — can land FIRST in Band 2.
- **One-line goal:** Mint `--glass-opacity-sheet` (~0.74) — the iOS-27 bottom-sheet register that sits BETWEEN the dialog 0.68 and the overlay 0.95 — and re-point the Drawer + Sheet plate off the near-opaque `--glass-bg-overlay` (0.95) onto a genuinely SEE-THROUGH frosted plate whose top crown mask-feathers, so the page/album grid reads THROUGH the sheet (the iOS-27 sheet betters Apple's own — Apple's sheet over a flat scroll-under panel; glass-ui's over the warm-craft substrate).

---

## Goal — what ships, the iOS-27 betters-claim

A Drawer/Sheet at HEAD paints the heaviest `--glass-bg-overlay` rung (α 0.95 — a near-opaque slab; the backdrop-filter track is technically present but INERT behind a 95%-opaque plate). The iOS-27 bottom sheet is a SEE-THROUGH frosted crown: the page beneath bleeds through the lifted sheet (the f_055/v2-f_009 cue — the album grid visibly reads behind the now-playing sheet). This wave lands the ONE token + the two re-points that make the sheet GLASS:

1. **`--glass-opacity-sheet` (~0.74)** — a new rung in the alpha ladder, BETWEEN `--glass-opacity-dialog` (0.68 — the modal control-center register) and `--glass-opacity-overlay` (0.95). 0.74 is the bottom-sheet band: transparent enough that the backdrop reads through (the iOS-27 see-through crown), opaque enough that body text on the sheet clears AA against a busy grid (a sheet is content-bearing, so it sits a hair above the dialog's 0.68). The composed `--glass-bg-sheet` rides the SAME oklab-tint-wrapped recipe `--glass-bg-dialog`/`--glass-bg-dock` already speak (so the W55 bright-bucket darken + the `--glass-level` opaque escape reach the sheet with ZERO new compositing seam).
2. **The Drawer/Sheet re-point** — `.glass-drawer` (drawer.css:50) re-declares `--glass-bg-floating: var(--glass-bg-sheet)` on its scope (the documented self-re-point recipe the dialog uses — NOT a raw rung override that would not re-compose), and SheetContent's `sheetVariants` baked `glass-floating` tier resolves the sheet bg the same self-re-point way. The floating-tier edge/rim/under-shadow LIFT survives (the sheet still reads as a floating plate, just see-through).
3. **The mask-feathered crown** — the sheet's TOP edge (the lifted crown the user grabs) carries a `mask-image` linear feather so the glass crown DISSOLVES into the backdrop rather than terminating in a hard near-opaque line — the iOS-27 sheet-handle softness (the `--veil-feather` mask idiom already in surface-axis.css, reused here as a `--glass-sheet-crown-feather` knob, default a subtle top-edge gradient; `mask-image: none` is the opt-out identity).

**The betters-claim:** Apple's bottom sheet frosts a flat scroll-under panel; glass-ui's frosts over the warm-aurora craft AND lands the see-through crown over a LIVE album grid (the now-playing sheet), reading as a continuous liquid-glass module, not an opaque slab dropped on the page.

---

## Starting state — the exact HEAD src + the born-RED anchor (verified on disk)

**`src/styles/tokens/glass.css` — VERIFIED by reading `:54-58, :181, :216-236`.**
- `:54-58` — the alpha-monotonic ladder `--glass-opacity-{wash:0.30, quiet:0.50, resting:0.65, floating:0.80, overlay:0.95}`. **There is NO `--glass-opacity-sheet` rung** (grep `glass-opacity-sheet` → 0 hits — the born-RED anchor: the token is ABSENT).
- `:181` — `--glass-opacity-dialog: 0.68;` (the modal register, the rung BELOW the new sheet).
- `:58` — `--glass-opacity-overlay: 0.95;` (the rung ABOVE the new sheet — the near-opaque slab the sheet escapes).
- `:236` — `--glass-bg-dialog: color-mix(in oklab, color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-dialog)) * var(--glass-level)) * 100%), transparent), var(--glass-tint-source) var(--glass-tint-strength));` — the EXACT oklab-tint-wrapped recipe the new `--glass-bg-sheet` mirrors (only the opacity token differs).

**`src/styles/drawer.css` — VERIFIED `:50-74`.** `.glass-drawer` paints `background: color-mix(in oklab, var(--glass-bg-overlay), var(--glass-tint-source) var(--glass-tint-strength));` + `backdrop-filter: var(--glass-blur-overlay)` — the HEAVIEST near-opaque rung (the born-RED: the drawer is a 0.95 slab, NOT see-through). The `-webkit-backdrop-filter` prefix is present (`:68`). The surface-axis `[data-surface]` same-layer carve (`:87-116`) is byte-untouched by this wave.

**`src/components/ui/sheet/index.ts:25` — VERIFIED.** `sheetVariants` cva bakes the `glass-floating` tier in its base class string. SheetContent.vue (`:67, :127`) resolves `surfaceDecoration` (the veil/opaque axis) + binds `:data-surface` — the surface axis is threaded; this wave changes the BASE tier's composited fill, not the axis.

**`src/styles/glass/surface-axis.css:60-65` — VERIFIED.** `--veil-feather` is a `mask-image` knob (default `none` = a clean rectangle) — the precedent the sheet-crown feather reuses (no new mask mechanism).

**Born-RED summary:** `--glass-opacity-sheet` + `--glass-bg-sheet` are ABSENT; the Drawer + Sheet paint the near-opaque overlay rung; the crown terminates hard. The π getImageData over a live grid reads ~0.95 composited alpha (backdrop does NOT read through) — RED at HEAD until the build lands.

---

## Build — the mechanism on the named existing substrate

**Token-only + two self-re-points + one mask knob — ZERO new compositing path, ZERO new mechanism.**

1. **`glass.css` — mint the rung beside the existing rungs.** Add `--glass-opacity-sheet: 0.74;` (with the inline rationale: the bottom-sheet band BETWEEN dialog 0.68 and overlay 0.95 — see-through crown + AA body floor). Add the composed `--glass-bg-sheet` IMMEDIATELY after `--glass-bg-dialog` (`:236`), byte-isomorphic to the dialog recipe with the sheet opacity:
   ```css
   --glass-bg-sheet: color-mix(in oklab, color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-sheet)) * var(--glass-level)) * 100%), transparent), var(--glass-tint-source) var(--glass-tint-strength));
   ```
   So the W55 bright-bucket darken + the `--glass-level` opaque escape + the dark-arm saturate companions reach the sheet through the ONE seam (no second hand-rolled recipe — the dialog precedent).
2. **`drawer.css:65` — re-point `.glass-drawer`.** Change the background composite to read `--glass-bg-sheet` (NOT `--glass-bg-overlay`): `background: color-mix(in oklab, var(--glass-bg-sheet), var(--glass-tint-source) var(--glass-tint-strength));`. The `backdrop-filter: var(--glass-blur-overlay)` blur RADIUS stays the overlay rung (the sheet wants the heaviest frost — only the OPACITY drops). The edge/rim/under-shadow (`:71-73`) are byte-untouched (the floating-band lift survives).
3. **SheetContent / sheetVariants — the self-re-point.** SheetContent re-declares `--glass-bg-floating: var(--glass-bg-sheet)` on the content scope (the dialog `DialogContent.vue` self-re-point precedent — re-point the rung the variant reads, NOT a raw override) so the baked `glass-floating` tier resolves the sheet bg. The `surfaceDecoration` veil/opaque axis is byte-untouched.
4. **The mask-feathered crown.** Add `--glass-sheet-crown-feather` (default `linear-gradient(to bottom, transparent 0, black calc(var(--drawer-handle-zone, 1.5rem)))` — a subtle top-edge dissolve) and apply `mask-image: var(--glass-sheet-crown-feather)` on the `.glass-drawer` crown. The default is a soft top feather; a consumer sets it `none` to opt out. The feather is a `mask-image` (compositor-safe — paint property, not layout).

**Compositor-only / Safari-safe / PRM notes:** the change is OPACITY (a paint property) + a `mask-image` (paint) — ZERO layout property animates (`proof:no-layout-animation` GREEN by construction). The `color-mix(in oklab) + backdrop-filter + opacity` pattern inherits the build-time `-webkit-backdrop-filter` prefix pass (`proof:webkit-backdrop` / `proof:liquid-glass-material`, both verified to exist) for FREE — Safari paints the see-through frost. No animation is introduced, so there is no PRM leg to gate (the sheet's existing snap-spring `--glass-drawer-t` is untouched).

---

## Gate — proof:sheet-translucent (NEW), born-RED → GREEN

**A NEW device-free source gate (manifest [10]) — `proof:sheet-translucent`, `['local','ci']`.** Born-RED by construction (`--glass-opacity-sheet` ABSENT; `proof-sheet-translucent.mjs` absent on disk).

- **S1 — the rung is minted BETWEEN dialog and overlay.** Read `--glass-opacity-sheet` from `tokens/glass.css`; assert it EXISTS and `0.68 < α < 0.95` (strictly between the dialog 0.68 and the overlay 0.95). RED at HEAD (token absent).
- **S2 — the composed `--glass-bg-sheet` rides the SHARED oklab-tint recipe.** Assert `--glass-bg-sheet` exists and matches the `color-mix(in oklab, color-mix(in srgb, var(--card) … var(--glass-opacity-sheet) … ), var(--glass-tint-source) var(--glass-tint-strength))` shape (no hand-rolled fork — byte-isomorphic to `--glass-bg-dialog`). RED at HEAD.
- **S3 — Drawer + Sheet READ the sheet rung.** Assert `drawer.css` `.glass-drawer` background reads `--glass-bg-sheet` (NOT `--glass-bg-overlay`) AND SheetContent self-re-points `--glass-bg-floating: var(--glass-bg-sheet)`. RED at HEAD (both read overlay/raw floating).
- **S4 — the dist carries `-webkit-backdrop-filter`** on the sheet surface (the Safari-safe clause folded from the manifest minor — assert the built `dist/*.css` carries the `-webkit-` prefixed companion beside `backdrop-filter` on `.glass-drawer`). RED if the prefix pass is bypassed.
- **The self-test bite (the planted defect that MUST red):** an OPAQUE sheet — `--glass-opacity-sheet: 0.96` (α ≥ overlay 0.95) — reds S1 ("the sheet is a near-opaque slab, not see-through"); a sheet reading `--glass-bg-overlay` raw reds S3; a `--glass-bg-sheet` re-spelled with `in srgb` (the AW.W26 fence is for `--surface-tint-*`, the glass plate is oklab) reds S2.

**Extend-vs-new:** NEW gate. It does NOT extend `proof:surface-axis` (that owns the {glass·veil·opaque} DECORATION axis, not the per-rung alpha) — the sheet rung is an ALPHA-ladder mint, the `proof:card-tier-alpha` family's sibling. It runs beside `proof:card-tier-alpha` (which asserts the {wash..overlay} ladder monotonicity — the sheet rung is an off-ladder footprint rung like dock/dialog, NOT part of the monotonic {wash..overlay} ladder, so `proof:card-tier-alpha` stays GREEN by construction).

---

## π — the binding paint readback

**`tests-visual/sheet-translucent.spec.ts` (NEW, Chromium + WebKit, LOCAL real-render).** This is a VISUAL wave — it earns a `proof:ba-gestalt` container-band verdict + a captured DELTA, both modes × desktop+mobile. NO source-green close; the "is GREEN at this wave close; W-REFLECT re-confirms on the union tree" pattern is FORBIDDEN (G8).

- **The binding readback:** mount a Drawer (snap-points) over a BUSY backdrop (the live aurora grid at `:5199`), open to the half-snap, and getImageData over a region BEHIND the lifted sheet crown vs a region the sheet fully covers. Assert the composited sheet fill α is in the see-through band (sub-0.95 — the backdrop's structure reads through the frost) AND body text on the sheet clears 4.5:1 against the busy grid (the AA floor — the sheet is content-bearing). BEFORE (overlay 0.95): the backdrop does NOT read through (α ≈ 0.95). AFTER (sheet 0.74): the grid's luminance variance reads through the plate.
- **Both modes:** light (warm-cream see-through) + dark (the W-DARK-MATERIAL luminous-dark sheet — the saturate companion glows the backdrop through). Assert the dark sheet ALSO reads through (the dark-arm saturate lift carries it).
- **Safari (where liquid):** the WebKit project run asserts the `-webkit-backdrop-filter` frost paints (the see-through crown is the cross-engine FLOOR — pure opacity + backdrop-filter, no `url()` filter, so Safari paints it identically; this is NOT a Chromium-only enhancement).
- **The captured DELTA** lands at `docs/tranches/BE/audit/visual/W-SHEET-TRANSLUCENT-DELTA.md` — the overlay-0.95 slab vs the sheet-0.74 see-through crown over the album grid, both modes, the mask-feathered crown visible. **G7-revokable:** any wave editing `glass.css`/`drawer.css`/`SheetContent.vue` (the painting sources) auto-reverts the container-band gestalt PASS to FAIL via the surface-hash freshness (proof:ba-gestalt:242-245).

---

## Jubilance — the sited delights

- **FLOOR — the see-through crown.** The sheet GLASS reads as glass over the live page (the iOS-27 cue), not a slab. The mask-feathered crown DISSOLVING into the backdrop is the sited delight — a soft top edge, the iOS-27 handle softness. PRM-irrelevant (a static mask, no motion).
- **FLOOR — the dark sheet glows.** Over a dark album grid the dark-arm saturate companion lights the backdrop THROUGH the frost (the luminous-dark transmissive read) — "dark glass glows where light passes," sited at the sheet.
- **No OPT-IN motion jubilance** — the sheet's existing snap-spring is the motion register (untouched); this wave is the MATERIAL crown, not a new animation.

---

## Fences — what stays byte-untouched / warm-cream identity / no-legacy

1. **The {wash..overlay} ladder is INVIOLATE** — `--glass-opacity-{wash..overlay}` (`:54-58`) byte-untouched; the sheet rung is a NEW off-ladder footprint rung (the dock/dialog precedent), so `proof:card-tier-alpha` T2/T3 ladder-monotonicity stays GREEN by construction.
2. **The calm content default + the dialog rung are byte-untouched** — `--glass-opacity-dialog: 0.68` and every base `--glass-bg-*` frozen; only the Drawer + Sheet re-point onto the new rung.
3. **The warm-cream identity holds** — the sheet is the warm-cream `--card` plate at a lower alpha (a transparency change, NOT a hue shift); the oklab-tint seam carries the W55 legibility, no ppmycota/cool hue enters a token.
4. **The surface axis is byte-untouched** — the {glass·veil·opaque} decoration (`[data-surface]`) is unchanged; `surface="opaque"` still flips `--glass-level: 0` to the solid escape (a consumer who wants the old near-opaque sheet uses `surface="opaque"` or overrides `--glass-opacity-sheet`).
5. **Clean break, no alias** — the Drawer/Sheet RE-POINT onto the sheet rung (no `--glass-bg-overlay` dual-read survives on the sheet path); a consumer retunes via `:root { --glass-opacity-sheet: … }` (presets-in-consumers — the library default IS its identity).
6. **The snap engine + the drag gesture are byte-untouched** — `--glass-drawer-t`, `useDrawerSnap`, the `[data-glass-drawer-*]` keys are unchanged (this is the MATERIAL, not the mechanism).
7. **Safari-safe by the existing prefix pass** — no new `url()` filter is introduced (the see-through frost is the cross-engine floor); the lens/refract axis is a separate wave (BE.W-LENS-SAFARI/PRISM).

**Risk:** 0.74 may read a hair too opaque over a VERY busy album grid (the see-through cue weak) or a hair too transparent for AA on a low-contrast page. The token is the dial — the π over the worst-case grid is the calibration (land 0.72-0.76 to taste, recorded in the DELTA); the value is the output of the paint, not a guess.
