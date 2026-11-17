import { chromium } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
    for (const cell of ["d1440", "d1440b"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
        try {
            const page = await ctx.newPage();
            await page.goto("http://127.0.0.1:5471/motion/" + (cell === "d1440" ? "springs" : "deck"), { waitUntil: "load" });
            await sleep(2500);
            if (cell === "d1440") {
                const sl = page.locator("[data-story-stage] [role=slider]");
                console.log("sliders", await sl.count(), await sl.evaluateAll((e) => e.map((x) => [x.getAttribute("aria-valuenow"), x.checkVisibility()])));
                const t = page.locator("[data-story-stage] [role=slider]:visible").first();
                await t.focus();
                const before = await page.evaluate(() => document.querySelector(".springs-disc").getBoundingClientRect().x);
                for (let k = 0; k < 10; k++) await page.keyboard.press("ArrowLeft");
                const xs = [];
                for (let k = 0; k < 14; k++) { await sleep(100); xs.push(Math.round(await page.evaluate(() => document.querySelector(".springs-disc").getBoundingClientRect().x))); }
                console.log("now", await t.getAttribute("aria-valuenow"), before, xs.join(" "));
            } else {
                // deck: first turn sampled 3 times
                for (let n = 0; n < 3; n++) {
                    await page.evaluate(() => { window.s = []; const t0 = performance.now(); const f = () => { const e = document.querySelectorAll(".deck-strip > *")[1]; window.s.push(+getComputedStyle(e).opacity); if (performance.now() - t0 < 1200) requestAnimationFrame(f); }; requestAnimationFrame(f); });
                    await page.locator("button[aria-label='Next slide']").click();
                    await sleep(1300);
                    const s = await page.evaluate(() => window.s);
                    let m = 0; for (let i = 1; i < s.length; i++) m = Math.max(m, Math.abs(s[i] - s[i - 1]));
                    console.log("turn", n, s.length, m.toFixed(2), s.slice(0, 8).map((v) => v.toFixed(2)).join(" "));
                    await page.locator("button[aria-label='Previous slide']").click();
                    await sleep(1300);
                }
            }
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
