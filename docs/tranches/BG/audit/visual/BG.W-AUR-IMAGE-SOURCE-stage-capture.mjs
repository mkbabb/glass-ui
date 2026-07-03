// BG.W-AUR-IMAGE-SOURCE — targeted STAGE capture (the AuroraStage #stage slot that
// receives the source=image config). Scrolls the stage into view, captures the
// palette baseline, flips source=image + uploads a vivid photo, captures the
// dissolve (2 drifting frames). Chrome, both modes.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-AUR-IMAGE-SOURCE-paint";
const ROUTE = "/substrates/aurora";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

// Find the stage element (the cursor-crosshair rounded-card holding the live Aurora),
// scroll it into view, return its viewport rect.
function stageRectJs() {
    return (() => {
        const stage =
            document.querySelector(".cursor-crosshair.rounded-card") ||
            document.querySelector('[class*="cursor-crosshair"]');
        if (!stage) return null;
        stage.scrollIntoView({ block: "center", behavior: "instant" });
        const r = stage.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    })();
}

const browser = await chromium.connectOverCDP("http://localhost:9466");
const out = [];

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const rec = { mode };
    try {
        await page.goto(
            `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`,
            { waitUntil: "load", timeout: 30000 },
        );
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 25000 },
        );
        await page.waitForTimeout(900);

        let rect = await page.evaluate(stageRectJs);
        rec.stageRect0 = rect;
        await page.waitForTimeout(400);
        rect = await page.evaluate(stageRectJs); // re-measure after scroll settle
        rec.stageRect = rect;
        if (!rect) {
            rec.result = "no-stage";
            out.push(rec);
            await ctx.close();
            console.error(`${mode} NO STAGE`);
            continue;
        }
        const clip = {
            x: Math.max(0, rect.x),
            y: Math.max(0, rect.y),
            width: Math.min(SIZE.w - Math.max(0, rect.x), rect.w),
            height: Math.min(SIZE.h - Math.max(0, rect.y), rect.h),
        };
        // baseline (palette)
        const pBase = `${OUT}/stage-palette-${mode}.png`;
        await page.screenshot({ path: pBase, clip });
        rec.palettePng = pBase;

        // flip source=image
        const flip = await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll("button"));
            const imgBtn = btns.find((b) => (b.textContent || "").trim() === "Image");
            if (!imgBtn) return { ok: false };
            imgBtn.click();
            return { ok: true, aria: imgBtn.getAttribute("aria-pressed") };
        });
        rec.flip = flip;
        await page.waitForTimeout(400);
        // upload vivid photo
        const imgBytes = await page.evaluate(async () => {
            const w = 480, h = 300;
            const cv = document.createElement("canvas");
            cv.width = w; cv.height = h;
            const g = cv.getContext("2d");
            const grad = g.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0.0, "#ff2d55");
            grad.addColorStop(0.28, "#ff9500");
            grad.addColorStop(0.52, "#34c759");
            grad.addColorStop(0.76, "#007aff");
            grad.addColorStop(1.0, "#af52de");
            g.fillStyle = grad; g.fillRect(0, 0, w, h);
            for (let i = 0; i < 10; i++) {
                g.beginPath();
                g.fillStyle = `hsla(${i * 37},92%,58%,0.5)`;
                g.arc((i * 71) % w, (i * 53) % h, 34 + (i % 3) * 18, 0, Math.PI * 2);
                g.fill();
            }
            const blob = await new Promise((res) => cv.toBlob(res, "image/png"));
            return Array.from(new Uint8Array(await blob.arrayBuffer()));
        });
        const fi = page.locator('input[type=file][accept="image/*"]');
        rec.fileInputCount = await fi.count();
        if (rec.fileInputCount > 0) {
            await fi.first().setInputFiles({ name: "photo.png", mimeType: "image/png", buffer: Buffer.from(imgBytes) });
            rec.uploaded = true;
            // re-scroll (layout may shift), then capture 2 drift frames
            await page.waitForTimeout(1300);
            rect = await page.evaluate(stageRectJs);
            const clip2 = {
                x: Math.max(0, rect.x),
                y: Math.max(0, rect.y),
                width: Math.min(SIZE.w - Math.max(0, rect.x), rect.w),
                height: Math.min(SIZE.h - Math.max(0, rect.y), rect.h),
            };
            const pImgA = `${OUT}/stage-image-${mode}-a.png`;
            await page.screenshot({ path: pImgA, clip: clip2 });
            await page.waitForTimeout(1300);
            const pImgB = `${OUT}/stage-image-${mode}-b.png`;
            await page.screenshot({ path: pImgB, clip: clip2 });
            rec.imagePngA = pImgA;
            rec.imagePngB = pImgB;
            rec.result = "captured";
            console.error(`${mode} STAGE OK rect=${JSON.stringify(rec.stageRect)} flip=${JSON.stringify(flip)}`);
        } else {
            rec.result = "no-file-input";
            console.error(`${mode} STAGE no-file-input`);
        }
    } catch (e) {
        rec.result = "ERR:" + String(e).slice(0, 200);
        console.error(`${mode} STAGE ERR ${String(e).slice(0, 200)}`);
    }
    out.push(rec);
    await ctx.close();
}

writeFileSync(`${OUT}/stage-capture.json`, JSON.stringify(out, null, 2));
await browser.close();
console.error("DONE stage-capture");
