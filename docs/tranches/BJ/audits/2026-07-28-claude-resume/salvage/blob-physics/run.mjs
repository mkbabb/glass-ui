// run.mjs — the experiment battery. Every number in the GF-BLOB spec that is not a
// disk citation comes from here. Deterministic: seeds are stated, no wall clock.
import { writeFileSync } from "node:fs";
import * as S from "./sim.mjs";
import * as F from "./field.mjs";

const DT = 1 / 240;
const out = {};
const log = (...a) => console.log(...a);

// ─────────────────────────────────────────────────────────────────────────────
// E1 · THE SEPARATION LAW — measured against the shipped smin, both variants
// ─────────────────────────────────────────────────────────────────────────────
function e1() {
    const rows = [];
    for (const circular of [false, true]) {
        for (const k0 of [0.03, 0.045322, 0.05, 0.06, 0.08]) {
            for (const [R, r] of [[0.22, 0.10], [0.22, 0.136], [0.22, 0.082], [0.136, 0.136]]) {
                // bisect on gap for the CC transition 1 → 2
                let lo = 0, hi = 6 * k0 + 0.05;
                for (let it = 0; it < 40; it++) {
                    const g = (lo + hi) / 2;
                    const d = R + r + g;
                    const bodies = [{ x: -d / 2, y: 0, r: R }, { x: d / 2, y: 0, r }];
                    const c = F.components(bodies, k0, { grid: 480, extent: 0.75, minPx: 6, circular });
                    if (c.n >= 2) hi = g; else lo = g;
                }
                const gBreak = (lo + hi) / 2;
                rows.push({ variant: circular ? "circular" : "quadratic", k0, R, r,
                    gBreak: +gBreak.toFixed(5), ratio: +(gBreak / k0).toFixed(3) });
            }
        }
    }
    const ratios = rows.map((x) => x.ratio);
    out.E1 = { rows, ratioMin: Math.min(...ratios), ratioMax: Math.max(...ratios) };
    log("E1 break-gap/k0 ratio:", out.E1.ratioMin, "…", out.E1.ratioMax, "(n rows", rows.length, ")");
}

// ─────────────────────────────────────────────────────────────────────────────
// E2 · HEAD INDICTMENT — the shipped configs, painted
// ─────────────────────────────────────────────────────────────────────────────
function ringBodies({ R, r, a, count, infl = 0 }) {
    const b = [{ x: 0, y: 0, r: R }];
    for (let i = 0; i < count; i++) {
        const th = (i / count) * Math.PI * 2;
        b.push({ x: a * Math.cos(th), y: a * Math.sin(th), r: r - infl });
    }
    return b;
}
function e2() {
    const POS = 1 / 1.6;
    const cases = [
        { name: "DEFAULTS (types.ts:297-320)", R: 0.22, r: 0.082, a: 0.17, k0: 0.05, count: 3 },
        { name: "BLOB_HERO (presets.ts:57-64)", R: 0.22, r: 0.10, a: 0.30, k0: 0.06, count: 4 },
        { name: "HERO, max-separation slider (a=0.42)", R: 0.22, r: 0.10, a: 0.42, k0: 0.06, count: 4 },
    ];
    const rows = cases.map((c) => {
        // shipped inflation: satG.x += (1 − opacity)·0.3 in canvas-UV; BASE_OPACITY 0.75
        const inflUV = (1 - 0.75) * 0.3;              // 0.075 canvas-uv
        const rUV = c.r * POS, rEffUV = rUV - inflUV; // metaball.wgsl.ts:209
        const asIs = F.components(ringBodies({ ...c, infl: inflUV / POS }), c.k0, { grid: 384, extent: 0.8, minPx: 8 });
        const noInfl = F.components(ringBodies(c), c.k0, { grid: 384, extent: 0.8, minPx: 8 });
        const gap = c.a - (c.R + c.r);
        return { ...c, rUV: +rUV.toFixed(5), rEffUV: +rEffUV.toFixed(5),
            gap: +gap.toFixed(4), breakAt: +(2 * c.k0).toFixed(4),
            nWithInflation: asIs.n, nWithoutInflation: noInfl.n };
    });
    out.E2 = { rows, existenceThreshold: +((1 - 0.75) * 0.3 / (1 / 1.6)).toFixed(4) };
    log("E2:", rows.map((r) => `${r.name} n=${r.nWithInflation}/${r.nWithoutInflation}`).join(" | "));
}

