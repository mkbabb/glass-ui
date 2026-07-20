import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PagerDots from "@glass/components/pager-dots/PagerDots.vue";

// ── The pager-dot GOO-MORPH signature gate (BJ.W-PAGER-DOT-MORPH) ─────────────────
//
// GREEN-ON-ARRIVAL — a CHARACTERIZATION PIN + acceptance gate: the shipped worm already
// satisfies this signature at HEAD (4/4 green, zero source delta); it was never RED against
// the component. The only RED it demonstrates is the planted-defect self-test below (the
// mutation bite). Stated per PLAN §3 / APOTHEOSIS §4.2 — never dressed as born-RED.
//
// WHAT THE SIGNATURE PINS. The pager indicator must morph between dot states like the
// Google-deck worm — a LIQUID connective that STRETCHES and REUNITES — and must NEVER
// degrade to a cross-fade (two dots dissolving in place, no bridge) or a mechanical slide
// (one rigid point translating, no elongation). It asserts the connective's EXISTENCE
// THROUGH the transition (not merely an end state) and the liquid-weight acceptance
// (velocity-bought overshoot). It BITES: the self-test below drives synthetic cross-fade
// and mechanical-slide traces through the SAME signature assertion and proves it throws on
// each — and a planted bridge-kill in usePagerWorm was watched RED against the real
// component (evidence/W-PAGER-DOT-MORPH/), so the gate is non-vacuous, not theatre.
//
// Faithful geometry. happy-dom returns zero rects, so the bed pips are stubbed onto a
// real CELL-px grid and the compositor rAF (setup.ts: rAF → setTimeout(0)) is pumped
// on fake timers. The worm then measures true painted centers, springs its LEAD edge,
// lags its TRAIL edge, and paints the neck exactly as it does in the browser — observed
// through computed style writes (`.goo-neck` opacity, body `translate`), never getContext.

const CELL = 24; // the bed cell (matches PagerDots `gap-1.5` + the 24px goo-dot cell)
const DOT = 13; // the resting pip diameter (--pager-dot-size 0.8125rem = 13px)
const centerOfIndex = (i: number): number => i * CELL + CELL / 2; // painted center px

interface MorphFrame {
    /** `.goo-neck` opacity — the connective's paint witness ("1" = bridge present). */
    neckOpacity: string;
    /** the trailing silhouette edge (min body translate). */
    lo: number;
    /** the leading silhouette edge (max body translate). */
    hi: number;
    /** the live elongation = hi − lo. */
    gap: number;
}

/** Stub the bed pips onto a real CELL grid so the worm measures true centers. */
function installBedRectStub(): void {
    const rect = (left: number, width: number): DOMRect =>
        ({
            left,
            right: left + width,
            top: 0,
            bottom: CELL,
            width,
            height: CELL,
            x: left,
            y: 0,
            toJSON() {},
        }) as DOMRect;
    (
        HTMLElement.prototype as unknown as { getBoundingClientRect: () => DOMRect }
    ).getBoundingClientRect = function (this: HTMLElement): DOMRect {
        if (this.classList.contains("goo-dot")) {
            const parent = this.parentElement;
            const idx = parent ? Array.from(parent.children).indexOf(this) : 0;
            return rect(idx * CELL, CELL);
        }
        if (this.classList.contains("pager-worm-layer")) return rect(0, CELL * 12);
        return rect(0, 0);
    };
}

/** Read the current worm silhouette off the live DOM (computed-style only). */
function readFrame(
    neck: HTMLElement,
    bodyA: HTMLElement,
    bodyB: HTMLElement,
): MorphFrame {
    const ta = parseFloat(bodyA.style.translate) || 0;
    const tb = parseFloat(bodyB.style.translate) || 0;
    const lo = Math.min(ta, tb);
    const hi = Math.max(ta, tb);
    return { neckOpacity: neck.style.opacity, lo, hi, gap: hi - lo };
}

/**
 * Mount a pager, seat it on `from`, step to `to`, and record the per-frame worm
 * silhouette across the transition (plus the settled rest frame it started from).
 */
