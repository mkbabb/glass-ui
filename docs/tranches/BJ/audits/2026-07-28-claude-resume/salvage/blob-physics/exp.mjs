// exp.mjs — the terminal experiment battery for GF-BLOB.
import { writeFileSync } from "node:fs";
import * as S from "./sim.mjs";
import * as F from "./field.mjs";
import { P_of, SPEC, run, agg, SEEDS, LADDER, DT, mCore } from "./harness.mjs";

const out = {};
const show = (name, rows) => { console.log("\n## " + name); console.table(rows); };

// T2 · the operating point — Bond number × pump time × goo damping (regime F)
function T2() {
    const rows = [];
    for (const Bo of [0.06, 0.10, 0.14, 0.20, 0.28])
        for (const tauT of [4, 6, 8, 11])
            for (const cDamp of [0.15, 0.3, 0.7, 1.5]) {
                const P = P_of({ Bo, tauT, cDamp });
                const r = agg(SEEDS.map((sd) => run("F", P, SPEC(), { seed: sd, T: 150, warm: 20 })));
                rows.push({ Bo, tauT, cDamp, lambda: r.lambda, sepDuty: r.sepDuty,
                    breaksPerMin: r.breaksPerMin, ecc: r.ecc, apo: r.apo, peri: r.peri,
                    engulfPct: r.engulfPct, cenMean: r.cenMean, rMax: r.rMax,
                    escapes: r.escapes, wallPct: r.wallPct, entropy: r.entropy });
            }
    const viable = rows.filter((g) => g.escapes === 0 && g.wallPct === 0 && g.lambda >= 0.25 &&
        g.sepDuty >= 30 && g.sepDuty <= 75 && g.breaksPerMin >= 3 && g.breaksPerMin <= 18 &&
        g.engulfPct < 8 && g.ecc >= 0.12);
    viable.sort((a, b) => Math.abs(a.sepDuty - 50) - Math.abs(b.sepDuty - 50));
    out.T2 = { rows, viable };
    show("T2 viable operating points (" + viable.length + "/" + rows.length + ")", viable.slice(0, 12));
}

// T3 · the central exponent — precession vs chaos
function T3() {
    const rows = [];
    for (const n of [1.35, 1.5, 1.7, 1.85, 2.0, 2.15]) {
        const P = P_of({ n, Bo: 0.14, tauT: 8, cDamp: 0.3 });
        const r = agg(SEEDS.map((sd) => run("F", P, SPEC(), { seed: sd, T: 150, warm: 20 })));
        rows.push({ n, precessDegPerOrbit: +(360 * (1 / Math.sqrt(3 - n) - 1)).toFixed(1),
            lambda: r.lambda, lambdaSpread: r.lambdaSpread, sepDuty: r.sepDuty,
            breaksPerMin: r.breaksPerMin, ecc: r.ecc, entropy: r.entropy,
            engulfPct: r.engulfPct, escapes: r.escapes });
    }
    out.T3 = rows; show("T3 central exponent n", rows);
}