// ─────────────────────────────────────────────────────────────────────────────
// The regime harness
// ─────────────────────────────────────────────────────────────────────────────
const LADDER = [0.135967, 0.120556, 0.106891]; // φ^(1/4) descending from R=0.22 (GF-BLOB PASS4 W1)

function solveG({ n, T0, a0, R }) {
    const w = (2 * Math.PI) / T0;
    return (w * w * Math.pow(a0, n + 1)) / Math.pow(R, 2);
}

function bonded(bodies, k0) {
    // union-find over pairwise gaps < 2k0 (the E1-verified law); returns component count
    const N = bodies.length;
    const p = [...Array(N).keys()];
    const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(bodies[i].x - bodies[j].x, bodies[i].y - bodies[j].y);
        if (d - bodies[i].r - bodies[j].r < 2 * k0) p[find(i)] = find(j);
    }
    return new Set([...Array(N).keys()].map(find)).size;
}

function runRegime(regime, opts) {
    const {
        seed = 1, T = 90, spec, P, sampleHz = 12, lyap = true, fieldCheck = 0,
    } = opts;
    const rng = S.mulberry32(seed);
    const bodies = S.makeTree(spec, rng);
    S.seedVelocities(bodies, P);
    const scratch = new Float64Array(bodies.length * 2);

    let twin = null, twinScratch = null, lsum = 0, lsteps = 0;
    const D0 = 1e-9;
    if (lyap && regime !== "A") {
        twin = S.cloneBodies(bodies);
        twin[1].x += D0;
        twinScratch = new Float64Array(bodies.length * 2);
    }

    const steps = Math.round(T / DT);
    const sampleEvery = Math.max(1, Math.round(1 / (sampleHz * DT)));
    const rec = { r: [], sep: [], nComp: [], t: [] };
    let wallHits = 0, escapes = 0, minR = Infinity, maxR = 0;
    const perSat = bodies.filter((b) => !b.fixed).map(() => ({ rs: [], apo: [], peri: [] }));
    let sepFrames = 0, frames = 0, breakEvents = 0, lastComp = 1;
    let fieldAgree = 0, fieldChecks = 0;
    let cenMax = 0;

    for (let s = 0; s < steps; s++) {
        const t = s * DT;
        if (regime === "A") S.kinematicA(bodies, P, t);
        else S.step(bodies, P, regime, t, DT, scratch);

        if (twin) {
            S.step(twin, P, regime, t, DT, twinScratch);
            if (s % 24 === 23) {
                const d = S.dist(S.stateVec(bodies), S.stateVec(twin));
                if (d > 0) {
                    lsum += Math.log(d / D0); lsteps++;
                    const sc = D0 / d;
                    for (let i = 1; i < twin.length; i++) {
                        twin[i].x = bodies[i].x + (twin[i].x - bodies[i].x) * sc;
                        twin[i].y = bodies[i].y + (twin[i].y - bodies[i].y) * sc;
                        twin[i].vx = bodies[i].vx + (twin[i].vx - bodies[i].vx) * sc;
                        twin[i].vy = bodies[i].vy + (twin[i].vy - bodies[i].vy) * sc;
                    }
                }
            }
        }

        if (s % sampleEvery === 0) {
            frames++;
            let k = 0;
            for (const b of bodies) {
                if (b.fixed) continue;
                const p = bodies[b.parent];
                const d = Math.hypot(b.x - p.x, b.y - p.y);
                perSat[k].rs.push(d);
                const abs = Math.hypot(b.x, b.y);
                if (abs + b.r > S.WALL) wallHits++;
                if (abs > S.WALL * 1.5) escapes++;
                minR = Math.min(minR, abs); maxR = Math.max(maxR, abs);
                k++;
            }
            let cx = 0, cy = 0, cm = 0;
            for (const b of bodies) { if (b.fixed) continue; cx += b.m * b.x; cy += b.m * b.y; cm += b.m; }
            cenMax = Math.max(cenMax, Math.hypot(cx / cm, cy / cm));
            const nc = bonded(bodies, P.k0);
            rec.nComp.push(nc);
            if (nc > 1) sepFrames++;
            if (nc > lastComp) breakEvents++;
            lastComp = nc;
            if (fieldCheck && frames % fieldCheck === 0) {
                const cc = F.components(bodies, P.k0, { grid: 224, extent: 0.95, minPx: 10 });
                fieldChecks++;
                if (cc.n === nc) fieldAgree++;
            }
        }
    }

    // eccentricity from the measured radial series, per satellite
    const eccs = perSat.map(({ rs }) => {
        const ex = [];
        for (let i = 1; i < rs.length - 1; i++) {
            if (rs[i] > rs[i - 1] && rs[i] >= rs[i + 1]) ex.push({ k: "a", v: rs[i] });
            if (rs[i] < rs[i - 1] && rs[i] <= rs[i + 1]) ex.push({ k: "p", v: rs[i] });
        }
        const A = ex.filter((z) => z.k === "a").map((z) => z.v);
        const Pp = ex.filter((z) => z.k === "p").map((z) => z.v);
        if (!A.length || !Pp.length) return 0;
        const mean = (z) => z.reduce((x, y) => x + y, 0) / z.length;
        const ma = mean(A), mp = mean(Pp);
        return (ma - mp) / (ma + mp);
    });
    const mean = (z) => z.reduce((x, y) => x + y, 0) / (z.length || 1);
    const rbar = perSat.map(({ rs }) => mean(rs));
    const entropy = mean(perSat.map(({ rs }) => S.spectralEntropy(rs)));
    const rMinPer = mean(perSat.map(({ rs }) => Math.min(...rs)));
    const rMaxPer = mean(perSat.map(({ rs }) => Math.max(...rs)));

    return {
        regime, seed,
        lambda: lsteps ? +(lsum / (lsteps * 24 * DT)).toFixed(4) : 0,
        wallHitPct: +((100 * wallHits) / (frames * perSat.length)).toFixed(2),
        escapes,
        sepDuty: +((100 * sepFrames) / frames).toFixed(1),
        breakEvents,
        breaksPerMin: +((breakEvents * 60) / T).toFixed(2),
        ecc: +mean(eccs).toFixed(3),
        eccSpread: +(Math.max(...eccs) - Math.min(...eccs)).toFixed(3),
        rBar: +mean(rbar).toFixed(4),
        rMax: +maxR.toFixed(4),
        fieldAgreePct: fieldChecks ? +((100 * fieldAgree) / fieldChecks).toFixed(1) : null,
        entropy: +entropy.toFixed(3),
        excursion: +(rMaxPer / Math.max(rMinPer, 1e-6)).toFixed(2),
        centroidMax: +cenMax.toFixed(4),
        collapsed: mean(rbar) < spec.R * 1.02,
    };
}

