import { chromium } from "playwright";

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const BASE = "http://localhost:5199";

const routes = [
    ["motion/curve-gallery", "C7-curve-gallery"],
    ["motion/springs", "C7-springs"],
    ["motion/countup", "C7-countup"],
    ["motion/reveal", "C7-reveal"],
    ["motion/underline", "C7-underline"],
    ["foundations/motion", "C7-foundations-motion"],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

for (const [route, name] of routes) {
    await page.goto(`${BASE}/${route}`, { waitUntil: "networkidle" });
    // park any live background loops
    await page.evaluate(() => {
        Object.defineProperty(document, "hidden", { value: true, configurable: true });
        document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });

    // measure the curve-set grid area on curve-gallery
    if (route === "motion/curve-gallery") {
        const m = await page.evaluate(() => {
            const cards = [...document.querySelectorAll(".glass-card")];
            const grid = cards[0]?.parentElement;
            const r = grid?.getBoundingClientRect();
            return {
                cardCount: cards.length,
                gridWidth: r ? Math.round(r.width) : null,
                gridHeight: r ? Math.round(r.height) : null,
                firstCardRect: cards[0] ? (({ width, height }) => ({ width: Math.round(width), height: Math.round(height) }))(cards[0].getBoundingClientRect()) : null,
                viewportW: window.innerWidth,
            };
        });
        console.log("CURVE-GALLERY:", JSON.stringify(m));
    }
}

await browser.close();
console.log("done");
