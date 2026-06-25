# BD.W-HUE-HISTOGRAM-HOIST — hoist the OKLCh hue histogram to one home (`composables/color/hueHistogram.ts`)

**Band 1 (CONSOLIDATE — no-legacy / idiom spine) · Tier T1 · depends: — (a shipped-composable internal hoist, no inbound dep; independent of the FLIP-SPINE chain within T1) · DOWNSTREAM: W-AMBIENT-TINT (T6) + W-AUR-ALBUM (T6) both READ the hoisted leaf · sequenced BEFORE both**

## The defect / the ask

The 12-bucket chroma×alpha-weighted OKLCh hue histogram — the accumulator the iOS-27 ambient-tint + album-reactive aurora both need — is buried INSIDE `useGlassBackdropLuminance.ts` as part of the BE.W-AMBIENT-TINT extension (the per-pixel `accumulateHuePixel`/`resolveAmbientHue` binning over the existing 32×32 getImageData loop). Two waves need it: BE.W-AMBIENT-TINT (the live `--glass-ambient-hue` legibility cast off a backdrop canvas) AND BD.W-AUR-ALBUM (the one-shot `deriveAuroraPalette(img)` dominant-hue extractor off album art). If each reads its own copy of the binning math, that is the AV.W1 two-copy class — a re-fork the no-dual-path discipline forbids; `proof:single-color-core` and the DRY charter both fail it.

The hardening pass surfaced this: a shipped-composable internal HOIST belongs in the CONSOLIDATE band (where the spine is folded before it is wired), NOT buried in a Band-6 aurora wave. AUR-ALBUM's own spec already names the move ("the histogram leaf is HARVESTED out of `useGlassBackdropLuminance.ts` into a shared `src/composables/color/hueHistogram.ts`"), but the harvest is a CONSOLIDATE concern owed its own Band-1 row so the two Band-6 consumers read ONE already-hoisted home — not a hoist hidden inside the aurora album arm.

The HEAD source facts (verified):
- **`src/composables/glass/useGlassBackdropLuminance.ts`** (403 lines) — `SAMPLE_DOWNSAMPLE=32`; the per-pixel loop accumulates mean luminance at HEAD. The BE.W-AMBIENT-TINT extension ADDS the hue histogram (`accumulateHuePixel`/`resolveAmbientHue`) INSIDE that same loop. Without this hoist, that binning math lands as a private function in the glass composable — reachable by AMBIENT-TINT but NOT by the aurora album extractor without a re-import-of-a-glass-internal or a re-fork.
- **`src/composables/color/index.ts:118`** — `cssToOklch(css): OklchStop` (the value.js leaf, the ONE color-math source). The histogram's per-pixel sRGB→OKLCh conversion routes through THIS — `proof:single-color-core` is the fence (no hand-rolled rgb→oklch).
- **`composables/color/` is the established home** for OKLCh primitives + the ColorResolver seam (the value.js-only leaf — subpath `/color`). A pure binning accumulator belongs HERE, beside `cssToOklch`, not inside a glass observer.

## The mechanism

ONE internal HOIST — a pure relocation, byte-identical behaviour. NO new math, NO behaviour change, NO new dependency.

1. **Mint `src/composables/color/hueHistogram.ts`** — a pure stateless accumulator leaf exporting the binning core: `createHueHistogram()` / `accumulateHuePixel(hist, r, g, b, a)` / `resolveAmbientHue(hist): OklchStop | null` (the 12-bucket chroma×alpha-weighted accumulate + the modal-bucket → chroma-weighted circular-mean refine + the gray-null fall — chroma-weighted mass ~0 ⇒ null hue). It routes the per-pixel sRGB→OKLCh through `cssToOklch` (the value.js leaf, the ONE color source — `proof:single-color-core` holds). NO own canvas, NO own getImageData, NO own rAF — it is a pure function over pixel data the CALLER supplies.
2. **`useGlassBackdropLuminance.ts` RE-IMPORTS the leaf.** The BE.W-AMBIENT-TINT extension's per-pixel loop calls the hoisted `accumulateHuePixel` (in the SAME existing 32×32 loop — the free-rider discipline, no second pass) and `resolveAmbientHue` to write `--glass-ambient-hue`. The observer's BEHAVIOUR is byte-identical (the binning math is the SAME; only its HOME moved). NO second binning copy survives.
3. **BD.W-AUR-ALBUM's `deriveAuroraPalette` reads the SAME leaf** — its one-shot 32×32 album-art downsample bins through the hoisted `accumulateHuePixel`/`resolveAmbientHue` (the live observer AND the one-shot extractor read ONE accumulator). The album extractor adds a second free Float accumulator (median pixel L) in the same pass — a CALLER concern, not a histogram fork.

This is a HOIST, not a re-fork: ONE accumulator home, two callers (the live legibility observer + the one-shot album extractor), each supplying its own pixel data. `proof:single-color-core` + `proof:offscreen-pause` + `proof:ambient-hue` stay GREEN by construction (re-imported + re-asserted — the move is a relocation, not a behaviour change).

## The gate — proof:hue-histogram-hoist (NEW, H1-H4), born-RED → GREEN

A NEW device-free source gate — `proof:hue-histogram-hoist`, `["local","ci"]`. Born-RED by construction (`composables/color/hueHistogram.ts` ABSENT; the binning math lives inside the glass observer). ZERO pixels (a pure source-relocation consolidate — BB inv-4: no `proof:ba-gestalt`, no π; this wave closes on its source gate + self-test).

