# W-A.4 · The GPU leg: aurora, blob and fourier floors read the WebGPU primary on Metal, with a chroma floor, and the tag verifies the receipt · 11.0.0

| field | value |
|---|---|
| seat | band-A wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `fabc95e2` in a scratch worktree, `dist-demo/` built there and served by `vite preview` on :5793 for three runs of `substrate-paints-color.spec.ts -g "aurora paints"` (Playwright Chromium headless, `PI_ANGLE` defaulting to `metal` on darwin, `playwright.config.ts:35-39`), the server stopped after each |
| ships in | 11.0.0 |
| families | F-08 whole (`audit/REGISTRY.md:254-265`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L02-F09 | the aurora floor catches only near-total black and only `release.sh` on a human's machine enforces it; the receipt check was routed since BJ and never built |
| L03b-11 | the WebGPU paint path is never paint-gated; CI never paints fourier |
| L04-F18 | the CI `Page.captureScreenshot` death is unowned; master goes green by re-run |
| R2-07-10 | the capture death is congenital SwiftShader frame starvation on the blob route (42 of 132 jobs) |
| census §8 datum (C-16) | the second signature, a blank droplet ("blob coverage 0.000", run 35810620398) |

## 2 · The defect at HEAD

- **The floors never read the primary.** `tests-visual/substrate-paints-color.spec.ts:371` `PI_FORCE_WEBGL` is on unless set to `"0"`; `forceWebGLFloorPath` (`:373-389`) removes `navigator.gpu` before the page loads, so the aurora and the blob arm WebGL2. Run with `PI_FORCE_WEBGL=0` on Metal: **1 failed** in 811 ms, `Error: aurora armed the "webgpu" engine, not the WebGL2 floor path. This gate reads back ONLY the deterministic WebGL2 path` (`:443`). On a real GPU the shipped engine is WebGPU, and the floor refuses to measure it.
- **The aurora floor passes a colourless canvas.** `:449` `AURORA_MEAN_CHANNEL_FLOOR = 8` on the interior's mean `max(R,G,B)`. With the black plant's fragment shader changed to emit `vec4(0.5,0.5,0.5,1.0)` (a scratch edit, restored), the arm **passed** on all 18 reads, mean channel 125.1 to 127.0 on 17 presets and 168.9 on SPEEDTEST (`1 passed (59.0s)`). The same run's DEFAULT capture has mean OKLCH chroma **0.0007** over the 15 %-inset interior; the green run's DEFAULT capture reads **0.1129** (appendix A). The banked 10.0.1 planted report (`BK/execution/2026-09-22-o23-o32-disposition/close/pi-report-planted-10.0.1.json`) already shows a dead canvas passing: SPEEDTEST planted black reads 137.7.
- **Green readings at HEAD** (Metal, WebGL2 path, the green run): mean channel 101.5 (VANGOGH) to 235.2 (DELIBERATIVE) over 18 reads, `1 passed (24.8s)`.
- **Fourier has no floor.** `grep -c fourier tests-visual/substrate-paints-color.spec.ts` gives 0.
- **A literal count pin.** `:593` `expect(presetKeys.length).toBe(17)`.
- **The software leg dies on capture.** `ci.yml:46` pins `PI_ANGLE: swiftshader` for the blob floor. `gh run list --workflow ci.yml --branch master --limit 40` gives 32 runs green on attempt 1, 5 failed on attempt 1 and never re-run (35801030729, 35800878302, 35796230547, 35795912396, 35795197236), and 3 green only on attempt 2 (35810620398, 35804259424, 35804004183). `gh run view 35810620398 --attempt 1 --log-failed` holds `Protocol error (Page.captureScreenshot): Unable to capture screenshot` twice, on `blob paints a non-blank droplet on BLOB_CONFIG_DEFAULTS`. The census's second signature for the same run (`census-carries-recap.md:43`) did not appear in the `--log-failed` text this seat read; it is carried as the census recorded it.
- **The aurora floor is enforced by a person.** `scripts/release.sh:37-50` runs the aurora and flood floors on the releasing machine; `release.yml:3-11` says a tag pushed without it "ships an un-floored aurora silently".

## 3 · The cure

1. **One GPU leg, on Metal, on the releasing machine.** A hosted macOS runner's GPU has not been measured by any seat, and a leg that can land on a software adapter would hide a dead primary behind a passing fallback (E-2). The leg is `npm -w tests-visual run gate:gpu`: Playwright Chromium with `--use-angle=metal --enable-unsafe-webgpu --ignore-gpu-blocklist`, the built demo served by `demo:dist:serve`, no `navigator.gpu` removal. `forceWebGLFloorPath` and `PI_FORCE_WEBGL` are deleted. Before the first read, the leg asserts `navigator.gpu.requestAdapter()` returns an adapter and that each substrate reports `engine: "webgpu"`; any other engine fails the leg. After W-G.1 deletes the WebGL2 arms, no other engine exists.
2. **Three substrates, three floors, each with its own plant.**
   - Aurora (G-47): per preset, the interior's mean OKLCH chroma ≥ 0.02, its mean OKLab L ≥ 0.10, and two captures 500 ms apart differ in at least 1 % of interior pixels (the frozen-frame class). Plants: `grey-aurora` (the WGSL fragment output replaced by opaque 0.5 grey at pipeline creation, through the page's own `GPUDevice.createShaderModule`), `black-aurora` (the same, opaque black), and `frozen-aurora` (the page's `requestAnimationFrame` stopped after the first frame). The acceptance also requires every preset's green chroma ≥ 0.04, twice the floor; a preset below it is a paint defect recorded born-RED to W-G.4, not a floor lowered.
   - Blob (G-48): the differential coverage floor and ceiling as today (`:667-760`), read on WebGPU, with `blob-blank` and `blob-flood`.
   - Fourier (G-55): the field's interior mean chroma ≥ 0.02 and a frame delta, as the aurora, with `grey-fourier` and `frozen-fourier` plants on its WGSL output.
   Plants are injected through the page's own GPU objects, never by a `getContext()` from the test side (the context-steal trap).
3. **The preset count comes from the source.** The literal at `:593` goes; the tile count must equal the sourced key count, as `:634-635` already asserts.
4. **A receipt the tag verifies.** `gate:gpu` runs the green leg and each plant leg and writes `release/gpu-receipt.json`: the adapter's `info` (vendor, architecture), the browser version, each reading, each plant's failure text, and a sha256 over the source closure of `src/components/{aurora,blob,fourier-field}`, `src/styles`, the spec and `_support/`. The releasing commit carries this file. `release.yml`'s `publish` job runs `node scripts/visual/verify-gpu-receipt.mjs`, which recomputes the sha256 on the tagged tree and fails if it differs, if any reading misses its floor, if any plant passed, or if any engine is not `webgpu`. The receipt is the DELTA; it is small and plain JSON, so it is tracked (a screenshot per substrate per leg goes to `.cache/visual/gpu/` and its sha256 into the receipt).
5. **No software leg.** The blob floor leaves `ci.yml` with the `pixel-floor` job (W-A.3 step 5); no job runs a substrate floor on SwiftShader, and no job retries. Both CI death signatures leave with it: the leg that produced them does not exist. `release.sh:37-50` is deleted; `release.sh` either shrinks to the version and clean-tree checks followed by `gate:gpu`, or is deleted if W-A.3's release workflow and this receipt cover its remaining lines (the wave decides by listing each remaining line's owner).

