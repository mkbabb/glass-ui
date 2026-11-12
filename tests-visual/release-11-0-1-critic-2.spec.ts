// glass-ui 11.0.1, critic round 2 — the dock's end through a morph, read from the PIXELS
// of captured frames (critic 1's cell d and the release's o3 read the computed corner
// times the box's scale, which cannot see the engine's corner clamp). The plate is filled
// opaque magenta, frames are captured at 3x as fast as the engine gives them through each
// morph, and in each frame the silhouette's two ends are measured against a circle of half
// the cross extent at three depths. Each cell prints a `c2 ` JSON row and banks its frames
// under CRITIC_OUT.
//   m  the figure dock's expand and collapse (light and dark, 1440 fine and 390 coarse)
//   s  the open figure dock's morph between its wide face and its one-seat face, and back
//   v  a vertical dock's expand and collapse (the block-axis arm of the morph corner rule)
//   k  11.0.0's `expandOn="press"` dock under 10.1.5's keyboard reopen: Tab onto the folded
//      summary leaves the dock folded with focus on the summary (11.0.0: it opens only on
//      a press or Enter/Space), and Enter then opens it
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { PNG } from "pngjs";

const OUT = process.env.CRITIC_OUT ?? "docs/release-11.0.1/critic-2/runs/c2-shots";
const DSF = 3;
const FILL = ".witness-dock > .dock-plate{background:rgb(255,0,255)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}";

async function open(page: Page, url: string, dark: boolean): Promise<void> {
    await page.addInitScript((dark) => document.documentElement.classList.toggle("dark", dark), dark);
    await page.goto(url);
    await page.locator(".witness-dock").waitFor();
    await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), dark);
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: FILL });
    await page.waitForTimeout(600);
}

type End = { r: number; worst: number; at: string };

/** The magenta silhouette's two ends against a circle of half its cross extent (CSS px). */
function ends(png: PNG, vertical: boolean): { main: number; cross: number; worst: number; at: string } | null {
    const W = vertical ? png.height : png.width;
    const H = vertical ? png.width : png.height;
    const ink = (m: number, c: number): boolean => {
        const x = vertical ? c : m, y = vertical ? m : c;
        const i = (y * png.width + x) * 4;
        return png.data[i] > 170 && png.data[i + 2] > 170 && png.data[i + 1] < 110;
    };
    // Per cross line: the first and last inked position on the main axis.
    const lines: Array<[number, number] | null> = [];
    for (let c = 0; c < H; c++) {
        let lo = -1, hi = -1;
        for (let m = 0; m < W; m++) if (ink(m, c)) { if (lo < 0) lo = m; hi = m; }
        lines.push(lo < 0 ? null : [lo, hi]);
    }
    const cs = lines.map((l, c) => (l ? c : -1)).filter((c) => c >= 0);
    if (cs.length < 12) return null;
    const top = cs[0], bottom = cs[cs.length - 1];
    const cross = bottom - top + 1;
    const r = cross / 2;
    const lo = Math.min(...cs.map((c) => lines[c]![0])), hi = Math.max(...cs.map((c) => lines[c]![1]));
    let worst = 0, at = "";
    for (const f of [0.1, 0.3, 0.6]) {
        const d = Math.round(r * f);
        const want = r - Math.sqrt(r * r - (r - d) * (r - d));
        for (const [side, c] of [["a", top + d], ["b", bottom - d]] as const) {
            const l = lines[c];
            if (!l) continue;
            for (const [end, got] of [["start", l[0] - lo], ["end", hi - l[1]]] as const) {
                const off = (got - want) / DSF;
                if (Math.abs(off) > Math.abs(worst)) { worst = off; at = `${end}-${side}@${f} inset ${(got / DSF).toFixed(1)} want ${(want / DSF).toFixed(1)}`; }
            }
        }
    }
    return { main: (hi - lo + 1) / DSF, cross: cross / DSF, worst: Number(worst.toFixed(2)), at };
}

async function frames(page: Page, name: string, n: number, vertical: boolean) {
    mkdirSync(OUT, { recursive: true });
    const vp = page.viewportSize()!;
    const rows: Array<Record<string, unknown>> = [];
    const t0 = Date.now();
    for (let i = 0; i < n; i++) {
        const before = await page.evaluate(() => {
            const r = document.querySelector<HTMLElement>(".witness-dock")!;
            return { morph: r.hasAttribute("data-morphing"), scale: getComputedStyle(r).scale };
        });
        const buf = await page.screenshot({ clip: vertical ? { x: 0, y: 0, width: 200, height: vp.height } : { x: 0, y: vp.height - 150, width: vp.width, height: 150 }, scale: "device" });
        const t = Date.now() - t0;
        const e = ends(PNG.sync.read(buf), vertical);
        const keep = before.morph || i === 0 || i === n - 1;
        if (keep) writeFileSync(join(OUT, `${name}-${String(i).padStart(2, "0")}.png`), buf);
        rows.push({ i, t, ...before, ...e });
    }
    return rows;
}

