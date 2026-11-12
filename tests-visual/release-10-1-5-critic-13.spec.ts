// glass-ui 10.1.5 — critic round 13's one measurement cell (orchestrator-note-fable-review.md item 3): the frame
// cost of the dock's root-style MutationObserver (`hostStyle`, dockMorphMeasure.ts), which fires on every
// `--dock-morph-t` write of every morph. Chromium only (CDP CPU throttle, 4x). No new harness scene: the release
// harness's `dock` scene, `collapse=closed`, one expand and one collapse per cell. Three arms on the same served
// code, interleaved:
//   tip    the page untouched
//   noobs  `MutationObserver.prototype.observe` skips the one call whose options are exactly
//          `{ attributes, attributeFilter: ["style", "class"] }` (the hostStyle observer; the skip is counted)
//   timed  the page untouched but that observer's callback is timed (calls and total ms)
// Each morph also banks the main thread's task, script, layout and style seconds (CDP Performance metrics), so
// work the observer only moves earlier in the frame reads apart from work it adds. Rows bank to OBS_OUT. Never fails on a finding.
import { test } from "@playwright/test";
import { writeFileSync } from "node:fs";

const N = Number(process.env.OBS_N ?? 12);
const OUT = process.env.OBS_OUT ?? new URL("../docs/release-10.1.5/critic-13/obs.json", import.meta.url).pathname;

const NOOBS = `(() => {
  const o = MutationObserver.prototype.observe;
  MutationObserver.prototype.observe = function (t, opt) {
    if (opt && !opt.childList && opt.attributeFilter && opt.attributeFilter.join() === "style,class") {
      window.__skipped = (window.__skipped || 0) + 1;
      return;
    }
    return o.call(this, t, opt);
  };
})()`;

const TIMED = `(() => {
  const MO = window.MutationObserver;
  window.__obs = { n: 0, ms: 0, armed: 0 };
  window.MutationObserver = class extends MO {
    constructor(cb) {
      let self;
      super((r, o) => {
        if (!self.__timed) return cb(r, o);
        const t = performance.now();
        cb(r, o);
        window.__obs.n += 1;
        window.__obs.ms += performance.now() - t;
      });
      self = this;
    }
    observe(t, opt) {
      if (opt && !opt.childList && opt.attributeFilter && opt.attributeFilter.join() === "style,class") {
        this.__timed = true;
        window.__obs.armed += 1;
      }
      return super.observe(t, opt);
    }
  };
})()`;

type Morph = { frames: number; mean: number; p95: number; max: number; over20: number; over34: number; ms: number };

