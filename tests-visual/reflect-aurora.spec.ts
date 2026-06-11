// REFLECTION capture spec (AZ.W-REFLECT, aurora lane) — AUDIT-ONLY, not a gate.
// Drives the live :5199 demo on the real Metal GPU (tests-visual playwright.config),
// captures fresh PNGs at 2 viewports × 2 modes, reads back the three reference-anchored
// painterly metrics per medium, probes the studio dead-select fix + the black-bar.
// Output PNGs land in docs/tranches/AZ/audit/reflect/.

import { test, expect, type Page, type Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
    downscaleToWidth,
    colorfulness,
    structureTensorAnisotropy,
    powerSpectrumSlope,
    interiorRGB,
    fullLuma,
    notFlatFloors,
    CANONICAL_WIDTH,
} from "./aurora-arresting-readback.ts";

const OUT = resolve(import.meta.dirname, "../docs/tranches/AZ/audit/reflect");
mkdirSync(OUT, { recursive: true });
const AURORA = "/substrates/aurora";
const SETTLE = 700;

function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}

async function readMedium(canvas: Locator): Promise<{ C: number; A: number; hist: number; beta: number; floors: ReturnType<typeof notFlatFloors> }> {
    const Cs: number[] = [], As: number[] = [], hists: number[] = [], betas: number[] = [];
    let lastRaw: PNG | null = null;
    for (let i = 0; i < 3; i++) {
        await canvas.page().waitForTimeout(500);
        const raw = PNG.sync.read(await canvas.screenshot());
        lastRaw = raw;
        const png = downscaleToWidth(raw, CANONICAL_WIDTH);
        const { rgb, n } = interiorRGB(png, 0.6);
        Cs.push(colorfulness(rgb, n));
        const lum = fullLuma(png);
        const st = structureTensorAnisotropy(lum, png.width, png.height, 0.6);
        As.push(st.meanA);
        hists.push(st.histPeakRatio);
        betas.push(powerSpectrumSlope(lum, png.width, png.height).slope);
    }
    return { C: median(Cs), A: median(As), hist: median(hists), beta: median(betas), floors: notFlatFloors(lastRaw!, 0.2) };
}

async function pickPreset(page: Page, label: string): Promise<void> {
    await page.locator(`button[aria-pressed]`, { hasText: label }).first().click();
    await page.waitForTimeout(SETTLE);
}

test.setTimeout(420_000);

