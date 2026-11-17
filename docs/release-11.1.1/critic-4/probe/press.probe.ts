// Critic 4 probe, readings only (no cell fails on what it reads).
//
//   colour  under reduced motion, a held press on a Button, a dock icon seat and a dock
//           tab seat: the control's crop at rest and held, its mean colour and the share
//           of pixels that changed, and the computed fill, filter and press variable.
//   row     under reduced motion, a held press on a menu row of the dock DropdownMenu:
//           the computed scale on every frame of the hold.
import { test, type Page } from "@playwright/test";
import { PNG } from "pngjs";
import { gotoReady, isPhone } from "../../../../tests-visual/release-11-1-1/film";

const EXITS = "/tests-visual/release-11-1-1/exits-harness.html";
const REDUCE = "/tests-visual/release-11-1-1/reduce-harness.html";

async function ready(page: Page, url: string): Promise<void> {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoReady(page, url);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
}

function stats(buf: Buffer) {
    const png = PNG.sync.read(buf);
    let r = 0, g = 0, b = 0;
    const n = png.width * png.height;
    for (let i = 0; i < png.data.length; i += 4) { r += png.data[i]; g += png.data[i + 1]; b += png.data[i + 2]; }
    return { png, mean: [r / n, g / n, b / n].map((v) => +v.toFixed(1)) };
}
function changed(a: PNG, b: PNG): number {
    if (a.width !== b.width || a.height !== b.height) return -1;
    let c = 0;
    for (let i = 0; i < a.data.length; i += 4) {
        const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
        if (d > 12) c++;
    }
    return +(c / (a.width * a.height)).toFixed(3);
}

const read = (sel: string) => {
    const el = document.querySelector(sel)!;
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, filter: cs.filter, shadow: cs.boxShadow.slice(0, 60), scale: cs.scale, pressT: cs.getPropertyValue("--press-t").trim(), dockPressT: cs.getPropertyValue("--dock-press-t").trim(), active: el.matches(":active") };
};

test("colour · a held press under reduced motion", async ({ page }, info) => {
    const project = info.project.name;
    test.skip(project === "webkit-phone", "Playwright WebKit's touchscreen cannot hold a press");
    await ready(page, REDUCE);
    const out: Record<string, unknown> = {};
    const cdp = isPhone(project) ? await page.context().newCDPSession(page) : null;
    for (const [name, sel] of Object.entries({ Button: '[data-testid="r-button"]', "icon seat": '[data-testid="r-press-icon"]', "tab seat": '[data-testid="r-press-tab"]' })) {
        const loc = page.locator(sel);
        const box = (await loc.boundingBox())!;
        const clip = { x: box.x - 2, y: box.y - 2, width: box.width + 4, height: box.height + 4 };
        const x = box.x + box.width / 2, y = box.y + box.height / 2;
        if (!cdp) await page.mouse.move(x, y);
        await page.waitForTimeout(300);
        const rest = stats(await page.screenshot({ clip }));
        const restCs = await page.evaluate(read, sel);
        let hold: Promise<unknown> | null = null;
        if (cdp) hold = cdp.send("Input.synthesizeTapGesture", { x, y, duration: 900, gestureSourceType: "touch" });
        else await page.mouse.down();
        await page.waitForTimeout(350);
        const held = stats(await page.screenshot({ clip }));
        const heldCs = await page.evaluate(read, sel);
        if (hold) await hold;
        else await page.mouse.up();
        await page.waitForTimeout(400);
        out[name] = { restMean: rest.mean, heldMean: held.mean, changedShare: changed(rest.png, held.png), restCs, heldCs };
    }
    await info.attach("colour", { body: JSON.stringify(out), contentType: "application/json" });
    console.log("colour", project, JSON.stringify(out));
});

test("row · a held press on a menu row under reduced motion", async ({ page }, info) => {
    const project = info.project.name;
    test.skip(isPhone(project), "read at 1440 with the mouse");
    await ready(page, EXITS);
    await page.locator('[data-testid="x-menu"]').click();
    await page.locator('[data-testid="x-menu-content"][data-state="open"]').waitFor();
    await page.waitForTimeout(400);
    const sel = '[data-testid="x-item-Share"]';
    const box = (await page.locator(sel).boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(200);
    await page.evaluate((sel) => {
        const el = document.querySelector(sel)!;
        const film = { frames: [] as [string, number, boolean][], stop: false };
        (window as unknown as { __row: typeof film }).__row = film;
        const tick = () => { film.frames.push([getComputedStyle(el).scale, +el.getBoundingClientRect().width.toFixed(2), el.matches(":active")]); if (!film.stop) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
    }, sel);
    await page.waitForTimeout(80);
    await page.mouse.down();
    await page.waitForTimeout(300);
    const frames = await page.evaluate(() => { const f = (window as unknown as { __row: { frames: [string, number, boolean][]; stop: boolean } }).__row; f.stop = true; return f.frames; });
    await page.mouse.up();
    const runs: { v: string; n: number }[] = [];
    for (const f of frames) { const v = `${f[0]} w=${f[1]} active=${f[2]}`; const l = runs[runs.length - 1]; if (l && l.v === v) l.n++; else runs.push({ v, n: 1 }); }
    await info.attach("row", { body: JSON.stringify({ rest: box.width, runs }), contentType: "application/json" });
    console.log("row", project, JSON.stringify({ rest: box.width, runs }));
});
