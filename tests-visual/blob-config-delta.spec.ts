// AY.W-BLOB-CONFIG — the own-surface DELTA capture + the four live readbacks.
//
// Captures the W-BLOB-CONFIG-*.png set (light+dark × desktop+REAL-390-mobile) of the
// new Configurator-driven blob studio, AND emits the paired-π numbers proving the four
// fixes:
//   D1 — a post-mount seed change RE-PAINTS the hero body (the dead-feed fix).
//   D2 — pointerAttraction=-1 SHIES the centroid relative to +1 (the sign fix).
//   D4 — the paused-prop resume produces a CLEAN canvas (no charcoal-slab wreck).
// The captures + numbers feed W-BLOB-CONFIG-DELTA.md (the ledger row).

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";
import { resolveScene } from "./pi-manifest.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const ROUTE = resolveScene("substrates", "blob").path;

const VIEWPORTS = [
    { id: "desktop", width: 1280, height: 900 },
    { id: "mobile", width: 390, height: 844 }, // REAL 390 width (the honest mobile claim)
] as const;
const SCHEMES = ["light", "dark"] as const;

test.setTimeout(240_000);

async function grab(l: Locator): Promise<PNG> {
    return PNG.sync.read(await l.screenshot());
}
function modalBg(p: PNG): [number, number, number] {
    const c = new Map<number, number>();
    for (let i = 0; i < p.data.length; i += 4) {
        const k = ((p.data[i]! >> 4) << 8) | ((p.data[i + 1]! >> 4) << 4) | (p.data[i + 2]! >> 4);
        c.set(k, (c.get(k) ?? 0) + 1);
    }
    let b = 0, bk = 0;
    for (const [k, v] of c) if (v > b) { b = v; bk = k; }
    return [((bk >> 8) & 15) * 16 + 8, ((bk >> 4) & 15) * 16 + 8, (bk & 15) * 16 + 8];
}
function bodyRGB(p: PNG): [number, number, number] {
    const w = p.width, h = p.height;
    const x0 = (w * 0.4) | 0, x1 = Math.ceil(w * 0.6), y0 = (h * 0.4) | 0, y1 = Math.ceil(h * 0.6);
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * w + x) * 4;
        if (p.data[i + 3]! > 10) { r += p.data[i]!; g += p.data[i + 1]!; b += p.data[i + 2]!; n++; }
    }
    return n ? [r / n, g / n, b / n] : [0, 0, 0];
}
function centroidX(p: PNG, bg: [number, number, number], th = 40): number {
    const w = p.width, h = p.height;
    const x0 = (w * 0.12) | 0, x1 = Math.ceil(w * 0.88), y0 = (h * 0.12) | 0, y1 = Math.ceil(h * 0.88);
    let sx = 0, n = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * w + x) * 4;
        if (Math.abs(p.data[i]! - bg[0]) + Math.abs(p.data[i + 1]! - bg[1]) + Math.abs(p.data[i + 2]! - bg[2]) > th) { sx += x; n++; }
    }
    return n ? sx / n / w : 0.5;
}
function coverage(p: PNG, bg: [number, number, number], th = 40): number {
    const w = p.width, h = p.height;
    const x0 = (w * 0.12) | 0, x1 = Math.ceil(w * 0.88), y0 = (h * 0.12) | 0, y1 = Math.ceil(h * 0.88);
    let differ = 0, total = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        total++;
        const i = (y * w + x) * 4;
        if (Math.abs(p.data[i]! - bg[0]) + Math.abs(p.data[i + 1]! - bg[1]) + Math.abs(p.data[i + 2]! - bg[2]) > th) differ++;
    }
    return total ? differ / total : 0;
}
function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const m = s.length >> 1;
    return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}
