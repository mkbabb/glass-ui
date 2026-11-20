// Reads ../data/<engine>-*.json and prints each cell's gate numbers (and writes
// ../data/summary-<engine>.json).   node analyze.mjs <engine>
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DATA = join(dirname(fileURLToPath(import.meta.url)), "..", "data");
const engine = process.argv[2];
const files = readdirSync(DATA).filter((f) => f.startsWith(engine + "-") && f.endsWith(".json"));
const ty = (t) => { if (!t || t === "none") return 0; const p = t.split(/\s+/); return p.length > 1 ? parseFloat(p[1]) : 0; };
const r2 = (x) => (x == null || !isFinite(x) ? null : +x.toFixed(2));

function gates(d) {
    const L = d.layout, S = L.S;
    const g = {};
    // COVER + READ
    const runs = {};
    for (const st of d.coverSteps) for (const c of st.covers) for (const r of c.runs ?? []) if (r) {
        const k = `${c.si}:${r.ri}`;
        const a = (runs[k] ??= { si: c.si, text: r.text.slice(0, 12), depth: r.depth, fs: r.fontSize, maxCover: 0, minCover: 1, cMin: Infinity, low: 0, n: 0 });
        a.maxCover = Math.max(a.maxCover, r.cover); a.minCover = Math.min(a.minCover, r.cover); a.n++;
        if (r.cMin != null) a.cMin = Math.min(a.cMin, r.cMin);
        a.low = Math.max(a.low, r.lowShare ?? 0);
    }
    const R = Object.values(runs);
    const behind = R.filter((r) => r.depth === "behind"), front = R.filter((r) => r.depth === "front");
    g.cover = {
        behindMax: r2(Math.max(0, ...behind.map((r) => r.maxCover))),
        behindUnder: behind.every((r) => r.maxCover > 0),
        frontMax: r2(Math.max(0, ...front.map((r) => r.maxCover))),
        smallCovered: behind.filter((r) => r.maxCover > 0 && r.fs < 40).length,
        runs: R.map((r) => `${r.text}:${r.depth[0]}:${r2(r.minCover)}-${r2(r.maxCover)}`),
    };
    g.cover.pass = g.cover.behindMax <= 0.25 && g.cover.frontMax === 0 && g.cover.smallCovered === 0 && g.cover.behindUnder;
    g.read = { min: r2(Math.min(...R.map((r) => r.cMin))), worst: R.reduce((a, r) => (r.cMin < (a?.cMin ?? Infinity) ? r : a), null)?.text, lowShare: r2(Math.max(...R.map((r) => r.low))) };
    g.read.pass = g.read.min >= 4.5;

    // RATE + ENDS + FLOW
    const textDev = [], sceneDev = [], lagRows = [], winDev = [];
    let maxJump = 0, endBelow = null, endAbove = null, atZero = null;
    const flowW = d.steps.every((s) => s.scrollWidth === s.clientWidth);
    const heights = new Set(d.steps.map((s) => s.scrollHeight));
    for (let i = 1; i < d.steps.length; i++) {
        const a = d.steps[i - 1], b = d.steps[i], ds = b.sy - a.sy;
        if (ds <= 0) continue;
        b.scenes.forEach((sb, si) => {
            const sa = a.scenes[si];
            const rate = (ya, yb) => (-(yb - ya) / ds) * 100;
            sceneDev.push(Math.abs(rate(sa.top, sb.top) - 100));
            sb.runs.forEach((y, ri) => textDev.push(Math.abs(rate(sa.runs[ri], y) - 100)));
            const meta = L.scenes[si];
            if (!meta.lag || !sb.lag) return;
            const H = meta.rect.height, top = meta.rect.top;
            const lag = parseFloat(meta.depthLagVar) || 0.125;
            const T = lag * Math.min(0.5 * S, 0.5 * meta.inline);
            const p = (sy) => (sy + S - top) / (S + H);
            const oa = ty(sa.lag.translate), ob = ty(sb.lag.translate);
            maxJump = Math.max(maxJump, Math.abs(ob - oa));
            if (meta.lag.within) winDev.push(Math.abs(rate(sa.fig, sb.fig) - 100));
            if (p(a.sy) >= 0 && p(b.sy) <= 1) {
                const exp = 100 * (1 - (2 * T) / (S + H));
                lagRows.push({ si, rate: rate(sa.lag.y, sb.lag.y), exp, T, step: (2 * T * ds) / (S + H) });
            }
        });
    }
    // ends: offsets with the scene wholly below / above the viewport, and at scroll 0
    for (const s of d.steps) s.scenes.forEach((sc, si) => {
        const meta = L.scenes[si];
        if (!meta.lag || !sc.lag) return;
        const H = meta.rect.height, top = meta.rect.top;
        const lag = parseFloat(meta.depthLagVar) || 0.125;
        const T = lag * Math.min(0.5 * S, 0.5 * meta.inline);
        const off = ty(sc.lag.translate);
        if (top - s.sy >= S && endBelow == null) endBelow = { si, off: r2(off), T: r2(-T) };
        if (top + H <= s.sy) endAbove = { si, off: r2(off), T: r2(T) };
        if (s.sy === 0 && si === 0) atZero = { off: r2(off), exp: r2(-T + 2 * T * ((S - top) / (S + H))) };
    });
    const lagDev = lagRows.map((r) => Math.abs(r.rate - r.exp));
    const minLagRate = Math.min(...lagRows.map((r) => r.rate));
    g.rate = {
        textMaxDev: r2(Math.max(0, ...textDev)), sceneMaxDev: r2(Math.max(0, ...sceneDev)), windowMaxDev: r2(Math.max(0, ...winDev)),
        lag: [...new Set(lagRows.map((r) => r.si))].map((si) => { const rs = lagRows.filter((r) => r.si === si); return { si, T: r2(rs[0].T), exp: r2(rs[0].exp), min: r2(Math.min(...rs.map((r) => r.rate))), max: r2(Math.max(...rs.map((r) => r.rate))), n: rs.length }; }),
        lagMaxDev: r2(Math.max(0, ...lagDev)), lagMin: r2(minLagRate),
    };
    const still = d.cell.reduce && !d.bite ? true : d.cell.reduce || d.cell.mask || d.query?.includes("still=1") || !d.support?.view;
    g.rate.pass = g.rate.textMaxDev <= 0.5 && g.rate.sceneMaxDev <= 0.5 && g.rate.windowMaxDev <= 0.5 && (still ? lagRows.every((r) => Math.abs(r.rate - 100) <= 0.5) : g.rate.lagMaxDev <= 1 && g.rate.lagMin >= 87.5);
    const stepAllow = Math.max(0, ...lagRows.map((r) => r.step));
    g.ends = { maxJump: r2(maxJump), allow: r2(stepAllow + 1), below: endBelow, above: endAbove, atZero };
    g.ends.pass = still ? maxJump === 0 : maxJump <= stepAllow + 1 && (!endBelow || Math.abs(endBelow.off - endBelow.T) <= 1) && (!endAbove || Math.abs(endAbove.off - endAbove.T) <= 1) && (!atZero || Math.abs(atZero.off - atZero.exp) <= 1);
    g.flow = { noHScroll: flowW, heights: [...heights] };
    g.flow.pass = flowW && heights.size === 1;

    // STILL
    const sceneAnims = (d.animations ?? []).filter((a) => a.inScene);
    g.anims = sceneAnims.map((a) => `${a.scene}:${a.props.join("+")}`);
    if (still) {
        const pic = L.scenes.find((s) => s.lag?.within);
        g.still = { anims: sceneAnims.length, maxOffset: r2(Math.max(0, ...d.steps.flatMap((s) => s.scenes.map((sc) => Math.abs(ty(sc.lag?.translate)))))), picEqWindow: pic ? Math.abs(pic.lag.rect.height - pic.fig.height) < 0.5 : null };
        g.still.pass = g.still.anims === 0 && g.still.maxOffset === 0 && g.still.picEqWindow !== false && g.rate.pass;
    }

    // NAME + SELECT
    const heroAria = d.name?.[0]?.aria ?? "";
    const dupText = d.dom.some((s) => new Set(s.textNodes).size !== s.textNodes.length) || d.dom.some((s) => s.dupBlocks.length);
    g.name = { hero: heroAria.split("\n")[0], ariaHidden: d.dom.flatMap((s) => s.ariaHidden), dupText };
    g.name.pass = /heading "Liquid glass"/.test(heroAria) && !g.name.ariaHidden.length && !dupText;
    g.select = { all: d.dom.map((s) => s.selectAll), drag: d.select?.drag, triple: d.select?.triple };
    const onceEach = d.dom.every((s) => s.textNodes.every((t) => s.selectAll.split(t).length - 1 === 1));
    g.select.pass = onceEach && d.select?.drag === "Liquid glass" && d.select?.triple === "Liquid";

    // RESTRAINT
    const rs = d.restraint;
    g.restraint = { lagPerScene: rs.lagPerScene, lagOnText: rs.lagOnText, badPlacement: rs.badPlacement, lagValues: [...new Set(rs.lagValues)], elements: d.dom.map((s) => s.elements) };
    g.restraint.pass = rs.lagPerScene.every((n) => n <= 1) && rs.lagOnText === 0 && rs.badPlacement === 0 && g.restraint.lagValues.length === 1;
    return g;
}

