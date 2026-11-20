// motion.mjs <tree> <engine> <cellset> [spec ...]
// For each spec (specs.mjs): a calibration run (forward to rest, backward to rest) that
// gives the travel, the frame budget of the open and the close, and the animations that
// ran; then reversals: the backward action fired at 25, 50 and 75 % of the forward travel,
// and the forward action fired at 25, 50 and 75 % of the backward travel. Every rendered
// frame is sampled (harness sampler). Writes logs/motion/<tree>.<engine>.<cellset>.json.
//
// cellsets: fine = 1440x900 mouse; touch390 = 390x844 touch; t4x390 / t4x360 = phone touch
// at a 4x CPU throttle (Chromium); calibration plus the 50 % reversal only under throttle.
import { withBrowser, cell, gotoComp, rec, mark, stop, waitFraction, settle, series, frameStats, motionWindow, reversal, animsSummary, save, sleep } from "./lib.mjs";
import { act } from "./act.mjs";
import { SPECS } from "./specs.mjs";

const [tree = "11.1.0", engine = "chromium", cellset = "fine", ...only] = process.argv.slice(2);
const CELLS = {
    fine: { w: 1440, h: 900 },
    touch390: { w: 390, h: 844, touch: true },
    t4x390: { w: 390, h: 844, touch: true, throttle: 4 },
    t4x360: { w: 360, h: 780, touch: true, throttle: 4 },
};
const C = CELLS[cellset];
const throttled = !!C.throttle;
const FR = throttled ? [0.5] : [0.25, 0.5, 0.75];
const specs = SPECS.filter((s) => s.name !== "dock-layer" && (!only.length || only.includes(s.name)) && !(C.touch && s.fine));
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { LT } from "./lib.mjs";
const OUTF = join(LT, `logs/motion/${tree}.${engine}.${cellset}.json`);
const out = existsSync(OUTF) ? JSON.parse(readFileSync(OUTF, "utf8")) : { tree, engine, cellset, cell: C, results: [] };
out.at = new Date().toISOString();

function quietMs(spec) {
    return spec.settleMs || 450;
}

async function prepare(P, spec) {
    await gotoComp(P, tree, spec.page);
    await P.page.waitForSelector(spec.ready, { timeout: 10000, state: "attached" });
    const tsel = spec.fwd && (spec.fwd.click || spec.fwd.tap || spec.fwd.hover);
    if (tsel) await P.page.evaluate((s) => { const e = document.querySelector(s); if (!e) return; const r = e.getBoundingClientRect(); if (r.top < 0 || r.bottom > innerHeight || r.left < 0 || r.right > innerWidth) e.scrollIntoView({ block: "center", inline: "center" }); }, tsel);
    if (spec.before) await act(P, spec.before);
    await sleep(400);
    if (throttled) await P.throttle(C.throttle);
}