async function traceIndexStep(
    from: number,
    to: number,
    count: number,
    frames = 220,
): Promise<{ rest: MorphFrame; trace: MorphFrame[] }> {
    const wrapper = mount(PagerDots, {
        props: { count, active: from, ring: false },
        attachTo: document.body,
    });
    // let onMounted → nextTick → seatActive measure + seat (instant, no rAF).
    await flushPromises();
    const neck = wrapper.find(".goo-neck").element as HTMLElement;
    const bodyEls = wrapper.findAll(".goo-body").map((w) => w.element as HTMLElement);
    const [bodyA, bodyB] = bodyEls as [HTMLElement, HTMLElement];

    const rest = readFrame(neck, bodyA, bodyB);

    await wrapper.setProps({ active: to });
    await flushPromises(); // watch(active) → nextTick → driveActive arms the rAF loop

    const trace: MorphFrame[] = [];
    for (let i = 0; i < frames; i++) {
        vi.advanceTimersByTime(16);
        trace.push(readFrame(neck, bodyA, bodyB));
    }
    wrapper.unmount();
    return { rest, trace };
}

/** The longest consecutive run of frames whose neck reads a painted bridge ("1"). */
function longestConnectiveRun(trace: MorphFrame[]): number {
    let best = 0;
    let run = 0;
    for (const f of trace) {
        run = f.neckOpacity === "1" ? run + 1 : 0;
        if (run > best) best = run;
    }
    return best;
}

interface MorphVerdict {
    maxGap: number;
    maxHi: number;
    minLo: number;
    connectiveRun: number;
    finalGap: number;
    finalNeck: string;
    finalHi: number;
}

function analyzeMorph(trace: MorphFrame[]): MorphVerdict {
    return {
        maxGap: Math.max(...trace.map((f) => f.gap)),
        maxHi: Math.max(...trace.map((f) => f.hi)),
        minLo: Math.min(...trace.map((f) => f.lo)),
        connectiveRun: longestConnectiveRun(trace),
        finalGap: trace[trace.length - 1]!.gap,
        finalNeck: trace[trace.length - 1]!.neckOpacity,
        finalHi: trace[trace.length - 1]!.hi,
    };
}

// The signature thresholds — a worm, not a fade and not a slide.
const ELONGATION_MIN = 1.5 * DOT; // the bridge must stretch well past a resting pip
const CONNECTIVE_MIN_FRAMES = 6; // the neck must HOLD through the transition, not blip

/**
 * Assert the full goo-morph signature. THROWS (biting) on any missing facet, so the
 * synthetic cross-fade / mechanical-slide traces in the self-test drive it RED.
 * `restCenter`/`targetCenter` are the painted dot centers the worm travels between.
 */
function assertWormSignature(
    trace: MorphFrame[],
    restCenter: number,
    targetCenter: number,
): MorphVerdict {
    const v = analyzeMorph(trace);
    // (1) ELONGATION — the connective stretches past a resting pip (not a rigid slide).
    if (!(v.maxGap >= ELONGATION_MIN))
        throw new Error(
            `no elongation: maxGap ${v.maxGap.toFixed(2)} < ${ELONGATION_MIN} — ` +
                `a mechanical slide, not a worm`,
        );
    // (2) CONNECTIVE HELD THROUGH THE TRANSITION — the neck bridge is painted across a
    //     sustained run, not merely at an end state (a cross-fade paints no bridge).
    if (!(v.connectiveRun >= CONNECTIVE_MIN_FRAMES))
        throw new Error(
            `no connective: neck held for ${v.connectiveRun} frames < ` +
                `${CONNECTIVE_MIN_FRAMES} — a cross-fade, not a worm`,
        );
    // (3) WORMING — the silhouette SPANS old→new: the lead reaches the target while the
    //     trail lags near the source (the neighbor worms toward the active).
    if (!(v.maxHi >= targetCenter - 1 && v.minLo <= restCenter + DOT))
        throw new Error(
            `no worming: hi ${v.maxHi.toFixed(2)} / lo ${v.minLo.toFixed(2)} does ` +
                `not span [${restCenter}, ${targetCenter}]`,
        );
    // (4) REUNION — stretch then RE-FORM: the worm settles to ONE body on the target,
    //     neck off, edges coincident (a cross-fade never reunites two dots into one).
    if (!(v.finalGap <= 1 && v.finalNeck === "0" && Math.abs(v.finalHi - targetCenter) <= 1))
        throw new Error(
            `no reunion: finalGap ${v.finalGap.toFixed(2)} neck ${v.finalNeck} ` +
                `hi ${v.finalHi.toFixed(2)} (target ${targetCenter})`,
        );
    return v;
}

