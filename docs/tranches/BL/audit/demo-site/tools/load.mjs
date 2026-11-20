// Cold-load canvas timeline (read-only) against https://glass.babb.dev.
// Machine law: run through `~/.claude/guard/guarded` (browser run, never --light).
// Chromium headless shell; `--use-angle=metal --enable-gpu --ignore-gpu-blocklist` is
// the brief's one named exception so the aurora renders on the GPU. One browser per
// run, a fresh context per route (cold HTTP cache), everything closed in `finally`.
// Frames come from CDP Page.startScreencast (every compositor frame) — NEVER
// getContext on the page's canvas (that steals a live context and fakes black).
//
// usage: node load.mjs <scheme dark|light> <out.jsonl> <shotsDir> route [route...]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [scheme, outFile, shotsDir, ...routes] = process.argv.slice(2);
const BASE = "https://glass.babb.dev";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
const out = fs.createWriteStream(outFile, { flags: "a" });
try {
    for (const route of routes) {
        const VH = route === "/substrates/aurora" ? 1600 : 900; // the aurora studio stage sits below a 900px fold
        const ctx = await browser.newContext({ viewport: { width: 1440, height: VH }, colorScheme: scheme, deviceScaleFactor: 1 });
        const row = { route, scheme, vh: VH };
        try {
            await ctx.addInitScript(`try{localStorage.setItem("vueuse-color-scheme",${JSON.stringify(scheme)})}catch{}
              window.__ctxLog=[];(()=>{const o=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...a){const r=o.call(this,t,...a);if(r&&!this.__pc){this.__pc=t;window.__ctxLog.push({t,cls:String(this.className||''),at:performance.now()})}return r}})();`);
            const page = await ctx.newPage();
            const cdp = await ctx.newCDPSession(page);
            const frames = [];
            cdp.on("Page.screencastFrame", async (f) => {
                frames.push({ ts: f.metadata.timestamp, data: f.data });
                cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
            });
            await cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, maxWidth: 720, maxHeight: VH / 2, everyNthFrame: 1 });
            const t0 = Date.now() / 1000;
            await page.goto(BASE + route, { waitUntil: "commit", timeout: 45000 });
            await sleep(3500);
            await cdp.send("Page.stopScreencast");
            row.paint = await page.evaluate(() => {
                const nav = performance.getEntriesByType("navigation")[0];
                const p = Object.fromEntries(performance.getEntriesByType("paint").map((e) => [e.name, Math.round(e.startTime)]));
                return { ...p, dcl: nav && Math.round(nav.domContentLoadedEventEnd), load: nav && Math.round(nav.loadEventEnd), timeOrigin: performance.timeOrigin };
            });
            row.ctx = await page.evaluate(() => window.__ctxLog);
            // the biggest on-screen canvas = the substrate under test
            row.canvas = await page.evaluate(() => {
                const cs = [...document.querySelectorAll("canvas")].map((c) => { const r = c.getBoundingClientRect(); const vis = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)); return { cls: String(c.className || ""), r: [r.left, r.top, r.width, r.height], vis, parent: c.parentElement && c.parentElement.className && String(c.parentElement.className).slice(0, 60) }; }).sort((a, b) => b.vis - a.vis);
                return cs;
            });
            const target = row.canvas[0];
            const tOrigin = row.paint.timeOrigin / 1000;
            if (target && target.vis > 0) {
                // analyse every frame's canvas region in a scratch page (our own canvas)
                const helper = await ctx.newPage();
                const rect = target.r.map((v) => v / 2); // screencast is half-scale (720/1440)
                const stats = await helper.evaluate(async ({ frames, rect }) => {
                    const res = [];
                    const c = new OffscreenCanvas(720, 800); const x = c.getContext("2d", { willReadFrequently: true });
                    const [l, t, w, h] = rect; const x0 = Math.max(0, Math.floor(l)), y0 = Math.max(0, Math.floor(t)), x1 = Math.min(720, Math.ceil(l + w)), y1 = Math.min(800, Math.ceil(t + h));
                    for (const f of frames) {
                        const bin = Uint8Array.from(atob(f.data), (ch) => ch.charCodeAt(0));
                        const bmp = await createImageBitmap(new Blob([bin], { type: "image/jpeg" }));
                        x.drawImage(bmp, 0, 0);
                        const d = x.getImageData(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0)).data;
                        let n = 0, black = 0, sum = 0, chroma = 0;
                        for (let i = 0; i < d.length; i += 16) { const m = Math.max(d[i], d[i + 1], d[i + 2]); n++; sum += (d[i] + d[i + 1] + d[i + 2]) / 3; chroma += m - Math.min(d[i], d[i + 1], d[i + 2]); if (m < 22) black++; }
                        res.push({ ts: f.ts, mean: +(sum / n).toFixed(1), chroma: +(chroma / n).toFixed(1), black: +(black / n).toFixed(3) });
                    }
                    return res;
                }, { frames, rect });
                await helper.close();
                row.timeline = stats.map((s) => ({ ms: Math.round((s.ts - tOrigin) * 1000), mean: s.mean, chroma: s.chroma, black: s.black }));
                // first frame where the canvas region is painted and not black
                const settled = row.timeline.filter((s) => s.ms >= 0);
                const firstAny = settled[0];
                const fin = settled[settled.length - 1] || { mean: 0, chroma: 0 };
                const near = (a, b) => Math.abs(a - b) <= Math.max(3, 0.15 * b);
                // settled = within 15% of the final frame's mean AND chroma, and no later black frame
                const firstOk = settled.find((s, i) => s.black < 0.5 && near(s.mean, fin.mean) && near(s.chroma, fin.chroma) && !settled.slice(i).some((x) => x.black >= 0.6));
                row.final = fin;
                const blackFrames = settled.filter((s) => s.black >= 0.6);
                row.summary = { frames: settled.length, firstFrameMs: firstAny && firstAny.ms, firstNonBlackMs: firstOk ? firstOk.ms : null, blackFrames: blackFrames.length, firstBlackMs: blackFrames[0] ? blackFrames[0].ms : null, lastBlackMs: blackFrames.length ? blackFrames[blackFrames.length - 1].ms : null, blackBeforeOk: firstOk ? blackFrames.filter((b) => b.ms < firstOk.ms).length : blackFrames.length };
                // save the first black frame + the first ok frame as evidence crops (small)
                const save = async (fr, tag) => {
                    if (!fr) return null;
                    const f = frames.find((x) => Math.round((x.ts - tOrigin) * 1000) === fr.ms);
                    if (!f) return null;
                    const p = path.join(shotsDir, `load-${route.replace(/\//g, "_") || "_root"}-${scheme}-${tag}-${fr.ms}ms.jpg`);
                    fs.writeFileSync(p, Buffer.from(f.data, "base64"));
                    return path.basename(p);
                };
                const keep = ["/foundations/intro", "/substrates/aurora"].includes(route);
                const at = (ms) => settled.find((s) => s.ms >= ms);
                row.shots = [await save(blackFrames[blackFrames.length - 1], "black"), await save(firstOk, "settled"), ...(keep ? [await save(at(500), "t500"), await save(at(1000), "t1000"), await save(at(2000), "t2000")] : [])].filter(Boolean);
            }
        } catch (e) {
            row.fail = String(e && e.message || e).slice(0, 300);
        } finally {
            await ctx.close().catch(() => {});
        }
        out.write(JSON.stringify(row) + "\n");
        process.stdout.write(`${route} ${JSON.stringify(row.summary || row.fail)}\n`);
    }
} finally {
    await browser.close().catch(() => {});
    out.end();
}
