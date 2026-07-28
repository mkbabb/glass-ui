// BLOB PHYSICS INSTRUMENT — Fable design arm, GF-BLOB re-cut on the 07-27 charter.
// Units: config-UV (positions in [-0.5,0.5] scale; POS_SCALE 0.625 to paint uv; wall at
// 0.8 config-UV = canvas edge). Time: seconds. Integrator: semi-implicit Euler, fixed dt.
// A 2D point-body sim is a LEGAL INSTRUMENT for physics questions only; the shipped
// renderer stays WebGPU. Nothing here is repo bytes.

const DT = 1 / 240;
const R_CORE = 0.22;
// PASS-4 phi^(1/4) ladder (mined, lawful): rungs for N=3 roster.
const LADDER = [0.135967, 0.120556, 0.106891];
const WALL = 0.79; // bead EDGE beyond this = wall hit (canvas edge 0.8 minus margin)
const ESCAPE = 1.0;

function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// k (meniscus) law: min(R,r)/3 — PASS-4 adjudicated divisor.
const kOf = (a, b) => Math.min(a, b) / 3;
// Neck-break bar (center distance): verified dip law => gap > 2k  =>  d > R+r+2k.
const sepBar = (R, r) => R + r + 2 * kOf(R, r);

// ---------- system builder ----------
// opts: { regime: 'A'|'B'|'C'|'D', seed, f, n, kSpring, depth, T0, initial:'orbit'|'bonded' }
function makeSystem(opts) {
    const rng = mulberry32(opts.seed);
    const n = opts.n ?? 1.7;
    const f = opts.f ?? 0.273;
    const T0 = opts.T0 ?? 9.0;
    const RC = opts.rCore ?? R_CORE;
    const bodies = [];
    bodies.push({ id: 0, parent: -1, r: RC, x: 0, y: 0, vx: 0, vy: 0 }); // pinned core

    const addChildren = (pIdx, radii, depthLeft) => {
        const P = bodies[pIdx];
        for (let i = 0; i < radii.length; i++) {
            const r = radii[i];
            const aHome = (P.r + r) / (1 - f);
            const T = T0 * Math.sqrt(P.r / R_CORE);
            const om = (2 * Math.PI) / T;
            const mu = om * om * Math.pow(aHome, n + 1);
            const th = (i / radii.length) * 2 * Math.PI + rng() * 2 * Math.PI;
            const b = {
                id: bodies.length, parent: pIdx, r, aHome, mu, n,
                x: 0, y: 0, vx: 0, vy: 0,
                target: opts.initial === 'bonded' ? 'bonded' : 'free',
                omA: om * (0.8 + rng() * 0.4), phA: rng() * 2 * Math.PI,
                eccA: 0.15 * (0.3 + rng() * 0.7),
            };
            if (opts.initial === 'bonded') {
                const d = P.r + r + 0.001;
                b.x = P.x + d * Math.cos(th); b.y = P.y + d * Math.sin(th);
                const vt = 0.15 * om * d;
                b.vx = P.vx - vt * Math.sin(th); b.vy = P.vy + vt * Math.cos(th);
            } else {
                const d = aHome * (0.95 + rng() * 0.1);
                b.x = P.x + d * Math.cos(th); b.y = P.y + d * Math.sin(th);
                const vc = Math.sqrt(mu * Math.pow(d, 1 - n));
                const jit = 0.9 + rng() * 0.2;
                b.vx = P.vx - vc * jit * Math.sin(th); b.vy = P.vy + vc * jit * Math.cos(th);
            }
            bodies.push(b);
            if (depthLeft > 1) {
                const childR = radii.slice(0, 2).map((rr) => rr * (r / R_CORE));
                addChildren(bodies.length - 1, childR, depthLeft - 1);
            }
        }
    };
    addChildren(0, LADDER.map((r) => (r * RC) / R_CORE), opts.depth ?? 1);
    return { bodies, opts, t: 0, rng };
}

// ---------- forces ----------
const F_CAP = 0.35, K_REP = 60, C_AP = 3.0; // capillary peak accel, contact stiffness, approach damping
function accel(sys, out) {
    const { bodies, opts } = sys;
    const regime = opts.regime;
    for (let i = 0; i < bodies.length; i++) { out[2 * i] = 0; out[2 * i + 1] = 0; }

    for (let i = 1; i < bodies.length; i++) {
        const b = bodies[i]; const P = bodies[b.parent];
        const dx = b.x - P.x, dy = b.y - P.y;
        const d = Math.hypot(dx, dy) || 1e-9;
        const ux = dx / d, uy = dy / d;
        const vRelX = b.vx - P.vx, vRelY = b.vy - P.vy;
        const vRad = vRelX * ux + vRelY * uy;

        if (regime === 'A') {
            const th = b.omA * sys.t + b.phA;
            const tx = P.x + b.aHome * (1 - b.eccA) * Math.cos(th);
            const ty = P.y + b.aHome * (1 + b.eccA) * Math.sin(th);
            const dth = 1e-4;
            const tx2 = P.x + b.aHome * (1 - b.eccA) * Math.cos(th + b.omA * dth);
            const ty2 = P.y + b.aHome * (1 + b.eccA) * Math.sin(th + b.omA * dth);
            const tvx = (tx2 - tx) / dth, tvy = (ty2 - ty) / dth;
            const kT = 60, cT = 2 * Math.sqrt(kT);
            out[2 * i] += -kT * (b.x - tx) - cT * (b.vx - tvx);
            out[2 * i + 1] += -kT * (b.y - ty) - cT * (b.vy - tvy);
        } else {
            const g = b.mu / Math.pow(d, b.n);
            out[2 * i] += -g * ux; out[2 * i + 1] += -g * uy;

            const gap = d - (P.r + b.r);
            const w = 2 * kOf(P.r, b.r);
            if (gap < 0) { const a = K_REP * -gap; out[2 * i] += a * ux; out[2 * i + 1] += a * uy; }
            else if (gap < w) {
                const a = F_CAP * (1 - gap / w);
                out[2 * i] += -a * ux; out[2 * i + 1] += -a * uy;
            }
            if (gap < w && vRad < 0) {
                out[2 * i] += -C_AP * vRad * ux; out[2 * i + 1] += -C_AP * vRad * uy;
            }

            if (regime === 'D') {
                // two-state floor (the cure): free beads are HELD OUT above the neck-break
                // bar (capture becomes a causal event, never a leak); bonded floor at skin.
                const lo = b.target === 'free' && opts.twoState
                    ? sepBar(P.r, b.r) * 1.10
                    : b.aHome * (1 - opts.f);
                const hi = b.aHome * (1 + opts.f);
                const kE = 9, cE = 6;
                if (d > hi) {
                    const a = -kE * (d - hi) - cE * Math.max(vRad, 0);
                    out[2 * i] += a * ux; out[2 * i + 1] += a * uy;
                } else if (d < lo) {
                    const a = kE * (lo - d) - cE * Math.min(vRad, 0);
                    out[2 * i] += a * ux; out[2 * i + 1] += a * uy;
                }
                // viscous relative-speed limiter (goo drag): kills tree slingshots
                if (opts.twoState) {
                    const s = Math.hypot(vRelX, vRelY);
                    const vc = Math.sqrt(b.mu * Math.pow(Math.max(d, 0.05), 1 - b.n));
                    const cap = 2.5 * vc;
                    if (s > cap) {
                        const drag = 3 * (s - cap);
                        out[2 * i] += (-drag * vRelX) / s; out[2 * i + 1] += (-drag * vRelY) / s;
                    }
                    // THE DISH: one-sided critically-damped wall envelope on ABSOLUTE radius —
                    // the canvas is a container; kills every tail excursion by construction.
                    const dAbs = Math.hypot(b.x, b.y) || 1e-9;
                    const pen = dAbs + b.r - 0.76;
                    if (pen > 0) {
                        const uxA = b.x / dAbs, uyA = b.y / dAbs;
                        const vAbsRad = b.vx * uxA + b.vy * uyA;
                        const a = -25 * pen - 10 * Math.max(vAbsRad, 0);
                        out[2 * i] += a * uxA; out[2 * i + 1] += a * uyA;
                    }
                }
            } else if (regime === 'C') {
                const k = opts.kSpring, c = 2 * Math.sqrt(k);
                const a = -k * (d - b.aHome) - c * vRad;
                out[2 * i] += a * ux; out[2 * i + 1] += a * uy;
            }
        }
    }
    // pair contact (all pairs) + sibling capillary (same parent, physics regimes)
    for (let i = 1; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i], c = bodies[j];
            const dx = c.x - a.x, dy = c.y - a.y;
            const d = Math.hypot(dx, dy) || 1e-9;
            const gap = d - (a.r + c.r);
            const ux = dx / d, uy = dy / d;
            if (gap < 0) {
                const f0 = K_REP * -gap;
                out[2 * i] -= f0 * ux; out[2 * i + 1] -= f0 * uy;
                out[2 * j] += f0 * ux; out[2 * j + 1] += f0 * uy;
            } else if (a.parent === c.parent && regime !== 'A') {
                const w = 2 * kOf(a.r, c.r);
                if (gap < w) {
                    const f0 = 0.5 * F_CAP * (1 - gap / w);
                    out[2 * i] += f0 * ux; out[2 * i + 1] += f0 * uy;
                    out[2 * j] -= f0 * ux; out[2 * j + 1] -= f0 * uy;
                }
            }
        }
    }
}

