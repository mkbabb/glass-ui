# W-VIZ-BROKEN-FIX — three broken procedural vizzes diagnosed live + fixed

**Tranche.** BD (union)
**Band.** viz/refine
**Build-spec.** `docs/tranches/BD/viz/refine/viz-broken-fix/BUILD-SPEC.md`
**Research.** `research-{root-cause,target,mechanism}.md` (all three live-diagnosed, convergent)
**Status.** SPEC (tranche-DEV) — execution awaits greenlight.

---

## 1 — The defect (verbatim user, 2026-06-23 BATCH 2 group C)

1. `/substrates/blob` — "broken TOTALLY"; "the dashed outline here does not follow the proper path"; "the hero text should NOT scroll like this on every page".
2. `/substrates/goo-dot` — "totally broken".
3. `/substrates/fourier-field` — "does not follow the cursor properly"; "These options do not even work".

**Live root-cause (real Metal-3 Chrome, dpr 2, zero shader/WebGPU console errors — NOT a crash):**
- **Dead config (D1 fourier, D2 goo-dot)** — the renderer captures a FROZEN config snapshot at setup (`const { config } = options`); the SFC feeds a `cfg.value` spread / a per-compute fresh object, so config edits never reach the per-frame loop. "Options do not even work" / "totally broken" (config).
- **WebGPU never selected (D3 blob+goo-dot)** — `requestDevice()` ≈3478ms > the 2500ms acquire-timeout → falls to WebGL2. Chrome renders on the fallback; the **WGSL primary (Safari) is the un-exercised "broken TOTALLY" surface**, masked here.
- **Ghost ellipse (D4)** — the WatercolorDot ghost strokes a hardcoded `<ellipse rx=46 ry=46>`, NOT the seeded `border-radius` silhouette the solid fills. "Does not follow the proper path."
- **Cursor X-scrub (D6 fourier)** — `headT = pointer.smoothedPosition.x % 1` teleports the loop phase (X only, Y ignored, lag). "Does not follow the cursor properly."
- **D5 hero scroll** — `.story-hero-shrink` `scale(1→0.5)` sticky on EVERY page, overlapping the body — FOLDS into `W-STICKY-TITLE-CONDENSE`; this wave carries only the gentle-condense recipe rider.

---

## 2 — The fix (compose the shipped primitives, no second engine, no re-fork)

| # | Fix | Mechanism (the SHIPPED primitive reused) |
|---|-----|------------------------------------------|
| D1 | fourier config-live | a live forward-through `renderConfig` Proxy over `cfg.value` (the GooBlob `renderConfig` Proxy precedent) + a deep-config wake watcher |
| D2 | goo-dot config-live | the SAME Proxy over the prop; `const field = config.field` → `getField()` live; the story passes the stable reactive object (drops the per-compute spread) |
| D3 | WebGPU device warm + ceiling | a module-memoised `acquireSharedDevice()` (ONE cold acquire, many contexts — the standard WebGPU pattern) + `WEBGPU_ACQUIRE_TIMEOUT_MS` 2500→6000 + WGSL-parity paint-verify on a live device |
| D4 | ghost silhouette | a dashed-border `<div>` reading `borderRadius: activeBorderRadius` (the SAME `blob.borderRadius` seed) — a CSS border hugs its own radius, tracing the silhouette exactly; the wet filter wobbles it organic |
| D6 | fourier cursor 2-D follow | a velocity scrub (`headT += velocity.x * SCRUB_GAIN`, continuous, no teleport) + an additive `uPointer`/`uPointerStrength` 2-D attract uniform (the goo-blob `uPointer` lean idiom); PRM `tick(0)`-frozen |
| D5 | hero condense (rider) | `scale(0.5)→scale(0.82)`, range 240→160px, + an eyebrow/blurb `scroll()` fade; tokenized (`--hero-condense-*`); the full reserve is W-STICKY-TITLE-CONDENSE's |

**Liquid-weight law** — D6 reads the ONE `usePointerVelocityField` (inertia/velocity/burst, the velocity-continuous scrub + the spatial lean); no hop, no teleport, no laggy drift. **Compositor-only · PRM-carved · Safari-safe** (the WGSL primary paint-verified, the WebGL2 net the floor, the ghost filter static-cached, the hero scroll native+gated). **Warm identity** — the viz palettes ship warm-cream (gate-guarded); the fourier curve violet `--motion-accent`; no gray, no teal-on-navy.

