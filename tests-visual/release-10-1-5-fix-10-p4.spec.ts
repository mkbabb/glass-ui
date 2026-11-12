// glass-ui 10.1.5 fix round 10 — P4 attribution probe (critique-9/10 P4): a layered dock's first expand from a
// closed mount, repeated, with the layer state read on every frame and, at rest, every box the endpoint depends
// on. Harness `release-10-1-5/critic-7.html?scene=layers` (an active `wide` layer of nine seats and an inactive
// `narrow` layer of two, `maxw=260`). Rows bank to docs/release-10.1.5/fix-10/p4/<project>/. Never fails on a
// finding.
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../docs/release-10.1.5/fix-10/p4/", import.meta.url).pathname;
const N = Number(process.env.P4_N ?? 24);

async function open(page: Page, q: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-7.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
}

function expandTrace(page: Page) {
    return page.evaluate(
        () =>
            new Promise<unknown[]>((res) => {
                const out: unknown[] = [];
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const t0 = performance.now();
                (window as unknown as { __dock: { expand(): void } }).__dock.expand();
                const tick = () => {
                    const t = performance.now() - t0;
                    const run = dock.querySelector<HTMLElement>(".dock-layers > .dock-run")!;
                    const cf = dock.querySelector<HTMLElement>(".dock-crossfade");
                    const faces = [...dock.querySelectorAll<HTMLElement>(".dock-face")].map(
                        (f) => `${f.className.replace("dock-face", "").trim() || "-"}:${getComputedStyle(f).position}:${f.offsetWidth}`,
                    );
                    out.push({
                        t: Math.round(t),
                        m: dock.hasAttribute("data-morphing"),
                        fits: dock.hasAttribute("data-run-fits"),
                        exp: dock.style.getPropertyValue("--dock-expanded-px"),
                        rw: dock.offsetWidth,
                        run: `${run.className.includes("is-active") ? "A" : "-"} ${run.offsetWidth} ${run.clientWidth}/${run.scrollWidth}`,
                        cf: cf ? `${cf.offsetWidth} ${cf.getAttribute("style") ?? ""}` : null,
                        faces,
                    });
                    if (t < 1400) requestAnimationFrame(tick);
                    else res(out);
                };
                requestAnimationFrame(tick);
            }),
    );
}

function restRead(page: Page) {
    return page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const run = dock.querySelector<HTMLElement>(".dock-layers > .dock-run")!;
        const chain: unknown[] = [];
        for (let el: HTMLElement | null = run; el && el !== dock.parentElement; el = el.parentElement) {
            const cs = getComputedStyle(el);
            chain.push({ c: el.className.slice(0, 60), w: el.offsetWidth, sw: el.scrollWidth, pos: cs.position, is: cs.inlineSize, mis: cs.minInlineSize, xis: cs.maxInlineSize, style: el.getAttribute("style") });
        }
        const faces = [...dock.querySelectorAll<HTMLElement>(".dock-face")].map((f) => {
            const cs = getComputedStyle(f);
            return { c: f.className, pos: cs.position, is: cs.inlineSize, w: f.offsetWidth, sw: f.scrollWidth, inset: cs.inset, style: f.getAttribute("style") };
        });
        return {
            plate: plate.offsetWidth,
            morphing: dock.hasAttribute("data-morphing"),
            fits: dock.hasAttribute("data-run-fits"),
            cls: dock.className,
            exp: dock.style.getPropertyValue("--dock-expanded-px"),
            layer: (window as unknown as { __layer: { value: string } }).__layer.value,
            chain,
            faces,
        };
    });
}

for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`p4 ${pointer}`, () => {
        if (pointer === "coarse") test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
        test(`p4 layered first expand ${pointer}`, async ({ page }) => {
            test.setTimeout(1_200_000);
            const rows: unknown[] = [];
            const misses: unknown[] = [];
            for (const width of [390, 1440])
                for (let i = 0; i < N; i += 1) {
                    await page.setViewportSize({ width, height: 800 });
                    await open(page, "scene=layers&collapse=closed&maxw=260");
                    if (pointer === "fine") await page.mouse.move(2, 790);
                    const frames = await expandTrace(page);
                    const rest = await restRead(page);
                    const miss = rest.plate < 250;
                    rows.push({ width, i, plate: rest.plate, fits: rest.fits, exp: rest.exp });
                    if (miss) {
                        // Does a forced re-read or a resize event correct it?
                        await page.waitForTimeout(1000);
                        const later = await restRead(page);
                        await page.evaluate(() => window.dispatchEvent(new Event("resize")));
                        await page.waitForTimeout(300);
                        const afterResize = await restRead(page);
                        misses.push({ width, i, rest, later, afterResize, frames });
                    }
                }
            const d = `${OUT}${test.info().project.name}`;
            mkdirSync(d, { recursive: true });
            writeFileSync(`${d}/p4-${pointer}.json`, JSON.stringify({ rows, misses }, null, 1));
        });
    });
}
