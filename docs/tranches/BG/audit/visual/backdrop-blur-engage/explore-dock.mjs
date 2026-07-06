import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const route = process.argv[2];
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200${route}`, { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
    const docks = [...document.querySelectorAll(".glass-dock")].map((d, i) => {
        const cs = getComputedStyle(d);
        const r = d.getBoundingClientRect();
        return {
            i, cls: d.className.slice(0, 90),
            rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
            expandT: cs.getPropertyValue("--dock-expand-t").trim(),
            morphT: cs.getPropertyValue("--dock-morph-t").trim(),
            dataAttrs: [...d.attributes].filter(a => a.name.startsWith("data-")).map(a => `${a.name}=${a.value}`).join(" "),
        };
    });
    const btns = [...document.querySelectorAll("button, [role=button]")]
        .filter(b => { const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0; })
        .slice(0, 40)
        .map(b => ({ txt: (b.textContent || "").trim().slice(0, 24), id: b.id, aria: b.getAttribute("aria-label") || "", cls: b.className.slice(0, 40) }));
    const railChips = [...document.querySelectorAll(".dock-stack, .dock-facet-chip, .dock-hairline-slot, [data-dock-stack]")].map(e => e.className.slice(0, 60));
    return { docks, btnCount: btns.length, btns, railChips };
});
console.log(JSON.stringify(info, null, 2));
await page.close();
await browser.close();