---

## 3 — The gate sketch (REAL, born-RED on the current defect)

### 3a — NEW π gate `tests-visual/viz-broken-fix.spec.ts` (LOCAL-only, real GPU, both modes)

The BINDING paint. Each arm born-RED on the HEAD tree, GREEN at fix. Headless CI backstops via `proof:live-verified-ledger`; the binding paint is the local run.

```ts
// tests-visual/viz-broken-fix.spec.ts (sketch)
import { test, expect } from "@playwright/test";

// A frame fingerprint helper — a cheap downsampled pixel-hash of the viz canvas, so
// "the render CHANGED" is decidable without a golden image (the close-class anti-lie).
async function canvasHash(page, selector: string): Promise<string> {
    return page.evaluate((sel) => {
        const c = document.querySelector(sel) as HTMLCanvasElement;
        const o = document.createElement("canvas");
        o.width = 32; o.height = 32;
        const ctx = o.getContext("2d")!;
        ctx.drawImage(c, 0, 0, 32, 32);
        return [...ctx.getImageData(0, 0, 32, 32).data].join(",");
    }, selector);
}

// ── D1: fourier config is LIVE ──────────────────────────────────────────────
// BORN-RED: today N=4 ≡ N=16 (the frozen snapshot) → hashes equal → fail.
test("fourier-config-live — Harmonics N re-renders the curve", async ({ page }) => {
    await page.goto("/substrates/fourier-field");
    await page.waitForTimeout(800);
    const before = await canvasHash(page, ".fourier-field-canvas");
    // drive the Harmonics(N) slider 4 → 16 (the studio control)
    await page.getByRole("slider", { name: /harmonics/i }).fill("16");
    await page.waitForTimeout(600);
    const after = await canvasHash(page, ".fourier-field-canvas");
    expect(after).not.toBe(before); // the dense reconstruction MUST differ from N=4
});

// BORN-RED: the Source select is dead (the most-likely no-op option).
test("fourier-config-live — Source select re-mints the spectrum", async ({ page }) => {
    await page.goto("/substrates/fourier-field");
    await page.waitForTimeout(800);
    const before = await canvasHash(page, ".fourier-field-canvas");
    await page.getByRole("combobox", { name: /source/i }).selectOption({ index: 1 });
    await page.waitForTimeout(600);
    expect(await canvasHash(page, ".fourier-field-canvas")).not.toBe(before);
});

// ── D2: goo-dot config is LIVE ──────────────────────────────────────────────
// BORN-RED: the variant toggle never reaches the captured-once config.
test("goo-dot-config-live — variant select re-renders the field", async ({ page }) => {
    await page.goto("/substrates/goo-dot");
    await page.waitForTimeout(800);
    const before = await canvasHash(page, ".goo-dot-matrix-canvas");
    await page.getByRole("button", { name: /dot-dither/i }).click(); // variant chip
    await page.waitForTimeout(600);
    expect(await canvasHash(page, ".goo-dot-matrix-canvas")).not.toBe(before);
});

// ── D4: the WatercolorDot ghost traces the SEEDED silhouette ─────────────────
// BORN-RED: today the ghost is an <ellipse> overlay — the ghost box has NO
// border-radius matching the solid's seeded superellipse.
test("watercolor-ghost-traces-silhouette", async ({ page }) => {
    await page.goto("/substrates/blob"); // the ghost row
    await page.waitForTimeout(400);
    // a solid + a ghost of the SAME color+seed (the demo renders the pair)
    const solid = page.locator('[data-variant="solid"]').first();
    const ghost = page.locator('[data-variant="ghost"]').first();
    const solidRadius = await solid.evaluate((e) => getComputedStyle(e).borderRadius);
    // the ghost's TRACED outline (the .watercolor-ghost-stroke div) must inherit the
    // SAME seeded border-radius — NOT 50%/ellipse, NOT the box's own default.
    const ghostStrokeRadius = await ghost
        .locator(".watercolor-ghost-stroke")
        .evaluate((e) => getComputedStyle(e).borderRadius);
    expect(ghostStrokeRadius).toBe(solidRadius);      // ONE shape source
    expect(ghostStrokeRadius).not.toMatch(/^50%/);    // not a circle/ellipse
    // and the stroke element EXISTS as a bordered div, not an <ellipse>
    await expect(ghost.locator("ellipse.watercolor-ghost-stroke")).toHaveCount(0);
    await expect(ghost.locator("div.watercolor-ghost-stroke")).toHaveCount(1);
});

// ── D6: the fourier cursor FOLLOWS (velocity scrub + 2-D lean, no teleport) ──
// BORN-RED: today head_t teleports to pointerX; the test asserts CONTINUITY (a
// pointer move advances head_t by a velocity term, never a jump-to-X), via the
// exposed setHeadT/headT seam + a uPointerStrength>0 readback.
test("fourier-cursor-follows — velocity scrub + 2-D lean", async ({ page }) => {
    await page.goto("/substrates/fourier-field");
    await page.waitForTimeout(800);
    const canvas = page.locator(".fourier-field-canvas");
    const box = await canvas.boundingBox();
    // a smooth sweep (not a jump) — head_t must advance continuously, NOT teleport.
    const samples: number[] = [];
    for (let i = 0; i <= 8; i++) {
        const x = box!.x + box!.width * (0.2 + 0.07 * i);
        await page.mouse.move(x, box!.y + box!.height * 0.5, { steps: 2 });
        await page.waitForTimeout(60);
        samples.push(await page.evaluate(() =>
            (window as any).__fourierHeadT ?? 0)); // demo exposes the head_t for the π
    }
    // continuity: no single step jumps more than a small bound (a teleport would spike).
    const maxStep = Math.max(...samples.slice(1).map((v, i) =>
        Math.min(Math.abs(v - samples[i]), 1 - Math.abs(v - samples[i]))));
    expect(maxStep).toBeLessThan(0.2); // weighted scrub, not a teleport
    // the 2-D follow uniform is engaged (the demo exposes it for the π).
    expect(await page.evaluate(() =>
        (window as any).__fourierPointerStrength ?? 0)).toBeGreaterThan(0);
});

// ── D3 (conditional): WebGPU is SELECTED + WGSL paints parity ────────────────
// BORN-RED on metal-3 Chrome today (always webgl2 — the 2500ms timeout wins).
test("gpu-backend-selected — webgpu chosen on a capable host", async ({ page }) => {
    await page.goto("/substrates/blob");
    await page.waitForTimeout(2000); // allow the (now-warmed, 6s-ceiling) acquire
    const backend = await page.evaluate(() =>
        (window as any).__blobBackend ?? "webgl2"); // demo exposes the resolved backend
    test.skip(backend === "webgl2", "host has no usable WebGPU — WebGL2 net (acceptable floor)");
    expect(backend).toBe("webgpu");
    // and the WGSL arm paints a non-empty smooth field (not a blank/boxy degenerate).
    const nonEmpty = await page.evaluate(() => {
        const c = document.querySelector(".goo-blob-canvas") as HTMLCanvasElement;
        const o = document.createElement("canvas"); o.width = 16; o.height = 16;
        const ctx = o.getContext("2d")!; ctx.drawImage(c, 0, 0, 16, 16);
        return [...ctx.getImageData(0, 0, 16, 16).data].some((v, i) => i % 4 === 3 && v > 8);
    });
    expect(nonEmpty).toBe(true);
});
```

