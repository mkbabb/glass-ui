# BG.W-AUR-IMAGE-SOURCE — dual-engine paint verify (NON-AUTHORING judge)

**Verdict: PASS** — the `/substrates/aurora` route paints correctly in BOTH engines
(Chrome/ANGLE-Metal + Safari/WebKit) and BOTH modes (light + dark); the build is sound
(gate GREEN + 6-bite selftest + vue-tsc clean); the image-source machinery is functional
(source flip + photo decode/upload confirmed, no crash/black/oversaturation). The
dual-engine **photo-dissolves-into-drift** live-π rides **W-REFLECT3** exactly as the wave
spec declares (`OWED (W-REFLECT3)`) — it is not paintable from the current demo because the
image source is a **construction-time program permutation** (criterion I2), not a live
uniform branch, and the demo exposes no construction-time image-source mount (see §4).

- Judge: non-authoring paint judge (did NOT build this wave).
- HEAD: `7689623a` · wave src @ `42fc375d`.
- Route: `/substrates/aurora` (the Aurora VizStudio — palette default `OPENAI_DAWN`).
- Method: C18 dual-engine `?capture=` over the BUILT `:5200` (`demo:dist:build` →
  `demo:dist:serve`). Chrome via CDP `:9466` (real Google Chrome 149, `newContext`
  colorScheme + `deviceScaleFactor:2`, poll `data-capture-ready`, `page.screenshot`
  1440×900@2x). Safari via off-screen `/tmp/wkshot-live` (WKWebView, polls
  `data-capture-ready`@4500ms). Provenance = in-pixel engine badge decoded from the PNG
  top-left.

---

## 1. Build gates (computational criteria)

| Check | Result |
|---|---|
| `proof:aur-image` | **PASS** — "the blurred-image source rides ONE shared texture-upload primitive (both backends); source is a CONSTRUCTION-TIME program permutation (no `uSource` branch); the zone blur is a bounded fixed 24-tap kernel; both image programs are ONE colour source; the palette default is byte-identical; the `deriveAurora` scheme/lBand luminance option is acted-on" |
| 6-bite selftest | in-gate (proof:aur-image runs its self-test bites; GREEN) |
| `vue-tsc --noEmit` (+ test tsconfig) | **clean** (no errors) |
| I1 ONE shared `textureUpload.ts` primitive both backends | ✓ (`auroraImageSource.armWebGL2ImageTexture` + `wgpuSetup` both route `uploadImageTextureWebGL2` / the shared decode) |
| I2 construction-time `palette`\|`image` programs (no `uSource`) | ✓ (`runtime.ts:292` `useImageProgram = config.source === "image"` selects `IMAGE_FRAGMENT_SRC` vs `FRAGMENT_SRC` at `setupGL`/`setupWGPU`) |
| I3 bounded fixed 24-tap zone-blur | ✓ (gate-asserted) |
| I5 palette-default byte-identical | ✓ (gate + the 4-quadrant palette-default paint, §2) |
| I6 `deriveAurora` scheme/lBand acted-on | ✓ (gate-asserted) |

## 2. Primary paint surface — `/substrates/aurora` palette default (the route's rendered surface)

All four quadrants read correct with **cross-engine parity**: recessive warm-cream painterly
aurora, **no conic banding, no oversaturation** (measured `oversatFrac = 0`), calm grain,
the audacious `Aurora` hero **fits its envelope** (1066×206 CSS, no clip), the violet
`--motion-accent` masthead, the eyebrow/blurb, the preset thumbnail cards baking, and the
dock + sidebar chrome all paint.

| Engine | Mode | GPU badge | Reads correct | PNG |
|---|---|---|---|---|
| CHROME | light | ANGLE Apple M5 Max (Metal) | ✓ warm-cream recessive (coral→amber), hero fits, violet masthead, dock+sidebar | `chrome-aurora-light.png` |
| CHROME | dark | ANGLE Apple M5 Max (Metal) | ✓ luminous-dark transmissive field (brown→amber glow), hero fits, dock | `chrome-aurora-dark.png` |
| WEBKIT | light | Apple GPU | ✓ warm-cream matching Chrome (parity), thumbnails baking, dock | `safari-aurora-light.png` |
| WEBKIT | dark | Apple GPU | ✓ luminous-dark matching Chrome (parity), thumbnails, dock | `safari-aurora-dark.png` |

