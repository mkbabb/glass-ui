// glass-ui 11.0.1, fix 2 — the stadium dock's rest corner with and without the script's
// published cross extent. A server-rendered dock paints before its mounted hook writes
// `--dock-plate-cross-px`; the cascade it paints then is the mounted dock's with that
// inline property removed. In every geometry the corner must be the same length either
// way (half the plate's cross extent: its height when horizontal, its width when
// vertical), on the box and on the plate that inherits it.
//   f1  the owner's figure dock (11.0.1 harness), open and collapsed
//   f2  a plain horizontal dock, the house density and the cockpit preset (10.1.5 harness)
//   f3  a vertical dock (10.1.5 harness)
//   f4  the prerendered page itself: the owner's figure dock serialized from the mounted
//       harness with every script-written root attribute and inline property stripped,
//       its root carrying daraksha's prerendered class set, set into a page whose context
//       runs NO script, with the stylesheets the tree serves inlined. Computed corners,
//       and the end read in paint (the plate filled opaque on a dark page, its corner
//       untouched, so its shape reads plainly): on a row 4 px under the box's top, where
//       the first ink of the plate lies against a stadium's arc (about 13.6 px in at a 28 px
//       corner) and a square end's (0 px).
// 1440 fine and 390 coarse. Each cell prints a `f2 ` JSON row.
import { expect, test, type Browser, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";

const OUT = process.env.FIX2_OUT ?? "docs/release-11.0.1/fix-2/shots";

type Read = { inline: string; root: string; plate: string; cross: number };

async function read(page: Page, sel: string): Promise<Read> {
    return page.evaluate((sel) => {
        const root = document.querySelector<HTMLElement>(sel)!;
        const plate = root.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const vertical = root.classList.contains("vertical");
        return {
            inline: root.style.getPropertyValue("--dock-plate-cross-px"),
            root: getComputedStyle(root).borderTopLeftRadius,
            plate: getComputedStyle(plate).borderTopLeftRadius,
            cross: vertical ? plate.offsetWidth : plate.offsetHeight,
        };
    }, sel);
}

async function cell(page: Page, url: string, sel: string, name: string): Promise<void> {
    await page.goto(url);
    await page.locator(sel).first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const published = await read(page, sel);
    await page.evaluate((sel) => document.querySelector<HTMLElement>(sel)!.style.removeProperty("--dock-plate-cross-px"), sel);
    await page.waitForTimeout(200);
    const unpublished = await read(page, sel);
    console.log(`f2 ${JSON.stringify({ cell: name, published, unpublished })}`);
    expect(published.inline, `${name}: the script published its measure`).not.toBe("");
    const half = published.cross / 2;
    for (const [k, v] of [
        ["published root", published.root],
        ["published plate", published.plate],
        ["unpublished root", unpublished.root],
        ["unpublished plate", unpublished.plate],
    ] as const) {
        expect.soft(Math.abs(Number.parseFloat(v) - half), `${name}: ${k} ${v} is half the cross extent ${half}`).toBeLessThanOrEqual(0.5);
    }
}

const PRERENDERED = "dock glass-dock horizontal shape-pill collapsed fit-content";

async function staticCell(page: Page, browser: Browser, state: "open" | "closed", coarse: boolean, name: string): Promise<void> {
    await page.goto(`/tests-visual/release-11-0-1/harness.html?scene=figure&collapse=${state}`);
    await page.locator(".witness-dock").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const { html, css } = await page.evaluate((prerendered) => {
        const root = document.querySelector<HTMLElement>(".witness-dock")!.cloneNode(true) as HTMLElement;
        root.removeAttribute("style");
        for (const a of Array.from(root.attributes)) if (a.name.startsWith("data-") && a.name !== "data-backdrop-mode") root.removeAttribute(a.name);
        const open = !root.classList.contains("collapsed");
        root.className = `${open ? prerendered.replace(" collapsed", "") : prerendered} witness-dock`;
        const css = Array.from(document.styleSheets)
            .map((sheet) => {
                try {
                    return Array.from(sheet.cssRules).map((r) => r.cssText).join("\n");
                } catch {
                    return "";
                }
            })
            .join("\n");
        return { html: root.outerHTML, css };
    }, PRERENDERED);
    const DSF = 2;
    const ctx = await browser.newContext({
        javaScriptEnabled: false,
        deviceScaleFactor: DSF,
        ...(coarse ? { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } } : { viewport: { width: 1440, height: 900 } }),
    });
    try {
        const sp = await ctx.newPage();
        await sp.setContent(
            `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>${css}</style><style>html,body{background:#1d2b3a!important}body{margin:0;padding:48px;display:flex;justify-content:center}.witness-dock{box-shadow:none!important}.witness-dock>.dock-plate{background:#e8e2d0!important;opacity:1!important}</style></head><body>${html}</body></html>`,
        );
        await sp.waitForTimeout(300);
        const read = await sp.evaluate(() => {
            const root = document.querySelector<HTMLElement>(".witness-dock")!;
            const plate = root.querySelector<HTMLElement>(":scope > .dock-plate")!;
            const b = root.getBoundingClientRect();
            return {
                classes: root.className,
                scripts: document.scripts.length,
                root: getComputedStyle(root).borderTopLeftRadius,
                plate: getComputedStyle(plate).borderTopLeftRadius,
                box: { x: b.x, y: b.y, w: b.width, h: b.height },
            };
        });
        const pad = 6;
        const clip = { x: Math.floor(read.box.x - pad), y: Math.floor(read.box.y - pad), width: Math.ceil(read.box.w + 2 * pad), height: Math.ceil(read.box.h + 2 * pad) };
        const buf = await sp.screenshot({ clip, scale: "device" });
        mkdirSync(OUT, { recursive: true });
        writeFileSync(join(OUT, `f4-${name.replace(/ /g, "-")}-${sp.context().browser()!.browserType().name()}.png`), buf);
        const png = PNG.sync.read(buf);
        const px = (x: number, y: number) => {
            const i = (y * png.width + x) * 4;
            return [png.data[i]!, png.data[i + 1]!, png.data[i + 2]!];
        };
        const firstInk = (dy: number, fromRight: boolean) => {
            const y = Math.round((read.box.y - clip.y + dy) * DSF);
            const bg = px(fromRight ? png.width - 1 : 0, y);
            for (let k = 0; k < png.width / 2; k++) {
                const x = fromRight ? png.width - 1 - k : k;
                const c = px(x, y);
                if (Math.abs(c[0]! - bg[0]!) + Math.abs(c[1]! - bg[1]!) + Math.abs(c[2]! - bg[2]!) > 30) {
                    return fromRight ? read.box.x + read.box.w - (clip.x + (x + 1) / DSF) : clip.x + x / DSF - read.box.x;
                }
            }
            return Number.NaN;
        };
        const r = read.box.h / 2;
        const dy = 4;
        const stadium = r - Math.sqrt(r * r - (r - dy) * (r - dy));
        const left = firstInk(dy, false);
        const right = firstInk(dy, true);
        console.log(`f2 ${JSON.stringify({ cell: name, ...read, paintRow: dy, stadium: Number(stadium.toFixed(1)), left: Number(left.toFixed(1)), right: Number(right.toFixed(1)) })}`);
        expect(read.scripts, `${name}: the page runs no script`).toBe(0);
        expect.soft(Math.abs(Number.parseFloat(read.root) - r), `${name}: root corner ${read.root} is half the height ${r}`).toBeLessThanOrEqual(0.5);
        expect.soft(Math.abs(Number.parseFloat(read.plate) - r), `${name}: plate corner ${read.plate} is half the height ${r}`).toBeLessThanOrEqual(0.5);
        for (const [side, at] of [["left", left], ["right", right]] as const) {
            expect.soft(Math.abs(at - stadium), `${name}: the ${side} end's first ink ${at} px in lies on a stadium's arc (${stadium.toFixed(1)} px), not a square end's (0 px)`).toBeLessThanOrEqual(2.5);
        }
    } finally {
        await ctx.close();
    }
}

