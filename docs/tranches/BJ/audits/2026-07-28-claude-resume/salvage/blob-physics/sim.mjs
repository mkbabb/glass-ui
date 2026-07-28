// sim.mjs — the blob-colony physics core (rev 2).
// Config-UV space (the space BLOB_CONFIG_DEFAULTS lives in). POS_SCALE = 1/1.6 maps it
// to canvas-UV, so the canvas half-extent 0.5 uv is config 0.8.
//
// REV-2 NOTE (a defect found in rev 1 of THIS instrument, recorded because it is a
// design finding, not a bug): approach-only contact damping with no energy source is
// strictly dissipative — every regime circularised and sank (measured rBar 0.271 against
// a seed radius of 0.50, ecc 0.015 from a seeded 0.34). A colony that goos must dissipate;
// a colony that lives must be pumped. The pump is ONE scalar — a weak-coupling thermostat
// on relative kinetic energy — and it is the same scalar as mood, as fission drive, and as
// the settle signal. Containment then follows from an energy inequality, not from a clamp.
//
// Four cohesion regimes, one integrator, one instrument set:
//   A COORDINATED — the shipped closed-form kinematic orbit table (no dynamics at all)
//   B TETHERED    — dynamics + a position spring onto that coordinated guide
//   C EMERGENT    — dynamics + thermostat, NO geometric skeleton whatsoever
//   D ENVELOPE    — dynamics + thermostat + a one-sided radial envelope; angle free

export const WALL = 0.8; // config-space canvas edge (0.5 uv ÷ POS_SCALE)

