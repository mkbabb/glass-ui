// Fix seat 7 probe, readings only: the sheet harness's detented Sheet opened by touch at
// 430 x 932; at open plus each delay, the close button's box and the stack of elements at
// its centre, read in the same task.
import { test } from "@playwright/test";
import { gotoReady } from "../../../../tests-visual/release-11-1-1/film";

const SHEET = '[data-testid="s-content"]';
const CLOSE = `${SHEET} [data-slot="dialog-close"]`;

test("hit · what lies at the close button's centre in the rise", async ({ page }, info) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 430, height: 932 });
    await gotoReady(page, "/tests-visual/release-11-1-1/sheet-harness.html");
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    const trigger = (await page.locator('[data-testid="s-open"]').boundingBox())!;
    const out: unknown[] = [];
    for (const after of [60, 90, 120, 150, 190])
        for (let i = 0; i < 3; i++) {
            await page.evaluate((sheet) => {
                const w = window as unknown as { __openAt: number };
                w.__openAt = 0;
                const watch = new MutationObserver(() => {
                    if (w.__openAt || !document.querySelector(`${sheet}[data-state="open"]`)) return;
                    w.__openAt = performance.now();
                    watch.disconnect();
                });
                watch.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-state"] });
            }, SHEET);
            await page.touchscreen.tap(trigger.x + trigger.width / 2, trigger.y + trigger.height / 2);
            const read = await page.evaluate(
                async ({ close, sheet, after }) => {
                    const w = window as unknown as { __openAt: number };
                    while (!w.__openAt) await new Promise((r) => setTimeout(r, 2));
                    await new Promise((r) => setTimeout(r, Math.max(0, w.__openAt + after - performance.now())));
                    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
                    const btn = document.querySelector(close)!;
                    const b = btn.getBoundingClientRect();
                    const cx = b.left + b.width / 2;
                    const cy = b.top + b.height / 2;
                    const name = (e: Element) =>
                        `${e.tagName.toLowerCase()}${e.getAttribute("data-slot") ? `[${e.getAttribute("data-slot")}]` : ""}${e.getAttribute("data-testid") ? `#${e.getAttribute("data-testid")}` : ""}`;
                    const stack = document.elementsFromPoint(cx, cy).slice(0, 5).map((e) => {
                        const r = e.getBoundingClientRect();
                        const cs = getComputedStyle(e);
                        return `${name(e)} ${Math.round(r.top)}..${Math.round(r.bottom)} pe=${cs.pointerEvents} z=${cs.zIndex}`;
                    });
                    const s = document.querySelector(sheet)!;
                    const sr = s.getBoundingClientRect();
                    const scs = getComputedStyle(s);
                    return {
                        at: Math.round(performance.now() - w.__openAt),
                        btn: [Math.round(b.top), Math.round(b.bottom), Math.round(cx), Math.round(cy)],
                        sheet: [Math.round(sr.top), Math.round(sr.bottom), scs.translate, scs.blockSize, scs.inert ?? "", s.hasAttribute("inert")],
                        stack,
                    };
                },
                { close: CLOSE, sheet: SHEET, after },
            );
            out.push({ after, ...read });
            await page.keyboard.press("Escape");
            await page.waitForFunction((sel) => !document.querySelector(sel), SHEET, { timeout: 3000 });
            await page.waitForTimeout(400);
        }
    await info.attach("hit", { body: JSON.stringify(out), contentType: "application/json" });
});
