// BJ.W-STATIC-HYGIENE gate (D) — `gate:refract-lens-never-sharper`, the WebKit
// `@supports` gate-lie lock.
//
// THE INVARIANT, stated so it holds on every engine forever: **the lens may NEVER paint
// sharper than its own blur base.** `.glass-lens` composes a refraction filter OVER an
// un-gated blur; a refraction that adds nothing must still leave the blur. A lens that
// reads sharper than its blur-only twin means the composite did not merely fail to
// refract — it took the blur down with it.
//
// THE SHIPPED DEFECT this gate is born against (`src/styles/glass-refract.css` §the gated
// selector — the `@supports (backdrop-filter: url("#glass-refract"))` block). WebKit 26.5
// returns TRUE for that condition in every form (fragment, gate, the shipped data-URI) and
// retains the whole composite in computed style — then drops the ENTIRE value at paint,
// blur leg included. Because the gated declaration overrides the un-gated base, `.glass-lens`
// ships on the Safari floor with NO backdrop filter at all: worse than the blur-only degrade
// the header promises. Chrome 150 is unaffected. Evidence:
// `docs/tranches/IOS27-MICRO/passes/PASS-2/safari-arm.md` §F5 (U1 RED) +
// `docs/tranches/IOS27-MICRO/prototypes/f5-optical-medium/PROBE-NOTES.md` "PASS-2 SAFARI
// ARM"; WebKit bug 245510.
//
// WHY THE VIDEO PATH, NOT `page.screenshot()` (safari-arm §0, harness law 1 — BINDING).
// Playwright's WebKit screenshot pipeline is backdrop-filter-BLIND: it paints every chip
// stone-sharp regardless of the real composite, which would false-FAIL the GREEN side and
// make this gate a liar in the other direction. The 25fps screencast is the honest capture
// organ on this engine, so the gate reads a decoded VIDEO frame. Observation is video +
// computed-style only — no context is ever taken from a live canvas.
//
// AUTHORED BORN-RED (BAND-GATES §Wave 3 §Acceptance). The fix is the runtime latch that
// replaces the lying `@supports` — `BJ.W-REFRACT-LATCH` (BAND-MATERIAL W8); this file
// authors the gate only and edits none of its source. The binding assertion carries
// `test.fail()` — the EXPECTED-RED latch — so CI reads a born-RED gate as GREEN and a
// ROTTED gate as RED. When W8's latch lands, the assertion starts passing, `test.fail()`
// inverts, and W8 drops the marker in the same cut.
//
// STANDING, not disposable: it also catches the day WebKit ships `url()` for real (the
// functional arm goes true, the gate stays green). Per R-6 (RULED 2026-07-20, lead,
// `docs/tranches/BJ/formation/stability/TERMINAL-ROUTINGS.md` §R-6) this is a
// Playwright/paint-path lock — enumerated beside W2's pixel floors, INSIDE the enforced
// surface and OUTSIDE the vitest census base, which is why it lives here and not in
// `tests/gates/`.

import { test, expect } from "@playwright/test";
import type { Browser } from "@playwright/test";
import { PNG } from "pngjs";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("..", import.meta.url));

// The scene and the three chips. One striped backdrop, three surfaces over it:
//   twin    — the blur-only degrade floor the `@supports` header promises.
//   lens    — the SHIPPED `.glass-lens`, cascade-identical to production.
//   planted — the self-test bite: `backdrop-filter: none`, a lens with no filter at all.
const SCENE = { width: 1240, height: 420 };
const CHIP = { width: 260, height: 200, top: 110, inset: 20 };
const CHIP_X = { twin: 60, lens: 490, planted: 920 } as const;
// The bare-scene reference strip, sampled in the gap between the twin and the lens.
const BACKGROUND_X = { from: 350, to: 470 };

// The lens may carry at most this fraction of the scene's own stripe energy above its
// twin. Scene-relative rather than absolute so the threshold self-calibrates to the
// engine's stripe rendering instead of pinning a measured literal. The shipped WebKit
// defect spends ~91% of the scene's energy; a real blur spends ~0%.
const SHARPNESS_TOLERANCE = 0.12;

// How many trailing screencast frames the verdict is taken over (median). The tail is the
// settled paint; the head can predate the injected stylesheets.
const SETTLED_FRAMES = 5;

