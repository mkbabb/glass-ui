// AZ.W-DOCK-FLICKER — proof:dock-no-scale-pop, the collapse-onset scale-pop +
// FLIP-thrash gate (born-RED at HEAD, driven GREEN by the wave).
//
// THE DEFECT (C2-2, root cause). A hovered, expanded dock that begins collapsing
// flips its `.collapsed` class on SYNCHRONOUSLY, but the box is still painted at
// EXPANDED width for the morph's leading frames (the `onSwap` pin + 1-rAF
// measure-defer in dockMorphContext.ts). The UNGUARDED rule
//   `.glass-dock.collapsed:hover { scale: var(--dock-collapsed-hover-scale) /* 1.1 */ }`
// (designed for the 54px resting circle) multiplied that transient ~535px box,
// painting a ±24-34px right-edge POP (the user's "flashing"). And because the
// `@mouseenter`/`@mouseleave` listeners sit on the MORPHING `.glass-dock` root
// with NO hysteresis (D5-7), the moving box edge re-crossing the static cursor
// re-fired enter↔leave (the user's "flickering").
//
// THE FIX (this wave): (1) scope the SCALE arm to
// `.glass-dock.collapsed:hover:not([data-morphing])` (mirroring the shipped
// `--dock-expand-t` `[data-morphing]` precedent — the +1.1 lift applies ONLY at
// rest), and (2) add a hover HYSTERESIS to useDockState (an intent-dwell on
// `onMouseEnter` + a `getBoundingClientRect` geometry recheck on `onMouseLeave`,
// both REFERENCED on the enter/leave path).
//
// WHAT THIS GATE PROVES — FOUR WITNESSES + a π DELTA:
//   W1 (source, device-free) — the comment-stripped `dock/morph.css` shows the
//      `.collapsed:hover` SCALE arm scoped with `:not([data-morphing])`. RED at
//      HEAD on the bare `.glass-dock.collapsed:hover { … scale … }`.
//   W2 (source, device-free) — `useDockState.ts` carries a hysteresis seam (a
//      `getBoundingClientRect` recheck + a dwell timer DISTINCT from collapseDelay)
//      AND that seam is REFERENCED by onMouseEnter/onMouseLeave (not dead code that
//      satisfies a bare grep — the anti-evasion bite). RED at HEAD (pure timer).
//   W3 (live, frame-sampled) — a REAL-MOUSE collapse-onset trace over the
//      collapsible dock (/dock/overview, hover-at-edge→collapse) shows the rendered
//      SCALE stays <= 1.02 on the still-WIDE collapsing box (`e=0`, `mt<=0.5`). This
//      is the precise root-cause observable — the right-edge ±24-34px jump is its
//      CONSEQUENCE — and reading the scale directly is FRAME-DROP IMMUNE (a headless
//      frame drop legitimately moves the shrinking box a lot, which a raw inter-frame
//      right-edge delta would false-flag, the F2 wrong-observable trap inverted). RED
//      at HEAD: the C2 baseline (and the live HEAD replay) carries `sc=1.1` there.
//      The cursor is driven by the REAL Playwright pointer so CSS `:hover` genuinely
//      engages (the `.collapsed:hover` scale needs it; a synthetic dispatchEvent
//      never sets `:hover`).
//   W4 (live, frame-sampled, DISTINCT from W3) — a SUSTAINED cursor-at-collapsing-
//      edge trace shows the dock settles to ONE state (<= 2 expanded↔collapsed
//      transitions — the single clean collapse), no enter/leave re-fire oscillation.
//      RED at HEAD: the moving edge re-fires enter/leave as it sweeps past the static
//      cursor.
//
// The W3/W4 trace-analysis detectors are PURE over a captured frame series, so the
// SELF-TEST replays the committed C2 baseline trace
// (ground/C2-morph-flicker-trace.json — 561 frames, the proven defect) and asserts
// the W3 scale pop (`sc=1.1` on the wide box) is FLAGGED on it. The bite is
// demonstrated every run (the RED-witness inverse) while the device-free arm runs on
// every runner.
//
// HARNESS: the proof-dock-animation-live.mjs pattern — a dynamically-imported
// Playwright driver that runs the live arm ONLY when the harness + a demo dev
// server are present, parks the live Aurora/GooBlob WebGL substrate via the
// shipped visibility-park seam (the GPU-stall relief), and fail-CLOSES when the π
// workspace is present + not in CI. The device-free W1+W2 source arm + the C2
// baseline self-test run on EVERY runner regardless.

