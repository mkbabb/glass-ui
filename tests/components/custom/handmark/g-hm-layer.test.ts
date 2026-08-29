// G-HM-LAYER — paint order, extent, a legible substrate, and staying with the word:
// four duties, four mutations. Isolation fixes PAINT ORDER; geometry fixes EXTENT —
// and extent is the emitted `d` AND the mask window that gates it, because a window
// with zero area masks perfect geometry away. They are separate arms because
// isolation does not clip.
//
// An ordinary vitest file, not a registered gate seat. Arm 3 is split at the only
// line a headless reader can honour: the STRUCTURAL half (the two-arm band value
// exists, and no ink colour is authored anywhere in the family) lands here; the
// PAINTED half — canvas readback of the band's L window, chroma floor and contrast,
// with the cap+ascender+descender specimen — is π-BAND and is never simulated. This
// file reads no computed style for any colour: getComputedStyle returns the authored
// oklch() literal verbatim in both engines, which is the assertion's own mutation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import HandMark from "@glass/components/handmark/HandMark.vue";
import {
    BAND_HEIGHT,
    CAP_HEIGHT,
    RING_ENVELOPE,
    ringAxes,
} from "@glass/components/handmark/stroke";
import { type Line, installMeasure, restoreMeasure } from "./measure-frame";

const REPO_ROOT = process.cwd();
const SFC = resolve(REPO_ROOT, "src/components/handmark/HandMark.vue");
const STROKE = resolve(REPO_ROOT, "src/components/handmark/stroke.ts");
const BARREL = resolve(REPO_ROOT, "src/components/handmark/index.ts");
const SELF = resolve(REPO_ROOT, "tests/components/custom/handmark/g-hm-layer.test.ts");

const source = (p: string) => readFileSync(p, "utf8");
const family = () => live([SFC, STROKE, BARREL].map(source).join("\n"));

/**
 * Comments are not declarations. A file whose prose says "NO `isolation: isolate`"
 * must not satisfy an arm that asserts isolation, so every source read here is
 * stripped first — the DETECTOR-BLIND law, applied to this gate's own matcher.
 */
function live(text: string): string {
    return text.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/<!--[\s\S]*?-->/g, " ");
}

/** The authored <style> block of the SFC — the only place the family declares paint. */
function styleBlock(): string {
    const sfc = source(SFC);
    const i = sfc.indexOf("<style");
    return i < 0 ? "" : live(sfc.slice(i));
}

afterEach(restoreMeasure);

async function renderShape(shape: string, fs: number, lines: Line[]) {
    installMeasure(lines);
    const w = mount(HandMark, {
        props: { shape, seed: 5 } as Record<string, unknown>,
        slots: { default: "Hpqjy" },
        attrs: { style: `font-size: ${fs}px` },
        attachTo: document.body,
    });
    await nextTick();
    const svgs = w.findAll("svg");
    const ink = w
        .findAll("path")
        .filter((p) => (p.attributes("class") ?? "").includes("hm-ink"))
        .map((p) => p.attributes("d") ?? "");
    const html = w.html();
    const svgAttrs = svgs.map((s) => ({
        preserveAspectRatio: s.attributes("preserveAspectRatio"),
        viewBox: s.attributes("viewBox"),
    }));
    const frames = svgs.map((s) => ({
        width: s.attributes("width"),
        height: s.attributes("height"),
    }));
    const masks = w.findAll("mask").map((m) => ({
        units: m.attributes("maskUnits"),
        x: m.attributes("x"),
        y: m.attributes("y"),
        width: m.attributes("width"),
        height: m.attributes("height"),
    }));
    w.unmount();
    return { ink, html, svgAttrs, masks, frames };
}

/**
 * The RENDERED mask window, as the DOM carries it. Anything outside a mask's region is
 * masked out, so this rect is the mark's real extent gate — and a PERCENTAGE resolves
 * against the SVG's own box, which an inline host collapses to `0px` the moment the
 * slot wraps. Reading the window in user-space units is the whole arm: geometry that
 * is perfect in closed form paints nothing through a zero-area window.
 */
function windowOf(m: {
    units?: string;
    x?: string;
    y?: string;
    width?: string;
    height?: string;
}) {
    expect(m.units, "the window is only geometry if it is stated in user space").toBe(
        "userSpaceOnUse",
    );
    const num = (v: string | undefined, name: string): number => {
        expect(v, `the mask declares no ${name}`).toBeTypeOf("string");
        expect(
            v,
            `mask ${name}="${v}" is a PERCENTAGE of the SVG's own box — an inline host resolves that box to 0px on wrap and the window has zero area`,
        ).not.toMatch(/%/);
        const n = Number(v);
        expect(n, `mask ${name}="${v}" is not a user-space length`).not.toBeNaN();
        return n;
    };
    return {
        x: num(m.x, "x"),
        y: num(m.y, "y"),
        w: num(m.width, "width"),
        h: num(m.height, "height"),
    };
}

