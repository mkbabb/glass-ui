// glass-ui 10.1.5 fix round 5 record probe (the verdicts live in release-10-1-5.spec.ts k1-k3):
// K3's yielded room and the focus+hover ink at 320, read in each engine.
import { test, type Page } from "@playwright/test";
import { writeFileSync, mkdirSync } from "node:fs";
const OUT = new URL("../docs/release-10.1.5/fix-5/probe/", import.meta.url).pathname;
async function open(page: Page, q: string) {
    await page.goto(`/tests-visual/release-10-1-5/harness.html?${q}`);
    await page.waitForFunction(() => (window as any).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
}
const ring = (page: Page, id: string) => page.locator(`[data-witness="${id}"]`).evaluate((el) => {
    const run = el.closest<HTMLElement>(".dock-run")!;
    const cs = getComputedStyle(el);
    const s = cs.scale === "none" ? 1 : Number.parseFloat(cs.scale);
    const ink = (Number.parseFloat(cs.outlineWidth) + Number.parseFloat(cs.outlineOffset)) * s;
    const r = el.getBoundingClientRect(), p = run.getBoundingClientRect();
    const b = getComputedStyle(run, "::before"), a = getComputedStyle(run, "::after");
    return { id: el.dataset.witness, s, ink: +ink.toFixed(2), pastL: +(p.left - (r.left - ink)).toFixed(2), pastR: +(r.right + ink - (p.left + run.clientWidth)).toFixed(2), sw: run.scrollWidth, cw: run.clientWidth, before: b.width, after: a.width, yield: getComputedStyle(run).getPropertyValue("--dock-run-yield") };
});
for (const coarse of [false, true]) test.describe(coarse ? "coarse" : "fine", () => {
    if (coarse) test.use({ hasTouch: true, isMobile: true });
    test(`k3 record ${coarse}`, async ({ page }) => {
        const rows: unknown[] = [];
        for (const [q, w] of [["kinds=tab:Home,icon,icon,tab:Settings", 320], ["kinds=tab:Home,icon,icon,tab:Settings", 390], ["persistent=1&kinds=icon,icon,tab:Settings&maxw=FIT", 390]] as [string, number][]) {
            await page.setViewportSize({ width: w, height: 800 });
            let query = q;
            if (q.includes("FIT")) {
                await open(page, "scene=seats&persistent=1&kinds=icon,icon,tab:Settings");
                const nat = await page.evaluate(() => document.querySelector<HTMLElement>(".glass-dock")!.getBoundingClientRect().width);
                query = q.replace("FIT", String(Math.floor(nat) - 4));
            }
            await open(page, `scene=seats&${query}`);
            const ids = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>(".dock-run [data-witness]")].map((e) => e.dataset.witness!));
            for (const id of [ids[0]!, ids.at(-1)!]) {
                await page.mouse.move(2, 2);
                await page.keyboard.press("Shift");
                await page.locator(`[data-witness="${id}"]`).focus();
                await page.waitForTimeout(400);
                rows.push({ q: query, w, posture: "focus", ...(await ring(page, id)) });
                await page.locator(`[data-witness="${id}"]`).hover();
                await page.waitForTimeout(500);
                rows.push({ q: query, w, posture: "focus+hover", ...(await ring(page, id)) });
            }
        }
        mkdirSync(OUT, { recursive: true });
        writeFileSync(`${OUT}k3-${test.info().project.name}-${coarse ? "coarse" : "fine"}.json`, JSON.stringify(rows, null, 1));
    });
});

test("k2 record", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const tabs = ["tab:Home", ...Array.from({ length: 10 }, () => "icon"), "tab:Settings"].join(",");
    await open(page, `scene=seats&kinds=${tabs}&orientation=vertical&stageH=360`);
    const st = (tag: string) => page.evaluate((tag) => {
        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
        const rc = getComputedStyle(run);
        return { tag, top: run.scrollTop, sh: run.scrollHeight, ch: run.clientHeight, max: run.scrollHeight - run.clientHeight, radii: [rc.borderTopLeftRadius, rc.borderBottomLeftRadius], anim: run.getAnimations().map((a) => [a.animationName ?? (a as any).animationName, (a.effect as any)?.getComputedTiming?.().progress]) };
    }, tag);
    const rows: unknown[] = [await st("open")];
    await page.keyboard.press("Shift");
    await page.locator('[data-witness="S1"]').focus();
    await page.waitForTimeout(500);
    rows.push(await st("S1 focus"));
    await page.keyboard.press("End");
    for (let i = 0; i < 6; i++) { await page.waitForTimeout(300); rows.push(await st(`End +${(i + 1) * 300}`)); }
    await page.locator('[data-witness="S12"]').hover();
    await page.waitForTimeout(600);
    rows.push(await st("hover S12"));
    await page.evaluate(() => { const r = document.querySelector<HTMLElement>(".dock-run.is-active")!; r.scrollTop = r.scrollHeight; });
    await page.waitForTimeout(600);
    rows.push(await st("scrollTop = sh"));
    rows.push(await page.evaluate(() => {
        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
        const ST = (window as any).ScrollTimeline;
        const tl = ST ? new ST({ source: run, axis: "block" }) : null;
        const kids = [...run.children] as HTMLElement[];
        const last = kids.at(-1)!;
        const anims = run.getAnimations().map((a) => { const t = (a.effect as any).getComputedTiming(); return { name: (a as any).animationName, cur: String(a.currentTime), start: String(a.startTime), progress: t.progress, phaseEnd: String(t.endTime), active: String(t.activeDuration), fill: t.fill, local: String(t.localTime) }; });
        const cs = getComputedStyle(run);
        return { tag: "timeline", anims, rangeCss: (cs as any).animationRangeEnd + " / " + (cs as any).animationRangeStart + " / " + cs.animationFillMode, current: tl ? String(tl.currentTime) : "none", lastEnd: last.offsetTop + last.offsetHeight, lastRect: last.getBoundingClientRect().bottom - run.getBoundingClientRect().top + run.scrollTop, padEnd: getComputedStyle(run).paddingBlockEnd, top: run.scrollTop };
    }));
    mkdirSync(OUT, { recursive: true });
    writeFileSync(`${OUT}k2-${test.info().project.name}.json`, JSON.stringify(rows, null, 1));
});