async function runSpec(b, spec) {
    const r = { name: spec.name, page: spec.page, ch: spec.ch };
    // calibration
    await cell(b, engine, C, async (P) => {
        await prepare(P, spec);
        await rec(P, spec.track);
        await sleep(120);
        await mark(P, "fwd");
        await act(P, spec.fwd);
        await settle(P, quietMs(spec), spec.settleMax || 5000, true, spec.settleMax ? 5000 : 1500);
        await mark(P, "back");
        await act(P, spec.back);
        await settle(P, quietMs(spec), spec.settleMax || 5000, true, spec.settleMax ? 5000 : 1500);
        const res = await stop(P);
        const s = series(res, "el", spec.ch);
        const kf = s.findIndex((x) => x.marks.includes("fwd"));
        const kb = s.findIndex((x) => x.marks.includes("back"));
        const fwdS = s.slice(kf, kb),
            backS = s.slice(kb);
        const fin = (arr) => arr.map((x) => x.v).filter(Number.isFinite);
        const fv = fin(fwdS);
        const from = spec.open ? spec.open.from : fv[0];
        const to = spec.open ? spec.open.to : fv[fv.length - 1];
        const wF = motionWindow(fwdS),
            wB = motionWindow(backS);
        r.from = from;
        r.to = to;
        r.fwd = wF && { ms: wF.ms, startDelayMs: +(fwdS[wF.a].t - s[kf].t).toFixed(1), stats: frameStats(res, s[kf].t, fwdS[wF.b].t + 1) };
        r.back = wB && { ms: wB.ms, startDelayMs: +(backS[wB.a].t - s[kb].t).toFixed(1), stats: frameStats(res, s[kb].t, backS[wB.b].t + 1) };
        r.anims = animsSummary(res);
        r.fwdT = s[kf].t;
        r.backT = s[kb].t;
        r.long = res.long.length;
        r.loaf = res.loaf.filter((l) => l.dur > 50).map((l) => ({ start: l.start, dur: +l.dur.toFixed(1), scripts: l.scripts.map((x) => x.src + " " + x.dur.toFixed(0)).slice(0, 2) }));
        r.errors = P.errors.slice(0, 5);
        save(`logs/motion/rows/${spec.name}.${tree}.${engine}.${cellset}.calib.json`, { from, to, rows: res.rows.map((x) => ({ i: x.i, t: x.t, m: x.marks, v: x.el.el ? { x: x.el.el.x, y: x.el.el.y, w: x.el.el.w, h: x.el.el.h, op: x.el.el.op, eop: x.el.el.eop, sc: x.el.el.sc, tr: x.el.el.tr, tf: x.el.el.tf, clip: x.el.el.clip, ch: series({ rows: [x] }, "el", spec.ch)[0].v } : null, o: Object.fromEntries(Object.entries(x.el).filter(([k]) => k !== "el").map(([k, v]) => [k, v && { x: v.x, y: v.y, w: v.w, h: v.h, op: v.op, eop: v.eop, p: Object.fromEntries(Object.entries(v).filter(([kk]) => kk.startsWith("p:"))) }])) })) });
    });
    if (process.env.CALIB_ONLY) {
        const old = out.results.find((x) => x.name === r.name);
        r.reversals = old ? old.reversals : { error: "calibration only" };
        return r;
    }
    if (!Number.isFinite(r.from) || !Number.isFinite(r.to) || Math.abs(r.to - r.from) < 1e-3) {
        r.reversals = { error: `no travel (from ${r.from} to ${r.to})` };
        return r;
    }
    // reversals
    r.reversals = [];
    for (const dir of ["open", "close"]) {
        for (const f of FR) {
            await cell(b, engine, C, async (P) => {
                await prepare(P, spec);
                if (dir === "close") {
                    await act(P, spec.fwd);
                    await sleep(1200);
                }
                await rec(P, spec.track);
                await sleep(100);
                await mark(P, "go");
                await act(P, dir === "open" ? spec.fwd : spec.back);
                const w = await waitFraction(P, { sel: spec.track[0].sel, ch: spec.ch, from: dir === "open" ? r.from : r.to, to: dir === "open" ? r.to : r.from, fraction: f, maxMs: spec.waitMax || 3000 });
                const name = `rev-${dir}-${Math.round(f * 100)}`;
                await mark(P, name);
                await act(P, dir === "open" ? spec.back : spec.fwd);
                await settle(P, quietMs(spec), spec.settleMax || 5000, true, spec.settleMax ? 5000 : 1500);
                const res = await stop(P);
                const s = series(res, "el", spec.ch);
                const rv = reversal(s, name, 10, r.to - r.from);
                const k0 = s.findIndex((x) => x.marks.includes(name));
                const after = s.slice(k0, k0 + 40);
                rv.vanishes = after.some((x) => !Number.isFinite(x.v)) && after.slice(-1)[0] && Number.isFinite(after.slice(-1)[0].v);
                rv.reachedFraction = w;
                rv.endValue = +(s[s.length - 1].v ?? NaN);
                rv.stats = frameStats(res, s[k0]?.t ?? 0);
                r.reversals.push({ dir, f, ...rv });
                save(`logs/motion/rows/${spec.name}.${tree}.${engine}.${cellset}.${name}.json`, s.map((x) => [x.i, +x.t.toFixed(2), Number.isFinite(x.v) ? +x.v.toFixed(3) : null, x.marks.join(",")]));
            });
        }
    }
    return r;
}

await withBrowser(engine, async (b) => {
    for (const spec of specs) {
        let r;
        try {
            r = await runSpec(b, spec);
        } catch (e) {
            r = { name: spec.name, error: String(e.message || e).slice(0, 300) };
        }
        const had = out.results.find((x) => x.name === r.name);
        if (!(r.error && had && !had.error)) {
            out.results = out.results.filter((x) => x.name !== r.name);
            out.results.push(r);
        }
        const brief = { name: r.name, err: r.error, fwd: r.fwd && r.fwd.ms, back: r.back && r.back.ms, longest: r.fwd && r.fwd.stats.longestMs, rev: Array.isArray(r.reversals) ? r.reversals.map((x) => `${x.dir}${Math.round(x.f * 100)}:${x.verdict}${x.worst ? "(" + x.worst.ratio + ")" : ""}`).join(" ") : r.reversals };
        console.log(JSON.stringify(brief));
        save(`logs/motion/${tree}.${engine}.${cellset}.json`, out);
    }
});
