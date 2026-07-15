// AX.W16 — proof:blob-integration, the blob's INTEGRATION π-lane gate.
//
// The structural antidote to the static-defineExpose-string class that let a DEAD
// pause seam ship GREEN: Blob.vue DISCARDED the renderer return, so the documented
// WCAG-2.2.2 DockBackgroundToggle pause()/resume() seam was `undefined` at every
// consumer — and EVERY static blob gate passed over it (typecheck green, the methods
// exist on the discarded return TYPE). Only a LIVE rAF-park observation catches the
// class. This spec mounts the REAL <Blob> + a wired <DockBackgroundToggle> on a real
// device, clicks pause, and asserts the render loop ACTUALLY PARKS (the displayed
// frames stop changing) — NOT a `defineExpose`-string regex.
//
// THREE assertions (all born-RED at the pre-wave HEAD eaba94f):
//   1. PAUSE PARKS THE LOOP — a running blob's composited frames DIFFER frame-to-frame
//      (the membrane warps, satellites orbit); clicking the DockBackgroundToggle parks
//      the substrate rAF, so the frames stop changing (inter-frame diff → ~0); clicking
//      again RESUMES (the frames change again). Born-RED: the dead seam never parked.
//   2. MULTI-INSTANCE CONTEXT BOUND — the re-cast blob stories hold a BOUNDED number of
//      live WebGL2 contexts (the WatercolorDot static-register routing). Born-RED: the
//      pre-wave stories mounted 5 (goo-blob) + 2 (blob-mood) GL blobs, hitting the cap.
//   3. README-vs-CODE defineExpose CONSISTENCY — every method the README "Exposed"
//      table lists appears in Blob.vue's defineExpose (or the prop/emit surface).
//      Born-RED: the table listed pause()/resume() that the expose OMITTED.
//
// READBACK MECHANISM (inherited from AX.W00 — the composited screenshot + pngjs). A
// WebGL2 canvas with preserveDrawingBuffer:false reads EMPTY via getImageData; the
// robust readback is a COMPOSITED element screenshot decoded with pngjs — it captures
// exactly the DISPLAYED pixels, which FREEZE when the rAF parks. So the pause-park is
// observed as "the displayed image stops changing", the live rAF-park witness.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

test.setTimeout(180_000);

const LIBRARY_ROOT = fileURLToPath(new URL("..", import.meta.url));

// The interactive-hero story carries the wired DockBackgroundToggle (the fixture).
// AY.W-BLOB2 — the AX IA consolidation folded the interaction/mood stories into the ONE
// `substrates/blob` page (the prior dedicated `blob-interaction`/`blob-mood` routes are
// gone — the stale paths timed this gate out). The interaction hero + its wired
// DockBackgroundToggle live on that page.
const BLOB_INTERACTION_PATH = PI_TARGETS.blob.path;

/** Composited element screenshot → decoded RGBA. */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/** Mean per-pixel |Δ| between two equal-size frames (the inter-frame motion measure). */
function frameDelta(a: PNG, b: PNG): number {
    if (a.width !== b.width || a.height !== b.height) return Infinity;
    const { data: da } = a;
    const { data: db } = b;
    let sum = 0;
    let n = 0;
    for (let i = 0; i < da.length; i += 4) {
        sum +=
            Math.abs(da[i]! - db[i]!) +
            Math.abs(da[i + 1]! - db[i + 1]!) +
            Math.abs(da[i + 2]! - db[i + 2]!);
        n++;
    }
    return n === 0 ? 0 : sum / n;
}

/** The MAX inter-frame delta over a short window — the "is it animating?" measure. */
async function motionOverWindow(canvas: Locator, page: Page, frames = 5): Promise<number> {
    let prev = await grab(canvas);
    let maxDelta = 0;
    for (let f = 0; f < frames; f++) {
        await page.waitForTimeout(120);
        const cur = await grab(canvas);
        maxDelta = Math.max(maxDelta, frameDelta(prev, cur));
        prev = cur;
    }
    return maxDelta;
}

