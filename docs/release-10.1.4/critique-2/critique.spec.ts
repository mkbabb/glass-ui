// critique-2 recorder: reads only, written to $PROBE_OUT/reads-<engine>.json. The verdicts
// are drawn in critique-2.md from the reads, not asserted here.
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = process.env.PROBE_OUT ?? "out";
const reads: Record<string, unknown> = {};

async function open(page: Page, query: string): Promise<void> {
    await page.goto(`/docs/release-10.1.4/critique-2/probe.html?${query}`);
    await page.waitForFunction(() => (window as any).__ready, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
}
async function settle(page: Page, ms = 300): Promise<void> {
    await page.evaluate(
        () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))),
    );
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
        return {
            hostW: host.getBoundingClientRect().width,
            cards: host.querySelectorAll(".data-table-cards").length,
            tables: host.querySelectorAll("table").length,
            roCalls: (window as any).__roCalls,
        };
    });
}
async function printRead(page: Page) {
    await page.emulateMedia({ media: "print" });
    return page.evaluate(() => {
        const adj = (el: Element) => {
            const cs = getComputedStyle(el);
            return cs.getPropertyValue("print-color-adjust") || cs.getPropertyValue("-webkit-print-color-adjust");
        };
        const stage = document.querySelector('[data-slot="deck-stage"]');
        const matchesDeckRule = (el: Element) =>
            [...document.styleSheets].some((sheet) => {
                const walk = (rules: CSSRuleList): boolean =>
                    [...rules].some((r) =>
                        r instanceof CSSStyleRule
                            ? r.style.getPropertyValue("page") === "deck" && el.matches(r.selectorText)
                            : "cssRules" in r && walk((r as CSSGroupingRule).cssRules),
                    );
                return walk(sheet.cssRules);
            });
        let stageAncestorPos: string[] = [];
        for (let el = stage?.parentElement; el && el !== document.body; el = el.parentElement)
            stageAncestorPos.push(`${el.tagName.toLowerCase()}:${getComputedStyle(el).position}`);
        return {
            htmlAdjust: adj(document.documentElement),
            appMin: getComputedStyle(document.getElementById("app")!).minBlockSize,
            stagePage: stage ? getComputedStyle(stage).getPropertyValue("page") : null,
            bodyPage: getComputedStyle(document.body).getPropertyValue("page"),
            bodyTakesDeck: matchesDeckRule(document.body),
            stageTakesDeck: stage ? matchesDeckRule(stage) : null,
            stageInModal: stage ? !!stage.closest(":modal") : null,
            stageAncestorPos,
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
        await page.waitForTimeout(1500);
        const later = await tableRead(page);
        reads[`table-${width}`] = { first, later };
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

test("table late v-if", async ({ page }) => {
    await open(page, "scene=table-late");
    await settle(page, 600);
    reads["table-late"] = await tableRead(page);
});

test("table shrink-to-fit at 1280 viewport", async ({ page }) => {
    await open(page, "scene=table-shrink");
    await settle(page);
    const first = await tableRead(page);
    await page.waitForTimeout(1500);
    reads["table-shrink"] = { first, later: await tableRead(page) };
});

test("ro-count", async ({ page }) => {
    await open(page, "scene=ro-count");
    await settle(page);
    const mount = await page.evaluate(() => [...(window as any).__a]);
    await page.evaluate(() => (window as any).__rerender());
    await settle(page);
    const rerender = await page.evaluate(() => [...(window as any).__a]);
    await page.evaluate(() => (window as any).__swap());
    await settle(page);
    const swap = await page.evaluate(() => [...(window as any).__a]);
    reads["ro-count"] = { mount, rerender, swap };
});

for (const scene of [
    "print-plain",
    "print-deck",
    "print-deck-later",
    "print-two-decks",
    "print-deck-native-modal",
    "print-deck-glass-dialog",
    "print-deck-nonmodal",
    "print-deck-fixed",
    "print-deck-popover",
    "print-deck-scroll-shell",
    "print-deck-consumer-page",
    "print-plain-consumer-page",
]) {
    test(scene, async ({ page, browserName }) => {
        await open(page, `scene=${scene}`);
        await settle(page, 600);
        const r: Record<string, unknown> = await printRead(page);
        if (browserName === "chromium") {
            r.pdf = mediaBoxes(await page.pdf({ preferCSSPageSize: true }));
        }
        reads[scene] = r;
    });
}
