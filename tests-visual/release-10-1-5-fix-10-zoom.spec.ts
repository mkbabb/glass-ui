// fix 10 scratch: under an ancestor zoom, does a box's computed width equal its offset width? Never fails.
import { test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
test("zoom reads", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/tests-visual/release-10-1-3/harness.html?scene=edge-anchor&anchor=bottom&seat=anchored&zoom=1.25`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.waitForTimeout(800);
    const r = await page.evaluate(() =>
        [".glass-dock", ".glass-dock .dock-layers", ".glass-dock .dock-run"].map((sel) => {
            const el = document.querySelector<HTMLElement>(sel)!;
            const cs = getComputedStyle(el);
            return { sel, ow: el.offsetWidth, oh: el.offsetHeight, w: cs.width, h: cs.height, bs: cs.boxSizing, rect: [el.getBoundingClientRect().width, el.getBoundingClientRect().height] };
        }),
    );
    const d = new URL("../docs/release-10.1.5/fix-10/zoom/", import.meta.url).pathname;
    mkdirSync(d, { recursive: true });
    writeFileSync(`${d}${test.info().project.name}.json`, JSON.stringify(r, null, 1));
});
