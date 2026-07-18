#!/usr/bin/env node
/*
  F4 ENERGY-FIELD — committed logic checks (IOS27-MICRO pass 2, cure seat).
  verified-model: claude-fable-5

  Replaces the session-scratchpad probes (f4-fold-probe.mjs / f4-core-check.mjs /
  f4-gesture-sim.mjs) with ONE durable, re-runnable check beside the prototype (CRIT-F4 G9).
  Every core here mirrors index.html's shipped code paths — when the page changes, this
  file changes with it.

  Gate honesty labels:
    LOCK — regression lock: same-law replay, exists to catch drift, cannot adjudicate design.
    GATE — can genuinely fail: tests one pipeline against an INDEPENDENT pipeline or bound.

  Run: node check.mjs   (exit 1 on any GATE/LOCK failure)
*/

const results = [];
function report(kind, name, pass, detail) {
    results.push({ kind, name, pass, detail });
    console.log(`${pass ? "PASS" : "FAIL"}  [${kind}]  ${name}  ${detail}`);
}

/* ---------- the law (mirrors index.html §1) ---------- */
const ENERGY = (v) => Math.tanh(Math.abs(v) / 1000);
const SIGNED = (v) => Math.tanh(v / 1000);

/* the five-field role schema (mirrors ROLE_TABLE; verbs live CSS-side) */
const ROLE_TABLE = {
    container: { gain: 1.0, cap: 1.0, thetaG: 0.3, thetaS: 0.6 },
    control: { gain: 2.5, cap: 0.7, thetaG: 0.0, thetaS: 0.6 },
    content: { gain: 0.55, cap: 1.0, thetaG: null, thetaS: null },
    lens: { gain: 2.2, cap: 1.0, thetaG: 0.3, thetaS: null },
    periphery: { gain: 0.8, cap: 1.0, thetaG: 0.3, thetaS: null },
};

/* ============ U-LAW (LOCK) — velocity discrimination table ============ */
{
    const table = [[280, 0.27], [1150, 0.82], [1200, 0.83], [1570, 0.92], [2600, 0.99]];
    let ok = true;
    for (const [v, exp] of table) ok = ok && Math.abs(ENERGY(v) - exp) < 0.01;
    report("LOCK", "U-LAW", ok,
        table.map(([v]) => `${v}→${ENERGY(v).toFixed(3)}`).join(" "));
}

/* ============ U-FOLD (LOCK) — double-count immunity of MAX ============ */
{
    const e9 = ENERGY(900);
    const folds = {
        MAX: e9,
        PROB_OR: 1 - (1 - e9) ** 2,
        RAW_SAT: Math.tanh(1.8),
        SUM_CLMP: Math.min(1, 2 * e9),
    };
    const ok = Math.abs(folds.MAX / e9 - 1) < 1e-9 &&
        folds.PROB_OR / e9 > 1.2 && folds.SUM_CLMP / e9 > 1.3;
    report("LOCK", "U-FOLD", ok,
        `MAX 1.00x · OR ${(folds.PROB_OR / e9).toFixed(2)}x · SAT ${(folds.RAW_SAT / e9).toFixed(2)}x · SUM ${(folds.SUM_CLMP / e9).toFixed(2)}x`);
}

/* ============ pointer channel core (mirrors pointerChannel) ============ */
function makePointer(axis = null) {
    return {
        vx: 0, vy: 0, _px: 0, _py: 0, _pt: 0, _sx: 0, _sy: 0, _st: 0, axis,
        begin(x, y, t) { this.vx = this.vy = 0; this._sx = this._px = x; this._sy = this._py = y; this._st = this._pt = t; },
        synthetic(x, y, t) { this._sx = x; this._sy = y; this._st = t; },
        integrate(dt) {
            const keep = Math.pow(0.65, dt / (1 / 60));
            if (this._st <= this._pt) { this.vx *= keep; this.vy *= keep; return; }
            const el = Math.max(1, this._st - this._pt);
            const rx = (this._sx - this._px) / el * 1000, ry = (this._sy - this._py) / el * 1000;
            this.vx = this.vx * keep + rx * (1 - keep);
            this.vy = this.vy * keep + ry * (1 - keep);
            this._px = this._sx; this._py = this._sy; this._pt = this._st;
        },
        speed() {
            return this.axis === "x" ? Math.abs(this.vx)
                : this.axis === "y" ? Math.abs(this.vy)
                : Math.hypot(this.vx, this.vy);
        },
        energy() { return ENERGY(this.speed()); },
    };
}