- **H1 — the leaf exists ONCE in `composables/color/`.** `hueHistogram.ts` exports the binning core (`createHueHistogram`/`accumulateHuePixel`/`resolveAmbientHue`) AND is a PURE accumulator (no own canvas/getImageData/rAF/DOM read — the caller supplies pixels). RED at HEAD.
- **H2 — the value.js color source.** The sRGB→OKLCh conversion routes through `cssToOklch` (the value.js leaf), NOT a hand-rolled rgb→oklch matrix (cross-asserts `proof:single-color-core`). RED if an inline Math-based oklch conversion lands in the leaf.
- **H3 — no second binning copy survives.** `useGlassBackdropLuminance.ts` RE-IMPORTS the hoisted leaf; there is NO second `accumulateHuePixel`/12-bucket loop anywhere in `src/` (the no-dual-path bite — a re-forked binning loop in `albumPalette.ts` OR a surviving inline copy in the glass observer REDs). RED at HEAD (the math is inline in the observer, un-hoisted).
- **H4 — the consumers read the ONE leaf.** Both `useGlassBackdropLuminance.ts` (the live observer) AND `albumPalette.ts` (the one-shot album extractor, once W-AUR-ALBUM lands) import the SAME `hueHistogram.ts` — a LIVING import census (re-run at W-AUR-ALBUM's close to enroll the second consumer; born-with-one-consumer, the second flips GREEN when AUR-ALBUM reads it — the W-SAFARI-CAPTURE born-RED-until-enrolled precedent for the second-consumer clause).
- **Self-test bites (each planted defect MUST red):** (a) a second inline `accumulateHuePixel`/12-bucket loop in any `src/` file → H3 RED (the no-dual-path bite); (b) a hand-rolled Math-based oklch conversion in `hueHistogram.ts` → H2 RED (cross-asserts single-color-core); (c) the leaf reaching for its own canvas/getImageData/rAF → H1 RED (the pure-accumulator bite); (d) the glass observer keeping its inline binning instead of re-importing → H3 RED.

**Extend-vs-new:** NEW gate `proof:hue-histogram-hoist` (the hoist + the no-dual-path census). `proof:single-color-core` is EXTENDED-NOT (cross-asserted — the histogram reads its leaf, no new color math). `proof:ambient-hue` (the AMBIENT-TINT home gate) + `proof:offscreen-pause` stay GREEN by construction (the observer's behaviour is byte-identical post-hoist — the binning math moved home, the loop/throttle/PRM-park are untouched).

## No π (zero-pixel consolidate)

This wave changes ZERO pixels — it is a pure source-relocation (the binning math moves from a glass-observer-private function to a `composables/color/` leaf; the observer's `--glass-ambient-hue` write is byte-identical). Per the anti-disease close-invariant (BB inv-4: a doc/source-relocation flip changes ZERO pixels), this wave carries NO `proof:ba-gestalt` and NO binding π. It closes on `proof:hue-histogram-hoist` (born-RED → GREEN) + the self-test bites + the cross-asserted `proof:single-color-core`/`proof:ambient-hue`/`proof:offscreen-pause` staying GREEN by construction. The PAINT verdict for the ambient-hue cast + the album field rides W-AMBIENT-TINT + W-AUR-ALBUM (their own binding π, which read this hoisted leaf).

## Fences

- **No-dual-path / no-legacy.** ONE accumulator home; the inline binning in the glass observer is DELETED (not parked — clean break, no alias); the observer re-imports the leaf. A re-forked binning loop anywhere reds H3. `proof:no-dual-path` GREEN.
- **No re-fork / one color source.** The histogram routes its sRGB→OKLCh through `cssToOklch` (the value.js leaf) — `proof:single-color-core` holds; no hand-rolled oklch matrix.
- **Pure-accumulator discipline.** The leaf owns NO canvas, NO getImageData, NO rAF, NO DOM read — it is a pure function over caller-supplied pixel data (the one-loop/no-second-pass discipline is the CALLER's; the leaf never schedules). The live observer keeps its ≤4Hz throttle + PRM single-sample + offscreen-park (byte-untouched — the move does not reach the loop).
- **Byte-identical behaviour.** The `--glass-ambient-hue` write is identical pre/post-hoist (the binning math is the SAME; only its home moved); `proof:ambient-hue`/`proof:offscreen-pause` GREEN by construction.

## Disposition links

- **HOIST / canonical-source `BD.W-HUE-HISTOGRAM-HOIST.md`** — a NEW consolidate row (the histogram leaf un-buried from the Band-6 aurora waves into the Band-1 consolidate band where a shipped-composable internal hoist belongs).
- **EXTRACTED FROM** the BE.W-AMBIENT-TINT extension of `useGlassBackdropLuminance.ts` (the binning math the extension adds) — re-homed to `composables/color/hueHistogram.ts`; the observer re-imports it.
- **READ BY** W-AMBIENT-TINT (the live `--glass-ambient-hue` legibility cast — consumer #1) AND W-AUR-ALBUM (the one-shot `deriveAuroraPalette` album extractor — consumer #2, the ≥2-consumer bar met by construction once AUR-ALBUM lands).
- **MINTS** `composables/color/hueHistogram.ts` (the ONE binning accumulator leaf).