## 4 · Files it touches

- `tests-visual/substrate-paints-color.spec.ts` (split into `tests-visual/gpu/{aurora,blob,fourier}.spec.ts`, the WebGL2 forcing removed, the plants rewritten on WebGPU), `tests-visual/playwright.config.ts` (a `gpu` project with the Metal and WebGPU flags, matching `gpu/*.spec.ts` only), `tests-visual/package.json` (`gate:gpu`).
- `scripts/visual/verify-gpu-receipt.mjs` (new), `release/gpu-receipt.json` (new, written per release).
- `.github/workflows/release.yml` (the receipt check), `.github/workflows/ci.yml` (the `pixel-floor` job is already gone by W-A.3), `scripts/release.sh`.
- `tests/gates/roster.json` (G-47, G-48, G-55 turn `bound`).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| A4-G1 · the floor reads WebGPU | `npm -w tests-visual run gate:gpu` green leg, then `jq -e '[.substrates[].engine] \| all(. == "webgpu")' release/gpu-receipt.json` | exit 0 | **exit 1**: with the WebGPU primary allowed (`PI_FORCE_WEBGL=0`), the HEAD spec fails `aurora armed the "webgpu" engine, not the WebGL2 floor path` |
| A4-G2 · no forcing remains | `! grep -rqE 'forceWebGLFloorPath\|PI_FORCE_WEBGL\|navigator *, *.gpu.\|delete[^;]*navigator[^;]*\.gpu' tests-visual` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 10 lines in 3 files, first `substrate-paints-color.spec.ts:371`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`substrate-paints-color.spec.ts:371-389`) |
| A4-G3 · a colourless aurora fails | the `grey-aurora` plant leg | the aurora test fails on the chroma assertion for every preset | **passes at HEAD**: the grey shader plant read mean channel 125.1-168.9 on 18 of 18 reads, `1 passed`; DEFAULT chroma 0.0007 |
| A4-G4 · a frozen aurora fails | the `frozen-aurora` plant leg | fails on the frame-delta assertion | no frame-delta arm exists at HEAD: `sed -n 575,665p substrate-paints-color.spec.ts \| grep -ciE "frozen\|frame-delta\|two captures"` gives 0 |
| A4-G5 · fourier is floored | `test -e tests-visual/gpu/fourier.spec.ts` and its `grey-fourier` leg fails | both | **exit 1**: `grep -c fourier substrate-paints-color.spec.ts` gives 0 |
| A4-G6 · green chroma has margin | in the green receipt, every aurora preset's chroma ≥ 0.04 | exit 0 | DEFAULT reads 0.1129 on the WebGL2 path (appendix A); per-preset chroma is not measured at HEAD |
| A4-G7 · no preset literal | `! grep -rnE 'presetKeys(\.length)?\)\.to(Be\|Equal\|StrictEqual\|HaveLength)\([0-9]+\)' tests-visual` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 1 line in 1 file, first `substrate-paints-color.spec.ts:593`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`:593`) |
| A4-G8 · no software substrate leg | `! grep -rqiE 'swiftshader\|llvmpipe\|LIBGL_ALWAYS_SOFTWARE' .github/workflows` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 2 lines in 2 files, first `release.yml:5`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`ci.yml:46`) |
| A4-G9 · the tag verifies the receipt | `grep -q verify-gpu-receipt .github/workflows/release.yml`, and the verifier exits 1 on a receipt whose source hash is edited by one character | both | **exit 1**: no verifier |