test("REFLECT aurora — captures + π readbacks", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
    page.on("pageerror", (e) => consoleErrors.push(`PAGEERROR ${e.message}`));

    const report: Record<string, unknown> = {};

    // ===== DESKTOP DARK (canonical painterly register) =====
    await page.emulateMedia({ colorScheme: "dark" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(AURORA);
    await page.waitForTimeout(1500);
    // add .dark to root for token cascade
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(800);

    const canvas = page.locator("canvas.aurora-canvas").first();
    await canvas.waitFor({ state: "visible", timeout: 25_000 });
    await page.waitForTimeout(SETTLE);

    // full page (default preset)
    await page.screenshot({ path: resolve(OUT, "aurora-desktop-dark-full.png") });

    // per-medium captures + π
    const media = [
        { key: "sky", label: "Sky" },
        { key: "vangogh", label: "Van Gogh" },
        { key: "oil", label: "Oil Impasto" },
        { key: "oilpastel", label: "Oil Pastel Sunset" },
    ];
    const triples: Record<string, unknown> = {};
    for (const m of media) {
        await pickPreset(page, m.label);
        await page.waitForTimeout(400);
        await canvas.screenshot({ path: resolve(OUT, `aurora-medium-${m.key}-dark.png`) });
        const r = await readMedium(canvas);
        triples[m.key] = r;
        // eslint-disable-next-line no-console
        console.log(`REFLECT::${m.key} C=${r.C.toFixed(2)} A=${r.A.toFixed(4)} hist=${r.hist.toFixed(2)} beta=${r.beta.toFixed(4)} | var=${r.floors.variance.toFixed(1)} chroma=${r.floors.meanChroma.toFixed(1)} gap=${r.floors.gapFraction.toFixed(3)}`);
    }
    report.media_dark = triples;

    // studio chrome capture (back to Van Gogh)
    await pickPreset(page, "Van Gogh");
    await page.screenshot({ path: resolve(OUT, "aurora-studio-dark.png") });

    // canvas bbox + GL context probe
    const meta = await page.evaluate(() => {
        const c = document.querySelector("canvas.aurora-canvas") as HTMLCanvasElement | null;
        const r = c?.getBoundingClientRect();
        // count GL contexts: query all canvases that have webgl/webgl2
        let glCount = 0;
        document.querySelectorAll("canvas").forEach((cv) => {
            try {
                const g = (cv as HTMLCanvasElement).getContext("webgl2") || (cv as HTMLCanvasElement).getContext("webgl");
                if (g) glCount++;
            } catch { /* taken */ }
        });
        return { canvasRect: r ? { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) } : null, backingW: c?.width ?? 0, backingH: c?.height ?? 0, allCanvases: document.querySelectorAll("canvas").length };
    });
    report.desktop_meta = meta;

    // STUDIO DEAD-SELECT probe (D1 fix): the Harmony / Medium selects must OPEN
    const selectProbe = await page.evaluate(() => {
        // find selects/comboboxes in the studio with aria-expanded
        const triggers = Array.from(document.querySelectorAll('[aria-expanded], button[role="combobox"], [data-reka-select-trigger]'));
        return triggers.slice(0, 40).map((t) => {
            const el = t as HTMLElement;
            return {
                tag: el.tagName.toLowerCase(),
                role: el.getAttribute("role"),
                ariaExpanded: el.getAttribute("aria-expanded"),
                text: (el.textContent || "").trim().slice(0, 40),
            };
        });
    });
    report.select_triggers = selectProbe;

    // Try to actually open a Harmony / Medium select and count options that mount
    const openResult = await page.evaluate(async () => {
        const out: Record<string, unknown> = {};
        // Find a trigger whose text contains a harmony-ish value
        const all = Array.from(document.querySelectorAll('[aria-expanded]')) as HTMLElement[];
        const harmony = all.find((e) => /analog|complement|triad|harmon/i.test(e.textContent || ""));
        out.harmonyFound = !!harmony;
        if (harmony) {
            out.harmonyBefore = harmony.getAttribute("aria-expanded");
            harmony.click();
            await new Promise((r) => setTimeout(r, 350));
            out.harmonyAfter = harmony.getAttribute("aria-expanded");
            out.optionsAfter = document.querySelectorAll('[role="option"]').length;
        }
        return out;
    });
    report.harmony_open = openResult;
    await page.waitForTimeout(300);
    await page.screenshot({ path: resolve(OUT, "aurora-studio-harmony-open-dark.png") });
    // close
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(200);

    // BLACK-BAR probe: sample the studio slider tracks for a near-opaque dark fill
    const sliderProbe = await page.evaluate(() => {
        const ranges = Array.from(document.querySelectorAll('.slider-range, [data-slider-range], [class*="slider"]')).slice(0, 30);
        return ranges.map((r) => {
            const cs = getComputedStyle(r as HTMLElement);
            return { cls: (r as HTMLElement).className.toString().slice(0, 60), bg: cs.backgroundColor, opacity: cs.opacity };
        });
    });
    report.slider_tracks = sliderProbe;

    // ===== DESKTOP LIGHT =====
    await page.evaluate(() => document.documentElement.classList.remove("dark"));
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(900);
    await pickPreset(page, "Sky");
    await page.screenshot({ path: resolve(OUT, "aurora-desktop-light-full.png") });
    await pickPreset(page, "Van Gogh");
    await page.screenshot({ path: resolve(OUT, "aurora-studio-light.png") });
    await canvas.screenshot({ path: resolve(OUT, "aurora-medium-vangogh-light.png") });

    // legibility readback: studio panel label contrast (the studio chrome over glass)
    const legibility = await page.evaluate(() => {
        function lum(rgb: number[]) {
            const f = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
            return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
        }
        function parse(s: string) { const m = s.match(/\d+(\.\d+)?/g); return m ? m.slice(0, 3).map(Number) : [0, 0, 0]; }
        // sample a studio heading text color vs its panel bg
        const heading = document.querySelector('.aurora-config, [class*="studio"], [class*="config"]') as HTMLElement | null;
        if (!heading) return { ok: false };
        const label = heading.querySelector("label, h2, h3, .text-label, [class*='label']") as HTMLElement | null;
        const fg = label ? parse(getComputedStyle(label).color) : [0, 0, 0];
        const bg = parse(getComputedStyle(heading).backgroundColor);
        const L1 = lum(fg) + 0.05, L2 = lum(bg) + 0.05;
        const ratio = Math.max(L1, L2) / Math.min(L1, L2);
        return { ok: true, fg, bg, ratio: Number(ratio.toFixed(2)) };
    });
    report.studio_legibility_light = legibility;

    // ===== MOBILE DARK (390×844) =====
    await page.emulateMedia({ colorScheme: "dark" });
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(900);
    await page.goto(AURORA);
    await page.waitForTimeout(1500);
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(700);
    const mcanvas = page.locator("canvas.aurora-canvas").first();
    const mobileCanvasVisible = await mcanvas.isVisible().catch(() => false);
    await page.screenshot({ path: resolve(OUT, "aurora-mobile-dark-full.png") });
    const mobileMeta = await page.evaluate(() => {
        const c = document.querySelector("canvas.aurora-canvas") as HTMLCanvasElement | null;
        const r = c?.getBoundingClientRect();
        return { rect: r ? { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) } : null, backingW: c?.width ?? 0, backingH: c?.height ?? 0 };
    });
    report.mobile_dark = { canvasVisible: mobileCanvasVisible, meta: mobileMeta };

    // ===== MOBILE LIGHT =====
    await page.evaluate(() => document.documentElement.classList.remove("dark"));
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(800);
    await page.screenshot({ path: resolve(OUT, "aurora-mobile-light-full.png") });

    report.consoleErrors = consoleErrors;

    writeFileSync(resolve(OUT, "reflect-aurora-pi.json"), JSON.stringify(report, null, 2));
    // eslint-disable-next-line no-console
    console.log("REFLECT-AURORA-REPORT", JSON.stringify(report, null, 2));
    expect(true).toBe(true);
});
