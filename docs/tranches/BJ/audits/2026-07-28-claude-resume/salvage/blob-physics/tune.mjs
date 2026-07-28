// tune.mjs — the operating-point search. Finds where the colony ALTERNATES
// (meatballs and fissions) instead of sticking or flying apart.
import { writeFileSync } from "node:fs";
import * as S from "./sim.mjs";
import * as F from "./field.mjs";

const DT = 1 / 240;
const LADDER = [0.135967, 0.120556, 0.106891];
const mCore = 0.22 ** 2;

function P_of({ n = 1.7, T0 = 12, a0 = 0.5, k0 = 0.045322, rMaxTarget = 0.62,
                Bo = 0.35, tauT = 6, cDamp = 1.2, epsScale = 1 } = {}) {
    const w = (2 * Math.PI) / T0;
    const G = (w * w * Math.pow(a0, n + 1)) / mCore;
    const epsAbs = (G * mCore) / ((n - 1) * Math.pow(rMaxTarget, n - 1));
    const sigma = (2 * Bo * epsAbs) / (2 * k0);
    return { ...S.DEFAULTS, n, G, k0, rMaxTarget, sigma, Bo, epsAbs, tauT, cDamp,
             epsScale, walled: false };
}
const SPEC = (o = {}) => ({ R: 0.22, ladder: LADDER, count: 3, a: 0.44, ecc: 0.30,
    depth: 1, subPer: 0, subScale: 0.5, subOrbit: 1.9, massExp: 2, ...o });

function bonded(bodies, k0) {
    const N = bodies.length, p = [...Array(N).keys()];
    const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(bodies[i].x - bodies[j].x, bodies[i].y - bodies[j].y);
        if (d - bodies[i].r - bodies[j].r < 2 * k0) p[find(i)] = find(j);
    }
    return new Set([...Array(N).keys()].map(find)).size;
}

export function run(regime, P, spec, { seed = 1, T = 150, warm = 20, lyap = true } = {}) {
    const rng = S.mulberry32(seed);
    const bodies = S.makeTree(spec, rng);
    S.seedVelocities(bodies, P);
    const scratch = new Float64Array(bodies.length * 2);
    let twin = null, tw = null, lsum = 0, ln = 0;
    const D0 = 1e-9;
    if (lyap && regime !== "A") { twin = S.cloneBodies(bodies); twin[1].x += D0; tw = new Float64Array(bodies.length * 2); }
    const steps = Math.round(T / DT), warmSteps = Math.round(warm / DT);
    const sat = bodies.filter((b) => !b.fixed);
    const rs = sat.map(() => []);
    let frames = 0, sep = 0, breaks = 0, last = 1, wall = 0, esc = 0, rmax = 0, cen = 0;
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
        if (s % 20 === 0 && s > warmSteps) {
            frames++;
            let k = 0, cx = 0, cy = 0, cm = 0;
            for (const b of bodies) {
                if (b.fixed) continue;
                const p = bodies[b.parent];
                rs[k].push(Math.hypot(b.x - p.x, b.y - p.y));
                const abs = Math.hypot(b.x, b.y);
                if (abs + b.r > S.WALL) wall++;
                if (abs > 1.4 * S.WALL) esc++;
                rmax = Math.max(rmax, abs);
                cx += b.m * b.x; cy += b.m * b.y; cm += b.m; k++;
            }
            cen = Math.max(cen, Math.hypot(cx / cm, cy / cm));
            const nc = bonded(bodies, P.k0);
            if (nc > 1) sep++;
            if (nc > last) breaks++;
            last = nc;
        }
    }
    const mean = (z) => z.reduce((a, b) => a + b, 0) / (z.length || 1);
    const eccs = rs.map((r) => {
        const A = [], Pp = [];
        for (let i = 1; i < r.length - 1; i++) {
            if (r[i] > r[i - 1] && r[i] >= r[i + 1]) A.push(r[i]);
            if (r[i] < r[i - 1] && r[i] <= r[i + 1]) Pp.push(r[i]);
        }
        if (!A.length || !Pp.length) return 0;
        const ma = mean(A), mp = mean(Pp);
        return (ma - mp) / (ma + mp);
    });
    return {
        lambda: ln ? +(lsum / (ln * 24 * DT)).toFixed(4) : 0,
        sepDuty: +((100 * sep) / frames).toFixed(1),
        breaksPerMin: +((breaks * 60) / (T - warm)).toFixed(2),
        ecc: +mean(eccs).toFixed(3),
        rBar: +mean(rs.map(mean)).toFixed(4),
        rMax: +rmax.toFixed(4),
        wallPct: +((100 * wall) / (frames * sat.length)).toFixed(2),
        escapes: esc, centroid: +cen.toFixed(3),
        entropy: +mean(rs.map((r) => S.spectralEntropy(r))).toFixed(3),
        excursion: +(mean(rs.map((r) => Math.max(...r))) / Math.max(1e-6, mean(rs.map((r) => Math.min(...r))))).toFixed(2),
    };
}

function agg(rows) {
    const k = Object.keys(rows[0]);
    const o = {};
    for (const key of k) o[key] = +(rows.reduce((a, b) => a + b[key], 0) / rows.length).toFixed(3);
    o.rMax = Math.max(...rows.map((r) => r.rMax));
    o.escapes = rows.reduce((a, b) => a + b.escapes, 0);
    return o;
}

const SEEDS = [1, 2, 3, 4, 5, 6];
const grid = [];
for (const Bo of [0.05, 0.12, 0.22, 0.35, 0.55])
    for (const tauT of [1.5, 3, 6, 12])
        for (const cDamp of [0.3, 1.2, 3.0, 8.0]) {
            const P = P_of({ Bo, tauT, cDamp });
            const r = agg(SEEDS.map((sd) => run("E", P, SPEC(), { seed: sd })));
            grid.push({ Bo, tauT, cDamp, ...r });
        }
grid.sort((a, b) => b.lambda - a.lambda);
const viable = grid.filter((g) => g.escapes === 0 && g.wallPct < 0.5 && g.sepDuty > 25 && g.sepDuty < 92
    && g.breaksPerMin >= 2 && g.breaksPerMin <= 30 && g.lambda >= 0.25);
console.log("VIABLE (λ≥0.25, contained, alternating):", viable.length, "of", grid.length);
console.table(viable.slice(0, 14));
console.log("\nTOP λ overall:");
console.table(grid.slice(0, 10));
writeFileSync(new URL("./data/tune-grid.json", import.meta.url), JSON.stringify(grid, null, 2));
