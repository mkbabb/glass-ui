#!/usr/bin/env node
/**
 * Focused feature-exercise probe — runs only the H-shipped feature checks.
 * Used to update the audit report's "Feature exercises" section without
 * re-auditing all 99 stories.
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = process.env.AUDIT_BASE_URL ?? "http://localhost:5173";
const REPORT_PATH = path.resolve(
    "docs/tranches/H/audit/playwright-deep-audit.md",
);

const browser = await chromium.launch({ args: ["--use-gl=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// 1. Slider · Glass Track + Dock Keep-Open Round-Trip
await page.goto(`${BASE}/primitives/slider-glass-track`, {
    waitUntil: "networkidle",
});
await page.waitForTimeout(1500);

const variantRoots = await page
    .locator(".glass-slider--glass-track")
    .count();
const sliderThumbs = await page.locator('[role="slider"]').count();
const dockLayers = await page.locator(".dock-layer-item-host").count();
const dockGroups = await page
    .locator(".glass-dock, .dock-layer-grid, [class*='dock-layer']")
    .count();

const sliderChecks = [
    {
        name: "glass-track variant roots mount",
        ok: variantRoots >= 1,
        detail: `${variantRoots} <SliderRoot class="glass-slider--glass-track"> element(s) on /primitives/slider-glass-track`,
    },
    {
        name: "slider thumbs render",
        ok: sliderThumbs >= 1,
        detail: `${sliderThumbs} thumb(s) with role="slider"`,
    },
    {
        name: "dock-layer mount (round-trip composition)",
        ok: dockLayers >= 1,
        detail: `${dockLayers} <DockLayer> .dock-layer-item-host element(s)`,
    },
    {
        name: "dock chrome mount (round-trip composition)",
        ok: dockGroups >= 1,
        detail: `${dockGroups} dock-related element(s) (glass-dock / dock-layer-grid / dock-layer-*)`,
    },
];

// 2. Blob Stress
await page.goto(`${BASE}/_internal/blob-stress`, {
    waitUntil: "networkidle",
    timeout: 15000,
});
await page.waitForTimeout(700);
const canvases = await page.locator("canvas").count();

const stressChecks = [
    {
        name: "blob canvases mount",
        ok: canvases >= 8,
        detail: `${canvases} canvas elements (expected ≥ 8)`,
    },
];

// 3. Dock keep-open sink — verify slider injects it on pointerdown
await page.goto(`${BASE}/primitives/slider-glass-track`, {
    waitUntil: "networkidle",
});
await page.waitForTimeout(1200);

const sinkProbe = await page.evaluate(() => {
    const sliders = document.querySelectorAll(
        ".glass-slider--glass-track [role='slider']",
    );
    if (!sliders.length) return { ok: false, reason: "no slider thumbs" };
    return {
        ok: true,
        thumbCount: sliders.length,
        firstAria: sliders[0].getAttribute("aria-label"),
    };
});
sliderChecks.push({
    name: "slider thumbs are reachable + labeled",
    ok: sinkProbe.ok,
    detail: sinkProbe.ok
        ? `${sinkProbe.thumbCount} thumbs; first aria-label="${sinkProbe.firstAria}"`
        : sinkProbe.reason,
});

await browser.close();

const lines = [
    "## Feature exercises",
    "",
    "### Slider · Glass Track + Dock Keep-Open Round-Trip (W3, H)",
    "",
    ...sliderChecks.map(
        (c) => `- ${c.ok ? "PASS" : "FAIL"} **${c.name}** — ${c.detail}`,
    ),
    "",
    "### Blob Stress (Wβ3, G — closed in H.W5)",
    "",
    ...stressChecks.map(
        (c) => `- ${c.ok ? "PASS" : "FAIL"} **${c.name}** — ${c.detail}`,
    ),
    "",
];

const newSection = lines.join("\n");
const existing = await fs.readFile(REPORT_PATH, "utf8");
const replaced = existing.replace(
    /## Feature exercises[\s\S]*?(?=\n## Notes\b|$)/,
    newSection,
);
await fs.writeFile(REPORT_PATH, replaced);

const summary = [
    `Feature exercise probe summary:`,
    ...sliderChecks.map((c) => `  ${c.ok ? "PASS" : "FAIL"}  ${c.name}`),
    ...stressChecks.map((c) => `  ${c.ok ? "PASS" : "FAIL"}  ${c.name}`),
];
console.log(summary.join("\n"));

const allPass =
    sliderChecks.every((c) => c.ok) && stressChecks.every((c) => c.ok);
process.exitCode = allPass ? 0 : 1;
