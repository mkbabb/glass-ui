// Console + timing probe: does the observer error, and does the witness eventually stamp?
import { chromium } from "playwright";
const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";
const ROUTE = process.argv[2] || "/dock/overview";
const MODE = process.argv[3] || "light";

const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: MODE });
const page = await ctx.newPage();
const msgs = [];
page.on("console", m => msgs.push(`[${m.type()}] ${m.text().slice(0,200)}`));
page.on("pageerror", e => msgs.push(`[pageerror] ${e.message.slice(0,200)}`));
await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${MODE}`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 30000 });

// Poll the witness count over 4s
const timeline = [];
for (let i = 0; i < 8; i++) {
    const n = await page.evaluate(() => ({
        sampled: document.querySelectorAll("[data-backdrop-sampled]").length,
        docks: document.querySelectorAll(".glass-dock").length,
        reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        // check whether ANY dock resolves a non-zero luma or non-transparent hue
        anyLuma: Array.from(document.querySelectorAll(".glass-dock")).some(d => {
            const v = getComputedStyle(d).getPropertyValue("--glass-backdrop-luma").trim();
            return v && v !== "0" && v !== "0.000";
        }),
    }));
    timeline.push({ t: i * 500, ...n });
    await page.waitForTimeout(500);
}

console.log(JSON.stringify({ route: ROUTE, mode: MODE, timeline, consoleTail: msgs.slice(-15) }, null, 2));
await ctx.close();
await browser.close();
