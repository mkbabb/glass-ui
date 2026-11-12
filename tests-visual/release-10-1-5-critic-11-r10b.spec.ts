// critic round 11 re-runs this round-10 file on the fix-10 tip, banking to critic-11/r10/ (a copy of release-10-1-5-critic-10b.spec.ts).
// glass-ui 10.1.5 — critic round 10 re-runs critic round 9.s cells (output to critic-11/r10/c9cells/) (docs/release-10.1.5/critique-9.md): attacks on fix round 8
// (critique 8 N1: the vertical yield is the expanded run's reading at rest, held through every morph).
// Harness `release-10-1-5/critic-7{,-v1014}.html`. Rows bank to
// `docs/release-10.1.5/critic-9/probe/<arm>/<project>/<cell>.json`; probes never fail on a finding.
//   c9a the fit band (vertical): the run's padding and flag across an expand, a collapse and a mid-morph reversal
//   c9b a held reading gone stale: the port crosses the fit edge while collapsed, then the dock expands
//       (vertical by the stage's block size, horizontal by the dock's max inline size), both directions
//   c9c the port crosses the fit edge mid-expand, and at rest expanded (the observer path)
//   c9d a horizontal fitting dock: S1 and the plate's corners across an expand and a collapse
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const ARM = process.env.CRITIC_ARM ?? "";
const OUT = new URL(`../docs/release-10.1.5/critic-11/r10/c9cells/${process.env.CRITIC_LABEL || ARM || "branch"}/`, import.meta.url).pathname;

function bank(name: string, rows: unknown): void {
    const d = `${OUT}${test.info().project.name}`;
    mkdirSync(d, { recursive: true });
    writeFileSync(`${d}/${name}.json`, JSON.stringify(rows, null, 1));
}

async function open(page: Page, q: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-7${ARM ? "-" + ARM : ""}.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
}

type Frame = {
    t: number; morphing: boolean; collapsed: boolean; fits: boolean; fullActive: boolean;
    s1?: number; sN?: number; pad: string; sl: number; st: number; sw: number; cw: number; sh: number; ch: number;
    radii: string[]; half: number; room: string;
};

/** Trace every frame for `ms`, running `plan` ([at ms, action]) inside the page. Actions: expand, collapse,
 *  stage:<px> (the vertical stage's block size), maxw:<px|none> (the dock's max inline size). */
function trace(page: Page, ms: number, plan: [number, string][], last: string): Promise<Frame[]> {
    return page.evaluate(
        ({ ms, plan, last }) =>
            new Promise<Frame[]>((res) => {
                const out: Frame[] = [];
                const t0 = performance.now();
                const todo = [...plan];
                const act = (a: string) => {
                    const w = window as unknown as { __dock: { expand(): void; collapse(): void } };
                    const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                    if (a === "expand") w.__dock.expand();
                    else if (a === "collapse") w.__dock.collapse();
                    else if (a.startsWith("stage:"))
                        document.querySelector<HTMLElement>('[data-witness="stage"]')!.style.blockSize = a.slice(6) + "px";
                    else if (a.startsWith("maxw:"))
                        dock.style.maxInlineSize = a.slice(5) === "none" ? "" : a.slice(5) + "px";
                };
                const tick = () => {
                    const t = performance.now() - t0;
                    while (todo.length && todo[0]![0] <= t) act(todo.shift()![1]);
                    const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                    const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
                    const run = dock.querySelector<HTMLElement>(".dock-run")!;
                    const v = dock.classList.contains("vertical");
                    const a = document.querySelector<HTMLElement>('[data-witness="S1"]')?.getBoundingClientRect();
                    const b = document.querySelector<HTMLElement>(`[data-witness="${last}"]`)?.getBoundingClientRect();
                    const pcs = getComputedStyle(plate);
                    out.push({
                        t: Math.round(t),
                        morphing: dock.hasAttribute("data-morphing"),
                        collapsed: dock.classList.contains("collapsed"),
                        fits: dock.hasAttribute("data-run-fits"),
                        fullActive: run.classList.contains("is-active"),
                        s1: a && +(v ? a.top : a.left).toFixed(2),
                        sN: b && +(v ? b.bottom : b.right).toFixed(2),
                        pad: getComputedStyle(run).padding,
                        sl: Math.round(run.scrollLeft), st: Math.round(run.scrollTop),
                        sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight,
                        radii: [pcs.borderTopLeftRadius, pcs.borderTopRightRadius, pcs.borderBottomRightRadius, pcs.borderBottomLeftRadius],
                        half: Math.min(plate.offsetWidth, plate.offsetHeight) / 2,
                        room: dock.style.getPropertyValue("--dock-run-room-block"),
                    });
                    if (t < ms) requestAnimationFrame(tick);
                    else res(out);
                };
                requestAnimationFrame(tick);
            }),
        { ms, plan, last },
    );
}

