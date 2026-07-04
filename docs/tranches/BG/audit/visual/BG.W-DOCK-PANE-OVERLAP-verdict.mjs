// BG.W-DOCK-PANE-OVERLAP — verdict analyzer. Reads chrome-frameseries.json and computes the
// §2.2/§4.5 criteria per case/mode. The box FLIP (P3) is measured on the VISIBLE dock PLATE
// (the .glass-dock the user sees), which on this all-nested route is the orchestrator
// convex-blend box.
//
//   P1  entering (.is-active) engages by t≈0.15 and ramps UP
//   P2  leaving (.is-leaving) persists to t≈0.6 and ramps DOWN
//   CO  co-presence: some morph frame with BOTH enter>0.3 AND leave>0.3
//   DZ  no dead-zone: no morph frame (0.05<t<0.9, both present) with max(enter,leave)<0.3
//   P3  box FLIP monotonic between the two PANE endpoints (from-pane width A, to-pane width
//       B ≈ the settled rest plate). Per frame: min(A,B)-eps <= plateW(t) <= max(A,B)+over.
//       A DIP BELOW min(A,B) is the §2.2 defect ("box dips below both endpoints"). We also
//       flag the EXPAND-T anomaly: on an already-expanded dock a layer swap must NOT cycle
//       --dock-expand-t 0->1 (that is a spurious collapse->expand of the plate box).
//   SWAP overlapped handoff: enter reaches 0.5 while leave still >0.05 (co-present handoff)
import { readFileSync, writeFileSync } from "node:fs";
const DIR = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-paint";
const chrome = JSON.parse(readFileSync(`${DIR}/chrome-frameseries.json`, "utf8"));
const EPS_BOX = 2;      // px endpoint band tolerance
const OVERSHOOT = 10;   // px allowance for the ζ<1 spring peak above the larger endpoint

