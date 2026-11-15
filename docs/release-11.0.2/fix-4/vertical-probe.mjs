// The vertical dock's cross extent, folded and open, and what makes it: the root's inline
// size, padding and border, and each pane's inline size. Critic 2's vertical scene, 1440
// fine and 390 coarse. One browser, a context a cell.
//   node vertical-probe.mjs <base-url> <chromium|webkit> [executablePath]
import { chromium, webkit } from "playwright";
const [base, engine, exe] = process.argv.slice(2);
const browser = await (engine === "webkit" ? webkit : chromium).launch(exe ? { executablePath: exe } : {});
const read = () => {
    const r = document.querySelector(".witness-dock");
    const cs = getComputedStyle(r);
    const box = (s) => {
        const el = r.querySelector(s);
        return el ? { w: el.offsetWidth, h: el.offsetHeight, pos: getComputedStyle(el).position } : null;
    };
    return {
        cls: r.className,
        root: { w: r.offsetWidth, h: r.offsetHeight, padInline: cs.paddingInline, padBlock: cs.paddingBlock, border: cs.borderLeftWidth },
        plate: box(":scope > .dock-plate"),
        layers: box(".dock-layers"),
        summary: box(".dock-layer--summary"),
        full: box(".dock-layer--full"),
        seat: box(".dock-layer--full [aria-label='One']"),
    };
};
const out = {};
try {
    for (const coarse of [false, true]) {
        const context = await browser.newContext(
            coarse ? { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } } : { viewport: { width: 1440, height: 900 } },
        );
        try {
            const page = await context.newPage();
            await page.goto(`${base}/tests-visual/release-11-0-1/critic-2.html?scene=vertical&collapse=closed`);
            await page.locator(".witness-dock").waitFor();
            await page.waitForTimeout(800);
            const folded = await page.evaluate(read);
            const summary = page.locator(".witness-dock .dock-layer--summary");
            if (coarse) await summary.tap();
            else await summary.click();
            await page.waitForTimeout(1200);
            out[coarse ? "390c" : "1440f"] = { folded, open: await page.evaluate(read) };
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
console.log(engine, JSON.stringify(out, null, 1));