/** The rest state after a trace, and whether the flag is the layout's truth. */
function rest(f: Frame, vertical: boolean) {
    const over = vertical ? f.sh > f.ch : f.sw > f.cw;
    const uniform = f.radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - f.half) <= 0.5);
    return { fits: f.fits, scrolls: over, flagTrue: f.fits === !over, uniform, radii: f.radii, pad: f.pad, room: f.room, sl: f.sl, st: f.st };
}

/** The largest frame-to-frame step of S1 and sN across the frames where neither is morphing (rest), and across the
 *  morph's edges (the last morph frame to the first rest frame, the last rest frame to the first morph frame). */
function edges(fr: Frame[]) {
    const out: { at: number; kind: string; d1: number; dN: number; pad: [string, string] }[] = [];
    for (let i = 1; i < fr.length; i += 1) {
        const p = fr[i - 1]!;
        const c = fr[i]!;
        if (p.morphing === c.morphing) continue;
        if (!c.fullActive && !p.fullActive) continue;
        out.push({
            at: c.t, kind: p.morphing ? "settle" : "start",
            d1: +Math.abs((c.s1 ?? 0) - (p.s1 ?? 0)).toFixed(2), dN: +Math.abs((c.sN ?? 0) - (p.sN ?? 0)).toFixed(2),
            pad: [p.pad, c.pad],
        });
    }
    let restStep = 0;
    for (let i = 1; i < fr.length; i += 1) {
        const p = fr[i - 1]!;
        const c = fr[i]!;
        if (p.morphing || c.morphing || !p.fullActive || !c.fullActive || p.collapsed || c.collapsed) continue;
        restStep = Math.max(restStep, Math.abs((c.s1 ?? 0) - (p.s1 ?? 0)));
    }
    const pads = [...new Set(fr.filter((f) => f.fullActive || f.morphing).map((f) => f.pad))];
    const flags = fr.reduce<{ t: number; fits: boolean; morphing: boolean }[]>((acc, f) => {
        if (!acc.length || acc.at(-1)!.fits !== f.fits) acc.push({ t: f.t, fits: f.fits, morphing: f.morphing });
        return acc;
    }, []);
    return { edges: out, restStep: +restStep.toFixed(2), pads, flags };
}

const SIX = "icon,icon,icon,icon,icon,icon";

