# AX.W00 — orchestrator integration + real-device live re-diagnosis

The W00 build agent stood up the π-lane machinery and self-proved the **device-free**
arms (`proof:gate-script-parity` RED-witnessed by a removed registration; the
`--spring-dock` token-peak RED-witnessed at 1.18). The **real-device pixel arms** are
the orchestrator's to run (a headless-software-GL fallback false-GREENs the very
defect the lane exists to catch). This record is that live run, on the real Metal box.

## Integration fixes applied (befitting orchestrator fixes to W00 deliverables)

The live run surfaced four real defects in the as-built gate that would have made the
lane non-load-bearing. Each fixed in-FileBounds (gate infra, no `src/` touch):

1. **Harness detection vs npm hoisting** (`proof-substrate-paints-color.mjs`,
   `proof-dock-animation-live.mjs`). The gates hard-checked
   `tests-visual/node_modules/@playwright/test`, but npm workspaces **hoist** the dep
   to the ROOT `node_modules` — so a correct install false-SKIPped the fail-CLOSED arm.
   Fixed: detection + the spawned `PW_BIN` now resolve across the workspace-local AND
   the hoisted-root layout.
2. **Readback mechanism** (`substrate-paints-color.spec.ts`). `ctx.drawImage(canvas)`
   + `getImageData` reads **EMPTY** for a WebGL2 canvas without
   `preserveDrawingBuffer:true` (the blob read 0.000 that way) and GPU-stalls on
   software GL. Rebuilt onto a **composited element `screenshot()` + pngjs decode** —
   the only robust cross-context readback (captures the displayed pixels regardless of
   the GL context). Blob non-flood is now **color-coverage vs the corner background**
   (a composited screenshot has no alpha, so a transparent margin reads as background).
   Added `pngjs` as a `tests-visual` devDep.
3. **Device backend** (`playwright.config.ts`). SwiftShader **crashes the aurora
   WebGL2 shaders** (renderer death). On a dev box we now render on the **real GPU**
   (`darwin → ANGLE-Metal`) — the TRUE render path the cardinal lesson demands, and
   stable; SwiftShader stays the GPU-less-CI fallback (`PI_ANGLE` override).
4. **Report capture** (`proof-substrate-paints-color.mjs`). The driver overrode
   `--reporter=json,list`, streaming JSON to stdout where the `list` lines corrupt it →
   "no parseable report". Fixed: `PLAYWRIGHT_JSON_OUTPUT_NAME` writes the report to the
   file the driver reads.

## Real-device verdict at HEAD (the born-RED witnesses — both confirmed BY EYE)

Run on the real Metal GPU against the live demo (`/substrates/aurora`,
`/substrates/goo-blob`). **The lane is load-bearing** — a real broken render turns it RED:

- **BLOB — born-RED (TRUE POSITIVE).** `BLOB_CONFIG_DEFAULTS` renders a **dark slab
  filling the canvas** (screenshot confirmed); coverage `0.991` ≫ the `0.70` non-flood
  ceil → `proof:substrate-paints-color` **RED**. This is the W08 flood, caught — the
  exact class every CPU oracle missed. Turns GREEN when **W08** un-floods the smin.
- **AURORA — dim WebGL2 paint passes the LOOSE floor (per spec design).** The WebGL2
  path renders **near-black with faint nuclei glows** (interior maxChannel ≈ 100); it
  passes W00's deliberately-loose `maxChannel > 0` floor (W00 owns ONLY "not totally
  black"; dimness/hue is **W10/W11**, the WebGPU-black is **W07**). The readback
  discriminates by construction (a black canvas → maxChannel 0 → RED).

So `proof:substrate-paints-color` is **born-RED at HEAD via the blob** — the correct
state. It flips GREEN when W08 (blob) lands; the aurora arm already passes the floor.

## Recorded limitation (PoC #1) — headless cannot exercise WebGPU

**`navigator.gpu` is `false` in headless Chromium even with `--enable-unsafe-webgpu`**
(both launches resolved to the WebGL2 path; byte-identical renders). So the headless
π-lane **cannot exercise the aurora WebGPU-black defect** (the live product's default
path) — it tests WebGL2 only. Per PoC #1's GO/NO-GO, the limitation is RECORDED: W07's
WebGPU-black verification needs **real WebGPU** — the orchestrator's real browser
(claude-in-chrome) or a Dawn-backed headless device — NOT this Playwright headless lane.

## Inheritances (carried into the fan-out dispatch)

- **W07 (aurora unblock):** the aurora is born-RED at HEAD. Its WGSL storage-buffer fix
  must be verified on **real WebGPU** (not this headless lane). Wave-open ritual: live
  real-browser re-diagnosis of the WebGPU-black AND whether the WebGL2 dim render is
  correct-resting vs broken. The screenshot+pngjs readback + real-GPU device is the
  inherited π-lane mechanism for `aurora-*.spec.ts`.
- **W08 (blob unblock):** the flood is confirmed (coverage 0.991, dark slab). `W08`'s
  `blob-render.spec.ts` inherits the screenshot+coverage readback; its TIGHT `0.25–0.60`
  band is a strict subset of W00's `0.10–0.70` floor.
- **W10/W11 (aurora perfection):** own the WebGL2 dimness + hue/chroma the loose W00
  floor intentionally passes.
- **CI safety (route to the J-band gate hardening / before W33 publish):** the π-lane's
  pixel arms are real-device; on a GPU-less CI runner without an installed browser binary
  they must SKIP befitting-silent (not false-RED). The `@playwright/test`-present +
  browser-binary-absent skip path is a hardening item before the gate fleet runs in CI.
