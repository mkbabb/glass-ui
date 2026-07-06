// Binding blur-tracks-scalar frame-series (the designSyncSurface deliverable).
// Opens the drawer, drives the gesture scalar to a series of values, screenshots
// the viewport at each — the sheet rises AND its backdrop blur tracks the scalar
// (rise 0->full over t in [0,0.35], hold, solidify-decay to 0 over [0.85,1]).
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const mode = process.argv[2] || "light";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/backdrop-blur-engage/";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, mode);
await page.goto("http://localhost:5200/containers/drawer", { waitUntil: "load" });
await page.evaluate((m) => { document.documentElement.classList.toggle("dark", m === "dark"); document.documentElement.style.colorScheme = m; }, mode);
await page.waitForTimeout(1000);
await page.getByRole("button", { name: /open drawer/i }).first().click();
await page.waitForTimeout(1300); // settle spring

const series = [
    { t: 0.08, tag: "t008-blur3" },
    { t: 0.25, tag: "t025-blur9" },
    { t: 0.50, tag: "t050-blur13full" },
    { t: 0.95, tag: "t095-solidify4" },
];
for (const { t, tag } of series) {
    const measured = await page.evaluate((tv) => {
        const sheet = document.querySelector('.glass-drawer[data-glass-drawer-snap-points="true"]') || document.querySelector('.glass-drawer');
        sheet.style.setProperty("--glass-drawer-t", String(tv));
        document.documentElement.style.setProperty("--stage-t", String(tv));
        void sheet.offsetWidth;
        const cs = getComputedStyle(sheet);
        return { bf: (cs.backdropFilter || cs.webkitBackdropFilter) };
    }, t);
    await page.waitForTimeout(120);
    const outPath = `${OUT}drawer-blurseries-${tag}-chrome-${mode}.png`;
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(JSON.stringify({ mode, t, tag, backdropFilter: measured.bf }));
}
await page.close();
await browser.close();