const ACC = new Float64Array(128);
function step(sys, dt) {
    accel(sys, ACC);
    const { bodies } = sys;
    for (let i = 1; i < bodies.length; i++) {
        const b = bodies[i];
        b.vx += ACC[2 * i] * dt; b.vy += ACC[2 * i + 1] * dt;
    }
    for (let i = 1; i < bodies.length; i++) {
        const b = bodies[i];
        b.x += b.vx * dt; b.y += b.vy * dt;
    }
    sys.t += dt;
}

// ---------- state helpers ----------
function getState(sys) {
    const s = [];
    for (let i = 1; i < sys.bodies.length; i++) {
        const b = sys.bodies[i]; s.push(b.x, b.y, b.vx, b.vy);
    }
    return s;
}
function setState(sys, s) {
    let k = 0;
    for (let i = 1; i < sys.bodies.length; i++) {
        const b = sys.bodies[i];
        b.x = s[k++]; b.y = s[k++]; b.vx = s[k++]; b.vy = s[k++];
    }
}
function dist(s1, s2) {
    let d = 0;
    for (let i = 0; i < s1.length; i++) d += (s1[i] - s2[i]) ** 2;
    return Math.sqrt(d);
}

// Benettin largest Lyapunov exponent.
function lyapunov(mk, T = 60, transient = 10) {
    const A = mk(), B = mk();
    for (let t = 0; t < transient; t += DT) { step(A, DT); step(B, DT); }
    const d0 = 1e-7;
    const s = getState(A); s[0] += d0; setState(B, s);
    let sum = 0, count = 0;
    const tau = 0.25, steps = Math.round(tau / DT);
    for (let t = 0; t < T; t += tau) {
        for (let k = 0; k < steps; k++) { step(A, DT); step(B, DT); }
        const sa = getState(A), sb = getState(B);
        const d = dist(sa, sb);
        if (d > 0) { sum += Math.log(d / d0); count++; }
        for (let i = 0; i < sa.length; i++) sb[i] = sa[i] + ((sb[i] - sa[i]) * d0) / (d || d0);
        setState(B, sb);
    }
    return sum / (count * tau);
}

// ---------- metric run ----------
function metricsRun(opts, T = 120) {
    const sys = makeSystem(opts);
    let wallHits = 0, wallIn = false, escapes = 0;
    let framesAllBonded = 0, frames = 0;
    const nb = sys.bodies.length;
    const rMin = new Array(nb).fill(Infinity), rMax = new Array(nb).fill(0);
    const eccSamples = [];
    const periAngles = [];
    let lastR = 0, lastLastR = 0;
    const bondedFrames = new Array(nb).fill(0);
    const sampleEvery = Math.round(1 / 60 / DT);
    let sc = 0;
    const winLen = 10; let winStart = 0;
    for (let t = 0; t < T; t += DT) {
        step(sys, DT);
        if (++sc < sampleEvery) continue;
        sc = 0; frames++;
        let allBonded = true, anyWall = false;
        for (let i = 1; i < nb; i++) {
            const b = sys.bodies[i]; const P = sys.bodies[b.parent];
            const d = Math.hypot(b.x - P.x, b.y - P.y);
            const gap = d - (P.r + b.r);
            const bonded = gap < 2 * kOf(P.r, b.r);
            if (bonded) bondedFrames[i]++;
            else allBonded = false;
            rMin[i] = Math.min(rMin[i], d); rMax[i] = Math.max(rMax[i], d);
            const edge = Math.hypot(b.x, b.y) + b.r;
            if (edge > WALL) anyWall = true;
            if (edge > ESCAPE) escapes++;
            if (i === 1) {
                if (lastR && lastLastR && lastR < lastLastR && lastR < d) {
                    periAngles.push(Math.atan2(b.y - P.y, b.x - P.x));
                }
                lastLastR = lastR; lastR = d;
            }
        }
        if (anyWall && !wallIn) { wallHits++; wallIn = true; }
        if (!anyWall) wallIn = false;
        if (allBonded) framesAllBonded++;
        if (sys.t - winStart >= winLen) {
            for (let i = 1; i < nb; i++) {
                if (rMax[i] > 0 && isFinite(rMin[i]))
                    eccSamples.push((rMax[i] - rMin[i]) / (rMax[i] + rMin[i]));
                rMin[i] = Infinity; rMax[i] = 0;
            }
            winStart = sys.t;
        }
    }
    let prec = NaN;
    if (periAngles.length > 2) {
        const diffs = [];
        for (let i = 1; i < periAngles.length; i++) {
            let dth = periAngles[i] - periAngles[i - 1];
            while (dth > Math.PI) dth -= 2 * Math.PI;
            while (dth < -Math.PI) dth += 2 * Math.PI;
            diffs.push(Math.abs(dth) * (180 / Math.PI));
        }
        diffs.sort((a, b) => a - b);
        prec = diffs[Math.floor(diffs.length / 2)];
    }
    eccSamples.sort((a, b) => a - b);
    const q = (p) => (eccSamples.length ? eccSamples[Math.min(eccSamples.length - 1, Math.floor(p * eccSamples.length))] : NaN);
    return {
        wallHits, escapes,
        allBondedPct: (100 * framesAllBonded) / frames,
        eccMed: q(0.5), eccP10: q(0.1), eccP90: q(0.9),
        precessionDegPerOrbit: prec,
    };
}

