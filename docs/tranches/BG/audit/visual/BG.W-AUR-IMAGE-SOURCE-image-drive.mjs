// BG.W-AUR-IMAGE-SOURCE — Chrome image-source DRIVE (the photo-dissolve π attempt).
// In-page element.click() bypasses the dock pointer-intercept; then setInputFiles a
// generated colorful PNG; capture two frames to show the dissolve drifts.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-AUR-IMAGE-SOURCE-paint";
const ROUTE = "/substrates/aurora";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const browser = await chromium.connectOverCDP("http://localhost:9466");
const out = [];

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const rec = { mode, steps: [] };
    try {
        await page.goto(
            `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`,
            { waitUntil: "load", timeout: 30000 },
        );
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 25000 },
        );
        await page.waitForTimeout(800);

        // 1) Expand any collapsed Composition configurator-layer, then click the
        //    "Image" source segmented-tab — all in-page (bypasses pointer intercept).
        const flip = await page.evaluate(() => {
            const log = [];
            // expand a collapsed layer whose trigger text mentions Composition
            const triggers = Array.from(
                document.querySelectorAll('[data-slot="configurator-layer-trigger"]'),
            );
            for (const t of triggers) {
                const txt = (t.textContent || "").trim();
                if (/composition/i.test(txt)) {
                    if (t.getAttribute("aria-expanded") === "false") {
                        t.click();
                        log.push("expanded-composition");
                    } else log.push("composition-already-open");
                }
            }
            // find the Source "Image" segmented tab and click it
            const btns = Array.from(document.querySelectorAll("button.segmented-tab, button"));
            const imgBtn = btns.find((b) => (b.textContent || "").trim() === "Image");
            if (!imgBtn) {
                log.push("no-image-btn");
                return { log, ok: false };
            }
            log.push("image-btn-prepress-aria=" + imgBtn.getAttribute("aria-pressed"));
            imgBtn.click();
            log.push("image-btn-clicked");
            return { log, ok: true };
        });
        rec.steps.push({ flip });
        await page.waitForTimeout(500);

        // 2) confirm the file input rendered
        const hasInput = await page.evaluate(() => {
            const el = document.querySelector('input[type=file][accept="image/*"]');
            const imgBtn = Array.from(document.querySelectorAll("button")).find(
                (b) => (b.textContent || "").trim() === "Image",
            );
            return {
                fileInput: !!el,
                imageAria: imgBtn ? imgBtn.getAttribute("aria-pressed") : "n/a",
            };
        });
        rec.steps.push({ hasInput });

        if (!hasInput.fileInput) {
            rec.result = "no-file-input-after-flip";
            out.push(rec);
            await ctx.close();
            console.error(`${mode} DRIVE FAIL no-file-input; flip=${JSON.stringify(flip)} conf=${JSON.stringify(hasInput)}`);
            continue;
        }

        // 3) generate a vivid PNG in-page + upload it
        const imgBytes = await page.evaluate(async () => {
            const w = 480,
                h = 300;
            const cv = document.createElement("canvas");
            cv.width = w;
            cv.height = h;
            const g = cv.getContext("2d");
            const grad = g.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0.0, "#ff2d55");
            grad.addColorStop(0.28, "#ff9500");
            grad.addColorStop(0.52, "#34c759");
            grad.addColorStop(0.76, "#007aff");
            grad.addColorStop(1.0, "#af52de");
            g.fillStyle = grad;
            g.fillRect(0, 0, w, h);
            for (let i = 0; i < 10; i++) {
                g.beginPath();
                g.fillStyle = `hsla(${i * 37},92%,58%,0.5)`;
                g.arc((i * 71) % w, (i * 53) % h, 34 + (i % 3) * 18, 0, Math.PI * 2);
                g.fill();
            }
            const blob = await new Promise((res) => cv.toBlob(res, "image/png"));
            const buf = await blob.arrayBuffer();
            return Array.from(new Uint8Array(buf));
        });
        await page
            .locator('input[type=file][accept="image/*"]')
            .first()
            .setInputFiles({ name: "photo.png", mimeType: "image/png", buffer: Buffer.from(imgBytes) });
        rec.steps.push({ uploaded: true, bytes: imgBytes.length });

        // 4) let the decode+upload+dissolve run; capture two frames ~1.2s apart to
        //    show the blurred photo dissolves into aurora DRIFT (it evolves).
        await page.waitForTimeout(1400);
        const pngA = `${OUT}/chrome-aurora-image-${mode}-a.png`;
        await page.screenshot({ path: pngA, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        await page.waitForTimeout(1300);
        const pngB = `${OUT}/chrome-aurora-image-${mode}-b.png`;
        await page.screenshot({ path: pngB, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        rec.pngA = pngA;
        rec.pngB = pngB;
        rec.result = "captured";
        console.error(`${mode} DRIVE OK -> ${pngA} + ${pngB}`);
    } catch (e) {
        rec.result = "ERR:" + String(e).slice(0, 200);
        console.error(`${mode} DRIVE ERR ${String(e).slice(0, 200)}`);
    }
    out.push(rec);
    await ctx.close();
}

writeFileSync(`${OUT}/chrome-image-drive.json`, JSON.stringify(out, null, 2));
await browser.close();
console.error("DONE image-drive");
