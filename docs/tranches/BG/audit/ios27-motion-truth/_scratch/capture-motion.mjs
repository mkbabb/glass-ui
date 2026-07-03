// ios27-motion-truth — LIVE frame-series captor (BG audit scratch; READ-ONLY on the repo).
// Connects to a REAL on-screen Chrome.app via CDP (:9345), drives gestures
// deterministically, and records CDP Page.startScreencast frame bursts per facility
// into docs/tranches/BG/audit/ios27-motion-truth/live/<facility>/.
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const BASE = "http://localhost:5200";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/ios27-motion-truth/live";
const CDP = "http://127.0.0.1:9345";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function settle(page, ms = 1800) {
    await page.waitForSelector("main", { timeout: 20000 }).catch(() => {});
    await sleep(ms);
}

/** Run `gesture(mark)` inside a screencast burst; write frames + frames.json. */
async function burst(page, facility, gesture) {
    const dir = path.join(OUT, facility);
    fs.mkdirSync(dir, { recursive: true });
    const client = await page.context().newCDPSession(page);
    const frames = [];
    const markers = [];
    const onFrame = (ev) => {
        frames.push({ data: ev.data, ts: ev.metadata.timestamp });
        client.send("Page.screencastFrameAck", { sessionId: ev.sessionId }).catch(() => {});
    };
    client.on("Page.screencastFrame", onFrame);
    await client.send("Page.startScreencast", {
        format: "jpeg",
        quality: 85,
        maxWidth: 1480,
        maxHeight: 1000,
        everyNthFrame: 1,
    });
    const mark = (name) => markers.push({ name, ts: Date.now() / 1000 });
    await sleep(150); // prime the stream
    await gesture(mark);
    await client.send("Page.stopScreencast").catch(() => {});
    client.off("Page.screencastFrame", onFrame);
    await client.detach().catch(() => {});

    const t0 = frames.length ? frames[0].ts : 0;
    const meta = [];
    frames.forEach((f, i) => {
        const ms = Math.round((f.ts - t0) * 1000);
        const name = `frame-${String(i).padStart(3, "0")}-t${String(ms).padStart(5, "0")}ms.jpg`;
        fs.writeFileSync(path.join(dir, name), Buffer.from(f.data, "base64"));
        meta.push({ i, ms, name });
    });
    const deltas = meta.slice(1).map((m, i) => m.ms - meta[i].ms);
    const sorted = [...deltas].sort((a, b) => a - b);
    const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
    const jank = meta
        .slice(1)
        .map((m, i) => ({ afterFrame: meta[i].name, gapMs: deltas[i] }))
        .filter((g) => g.gapMs > Math.max(50, median * 2.5));
    const summary = {
        facility,
        frameCount: frames.length,
        durationMs: meta.length ? meta[meta.length - 1].ms : 0,
        medianGapMs: median,
        approxFps: median > 0 ? Math.round(1000 / median) : 0,
        jankGaps: jank,
        markers: markers.map((m) => ({ name: m.name, ms: Math.round((m.ts - t0) * 1000) })),
    };
    fs.writeFileSync(path.join(dir, "frames.json"), JSON.stringify(summary, null, 2));
    console.log(
        `[${facility}] frames=${summary.frameCount} dur=${summary.durationMs}ms median=${median}ms (~${summary.approxFps}fps) jank=${jank.length}`,
    );
    return summary;
}