// ---------- experiments ----------
const fmt = (x, d = 3) => (typeof x === 'number' && isFinite(x) ? x.toFixed(d) : String(x));
const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;

function exp0_bar() {
    console.log('\nEXP0 NECK-BREAK BAR — 2-circle smin field, crown bead vs core, RAW vs IQ-NORMALIZED');
    const R = R_CORE, r = LADDER[0], k0 = kOf(R, r);
    // raw polynomial smin with parameter kp; IQ-normalized (types.ts:315: dip at a==b equals
    // the uploaded value) uses kp = 4*k0 so the equal-distance dip is exactly k0.
    const mk = (kp) => (px, py, d) => {
        const da = Math.hypot(px, py) - R;
        const db = Math.hypot(px - d, py) - r;
        const h = Math.max(0, Math.min(1, 0.5 + (0.5 * (db - da)) / kp));
        return db * (1 - h) + da * h - kp * h * (1 - h);
    };
    const findBreak = (field) => {
        for (let d = R + r; d < R + r + 6 * k0; d += 0.0005) {
            let maxF = -Infinity;
            for (let x = R * 0.8; x < d - r * 0.8; x += 0.001) maxF = Math.max(maxF, field(x, 0, d));
            if (maxF > 0) return d;
        }
        return NaN;
    };
    const dRaw = findBreak(mk(k0));
    const dNorm = findBreak(mk(4 * k0));
    console.log(`R=${R} r=${fmt(r, 4)} k0=min/3=${fmt(k0, 4)}`);
    console.log(`raw smin (kp=k0):        break at ${fmt(dRaw, 4)} = R+r+${fmt((dRaw - R - r) / k0, 2)}k0`);
    console.log(`IQ-normalized (kp=4k0):  break at ${fmt(dNorm, 4)} = R+r+${fmt((dNorm - R - r) / k0, 2)}k0  <- the shader's arm`);
    console.log(`prior charter bar (R+r+k0): ${fmt(R + r + k0, 4)} | dip-law bar (R+r+2k0): ${fmt(R + r + 2 * k0, 4)}`);
}

// eccentricity half-life: init eccentric, no kicks, measure e decay (circularization)
function exp8_ecclife() {
    console.log('\nEXP8 ECCENTRICITY HALF-LIFE — regime D f=0.273, e0~0.25, no kicks, 8 seeds');
    const halfLives = [];
    for (let sd = 1; sd <= 8; sd++) {
        const sys = makeSystem({ regime: 'D', f: 0.273, seed: 300 + sd, depth: 1, initial: 'orbit' });
        // eccentrify: scale tangential speed by 0.78 (e ~ 0.25-0.35)
        for (let i = 1; i < sys.bodies.length; i++) { sys.bodies[i].vx *= 0.78; sys.bodies[i].vy *= 0.78; }
        const eOf = () => {
            // bead 1 osculating radial excursion over one radial period via energy: cheap proxy —
            // sample r over next 12 s window
            return null;
        };
        // measure windowed e of bead 1 over consecutive 12-s windows
        const es = [];
        for (let w = 0; w < 10; w++) {
            let rmin = Infinity, rmax = 0;
            for (let t = 0; t < 12; t += DT) {
                step(sys, DT);
                const b = sys.bodies[1]; const P = sys.bodies[0];
                const d = Math.hypot(b.x - P.x, b.y - P.y);
                rmin = Math.min(rmin, d); rmax = Math.max(rmax, d);
            }
            es.push((rmax - rmin) / (rmax + rmin));
        }
        // half-life: first window where e < e0/2
        const e0 = es[0];
        let hl = NaN;
        for (let w = 1; w < es.length; w++) if (es[w] < e0 / 2) { hl = w * 12; break; }
        halfLives.push(hl);
        if (sd === 1) console.log(`seed1 windowed e (12 s windows): ${es.map((e) => e.toFixed(3)).join(' ')}`);
    }
    const fin = halfLives.filter(isFinite);
    console.log(`e half-life: ${fin.length}/8 seeds decayed below e0/2 within 120 s; mean of those ${fin.length ? fmt(avg(fin), 0) : 'n/a'} s; ${8 - fin.length} persisted >120 s`);
}

function exp1_regimes() {
    console.log('\nEXP1 REGIME COMPARISON — 8 seeds x 120 s, depth 1, N=3, init=orbit, n=1.7');
    console.log('regime | lambda(1/s) | wallHits(sum) | escapes | allBonded%(mean) | eccMed | precession deg/orbit');
    const rows = [
        { name: 'A coordinated', o: { regime: 'A' } },
        { name: 'B pure emergent', o: { regime: 'B' } },
        { name: 'C spring k=0.5', o: { regime: 'C', kSpring: 0.5 } },
        { name: 'C spring k=2', o: { regime: 'C', kSpring: 2 } },
        { name: 'C spring k=8', o: { regime: 'C', kSpring: 8 } },
        { name: 'C spring k=32', o: { regime: 'C', kSpring: 32 } },
        { name: 'D envelope f=0.273', o: { regime: 'D', f: 0.273 } },
    ];
    for (const row of rows) {
        let wall = 0, esc = 0, ab = 0; const eccs = [], precs = [];
        for (let s = 1; s <= 8; s++) {
            const m = metricsRun({ ...row.o, seed: s * 1237, depth: 1, initial: 'orbit' });
            wall += m.wallHits; esc += m.escapes; ab += m.allBondedPct / 8;
            eccs.push(m.eccMed); precs.push(m.precessionDegPerOrbit);
        }
        const lam = lyapunov(() => makeSystem({ ...row.o, seed: 4242, depth: 1, initial: 'orbit' }));
        const pf = precs.filter(isFinite);
        console.log(`${row.name} | ${fmt(lam, 4)} | ${wall} | ${esc} | ${fmt(ab, 1)} | ${fmt(avg(eccs))} | ${pf.length ? fmt(avg(pf), 1) : 'n/a'}`);
    }
}

function exp2_fsweep() {
    console.log('\nEXP2 ENVELOPE f SWEEP — regime D, 8 seeds x 120 s');
    console.log('f | lambda | wallHits | escapes | eccMed | eccP90 | ceiling>bar(crown)?');
    for (const f of [0.15, 0.2, 0.25, 0.273, 0.3, 0.35]) {
        let wall = 0, esc = 0; const eccs = [], ecc9 = [];
        for (let s = 1; s <= 8; s++) {
            const m = metricsRun({ regime: 'D', f, seed: s * 991, depth: 1, initial: 'orbit' });
            wall += m.wallHits; esc += m.escapes; eccs.push(m.eccMed); ecc9.push(m.eccP90);
        }
        const lam = lyapunov(() => makeSystem({ regime: 'D', f, seed: 777, depth: 1, initial: 'orbit' }));
        const r = LADDER[0];
        const ceiling = ((R_CORE + r) / (1 - f)) * (1 + f);
        const bar = sepBar(R_CORE, r);
        console.log(`${f} | ${fmt(lam, 4)} | ${wall} | ${esc} | ${fmt(avg(eccs))} | ${fmt(avg(ecc9))} | ${ceiling > bar ? 'YES' : 'NO'} (${fmt(ceiling)} vs ${fmt(bar)})`);
    }
}

