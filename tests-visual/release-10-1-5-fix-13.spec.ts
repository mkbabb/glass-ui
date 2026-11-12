/* 10.1.5 fix round 13 (docs/release-10.1.5/fix-13.md): f13a, a diagnostic reading of critique 13's T1
   (n1's collapse start at 332 on a coarse pointer, where WebKit's run jumped to its scroll end). The flow is
   c13b's on critic 7's harness; each repeat logs, with no layout read of its own, every scroll event of the
   run, every attribute change on the root and the run, and whatever the page's own `__t1log` hook records
   (a diagnostic src patch only). Rows bank to F13A_OUT. Never fails on a finding. */
import { test } from "@playwright/test";
import { writeFileSync } from "node:fs";

const N = Number(process.env.F13A_N ?? 24);
const STAGE = Number(process.env.F13A_STAGE ?? 332);
const OUT = process.env.F13A_OUT ?? new URL("../docs/release-10.1.5/fix-13/f13a.json", import.meta.url).pathname;

test.describe("f13a coarse", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    test("f13a the collapse start's scroll, logged", async ({ page }, info) => {
        test.setTimeout(1_200_000);
        const rows: unknown[] = [];
        await page.setViewportSize({ width: 1440, height: 800 });
        for (let i = 0; i < N; i += 1) {
            await page.goto(`/tests-visual/release-10-1-5/critic-7.html?scene=dock&collapse=closed&orientation=vertical&stageH=${STAGE}&kinds=icon,icon,icon,icon,icon,icon`);
            await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(700);
            await page.mouse.move(1430, 790);
            await page.evaluate(() => {
                const w = window as unknown as { __t1log: unknown[] };
                w.__t1log = [];
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const run = dock.querySelector<HTMLElement>(".dock-run")!;
                run.addEventListener("scroll", () => w.__t1log.push({ k: "scroll", t: performance.now(), st: run.scrollTop }));
                new MutationObserver((recs) => {
                    for (const r of recs) w.__t1log.push({ k: "mut", t: performance.now(), el: r.target === run ? "run" : "root", a: r.attributeName });
                }).observe(dock, { attributes: true, subtree: false });
                new MutationObserver((recs) => {
                    for (const r of recs) w.__t1log.push({ k: "mut", t: performance.now(), el: "run", a: r.attributeName, v: (r.target as HTMLElement).getAttribute(r.attributeName!) });
                }).observe(run, { attributes: true, attributeFilter: ["class", "inert"] });
            });
            await page.evaluate(() => (window as unknown as { __dock: { expand(): void } }).__dock.expand());
            await page.waitForTimeout(1600);
            const frames = page.evaluate(
                () =>
                    new Promise<Record<string, number | boolean>[]>((res) => {
                        const out: Record<string, number | boolean>[] = [];
                        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                        const run = dock.querySelector<HTMLElement>(".dock-run")!;
                        const t0 = performance.now();
                        const step = (now: number) => {
                            out.push({ t: now, morphing: dock.hasAttribute("data-morphing"), st: run.scrollTop });
                            if (performance.now() - t0 < 400) requestAnimationFrame(step);
                            else res(out);
                        };
                        requestAnimationFrame(step);
                    }),
            );
            await page.waitForTimeout(100);
            await page.evaluate(() => {
                const w = window as unknown as { __t1log: unknown[]; __dock: { collapse(): void } };
                const run = document.querySelector<HTMLElement>(".glass-dock .dock-run")!;
                w.__t1log.push({ k: "collapse", t: performance.now() });
                w.__dock.collapse();
                w.__t1log.push({ k: "collapse-sync", t: performance.now() });
                queueMicrotask(() => queueMicrotask(() => queueMicrotask(() => w.__t1log.push({ k: "late-micro", t: performance.now(), st: run.scrollTop }))));
            });
            const c = await frames;
            const log = await page.evaluate(() => (window as unknown as { __t1log: unknown[] }).__t1log);
            const m = c.findIndex((f) => f.morphing);
            const jumped = m > 0 && c[m]!.st !== c[m - 1]!.st;
            rows.push({ i, project: info.project.name, label: process.env.F13A_LABEL ?? "tip", jumped, frames: c.slice(Math.max(0, m - 2), m + 3), log: jumped || i < 4 ? (() => { const at = log.findIndex((e) => (e as { k: string }).k === "collapse"); return log.slice(Math.max(0, at - 12), at + 50); })() : undefined });
        }
        writeFileSync(OUT.replace(/\.json$/, `-${process.env.F13A_LABEL ?? "tip"}-${info.project.name}.json`), JSON.stringify(rows, null, 1));
    });
});