/* ============ spring channel core with the FINGER-SPACE GAUGE (G3 cure) ============ */
function makeSpring(response = 0.68, zeta = 0.64) {
    const omega = 2 * Math.PI / response;
    return {
        live: false, x: 0, v: 0, gauge: 1, carry: 0, overshoot: 0, sx0: 1, x0abs: 1,
        seed(x0, v0, vFinger) {
            this.x = x0; this.v = v0;
            /* the gauge: the field reads spring velocity re-expressed in finger space.
               E is defined in finger px/s (the MARKS calibration space); a carrier that
               seeds scaled must declare its gauge back. */
            this.gauge = (v0 !== 0 && vFinger != null) ? vFinger / v0 : 1;
            this.sx0 = x0 !== 0 ? x0 : (v0 < 0 ? -1e-6 : 1e-6);
            this.x0abs = Math.max(1e-6, Math.abs(x0));
            this.carry = 0; this.overshoot = 0; this.live = true;
        },
        integrate(dt) {
            if (!this.live) return;
            const a = -omega * omega * this.x - 2 * zeta * omega * this.v;
            this.v += a * dt; this.x += this.v * dt;
            const side = Math.sign(this.sx0);
            if (this.x * side > 0) this.carry = Math.max(this.carry, Math.abs(this.x) - this.x0abs);
            else this.overshoot = Math.max(this.overshoot, Math.abs(this.x));
            if (Math.abs(this.x) < 0.5 && Math.abs(this.v) < 8) this.live = false;
        },
        energy() { return ENERGY(this.v * this.gauge); },
    };
}

/* ============ U-CONT (LOCK) — offline scenario-A replay ============ */
{
    const dt = 1 / 120, keep = Math.pow(0.65, dt / (1 / 60));
    let vE = 0;
    for (let t = 0; t <= 0.4 + 1e-9; t += dt) vE = vE * keep + 1150 * Math.min(1, t / 0.4) * (1 - keep);
    const ePre = ENERGY(vE);
    const sp = makeSpring();
    sp.seed(130, -1150, -1150);            // unscaled seed — the offline scenario
    sp.integrate(dt);
    const jump = Math.abs(sp.energy() - ePre);
    report("LOCK", "U-CONT offline", jump <= 0.032,
        `ePre ${ePre.toFixed(3)} → eSpring ${sp.energy().toFixed(3)} · jump ${jump.toFixed(4)} ≤ 0.032`);
}

/* ============ U-CONT-LIVE (GATE) — the SHIPPED live path: scaled carrier seed + gauge ============ */
/* CRIT-F4 G3: the live page seeds the carrier at vy*0.35. Pre-cure the field read that seed
   raw → release jump 0.436 (~14x the bound). The cure: the gauge. This gate replays the LIVE
   path and would fail if the gauge were removed. */
{
    const rubber = (d, c) => c * (1 - 1 / (1 + (d * 0.55) / c));
    for (const hz of [60, 120]) {
        const dt = 1 / hz;
        const ptr = makePointer();
        ptr.begin(160, 300, 0);
        let y = 300, t = 0, rawDy = 0;
        // the fling-2600 scripted profile from index.html
        while (true) {
            const v = t < 0.25 ? (t / 0.25) * 2600 : t < 0.37 ? 2600 : null;
            if (v === null) break;
            t += dt; y -= v * dt;
            ptr.synthetic(160, y, t * 1000);
            ptr.integrate(dt);
            rawDy = y - 300;
        }
        const ePre = ptr.energy();
        const vy = ptr.vy;
        const disp = -rubber(-rawDy, 40);   // up-pull → RB_UP domain
        const gauged = makeSpring();
        gauged.seed(disp, vy * 0.35, vy);   // the live carrier seed WITH the gauge
        gauged.integrate(dt);
        const jumpG = Math.abs(gauged.energy() - ePre);
        const raw = makeSpring();
        raw.seed(disp, vy * 0.35, null);    // gauge off — the pre-cure defect
        raw.integrate(dt);
        const jumpR = Math.abs(raw.energy() - ePre);
        const ok = jumpG <= 0.032 && jumpR > 0.30;
        report("GATE", `U-CONT-LIVE @${hz}Hz`, ok,
            `gauged jump ${jumpG.toFixed(4)} ≤ 0.032 · UNgauged ${jumpR.toFixed(3)} (the defect the gate catches)`);
    }
}

