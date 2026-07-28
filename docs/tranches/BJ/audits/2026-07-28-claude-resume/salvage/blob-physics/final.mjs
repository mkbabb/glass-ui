// final.mjs — the confirmation run at the terminal constants, plus depth-2.
import { writeFileSync } from "node:fs";
import * as S from "./sim.mjs";
import * as F from "./field.mjs";
import { P_of, SPEC, run, agg, SEEDS, LADDER, DT } from "./harness.mjs";

const POS = 1 / 1.6, R = 0.22, rC = LADDER[0], K0 = 0.045322;
const CONTACT = R + rC, BREAK = CONTACT + 2 * K0;
const out = {};
const show = (n, r) => { console.log("\n## " + n); console.table(r); };

export const TERMINAL = { n: 1.7, T0: 12, Bo: 0.14, tauT: 7, cDamp: 0.3, drive: 0.90,
                          k0: K0, edgeUV: 0.475 };

function detail(P, spec, seed, T = 300, warm = 30) {
    const rng = S.mulberry32(seed);
    const bodies = S.makeTree(spec, rng);
    S.seedVelocities(bodies, P);
    const sc = new Float64Array(bodies.length * 2);
    const margin = 0.5 * rC;
    const state = bodies.map(() => "bonded"), since = bodies.map(() => 0);
    let events = 0, freeSum = 0, freeN = 0, sepFrames = 0, frames = 0;
    let edgeMax = 0, settledFrames = 0, settledWhileMoving = 0;
    for (let s = 0; s < Math.round(T / DT); s++) {
        S.step(bodies, P, "F", s * DT, DT, sc);
        if (s % 20 === 0 && s * DT > warm) {
            frames++;
            let anySep = false;
            for (let i = 1; i < bodies.length; i++) {
                const b = bodies[i], p = bodies[b.parent];
                const gap = Math.hypot(b.x - p.x, b.y - p.y) - b.r - p.r;
                edgeMax = Math.max(edgeMax, (Math.hypot(b.x, b.y) + b.r) * POS);
                if (gap > 2 * P.k0) anySep = true;
                if (state[i] === "bonded" && gap > 2 * P.k0 + margin) { state[i] = "free"; events++; since[i] = s * DT; }
                else if (state[i] === "free" && gap < 2 * P.k0) { state[i] = "bonded"; freeSum += s * DT - since[i]; freeN++; }
            }
            if (anySep) sepFrames++;
            const st = S.settledColony(bodies, P);
            if (st) settledFrames++;
            if (st && anySep) settledWhileMoving++;   // must be 0: a false quiescence
        }
    }
    return { eventsPerMin: +((events * 60) / (T - warm)).toFixed(2),
        meanFreeSec: freeN ? +(freeSum / freeN).toFixed(2) : 0,
        sepDuty: +((100 * sepFrames) / frames).toFixed(1),
        edgeMaxUV: +edgeMax.toFixed(4),
        falseSettlePct: +((100 * settledWhileMoving) / frames).toFixed(2),
        settleDutyDriven: +((100 * settledFrames) / frames).toFixed(2), events };
}

function C1() {
    const P = P_of(TERMINAL);
    const per = SEEDS.map((sd) => run("F", P, SPEC(), { seed: sd, T: 300, warm: 30, fieldEvery: 15 }));
    const det = SEEDS.map((sd) => detail(P, SPEC(), sd));
    const rows = SEEDS.map((sd, i) => ({ seed: sd, lambda: per[i].lambda, ecc: per[i].ecc,
        apo: per[i].apo, peri: per[i].peri, sepDuty: det[i].sepDuty,
        eventsPerMin: det[i].eventsPerMin, meanFreeSec: det[i].meanFreeSec,
        edgeMaxUV: det[i].edgeMaxUV, engulfPct: per[i].engulfPct, escapes: per[i].escapes,
        falseSettlePct: det[i].falseSettlePct, fieldAgreePct: per[i].fieldAgreePct,
        cenMean: per[i].cenMean }));
    const a = agg(per);
    out.C1 = { params: { ...TERMINAL, G: +P.G.toFixed(5), sigma: +P.sigma.toFixed(5) },
        perSeed: rows, mean: a,
        lambdaMin: Math.min(...per.map((r) => r.lambda)),
        eccMin: Math.min(...per.map((r) => r.ecc)), eccMax: Math.max(...per.map((r) => r.ecc)),
        eventsPerMinMean: +(det.reduce((x, y) => x + y.eventsPerMin, 0) / det.length).toFixed(2),
        meanFreeSec: +(det.reduce((x, y) => x + y.meanFreeSec, 0) / det.length).toFixed(2),
        edgeMaxUV: Math.max(...det.map((d) => d.edgeMaxUV)),
        seedsWithZeroEvents: det.filter((d) => d.events === 0).length,
        falseSettleTotal: det.reduce((x, y) => x + y.falseSettlePct, 0) };
    show("C1 TERMINAL CONFIRMATION (8 seeds × 300 s)", rows);
    console.log("λ min", out.C1.lambdaMin, "| e range", out.C1.eccMin, "–", out.C1.eccMax,
        "| events/min", out.C1.eventsPerMinMean, "| free", out.C1.meanFreeSec, "s",
        "| edge max", out.C1.edgeMaxUV, "uv | zero-event seeds", out.C1.seedsWithZeroEvents,
        "| false settle", out.C1.falseSettleTotal);
}