// T4 · the turning-point pair — the eccentricity band, derived not minted
function T4() {
    const rows = [];
    const R = 0.22, r = LADDER[0], k0 = 0.045322;
    const contact = R + r, brk = contact + 2 * k0, engulfR = R - r + 0.5 * k0;
    for (const periTarget of [0.14, 0.20, 0.26, 0.30, 0.34, 0.38])
        for (const rMaxTarget of [0.50, 0.56, 0.62, 0.68]) {
            const P = P_of({ Bo: 0.14, tauT: 8, cDamp: 0.3, periTarget, rMaxTarget });
            const rr = agg(SEEDS.map((sd) => run("F", P, SPEC(), { seed: sd, T: 150, warm: 20, fieldEvery: 30 })));
            rows.push({ periTarget, rMaxTarget,
                eDesign: +((rMaxTarget - periTarget) / (rMaxTarget + periTarget)).toFixed(3),
                eMeasured: rr.ecc, apo: rr.apo, peri: rr.peri,
                sepDuty: rr.sepDuty, breaksPerMin: rr.breaksPerMin, lambda: rr.lambda,
                engulfPct: rr.engulfPct, cenMean: rr.cenMean, rMax: rr.rMax,
                edgeUV: +((rr.rMax + r) * 0.625).toFixed(3),
                fieldAgreePct: rr.fieldAgreePct, escapes: rr.escapes });
        }
    out.T4 = { contact: +contact.toFixed(4), breakRadius: +brk.toFixed(4),
        engulfRadius: +engulfR.toFixed(4),
        eMinClosedForm: +(k0 / (R + r + k0)).toFixed(4), rows };
    const good = rows.filter((x) => x.escapes === 0 && x.engulfPct < 6 && x.edgeUV <= 0.50
        && x.sepDuty >= 30 && x.sepDuty <= 75 && x.lambda >= 0.25);
    show("T4 turning points (contact " + contact.toFixed(3) + ", break " + brk.toFixed(3)
        + ", engulf " + engulfR.toFixed(3) + ") — ADMISSIBLE " + good.length + "/" + rows.length, good);
    out.T4.admissible = good;
}

// T5 · THE HEADLINE — coordinated vs emergent, at each regime's own best point
function T5() {
    const rows = [];
    const cases = [
        ["A · coordinated (shipped closed form)", "A", { }, SPEC({ a: 0.50, ecc: 0.30 })],
        ["B · tethered to a coordinated guide", "B", { }, SPEC({ a: 0.50, ecc: 0.30 })],
        ["C · pure emergence, no pump, no skeleton", "C", { }, SPEC({ a: 0.44, ecc: 0.30 })],
        ["C-walled · pure emergence + reflecting wall", "C", { walled: true }, SPEC({ a: 0.44, ecc: 0.30 })],
        ["D · ε pump + radial envelope", "D", { f: 0.30 }, SPEC({ a: 0.44, ecc: 0.30 })],
        ["E · ε pump alone (energy-bounded emergence)", "E", { }, SPEC({ a: 0.44, ecc: 0.30 })],
        ["F · two turning radii, phase free", "F", { }, SPEC({ a: 0.44, ecc: 0.30 })],
        ["F-nocontact · F with the bridge removed", "F", { Bo: 0.0001 }, SPEC({ a: 0.44, ecc: 0.30 })],
    ];
    for (const [name, regime, po, spec] of cases) {
        const P = P_of({ Bo: 0.14, tauT: 8, cDamp: 0.3, ...po });
        const r = agg(SEEDS.map((sd) => run(regime, P, spec, { seed: sd, T: 150, warm: 20, fieldEvery: 25 })));
        rows.push({ regime: name, lambda: r.lambda, lambdaSpread: r.lambdaSpread,
            sepDuty: r.sepDuty, breaksPerMin: r.breaksPerMin, ecc: r.ecc,
            apo: r.apo, peri: r.peri, engulfPct: r.engulfPct,
            rMax: r.rMax, wallPct: r.wallPct, escapes: r.escapes,
            cenMean: r.cenMean, entropy: r.entropy, rBarSpreadPct: r.rBarSpreadPct,
            fieldAgreePct: r.fieldAgreePct });
    }
    out.T5 = rows; show("T5 REGIME COMPARISON", rows);
}