test("c13a the root-style observer's frame cost at 4x CPU throttle", async ({ browser }, info) => {
    test.skip(info.project.name !== "chromium-headless-new", "CDP CPU throttle: Chromium only");
    test.setTimeout(900_000);
    const rows: unknown[] = [];
    const arms = ["tip", "noobs", "timed"] as const;
    for (let i = 0; i < N; i += 1) {
        for (let k = 0; k < arms.length; k += 1) {
            const arm = arms[(i + k) % arms.length]!;
            const context = await browser.newContext({ viewport: { width: 1440, height: 800 } });
            try {
                const page = await context.newPage();
                if (arm === "noobs") await page.addInitScript(NOOBS);
                if (arm === "timed") await page.addInitScript(TIMED);
                await page.goto(`/tests-visual/release-10-1-5/harness.html?scene=dock&collapse=closed&seats=6`);
                await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
                await page.evaluate(() => document.fonts.ready);
                await page.waitForTimeout(700);
                await page.mouse.move(2, 790);
                const cdp = await context.newCDPSession(page);
                await cdp.send("Performance.enable");
                await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
                // Main-thread seconds by kind (CDP Performance metrics), read around each morph.
                const cpu = async () => {
                    const { metrics } = await cdp.send("Performance.getMetrics");
                    const g = (n: string) => metrics.find((m) => m.name === n)?.value ?? 0;
                    return { task: g("TaskDuration"), script: g("ScriptDuration"), layout: g("LayoutDuration"), style: g("RecalcStyleDuration"), layouts: g("LayoutCount"), styles: g("RecalcStyleCount") };
                };
                const spent = async (run: () => Promise<Morph>) => {
                    const a = await cpu();
                    const m = await run();
                    const b = await cpu();
                    return { ...m, cpuMs: { task: (b.task - a.task) * 1000, script: (b.script - a.script) * 1000, layout: (b.layout - a.layout) * 1000, style: (b.style - a.style) * 1000, layouts: b.layouts - a.layouts, styles: b.styles - a.styles } };
                };
                const morph = (action: "expand" | "collapse") =>
                    page.evaluate(
                        (action) =>
                            new Promise<Morph>((res) => {
                                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                                const deltas: number[] = [];
                                let last = 0;
                                let t0 = 0;
                                let seen = false;
                                const tick = (now: number) => {
                                    const m = dock.hasAttribute("data-morphing");
                                    if (m) seen = true;
                                    if (last && (m || !seen)) deltas.push(now - last);
                                    last = now;
                                    if ((seen && !m) || now - t0 > 3000) {
                                        const s = [...deltas].sort((a, b) => a - b);
                                        res({
                                            frames: s.length,
                                            mean: s.reduce((a, b) => a + b, 0) / (s.length || 1),
                                            p95: s[Math.floor(s.length * 0.95)] ?? 0,
                                            max: s.at(-1) ?? 0,
                                            over20: s.filter((d) => d > 20).length,
                                            over34: s.filter((d) => d > 34).length,
                                            ms: now - t0,
                                        });
                                    } else requestAnimationFrame(tick);
                                };
                                requestAnimationFrame((now) => {
                                    t0 = now;
                                    last = now;
                                    (window as unknown as { __dock: Record<string, () => void> }).__dock[action]!();
                                    requestAnimationFrame(tick);
                                });
                            }),
                        action,
                    );
                const expand = await spent(() => morph("expand"));
                await page.waitForTimeout(400);
                const collapse = await spent(() => morph("collapse"));
                const meta = await page.evaluate(() => {
                    const w = window as unknown as { __skipped?: number; __obs?: unknown };
                    return { skipped: w.__skipped ?? 0, obs: w.__obs ?? null };
                });
                await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
                rows.push({ i, arm, expand, collapse, ...meta });
            } finally {
                await context.close();
            }
        }
    }
    writeFileSync(OUT, JSON.stringify(rows, null, 1));
});

// c13b: a second reading of the release spec's n1 (invariant 5) at its coarse 332 px stage, where one WebKit
// whole-spec pass read a 20 px seat step on the collapse's first morph frame. The same flow as n1 (critic 7's
// harness, no new scene) with each frame's time, `--dock-morph-t`, the root's and the run's boxes and the page
// scroll, on the tip and on v10.1.4's `src` (the `-v1014` harness), interleaved, at each of n1's stages
// (C13B_ARMS, C13B_STAGES; C13B_LABEL names a swapped-in `src`). Rows bank to C13B_OUT; frames
// are kept for every repeat whose first morph frame steps over 0.5 px. Never fails on a finding.
const C13B_N = Number(process.env.C13B_N ?? 8);
const C13B_ARMS = (process.env.C13B_ARMS ?? "tip,v1014").split(",");
const C13B_STAGES = (process.env.C13B_STAGES ?? "316,324,332,340,348").split(",").map(Number);
const C13B_OUT = process.env.C13B_OUT ?? new URL("../docs/release-10.1.5/critic-13/c13b.json", import.meta.url).pathname;