// C2 · the CALM preset — drive below the derived threshold must never fission
function C2() {
    const rows = [];
    for (const drive of [0, 0.15, 0.30, 0.3381, 0.45]) {
        const P = P_of({ ...TERMINAL, drive });
        const det = SEEDS.map((sd) => detail(P, SPEC(), sd, 240, 30));
        rows.push({ drive, eventsPerMin: +(det.reduce((a, b) => a + b.eventsPerMin, 0) / det.length).toFixed(2),
            sepDuty: +(det.reduce((a, b) => a + b.sepDuty, 0) / det.length).toFixed(2),
            totalEvents: det.reduce((a, b) => a + b.events, 0),
            settleDuty: +(det.reduce((a, b) => a + b.settleDutyDriven, 0) / det.length).toFixed(1) });
    }
    out.C2 = rows; show("C2 calm contract — drive below 0.3381 must never separate", rows);
}

// C3 · SETTLE from the running state
function C3() {
    const P = P_of(TERMINAL);
    const rows = [];
    for (const tauQ of [0.6, 1.2, 2.0, 3.0]) {
        const per = SEEDS.map((sd) => {
            const rng = S.mulberry32(sd);
            const bodies = S.makeTree(SPEC(), rng);
            S.seedVelocities(bodies, P);
            const sc = new Float64Array(bodies.length * 2);
            for (let s = 0; s < Math.round(45 / DT); s++) S.step(bodies, P, "F", s * DT, DT, sc);
            const Pq = { ...P, drive: 0, tauT: tauQ };
            let t = -1, flap = 0, was = false, held = 0, checks = 0;
            for (let s = 0; s < Math.round(25 / DT); s++) {
                S.step(bodies, Pq, "F", 45 + s * DT, DT, sc);
                if (s % 12 === 0) {
                    const ok = S.settledColony(bodies, Pq);
                    checks++;
                    if (ok) held++;
                    if (ok && t < 0) t = s * DT;
                    if (was && !ok) flap++;
                    was = ok;
                }
            }
            return { t: t < 0 ? 25 : t, flap, was, heldPct: (100 * held) / checks };
        });
        rows.push({ quenchTau: tauQ,
            settleSec: +(per.reduce((a, b) => a + b.t, 0) / per.length).toFixed(2),
            worstSec: Math.max(...per.map((p) => p.t)),
            flapEvents: per.reduce((a, b) => a + b.flap, 0),
            neverSettled: per.filter((p) => !p.was).length });
    }
    out.C3 = rows; show("C3 settle from running → calm (one predicate)", rows);
}

// C4 · DEPTH 2 at the terminal point
function C4() {
    const rows = [];
    for (const [depth, subPer, subScale] of [[1, 0, 0], [2, 1, 0.45], [2, 2, 0.45], [2, 2, 0.30], [3, 2, 0.45]]) {
        const spec = SPEC({ depth, subPer, subScale, subOrbit: 1.0, ecc: 0.30 });
        const P = P_of(TERMINAL);
        const per = SEEDS.slice(0, 6).map((sd) => {
            const rng = S.mulberry32(sd);
            const bodies = S.makeTree(spec, rng);
            S.seedVelocities(bodies, P);
            const sc = new Float64Array(bodies.length * 2);
            let comps = 0, n = 0, lost = 0, kept = 0, edge = 0;
            for (let s = 0; s < Math.round(180 / DT); s++) {
                S.step(bodies, P, "F", s * DT, DT, sc);
                if (s % 600 === 0 && s * DT > 30) {
                    const cc = F.components(bodies, P.k0, { grid: 288, extent: 1.05, minPx: 10 });
                    comps += cc.n; n++;
                    for (const b of bodies) {
                        if (b.fixed) continue;
                        edge = Math.max(edge, (Math.hypot(b.x, b.y) + b.r) * POS);
                        if (b.depth < 2) continue;
                        const p = bodies[b.parent];
                        const d = Math.hypot(b.x - p.x, b.y - p.y);
                        if (d > 2.2 * (p.r + b.r)) lost++; else kept++;
                    }
                }
            }
            return { bodies: bodies.length, comps: comps / n, lost, kept, edge };
        });
        rows.push({ depth, subPer, subScale, bodies: per[0].bodies,
            meanComponents: +(per.reduce((a, b) => a + b.comps, 0) / per.length).toFixed(2),
            subStayBondedPct: (per[0].kept + per[0].lost) === 0 ? null
                : +((100 * per.reduce((a, b) => a + b.kept, 0)) /
                    per.reduce((a, b) => a + b.kept + b.lost, 0)).toFixed(1),
            smallestSubPx480: subScale ? Math.round(rC * subScale * POS * 480) : null,
            edgeMaxUV: +Math.max(...per.map((p) => p.edge)).toFixed(3) });
    }
    out.C4 = rows; show("C4 recursion at the terminal point", rows);
}

for (const f of [C1, C2, C3, C4]) f();
writeFileSync(new URL("./data/final.json", import.meta.url), JSON.stringify(out, null, 2));
console.log("\nwrote data/final.json");
