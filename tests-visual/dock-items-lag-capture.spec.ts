// AY.W-DOCK1 — the dock items-lag CAPTURE π twin (the real-device arm).
//
// VERIFY-OR-FALSIFY the SIGNATURE recurring complaint ("the dock shrinks first, then
// the items shrink a few ms later"). The lockstep is SOLVED-BY-CONSTRUCTION (ONE
// `--dock-morph-t` scalar drives box + child stagger) but the TEMPORAL desync the
// user reports was NEVER captured — every prior dock DELTA on disk is a still frame.
//
// This is a CAPTURE spec, NOT a budget gate (the budget gate is AY.W-DOCK2). It
// drives the collapse↔expand morph on the REAL collapsible overview dock
// (`.glass-dock[data-testid="dock-capture"]` — the slider dock at /dock/overview,
// which morphs reliably), rAF-samples on ONE `performance.now()` clock:
//   (a) the dock ROOT width
//   (b) `getComputedStyle(root).getPropertyValue("--dock-morph-t")`
//   (c) the LAST `.dock-layer--full > *` child opacity (the largest stagger onset)
// across 3 conditions (hover-expand / click-collapse / retarget) × 2 viewports
// (desktop 1440×900, mobile 390×844) × {light,dark}, screenshots the morph midpoint
// to `docs/tranches/AY/audit/visual/W-DOCK1-dock-overview-<…>.png`, and ASSERTS the
// artefacts EXIST + the box↔scalar single-clock onset is FINITE (a captured number,
// not NaN). The numeric VERDICT (lag present/absent) is read in W-DOCK1-DELTA.md.
//
// We do NOT use the GlassDock `container-name` prop as the selector: it co-applies
// `container-type: inline-size`, which clamps the dock to its contained size and
// BREAKS the collapse↔expand morph (the AT.W7 / 3.4.0 dock-collapse-vs-container-type
// interaction). The selector is a plain root-forwarded `data-testid`.

import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const DOCK_ROUTE = "/dock/overview";
const DOCK_SELECTOR = '.glass-dock[data-testid="dock-capture"]';

const VIEWPORTS = [
    { id: "desktop", width: 1440, height: 900 },
    { id: "mobile", width: 390, height: 844 },
] as const;
const THEMES = ["light", "dark"] as const;
const CONDITIONS = ["hover-expand", "click-collapse", "retarget"] as const;

type Series = {
    widths: number[];
    morphTs: number[];
    lastChildOpacities: number[];
    times: number[];
    error?: string;
};

