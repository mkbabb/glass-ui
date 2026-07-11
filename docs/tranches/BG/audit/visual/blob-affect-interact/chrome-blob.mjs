// Chrome leg — BG.W-BLOB-AFFECT-INTERACT (/substrates/blob).
// Real on-screen Chrome.app (real Metal GPU) over ?capture=<route>&mode=<mode> via
// playwright connectOverCDP. (1) full-page static capture both modes, AND
// (2) the live-gesture + computed-DOM probes the wave's pointer-truth criteria need:
//   - SDF-outside hit-test resolves the sibling (document.elementFromPoint at a corner)
//   - hover-enter → first-painted-response ≤2 frames (canvas pixel-diff after pointer)
//   - click deform painted-then-settling (pixel-diff series, no jitter)
//   - glContextCount (one GL blob per page budget), main.children, animations
import { chromium } from "playwright";
import { inflateSync } from "node:zlib";

// Compact PNG→RGBA decoder (mirrors the validate-dotflow leaf) + a mean-abs-delta over a
// coarse grid, so a click-DEFORM response magnitude can be compared to ambient orbit drift.
function decodeRGBA(buf) {
    let p = 8, w = 0, h = 0, bd = 0, ct = 0; const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p); const type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; }
        else if (type === "IDAT") idat.push(data); else if (type === "IEND") break; p += 12 + len;
    }
    const ch = ct === 6 ? 4 : ct === 2 ? 3 : 1; if (bd !== 8) throw new Error("bd" + bd);
    const raw = inflateSync(Buffer.concat(idat)); const stride = w * ch; const out = Buffer.alloc(w * h * 4);
    const prev = Buffer.alloc(stride); let ri = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[ri++]; const line = Buffer.alloc(stride);
        for (let x = 0; x < stride; x++) {
            const rb = raw[ri++]; const a = x >= ch ? line[x - ch] : 0; const b = prev[x]; const c = x >= ch ? prev[x - ch] : 0; let v;
            switch (f) { case 0: v = rb; break; case 1: v = rb + a; break; case 2: v = rb + b; break; case 3: v = rb + ((a + b) >> 1); break; case 4: { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; } default: v = rb; }
            line[x] = v & 0xff;
        }
        line.copy(prev);
        for (let x = 0; x < w; x++) { const s = x * ch, d = (y * w + x) * 4; out[d] = line[s]; out[d + 1] = ch >= 3 ? line[s + 1] : line[s]; out[d + 2] = ch >= 3 ? line[s + 2] : line[s]; out[d + 3] = ch === 4 ? line[s + 3] : 255; }
    }
    return { w, h, data: out };
}
function meanAbsDelta(bufA, bufB) {
    const A = decodeRGBA(bufA), B = decodeRGBA(bufB);
    const w = Math.min(A.w, B.w), h = Math.min(A.h, B.h); let sum = 0, n = 0; const step = 5;
    for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
        const dA = (y * A.w + x) * 4, dB = (y * B.w + x) * 4;
        const lA = 0.299 * A.data[dA] + 0.587 * A.data[dA + 1] + 0.114 * A.data[dA + 2];
        const lB = 0.299 * B.data[dB] + 0.587 * B.data[dB + 1] + 0.114 * B.data[dB + 2];
        sum += Math.abs(lA - lB); n++;
    }
    return +(sum / n).toFixed(3);
}

const ROUTE = "/substrates/blob";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;

async function pollReady(page) {
    const t0 = Date.now();
    let ready = false;
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
        );
        if (ready) break;
        await page.waitForTimeout(150);
    }
    return { ready, elapsed: Date.now() - t0 };
}

async function glRenderer(page) {
    return page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return "err:" + e.message; }
    });
}