/**
 * The RENDERED frame — the SVG's OWN viewport, as the DOM carries it.
 *
 * A frame that declares no size takes `width: 100%` of its containing block, and an
 * absolutely positioned child of an INLINE host does not get the word's box: it gets
 * the box CSS 2.1 §10.1.4 builds between that inline's first and last fragments.
 * Chromium resolves THAT to `0` for a `<del>` mount, for a ring-reserved slot and for
 * both line rects of a wrapped `<mark>` — and an SVG viewport of zero width renders
 * nothing at all, whatever geometry and whatever mask window it carries. So the frame
 * has to state its own size, in the same user units the geometry is emitted in.
 */
function frameOf(f: { width?: string; height?: string }, line: Line) {
    const size = (v: string | undefined, name: string, span: number): number => {
        expect(
            v,
            `the frame declares no ${name}: with no viewport of its own it takes 100% of the INLINE containing block, which Chromium resolves to 0 for a wrapped or wrapper-bearing mount`,
        ).toBeTypeOf("string");
        expect(
            v,
            `frame ${name}="${v}" is a PERCENTAGE of a box the engine is free to collapse`,
        ).not.toMatch(/%/);
        const n = Number(v);
        expect(n, `frame ${name}="${v}" is not a user-space length`).not.toBeNaN();
        expect(
            n,
            `a zero-${name} SVG viewport renders NOTHING — the ink, the guide and the mask window are all moot`,
        ).toBeGreaterThan(0);
        // The frame is the LINE RECT the mark was made for — the same measurement the
        // geometry comes from — rounded outward to the geometry's own 3 decimals. A
        // constant that merely happens to be non-zero would satisfy the arm above and
        // is exactly what this pins shut.
        expect(n, `the frame is narrower than the line it stands for`).toBeGreaterThanOrEqual(span);
        expect(n, `the frame is not the line rect it was made for`).toBeLessThanOrEqual(span + 0.001);
        return n;
    };
    return { w: size(f.width, "width", line.w), h: size(f.height, "height", line.h) };
}

/**
 * The emitted bbox. A containment arm scored over ZERO emitted points is a gate over
 * zero pixels, so an absent or degenerate `d` throws rather than passing vacuously.
 */
function bbox(d: string) {
    const nums = (d.match(/-?\d+(?:\.\d+)?(?:e-?\d+)?/g) ?? []).map(Number);
    if (nums.length < 8) {
        throw new Error(
            `no emitted geometry to contain: the mark produced ${nums.length / 2} point(s)`,
        );
    }
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i + 1 < nums.length; i += 2) {
        xs.push(nums[i]);
        ys.push(nums[i + 1]);
    }
    return {
        x0: Math.min(...xs),
        x1: Math.max(...xs),
        y0: Math.min(...ys),
        y1: Math.max(...ys),
        w: Math.max(...xs) - Math.min(...xs),
        h: Math.max(...ys) - Math.min(...ys),
    };
}

const RUNGS = [18.608, 30.1, 48.7] as const;
const SHAPE_MEMBERS = ["underline", "strike", "circle", "highlight"] as const;

/**
 * The MOUNT CLASSES of the story corpus, in the shapes `/motion/handmark` really
 * produces them: a bare slot, a `<del>` wrapper, a bare slot carrying the ring's own
 * inline reservation, a `<mark>` on one line, and the same `<mark>` broken over two —
 * the second line starting LEFT of the first, which is what the page does and what
 * collapses an inline containing block. Widths are the measured 1440 dark figures from
 * `2026-08-25-pi-band/rerun/pi-RERUN-R6-RING-reservation-1440-dark-cured.json`, so the
 * fixture is the page's own arithmetic rather than a convenient round number.
 */
const STORY_MOUNTS: Array<{ mount: string; shape: string; lines: Line[] }> = [
    { mount: "underline · bare slot", shape: "underline", lines: [{ x: 40, y: 60, w: 162.04, h: 37.5 }] },
    { mount: "strike · <del> wrapper", shape: "strike", lines: [{ x: 40, y: 60, w: 87.81, h: 37.5 }] },
    { mount: "circle · bare slot, ring-reserved", shape: "circle", lines: [{ x: 40, y: 60, w: 153.93, h: 37.5 }] },
    { mount: "highlight · <mark>, one line", shape: "highlight", lines: [{ x: 40, y: 60, w: 61.48, h: 37.5 }] },
    {
        mount: "highlight · <mark>, two lines",
        shape: "highlight",
        lines: [
            { x: 188, y: 60, w: 171.58, h: 37.5 },
            { x: 0, y: 100, w: 108.63, h: 37.5 },
        ],
    },
];
/** lh/fs bands: 1.05 at display, 1.20 mid, 1.50 at body — the tightest is the test. */
const TIGHTEST_LEADING = 1.05;