for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`c9 ${pointer}`, () => {
        if (pointer === "coarse") test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
        const park = async (page: Page) => {
            if (pointer === "fine") await page.mouse.move(2, 790);
        };

        /* ── c9a · the fit band: expand, collapse, reversal ─────────────────────── */
        test(`c9a vertical fit band ${pointer}`, async ({ page }) => {
            test.setTimeout(400_000);
            if (pointer === "fine") await page.setViewportSize({ width: 1440, height: 800 });
            const rows: unknown[] = [];
            for (let stageH = 308; stageH <= 356; stageH += 4) {
                await open(page, `scene=dock&collapse=closed&orientation=vertical&stageH=${stageH}&kinds=${SIX}`);
                await park(page);
                // Expand, rest, collapse, rest.
                const a = await trace(page, 2600, [[30, "expand"], [1300, "collapse"]], "S6");
                // Expand, reverse at 90 ms, reverse again at 200 ms.
                const b = await trace(page, 2400, [[30, "expand"], [120, "collapse"], [230, "expand"]], "S6");
                rows.push({
                    stageH,
                    plain: { ...edges(a), atRest: rest(a.find((f, i) => f.t > 1000 && !f.morphing && a[i - 1] && !a[i - 1]!.morphing) ?? a[0]!, true), end: rest(a.at(-1)!, true) },
                    reversal: { ...edges(b), end: rest(b.at(-1)!, true) },
                });
            }
            bank(`c9a-${pointer}`, rows);
        });

        /* ── c9b · a held reading gone stale across a collapse ─────────────────── */
        test(`c9b stale held reading ${pointer}`, async ({ page }) => {
            test.setTimeout(400_000);
            if (pointer === "fine") await page.setViewportSize({ width: 1440, height: 800 });
            const rows: unknown[] = [];
            // Vertical: fits at 600, overflows at 300; the stage changes while collapsed.
            for (const [from, to] of [[600, 300], [300, 600], [600, 340], [340, 600]] as const) {
                await open(page, `scene=dock&collapse=closed&orientation=vertical&stageH=${from}&kinds=${SIX}`);
                await park(page);
                await trace(page, 1300, [[30, "expand"]], "S6");
                const restA = await trace(page, 60, [], "S6");
                await trace(page, 1300, [[30, "collapse"]], "S6");
                await trace(page, 400, [[30, `stage:${to}`]], "S6");
                const fr = await trace(page, 1600, [[30, "expand"]], "S6");
                const firstMorph = fr.find((f) => f.morphing);
                rows.push({
                    axis: "vertical", from, to,
                    restFrom: rest(restA.at(-1)!, true),
                    firstMorph: firstMorph && { fits: firstMorph.fits, pad: firstMorph.pad, sh: firstMorph.sh, ch: firstMorph.ch, room: firstMorph.room },
                    ...edges(fr),
                    end: rest(fr.at(-1)!, true),
                });
            }
            // Horizontal: the dock's max inline size crosses its natural width while collapsed.
            const wide = encodeURIComponent("tab:Home,icon,icon,icon,icon,icon,icon,tab:Settings");
            for (const [from, to] of [["none", "220"], ["220", "none"]] as const) {
                await open(page, `scene=dock&collapse=closed&kinds=${wide}`);
                await park(page);
                await trace(page, 60, [[0, `maxw:${from}`]], "S8");
                await trace(page, 1300, [[30, "expand"]], "S8");
                const restA = await trace(page, 60, [], "S8");
                await trace(page, 1300, [[30, "collapse"]], "S8");
                await trace(page, 400, [[30, `maxw:${to}`]], "S8");
                const fr = await trace(page, 1600, [[30, "expand"]], "S8");
                const firstMorph = fr.find((f) => f.morphing);
                rows.push({
                    axis: "horizontal", from, to,
                    restFrom: rest(restA.at(-1)!, false),
                    firstMorph: firstMorph && { fits: firstMorph.fits, pad: firstMorph.pad, sw: firstMorph.sw, cw: firstMorph.cw },
                    ...edges(fr),
                    end: rest(fr.at(-1)!, false),
                });
            }
            bank(`c9b-${pointer}`, rows);
        });

        /* ── c9c · the port crosses the fit edge mid-expand, and at rest ───────── */
        test(`c9c fit edge crossed mid-morph and at rest ${pointer}`, async ({ page }) => {
            test.setTimeout(300_000);
            if (pointer === "fine") await page.setViewportSize({ width: 1440, height: 800 });
            const rows: unknown[] = [];
            for (const [from, to] of [[600, 300], [300, 600]] as const) {
                await open(page, `scene=dock&collapse=closed&orientation=vertical&stageH=${from}&kinds=${SIX}`);
                await park(page);
                const fr = await trace(page, 1800, [[30, "expand"], [110, `stage:${to}`]], "S6");
                rows.push({ cell: "mid-expand", axis: "vertical", from, to, ...edges(fr), end: rest(fr.at(-1)!, true) });
                // At rest expanded: back across the edge, then back again.
                const back = await trace(page, 700, [[30, `stage:${from}`]], "S6");
                const again = await trace(page, 700, [[30, `stage:${to}`]], "S6");
                rows.push({ cell: "rest-cross", axis: "vertical", from, to, back: rest(back.at(-1)!, true), again: rest(again.at(-1)!, true) });
            }
            const wide = encodeURIComponent("tab:Home,icon,icon,icon,icon,icon,icon,tab:Settings");
            for (const [from, to] of [["none", "220"], ["220", "none"]] as const) {
                await open(page, `scene=dock&collapse=closed&kinds=${wide}`);
                await park(page);
                await trace(page, 60, [[0, `maxw:${from}`]], "S8");
                const fr = await trace(page, 1800, [[30, "expand"], [110, `maxw:${to}`]], "S8");
                rows.push({ cell: "mid-expand", axis: "horizontal", from, to, ...edges(fr), end: rest(fr.at(-1)!, false) });
                const back = await trace(page, 700, [[30, `maxw:${from}`]], "S8");
                const again = await trace(page, 700, [[30, `maxw:${to}`]], "S8");
                rows.push({ cell: "rest-cross", axis: "horizontal", from, to, back: rest(back.at(-1)!, false), again: rest(again.at(-1)!, false) });
            }
            bank(`c9c-${pointer}`, rows);
        });

        /* ── c9d · a horizontal fitting dock across its morph edges ────────────── */
        test(`c9d horizontal morph edges ${pointer}`, async ({ page }) => {
            test.setTimeout(300_000);
            const rows: unknown[] = [];
            for (const width of pointer === "fine" ? [1440, 844] : [390, 320]) {
                await page.setViewportSize({ width, height: 800 });
                for (const kinds of ["tab:Home,icon,icon,icon", "tab:Home,icon,sep,slider,icon,icon,dmt"]) {
                    await open(page, `scene=dock&collapse=closed&kinds=${encodeURIComponent(kinds)}`);
                    await park(page);
                    const last = `S${kinds.split(",").length}`;
                    const a = await trace(page, 2600, [[30, "expand"], [1300, "collapse"]], last);
                    rows.push({ width, kinds, ...edges(a), end: rest(a.at(-1)!, false), expandedRest: rest(a.filter((f) => f.t < 1300 && !f.morphing && !f.collapsed).at(-1) ?? a[0]!, false) });
                }
            }
            bank(`c9d-${pointer}`, rows);
        });
    });
}