import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readDockCss } from "./read-dock-css.mjs";

const COMMAND = "npm run proof:dock-no-scale-pop";
const DOCK_ROUTE = "/dock/overview";

// The W4 bar: the cursor-at-edge sustained trace must settle to ONE state. A real
// FLIP-thrash shows repeated expanded↔collapsed transitions; the dock should make
// AT MOST one settling transition (e.g. collapse) then stay. > this many `expanded`
// transitions over the sustained window is the oscillation.
const MAX_STATE_FLIPS = 2;

// ── Strip CSS/JS block comments (false-witness discipline) ─────────────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            const end = text.indexOf("\n", i + 2);
            const stop = end === -1 ? text.length : end;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// ── W1 — the SCALE arm is guarded (source, device-free) ────────────────────────
// PURE over the comment-stripped dock CSS. The defect was the BARE
// `.glass-dock.collapsed:hover { … scale: var(--dock-collapsed-hover-scale) … }`.
// The fix moves the `scale` onto `.glass-dock.collapsed:hover:not([data-morphing])`.
// W1 asserts: the rule block that carries the `scale: var(--dock-collapsed-hover-scale)`
// declaration is scoped with `:not([data-morphing])` — and (the anti-decoy half)
// that NO bare `.glass-dock.collapsed:hover` selector (no `:not([data-morphing])`)
// also carries that scale declaration.
export function detectScaleGuard(dockCss) {
    const violations = [];
    const facts = {};
    const css = stripBlockComments(dockCss).replace(/\s+/g, " ");

    // Every selector→{ … } block. We scan for blocks whose body declares the
    // collapsed-hover scale token and inspect the selector that owns each.
    const SCALE_DECL = /scale:\s*var\(--dock-collapsed-hover-scale\)/;
    // Match `<selector> { <body> }` greedily-safe (the dock CSS has no nested
    // braces inside these flat rule bodies in the cascade layer we read here, but
    // to be safe we match minimal bodies with no inner `{`).
    const blocks = [...css.matchAll(/([^{};]+)\{([^{}]*)\}/g)];
    let guardedScaleBlocks = 0;
    let bareScaleBlocks = 0;
    for (const b of blocks) {
        const selector = b[1].trim();
        const body = b[2];
        if (!SCALE_DECL.test(body)) continue;
        // Only the collapsed-hover scale rule is in scope (the press-squish
        // `--scale-press-dock` is a different token and selector).
        if (!/\.glass-dock\.collapsed:hover/.test(selector)) continue;
        if (/:not\(\[data-morphing\]\)/.test(selector)) guardedScaleBlocks++;
        else bareScaleBlocks++;
    }
    facts.guardedScaleBlocks = guardedScaleBlocks;
    facts.bareScaleBlocks = bareScaleBlocks;

    if (guardedScaleBlocks === 0)
        violations.push(
            "W1: no `.glass-dock.collapsed:hover:not([data-morphing])` rule carries `scale: var(--dock-collapsed-hover-scale)` — the collapsed-hover scale is NOT gated on morph settle (it multiplies the transient expanded-width box; the C2-2 scale pop)",
        );
    if (bareScaleBlocks > 0)
        violations.push(
            `W1: ${bareScaleBlocks} bare \`.glass-dock.collapsed:hover\` rule(s) (NO :not([data-morphing])) still carry the collapsed-hover scale — the unguarded rule survives and pops the transient box`,
        );
    return { facts, violations };
}

