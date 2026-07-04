import { chromium } from "playwright";
const browser = await chromium.connectOverCDP("http://localhost:9477");
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });

async function probe(route) {
    const page = await ctx.newPage();
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=light`, { waitUntil: "load" });
    await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 20000 });
    const info = await page.evaluate(() => {
        const out = {};
        // Any element carrying data-motion (present) OR data-* attrs that look motion-related
        const dm = Array.from(document.querySelectorAll("[data-motion]")).map(e => ({ tag: e.tagName.toLowerCase(), cls: e.className?.toString().slice(0,60), motion: e.getAttribute("data-motion") }));
        out.dataMotion = dm;
        // What surfaces are on the page — cards, sliders, tabs, dialog
        out.cards = document.querySelectorAll("[class*='glass-card'], .glass-card, [data-slot='card']").length;
        out.sliders = document.querySelectorAll("[class*='slider'], [role='slider']").length;
        out.tablists = document.querySelectorAll("[role='tablist'], [role='group'][class*='tab']").length;
        out.dialogs = document.querySelectorAll("[role='dialog'], [data-slot*='dialog']").length;
        // sample element data-* attributes to see what the axis emits
        const anyCard = document.querySelector(".glass-card, [class*='glass-card']");
        out.cardAttrs = anyCard ? anyCard.getAttributeNames().filter(n => n.startsWith("data-")) : null;
        // --motion-weight resolved values across a few surfaces
        out.rootWeight = getComputedStyle(document.documentElement).getPropertyValue("--motion-weight").trim();
        const slider = document.querySelector("[role='slider'], [class*='slider']");
        out.sliderWeight = slider ? getComputedStyle(slider).getPropertyValue("--motion-weight").trim() : null;
        return out;
    });
    console.log(route, JSON.stringify(info, null, 1));
    await page.close();
}
await probe("/display/card");
await probe("/forms/slider");
await probe("/navigation/tabs");
await probe("/containers/dialog");
await ctx.close();
await browser.close();
