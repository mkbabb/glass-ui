// G-HM-LAYER — paint order, extent, and a legible substrate: three duties, three
// mutations. Isolation fixes PAINT ORDER; geometry fixes EXTENT. They are separate
// arms because isolation does not clip.
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
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import HandMark from "@glass/components/handmark/HandMark.vue";
import {
    BAND_HEIGHT,
    CAP_HEIGHT,
    RING_ENVELOPE,
    ringAxes,
} from "@glass/components/handmark/stroke";

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

interface Line {
    x: number;
    y: number;
    w: number;
    h: number;
}

function domRect(x: number, y: number, w: number, h: number): DOMRect {
    return {
        x,
        y,
        width: w,
        height: h,
        top: y,
        left: x,
        right: x + w,
        bottom: y + h,
        toJSON: () => ({}),
    } as DOMRect;
}

let restore: Array<() => void> = [];

function installMeasure(lines: Line[]): void {
    const rects = lines.map((l) => domRect(l.x, l.y, l.w, l.h));
    const list = Object.assign(rects.slice(), { item: (i: number) => rects[i] ?? null });
    const patch = <T extends object>(target: T, key: string, value: unknown) => {
        const prev = Object.getOwnPropertyDescriptor(target, key);
        Object.defineProperty(target, key, { configurable: true, writable: true, value });
        restore.push(() => {
            if (prev) Object.defineProperty(target, key, prev);
            else Reflect.deleteProperty(target, key);
        });
    };
    patch(Range.prototype, "getClientRects", () => list);
    patch(Element.prototype, "getBoundingClientRect", () => domRect(0, 0, 900, 400));
    patch(Element.prototype, "getClientRects", () => list);
}

beforeEach(() => {
    restore = [];
});

afterEach(() => {
    restore.forEach((fn) => fn());
    restore = [];
});

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
    w.unmount();
    return { ink, html, svgAttrs };
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