// ── W2 — the hysteresis seam exists AND is wired (source, device-free) ─────────
// PURE over the comment-stripped useDockState.ts source. The seam: a
// `getBoundingClientRect` geometry recheck + a dwell timer DISTINCT from
// `collapseDelay`/`collapseTimer`. The anti-evasion bite: the recheck must be
// REFERENCED on the enter/leave path (a `getBoundingClientRect` that never gates the
// state flip is a no-op decoy that passes a bare grep). W4 (live) is the binding
// behavioral proof; W2 asserts the structural seam is present + wired.
export function detectHysteresisSeam(useDockStateSrc) {
    const violations = [];
    const facts = {};
    const src = stripBlockComments(useDockStateSrc);

    const hasGeomRecheck = /getBoundingClientRect/.test(src);
    // A dwell timer DISTINCT from the collapse timer — the hover-intent name.
    const hasDwell = /hoverIntent/.test(src);
    facts.hasGeometryRecheck = hasGeomRecheck;
    facts.hasIntentDwell = hasDwell;

    if (!hasGeomRecheck)
        violations.push(
            "W2: useDockState.ts has no `getBoundingClientRect` geometry recheck — the moving box edge re-crossing the static cursor is unguarded (the pure-timer state, D5-7)",
        );
    if (!hasDwell)
        violations.push(
            "W2: useDockState.ts has no intent-dwell timer (hoverIntent…) distinct from collapseDelay — the collapsed→hover expand fires instantly on a sweeping-edge enter (the FLIP-thrash substrate)",
        );

    // The WIRED assert (anti-decoy): the geometry recheck must be REFERENCED inside
    // onMouseLeave, AND the intent dwell must be REFERENCED inside onMouseEnter. We
    // isolate each handler body and check the seam appears in it.
    const leaveBody = isolateFunctionBody(src, "onMouseLeave");
    const enterBody = isolateFunctionBody(src, "onMouseEnter");
    facts.onMouseLeaveFound = leaveBody !== null;
    facts.onMouseEnterFound = enterBody !== null;

    const geomWiredInLeave =
        leaveBody !== null && /isMorphingEdgeSweep|getBoundingClientRect/.test(leaveBody);
    const dwellWiredInEnter =
        enterBody !== null && /hoverIntent/.test(enterBody);
    facts.geometryRecheckWiredInLeave = geomWiredInLeave;
    facts.intentDwellWiredInEnter = dwellWiredInEnter;

    if (hasGeomRecheck && !geomWiredInLeave)
        violations.push(
            "W2: the geometry recheck is present but NOT referenced inside onMouseLeave — a getBoundingClientRect that never gates the state flip is a no-op decoy (anti-evasion bite)",
        );
    if (hasDwell && !dwellWiredInEnter)
        violations.push(
            "W2: the intent dwell is present but NOT referenced inside onMouseEnter — a dwell timer that never defers the expand is a no-op decoy (anti-evasion bite)",
        );
    return { facts, violations };
}

// Isolate a `function <name>(…) { … }` body by brace-matching from the declaration.
// Returns the body text (between the matched braces) or null if not found.
function isolateFunctionBody(src, name) {
    const decl = new RegExp(`function\\s+${name}\\s*\\(`);
    const m = decl.exec(src);
    if (!m) return null;
    // Find the opening brace after the param list.
    let i = src.indexOf("{", m.index);
    if (i === -1) return null;
    let depth = 0;
    const start = i;
    for (; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") {
            depth--;
            if (depth === 0) return src.slice(start + 1, i);
        }
    }
    return null;
}

// ── W3 — the no-SCALE-POP trace analysis (PURE over a captured frame series) ────
// THE precise collapse-onset observable. The C2 pop is a SCALE applied to the
// still-EXPANDED box during the leading collapse frames: `sc=1.1` while the box is
// still wide (`e=0` collapsed-class on, `mt < 0.5` morph barely advanced). The
// right-edge ±24-34px jump is the CONSEQUENCE of that scale × the ~535px box. So the
// root-cause observable is the SCALE on the wide collapsing box — and reading the
// scale directly is FRAME-DROP IMMUNE (a headless frame drop legitimately moves the
// shrinking box a lot between samples, which a raw inter-frame right-edge delta would
// false-flag as a "pop" — the F2 wrong-observable trap inverted). The W3 verdict:
// during the collapse-onset window (`e=0` AND `mt <= MT_EARLY`), the rendered SCALE
// must never exceed SCALE_CEIL. The C2 baseline carries `sc=1.1` there → flagged.
//
// `sc` is the CSS `scale` value as a string ("1", "1.1", or a `<x> <y>` pair / a
// matrix fallback). Parse the leading numeric (the uniform/x scale).
const MT_EARLY = 0.5; // the box is still > ~half its expanded width below this morph progress
const SCALE_CEIL = 1.02; // the resting scale is 1; the pop is 1.1 — 1.02 clears sub-pixel rounding

