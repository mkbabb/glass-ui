// BG.W-FOURIER-BEAUTY FB2 — source catalogue + preset tabs via real playwright pointer interaction.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname + "BG.W-FOURIER-BEAUTY-paint/";
const BASE = "http://localhost:5200";
const ROUTE = "/substrates/fourier-field";

async function ready(page) { const t0 = Date.now(); while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) return; await page.waitForTimeout(120); } }
const rect = (page) => page.evaluate(() => { const r = document.querySelector(".fourier-field-canvas").getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; });

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=dark`, { waitUntil: "load" });
await ready(page);
await page.evaluate(() => document.querySelector(".fourier-field-canvas").scrollIntoView({ block: "center" }));
await page.waitForTimeout(800);

// The source trigger = combobox currently reading "pentafoil".
const FIGS = ["trefoil", "quatrefoil", "hexafoil", "spiro"];
for (const fig of FIGS) {
    try {
        const trigger = page.getByRole("combobox").filter({ hasText: /trefoil|quatrefoil|pentafoil|hexafoil|spiro|elliptic/ }).first();
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click({ timeout: 4000 });
        await page.waitForTimeout(350);
        const opt = page.getByRole("option", { name: new RegExp(`^${fig}$`, "i") }).first();
        await opt.click({ timeout: 4000 });
        await page.waitForTimeout(1400);
        const r = await rect(page);
        await page.screenshot({ path: `${OUT}ff-fig-${fig}-dark.png`, clip: r });
        console.log(JSON.stringify({ fig, ok: true }));
    } catch (e) { console.log(JSON.stringify({ fig, ok: false, err: e.message.split("\n")[0] })); }
}

// Preset tabs (Fourier flower / Ambient ellipse / Dense reconstruction).
for (const preset of ["Fourier flower", "Ambient ellipse", "Dense reconstruc"]) {
    try {
        await page.getByText(preset, { exact: false }).first().click({ timeout: 4000 });
        await page.waitForTimeout(1400);
        const r = await rect(page);
        const tag = preset.split(" ")[0].toLowerCase();
        await page.screenshot({ path: `${OUT}ff-preset-${tag}-dark.png`, clip: r });
        console.log(JSON.stringify({ preset, ok: true }));
    } catch (e) { console.log(JSON.stringify({ preset, ok: false, err: e.message.split("\n")[0] })); }
}
await page.close();
await browser.close();