async function main() {
    const browser = await chromium.connectOverCDP(CDP);
    const ctx = browser.contexts()[0];
    const page = ctx.pages()[0] ?? (await ctx.newPage());
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "no-preference" });

    // Force light mode before the app boots.
    await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => localStorage.setItem("vueuse-color-scheme", "light"));
    await page.reload({ waitUntil: "networkidle" });
    await settle(page, 1500);

    // ── 1 · dock collapse + expand (/dock/overview, hover-expand / leave-collapse)
    await page.goto(BASE + "/dock/overview", { waitUntil: "networkidle" });
    await settle(page);
    {
        // The first story dock is the collapsible one (rests EXPANDED; auto-collapses
        // ~3600ms after hover-out — probed live). Pre-stage the hover+leave OUTSIDE
        // the burst so the burst captures collapse morph then hover-expand morph.
        const dock = page.locator(".glass-dock.relative.z-10").first();
        await dock.scrollIntoViewIfNeeded();
        await sleep(800);
        const box = await dock.boundingBox();
        if (!box) throw new Error("no collapsible dock found on /dock/overview");
        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;
        // Pre-stage: hover, then leave; the 3600ms idle-collapse timer starts.
        await page.mouse.move(cx, cy, { steps: 6 });
        await sleep(400);
        await page.mouse.move(cx, cy - 280, { steps: 8 });
        await sleep(2600); // collapse fires at ~3600ms — burst starts ~800ms before
        await burst(page, "dock-collapse-expand", async (mark) => {
            mark("collapse-pending");
            await sleep(1900); // capture the leave-collapse morph
            mark("hover-enter");
            const pill = await dock.boundingBox(); // collapsed pill geometry
            const px = pill.x + pill.width / 2;
            const py = pill.y + pill.height / 2;
            await page.mouse.move(px, py - 200, { steps: 3 });
            await page.mouse.move(px, py, { steps: 6 });
            await sleep(1700); // intent dwell + expand morph + settle
        });
        // Leave the dock so later facilities start clean.
        await page.mouse.move(cx, cy - 300, { steps: 4 });
    }

    // ── 8 · dock hover-lift + press on a dock control (always-expanded media dock)
    {
        const btn = page.locator('.glass-dock button[aria-label="Next"]').first();
        await btn.scrollIntoViewIfNeeded();
        await sleep(600);
        const box = await btn.boundingBox();
        if (!box) throw new Error("no Next dock control");
        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;
        await burst(page, "dock-hover-press", async (mark) => {
            mark("hover");
            await page.mouse.move(cx - 150, cy + 60, { steps: 3 });
            await page.mouse.move(cx, cy, { steps: 8 });
            await sleep(700);
            mark("press");
            await page.mouse.down();
            await sleep(400);
            mark("release");
            await page.mouse.up();
            await sleep(800);
            await page.mouse.move(cx, cy + 200, { steps: 4 });
            await sleep(400);
        });
    }

    // ── 2 · dock layer switch (/dock/layers — DockLayerGroup crossfade + FLIP)
    await page.goto(BASE + "/dock/layers", { waitUntil: "networkidle" });
    await settle(page);
    {
        const tabs = page.locator(".dock-layer-tab");
        const n = await tabs.count();
        console.log(`dock-layer tabs found: ${n}`);
        if (n < 2) throw new Error("no dock layer rail tabs");
        await tabs.first().scrollIntoViewIfNeeded();
        await sleep(800);
        await burst(page, "dock-layer-switch", async (mark) => {
            mark("switch-1");
            await tabs.nth(1).click();
            await sleep(1200);
            mark("switch-2");
            await tabs.nth(n >= 3 ? 2 : 0).click();
            await sleep(1200);
            mark("switch-back");
            await tabs.nth(0).click();
            await sleep(1200);
        });
    }

    // ── 3 · shell V↔H in-place morph (window.__shellDockMorph.toggle())
    await page.goto(BASE + "/foundations/colors", { waitUntil: "networkidle" });
    await settle(page);
    {
        const has = await page.evaluate(() => !!window.__shellDockMorph);
        if (!has) throw new Error("no __shellDockMorph hook");
        await burst(page, "shell-vh-morph", async (mark) => {
            mark("toggle-1");
            await page.evaluate(() => window.__shellDockMorph.toggle());
            await sleep(1900);
            mark("toggle-2");
            await page.evaluate(() => window.__shellDockMorph.toggle());
            await sleep(1900);
        });
    }

    // ── 4 · SegmentedTabs indicator glide (/navigation/tabs)
    await page.goto(BASE + "/navigation/tabs", { waitUntil: "networkidle" });
    await settle(page);
    {
        const tabs = page.locator(".segmented-tab");
        const n = await tabs.count();
        console.log(`segmented tabs found: ${n}`);
        await tabs.first().scrollIntoViewIfNeeded();
        await sleep(800);
        await burst(page, "tabs-indicator-glide", async (mark) => {
            mark("click-2");
            await tabs.nth(2).click();
            await sleep(900);
            mark("click-0");
            await tabs.nth(0).click();
            await sleep(900);
            mark("click-1");
            await tabs.nth(1).click();
            await sleep(900);
        });
    }

    // ── 5 · Dialog open (.glass-reveal bloom) + Escape exit
    await page.goto(BASE + "/containers/dialog", { waitUntil: "networkidle" });
    await settle(page);
    {
        const btn = page.getByRole("button", { name: "Open glass dialog" }).first();
        await btn.scrollIntoViewIfNeeded();
        await sleep(800);
        await burst(page, "dialog-glass-reveal", async (mark) => {
            mark("open");
            await btn.click();
            await sleep(1300);
            mark("escape");
            await page.keyboard.press("Escape");
            await sleep(1100);
        });
    }

    // ── 6 · route page-build entrance (router push between two core pages)
    await page.goto(BASE + "/foundations/colors", { waitUntil: "networkidle" });
    await settle(page);
    {
        await burst(page, "route-page-build", async (mark) => {
            mark("navigate");
            await page.evaluate(() => {
                const app = document.querySelector("#app").__vue_app__;
                app.config.globalProperties.$router.push("/display/typography");
            });
            await sleep(2800);
        });
    }

    // ── 7 · Drawer snap drag (/compositions/drawer-live-behind)
    await page.goto(BASE + "/compositions/drawer-live-behind", { waitUntil: "networkidle" });
    await settle(page);
    {
        const half = page.locator("#detent-half");
        await half.scrollIntoViewIfNeeded();
        await sleep(800);
        await burst(page, "drawer-snap-drag", async (mark) => {
            mark("open-half");
            await half.click();
            await sleep(1500);
            const grip = page.locator("[data-glass-drawer-handle]").first();
            const gb = await grip.boundingBox();
            if (!gb) throw new Error("no drawer grip");
            const gx = gb.x + gb.width / 2;
            const gy = gb.y + gb.height / 2;
            mark("drag-up");
            await page.mouse.move(gx, gy, { steps: 4 });
            await page.mouse.down();
            for (let i = 1; i <= 10; i++) {
                await page.mouse.move(gx, gy - i * 28);
                await sleep(16);
            }
            await page.mouse.up(); // fling → snap to full
            await sleep(1500);
            mark("drag-down");
            const gb2 = await grip.boundingBox();
            const gx2 = gb2 ? gb2.x + gb2.width / 2 : gx;
            const gy2 = gb2 ? gb2.y + gb2.height / 2 : gy - 280;
            await page.mouse.move(gx2, gy2, { steps: 4 });
            await page.mouse.down();
            for (let i = 1; i <= 12; i++) {
                await page.mouse.move(gx2, gy2 + i * 45);
                await sleep(16);
            }
            await page.mouse.up(); // fast fling down → snap toward peek
            await sleep(1600);
        });
    }

    await browser.close();
    console.log("DONE");
}

main().catch((e) => {
    console.error("CAPTURE FAILED:", e);
    process.exit(1);
});
