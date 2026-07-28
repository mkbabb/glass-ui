// exp2.mjs — the second battery: legibility, clean fission, the settle predicate,
// and the confirmation run at the exactly-derived constants.
import { writeFileSync } from "node:fs";
import * as S from "./sim.mjs";
import * as F from "./field.mjs";
import { P_of, SPEC, run, agg, SEEDS, LADDER, DT, mCore } from "./harness.mjs";

const out = {};
const show = (n, r) => { console.log("\n## " + n); console.table(r); };
const POS = 1 / 1.6;
const R = 0.22, rC = LADDER[0], K0 = 0.045322;
const CONTACT = R + rC;               // 0.355967
const BREAK = CONTACT + 2 * K0;       // 0.446611
const CEIL = 0.475 / POS - rC;        // canvas half-extent 0.5uv − 5% margin, minus the crown

// ── U1 · the derived constants, stated ──────────────────────────────────────
function U1() {
    const rows = [
        { name: "R body radius", value: R, law: "types.ts:297 (unchanged)" },
        { name: "r crown bead", value: rC, law: "φ^(1/4) ladder rung 1 from R" },
        { name: "k₀ meniscus", value: K0, law: "min(R,r)/3" },
        { name: "contact radius", value: +CONTACT.toFixed(6), law: "R + r" },
        { name: "break radius", value: +BREAK.toFixed(6), law: "contact + 2k₀ (E1, measured)" },
        { name: "containment ceiling", value: +CEIL.toFixed(6), law: "(0.5uv − 5% margin)/POS_SCALE − r" },
        { name: "ceiling in canvas uv", value: +((CEIL + rC) * POS).toFixed(4), law: "must be ≤ 0.5" },
        { name: "e_min (must separate)", value: +((BREAK - CONTACT) / (BREAK + CONTACT)).toFixed(4), law: "k₀/(R+r+k₀)" },
        { name: "e_max (must stay in frame)", value: +((CEIL - CONTACT) / (CEIL + CONTACT)).toFixed(4), law: "(ceil−contact)/(ceil+contact)" },
        { name: "fission drive threshold", value: +((BREAK - CONTACT) / (CEIL - CONTACT)).toFixed(4), law: "(break−contact)/(ceil−contact)" },
    ];
    out.U1 = rows; show("U1 derived constants", rows);
}

// ── U2 · RECURSION — the Hill test in closed form, then in paint ────────────
function hillRow(subScale, massExp = 2) {
    const rs = rC * subScale;
    const aPar = 0.5 * (CONTACT + CEIL);                 // parent's mean orbit radius
    const mS = Math.pow(rC, massExp), mC = Math.pow(R, massExp);
    const rHill = aPar * Math.pow(mS / (3 * mC), 1 / 3);
    const k0s = Math.min(rC, rs) / 3;
    const contactS = rC + rs;
    const breakS = contactS + 2 * k0s;
    return { subScale, rSub: +rs.toFixed(4), contactSub: +contactS.toFixed(4),
        breakSub: +breakS.toFixed(4), rHill: +rHill.toFixed(4),
        stableCeiling: +(0.5 * rHill).toFixed(4),
        canSeparateAndStayBound: breakS <= 0.5 * rHill,
        breakOverStable: +(breakS / (0.5 * rHill)).toFixed(2) };
}
function U2() {
    const analytic = [0.25, 0.34, 0.45, 0.58].map((s) => hillRow(s));
    out.U2 = { analytic };
    show("U2a Hill test (depth 2): can a sub-satellite separate AND stay bound?", analytic);

    // paint: does a BONDED sub-lobe read as a lobe on the silhouette?
    const lobe = [];
    for (const subScale of [0.20, 0.28, 0.34, 0.45, 0.58, 0.72]) {
        const rs = rC * subScale;
        const k0s = Math.min(rC, rs) / 3;
        // sub docked on the parent skin, parent docked on the core skin
        const bodies = [
            { x: 0, y: 0, r: R },
            { x: CONTACT, y: 0, r: rC },
            { x: CONTACT + (rC + rs) * Math.cos(1.1), y: (rC + rs) * Math.sin(1.1), r: rs },
        ];
        // radial profile about the PARENT centre, MINUS the same profile without the
        // sub-lobe — so the core's own mass cannot be read as the lobe.
        const base = [bodies[0], bodies[1]];
        let bump = 0;
        const N = 720;
        const ray = (set, th) => {
            let lo = 0, hi = 0.9;
            for (let it = 0; it < 34; it++) {
                const m = (lo + hi) / 2;
                if (F.fieldAt(bodies[1].x + m * Math.cos(th), bodies[1].y + m * Math.sin(th), set, k0s) <= 0) lo = m;
                else hi = m;
            }
            return (lo + hi) / 2;
        };
        for (let i = 0; i < N; i++) {
            const th = (i / N) * Math.PI * 2;
            bump = Math.max(bump, (ray(bodies, th) - ray(base, th)) / rC);
        }
        const cc = F.components(bodies, k0s, { grid: 420, extent: 0.85, minPx: 8 });
        lobe.push({ subScale, rSub: +rs.toFixed(4),
            rSubPx_at480: Math.round(rs * POS * 480), lobeProminencePct: +(100 * bump).toFixed(1),
            components: cc.n, reads: bump >= 0.12 });
    }
    out.U2.lobe = lobe;
    show("U2b bonded sub-lobe legibility (prominence over the parent circle)", lobe);
}