const summary = {};
for (const f of files.sort()) {
    const d = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    if (!d.layout) continue;
    const g = gates(d);
    summary[f.replace(/\.json$/, "")] = { support: d.support, ua: d.ua, errors: d.errors, wheelFallback: d.wheelFallback ?? 0, maskReplacements: d.maskReplacements, ...g };
    const v = (k) => (g[k] ? (g[k].pass ? "ok" : "RED") : "-");
    console.log(f.padEnd(52), "view", d.support?.view ? 1 : 0,
        "| COVER", v("cover"), g.cover.behindMax, g.cover.frontMax,
        "| READ", v("read"), g.read.min, g.read.worst,
        "| RATE", v("rate"), g.rate.textMaxDev, JSON.stringify(g.rate.lag.map((l) => [l.si, l.T, l.exp, l.min, l.max])),
        "| ENDS", v("ends"), g.ends.maxJump, "/", g.ends.allow, JSON.stringify([g.ends.below?.off, g.ends.below?.T, g.ends.above?.off, g.ends.above?.T, g.ends.atZero?.off, g.ends.atZero?.exp]),
        "| STILL", v("still"), "| NAME", v("name"), "| SEL", v("select"), JSON.stringify([g.select.drag, g.select.triple]),
        "| FLOW", v("flow"), g.flow.heights.join("/"), "| RESTR", v("restraint"), JSON.stringify(g.restraint.lagPerScene));
}
writeFileSync(join(DATA, `summary-${engine}.json`), JSON.stringify(summary, null, 1));
