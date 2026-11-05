// critique-4 recorder: reads only, written to $PROBE_OUT/reads-<engine>.json. Verdicts are
// drawn in critique-4.md from the reads.
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = process.env.PROBE_OUT ?? "out";
const reads: Record<string, unknown> = {};

async function open(page: Page, query: string): Promise<void> {
    await page.goto(`/docs/release-10.1.4/critique-4/probe.html?${query}`);
    await page.waitForFunction(() => (window as any).__ready, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
}
async function settle(page: Page, ms = 300): Promise<void> {
    await page.evaluate(() => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))));
    await page.waitForTimeout(ms);
}
function mediaBoxes(pdf: Buffer): number[][] {
    const text = pdf.toString("latin1");
    return [...text.matchAll(/\/MediaBox\s*\[\s*([\d.\s-]+)\]/g)].map((m) => {
        const [x0, y0, x1, y1] = m[1].trim().split(/\s+/).map(Number);
        return [Math.round(x1 - x0), Math.round(y1 - y0)];
    });
}
async function tableRead(page: Page) {
    return page.evaluate(() => {
        const host = document.querySelector('[data-witness="host"]') as HTMLElement;
        const root = host.querySelector(".data-table") as HTMLElement | null;
        return {
            hostW: Math.round(host.getBoundingClientRect().width),
            rootW: root ? Math.round(root.getBoundingClientRect().width) : null,
            view: host.querySelector(".data-table-cards") ? "cards" : host.querySelector("table") ? "table" : "none",
            roCalls: (window as any).__roCalls,
            swaps: (window as any).__swaps,
            roErrors: (window as any).__roErrors,
            frames: (window as any).__frames,
        };
    });
}
async function printRead(page: Page) {
    await page.emulateMedia({ media: "print" });
    return page.evaluate(() => {
        const cs = (el: Element) => getComputedStyle(el);
        const stage = document.querySelector('[data-slot="deck-stage"]');
        const app = document.getElementById("app")!;
        return {
            htmlAdjust:
                cs(document.documentElement).getPropertyValue("print-color-adjust") ||
                cs(document.documentElement).getPropertyValue("-webkit-print-color-adjust"),
            htmlPage: cs(document.documentElement).getPropertyValue("page"),
            bodyPage: cs(document.body).getPropertyValue("page"),
            bodyMargin: cs(document.body).margin,
            appMinBlock: cs(app).minBlockSize,
            stagePage: stage ? cs(stage).getPropertyValue("page") : null,
            stages: document.querySelectorAll('[data-slot="deck-stage"]').length,
        };
    });
}

test.afterAll(({ browserName }) => {
    mkdirSync(OUT, { recursive: true });
    writeFileSync(`${OUT}/reads-${browserName}.json`, JSON.stringify(reads, null, 2));
});

for (const width of [320, 390, 768, 1440]) {
    test(`table ${width}`, async ({ page }) => {
        await page.setViewportSize({ width: Math.max(width + 40, 400), height: 800 });
        await open(page, `scene=table&width=${width}`);
        await settle(page);
        const first = await tableRead(page);
        await page.waitForTimeout(1000);
        reads[`table-${width}`] = { first, later: await tableRead(page) };
    });
}

test("table hidden then shown", async ({ page }) => {
    await open(page, "scene=table-hidden");
    await settle(page);
    const hidden = await tableRead(page);
    await page.evaluate(() => (window as any).__show());
    await settle(page);
    reads["table-hidden"] = { hidden, shown: await tableRead(page) };
});

test("table transition", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await open(page, "scene=table-transition");
    await settle(page);
    const at900 = await tableRead(page);
    await page.evaluate(() => (window as any).__setW(400));
    await settle(page, 900);
    const at400 = await tableRead(page);
    await page.evaluate(() => (window as any).__setW(900));
    await settle(page, 900);
    reads["table-transition"] = { at900, at400, back900: await tableRead(page) };
});

test("osc history", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await open(page, "scene=osc");
    await settle(page, 1000);
    const mount = await tableRead(page);
    const steps: Record<string, unknown> = { mount };
    for (const vw of [700, 1280, 500, 1280]) {
        await page.setViewportSize({ width: vw, height: 800 });
        await settle(page, 600);
        const a = await tableRead(page);
        await page.waitForTimeout(600);
        steps[`${Object.keys(steps).length}-${vw}`] = { a, b: await tableRead(page) };
    }
    reads["osc-history"] = steps;
});

for (const q of ["scene=osc-late&mode=raf", "scene=osc-late&mode=micro", "scene=osc-late&mode=timeout&ms=30", "scene=osc-img"]) {
    test(q, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await open(page, q);
        await settle(page);
        const first = await tableRead(page);
        await page.waitForTimeout(1000);
        const later = await tableRead(page);
        await page.waitForTimeout(1000);
        reads[q] = { first, later, last: await tableRead(page) };
    });
}

for (const scene of [
    "print-plain",
    "print-deck",
    "print-deck-later",
    "print-two-decks",
    "print-deck-glass-dialog",
    "print-deck-native-modal",
    "print-deck-removed",
]) {
    test(scene, async ({ page, browserName }) => {
        await open(page, `scene=${scene}`);
        await settle(page, 600);
        const r: Record<string, unknown> = await printRead(page);
        if (browserName === "chromium") r.pdf = mediaBoxes(await page.pdf({ preferCSSPageSize: true }));
        reads[scene] = r;
    });
}