const HERO_SPEC = (over = {}) => ({
    R: 0.22, ladder: LADDER, count: 3, a: 0.50, ecc: 0.34, depth: 1, subPer: 0, subScale: 0.5, subOrbit: 1.9,
    massExp: 2, ...over,
});

function baseP(over = {}) {
    const n = over.n ?? 1.7;
    const T0 = over.T0 ?? 12;          // one colony orbit at the reference radius (s)
    const a0 = over.a ?? 0.50;
    const G = solveG({ n, T0, a0, R: 0.22 });
    const k0 = over.k0 ?? 0.045322;
    const rMaxTarget = over.rMaxTarget ?? 0.62;
    const mCore = 0.22 ** 2;
    // |ε| at the containment ceiling — the energy scale everything else is priced in
    const epsAbs = (G * mCore) / ((n - 1) * Math.pow(rMaxTarget, n - 1));
    const Bo = over.Bo ?? 0.35;        // BOND NUMBER: bridge work ÷ |ε| — the fission dial
    const sigma = (2 * Bo * epsAbs) / (2 * k0);
    return { ...S.DEFAULTS, n, G, k0, rMaxTarget, sigma, Bo, epsAbs, walled: false, ...over };
}

// ─────────────────────────────────────────────────────────────────────────────
// E3 · COORDINATED vs EMERGENT — the charter's open question
// ─────────────────────────────────────────────────────────────────────────────
function e3() {
    const seeds = [1, 2, 3, 4, 5, 6, 7, 8];
    const regimes = [
        ["A", { }],                                   // shipped closed form
        ["B", { }],                                   // tethered hybrid
        ["C", { }],                                   // pure emergence, no skeleton, no pump
        ["C-walled", { walled: true }],               // pure emergence + reflective wall
        ["D", { f: 0.30 }],                           // radial envelope + ε pump
        ["E", { }],                                   // ε pump ALONE — no geometric skeleton
    ];
    const rows = [];
    for (const [name, po] of regimes) {
        const regime = name.split("-")[0];
        const P = baseP(po);
        const per = seeds.map((sd) => runRegime(regime, { seed: sd, T: 90, spec: HERO_SPEC(), P, fieldCheck: 40 }));
        const agg = (k) => +(per.reduce((a, b) => a + b[k], 0) / per.length).toFixed(3);
        rows.push({
            regime: name, lambda: agg("lambda"), wallHitPct: agg("wallHitPct"),
            escapes: per.reduce((a, b) => a + b.escapes, 0), sepDuty: agg("sepDuty"),
            breaksPerMin: agg("breaksPerMin"), ecc: agg("ecc"),
            rBar: agg("rBar"), rMax: Math.max(...per.map((p) => p.rMax)),
            rBarSpreadPct: +(100 * (Math.max(...per.map((p) => p.rBar)) - Math.min(...per.map((p) => p.rBar)))
                / agg("rBar")).toFixed(1),
            fieldAgreePct: agg("fieldAgreePct"),
            entropy: agg("entropy"), excursion: agg("excursion"), centroidMax: agg("centroidMax"),
            collapsed: per.filter((p) => p.collapsed).length,
        });
        log("E3", name, JSON.stringify(rows.at(-1)));
    }
    out.E3 = rows;
}

