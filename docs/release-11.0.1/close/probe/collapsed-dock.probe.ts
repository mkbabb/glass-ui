// 11.0.1 close: what radius-scale's "collapsed dock is a circle" reads, box by box, in each
// Chromium project. A reading: it logs, and asserts only that the dock mounted.
import { expect, test } from "@playwright/test";

for (const theme of ["light"]) {
    test(`collapsed dock geometry (${theme})`, async ({ page }, info) => {
        await page.goto(`/tests-visual/b7-shape/harness.html?scene=radius&theme=${theme}`);
        await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
        await page.waitForTimeout(800);
        const read = await page.evaluate(() => {
            const root = document.querySelector<HTMLElement>(".glass-dock.collapsed")!;
            const box = (el: Element) => {
                const r = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                return { cls: (el as HTMLElement).className.toString().slice(0, 90), w: +r.width.toFixed(2), h: +r.height.toFixed(2), radius: cs.borderTopLeftRadius, rr: cs.borderTopRightRadius, display: cs.display, minInline: cs.minInlineSize, padding: cs.padding };
            };
            const out: Record<string, unknown> = { root: box(root), cross: root.style.getPropertyValue("--dock-plate-cross-px") };
            const kids: unknown[] = [];
            root.querySelectorAll(".dock-plate, .dock-layers, .dock-layer, .dock-layer--summary, .dock-run, [class*='summary']").forEach((el) => kids.push(box(el)));
            out.kids = kids;
            return out;
        });
        console.log(`${info.project.name} ${JSON.stringify(read)}`);
        await page.locator(".glass-dock.collapsed").screenshot({ path: `docs/release-11.0.1/close/probe/collapsed-${info.project.name}-${theme}.png` }).catch(() => {});
        expect(read.root).toBeTruthy();
    });
}