function exp3_nsweep() {
    console.log('\nEXP3 GRAVITY EXPONENT n — regime D f=0.273');
    console.log('n | lambda | precession deg/orbit (median) | wallHits');
    for (const n of [1.0, 1.3, 1.5, 1.7, 2.0, 2.3]) {
        const precs = []; let wall = 0;
        for (let s = 1; s <= 8; s++) {
            const m = metricsRun({ regime: 'D', f: 0.273, n, seed: s * 313, depth: 1, initial: 'orbit' });
            if (isFinite(m.precessionDegPerOrbit)) precs.push(m.precessionDegPerOrbit);
            wall += m.wallHits;
        }
        const lam = lyapunov(() => makeSystem({ regime: 'D', f: 0.273, n, seed: 99, depth: 1, initial: 'orbit' }));
        precs.sort((a, b) => a - b);
        console.log(`${n} | ${fmt(lam, 4)} | ${precs.length ? fmt(precs[Math.floor(precs.length / 2)], 1) : 'n/a'} | ${wall}`);
    }
}

function exp4_fission() {
    console.log('\nEXP4 FISSION — bodies freed per click vs J (config-UV/s), regime D f=0.273, init=bonded');
    console.log('(v_circ at crown home approx 0.29; click kicks ALL bonded beads radially, jitter +/-20%)');
    console.log('J | mean bodies freed/click (16 trials) | mean re-merge time s (n)');
    for (const J of [0.0, 0.05, 0.1, 0.15, 0.18, 0.2, 0.22, 0.25, 0.28, 0.3, 0.4]) {
        let freedTotal = 0; const trials = 16, remerge = [];
        for (let tr = 0; tr < trials; tr++) {
            const sys = makeSystem({ regime: 'D', f: 0.273, seed: 5000 + tr, depth: 1, initial: 'bonded' });
            for (let t = 0; t < 30; t += DT) step(sys, DT); // long settle kills the init transient
            const rng = mulberry32(9000 + tr);
            for (let i = 1; i < sys.bodies.length; i++) {
                const b = sys.bodies[i]; const P = sys.bodies[b.parent];
                const dx = b.x - P.x, dy = b.y - P.y, d = Math.hypot(dx, dy) || 1e-9;
                const jj = J * (0.8 + rng() * 0.4);
                b.vx += (dx / d) * jj; b.vy += (dy / d) * jj;
            }
            const fired = new Set(); const freeAt = {};
            for (let t = 0; t < 30; t += DT) {
                step(sys, DT);
                for (let i = 1; i < sys.bodies.length; i++) {
                    const b = sys.bodies[i]; const P = sys.bodies[b.parent];
                    const d = Math.hypot(b.x - P.x, b.y - P.y);
                    const bar = sepBar(P.r, b.r);
                    if (t < 3 && !fired.has(i) && d > bar) { fired.add(i); freeAt[i] = t; }
                    if (fired.has(i) && freeAt[i] != null && d < P.r + b.r + kOf(P.r, b.r) * 0.5) {
                        remerge.push(t - freeAt[i]); freeAt[i] = null;
                    }
                }
            }
            freedTotal += fired.size;
        }
        console.log(`${J} | ${fmt(freedTotal / trials, 2)} | ${remerge.length ? fmt(avg(remerge), 1) : 'n/a'} (${remerge.length})`);
    }
}

function exp5_cadence(J_KNEE, RATE_FULL) {
    console.log(`\nEXP5 AMBIENT CADENCE (operational state) — J=${J_KNEE}, RATE_FULL=${RATE_FULL}/s, T=300 s, 4 seeds`);
    console.log('kick law: Poisson rate RATE_FULL*amp; target ANY bead — bonded: radial-out; free: random direction (turbulence)');
    console.log('fissionAmp | fission ev/min | re-merge ev/min | mean free beads | allBonded% | eccMed(free) | eccP90(free)');
    for (const amp of [0.0, 0.25, 0.5, 0.75, 1.0]) {
        let events = 0, merges = 0, freeSum = 0, samples = 0, allBondedN = 0;
        const eccs = [];
        for (let sd = 1; sd <= 4; sd++) {
            const sys = makeSystem({ regime: 'D', f: 0.273, seed: 100 + sd, depth: 1, initial: 'bonded' });
            const rng = mulberry32(200 + sd);
            const latched = new Set();
            let stepIdx = 0;
            const nb = sys.bodies.length;
            const rMin = new Array(nb).fill(Infinity), rMax = new Array(nb).fill(0);
            let winStart = 0;
            for (let t = 0; t < 300; t += DT) {
                if (rng() < RATE_FULL * amp * DT) {
                    const i = 1 + Math.floor(rng() * (nb - 1));
                    const b = sys.bodies[i]; const P = sys.bodies[b.parent];
                    const dx = b.x - P.x, dy = b.y - P.y, d = Math.hypot(dx, dy) || 1e-9;
                    const jj = J_KNEE * (0.8 + rng() * 0.4);
                    if (d < sepBar(P.r, b.r)) { b.vx += (dx / d) * jj; b.vy += (dy / d) * jj; }
                    else { const th = rng() * 2 * Math.PI; b.vx += jj * Math.cos(th); b.vy += jj * Math.sin(th); }
                }
                step(sys, DT);
                if (++stepIdx % 24 === 0) {
                    let free = 0, all = true;
                    for (let i = 1; i < nb; i++) {
                        const b = sys.bodies[i]; const P = sys.bodies[b.parent];
                        const d = Math.hypot(b.x - P.x, b.y - P.y);
                        if (d > sepBar(P.r, b.r)) {
                            free++; all = false;
                            if (!latched.has(i)) { latched.add(i); events++; }
                            rMin[i] = Math.min(rMin[i], d); rMax[i] = Math.max(rMax[i], d);
                        } else if (d < P.r + b.r + kOf(P.r, b.r) * 0.5) {
                            if (latched.has(i)) merges++;
                            latched.delete(i);
                        }
                    }
                    freeSum += free; samples++; if (all) allBondedN++;
                    if (sys.t - winStart >= 10) {
                        for (let i = 1; i < nb; i++) {
                            if (rMax[i] > 0 && isFinite(rMin[i]) && rMax[i] > rMin[i])
                                eccs.push((rMax[i] - rMin[i]) / (rMax[i] + rMin[i]));
                            rMin[i] = Infinity; rMax[i] = 0;
                        }
                        winStart = sys.t;
                    }
                }
            }
        }
        eccs.sort((a, b) => a - b);
        const q = (p) => (eccs.length ? eccs[Math.min(eccs.length - 1, Math.floor(p * eccs.length))] : NaN);
        console.log(`${amp} | ${fmt((events / (4 * 300)) * 60, 2)} | ${fmt((merges / (4 * 300)) * 60, 2)} | ${fmt(freeSum / samples, 2)} | ${fmt((100 * allBondedN) / samples, 1)} | ${fmt(q(0.5))} | ${fmt(q(0.9))}`);
    }
}