// T6 · recursion depth — where the field turns to mush
function T6() {
    const rows = [];
    for (const depth of [1, 2, 3]) {
        for (const subScale of [0.34, 0.45, 0.58]) {
            if (depth === 1 && subScale !== 0.34) continue;
            const spec = SPEC({ depth, subPer: depth === 1 ? 0 : 2, subScale, subOrbit: 1.9, ecc: 0.30 });
            const P = P_of({ Bo: 0.14, tauT: 8, cDamp: 0.3 });
            const per = SEEDS.slice(0, 5).map((sd) => {
                const rng = S.mulberry32(sd);
                const bodies = S.makeTree(spec, rng);
                S.seedVelocities(bodies, P);
                const scratch = new Float64Array(bodies.length * 2);
                let resolved = 0, samples = 0, retained = 0, lost = 0, minArea = Infinity;
                for (let s = 0; s < Math.round(120 / DT); s++) {
                    S.step(bodies, P, "F", s * DT, DT, scratch);
                    if (s % 720 === 0 && s > 4800) {
                        const cc = F.components(bodies, P.k0, { grid: 320, extent: 1.0, minPx: 10 });
                        resolved += cc.n; samples++;
                        if (cc.areas.length) minArea = Math.min(minArea, cc.areas.at(-1));
                        for (const b of bodies) {
                            if (b.fixed || b.depth < 2) continue;
                            const p = bodies[b.parent];
                            const d = Math.hypot(b.x - p.x, b.y - p.y);
                            const dc = Math.hypot(b.x, b.y);
                            if (d > 3.5 * b.a || dc > S.WALL) lost++; else retained++;
                        }
                    }
                }
                return { n: bodies.length, resolved: resolved / samples, retained, lost, minArea };
            });
            const nB = per[0].n;
            const res = per.reduce((a, b) => a + b.resolved, 0) / per.length;
            const ret = per.reduce((a, b) => a + b.retained, 0) /
                Math.max(1, per.reduce((a, b) => a + b.retained + b.lost, 0));
            rows.push({ depth, subScale, bodies: nB, resolvedComponents: +res.toFixed(2),
                legibility: +(res / nB).toFixed(3), subRetentionPct: +(100 * ret).toFixed(1),
                smallestBlobPx: Math.min(...per.map((p) => p.minArea)) });
        }
    }
    out.T6 = rows; show("T6 recursion depth", rows);
}

// T7 · fission — the impulse knee and the drive→cadence map
function T7() {
    const P = P_of({ Bo: 0.14, tauT: 8, cDamp: 0.3 });
    const r = LADDER[0], m = r * r, gb = 2 * P.k0;
    const Wspec = P.sigma * gb * 0.5;              // bridge work per unit mass
    const vEsc = Math.sqrt(2 * Wspec);
    const Jknee = m * vEsc;
    const rows = [];
    for (const mult of [0, 0.4, 0.7, 0.9, 1.0, 1.15, 1.4, 1.8, 2.5]) {
        const J = mult * Jknee;
        let broke = 0, trials = 0, freeSum = 0, freeN = 0;
        for (let sd = 1; sd <= 16; sd++) {
            const rng = S.mulberry32(sd * 13);
            const bodies = S.makeTree(SPEC({ a: 0.34, ecc: 0.05 }), rng);
            S.seedVelocities(bodies, P);
            const sc = new Float64Array(bodies.length * 2);
            for (let s = 0; s < Math.round(12 / DT); s++) S.step(bodies, P, "F", s * DT, DT, sc);
            const b = bodies[1], p = bodies[0];
            const d = Math.hypot(b.x - p.x, b.y - p.y) || 1e-9;
            b.vx += (J / b.m) * (b.x - p.x) / d;
            b.vy += (J / b.m) * (b.y - p.y) / d;
            let br = false, tB = -1, tR = -1;
            for (let s = 0; s < Math.round(30 / DT); s++) {
                S.step(bodies, P, "F", 12 + s * DT, DT, sc);
                const dd = Math.hypot(b.x - p.x, b.y - p.y) - b.r - p.r;
                if (!br && dd > gb) { br = true; tB = s * DT; }
                if (br && tR < 0 && dd < gb) tR = s * DT;
            }
            trials++;
            if (br) { broke++; freeSum += (tR < 0 ? 30 : tR) - tB; freeN++; }
        }
        rows.push({ JoverKnee: mult, J: +J.toFixed(6), separatedPct: +((100 * broke) / trials).toFixed(0),
            meanFreeSec: freeN ? +(freeSum / freeN).toFixed(2) : 0 });
    }
    // drive → cadence: epsScale is the mood/fissionAmp lever on the containment ceiling
    const drive = [];
    for (const epsScale of [0.70, 0.85, 1.0, 1.15, 1.3, 1.5]) {
        const Pd = P_of({ Bo: 0.14, tauT: 8, cDamp: 0.3, epsScale });
        const rr = agg(SEEDS.map((sd) => run("F", Pd, SPEC(), { seed: sd, T: 150, warm: 20 })));
        drive.push({ epsScale, effectiveCeiling: +(0.62 / epsScale).toFixed(3),
            sepDuty: rr.sepDuty, breaksPerMin: rr.breaksPerMin, apo: rr.apo, peri: rr.peri,
            lambda: rr.lambda, engulfPct: rr.engulfPct, rMax: rr.rMax, escapes: rr.escapes });
    }
    out.T7 = { bridgeWorkSpecific: +Wspec.toFixed(6), vEsc: +vEsc.toFixed(4),
        Jknee: +Jknee.toFixed(6), impulse: rows, drive };
    show("T7a impulse knee (J* = " + Jknee.toFixed(5) + ")", rows);
    show("T7b drive → cadence", drive);
}