test.describe("c13b coarse", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    test("c13b n1's collapse start at 332, per frame, tip and v10.1.4", async ({ page }, info) => {
        test.setTimeout(1_200_000);
        const rows: unknown[] = [];
        await page.setViewportSize({ width: 1440, height: 800 });
        for (let i = 0; i < C13B_N; i += 1)
            for (const arm of i % 2 ? [...C13B_ARMS].reverse() : C13B_ARMS)
                for (const stageH of C13B_STAGES) {
                    await page.goto(`/tests-visual/release-10-1-5/critic-7${arm === "v1014" ? "-v1014" : ""}.html?scene=dock&collapse=closed&orientation=vertical&stageH=${stageH}&kinds=icon,icon,icon,icon,icon,icon`);
                    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
                    await page.evaluate(() => document.fonts.ready);
                    await page.waitForTimeout(700);
                    await page.mouse.move(1430, 790);
                    await page.evaluate(() => (window as unknown as { __dock: { expand(): void } }).__dock.expand());
                    await page.waitForTimeout(1600);
                    const frames = page.evaluate(
                        () =>
                            new Promise<Record<string, number | boolean | string>[]>((res) => {
                                const out: Record<string, number | boolean | string>[] = [];
                                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                                const run = dock.querySelector<HTMLElement>(".dock-run")!;
                                const s1 = document.querySelector<HTMLElement>('[data-witness="S1"]')!;
                                const s6 = document.querySelector<HTMLElement>('[data-witness="S6"]')!;
                                const t0 = performance.now();
                                const step = (now: number) => {
                                    const d = dock.getBoundingClientRect();
                                    const r = run.getBoundingClientRect();
                                    out.push({
                                        t: +(now - t0).toFixed(1),
                                        morphing: dock.hasAttribute("data-morphing"),
                                        mt: dock.style.getPropertyValue("--dock-morph-t"),
                                        s1: s1.getBoundingClientRect().top,
                                        s6: s6.getBoundingClientRect().bottom,
                                        dockTop: d.top, dockH: d.height, runTop: r.top, runH: r.height,
                                        pad: getComputedStyle(run).paddingTop, st: run.scrollTop, sh: run.scrollHeight, ch: run.clientHeight, fits: dock.hasAttribute("data-run-fits"), sy: window.scrollY,
                                        cls: dock.className.replace(/\s+/g, " "),
                                    });
                                    if (performance.now() - t0 < 700) requestAnimationFrame(step);
                                    else res(out);
                                };
                                requestAnimationFrame(step);
                            }),
                    );
                    await page.waitForTimeout(100);
                    await page.evaluate(() => (window as unknown as { __dock: { collapse(): void } }).__dock.collapse());
                    const c = await frames;
                    const m = c.findIndex((f) => f.morphing);
                    const [p, q] = [c[m - 1], c[m]];
                    const stepPx = p && q ? Math.max(Math.abs((q.s1 as number) - (p.s1 as number)), Math.abs((q.s6 as number) - (p.s6 as number))) : -1;
                    // The largest frame-to-frame seat travel later in the morph, for scale.
                    let travel = 0;
                    for (let k = m + 1; k < c.length; k += 1) travel = Math.max(travel, Math.abs((c[k]!.s1 as number) - (c[k - 1]!.s1 as number)));
                    rows.push({ i, arm: process.env.C13B_LABEL ?? arm, stageH, project: info.project.name, m, rest: p && { sh: p.sh, ch: p.ch, st: p.st, fits: p.fits, pad: p.pad }, stAtQ: q?.st, step: +stepPx.toFixed(2), dt: p && q ? +((q.t as number) - (p.t as number)).toFixed(1) : -1, mtAtQ: q?.mt, travel: +travel.toFixed(2), frames: stepPx > 0.5 ? c.slice(Math.max(0, m - 2), m + 6) : undefined });
                }
        writeFileSync(C13B_OUT.replace(/\.json$/, `-${info.project.name}.json`), JSON.stringify(rows, null, 1));
    });
});
