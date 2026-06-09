// AX.W10 — proof:aurora-atoms-render, the π-lane PER-ATOM visible-change device gate.
//
// The cardinal AX instrument for W10 (RED witness 6's closure): the existing
// proof:aurora-atoms-roundtrip is a function-PURITY oracle — it proves resolveAtoms is
// total + default-preserving but says NOTHING about whether driving an atom in the LIVE
// config UI visibly changes the rendered field. This spec routes to the LIVE atoms story
// (/substrates/aurora, the routed atoms-default door), drives EACH atom control
// (seed/colorEnergy/zones/noise/medium), reads back the canvas centre region, and asserts
// it VISIBLY changes between atom states — the atoms are WIRED, not dead.
//
// READBACK MECHANISM (inherited from AX.W00 substrate-paints-color): a WebGL2 canvas is
// NOT reliably readable via ctx.drawImage + getImageData without preserveDrawingBuffer;
// the robust cross-context readback is a COMPOSITED element screenshot (locator.screenshot)
// decoded with pngjs. On a dev box the real GPU (darwin→Metal) paints; a GPU-less CI
// runner SwiftShader-degrades and the driver SKIPs befitting-silent (no browser binary).
//
// DEVICE: the live aurora renders on the single-pass WebGL2 fragment shader, so this
// drives the WebGL2 field through the live config UI — the path the user touches.
//
// The PER-ATOM assertion is a PERCEPTUAL DELTA: the mean |ΔR|+|ΔG|+|ΔB| over the interior
// region between the BEFORE-atom and AFTER-atom frames must exceed a floor (the atom moved
// the field) — measured at a settled t to avoid catching only the drift animation. An anti-
// flake guard subtracts a same-state baseline delta (the ambient drift between two reads of
// the SAME config) so the verdict is the atom's contribution ABOVE the drift, not the drift.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

const INTERIOR_INSET = 0.2; // sample the central 60% box (avoid edge fade)
const SETTLE_MS = 700; // procedural loop → a settled frame before each read
// The atom's mean-channel-delta must clear the ambient drift baseline by this margin.
// Empirically the same-state drift between two reads is small (<~6); a real atom change
// (medium swap, palette hue swing, +4 nuclei) moves the mean tens of units. The floor is
// the atom-contribution ABOVE drift — generous enough to be drift-robust, strict enough
// that an INERT (unwired) atom (delta≈drift) REDs.
const ATOM_DELTA_FLOOR = 8;

test.setTimeout(240_000);

/** Composited element screenshot → decoded RGBA (the robust GPU-canvas readback). */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/** Mean per-pixel |ΔR|+|ΔG|+|ΔB| over the interior inset between two same-size frames. */
function meanInteriorDelta(a: PNG, b: PNG, inset: number): number {
    const w = Math.min(a.width, b.width);
    const h = Math.min(a.height, b.height);
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let sum = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const ia = (y * a.width + x) * 4;
            const ib = (y * b.width + x) * 4;
            sum +=
                Math.abs(a.data[ia]! - b.data[ib]!) +
                Math.abs(a.data[ia + 1]! - b.data[ib + 1]!) +
                Math.abs(a.data[ia + 2]! - b.data[ib + 2]!);
            n++;
        }
    }
    return n === 0 ? 0 : sum / n;
}

test.describe("aurora-atoms-render (π lane — per-atom visible change, fail-CLOSED)", () => {
    test("driving each atom in the live config UI visibly changes the rendered field", async ({
        page,
    }: {
        page: Page;
    }) => {
        await page.goto(PI_TARGETS.aurora.path);

        const canvas = page.locator("canvas.aurora-canvas").first();
        await canvas.waitFor({ state: "visible", timeout: 20_000 });

        // The atoms surface is the DEFAULT tab (W10) — confirm it is mounted + reachable.
        const atomsSurface = page.locator("[data-aurora-atoms-surface]");
        await atomsSurface.waitFor({ state: "visible", timeout: 10_000 });

        async function read(): Promise<PNG> {
            await page.waitForTimeout(SETTLE_MS);
            return grab(canvas);
        }

        // The ambient-drift baseline: two reads of the SAME config (no atom touched).
        // The per-atom verdict is the atom delta ABOVE this drift floor.
        const drift0 = await read();
        const drift1 = await read();
        const driftBaseline = meanInteriorDelta(drift0, drift1, INTERIOR_INSET);

        // Each atom drive: read BEFORE, set the control, read AFTER, the delta must clear
        // the drift baseline + the floor. Controls are the `data-atom`-tagged inputs.
        async function setRange(atom: string, value: number) {
            const input = page.locator(`[data-atom="${atom}"] input[type="range"]`);
            await input.fill(String(value));
            await input.dispatchEvent("input");
        }
        async function setSelect(atom: string, value: string) {
            const select = page.locator(`[data-atom="${atom}"] select`);
            await select.selectOption(value);
        }
        async function setColor(atom: string, value: string) {
            const input = page.locator(`[data-atom="${atom}"] input[type="color"]`);
            await input.evaluate((el, v) => {
                (el as HTMLInputElement).value = v as string;
                el.dispatchEvent(new Event("input", { bubbles: true }));
            }, value);
        }

        const results: Record<string, number> = {};
        async function driveAndMeasure(label: string, drive: () => Promise<void>) {
            const before = await read();
            await drive();
            const after = await read();
            results[label] = meanInteriorDelta(before, after, INTERIOR_INSET);
        }

        // MEDIUM: smooth → oil (strokework appears — a strong field change).
        await driveAndMeasure("medium", () => setSelect("medium", "oil"));
        // reset to smooth so the next atom is measured from a clean baseline.
        await setSelect("medium", "smooth");

        // NOISE: 0 → 1 (the organic-boundary warp distorts the zones).
        await setRange("noise", 0);
        await driveAndMeasure("noise", () => setRange("noise", 1));

        // ZONES count: 2 → 6 (more nuclei = more color regions placed).
        await driveAndMeasure("zones", async () => {
            await setRange("zones-count", 6);
        });

        // COLOR energy: 0 → 1 (saturation/value swing).
        await setRange("colorEnergy", 0);
        await driveAndMeasure("colorEnergy", () => setRange("colorEnergy", 1));

        // COLOR seed: blue → orange (palette hue swing).
        await driveAndMeasure("seed", () => setColor("seed", "#ff7a00"));

        // Every atom must clear the drift baseline + the floor (it is WIRED, not inert).
        const threshold = driftBaseline + ATOM_DELTA_FLOOR;
        const inert = Object.entries(results).filter(([, d]) => d <= threshold);
        expect(
            inert,
            `inert (unwired) atom(s) — driving them did NOT visibly change the canvas above the drift baseline ${driftBaseline.toFixed(
                2,
            )}: ${inert.map(([k, d]) => `${k}=${d.toFixed(2)}`).join(", ")}. ` +
                `All atom deltas: ${Object.entries(results)
                    .map(([k, d]) => `${k}=${d.toFixed(2)}`)
                    .join(", ")}`,
        ).toEqual([]);
    });
});