// T8 · settle — one signal
function T8() {
    const rows = [];
    for (const tauQ of [0.6, 1.2, 2.5, 4.0]) {
        const P = P_of({ Bo: 0.14, tauT: 8, cDamp: 0.3 });
        const per = SEEDS.map((sd) => {
            const rng = S.mulberry32(sd);
            const bodies = S.makeTree(SPEC(), rng);
            S.seedVelocities(bodies, P);
            const sc = new Float64Array(bodies.length * 2);
            for (let s = 0; s < Math.round(30 / DT); s++) S.step(bodies, P, "F", s * DT, DT, sc);
            // SETTLE: the containment ceiling is driven to the docked pose and the pump
            // becomes a quench. ONE scalar moves; nothing else in the model changes.
            const Pq = { ...P, rMaxTarget: 0.22 + LADDER[0], periTarget: 0.22 + LADDER[0] - 0.0001, tauT: tauQ };
            let settleAt = -1, keLast = 0, resid = 0;
            for (let s = 0; s < Math.round(40 / DT); s++) {
                S.step(bodies, Pq, "F", 30 + s * DT, DT, sc);
                if (s % 24 === 0) {
                    let ke = 0, mm = 0;
                    for (const b of bodies) { if (b.fixed) continue; ke += 0.5 * b.m * (b.vx ** 2 + b.vy ** 2); mm += b.m; }
                    keLast = ke / mm;
                    if (settleAt < 0 && keLast < 2e-4) settleAt = s * DT;
                    if (settleAt >= 0) resid = Math.max(resid, keLast);
                }
            }
            return { settleAt: settleAt < 0 ? 40 : settleAt, keLast, resid };
        });
        const m = (k) => +(per.reduce((a, b) => a + b[k], 0) / per.length).toFixed(4);
        rows.push({ quenchTau: tauQ, settleSec: m("settleAt"),
            keAtEnd: +per.reduce((a, b) => a + b.keLast, 0).toExponential(2),
            neverSettled: per.filter((p) => p.settleAt >= 40).length });
    }
    out.T8 = rows; show("T8 settle (one signal: the containment ceiling → docked)", rows);
}

const which = process.argv[2] ?? "all";
const T = { T2, T3, T4, T5, T6, T7, T8 };
if (which === "all") for (const k of Object.keys(T)) T[k]();
else for (const k of which.split(",")) T[k]();
writeFileSync(new URL(`./data/exp-${which}.json`, import.meta.url), JSON.stringify(out, null, 2));
console.log("\nwrote data/exp-" + which + ".json");