test.describe("blob-integration (π lane — the WCAG-2.2.2 pause seam + context bound + README consistency)", () => {
    test("the DockBackgroundToggle pause seam PARKS the render loop (live rAF-park observation)", async ({
        page,
    }) => {
        await page.goto(BLOB_INTERACTION_PATH);
        const blobCanvas = page
            .locator('canvas[data-testid="goo-blob-canvas"]')
            .first();
        await blobCanvas.waitFor({ state: "visible", timeout: 20_000 });
        // Let the demand-driven loop settle into the resting droplet pose.
        await page.waitForTimeout(600);

        // 1. RUNNING — the membrane warps + satellites orbit, so the composited frames
        // CHANGE frame-to-frame. A motion floor proves the blob is actually animating
        // BEFORE we pause it (else the pause assertion is vacuous).
        const runningMotion = await motionOverWindow(blobCanvas, page);
        expect(
            runningMotion,
            `the running blob shows almost no inter-frame motion (${runningMotion.toFixed(3)}) — the loop is not animating, so the pause-park assertion would be vacuous`,
        ).toBeGreaterThan(0.05);

        // 2. PAUSE — click the DockBackgroundToggle (the WCAG-2.2.2 control). The
        // v-model:paused → renderer.pause() → substrate suspend('manual') chain parks
        // the rAF, so the displayed frames STOP changing.
        const toggle = page
            .locator('[data-testid="blob-pause-toggle"] button')
            .first();
        await toggle.waitFor({ state: "visible", timeout: 10_000 });
        await toggle.click();
        // Let the in-flight frame finish + the loop park.
        await page.waitForTimeout(400);
        const pausedMotion = await motionOverWindow(blobCanvas, page);
        expect(
            pausedMotion,
            `after clicking the DockBackgroundToggle the blob STILL animates (inter-frame motion ${pausedMotion.toFixed(3)}) — the pause seam did not park the render loop (the dead-seam class: a discarded renderer return / unexposed pause)`,
        ).toBeLessThan(runningMotion * 0.25 + 0.01);

        // 3. RESUME — click again; the loop re-arms and the frames change once more.
        await toggle.click();
        await page.waitForTimeout(400);
        const resumedMotion = await motionOverWindow(blobCanvas, page);
        expect(
            resumedMotion,
            `after a second DockBackgroundToggle click the blob did NOT resume animating (inter-frame motion ${resumedMotion.toFixed(3)}) — resume() did not re-arm the loop`,
        ).toBeGreaterThan(0.05);
    });

    test("the re-cast blob stories hold a BOUNDED number of live WebGL2 contexts (the WatercolorDot routing)", async ({
        page,
    }) => {
        // Count the live goo-blob GL canvases on each blob story. The re-cast routes the
        // static register to WatercolorDot (zero GL context) and reserves Blob for
        // the interactive/lit hero(es), so no single story mounts an unbounded count.
        const CAP = 6; // comfortably under the ~8 Chromium per-page cap
        // AY.W-BLOB2 — the consolidated `substrates/blob` page is the ONE blob story (the
        // interaction + mood + static stories folded into it); it mounts exactly TWO live
        // GL contexts (the interaction + mood heroes), the static register routed to
        // WatercolorDot (zero GL). The prior three separate routes collapsed onto it.
        for (const path of [PI_TARGETS.blob.path]) {
            await page.goto(path);
            await page
                .locator('canvas[data-testid="goo-blob-canvas"]')
                .first()
                .waitFor({ state: "visible", timeout: 20_000 });
            const count = await page
                .locator('canvas[data-testid="goo-blob-canvas"]')
                .count();
            expect(
                count,
                `${path} mounts ${count} live <Blob> GL contexts — exceeds the bound ${CAP} (route the static register to WatercolorDot; reserve Blob for the interactive hero — the per-page WebGL context cap)`,
            ).toBeLessThanOrEqual(CAP);
        }
    });

    test("README-vs-code defineExpose CONSISTENCY — every README 'Exposed' method is on the Blob surface", () => {
        const readme = readFileSync(
            `${LIBRARY_ROOT}src/components/blob/README.md`,
            "utf8",
        );
        const sfc = readFileSync(
            `${LIBRARY_ROOT}src/components/blob/Blob.vue`,
            "utf8",
        );

        // Parse the README "### Exposed" table: each TABLE ROW's FIRST cell names a
        // method (`name()` or `a()` / `b()`). Scope to lines starting with `|` (the
        // table body) so the `### Exposed (via \`defineExpose\`)` HEADING's backtick is
        // NOT mistaken for a method.
        const exposedSection = readme.split(/###\s*Exposed/)[1] ?? "";
        const tableBody = exposedSection.split(/\n##/)[0] ?? "";
        const methodNames = new Set<string>();
        for (const line of tableBody.split("\n")) {
            if (!line.trimStart().startsWith("|")) continue; // table rows only
            // The FIRST cell (between the first two pipes) holds the method name(s).
            const firstCell = line.split("|")[1] ?? "";
            if (/^\s*-+\s*$/.test(firstCell)) continue; // the `|---|` separator row
            for (const m of firstCell.matchAll(/`([a-zA-Z]+)(?:\(\))?`/g)) {
                const name = m[1]!;
                if (/^[a-z]/.test(name)) methodNames.add(name);
            }
        }
        expect(
            methodNames.size,
            "parsed zero method names from the README '### Exposed' table — the table shape moved; update the parser, do not silently pass",
        ).toBeGreaterThan(0);

        // The Blob surface: the defineExpose({ … }) keys PLUS the v-model prop pair
        // (paused). Parse the defineExpose object keys + the `paused` prop.
        const exposeMatch = sfc.match(/defineExpose\(\{([\s\S]*?)\}\)/);
        const exposeBody = exposeMatch?.[1] ?? "";
        const surface = new Set<string>();
        for (const m of exposeBody.matchAll(/(?:^|[\s,])([a-zA-Z]+)\s*[:,}]/g)) {
            surface.add(m[1]!);
        }
        // `pause`/`resume` are re-exposed AND driven by the `paused` v-model prop; the
        // README may list them as `pause()`/`resume()`. The prop pair counts as surface.
        if (/\bpaused\??\s*:/.test(sfc) || /v-model:paused/.test(sfc)) {
            surface.add("pause");
            surface.add("resume");
        }

        const missing = [...methodNames].filter((n) => !surface.has(n));
        expect(
            missing,
            `README '### Exposed' lists method(s) ${JSON.stringify(missing)} that are NOT on the Blob surface (defineExpose keys: ${JSON.stringify([...surface])}) — the README drifted ahead of the code (the dead-seam class: a table method with no expose)`,
        ).toEqual([]);
    });
});
