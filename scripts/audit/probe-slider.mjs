#!/usr/bin/env node
import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--use-gl=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("http://localhost:5173/primitives/slider-glass-track", {
    waitUntil: "networkidle",
});
await page.waitForTimeout(1500);

const html = await page.content();
const hasGlassTrack = html.includes("glass-slider--glass-track");
const sliderCount = await page.locator(".glass-slider").count();
const variantCount = await page.locator(".glass-slider--glass-track").count();
const thumbCount = await page.locator('[role="slider"]').count();
const dockLayerCount = await page.locator(".glass-dock-layer, [data-dock-layer]").count();

const dockClassNames = await page.evaluate(() => {
    const all = document.querySelectorAll("[class*='dock']");
    return [...all].slice(0, 6).map((el) => el.className.toString().slice(0, 80));
});

console.log({
    url: page.url(),
    hasGlassTrack,
    sliderCount,
    variantCount,
    thumbCount,
    dockLayerCount,
    dockClassNames,
});

await browser.close();
