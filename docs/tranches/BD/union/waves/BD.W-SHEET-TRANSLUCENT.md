# BD.W-SHEET-TRANSLUCENT — the see-through frosted sheet/drawer crown (the iOS-27 translucent bottom sheet — WIRE the minted rung)

**Band 7 · depends: — (the `--glass-opacity-sheet` rung is already minted at HEAD; the now-playing pill's bottom-sheet expand lands over a translucent sheet by construction but does not block this) · canonical source for `BE.W-SHEET-TRANSLUCENT`**

## The defect / the ask + the EXACT HEAD state (verified on disk)

The iOS-27 bottom sheet is a SEE-THROUGH frosted crown: the page/album grid beneath bleeds through the lifted sheet (f_055/v2-f_009 — the album grid visibly reads behind the now-playing sheet). At HEAD a Drawer/Sheet paints the HEAVIEST `--glass-bg-overlay` rung (α 0.95 — a near-opaque slab; the `backdrop-filter` track is technically present but INERT behind a 95%-opaque plate, the R8-12 "not glassy" defect).

**The token-MINT already landed** (the BE pool spec predated the HEAD state — VERIFIED on disk):
- `src/styles/tokens/glass.css:194` — `--glass-opacity-sheet: 0.74;` EXISTS (the bottom-sheet band BETWEEN dialog 0.68 and overlay 0.95, with the inline rationale `:185-193`).
- `src/styles/tokens/glass.css:271` — `--glass-bg-sheet: color-mix(in oklab, color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-sheet)) * var(--glass-level)) * 100%), transparent), var(--glass-tint-source) var(--glass-tint-strength));` EXISTS (byte-isomorphic to `--glass-bg-dialog` — the SAME oklab-tint-wrapped recipe, so the W55 bright-bucket darken + the `--glass-level` opaque escape + the dark-arm saturate companions reach the sheet through the ONE seam).

**But NO surface CONSUMES it** (the born-RED anchor — VERIFIED): `grep -rn 'glass-bg-sheet' src/` → ONLY the `tokens/glass.css` definition + its own rationale comments; ZERO consumers. `src/styles/drawer.css:67` STILL paints `background: color-mix(in oklab, var(--glass-bg-overlay), var(--glass-tint-source) var(--glass-tint-strength));` (the heaviest 0.95 near-opaque rung). `src/components/ui/sheet/index.ts:25` bakes the `glass-floating` tier in `sheetVariants` (which resolves the floating rung, NOT the sheet rung). The sheet/drawer is a 0.95 slab; the crown terminates hard. **This wave is the WIRE: re-point Drawer + Sheet onto the already-minted `--glass-bg-sheet` rung + add the mask-feathered crown** — NOT a token mint (that landed), the consumer wiring it lacked.

## The mechanism — three self-re-points + one mask knob, ZERO new compositing path

The token + composite already exist; this wave wires the two surfaces onto them + adds the crown feather. ZERO new mechanism.

1. **`drawer.css:67` — re-point `.glass-drawer`.** Change the background composite to read `--glass-bg-sheet` (NOT `--glass-bg-overlay`): `background: color-mix(in oklab, var(--glass-bg-sheet), var(--glass-tint-source) var(--glass-tint-strength));`. The `backdrop-filter: var(--glass-blur-overlay)` blur RADIUS stays the overlay rung (`:68` — the sheet wants the heaviest frost; only the OPACITY drops). The edge/rim/under-shadow (`box-shadow` `:73`) + the `-webkit-backdrop-filter` prefix (`:69`) are byte-untouched (the floating-band lift survives).
2. **SheetContent / sheetVariants — the self-re-point.** SheetContent re-declares `--glass-bg-floating: var(--glass-bg-sheet)` on the content scope (the `DialogContent.vue` self-re-point precedent — re-point the rung the variant READS, NOT a raw override that would not re-compose) so the baked `glass-floating` tier (`sheetVariants` `index.ts:25`) resolves the sheet bg. The `surfaceDecoration` veil/opaque/clear axis (`SheetContent.vue:66`) is byte-untouched.
3. **The mask-feathered crown.** Add `--glass-sheet-crown-feather` (default `linear-gradient(to bottom, transparent 0, black calc(var(--drawer-handle-zone, 1.5rem)))` — a subtle top-edge dissolve) and apply `mask-image: var(--glass-sheet-crown-feather)` on the `.glass-drawer` crown — the iOS-27 sheet-handle softness (the `--veil-feather` mask idiom in `surface-axis.css:59`, reused; `mask-image: none` is the opt-out identity). The feather is a `mask-image` (compositor-safe — a paint property, not layout).

**Compositor-only / Safari-safe / PRM:** the change is OPACITY (a paint property) + a `mask-image` (paint) — ZERO layout property animates (`proof:no-layout-animation` GREEN by construction). The `color-mix(in oklab) + backdrop-filter + opacity` pattern inherits the build-time `-webkit-backdrop-filter` prefix pass for FREE (Safari paints the see-through frost; the change is pure opacity + backdrop-filter, NO `url()` filter — the see-through crown is the cross-engine FLOOR, not a Chromium-only enhancement). No animation is introduced, so there is no PRM leg to gate (the sheet's existing snap-spring `--glass-drawer-t`/`useDrawerSnap` is untouched).

## The gate — `proof:sheet-translucent` (NEW; born-RED → GREEN)

`scripts/proof-sheet-translucent.mjs`, `tags: ["local","ci"]` (the binding PAINT is the π). Born-RED at HEAD (the rung is minted but UNWIRED — Drawer/Sheet read overlay; `proof-sheet-translucent.mjs` absent on disk). Device-free SOURCE facts + the cited substrate seams.

- **S1 — the rung is minted BETWEEN dialog and overlay** (the already-landed mint, cross-asserted GREEN). Read `--glass-opacity-sheet` from `tokens/glass.css`; assert it EXISTS and `0.68 < α < 0.95` (strictly between dialog 0.68 and overlay 0.95). GREEN at HEAD (the mint landed) — this clause guards a future re-tune from leaving the band; the self-test bite plants α ≥ 0.95 to red it.
- **S2 — the composed `--glass-bg-sheet` rides the SHARED oklab-tint recipe** (cross-asserted GREEN). Assert `--glass-bg-sheet` exists and matches the `color-mix(in oklab, color-mix(in srgb, var(--card) … var(--glass-opacity-sheet) … ), var(--glass-tint-source) var(--glass-tint-strength))` shape (byte-isomorphic to `--glass-bg-dialog`, no hand-rolled fork). A `--glass-bg-sheet` re-spelled with `in srgb` (the AW.W26 fence is for `--surface-tint-*`; the glass plate is oklab) reds.
- **S3 — Drawer + Sheet READ the sheet rung (the wire — the born-RED headline).** Assert `drawer.css` `.glass-drawer` background reads `--glass-bg-sheet` (NOT `--glass-bg-overlay`) AND SheetContent self-re-points `--glass-bg-floating: var(--glass-bg-sheet)`. **RED at HEAD** (both read overlay/raw-floating — `grep -rn 'glass-bg-sheet' src/` returns zero consumers today). This is the clause the wire turns GREEN.
- **S4 — the crown feather is minted + applied** (the mask idiom, not a hard line). `--glass-sheet-crown-feather` declared + `mask-image: var(--glass-sheet-crown-feather)` on `.glass-drawer`; the default is a top-edge feather, `none` is the opt-out. RED at HEAD (the crown terminates hard).
- **S5 — the dist carries `-webkit-backdrop-filter`** on the sheet surface (the Safari-safe clause). Assert the built `dist/*.css` carries the `-webkit-` prefixed companion beside `backdrop-filter` on `.glass-drawer`. RED if the prefix pass is bypassed.

**Self-test bites (`--self-test`, each MUST red):** (i) an OPAQUE sheet `--glass-opacity-sheet: 0.96` (α ≥ overlay) → S1 RED; (ii) a sheet reading `--glass-bg-overlay` raw (the un-wired HEAD state) → S3 RED; (iii) a `--glass-bg-sheet` re-spelled `in srgb` → S2 RED; (iv) a `.glass-drawer` with no crown feather → S4 RED; (v) the `-webkit-backdrop-filter` companion stripped → S5 RED.

**Extend-vs-new:** NEW gate. It does NOT extend `proof:surface-axis` (that owns the {glass·veil·opaque·clear} DECORATION axis, not the per-rung alpha — `surface="veil"` is a DIFFERENT register, the borderless text plate; this is the floating-tier ALPHA). It runs beside `proof:card-tier-alpha` (the sheet rung is an OFF-ladder footprint rung like dock/dialog, NOT part of the monotonic {wash..overlay} ladder, so `proof:card-tier-alpha` T2/T3 stays GREEN by construction).

## The π — the binding paint readback

`tests-visual/sheet-translucent.spec.ts` (NET-NEW, Chromium + WebKit, LOCAL real-render). A VISUAL wave — it earns a `proof:ba-gestalt` container-band verdict + a captured DELTA, both modes × desktop+mobile. NO source-green close.

- **The binding readback:** mount a Drawer (snap-points) over a BUSY backdrop (the live aurora grid at `:5199`), open to the half-snap, and getImageData over a region BEHIND the lifted sheet crown vs a region the sheet fully covers. Assert the composited sheet fill α is in the SEE-THROUGH band (sub-0.95 — the backdrop's luminance variance reads through the frost) AND body text on the sheet clears 4.5:1 against the busy grid (the AA floor — a sheet is content-bearing). BEFORE (overlay 0.95): the backdrop does NOT read through (α ≈ 0.95). AFTER (sheet 0.74): the grid's luminance variance reads through the plate.
- **Both modes:** light (warm-cream see-through) + dark (the W-DARK-MATERIAL luminous-dark sheet — the dark-arm saturate companion glows the backdrop through). Assert the dark sheet ALSO reads through.
- **Safari (the cross-engine floor):** the **webkit project** run asserts the `-webkit-backdrop-filter` frost paints (pure opacity + backdrop-filter, NO `url()` filter — Safari paints it identically; this is NOT a Chromium-only enhancement).
- **The captured DELTA** lands at `docs/tranches/BD/audit/visual/W-SHEET-TRANSLUCENT-DELTA.md` (the overlay-0.95 slab vs the sheet-0.74 see-through crown over the album grid, both modes, the mask-feathered crown visible). G7-revokable: any wave editing `glass.css`/`drawer.css`/`SheetContent.vue` auto-reverts the container-band gestalt PASS to FAIL via the surface-hash freshness.

## The gestalt row

**BD-union-roster surface: `sheet-translucent`** (wired by W-GESTALT-WIRE). Verdict requirement: on a FRESH whole-page both-mode `:5199` capture (NEVER reducedMotion), over the live field, the Drawer/Sheet reads as GLASS over the live page (the iOS-27 see-through crown — the backdrop bleeds through the frost), NOT a near-opaque slab, with the crown DISSOLVING into the backdrop (the mask feather), in BOTH modes AND on WebKit. Born-FAIL on HEAD (the sheet is a 0.95 slab; the crown terminates hard); GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels; surface-hash freshness floor binds.

## Fences

1. **The {wash..overlay} ladder is INVIOLATE** — `--glass-opacity-{wash..overlay}` byte-untouched; the sheet rung is the already-minted OFF-ladder footprint rung (the dock/dialog precedent), so `proof:card-tier-alpha` T2/T3 ladder-monotonicity stays GREEN by construction.
2. **The calm content default + the dialog rung are byte-untouched** — only the Drawer + Sheet RE-POINT onto the existing sheet rung.
3. **The warm-cream identity holds** — the sheet is the warm-cream `--card` plate at a lower alpha (a transparency change, NOT a hue shift); the oklab-tint seam carries the W55 legibility, no ppmycota/cool hue enters a token.
4. **The surface axis is byte-untouched** — the {glass·veil·opaque·clear} decoration (`[data-surface]`) is unchanged; `surface="opaque"` still flips `--glass-level: 0` (a consumer who wants the old near-opaque sheet uses `surface="opaque"` or overrides `--glass-opacity-sheet`).
5. **Clean break, no alias** — the Drawer/Sheet RE-POINT (no `--glass-bg-overlay` dual-read survives on the sheet path); a consumer retunes via `:root { --glass-opacity-sheet: … }` (presets-in-consumers).
6. **The snap engine + the drag gesture are byte-untouched** — `--glass-drawer-t`, `useDrawerSnap`, the `[data-glass-drawer-*]` keys unchanged (this is the MATERIAL, not the mechanism).
7. **Safari-safe by the existing prefix pass** — no new `url()` filter (the see-through frost is the cross-engine floor); the lens/refract axis is a separate wave (W-LENS-SAFARI/PRISM).

**Risk:** 0.74 may read a hair too opaque over a VERY busy album grid (the see-through cue weak) or a hair too transparent for AA on a low-contrast page. The token is the dial — the π over the worst-case grid is the calibration (land 0.72-0.76 to taste, recorded in the DELTA); the value is the output of the paint, not a guess.

## Disposition links

- **Canonical source for `BE.W-SHEET-TRANSLUCENT`** (the pool spec). The mint already landed at HEAD; this row is the WIRE (the consumer re-point the mint lacked).
- **CONSUMES the already-minted `--glass-opacity-sheet`/`--glass-bg-sheet` rung** (`tokens/glass.css:194,271`) — zero new token; the wave wires the existing composite onto Drawer + Sheet.
- **Read by W-DOCK-NOWPLAYING-PILL** (the now-playing pill's bottom-sheet expand lands over the translucent sheet by construction) + W-MAPS-CARD (the see-through Maps card composes the sheet rung).
- **DISTINCT from `surface="veil"`** — veil (`surface-axis.css:39`) is the borderless text-legibility plate at the quiet rung; the sheet is the floating-tier ALPHA drop (a different concern; the sheet keeps its rim/edge/under-shadow, veil strips them).
