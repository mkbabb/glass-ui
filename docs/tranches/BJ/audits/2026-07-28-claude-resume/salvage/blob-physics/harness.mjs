// harness.mjs — one measurement rig for every regime and every sweep.
import * as S from "./sim.mjs";
import * as F from "./field.mjs";

export const DT = 1 / 240;
export const LADDER = [0.135967, 0.120556, 0.106891]; // φ^(1/4) ladder from R=0.22
export const mCore = 0.22 ** 2;

export function P_of({ n = 1.7, T0 = 12, a0 = 0.5, k0 = 0.045322, rMaxTarget = 0.62,
                       Bo = 0.12, tauT = 3, cDamp = 0.3, epsScale = 1, walled = false,
                       f = 0.30, subShrink = 0.34, drive = 0.80, edgeUV = 0.475 } = {}) {
    const w = (2 * Math.PI) / T0;
    const G = (w * w * Math.pow(a0, n + 1)) / mCore;
    const epsAbs = Math.abs(S.specU({ G, n, R: 0.22 }, mCore, rMaxTarget, 0.22));
    const sigma = (2 * Bo * epsAbs) / (2 * k0);   // Bo ≡ bridge work ÷ |ε| at the ceiling
    return { ...S.DEFAULTS, n, G, k0, rMaxTarget, sigma, Bo, epsAbs, tauT, cDamp,
             epsScale, walled, f, subShrink, drive, edgeUV, T0 };
}

export const SPEC = (o = {}) => ({ R: 0.22, ladder: LADDER, count: 3, a: 0.44, ecc: 0.30,
    depth: 1, subPer: 0, subScale: 0.5, subOrbit: 1.9, massExp: 2, ...o });

export function bonded(bodies, k0) {
    const N = bodies.length, p = [...Array(N).keys()];
    const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(bodies[i].x - bodies[j].x, bodies[i].y - bodies[j].y);
        if (d - bodies[i].r - bodies[j].r < 2 * k0) p[find(i)] = find(j);
    }
    return new Set([...Array(N).keys()].map(find)).size;
}

const mean = (z) => z.reduce((a, b) => a + b, 0) / (z.length || 1);

/** Eccentricity from a radial series: smooth first, then take PROMINENT apsides only.
 *  (Rev-1 of this metric took every local extremum and returned 0.03 for a visibly
 *  1.8× excursion — wobble aliased as apsides. Recorded so the figure is trusted.) */
function eccOf(r, hz) {
    const win = Math.max(3, Math.round(0.6 * hz));
    const sm = [];
    for (let i = 0; i < r.length; i++) {
        let s = 0, c = 0;
        for (let j = Math.max(0, i - win); j <= Math.min(r.length - 1, i + win); j++) { s += r[j]; c++; }
        sm.push(s / c);
    }
    const A = [], Pp = [];
    const span = Math.max(...sm) - Math.min(...sm);
    const prom = 0.10 * span;
    for (let i = win; i < sm.length - win; i++) {
        const loc = sm.slice(i - win, i + win + 1);
        if (sm[i] === Math.max(...loc) && sm[i] - Math.min(...loc) > prom) A.push(sm[i]);
        if (sm[i] === Math.min(...loc) && Math.max(...loc) - sm[i] > prom) Pp.push(sm[i]);
    }
    if (!A.length || !Pp.length) {
        const hi = Math.max(...sm), lo = Math.min(...sm);
        return { e: (hi - lo) / (hi + lo), apo: hi, peri: lo, nOrb: 0 };
    }
    const ma = mean(A), mp = mean(Pp);
    return { e: (ma - mp) / (ma + mp), apo: ma, peri: mp, nOrb: A.length };
}