export function parseScale(sc) {
    if (sc == null) return 1;
    const s = String(sc).trim();
    if (s === "none" || s === "") return 1;
    // `scale` can be "1.1", "1.1 0.91" (x y), or a transform matrix(a, b, c, d, …).
    const mat = s.match(/matrix\(\s*([\d.eE+-]+)/);
    if (mat) return Number.parseFloat(mat[1]) || 1;
    const n = Number.parseFloat(s);
    return Number.isNaN(n) ? 1 : n;
}

/**
 * The scale-pop verdict over a collapse-onset frame series. Returns the MAX scale
 * observed on the still-wide collapsing box (`e=0` AND `mt <= MT_EARLY`). A value
 * above SCALE_CEIL is the C2 scale pop (the "flashing"). Also returns the worst
 * right-edge jump as a non-binding corroborating fact (the visible consequence),
 * computed ONLY across adjacent frames that BOTH sit in the early-collapse window
 * (so a legitimate fast-morph frame between two dropped samples does not inflate it).
 */
export function detectScalePop(samples) {
    if (!Array.isArray(samples) || samples.length < 2)
        return { maxScale: 1, popScale: false, maxEdgeJumpEarly: 0, earlyFrames: 0 };
    let maxScale = 1;
    let earlyFrames = 0;
    let maxEdgeJumpEarly = 0;
    let prevEarly = null;
    for (const s of samples) {
        const collapsed = s.e === 0 || s.e === false;
        const mt = typeof s.mt === "number" ? s.mt : 0;
        const early = collapsed && mt <= MT_EARLY;
        if (!early) {
            prevEarly = null;
            continue;
        }
        earlyFrames++;
        const sc = parseScale(s.sc);
        if (sc > maxScale) maxScale = sc;
        if (prevEarly != null && s.right != null && prevEarly.right != null) {
            const j = Math.abs(s.right - prevEarly.right);
            if (j > maxEdgeJumpEarly) maxEdgeJumpEarly = j;
        }
        prevEarly = s;
    }
    return {
        maxScale: Math.round(maxScale * 1000) / 1000,
        popScale: maxScale > SCALE_CEIL,
        maxEdgeJumpEarly: Math.round(maxEdgeJumpEarly * 10) / 10,
        earlyFrames,
    };
}

// ── W4 — the no-FLIP-THRASH trace analysis (PURE over a captured frame series) ──
// A sustained cursor-at-edge series of `{ t, e }` (expanded 0/1). Count the
// `expanded` STATE transitions (0→1 or 1→0). A settled dock makes at most one
// (e.g. collapse); a FLIP-thrash makes many (enter→leave→enter oscillation).
export function countStateFlips(samples) {
    if (!Array.isArray(samples) || samples.length < 2) return 0;
    let flips = 0;
    let prev = null;
    for (const s of samples) {
        const e = s.e === 1 || s.e === true ? 1 : 0;
        if (prev !== null && e !== prev) flips++;
        prev = e;
    }
    return flips;
}

// ── The pure verdict over a captured live result ───────────────────────────────
export function detectLive(result) {
    const violations = [];
    const facts = {};
    if (!result || result.error) {
        violations.push(`live probe error: ${result?.error ?? "no result"}`);
        return { facts, violations };
    }

    // W3 — collapse-onset SCALE POP (the precise root-cause observable; the
    // right-edge ±24-34px jump is its visible consequence). Frame-drop immune.
    const onset = result.collapseOnset;
    if (!onset || !Array.isArray(onset.samples) || onset.samples.length < 2) {
        violations.push("W3: the collapse-onset trace is missing/empty (the morph was not staged)");
    } else {
        const pop = detectScalePop(onset.samples);
        facts.collapseOnsetFrames = onset.samples.length;
        facts.collapseOnsetEarlyFrames = pop.earlyFrames;
        facts.maxScaleOnWideBox = pop.maxScale;
        facts.scaleCeil = SCALE_CEIL;
        facts.maxEdgeJumpEarlyPx = pop.maxEdgeJumpEarly; // corroborating consequence
        if (pop.earlyFrames === 0)
            violations.push(
                "W3: the collapse-onset window had ZERO early-collapse frames (e=0, mt<=0.5) — the collapse morph was not staged, so the scale-pop assert is vacuous",
            );
        else if (pop.popScale)
            violations.push(
                `W3: the SCALE reached ${pop.maxScale} on the still-wide collapsing box (e=0, mt<=${MT_EARLY}) — the +1.1 hover lift multiplied the transient expanded-width box (the ±24-34px right-edge "flashing" pop; max early-window edge jump ${pop.maxEdgeJumpEarly}px)`,
            );
    }

    // W4 — cursor-at-edge sustained no-flip.
    const sustained = result.cursorAtEdge;
    if (!sustained || !Array.isArray(sustained.samples) || sustained.samples.length < 2) {
        violations.push("W4: the cursor-at-edge sustained trace is missing/empty (the flicker case was not staged)");
    } else {
        const flips = countStateFlips(sustained.samples);
        facts.cursorAtEdgeFrames = sustained.samples.length;
        facts.cursorAtEdgeStateFlips = flips;
        facts.stateFlipBudget = MAX_STATE_FLIPS;
        if (flips > MAX_STATE_FLIPS)
            violations.push(
                `W4: the cursor-at-edge trace re-fired ${flips} expanded↔collapsed state flips (> ${MAX_STATE_FLIPS}) — the FLIP enter/leave "flickering" oscillation survives`,
            );
    }
    return { facts, violations };
}

// ── the in-page sampler (serialized into the browser) ──────────────────────────
// The REAL-MOUSE staging is driven from Node (`page.mouse.move` — so CSS `:hover`
// genuinely engages, which the `.collapsed:hover` scale needs; a synthetic
// dispatchEvent never sets `:hover`, so the scale pop would never paint). The in-page
// side is just a rAF RECORDER controllable from Node: `start(ms)` records frames for
// `ms`, `read()` returns them. Each frame reads the box geometry + the morph scalar +
// the rendered `scale`.
function installSampler() {
    const SEL = '.glass-dock[data-testid="dock-capture"]';
    const readFrame = (dock) => {
        const r = dock.getBoundingClientRect();
        const cs = getComputedStyle(dock);
        const sc = cs.scale && cs.scale !== "none" ? cs.scale : cs.transform || "1";
        return {
            t: Math.round(performance.now() * 10) / 10,
            w: Math.round(r.width * 10) / 10,
            right: Math.round(r.right * 10) / 10,
            left: Math.round(r.left * 10) / 10,
            m: dock.hasAttribute("data-morphing") ? 1 : 0,
            e: dock.classList.contains("collapsed") ? 0 : 1,
            mt: parseFloat(cs.getPropertyValue("--dock-morph-t")) || 0,
            sc: String(sc),
            hov: dock.matches(":hover") ? 1 : 0,
        };
    };
    window.__dockFlicker = {
        rect() {
            const d = document.querySelector(SEL);
            if (!d) return null;
            const r = d.getBoundingClientRect();
            return { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, top: r.top };
        },
        collapsed() {
            const d = document.querySelector(SEL);
            return d ? d.classList.contains("collapsed") : null;
        },
        record(ms) {
            return new Promise((resolve) => {
                const d = document.querySelector(SEL);
                if (!d) return resolve([]);
                const samples = [];
                const t0 = performance.now();
                const f = () => {
                    samples.push(readFrame(d));
                    if (performance.now() - t0 >= ms) resolve(samples);
                    else requestAnimationFrame(f);
                };
                requestAnimationFrame(f);
            });
        },
        // Fire ONLY the state-machine `mouseleave` (with a real exterior relatedTarget)
        // to trigger the collapse path — WITHOUT moving the real cursor, so CSS
        // `:hover` stays true (the C2 condition: the collapse fires while the pointer
        // still hovers the box, so the leading frames are `:hover` + `.collapsed`).
        triggerLeave() {
            const d = document.querySelector(SEL);
            if (!d) return;
            const r = d.getBoundingClientRect();
            const opts = {
                bubbles: true,
                clientX: r.right + 80,
                clientY: r.top + r.height / 2,
                relatedTarget: document.body,
            };
            d.dispatchEvent(new MouseEvent("mouseleave", opts));
            d.dispatchEvent(new PointerEvent("pointerleave", { ...opts, pointerType: "mouse" }));
        },
    };
    return true;
}

async function loadPlaywright() {
    for (const mod of ["playwright", "playwright-core"]) {
        try {
            return await import(mod);
        } catch {
            /* try next */
        }
    }
    return null;
}

function piWorkspacePresent(ROOT) {
    const ws = resolve(ROOT, "tests-visual");
    const pkg = [
        resolve(ws, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ];
    const bin = [
        resolve(ws, "node_modules/.bin/playwright"),
        resolve(ROOT, "node_modules/.bin/playwright"),
    ];
    return pkg.some(existsSync) && bin.some(existsSync);
}

// ── the C2 baseline self-test (the born-RED witness, device-free) ──────────────
// Replay the committed C2 trace (the proven 561-frame defect) through the PURE W3
// SCALE-POP detector and assert the pop is FLAGGED. The bite is demonstrated every
// run. The C2 trace samples carry `{t, w, right, left, m, e, mt, sc}` — `sc=1.1` on
// the still-wide collapsing box (`e=0, mt<0.5`) is the smoking gun.
function c2BaselineSelfTest(ROOT) {
    const p = resolve(ROOT, "docs/tranches/AZ/audit/ground/C2-morph-flicker-trace.json");
    if (!existsSync(p)) return { ran: false, reason: "C2 baseline trace absent" };
    let trace;
    try {
        trace = JSON.parse(readFileSync(p, "utf8"));
    } catch {
        return { ran: false, reason: "C2 baseline trace unparseable" };
    }
    const samples = trace.samples ?? [];
    // The C2 flip metadata marks the COL onset; window the analysis around it.
    const colFlip = (trace.flips ?? []).find((f) => f.to === "COL");
    let scan = samples;
    if (colFlip) {
        const idx = samples.findIndex((s) => s.t >= colFlip.t);
        if (idx > 0) scan = samples.slice(Math.max(0, idx - 3), idx + 30);
    }
    const pop = detectScalePop(scan);
    return {
        ran: true,
        flaggedW3: pop.popScale,
        baselineMaxScale: pop.maxScale,
        baselineMaxEdgeJumpPx: pop.maxEdgeJumpEarly,
    };
}

// ── the Node-side REAL-MOUSE staging (the C2 reproduction) ─────────────────────
// Drives the real Playwright cursor (so CSS `:hover` genuinely engages — the
// `.collapsed:hover` scale needs it) to (W3) hover the dock at its RIGHT EDGE, fire
// the state-machine collapse WITHOUT moving the cursor (so `:hover` stays true while
// `.collapsed` flips on — the exact C2 condition), and rAF-sample the box + scale
// across the onset; (W4) hold the cursor at the settling edge across the collapse and
// sample the `expanded` state to count re-fires.
async function stageAndCapture(page) {
    const out = {};
    await page.evaluate(installSampler);
    const rectNow = () => page.evaluate(() => window.__dockFlicker.rect());
    const isCollapsed = () => page.evaluate(() => window.__dockFlicker.collapsed());

    // scroll the capture dock into view (it lives far down the page).
    await page.evaluate(() => {
        const d = document.querySelector('.glass-dock[data-testid="dock-capture"]');
        if (d) d.scrollIntoView({ block: "center" });
    });
    await page.waitForTimeout(400);

    const r0 = await rectNow();
    if (!r0) {
        out.error = "no dock-capture dock rect on /dock/overview";
        return out;
    }

    // EXPAND via a real hover at center; dwell past the 60ms intent + spring settle.
    await page.mouse.move(r0.x + r0.w / 2, r0.y + r0.h / 2, { steps: 4 });
    await page.waitForTimeout(1200);

    // ── W3: the collapse-onset SCALE-POP trace ─────────────────────────────────
    {
        const re = await rectNow();
        // Move the REAL cursor to the right edge and HOLD (so `:hover` stays true).
        await page.mouse.move(re.right - 3, re.top + re.h / 2, { steps: 2 });
        await page.waitForTimeout(120);
        // Fire the state-machine collapse WITHOUT moving the cursor (C2 condition).
        await page.evaluate(() => window.__dockFlicker.triggerLeave());
        const samples = await page.evaluate((ms) => window.__dockFlicker.record(ms), 2200);
        out.collapseOnset = {
            samples,
            collapsedReached: samples.some((s) => s.e === 0),
        };
    }

    // Re-expand for W4 (real hover back to center, settle).
    {
        // ensure collapsed first (move cursor away + wait the delay).
        await page.mouse.move(r0.x + r0.w + 120, r0.y + r0.h / 2, { steps: 2 });
        await page.waitForTimeout(1100);
        const rc = await rectNow();
        await page.mouse.move(rc.x + rc.w / 2, rc.y + rc.h / 2, { steps: 4 });
        await page.waitForTimeout(1200);
    }

    // ── W4: the sustained cursor-at-collapsing-edge trace ──────────────────────
    {
        const re = await rectNow();
        // Hold the real cursor at the settling right edge; trigger collapse and let
        // the moving edge sweep past the FIXED cursor. With the hysteresis the dock
        // settles to ONE state; without it the re-fire oscillates.
        await page.mouse.move(re.right - 3, re.top + re.h / 2, { steps: 2 });
        await page.waitForTimeout(120);
        await page.evaluate(() => window.__dockFlicker.triggerLeave());
        const samples = await page.evaluate((ms) => window.__dockFlicker.record(ms), 1800);
        out.cursorAtEdge = { samples };
    }

    return out;
}

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
    const TARGET_URL = `${BASE_URL}${DOCK_ROUTE}`;
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_NO_SCALE_POP_ARTIFACT",
        "AZ-dock-no-scale-pop",
    );

    // ── (0) The device-free SOURCE arm (W1 + W2) + the C2 baseline self-test ────
    const dockCss = readDockCss(ROOT);
    const useDockStateSrc = readFileSync(
        resolve(ROOT, "src/components/custom/dock/composables/useDockState.ts"),
        "utf8",
    );
    const w1 = detectScaleGuard(dockCss);
    const w2 = detectHysteresisSeam(useDockStateSrc);

    const selfTest = c2BaselineSelfTest(ROOT);
    const sourceViolations = [...w1.violations, ...w2.violations];
    // The C2 baseline self-test is the un-skippable bite: it MUST flag W3 on the
    // proven defect trace, or the detector is not load-bearing (RED loudly).
    if (selfTest.ran && !selfTest.flaggedW3)
        sourceViolations.push(
            `SELF-TEST FAILED: the C2 baseline trace (proven scale ${selfTest.baselineMaxScale} on the wide collapsing box) was NOT flagged by the W3 scale-pop detector — the gate is not load-bearing`,
        );

    const piPresent = piWorkspacePresent(ROOT);
    const pw = await loadPlaywright();

    // No browser harness → device-free verdict (W1+W2+self-test). The live W3/W4
    // arm is asserted by the tests-visual π workspace spec when present; the source
    // arm still binds here.
    if (!pw) {
        const status = sourceViolations.length === 0 ? "skipped" : "fail";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason: piPresent
                ? "the library node_modules has no Playwright — the live W3/W4 frame arm runs in the tests-visual π workspace; the device-free W1+W2 source arm + the C2 baseline self-test ran here"
                : "no Playwright harness AND no π workspace — the device-free W1+W2 source arm + the C2 baseline self-test ran here",
            command: COMMAND,
            facts: {
                piWorkspacePresent: piPresent,
                w1: w1.facts,
                w2: w2.facts,
                c2SelfTest: selfTest,
            },
            violations: sourceViolations,
        });
        printSummary({ status, w1, w2, selfTest, live: null });
        process.exit(status === "fail" ? 1 : 0);
    }

    // ── (1) The live W3/W4 frame arm ───────────────────────────────────────────
    let browser;
    let result;
    try {
        browser = await pw.chromium.launch();
        const page = await browser.newPage();
        await page.addInitScript(() => {
            try {
                if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                    delete document.startViewTransition;
                let p = Object.getPrototypeOf(document);
                while (p) {
                    if (Object.prototype.hasOwnProperty.call(p, "startViewTransition")) {
                        delete p.startViewTransition;
                        break;
                    }
                    p = Object.getPrototypeOf(p);
                }
            } catch {
                /* non-configurable */
            }
        });
        await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });
        await page.waitForSelector('.glass-dock[data-testid="dock-capture"]', {
            state: "attached",
            timeout: 6000,
        });
        // Park the live Aurora/GooBlob WebGL substrate (the GPU-stall relief — the
        // shipped visibility-park seam; the dock morph is a SEPARATE rAF that does
        // NOT key off page visibility, so it rings unchanged while the aurora parks).
        await page.evaluate(() => {
            try {
                Object.defineProperty(document, "hidden", {
                    configurable: true,
                    get: () => true,
                });
                Object.defineProperty(document, "visibilityState", {
                    configurable: true,
                    get: () => "hidden",
                });
                document.dispatchEvent(new Event("visibilitychange"));
            } catch {
                /* best-effort */
            }
        });
        await page.waitForTimeout(500);
        result = await stageAndCapture(page);
    } catch (e) {
        if (browser) await browser.close();
        const reason = `could not run the live W3/W4 arm at ${TARGET_URL}: ${e.message}`;
        const failClosed = piPresent && !process.env.CI;
        const violations = [...sourceViolations];
        if (failClosed)
            violations.push(`${reason} — π workspace PRESENT (fail-CLOSED), an unreachable live morph is a hard RED`);
        const status = violations.length ? "fail" : "skipped";
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status,
            reason,
            command: COMMAND,
            facts: {
                piWorkspacePresent: piPresent,
                w1: w1.facts,
                w2: w2.facts,
                c2SelfTest: selfTest,
            },
            violations,
        });
        printSummary({ status, w1, w2, selfTest, live: null, liveError: e.message, failClosed });
        process.exit(status === "fail" ? 1 : 0);
    }
    await browser.close();

    const live = detectLive(result);
    const violations = [...sourceViolations, ...live.violations];
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: {
            piWorkspacePresent: piPresent,
            w1: w1.facts,
            w2: w2.facts,
            c2SelfTest: selfTest,
            live: live.facts,
        },
        violations,
        traces: {
            collapseOnset: result.collapseOnset?.samples ?? null,
            cursorAtEdge: result.cursorAtEdge?.samples ?? null,
        },
    });

    printSummary({ status, w1, w2, selfTest, live });
    process.exit(status === "pass" ? 0 : 1);
}