describe("PagerDots goo-morph signature (BJ.W-PAGER-DOT-MORPH)", () => {
    const nativeRect = HTMLElement.prototype.getBoundingClientRect;
    beforeEach(() => {
        vi.useFakeTimers();
        installBedRectStub();
    });
    afterEach(() => {
        vi.useRealTimers();
        HTMLElement.prototype.getBoundingClientRect = nativeRect; // no cross-test leak
    });

    it("is ONE reunited body at rest — no bridge, no gap", async () => {
        const { rest } = await traceIndexStep(0, 0, 5, 4);
        // seated: the neck is off and the bodies coincide on the active pip.
        expect(rest.neckOpacity).toBe("0");
        expect(rest.gap).toBeLessThanOrEqual(1);
        expect(Math.abs(rest.hi - centerOfIndex(0))).toBeLessThanOrEqual(1);
    });

    it("elongates + the neighbor worms toward the active, then REUNITES on the target", async () => {
        const { rest, trace } = await traceIndexStep(0, 3, 5);

        // starts reunited on the source pip (the assertion is a TRANSITION, not a state).
        expect(rest.gap).toBeLessThanOrEqual(1);
        expect(rest.neckOpacity).toBe("0");

        // the full signature — throws (RED) on any missing facet.
        const v = assertWormSignature(trace, centerOfIndex(0), centerOfIndex(3));

        // witness the measured worm (documents the live numbers the gate pins).
        expect(v.maxGap).toBeGreaterThanOrEqual(ELONGATION_MIN);
        expect(v.connectiveRun).toBeGreaterThanOrEqual(CONNECTIVE_MIN_FRAMES);
        expect(v.finalGap).toBeLessThanOrEqual(1);
        expect(v.finalNeck).toBe("0");
    });

    it("the LEAD overshoots the target — velocity-bought liquid weight (the acceptance)", async () => {
        const { trace } = await traceIndexStep(0, 3, 5);
        const target = centerOfIndex(3);
        const maxHi = Math.max(...trace.map((f) => f.hi));
        // ζ<1 underdamped lead → the leading edge sails PAST the target before it
        // reels back: inertia/bounce bought by velocity, not a critically-damped stop.
        expect(maxHi).toBeGreaterThan(target);
    });

    it("BITES: the signature assertion throws on a planted cross-fade AND a mechanical slide", () => {
        const rest = centerOfIndex(0);
        const target = centerOfIndex(3);

        // CROSS-FADE — both dots present at their fixed centers, dissolving in place:
        // a constant gap, NO neck bridge, and it never reunites into one body.
        const crossFade: MorphFrame[] = Array.from({ length: 220 }, () => ({
            neckOpacity: "0",
            lo: rest,
            hi: target,
            gap: target - rest,
        }));
        expect(() => assertWormSignature(crossFade, rest, target)).toThrowError(
            /connective/i,
        );

        // MECHANICAL SLIDE — one rigid point translating source→target: zero
        // elongation, no bridge (the sibling anti-pattern the worm must not be).
        const slide: MorphFrame[] = Array.from({ length: 220 }, (_, i) => {
            const p = rest + (target - rest) * Math.min(1, i / 40);
            return { neckOpacity: "0", lo: p, hi: p, gap: 0 };
        });
        expect(() => assertWormSignature(slide, rest, target)).toThrowError(
            /elongation/i,
        );
    });
});
