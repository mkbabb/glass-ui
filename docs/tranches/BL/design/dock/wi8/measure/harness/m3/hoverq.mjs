// hoverq.mjs: what (hover: none) and (pointer: coarse) report in each engine's touch context.
import { chromium, webkit } from "playwright";
for (const [name, eng] of [["chromium", chromium], ["webkit", webkit]]) {
    for (const isMobile of [false, true]) {
        const b = await eng.launch();
        try {
            const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile });
            const p = await ctx.newPage();
            await p.setContent("<p>x</p>");
            const r = await p.evaluate(() => ({ hoverNone: matchMedia("(hover: none)").matches, coarse: matchMedia("(pointer: coarse)").matches, anyHoverNone: matchMedia("(any-hover: none)").matches, touch: "ontouchstart" in window }));
            console.log(name, "isMobile", isMobile, JSON.stringify(r), b.version());
            await ctx.close();
        } catch (e) { console.log(name, "isMobile", isMobile, "ERR", String(e).slice(0, 200)); }
        finally { await b.close(); }
    }
}