/**
 * The shipped CSS this gate measures — the real files, never a copy. `property-regs.css`
 * registers the `--glass-level` scalar and `tokens/glass.css` mints the `--glass-blur-*`
 * ladder that `glass-refract.css` composes over; without them the base resolves to `none`
 * and every chip would read identically sharp — a vacuous pass. (None of the three carries
 * a real `@import`; the only matches are prose, so inlining them is faithful.)
 */
const SHIPPED_CSS = [
    "src/styles/tokens/property-regs.css",
    "src/styles/tokens/glass.css",
    "src/styles/glass-refract.css",
]
    .map((file) => readFileSync(join(REPO_ROOT, file), "utf8"))
    .join("\n");

// The shipped CSS is INLINED into the initial document rather than injected with
// `addStyleTag` after load. Injection mutates style after the first paint and races the
// capture: measured on WebKit, `addStyleTag` produced a lens that painted frosted in ~50%
// of renders while `@supports` read true and computed style retained the whole composite
// every time — a born-RED gate that flipped GREEN on a coin toss. A single-shot document
// has no post-load style mutation, so every recorded frame is the settled paint.
const HARNESS = `<!doctype html><html><head><meta charset="utf-8"><style>
@layer harness, components;
@layer harness {
  html, body { margin: 0; padding: 0; background: #0b0f14; }
  .scene {
    position: relative; width: ${SCENE.width}px; height: ${SCENE.height}px;
    background: repeating-linear-gradient(90deg,
      hsl(174 80% 45%) 0 7px, hsl(232 45% 10%) 7px 14px);
  }
  .chip {
    position: absolute; top: ${CHIP.top}px;
    width: ${CHIP.width}px; height: ${CHIP.height}px; border-radius: 28px;
    background: hsl(0 0% 100% / 0.10); border: 1px solid hsl(0 0% 100% / 0.18);
    /* The un-gated base every lens composes over — the degrade floor itself. */
    backdrop-filter: var(--glass-blur-resting);
  }
  #twin { left: ${CHIP_X.twin}px; }
  #lens { left: ${CHIP_X.lens}px; }
  #planted { left: ${CHIP_X.planted}px; }
}
</style>
<style>${SHIPPED_CSS}</style>
<style>
/* The planted defect, UNLAYERED so it beats .glass-lens — layer order outranks
   specificity, so an id rule inside the harness layer would silently LOSE to the
   shipped components layer and the bite would plant nothing. */
#planted { backdrop-filter: none; }
</style></head><body><div class="scene">
  <div class="chip" id="twin"></div>
  <div class="chip glass-lens" id="lens"></div>
  <div class="chip glass-lens" id="planted"></div>
</div></body></html>`;

/**
 * Resolve ffmpeg. Playwright ships its own binary alongside the browsers, which is the
 * one location guaranteed present wherever this suite can run at all; a system ffmpeg is
 * the second known home. Absence is a HARD ERROR — a gate that silently skips its decode
 * is the unwired-gate class this band exists to end.
 */
const resolveFfmpeg = (): string => {
    const cacheRoot =
        process.env.PLAYWRIGHT_BROWSERS_PATH ??
        (process.platform === "darwin"
            ? join(process.env.HOME ?? "", "Library", "Caches", "ms-playwright")
            : join(process.env.HOME ?? "", ".cache", "ms-playwright"));
    const binary = process.platform === "darwin" ? "ffmpeg-mac" : "ffmpeg-linux";

    if (existsSync(cacheRoot)) {
        for (const entry of readdirSync(cacheRoot).filter((e) => e.startsWith("ffmpeg"))) {
            const candidate = join(cacheRoot, entry, binary);
            if (existsSync(candidate)) return candidate;
        }
    }

    try {
        execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
        return "ffmpeg";
    } catch {
        throw new Error(
            "refract-lens-never-sharper: no ffmpeg. The WebKit verdict rides the video " +
                "path (screenshots are backdrop-filter-blind), so the decode is not optional.",
        );
    }
};

/** Mean |ΔL| between horizontally adjacent pixels — the stripes' surviving energy. */
const gradientEnergy = (
    png: PNG,
    from: number,
    to: number,
    top: number,
    bottom: number,
): number => {
    let total = 0;
    let samples = 0;

    for (let y = top; y < bottom; y++) {
        for (let x = from; x < to - 1; x++) {
            const a = (y * png.width + x) << 2;
            const b = a + 4;
            const la =
                (0.2126 * png.data[a] + 0.7152 * png.data[a + 1] + 0.0722 * png.data[a + 2]) / 255;
            const lb =
                (0.2126 * png.data[b] + 0.7152 * png.data[b + 1] + 0.0722 * png.data[b + 2]) / 255;
            total += Math.abs(lb - la);
            samples++;
        }
    }

    return total / samples;
};