/* ── c9e · the host resizes mid-expand: the frames around the settle, banked raw ─────────────────── */
for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`c9e ${pointer}`, () => {
        if (pointer === "coarse") test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
        test(`c9e host resize mid-expand ${pointer}`, async ({ page }) => {
            test.setTimeout(300_000);
            if (pointer === "fine") await page.setViewportSize({ width: 1440, height: 800 });
            const rows: unknown[] = [];
            const around = (fr: Frame[]) => {
                const i = fr.findIndex((f, k) => k > 0 && fr[k - 1]!.morphing && !f.morphing);
                return { settleAt: i, frames: fr.slice(Math.max(0, i - 4), i + 4).map((f) => ({ t: f.t, m: f.morphing, fits: f.fits, s1: f.s1, sN: f.sN, pad: f.pad, sl: f.sl, st: f.st, sw: f.sw, cw: f.cw, sh: f.sh, ch: f.ch, r: f.radii.join(" ") })) };
            };
            const wide = encodeURIComponent("tab:Home,icon,icon,icon,icon,icon,icon,tab:Settings");
            const narrow = pointer === "fine" ? "560" : "300";
            for (const at of [110, 300]) {
                await open(page, `scene=dock&collapse=closed&kinds=${wide}`);
                if (pointer === "fine") await page.mouse.move(2, 790);
                const fr = await trace(page, 1800, [[30, "expand"], [at, "maxw:220"]], "S8");
                rows.push({ cell: "h-to-220", at, ...edges(fr), ...around(fr) });
                await open(page, `scene=dock&collapse=closed&kinds=${encodeURIComponent("tab:Home,icon,icon,icon")}`);
                if (pointer === "fine") await page.mouse.move(2, 790);
                const g = await trace(page, 1800, [[30, "expand"], [at, `maxw:${narrow === "560" ? "200" : "200"}`]], "S4");
                rows.push({ cell: "h4-to-200", at, ...edges(g), ...around(g) });
                const band = pointer === "fine" ? 320 : 344;
                await open(page, `scene=dock&collapse=closed&orientation=vertical&stageH=600&kinds=${SIX}`);
                if (pointer === "fine") await page.mouse.move(2, 790);
                const v = await trace(page, 1800, [[30, "expand"], [at, `stage:${band}`]], "S6");
                rows.push({ cell: `v-to-${band}`, at, ...edges(v), ...around(v) });
            }
            bank(`c9e-${pointer}`, rows);
        });
    });
}

/* ── c9f · a layered dock's first expand from a closed mount, repeated (the c8b layers-1440 WebKit row) ── */
for (const pointer of ["fine", "coarse"] as const) {
    test.describe(`c9f ${pointer}`, () => {
        if (pointer === "coarse") test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
        test(`c9f layered first expand ${pointer}`, async ({ page }) => {
            test.setTimeout(400_000);
            const rows: unknown[] = [];
            for (const width of [1440, 390])
                for (let i = 0; i < 8; i += 1) {
                    await page.setViewportSize({ width, height: 800 });
                    await open(page, "scene=layers&collapse=closed&maxw=260");
                    if (pointer === "fine") await page.mouse.move(2, 790);
                    const fr = await trace(page, 1400, [[30, "expand"]], "S9");
                    const f = fr.at(-1)!;
                    const plate = await page.evaluate(() => {
                        const p = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                        const d = document.querySelector<HTMLElement>(".glass-dock")!;
                        return { w: p.offsetWidth, exp: d.style.getPropertyValue("--dock-expanded-px"), layer: (window as unknown as { __layer: { value: string } }).__layer.value };
                    });
                    rows.push({ width, i, plate, ...rest(f, false), sw: f.sw, cw: f.cw, flags: edges(fr).flags });
                }
            bank(`c9f-${pointer}`, rows);
        });
    });
}