function analyzeCase(caseRun, caseName, mode) {
    const frames = caseRun.frames || [];
    const morphFrames = frames.filter((f) => f.morphing);
    const out = { case: caseName, mode, note: caseRun.note, pre: caseRun.pre, totalFrames: frames.length, morphFrames: morphFrames.length, sawMorph: caseRun.sawMorph, checks: {} };
    if (!morphFrames.length) { out.checks.NO_MORPH = { pass: false }; out.pass = false; return out; }

    const enterVals = morphFrames.map((f) => ({ t: f.t, o: f.enterOpacity })).filter((x) => x.t != null && x.o != null);
    const leaveVals = morphFrames.map((f) => ({ t: f.t, o: f.leaveOpacity, p: f.leavePresent })).filter((x) => x.t != null && x.o != null);

    // P1 entering engages by t≈0.15 (opacity>0 for some t in [0.15,0.30]) + ramps UP
    const enterEngaged = enterVals.some((x) => x.t >= 0.15 && x.t <= 0.30 && x.o > 0.02);
    const enterLow = enterVals.filter((x) => x.t < 0.3).map((x) => x.o);
    const enterHigh = enterVals.filter((x) => x.t > 0.7).map((x) => x.o);
    const enterRampsUp = enterHigh.length && Math.max(...enterHigh) > (enterLow.length ? Math.max(...enterLow) : 0) + 0.2;
    out.checks.P1_entering_engages = { pass: enterEngaged && enterRampsUp, enterEngaged, enterRampsUp,
        enterAt015to022: enterVals.filter((x) => x.t >= 0.13 && x.t <= 0.24).map((x) => ({ t: x.t, o: +x.o.toFixed(3) })).slice(0, 3),
        maxEnterHigh: enterHigh.length ? +Math.max(...enterHigh).toFixed(3) : null };

    // P2 leaving persists to t≈0.6 + ramps DOWN
    const leaveNear06 = leaveVals.filter((x) => x.t >= 0.40 && x.t <= 0.62 && x.o > 0.02);
    const leaveLow = leaveVals.filter((x) => x.t < 0.3).map((x) => x.o);
    const leaveHigh = leaveVals.filter((x) => x.t > 0.6).map((x) => x.o);
    const leaveRampsDown = leaveLow.length && (leaveHigh.length ? Math.max(...leaveLow) > Math.max(...leaveHigh, 0) + 0.1 : Math.max(...leaveLow) > 0.5);
    out.checks.P2_leaving_persists = { pass: leaveNear06.length > 0 && leaveRampsDown, leaveRampsDown,
        leaveNear06: leaveNear06.slice(0, 3).map((x) => ({ t: x.t, o: +x.o.toFixed(3) })), maxLeaveLow: leaveLow.length ? +Math.max(...leaveLow).toFixed(3) : null };

    // CO co-presence
    const coPresent = morphFrames.filter((f) => f.enterOpacity != null && f.leaveOpacity != null && f.enterOpacity > 0.3 && f.leaveOpacity > 0.3);
    out.checks.CO_co_presence = { pass: coPresent.length > 0, coFrameCount: coPresent.length,
        sample: coPresent.slice(0, 3).map((f) => ({ t: f.t, enter: +f.enterOpacity.toFixed(3), leave: +f.leaveOpacity.toFixed(3) })) };

    // DZ no dead-zone
    const dzFrames = morphFrames.filter((f) => f.t != null && f.t > 0.05 && f.t < 0.9 && f.enterPresent && f.leavePresent && (Math.max(f.enterOpacity ?? 0, f.leaveOpacity ?? 0) < 0.3));
    out.checks.DZ_no_dead_zone = { pass: dzFrames.length === 0, deadZoneFrameCount: dzFrames.length, sample: dzFrames.slice(0, 3).map((f) => ({ t: f.t, enter: f.enterOpacity, leave: f.leaveOpacity })) };

    // P3 box FLIP monotonic between the two PANE endpoints, measured on the VISIBLE plate.
    // Endpoints: the settled rest plate width (pre.plateW) is the true from AND to (both panes
    // render at the same rest footprint) — so the band is [rest-eps, rest+over].
    const rest = caseRun.pre && caseRun.pre.plateW != null ? caseRun.pre.plateW : morphFrames[morphFrames.length - 1].plateW;
    const plateSeries = morphFrames.map((f) => ({ t: f.t, w: f.plateW, expandT: f.expandT })).filter((x) => x.w != null);
    const minPlate = Math.min(...plateSeries.map((s) => s.w));
    const maxPlate = Math.max(...plateSeries.map((s) => s.w));
    const dipFrames = plateSeries.filter((s) => s.w < rest - EPS_BOX);
    const worstDip = dipFrames.length ? Math.min(...dipFrames.map((s) => s.w)) : null;
    out.checks.P3_box_flip_no_dip = { pass: dipFrames.length === 0,
        restPlateW: +rest.toFixed(2), minPlateW: +minPlate.toFixed(2), maxPlateW: +maxPlate.toFixed(2),
        dipFrameCount: dipFrames.length, worstDipW: worstDip != null ? +worstDip.toFixed(2) : null,
        dipRatioOfRest: worstDip != null ? +(worstDip / rest).toFixed(3) : null };

    // EXPAND-T anomaly: an already-expanded dock (pre.expandT ~1) must not cycle expand-t 0->1
    const preExpanded = caseRun.pre && parseFloat(caseRun.pre.expandT) > 0.9;
    const expandTs = plateSeries.map((s) => s.expandT).filter((v) => v != null);
    const expandTmin = expandTs.length ? Math.min(...expandTs) : null;
    const spuriousCollapse = preExpanded && expandTmin != null && expandTmin < 0.5;
    out.checks.EXPANDT_no_spurious_collapse = { pass: !spuriousCollapse, preExpanded, expandTmin: expandTmin != null ? +expandTmin.toFixed(3) : null,
        note: spuriousCollapse ? "layer swap spuriously cycles --dock-expand-t 0->1 -> plate collapses then re-expands" : "expand-t held" };

    // SWAP overlapped handoff
    const enterCross50 = morphFrames.find((f) => f.enterOpacity != null && f.enterOpacity >= 0.5);
    const swapCoOk = enterCross50 && enterCross50.leaveOpacity != null && enterCross50.leaveOpacity > 0.05;
    out.checks.SWAP_overlapped_handoff = { pass: !!swapCoOk, enterReaches50AtT: enterCross50 ? enterCross50.t : null,
        leaveOpacityWhenEnter50: enterCross50 && enterCross50.leaveOpacity != null ? +enterCross50.leaveOpacity.toFixed(3) : null };

    out.pass = Object.values(out.checks).every((c) => c.pass);
    return out;
}

const report = { generatedAt: new Date().toISOString(), wave: "BG.W-DOCK-PANE-OVERLAP", route: "/dock/layers", modes: {} };
for (const modeRun of chrome) {
    const m = modeRun.mode;
    report.modes[m] = { gl: modeRun.glRenderer, standaloneGroupCount: modeRun.structure ? modeRun.structure.standaloneGroupCount : null,
        rules: modeRun.structure ? { overlap: modeRun.structure.hasOverlapRule, enter: modeRun.structure.hasEnterRule, reserve: modeRun.structure.hasReserveRule } : null, cases: {} };
    for (const [caseName, caseRun] of Object.entries(modeRun.caseRuns || {})) report.modes[m].cases[caseName] = analyzeCase(caseRun, caseName, m);
}

let overall = true;
for (const m of Object.values(report.modes)) { for (const c of Object.values(m.cases)) if (!c.pass) overall = false; }
report.overallPass = overall;

// compact summary
const summary = {};
for (const [m, mv] of Object.entries(report.modes)) {
    summary[m] = {};
    for (const [cn, cv] of Object.entries(mv.cases)) {
        summary[m][cn] = { pass: cv.pass, fails: Object.entries(cv.checks).filter(([, c]) => !c.pass).map(([k]) => k) };
    }
}
report.summary = summary;
console.log(JSON.stringify({ overallPass: report.overallPass, summary }, null, 2));
writeFileSync(`${DIR}/verdict.json`, JSON.stringify(report, null, 2));