export function mulberry32(a) {
    return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export const DEFAULTS = {
    R: 0.22,
    k0: 0.045322,
    n: 1.7,
    G: 1.0,
    sigma: 3.0,     // capillary bridge strength (per unit mass)
    cDamp: 1.2,     // approach-only contact damping
    kEnv: 40,       // envelope stiffness (regime D)
    f: 0.30,        // envelope half-band, fraction of a
    kTether: 40,    // regime-B position-spring stiffness
    repel: 240,     // contact stiffness on overlap (a contact, not a toy spring)
    massExp: 2,
    rMaxTarget: 0.62, // the containment ceiling (config-UV) — the ONE liveliness scalar
    epsScale: 1.0,    // mood/arousal gain on ε (>1 = tighter, <1 = wider)
    subShrink: 0.34,  // depth≥2 ceiling, as a fraction of the depth-1 ceiling
    drive: 0.80,      // THE ONE SCALAR: 0 = permanently bonded, 1 = the canvas ceiling
    edgeUV: 0.475,    // canvas half-extent minus the 5% frame margin
    tauT: 6.0,        // ε coupling time (s) — weak; orbits stay orbits between goo events
    walled: false,
};

export function makeTree(spec, rng) {
    const bodies = [];
    const massExp = spec.massExp ?? 2;
    const core = { id: 0, parent: -1, depth: 0, r: spec.R, m: Math.pow(spec.R, massExp),
                   x: 0, y: 0, vx: 0, vy: 0, a: 0, e: 0, th0: 0, fixed: true };
    bodies.push(core);
    const addChildren = (parent, count, radii, aBase, depth) => {
        for (let i = 0; i < count; i++) {
            const r = radii[i % radii.length];
            const a = aBase * (0.92 + 0.16 * rng());
            const th = (i / count) * Math.PI * 2 + rng() * 0.9;
            const e = spec.ecc * (0.55 + 0.9 * rng());
            const rs = a * (1 - e);
            bodies.push({
                id: bodies.length, parent: parent.id, depth, r,
                m: Math.pow(r, massExp),
                x: parent.x + rs * Math.cos(th), y: parent.y + rs * Math.sin(th),
                vx: 0, vy: 0, a, e, th0: th, fixed: false,
            });
        }
    };
    addChildren(core, spec.count, spec.ladder, spec.a, 1);
    if (spec.depth >= 2 && spec.subPer > 0) {
        for (const p of bodies.filter((b) => b.depth === 1)) {
            addChildren(p, spec.subPer, spec.ladder.map((r) => r * spec.subScale),
                (p.r + spec.ladder[0] * spec.subScale) * spec.subOrbit, 2);
        }
    }
    if (spec.depth >= 3 && spec.subPer > 0) {
        for (const p of bodies.filter((b) => b.depth === 2)) {
            addChildren(p, Math.max(1, spec.subPer - 1),
                spec.ladder.map((r) => r * spec.subScale * spec.subScale),
                (p.r + spec.ladder[0] * spec.subScale * spec.subScale) * spec.subOrbit, 3);
        }
    }
    return bodies;
}

export function seedVelocities(bodies, P) {
    for (const b of bodies) {
        if (b.fixed) continue;
        const p = bodies[b.parent];
        const dx = b.x - p.x, dy = b.y - p.y;
        const d = Math.hypot(dx, dy) || 1e-9;
        const vc = Math.sqrt((P.G * p.m) / Math.pow(d, P.n - 1));
        const vp = vc * Math.sqrt(1 + (b.e ?? 0));
        b.vx = p.vx + (-dy / d) * vp;
        b.vy = p.vy + (dx / d) * vp;
    }
}

/**
 * Escape speed from the core at radius d under the exponent-n central law:
 *   U(d) = −G·m_core /((n−1)·d^(n−1)),  U(∞)=0  ⇒  v_esc = √(2G·m_core/((n−1)·d^(n−1)))
 * The containment law is this inequality, never a wall.
 */
export function vEscape(P, mCore, d) {
    return Math.sqrt((2 * P.G * mCore) / ((P.n - 1) * Math.pow(d, P.n - 1)));
}
/** Turning radius reached by a purely radial launch at speed v from d. */
export function apoapsisFromSpeed(P, mCore, d, v) {
    const c = (P.G * mCore) / (P.n - 1);
    const inv = 1 / Math.pow(d, P.n - 1) - (v * v) / (2 * c);
    if (inv <= 0) return Infinity;
    return Math.pow(1 / inv, 1 / (P.n - 1));
}

function forces(bodies, P, regime, t, out) {
    const N = bodies.length;
    out.fill(0);
    for (let i = 1; i < N; i++) {
        const b = bodies[i];
        const p = bodies[b.parent];
        let dx = b.x - p.x, dy = b.y - p.y;
        let d = Math.hypot(dx, dy);
        if (d < 1e-9) { d = 1e-9; dx = 1e-9; dy = 0; }
        const ux = dx / d, uy = dy / d;
        const rdot = (b.vx - p.vx) * ux + (b.vy - p.vy) * uy;

        // 1 — central attraction, exponent n, interior solution inside the parent skin.
        //     n≠2 ⇒ apsidal precession: no orbit ever re-traces.
        let fr = centralAccel(P, p.m, d, p.r) * b.m;

        // 2 — the capillary contact well. Its MINIMUM is at gap 0 (the bead docked on the
        //     skin — the resting pose), attractive out to gap = 2k₀ (exactly as far as the
        //     PAINTED field stays joined, the E1 law), stiff-repulsive on overlap.
        const contact = p.r + b.r;
        const gap = d - contact;
        const gb = 2 * P.k0;
        if (gap < gb) {
            if (gap >= 0) fr += -P.sigma * b.m * (1 - gap / gb);
            else fr += -P.repel * b.m * gap - P.cDamp * b.m * rdot;
            if (gap >= 0 && rdot < 0) fr += -P.cDamp * b.m * rdot;  // 3 — approach-only, the goo
        }

        // 4 — the skeleton, per regime. D owns the RADIAL ENVELOPE ONLY.
        if (regime === "D") {
            const lo = b.a * (1 - P.f), hi = b.a * (1 + P.f);
            const cc = 2 * Math.sqrt(P.kEnv) * b.m;
            if (d < lo) fr += -P.kEnv * b.m * (d - lo) - cc * rdot;
            else if (d > hi) fr += -P.kEnv * b.m * (d - hi) - cc * rdot;
        }

        out[2 * i] += fr * ux; out[2 * i + 1] += fr * uy;
        out[2 * b.parent] -= fr * ux; out[2 * b.parent + 1] -= fr * uy;

        if (regime === "B") {
            const w = Math.sqrt((P.G * p.m) / Math.pow(b.a, P.n + 1));
            const ang = w * t + b.th0;
            const e = b.e ?? 0;
            const gx = p.x + b.a * (1 - e) * Math.cos(ang);
            const gy = p.y + b.a * (1 + e) * Math.sin(ang);
            const cc = 2 * Math.sqrt(P.kTether) * b.m;
            out[2 * i] += -P.kTether * b.m * (b.x - gx) - cc * (b.vx - p.vx);
            out[2 * i + 1] += -P.kTether * b.m * (b.y - gy) - cc * (b.vy - p.vy);
        }
    }
    for (let i = 1; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const A = bodies[i], B = bodies[j];
            const dx = B.x - A.x, dy = B.y - A.y;
            const d = Math.hypot(dx, dy) || 1e-9;
            const pen = A.r + B.r - d;
            if (pen > 0) {
                const f = P.repel * Math.min(A.m, B.m) * pen;
                const ux = dx / d, uy = dy / d;
                out[2 * i] -= f * ux; out[2 * i + 1] -= f * uy;
                out[2 * j] += f * ux; out[2 * j + 1] += f * uy;
            }
        }
    }
    if (P.walled) {
        for (let i = 1; i < N; i++) {
            const b = bodies[i];
            const d = Math.hypot(b.x, b.y) || 1e-9;
            const lim = WALL - b.r;
            if (d > lim) {
                out[2 * i] += -P.kEnv * b.m * (d - lim) * (b.x / d);
                out[2 * i + 1] += -P.kEnv * b.m * (d - lim) * (b.y / d);
            }
        }
    }
}