function judge(cell: string, rows: Array<Record<string, unknown>>, morphs = true): void {
    const morph = rows.filter((r) => r.morph);
    const off = rows.filter((r) => typeof r.worst === "number" && Math.abs(r.worst as number) > 1.5);
    console.log(`c2 ${JSON.stringify({ cell, frames: rows.length, morphFrames: morph.length, off: off.length, rows })}`);
    // A face switch resizes the open dock without `data-morphing` (the box takes the new
    // face's width on the first frame), so `s` reads every frame and asks for no morph.
    if (morphs) expect.soft(morph.length, `${cell}: frames captured mid-morph`).toBeGreaterThan(0);
    expect.soft(off.map((r) => `${r.i}@${r.t}ms ${r.morph ? "morph" : "rest"} scale ${r.scale}: ${r.worst} px (${r.at})`), `${cell}: frames whose end is not a circle of half the cross extent`).toEqual([]);
}

for (const dark of [false, true]) {
    for (const coarse of [false, true]) {
        const tag = `${dark ? "dark" : "light"}-${coarse ? "390c" : "1440f"}`;
        test.describe(`critic 2 ${tag}`, () => {
            test.use(
                coarse
                    ? { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 }, deviceScaleFactor: DSF }
                    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: DSF },
            );

            test(`m ${tag}: the figure dock's end in paint through the expand and the collapse`, async ({ page }, info) => {
                const e = info.project.name === "webkit" ? "wk" : "ch";
                await open(page, "/tests-visual/release-11-0-1/harness.html?scene=figure&collapse=closed&end=1", dark);
                const summary = page.locator(".witness-dock .dock-layer--summary");
                if (coarse) await summary.tap();
                else await summary.click();
                judge(`${tag} ${e} expand`, await frames(page, `m-${tag}-${e}-expand`, 12, false));
                await page.waitForTimeout(700);
                if (coarse) await page.touchscreen.tap(5, 5);
                else await page.mouse.click(5, 5);
                judge(`${tag} ${e} collapse`, await frames(page, `m-${tag}-${e}-collapse`, 12, false));
            });

            if (dark === coarse) {
                test(`s ${tag}: the open dock's end in paint through the morph to its narrow face and back`, async ({ page }, info) => {
                    const e = info.project.name === "webkit" ? "wk" : "ch";
                    await open(page, "/tests-visual/release-11-0-1/critic-2.html?scene=switch", dark);
                    await page.evaluate(() => (window as unknown as { __layer: (id: string) => void }).__layer("page"));
                    judge(`${tag} ${e} to-narrow`, await frames(page, `s-${tag}-${e}-narrow`, 12, false), false);
                    await page.waitForTimeout(700);
                    await page.evaluate(() => (window as unknown as { __layer: (id: string) => void }).__layer("pages"));
                    judge(`${tag} ${e} to-wide`, await frames(page, `s-${tag}-${e}-wide`, 12, false), false);
                });

                test(`v ${tag}: a vertical dock's end in paint through the expand and the collapse`, async ({ page }, info) => {
                    const e = info.project.name === "webkit" ? "wk" : "ch";
                    await open(page, "/tests-visual/release-11-0-1/critic-2.html?scene=vertical&collapse=closed", dark);
                    const summary = page.locator(".witness-dock .dock-layer--summary");
                    if (coarse) await summary.tap();
                    else await summary.click();
                    judge(`${tag} ${e} v-expand`, await frames(page, `v-${tag}-${e}-expand`, 12, true));
                    await page.waitForTimeout(700);
                    if (coarse) await page.touchscreen.tap(380, 5);
                    else await page.mouse.click(1000, 5);
                    judge(`${tag} ${e} v-collapse`, await frames(page, `v-${tag}-${e}-collapse`, 12, true));
                });
            }
        });
    }
}

test("k a press-only dock stays folded when Tab reaches its summary, and Enter opens it", async ({ page }, info) => {
    const e = info.project.name === "webkit" ? "wk" : "ch";
    await page.goto("/tests-visual/release-11-0-1/critic-2.html?scene=press");
    await page.locator(".witness-dock").waitFor();
    await page.waitForTimeout(500);
    await page.locator("body").focus();
    const read = () =>
        page.evaluate(() => {
            const root = document.querySelector<HTMLElement>(".witness-dock")!;
            const a = document.activeElement as HTMLElement | null;
            return {
                collapsed: root.classList.contains("collapsed"),
                morphing: root.hasAttribute("data-morphing"),
                active: a ? `${a.tagName.toLowerCase()}.${a.className}`.slice(0, 80) : null,
                onSummary: !!a?.classList.contains("dock-layer--summary"),
                focusVisible: !!a?.matches(":focus-visible"),
                label: a?.getAttribute("aria-label") ?? null,
            };
        });
    let r = await read();
    for (let i = 0; i < 4 && !r.onSummary; i++) {
        await page.keyboard.press(e === "wk" ? "Alt+Tab" : "Tab");
        await page.waitForTimeout(150);
        r = await read();
    }
    await page.waitForTimeout(900);
    const afterTab = await read();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1200);
    const afterEnter = await read();
    console.log(`c2 ${JSON.stringify({ cell: `${e} press-only`, reached: r, afterTab, afterEnter })}`);
    expect.soft(r.onSummary && r.focusVisible, `Tab reached the summary with a keyboard focus (${JSON.stringify(r)})`).toBe(true);
    expect.soft(afterTab.collapsed && afterTab.onSummary, `the dock is still folded and focus is on the summary (${JSON.stringify(afterTab)})`).toBe(true);
    expect.soft(!afterEnter.collapsed, `Enter opens it (${JSON.stringify(afterEnter)})`).toBe(true);
});
