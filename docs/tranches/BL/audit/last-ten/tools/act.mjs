// Actions that do not wait for Playwright's actionability checks (those wait for an element
// to stop moving, which would spoil a reversal's timing). Coordinates are read at the moment
// of the action; a touch cell taps (CDP touch in Chromium, page.touchscreen in WebKit).
import { box, touch, sleep } from "./lib.mjs";

export async function act(P, a) {
    const { page } = P;
    if (Array.isArray(a)) {
        for (const x of a) await act(P, x);
        return;
    }
    if (a.wait) return sleep(a.wait);
    if (a.key) return page.keyboard.press(a.key);
    if (a.eval) return page.evaluate(a.eval);
    if (a.focus) return page.evaluate((s) => document.querySelector(s)?.focus(), a.focus);
    if (a.leave) return page.mouse.move(a.leave[0], a.leave[1], { steps: 4 });
    if (a.hover) {
        const b = await box(P, a.hover);
        if (!b) throw new Error("no " + a.hover);
        return page.mouse.move(b.cx, b.cy, { steps: 4 });
    }
    if (a.click || a.tap) {
        const sel = a.click || a.tap;
        const b = await box(P, sel);
        if (!b) throw new Error("no " + sel);
        const x = b.x + b.w * (a.at ? a.at[0] : 0.5),
            y = b.y + b.h * (a.at ? a.at[1] : 0.5);
        if (P.c.touch && !a.mouse) {
            if (P.cdp) {
                await touch(P, "touchStart", x, y);
                await sleep(30);
                await touch(P, "touchEnd", 0, 0);
            } else await page.touchscreen.tap(x, y);
        } else await page.mouse.click(x, y);
        return;
    }
    if (a.at) {
        // click at a viewport point
        if (P.c.touch && P.cdp) {
            await touch(P, "touchStart", a.at[0], a.at[1]);
            await sleep(30);
            await touch(P, "touchEnd", 0, 0);
        } else if (P.c.touch) await page.touchscreen.tap(a.at[0], a.at[1]);
        else await page.mouse.click(a.at[0], a.at[1]);
        return;
    }
    throw new Error("unknown action " + JSON.stringify(a));
}