/**
 * Specific potential of the exponent-n central law, WITH an interior solution.
 * Outside the parent skin the law is F ∝ d⁻ⁿ (U(∞)=0). Inside it, the enclosed mass
 * falls off and the force goes linearly to zero at the centre — the honest law for a
 * body of finite radius, and the one that removes the singular slingshot that threw
 * 5,234 beads off-canvas in rev 3 of this instrument.
 */
export function specU(P, mParent, d, rp) {
    const Rp = rp ?? P.R;
    const c = (P.G * mParent) / (P.n - 1);
    if (d >= Rp) return -c / Math.pow(d, P.n - 1);
    const k = (P.G * mParent) / Math.pow(Rp, P.n + 1);   // F_in = -k·d
    return -c / Math.pow(Rp, P.n - 1) - 0.5 * k * (Rp * Rp - d * d);
}
export function centralAccel(P, mParent, d, rp) {
    const Rp = rp ?? P.R;
    if (d >= Rp) return -(P.G * mParent) / Math.pow(d, P.n);
    return -((P.G * mParent) / Math.pow(Rp, P.n + 1)) * d;
}
/** Specific orbital energy of a body about its parent. ε<0 ⇔ bound — the containment law. */
export function specE(bodies, b, P) {
    const p = bodies[b.parent];
    const d = Math.max(Math.hypot(b.x - p.x, b.y - p.y), 1e-6);
    const vx = b.vx - p.vx, vy = b.vy - p.vy;
    return 0.5 * (vx * vx + vy * vy) + specU(P, p.m, d, p.r);
}
/** Turning radius implied by a specific energy (the analytic containment ceiling). */
export function rMaxOf(P, mParent, eps, rp) {
    if (eps >= 0) return Infinity;
    return Math.pow(-(P.G * mParent) / ((P.n - 1) * eps), 1 / (P.n - 1));
}

/**
 * THE CONTAINMENT LAW, exact.
 * Effective potential V(r) = L²/(2r²) + U(r). Beyond its minimum V rises monotonically
 * to 0, so a body whose specific energy satisfies ε ≤ V(r_ceil) has its apoapsis at or
 * inside r_ceil — for ANY angular momentum, with no wall, no position clamp, and no
 * limit whatsoever on how far the bead separates from the skin below that ceiling.
 */