function exp6_depth() {
    console.log('\nEXP6 RECURSION DEPTH — regime D f=0.273, 6 seeds x 120 s, init=orbit');
    console.log('depth | bodies | deep-child retention% (d<2.5x home at t=120) | wallHits | escapes | min bead r (configUV / CSS px @ hero 480)');
    for (const depth of [1, 2, 3]) {
        let retained = 0, total = 0, wall = 0, esc = 0; let minR = Infinity; let nBodies = 0;
        for (let sd = 1; sd <= 6; sd++) {
            const sys = makeSystem({ regime: 'D', f: 0.273, seed: 40 + sd, depth, initial: 'orbit' });
            nBodies = sys.bodies.length;
            for (const b of sys.bodies) if (b.parent >= 0) minR = Math.min(minR, b.r);
            let wallIn = false, stepIdx = 0;
            for (let t = 0; t < 120; t += DT) {
                step(sys, DT);
                if (++stepIdx % 24 !== 0) continue;
                let anyWall = false;
                for (let i = 1; i < sys.bodies.length; i++) {
                    const b = sys.bodies[i];
                    const edge = Math.hypot(b.x, b.y) + b.r;
                    if (edge > WALL) anyWall = true;
                    if (edge > ESCAPE) esc++;
                }
                if (anyWall && !wallIn) { wall++; wallIn = true; }
                if (!anyWall) wallIn = false;
            }
            for (let i = 1; i < sys.bodies.length; i++) {
                const b = sys.bodies[i];
                if (b.parent === 0) continue;
                const P = sys.bodies[b.parent];
                const d = Math.hypot(b.x - P.x, b.y - P.y);
                total++;
                if (d < 2.5 * b.aHome) retained++;
            }
        }
        const px = minR * 0.625 * 768; // hero: wrapper 480 CSS, canvas 1.6x = 768 CSS = 1 uv
        console.log(`${depth} | ${nBodies} | ${total ? fmt((100 * retained) / total, 1) : 'n/a'} | ${wall} | ${esc} | ${fmt(minR, 4)} / ${fmt(px, 1)}px`);
    }
}

function exp7_settle() {
    console.log('\nEXP7 SETTLE — KE band + time-to-return after click + freeze/resume determinism');
    const KE = (s) => {
        let e = 0;
        for (let i = 1; i < s.bodies.length; i++) {
            const b = s.bodies[i]; const m = b.r * b.r;
            e += 0.5 * m * (b.vx * b.vx + b.vy * b.vy);
        }
        return e;
    };
    const sys = makeSystem({ regime: 'D', f: 0.273, seed: 31, depth: 1, initial: 'orbit' });
    for (let t = 0; t < 20; t += DT) step(sys, DT);
    const kes = []; let stepIdx = 0;
    for (let t = 0; t < 60; t += DT) { step(sys, DT); if (++stepIdx % 24 === 0) kes.push(KE(sys)); }
    const mu = avg(kes), sd = Math.sqrt(avg(kes.map((k) => (k - mu) ** 2)));
    console.log(`ambient KE band: mean ${mu.toExponential(3)}, sigma ${sd.toExponential(3)} (${((sd / mu) * 100).toFixed(1)}% of mean)`);
    const times = [];
    for (let tr = 0; tr < 8; tr++) {
        const s2 = makeSystem({ regime: 'D', f: 0.273, seed: 60 + tr, depth: 1, initial: 'orbit' });
        for (let t = 0; t < 20; t += DT) step(s2, DT);
        for (let i = 1; i < s2.bodies.length; i++) {
            const b = s2.bodies[i]; const P = s2.bodies[b.parent];
            const dx = b.x - P.x, dy = b.y - P.y, d = Math.hypot(dx, dy) || 1e-9;
            b.vx += (dx / d) * 0.2; b.vy += (dy / d) * 0.2;
        }
        let inBand = 0, tSettle = NaN, si = 0;
        for (let t = 0; t < 90; t += DT) {
            step(s2, DT);
            if (++si % 24 !== 0) continue;
            const k = KE(s2);
            if (Math.abs(k - mu) < 3 * sd) { inBand += 24 * DT; if (inBand >= 2) { tSettle = t; break; } }
            else inBand = 0;
        }
        if (isFinite(tSettle)) times.push(tSettle);
    }
    console.log(`time-to-settle after J=0.20 click (KE within mu+-3sigma held 2 s): mean ${fmt(avg(times), 1)} s (n=${times.length}/8), max ${fmt(Math.max(...times), 1)} s`);
    const s3 = makeSystem({ regime: 'D', f: 0.273, seed: 5, depth: 1, initial: 'orbit' });
    for (let t = 0; t < 10; t += DT) step(s3, DT);
    const snap = JSON.stringify(getState(s3));
    const s4 = makeSystem({ regime: 'D', f: 0.273, seed: 5, depth: 1, initial: 'orbit' });
    for (let t = 0; t < 10; t += DT) step(s4, DT);
    setState(s4, JSON.parse(snap));
    for (let t = 0; t < 10; t += DT) { step(s3, DT); step(s4, DT); }
    const d = dist(getState(s3), getState(s4));
    console.log(`freeze/resume divergence after 10 s: ${d === 0 ? 'EXACT (0)' : d.toExponential(3)}`);
}

// insertion probability: single bonded bead kicked at angle theta from radial
function exp4b_insertion() {
    console.log('\nEXP4b ORBIT INSERTION — one bonded bead kicked at angle from radial, P(free at t=20 s), 24 trials');
    console.log('J \\ angle | 0 deg (radial) | 30 deg | 45 deg | 60 deg');
    for (const J of [0.26, 0.3, 0.34, 0.38]) {
        const cells = [];
        for (const ang of [0, 30, 45, 60]) {
            let stayFree = 0; const trials = 24;
            for (let tr = 0; tr < trials; tr++) {
                const sys = makeSystem({ regime: 'D', f: 0.273, seed: 7000 + tr, depth: 1, initial: 'bonded' });
                for (let t = 0; t < 30; t += DT) step(sys, DT);
                const b = sys.bodies[1]; const P = sys.bodies[0];
                const dx = b.x - P.x, dy = b.y - P.y, d = Math.hypot(dx, dy) || 1e-9;
                const ux = dx / d, uy = dy / d;
                const tx = -uy, ty = ux;
                const a = (ang * Math.PI) / 180;
                b.vx += J * (Math.cos(a) * ux + Math.sin(a) * tx);
                b.vy += J * (Math.cos(a) * uy + Math.sin(a) * ty);
                for (let t = 0; t < 20; t += DT) step(sys, DT);
                const dEnd = Math.hypot(b.x - P.x, b.y - P.y);
                if (dEnd > sepBar(P.r, b.r)) stayFree++;
            }
            cells.push(fmt((100 * stayFree) / 24, 0) + '%');
        }
        console.log(`${J} | ${cells.join(' | ')}`);
    }
}