interface Reading {
    supports: boolean;
    computed: { twin: string; lens: string };
    energy: { background: number; twin: number; lens: number; planted: number };
}

/** Drive the harness on `browser`, capture the screencast, decode one frame, measure. */
const readScene = async (browser: Browser): Promise<Reading> => {
    const ffmpeg = resolveFfmpeg();
    const dir = mkdtempSync(join(tmpdir(), "refract-lens-"));

    try {
        const context = await browser.newContext({
            viewport: SCENE,
            deviceScaleFactor: 1,
            recordVideo: { dir, size: SCENE },
        });
        const page = await context.newPage();
        await page.setContent(HARNESS);
        // Let the compositor settle and the screencast accumulate frames.
        await page.waitForTimeout(1000);

        const observed = await page.evaluate(() => ({
            supports: CSS.supports("backdrop-filter", 'url("#glass-refract")'),
            computed: {
                twin: getComputedStyle(document.getElementById("twin") as Element).backdropFilter,
                lens: getComputedStyle(document.getElementById("lens") as Element).backdropFilter,
            },
        }));

        // The video is only finalized on context close.
        await context.close();

        const recording = readdirSync(dir).find((file) => file.endsWith(".webm"));
        if (!recording) throw new Error("refract-lens-never-sharper: no screencast recorded.");

        // Decode EVERY frame and read the settled tail. A `-sseof` seek depends on webm
        // duration metadata Playwright does not reliably write, so it silently lands on an
        // arbitrary frame — including pre-first-paint ones, where nothing is frosted and the
        // comparison passes vacuously. That is the one failure mode a born-RED gate may
        // never have, so the tail is selected by decoding rather than by seeking.
        execFileSync(
            ffmpeg,
            ["-y", "-i", join(dir, recording), "-vsync", "0", join(dir, "f-%04d.png")],
            { stdio: "ignore" },
        );
        const frames = readdirSync(dir)
            .filter((file) => file.startsWith("f-") && file.endsWith(".png"))
            .sort()
            .slice(-SETTLED_FRAMES);
        if (frames.length === 0) {
            throw new Error("refract-lens-never-sharper: the screencast decoded to no frames.");
        }

        const top = CHIP.top + CHIP.inset;
        const bottom = CHIP.top + CHIP.height - CHIP.inset;
        // Median over the settled tail — the suite's in-spec anti-flake discipline
        // (playwright.config.ts: robust verdict inside the spec, never a runner retry).
        const median = (values: number[]): number =>
            [...values].sort((a, b) => a - b)[values.length >> 1];
        const across = (from: number, to: number): number =>
            median(
                frames.map((file) =>
                    gradientEnergy(PNG.sync.read(readFileSync(join(dir, file))), from, to, top, bottom),
                ),
            );
        const chipEnergy = (left: number): number =>
            across(left + CHIP.inset, left + CHIP.width - CHIP.inset);

        return {
            ...observed,
            energy: {
                background: across(BACKGROUND_X.from, BACKGROUND_X.to),
                twin: chipEnergy(CHIP_X.twin),
                lens: chipEnergy(CHIP_X.lens),
                planted: chipEnergy(CHIP_X.planted),
            },
        };
    } finally {
        rmSync(dir, { recursive: true, force: true });
    }
};

/** The verdict predicate — how much scene energy a surface carries above the blur floor. */
export const sharpnessExcess = (energy: Reading["energy"], surface: number): number =>
    (surface - energy.twin) / (energy.background - energy.twin);

/**
 * WHY THE GATE SAMPLES AND TAKES THE WORST. The invariant is a NEVER, so the honest
 * reduction over independent renders is the worst one: a single violating render is a
 * violation. This is the config's own in-spec anti-flake doctrine (a robust verdict inside
 * the spec, never a runner retry) pointed in the direction the invariant points, and it
 * keeps the GREEN side honest too — once BJ.W-REFRACT-LATCH stops shipping the url()
 * composite to WebKit, the lens must carry the plain blur base in EVERY sample.
 *
 * Sampling is not what makes the gate stable; the single-shot document is (see HARNESS).
 * Measured at HEAD after that fix: 12/12 WebKit samples sharp at 90.9-93.5%, 9/9 Chromium
 * samples frosted. Sampling is the invariant's semantics, not a flake patch.
 */