export function epsCeiling(P, mParent, L, rCeil, rp) {
    return (L * L) / (2 * rCeil * rCeil) + specU(P, mParent, rCeil, rp);
}

/** Specific potential of the capillary bridge. ψ(0) = −W, ψ(≥2k₀) = 0. */
export function bridgeU(P, d, rSum) {
    const gb = 2 * P.k0;
    const gap = d - rSum;
    if (gap >= gb) return 0;
    const g = Math.max(gap, 0);
    return -(P.sigma * gb * 0.5) * (1 - g / gb) ** 2;
}

/**
 * THE SETTLE SIGNAL — one predicate, closed form, no lookahead:
 *   settled ⇔ ∀ beads:  ½v² + U(d) + ψ(gap)  ≤  L²/(2·r_b²) + U(r_b),  r_b = R+r+2k₀
 * i.e. no bead has the energy to reach the radius at which the painted field breaks.
 * True ⇒ nothing can visibly happen ⇒ the loop may park with no scheduled event.
 */
export function settledColony(bodies, P) {
    for (const b of bodies) {
        if (b.fixed) continue;
        const p = bodies[b.parent];
        const dx = b.x - p.x, dy = b.y - p.y;
        const vx = b.vx - p.vx, vy = b.vy - p.vy;
        const d = Math.max(Math.hypot(dx, dy), 1e-6);
        const L = Math.abs(dx * vy - dy * vx);
        const rSum = p.r + b.r;
        const rb = rSum + 2 * P.k0 + 0.25 * b.r;   // hysteresis: a quarter-bead of margin
        const E = 0.5 * (vx * vx + vy * vy) + specU(P, p.m, d, p.r) + bridgeU(P, d, rSum);
        if (E > (L * L) / (2 * rb * rb) + specU(P, p.m, rb, p.r)) return false;
    }
    return true;
}
/** ε for a chosen containment ceiling — the inverse, which is how the spec derives it. */
export function epsForRMax(P, mParent, rMax, rp) {
    return specU(P, mParent, rMax, rp);
}

/**
 * THE PUMP, rev 3 — a weak per-body coupling on SPECIFIC ORBITAL ENERGY.
 * Rev-2's global KE thermostat is recorded as a measured failure: in a soft (n<2) well
 * a bead that climbs converts KE→PE, the global KE reading falls, the thermostat pumps
 * harder, and the colony blows apart (measured rBar 20.9, 19,810 escapes, λ 1.54).
 * Targeting ε instead is stable BY CONSTRUCTION: ε<0 is boundedness, and the turning
 * radius is a closed form. Angular momentum is left entirely free, so eccentricity and
 * precession stay emergent.
 */
export function thermostat(bodies, P, dt) {
    if (!(P.tauT > 0)) return 1;
    for (const b of bodies) {
        if (b.fixed) continue;
        const p = bodies[b.parent];
        const ceil = P.rMaxTarget * (b.depth > 1 ? P.subShrink : 1);
        const target = epsForRMax(P, p.m, ceil / P.epsScale, p.r);
        const d = Math.max(Math.hypot(b.x - p.x, b.y - p.y), 1e-6);
        const u = specU(P, p.m, d, p.r);
        const eps = specE(bodies, b, P);
        const keWant = Math.max(1e-9, target - u);
        const keNow = Math.max(1e-12, eps - u);
        let s = target - u > 0
            ? Math.min(1.02, Math.max(0.98, Math.sqrt(1 + (dt / P.tauT) * (keWant / keNow - 1)) || 1))
            : 1;
        // THE CONTAINMENT INVARIANT — ε is never allowed above the ceiling's energy.
        // This bounds the TURNING RADIUS analytically (rMaxOf(ε)=ceiling) without ever
        // touching position, direction, or separation: it is an energy law, not a clamp.
        const rvx = (b.vx - p.vx) * s, rvy = (b.vy - p.vy) * s;
        const Lcur = Math.abs(((b.x - p.x) * rvy - (b.y - p.y) * rvx));
        const cap = epsCeiling(P, p.m, Lcur, ceil, p.r);
        const epsAfter = 0.5 * (rvx * rvx + rvy * rvy) + u;
        if (d <= ceil && epsAfter > cap) {
            const keCap = Math.max(1e-12, cap - u);
            s *= Math.sqrt(keCap / Math.max(1e-12, 0.5 * (rvx * rvx + rvy * rvy)));
        }
        if (d > ceil) {
            const ux2 = (b.x - p.x) / d, uy2 = (b.y - p.y) / d;
            const vrad = rvx * ux2 + rvy * uy2;
            if (vrad > 0) { b.vx = p.vx + (rvx - vrad * ux2) / s; b.vy = p.vy + (rvy - vrad * uy2) / s; }
        }
        b.vx = p.vx + (b.vx - p.vx) * s;
        b.vy = p.vy + (b.vy - p.vy) * s;
    }
    return 1;
}

