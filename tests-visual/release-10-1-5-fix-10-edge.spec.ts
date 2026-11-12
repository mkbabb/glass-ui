// fix 10 scratch: the horizontal fit edge read two ways at one max inline size: swept down at rest, and
// reached by a clamp mid-expand. Banks to docs/release-10.1.5/fix-10/edge/<project>.json. Never fails.
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../docs/release-10.1.5/fix-10/edge/", import.meta.url).pathname;
async function open(page: Page, q: string) {
    await page.goto(`/tests-visual/release-10-1-5/critic-7.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
}
const read = (page: Page) =>
    page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const run = dock.querySelector<HTMLElement>(".dock-layers > .dock-run")!;
        const seats = [...run.children].filter((c) => (c as HTMLElement).offsetParent === run) as HTMLElement[];
        const cs = getComputedStyle(run);
        return {
            max: dock.style.maxInlineSize, root: dock.offsetWidth, rootF: dock.getBoundingClientRect().width,
            run: run.offsetWidth, cw: run.clientWidth, sw: run.scrollWidth, pad: cs.padding, margin: cs.margin,
            span: seats.length ? seats.at(-1)!.offsetLeft + seats.at(-1)!.offsetWidth - seats[0]!.offsetLeft : 0,
            seats: seats.map((s) => [s.offsetLeft, s.offsetWidth]),
            fits: dock.hasAttribute("data-run-fits"), exp: dock.style.getPropertyValue("--dock-expanded-px"),
            yieldVar: getComputedStyle(dock).getPropertyValue("--dock-run-yield"),
        };
    });
test("edge", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 800 });
    const H = `scene=dock&collapse=closed&kinds=${encodeURIComponent("tab:Home,icon,icon,icon")}`;
    const rows: unknown[] = [];
    await open(page, H);
    await page.mouse.move(2, 790);
    await page.evaluate(() => (window as any).__dock.expand());
    await page.waitForTimeout(1300);
    rows.push({ at: "rest none", ...(await read(page)) });
    const W = await page.evaluate(() => document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!.offsetWidth);
    for (let m = W; m >= W - 30; m -= 1) {
        await page.evaluate((m) => (document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = m + "px"), m);
        await page.waitForTimeout(150);
        rows.push({ at: `sweep ${m}`, ...(await read(page)) });
    }
    for (const [from, to] of [[0, 0], [1, -1], [0, -1]]) {
        const E = W - 12;
        await open(page, `${H}&maxw=${E + from}`);
        await page.mouse.move(2, 790);
        rows.push({ at: `closed at ${E + from}`, ...(await read(page)) });
        await page.evaluate(() => (window as any).__dock.expand());
        await page.waitForTimeout(110);
        await page.evaluate((m) => (document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = m + "px"), E + to);
        await page.waitForTimeout(1500);
        rows.push({ at: `expand ${E + from}->${E + to}`, ...(await read(page)) });
    }
    mkdirSync(OUT, { recursive: true });
    writeFileSync(`${OUT}${test.info().project.name}.json`, JSON.stringify(rows, null, 1));
});