/* ============ U-SPRING (LOCK) — overshoot earned, never intrinsic ============ */
/* Constants {0.68, 0.64} are the carrier STAND-IN. The corpus register is MARKS PASS-2 C2:
   ζ = 0.80 (0.77–0.88), f_d = 1.7Hz, settle ≈ 180ms, overshoot VELOCITY-BOUGHT (~0.02px per
   px/s of crossing velocity); the pass-1 "MARKS asks 30–50% overshoot" claim is VOID (C1/C2). */
{
    const dt = 1 / 120;
    const fast = makeSpring(); fast.seed(130, -1150, -1150);
    const slow = makeSpring(); slow.seed(30, 0, 0);
    for (let t = 0; t < 3; t += dt) { fast.integrate(dt); slow.integrate(dt); }
    const ok = fast.overshoot > 10 && slow.overshoot < 4;
    report("LOCK", "U-SPRING", ok,
        `fast overshoot ${fast.overshoot.toFixed(1)}px · slow-place ${slow.overshoot.toFixed(1)}px (earned only)`);
}

/* ============ U-REG (GATE) — the honest useDragVelocity regression (G4 cure) ============ */
/* The SHIPPED pipeline, replayed verbatim from src/composables/dom/useDragVelocity.ts:
   pointermove accumulates frameDelta on ONE axis; per rAF: live = min(ceil, tanh(gain·|Δ/dt·16.7|));
   smoothed = smoothed·0.65 + live·0.35; frameDelta *= 0.6; toFixed(4).
   The residual ·0.6 decay RE-COUNTS 60% of each frame's delta — steady-state frameDelta is
   v/24 px, not v/60: the shipped law is effectively tanh(v/400), 2.5x hotter than the
   instantaneous tanh(v/1000). "Byte-identical" was therefore never true of the pipeline —
   only of the same-file tautology pass 1 compared against itself. The facility cures the
   re-count and preserves the shipped SLOPE via the control row gain 2.5 (2.5·tanh(v/1000)
   linearizes to the shipped tanh(v/400) at small v; both cap at 0.7). This gate replays both
   pipelines over a synthetic gesture corpus and bounds the drift. */