async function restCx(page: Page, c: Locator): Promise<number> {
    const xs: number[] = [];
    for (let f = 0; f < 4; f++) { const p = await grab(c); xs.push(centroidX(p, modalBg(p))); await page.waitForTimeout(80); }
    return median(xs);
}
// The studio attraction is a library LabeledSlider (reka-ui role="slider", NOT a raw
// range input — the D5 dog-food). The robust UI driver for the sign verdict is the
// preset tab-row: "Excited" carries attraction +0.8 (leans IN), "Shy" carries -0.8
// (shies AWAY). Selecting a preset writes the studio attraction → the live stage config.
async function selectPreset(page: Page, label: string) {
    await page.getByRole("tab", { name: label }).first().click();
    await page.waitForTimeout(250);
}
async function hoverFlickRight(page: Page, c: Locator) {
    const wr = c.locator("xpath=..");
    const b = (await wr.boundingBox())!;
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2, tx = b.x + b.width * 0.82;
    await page.mouse.move(cx, cy);
    for (let s = 1; s <= 8; s++) { await page.mouse.move(cx + (tx - cx) * s / 8, cy); await page.waitForTimeout(16); }
    await page.mouse.move(tx, cy);
}

test.describe("blob-config DELTA (AY.W-BLOB-CONFIG — the four fixes, own-surface capture)", () => {
    // ── The capture matrix (light+dark × desktop+390-mobile) ──
    for (const vp of VIEWPORTS) {
        for (const scheme of SCHEMES) {
            test(`capture studio ${vp.id}/${scheme}`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.emulateMedia({ colorScheme: scheme });
                if (scheme === "dark") await page.addInitScript(() => document.documentElement.classList.add("dark"));
                await page.goto(ROUTE);
                if (scheme === "dark") await page.evaluate(() => document.documentElement.classList.add("dark"));
                const blob = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
                await blob.waitFor({ state: "visible", timeout: 20_000 });
                await page.waitForTimeout(900);
                await page.screenshot({
                    path: resolve(VISUAL_DIR, `W-BLOB-CONFIG-studio-${vp.id}-${scheme}.png`),
                });
                // A real capture: the studio must paint the contained bead.
                const png = await grab(blob);
                const cov = coverage(png, modalBg(png));
                expect(cov, `[${vp.id}/${scheme}] studio bead coverage ${cov.toFixed(3)} — the capture is blank`).toBeGreaterThan(0.05);
            });
        }
    }

    // ── D1 — a post-mount seed change re-paints the hero body ──
    test("D1 — a seed change RE-PAINTS the hero body (the dead-feed fix)", async ({ page }) => {
        await page.goto(ROUTE);
        const blob = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
        await blob.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(1000);
        const before = bodyRGB(await grab(blob));
        // Drive a BLUE seed (hue 250) through the studio seed input.
        await page.evaluate(() => {
            const inp = [...document.querySelectorAll("input.input-pill")].find(
                (e) => (e as HTMLInputElement).getAttribute("aria-label")?.includes("seed"),
            ) as HTMLInputElement;
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
            setter.call(inp, "oklch(0.6 0.2 250)");
            inp.dispatchEvent(new Event("input", { bubbles: true }));
        });
        await page.waitForTimeout(2500);
        await page.screenshot({ path: resolve(VISUAL_DIR, "W-BLOB-CONFIG-d1-blue-seed-desktop-light.png") });
        const after = bodyRGB(await grab(blob));
        const deltaB = after[2] - before[2];
        const deltaR = after[0] - before[0];
        console.log(`[W-BLOB-CONFIG-π] D1 before=[${before.map((v) => v.toFixed(0))}] after=[${after.map((v) => v.toFixed(0))}] ΔB=${deltaB.toFixed(0)} ΔR=${deltaR.toFixed(0)}`);
        // A blue seed must drive the body bluer: B rises markedly (HEAD was ΔB≈+5 coral).
        expect(deltaB, `seed→hero ΔB=${deltaB.toFixed(0)} — the hero body did NOT re-paint toward blue (the dead color-feed)`).toBeGreaterThan(30);
    });

    // ── D2 — the sign is honored: the "Shy" preset (-0.8) shies relative to "Excited"
    // (+0.8) ──
    test("D2 — a negative attraction SHIES relative to a positive (the sign fix)", async ({ page }) => {
        await page.goto(ROUTE);
        const blob = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
        await blob.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(700);

        // Excited preset → attraction +0.8 (leans IN).
        await selectPreset(page, "Excited");
        const restPos = await restCx(page, blob);
        await hoverFlickRight(page, blob);
        await page.waitForTimeout(150);
        const leanPos = await restCx(page, blob);
        const shiftPos = leanPos - restPos;

        await page.mouse.move(10, 10);
        await page.waitForTimeout(800);

        // Shy preset → attraction -0.8 (shies AWAY).
        await selectPreset(page, "Shy");
        const restNeg = await restCx(page, blob);
        await hoverFlickRight(page, blob);
        await page.waitForTimeout(150);
        const leanNeg = await restCx(page, blob);
        const shiftNeg = leanNeg - restNeg;
        await page.screenshot({ path: resolve(VISUAL_DIR, "W-BLOB-CONFIG-d2-shy-away-desktop-light.png") });

        console.log(`[W-BLOB-CONFIG-π] D2 shift(+0.8 Excited)=${shiftPos.toFixed(4)} shift(-0.8 Shy)=${shiftNeg.toFixed(4)} (lean-in must exceed shy-away)`);
        // The sign is honored: lean-in (+0.8) pulls MORE toward the cursor than shy-away
        // (-0.8). At HEAD the order was INVERTED (a negative attraction lunged HARDER). The
        // shader sign flip + the reach-gated pseudopod restore the correct ordering.
        expect(shiftNeg, `shy-away shift(-0.8)=${shiftNeg.toFixed(4)} is NOT less than lean-in shift(+0.8)=${shiftPos.toFixed(4)} — the sign is still dropped (a negative attraction lunges toward)`).toBeLessThan(shiftPos);
    });

    // ── D4 — the paused-prop resume is CLEAN (no charcoal-slab wreck) ──
    test("D4 — the paused-prop resume produces a CLEAN canvas (the SEVERE fix)", async ({ page }) => {
        await page.goto(ROUTE);
        const blob = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
        await blob.waitFor({ state: "visible", timeout: 20_000 });
        // Run a while + fire a click so a pulse is in-flight at pause (the divergence trigger).
        await page.waitForTimeout(2500);
        const box = await blob.boundingBox();
        if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(60);
        let png = await grab(blob);
        let bg = modalBg(png);
        const covRun = coverage(png, bg);

        const toggle = page.locator('[data-testid="blob-pause-toggle"] button').first();
        await toggle.click();
        await page.waitForTimeout(2000); // hold the pause so wall-clock advances
        // RESUME
        await toggle.click();
        await page.waitForTimeout(600);
        png = await grab(blob);
        bg = modalBg(png);
        const covResume = coverage(png, bg);
        await page.waitForTimeout(3000);
        png = await grab(blob);
        bg = modalBg(png);
        const covAfter = coverage(png, bg);
        await page.screenshot({ path: resolve(VISUAL_DIR, "W-BLOB-CONFIG-d4-resume-clean-desktop-light.png") });

        console.log(`[W-BLOB-CONFIG-π] D4 covRun=${covRun.toFixed(3)} covResume=${covResume.toFixed(3)} covAfter=${covAfter.toFixed(3)} (resume must be the resting band, not a flooded slab)`);
        // CLEAN resume: the bead is intact (coverage in the resting band 0.08–0.40), NOT
        // the flooded charcoal slab (≈0.99). At HEAD the negative-dt resume could explode.
        expect(covResume, `resume coverage ${covResume.toFixed(3)} flooded — the negative-dt resume wrecked the canvas (the charcoal-slab)`).toBeLessThan(0.5);
        expect(covResume, `resume coverage ${covResume.toFixed(3)} blank — the resume did not re-arm the loop`).toBeGreaterThan(0.05);
        expect(covAfter, `5s-after coverage ${covAfter.toFixed(3)} flooded — the wreck settled as a slab`).toBeLessThan(0.5);
    });
});