A4-G1 alone could pass with a leg that skips the aurora; the receipt must hold a reading for every sourced preset, which the verifier checks against the preset source. A4-G3 alone could pass with a floor so high that the green leg fails too; the green leg in A4-G1 and the margin in A4-G6 hold that side.

## 6 · π and DELTA obligations

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the aurora, every preset | the demo's default (light) | Chromium on Metal, WebGPU; Playwright WebKit not applicable (the leg is the GPU leg); real Safari's WebGPU cell is W-A.6's | green and each of the three plants, per preset | mean OKLCH chroma, mean L, frame-delta share, engine |
| the blob, `BLOB_CONFIG_DEFAULTS` | light | the same | green, `blob-blank`, `blob-flood` | differential coverage |
| the fourier field, its story default | light | the same | green, `grey-fourier`, `frozen-fourier` | mean chroma, frame-delta share |

The HEAD half of the DELTA is this seat's two captures (appendix A) on the WebGL2 path; the wave's half is the first receipt.

## 7 · MIGRATION rows

None. No published surface changes.

## 8 · Ledger rows

Closes C-16 (`census-carries-recap.md:43`) and #53's GPU paint item (`census-register-b.md:43`: "Nothing gates the field's paint on a GPU … That is F-08's GPU-backed leg"). The aurora floor's routed receipt (BJ `TERMINAL-ROUTINGS.md:383` INC-2, carried in BK `PORT.md:180`) is built here, which ends that carry.

## Appendix A · the chroma reading

Both PNGs are the spec's own DEFAULT capture (`auroraCanvas.screenshot`, `:617-619`, 670×154), from two runs at `fabc95e2` on Metal through the WebGL2 path. Mean OKLab L and mean OKLCH chroma over the interior inset 15 % on each side:

```
aurora-green.png:      670x154 meanL=0.787 meanC=0.1129
aurora-grey-plant.png: 670x154 meanL=0.592 meanC=0.0007
```

The reader is 20 lines of Node over `pngjs` with the OKLab matrices of Björn Ottosson's reference; W-A.1's `_support/color.ts` is its home once it exists.