describe("G-HM-LAYER 1 · STACKING — the wrapper isolates and nothing blends", () => {
    it("the wrapper declares isolation: isolate", () => {
        expect(styleBlock()).toMatch(/\.hm\b[^{]*\{[^}]*isolation:\s*isolate/s);
    });

    it("mix-blend-mode is absent from the whole family", () => {
        expect(family()).not.toMatch(/mix-blend-mode/);
    });

    it("z-index appears only as the highlight's -1 inside the isolated context", () => {
        const zs = [...styleBlock().matchAll(/z-index:\s*(-?\d+)/g)].map((m) => m[1]);
        expect(zs).toEqual(["-1"]);
        expect(styleBlock()).toMatch(/\[data-shape="highlight"\][^{]*\{[^}]*z-index:\s*-1/s);
    });
});

describe("G-HM-LAYER 2 · CONTAINMENT, geometric — extent is geometry, never isolation", () => {
    it("the frame is 1:1 CSS px — no viewBox, no preserveAspectRatio games", async () => {
        const r = await renderShape("underline", 30.1, [{ x: 40, y: 60, w: 240, h: 40 }]);
        expect(r.svgAttrs.length).toBeGreaterThanOrEqual(1);
        for (const a of r.svgAttrs) {
            expect(a.preserveAspectRatio).toBeUndefined();
            expect(a.viewBox).toBeUndefined();
        }
    });

    it.each(RUNGS)("the band is inside the line box at rung %s", async (fs) => {
        const lineBox = fs * TIGHTEST_LEADING;
        const r = await renderShape("highlight", fs, [{ x: 40, y: 60, w: 260, h: lineBox }]);
        const band = bbox(r.ink[0] ?? "");
        expect(band.h, `band ${band.h.toFixed(2)}px vs line box ${lineBox.toFixed(2)}px`).toBeLessThanOrEqual(lineBox);
        expect(BAND_HEIGHT).toBeLessThanOrEqual(TIGHTEST_LEADING);
    });

    it.each(RUNGS)("the band overruns its word by ≤2% a side at rung %s", async (fs) => {
        const w = 260;
        const r = await renderShape("highlight", fs, [{ x: 40, y: 60, w, h: fs * 1.2 }]);
        const band = bbox(r.ink[0] ?? "");
        expect((40 - band.x0) / w).toBeLessThanOrEqual(0.02);
        expect((band.x1 - (40 + w)) / w).toBeLessThanOrEqual(0.02);
    });

    it("the ring LAW's vertical run is 2b ≤ 1.15em", () => {
        const em = 100;
        const { b } = ringAxes({ x: 0, y: 0, width: 300, height: 120 }, em);
        expect((2 * b) / em).toBeLessThanOrEqual(1.15);
        expect((2 * b) / em).toBeCloseTo(Math.cbrt(2) * (CAP_HEIGHT + 0.16), 6);
    });

    it("the painted ring stays inside the declared hand envelope", async () => {
        const fs = 48.7;
        const r = await renderShape("circle", fs, [{ x: 40, y: 60, w: 200, h: fs * 1.05 }]);
        const ring = bbox(r.ink[0] ?? "");
        expect(ring.h / fs).toBeLessThanOrEqual(RING_ENVELOPE);
        expect(ring.h).toBeGreaterThan(0);
    });

    it.each(SHAPE_MEMBERS)(
        "%s: the RENDERED mask window is real units and contains the ink it gates",
        async (shape) => {
            // This is the reading the doctrine "extent is fixed by geometry alone"
            // was missing: on a live surface extent is fixed by the MASK WINDOW, and
            // a window authored in percentages of a collapsible box is not geometry.
            const fs = 30.1;
            const r = await renderShape(shape, fs, [{ x: 40, y: 60, w: 240, h: fs * 1.35 }]);
            expect(r.masks, `${shape}: one mask per emitted mark`).toHaveLength(r.ink.length);
            const win = windowOf(r.masks[0]);
            expect(win.w, `${shape}: a zero-area window masks the ink away entirely`).toBeGreaterThan(0);
            expect(win.h, `${shape}: a zero-area window masks the ink away entirely`).toBeGreaterThan(0);
            const b = bbox(r.ink[0] ?? "");
            expect(win.x, `${shape}: window clips the ink's left edge`).toBeLessThanOrEqual(b.x0);
            expect(win.y, `${shape}: window clips the ink's top edge`).toBeLessThanOrEqual(b.y0);
            expect(win.x + win.w, `${shape}: window clips the ink's right edge`).toBeGreaterThanOrEqual(b.x1);
            expect(win.y + win.h, `${shape}: window clips the ink's bottom edge`).toBeGreaterThanOrEqual(b.y1);
        },
    );

    it.each(STORY_MOUNTS)(
        "$mount: the RENDERED frame declares its own viewport, and it is never zero",
        async ({ shape, lines }) => {
            // The window cure fixed the box INSIDE the frame; this is the frame. Both
            // are the same failure twice — a length authored as a percentage of a box
            // an inline host is free to collapse — and curing one does not cure the
            // other: with a perfect window, a frame of zero width still paints nothing.
            const r = await renderShape(shape, 30.1, lines);
            expect(r.frames, `${shape}: one frame per line rect`).toHaveLength(lines.length);
            r.frames.forEach((f, i) => frameOf(f, lines[i]));
        },
    );

    it("no rule sizes the frame as a percentage of the inline containing block", () => {
        const rules = [...styleBlock().matchAll(/([^{}]*\.hm-mark[^{}]*)\{([^}]*)\}/g)];
        expect(rules.length, "no .hm-mark rule at all").toBeGreaterThan(0);
        for (const [, selector, body] of rules) {
            expect(
                body,
                `${selector.trim().replace(/\s+/g, " ")} sizes the frame in percentages — an inline containing block is not the word's box, and Chromium resolves it to 0 width for the <del> mount, the ring-reserved slot and both line rects of a wrapped <mark>`,
            ).not.toMatch(/(?:^|;)\s*(?:width|height|inline-size|block-size)\s*:[^;]*%/);
        }
    });
});

describe("G-HM-LAYER 3 · SUBSTRATE — structural half; the painted windows are π-BAND", () => {
    it("the band is one law on two papers — light-dark() over one hue variable", () => {
        expect(styleBlock()).toMatch(
            /--hm-band:\s*light-dark\(\s*oklch\(0\.86\s+0\.16\s+var\(--hm-h\)\)\s*,\s*oklch\(0\.44\s+0\.16\s+var\(--hm-h\)\)\s*\)/s,
        );
    });

    it("no ink recolour anywhere — the family never names an ink value", () => {
        // `inherit` is the ONE admissible text-colour declaration, and it is the
        // opposite of ownership: it hands the glyphs back to the page's own
        // foreground, which is what makes the amputation class structurally
        // impossible at any band height. Any NAMED value — a token, a literal, a
        // function — is the recolour mechanism and convicts.
        const owned = [...styleBlock().matchAll(/(?:^|[;{]\s*)color:\s*([^;}]+)/g)]
            .map((m) => m[1].trim())
            .filter((v) => v !== "inherit");
        expect(owned, `the family owns an ink value: ${owned.join(" | ")}`).toEqual([]);
        expect(family()).not.toMatch(/--hm-on-band/);
    });

    it("the highlight seats its own <mark> with the UA background reset", async () => {
        const r = await renderShape("highlight", 30.1, [{ x: 40, y: 60, w: 200, h: 40 }]);
        expect(r.html).toContain("<mark");
        expect(styleBlock()).toMatch(/mark\b[^{]*\{[^}]*background:\s*none/s);
    });

    it("this arm never reads a colour through getComputedStyle", () => {
        expect(source(SELF)).not.toMatch(/getComputedStyle\(/);
    });
});

describe("G-HM-LAYER 4 · TRACKING — the mark hears the scroller that moves its word", () => {
    it("an ordinary element's scroll reaches the ink-lag listener and the mark settles", async () => {
        // Scroll events DO NOT BUBBLE. A listener on `window` therefore hears the
        // document's own scroller and nothing else, so a mark inside any scrolling
        // pane — a demo shell, an app frame, a dialog — has an ink-lag mechanism that
        // is inert rather than absent, and an amplitude arm reads 0.00px and calls it
        // a pass. The event below is dispatched exactly as an engine dispatches one:
        // on the scroller, `bubbles: false`.
        installMeasure([{ x: 40, y: 60, w: 240, h: 40 }]);
        const scroller = document.createElement("div");
        document.body.appendChild(scroller);
        const w = mount(HandMark, {
            props: { shape: "underline", seed: 5 } as Record<string, unknown>,
            slots: { default: "Hpqjy" },
            attachTo: scroller,
        });
        await nextTick();
        expect(w.find(".hm-mark").exists(), "no mark to track").toBe(true);
        expect(w.find(".hm-mark").classes()).not.toContain("hm-mark--settling");

        scroller.dispatchEvent(new Event("scroll"));
        await new Promise((resolve) => setTimeout(resolve, 160));
        await nextTick();

        expect(
            w.find(".hm-mark").classes(),
            "the scroller's event never reached the mark: a non-bubbling scroll is heard on the document in the CAPTURE phase, not on window",
        ).toContain("hm-mark--settling");

        w.unmount();
        scroller.remove();
    });
});