// ─────────────────────────────────────────────────────────────────────────────
// E4 · the central exponent n — precession, chaos, re-tracing
// ─────────────────────────────────────────────────────────────────────────────
function e4() {
    const rows = [];
    for (const n of [1.4, 1.5, 1.7, 1.85, 2.0, 2.2]) {
        const P = baseP({ n, f: 0.30 });
        const per = [1, 2, 3, 4].map((sd) => runRegime("D", { seed: sd, T: 120, spec: HERO_SPEC(), P }));
        const agg = (k) => +(per.reduce((a, b) => a + b[k], 0) / per.length).toFixed(3);
        // apsidal precession per orbit for the 2-body limit: Δϖ = 2π(1/√(3−n) − 1)
        const prec = 360 * (1 / Math.sqrt(3 - n) - 1);
        rows.push({ n, lambda: agg("lambda"), precessionDegPerOrbit: +prec.toFixed(1),
            wallHitPct: agg("wallHitPct"), sepDuty: agg("sepDuty"), ecc: agg("ecc") });
        log("E4 n=", n, JSON.stringify(rows.at(-1)));
    }
    out.E4 = rows;
}

// ─────────────────────────────────────────────────────────────────────────────
// E5 · envelope band f — chaos vs containment along the one skeleton axis
// ─────────────────────────────────────────────────────────────────────────────
function e5() {
    const rows = [];
    for (const f of [0.10, 0.18, 0.25, 0.30, 0.36, 0.45, 0.60, 1.0]) {
        const P = baseP({ f });
        const per = [1, 2, 3, 4, 5, 6].map((sd) => runRegime("D", { seed: sd, T: 90, spec: HERO_SPEC(), P }));
        const agg = (k) => +(per.reduce((a, b) => a + b[k], 0) / per.length).toFixed(3);
        rows.push({ f, lambda: agg("lambda"), wallHitPct: agg("wallHitPct"),
            escapes: per.reduce((a, b) => a + b.escapes, 0), sepDuty: agg("sepDuty"),
            ecc: agg("ecc"), breaksPerMin: agg("breaksPerMin"),
            rMax: +Math.max(...per.map((p) => p.rMax)).toFixed(3) });
        log("E5 f=", f, JSON.stringify(rows.at(-1)));
    }
    out.E5 = rows;
}

// ─────────────────────────────────────────────────────────────────────────────
// E6 · orbit radius a — the separation duty cycle, and where the wall bites
// ─────────────────────────────────────────────────────────────────────────────
function e6() {
    const rows = [];
    for (const a of [0.30, 0.36, 0.40, 0.44, 0.48, 0.50, 0.54, 0.58, 0.62]) {
        const P = baseP({ a, f: 0.30 });
        const per = [1, 2, 3, 4, 5, 6].map((sd) =>
            runRegime("D", { seed: sd, T: 90, spec: HERO_SPEC({ a }), P }));
        const agg = (k) => +(per.reduce((a2, b) => a2 + b[k], 0) / per.length).toFixed(3);
        rows.push({ a, sepDuty: agg("sepDuty"), breaksPerMin: agg("breaksPerMin"),
            lambda: agg("lambda"), wallHitPct: agg("wallHitPct"),
            rMax: +Math.max(...per.map((p) => p.rMax)).toFixed(3),
            edgeUV: +(Math.max(...per.map((p) => p.rMax)) * (1 / 1.6) + LADDER[0] * (1 / 1.6)).toFixed(3) });
        log("E6 a=", a, JSON.stringify(rows.at(-1)));
    }
    out.E6 = rows;
}