> The π exposes `__fourierHeadT` / `__fourierPointerStrength` / `__blobBackend` on `window` via the existing `defineExpose` seams (the demo wires a thin debug-bridge for the capture, the `proof:live-verified-ledger` precedent — no production surface change). The D3c WGSL↔WebGL2 ΔE parity is the `proof:gpu-substrate-single` re-run on the live device, not re-implemented here.

### 3b — EXTEND-IN-PLACE `scripts/proof-no-gray.mjs` (the `viz-palette-warm` SOURCE arm)

A born-GREEN REGRESSION GUARD (no new gate, no new KEY): resolve the four viz DEFAULT palettes to OKLab + assert each clears `STRONG_FLOOR` (0.02) at the warm hue `H ∈ [45, 85]°`.

```js
// proof-no-gray.mjs — the viz-palette-warm arm (ADD; the plate/ladder/dark arms untouched)
const VIZ_DEFAULT_PALETTES = [
    { name: "goo-dot WARM_IDENTITY_PALETTE", stops: WARM_IDENTITY_PALETTE },
    { name: "goo-blob BLOB_CONFIG_DEFAULTS", stops: BLOB_CONFIG_DEFAULTS.color.paletteStops },
    { name: "fourier DEFAULT_FOURIER_CONFIG", stops: DEFAULT_FOURIER_CONFIG.palette },
    { name: "dot-matrix DEFAULT_DOT_MATRIX_CONFIG", stops: DEFAULT_DOT_MATRIX_CONFIG.palette },
];
for (const { name, stops } of VIZ_DEFAULT_PALETTES) {
    for (const stop of stops) {
        const ok = toOklab(stop); // the existing OKLab helper
        record(`viz-palette-warm: ${name}`,
            ok.C >= STRONG_FLOOR && ok.H >= WARM_HUE_LO && ok.H <= WARM_HUE_HI,
            `C=${ok.C.toFixed(3)} (≥${STRONG_FLOOR}) H=${ok.H.toFixed(1)}° (in [${WARM_HUE_LO},${WARM_HUE_HI}])`);
    }
}
```