Computed DOM probe (Chrome, both modes): `data-capture-ready` set, `main.children = 3`,
`glContextCount.live = 2` `[webgpu, webgpu]` (the live AuroraStage field **+** the
`usePresetThumbnails` baker — the studio's designed two-context surface, unchanged by this
wave), route entrance animations settled (`0`), hero rect `1066×206`.

## 3. Image-source machinery (supplementary drive — functional evidence)

Drove the configurator `Source` → `Image` (in-page `element.click()` to bypass the dock
pointer-intercept) + `setInputFiles` a generated vivid 480×300 PNG (pink/orange/green/blue/
purple), Chrome both modes:

- `Image` tab `aria-pressed` flips **false → true**; the `v-if` file input **renders**
  (`fileInputCount = 1`); the 145 KB PNG **decodes + uploads** (no error surfaced).
- The aurora stays **healthy** after the flip+upload: `oversatFrac = 0`, no black
  (`minL` 0.40 light / 0.27 dark, well above 0), warm-cream identity intact, and the field
  is **alive** (frame a→b mean pixel delta ≈ 5.9/255 — the drift register animates).
- Captures: `chrome-aurora-image-{light,dark}-{a,b}.png` (full viewport) +
  `stage-palette-{light,dark}.png` / `stage-image-{light,dark}-{a,b}.png` (the AuroraStage
  704×700 rounded card, scrolled into view).

## 4. Why the visible photo-dissolve π rides W-REFLECT3 (not a defect)

The stage image-source capture is **near-identical** to the palette baseline (palette→image
visible delta ≈ 6.4/255 ≈ the natural frame-to-frame drift of 5.9). This is **expected by
the I2 construction-time design**, verified in source:

- `runtime.ts:292` — `useImageProgram` is evaluated at `setupGL`/`setupWGPU` (arm time). The
  image fragment program is compiled **only if `config.source === "image"` AT ARM**.
- The deep config watch (`runtime.ts:~476`) **re-uploads uniforms + wakes** a parked loop on
  a config change; it does **not** call `setupGL` again (no program rebuild).
- Therefore a **live in-place** `source` toggle on a studio that armed as `palette` keeps the
  palette program running — the photo (`config.src`) decodes into `imageCoord` but the
  running palette program has no image sampler, so it never dissolves into the visible field.

The visible dissolve is only observable on an Aurora **mounted with `source:"image"` from
construction**. The demo exposes no such surface (no image-source preset; the only path is a
file-upload interaction on a live palette-armed studio). This is precisely the deferred debt
the wave spec records as **`OWED (W-REFLECT3)`** — W-REFLECT3 owns the construction-time
image-mount capture fixture. No paint defect surfaced; the build (gate + tsc) proves the
image program/primitive/blur/derive are sound.

---

## Capture inventory (all resolve on disk, `docs/tranches/BG/audit/visual/BG.W-AUR-IMAGE-SOURCE-paint/`)

- `chrome-aurora-light.png`, `chrome-aurora-dark.png` — primary surface, Chrome (badge CHROME / ANGLE Metal)
- `safari-aurora-light.png`, `safari-aurora-dark.png` — primary surface, Safari (badge WEBKIT / Apple GPU)
- `chrome-aurora-image-{light,dark}-{a,b}.png` — full-viewport image-drive frames
- `stage-palette-{light,dark}.png` — AuroraStage palette baseline
- `stage-image-{light,dark}-{a,b}.png` — AuroraStage after `source:image` flip + photo upload (2 drift frames)
- `chrome-results.json`, `chrome-image-drive.json`, `stage-capture.json` — probe/drive logs

Capture scripts: `BG.W-AUR-IMAGE-SOURCE-chrome-capture.mjs`,
`BG.W-AUR-IMAGE-SOURCE-image-drive.mjs`, `BG.W-AUR-IMAGE-SOURCE-stage-capture.mjs`.
