// glass-ui 11.0.1, critic round 1 — k3's scene at 320 read plainly. The release spec's k3
// returns early when the seats' span passes the port (`expectHonestReach`), so on that path
// it reads neither the rest corner nor the end rings. This prints which path each engine
// takes, fine and coarse, with the plate's corners and a capture.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "@playwright/test";

const OUT = process.env.CRITIC_OUT ?? "docs/release-11.0.1/critic-1/shots";

for (const coarse of [false, true]) {
    test.describe(`critic 1 k3 ${coarse ? "coarse" : "fine"}`, () => {
        test.use(coarse ? { hasTouch: true, isMobile: true, viewport: { width: 320, height: 800 }, deviceScaleFactor: 3 } : { viewport: { width: 320, height: 800 }, deviceScaleFactor: 3 });
        test(`k3 scene at 320 ${coarse ? "coarse" : "fine"}: span, port, flag, range, corners`, async ({ page }, info) => {
            const e = info.project.name === "webkit" ? "wk" : "ch";
            await page.goto("/tests-visual/release-10-1-5/harness.html?scene=seats&kinds=tab:Home,icon,icon,tab:Settings");
            await page.locator(".glass-dock").first().waitFor();
            await page.evaluate(() => document.fonts.ready);
            await page.mouse.move(2, 2);
            await page.waitForTimeout(800);
            const read = await page.evaluate(() => {
                const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                const root = run.closest<HTMLElement>(".glass-dock")!;
                const plate = root.querySelector<HTMLElement>(":scope > .dock-plate")!;
                const k = [...run.children].filter((c) => (c as HTMLElement).offsetWidth > 0 && c.hasAttribute("data-witness")) as HTMLElement[];
                const all = [...run.children] as HTMLElement[];
                const cs = getComputedStyle(plate);
                const rr = run.getBoundingClientRect();
                return {
                    span: all.at(-1)!.offsetLeft + all.at(-1)!.offsetWidth - all[0]!.offsetLeft,
                    port: run.clientWidth,
                    range: run.scrollWidth - run.clientWidth,
                    scrollLeft: run.scrollLeft,
                    fits: run.hasAttribute("data-run-fits") || root.hasAttribute("data-run-fits"),
                    dockW: root.offsetWidth,
                    plate: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].join(" "),
                    half: plate.offsetHeight / 2,
                    seats: k.map((s) => { const b = s.getBoundingClientRect(); return `${s.dataset.witness}:${(b.left - rr.left).toFixed(1)}..${(b.right - rr.left).toFixed(1)}`; }),
                    runW: rr.width,
                };
            });
            mkdirSync(OUT, { recursive: true });
            const b = (await page.locator(".glass-dock").first().boundingBox())!;
            writeFileSync(join(OUT, `k3-${e}-${coarse ? "coarse" : "fine"}.png`), await page.screenshot({ clip: { x: 0, y: Math.max(0, b.y - 12), width: 320, height: b.height + 24 } }));
            console.log(`c1 ${JSON.stringify({ cell: `k3 ${e} ${coarse ? "coarse" : "fine"}`, path: read.span > read.port ? "expectHonestReach (early return)" : "expectFitting", ...read })}`);
        });
    });
}