// full-cycle operational state: init=orbit, kicks both ways, population mix
function exp5b_cycle(J, RATE_FULL) {
    console.log(`\nEXP5b FULL CYCLE (operational) — init=orbit, J=${J}, RATE_FULL=${RATE_FULL}/s, T=300 s, 4 seeds`);
    console.log('kick law: bonded -> radial-out with 35% tangential jitter; free -> random direction');
    console.log('amp | capture ev/min | fission ev/min | mean free | mixed-state% | eccMed(free) | eccP90(free) | maxEdge(configUV)');
    for (const amp of [0.0, 0.25, 0.5, 0.75, 1.0]) {
        let caps = 0, fiss = 0, freeSum = 0, samples = 0, mixedN = 0, maxEdge = 0;
        const eccs = [];
        for (let sd = 1; sd <= 4; sd++) {
            const sys = makeSystem({ regime: 'D', f: 0.273, seed: 900 + sd, depth: 1, initial: 'orbit' });
            const rng = mulberry32(1900 + sd);
            const nb = sys.bodies.length;
            const wasFree = new Array(nb).fill(true);
            const rMin = new Array(nb).fill(Infinity), rMax = new Array(nb).fill(0);
            let stepIdx = 0, winStart = 0;
            for (let t = 0; t < 300; t += DT) {
                if (rng() < RATE_FULL * amp * DT) {
                    const i = 1 + Math.floor(rng() * (nb - 1));
                    const b = sys.bodies[i]; const P = sys.bodies[b.parent];
                    const dx = b.x - P.x, dy = b.y - P.y, d = Math.hypot(dx, dy) || 1e-9;
                    const jj = J * (0.8 + rng() * 0.4);
                    if (d < sepBar(P.r, b.r)) {
                        const ux = dx / d, uy = dy / d, tx = -uy, ty = ux;
                        const tj = 0.35 * (rng() * 2 - 1);
                        const nrm = Math.hypot(1, tj);
                        b.vx += (jj * (ux + tj * tx)) / nrm; b.vy += (jj * (uy + tj * ty)) / nrm;
                    } else {
                        const th = rng() * 2 * Math.PI;
                        b.vx += jj * Math.cos(th); b.vy += jj * Math.sin(th);
                    }
                }
                step(sys, DT);
                if (++stepIdx % 24 !== 0) continue;
                let free = 0, bonded = 0;
                for (let i = 1; i < nb; i++) {
                    const b = sys.bodies[i]; const P = sys.bodies[b.parent];
                    const d = Math.hypot(b.x - P.x, b.y - P.y);
                    const isFree = d > sepBar(P.r, b.r);
                    const deepBond = d < P.r + b.r + kOf(P.r, b.r) * 0.5;
                    if (isFree && !wasFree[i]) { fiss++; wasFree[i] = true; }
                    if (deepBond && wasFree[i]) { caps++; wasFree[i] = false; }
                    if (isFree) { free++; rMin[i] = Math.min(rMin[i], d); rMax[i] = Math.max(rMax[i], d); }
                    else bonded++;
                    const edge = Math.hypot(b.x, b.y) + b.r;
                    if (edge > maxEdge) maxEdge = edge;
                }
                freeSum += free; samples++;
                if (free > 0 && bonded > 0) mixedN++;
                if (sys.t - winStart >= 10) {
                    for (let i = 1; i < nb; i++) {
                        if (rMax[i] > rMin[i] && isFinite(rMin[i]))
                            eccs.push((rMax[i] - rMin[i]) / (rMax[i] + rMin[i]));
                        rMin[i] = Infinity; rMax[i] = 0;
                    }
                    winStart = sys.t;
                }
            }
        }
        eccs.sort((a, b) => a - b);
        const q = (p) => (eccs.length ? eccs[Math.min(eccs.length - 1, Math.floor(p * eccs.length))] : NaN);
        console.log(`${amp} | ${fmt((caps / 1200) * 60, 2)} | ${fmt((fiss / 1200) * 60, 2)} | ${fmt(freeSum / samples, 2)} | ${fmt((100 * mixedN) / samples, 1)} | ${fmt(q(0.5))} | ${fmt(q(0.9))} | ${fmt(maxEdge)}`);
    }
}

// depth 2 with the reach-law-solved core radius
function exp6b_depth2() {
    console.log('\nEXP6b DEPTH-2 WITH REACH-SOLVED CORE — reach law 4.966*R <= 0.78 -> R=0.157; 6 seeds x 120 s');
    let retained = 0, total = 0, wall = 0, esc = 0; let maxEdge = 0;
    for (let sd = 1; sd <= 6; sd++) {
        const sys = makeSystem({ regime: 'D', f: 0.273, seed: 40 + sd, depth: 2, initial: 'orbit', rCore: 0.157 });
        let wallIn = false, stepIdx = 0;
        for (let t = 0; t < 120; t += DT) {
            step(sys, DT);
            if (++stepIdx % 24 !== 0) continue;
            let anyWall = false;
            for (let i = 1; i < sys.bodies.length; i++) {
                const b = sys.bodies[i];
                const edge = Math.hypot(b.x, b.y) + b.r;
                if (edge > maxEdge) maxEdge = edge;
                if (edge > WALL) anyWall = true;
                if (edge > ESCAPE) esc++;
            }
            if (anyWall && !wallIn) { wall++; wallIn = true; }
            if (!anyWall) wallIn = false;
        }
        for (let i = 1; i < sys.bodies.length; i++) {
            const b = sys.bodies[i];
            if (b.parent === 0) continue;
            const P = sys.bodies[b.parent];
            const d = Math.hypot(b.x - P.x, b.y - P.y);
            total++;
            if (d < 2.5 * b.aHome) retained++;
        }
    }
    const lam = lyapunov(() => makeSystem({ regime: 'D', f: 0.273, seed: 21, depth: 2, initial: 'orbit', rCore: 0.157 }));
    console.log(`retention ${fmt((100 * retained) / total, 1)}% | wallHits ${wall} | escapes ${esc} | maxEdge ${fmt(maxEdge)} | lambda ${fmt(lam, 4)}`);
    const sys = makeSystem({ regime: 'D', f: 0.273, seed: 1, depth: 2, initial: 'orbit', rCore: 0.157 });
    let minR = Infinity;
    for (const b of sys.bodies) if (b.parent > 0) minR = Math.min(minR, b.r);
    console.log(`leaf bead r=${fmt(minR, 4)} configUV = ${fmt(minR * 0.625 * 768, 1)} CSS px @ hero 480; neck k0 = ${fmt((minR / 3) * 0.625 * 768, 1)} px`);
}

