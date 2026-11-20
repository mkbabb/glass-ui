// O-268: what runs in each frame after an idle fold begins. Per frame (every 6th) the
// running animations (target class, transition property or animation name, play state),
// --dock-morph-t, and the dock's box.
import { test } from "@playwright/test";
test("probe · what animates across the fold", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tests-visual/release-11-0-2/fold-harness.html");
    await page.locator("body[data-ready='1'] .fold-dock").waitFor();
    await page.waitForTimeout(3300);
    const out = await page.evaluate(async () => {
        const root = document.querySelector<HTMLElement>(".glass-dock")!;
        const rows: unknown[] = [];
        let n = 0;
        const end = performance.now() + 2400;
        await new Promise<void>((done) => {
            const tick = () => {
                if (n++ % 6 === 0) {
                    const anims = document.getAnimations().map((a) => {
                        const t = (a.effect as KeyframeEffect | null)?.target as Element | null;
                        const name = (a as CSSTransition).transitionProperty ?? (a as CSSAnimation).animationName ?? a.constructor.name;
                        return `${(t?.className || t?.tagName || "?").toString().slice(0, 40)}:${name}:${a.playState}`;
                    });
                    const r = root.getBoundingClientRect();
                    rows.push({ t: Math.round(performance.now()), morph: root.style.getPropertyValue("--dock-morph-t").slice(0, 6), w: Math.round(r.width * 10) / 10, anims });
                }
                if (performance.now() < end) requestAnimationFrame(tick);
                else done();
            };
            requestAnimationFrame(tick);
        });
        return rows;
    });
    for (const r of out) console.log(JSON.stringify(r));
});
