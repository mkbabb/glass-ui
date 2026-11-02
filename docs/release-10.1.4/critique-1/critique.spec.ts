import { expect, test, type Page } from "@playwright/test";

const OUT: Record<string, unknown> = {};
async function open(page: Page, q: string) {
    await page.goto(`/docs/release-10.1.4/critique-1/probe.html?${q}`);
    await page.waitForFunction(() => (window as any).__ready);
}
const frames = (page: Page, n = 3) =>
    page.evaluate((n) => new Promise<void>((r) => { let i = 0; const f = () => (++i >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);
function boxes(pdf: Buffer) {
    return [...pdf.toString("latin1").matchAll(/\/MediaBox\s*\[\s*([\d.\s-]+)\]/g)].map((m) => {
        const [a, b, c, d] = m[1].trim().split(/\s+/).map(Number);
        return [Math.round(c - a), Math.round(d - b)];
    });
}
async function reads(page: Page) {
    await page.emulateMedia({ media: "print" });
    return page.evaluate(() => {
        const cs = (e: Element) => getComputedStyle(e);
        const st = [...document.querySelectorAll('[data-slot="deck-stage"]')];
        return {
            htmlAdjust: cs(document.documentElement).getPropertyValue("print-color-adjust"),
            htmlMargin: cs(document.body).marginTop,
            appMin: cs(document.getElementById("app")!).minBlockSize,
            stagePages: st.map((s) => cs(s).getPropertyValue("page")),
        };
    });
}

for (const width of [320, 390, 768, 1440]) {
    test(`g: DataTable at ${width} on mount`, async ({ page }) => {
        await open(page, `scene=table&width=${width}`);
        await frames(page); await page.waitForTimeout(200);
        const cards = await page.locator(".data-table-cards").count();
        const tables = await page.locator("table").count();
        OUT[`table-${width}`] = { cards, tables };
        expect(cards).toBe(width < 640 ? 1 : 0);
        expect(tables).toBe(width < 640 ? 0 : 1);
    });
}

test("g: DataTable hidden then shown", async ({ page }) => {
    await open(page, "scene=table-hidden");
    await frames(page); await page.waitForTimeout(200);
    const before = await page.locator(".data-table-cards").count();
    await page.evaluate(() => (window as any).__show());
    await frames(page); await page.waitForTimeout(200);
    const after = await page.locator(".data-table-cards").count();
    OUT["table-hidden"] = { before, after };
    expect(after).toBe(1);
});

test("g: useResizeObserver dispatch count (laid-out box, display:none box)", async ({ page }) => {
    await open(page, "scene=ro-count");
    await frames(page, 4); await page.waitForTimeout(300);
    const s1 = await page.evaluate(() => ({ a: (window as any).__a, b: (window as any).__b }));
    await page.evaluate(() => (window as any).__showB());
    await frames(page, 4); await page.waitForTimeout(300);
    const s2 = await page.evaluate(() => ({ a: (window as any).__a, b: (window as any).__b }));
    OUT["ro-count"] = { s1, s2 };
    expect(s1.a).toEqual([[200, 100]]);
    expect(s2.b.at(-1)).toEqual([300, 50]);
});

test("g: every caller family mounted, RO callbacks settle (no loop)", async ({ page }) => {
    await open(page, "scene=ro-loop");
    await page.waitForTimeout(800);
    const c0 = await page.evaluate(() => (window as any).__roCalls);
    await page.waitForTimeout(1500);
    const c1 = await page.evaluate(() => (window as any).__roCalls);
    OUT["ro-loop"] = { c0, c1 };
    expect(c1 - c0).toBe(0);
});

const printScenes = ["print-plain", "print-deck", "print-deck-after-header", "print-deck-later", "print-two-decks", "print-deck-flex", "print-deck-grid", "print-deck-dialog", "print-deck-hidden"];
for (const s of printScenes) {
    test(`f: ${s}`, async ({ page, browserName }) => {
        await open(page, `scene=${s}`);
        if (s === "print-deck-later") await page.waitForSelector('[data-slot="deck-stage"]', { state: "attached" });
        await frames(page);
        const r: Record<string, unknown> = await reads(page);
        if (browserName === "chromium") r.pdf = boxes(await page.pdf({ preferCSSPageSize: true }));
        OUT[`${browserName}:${s}`] = r;
    });
}

test.afterAll(async ({ browserName }) => {
    const fs = await import("node:fs");
    fs.writeFileSync(`${process.env.PROBE_OUT ?? "."}/reads-${browserName}.json`, JSON.stringify(OUT, null, 1));
});