function printSummary({ status, w1, w2, selfTest, live, liveError, failClosed }) {
    console.log("proof:dock-no-scale-pop — the collapse-onset scale-pop + FLIP-thrash gate (AZ.W-DOCK-FLICKER)");
    console.log(
        `  W1 scale guard        : guarded=${w1.facts.guardedScaleBlocks} bare=${w1.facts.bareScaleBlocks} ${w1.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  W2 hysteresis seam    : geom=${w2.facts.hasGeometryRecheck} dwell=${w2.facts.hasIntentDwell} wired(leave/enter)=${w2.facts.geometryRecheckWiredInLeave}/${w2.facts.intentDwellWiredInEnter} ${w2.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  C2 baseline self-test : ${selfTest.ran ? (selfTest.flaggedW3 ? `OK (flagged scale ${selfTest.baselineMaxScale} / ${selfTest.baselineMaxEdgeJumpPx}px edge jump)` : `FAIL (did not flag scale ${selfTest.baselineMaxScale})`) : "absent"}`,
    );
    if (live) {
        console.log(
            `  W3 collapse-onset pop : maxScaleOnWideBox=${live.facts.maxScaleOnWideBox ?? "n/a"} (<= ${live.facts.scaleCeil ?? SCALE_CEIL}) over ${live.facts.collapseOnsetEarlyFrames ?? "n/a"} early frames (edge jump ${live.facts.maxEdgeJumpEarlyPx ?? "n/a"}px)`,
        );
        console.log(
            `  W4 cursor-at-edge     : stateFlips=${live.facts.cursorAtEdgeStateFlips ?? "n/a"} (<= ${live.facts.stateFlipBudget ?? MAX_STATE_FLIPS}) over ${live.facts.cursorAtEdgeFrames ?? "n/a"} frames`,
        );
    } else if (liveError) {
        console.log(`  live W3/W4 arm        : ${failClosed ? "FAIL (fail-CLOSED)" : "SKIPPED"} — ${liveError}`);
    } else {
        console.log("  live W3/W4 arm        : SKIPPED on this runner (device-free source arm ran)");
    }
    const allV = [...w1.violations, ...w2.violations, ...(live?.violations ?? [])];
    if (allV.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allV) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
