# Consumer evidence — the shared texture-upload primitive (`src/composables/glass/textureUpload.ts`)

BG.W-AUR-IMAGE-SOURCE. The ONE shared texture-upload primitive — the normalised decode
(`createImageBitmap(blob, {premultiplyAlpha:"none", colorSpaceConversion:"none"})`) + the
WebGL2 upload leg (explicit `UNPACK_PREMULTIPLY_ALPHA_WEBGL`/`UNPACK_COLORSPACE_CONVERSION_WEBGL`/
`UNPACK_FLIP_Y_WEBGL`) + the WebGPU upload leg (explicit `copyExternalImageToTexture({premultipliedAlpha:false}, flipY:false)`).

A photo entering a dual-engine (WebGL2 + WebGPU) shader family has ONE genuine cross-engine
hazard: the two backends DIFFER on premultiply/colour-space/flip-Y defaults (gpuweb #4356;
Safari's `copyExternalImageToTexture(ImageBitmap)` history). The primitive NORMALISES the
decode + declares the SAME flag set EXPLICITLY on both legs so a texture reads identically
on Chromium and WebKit. INTERNAL (off the public `src/composables/glass/index.ts` barrel, as
the WebGL2/WebGPU substrates are).

## ≥2 binary consumers

| # | consumer | how it composes | status |
|---|----------|-----------------|--------|
| 1 | `<Aurora source="image">` — the aurora WebGL2 leg (`auroraImageSource.ts armWebGL2ImageTexture` → `uploadImageTextureWebGL2`) + the WebGPU leg (`wgpuSetup.ts setupImageWGPU` → `uploadImageTextureWebGPU`) | the blurred-image aurora dissolves a decoded photo into the field's drift; both backends route their texture through the primitive | **LIVE** (this wave BUILDS the seam) |
| 2 | `BD.W-DOT-IMAGE` — the dot-matrix image variant (the dots sample a decoded photo) | consumes the SAME primitive for its texture (the first-to-land-builds contract: whichever of aurora-image / dot-image landed first BUILDS the seam, the other CONSUMES it) | **BOOKED** — dot-image was absent on disk at HEAD (grep `copyExternalImageToTexture|createImageBitmap` under `src/` → 0), so aurora-image BUILDS it; dot-image CONSUMES on its own landing |

The first-to-land-builds contract is recorded in `docs/tranches/BG/keystones/KS-PROCEDURAL.md §4.9`
and `EXECUTION-PROGRESS.md`. The primitive is minted with the ≥2-consumer bar met by
construction (aurora-image LIVE + dot-image booked); a single-consumer texture-upload primitive
would fail the J-invariant-10 substrate-without-consumer bar.

Machine-locked by `proof:aur-image` (I1 — the single-texture-primitive witness: both backends
route through the ONE primitive with the explicit flag set; a raw `texImage2D`/
`copyExternalImageToTexture` outside the primitive REDs).
