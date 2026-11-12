import { test } from "@playwright/test";
for (const w of [1440, 390]) test(`probe vertical boxes ${w}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 844 });
    await page.goto(`/tests-visual/release-10-1-2/harness.html?scene=stale-endpoint&pin=&axis=vertical`);
    await page.waitForFunction(() => (window as any).__ready);
    const settled = (p: string) =>
        page.waitForFunction((p) => {
            const el = document.querySelector(".glass-dock");
            return !!el && el.classList.contains(p) && !el.hasAttribute("data-morphing");
        }, p);
    const read = (tag: string) => page.evaluate((tag) => {
        const el = document.querySelector<HTMLElement>(".glass-dock")!;
        const layers = el.querySelector<HTMLElement>(".dock-layers")!;
        const full = el.querySelector<HTMLElement>(".dock-layer--full")!;
        const sum = el.querySelector<HTMLElement>(".dock-layer--summary")!;
        const m = (e: HTMLElement) => { const c = getComputedStyle(e); return `${c.marginTop}/${c.marginBottom}`; };
        return `${tag}: root=${el.offsetHeight} layers=${layers.offsetHeight} (m ${m(layers)}) full=${full.offsetHeight} (m ${m(full)}, pad ${getComputedStyle(full).paddingTop}) sum=${sum.offsetHeight} fits=${el.hasAttribute("data-run-fits")} room=${el.style.getPropertyValue("--dock-run-room-block")} maxH=${getComputedStyle(el).maxHeight}`;
    }, tag);
    await settled("collapsed");
    console.log(`== ${w}`);
    console.log(await read("rest collapsed"));
    await page.evaluate(() => (window as any).__expand());
    await settled("expanded");
    await page.waitForTimeout(150);
    console.log(await read("rest expanded"));
    await page.evaluate(() => (window as any).__collapse());
    await settled("collapsed");
    await page.waitForTimeout(150);
    console.log(await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>(".glass-dock")!;
        const layers = el.querySelector<HTMLElement>(".dock-layers")!;
        const full = el.querySelector<HTMLElement>(".dock-layer--full")!;
        const sum = el.querySelector<HTMLElement>(".dock-layer--summary")!;
        const set = (e: HTMLElement, p: string, v: string) => e.style.setProperty(p, v, "important");
        el.style.setProperty("--dock-expanded-px", "initial");
        set(full, "position", "relative"); set(full, "inset", "auto"); set(sum, "position", "absolute");
        return `collapsed-posture read of full: root=${el.offsetHeight} layers=${layers.offsetHeight} full=${full.offsetHeight} pad=${getComputedStyle(full).paddingTop}`;
    }));
});
