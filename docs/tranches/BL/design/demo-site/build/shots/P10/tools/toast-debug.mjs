// When do raised toasts leave? Logs every 100 ms the toasts in the DOM with their state,
// and every animationend, after raising one toast per stage button. One browser, one
// context, closed in finally.
import { chromium } from "playwright";
const BASE = process.argv[2];
const W = Number(process.argv[3] ?? 1440);
const H = Number(process.argv[4] ?? 900);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: "dark" });
    try {
        const p = await ctx.newPage();
        await p.goto(BASE + "/feedback/toast", { waitUntil: "load" });
        await p.waitForSelector("[data-story-stage] button");
        await sleep(1500);
        await p.evaluate(() => {
            window.__log = [];
            const t0 = performance.now();
            const snap = () => [...document.querySelectorAll("[data-slot=toast]")]
                .map((e) => (e.getAttribute("data-state") ?? "?") + ":" + e.getAttribute("data-tone")).join(",");
            setInterval(() => window.__log.push([Math.round(performance.now() - t0), snap()]), 100);
            document.addEventListener("animationend", (e) => window.__log.push([Math.round(performance.now() - t0), "end " + e.animationName]), true);
            document.addEventListener("click", () => window.__log.push([Math.round(performance.now() - t0), "click"]), true);
        });
        const btns = await p.$$("[data-story-stage] button");
        for (const b of btns) {
            const t = Date.now();
            await b.click();
            console.log("click took", Date.now() - t, "ms");
            await sleep(250);
        }
        await sleep(7000);
        const log = await p.evaluate(() => window.__log);
        let prev = "";
        for (const [t, s] of log) {
            if (s !== prev) console.log(t, s);
            prev = s;
        }
    } finally {
        await ctx.close();
    }
} finally {
    await browser.close();
}