// ── U3 · CLEAN fission — margin-qualified events, not threshold chatter ─────
function cleanRun(P, spec, seed, T = 240, warm = 20) {
    const rng = S.mulberry32(seed);
    const bodies = S.makeTree(spec, rng);
    S.seedVelocities(bodies, P);
    const sc = new Float64Array(bodies.length * 2);
    const margin = 0.5 * rC;                       // an event must clear the break law by half a bead
    const state = bodies.map(() => "bonded");
    let events = 0, freeSum = 0, freeN = 0, sepFrames = 0, frames = 0;
    const since = bodies.map(() => 0);
    for (let s = 0; s < Math.round(T / DT); s++) {
        S.step(bodies, P, "F", s * DT, DT, sc);
        if (s % 20 === 0 && s * DT > warm) {
            frames++;
            let anySep = false;
            for (let i = 1; i < bodies.length; i++) {
                const b = bodies[i], p = bodies[b.parent];
                const gap = Math.hypot(b.x - p.x, b.y - p.y) - b.r - p.r;
                if (gap > 2 * P.k0) anySep = true;
                if (state[i] === "bonded" && gap > 2 * P.k0 + margin) { state[i] = "free"; events++; since[i] = s * DT; }
                else if (state[i] === "free" && gap < 2 * P.k0) { state[i] = "bonded"; freeSum += s * DT - since[i]; freeN++; }
            }
            if (anySep) sepFrames++;
        }
    }
    return { eventsPerMin: (events * 60) / (T - warm), meanFreeSec: freeN ? freeSum / freeN : 0,
             sepDuty: (100 * sepFrames) / frames, events };
}
function U3() {
    const rows = [];
    for (const drive of [0, 0.2, 0.3, 0.34, 0.4, 0.5, 0.65, 0.8, 1.0]) {
        const ceil = CONTACT + drive * (CEIL - CONTACT);
        const P = P_of({ Bo: 0.14, tauT: 6, cDamp: 0.3, drive });
        const per = SEEDS.map((sd) => cleanRun(P, SPEC(), sd));
        const m = (k) => +(per.reduce((a, b) => a + b[k], 0) / per.length).toFixed(2);
        rows.push({ drive, ceiling: +ceil.toFixed(4), eventsPerMin: m("eventsPerMin"),
            secBetweenEvents: m("eventsPerMin") > 0 ? +(60 / m("eventsPerMin")).toFixed(1) : Infinity,
            meanFreeSec: m("meanFreeSec"), sepDuty: m("sepDuty"),
            seedsWithZeroEvents: per.filter((p) => p.events === 0).length });
    }
    out.U3 = rows; show("U3 drive → CLEAN fission cadence (event clears break by ½ bead)", rows);
}