export function step(bodies, P, regime, t, dt, scratch) {
    const N = bodies.length;
    forces(bodies, P, regime, t, scratch);
    for (let i = 1; i < N; i++) {
        const b = bodies[i];
        b.vx += (scratch[2 * i] / b.m) * 0.5 * dt;
        b.vy += (scratch[2 * i + 1] / b.m) * 0.5 * dt;
        b.x += b.vx * dt; b.y += b.vy * dt;
    }
    forces(bodies, P, regime, t + dt, scratch);
    for (let i = 1; i < N; i++) {
        const b = bodies[i];
        b.vx += (scratch[2 * i] / b.m) * 0.5 * dt;
        b.vy += (scratch[2 * i + 1] / b.m) * 0.5 * dt;
    }
    if (regime === "D" || regime === "E") thermostat(bodies, P, dt);
    else if (regime === "F") integralPump(bodies, P, dt);
}

/** Regime A: the shipped closed form — orbitPos(), satelliteKinematics.ts:75-98. */
export function kinematicA(bodies, P, t) {
    for (const b of bodies) {
        if (b.fixed) continue;
        const p = bodies[b.parent];
        const w = Math.sqrt((P.G * p.m) / Math.pow(b.a, P.n + 1));
        const ang = w * t + b.th0;
        const e = b.e ?? 0;
        const wob = 0.025 * Math.sin(0.15 * t) + 0.017 * Math.sin(0.3 * t + 1.3);
        b.x = p.x + (b.a * (1 - e) + wob) * Math.cos(ang);
        b.y = p.y + (b.a * (1 + e) + wob) * Math.sin(ang);
    }
}

export const cloneBodies = (bodies) => bodies.map((b) => ({ ...b }));
export function stateVec(bodies) {
    const v = [];
    for (let i = 1; i < bodies.length; i++) v.push(bodies[i].x, bodies[i].y, bodies[i].vx, bodies[i].vy);
    return v;
}
export function dist(a, b) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
    return Math.sqrt(s);
}

/** Normalised spectral entropy of a scalar series — 0 = one tone (a movie), 1 = white. */
export function spectralEntropy(series, take = 512) {
    const N = Math.min(take, 1 << Math.floor(Math.log2(series.length)));
    if (N < 32) return 0;
    const stride = Math.floor(series.length / N);
    const x = [];
    for (let i = 0; i < N; i++) x.push(series[i * stride]);
    const mean = x.reduce((a, b) => a + b, 0) / N;
    for (let i = 0; i < N; i++) x[i] -= mean;
    const P = [];
    for (let k = 1; k < N / 2; k++) {
        let re = 0, im = 0;
        for (let i = 0; i < N; i++) {
            const w = (-2 * Math.PI * k * i) / N;
            re += x[i] * Math.cos(w); im += x[i] * Math.sin(w);
        }
        P.push(re * re + im * im);
    }
    const tot = P.reduce((a, b) => a + b, 0);
    if (tot <= 0) return 0;
    let H = 0;
    for (const p of P) { const q = p / tot; if (q > 0) H -= q * Math.log(q); }
    return H / Math.log(P.length);
}


