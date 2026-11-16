// Critic 1: drives shadow.html in headless Chromium. One browser, closed in finally.
//   node shadow.mjs <base url>
import { chromium, webkit } from "@playwright/test";
const base = process.argv[2];
const engine = process.argv[3] ?? "chromium";
const browser =
    engine === "webkit"
        ? await webkit.launch({ executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${base}/docs/release-11.1.1/critic-1/probe/shadow.html`);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
    const read = () => page.evaluate(() => JSON.parse(JSON.stringify(window.__probe)));
    const out = { engine, version: browser.version() };
    // A ContextMenu: opened by a right click, closed by Escape, by a pick, and reversed.
    const film = (sel) =>
        page.evaluate((sel) => {
            const w = window;
            w.__last = 0;
            const tick = () => {
                const el = document.querySelector(sel);
                if (el && parseFloat(getComputedStyle(el).opacity) > 0.001) w.__last = performance.now();
                if (!w.__stop) requestAnimationFrame(tick);
            };
            w.__stop = false;
            requestAnimationFrame(tick);
            if (!w.__stamps) {
                w.__stamps = [];
                window.addEventListener("leave-finished", (e) => w.__stamps.push({ at: performance.now(), kind: e.detail?.kind, bubbles: e.bubbles, composed: e.composed }));
            }
        }, sel);
    const stamps = () => page.evaluate(() => ({ lastSeen: Math.round(window.__last), events: window.__stamps.map((s) => ({ ...s, at: Math.round(s.at) })), stop: (window.__stop = true) }));
    for (const route of ["escape", "pick"]) {
        await page.locator('[data-testid="ctx-trigger"]').click({ button: "right" });
        await page.locator('[data-testid="ctx-content"][data-state="open"]').waitFor();
        await page.waitForTimeout(800);
        await film('[data-testid="ctx-content"]');
        if (route === "escape") await page.keyboard.press("Escape");
        else await page.locator('[data-testid="ctx-item-Share"]').click();
        await page.waitForTimeout(900);
        out[`context-${route}`] = { ...(await stamps()), emits: (await read()).emits.ctx ?? 0 };
    }
    await page.mouse.move(700, 700);
    await page.locator('[data-testid="hover-trigger"]').hover();
    await page.locator('[data-testid="hover-content"][data-state="open"]').waitFor({ timeout: 4000 });
    await page.waitForTimeout(800);
    await film('[data-testid="hover-content"]');
    await page.mouse.move(700, 700, { steps: 6 });
    await page.waitForTimeout(1200);
    out["hover-card-away"] = { ...(await stamps()), emits: (await read()).emits.hover ?? 0, mounted: await page.locator('[data-testid="hover-content"]').count() };
    for (const id of ["light", "shadow"]) {
        await page.locator(`[data-testid="${id}-trigger"]`).click();
        await page.locator(`[data-testid="${id}-content"][data-state="open"]`).waitFor();
        await page.waitForTimeout(900);
        const anim = await page.locator(`[data-testid="${id}-content"]`).evaluate((el) => {
            const cs = getComputedStyle(el);
            return { transition: cs.transitionDuration, backdrop: cs.backdropFilter, inShadow: el.getRootNode() !== document };
        });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(1200);
        out[id] = { content: anim, mounted: await page.locator(`[data-testid="${id}-content"]`).count(), ...(await read()) };
    }
    // A dialog closed, then unmounted 40 ms into its exit.
    await page.evaluate(() => (window.__dlg.open.value = true));
    await page.locator('[data-testid="dlg-content"][data-state="open"]').waitFor();
    await page.waitForTimeout(900);
    const before = await read();
    await page.evaluate(
        () =>
            new Promise((done) => {
                window.__dlg.open.value = false;
                setTimeout(() => {
                    window.__dlg.mounted.value = false;
                    done();
                }, 40);
            }),
    );
    await page.waitForTimeout(800);
    out.unmountMidExit = { before, after: await read() };
    console.log(JSON.stringify(out, null, 1));
    await ctx.close();
} finally {
    await browser.close();
}
