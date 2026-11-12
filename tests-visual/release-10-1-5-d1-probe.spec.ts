// fix 9 scratch probe: the 10.1.3 D-1 bottom-anchored ancestor-zoom expand, per frame. Reads only.
import { test } from "@playwright/test";
import { appendFileSync } from "node:fs";
const OUT = process.env.PROBE_OUT ?? "/dev/null";
test.use({ viewport: { width: 390, height: 844 } });
test("d1 probe", async ({ page }) => {
    await page.goto(`/tests-visual/release-10-1-3/harness.html?scene=edge-anchor&anchor=bottom&seat=anchored&zoom=1.25`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.locator('[data-witness="Edit contour"]').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(4, 700);
    await page.waitForTimeout(300);
    await page.evaluate(() => {
        const w = window as unknown as { __f: unknown[] };
        w.__f = [];
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const summary = document.querySelector('[data-witness="summary"]')!;
        const run = dock.querySelector<HTMLElement>(".dock-run")!;
        const t0 = performance.now();
        const tick = () => {
            let o = 1;
            for (let el: Element | null = summary; el && el !== dock; el = el.parentElement) o *= Number(getComputedStyle(el).opacity);
            w.__f.push({
                t: Math.round(performance.now() - t0),
                m: dock.hasAttribute("data-morphing"),
                top: +summary.getBoundingClientRect().top.toFixed(2),
                o: +o.toFixed(3),
                fits: dock.hasAttribute("data-run-fits"),
                room: dock.style.getPropertyValue("--dock-run-room-block"),
                pad: getComputedStyle(run).paddingTop,
                act: run.classList.contains("is-active"),
                h: +dock.getBoundingClientRect().height.toFixed(2),
                ex: dock.style.getPropertyValue("--dock-expanded-px"),
                ps: getComputedStyle(document.querySelector(".dock-layer--summary")!).getPropertyValue("--dock-pane-shift"),
            });
            if (performance.now() - t0 < 1600) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
    const box = (await page.locator('[data-witness="Edit contour"]').boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(1700);
    const f = await page.evaluate(() => (window as unknown as { __f: unknown[] }).__f);
    appendFileSync(OUT, JSON.stringify(f) + "\n");
});