### 3c — RE-RUN (no edit) `proof:gpu-substrate-single`
The WGSL↔WebGL2 parity bar (mean ΔE ≤ 2.0 / p99 ≤ 5.0) re-runs on a LIVE WebGPU device (now reachable via D3a/D3b). If the WGSL arm diverges (the Safari "broken"), the smin/`fwidth` parity edit re-greens it.

### 3d — Cross-gate no-regression (GREEN by construction)
`proof:viz-fourier`, `proof:viz-hybrid` (additive uniform at strength 0 = byte-untouched), `proof:no-layout-animation`, `proof:offscreen-pause`, `proof:single-color-core`, `proof:gpu-substrate-single` clause A.

---

## 4 — Acceptance (the gestalt bar, LIVE both modes, WebGL2 arm AND WGSL arm where a device runs it)

A viz is `complete` IFF:
- [ ] **fourier** — every configurator control is tested + WORKS (Source select re-mints; each slider/toggle visibly changes the curve; ZERO dead options); the cursor genuinely follows (velocity scrub + 2-D lean, continuous, no teleport, liquid weight); the plate reads WARM; the curve strokes the violet `--motion-accent`; PRM freezes the field.
- [ ] **goo-dot** — the variant/interactive controls reach the renderer LIVE; the dot-cloud reads as a dense warm goo (the config-live fix unblocks the variant the user could not toggle); PRM one-static-frame.
- [ ] **blob** — the WatercolorDot ghost traces the solid's EXACT seeded silhouette (≤~1px, not an ellipse); the hero condenses gently (not a half-zoom) + does not overlap the body; (D3) the WGSL arm paints the smooth lit metaball on a real device, parity with WebGL2.
- [ ] **all three** — compositor-only, PRM-carved, Safari/WebGL2-WGSL parity; warm identity (never gray/teal); the motion carries liquid weight.

A PASS with a fourier option still dead, the cursor still X-teleport, the ghost still an ellipse, or the WGSL arm still un-verified is the close-class lie — FORBIDDEN.

---

## 5 — Fences (FROZEN — do NOT touch)

- `createCanvasLifecycle` schedule / suspend Set / device-loss breaker (FIX-5's reveal-remeasure + the per-canvas self-heal stay).
- The GL/WGSL COLOR math (`procedural-color.{glsl,wgsl}.ts` — the ONE color source; `uPointer` is a geometry bend, not a hue edit).
- The viz spring/tempo clocks (`DOCK_SPRING` / `field.tempo` / `periodS` — couple, never re-time).
- The `--card` warm lift + `WARM_PLATE_FLOOR` (the sibling glass-abrogate-gray wave's — this wave EXTENDS the gate with the viz arm, never touches the plate arms).
- The C3 paper-grid + C6 concentric RESPECs + the C4 dot-matrix gravity/2d-bg (shader-content / separate waves — OUT of scope).

## 6 — MIGRATION

None. D1/D2 config-live is an internal wiring fix (the public prop surface is unchanged — a configurator edit simply NOW reaches the renderer). D4 ghost is a render-shape fix behind the SAME `variant="ghost"` prop. D3 is a substrate device-warm + ceiling raise (the public handle surface is unchanged). D6 is an additive `uPointer` uniform (default-OFF). D5 is the demo chassis (`story-hero.css`) only. `--watercolor-ghost-weight` is a NEW additive tunable token (default `2px` — byte-identical at the default).