/**
 * THE INTEGRAL PUMP (regime F) — the skeleton owns exactly TWO numbers per body: the
 * orbit's two turning radii (periapsis, apoapsis). Those fix the specific energy ε and
 * the specific angular momentum L; phase, orientation, apsidal precession, mutual
 * scattering, bridge capture and every break stay free. Both targets are derived from
 * geometry the design already owns — the contact radius R+r, the break radius R+r+2k₀,
 * and the containment ceiling — so neither is a minted decimal.
 *
 *   L² = 2·(U(r_a) − U(r_p)) / (1/r_p² − 1/r_a²)      ε = L²/(2r_p²) + U(r_p)
 */
export function turningIntegrals(P, mParent, rp, ra, rPar) {
    const Up = specU(P, mParent, rp, rPar), Ua = specU(P, mParent, ra, rPar);
    const L2 = (2 * (Ua - Up)) / (1 / (rp * rp) - 1 / (ra * ra));
    const eps = L2 / (2 * rp * rp) + Up;
    return { L: Math.sqrt(Math.max(L2, 0)), eps };
}

export function integralPump(bodies, P, dt) {
    if (!(P.tauT > 0)) return;
    const EDGE = P.edgeUV ?? 0.475, POS = 1 / 1.6;
    for (const b of bodies) {
        if (b.fixed) continue;
        const p = bodies[b.parent];
        // Every target is derived from THIS pair's own geometry — no per-body mints.
        const contact = p.r + b.r;
        const k0i = Math.min(p.r, b.r) / 3;
        let ceil;
        if (b.depth === 1) {
            ceil = EDGE / POS - b.r;                       // the canvas ceiling
        } else {
            // Depth ≥2: the Hill radius is SMALLER than this pair's own break radius
            // (measured, U2a: ratio 1.56–2.17), so a sub-lobe that separates is
            // immediately unbound. Its ceiling is therefore contact: a bonded lobe.
            ceil = contact;
        }
        const ra = Math.max(contact, contact + P.drive * (ceil - contact));
        const rp = contact - k0i / 3;
        const { L: Lt, eps: epsT } = turningIntegrals(P, p.m, rp, Math.max(ra, rp * 1.0001), p.r);
        const dx = b.x - p.x, dy = b.y - p.y;
        const d = Math.max(Math.hypot(dx, dy), 1e-6);
        const ux = dx / d, uy = dy / d;
        const vx = b.vx - p.vx, vy = b.vy - p.vy;
        let vr = vx * ux + vy * uy;
        let vt = -vx * uy + vy * ux;
        const sgn = vt >= 0 ? 1 : -1;
        const a = dt / P.tauT;
        vt += a * ((Lt / d) * sgn - vt);
        const u = specU(P, p.m, d, p.r);
        const vr2 = 2 * (epsT - u) - vt * vt;
        // Pump the radial leg ONLY where the target energy is reachable at this radius.
        // (Rev-5 defect, recorded: pumping it everywhere zeroed the radial speed of a bead
        // sitting OUTSIDE the ceiling, freezing it in place instead of letting gravity
        // bring it home — 7 of 8 seeds then never settled.)
        if (vr2 > 0) vr += a * (Math.sign(vr || 1) * Math.sqrt(vr2) - vr);
        // THE CONTAINMENT INVARIANT — exact, L-aware: apoapsis ≤ ra by construction.
        // Applied only INSIDE the ceiling: it forbids GAINING escape energy, it never
        // confiscates the energy a bead already has on its way back in.
        if (d <= ra) {
            const cap = epsCeiling(P, p.m, Math.abs(vt) * d, ra, p.r);
            if (0.5 * (vr * vr + vt * vt) + u > cap) {
                const k = Math.sqrt(Math.max(0, 2 * (cap - u)) / Math.max(1e-12, vr * vr + vt * vt));
                vr *= k; vt *= k;
            }
        } else if (vr > 0) {
            // OUTSIDE the ceiling a bead may FALL HOME but may not CLIMB. One-sided, so it
            // can never freeze a returning body (rev-5) and can never leak one (rev-6).
            vr = 0;
        }
        b.vx = p.vx + vr * ux - vt * uy;
        b.vy = p.vy + vr * uy + vt * ux;
    }
}