function shippedSim(gain = 0.06, ceil = 0.7) {
    return {
        smoothed: 0, frameDelta: 0, lastPos: 0, lastT: 0,
        down(pos) { this.lastPos = pos; this.lastT = 0; this.frameDelta = 0; this.smoothed = 0; },
        move(pos) { this.frameDelta += pos - this.lastPos; this.lastPos = pos; },
        frame(now) {
            const dt = this.lastT ? now - this.lastT : 16.7;
            this.lastT = now;
            const live = Math.min(ceil, Math.tanh(gain * Math.abs(this.frameDelta / dt * 16.7)));
            this.smoothed = this.smoothed * 0.65 + live * 0.35;
            this.frameDelta *= 0.6;
            return Number(this.smoothed.toFixed(4));
        },
    };
}
{
    const row = ROLE_TABLE.control;
    const dt = 1 / 60;
    function run(vOf, seconds) {
        const ship = shippedSim();
        const ptr = makePointer("x");
        let pos = 0, t = 0;
        const S = [], F = [];
        ship.down(pos); ptr.begin(pos, 0, 0);
        for (let i = 0; i < Math.round(seconds / dt); i++) {
            t += dt;
            pos += vOf(t) * dt;
            ship.move(pos);
            S.push(ship.frame(t * 1000));
            ptr.synthetic(pos, 0, t * 1000);
            ptr.integrate(dt);
            F.push(Math.min(row.cap, ptr.energy() * row.gain));
        }
        return { S, F };
    }
    const settled = (A) => A.slice(Math.round(0.5 / dt));
    const maxD = (A, B) => Math.max(...A.map((a, i) => Math.abs(a - B[i])));

    /* (a) slope parity where the feel is calibrated: settled drift at slow and mid drags */
    const s280 = run(() => 280, 1.5);
    const d280 = maxD(settled(s280.S), settled(s280.F));
    /* (b) saturation parity: both pipelines pinned at the 0.7 cap for a fast drag */
    const s900 = run(() => 900, 1.5);
    const d900 = maxD(settled(s900.S), settled(s900.F));
    /* (c) responsiveness never regresses: frames to reach half-cap on a step to 900 px/s */
    const rise = (A) => A.findIndex((x) => x >= 0.35);
    const riseS = rise(s900.S), riseF = rise(s900.F);
    /* (d) hold-still decay: both bleed to ~0 when the finger stops moving */
    const sHold = run((t) => (t < 0.4 ? 600 : 0), 1.5);
    const tailS = sHold.S[sHold.S.length - 1], tailF = sHold.F[sHold.F.length - 1];
    /* (e) the documented deliberate break, REPORTED not gated: transient and jitter drift
       from curing the frameDelta·0.6 residual re-count (double-pole → single honest pole) */
    const sJit = run((t) => 200 + 150 * Math.sin(2 * Math.PI * 3 * t), 1.5);
    const dJit = maxD(settled(sJit.S), settled(sJit.F));
    const dTransient = Math.max(maxD(s900.S, s900.F), maxD(sHold.S, sHold.F));

    const ok = d280 <= 0.08 && d900 <= 0.01 && riseF <= riseS && tailS < 0.02 && tailF < 0.02;
    report("GATE", "U-REG shipped-pipeline regression", ok,
        `slope drift@280 ${d280.toFixed(3)} ≤ 0.08 · cap drift@900 ${d900.toFixed(3)} ≤ 0.01 · rise ${riseF}f ≤ ${riseS}f · hold-still tails ${tailS.toFixed(3)}/${tailF.toFixed(3)}`);
    console.log(`        BYTE-IDENTICAL RETRACTED — the shipped residual re-count makes the shipped law tanh(v/400) at steady state;`);
    console.log(`        the facility cures it, preserves slope via control gain 2.5. Deliberate-break telemetry: transient max|Δ| ${dTransient.toFixed(3)}, 3Hz-jitter settled ${dJit.toFixed(3)}.`);
}

