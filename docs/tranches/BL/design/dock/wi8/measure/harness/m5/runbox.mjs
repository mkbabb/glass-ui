// runbox.mjs <port> <engine>: the outlet dock's run box (scroll, client, flags) at each step of p3-overlay-esc.
import { chromium, webkit } from "playwright";
const [port, eng] = process.argv.slice(2);
const B = eng === "webkit" ? webkit : chromium;
const browser = await B.launch({ headless: true, ...(eng === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-outlet`);
    await page.waitForSelector("[data-testid=w-outlet]");
    await page.waitForTimeout(600);
    const read = (tag) => page.evaluate((tag) => {
        const d = document.querySelector("[data-testid=w-outlet]");
        const run = d.querySelector(".dock-run.is-active") || d.querySelector(".dock-run");
        const cs = getComputedStyle(run);
        return `${tag}: dock ${d.className.replace("glass-dock ", "")} fits=${d.hasAttribute("data-run-fits")} whole=${run.hasAttribute("data-run-whole")} run w=${run.getBoundingClientRect().width} client=${run.clientWidth} scrollW=${run.scrollWidth} sl=${run.scrollLeft} width=${cs.width} maxw=${cs.maxInlineSize} ml=${cs.marginLeft} mr=${cs.marginRight} layers=${d.querySelector(".dock-layers").getBoundingClientRect().width} pad=${cs.paddingLeft}/${cs.paddingRight} gap=${cs.columnGap} kids=${[...run.children].map((c) => `${c.tagName}${c.offsetParent ? "" : "(nobox)"}:${c.offsetLeft}+${c.offsetWidth}`).join(",")} active=${document.activeElement?.className?.slice?.(0, 40)}`;
    }, tag);
    console.log(await read("rest"));
    await page.hover("[data-testid=w-outlet] .dock-layer--summary");
    await page.waitForTimeout(1200);
    console.log(await read("open"));
    await page.click("[data-testid=w-outlet-options]");
    await page.waitForTimeout(800);
    console.log(await read("popover"));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    console.log(await read("esc1"));
    await ctx.close();
} finally {
    await browser.close();
}
