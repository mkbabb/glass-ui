// Fix-close-1 frame trace of the O-101 reversal cells (release-10-1-2's driver, with every
// root write logged against the rAF frame it lands in). Copied into tests-visual/ to run.
import { expect, test, type Page } from "@playwright/test";

const viewport = (width: number) => ({ width, height: 844 });

async function trace(page: Page, scene: string, from: number, to: number) {
    await page.setViewportSize(viewport(from));
    await page.goto(`/tests-visual/release-10-1-2/harness.html?scene=${scene}&pin=&axis=horizontal`);
    await page.waitForFunction(() => (window as any).__ready);
    const settled = (p: string) =>
        page.waitForFunction((p) => {
            const el = document.querySelector(".glass-dock");
            return !!el && el.classList.contains(p) && !el.hasAttribute("data-morphing");
        }, p);
    const call = (n: string) => page.evaluate((n) => (window as any)[n](), n);
    await settled("collapsed");
    await call("__expand");
    await settled("expanded");
    await page.waitForTimeout(150);
    await page.evaluate((to) => {
        const w = window as any;
        w.__log = [];
        w.__frame = 0;
        w.__stop = false;
        const el = document.querySelector<HTMLElement>(".glass-dock")!;
        const run = el.querySelector<HTMLElement>(".dock-run")!;
        new MutationObserver((recs) => {
            for (const r of recs) {
                const v =
                    r.attributeName === "style"
                        ? el.style.getPropertyValue("--dock-expanded-px")
                        : String(el.getAttribute(r.attributeName!));
                if (r.attributeName === "style" && v === r.oldValue) continue;
                w.__log.push(`  write f${w.__frame} ${r.attributeName}=${v} iw=${innerWidth}`);
            }
        }).observe(el, { attributes: true, attributeFilter: ["data-run-fits", "data-morphing"] });
        let last = "";
        const tick = () => {
            const b = getComputedStyle(run, "::before").width;
            const a = getComputedStyle(run, "::after").width;
            const row = `f${w.__frame} iw=${innerWidth} m=${el.hasAttribute("data-morphing") ? 1 : 0} fits=${el.hasAttribute("data-run-fits") ? 1 : 0} full=${run.classList.contains("is-active") ? 1 : 0} t=${el.style.getPropertyValue("--dock-morph-t").slice(0, 5)} reserved=${el.style.getPropertyValue("--dock-expanded-px")} size=${el.offsetWidth} run=${run.offsetWidth}/${run.clientWidth}/${run.scrollWidth} before=${a === b ? b : b + "|" + a} changed=${innerWidth === to ? 1 : 0}`;
            if (row.replace(/^f\d+ /, "") !== last) w.__log.push(row);
            last = row.replace(/^f\d+ /, "");
            w.__frame++;
            if (!w.__stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, to);
    await call("__collapse");
    await page.waitForTimeout(60);
    await page.setViewportSize(viewport(to));
    await call("__expand");
    await settled("expanded");
    await page.waitForTimeout(200);
    await page.evaluate(() => ((window as any).__stop = true));
    return (await page.evaluate(() => (window as any).__log)) as string[];
}

for (const [scene, from, to] of [
    ["overflow", 390, 1440],
    ["overflow", 1440, 390],
    ["stale-endpoint", 1440, 390],
    ["stale-endpoint", 390, 1440],
] as const) {
    test(`trace ${scene} reversal ${from}->${to}`, async ({ page }, info) => {
        const log = await trace(page, scene, from, to);
        console.log(`=== ${info.project.name} ${scene} ${from}->${to}\n` + log.join("\n"));
        expect(log.length).toBeGreaterThan(0);
    });
}