// final cell pin: 4-seed lambda + relative settle signal
function exp9_pin() {
    console.log('\nEXP9 CELL PIN — regime D, f=0.273, n=1.7, depth 1, 4-seed lambda');
    const lams = [];
    for (const sd of [11, 22, 33, 44]) {
        lams.push(lyapunov(() => makeSystem({ regime: 'D', f: 0.273, seed: sd, depth: 1, initial: 'orbit' })));
    }
    const mu = avg(lams), sd0 = Math.sqrt(avg(lams.map((l) => (l - mu) ** 2)));
    console.log(`lambda: mean ${fmt(mu, 4)} +- ${fmt(sd0, 4)} (seeds: ${lams.map((l) => fmt(l, 3)).join(', ')})`);
    const KE = (s) => {
        let e = 0;
        for (let i = 1; i < s.bodies.length; i++) {
            const b = s.bodies[i]; const m = b.r * b.r;
            e += 0.5 * m * (b.vx * b.vx + b.vy * b.vy);
        }
        return e;
    };
    const times = [];
    for (let tr = 0; tr < 8; tr++) {
        const s2 = makeSystem({ regime: 'D', f: 0.273, seed: 60 + tr, depth: 1, initial: 'orbit' });
        for (let t = 0; t < 20; t += DT) step(s2, DT);
        for (let i = 1; i < s2.bodies.length; i++) {
            const b = s2.bodies[i]; const P = s2.bodies[b.parent];
            const dx = b.x - P.x, dy = b.y - P.y, d = Math.hypot(dx, dy) || 1e-9;
            b.vx += (dx / d) * 0.26; b.vy += (dy / d) * 0.26;
        }
        let fast = KE(s2), slow = fast, inBand = 0, tSettle = NaN, si = 0;
        const aF = 1 - Math.exp((-24 * DT) / 0.5), aS = 1 - Math.exp((-24 * DT) / 8);
        for (let t = 0; t < 120; t += DT) {
            step(s2, DT);
            if (++si % 24 !== 0) continue;
            const k = KE(s2);
            fast += aF * (k - fast); slow += aS * (k - slow);
            const rel = Math.abs(fast - slow) / (slow || 1e-12);
            if (rel < 0.08) { inBand += 24 * DT; if (inBand >= 2) { tSettle = t; break; } }
            else inBand = 0;
        }
        if (isFinite(tSettle)) times.push(tSettle);
    }
    console.log(`relative settle signal (|KEfast-KEslow|/KEslow < 0.08 held 2 s) after J=0.26 click: ${times.length}/8 settle; mean ${fmt(avg(times), 1)} s, max ${fmt(Math.max(...times), 1)} s`);
}

// THE CURE CELL: two-state floor + event engine. Fission event: bonded bead ->
// target=free + kick (radial + 35% tangential jitter). Capture event: free bead ->
// target=bonded (floor drops; physics infalls; capillary catches). Rates: fission
// F0*ampF, capture C0*(1 - 0.6*ampF) per second. Depth-2: parent capture waits for
// children bonded (recursive collapse); children of beads carry the viscous limiter.
function runCure(o) {
    const sys = makeSystem({ regime: 'D', f: 0.273, seed: o.seed, depth: o.depth, initial: 'orbit', rCore: o.rCore, twoState: true });
    const rng = mulberry32(o.seed * 7 + 1);
    const nb = sys.bodies.length;
    const wasFree = new Array(nb).fill(true);
    const pending = new Set(); // parents waiting for child collapse
    let caps = 0, fiss = 0, freeSum = 0, samples = 0, mixedN = 0, maxEdge = 0, wallHits = 0, wallIn = false;
    const rMin = new Array(nb).fill(Infinity), rMax = new Array(nb).fill(0);
    const eccs = []; const freeTrace = [];
    let stepIdx = 0, winStart = 0;
    const childrenOf = (i) => sys.bodies.filter((b) => b.parent === i);
    const isBonded = (i) => {
        const b = sys.bodies[i]; const P = sys.bodies[b.parent];
        return Math.hypot(b.x - P.x, b.y - P.y) < P.r + b.r + kOf(P.r, b.r) * 0.5;
    };
    for (let t = 0; t < o.T; t += DT) {
        // fission attempts
        if (rng() < o.F0 * o.amp * DT) {
            const cands = [];
            for (let i = 1; i < nb; i++) {
                const b = sys.bodies[i];
                if (b.target === 'bonded' && childrenOf(i).every((c) => c.target === 'bonded')) cands.push(i);
            }
            if (cands.length) {
                const i = cands[Math.floor(rng() * cands.length)];
                const b = sys.bodies[i]; const P = sys.bodies[b.parent];
                b.target = 'free';
                const dx = b.x - P.x, dy = b.y - P.y, d = Math.hypot(dx, dy) || 1e-9;
                const ux = dx / d, uy = dy / d, tx = -uy, ty = ux;
                const tj = 0.35 * (rng() * 2 - 1);
                const nrm = Math.hypot(1, tj);
                const jj = o.J * (0.8 + rng() * 0.4);
                b.vx += (jj * (ux + tj * tx)) / nrm; b.vy += (jj * (uy + tj * ty)) / nrm;
            }
        }
        // capture events
        if (rng() < o.C0 * (1 - 0.6 * o.amp) * DT) {
            const cands = [];
            for (let i = 1; i < nb; i++) if (sys.bodies[i].target === 'free' && !pending.has(i)) cands.push(i);
            if (cands.length) {
                const i = cands[Math.floor(rng() * cands.length)];
                const kids = childrenOf(i);
                if (kids.every((c) => c.target === 'bonded' && isBonded(c.id))) sys.bodies[i].target = 'bonded';
                else { pending.add(i); for (const c of kids) c.target = 'bonded'; }
            }
        }
        // resolve pending collapses
        for (const i of [...pending]) {
            const kids = childrenOf(i);
            if (kids.every((c) => isBonded(c.id))) { sys.bodies[i].target = 'bonded'; pending.delete(i); }
        }
        step(sys, DT);
        if (++stepIdx % 24 !== 0) continue;
        let free = 0, bonded = 0;
        for (let i = 1; i < nb; i++) {
            const b = sys.bodies[i]; const P = sys.bodies[b.parent];
            const d = Math.hypot(b.x - P.x, b.y - P.y);
            const isFree = d > sepBar(P.r, b.r);
            if (isFree && !wasFree[i]) { fiss++; wasFree[i] = true; }
            if (!isFree && wasFree[i] && d < P.r + b.r + kOf(P.r, b.r) * 0.5) { caps++; wasFree[i] = false; }
            if (isFree) { free++; rMin[i] = Math.min(rMin[i], d); rMax[i] = Math.max(rMax[i], d); }
            else bonded++;
            const edge = Math.hypot(b.x, b.y) + b.r;
            if (edge > maxEdge) maxEdge = edge;
        }
        let anyWall = false;
        for (let i = 1; i < nb; i++) {
            const b = sys.bodies[i];
            if (Math.hypot(b.x, b.y) + b.r > WALL) anyWall = true;
        }
        if (anyWall && !wallIn) { wallHits++; wallIn = true; }
        if (!anyWall) wallIn = false;
        freeSum += free; samples++;
        if (free > 0 && bonded > 0) mixedN++;
        freeTrace.push(free);
        if (sys.t - winStart >= 10) {
            for (let i = 1; i < nb; i++) {
                if (rMax[i] > rMin[i] && isFinite(rMin[i]))
                    eccs.push((rMax[i] - rMin[i]) / (rMax[i] + rMin[i]));
                rMin[i] = Infinity; rMax[i] = 0;
            }
            winStart = sys.t;
        }
    }
    eccs.sort((a, b) => a - b);
    const q = (p) => (eccs.length ? eccs[Math.min(eccs.length - 1, Math.floor(p * eccs.length))] : NaN);
    const half = Math.floor(freeTrace.length / 2);
    const drain = avg(freeTrace.slice(half)) - avg(freeTrace.slice(0, half));
    return {
        capsPerMin: (caps / o.T) * 60, fissPerMin: (fiss / o.T) * 60,
        meanFree: freeSum / samples, mixedPct: (100 * mixedN) / samples,
        eccMed: q(0.5), eccP90: q(0.9), maxEdge, wallHits, drain,
    };
}