/* ============ gesture sims (LOCK) — page expecteds at 60 and 120 Hz ============ */
{
    const rubber = (d, c) => c * (1 - 1 / (1 + (d * 0.55) / c));
    const profiles = {
        "slow place 280": { f: (t) => t < 0.3 ? (t / 0.3) * 280 : t < 0.9 ? 280 : t < 1.15 ? 280 * (1 - (t - 0.9) / 0.25) : t < 1.3 ? 0 : null, peak: 0.273, carryLo: 0, carryHi: 1 },
        "flick 1150": { f: (t) => t < 0.3 ? (t / 0.3) * 1150 : t < 0.42 ? 1150 : null, peak: 0.816, carryLo: 7, carryHi: 13 },
        "fling 2600": { f: (t) => t < 0.25 ? (t / 0.25) * 2600 : t < 0.37 ? 2600 : null, peak: 0.989, carryLo: 25, carryHi: 34 },
    };
    for (const hz of [60, 120]) {
        const dt = 1 / hz;
        let all = true; const parts = [];
        for (const [name, p] of Object.entries(profiles)) {
            const ptr = makePointer();
            ptr.begin(160, 300, 0);
            let y = 300, t = 0, rawDy = 0, peak = 0;
            while (true) {
                const v = p.f(t);
                if (v === null) break;
                t += dt; y -= v * dt;
                ptr.synthetic(160, y, t * 1000);
                ptr.integrate(dt);
                peak = Math.max(peak, ptr.energy());
                rawDy = y - 300;
            }
            const vy = ptr.vy;
            const disp = -rubber(-rawDy, 40);
            const sp = makeSpring();
            sp.seed(disp, vy * 0.35, vy);
            for (let tt = 0; tt < 3 && sp.live; tt += dt) sp.integrate(dt);
            const ok = Math.abs(peak - p.peak) < 0.02 && sp.carry >= p.carryLo && sp.carry <= p.carryHi;
            all = all && ok;
            parts.push(`${name} peak ${peak.toFixed(3)} carry ${sp.carry.toFixed(1)}px`);
        }
        report("LOCK", `gesture sims @${hz}Hz`, all, parts.join(" · "));
    }
}

/* ============ U-DELAY (GATE) — the periphery TRUE delay line (G8 cure) ============ */
/* MARKS §5: the rail is a delayed pop-in ~80–160ms behind, then caught up. Pass 1 shipped a
   100ms retargeted linear transition — an exponential low-pass whose tail held 37% at τ and
   ~0.37 at t=725ms in paint. The cure is a real delay line: periphery consumers read the
   scope's history at t−τ. This gate asserts (a) the delayed read equals the input shifted τ
   within one frame, (b) after the quiet zero-sample the periphery is EXACTLY 0 by τ+2 frames,
   and (c) prints the old follower at the same point for the record. */
{
    const TAU = 100;                            // ms — inside the MARKS 80–160 band
    const dt = 1000 / 60;
    const hist = [];
    const delayedAt = (t) => {
        let out = 0;
        for (let i = hist.length - 1; i >= 0; i--) if (hist[i].t <= t) { out = hist[i].e; break; }
        return out;
    };
    const wave = (t) => t < 400 ? 0.9 * Math.sin(Math.PI * t / 400) : null;  // one energy arch, quiet at 400ms
    /* tolerance = one frame of waveform change (zero-order hold quantization), stated */
    const frameTol = 0.9 * Math.PI / 400 * dt + 1e-6;
    let follower = 0;                           // the OLD τ-follower, for the record
    let maxShiftErr = 0, t = 0, zeroAt = null, followerAtZero = null;
    let inCross = null, outCross = null;        // 0.45-rising crossings → measured lag
    let prevIn = 0, prevOut = 0;
    while (t < 900) {
        const live = wave(t);
        const e = live == null ? 0 : live;      // the quiet zero-sample push
        hist.push({ t, e });
        const d = delayedAt(t - TAU);
        const expected = (t - TAU < 0) ? 0 : (wave(t - TAU) ?? 0);
        maxShiftErr = Math.max(maxShiftErr, Math.abs(d - expected));
        if (inCross === null && prevIn < 0.45 && e >= 0.45) inCross = t;
        if (outCross === null && prevOut < 0.45 && d >= 0.45) outCross = t;
        prevIn = e; prevOut = d;
        follower += (e - follower) * (1 - Math.exp(-dt / TAU));
        if (live == null && zeroAt === null && d === 0 && t >= 400 + TAU) {
            zeroAt = t - 400;
            followerAtZero = follower;
        }
        t += dt;
    }
    const lag = outCross - inCross;
    const ok = maxShiftErr <= frameTol && Math.abs(lag - TAU) <= dt + 1 &&
        zeroAt !== null && zeroAt <= TAU + 2 * dt;
    report("GATE", "U-DELAY periphery", ok,
        `lag ${lag.toFixed(0)}ms (τ ${TAU}±${dt.toFixed(0)}) · shift err ${maxShiftErr.toFixed(3)} ≤ 1-frame ${frameTol.toFixed(3)} · zero at quiet+${zeroAt?.toFixed(0)}ms (≤${(TAU + 2 * dt).toFixed(0)}) · old follower still ${followerAtZero?.toFixed(3)} there`);
}