async function captureStatic(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const { ready, elapsed } = await pollReady(page);
    const gl = await glRenderer(page);
    const outPath = `${OUT}blob-chrome-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(JSON.stringify({ leg: "static", mode, ready, elapsedMs: elapsed, glRenderer: gl, outPath }));
    await page.close();
}

// Live-gesture + computed probes (light mode — the pointer machinery is mode-invariant JS/DOM).
async function probe(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    // NOT ?capture= — we want the LIVE running loop (capture mode de-promotes entrance CA; the
    // render loop still runs, but drive the real page to exercise the gesture handlers).
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await pollReady(page);

    // Computed DOM facts.
    const dom = await page.evaluate(() => {
        const canvases = Array.from(document.querySelectorAll("canvas"));
        let glContextCount = 0;
        for (const c of canvases) {
            // Was a webgl/webgl2/webgpu context taken? Probe by re-asking (returns the SAME
            // context if one exists; a fresh 2d/none returns null for gl). Heuristic: count
            // canvases that expose a gl context handle.
            try {
                const gl2 = c.getContext("webgl2");
                if (gl2) glContextCount++;
            } catch { /* context-type conflict = already a gl ctx of some kind */ glContextCount++; }
        }
        const wrapper = document.querySelector(".goo-blob-wrapper");
        const hit = document.querySelector(".goo-blob-hit");
        const wrapCS = wrapper ? getComputedStyle(wrapper) : null;
        const hitCS = hit ? getComputedStyle(hit) : null;
        const main = document.querySelector("main");
        return {
            canvasCount: canvases.length,
            glContextCount,
            wrapperPointerEvents: wrapCS ? wrapCS.pointerEvents : "NO-WRAPPER",
            hitPointerEvents: hitCS ? hitCS.pointerEvents : "NO-HIT",
            hitClipPath: hitCS ? hitCS.clipPath : "NO-HIT",
            mainChildren: main ? main.children.length : -1,
            hasGooBlobCanvas: !!document.querySelector(".goo-blob-canvas"),
            docAnimations: (document.getAnimations ? document.getAnimations().length : -1),
        };
    });

    // Scroll the hero wrapper into view (it is the LEAD section but can sit below the
    // fold in the ?capture= full page), then read a FRESH viewport-relative rect.
    await page.evaluate(() => {
        const wrap = document.querySelector(".goo-blob-wrapper");
        if (wrap) wrap.scrollIntoView({ block: "center", inline: "center" });
    });
    await page.waitForTimeout(300);
    const rect = await page.evaluate(() => {
        const wrap = document.querySelector(".goo-blob-wrapper");
        if (!wrap) return null;
        const r = wrap.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2 };
    });

    // --- SDF-outside hit-test: elementFromPoint at the wrapper's top-left CORNER (outside the
    //     inscribed circle) must NOT be the .goo-blob-hit (it must fall through). And at the
    //     CENTER it MUST be the hit layer. ---
    let hitTestResult = null;
    if (rect) {
        hitTestResult = await page.evaluate(({ x, y, w, h, cx, cy }) => {
            // corner point ~6% in from the true corner (well outside the inscribed circle r=50%)
            const cornerX = x + w * 0.07, cornerY = y + h * 0.07;
            const elCorner = document.elementFromPoint(cornerX, cornerY);
            const elCenter = document.elementFromPoint(cx, cy);
            const cls = (el) => el ? (el.className && el.className.baseVal !== undefined ? el.className.baseVal : (el.className || el.tagName)) : "null";
            return {
                cornerEl: cls(elCorner),
                cornerIsHit: !!(elCorner && elCorner.classList && elCorner.classList.contains("goo-blob-hit")),
                cornerIsWrapper: !!(elCorner && elCorner.classList && elCorner.classList.contains("goo-blob-wrapper")),
                centerEl: cls(elCenter),
                centerIsHit: !!(elCenter && elCenter.classList && elCenter.classList.contains("goo-blob-hit")),
            };
        }, rect);
    }

    // --- Live-gesture pixel-response: capture the canvas region, move the pointer to the
    //     blob center, then re-capture after ~2 frames (≈33ms) and after settle (≈400ms).
    //     A non-trivial pixel delta proves the hover engaged a painted response. ---
    let gesture = null;
    if (rect) {
        // Clamp the clip to the viewport so the element-region screenshot never spills out.
        const vw = 1440, vh = 900;
        const cx0 = Math.max(0, Math.min(vw - 1, rect.x));
        const cy0 = Math.max(0, Math.min(vh - 1, rect.y));
        const cw = Math.max(1, Math.min(vw - cx0, rect.w));
        const ch = Math.max(1, Math.min(vh - cy0, rect.h));
        const clip = { x: cx0, y: cy0, width: cw, height: ch };
        const shot = async () => page.screenshot({ clip });
        // Pointer parked far away — measure AMBIENT orbit drift over the same ~33ms window
        // (two baselines) so the gesture response can be judged ABOVE ambient, not confounded.
        await page.mouse.move(4, 4);
        await page.waitForTimeout(200);
        const amb0 = await shot();
        await page.waitForTimeout(33);
        const amb1 = await shot();
        await page.waitForTimeout(33);
        const amb2 = await shot();
        const ambientDrift33ms = meanAbsDelta(amb0, amb1);
        const ambientDrift66ms = meanAbsDelta(amb0, amb2);
        // Hover-enter at center; first-painted-response within ~2 frames (33ms).
        const preHover = await shot();
        await page.mouse.move(rect.cx, rect.cy);
        await page.waitForTimeout(33);
        const hov2f = await shot();
        const hoverResponse2f = meanAbsDelta(preHover, hov2f);
        await page.waitForTimeout(450);
        const hovSettle = await shot();
        // Click deform: pointer already at center; fire a click and read the deform 2 frames in,
        // then a settle frame. A jitter-free settle = the post-deform delta decays (settle drift
        // returns toward ambient, not a sustained oscillation).
        const preClick = await shot();
        await page.mouse.down(); await page.mouse.up();
        await page.waitForTimeout(33);
        const click2f = await shot();
        const clickResponse2f = meanAbsDelta(preClick, click2f);
        await page.waitForTimeout(120);
        const clickMid = await shot();
        await page.waitForTimeout(500);
        const clickSettle = await shot();
        const clickMidDrift = meanAbsDelta(clickMid, clickSettle);
        gesture = {
            clip,
            ambientDrift33ms, ambientDrift66ms,
            hoverResponse2f,
            hoverResponseVsAmbientRatio: +(hoverResponse2f / Math.max(0.01, ambientDrift33ms)).toFixed(2),
            clickResponse2f,
            clickResponseVsAmbientRatio: +(clickResponse2f / Math.max(0.01, ambientDrift33ms)).toFixed(2),
            hoverSettleDeltaFromBase: meanAbsDelta(amb0, hovSettle),
            clickMidToSettleDrift: clickMidDrift,
        };
    }

    console.log(JSON.stringify({ leg: "probe", mode, dom, rect, hitTestResult, gesture }, null, 2));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await captureStatic(ctx, "light");
await captureStatic(ctx, "dark");
await probe(ctx, "light");
await browser.close();