for (const coarse of [false, true]) {
    const tag = coarse ? "390c" : "1440f";
    test.describe(`fix 2 ${tag}`, () => {
        test.use(
            coarse
                ? { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } }
                : { viewport: { width: 1440, height: 900 } },
        );
        for (const state of ["open", "closed"] as const) {
            test(`f1 ${tag} the figure dock ${state}: the rest corner needs no script`, async ({ page }) => {
                await cell(page, `/tests-visual/release-11-0-1/harness.html?scene=figure&collapse=${state}`, ".witness-dock", `${tag} figure ${state}`);
            });
        }
        for (const preset of ["", "cockpit"]) {
            test(`f2 ${tag} a horizontal dock${preset ? ` (${preset})` : ""}: the rest corner needs no script`, async ({ page }) => {
                await cell(
                    page,
                    `/tests-visual/release-10-1-5/harness.html?scene=seats&kinds=icon,icon,icon${preset ? `&preset=${preset}` : ""}`,
                    ".glass-dock",
                    `${tag} horizontal ${preset || "house"}`,
                );
            });
        }
        for (const state of ["open", "closed"] as const) {
            test(`f4 ${tag} the prerendered figure dock ${state}, no script: corners and paint`, async ({ page, browser }) => {
                await staticCell(page, browser, state, coarse, `${tag} prerendered ${state}`);
            });
        }
        test(`f3 ${tag} a vertical dock: the rest corner needs no script`, async ({ page }) => {
            await cell(page, `/tests-visual/release-10-1-5/harness.html?scene=seats&kinds=icon,icon,icon&orientation=vertical&stageH=400`, ".glass-dock", `${tag} vertical`);
        });
    });
}