/* ============ U-OWN (GATE) — single-writer registry (G7 cure) ============ */
{
    const OWNER = new WeakMap();
    function addConsumer(scope, el) {
        const prev = OWNER.get(el);
        if (prev && prev !== scope) throw new Error(`single-writer violation: "${prev.name}" already owns this element`);
        OWNER.set(el, scope);
        scope.consumers.push(el);
    }
    const a = { name: "dock", consumers: [] }, b = { name: "tabs", consumers: [] };
    const el = {};
    addConsumer(a, el);
    let threw = false;
    try { addConsumer(b, el); } catch { threw = true; }
    const ok = threw && a.consumers.length === 1 && b.consumers.length === 0;
    report("GATE", "U-OWN single-writer", ok,
        `second-scope addConsumer ${threw ? "THREW" : "did not throw"} · membership unchanged`);
}

/* ============ scroll close-edge logic (GATE) — debounce-primary (G2 cure) ============ */
/* Replays the cross-engine defect shape: stepped scrollTop fires scrollend after EVERY step
   (Chrome 150 measured 10/10; WebKit 26.5 measured 89/89). The cured channel ignores scrollend
   while scroll events arrived within the last 2 frames (~40ms) and closes on the 160ms
   debounce. The pre-cure channel dies on the first scrollend. */
{
    function makeScroll(cured) {
        return {
            open: false, v: 0, quietMs: 0, lastEventT: -1e9, closedBy: null, peak: 0,
            scrollEvent(t, raw) {
                if (!this.open) { this.open = true; this.v = 0; }
                const keep = Math.pow(0.65, 16.67 / 16.67);
                this.v = this.v * keep + raw * (1 - keep);
                this.lastEventT = t; this.quietMs = 0;
                this.peak = Math.max(this.peak, ENERGY(this.v));
            },
            scrollend(t) {
                if (!this.open) return;
                if (cured && t - this.lastEventT < 40) return;   // events live — not a close edge
                this.open = false; this.closedBy = "scrollend";
            },
            frame(t, dtMs) {
                if (!this.open) return;
                if (t - this.lastEventT > 0) {
                    this.quietMs += dtMs;
                    if (this.quietMs > 160) { this.open = false; this.closedBy = "debounce 160ms"; }
                }
            },
        };
    }
    for (const cured of [true, false]) {
        const ch = makeScroll(cured);
        let t = 0;
        for (let i = 0; i < 40; i++) {          // the stepped burst: scroll + same-frame scrollend
            ch.scrollEvent(t, 1500);
            ch.scrollend(t + 1);                 // engines fire it per discrete step
            t += 16.67;
            ch.frame(t, 16.67);
            if (!ch.open) break;
        }
        while (ch.open && t < 2000) { t += 16.67; ch.frame(t, 16.67); }
        if (cured) {
            const ok = ch.peak > 0.85 && ch.closedBy === "debounce 160ms";
            report("GATE", "U-SCROLL debounce-primary", ok,
                `peak ${ch.peak.toFixed(3)} (>0.85) · closed by ${ch.closedBy}`);
        } else {
            const ok = ch.peak < 0.5;            // the defect: the channel dies before E rises
            report("LOCK", "U-SCROLL pre-cure defect shape", ok,
                `pre-cure peak ${ch.peak.toFixed(3)} — dies on first scrollend (the defect this cures)`);
        }
    }
}

/* ============ summary ============ */
const fails = results.filter((r) => !r.pass);
console.log(`\n${results.length - fails.length}/${results.length} checks green` +
    (fails.length ? ` — FAILURES: ${fails.map((f) => f.name).join(", ")}` : ""));
process.exit(fails.length ? 1 : 0);
