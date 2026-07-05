// BG.W-BLOB-SATELLITE-SHADE — the keyed-body-hue leg (real Chrome + Metal). The default
// capture lands on the "calm" cream preset; this leg drives the live studio to two
// DISTINCTLY-keyed body hues (Excited: warm-red seed oklch(0.62 0.19 25) · Shy: cool-blue
// seed oklch(0.6 0.2 250)) and screenshots the bead, so the satellite-shade derivation is
// read as HUE-FOLLOWING (the satellites take a shade of the keyed body hue, one coherent
// family) rather than a fixed color — the routes-column "satellite-shade over a keyed body
// hue" π. Non-capture interactive route so the preset chips are clickable.
import { chromium } from "playwright";

const BASE = "http://localhost:5200";
const OUT = "docs/tranches/BG/audit/visual/blob-satellite-shade";

const browser = await chromium.connectOverCDP("http://localhost:9477");
const ctx = browser.contexts()[0] ?? (await browser.newContext());

for (const mode of ["light", "dark"]) {
    for (const preset of ["Excited", "Shy"]) {
        const page = await ctx.newPage();
        await page.setViewportSize({ width: 1440, height: 1000 });
        // seed the color scheme before nav
        await page.addInitScript((m) => {
            try { localStorage.setItem("vueuse-color-scheme", m); } catch {}
        }, mode);
        await page.goto(`${BASE}/substrates/blob`, { waitUntil: "networkidle" });
        await page.evaluate((m) => {
            const el = document.documentElement;
            el.classList.toggle("dark", m === "dark");
            el.style.colorScheme = m;
        }, mode);
        await page.waitForTimeout(400);
        // click the preset chip (role=tab in the #presets slot) FIRST
        const clicked = await page.evaluate((label) => {
            const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
            const t = tabs.find((b) => b.textContent && b.textContent.trim().startsWith(label));
            if (t) { t.click(); return true; }
            return false;
        }, preset);
        await page.waitForTimeout(600);
        // THEN scroll the blob canvas into view (the click re-anchors scroll to the
        // top of the configurator, so scroll AFTER selecting the preset)
        await page.evaluate(() => {
            const c = document.querySelector("canvas.goo-blob-canvas"); // the studio hero (idx 1; idx 0 is the page aurora)
            if (c) c.scrollIntoView({ block: "center", behavior: "instant" });
        });
        // let the palette re-derive + the GL bead settle several frames
        await page.waitForTimeout(2200);
        const seed = await page.evaluate(() => {
            const inp = document.querySelector('input[aria-label="Palette seed color"]');
            return inp ? inp.value : "?";
        });
        await page.screenshot({ path: `${OUT}/blob-keyed-${preset.toLowerCase()}-chrome-${mode}.png` });
        console.log(JSON.stringify({ mode, preset, clicked, seed }));
        await page.close();
    }
}
await browser.close();
console.log("DONE");