// ── U4 · SETTLE — one closed-form signal ───────────────────────────────────
// settled ⇔ ∀ beads: ε ≤ V(r_dock; L)  ⇔  every bead's own orbit keeps it bonded.
function settledNow(bodies, P, rDock) {
    for (const b of bodies) {
        if (b.fixed) continue;
        const p = bodies[b.parent];
        const dx = b.x - p.x, dy = b.y - p.y;
        const vx = b.vx - p.vx, vy = b.vy - p.vy;
        const L = Math.abs(dx * vy - dy * vx);
        const eps = S.specE(bodies, b, P);
        if (eps > S.epsCeiling(P, p.m, L, rDock, p.r)) return false;
    }
    return true;
}
function U4() {
    const rDock = BREAK;   // settled ⇔ no bead can reach the field-break radius
    const rows = [];
    for (const tauQ of [0.5, 1.0, 2.0, 3.5]) {
        const P = P_of({ Bo: 0.14, tauT: 6, cDamp: 0.3, drive: 0.80 });
        const per = SEEDS.map((sd) => {
            const rng = S.mulberry32(sd);
            const bodies = S.makeTree(SPEC(), rng);
            S.seedVelocities(bodies, P);
            const sc = new Float64Array(bodies.length * 2);
            for (let s = 0; s < Math.round(40 / DT); s++) S.step(bodies, P, "F", s * DT, DT, sc);
            const Pq = { ...P, drive: 0, tauT: tauQ };
            let t = -1, flapped = 0, wasSettled = false;
            for (let s = 0; s < Math.round(30 / DT); s++) {
                S.step(bodies, Pq, "F", 40 + s * DT, DT, sc);
                if (s % 12 === 0) {
                    const ok = settledNow(bodies, Pq, rDock);
                    if (ok && t < 0) t = s * DT;
                    if (wasSettled && !ok) flapped++;
                    wasSettled = ok;
                }
            }
            return { t: t < 0 ? 30 : t, flapped, settledAtEnd: wasSettled };
        });
        rows.push({ quenchTau: tauQ,
            settleSec: +(per.reduce((a, b) => a + b.t, 0) / per.length).toFixed(2),
            worstSec: Math.max(...per.map((p) => p.t)),
            flapEvents: per.reduce((a, b) => a + b.flapped, 0),
            neverSettled: per.filter((p) => !p.settledAtEnd).length });
    }
    out.U4 = { rDock: +rDock.toFixed(4), rows };
    show("U4 settle — predicate ε ≤ V(r_dock; L), r_dock = " + rDock.toFixed(4), rows);
}

// ── U5 · CONFIRMATION at the exactly-derived constants, per seed ────────────
function U5() {
    const P = P_of({ n: 1.7, T0: 12, Bo: 0.14, tauT: 6, cDamp: 0.3, drive: 0.80, k0: K0 });
    const per = SEEDS.map((sd) => run("F", P, SPEC(), { seed: sd, T: 240, warm: 30, fieldEvery: 20 }));
    const rows = per.map((r, i) => ({ seed: SEEDS[i], lambda: r.lambda, sepDuty: r.sepDuty,
        breaksPerMin: r.breaksPerMin, ecc: r.ecc, apo: r.apo, peri: r.peri,
        rMax: r.rMax, engulfPct: r.engulfPct, escapes: r.escapes,
        cenMean: r.cenMean, entropy: r.entropy, fieldAgreePct: r.fieldAgreePct }));
    const clean = SEEDS.map((sd) => cleanRun(P, SPEC(), sd, 240, 30));
    const a = agg(per);
    out.U5 = { params: { n: P.n, T0: P.T0, G: +P.G.toFixed(5), sigma: +P.sigma.toFixed(5),
            Bo: P.Bo, tauT: P.tauT, cDamp: P.cDamp, k0: P.k0, drive: P.drive },
        perSeed: rows, mean: a,
        lambdaMin: Math.min(...per.map((r) => r.lambda)),
        cleanEventsPerMin: +(clean.reduce((x, y) => x + y.eventsPerMin, 0) / clean.length).toFixed(2),
        cleanMeanFreeSec: +(clean.reduce((x, y) => x + y.meanFreeSec, 0) / clean.length).toFixed(2) };
    show("U5 CONFIRMATION — per seed, 240 s each", rows);
    console.log("λ min across seeds:", out.U5.lambdaMin, "| clean events/min:", out.U5.cleanEventsPerMin,
        "| mean free:", out.U5.cleanMeanFreeSec, "s");

    // the coordinated arm's contraction rate, measured honestly
    const Pb = P_of({ Bo: 0.14, tauT: 6, cDamp: 0.3 });
    const rng = S.mulberry32(1);
    const bod = S.makeTree(SPEC(), rng); S.seedVelocities(bod, Pb);
    const tw = S.cloneBodies(bod); tw[1].x += 1e-6;
    const s1 = new Float64Array(bod.length * 2), s2 = new Float64Array(bod.length * 2);
    const trace = [];
    for (let s = 0; s < Math.round(20 / DT); s++) {
        S.step(bod, Pb, "B", s * DT, DT, s1); S.step(tw, Pb, "B", s * DT, DT, s2);
        if (s % 240 === 0) trace.push(+S.dist(S.stateVec(bod), S.stateVec(tw)).toExponential(2));
    }
    out.U5.tetherDivergenceTrace = trace;
    console.log("regime-B twin separation, 1 s samples (seeded 1e-6):", trace.join(" "));
}

const which = process.argv[2] ?? "all";
const T = { U1, U2, U3, U4, U5 };
if (which === "all") for (const k of Object.keys(T)) T[k]();
else for (const k of which.split(",")) T[k]();
writeFileSync(new URL(`./data/exp2-${which}.json`, import.meta.url), JSON.stringify(out, null, 2));
console.log("\nwrote data/exp2-" + which + ".json");