function exp5c_cure() {
    console.log('\nEXP5c CURE CELL (two-state floor) — depth 1, rCore=0.187, J=0.26, F0=0.06/s, C0=0.03/s, T=300 s, 4 seeds');
    console.log('amp | capture/min | fission/min | mean free | mixed% | eccMed | eccP90 | maxEdge | wallHits | drain(2nd-1st half)');
    for (const amp of [0.0, 0.25, 0.5, 0.75, 1.0]) {
        const acc = [];
        for (let sd = 1; sd <= 4; sd++) acc.push(runCure({ seed: 900 + sd, depth: 1, rCore: 0.187, T: 300, J: 0.26, F0: 0.06, C0: 0.03, amp }));
        const m = (k) => avg(acc.map((a) => a[k]));
        console.log(`${amp} | ${fmt(m('capsPerMin'), 2)} | ${fmt(m('fissPerMin'), 2)} | ${fmt(m('meanFree'), 2)} | ${fmt(m('mixedPct'), 1)} | ${fmt(m('eccMed'))} | ${fmt(m('eccP90'))} | ${fmt(Math.max(...acc.map((a) => a.maxEdge)))} | ${acc.reduce((s, a) => s + a.wallHits, 0)} | ${fmt(m('drain'), 2)}`);
    }
}

function exp6c_depth2cure() {
    const rc = parseFloat(process.argv[3] ?? '0.157');
    console.log(`\nEXP6c DEPTH-2 CURE — rCore=${rc}, two-state + collapse cascade + viscous limiter, amp 0.5, 6 seeds x 300 s`);
    const acc = [];
    for (let sd = 1; sd <= 6; sd++) acc.push(runCure({ seed: 40 + sd, depth: 2, rCore: rc, T: 300, J: 0.22, F0: 0.06, C0: 0.03, amp: 0.5 }));
    const m = (k) => avg(acc.map((a) => a[k]));
    console.log(`capture/min ${fmt(m('capsPerMin'), 2)} | fission/min ${fmt(m('fissPerMin'), 2)} | mean free ${fmt(m('meanFree'), 2)} | mixed% ${fmt(m('mixedPct'), 1)} | eccMed ${fmt(m('eccMed'))} | maxEdge ${fmt(Math.max(...acc.map((a) => a.maxEdge)))} | wallHits ${acc.reduce((s, a) => s + a.wallHits, 0)} | drain ${fmt(m('drain'), 2)}`);
}

// driven lambda: both twins get the IDENTICAL kick tape (conditional chaos of the driven flow)
function lyapunovDriven(mkOpts, T = 60, transient = 10) {
    const mk = () => makeSystem(mkOpts);
    const A = mk(), B = mk();
    // pre-generate kick tape: {t, i, jx, jy} at rate F0*amp, J=0.26 radial+tangential vs current pos
    // NOTE: to keep the tape state-independent, kicks are absolute random directions.
    const rng = mulberry32(mkOpts.seed * 13 + 5);
    const tape = [];
    for (let t = 0; t < transient + T; t += DT) {
        if (rng() < 0.03 * DT * 240) { /* keep draw parity */ }
        if (rng() < 0.05 * DT) {
            const th = rng() * 2 * Math.PI;
            tape.push({ t, i: 1 + Math.floor(rng() * 3), jx: 0.26 * Math.cos(th), jy: 0.26 * Math.sin(th) });
        }
    }
    let ti = 0;
    const stepD = (sys) => {
        while (ti < tape.length && tape[ti].t <= sys.t) {
            const k = tape[ti];
            if (k.i < sys.bodies.length) { sys.bodies[k.i].vx += k.jx; sys.bodies[k.i].vy += k.jy; }
            ti++;
        }
        step(sys, DT);
    };
    // twins must consume the same tape: track per-system index
    let tiA = 0, tiB = 0;
    const stepFor = (sys, which) => {
        let idx = which === 'A' ? tiA : tiB;
        while (idx < tape.length && tape[idx].t <= sys.t) {
            const k = tape[idx];
            if (k.i < sys.bodies.length) { sys.bodies[k.i].vx += k.jx; sys.bodies[k.i].vy += k.jy; }
            idx++;
        }
        if (which === 'A') tiA = idx; else tiB = idx;
        step(sys, DT);
    };
    for (let t = 0; t < transient; t += DT) { stepFor(A, 'A'); stepFor(B, 'B'); }
    const d0 = 1e-7;
    const s = getState(A); s[0] += d0; setState(B, s);
    tiB = tiA;
    let sum = 0, count = 0;
    const tau = 0.25, steps = Math.round(tau / DT);
    for (let t = 0; t < T; t += tau) {
        for (let k = 0; k < steps; k++) { stepFor(A, 'A'); stepFor(B, 'B'); }
        const sa = getState(A), sb = getState(B);
        const d = dist(sa, sb);
        if (d > 0) { sum += Math.log(d / d0); count++; }
        for (let i = 0; i < sa.length; i++) sb[i] = sa[i] + ((sb[i] - sa[i]) * d0) / (d || d0);
        setState(B, sb);
        tiB = tiA;
    }
    return sum / (count * tau);
}

function exp9b_drivenLambda() {
    console.log('\nEXP9b DRIVEN LAMBDA — identical kick tape to both twins (amp-0.5-equivalent, J=0.26), rCore=0.187, two-state, 4 seeds');
    const lams = [];
    for (const sd of [11, 22, 33, 44]) {
        lams.push(lyapunovDriven({ regime: 'D', f: 0.273, seed: sd, depth: 1, initial: 'orbit', rCore: 0.187, twoState: true }));
    }
    const mu = avg(lams), sd0 = Math.sqrt(avg(lams.map((l) => (l - mu) ** 2)));
    console.log(`driven lambda: mean ${fmt(mu, 4)} +- ${fmt(sd0, 4)} (seeds: ${lams.map((l) => fmt(l, 3)).join(', ')})`);
    // undriven at same cell for contrast
    const lams0 = [];
    for (const sd of [11, 22, 33, 44]) {
        lams0.push(lyapunov(() => makeSystem({ regime: 'D', f: 0.273, seed: sd, depth: 1, initial: 'orbit', rCore: 0.187, twoState: true })));
    }
    console.log(`undriven lambda same cell: mean ${fmt(avg(lams0), 4)} (seeds: ${lams0.map((l) => fmt(l, 3)).join(', ')})`);
}

const which = process.argv[2] ?? 'all';
if (which === 'all' || which === '0') exp0_bar();
if (which === 'all' || which === '1') exp1_regimes();
if (which === 'all' || which === '2') exp2_fsweep();
if (which === 'all' || which === '3') exp3_nsweep();
if (which === 'all' || which === '4') exp4_fission();
if (which === 'all' || which === '5') exp5_cadence(parseFloat(process.argv[3] ?? '0.20'), parseFloat(process.argv[4] ?? '0.05'));
if (which === 'all' || which === '6') exp6_depth();
if (which === 'all' || which === '7') exp7_settle();
if (which === 'all' || which === '8') exp8_ecclife();
if (which === 'all' || which === '4b') exp4b_insertion();
if (which === 'all' || which === '5b') exp5b_cycle(parseFloat(process.argv[3] ?? '0.26'), parseFloat(process.argv[4] ?? '0.08'));
if (which === 'all' || which === '6b') exp6b_depth2();
if (which === 'all' || which === '9') exp9_pin();
if (which === 'all' || which === '5c') exp5c_cure();
if (which === 'all' || which === '6c') exp6c_depth2cure();
if (which === 'all' || which === '9b') exp9b_drivenLambda();
