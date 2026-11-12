// Shared by the AB probes: one browser per run, a new context per cell, both closed in `finally`.
import { chromium, webkit } from "playwright";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
export const { PNG, jpegjs } = require(join(dirname(require.resolve("playwright-core")), "lib/utilsBundle.js"));

const WEBKIT_2287 = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
export const launch = (engine) =>
    engine === "webkit" ? webkit.launch(existsSync(WEBKIT_2287) ? { executablePath: WEBKIT_2287 } : {}) : chromium.launch();

export async function open(browser, url, o = {}) {
    const { width = 1440, height = 1700, theme = "light", reducedMotion = "no-preference", media = "screen", forcedColors = "none", dpr = 2, js = true, ready = true } = o;
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dpr, colorScheme: theme, reducedMotion, forcedColors, javaScriptEnabled: js });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.emulateMedia({ media, reducedMotion, colorScheme: theme, forcedColors });
    await page.goto(url, { waitUntil: "load" });
    if (js && ready) await page.waitForFunction(() => window.__ready === true, null, { timeout: 120_000 });
    return { context, page, errors };
}

/** sRGB 0-255 → OKLCH {L, C, h}. */
export function oklch([r, g, b]) {
    const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const [R, G, B] = [lin(r), lin(g), lin(b)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return { L: +L.toFixed(3), C: +Math.hypot(a, bb).toFixed(3), h: +(((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360).toFixed(1) };
}

export const decodePng = (buf) => PNG.sync.read(buf);