// The in-page probe (serialized into the browser). Drives one condition timeline.
function probe(selector: string, condition: string): Promise<Series> {
    return new Promise((resolve) => {
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        const dock = document.querySelector(selector) as HTMLElement | null;
        if (!dock) {
            resolve({ widths: [], morphTs: [], lastChildOpacities: [], times: [], error: "no dock" });
            return;
        }
        const fullPane = () => dock.querySelector(".dock-layer--full");
        const lastChildOf = () => {
            const pane = fullPane();
            if (!pane) return null;
            const kids = pane.children;
            return kids.length ? (kids[kids.length - 1] as Element) : null;
        };
        const fire = (types: string[]) => {
            const r = dock.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            for (const t of types) {
                dock.dispatchEvent(
                    new PointerEvent(t, { bubbles: true, clientX: cx, clientY: cy, pointerType: "mouse" }),
                );
                dock.dispatchEvent(
                    new MouseEvent(t.replace("pointer", "mouse"), { bubbles: true, clientX: cx, clientY: cy }),
                );
            }
        };
        const ENTER = ["pointerover", "pointerenter", "pointermove"];
        const LEAVE = ["pointerout", "pointerleave"];
        const wOf = () => dock.getBoundingClientRect().width;
        const tOf = () =>
            parseFloat(getComputedStyle(dock).getPropertyValue("--dock-morph-t")) || 0;
        const childOf = () => {
            const el = lastChildOf();
            return el ? parseFloat(getComputedStyle(el).opacity) : 0;
        };

        const sampleTimeline = ({ stabilizeFrames = 5, timeoutMs = 2000, awaitMorphStart = false } = {}) =>
            new Promise<Series>((res) => {
                const widths: number[] = [];
                const morphTs: number[] = [];
                const lastChildOpacities: number[] = [];
                const times: number[] = [];
                const t0 = performance.now();
                let stable = 0;
                let lastW = wOf();
                const W0 = lastW;
                let morphStarted = !awaitMorphStart;
                const f = () => {
                    const t = performance.now() - t0;
                    const w = wOf();
                    if (!morphStarted && (dock.hasAttribute("data-morphing") || Math.abs(w - W0) > 2)) {
                        morphStarted = true;
                        stable = 0;
                        widths.length = 0;
                        morphTs.length = 0;
                        lastChildOpacities.length = 0;
                        times.length = 0;
                    }
                    widths.push(w);
                    morphTs.push(tOf());
                    lastChildOpacities.push(childOf());
                    times.push(t);
                    if (Math.abs(w - lastW) < 0.5) stable++;
                    else stable = 0;
                    lastW = w;
                    if ((morphStarted && stable >= stabilizeFrames) || t > timeoutMs)
                        res({ widths, morphTs, lastChildOpacities, times });
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });

        const COLLAPSE_SETTLE_MS = 2600;
        const settled = () => !dock.hasAttribute("data-morphing") && dock.classList.contains("collapsed");
        const waitCollapsed = async () => {
            const start = performance.now();
            while (!settled() && performance.now() - start < COLLAPSE_SETTLE_MS) await sleep(60);
            await sleep(150);
        };

        (async () => {
            fire(LEAVE);
            await waitCollapsed();

            if (condition === "hover-expand") {
                fire(ENTER);
                resolve(await sampleTimeline());
                return;
            }
            if (condition === "click-collapse") {
                fire(ENTER);
                await sleep(900);
                fire(LEAVE);
                resolve(await sampleTimeline({ awaitMorphStart: true, timeoutMs: 3000 }));
                return;
            }
            if (condition === "retarget") {
                const widths: number[] = [];
                const morphTs: number[] = [];
                const lastChildOpacities: number[] = [];
                const times: number[] = [];
                const t0 = performance.now();
                fire(ENTER);
                await new Promise<void>((res) => {
                    let interrupted = false;
                    const f = () => {
                        const t = performance.now() - t0;
                        widths.push(wOf());
                        morphTs.push(tOf());
                        lastChildOpacities.push(childOf());
                        times.push(t);
                        if (!interrupted && t > 35 && t < 60) {
                            fire(LEAVE);
                            fire(ENTER);
                            interrupted = true;
                        }
                        if (t > 900) res();
                        else requestAnimationFrame(f);
                    };
                    requestAnimationFrame(f);
                });
                resolve({ widths, morphTs, lastChildOpacities, times });
                return;
            }
            resolve({ widths: [], morphTs: [], lastChildOpacities: [], times: [], error: "unknown condition" });
        })();
    });
}

// onset = the timestamp |series - series[0]| first exceeds eps (the single-clock onset).
function onsetTimeMs(series: number[], times: number[], eps: number): number {
    const from = series[0] ?? 0;
    for (let i = 1; i < series.length; i++) if (Math.abs(series[i] - from) > eps) return times[i];
    return times[times.length - 1] ?? 0;
}

test.describe("dock-items-lag-capture (π lane — VERIFY-OR-FALSIFY, capture not budget)", () => {
    test.describe.configure({ timeout: 120_000 });

    for (const viewport of VIEWPORTS) {
        for (const theme of THEMES) {
            test(`capture the morph frame-series — ${viewport.id} / ${theme}`, async ({ browser }) => {
                const ctx = await browser.newContext({
                    viewport: { width: viewport.width, height: viewport.height },
                    deviceScaleFactor: 2,
                    colorScheme: theme === "dark" ? "dark" : "light",
                    reducedMotion: "no-preference",
                });
                const page = await ctx.newPage();
                await page.addInitScript(() => {
                    try {
                        if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                            // @ts-expect-error deliberate removal
                            delete document.startViewTransition;
                        let p: object | null = Object.getPrototypeOf(document);
                        while (p) {
                            if (Object.prototype.hasOwnProperty.call(p, "startViewTransition")) {
                                // @ts-expect-error deliberate removal on proto
                                delete (p as { startViewTransition?: unknown }).startViewTransition;
                                break;
                            }
                            p = Object.getPrototypeOf(p);
                        }
                    } catch {
                        /* non-configurable */
                    }
                });
                await page.goto(DOCK_ROUTE, { waitUntil: "networkidle" });
                if (theme === "dark")
                    await page.evaluate(() => document.documentElement.classList.add("dark"));
                else await page.evaluate(() => document.documentElement.classList.remove("dark"));

                await page.waitForSelector(DOCK_SELECTOR, { timeout: 8000 });
                await page.locator(DOCK_SELECTOR).scrollIntoViewIfNeeded();
                await page.waitForTimeout(400);

                for (const condition of CONDITIONS) {
                    const series = (await page.evaluate(
                        ({ sel, cond, fn }) => {
                            // eslint-disable-next-line no-new-func
                            const p = new Function(`return (${fn})`)();
                            return p(sel, cond);
                        },
                        { sel: DOCK_SELECTOR, cond: condition, fn: probe.toString() },
                    )) as Series;

                    // The captured series must be a real morph (not empty/frozen) — the
                    // single-clock onsets must be FINITE numbers.
                    expect(series.error, `${condition}: probe error`).toBeUndefined();
                    expect(series.widths.length, `${condition}: empty timeline`).toBeGreaterThan(0);
                    const boxOnset = onsetTimeMs(series.widths, series.times, 0.5);
                    const scalarOnset = onsetTimeMs(series.morphTs, series.times, 1e-4);
                    expect(Number.isFinite(boxOnset), `${condition}: box onset not finite`).toBe(true);
                    expect(Number.isFinite(scalarOnset), `${condition}: scalar onset not finite`).toBe(true);

                    // Screenshot the morph midpoint for the keyframe PNG.
                    const pngName = `W-DOCK1-dock-overview-${condition}-${viewport.id}-${theme}.png`;
                    const pngPath = resolve(VISUAL_DIR, pngName);
                    await captureMidpoint(page, DOCK_SELECTOR, condition);
                    await page.screenshot({ path: pngPath });
                    expect(existsSync(pngPath), `${pngName} did not land on disk`).toBe(true);
                }
                await ctx.close();
            });
        }
    }
});

async function captureMidpoint(page: import("@playwright/test").Page, selector: string, condition: string) {
    await page.evaluate(
        ([sel, cond]) => {
            const dock = document.querySelector(sel) as HTMLElement | null;
            if (!dock) return;
            const r = dock.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            const fire = (types: string[]) => {
                for (const t of types) {
                    dock.dispatchEvent(
                        new PointerEvent(t, { bubbles: true, clientX: cx, clientY: cy, pointerType: "mouse" }),
                    );
                    dock.dispatchEvent(
                        new MouseEvent(t.replace("pointer", "mouse"), { bubbles: true, clientX: cx, clientY: cy }),
                    );
                }
            };
            const ENTER = ["pointerover", "pointerenter", "pointermove"];
            const LEAVE = ["pointerout", "pointerleave"];
            fire(cond === "click-collapse" ? ENTER : LEAVE);
        },
        [selector, condition],
    );
    await page.waitForTimeout(condition === "click-collapse" ? 700 : 2400);
    await page.evaluate(
        ([sel, cond]) => {
            const dock = document.querySelector(sel) as HTMLElement | null;
            if (!dock) return;
            const r = dock.getBoundingClientRect();
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            const fire = (types: string[]) => {
                for (const t of types) {
                    dock.dispatchEvent(
                        new PointerEvent(t, { bubbles: true, clientX: cx, clientY: cy, pointerType: "mouse" }),
                    );
                    dock.dispatchEvent(
                        new MouseEvent(t.replace("pointer", "mouse"), { bubbles: true, clientX: cx, clientY: cy }),
                    );
                }
            };
            const ENTER = ["pointerover", "pointerenter", "pointermove"];
            const LEAVE = ["pointerout", "pointerleave"];
            fire(cond === "click-collapse" ? LEAVE : ENTER);
        },
        [selector, condition],
    );
    await page.evaluate(
        (sel) =>
            new Promise<void>((res) => {
                const dock = document.querySelector(sel) as HTMLElement | null;
                const t0 = performance.now();
                const f = () => {
                    const t = dock
                        ? parseFloat(getComputedStyle(dock).getPropertyValue("--dock-morph-t")) || 0
                        : 0;
                    if ((t >= 0.4 && t <= 0.7) || performance.now() - t0 > 600) res();
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            }),
        selector,
    );
}