export function run(regime, P, spec, { seed = 1, T = 150, warm = 20, lyap = true,
                                       fieldEvery = 0, sampleHz = 12 } = {}) {
    const rng = S.mulberry32(seed);
    const bodies = S.makeTree(spec, rng);
    S.seedVelocities(bodies, P);
    const scratch = new Float64Array(bodies.length * 2);
    let twin = null, tw = null, lsum = 0, ln = 0;
    const D0 = 1e-9;
    if (lyap && regime !== "A") { twin = S.cloneBodies(bodies); twin[1].x += D0; tw = new Float64Array(bodies.length * 2); }
    const steps = Math.round(T / DT), warmSteps = Math.round(warm / DT);
    const every = Math.max(1, Math.round(1 / (sampleHz * DT)));
    const sat = bodies.filter((b) => !b.fixed);
    const rs = sat.map(() => []);
    let frames = 0, sep = 0, breaks = 0, last = 1, wall = 0, esc = 0, rmax = 0;
    let cenMax = 0, cenSum = 0, fieldOK = 0, fieldN = 0, ncSum = 0, engulf = 0;

    for (let s = 0; s < steps; s++) {
        const t = s * DT;
        if (regime === "A") S.kinematicA(bodies, P, t); else S.step(bodies, P, regime, t, DT, scratch);
        if (twin) {
            S.step(twin, P, regime, t, DT, tw);
            if (s % 24 === 23 && s > warmSteps) {
                const d = S.dist(S.stateVec(bodies), S.stateVec(twin));
                if (d > 0) {
                    lsum += Math.log(d / D0); ln++;
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
        if (s % every === 0 && s > warmSteps) {
            frames++;
            let k = 0, cx = 0, cy = 0, cm = 0;
            for (const b of bodies) {
                if (b.fixed) continue;
                const p = bodies[b.parent];
                const d = Math.hypot(b.x - p.x, b.y - p.y);
                rs[k].push(d);
                // ENGULFED: the bead's far edge no longer clears the parent skin ⇒ it
                // vanishes from the silhouette (the roster-disappears defect).
                if (b.depth === 1 && d + b.r < p.r + 0.5 * P.k0) engulf++;
                const abs = Math.hypot(b.x, b.y);
                if (abs + b.r > S.WALL) wall++;
                if (abs > 1.4 * S.WALL) esc++;
                rmax = Math.max(rmax, abs);
                cx += b.m * b.x; cy += b.m * b.y; cm += b.m; k++;
            }
            const cen = Math.hypot(cx / cm, cy / cm);
            cenMax = Math.max(cenMax, cen); cenSum += cen;
            const nc = bonded(bodies, P.k0);
            ncSum += nc;
            if (nc > 1) sep++;
            if (nc > last) breaks++;
            last = nc;
            if (fieldEvery && frames % fieldEvery === 0) {
                const cc = F.components(bodies, P.k0, { grid: 224, extent: 0.95, minPx: 10 });
                fieldN++; if (cc.n === nc) fieldOK++;
            }
        }
    }
    const es = rs.map((r) => eccOf(r, sampleHz));
    return {
        lambda: ln ? +(lsum / (ln * 24 * DT)).toFixed(4) : 0,
        sepDuty: +((100 * sep) / frames).toFixed(1),
        breaksPerMin: +((breaks * 60) / (T - warm)).toFixed(2),
        ecc: +mean(es.map((z) => z.e)).toFixed(3),
        eccSpread: +(Math.max(...es.map((z) => z.e)) - Math.min(...es.map((z) => z.e))).toFixed(3),
        apo: +mean(es.map((z) => z.apo)).toFixed(3),
        peri: +mean(es.map((z) => z.peri)).toFixed(3),
        orbits: +mean(es.map((z) => z.nOrb)).toFixed(1),
        rBar: +mean(rs.map(mean)).toFixed(4),
        rMax: +rmax.toFixed(4),
        nCompMean: +(ncSum / frames).toFixed(2),
        engulfPct: +((100 * engulf) / (frames * spec.count)).toFixed(1),
        wallPct: +((100 * wall) / (frames * sat.length)).toFixed(2),
        escapes: esc,
        cenMax: +cenMax.toFixed(3), cenMean: +(cenSum / frames).toFixed(3),
        entropy: +mean(rs.map((r) => S.spectralEntropy(r))).toFixed(3),
        fieldAgreePct: fieldN ? +((100 * fieldOK) / fieldN).toFixed(1) : null,
    };
}

export function agg(rows) {
    const o = {};
    for (const key of Object.keys(rows[0])) {
        const v = rows.map((r) => r[key]).filter((x) => typeof x === "number");
        o[key] = v.length ? +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(3) : null;
    }
    o.rMax = Math.max(...rows.map((r) => r.rMax));
    o.escapes = rows.reduce((a, b) => a + b.escapes, 0);
    o.lambdaSpread = +(Math.max(...rows.map((r) => r.lambda)) - Math.min(...rows.map((r) => r.lambda))).toFixed(3);
    o.rBarSpreadPct = +(100 * (Math.max(...rows.map((r) => r.rBar)) - Math.min(...rows.map((r) => r.rBar)))
        / o.rBar).toFixed(1);
    return o;
}
export const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8];