// ─────────────────────────────────────────────────────────────────────────────
// E7 · RECURSION DEPTH — how deep before mush
// ─────────────────────────────────────────────────────────────────────────────
function e7() {
    const rows = [];
    for (const depth of [1, 2, 3]) {
        for (const subScale of [0.42, 0.55, 0.70]) {
            if (depth === 1 && subScale !== 0.42) continue;
            const spec = HERO_SPEC({ depth, subPer: depth === 1 ? 0 : 2, subScale });
            const P = baseP({ f: 0.30 });
            const per = [1, 2, 3, 4].map((sd) => {
                const rng = S.mulberry32(sd);
                const bodies = S.makeTree(spec, rng);
                S.seedVelocities(bodies, P);
                const scratch = new Float64Array(bodies.length * 2);
                let resolved = 0, samples = 0, retained = 0, lost = 0;
                const steps = Math.round(60 / DT);
                for (let s = 0; s < steps; s++) {
                    S.step(bodies, P, "D", s * DT, DT, scratch);
                    if (s % 480 === 0) {
                        const cc = F.components(bodies, P.k0, { grid: 288, extent: 1.0, minPx: 8 });
                        resolved += cc.n; samples++;
                        for (const b of bodies) {
                            if (b.fixed) continue;
                            const p = bodies[b.parent];
                            const d = Math.hypot(b.x - p.x, b.y - p.y);
                            // Hill-like retention: bound to its own parent, not stolen by the core
                            const dc = Math.hypot(b.x, b.y);
                            if (b.depth >= 2 && (d > 3 * b.a || dc > S.WALL)) lost++; else retained++;
                        }
                    }
                }
                return { n: bodies.length, resolved: resolved / samples, retained, lost };
            });
            const nBodies = per[0].n;
            const meanResolved = per.reduce((a, b) => a + b.resolved, 0) / per.length;
            const retention = per.reduce((a, b) => a + b.retained, 0) /
                per.reduce((a, b) => a + b.retained + b.lost, 0);
            rows.push({ depth, subScale, bodies: nBodies,
                resolvedComponents: +meanResolved.toFixed(2),
                legibility: +(meanResolved / nBodies).toFixed(3),
                retentionPct: +(100 * retention).toFixed(1) });
            log("E7", JSON.stringify(rows.at(-1)));
        }
    }
    out.E7 = rows;
}

