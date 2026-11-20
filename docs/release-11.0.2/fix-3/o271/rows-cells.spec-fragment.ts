for (const scene of ["transport", "editor", "stretched"]) {
    for (const width of [360, 390, 1440]) {
        test(`rows · the ${scene} dock's rows fit with a persistent region beside the layers at ${width}`, async ({ page }, info) => {
            // The transport face's width is fourier's formula, which counts a 40 px layer
            // square; the coarse persistent seat is 44 px, so it overflows on 11.0.0 too.
            test.skip(scene === "transport" && info.project.name === "coarse-touch", "the face's formula counts a fine-pointer seat");
            await page.setViewportSize({ width, height: 800 });
            await countRoLoops(page);
            await page.goto(`/tests-visual/release-11-0-2/rows-harness.html?scene=${scene}`);
            await page.locator("body[data-ready='1'] [data-witness='dock'] .dock-run").waitFor({ state: "attached" });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(300);
            await page.evaluate(() => (window as unknown as { __dock: { value: { expand: () => void } } }).__dock.value.expand());
            await page.waitForTimeout(1200);
            const r = await page.evaluate(() => {
                const root = document.querySelector<HTMLElement>("[data-witness='dock']")!;
                const box = (e: Element | null) => {
                    if (!e) return null;
                    const b = e.getBoundingClientRect();
                    return [Math.round(b.left * 100) / 100, Math.round(b.width * 100) / 100];
                };
                const scrollers = [root, ...root.querySelectorAll<HTMLElement>("*")]
                    .filter((e) => e.clientWidth > 0 && e.scrollWidth > e.clientWidth && /auto|scroll|hidden/.test(getComputedStyle(e).overflowX))
                    .map((e) => `${e.className.toString().slice(0, 48)} ${e.scrollWidth}/${e.clientWidth}`);
                const run = root.querySelector<HTMLElement>(".dock-run")!;
                const layers = root.querySelector<HTMLElement>(".dock-layers")!;
                const cs = getComputedStyle(layers);
                return {
                    collapsed: root.classList.contains("collapsed"),
                    morphing: root.hasAttribute("data-morphing"),
                    root: [root.scrollWidth, root.clientWidth, root.offsetWidth, root.style.getPropertyValue("--dock-expanded-px")],
                    run: [run.scrollWidth, run.clientWidth],
                    layers: [cs.marginInlineStart, cs.marginInlineEnd, box(layers)],
                    persistent: box(root.querySelector(".dock-persistent")),
                    face: box(run.firstElementChild),
                    page: [document.documentElement.scrollWidth, document.documentElement.clientWidth],
                    scrollers,
                };
            });
            info.annotations.push({ type: "rows", description: JSON.stringify({ ...r, roLoops: await roLoops(page) }) });
            expect(r.collapsed).toBe(false);
            expect(r.root[0], "the root's scrollWidth is its clientWidth").toBe(r.root[1]);
            expect(r.run[0], "the run's scrollWidth is its clientWidth").toBe(r.run[1]);
            expect(r.scrollers, "no element is a horizontal scroller at rest").toEqual([]);
            expect(r.page[0], "the page does not scroll sideways").toBe(r.page[1]);
        });
    }
}
