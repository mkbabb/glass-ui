// Fix seat 3 probe: the dock Select's first frames under reduced motion, with the
// trigger's box and scale beside the plate's, and the pointer events' times. Run twice:
// as shipped, and with the dock trigger's press scale held at 1.
import { test } from "@playwright/test";
import { gotoReady, pressOn } from "../../../../tests-visual/release-11-1-1/film";

for (const variant of ["shipped", "no-press-scale", "shipped-again"] as const) {
    test(`dsel · ${variant}`, async ({ page }, info) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await gotoReady(page, "/tests-visual/release-11-1-1/exits-harness.html");
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        if (variant === "no-press-scale") await page.addStyleTag({ content: ".dock-trigger:active { scale: 1; }" });
        await page.waitForTimeout(400);
        await page.evaluate(() => {
            const w = window as unknown as { __p: { t0: number; frames: unknown[]; events: unknown[]; stop: boolean } };
            const p = { t0: performance.now(), frames: [] as unknown[], events: [] as unknown[], stop: false };
            w.__p = p;
            const trig = document.querySelector<HTMLElement>('[data-testid="x-select"]')!;
            for (const type of ["pointerdown", "pointerup", "click"])
                trig.addEventListener(type, (e) => p.events.push([type, Math.round(e.timeStamp - p.t0)]), true);
            const tick = (now: number) => {
                const c = document.querySelector<HTMLElement>('[data-testid="x-select-content"]');
                const tr = trig.getBoundingClientRect();
                const row: unknown[] = [Math.round(now - p.t0), getComputedStyle(trig).scale, +tr.left.toFixed(1), +tr.bottom.toFixed(1), +tr.width.toFixed(1)];
                if (c) {
                    const r = c.getBoundingClientRect();
                    let o = 1;
                    for (let n: Element | null = c; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
                    row.push(+o.toFixed(3), +r.left.toFixed(1), +r.top.toFixed(1));
                }
                p.frames.push(row);
                if (!p.stop) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        await page.waitForTimeout(80);
        await pressOn(page, info.project.name, '[data-testid="x-select"]');
        await page.waitForTimeout(500);
        const p = await page.evaluate(() => {
            const w = window as unknown as { __p: { frames: unknown[][]; events: unknown[]; stop: boolean } };
            w.__p.stop = true;
            return w.__p;
        });
        const first = p.frames.findIndex((f) => f.length > 5);
        const rows = p.frames.slice(Math.max(0, first - 3), first + 6);
        console.log(variant, "events", JSON.stringify(p.events), "\n  [t, trigger scale, trigger left, trigger bottom, trigger w, plate opacity, plate left, plate top]\n  " + rows.map((r) => JSON.stringify(r)).join("\n  "));
        await info.attach("dsel", { body: JSON.stringify({ events: p.events, rows }), contentType: "application/json" });
    });
}