// ─────────────────────────────────────────────────────────────────────────────
// E8 · FISSION — the impulse knee and the natural cadence
// ─────────────────────────────────────────────────────────────────────────────
function e8() {
    // (a) the bridge work: energy to carry a bead from contact to the break gap
    const P = baseP({ f: 0.30 });
    const r = LADDER[0], m = r * r, gb = 2 * P.k0;
    const W = P.sigma * m * gb * 0.5;            // ∫₀^gb σ·m·(1−g/gb) dg
    const vEsc = Math.sqrt((2 * W) / m);
    const Jknee = m * vEsc;
    // (b) measured: sweep the radial impulse, count clean separations
    const rows = [];
    for (const J of [0.000, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((x) => +(x * Jknee).toFixed(6))) {
        let sep = 0, trials = 0, reattach = [];
        for (let sd = 1; sd <= 12; sd++) {
            const rng = S.mulberry32(sd * 7);
            const bodies = S.makeTree(HERO_SPEC({ a: 0.34 }), rng); // start BONDED
            S.seedVelocities(bodies, P);
            const scratch = new Float64Array(bodies.length * 2);
            for (let s = 0; s < Math.round(6 / DT); s++) S.step(bodies, P, "D", s * DT, DT, scratch);
            const b = bodies[1], p = bodies[0];
            const d = Math.hypot(b.x - p.x, b.y - p.y) || 1e-9;
            b.vx += (J / b.m) * (b.x - p.x) / d;
            b.vy += (J / b.m) * (b.y - p.y) / d;
            let broke = false, tBreak = -1, tBack = -1;
            for (let s = 0; s < Math.round(24 / DT); s++) {
                S.step(bodies, P, "D", 6 + s * DT, DT, scratch);
                const dd = Math.hypot(b.x - p.x, b.y - p.y) - b.r - p.r;
                if (!broke && dd > gb) { broke = true; tBreak = s * DT; }
                if (broke && tBack < 0 && dd < gb) tBack = s * DT;
            }
            trials++;
            if (broke) { sep++; reattach.push((tBack < 0 ? 24 : tBack) - tBreak); }
        }
        rows.push({ J, JoverKnee: +(J / Jknee).toFixed(2), sepPct: +((100 * sep) / trials).toFixed(0),
            meanFreeSec: reattach.length ? +(reattach.reduce((a, b) => a + b, 0) / reattach.length).toFixed(2) : 0 });
    }
    out.E8 = { bridgeWork: +W.toFixed(6), vEsc: +vEsc.toFixed(4), Jknee: +Jknee.toFixed(6), rows };
    log("E8 knee:", out.E8.Jknee, "vEsc", out.E8.vEsc);
    log("E8", JSON.stringify(rows));

    // (c) NATURAL cadence — no impulse at all: how often does the eccentric orbit
    //     carry a bead across the bridge on its own, per ecc?
    const nat = [];
    for (const ecc of [0.10, 0.18, 0.26, 0.34, 0.42, 0.50]) {
        const per = [1, 2, 3, 4, 5, 6].map((sd) =>
            runRegime("D", { seed: sd, T: 180, spec: HERO_SPEC({ ecc }), P: baseP({ f: 0.30 }) }));
        const agg = (k) => +(per.reduce((a, b) => a + b[k], 0) / per.length).toFixed(3);
        nat.push({ ecc, breaksPerMin: agg("breaksPerMin"), sepDuty: agg("sepDuty"),
            lambda: agg("lambda"), measuredEcc: agg("ecc"), wallHitPct: agg("wallHitPct") });
        log("E8-nat ecc=", ecc, JSON.stringify(nat.at(-1)));
    }
    out.E8.natural = nat;
}

// ─────────────────────────────────────────────────────────────────────────────
// E9 · SETTLE — one signal
// ─────────────────────────────────────────────────────────────────────────────
function e9() {
    const P = baseP({ f: 0.30 });
    const rows = [];
    for (const damp of [0.6, 1.5, 3.0, 6.0]) {
        const Pd = { ...P, cDamp: damp, sigma: P.sigma };
        const per = [1, 2, 3, 4].map((sd) => {
            const rng = S.mulberry32(sd);
            const bodies = S.makeTree(HERO_SPEC({ a: 0.30, ecc: 0.05 }), rng);
            S.seedVelocities(bodies, Pd);
            const scratch = new Float64Array(bodies.length * 2);
            // global viscous quench (the SETTLE command): mood → 0 arousal
            let settleAt = -1;
            const KE = [];
            for (let s = 0; s < Math.round(30 / DT); s++) {
                S.step(bodies, Pd, "D", s * DT, DT, scratch);
                for (const b of bodies) { if (b.fixed) continue; b.vx *= 0.998; b.vy *= 0.998; }
                if (s % 24 === 0) {
                    let ke = 0, mm = 0;
                    for (const b of bodies) { if (b.fixed) continue; ke += 0.5 * b.m * (b.vx ** 2 + b.vy ** 2); mm += b.m; }
                    const keRel = ke / mm;
                    KE.push(keRel);
                    if (settleAt < 0 && keRel < 1e-4) settleAt = s * DT;
                }
            }
            return { settleAt, ke0: KE[0], keEnd: KE.at(-1) };
        });
        rows.push({ cDamp: damp,
            settleSec: +(per.reduce((a, b) => a + (b.settleAt < 0 ? 30 : b.settleAt), 0) / per.length).toFixed(2),
            keEnd: +(per.reduce((a, b) => a + b.keEnd, 0) / per.length).toExponential(2) });
        log("E9", JSON.stringify(rows.at(-1)));
    }
    out.E9 = rows;
}

const which = process.argv[2] ?? "all";
const table = { e1, e2, e3, e4, e5, e6, e7, e8, e9 };
if (which === "all") for (const k of Object.keys(table)) table[k]();
else for (const k of which.split(",")) table[k]();
writeFileSync(new URL(`./data/results-${which}.json`, import.meta.url), JSON.stringify(out, null, 2));
log("\nwrote data/results-" + which + ".json");
