// Critic 8 probe, readings only: the frost note's witness (orchestrator-note-frost-under-reduce.md).
// Under prefers-reduced-motion: reduce, the exits harness's Sheet right, Sheet bottom and
// detented Sheet are opened by a tap and closed by Escape, three times each, and every
// animation frame records the plate's effective opacity and the frost layer's
// ([data-slot="glass-graded-halo"]). On every frame the frost layer is present its opacity
// is within 0.02 of the plate's; it enters from 0.02 or less and leaves at 0.02 or less.
import { expect, test, type Page } from "@playwright/test";
import { gotoReady, pressOn } from "../release-11-1-1/film";

const EXITS = "/tests-visual/release-11-1-1/exits-harness.html";
const HALO = '[data-slot="glass-graded-halo"]';

type F = { t: number; plate: number | null; halo: number | null };

async function film(page: Page, plate: string, act: () => Promise<void>, ms: number) {
    await page.evaluate(({ plate, halo }) => {
        const w = window as unknown as { __frost: { t0: number; mark: number; frames: unknown[]; stop: boolean } };
        const f = { t0: performance.now(), mark: -1, frames: [] as unknown[], stop: false };
        w.__frost = f;
        const eff = (el: Element | null) => {
            if (!el) return null;
            let o = 1;
            for (let n: Element | null = el; n; n = n.parentElement) {
                const cs = getComputedStyle(n);
                if (cs.display === "none" || cs.visibility === "hidden") return 0;
                o *= parseFloat(cs.opacity);
            }
            return o;
        };
        const tick = (ft: number) => {
            f.frames.push({ t: ft - f.t0, plate: eff(document.querySelector(plate)), halo: eff(document.querySelector(halo)) });
            if (!f.stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, { plate, halo: HALO });
    await page.waitForFunction(() => {
        const f = (window as unknown as { __frost: { t0: number; frames: { t: number }[] } }).__frost;
        return f.frames.length > 0 && performance.now() - f.t0 > f.frames[0].t;
    });
    await page.evaluate(() => {
        const f = (window as unknown as { __frost: { t0: number; mark: number } }).__frost;
        f.mark = performance.now() - f.t0;
    });
    await act();
    await page.waitForTimeout(ms);
    return page.evaluate(() => {
        const f = (window as unknown as { __frost: { mark: number; frames: F[]; stop: boolean } }).__frost;
        f.stop = true;
        return { mark: f.mark, frames: f.frames };
    });
}

function judge(fm: { mark: number; frames: F[] }) {
    const after = fm.frames.filter((f) => f.t >= fm.mark);
    const withHalo = after.filter((f) => f.halo !== null);
    const worst = withHalo.reduce((m, f) => Math.max(m, Math.abs((f.halo ?? 0) - (f.plate ?? 0))), 0);
    const first = withHalo[0];
    const last = withHalo[withHalo.length - 1];
    const strip = after.slice(0, 26).map((f) => [Math.round(f.t - fm.mark), f.plate === null ? "-" : +f.plate.toFixed(3), f.halo === null ? "-" : +f.halo.toFixed(3)]);
    return { frames: after.length, haloFrames: withHalo.length, worstGap: +worst.toFixed(3), firstHalo: first ? +(first.halo ?? 0).toFixed(3) : null, lastHalo: last ? +(last.halo ?? 0).toFixed(3) : null, strip };
}

const sheets = [
    { name: "Sheet right", trigger: '[data-testid="x-sheet-right"]', content: '[data-testid="x-sheet-right-content"]' },
    { name: "Sheet bottom", trigger: '[data-testid="x-sheet-bottom"]', content: '[data-testid="x-sheet-bottom-content"]' },
    { name: "detented Sheet", trigger: '[data-testid="x-detent"]', content: '[data-testid="x-detent-content"]' },
];

for (const s of sheets) {
    for (const run of [1, 2, 3]) {
        test(`frost · a ${s.name}'s frost layer fades with its plate under reduced motion (${run})`, async ({ page }, info) => {
            const project = info.project.name;
            await page.emulateMedia({ reducedMotion: "reduce" });
            await gotoReady(page, EXITS);
            await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
            await page.waitForTimeout(400);
            const inFilm = await film(page, s.content, () => pressOn(page, project, s.trigger), 700);
            await page.locator(s.content).first().waitFor();
            await page.waitForTimeout(300);
            const outFilm = await film(page, s.content, () => page.keyboard.press("Escape"), 900);
            const legIn = judge(inFilm);
            const legOut = judge(outFilm);
            const at = JSON.stringify({ in: legIn, out: legOut });
            await info.attach("frost", { body: at, contentType: "application/json" });
            expect(legIn.haloFrames, `in: the frost layer is filmed ${at}`).toBeGreaterThan(0);
            expect(legOut.haloFrames, `out: the frost layer is filmed ${at}`).toBeGreaterThan(0);
            expect(legIn.worstGap, `in: on every frame the frost layer is within 0.02 of the plate ${at}`).toBeLessThanOrEqual(0.02);
            expect(legOut.worstGap, `out: on every frame the frost layer is within 0.02 of the plate ${at}`).toBeLessThanOrEqual(0.02);
            expect(legIn.firstHalo, `in: it enters from 0.02 or less ${at}`).toBeLessThanOrEqual(0.02);
            expect(legOut.lastHalo, `out: it leaves at 0.02 or less ${at}`).toBeLessThanOrEqual(0.02);
        });
    }
}