const SAMPLES = 3;

const worst = (values: number[]): number => Math.max(...values);
const best = (values: number[]): number => Math.min(...values);

test.describe("gate:refract-lens-never-sharper — the WebKit @supports gate-lie lock", () => {
    // SAMPLES renders, each a launch + 1s dwell + screencast finalize + decode. Captured
    // ONCE per worker and read by both tests — the two verdicts must judge the same paints.
    test.setTimeout(120_000);

    let readings: Reading[] = [];

    test.beforeAll(async ({ browser }) => {
        readings = [];
        for (let sample = 0; sample < SAMPLES; sample++) readings.push(await readScene(browser));
    });

    // UNMARKED on EVERY engine. Instrument integrity is never expected to fail, so a missing
    // ffmpeg / blind capture / undecoded screencast reds LOUD instead of being absorbed by the
    // EXPECTED-RED marker on the one engine the gate is born red on.
    test("instrument honesty + the planted bite", async () => {
        // ── harness honesty, asserted before any verdict ────────────────────────────────
        // A base that resolved to `none` would leave every chip equally sharp and the
        // comparison would pass vacuously. Fail LOUD instead.
        for (const reading of readings) {
            expect(reading.computed.twin, "the blur base resolved").not.toBe("none");
            expect(reading.computed.lens, "the lens composite resolved").not.toBe("none");
        }
        // The twin must be genuinely frosted against the bare SCENE in every sample, or the
        // capture path is blind (the screenshot-pipeline failure mode this spec routes
        // around) and no comparison it feeds means anything. Measured as a scene ratio —
        // `sharpnessExcess(e, e.twin)` is identically 0 and asserts nothing at all.
        const twinFloor = worst(readings.map((r) => r.energy.twin / r.energy.background));
        expect(twinFloor, "the blur-only twin is frosted in every sample").toBeLessThan(0.25);

        // ── the self-test bite, measured in the same paints ─────────────────────────────
        // A chip with `backdrop-filter: none` MUST read as sharper — in every sample. If the
        // instrument cannot red on a filter that is provably absent, it cannot red on
        // anything, and `best()` is the strict reading of "every".
        expect(
            best(readings.map((r) => sharpnessExcess(r.energy, r.energy.planted))),
            "planted bite — a filterless lens reads sharper than the blur floor",
        ).toBeGreaterThan(SHARPNESS_TOLERANCE);
    });

    test("the lens never paints sharper than its own blur base", async ({}, testInfo) => {
        // EXPECTED-RED at HEAD on WebKit — `glass-refract.css`'s `@supports` engages and the
        // whole composite drops at paint. GREEN when BJ.W-REFRACT-LATCH (MATERIAL W8) lands
        // the runtime latch; `test.fail()` then inverts and W8 drops this marker.
        // Chromium paints the composite correctly, so the lock is honestly GREEN there and
        // is NOT marked — a blanket marker would hide a real Chromium regression.
        const engine = testInfo.project.name;
        if (engine.includes("webkit")) {
            test.fail(true, "EXPECTED-RED — BJ.W-REFRACT-LATCH (BAND-MATERIAL W8) owns the flip");
        }

        // ── THE INVARIANT ──────────────────────────────────────────────────────────────
        const perSample = readings.map((r) => sharpnessExcess(r.energy, r.energy.lens));
        const excess = worst(perSample);
        const witness = readings[perSample.indexOf(excess)];
        expect(
            excess,
            `${engine}: @supports=${witness.supports} · ${SAMPLES} samples, worst ` +
                `${(excess * 100).toFixed(1)}% (all: ` +
                `${perSample.map((e) => `${(e * 100).toFixed(1)}%`).join(", ")}) · ` +
                `witness scene ${witness.energy.background.toFixed(4)} · blur-only twin ` +
                `${witness.energy.twin.toFixed(4)} · lens ${witness.energy.lens.toFixed(4)}. ` +
                `The lens must never paint sharper than its own blur base.`,
        ).toBeLessThanOrEqual(SHARPNESS_TOLERANCE);
    });
});
